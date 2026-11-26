/**
 * Chapters of the Moroccan 2ᵉ BAC Sciences expérimentales maths programme
 * that the teacher has PUBLICLY covered on his YouTube channel (as of 2026-11-26).
 * The formula for each chapter is a standard course result written for this
 * concept (not copied from his notes). `ids` = his official videos on that chapter.
 */
const r = String.raw;
export interface Chapter { slug: string; fr: string; ar: string; formula: string; ids: string[] }
export const chapters: Chapter[] = [
  { slug: 'limites-continuite', fr: 'Limites et continuité', ar: 'النهايات والاتصال', formula: r`f \text{ continue en } a \iff \lim_{x\to a} f(x)=f(a)`, ids: ['ZRcJpzyJT6c', '5tfLXLIbouY', 'wM88JcxD2ao'] },
  { slug: 'derivation', fr: 'Dérivation et fonction réciproque', ar: 'الاشتقاق والدالة العكسية', formula: r`\left(f^{-1}\right)'(y_0)=\frac{1}{f'(x_0)}`, ids: ['927ZIYtI7AM', 'GuVEiEvAZTo', 'HdspPTxsy-A', 'K57PPKXKBHs'] },
  { slug: 'etude-fonctions', fr: 'Étude de fonctions', ar: 'دراسة الدوال', formula: r`f(2a-x)=f(x)`, ids: ['n8D5n4ufnp4'] },
  { slug: 'suites', fr: 'Suites numériques', ar: 'المتتاليات العددية', formula: r`u_{n+1}\le u_n \le M`, ids: ['xxG1hjN4r1c'] },
  { slug: 'logarithme', fr: 'La fonction ln', ar: 'الدالة اللوغاريتمية', formula: r`\ln(ab)=\ln a+\ln b`, ids: ['M-kjMa0B8Uw', 'rcAxKxJhJPc', 'T5EfmuU75hQ'] },
  { slug: 'nombres-complexes', fr: 'Les nombres complexes', ar: 'الأعداد العقدية', formula: r`z=r\,e^{i\theta}`, ids: ['041v4emryEM', 'yg6YlI4Rz9c', '0ZsTC-TzwnM'] },
  { slug: 'calcul-integral', fr: 'Calcul intégral', ar: 'الحساب التكاملي', formula: r`\int_a^b f(x)\,dx=F(b)-F(a)`, ids: ['6XTA_EX9w2Y'] },
];
