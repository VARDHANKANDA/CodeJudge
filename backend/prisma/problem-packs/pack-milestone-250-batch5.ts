import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack250Batch5Defs: ProblemDef[] = [
  // 1. Nim Game
  {
    title: 'Nim Game',
    slug: 'nim-game',
    description: `You are playing the following Nim Game with your friend:
- Initially, there is a heap of \`n\` stones on the table.
- You and your friend will alternate taking turns, and **you go first**.
- On each turn, the person whose turn it is can remove **1 to 3 stones** from the heap.
- The one who removes the last stone is the winner.
Given \`n\`, return \`true\` if you can win the game assuming both you and your friend play optimally, otherwise return \`false\`.`,
    difficulty: Difficulty.EASY,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 2^31 - 1`,
    inputFormat: `An integer n.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `4`,
    sampleOutput: `false`,
    points: 100,
    hints: [
      'If n is 1, 2, or 3, you can take all stones and win immediately.',
      'If n is 4, no matter whether you pick 1, 2, or 3, your friend will take the remaining and win.',
      'Generalize: you lose if and only if n % 4 == 0.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read().strip()
    if not raw:
        return
    n = int(raw)
    print("true" if n % 4 != 0 else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (!raw) return;
    const n = parseInt(raw, 10);
    console.log(n % 4 !== 0 ? "true" : "false");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
raw = sys.stdin.read().strip()
if raw:
    n = int(raw)
    print("true" if n % 4 != 0 else "false")
`,
      javascript: `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim();
if (raw) {
    const n = parseInt(raw, 10);
    console.log(n % 4 !== 0 ? "true" : "false");
}
`,
    },
    editorial: {
      approach: 'Game Theory modular arithmetic.',
      algorithm: '1. Any multiple of 4 is a losing position.\n2. From non-multiples of 4, the first player can always force a move that leaves a multiple of 4 to the opponent.\n3. Return n % 4 != 0.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      content: 'The first player wins if and only if n is not divisible by 4.',
      referenceCode: `return n % 4 != 0`,
    },
    tags: ['Math', 'Game Theory', 'Brainteaser'],
    testCases: [
      { input: `4`, expectedOutput: `false`, isHidden: false, order: 0 },
      { input: `1`, expectedOutput: `true`, isHidden: false, order: 1 },
      { input: `2`, expectedOutput: `true`, isHidden: false, order: 2 },
      { input: `8`, expectedOutput: `false`, isHidden: true, order: 3 },
      { input: `7`, expectedOutput: `true`, isHidden: true, order: 4 },
    ],
  },

  // 2. Predict the Winner (Stone Game DP Minimax)
  {
    title: 'Predict the Winner',
    slug: 'predict-the-winner',
    description: `You are given an integer array \`nums\`. Two players are playing a game with this array: player 1 and player 2.
Player 1 and player 2 take turns, with player 1 starting first. Both players start with a score of \`0\`. On each turn, the player takes one number from either the beginning or the end of the array. The game ends when there are no more elements in the array.
Return \`true\` if Player 1 can win the game (or tie). If the scores are equal, Player 1 is still considered the winner. Both players play optimally.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 20\n0 <= nums[i] <= 10^7`,
    inputFormat: `Comma or space separated integers.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `1,5,2`,
    sampleOutput: `false`,
    points: 150,
    hints: [
      'Let dp[i][j] be the maximum net score difference player 1 can achieve on subarray nums[i...j].',
      'dp[i][j] = max(nums[i] - dp[i+1][j], nums[j] - dp[i][j-1]).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read().strip().replace(',', ' ').split()
    if not raw:
        print("true")
        return
    nums = [int(x) for x in raw]
    n = len(nums)
    dp = list(nums)
    for l in range(2, n + 1):
        for i in range(n - l + 1):
            j = i + l - 1
            dp[i] = max(nums[i] - dp[i + 1], nums[j] - dp[i])
    print("true" if dp[0] >= 0 else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
    if (!raw || raw[0] === '') { console.log("true"); return; }
    const nums = raw.map(x => parseInt(x, 10));
    const n = nums.length;
    const dp = new Int32Array(nums);
    for (let l = 2; l <= n; l++) {
        for (let i = 0; i <= n - l; i++) {
            const j = i + l - 1;
            dp[i] = Math.max(nums[i] - dp[i + 1], nums[j] - dp[i]);
        }
    }
    console.log(dp[0] >= 0 ? "true" : "false");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
raw = sys.stdin.read().strip().replace(',', ' ').split()
if raw:
    nums = [int(x) for x in raw]
    n = len(nums)
    dp = list(nums)
    for l in range(2, n + 1):
        for i in range(n - l + 1):
            j = i + l - 1
            dp[i] = max(nums[i] - dp[i + 1], nums[j] - dp[i])
    print("true" if dp[0] >= 0 else "false")
else:
    print("true")
`,
      javascript: `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
if (raw && raw[0] !== '') {
    const nums = raw.map(x => parseInt(x, 10));
    const n = nums.length;
    const dp = new Int32Array(nums);
    for (let l = 2; l <= n; l++) {
        for (let i = 0; i <= n - l; i++) {
            const j = i + l - 1;
            dp[i] = Math.max(nums[i] - dp[i + 1], nums[j] - dp[i]);
        }
    }
    console.log(dp[0] >= 0 ? "true" : "false");
} else { console.log("true"); }
`,
    },
    editorial: {
      approach: 'Minimax Game Theory with 1D Interval DP.',
      algorithm: '1. dp[i] represents score advantage on current interval.\n2. Player chooses between taking left element nums[i] or right element nums[j].\n3. Return dp[0] >= 0.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N)',
      content: 'Standard zero-sum game minimax interval formulation.',
      referenceCode: `for l in range(2, n + 1):\n    for i in range(n - l + 1):\n        dp[i] = max(nums[i] - dp[i+1], nums[i+l-1] - dp[i])`,
    },
    tags: ['Math', 'Game Theory', 'Dynamic Programming'],
    testCases: [
      { input: `1,5,2`, expectedOutput: `false`, isHidden: false, order: 0 },
      { input: `1,5,233,7`, expectedOutput: `true`, isHidden: false, order: 1 },
      { input: `1`, expectedOutput: `true`, isHidden: true, order: 2 },
      { input: `1,1`, expectedOutput: `true`, isHidden: true, order: 3 },
    ],
  },

  // 3. Greatest Common Divisor and Extended Euclidean
  {
    title: 'Extended Euclidean Algorithm',
    slug: 'extended-euclidean-algorithm',
    description: `Given two positive integers \`a\` and \`b\`, compute the greatest common divisor \`gcd(a, b)\` and integers \`x\` and \`y\` such that:
\`a * x + b * y = gcd(a, b)\`
Output \`gcd x y\` separated by spaces. If multiple pairs of \`(x, y)\` exist, return the canonical pair where recursive step evaluates \`x = y1, y = x1 - (a // b) * y1\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= a, b <= 10^9`,
    inputFormat: `Two space-separated integers a and b.`,
    outputFormat: `Three space-separated integers: gcd x y`,
    sampleInput: `35 15`,
    sampleOutput: `5 1 -2`,
    points: 150,
    hints: [
      'Base case: when b == 0, gcd is a, x = 1, y = 0.',
      'Recursive step: gcd, x1, y1 = extgcd(b, a % b); x = y1; y = x1 - (a // b) * y1.',
    ],
    codeTemplates: {
      python: `import sys

def extgcd(a, b):
    if b == 0:
        return a, 1, 0
    g, x1, y1 = extgcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return g, x, y

def solve():
    raw = sys.stdin.read().split()
    if len(raw) < 2:
        return
    a, b = int(raw[0]), int(raw[1])
    g, x, y = extgcd(a, b)
    print(f"{g} {x} {y}")

solve()
`,
      javascript: `const fs = require('fs');

function extgcd(a, b) {
    if (b === 0) return [a, 1, 0];
    const [g, x1, y1] = extgcd(b, a % b);
    const x = y1;
    const y = x1 - Math.floor(a / b) * y1;
    return [g, x, y];
}

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (raw.length < 2) return;
    const a = parseInt(raw[0], 10);
    const b = parseInt(raw[1], 10);
    const [g, x, y] = extgcd(a, b);
    console.log(\`\${g} \${x} \${y}\`);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
def extgcd(a, b):
    if b == 0: return a, 1, 0
    g, x1, y1 = extgcd(b, a % b)
    return g, y1, x1 - (a // b) * y1

raw = sys.stdin.read().split()
if len(raw) >= 2:
    a, b = int(raw[0]), int(raw[1])
    g, x, y = extgcd(a, b)
    print(f"{g} {x} {y}")
`,
      javascript: `const fs = require('fs');
function extgcd(a, b) {
    if (b === 0) return [a, 1, 0];
    const [g, x1, y1] = extgcd(b, a % b);
    return [g, y1, x1 - Math.floor(a / b) * y1];
}
const raw = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (raw.length >= 2) {
    const a = parseInt(raw[0], 10), b = parseInt(raw[1], 10);
    const [g, x, y] = extgcd(a, b);
    console.log(\`\${g} \${x} \${y}\`);
}
`,
    },
    editorial: {
      approach: 'Extended Euclidean Algorithm.',
      algorithm: '1. Recurse down with (b, a % b) until remainder is 0.\n2. Back-substitute Bézout coefficients (x, y).\n3. Return gcd and integer linear combination coefficients.',
      timeComplexity: 'O(log(min(a, b)))',
      spaceComplexity: 'O(log(min(a, b)))',
      content: "Computes Bézout's identity coefficients in logarithmic steps.",
      referenceCode: `def extgcd(a, b):\n    if b == 0: return a, 1, 0\n    g, x1, y1 = extgcd(b, a % b)\n    return g, y1, x1 - (a // b) * y1`,
    },
    tags: ['Math', 'Number Theory'],
    testCases: [
      { input: `35 15`, expectedOutput: `5 1 -2`, isHidden: false, order: 0 },
      { input: `10 6`, expectedOutput: `2 -1 2`, isHidden: false, order: 1 },
      { input: `101 103`, expectedOutput: `1 51 -50`, isHidden: true, order: 2 },
      { input: `12 8`, expectedOutput: `4 1 -1`, isHidden: true, order: 3 },
    ],
  },
];
