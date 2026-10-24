/**
 * Runtime primitives for the generated screens (Phone.gen.tsx).
 *
 *   <V s="css">  a box. Mirrors CSS layout + passes inherited text styles down.
 *   <T s="css">  a text run (nested <T> = inline span).
 *
 * Plus the few things CSS does that React Native can't draw by itself:
 * backdrop blur (glass), conic rings, barcode stripes, dashed perforations,
 * ticket notches, the QR grid, and the swipeable card stack.
 */
import { BlurView } from 'expo-blur';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import Animated, { Easing, runOnUI, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import SvgBase, { Circle as SvgCircle, Line, Path as SvgPath, Rect as SvgRect } from 'react-native-svg';
import { scheduleOnRN } from 'react-native-worklets';
import { applyBoxSizing, css, type Fam, type LH, type TextDecl } from './css';
import { Doodle, hasDoodle } from './doodles';
import { Confetti } from './extras';
export { LockScreen, OsmMap } from './extras';
import { BRIC_OPSZ } from './fonts.gen';
import { deckApi, topId, useDown } from './store';

const WEB = Platform.OS === 'web';
const CRISP: any = { shapeRendering: 'crispEdges' };

/** Glass tuning for native (CSS uses blur(16px) saturate(150%)). */
export const GLASS = { light: { tint: 'light' as const, perPx: 2 }, dark: { tint: 'dark' as const, perPx: 3 } };

// ---------------------------------------------------------------------------
// Inherited text state
// ---------------------------------------------------------------------------
type TS = {
  fam: Fam; w: number; size: number; lh: LH; ls: number; color: string;
  align: 'left' | 'center' | 'right'; transform: string; nowrap: boolean; wrap?: string;
  clip?: 'ellipsis' | 'clip';
};
const BASE: TS = { fam: 'system', w: 400, size: 16, lh: 'normal', ls: 0, color: '#000', align: 'left', transform: 'none', nowrap: false };
/** Browser defaults for <button>/<input>: they don't inherit font or color. */
const CONTROL: Partial<TS> = { fam: 'system', w: 400, size: 13.333, lh: 'normal', ls: 0, color: '#000', transform: 'none', nowrap: false, wrap: undefined };

const TextCtx = createContext<TS>(BASE);
const InText = createContext<TS | null>(null);
type Lay = { flex: boolean; row: boolean; grid?: boolean };
const LayCtx = createContext<Lay>({ flex: false, row: false });

function merge(parent: TS, d: TextDecl): TS {
  const size = d.size ?? parent.size;
  let ls = parent.ls;
  if (d.ls) ls = 'em' in d.ls ? d.ls.em * size : d.ls.px;
  return {
    fam: d.fam ?? parent.fam, w: d.w ?? parent.w, size, lh: d.lh ?? parent.lh, ls, color: d.color ?? parent.color,
    align: d.align ?? parent.align, transform: d.transform ?? parent.transform, nowrap: d.nowrap ?? parent.nowrap, wrap: d.wrap ?? parent.wrap,
  };
}

const nearest = (arr: number[], x: number) => arr.reduce((a, b) => (Math.abs(b - x) < Math.abs(a - x) ? b : a));

function fontFor(fam: Fam, w: number, size: number): Record<string, any> {
  switch (fam) {
    case 'bric': {
      const W = w >= 750 ? 800 : 700;
      const o = nearest(BRIC_OPSZ[W], Math.max(12, Math.min(96, size)));
      return { fontFamily: `Bric${W}_${String(o).replace('.', 'p')}` };
    }
    case 'geist':
      return { fontFamily: `Geist${nearest([400, 500, 600, 700], w)}` };
    case 'mono':
      return { fontFamily: `GeistMono${w >= 550 ? 600 : 500}` };
    default:
      return { fontWeight: String(nearest([100, 200, 300, 400, 500, 600, 700, 800, 900], w)) };
  }
}

function textStyle(t: TS): Record<string, any> {
  const lineHeight = t.lh === 'normal' ? undefined : 'f' in t.lh ? t.lh.f * t.size : t.lh.px;
  return {
    ...fontFor(t.fam, t.w, t.size), fontSize: t.size, lineHeight, letterSpacing: t.ls, color: t.color,
    textAlign: t.align, textTransform: t.transform,
  };
}

function withAlpha(color: string, a: number): string {
  const m = /^#([0-9a-f]{6})$/i.exec(color);
  if (m) {
    const n = parseInt(m[1], 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }
  const r = /^rgba?\(([^)]*)\)$/.exec(color);
  if (r) {
    const [R, G, B, A = '1'] = r[1].split(',').map((x) => x.trim());
    return `rgba(${R},${G},${B},${parseFloat(A) * a})`;
  }
  return color;
}

function radiusOf(v: Record<string, any>, inset = 0) {
  const k = ['borderRadius', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'];
  const out: Record<string, any> = {};
  for (const key of k) if (typeof v[key] === 'number') out[key] = Math.max(0, v[key] - inset);
  return out;
}

function flatten(children: React.ReactNode): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  React.Children.forEach(children, (ch: any) => {
    if (ch === null || ch === undefined || ch === false) return;
    if (ch.type === React.Fragment) out.push(...flatten(ch.props.children));
    else out.push(ch);
  });
  return out;
}

// ---------------------------------------------------------------------------
// Background layers RN can't draw natively
// ---------------------------------------------------------------------------
function Glass({ radius, blur, fill }: { radius: any; blur: number; fill?: string }) {
  const dark = !!fill && /rgba\(\s*(1\d|2\d|3\d)\s*,/.test(fill);
  const g = dark ? GLASS.dark : GLASS.light;
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, radius, { overflow: 'hidden' }]}>
      <BlurView intensity={Math.min(100, blur * g.perPx)} tint={g.tint} style={StyleSheet.absoluteFill} />
      {fill ? <View style={[StyleSheet.absoluteFill, { backgroundColor: fill }]} /> : null}
    </View>
  );
}

/** conic-gradient(A Xdeg, B 0) on a circle = a pie. */
function Pie({ a, deg, b }: { a: string; deg: number; b: string }) {
  const rad = ((deg - 90) * Math.PI) / 180;
  const x = 50 + 50 * Math.cos(rad), y = 50 + 50 * Math.sin(rad);
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <SvgBase width="100%" height="100%" viewBox="0 0 100 100">
        <SvgCircle cx={50} cy={50} r={50} fill={b} />
        {deg >= 359.99 ? <SvgCircle cx={50} cy={50} r={50} fill={a} />
          : deg > 0 ? <SvgPath d={`M50 50 L50 0 A50 50 0 ${deg > 180 ? 1 : 0} 1 ${x} ${y} Z`} fill={a} /> : null}
      </SvgBase>
    </View>
  );
}

/** repeating-linear-gradient(90deg, ...) hard stops = barcode stripes. */
function Stripes({ stops, period, w, h }: { stops: { color: string; from: number; to: number }[]; period: number; w: number; h: number }) {
  const rects: React.ReactNode[] = [];
  for (let x0 = 0; x0 < w; x0 += period) {
    for (const st of stops) {
      const x = x0 + st.from;
      if (st.color === 'transparent' || x >= w) continue;
      rects.push(<SvgRect key={`${x0}-${st.from}`} x={x} y={0} width={Math.min(st.to - st.from, w - x)} height={h} fill={st.color} />);
    }
  }
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <SvgBase width={w} height={h} {...CRISP}>{rects}</SvgBase>
    </View>
  );
}

/** border-top: Npx dashed, drawn like Chrome (dash = 3x width, evenly fitted). */
function DashedTop({ width: bw, color }: { width: number; color: string }) {
  const [L, setL] = useState(0);
  const dash = 3 * bw;
  const n = Math.max(1, Math.round((L + dash) / (2 * dash)));
  const gap = n > 1 ? (L - n * dash) / (n - 1) : 0;
  return (
    <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: bw }} onLayout={(e) => setL(e.nativeEvent.layout.width)}>
      {L > 0 ? (
        <SvgBase width={L} height={bw}>
          <Line x1={0} y1={bw / 2} x2={L} y2={bw / 2} stroke={color} strokeWidth={bw} strokeDasharray={[dash, Math.max(0, gap)]} />
        </SvgBase>
      ) : null}
    </View>
  );
}

/** Ticket card: rounded rect with two 13pt notches centered 98pt above the bottom. */
function NotchBg({ size, fill }: { size: { w: number; h: number } | null; fill?: string }) {
  if (!size || !fill) return null;
  const { w: W, h: H } = size;
  const R = 26, r = 12.75, cy = H - 98;
  const d = `M${R},0 H${W - R} A${R},${R} 0 0 1 ${W},${R} V${cy - r} A${r},${r} 0 0 0 ${W},${cy + r} V${H - R} A${R},${R} 0 0 1 ${W - R},${H} H${R} A${R},${R} 0 0 1 0,${H - R} V${cy + r} A${r},${r} 0 0 0 0,${cy - r} V${R} A${R},${R} 0 0 1 ${R},0 Z`;
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <SvgBase width={W} height={H}>
        <SvgPath d={d} fill={fill} />
      </SvgBase>
    </View>
  );
}

// ---------------------------------------------------------------------------
// <V>: a CSS box
// ---------------------------------------------------------------------------
const APressable: any = Animated.createAnimatedComponent(Pressable);
const SCROLL_CONTENT = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'rowGap', 'columnGap', 'flexDirection', 'alignItems', 'justifyContent', 'flexWrap', 'alignContent'];

type VP = {
  s?: string; btn?: boolean; span?: boolean; notch?: boolean; onPress?: any; active?: string; label?: string;
  sref?: any; screen?: string; children?: React.ReactNode; astyle?: any; gesture?: any; viewOverride?: Record<string, any>;
};

export function V(props: VP) {
  const { s, btn, span, notch, onPress, active, label, sref, screen, children, astyle, gesture, viewOverride } = props;
  const p = css(s);
  const parentText = useContext(TextCtx);
  const lay = useContext(LayCtx);
  const [pressed, setPressed] = useState(false);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  const text = merge(btn ? { ...parentText, ...CONTROL, align: 'center' } : parentText, p.text);
  text.clip = p.ellipsis ? 'ellipsis' : p.view.overflow === 'hidden' ? 'clip' : undefined;

  const view: Record<string, any> = { ...applyBoxSizing(p.view, p, !!btn), ...viewOverride };
  if (btn) {
    if (![...p.declared].some((k) => k.startsWith('padding'))) {
      view.paddingTop = view.paddingBottom = 1;
      view.paddingLeft = view.paddingRight = 6;
    }
    if (!p.declared.has('background') && !p.declared.has('background-color')) view.backgroundColor = '#EFEFEF';
    // CSS buttons center their content vertically; block children still fill the width
    // (inline-level children are centered by text-align, see alignSelf below).
    if (p.display === 'block') view.justifyContent ??= 'center';
  }
  // CSS flex items shrink by default (RN's don't); inline-level boxes in block flow shrink-wrap.
  if (lay.flex && lay.row && view.flexShrink === undefined) view.flexShrink = 1;
  if (!lay.flex && (btn || span) && view.position !== 'absolute' && view.alignSelf === undefined && view.width === undefined) {
    view.alignSelf = parentText.align === 'center' ? 'center' : parentText.align === 'right' ? 'flex-end' : 'flex-start';
  }
  if (lay.grid && view.height === undefined && view.flexGrow === undefined) view.flexGrow = 1;
  if (view.borderColor === 'currentColor') view.borderColor = text.color;
  if (pressed && active) Object.assign(view, css(active).view);

  const layers: React.ReactNode[] = [];
  if (p.blur !== undefined) {
    if (WEB) {
      view.backdropFilter = `blur(${p.blur}px) saturate(${Math.round((p.saturate ?? 1) * 100)}%)`;
      view.WebkitBackdropFilter = view.backdropFilter;
    } else {
      layers.push(<Glass key="glass" radius={radiusOf(view, view.borderTopWidth || 0)} blur={p.blur} fill={view.backgroundColor} />);
      view.backgroundColor = 'transparent';
    }
  }
  if (p.conic) layers.push(<Pie key="pie" {...p.conic} />);
  if (p.stripes && typeof view.width === 'number' && typeof view.height === 'number') {
    layers.push(<Stripes key="stripes" stops={p.stripes} period={p.stripePeriod!} w={view.width} h={view.height} />);
  }
  if (p.dashedTop) {
    if (WEB) {
      view.borderTopWidth = p.dashedTop.width;
      view.borderTopColor = p.dashedTop.color;
      view.borderStyle = 'dashed';
    } else {
      view.paddingTop = (view.paddingTop || 0) + p.dashedTop.width;
      layers.push(<DashedTop key="dash" {...p.dashedTop} />);
    }
  }
  if (notch) {
    layers.push(<NotchBg key="notch" size={size} fill={view.backgroundColor} />);
    view.backgroundColor = 'transparent';
  }
  if (p.dropShadow && !view.boxShadow) view.boxShadow = p.dropShadow;

  let kids: React.ReactNode = children;
  if (p.grid) kids = <GridRows cols={p.grid} gap={view.columnGap}>{children}</GridRows>;
  if (p.grid) delete view.columnGap;

  const layCtx: Lay = { flex: p.display === 'flex', row: view.flexDirection === 'row' };
  const pe = p.pe === 'none' ? 'none' : undefined;
  const wrap = (node: React.ReactNode) => (
    <TextCtx.Provider value={text}>
      <InText.Provider value={null}>
        <LayCtx.Provider value={layCtx}>{node}</LayCtx.Provider>
      </InText.Provider>
    </TextCtx.Provider>
  );

  if (p.scroll) {
    const outer: Record<string, any> = {};
    const inner: Record<string, any> = {};
    for (const [k, v] of Object.entries(view)) (SCROLL_CONTENT.includes(k) ? inner : outer)[k] = v;
    if (p.scroll === 'x') inner.flexDirection = 'row';
    return wrap(
      <ScrollView
        ref={sref}
        style={outer}
        contentContainerStyle={inner}
        horizontal={p.scroll === 'x'}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        pointerEvents={pe}
        testID={screen}
      >
        {layers}
        {kids}
      </ScrollView>,
    );
  }

  const animated = p.animated || !!astyle;
  const Comp: any = btn ? (animated ? APressable : Pressable) : animated ? Animated.View : View;
  const extra: Record<string, any> = {};
  if (btn) {
    extra.onPress = onPress;
    extra.accessibilityRole = 'button';
    if (label) extra.accessibilityLabel = label;
    if (active) {
      extra.onPressIn = () => setPressed(true);
      extra.onPressOut = () => setPressed(false);
    }
  } else if (onPress) {
    // a clickable <div>: make it pressable without button styling
    return wrap(
      <Pressable style={view} onPress={onPress} pointerEvents={pe} testID={screen} accessibilityLabel={label}>
        {layers}
        {kids}
      </Pressable>,
    );
  }
  if (notch) extra.onLayout = (e: any) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height });

  const node = (
    <Comp style={astyle ? [view, astyle] : view} pointerEvents={pe} testID={screen} {...extra}>
      {layers}
      {kids}
    </Comp>
  );
  return wrap(gesture ? <GestureDetector gesture={gesture}>{node}</GestureDetector> : node);
}

function GridRows({ cols, gap, children }: { cols: number[]; gap?: number; children: React.ReactNode }) {
  const items = flatten(children);
  const rows: React.ReactNode[][] = [];
  for (let i = 0; i < items.length; i += cols.length) rows.push(items.slice(i, i + cols.length));
  return (
    <>
      {rows.map((row, ri) => (
        <View key={ri} style={{ flexDirection: 'row', columnGap: gap }}>
          {cols.map((fr, ci) => (
            <View key={ci} style={{ flexGrow: fr, flexShrink: 1, flexBasis: 0, minWidth: 0 }}>
              <LayCtx.Provider value={{ flex: true, row: false, grid: true }}>{row[ci] ?? null}</LayCtx.Provider>
            </View>
          ))}
        </View>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// <T>: text
// ---------------------------------------------------------------------------
function flatText(children: React.ReactNode): string | undefined {
  const parts = React.Children.toArray(children);
  if (parts.every((x) => typeof x === 'string' || typeof x === 'number')) return parts.join('');
  return undefined;
}

export function T({ s, children }: { s?: string; children?: React.ReactNode }) {
  const nested = useContext(InText);
  const parent = useContext(TextCtx);
  const lay = useContext(LayCtx);
  const p = css(s);
  const t = merge(nested || parent, p.text);
  const style = textStyle(t);
  if (nested) {
    if (p.view.opacity !== undefined) style.color = withAlpha(style.color, p.view.opacity);
    return (
      <InText.Provider value={t}>
        <Text style={style}>{children}</Text>
      </InText.Provider>
    );
  }
  Object.assign(style, p.view);
  if (lay.flex && lay.row && style.flexShrink === undefined) style.flexShrink = 1;
  const lines = t.nowrap ? 1 : undefined;
  const mode = parent.clip === 'ellipsis' ? 'tail' : 'clip';
  const plain = flatText(children);
  if (!t.nowrap && (t.wrap === 'balance' || t.wrap === 'pretty') && plain !== undefined) {
    return <Wrapped style={style} mode={t.wrap} text={plain} />;
  }
  return (
    <InText.Provider value={t}>
      <Text style={style} numberOfLines={lines} ellipsizeMode={lines ? mode : undefined}>
        {children}
      </Text>
    </InText.Provider>
  );
}

/** text-wrap: balance | pretty. Web uses real CSS; native re-breaks after measuring. */
function Wrapped({ style, mode, text }: { style: any; mode: string; text: string }) {
  const [res, setRes] = useState<{ src: string; out: string } | null>(null);
  const width = useRef(0);
  if (WEB) return <Text style={[style, { textWrap: mode } as any]}>{text}</Text>;
  const shown = res && res.src === text ? res.out : text;
  return (
    <Text
      style={style}
      onLayout={(e) => (width.current = e.nativeEvent.layout.width)}
      onTextLayout={(e) => {
        if (res && res.src === text) return;
        const lines = e.nativeEvent.lines;
        setRes({ src: text, out: lines.length < 2 ? text : rebreak(text, lines, width.current, mode) });
      }}
    >
      {shown}
    </Text>
  );
}

function rebreak(text: string, lines: { text: string; width: number }[], maxW: number, mode: string): string {
  const words = text.split(' ');
  // estimate each word's width from the line it landed on
  const ww: number[] = [];
  let wi = 0;
  for (const ln of lines) {
    const lw = ln.text.trim().split(' ').filter(Boolean);
    const per = ln.width / Math.max(1, ln.text.trim().length);
    for (const w of lw) {
      if (wi < words.length) ww[wi++] = w.length * per;
    }
  }
  while (wi < words.length) ww[wi] = words[wi++].length * 8;
  const space = (lines[0].width / Math.max(1, lines[0].text.trim().length)) * 1;
  const widthOf = (a: number, b: number) => ww.slice(a, b).reduce((x, y) => x + y, 0) + space * Math.max(0, b - a - 1);
  if (mode === 'pretty') {
    const last = lines[lines.length - 1].text.trim().split(' ').filter(Boolean);
    if (last.length !== 1 || words.length < 3) return text;
    return words.slice(0, -2).join(' ') + '\n' + words.slice(-2).join(' ');
  }
  const n = lines.length;
  if (n === 2) {
    let best = -1;
    let bestCost = Infinity;
    for (let k = 1; k < words.length; k++) {
      const a = widthOf(0, k), b = widthOf(k, words.length);
      if (a > maxW + 0.5 || b > maxW + 0.5) continue;
      const cost = Math.max(a, b);
      if (cost <= bestCost + 0.01) { bestCost = cost; best = k; }
    }
    if (best < 0) return text;
    return words.slice(0, best).join(' ') + '\n' + words.slice(best).join(' ');
  }
  const target = widthOf(0, words.length) / n;
  const out: string[] = [];
  let start = 0;
  for (let k = 1; k <= words.length; k++) {
    if (out.length < n - 1 && widthOf(start, k) >= target) {
      const over = widthOf(start, k) - target, under = target - widthOf(start, k - 1);
      const cut = over < under || k - 1 === start ? k : k - 1;
      out.push(words.slice(start, cut).join(' '));
      start = cut;
    }
  }
  out.push(words.slice(start).join(' '));
  return out.filter(Boolean).join('\n');
}

// ---------------------------------------------------------------------------
// Inputs, image placeholders, QR
// ---------------------------------------------------------------------------
export function Field(props: { s?: string; value?: string; placeholder?: string; onChange?: any; onKey?: any; multiline?: boolean; rows?: number }) {
  const { s, value, placeholder, onChange, onKey, multiline, rows = 2 } = props;
  const p = css(s);
  const lay = useContext(LayCtx);
  const t = merge({ ...BASE, ...CONTROL } as TS, p.text);
  const ts = textStyle(t);
  const declaredPad = [...p.declared].some((k) => k.startsWith('padding'));
  const pad = declaredPad ? ((p as any)._pad as number[]) : multiline ? [2, 2, 2, 2] : [1, 2, 1, 2];
  const bw = (p as any)._border as number[];
  const view: Record<string, any> = { ...p.view, paddingTop: pad[0], paddingRight: pad[1], paddingBottom: pad[2], paddingLeft: pad[3] };
  if (typeof view.height === 'number') view.height += pad[0] + pad[2] + bw[0] + bw[2];
  if (multiline && view.height === undefined) {
    const lh = t.lh === 'normal' ? t.size * 1.2 : 'f' in t.lh ? t.lh.f * t.size : t.lh.px;
    view.height = rows * lh + pad[0] + pad[2] + bw[0] + bw[2];
  }
  if (lay.flex && lay.row && view.flexShrink === undefined) view.flexShrink = 1;
  if (!multiline) delete ts.lineHeight;
  const input = (
    <TextInput
      value={value}
      placeholder={placeholder}
      placeholderTextColor="rgba(21,18,15,.62)"
      onChangeText={(v) => onChange?.({ target: { value: v } })}
      onSubmitEditing={onKey ? () => onKey({ key: 'Enter' }) : undefined}
      submitBehavior={onKey ? 'submit' : multiline ? 'newline' : 'blurAndSubmit'}
      returnKeyType={onKey ? 'send' : 'done'}
      multiline={multiline}
      textAlignVertical={multiline ? 'top' : 'center'}
      style={p.blur !== undefined && !WEB ? [StyleSheet.absoluteFill, ts, { paddingTop: pad[0], paddingRight: pad[1], paddingBottom: pad[2], paddingLeft: pad[3] }] : [view, ts, WEB && p.blur !== undefined ? { backdropFilter: `blur(${p.blur}px) saturate(${Math.round((p.saturate ?? 1) * 100)}%)` } : null, WEB ? ({ outlineStyle: 'none' } as any) : null]}
    />
  );
  if (p.blur !== undefined && !WEB) {
    const box = { ...view, backgroundColor: 'transparent' };
    return (
      <View style={box}>
        <Glass radius={radiusOf(view, bw[0])} blur={p.blur} fill={view.backgroundColor} />
        {input}
      </View>
    );
  }
  return input;
}

/** The prototype's <image-slot>: event art when we have it, else the empty placeholder. */
export function Slot({ sid, ph }: { sid?: string; ph: string }) {
  const parent = useContext(TextCtx);
  const art = (sid || '').replace(/^photo-/, '');
  if (art && hasDoodle(art)) {
    return (
      <View pointerEvents="none" style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]}>
        <Doodle id={art} />
      </View>
    );
  }
  const color = parent.color;
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { overflow: 'hidden', backgroundColor: 'rgba(127,127,127,.08)' }]}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', rowGap: 6, padding: 12 }}>
        <SvgBase width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" opacity={0.45}>
          <SvgRect x={3} y={3} width={18} height={18} rx={2} />
          <SvgCircle cx={8.5} cy={8.5} r={1.5} />
          <SvgPath d="m21 15-5-5L5 21" />
        </SvgBase>
        <Text style={{ fontSize: 13, lineHeight: 16.9, fontWeight: '500', letterSpacing: 0.13, color, opacity: 0.75, maxWidth: '90%', textAlign: 'center' }}>{ph}</Text>
        <Text style={{ fontSize: 11, lineHeight: 14.3, color, opacity: 0.75, textAlign: 'center' }}>
          or <Text style={{ textDecorationLine: 'underline' }}>browse files</Text>
        </Text>
      </View>
      <View style={[StyleSheet.absoluteFill, { borderWidth: 1.5, borderStyle: 'dashed', borderColor: color, opacity: 0.35 }]} />
    </View>
  );
}

export function QR({ cells, s }: { cells: string[]; s: string }) {
  const p = css(s);
  const w = p.view.width as number, h = p.view.height as number;
  const n = 21, cw = w / n, ch = h / n;
  return (
    <View style={{ width: w, height: h, flexShrink: 0 }}>
      <SvgBase width={w} height={h} {...CRISP}>
        {cells.map((c, i) => (c !== 'transparent' ? <SvgRect key={i} x={(i % n) * cw} y={Math.floor(i / n) * ch} width={cw} height={ch} fill={c} /> : null))}
      </SvgBase>
    </View>
  );
}

// ---------------------------------------------------------------------------
// SVG passthrough (currentColor resolves to the inherited text color)
// ---------------------------------------------------------------------------
export function Svg(props: any) {
  const t = useContext(TextCtx);
  const { width, height, ...rest } = props;
  return <SvgBase width={Number(width)} height={Number(height)} color={t.color} style={{ flexShrink: 0 }} {...rest} />;
}
export const Path = SvgPath;
export const Rect = SvgRect;
export const Circle = SvgCircle;

// ---------------------------------------------------------------------------
// Phone root + fake status bar (web only; native uses the real one)
// ---------------------------------------------------------------------------
/** Desktop web shows the phone mockup; phones (native or a narrow browser) go full screen. */
function useFramed() {
  const { width } = useWindowDimensions();
  return WEB && width >= 500;
}

export function Root({ s, children }: { s: string; screen?: string; children?: React.ReactNode }) {
  const framed = useFramed();
  if (framed) {
    return (
      <View style={{ minHeight: '100vh' as any, alignItems: 'center', justifyContent: 'center', paddingVertical: 40, paddingHorizontal: 24, backgroundColor: '#E6DFD2' }}>
        <DeckProvider>
          <V s={s} screen="Phone">
            {children}
            <Confetti />
          </V>
        </DeckProvider>
      </View>
    );
  }
  const native = s.replace('width:390px;height:844px;flex:none;border-radius:54px;', '').replace(/box-shadow:[^;]*;?/, '') + ';flex:1';
  return (
    <DeckProvider>
      <V s={native}>
        {children}
        <Confetti />
      </V>
    </DeckProvider>
  );
}

export function FakeStatusBar({ s, children }: { s: string; children?: React.ReactNode }) {
  return useFramed() ? <V s={s}>{children}</V> : null;
}

// ---------------------------------------------------------------------------
// Card deck: drag, fly-off, stamps (spec section 7 "Stack physics")
// ---------------------------------------------------------------------------
type Deck = { dragX: any; dragY: any; active: any; fly: (dir: 'down' | 'nah') => void };
const DeckCtx = createContext<Deck | null>(null);
const EASE = Easing.bezier(0.2, 0.8, 0.2, 1);

function DeckProvider({ children }: { children: React.ReactNode }) {
  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);
  const active = useSharedValue('');
  const flying = useRef(false);
  const top = useDown((s) => topId(s)) || '';

  useEffect(() => {
    // Reset the drag and hand it to the new top card in one UI-thread step,
    // so neither the old nor the new top card flashes in the wrong spot.
    runOnUI((id: string) => {
      'worklet';
      dragX.value = 0;
      dragY.value = 0;
      active.value = id;
    })(top);
    flying.current = false;
  }, [top, dragX, dragY, active]);

  const fly = useCallback(
    (dir: 'down' | 'nah') => {
      const id = topId(useDown.getState());
      if (!id || flying.current) return;
      flying.current = true;
      dragX.value = withTiming(dir === 'down' ? 560 : -560, { duration: 320, easing: EASE });
      dragY.value = withTiming(dragY.value + 40, { duration: 320, easing: EASE });
      setTimeout(() => useDown.getState().commitSwipe(id, dir), 300);
    },
    [dragX, dragY],
  );
  useEffect(() => {
    deckApi.fly = fly;
  }, [fly]);

  return <DeckCtx.Provider value={{ dragX, dragY, active, fly }}>{children}</DeckCtx.Provider>;
}

const openDetailJS = (id: string) => useDown.getState().openDetail(id);

export function CardDrag({ s, c, children }: { s: string; c: any; children?: React.ReactNode }) {
  const deck = useContext(DeckCtx)!;
  const { dragX, dragY, active, fly } = deck;
  const r: number = c.r;
  const topProp: string = c.top || '';
  const id: string = c.id;

  const aStyle = useAnimatedStyle(() => {
    const live = active.value === topProp;
    const x = live ? dragX.value : 0;
    const y = live ? dragY.value : 0;
    const pr = Math.min(1, Math.abs(x) / 120);
    if (r === 0) return { transform: [{ translateX: x }, { translateY: y }, { rotate: `${x / 16}deg` }] };
    if (r === 1) return { transform: [{ translateX: 0 }, { translateY: 14 - 14 * pr }, { rotate: '0deg' }, { scale: 0.94 + 0.06 * pr }] };
    if (r === 2) return { transform: [{ translateX: 0 }, { translateY: 28 - 14 * pr }, { rotate: '0deg' }, { scale: 0.88 + 0.06 * pr }] };
    return { transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: '0deg' }] };
  }, [r, topProp]);

  const pan = usePanGesture({
    enabled: r === 0,
    minDistance: 0,
    onUpdate: (e: any) => {
      'worklet';
      dragX.value = e.translationX;
      dragY.value = e.translationY * 0.5;
    },
    onFinalize: () => {
      'worklet';
      const x = dragX.value;
      const y = dragY.value;
      if (x > 100) scheduleOnRN(fly, 'down');
      else if (x < -100) scheduleOnRN(fly, 'nah');
      else {
        dragX.value = withTiming(0, { duration: 320, easing: EASE });
        dragY.value = withTiming(0, { duration: 320, easing: EASE });
        if (Math.abs(x) < 6 && Math.abs(y) < 6) scheduleOnRN(openDetailJS, id);
      }
    },
  } as any);

  // The prototype's inline transform/transition drive the web build; here the
  // UI-thread animated style replaces them. The drop-shadow follows the card shape.
  const p = css(s);
  const override: Record<string, any> = { transform: undefined, transitionProperty: undefined, transitionDuration: undefined, transitionTimingFunction: undefined, transitionDelay: undefined };
  if (p.dropShadow) {
    override.boxShadow = p.dropShadow;
    override.borderRadius = 26;
  }
  return (
    <V s={s} astyle={aStyle} gesture={pan} viewOverride={override}>
      {children}
    </V>
  );
}

export function Stamp({ s, kind, c, children }: { s: string; kind: 'down' | 'nah'; c: any; children?: React.ReactNode }) {
  const { dragX, active } = useContext(DeckCtx)!;
  const topProp: string = c.top || '';
  const r: number = c.r;
  const aStyle = useAnimatedStyle(() => {
    const x = active.value === topProp && r === 0 ? dragX.value : 0;
    const o = kind === 'down' ? x / 90 : -x / 90;
    return { opacity: Math.max(0, Math.min(1, o)) };
  }, [r, topProp, kind]);
  return (
    <V s={s} astyle={aStyle}>
      {children}
    </V>
  );
}
