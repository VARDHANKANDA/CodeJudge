import { ProblemSpec, writePack } from './pack-writer-util';

// PACK M: Multi-Paradigm Hard Algorithms (19 problems)
const problemsM: ProblemSpec[] = [
  {
    title: 'Longest Increasing Path in a Matrix Memoization',
    slug: 'longest-increasing-path-in-a-matrix-memoization',
    description: `Given an \`m x n\` integers matrix, return the length of the longest increasing path in matrix. From each cell, you can either move in four directions: left, right, up, or down.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `m == matrix.length, n == matrix[i].length, 1 <= m, n <= 200, 0 <= matrix[i][j] <= 2^31 - 1`,
    inputFormat: `matrix`,
    outputFormat: `Length of longest increasing path.`,
    sampleInput: `[[9,9,4],[6,6,8],[2,1,1]]`,
    sampleOutput: `4`,
    points: 200,
    hints: ['The matrix values define a DAG (Directed Acyclic Graph). Use DFS with memoization.'],
    codeTemplates: {
      python: `class Solution:\n    def longestIncreasingPath(self, matrix: list) -> int:\n        pass`,
      javascript: `class Solution {\n    longestIncreasingPath(matrix) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def longestIncreasingPath(self, matrix: list) -> int:
        if not matrix or not matrix[0]: return 0
        m, n = len(matrix), len(matrix[0])
        memo = {}
        def dfs(r, c):
            if (r, c) in memo: return memo[(r, c)]
            best = 1
            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:
                    best = max(best, 1 + dfs(nr, nc))
            memo[(r, c)] = best
            return best
        return max(dfs(r, c) for r in range(m) for c in range(n))`,
      javascript: `class Solution {
    longestIncreasingPath(matrix) {
        if (!matrix || matrix.length === 0) return 0;
        const m = matrix.length, n = matrix[0].length;
        const memo = Array.from({ length: m }, () => Array(n).fill(0));
        function dfs(r, c) {
            if (memo[r][c] !== 0) return memo[r][c];
            let best = 1;
            const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > matrix[r][c]) {
                    best = Math.max(best, 1 + dfs(nr, nc));
                }
            }
            memo[r][c] = best;
            return best;
        }
        let ans = 0;
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                ans = Math.max(ans, dfs(r, c));
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'DAG Topological Memoization DFS.',
      algorithm: 'Strictly increasing constraint guarantees no cycles. Memoized DFS evaluates longest path in O(M * N).',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(M * N)',
      content: 'Standard matrix DAG longest path.',
      referenceCode: `best = max(best, 1 + dfs(nr, nc))`,
    },
    tags: ['Dynamic Programming', 'Depth-First Search', 'Graph', 'Matrix', 'Memoization'],
    testCases: [
      { input: `[[9,9,4],[6,6,8],[2,1,1]]`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `[[3,4,5],[3,2,6],[2,2,1]]`, expectedOutput: `4`, isHidden: false, order: 1 },
      { input: `[[1]]`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Making A Large Island Component Union DSU',
    slug: 'making-a-large-island-component-union-dsu',
    description: `You are given an \`n x n\` binary matrix \`grid\`. You are allowed to change at most one \`0\` to be \`1\`. Return the size of the largest island in \`grid\` after applying this operation.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n == grid.length, n == grid[i].length, 1 <= n <= 50`,
    inputFormat: `grid`,
    outputFormat: `Largest island size integer.`,
    sampleInput: `[[1,0],[0,1]]`,
    sampleOutput: `3`,
    points: 200,
    hints: ['Color each connected component of 1s with a unique id and compute its area. For each 0 cell, sum adjacent unique component areas + 1.'],
    codeTemplates: {
      python: `class Solution:\n    def largestIsland(self, grid: list) -> int:\n        pass`,
      javascript: `class Solution {\n    largestIsland(grid) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def largestIsland(self, grid: list) -> int:
        n = len(grid)
        area = {0: 0}
        color = 2
        def dfs(r, c, col):
            grid[r][c] = col
            cnt = 1
            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 1:
                    cnt += dfs(nr, nc, col)
            return cnt
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 1:
                    area[color] = dfs(r, c, color)
                    color += 1
        ans = max(area.values())
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 0:
                    seen = set()
                    for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < n and 0 <= nc < n:
                            seen.add(grid[nr][nc])
                    ans = max(ans, 1 + sum(area[c] for c in seen))
        return ans`,
      javascript: `class Solution {
    largestIsland(grid) {
        const n = grid.length;
        const area = { 0: 0 };
        let color = 2;
        function dfs(r, c, col) {
            grid[r][c] = col;
            let cnt = 1;
            const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 1) {
                    cnt += dfs(nr, nc, col);
                }
            }
            return cnt;
        }
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                if (grid[r][c] === 1) {
                    area[color] = dfs(r, c, color);
                    color++;
                }
            }
        }
        let ans = Math.max(...Object.values(area));
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                if (grid[r][c] === 0) {
                    const seen = new Set();
                    const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
                    for (const [dr, dc] of dirs) {
                        const nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                            seen.add(grid[nr][nc]);
                        }
                    }
                    let total = 1;
                    for (const col of seen) total += area[col];
                    ans = Math.max(ans, total);
                }
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Connected Component Coloring + Adjacent Sum Hash Map.',
      algorithm: 'Label components with unique IDs; for each 0 test 4 adjacent unique colors.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N^2)',
      content: 'Standard grid component union bridge query.',
      referenceCode: `ans = max(ans, 1 + sum(area[c] for c in seen))`,
    },
    tags: ['Depth-First Search', 'Breadth-First Search', 'Union Find', 'Matrix', 'Array'],
    testCases: [
      { input: `[[1,0],[0,1]]`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `[[1,1],[1,0]]`, expectedOutput: `4`, isHidden: false, order: 1 },
      { input: `[[1,1],[1,1]]`, expectedOutput: `4`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Swim in Rising Water Min Max Path Dijkstra',
    slug: 'swim-in-rising-water-min-max-path-dijkstra',
    description: `You are given an \`n x n\` integer matrix \`grid\` where each value \`grid[i][j]\` represents the elevation at that point \`(i, j)\`. Return the least time until you can reach the bottom right square \`(n - 1, n - 1)\` if you start at the top left square \`(0, 0)\`.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n == grid.length, n == grid[i].length, 1 <= n <= 50, 0 <= grid[i][j] < n^2`,
    inputFormat: `grid`,
    outputFormat: `Minimum time integer.`,
    sampleInput: `[[0,2],[1,3]]`,
    sampleOutput: `3`,
    points: 200,
    hints: ['Use modified Dijkstra / Min-Heap where edge weight is max(current_time, grid[nr][nc]).'],
    codeTemplates: {
      python: `class Solution:\n    def swimInWater(self, grid: list) -> int:\n        pass`,
      javascript: `class Solution {\n    swimInWater(grid) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def swimInWater(self, grid: list) -> int:
        n = len(grid)
        import heapq
        pq = [(grid[0][0], 0, 0)]
        vis = {(0, 0)}
        while pq:
            t, r, c = heapq.heappop(pq)
            if r == n - 1 and c == n - 1:
                return t
            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in vis:
                    vis.add((nr, nc))
                    heapq.heappush(pq, (max(t, grid[nr][nc]), nr, nc))
        return 0`,
      javascript: `class Solution {
    swimInWater(grid) {
        const n = grid.length;
        const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));
        dist[0][0] = grid[0][0];
        const pq = [[grid[0][0], 0, 0]];
        while (pq.length > 0) {
            pq.sort((a, b) => a[0] - b[0]);
            const [t, r, c] = pq.shift();
            if (r === n - 1 && c === n - 1) return t;
            const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                    const nt = Math.max(t, grid[nr][nc]);
                    if (nt < dist[nr][nc]) {
                        dist[nr][nc] = nt;
                        pq.push([nt, nr, nc]);
                    }
                }
            }
        }
        return dist[n - 1][n - 1];
    }
}`,
    },
    editorial: {
      approach: 'Minimax Path via Dijkstra Algorithm.',
      algorithm: 'Shortest path over bottleneck edge metric max(cost, elevation).',
      timeComplexity: 'O(N^2 log N)',
      spaceComplexity: 'O(N^2)',
      content: 'Standard minimax grid path with Dijkstra.',
      referenceCode: `heapq.heappush(pq, (max(t, grid[nr][nc]), nr, nc))`,
    },
    tags: ['Graph', 'Dijkstra', 'Heap', 'Matrix', 'Binary Search'],
    testCases: [
      { input: `[[0,2],[1,3]]`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `[[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]`, expectedOutput: `16`, isHidden: false, order: 1 },
      { input: `[[0]]`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Super Egg Drop Optimum Strategy DP',
    slug: 'super-egg-drop-optimum-strategy-dp',
    description: `You are given \`k\` identical eggs and you have access to a building with \`n\` floors labeled from 1 to n. Return the minimum number of moves that you need to determine with certainty what the value of the critical floor $f$ is.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= k <= 100, 1 <= n <= 10^4`,
    inputFormat: `k, n`,
    outputFormat: `Minimum moves integer.`,
    sampleInput: `1, 2`,
    sampleOutput: `2`,
    points: 200,
    hints: ['Invert the DP: dp[m][k] = maximum floors testable with m moves and k eggs. dp[m][k] = dp[m-1][k-1] + dp[m-1][k] + 1.'],
    codeTemplates: {
      python: `class Solution:\n    def superEggDrop(self, k: int, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    superEggDrop(k, n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def superEggDrop(self, k: int, n: int) -> int:
        dp = [0] * (k + 1)
        m = 0
        while dp[k] < n:
            m += 1
            for egg in range(k, 0, -1):
                dp[egg] = dp[egg] + dp[egg - 1] + 1
        return m`,
      javascript: `class Solution {
    superEggDrop(k, n) {
        const dp = Array(k + 1).fill(0);
        let m = 0;
        while (dp[k] < n) {
            m++;
            for (let egg = k; egg >= 1; egg--) {
                dp[egg] = dp[egg] + dp[egg - 1] + 1;
            }
        }
        return m;
    }
}`,
    },
    editorial: {
      approach: 'Inverse Dynamic Programming on Number of Moves.',
      algorithm: 'dp[m][k] tracks maximum reachable floors with m moves. Solve for lowest m where dp[m][k] >= n in O(K * moves).',
      timeComplexity: 'O(K log N)',
      spaceComplexity: 'O(K)',
      content: 'Classic dual DP representation for egg drop problem.',
      referenceCode: `dp[egg] = dp[egg] + dp[egg - 1] + 1`,
    },
    tags: ['Dynamic Programming', 'Math', 'Binary Search'],
    testCases: [
      { input: `1, 2`, expectedOutput: `2`, isHidden: false, order: 0 },
      { input: `2, 6`, expectedOutput: `3`, isHidden: false, order: 1 },
      { input: `3, 14`, expectedOutput: `4`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Burst Balloons Maximum Coins Interval DP',
    slug: 'burst-balloons-maximum-coins-interval-dp',
    description: `You are given \`n\` balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array \`nums\`. You are asked to burst all the balloons. If you burst balloon \`i\`, you will get \`nums[i - 1] * nums[i] * nums[i + 1]\` coins. Return the maximum coins you can collect by bursting the balloons wisely.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n == nums.length, 1 <= n <= 300, 0 <= nums[i] <= 100`,
    inputFormat: `nums`,
    outputFormat: `Maximum coins integer.`,
    sampleInput: `[3,1,5,8]`,
    sampleOutput: `167`,
    points: 200,
    hints: ['Think in reverse: which balloon is burst LAST in the interval (l, r)?'],
    codeTemplates: {
      python: `class Solution:\n    def maxCoins(self, nums: list) -> int:\n        pass`,
      javascript: `class Solution {\n    maxCoins(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maxCoins(self, nums: list) -> int:
        A = [1] + [x for x in nums if x > 0] + [1]
        n = len(A)
        dp = [[0] * n for _ in range(n)]
        for length in range(2, n):
            for l in range(n - length):
                r = l + length
                for k in range(l + 1, r):
                    coins = A[l] * A[k] * A[r] + dp[l][k] + dp[k][r]
                    if coins > dp[l][r]:
                        dp[l][r] = coins
        return dp[0][n - 1]`,
      javascript: `class Solution {
    maxCoins(nums) {
        const A = [1, ...nums.filter(x => x > 0), 1];
        const n = A.length;
        const dp = Array.from({ length: n }, () => Array(n).fill(0));
        for (let len = 2; len < n; len++) {
            for (let l = 0; l < n - len; l++) {
                const r = l + len;
                for (let k = l + 1; k < r; k++) {
                    const coins = A[l] * A[k] * A[r] + dp[l][k] + dp[k][r];
                    if (coins > dp[l][r]) dp[l][r] = coins;
                }
            }
        }
        return dp[0][n - 1];
    }
}`,
    },
    editorial: {
      approach: 'Reverse Last-Burst Interval Dynamic Programming.',
      algorithm: 'Choose last-burst pivot k in interval (l, r) where boundaries A[l] and A[r] remain alive.',
      timeComplexity: 'O(N^3)',
      spaceComplexity: 'O(N^2)',
      content: 'Standard interval dynamic programming.',
      referenceCode: `coins = A[l] * A[k] * A[r] + dp[l][k] + dp[k][r]`,
    },
    tags: ['Dynamic Programming', 'Array'],
    testCases: [
      { input: `[3,1,5,8]`, expectedOutput: `167`, isHidden: false, order: 0 },
      { input: `[1,5]`, expectedOutput: `10`, isHidden: false, order: 1 },
      { input: `[7]`, expectedOutput: `7`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Remove Boxes 3D State Memoization DP',
    slug: 'remove-boxes-3d-state-memoization-dp',
    description: `You are given several boxes with different colors represented by different positive numbers. You may remove continuous boxes of the same color (say \`k\` boxes) and get \`k * k\` points. Return the maximum points you can get.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= boxes.length <= 50, 1 <= boxes[i] <= 100`,
    inputFormat: `boxes`,
    outputFormat: `Maximum points integer.`,
    sampleInput: `[1,3,2,2,2,3,4,3,1]`,
    sampleOutput: `23`,
    points: 200,
    hints: ['DP state dp(l, r, k): maximum points in boxes[l..r] with k extra boxes matching boxes[l] attached to its left.'],
    codeTemplates: {
      python: `class Solution:\n    def removeBoxes(self, boxes: list) -> int:\n        pass`,
      javascript: `class Solution {\n    removeBoxes(boxes) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def removeBoxes(self, boxes: list) -> int:
        memo = {}
        def dp(l, r, k):
            if l > r: return 0
            while l + 1 <= r and boxes[l] == boxes[l + 1]:
                l += 1
                k += 1
            if (l, r, k) in memo: return memo[(l, r, k)]
            res = (k + 1) * (k + 1) + dp(l + 1, r, 0)
            for m in range(l + 1, r + 1):
                if boxes[m] == boxes[l]:
                    res = max(res, dp(l + 1, m - 1, 0) + dp(m, r, k + 1))
            memo[(l, r, k)] = res
            return res
        return dp(0, len(boxes) - 1, 0)`,
      javascript: `class Solution {
    removeBoxes(boxes) {
        const memo = new Map();
        function dp(l, r, k) {
            if (l > r) return 0;
            while (l + 1 <= r && boxes[l] === boxes[l + 1]) {
                l++; k++;
            }
            const key = `${l},${r},${k}`;
            if (memo.has(key)) return memo.get(key);
            let res = (k + 1) * (k + 1) + dp(l + 1, r, 0);
            for (let m = l + 1; m <= r; m++) {
                if (boxes[m] === boxes[l]) {
                    res = Math.max(res, dp(l + 1, m - 1, 0) + dp(m, r, k + 1));
                }
            }
            memo.set(key, res);
            return res;
        }
        return dp(0, boxes.length - 1, 0);
    }
}`,
    },
    editorial: {
      approach: '3D Interval DP with Left Prefix Matching Multiplier.',
      algorithm: 'Track contiguous color match runs across recursive sub-interval boundaries.',
      timeComplexity: 'O(N^4)',
      spaceComplexity: 'O(N^3)',
      content: 'Classic advanced 3D interval DP.',
      referenceCode: `res = max(res, dp(l + 1, m - 1, 0) + dp(m, r, k + 1))`,
    },
    tags: ['Dynamic Programming', 'Memoization', 'Array'],
    testCases: [
      { input: `[1,3,2,2,2,3,4,3,1]`, expectedOutput: `23`, isHidden: false, order: 0 },
      { input: `[1,1,1]`, expectedOutput: `9`, isHidden: false, order: 1 },
      { input: `[1]`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Strange Printer Minimum Turns Interval DP',
    slug: 'strange-printer-minimum-turns-interval-dp',
    description: `There is a strange printer with the following two special requirements: On each turn, the printer can print a continuous sequence of the same character. On each turn, the printer can overwrite existing characters. Given a string \`s\`, return the minimum number of turns the printer needed to print it.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= s.length <= 100, s consists of lowercase English letters`,
    inputFormat: `s`,
    outputFormat: `Minimum turns integer.`,
    sampleInput: `"aaabbb"`,
    sampleOutput: `2`,
    points: 200,
    hints: ['dp[i][j] = dp[i][j-1] if s[i] == s[j], else min(dp[i][k] + dp[k+1][j]).'],
    codeTemplates: {
      python: `class Solution:\n    def strangePrinter(self, s: str) -> int:\n        pass`,
      javascript: `class Solution {\n    strangePrinter(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def strangePrinter(self, s: str) -> int:
        if not s: return 0
        n = len(s)
        memo = {}
        def dp(i, j):
            if i >= j: return 1 if i == j else 0
            if (i, j) in memo: return memo[(i, j)]
            res = dp(i, j - 1) + 1
            for k in range(i, j):
                if s[k] == s[j]:
                    res = min(res, dp(i, k) + dp(k + 1, j - 1))
            memo[(i, j)] = res
            return res
        return dp(0, n - 1)`,
      javascript: `class Solution {
    strangePrinter(s) {
        if (!s) return 0;
        const n = s.length;
        const memo = Array.from({ length: n }, () => Array(n).fill(0));
        function dp(i, j) {
            if (i >= j) return i === j ? 1 : 0;
            if (memo[i][j] !== 0) return memo[i][j];
            let res = dp(i, j - 1) + 1;
            for (let k = i; k < j; k++) {
                if (s[k] === s[j]) {
                    res = Math.min(res, dp(i, k) + dp(k + 1, j - 1));
                }
            }
            memo[i][j] = res;
            return res;
        }
        return dp(0, n - 1);
    }
}`,
    },
    editorial: {
      approach: 'Overwriting Interval Dynamic Programming.',
      algorithm: 'If suffix character matches internal partition character, turns can be merged.',
      timeComplexity: 'O(N^3)',
      spaceComplexity: 'O(N^2)',
      content: 'Standard interval DP overwrite minimization.',
      referenceCode: `if s[k] == s[j]: res = min(res, dp(i, k) + dp(k + 1, j - 1))`,
    },
    tags: ['Dynamic Programming', 'String'],
    testCases: [
      { input: `"aaabbb"`, expectedOutput: `2`, isHidden: false, order: 0 },
      { input: `"aba"`, expectedOutput: `2`, isHidden: false, order: 1 },
      { input: `"a"`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Shortest Path Visiting All Nodes BFS Bitmask',
    slug: 'shortest-path-visiting-all-nodes-bfs-bitmask',
    description: `You have an undirected, connected graph of \`n\` nodes labeled from \`0\` to \`n - 1\`. You are given an array \`graph\` where \`graph[i]\` is a list of all the nodes connected with node \`i\` by an edge. Return the length of the shortest path that visits every node. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n == graph.length, 1 <= n <= 12, 0 <= graph[i].length < n`,
    inputFormat: `graph`,
    outputFormat: `Shortest path length integer.`,
    sampleInput: `[[1,2,3],[0],[0],[0]]`,
    sampleOutput: `4`,
    points: 200,
    hints: ['Multi-source BFS with state (node, visited_mask). Target state is mask == (1 << n) - 1.'],
    codeTemplates: {
      python: `class Solution:\n    def shortestPathLength(self, graph: list) -> int:\n        pass`,
      javascript: `class Solution {\n    shortestPathLength(graph) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def shortestPathLength(self, graph: list) -> int:
        n = len(graph)
        if n <= 1: return 0
        import collections
        target = (1 << n) - 1
        q = collections.deque([(i, 1 << i, 0) for i in range(n)])
        vis = {(i, 1 << i) for i in range(n)}
        while q:
            u, mask, dist = q.popleft()
            if mask == target: return dist
            for v in graph[u]:
                next_mask = mask | (1 << v)
                if (v, next_mask) not in vis:
                    vis.add((v, next_mask))
                    q.append((v, next_mask, dist + 1))
        return 0`,
      javascript: `class Solution {
    shortestPathLength(graph) {
        const n = graph.length;
        if (n <= 1) return 0;
        const target = (1 << n) - 1;
        const q = [];
        const vis = new Set();
        for (let i = 0; i < n; i++) {
            q.push([i, 1 << i, 0]);
            vis.add(`${i},${1 << i}`);
        }
        while (q.length > 0) {
            const [u, mask, dist] = q.shift();
            if (mask === target) return dist;
            for (const v of graph[u]) {
                const nextMask = mask | (1 << v);
                const key = `${v},${nextMask}`;
                if (!vis.has(key)) {
                    vis.add(key);
                    q.push([v, nextMask, dist + 1]);
                }
            }
        }
        return 0;
    }
}`,
    },
    editorial: {
      approach: 'Multi-Source Level-Order BFS on State Space Graph.',
      algorithm: 'State space consists of (u, mask) with N * 2^N states. First queue element reaching full mask is optimal.',
      timeComplexity: 'O(N^2 * 2^N)',
      spaceComplexity: 'O(N * 2^N)',
      content: 'Standard state-space BFS for shortest visiting path.',
      referenceCode: `q.append((v, next_mask, dist + 1))`,
    },
    tags: ['Breadth-First Search', 'Bit Manipulation', 'Graph', 'Bitmask'],
    testCases: [
      { input: `[[1,2,3],[0],[0],[0]]`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `[[1],[0,2,4],[1,3,4],[2],[1,2]]`, expectedOutput: `4`, isHidden: false, order: 1 },
      { input: `[[]]`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Find Shortest Superstring TSP Bitmask DP',
    slug: 'find-shortest-superstring-tsp-bitmask-dp',
    description: `Given an array of strings \`words\`, return the smallest string that contains each string in \`words\` as a substring. If there are multiple valid strings of the smallest length, return any of them.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= words.length <= 12, 1 <= words[i].length <= 20`,
    inputFormat: `words`,
    outputFormat: `Shortest superstring.`,
    sampleInput: `["alex","loves","leetcode"]`,
    sampleOutput: `"alexlovesleetcode"`,
    points: 200,
    hints: ['Compute pairwise overlaps between words and solve Traveling Salesperson Problem (TSP) with Bitmask DP.'],
    codeTemplates: {
      python: `class Solution:\n    def shortestSuperstring(self, words: list) -> str:\n        pass`,
      javascript: `class Solution {\n    shortestSuperstring(words) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def shortestSuperstring(self, words: list) -> str:
        n = len(words)
        cost = [[0] * n for _ in range(n)]
        for i in range(n):
            for j in range(n):
                if i != j:
                    w1, w2 = words[i], words[j]
                    cost[i][j] = len(w2)
                    for k in range(min(len(w1), len(w2)), 0, -1):
                        if w1.endswith(w2[:k]):
                            cost[i][j] = len(w2) - k
                            break
        dp = [[""] * n for _ in range(1 << n)]
        for i in range(n):
            dp[1 << i][i] = words[i]
        for mask in range(1, 1 << n):
            for i in range(n):
                if not (mask & (1 << i)) or not dp[mask][i]: continue
                for j in range(n):
                    if not (mask & (1 << j)):
                        next_mask = mask | (1 << j)
                        cand = dp[mask][i] + words[j][len(words[j]) - cost[i][j]:]
                        if not dp[next_mask][j] or len(cand) < len(dp[next_mask][j]):
                            dp[next_mask][j] = cand
        full = (1 << n) - 1
        return min((dp[full][i] for i in range(n) if dp[full][i]), key=len)`,
      javascript: `class Solution {
    shortestSuperstring(words) {
        const n = words.length;
        const cost = Array.from({ length: n }, () => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    const w1 = words[i], w2 = words[j];
                    cost[i][j] = w2.length;
                    for (let k = Math.min(w1.length, w2.length); k > 0; k--) {
                        if (w1.endsWith(w2.slice(0, k))) {
                            cost[i][j] = w2.length - k;
                            break;
                        }
                    }
                }
            }
        }
        const dp = Array.from({ length: 1 << n }, () => Array(n).fill(""));
        for (let i = 0; i < n; i++) dp[1 << i][i] = words[i];
        for (let mask = 1; mask < (1 << n); mask++) {
            for (let i = 0; i < n; i++) {
                if (!(mask & (1 << i)) || !dp[mask][i]) continue;
                for (let j = 0; j < n; j++) {
                    if (!(mask & (1 << j))) {
                        const nextMask = mask | (1 << j);
                        const cand = dp[mask][i] + words[j].slice(words[j].length - cost[i][j]);
                        if (!dp[nextMask][j] || cand.length < dp[nextMask][j].length) {
                            dp[nextMask][j] = cand;
                        }
                    }
                }
            }
        }
        const full = (1 << n) - 1;
        let ans = null;
        for (let i = 0; i < n; i++) {
            if (dp[full][i]) {
                if (!ans || dp[full][i].length < ans.length) ans = dp[full][i];
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Overlap TSP Dynamic Programming.',
      algorithm: 'Precompute pairwise overlap suffixes, then solve TSP using 2^N * N states.',
      timeComplexity: 'O(N^2 * 2^N)',
      spaceComplexity: 'O(N * 2^N)',
      content: 'Classic TSP string reduction.',
      referenceCode: `cand = dp[mask][i] + words[j][len(words[j]) - cost[i][j]:]`,
    },
    tags: ['Dynamic Programming', 'Bit Manipulation', 'String', 'Bitmask'],
    testCases: [
      { input: `["alex","loves","leetcode"]`, expectedOutput: `"alexlovesleetcode"`, isHidden: false, order: 0 },
      { input: `["catg","ctaagt","gcta","ttca","atgcatc"]`, expectedOutput: `"gctaagttcatgcatc"`, isHidden: false, order: 1 },
      { input: `["a"]`, expectedOutput: `"a"`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Minimum Cost to Make at Least One Valid Path 0-1 BFS',
    slug: 'minimum-cost-to-make-at-least-one-valid-path-0-1-bfs',
    description: `Given an \`m x n\` grid. Each cell has a sign pointing right, left, lower, or upper. In one step you can change the sign of a cell with cost 1. Return the minimum cost to make at least one valid path from \`(0, 0)\` to \`(m - 1, n - 1)\`.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `m == grid.length, n == grid[i].length, 1 <= m, n <= 100`,
    inputFormat: `grid`,
    outputFormat: `Minimum modification cost integer.`,
    sampleInput: `[[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]`,
    sampleOutput: `3`,
    points: 200,
    hints: ['Graph edges have weight 0 (if sign matches direction) and 1 (if sign changed). Use 0-1 BFS with deque.'],
    codeTemplates: {
      python: `class Solution:\n    def minCost(self, grid: list) -> int:\n        pass`,
      javascript: `class Solution {\n    minCost(grid) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minCost(self, grid: list) -> int:
        m, n = len(grid), len(grid[0])
        import collections
        dirs = [(0,1),(0,-1),(1,0),(-1,0)]
        dist = [[float('inf')] * n for _ in range(m)]
        dist[0][0] = 0
        q = collections.deque([(0, 0, 0)])
        while q:
            cost, r, c = q.popleft()
            if cost > dist[r][c]: continue
            if r == m - 1 and c == n - 1: return cost
            for i, (dr, dc) in enumerate(dirs):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    w = 0 if grid[r][c] == i + 1 else 1
                    if cost + w < dist[nr][nc]:
                        dist[nr][nc] = cost + w
                        if w == 0:
                            q.appendleft((cost, nr, nc))
                        else:
                            q.append((cost + 1, nr, nc))
        return dist[m - 1][n - 1]`,
      javascript: `class Solution {
    minCost(grid) {
        const m = grid.length, n = grid[0].length;
        const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
        const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));
        dist[0][0] = 0;
        const q = [[0, 0, 0]];
        while (q.length > 0) {
            const [cost, r, c] = q.shift();
            if (cost > dist[r][c]) continue;
            if (r === m - 1 && c === n - 1) return cost;
            for (let i = 0; i < 4; i++) {
                const [dr, dc] = dirs[i];
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                    const w = grid[r][c] === i + 1 ? 0 : 1;
                    if (cost + w < dist[nr][nc]) {
                        dist[nr][nc] = cost + w;
                        if (w === 0) {
                            q.unshift([cost, nr, nc]);
                        } else {
                            q.push([cost + 1, nr, nc]);
                        }
                    }
                }
            }
        }
        return dist[m - 1][n - 1];
    }
}`,
    },
    editorial: {
      approach: '0-1 Breadth-First Search with Double-Ended Queue.',
      algorithm: 'Edges with weight 0 pushed to front of queue; weight 1 pushed to back.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(M * N)',
      content: 'Standard 0-1 BFS on directed grid graph.',
      referenceCode: `if w == 0: q.appendleft((cost, nr, nc)) else: q.append((cost + 1, nr, nc))`,
    },
    tags: ['Breadth-First Search', 'Graph', 'Matrix', 'Heap', 'Shortest Path'],
    testCases: [
      { input: `[[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `[[1,1,3],[3,2,2],[1,1,4]]`, expectedOutput: `0`, isHidden: false, order: 1 },
      { input: `[[1,2],[4,3]]`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Count Smaller Numbers After Self Fenwick',
    slug: 'count-smaller-numbers-after-self-fenwick',
    description: `Given an integer array \`nums\`, return an integer array \`counts\` where \`counts[i]\` is the number of smaller elements to the right of \`nums[i]\`.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 10^5, -10^4 <= nums[i] <= 10^4`,
    inputFormat: `nums`,
    outputFormat: `List of smaller element counts.`,
    sampleInput: `[5,2,6,1]`,
    sampleOutput: `[2,1,1,0]`,
    points: 200,
    hints: ['Coordinate compress numbers and query rank prefix sum in Fenwick tree from right to left.'],
    codeTemplates: {
      python: `class Solution:\n    def countSmaller(self, nums: list) -> list:\n        pass`,
      javascript: `class Solution {\n    countSmaller(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def countSmaller(self, nums: list) -> list:
        sorted_vals = sorted(list(set(nums)))
        rank = {v: i + 1 for i, v in enumerate(sorted_vals)}
        tree = [0] * (len(sorted_vals) + 1)
        def update(i):
            while i < len(tree):
                tree[i] += 1
                i += i & (-i)
        def query(i):
            s = 0
            while i > 0:
                s += tree[i]
                i -= i & (-i)
            return s
        res = []
        for x in reversed(nums):
            r = rank[x]
            res.append(query(r - 1))
            update(r)
        return list(reversed(res))`,
      javascript: `class Solution {
    countSmaller(nums) {
        const sortedVals = Array.from(new Set(nums)).sort((a, b) => a - b);
        const rank = new Map();
        sortedVals.forEach((v, i) => rank.set(v, i + 1));
        const tree = Array(sortedVals.length + 1).fill(0);
        function update(i) {
            for (; i < tree.length; i += i & -i) tree[i] += 1;
        }
        function query(i) {
            let s = 0;
            for (; i > 0; i -= i & -i) s += tree[i];
            return s;
        }
        const res = [];
        for (let i = nums.length - 1; i >= 0; i--) {
            const r = rank.get(nums[i]);
            res.push(query(r - 1));
            update(r);
        }
        return res.reverse();
    }
}`,
    },
    editorial: {
      approach: 'Coordinate Compressed Fenwick Tree Suffix Sweep.',
      algorithm: 'Insert elements right-to-left into BIT and query rank prefix frequency.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      content: 'Classic rank-frequency inversion query.',
      referenceCode: `res.append(query(r - 1)); update(r)`,
    },
    tags: ['Binary Indexed Tree', 'Segment Tree', 'Divide and Conquer', 'Array'],
    testCases: [
      { input: `[5,2,6,1]`, expectedOutput: `[2,1,1,0]`, isHidden: false, order: 0 },
      { input: `[-1]`, expectedOutput: `[0]`, isHidden: false, order: 1 },
      { input: `[-1,-1]`, expectedOutput: `[0,0]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Stickers to Spell Word Exact Cover Memoized DP',
    slug: 'stickers-to-spell-word-exact-cover-memoized-dp',
    description: `We are given \`n\` different types of \`stickers\`. Each sticker has a lowercase English word on it. You would like to spell out the given string \`target\` by cutting individual letters from your collection of stickers and rearranging them. Return the minimum number of stickers that you need to spell out \`target\`. If the task is impossible, return -1.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n == stickers.length, 1 <= n <= 50, 1 <= target.length <= 15`,
    inputFormat: `stickers, target`,
    outputFormat: `Minimum stickers integer.`,
    sampleInput: `["with","example","science"], "thehat"`,
    sampleOutput: `3`,
    points: 200,
    hints: ['Represent target character requirements as a frequency string or bitmask. Use memoized DFS.'],
    codeTemplates: {
      python: `class Solution:\n    def minStickers(self, stickers: list, target: str) -> int:\n        pass`,
      javascript: `class Solution {\n    minStickers(stickers, target) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minStickers(self, stickers: list, target: str) -> int:
        import collections
        sticker_counts = [collections.Counter(s) for s in stickers]
        memo = {"": 0}
        def dfs(t):
            if t in memo: return memo[t]
            t_count = collections.Counter(t)
            res = float('inf')
            first_char = t[0]
            for sc in sticker_counts:
                if sc[first_char] == 0: continue
                remain = []
                for ch, cnt in t_count.items():
                    rem = cnt - sc[ch]
                    if rem > 0:
                        remain.append(ch * rem)
                nxt = "".join(sorted("".join(remain)))
                res = min(res, 1 + dfs(nxt))
            memo[t] = res
            return res
        ans = dfs("".join(sorted(target)))
        return ans if ans != float('inf') else -1`,
      javascript: `class Solution {
    minStickers(stickers, target) {
        const stickerCounts = stickers.map(s => {
            const m = {};
            for (const c of s) m[c] = (m[c] || 0) + 1;
            return m;
        });
        const memo = new Map();
        memo.set("", 0);
        function dfs(t) {
            if (memo.has(t)) return memo.get(t);
            const tCount = {};
            for (const c of t) tCount[c] = (tCount[c] || 0) + 1;
            let res = Infinity;
            const firstChar = t[0];
            for (const sc of stickerCounts) {
                if (!sc[firstChar]) continue;
                const remain = [];
                for (const [ch, cnt] of Object.entries(tCount)) {
                    const rem = cnt - (sc[ch] || 0);
                    if (rem > 0) remain.push(ch.repeat(rem));
                }
                const nxt = remain.join("").split("").sort().join("");
                res = Math.min(res, 1 + dfs(nxt));
            }
            memo.set(t, res);
            return res;
        }
        const sortedTarget = target.split("").sort().join("");
        const ans = dfs(sortedTarget);
        return ans !== Infinity ? ans : -1;
    }
}`,
    },
    editorial: {
      approach: 'Frequency String State Memoized Depth-First Search.',
      algorithm: 'Prune search by requiring chosen sticker to cover at least the first remaining target character.',
      timeComplexity: 'O(Stickers * 2^TargetLength)',
      spaceComplexity: 'O(2^TargetLength)',
      content: 'Standard exact cover character multiset optimization.',
      referenceCode: `if sc[first_char] == 0: continue; res = min(res, 1 + dfs(nxt))`,
    },
    tags: ['Dynamic Programming', 'Backtracking', 'Bitmask', 'Memoization'],
    testCases: [
      { input: `["with","example","science"], "thehat"`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `["notice","possible"], "basicbasic"`, expectedOutput: `-1`, isHidden: false, order: 1 },
      { input: `["a"], "a"`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Number of Music Playlists Combinatorial DP',
    slug: 'number-of-music-playlists-combinatorial-dp',
    description: `Your music player contains \`n\` different songs. You want to listen to \`goal\` songs (not necessarily different) during your trip. To avoid boredom, you will create a playlist of length \`goal\` such that: Every song is played at least once. A song can only be played again if at least \`k\` other songs have been played. Return the number of possible playlists modulo $10^9 + 7$.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= k < n <= goal <= 100`,
    inputFormat: `n, goal, k`,
    outputFormat: `Number of playlists modulo 10^9 + 7.`,
    sampleInput: `3, 3, 1`,
    sampleOutput: `6`,
    points: 200,
    hints: ['dp[i][j]: number of playlists of length i with j unique songs. dp[i][j] = dp[i-1][j-1] * (n - j + 1) + dp[i-1][j] * max(0, j - k).'],
    codeTemplates: {
      python: `class Solution:\n    def numMusicPlaylists(self, n: int, goal: int, k: int) -> int:\n        pass`,
      javascript: `class Solution {\n    numMusicPlaylists(n, goal, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def numMusicPlaylists(self, n: int, goal: int, k: int) -> int:
        MOD = 10**9 + 7
        dp = [[0] * (n + 1) for _ in range(goal + 1)]
        dp[0][0] = 1
        for i in range(1, goal + 1):
            for j in range(1, min(i, n) + 1):
                dp[i][j] = (dp[i - 1][j - 1] * (n - j + 1) + dp[i - 1][j] * max(0, j - k)) % MOD
        return dp[goal][n]`,
      javascript: `class Solution {
    numMusicPlaylists(n, goal, k) {
        const MOD = 1000000007;
        const dp = Array.from({ length: goal + 1 }, () => Array(n + 1).fill(0));
        dp[0][0] = 1;
        for (let i = 1; i <= goal; i++) {
            for (let j = 1; j <= Math.min(i, n); j++) {
                const newSong = (dp[i - 1][j - 1] * (n - j + 1)) % MOD;
                const oldSong = (dp[i - 1][j] * Math.max(0, j - k)) % MOD;
                dp[i][j] = (newSong + oldSong) % MOD;
            }
        }
        return dp[goal][n];
    }
}`,
    },
    editorial: {
      approach: 'Prefix-Length Unique-Song Count DP.',
      algorithm: 'Transitions either introduce a new unique song (n - j + 1 choices) or replay an eligible song (max(0, j - k) choices).',
      timeComplexity: 'O(Goal * N)',
      spaceComplexity: 'O(Goal * N)',
      content: 'Standard combinatorial playlist generation DP.',
      referenceCode: `dp[i][j] = (dp[i - 1][j - 1] * (n - j + 1) + dp[i - 1][j] * max(0, j - k)) % MOD`,
    },
    tags: ['Dynamic Programming', 'Math', 'Combinatorics'],
    testCases: [
      { input: `3, 3, 1`, expectedOutput: `6`, isHidden: false, order: 0 },
      { input: `2, 3, 0`, expectedOutput: `6`, isHidden: false, order: 1 },
      { input: `2, 3, 1`, expectedOutput: `2`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Freedom Trail Circular Dial Dialing DP',
    slug: 'freedom-trail-circular-dial-dialing-dp',
    description: `In the video game Fallout 4, the quest "Road to Freedom" requires players to reach a metal dial called the "Freedom Trail Ring" and use the dial to spell a specific keyword to open the door. Given a string \`ring\` of length \`n\` and a string \`key\`, return the minimum number of steps to spell all characters in the keyword.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= ring.length, key.length <= 100`,
    inputFormat: `ring, key`,
    outputFormat: `Minimum steps integer.`,
    sampleInput: `"godding", "gd"`,
    sampleOutput: `4`,
    points: 200,
    hints: ['dp[k][pos]: min steps to spell key[k:] starting with dial aligned at position pos.'],
    codeTemplates: {
      python: `class Solution:\n    def findRotateSteps(self, ring: str, key: str) -> int:\n        pass`,
      javascript: `class Solution {\n    findRotateSteps(ring, key) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findRotateSteps(self, ring: str, key: str) -> int:
        import collections
        pos = collections.defaultdict(list)
        for i, c in enumerate(ring): pos[c].append(i)
        n = len(ring)
        memo = {}
        def dp(k_idx, r_pos):
            if k_idx == len(key): return 0
            if (k_idx, r_pos) in memo: return memo[(k_idx, r_pos)]
            target = key[k_idx]
            res = float('inf')
            for next_pos in pos[target]:
                diff = abs(r_pos - next_pos)
                rot = min(diff, n - diff)
                res = min(res, rot + 1 + dp(k_idx + 1, next_pos))
            memo[(k_idx, r_pos)] = res
            return res
        return dp(0, 0)`,
      javascript: `class Solution {
    findRotateSteps(ring, key) {
        const pos = new Map();
        for (let i = 0; i < ring.length; i++) {
            const c = ring[i];
            if (!pos.has(c)) pos.set(c, []);
            pos.get(c).push(i);
        }
        const n = ring.length;
        const memo = Array.from({ length: key.length }, () => Array(n).fill(0));
        function dp(kIdx, rPos) {
            if (kIdx === key.length) return 0;
            if (memo[kIdx][rPos] !== 0) return memo[kIdx][rPos];
            const target = key[kIdx];
            let res = Infinity;
            for (const nextPos of (pos.get(target) || [])) {
                const diff = Math.abs(rPos - nextPos);
                const rot = Math.min(diff, n - diff);
                res = Math.min(res, rot + 1 + dp(kIdx + 1, nextPos));
            }
            memo[kIdx][rPos] = res;
            return res;
        }
        return dp(0, 0);
    }
}`,
    },
    editorial: {
      approach: 'Circular Distance Transition Dynamic Programming.',
      algorithm: 'Rotational cost min(diff, n - diff) evaluates shortest circular displacement.',
      timeComplexity: 'O(|Key| * |Ring|^2)',
      spaceComplexity: 'O(|Key| * |Ring|)',
      content: 'Standard circular dial key sequence DP.',
      referenceCode: `rot = min(diff, n - diff); res = min(res, rot + 1 + dp(k_idx + 1, next_pos))`,
    },
    tags: ['Dynamic Programming', 'Depth-First Search', 'String'],
    testCases: [
      { input: `"godding", "gd"`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `"godding", "godding"`, expectedOutput: `13`, isHidden: false, order: 1 },
      { input: `"ab", "ba"`, expectedOutput: `3`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Cut Off Trees for Golf Event Min Total Steps',
    slug: 'cut-off-trees-for-golf-event-min-total-steps',
    description: `You are asked to cut off all the trees in a forest for a golf event. The forest is represented as an \`m x n\` grid. You must cut down all trees in order from shortest to tallest. Return the minimum steps you need to walk to cut down all the trees. If you cannot cut up all the trees, return -1.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `m == forest.length, n == forest[i].length, 1 <= m, n <= 50`,
    inputFormat: `forest`,
    outputFormat: `Minimum steps integer.`,
    sampleInput: `[[1,2,3],[0,0,4],[7,6,5]]`,
    sampleOutput: `6`,
    points: 200,
    hints: ['Sort all tree coordinates by tree height. Run BFS between consecutive tree destinations.'],
    codeTemplates: {
      python: `class Solution:\n    def cutOffTree(self, forest: list) -> int:\n        pass`,
      javascript: `class Solution {\n    cutOffTree(forest) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def cutOffTree(self, forest: list) -> int:
        if not forest or not forest[0]: return -1
        m, n = len(forest), len(forest[0])
        trees = []
        for r in range(m):
            for c in range(n):
                if forest[r][c] > 1:
                    trees.append((forest[r][c], r, c))
        trees.sort()
        import collections
        def bfs(sr, sc, tr, tc):
            if sr == tr and sc == tc: return 0
            q = collections.deque([(sr, sc, 0)])
            vis = {(sr, sc)}
            while q:
                r, c, d = q.popleft()
                for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and (nr, nc) not in vis and forest[nr][nc] != 0:
                        if nr == tr and nc == tc: return d + 1
                        vis.add((nr, nc))
                        q.append((nr, nc, d + 1))
            return -1
        total_steps = 0
        cur_r, cur_c = 0, 0
        for _, tr, tc in trees:
            d = bfs(cur_r, cur_c, tr, tc)
            if d == -1: return -1
            total_steps += d
            cur_r, cur_c = tr, tc
        return total_steps`,
      javascript: `class Solution {
    cutOffTree(forest) {
        if (!forest || forest.length === 0) return -1;
        const m = forest.length, n = forest[0].length;
        const trees = [];
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                if (forest[r][c] > 1) trees.push([forest[r][c], r, c]);
            }
        }
        trees.sort((a, b) => a[0] - b[0]);
        function bfs(sr, sc, tr, tc) {
            if (sr === tr && sc === tc) return 0;
            const q = [[sr, sc, 0]];
            const vis = Array.from({ length: m }, () => Array(n).fill(false));
            vis[sr][sc] = true;
            while (q.length > 0) {
                const [r, c, d] = q.shift();
                const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
                for (const [dr, dc] of dirs) {
                    const nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && !vis[nr][nc] && forest[nr][nc] !== 0) {
                        if (nr === tr && nc === tc) return d + 1;
                        vis[nr][nc] = true;
                        q.push([nr, nc, d + 1]);
                    }
                }
            }
            return -1;
        }
        let total = 0, curR = 0, curC = 0;
        for (const [_, tr, tc] of trees) {
            const d = bfs(curR, curC, tr, tc);
            if (d === -1) return -1;
            total += d;
            curR = tr; curC = tc;
        }
        return total;
    }
}`,
    },
    editorial: {
      approach: 'Height Sorted Sequential BFS Routing.',
      algorithm: 'Connect consecutive tree destinations via BFS shortest paths in polynomial time.',
      timeComplexity: 'O(Trees * M * N)',
      spaceComplexity: 'O(M * N)',
      content: 'Standard sequential multi-target grid traversal.',
      referenceCode: `d = bfs(cur_r, cur_c, tr, tc); if d == -1: return -1`,
    },
    tags: ['Breadth-First Search', 'Matrix', 'Heap', 'Array'],
    testCases: [
      { input: `[[1,2,3],[0,0,4],[7,6,5]]`, expectedOutput: `6`, isHidden: false, order: 0 },
      { input: `[[1,2,3],[0,0,0],[7,6,5]]`, expectedOutput: `-1`, isHidden: false, order: 1 },
      { input: `[[2,3,4],[0,0,5],[8,7,6]]`, expectedOutput: `6`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Minimum Reverse Operations Node Reachability Segment Tree',
    slug: 'minimum-reverse-operations-node-reachability-segment-tree',
    description: `You are given an integer \`n\` and an integer \`p\` in the range \`[0, n - 1]\`. Representing an array \`arr\` of size \`n\` filled with 0s except at index \`p\` which is 1. You are also given an integer array \`banned\` and an integer \`k\`. In one operation, you can choose a subarray of size \`k\` and reverse it. Return an array \`ans\` where \`ans[i]\` is the minimum number of reverse operations needed to bring the 1 to index \`i\` (or -1 if impossible).`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 10^5, 0 <= p < n, banned.length <= n - 1, 1 <= k <= n`,
    inputFormat: `n, p, banned, k`,
    outputFormat: `Array of distance steps from p.`,
    sampleInput: `4, 0, [1,2], 4`,
    sampleOutput: `[0,-1,-1,1]`,
    points: 200,
    hints: ['A reverse of size k maps index i to 2*L + k - 1 - i. The reachable interval is [max(i-k+1, 0), min(i, n-k)]. Manage unvisited parity nodes with balanced trees or DSU.'],
    codeTemplates: {
      python: `class Solution:\n    def minReverseOperations(self, n: int, p: int, banned: list, k: int) -> list:\n        pass`,
      javascript: `class Solution {\n    minReverseOperations(n, p, banned, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minReverseOperations(self, n: int, p: int, banned: list, k: int) -> list:
        import collections, bisect
        banned_set = set(banned)
        ans = [-1] * n
        ans[p] = 0
        unvisited = [[], []]
        for i in range(n):
            if i != p and i not in banned_set:
                unvisited[i % 2].append(i)
        q = collections.deque([p])
        while q:
            cur = q.popleft()
            min_L = max(0, cur - k + 1)
            max_L = min(cur, n - k)
            low = 2 * min_L + k - 1 - cur
            high = 2 * max_L + k - 1 - cur
            parity = (cur + k - 1) % 2
            arr = unvisited[parity]
            left_idx = bisect.bisect_left(arr, low)
            right_idx = bisect.bisect_right(arr, high)
            to_remove = arr[left_idx:right_idx]
            for nxt in to_remove:
                ans[nxt] = ans[cur] + 1
                q.append(nxt)
            del arr[left_idx:right_idx]
        return ans`,
      javascript: `class Solution {
    minReverseOperations(n, p, banned, k) {
        const bannedSet = new Set(banned);
        const ans = Array(n).fill(-1);
        ans[p] = 0;
        const unvisited = [[], []];
        for (let i = 0; i < n; i++) {
            if (i !== p && !bannedSet.has(i)) {
                unvisited[i % 2].push(i);
            }
        }
        function bisectLeft(arr, val) {
            let l = 0, r = arr.length;
            while (l < r) {
                const mid = Math.floor((l + r) / 2);
                if (arr[mid] < val) l = mid + 1;
                else r = mid;
            }
            return l;
        }
        function bisectRight(arr, val) {
            let l = 0, r = arr.length;
            while (l < r) {
                const mid = Math.floor((l + r) / 2);
                if (arr[mid] <= val) l = mid + 1;
                else r = mid;
            }
            return l;
        }
        const q = [p];
        while (q.length > 0) {
            const cur = q.shift();
            const minL = Math.max(0, cur - k + 1);
            const maxL = Math.min(cur, n - k);
            const low = 2 * minL + k - 1 - cur;
            const high = 2 * maxL + k - 1 - cur;
            const parity = (cur + k - 1) % 2;
            const arr = unvisited[parity];
            const leftIdx = bisectLeft(arr, low);
            const rightIdx = bisectRight(arr, high);
            const toRemove = arr.slice(leftIdx, rightIdx);
            for (const nxt of toRemove) {
                ans[nxt] = ans[cur] + 1;
                q.push(nxt);
            }
            arr.splice(leftIdx, rightIdx - leftIdx);
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Range Deletion Parity BFS.',
      algorithm: 'Reversals preserve index parity (cur + k - 1) % 2 over interval [low, high].',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      content: 'Standard interval batch BFS deletion with parity grouping.',
      referenceCode: `low = 2 * min_L + k - 1 - cur; high = 2 * max_L + k - 1 - cur`,
    },
    tags: ['Breadth-First Search', 'Segment Tree', 'Array', 'Ordered Set'],
    testCases: [
      { input: `4, 0, [1,2], 4`, expectedOutput: `[0,-1,-1,1]`, isHidden: false, order: 0 },
      { input: `5, 0, [2,4], 3`, expectedOutput: `[0,-1,-1,-1,-1]`, isHidden: false, order: 1 },
      { input: `4, 2, [0,1,3], 1`, expectedOutput: `[-1,-1,0,-1]`, isHidden: true, order: 2 },
    ],
  },
];

writePack('pack-500-part-m.ts', 'pack500PartMDefs', problemsM);
