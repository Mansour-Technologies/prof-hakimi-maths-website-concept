import { test, expect } from '@playwright/test';
import { watch } from './helpers';

test('mobile menu: opens, traps focus, closes with Escape (focus returns) and via a link', async ({ page }) => {
  const errors = watch(page);
  await page.goto('');
  await expect(page.locator('.mainnav')).toBeHidden();
  const opener = page.getByRole('button', { name: 'Menu', exact: true });
  await opener.focus();
  await page.keyboard.press('Enter');
  const sheet = page.getByRole('dialog', { name: 'Menu' });
  await expect(sheet).toBeVisible();
  await expect(opener).toHaveAttribute('aria-expanded', 'true');
  for (let i = 0; i < 12; i++) await page.keyboard.press('Tab');
  expect(await page.evaluate(() => !!document.activeElement?.closest('#sheet'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(sheet).toBeHidden();
  await expect(opener).toBeFocused();
  await expect(opener).toHaveAttribute('aria-expanded', 'false');
  await opener.click();
  await sheet.getByRole('link', { name: /Contact/ }).click();
  await expect(sheet).toBeHidden();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator('#contact h2')).toBeInViewport();
  expect(errors).toEqual([]);
});

test('mobile: primary contact button is large and thumb-friendly', async ({ page }) => {
  await page.goto('');
  const box = await page.locator('#contact a.channel--primary').boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(64);
  for (const b of await page.locator('.hero__cta .btn').all()) expect((await b.boundingBox())!.height).toBeGreaterThanOrEqual(44);
});
