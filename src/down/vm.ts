/**
 * View model: everything the generated screens bind to as `vm.*`.
 * A line-for-line port of the prototype's renderVals(), so labels, counts and
 * colors come out identical. Transforms use '%'/px units consistently so the
 * CSS transitions can interpolate them.
 */
import { CAL_EVENTS, CHIP_DEFS, PEOPLE, type Plan } from './data';
import { HOOD_LL, PLAN_LL, project, YOU_LL } from './geo';
import { chatRef, deckApi, detailRef, topId, type Store } from './store';

const VIBES = ['Late nights', 'Food', 'Live music', 'Dancing', 'Outdoors', 'Art & making', 'Sports', 'Causes', 'Markets', 'Comedy'];
const HS = [
  { n: 'Nubian Square', why: 'Salsa, live bands, late cafés', v: ['Dancing', 'Live music', 'Late nights'], meta: '3 PLANS THIS WEEK · SILVER LINE 18 MIN' },
  { n: 'East Boston', why: 'Harbor walks, taquerías, cleanups', v: ['Outdoors', 'Causes', 'Food'], meta: '2 PLANS THIS WEEK · BLUE LINE 31 MIN' },
  { n: 'Chinatown', why: 'Night markets, karaoke, swaps', v: ['Late nights', 'Markets', 'Food', 'Comedy'], meta: '4 PLANS THIS WEEK · ORANGE LINE 20 MIN' },
  { n: 'Franklin Park', why: 'Run clubs, pickup games', v: ['Sports', 'Outdoors'], meta: '2 PLANS THIS WEEK · ORANGE LINE 24 MIN' },
  { n: 'Jamaica Plain', why: 'Zine fairs, pond loops, open mics', v: ['Art & making', 'Outdoors', 'Comedy'], meta: '3 PLANS THIS WEEK · ORANGE LINE 22 MIN' },
];
const STAMPS: [string, string, string, string, number][] = [
  ['FIELDS CORNER', 'Free cuts', 'OCT 24', '#15120F', -8], ['CODMAN SQ', 'Zine night', 'OCT 15', '#1F3B8A', 6],
  ['SAVIN HILL', 'Beach bonfire', 'SEP 27', '#7A1E00', -3], ['CHINATOWN', 'Night market', 'OCT 3', '#1F6F5C', 9],
  ['JAMAICA PLAIN', 'Pond run', 'SEP 14', '#5B2A86', -11],
];

const YOU = project(YOU_LL[0], YOU_LL[1]);

/** Deterministic fake QR (21x21 with 3 finder squares), same seed as the prototype. */
const QR: string[] = (() => {
  let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const finder = (r: number, c: number) => {
    for (const [a, b] of [[0, 0], [0, 14], [14, 0]]) {
      if (r >= a && r < a + 7 && c >= b && c < b + 7) {
        const rr = r - a, cc = c - b;
        return rr === 0 || rr === 6 || cc === 0 || cc === 6 || (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4) ? 1 : 0;
      }
    }
    return -1;
  };
  const out: string[] = [];
  for (let r = 0; r < 21; r++) for (let c = 0; c < 21; c++) {
    const fv = finder(r, c);
    out.push((fv === -1 ? rnd() > 0.52 : fv === 1) ? '#15120F' : 'transparent');
  }
  return out;
})();

export function buildVM(st: Store) {
  const s = st;
  const set = st.set;
  const P = (id: string): Plan => st.P(id);
  const facts = (p: Plan) => st.facts(p);
  const cnt = (p: Plan) => st.cnt(p);
  const plans: Plan[] = s.plans;
  const people = PEOPLE as any;

  // ---- swipe deck ----
  const pool = plans.filter((p) => s.filter === 'all' || p.cat === s.filter);
  const rem = pool.filter((p) => !s.swiped[p.id]);
  const top = topId(s);
  const cards = plans.map((p) => {
    const r = rem.indexOf(p), f = facts(p);
    const fr = p.friends.map((n) => people[n]);
    return {
      ...p, ...f, r, top, display: r >= 0 && r <= 2 ? 'block' : 'none', z: r === 0 ? 3 : r === 1 ? 2 : r === 2 ? 1 : 0,
      transform: 'none', transition: 'none', stampDown: 0, stampNah: 0,
      friendAvs: fr, ticketNo: 'No. ' + String(f.n + 1).padStart(3, '0'), entry: p.price ? '$' + p.price : 'Free',
      friendsLabel: p.friends.length ? `${p.friends.join(', ')}${p.more ? ' +' + p.more : ''} ${p.friends.length + p.more > 1 ? 'are' : 'is'} down` : 'Be the first of your friends',
    };
  });
  const chips = CHIP_DEFS.map(([k, l]) => ({
    label: l, bg: s.filter === k ? '#15120F' : 'rgba(255,253,248,.2)', col: s.filter === k ? '#F4EFE6' : '#15120F',
    border: s.filter === k ? '#15120F' : 'rgba(255,255,255,.42)', onTap: () => set({ filter: k }),
  }));

  // ---- detail ----
  const dp = P(s.detailId), df = facts(dp);
  const stageIdx = df.n >= dp.goal ? 2 : df.n / dp.goal >= 0.5 ? 1 : 0;
  const isDown = !!s.downSet[dp.id], isLocked = !!s.locked[dp.id];
  const who = [...dp.friends, ...['Ama', 'Luis', 'Mei', 'Kofi'].filter((n) => !dp.friends.includes(n))];
  const whoAvs = (isDown ? ['You', ...who] : who).slice(0, 5).map((n) => people[n]);
  const named = isDown ? ['You', ...dp.friends] : dp.friends;
  const tiersFor = (p: Plan) => p.price
    ? [{ k: 'free', label: 'Free RSVP', sub: 'Hold a spot. Release it anytime before the day.', price: '$0' }, { k: 'paid', label: `Early-bird · $${p.price}`, sub: `$${p.door} at the door. You're only charged if it happens.`, price: `$${p.price}` }]
    : [{ k: 'free', label: 'Free RSVP', sub: 'Hold a spot. Release it anytime before the day.', price: '$0' }, { k: 'paid', label: 'Back the host · $5', sub: "Goes straight to the host. Refunded if it doesn't happen.", price: '$5' }];
  const d = {
    ...dp, ...df, count: df.n, hostColor: dp.hostColor,
    followLabel: s.follow[dp.id] ? 'Following' : 'Follow', followBg: s.follow[dp.id] ? '#15120F' : 'transparent', followCol: s.follow[dp.id] ? '#F4EFE6' : '#15120F',
    stageFill: (stageIdx / 3) * 100 + '%',
    stages: ['Pitched', 'Heating up', "It's on", 'Happened'].map((l, i) => ({
      l, ring: i <= stageIdx ? '#FF5A1F' : 'rgba(21,18,15,.18)', dot: i < stageIdx ? '#FF5A1F' : '#FFFDF8',
      glow: i === stageIdx ? '0 0 0 5px rgba(255,90,31,.2)' : 'none', col: i === stageIdx ? '#15120F' : 'rgba(21,18,15,.5)', w: i === stageIdx ? '700' : '500',
    })),
    needLabel: df.need > 0 ? `${df.need} more and it happens` : "Goal hit. It's a real event now.",
    whoAvs, whoLabel: named.length ? `${named.join(', ')} and ${df.n - named.length} others` : `${df.n} people so far`,
    newLabel: dp.newTo ? `${dp.newTo + (isDown ? 1 : 0)} people backing this have never been to ${dp.hood}.` : 'Fresh pitch. Share it with your people to get it moving.',
    polls: dp.polls.map((pl, qi) => {
      const key = dp.id + qi, mine = s.votes[key], voted = mine != null;
      const tot = pl.o.reduce((a, o) => a + o[1], 0) + (voted ? 1 : 0);
      return {
        q: pl.q, total: `${tot} votes`,
        opts: pl.o.map(([t, v], oi) => {
          const vv = v + (mine === oi ? 1 : 0);
          return {
            t, pct: voted ? Math.round((vv / tot) * 100) + '%' : '', w: voted ? (vv / tot) * 100 + '%' : '0%',
            fill: mine === oi ? 'rgba(255,90,31,.28)' : 'rgba(21,18,15,.07)', border: mine === oi ? '#FF5A1F' : 'rgba(21,18,15,.1)',
            onTap: () => set((x) => ({ votes: { ...x.votes, [key]: oi } })),
          };
        }),
      };
    }),
    tiers: tiersFor(dp).map((t) => ({ ...t, onTap: () => st.openLock(dp.id, t.k) })),
    priceBig: dp.price ? `$${dp.price}` : 'Free', priceSmall: dp.price ? `$${dp.door} at the door` : 'RSVP to hold a spot',
    ctaLabel: isLocked ? "You're locked in" : isDown ? 'Lock it in' : "I'm down", ctaBg: isLocked ? '#15120F' : '#FF5A1F', ctaCol: isLocked ? '#F4EFE6' : '#15120F',
    onCta: () => {
      if (isLocked) return;
      if (!isDown) {
        st.markDown(dp.id, true);
        set((x) => ({ swiped: { ...x.swiped, [dp.id]: 'down' } }));
      } else st.openLock(dp.id);
    },
  };
  const heroes = plans.map((p) => ({ id: p.id, ph: p.ph, display: p.id === s.detailId ? 'block' : 'none' }));

  // ---- lock it in ----
  const lp = P(s.lockId), lf = facts(lp);
  const lt = tiersFor(lp).find((t) => t.k === s.lockTier) || tiersFor(lp)[0];
  const backer = cnt(lp);
  const lk = {
    title: lp.title,
    tiers: tiersFor(lp).map((t) => {
      const sel = t.k === s.lockTier;
      return { ...t, border: sel ? '#15120F' : 'rgba(21,18,15,.12)', bg: sel ? '#F4EFE6' : '#FFFDF8', radio: sel ? '#15120F' : 'rgba(21,18,15,.3)', dot: sel ? '#FF5A1F' : 'transparent', onTap: () => set({ lockTier: t.k }) };
    }),
    terms: lt.k === 'paid'
      ? `Your card is held, not charged. If ${lp.goal} people aren't down by the time it closes, nothing happens and you pay nothing.`
      : `No card needed. We'll ping you when it hits ${lp.goal} and your spot turns into a ticket.`,
    cta: s.lockStep === 'paying' ? 'Locking in…' : lt.k === 'paid' ? `Pledge ${lt.price} with Apple Pay` : 'Hold my spot',
    doneTitle: `You're backer #${backer}.`,
    doneSub: lf.need > 0 ? `${lf.need} more and ${lp.title} is on. Bring your people and it gets there faster.` : `That's the goal. ${lp.title} is happening.`,
  };

  // ---- it's on ----
  const op = P(s.onId), of = facts(op), tier = s.locked[op.id];
  const on = {
    title: op.title, when: `${op.when} · ${op.short.split(' ').pop()}`, place: op.place, goalLine: `${of.n} OF ${op.goal} DOWN · GOAL HIT`,
    ticketNo: `TICKET ${String(of.n).padStart(2, '0')}/${op.goal}`,
    sub: `${op.goal} people said they were down, so ${op.host.split(' ')[0]} is making it real. Your spot is a ticket now.`,
    tier: tier === 'paid' ? 'Early-bird' : 'Free RSVP',
    charge: tier === 'paid' ? `$${op.price || 5} charged now that it's on. Receipt in your inbox.` : 'No charge. Show this at the door.',
  };

  // ---- map ----
  const visited = ['Fields Corner', 'Codman Square'];
  const pins = plans.map((p) => {
    const f = facts(p), sel = p.id === s.mapSel, deg = Math.min(1, f.n / p.goal) * 360;
    const dim = s.mapFilter === 'new' ? visited.includes(p.hood) : s.mapFilter === 'close' ? f.need > 15 : false;
    const ll = PLAN_LL[p.id] || HOOD_LL[p.hood] || HOOD_LL.Chinatown;
    const at = project(ll[0], ll[1]);
    return {
      x: `${at.x}px`, y: `${at.y}px`, label: p.label, count: f.need > 0 ? f.n : 'ON', scale: sel ? 1.22 : 1, op: dim ? 0.3 : 1, z: sel ? 5 : 1,
      ring: `conic-gradient(#15120F ${deg}deg, rgba(255,253,248,.92) 0)`, inner: sel ? '#15120F' : '#FFFDF8', innerCol: sel ? '#FFFDF8' : '#15120F',
      onTap: () => set({ mapSel: p.id }),
    };
  });
  const mp = P(s.mapSel), mDown = !!s.downSet[mp.id];
  const ms = { ...mp, ...facts(mp), downLabel: mDown ? "You're down" : "I'm down", downBg: mDown ? 'rgba(21,18,15,.08)' : '#FF5A1F' };
  const mapChips = [['all', 'Everything'], ['new', 'New to you'], ['close', 'Almost there']].map(([k, l]) => ({
    label: l, bg: s.mapFilter === k ? '#15120F' : 'rgba(255,253,248,.55)', col: s.mapFilter === k ? '#F4EFE6' : '#15120F', onTap: () => set({ mapFilter: k }),
  }));
  const mapThumbs = plans.map((p) => ({ id: p.id, display: p.id === s.mapSel ? 'block' : 'none' }));

  // ---- squad ----
  const base = [
    { type: 'text', who: 'Priya', text: 'ok who is actually coming out this week' }, { type: 'plan', who: 'Jay', planId: 'fade' },
    { type: 'text', who: 'Jay', text: 'marcus cut my hair for 3 years. this is gonna be a movie' }, { type: 'poll', who: 'down.' },
    { type: 'text', who: 'Dev', text: "never been to fields corner tbh. i'm down" },
  ];
  const msgs = [...base, ...s.sent].map((m: any) => {
    const me = m.who === 'You', pp = m.planId ? P(m.planId) : null, pf = pp ? facts(pp) : null, person = people[m.who] || { i: 'd.', c: '#FF5A1F' };
    return {
      ...m, isText: m.type === 'text', isPlan: m.type === 'plan', isPoll: m.type === 'poll', showAv: !me, av: person.i, avc: person.c,
      justify: me ? 'flex-end' : 'flex-start', align: me ? 'flex-end' : 'flex-start', bg: me ? '#15120F' : 'rgba(255,253,248,.9)', col: me ? '#F4EFE6' : '#15120F',
      title: pp && pp.title, tag: pp && pp.tag, meta: pp && `${pp.short} · ${pp.hood} · ${pf.priceLabel}`, pct: pf && pf.pct,
      countLabel: pf && `${pf.countLabel} · ${pf.needLabel}`, onOpen: pp ? () => st.openDetail(pp.id) : undefined,
    };
  });
  const pv: Record<string, string[]> = { Thu: ['Priya', 'Jay'], Fri: ['Dev'], Sat: [] };
  const squadPoll = ['Thu', 'Fri', 'Sat'].map((t) => {
    const v = [...pv[t], ...(s.squadVote === t ? ['You'] : [])];
    const mine = s.squadVote === t;
    return {
      t: ({ Thu: 'Thursday, Nov 5', Fri: 'Friday, Nov 6', Sat: 'Saturday, Nov 7' } as any)[t], n: v.length, w: (v.length / 4) * 100 + '%',
      avs: v.map((n) => people[n]), fill: mine ? 'rgba(255,90,31,.28)' : 'rgba(21,18,15,.07)', border: mine ? '#FF5A1F' : 'rgba(21,18,15,.1)',
      onTap: () => set({ squadVote: t }),
    };
  });
  const squadDown = 2 + (s.downSet.fade ? 1 : 0);
  const thu = 2 + (s.squadVote === 'Thu' ? 1 : 0);

  // ---- host ----
  const W = { period: 'This week · Nov 2 – 8', total: '$1,284', delta: '+$412 vs last week', avail: '$874', bars: [120, 0, 340, 90, 0, 612, 122], labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], rows: [['Tickets & spots', 'Paid out after each plan', '$812'], ['Early-bird pledges', 'Held until After-hours hits 60', '$410'], ['Tips from guests', '', '$62']] };
  const M = { period: 'October', total: '$4,920', delta: '+18% vs September', avail: '$874', bars: [860, 1210, 1566, 1284], labels: ['W1', 'W2', 'W3', 'W4'], rows: [['Tickets & spots', '4 plans happened', '$3,640'], ['Early-bird pledges', 'Released when goals hit', '$1,030'], ['Tips from guests', '', '$250']] };
  const E = s.range === 'week' ? W : M, mx = Math.max(...E.bars);
  const earn = {
    ...E,
    bars: E.bars.map((v, i) => ({ h: (v / mx) * 100 + '%', l: E.labels[i], bg: i === E.bars.indexOf(mx) ? '#FF5A1F' : 'rgba(244,239,230,.28)' })),
    rows: E.rows.map(([l, sub, v], i) => ({ l, s: sub, v, line: i === E.rows.length - 1 ? 'transparent' : 'rgba(21,18,15,.08)' })),
  };
  const ff = facts(P('fade'));
  const hostPlans = [
    { stage: 'HEATING UP', pillBg: '#FFE4D6', pillCol: '#8A2E0B', when: 'Thu, Nov 5', title: 'After-hours fades & freestyle', sub: `${ff.countLabel} · ${ff.needLabel}`, amt: '$410', amtSub: 'held' },
    { stage: 'HAPPENED', pillBg: 'rgba(21,18,15,.07)', pillCol: '#15120F', when: 'Sat, Oct 31', title: 'Saturday line-up & dominoes', sub: '48 came · 31 first-timers', amt: '$612', amtSub: 'paid out' },
    { stage: 'HAPPENED', pillBg: 'rgba(21,18,15,.07)', pillCol: '#15120F', when: 'Sat, Oct 24', title: 'Free cuts for the block', sub: 'City neighborhood stipend', amt: '$150', amtSub: 'paid out' },
  ];
  const ranges = [['week', 'Week'], ['month', 'Month']].map(([k, l]) => ({
    label: l, bg: s.range === k ? '#FFFDF8' : 'transparent', sh: s.range === k ? '0 1px 4px rgba(21,18,15,.12)' : 'none', onTap: () => set({ range: k }),
  }));

  const pad = (v: number) => String(v).padStart(2, '0');
  const iso = (dt: Date) => dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate());
  const parse = (k: string) => { const [a, b, c2] = k.split('-').map(Number); return new Date(a, b - 1, c2); };
  const monday = (dt: Date) => { const r = new Date(dt); r.setDate(r.getDate() - ((r.getDay() + 6) % 7)); return r; };
  const KC: Record<string, string> = { live: '#FF5A1F', done: '#15120F', pay: '#1F6F5C', pitch: 'rgba(21,18,15,.3)', poll: '#3B4BA8' };
  const evOn = (k: string) => CAL_EVENTS.filter((e) => e.d === k), todayK = '2026-11-02';
  const dayCell = (dt: Date, inM: boolean) => {
    const k = iso(dt), sel = k === s.calSel, ev = evOn(k).slice(0, 3);
    return {
      n: dt.getDate(), dow: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][dt.getDay()], bg: sel ? '#15120F' : 'transparent',
      col: sel ? '#F4EFE6' : inM ? '#15120F' : 'rgba(21,18,15,.28)', ring: k === todayK && !sel ? '#FF5A1F' : 'transparent',
      dots: ev.map((e) => ({ c: KC[e.kind] })), dotsM: ev.map((e) => ({ c: sel && e.kind === 'done' ? '#F4EFE6' : KC[e.kind] })),
      onTap: () => set({ calSel: k }),
    };
  };
  const ws = parse(s.calWs), we = new Date(ws); we.setDate(we.getDate() + 6);
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DAY = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const mo = (dt: Date) => MON[dt.getMonth()];
  const [cy, cm] = s.calYM, first = new Date(cy, cm, 1), off = (first.getDay() + 6) % 7, dim = new Date(cy, cm + 1, 0).getDate(), rows = Math.ceil((off + dim) / 7);
  const monthCells: any[] = [];
  for (let i = 0; i < rows * 7; i++) { const dt = new Date(cy, cm, 1 - off + i); monthCells.push(dayCell(dt, dt.getMonth() === cm)); }
  const isWeek = s.calView === 'week';
  const shift = (dir: number) => {
    if (isWeek) { const n = new Date(ws); n.setDate(n.getDate() + 7 * dir); set({ calWs: iso(n) }); }
    else { const n = new Date(cy, cm + dir, 1); set({ calYM: [n.getFullYear(), n.getMonth()] }); }
  };
  const dayEvents = evOn(s.calSel).map((e) => ({ ...e, c: KC[e.kind] }));
  const selD = parse(s.calSel);
  const cal = {
    isWeek, isMonth: !isWeek, dows: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], monthCells, dayEvents, none: dayEvents.length === 0,
    weekDays: Array.from({ length: 7 }, (_, i) => { const dt = new Date(ws); dt.setDate(dt.getDate() + i); return dayCell(dt, true); }),
    label: isWeek ? mo(ws) + ' ' + ws.getDate() + ' – ' + (we.getMonth() !== ws.getMonth() ? mo(we) + ' ' : '') + we.getDate() : MONTH[first.getMonth()] + ' ' + first.getFullYear(),
    // toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric'}).toUpperCase() -> "THURSDAY, NOV 5"
    selLabel: `${DAY[selD.getDay()]}, ${MON[selD.getMonth()].toUpperCase()} ${selD.getDate()}`,
    prev: () => shift(-1), next: () => shift(1),
    views: [['week', 'Week'], ['month', 'Month']].map(([k, l]) => ({
      label: l, bg: s.calView === k ? '#FFFDF8' : 'transparent', sh: s.calView === k ? '0 1px 4px rgba(21,18,15,.12)' : 'none',
      onTap: () => { const sd = parse(s.calSel); set(k === 'week' ? { calView: k, calWs: iso(monday(sd)) } : { calView: k, calYM: [sd.getFullYear(), sd.getMonth()] }); },
    })),
  };
  const tabs = [['swipe', 'Swipe'], ['map', 'Map'], ['squad', 'Squad'], ['host', 'Host']].map(([k, l], i) => ({
    label: l, col: s.tab === k ? '#FFFDF8' : 'rgba(255,253,248,.72)', pill: s.tab === k ? 'rgba(255,253,248,.24)' : 'transparent',
    fill: s.tab === k ? 'currentColor' : 'none', i0: i === 0, i1: i === 1, i2: i === 2, i3: i === 3, badge: k === 'squad' && s.tab !== 'squad' ? '3' : '',
    onTap: () => set({ tab: k, detailOpen: false, lockOpen: false, inboxOpen: false, pitchOpen: false, profOpen: false }),
  }));
  const going = plans.filter((p) => s.downSet[p.id]).map((p) => {
    const f = facts(p), on2 = f.need === 0, parts = (p.when || '').split(' ');
    return {
      title: p.title, on: on2, mon: (parts[1] || '').toUpperCase(), day: parts[2] || '', meta: `${p.short} · ${p.hood}${s.locked[p.id] === 'paid' ? ' · pledged' : ''}`,
      pill: on2 ? "IT'S ON" : `${f.need} TO GO`, pillBg: on2 ? '#FF5A1F' : 'rgba(21,18,15,.07)', pillCol: '#15120F',
      dateBg: on2 ? '#15120F' : '#F4EFE6', dateCol: on2 ? '#FFFDF8' : '#15120F',
      onTap: () => (on2 ? set({ goingOpen: false, onId: p.id, onOpen: true }) : set({ goingOpen: false, detailId: p.id, detailOpen: true })),
    };
  });
  const anySheet = s.detailOpen || s.lockOpen || s.inboxOpen || s.pitchOpen;
  const sel = (on2: boolean) => ({ border: on2 ? '#15120F' : 'rgba(21,18,15,.12)', bg: on2 ? '#15120F' : '#FFFDF8', col: on2 ? '#FFFDF8' : '#15120F' });
  const vCount = Object.values(s.vibes).filter(Boolean).length;
  const hoodsRanked = HS.map((x) => ({ ...x, score: x.v.filter((v) => s.vibes[v]).length })).sort((a, b) => b.score - a.score).slice(0, 4);
  const onbNext = () => {
    if (s.onb === 0) set({ onb: 1 });
    else if (s.onb === 1) { if (vCount >= 3) set({ onb: 2, hoodPick: Object.fromEntries(hoodsRanked.slice(0, 2).map((x) => [x.n, true])) }); }
    else set({ onb: null, tab: 'swipe' });
  };
  const onb = {
    s0: s.onb === 0, s1: s.onb === 1, s2: s.onb === 2, next: onbNext, skip: () => set({ onb: null, tab: 'swipe' }), dots: [0, 1, 2].map((i) => (i <= (s.onb || 0) ? '#15120F' : 'rgba(21,18,15,.18)')),
    vibes: VIBES.map((t) => { const o = !!s.vibes[t]; return { t, bg: o ? '#15120F' : 'rgba(255,253,248,.24)', col: o ? '#FFFDF8' : '#15120F', border: o ? '#15120F' : 'rgba(255,255,255,.5)', onTap: () => set((x) => ({ vibes: { ...x.vibes, [t]: !x.vibes[t] } })) }; }),
    hoods: hoodsRanked.map((x) => { const o = !!s.hoodPick[x.n]; return { ...x, chk: o ? '#15120F' : 'transparent', chkCol: o ? '#FF5A1F' : 'transparent', onTap: () => set((y) => ({ hoodPick: { ...y.hoodPick, [x.n]: !y.hoodPick[x.n] } })) }; }),
    cta: s.onb === 1 ? (vCount >= 3 ? `Next · ${vCount} picked` : `Pick ${3 - vCount} more`) : 'Start swiping',
    ctaBg: vCount >= 3 ? '#15120F' : 'rgba(21,18,15,.18)', ctaCol: vCount >= 3 ? '#FFFDF8' : 'rgba(21,18,15,.55)',
  };
  const salsaHit = !!s.hit.salsa;
  const inboxBase = [
    ...(salsaHit ? [{ i: 'd.', c: '#FF5A1F', tc: '#15120F', t: "It's on: Salsa under the lights", s: '150 people are down. Your spot is a ticket now.', time: 'now', go: () => set({ inboxOpen: false, onId: 'salsa', onOpen: true }) }] : []),
    { i: 'PS', c: '#C2410C', tc: '#fff', t: 'Priya shared a plan', s: 'After-hours fades in Fields Corner. 41 of 60 down.', time: '12m', go: () => set({ inboxOpen: false, tab: 'squad' }) },
    { i: 'LN', c: '#9A3B6B', tc: '#fff', t: "Lan's supper is 1 away", s: '11 of 12 down. Close it out?', time: '1h', go: () => set({ inboxOpen: false, detailId: 'pho', detailOpen: true }) },
    { i: 'MB', c: '#7A5C12', tc: '#fff', t: 'Marcus posted a poll', s: 'Which night for After-hours fades?', time: '3h', go: () => set({ inboxOpen: false, detailId: 'fade', detailOpen: true }) },
    { i: '$', c: '#15120F', tc: '#FFFDF8', t: 'Charged $10 · Saturday line-up', s: 'It happened. Receipt is in your email.', time: 'Sat', go: () => set({ inboxOpen: false }) },
  ];
  const unreadN = s.readAll ? 0 : Math.min(3, inboxBase.length);
  const inbox = inboxBase.map((x, i) => ({ ...x, dot: i < unreadN ? '#FF5A1F' : 'transparent', onTap: x.go }));
  const lockNotifs = [
    { t: "It's on: Salsa under the lights", s: '150 people are down in Nubian Square. Tap for your ticket.', time: 'now', op: 1, sc: 1,
      onTap: () => set((x) => ({ lockScreen: false, extra: { ...x.extra, salsa: Math.max(x.extra.salsa || 0, 2) }, downSet: { ...x.downSet, salsa: true }, swiped: { ...x.swiped, salsa: 'down' }, hit: { ...x.hit, salsa: true }, onId: 'salsa', onOpen: true })) },
    { t: 'Priya pitched a plan', s: 'Karaoke in Chinatown after finals · 4 of 10 down', time: '14m', op: 0.92, sc: 0.98, onTap: () => set({ lockScreen: false, tab: 'squad' }) },
    { t: "Lan's supper is 1 away", s: "11 of 12 down for Sunday's phở", time: '1h', op: 0.82, sc: 0.96, onTap: () => set({ lockScreen: false, detailId: 'pho', detailOpen: true }) },
  ];
  const salsaPending = !!s.downSet.salsa;
  const notYet = (h2: string) => ({ h: h2, p: 'Not yet', d: '—', c: 'rgba(21,18,15,.4)', rot: '0deg', op: 1, bstyle: 'dashed', inner: 'transparent', bg: 'transparent' });
  const stamps = [
    ...STAMPS.map(([h2, p2, d2, c2, r2]) => ({ h: h2, p: p2, d: d2, c: c2, rot: r2 + 'deg', op: 1, bstyle: 'solid', inner: c2, bg: 'rgba(255,253,248,.5)' })),
    salsaPending ? { h: 'NUBIAN SQ', p: 'Salsa', d: 'NOV 6 · SOON', c: '#C2410C', rot: '4deg', op: 1, bstyle: 'dashed', inner: 'transparent', bg: 'rgba(255,90,31,.12)' } : notYet('NUBIAN SQ'),
    ...['EAST BOSTON', 'FRANKLIN PARK', 'MATTAPAN'].map(notYet),
  ];
  const P2 = s.pitch, setP = (k: string, v: any) => set((x) => ({ pitch: { ...x.pitch, [k]: v } }));
  const pt = {
    s0: s.pitchStep === 0, s1: s.pitchStep === 1, s2: s.pitchStep === 2, s3: s.pitchStep === 3, stepLabel: `${s.pitchStep + 1}/4`,
    bars: [0, 1, 2, 3].map((i) => (i <= s.pitchStep ? '#FF5A1F' : 'rgba(21,18,15,.1)')),
    title: P2.title, hood: P2.hood, when: P2.when, goal: P2.goal, entry: P2.entry, q: P2.q, need: P2.goal - 1, pct: 100 / P2.goal + '%',
    onTitle: (e: any) => setP('title', e.target.value), onQ: (e: any) => setP('q', e.target.value),
    hoods: ['Chinatown', 'Nubian Square', 'East Boston', 'Fields Corner', 'Jamaica Plain'].map((t) => ({ t, ...sel(P2.hood === t), onTap: () => setP('hood', t) })),
    whens: ['Fri 9pm', 'Sat 9pm', 'Sun 2pm'].map((t) => ({ t, ...sel(P2.when === t), onTap: () => setP('when', t) })),
    entries: ['Free', '$5', '$10'].map((t) => ({ t, ...sel(P2.entry === t), onTap: () => setP('entry', t) })),
    closesOpts: ['2 days', '5 days', '1 week'].map((t) => ({ t, ...sel(P2.closes === t), onTap: () => setP('closes', t) })),
    dec: () => setP('goal', Math.max(4, P2.goal - 2)), inc: () => setP('goal', Math.min(60, P2.goal + 2)),
    goalHelp: `When ${P2.goal} people are down, it turns into a real plan with ${P2.goal} spots. ${P2.entry === 'Free' ? 'Nobody pays anything.' : 'Nobody is charged unless it happens.'}`,
    opts: P2.opts.map((t, i) => ({ t, n: String.fromCharCode(65 + i), onChange: (e: any) => { const o = [...P2.opts]; o[i] = e.target.value; setP('opts', o); } })),
    reach: `Goes to the dot squad first. If 3 of you are down, it shows up for people near ${P2.hood}.`,
    canBack: s.pitchStep > 0, back: () => set({ pitchStep: Math.max(0, s.pitchStep - 1) }),
    cta: s.pitchStep === 3 ? 'Pitch it' : 'Next', next: () => (s.pitchStep === 3 ? st.submitPitch() : set({ pitchStep: s.pitchStep + 1 })),
  };
  const openTop = () => top && st.openDetail(top);

  return {
    showSwipe: s.tab === 'swipe' ? 'flex' : 'none', showMap: s.tab === 'map' ? 'block' : 'none', showSquad: s.tab === 'squad' ? 'flex' : 'none', showHost: s.tab === 'host' ? 'flex' : 'none',
    chips, cards, empty: rem.length === 0, slotPE: 'none',
    resetDeck: () => set({ swiped: {}, filter: 'all' }),
    onNah: () => deckApi.fly('nah'), onDown: () => deckApi.fly('down'), onInfo: openTop, onShare: () => top && st.share(top), openTopDetail: openTop,
    toast: s.toast || { title: '', sub: '', badge: '', ring: '#FF5A1F' }, toastT: s.toastOn ? 'translateY(0%)' : 'translateY(-130%)', toastO: s.toastOn ? 1 : 0,
    backdropO: anySheet ? 1 : 0, backdropPE: anySheet ? 'auto' : 'none',
    closeAll: () => set({ detailOpen: false, lockOpen: false, inboxOpen: false, pitchOpen: false }), closeDetail: () => set({ detailOpen: false }),
    detailT: s.detailOpen ? 'translateY(0%)' : 'translateY(105%)', detailRef, d, heroes,
    toggleFollow: () => set((x) => ({ follow: { ...x.follow, [dp.id]: !x.follow[dp.id] } })),
    lockT: s.lockOpen ? 'translateY(0%)' : 'translateY(105%)', lk, lockChoose: s.lockStep !== 'done', lockDone: s.lockStep === 'done', lockPaying: s.lockStep === 'paying',
    confirmLock: st.confirmLock, lockShare: () => st.share(s.lockId),
    on, onO: s.onOpen ? 1 : 0, onPE: s.onOpen ? 'auto' : 'none', onT: s.onOpen ? 'scale(1)' : 'scale(1.04)',
    onTicketT: s.onOpen ? 'translateY(0%) rotate(0deg)' : 'translateY(120%) rotate(-6deg)', qr: QR,
    closeOn: () => set({ onOpen: false }), onShareOn: () => st.share(s.onId),
    pins, ms, mapChips, mapThumbs, youX: `${YOU.x}px`, youY: `${YOU.y}px`,
    mapOpen: () => st.openDetail(s.mapSel),
    mapDown: () => { if (!s.downSet[mp.id]) { st.markDown(mp.id, true); set((x) => ({ swiped: { ...x.swiped, [mp.id]: 'down' } })); } },
    msgs, squadPoll, chatRef, squadSub: `4 members · ${thu} picked Thursday`,
    squadLockLabel: `${squadDown} of 4 down for Fades`, squadLock: () => st.openLock('fade'),
    draft: s.draft, onDraft: (e: any) => set({ draft: e.target.value }), onDraftKey: (e: any) => { if (e.key === 'Enter') st.sendDraft(); }, sendDraft: st.sendDraft,
    earn, hostPlans, ranges, tabs, cal, onb, onbShow: s.onb != null ? 'flex' : 'none', lockShow: s.lockScreen ? 'flex' : 'none', lockNotifs,
    // Swipe up / tap to open -> onboarding first (notification taps skip it).
    unlock: () => set({ lockScreen: false, onb: 0, vibes: {} }),
    replayConfetti: () => set((x) => ({ confettiKey: x.confettiKey + 1 })),
    goingOpen: s.goingOpen, toggleGoing: () => set({ goingOpen: !s.goingOpen }), closeGoing: () => set({ goingOpen: false }),
    goingT: s.goingOpen ? 'translateY(0px) scale(1)' : 'translateY(-12px) scale(.96)', goingO: s.goingOpen ? 1 : 0, goingPE: s.goingOpen ? 'auto' : 'none', goingScrim: s.goingOpen ? 'block' : 'none',
    going, goingEmpty: going.length === 0, goingCount: going.length ? String(going.length) : '',
    goingSub: going.length ? `${going.filter((g) => g.on).length} ON · ${going.filter((g) => !g.on).length} HEATING UP` : '',
    inbox, unread: unreadN ? String(unreadN) : '', openInbox: () => set({ inboxOpen: true }), markRead: () => set({ readAll: true }), inboxT: s.inboxOpen ? 'translateY(0%)' : 'translateY(105%)',
    profT: s.profOpen ? 'translateX(0%)' : 'translateX(105%)', openProfile: () => set({ profOpen: true }), closeProfile: () => set({ profOpen: false }), replayOnb: () => set({ profOpen: false, onb: 0, vibes: {} }),
    stamps, stampCount: '5 OF 23 STAMPED',
    profStats: [{ v: '5', l: 'neighborhoods stamped' }, { v: String(9 + Object.keys(s.downSet).length), l: 'plans backed' }, { v: '31', l: 'people met' }],
    pt, pitchT: s.pitchOpen ? 'translateY(0%)' : 'translateY(105%)', openPitch: () => set({ pitchOpen: true, pitchStep: 0, detailOpen: false, lockOpen: false }), closePitch: () => set({ pitchOpen: false }),
  };
}
