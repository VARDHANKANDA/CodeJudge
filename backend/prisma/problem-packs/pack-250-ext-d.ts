import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack250ExtDDefs: ProblemDef[] = [
  // 1. Burst Balloons (Hard)
  {
    title: 'Burst Balloons',
    slug: 'burst-balloons',
    description: `You are given \`n\` balloons, indexed from \`0\` to \`n - 1\`. Each balloon is painted with a number on it represented by an array \`nums\`. You are asked to burst all the balloons.
If you burst the \`i\`-th balloon, you will get \`nums[i - 1] * nums[i] * nums[i + 1]\` coins. If \`i - 1\` or \`i + 1\` goes out of bounds of the array, then treat it as if there is a balloon with a \`1\` painted on it.
Return the **maximum coins** you can collect by bursting the balloons wisely.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 300\n0 <= nums[i] <= 100`,
    inputFormat: `Comma or space separated integers on a single line.`,
    outputFormat: `An integer representing the maximum coins.`,
    sampleInput: `3,1,5,8`,
    sampleOutput: `167`,
    points: 200,
    hints: [
      'Think backwards: instead of choosing which balloon to burst first, choose which balloon is the LAST to burst in range (i, j).',
      'If balloon k is the last to burst in (i, j), coins gained are nums[i]*nums[k]*nums[j] + dp[i][k] + dp[k][j].',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read().strip().replace(',', ' ').split()
    if not raw:
        print(0)
        return
    nums = [1] + [int(x) for x in raw] + [1]
    n = len(nums)
    dp = [[0] * n for _ in range(n)]
    
    for l in range(2, n):
        for left in range(n - l):
            right = left + l
            for k in range(left + 1, right):
                coins = nums[left] * nums[k] * nums[right] + dp[left][k] + dp[k][right]
                if coins > dp[left][right]:
                    dp[left][right] = coins
                    
    print(dp[0][n - 1])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
    if (!raw || raw[0] === '') { console.log(0); return; }
    const nums = [1, ...raw.map(x => parseInt(x, 10)), 1];
    const n = nums.length;
    const dp = Array.from({ length: n }, () => new Int32Array(n));
    
    for (let l = 2; l < n; l++) {
        for (let left = 0; left < n - l; left++) {
            const right = left + l;
            let maxCoins = 0;
            for (let k = left + 1; k < right; k++) {
                const coins = nums[left] * nums[k] * nums[right] + dp[left][k] + dp[k][right];
                if (coins > maxCoins) maxCoins = coins;
            }
            dp[left][right] = maxCoins;
        }
    }
    console.log(dp[0][n - 1]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
raw = sys.stdin.read().strip().replace(',', ' ').split()
if raw:
    nums = [1] + [int(x) for x in raw] + [1]
    n = len(nums)
    dp = [[0] * n for _ in range(n)]
    for l in range(2, n):
        for left in range(n - l):
            right = left + l
            for k in range(left + 1, right):
                coins = nums[left] * nums[k] * nums[right] + dp[left][k] + dp[k][right]
                if coins > dp[left][right]: dp[left][right] = coins
    print(dp[0][n - 1])
else:
    print(0)
`,
      javascript: `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
if (raw && raw[0] !== '') {
    const nums = [1, ...raw.map(x => parseInt(x, 10)), 1];
    const n = nums.length;
    const dp = Array.from({ length: n }, () => new Int32Array(n));
    for (let l = 2; l < n; l++) {
        for (let left = 0; left < n - l; left++) {
            const right = left + l;
            let maxCoins = 0;
            for (let k = left + 1; k < right; k++) {
                const coins = nums[left] * nums[k] * nums[right] + dp[left][k] + dp[k][right];
                if (coins > maxCoins) maxCoins = coins;
            }
            dp[left][right] = maxCoins;
        }
    }
    console.log(dp[0][n - 1]);
} else { console.log(0); }
`,
    },
    editorial: {
      approach: 'Interval Dynamic Programming (Last Element Selection).',
      algorithm: '1. Pad array with boundary 1s on left and right.\n2. Iterate interval lengths from 2 to n.\n3. For each sub-interval (left, right), choose balloon k as the last burst balloon.\n4. dp[left][right] = max(nums[left]*nums[k]*nums[right] + dp[left][k] + dp[k][right]).\n5. Output dp[0][n-1].',
      timeComplexity: 'O(N^3)',
      spaceComplexity: 'O(N^2)',
      content: 'Selecting the last balloon to burst preserves boundary independence between sub-intervals.',
      referenceCode: `for l in range(2, n):\n    for left in range(n - l):\n        right = left + l\n        dp[left][right] = max(nums[left]*nums[k]*nums[right] + dp[left][k] + dp[k][right] for k in range(left+1, right))`,
    },
    tags: ['Dynamic Programming', 'Interval DP', 'Array'],
    testCases: [
      { input: `3,1,5,8`, expectedOutput: `167`, isHidden: false, order: 0 },
      { input: `1,5`, expectedOutput: `10`, isHidden: false, order: 1 },
      { input: `7`, expectedOutput: `7`, isHidden: true, order: 2 },
      { input: `9,76,64,21`, expectedOutput: `116718`, isHidden: true, order: 3 },
    ],
  },

  // 2. Russian Doll Envelopes (Hard)
  {
    title: 'Russian Doll Envelopes',
    slug: 'russian-doll-envelopes',
    description: `You are given a 2D array of integers \`envelopes\` where \`envelopes[i] = [wi, hi]\` represents the width and the height of an envelope.
One envelope can fit into another if and only if both the width and height of one envelope are strictly greater than the other envelope's width and height.
Return the maximum number of envelopes you can Russian doll (i.e., put one inside the other).`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= envelopes.length <= 10^5\n1 <= wi, hi <= 10^5`,
    inputFormat: `Line 1: N\nNext N lines: w h`,
    outputFormat: `An integer representing the maximum nesting depth.`,
    sampleInput: `4\n5 4\n6 4\n6 7\n2 3`,
    sampleOutput: `3`,
    points: 200,
    hints: [
      'Sort envelopes ascending by width, and descending by height on width ties.',
      'This reduces the problem to finding the Longest Increasing Subsequence (LIS) on heights in O(N log N) using binary search (bisect).',
    ],
    codeTemplates: {
      python: `import sys
import bisect

def solve():
    data = sys.stdin.read().split()
    if not data:
        print(0)
        return
    n = int(data[0])
    envs = []
    idx = 1
    for _ in range(n):
        envs.append((int(data[idx]), int(data[idx+1])))
        idx += 2
        
    # Sort width asc, height desc
    envs.sort(key=lambda x: (x[0], -x[1]))
    
    # LIS on heights
    lis = []
    for _, h in envs:
        pos = bisect.bisect_left(lis, h)
        if pos == len(lis):
            lis.append(h)
        else:
            lis[pos] = h
            
    print(len(lis))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!data || data.length < 1) { console.log(0); return; }
    const n = parseInt(data[0], 10);
    const envs = [];
    let idx = 1;
    for (let i = 0; i < n; i++) {
        envs.push([parseInt(data[idx++], 10), parseInt(data[idx++], 10)]);
    }
    
    envs.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]);
    
    const lis = [];
    for (let i = 0; i < n; i++) {
        const h = envs[i][1];
        let l = 0, r = lis.length;
        while (l < r) {
            const mid = (l + r) >> 1;
            if (lis[mid] < h) l = mid + 1;
            else r = mid;
        }
        if (l === lis.length) lis.push(h);
        else lis[l] = h;
    }
    
    console.log(lis.length);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
import bisect
data = sys.stdin.read().split()
if data:
    n = int(data[0])
    envs = []
    idx = 1
    for _ in range(n):
        envs.append((int(data[idx]), int(data[idx+1])))
        idx += 2
    envs.sort(key=lambda x: (x[0], -x[1]))
    lis = []
    for _, h in envs:
        pos = bisect.bisect_left(lis, h)
        if pos == len(lis): lis.append(h)
        else: lis[pos] = h
    print(len(lis))
else:
    print(0)
`,
      javascript: `const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data && data.length >= 1) {
    const n = parseInt(data[0], 10);
    const envs = [];
    let idx = 1;
    for (let i = 0; i < n; i++) envs.push([parseInt(data[idx++], 10), parseInt(data[idx++], 10)]);
    envs.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]);
    const lis = [];
    for (let i = 0; i < n; i++) {
        const h = envs[i][1];
        let l = 0, r = lis.length;
        while (l < r) {
            const mid = (l + r) >> 1;
            if (lis[mid] < h) l = mid + 1;
            else r = mid;
        }
        if (l === lis.length) lis.push(h);
        else lis[l] = h;
    }
    console.log(lis.length);
} else { console.log(0); }
`,
    },
    editorial: {
      approach: 'Custom 2D Sort + Patience Sorting LIS via Binary Search.',
      algorithm: '1. Sort envelopes ascending by width and descending by height for ties.\n2. Extract heights and compute Longest Increasing Subsequence in O(N log N) using binary search.\n3. Output LIS length.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      content: 'Descending height sort on width ties ensures at most one envelope is chosen from any single width group.',
      referenceCode: `envs.sort(key=lambda x: (x[0], -x[1]))\nfor _, h in envs: bisect_insert(lis, h)`,
    },
    tags: ['Dynamic Programming', 'Binary Search', 'Sorting', 'Array'],
    testCases: [
      { input: `4\n5 4\n6 4\n6 7\n2 3`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `3\n1 1\n1 1\n1 1`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `1\n2 3`, expectedOutput: `1`, isHidden: true, order: 2 },
      { input: `6\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7`, expectedOutput: `6`, isHidden: true, order: 3 },
    ],
  },

  // 3. Maximum Profit in Job Scheduling (Hard)
  {
    title: 'Maximum Profit in Job Scheduling',
    slug: 'maximum-profit-in-job-scheduling',
    description: `We have \`n\` jobs, where every job is scheduled to be done from \`startTime[i]\` to \`endTime[i]\`, obtaining a profit of \`profit[i]\`.
You're given the \`startTime\`, \`endTime\` and \`profit\` arrays, return the maximum profit you can take such that there are no two jobs in the subset with overlapping time range.
If you choose a job that ends at time \`X\` you will be able to start another job that starts at time \`X\`.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= startTime.length == endTime.length == profit.length <= 5 * 10^4\n1 <= startTime[i] < endTime[i] <= 10^9\n1 <= profit[i] <= 10^4`,
    inputFormat: `Line 1: N\nLine 2: N start times\nLine 3: N end times\nLine 4: N profits`,
    outputFormat: `An integer representing maximum profit.`,
    sampleInput: `4\n1 2 3 3\n3 4 5 6\n50 10 40 70`,
    sampleOutput: `120`,
    points: 200,
    hints: [
      'Sort jobs by their end times.',
      'Define dp[i] as max profit considering first i jobs. For job i, binary search for the latest non-conflicting job j where endTime[j] <= startTime[i].',
    ],
    codeTemplates: {
      python: `import sys
import bisect

def solve():
    data = sys.stdin.read().split()
    if not data:
        print(0)
        return
    n = int(data[0])
    idx = 1
    starts = [int(x) for x in data[idx:idx+n]]
    idx += n
    ends = [int(x) for x in data[idx:idx+n]]
    idx += n
    profits = [int(x) for x in data[idx:idx+n]]
    
    jobs = sorted(zip(starts, ends, profits), key=lambda x: x[1])
    dp = [(0, 0)] # (endTime, maxProfit)
    
    for s, e, p in jobs:
        # Find latest job ending <= s
        i = bisect.bisect_right(dp, (s, float('inf'))) - 1
        gain = dp[i][1] + p
        if gain > dp[-1][1]:
            dp.append((e, gain))
            
    print(dp[-1][1])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!data || data.length < 1) { console.log(0); return; }
    const n = parseInt(data[0], 10);
    let idx = 1;
    const starts = [];
    for (let i = 0; i < n; i++) starts.push(parseInt(data[idx++], 10));
    const ends = [];
    for (let i = 0; i < n; i++) ends.push(parseInt(data[idx++], 10));
    const profits = [];
    for (let i = 0; i < n; i++) profits.push(parseInt(data[idx++], 10));
    
    const jobs = [];
    for (let i = 0; i < n; i++) jobs.push([starts[i], ends[i], profits[i]]);
    jobs.sort((a, b) => a[1] - b[1]);
    
    const dpEnds = [0];
    const dpProfits = [0];
    
    for (const [s, e, p] of jobs) {
        let l = 0, r = dpEnds.length;
        while (l < r) {
            const mid = (l + r) >> 1;
            if (dpEnds[mid] <= s) l = mid + 1;
            else r = mid;
        }
        const prevIdx = l - 1;
        const gain = dpProfits[prevIdx] + p;
        if (gain > dpProfits[dpProfits.length - 1]) {
            dpEnds.push(e);
            dpProfits.push(gain);
        }
    }
    
    console.log(dpProfits[dpProfits.length - 1]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
import bisect
data = sys.stdin.read().split()
if data:
    n = int(data[0])
    idx = 1
    starts = [int(x) for x in data[idx:idx+n]]; idx += n
    ends = [int(x) for x in data[idx:idx+n]]; idx += n
    profits = [int(x) for x in data[idx:idx+n]]
    jobs = sorted(zip(starts, ends, profits), key=lambda x: x[1])
    dp = [(0, 0)]
    for s, e, p in jobs:
        i = bisect.bisect_right(dp, (s, float('inf'))) - 1
        gain = dp[i][1] + p
        if gain > dp[-1][1]: dp.append((e, gain))
    print(dp[-1][1])
else:
    print(0)
`,
      javascript: `const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data && data.length >= 1) {
    const n = parseInt(data[0], 10);
    let idx = 1;
    const starts = [], ends = [], profits = [];
    for (let i = 0; i < n; i++) starts.push(parseInt(data[idx++], 10));
    for (let i = 0; i < n; i++) ends.push(parseInt(data[idx++], 10));
    for (let i = 0; i < n; i++) profits.push(parseInt(data[idx++], 10));
    const jobs = [];
    for (let i = 0; i < n; i++) jobs.push([starts[i], ends[i], profits[i]]);
    jobs.sort((a, b) => a[1] - b[1]);
    const dpEnds = [0], dpProfits = [0];
    for (const [s, e, p] of jobs) {
        let l = 0, r = dpEnds.length;
        while (l < r) {
            const mid = (l + r) >> 1;
            if (dpEnds[mid] <= s) l = mid + 1;
            else r = mid;
        }
        const gain = dpProfits[l - 1] + p;
        if (gain > dpProfits[dpProfits.length - 1]) {
            dpEnds.push(e); dpProfits.push(gain);
        }
    }
    console.log(dpProfits[dpProfits.length - 1]);
} else { console.log(0); }
`,
    },
    editorial: {
      approach: 'End-Time Sorting + Dynamic Programming + Binary Search.',
      algorithm: '1. Sort jobs ascending by end time.\n2. Maintain monotonic list (endTime, maxProfit).\n3. For each job, binary search the latest compatible job ending <= startTime.\n4. Output final maximum profit entry.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      content: 'Binary search identifies optimal disjoint predecessors in logarithmic time.',
      referenceCode: `i = bisect.bisect_right(dp, (s, inf)) - 1\ngain = dp[i][1] + p\nif gain > dp[-1][1]: dp.append((e, gain))`,
    },
    tags: ['Dynamic Programming', 'Binary Search', 'Sorting', 'Array'],
    testCases: [
      { input: `4\n1 2 3 3\n3 4 5 6\n50 10 40 70`, expectedOutput: `120`, isHidden: false, order: 0 },
      { input: `5\n1 2 3 4 6\n3 5 10 6 9\n20 20 100 70 60`, expectedOutput: `150`, isHidden: false, order: 1 },
      { input: `3\n1 1 1\n2 3 4\n5 6 4`, expectedOutput: `6`, isHidden: true, order: 2 },
    ],
  },

  // 4. Gray Code (Medium)
  {
    title: 'Gray Code',
    slug: 'gray-code',
    description: `An \`n\`-bit Gray code sequence is a sequence of \`2^n\` integers where:
- Every integer is in the inclusive range \`[0, 2^n - 1]\`,
- The first integer is \`0\`,
- An integer appears no more than once in the sequence,
- The binary representation of every pair of adjacent integers differs by exactly one bit, and
- The binary representation of the first and last integers differs by exactly one bit.
Given an integer \`n\`, return any valid \`n\`-bit Gray code sequence.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 16`,
    inputFormat: `An integer n.`,
    outputFormat: `Comma-separated Gray code integers.`,
    sampleInput: `2`,
    sampleOutput: `0,1,3,2`,
    points: 150,
    hints: [
      'Reflected binary code formula: gray(i) = i ^ (i >> 1).',
      'Generate elements for i from 0 to (1 << n) - 1.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read().strip()
    if not raw:
        return
    n = int(raw)
    res = [i ^ (i >> 1) for i in range(1 << n)]
    print(",".join(str(x) for x in res))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (!raw) return;
    const n = parseInt(raw, 10);
    const res = [];
    for (let i = 0; i < (1 << n); i++) {
        res.push(i ^ (i >> 1));
    }
    console.log(res.join(","));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
raw = sys.stdin.read().strip()
if raw:
    n = int(raw)
    res = [i ^ (i >> 1) for i in range(1 << n)]
    print(",".join(str(x) for x in res))
`,
      javascript: `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim();
if (raw) {
    const n = parseInt(raw, 10);
    const res = [];
    for (let i = 0; i < (1 << n); i++) res.push(i ^ (i >> 1));
    console.log(res.join(","));
}
`,
    },
    editorial: {
      approach: 'Direct Bitwise Reflection Conversion.',
      algorithm: '1. For every index i in [0, 2^n - 1], gray(i) = i ^ (i >> 1).\n2. Format result as comma-separated sequence.',
      timeComplexity: 'O(2^N)',
      spaceComplexity: 'O(2^N)',
      content: 'Standard Gray code generation via bitwise exclusive-OR with shifted index.',
      referenceCode: `res = [i ^ (i >> 1) for i in range(1 << n)]`,
    },
    tags: ['Bit Manipulation', 'Math', 'Backtracking'],
    testCases: [
      { input: `2`, expectedOutput: `0,1,3,2`, isHidden: false, order: 0 },
      { input: `1`, expectedOutput: `0,1`, isHidden: false, order: 1 },
      { input: `3`, expectedOutput: `0,1,3,2,6,7,5,4`, isHidden: true, order: 2 },
    ],
  },
];
