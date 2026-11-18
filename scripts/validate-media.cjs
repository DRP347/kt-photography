const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const roots = ['app', 'components', 'data', 'lib'];
function files(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(path.join(dir, entry.name)) : [path.join(dir, entry.name)]); }
(async () => {
  const references = roots.flatMap(files).filter(file => /\.(tsx?|json)$/.test(file)).flatMap(file => [...fs.readFileSync(file, 'utf8').matchAll(/["'`](\/[^"'`\n]+\.(?:webp|jpe?g|png|svg|mp4|woff2?|otf))["'`]/gi)].map(match => ({ file, src: match[1] })));
  const unique = [...new Set(references.map(ref => ref.src))];
  const failures = [];
  for (const src of unique) {
    const local = path.join('public', src);
    if (!fs.existsSync(local)) { failures.push({ src, issue: 'missing' }); continue; }
    if (/\.(webp|jpe?g|png)$/i.test(src)) {
      try { await sharp(local).stats(); } catch { failures.push({ src, issue: 'cannot decode' }); }
    }
  }
  const result = { references: references.length, uniqueAssets: unique.length, failures };
  console.log(JSON.stringify(result, null, 2));
  fs.mkdirSync('reports/editorial-rebuild', { recursive: true });
  fs.writeFileSync('reports/editorial-rebuild/media-validation.json', JSON.stringify(result, null, 2));
  if (failures.length) process.exitCode = 1;
})();
