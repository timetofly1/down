# Tasks: down. native app

- [x] 1. Read the design reference end to end
  - [x] 1.1 Render all 18 spec pages to images and read every section (tokens, chrome, 17 screens, seed data, demo moment, acceptance checklist)
  - [x] 1.2 Extract every font weight/size pair used (31 Bricolage, 38 Geist, 5 Geist Mono) and every special character (·, –, —, •, …, ở, ế, à, é, í)
  - [x] 1.3 Map all screens, layers, z-orders and bindings (441 bound values)
  - _Requirements: 1–12_

- [x] 2. Scaffold the app
  - [x] 2.1 `create-expo-app` on SDK 58 (RN 0.88, React 19.3, Reanimated 4.7, Gesture Handler 3.3)
  - [x] 2.2 `npx expo install expo-blur react-native-svg zustand`
  - [x] 2.3 Replace the template tabs with one route; configure `app.json` (name `down.`, light UI, orange splash, single-page web output)
  - _Requirements: 12.1_

- [x] 3. Typography
  - [x] 3.1 Write `scripts/build-fonts.py`: instance variable fonts per (weight, optical size), merge latin + latin-ext + Vietnamese subsets, unique PostScript names
  - [x] 3.2 Generate 37 cuts (2.8 MB) and `fonts.gen.ts`; load them before hiding the splash
  - [x] 3.3 Nearest-optical-size font resolution in `<T>`
  - _Requirements: 12.2_

- [x] 4. Generator: reference markup → TSX
  - [x] 4.1 `scripts/transpile.py`: parse the layout tree, keep every style string verbatim, map loops/conditionals to `.map()`/ternaries, bindings to `vm.*`
  - [x] 4.2 Inline text runs → nested `<T>`; block vs flex child grouping; `<br>` handling
  - [x] 4.3 Special nodes: card drag layer, stamps, QR grid, inputs, image slots, lock screen, map layer
  - [x] 4.4 Output `Phone.gen.tsx` (1,300+ lines)
  - _Requirements: 1–11_

- [x] 5. Style engine `css.ts`
  - [x] 5.1 Font shorthand, letter-spacing (em → px), line-height, inheritance split
  - [x] 5.2 Box model incl. content-box sizing, borders per side, radii, gap
  - [x] 5.3 Gradients (radial/linear natively), conic rings, barcode stripes, dashed perforations
  - [x] 5.4 Transforms (incl. % translate), transitions with exact cubic-bezier curves, keyframes (spin, rise)
  - [x] 5.5 Glass (`backdrop-filter`) → `expo-blur` on native, CSS on web
  - _Requirements: 12.2_

- [x] 6. State and view model
  - [x] 6.1 `data.ts`: 7 seed plans, 8 people, host calendar (verbatim copy)
  - [x] 6.2 `store.ts`: all actions with reference timings (1.7s join, 1.1s hit, 900ms It's on, 1.1s lock, 1.8s pitch reply, 2.6s toast)
  - [x] 6.3 `vm.ts`: labels, stage tracker, polls, tiers, calendar week/month grids, passport, inbox, onboarding ranking
  - _Requirements: 2–11_

- [x] 7. UI runtime `ui.tsx`
  - [x] 7.1 `<V>`/`<T>` with CSS-like layout and text inheritance
  - [x] 7.2 Ticket notches, QR, image slots, inputs with browser-default metrics
  - [x] 7.3 `text-wrap: balance/pretty` re-breaking on native
  - [x] 7.4 Card deck: UI-thread drag, stack physics, fly-off, tap-to-open, stamps
  - _Requirements: 3_

- [x] 8. Verify
  - [x] 8.1 Typecheck clean (`npx tsc --noEmit`)
  - [x] 8.2 Web dev build renders every screen; screenshots reviewed against the reference
  - [x] 8.3 Fix headless-Chrome GPU crash for screenshots (software rendering flags)
  - [x] 8.4 Lockstep comparison harness (same taps on reference and build, diff heatmaps)
  - [x] 8.5 Fix: block children inside buttons must fill width (squad shared-plan art)
  - _Requirements: 12.2_
