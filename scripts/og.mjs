// Renders public/og.png (1200×630) — original typographic composition, no photo. Run: node scripts/og.mjs
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const font = (p) => readFileSync(new URL('../node_modules/' + p, import.meta.url)).toString('base64');
const arch = font('@fontsource-variable/archivo/files/archivo-latin-standard-italic.woff2');
const archN = font('@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2');
const cav = font('@fontsource-variable/caveat/files/caveat-latin-wght-normal.woff2');
const cairo = font('@fontsource-variable/cairo/files/cairo-arabic-wght-normal.woff2');
const html = `<html><head><style>
@font-face{font-family:AI;font-style:italic;font-weight:100 900;font-stretch:62% 125%;src:url(data:font/woff2;base64,${arch})}
@font-face{font-family:A;font-weight:100 900;font-stretch:62% 125%;src:url(data:font/woff2;base64,${archN})}
@font-face{font-family:C;font-weight:400 700;src:url(data:font/woff2;base64,${cav})}
@font-face{font-family:K;font-weight:200 1000;src:url(data:font/woff2;base64,${cairo})}
body{margin:0;width:1200px;height:630px;background:#f5f6f4;font-family:A;overflow:hidden;position:relative;border:14px solid #b7bcc1;box-sizing:border-box}
.h{position:absolute;left:70px;top:52px;font:700 92px C;color:#1d4fd0;transform:rotate(-5deg)}
.t{position:absolute;left:62px;top:160px;display:flex;flex-direction:column;align-items:flex-start;gap:10px}
.t b{font:italic 900 150px/0.9 AI;font-stretch:78%;background:#12151a;color:#fff;padding:6px 26px 10px 18px;transform:skewX(-8deg)}
.t b+b{margin-left:60px}
svg{position:absolute;left:70px;top:505px}
.r{position:absolute;right:60px;top:150px;width:420px;font-weight:700;font-size:23px;line-height:1.75;color:#12151a}
.r i{display:inline-block;width:16px;height:16px;border-radius:50%;margin-right:12px}
.ar{font-family:K;font-weight:800;font-size:25px;direction:rtl;text-align:right;margin-bottom:12px}
.c{position:absolute;right:56px;bottom:44px;font:italic 800 20px AI;letter-spacing:.04em;background:#c8282a;color:#fff;padding:8px 16px;transform:skewX(-8deg)}

</style></head><body>
<div class="h">Hicham</div>
<div class="t"><b>PROF</b><b>HAKIMI</b></div>
<svg width="640" height="30"><path d="M6 20 C 160 2, 380 0, 630 10" stroke="#3f7bff" stroke-width="10" fill="none" stroke-linecap="round"/></svg>
<div class="r"><div class="ar">و أنت في طريقك للبحث عن حياة لا تنسى أن تعيش <i style="background:#e0322e"></i></div>
<div><i style="background:#e8811c"></i>Professeur de mathématiques</div><div><i style="background:#23a35f"></i>Chercheur en mathématiques</div><div><i style="background:#fff;box-shadow:inset 0 0 0 2px #8d939a"></i>Meknès · 2ᵉ BAC PC · concours</div></div>
<div class="c">CONCEPT DE SITE — DÉMONSTRATION NON OFFICIELLE</div>
</body></html>`;
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1200, height: 630 } });
await pg.setContent(html);
await pg.waitForTimeout(500);
await pg.screenshot({ path: fileURLToPath(new URL('../public/og.png', import.meta.url)) });
await b.close();
console.log('og.png written');
