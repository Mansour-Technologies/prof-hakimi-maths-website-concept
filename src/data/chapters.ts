/**
 * Curriculum map — 2ᵉ année Bac Sciences expérimentales (programme marocain).
 * Chapter names follow the official Moroccan curriculum. Summaries, formulas
 * and checkpoints are ORIGINAL demonstration content written for this concept
 * (not the teacher's own notes). The semester split is indicative.
 * `$…$` / `$$…$$` are rendered to KaTeX HTML at build time.
 */
const r = String.raw;

export interface Chapter {
  slug: string;
  n: number;
  fr: string;
  ar: string;
  semester: 1 | 2;
  /** one-line hook (original) */
  hook: string;
  summary: string;
  formulas: { label: string; tex: string }[];
  checkpoints: string[];
  /** small illustrative figure drawn by <ChapterFigure> */
  figure: 'limit' | 'tangent' | 'sym' | 'cobweb' | 'ln' | 'complex' | 'exp' | 'diffeq' | 'integral' | 'space' | 'proba';
}

export const chapters: Chapter[] = [
  {
    slug: 'limites-continuite', n: 1, fr: 'Limites et continuité', ar: 'النهايات والاتصال', semester: 1, figure: 'limit',
    hook: 'Le langage de base : où va la courbe, et peut-on la tracer sans lever le crayon ?',
    summary: r`Opérations sur les limites et formes indéterminées, continuité sur un intervalle, théorème des valeurs intermédiaires (TVI), fonction réciproque d'une fonction continue strictement monotone, fonction racine $n$-ième.`,
    formulas: [
      { label: 'TVI', tex: r`f \text{ continue sur } [a,b],\ f(a)\,f(b)<0 \;\Rightarrow\; \exists\, c\in\,]a,b[,\ f(c)=0` },
      { label: 'Forme indéterminée classique', tex: r`\lim_{x\to+\infty}\left(\sqrt{x^2+x}-x\right)=\lim_{x\to+\infty}\frac{x}{\sqrt{x^2+x}+x}=\frac12` },
      { label: 'Racine n-ième', tex: r`\sqrt[n]{x^n}=x \quad (x\ge 0),\qquad \sqrt[n]{a}\cdot\sqrt[n]{b}=\sqrt[n]{ab}` },
    ],
    checkpoints: ['Lever une forme indéterminée par conjugué ou factorisation', 'Appliquer le TVI pour une solution unique', 'Justifier l’existence d’une fonction réciproque', 'Calculer avec les racines n-ièmes'],
  },
  {
    slug: 'derivation', n: 2, fr: 'Dérivation et fonction réciproque', ar: 'الاشتقاق والدالة العكسية', semester: 1, figure: 'tangent',
    hook: 'La pente instantanée : de la limite du taux d’accroissement à la tangente.',
    summary: r`Nombre dérivé comme limite du taux d'accroissement, équation de la tangente, dérivée d'une composée, dérivabilité et dérivée de la fonction réciproque, théorème des accroissements finis.`,
    formulas: [
      { label: 'Nombre dérivé', tex: r`f'(x_0)=\lim_{h\to0}\frac{f(x_0+h)-f(x_0)}{h}` },
      { label: 'Tangente en x₀', tex: r`(T):\ y=f'(x_0)\,(x-x_0)+f(x_0)` },
      { label: 'Fonction réciproque', tex: r`\left(f^{-1}\right)'(y_0)=\frac{1}{f'(x_0)}\quad\text{avec } y_0=f(x_0),\ f'(x_0)\neq0` },
    ],
    checkpoints: ['Écrire l’équation d’une tangente', 'Dériver une composée u∘v', 'Calculer (f⁻¹)′ en un point', 'Utiliser les accroissements finis pour encadrer'],
  },
  {
    slug: 'etude-fonctions', n: 3, fr: 'Étude de fonctions', ar: 'دراسة الدوال', semester: 1, figure: 'sym',
    hook: 'Assembler toutes les pièces : variations, branches infinies, symétries, tracé.',
    summary: r`Tableau de variations, extremums, concavité et points d'inflexion, asymptotes et branches paraboliques, axe et centre de symétrie, position relative d'une courbe et d'une droite.`,
    formulas: [
      { label: 'Axe de symétrie x = a', tex: r`\forall x\in D_f,\ (2a-x)\in D_f \ \text{ et }\ f(2a-x)=f(x)` },
      { label: 'Centre de symétrie Ω(a, b)', tex: r`f(2a-x)+f(x)=2b` },
      { label: 'Asymptote oblique', tex: r`\lim_{x\to\pm\infty}\big[f(x)-(ax+b)\big]=0` },
    ],
    checkpoints: ['Dresser un tableau de variations complet', 'Démontrer un axe ou un centre de symétrie', 'Étudier les branches infinies', 'Déterminer un point d’inflexion avec f″'],
  },
  {
    slug: 'suites', n: 4, fr: 'Suites numériques', ar: 'المتتاليات العددية', semester: 1, figure: 'cobweb',
    hook: 'Des valeurs qui se suivent… et une limite qui se dessine.',
    summary: r`Suites arithmétiques et géométriques, raisonnement par récurrence, suites majorées, minorées, monotones, convergence d'une suite monotone bornée, suites du type $u_{n+1}=f(u_n)$.`,
    formulas: [
      { label: 'Somme géométrique (q ≠ 1)', tex: r`\sum_{k=0}^{n} q^k=\frac{1-q^{n+1}}{1-q}` },
      { label: 'Convergence monotone', tex: r`(u_n)\ \text{croissante et majorée} \;\Rightarrow\; (u_n)\ \text{converge}` },
      { label: 'Limite de qⁿ', tex: r`-1<q<1 \;\Rightarrow\; \lim_{n\to+\infty} q^n=0` },
    ],
    checkpoints: ['Rédiger une récurrence propre', 'Montrer qu’une suite est majorée', 'Trouver la limite d’une suite récurrente', 'Calculer une somme géométrique'],
  },
  {
    slug: 'logarithme', n: 5, fr: 'Fonctions logarithmes', ar: 'الدوال اللوغاريتمية', semester: 1, figure: 'ln',
    hook: 'La primitive de 1/x qui s’annule en 1 — et tout ce qui en découle.',
    summary: r`Définition de $\ln$ sur $]0,+\infty[$, propriétés algébriques, limites usuelles et croissances comparées, logarithme de base $a$, équations et inéquations.`,
    formulas: [
      { label: 'Propriété fondamentale', tex: r`\ln(ab)=\ln a+\ln b \qquad (a>0,\ b>0)` },
      { label: 'Dérivée', tex: r`(\ln u)'=\frac{u'}{u}\qquad (u>0)` },
      { label: 'Limites usuelles', tex: r`\lim_{x\to+\infty}\frac{\ln x}{x}=0,\qquad \lim_{x\to0^+}x\ln x=0,\qquad \lim_{x\to0}\frac{\ln(1+x)}{x}=1` },
    ],
    checkpoints: ['Résoudre ln(u) = ln(v) avec conditions', 'Utiliser les croissances comparées', 'Dériver ln(u)', 'Étudier une fonction avec ln'],
  },
  {
    slug: 'nombres-complexes', n: 6, fr: 'Nombres complexes', ar: 'الأعداد العقدية', semester: 1, figure: 'complex',
    hook: 'Un plan où multiplier, c’est tourner et agrandir.',
    summary: r`Forme algébrique, conjugué et module, forme trigonométrique et exponentielle, formules de Moivre et d'Euler, équations du second degré dans $\mathbb{C}$, interprétation géométrique (rotations, homothéties, translations).`,
    formulas: [
      { label: 'Module', tex: r`|a+ib|=\sqrt{a^2+b^2}` },
      { label: 'Forme exponentielle', tex: r`z=r\,e^{i\theta}=r(\cos\theta+i\sin\theta)` },
      { label: 'Moivre', tex: r`(\cos\theta+i\sin\theta)^n=\cos(n\theta)+i\sin(n\theta)` },
    ],
    checkpoints: ['Passer de la forme algébrique à la forme exponentielle', 'Résoudre az² + bz + c = 0 dans ℂ', 'Reconnaître une rotation', 'Utiliser Moivre et Euler'],
  },
  {
    slug: 'exponentielle', n: 7, fr: 'Fonctions exponentielles', ar: 'الدوال الأسية', semester: 2, figure: 'exp',
    hook: 'La fonction égale à sa propre dérivée.',
    summary: r`Réciproque de $\ln$, propriétés algébriques, dérivée de $e^{u}$, limites usuelles et croissances comparées, exponentielle de base $a$.`,
    formulas: [
      { label: 'Lien avec ln', tex: r`y=e^{x} \iff x=\ln y \qquad (y>0)` },
      { label: 'Dérivée', tex: r`\left(e^{u}\right)'=u'\,e^{u}` },
      { label: 'Croissances comparées', tex: r`\lim_{x\to+\infty}\frac{e^{x}}{x}=+\infty,\qquad \lim_{x\to-\infty}x\,e^{x}=0` },
    ],
    checkpoints: ['Résoudre une équation avec e^x', 'Dériver e^u', 'Lever une indétermination avec e^x', 'Étudier f(x) = (ax+b)e^x'],
  },
  {
    slug: 'equations-differentielles', n: 8, fr: 'Équations différentielles', ar: 'المعادلات التفاضلية', semester: 2, figure: 'diffeq',
    hook: 'Retrouver une fonction à partir de ce qu’on sait de sa variation.',
    summary: r`Équations $y'=ay+b$, équations du second ordre à coefficients constants $y''+ay'+by=0$ selon le signe du discriminant de l'équation caractéristique.`,
    formulas: [
      { label: "y' = ay + b (a ≠ 0)", tex: r`y(x)=C\,e^{ax}-\frac{b}{a},\qquad C\in\mathbb{R}` },
      { label: 'Équation caractéristique', tex: r`y''+ay'+by=0 \;\longrightarrow\; r^2+ar+b=0` },
      { label: 'Δ < 0, racines p ± iq', tex: r`y(x)=e^{px}\big(\alpha\cos(qx)+\beta\sin(qx)\big)` },
    ],
    checkpoints: ["Résoudre y' = ay + b avec condition initiale", 'Écrire l’équation caractéristique', 'Traiter les trois cas selon Δ'],
  },
  {
    slug: 'calcul-integral', n: 9, fr: 'Calcul intégral', ar: 'الحساب التكاملي', semester: 2, figure: 'integral',
    hook: 'Mesurer l’aire sous la courbe — et bien plus.',
    summary: r`Primitives, intégrale d'une fonction continue, propriétés (linéarité, Chasles, positivité), intégration par parties, calcul d'aires et de volumes de révolution, valeur moyenne.`,
    formulas: [
      { label: 'Définition', tex: r`\int_a^b f(x)\,dx=F(b)-F(a),\qquad F'=f` },
      { label: 'Intégration par parties', tex: r`\int_a^b u\,v'\,dx=\big[u\,v\big]_a^b-\int_a^b u'\,v\,dx` },
      { label: 'Volume de révolution', tex: r`V=\pi\int_a^b f(x)^2\,dx` },
    ],
    checkpoints: ['Trouver une primitive usuelle', 'Mener une intégration par parties', 'Calculer une aire entre deux courbes', 'Calculer un volume de révolution'],
  },
  {
    slug: 'geometrie-espace', n: 10, fr: 'Géométrie dans l’espace', ar: 'الهندسة الفضائية', semester: 2, figure: 'space',
    hook: 'Produit scalaire, produit vectoriel, plans et sphères.',
    summary: r`Produit scalaire dans l'espace, équation cartésienne d'un plan, distance d'un point à un plan, produit vectoriel, sphère et position relative d'une sphère et d'un plan.`,
    formulas: [
      { label: 'Distance point–plan', tex: r`d(A,\mathcal P)=\frac{|a x_A+b y_A+c z_A+d|}{\sqrt{a^2+b^2+c^2}}` },
      { label: 'Sphère', tex: r`(x-a)^2+(y-b)^2+(z-c)^2=R^2` },
      { label: 'Aire d’un triangle', tex: r`\mathcal A_{ABC}=\tfrac12\,\big\|\overrightarrow{AB}\wedge\overrightarrow{AC}\big\|` },
    ],
    checkpoints: ['Écrire l’équation d’un plan', 'Calculer une distance point–plan', 'Utiliser le produit vectoriel', 'Étudier l’intersection sphère–plan'],
  },
  {
    slug: 'probabilites', n: 11, fr: 'Probabilités', ar: 'حساب الاحتمالات', semester: 2, figure: 'proba',
    hook: 'Compter juste, puis mesurer le hasard.',
    summary: r`Dénombrement (arrangements, combinaisons), probabilités conditionnelles, indépendance, variable aléatoire, espérance, variance, loi binomiale.`,
    formulas: [
      { label: 'Combinaisons', tex: r`C_n^p=\frac{n!}{p!\,(n-p)!}` },
      { label: 'Loi binomiale', tex: r`P(X=k)=C_n^k\,p^k\,(1-p)^{n-k}` },
      { label: 'Espérance binomiale', tex: r`E(X)=np,\qquad V(X)=np(1-p)` },
    ],
    checkpoints: ['Choisir entre arrangements et combinaisons', 'Utiliser un arbre et P(A∩B)', 'Reconnaître une loi binomiale', 'Calculer E(X) et V(X)'],
  },
];

export const chapterBySlug = (slug: string) => chapters.find((c) => c.slug === slug);
