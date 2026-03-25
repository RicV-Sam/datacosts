
import { test, expect } from '@playwright/test';

test('verify ussd page updates', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
  await page.goto('http://localhost:3000/ussd-codes-south-africa/');

  // 1. Verify Header & Last Updated
  const title = await page.textContent('h1');
  expect(title).toContain('2026');

  const lastUpdated = await page.textContent('main');
  expect(lastUpdated).toContain('20 March 2026');
  await page.screenshot({ path: '/home/jules/verification/v4_hero.png' });

  // 2. Verify Quick Utility
  const quickUtility = page.locator('text=Quick Utility');
  await expect(quickUtility).toBeVisible();
  await page.screenshot({ path: '/home/jules/verification/v4_quick_utility.png' });

  // 3. Verify FAQ Section
  const faqHeading = page.locator('text=Common Questions');
  await expect(faqHeading).toBeVisible();

  // Open first FAQ
  await page.click('text=What are USSD codes and how do they work?');
  await expect(page.locator('text=numeric sequences starting with *')).toBeVisible();
  await page.screenshot({ path: '/home/jules/verification/v4_faq.png' });

  // 4. Verify Dial/Copy buttons in main list
  const vodacomSection = page.locator('#vodacom');
  await expect(vodacomSection).toBeVisible();

  const dialButton = vodacomSection.locator('text=DIAL').first();
  const copyButton = vodacomSection.locator('text=COPY').first();
  await expect(dialButton).toBeVisible();
  await expect(copyButton).toBeVisible();

  await page.screenshot({ path: '/home/jules/verification/v4_list_actions.png' });
});
