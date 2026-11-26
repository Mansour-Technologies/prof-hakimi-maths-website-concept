/**
 * ORIGINAL demonstration exercises (written for this concept, BAC-style).
 * They are not taken from the teacher, from a textbook or from a real
 * national exam. Each answer has been checked by hand.
 */
const r = String.raw;

export type Difficulty = 1 | 2 | 3;
interface Base {
  id: string;
  chapter: string;
  difficulty: Difficulty;
  /** optional exam-problem group */
  group?: string;
  prompt: string;
  /** worked solution, one string per step */
  steps: string[];
}
export interface NumExercise extends Base { type: 'num'; answer: number; tolerance: number; hint: string }
export interface McqExercise extends Base { type: 'mcq'; options: string[]; correct: number }
export type Exercise = NumExercise | McqExercise;

export const difficultyLabel: Record<Difficulty, string> = { 1: 'Application', 2: 'Standard BAC', 3: 'Approfondi' };

export const exercises: Exercise[] = [
  // ——— Limites et continuité ———
  { id: 'lc-1', chapter: 'limites-continuite', difficulty: 1, type: 'num', answer: 3, tolerance: 1e-6, hint: 'Factorisez par le terme de plus haut degré.',
    prompt: r`Calculer $\displaystyle\lim_{x\to+\infty}\frac{3x^2-x+1}{x^2+2}$.`,
    steps: [r`On factorise par $x^2$ : $\dfrac{3x^2-x+1}{x^2+2}=\dfrac{3-\frac1x+\frac1{x^2}}{1+\frac2{x^2}}$.`, r`Quand $x\to+\infty$, $\frac1x\to0$ et $\frac1{x^2}\to0$, donc la limite vaut $\dfrac31=3$.`] },
  { id: 'lc-2', chapter: 'limites-continuite', difficulty: 2, type: 'num', answer: 0.25, tolerance: 1e-6, hint: 'Multipliez par l’expression conjuguée.',
    prompt: r`Calculer $\displaystyle\lim_{x\to0}\frac{\sqrt{x+4}-2}{x}$ (réponse décimale).`,
    steps: [r`Forme indéterminée $\frac00$. On multiplie par le conjugué : $\dfrac{(\sqrt{x+4}-2)(\sqrt{x+4}+2)}{x(\sqrt{x+4}+2)}=\dfrac{x}{x(\sqrt{x+4}+2)}$.`, r`Donc $\dfrac{1}{\sqrt{x+4}+2}\xrightarrow[x\to0]{}\dfrac{1}{2+2}=\dfrac14=0{,}25$.`] },
  { id: 'lc-3', chapter: 'limites-continuite', difficulty: 2, type: 'mcq', correct: 1,
    prompt: r`Soit $f(x)=x^3+x-1$. Combien de solutions l'équation $f(x)=0$ admet-elle dans $]0,1[$ ?`,
    options: ['Aucune', 'Exactement une', 'Exactement deux', 'On ne peut pas conclure'],
    steps: [r`$f$ est continue et $f'(x)=3x^2+1>0$ : $f$ est strictement croissante sur $[0,1]$.`, r`$f(0)=-1<0$ et $f(1)=1>0$. D'après le TVI (cas strictement monotone), l'équation admet une **unique** solution dans $]0,1[$.`] },
  { id: 'lc-4', chapter: 'limites-continuite', difficulty: 3, type: 'num', answer: 0.5, tolerance: 1e-6, hint: 'Conjugué, puis factorisez par x au dénominateur.',
    prompt: r`Calculer $\displaystyle\lim_{x\to+\infty}\left(\sqrt{x^2+x}-x\right)$.`,
    steps: [r`$\sqrt{x^2+x}-x=\dfrac{x}{\sqrt{x^2+x}+x}$.`, r`Pour $x>0$ : $\dfrac{x}{x\left(\sqrt{1+\frac1x}+1\right)}=\dfrac{1}{\sqrt{1+\frac1x}+1}\to\dfrac12$.`] },

  // ——— Dérivation ———
  { id: 'dv-1', chapter: 'derivation', difficulty: 1, type: 'num', answer: 9, tolerance: 1e-6, hint: '(xⁿ)′ = n xⁿ⁻¹.',
    prompt: r`Soit $f(x)=x^3-3x+1$. Calculer $f'(2)$.`,
    steps: [r`$f'(x)=3x^2-3$.`, r`$f'(2)=3\times4-3=9$.`] },
  { id: 'dv-2', chapter: 'derivation', difficulty: 2, type: 'num', answer: -0.12, tolerance: 1e-6, hint: 'Utilisez (u/v)′ = (u′v − uv′)/v².',
    prompt: r`Soit $f(x)=\dfrac{x}{x^2+1}$. Calculer $f'(2)$ (réponse décimale).`,
    steps: [r`$f'(x)=\dfrac{(x^2+1)-x\cdot 2x}{(x^2+1)^2}=\dfrac{1-x^2}{(x^2+1)^2}$.`, r`$f'(2)=\dfrac{1-4}{25}=-\dfrac{3}{25}=-0{,}12$.`] },
  { id: 'dv-3', chapter: 'derivation', difficulty: 2, type: 'mcq', correct: 2,
    prompt: r`Quelle est l'équation de la tangente à la courbe de $f(x)=x^2$ au point d'abscisse $x_0=1$ ?`,
    options: [r`$y=x+1$`, r`$y=2x$`, r`$y=2x-1$`, r`$y=x^2-1$`],
    steps: [r`$f(1)=1$ et $f'(x)=2x$, donc $f'(1)=2$.`, r`$(T):\ y=f'(1)(x-1)+f(1)=2(x-1)+1=2x-1$.`] },
  { id: 'dv-4', chapter: 'derivation', difficulty: 3, type: 'num', answer: 0.25, tolerance: 1e-6, hint: 'Cherchez x₀ tel que f(x₀) = 2.',
    prompt: r`Soit $f(x)=x^3+x$, bijection de $\mathbb R$ sur $\mathbb R$. Calculer $\left(f^{-1}\right)'(2)$.`,
    steps: [r`$f(1)=1+1=2$, donc $f^{-1}(2)=1$.`, r`$f'(x)=3x^2+1$, $f'(1)=4\neq0$.`, r`$\left(f^{-1}\right)'(2)=\dfrac{1}{f'(1)}=\dfrac14=0{,}25$.`] },

  // ——— Étude de fonctions ———
  { id: 'ef-1', chapter: 'etude-fonctions', difficulty: 2, type: 'mcq', correct: 0,
    prompt: r`La courbe de $f(x)=x^2-4x+7$ admet un axe de symétrie d'équation :`,
    options: [r`$x=2$`, r`$x=-2$`, r`$x=4$`, r`$y=3$`],
    steps: [r`$f(x)=(x-2)^2+3$.`, r`$f(4-x)=(2-x)^2+3=f(x)$ pour tout réel $x$ : la droite $x=2$ est un axe de symétrie.`] },
  { id: 'ef-2', chapter: 'etude-fonctions', difficulty: 2, type: 'num', answer: 1, tolerance: 1e-6, hint: 'Étudiez le signe de f″.',
    prompt: r`Soit $f(x)=x^3-3x^2+2$. Donner l'abscisse du point d'inflexion de sa courbe.`,
    steps: [r`$f'(x)=3x^2-6x$ et $f''(x)=6x-6$.`, r`$f''$ s'annule en changeant de signe en $x=1$ : le point $I(1\,;\,0)$ est un point d'inflexion.`] },
  { id: 'ef-3', chapter: 'etude-fonctions', difficulty: 3, type: 'num', answer: 2, tolerance: 1e-6, hint: 'Écrivez f(x) = ax + b + reste.',
    prompt: r`Soit $f(x)=\dfrac{x^2+1}{x}$. La droite $y=ax+b$ est asymptote oblique en $+\infty$. Donner $a+b+1$.`,
    steps: [r`$f(x)=x+\dfrac1x$ et $\dfrac1x\to0$ en $+\infty$.`, r`L'asymptote est $y=x$ : $a=1$, $b=0$, donc $a+b+1=2$.`] },

  // ——— Suites ———
  { id: 'su-1', chapter: 'suites', difficulty: 1, type: 'num', answer: 32, tolerance: 1e-6, hint: 'u_n = u₀ + n r.',
    prompt: r`$(u_n)$ est arithmétique de raison $3$ avec $u_0=2$. Calculer $u_{10}$.`,
    steps: [r`$u_n=u_0+nr=2+3n$.`, r`$u_{10}=2+30=32$.`] },
  { id: 'su-2', chapter: 'suites', difficulty: 2, type: 'num', answer: 15.75, tolerance: 1e-6, hint: 'Somme de termes géométriques.',
    prompt: r`$(v_n)$ est géométrique de raison $\frac12$ avec $v_0=8$. Calculer $S=v_0+v_1+\dots+v_5$.`,
    steps: [r`$S=v_0\,\dfrac{1-q^{6}}{1-q}=8\cdot\dfrac{1-\frac1{64}}{\frac12}=16\cdot\dfrac{63}{64}$.`, r`$S=\dfrac{63}{4}=15{,}75$.`] },
  { id: 'su-3', chapter: 'suites', difficulty: 2, type: 'num', answer: 6, tolerance: 1e-6, hint: 'Une limite ℓ vérifie ℓ = ½ℓ + 3.',
    prompt: r`On pose $u_0=0$ et $u_{n+1}=\frac12u_n+3$. On admet que $(u_n)$ converge. Quelle est sa limite ?`,
    steps: [r`La fonction $x\mapsto\frac12x+3$ est continue, donc la limite $\ell$ vérifie $\ell=\frac12\ell+3$.`, r`D'où $\frac12\ell=3$ et $\ell=6$.`] },
  { id: 'su-4', chapter: 'suites', difficulty: 3, type: 'mcq', correct: 3,
    prompt: r`Soit $u_n=2-\dfrac{1}{n+1}$ pour $n\in\mathbb N$. Quelle affirmation est vraie ?`,
    options: ['(uₙ) est décroissante', '(uₙ) n’est pas majorée', '(uₙ) diverge', '(uₙ) est croissante, majorée par 2, et converge vers 2'],
    steps: [r`$u_{n+1}-u_n=\dfrac1{n+1}-\dfrac1{n+2}=\dfrac{1}{(n+1)(n+2)}>0$ : la suite est croissante.`, r`$u_n<2$ pour tout $n$ et $\dfrac{1}{n+1}\to0$, donc $u_n\to2$.`] },

  // ——— Logarithme ———
  { id: 'ln-1', chapter: 'logarithme', difficulty: 1, type: 'num', answer: 1, tolerance: 1e-6, hint: 'ln(eᵃ) = a.',
    prompt: r`Calculer $\ln\!\left(e^{3}\right)-2\ln(e)$.`,
    steps: [r`$\ln(e^3)=3$ et $\ln e=1$.`, r`$3-2=1$.`] },
  { id: 'ln-2', chapter: 'logarithme', difficulty: 2, type: 'num', answer: 1, tolerance: 1e-6, hint: 'ln(u) = 0 ⇔ u = 1, avec u > 0.',
    prompt: r`Résoudre dans $\left]\frac12,+\infty\right[$ l'équation $\ln(2x-1)=0$. Donner la solution.`,
    steps: [r`$\ln(2x-1)=0\iff 2x-1=1$ (avec $2x-1>0$).`, r`$x=1$, qui appartient bien à $\left]\frac12,+\infty\right[$.`] },
  { id: 'ln-3', chapter: 'logarithme', difficulty: 2, type: 'mcq', correct: 0,
    prompt: r`Que vaut $\displaystyle\lim_{x\to+\infty}\frac{\ln x}{x}$ ?`,
    options: [r`$0$`, r`$1$`, r`$+\infty$`, r`$e$`],
    steps: [r`C'est une croissance comparée du cours : $x$ l'emporte sur $\ln x$ en $+\infty$.`, r`Donc $\displaystyle\lim_{x\to+\infty}\frac{\ln x}{x}=0$.`] },
  { id: 'ln-4', chapter: 'logarithme', difficulty: 3, type: 'num', answer: 2, tolerance: 1e-6, hint: 'Dérivez x ln x comme un produit.',
    prompt: r`Soit $f(x)=x\ln x-x$ sur $]0,+\infty[$. Calculer $f'\!\left(e^{2}\right)$.`,
    steps: [r`$f'(x)=\ln x+x\cdot\frac1x-1=\ln x$.`, r`$f'(e^2)=\ln(e^2)=2$.`] },

  // ——— Nombres complexes ———
  { id: 'nc-1', chapter: 'nombres-complexes', difficulty: 1, type: 'num', answer: 5, tolerance: 1e-6, hint: '|a + ib| = √(a² + b²).',
    prompt: r`Calculer le module de $z=3+4i$.`,
    steps: [r`$|z|=\sqrt{3^2+4^2}=\sqrt{25}=5$.`] },
  { id: 'nc-2', chapter: 'nombres-complexes', difficulty: 2, type: 'num', answer: 2, tolerance: 1e-6, hint: 'Développez (1 + i)².',
    prompt: r`Soit $z=(1+i)^2$. Donner la partie imaginaire de $z$.`,
    steps: [r`$(1+i)^2=1+2i+i^2=1+2i-1=2i$.`, r`$\operatorname{Im}(z)=2$.`] },
  { id: 'nc-3', chapter: 'nombres-complexes', difficulty: 2, type: 'mcq', correct: 1,
    prompt: r`Un argument de $z=1+i\sqrt3$ est :`,
    options: [r`$\dfrac{\pi}{6}$`, r`$\dfrac{\pi}{3}$`, r`$\dfrac{2\pi}{3}$`, r`$\dfrac{\pi}{4}$`],
    steps: [r`$|z|=\sqrt{1+3}=2$, donc $z=2\left(\frac12+i\frac{\sqrt3}{2}\right)$.`, r`$\cos\theta=\frac12$ et $\sin\theta=\frac{\sqrt3}2$ donnent $\theta\equiv\frac{\pi}{3}\ [2\pi]$.`] },
  { id: 'nc-4', chapter: 'nombres-complexes', difficulty: 3, type: 'num', answer: Math.sqrt(5), tolerance: 0.01, hint: 'Calculez Δ, puis les racines conjuguées.',
    prompt: r`Les solutions de $z^2-2z+5=0$ sont $z_1$ et $z_2$. Calculer $|z_1|$ (arrondi à $0{,}01$).`,
    steps: [r`$\Delta=4-20=-16=(4i)^2$.`, r`$z_1=\dfrac{2+4i}{2}=1+2i$ et $z_2=\overline{z_1}=1-2i$.`, r`$|z_1|=\sqrt{1+4}=\sqrt5\approx2{,}24$.`] },

  // ——— Exponentielle ———
  { id: 'ex-1', chapter: 'exponentielle', difficulty: 1, type: 'num', answer: 5, tolerance: 1e-6, hint: 'exp et ln sont réciproques.',
    prompt: r`Calculer $e^{\ln 5}$.`,
    steps: [r`Pour $a>0$, $e^{\ln a}=a$, donc $e^{\ln5}=5$.`] },
  { id: 'ex-2', chapter: 'exponentielle', difficulty: 2, type: 'num', answer: 3, tolerance: 1e-6, hint: 'eᵃ = eᵇ ⇔ a = b.',
    prompt: r`Résoudre dans $\mathbb R$ : $e^{2x}=e^{x+3}$.`,
    steps: [r`$\exp$ est injective : $2x=x+3$.`, r`$x=3$.`] },
  { id: 'ex-3', chapter: 'exponentielle', difficulty: 3, type: 'num', answer: 1 / Math.E, tolerance: 0.005, hint: 'Annulez f′.',
    prompt: r`Soit $f(x)=x\,e^{-x}$. Quelle est la valeur maximale de $f$ sur $\mathbb R$ (arrondie à $0{,}01$) ?`,
    steps: [r`$f'(x)=e^{-x}-x\,e^{-x}=(1-x)\,e^{-x}$, du signe de $1-x$.`, r`$f$ croît puis décroît : le maximum est $f(1)=e^{-1}\approx0{,}37$.`] },

  // ——— Équations différentielles ———
  { id: 'ed-1', chapter: 'equations-differentielles', difficulty: 2, type: 'num', answer: 3 * Math.exp(2), tolerance: 0.05, hint: 'y = C e^{2x}, puis la condition initiale.',
    prompt: r`$y$ est la solution de $y'=2y$ vérifiant $y(0)=3$. Calculer $y(1)$ (arrondi à $0{,}1$).`,
    steps: [r`Les solutions sont $y(x)=Ce^{2x}$.`, r`$y(0)=C=3$, donc $y(1)=3e^{2}\approx22{,}2$.`] },
  { id: 'ed-2', chapter: 'equations-differentielles', difficulty: 2, type: 'mcq', correct: 0,
    prompt: r`Les solutions de l'équation $y'=-y+2$ sont les fonctions :`,
    options: [r`$x\mapsto Ce^{-x}+2$`, r`$x\mapsto Ce^{x}+2$`, r`$x\mapsto Ce^{-x}-2$`, r`$x\mapsto 2e^{-x}+C$`],
    steps: [r`Forme $y'=ay+b$ avec $a=-1$, $b=2$.`, r`$y=Ce^{ax}-\frac ba=Ce^{-x}+2$.`] },

  // ——— Calcul intégral ———
  { id: 'ci-1', chapter: 'calcul-integral', difficulty: 1, type: 'num', answer: 2, tolerance: 1e-6, hint: 'Une primitive de 3x² + 1 est x³ + x.',
    prompt: r`Calculer $\displaystyle\int_0^1 (3x^2+1)\,dx$.`,
    steps: [r`$\displaystyle\int_0^1(3x^2+1)\,dx=\big[x^3+x\big]_0^1$.`, r`$=(1+1)-0=2$.`] },
  { id: 'ci-2', chapter: 'calcul-integral', difficulty: 2, type: 'num', answer: 1, tolerance: 1e-6, hint: 'Une primitive de 1/x sur ]0,+∞[ est ln x.',
    prompt: r`Calculer $\displaystyle\int_1^{e}\frac{1}{x}\,dx$.`,
    steps: [r`$\displaystyle\int_1^e\frac1x\,dx=\big[\ln x\big]_1^e=\ln e-\ln1=1$.`] },
  { id: 'ci-3', chapter: 'calcul-integral', difficulty: 3, type: 'num', answer: 1, tolerance: 1e-6, hint: 'Intégration par parties avec u = x, v′ = eˣ.',
    prompt: r`Calculer $\displaystyle\int_0^1 x\,e^{x}\,dx$.`,
    steps: [r`On pose $u=x$, $v'=e^x$ : $u'=1$, $v=e^x$.`, r`$\displaystyle\int_0^1xe^x\,dx=\big[xe^x\big]_0^1-\int_0^1e^x\,dx=e-(e-1)=1$.`] },

  // ——— Géométrie dans l'espace ———
  { id: 'ge-1', chapter: 'geometrie-espace', difficulty: 1, type: 'num', answer: 3, tolerance: 1e-6, hint: 'OA = √(x² + y² + z²).',
    prompt: r`Dans un repère orthonormé, calculer la distance $OA$ avec $A(1\,;2\,;2)$.`,
    steps: [r`$OA=\sqrt{1+4+4}=\sqrt9=3$.`] },
  { id: 'ge-2', chapter: 'geometrie-espace', difficulty: 2, type: 'num', answer: 1, tolerance: 1e-6, hint: 'Formule de la distance point–plan.',
    prompt: r`Calculer la distance du point $A(1\,;1\,;1)$ au plan $\mathcal P : x+2y+2z-2=0$.`,
    steps: [r`$d=\dfrac{|1+2+2-2|}{\sqrt{1+4+4}}=\dfrac{3}{3}=1$.`] },

  // ——— Probabilités ———
  { id: 'pr-1', chapter: 'probabilites', difficulty: 1, type: 'num', answer: 0.6, tolerance: 1e-6, hint: 'Cas favorables / cas possibles.',
    prompt: r`Une urne contient $3$ boules rouges et $2$ blanches. On tire une boule au hasard. Calculer $P(\text{rouge})$.`,
    steps: [r`$P=\dfrac{3}{5}=0{,}6$.`] },
  { id: 'pr-2', chapter: 'probabilites', difficulty: 2, type: 'num', answer: 0.3, tolerance: 1e-6, hint: 'Tirage simultané : combinaisons.',
    prompt: r`Même urne ($3$ rouges, $2$ blanches). On tire simultanément $2$ boules. Calculer la probabilité d'obtenir $2$ rouges.`,
    steps: [r`$\operatorname{card}\Omega=C_5^2=10$ et il y a $C_3^2=3$ cas favorables.`, r`$P=\dfrac{3}{10}=0{,}3$.`] },
  { id: 'pr-3', chapter: 'probabilites', difficulty: 3, type: 'num', answer: 0.375, tolerance: 1e-6, hint: 'Loi binomiale de paramètres n = 4 et p = ½.',
    prompt: r`On lance $4$ fois une pièce équilibrée. Calculer la probabilité d'obtenir exactement $2$ fois « pile ».`,
    steps: [r`$X\sim\mathcal B\left(4,\frac12\right)$.`, r`$P(X=2)=C_4^2\left(\frac12\right)^4=\dfrac{6}{16}=0{,}375$.`] },

  // ——— Problème type examen : étude d'une fonction ———
  { id: 'pb-a1', chapter: 'logarithme', group: 'Problème A — f(x) = x − 1 − ln x', difficulty: 2, type: 'mcq', correct: 2,
    prompt: r`On considère $f(x)=x-1-\ln x$ sur $]0,+\infty[$. Que vaut $\displaystyle\lim_{x\to0^+}f(x)$ ?`,
    options: [r`$-\infty$`, r`$-1$`, r`$+\infty$`, r`$0$`],
    steps: [r`$\lim_{x\to0^+}\ln x=-\infty$, donc $-\ln x\to+\infty$.`, r`$x-1\to-1$, donc $f(x)\to+\infty$.`] },
  { id: 'pb-a2', chapter: 'logarithme', group: 'Problème A — f(x) = x − 1 − ln x', difficulty: 2, type: 'num', answer: 1, tolerance: 1e-6, hint: 'f′(x) = 1 − 1/x.',
    prompt: r`Toujours avec $f(x)=x-1-\ln x$ : en quelle valeur $x$ la dérivée $f'$ s'annule-t-elle ?`,
    steps: [r`$f'(x)=1-\dfrac1x=\dfrac{x-1}{x}$.`, r`$f'(x)=0\iff x=1$ ; $f'<0$ sur $]0,1[$ et $f'>0$ sur $]1,+\infty[$.`] },
  { id: 'pb-a3', chapter: 'logarithme', group: 'Problème A — f(x) = x − 1 − ln x', difficulty: 2, type: 'num', answer: 0, tolerance: 1e-6, hint: 'Calculez f au point trouvé.',
    prompt: r`Quelle est la valeur minimale de $f$ sur $]0,+\infty[$ ?`,
    steps: [r`$f$ décroît puis croît : son minimum est atteint en $x=1$.`, r`$f(1)=1-1-\ln1=0$.`] },
  { id: 'pb-a4', chapter: 'logarithme', group: 'Problème A — f(x) = x − 1 − ln x', difficulty: 3, type: 'mcq', correct: 1,
    prompt: r`Quelle inégalité peut-on en déduire pour tout $x>0$ ?`,
    options: [r`$\ln x\ge x-1$`, r`$\ln x\le x-1$`, r`$\ln x\le 1-x$`, r`$\ln x\ge 1-x$`],
    steps: [r`Le minimum de $f$ vaut $0$, donc $f(x)\ge0$ pour tout $x>0$.`, r`$x-1-\ln x\ge0\iff\ln x\le x-1$ : la courbe de $\ln$ est sous sa tangente en $1$.`] },

  // ——— Problème type examen : suite récurrente ———
  { id: 'pb-b1', chapter: 'suites', group: 'Problème B — uₙ₊₁ = √(2 + uₙ)', difficulty: 1, type: 'num', answer: Math.SQRT2, tolerance: 0.005, hint: 'Remplacez n par 0.',
    prompt: r`On pose $u_0=0$ et $u_{n+1}=\sqrt{2+u_n}$. Calculer $u_1$ (arrondi à $0{,}01$).`,
    steps: [r`$u_1=\sqrt{2+0}=\sqrt2\approx1{,}41$.`] },
  { id: 'pb-b2', chapter: 'suites', group: 'Problème B — uₙ₊₁ = √(2 + uₙ)', difficulty: 2, type: 'mcq', correct: 0,
    prompt: r`On montre par récurrence que $0\le u_n<2$ et que $(u_n)$ est :`,
    options: ['croissante', 'décroissante', 'constante', 'ni croissante ni décroissante'],
    steps: [r`$u_{n+1}^2-u_n^2=2+u_n-u_n^2=(2-u_n)(1+u_n)>0$ car $0\le u_n<2$.`, r`Comme les termes sont positifs, $u_{n+1}>u_n$ : la suite est croissante.`] },
  { id: 'pb-b3', chapter: 'suites', group: 'Problème B — uₙ₊₁ = √(2 + uₙ)', difficulty: 3, type: 'num', answer: 2, tolerance: 1e-6, hint: 'ℓ = √(2 + ℓ) avec ℓ ≥ 0.',
    prompt: r`$(u_n)$ est croissante et majorée, donc converge vers $\ell$. Déterminer $\ell$.`,
    steps: [r`Par continuité, $\ell=\sqrt{2+\ell}$, donc $\ell^2-\ell-2=0$, soit $(\ell-2)(\ell+1)=0$.`, r`Comme $\ell\ge0$, $\ell=2$.`] },
];

export const exercisesFor = (chapter: string) => exercises.filter((e) => e.chapter === chapter);
