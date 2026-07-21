import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

interface SearchSnapshot {
  baselineCommit: string;
  htmlCount: number;
  sitemapUrlCount: number;
  sitemapMembershipHash: string;
  routeSearchFieldsHash: string;
  visibleTextHash: string;
  internalLinksHash: string;
  robotsHash: string;
  redirectsHash: string;
}

const hash = (value: string): string => createHash('sha256').update(value).digest('hex');
const cleanText = (value: string): string => value.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const match = (html: string, pattern: RegExp): string => html.match(pattern)?.[1]?.replace(/\s+/g, ' ').trim() ?? '';

async function walk(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]));
  return nested.flat();
}

async function buildSnapshot(distDir: string): Promise<SearchSnapshot> {
  const files = (await walk(distDir)).filter((file) => file.endsWith('.html')).sort();
  const routes: Array<Record<string, string>> = [];
  const visible: Array<[string, string]> = [];
  const links: Array<[string, string[]]> = [];

  for (const file of files) {
    const html = await readFile(file, 'utf8');
    const relative = path.relative(distDir, file).replace(/\\/g, '/');
    const route = relative === 'index.html' ? '/' : `/${relative.replace(/\/index\.html$/, '')}/`;
    const bodyWithoutScripts = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
    const internalLinks = [...bodyWithoutScripts.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
      .map((item) => `${item[1]}|${cleanText(item[2])}`)
      .filter((item) => item.startsWith('/'))
      .sort();
    routes.push({
      route,
      canonical: match(html, /<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i),
      title: match(html, /<title>([\s\S]*?)<\/title>/i),
      description: match(html, /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i),
      robots: match(html, /<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i),
      h1: cleanText(match(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i))
    });
    visible.push([route, cleanText(bodyWithoutScripts)]);
    links.push([route, internalLinks]);
  }

  const sitemapFiles = (await walk(distDir)).filter((file) => /sitemap(?:-[a-z]+)?\.xml$/i.test(file));
  const sitemapUrls = (await Promise.all(sitemapFiles.map(async (file) => [...(await readFile(file, 'utf8')).matchAll(/<loc>([^<]+)<\/loc>/g)].map((item) => item[1])))).flat().filter((url) => !url.endsWith('.xml')).sort();
  const robots = await readFile(path.join(distDir, 'robots.txt'), 'utf8');
  const redirects = await readFile(path.join(distDir, '_redirects'), 'utf8');

  return {
    baselineCommit: 'd35bb614fca0c280bd86bbc2418a2c0dbe042a5a',
    htmlCount: files.length,
    sitemapUrlCount: sitemapUrls.length,
    sitemapMembershipHash: hash(JSON.stringify(sitemapUrls)),
    routeSearchFieldsHash: hash(JSON.stringify(routes)),
    visibleTextHash: hash(JSON.stringify(visible)),
    internalLinksHash: hash(JSON.stringify(links)),
    robotsHash: hash(robots),
    redirectsHash: hash(redirects)
  };
}

const args = process.argv.slice(2);
const distArg = args.indexOf('--dist');
const compareArg = args.indexOf('--compare');
const distDir = path.resolve(distArg >= 0 ? args[distArg + 1] : 'dist');
const actual = await buildSnapshot(distDir);

if (compareArg >= 0) {
  const baselinePath = path.resolve(args[compareArg + 1]);
  const baseline = JSON.parse(await readFile(baselinePath, 'utf8')) as SearchSnapshot;
  if (JSON.stringify(actual) !== JSON.stringify(baseline)) {
    console.error(JSON.stringify({ baseline, actual }, null, 2));
    process.exit(1);
  }
  console.log(`WP1 search regression passed: ${actual.htmlCount} HTML files and ${actual.sitemapUrlCount} sitemap URLs unchanged.`);
} else {
  console.log(JSON.stringify(actual, null, 2));
}

