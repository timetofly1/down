"""Transpile the down. prototype template (HTML + {{ }} bindings) into TSX.

The prototype is one 390x844 "Phone" element whose screens are absolutely
positioned layers styled with inline CSS. We keep every CSS string verbatim
and hand it to the runtime `css()` parser (src/down/css.ts), so values are
copied by machine, never retyped.

  div            -> <V>            (View; provides inherited text style)
  button         -> <V btn>        (Pressable View with button defaults)
  span / b       -> <T> when it is a plain inline text run, else <V span>
  svg/path/...   -> react-native-svg
  input/textarea -> <Field>
  image-slot     -> <Slot>
  sc-for / sc-if -> .map() / ternary
  {{ x.y }}      -> vm.x.y (or the loop variable)

Usage: python transpile.py <template.html> <out.tsx>
"""
import html
import json
import re
import sys
from html.parser import HTMLParser

SRC, OUT = sys.argv[1], sys.argv[2]
raw = open(SRC, encoding="utf-8").read()
start = raw.index('<div data-screen-label="Phone"')
end = raw.index('<script type="text/x-dc"')
body = raw[start:end]

VOID = {"br", "input", "img"}
SVG_TAGS = {"svg": "Svg", "path": "Path", "rect": "Rect", "circle": "Circle"}
SVG_ATTRS = {
    "sc-camel-view-box": "viewBox",
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
}
warnings = []


class Node:
    def __init__(self, tag, attrs, parent):
        self.tag, self.attrs, self.parent, self.kids = tag, dict(attrs), parent, []


class Parser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("#root", {}, None)
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.cur)
        self.cur.kids.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_startendtag(self, tag, attrs):
        self.cur.kids.append(Node(tag, attrs, self.cur))

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        n = self.cur
        while n is not None and n.tag != tag:
            n = n.parent
        if n is not None:
            self.cur = n.parent

    def handle_data(self, data):
        if data:
            self.cur.kids.append(data)

    def handle_comment(self, data):
        pass


p = Parser()
p.feed(body)
phone = next(k for k in p.root.kids if isinstance(k, Node))

BIND = re.compile(r"\{\{\s*([A-Za-z_][\w.]*)\s*\}\}")

# Product copy that supersedes the reference wording.
COPY = {
    'Swipe on plans before they exist. Back the ones you want to happen.': 'Boston could use more life. Start some.',
    "Every plan is somewhere in Boston you haven't been yet, with people you haven't met yet.": "Pitch a plan or back someone else's. When enough people are down, it happens, and meet the neighbor whose dog's name you know but not theirs.",
}


def ref(expr, scope):
    head = expr.split(".")[0]
    return expr if head in scope else "vm." + expr


def js_template(text, scope):
    """'a {{ x }} b' -> `a ${vm.x} b` (or a plain JSON string if static)."""
    parts, last, dyn = [], 0, False
    for m in BIND.finditer(text):
        parts.append(text[last:m.start()].replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${"))
        parts.append("${" + ref(m.group(1), scope) + "}")
        last, dyn = m.end(), True
    parts.append(text[last:].replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${"))
    return ("`" + "".join(parts) + "`") if dyn else json.dumps(text)


def only_bind(text):
    m = BIND.fullmatch(text.strip())
    return m.group(1) if m else None


def style_of(n):
    return html.unescape(n.attrs.get("style", "")) if isinstance(n, Node) else ""


def has(st, prop):
    return re.search(r"(^|;)\s*" + re.escape(prop) + r"\s*:", st) is not None


def decl(st, prop):
    m = re.search(r"(?:^|;)\s*" + re.escape(prop) + r"\s*:\s*([^;]*)", st)
    return m.group(1).strip() if m else None


FLEX_TOGGLES = {"showSwipe", "showSquad", "showHost", "lockShow", "onbShow"}


def is_flexlike(n):
    st = style_of(n)
    d = decl(st, "display")
    if d is None:
        return n.tag == "button" and False
    if d in ("flex", "inline-flex", "grid"):
        return True
    b = only_bind(d)
    return bool(b and b.split(".")[-1] in FLEX_TOGGLES)


TEXT_ONLY_PROPS = {"color", "font", "font-family", "font-size", "font-weight", "line-height",
                   "letter-spacing", "text-transform", "text-align", "opacity", "white-space",
                   "text-wrap", "font-variant-numeric"}


def span_is_text(n):
    """A span/b renders as a nested <T> only if it is a pure inline text run."""
    st = style_of(n)
    for d in re.split(r";(?![^(]*\))", st):
        if ":" in d and d.split(":", 1)[0].strip() not in TEXT_ONLY_PROPS:
            return False
    return all(isinstance(k, str) or (k.tag in ("span", "b", "br") and span_is_text(k)) for k in n.kids)


def inline_kind(k):
    """True for content that flows inside a text run."""
    if isinstance(k, str):
        return True
    if k.tag == "br":
        return True
    if k.tag in ("span", "b") and span_is_text(k):
        return True
    return False


def emit_inline(kids, scope, ind):
    """Children of a text run -> JSX text / nested <T> / {expr}."""
    out = []
    for k in kids:
        if isinstance(k, str):
            t = re.sub(r"\s+", " ", k)
            t = COPY.get(t.strip(), t)
            if not t:
                continue
            pos = 0
            for m in BIND.finditer(t):
                if m.start() > pos:
                    out.append("{" + json.dumps(t[pos:m.start()]) + "}")
                out.append("{" + ref(m.group(1), scope) + "}")
                pos = m.end()
            if pos < len(t):
                out.append("{" + json.dumps(t[pos:]) + "}")
        elif k.tag == "br":
            out.append('{"\\n"}')
        else:
            st = style_of(k)
            if k.tag == "b":
                st = "font-weight:700" + (";" + st if st else "")
            out.append(f"<T s={js_template(st, scope)}>" + "".join(emit_inline(k.kids, scope, ind)) + "</T>")
    return out


def trim_run(run):
    """Collapse + trim whitespace at the edges of an inline run."""
    run = list(run)
    while run and isinstance(run[0], str) and not run[0].strip():
        run.pop(0)
    while run and isinstance(run[-1], str) and not run[-1].strip():
        run.pop()
    if run and isinstance(run[0], str):
        run[0] = run[0].lstrip()
    if run and isinstance(run[-1], str):
        run[-1] = run[-1].rstrip()
    return run


def text_props(st, scope):
    """Element-level text flags that the <T> needs from its block container."""
    return ""


def emit_children(n, scope, ind):
    kids = n.kids
    lines = []
    flex = is_flexlike(n)
    run = []

    def flush():
        nonlocal run
        r = trim_run(run)
        run = []
        if not r or all(isinstance(x, str) and not x.strip() for x in r):
            return
        lines.append(ind + "<T>" + "".join(emit_inline(r, scope, ind)) + "</T>")

    for k in kids:
        if flex:
            if isinstance(k, str):
                if k.strip():
                    run.append(k)
                else:
                    flush()
                continue
            flush()
            lines.extend(emit(k, scope, ind))
        else:
            if inline_kind(k):
                run.append(k)
                continue
            flush()
            lines.extend(emit(k, scope, ind))
    flush()
    return lines


def attrs_common(n, scope):
    a = []
    if "aria-label" in n.attrs:
        a.append("label=" + json.dumps(n.attrs["aria-label"]))
    if "sc-camel-on-click" in n.attrs:
        a.append("onPress={" + ref(only_bind(n.attrs["sc-camel-on-click"]), scope) + "}")
    if "style-active" in n.attrs:
        a.append("active=" + json.dumps(n.attrs["style-active"]))
    if "ref" in n.attrs:
        a.append("sref={" + ref(only_bind(n.attrs["ref"]), scope) + "}")
    if "data-screen-label" in n.attrs:
        a.append("screen=" + json.dumps(n.attrs["data-screen-label"]))
    return a


def emit(n, scope, ind):
    tag = n.tag
    if tag == "sc-for":
        lst = ref(only_bind(n.attrs["list"]), scope)
        var = n.attrs["as"]
        inner = scope | {var}
        kids = [k for k in n.kids if isinstance(k, Node)]
        body_lines = []
        for k in kids:
            body_lines.extend(emit(k, inner, ind + "    "))
        if len(kids) == 1:
            first = body_lines[0]
            # inject key on the first emitted element
            body_lines[0] = re.sub(r"^(\s*<[A-Za-z.]+)", r"\1 key={i_" + var + "}", first, count=1)
            return [ind + "{" + lst + ".map((" + var + ": any, i_" + var + ": number) => ("] + body_lines + [ind + "))}"]
        return ([ind + "{" + lst + ".map((" + var + ": any, i_" + var + ": number) => (",
                 ind + "  <React.Fragment key={i_" + var + "}>"] + body_lines +
                [ind + "  </React.Fragment>", ind + "))}"])
    if tag == "sc-if":
        cond = ref(only_bind(n.attrs["value"]), scope)
        kids = n.kids
        inner = emit_children_raw(kids, scope, ind + "  ", n.parent)
        elems = [k for k in kids if isinstance(k, Node)]
        texts = [k for k in kids if isinstance(k, str) and k.strip()]
        if len(elems) + (1 if texts else 0) <= 1:
            return [ind + "{" + cond + " ? ("] + inner + [ind + ") : null}"]
        return [ind + "{" + cond + " ? (", ind + "  <>"] + inner + [ind + "  </>", ind + ") : null}"]

    st = style_of(n)
    sattr = "s=" + ("{" + js_template(st, scope) + "}" if BIND.search(st) else json.dumps(st))

    if tag in SVG_TAGS:
        comp = SVG_TAGS[tag]
        a = []
        for k, v in n.attrs.items():
            name = SVG_ATTRS.get(k, k)
            if k == "style":
                continue
            b = only_bind(v)
            a.append(f"{name}={{{ref(b, scope)}}}" if b else f"{name}={json.dumps(v)}")
        kids = [k for k in n.kids if isinstance(k, Node)]
        if not kids:
            return [ind + f"<{comp} {' '.join(a)} />"]
        out = [ind + f"<{comp} {' '.join(a)}>"]
        for k in kids:
            out.extend(emit(k, scope, ind + "  "))
        out.append(ind + f"</{comp}>")
        return out

    if tag == "image-slot":
        return [ind + "<Slot sid={" + js_template(n.attrs.get("id", ""), scope) + "} ph={" + js_template(n.attrs.get("placeholder", ""), scope) + "} />"]

    if tag in ("input", "textarea"):
        a = [sattr]
        if "value" in n.attrs:
            b = only_bind(n.attrs["value"])
            a.append("value={" + ref(b, scope) + "}" if b else "value=" + json.dumps(n.attrs["value"]))
        if "placeholder" in n.attrs:
            a.append("placeholder=" + json.dumps(n.attrs["placeholder"]))
        if "sc-camel-on-change" in n.attrs:
            a.append("onChange={" + ref(only_bind(n.attrs["sc-camel-on-change"]), scope) + "}")
        if "sc-camel-on-key-down" in n.attrs:
            a.append("onKey={" + ref(only_bind(n.attrs["sc-camel-on-key-down"]), scope) + "}")
        if tag == "textarea":
            a.append("multiline")
            if "rows" in n.attrs:
                a.append("rows={" + n.attrs["rows"] + "}")
        return [ind + "<Field " + " ".join(a) + " />"]

    if tag == "br":
        return [ind + '<T>{"\\n"}</T>']

    # --- special cases -------------------------------------------------
    if "sc-camel-on-pointer-down" in n.attrs:
        comp = "CardDrag"
        extra = ["c={c}"]
    elif "opacity:{{ c.stampDown }}" in st or "opacity:{{ c.stampNah }}" in st:
        comp = "Stamp"
        extra = ['kind="' + ("down" if "stampDown" in st else "nah") + '"', "c={c}"]
    elif n is phone:
        comp = "Root"
        extra = []
    elif n.attrs.get("data-screen-label") == "00 Lock screen":
        comp = "LockScreen"
        extra = ["onUnlock={vm.unlock}"]
    elif n.parent is phone and "height:47px" in st and "z-index:90" in st:
        comp = "FakeStatusBar"
        extra = []
    elif tag == "div" and any(isinstance(k, Node) and k.tag == "sc-for" and k.attrs.get("list") == "{{ qr }}" for k in n.kids):
        return [ind + "<QR cells={vm.qr} " + sattr + " />"]
    elif tag == "button":
        comp, extra = "V", ["btn"]
    elif tag in ("span", "b"):
        if span_is_text(n) and not is_flexlike(n):
            if tag == "b":
                st2 = "font-weight:700" + (";" + st if st else "")
                sattr = "s=" + ("{" + js_template(st2, scope) + "}" if BIND.search(st2) else json.dumps(st2))
            return [ind + f"<T {sattr}>" + "".join(emit_inline(n.kids, scope, ind)) + "</T>"]
        comp, extra = "V", ["span"]
    elif tag == "div":
        comp, extra = "V", []
    else:
        warnings.append(f"unknown tag {tag}")
        comp, extra = "V", []

    if "mask:" in st:
        extra.append("notch")
    a = [sattr] + extra + attrs_common(n, scope)
    if n.attrs.get("data-screen-label") == "03 Map":
        # The fake map art (water blobs, park, roads, fixed labels) is replaced by
        # a real OpenStreetMap layer; the "you" dot and pins move onto that layer.
        on_map, overlay = [], []
        seen_overlay = False
        for k in n.kids:
            if isinstance(k, Node) and "z-index:10" in style_of(k):
                seen_overlay = True
            if seen_overlay:
                overlay.append(k)
            elif isinstance(k, Node) and ("#2D6AE0" in style_of(k) or (k.tag == "sc-for" and k.attrs.get("list") == "{{ pins }}")):
                on_map.append(k)
        inner = []
        for k in on_map:
            inner.extend(emit(k, scope, ind + "    "))
        rest = Node(n.tag, n.attrs.items(), n.parent)
        rest.kids = overlay
        kids = [ind + "  <OsmMap vm={vm}>"] + inner + [ind + "  </OsmMap>"] + emit_children(rest, scope, ind + "  ")
        return [ind + f"<{comp} {' '.join(a)}>"] + kids + [ind + f"</{comp}>"]
    # small interaction additions the prototype left unwired
    txt = "".join(k for k in n.kids if isinstance(k, str)).strip()
    if tag == "div" and txt == "I already have an account":
        a.append("onPress={vm.onb.skip}")
    if tag == "div" and any(isinstance(k, Node) and k.tag == "br" for k in n.kids) and "font:800 92px" in st:
        a.append("onPress={vm.replayConfetti}")
    kids = emit_children(n, scope, ind + "  ")
    if not kids:
        return [ind + f"<{comp} {' '.join(a)} />"]
    return [ind + f"<{comp} {' '.join(a)}>"] + kids + [ind + f"</{comp}>"]


def emit_children_raw(kids, scope, ind, parent):
    """sc-if children: same grouping rules as the real parent element."""
    fake = Node("#group", {}, parent)
    fake.kids = kids
    fake.attrs = {"style": style_of(parent)} if parent is not None else {}
    fake.tag = parent.tag if parent is not None else "div"
    return emit_children(fake, scope, ind)


lines = emit(phone, set(), "    ")
header = '''// AUTO-GENERATED from the prototype template by scripts/transpile.py.
// Do not edit by hand: change the template or the transpiler, then re-run it.
/* eslint-disable */
import React from 'react';
import { CardDrag, Circle, Field, FakeStatusBar, LockScreen, OsmMap, Path, QR, Rect, Root, Slot, Stamp, Svg, T, V } from './ui';

export function Phone({ vm }: { vm: any }) {
  return (
'''
footer = '''  );
}
'''
open(OUT, "w", encoding="utf-8").write(header + "\n".join(lines) + "\n" + footer)
print("wrote", OUT, len(lines), "lines")
for w in warnings:
    print("WARN", w)
