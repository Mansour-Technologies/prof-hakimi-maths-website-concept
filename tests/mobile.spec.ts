import { test, expect } from '@playwright/test';
import { watch } from './helpers';

test('mobile 375: tab bar, menu sheet with focus trap, Escape and focus return', async ({ page }) => {
  const errors = watch(page);
  await page.goto('');
  await expect(page.locator('.mainnav')).toBeHidden();
  const tab = page.locator('.tabbar');
  await expect(tab).toBeVisible();
  const opener = tab.getByRole('button', { name: 'Menu' });
  await opener.click();
  const sheet = page.getByRole('dialog', { name: 'Menu' });
  await expect(sheet).toBeVisible();
  await expect(opener).toHaveAttribute('aria-expanded', 'true');
  expect(await page.evaluate(() => !!document.activeElement?.closest('#sheet'))).toBe(true);
  for (let i = 0; i < 12; i++) await page.keyboard.press('Tab');
  expect(await page.evaluate(() => !!document.activeElement?.closest('#sheet'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(sheet).toBeHidden();
  await expect(opener).toBeFocused();
  await opener.click();
  await sheet.getByRole('link', { name: /Mon espace/ }).click();
  await expect(page).toHaveURL(/mon-espace\/$/);
  await tab.getByRole('link', { name: 'Labo' }).click();
  await expect(page).toHaveURL(/labo\/$/);
  expect(errors).toEqual([]);
});

test('mobile 375: lab is usable by touch (tap on curve moves the point)', async ({ page }) => {
  await page.goto('labo/');
  const c = page.locator('[data-canvas]');
  await c.scrollIntoViewIfNeeded();
  const box = (await c.boundingBox())!;
  const st = await page.evaluate(() => (window as any).__lab());
  const x = st.view.cx + 1.5; // target abscissa
  const fx = 0.5 * x ** 3 - 2 * x + 1;
  const px = box.width / 2 + (x - st.view.cx) * st.view.scale;
  const py = box.height / 2 - (fx - st.view.cy) * st.view.scale;
  await c.tap({ position: { x: px, y: py } });
  const st2 = await page.evaluate(() => (window as any).__lab());
  expect(st2.x0).toBeCloseTo(x, 1);
  const [sw, cw] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
  expect(sw).toBeLessThanOrEqual(cw);
});

test('mobile 375: exercise answer works with touch', async ({ page }) => {
  await page.goto('');
  const ex = page.locator('[data-ex="dv-3"]');
  await ex.scrollIntoViewIfNeeded();
  await ex.getByText('y=2x−1').tap().catch(async () => { await ex.locator('label.opt').nth(2).tap(); });
  await ex.getByRole('button', { name: 'Vérifier' }).tap();
  await expect(ex).toHaveAttribute('data-state', 'ok');
});
