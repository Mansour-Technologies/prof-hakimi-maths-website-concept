import { load, update } from '../lib/store';

/** Parse a student's numeric answer: accepts "0,25", "1/4", "-3", "2.5". */
export function parseAnswer(raw: string): number | null {
  const s = raw.trim().replace(/\s+/g, '').replace(',', '.').replace('−', '-');
  if (!s) return null;
  const frac = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  if (frac) { const d = Number(frac[2]); return d === 0 ? null : Number(frac[1]) / d; }
  if (!/^-?\d*\.?\d+(e-?\d+)?$/i.test(s)) return null;
  const v = Number(s);
  return Number.isFinite(v) ? v : null;
}

function paint(root: HTMLElement) {
  const id = root.dataset.ex!;
  const r = load().results[id];
  root.dataset.state = r ? (r.ok ? 'ok' : 'ko') : '';
}

export function initExercises() {
  const all = document.querySelectorAll<HTMLElement>('[data-ex]');
  all.forEach((root) => {
    if (root.dataset.bound) return;
    root.dataset.bound = '1';
    paint(root);
    const form = root.querySelector('form')!;
    const fb = root.querySelector<HTMLElement>('[data-feedback]')!;
    const sol = root.querySelector<HTMLDetailsElement>('details');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = root.dataset.ex!;
      let ok = false;
      if (root.dataset.type === 'num') {
        const input = form.querySelector<HTMLInputElement>('input')!;
        const v = parseAnswer(input.value);
        if (v === null) {
          fb.dataset.kind = 'warn';
          fb.textContent = 'Entrez un nombre (ex. 0,25 ou 1/4).';
          input.setAttribute('aria-invalid', 'true');
          input.focus();
          return;
        }
        input.removeAttribute('aria-invalid');
        ok = Math.abs(v - Number(root.dataset.answer)) <= Number(root.dataset.tol);
      } else {
        const picked = form.querySelector<HTMLInputElement>('input:checked');
        if (!picked) { fb.dataset.kind = 'warn'; fb.textContent = 'Choisissez une réponse.'; return; }
        ok = picked.value === root.dataset.correct;
      }
      update((s) => {
        const prev = s.results[id];
        s.results[id] = { ok: ok || (prev?.ok ?? false), tries: (prev?.tries ?? 0) + 1, at: Date.now() };
      });
      fb.dataset.kind = ok ? 'ok' : 'ko';
      fb.textContent = ok ? 'Correct — bien joué. La correction détaillée est disponible ci-dessous.' : `Pas encore. Indice : ${root.dataset.hint ?? 'relisez l’énoncé.'}`;
      if (ok && sol) sol.open = true;
      root.dataset.state = ok ? 'ok' : 'ko';
      root.dispatchEvent(new CustomEvent('ex:answered', { bubbles: true, detail: { id, ok } }));
    });
    root.addEventListener('ex:clear', () => {
      form.reset(); fb.textContent = ''; fb.dataset.kind = ''; if (sol) sol.open = false; root.dataset.state = '';
    });
    root.querySelector('[data-ex-reset]')?.addEventListener('click', () => {
      form.reset();
      fb.textContent = '';
      fb.dataset.kind = '';
      if (sol) sol.open = false;
      update((s) => { delete s.results[root.dataset.ex!]; });
      root.dataset.state = '';
      root.dispatchEvent(new CustomEvent('ex:answered', { bubbles: true, detail: { id: root.dataset.ex, ok: false, reset: true } }));
    });
  });
  window.addEventListener('phm:change', () => all.forEach(paint));
}
