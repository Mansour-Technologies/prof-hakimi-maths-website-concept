/**
 * Centralised identity & configuration (showcase scope).
 * Verified on 2026-11-26/27 from the teacher's public Instagram profile
 * (@prof_hakimi_maths — bio read from the public page, no login) and his
 * official YouTube channel (@prof_hakimi_maths).
 */
export const identity = {
  brand: 'Prof Hakimi maths',
  tag: 'PROF HAKIMI', // as lettered on his own thumbnails and concours sheets
  fullName: 'Hicham Hakimi',
  handle: '@prof_hakimi_maths',
  roles: ['Professeur de mathématiques', 'Chercheur en mathématiques'],
  city: 'Meknès',
  centre: { name: 'Hepta Center Meknès', handle: '@hepta_center_mkns', url: 'https://www.instagram.com/hepta_center_mkns/' },
} as const;

/** His Instagram bio, line by line, with the coloured markers he uses (🔴 🟠 🟢 ⚪ 📍). */
export const bio = [
  { mark: 'red', text: 'و أنت في طريقك للبحث عن حياة لا تنسى أن تعيش', lang: 'ar' },
  { mark: 'orange', text: 'Professeur de mathématiques', lang: 'fr' },
  { mark: 'green', text: 'Chercheur en mathématiques', lang: 'fr' },
  { mark: 'white', text: 'Centre @hepta_center_mkns', lang: 'fr' },
  { mark: 'pin', text: 'Meknès', lang: 'fr' },
] as const;

/**
 * Official channels. Only verified URLs.
 * WhatsApp number to be inserted on the teacher's approval: keep `null`
 * until then — the WhatsApp button is not rendered while null.
 */
export const contact = {
  instagramDM: 'https://ig.me/m/prof_hakimi_maths',
  instagram: 'https://www.instagram.com/prof_hakimi_maths/',
  youtube: 'https://www.youtube.com/@prof_hakimi_maths',
  threads: 'https://www.threads.com/@prof_hakimi_maths',
  whatsapp: null as string | null, // e.g. 'https://wa.me/212XXXXXXXXX' — on approval only
  email: null as string | null, // none publicly listed
  studio: 'https://mansourtechnologies.com/',
};

/** Our proposed French rendering of his Arabic bio line (labelled as such on the page). */
export const bioFr = 'Et sur ton chemin, à chercher une vie, n’oublie pas de vivre.';

/**
 * His current Instagram series (public reel pages, read without login on 2026-11-27).
 * Titles/hashtags are his; dates are the publication dates shown by Instagram.
 */
export const igSeries = [
  { name: 'Maths For Fun', sub: '« Apprendre les maths… c’est fun ! »', tag: '#maths_for_fun', reels: [{ code: 'Df2h6RuRg2N', date: '17 nov. 2026' }, { code: 'Df4lCAVxq_8', date: '18 nov. 2026' }] },
  { name: 'فلسفة الرياضيات', sub: 'مفارقة اللانهاية — الجزء 1 · 2', tag: '#فلسفة_الرياضيات', ar: true, reels: [{ code: 'DfxtSYex5oY', date: '15 nov. 2026' }, { code: 'Dfz4hFQx-wY', date: '16 nov. 2026' }] },
  { name: 'BAC 2027', sub: 'avec Prof Hakimi · Hepta Center Meknès', tag: '#bac_2027', reels: [{ code: 'DfxkQTrxNXH', date: '15 nov. 2026' }, { code: 'Df0Nfy4RRhQ', date: '16 nov. 2026' }, { code: 'Df-T4-7Rpd7', date: '20 nov. 2026' }] },
  { name: 'Préparation des concours', sub: 'avec Prof Hakimi — Médecine', tag: '#preparations_des_concours2026', reels: [{ code: 'DZdIKUtM3Bn', date: '11 juin 2026' }] },
] as const;
export const reel = (code: string) => `https://www.instagram.com/reel/${code}/`;

export const nav = [
  { href: '#professeur', label: 'Le prof' },
  { href: '#series', label: 'Ses séries' },
  { href: '#programme', label: 'Programme' },
  { href: '#approche', label: 'Sa méthode' },
  { href: '#etudier', label: 'Étudier' },
  { href: '#contact', label: 'Contact' },
] as const;

export const notice = 'Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.';
