import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_LOGO_URL,
  SITE_URL
} from '../src/seo/siteConstants';
import { getIndexableRoutes, getNoindexRoutes } from '../src/config/routeCatalog';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const CANONICAL_PREFIX = SITE_URL;
const CANONICAL_HOSTNAME = new URL(SITE_URL).hostname;
const SOCIAL_PREVIEW_ROUTES = new Set([
  '/',
  '/ussd-codes-south-africa/',
  '/guides/how-to-check-data-balance/',
  '/guides/airtime-data-saving-tips-south-africa/'
]);

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

function normalizeRoute(pathname: string): string {
  if (pathname === '/') return '/';
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${withLeadingSlash.replace(/\/+$/, '')}/`;
}

function getRouteFromHtmlPath(filePath: string): string {
  const relativePath = path.relative(DIST_DIR, filePath).replace(/\\/g, '/');
  if (relativePath === 'index.html') return '/';
  return normalizeRoute(relativePath.replace(/\/index\.html$/i, ''));
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

function validateSocialPreviewMeta(
  filePath: string,
  html: string,
  route: string,
  errors: ValidationError[]
): void {
  if (!SOCIAL_PREVIEW_ROUTES.has(route)) return;

  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const getContent = (attribute: 'property' | 'name', value: string): string | null => {
    const tag = metaTags.find(
      (candidate) => getAttributeValue(candidate, attribute)?.toLowerCase() === value.toLowerCase()
    );
    return tag ? getAttributeValue(tag, 'content') : null;
  };

  const expectedTags: Array<[string, string | null, string]> = [
    ['og:image', getContent('property', 'og:image'), DEFAULT_OG_IMAGE_URL],
    ['og:image:width', getContent('property', 'og:image:width'), String(DEFAULT_OG_IMAGE_WIDTH)],
    ['og:image:height', getContent('property', 'og:image:height'), String(DEFAULT_OG_IMAGE_HEIGHT)],
    ['og:image:alt', getContent('property', 'og:image:alt'), DEFAULT_OG_IMAGE_ALT],
    ['twitter:image', getContent('name', 'twitter:image'), DEFAULT_OG_IMAGE_URL],
    ['twitter:image:alt', getContent('name', 'twitter:image:alt'), DEFAULT_OG_IMAGE_ALT]
  ];

  for (const [tagName, actual, expected] of expectedTags) {
    if (actual !== expected) {
      pushError(errors, filePath, `${route} ${tagName} must be "${expected}" but found "${actual ?? 'missing'}"`);
    }
  }

  if (!html.includes('href="https://www.facebook.com/datacostza"')) {
    pushError(errors, filePath, `${route} is missing the DataCost Facebook footer link`);
  }
}

type ImageDimensions = { width: number; height: number };

function readImageDimensions(buffer: Buffer, filePath: string): ImageDimensions {
  const isPng = buffer.length >= 24 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (isPng) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  const isJpeg = buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8;
  if (isJpeg) {
    const startOfFrameMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
    let offset = 2;

    while (offset + 8 < buffer.length) {
      while (offset < buffer.length && buffer[offset] === 0xff) offset += 1;
      const marker = buffer[offset];
      offset += 1;

      if (marker === 0xd8 || marker === 0xd9) continue;
      if (offset + 2 > buffer.length) break;

      const segmentLength = buffer.readUInt16BE(offset);
      if (segmentLength < 2 || offset + segmentLength > buffer.length) break;

      if (startOfFrameMarkers.has(marker)) {
        return {
          height: buffer.readUInt16BE(offset + 3),
          width: buffer.readUInt16BE(offset + 5)
        };
      }

      offset += segmentLength;
    }
  }

  throw new Error(`Unsupported image format or unreadable dimensions: ${toDisplayPath(filePath)}`);
}

async function validateSocialAssets(errors: ValidationError[]): Promise<void> {
  const assetChecks = [
    {
      url: DEFAULT_OG_IMAGE_URL,
      validate: ({ width, height }: ImageDimensions) => width === DEFAULT_OG_IMAGE_WIDTH && height === DEFAULT_OG_IMAGE_HEIGHT,
      expected: `${DEFAULT_OG_IMAGE_WIDTH}x${DEFAULT_OG_IMAGE_HEIGHT}`
    },
    {
      url: SITE_LOGO_URL,
      validate: ({ width, height }: ImageDimensions) => width === height && width >= 512,
      expected: 'a square image of at least 512x512'
    }
  ];

  for (const check of assetChecks) {
    const assetPath = path.join(DIST_DIR, new URL(check.url).pathname.replace(/^\/+/, ''));
    try {
      const dimensions = readImageDimensions(await readFile(assetPath), assetPath);
      if (!check.validate(dimensions)) {
        pushError(errors, assetPath, `must be ${check.expected} but is ${dimensions.width}x${dimensions.height}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      pushError(errors, assetPath, `could not validate social asset: ${message}`);
    }
  }
}

function validateRobotsMeta(filePath: string, html: string, route: string, errors: ValidationError[]): void {
  const noindexRoutes = new Set(getNoindexRoutes().map(normalizeRoute));
  const indexableRoutes = new Set(getIndexableRoutes().map(normalizeRoute));
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const robotsTag = metaTags.find((tag) => getAttributeValue(tag, 'name')?.toLowerCase() === 'robots');
  const robotsContent = robotsTag ? getAttributeValue(robotsTag, 'content')?.toLowerCase() ?? '' : '';

  if (noindexRoutes.has(route)) {
    if (!robotsContent.includes('noindex')) {
      pushError(errors, filePath, `${route} is configured noindex but is missing robots noindex`);
    }

    if (!robotsContent.includes('follow')) {
      pushError(errors, filePath, `${route} is configured noindex but is missing robots follow`);
    }
    return;
  }

  if (indexableRoutes.has(route) && robotsContent.includes('noindex')) {
    pushError(errors, filePath, `${route} is indexable but contains robots noindex`);
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
  const siteOrigin = SITE_URL.replace(/\/$/, '');
  const noindexUrls = new Set(getNoindexRoutes().map((route) => `${siteOrigin}${route}`));
  const urls = getAbsoluteUrls(xml);
  for (const url of urls) {
    validateOwnDomainUrl(url, filePath, 'sitemap URL', errors);

    if (noindexUrls.has(url)) {
      pushError(errors, filePath, `sitemap includes noindex route: ${url}`);
    }
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
      const route = getRouteFromHtmlPath(filePath);
      validateCanonicalTags(filePath, text, errors);
      validateMetaSeoUrls(filePath, text, errors);
      validateSocialPreviewMeta(filePath, text, route, errors);
      validateRobotsMeta(filePath, text, route, errors);
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

  await validateSocialAssets(errors);

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
