import { test, expect } from '@playwright/test';
import { PAGES, NOTICE, watch } from './helpers';

for (const p of PAGES) {
  test(`page /${p} — loads, notice, noindex, no console errors, KaTeX rendered`, async ({ page }) => {
    const errors = watch(page);
    const res = await page.goto(p);
    expect(res?.status()).toBe(200);
    await expect(page.locator('[data-demo-notice]')).toHaveText(NOTICE);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.locator('footer a[href="https://mansourtechnologies.com/"]')).toHaveText('Concept digital proposé par Mansour Technologies.');
    await expect(page.locator('h1')).toHaveCount(1);
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(/\$[^$\s][^$]*\$/); // no raw TeX delimiters
    expect(text).not.toMatch(/\\(frac|lim|int|sqrt)\b/);
    if (/cours\/[a-z]|examen|labo/.test(p)) expect(await page.locator('.katex').count()).toBeGreaterThan(0);
    expect(await page.locator('a[href="#"]').count()).toBe(0);
    await page.waitForLoadState('networkidle');
    expect(errors, errors.join('\n')).toEqual([]);
  });
}

test('robots.txt disallows all, og image + favicon exist', async ({ request, baseURL }) => {
  const r = await request.get(baseURL + 'robots.txt');
  expect(await r.text()).toContain('Disallow: /');
  expect((await request.get(baseURL + 'og.png')).status()).toBe(200);
  expect((await request.get(baseURL + 'favicon.svg')).status()).toBe(200);
});

test('all internal links resolve (no 404)', async ({ page, request, baseURL }) => {
  const seen = new Set<string>();
  for (const p of PAGES) {
    await page.goto(p);
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => (a as HTMLAnchorElement).href));
    for (const h of hrefs) if (h.startsWith(new URL(baseURL!).origin) ) seen.add(h.split('#')[0]!);
  }
  for (const u of seen) {
    const r = await request.get(u);
    expect(r.status(), u).toBe(200);
  }
  expect(seen.size).toBeGreaterThan(15);
});

test('unknown route serves the 404 page', async ({ page }) => {
  const res = await page.goto('cette-page-n-existe-pas/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toContainText('domaine');
});

for (const w of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
  test(`no horizontal overflow at ${w}px`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: 900 });
    for (const p of ['', 'cours/', 'cours/derivation/', 'videos/', 'labo/', 'examen/', 'mon-espace/']) {
      await page.goto(p);
      const [sw, cw] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
      expect(sw, `/${p} at ${w}px`).toBeLessThanOrEqual(cw);
    }
  });
}

test('keyboard: skip link and main navigation are reachable', async ({ page }) => {
  await page.goto('');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('.wordmark').first()).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('.mainnav a').first()).toBeFocused();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/cours\/$/);
  await expect(page.locator('.mainnav a[aria-current="page"]')).toHaveText('Chapitres');
});

test('main navigation links work', async ({ page }) => {
  await page.goto('');
  for (const [label, re] of [['Vidéothèque', /videos\/$/], ['Labo des fonctions', /labo\/$/], ['Examen national', /examen\/$/], ['Mon espace', /mon-espace\/$/], ['Chapitres', /cours\/$/]] as const) {
    await page.locator('.mainnav').getByRole('link', { name: label }).click();
    await expect(page).toHaveURL(re);
  }
  await page.getByRole('link', { name: /Explorer les chapitres/ }).first().isVisible();
});
