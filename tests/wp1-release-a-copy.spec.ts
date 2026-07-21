import { expect, test } from '@playwright/test';

test.beforeEach(async ({ context, page }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'http://localhost:3000' });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { configurable: true, get: () => false });
    window.__DATACOST_ANALYTICS_CONSENT = 'granted';
  });
  await page.goto('/ussd-codes-south-africa/');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async () => undefined }
    });
    (window as unknown as { __wp1Events: unknown[][] }).__wp1Events = [];
    window.gtag = (...args: unknown[]) => (window as unknown as { __wp1Events: unknown[][] }).__wp1Events.push(args);
  });
});

test('a successful rendered copy control emits one AN-01 event', async ({ page }) => {
  await page.getByRole('button', { name: /^Copy$/ }).first().click();
  const events = await page.evaluate(() => (window as unknown as { __wp1Events: unknown[][] }).__wp1Events);
  expect(events).toHaveLength(1);
  expect(events[0][1]).toBe('copy_ussd_code');
  expect(events[0][2]).toEqual({
    canonical_path: '/ussd-codes-south-africa/',
    operator: 'mtn',
    code_type: 'balance',
    code_id: 'ussd.mtn.balance_main',
    placement: 'ussd_hub'
  });
});

test('a failed rendered copy control emits no AN-01 event', async ({ page }) => {
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async () => { throw new Error('blocked'); } }
    });
  });
  await page.getByRole('button', { name: /^Copy$/ }).first().click();
  const events = await page.evaluate(() => (window as unknown as { __wp1Events: unknown[][] }).__wp1Events);
  expect(events).toHaveLength(0);
});

test('denied consent suppresses AN-01 after a successful rendered copy', async ({ page }) => {
  await page.evaluate(() => { window.__DATACOST_ANALYTICS_CONSENT = 'denied'; });
  await page.getByRole('button', { name: /^Copy$/ }).first().click();
  const events = await page.evaluate(() => (window as unknown as { __wp1Events: unknown[][] }).__wp1Events);
  expect(events).toHaveLength(0);
});
