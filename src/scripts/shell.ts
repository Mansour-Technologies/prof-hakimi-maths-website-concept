import { load, update, toggleIn } from '../lib/store';
import { initExercises } from './exercises';

// ——— Toast ———
export function toast(msg: string) {
  const t = document.querySelector<HTMLElement>('[data-toast]');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('is-on');
  clearTimeout((t as any)._h);
  (t as any)._h = setTimeout(() => t.classList.remove('is-on'), 2200);
}
(window as any).phmToast = toast;

// ——— Mobile sheet (dialog with focus trap, Escape, focus return) ———
const sheet = document.getElementById('sheet');
const backdrop = document.querySelector<HTMLElement>('[data-sheet-backdrop]');
const opener = document.querySelector<HTMLButtonElement>('[data-sheet-open]');
let lastFocus: HTMLElement | null = null;
const focusables = () => Array.from(sheet?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
function openSheet() {
  if (!sheet || !backdrop) return;
  lastFocus = document.activeElement as HTMLElement;
  sheet.hidden = false; backdrop.hidden = false;
  requestAnimationFrame(() => { sheet.dataset.open = 'true'; backdrop.dataset.open = 'true'; });
  opener?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  focusables()[0]?.focus();
}
function closeSheet() {
  if (!sheet || !backdrop || sheet.hidden) return;
  sheet.dataset.open = 'false'; backdrop.dataset.open = 'false';
  opener?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(() => { sheet.hidden = true; backdrop.hidden = true; }, reduce ? 0 : 320);
  (lastFocus ?? opener)?.focus();
}
opener?.addEventListener('click', openSheet);
backdrop?.addEventListener('click', closeSheet);
sheet?.querySelector('[data-sheet-close]')?.addEventListener('click', closeSheet);
sheet?.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { e.preventDefault(); closeSheet(); }
  if (e.key === 'Tab') {
    const f = focusables(); if (!f.length) return;
    const first = f[0]!, last = f[f.length - 1]!;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
matchMedia('(min-width: 861px)').addEventListener('change', (m) => m.matches && closeSheet());

// ——— Reveal on scroll ———
const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io?.unobserve(e.target); }
}, { rootMargin: '0px 0px -8% 0px' }) : null;
document.querySelectorAll('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('is-in')));

// ——— YouTube facades (youtube-nocookie, loaded on click, no autoplay) ———
document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-yt]');
  if (!btn) return;
  const id = btn.dataset.yt!;
  if (!/^[\w-]{11}$/.test(id)) return;
  const frame = document.createElement('iframe');
  frame.src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
  frame.title = btn.dataset.title ?? 'Vidéo YouTube';
  frame.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  frame.allowFullscreen = true;
  frame.loading = 'lazy';
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.className = 'yt-frame';
  btn.replaceWith(frame);
  frame.focus();
});

// ——— Bookmarks (chapters & videos) ———
function paintBookmarks() {
  const s = load();
  document.querySelectorAll<HTMLButtonElement>('[data-bookmark]').forEach((b) => {
    const on = s.bookmarks.includes(b.dataset.bookmark!);
    b.setAttribute('aria-pressed', String(on));
    const lbl = b.querySelector('[data-bm-label]');
    if (lbl) lbl.textContent = on ? (b.dataset.on ?? 'Enregistré') : (b.dataset.off ?? 'Enregistrer');
  });
}
document.addEventListener('click', (e) => {
  const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-bookmark]');
  if (!b) return;
  let added = false;
  update((s) => { added = toggleIn(s.bookmarks, b.dataset.bookmark!); });
  toast(added ? 'Ajouté à « Mon espace »' : 'Retiré de « Mon espace »');
});
window.addEventListener('phm:change', paintBookmarks);
window.addEventListener('storage', () => window.dispatchEvent(new CustomEvent('phm:change')));
paintBookmarks();

initExercises();
