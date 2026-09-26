// Składa stronę w jeden plik HTML (zdjęcia i czcionki wklejone jako data URI) — do podglądu i wysłania klientowi.
// Użycie:  node narzedzia/jeden-plik.js   →   dist/sloje-b2-jeden-plik.html
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'dist');

let h = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const mime = f => ({ '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' })[path.extname(f)];
const data = f => `data:${mime(f)};base64,` + fs.readFileSync(path.join(ROOT, f)).toString('base64');
// bez preloadów i bez srcset (zostaje największy wariant każdego zdjęcia)
h = h.replace(/<link rel="preload"[^>]*>\n?/g, '')
     .replace(/<!-- czcionki z własnego serwera[^\n]*\n/, '')
     .replace(/ srcset="([^"]*)"( sizes="[^"]*")?/g, (m, set, sizes, off, str) => {
       // <source> musi zachować srcset — bierzemy z niego największy plik
       if (/<source[^>]*$/.test(str.slice(Math.max(0, off - 120), off))) { const files = set.split(',').map(s => s.trim().split(' ')[0]); return ` srcset="${files[files.length - 1]}"`; }
       return '';
     })
     .replace(/(src|href|srcset)="((?:img|fonts)\/[^"]+)"/g, (m, a, f) => `${a}="${data(f)}"`)
     .replace(/url\(((?:img|fonts)\/[^)]+)\)/g, (m, f) => `url(${data(f)})`);
const left = h.match(/(?:"|\()(?:img|fonts)\/[^")]+/g);
if (left) throw new Error('niewklejone zasoby: ' + left.join(', '));
fs.mkdirSync(OUT, { recursive: true });
const file = path.join(OUT, 'sloje-b2-jeden-plik.html');
fs.writeFileSync(file, h);
console.log(`${path.relative(ROOT, file)}: ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
