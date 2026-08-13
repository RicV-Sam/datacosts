import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { getIndexableRoutes, getSitemapRoutes } from '../src/config/routeCatalog';

const contextualRoutes = [
  '/data-problems/how-to-check-wasp-subscriptions-mtn/',
  '/data-problems/how-to-check-wasp-subscriptions-vodacom/',
  '/data-problems/how-to-stop-airtime-disappearing-cell-c/',
  '/data-problems/how-to-stop-airtime-disappearing-vodacom/',
  '/data-problems/how-to-stop-apps-using-data-in-background-samsung/',
  '/data-problems/how-to-stop-data-disappearing-mtn/',
  '/data-problems/how-to-stop-wasp-charges-cell-c/',
  '/data-problems/how-to-stop-wasp-charges-telkom/',
  '/data-problems/why-is-my-airtime-disappearing-mtn-prepaid/',
  '/data-problems/why-is-my-data-disappearing-overnight-android/',
  '/guides/why-is-my-data-disappearing-mtn/',
  '/guides/why-is-my-data-disappearing-vodacom/'
] as const;

test('the troubleshooting hub links every previously orphaned indexable page', async () => {
  const source = await readFile('src/pages/AirtimeDataProblemsHubPage.tsx', 'utf8');
  const indexableRoutes = new Set(getIndexableRoutes());
  const sitemapRoutes = new Set(getSitemapRoutes());

  for (const route of contextualRoutes) {
    assert.match(source, new RegExp(`href: ['\"]${route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['\"]`));
    assert.ok(indexableRoutes.has(route), `${route} must remain indexable`);
    assert.ok(sitemapRoutes.has(route), `${route} must remain in a sitemap`);
  }
});

test('the changed hub retains its canonical, breadcrumb, Article, and FAQ contracts', async () => {
  const source = await readFile('src/pages/AirtimeDataProblemsHubPage.tsx', 'utf8');

  assert.match(source, /toCanonicalUrl\('\/guides\/airtime-data-problems-south-africa\/'\)/);
  assert.match(source, /buildBreadcrumbSchema\(breadcrumbItems\)/);
  assert.match(source, /'@type': 'Article'/);
  assert.match(source, /'@type': 'FAQPage'/);
  assert.ok(getIndexableRoutes().includes('/guides/airtime-data-problems-south-africa/'));
});
