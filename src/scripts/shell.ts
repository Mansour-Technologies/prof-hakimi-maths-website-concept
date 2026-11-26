// ——— Mobile menu sheet (dialog with focus trap, Escape, focus return) ———
const sheet = document.getElementById('sheet');
const backdrop = document.querySelector<HTMLElement>('[data-sheet-backdrop]');
const opener = document.querySelector<HTMLButtonElement>('[data-sheet-open]');
let lastFocus: HTMLElement | null = null;
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
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
function closeSheet(returnFocus = true) {
  if (!sheet || !backdrop || sheet.hidden) return;
  sheet.dataset.open = 'false'; backdrop.dataset.open = 'false';
  opener?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  setTimeout(() => { sheet.hidden = true; backdrop.hidden = true; }, reduce() ? 0 : 320);
  if (returnFocus) (lastFocus ?? opener)?.focus();
}
opener?.addEventListener('click', openSheet);
backdrop?.addEventListener('click', () => closeSheet());
sheet?.querySelector('[data-sheet-close]')?.addEventListener('click', () => closeSheet());
// anchor links inside the sheet: close, then let the browser scroll
sheet?.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => a.addEventListener('click', () => closeSheet(false)));
sheet?.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { e.preventDefault(); closeSheet(); }
  if (e.key === 'Tab') {
    const f = focusables(); if (!f.length) return;
    const first = f[0]!, last = f[f.length - 1]!;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
matchMedia('(min-width: 961px)').addEventListener('change', (m) => m.matches && closeSheet(false));

// ——— Reveal on scroll ———
const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io?.unobserve(e.target); }
}, { rootMargin: '0px 0px -8% 0px' }) : null;
document.querySelectorAll('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('is-in')));

// ——— Active section in the header nav ———
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.mainnav a[href^="#"]'));
if ('IntersectionObserver' in window && links.length) {
  const spy = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) links.forEach((l) => l.toggleAttribute('data-active', l.hash === '#' + e.target.id));
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((l) => { const s = document.querySelector(l.hash); if (s) spy.observe(s); });
}

// ——— YouTube facades (youtube-nocookie, loaded on click only, no autoplay) ———
document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-yt]');
  if (!btn) return;
  const id = btn.dataset.yt!;
  if (!/^[\w-]{11}$/.test(id)) return;
  const frame = document.createElement('iframe');
  frame.src = `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
  frame.title = btn.dataset.title ?? 'Vidéo YouTube';
  frame.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  frame.allowFullscreen = true;
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.className = 'yt-frame';
  btn.closest('[data-stage]')?.classList.add('is-playing');
  btn.closest('[data-poster]')?.classList.add('is-playing');
  btn.replaceWith(frame);
  frame.focus();
});
export {};
