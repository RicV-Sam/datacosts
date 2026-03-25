import { test, expect } from '@playwright/test';

test('capture extra network page sections', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 }); // iPhone X

  // Vodacom middle sections
  await page.goto('http://localhost:3000/network/vodacom/');
  await page.waitForTimeout(1000);

  await page.evaluate(() => window.scrollTo(0, 900));
  await page.screenshot({ path: 'vodacom_strengths.png' });

  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.screenshot({ path: 'vodacom_faq.png' });

  // Rain middle sections
  await page.goto('http://localhost:3000/network/rain/');
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.screenshot({ path: 'rain_strengths.png' });
});
