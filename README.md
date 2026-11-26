# Prof Hakimi maths — concept de site vitrine (démonstration non officielle)

> **Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.**
> Unsolicited design proposal. Not the official website of Prof Hakimi maths; not commissioned, endorsed or affiliated. No data is collected, no cookies are set by this site.

Live demo: https://mansour-technologies.github.io/prof-hakimi-maths-website-concept/

## Overview
A premium single-page showcase ("site vitrine") for the Moroccan mathematics teacher behind the public channels **@prof_hakimi_maths** (Instagram / YouTube / Threads).

Sections: hero (name, handle, subject, levels, animated curve and tangent) · Le professeur · Approche pédagogique · Programme (levels + chapters he has publicly covered) · Au tableau (a few official videos) · Étudier avec lui (3 steps) · Contact (verified channels).

Design direction « Tableau & Tangente »: chalkboard + whiteboard surfaces, Fraunces / IBM Plex Sans / Amiri (Arabic) / Caveat, KaTeX notation rendered at build time, mathematically exact SVG figures, colour code from the 🔴🟠🟢⚪ markers of his public bio.

## Stack
Astro 7 (static, one page + 404) · TypeScript · CSS custom properties · KaTeX (self-hosted, build-time) · Fontsource (self-hosted fonts) · Playwright. Client JS: menu sheet, scroll reveal, section spy, YouTube click-to-load facade, hero tangent animation (reduced-motion aware). No localStorage.

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
- Videos: official public YouTube videos of the teacher, embedded via youtube-nocookie only after a click; thumbnails served by `i.ytimg.com`. Nothing rehosted.
- Photographs: none. The hero portrait is a labelled placeholder ("Photo officielle — à fournir / sur validation").
- Copy, figures, hero animation, OG image: original work for this concept. Facts are limited to what his public profiles show (checked on 2026-11-26).
- Fonts: Fraunces, IBM Plex Sans, IBM Plex Sans Arabic, Amiri, Caveat (SIL OFL, via Fontsource). KaTeX (MIT).

### To replace on approval
1. `src/components/PortraitSlot.astro` → authorised official portrait.
2. `public/og.png` → may include that portrait.
3. `contact.whatsapp` (and email if he wishes) in `src/data/site.ts`.
4. Career details and qualifications, to be supplied by the teacher.

## Known limitations
- Levels other than 2ᵉ BAC Sciences expérimentales and concours preparation are not shown because they are not publicly stated.
- Registration terms, prices and schedules are not published by the teacher, so none are shown.

## Rights
All rights reserved — Mansour Technologies. No open-source licence is granted.
Concept digital proposé par Mansour Technologies — https://mansourtechnologies.com/
