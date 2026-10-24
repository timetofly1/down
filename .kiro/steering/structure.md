---
inclusion: always
---

# Structure

```
down-expo/
├── .kiro/
│   ├── steering/            product.md · tech.md · structure.md (always included)
│   ├── specs/
│   │   ├── native-app/      requirements · design · tasks  (the 17-screen app)
│   │   ├── boston-map/      requirements · design · tasks  (real OpenStreetMap layer)
│   │   └── demo-launch/     requirements · design · tasks  (art, confetti, onboarding, deploy)
│   ├── hooks/               agent hooks (typecheck, regenerate screens, pre-deploy check)
│   └── BUILD_LOG.md         chronological log of every build, check and deploy
├── src/
│   ├── app/
│   │   ├── _layout.tsx      fonts, splash, gesture root, status bar
│   │   └── index.tsx        mounts <Phone vm={buildVM(state)} />
│   └── down/
│       ├── Phone.gen.tsx    GENERATED: every screen, layer and sheet
│       ├── fonts.gen.ts     GENERATED: font registry + Bricolage optical sizes
│       ├── css.ts           CSS string → React Native style engine (memoized)
│       ├── ui.tsx           <V>/<T> primitives, glass, gradients, notches, QR, card deck physics
│       ├── store.ts         zustand store: state + actions + demo timings
│       ├── vm.ts            view model: every label, color and count the screens bind to
│       ├── data.ts          seed plans, people, host calendar
│       ├── doodles.tsx      orange + black doodle art per plan
│       ├── extras.tsx       OsmMap (pannable), LockScreen (swipe up), Confetti
│       └── geo.ts           Mercator projection + real Boston coordinates
├── assets/
│   ├── fonts/               37 static cuts (Bric700_*, Bric800_*, Geist*, GeistMono*)
│   └── map/                 boston.png (branded OSM render) + map.json (projection)
├── scripts/
│   ├── transpile.py         design reference markup → Phone.gen.tsx
│   ├── build-fonts.py       variable fonts → static cuts
│   ├── build-map.py         OSM vector tiles → branded map PNG
│   └── deploy-web.sh        web export → Vercel production
└── docs/                    README screenshots + hero
```

## How a screen renders

`store (state)` → `vm.ts (buildVM)` → `Phone.gen.tsx` (layout with literal CSS strings) → `ui.tsx` (`<V>` boxes, `<T>` text) → `css.ts` (parse + cache) → React Native views.

## Conventions

- Screens are addressed by their design labels (`01 Swipe`, `02 Plan detail`, `03 Map`, …). The label becomes the `testID`, so tests and screenshots can target any screen.
- Bindings in generated code are always `vm.<name>` or a loop variable. Add new behavior to `vm.ts`, not to the generated file.
- Text inherits like CSS: a `<V>` passes font, color, size and alignment to descendants through context.
- New art goes in `doodles.tsx` (400×240 canvas, subject centered so thumbnails crop well).
- Coordinates for new plans go in `geo.ts` (`PLAN_LL`), never as screen pixels.
