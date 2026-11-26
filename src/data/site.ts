/**
 * Centralised identity & configuration (showcase scope).
 * Verified on 2026-11-26 from the teacher's public Instagram profile
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

export const nav = [
  { href: '#professeur', label: 'Le prof' },
  { href: '#series', label: 'Ses séries' },
  { href: '#programme', label: 'Programme' },
  { href: '#approche', label: 'Sa méthode' },
  { href: '#etudier', label: 'Étudier' },
  { href: '#contact', label: 'Contact' },
] as const;

export const notice = 'Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.';
