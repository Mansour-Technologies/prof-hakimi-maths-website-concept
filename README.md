# Prof Hakimi maths — concept de site vitrine (démonstration non officielle)

> **Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.**
> Unsolicited design proposal. Not the official website of Prof Hakimi maths; not commissioned, endorsed or affiliated. No data is collected, no cookies are set by this site.

Live demo: https://mansour-technologies.github.io/prof-hakimi-maths-website-concept/

## Overview
A single-page showcase ("site vitrine") for **Hicham Hakimi — « Prof Hakimi »**, mathematics teacher and researcher in Meknès, as he presents himself on his public channels **@prof_hakimi_maths** (Instagram / YouTube / Threads).

Sections: hero (his face — the official poster of his Short « الرياضيات بين الاختراع والاكتشاف » — his « PROF HAKIMI » tag, his Instagram bio line) · Le prof (his bio as he writes it, verified facts, a classroom lesson) · Ses séries (his own series names: Séance Live, Préparation des concours avec Prof HAKIMI, نصائح لاجتياز الباكالوريا, Corrections Al Moufid, #ناجحين, culture) · Programme 2ᵉ BAC PC (his chapters as a whiteboard table) · Sa méthode · Étudier avec lui · Contact.

Design direction « Feutre & Studio », built from his own material: aluminium whiteboard, his marker code (green « Chapitre : », red underlined titles, blue body), the blue-framed sheets of his live lessons, the heavy italic « PROF HAKIMI » tag of his thumbnails, the coloured studio lights of his Shorts, the 🔴🟠🟢⚪📍 markers of his bio. Type: Archivo (variable width, heavy italic), Caveat (marker), Cairo (Arabic), KaTeX (maths, build time).

## Stack
Astro 7 (static, one page + 404) · TypeScript · CSS custom properties · KaTeX (self-hosted, build-time) · Fontsource (self-hosted fonts) · Playwright. Client JS: menu sheet, scroll reveal, section spy, YouTube click-to-load facade. No localStorage.

## Develop
```bash
npm ci
npm run dev        # http://localhost:4321/prof-hakimi-maths-website-concept/
npm run build      # astro check + static build to dist/
npm test           # Playwright (astro preview on :4391), desktop 1440 + mobile 375
npm run test:live  # same suite against GitHub Pages
node scripts/og.mjs  # re-render public/og.png
```

## Deploy
Push to `main` → `.github/workflows/deploy.yml` (Node 22, `npm ci`, `npm run build`, upload `dist/`, deploy to Pages).

## Configuration
`src/data/site.ts` holds identity, navigation and contact URLs.
**WhatsApp number to be inserted on the teacher's approval**: `contact.whatsapp` is `null`, so no WhatsApp button is rendered and the Instagram DM (`https://ig.me/m/prof_hakimi_maths`) is the primary contact.

## Content & asset attribution
- **Photographs: none are hosted in this repository.** His face appears only through official YouTube posters: the image YouTube itself serves for a video (`https://i.ytimg.com/vi/<ID>/…jpg`, hotlinked) is the play button of that same official video (youtube-nocookie iframe, loaded on click, no autoplay), labelled « Lire la vidéo officielle : <titre> » with the credit « Image : vidéo officielle YouTube — Prof Hakimi maths ». If an image fails, a typographic panel replaces it.
- Video titles and his Instagram bio are quoted as published and attributed (checked 2026-11-26). Short episode labels are taken from his titles.
- Copy, layout, OG image (typographic, no photo): original work for this concept.
- Fonts: Archivo, Cairo, Caveat (SIL OFL, via Fontsource). KaTeX (MIT).

### Assets to replace on approval
| Placement | Current (official YouTube poster, hotlinked) | Recommended replacement (with his permission) |
|---|---|---|
| Hero portrait | `POAnIwQIw58` maxresdefault (warm amber close-up) | Original of his channel avatar (arms crossed, formula chalkboard) or the original frame of POAnIwQIw58 ≈0:00–0:27, high-res |
| Hero « au tableau » | `ZRcJpzyJT6c` maxresdefault | Photo at the whiteboard, white shirt (ZRcJpzyJT6c ≈0:20) |
| Classroom band | `6XTA_EX9w2Y` maxresdefault | Frame ≈16:48 of 6XTA_EX9w2Y (hand raised, « Chapitre : Calcul Intégral ») or a classroom photo at Hepta Center |
| Series covers | yg6YlI4Rz9c hq1, swRaqQrNO5M, DRtFE7U26-w, HdspPTxsy-A, CAEKCVVox08, Z_k0jHQ9HVY | His own designed covers per series |
| Programme Shorts | 5tfLXLIbouY, M-kjMa0B8Uw, n8D5n4ufnp4, K57PPKXKBHs | — (official embeds can stay) |
| `public/og.png` | typographic | may include the authorised portrait |
| `contact.whatsapp` / email in `src/data/site.ts` | `null` | **WhatsApp number to be inserted on the teacher's approval** |
| « Parcours » line | « à compléter avec le professeur » | diplomas / years, supplied by him |

## Known limitations
- Levels other than 2ᵉ BAC Sciences expérimentales and concours preparation are not shown because they are not publicly stated.
- Registration terms, prices and schedules are not published by the teacher, so none are shown.
- Posters are third-party images served by YouTube (`i.ytimg.com`); Shorts covers are 9:16 frames inside a 1280×720 image, so the usable resolution is ≈405×720.
- No Instagram post embeds: individual post URLs are not reachable without login.

## Rights
All rights reserved — Mansour Technologies. No open-source licence is granted.
Concept digital proposé par Mansour Technologies — https://mansourtechnologies.com/
