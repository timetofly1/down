# down.

**Swipe on plans before they exist. Back the ones you want to happen.**

### 👉 Demo link: [imdownapp.vercel.app](https://imdownapp.vercel.app)

Open it on a phone for the full-screen app (Safari → Share → **Add to Home Screen**), or on a laptop to see it in an iPhone frame.

---

## What it is

down. is a Boston events app where people swipe on plans *before* they exist.

- **Tinder-style swiping** — swipe right ("I'm down") or left ("nah") on proposed plans.
- **Kickstarter-style goals** — each plan needs N people. Hit the goal and it becomes a real event.
- **Luma-style tickets** — early backers lock in a free RSVP or a paid early-bird pledge, only charged if it happens.

Anyone can pitch a plan: city programs, nonprofits, brands, local hosts (a barber, a home cook), or a friend in a group chat. Hosts earn money. The mission: get young people into Boston neighborhoods they don't usually visit, meeting people they wouldn't otherwise meet.

## Demo flow (2 minutes)

1. **Lock screen** → swipe up (or tap) to open. Tapping the "It's on" notification jumps straight to a ticket.
2. **Onboarding** → pick 3+ vibes → get matched neighborhoods → **Start swiping**.
3. **Swipe** → "Salsa under the lights" is at 148/150. Swipe right → 149 → another backer joins → **150** → **It's on.** with confetti and a ticket.
4. **Map** → real OpenStreetMap of Boston with live plan pins. Drag to explore.
5. **Squad** → group chat with shared plans and a poll. **Lock it in together** → pledge → confetti.
6. **Host** → earnings, payouts calendar, your plans.
7. **Pitch a plan** → 4-step flow that posts to the squad.
8. **Profile** → neighborhood passport stamps.

## Screens

Lock screen · Onboarding (3) · Swipe deck · Plan detail · Lock it in · It's on ticket · You're going · Map · Squad chat · Pitch a plan (4 steps) · Host earnings + calendar · Profile passport · Inbox

## Tech

- **React Native + Expo (SDK 58)**, TypeScript, Expo Router — one codebase for iOS, Android and web
- **Reanimated 4 + Gesture Handler 3** for the card stack, sheets, map panning and confetti
- **react-native-svg** for the doodle art, QR code, rings and icons; **expo-blur** for glass
- **Zustand** for shared state across tabs
- **OpenStreetMap** data (via OpenFreeMap vector tiles), pre-rendered into the brand palette
- Deployed on **Vercel**

## Run it locally

```bash
npm install
npx expo start          # press w for web, or scan the QR code with Expo Go on your phone
```

Deploy the web build: `./scripts/deploy-web.sh`

## Project layout

| Path | What |
|---|---|
| `src/down/Phone.gen.tsx` | All screens, generated from the design prototype (`scripts/transpile.py`) |
| `src/down/ui.tsx`, `css.ts` | Layout/text engine that renders the design's exact values natively |
| `src/down/store.ts`, `vm.ts` | App state, demo timing, and screen data |
| `src/down/doodles.tsx` | Orange + black doodle art for each event |
| `src/down/extras.tsx`, `geo.ts` | Real Boston map, swipe-up lock screen, confetti |
| `scripts/build-map.py` | Renders the Boston map from OpenStreetMap data |
| `scripts/build-fonts.py` | Cuts the Bricolage Grotesque / Geist font files |

## Credits

Map data © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors, tiles by [OpenFreeMap](https://openfreemap.org) / OpenMapTiles. Fonts: Bricolage Grotesque, Geist and Geist Mono (SIL Open Font License). All people, plans and numbers in the demo are fictional seed data.
