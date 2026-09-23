import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack250Batch1Defs: ProblemDef[] = [
  // 1. 0/1 Knapsack Problem
  {
    title: '0/1 Knapsack Problem',
    slug: '0-1-knapsack-problem',
    description: `Given \`N\` items with values \`values\` and weights \`weights\`, and a knapsack with maximum weight capacity \`W\`, determine the maximum value that can be placed in the knapsack. Each item can either be picked once or left behind (0/1).`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= N <= 500\n1 <= W <= 2000\n1 <= values[i], weights[i] <= 1000`,
    inputFormat: `Line 1: N and W separated by space.\nLine 2: N space-separated integers representing values.\nLine 3: N space-separated integers representing weights.`,
    outputFormat: `An integer representing maximum attainable value.`,
    sampleInput: `3 4\n1 2 3\n4 5 1`,
    sampleOutput: `3`,
    points: 150,
    hints: [
      'Define dp[w] as the maximum value achievable with weight capacity w.',
      'To ensure each item is used at most once, iterate capacity w backwards from W down to weight[i].',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n, W = int(input_data[0]), int(input_data[1])
    vals = [int(x) for x in input_data[2:2+n]]
    weights = [int(x) for x in input_data[2+n:2+2*n]]
    
    dp = [0] * (W + 1)
    for i in range(n):
        v, w = vals[i], weights[i]
        for cap in range(W, w - 1, -1):
            if dp[cap - w] + v > dp[cap]:
                dp[cap] = dp[cap - w] + v
    print(dp[W])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!input || input.length < 2) return;
    const n = parseInt(input[0], 10);
    const W = parseInt(input[1], 10);
    const vals = [];
    const weights = [];
    for (let i = 0; i < n; i++) vals.push(parseInt(input[2 + i], 10));
    for (let i = 0; i < n; i++) weights.push(parseInt(input[2 + n + i], 10));
    
    const dp = new Int32Array(W + 1);
    for (let i = 0; i < n; i++) {
        const v = vals[i];
        const w = weights[i];
        for (let cap = W; cap >= w; cap--) {
            if (dp[cap - w] + v > dp[cap]) {
                dp[cap] = dp[cap - w] + v;
            }
        }
    }
    console.log(dp[W]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
input_data = sys.stdin.read().split()
if input_data:
    n, W = int(input_data[0]), int(input_data[1])
    vals = [int(x) for x in input_data[2:2+n]]
    weights = [int(x) for x in input_data[2+n:2+2*n]]
    dp = [0] * (W + 1)
    for i in range(n):
        v, w = vals[i], weights[i]
        for cap in range(W, w - 1, -1):
            if dp[cap - w] + v > dp[cap]:
                dp[cap] = dp[cap - w] + v
    print(dp[W])
`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input && input.length >= 2) {
    const n = parseInt(input[0], 10);
    const W = parseInt(input[1], 10);
    const vals = [];
    const weights = [];
    for (let i = 0; i < n; i++) vals.push(parseInt(input[2 + i], 10));
    for (let i = 0; i < n; i++) weights.push(parseInt(input[2 + n + i], 10));
    const dp = new Int32Array(W + 1);
    for (let i = 0; i < n; i++) {
        const v = vals[i], w = weights[i];
        for (let cap = W; cap >= w; cap--) {
            if (dp[cap - w] + v > dp[cap]) dp[cap] = dp[cap - w] + v;
        }
    }
    console.log(dp[W]);
}
`,
    },
    editorial: {
      approach: 'Space-optimized 1D Dynamic Programming iterating capacity in reverse order.',
      algorithm: '1. Maintain a 1D DP table of size W+1 initialized to 0.\n2. For each item (v, w), update dp[cap] = max(dp[cap], dp[cap-w] + v) for cap from W down to w.\n3. Output dp[W].',
      timeComplexity: 'O(N * W)',
      spaceComplexity: 'O(W)',
      content: 'Using a 1D array traversed backwards prevents reusing the current item multiple times, giving optimal 0/1 knapsack state transitions in O(W) extra memory.',
      referenceCode: `dp = [0] * (W + 1)\nfor v, w in zip(vals, weights):\n    for cap in range(W, w - 1, -1):\n        dp[cap] = max(dp[cap], dp[cap - w] + v)`,
    },
    tags: ['Dynamic Programming', 'Knapsack'],
    testCases: [
      { input: `3 4\n1 2 3\n4 5 1`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `3 3\n10 15 40\n1 2 3`, expectedOutput: `40`, isHidden: false, order: 1 },
      { input: `4 5\n10 40 30 50\n5 4 6 3`, expectedOutput: `50`, isHidden: true, order: 2 },
      { input: `1 10\n100\n5`, expectedOutput: `100`, isHidden: true, order: 3 },
      { input: `5 15\n10 20 30 40 50\n1 2 3 4 5`, expectedOutput: `150`, isHidden: true, order: 4 },
    ],
  },

  // 2. Longest String Chain
  {
    title: 'Longest String Chain',
    slug: 'longest-string-chain',
    description: `You are given an array of \`words\` where each word consists of lowercase English letters.
\`wordA\` is a **predecessor** of \`wordB\` if and only if we can insert exactly one letter anywhere in \`wordA\` without changing the order of the other characters to make it equal to \`wordB\`.
Return the length of the **longest possible word chain** with words chosen from the given list of words.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= words.length <= 1000\n1 <= words[i].length <= 16\nwords[i] only consists of lowercase English letters.`,
    inputFormat: `Space or comma separated list of words on a single line.`,
    outputFormat: `An integer representing the max chain length.`,
    sampleInput: `a b ba bca bda bdca`,
    sampleOutput: `4`,
    points: 150,
    hints: [
      'Sort words by their lengths.',
      'For each word, generate all possible predecessors by removing one character at a time, and transition from their stored DP values.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    words = sys.stdin.read().strip().replace(',', ' ').split()
    if not words:
        print(0)
        return
    words.sort(key=len)
    dp = {}
    ans = 1
    for w in words:
        best = 1
        for i in range(len(w)):
            pred = w[:i] + w[i+1:]
            if pred in dp:
                best = max(best, dp[pred] + 1)
        dp[w] = best
        ans = max(ans, best)
    print(ans)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
    if (!input || input[0] === '') { console.log(0); return; }
    input.sort((a, b) => a.length - b.length);
    const dp = new Map();
    let ans = 1;
    for (const w of input) {
        let best = 1;
        for (let i = 0; i < w.length; i++) {
            const pred = w.slice(0, i) + w.slice(i + 1);
            if (dp.has(pred)) {
                best = Math.max(best, dp.get(pred) + 1);
            }
        }
        dp.set(w, best);
        ans = Math.max(ans, best);
    }
    console.log(ans);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
words = sys.stdin.read().strip().replace(',', ' ').split()
if words:
    words.sort(key=len)
    dp = {}
    ans = 1
    for w in words:
        best = 1
        for i in range(len(w)):
            pred = w[:i] + w[i+1:]
            if pred in dp:
                best = max(best, dp[pred] + 1)
        dp[w] = best
        ans = max(ans, best)
    print(ans)
else:
    print(0)
`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
if (!input || input[0] === '') { console.log(0); } else {
    input.sort((a, b) => a.length - b.length);
    const dp = new Map();
    let ans = 1;
    for (const w of input) {
        let best = 1;
        for (let i = 0; i < w.length; i++) {
            const pred = w.slice(0, i) + w.slice(i + 1);
            if (dp.has(pred)) best = Math.max(best, dp.get(pred) + 1);
        }
        dp.set(w, best);
        ans = Math.max(ans, best);
    }
    console.log(ans);
}
`,
    },
    editorial: {
      approach: 'Length-sorted Dynamic Programming with Hash Map.',
      algorithm: '1. Sort words ascending by length.\n2. For each word of length L, try deleting each of its L characters to form candidate predecessor words.\n3. dp[word] = 1 + max(dp[predecessor]).\n4. Return the maximum value recorded in dp.',
      timeComplexity: 'O(N * L^2)',
      spaceComplexity: 'O(N * L)',
      content: 'Sorting by length guarantees all potential predecessors are computed before the current word is processed.',
      referenceCode: `words.sort(key=len)\ndp = {}\nfor w in words:\n    dp[w] = 1 + max([dp.get(w[:i] + w[i+1:], 0) for i in range(len(w))] or [0])`,
    },
    tags: ['Dynamic Programming', 'Hash Table', 'String'],
    testCases: [
      { input: `a b ba bca bda bdca`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `xbc pcxbcf xb cxbc pcxbc`, expectedOutput: `5`, isHidden: false, order: 1 },
      { input: `abcd dbqca`, expectedOutput: `1`, isHidden: true, order: 2 },
      { input: `q r s qr qrs qrst`, expectedOutput: `4`, isHidden: true, order: 3 },
    ],
  },

  // 3. Distinct Subsequences
  {
    title: 'Distinct Subsequences',
    slug: 'distinct-subsequences',
    description: `Given two strings \`s\` and \`t\`, return the number of **distinct subsequences** of \`s\` which equals \`t\`.
A string's subsequence is a new string formed from the original string by deleting some (can be none) of the characters without disturbing the remaining characters' relative positions.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= s.length, t.length <= 1000\ns and t consist of English letters.`,
    inputFormat: `Line 1: string s\nLine 2: string t`,
    outputFormat: `An integer representing the count of distinct subsequences.`,
    sampleInput: `rabbbit\nrabbit`,
    sampleOutput: `3`,
    points: 200,
    hints: [
      'Let dp[i][j] be the number of distinct subsequences of s[0...i-1] matching t[0...j-1].',
      'If s[i-1] == t[j-1], dp[i][j] = dp[i-1][j-1] + dp[i-1][j]. Otherwise, dp[i][j] = dp[i-1][j].',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split()
    if len(lines) < 2:
        return
    s, t = lines[0], lines[1]
    m, n = len(s), len(t)
    dp = [0] * (n + 1)
    dp[0] = 1
    for i in range(1, m + 1):
        for j in range(n, 0, -1):
            if s[i-1] == t[j-1]:
                dp[j] += dp[j-1]
    print(dp[n])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (lines.length < 2) return;
    const s = lines[0];
    const t = lines[1];
    const m = s.length, n = t.length;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= m; i++) {
        for (let j = n; j >= 1; j--) {
            if (s[i - 1] === t[j - 1]) {
                dp[j] += dp[j - 1];
            }
        }
    }
    console.log(dp[n]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
lines = sys.stdin.read().strip().split()
if len(lines) >= 2:
    s, t = lines[0], lines[1]
    dp = [0] * (len(t) + 1)
    dp[0] = 1
    for char in s:
        for j in range(len(t), 0, -1):
            if char == t[j-1]:
                dp[j] += dp[j-1]
    print(dp[len(t)])
`,
      javascript: `const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (lines.length >= 2) {
    const s = lines[0], t = lines[1];
    const dp = new Array(t.length + 1).fill(0);
    dp[0] = 1;
    for (let i = 0; i < s.length; i++) {
        for (let j = t.length; j >= 1; j--) {
            if (s[i] === t[j - 1]) dp[j] += dp[j - 1];
        }
    }
    console.log(dp[t.length]);
}
`,
    },
    editorial: {
      approach: '1D Space-Optimized Dynamic Programming.',
      algorithm: '1. dp[j] stores matching subsequences for prefix t[0...j-1].\n2. For each character c in s, iterate j backwards from |t| down to 1.\n3. If c == t[j-1], add dp[j-1] into dp[j].\n4. Output dp[|t|].',
      timeComplexity: 'O(|s| * |t|)',
      spaceComplexity: 'O(|t|)',
      content: 'Backward iteration across the 1D DP array guarantees single-usage state transitions.',
      referenceCode: `dp = [0] * (len(t) + 1)\ndp[0] = 1\nfor c in s:\n    for j in range(len(t), 0, -1):\n        if c == t[j-1]: dp[j] += dp[j-1]`,
    },
    tags: ['Dynamic Programming', 'String'],
    testCases: [
      { input: `rabbbit\nrabbit`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `babgbag\nbag`, expectedOutput: `5`, isHidden: false, order: 1 },
      { input: `abcdef\nghk`, expectedOutput: `0`, isHidden: true, order: 2 },
      { input: `aaaaa\naa`, expectedOutput: `10`, isHidden: true, order: 3 },
    ],
  },

  // 4. Best Time to Buy and Sell Stock with Cooldown
  {
    title: 'Best Time to Buy and Sell Stock with Cooldown',
    slug: 'best-time-to-buy-and-sell-stock-with-cooldown',
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`-th day.
Find the maximum profit you can achieve. You may complete as many transactions as you like with the following restrictions:
- After you sell your stock, you cannot buy stock on the next day (i.e., **1 day cooldown**).
- You cannot engage in multiple transactions simultaneously.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= prices.length <= 5000\n0 <= prices[i] <= 1000`,
    inputFormat: `Comma or space separated integers representing stock prices.`,
    outputFormat: `An integer representing maximum profit.`,
    sampleInput: `1,2,3,0,2`,
    sampleOutput: `3`,
    points: 150,
    hints: [
      'Model 3 states: Hold (bought stock), Sold (just sold today), and Rest (cooldown or inactive).',
      'Hold[i] = max(Hold[i-1], Rest[i-1] - price). Sold[i] = Hold[i-1] + price. Rest[i] = max(Rest[i-1], Sold[i-1]).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read().strip().replace(',', ' ').split()
    if not raw:
        print(0)
        return
    prices = [int(x) for x in raw]
    if len(prices) <= 1:
        print(0)
        return
    
    hold = -prices[0]
    sold = 0
    rest = 0
    
    for p in prices[1:]:
        prev_sold = sold
        sold = hold + p
        hold = max(hold, rest - p)
        rest = max(rest, prev_sold)
        
    print(max(sold, rest))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
    if (!raw || raw[0] === '') { console.log(0); return; }
    const prices = raw.map(x => parseInt(x, 10));
    if (prices.length <= 1) { console.log(0); return; }
    
    let hold = -prices[0];
    let sold = 0;
    let rest = 0;
    
    for (let i = 1; i < prices.length; i++) {
        const p = prices[i];
        const prevSold = sold;
        sold = hold + p;
        hold = Math.max(hold, rest - p);
        rest = Math.max(rest, prevSold);
    }
    console.log(Math.max(sold, rest));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
raw = sys.stdin.read().strip().replace(',', ' ').split()
if raw:
    prices = [int(x) for x in raw]
    hold, sold, rest = -prices[0], 0, 0
    for p in prices[1:]:
        prev_sold = sold
        sold = hold + p
        hold = max(hold, rest - p)
        rest = max(rest, prev_sold)
    print(max(sold, rest))
else:
    print(0)
`,
      javascript: `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
if (raw && raw[0] !== '') {
    const prices = raw.map(x => parseInt(x, 10));
    let hold = -prices[0], sold = 0, rest = 0;
    for (let i = 1; i < prices.length; i++) {
        const prevSold = sold;
        sold = hold + prices[i];
        hold = Math.max(hold, rest - prices[i]);
        rest = Math.max(rest, prevSold);
    }
    console.log(Math.max(sold, rest));
} else { console.log(0); }
`,
    },
    editorial: {
      approach: 'State-Machine Dynamic Programming with O(1) space.',
      algorithm: '1. Track 3 states: hold, sold, rest.\n2. Update transitions at each price step.\n3. Return max(sold, rest).',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Using three scalar variables achieves linear time and constant space with clean state machine dynamics.',
      referenceCode: `hold, sold, rest = -prices[0], 0, 0\nfor p in prices[1:]:\n    sold, hold, rest = hold + p, max(hold, rest - p), max(rest, sold)`,
    },
    tags: ['Dynamic Programming', 'Arrays'],
    testCases: [
      { input: `1,2,3,0,2`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `1`, expectedOutput: `0`, isHidden: false, order: 1 },
      { input: `1,2,4`, expectedOutput: `3`, isHidden: true, order: 2 },
      { input: `6,1,3,2,4,7`, expectedOutput: `6`, isHidden: true, order: 3 },
    ],
  },

  // 5. Best Time to Buy and Sell Stock with Transaction Fee
  {
    title: 'Best Time to Buy and Sell Stock with Transaction Fee',
    slug: 'best-time-to-buy-and-sell-stock-with-transaction-fee',
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a stock on the \`i\`-th day, and an integer \`fee\` representing a transaction fee.
Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= prices.length <= 5 * 10^4\n1 <= prices[i] <= 5 * 10^4\n0 <= fee <= 5 * 10^4`,
    inputFormat: `Line 1: Comma-separated list of stock prices.\nLine 2: Transaction fee integer.`,
    outputFormat: `An integer representing maximum profit.`,
    sampleInput: `1,3,2,8,4,9\n2`,
    sampleOutput: `8`,
    points: 150,
    hints: [
      'Maintain two states: cash (max profit with no stock) and hold (max profit holding one stock).',
      'cash = max(cash, hold + price - fee), hold = max(hold, cash - price).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    prices = [int(x.strip()) for x in lines[0].replace(',', ' ').split()]
    fee = int(lines[1].strip())
    
    cash = 0
    hold = -prices[0]
    
    for p in prices[1:]:
        cash = max(cash, hold + p - fee)
        hold = max(hold, cash - p)
        
    print(cash)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const prices = lines[0].replace(/,/g, ' ').trim().split(/\\s+/).map(x => parseInt(x, 10));
    const fee = parseInt(lines[1].trim(), 10);
    
    let cash = 0;
    let hold = -prices[0];
    
    for (let i = 1; i < prices.length; i++) {
        const p = prices[i];
        cash = Math.max(cash, hold + p - fee);
        hold = Math.max(hold, cash - p);
    }
    console.log(cash);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
lines = sys.stdin.read().strip().split('\\n')
if len(lines) >= 2:
    prices = [int(x) for x in lines[0].replace(',', ' ').split()]
    fee = int(lines[1].strip())
    cash, hold = 0, -prices[0]
    for p in prices[1:]:
        cash = max(cash, hold + p - fee)
        hold = max(hold, cash - p)
    print(cash)
`,
      javascript: `const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
    const prices = lines[0].replace(/,/g, ' ').trim().split(/\\s+/).map(x => parseInt(x, 10));
    const fee = parseInt(lines[1].trim(), 10);
    let cash = 0, hold = -prices[0];
    for (let i = 1; i < prices.length; i++) {
        cash = Math.max(cash, hold + prices[i] - fee);
        hold = Math.max(hold, cash - prices[i]);
    }
    console.log(cash);
}
`,
    },
    editorial: {
      approach: 'Two-State Dynamic Programming.',
      algorithm: '1. Maintain cash = 0 (free state) and hold = -prices[0] (invested state).\n2. Update both states iteratively.\n3. Output cash.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Evaluating the fee upon selling guarantees maximum net gain across optimal non-overlapping transactions.',
      referenceCode: `cash, hold = 0, -prices[0]\nfor p in prices[1:]:\n    cash = max(cash, hold + p - fee)\n    hold = max(hold, cash - p)`,
    },
    tags: ['Dynamic Programming', 'Greedy', 'Arrays'],
    testCases: [
      { input: `1,3,2,8,4,9\n2`, expectedOutput: `8`, isHidden: false, order: 0 },
      { input: `1,3,7,5,10,3\n3`, expectedOutput: `6`, isHidden: false, order: 1 },
      { input: `1,4,6,2,8,3,10,14\n3`, expectedOutput: `13`, isHidden: true, order: 2 },
    ],
  },

  // 6. Partition Equal Subset Sum
  {
    title: 'Partition Equal Subset Sum',
    slug: 'partition-equal-subset-sum',
    description: `Given an integer array \`nums\`, return \`true\` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or \`false\` otherwise.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 200\n1 <= nums[i] <= 100`,
    inputFormat: `Comma or space separated integers.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `1,5,11,5`,
    sampleOutput: `true`,
    points: 150,
    hints: [
      'If the total sum is odd, it can never be partitioned into two equal integer subsets.',
      'Transform the problem into finding a subset with sum equal to total_sum / 2 using 0/1 Knapsack.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read().strip().replace(',', ' ').split()
    if not raw:
        print("false")
        return
    nums = [int(x) for x in raw]
    total = sum(nums)
    if total % 2 != 0:
        print("false")
        return
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    for x in nums:
        for j in range(target, x - 1, -1):
            if dp[j - x]:
                dp[j] = True
    print("true" if dp[target] else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
    if (!raw || raw[0] === '') { console.log("false"); return; }
    const nums = raw.map(x => parseInt(x, 10));
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 !== 0) { console.log("false"); return; }
    const target = total / 2;
    const dp = new Uint8Array(target + 1);
    dp[0] = 1;
    for (const x of nums) {
        for (let j = target; j >= x; j--) {
            if (dp[j - x]) dp[j] = 1;
        }
    }
    console.log(dp[target] ? "true" : "false");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
raw = sys.stdin.read().strip().replace(',', ' ').split()
if raw:
    nums = [int(x) for x in raw]
    total = sum(nums)
    if total % 2 != 0:
        print("false")
    else:
        target = total // 2
        dp = [False] * (target + 1)
        dp[0] = True
        for x in nums:
            for j in range(target, x - 1, -1):
                if dp[j - x]: dp[j] = True
        print("true" if dp[target] else "false")
else:
    print("false")
`,
      javascript: `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
if (raw && raw[0] !== '') {
    const nums = raw.map(x => parseInt(x, 10));
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 !== 0) console.log("false");
    else {
        const target = total / 2;
        const dp = new Uint8Array(target + 1);
        dp[0] = 1;
        for (const x of nums) {
            for (let j = target; j >= x; j--) {
                if (dp[j - x]) dp[j] = 1;
            }
        }
        console.log(dp[target] ? "true" : "false");
    }
} else { console.log("false"); }
`,
    },
    editorial: {
      approach: '0/1 Knapsack Dynamic Programming targeting sum / 2.',
      algorithm: '1. Check if sum(nums) is even.\n2. Set target = sum / 2.\n3. dp[j] is true if a subset sum of j is possible.\n4. Output dp[target].',
      timeComplexity: 'O(N * Target)',
      spaceComplexity: 'O(Target)',
      content: 'The problem reduces to exact subset sum partition with boolean state tracking.',
      referenceCode: `target = sum(nums) // 2\ndp = [True] + [False] * target\nfor x in nums:\n    for j in range(target, x - 1, -1): dp[j] |= dp[j - x]`,
    },
    tags: ['Dynamic Programming', 'Arrays'],
    testCases: [
      { input: `1,5,11,5`, expectedOutput: `true`, isHidden: false, order: 0 },
      { input: `1,2,3,5`, expectedOutput: `false`, isHidden: false, order: 1 },
      { input: `2,2,2,2`, expectedOutput: `true`, isHidden: true, order: 2 },
      { input: `100`, expectedOutput: `false`, isHidden: true, order: 3 },
    ],
  },

  // 7. Matrix Chain Multiplication
  {
    title: 'Matrix Chain Multiplication',
    slug: 'matrix-chain-multiplication',
    description: `Given a sequence of matrices, find the most efficient way to multiply these matrices together. Given array \`p\` of dimensions where matrix \`i\` has dimension \`p[i-1] x p[i]\`, calculate the minimum number of scalar multiplications needed to multiply the chain.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `2 <= p.length <= 100\n1 <= p[i] <= 500`,
    inputFormat: `Comma or space separated dimensions array p.`,
    outputFormat: `An integer representing the minimum multiplications.`,
    sampleInput: `1,2,3,4`,
    sampleOutput: `18`,
    points: 200,
    hints: [
      'Let dp[i][j] be the minimum cost to multiply matrices from i to j.',
      'Split the chain at k (i <= k < j): dp[i][j] = min(dp[i][k] + dp[k+1][j] + p[i-1]*p[k]*p[j]).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read().strip().replace(',', ' ').split()
    if not raw:
        print(0)
        return
    p = [int(x) for x in raw]
    n = len(p) - 1
    if n <= 1:
        print(0)
        return
    
    dp = [[0] * (n + 1) for _ in range(n + 1)]
    
    for l in range(2, n + 1):
        for i in range(1, n - l + 2):
            j = i + l - 1
            dp[i][j] = float('inf')
            for k in range(i, j):
                cost = dp[i][k] + dp[k + 1][j] + p[i - 1] * p[k] * p[j]
                if cost < dp[i][j]:
                    dp[i][j] = cost
                    
    print(dp[1][n])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
    if (!raw || raw[0] === '') { console.log(0); return; }
    const p = raw.map(x => parseInt(x, 10));
    const n = p.length - 1;
    if (n <= 1) { console.log(0); return; }
    
    const dp = Array.from({ length: n + 1 }, () => new Int32Array(n + 1));
    
    for (let l = 2; l <= n; l++) {
        for (let i = 1; i <= n - l + 1; i++) {
            const j = i + l - 1;
            let minVal = Infinity;
            for (let k = i; k < j; k++) {
                const cost = dp[i][k] + dp[k + 1][j] + p[i - 1] * p[k] * p[j];
                if (cost < minVal) minVal = cost;
            }
            dp[i][j] = minVal;
        }
    }
    console.log(dp[1][n]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
raw = sys.stdin.read().strip().replace(',', ' ').split()
if raw:
    p = [int(x) for x in raw]
    n = len(p) - 1
    if n <= 1:
        print(0)
    else:
        dp = [[0] * (n + 1) for _ in range(n + 1)]
        for l in range(2, n + 1):
            for i in range(1, n - l + 2):
                j = i + l - 1
                dp[i][j] = min(dp[i][k] + dp[k+1][j] + p[i-1]*p[k]*p[j] for k in range(i, j))
        print(dp[1][n])
else:
    print(0)
`,
      javascript: `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
if (raw && raw[0] !== '') {
    const p = raw.map(x => parseInt(x, 10));
    const n = p.length - 1;
    if (n <= 1) console.log(0);
    else {
        const dp = Array.from({ length: n + 1 }, () => new Int32Array(n + 1));
        for (let l = 2; l <= n; l++) {
            for (let i = 1; i <= n - l + 1; i++) {
                const j = i + l - 1;
                let minVal = Infinity;
                for (let k = i; k < j; k++) {
                    const cost = dp[i][k] + dp[k + 1][j] + p[i - 1] * p[k] * p[j];
                    if (cost < minVal) minVal = cost;
                }
                dp[i][j] = minVal;
            }
        }
        console.log(dp[1][n]);
    }
} else { console.log(0); }
`,
    },
    editorial: {
      approach: 'Interval Dynamic Programming iterating by chain length.',
      algorithm: '1. Let dp[i][j] denote minimum multiplications for matrices i to j.\n2. Iterate chain length l from 2 to n.\n3. Try every split point k from i to j-1.\n4. Output dp[1][n].',
      timeComplexity: 'O(N^3)',
      spaceComplexity: 'O(N^2)',
      content: 'Standard interval DP optimizes associative operation groupings with subproblem memoization.',
      referenceCode: `for l in range(2, n + 1):\n    for i in range(1, n - l + 2):\n        j = i + l - 1\n        dp[i][j] = min(dp[i][k] + dp[k+1][j] + p[i-1]*p[k]*p[j] for k in range(i, j))`,
    },
    tags: ['Dynamic Programming', 'Interval DP'],
    testCases: [
      { input: `1,2,3,4`, expectedOutput: `18`, isHidden: false, order: 0 },
      { input: `10,20,30`, expectedOutput: `6000`, isHidden: false, order: 1 },
      { input: `40,20,30,10,30`, expectedOutput: `26000`, isHidden: true, order: 2 },
      { input: `10,30,5,60`, expectedOutput: `4500`, isHidden: true, order: 3 },
    ],
  },

  // 8. Maximal Square
  {
    title: 'Maximal Square',
    slug: 'maximal-square',
    description: `Given an \`m x n\` binary matrix filled with \`0\`s and \`1\`s, find the largest square containing only \`1\`s and return its **area**.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= m, n <= 300\nmatrix[i][j] is '0' or '1'.`,
    inputFormat: `Line 1: m and n.\nFollowing m lines: n space-separated characters ('0' or '1').`,
    outputFormat: `An integer representing the maximal square area.`,
    sampleInput: `4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0`,
    sampleOutput: `4`,
    points: 150,
    hints: [
      'Let dp[i][j] represent the side length of the maximum square whose bottom-right corner is (i, j).',
      'If matrix[i][j] == 1, dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        print(0)
        return
    m, n = int(input_data[0]), int(input_data[1])
    grid = []
    idx = 2
    for _ in range(m):
        grid.append(input_data[idx:idx+n])
        idx += n
        
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    max_side = 0
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if grid[i-1][j-1] == '1':
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
                if dp[i][j] > max_side:
                    max_side = dp[i][j]
    print(max_side * max_side)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!input || input.length < 2) { console.log(0); return; }
    const m = parseInt(input[0], 10);
    const n = parseInt(input[1], 10);
    let maxSide = 0;
    const dp = Array.from({ length: m + 1 }, () => new Int32Array(n + 1));
    
    let idx = 2;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (input[idx++] === '1') {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                if (dp[i][j] > maxSide) maxSide = dp[i][j];
            }
        }
    }
    console.log(maxSide * maxSide);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
data = sys.stdin.read().split()
if data:
    m, n = int(data[0]), int(data[1])
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    max_side = 0
    idx = 2
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if data[idx] == '1':
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
                if dp[i][j] > max_side: max_side = dp[i][j]
            idx += 1
    print(max_side * max_side)
else:
    print(0)
`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input && input.length >= 2) {
    const m = parseInt(input[0], 10), n = parseInt(input[1], 10);
    let maxSide = 0;
    const dp = Array.from({ length: m + 1 }, () => new Int32Array(n + 1));
    let idx = 2;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (input[idx++] === '1') {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                if (dp[i][j] > maxSide) maxSide = dp[i][j];
            }
        }
    }
    console.log(maxSide * maxSide);
} else { console.log(0); }
`,
    },
    editorial: {
      approach: '2D Grid Dynamic Programming.',
      algorithm: '1. dp[i][j] stores the maximum square side length ending at cell (i, j).\n2. If matrix cell is 1, dp[i][j] = 1 + min(top, left, top-left).\n3. Return (maxSide)^2.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(M * N)',
      content: 'The 3-neighbor minimum transition guarantees that all four quadrants of the square are contiguous ones.',
      referenceCode: `dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) if cell == '1' else 0`,
    },
    tags: ['Dynamic Programming', 'Matrix'],
    testCases: [
      { input: `4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `2 2\n0 1\n1 0`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `1 1\n0`, expectedOutput: `0`, isHidden: true, order: 2 },
      { input: `3 3\n1 1 1\n1 1 1\n1 1 1`, expectedOutput: `9`, isHidden: true, order: 3 },
    ],
  },

  // 9. Minimum Path Sum
  {
    title: 'Minimum Path Sum',
    slug: 'minimum-path-sum',
    description: `Given a \`m x n\` grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.
You can only move either down or right at any point in time.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= m, n <= 200\n0 <= grid[i][j] <= 100`,
    inputFormat: `Line 1: m and n.\nNext m lines: n space-separated integers for grid rows.`,
    outputFormat: `An integer representing the minimum path sum.`,
    sampleInput: `3 3\n1 3 1\n1 5 1\n4 2 1`,
    sampleOutput: `7`,
    points: 150,
    hints: [
      'Each cell (i, j) can only be reached from (i-1, j) or (i, j-1).',
      'dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        print(0)
        return
    m, n = int(data[0]), int(data[1])
    grid = []
    idx = 2
    for _ in range(m):
        grid.append([int(x) for x in data[idx:idx+n]])
        idx += n
        
    dp = [float('inf')] * (n + 1)
    dp[1] = 0
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            dp[j] = grid[i-1][j-1] + min(dp[j], dp[j-1])
    print(dp[n])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!data || data.length < 2) { console.log(0); return; }
    const m = parseInt(data[0], 10);
    const n = parseInt(data[1], 10);
    const dp = new Array(n + 1).fill(Infinity);
    dp[1] = 0;
    let idx = 2;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const val = parseInt(data[idx++], 10);
            dp[j] = val + Math.min(dp[j], dp[j - 1]);
        }
    }
    console.log(dp[n]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
data = sys.stdin.read().split()
if data:
    m, n = int(data[0]), int(data[1])
    dp = [float('inf')] * (n + 1)
    dp[1] = 0
    idx = 2
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            val = int(data[idx])
            dp[j] = val + min(dp[j], dp[j-1])
            idx += 1
    print(dp[n])
else:
    print(0)
`,
      javascript: `const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data && data.length >= 2) {
    const m = parseInt(data[0], 10), n = parseInt(data[1], 10);
    const dp = new Array(n + 1).fill(Infinity);
    dp[1] = 0;
    let idx = 2;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[j] = parseInt(data[idx++], 10) + Math.min(dp[j], dp[j - 1]);
        }
    }
    console.log(dp[n]);
} else { console.log(0); }
`,
    },
    editorial: {
      approach: '1D Space-Optimized Dynamic Programming on 2D Grid.',
      algorithm: '1. dp[j] represents minimum path sum to column j in the current row.\n2. Update dp[j] = grid[i][j] + min(dp[j], dp[j-1]).\n3. Output dp[n].',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(N)',
      content: 'A single 1D row array suffices since transitions depend solely on the cell immediately above and immediately to the left.',
      referenceCode: `dp = [inf] * (n + 1)\ndp[1] = 0\nfor row in grid:\n    for j in range(1, n + 1): dp[j] = row[j-1] + min(dp[j], dp[j-1])`,
    },
    tags: ['Dynamic Programming', 'Matrix'],
    testCases: [
      { input: `3 3\n1 3 1\n1 5 1\n4 2 1`, expectedOutput: `7`, isHidden: false, order: 0 },
      { input: `2 3\n1 2 3\n4 5 6`, expectedOutput: `12`, isHidden: false, order: 1 },
      { input: `1 1\n5`, expectedOutput: `5`, isHidden: true, order: 2 },
    ],
  },

  // 10. Minimum Cost For Tickets
  {
    title: 'Minimum Cost For Tickets',
    slug: 'minimum-cost-for-tickets',
    description: `You have planned some train traveling one year in advance. The days of the year in which you will travel are given as an integer array \`days\`. Each day is an integer from \`1\` to \`365\`.
Train tickets are sold in three different ways:
- a **1-day** pass is sold for \`costs[0]\` dollars,
- a **7-day** pass is sold for \`costs[1]\` dollars,
- a **30-day** pass is sold for \`costs[2]\` dollars.
Return the minimum number of dollars you need to travel every day in the given list of \`days\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= days.length <= 365\n1 <= days[i] <= 365\ndays is strictly increasing.\ncosts.length == 3\n1 <= costs[i] <= 1000`,
    inputFormat: `Line 1: Comma-separated list of travel days.\nLine 2: 3 comma-separated costs.`,
    outputFormat: `An integer representing the minimum cost.`,
    sampleInput: `1,4,6,7,8,20\n2,7,15`,
    sampleOutput: `11`,
    points: 150,
    hints: [
      'Let dp[i] be the minimum cost to cover all travel days up to day i (where 1 <= i <= 365).',
      'If day i is not a travel day, dp[i] = dp[i-1]. Otherwise, dp[i] = min(dp[i-1]+cost[0], dp[max(0, i-7)]+cost[1], dp[max(0, i-30)]+cost[2]).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    days = set(int(x.strip()) for x in lines[0].replace(',', ' ').split())
    costs = [int(x.strip()) for x in lines[1].replace(',', ' ').split()]
    
    max_day = max(days)
    dp = [0] * (max_day + 1)
    
    for d in range(1, max_day + 1):
        if d not in days:
            dp[d] = dp[d - 1]
        else:
            dp[d] = min(
                dp[d - 1] + costs[0],
                dp[max(0, d - 7)] + costs[1],
                dp[max(0, d - 30)] + costs[2]
            )
            
    print(dp[max_day])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const daysArr = lines[0].replace(/,/g, ' ').trim().split(/\\s+/).map(x => parseInt(x, 10));
    const costs = lines[1].replace(/,/g, ' ').trim().split(/\\s+/).map(x => parseInt(x, 10));
    
    const daysSet = new Set(daysArr);
    const maxDay = Math.max(...daysArr);
    const dp = new Int32Array(maxDay + 1);
    
    for (let d = 1; d <= maxDay; d++) {
        if (!daysSet.has(d)) {
            dp[d] = dp[d - 1];
        } else {
            dp[d] = Math.min(
                dp[d - 1] + costs[0],
                dp[Math.max(0, d - 7)] + costs[1],
                dp[Math.max(0, d - 30)] + costs[2]
            );
        }
    }
    console.log(dp[maxDay]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
lines = sys.stdin.read().strip().split('\\n')
if len(lines) >= 2:
    days = set(int(x.strip()) for x in lines[0].replace(',', ' ').split())
    costs = [int(x.strip()) for x in lines[1].replace(',', ' ').split()]
    max_day = max(days)
    dp = [0] * (max_day + 1)
    for d in range(1, max_day + 1):
        if d not in days:
            dp[d] = dp[d - 1]
        else:
            dp[d] = min(dp[d-1] + costs[0], dp[max(0, d-7)] + costs[1], dp[max(0, d-30)] + costs[2])
    print(dp[max_day])
`,
      javascript: `const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
    const daysArr = lines[0].replace(/,/g, ' ').trim().split(/\\s+/).map(x => parseInt(x, 10));
    const costs = lines[1].replace(/,/g, ' ').trim().split(/\\s+/).map(x => parseInt(x, 10));
    const daysSet = new Set(daysArr);
    const maxDay = Math.max(...daysArr);
    const dp = new Int32Array(maxDay + 1);
    for (let d = 1; d <= maxDay; d++) {
        if (!daysSet.has(d)) dp[d] = dp[d - 1];
        else dp[d] = Math.min(dp[d-1] + costs[0], dp[Math.max(0, d-7)] + costs[1], dp[Math.max(0, d-30)] + costs[2]);
    }
    console.log(dp[maxDay]);
}
`,
    },
    editorial: {
      approach: 'Calendar Day Dynamic Programming.',
      algorithm: '1. Create dp table of size max(days) + 1.\n2. On non-travel days, cost equals previous day: dp[d] = dp[d-1].\n3. On travel days, take minimum of 1-day, 7-day, and 30-day ticket options.\n4. Output dp[max_day].',
      timeComplexity: 'O(MaxDay)',
      spaceComplexity: 'O(MaxDay)',
      content: 'Iterating calendar days directly avoids complex lookahead searching.',
      referenceCode: `for d in range(1, max_day + 1):\n    if d in days_set: dp[d] = min(dp[d-1] + c[0], dp[max(0, d-7)] + c[1], dp[max(0, d-30)] + c[2])\n    else: dp[d] = dp[d-1]`,
    },
    tags: ['Dynamic Programming', 'Arrays'],
    testCases: [
      { input: `1,4,6,7,8,20\n2,7,15`, expectedOutput: `11`, isHidden: false, order: 0 },
      { input: `1,2,3,4,5,6,7,8,9,10,30,31\n2,7,15`, expectedOutput: `17`, isHidden: false, order: 1 },
      { input: `1\n5,20,50`, expectedOutput: `5`, isHidden: true, order: 2 },
    ],
  },
];

