import { test, expect } from '@playwright/test';
import { clearStore, watch } from './helpers';

test.beforeEach(async ({ page }) => { await page.goto(''); await clearStore(page); });

test('courses: search and semester / status filters', async ({ page }) => {
  await page.goto('cours/');
  const rows = page.locator('.chrow:visible');
  await expect(rows).toHaveCount(11);
  await page.getByLabel('Rechercher une notion').fill('tangente');
  await expect(page.locator('[data-count]')).not.toHaveText('11 chapitres');
  await expect(rows.first()).toContainText('Dérivation');
  await page.getByLabel('Rechercher une notion').fill('integrale'); // accent-insensitive
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText('Calcul intégral');
  await page.getByLabel('Rechercher une notion').fill('');
  await page.getByRole('button', { name: 'S2', exact: true }).click();
  await expect(rows).toHaveCount(5);
  await page.getByRole('button', { name: 'Tous', exact: true }).click();
  await page.getByRole('button', { name: 'Avec vidéo du prof' }).click();
  await expect(rows).toHaveCount(7);
  await page.getByRole('button', { name: 'Enregistrés' }).click();
  await expect(rows).toHaveCount(0);
  await expect(page.locator('[data-empty]')).toBeVisible();
});

test('chapter page: checkpoints, mastered and bookmark persist; filters reflect them', async ({ page }) => {
  await page.goto('cours/suites/');
  await expect(page.locator('.katex').first()).toBeVisible();
  const boxes = page.locator('[data-checks] input');
  await boxes.nth(0).check();
  await boxes.nth(2).check();
  await expect(page.locator('[data-progress-text]')).toContainText('2/4 objectifs');
  await page.getByRole('button', { name: /Enregistrer/ }).first().click();
  await page.reload();
  await expect(boxes.nth(0)).toBeChecked();
  await expect(boxes.nth(2)).toBeChecked();
  await expect(page.locator('[data-bookmark="ch:suites"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('[data-master]').click();
  await expect(page.locator('[data-progress-text]')).toContainText('100 %');
  await page.goto('cours/');
  await page.getByRole('button', { name: 'Maîtrisés' }).click();
  await expect(page.locator('.chrow:visible')).toHaveCount(1);
  await page.getByRole('button', { name: 'Enregistrés' }).click();
  await expect(page.locator('.chrow:visible')).toHaveCount(1);
});

test('exercises: numeric with tolerance and comma, MCQ, invalid input, scoring, reset', async ({ page }) => {
  await page.goto('cours/limites-continuite/');
  const ex1 = page.locator('[data-ex="lc-2"]');
  await ex1.getByLabel('Votre réponse').fill('abc');
  await ex1.getByRole('button', { name: 'Vérifier' }).click();
  await expect(ex1.locator('[data-feedback]')).toContainText('Entrez un nombre');
  await ex1.getByLabel('Votre réponse').fill('0,3');
  await ex1.getByRole('button', { name: 'Vérifier' }).click();
  await expect(ex1).toHaveAttribute('data-state', 'ko');
  await expect(ex1.locator('[data-feedback]')).toContainText('Indice');
  await ex1.getByLabel('Votre réponse').fill('1/4');
  await ex1.getByRole('button', { name: 'Vérifier' }).click();
  await expect(ex1).toHaveAttribute('data-state', 'ok');
  await expect(ex1.locator('details')).toHaveAttribute('open', '');
  await expect(ex1.locator('details .katex').first()).toBeVisible();

  const mcq = page.locator('[data-ex="lc-3"]');
  await mcq.getByRole('button', { name: 'Vérifier' }).click();
  await expect(mcq.locator('[data-feedback]')).toContainText('Choisissez');
  await mcq.getByText('Exactement une').click();
  await mcq.getByRole('button', { name: 'Vérifier' }).click();
  await expect(mcq).toHaveAttribute('data-state', 'ok');
  await expect(page.locator('[data-progress-text]')).toContainText('2/4 exercices');

  await page.reload();
  await expect(page.locator('[data-ex="lc-2"]')).toHaveAttribute('data-state', 'ok');
  await page.locator('[data-ex="lc-2"]').getByRole('button', { name: 'Recommencer' }).click();
  await expect(page.locator('[data-ex="lc-2"]')).toHaveAttribute('data-state', '');
  await expect(page.locator('[data-progress-text]')).toContainText('1/4 exercices');
});

test('lab: parameters update the tangent equation, x0 slider, free expression, reset', async ({ page }) => {
  const errors = watch(page);
  await page.goto('labo/');
  const tan = page.locator('[data-tex-tan]');
  // default: f(x)=0.5x³−2x+1, x0=1 ⇒ f(1)=−0.5, f'(1)=−0.5, T: y=−0.5x
  await expect(tan.locator('.katex-mathml annotation')).toHaveText('y=-0{,}5x');
  await expect(page.locator('[data-tex-f] annotation')).toHaveText('f(x)=0{,}5x^3-2x+1');
  // change a to 1 ⇒ f'(1)=3−2=1, f(1)=0 ⇒ y = x − 1
  await page.locator('#p-a').fill('1');
  await expect(tan.locator('annotation')).toHaveText('y=x-1');
  // move x0 to 2 ⇒ f(2)=8−4+1=5, f'(2)=12−2=10 ⇒ y=10x−15
  await page.locator('#p-x0').fill('2');
  await expect(tan.locator('annotation')).toHaveText('y=10x-15');
  const st = await page.evaluate(() => (window as any).__lab());
  expect(st.m).toBeCloseTo(10, 9);
  // ln family: f(x)=x−1−ln x, f'(x)=1−1/x, at x0=2: f'=0.5, f(2)=1−ln2
  await page.getByRole('radio', { name: 'Logarithme' }).check();
  const st2 = await page.evaluate(() => (window as any).__lab());
  expect(st2.m).toBeCloseTo(0.5, 9);
  expect(st2.fx0).toBeCloseTo(1 - Math.log(2), 9);
  await expect(page.locator('[data-note]')).toContainText('écart < 10⁻⁶');
  // free expression with numeric derivative
  await page.getByRole('radio', { name: 'Expression libre' }).check();
  await page.locator('[data-expr]').fill('x^2');
  await page.locator('[data-expr-go]').click();
  await page.locator('#p-x0').fill('3');
  const st3 = await page.evaluate(() => (window as any).__lab());
  expect(st3.m).toBeCloseTo(6, 6);
  await expect(tan.locator('annotation')).toHaveText('y=6x-9');
  await page.locator('[data-expr]').fill('2x + )');
  await page.locator('[data-expr-go]').click();
  await expect(page.locator('[data-expr-err]')).not.toBeEmpty();
  // reset
  await page.getByRole('button', { name: 'Réinitialiser le labo' }).click();
  await expect(tan.locator('annotation')).toHaveText('y=-0{,}5x');
  await expect(page.locator('input[name="family"][value="poly"]')).toBeChecked();
  expect(errors).toEqual([]);
});

test('lab: dragging the point on the canvas moves x0', async ({ page }) => {
  await page.goto('labo/');
  const c = page.locator('[data-canvas]');
  const box = (await c.boundingBox())!;
  const st = await page.evaluate(() => (window as any).__lab());
  // point screen position from state
  const px = box.x + box.width / 2 + (st.x0 - st.view.cx) * st.view.scale;
  const py = box.y + box.height / 2 - (st.fx0 - st.view.cy) * st.view.scale;
  await page.mouse.move(px, py);
  await page.mouse.down();
  await page.mouse.move(px + st.view.scale, py, { steps: 5 });
  await page.mouse.up();
  const st2 = await page.evaluate(() => (window as any).__lab());
  expect(st2.x0).toBeCloseTo(st.x0 + 1, 1);
});

test('videos: filter by topic and kind, facade loads youtube-nocookie without autoplay', async ({ page }) => {
  await page.goto('videos/');
  await page.getByRole('button', { name: 'Nombres complexes', exact: true }).click();
  await expect(page.locator('.vcell:visible')).toHaveCount(3);
  await page.getByRole('button', { name: 'Capsules' }).click();
  await expect(page.locator('.vcell:visible')).toHaveCount(1);
  await page.getByRole('button', { name: 'Tout', exact: true }).click();
  await page.locator('.vcell:visible [data-yt]').first().click();
  const frame = page.locator('iframe.yt-frame');
  await expect(frame).toHaveAttribute('src', /^https:\/\/www\.youtube-nocookie\.com\/embed\/[\w-]{11}\?/);
  expect(await frame.getAttribute('src')).not.toContain('autoplay');
});

test('exam centre: filters, chrono session and summary saved to dashboard', async ({ page }) => {
  await page.goto('examen/');
  await page.locator('[data-f-ch]').selectOption('suites');
  await expect(page.locator('[data-exlist] [data-ex]:visible')).toHaveCount(4);
  await page.getByRole('button', { name: 'Approfondi' }).click();
  await expect(page.locator('[data-exlist] [data-ex]:visible')).toHaveCount(1);
  await page.locator('[data-f-ch]').selectOption('all');
  await page.getByRole('button', { name: 'Toutes' }).click();
  await page.locator('[data-ch-n]').selectOption('4');
  await page.getByRole('button', { name: /Lancer l’épreuve/ }).click();
  await expect(page.locator('[data-chrono]')).toBeVisible();
  await expect(page.locator('[data-chrono-list] [data-ex]')).toHaveCount(4);
  await expect(page.locator('[data-time]')).toHaveText(/^\d+:\d\d$/);
  await page.getByRole('button', { name: 'Terminer et voir le bilan' }).click();
  await expect(page.locator('[data-summary]')).toBeVisible();
  await expect(page.locator('[data-sum-big]')).toContainText('0 / 4');
  await page.goto('mon-espace/');
  await expect(page.locator('[data-s-sess]')).toHaveText('1');
  await expect(page.locator('[data-sessions] li')).toContainText('Épreuve chrono');
});

test('exam checklist persists', async ({ page }) => {
  await page.goto('examen/');
  await page.getByText('Relire le formulaire').click();
  await page.reload();
  await expect(page.locator('[data-ck="g-formulaire"]')).toBeChecked();
  await expect(page.locator('[data-ck-count]')).toContainText('1 /');
});

test('dashboard: robust to corrupted storage, goals, bookmarks, recommendation, reset', async ({ page }) => {
  await page.evaluate(() => localStorage.setItem('phm-demo-v1', '{not json'));
  const errors = watch(page);
  await page.goto('mon-espace/');
  await expect(page.locator('[data-s-pct]')).toHaveText('0 %');
  await expect(page.locator('[data-next-title]')).toHaveText('1. Limites et continuité');
  await page.evaluate(() => localStorage.setItem('phm-demo-v1', JSON.stringify({ results: 'x', bookmarks: [1, 'ch:suites', 'vid:bogus'], goals: [{}], mastered: ['limites-continuite'] })));
  await page.reload();
  await expect(page.locator('[data-bml] li')).toHaveCount(1);
  await expect(page.locator('[data-next-title]')).toHaveText('2. Dérivation et fonction réciproque');
  await page.getByLabel('Nouvel objectif').fill('Réviser les intégrales');
  await page.getByRole('button', { name: 'Ajouter' }).click();
  await page.reload();
  await expect(page.locator('[data-goals] li')).toHaveCount(1);
  await page.locator('[data-goals] input').check();
  await page.getByRole('button', { name: 'Tout réinitialiser' }).click();
  await page.getByRole('button', { name: 'Oui, effacer' }).click();
  await expect(page.locator('[data-goals] li')).toHaveCount(0);
  await expect(page.locator('[data-bml] li')).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('phm-demo-v1'))).toBeNull();
  expect(errors).toEqual([]);
});
