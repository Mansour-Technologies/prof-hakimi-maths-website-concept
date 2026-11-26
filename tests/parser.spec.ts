import { test, expect } from '@playwright/test';
import { compile, derivative, families, tangentTex, familyTex, ParseError } from '../src/lib/mathlab';
import { sanitize } from '../src/lib/store';

test('parser: precedence, implicit multiplication, functions, constants', () => {
  expect(compile('2+3*4')(0)).toBe(14);
  expect(compile('-x^2')(3)).toBe(-9);
  expect(compile('2^3^2')(0)).toBe(512);
  expect(compile('2x(x+1)')(2)).toBe(12);
  expect(compile('x ln(x) - x')(Math.E)).toBeCloseTo(0, 12);
  expect(compile('sqrt(x^2+x)-x')(1e6)).toBeCloseTo(0.5, 5);
  expect(compile('exp(-x)*x')(1)).toBeCloseTo(1 / Math.E, 12);
  expect(compile('2pi')(0)).toBeCloseTo(2 * Math.PI, 12);
  expect(compile('3,5x')(2)).toBe(7);
  expect(compile('x²')(4)).toBe(16);
});

test('parser: rejects unsafe or invalid input (no eval)', () => {
  for (const bad of ['alert(1)', 'x;1', '2x+)', '(x', 'constructor', '', 'x'.repeat(200), 'window']) expect(() => compile(bad)).toThrow(ParseError);
});

test('numerical derivative matches exact derivatives of every family', () => {
  for (const F of families) {
    const f = F.f(F.defaults), df = F.df(F.defaults);
    for (const x of [0.3, 0.75, 1.5, 2.2]) {
      const exact = df(x);
      if (!Number.isFinite(exact)) continue;
      expect(Math.abs(derivative(f, x) - exact), `${F.id} at ${x}`).toBeLessThan(1e-6);
    }
  }
});

test('tangent and formula LaTeX formatting', () => {
  expect(tangentTex(-0.5, 0)).toBe('y=-0{,}5x');
  expect(tangentTex(1, -1)).toBe('y=x-1');
  expect(tangentTex(0, 2)).toBe('y=2');
  expect(familyTex('poly', { a: 0.5, b: 0, c: -2, d: 1 })).toBe('0{,}5x^3-2x+1');
  expect(familyTex('ln', { a: 1, b: -1, c: -1, d: 0 })).toBe('x-1-\\ln x');
});

test('store sanitize survives garbage', () => {
  expect(sanitize(null).bookmarks).toEqual([]);
  expect(sanitize([1, 2]).goals).toEqual([]);
  const s = sanitize({ results: { 'lc-1': { ok: true, tries: 'x' }, 'BAD KEY': {} }, sessions: [{ total: 2, correct: 5 }], goals: [{ id: 'a', text: 't' }] });
  expect(Object.keys(s.results)).toEqual(['lc-1']);
  expect(s.sessions).toEqual([]);
  expect(s.goals).toHaveLength(1);
});
