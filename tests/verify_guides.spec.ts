import { test, expect } from '@playwright/test';

test('verify guides hub page', async ({ page }) => {
  await page.goto('http://localhost:3000/guides/');
  await page.waitForTimeout(2000); // Wait for animations
  await page.screenshot({ path: 'guides_hub_top.png' });

  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'guides_hub_middle.png' });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'guides_hub_bottom.png' });
});
