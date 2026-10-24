---
inclusion: always
---

# Tech

## Stack (pinned by `npx expo install`)

| Area | Choice |
|---|---|
| App | React Native **0.88**, React **19.3**, **Expo SDK 58**, TypeScript 6, Expo Router (single screen with layered tabs and sheets) |
| Motion | `react-native-reanimated` **4.7** (UI-thread worklets + CSS transitions), `react-native-worklets` 0.13 |
| Gestures | `react-native-gesture-handler` **3.3** (hook API: `usePanGesture`) |
| Drawing | `react-native-svg` 15.16 (icons, doodle art, QR, conic rings, notches, barcode) |
| Glass | `expo-blur` (native). Web uses CSS `backdrop-filter`. |
| State | `zustand` 5: one store shared by every tab |
| Fonts | `expo-font` loading 37 static TTF cuts from `assets/fonts` |
| Map | Pre-rendered OpenStreetMap layer (`assets/map/boston.png`) + Web Mercator projection (`assets/map/map.json`) |
| Hosting | Static web export on **Vercel** → https://imdownapp.vercel.app |

New Architecture is on (required by Reanimated 4). No backend: seed data only.

## Rules

- Always add packages with `npx expo install <pkg>` so versions match SDK 58.
- Never hand-edit generated files: `src/down/Phone.gen.tsx`, `src/down/fonts.gen.ts`. Change the generator and re-run it.
- Design values are literal. Colors, sizes, radii, timings come from the design reference; do not round or restyle.
- Every icon button has an accessibility label; hit targets ≥ 44pt.
- Map tiles are bundled, not fetched at runtime, so the demo works offline and on any network.

## Why static font cuts

Bricolage Grotesque is a variable font with an optical-size axis (`opsz` 12–96). Browsers apply `font-optical-sizing: auto`, so a 98pt "9:41" is drawn with the display cut and 15pt text with the text cut. React Native can't drive variation axes, so `scripts/build-fonts.py` instances one static TTF per (weight, size) used in the design: 31 Bricolage cuts, Geist 400/500/600/700 and Geist Mono 500/600. Each cut merges the latin, latin-ext and Vietnamese subsets (phở, Huế) and gets a unique PostScript name so iOS never dedupes them. The runtime picks the nearest optical size (`ui.tsx → fontFor`).

## Commands

```bash
npm install
npx expo start                 # dev server: w = web, or scan with Expo Go on a phone
npx tsc --noEmit               # typecheck (must be clean before any commit)
npx expo export -p web --output-dir web-build/imdownapp   # production web build
npx expo export -p ios --output-dir /tmp/ios-check         # native bundle compile check
./scripts/deploy-web.sh        # export + mobile meta tags + vercel deploy --prod

# regenerate inputs
python scripts/transpile.py <reference-template.html> src/down/Phone.gen.tsx
python scripts/build-fonts.py <reference-fonts-dir> assets/fonts
python scripts/build-map.py assets/map          # needs fonttools / mapbox-vector-tile / pillow
```

## Verification checklist (run before every deploy)

1. `npx tsc --noEmit` → 0 errors.
2. Web export succeeds; iOS export compiles (Hermes bytecode).
3. Visual check in headless Chrome at desktop (phone frame) and 393×852 (full screen).
4. Click-through on the live URL: unlock → Get started → 3 vibes → Start swiping → I'm down → **150/150 It's on.**
5. `https://imdownapp.vercel.app` returns 200 and shows the lock screen.

## Platform notes

- **Web, desktop (≥ 500px wide):** renders inside a 390×844 iPhone frame with a fake status bar, exactly like the design canvas.
- **Web, phone:** full-screen app; `apple-mobile-web-app-capable` lets "Add to Home Screen" launch it like a native app.
- **iOS / Android:** Expo Go or a dev build; real status bar, `expo-blur` glass, native gestures.
