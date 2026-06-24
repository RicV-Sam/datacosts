import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import {
  canRenderPublisherAdsOnRoute,
  GOOGLE_PARTNER_DATA_POLICY_URL,
  PUBLISHER_CONTENT_MIN_WORDS
} from '../src/config/publisherReadiness';
import { getNoindexRoutes } from '../src/config/routeCatalog';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const PUBLIC_ADS_TXT = path.resolve(process.cwd(), 'public/ads.txt');
const TEXT_EXTENSIONS = new Set(['.css', '.html', '.js', '.json', '.svg', '.txt', '.xml']);
const ADSENSE_CLIENT_ID = 'ca-pub-6084410613829318';
const ADSENSE_SCRIPT_URL = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;

const FORBIDDEN_PATTERNS: Array<{ label: string; pattern: RegExp }> = [
  { label: 'Ad Slot:', pattern: /Ad Slot:/i },
  { label: 'AdvertisementAd', pattern: /AdvertisementAd/i },
  { label: 'aboveFold', pattern: /aboveFold/i },
  { label: 'inContent', pattern: /inContent/i },
  { label: 'house ad', pattern: /house\s+ad/i },
  { label: 'house-ad', pattern: /house-ad/i },
  { label: 'Freehub tracks', pattern: /Freehub tracks/i },
  { label: 'Browse Freehub', pattern: /Browse Freehub/i },
  { label: 'Freehub', pattern: /Freehub/i },
  { label: 'AdUnit', pattern: /AdUnit/i }
];

type Finding = {
  file: string;
  label: string;
};

const REQUIRED_REVIEWER_LINK_TEXT = [
  'About',
  'Contact',
  'Editorial Policy',
  'Methodology',
  'Privacy Policy',
  'Terms',
  'Cookie Policy',
  'Sitemap'
];

function toDisplayPath(filePath: string): string {
  return path.relative(process.cwd(), filePath).replace(/\\/g, '/');
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

function getAttributeValue(tag: string, attribute: string): string | null {
  const patterns = [
    new RegExp(`${attribute}\\s*=\\s*"([^"]*)"`, 'i'),
    new RegExp(`${attribute}\\s*=\\s*'([^']*)'`, 'i')
  ];

  for (const pattern of patterns) {
    const match = tag.match(pattern);
    if (match) return match[1];
  }

  return null;
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getWordCount(text: string): number {
  return (text.match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)?/g) ?? []).length;
}

function getTitle(html: string): string | null {
  return html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? null;
}

function getMetaDescription(html: string): string | null {
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const descriptionTag = metaTags.find((tag) => getAttributeValue(tag, 'name')?.toLowerCase() === 'description');
  return descriptionTag ? getAttributeValue(descriptionTag, 'content')?.trim() ?? null : null;
}

function hasApprovedAdsenseAutoAdsScript(html: string): boolean {
  const scriptTags = html.match(/<script\b[^>]*><\/script>/gi) ?? [];
  return scriptTags.some((tag) => {
    const src = getAttributeValue(tag, 'src');
    const crossorigin = getAttributeValue(tag, 'crossorigin');
    return src === ADSENSE_SCRIPT_URL && crossorigin?.toLowerCase() === 'anonymous';
  });
}

function addDuplicateFinding(
  findings: Finding[],
  label: string,
  valuesByRoute: Map<string, string[]>
): void {
  for (const [value, routes] of valuesByRoute) {
    if (routes.length <= 1) continue;
    findings.push({
      file: routes.join(', '),
      label: `${label} duplicated: ${value}`
    });
  }
}

async function validateAdsTxt(findings: Finding[]): Promise<void> {
  const adsTxt = await readFile(PUBLIC_ADS_TXT, 'utf8').catch(() => '');
  if (!/google\.com,\s*pub-[0-9]+,\s*DIRECT,\s*f08c47fec0942fa0/i.test(adsTxt)) {
    findings.push({
      file: 'public/ads.txt',
      label: 'missing authorized Google DIRECT seller line'
    });
  }
}

async function main(): Promise<void> {
  const directoryStat = await stat(DIST_DIR).catch(() => null);
  if (!directoryStat?.isDirectory()) {
    throw new Error(`Build output directory not found: ${DIST_DIR}`);
  }

  const files = (await walkFiles(DIST_DIR)).filter((filePath) => TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase()));
  const htmlFiles = files.filter((filePath) => filePath.endsWith('.html'));
  const noindexRoutes = getNoindexRoutes();
  const findings: Finding[] = [];
  const titlesByValue = new Map<string, string[]>();
  const descriptionsByValue = new Map<string, string[]>();

  await validateAdsTxt(findings);

  for (const filePath of files) {
    const text = await readFile(filePath, 'utf8');
    for (const forbidden of FORBIDDEN_PATTERNS) {
      if (forbidden.pattern.test(text)) {
        findings.push({
          file: toDisplayPath(filePath),
          label: forbidden.label
        });
      }
    }

    if (!filePath.endsWith('.html')) {
      continue;
    }

    const route = getRouteFromHtmlPath(filePath);
    const robotsContent = (text.match(/<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i)?.[1] ?? '').toLowerCase();
    const isRenderedNoindex = robotsContent.includes('noindex');
    const canCarryPublisherAds = !isRenderedNoindex && canRenderPublisherAdsOnRoute(route, noindexRoutes);

    if (!hasApprovedAdsenseAutoAdsScript(text)) {
      findings.push({
        file: toDisplayPath(filePath),
        label: `is missing approved AdSense Auto ads script for ${ADSENSE_CLIENT_ID}`
      });
    }

    if (route === '/') {
      for (const linkText of REQUIRED_REVIEWER_LINK_TEXT) {
        if (!text.includes(linkText)) {
          findings.push({
            file: toDisplayPath(filePath),
            label: `homepage output is missing visible reviewer link text: ${linkText}`
          });
        }
      }
    }

    if (route === '/privacy-policy/' || route === '/cookie-policy/') {
      if (!text.includes(GOOGLE_PARTNER_DATA_POLICY_URL)) {
        findings.push({
          file: toDisplayPath(filePath),
          label: 'is missing Google partner data policy link'
        });
      }
      if (!/cookies, web beacons, IP addresses/i.test(text)) {
        findings.push({
          file: toDisplayPath(filePath),
          label: 'is missing explicit cookies, web beacons, and IP address disclosure'
        });
      }
    }

    if (!canCarryPublisherAds) {
      continue;
    }

    const renderedWordCount = getWordCount(stripHtml(text));
    if (renderedWordCount < PUBLISHER_CONTENT_MIN_WORDS) {
      findings.push({
        file: toDisplayPath(filePath),
        label: `has ${renderedWordCount} rendered words; expected at least ${PUBLISHER_CONTENT_MIN_WORDS} for publisher-content pages`
      });
    }

    const title = getTitle(text);
    if (title) {
      titlesByValue.set(title, [...(titlesByValue.get(title) ?? []), route]);
    }

    const description = getMetaDescription(text);
    if (description) {
      descriptionsByValue.set(description, [...(descriptionsByValue.get(description) ?? []), route]);
    }
  }

  addDuplicateFinding(findings, 'title', titlesByValue);
  addDuplicateFinding(findings, 'description', descriptionsByValue);

  if (findings.length > 0) {
    console.error(`AdSense output check failed with ${findings.length} finding(s):`);
    for (const finding of findings) {
      console.error(`- ${finding.file}: contains ${finding.label}`);
    }
    process.exit(1);
  }

  console.log(`AdSense output check passed for ${files.length} generated text files and ${htmlFiles.length} HTML pages in ${toDisplayPath(DIST_DIR)}.`);
}

await main();
