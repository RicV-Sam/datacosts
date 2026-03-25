import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 812 }, isMobile: true });

test('capture links section', async ({ page }) => {
  await page.goto('http://localhost:3000/network/vodacom/');

  const linksSection = page.locator('h2:has-text("Narrow Your Search")').locator('xpath=..');
  await linksSection.scrollIntoViewIfNeeded();
  await linksSection.screenshot({ path: 'vodacom_links.png' });
});
