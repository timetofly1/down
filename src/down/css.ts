/**
 * Tiny CSS -> React Native style engine.
 *
 * The prototype styles every element with inline CSS. We keep those strings
 * verbatim (see Phone.gen.tsx) and translate them here, so every value comes
 * straight from the design. Results are memoized per string.
 *
 * Text properties are split out because in CSS they inherit down the tree;
 * <V> passes them to descendants through context and <T> resolves them.
 */
import { cubicBezier } from 'react-native-reanimated';

export type Fam = 'bric' | 'geist' | 'mono' | 'system' | 'arial';
export type LH = { f: number } | { px: number } | 'normal';
export type LS = { em: number } | { px: number };

/** Inheritable text props, as declared on one element. */
export type TextDecl = {
  fam?: Fam;
  w?: number;
  size?: number;
  lh?: LH;
  ls?: LS;
  color?: string;
  align?: 'left' | 'center' | 'right';
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  nowrap?: boolean;
  wrap?: 'balance' | 'pretty' | 'wrap';
};

export type Grid = number[];

export type Parsed = {
  view: Record<string, any>;
  text: TextDecl;
  display: 'flex' | 'block' | 'grid' | 'none';
  hasDirection: boolean;
  grid?: Grid;
  scroll?: 'x' | 'y';
  blur?: number;
  saturate?: number;
  conic?: { a: string; deg: number; b: string };
  stripes?: { color: string; from: number; to: number }[];
  stripePeriod?: number;
  dashedTop?: { width: number; color: string };
  ellipsis: boolean;
  borderBox: boolean;
  animated: boolean;
  pe?: 'none' | 'auto';
  dropShadow?: string;
  declared: Set<string>;
};

const cache = new Map<string, Parsed>();

/** Split on `sep` at the top level only (ignores separators inside parens). */
export function splitTop(s: string, sep: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = '';
  for (const ch of s) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === sep && depth === 0) {
      out.push(cur);
      cur = '';
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out.map((x) => x.trim()).filter(Boolean);
}

/** Split on whitespace at the top level. */
function splitWs(s: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = '';
  for (const ch of s.trim()) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (/\s/.test(ch) && depth === 0) {
      if (cur) out.push(cur);
      cur = '';
    } else cur += ch;
  }
  if (cur) out.push(cur);
  return out;
}

/** '12px' -> 12, '50%' -> '50%', '0' -> 0, 'auto' -> 'auto'. */
export function len(v: string): number | string | undefined {
  v = v.trim();
  if (v === 'auto') return 'auto';
  if (v.endsWith('%')) return v;
  if (v.endsWith('px')) return parseFloat(v);
  if (/^-?[\d.]+$/.test(v)) return parseFloat(v);
  return undefined;
}

function num(v: string | undefined): number {
  const n = v === undefined ? NaN : parseFloat(v);
  return isNaN(n) ? 0 : n;
}

function boxSides(v: string): string[] {
  const p = splitWs(v);
  if (p.length === 1) return [p[0], p[0], p[0], p[0]];
  if (p.length === 2) return [p[0], p[1], p[0], p[1]];
  if (p.length === 3) return [p[0], p[1], p[2], p[1]];
  return [p[0], p[1], p[2], p[3]];
}

const FAMILY = (v: string): Fam => {
  const f = splitTop(v, ',')[0].replace(/['"]/g, '').trim().toLowerCase();
  if (f.startsWith('bricolage')) return 'bric';
  if (f === 'geist mono') return 'mono';
  if (f === 'geist') return 'geist';
  if (f === 'monospace') return 'mono';
  if (f === 'arial') return 'arial';
  return 'system';
};

function parseFont(v: string, t: TextDecl) {
  // [style] [weight] size[/line-height] family
  const tokens = splitWs(v);
  let i = 0;
  let w = 400;
  while (i < tokens.length && !/^[\d.]+px(\/.*)?$/.test(tokens[i])) {
    const tk = tokens[i];
    if (/^\d{3}$/.test(tk)) w = parseInt(tk, 10);
    else if (tk === 'bold') w = 700;
    i++;
  }
  const sizeTok = tokens[i] || '13px';
  const [sz, lh] = sizeTok.split('/');
  t.w = w;
  t.size = parseFloat(sz);
  t.lh = lh === undefined ? 'normal' : lh.endsWith('px') ? { px: parseFloat(lh) } : { f: parseFloat(lh) };
  t.fam = FAMILY(tokens.slice(i + 1).join(' '));
}

function parseBorder(v: string): { width: number; style: string; color: string } {
  if (v === '0' || v === 'none') return { width: 0, style: 'solid', color: 'transparent' };
  let width = 3;
  let style = 'none';
  let color = 'currentColor';
  for (const tk of splitWs(v)) {
    if (/^[\d.]+(px)?$/.test(tk)) width = parseFloat(tk);
    else if (/^(solid|dashed|dotted|none)$/.test(tk)) style = tk;
    else color = tk;
  }
  if (style === 'none') width = 0;
  return { width, style, color };
}

/** 'translate(10px,5px) rotate(3deg)' -> RN transform array. */
export function parseTransform(v: string): any[] | undefined {
  if (!v || v === 'none') return undefined;
  const out: any[] = [];
  const re = /([a-zA-Z]+)\(([^)]*)\)/g;
  let m: RegExpExecArray | null;
  const L = (x: string) => {
    x = x.trim();
    if (x.endsWith('%')) return x;
    return parseFloat(x) || 0;
  };
  while ((m = re.exec(v))) {
    const fn = m[1];
    const args = m[2].split(',').map((a) => a.trim());
    if (fn === 'translate') {
      out.push({ translateX: L(args[0]) });
      out.push({ translateY: L(args[1] ?? '0') });
    } else if (fn === 'translateX') out.push({ translateX: L(args[0]) });
    else if (fn === 'translateY') out.push({ translateY: L(args[0]) });
    else if (fn === 'scale') {
      if (args.length > 1) {
        out.push({ scaleX: parseFloat(args[0]) });
        out.push({ scaleY: parseFloat(args[1]) });
      } else out.push({ scale: parseFloat(args[0]) });
    } else if (fn === 'rotate') out.push({ rotate: args[0].endsWith('deg') ? args[0] : `${parseFloat(args[0]) || 0}deg` });
  }
  return out;
}

const TPROP: Record<string, string> = {
  transform: 'transform',
  opacity: 'opacity',
  background: 'backgroundColor',
  'background-color': 'backgroundColor',
  'border-color': 'borderColor',
  width: 'width',
  height: 'height',
};

function timing(v: string | undefined): any {
  if (!v) return 'ease';
  const m = /cubic-bezier\(([^)]*)\)/.exec(v);
  if (m) {
    const [a, b, c, d] = m[1].split(',').map((x) => parseFloat(x));
    return cubicBezier(a, b, c, d);
  }
  return v;
}

function parseTransition(v: string, view: Record<string, any>): boolean {
  const props: string[] = [];
  const dur: number[] = [];
  const fns: any[] = [];
  const delays: number[] = [];
  for (const item of splitTop(v, ',')) {
    const tk = splitWs(item);
    const prop = TPROP[tk[0]];
    if (!prop) continue;
    const times = tk.filter((x) => /^[\d.]+m?s$/.test(x)).map((x) => (x.endsWith('ms') ? parseFloat(x) : parseFloat(x) * 1000));
    const fn = tk.find((x) => /^(cubic-bezier|ease|linear|ease-in|ease-out|ease-in-out)/.test(x));
    props.push(prop);
    dur.push(times[0] ?? 0);
    delays.push(times[1] ?? 0);
    fns.push(timing(fn));
  }
  if (!props.length) return false;
  view.transitionProperty = props;
  view.transitionDuration = dur;
  view.transitionTimingFunction = fns;
  view.transitionDelay = delays;
  return true;
}

const KEYFRAMES: Record<string, any> = {
  spin: { from: { transform: [{ rotate: '0deg' }] }, to: { transform: [{ rotate: '360deg' }] } },
  rise: {
    from: { transform: [{ translateY: 40 }], opacity: 0 },
    to: { transform: [{ translateY: 0 }], opacity: 1 },
  },
};

function parseAnimation(v: string, view: Record<string, any>): boolean {
  const tk = splitWs(v);
  const frames = KEYFRAMES[tk[0]];
  if (!frames) return false;
  const times = tk.filter((x) => /^[\d.]+m?s$/.test(x)).map((x) => (x.endsWith('ms') ? parseFloat(x) : parseFloat(x) * 1000));
  view.animationName = frames;
  view.animationDuration = times[0] ?? 0;
  view.animationTimingFunction = timing(tk.find((x) => /^(cubic-bezier|linear|ease)/.test(x)));
  if (tk.includes('infinite')) view.animationIterationCount = 'infinite';
  return true;
}

/** background shorthand -> color / gradients / conic pie / stripes. */
function parseBackground(v: string, p: Parsed) {
  if (v === 'none' || v === 'transparent') {
    p.view.backgroundColor = 'transparent';
    return;
  }
  const layers = splitTop(v, ',');
  const images: string[] = [];
  for (const layer of layers) {
    if (/^(linear|radial)-gradient\(/.test(layer)) images.push(layer);
    else if (layer.startsWith('conic-gradient(')) {
      // conic-gradient(#A Xdeg, #B 0) -> pie: A from 0..X, B for the rest
      const inner = layer.slice('conic-gradient('.length, -1);
      const [s1, s2] = splitTop(inner, ',');
      const t1 = splitWs(s1);
      const t2 = splitWs(s2 || 'transparent 0');
      p.conic = { a: t1[0], deg: parseFloat(t1[1] || '0'), b: t2[0] };
    } else if (layer.startsWith('repeating-linear-gradient(')) {
      // repeating-linear-gradient(90deg,#c 0 2px,transparent 2px 4px,...)
      const inner = layer.slice('repeating-linear-gradient('.length, -1);
      const stops = splitTop(inner, ',').slice(1);
      p.stripes = stops.map((st) => {
        const t = splitWs(st);
        return { color: t[0], from: parseFloat(t[1]), to: parseFloat(t[2]) };
      });
      p.stripePeriod = Math.max(...p.stripes.map((x) => x.to));
    } else {
      p.view.backgroundColor = layer;
    }
  }
  if (images.length) p.view.backgroundImage = images.join(', ');
}

export function css(src: string | undefined): Parsed {
  const key = src || '';
  const hit = cache.get(key);
  if (hit) return hit;
  const p: Parsed = {
    view: {},
    text: {},
    display: 'block',
    hasDirection: false,
    ellipsis: false,
    borderBox: false,
    animated: false,
    declared: new Set(),
  };
  const v = p.view;
  const t = p.text;
  let pad = [0, 0, 0, 0];
  let border = [0, 0, 0, 0];
  let lsEm: number | undefined;

  for (const d of splitTop(key, ';')) {
    const i = d.indexOf(':');
    if (i < 0) continue;
    const prop = d.slice(0, i).trim().toLowerCase();
    const val = d.slice(i + 1).trim().replace(/\s*!important$/, '');
    p.declared.add(prop);
    switch (prop) {
      // ---- text (inherited) ----
      case 'font':
        parseFont(val, t);
        break;
      case 'font-family':
        t.fam = FAMILY(val);
        break;
      case 'font-size':
        t.size = parseFloat(val);
        break;
      case 'font-weight':
        t.w = val === 'bold' ? 700 : val === 'normal' ? 400 : parseInt(val, 10);
        break;
      case 'line-height':
        t.lh = val === 'normal' ? 'normal' : val.endsWith('px') ? { px: parseFloat(val) } : { f: parseFloat(val) };
        break;
      case 'letter-spacing':
        if (val.endsWith('em')) lsEm = parseFloat(val);
        else t.ls = { px: val === 'normal' ? 0 : parseFloat(val) };
        break;
      case 'color':
        t.color = val;
        break;
      case 'text-align':
        t.align = val as any;
        break;
      case 'text-transform':
        t.transform = val as any;
        break;
      case 'white-space':
        t.nowrap = val === 'nowrap';
        break;
      case 'text-wrap':
        t.wrap = val as any;
        break;
      case 'text-overflow':
        p.ellipsis = val === 'ellipsis';
        break;

      // ---- layout ----
      case 'display':
        if (val === 'none') {
          p.display = 'none';
          v.display = 'none';
        } else if (val === 'flex' || val === 'inline-flex') p.display = 'flex';
        else if (val === 'grid') p.display = 'grid';
        else p.display = 'block';
        break;
      case 'flex-direction':
        v.flexDirection = val;
        p.hasDirection = true;
        break;
      case 'flex-wrap':
        v.flexWrap = val;
        break;
      case 'align-items':
        v.alignItems = val === 'normal' ? undefined : val;
        break;
      case 'align-self':
        v.alignSelf = val;
        break;
      case 'align-content':
        v.alignContent = val;
        break;
      case 'justify-content':
        v.justifyContent = val;
        break;
      case 'flex': {
        if (val === 'none') {
          v.flexGrow = 0;
          v.flexShrink = 0;
        } else {
          const f = splitWs(val);
          v.flexGrow = parseFloat(f[0]);
          v.flexShrink = f[1] !== undefined ? parseFloat(f[1]) : 1;
          v.flexBasis = f[2] !== undefined ? len(f[2]) : 0;
        }
        break;
      }
      case 'gap': {
        const g = splitWs(val);
        v.rowGap = len(g[0]);
        v.columnGap = len(g[1] ?? g[0]);
        break;
      }
      case 'grid-template-columns': {
        const rep = /^repeat\((\d+),\s*(.*)\)$/.exec(val);
        if (rep) {
          const n = parseInt(rep[1], 10);
          p.grid = Array(n).fill(1);
        } else p.grid = splitWs(val).map((x) => parseFloat(x));
        break;
      }
      case 'position':
        v.position = val === 'absolute' ? 'absolute' : 'relative';
        break;
      case 'inset': {
        const s = boxSides(val).map(len);
        [v.top, v.right, v.bottom, v.left] = s;
        break;
      }
      case 'top':
      case 'left':
      case 'right':
      case 'bottom':
      case 'width':
      case 'height':
      case 'min-width':
      case 'min-height':
      case 'max-width':
      case 'max-height': {
        const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        const l = len(val);
        if (l !== undefined) v[camel] = l;
        break;
      }
      case 'z-index':
        v.zIndex = parseInt(val, 10);
        break;
      case 'overflow':
        if (val === 'hidden') v.overflow = 'hidden';
        else if (val === 'auto' || val === 'scroll') p.scroll = 'y';
        break;
      case 'overflow-y':
        if (val === 'auto' || val === 'scroll') p.scroll = 'y';
        break;
      case 'overflow-x':
        if (val === 'auto' || val === 'scroll') p.scroll = 'x';
        break;
      case 'box-sizing':
        p.borderBox = val === 'border-box';
        break;

      // ---- box ----
      case 'padding':
        pad = boxSides(val).map((x) => num(x));
        break;
      case 'padding-top':
        pad[0] = num(val);
        break;
      case 'padding-right':
        pad[1] = num(val);
        break;
      case 'padding-bottom':
        pad[2] = num(val);
        break;
      case 'padding-left':
        pad[3] = num(val);
        break;
      case 'margin': {
        const m = boxSides(val).map(len);
        [v.marginTop, v.marginRight, v.marginBottom, v.marginLeft] = m;
        break;
      }
      case 'margin-top':
      case 'margin-right':
      case 'margin-bottom':
      case 'margin-left': {
        const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        v[camel] = len(val);
        break;
      }
      case 'border-radius': {
        const r = boxSides(val).map((x) => len(x));
        if (r.every((x) => x === r[0])) v.borderRadius = r[0];
        else [v.borderTopLeftRadius, v.borderTopRightRadius, v.borderBottomRightRadius, v.borderBottomLeftRadius] = r;
        break;
      }
      case 'border': {
        const b = parseBorder(val);
        border = [b.width, b.width, b.width, b.width];
        v.borderColor = b.color;
        v.borderStyle = b.style === 'none' ? 'solid' : b.style;
        break;
      }
      case 'border-top':
      case 'border-bottom':
      case 'border-left':
      case 'border-right': {
        const b = parseBorder(val);
        const side = prop.split('-')[1];
        const idx = { top: 0, right: 1, bottom: 2, left: 3 }[side]!;
        const S = side[0].toUpperCase() + side.slice(1);
        if (b.style === 'dashed' && side === 'top') {
          p.dashedTop = { width: b.width, color: b.color };
          border[idx] = 0;
        } else {
          border[idx] = b.width;
          v[`border${S}Color`] = b.color;
        }
        break;
      }
      case 'border-top-color':
        v.borderTopColor = val;
        break;
      case 'background':
      case 'background-color':
        parseBackground(val, p);
        break;
      case 'box-shadow':
        if (val !== 'none') v.boxShadow = val;
        break;
      case 'opacity':
        v.opacity = parseFloat(val);
        break;
      case 'transform':
        v.transform = parseTransform(val);
        break;
      case 'transform-origin':
        v.transformOrigin = val;
        break;
      case 'transition':
        p.animated = parseTransition(val, v) || p.animated;
        break;
      case 'animation':
        p.animated = parseAnimation(val, v) || p.animated;
        break;
      case 'backdrop-filter': {
        const b = /blur\(([\d.]+)px\)/.exec(val);
        const s = /saturate\(([\d.]+)%\)/.exec(val);
        p.blur = b ? parseFloat(b[1]) : 0;
        p.saturate = s ? parseFloat(s[1]) / 100 : 1;
        break;
      }
      case 'filter': {
        const m = /drop-shadow\((.*)\)/.exec(val);
        if (m) p.dropShadow = m[1];
        break;
      }
      case 'pointer-events':
        p.pe = val === 'none' ? 'none' : 'auto';
        break;
      default:
        // cursor, user-select, touch-action, outline, resize, mask, -webkit-*: no-ops on native
        break;
    }
  }

  if (lsEm !== undefined) t.ls = { em: lsEm };
  if (p.display === 'flex' && !p.hasDirection) v.flexDirection = 'row';
  if (p.display === 'grid') v.flexDirection = 'column';

  const [pt, pr, pb, pl] = pad;
  if (pt) v.paddingTop = pt;
  if (pr) v.paddingRight = pr;
  if (pb) v.paddingBottom = pb;
  if (pl) v.paddingLeft = pl;
  const [bt, br, bb, bl] = border;
  if (p.declared.has('border') || bt || br || bb || bl) {
    v.borderTopWidth = bt;
    v.borderRightWidth = br;
    v.borderBottomWidth = bb;
    v.borderLeftWidth = bl;
  }
  (p as any)._pad = pad;
  (p as any)._border = border;

  cache.set(key, p);
  return p;
}

/** Content-box sizing: CSS width/height exclude padding + border. */
export function applyBoxSizing(view: Record<string, any>, p: Parsed, borderBoxDefault: boolean) {
  if (p.borderBox || borderBoxDefault) return view;
  const [pt, pr, pb, pl] = (p as any)._pad as number[];
  const [bt, br, bb, bl] = (p as any)._border as number[];
  const dx = pl + pr + bl + br;
  const dy = pt + pb + bt + bb;
  if (!dx && !dy) return view;
  const out = { ...view };
  for (const k of ['width', 'minWidth', 'maxWidth'] as const) if (typeof out[k] === 'number') out[k] += dx;
  for (const k of ['height', 'minHeight', 'maxHeight'] as const) if (typeof out[k] === 'number') out[k] += dy;
  return out;
}
