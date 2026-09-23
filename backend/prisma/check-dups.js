const fs = require('fs');
const path = require('path');
const packsDir = path.join(__dirname, 'problem-packs');
const files = fs.readdirSync(packsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
files.push('../problems-batch1.ts');

const dupSlugs = ['binary-search', 'reverse-linked-list', 'number-of-islands', 'word-search', 'coin-change', 'kth-largest-element-in-an-array', 'lowest-common-ancestor-of-a-binary-tree'];

for (const s of dupSlugs) {
  const foundIn = [];
  for (const f of files) {
    const filePath = path.join(packsDir, f);
    if (fs.existsSync(filePath)) {
      const c = fs.readFileSync(filePath, 'utf8');
      if (c.includes(`'${s}'`) || c.includes(`"${s}"`)) {
        foundIn.push(f);
      }
    }
  }
  console.log(s, 'found in:', foundIn);
}
