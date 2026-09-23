import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack500PartMDefs: ProblemDef[] = [
  {
    "title": "Making A Large Island by Changing Single Zero",
    "slug": "making-a-large-island-by-changing-zero",
    "description": "You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1. Return the size of the largest island in grid after applying this operation. An island is a 4-directionally connected group of 1s.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 500, grid[i][j] is either 0 or 1",
    "inputFormat": "grid",
    "outputFormat": "Integer representing maximum island size.",
    "sampleInput": "[[1,0],[0,1]]",
    "sampleOutput": "3",
    "points": 200,
    "hints": [
      "Label each connected island of 1s with a unique ID and store its area. For each 0 cell, sum the areas of unique adjacent island IDs + 1."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def largestIsland(self, grid: list[list[int]]) -> int:\n        pass",
      "javascript": "class Solution {\n    largestIsland(grid) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def largestIsland(self, grid: list[list[int]]) -> int:\n        n = len(grid)\n        island_id = 2\n        area = {0: 0}\n        \n        def dfs(r, c, id_):\n            st = [(r, c)]\n            grid[r][c] = id_\n            cnt = 0\n            while st:\n                cr, cc = st.pop()\n                cnt += 1\n                for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n                    nr, nc = cr + dr, cc + dc\n                    if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 1:\n                        grid[nr][nc] = id_\n                        st.append((nr, nc))\n            return cnt\n\n        for r in range(n):\n            for c in range(n):\n                if grid[r][c] == 1:\n                    area[island_id] = dfs(r, c, island_id)\n                    island_id += 1\n\n        ans = max(area.values()) if area else 0\n        for r in range(n):\n            for c in range(n):\n                if grid[r][c] == 0:\n                    seen = set()\n                    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n                        nr, nc = r + dr, c + dc\n                        if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] > 1:\n                            seen.add(grid[nr][nc])\n                    ans = max(ans, 1 + sum(area[id_] for id_ in seen))\n        return ans",
      "javascript": "class Solution {\n    largestIsland(grid) {\n        const n = grid.length;\n        let islandId = 2;\n        const area = new Map();\n        area.set(0, 0);\n\n        function dfs(r, c, id) {\n            let count = 0;\n            const stack = [[r, c]];\n            grid[r][c] = id;\n            while (stack.length > 0) {\n                const [cr, cc] = stack.pop();\n                count++;\n                for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {\n                    const nr = cr + dr, nc = cc + dc;\n                    if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 1) {\n                        grid[nr][nc] = id;\n                        stack.push([nr, nc]);\n                    }\n                }\n            }\n            return count;\n        }\n\n        for (let r = 0; r < n; r++) {\n            for (let c = 0; c < n; c++) {\n                if (grid[r][c] === 1) {\n                    area.set(islandId, dfs(r, c, islandId));\n                    islandId++;\n                }\n            }\n        }\n\n        let maxArea = 0;\n        for (const val of area.values()) {\n            if (val > maxArea) maxArea = val;\n        }\n\n        for (let r = 0; r < n; r++) {\n            for (let c = 0; c < n; c++) {\n                if (grid[r][c] === 0) {\n                    const seen = new Set();\n                    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {\n                        const nr = r + dr, nc = c + dc;\n                        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] > 1) {\n                            seen.add(grid[nr][nc]);\n                        }\n                    }\n                    let total = 1;\n                    for (const id of seen) total += area.get(id);\n                    if (total > maxArea) maxArea = total;\n                }\n            }\n        }\n        return maxArea;\n    }\n}"
    },
    "editorial": {
      "approach": "Island ID Labeling + Component Union on 0s.",
      "algorithm": "1. Label each connected island of 1s with unique id >= 2 using DFS.\n2. Store area of each island ID in hash map.\n3. For each 0 cell, collect distinct neighbor island IDs, compute 1 + sum of their areas.\n4. Return maximum area found.",
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(N^2)",
      "content": "Optimal matrix island union query using disjoint component sizes.",
      "referenceCode": "max(ans, 1 + sum(area[id_] for id_ in seen))"
    },
    "tags": [
      "Graph",
      "BFS",
      "DFS",
      "Matrix",
      "Union Find"
    ],
    "testCases": [
      {
        "input": "[[1,0],[0,1]]",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[1,1],[1,0]]",
        "expectedOutput": "4",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1,1],[1,1]]",
        "expectedOutput": "4",
        "isHidden": false,
        "order": 2
      },
      {
        "input": "[[0,0],[0,0]]",
        "expectedOutput": "1",
        "isHidden": true,
        "order": 3
      }
    ]
  },
  {
    "title": "Swim in Rising Water Grid Elevation",
    "slug": "swim-in-rising-water-grid-elevation",
    "description": "You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j). Rainfall starts at time t = 0. At time t, the depth of water everywhere is t. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares is at most t. You start at (0, 0). What is the least time until you can reach the bottom right square (n-1, n-1)?",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "n == grid.length == grid[i].length, 1 <= n <= 50, 0 <= grid[i][j] < n^2, grid[i][j] are unique",
    "inputFormat": "grid",
    "outputFormat": "Integer representing minimum time.",
    "sampleInput": "[[0,2],[1,3]]",
    "sampleOutput": "3",
    "points": 200,
    "hints": [
      "Use Dijkstra priority queue or binary search on time t with BFS reachability."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def swimInWater(self, grid: list[list[int]]) -> int:\n        pass",
      "javascript": "class Solution {\n    swimInWater(grid) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def swimInWater(self, grid: list[list[int]]) -> int:\n        import heapq\n        n = len(grid)\n        pq = [(grid[0][0], 0, 0)]\n        visited = {(0, 0)}\n        while pq:\n            t, r, c = heapq.heappop(pq)\n            if r == n - 1 and c == n - 1:\n                return t\n            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visited:\n                    visited.add((nr, nc))\n                    heapq.heappush(pq, (max(t, grid[nr][nc]), nr, nc))\n        return 0",
      "javascript": "class Solution {\n    swimInWater(grid) {\n        const n = grid.length;\n        let low = grid[0][0], high = n * n - 1, ans = high;\n        function canReach(t) {\n            if (grid[0][0] > t) return false;\n            const visited = Array.from({ length: n }, () => Array(n).fill(false));\n            const queue = [[0, 0]];\n            visited[0][0] = true;\n            while (queue.length > 0) {\n                const [r, c] = queue.shift();\n                if (r === n - 1 && c === n - 1) return true;\n                for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {\n                    const nr = r + dr, nc = c + dc;\n                    if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] <= t) {\n                        visited[nr][nc] = true;\n                        queue.push([nr, nc]);\n                    }\n                }\n            }\n            return false;\n        }\n        while (low <= high) {\n            const mid = Math.floor((low + high) / 2);\n            if (canReach(mid)) {\n                ans = mid;\n                high = mid - 1;\n            } else {\n                low = mid + 1;\n            }\n        }\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "Dijkstra Min-Max Path or Binary Search on t.",
      "algorithm": "Binary search the answer t in [grid[0][0], n^2-1]. BFS checks if bottom-right is reachable using cells <= t.",
      "timeComplexity": "O(N^2 log(N^2))",
      "spaceComplexity": "O(N^2)",
      "content": "Min-max path problem solvable via Dijkstra / Binary search BFS.",
      "referenceCode": "heapq.heappush(pq, (max(t, grid[nr][nc]), nr, nc))"
    },
    "tags": [
      "Graph",
      "Binary Search",
      "BFS",
      "Heap",
      "Matrix"
    ],
    "testCases": [
      {
        "input": "[[0,2],[1,3]]",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]",
        "expectedOutput": "16",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[3]]",
        "expectedOutput": "3",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Super Egg Drop Dynamic Programming",
    "slug": "super-egg-drop-moves-dp",
    "description": "You are given k identical eggs and you have access to a building with n floors labeled from 1 to n. There exists a floor f (0 <= f <= n) such that any egg dropped at a floor higher than f will break, and any egg dropped at or below f will not break. What is the minimum number of moves you need to determine with certainty what the value of f is?",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= k <= 100, 1 <= n <= 10^4",
    "inputFormat": "k, n",
    "outputFormat": "Integer representing minimum moves.",
    "sampleInput": "1, 2",
    "sampleOutput": "2",
    "points": 200,
    "hints": [
      "Let dp[m][k] be the maximum number of floors we can check with m moves and k eggs. dp[m][k] = dp[m-1][k-1] + dp[m-1][k] + 1."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def superEggDrop(self, k: int, n: int) -> int:\n        pass",
      "javascript": "class Solution {\n    superEggDrop(k, n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def superEggDrop(self, k: int, n: int) -> int:\n        dp = [0] * (k + 1)\n        m = 0\n        while dp[k] < n:\n            m += 1\n            for x in range(k, 0, -1):\n                dp[x] = dp[x] + dp[x - 1] + 1\n        return m",
      "javascript": "class Solution {\n    superEggDrop(k, n) {\n        const dp = Array(k + 1).fill(0);\n        let m = 0;\n        while (dp[k] < n) {\n            m++;\n            for (let x = k; x > 0; x--) {\n                dp[x] = dp[x] + dp[x - 1] + 1;\n            }\n        }\n        return m;\n    }\n}"
    },
    "editorial": {
      "approach": "Inverse DP: Max Floors with m Moves and k Eggs.",
      "algorithm": "dp[m][x] = dp[m-1][x-1] + dp[m-1][x] + 1. Transition: egg breaks vs egg survives + current floor.",
      "timeComplexity": "O(K * M) where M <= N",
      "spaceComplexity": "O(K)",
      "content": "Transform the decision problem to counting maximum testable floors in m moves.",
      "referenceCode": "dp[x] = dp[x] + dp[x - 1] + 1"
    },
    "tags": [
      "Dynamic Programming",
      "Binary Search",
      "Math"
    ],
    "testCases": [
      {
        "input": "1, 2",
        "expectedOutput": "2",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "2, 6",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "3, 14",
        "expectedOutput": "4",
        "isHidden": false,
        "order": 2
      },
      {
        "input": "2, 100",
        "expectedOutput": "14",
        "isHidden": true,
        "order": 3
      }
    ]
  },
  {
    "title": "Strange Printer Minimum Turns Interval DP",
    "slug": "strange-printer-minimum-turns",
    "description": "There is a strange printer with the following two special requirements: On each turn, the printer can print a sequence of the same character. At each turn, the printer can print new characters starting anywhere and ending anywhere in the current sequence, overwriting existing characters. Given a string s, return the minimum number of turns the printer needs to print it.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= s.length <= 100, s consists of lowercase English letters",
    "inputFormat": "s",
    "outputFormat": "Integer representing minimum turns.",
    "sampleInput": "\"aaabbb\"",
    "sampleOutput": "2",
    "points": 200,
    "hints": [
      "Interval DP: dp[i][j] is min turns for substring s[i..j]. If s[i] == s[k], printing s[i..k] can merge turns."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def strangePrinter(self, s: str) -> int:\n        pass",
      "javascript": "class Solution {\n    strangePrinter(s) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def strangePrinter(self, s: str) -> int:\n        if not s:\n            return 0\n        filtered = []\n        for c in s:\n            if not filtered or filtered[-1] != c:\n                filtered.append(c)\n        s = \"\".join(filtered)\n        n = len(s)\n        memo = {}\n        def dp(i, j):\n            if i >= j:\n                return 1 if i == j else 0\n            if (i, j) in memo:\n                return memo[(i, j)]\n            res = dp(i, j - 1) + 1\n            for k in range(i, j):\n                if s[k] == s[j]:\n                    res = min(res, dp(i, k) + (dp(k + 1, j - 1) if k + 1 <= j - 1 else 0))\n            memo[(i, j)] = res\n            return res\n        return dp(0, n - 1)",
      "javascript": "class Solution {\n    strangePrinter(s) {\n        if (!s) return 0;\n        let str = '';\n        for (let i = 0; i < s.length; i++) {\n            if (i === 0 || s[i] !== s[i - 1]) str += s[i];\n        }\n        const n = str.length;\n        const dp = Array.from({ length: n }, () => Array(n).fill(0));\n        for (let i = 0; i < n; i++) dp[i][i] = 1;\n        for (let len = 2; len <= n; len++) {\n            for (let i = 0; i <= n - len; i++) {\n                const j = i + len - 1;\n                dp[i][j] = dp[i][j - 1] + 1;\n                for (let k = i; k < j; k++) {\n                    if (str[k] === str[j]) {\n                        const cost = dp[i][k] + (k + 1 <= j - 1 ? dp[k + 1][j - 1] : 0);\n                        if (cost < dp[i][j]) dp[i][j] = cost;\n                    }\n                }\n            }\n        }\n        return dp[0][n - 1];\n    }\n}"
    },
    "editorial": {
      "approach": "Interval Dynamic Programming.",
      "algorithm": "Base case dp[i][i] = 1. If str[k] == str[j], we can print character s[j] at the same time as s[k], saving turns: dp[i][j] = min(dp[i][k] + dp[k+1][j-1]).",
      "timeComplexity": "O(N^3)",
      "spaceComplexity": "O(N^2)",
      "content": "Classic interval DP with substring character grouping.",
      "referenceCode": "dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j-1])"
    },
    "tags": [
      "Dynamic Programming",
      "String"
    ],
    "testCases": [
      {
        "input": "\"aaabbb\"",
        "expectedOutput": "2",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"aba\"",
        "expectedOutput": "2",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"leetcode\"",
        "expectedOutput": "6",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Shortest Path Visiting All Nodes Bitmask BFS",
    "slug": "shortest-path-visiting-all-nodes-bitmask",
    "description": "You have an undirected, connected graph of n nodes labeled 0 to n - 1. You are given an array graph where graph[i] is a list of all the nodes adjacent to node i. Return the length of the shortest path that visits every node. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 12, 0 <= graph[i].length < n, graph is connected",
    "inputFormat": "graph",
    "outputFormat": "Integer representing shortest path length.",
    "sampleInput": "[[1,2,3],[0],[0],[0]]",
    "sampleOutput": "4",
    "points": 200,
    "hints": [
      "State is (node, mask_of_visited_nodes). Use multi-source BFS starting from each node at step 0."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def shortestPathLength(self, graph: list[list[int]]) -> int:\n        pass",
      "javascript": "class Solution {\n    shortestPathLength(graph) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def shortestPathLength(self, graph: list[list[int]]) -> int:\n        n = len(graph)\n        if n == 1:\n            return 0\n        from collections import deque\n        target = (1 << n) - 1\n        queue = deque()\n        visited = set()\n        for i in range(n):\n            mask = 1 << i\n            queue.append((i, mask, 0))\n            visited.add((i, mask))\n        while queue:\n            node, mask, dist = queue.popleft()\n            if mask == target:\n                return dist\n            for neighbor in graph[node]:\n                next_mask = mask | (1 << neighbor)\n                if (neighbor, next_mask) not in visited:\n                    visited.add((neighbor, next_mask))\n                    queue.append((neighbor, next_mask, dist + 1))\n        return 0",
      "javascript": "class Solution {\n    shortestPathLength(graph) {\n        const n = graph.length;\n        if (n === 1) return 0;\n        const target = (1 << n) - 1;\n        const visited = Array.from({ length: n }, () => Array(1 << n).fill(false));\n        const queue = [];\n        for (let i = 0; i < n; i++) {\n            const mask = 1 << i;\n            queue.push([i, mask, 0]);\n            visited[i][mask] = true;\n        }\n        let head = 0;\n        while (head < queue.length) {\n            const [node, mask, dist] = queue[head++];\n            if (mask === target) return dist;\n            for (const neighbor of graph[node]) {\n                const nextMask = mask | (1 << neighbor);\n                if (!visited[neighbor][nextMask]) {\n                    visited[neighbor][nextMask] = true;\n                    queue.push([neighbor, nextMask, dist + 1]);\n                }\n            }\n        }\n        return 0;\n    }\n}"
    },
    "editorial": {
      "approach": "Multi-Source State Space BFS with Bitmask.",
      "algorithm": "State (u, mask) tracks current node u and set of visited nodes. BFS ensures minimum steps.",
      "timeComplexity": "O(N * 2^N)",
      "spaceComplexity": "O(N * 2^N)",
      "content": "Shortest path on state expansion graph with 2^N bitmask states.",
      "referenceCode": "next_mask = mask | (1 << neighbor)"
    },
    "tags": [
      "Graph",
      "BFS",
      "Bit Manipulation",
      "Bitmask"
    ],
    "testCases": [
      {
        "input": "[[1,2,3],[0],[0],[0]]",
        "expectedOutput": "4",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[1],[0,2,4],[1,3,4],[2],[1,2]]",
        "expectedOutput": "4",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[]]",
        "expectedOutput": "0",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Find Shortest Superstring TSP Bitmask DP",
    "slug": "find-shortest-superstring-tsp-dp",
    "description": "Given an array of strings words, return the smallest string that contains each word in words as a substring. If there are multiple valid strings of the smallest length, return any of them. You may assume that no string in words is a substring of another string.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= words.length <= 12, 1 <= words[i].length <= 20, words[i] consists of lowercase English letters, all words are unique",
    "inputFormat": "words",
    "outputFormat": "String representing the shortest superstring.",
    "sampleInput": "[\"alex\",\"loves\",\"leetcode\"]",
    "sampleOutput": "\"alexlovesleetcode\"",
    "points": 200,
    "hints": [
      "Calculate pairwise overlap between all words. Frame as TSP (Traveling Salesperson Problem) on directed graph with Bitmask DP."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def shortestSuperstring(self, words: list[str]) -> str:\n        pass",
      "javascript": "class Solution {\n    shortestSuperstring(words) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def shortestSuperstring(self, words: list[str]) -> str:\n        n = len(words)\n        overlap = [[0] * n for _ in range(n)]\n        for i in range(n):\n            for j in range(n):\n                if i != j:\n                    w1, w2 = words[i], words[j]\n                    for k in range(min(len(w1), len(w2)), 0, -1):\n                        if w1[-k:] == w2[:k]:\n                            overlap[i][j] = k\n                            break\n        \n        dp = [[0] * n for _ in range(1 << n)]\n        parent = [[-1] * n for _ in range(1 << n)]\n        \n        for mask in range(1, 1 << n):\n            for j in range(n):\n                if not (mask & (1 << j)):\n                    continue\n                prev_mask = mask ^ (1 << j)\n                if prev_mask == 0:\n                    continue\n                for i in range(n):\n                    if prev_mask & (1 << i):\n                        val = dp[prev_mask][i] + overlap[i][j]\n                        if val > dp[mask][j]:\n                            dp[mask][j] = val\n                            parent[mask][j] = i\n        \n        last = max(range(n), key=lambda x: dp[(1 << n) - 1][x])\n        curr_mask = (1 << n) - 1\n        path = []\n        while last != -1:\n            path.append(last)\n            prev = parent[curr_mask][last]\n            curr_mask ^= (1 << last)\n            last = prev\n        path.reverse()\n        \n        res = words[path[0]]\n        for i in range(1, len(path)):\n            u, v = path[i - 1], path[i]\n            k = overlap[u][v]\n            res += words[v][k:]\n        return res",
      "javascript": "class Solution {\n    shortestSuperstring(words) {\n        const n = words.length;\n        const overlap = Array.from({ length: n }, () => Array(n).fill(0));\n        for (let i = 0; i < n; i++) {\n            for (let j = 0; j < n; j++) {\n                if (i !== j) {\n                    const w1 = words[i], w2 = words[j];\n                    for (let k = Math.min(w1.length, w2.length); k > 0; k--) {\n                        if (w1.slice(-k) === w2.slice(0, k)) {\n                            overlap[i][j] = k;\n                            break;\n                        }\n                    }\n                }\n            }\n        }\n\n        const dp = Array.from({ length: 1 << n }, () => Array(n).fill(0));\n        const parent = Array.from({ length: 1 << n }, () => Array(n).fill(-1));\n\n        for (let mask = 1; mask < (1 << n); mask++) {\n            for (let j = 0; j < n; j++) {\n                if (!(mask & (1 << j))) continue;\n                const prevMask = mask ^ (1 << j);\n                if (prevMask === 0) continue;\n                for (let i = 0; i < n; i++) {\n                    if (prevMask & (1 << i)) {\n                        const val = dp[prevMask][i] + overlap[i][j];\n                        if (val > dp[mask][j]) {\n                            dp[mask][j] = val;\n                            parent[mask][j] = i;\n                        }\n                    }\n                }\n            }\n        }\n\n        let bestLast = 0, maxVal = -1;\n        const fullMask = (1 << n) - 1;\n        for (let i = 0; i < n; i++) {\n            if (dp[fullMask][i] > maxVal) {\n                maxVal = dp[fullMask][i];\n                bestLast = i;\n            }\n        }\n\n        const path = [];\n        let currMask = fullMask;\n        let last = bestLast;\n        while (last !== -1) {\n            path.push(last);\n            const prev = parent[currMask][last];\n            currMask ^= (1 << last);\n            last = prev;\n        }\n        path.reverse();\n\n        let res = words[path[0]];\n        for (let i = 1; i < path.length; i++) {\n            const u = path[i - 1], v = path[i];\n            const k = overlap[u][v];\n            res += words[v].slice(k);\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Traveling Salesperson Problem Bitmask DP.",
      "algorithm": "Precompute suffix-prefix overlap matrix. DP state dp[mask][i] = max total overlap ending at word i. Reconstruct string from optimal parent path.",
      "timeComplexity": "O(N^2 * 2^N + N^2 * L)",
      "spaceComplexity": "O(N * 2^N)",
      "content": "Exact shortest superstring reduction to maximum weight Hamiltonian path.",
      "referenceCode": "dp[mask][j] = dp[prev_mask][i] + overlap[i][j]"
    },
    "tags": [
      "Dynamic Programming",
      "Bitmask",
      "String",
      "Graph"
    ],
    "testCases": [
      {
        "input": "[\"alex\",\"loves\",\"leetcode\"]",
        "expectedOutput": "\"alexlovesleetcode\"",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[\"catg\",\"ctaagt\",\"gcta\",\"ttca\",\"atgcatc\"]",
        "expectedOutput": "\"gctaagttcatgcatc\"",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[\"a\"]",
        "expectedOutput": "\"a\"",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Minimum Cost to Make at Least One Valid Path in a Grid",
    "slug": "minimum-cost-to-make-valid-path-grid",
    "description": "Given an m x n grid. Each cell has a sign pointing to the next cell: 1 (right), 2 (left), 3 (down), 4 (up). You start at (0, 0) and want to reach (m-1, n-1). You can change the sign on a cell with cost 1. Return the minimum cost to make at least one valid path from the top-left to the bottom-right.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "m == grid.length, n == grid[i].length, 1 <= m, n <= 100, 1 <= grid[i][j] <= 4",
    "inputFormat": "grid",
    "outputFormat": "Integer representing minimum cost.",
    "sampleInput": "[[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]",
    "sampleOutput": "3",
    "points": 200,
    "hints": [
      "Model as graph where edge weight is 0 if moving in sign direction, 1 otherwise. Use 0-1 BFS with deque."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def minCost(self, grid: list[list[int]]) -> int:\n        pass",
      "javascript": "class Solution {\n    minCost(grid) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def minCost(self, grid: list[list[int]]) -> int:\n        from collections import deque\n        m, n = len(grid), len(grid[0])\n        dist = [[float('inf')] * n for _ in range(m)]\n        dist[0][0] = 0\n        dq = deque([(0, 0, 0)])\n        dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]\n        \n        while dq:\n            d, r, c = dq.popleft()\n            if d > dist[r][c]:\n                continue\n            if r == m - 1 and c == n - 1:\n                return d\n            sign = grid[r][c]\n            for i, (dr, dc) in enumerate(dirs, 1):\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < m and 0 <= nc < n:\n                    cost = 0 if i == sign else 1\n                    if d + cost < dist[nr][nc]:\n                        dist[nr][nc] = d + cost\n                        if cost == 0:\n                            dq.appendleft((d + cost, nr, nc))\n                        else:\n                            dq.append((d + cost, nr, nc))\n        return dist[m - 1][n - 1]",
      "javascript": "class Solution {\n    minCost(grid) {\n        const m = grid.length, n = grid[0].length;\n        const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));\n        dist[0][0] = 0;\n        const deque = [[0, 0, 0]];\n        const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];\n\n        while (deque.length > 0) {\n            const [d, r, c] = deque.shift();\n            if (d > dist[r][c]) continue;\n            if (r === m - 1 && c === n - 1) return d;\n            const sign = grid[r][c];\n            for (let i = 1; i <= 4; i++) {\n                const [dr, dc] = dirs[i - 1];\n                const nr = r + dr, nc = c + dc;\n                if (nr >= 0 && nr < m && nc >= 0 && nc < n) {\n                    const cost = (i === sign ? 0 : 1);\n                    if (d + cost < dist[nr][nc]) {\n                        dist[nr][nc] = d + cost;\n                        if (cost === 0) {\n                            deque.unshift([d + cost, nr, nc]);\n                        } else {\n                            deque.push([d + cost, nr, nc]);\n                        }\n                    }\n                }\n            }\n        }\n        return dist[m - 1][n - 1];\n    }\n}"
    },
    "editorial": {
      "approach": "0-1 BFS Shortest Path with Deque.",
      "algorithm": "Transitions with cost 0 are pushed to front of deque; transitions with cost 1 pushed to back.",
      "timeComplexity": "O(M * N)",
      "spaceComplexity": "O(M * N)",
      "content": "Optimal 0-1 BFS on 4-directional directional grid graph.",
      "referenceCode": "dq.appendleft((d, nr, nc)) if cost == 0 else dq.append((d + 1, nr, nc))"
    },
    "tags": [
      "Graph",
      "BFS",
      "Matrix",
      "Shortest Path"
    ],
    "testCases": [
      {
        "input": "[[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[1,1,3],[3,2,2],[1,1,4]]",
        "expectedOutput": "0",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1,2],[4,3]]",
        "expectedOutput": "1",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Count of Smaller Numbers After Self Fenwick Tree",
    "slug": "count-of-smaller-numbers-after-self-fenwick",
    "description": "Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 10^5, -10^4 <= nums[i] <= 10^4",
    "inputFormat": "nums",
    "outputFormat": "List of counts for each index.",
    "sampleInput": "[5,2,6,1]",
    "sampleOutput": "[2,1,1,0]",
    "points": 200,
    "hints": [
      "Coordinate compress unique values, traverse from right to left, query prefix sum in Fenwick tree / BIT, then add 1 to the element position."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def countSmaller(self, nums: list[int]) -> list[int]:\n        pass",
      "javascript": "class Solution {\n    countSmaller(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def countSmaller(self, nums: list[int]) -> list[int]:\n        sorted_unique = sorted(set(nums))\n        rank = {val: i + 1 for i, val in enumerate(sorted_unique)}\n        n_ranks = len(sorted_unique)\n        bit = [0] * (n_ranks + 1)\n        \n        def update(i, delta):\n            while i <= n_ranks:\n                bit[i] += delta\n                i += i & (-i)\n                \n        def query(i):\n            s = 0\n            while i > 0:\n                s += bit[i]\n                i -= i & (-i)\n            return s\n            \n        res = []\n        for x in reversed(nums):\n            r = rank[x]\n            res.append(query(r - 1))\n            update(r, 1)\n        return res[::-1]",
      "javascript": "class Solution {\n    countSmaller(nums) {\n        const sortedUnique = Array.from(new Set(nums)).sort((a, b) => a - b);\n        const rank = new Map();\n        sortedUnique.forEach((val, i) => rank.set(val, i + 1));\n        const nRanks = sortedUnique.length;\n        const bit = Array(nRanks + 1).fill(0);\n\n        function update(i, delta) {\n            while (i <= nRanks) {\n                bit[i] += delta;\n                i += i & (-i);\n            }\n        }\n\n        function query(i) {\n            let s = 0;\n            while (i > 0) {\n                s += bit[i];\n                i -= i & (-i);\n            }\n            return s;\n        }\n\n        const res = [];\n        for (let i = nums.length - 1; i >= 0; i--) {\n            const r = rank.get(nums[i]);\n            res.push(query(r - 1));\n            update(r, 1);\n        }\n        res.reverse();\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Coordinate Compression + Binary Indexed Tree (Fenwick).",
      "algorithm": "Map elements to ranks [1..U]. Traverse array backwards, query BIT for count of elements with rank < current rank, then insert current element rank into BIT.",
      "timeComplexity": "O(N log N)",
      "spaceComplexity": "O(N)",
      "content": "Standard inversion query technique using Fenwick BIT.",
      "referenceCode": "res.append(query(r - 1)); update(r, 1)"
    },
    "tags": [
      "Binary Indexed Tree",
      "Segment Tree",
      "Divide and Conquer",
      "Array"
    ],
    "testCases": [
      {
        "input": "[5,2,6,1]",
        "expectedOutput": "[2,1,1,0]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[-1]",
        "expectedOutput": "[0]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[-1,-1]",
        "expectedOutput": "[0,0]",
        "isHidden": false,
        "order": 2
      },
      {
        "input": "[1,2,3,4,5]",
        "expectedOutput": "[0,0,0,0,0]",
        "isHidden": true,
        "order": 3
      }
    ]
  },
  {
    "title": "Stickers to Spell Word Memoized Search",
    "slug": "stickers-to-spell-word-memo-bfs",
    "description": "We are given n different types of stickers. Each sticker has a lowercase English word on it. You would like to spell out the given target string by cutting out individual letters from your stickers. Return the minimum number of stickers that you need to spell out target. If the task is impossible, return -1.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= stickers.length <= 50, 1 <= stickers[i].length <= 10, 1 <= target.length <= 15",
    "inputFormat": "stickers, target",
    "outputFormat": "Integer representing minimum stickers needed.",
    "sampleInput": "[\"with\",\"example\",\"science\"], \"thehat\"",
    "sampleOutput": "3",
    "points": 200,
    "hints": [
      "Use memoized DFS with sorted remaining target characters as state key."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def minStickers(self, stickers: list[str], target: str) -> int:\n        pass",
      "javascript": "class Solution {\n    minStickers(stickers, target) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def minStickers(self, stickers: list[str], target: str) -> int:\n        import collections\n        target_counts = collections.Counter(target)\n        sticker_counts = []\n        for s in stickers:\n            c = collections.Counter(s)\n            filtered = {ch: count for ch, count in c.items() if ch in target_counts}\n            if filtered:\n                sticker_counts.append(filtered)\n        \n        memo = {\"\": 0}\n        def dfs(t_str):\n            if t_str in memo:\n                return memo[t_str]\n            res = float('inf')\n            t_count = collections.Counter(t_str)\n            first_char = t_str[0]\n            for s_count in sticker_counts:\n                if first_char not in s_count:\n                    continue\n                rem = []\n                for ch, cnt in t_count.items():\n                    needed = cnt - s_count.get(ch, 0)\n                    if needed > 0:\n                        rem.extend([ch] * needed)\n                rem_str = \"\".join(sorted(rem))\n                sub = dfs(rem_str)\n                if sub != -1:\n                    res = min(res, 1 + sub)\n            memo[t_str] = res if res != float('inf') else -1\n            return memo[t_str]\n\n        target_sorted = \"\".join(sorted(target))\n        return dfs(target_sorted)",
      "javascript": "class Solution {\n    minStickers(stickers, target) {\n        const targetSorted = target.split('').sort().join('');\n        const memo = new Map();\n        memo.set('', 0);\n\n        function dfs(tStr) {\n            if (memo.has(tStr)) return memo.get(tStr);\n            let res = Infinity;\n            const firstChar = tStr[0];\n\n            for (const st of stickers) {\n                if (!st.includes(firstChar)) continue;\n                let rem = tStr;\n                for (const ch of st) {\n                    const idx = rem.indexOf(ch);\n                    if (idx !== -1) {\n                        rem = rem.slice(0, idx) + rem.slice(idx + 1);\n                    }\n                }\n                const sub = dfs(rem);\n                if (sub !== -1) {\n                    res = Math.min(res, 1 + sub);\n                }\n            }\n            const ans = (res === Infinity ? -1 : res);\n            memo.set(tStr, ans);\n            return ans;\n        }\n\n        return dfs(targetSorted);\n    }\n}"
    },
    "editorial": {
      "approach": "Memoized DFS with Branch Pruning.",
      "algorithm": "Represent remainder string in canonical sorted order. Branch only on stickers that provide the first character to avoid symmetric duplicate states.",
      "timeComplexity": "O(2^|Target| * Stickers)",
      "spaceComplexity": "O(2^|Target|)",
      "content": "Target character elimination with branch bounding.",
      "referenceCode": "if first_char not in s_count: continue"
    },
    "tags": [
      "Dynamic Programming",
      "Backtracking",
      "Bitmask",
      "Memoization"
    ],
    "testCases": [
      {
        "input": "[\"with\",\"example\",\"science\"], \"thehat\"",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[\"notice\",\"possible\"], \"basicbasic\"",
        "expectedOutput": "-1",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[\"a\",\"b\",\"c\"], \"abc\"",
        "expectedOutput": "3",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Number of Music Playlists Combinatorics DP",
    "slug": "number-of-music-playlists-combinatorics",
    "description": "Your music player contains n different songs. You want to listen to goal songs during your trip. To avoid boredom, you will create a playlist of length goal such that: Every song is played at least once. A song can only be played again if at least k other songs have been played. Return the number of possible playlists modulo 10^9 + 7.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "0 <= k < n <= goal <= 100",
    "inputFormat": "n, goal, k",
    "outputFormat": "Integer result modulo 10^9 + 7.",
    "sampleInput": "3, 3, 1",
    "sampleOutput": "6",
    "points": 200,
    "hints": [
      "dp[i][j] is number of valid playlists of length i with j unique songs."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def numMusicPlaylists(self, n: int, goal: int, k: int) -> int:\n        pass",
      "javascript": "class Solution {\n    numMusicPlaylists(n, goal, k) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def numMusicPlaylists(self, n: int, goal: int, k: int) -> int:\n        MOD = 10**9 + 7\n        dp = [[0] * (n + 1) for _ in range(goal + 1)]\n        dp[0][0] = 1\n        for i in range(1, goal + 1):\n            for j in range(1, min(i, n) + 1):\n                dp[i][j] = (dp[i][j] + dp[i - 1][j - 1] * (n - j + 1)) % MOD\n                if j > k:\n                    dp[i][j] = (dp[i][j] + dp[i - 1][j] * (j - k)) % MOD\n        return dp[goal][n]",
      "javascript": "class Solution {\n    numMusicPlaylists(n, goal, k) {\n        const MOD = 1000000007n;\n        const dp = Array.from({ length: goal + 1 }, () => Array(n + 1).fill(0n));\n        dp[0][0] = 1n;\n        for (let i = 1; i <= goal; i++) {\n            for (let j = 1; j <= Math.min(i, n); j++) {\n                dp[i][j] = (dp[i][j] + dp[i - 1][j - 1] * BigInt(n - j + 1)) % MOD;\n                if (j > k) {\n                    dp[i][j] = (dp[i][j] + dp[i - 1][j] * BigInt(j - k)) % MOD;\n                }\n            }\n        }\n        return Number(dp[goal][n]);\n    }\n}"
    },
    "editorial": {
      "approach": "2D Dynamic Programming on (Length, Unique Songs).",
      "algorithm": "Two choices at step i with j unique songs: 1) Play a new song: dp[i-1][j-1] * (N - (j-1)). 2) Replay old song: dp[i-1][j] * (j - K) if j > K.",
      "timeComplexity": "O(Goal * N)",
      "spaceComplexity": "O(Goal * N)",
      "content": "Combinatorial DP counting playlists with replay separation constraints.",
      "referenceCode": "dp[i][j] = dp[i-1][j-1]*(n-j+1) + dp[i-1][j]*max(0, j-k)"
    },
    "tags": [
      "Dynamic Programming",
      "Math",
      "Combinatorics"
    ],
    "testCases": [
      {
        "input": "3, 3, 1",
        "expectedOutput": "6",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "2, 3, 0",
        "expectedOutput": "6",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "2, 3, 1",
        "expectedOutput": "2",
        "isHidden": false,
        "order": 2
      },
      {
        "input": "10, 20, 5",
        "expectedOutput": "313886574",
        "isHidden": true,
        "order": 3
      }
    ]
  },
  {
    "title": "Freedom Trail Ring Dial Minimum Steps",
    "slug": "freedom-trail-dial-dp",
    "description": "In the video game Fallout 4, the quest \"Road to Freedom\" requires players to reach a metal dial called the \"Freedom Trail Ring\" and use the dial to spell a specific keyword. Given a string ring of length n and a string key of length m, return the minimum number of steps to spell all characters in key. A step includes rotating the dial clockwise or counterclockwise by one position, or pressing the center button to spell the current character.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= ring.length, key.length <= 100, ring and key consist of lowercase English letters, key characters always exist in ring",
    "inputFormat": "ring, key",
    "outputFormat": "Integer representing minimum steps.",
    "sampleInput": "\"godding\", \"gd\"",
    "sampleOutput": "4",
    "points": 200,
    "hints": [
      "DP state: min steps to spell key[i:] with ring currently at index j."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def findRotateSteps(self, ring: str, key: str) -> int:\n        pass",
      "javascript": "class Solution {\n    findRotateSteps(ring, key) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def findRotateSteps(self, ring: str, key: str) -> int:\n        import collections\n        n = len(ring)\n        pos = collections.defaultdict(list)\n        for i, c in enumerate(ring):\n            pos[c].append(i)\n            \n        memo = {}\n        def dp(k_idx, r_idx):\n            if k_idx == len(key):\n                return 0\n            if (k_idx, r_idx) in memo:\n                return memo[(k_idx, r_idx)]\n            ch = key[k_idx]\n            res = float('inf')\n            for next_pos in pos[ch]:\n                diff = abs(next_pos - r_idx)\n                rot = min(diff, n - diff)\n                res = min(res, rot + 1 + dp(k_idx + 1, next_pos))\n            memo[(k_idx, r_idx)] = res\n            return res\n            \n        return dp(0, 0)",
      "javascript": "class Solution {\n    findRotateSteps(ring, key) {\n        const n = ring.length;\n        const pos = new Map();\n        for (let i = 0; i < n; i++) {\n            if (!pos.has(ring[i])) pos.set(ring[i], []);\n            pos.get(ring[i]).push(i);\n        }\n\n        const memo = new Map();\n        function dp(kIdx, rIdx) {\n            if (kIdx === key.length) return 0;\n            const keyState = kIdx + ',' + rIdx;\n            if (memo.has(keyState)) return memo.get(keyState);\n\n            const ch = key[kIdx];\n            let minSteps = Infinity;\n            for (const nextPos of (pos.get(ch) || [])) {\n                const diff = Math.abs(nextPos - rIdx);\n                const rot = Math.min(diff, n - diff);\n                const steps = rot + 1 + dp(kIdx + 1, nextPos);\n                if (steps < minSteps) minSteps = steps;\n            }\n            memo.set(keyState, minSteps);\n            return minSteps;\n        }\n\n        return dp(0, 0);\n    }\n}"
    },
    "editorial": {
      "approach": "Memoized Search on Ring Character Positions.",
      "algorithm": "Rotate distance min(|j - i|, N - |j - i|) + 1 button press. Memoize on (key_index, current_ring_index).",
      "timeComplexity": "O(M * N)",
      "spaceComplexity": "O(M * N)",
      "content": "Shortest cyclic rotation traversal DP.",
      "referenceCode": "min(abs(p - r), n - abs(p - r)) + 1 + dp(k + 1, p)"
    },
    "tags": [
      "Dynamic Programming",
      "String",
      "Breadth-First Search"
    ],
    "testCases": [
      {
        "input": "\"godding\", \"gd\"",
        "expectedOutput": "4",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"godding\", \"godding\"",
        "expectedOutput": "13",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"ababcab\", \"acba\"",
        "expectedOutput": "9",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Cut Off Trees for Golf Event",
    "slug": "cut-off-trees-for-golf-event",
    "description": "You are asked to cut off all the trees in a forest for a golf event. The forest is represented as an m x n matrix: 0 is an obstacle, 1 is an empty ground, and any value > 1 is a tree of that height. You must cut down trees in order of their height, from shortest to tallest. Return the minimum steps you need to cut off all trees, or -1 if impossible.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "m == forest.length, n == forest[i].length, 1 <= m, n <= 50, 0 <= forest[i][j] <= 10^9, tree heights are unique",
    "inputFormat": "forest",
    "outputFormat": "Integer representing total steps or -1.",
    "sampleInput": "[[1,2,3],[0,0,4],[7,6,5]]",
    "sampleOutput": "6",
    "points": 200,
    "hints": [
      "Sort all trees by height, then compute BFS shortest path sequentially between consecutive trees."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def cutOffTree(self, forest: list[list[int]]) -> int:\n        pass",
      "javascript": "class Solution {\n    cutOffTree(forest) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def cutOffTree(self, forest: list[list[int]]) -> int:\n        from collections import deque\n        m, n = len(forest), len(forest[0])\n        trees = []\n        for r in range(m):\n            for c in range(n):\n                if forest[r][c] > 1:\n                    trees.append((forest[r][c], r, c))\n        trees.sort()\n        \n        def bfs(sr, sc, tr, tc):\n            if sr == tr and sc == tc:\n                return 0\n            dq = deque([(sr, sc, 0)])\n            visited = {(sr, sc)}\n            while dq:\n                r, c, d = dq.popleft()\n                for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n                    nr, nc = r + dr, c + dc\n                    if 0 <= nr < m and 0 <= nc < n and forest[nr][nc] != 0 and (nr, nc) not in visited:\n                        if nr == tr and nc == tc:\n                            return d + 1\n                        visited.add((nr, nc))\n                        dq.append((nr, nc, d + 1))\n            return -1\n            \n        cur_r, cur_c = 0, 0\n        total_steps = 0\n        for h, tr, tc in trees:\n            steps = bfs(cur_r, cur_c, tr, tc)\n            if steps == -1:\n                return -1\n            total_steps += steps\n            cur_r, cur_c = tr, tc\n        return total_steps",
      "javascript": "class Solution {\n    cutOffTree(forest) {\n        const m = forest.length, n = forest[0].length;\n        const trees = [];\n        for (let r = 0; r < m; r++) {\n            for (let c = 0; c < n; c++) {\n                if (forest[r][c] > 1) {\n                    trees.push([forest[r][c], r, c]);\n                }\n            }\n        }\n        trees.sort((a, b) => a[0] - b[0]);\n\n        function bfs(sr, sc, tr, tc) {\n            if (sr === tr && sc === tc) return 0;\n            const visited = Array.from({ length: m }, () => Array(n).fill(false));\n            const queue = [[sr, sc, 0]];\n            visited[sr][sc] = true;\n            let head = 0;\n            while (head < queue.length) {\n                const [r, c, d] = queue[head++];\n                for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {\n                    const nr = r + dr, nc = c + dc;\n                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && forest[nr][nc] !== 0 && !visited[nr][nc]) {\n                        if (nr === tr && nc === tc) return d + 1;\n                        visited[nr][nc] = true;\n                        queue.push([nr, nc, d + 1]);\n                    }\n                }\n            }\n            return -1;\n        }\n\n        let curR = 0, curC = 0, totalSteps = 0;\n        for (const [h, tr, tc] of trees) {\n            const steps = bfs(curR, curC, tr, tc);\n            if (steps === -1) return -1;\n            totalSteps += steps;\n            curR = tr;\n            curC = tc;\n        }\n        return totalSteps;\n    }\n}"
    },
    "editorial": {
      "approach": "Sorted Waypoints + Consecutive Point-to-Point BFS.",
      "algorithm": "Sort all trees by height. Run BFS from current position to target tree coordinates. Sum all path distances.",
      "timeComplexity": "O(T * M * N) where T <= M * N",
      "spaceComplexity": "O(M * N)",
      "content": "Sequential waypoint routing on obstacle grid.",
      "referenceCode": "total_steps += bfs(cur_r, cur_c, tr, tc)"
    },
    "tags": [
      "Graph",
      "BFS",
      "Matrix",
      "Shortest Path"
    ],
    "testCases": [
      {
        "input": "[[1,2,3],[0,0,4],[7,6,5]]",
        "expectedOutput": "6",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[1,2,3],[0,0,0],[7,6,5]]",
        "expectedOutput": "-1",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[2,3,4],[0,0,5],[8,7,6]]",
        "expectedOutput": "6",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Minimum Reverse Operations Parity Sets BFS",
    "slug": "minimum-reverse-operations-set-bfs",
    "description": "You are given an integer n and an integer p in the range [0, n - 1]. Represent an array arr of length n consisting of zeros with a single 1 at index p. In one operation, you can choose any subarray of length k and reverse it. You are also given an integer array banned containing indices that cannot contain 1 at any time. Return an array ans of size n where ans[i] is the minimum number of operations to bring the 1 to index i, or -1 if impossible.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 10^5, 0 <= p < n, 1 <= k <= n, 0 <= banned.length < n",
    "inputFormat": "n, p, banned, k",
    "outputFormat": "List of minimum operations for each index 0..n-1.",
    "sampleInput": "4, 0, [1,2], 4",
    "sampleOutput": "[0,-1,-1,1]",
    "points": 200,
    "hints": [
      "Reversing a subarray of length k flips the parity of the index shift by (k-1). Maintain unvisited indices in two binary search ranges (odd and even parity)."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def minReverseOperations(self, n: int, p: int, banned: list[int], k: int) -> list[int]:\n        pass",
      "javascript": "class Solution {\n    minReverseOperations(n, p, banned, k) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def minReverseOperations(self, n: int, p: int, banned: list[int], k: int) -> list[int]:\n        from collections import deque\n        import bisect\n        \n        banned_set = set(banned)\n        ans = [-1] * n\n        ans[p] = 0\n        \n        unvisited = [[], []]\n        for i in range(n):\n            if i != p and i not in banned_set:\n                unvisited[i % 2].append(i)\n                \n        queue = deque([p])\n        while queue:\n            curr = queue.popleft()\n            min_idx = 2 * max(0, curr - k + 1) + k - 1 - curr\n            max_idx = 2 * min(curr, n - k) + k - 1 - curr\n            \n            target_parity = (curr + k - 1) % 2\n            cand = unvisited[target_parity]\n            \n            l = bisect.bisect_left(cand, min_idx)\n            r = bisect.bisect_right(cand, max_idx)\n            \n            to_remove = cand[l:r]\n            del cand[l:r]\n            \n            for nxt in to_remove:\n                ans[nxt] = ans[curr] + 1\n                queue.append(nxt)\n                \n        return ans",
      "javascript": "class Solution {\n    minReverseOperations(n, p, banned, k) {\n        const bannedSet = new Set(banned);\n        const ans = Array(n).fill(-1);\n        ans[p] = 0;\n\n        const unvisited = [[], []];\n        for (let i = 0; i < n; i++) {\n            if (i !== p && !bannedSet.has(i)) {\n                unvisited[i % 2].push(i);\n            }\n        }\n\n        const queue = [p];\n        let head = 0;\n\n        while (head < queue.length) {\n            const curr = queue[head++];\n            const minIdx = 2 * Math.max(0, curr - k + 1) + k - 1 - curr;\n            const maxIdx = 2 * Math.min(curr, n - k) + k - 1 - curr;\n\n            const targetParity = (curr + k - 1) % 2;\n            const cand = unvisited[targetParity];\n\n            let l = 0, r = cand.length;\n            while (l < r) {\n                const mid = (l + r) >> 1;\n                if (cand[mid] < minIdx) l = mid + 1;\n                else r = mid;\n            }\n            let lBound = l;\n\n            l = 0; r = cand.length;\n            while (l < r) {\n                const mid = (l + r) >> 1;\n                if (cand[mid] <= maxIdx) l = mid + 1;\n                else r = mid;\n            }\n            let rBound = l;\n\n            const removed = cand.splice(lBound, rBound - lBound);\n            for (const nxt of removed) {\n                ans[nxt] = ans[curr] + 1;\n                queue.push(nxt);\n            }\n        }\n\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "Parity Range BFS with Lazy Splice / Fenwick Erasure.",
      "algorithm": "Reachable index interval [2*max(0, i-k+1)+k-1-i, 2*min(i, n-k)+k-1-i] with step 2. Query and delete visited elements using binary search.",
      "timeComplexity": "O(N log N)",
      "spaceComplexity": "O(N)",
      "content": "Parity-based range graph traversal.",
      "referenceCode": "min_idx = 2 * max(0, curr - k + 1) + k - 1 - curr"
    },
    "tags": [
      "Graph",
      "BFS",
      "Array",
      "Ordered Set"
    ],
    "testCases": [
      {
        "input": "4, 0, [1,2], 4",
        "expectedOutput": "[0,-1,-1,1]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "5, 0, [2,4], 3",
        "expectedOutput": "[0,-1,-1,-1,-1]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "4, 2, [0,1,3], 1",
        "expectedOutput": "[-1,-1,0,-1]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Maximum Equal Frequency Prefix Detection",
    "slug": "maximum-equal-frequency-prefix",
    "description": "Given an array nums of positive integers, return the longest possible length of an array prefix of nums, such that it is possible to remove exactly one element from this prefix so that every remaining number that appears in it will have the same frequency.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "2 <= nums.length <= 10^5, 1 <= nums[i] <= 10^5",
    "inputFormat": "nums",
    "outputFormat": "Integer representing maximum prefix length.",
    "sampleInput": "[2,2,1,1,5,3,3,5]",
    "sampleOutput": "7",
    "points": 200,
    "hints": [
      "Maintain count of frequencies and frequencies of frequencies. Check valid conditions: 1) all freq=1, 2) one element has freq=1 and all others freq=F, 3) one element has freq=F+1 and all others freq=F."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def maxEqualFreq(self, nums: list[int]) -> int:\n        pass",
      "javascript": "class Solution {\n    maxEqualFreq(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def maxEqualFreq(self, nums: list[int]) -> int:\n        import collections\n        count = collections.defaultdict(int)\n        freq = collections.defaultdict(int)\n        ans = 0\n        for i, x in enumerate(nums):\n            if count[x] > 0:\n                freq[count[x]] -= 1\n                if freq[count[x]] == 0:\n                    del freq[count[x]]\n            count[x] += 1\n            freq[count[x]] += 1\n            \n            if len(freq) == 1:\n                f, c = next(iter(freq.items()))\n                if f == 1 or c == 1:\n                    ans = i + 1\n            elif len(freq) == 2:\n                items = sorted(freq.items())\n                (f1, c1), (f2, c2) = items[0], items[1]\n                if f1 == 1 and c1 == 1:\n                    ans = i + 1\n                elif f2 == f1 + 1 and c2 == 1:\n                    ans = i + 1\n        return ans",
      "javascript": "class Solution {\n    maxEqualFreq(nums) {\n        const count = new Map();\n        const freq = new Map();\n        let ans = 0;\n\n        for (let i = 0; i < nums.length; i++) {\n            const x = nums[i];\n            const prev = count.get(x) || 0;\n            if (prev > 0) {\n                const fc = freq.get(prev) - 1;\n                if (fc === 0) freq.delete(prev);\n                else freq.set(prev, fc);\n            }\n            const curr = prev + 1;\n            count.set(x, curr);\n            freq.set(curr, (freq.get(curr) || 0) + 1);\n\n            if (freq.size === 1) {\n                const [[f, c]] = Array.from(freq.entries());\n                if (f === 1 || c === 1) ans = i + 1;\n            } else if (freq.size === 2) {\n                const items = Array.from(freq.entries()).sort((a, b) => a[0] - b[0]);\n                const [f1, c1] = items[0];\n                const [f2, c2] = items[1];\n                if (f1 === 1 && c1 === 1) ans = i + 1;\n                else if (f2 === f1 + 1 && c2 === 1) ans = i + 1;\n            }\n        }\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "Frequency of Frequencies Tracking.",
      "algorithm": "A prefix of length L is valid if: 1) all elements have frequency 1 or only 1 unique element; 2) one element has frequency 1 and all others share freq F; 3) one element has frequency F+1 and all others share freq F.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Online state verification using dual frequency maps.",
      "referenceCode": "if f1 == 1 and c1 == 1: ans = i + 1"
    },
    "tags": [
      "Hash Table",
      "Array",
      "Counting"
    ],
    "testCases": [
      {
        "input": "[2,2,1,1,5,3,3,5]",
        "expectedOutput": "7",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1,1,1,2,2,2,3,3,3,4,4,4,5]",
        "expectedOutput": "13",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1,1,1,2,2,2]",
        "expectedOutput": "5",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Shortest Path to Get All Keys Grid Bitmask BFS",
    "slug": "shortest-path-to-get-all-keys-grid",
    "description": "You are given an m x n grid of strings where @ is the starting point, . is an empty cell, # is a wall, lower-case letters (a-f) are keys, and upper-case letters (A-F) are locks. You cannot pass through a lock without its matching key. Return the minimum number of moves to acquire all keys. If impossible, return -1.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "m == grid.length, n == grid[i].length, 1 <= m, n <= 30, keys are within a-f",
    "inputFormat": "grid",
    "outputFormat": "Integer representing minimum moves.",
    "sampleInput": "[\"@.a..\",\"###.#\",\"b.A.B\"]",
    "sampleOutput": "8",
    "points": 200,
    "hints": [
      "State (r, c, keys_mask). BFS queue starting from @ with mask 0."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def shortestPathAllKeys(self, grid: list[str]) -> int:\n        pass",
      "javascript": "class Solution {\n    shortestPathAllKeys(grid) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def shortestPathAllKeys(self, grid: list[str]) -> int:\n        from collections import deque\n        m, n = len(grid), len(grid[0])\n        start_r, start_c = 0, 0\n        total_keys = 0\n        for r in range(m):\n            for c in range(n):\n                ch = grid[r][c]\n                if ch == '@':\n                    start_r, start_c = r, c\n                elif 'a' <= ch <= 'f':\n                    total_keys += 1\n                    \n        target_mask = (1 << total_keys) - 1\n        dq = deque([(start_r, start_c, 0, 0)]) # r, c, mask, dist\n        visited = {(start_r, start_c, 0)}\n        \n        while dq:\n            r, c, mask, d = dq.popleft()\n            if mask == target_mask:\n                return d\n            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < m and 0 <= nc < n:\n                    ch = grid[nr][nc]\n                    if ch == '#':\n                        continue\n                    if 'A' <= ch <= 'F':\n                        key_needed = ord(ch) - ord('A')\n                        if not (mask & (1 << key_needed)):\n                            continue\n                    next_mask = mask\n                    if 'a' <= ch <= 'f':\n                        next_mask |= (1 << (ord(ch) - ord('a')))\n                    if (nr, nc, next_mask) not in visited:\n                        visited.add((nr, nc, next_mask))\n                        dq.append((nr, nc, next_mask, d + 1))\n        return -1",
      "javascript": "class Solution {\n    shortestPathAllKeys(grid) {\n        const m = grid.length, n = grid[0].length;\n        let startR = 0, startC = 0, totalKeys = 0;\n        for (let r = 0; r < m; r++) {\n            for (let c = 0; c < n; c++) {\n                const ch = grid[r][c];\n                if (ch === '@') {\n                    startR = r;\n                    startC = c;\n                } else if (ch >= 'a' && ch <= 'f') {\n                    totalKeys++;\n                }\n            }\n        }\n\n        const targetMask = (1 << totalKeys) - 1;\n        const queue = [[startR, startC, 0, 0]];\n        const visited = new Set([startR + ',' + startC + ',0']);\n\n        while (queue.length > 0) {\n            const [r, c, mask, d] = queue.shift();\n            if (mask === targetMask) return d;\n            for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {\n                const nr = r + dr, nc = c + dc;\n                if (nr >= 0 && nr < m && nc >= 0 && nc < n) {\n                    const ch = grid[nr][nc];\n                    if (ch === '#') continue;\n                    if (ch >= 'A' && ch <= 'F') {\n                        const needed = ch.charCodeAt(0) - 65;\n                        if (!(mask & (1 << needed))) continue;\n                    }\n                    let nextMask = mask;\n                    if (ch >= 'a' && ch <= 'f') {\n                        nextMask |= (1 << (ch.charCodeAt(0) - 97));\n                    }\n                    const stateKey = nr + ',' + nc + ',' + nextMask;\n                    if (!visited.has(stateKey)) {\n                        visited.add(stateKey);\n                        queue.push([nr, nc, nextMask, d + 1]);\n                    }\n                }\n            }\n        }\n        return -1;\n    }\n}"
    },
    "editorial": {
      "approach": "State BFS on (row, col, keys_bitmask).",
      "algorithm": "Represent collected keys as integer bitmask. BFS guarantees minimal moves to reach state mask == (1 << K) - 1.",
      "timeComplexity": "O(M * N * 2^K)",
      "spaceComplexity": "O(M * N * 2^K)",
      "content": "Bitmask state space expansion on grid maze.",
      "referenceCode": "if mask == target_mask: return d"
    },
    "tags": [
      "Graph",
      "BFS",
      "Bitmask",
      "Matrix"
    ],
    "testCases": [
      {
        "input": "[\"@.a..\",\"###.#\",\"b.A.B\"]",
        "expectedOutput": "8",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[\"@..aA\",\"..B#.\",\"....b\"]",
        "expectedOutput": "6",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[\"@Aa\"]",
        "expectedOutput": "-1",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Tallest Billboard Dynamic Programming Balance",
    "slug": "tallest-billboard-support-dp-balance",
    "description": "You are installing a billboard and want it to have the largest height. The billboard will have two steel supports, one on each side. Each condition must be satisfied: Both supports must have equal height. You have a collection of rods which can be welded together. You cannot break any rod into parts. Return the largest possible height of your billboard installation. If no billboard can be installed, return 0.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "0 <= rods.length <= 20, 1 <= rods[i] <= 1000, sum(rods[i]) <= 5000",
    "inputFormat": "rods",
    "outputFormat": "Integer representing maximum billboard height.",
    "sampleInput": "[1,2,3,6]",
    "sampleOutput": "6",
    "points": 200,
    "hints": [
      "dp[diff] = max height of the taller support given difference diff between supports."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def tallestBillboard(self, rods: list[int]) -> int:\n        pass",
      "javascript": "class Solution {\n    tallestBillboard(rods) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def tallestBillboard(self, rods: list[int]) -> int:\n        dp = {0: 0}\n        for r in rods:\n            nxt = dp.copy()\n            for diff, taller in dp.items():\n                shorter = taller - diff\n                nxt[diff + r] = max(nxt.get(diff + r, 0), taller + r)\n                new_diff = abs(shorter + r - taller)\n                nxt[new_diff] = max(nxt.get(new_diff, 0), max(taller, shorter + r))\n            dp = nxt\n        return dp.get(0, 0)",
      "javascript": "class Solution {\n    tallestBillboard(rods) {\n        let dp = new Map();\n        dp.set(0, 0);\n\n        for (const r of rods) {\n            const next = new Map(dp);\n            for (const [diff, taller] of dp.entries()) {\n                const shorter = taller - diff;\n                const d1 = diff + r;\n                next.set(d1, Math.max(next.get(d1) || 0, taller + r));\n                const d2 = Math.abs(shorter + r - taller);\n                next.set(d2, Math.max(next.get(d2) || 0, Math.max(taller, shorter + r)));\n            }\n            dp = next;\n        }\n        return dp.get(0) || 0;\n    }\n}"
    },
    "editorial": {
      "approach": "DP on Support Difference State.",
      "algorithm": "Track dp[diff] = max height of taller support. For each rod, either skip, add to taller, or add to shorter support.",
      "timeComplexity": "O(N * sum(rods))",
      "spaceComplexity": "O(sum(rods))",
      "content": "Difference-based Knapsack DP for equal partition balance.",
      "referenceCode": "nxt[diff + r] = max(nxt.get(diff + r, 0), taller + r)"
    },
    "tags": [
      "Dynamic Programming",
      "Array"
    ],
    "testCases": [
      {
        "input": "[1,2,3,6]",
        "expectedOutput": "6",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1,2,3,4,5,6]",
        "expectedOutput": "10",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1,2]",
        "expectedOutput": "0",
        "isHidden": false,
        "order": 2
      },
      {
        "input": "[]",
        "expectedOutput": "0",
        "isHidden": true,
        "order": 3
      }
    ]
  },
  {
    "title": "Brace Expansion II Grammar Expression Parser",
    "slug": "brace-expansion-ii-grammar-parser",
    "description": "Under the grammar given below, strings can represent a set of lowercase words. {a,b,c} represents {\"a\",\"b\",\"c\"}, {a,b}{c,d} represents {\"ac\",\"ad\",\"bc\",\"bd\"}, and a{b,c} represents {\"ab\",\"ac\"}. Given an expression, return the sorted list of words it represents, without duplicates.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= expression.length <= 60, expression[i] consists of \"{\", \"}\", \",\", or lowercase letters",
    "inputFormat": "expression",
    "outputFormat": "Sorted list of unique strings.",
    "sampleInput": "\"{a,b}{c,{d,e}}\"",
    "sampleOutput": "[\"ac\",\"ad\",\"ae\",\"bc\",\"bd\",\"be\"]",
    "points": 200,
    "hints": [
      "Stack-based expression parser with concatenation (multiplication) and comma union (addition)."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def braceExpansionII(self, expression: str) -> list[str]:\n        pass",
      "javascript": "class Solution {\n    braceExpansionII(expression) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def braceExpansionII(self, expression: str) -> list[str]:\n        stack = []\n        res = [[]]\n        for c in expression:\n            if c == '{':\n                stack.append(res)\n                res = [[]]\n            elif c == '}':\n                group = set(w for grp in res for w in grp)\n                prev = stack.pop()\n                prev[-1] = [p + g for p in prev[-1] for g in group] if prev[-1] else list(group)\n                res = prev\n            elif c == ',':\n                res.append([])\n            else:\n                if not res[-1]:\n                    res[-1] = [c]\n                else:\n                    res[-1] = [p + c for p in res[-1]]\n                    \n        return sorted(set(w for grp in res for w in grp))",
      "javascript": "class Solution {\n    braceExpansionII(expression) {\n        const stack = [];\n        let res = [[]];\n\n        for (const c of expression) {\n            if (c === '{') {\n                stack.push(res);\n                res = [[]];\n            } else if (c === '}') {\n                const group = new Set();\n                for (const grp of res) for (const w of grp) group.add(w);\n                const prev = stack.pop();\n                const last = prev[prev.length - 1];\n                if (last && last.length > 0) {\n                    const prod = [];\n                    for (const p of last) {\n                        for (const g of group) prod.push(p + g);\n                    }\n                    prev[prev.length - 1] = prod;\n                } else {\n                    prev[prev.length - 1] = Array.from(group);\n                }\n                res = prev;\n            } else if (c === ',') {\n                res.push([]);\n            } else {\n                const last = res[res.length - 1];\n                if (!last || last.length === 0) {\n                    res[res.length - 1] = [c];\n                } else {\n                    res[res.length - 1] = last.map(p => p + c);\n                }\n            }\n        }\n        const finalSet = new Set();\n        for (const grp of res) for (const w of grp) finalSet.add(w);\n        return Array.from(finalSet).sort();\n    }\n}"
    },
    "editorial": {
      "approach": "Stack-based AST Grammar Parser with Union and Cartesian Product.",
      "algorithm": "Comma corresponds to Union (addition), adjacent blocks correspond to Cartesian Product (multiplication).",
      "timeComplexity": "O(Total Output Size * log(Total Output Size))",
      "spaceComplexity": "O(Expression Length + Output Size)",
      "content": "Algebraic set expression evaluation using parsing stack.",
      "referenceCode": "prev[-1] = [p + g for p in prev[-1] for g in group]"
    },
    "tags": [
      "Stack",
      "String",
      "Breadth-First Search",
      "Recursion"
    ],
    "testCases": [
      {
        "input": "\"{a,b}{c,{d,e}}\"",
        "expectedOutput": "[\"ac\",\"ad\",\"ae\",\"bc\",\"bd\",\"be\"]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"{{a,z},a{b,c},{ab,z}}\"",
        "expectedOutput": "[\"a\",\"ab\",\"ac\",\"z\"]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"a\"",
        "expectedOutput": "[\"a\"]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Longest Valid Parentheses Substring Length",
    "slug": "longest-valid-parentheses-substring-length",
    "description": "Given a string containing just the characters \"(\" and \")\", return the length of the longest valid (well-formed) parentheses substring.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "0 <= s.length <= 3 * 10^4, s[i] is \"(\" or \")\"",
    "inputFormat": "s",
    "outputFormat": "Integer representing longest valid substring length.",
    "sampleInput": "\")()())\"",
    "sampleOutput": "4",
    "points": 200,
    "hints": [
      "Use a stack storing indices, initialized with -1 to serve as base boundary."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def longestValidParentheses(self, s: str) -> int:\n        pass",
      "javascript": "class Solution {\n    longestValidParentheses(s) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def longestValidParentheses(self, s: str) -> int:\n        stack = [-1]\n        max_len = 0\n        for i, c in enumerate(s):\n            if c == '(':\n                stack.append(i)\n            else:\n                stack.pop()\n                if not stack:\n                    stack.append(i)\n                else:\n                    max_len = max(max_len, i - stack[-1])\n        return max_len",
      "javascript": "class Solution {\n    longestValidParentheses(s) {\n        const stack = [-1];\n        let maxLen = 0;\n        for (let i = 0; i < s.length; i++) {\n            if (s[i] === '(') {\n                stack.push(i);\n            } else {\n                stack.pop();\n                if (stack.length === 0) {\n                    stack.push(i);\n                } else {\n                    maxLen = Math.max(maxLen, i - stack[stack.length - 1]);\n                }\n            }\n        }\n        return maxLen;\n    }\n}"
    },
    "editorial": {
      "approach": "Index Stack Boundary Tracking.",
      "algorithm": "Stack stores index of unmatched boundaries. When \")\" pops, distance i - stack[-1] gives contiguous valid substring length.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Optimal O(N) single pass valid parentheses substring finder.",
      "referenceCode": "max_len = max(max_len, i - stack[-1])"
    },
    "tags": [
      "Stack",
      "Dynamic Programming",
      "String"
    ],
    "testCases": [
      {
        "input": "\")()())\"",
        "expectedOutput": "4",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"(()\"",
        "expectedOutput": "2",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"\"",
        "expectedOutput": "0",
        "isHidden": false,
        "order": 2
      },
      {
        "input": "\"()(()\"",
        "expectedOutput": "2",
        "isHidden": true,
        "order": 3
      }
    ]
  },
  {
    "title": "Cracking the Safe De Bruijn Sequence",
    "slug": "cracking-the-safe-de-bruijn-sequence",
    "description": "There is a safe protected by a password of n digits. Each digit can be one of the first k digits: 0, 1, ..., k - 1. The safe has a lock that opens if at any point the last n digits entered match the password. Return any string of minimum length that is guaranteed to open the safe.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 4, 1 <= k <= 10, k^n <= 4096",
    "inputFormat": "n, k",
    "outputFormat": "String containing all k^n combinations of length n.",
    "sampleInput": "1, 2",
    "sampleOutput": "\"10\"",
    "points": 200,
    "hints": [
      "Construct a De Bruijn sequence B(k, n) via Eulerian path / Hierholzers algorithm on a directed graph with k^(n-1) nodes."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def crackSafe(self, n: int, k: int) -> int:\n        pass",
      "javascript": "class Solution {\n    crackSafe(n, k) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def crackSafe(self, n: int, k: int) -> str:\n        if n == 1:\n            return \"\".join(str(i) for i in range(k))\n        visited = set()\n        ans = []\n        prefix = \"0\" * (n - 1)\n        \n        def dfs(node):\n            for x in range(k):\n                edge = node + str(x)\n                if edge not in visited:\n                    visited.add(edge)\n                    dfs(edge[1:])\n                    ans.append(str(x))\n                    \n        dfs(prefix)\n        return prefix + \"\".join(ans[::-1])",
      "javascript": "class Solution {\n    crackSafe(n, k) {\n        if (n === 1) {\n            let res = '';\n            for (let i = 0; i < k; i++) res += i;\n            return res;\n        }\n        const visited = new Set();\n        const ans = [];\n        const prefix = '0'.repeat(n - 1);\n\n        function dfs(node) {\n            for (let x = 0; x < k; x++) {\n                const edge = node + x;\n                if (!visited.has(edge)) {\n                    visited.add(edge);\n                    dfs(edge.slice(1));\n                    ans.push(String(x));\n                }\n            }\n        }\n\n        dfs(prefix);\n        return prefix + ans.reverse().join('');\n    }\n}"
    },
    "editorial": {
      "approach": "Hierholzer Eulerian Circuit on De Bruijn Graph.",
      "algorithm": "Nodes represent (n-1) digit prefixes, directed edges represent n-digit combinations. DFS visits every edge exactly once.",
      "timeComplexity": "O(K^N)",
      "spaceComplexity": "O(K^N)",
      "content": "Shortest cyclic superstring over alphabet size K and length N.",
      "referenceCode": "prefix + \"\".join(ans[::-1])"
    },
    "tags": [
      "Graph",
      "Eulerian Circuit",
      "Depth-First Search"
    ],
    "testCases": [
      {
        "input": "1, 2",
        "expectedOutput": "\"10\"",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "2, 2",
        "expectedOutput": "\"01100\"",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "2, 1",
        "expectedOutput": "\"00\"",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Minimum Window Subsequence Dynamic Programming",
    "slug": "minimum-window-subsequence-dp",
    "description": "Given strings s1 and s2, return the minimum contiguous substring part of s1, so that s2 is a subsequence of the part. If there is no such window in s1 that covers all characters in s2, return the empty string \"\". If there are multiple such minimum-length windows, return the one with the smallest starting index.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= s1.length <= 2 * 10^4, 1 <= s2.length <= 100, s1 and s2 consist of lowercase letters",
    "inputFormat": "s1, s2",
    "outputFormat": "String representing minimum window subsequence.",
    "sampleInput": "\"abcdebdde\", \"bde\"",
    "sampleOutput": "\"bcde\"",
    "points": 200,
    "hints": [
      "Forward match s2 in s1 to find candidate end, then backward match from end to find tightest start."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def minWindow(self, s1: str, s2: str) -> str:\n        pass",
      "javascript": "class Solution {\n    minWindow(s1, s2) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def minWindow(self, s1: str, s2: str) -> str:\n        m, n = len(s1), len(s2)\n        i = 0\n        min_len = float('inf')\n        ans = \"\"\n        while i < m:\n            # Match forward\n            j = 0\n            while i < m and j < n:\n                if s1[i] == s2[j]:\n                    j += 1\n                i += 1\n            if j < n:\n                break\n            # Match backward\n            end = i\n            i -= 1\n            j = n - 1\n            while j >= 0:\n                if s1[i] == s2[j]:\n                    j -= 1\n                i -= 1\n            start = i + 1\n            if end - start < min_len:\n                min_len = end - start\n                ans = s1[start:end]\n            i = start + 1\n        return ans",
      "javascript": "class Solution {\n    minWindow(s1, s2) {\n        const m = s1.length, n = s2.length;\n        let i = 0, minLen = Infinity, ans = \"\";\n        while (i < m) {\n            let j = 0;\n            while (i < m && j < n) {\n                if (s1[i] === s2[j]) j++;\n                i++;\n            }\n            if (j < n) break;\n            const end = i;\n            i--;\n            j = n - 1;\n            while (j >= 0) {\n                if (s1[i] === s2[j]) j--;\n                i--;\n            }\n            const start = i + 1;\n            if (end - start < minLen) {\n                minLen = end - start;\n                ans = s1.slice(start, end);\n            }\n            i = start + 1;\n        }\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "Two Pointer Forward-Backward Squeeze.",
      "algorithm": "Advance pointer until s2 matched. Backtrack from match end to find rightmost valid start. Record best substring.",
      "timeComplexity": "O(M * N)",
      "spaceComplexity": "O(1)",
      "content": "Optimal greedy subsequence window contraction.",
      "referenceCode": "if end - start < min_len: ans = s1[start:end]"
    },
    "tags": [
      "Dynamic Programming",
      "Sliding Window",
      "Two Pointers",
      "String"
    ],
    "testCases": [
      {
        "input": "\"abcdebdde\", \"bde\"",
        "expectedOutput": "\"bcde\"",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"jmeqforejqmzskvvlbtqmkldflsavflrqzvgmrnxsqgluobnoakrqonyqqakjptxikgahkyztqivvhchbdzgdnipamaakjwipamap\", \"k\"",
        "expectedOutput": "\"k\"",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"abc\", \"d\"",
        "expectedOutput": "\"\"",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Distinct Subsequences II Counting Modulo",
    "slug": "distinct-subsequences-ii-dp",
    "description": "Given a string s, return the number of distinct non-empty subsequences of s. Since the answer may be very large, return it modulo 10^9 + 7.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= s.length <= 2000, s consists of lowercase English letters",
    "inputFormat": "s",
    "outputFormat": "Integer representing count of distinct subsequences modulo 10^9 + 7.",
    "sampleInput": "\"abc\"",
    "sampleOutput": "7",
    "points": 200,
    "hints": [
      "Maintain the number of distinct subsequences ending in each character ch. Total new = 2 * total - last[ch]."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def distinctSubseqII(self, s: str) -> int:\n        pass",
      "javascript": "class Solution {\n    distinctSubseqII(s) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def distinctSubseqII(self, s: str) -> int:\n        MOD = 10**9 + 7\n        end = [0] * 26\n        for c in s:\n            idx = ord(c) - ord('a')\n            end[idx] = (sum(end) + 1) % MOD\n        return sum(end) % MOD",
      "javascript": "class Solution {\n    distinctSubseqII(s) {\n        const MOD = 1000000007n;\n        const end = Array(26).fill(0n);\n        for (let i = 0; i < s.length; i++) {\n            const idx = s.charCodeAt(i) - 97;\n            let sum = 0n;\n            for (let k = 0; k < 26; k++) sum = (sum + end[k]) % MOD;\n            end[idx] = (sum + 1n) % MOD;\n        }\n        let total = 0n;\n        for (let k = 0; k < 26; k++) total = (total + end[k]) % MOD;\n        return Number(total);\n    }\n}"
    },
    "editorial": {
      "approach": "Character Ending Bucket DP.",
      "algorithm": "end[c] is the number of distinct subsequences ending in character c. For each char, end[c] = (sum of all other end[k]) + 1.",
      "timeComplexity": "O(26 * N)",
      "spaceComplexity": "O(26)",
      "content": "Modulo dynamic programming tracking last occurrence buckets.",
      "referenceCode": "end[idx] = (sum(end) + 1) % MOD"
    },
    "tags": [
      "Dynamic Programming",
      "String"
    ],
    "testCases": [
      {
        "input": "\"abc\"",
        "expectedOutput": "7",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"aba\"",
        "expectedOutput": "6",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"aaa\"",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 2
      },
      {
        "input": "\"z\"",
        "expectedOutput": "1",
        "isHidden": true,
        "order": 3
      }
    ]
  },
  {
    "title": "Maximum Profit in Job Scheduling DP Binary Search",
    "slug": "maximum-profit-in-job-scheduling-dp",
    "description": "We have n jobs, where every job is scheduled to be done from startTime[i] to endTime[i], obtaining a profit of profit[i]. You are given startTime, endTime and profit arrays. Return the maximum profit you can take such that there are no two jobs in the subset with overlapping time range.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= startTime.length == endTime.length == profit.length <= 5 * 10^4, 1 <= startTime[i] < endTime[i] <= 10^9, 1 <= profit[i] <= 10^4",
    "inputFormat": "startTime, endTime, profit",
    "outputFormat": "Integer representing maximum profit.",
    "sampleInput": "[1,2,3,3], [3,4,5,6], [50,10,40,70]",
    "sampleOutput": "120",
    "points": 200,
    "hints": [
      "Sort jobs by end time. DP state dp[i] = max(dp[i-1], profit[i] + dp[prev_compatible_job]) using binary search bisect."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def jobScheduling(self, startTime: list[int], endTime: list[int], profit: list[int]) -> int:\n        pass",
      "javascript": "class Solution {\n    jobScheduling(startTime, endTime, profit) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def jobScheduling(self, startTime: list[int], endTime: list[int], profit: list[int]) -> int:\n        import bisect\n        jobs = sorted(zip(endTime, startTime, profit))\n        dp = [(0, 0)] # (end_time, max_profit)\n        for e, s, p in jobs:\n            # Find job with end_time <= s\n            idx = bisect.bisect_right(dp, (s, float('inf'))) - 1\n            prev_profit = dp[idx][1]\n            if prev_profit + p > dp[-1][1]:\n                dp.append((e, prev_profit + p))\n        return dp[-1][1]",
      "javascript": "class Solution {\n    jobScheduling(startTime, endTime, profit) {\n        const n = startTime.length;\n        const jobs = [];\n        for (let i = 0; i < n; i++) {\n            jobs.push([endTime[i], startTime[i], profit[i]]);\n        }\n        jobs.sort((a, b) => a[0] - b[0]);\n\n        const dp = [[0, 0]]; // [endTime, maxProfit]\n        for (const [e, s, p] of jobs) {\n            let low = 0, high = dp.length - 1, bestIdx = 0;\n            while (low <= high) {\n                const mid = (low + high) >> 1;\n                if (dp[mid][0] <= s) {\n                    bestIdx = mid;\n                    low = mid + 1;\n                } else {\n                    high = mid - 1;\n                }\n            }\n            const total = dp[bestIdx][1] + p;\n            if (total > dp[dp.length - 1][1]) {\n                dp.push([e, total]);\n            }\n        }\n        return dp[dp.length - 1][1];\n    }\n}"
    },
    "editorial": {
      "approach": "Weighted Interval Scheduling DP + Bisect.",
      "algorithm": "Sort intervals by end time. At job i, either skip it (keep dp[-1]) or take it (combine with binary-searched latest compatible job before start time).",
      "timeComplexity": "O(N log N)",
      "spaceComplexity": "O(N)",
      "content": "Classic weighted interval scheduling dynamic programming.",
      "referenceCode": "idx = bisect.bisect_right(dp, (s, inf)) - 1"
    },
    "tags": [
      "Dynamic Programming",
      "Binary Search",
      "Sorting",
      "Array"
    ],
    "testCases": [
      {
        "input": "[1,2,3,3], [3,4,5,6], [50,10,40,70]",
        "expectedOutput": "120",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1,2,3,4,6], [3,5,10,6,9], [20,20,100,70,60]",
        "expectedOutput": "150",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1,1,1], [2,3,4], [5,6,4]",
        "expectedOutput": "6",
        "isHidden": false,
        "order": 2
      }
    ]
  },
  {
    "title": "Parsing A Boolean Expression Stack Evaluator",
    "slug": "parsing-a-boolean-expression-stack",
    "description": "A boolean expression is an expression that evaluates to either true or false: \"t\" (true), \"f\" (false), \"!(subExpr)\" (NOT), \"&(subExpr1, subExpr2, ...)\" (AND), or \"|(subExpr1, subExpr2, ...)\" (OR). Return the boolean evaluation of the given expression.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= expression.length <= 2 * 10^4, expression is a valid boolean expression",
    "inputFormat": "expression",
    "outputFormat": "Boolean true or false.",
    "sampleInput": "\"&(|(f))\"",
    "sampleOutput": "false",
    "points": 200,
    "hints": [
      "Use an operator stack and an operand stack. Evaluate on encountering \")\"."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def parseBoolExpr(self, expression: str) -> bool:\n        pass",
      "javascript": "class Solution {\n    parseBoolExpr(expression) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def parseBoolExpr(self, expression: str) -> bool:\n        stack = []\n        for c in expression:\n            if c == ',':\n                continue\n            if c != ')':\n                stack.append(c)\n            else:\n                seen = set()\n                while stack and stack[-1] != '(':\n                    seen.add(stack.pop())\n                stack.pop() # pop '('\n                op = stack.pop() # pop operator\n                if op == '!':\n                    stack.append('f' if 't' in seen else 't')\n                elif op == '&':\n                    stack.append('f' if 'f' in seen else 't')\n                elif op == '|':\n                    stack.append('t' if 't' in seen else 'f')\n        return stack[0] == 't'",
      "javascript": "class Solution {\n    parseBoolExpr(expression) {\n        const stack = [];\n        for (const c of expression) {\n            if (c === ',') continue;\n            if (c !== ')') {\n                stack.push(c);\n            } else {\n                const seen = new Set();\n                while (stack.length > 0 && stack[stack.length - 1] !== '(') {\n                    seen.add(stack.pop());\n                }\n                stack.pop(); // pop '('\n                const op = stack.pop(); // pop operator\n                if (op === '!') {\n                    stack.push(seen.has('t') ? 'f' : 't');\n                } else if (op === '&') {\n                    stack.push(seen.has('f') ? 'f' : 't');\n                } else if (op === '|') {\n                    stack.push(seen.has('t') ? 't' : 'f');\n                }\n            }\n        }\n        return stack[0] === 't';\n    }\n}"
    },
    "editorial": {
      "approach": "Stack-based AST Boolean Evaluator.",
      "algorithm": "Push characters except commas. When \")\" is encountered, pop operands until \"(\", pop the logical operator, evaluate and push the boolean result.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Linear time boolean operator tree expression reduction.",
      "referenceCode": "stack.append(\"f\" if \"f\" in seen else \"t\")"
    },
    "tags": [
      "Stack",
      "String",
      "Recursion"
    ],
    "testCases": [
      {
        "input": "\"&(|(f))\"",
        "expectedOutput": "false",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"|(f,f,f,t)\"",
        "expectedOutput": "true",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"!(&(f,t))\"",
        "expectedOutput": "true",
        "isHidden": false,
        "order": 2
      },
      {
        "input": "\"t\"",
        "expectedOutput": "true",
        "isHidden": true,
        "order": 3
      }
    ]
  },
  {
    "title": "Minimum Number of K Consecutive Bit Flips",
    "slug": "minimum-number-of-k-consecutive-bit-flips",
    "description": "You are given a binary array nums and an integer k. A k-bit flip is choosing a contiguous subarray of length k from nums and simultaneously changing every 0 in the subarray to 1, and every 1 to 0. Return the minimum number of k-bit flips required so that there is no 0 in the array. If it is impossible, return -1.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 10^5, 1 <= k <= nums.length",
    "inputFormat": "nums, k",
    "outputFormat": "Integer representing minimum flips or -1.",
    "sampleInput": "[0,1,0], 1",
    "sampleOutput": "2",
    "points": 200,
    "hints": [
      "Track current flipped parity using a sliding window deque or difference array in O(1) space."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def minKBitFlips(self, nums: list[int], k: int) -> int:\n        pass",
      "javascript": "class Solution {\n    minKBitFlips(nums, k) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def minKBitFlips(self, nums: list[int], k: int) -> int:\n        from collections import deque\n        dq = deque()\n        res = 0\n        for i, x in enumerate(nums):\n            if dq and dq[0] + k <= i:\n                dq.popleft()\n            if (x + len(dq)) % 2 == 0:\n                if i + k > len(nums):\n                    return -1\n                dq.append(i)\n                res += 1\n        return res",
      "javascript": "class Solution {\n    minKBitFlips(nums, k) {\n        const n = nums.length;\n        const diff = Array(n + 1).fill(0);\n        let curFlips = 0, res = 0;\n        for (let i = 0; i < n; i++) {\n            curFlips += diff[i];\n            if ((nums[i] + curFlips) % 2 === 0) {\n                if (i + k > n) return -1;\n                res++;\n                curFlips++;\n                diff[i + k]--;\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Greedy Difference Array / Sliding Window Parity.",
      "algorithm": "From left to right, if current bit is 0 after considering current active flips, we must flip subarray [i, i+k-1]. If i + k > N, return -1.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(K)",
      "content": "Greedy left-to-right elimination with interval flip tracking.",
      "referenceCode": "if (x + len(dq)) % 2 == 0: res += 1; dq.append(i)"
    },
    "tags": [
      "Array",
      "Bit Manipulation",
      "Sliding Window",
      "Queue"
    ],
    "testCases": [
      {
        "input": "[0,1,0], 1",
        "expectedOutput": "2",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1,1,0], 2",
        "expectedOutput": "-1",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[0,0,0,1,0,1,1,0], 3",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 2
      }
    ]
  },
  {
    "title": "Sliding Puzzle 2x3 Board BFS Solver",
    "slug": "sliding-puzzle-bfs-shortest-moves",
    "description": "On a 2 x 3 board, there are five tiles labeled 1 to 5, and an empty square represented by 0. A move consists of choosing 0 and a 4-directionally adjacent number and swapping it. The state of the board is solved if and only if the board is [[1,2,3],[4,5,0]]. Given the puzzle board board, return the least number of moves required so that the state of the board is solved. If it is impossible, return -1.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "board.length == 2, board[0].length == 3, 0 <= board[i][j] <= 5, each value is unique",
    "inputFormat": "board",
    "outputFormat": "Integer representing minimum moves or -1.",
    "sampleInput": "[[1,2,3],[4,0,5]]",
    "sampleOutput": "1",
    "points": 200,
    "hints": [
      "Represent the 2x3 grid as a 6-character string. Run BFS with swap neighbors for each 0 position."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def slidingPuzzle(self, board: list[list[int]]) -> int:\n        pass",
      "javascript": "class Solution {\n    slidingPuzzle(board) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def slidingPuzzle(self, board: list[list[int]]) -> int:\n        from collections import deque\n        start = \"\".join(str(board[r][c]) for r in range(2) for c in range(3))\n        target = \"123450\"\n        if start == target:\n            return 0\n            \n        neighbors = {\n            0: [1, 3],\n            1: [0, 2, 4],\n            2: [1, 5],\n            3: [0, 4],\n            4: [1, 3, 5],\n            5: [2, 4]\n        }\n        \n        dq = deque([(start, start.index('0'), 0)])\n        visited = {start}\n        \n        while dq:\n            state, zero_idx, dist = dq.popleft()\n            if state == target:\n                return dist\n            for nxt_idx in neighbors[zero_idx]:\n                arr = list(state)\n                arr[zero_idx], arr[nxt_idx] = arr[nxt_idx], arr[zero_idx]\n                nxt_state = \"\".join(arr)\n                if nxt_state not in visited:\n                    visited.add(nxt_state)\n                    dq.append((nxt_state, nxt_idx, dist + 1))\n        return -1",
      "javascript": "class Solution {\n    slidingPuzzle(board) {\n        let start = '';\n        for (let r = 0; r < 2; r++) {\n            for (let c = 0; c < 3; c++) {\n                start += board[r][c];\n            }\n        }\n        const target = '123450';\n        if (start === target) return 0;\n\n        const neighbors = [\n            [1, 3],\n            [0, 2, 4],\n            [1, 5],\n            [0, 4],\n            [1, 3, 5],\n            [2, 4]\n        ];\n\n        const queue = [[start, start.indexOf('0'), 0]];\n        const visited = new Set([start]);\n        let head = 0;\n\n        while (head < queue.length) {\n            const [state, zeroIdx, dist] = queue[head++];\n            if (state === target) return dist;\n            for (const nxt of neighbors[zeroIdx]) {\n                const arr = state.split('');\n                arr[zeroIdx] = arr[nxt];\n                arr[nxt] = '0';\n                const nextState = arr.join('');\n                if (!visited.has(nextState)) {\n                    visited.add(nextState);\n                    queue.push([nextState, nxt, dist + 1]);\n                }\n            }\n        }\n        return -1;\n    }\n}"
    },
    "editorial": {
      "approach": "State Space BFS on 6-character Permutations.",
      "algorithm": "Total states <= 6! = 720. Precompute adjacency graph for the 0 slot and use BFS to guarantee shortest move path.",
      "timeComplexity": "O(6!) = O(720)",
      "spaceComplexity": "O(6!)",
      "content": "Exact shortest path on 15-puzzle variant graph.",
      "referenceCode": "dq.append((nxt_state, nxt_idx, dist + 1))"
    },
    "tags": [
      "Graph",
      "BFS",
      "Matrix",
      "Array"
    ],
    "testCases": [
      {
        "input": "[[1,2,3],[4,0,5]]",
        "expectedOutput": "1",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[1,2,3],[5,4,0]]",
        "expectedOutput": "-1",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[4,1,2],[5,0,3]]",
        "expectedOutput": "5",
        "isHidden": false,
        "order": 2
      }
    ]
  },
  {
    "title": "Minimum Cost to Merge Stones Interval DP",
    "slug": "minimum-cost-to-merge-stones-interval-dp",
    "description": "There are n piles of stones arranged in a row. The i-th pile has stones[i] stones. A move consists of merging exactly k consecutive piles into one pile, and the cost of this move is equal to the total number of stones in these k piles. Return the minimum cost to merge all piles of stones into one pile. If it is impossible, return -1.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= stones.length <= 30, 2 <= k <= 30, 1 <= stones[i] <= 100",
    "inputFormat": "stones, k",
    "outputFormat": "Integer representing minimum cost or -1.",
    "sampleInput": "[3,2,4,1], 2",
    "sampleOutput": "20",
    "points": 200,
    "hints": [
      "Check if (n - 1) % (k - 1) == 0. Interval DP with step (k-1): dp[i][j] = min(dp[i][m] + dp[m+1][j])."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def mergeStones(self, stones: list[int], k: int) -> int:\n        pass",
      "javascript": "class Solution {\n    mergeStones(stones, k) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def mergeStones(self, stones: list[int], k: int) -> int:\n        n = len(stones)\n        if (n - 1) % (k - 1) != 0:\n            return -1\n        prefix = [0] * (n + 1)\n        for i in range(n):\n            prefix[i + 1] = prefix[i] + stones[i]\n            \n        dp = [[0] * n for _ in range(n)]\n        for length in range(k, n + 1):\n            for i in range(n - length + 1):\n                j = i + length - 1\n                dp[i][j] = float('inf')\n                for m in range(i, j, k - 1):\n                    dp[i][j] = min(dp[i][j], dp[i][m] + dp[m + 1][j])\n                if (length - 1) % (k - 1) == 0:\n                    dp[i][j] += prefix[j + 1] - prefix[i]\n        return dp[0][n - 1]",
      "javascript": "class Solution {\n    mergeStones(stones, k) {\n        const n = stones.length;\n        if ((n - 1) % (k - 1) !== 0) return -1;\n        const prefix = Array(n + 1).fill(0);\n        for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + stones[i];\n\n        const dp = Array.from({ length: n }, () => Array(n).fill(0));\n        for (let len = k; len <= n; len++) {\n            for (let i = 0; i <= n - len; i++) {\n                const j = i + len - 1;\n                dp[i][j] = Infinity;\n                for (let m = i; m < j; m += k - 1) {\n                    dp[i][j] = Math.min(dp[i][j], dp[i][m] + dp[m + 1][j]);\n                }\n                if ((len - 1) % (k - 1) === 0) {\n                    dp[i][j] += prefix[j + 1] - prefix[i];\n                }\n            }\n        }\n        return dp[0][n - 1];\n    }\n}"
    },
    "editorial": {
      "approach": "Interval Dynamic Programming with Stride k - 1.",
      "algorithm": "Condition for solvability: (N - 1) % (K - 1) == 0. Partition interval [i..j] with stride K - 1. Add range sum when interval reduces to 1 pile.",
      "timeComplexity": "O(N^3 / K)",
      "spaceComplexity": "O(N^2)",
      "content": "Generalized matrix chain multiplication DP.",
      "referenceCode": "dp[i][j] = min(dp[i][j], dp[i][m] + dp[m + 1][j])"
    },
    "tags": [
      "Dynamic Programming",
      "Array",
      "Prefix Sum"
    ],
    "testCases": [
      {
        "input": "[3,2,4,1], 2",
        "expectedOutput": "20",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[3,2,4,1], 3",
        "expectedOutput": "-1",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[3,5,1,2,6], 3",
        "expectedOutput": "25",
        "isHidden": false,
        "order": 2
      }
    ]
  },
  {
    "title": "Chalkboard XOR Game Nim Game Theory",
    "slug": "chalkboard-xor-game-nim-theory",
    "description": "You are given an array of integers nums representing the numbers written on a chalkboard. Alice and Bob take turns erasing one number from the chalkboard, with Alice going first. If erasing a number causes the bitwise XOR of all the remaining elements to become 0, that player loses their turn and the other player wins. If the bitwise XOR of all elements is already 0 at the start, Alice wins immediately. Return true if Alice wins, assuming both players play optimally.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 1000, 0 <= nums[i] < 2^16",
    "inputFormat": "nums",
    "outputFormat": "Boolean true if Alice wins, false otherwise.",
    "sampleInput": "[1,1,2]",
    "sampleOutput": "false",
    "points": 200,
    "hints": [
      "If initial XOR sum is 0, Alice wins. If array length is even, Alice always has a winning move."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def xorGame(self, nums: list[int]) -> bool:\n        pass",
      "javascript": "class Solution {\n    xorGame(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def xorGame(self, nums: list[int]) -> bool:\n        import functools, operator\n        xor_sum = functools.reduce(operator.xor, nums)\n        return xor_sum == 0 or len(nums) % 2 == 0",
      "javascript": "class Solution {\n    xorGame(nums) {\n        let xorSum = 0;\n        for (const x of nums) xorSum ^= x;\n        return xorSum === 0 || nums.length % 2 === 0;\n    }\n}"
    },
    "editorial": {
      "approach": "Game Theory Invariant Analysis.",
      "algorithm": "If XOR sum is 0, Alice wins on turn 0. Otherwise, if length is even, there must exist at least one element whose removal leaves XOR non-zero, forcing Bob into an odd length state. Alice wins iff XOR==0 or N % 2 == 0.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "content": "Mathematical game theory parity reduction.",
      "referenceCode": "return xor_sum == 0 or len(nums) % 2 == 0"
    },
    "tags": [
      "Math",
      "Bit Manipulation",
      "Game Theory",
      "Brainteaser"
    ],
    "testCases": [
      {
        "input": "[1,1,2]",
        "expectedOutput": "false",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[0,1]",
        "expectedOutput": "true",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1,2,3]",
        "expectedOutput": "true",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Frog Jump River Stones Dynamic Programming",
    "slug": "frog-jump-river-stones-dp",
    "description": "A frog is crossing a river. The river is divided into some number of units, and at each unit, there may or may not exist a stone. The frog can jump on a stone, but it must not jump into the water. Given a list of stones positions in sorted ascending order, determine if the frog can cross the river by landing on the last stone. Initially, the frog is on the first stone and assumes the first jump must be 1 unit. If the frog last jump was k units, its next jump must be either k - 1, k, or k + 1 units.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "2 <= stones.length <= 2000, 0 <= stones[i] <= 2^31 - 1, stones[0] == 0, stones is strictly increasing",
    "inputFormat": "stones",
    "outputFormat": "Boolean true if frog can reach the last stone, false otherwise.",
    "sampleInput": "[0,1,3,5,6,8,12,17]",
    "sampleOutput": "true",
    "points": 200,
    "hints": [
      "Map stone position to set of jump sizes that can reach it. For stone pos and jump k, frog can jump to pos+k-1, pos+k, pos+k+1."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def canCross(self, stones: list[int]) -> bool:\n        pass",
      "javascript": "class Solution {\n    canCross(stones) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def canCross(self, stones: list[int]) -> bool:\n        stone_set = set(stones)\n        last_stone = stones[-1]\n        dp = {s: set() for s in stones}\n        dp[0].add(0)\n        \n        for s in stones:\n            for k in dp[s]:\n                for step in (k - 1, k, k + 1):\n                    if step > 0 and (s + step) in stone_set:\n                        dp[s + step].add(step)\n                        \n        return len(dp[last_stone]) > 0",
      "javascript": "class Solution {\n    canCross(stones) {\n        const lastStone = stones[stones.length - 1];\n        const dp = new Map();\n        for (const s of stones) dp.set(s, new Set());\n        dp.get(0).add(0);\n\n        for (const s of stones) {\n            const jumps = dp.get(s);\n            for (const k of jumps) {\n                for (const step of [k - 1, k, k + 1]) {\n                    if (step > 0 && dp.has(s + step)) {\n                        dp.get(s + step).add(step);\n                    }\n                }\n            }\n        }\n        return dp.get(lastStone).size > 0;\n    }\n}"
    },
    "editorial": {
      "approach": "Hash Map DP of Reachable Jump Sizes.",
      "algorithm": "dp[stone] contains all jump distances k that can land on this stone. Propagate step in {k-1, k, k+1} forward.",
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(N^2)",
      "content": "Dynamic jump size propagation on sparse stone sequence.",
      "referenceCode": "dp[s + step].add(step)"
    },
    "tags": [
      "Dynamic Programming",
      "Hash Table",
      "Array"
    ],
    "testCases": [
      {
        "input": "[0,1,3,5,6,8,12,17]",
        "expectedOutput": "true",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[0,1,2,3,4,8,9,11]",
        "expectedOutput": "false",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[0,1]",
        "expectedOutput": "true",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Race Car Shortest Instructions BFS",
    "slug": "race-car-shortest-instructions-bfs",
    "description": "Your car starts at position 0 and speed +1 on an infinite number line. Your car can go into negative positions. Your car drives automatically according to a sequence of instructions \"A\" (accelerate) and \"R\" (reverse). \"A\" changes position to position + speed and speed to speed * 2. \"R\" leaves position unchanged, and changes speed to speed > 0 ? -1 : 1. Given a target position target, return the length of the shortest sequence of instructions to get there.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= target <= 10^4",
    "inputFormat": "target",
    "outputFormat": "Integer representing shortest sequence length.",
    "sampleInput": "3",
    "sampleOutput": "2",
    "points": 200,
    "hints": [
      "DP: dp[t] is min instructions for target t. Compute continuous forward steps 2^k - 1 and combinations of reverse."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def racecar(self, target: int) -> int:\n        pass",
      "javascript": "class Solution {\n    racecar(target) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def racecar(self, target: int) -> int:\n        dp = [0] * (target + 1)\n        for t in range(1, target + 1):\n            k = t.bit_length()\n            if t == (1 << k) - 1:\n                dp[t] = k\n                continue\n            # Case 1: Overshoot then reverse back\n            dp[t] = k + 1 + dp[(1 << k) - 1 - t]\n            # Case 2: Undershoot, reverse, go backward j steps, reverse and continue\n            for j in range(k - 1):\n                dp[t] = min(dp[t], (k - 1) + 1 + j + 1 + dp[t - (1 << (k - 1)) + (1 << j)])\n        return dp[target]",
      "javascript": "class Solution {\n    racecar(target) {\n        const dp = Array(target + 1).fill(0);\n        for (let t = 1; t <= target; t++) {\n            let k = 0;\n            while ((1 << k) - 1 < t) k++;\n            if ((1 << k) - 1 === t) {\n                dp[t] = k;\n                continue;\n            }\n            dp[t] = k + 1 + dp[(1 << k) - 1 - t];\n            for (let j = 0; j < k - 1; j++) {\n                const cand = (k - 1) + 1 + j + 1 + dp[t - (1 << (k - 1)) + (1 << j)];\n                if (cand < dp[t]) dp[t] = cand;\n            }\n        }\n        return dp[target];\n    }\n}"
    },
    "editorial": {
      "approach": "Dynamic Programming on Overshoot and Undershoot Strategies.",
      "algorithm": "For target t with bit length k: either accelerate k times (overshoot to 2^k - 1) and reverse; or accelerate k-1 times, reverse, go back j times, reverse and solve remainder.",
      "timeComplexity": "O(Target * log(Target))",
      "spaceComplexity": "O(Target)",
      "content": "Optimal instruction minimization via interval bit-length transitions.",
      "referenceCode": "dp[t] = min(dp[t], k - 1 + 1 + j + 1 + dp[rem])"
    },
    "tags": [
      "Dynamic Programming",
      "Breadth-First Search",
      "Math"
    ],
    "testCases": [
      {
        "input": "3",
        "expectedOutput": "2",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "6",
        "expectedOutput": "5",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "4",
        "expectedOutput": "5",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Maximum Score Words Formed by Letters",
    "slug": "maximum-score-words-formed-by-letters",
    "description": "Given a list of words, list of single letters (which might be repeating) and score of every character from a to z. Return the maximum score of any valid set of words formed by using the given letters (words[i] cannot be used multiple times). Each letter can only be used at most as many times as it appears in letters.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= words.length <= 14, 1 <= words[i].length <= 15, 1 <= letters.length <= 100, score.length == 26",
    "inputFormat": "words, letters, score",
    "outputFormat": "Integer representing maximum score.",
    "sampleInput": "[\"dog\",\"cat\",\"dad\",\"good\"], [\"a\",\"a\",\"c\",\"d\",\"d\",\"d\",\"g\",\"o\",\"o\"], [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]",
    "sampleOutput": "23",
    "points": 200,
    "hints": [
      "Since words.length <= 14, iterate through all 2^N subsets or use backtracking with frequency counting."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def maxScoreWords(self, words: list[str], letters: list[str], score: list[int]) -> int:\n        pass",
      "javascript": "class Solution {\n    maxScoreWords(words, letters, score) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def maxScoreWords(self, words: list[str], letters: list[str], score: list[int]) -> int:\n        import collections\n        letter_counts = collections.Counter(letters)\n        \n        def word_score_and_counts(w):\n            c = collections.Counter(w)\n            sc = sum(score[ord(ch) - ord('a')] for ch in w)\n            return c, sc\n            \n        parsed = [word_score_and_counts(w) for w in words]\n        n = len(words)\n        \n        def backtrack(idx, rem_counts):\n            if idx == n:\n                return 0\n            # Option 1: Skip word\n            best = backtrack(idx + 1, rem_counts)\n            \n            # Option 2: Take word if enough letters\n            wc, sc = parsed[idx]\n            if all(rem_counts[ch] >= wc[ch] for ch in wc):\n                for ch in wc:\n                    rem_counts[ch] -= wc[ch]\n                best = max(best, sc + backtrack(idx + 1, rem_counts))\n                for ch in wc:\n                    rem_counts[ch] += wc[ch]\n            return best\n            \n        return backtrack(0, letter_counts)",
      "javascript": "class Solution {\n    maxScoreWords(words, letters, score) {\n        const letterCounts = Array(26).fill(0);\n        for (const ch of letters) letterCounts[ch.charCodeAt(0) - 97]++;\n\n        const n = words.length;\n        const wordCounts = words.map(w => {\n            const cnt = Array(26).fill(0);\n            let s = 0;\n            for (let i = 0; i < w.length; i++) {\n                const code = w.charCodeAt(i) - 97;\n                cnt[code]++;\n                s += score[code];\n            }\n            return { cnt, s };\n        });\n\n        function backtrack(idx, rem) {\n            if (idx === n) return 0;\n            let best = backtrack(idx + 1, rem);\n\n            const { cnt, s } = wordCounts[idx];\n            let canTake = true;\n            for (let i = 0; i < 26; i++) {\n                if (rem[i] < cnt[i]) {\n                    canTake = false;\n                    break;\n                }\n            }\n\n            if (canTake) {\n                for (let i = 0; i < 26; i++) rem[i] -= cnt[i];\n                best = Math.max(best, s + backtrack(idx + 1, rem));\n                for (let i = 0; i < 26; i++) rem[i] += cnt[i];\n            }\n            return best;\n        }\n\n        return backtrack(0, letterCounts);\n    }\n}"
    },
    "editorial": {
      "approach": "Backtracking Search with Frequency Validation.",
      "algorithm": "Because N <= 14, standard take/skip backtracking runs in O(2^N * 26) with zero allocation overhead.",
      "timeComplexity": "O(2^N)",
      "spaceComplexity": "O(N)",
      "content": "Subset selection bounded by multi-resource inventory.",
      "referenceCode": "best = max(best, sc + backtrack(idx + 1, rem_counts))"
    },
    "tags": [
      "Backtracking",
      "Bit Manipulation",
      "Array",
      "String"
    ],
    "testCases": [
      {
        "input": "[\"dog\",\"cat\",\"dad\",\"good\"], [\"a\",\"a\",\"c\",\"d\",\"d\",\"d\",\"g\",\"o\",\"o\"], [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]",
        "expectedOutput": "23",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[\"xxxz\",\"ax\",\"bx\",\"cx\"], [\"z\",\"a\",\"b\",\"c\",\"x\",\"x\",\"x\"], [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,10]",
        "expectedOutput": "27",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[\"leetcode\"], [\"l\",\"e\",\"t\",\"c\",\"o\",\"d\"], [0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0]",
        "expectedOutput": "0",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Minimum Distance to Type a Word Using Two Fingers",
    "slug": "minimum-distance-to-type-a-word-two-fingers",
    "description": "You have a keyboard layout of 26 English letters in a 6-row grid: row i contains letters from i*6 to (i+1)*6 - 1. You have two fingers. Initially, both fingers can be placed on any letter for free (distance 0). The distance to move a finger from coordinate (x1, y1) to (x2, y2) is |x1 - x2| + |y1 - y2|. Given a string word, return the minimum total distance to type all characters.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "2 <= word.length <= 300, word consists of uppercase English letters",
    "inputFormat": "word",
    "outputFormat": "Integer representing minimum total distance.",
    "sampleInput": "\"CAKE\"",
    "sampleOutput": "3",
    "points": 200,
    "hints": [
      "At step i, one finger must be at word[i-1]. Track position of the other finger with DP: dp[other_finger]."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def minimumDistance(self, word: str) -> int:\n        pass",
      "javascript": "class Solution {\n    minimumDistance(word) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def minimumDistance(self, word: str) -> int:\n        def dist(a, b):\n            if a == 26:\n                return 0\n            x1, y1 = divmod(a, 6)\n            x2, y2 = divmod(b, 6)\n            return abs(x1 - x2) + abs(y1 - y2)\n            \n        # dp[other] = max saved distance compared to single finger typing\n        dp = [0] * 27\n        for i in range(len(word) - 1):\n            b = ord(word[i]) - ord('A')\n            c = ord(word[i + 1]) - ord('A')\n            d = dist(b, c)\n            nxt = dp[:]\n            for other in range(27):\n                nxt[b] = max(nxt[b], dp[other] + d - dist(other, c))\n            dp = nxt\n            \n        single_finger_cost = sum(dist(ord(word[i]) - ord('A'), ord(word[i + 1]) - ord('A')) for i in range(len(word) - 1))\n        return single_finger_cost - max(dp)",
      "javascript": "class Solution {\n    minimumDistance(word) {\n        function dist(a, b) {\n            if (a === 26) return 0;\n            const x1 = Math.floor(a / 6), y1 = a % 6;\n            const x2 = Math.floor(b / 6), y2 = b % 6;\n            return Math.abs(x1 - x2) + Math.abs(y1 - y2);\n        }\n\n        let dp = Array(27).fill(0);\n        let singleFingerCost = 0;\n\n        for (let i = 0; i < word.length - 1; i++) {\n            const b = word.charCodeAt(i) - 65;\n            const c = word.charCodeAt(i + 1) - 65;\n            const d = dist(b, c);\n            singleFingerCost += d;\n\n            const nextDp = dp.slice();\n            for (let other = 0; other < 27; other++) {\n                const cand = dp[other] + d - dist(other, c);\n                if (cand > nextDp[b]) nextDp[b] = cand;\n            }\n            dp = nextDp;\n        }\n\n        return singleFingerCost - Math.max(...dp);\n    }\n}"
    },
    "editorial": {
      "approach": "Single State Savings Dynamic Programming.",
      "algorithm": "Track the position of the free finger in state size 27. Maximize travel savings relative to typing all letters with 1 finger.",
      "timeComplexity": "O(26 * N)",
      "spaceComplexity": "O(26)",
      "content": "Relative savings optimization DP for multi-agent typing.",
      "referenceCode": "nxt[b] = max(nxt[b], dp[other] + d - dist(other, c))"
    },
    "tags": [
      "Dynamic Programming",
      "String"
    ],
    "testCases": [
      {
        "input": "\"CAKE\"",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"HAPPY\"",
        "expectedOutput": "6",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"NEW\"",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 2
      },
      {
        "input": "\"YEAR\"",
        "expectedOutput": "7",
        "isHidden": true,
        "order": 3
      }
    ]
  },
  {
    "title": "Find K-th Smallest Pair Distance Binary Search",
    "slug": "find-kth-smallest-pair-distance-bs",
    "description": "The distance of a pair of integers a and b is defined as the absolute difference |a - b|. Given an integer array nums and an integer k, return the kth smallest distance among all the pairs nums[i] and nums[j] where 0 <= i < j < nums.length.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "n == nums.length, 2 <= n <= 10^4, 0 <= nums[i] <= 10^6, 1 <= k <= n * (n - 1) / 2",
    "inputFormat": "nums, k",
    "outputFormat": "Integer representing the k-th smallest pair distance.",
    "sampleInput": "[1,3,1], 1",
    "sampleOutput": "0",
    "points": 200,
    "hints": [
      "Sort nums. Binary search target distance D in range [0, nums[-1] - nums[0]]. Use two pointers to count pairs with diff <= D."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def smallestDistancePair(self, nums: list[int], k: int) -> int:\n        pass",
      "javascript": "class Solution {\n    smallestDistancePair(nums, k) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def smallestDistancePair(self, nums: list[int], k: int) -> int:\n        nums.sort()\n        n = len(nums)\n        \n        def count_pairs(dist):\n            cnt = 0\n            left = 0\n            for right in range(n):\n                while nums[right] - nums[left] > dist:\n                    left += 1\n                cnt += right - left\n            return cnt\n            \n        low = 0\n        high = nums[-1] - nums[0]\n        ans = high\n        while low <= high:\n            mid = (low + high) // 2\n            if count_pairs(mid) >= k:\n                ans = mid\n                high = mid - 1\n            else:\n                low = mid + 1\n        return ans",
      "javascript": "class Solution {\n    smallestDistancePair(nums, k) {\n        nums.sort((a, b) => a - b);\n        const n = nums.length;\n\n        function countPairs(dist) {\n            let cnt = 0, left = 0;\n            for (let right = 0; right < n; right++) {\n                while (nums[right] - nums[left] > dist) {\n                    left++;\n                }\n                cnt += right - left;\n            }\n            return cnt;\n        }\n\n        let low = 0, high = nums[n - 1] - nums[0], ans = high;\n        while (low <= high) {\n            const mid = (low + high) >> 1;\n            if (countPairs(mid) >= k) {\n                ans = mid;\n                high = mid - 1;\n            } else {\n                low = mid + 1;\n            }\n        }\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "Binary Search on Value + Two Pointers Pair Counting.",
      "algorithm": "Sort nums. Predicate: countPairs(dist) counts pairs with diff <= dist using monotonic two pointers in O(N). Binary search answer in [0, max - min].",
      "timeComplexity": "O(N log(MaxDiff) + N log N)",
      "spaceComplexity": "O(1)",
      "content": "Kth order statistic over pairwise metric differences.",
      "referenceCode": "if count_pairs(mid) >= k: ans = mid; high = mid - 1"
    },
    "tags": [
      "Binary Search",
      "Two Pointers",
      "Array",
      "Sorting"
    ],
    "testCases": [
      {
        "input": "[1,3,1], 1",
        "expectedOutput": "0",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1,1,1], 2",
        "expectedOutput": "0",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1,6,1], 3",
        "expectedOutput": "5",
        "isHidden": false,
        "order": 2
      }
    ]
  },
  {
    "title": "Minimum Cost to Hire K Workers Heap Greedy",
    "slug": "minimum-cost-to-hire-k-workers-heap",
    "description": "There are n workers. You are given two integer arrays quality and wage where quality[i] is the quality of the ith worker and wage[i] is the minimum desired wage for the ith worker. We want to hire exactly k workers to form a paid group. Every worker in the paid group should be paid in the ratio of their quality compared to other workers, and every worker must be paid at least their minimum desired wage. Return the least amount of money needed to form a paid group satisfy these conditions.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "n == quality.length == wage.length, 1 <= k <= n <= 10^4, 1 <= quality[i], wage[i] <= 10^4",
    "inputFormat": "quality, wage, k",
    "outputFormat": "Float rounded to 5 decimal places or exact number.",
    "sampleInput": "[10,20,5], [70,50,30], 2",
    "sampleOutput": "105",
    "points": 200,
    "hints": [
      "Sort workers by ratio wage[i] / quality[i]. Maintain a max-heap of qualities of size k."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def mincostToHireWorkers(self, quality: list[int], wage: list[int], k: int) -> float:\n        pass",
      "javascript": "class Solution {\n    mincostToHireWorkers(quality, wage, k) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def mincostToHireWorkers(self, quality: list[int], wage: list[int], k: int) -> float:\n        import heapq\n        workers = sorted((w / q, q) for w, q in zip(wage, quality))\n        ans = float('inf')\n        quality_sum = 0\n        max_heap = []\n        \n        for ratio, q in workers:\n            quality_sum += q\n            heapq.heappush(max_heap, -q)\n            if len(max_heap) > k:\n                quality_sum += heapq.heappop(max_heap)\n            if len(max_heap) == k:\n                ans = min(ans, quality_sum * ratio)\n                \n        return round(ans, 5) if abs(ans - round(ans)) > 1e-9 else int(round(ans))",
      "javascript": "class Solution {\n    mincostToHireWorkers(quality, wage, k) {\n        const n = quality.length;\n        const workers = [];\n        for (let i = 0; i < n; i++) {\n            workers.push({ ratio: wage[i] / quality[i], q: quality[i] });\n        }\n        workers.sort((a, b) => a.ratio - b.ratio);\n\n        let ans = Infinity;\n        let qualitySum = 0;\n        const heap = []; // Simulated max heap\n\n        for (const { ratio, q } of workers) {\n            qualitySum += q;\n            heap.push(q);\n            heap.sort((a, b) => b - a);\n\n            if (heap.length > k) {\n                const popped = heap.shift();\n                qualitySum -= popped;\n            }\n\n            if (heap.length === k) {\n                const cost = qualitySum * ratio;\n                if (cost < ans) ans = cost;\n            }\n        }\n        return Math.abs(ans - Math.round(ans)) < 1e-9 ? Math.round(ans) : Number(ans.toFixed(5));\n    }\n}"
    },
    "editorial": {
      "approach": "Ratio Sorting + Max-Heap of Qualities.",
      "algorithm": "Fix the maximum wage-to-quality ratio in the group. To minimize total cost = (sum of qualities) * ratio, greedily pick k lowest qualities using a max-heap.",
      "timeComplexity": "O(N log N + N log K)",
      "spaceComplexity": "O(K)",
      "content": "Linearithmic heap greedy optimization under ratio constraints.",
      "referenceCode": "ans = min(ans, quality_sum * ratio)"
    },
    "tags": [
      "Greedy",
      "Heap",
      "Array",
      "Sorting"
    ],
    "testCases": [
      {
        "input": "[10,20,5], [70,50,30], 2",
        "expectedOutput": "105",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[3,1,10,10,1], [4,8,2,2,7], 3",
        "expectedOutput": "30.66667",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[4,5], [8,14], 2",
        "expectedOutput": "25.2",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Longest Chunked Palindrome Decomposition Greedy",
    "slug": "longest-chunked-palindrome-decomposition-greedy",
    "description": "You are given a string text. You should split it into k substrings (subtext_1, subtext_2, ..., subtext_k) such that: subtext_1 + ... + subtext_k == text and subtext_i == subtext_{k+1-i} for all 1 <= i <= k. Return the largest possible k.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= text.length <= 1000, text consists only of lowercase English characters",
    "inputFormat": "text",
    "outputFormat": "Integer representing maximum chunks k.",
    "sampleInput": "\"ghiabcdefhelloadamhelloabcdefghi\"",
    "sampleOutput": "7",
    "points": 200,
    "hints": [
      "Greedily match the shortest prefix with the matching suffix."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def longestDecomposition(self, text: str) -> int:\n        pass",
      "javascript": "class Solution {\n    longestDecomposition(text) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def longestDecomposition(self, text: str) -> int:\n        n = len(text)\n        ans = 0\n        left_str, right_str = \"\", \"\"\n        l, r = 0, n - 1\n        while l < r:\n            left_str += text[l]\n            right_str = text[r] + right_str\n            if left_str == right_str:\n                ans += 2\n                left_str, right_str = \"\", \"\"\n            l += 1\n            r -= 1\n        if l == r or left_str:\n            ans += 1\n        return ans",
      "javascript": "class Solution {\n    longestDecomposition(text) {\n        const n = text.length;\n        let ans = 0;\n        let leftStr = '', rightStr = '';\n        let l = 0, r = n - 1;\n        while (l < r) {\n            leftStr += text[l];\n            rightStr = text[r] + rightStr;\n            if (leftStr === rightStr) {\n                ans += 2;\n                leftStr = '';\n                rightStr = '';\n            }\n            l++;\n            r--;\n        }\n        if (l === r || leftStr.length > 0) ans++;\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "Greedy Rolling Prefix-Suffix Matching.",
      "algorithm": "Finding the shortest matching prefix and suffix leaves the largest remaining subproblem, yielding optimal chunk count.",
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(N)",
      "content": "Optimal greedy palindrome chunking.",
      "referenceCode": "if left_str == right_str: ans += 2; left_str, right_str = \"\", \"\""
    },
    "tags": [
      "Greedy",
      "Two Pointers",
      "String",
      "Rolling Hash"
    ],
    "testCases": [
      {
        "input": "\"ghiabcdefhelloadamhelloabcdefghi\"",
        "expectedOutput": "7",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"merchant\"",
        "expectedOutput": "1",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"antaprezatepzapreanta\"",
        "expectedOutput": "11",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Number of Valid Subarrays Monotonic Stack",
    "slug": "number-of-valid-subarrays-monotonic-stack",
    "description": "Given an integer array nums, return the number of non-empty continuous subarrays with the leftmost element being not larger than other elements in the subarray.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 5 * 10^4, 0 <= nums[i] <= 10^5",
    "inputFormat": "nums",
    "outputFormat": "Integer representing count of valid subarrays.",
    "sampleInput": "[1,4,2,5,3]",
    "sampleOutput": "11",
    "points": 200,
    "hints": [
      "A subarray starting at i is valid until the first element j > i where nums[j] < nums[i]. Use monotonic stack to find next smaller element."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def validSubarrays(self, nums: list[int]) -> int:\n        pass",
      "javascript": "class Solution {\n    validSubarrays(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def validSubarrays(self, nums: list[int]) -> int:\n        stack = []\n        ans = 0\n        n = len(nums)\n        for i, x in enumerate(nums):\n            while stack and nums[stack[-1]] > x:\n                idx = stack.pop()\n                ans += i - idx\n            stack.append(i)\n        while stack:\n            idx = stack.pop()\n            ans += n - idx\n        return ans",
      "javascript": "class Solution {\n    validSubarrays(nums) {\n        const stack = [];\n        let ans = 0;\n        const n = nums.length;\n        for (let i = 0; i < n; i++) {\n            while (stack.length > 0 && nums[stack[stack.length - 1]] > nums[i]) {\n                const idx = stack.pop();\n                ans += i - idx;\n            }\n            stack.push(i);\n        }\n        while (stack.length > 0) {\n            const idx = stack.pop();\n            ans += n - idx;\n        }\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "Monotonic Increasing Stack (Next Smaller Element).",
      "algorithm": "For each index i, elements where nums[k] >= nums[i] extend until the next strictly smaller element at index j. Number of valid subarrays starting at i is j - i.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Classic monotonic stack span contribution.",
      "referenceCode": "ans += i - idx"
    },
    "tags": [
      "Monotonic Stack",
      "Stack",
      "Array"
    ],
    "testCases": [
      {
        "input": "[1,4,2,5,3]",
        "expectedOutput": "11",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[2,2,2]",
        "expectedOutput": "6",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1,3,2,4,3,5]",
        "expectedOutput": "15",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Count Subarrays With Fixed Bounds Sliding Window",
    "slug": "count-subarrays-with-fixed-bounds-sliding",
    "description": "You are given an integer array nums and two integers minK and maxK. A fixed-bound subarray of nums is a subarray that satisfies the following conditions: The minimum value in the subarray is equal to minK. The maximum value in the subarray is equal to maxK. Return the number of fixed-bound subarrays.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "2 <= nums.length <= 10^5, 1 <= nums[i], minK, maxK <= 10^6",
    "inputFormat": "nums, minK, maxK",
    "outputFormat": "Integer representing count of fixed-bound subarrays.",
    "sampleInput": "[1,3,5,2,7,5], 1, 5",
    "sampleOutput": "2",
    "points": 200,
    "hints": [
      "Track latest minK position, latest maxK position, and latest invalid element outside [minK, maxK]."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def countSubarrays(self, nums: list[int], minK: int, maxK: int) -> int:\n        pass",
      "javascript": "class Solution {\n    countSubarrays(nums, minK, maxK) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def countSubarrays(self, nums: list[int], minK: int, maxK: int) -> int:\n        ans = 0\n        min_pos = max_pos = bad_pos = -1\n        for i, x in enumerate(nums):\n            if not (minK <= x <= maxK):\n                bad_pos = i\n            if x == minK:\n                min_pos = i\n            if x == maxK:\n                max_pos = i\n            ans += max(0, min(min_pos, max_pos) - bad_pos)\n        return ans",
      "javascript": "class Solution {\n    countSubarrays(nums, minK, maxK) {\n        let ans = 0;\n        let minPos = -1, maxPos = -1, badPos = -1;\n        for (let i = 0; i < nums.length; i++) {\n            const x = nums[i];\n            if (x < minK || x > maxK) badPos = i;\n            if (x === minK) minPos = i;\n            if (x === maxK) maxPos = i;\n            const validStarts = Math.min(minPos, maxPos) - badPos;\n            if (validStarts > 0) ans += validStarts;\n        }\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "3-Pointer Sliding Window Position Tracking.",
      "algorithm": "For each right boundary i: valid left start endpoints must be <= min(min_pos, max_pos) and > bad_pos. Contribution is max(0, min(min_pos, max_pos) - bad_pos).",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "content": "Linear pass endpoint index boundary calculus.",
      "referenceCode": "ans += max(0, min(min_pos, max_pos) - bad_pos)"
    },
    "tags": [
      "Array",
      "Two Pointers",
      "Sliding Window"
    ],
    "testCases": [
      {
        "input": "[1,3,5,2,7,5], 1, 5",
        "expectedOutput": "2",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1,1,1,1], 1, 1",
        "expectedOutput": "10",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1,2,3,4], 2, 3",
        "expectedOutput": "1",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Count Digit One Occurrences Digit Dynamic Programming",
    "slug": "count-digit-one-occurrences-digit-dp",
    "description": "Given an integer n, count the total number of digit 1 appearing in all non-negative integers less than or equal to n.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "0 <= n <= 10^9",
    "inputFormat": "n",
    "outputFormat": "Integer representing total count of digit 1s.",
    "sampleInput": "13",
    "sampleOutput": "6",
    "points": 200,
    "hints": [
      "Count contributions of 1 at each digit place value (units, tens, hundreds, ...)."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def countDigitOne(self, n: int) -> int:\n        pass",
      "javascript": "class Solution {\n    countDigitOne(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def countDigitOne(self, n: int) -> int:\n        cnt = 0\n        factor = 1\n        while factor <= n:\n            divider = factor * 10\n            cnt += (n // divider) * factor + min(max(n % divider - factor + 1, 0), factor)\n            factor *= 10\n        return cnt",
      "javascript": "class Solution {\n    countDigitOne(n) {\n        let cnt = 0;\n        let factor = 1;\n        while (factor <= n) {\n            const divider = factor * 10;\n            cnt += Math.floor(n / divider) * factor + Math.min(Math.max(n % divider - factor + 1, 0), factor);\n            factor *= 10;\n        }\n        return cnt;\n    }\n}"
    },
    "editorial": {
      "approach": "Positional Contribution Counting.",
      "algorithm": "For factor 10^k, count completed cycles (N // 10^(k+1)) * 10^k plus remainder contribution min(max(N % 10^(k+1) - 10^k + 1, 0), 10^k).",
      "timeComplexity": "O(log10(N))",
      "spaceComplexity": "O(1)",
      "content": "Exact place-value digit counting formula.",
      "referenceCode": "(n // divider) * factor + min(max(n % divider - factor + 1, 0), factor)"
    },
    "tags": [
      "Math",
      "Dynamic Programming",
      "Recursion"
    ],
    "testCases": [
      {
        "input": "13",
        "expectedOutput": "6",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "0",
        "expectedOutput": "0",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "100",
        "expectedOutput": "21",
        "isHidden": true,
        "order": 2
      }
    ]
  }
];
