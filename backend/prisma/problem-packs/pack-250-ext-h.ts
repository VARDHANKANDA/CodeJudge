import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack250ExtHDefs: ProblemDef[] = [
  // 1. Bitwise AND of Numbers Range
  {
    title: 'Bitwise AND of Numbers Range',
    slug: 'bitwise-and-of-numbers-range',
    description: `Given two integers \`left\` and \`right\` that represent the range \`[left, right]\`, return the bitwise AND of all numbers in this range, inclusive.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= left <= right <= 2^31 - 1`,
    inputFormat: `Two integers left and right.`,
    outputFormat: `An integer representing the bitwise AND.`,
    sampleInput: `5 7`,
    sampleOutput: `4`,
    points: 150,
    hints: [
      'The result is the common binary prefix of left and right.',
      'Shift left and right rightward until they become equal, then shift back.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if len(raw) < 2:
        return
    l, r = int(raw[0]), int(raw[1])
    shift = 0
    while l < r:
        l >>= 1
        r >>= 1
        shift += 1
    print(l << shift)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (raw.length < 2) return;
    let l = parseInt(raw[0], 10);
    let r = parseInt(raw[1], 10);
    let shift = 0;
    while (l < r) {
        l >>= 1;
        r >>= 1;
        shift++;
    }
    console.log(l << shift);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
raw = sys.stdin.read().split()
if len(raw) >= 2:
    l, r = int(raw[0]), int(raw[1])
    shift = 0
    while l < r:
        l >>= 1
        r >>= 1
        shift += 1
    print(l << shift)
`,
      javascript: `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (raw.length >= 2) {
    let l = parseInt(raw[0], 10), r = parseInt(raw[1], 10), shift = 0;
    while (l < r) { l >>= 1; r >>= 1; shift++; }
    console.log(l << shift);
}
`,
    },
    editorial: {
      approach: 'Common Binary Prefix Finding.',
      algorithm: '1. As soon as bits differ between left and right, the continuous range contains both 0 and 1, forcing that bit to 0.\n2. Shift both numbers rightward until they match, then left-shift by the same amount.',
      timeComplexity: 'O(log(right)) = O(1)',
      spaceComplexity: 'O(1)',
      content: 'Bitwise range AND equals the common binary prefix of the range endpoints.',
      referenceCode: `while l < r: l >>= 1; r >>= 1; shift += 1\nreturn l << shift`,
    },
    tags: ['Bit Manipulation'],
    testCases: [
      { input: `5 7`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `0 0`, expectedOutput: `0`, isHidden: false, order: 1 },
      { input: `1 2147483647`, expectedOutput: `0`, isHidden: true, order: 2 },
      { input: `10 10`, expectedOutput: `10`, isHidden: true, order: 3 },
    ],
  },

  // 2. Minimum Number of Arrows to Burst Balloons
  {
    title: 'Minimum Arrows to Burst Balloons',
    slug: 'minimum-arrows-to-burst-balloons',
    description: `There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array \`points\` where \`points[i] = [xstart, xend]\` denotes a balloon whose horizontal diameter stretches between \`xstart\` and \`xend\`.
An arrow can be shot up exactly vertically from different points along the x-axis. A balloon with \`xstart\` and \`xend\` is burst by an arrow shot at \`x\` if \`xstart <= x <= xend\`.
Given the array \`points\`, return the minimum number of arrows that must be shot to burst all balloons.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= points.length <= 10^5\n-2^31 <= xstart < xend <= 2^31 - 1`,
    inputFormat: `Line 1: N\nNext N lines: xstart xend`,
    outputFormat: `An integer representing minimum arrows.`,
    sampleInput: `4\n10 16\n2 8\n1 6\n7 12`,
    sampleOutput: `2`,
    points: 150,
    hints: [
      'Sort balloons by end coordinate.',
      'Shoot arrow at the earliest end point to burst maximum overlapping balloons.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        print(0)
        return
    n = int(data[0])
    pts = []
    idx = 1
    for _ in range(n):
        pts.append((int(data[idx]), int(data[idx+1])))
        idx += 2
        
    pts.sort(key=lambda x: x[1])
    arrows = 1
    curr_end = pts[0][1]
    
    for s, e in pts[1:]:
        if s > curr_end:
            arrows += 1
            curr_end = e
            
    print(arrows)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!data || data.length < 1) { console.log(0); return; }
    const n = parseInt(data[0], 10);
    const pts = [];
    let idx = 1;
    for (let i = 0; i < n; i++) {
        pts.push([parseInt(data[idx++], 10), parseInt(data[idx++], 10)]);
    }
    pts.sort((a, b) => a[1] - b[1]);
    
    let arrows = 1;
    let currEnd = pts[0][1];
    
    for (let i = 1; i < n; i++) {
        if (pts[i][0] > currEnd) {
            arrows++;
            currEnd = pts[i][1];
        }
    }
    console.log(arrows);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
data = sys.stdin.read().split()
if data:
    n = int(data[0])
    pts = []
    idx = 1
    for _ in range(n):
        pts.append((int(data[idx]), int(data[idx+1])))
        idx += 2
    pts.sort(key=lambda x: x[1])
    arrows = 1
    curr = pts[0][1]
    for s, e in pts[1:]:
        if s > curr:
            arrows += 1
            curr = e
    print(arrows)
else:
    print(0)
`,
      javascript: `const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data && data.length >= 1) {
    const n = parseInt(data[0], 10);
    const pts = [];
    let idx = 1;
    for (let i = 0; i < n; i++) pts.push([parseInt(data[idx++], 10), parseInt(data[idx++], 10)]);
    pts.sort((a, b) => a[1] - b[1]);
    let arrows = 1, curr = pts[0][1];
    for (let i = 1; i < n; i++) {
        if (pts[i][0] > curr) { arrows++; curr = pts[i][1]; }
    }
    console.log(arrows);
} else { console.log(0); }
`,
    },
    editorial: {
      approach: 'Greedy Interval Scheduling by End Coordinate.',
      algorithm: '1. Sort intervals ascending by end position.\n2. Place arrow at end of first interval.\n3. Whenever a start position exceeds current arrow point, shoot another arrow.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      content: 'Greedily shooting at the earliest endpoint guarantees maximum overlap with subsequent intervals.',
      referenceCode: `pts.sort(key=lambda x: x[1])\nfor s, e in pts: if s > curr: arrows += 1; curr = e`,
    },
    tags: ['Greedy', 'Sorting', 'Array'],
    testCases: [
      { input: `4\n10 16\n2 8\n1 6\n7 12`, expectedOutput: `2`, isHidden: false, order: 0 },
      { input: `4\n1 2\n3 4\n5 6\n7 8`, expectedOutput: `4`, isHidden: false, order: 1 },
      { input: `4\n1 2\n2 3\n3 4\n4 5`, expectedOutput: `2`, isHidden: true, order: 2 },
    ],
  },

  // 3. Maximum Subarray Sum with One Deletion (Medium - DP)
  {
    title: 'Maximum Subarray Sum with One Deletion',
    slug: 'maximum-subarray-sum-with-one-deletion',
    description: `Given an array of integers \`nums\`, return the maximum sum of a non-empty subarray with at most **one element deletion**.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4`,
    inputFormat: `Comma or space separated integers.`,
    outputFormat: `An integer representing the maximum subarray sum.`,
    sampleInput: `1,-2,0,3`,
    sampleOutput: `4`,
    points: 150,
    hints: [
      'Maintain two DP values: no_del (max sum ending at i with 0 deletions) and one_del (max sum ending at i with 1 deletion).',
      'no_del = max(num, no_del + num)',
      'one_del = max(prev_no_del, one_del + num)',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read().strip().replace(',', ' ').split()
    if not raw:
        return
    nums = [int(x) for x in raw]
    n = len(nums)
    if n == 1:
        print(nums[0])
        return
        
    no_del = nums[0]
    one_del = 0
    ans = nums[0]
    
    for x in nums[1:]:
        one_del = max(no_del, one_del + x)
        no_del = max(x, no_del + x)
        ans = max(ans, no_del, one_del)
        
    print(ans)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
    if (!raw || raw[0] === '') return;
    const nums = raw.map(x => parseInt(x, 10));
    if (nums.length === 1) { console.log(nums[0]); return; }
    
    let noDel = nums[0];
    let oneDel = 0;
    let ans = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        const x = nums[i];
        oneDel = Math.max(noDel, oneDel + x);
        noDel = Math.max(x, noDel + x);
        ans = Math.max(ans, noDel, oneDel);
    }
    
    console.log(ans);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
raw = sys.stdin.read().strip().replace(',', ' ').split()
if raw:
    nums = [int(x) for x in raw]
    if len(nums) == 1:
        print(nums[0])
    else:
        no_del = nums[0]
        one_del = 0
        ans = nums[0]
        for x in nums[1:]:
            one_del = max(no_del, one_del + x)
            no_del = max(x, no_del + x)
            ans = max(ans, no_del, one_del)
        print(ans)
`,
      javascript: `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
if (raw && raw[0] !== '') {
    const nums = raw.map(x => parseInt(x, 10));
    if (nums.length === 1) console.log(nums[0]);
    else {
        let noDel = nums[0], oneDel = 0, ans = nums[0];
        for (let i = 1; i < nums.length; i++) {
            const x = nums[i];
            oneDel = Math.max(noDel, oneDel + x);
            noDel = Math.max(x, noDel + x);
            ans = Math.max(ans, noDel, oneDel);
        }
        console.log(ans);
    }
}
`,
    },
    editorial: {
      approach: 'Two-State Kadane Dynamic Programming.',
      algorithm: '1. no_del tracks standard max subarray sum.\n2. one_del tracks max subarray sum with exactly one deleted element.\n3. Update states sequentially across all elements in O(1) space.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Modified Kadane maintains optimal subarray sums across deletion states.',
      referenceCode: `one_del = max(prev_no_del, one_del + x)\nno_del = max(x, no_del + x)`,
    },
    tags: ['Dynamic Programming', 'Array'],
    testCases: [
      { input: `1,-2,0,3`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `1,-2,-2,3`, expectedOutput: `3`, isHidden: false, order: 1 },
      { input: `-1,-1,-1,-1`, expectedOutput: `-1`, isHidden: true, order: 2 },
    ],
  },
];
