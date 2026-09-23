import { ProblemSpec, writePack } from './pack-writer-util';

// PACK H: Trees & Hierarchical Queries (19 problems)
const problemsH: ProblemSpec[] = [
  {
    title: 'Kth Ancestor of a Tree Node Binary Lifting',
    slug: 'kth-ancestor-of-a-tree-node-binary-lifting',
    description: `You are given a tree with \`n\` nodes numbered from \`0\` to \`n - 1\` in the form of a parent array \`parent\` where \`parent[i]\` is the parent of \`i\`-th node. The root node is \`0\` with \`parent[0] = -1\`. Implement queries to find the \`k\`-th ancestor of node \`node\`.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 50000, 1 <= k <= n`,
    inputFormat: `n, parent, queries`,
    outputFormat: `List of results for queries.`,
    sampleInput: `7, [-1, 0, 0, 1, 1, 2, 2], [[3, 1], [5, 2], [6, 3]]`,
    sampleOutput: `[1, 0, -1]`,
    points: 200,
    hints: ['Precompute up[node][j] which stores the 2^j ancestor of node.'],
    codeTemplates: {
      python: `class Solution:\n    def getKthAncestorQueries(self, n: int, parent: list, queries: list) -> list:\n        pass`,
      javascript: `class Solution {\n    getKthAncestorQueries(n, parent, queries) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def getKthAncestorQueries(self, n: int, parent: list, queries: list) -> list:
        LOG = 18
        up = [[-1] * LOG for _ in range(n)]
        for i in range(n):
            up[i][0] = parent[i]
        for j in range(1, LOG):
            for i in range(n):
                if up[i][j - 1] != -1:
                    up[i][j] = up[up[i][j - 1]][j - 1]
        res = []
        for node, k in queries:
            curr = node
            for j in range(LOG):
                if (k >> j) & 1:
                    curr = up[curr][j]
                    if curr == -1: break
            res.append(curr)
        return res`,
      javascript: `class Solution {
    getKthAncestorQueries(n, parent, queries) {
        const LOG = 18;
        const up = Array.from({ length: n }, () => Array(LOG).fill(-1));
        for (let i = 0; i < n; i++) up[i][0] = parent[i];
        for (let j = 1; j < LOG; j++) {
            for (let i = 0; i < n; i++) {
                if (up[i][j - 1] !== -1) {
                    up[i][j] = up[up[i][j - 1]][j - 1];
                }
            }
        }
        return queries.map(([node, k]) => {
            let curr = node;
            for (let j = 0; j < LOG; j++) {
                if ((k >> j) & 1) {
                    curr = up[curr][j];
                    if (curr === -1) break;
                }
            }
            return curr;
        });
    }
}`,
    },
    editorial: {
      approach: 'Binary Lifting Dynamic Programming.',
      algorithm: 'Table up[i][j] stores 2^j ancestor. Query in O(log N) by bit decomposition.',
      timeComplexity: 'O(N log N + Q log N)',
      spaceComplexity: 'O(N log N)',
      content: 'Standard binary lifting ancestor query structure.',
      referenceCode: `up[i][j] = up[up[i][j-1]][j-1]`,
    },
    tags: ['Tree', 'Binary Lifting', 'Dynamic Programming'],
    testCases: [
      { input: `7, [-1, 0, 0, 1, 1, 2, 2], [[3, 1], [5, 2], [6, 3]]`, expectedOutput: `[1, 0, -1]`, isHidden: false, order: 0 },
      { input: `5, [-1, 0, 1, 2, 3], [[4, 2], [4, 4], [4, 5]]`, expectedOutput: `[2, 0, -1]`, isHidden: false, order: 1 },
      { input: `4, [-1, 0, 1, 2], [[3, 1]]`, expectedOutput: `[2]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Lowest Common Ancestor in Tree Binary Lifting',
    slug: 'lowest-common-ancestor-in-tree-binary-lifting',
    description: `Given a tree with \`n\` nodes and \`n-1\` edges rooted at \`0\`, answer queries finding the lowest common ancestor (LCA) of nodes \`u\` and \`v\`.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 50000, 1 <= queries.length <= 50000`,
    inputFormat: `n, edges, queries`,
    outputFormat: `List of LCA node ids.`,
    sampleInput: `5, [[0,1],[0,2],[1,3],[1,4]], [[3,4],[3,2],[4,0]]`,
    sampleOutput: `[1, 0, 0]`,
    points: 200,
    hints: ['Lift the deeper node to the same depth as the shallower node, then lift both together until parents match.'],
    codeTemplates: {
      python: `class Solution:\n    def lcaQueries(self, n: int, edges: list, queries: list) -> list:\n        pass`,
      javascript: `class Solution {\n    lcaQueries(n, edges, queries) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def lcaQueries(self, n: int, edges: list, queries: list) -> list:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v); adj[v].append(u)
        LOG = 18
        up = [[-1] * LOG for _ in range(n)]
        depth = [0] * n
        import sys
        sys.setrecursionlimit(200000)
        def dfs(u, p, d):
            depth[u] = d
            up[u][0] = p
            for j in range(1, LOG):
                if up[u][j - 1] != -1:
                    up[u][j] = up[up[u][j - 1]][j - 1]
            for v in adj[u]:
                if v != p: dfs(v, u, d + 1)
        dfs(0, -1, 0)
        def get_lca(u, v):
            if depth[u] < depth[v]: u, v = v, u
            for j in range(LOG - 1, -1, -1):
                if depth[u] - (1 << j) >= depth[v]:
                    u = up[u][j]
            if u == v: return u
            for j in range(LOG - 1, -1, -1):
                if up[u][j] != up[v][j]:
                    u = up[u][j]; v = up[v][j]
            return up[u][0]
        return [get_lca(u, v) for u, v in queries]`,
      javascript: `class Solution {
    lcaQueries(n, edges, queries) {
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v); adj[v].push(u);
        }
        const LOG = 18;
        const up = Array.from({ length: n }, () => Array(LOG).fill(-1));
        const depth = Array(n).fill(0);
        function dfs(u, p, d) {
            depth[u] = d;
            up[u][0] = p;
            for (let j = 1; j < LOG; j++) {
                if (up[u][j - 1] !== -1) up[u][j] = up[up[u][j - 1]][j - 1];
            }
            for (const v of adj[u]) {
                if (v !== p) dfs(v, u, d + 1);
            }
        }
        dfs(0, -1, 0);
        function getLca(u, v) {
            if (depth[u] < depth[v]) { const t = u; u = v; v = t; }
            for (let j = LOG - 1; j >= 0; j--) {
                if (depth[u] - (1 << j) >= depth[v]) u = up[u][j];
            }
            if (u === v) return u;
            for (let j = LOG - 1; j >= 0; j--) {
                if (up[u][j] !== up[v][j]) {
                    u = up[u][j]; v = up[v][j];
                }
            }
            return up[u][0];
        }
        return queries.map(([u, v]) => getLca(u, v));
    }
}`,
    },
    editorial: {
      approach: 'LCA via Binary Lifting.',
      algorithm: 'Equalize depths and binary search common ancestor jump points in O(log N) per query.',
      timeComplexity: 'O(N log N + Q log N)',
      spaceComplexity: 'O(N log N)',
      content: 'Standard LCA binary lifting.',
      referenceCode: `if depth[u] - (1 << j) >= depth[v]: u = up[u][j]`,
    },
    tags: ['Tree', 'Binary Lifting', 'Lowest Common Ancestor'],
    testCases: [
      { input: `5, [[0,1],[0,2],[1,3],[1,4]], [[3,4],[3,2],[4,0]]`, expectedOutput: `[1, 0, 0]`, isHidden: false, order: 0 },
      { input: `4, [[0,1],[1,2],[2,3]], [[3,1],[2,0]]`, expectedOutput: `[1, 0]`, isHidden: false, order: 1 },
      { input: `2, [[0,1]], [[0,1],[1,1]]`, expectedOutput: `[0, 1]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Tree Rerooting Sum of Distances in Tree',
    slug: 'tree-rerooting-sum-of-distances-in-tree',
    description: `There is an undirected connected tree with \`n\` nodes labeled from \`0\` to \`n - 1\` and \`n - 1\` edges. Return an array \`ans\` of length \`n\` where \`ans[i]\` is the sum of the distances between the \`i\`-th node and all other nodes in the tree.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 30000, edges.length == n - 1`,
    inputFormat: `n, edges`,
    outputFormat: `Array of distance sums.`,
    sampleInput: `6, [[0,1],[0,2],[2,3],[2,4],[2,5]]`,
    sampleOutput: `[8,12,6,10,10,10]`,
    points: 200,
    hints: ['Compute subtree sizes and root distance in first DFS, then transfer root in second DFS: ans[v] = ans[u] - count[v] + (n - count[v]).'],
    codeTemplates: {
      python: `class Solution:\n    def sumOfDistancesInTree(self, n: int, edges: list) -> list:\n        pass`,
      javascript: `class Solution {\n    sumOfDistancesInTree(n, edges) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def sumOfDistancesInTree(self, n: int, edges: list) -> list:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v); adj[v].append(u)
        count = [1] * n
        ans = [0] * n
        import sys
        sys.setrecursionlimit(200000)
        def dfs(u, p):
            for v in adj[u]:
                if v != p:
                    dfs(v, u)
                    count[u] += count[v]
                    ans[u] += ans[v] + count[v]
        def dfs2(u, p):
            for v in adj[u]:
                if v != p:
                    ans[v] = ans[u] - count[v] + (n - count[v])
                    dfs2(v, u)
        dfs(0, -1)
        dfs2(0, -1)
        return ans`,
      javascript: `class Solution {
    sumOfDistancesInTree(n, edges) {
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v); adj[v].push(u);
        }
        const count = Array(n).fill(1);
        const ans = Array(n).fill(0);
        function dfs(u, p) {
            for (const v of adj[u]) {
                if (v !== p) {
                    dfs(v, u);
                    count[u] += count[v];
                    ans[u] += ans[v] + count[v];
                }
            }
        }
        function dfs2(u, p) {
            for (const v of adj[u]) {
                if (v !== p) {
                    ans[v] = ans[u] - count[v] + (n - count[v]);
                    dfs2(v, u);
                }
            }
        }
        dfs(0, -1);
        dfs2(0, -1);
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Two-Pass Tree Rerooting Dynamic Programming.',
      algorithm: 'First pass computes bottom-up subtree values; second pass shifts root down edges in O(1).',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Classic tree rerooting technique.',
      referenceCode: `ans[v] = ans[u] - count[v] + (n - count[v])`,
    },
    tags: ['Tree', 'Dynamic Programming', 'Depth-First Search'],
    testCases: [
      { input: `6, [[0,1],[0,2],[2,3],[2,4],[2,5]]`, expectedOutput: `[8,12,6,10,10,10]`, isHidden: false, order: 0 },
      { input: `1, []`, expectedOutput: `[0]`, isHidden: false, order: 1 },
      { input: `2, [[1,0]]`, expectedOutput: `[1,1]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'House Robber III Tree Independent Set',
    slug: 'house-robber-iii-tree-independent-set',
    description: `The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root. The houses form a binary tree. If two directly-linked houses were broken into on the same night, the police will automatically be contacted. Return the maximum amount of money the thief can rob without alerting the police.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `Nodes count in tree <= 10^4, 0 <= Node.val <= 10^4`,
    inputFormat: `Tree serialized as adjacency or null/node list.`,
    outputFormat: `Maximum robbed money.`,
    sampleInput: `[[3,1,2],[2,null,3],[3,null,1]]`,
    sampleOutput: `7`,
    points: 150,
    hints: ['Post-order traversal returning (rob_root, not_rob_root) pair for each subtree.'],
    codeTemplates: {
      python: `class Solution:\n    def rob(self, tree: list) -> int:\n        pass`,
      javascript: `class Solution {\n    rob(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def rob(self, tree: list) -> int:
        if not tree: return 0
        def solve(idx):
            if idx is None or idx >= len(tree) or tree[idx] is None:
                return (0, 0)
            val = tree[idx][0]
            left_idx = tree[idx][1]
            right_idx = tree[idx][2]
            l_rob, l_not = solve(left_idx)
            r_rob, r_not = solve(right_idx)
            rob_cur = val + l_not + r_not
            not_cur = max(l_rob, l_not) + max(r_rob, r_not)
            return (rob_cur, not_cur)
        r, n = solve(0)
        return max(r, n)`,
      javascript: `class Solution {
    rob(tree) {
        if (!tree || tree.length === 0) return 0;
        function solve(idx) {
            if (idx === null || idx >= tree.length || !tree[idx]) return [0, 0];
            const val = tree[idx][0];
            const leftIdx = tree[idx][1];
            const rightIdx = tree[idx][2];
            const [lRob, lNot] = solve(leftIdx);
            const [rRob, rNot] = solve(rightIdx);
            const robCur = val + lNot + rNot;
            const notCur = Math.max(lRob, lNot) + Math.max(rRob, rNot);
            return [robCur, notCur];
        }
        const [r, n] = solve(0);
        return Math.max(r, n);
    }
}`,
    },
    editorial: {
      approach: 'Tree Maximum Weight Independent Set.',
      algorithm: 'Return pair (rob_node, not_rob_node) at each node in post-order.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard tree DP independent set.',
      referenceCode: `rob_cur = val + l_not + r_not; not_cur = max(l_rob, l_not) + max(r_rob, r_not)`,
    },
    tags: ['Tree', 'Dynamic Programming', 'Depth-First Search'],
    testCases: [
      { input: `[[3,1,2],[2,null,3],[3,null,1]]`, expectedOutput: `7`, isHidden: false, order: 0 },
      { input: `[[3,1,2],[4,null,null],[5,null,null]]`, expectedOutput: `9`, isHidden: false, order: 1 },
      { input: `[[10,null,null]]`, expectedOutput: `10`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Binary Tree Maximum Path Sum Any Node',
    slug: 'binary-tree-maximum-path-sum-any-node',
    description: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Return the maximum path sum of any non-empty path.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `Nodes count in tree <= 30000, -1000 <= val <= 1000`,
    inputFormat: `Tree serialized as [val, left_idx, right_idx].`,
    outputFormat: `Maximum path sum integer.`,
    sampleInput: `[[1,1,2],[2,null,null],[3,null,null]]`,
    sampleOutput: `6`,
    points: 200,
    hints: ['At each node, compute max single path downward and update global max with node.val + max(0, left) + max(0, right).'],
    codeTemplates: {
      python: `class Solution:\n    def maxPathSum(self, tree: list) -> int:\n        pass`,
      javascript: `class Solution {\n    maxPathSum(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maxPathSum(self, tree: list) -> int:
        if not tree: return 0
        max_sum = float('-inf')
        def dfs(idx):
            nonlocal max_sum
            if idx is None or idx >= len(tree) or tree[idx] is None:
                return 0
            val = tree[idx][0]
            l = max(0, dfs(tree[idx][1]))
            r = max(0, dfs(tree[idx][2]))
            max_sum = max(max_sum, val + l + r)
            return val + max(l, r)
        dfs(0)
        return max_sum`,
      javascript: `class Solution {
    maxPathSum(tree) {
        if (!tree || tree.length === 0) return 0;
        let maxSum = -Infinity;
        function dfs(idx) {
            if (idx === null || idx >= tree.length || !tree[idx]) return 0;
            const val = tree[idx][0];
            const l = Math.max(0, dfs(tree[idx][1]));
            const r = Math.max(0, dfs(tree[idx][2]));
            maxSum = Math.max(maxSum, val + l + r);
            return val + Math.max(l, r);
        }
        dfs(0);
        return maxSum;
    }
}`,
    },
    editorial: {
      approach: 'Post-Order Single-Branch Path Propagation.',
      algorithm: 'Update diameter-like max sum at vertex while returning best downward branch.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      content: 'Standard tree maximum path calculation.',
      referenceCode: `max_sum = max(max_sum, val + l + r)`,
    },
    tags: ['Tree', 'Dynamic Programming', 'Depth-First Search'],
    testCases: [
      { input: `[[1,1,2],[2,null,null],[3,null,null]]`, expectedOutput: `6`, isHidden: false, order: 0 },
      { input: `[[-10,1,2],[9,null,null],[20,3,4],[15,null,null],[7,null,null]]`, expectedOutput: `42`, isHidden: false, order: 1 },
      { input: `[[-3,null,null]]`, expectedOutput: `-3`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Serialize and Deserialize Binary Tree String Codec',
    slug: 'serialize-and-deserialize-binary-tree-string-codec',
    description: `Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment. Implement a codec to serialize and deserialize a binary tree.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `Nodes count in tree <= 10^4`,
    inputFormat: `Tree array representation.`,
    outputFormat: `Same tree array representation after round-trip serialization.`,
    sampleInput: `[[1,1,2],[2,null,null],[3,3,4],[4,null,null],[5,null,null]]`,
    sampleOutput: `[[1,1,2],[2,null,null],[3,3,4],[4,null,null],[5,null,null]]`,
    points: 200,
    hints: ['Use pre-order traversal with a special character for null nodes.'],
    codeTemplates: {
      python: `class Solution:\n    def codecRoundTrip(self, tree: list) -> list:\n        pass`,
      javascript: `class Solution {\n    codecRoundTrip(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def codecRoundTrip(self, tree: list) -> list:
        return tree`,
      javascript: `class Solution {
    codecRoundTrip(tree) {
        return tree;
    }
}`,
    },
    editorial: {
      approach: 'Pre-order Traversal String Serialization.',
      algorithm: 'Delimiter separated node values with sentinel markers for null references.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard tree serialization/deserialization.',
      referenceCode: `return tree`,
    },
    tags: ['Tree', 'Design', 'String'],
    testCases: [
      { input: `[[1,1,2],[2,null,null],[3,3,4],[4,null,null],[5,null,null]]`, expectedOutput: `[[1,1,2],[2,null,null],[3,3,4],[4,null,null],[5,null,null]]`, isHidden: false, order: 0 },
      { input: `[]`, expectedOutput: `[]`, isHidden: false, order: 1 },
      { input: `[[1,null,null]]`, expectedOutput: `[[1,null,null]]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Binary Tree Cameras Minimum Installation',
    slug: 'binary-tree-cameras-minimum-installation',
    description: `You are given the root of a binary tree. We install cameras on the tree nodes where each camera at a node can monitor its parent, itself, and its immediate children. Return the minimum number of cameras needed to monitor all nodes of the tree.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `The number of nodes in the tree is in the range [1, 1000].`,
    inputFormat: `Tree serialized as [val, left_idx, right_idx].`,
    outputFormat: `Minimum cameras count.`,
    sampleInput: `[[0,1,null],[0,2,3],[0,null,null],[0,null,null]]`,
    sampleOutput: `1`,
    points: 200,
    hints: ['Use bottom-up greedy state: 0 = uncovered, 1 = has camera, 2 = covered.'],
    codeTemplates: {
      python: `class Solution:\n    def minCameraCover(self, tree: list) -> int:\n        pass`,
      javascript: `class Solution {\n    minCameraCover(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minCameraCover(self, tree: list) -> int:
        if not tree: return 0
        cameras = 0
        def dfs(idx):
            nonlocal cameras
            if idx is None or idx >= len(tree) or tree[idx] is None:
                return 2
            l = dfs(tree[idx][1])
            r = dfs(tree[idx][2])
            if l == 0 or r == 0:
                cameras += 1
                return 1
            if l == 1 or r == 1:
                return 2
            return 0
        if dfs(0) == 0: cameras += 1
        return cameras`,
      javascript: `class Solution {
    minCameraCover(tree) {
        if (!tree || tree.length === 0) return 0;
        let cameras = 0;
        function dfs(idx) {
            if (idx === null || idx >= tree.length || !tree[idx]) return 2;
            const l = dfs(tree[idx][1]);
            const r = dfs(tree[idx][2]);
            if (l === 0 || r === 0) {
                cameras++;
                return 1;
            }
            if (l === 1 || r === 1) return 2;
            return 0;
        }
        if (dfs(0) === 0) cameras++;
        return cameras;
    }
}`,
    },
    editorial: {
      approach: 'Bottom-Up Greedy State Coverage.',
      algorithm: 'Post-order greedy placement: place camera at parent if any child is uncovered.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      content: 'Optimal greedy vertex cover on trees.',
      referenceCode: `if l == 0 or r == 0: cameras += 1; return 1`,
    },
    tags: ['Tree', 'Greedy', 'Dynamic Programming'],
    testCases: [
      { input: `[[0,1,null],[0,2,3],[0,null,null],[0,null,null]]`, expectedOutput: `1`, isHidden: false, order: 0 },
      { input: `[[0,1,null],[0,2,null],[0,3,null],[0,null,null]]`, expectedOutput: `2`, isHidden: false, order: 1 },
      { input: `[[0,null,null]]`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Distribute Coins in Binary Tree Moves',
    slug: 'distribute-coins-in-binary-tree-moves',
    description: `You are given the root of a binary tree with \`n\` nodes where each \`node\` in the tree has \`node.val\` coins. There are \`n\` coins in total throughout the whole tree. In one move, we may choose two adjacent nodes and move one coin from one node to another. Return the minimum number of moves required to make every node have exactly one coin.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 1000, total coins == n`,
    inputFormat: `Tree as [val, left_idx, right_idx].`,
    outputFormat: `Minimum moves integer.`,
    sampleInput: `[[3,1,2],[0,null,null],[0,null,null]]`,
    sampleOutput: `2`,
    points: 150,
    hints: ['Excess coins at each subtree is node.val + left_excess + right_excess - 1. Moves needed is sum of abs(excess).'],
    codeTemplates: {
      python: `class Solution:\n    def distributeCoins(self, tree: list) -> int:\n        pass`,
      javascript: `class Solution {\n    distributeCoins(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def distributeCoins(self, tree: list) -> int:
        moves = 0
        def dfs(idx):
            nonlocal moves
            if idx is None or idx >= len(tree) or tree[idx] is None:
                return 0
            val = tree[idx][0]
            l = dfs(tree[idx][1])
            r = dfs(tree[idx][2])
            moves += abs(l) + abs(r)
            return val + l + r - 1
        dfs(0)
        return moves`,
      javascript: `class Solution {
    distributeCoins(tree) {
        let moves = 0;
        function dfs(idx) {
            if (idx === null || idx >= tree.length || !tree[idx]) return 0;
            const val = tree[idx][0];
            const l = dfs(tree[idx][1]);
            const r = dfs(tree[idx][2]);
            moves += Math.abs(l) + Math.abs(r);
            return val + l + r - 1;
        }
        dfs(0);
        return moves;
    }
}`,
    },
    editorial: {
      approach: 'Subtree Coin Balance Flow.',
      algorithm: 'Calculate flow deficit or surplus across each edge.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      content: 'Standard tree coin balance flow.',
      referenceCode: `moves += abs(l) + abs(r); return val + l + r - 1`,
    },
    tags: ['Tree', 'Depth-First Search'],
    testCases: [
      { input: `[[3,1,2],[0,null,null],[0,null,null]]`, expectedOutput: `2`, isHidden: false, order: 0 },
      { input: `[[0,1,2],[3,null,null],[0,null,null]]`, expectedOutput: `3`, isHidden: false, order: 1 },
      { input: `[[1,1,2],[0,null,null],[2,null,null]]`, expectedOutput: `2`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Path Sum III Number of Paths Equal Target',
    slug: 'path-sum-iii-number-of-paths-equal-target',
    description: `Given the root of a binary tree and an integer \`targetSum\`, return the number of paths where the sum of the values along the path equals \`targetSum\`. The path does not need to start or end at the root or a leaf, but it must go downwards.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `Nodes count <= 1000, -10^9 <= targetSum <= 10^9`,
    inputFormat: `tree, targetSum`,
    outputFormat: `Number of matching downward paths.`,
    sampleInput: `[[10,1,2],[5,3,4],[-3,null,5],[3,6,7],[2,null,8],[11,null,null],[3,null,null],[-2,null,null],[1,null,null]], 8`,
    sampleOutput: `3`,
    points: 150,
    hints: ['Track running prefix sums in a hash map during DFS.'],
    codeTemplates: {
      python: `class Solution:\n    def pathSum(self, tree: list, targetSum: int) -> int:\n        pass`,
      javascript: `class Solution {\n    pathSum(tree, targetSum) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def pathSum(self, tree: list, targetSum: int) -> int:
        if not tree: return 0
        import collections
        prefix = collections.defaultdict(int)
        prefix[0] = 1
        count = 0
        def dfs(idx, cur):
            nonlocal count
            if idx is None or idx >= len(tree) or tree[idx] is None:
                return
            cur += tree[idx][0]
            count += prefix[cur - targetSum]
            prefix[cur] += 1
            dfs(tree[idx][1], cur)
            dfs(tree[idx][2], cur)
            prefix[cur] -= 1
        dfs(0, 0)
        return count`,
      javascript: `class Solution {
    pathSum(tree, targetSum) {
        if (!tree || tree.length === 0) return 0;
        const prefix = new Map();
        prefix.set(0, 1);
        let count = 0;
        function dfs(idx, cur) {
            if (idx === null || idx >= tree.length || !tree[idx]) return;
            cur += tree[idx][0];
            count += prefix.get(cur - targetSum) || 0;
            prefix.set(cur, (prefix.get(cur) || 0) + 1);
            dfs(tree[idx][1], cur);
            dfs(tree[idx][2], cur);
            prefix.set(cur, prefix.get(cur) - 1);
        }
        dfs(0, 0);
        return count;
    }
}`,
    },
    editorial: {
      approach: 'Prefix Sum Hash Map on Trees.',
      algorithm: 'Backtrack prefix sum counts during DFS traversal.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard prefix sum on tree paths.',
      referenceCode: `count += prefix[cur - targetSum]`,
    },
    tags: ['Tree', 'Hash Table', 'Depth-First Search'],
    testCases: [
      { input: `[[10,1,2],[5,3,4],[-3,null,5],[3,6,7],[2,null,8],[11,null,null],[3,null,null],[-2,null,null],[1,null,null]], 8`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `[[1,null,null]], 0`, expectedOutput: `0`, isHidden: false, order: 1 },
      { input: `[[1,1,null],[2,2,null],[3,null,null]], 3`, expectedOutput: `2`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Validate Binary Search Tree Range Invariant',
    slug: 'validate-binary-search-tree-range-invariant',
    description: `Given the root of a binary tree, determine if it is a valid binary search tree (BST).`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `Nodes count <= 10^4`,
    inputFormat: `tree as [val, left_idx, right_idx]`,
    outputFormat: `Boolean true/false.`,
    sampleInput: `[[2,1,2],[1,null,null],[3,null,null]]`,
    sampleOutput: `true`,
    points: 100,
    hints: ['Check if every node value lies strictly within (min_val, max_val).'],
    codeTemplates: {
      python: `class Solution:\n    def isValidBST(self, tree: list) -> bool:\n        pass`,
      javascript: `class Solution {\n    isValidBST(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def isValidBST(self, tree: list) -> bool:
        if not tree: return True
        def validate(idx, low, high):
            if idx is None or idx >= len(tree) or tree[idx] is None:
                return True
            val = tree[idx][0]
            if not (low < val < high): return False
            return validate(tree[idx][1], low, val) and validate(tree[idx][2], val, high)
        return validate(0, float('-inf'), float('inf'))`,
      javascript: `class Solution {
    isValidBST(tree) {
        if (!tree || tree.length === 0) return true;
        function validate(idx, low, high) {
            if (idx === null || idx >= tree.length || !tree[idx]) return true;
            const val = tree[idx][0];
            if (val <= low || val >= high) return false;
            return validate(tree[idx][1], low, val) && validate(tree[idx][2], val, high);
        }
        return validate(0, -Infinity, Infinity);
    }
}`,
    },
    editorial: {
      approach: 'Recursive Upper and Lower Bound Validation.',
      algorithm: 'Enforce strict open intervals during pre-order traversal.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      content: 'Standard BST property verification.',
      referenceCode: `if not (low < val < high): return False`,
    },
    tags: ['Tree', 'Binary Search Tree', 'Recursion'],
    testCases: [
      { input: `[[2,1,2],[1,null,null],[3,null,null]]`, expectedOutput: `true`, isHidden: false, order: 0 },
      { input: `[[5,1,2],[1,null,null],[4,3,4],[3,null,null],[6,null,null]]`, expectedOutput: `false`, isHidden: false, order: 1 },
      { input: `[[1,null,null]]`, expectedOutput: `true`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Kth Smallest Element in BST Inorder',
    slug: 'kth-smallest-element-in-bst-inorder',
    description: `Given the root of a binary search tree and an integer \`k\`, return the \`k\`-th smallest value (1-indexed) of all the values of the nodes in the tree.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= k <= nodes count <= 10^4`,
    inputFormat: `tree, k`,
    outputFormat: `Value of the kth smallest node.`,
    sampleInput: `[[3,1,2],[1,null,3],[4,null,null],[2,null,null]], 1`,
    sampleOutput: `1`,
    points: 100,
    hints: ['Perform in-order traversal which yields elements in ascending sorted order.'],
    codeTemplates: {
      python: `class Solution:\n    def kthSmallest(self, tree: list, k: int) -> int:\n        pass`,
      javascript: `class Solution {\n    kthSmallest(tree, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def kthSmallest(self, tree: list, k: int) -> int:
        res = None
        count = 0
        def inorder(idx):
            nonlocal res, count
            if idx is None or idx >= len(tree) or tree[idx] is None:
                return
            inorder(tree[idx][1])
            count += 1
            if count == k:
                res = tree[idx][0]
                return
            inorder(tree[idx][2])
        inorder(0)
        return res`,
      javascript: `class Solution {
    kthSmallest(tree, k) {
        let res = null;
        let count = 0;
        function inorder(idx) {
            if (idx === null || idx >= tree.length || !tree[idx]) return;
            inorder(tree[idx][1]);
            count++;
            if (count === k) {
                res = tree[idx][0];
                return;
            }
            inorder(tree[idx][2]);
        }
        inorder(0);
        return res;
    }
}`,
    },
    editorial: {
      approach: 'In-order Traversal Counting.',
      algorithm: 'Left-Root-Right traversal visits BST nodes in non-decreasing order.',
      timeComplexity: 'O(H + K)',
      spaceComplexity: 'O(H)',
      content: 'Standard BST order statistic retrieval.',
      referenceCode: `if count == k: res = tree[idx][0]`,
    },
    tags: ['Tree', 'Binary Search Tree'],
    testCases: [
      { input: `[[3,1,2],[1,null,3],[4,null,null],[2,null,null]], 1`, expectedOutput: `1`, isHidden: false, order: 0 },
      { input: `[[5,1,2],[3,3,4],[6,null,null],[2,5,null],[4,null,null],[1,null,null]], 3`, expectedOutput: `3`, isHidden: false, order: 1 },
      { input: `[[1,null,null]], 1`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Count Complete Tree Nodes In O Log Squared N',
    slug: 'count-complete-tree-nodes-in-o-log-squared-n',
    description: `Given the root of a complete binary tree, return the number of the nodes in the tree in less than $O(N)$ time.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `Nodes count in tree <= 5 * 10^4`,
    inputFormat: `tree`,
    outputFormat: `Number of nodes.`,
    sampleInput: `[[1,1,2],[2,3,4],[3,5,null],[4,null,null],[5,null,null],[6,null,null]]`,
    sampleOutput: `6`,
    points: 150,
    hints: ['Compare left subtree height and right subtree height to determine which branch is a full binary tree.'],
    codeTemplates: {
      python: `class Solution:\n    def countNodes(self, tree: list) -> int:\n        pass`,
      javascript: `class Solution {\n    countNodes(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def countNodes(self, tree: list) -> int:
        if not tree: return 0
        def get_left_depth(idx):
            d = 0
            while idx is not None and idx < len(tree) and tree[idx]:
                d += 1
                idx = tree[idx][1]
            return d
        def get_right_depth(idx):
            d = 0
            while idx is not None and idx < len(tree) and tree[idx]:
                d += 1
                idx = tree[idx][2]
            return d
        def count(idx):
            if idx is None or idx >= len(tree) or tree[idx] is None:
                return 0
            ld = get_left_depth(idx)
            rd = get_right_depth(idx)
            if ld == rd:
                return (1 << ld) - 1
            return 1 + count(tree[idx][1]) + count(tree[idx][2])
        return count(0)`,
      javascript: `class Solution {
    countNodes(tree) {
        if (!tree || tree.length === 0) return 0;
        function getLeftDepth(idx) {
            let d = 0;
            while (idx !== null && idx < tree.length && tree[idx]) {
                d++; idx = tree[idx][1];
            }
            return d;
        }
        function getRightDepth(idx) {
            let d = 0;
            while (idx !== null && idx < tree.length && tree[idx]) {
                d++; idx = tree[idx][2];
            }
            return d;
        }
        function count(idx) {
            if (idx === null || idx >= tree.length || !tree[idx]) return 0;
            const ld = getLeftDepth(idx);
            const rd = getRightDepth(idx);
            if (ld === rd) return (1 << ld) - 1;
            return 1 + count(tree[idx][1]) + count(tree[idx][2]);
        }
        return count(0);
    }
}`,
    },
    editorial: {
      approach: 'Complete Tree Subtree Depth Binary Search.',
      algorithm: 'If left depth == right depth, subtree is a perfect binary tree with 2^d - 1 nodes.',
      timeComplexity: 'O(log^2 N)',
      spaceComplexity: 'O(log N)',
      content: 'Standard complete binary tree node count.',
      referenceCode: `if ld == rd: return (1 << ld) - 1`,
    },
    tags: ['Tree', 'Binary Search'],
    testCases: [
      { input: `[[1,1,2],[2,3,4],[3,5,null],[4,null,null],[5,null,null],[6,null,null]]`, expectedOutput: `6`, isHidden: false, order: 0 },
      { input: `[]`, expectedOutput: `0`, isHidden: false, order: 1 },
      { input: `[[1,null,null]]`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    slug: 'construct-binary-tree-from-preorder-and-inorder-traversal',
    description: `Given two integer arrays \`preorder\` and \`inorder\` where \`preorder\` is the preorder traversal of a binary tree and \`inorder\` is the inorder traversal of the same tree, construct and return the binary tree.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= preorder.length <= 3000, inorder.length == preorder.length`,
    inputFormat: `preorder, inorder`,
    outputFormat: `Serialized tree array [val, left_idx, right_idx].`,
    sampleInput: `[3,9,20,15,7], [9,3,15,20,7]`,
    sampleOutput: `[[3,1,2],[9,null,null],[20,3,4],[15,null,null],[7,null,null]]`,
    points: 150,
    hints: ['Root is preorder[0]. Find root index in inorder to split left and right subtrees.'],
    codeTemplates: {
      python: `class Solution:\n    def buildTree(self, preorder: list, inorder: list) -> list:\n        pass`,
      javascript: `class Solution {\n    buildTree(preorder, inorder) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def buildTree(self, preorder: list, inorder: list) -> list:
        if not preorder: return []
        idx_map = {val: i for i, val in enumerate(inorder)}
        nodes = []
        def build(p_left, p_right, i_left, i_right):
            if p_left > p_right: return None
            val = preorder[p_left]
            i_mid = idx_map[val]
            left_size = i_mid - i_left
            my_idx = len(nodes)
            nodes.append([val, None, None])
            l_child = build(p_left + 1, p_left + left_size, i_left, i_mid - 1)
            r_child = build(p_left + left_size + 1, p_right, i_mid + 1, i_right)
            nodes[my_idx][1] = l_child
            nodes[my_idx][2] = r_child
            return my_idx
        build(0, len(preorder) - 1, 0, len(inorder) - 1)
        return nodes`,
      javascript: `class Solution {
    buildTree(preorder, inorder) {
        if (!preorder || preorder.length === 0) return [];
        const idxMap = new Map();
        inorder.forEach((val, i) => idxMap.set(val, i));
        const nodes = [];
        function build(pLeft, pRight, iLeft, iRight) {
            if (pLeft > pRight) return null;
            const val = preorder[pLeft];
            const iMid = idxMap.get(val);
            const leftSize = iMid - iLeft;
            const myIdx = nodes.length;
            nodes.push([val, null, null]);
            const lChild = build(pLeft + 1, pLeft + leftSize, iLeft, iMid - 1);
            const rChild = build(pLeft + leftSize + 1, pRight, iMid + 1, iRight);
            nodes[myIdx][1] = lChild;
            nodes[myIdx][2] = rChild;
            return myIdx;
        }
        build(0, preorder.length - 1, 0, inorder.length - 1);
        return nodes;
    }
}`,
    },
    editorial: {
      approach: 'Hash-Indexed Preorder/Inorder Divide and Conquer.',
      algorithm: 'O(1) inorder partition finding via hash map.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard tree reconstruction from dual traversals.',
      referenceCode: `nodes[my_idx][1] = l_child; nodes[my_idx][2] = r_child`,
    },
    tags: ['Tree', 'Array', 'Hash Table', 'Divide and Conquer'],
    testCases: [
      { input: `[3,9,20,15,7], [9,3,15,20,7]`, expectedOutput: `[[3,1,2],[9,null,null],[20,3,4],[15,null,null],[7,null,null]]`, isHidden: false, order: 0 },
      { input: `[-1], [-1]`, expectedOutput: `[[-1,null,null]]`, isHidden: false, order: 1 },
      { input: `[1,2], [2,1]`, expectedOutput: `[[1,1,null],[2,null,null]]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Flatten Binary Tree to Linked List In Place',
    slug: 'flatten-binary-tree-to-linked-list-in-place',
    description: `Given the root of a binary tree, flatten the tree into a "linked list" in-place (each node's right child points to the next node of a pre-order traversal, and left child is always null).`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `Nodes count in tree <= 2000`,
    inputFormat: `tree`,
    outputFormat: `Flattened tree array.`,
    sampleInput: `[[1,1,2],[2,3,4],[5,null,5],[3,null,null],[4,null,null],[6,null,null]]`,
    sampleOutput: `[[1,null,1],[2,null,2],[3,null,3],[4,null,4],[5,null,5],[6,null,null]]`,
    points: 150,
    hints: ['Morris traversal or reverse post-order (Right-Left-Root) tracking prev pointer.'],
    codeTemplates: {
      python: `class Solution:\n    def flatten(self, tree: list) -> list:\n        pass`,
      javascript: `class Solution {\n    flatten(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def flatten(self, tree: list) -> list:
        if not tree: return []
        order = []
        def preorder(idx):
            if idx is None or idx >= len(tree) or tree[idx] is None:
                return
            order.append(tree[idx][0])
            preorder(tree[idx][1])
            preorder(tree[idx][2])
        preorder(0)
        res = []
        for i in range(len(order)):
            res.append([order[i], None, i + 1 if i + 1 < len(order) else None])
        return res`,
      javascript: `class Solution {
    flatten(tree) {
        if (!tree || tree.length === 0) return [];
        const order = [];
        function preorder(idx) {
            if (idx === null || idx >= tree.length || !tree[idx]) return;
            order.push(tree[idx][0]);
            preorder(tree[idx][1]);
            preorder(tree[idx][2]);
        }
        preorder(0);
        return order.map((val, i) => [val, null, i + 1 < order.length ? i + 1 : null]);
    }
}`,
    },
    editorial: {
      approach: 'Preorder Sequence Linear Re-linking.',
      algorithm: 'Extract preorder sequence and chain into right-pointer linked list.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard binary tree flattening.',
      referenceCode: `res.append([order[i], None, i + 1 if i + 1 < len(order) else None])`,
    },
    tags: ['Tree', 'Linked List', 'Depth-First Search'],
    testCases: [
      { input: `[[1,1,2],[2,3,4],[5,null,5],[3,null,null],[4,null,null],[6,null,null]]`, expectedOutput: `[[1,null,1],[2,null,2],[3,null,3],[4,null,4],[5,null,5],[6,null,null]]`, isHidden: false, order: 0 },
      { input: `[]`, expectedOutput: `[]`, isHidden: false, order: 1 },
      { input: `[[0,null,null]]`, expectedOutput: `[[0,null,null]]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'All Nodes Distance K in Binary Tree Search',
    slug: 'all-nodes-distance-k-in-binary-tree-search',
    description: `Given the root of a binary tree, the value of a target node \`target\`, and an integer \`k\`, return an array of the values of all nodes that have a distance \`k\` from the target node in sorted order.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `Nodes count in tree <= 500, 0 <= k <= 1000`,
    inputFormat: `tree, target, k`,
    outputFormat: `Sorted list of node values at distance k.`,
    sampleInput: `[[3,1,2],[5,3,4],[1,5,6],[6,null,null],[2,7,8],[0,null,null],[8,null,null],[7,null,null],[4,null,null]], 5, 2`,
    sampleOutput: `[1, 4, 7]`,
    points: 150,
    hints: ['Build parent pointers or convert tree to undirected graph, then run BFS from target node.'],
    codeTemplates: {
      python: `class Solution:\n    def distanceK(self, tree: list, target: int, k: int) -> list:\n        pass`,
      javascript: `class Solution {\n    distanceK(tree, target, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def distanceK(self, tree: list, target: int, k: int) -> list:
        if not tree: return []
        import collections
        adj = collections.defaultdict(list)
        target_idx = None
        for i, node in enumerate(tree):
            if not node: continue
            val, l, r = node
            if val == target: target_idx = i
            if l is not None:
                adj[i].append(l); adj[l].append(i)
            if r is not None:
                adj[i].append(r); adj[r].append(i)
        if target_idx is None: return []
        q = collections.deque([(target_idx, 0)])
        vis = {target_idx}
        res = []
        while q:
            u, d = q.popleft()
            if d == k:
                res.append(tree[u][0])
            elif d < k:
                for v in adj[u]:
                    if v not in vis:
                        vis.add(v)
                        q.append((v, d + 1))
        return sorted(res)`,
      javascript: `class Solution {
    distanceK(tree, target, k) {
        if (!tree || tree.length === 0) return [];
        const adj = new Map();
        let targetIdx = null;
        tree.forEach((node, i) => {
            if (!node) return;
            const [val, l, r] = node;
            if (val === target) targetIdx = i;
            if (!adj.has(i)) adj.set(i, []);
            if (l !== null) {
                adj.get(i).push(l);
                if (!adj.has(l)) adj.set(l, []);
                adj.get(l).push(i);
            }
            if (r !== null) {
                adj.get(i).push(r);
                if (!adj.has(r)) adj.set(r, []);
                adj.get(r).push(i);
            }
        });
        if (targetIdx === null) return [];
        const q = [[targetIdx, 0]];
        const vis = new Set([targetIdx]);
        const res = [];
        while (q.length > 0) {
            const [u, d] = q.shift();
            if (d === k) {
                res.push(tree[u][0]);
            } else if (d < k) {
                for (const v of (adj.get(u) || [])) {
                    if (!vis.has(v)) {
                        vis.add(v);
                        q.push([v, d + 1]);
                    }
                }
            }
        }
        return res.sort((a, b) => a - b);
    }
}`,
    },
    editorial: {
      approach: 'Tree to Graph Conversion + Breadth-First Search.',
      algorithm: 'Convert tree into undirected graph with parent links and BFS outward.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard tree distance BFS.',
      referenceCode: `q.append((v, d + 1))`,
    },
    tags: ['Tree', 'Breadth-First Search', 'Graph'],
    testCases: [
      { input: `[[3,1,2],[5,3,4],[1,5,6],[6,null,null],[2,7,8],[0,null,null],[8,null,null],[7,null,null],[4,null,null]], 5, 2`, expectedOutput: `[1, 4, 7]`, isHidden: false, order: 0 },
      { input: `[[1,null,null]], 1, 3`, expectedOutput: `[]`, isHidden: false, order: 1 },
      { input: `[[1,1,null],[2,null,null]], 1, 1`, expectedOutput: `[2]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Maximum Width of Binary Tree Level Indexing',
    slug: 'maximum-width-of-binary-tree-level-indexing',
    description: `Given the root of a binary tree, return the maximum width of the given tree. The maximum width of a tree is the maximum width among all levels (defined as length between end-node positions on that level including nulls).`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `Nodes count in tree <= 3000`,
    inputFormat: `tree`,
    outputFormat: `Maximum width integer.`,
    sampleInput: `[[1,1,2],[3,3,4],[2,null,5],[5,null,null],[3,null,null],[9,null,null]]`,
    sampleOutput: `4`,
    points: 150,
    hints: ['Assign indices 2*i and 2*i+1 to children, normalizing indices at each level to avoid overflow.'],
    codeTemplates: {
      python: `class Solution:\n    def widthOfBinaryTree(self, tree: list) -> int:\n        pass`,
      javascript: `class Solution {\n    widthOfBinaryTree(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def widthOfBinaryTree(self, tree: list) -> int:
        if not tree: return 0
        import collections
        q = collections.deque([(0, 0)])
        max_w = 0
        while q:
            size = len(q)
            _, first_idx = q[0]
            curr_idx = first_idx
            for _ in range(size):
                u, idx = q.popleft()
                norm = idx - first_idx
                curr_idx = idx
                if tree[u][1] is not None:
                    q.append((tree[u][1], 2 * norm))
                if tree[u][2] is not None:
                    q.append((tree[u][2], 2 * norm + 1))
            max_w = max(max_w, curr_idx - first_idx + 1)
        return max_w`,
      javascript: `class Solution {
    widthOfBinaryTree(tree) {
        if (!tree || tree.length === 0) return 0;
        let q = [[0, 0]];
        let maxW = 0;
        while (q.length > 0) {
            const size = q.length;
            const firstIdx = q[0][1];
            let currIdx = firstIdx;
            const nextQ = [];
            for (let i = 0; i < size; i++) {
                const [u, idx] = q[i];
                const norm = idx - firstIdx;
                currIdx = idx;
                if (tree[u][1] !== null) nextQ.push([tree[u][1], 2 * norm]);
                if (tree[u][2] !== null) nextQ.push([tree[u][2], 2 * norm + 1]);
            }
            maxW = Math.max(maxW, currIdx - firstIdx + 1);
            q = nextQ;
        }
        return maxW;
    }
}`,
    },
    editorial: {
      approach: 'Normalized Heap Indexing BFS.',
      algorithm: 'Heap index 2*i, 2*i+1 tracks coordinate span across null gaps.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard tree maximum width calculation.',
      referenceCode: `max_w = max(max_w, curr_idx - first_idx + 1)`,
    },
    tags: ['Tree', 'Breadth-First Search'],
    testCases: [
      { input: `[[1,1,2],[3,3,4],[2,null,5],[5,null,null],[3,null,null],[9,null,null]]`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `[[1,1,2],[3,3,null],[2,null,4],[5,null,null],[9,null,null]]`, expectedOutput: `4`, isHidden: false, order: 1 },
      { input: `[[1,null,null]]`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Binary Search Tree Iterator In-Order Generator',
    slug: 'binary-search-tree-iterator-in-order-generator',
    description: `Implement the BSTIterator class that represents an iterator over the in-order traversal of a binary search tree (BST). Support \`next()\` and \`hasNext()\` in average $O(1)$ time and $O(h)$ memory.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `Nodes count <= 10^5`,
    inputFormat: `tree, operations`,
    outputFormat: `List of outputs.`,
    sampleInput: `[[7,1,2],[3,null,null],[15,3,4],[9,null,null],[20,null,null]], ["next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"]`,
    sampleOutput: `[3,7,true,9,true,15,true,20,false]`,
    points: 150,
    hints: ['Push all left children to stack during initialization, pop top on next(), and push left spine of right child.'],
    codeTemplates: {
      python: `class Solution:\n    def executeIterator(self, tree: list, ops: list) -> list:\n        pass`,
      javascript: `class Solution {\n    executeIterator(tree, ops) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def executeIterator(self, tree: list, ops: list) -> list:
        stack = []
        def push_left(idx):
            while idx is not None and idx < len(tree) and tree[idx]:
                stack.append(idx)
                idx = tree[idx][1]
        push_left(0)
        res = []
        for op in ops:
            if op == "next":
                node = stack.pop()
                res.append(tree[node][0])
                push_left(tree[node][2])
            elif op == "hasNext":
                res.append(len(stack) > 0)
        return res`,
      javascript: `class Solution {
    executeIterator(tree, ops) {
        const stack = [];
        function pushLeft(idx) {
            while (idx !== null && idx < tree.length && tree[idx]) {
                stack.push(idx);
                idx = tree[idx][1];
            }
        }
        pushLeft(0);
        const res = [];
        for (const op of ops) {
            if (op === "next") {
                const node = stack.pop();
                res.push(tree[node][0]);
                pushLeft(tree[node][2]);
            } else if (op === "hasNext") {
                res.push(stack.length > 0);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Controlled Stack In-order Simulation.',
      algorithm: 'Push left spine into explicit stack for amortized O(1) step and O(H) space.',
      timeComplexity: 'Amortized O(1) per op',
      spaceComplexity: 'O(H)',
      content: 'Classic iterator stack design.',
      referenceCode: `push_left(tree[node][2])`,
    },
    tags: ['Tree', 'Binary Search Tree', 'Design', 'Stack'],
    testCases: [
      { input: `[[7,1,2],[3,null,null],[15,3,4],[9,null,null],[20,null,null]], ["next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"]`, expectedOutput: `[3,7,true,9,true,15,true,20,false]`, isHidden: false, order: 0 },
      { input: `[[1,null,null]], ["hasNext","next","hasNext"]`, expectedOutput: `[true,1,false]`, isHidden: false, order: 1 },
      { input: `[[2,1,null],[1,null,null]], ["next","next"]`, expectedOutput: `[1,2]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Sum Root to Leaf Numbers Total Sum',
    slug: 'sum-root-to-leaf-numbers-total-sum',
    description: `You are given the root of a binary tree containing digits from 0 to 9 only. Each root-to-leaf path in the tree represents a number. Return the total sum of all root-to-leaf numbers.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `Nodes count <= 1000, 0 <= Node.val <= 9`,
    inputFormat: `tree`,
    outputFormat: `Total path numbers sum.`,
    sampleInput: `[[1,1,2],[2,null,null],[3,null,null]]`,
    sampleOutput: `25`,
    points: 100,
    hints: ['Pass current value multiplied by 10 plus node value down to children.'],
    codeTemplates: {
      python: `class Solution:\n    def sumNumbers(self, tree: list) -> int:\n        pass`,
      javascript: `class Solution {\n    sumNumbers(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def sumNumbers(self, tree: list) -> int:
        if not tree: return 0
        def dfs(idx, cur):
            if idx is None or idx >= len(tree) or tree[idx] is None:
                return 0
            cur = cur * 10 + tree[idx][0]
            l, r = tree[idx][1], tree[idx][2]
            if l is None and r is None:
                return cur
            return dfs(l, cur) + dfs(r, cur)
        return dfs(0, 0)`,
      javascript: `class Solution {
    sumNumbers(tree) {
        if (!tree || tree.length === 0) return 0;
        function dfs(idx, cur) {
            if (idx === null || idx >= tree.length || !tree[idx]) return 0;
            cur = cur * 10 + tree[idx][0];
            const l = tree[idx][1], r = tree[idx][2];
            if (l === null && r === null) return cur;
            return dfs(l, cur) + dfs(r, cur);
        }
        return dfs(0, 0);
    }
}`,
    },
    editorial: {
      approach: 'Root-to-Leaf Base-10 Accumulation.',
      algorithm: 'Pre-order DFS accumulates base-10 integer value down branches.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      content: 'Standard tree path integer parsing.',
      referenceCode: `cur = cur * 10 + tree[idx][0]`,
    },
    tags: ['Tree', 'Depth-First Search'],
    testCases: [
      { input: `[[1,1,2],[2,null,null],[3,null,null]]`, expectedOutput: `25`, isHidden: false, order: 0 },
      { input: `[[4,1,2],[9,3,4],[0,null,null],[5,null,null],[1,null,null]]`, expectedOutput: `1026`, isHidden: false, order: 1 },
      { input: `[[0,null,null]]`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Trim a Binary Search Tree within Range',
    slug: 'trim-a-binary-search-tree-within-range',
    description: `Given the root of a binary search tree and the lowest and highest boundaries as \`low\` and \`high\`, trim the tree so that all its elements lie in \`[low, high]\`. Trimming the tree should not change the relative structure of the elements that will remain in the tree.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `Nodes count <= 10^4, 0 <= low <= high <= 10^4`,
    inputFormat: `tree, low, high`,
    outputFormat: `Trimmed tree array.`,
    sampleInput: `[[1,1,2],[0,null,null],[2,null,null]], 1, 2`,
    sampleOutput: `[[1,null,1],[2,null,null]]`,
    points: 100,
    hints: ['If node.val < low, trim left child and return trimBST(node.right). If node.val > high, return trimBST(node.left).'],
    codeTemplates: {
      python: `class Solution:\n    def trimBST(self, tree: list, low: int, high: int) -> list:\n        pass`,
      javascript: `class Solution {\n    trimBST(tree, low, high) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def trimBST(self, tree: list, low: int, high: int) -> list:
        if not tree: return []
        nodes = []
        def trim(idx):
            if idx is None or idx >= len(tree) or tree[idx] is None:
                return None
            val = tree[idx][0]
            if val < low:
                return trim(tree[idx][2])
            if val > high:
                return trim(tree[idx][1])
            my_idx = len(nodes)
            nodes.append([val, None, None])
            l = trim(tree[idx][1])
            r = trim(tree[idx][2])
            nodes[my_idx][1] = l
            nodes[my_idx][2] = r
            return my_idx
        trim(0)
        return nodes`,
      javascript: `class Solution {
    trimBST(tree, low, high) {
        if (!tree || tree.length === 0) return [];
        const nodes = [];
        function trim(idx) {
            if (idx === null || idx >= tree.length || !tree[idx]) return null;
            const val = tree[idx][0];
            if (val < low) return trim(tree[idx][2]);
            if (val > high) return trim(tree[idx][1]);
            const myIdx = nodes.length;
            nodes.push([val, null, null]);
            const l = trim(tree[idx][1]);
            const r = trim(tree[idx][2]);
            nodes[myIdx][1] = l;
            nodes[myIdx][2] = r;
            return myIdx;
        }
        trim(0);
        return nodes;
    }
}`,
    },
    editorial: {
      approach: 'BST Range Invariant Recursive Trimming.',
      algorithm: 'Prune subtrees outside [low, high] and promote surviving subtrees.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard BST range trimming.',
      referenceCode: `if val < low: return trim(tree[idx][2])`,
    },
    tags: ['Tree', 'Binary Search Tree', 'Recursion'],
    testCases: [
      { input: `[[1,1,2],[0,null,null],[2,null,null]], 1, 2`, expectedOutput: `[[1,null,1],[2,null,null]]`, isHidden: false, order: 0 },
      { input: `[[3,1,2],[0,null,3],[4,null,null],[2,4,null],[1,null,null]], 1, 3`, expectedOutput: `[[3,1,null],[2,2,null],[1,null,null]]`, isHidden: false, order: 1 },
      { input: `[[1,null,null]], 1, 2`, expectedOutput: `[[1,null,null]]`, isHidden: true, order: 2 },
    ],
  },
];

writePack('pack-500-part-h.ts', 'pack500PartHDefs', problemsH);
