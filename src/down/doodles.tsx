/**
 * Event art: orange fields with black doodle line drawings, one per plan.
 * Drawn on a 400x240 canvas with "slice" scaling so every photo window
 * (ticket card, detail hero, map thumb, squad card, pitch preview) crops
 * around the centered subject.
 */
import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

const INK = '#15120F';
const CREAM = '#FFFDF8';
const PEACH = '#FFE4D6';
const RUST = '#C2410C';

type P = Record<string, any>;
const L = (p: P) => <Path stroke={INK} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" fill="none" {...p} />;
const F = (p: P) => <Path stroke={INK} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill={CREAM} {...p} />;

const Spark = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <Path d={`M${x} ${y - 10 * s} Q${x + 1.5 * s} ${y - 1.5 * s} ${x + 10 * s} ${y} Q${x + 1.5 * s} ${y + 1.5 * s} ${x} ${y + 10 * s} Q${x - 1.5 * s} ${y + 1.5 * s} ${x - 10 * s} ${y} Q${x - 1.5 * s} ${y - 1.5 * s} ${x} ${y - 10 * s}Z`} fill={INK} />
);

const Note = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <G transform={`translate(${x} ${y}) scale(${s})`}>
    <Ellipse cx={0} cy={0} rx={8} ry={6} fill={INK} transform="rotate(-22)" />
    <L d="M7 -2 L7 -34 Q18 -28 22 -16" strokeWidth={3} />
  </G>
);

const Dots = ({ pts }: { pts: [number, number][] }) => (
  <>{pts.map(([x, y], i) => <Circle key={i} cx={x} cy={y} r={2.6} fill={INK} />)}</>
);

const Bird = ({ x, y }: { x: number; y: number }) => <L d={`M${x} ${y} q8 -8 16 0 q8 -8 16 0`} strokeWidth={2.6} />;

/** Shared warm background: brand orange with soft light and shade. */
function Bg({ id }: { id: string }) {
  return (
    <>
      <Defs>
        <RadialGradient id={`hi-${id}`} cx="18%" cy="12%" r="70%">
          <Stop offset="0" stopColor="#FFB38F" stopOpacity="0.9" />
          <Stop offset="1" stopColor="#FFB38F" stopOpacity="0" />
        </RadialGradient>
        <RadialGradient id={`lo-${id}`} cx="88%" cy="100%" r="75%">
          <Stop offset="0" stopColor="#E8400C" stopOpacity="0.9" />
          <Stop offset="1" stopColor="#E8400C" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width={400} height={240} fill="#FF5A1F" />
      <Rect x={0} y={0} width={400} height={240} fill={`url(#hi-${id})`} />
      <Rect x={0} y={0} width={400} height={240} fill={`url(#lo-${id})`} />
    </>
  );
}

// Quadratic point helper for the string lights.
const q = (a: number[], c: number[], b: number[], t: number) => [
  (1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0],
  (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1],
];

function Salsa() {
  const bulbs = [
    ...[0.12, 0.32, 0.52, 0.72, 0.92].map((t) => q([-10, 26], [100, 84], [200, 40], t)),
    ...[0.15, 0.38, 0.62, 0.86].map((t) => q([200, 40], [300, -4], [410, 40], t)),
  ];
  return (
    <>
      <L d="M-10 26 Q100 84 200 40 Q300 -4 410 40" strokeWidth={2.6} />
      {bulbs.map(([x, y], i) => (
        <G key={i}>
          <Circle cx={x} cy={y + 13} r={13} fill="#FFB38F" opacity={0.55} />
          <L d={`M${x} ${y} L${x} ${y + 6}`} strokeWidth={2.4} />
          <Circle cx={x} cy={y + 13} r={6.5} fill={CREAM} stroke={INK} strokeWidth={2.4} />
        </G>
      ))}
      {/* lead dancer */}
      <F d="M152 94 a13 13 0 1 0 26 0 a13 13 0 1 0 -26 0" />
      <L d="M165 107 L161 160" strokeWidth={3.6} />
      <L d="M161 160 L144 206" strokeWidth={3.6} />
      <L d="M161 160 L178 196 L192 204" strokeWidth={3.6} />
      <L d="M164 120 Q184 84 211 72" strokeWidth={3.4} />
      <L d="M164 122 L138 142" strokeWidth={3.4} />
      {/* follow dancer, mid-twirl */}
      <F d="M225 88 a13 13 0 1 0 26 0 a13 13 0 1 0 -26 0" />
      <L d="M238 101 L233 140" strokeWidth={3.6} />
      <F d="M233 136 L198 182 Q212 175 224 186 Q236 175 249 186 Q260 175 274 180 Z" fill={PEACH} />
      <L d="M222 186 L213 212" strokeWidth={3.6} />
      <L d="M246 186 L254 212" strokeWidth={3.6} />
      <L d="M237 112 Q226 84 211 72" strokeWidth={3.4} />
      <L d="M239 113 L268 100" strokeWidth={3.4} />
      <L d="M188 198 Q234 224 284 192" strokeWidth={2.2} strokeDasharray="2 7" />
      <L d="M282 150 Q296 158 292 172" strokeWidth={2.4} />
      <L d="M290 138 Q312 152 304 178" strokeWidth={2.4} />
      <Note x={78} y={150} />
      <Note x={330} y={122} s={0.8} />
      <Note x={352} y={180} s={0.6} />
      <Spark x={110} y={110} s={0.7} />
      <Spark x={318} y={70} s={0.9} />
      <L d="M30 216 Q70 208 110 216 T190 216 T270 216 T350 216 T430 216" strokeWidth={2.4} />
    </>
  );
}

function Fade() {
  const stripes = [0, 1, 2, 3, 4, 5].map((i) => {
    const y = 74 + i * 20;
    return `M58 ${y + 10} L88 ${y - 6} L88 ${y + 4} L58 ${y + 20} Z`;
  });
  return (
    <>
      {/* barber pole */}
      <F d="M73 32 a8 8 0 1 0 0.1 0" />
      <Rect x={48} y={44} width={50} height={14} rx={7} fill={INK} />
      <Rect x={56} y={58} width={34} height={132} rx={8} fill={CREAM} stroke={INK} strokeWidth={3} />
      {stripes.map((d, i) => <Path key={i} d={d} fill={i % 2 ? RUST : INK} />)}
      <Rect x={48} y={188} width={50} height={14} rx={7} fill={INK} />
      {/* clippers */}
      <G transform="rotate(-18 200 132)">
        <Rect x={170} y={82} width={60} height={108} rx={20} fill={CREAM} stroke={INK} strokeWidth={3.2} />
        <Rect x={173} y={70} width={54} height={15} rx={4} fill={INK} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <L key={i} d={`M${178 + i * 6.3} 70 L${178 + i * 6.3} 61`} strokeWidth={2.4} />)}
        <Rect x={193} y={116} width={14} height={28} rx={7} fill={INK} />
        <L d="M182 162 L218 162" strokeWidth={2.4} />
        <L d="M182 172 L218 172" strokeWidth={2.4} />
      </G>
      <L d="M214 192 Q222 222 256 214 T300 226" strokeWidth={2.8} />
      {/* freestyle mic */}
      <F d="M288 96 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0" />
      <L d="M292 88 Q310 80 328 88" strokeWidth={2.2} />
      <L d="M290 100 Q310 92 330 100" strokeWidth={2.2} />
      <L d="M310 75 L310 117" strokeWidth={2.2} />
      <Path d="M300 118 L320 118 L314 190 L306 190 Z" fill={INK} />
      <L d="M344 80 Q356 96 344 112" strokeWidth={2.8} />
      <L d="M356 68 Q376 96 356 124" strokeWidth={2.8} />
      {/* after dark */}
      <F d="M372 22 A18 18 0 1 0 386 58 A14 14 0 1 1 372 22 Z" />
      <Spark x={140} y={40} s={0.7} />
      <Spark x={256} y={44} s={0.55} />
      <Dots pts={[[122, 70], [262, 76], [360, 150], [130, 206]]} />
    </>
  );
}

function Pho() {
  return (
    <>
      {/* steam */}
      <L d="M150 98 Q138 82 150 66 T150 34" strokeWidth={2.8} opacity={0.9} />
      <L d="M182 94 Q170 76 182 60 T182 26" strokeWidth={2.8} opacity={0.9} />
      <L d="M258 96 Q246 80 258 64 T258 34" strokeWidth={2.8} opacity={0.9} />
      {/* chopsticks lifting noodles */}
      <L d="M338 24 L214 66" strokeWidth={5} />
      <L d="M352 38 L222 74" strokeWidth={5} />
      <L d="M214 68 Q206 84 216 96 Q224 106 214 118" strokeWidth={2.6} />
      <L d="M220 72 Q214 88 224 98 Q232 108 224 120" strokeWidth={2.6} />
      <L d="M226 74 Q222 90 232 100 Q240 110 234 120" strokeWidth={2.6} />
      {/* bowl */}
      <F d="M106 122 Q200 252 294 122 Z" />
      <Ellipse cx={200} cy={122} rx={94} ry={15} fill={PEACH} stroke={INK} strokeWidth={3} />
      <Ellipse cx={200} cy={123} rx={82} ry={9} fill={RUST} />
      <L d="M132 122 Q140 114 148 122 T164 122 T180 122" strokeWidth={2.2} stroke={CREAM} />
      <L d="M240 123 Q248 115 256 123 T272 123" strokeWidth={2.2} stroke={CREAM} />
      <L d="M150 160 Q200 176 250 160" strokeWidth={2.4} />
      <L d="M170 180 Q200 188 230 180" strokeWidth={2.4} />
      <Rect x={176} y={198} width={48} height={12} rx={5} fill={INK} />
      {/* herbs + lime */}
      <F d="M44 206 Q66 170 96 190 Q74 214 44 206 Z" />
      <L d="M50 204 Q70 194 90 190" strokeWidth={2} />
      <F d="M302 212 A28 28 0 0 1 358 212 Z" fill={PEACH} />
      <L d="M330 212 L330 188 M330 212 L314 194 M330 212 L346 194" strokeWidth={2} />
      <L d="M20 216 L380 216" strokeWidth={2.4} />
      <Spark x={86} y={60} s={0.7} />
      <Spark x={318} y={110} s={0.6} />
    </>
  );
}

function Run() {
  const rays = [-160, -135, -112, -90, -68, -45, -20].map((a) => {
    const r = (a * Math.PI) / 180;
    return `M${205 + 60 * Math.cos(r)} ${158 + 60 * Math.sin(r)} L${205 + 80 * Math.cos(r)} ${158 + 80 * Math.sin(r)}`;
  });
  return (
    <>
      <F d="M157 158 A48 48 0 0 1 253 158 Z" fill={PEACH} />
      {rays.map((d, i) => <L key={i} d={d} strokeWidth={3} />)}
      <L d="M0 158 Q100 148 200 158 T400 156" strokeWidth={2.8} />
      <L d="M0 186 Q80 166 150 186 T300 180 T400 184" strokeWidth={2.6} />
      {/* trees */}
      <L d="M56 152 L56 120" strokeWidth={3} />
      <F d="M40 110 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0" />
      <L d="M346 150 L346 124" strokeWidth={3} />
      <F d="M332 114 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0" />
      {/* the route */}
      <L d="M40 240 Q150 204 200 176" strokeWidth={2.6} strokeDasharray="6 9" />
      {/* running shoe */}
      <F d="M246 206 Q250 186 268 187 L286 197 Q302 199 316 201 Q328 204 324 213 L249 215 Q242 213 246 206 Z" />
      <Path d="M244 213 L326 213 Q326 222 318 222 L250 222 Q242 222 244 213 Z" fill={INK} />
      <L d="M268 190 L262 200 M276 194 L270 203 M284 198 L279 206" strokeWidth={2} />
      <L d="M214 196 L234 196 M206 206 L230 206 M218 216 L236 216" strokeWidth={2.4} />
      {/* jollof pot + steam */}
      <Path d="M68 190 L122 190 L117 220 Q95 230 73 220 Z" fill={RUST} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <L d="M62 190 L128 190" strokeWidth={3.4} />
      <L d="M62 198 Q54 198 56 206 M128 198 Q136 198 134 206" strokeWidth={2.6} />
      <L d="M84 178 Q78 168 84 158 T84 140" strokeWidth={2.4} />
      <L d="M104 178 Q98 168 104 158 T104 140" strokeWidth={2.4} />
      <Bird x={120} y={58} />
      <Bird x={276} y={42} />
    </>
  );
}

const Shoe = ({ t }: { t: string }) => (
  <G transform={t}>
    <F d="M10 30 L14 -10 Q16 -20 28 -20 L44 -20 Q50 -4 66 -2 Q96 2 112 12 Q124 18 124 30 Z" />
    <Path d="M6 30 L128 30 Q130 42 118 42 L12 42 Q4 42 6 30 Z" fill={INK} />
    <L d="M40 -6 L52 -14 M48 2 L60 -6 M56 8 L66 2" strokeWidth={2.2} />
    <L d="M28 16 Q66 22 100 8" stroke={RUST} strokeWidth={4.5} />
    <L d="M96 6 Q104 20 124 26" strokeWidth={2.2} />
  </G>
);

function Sneaker() {
  return (
    <>
      <F d="M54 22 A18 18 0 1 0 68 58 A14 14 0 1 1 54 22 Z" />
      <Spark x={116} y={36} s={0.6} />
      <Spark x={300} y={28} s={0.8} />
      <Spark x={352} y={62} s={0.5} />
      <Dots pts={[[160, 24], [236, 40], [96, 70]]} />
      <Shoe t="translate(40 118)" />
      <Shoe t="translate(360 118) scale(-1 1)" />
      {/* swap arrows */}
      <L d="M178 92 A26 26 0 0 1 222 92" strokeWidth={3.2} />
      <L d="M214 82 L223 93 L210 97" strokeWidth={3.2} />
      <L d="M222 128 A26 26 0 0 1 178 128" strokeWidth={3.2} />
      <L d="M186 138 L177 127 L190 123" strokeWidth={3.2} />
      {/* rooftop skyline */}
      <L d="M0 222 L36 222 L36 196 L66 196 L66 210 L96 210 L96 184 L128 184 L128 222 L160 222 L160 200 L200 200 L200 190 L236 190 L236 222 L266 222 L266 204 L300 204 L300 180 L330 180 L330 222 L400 222" strokeWidth={2.6} />
      <Rect x={104} y={194} width={7} height={7} fill={INK} />
      <Rect x={116} y={194} width={7} height={7} fill={INK} />
      <Rect x={308} y={190} width={7} height={7} fill={INK} />
      <Rect x={44} y={204} width={7} height={7} fill={INK} />
    </>
  );
}

function Harbor() {
  const wave = (y: number, o = 0) => `M${-20 + o} ${y} ${Array.from({ length: 12 }, (_, i) => `Q${-10 + o + i * 40} ${y - 10} ${o + i * 40} ${y} T${20 + o + i * 40} ${y}`).join(' ')}`;
  return (
    <>
      <F d="M310 52 a20 20 0 1 0 40 0 a20 20 0 1 0 -40 0" fill={PEACH} />
      <L d="M20 120 L20 92 L38 92 L38 74 L54 74 L54 120 M62 120 L62 84 L72 84 L72 64 L80 54 L88 64 L88 120 M96 120 L96 100 L118 100 L118 120 M126 120 L126 88 L142 88 L142 120" strokeWidth={2.4} />
      <L d="M236 124 L400 116" strokeWidth={4.5} />
      {[256, 290, 324, 358, 392].map((x) => <L key={x} d={`M${x} ${123 - (x - 236) * 0.05} L${x} 160`} strokeWidth={3.4} />)}
      <L d={wave(132)} strokeWidth={2.6} />
      <L d={wave(154, 20)} strokeWidth={2.6} />
      <L d={wave(176)} strokeWidth={2.2} opacity={0.8} />
      {/* oyster */}
      <F d="M128 196 Q150 140 214 150 Q224 172 216 198 Z" fill={PEACH} />
      <L d="M150 186 Q168 160 206 160 M144 194 Q166 172 212 176" strokeWidth={2} />
      <F d="M118 202 Q170 240 226 202 Q198 184 172 188 Q146 184 118 202 Z" />
      <L d="M140 206 Q170 222 204 206" strokeWidth={2} />
      <F d="M163 197 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0" />
      <Spark x={196} y={188} s={0.6} />
      <Bird x={186} y={60} />
      <Bird x={236} y={84} />
      <L d="M296 212 l12 -24 l12 24 z" strokeWidth={2.6} fill={CREAM} />
      <L d="M302 200 L314 200" strokeWidth={2} />
    </>
  );
}

function Zine() {
  return (
    <>
      <G transform="rotate(7 150 120)">
        <Rect x={74} y={56} width={150} height={118} rx={4} fill={PEACH} stroke={INK} strokeWidth={3} />
      </G>
      <G transform="rotate(-8 150 120)">
        <Rect x={70} y={60} width={150} height={118} rx={4} fill={CREAM} stroke={INK} strokeWidth={3} />
        <L d="M88 82 L170 82 M88 96 L150 96 M88 110 L160 110" strokeWidth={2.4} />
        <Path d="M150 124 l7 15 l16 2 l-12 11 l3 16 l-14 -8 l-14 8 l3 -16 l-12 -11 l16 -2 z" fill={INK} />
        <L d="M88 150 Q104 136 120 150 T152 150" strokeWidth={2.4} />
      </G>
      {/* scissors */}
      <L d="M272 170 L326 66" strokeWidth={5} />
      <L d="M320 170 L268 66" strokeWidth={5} />
      <Circle cx={296} cy={120} r={4.5} fill={INK} />
      <Circle cx={262} cy={186} r={17} fill="none" stroke={INK} strokeWidth={4.2} />
      <Circle cx={330} cy={186} r={17} fill="none" stroke={INK} strokeWidth={4.2} />
      <L d="M34 214 Q120 190 214 212" strokeWidth={2.4} strokeDasharray="8 7" />
      <L d="M30 42 l10 -10 l10 10 l10 -10 l10 10" strokeWidth={2.6} />
      <L d="M350 34 l8 -8 l8 8 l8 -8" strokeWidth={2.6} />
      <Spark x={240} y={40} s={0.7} />
      <Spark x={372} y={120} s={0.55} />
      <Dots pts={[[54, 116], [368, 206], [226, 200]]} />
    </>
  );
}

function Karaoke() {
  return (
    <>
      <F d="M166 92 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0" />
      <L d="M172 80 Q200 70 228 80 M168 96 Q200 86 232 96 M176 110 Q200 102 224 110 M200 58 L200 126" strokeWidth={2.2} />
      <Rect x={176} y={122} width={48} height={13} rx={4} fill={INK} />
      <Path d="M186 135 L214 135 L206 214 L194 214 Z" fill={INK} />
      <L d="M200 214 Q204 230 230 228 T290 236" strokeWidth={2.8} />
      <L d="M252 66 Q266 92 252 118 M264 54 Q286 92 264 130" strokeWidth={2.8} />
      <L d="M148 66 Q134 92 148 118 M136 54 Q114 92 136 130" strokeWidth={2.8} />
      <Note x={70} y={110} />
      <Note x={330} y={168} s={0.85} />
      <Note x={96} y={196} s={0.6} />
      <Spark x={330} y={60} s={0.9} />
      <Spark x={60} y={46} s={0.6} />
      <Dots pts={[[286, 196], [120, 150], [360, 110]]} />
    </>
  );
}

const ART: Record<string, () => React.JSX.Element> = {
  salsa: Salsa, fade: Fade, pho: Pho, run: Run, sneaker: Sneaker, harbor: Harbor, zine: Zine, mine: Karaoke,
};

export function hasDoodle(id: string) {
  return !!ART[id];
}

export function Doodle({ id }: { id: string }) {
  const Art = ART[id] || Karaoke;
  return (
    <Svg width="100%" height="100%" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
      <Bg id={id} />
      <Art />
    </Svg>
  );
}
