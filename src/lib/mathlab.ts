/**
 * Safe expression parser (no eval / no Function) + function families for the lab.
 * Grammar (recursive descent):
 *   expr   := term (('+'|'-') term)*
 *   term   := unary (('*'|'/'|implicit) unary)*
 *   unary  := ('+'|'-') unary | power
 *   power  := call ('^' unary)?        (right-assoc, -x^2 = -(x^2))
 *   call   := IDENT '(' expr ')' | IDENT | NUMBER | '(' expr ')'
 */
export type Fn = (x: number) => number;

const FUNCS: Record<string, Fn> = {
  ln: Math.log, log: Math.log, exp: Math.exp, sqrt: Math.sqrt, abs: Math.abs,
  sin: Math.sin, cos: Math.cos, tan: Math.tan, arctan: Math.atan,
};
const CONSTS: Record<string, number> = { pi: Math.PI, e: Math.E };

type Tok = { t: 'num'; v: number } | { t: 'id'; v: string } | { t: 'op'; v: string };

export class ParseError extends Error {}

function tokenize(src: string): Tok[] {
  const s = src.replace(/\s+/g, '').replace(/,/g, '.').replace(/×|·/g, '*').replace(/−/g, '-').replace(/π/g, 'pi').replace(/²/g, '^2').replace(/³/g, '^3');
  if (s.length === 0) throw new ParseError('Expression vide');
  if (s.length > 120) throw new ParseError('Expression trop longue (120 caractères max.)');
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i]!;
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j]!)) j++;
      const raw = s.slice(i, j);
      if ((raw.match(/\./g) || []).length > 1) throw new ParseError(`Nombre invalide « ${raw} »`);
      out.push({ t: 'num', v: parseFloat(raw) });
      i = j;
    } else if (/[a-z]/i.test(c)) {
      let j = i;
      while (j < s.length && /[a-z]/i.test(s[j]!)) j++;
      let word = s.slice(i, j).toLowerCase();
      // split glued identifiers like "xln" → greedy known names
      while (word.length) {
        const m = ['arctan', 'sqrt', 'exp', 'abs', 'sin', 'cos', 'tan', 'log', 'ln', 'pi', 'x', 'e'].find((k) => word.startsWith(k));
        if (!m) throw new ParseError(`Symbole inconnu « ${word} »`);
        out.push({ t: 'id', v: m });
        word = word.slice(m.length);
      }
      i = j;
    } else if ('+-*/^()'.includes(c)) {
      out.push({ t: 'op', v: c });
      i++;
    } else throw new ParseError(`Caractère non autorisé « ${c} »`);
  }
  return out;
}

export function compile(src: string): Fn {
  const toks = tokenize(src);
  let p = 0;
  let depth = 0;
  const peek = () => toks[p];
  const isOp = (v: string) => { const t = peek(); return !!t && t.t === 'op' && t.v === v; };
  const startsFactor = () => { const t = peek(); return !!t && (t.t === 'num' || t.t === 'id' || (t.t === 'op' && t.v === '(')); };

  const expr = (): Fn => {
    if (++depth > 60) throw new ParseError('Expression trop imbriquée');
    let a = term();
    while (isOp('+') || isOp('-')) {
      const op = (toks[p++] as { v: string }).v; const b = term(); const l = a;
      a = op === '+' ? (x) => l(x) + b(x) : (x) => l(x) - b(x);
    }
    depth--;
    return a;
  };
  const term = (): Fn => {
    let a = unary();
    for (;;) {
      if (isOp('*') || isOp('/')) {
        const op = (toks[p++] as { v: string }).v; const b = unary(); const l = a;
        a = op === '*' ? (x) => l(x) * b(x) : (x) => l(x) / b(x);
      } else if (startsFactor()) {
        const b = power(); const l = a; a = (x) => l(x) * b(x); // implicit multiplication: 2x, 3(x+1), x ln(x)
      } else break;
    }
    return a;
  };
  const unary = (): Fn => {
    if (isOp('-')) { p++; const a = unary(); return (x) => -a(x); }
    if (isOp('+')) { p++; return unary(); }
    return power();
  };
  const power = (): Fn => {
    const base = call();
    if (isOp('^')) { p++; const ex = unary(); return (x) => Math.pow(base(x), ex(x)); }
    return base;
  };
  const call = (): Fn => {
    const t = toks[p++];
    if (!t) throw new ParseError('Expression incomplète');
    if (t.t === 'num') { const v = t.v; return () => v; }
    if (t.t === 'op' && t.v === '(') {
      const a = expr();
      if (!isOp(')')) throw new ParseError('Parenthèse fermante manquante');
      p++;
      return a;
    }
    if (t.t === 'id') {
      if (t.v === 'x') return (x) => x;
      if (t.v in CONSTS) { const v = CONSTS[t.v]!; return () => v; }
      const f = FUNCS[t.v]!;
      if (isOp('(')) { p++; const a = expr(); if (!isOp(')')) throw new ParseError('Parenthèse fermante manquante'); p++; return (x) => f(a(x)); }
      // allow "ln x", "sin 2x" style: function applied to the next power
      if (startsFactor()) { const a = power(); return (x) => f(a(x)); }
      throw new ParseError(`Argument manquant pour ${t.v}`);
    }
    throw new ParseError(`« ${t.v} » inattendu`);
  };
  const f = expr();
  if (p < toks.length) throw new ParseError(`« ${(toks[p] as { v: string | number }).v} » inattendu`);
  return f;
}

/** 5-point central difference — O(h⁴) */
export const derivative = (f: Fn, x: number, h = 1e-3): number =>
  (-f(x + 2 * h) + 8 * f(x + h) - 8 * f(x - h) + f(x - 2 * h)) / (12 * h);

// ——— Families (symbolic f and f′) ———
export type Params = { a: number; b: number; c: number; d: number };
export interface Family {
  id: string;
  label: string;
  params: (keyof Params)[];
  defaults: Params;
  f: (p: Params) => Fn;
  df: (p: Params) => Fn;
  texF: string; // generic formula
  texDf: string;
  x0: number;
}

export const families: Family[] = [
  {
    id: 'poly', label: 'Polynôme du 3ᵉ degré', params: ['a', 'b', 'c', 'd'], defaults: { a: 0.5, b: 0, c: -2, d: 1 }, x0: 1,
    f: ({ a, b, c, d }) => (x) => a * x ** 3 + b * x ** 2 + c * x + d,
    df: ({ a, b, c }) => (x) => 3 * a * x ** 2 + 2 * b * x + c,
    texF: 'f(x)=ax^3+bx^2+cx+d', texDf: "f'(x)=3ax^2+2bx+c",
  },
  {
    id: 'ln', label: 'Logarithme', params: ['a', 'b', 'c'], defaults: { a: 1, b: -1, c: -1, d: 0 }, x0: 2,
    f: ({ a, b, c }) => (x) => (x > 0 ? a * x + b + c * Math.log(x) : NaN),
    df: ({ a, c }) => (x) => (x > 0 ? a + c / x : NaN),
    texF: 'f(x)=ax+b+c\\ln x', texDf: "f'(x)=a+\\dfrac{c}{x}",
  },
  {
    id: 'exp', label: 'Exponentielle', params: ['a', 'b', 'c'], defaults: { a: 1, b: 0, c: -1, d: 0 }, x0: 0.5,
    f: ({ a, b, c }) => (x) => (a * x + b) * Math.exp(c * x),
    df: ({ a, b, c }) => (x) => (a + c * (a * x + b)) * Math.exp(c * x),
    texF: 'f(x)=(ax+b)\\,e^{cx}', texDf: "f'(x)=\\big(a+c(ax+b)\\big)e^{cx}",
  },
  {
    id: 'rat', label: 'Homographique', params: ['a', 'b', 'c'], defaults: { a: 1, b: 1, c: 1, d: 0 }, x0: 2,
    f: ({ a, b, c }) => (x) => (Math.abs(x - c) < 1e-9 ? NaN : (a * x + b) / (x - c)),
    df: ({ a, b, c }) => (x) => (Math.abs(x - c) < 1e-9 ? NaN : (-a * c - b) / (x - c) ** 2),
    texF: 'f(x)=\\dfrac{ax+b}{x-c}', texDf: "f'(x)=\\dfrac{-ac-b}{(x-c)^2}",
  },
  {
    id: 'trig', label: 'Trigonométrique', params: ['a', 'b', 'c'], defaults: { a: 2, b: 1, c: 0, d: 0 }, x0: 1,
    f: ({ a, b, c }) => (x) => a * Math.sin(b * x) + c,
    df: ({ a, b }) => (x) => a * b * Math.cos(b * x),
    texF: 'f(x)=a\\sin(bx)+c', texDf: "f'(x)=ab\\cos(bx)",
  },
];

/** Format a number for display in formulas: up to 3 decimals, no trailing zeros, French comma optional. */
export const num = (v: number, digits = 3) => {
  if (!Number.isFinite(v)) return '\\text{non défini}';
  const r = Math.round(v * 10 ** digits) / 10 ** digits;
  const s = (Object.is(r, -0) ? 0 : r).toString();
  return s.replace('.', '{,}');
};

/** "y = m x + p" in LaTeX, with clean signs. */
export function tangentTex(m: number, p: number) {
  const M = Math.round(m * 1000) / 1000;
  const P = Math.round(p * 1000) / 1000;
  let s = 'y=';
  if (M === 0) return s + num(P);
  if (M === 1) s += 'x';
  else if (M === -1) s += '-x';
  else s += num(M) + 'x';
  if (P > 0) s += '+' + num(P);
  else if (P < 0) s += '-' + num(-P);
  return s;
}

/** Join signed terms into LaTeX: terms are [coefficient, body] (body '' = constant). */
export function joinTerms(terms: [number, string][]) {
  let s = '';
  for (const [raw, body] of terms) {
    const c = Math.round(raw * 1000) / 1000;
    if (c === 0) continue;
    const neg = c < 0;
    const abs = Math.abs(c);
    const coef = body && abs === 1 ? '' : num(abs);
    const piece = coef + body;
    if (!s) s = (neg ? '-' : '') + piece;
    else s += (neg ? '-' : '+') + piece;
  }
  return s || '0';
}

/** LaTeX of f(x) for a family with numeric parameters substituted. */
export function familyTex(id: string, p: Params): string {
  const { a, b, c, d } = p;
  switch (id) {
    case 'poly': return joinTerms([[a, 'x^3'], [b, 'x^2'], [c, 'x'], [d, '']]);
    case 'ln': return joinTerms([[a, 'x'], [b, ''], [c, '\\ln x']]);
    case 'exp': {
      const lin = joinTerms([[a, 'x'], [b, '']]);
      const e = joinTerms([[c, 'x']]);
      if (lin === '0') return '0';
      const ex = e === '0' ? '' : `\\,e^{${e}}`;
      if (!ex) return lin;
      return (lin.includes('+') || lin.slice(1).includes('-') ? `(${lin})` : lin === '1' ? '' : lin === '-1' ? '-' : lin) + ex;
    }
    case 'rat': return `\\dfrac{${joinTerms([[a, 'x'], [b, '']])}}{${joinTerms([[1, 'x'], [-c, '']])}}`;
    case 'trig': {
      const arg = joinTerms([[b, 'x']]);
      return joinTerms([[a, `\\sin(${arg})`], [c, '']]);
    }
  }
  return '';
}
