/**
 * Chapters of the Moroccan 2ᵉ BAC Sciences expérimentales maths programme
 * that the teacher has PUBLICLY covered on his YouTube channel (as of 2026-11-26).
 * The formula shown for each chapter is a design element (standard course
 * result, written for this concept), not taken from the teacher's notes.
 */
const r = String.raw;
export interface Chapter {
  slug: string;
  fr: string;
  ar: string;
  formula: string;
  figure: 'limit' | 'tangent' | 'sym' | 'cobweb' | 'ln' | 'complex' | 'integral';
}
export const chapters: Chapter[] = [
  { slug: 'limites-continuite', fr: 'Limites et continuité', ar: 'النهايات والاتصال', figure: 'limit', formula: r`f(a)\,f(b)<0 \Rightarrow \exists\,c\in\,]a,b[,\ f(c)=0` },
  { slug: 'derivation', fr: 'Dérivation et fonction réciproque', ar: 'الاشتقاق والدالة العكسية', figure: 'tangent', formula: r`\left(f^{-1}\right)'(y_0)=\frac{1}{f'(x_0)}` },
  { slug: 'etude-fonctions', fr: 'Étude de fonctions', ar: 'دراسة الدوال', figure: 'sym', formula: r`f(2a-x)=f(x)` },
  { slug: 'suites', fr: 'Suites numériques', ar: 'المتتاليات العددية', figure: 'cobweb', formula: r`u_{n+1}=f(u_n)` },
  { slug: 'logarithme', fr: 'Fonctions logarithmes', ar: 'الدوال اللوغاريتمية', figure: 'ln', formula: r`\ln(ab)=\ln a+\ln b` },
  { slug: 'nombres-complexes', fr: 'Nombres complexes', ar: 'الأعداد العقدية', figure: 'complex', formula: r`z=r\,e^{i\theta}` },
  { slug: 'calcul-integral', fr: 'Calcul intégral', ar: 'الحساب التكاملي', figure: 'integral', formula: r`\int_a^b f(x)\,dx=F(b)-F(a)` },
];
