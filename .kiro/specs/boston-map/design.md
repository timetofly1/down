# Design: real Boston map

- **Source:** OpenFreeMap vector tiles (OpenMapTiles schema, z13), 5×5 tiles over the bbox. A raster basemap was evaluated first but now requires an API key, so vector data was used instead, which also gives full control of the palette.
- **Render (`scripts/build-map.py`):** decode MVT layers `water`, `park`, `landcover` (grass, wood), `landuse` (cemetery), `transportation` (by class, tunnels skipped). Draw each layer as an alpha mask at 2× supersampling, then downsample with Lanczos for anti-aliasing. Roads draw small → large so majors win at intersections; masks are combined so overlaps never double the alpha.
- **Scale:** display zoom 12.55 (k = 2^(12.55−13)), giving a 746×980 pt map: enough to pan, small enough that the neighborhoods stay recognizable. Output at 3× density (2239×2941 px).
- **Size:** quantized to a 48-color palette PNG with no dithering: 3.5 MB → 0.77 MB, mean difference ≈ 1/255.
- **Projection (`geo.ts`):** Web Mercator at z13 → subtract the bbox origin → multiply by k. Written to `map.json` by the renderer, so pins and the image can never drift apart.
- **Component (`OsmMap` in `extras.tsx`):** one Animated.View holding the image, labels, the "you" dot and the generated pins; `usePanGesture` with `minDistance: 6` (taps still reach pins), clamped translation, `withDecay` momentum. Initial view centers Roxbury/Dorchester above the bottom sheet.
