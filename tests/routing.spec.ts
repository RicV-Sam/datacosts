import { test, expect } from '@playwright/test';
import { getPrerenderRoutes } from '../src/config/routeCatalog';
import { getRedirectAliasRoutes } from '../src/config/redirectAliases';

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

const newSeoRoutes = [
  '/fibre/',
  '/fibre/cheap-fibre-south-africa/',
  '/fibre/prepaid-fibre-south-africa/',
  '/fibre/fibre-vs-lte-south-africa/',
  '/fibre/how-to-check-fibre-coverage-south-africa/',
  '/fibre/fibre-installation-costs-south-africa/',
  '/fibre/coverage-by-area/',
  '/buy-data-airtime-south-africa/',
  '/guides/buy-data-with-bank-apps-south-africa/',
  '/promos/'
];

function normalizePath(path: string): string {
  if (path === '/') return '/';
  const withoutHash = path.split('#')[0].split('?')[0];
  const withLeadingSlash = withoutHash.startsWith('/') ? withoutHash : `/${withoutHash}`;
  if (/\.[a-z0-9]+$/i.test(withLeadingSlash)) return withLeadingSlash;
  return `${withLeadingSlash.replace(/\/+$/, '')}/`;
}

for (const route of newSeoRoutes) {
  test(`${route} has complete indexable route SEO metadata`, async ({ page, request }) => {
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
    expect(robotsContent.toLowerCase()).not.toContain('noindex');

    const sitemapName = route.startsWith('/guides/') ? 'sitemap-guides.xml' : 'sitemap-core.xml';
    const sitemapResponse = await request.get(`/${sitemapName}`);
    expect(sitemapResponse.ok()).toBeTruthy();
    await expect(await sitemapResponse.text()).toContain(`https://datacost.co.za${route}`);
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
