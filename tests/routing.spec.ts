import { test, expect } from '@playwright/test';

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
