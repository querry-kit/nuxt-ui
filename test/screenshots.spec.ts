import { expect, test } from '@playwright/test';

test('captures the default pagination control', async ({ page }) => {
  await page.goto('/iframe.html?id=table-pagination--default&viewMode=story');
  await expect(page.locator('#storybook-root')).toHaveScreenshot('table-pagination-default.png');
});

test('captures the custom pagination footer', async ({ page }) => {
  await page.goto('/iframe.html?id=table-pagination--custom-footer&viewMode=story');
  await expect(page.locator('#storybook-root')).toHaveScreenshot('table-pagination-custom-footer.png');
});
