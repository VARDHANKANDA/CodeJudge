import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack250ExtGDefs: ProblemDef[] = [
  // 1. Matrix Exponentiation Fibonacci (Medium)
  {
    title: 'N-th Fibonacci with Matrix Exponentiation',
    slug: 'nth-fibonacci-matrix-exponentiation',
    description: `Given an integer \`N\`, compute the \`N\`-th Fibonacci number modulo \`10^9 + 7\` in \`O(log N)\` time using Fast Matrix Exponentiation.
Base cases: \`F(0) = 0, F(1) = 1, F(2) = 1, F(3) = 2, ...\``,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= N <= 10^18`,
    inputFormat: `A single integer N.`,
    outputFormat: `An integer representing F(N) % 1000000007.`,
    sampleInput: `10`,
    sampleOutput: `55`,
    points: 150,
    hints: [
      'Transition matrix: [[1, 1], [1, 0]] * [F(n), F(n-1)] = [F(n+1), F(n)].',
      'Use binary exponentiation on 2x2 matrices modulo 10^9 + 7.',
    ],
    codeTemplates: {
      python: `import sys

MOD = 10**9 + 7

def mat_mul(A, B):
    return [
        [(A[0][0]*B[0][0] + A[0][1]*B[1][0]) % MOD, (A[0][0]*B[0][1] + A[0][1]*B[1][1]) % MOD],
        [(A[1][0]*B[0][0] + A[1][1]*B[1][0]) % MOD, (A[1][0]*B[0][1] + A[1][1]*B[1][1]) % MOD]
    ]

def mat_pow(A, p):
    res = [[1, 0], [0, 1]]
    base = A
    while p > 0:
        if p & 1:
            res = mat_mul(res, base)
        base = mat_mul(base, base)
        p >>= 1
    return res

def solve():
    raw = sys.stdin.read().strip()
    if not raw:
        return
    n = int(raw)
    if n == 0:
        print(0)
        return
    T = [[1, 1], [1, 0]]
    Tn = mat_pow(T, n - 1)
    print(Tn[0][0] % MOD)

solve()
`,
      javascript: `const fs = require('fs');

const MOD = 1000000007n;

function matMul(A, B) {
    return [
        [(A[0][0]*B[0][0] + A[0][1]*B[1][0]) % MOD, (A[0][0]*B[0][1] + A[0][1]*B[1][1]) % MOD],
        [(A[1][0]*B[0][0] + A[1][1]*B[1][0]) % MOD, (A[1][0]*B[0][1] + A[1][1]*B[1][1]) % MOD]
    ];
}

function matPow(A, p) {
    let res = [[1n, 0n], [0n, 1n]];
    let base = A;
    while (p > 0n) {
        if (p & 1n) res = matMul(res, base);
        base = matMul(base, base);
        p >>= 1n;
    }
    return res;
}

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (!raw) return;
    const n = BigInt(raw);
    if (n === 0n) { console.log("0"); return; }
    const T = [[1n, 1n], [1n, 0n]];
    const Tn = matPow(T, n - 1n);
    console.log(Tn[0][0].toString());
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
MOD = 10**9 + 7
def mat_mul(A, B):
    return [
        [(A[0][0]*B[0][0] + A[0][1]*B[1][0]) % MOD, (A[0][0]*B[0][1] + A[0][1]*B[1][1]) % MOD],
        [(A[1][0]*B[0][0] + A[1][1]*B[1][0]) % MOD, (A[1][0]*B[0][1] + A[1][1]*B[1][1]) % MOD]
    ]
def mat_pow(A, p):
    res = [[1, 0], [0, 1]]
    base = A
    while p > 0:
        if p & 1: res = mat_mul(res, base)
        base = mat_mul(base, base)
        p >>= 1
    return res

def solve():
    raw = sys.stdin.read().strip()
    if raw:
        n = int(raw)
        if n == 0: print(0)
        else:
            T = [[1, 1], [1, 0]]
            Tn = mat_pow(T, n - 1)
            print(Tn[0][0] % MOD)

solve()
`,
      javascript: `const fs = require('fs');
const MOD = 1000000007n;
function matMul(A, B) {
    return [
        [(A[0][0]*B[0][0] + A[0][1]*B[1][0]) % MOD, (A[0][0]*B[0][1] + A[0][1]*B[1][1]) % MOD],
        [(A[1][0]*B[0][0] + A[1][1]*B[1][0]) % MOD, (A[1][0]*B[0][1] + A[1][1]*B[1][1]) % MOD]
    ];
}
function matPow(A, p) {
    let res = [[1n, 0n], [0n, 1n]], base = A;
    while (p > 0n) {
        if (p & 1n) res = matMul(res, base);
        base = matMul(base, base);
        p >>= 1n;
    }
    return res;
}
function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
        const n = BigInt(raw);
        if (n === 0n) console.log("0");
        else {
            const T = [[1n, 1n], [1n, 0n]];
            const Tn = matPow(T, n - 1n);
            console.log(Tn[0][0].toString());
        }
    }
}
solve();
`,
    },
    editorial: {
      approach: 'Fast 2x2 Matrix Binary Exponentiation.',
      algorithm: '1. Form transition matrix [[1, 1], [1, 0]].\n2. Compute T^(n-1) in O(log N) matrix multiplications modulo 10^9+7.\n3. Return F(N) = T^(n-1)[0][0].',
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1)',
      content: 'Matrix exponentiation evaluates large recurrence terms in logarithmic steps.',
      referenceCode: `T = [[1, 1], [1, 0]]; return mat_pow(T, n - 1)[0][0] % MOD`,
    },
    tags: ['Math', 'Dynamic Programming', 'Matrix Exponentiation'],
    testCases: [
      { input: `10`, expectedOutput: `55`, isHidden: false, order: 0 },
      { input: `2`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `0`, expectedOutput: `0`, isHidden: true, order: 2 },
      { input: `50`, expectedOutput: `586268941`, isHidden: true, order: 3 },
    ],
  },

  // 2. Maximum XOR of Two Numbers in an Array (Medium - Bitwise Trie)
  {
    title: 'Maximum XOR of Two Numbers in an Array',
    slug: 'maximum-xor-of-two-numbers-in-an-array',
    description: `Given an integer array \`nums\`, return the maximum result of \`nums[i] XOR nums[j]\`, where \`0 <= i <= j < nums.length\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 2 * 10^5\n0 <= nums[i] <= 2^31 - 1`,
    inputFormat: `Comma or space separated integers on a single line.`,
    outputFormat: `An integer representing the maximum XOR.`,
    sampleInput: `3,10,5,25,2,8`,
    sampleOutput: `28`,
    points: 150,
    hints: [
      'Insert all 32-bit binary representations into a Binary Trie.',
      'For each number, greedily traverse the opposite bit branch whenever available.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read().strip().replace(',', ' ').split()
    if not raw:
        print(0)
        return
    nums = [int(x) for x in raw]
    
    # Trie structure
    trie = {}
    for num in nums:
        node = trie
        for i in range(30, -1, -1):
            bit = (num >> i) & 1
            if bit not in node:
                node[bit] = {}
            node = node[bit]
            
    max_xor = 0
    for num in nums:
        node = trie
        curr_xor = 0
        for i in range(30, -1, -1):
            bit = (num >> i) & 1
            opp = 1 - bit
            if opp in node:
                curr_xor |= (1 << i)
                node = node[opp]
            else:
                node = node[bit]
        if curr_xor > max_xor:
            max_xor = curr_xor
            
    print(max_xor)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
    if (!raw || raw[0] === '') { console.log(0); return; }
    const nums = raw.map(x => parseInt(x, 10));
    
    const trie = {};
    for (const num of nums) {
        let node = trie;
        for (let i = 30; i >= 0; i--) {
            const bit = (num >> i) & 1;
            if (!node[bit]) node[bit] = {};
            node = node[bit];
        }
    }
    
    let maxXor = 0;
    for (const num of nums) {
        let node = trie;
        let currXor = 0;
        for (let i = 30; i >= 0; i--) {
            const bit = (num >> i) & 1;
            const opp = 1 - bit;
            if (node[opp]) {
                currXor |= (1 << i);
                node = node[opp];
            } else {
                node = node[bit];
            }
        }
        if (currXor > maxXor) maxXor = currXor;
    }
    
    console.log(maxXor);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
raw = sys.stdin.read().strip().replace(',', ' ').split()
if raw:
    nums = [int(x) for x in raw]
    trie = {}
    for num in nums:
        node = trie
        for i in range(30, -1, -1):
            bit = (num >> i) & 1
            if bit not in node: node[bit] = {}
            node = node[bit]
    max_xor = 0
    for num in nums:
        node = trie
        curr = 0
        for i in range(30, -1, -1):
            bit = (num >> i) & 1
            opp = 1 - bit
            if opp in node:
                curr |= (1 << i)
                node = node[opp]
            else:
                node = node[bit]
        if curr > max_xor: max_xor = curr
    print(max_xor)
else:
    print(0)
`,
      javascript: `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
if (raw && raw[0] !== '') {
    const nums = raw.map(x => parseInt(x, 10));
    const trie = {};
    for (const num of nums) {
        let node = trie;
        for (let i = 30; i >= 0; i--) {
            const bit = (num >> i) & 1;
            if (!node[bit]) node[bit] = {};
            node = node[bit];
        }
    }
    let maxXor = 0;
    for (const num of nums) {
        let node = trie, curr = 0;
        for (let i = 30; i >= 0; i--) {
            const bit = (num >> i) & 1, opp = 1 - bit;
            if (node[opp]) { curr |= (1 << i); node = node[opp]; }
            else node = node[bit];
        }
        if (curr > maxXor) maxXor = curr;
    }
    console.log(maxXor);
} else { console.log(0); }
`,
    },
    editorial: {
      approach: 'Bitwise Prefix Trie / Greedy Bit Matching.',
      algorithm: '1. Insert 31-bit representations into binary Trie.\n2. For each number, greedily traverse the opposite bit branch to maximize XOR.\n3. Return global maximum XOR.',
      timeComplexity: 'O(32 * N) = O(N)',
      spaceComplexity: 'O(32 * N) = O(N)',
      content: 'Trie allows finding the optimal opposite bit complement in constant 32-step tree traversals.',
      referenceCode: `if opp in node: curr |= (1 << i); node = node[opp]\nelse: node = node[bit]`,
    },
    tags: ['Trie', 'Bit Manipulation', 'Array'],
    testCases: [
      { input: `3,10,5,25,2,8`, expectedOutput: `28`, isHidden: false, order: 0 },
      { input: `14,70,53,83,49,91,36,80,92,51,66,70`, expectedOutput: `127`, isHidden: false, order: 1 },
      { input: `0`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },

  // 3. Shortest Path in a Grid with Obstacles Elimination (Hard)
  {
    title: 'Shortest Path with Obstacles Elimination',
    slug: 'shortest-path-with-obstacles-elimination',
    description: `You are given an \`m x n\` integer matrix \`grid\` where each cell is either \`0\` (empty) or \`1\` (obstacle). You can move up, down, left, or right from and to an empty cell in one step.
You are also given an integer \`k\` that enables you to eliminate at most \`k\` obstacles.
Return the minimum number of steps to walk from the upper left corner \`(0, 0)\` to the lower right corner \`(m - 1, n - 1)\` or \`-1\` if no such walk exists.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= m, n <= 40\n1 <= k <= m * n\ngrid[i][j] is 0 or 1.\ngrid[0][0] == grid[m-1][n-1] == 0`,
    inputFormat: `Line 1: m, n, k\nNext m lines: n space-separated integers for grid cells`,
    outputFormat: `An integer representing shortest path length or -1.`,
    sampleInput: `3 3 1\n0 0 0\n1 1 0\n0 0 0`,
    sampleOutput: `4`,
    points: 200,
    hints: [
      'Use Breadth-First Search (BFS) tracking state (row, col, remaining_k).',
      'Keep visited array visited[r][c] storing the maximum remaining_k seen so far at cell (r, c).',
    ],
    codeTemplates: {
      python: `import sys
from collections import deque

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    m, n, k = int(data[0]), int(data[1]), int(data[2])
    grid = []
    idx = 3
    for _ in range(m):
        grid.append([int(x) for x in data[idx:idx+n]])
        idx += n
        
    if m == 1 and n == 1:
        print(0)
        return
        
    # BFS: (r, c, k_rem, steps)
    queue = deque([(0, 0, k, 0)])
    visited = {}
    visited[(0, 0)] = k
    
    dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    
    while queue:
        r, c, rem, steps = queue.popleft()
        if r == m - 1 and c == n - 1:
            print(steps)
            return
            
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n:
                nxt_rem = rem - grid[nr][nc]
                if nxt_rem >= 0:
                    if (nr, nc) not in visited or visited[(nr, nc)] < nxt_rem:
                        visited[(nr, nc)] = nxt_rem
                        queue.append((nr, nc, nxt_rem, steps + 1))
                        
    print(-1)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!data || data.length < 3) return;
    const m = parseInt(data[0], 10);
    const n = parseInt(data[1], 10);
    const k = parseInt(data[2], 10);
    
    const grid = [];
    let idx = 3;
    for (let i = 0; i < m; i++) {
        const row = [];
        for (let j = 0; j < n; j++) row.push(parseInt(data[idx++], 10));
        grid.push(row);
    }
    
    if (m === 1 && n === 1) { console.log(0); return; }
    
    const maxK = Array.from({ length: m }, () => new Int32Array(n).fill(-1));
    maxK[0][0] = k;
    
    const queue = [[0, 0, k, 0]];
    let head = 0;
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    while (head < queue.length) {
        const [r, c, rem, steps] = queue[head++];
        if (r === m - 1 && c === n - 1) {
            console.log(steps);
            return;
        }
        
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                const nxtRem = rem - grid[nr][nc];
                if (nxtRem >= 0 && nxtRem > maxK[nr][nc]) {
                    maxK[nr][nc] = nxtRem;
                    queue.push([nr, nc, nxtRem, steps + 1]);
                }
            }
        }
    }
    
    console.log(-1);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
from collections import deque
data = sys.stdin.read().split()
if data:
    m, n, k = int(data[0]), int(data[1]), int(data[2])
    grid = []
    idx = 3
    for _ in range(m):
        grid.append([int(x) for x in data[idx:idx+n]])
        idx += n
    if m == 1 and n == 1: print(0)
    else:
        queue = deque([(0, 0, k, 0)])
        vis = {(0, 0): k}
        ans = -1
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        while queue:
            r, c, rem, steps = queue.popleft()
            if r == m - 1 and c == n - 1: ans = steps; break
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    nxt = rem - grid[nr][nc]
                    if nxt >= 0 and (vis.get((nr, nc), -1) < nxt):
                        vis[(nr, nc)] = nxt
                        queue.append((nr, nc, nxt, steps + 1))
        print(ans)
`,
      javascript: `const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data && data.length >= 3) {
    const m = parseInt(data[0], 10), n = parseInt(data[1], 10), k = parseInt(data[2], 10);
    const grid = [];
    let idx = 3;
    for (let i = 0; i < m; i++) {
        const row = [];
        for (let j = 0; j < n; j++) row.push(parseInt(data[idx++], 10));
        grid.push(row);
    }
    if (m === 1 && n === 1) console.log(0);
    else {
        const maxK = Array.from({ length: m }, () => new Int32Array(n).fill(-1));
        maxK[0][0] = k;
        const queue = [[0, 0, k, 0]];
        let head = 0, ans = -1;
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        while (head < queue.length) {
            const [r, c, rem, steps] = queue[head++];
            if (r === m - 1 && c === n - 1) { ans = steps; break; }
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                    const nxtRem = rem - grid[nr][nc];
                    if (nxtRem >= 0 && nxtRem > maxK[nr][nc]) {
                        maxK[nr][nc] = nxtRem;
                        queue.push([nr, nc, nxtRem, steps + 1]);
                    }
                }
            }
        }
        console.log(ans);
    }
}
`,
    },
    editorial: {
      approach: 'State-Space BFS with Obstacle Elimination Quota.',
      algorithm: '1. BFS state tuple: (row, col, remaining_k, step_count).\n2. Prune states that reach (r, c) with less remaining elimination budget than previously recorded.\n3. Return step count on reaching destination.',
      timeComplexity: 'O(M * N * K)',
      spaceComplexity: 'O(M * N * K)',
      content: 'BFS over 3D state space guarantees the shortest traversal path under obstacle removal constraints.',
      referenceCode: `if nxt_rem >= 0 and visited[nr][nc] < nxt_rem:\n    visited[nr][nc] = nxt_rem; queue.append((nr, nc, nxt_rem, steps + 1))`,
    },
    tags: ['Breadth-First Search', 'Matrix', 'Array'],
    testCases: [
      { input: `3 3 1\n0 0 0\n1 1 0\n0 0 0`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `3 3 0\n0 1 0\n1 1 0\n0 0 0`, expectedOutput: `-1`, isHidden: false, order: 1 },
      { input: `1 1 5\n0`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
];
