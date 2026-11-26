// Captures review screenshots. Usage: node scripts/shots.mjs <baseURL> <outDir>
import { chromium } from '@playwright/test';
const [base, out] = process.argv.slice(2);
const b = await chromium.launch();
const errs = [];
async function page(w, h, mobile) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  const p = await ctx.newPage();
  p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  p.on('response', (r) => r.status() >= 400 && errs.push(r.status() + ' ' + r.url()));
  await p.goto(base, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  return p;
}
const settle = async (p) => { await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 80)); } window.scrollTo({ top: 0, behavior: 'instant' }); }); await p.waitForLoadState('networkidle'); await p.waitForTimeout(800); };
let p = await page(375, 812, true);
await p.screenshot({ path: `${out}/mobile-home-375.png` });
await settle(p);
await p.screenshot({ path: `${out}/mobile-full-375.png`, fullPage: true });
await p.locator('#contact').scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
await p.locator('#contact').screenshot({ path: `${out}/mobile-contact-375.png` });
await p.evaluate(() => window.scrollTo(0, 0));
await p.getByRole('button', { name: 'Menu', exact: true }).click(); await p.waitForTimeout(600);
await p.screenshot({ path: `${out}/mobile-nav-open-375.png` });
await p.context().close();
p = await page(1440, 900, false);
await p.screenshot({ path: `${out}/desktop-home-1440.png` });
await settle(p);
await p.screenshot({ path: `${out}/desktop-full-1440.png`, fullPage: true });
await p.locator('#contact').scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
await p.locator('#contact').screenshot({ path: `${out}/desktop-contact-1440.png` });
await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(300);
await p.locator('.hero [data-yt]').first().click(); await p.waitForTimeout(2500);
await p.screenshot({ path: `${out}/desktop-hero-playing-1440.png` });
await b.close();
console.log('errors:', JSON.stringify(errs.filter((e) => !/youtube|ytimg|googlevideo|doubleclick|google/.test(e))));
