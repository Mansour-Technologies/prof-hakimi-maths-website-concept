/**
 * Demo progress store (localStorage only — no account, no personal data).
 * Robust to missing / corrupted / foreign data: every field is validated.
 */
export const KEY = 'phm-demo-v1';

export interface Result { ok: boolean; tries: number; at: number }
export interface Goal { id: string; text: string; done: boolean }
export interface Session { at: number; total: number; correct: number; seconds: number; mode: string }
export interface State {
  checks: Record<string, string[]>; // chapter slug -> checkpoint indices (as strings)
  mastered: string[]; // chapter slugs
  results: Record<string, Result>; // exercise id -> result
  bookmarks: string[]; // "ch:<slug>" | "vid:<id>"
  goals: Goal[];
  sessions: Session[];
  bacChecklist: string[];
}

export const empty = (): State => ({ checks: {}, mastered: [], results: {}, bookmarks: [], goals: [], sessions: [], bacChecklist: [] });

const strArr = (v: unknown, max = 500): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && x.length < 200).slice(0, max) : [];

export function sanitize(raw: unknown): State {
  const s = empty();
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return s;
  const o = raw as Record<string, unknown>;
  if (o.checks && typeof o.checks === 'object' && !Array.isArray(o.checks)) {
    for (const [k, v] of Object.entries(o.checks as Record<string, unknown>)) if (/^[a-z-]{1,40}$/.test(k)) s.checks[k] = strArr(v, 20);
  }
  s.mastered = strArr(o.mastered, 40);
  if (o.results && typeof o.results === 'object' && !Array.isArray(o.results)) {
    for (const [k, v] of Object.entries(o.results as Record<string, unknown>)) {
      if (!/^[a-z0-9-]{1,20}$/.test(k) || !v || typeof v !== 'object') continue;
      const r = v as Record<string, unknown>;
      s.results[k] = { ok: r.ok === true, tries: Number.isFinite(r.tries) ? Math.max(0, Math.min(99, Number(r.tries))) : 1, at: Number.isFinite(r.at) ? Number(r.at) : 0 };
    }
  }
  s.bookmarks = strArr(o.bookmarks, 200);
  if (Array.isArray(o.goals)) {
    s.goals = o.goals
      .filter((g): g is Record<string, unknown> => !!g && typeof g === 'object')
      .filter((g) => typeof g.id === 'string' && typeof g.text === 'string')
      .slice(0, 30)
      .map((g) => ({ id: String(g.id).slice(0, 40), text: String(g.text).slice(0, 140), done: g.done === true }));
  }
  if (Array.isArray(o.sessions)) {
    s.sessions = o.sessions
      .filter((x): x is Record<string, unknown> => !!x && typeof x === 'object')
      .map((x) => ({ at: Number(x.at) || 0, total: Number(x.total) || 0, correct: Number(x.correct) || 0, seconds: Number(x.seconds) || 0, mode: String(x.mode ?? 'libre').slice(0, 20) }))
      .filter((x) => x.total >= 0 && x.correct >= 0 && x.correct <= x.total)
      .slice(-20);
  }
  s.bacChecklist = strArr(o.bacChecklist, 60);
  return s;
}

export function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? sanitize(JSON.parse(raw)) : empty();
  } catch {
    return empty();
  }
}

export function save(s: State) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable (private mode) — demo keeps working in memory */
  }
  window.dispatchEvent(new CustomEvent('phm:change'));
}

export function update(fn: (s: State) => void) {
  const s = load();
  fn(s);
  save(s);
  return s;
}

export function reset() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new CustomEvent('phm:change'));
}

export const toggleIn = (arr: string[], v: string) => {
  const i = arr.indexOf(v);
  if (i >= 0) arr.splice(i, 1);
  else arr.push(v);
  return i < 0;
};
