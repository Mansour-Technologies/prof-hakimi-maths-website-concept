import type { Page } from '@playwright/test';
export const NOTICE = 'Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.';
export const SECTIONS = ['professeur', 'approche', 'programme', 'videos', 'etudier', 'contact'];
export const VERIFIED_HOSTS = ['ig.me', 'www.instagram.com', 'www.youtube.com', 'www.threads.com', 'mansourtechnologies.com'];
/** collect console errors and failed requests (excluding third-party YouTube media) */
export function watch(page: Page) {
  const errors: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('response', (r) => { if (r.status() >= 400 && !/youtube|ytimg|googlevideo/.test(r.url())) errors.push(`${r.status()} ${r.url()}`); });
  return errors;
}
