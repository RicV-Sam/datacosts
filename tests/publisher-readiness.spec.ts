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

test('bundled generated problem variants stay indexable for organic protection', async ({ page }) => {
  await page.goto('/data-problems/how-to-stop-wasp-charges-mtn/');

  await expectIndexable(page, '/data-problems/how-to-stop-wasp-charges-mtn/');
  await expect(page.getByRole('heading', { name: 'What This Page Adds' })).toBeVisible();
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

test('sitemap page links review and trust surfaces', async ({ page }) => {
  await page.goto('/sitemap/');

  for (const label of ['About', 'Trust Center', 'Contact', 'Privacy Policy', 'Cookie Policy', 'Terms', 'Editorial Policy', 'Methodology']) {
    await expect(page.getByRole('link', { name: label }).first()).toBeVisible();
  }
});
