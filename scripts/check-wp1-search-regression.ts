import { createHash } from 'node:crypto';
import { mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export interface RouteSnapshot {
  route: string;
  title: string;
  description: string;
  robots: string;
  canonical: string;
  h1: string;
  visibleTextHash: string;
  internalLinksHash: string;
  internalLinks: string[];
  structuredDataHash: string;
  structuredDataBlockCount: number;
  structuredDataSummary: Array<{
    types: string[];
    ids: string[];
    urls: string[];
    datePublished: string[];
    dateModified: string[];
  }>;
}

export interface SearchSnapshotV2 {
  version: 2;
  baselineCommit: string;
  htmlCount: number;
  routeCount: number;
  titleCount: number;
  sitemapUrlCount: number;
  sitemapMembershipHash: string;
  structuredDataBlockCount: number;
  routes: RouteSnapshot[];
  sitemapUrls: string[];
  robotsHash: string;
  robotsText: string;
  redirectsHash: string;
  redirectsText: string;
}

export interface SnapshotDifference {
  route: string;
  field: string;
  expected: unknown;
  actual: unknown;
  summary: string;
}

const BASELINE_COMMIT = 'd35bb614fca0c280bd86bbc2418a2c0dbe042a5a';
const hash = (value: string): string => createHash('sha256').update(value).digest('hex');

export function normalizeTextFile(value: string): string {
  return value.replace(/\r\n?/g, '\n').replace(/[ \t]+$/gm, '').replace(/\n+$/g, '');
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function stripTags(value: string): string {
  return normalizeWhitespace(value.replace(/<[^>]+>/g, ' '));
}

function parseAttributes(tag: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  const body = tag.replace(/^<\/?[a-z0-9:-]+/i, '').replace(/\/?\s*>$/, '');
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const match of body.matchAll(pattern)) {
    attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? '';
  }
  return attributes;
}

function elementText(html: string, tagName: string): string {
  const pattern = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  return stripTags(html.match(pattern)?.[1] ?? '');
}

function headAttribute(html: string, tagName: 'meta' | 'link', predicate: (attributes: Record<string, string>) => boolean, field: string): string {
  const pattern = new RegExp(`<${tagName}\\b[^>]*>`, 'gi');
  for (const match of html.matchAll(pattern)) {
    const attributes = parseAttributes(match[0]);
    if (predicate(attributes)) return normalizeWhitespace(attributes[field] ?? '');
  }
  return '';
}

function stableJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stableJson);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => [key, stableJson(item)]));
  }
  return value;
}

function collectSchemaValues(value: unknown, key: string, output: string[]): void {
  if (Array.isArray(value)) {
    for (const item of value) collectSchemaValues(item, key, output);
    return;
  }
  if (value === null || typeof value !== 'object') return;
  for (const [itemKey, itemValue] of Object.entries(value as Record<string, unknown>)) {
    if (itemKey === key) {
      if (typeof itemValue === 'string') output.push(itemValue);
      if (Array.isArray(itemValue)) output.push(...itemValue.filter((item): item is string => typeof item === 'string'));
    }
    collectSchemaValues(itemValue, key, output);
  }
}

function summarizeStructuredData(value: unknown): RouteSnapshot['structuredDataSummary'][number] {
  const collect = (key: string): string[] => {
    const values: string[] = [];
    collectSchemaValues(value, key, values);
    return [...new Set(values)].sort();
  };
  return {
    types: collect('@type'),
    ids: collect('@id'),
    urls: collect('url'),
    datePublished: collect('datePublished'),
    dateModified: collect('dateModified')
  };
}

function parseStructuredData(html: string, route: string): { normalizedBlocks: string[]; summary: RouteSnapshot['structuredDataSummary'] } {
  const blocks: Array<{ normalized: string; summary: RouteSnapshot['structuredDataSummary'][number] }> = [];
  const pattern = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(pattern)) {
    const openTag = match[0].slice(0, match[0].indexOf('>') + 1);
    const attributes = parseAttributes(openTag);
    if ((attributes.type ?? '').toLowerCase() !== 'application/ld+json') continue;
    let parsed: unknown;
    try {
      parsed = JSON.parse(match[1]);
    } catch (error) {
      throw new Error(`Malformed JSON-LD on ${route}: ${error instanceof Error ? error.message : String(error)}`);
    }
    const normalized = JSON.stringify(stableJson(parsed));
    blocks.push({ normalized, summary: summarizeStructuredData(parsed) });
  }
  blocks.sort((left, right) => left.normalized.localeCompare(right.normalized));
  return {
    normalizedBlocks: blocks.map((block) => block.normalized),
    summary: blocks.map((block) => block.summary)
  };
}

async function walk(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]));
  return nested.flat();
}

function routeFromFile(distDir: string, file: string): string {
  const relative = path.relative(distDir, file).replace(/\\/g, '/');
  return relative === 'index.html' ? '/' : `/${relative.replace(/\/index\.html$/, '')}/`;
}

export async function buildSearchSnapshot(distDir: string): Promise<SearchSnapshotV2> {
  const files = (await walk(distDir)).filter((file) => file.endsWith('.html')).sort();
  const routes: RouteSnapshot[] = [];
  let structuredDataBlockCount = 0;

  for (const file of files) {
    const html = await readFile(file, 'utf8');
    const route = routeFromFile(distDir, file);
    const withoutScriptsOrStyles = html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
    const internalLinks = [...withoutScriptsOrStyles.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)]
      .map((link) => {
        const openTag = link[0].slice(0, link[0].indexOf('>') + 1);
        const attributes = parseAttributes(openTag);
        return { href: attributes.href ?? '', anchor: stripTags(link[0]) };
      })
      .filter((link) => link.href.startsWith('/'))
      .map((link) => `${link.href}|${link.anchor}`)
      .sort();
    const structured = parseStructuredData(html, route);
    structuredDataBlockCount += structured.normalizedBlocks.length;

    routes.push({
      route,
      title: elementText(html, 'title'),
      description: headAttribute(html, 'meta', (attrs) => attrs.name?.toLowerCase() === 'description', 'content'),
      robots: headAttribute(html, 'meta', (attrs) => attrs.name?.toLowerCase() === 'robots', 'content'),
      canonical: headAttribute(html, 'link', (attrs) => (attrs.rel ?? '').toLowerCase().split(/\s+/).includes('canonical'), 'href'),
      h1: elementText(html, 'h1'),
      visibleTextHash: hash(stripTags(withoutScriptsOrStyles)),
      internalLinksHash: hash(JSON.stringify(internalLinks)),
      internalLinks,
      structuredDataHash: hash(JSON.stringify(structured.normalizedBlocks)),
      structuredDataBlockCount: structured.normalizedBlocks.length,
      structuredDataSummary: structured.summary
    });
  }

  routes.sort((left, right) => left.route.localeCompare(right.route));
  const sitemapFiles = (await walk(distDir)).filter((file) => /sitemap(?:-[a-z]+)?\.xml$/i.test(file));
  const sitemapUrls = (await Promise.all(sitemapFiles.map(async (file) =>
    [...normalizeTextFile(await readFile(file, 'utf8')).matchAll(/<loc>([^<]+)<\/loc>/g)].map((item) => item[1])
  ))).flat().filter((url) => !url.endsWith('.xml')).sort();
  const robotsText = normalizeTextFile(await readFile(path.join(distDir, 'robots.txt'), 'utf8'));
  const redirectsText = normalizeTextFile(await readFile(path.join(distDir, '_redirects'), 'utf8'));

  return {
    version: 2,
    baselineCommit: BASELINE_COMMIT,
    htmlCount: files.length,
    routeCount: routes.length,
    titleCount: routes.filter((route) => route.title.length > 0).length,
    sitemapUrlCount: sitemapUrls.length,
    sitemapMembershipHash: hash(JSON.stringify(sitemapUrls)),
    structuredDataBlockCount,
    routes,
    sitemapUrls,
    robotsHash: hash(robotsText),
    robotsText,
    redirectsHash: hash(redirectsText),
    redirectsText
  };
}

function conciseValue(value: unknown): unknown {
  if (Array.isArray(value) && value.length > 8) return { count: value.length, first: value.slice(0, 3), last: value.slice(-3) };
  if (typeof value === 'string' && value.length > 240) return `${value.slice(0, 237)}...`;
  return value;
}

export function compareSearchSnapshots(expected: SearchSnapshotV2, actual: SearchSnapshotV2): SnapshotDifference[] {
  const differences: SnapshotDifference[] = [];
  const compare = (route: string, field: string, left: unknown, right: unknown): void => {
    if (JSON.stringify(left) === JSON.stringify(right)) return;
    differences.push({
      route,
      field,
      expected: conciseValue(left),
      actual: conciseValue(right),
      summary: `${route} changed ${field}`
    });
  };

  for (const field of ['htmlCount', 'routeCount', 'titleCount', 'sitemapUrlCount', 'sitemapMembershipHash', 'structuredDataBlockCount', 'robotsHash', 'redirectsHash'] as const) {
    compare('[build]', field, expected[field], actual[field]);
  }
  compare('[sitemaps]', 'membership', expected.sitemapUrls, actual.sitemapUrls);
  compare('[robots.txt]', 'content', expected.robotsText, actual.robotsText);
  compare('[_redirects]', 'content', expected.redirectsText, actual.redirectsText);

  const expectedRoutes = new Map(expected.routes.map((route) => [route.route, route]));
  const actualRoutes = new Map(actual.routes.map((route) => [route.route, route]));
  for (const route of [...new Set([...expectedRoutes.keys(), ...actualRoutes.keys()])].sort()) {
    const left = expectedRoutes.get(route);
    const right = actualRoutes.get(route);
    if (!left || !right) {
      compare(route, 'route_presence', Boolean(left), Boolean(right));
      continue;
    }
    for (const field of ['title', 'description', 'robots', 'canonical', 'h1', 'visibleTextHash', 'internalLinksHash', 'internalLinks', 'structuredDataHash', 'structuredDataBlockCount', 'structuredDataSummary'] as const) {
      compare(route, field, left[field], right[field]);
    }
  }
  return differences;
}

export type BuildRunner = (outDir: string) => Promise<void>;

export async function runProductionBuild(outDir: string): Promise<void> {
  const npmCli = process.env.npm_execpath;
  const executable = npmCli ? process.execPath : (process.platform === 'win32' ? 'npm.cmd' : 'npm');
  const commandArgs = npmCli
    ? [npmCli, 'run', 'build:wp1-search', '--', '--outDir', outDir, '--emptyOutDir']
    : ['run', 'build:wp1-search', '--', '--outDir', outDir, '--emptyOutDir'];
  await new Promise<void>((resolve, reject) => {
    const child = spawn(executable, commandArgs, {
      cwd: process.cwd(),
      env: { ...process.env, DATACOST_WP1_SEARCH_BUILD: '1' },
      stdio: 'inherit',
      shell: false
    });
    child.once('error', reject);
    child.once('exit', (code) => code === 0 ? resolve() : reject(new Error(`Fresh WP1 search build failed with exit code ${code}`)));
  });
}

export async function withFreshSearchBuild<T>(
  action: (outDir: string) => Promise<T>,
  options: { buildRunner?: BuildRunner; keepTemporaryBuild?: boolean } = {}
): Promise<T> {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'datacost-wp1-search-'));
  const outDir = path.join(temporaryRoot, 'dist');
  try {
    await (options.buildRunner ?? runProductionBuild)(outDir);
    return await action(outDir);
  } finally {
    if (!options.keepTemporaryBuild) await rm(temporaryRoot, { recursive: true, force: true });
    else console.log(`Temporary WP1 search build retained at ${temporaryRoot}`);
  }
}

async function readSnapshot(file: string): Promise<SearchSnapshotV2> {
  const parsed = JSON.parse(await readFile(file, 'utf8')) as SearchSnapshotV2;
  if (parsed.version !== 2) throw new Error(`Unsupported search baseline version in ${file}; generate and review an explicit v2 candidate.`);
  return parsed;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const valueAfter = (flag: string): string | undefined => {
    const index = args.indexOf(flag);
    return index >= 0 ? args[index + 1] : undefined;
  };
  const comparePath = valueAfter('--compare');
  const candidatePath = valueAfter('--generate-candidate');
  const reviewCandidatePath = valueAfter('--review-candidate');
  const explicitDist = valueAfter('--dist');
  const keepTemporaryBuild = args.includes('--keep-temp');

  if (reviewCandidatePath) {
    if (!comparePath) throw new Error('--review-candidate requires --compare.');
    const differences = compareSearchSnapshots(await readSnapshot(path.resolve(comparePath)), await readSnapshot(path.resolve(reviewCandidatePath)));
    if (differences.length > 0) {
      console.error(JSON.stringify({ differenceCount: differences.length, differences }, null, 2));
      process.exitCode = 1;
      return;
    }
    console.log('Candidate snapshot is identical to the committed baseline.');
    return;
  }

  const inspect = async (distDir: string): Promise<void> => {
    const actual = await buildSearchSnapshot(distDir);
    if (candidatePath) {
      await writeFile(path.resolve(candidatePath), `${JSON.stringify(actual, null, 2)}\n`, 'utf8');
      console.log(`Candidate search snapshot written to ${path.resolve(candidatePath)} for review; committed baseline was not changed.`);
      return;
    }
    if (!comparePath) {
      console.log(JSON.stringify(actual, null, 2));
      return;
    }
    const baseline = await readSnapshot(path.resolve(comparePath));
    const differences = compareSearchSnapshots(baseline, actual);
    if (differences.length > 0) {
      console.error(JSON.stringify({ differenceCount: differences.length, differences }, null, 2));
      process.exitCode = 1;
      return;
    }
    console.log(`WP1 search regression passed: fresh build contains ${actual.htmlCount} HTML files, ${actual.titleCount} titles, ${actual.sitemapUrlCount} sitemap URLs and ${actual.structuredDataBlockCount} JSON-LD blocks.`);
  };

  if (explicitDist) {
    if (!args.includes('--allow-explicit-dist')) throw new Error('--dist is test-only and requires --allow-explicit-dist.');
    await inspect(path.resolve(explicitDist));
  } else {
    await withFreshSearchBuild(inspect, { keepTemporaryBuild });
  }
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (fileURLToPath(import.meta.url) === invokedPath) {
  await main();
}
