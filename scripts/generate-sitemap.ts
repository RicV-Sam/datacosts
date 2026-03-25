import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { BASE_URL, getIndexableRoutes, validateIndexableRoutes } from '../src/config/routeCatalog';

function buildSitemapXml(routes: string[]): string {
  const lines = routes.map((route) => {
    return [
      '  <url>',
      `    <loc>${BASE_URL}${route}</loc>`,
      '  </url>'
    ].join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...lines,
    '</urlset>',
    ''
  ].join('\n');
}

async function main(): Promise<void> {
  const routes = getIndexableRoutes();
  validateIndexableRoutes(routes);

  const sitemapXml = buildSitemapXml(routes);
  const sitemapPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');

  await mkdir(path.dirname(sitemapPath), { recursive: true });
  await writeFile(sitemapPath, sitemapXml, 'utf8');

  console.log(`Generated sitemap with ${routes.length} canonical URLs at ${sitemapPath}`);
}

await main();
