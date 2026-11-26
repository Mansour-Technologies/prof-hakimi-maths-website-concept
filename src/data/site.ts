/**
 * Centralised identity & configuration.
 * Every factual field below was verified on 2026-11-26 from the teacher's
 * public Instagram profile and official YouTube channel. Anything that is
 * not verified is explicitly flagged as demo content in the UI.
 */
export const identity = {
  brand: 'Prof Hakimi maths',
  shortBrand: 'Prof Hakimi',
  fullName: 'Hicham Hakimi',
  roles: ['Professeur de mathématiques', 'Chercheur en mathématiques'], // Instagram bio
  handle: '@prof_hakimi_maths',
  levels: {
    verified: ['2ᵉ année Bac — Sciences expérimentales (PC)', 'Préparation aux concours post-bac'],
  },
  languages: 'Cours en français et en arabe (darija)',
  youtubeSince: 'novembre 2025',
} as const;

export const links = {
  instagram: 'https://www.instagram.com/prof_hakimi_maths/',
  youtube: 'https://www.youtube.com/@prof_hakimi_maths',
  threads: 'https://www.threads.com/@prof_hakimi_maths',
  studio: 'https://mansourtechnologies.com/',
} as const;

export const nav = [
  { href: '', label: 'Accueil', short: 'Accueil' },
  { href: 'cours/', label: 'Chapitres', short: 'Cours' },
  { href: 'videos/', label: 'Vidéothèque', short: 'Vidéos' },
  { href: 'labo/', label: 'Labo des fonctions', short: 'Labo' },
  { href: 'examen/', label: 'Examen national', short: 'Examen' },
  { href: 'mon-espace/', label: 'Mon espace', short: 'Espace' },
] as const;

export const notice = 'Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.';

/** Assets that must be replaced once the teacher grants permission. */
export const replaceOnApproval = [
  'Portrait principal (accueil) — emplacement « portrait-slot » : photo officielle de Hicham Hakimi au tableau.',
  'Image Open Graph (public/og.png) — pourrait intégrer sa photo une fois autorisée.',
];
