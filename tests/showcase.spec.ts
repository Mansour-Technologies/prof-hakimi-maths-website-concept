import { test, expect } from '@playwright/test';
import { NOTICE, SECTIONS, VERIFIED_HOSTS, watch } from './helpers';

test('home loads: no console errors, no failed assets, notice, noindex, attribution, KaTeX rendered', async ({ page }) => {
  const errors = watch(page);
  const res = await page.goto('');
  expect(res?.status()).toBe(200);
  await expect(page.locator('[data-demo-notice]')).toHaveText(NOTICE);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('footer a[href="https://mansourtechnologies.com/"]')).toHaveText('Concept digital proposé par Mansour Technologies.');
  await expect(page.locator('h1')).toContainText('Hicham Hakimi');
  await expect(page.locator('h1')).toContainText('PROF');
  await expect(page.locator('h1')).toContainText('HAKIMI');
  expect(await page.locator('.katex').count()).toBeGreaterThan(5);
  const text = await page.locator('main').innerText();
  expect(text).not.toMatch(/\$[^$\s][^$]*\$/);
  expect(await page.locator('a[href="#"]').count()).toBe(0);
  // every image is an official YouTube-served poster (no rehosted photos)
  const srcs = await page.$$eval('main img', (is) => is.map((i) => (i as HTMLImageElement).getAttribute('src') ?? ''));
  expect(srcs.length).toBeGreaterThan(5);
  for (const s of srcs) expect(s).toMatch(/^https:\/\/i\.ytimg\.com\/vi\/[\w-]{11}\//);
  await expect(page.locator('.credit, .poster__credit').first()).toContainText(/vidéos? officielles? YouTube/);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 40)); } });
  await page.waitForLoadState('networkidle');
  expect(errors, errors.join('\n')).toEqual([]);
});

test('no app features or local storage remain', async ({ page }) => {
  await page.goto('');
  for (const sel of ['canvas', 'input', 'select', 'textarea', 'form', '[data-ex]', '[data-bookmark]']) expect(await page.locator(sel).count(), sel).toBe(0);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 30)); } });
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
});

test('anchor navigation scrolls to every section', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) < 961, 'desktop nav');
  await page.goto('');
  for (const id of SECTIONS) {
    await page.locator(`.mainnav a[href="#${id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect.poll(async () => page.evaluate((id) => Math.round(document.getElementById(id)!.getBoundingClientRect().top), id)).toBeLessThan(140);
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

test('every contact / social link: https, verified domain, new tab, rel noopener', async ({ page }) => {
  await page.goto('');
  const links = await page.$$eval('a[target="_blank"]', (as) => as.map((a) => ({ href: (a as HTMLAnchorElement).href, rel: a.getAttribute('rel') ?? '' })));
  expect(links.length).toBeGreaterThan(8);
  await expect(page.locator('#contact a[href="https://www.instagram.com/hepta_center_mkns/"]')).toBeVisible();
  for (const l of links) {
    const u = new URL(l.href);
    expect(u.protocol, l.href).toBe('https:');
    expect(VERIFIED_HOSTS, l.href).toContain(u.hostname);
    expect(l.rel, l.href).toContain('noopener');
  }
  const contact = page.locator('#contact');
  await expect(contact.locator('a.channel--primary')).toHaveAttribute('href', 'https://ig.me/m/prof_hakimi_maths');
  await expect(contact.locator('a[href*="youtube.com/@prof_hakimi_maths"]')).toBeVisible();
  await expect(contact.locator('a[href*="wa.me"]')).toHaveCount(0); // WhatsApp hidden until the number is approved
});

test('hero: his face is the poster button of the same official video; click loads youtube-nocookie', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('iframe')).toHaveCount(0);
  const btn = page.locator('.hero__media button[data-yt]');
  await expect(btn).toHaveAttribute('data-yt', 'POAnIwQIw58');
  await expect(btn).toHaveAccessibleName(/^Lire la vidéo officielle : /);
  await expect(btn.locator('img')).toHaveAttribute('src', 'https://i.ytimg.com/vi/POAnIwQIw58/maxresdefault.jpg');
  await expect(btn).toBeInViewport();
  await btn.click();
  const frame = page.locator('.hero__media iframe.yt-frame');
  await expect(frame).toHaveCount(1);
  expect(await frame.getAttribute('src')).toBe('https://www.youtube-nocookie.com/embed/POAnIwQIw58?rel=0');
});

test('poster fallback: if YouTube images fail, a typographic panel replaces them', async ({ page }) => {
  await page.route(/i\.ytimg\.com/, (r) => r.abort());
  await page.goto('');
  const hero = page.locator('.hero__media [data-poster]');
  await expect(hero).toHaveClass(/is-fallback/);
  await expect(hero.locator('.poster__fallback')).toBeVisible();
  await expect(hero.locator('.poster__fallback')).toContainText('PROF HAKIMI');
  await expect(hero.locator('button[data-yt]')).toBeVisible();
});

test('YouTube facade loads the youtube-nocookie iframe only on click, without autoplay', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('iframe')).toHaveCount(0);
  const btn = page.locator('#series [data-yt]').first();
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  const frame = page.locator('#series iframe.yt-frame');
  await expect(frame).toHaveCount(1);
  const src = (await frame.getAttribute('src'))!;
  expect(src).toMatch(/^https:\/\/www\.youtube-nocookie\.com\/embed\/[\w-]{11}\?/);
  expect(src).not.toContain('autoplay');
});

test('removed app routes are gone (404)', async ({ page }) => {
  for (const p of ['labo/', 'mon-espace/', 'cours/', 'cours/derivation/', 'examen/', 'videos/']) {
    const res = await page.goto(p);
    expect(res?.status(), p).toBe(404);
  }
  await expect(page.locator('h1')).toContainText('domaine');
  await expect(page.locator('[data-demo-notice]')).toHaveText(NOTICE);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
});

test('robots.txt, OG image and favicon', async ({ request, baseURL }) => {
  expect(await (await request.get(baseURL + 'robots.txt')).text()).toContain('Disallow: /');
  expect((await request.get(baseURL + 'og.png')).status()).toBe(200);
  expect((await request.get(baseURL + 'favicon.svg')).status()).toBe(200);
});

for (const w of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
  test(`no horizontal overflow at ${w}px`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: 900 });
    for (const p of ['', '404.html']) {
      await page.goto(p);
      const [sw, cw] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
      expect(sw, `/${p} at ${w}px`).toBeLessThanOrEqual(cw);
    }
  });
}

test('keyboard: skip link then section navigation', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) < 961, 'desktop nav');
  await page.goto('');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('.wordmark').first()).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('.mainnav a').first()).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#professeur$/);
});
