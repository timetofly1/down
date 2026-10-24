/**
 * App state + actions, ported 1:1 from the prototype's logic class
 * (same field names, same timings) so every tab shares one store.
 */
import { createRef } from 'react';
import { create } from 'zustand';
import { PLANS, type Plan } from './data';

/** Where the app opens: 'lockscreen' (spec's demo entry), 'onboarding', or a tab. */
export type Start = 'lockscreen' | 'onboarding' | 'swipe' | 'map' | 'squad' | 'host';
export const START = 'lockscreen' as Start;

export const detailRef = createRef<any>();
export const chatRef = createRef<any>();
/** Card-deck animation hook, registered by <DeckProvider>. */
export const deckApi: { fly: (dir: 'down' | 'nah') => void } = { fly: () => {} };

const TABS = ['swipe', 'map', 'squad', 'host'];

export const initialState = {
  plans: PLANS as Plan[],
  goingOpen: false,
  tab: (TABS.includes(START) ? START : 'swipe') as string,
  onb: (START === 'onboarding' ? 0 : null) as number | null,
  lockScreen: START === 'lockscreen',
  vibes: {} as Record<string, boolean>,
  hoodPick: {} as Record<string, boolean>,
  profOpen: false,
  inboxOpen: false,
  readAll: false,
  hit: {} as Record<string, boolean>,
  pitchOpen: false,
  pitchStep: 0,
  pitch: {
    title: 'Karaoke in Chinatown after finals', hood: 'Chinatown', when: 'Fri 9pm', goal: 12, entry: 'Free',
    closes: '5 days', q: 'Which spot?', opts: ['Private room on Tyler St', 'Bar with a stage', "Dev's apartment"],
  },
  pitched: false,
  filter: 'all',
  swiped: {} as Record<string, string>,
  extra: {} as Record<string, number>,
  downSet: {} as Record<string, boolean>,
  toast: null as any,
  toastOn: false,
  detailId: 'salsa',
  detailOpen: false,
  follow: {} as Record<string, boolean>,
  votes: {} as Record<string, number>,
  lockId: 'fade',
  lockOpen: false,
  lockTier: 'paid',
  lockStep: 'choose',
  locked: {} as Record<string, string>,
  onId: 'salsa',
  onOpen: false,
  mapSel: 'salsa',
  mapFilter: 'all',
  sent: [] as any[],
  squadVote: null as string | null,
  draft: '',
  range: 'week',
  calView: 'week',
  calSel: '2026-11-05',
  calWs: '2026-11-02',
  calYM: [2026, 10] as [number, number],
  confettiKey: 0,
};

export type State = typeof initialState;

type Actions = {
  set: (patch: Partial<State> | ((s: State) => Partial<State>)) => void;
  P: (id: string) => Plan;
  cnt: (p: Plan) => number;
  facts: (p: Plan) => any;
  showToast: (t: any) => void;
  markDown: (id: string, toast: boolean) => void;
  liveJoin: (id: string) => void;
  goalHit: (id: string) => void;
  submitPitch: () => void;
  commitSwipe: (id: string, dir: string) => void;
  openDetail: (id: string) => void;
  openLock: (id: string, tier?: string) => void;
  confirmLock: () => void;
  share: (id: string) => void;
  sendDraft: () => void;
};

let toastTimer: any;
let bannerTimer: any;
const scrollChatToEnd = () => setTimeout(() => chatRef.current?.scrollToEnd?.({ animated: false }), 60);

export type Store = State & Actions;

export const useDown = create<Store>((set, get) => ({
  ...initialState,
  set: (patch) => set(patch as any),

  P: (id) => get().plans.find((p) => p.id === id)!,
  cnt: (p) => p.down + (get().extra[p.id] || 0),
  facts: (p) => {
    const n = get().cnt(p);
    const need = Math.max(0, p.goal - n);
    return {
      n, need, pct: Math.min(100, (n / p.goal) * 100) + '%', countLabel: `${n} of ${p.goal} down`,
      needLabel: need > 0 ? `${need} more and it happens` : "it's on",
      priceLabel: p.price ? `$${p.price} early-bird` : 'Free', hoodCaps: p.hood.toUpperCase(),
    };
  },
  showToast: (t) => {
    clearTimeout(toastTimer);
    set({ toast: t, toastOn: true });
    toastTimer = setTimeout(() => set({ toastOn: false }), 2600);
  },
  markDown: (id, toast) => {
    const g = get();
    if (g.downSet[id]) return;
    const p = g.P(id);
    const n = g.cnt(p) + 1;
    const need = Math.max(0, p.goal - n);
    set((s) => ({ extra: { ...s.extra, [id]: (s.extra[id] || 0) + 1 }, downSet: { ...s.downSet, [id]: true } }));
    if (toast) {
      const f = Math.min(1, n / p.goal);
      g.showToast({
        title: need > 0 ? "You're down." : "That's the goal.",
        sub: need > 0 ? `${need} more and it happens` : 'It just became a real event.',
        badge: `${Math.round(f * 100)}%`,
        ring: `conic-gradient(#FF5A1F ${f * 360}deg, rgba(244,239,230,.18) 0)`,
      });
    }
    if (need === 0) setTimeout(() => get().goalHit(id), toast ? 700 : 900);
    else if (need === 1 && id === 'salsa') setTimeout(() => get().liveJoin(id), 1700);
  },
  liveJoin: (id) => {
    const p = get().P(id);
    set((s) => ({ extra: { ...s.extra, [id]: (s.extra[id] || 0) + 1 } }));
    get().showToast({ title: 'Ama just got down.', sub: `That's ${p.goal}. It's happening.`, badge: '100%', ring: '#FF5A1F' });
    setTimeout(() => get().goalHit(id), 1100);
  },
  goalHit: (id) => {
    clearTimeout(bannerTimer);
    set((s) => ({ hit: { ...s.hit, [id]: true }, toastOn: false }));
    bannerTimer = setTimeout(() => set({ onId: id, onOpen: true, lockOpen: false, detailOpen: false }), 900);
  },
  submitPitch: () => {
    const t = get().pitch;
    const price = t.entry === 'Free' ? 0 : parseInt(t.entry.slice(1), 10);
    const when: Record<string, string> = { 'Fri 9pm': 'Fri, Nov 13', 'Sat 9pm': 'Sat, Nov 14', 'Sun 2pm': 'Sun, Nov 15' };
    const plan: Plan = {
      id: 'mine', cat: 'friend', tag: 'SQUAD PITCH', hood: t.hood, title: t.title, host: 'Yara Okafor', hostAv: 'YO',
      hostColor: '#15120F', role: 'Friend', hosted: 'First pitch', when: when[t.when], time: t.when.split(' ')[1] + ' – late',
      short: t.when, place: t.hood, transit: 'Pitched in the dot squad', price, door: price ? price + 5 : 0, goal: t.goal,
      down: 1, friends: [], more: 0, closes: t.closes, newTo: 0, x: '40%', y: '27%', label: 'Yours', ph: 'Drop a photo for your plan',
      blurb: 'Pitched in the dot squad. If enough people are down, it turns into a real plan with spots.',
      polls: [{ q: t.q, o: t.opts.filter(Boolean).map((o) => [o, 0] as [string, number]) }],
    };
    set((s) => ({
      plans: [plan, ...s.plans.filter((p) => p.id !== 'mine')],
      pitchOpen: false, pitched: true, tab: 'squad',
      downSet: { ...s.downSet, mine: true }, swiped: { ...s.swiped, mine: 'down' },
      sent: [...s.sent, { type: 'plan', who: 'You', planId: 'mine' }],
    }));
    get().showToast({ title: 'Pitched to the dot squad', sub: `${t.goal - 1} more and it happens`, badge: '1', ring: '#FF5A1F' });
    scrollChatToEnd();
    setTimeout(() => {
      set((s) => ({
        extra: { ...s.extra, mine: (s.extra.mine || 0) + 1 },
        sent: [...s.sent, { type: 'text', who: 'Priya', text: "wait i'm so down. tyler st room is the move" }],
      }));
      scrollChatToEnd();
    }, 1800);
  },
  commitSwipe: (id, dir) => {
    set((s) => ({ swiped: { ...s.swiped, [id]: dir } }));
    if (dir === 'down') get().markDown(id, true);
  },
  openDetail: (id) => {
    set({ detailId: id, detailOpen: true });
    detailRef.current?.scrollTo?.({ y: 0, animated: false });
  },
  openLock: (id, tier) => {
    const p = get().P(id);
    set({ lockId: id, lockOpen: true, lockStep: 'choose', lockTier: tier || (p.price ? 'paid' : 'free') });
  },
  confirmLock: () => {
    if (get().lockStep !== 'choose') return;
    const id = get().lockId;
    set({ lockStep: 'paying' });
    setTimeout(() => {
      set((s) => ({ lockStep: 'done', locked: { ...s.locked, [id]: s.lockTier } }));
      const g = get();
      if (!g.downSet[id]) g.markDown(id, false);
      else {
        const p = g.P(id);
        if (g.cnt(p) >= p.goal) setTimeout(() => get().goalHit(id), 900);
      }
    }, 1100);
  },
  share: (id) => {
    set((s) => ({ sent: [...s.sent, { type: 'plan', who: 'You', planId: id }], tab: 'squad', detailOpen: false, lockOpen: false, onOpen: false }));
    get().showToast({ title: 'Sent to the dot squad', sub: 'Priya, Jay and Dev can swipe on it', badge: '3', ring: '#FF5A1F' });
    scrollChatToEnd();
  },
  sendDraft: () => {
    const t = get().draft.trim();
    if (!t) return;
    set((s) => ({ sent: [...s.sent, { type: 'text', who: 'You', text: t }], draft: '' }));
    scrollChatToEnd();
  },
}));

// Dev-only test hook (web): lets screenshot scripts jump to any screen.
if (__DEV__ && typeof window !== 'undefined') (window as any).__down = useDown;

/** Id of the card on top of the deck (prototype's `this._top`). */
export function topId(s: State): string | undefined {
  const pool = s.plans.filter((p) => s.filter === 'all' || p.cat === s.filter);
  return pool.find((p) => !s.swiped[p.id])?.id;
}
