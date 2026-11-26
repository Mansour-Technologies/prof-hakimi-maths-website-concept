import type { State } from './store';

/** Chapter progress = (checked checkpoints + solved exercises) / (checkpoints + exercises). Mastered = 100 %. */
export function chapterProgress(s: State, slug: string, nChecks: number, exIds: string[]) {
  const checks = Math.min(nChecks, s.checks[slug]?.length ?? 0);
  const solved = exIds.filter((id) => s.results[id]?.ok).length;
  const total = nChecks + exIds.length;
  const mastered = s.mastered.includes(slug);
  const pct = mastered ? 100 : total ? Math.round(((checks + solved) / total) * 100) : 0;
  return { pct, mastered, solved, checks, total, saved: s.bookmarks.includes(`ch:${slug}`) };
}
