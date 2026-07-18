import { test, expect } from '@playwright/test';

test('homepage exposes reviewer navigation for publisher approval', async ({ page }) => {
  await page.goto('/');

  for (const label of [
    'Home',
    'About',
    'Trust Center',
    'Network Comparison',
    'Guides',
    'Sitemap',
    'Contact',
    'Editorial Policy',
    'Methodology',
    'Privacy Policy',
    'Terms & Conditions',
    'Cookie Policy'
  ]) {
    await expect(page.getByRole('link', { name: label }).first()).toBeVisible();
  }
});

test('privacy and cookie pages disclose Google advertising data use', async ({ page }) => {
  await page.goto('/privacy-policy/');
  await expect(page.getByText(/cookies, web beacons, IP addresses/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /How Google uses data/i })).toBeVisible();

  await page.goto('/cookie-policy/');
  await expect(page.getByText(/cookies, web beacons, IP addresses/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /How Google uses data/i })).toBeVisible();
});

test('trust center presents accountability paths', async ({ page }) => {
  await page.goto('/trust/');

  await expect(page.getByRole('heading', { name: 'DataCost Trust Center' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'About DataCost' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Methodology' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Editorial Policy' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Contact and Corrections' }).first()).toBeVisible();
  await expect(page.getByText(/Ads, referrals, and sponsorships/i)).toBeVisible();
});

test('indexable generated problem page shows added editorial depth', async ({ page }) => {
  await page.goto('/data-problems/why-is-my-data-disappearing-vodacom/');

  await expect(page.getByRole('heading', { name: 'What This Page Adds' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Evidence to Check Before Support' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Official Support Context' })).toBeVisible();
  await expect(page.getByText(/Next scheduled review/i).first()).toBeVisible();

  const robotsMeta = page.locator('meta[name="robots"]');
  if (await robotsMeta.count()) {
    await expect(robotsMeta).not.toHaveAttribute('content', /noindex/i);
  }
});

async function expectIndexable(page, route: string) {
  await page.goto(route);
  const robotsMeta = page.locator('meta[name="robots"]');
  if (await robotsMeta.count()) {
    await expect(robotsMeta).not.toHaveAttribute('content', /noindex/i);
  }
}

async function expectLink(page, href: string) {
  await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
}

test('bundled generated problem variants stay indexable for organic protection', async ({ page }) => {
  await page.goto('/data-problems/how-to-stop-wasp-charges-mtn/');

  await expectIndexable(page, '/data-problems/how-to-stop-wasp-charges-mtn/');
  await expect(page.getByRole('heading', { name: 'What This Page Adds' })).toBeVisible();
});

test('GSC rescue pages stay indexable and receive contextual hub links', async ({ page }) => {
  const rescueRoutes = [
    '/data-problems/how-to-stop-background-data-usage-android/',
    '/data-problems/why-does-my-data-run-out-so-fast-telkom/',
    '/data-problems/how-to-stop-airtime-disappearing-telkom/'
  ];

  for (const route of rescueRoutes) {
    await expectIndexable(page, route);
  }

  for (const hubRoute of ['/guides/', '/guides/airtime-data-problems-south-africa/']) {
    await page.goto(hubRoute);
    for (const rescueRoute of rescueRoutes) {
      await expectLink(page, rescueRoute);
    }
  }
});

test('planned alerts preview is intentionally noindex and absent from the sitemap', async ({ page, request }) => {
  await page.goto('/alerts/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,follow');

  const sitemapResponse = await request.get('/sitemap-core.xml');
  expect(sitemapResponse.ok()).toBeTruthy();
  expect(await sitemapResponse.text()).not.toContain('https://datacost.co.za/alerts/');
});

test('organic-protected fix directory stays indexable and discoverable', async ({ page }) => {
  await expectIndexable(page, '/fix/');
  await expect(page.getByRole('heading', { name: 'DataCost Fixes' })).toBeVisible();

  await expectIndexable(page, '/fix/vodacom-apn-settings/');
  await expect(page.getByRole('heading', { name: /Vodacom APN Settings/i })).toBeVisible();

  await page.goto('/sitemap/');
  await expect(page.locator('a[href="/fix/"]').first()).toBeVisible();
  await expect(page.locator('a[href="/fix/vodacom-apn-settings/"]')).toHaveCount(1);
});

test('priority fix pages remain indexable and present in XML sitemap', async ({ page, request }) => {
  const priorityFixRoutes = [
    '/fix/mobile-data-on-but-not-working/',
    '/fix/mtn-data-not-working/',
    '/fix/vodacom-data-not-working/',
    '/fix/cell-c-apn-settings/',
    '/fix/rain-5g-not-working/',
    '/fix/lte-router-connected-no-internet/',
    '/fix/lte-router-apn-settings-south-africa/',
    '/fix/stop-wasp-services-vodacom/',
    '/fix/airtime-disappearing-south-africa/',
    '/fix/prepaid-electricity-token-not-loading/',
    '/fix/prepaid-meter-error-30/',
    '/fix/prepaid-meter-token-rejected/',
    '/fix/dstv-e48-32-error/',
    '/fix/dstv-payment-made-still-not-working/',
    '/fix/openview-e52-searching-for-signal/'
  ];

  for (const route of priorityFixRoutes) {
    await expectIndexable(page, route);
  }

  const response = await request.get('/sitemap-core.xml');
  expect(response.ok()).toBeTruthy();
  const sitemapXml = await response.text();

  for (const route of priorityFixRoutes) {
    expect(sitemapXml).toContain(`https://datacost.co.za${route}`);
  }
});

test('high-value pages expose contextual links into priority fix pages', async ({ page }) => {
  await page.goto('/');
  await expectLink(page, '/fix/mobile-data-on-but-not-working/');
  await expectLink(page, '/fix/stop-wasp-services-vodacom/');

  await page.goto('/guides/');
  await expectLink(page, '/fix/lte-router-connected-no-internet/');
  await expectLink(page, '/fix/prepaid-electricity-token-not-loading/');
  await expectLink(page, '/fix/dstv-e48-32-error/');

  await page.goto('/ussd-codes-south-africa/');
  await expectLink(page, '/fix/vodacom-data-not-working/');
  await expectLink(page, '/fix/airtime-disappearing-south-africa/');

  await page.goto('/network/vodacom/');
  await expectLink(page, '/fix/vodacom-data-not-working/');
  await expectLink(page, '/fix/stop-wasp-services-vodacom/');

  await page.goto('/mtn-ussd-codes/');
  await expectLink(page, '/fix/mtn-data-not-working/');
});

test('related fix graph exposes cross-links across priority clusters', async ({ page }) => {
  await page.goto('/fix/cell-c-data-not-working/');
  await expectLink(page, '/fix/cell-c-apn-settings/');

  await page.goto('/fix/lte-router-connected-no-internet/');
  await expectLink(page, '/fix/lte-router-sim-not-detected/');

  await page.goto('/fix/prepaid-meter-error-30/');
  await expectLink(page, '/fix/prepaid-meter-token-rejected/');
  await expectLink(page, '/fix/prepaid-electricity-token-not-loading/');

  await page.goto('/fix/dstv-payment-made-still-not-working/');
  await expectLink(page, '/fix/dstv-e16-error/');

  await page.goto('/fix/openview-e52-searching-for-signal/');
  await expectLink(page, '/fix/openview-no-channels/');
});

test('sitemap page links review and trust surfaces', async ({ page }) => {
  await page.goto('/sitemap/');

  for (const label of ['About', 'Trust Center', 'Contact', 'Privacy Policy', 'Cookie Policy', 'Terms', 'Editorial Policy', 'Methodology']) {
    await expect(page.getByRole('link', { name: label }).first()).toBeVisible();
  }
});
