import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { BASE_URL, getIndexableRoutes, validateIndexableRoutes } from '../src/config/routeCatalog';

type SitemapSection = {
  filename: string;
  routes: string[];
};

function buildUrlSetXml(routes: string[]): string {
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

function buildSitemapIndexXml(sections: SitemapSection[]): string {
  const lines = sections.map((section) => {
    return [
      '  <sitemap>',
      `    <loc>${BASE_URL}/${section.filename}</loc>`,
      '  </sitemap>'
    ].join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...lines,
    '</sitemapindex>',
    ''
  ].join('\n');
}

function buildSitemapSections(routes: string[]): SitemapSection[] {
  const trustRoutes = routes.filter((route) => route === '/methodology/' || route === '/editorial-policy/');
  const guideRoutes = routes.filter((route) => route.startsWith('/guides/') && route !== '/guides/');
  const networkRoutes = routes.filter((route) => route.startsWith('/network/') && route !== '/network/');
  const trustSet = new Set<string>(trustRoutes);
  const guideSet = new Set<string>(guideRoutes);
  const networkSet = new Set<string>(networkRoutes);
  const coreRoutes = routes.filter((route) =>
    !trustSet.has(route) &&
    !guideSet.has(route) &&
    !networkSet.has(route)
  );

  return [
    { filename: 'sitemap-core.xml', routes: coreRoutes },
    { filename: 'sitemap-guides.xml', routes: guideRoutes },
    { filename: 'sitemap-network.xml', routes: networkRoutes },
    { filename: 'sitemap-trust.xml', routes: trustRoutes }
  ];
}

async function main(): Promise<void> {
  const routes = getIndexableRoutes();
  validateIndexableRoutes(routes);

  const sitemapSections = buildSitemapSections(routes);
  const publicDir = path.resolve(process.cwd(), 'public');
  const sitemapIndexPath = path.resolve(publicDir, 'sitemap.xml');

  await mkdir(publicDir, { recursive: true });

  for (const section of sitemapSections) {
    const sitemapPath = path.resolve(publicDir, section.filename);
    const sitemapXml = buildUrlSetXml(section.routes);
    await writeFile(sitemapPath, sitemapXml, 'utf8');
  }

  const sitemapIndexXml = buildSitemapIndexXml(sitemapSections);
  await writeFile(sitemapIndexPath, sitemapIndexXml, 'utf8');

  const sectionSummary = sitemapSections
    .map((section) => `${section.filename}: ${section.routes.length}`)
    .join(', ');

  console.log(`Generated sitemap index (${routes.length} URLs) at ${sitemapIndexPath}. Sections: ${sectionSummary}`);
}

await main();
