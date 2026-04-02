import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { SITE_URL } from '../src/seo/siteConstants';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const CANONICAL_PREFIX = SITE_URL;
const CANONICAL_HOSTNAME = new URL(SITE_URL).hostname;

const FORBIDDEN_LITERALS = [
  'http://datacost.co.za',
  'https://www.datacost.co.za',
  'http://www.datacost.co.za',
  'github.io',
  'pages.dev'
];

type ValidationError = {
  file: string;
  message: string;
};

function toDisplayPath(filePath: string): string {
  return path.relative(process.cwd(), filePath).replace(/\\/g, '/');
}

function pushError(errors: ValidationError[], filePath: string, message: string): void {
  errors.push({
    file: toDisplayPath(filePath),
    message
  });
}

async function walkFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return walkFiles(fullPath);
      }
      return [fullPath];
    })
  );

  return files.flat();
}

function getAttributeValue(tag: string, attribute: string): string | null {
  const patterns = [
    new RegExp(`${attribute}\\s*=\\s*"([^"]*)"`, 'i'),
    new RegExp(`${attribute}\\s*=\\s*'([^']*)'`, 'i')
  ];

  for (const pattern of patterns) {
    const match = tag.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

function getAbsoluteUrls(text: string): string[] {
  const matches = text.match(/https?:\/\/[^\s<"')]+/gi);
  return matches ?? [];
}

function isForbiddenUrl(url: string): boolean {
  return FORBIDDEN_LITERALS.some((pattern) => url.includes(pattern));
}

function validateOwnDomainUrl(url: string, filePath: string, context: string, errors: ValidationError[]): void {
  if (isForbiddenUrl(url)) {
    pushError(errors, filePath, `${context} uses a forbidden host: ${url}`);
    return;
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return;
  }

  if (parsed.hostname !== CANONICAL_HOSTNAME) {
    return;
  }

  if (!url.startsWith(CANONICAL_PREFIX)) {
    pushError(errors, filePath, `${context} must start with ${CANONICAL_PREFIX} but found ${url}`);
  }
}

function validateForbiddenLiterals(filePath: string, text: string, errors: ValidationError[]): void {
  for (const literal of FORBIDDEN_LITERALS) {
    if (text.includes(literal)) {
      pushError(errors, filePath, `contains forbidden literal "${literal}"`);
    }
  }
}

function validateCanonicalTags(filePath: string, html: string, errors: ValidationError[]): void {
  const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];
  const canonicalTags = linkTags.filter((tag) => {
    const rel = getAttributeValue(tag, 'rel');
    return rel !== null && rel.toLowerCase().split(/\s+/).includes('canonical');
  });

  if (canonicalTags.length === 0) {
    pushError(errors, filePath, 'is missing a canonical tag');
    return;
  }

  if (canonicalTags.length > 1) {
    pushError(errors, filePath, `has ${canonicalTags.length} canonical tags`);
  }

  canonicalTags.forEach((tag, index) => {
    const href = getAttributeValue(tag, 'href');
    if (!href) {
      pushError(errors, filePath, `canonical tag #${index + 1} is missing an href`);
      return;
    }

    validateOwnDomainUrl(href, filePath, `canonical tag #${index + 1}`, errors);
  });
}

function validateMetaSeoUrls(filePath: string, html: string, errors: ValidationError[]): void {
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];

  for (const tag of metaTags) {
    const property = getAttributeValue(tag, 'property')?.toLowerCase();
    const name = getAttributeValue(tag, 'name')?.toLowerCase();
    const content = getAttributeValue(tag, 'content');

    if (!content) {
      continue;
    }

    if (property === 'og:url') {
      validateOwnDomainUrl(content, filePath, 'og:url', errors);
      continue;
    }

    if (property === 'og:image' || name === 'twitter:image') {
      validateOwnDomainUrl(content, filePath, property ?? name ?? 'social image', errors);
    }
  }
}

function walkJsonLd(value: unknown, filePath: string, context: string, errors: ValidationError[]): void {
  if (typeof value === 'string') {
    if (/^https?:\/\//i.test(value)) {
      validateOwnDomainUrl(value, filePath, context, errors);
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      walkJsonLd(item, filePath, `${context}[${index}]`, errors);
    });
    return;
  }

  if (value && typeof value === 'object') {
    for (const [key, nestedValue] of Object.entries(value)) {
      walkJsonLd(nestedValue, filePath, `${context}.${key}`, errors);
    }
  }
}

function validateJsonLd(filePath: string, html: string, errors: ValidationError[]): void {
  const scriptPattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;
  let scriptIndex = 0;

  while ((match = scriptPattern.exec(html)) !== null) {
    scriptIndex += 1;
    const rawJson = match[1].trim();
    if (!rawJson) {
      pushError(errors, filePath, `JSON-LD script #${scriptIndex} is empty`);
      continue;
    }

    try {
      const parsed = JSON.parse(rawJson);
      walkJsonLd(parsed, filePath, `JSON-LD #${scriptIndex}`, errors);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      pushError(errors, filePath, `JSON-LD script #${scriptIndex} could not be parsed: ${message}`);
    }
  }
}

function validateSitemapFile(filePath: string, xml: string, errors: ValidationError[]): void {
  const urls = getAbsoluteUrls(xml);
  for (const url of urls) {
    validateOwnDomainUrl(url, filePath, 'sitemap URL', errors);
  }
}

function validateRobotsFile(filePath: string, text: string, errors: ValidationError[]): void {
  const sitemapLines = text.match(/^Sitemap:\s*(.+)$/gim) ?? [];
  for (const line of sitemapLines) {
    const sitemapUrl = line.replace(/^Sitemap:\s*/i, '').trim();
    validateOwnDomainUrl(sitemapUrl, filePath, 'robots.txt sitemap reference', errors);
  }
}

async function main(): Promise<void> {
  const directoryStat = await stat(DIST_DIR).catch(() => null);
  if (!directoryStat?.isDirectory()) {
    throw new Error(`Build output directory not found: ${DIST_DIR}`);
  }

  const allFiles = await walkFiles(DIST_DIR);
  const htmlFiles = allFiles.filter((filePath) => filePath.endsWith('.html'));
  const sitemapFiles = allFiles.filter((filePath) => /(?:^|[\\/])sitemap.*\.xml$/i.test(filePath));
  const textFiles = allFiles.filter((filePath) => filePath.endsWith('.txt') || filePath.endsWith('.xml') || filePath.endsWith('.html'));
  const errors: ValidationError[] = [];

  if (htmlFiles.length === 0) {
    throw new Error(`No HTML files found in ${DIST_DIR}`);
  }

  if (sitemapFiles.length === 0) {
    throw new Error(`No sitemap XML files found in ${DIST_DIR}`);
  }

  for (const filePath of textFiles) {
    const text = await readFile(filePath, 'utf8');
    validateForbiddenLiterals(filePath, text, errors);

    if (filePath.endsWith('.html')) {
      validateCanonicalTags(filePath, text, errors);
      validateMetaSeoUrls(filePath, text, errors);
      validateJsonLd(filePath, text, errors);
      continue;
    }

    if (filePath.endsWith('.xml')) {
      validateSitemapFile(filePath, text, errors);
      continue;
    }

    if (path.basename(filePath).toLowerCase() === 'robots.txt') {
      validateRobotsFile(filePath, text, errors);
    }
  }

  if (errors.length > 0) {
    console.error(`SEO output check failed with ${errors.length} issue(s):`);
    for (const error of errors) {
      console.error(`- ${error.file}: ${error.message}`);
    }
    process.exit(1);
  }

  console.log(
    `SEO output check passed for ${htmlFiles.length} HTML files and ${sitemapFiles.length} sitemap files in ${toDisplayPath(DIST_DIR)}.`
  );
}

await main();
