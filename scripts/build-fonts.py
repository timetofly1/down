"""Cut static TTFs from the prototype's variable woff2 fonts.

Browsers apply `font-optical-sizing: auto`, so Bricolage Grotesque renders
with opsz = font-size (clamped 12..96). React Native can't drive variation
axes, so we pre-instance one static font per (weight, opsz) the design uses.
Each cut merges the latin + latin-ext + vietnamese subsets the prototype
ships, and gets a unique family/PostScript name so iOS never dedupes them.

Usage: python build-fonts.py <dir-with-woff2> <out-dir>
"""
import os
import sys
import tempfile

from fontTools.merge import Merger
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)

SUBSETS = {
    # latin, latin-ext, vietnamese (same order the CSS declares them)
    "bric": ["32d71444-9505-4b80-ac39-4ef948ea0451", "eaf0fd43-ccda-4e31-a426-3f5a18951a84", "ee0b3c58-ff13-4540-a61a-9db5126b8bbb"],
    "geist": ["e6cf2d96-f56b-420a-84d6-471095d69dc3", "29d7ccd1-0ceb-4924-bf7d-e3e95e8847f0", "8d40c122-241f-49ae-ba87-e6e6354e80aa"],
    "mono": ["82362ad5-4b48-448f-b244-d5fa3d967c02", "3bd980bb-de34-4c72-826a-eca348503e69", "21228b9f-34f9-4851-a351-ecff2869efb3"],
}

# Every Bricolage weight/size pair used by the prototype screens.
BRIC = {
    700: [15, 15.5, 16, 17, 18, 19, 21, 24, 25, 26, 27, 98],
    800: [13, 15, 16, 17, 18, 20, 21, 22, 24, 26, 28, 30, 32, 34, 40, 52, 72, 92, 108],
}
GEIST = [400, 500, 600, 700]
MONO = [500, 600]


def fmt(n):
    return str(n).replace(".0", "").replace(".", "p")


def rename(font, name):
    """Give the cut a unique family + PostScript name (alias == PS name)."""
    table = font["name"]
    for rec in list(table.names):
        if rec.nameID in (1, 3, 4, 6, 16, 17, 21, 22, 25):
            table.removeNames(nameID=rec.nameID)
    for nid, val in ((1, name), (2, "Regular"), (3, name), (4, name), (6, name)):
        table.setName(val, nid, 3, 1, 0x409)
        table.setName(val, nid, 1, 0, 0)
    font["OS/2"].usWeightClass = 400
    font["OS/2"].fsSelection = (font["OS/2"].fsSelection & ~0b1100001) | 0b1000000  # REGULAR
    font["head"].macStyle = 0


def cut(family, axes, name):
    tmp = []
    for sid in SUBSETS[family]:
        f = TTFont(os.path.join(SRC, sid + ".woff2"))
        static = instancer.instantiateVariableFont(f, axes, inplace=False)
        for tag in ("STAT", "meta", "DSIG"):
            if tag in static:
                del static[tag]
        static.flavor = None
        path = tempfile.mktemp(suffix=".ttf")
        static.save(path)
        tmp.append(path)
    merged = Merger().merge(tmp)
    rename(merged, name)
    merged.save(os.path.join(OUT, name + ".ttf"))
    for p in tmp:
        os.remove(p)
    return name


names = []
for w, sizes in BRIC.items():
    seen = set()
    for s in sizes:
        opsz = max(12, min(96, s))
        if opsz in seen:
            continue
        seen.add(opsz)
        names.append(cut("bric", {"opsz": opsz, "wght": w}, f"Bric{w}_{fmt(opsz)}"))
for w in GEIST:
    names.append(cut("geist", {"wght": w}, f"Geist{w}"))
for w in MONO:
    names.append(cut("mono", {"wght": w}, f"GeistMono{w}"))

print(len(names), "fonts:", " ".join(names))
