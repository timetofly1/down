"""Render a branded Boston map overlay from OpenStreetMap data (OpenFreeMap tiles).

Draws only what the down. map design uses, as a transparent PNG that sits on
the app's orange gradient:
  water  -> rgba(150,35,0,.22)   parks -> rgba(255,253,248,.2)
  roads  -> rgba(255,253,248,.45) major, fading for smaller streets
Also writes map.json with the projection so the app can place pins by lat/lng.

Usage: python build-map.py <out-dir>
Data: (c) OpenStreetMap contributors, tiles by OpenFreeMap / OpenMapTiles.
"""
import json
import math
import os
import subprocess
import sys

import mapbox_vector_tile
from PIL import Image, ImageDraw

OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)
CACHE = os.path.join(os.environ.get("KIROCREW_SCRATCH", "/tmp"), "mvt-cache")
os.makedirs(CACHE, exist_ok=True)
TILES = "https://tiles.openfreemap.org/planet/20261018_080001_pt/{z}/{x}/{y}.pbf"

Z = 13            # vector tile zoom we fetch
DZ = 12.55        # display zoom: Boston + close neighborhoods fill the phone
K = 2 ** (DZ - Z) # z13 pixel -> display point
DENSITY = 3       # output pixels per point (iPhone @3x)
SS = 2            # supersampling for anti-aliasing
BBOX = dict(n=42.405, s=42.235, w=-71.160, e=-70.985)


def merc(lat, lon, z=Z):
    n = 2 ** z * 256
    x = (lon + 180) / 360 * n
    y = (1 - math.log(math.tan(math.radians(lat)) + 1 / math.cos(math.radians(lat))) / math.pi) / 2 * n
    return x, y


x0, y0 = merc(BBOX["n"], BBOX["w"])
x1, y1 = merc(BBOX["s"], BBOX["e"])
W_PT, H_PT = (x1 - x0) * K, (y1 - y0) * K
S = K * DENSITY * SS  # z13 pixel -> supersampled output pixel
W, H = int(round(W_PT * DENSITY * SS)), int(round(H_PT * DENSITY * SS))
print(f"map {W_PT:.0f}x{H_PT:.0f} pt -> {W // SS}x{H // SS} px")


def fetch(x, y):
    p = os.path.join(CACHE, f"{Z}-{x}-{y}.pbf")
    if not os.path.exists(p):
        url = TILES.format(z=Z, x=x, y=y)
        subprocess.run(["curl", "-s", "--fail", "-A", "down-hackathon-demo/1.0", "-o", p, url], check=True)
    return open(p, "rb").read()


water = Image.new("L", (W, H), 0)
park = Image.new("L", (W, H), 0)
roads = Image.new("L", (W, H), 0)
dw, dp, dr = ImageDraw.Draw(water), ImageDraw.Draw(park), ImageDraw.Draw(roads)

# road class -> (width in points, alpha 0..1); drawn small -> big so majors win
ROAD = [
    ("minor", 0.9, 0.16), ("service", 0.6, 0.10), ("tertiary", 1.4, 0.28),
    ("secondary", 1.9, 0.36), ("primary", 2.6, 0.45), ("trunk", 3.0, 0.45), ("motorway", 3.4, 0.45),
]
ROAD_IDX = {c: i for i, (c, _, _) in enumerate(ROAD)}
road_feats = {c: [] for c, _, _ in ROAD}

tx0, ty0 = int(x0 // 256), int(y0 // 256)
tx1, ty1 = int(x1 // 256), int(y1 // 256)
EXT = 4096
for tx in range(tx0, tx1 + 1):
    for ty in range(ty0, ty1 + 1):
        layers = mapbox_vector_tile.decode(fetch(tx, ty), default_options={"y_coord_down": True})

        def P(pt):
            gx = (tx + pt[0] / EXT) * 256
            gy = (ty + pt[1] / EXT) * 256
            return ((gx - x0) * S, (gy - y0) * S)

        def polys(geom):
            t, c = geom["type"], geom["coordinates"]
            if t == "Polygon":
                return [c]
            if t == "MultiPolygon":
                return c
            return []

        def lines(geom):
            t, c = geom["type"], geom["coordinates"]
            if t == "LineString":
                return [c]
            if t == "MultiLineString":
                return c
            return []

        def fill(draw, geom):
            for poly in polys(geom):
                outer, holes = poly[0], poly[1:]
                if len(outer) > 2:
                    draw.polygon([P(p) for p in outer], fill=255)
                for h in holes:
                    if len(h) > 2:
                        draw.polygon([P(p) for p in h], fill=0)

        for f in layers.get("water", {}).get("features", []):
            fill(dw, f["geometry"])
        for f in layers.get("park", {}).get("features", []):
            fill(dp, f["geometry"])
        for f in layers.get("landcover", {}).get("features", []):
            if f["properties"].get("class") in ("grass", "wood"):
                fill(dp, f["geometry"])
        for f in layers.get("landuse", {}).get("features", []):
            if f["properties"].get("class") in ("cemetery",):
                fill(dp, f["geometry"])
        for f in layers.get("transportation", {}).get("features", []):
            cls = f["properties"].get("class")
            if cls in ROAD_IDX and f["properties"].get("brunnel") != "tunnel":
                road_feats[cls].extend([[P(p) for p in ln] for ln in lines(f["geometry"])])

for cls, wpt, a in ROAD:
    width = max(1, int(round(wpt * DENSITY * SS)))
    for ln in road_feats[cls]:
        if len(ln) > 1:
            dr.line(ln, fill=int(a * 255), width=width, joint="curve")
            r = width / 2
            for (x, y) in (ln[0], ln[-1]):
                dr.ellipse([x - r, y - r, x + r, y + r], fill=int(a * 255))

size = (W // SS, H // SS)
water, park, roads = (im.resize(size, Image.LANCZOS) for im in (water, park, roads))


def layer(mask, rgb, alpha):
    a = mask.point(lambda v: int(v * alpha))
    im = Image.new("RGBA", size, rgb + (0,))
    im.putalpha(a)
    return im


out = Image.new("RGBA", size, (0, 0, 0, 0))
out = Image.alpha_composite(out, layer(water, (150, 35, 0), 0.22))
out = Image.alpha_composite(out, layer(park, (255, 253, 248), 0.20))
cream = Image.new("RGBA", size, (255, 253, 248, 0))
cream.putalpha(roads)
out = Image.alpha_composite(out, cream)
# 48-color palette PNG: visually identical (mean diff ~1/255), ~5x smaller
out.quantize(colors=48, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).save(os.path.join(OUT, "boston.png"), optimize=True)

meta = {"z": Z, "k": K, "x0": x0, "y0": y0, "w": W_PT, "h": H_PT, "bbox": BBOX}
json.dump(meta, open(os.path.join(OUT, "map.json"), "w"), indent=2)
print("wrote", os.path.join(OUT, "boston.png"), os.path.getsize(os.path.join(OUT, "boston.png")) // 1024, "KB")
