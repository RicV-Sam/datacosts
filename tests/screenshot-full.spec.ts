import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 3000 }, isMobile: true });

test('capture full network page', async ({ page }) => {
  await page.goto('http://localhost:3000/network/vodacom/');
  await page.screenshot({ path: 'vodacom_full.png', fullPage: true });
});
