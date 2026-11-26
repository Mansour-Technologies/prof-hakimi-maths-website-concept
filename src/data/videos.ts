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


export const byId = (id: string) => {
  const v = videos.find((x) => x.id === id);
  if (!v) throw new Error('unknown video ' + id);
  return v;
};

/**
 * Posters: which YouTube-served frame is used as the poster of each video
 * (chosen in the private asset dossier). Hotlinked from i.ytimg.com only.
 */
export const poster = (id: string, frame: 'maxresdefault' | 'hqdefault' | 'hq1' | 'hq2' | 'hq3' | 'sddefault' = 'maxresdefault') =>
  `https://i.ytimg.com/vi/${id}/${frame}.jpg`;

/** His recurring series, named as he names them in his own video titles. */
export interface Series {
  key: string;
  name: string; // as written in his titles
  ar?: string;
  note: string; // neutral description (ours)
  ids: string[];
  /** short episode labels (taken from his titles), same order as ids */
  labels: string[];
  cover: { id: string; frame: 'maxresdefault' | 'hq1' | 'hq2' | 'hq3' };
  tone: 'red' | 'orange' | 'green' | 'blue' | 'ink';
}
export const series: Series[] = [
  { key: 'live', name: 'Séance 1 Live · Séance 2 Live', ar: 'الأعداد العقدية', note: 'Le cours complet des nombres complexes, en direct, feutre en main sur ses feuilles encadrées de bleu.', ids: ['yg6YlI4Rz9c', '0ZsTC-TzwnM', '041v4emryEM'], labels: ['Séance 1 Live — partie 1', 'Séance 2 Live — partie 2', 'بداية درس les nombres complexes'], cover: { id: 'yg6YlI4Rz9c', frame: 'hq1' }, tone: 'orange' },
  { key: 'concours', name: 'Préparation des concours avec Prof HAKIMI', ar: 'Astuce 1 → 5', note: 'Une astuce par Short, sur de vrais sujets : Concours Médecine 2024, Concours ENCG 2022.', ids: ['swRaqQrNO5M', 'hM-zI4OrSjE', 'JVJ_eNszmE4', 'qo4CJma7zKc', 'R5xx-_fV3Tk'], labels: ['Astuce 1', 'Astuce 2', 'Astuce 3', 'Astuce 4', 'Astuce 5'], cover: { id: 'swRaqQrNO5M', frame: 'maxresdefault' }, tone: 'blue' },
  { key: 'bac', name: 'نصائح لاجتياز الباكالوريا', ar: 'النصيحة 1 · 2 · الامتحان الوطني', note: 'Conseils pour le BAC, jusqu’à 46 minutes d’orientations avant le national.', ids: ['DRtFE7U26-w', 'vJwzbuJX9U0', 'TkdAAgdzUgg', 'ijlRHeyIJRE'], labels: ['نصائح وتوجيهات خاصة بالامتحان الوطني', 'النصيحة 1', 'النصيحة 2', 'رسالة لصحاب الباك 2026'], cover: { id: 'DRtFE7U26-w', frame: 'maxresdefault' }, tone: 'red' },
  { key: 'moufid', name: 'Corrections — كتاب المفيد', ar: 'علوم تجريبية', note: 'Exercices du manuel Al Moufid corrigés au tableau, et un examen corrigé (continuité, TVI, réciproque).', ids: ['927ZIYtI7AM', 'GuVEiEvAZTo', 'wM88JcxD2ao', 'HdspPTxsy-A'], labels: ['Exercice 32 — dérivabilité de la réciproque', 'Dérivabilité de la réciproque, partie 2', 'Correction d’un examen — continuité, TVI', 'اشتقاق الدالة العكسية'], cover: { id: 'HdspPTxsy-A', frame: 'maxresdefault' }, tone: 'green' },
  { key: 'najihin', name: '#ناجحين · #Naje7ine', ar: 'بودكاست', note: 'Le podcast du mental : réussir, persévérer, vivre le moment.', ids: ['CAEKCVVox08', 'dvxvJ5lgaVQ', 'X4LGV-d23lA'], labels: ['خدم فقط ثلاث شهور وحقق الحلم ديالو', 'واخا تكون معطل متفقدش الأمل', 'عيش اللحظة كيف ما كانت'], cover: { id: 'CAEKCVVox08', frame: 'maxresdefault' }, tone: 'ink' },
  { key: 'culture', name: 'Culture mathématique', ar: 'Galois · Nombre phénix · Philosophie', note: 'Les maths qui donnent envie : un génie mort à 21 ans, 142857, invention ou découverte ?', ids: ['L93mPstfJBA', 'Z_k0jHQ9HVY', 'POAnIwQIw58'], labels: ['Évariste Galois', 'Nombre phénix', 'الرياضيات بين الاختراع والاكتشاف'], cover: { id: 'Z_k0jHQ9HVY', frame: 'maxresdefault' }, tone: 'red' },
];
