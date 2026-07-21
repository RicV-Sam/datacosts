
import { test, expect } from '@playwright/test';

test('verify ussd page updates', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
  await page.goto('http://localhost:3000/ussd-codes-south-africa/');

  // 1. Verify Header & Last Updated
  await expect(page.locator('h1')).toHaveText('USSD Codes South Africa: MTN, Vodacom, Telkom and Cell C');

  const lastUpdated = await page.textContent('main');
  expect(lastUpdated).toContain('9 July 2026');
  await page.screenshot({ path: testInfo.outputPath('v4_hero.png') });

  // 2. Verify current quick-code utility
  const quickUtility = page.getByRole('heading', { name: 'Quick USSD codes' });
  await expect(quickUtility).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('v4_quick_utility.png') });

  // 3. Verify FAQ Section
  const faqHeading = page.getByRole('heading', { name: 'Frequently Asked Questions' });
  await expect(faqHeading).toBeVisible();

  await expect(page.getByText('What is the USSD code to check airtime or data balance in South Africa?')).toBeVisible();
  await expect(page.locator('#faq').getByText(/Common balance shortcuts are MTN/)).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('v4_faq.png') });

  // 4. Verify Dial/Copy buttons in main list
  const vodacomSection = page.locator('#vodacom-ussd-codes');
  await expect(vodacomSection).toBeVisible();

  const dialButton = vodacomSection.locator('text=DIAL').first();
  const copyButton = vodacomSection.locator('text=COPY').first();
  await expect(dialButton).toBeVisible();
  await expect(copyButton).toBeVisible();

  await page.screenshot({ path: testInfo.outputPath('v4_list_actions.png') });
});
