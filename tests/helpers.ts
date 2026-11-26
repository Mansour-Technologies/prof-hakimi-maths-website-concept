import type { Page } from '@playwright/test';
export const PAGES = ['', 'cours/', 'cours/limites-continuite/', 'cours/derivation/', 'cours/etude-fonctions/', 'cours/suites/', 'cours/logarithme/', 'cours/nombres-complexes/', 'cours/exponentielle/', 'cours/equations-differentielles/', 'cours/calcul-integral/', 'cours/geometrie-espace/', 'cours/probabilites/', 'videos/', 'labo/', 'examen/', 'mon-espace/'];
export const NOTICE = 'Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.';
/** collect console errors and failed same-origin requests */
export function watch(page: Page) {
  const errors: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('response', (r) => {
    const u = r.url();
    if (r.status() >= 400 && !/youtube|ytimg|googlevideo/.test(u)) errors.push(`${r.status()} ${u}`);
  });
  return errors;
}
export const clearStore = (page: Page) => page.evaluate(() => localStorage.clear());
