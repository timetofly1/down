/**
 * Additions beyond the prototype:
 *   OsmMap     real OpenStreetMap Boston (pre-rendered in brand colors), drag to pan
 *   LockScreen swipe up to open (the prototype only had a tap target)
 *   Confetti   bursts when a plan is booked or goes "It's on."
 */
import React, { useEffect, useRef, useState } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDecay, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { LABELS, MAP, MAP_IMG, project } from './geo';
import { useDown } from './store';
import { T, V } from './ui';

const clamp = (v: number, lo: number, hi: number) => {
  'worklet';
  return Math.min(hi, Math.max(lo, v));
};

export function OsmMap({ children }: { vm?: any; children?: React.ReactNode }) {
  const [vp, setVp] = useState<{ w: number; h: number } | null>(null);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const sx = useSharedValue(0);
  const sy = useSharedValue(0);
  const lim = useSharedValue({ minX: 0, minY: 0 });

  useEffect(() => {
    if (!vp) return;
    // Start centered on the plans: Roxbury / Dorchester, a bit above the bottom sheet.
    const c = project(42.3235, -71.0655);
    const minX = Math.min(0, vp.w - MAP.w);
    const minY = Math.min(0, vp.h - MAP.h);
    lim.value = { minX, minY };
    tx.value = clamp(vp.w / 2 - c.x, minX, 0);
    ty.value = clamp(vp.h * 0.45 - c.y, minY, 0);
  }, [vp, tx, ty, lim]);

  const pan = usePanGesture({
    minDistance: 6,
    onBegin: () => {
      'worklet';
      sx.value = tx.value;
      sy.value = ty.value;
    },
    onUpdate: (e: any) => {
      'worklet';
      tx.value = clamp(sx.value + e.translationX, lim.value.minX, 0);
      ty.value = clamp(sy.value + e.translationY, lim.value.minY, 0);
    },
    onDeactivate: (e: any) => {
      'worklet';
      tx.value = withDecay({ velocity: e.velocityX ?? 0, clamp: [lim.value.minX, 0] });
      ty.value = withDecay({ velocity: e.velocityY ?? 0, clamp: [lim.value.minY, 0] });
    },
  } as any);

  const layer = useAnimatedStyle(() => ({ transform: [{ translateX: tx.value }, { translateY: ty.value }] }));

  return (
    <View style={StyleSheet.absoluteFill} onLayout={(e) => setVp({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[{ position: 'absolute', left: 0, top: 0, width: MAP.w, height: MAP.h }, layer]}>
          <Image source={MAP_IMG} style={{ position: 'absolute', left: 0, top: 0, width: MAP.w, height: MAP.h }} resizeMode="stretch" />
          {LABELS.map(([t, la, ln, ink]) => {
            const p = project(la, ln);
            return (
              <V key={t} s={`position:absolute;left:${p.x}px;top:${p.y}px;font:600 10px 'Geist Mono',monospace;letter-spacing:.14em;color:${ink ? '#15120F' : 'rgba(21,18,15,.55)'};pointer-events:none`}>
                <TLabel>{t}</TLabel>
              </V>
            );
          })}
          {children}
        </Animated.View>
      </GestureDetector>
      <Text pointerEvents="none" style={styles.attr}>
        © OpenStreetMap contributors · OpenFreeMap
      </Text>
    </View>
  );
}

// Map labels render through the shared text engine so they use Geist Mono.
const TLabel = ({ children }: { children: React.ReactNode }) => <T s="white-space:nowrap">{children}</T>;

const styles = StyleSheet.create({
  attr: {
    position: 'absolute', right: 16, top: 148, fontSize: 9, color: 'rgba(21,18,15,.6)',
    fontFamily: 'Geist500', letterSpacing: 0.2,
  },
});

// ---------------------------------------------------------------------------
// Lock screen: swipe up (or tap "Swipe up to open")
// ---------------------------------------------------------------------------
export function LockScreen({ s, onUnlock, children }: { s: string; onUnlock: () => void; screen?: string; children?: React.ReactNode }) {
  const dy = useSharedValue(0);
  const pan = usePanGesture({
    minDistance: 10,
    onUpdate: (e: any) => {
      'worklet';
      dy.value = Math.min(0, e.translationY);
    },
    onDeactivate: (e: any) => {
      'worklet';
      if (e.translationY < -70 || (e.velocityY ?? 0) < -800) {
        dy.value = withTiming(-900, { duration: 320, easing: Easing.bezier(0.2, 0.9, 0.2, 1) });
        scheduleOnRN(onUnlock);
      } else dy.value = withTiming(0, { duration: 250 });
    },
  } as any);
  const lockShow = /display:flex/.test(s);
  useEffect(() => {
    if (lockShow) dy.value = 0;
  }, [lockShow, dy]);
  const astyle = useAnimatedStyle(() => ({ transform: [{ translateY: dy.value }] }));
  return (
    <V s={s} gesture={pan} astyle={astyle} screen="00 Lock screen">
      {children}
    </V>
  );
}

// ---------------------------------------------------------------------------
// Confetti
// ---------------------------------------------------------------------------
const COLORS = ['#15120F', '#FFFDF8', '#FF5A1F', '#FFB38F', '#C2410C', '#1F6F5C', '#FFE4D6'];
type Burst = { id: number; x: number; y: number; n: number; up: number };

function rand(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Piece({ b, i, p }: { b: Burst; i: number; p: any }) {
  const r = rand(b.id * 1000 + i);
  const ang = (-90 + (r() - 0.5) * 150) * (Math.PI / 180);
  const sp = (380 + r() * 620) * b.up;
  const vx = Math.cos(ang) * sp;
  const vy = Math.sin(ang) * sp;
  const spin = (r() - 0.5) * 1400;
  const wob = 6 + r() * 14;
  const wf = 4 + r() * 6;
  const w = 6 + r() * 6;
  const h = r() < 0.35 ? w : 9 + r() * 8;
  const round = h === w;
  const color = COLORS[Math.floor(r() * COLORS.length)];
  const D = 2.8;
  const style = useAnimatedStyle(() => {
    const t = p.value * D;
    const drag = 1 - Math.min(0.55, t * 0.22);
    const x = b.x + vx * t * drag + Math.sin(t * wf) * wob;
    const y = b.y + vy * t * drag + 0.5 * 1500 * t * t;
    return {
      opacity: p.value > 0.78 ? (1 - p.value) / 0.22 : 1,
      transform: [{ translateX: x }, { translateY: y }, { rotate: `${spin * t}deg` }, { scaleX: Math.cos(t * wf * 1.3) }],
    };
  });
  return (
    <Animated.View
      style={[{ position: 'absolute', left: -w / 2, top: -h / 2, width: w, height: h, borderRadius: round ? w / 2 : 1.5, backgroundColor: color, borderWidth: color === '#FFFDF8' ? 0.6 : 0, borderColor: 'rgba(21,18,15,.25)' }, style]}
    />
  );
}

function BurstView({ b, onDone }: { b: Burst; onDone: (id: number) => void }) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withTiming(1, { duration: 2800, easing: Easing.linear });
    const t = setTimeout(() => onDone(b.id), 2900);
    return () => clearTimeout(t);
  }, [b.id, p, onDone]);
  return <>{Array.from({ length: b.n }, (_, i) => <Piece key={i} b={b} i={i} p={p} />)}</>;
}

export function Confetti() {
  const onOpen = useDown((s) => s.onOpen);
  const lockStep = useDown((s) => s.lockStep);
  const key = useDown((s) => (s as any).confettiKey as number);
  const [size, setSize] = useState({ w: 390, h: 844 });
  const [bursts, setBursts] = useState<Burst[]>([]);
  const prev = useRef({ onOpen, lockStep, key });
  const seq = useRef(1);

  const fire = (x: number, y: number, n: number, up = 1) => setBursts((bs) => [...bs, { id: seq.current++, x, y, n, up }]);

  useEffect(() => {
    const was = prev.current;
    // "It's on." screen opening: big pop over the headline.
    if (onOpen && !was.onOpen) {
      setTimeout(() => fire(size.w * 0.3, 190, 90), 260);
      setTimeout(() => fire(size.w * 0.72, 210, 70), 420);
    }
    // A booking: lock-in confirmed ("You're backer #N.").
    if (lockStep === 'done' && was.lockStep !== 'done') fire(size.w / 2, size.h - 330, 110);
    // Tap the "It's on." headline to replay.
    if (key !== was.key) fire(size.w / 2, 200, 120);
    prev.current = { onOpen, lockStep, key };
  }, [onOpen, lockStep, key, size]);

  const done = React.useCallback((id: number) => setBursts((bs) => bs.filter((b) => b.id !== id)), []);

  return (
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { zIndex: 100, overflow: 'hidden' }, Platform.OS === 'web' ? ({ borderRadius: 54 } as any) : null]}
      onLayout={(e) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
    >
      {bursts.map((b) => <BurstView key={b.id} b={b} onDone={done} />)}
    </View>
  );
}
