const fs = require('fs');
const path = require('path');

// Fix build_packs_m.js test cases isHidden flag
let mJs = fs.readFileSync(path.join(__dirname, 'build_packs_m.js'), 'utf8');

// Replace the 8 cases in build_packs_m.js where last test case was isHidden: false
const missingHiddenSlugs = [
  'maximum-profit-in-job-scheduling-dp',
  'minimum-number-of-k-consecutive-bit-flips',
  'sliding-puzzle-bfs-shortest-moves',
  'minimum-cost-to-merge-stones-interval-dp',
  'chalkboard-xor-game-nim-theory',
  'find-kth-smallest-pair-distance-bs',
  'longest-chunked-palindrome-decomposition-greedy',
  'number-of-valid-subarrays-monotonic-stack',
];

for (const slug of missingHiddenSlugs) {
  const slugIdx = mJs.indexOf(`slug: '${slug}'`);
  if (slugIdx !== -1) {
    const nextTestCasesIdx = mJs.indexOf('testCases: [', slugIdx);
    const endTestCasesIdx = mJs.indexOf('],', nextTestCasesIdx);
    const testCasesBlock = mJs.slice(nextTestCasesIdx, endTestCasesIdx + 2);
    // In this block, change the last `isHidden: false` to `isHidden: true`
    const lastFalse = testCasesBlock.lastIndexOf('isHidden: false');
    if (lastFalse !== -1) {
      const fixedBlock = testCasesBlock.slice(0, lastFalse) + 'isHidden: true' + testCasesBlock.slice(lastFalse + 'isHidden: false'.length);
      mJs = mJs.slice(0, nextTestCasesIdx) + fixedBlock + mJs.slice(endTestCasesIdx + 2);
    }
  }
}
fs.writeFileSync(path.join(__dirname, 'build_packs_m.js'), mJs, 'utf8');
console.log('Updated build_packs_m.js hidden flags');

// Now re-run build_packs_m.js
require('./build_packs_m.js');

// Update titles and testcases in pack-500-part-g.ts
const gPath = path.join(__dirname, '..', 'prisma', 'problem-packs', 'pack-500-part-g.ts');
let g = fs.readFileSync(gPath, 'utf8');
g = g.replace('Letter Combinations of a Phone Number', 'Letter Combinations of a Phone Number Backtracking');
const sudokuIdx = g.indexOf('sudoku-solver-grid-completer');
if (sudokuIdx !== -1) {
  const tcIdx = g.indexOf('testCases', sudokuIdx);
  const endTcIdx = g.indexOf('],', tcIdx);
  const tcBlock = g.slice(tcIdx, endTcIdx + 2);
  const lastFalse = tcBlock.lastIndexOf('isHidden: false');
  if (lastFalse !== -1) {
    const fixedTc = tcBlock.slice(0, lastFalse) + 'isHidden: true' + tcBlock.slice(lastFalse + 'isHidden: false'.length);
    g = g.slice(0, tcIdx) + fixedTc + g.slice(endTcIdx + 2);
  }
}
fs.writeFileSync(gPath, g, 'utf8');

// Update pack-500-part-h.ts
const hPath = path.join(__dirname, '..', 'prisma', 'problem-packs', 'pack-500-part-h.ts');
let h = fs.readFileSync(hPath, 'utf8');
h = h.replace('Kth Ancestor of a Tree Node Binary Lifting', 'Kth Ancestor of a Tree Node Binary Lifting Query');
h = h.replace('Construct Binary Tree from Preorder and Inorder Traversal', 'Construct Binary Tree Preorder and Inorder Hash Map');
fs.writeFileSync(hPath, h, 'utf8');

// Update pack-500-part-f.ts
const fPath = path.join(__dirname, '..', 'prisma', 'problem-packs', 'pack-500-part-f.ts');
let f = fs.readFileSync(fPath, 'utf8');
f = f.replace('Minimum Arrows to Burst Balloons', 'Minimum Arrows to Burst Balloons Interval Sweep');
fs.writeFileSync(fPath, f, 'utf8');

// Update pack-500-part-i.ts
const iPath = path.join(__dirname, '..', 'prisma', 'problem-packs', 'pack-500-part-i.ts');
let i = fs.readFileSync(iPath, 'utf8');
i = i.replace('Sliding Window Maximum Monotonic Deque', 'Sliding Window Maximum Monotonic Deque K Elements');
fs.writeFileSync(iPath, i, 'utf8');

// Update pack-500-part-c.ts
const cPath = path.join(__dirname, '..', 'prisma', 'problem-packs', 'pack-500-part-c.ts');
let c = fs.readFileSync(cPath, 'utf8');
c = c.replace('Maximum Frequency Stack Design', 'Maximum Frequency Stack Frequency Groups Design');
fs.writeFileSync(cPath, c, 'utf8');

console.log('All metadata & title uniqueness resolved.');
