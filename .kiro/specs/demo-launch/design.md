# Design: demo polish & launch

- **Art (`doodles.tsx`):** 400×240 SVG canvas, `preserveAspectRatio="xMidYMid slice"`, shared warm background (orange + peach highlight + deep-orange shade), ink strokes 2–5pt with round caps/joins, cream and peach fills for depth. `Slot` reads the plan id from the image-slot id (`photo-<planId>`), so all five photo windows pick the right art automatically.
- **Confetti (`extras.tsx`):** a `Confetti` overlay (z 100, `pointerEvents="none"`) watches the store for rising edges of `onOpen`, `lockStep === 'done'` and `confettiKey`. Each burst = 70–120 pieces with seeded random angle/speed/spin/size/shape; one shared progress value per burst drives every piece on the UI thread (gravity 1500 pt/s², air drag, wobble, flip, fade in the last 22%).
- **Lock screen:** generated lock screen wrapped in `LockScreen` with an upward `usePanGesture`; unlock sets `onb: 0` so onboarding follows.
- **Web shell:** `useFramed()` = web && width ≥ 500 → phone frame + fake status bar; otherwise full-bleed. `deploy-web.sh` injects `theme-color #FF5A1F`, `apple-mobile-web-app-capable`, `viewport-fit=cover`.
