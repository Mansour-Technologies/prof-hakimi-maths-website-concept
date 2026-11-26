# Prof Hakimi maths — concept de site (démonstration non officielle)

> **Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.**
> This repository is an unsolicited design proposal. It is **not** the official website of Prof Hakimi maths, is not commissioned, endorsed or affiliated, and collects no data.

Live demo: https://mansour-technologies.github.io/prof-hakimi-maths-website-concept/

## Overview
A premium mathematics education hub concept for the Moroccan teacher behind the public channels **@prof_hakimi_maths** (Instagram / YouTube): 2ᵉ BAC Sciences expérimentales lessons organised by chapter, his official YouTube videos, an interactive function lab, BAC-style practice and a local demo dashboard.

Design direction « Tableau & Tangente »: chalkboard + whiteboard pages, Fraunces / IBM Plex Sans / Amiri (Arabic) / Caveat, KaTeX math, colour code taken from the 🔴🟠🟢⚪ markers of his public bio.

## Features
- Personalised hero with an exact, animated tangent to f(x) = x³/4 − x (SVG + tiny script, respects reduced motion).
- Chapters (11, programme 2ᵉ BAC SE): search (accent-insensitive), semester / status filters, chapter pages with original summaries, KaTeX formulas rendered at build time, checklists, demo progress, bookmarks.
- Vidéothèque: the 36 public videos of the official channel (IDs verified via YouTube oEmbed on 2026-11-26), grouped by chapter/theme, click-to-load `youtube-nocookie.com` facades, no autoplay.
- Labo des fonctions: Canvas plotter with 5 families (exact symbolic f′) + free expression (custom recursive-descent parser — no `eval`), sliders a, b, c, d, draggable / tappable point, pan, pinch & wheel zoom, live f′ curve, tangent equation in KaTeX, numerical check of the derivative, reset.
- Centre examen: 43 original exercises (numeric with tolerance / MCQ) with worked corrections, chapter + difficulty filters, guided exam-style problems, timed mode, revision checklist, session summary.
- Mon espace: progress per chapter, results, bookmarks, goals, session history, recommended next lesson, reset — `localStorage` only, validated against corrupted data.
- Mobile-first details: bottom tab bar + accessible menu sheet (focus trap, Escape, focus return), sticky lab canvas on phones, 48px touch targets.

## Stack
Astro 7 (static) · TypeScript · CSS custom properties · KaTeX (self-hosted) · Fontsource (self-hosted fonts) · Playwright.

## Develop
```bash
npm ci
npm run dev        # http://localhost:4321/prof-hakimi-maths-website-concept/
npm run build      # astro check + static build to dist/
npm test           # Playwright (starts astro preview on :4391)
npm run test:live  # same suite against the GitHub Pages URL
node scripts/og.mjs  # re-render public/og.png
```

## Deploy
Push to `main` → `.github/workflows/deploy.yml` builds with Node 22 and publishes `dist/` to GitHub Pages.

## Content & asset attribution
- **Videos**: embedded from the teacher's official public YouTube channel through the YouTube player (youtube-nocookie). Thumbnails are loaded from `i.ytimg.com`; nothing is rehosted.
- **Photographs**: none used. A clearly labelled portrait placeholder awaits an authorised photo.
- **Exercises, summaries, figures, hero animation, OG image**: original work for this concept (demonstration content, not official exam subjects).
- **Fonts**: Fraunces, IBM Plex Sans, IBM Plex Sans Arabic, Amiri, Caveat — SIL Open Font License, via Fontsource. **KaTeX** — MIT.

### To replace on approval
1. `src/components/PortraitSlot.astro` (home hero) → official portrait of the teacher.
2. `public/og.png` → may include the authorised portrait.
3. Contact / registration links → only once the teacher provides official channels for them.

## Known limitations
- Progress is stored per browser (no accounts, no sync) — a real product needs a backend.
- Chapters without a public video show an honest "à venir" state.
- Levels other than 2ᵉ BAC SE were not verified publicly and are therefore not shown.

## Rights
All rights reserved — Mansour Technologies. No open-source licence is granted.
Concept digital proposé par Mansour Technologies — https://mansourtechnologies.com/
