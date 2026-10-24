# Tasks: real Boston map

- [x] 1. Evaluate tile sources; reject the key-gated raster basemap; choose OpenFreeMap vector tiles
- [x] 2. Write `build-map.py` (fetch + cache MVT, decode, supersampled masks, palette compositing)
- [x] 3. Render, preview on the brand orange, tune road widths/alphas
- [x] 4. Quantize to 48 colors (3.5 MB → 0.77 MB) and write `map.json`
- [x] 5. `geo.ts`: projection, venue coordinates, neighborhood labels
- [x] 6. Transpiler: replace the illustrated map shapes with `<OsmMap>`, keep the generated pins and "you" dot on the map layer
- [x] 7. Pan with clamping + momentum; attribution
- [x] 8. Verify pins land on the right neighborhoods; nudge the Phở pin so it doesn't overlap Fades
