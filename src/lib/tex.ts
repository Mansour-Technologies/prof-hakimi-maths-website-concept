import katex from 'katex';

/** Render a single LaTeX expression to HTML at build time (throws on error so the build catches typos). */
export const tex = (src: string, display = false) =>
  katex.renderToString(src, { displayMode: display, throwOnError: true, strict: 'ignore', output: 'htmlAndMathml' });

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Render mixed prose: text with `$…$` (inline) and `$$…$$` (display) math,
 * plus **bold**. Text outside math is HTML-escaped.
 */
export const tx = (src: string) => {
  const out: string[] = [];
  const re = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    out.push(esc(src.slice(last, m.index)).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'));
    out.push(m[1] !== undefined ? tex(m[1], true) : tex(m[2]!, false));
    last = re.lastIndex;
  }
  out.push(esc(src.slice(last)).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'));
  return out.join('');
};

/** Rough plain-text reading of a short LaTeX snippet (for accessible names of MCQ options). */
export const plain = (src: string) =>
  src
    .replace(/\$/g, '')
    .replace(/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)')
    .replace(/\\sqrt\{([^{}]*)\}/g, '√($1)')
    .replace(/\\pi/g, 'π').replace(/\\mapsto/g, '↦').replace(/\\ln/g, 'ln').replace(/\\le/g, '≤').replace(/\\ge/g, '≥')
    .replace(/e\^\{([^{}]*)\}/g, 'e^($1)')
    .replace(/\\[a-zA-Z]+/g, '').replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();
