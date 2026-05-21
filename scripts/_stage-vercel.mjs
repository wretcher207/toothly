// Stages the Expo web export (app/dist) into Vercel's Build Output API format
// at app/.vercel/output, generating clean-URL overrides for every top-level
// route so /explore, /modal, etc. resolve and survive a page refresh.
// Run with cwd = the app/ directory (the deploy .bat does this).
import fs from 'node:fs';
import path from 'node:path';

const appDir = process.cwd();
const dist = path.join(appDir, 'dist');
const out = path.join(appDir, '.vercel', 'output');
const staticDir = path.join(out, 'static');

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('No dist/index.html found. Run `expo export -p web` first.');
  process.exit(1);
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(staticDir, { recursive: true });
fs.cpSync(dist, staticDir, { recursive: true });

const overrides = {};
for (const f of fs.readdirSync(dist)) {
  if (f.endsWith('.html') && f !== 'index.html' && f !== '+not-found.html') {
    overrides[f] = { path: f.slice(0, -5) }; // explore.html -> /explore
  }
}

fs.writeFileSync(
  path.join(out, 'config.json'),
  JSON.stringify({ version: 3, overrides }, null, 2)
);

console.log(`Staged ${Object.keys(overrides).length} clean-URL route(s):`, Object.values(overrides).map((o) => '/' + o.path).join(', '));
