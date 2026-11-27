// Renders public/og.png (1200×630) — original typographic composition, no photo. Run: node scripts/og.mjs
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const font = (p) => readFileSync(new URL('../node_modules/' + p, import.meta.url)).toString('base64');
const sairaI = font('@fontsource-variable/saira/files/saira-latin-standard-italic.woff2');
const news = font('@fontsource-variable/newsreader/files/newsreader-latin-standard-italic.woff2');
const hand = font('@fontsource/covered-by-your-grace/files/covered-by-your-grace-latin-400-normal.woff2');
const naskh = font('@fontsource-variable/noto-naskh-arabic/files/noto-naskh-arabic-arabic-wght-normal.woff2');
const html = `<html><head><style>
@font-face{font-family:S;font-style:italic;font-weight:100 900;font-stretch:50% 125%;src:url(data:font/woff2;base64,${sairaI})}
@font-face{font-family:N;font-style:italic;font-weight:200 800;src:url(data:font/woff2;base64,${news})}
@font-face{font-family:H;src:url(data:font/woff2;base64,${hand})}
@font-face{font-family:A;font-weight:400 700;src:url(data:font/woff2;base64,${naskh})}
body{margin:0;width:1200px;height:630px;overflow:hidden;position:relative;color:#f5ede4;
 background:radial-gradient(55% 75% at 82% 35%,rgba(239,125,69,.55),transparent 70%),repeating-linear-gradient(90deg,rgba(255,190,140,.05) 0 2px,transparent 2px 40px),linear-gradient(#1c1411,#130d0b)}
.h{position:absolute;left:76px;top:70px;font:64px H;color:#cbb8a8;transform:rotate(-5deg)}
.p{position:absolute;left:82px;top:168px;font:italic 500 30px S;letter-spacing:.42em;color:#cbb8a8}
.n{position:absolute;left:70px;top:208px;font:italic 780 168px/1 S;font-stretch:116%;text-transform:uppercase;z-index:1}
.b{position:absolute;left:62px;top:356px;width:720px;height:26px}
.ar{position:absolute;left:80px;top:420px;width:640px;text-align:right;direction:rtl;font:600 34px A}
.fr{position:absolute;left:80px;top:478px;font:italic 400 26px N;color:#cbb8a8}
svg.c{position:absolute;right:70px;top:80px}
.c2{position:absolute;right:60px;bottom:44px;font:italic 600 18px S;letter-spacing:.12em;color:#130d0b;background:#ef7d45;padding:9px 18px;border-radius:999px}
.m{position:absolute;right:66px;top:430px;font:28px H;color:#5cc08f;text-align:right}
</style></head><body>
<div class="h">Hicham</div><div class="p">PROF</div><div class="n">Hakimi</div>
<svg class="b" viewBox="0 0 600 46" preserveAspectRatio="none"><path d="M8 30 C 150 14, 360 8, 592 20" stroke="#f4c64e" stroke-width="22" fill="none" stroke-linecap="round"/></svg>
<div class="ar">و أنت في طريقك للبحث عن حياة لا تنسى أن تعيش</div>
<div class="fr">Mathématiques · 2ᵉ BAC PC · concours — Meknès</div>
<svg class="c" width="330" height="260" viewBox="0 0 640 360"><path d="M30 320 H620 M60 340 V20" stroke="rgba(245,237,228,.25)" fill="none"/><path d="M60 300 C 180 292, 250 250, 320 190 S 470 50, 610 34" stroke="rgba(245,237,228,.7)" stroke-width="3" fill="none"/><path d="M150 318 L 520 70" stroke="#ef7d45" stroke-width="3"/><circle cx="320" cy="190" r="8" fill="#f4c64e"/></svg>
<div class="m">Chapitre :<br>Le professeur</div>
<div class="c2">CONCEPT DE SITE — DÉMONSTRATION NON OFFICIELLE</div>
</body></html>`;
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1200, height: 630 } });
await pg.setContent(html);
await pg.waitForTimeout(600);
await pg.screenshot({ path: fileURLToPath(new URL('../public/og.png', import.meta.url)) });
await b.close();
console.log('og.png written');
