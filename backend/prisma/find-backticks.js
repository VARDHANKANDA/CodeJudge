const fs = require('fs');
const content = fs.readFileSync('prisma/problem-packs/pack-250-ext-o.ts', 'utf8');
const lines = content.split('\n');
let count = 0;
lines.forEach((l, idx) => {
  const matches = (l.match(/`/g) || []).length;
  if (matches > 0) {
    count += matches;
    console.log(`Line ${idx + 1} (count ${matches}, total ${count}): ${l.trim().slice(0, 50)}`);
  }
});
console.log('Total backticks:', count);
