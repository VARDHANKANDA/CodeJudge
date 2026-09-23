import { allExtendedProblemDefs } from './problem-packs';

// Extract actual seed.ts canonical problems
const canonical = [
  { slug: 'two-sum', difficulty: 'EASY' },
  { slug: 'reverse-linked-list', difficulty: 'EASY' },
  { slug: 'valid-parentheses', difficulty: 'EASY' },
  { slug: 'maximum-subarray', difficulty: 'MEDIUM' },
  { slug: 'binary-search', difficulty: 'EASY' },
  { slug: 'merge-intervals', difficulty: 'MEDIUM' },
  { slug: 'lowest-common-ancestor-of-a-binary-search-tree', difficulty: 'MEDIUM' },
  { slug: 'climbing-stairs', difficulty: 'EASY' },
  { slug: 'invert-binary-tree', difficulty: 'EASY' },
  { slug: 'best-time-to-buy-and-sell-stock', difficulty: 'EASY' },
];

const allProblemsMap = new Map<string, any>();
const collisions: { slug: string; packIdx: number }[] = [];

for (const c of canonical) {
  allProblemsMap.set(c.slug, c);
}

allExtendedProblemDefs.forEach((p, idx) => {
  if (allProblemsMap.has(p.slug)) {
    collisions.push({ slug: p.slug, packIdx: idx });
  }
  allProblemsMap.set(p.slug, p);
});

console.log(`Total Unique Problems: ${allProblemsMap.size}`);
console.log(`Collisions found: ${collisions.length}`);
if (collisions.length > 0) {
  console.log('Collisions:', collisions);
}

let easy = 0, medium = 0, hard = 0;
for (const p of allProblemsMap.values()) {
  if (p.difficulty === 'EASY') easy++;
  else if (p.difficulty === 'MEDIUM') medium++;
  else if (p.difficulty === 'HARD') hard++;
}

console.log(`\nExact Verified Distribution Across All ${allProblemsMap.size} Problems:`);
console.log(`- Easy:   ${easy} (${((easy / allProblemsMap.size) * 100).toFixed(1)}%)`);
console.log(`- Medium: ${medium} (${((medium / allProblemsMap.size) * 100).toFixed(1)}%)`);
console.log(`- Hard:   ${hard} (${((hard / allProblemsMap.size) * 100).toFixed(1)}%)`);
