import * as fs from 'fs';
import * as path from 'path';

const packsDir = path.join(__dirname, 'problem-packs');
const files = fs.readdirSync(packsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
let total = 0;
for (const file of files) {
  const content = fs.readFileSync(path.join(packsDir, file), 'utf8');
  const matches = content.match(/slug:\s*['"`]/g) || [];
  console.log(`${file}: ${matches.length}`);
  total += matches.length;
}

// also check canonical problems and problems-batch1
const batch1File = path.join(__dirname, 'problems-batch1.ts');
if (fs.existsSync(batch1File)) {
  const c = fs.readFileSync(batch1File, 'utf8');
  const m = c.match(/slug:\s*['"`]/g) || [];
  console.log(`problems-batch1.ts: ${m.length}`);
  total += m.length;
}

const seedFile = path.join(__dirname, 'seed.ts');
if (fs.existsSync(seedFile)) {
  const c = fs.readFileSync(seedFile, 'utf8');
  const m = c.match(/slug:\s*['"`]/g) || [];
  console.log(`seed.ts canonical matches: ${m.length}`);
}

console.log(`\nTotal problem definitions found: ${total}`);
