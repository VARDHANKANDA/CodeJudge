import { allExtendedProblemDefs } from './problem-packs';

const slugs = new Set<string>();
const duplicates: string[] = [];

// Canonical problems in seed.ts
const canonicalSlugs = [
  'two-sum',
  'reverse-linked-list',
  'valid-parentheses',
  'maximum-subarray',
  'binary-search',
  'merge-intervals',
  'lowest-common-ancestor-of-a-binary-tree',
  'coin-change',
  'word-search',
  'number-of-islands',
];

for (const s of canonicalSlugs) {
  slugs.add(s);
}

let extCount = 0;
for (const p of allExtendedProblemDefs) {
  extCount++;
  if (slugs.has(p.slug)) {
    duplicates.push(p.slug);
  } else {
    slugs.add(p.slug);
  }
}

console.log(`Canonical problems: ${canonicalSlugs.length}`);
console.log(`Extended problems in allExtendedProblemDefs: ${extCount}`);
console.log(`Total unique slugs: ${slugs.size}`);
console.log(`Duplicates found: ${duplicates.length}`);
if (duplicates.length > 0) {
  console.log(`Duplicate slugs:`, duplicates);
}

// Difficulty distribution
let easy = 0, medium = 0, hard = 0;
// We can check canonical difficulties
// two-sum: EASY, reverse-linked-list: EASY, valid-parentheses: EASY, maximum-subarray: MEDIUM, binary-search: EASY, merge-intervals: MEDIUM, lowest-common-ancestor: MEDIUM, coin-change: MEDIUM, word-search: MEDIUM, number-of-islands: MEDIUM
easy += 4;
medium += 6;

for (const p of allExtendedProblemDefs) {
  if (p.difficulty === 'EASY') easy++;
  else if (p.difficulty === 'MEDIUM') medium++;
  else if (p.difficulty === 'HARD') hard++;
}

console.log(`\nDifficulty breakdown across all ${slugs.size} problems:`);
console.log(`- Easy: ${easy} (${((easy / slugs.size) * 100).toFixed(1)}%)`);
console.log(`- Medium: ${medium} (${((medium / slugs.size) * 100).toFixed(1)}%)`);
console.log(`- Hard: ${hard} (${((hard / slugs.size) * 100).toFixed(1)}%)`);
