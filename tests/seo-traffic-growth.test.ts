import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { getIndexableRoutes, getPrerenderRoutes, getSitemapRoutes } from '../src/config/routeCatalog';
import { getRouteModifiedIso } from '../src/seo/contentDates';

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

const reviewedTroubleshootingSlugs = [
  'how-to-stop-airtime-disappearing-cell-c',
  'how-to-stop-airtime-disappearing-vodacom',
  'how-to-stop-data-from-disappearing-android',
  'why-does-my-data-run-out-so-fast-cell-c',
  'why-does-my-data-run-out-so-fast-mtn',
  'why-is-my-airtime-disappearing-mtn-prepaid',
  'why-is-my-airtime-disappearing-vodacom-prepaid',
  'why-is-my-data-disappearing-overnight-android'
];

test('reviewed troubleshooting guidance has inspectable primary sources and consistent publication dates', async () => {
  const officialHosts = new Set(['www.cellc.co.za', 'www.vodacom.co.za', 'now.vodacom.co.za', 'www.mtn.co.za', 'support.google.com', 'www.samsung.com']);
  for (const slug of reviewedTroubleshootingSlugs) {
    const page = JSON.parse(await readFile(`src/data/seo-pages/data-problems/${slug}.json`, 'utf8'));
    assert.ok(page.officialSources.length >= 3, slug);
    for (const source of page.officialSources) {
      const url = new URL(source.href);
      assert.equal(url.protocol, 'https:', slug);
      assert.ok(officialHosts.has(url.hostname), `${slug}: unreviewed source host`);
      assert.ok(source.label && source.note, slug);
    }
    assert.ok(page.reviewDueDate > page.lastReviewed, slug);
    if (page.indexingStatus === 'index') {
      assert.equal(getRouteModifiedIso(`/data-problems/${slug}/`).slice(0, 10), page.lastReviewed, slug);
    }
  }
});

test('reviewing the Android draft does not publish or prerender a new route', async () => {
  const slug = 'how-to-stop-data-from-disappearing-android';
  const page = JSON.parse(await readFile(`src/data/seo-pages/data-problems/${slug}.json`, 'utf8'));
  assert.equal(page.indexingStatus, 'draft');
  const route = `/data-problems/${slug}/`;
  for (const routes of [getIndexableRoutes(), getSitemapRoutes(), getPrerenderRoutes()]) {
    assert.ok(!routes.includes(route), route);
  }
});
