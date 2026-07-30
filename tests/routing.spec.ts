import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import {
  BUNDLE_TYPE_MAP,
  getPrerenderRoutes,
  isNoindexRoute,
  meetsNetworkFacetEvidenceGate
} from '../src/config/routeCatalog';
import { getRedirectAliasRoutes } from '../src/config/redirectAliases';
import { bundles } from '../src/data';

test('visiting /index.html redirects to /', async ({ page }) => {
  await page.goto('/index.html');
  await expect(page).toHaveURL(/\/$/);
});

test('visiting /guides/cheapest-1gb-data-south-africa/index.html redirects to /guides/cheapest-1gb-data-south-africa/', async ({ page }) => {
  await page.goto('/guides/cheapest-1gb-data-south-africa/index.html');
  await expect(page).toHaveURL(/\/guides\/cheapest-1gb-data-south-africa\/$/);
});

test('visiting /ussd-codes-south-africa/index.html redirects to /ussd-codes-south-africa/', async ({ page }) => {
  await page.goto('/ussd-codes-south-africa/index.html');
  await expect(page).toHaveURL(/\/ussd-codes-south-africa\/$/);
});

test('preserves query parameters and hash during redirect', async ({ page }) => {
  await page.goto('/guides/cheapest-1gb-data-south-africa/index.html?test=1#section');
  await expect(page).toHaveURL(/\/guides\/cheapest-1gb-data-south-africa\/\?test=1#section$/);
});

for (const alias of [
  {
    output: 'dist/ussd-codes/index.html',
    target: '/ussd-codes-south-africa/'
  },
  {
    output: 'dist/fix-mobile-problems/index.html',
    target: '/fix/'
  },
  {
    output: 'dist/fibre/cheap-fibre-south-africa/index.html',
    target: '/fibre/cheapest-fibre-packages-south-africa/'
  }
]) {
  test(`${alias.output} uses a crawlable permanent meta-refresh signal`, async () => {
    const html = await readFile(path.resolve(process.cwd(), alias.output), 'utf8');
    expect(html).toContain(`<meta http-equiv="refresh" content="0;url=${alias.target}">`);
    expect(html).toContain(`<link data-rh="true" rel="canonical" href="https://datacost.co.za${alias.target}">`);
    expect(html).not.toMatch(/<meta\b[^>]*name=["']robots["'][^>]*noindex/i);
    expect(html).not.toContain('pagead/js/adsbygoogle.js');
  });
}

const newSeoRoutes = [
  '/fibre/',
  '/fibre/cheapest-fibre-packages-south-africa/',
  '/fibre/prepaid-fibre-south-africa/',
  '/fibre/fibre-vs-lte-south-africa/',
  '/fibre/how-to-check-fibre-coverage-south-africa/',
  '/fibre/fibre-installation-costs-south-africa/',
  '/fibre/coverage-by-area/',
  '/buy-data-airtime-south-africa/',
  '/guides/buy-data-with-bank-apps-south-africa/',
  '/guides/how-to-cancel-cellphone-contract-south-africa/',
  '/guides/what-to-do-when-cellphone-contract-ends-south-africa/',
  '/guides/cellphone-retention-offer-vs-switching-south-africa/',
  '/promos/'
];

function normalizePath(path: string): string {
  if (path === '/') return '/';
  const withoutHash = path.split('#')[0].split('?')[0];
  const withLeadingSlash = withoutHash.startsWith('/') ? withoutHash : `/${withoutHash}`;
  if (/\.[a-z0-9]+$/i.test(withLeadingSlash)) return withLeadingSlash;
  return `${withLeadingSlash.replace(/\/+$/, '')}/`;
}

const reviewedNetworkFacets = ['/network/vodacom/night-data/'];
const evidenceBlockedNetworkFacets = [
  '/network/mtn/monthly-data/',
  '/network/cell-c/monthly-data/',
  '/network/cell-c/cheapest-1gb/',
  '/network/telkom/cheapest-1gb/',
  '/network/vodacom/daily-data/',
  '/network/cell-c/daily-data/',
  '/network/cell-c/weekly-data/',
  '/network/telkom/daily-data/'
];

test('general-use 1GB filtering excludes night-only and social bundles', () => {
  const matchingTelkomBundles = bundles
    .filter((bundle) => bundle.network === 'Telkom')
    .filter((bundle) => BUNDLE_TYPE_MAP['cheapest-1gb'].filter(bundle));

  expect(matchingTelkomBundles.length).toBeGreaterThan(0);
  expect(matchingTelkomBundles.every((bundle) => bundle.anytimeData !== '0MB')).toBeTruthy();
  expect(matchingTelkomBundles.every((bundle) => !bundle.name.toLowerCase().includes('night'))).toBeTruthy();
});

test('Vodacom night indexing is protected by a verified-and-dated evidence gate', () => {
  expect(meetsNetworkFacetEvidenceGate('/network/vodacom/night-data/')).toBeTruthy();

  const inventoryWithoutDatedVodacomEvidence = bundles.map((bundle) =>
    bundle.network === 'Vodacom' && BUNDLE_TYPE_MAP['night-data'].filter(bundle)
      ? { ...bundle, lastVerified: undefined }
      : bundle
  );

  expect(
    meetsNetworkFacetEvidenceGate(
      '/network/vodacom/night-data/',
      inventoryWithoutDatedVodacomEvidence
    )
  ).toBeFalsy();
});

test('reviewed and evidence-blocked network facets have the intended indexing policy', async ({ page, request }) => {
  const sitemapResponse = await request.get('/sitemap-network.xml');
  expect(sitemapResponse.ok()).toBeTruthy();
  const sitemapXml = await sitemapResponse.text();

  for (const route of reviewedNetworkFacets) {
    await page.goto(route);
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://datacost.co.za${route}`);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'Official sources and review status' })).toBeVisible();
    expect(sitemapXml).toContain(`<loc>https://datacost.co.za${route}</loc>`);
    expect(sitemapXml).toContain('<lastmod>2026-07-30</lastmod>');
  }

  for (const route of evidenceBlockedNetworkFacets) {
    await page.goto(route);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,follow');
    expect(sitemapXml).not.toContain(`https://datacost.co.za${route}`);
  }
});

test('Vodacom night comparison exposes allocation, restrictions and truthful source evidence', async ({ page }) => {
  await page.goto('/network/vodacom/night-data/');

  await expect(page.getByText('5GB anytime').first()).toBeVisible();
  await expect(page.getByText('5GB night').first()).toBeVisible();
  await expect(page.getByText('00:00-05:00').first()).toBeVisible();
  await expect(page.getByText('Prepaid LTE / router').first()).toBeVisible();
  await expect(page.getByText('Checked 4 July 2026').first()).toBeVisible();
  await expect(page.getByText('Recheck before buying').first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Vodacom prepaid LTE data page/i }).first()).toHaveAttribute('href', /vodacom\.co\.za/);

  const rows = page.locator('tbody tr');
  await expect(rows.first()).toContainText('Vodacom Prepaid LTE 5GB Anytime + 5GB Night Owl');
  await expect(rows.first()).toContainText('R19.80 / anytime GB');
  await expect(rows.first()).toContainText('Restricted night data is excluded from this figure.');

  const uncheckedRow = rows.filter({ hasText: 'Vodacom Night Owl 250MB' });
  await expect(uncheckedRow).toContainText('Confirm');
  await expect(uncheckedRow).toContainText('Dataset reference: R14');
  await expect(uncheckedRow).toContainText('No R/GB comparison is shown for an unchecked price.');

  const itemListText = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.map((script) => script.textContent || '').find((text) => text.includes('"@type":"ItemList"')) || ''
  );
  const itemList = JSON.parse(itemListText);
  const manualItem = itemList.itemListElement.find(
    (entry: { item: { name: string } }) => entry.item.name === 'Vodacom Night Owl 250MB'
  );
  const verifiedItem = itemList.itemListElement.find(
    (entry: { item: { name: string } }) => entry.item.name === 'Vodacom Prepaid LTE 5GB Anytime + 5GB Night Owl'
  );
  expect(itemList.itemListElement[0].item.name).toBe('Vodacom Prepaid LTE 5GB Anytime + 5GB Night Owl');
  expect(itemList.itemListElement.at(-1).item.name).toBe('Vodacom Night Owl 250MB');
  expect(manualItem.item.offers.price).toBeUndefined();
  expect(manualItem.item.offers.availability).toBeUndefined();
  expect(verifiedItem.item.offers.price).toBe('99.00');
});

test('Vodacom night comparison contains horizontal table overflow without page overflow at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/network/vodacom/night-data/');
  const tableRegion = page.getByRole('region', { name: 'Scrollable bundle comparison' });
  await expect(tableRegion).toBeVisible();
  expect(await tableRegion.evaluate((element) => element.scrollWidth > element.clientWidth)).toBeTruthy();
  await tableRegion.focus();
  await expect(tableRegion).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
});

test('human sitemap links only the reviewed facet and canonical fibre page from this batch', async ({ page }) => {
  await page.goto('/sitemap/');
  await expect(page.locator('a[href="/network/vodacom/night-data/"]')).toHaveCount(1);
  await expect(page.locator('a[href="/fibre/cheapest-fibre-packages-south-africa/"]')).toHaveCount(1);
  await expect(page.locator('a[href="/fibre/cheap-fibre-south-africa/"]')).toHaveCount(0);
  for (const route of evidenceBlockedNetworkFacets) {
    await expect(page.locator(`a[href="${route}"]`)).toHaveCount(0);
  }
});

for (const route of newSeoRoutes) {
  const routeIsNoindex = isNoindexRoute(route);

  test(`${route} has complete route SEO metadata`, async ({ page, request }) => {
    await page.goto(route);

    await expect(page.locator('head > title')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);

    const titleText = await page.locator('head > title').textContent();
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute('href');
    const robotsContent = (await page.locator('meta[name="robots"]').count()) > 0
      ? (await page.locator('meta[name="robots"]').first().getAttribute('content')) || ''
      : '';

    expect(titleText?.trim().length).toBeGreaterThan(0);
    expect(metaDescription?.trim().length).toBeGreaterThan(0);
    expect(canonicalHref).toBe(`https://datacost.co.za${route}`);
    if (routeIsNoindex) {
      expect(robotsContent.toLowerCase()).toContain('noindex');
    } else {
      expect(robotsContent.toLowerCase()).not.toContain('noindex');
    }

    const sitemapName = route.startsWith('/guides/') ? 'sitemap-guides.xml' : 'sitemap-core.xml';
    const sitemapResponse = await request.get(`/${sitemapName}`);
    expect(sitemapResponse.ok()).toBeTruthy();
    const sitemapXml = await sitemapResponse.text();
    if (routeIsNoindex) {
      expect(sitemapXml).not.toContain(`https://datacost.co.za${route}`);
    } else {
      expect(sitemapXml).toContain(`https://datacost.co.za${route}`);
    }
  });
}

test('new sprint pages do not introduce broken internal hrefs', async ({ page }) => {
  const validRoutes = new Set([...getPrerenderRoutes(), ...getRedirectAliasRoutes()].map(normalizePath));
  validRoutes.add('/sitemap.xml');
  validRoutes.add('/sitemap-core.xml');
  validRoutes.add('/sitemap-guides.xml');
  validRoutes.add('/sitemap-network.xml');
  validRoutes.add('/sitemap-trust.xml');

  for (const route of newSeoRoutes) {
    await page.goto(route);
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href')).filter(Boolean)
    );
    const missing = hrefs
      .map((href) => normalizePath(href as string))
      .filter((href) => !validRoutes.has(href));

    expect.soft(missing, `${route} contains unknown internal hrefs`).toEqual([]);
  }
});
