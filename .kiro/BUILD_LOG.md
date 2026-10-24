# Build log: down.

Chronological record of every build, check and deploy for this project, built in Kiro on **Saturday, Oct 24, 2026** (times EDT, approximate to the minute).

**Starting point:** reference images and an 18-page visual spec for "down. Prototype v3" (17 screens, design tokens, motion, seed data, acceptance checklist). Everything below was built on top of that reference.

| # | Time | Build / step | Result |
|---|---|---|---|
| 1 | 17:19 | Read the design reference: rendered the 18 spec pages, catalogued screens, tokens, motion and the demo moment | Scope agreed: 17 screens + demo moment |
| 2 | 17:26 | Decision: a **real native app** (React Native + Expo) instead of a web mockup; runs on iPhone through Expo Go with no App Store review; **pixel-exact** to the reference | Plan locked |
| 3 | 17:27 | `create-expo-app` (SDK 58 · RN 0.88 · React 19.3 · Reanimated 4.7 · Gesture Handler 3.3) | Scaffold OK |
| 4 | 17:33 | Audited the design's typography: 31 Bricolage sizes, 38 Geist, 5 Geist Mono; confirmed Bricolage's optical-size axis changes letterforms by size | Font strategy: static cuts |
| 5 | 17:36 | `npx expo install expo-blur react-native-svg zustand` | Installed |
| 6 | 17:38 | `build-fonts.py` → **37 static font cuts** (latin + latin-ext + Vietnamese), 2.8 MB | ✅ all special characters covered |
| 7 | 17:42 | `transpile.py` v1 → `Phone.gen.tsx` (1,412 lines) | Generated |
| 8 | 17:48 | `css.ts` style engine, `data.ts`, `store.ts`, `vm.ts`, `ui.tsx` (primitives, glass, notches, QR, deck physics) | Written |
| 9 | 17:58 | `tsc --noEmit` | 12 type errors → fixed → **0** |
| 10 | 18:04 | First web dev build (Metro, 1,464 modules) | ✅ renders; lock screen matches the reference |
| 11 | 18:10 | Headless Chrome screenshots crashed (GPU process) | Diagnosed → software rendering flags → ✅ |
| 12 | 18:20 | Lockstep comparison harness (reference vs build, same taps, diff heatmaps) | Built |
| 13 | 18:28 | New scope: confetti, event art, onboarding in flow, real Boston map, deploy | Planned |
| 14 | 18:32 | Map source evaluation: raster basemap now key-gated → switched to **OpenStreetMap vector tiles** (OpenFreeMap) | Decision |
| 15 | 18:34 | `build-map.py` → branded Boston map 746×980 pt @3× | ✅ harbor, Charles, parks, streets |
| 16 | 18:35 | Palette quantization (48 colors) | 3.5 MB → **0.77 MB**, no visible change |
| 17 | 18:38 | Generator v2: image slots carry plan ids; map layer → `<OsmMap>`; lock screen swipe-up; onboarding skip; confetti replay | Regenerated |
| 18 | 18:40 | `doodles.tsx` (8 illustrations), `extras.tsx` (OsmMap, LockScreen, Confetti), `geo.ts` (real venue coordinates) | Written |
| 19 | 18:41 | `tsc --noEmit` | **0 errors** |
| 20 | 18:42 | Visual pass (lock, onboarding, swipe, detail, map, It's on, squad, booking) | Found 3 issues |
| 21 | 18:44 | Fixes: block children in buttons now fill width (squad card art); Phở pin moved off Fades; map attribution moved above the sheet | ✅ re-verified |
| 22 | 18:46 | `expo export -p web` | ✅ 5.9 MB (JS 2.4 MB, fonts, map) |
| 23 | 18:46 | Local production check (served on 127.0.0.1) + real tap on "Swipe up to open" | ✅ opens onboarding |
| 24 | 18:47 | `vercel deploy --prod` (project **imdownapp**; `imdown.vercel.app` is owned by another team) | ✅ https://imdownapp.vercel.app |
| 25 | 18:48 | Live check | 200 OK, title "down.", lock screen renders |
| 26 | 18:49 | Phone-width web: full-screen layout, theme color, Add to Home Screen meta → `deploy-web.sh` → redeploy | ✅ Ready in 4s |
| 27 | 18:50 | Live check at 393×852 | ✅ full-screen lock screen + onboarding |
| 28 | 18:50 | `expo export -p ios` (native bundle compile) | ✅ 4.3 MB Hermes bytecode |
| 29 | 18:55 | Live demo click-through: unlock → Get started → Late nights, Food, Live music → Next · 3 picked → Start swiping → I'm down → wait | ✅ **150 OF 150 DOWN · GOAL HIT → It's on.** + confetti + ticket |
| 30 | 19:02 | README v2: problem, value prop, examples (city, nonprofit, library, brand, home cook, run club, friends), 12 screenshots + hero banner | ✅ |
| 31 | 19:08 | `.kiro/` steering, specs (native-app, boston-map, demo-launch), hooks, this log | ✅ |
| 32 | 19:17 | Publish to GitHub: `timetofly1/down` (public, default branch `demo`, website = demo link, topics) | ✅ https://github.com/timetofly1/down |
| 33 | 19:22 | Connect Vercel project `imdownapp` to GitHub `timetofly1/down` (production branch `demo`, build `npm run build:web` → `dist`) | ✅ pushes to `demo` auto-deploy |

## Final verification snapshot

- TypeScript: **0 errors**
- Web build: **5.9 MB**, deployed, **200 OK** at https://imdownapp.vercel.app
- iOS bundle: compiles (Hermes)
- Demo moment on the live URL: **pass**
- Screens: Lock screen · Onboarding ×3 · Swipe · Plan detail · Lock it in · It's on · You're going · Map (real OSM) · Squad · Pitch ×4 · Host · Profile · Inbox · Toast
