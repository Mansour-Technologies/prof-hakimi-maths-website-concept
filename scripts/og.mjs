// Renders public/og.png (1200×630) from an original SVG/HTML composition. Run: node scripts/og.mjs
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const font = (p) => readFileSync(new URL('../node_modules/' + p, import.meta.url)).toString('base64');
const fr = font('@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2');
const fri = font('@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2');
const plex = font('@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2');
const U = 85, OX = 930, OY = 330;
let d = '';
for (let i = 0; i <= 300; i++) { const x = -5 + 9 * i / 300; const y = x ** 3 / 4 - x; if (Math.abs(y) > 4) continue; d += `${d ? 'L' : 'M'}${(OX + x * U).toFixed(1)} ${(OY - y * U).toFixed(1)}`; }
const x0 = 1.5, y0 = x0 ** 3 / 4 - x0, m = 3 * x0 * x0 / 4 - 1;
const html = `<html><head><style>
@font-face{font-family:F;src:url(data:font/woff2;base64,${fr})}
@font-face{font-family:FI;font-style:italic;src:url(data:font/woff2;base64,${fri})}
@font-face{font-family:P;src:url(data:font/woff2;base64,${plex})}
body{margin:0;width:1200px;height:630px;background:#111915;color:#eceee6;font-family:P;overflow:hidden;position:relative}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(236,238,230,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(236,238,230,.06) 1px,transparent 1px);background-size:47.5px 47.5px}
svg{position:absolute;inset:0}
.t{position:absolute;left:72px;top:70px}
.k{font-size:20px;letter-spacing:.12em;text-transform:uppercase;color:#b3bdb4;font-weight:600}
.k i{display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:7px}
h1{font-family:F;font-weight:400;font-size:132px;line-height:.9;margin:34px 0 0;letter-spacing:-.03em}
h1 em{font-family:FI;font-style:italic;color:#f3d46b;display:block;padding-left:56px}
p{font-size:27px;color:#eceee6;margin:34px 0 0;max-width:600px;line-height:1.35}
.b{position:absolute;left:72px;bottom:50px;font-size:19px;color:#f3d46b;border:1.5px dashed #e2801c;padding:8px 16px;letter-spacing:.04em}
</style></head><body><div class="grid"></div>
<svg width="1200" height="630"><path d="M0 ${OY}H1200M${OX} 0V630" stroke="rgba(236,238,230,.35)" stroke-width="2"/>
<path d="${d}" fill="none" stroke="#eceee6" stroke-width="5" stroke-linecap="round"/>
<line x1="${OX + (x0 - 2.4) * U}" y1="${OY - (y0 - m * 2.4) * U}" x2="${OX + (x0 + 2.4) * U}" y2="${OY - (y0 + m * 2.4) * U}" stroke="#f3d46b" stroke-width="4"/>
<circle cx="${OX + x0 * U}" cy="${OY - y0 * U}" r="13" fill="#ff7657" stroke="#111915" stroke-width="5"/></svg>
<div class="t"><div class="k"><i style="background:#c42f17"></i><i style="background:#e2801c"></i><i style="background:#17784d"></i><i style="background:#eceee6"></i> Prof Hakimi maths</div>
<h1>Hicham<em>Hakimi</em></h1><p>Mathématiques 2ᵉ BAC — chapitres, vidéos, labo de fonctions, examen national.</p></div>
<div class="b">CONCEPT DE SITE — DÉMONSTRATION NON OFFICIELLE</div></body></html>`;
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1200, height: 630 } });
await pg.setContent(html);
await pg.waitForTimeout(300);
await pg.screenshot({ path: fileURLToPath(new URL('../public/og.png', import.meta.url)) });
await b.close();
console.log('og.png written');
