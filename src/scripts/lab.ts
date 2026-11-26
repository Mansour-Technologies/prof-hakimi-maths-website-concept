import katex from 'katex';
import { families, compile, derivative, familyTex, tangentTex, num, ParseError, type Params, type Fn } from '../lib/mathlab';

const root = document.querySelector<HTMLElement>('[data-lab]');
if (root) init(root);

function init(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>('[data-canvas]')!;
  const ctx = canvas.getContext('2d')!;
  const $ = <T extends HTMLElement>(s: string) => root.querySelector<T>(s)!;
  const texF = $('[data-tex-f]'), texDf = $('[data-tex-df]'), texTan = $('[data-tex-tan]');
  const vX0 = $('[data-v-x0]'), vF = $('[data-v-f]'), vDf = $('[data-v-df]'), note = $('[data-note]'), sr = $('[data-sr]');
  const x0Slider = $<HTMLInputElement>('[data-x0]'), x0Out = $('[data-out-x0]');
  const showDf = $<HTMLInputElement>('[data-show-df]'), showTan = $<HTMLInputElement>('[data-show-tan]');
  const freeBox = $('[data-free]'), exprIn = $<HTMLInputElement>('[data-expr]'), exprErr = $('[data-expr-err]');
  const sliders = Array.from(root.querySelectorAll<HTMLInputElement>('[data-slider]'));
  const render = (el: HTMLElement, src: string, display = false) => {
    try { katex.render(src, el, { throwOnError: false, displayMode: display }); } catch { el.textContent = src; }
  };

  // ——— state ———
  const DEFAULT_VIEW = { cx: 0, cy: 0, scale: 60 }; // px per unit (css px)
  let view = { ...DEFAULT_VIEW };
  let famId = 'poly';
  let params: Params = { ...families[0]!.defaults };
  let x0 = families[0]!.x0;
  let f: Fn = families[0]!.f(params);
  let df: Fn = families[0]!.df(params);
  let exact = true;
  let W = 0, H = 0, dpr = 1;

  const fam = () => families.find((x) => x.id === famId);

  function setFamily(id: string, keepParams = false) {
    famId = id;
    const F = fam();
    freeBox.hidden = id !== 'free';
    if (F) {
      if (!keepParams) { params = { ...F.defaults }; x0 = F.x0; }
      sliders.forEach((s) => {
        const k = s.dataset.slider as keyof Params;
        const row = s.closest<HTMLElement>('.param')!;
        row.hidden = !F.params.includes(k);
        // trig frequency b kept positive & non-zero for readability
        const [mn, mx] = id === 'trig' && k === 'b' ? [0.2, 3] : [-3, 3];
        s.min = String(mn); s.max = String(mx);
        s.value = String(params[k]);
      });
      exact = true;
      rebuild();
    } else {
      sliders.forEach((s) => (s.closest<HTMLElement>('.param')!.hidden = true));
      x0 = 1;
      compileExpr();
    }
    fitX0Range();
    draw();
  }

  function rebuild() {
    const F = fam()!;
    f = F.f(params); df = F.df(params);
    render(texF, `f(x)=${familyTex(famId, params)}`, false);
    render(texDf, F.texDf, false);
    sliders.forEach((s) => { const k = s.dataset.slider as keyof Params; root.querySelector(`[data-out="${k}"]`)!.textContent = num(params[k], 1).replace('{,}', ','); });
  }

  function compileExpr() {
    try {
      const g = compile(exprIn.value);
      f = g; df = (x) => derivative(g, x);
      exact = false;
      exprErr.textContent = '';
      exprIn.removeAttribute('aria-invalid');
      texF.innerHTML = '';
      const code = document.createElement('code');
      code.className = 'lab__code';
      code.textContent = `f(x) = ${exprIn.value.trim()}`;
      texF.append(code);
      render(texDf, "f'(x)\\ \\text{calculée numériquement}");
    } catch (e) {
      exprErr.textContent = e instanceof ParseError ? e.message : 'Expression invalide';
      exprIn.setAttribute('aria-invalid', 'true');
    }
  }

  // ——— coordinates ———
  const sx = (x: number) => W / 2 + (x - view.cx) * view.scale;
  const sy = (y: number) => H / 2 - (y - view.cy) * view.scale;
  const ux = (px: number) => view.cx + (px - W / 2) / view.scale;
  const uy = (py: number) => view.cy - (py - H / 2) / view.scale;

  function fitX0Range() {
    const a = ux(0), b = ux(W);
    x0Slider.min = (Math.floor(a * 10) / 10).toFixed(1);
    x0Slider.max = (Math.ceil(b * 10) / 10).toFixed(1);
    x0Slider.value = String(x0);
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    if (W < 520) view.scale = Math.min(view.scale, 44);
    fitX0Range();
    draw();
  }

  function niceStep() {
    const raw = 80 / view.scale;
    const p = 10 ** Math.floor(Math.log10(raw));
    const m = raw / p;
    return (m < 2 ? 1 : m < 5 ? 2 : 5) * p;
  }

  function plot(g: Fn, color: string, width: number, dash: number[] = []) {
    ctx.beginPath();
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.setLineDash(dash); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    let pen = false, lastY = 0;
    for (let px = 0; px <= W; px += 1) {
      const y = g(ux(px));
      const py = sy(y);
      if (!Number.isFinite(y) || Math.abs(py) > H * 6) { pen = false; continue; }
      if (pen && Math.abs(py - lastY) > H * 1.5) pen = false; // vertical asymptote jump
      pen ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      pen = true; lastY = py;
    }
    ctx.stroke(); ctx.setLineDash([]);
  }

  const css = getComputedStyle(document.documentElement);
  const C = {
    grid: 'rgba(236,238,230,0.06)', axis: 'rgba(236,238,230,0.45)', label: 'rgba(236,238,230,0.55)',
    f: css.getPropertyValue('--chalk').trim() || '#eceee6', df: css.getPropertyValue('--blue-hi').trim() || '#8fb8ff',
    tan: css.getPropertyValue('--chalk-yellow').trim() || '#f3d46b', pt: css.getPropertyValue('--red-hi').trim() || '#ff7657',
  };

  function draw() {
    if (!W) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const step = niceStep();
    ctx.lineWidth = 1; ctx.strokeStyle = C.grid; ctx.beginPath();
    for (let x = Math.ceil(ux(0) / step) * step; x <= ux(W); x += step) { ctx.moveTo(Math.round(sx(x)) + 0.5, 0); ctx.lineTo(Math.round(sx(x)) + 0.5, H); }
    for (let y = Math.ceil(uy(H) / step) * step; y <= uy(0); y += step) { ctx.moveTo(0, Math.round(sy(y)) + 0.5); ctx.lineTo(W, Math.round(sy(y)) + 0.5); }
    ctx.stroke();
    // axes
    const ax = Math.min(Math.max(sy(0), 0), H), ay = Math.min(Math.max(sx(0), 0), W);
    ctx.strokeStyle = C.axis; ctx.beginPath(); ctx.moveTo(0, ax); ctx.lineTo(W, ax); ctx.moveTo(ay, 0); ctx.lineTo(ay, H); ctx.stroke();
    ctx.fillStyle = C.label; ctx.font = '12px KaTeX_Main, serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    const fmt = (v: number) => (Math.abs(v) < 1e-9 ? '0' : String(Math.round(v * 1000) / 1000).replace('.', ',').replace('-', '−'));
    for (let x = Math.ceil(ux(0) / step) * step; x <= ux(W); x += step) if (Math.abs(x) > step / 2) ctx.fillText(fmt(x), sx(x), Math.min(ax + 5, H - 16));
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    for (let y = Math.ceil(uy(H) / step) * step; y <= uy(0); y += step) if (Math.abs(y) > step / 2) ctx.fillText(fmt(y), Math.max(ay - 6, 28), sy(y));

    if (showDf.checked) plot(df, C.df, 2, [7, 6]);
    plot(f, C.f, 3);

    const y0 = f(x0), m = df(x0);
    const ok = Number.isFinite(y0) && Number.isFinite(m);
    if (ok && showTan.checked) {
      ctx.strokeStyle = C.tan; ctx.lineWidth = 2.2; ctx.beginPath();
      ctx.moveTo(0, sy(y0 + m * (ux(0) - x0))); ctx.lineTo(W, sy(y0 + m * (ux(W) - x0))); ctx.stroke();
    }
    if (Number.isFinite(y0)) {
      ctx.setLineDash([4, 5]); ctx.strokeStyle = 'rgba(236,238,230,0.35)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(sx(x0), ax); ctx.lineTo(sx(x0), sy(y0)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = C.pt; ctx.strokeStyle = '#18231e'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(sx(x0), sy(y0), 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    // legend
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.font = 'italic 15px KaTeX_Math, serif';
    ctx.fillStyle = C.f; ctx.fillText('𝒞f', 12, 24);
    if (showDf.checked) { ctx.fillStyle = C.df; ctx.fillText("𝒞f′", 46, 24); }
    readout(y0, m, ok);
  }

  let srTimer = 0;
  function readout(y0: number, m: number, ok: boolean) {
    const p = y0 - m * x0;
    x0Out.textContent = num(x0, 2).replace('{,}', ',');
    vX0.textContent = num(x0, 3).replace('{,}', ',');
    vF.textContent = Number.isFinite(y0) ? num(y0, 3).replace('{,}', ',') : 'non définie';
    vDf.textContent = Number.isFinite(m) ? num(m, 3).replace('{,}', ',') : 'non définie';
    if (!ok) {
      render(texTan, '\\text{pas de tangente en ce point}');
      note.textContent = 'x₀ est hors du domaine de définition : déplacez le point.';
    } else {
      render(texTan, tangentTex(m, p));
      texTan.dataset.m = String(m); texTan.dataset.p = String(p);
      const sense = Math.abs(m) < 1e-9 ? 'tangente horizontale : extremum possible en x₀' : m > 0 ? 'f′(x₀) > 0 : f est croissante au voisinage de x₀' : 'f′(x₀) < 0 : f est décroissante au voisinage de x₀';
      let check = '';
      const F = fam();
      if (F && exact) {
        const err = Math.abs(derivative(f, x0) - m);
        check = ` · vérification numérique : écart ${err < 1e-6 ? '< 10⁻⁶' : err.toExponential(1)}`;
      }
      note.textContent = sense + check;
    }
    clearTimeout(srTimer);
    srTimer = window.setTimeout(() => {
      sr.textContent = ok ? `En x₀ = ${vX0.textContent}, f(x₀) = ${vF.textContent}, f′(x₀) = ${vDf.textContent}. Tangente : ${texTan.textContent?.replace(/\s+/g, ' ').slice(0, 60)}` : 'Point hors du domaine.';
    }, 700);
  }

  // ——— interactions ———
  sliders.forEach((s) => s.addEventListener('input', () => {
    params[s.dataset.slider as keyof Params] = Number(s.value);
    rebuild(); draw();
  }));
  x0Slider.addEventListener('input', () => { x0 = Number(x0Slider.value); draw(); });
  root.querySelectorAll<HTMLInputElement>('input[name="family"]').forEach((r) => r.addEventListener('change', () => r.checked && setFamily(r.value)));
  showDf.addEventListener('change', draw); showTan.addEventListener('change', draw);
  $('[data-expr-go]').addEventListener('click', () => { compileExpr(); draw(); });
  exprIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); compileExpr(); draw(); } });
  root.querySelectorAll<HTMLButtonElement>('[data-sample]').forEach((b) => b.addEventListener('click', () => { exprIn.value = b.dataset.sample!; compileExpr(); draw(); }));

  const zoom = (k: number, px = W / 2, py = H / 2) => {
    const bx = ux(px), by = uy(py);
    view.scale = Math.min(400, Math.max(8, view.scale * k));
    view.cx = bx - (px - W / 2) / view.scale; view.cy = by + (py - H / 2) / view.scale;
    fitX0Range(); draw();
  };
  root.querySelectorAll<HTMLButtonElement>('[data-zoom]').forEach((b) => b.addEventListener('click', () => zoom(b.dataset.zoom === 'in' ? 1.25 : 0.8)));
  $('[data-view-reset]').addEventListener('click', () => { view = { ...DEFAULT_VIEW }; if (W < 520) view.scale = 44; fitX0Range(); draw(); });
  $('[data-reset]').addEventListener('click', () => {
    view = { ...DEFAULT_VIEW }; if (W < 520) view.scale = 44;
    showDf.checked = true; showTan.checked = true;
    exprIn.value = 'x^3/4 - x'; exprErr.textContent = '';
    root.querySelector<HTMLInputElement>('input[name="family"][value="poly"]')!.checked = true;
    setFamily('poly');
    (window as any).phmToast?.('Labo réinitialisé');
  });
  canvas.addEventListener('wheel', (e) => { e.preventDefault(); const r = canvas.getBoundingClientRect(); zoom(e.deltaY < 0 ? 1.12 : 0.89, e.clientX - r.left, e.clientY - r.top); }, { passive: false });

  // pointer: drag point, pan, pinch
  const pts = new Map<number, { x: number; y: number }>();
  let mode: 'none' | 'point' | 'pan' | 'pinch' = 'none';
  let last = { x: 0, y: 0 }, pinchD = 0;
  const local = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  canvas.addEventListener('pointerdown', (e) => {
    canvas.setPointerCapture(e.pointerId);
    const p = local(e); pts.set(e.pointerId, p);
    if (pts.size === 2) { mode = 'pinch'; const [a, b] = [...pts.values()]; pinchD = Math.hypot(a!.x - b!.x, a!.y - b!.y); return; }
    const y0 = f(x0);
    const near = Number.isFinite(y0) && Math.hypot(p.x - sx(x0), p.y - sy(y0)) < (e.pointerType === 'touch' ? 34 : 18);
    // tapping on the curve column also grabs the point (thumb-friendly)
    const onCurve = Math.abs(p.y - sy(f(ux(p.x)))) < (e.pointerType === 'touch' ? 26 : 12);
    if (near || onCurve) { mode = 'point'; x0 = ux(p.x); x0Slider.value = String(x0); draw(); }
    else { mode = 'pan'; last = p; canvas.style.cursor = 'grabbing'; }
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!pts.has(e.pointerId)) return;
    const p = local(e); pts.set(e.pointerId, p);
    if (mode === 'pinch' && pts.size === 2) {
      const [a, b] = [...pts.values()];
      const d = Math.hypot(a!.x - b!.x, a!.y - b!.y);
      if (pinchD > 0) zoom(d / pinchD, (a!.x + b!.x) / 2, (a!.y + b!.y) / 2);
      pinchD = d;
    } else if (mode === 'point') {
      x0 = Math.round(ux(p.x) * 100) / 100; x0Slider.value = String(x0); draw();
    } else if (mode === 'pan') {
      view.cx -= (p.x - last.x) / view.scale; view.cy += (p.y - last.y) / view.scale; last = p; fitX0Range(); draw();
    }
  });
  const end = (e: PointerEvent) => { pts.delete(e.pointerId); if (pts.size === 0) { mode = 'none'; canvas.style.cursor = ''; } else if (mode === 'pinch') mode = 'none'; };
  canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);
  canvas.addEventListener('keydown', (e) => {
    const stepX = 10 / view.scale;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); x0 += e.key === 'ArrowRight' ? stepX : -stepX; x0 = Math.round(x0 * 100) / 100; x0Slider.value = String(x0); draw(); }
    if (e.key === '+' || e.key === '=') { e.preventDefault(); zoom(1.25); }
    if (e.key === '-') { e.preventDefault(); zoom(0.8); }
  });

  new ResizeObserver(resize).observe(canvas);
  setFamily('poly');
  resize();
  // expose state for automated tests only (read-only snapshot)
  (window as any).__lab = () => ({ famId, params: { ...params }, x0, m: df(x0), fx0: f(x0), view: { ...view } });
}
