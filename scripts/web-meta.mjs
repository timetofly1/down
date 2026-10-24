// Adds phone-browser polish to the exported index.html:
// brand-colored browser chrome, full-screen "Add to Home Screen", share description.
// Usage: node scripts/web-meta.mjs dist/index.html
import fs from 'node:fs';

const file = process.argv[2] || 'dist/index.html';
let html = fs.readFileSync(file, 'utf8');
const meta = [
  '<meta name="theme-color" content="#FF5A1F" />',
  '<meta name="apple-mobile-web-app-capable" content="yes" />',
  '<meta name="mobile-web-app-capable" content="yes" />',
  '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />',
  '<meta name="apple-mobile-web-app-title" content="down." />',
  '<meta name="description" content="Boston could use more life. Start some. Pitch a plan or back someone else\'s." />',
].join('');
html = html.replace(
  /<meta name="viewport"[^>]*>/,
  '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />' + meta,
);
fs.writeFileSync(file, html);
console.log('web-meta: updated', file);
