import { writePack, ProblemSpec } from './pack-writer-util';

// PACK M: Multi-Paradigm & Advanced Hard Algorithms (19 problems)
const packM: ProblemSpec[] = [
  {
    title: 'Longest Increasing Path in a Matrix DFS Memo',
    slug: 'longest-increasing-path-in-a-matrix-memo',
    description: 'Given an `m x n` integers matrix, return the length of the longest increasing path in matrix. From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'm == matrix.length, n == matrix[i].length\n1 <= m, n <= 200\n0 <= matrix[i][j] <= 2^31 - 1',
    inputFormat: 'matrix',
    outputFormat: 'Max length integer.',
    sampleInput: '[[9,9,4],[6,6,8],[2,1,1]]',
    sampleOutput: '4',
    points: 200,
    hints: [
      'Since paths are strictly increasing, the graph is a Directed Acyclic Graph (DAG).',
      'Use DFS with memoization dp[r][c] to find the longest path starting at (r, c).',
    ],
    codeTemplates: {
      python: `class Solution:\n    def longestIncreasingPath(self, matrix: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    longestIncreasingPath(matrix) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def longestIncreasingPath(self, matrix: list[list[int]]) -> int:
        if not matrix: return 0
        m, n = len(matrix), len(matrix[0])
        memo = [[0] * n for _ in range(m)]
        
        def dfs(r, c):
            if memo[r][c] != 0:
                return memo[r][c]
            best = 1
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:
                    best = max(best, 1 + dfs(nr, nc))
            memo[r][c] = best
            return best
            
        return max(dfs(r, c) for r in range(m) for c in range(n))`,
      javascript: `class Solution {
    longestIncreasingPath(matrix) {
        if (!matrix || matrix.length === 0) return 0;
        const m = matrix.length, n = matrix[0].length;
        const memo = Array.from({ length: m }, () => new Array(n).fill(0));
        
        function dfs(r, c) {
            if (memo[r][c] !== 0) return memo[r][c];
            let best = 1;
            const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
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
      approach: 'DAG longest path via DFS with memoization.',
      algorithm: 'Strict inequality enforces acyclicity, transforming the grid into a DAG where topological/memoized DFS yields the diameter.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(M * N)',
      content: 'Standard DAG longest path dynamic programming.',
      referenceCode: `def longestIncreasingPath(matrix: list[list[int]]) -> int: ...`,
    },
    tags: ['Dynamic Programming', 'DFS', 'Matrix', 'DAG', 'Graph'],
    testCases: [
      { input: '[[9,9,4],[6,6,8],[2,1,1]]', expectedOutput: '4', isHidden: false },
      { input: '[[3,4,5],[3,2,6],[2,2,1]]', expectedOutput: '4', isHidden: false },
      { input: '[[1]]', expectedOutput: '1', isHidden: true },
      { input: '[[1,2],[3,4]]', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Making A Large Island Component Merging',
    slug: 'making-a-large-island-dsu',
    description: 'You are given an `n x n` binary matrix `grid`. You are allowed to change at most one 0 to be 1. Return the size of the largest island in grid after applying this operation. An island is a 4-directionally connected group of 1s.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'n == grid.length == grid[i].length\n1 <= n <= 500\ngrid[i][j] is either 0 or 1.',
    inputFormat: 'grid',
    outputFormat: 'Max island area integer.',
    sampleInput: '[[1,0],[0,1]]',
    sampleOutput: '3',
    points: 200,
    hints: [
      'Color each connected component of 1s with a unique ID starting from 2 and record its area.',
      'For each 0 cell, look at its 4 neighbors, collect distinct component IDs, and calculate 1 + sum(area[id]).',
      'Return the maximum area achieved.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def largestIsland(self, grid: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    largestIsland(grid) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def largestIsland(self, grid: list[list[int]]) -> int:
        n = len(grid)
        area = {}
        color = 2
        
        def dfs(r, c, c_id):
            grid[r][c] = c_id
            cnt = 1
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 1:
                    cnt += dfs(nr, nc, c_id)
            return cnt
            
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 1:
                    area[color] = dfs(r, c, color)
                    color += 1
                    
        if not area:
            return 1
        max_size = max(area.values())
        
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 0:
                    seen = set()
                    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] > 1:
                            seen.add(grid[nr][nc])
                    cur = 1 + sum(area[c_id] for c_id in seen)
                    max_size = max(max_size, cur)
                    
        return max_size`,
      javascript: `class Solution {
    largestIsland(grid) {
        const n = grid.length;
        const area = {};
        let color = 2;
        
        function dfs(r, c, cId) {
            grid[r][c] = cId;
            let cnt = 1;
            const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 1) {
                    cnt += dfs(nr, nc, cId);
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
        
        const areaVals = Object.values(area);
        if (areaVals.length === 0) return 1;
        let maxSize = Math.max(...areaVals);
        
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                if (grid[r][c] === 0) {
                    const seen = new Set();
                    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                    for (const [dr, dc] of dirs) {
                        const nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] > 1) {
                            seen.add(grid[nr][nc]);
                        }
                    }
                    let cur = 1;
                    for (const id of seen) cur += area[id];
                    maxSize = Math.max(maxSize, cur);
                }
            }
        }
        return maxSize;
    }
}`,
    },
    editorial: {
      approach: 'Connected component indexing with 4-neighborhood merger.',
      algorithm: 'Assign ID to each component and test 0-cell bridges.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N^2)',
      content: 'Grid component labeling with constant-time bridge queries.',
      referenceCode: `def largestIsland(grid: list[list[int]]) -> int: ...`,
    },
    tags: ['Graph', 'DFS', 'BFS', 'Union Find', 'Matrix'],
    testCases: [
      { input: '[[1,0],[0,1]]', expectedOutput: '3', isHidden: false },
      { input: '[[1,1],[1,0]]', expectedOutput: '4', isHidden: false },
      { input: '[[1,1],[1,1]]', expectedOutput: '4', isHidden: true },
      { input: '[[0,0],[0,0]]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Burst Balloons Interval DP',
    slug: 'burst-balloons-interval-dp',
    description: 'You are given `n` balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array `nums`. You are asked to burst all the balloons. If you burst the i-th balloon, you get `nums[i - 1] * nums[i] * nums[i + 1]` coins. Return the maximum coins you can collect.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'n == nums.length\n1 <= n <= 300\n0 <= nums[i] <= 100',
    inputFormat: 'nums',
    outputFormat: 'Max coins integer.',
    sampleInput: '[3,1,5,8]',
    sampleOutput: '167',
    points: 200,
    hints: [
      'Pad nums with 1 at both ends: nums = [1] + nums + [1].',
      'Think backwards: which balloon k is burst LAST in the range (i, j)?',
      'dp[i][j] = max(dp[i][k] + dp[k][j] + nums[i] * nums[k] * nums[j]) for all i < k < j.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def maxCoins(self, nums: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    maxCoins(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maxCoins(self, nums: list[int]) -> int:
        A = [1] + [x for x in nums if x > 0 or len(nums) == 1] + [1]
        n = len(A)
        dp = [[0] * n for _ in range(n)]
        
        for length in range(2, n):
            for i in range(n - length):
                j = i + length
                for k in range(i + 1, j):
                    dp[i][j] = max(dp[i][j], dp[i][k] + dp[k][j] + A[i] * A[k] * A[j])
        return dp[0][n - 1]`,
      javascript: `class Solution {
    maxCoins(nums) {
        const A = [1, ...nums, 1];
        const n = A.length;
        const dp = Array.from({ length: n }, () => new Array(n).fill(0));
        
        for (let length = 2; length < n; length++) {
            for (let i = 0; i < n - length; i++) {
                const j = i + length;
                for (let k = i + 1; k < j; k++) {
                    dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k][j] + A[i] * A[k] * A[j]);
                }
            }
        }
        return dp[0][n - 1];
    }
}`,
    },
    editorial: {
      approach: 'Interval Dynamic Programming (Burst Last Balloon).',
      algorithm: 'Considering which element is destroyed last decouples the left and right subproblems cleanly.',
      timeComplexity: 'O(N^3)',
      spaceComplexity: 'O(N^2)',
      content: 'Classic interval DP with boundary padding.',
      referenceCode: `def maxCoins(nums: list[int]) -> int: ...`,
    },
    tags: ['Dynamic Programming', 'Array', 'Interval DP'],
    testCases: [
      { input: '[3,1,5,8]', expectedOutput: '167', isHidden: false },
      { input: '[1,5]', expectedOutput: '10', isHidden: false },
      { input: '[7]', expectedOutput: '7', isHidden: true },
      { input: '[1,2,3]', expectedOutput: '12', isHidden: true },
    ],
  },
  {
    title: 'Shortest Path Visiting All Nodes Bitmask BFS',
    slug: 'shortest-path-visiting-all-nodes-bitmask-bfs',
    description: 'You have an undirected, connected graph of `n` nodes labeled from 0 to n - 1. You are given an array `graph` where `graph[i]` is a list of all the nodes connected with node `i` by an edge. Return the length of the shortest path that visits every node. You may start and stop at any node, and you may revisit nodes and edges multiple times.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'n == graph.length\n1 <= n <= 12\n0 <= graph[i].length < n\ngraph is connected.',
    inputFormat: 'graph',
    outputFormat: 'Shortest path length integer.',
    sampleInput: '[[1,2,3],[0],[0],[0]]',
    sampleOutput: '4',
    points: 200,
    hints: [
      'State in BFS is (current_node, visited_bitmask).',
      'Initialize queue with all (i, 1 << i) at step 0 for all 0 <= i < n.',
      'First state reaching visited_bitmask == (1 << n) - 1 returns step.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def shortestPathLength(self, graph: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    shortestPathLength(graph) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `from collections import deque

class Solution:
    def shortestPathLength(self, graph: list[list[int]]) -> int:
        n = len(graph)
        if n == 1:
            return 0
        target = (1 << n) - 1
        q = deque([(i, 1 << i, 0) for i in range(n)])
        seen = {(i, 1 << i) for i in range(n)}
        
        while q:
            u, mask, dist = q.popleft()
            if mask == target:
                return dist
            for v in graph[u]:
                next_mask = mask | (1 << v)
                if (v, next_mask) not in seen:
                    seen.add((v, next_mask))
                    q.append((v, next_mask, dist + 1))
        return 0`,
      javascript: `class Solution {
    shortestPathLength(graph) {
        const n = graph.length;
        if (n === 1) return 0;
        const target = (1 << n) - 1;
        const q = [];
        const seen = Array.from({ length: n }, () => new Uint8Array(1 << n));
        for (let i = 0; i < n; i++) {
            q.push([i, 1 << i, 0]);
            seen[i][1 << i] = 1;
        }
        let head = 0;
        while (head < q.length) {
            const [u, mask, dist] = q[head++];
            if (mask === target) return dist;
            for (const v of graph[u]) {
                const nextMask = mask | (1 << v);
                if (!seen[v][nextMask]) {
                    seen[v][nextMask] = 1;
                    q.push([v, nextMask, dist + 1]);
                }
            }
        }
        return 0;
    }
}`,
    },
    editorial: {
      approach: 'State-space Bitmask BFS.',
      algorithm: 'Multi-source BFS across (node, mask) state space finds the shortest path visiting all vertices.',
      timeComplexity: 'O(N * 2^N)',
      spaceComplexity: 'O(N * 2^N)',
      content: 'Exact Traveling Salesperson Path traversal via unweighted state graph BFS.',
      referenceCode: `def shortestPathLength(graph: list[list[int]]) -> int: ...`,
    },
    tags: ['Graph', 'BFS', 'Bitmask', 'Dynamic Programming'],
    testCases: [
      { input: '[[1,2,3],[0],[0],[0]]', expectedOutput: '4', isHidden: false },
      { input: '[[1],[0,2,4],[1,3,4],[2],[1,2]]', expectedOutput: '4', isHidden: false },
      { input: '[[]]', expectedOutput: '0', isHidden: true },
      { input: '[[1],[0]]', expectedOutput: '1', isHidden: true },
    ],
  },
];

writePack('pack-500-part-m.ts', 'pack500PartMDefs', packM);
