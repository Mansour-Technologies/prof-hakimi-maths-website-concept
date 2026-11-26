/**
 * Official public videos of the YouTube channel "Prof Hakimi maths"
 * (@prof_hakimi_maths, channel UC_AMHSgXdLp7fr-MyTr8m0g).
 * Every ID was verified on 2026-11-26 through
 * https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>
 * (author_name = "Prof Hakimi maths", playable & embeddable).
 * Titles are reproduced as published by the channel (only spacing between
 * the French and Arabic parts was normalised with an em dash).
 * Videos are embedded only through youtube-nocookie.com after a click.
 */
export type VideoKind = 'cours' | 'short';
export interface Video {
  id: string;
  title: string;
  kind: VideoKind;
  /** duration in seconds */
  seconds: number;
  /** publication date (YYYY-MM-DD) */
  date: string;
  /** chapter slug or thematic collection */
  topic: string;
}

export const videos: Video[] = [
  // — Long lessons & corrections —
  { id: 'yg6YlI4Rz9c', title: 'الجزء الأول من درس الأعداد العقدية les nombres complexes partie 1', kind: 'cours', seconds: 5034, date: '2026-02-13', topic: 'nombres-complexes' },
  { id: '0ZsTC-TzwnM', title: 'الجزء الثاني من درس الأعداد العقدية Les nombres complexes -partie 2', kind: 'cours', seconds: 3315, date: '2026-02-16', topic: 'nombres-complexes' },
  { id: '6XTA_EX9w2Y', title: 'الحساب التكاملي- الجزء1 Calcul intégral (partie 1)', kind: 'cours', seconds: 4031, date: '2026-03-09', topic: 'calcul-integral' },
  { id: 'wM88JcxD2ao', title: "Correction d'un examen sur le thème de continuité, TVI, fonction réciproque -2bac_pc", kind: 'cours', seconds: 1900, date: '2025-11-02', topic: 'limites-continuite' },
  { id: '927ZIYtI7AM', title: 'Dérivabilité de la fonction réciproque — تصحيح التمرين 32 من كتاب المفيد علوم تجريبية', kind: 'cours', seconds: 1201, date: '2025-11-02', topic: 'derivation' },
  { id: 'GuVEiEvAZTo', title: 'Dérivabilité de la fonction réciproque partie 2 — تصحيح تمرين من كتاب المفيد', kind: 'cours', seconds: 859, date: '2025-11-02', topic: 'derivation' },
  { id: 'DRtFE7U26-w', title: 'نصائح وتوجيهات خاصة بالامتحان الوطني', kind: 'cours', seconds: 2800, date: '2026-06-02', topic: 'methode-bac' },
  { id: 'zTMdwWdxIjM', title: 'طريقة النجاح والوصول للهدف الأكثر فعالية', kind: 'cours', seconds: 279, date: '2025-11-19', topic: 'etat-d-esprit' },

  // — Shorts: chapter capsules —
  { id: 'ZRcJpzyJT6c', title: 'Limite et continuité 1', kind: 'short', seconds: 78, date: '2026-09-14', topic: 'limites-continuite' },
  { id: '5tfLXLIbouY', title: 'Limites et continuité 2', kind: 'short', seconds: 109, date: '2026-09-14', topic: 'limites-continuite' },
  { id: 'K57PPKXKBHs', title: 'Limite et nombre dérivé', kind: 'short', seconds: 87, date: '2026-11-18', topic: 'derivation' },
  { id: 'HdspPTxsy-A', title: 'Dérivabilité de la fonction réciproque اشتقاق الدالة العكسية', kind: 'short', seconds: 81, date: '2025-11-02', topic: 'derivation' },
  { id: 'n8D5n4ufnp4', title: 'Axe de symétrie d’une courbe محور تماثل منحنى دالة', kind: 'short', seconds: 134, date: '2026-11-18', topic: 'etude-fonctions' },
  { id: 'xxG1hjN4r1c', title: 'Les suites numériques (suite majorée)', kind: 'short', seconds: 106, date: '2026-11-20', topic: 'suites' },
  { id: 'M-kjMa0B8Uw', title: 'La fonction ln', kind: 'short', seconds: 62, date: '2026-01-10', topic: 'logarithme' },
  { id: 'rcAxKxJhJPc', title: 'La fonction ln 2', kind: 'short', seconds: 63, date: '2026-01-10', topic: 'logarithme' },
  { id: 'T5EfmuU75hQ', title: 'La fonction ln 3', kind: 'short', seconds: 42, date: '2026-01-10', topic: 'logarithme' },
  { id: '041v4emryEM', title: 'بداية درس les nombres complexes', kind: 'short', seconds: 61, date: '2026-02-10', topic: 'nombres-complexes' },

  // — Shorts: concours —
  { id: 'swRaqQrNO5M', title: 'Préparation des concours avec prof HAKIMI -Astuce 1', kind: 'short', seconds: 89, date: '2026-06-08', topic: 'concours' },
  { id: 'hM-zI4OrSjE', title: 'Préparation des concours avec prof HAKIMI -Astuce 2', kind: 'short', seconds: 108, date: '2026-06-09', topic: 'concours' },
  { id: 'JVJ_eNszmE4', title: 'Préparation des concours avec Prof HAKIMI -Astuce 3', kind: 'short', seconds: 60, date: '2026-06-10', topic: 'concours' },
  { id: 'qo4CJma7zKc', title: 'Préparation des concours avec Prof HAKIMI -Astuce 4', kind: 'short', seconds: 72, date: '2026-06-10', topic: 'concours' },
  { id: 'R5xx-_fV3Tk', title: 'Préparation des concours avec prof HAKIMI -Astuce 5', kind: 'short', seconds: 98, date: '2026-06-11', topic: 'concours' },

  // — Shorts: BAC method —
  { id: 'vJwzbuJX9U0', title: 'نصائح لاجتياز الباكالوريا- النصيحة 1-', kind: 'short', seconds: 40, date: '2026-01-06', topic: 'methode-bac' },
  { id: 'TkdAAgdzUgg', title: 'نصائح لاجتياز الباكالوريا -النصيحة 2 -', kind: 'short', seconds: 40, date: '2026-01-09', topic: 'methode-bac' },
  { id: 'ijlRHeyIJRE', title: '#bac رسالة لصحاب الباك 2026', kind: 'short', seconds: 108, date: '2026-04-05', topic: 'methode-bac' },

  // — Shorts: culture mathématique —
  { id: 'L93mPstfJBA', title: 'Evariste Galois الرياضي لي عاش فقط 21 سنة #maths #نجاح #bac', kind: 'short', seconds: 126, date: '2025-11-29', topic: 'culture' },
  { id: 'Z_k0jHQ9HVY', title: 'Nombre phénix #maths', kind: 'short', seconds: 92, date: '2026-11-18', topic: 'culture' },
  { id: 'POAnIwQIw58', title: 'فلسفة الرياضيات: الرياضيات بين الاختراع والاكتشاف. ماذا تعتقد؟', kind: 'short', seconds: 106, date: '2026-11-08', topic: 'culture' },

  // — Shorts: état d'esprit —
  { id: 'J35NlXawhxc', title: 'دير لي عليك، رسالة تحفيزية لكل تلميذ مقبل على الامتحانات. Motivation pour nos élèves', kind: 'short', seconds: 91, date: '2025-11-02', topic: 'etat-d-esprit' },
  { id: 'BerQpYmVODY', title: 'أنت افضل شخص في العالم برحلتك الخاصة، فقط أعط نفسك حقها', kind: 'short', seconds: 155, date: '2026-01-02', topic: 'etat-d-esprit' },
  { id: 'Y9XlD9ge2NQ', title: 'سر التفوق والنجاح في الدراسة', kind: 'short', seconds: 90, date: '2026-02-14', topic: 'etat-d-esprit' },
  { id: 'CAEKCVVox08', title: 'خدم فقط ثلاث شهور وحقق الحلم ديالو. بودكاست #ناجحين', kind: 'short', seconds: 146, date: '2026-04-07', topic: 'etat-d-esprit' },
  { id: 'dvxvJ5lgaVQ', title: 'واخا تكون معطل متفقدش الأمل.. مزال وقتك غا يجي', kind: 'short', seconds: 109, date: '2026-04-11', topic: 'etat-d-esprit' },
  { id: 'X4LGV-d23lA', title: 'عيش اللحظة كيف ما كانت', kind: 'short', seconds: 49, date: '2026-04-16', topic: 'etat-d-esprit' },
];

export const fmtDuration = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = h ? String(m).padStart(2, '0') : String(m);
  return (h ? `${h}:` : '') + `${mm}:${String(sec).padStart(2, '0')}`;
};

