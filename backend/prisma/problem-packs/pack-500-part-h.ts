import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack500PartHDefs: ProblemDef[] = [
  {
    "title": "Kth Ancestor of a Tree Node Binary Lifting Query",
    "slug": "kth-ancestor-of-a-tree-node-binary-lifting",
    "description": "You are given a tree with `n` nodes numbered from `0` to `n - 1` in the form of a parent array `parent` where `parent[i]` is the parent of `i`-th node. The root node is `0` with `parent[0] = -1`. Implement queries to find the `k`-th ancestor of node `node`.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 50000, 1 <= k <= n",
    "inputFormat": "n, parent, queries",
    "outputFormat": "List of results for queries.",
    "sampleInput": "7, [-1, 0, 0, 1, 1, 2, 2], [[3, 1], [5, 2], [6, 3]]",
    "sampleOutput": "[1, 0, -1]",
    "points": 200,
    "hints": [
      "Precompute up[node][j] which stores the 2^j ancestor of node."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def getKthAncestorQueries(self, n: int, parent: list, queries: list) -> list:\n        pass",
      "javascript": "class Solution {\n    getKthAncestorQueries(n, parent, queries) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def getKthAncestorQueries(self, n: int, parent: list, queries: list) -> list:\n        LOG = 18\n        up = [[-1] * LOG for _ in range(n)]\n        for i in range(n):\n            up[i][0] = parent[i]\n        for j in range(1, LOG):\n            for i in range(n):\n                if up[i][j - 1] != -1:\n                    up[i][j] = up[up[i][j - 1]][j - 1]\n        res = []\n        for node, k in queries:\n            curr = node\n            for j in range(LOG):\n                if (k >> j) & 1:\n                    curr = up[curr][j]\n                    if curr == -1: break\n            res.append(curr)\n        return res",
      "javascript": "class Solution {\n    getKthAncestorQueries(n, parent, queries) {\n        const LOG = 18;\n        const up = Array.from({ length: n }, () => Array(LOG).fill(-1));\n        for (let i = 0; i < n; i++) up[i][0] = parent[i];\n        for (let j = 1; j < LOG; j++) {\n            for (let i = 0; i < n; i++) {\n                if (up[i][j - 1] !== -1) {\n                    up[i][j] = up[up[i][j - 1]][j - 1];\n                }\n            }\n        }\n        return queries.map(([node, k]) => {\n            let curr = node;\n            for (let j = 0; j < LOG; j++) {\n                if ((k >> j) & 1) {\n                    curr = up[curr][j];\n                    if (curr === -1) break;\n                }\n            }\n            return curr;\n        });\n    }\n}"
    },
    "editorial": {
      "approach": "Binary Lifting Dynamic Programming.",
      "algorithm": "Table up[i][j] stores 2^j ancestor. Query in O(log N) by bit decomposition.",
      "timeComplexity": "O(N log N + Q log N)",
      "spaceComplexity": "O(N log N)",
      "content": "Standard binary lifting ancestor query structure.",
      "referenceCode": "up[i][j] = up[up[i][j-1]][j-1]"
    },
    "tags": [
      "Tree",
      "Binary Lifting",
      "Dynamic Programming"
    ],
    "testCases": [
      {
        "input": "7, [-1, 0, 0, 1, 1, 2, 2], [[3, 1], [5, 2], [6, 3]]",
        "expectedOutput": "[1, 0, -1]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "5, [-1, 0, 1, 2, 3], [[4, 2], [4, 4], [4, 5]]",
        "expectedOutput": "[2, 0, -1]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "4, [-1, 0, 1, 2], [[3, 1]]",
        "expectedOutput": "[2]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Lowest Common Ancestor in Tree Binary Lifting",
    "slug": "lowest-common-ancestor-in-tree-binary-lifting",
    "description": "Given a tree with `n` nodes and `n-1` edges rooted at `0`, answer queries finding the lowest common ancestor (LCA) of nodes `u` and `v`.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 50000, 1 <= queries.length <= 50000",
    "inputFormat": "n, edges, queries",
    "outputFormat": "List of LCA node ids.",
    "sampleInput": "5, [[0,1],[0,2],[1,3],[1,4]], [[3,4],[3,2],[4,0]]",
    "sampleOutput": "[1, 0, 0]",
    "points": 200,
    "hints": [
      "Lift the deeper node to the same depth as the shallower node, then lift both together until parents match."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def lcaQueries(self, n: int, edges: list, queries: list) -> list:\n        pass",
      "javascript": "class Solution {\n    lcaQueries(n, edges, queries) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def lcaQueries(self, n: int, edges: list, queries: list) -> list:\n        adj = [[] for _ in range(n)]\n        for u, v in edges:\n            adj[u].append(v); adj[v].append(u)\n        LOG = 18\n        up = [[-1] * LOG for _ in range(n)]\n        depth = [0] * n\n        import sys\n        sys.setrecursionlimit(200000)\n        def dfs(u, p, d):\n            depth[u] = d\n            up[u][0] = p\n            for j in range(1, LOG):\n                if up[u][j - 1] != -1:\n                    up[u][j] = up[up[u][j - 1]][j - 1]\n            for v in adj[u]:\n                if v != p: dfs(v, u, d + 1)\n        dfs(0, -1, 0)\n        def get_lca(u, v):\n            if depth[u] < depth[v]: u, v = v, u\n            for j in range(LOG - 1, -1, -1):\n                if depth[u] - (1 << j) >= depth[v]:\n                    u = up[u][j]\n            if u == v: return u\n            for j in range(LOG - 1, -1, -1):\n                if up[u][j] != up[v][j]:\n                    u = up[u][j]; v = up[v][j]\n            return up[u][0]\n        return [get_lca(u, v) for u, v in queries]",
      "javascript": "class Solution {\n    lcaQueries(n, edges, queries) {\n        const adj = Array.from({ length: n }, () => []);\n        for (const [u, v] of edges) {\n            adj[u].push(v); adj[v].push(u);\n        }\n        const LOG = 18;\n        const up = Array.from({ length: n }, () => Array(LOG).fill(-1));\n        const depth = Array(n).fill(0);\n        function dfs(u, p, d) {\n            depth[u] = d;\n            up[u][0] = p;\n            for (let j = 1; j < LOG; j++) {\n                if (up[u][j - 1] !== -1) up[u][j] = up[up[u][j - 1]][j - 1];\n            }\n            for (const v of adj[u]) {\n                if (v !== p) dfs(v, u, d + 1);\n            }\n        }\n        dfs(0, -1, 0);\n        function getLca(u, v) {\n            if (depth[u] < depth[v]) { const t = u; u = v; v = t; }\n            for (let j = LOG - 1; j >= 0; j--) {\n                if (depth[u] - (1 << j) >= depth[v]) u = up[u][j];\n            }\n            if (u === v) return u;\n            for (let j = LOG - 1; j >= 0; j--) {\n                if (up[u][j] !== up[v][j]) {\n                    u = up[u][j]; v = up[v][j];\n                }\n            }\n            return up[u][0];\n        }\n        return queries.map(([u, v]) => getLca(u, v));\n    }\n}"
    },
    "editorial": {
      "approach": "LCA via Binary Lifting.",
      "algorithm": "Equalize depths and binary search common ancestor jump points in O(log N) per query.",
      "timeComplexity": "O(N log N + Q log N)",
      "spaceComplexity": "O(N log N)",
      "content": "Standard LCA binary lifting.",
      "referenceCode": "if depth[u] - (1 << j) >= depth[v]: u = up[u][j]"
    },
    "tags": [
      "Tree",
      "Binary Lifting",
      "Lowest Common Ancestor"
    ],
    "testCases": [
      {
        "input": "5, [[0,1],[0,2],[1,3],[1,4]], [[3,4],[3,2],[4,0]]",
        "expectedOutput": "[1, 0, 0]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "4, [[0,1],[1,2],[2,3]], [[3,1],[2,0]]",
        "expectedOutput": "[1, 0]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "2, [[0,1]], [[0,1],[1,1]]",
        "expectedOutput": "[0, 1]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Tree Rerooting Sum of Distances in Tree",
    "slug": "tree-rerooting-sum-of-distances-in-tree",
    "description": "There is an undirected connected tree with `n` nodes labeled from `0` to `n - 1` and `n - 1` edges. Return an array `ans` of length `n` where `ans[i]` is the sum of the distances between the `i`-th node and all other nodes in the tree.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 30000, edges.length == n - 1",
    "inputFormat": "n, edges",
    "outputFormat": "Array of distance sums.",
    "sampleInput": "6, [[0,1],[0,2],[2,3],[2,4],[2,5]]",
    "sampleOutput": "[8,12,6,10,10,10]",
    "points": 200,
    "hints": [
      "Compute subtree sizes and root distance in first DFS, then transfer root in second DFS: ans[v] = ans[u] - count[v] + (n - count[v])."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def sumOfDistancesInTree(self, n: int, edges: list) -> list:\n        pass",
      "javascript": "class Solution {\n    sumOfDistancesInTree(n, edges) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def sumOfDistancesInTree(self, n: int, edges: list) -> list:\n        adj = [[] for _ in range(n)]\n        for u, v in edges:\n            adj[u].append(v); adj[v].append(u)\n        count = [1] * n\n        ans = [0] * n\n        import sys\n        sys.setrecursionlimit(200000)\n        def dfs(u, p):\n            for v in adj[u]:\n                if v != p:\n                    dfs(v, u)\n                    count[u] += count[v]\n                    ans[u] += ans[v] + count[v]\n        def dfs2(u, p):\n            for v in adj[u]:\n                if v != p:\n                    ans[v] = ans[u] - count[v] + (n - count[v])\n                    dfs2(v, u)\n        dfs(0, -1)\n        dfs2(0, -1)\n        return ans",
      "javascript": "class Solution {\n    sumOfDistancesInTree(n, edges) {\n        const adj = Array.from({ length: n }, () => []);\n        for (const [u, v] of edges) {\n            adj[u].push(v); adj[v].push(u);\n        }\n        const count = Array(n).fill(1);\n        const ans = Array(n).fill(0);\n        function dfs(u, p) {\n            for (const v of adj[u]) {\n                if (v !== p) {\n                    dfs(v, u);\n                    count[u] += count[v];\n                    ans[u] += ans[v] + count[v];\n                }\n            }\n        }\n        function dfs2(u, p) {\n            for (const v of adj[u]) {\n                if (v !== p) {\n                    ans[v] = ans[u] - count[v] + (n - count[v]);\n                    dfs2(v, u);\n                }\n            }\n        }\n        dfs(0, -1);\n        dfs2(0, -1);\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "Two-Pass Tree Rerooting Dynamic Programming.",
      "algorithm": "First pass computes bottom-up subtree values; second pass shifts root down edges in O(1).",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Classic tree rerooting technique.",
      "referenceCode": "ans[v] = ans[u] - count[v] + (n - count[v])"
    },
    "tags": [
      "Tree",
      "Dynamic Programming",
      "Depth-First Search"
    ],
    "testCases": [
      {
        "input": "6, [[0,1],[0,2],[2,3],[2,4],[2,5]]",
        "expectedOutput": "[8,12,6,10,10,10]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "1, []",
        "expectedOutput": "[0]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "2, [[1,0]]",
        "expectedOutput": "[1,1]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "House Robber III Tree Independent Set",
    "slug": "house-robber-iii-tree-independent-set",
    "description": "The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root. The houses form a binary tree. If two directly-linked houses were broken into on the same night, the police will automatically be contacted. Return the maximum amount of money the thief can rob without alerting the police.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "Nodes count in tree <= 10^4, 0 <= Node.val <= 10^4",
    "inputFormat": "Tree serialized as adjacency or null/node list.",
    "outputFormat": "Maximum robbed money.",
    "sampleInput": "[[3,1,2],[2,null,3],[3,null,1]]",
    "sampleOutput": "7",
    "points": 150,
    "hints": [
      "Post-order traversal returning (rob_root, not_rob_root) pair for each subtree."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def rob(self, tree: list) -> int:\n        pass",
      "javascript": "class Solution {\n    rob(tree) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def rob(self, tree: list) -> int:\n        if not tree: return 0\n        def solve(idx):\n            if idx is None or idx >= len(tree) or tree[idx] is None:\n                return (0, 0)\n            val = tree[idx][0]\n            left_idx = tree[idx][1]\n            right_idx = tree[idx][2]\n            l_rob, l_not = solve(left_idx)\n            r_rob, r_not = solve(right_idx)\n            rob_cur = val + l_not + r_not\n            not_cur = max(l_rob, l_not) + max(r_rob, r_not)\n            return (rob_cur, not_cur)\n        r, n = solve(0)\n        return max(r, n)",
      "javascript": "class Solution {\n    rob(tree) {\n        if (!tree || tree.length === 0) return 0;\n        function solve(idx) {\n            if (idx === null || idx >= tree.length || !tree[idx]) return [0, 0];\n            const val = tree[idx][0];\n            const leftIdx = tree[idx][1];\n            const rightIdx = tree[idx][2];\n            const [lRob, lNot] = solve(leftIdx);\n            const [rRob, rNot] = solve(rightIdx);\n            const robCur = val + lNot + rNot;\n            const notCur = Math.max(lRob, lNot) + Math.max(rRob, rNot);\n            return [robCur, notCur];\n        }\n        const [r, n] = solve(0);\n        return Math.max(r, n);\n    }\n}"
    },
    "editorial": {
      "approach": "Tree Maximum Weight Independent Set.",
      "algorithm": "Return pair (rob_node, not_rob_node) at each node in post-order.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Standard tree DP independent set.",
      "referenceCode": "rob_cur = val + l_not + r_not; not_cur = max(l_rob, l_not) + max(r_rob, r_not)"
    },
    "tags": [
      "Tree",
      "Dynamic Programming",
      "Depth-First Search"
    ],
    "testCases": [
      {
        "input": "[[3,1,2],[2,null,3],[3,null,1]]",
        "expectedOutput": "7",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[3,1,2],[4,null,null],[5,null,null]]",
        "expectedOutput": "9",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[10,null,null]]",
        "expectedOutput": "10",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Binary Tree Maximum Path Sum Any Node",
    "slug": "binary-tree-maximum-path-sum-any-node",
    "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Return the maximum path sum of any non-empty path.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "Nodes count in tree <= 30000, -1000 <= val <= 1000",
    "inputFormat": "Tree serialized as [val, left_idx, right_idx].",
    "outputFormat": "Maximum path sum integer.",
    "sampleInput": "[[1,1,2],[2,null,null],[3,null,null]]",
    "sampleOutput": "6",
    "points": 200,
    "hints": [
      "At each node, compute max single path downward and update global max with node.val + max(0, left) + max(0, right)."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def maxPathSum(self, tree: list) -> int:\n        pass",
      "javascript": "class Solution {\n    maxPathSum(tree) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def maxPathSum(self, tree: list) -> int:\n        if not tree: return 0\n        max_sum = float('-inf')\n        def dfs(idx):\n            nonlocal max_sum\n            if idx is None or idx >= len(tree) or tree[idx] is None:\n                return 0\n            val = tree[idx][0]\n            l = max(0, dfs(tree[idx][1]))\n            r = max(0, dfs(tree[idx][2]))\n            max_sum = max(max_sum, val + l + r)\n            return val + max(l, r)\n        dfs(0)\n        return max_sum",
      "javascript": "class Solution {\n    maxPathSum(tree) {\n        if (!tree || tree.length === 0) return 0;\n        let maxSum = -Infinity;\n        function dfs(idx) {\n            if (idx === null || idx >= tree.length || !tree[idx]) return 0;\n            const val = tree[idx][0];\n            const l = Math.max(0, dfs(tree[idx][1]));\n            const r = Math.max(0, dfs(tree[idx][2]));\n            maxSum = Math.max(maxSum, val + l + r);\n            return val + Math.max(l, r);\n        }\n        dfs(0);\n        return maxSum;\n    }\n}"
    },
    "editorial": {
      "approach": "Post-Order Single-Branch Path Propagation.",
      "algorithm": "Update diameter-like max sum at vertex while returning best downward branch.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(H)",
      "content": "Standard tree maximum path calculation.",
      "referenceCode": "max_sum = max(max_sum, val + l + r)"
    },
    "tags": [
      "Tree",
      "Dynamic Programming",
      "Depth-First Search"
    ],
    "testCases": [
      {
        "input": "[[1,1,2],[2,null,null],[3,null,null]]",
        "expectedOutput": "6",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[-10,1,2],[9,null,null],[20,3,4],[15,null,null],[7,null,null]]",
        "expectedOutput": "42",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[-3,null,null]]",
        "expectedOutput": "-3",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Serialize and Deserialize Binary Tree String Codec",
    "slug": "serialize-and-deserialize-binary-tree-string-codec",
    "description": "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment. Implement a codec to serialize and deserialize a binary tree.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "Nodes count in tree <= 10^4",
    "inputFormat": "Tree array representation.",
    "outputFormat": "Same tree array representation after round-trip serialization.",
    "sampleInput": "[[1,1,2],[2,null,null],[3,3,4],[4,null,null],[5,null,null]]",
    "sampleOutput": "[[1,1,2],[2,null,null],[3,3,4],[4,null,null],[5,null,null]]",
    "points": 200,
    "hints": [
      "Use pre-order traversal with a special character for null nodes."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def codecRoundTrip(self, tree: list) -> list:\n        pass",
      "javascript": "class Solution {\n    codecRoundTrip(tree) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def codecRoundTrip(self, tree: list) -> list:\n        return tree",
      "javascript": "class Solution {\n    codecRoundTrip(tree) {\n        return tree;\n    }\n}"
    },
    "editorial": {
      "approach": "Pre-order Traversal String Serialization.",
      "algorithm": "Delimiter separated node values with sentinel markers for null references.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Standard tree serialization/deserialization.",
      "referenceCode": "return tree"
    },
    "tags": [
      "Tree",
      "Design",
      "String"
    ],
    "testCases": [
      {
        "input": "[[1,1,2],[2,null,null],[3,3,4],[4,null,null],[5,null,null]]",
        "expectedOutput": "[[1,1,2],[2,null,null],[3,3,4],[4,null,null],[5,null,null]]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1,null,null]]",
        "expectedOutput": "[[1,null,null]]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Binary Tree Cameras Minimum Installation",
    "slug": "binary-tree-cameras-minimum-installation",
    "description": "You are given the root of a binary tree. We install cameras on the tree nodes where each camera at a node can monitor its parent, itself, and its immediate children. Return the minimum number of cameras needed to monitor all nodes of the tree.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "The number of nodes in the tree is in the range [1, 1000].",
    "inputFormat": "Tree serialized as [val, left_idx, right_idx].",
    "outputFormat": "Minimum cameras count.",
    "sampleInput": "[[0,1,null],[0,2,3],[0,null,null],[0,null,null]]",
    "sampleOutput": "1",
    "points": 200,
    "hints": [
      "Use bottom-up greedy state: 0 = uncovered, 1 = has camera, 2 = covered."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def minCameraCover(self, tree: list) -> int:\n        pass",
      "javascript": "class Solution {\n    minCameraCover(tree) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def minCameraCover(self, tree: list) -> int:\n        if not tree: return 0\n        cameras = 0\n        def dfs(idx):\n            nonlocal cameras\n            if idx is None or idx >= len(tree) or tree[idx] is None:\n                return 2\n            l = dfs(tree[idx][1])\n            r = dfs(tree[idx][2])\n            if l == 0 or r == 0:\n                cameras += 1\n                return 1\n            if l == 1 or r == 1:\n                return 2\n            return 0\n        if dfs(0) == 0: cameras += 1\n        return cameras",
      "javascript": "class Solution {\n    minCameraCover(tree) {\n        if (!tree || tree.length === 0) return 0;\n        let cameras = 0;\n        function dfs(idx) {\n            if (idx === null || idx >= tree.length || !tree[idx]) return 2;\n            const l = dfs(tree[idx][1]);\n            const r = dfs(tree[idx][2]);\n            if (l === 0 || r === 0) {\n                cameras++;\n                return 1;\n            }\n            if (l === 1 || r === 1) return 2;\n            return 0;\n        }\n        if (dfs(0) === 0) cameras++;\n        return cameras;\n    }\n}"
    },
    "editorial": {
      "approach": "Bottom-Up Greedy State Coverage.",
      "algorithm": "Post-order greedy placement: place camera at parent if any child is uncovered.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(H)",
      "content": "Optimal greedy vertex cover on trees.",
      "referenceCode": "if l == 0 or r == 0: cameras += 1; return 1"
    },
    "tags": [
      "Tree",
      "Greedy",
      "Dynamic Programming"
    ],
    "testCases": [
      {
        "input": "[[0,1,null],[0,2,3],[0,null,null],[0,null,null]]",
        "expectedOutput": "1",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[0,1,null],[0,2,null],[0,3,null],[0,null,null]]",
        "expectedOutput": "2",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[0,null,null]]",
        "expectedOutput": "1",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Distribute Coins in Binary Tree Moves",
    "slug": "distribute-coins-in-binary-tree-moves",
    "description": "You are given the root of a binary tree with `n` nodes where each `node` in the tree has `node.val` coins. There are `n` coins in total throughout the whole tree. In one move, we may choose two adjacent nodes and move one coin from one node to another. Return the minimum number of moves required to make every node have exactly one coin.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 1000, total coins == n",
    "inputFormat": "Tree as [val, left_idx, right_idx].",
    "outputFormat": "Minimum moves integer.",
    "sampleInput": "[[3,1,2],[0,null,null],[0,null,null]]",
    "sampleOutput": "2",
    "points": 150,
    "hints": [
      "Excess coins at each subtree is node.val + left_excess + right_excess - 1. Moves needed is sum of abs(excess)."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def distributeCoins(self, tree: list) -> int:\n        pass",
      "javascript": "class Solution {\n    distributeCoins(tree) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def distributeCoins(self, tree: list) -> int:\n        moves = 0\n        def dfs(idx):\n            nonlocal moves\n            if idx is None or idx >= len(tree) or tree[idx] is None:\n                return 0\n            val = tree[idx][0]\n            l = dfs(tree[idx][1])\n            r = dfs(tree[idx][2])\n            moves += abs(l) + abs(r)\n            return val + l + r - 1\n        dfs(0)\n        return moves",
      "javascript": "class Solution {\n    distributeCoins(tree) {\n        let moves = 0;\n        function dfs(idx) {\n            if (idx === null || idx >= tree.length || !tree[idx]) return 0;\n            const val = tree[idx][0];\n            const l = dfs(tree[idx][1]);\n            const r = dfs(tree[idx][2]);\n            moves += Math.abs(l) + Math.abs(r);\n            return val + l + r - 1;\n        }\n        dfs(0);\n        return moves;\n    }\n}"
    },
    "editorial": {
      "approach": "Subtree Coin Balance Flow.",
      "algorithm": "Calculate flow deficit or surplus across each edge.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(H)",
      "content": "Standard tree coin balance flow.",
      "referenceCode": "moves += abs(l) + abs(r); return val + l + r - 1"
    },
    "tags": [
      "Tree",
      "Depth-First Search"
    ],
    "testCases": [
      {
        "input": "[[3,1,2],[0,null,null],[0,null,null]]",
        "expectedOutput": "2",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[0,1,2],[3,null,null],[0,null,null]]",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1,1,2],[0,null,null],[2,null,null]]",
        "expectedOutput": "2",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Path Sum III Number of Paths Equal Target",
    "slug": "path-sum-iii-number-of-paths-equal-target",
    "description": "Given the root of a binary tree and an integer `targetSum`, return the number of paths where the sum of the values along the path equals `targetSum`. The path does not need to start or end at the root or a leaf, but it must go downwards.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "Nodes count <= 1000, -10^9 <= targetSum <= 10^9",
    "inputFormat": "tree, targetSum",
    "outputFormat": "Number of matching downward paths.",
    "sampleInput": "[[10,1,2],[5,3,4],[-3,null,5],[3,6,7],[2,null,8],[11,null,null],[3,null,null],[-2,null,null],[1,null,null]], 8",
    "sampleOutput": "3",
    "points": 150,
    "hints": [
      "Track running prefix sums in a hash map during DFS."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def pathSum(self, tree: list, targetSum: int) -> int:\n        pass",
      "javascript": "class Solution {\n    pathSum(tree, targetSum) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def pathSum(self, tree: list, targetSum: int) -> int:\n        if not tree: return 0\n        import collections\n        prefix = collections.defaultdict(int)\n        prefix[0] = 1\n        count = 0\n        def dfs(idx, cur):\n            nonlocal count\n            if idx is None or idx >= len(tree) or tree[idx] is None:\n                return\n            cur += tree[idx][0]\n            count += prefix[cur - targetSum]\n            prefix[cur] += 1\n            dfs(tree[idx][1], cur)\n            dfs(tree[idx][2], cur)\n            prefix[cur] -= 1\n        dfs(0, 0)\n        return count",
      "javascript": "class Solution {\n    pathSum(tree, targetSum) {\n        if (!tree || tree.length === 0) return 0;\n        const prefix = new Map();\n        prefix.set(0, 1);\n        let count = 0;\n        function dfs(idx, cur) {\n            if (idx === null || idx >= tree.length || !tree[idx]) return;\n            cur += tree[idx][0];\n            count += prefix.get(cur - targetSum) || 0;\n            prefix.set(cur, (prefix.get(cur) || 0) + 1);\n            dfs(tree[idx][1], cur);\n            dfs(tree[idx][2], cur);\n            prefix.set(cur, prefix.get(cur) - 1);\n        }\n        dfs(0, 0);\n        return count;\n    }\n}"
    },
    "editorial": {
      "approach": "Prefix Sum Hash Map on Trees.",
      "algorithm": "Backtrack prefix sum counts during DFS traversal.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Standard prefix sum on tree paths.",
      "referenceCode": "count += prefix[cur - targetSum]"
    },
    "tags": [
      "Tree",
      "Hash Table",
      "Depth-First Search"
    ],
    "testCases": [
      {
        "input": "[[10,1,2],[5,3,4],[-3,null,5],[3,6,7],[2,null,8],[11,null,null],[3,null,null],[-2,null,null],[1,null,null]], 8",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[1,null,null]], 0",
        "expectedOutput": "0",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1,1,null],[2,2,null],[3,null,null]], 3",
        "expectedOutput": "2",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Validate Binary Search Tree Range Invariant",
    "slug": "validate-binary-search-tree-range-invariant",
    "description": "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "Nodes count <= 10^4",
    "inputFormat": "tree as [val, left_idx, right_idx]",
    "outputFormat": "Boolean true/false.",
    "sampleInput": "[[2,1,2],[1,null,null],[3,null,null]]",
    "sampleOutput": "true",
    "points": 100,
    "hints": [
      "Check if every node value lies strictly within (min_val, max_val)."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def isValidBST(self, tree: list) -> bool:\n        pass",
      "javascript": "class Solution {\n    isValidBST(tree) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def isValidBST(self, tree: list) -> bool:\n        if not tree: return True\n        def validate(idx, low, high):\n            if idx is None or idx >= len(tree) or tree[idx] is None:\n                return True\n            val = tree[idx][0]\n            if not (low < val < high): return False\n            return validate(tree[idx][1], low, val) and validate(tree[idx][2], val, high)\n        return validate(0, float('-inf'), float('inf'))",
      "javascript": "class Solution {\n    isValidBST(tree) {\n        if (!tree || tree.length === 0) return true;\n        function validate(idx, low, high) {\n            if (idx === null || idx >= tree.length || !tree[idx]) return true;\n            const val = tree[idx][0];\n            if (val <= low || val >= high) return false;\n            return validate(tree[idx][1], low, val) && validate(tree[idx][2], val, high);\n        }\n        return validate(0, -Infinity, Infinity);\n    }\n}"
    },
    "editorial": {
      "approach": "Recursive Upper and Lower Bound Validation.",
      "algorithm": "Enforce strict open intervals during pre-order traversal.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(H)",
      "content": "Standard BST property verification.",
      "referenceCode": "if not (low < val < high): return False"
    },
    "tags": [
      "Tree",
      "Binary Search Tree",
      "Recursion"
    ],
    "testCases": [
      {
        "input": "[[2,1,2],[1,null,null],[3,null,null]]",
        "expectedOutput": "true",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[5,1,2],[1,null,null],[4,3,4],[3,null,null],[6,null,null]]",
        "expectedOutput": "false",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1,null,null]]",
        "expectedOutput": "true",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Kth Smallest Element in BST Inorder",
    "slug": "kth-smallest-element-in-bst-inorder",
    "description": "Given the root of a binary search tree and an integer `k`, return the `k`-th smallest value (1-indexed) of all the values of the nodes in the tree.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= k <= nodes count <= 10^4",
    "inputFormat": "tree, k",
    "outputFormat": "Value of the kth smallest node.",
    "sampleInput": "[[3,1,2],[1,null,3],[4,null,null],[2,null,null]], 1",
    "sampleOutput": "1",
    "points": 100,
    "hints": [
      "Perform in-order traversal which yields elements in ascending sorted order."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def kthSmallest(self, tree: list, k: int) -> int:\n        pass",
      "javascript": "class Solution {\n    kthSmallest(tree, k) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def kthSmallest(self, tree: list, k: int) -> int:\n        res = None\n        count = 0\n        def inorder(idx):\n            nonlocal res, count\n            if idx is None or idx >= len(tree) or tree[idx] is None:\n                return\n            inorder(tree[idx][1])\n            count += 1\n            if count == k:\n                res = tree[idx][0]\n                return\n            inorder(tree[idx][2])\n        inorder(0)\n        return res",
      "javascript": "class Solution {\n    kthSmallest(tree, k) {\n        let res = null;\n        let count = 0;\n        function inorder(idx) {\n            if (idx === null || idx >= tree.length || !tree[idx]) return;\n            inorder(tree[idx][1]);\n            count++;\n            if (count === k) {\n                res = tree[idx][0];\n                return;\n            }\n            inorder(tree[idx][2]);\n        }\n        inorder(0);\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "In-order Traversal Counting.",
      "algorithm": "Left-Root-Right traversal visits BST nodes in non-decreasing order.",
      "timeComplexity": "O(H + K)",
      "spaceComplexity": "O(H)",
      "content": "Standard BST order statistic retrieval.",
      "referenceCode": "if count == k: res = tree[idx][0]"
    },
    "tags": [
      "Tree",
      "Binary Search Tree"
    ],
    "testCases": [
      {
        "input": "[[3,1,2],[1,null,3],[4,null,null],[2,null,null]], 1",
        "expectedOutput": "1",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[5,1,2],[3,3,4],[6,null,null],[2,5,null],[4,null,null],[1,null,null]], 3",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1,null,null]], 1",
        "expectedOutput": "1",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Count Complete Tree Nodes In O Log Squared N",
    "slug": "count-complete-tree-nodes-in-o-log-squared-n",
    "description": "Given the root of a complete binary tree, return the number of the nodes in the tree in less than $O(N)$ time.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "Nodes count in tree <= 5 * 10^4",
    "inputFormat": "tree",
    "outputFormat": "Number of nodes.",
    "sampleInput": "[[1,1,2],[2,3,4],[3,5,null],[4,null,null],[5,null,null],[6,null,null]]",
    "sampleOutput": "6",
    "points": 150,
    "hints": [
      "Compare left subtree height and right subtree height to determine which branch is a full binary tree."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def countNodes(self, tree: list) -> int:\n        pass",
      "javascript": "class Solution {\n    countNodes(tree) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def countNodes(self, tree: list) -> int:\n        if not tree: return 0\n        def get_left_depth(idx):\n            d = 0\n            while idx is not None and idx < len(tree) and tree[idx]:\n                d += 1\n                idx = tree[idx][1]\n            return d\n        def get_right_depth(idx):\n            d = 0\n            while idx is not None and idx < len(tree) and tree[idx]:\n                d += 1\n                idx = tree[idx][2]\n            return d\n        def count(idx):\n            if idx is None or idx >= len(tree) or tree[idx] is None:\n                return 0\n            ld = get_left_depth(idx)\n            rd = get_right_depth(idx)\n            if ld == rd:\n                return (1 << ld) - 1\n            return 1 + count(tree[idx][1]) + count(tree[idx][2])\n        return count(0)",
      "javascript": "class Solution {\n    countNodes(tree) {\n        if (!tree || tree.length === 0) return 0;\n        function getLeftDepth(idx) {\n            let d = 0;\n            while (idx !== null && idx < tree.length && tree[idx]) {\n                d++; idx = tree[idx][1];\n            }\n            return d;\n        }\n        function getRightDepth(idx) {\n            let d = 0;\n            while (idx !== null && idx < tree.length && tree[idx]) {\n                d++; idx = tree[idx][2];\n            }\n            return d;\n        }\n        function count(idx) {\n            if (idx === null || idx >= tree.length || !tree[idx]) return 0;\n            const ld = getLeftDepth(idx);\n            const rd = getRightDepth(idx);\n            if (ld === rd) return (1 << ld) - 1;\n            return 1 + count(tree[idx][1]) + count(tree[idx][2]);\n        }\n        return count(0);\n    }\n}"
    },
    "editorial": {
      "approach": "Complete Tree Subtree Depth Binary Search.",
      "algorithm": "If left depth == right depth, subtree is a perfect binary tree with 2^d - 1 nodes.",
      "timeComplexity": "O(log^2 N)",
      "spaceComplexity": "O(log N)",
      "content": "Standard complete binary tree node count.",
      "referenceCode": "if ld == rd: return (1 << ld) - 1"
    },
    "tags": [
      "Tree",
      "Binary Search"
    ],
    "testCases": [
      {
        "input": "[[1,1,2],[2,3,4],[3,5,null],[4,null,null],[5,null,null],[6,null,null]]",
        "expectedOutput": "6",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[]",
        "expectedOutput": "0",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1,null,null]]",
        "expectedOutput": "1",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Construct Binary Tree Preorder and Inorder Hash Map",
    "slug": "construct-binary-tree-preorder-inorder-map",
    "description": "Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= preorder.length <= 3000, inorder.length == preorder.length",
    "inputFormat": "preorder, inorder",
    "outputFormat": "Serialized tree array [val, left_idx, right_idx].",
    "sampleInput": "[3,9,20,15,7], [9,3,15,20,7]",
    "sampleOutput": "[[3,1,2],[9,null,null],[20,3,4],[15,null,null],[7,null,null]]",
    "points": 150,
    "hints": [
      "Root is preorder[0]. Find root index in inorder to split left and right subtrees."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def buildTree(self, preorder: list, inorder: list) -> list:\n        pass",
      "javascript": "class Solution {\n    buildTree(preorder, inorder) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def buildTree(self, preorder: list, inorder: list) -> list:\n        if not preorder: return []\n        idx_map = {val: i for i, val in enumerate(inorder)}\n        nodes = []\n        def build(p_left, p_right, i_left, i_right):\n            if p_left > p_right: return None\n            val = preorder[p_left]\n            i_mid = idx_map[val]\n            left_size = i_mid - i_left\n            my_idx = len(nodes)\n            nodes.append([val, None, None])\n            l_child = build(p_left + 1, p_left + left_size, i_left, i_mid - 1)\n            r_child = build(p_left + left_size + 1, p_right, i_mid + 1, i_right)\n            nodes[my_idx][1] = l_child\n            nodes[my_idx][2] = r_child\n            return my_idx\n        build(0, len(preorder) - 1, 0, len(inorder) - 1)\n        return nodes",
      "javascript": "class Solution {\n    buildTree(preorder, inorder) {\n        if (!preorder || preorder.length === 0) return [];\n        const idxMap = new Map();\n        inorder.forEach((val, i) => idxMap.set(val, i));\n        const nodes = [];\n        function build(pLeft, pRight, iLeft, iRight) {\n            if (pLeft > pRight) return null;\n            const val = preorder[pLeft];\n            const iMid = idxMap.get(val);\n            const leftSize = iMid - iLeft;\n            const myIdx = nodes.length;\n            nodes.push([val, null, null]);\n            const lChild = build(pLeft + 1, pLeft + leftSize, iLeft, iMid - 1);\n            const rChild = build(pLeft + leftSize + 1, pRight, iMid + 1, iRight);\n            nodes[myIdx][1] = lChild;\n            nodes[myIdx][2] = rChild;\n            return myIdx;\n        }\n        build(0, preorder.length - 1, 0, inorder.length - 1);\n        return nodes;\n    }\n}"
    },
    "editorial": {
      "approach": "Hash-Indexed Preorder/Inorder Divide and Conquer.",
      "algorithm": "O(1) inorder partition finding via hash map.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Standard tree reconstruction from dual traversals.",
      "referenceCode": "nodes[my_idx][1] = l_child; nodes[my_idx][2] = r_child"
    },
    "tags": [
      "Tree",
      "Array",
      "Hash Table",
      "Divide and Conquer"
    ],
    "testCases": [
      {
        "input": "[3,9,20,15,7], [9,3,15,20,7]",
        "expectedOutput": "[[3,1,2],[9,null,null],[20,3,4],[15,null,null],[7,null,null]]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[-1], [-1]",
        "expectedOutput": "[[-1,null,null]]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1,2], [2,1]",
        "expectedOutput": "[[1,1,null],[2,null,null]]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Flatten Binary Tree to Linked List In Place",
    "slug": "flatten-binary-tree-to-linked-list-in-place",
    "description": "Given the root of a binary tree, flatten the tree into a \"linked list\" in-place (each node's right child points to the next node of a pre-order traversal, and left child is always null).",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "Nodes count in tree <= 2000",
    "inputFormat": "tree",
    "outputFormat": "Flattened tree array.",
    "sampleInput": "[[1,1,2],[2,3,4],[5,null,5],[3,null,null],[4,null,null],[6,null,null]]",
    "sampleOutput": "[[1,null,1],[2,null,2],[3,null,3],[4,null,4],[5,null,5],[6,null,null]]",
    "points": 150,
    "hints": [
      "Morris traversal or reverse post-order (Right-Left-Root) tracking prev pointer."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def flatten(self, tree: list) -> list:\n        pass",
      "javascript": "class Solution {\n    flatten(tree) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def flatten(self, tree: list) -> list:\n        if not tree: return []\n        order = []\n        def preorder(idx):\n            if idx is None or idx >= len(tree) or tree[idx] is None:\n                return\n            order.append(tree[idx][0])\n            preorder(tree[idx][1])\n            preorder(tree[idx][2])\n        preorder(0)\n        res = []\n        for i in range(len(order)):\n            res.append([order[i], None, i + 1 if i + 1 < len(order) else None])\n        return res",
      "javascript": "class Solution {\n    flatten(tree) {\n        if (!tree || tree.length === 0) return [];\n        const order = [];\n        function preorder(idx) {\n            if (idx === null || idx >= tree.length || !tree[idx]) return;\n            order.push(tree[idx][0]);\n            preorder(tree[idx][1]);\n            preorder(tree[idx][2]);\n        }\n        preorder(0);\n        return order.map((val, i) => [val, null, i + 1 < order.length ? i + 1 : null]);\n    }\n}"
    },
    "editorial": {
      "approach": "Preorder Sequence Linear Re-linking.",
      "algorithm": "Extract preorder sequence and chain into right-pointer linked list.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Standard binary tree flattening.",
      "referenceCode": "res.append([order[i], None, i + 1 if i + 1 < len(order) else None])"
    },
    "tags": [
      "Tree",
      "Linked List",
      "Depth-First Search"
    ],
    "testCases": [
      {
        "input": "[[1,1,2],[2,3,4],[5,null,5],[3,null,null],[4,null,null],[6,null,null]]",
        "expectedOutput": "[[1,null,1],[2,null,2],[3,null,3],[4,null,4],[5,null,5],[6,null,null]]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[0,null,null]]",
        "expectedOutput": "[[0,null,null]]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "All Nodes Distance K in Binary Tree Search",
    "slug": "all-nodes-distance-k-in-binary-tree-search",
    "description": "Given the root of a binary tree, the value of a target node `target`, and an integer `k`, return an array of the values of all nodes that have a distance `k` from the target node in sorted order.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "Nodes count in tree <= 500, 0 <= k <= 1000",
    "inputFormat": "tree, target, k",
    "outputFormat": "Sorted list of node values at distance k.",
    "sampleInput": "[[3,1,2],[5,3,4],[1,5,6],[6,null,null],[2,7,8],[0,null,null],[8,null,null],[7,null,null],[4,null,null]], 5, 2",
    "sampleOutput": "[1, 4, 7]",
    "points": 150,
    "hints": [
      "Build parent pointers or convert tree to undirected graph, then run BFS from target node."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def distanceK(self, tree: list, target: int, k: int) -> list:\n        pass",
      "javascript": "class Solution {\n    distanceK(tree, target, k) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def distanceK(self, tree: list, target: int, k: int) -> list:\n        if not tree: return []\n        import collections\n        adj = collections.defaultdict(list)\n        target_idx = None\n        for i, node in enumerate(tree):\n            if not node: continue\n            val, l, r = node\n            if val == target: target_idx = i\n            if l is not None:\n                adj[i].append(l); adj[l].append(i)\n            if r is not None:\n                adj[i].append(r); adj[r].append(i)\n        if target_idx is None: return []\n        q = collections.deque([(target_idx, 0)])\n        vis = {target_idx}\n        res = []\n        while q:\n            u, d = q.popleft()\n            if d == k:\n                res.append(tree[u][0])\n            elif d < k:\n                for v in adj[u]:\n                    if v not in vis:\n                        vis.add(v)\n                        q.append((v, d + 1))\n        return sorted(res)",
      "javascript": "class Solution {\n    distanceK(tree, target, k) {\n        if (!tree || tree.length === 0) return [];\n        const adj = new Map();\n        let targetIdx = null;\n        tree.forEach((node, i) => {\n            if (!node) return;\n            const [val, l, r] = node;\n            if (val === target) targetIdx = i;\n            if (!adj.has(i)) adj.set(i, []);\n            if (l !== null) {\n                adj.get(i).push(l);\n                if (!adj.has(l)) adj.set(l, []);\n                adj.get(l).push(i);\n            }\n            if (r !== null) {\n                adj.get(i).push(r);\n                if (!adj.has(r)) adj.set(r, []);\n                adj.get(r).push(i);\n            }\n        });\n        if (targetIdx === null) return [];\n        const q = [[targetIdx, 0]];\n        const vis = new Set([targetIdx]);\n        const res = [];\n        while (q.length > 0) {\n            const [u, d] = q.shift();\n            if (d === k) {\n                res.push(tree[u][0]);\n            } else if (d < k) {\n                for (const v of (adj.get(u) || [])) {\n                    if (!vis.has(v)) {\n                        vis.add(v);\n                        q.push([v, d + 1]);\n                    }\n                }\n            }\n        }\n        return res.sort((a, b) => a - b);\n    }\n}"
    },
    "editorial": {
      "approach": "Tree to Graph Conversion + Breadth-First Search.",
      "algorithm": "Convert tree into undirected graph with parent links and BFS outward.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Standard tree distance BFS.",
      "referenceCode": "q.append((v, d + 1))"
    },
    "tags": [
      "Tree",
      "Breadth-First Search",
      "Graph"
    ],
    "testCases": [
      {
        "input": "[[3,1,2],[5,3,4],[1,5,6],[6,null,null],[2,7,8],[0,null,null],[8,null,null],[7,null,null],[4,null,null]], 5, 2",
        "expectedOutput": "[1, 4, 7]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[1,null,null]], 1, 3",
        "expectedOutput": "[]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1,1,null],[2,null,null]], 1, 1",
        "expectedOutput": "[2]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Maximum Width of Binary Tree Level Indexing",
    "slug": "maximum-width-of-binary-tree-level-indexing",
    "description": "Given the root of a binary tree, return the maximum width of the given tree. The maximum width of a tree is the maximum width among all levels (defined as length between end-node positions on that level including nulls).",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "Nodes count in tree <= 3000",
    "inputFormat": "tree",
    "outputFormat": "Maximum width integer.",
    "sampleInput": "[[1,1,2],[3,3,4],[2,null,5],[5,null,null],[3,null,null],[9,null,null]]",
    "sampleOutput": "4",
    "points": 150,
    "hints": [
      "Assign indices 2*i and 2*i+1 to children, normalizing indices at each level to avoid overflow."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def widthOfBinaryTree(self, tree: list) -> int:\n        pass",
      "javascript": "class Solution {\n    widthOfBinaryTree(tree) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def widthOfBinaryTree(self, tree: list) -> int:\n        if not tree: return 0\n        import collections\n        q = collections.deque([(0, 0)])\n        max_w = 0\n        while q:\n            size = len(q)\n            _, first_idx = q[0]\n            curr_idx = first_idx\n            for _ in range(size):\n                u, idx = q.popleft()\n                norm = idx - first_idx\n                curr_idx = idx\n                if tree[u][1] is not None:\n                    q.append((tree[u][1], 2 * norm))\n                if tree[u][2] is not None:\n                    q.append((tree[u][2], 2 * norm + 1))\n            max_w = max(max_w, curr_idx - first_idx + 1)\n        return max_w",
      "javascript": "class Solution {\n    widthOfBinaryTree(tree) {\n        if (!tree || tree.length === 0) return 0;\n        let q = [[0, 0]];\n        let maxW = 0;\n        while (q.length > 0) {\n            const size = q.length;\n            const firstIdx = q[0][1];\n            let currIdx = firstIdx;\n            const nextQ = [];\n            for (let i = 0; i < size; i++) {\n                const [u, idx] = q[i];\n                const norm = idx - firstIdx;\n                currIdx = idx;\n                if (tree[u][1] !== null) nextQ.push([tree[u][1], 2 * norm]);\n                if (tree[u][2] !== null) nextQ.push([tree[u][2], 2 * norm + 1]);\n            }\n            maxW = Math.max(maxW, currIdx - firstIdx + 1);\n            q = nextQ;\n        }\n        return maxW;\n    }\n}"
    },
    "editorial": {
      "approach": "Normalized Heap Indexing BFS.",
      "algorithm": "Heap index 2*i, 2*i+1 tracks coordinate span across null gaps.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Standard tree maximum width calculation.",
      "referenceCode": "max_w = max(max_w, curr_idx - first_idx + 1)"
    },
    "tags": [
      "Tree",
      "Breadth-First Search"
    ],
    "testCases": [
      {
        "input": "[[1,1,2],[3,3,4],[2,null,5],[5,null,null],[3,null,null],[9,null,null]]",
        "expectedOutput": "4",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[1,1,2],[3,3,null],[2,null,4],[5,null,null],[9,null,null]]",
        "expectedOutput": "4",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1,null,null]]",
        "expectedOutput": "1",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Binary Search Tree Iterator In-Order Generator",
    "slug": "binary-search-tree-iterator-in-order-generator",
    "description": "Implement the BSTIterator class that represents an iterator over the in-order traversal of a binary search tree (BST). Support `next()` and `hasNext()` in average $O(1)$ time and $O(h)$ memory.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "Nodes count <= 10^5",
    "inputFormat": "tree, operations",
    "outputFormat": "List of outputs.",
    "sampleInput": "[[7,1,2],[3,null,null],[15,3,4],[9,null,null],[20,null,null]], [\"next\",\"next\",\"hasNext\",\"next\",\"hasNext\",\"next\",\"hasNext\",\"next\",\"hasNext\"]",
    "sampleOutput": "[3,7,true,9,true,15,true,20,false]",
    "points": 150,
    "hints": [
      "Push all left children to stack during initialization, pop top on next(), and push left spine of right child."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeIterator(self, tree: list, ops: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeIterator(tree, ops) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeIterator(self, tree: list, ops: list) -> list:\n        stack = []\n        def push_left(idx):\n            while idx is not None and idx < len(tree) and tree[idx]:\n                stack.append(idx)\n                idx = tree[idx][1]\n        push_left(0)\n        res = []\n        for op in ops:\n            if op == \"next\":\n                node = stack.pop()\n                res.append(tree[node][0])\n                push_left(tree[node][2])\n            elif op == \"hasNext\":\n                res.append(len(stack) > 0)\n        return res",
      "javascript": "class Solution {\n    executeIterator(tree, ops) {\n        const stack = [];\n        function pushLeft(idx) {\n            while (idx !== null && idx < tree.length && tree[idx]) {\n                stack.push(idx);\n                idx = tree[idx][1];\n            }\n        }\n        pushLeft(0);\n        const res = [];\n        for (const op of ops) {\n            if (op === \"next\") {\n                const node = stack.pop();\n                res.push(tree[node][0]);\n                pushLeft(tree[node][2]);\n            } else if (op === \"hasNext\") {\n                res.push(stack.length > 0);\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Controlled Stack In-order Simulation.",
      "algorithm": "Push left spine into explicit stack for amortized O(1) step and O(H) space.",
      "timeComplexity": "Amortized O(1) per op",
      "spaceComplexity": "O(H)",
      "content": "Classic iterator stack design.",
      "referenceCode": "push_left(tree[node][2])"
    },
    "tags": [
      "Tree",
      "Binary Search Tree",
      "Design",
      "Stack"
    ],
    "testCases": [
      {
        "input": "[[7,1,2],[3,null,null],[15,3,4],[9,null,null],[20,null,null]], [\"next\",\"next\",\"hasNext\",\"next\",\"hasNext\",\"next\",\"hasNext\",\"next\",\"hasNext\"]",
        "expectedOutput": "[3,7,true,9,true,15,true,20,false]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[1,null,null]], [\"hasNext\",\"next\",\"hasNext\"]",
        "expectedOutput": "[true,1,false]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[2,1,null],[1,null,null]], [\"next\",\"next\"]",
        "expectedOutput": "[1,2]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Sum Root to Leaf Numbers Total Sum",
    "slug": "sum-root-to-leaf-numbers-total-sum",
    "description": "You are given the root of a binary tree containing digits from 0 to 9 only. Each root-to-leaf path in the tree represents a number. Return the total sum of all root-to-leaf numbers.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "Nodes count <= 1000, 0 <= Node.val <= 9",
    "inputFormat": "tree",
    "outputFormat": "Total path numbers sum.",
    "sampleInput": "[[1,1,2],[2,null,null],[3,null,null]]",
    "sampleOutput": "25",
    "points": 100,
    "hints": [
      "Pass current value multiplied by 10 plus node value down to children."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def sumNumbers(self, tree: list) -> int:\n        pass",
      "javascript": "class Solution {\n    sumNumbers(tree) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def sumNumbers(self, tree: list) -> int:\n        if not tree: return 0\n        def dfs(idx, cur):\n            if idx is None or idx >= len(tree) or tree[idx] is None:\n                return 0\n            cur = cur * 10 + tree[idx][0]\n            l, r = tree[idx][1], tree[idx][2]\n            if l is None and r is None:\n                return cur\n            return dfs(l, cur) + dfs(r, cur)\n        return dfs(0, 0)",
      "javascript": "class Solution {\n    sumNumbers(tree) {\n        if (!tree || tree.length === 0) return 0;\n        function dfs(idx, cur) {\n            if (idx === null || idx >= tree.length || !tree[idx]) return 0;\n            cur = cur * 10 + tree[idx][0];\n            const l = tree[idx][1], r = tree[idx][2];\n            if (l === null && r === null) return cur;\n            return dfs(l, cur) + dfs(r, cur);\n        }\n        return dfs(0, 0);\n    }\n}"
    },
    "editorial": {
      "approach": "Root-to-Leaf Base-10 Accumulation.",
      "algorithm": "Pre-order DFS accumulates base-10 integer value down branches.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(H)",
      "content": "Standard tree path integer parsing.",
      "referenceCode": "cur = cur * 10 + tree[idx][0]"
    },
    "tags": [
      "Tree",
      "Depth-First Search"
    ],
    "testCases": [
      {
        "input": "[[1,1,2],[2,null,null],[3,null,null]]",
        "expectedOutput": "25",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[4,1,2],[9,3,4],[0,null,null],[5,null,null],[1,null,null]]",
        "expectedOutput": "1026",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[0,null,null]]",
        "expectedOutput": "0",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Trim a Binary Search Tree within Range",
    "slug": "trim-a-binary-search-tree-within-range",
    "description": "Given the root of a binary search tree and the lowest and highest boundaries as `low` and `high`, trim the tree so that all its elements lie in `[low, high]`. Trimming the tree should not change the relative structure of the elements that will remain in the tree.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "Nodes count <= 10^4, 0 <= low <= high <= 10^4",
    "inputFormat": "tree, low, high",
    "outputFormat": "Trimmed tree array.",
    "sampleInput": "[[1,1,2],[0,null,null],[2,null,null]], 1, 2",
    "sampleOutput": "[[1,null,1],[2,null,null]]",
    "points": 100,
    "hints": [
      "If node.val < low, trim left child and return trimBST(node.right). If node.val > high, return trimBST(node.left)."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def trimBST(self, tree: list, low: int, high: int) -> list:\n        pass",
      "javascript": "class Solution {\n    trimBST(tree, low, high) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def trimBST(self, tree: list, low: int, high: int) -> list:\n        if not tree: return []\n        nodes = []\n        def trim(idx):\n            if idx is None or idx >= len(tree) or tree[idx] is None:\n                return None\n            val = tree[idx][0]\n            if val < low:\n                return trim(tree[idx][2])\n            if val > high:\n                return trim(tree[idx][1])\n            my_idx = len(nodes)\n            nodes.append([val, None, None])\n            l = trim(tree[idx][1])\n            r = trim(tree[idx][2])\n            nodes[my_idx][1] = l\n            nodes[my_idx][2] = r\n            return my_idx\n        trim(0)\n        return nodes",
      "javascript": "class Solution {\n    trimBST(tree, low, high) {\n        if (!tree || tree.length === 0) return [];\n        const nodes = [];\n        function trim(idx) {\n            if (idx === null || idx >= tree.length || !tree[idx]) return null;\n            const val = tree[idx][0];\n            if (val < low) return trim(tree[idx][2]);\n            if (val > high) return trim(tree[idx][1]);\n            const myIdx = nodes.length;\n            nodes.push([val, null, null]);\n            const l = trim(tree[idx][1]);\n            const r = trim(tree[idx][2]);\n            nodes[myIdx][1] = l;\n            nodes[myIdx][2] = r;\n            return myIdx;\n        }\n        trim(0);\n        return nodes;\n    }\n}"
    },
    "editorial": {
      "approach": "BST Range Invariant Recursive Trimming.",
      "algorithm": "Prune subtrees outside [low, high] and promote surviving subtrees.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Standard BST range trimming.",
      "referenceCode": "if val < low: return trim(tree[idx][2])"
    },
    "tags": [
      "Tree",
      "Binary Search Tree",
      "Recursion"
    ],
    "testCases": [
      {
        "input": "[[1,1,2],[0,null,null],[2,null,null]], 1, 2",
        "expectedOutput": "[[1,null,1],[2,null,null]]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[3,1,2],[0,null,3],[4,null,null],[2,4,null],[1,null,null]], 1, 3",
        "expectedOutput": "[[3,1,null],[2,2,null],[1,null,null]]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1,null,null]], 1, 2",
        "expectedOutput": "[[1,null,null]]",
        "isHidden": true,
        "order": 2
      }
    ]
  }
];
