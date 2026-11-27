# Prof Hakimi maths — concept de site vitrine (démonstration non officielle)

> **Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.**
> Unsolicited design proposal. Not the official website of Prof Hakimi maths; not commissioned, endorsed or affiliated. No data is collected, no cookies are set by this site.

Live demo: https://mansour-technologies.github.io/prof-hakimi-maths-website-concept/

## Overview
A single-page showcase ("site vitrine") for **Hicham Hakimi — « Prof Hakimi »**, mathematics teacher and researcher in Meknès, as he presents himself on his public channels **@prof_hakimi_maths** (Instagram / YouTube / Threads).

Sections: hero (his face — the official poster of his Short « الرياضيات بين الاختراع والاكتشاف », dissolving into its own orange curtain light — his « Prof Hakimi » tag, his Instagram bio line with a proposed French translation) · Le prof (definition, verified facts, his bio as he writes it, a classroom lesson) · Ses séries (his YouTube series under his own names, plus his current Instagram series: Maths For Fun, فلسفة الرياضيات, BAC 2027, Préparation des concours) · Programme 2ᵉ BAC PC (his chapters as a table on his whiteboard, in his Hepta classroom) · Sa méthode (four observations from his public videos, with his motto « دير لي عليك ») · Étudier avec lui (three blue-framed sheets on his live-lesson desk) · Contact.

Design direction « Rideau & craie » (2026-11-27), built from his own world:

| Token | Hex | Source |
|---|---|---|
| night / umber / umber-2 | `#130d0b` `#1c1411` `#271b16` | the shadows around his studio curtain |
| ember / amber | `#ef7d45` `#f3a865` | the orange curtain light of his studio Shorts |
| chalk / chalk-2 / chalk-3 | `#f5ede4` `#cbb8a8` `#a8927f` | text (16:1, 9.6:1, 6.3:1 on night) |
| tag | `#f4c64e` | the yellow brush « Prof Hakimi » tag of his Instagram covers (one stroke at a time) |
| rose | `#c27f86` | his T-shirt in the hero frame (decor only) |
| marker green / red / blue | `#5cc08f` `#f0675a` `#8aa4f8` (on dark) · `#127a4b` `#c8282a` `#2146c7` (on the board) | his whiteboard code: « Chapitre : » green, titles red, body blue |
| classroom / desk | `#2b3a33` + `#6e5038` · `#5a3d29` | his Hepta classroom (green glass, wood panelling) and the desk of his live lessons |

Three typographic voices: **Saira** italic (his tag, wide and slanted, no black slabs) · **Covered By Your Grace** (his marker: « Chapitre : », numbering) · **Newsreader** + **Noto Naskh Arabic** (the researcher's editorial voice, French and Arabic). KaTeX for formulas at build time. Motion: the tag's brush stroke and a tangent to a curve are drawn once; quiet reveals; everything is off under `prefers-reduced-motion`.

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
- Video titles, his Instagram bio and his Instagram series names/hashtags are quoted as published and attributed (checked 2026-11-26/27). Instagram reels are plain links to his public reel pages (no embed, no image). French translations of Arabic lines are labelled « traduction proposée ». Short episode labels are taken from his titles.
- Copy, layout, OG image (typographic, no photo): original work for this concept.
- Fonts: Saira, Newsreader, Noto Naskh Arabic, Covered By Your Grace (SIL OFL, via Fontsource). KaTeX (MIT).

### Assets to replace on approval
| Placement | Current (official YouTube poster, hotlinked) | Recommended replacement (with his permission) |
|---|---|---|
| Hero portrait | `POAnIwQIw58` maxresdefault (warm amber close-up) | Original of his channel avatar (arms crossed, formula chalkboard) or the original frame of POAnIwQIw58 ≈0:00–0:27, high-res |
| Classroom band | `6XTA_EX9w2Y` maxresdefault | Frame ≈16:48 of 6XTA_EX9w2Y (hand raised, « Chapitre : Calcul Intégral ») or a classroom photo at Hepta Center |
| Series covers | yg6YlI4Rz9c hq1, swRaqQrNO5M, DRtFE7U26-w, HdspPTxsy-A, CAEKCVVox08, Z_k0jHQ9HVY | His own designed covers per series (e.g. his 2026 Instagram covers « BAC 2027 », « Maths For Fun », « فلسفة الرياضيات ») |
| Programme Shorts | 5tfLXLIbouY, M-kjMa0B8Uw, xxG1hjN4r1c | — (official posters can stay) |
| Instagram series | text links to his public reels | official Instagram embeds or his cover artwork, with permission |
| `public/og.png` | typographic | may include the authorised portrait |
| `contact.whatsapp` / email in `src/data/site.ts` | `null` | **WhatsApp number to be inserted on the teacher's approval** |
| « Parcours » line | « à compléter avec le professeur » | diplomas / years, supplied by him |

## Known limitations
- Levels other than 2ᵉ BAC Sciences expérimentales and concours preparation are not shown because they are not publicly stated.
- Registration terms, prices and schedules are not published by the teacher, so none are shown.
- Posters are third-party images served by YouTube (`i.ytimg.com`); Shorts covers are 9:16 frames inside a 1280×720 image, so the usable resolution is ≈405×720.
- No Instagram embeds or images: his reels are linked as text only (the public reel pages were read without login on 2026-11-27).
- No higher-resolution official frame exists on YouTube: the signed 1920×1080 thumbnail URLs return the same 1280×720 file. The hero stays ≈405×720 of real detail until he supplies an original.

## Rights
All rights reserved — Mansour Technologies. No open-source licence is granted.
Concept digital proposé par Mansour Technologies — https://mansourtechnologies.com/
