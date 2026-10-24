#!/usr/bin/env bash
# Build the web version and publish it to Vercel (project: imdownapp -> https://imdownapp.vercel.app).
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf web-build
npx expo export -p web --output-dir web-build/imdownapp
# Phone-browser polish: brand-colored browser chrome + full-screen "Add to Home Screen".
python3 - <<'PY'
p = 'web-build/imdownapp/index.html'
s = open(p).read()
meta = ('<meta name="theme-color" content="#FF5A1F" />'
        '<meta name="apple-mobile-web-app-capable" content="yes" />'
        '<meta name="mobile-web-app-capable" content="yes" />'
        '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />'
        '<meta name="apple-mobile-web-app-title" content="down." />'
        '<meta name="description" content="Swipe on plans before they exist. Back the ones you want to happen." />')
s = s.replace('<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />',
              '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />' + meta, 1)
open(p, 'w').write(s)
PY
cd web-build/imdownapp && vercel deploy --prod --yes
