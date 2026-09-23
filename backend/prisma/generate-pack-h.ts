import { writePack, ProblemSpec } from './pack-writer-util';

// PACK H: Tree & Hierarchical Queries (19 problems)
const packH: ProblemSpec[] = [
  {
    title: 'Kth Ancestor of a Tree Node Binary Lifting',
    slug: 'binary-lifting-kth-ancestor',
    description: 'You are given a tree with `n` nodes numbered from 0 to n - 1 in the form of a parent array `parent` where `parent[i]` is the parent of node `i`. The root of the tree is node 0. Given query node and `k`, find the `k`-th ancestor of the given node. Return -1 if no such ancestor exists.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= k <= n <= 5 * 10^4\nparent[0] == -1\n0 <= parent[i] < n for 1 <= i < n\nTree is valid.',
    inputFormat: 'n, parent, queries',
    outputFormat: 'List of k-th ancestors for each [node, k] query.',
    sampleInput: '7, [-1, 0, 0, 1, 1, 2, 2], [[3, 1], [5, 2], [6, 3]]',
    sampleOutput: '[1, 0, -1]',
    points: 200,
    hints: [
      'Precompute up[i][j] representing the 2^j-th ancestor of node i.',
      'up[i][0] = parent[i], and up[i][j] = up[up[i][j-1]][j-1].',
      'For query (node, k), iterate j from 0 to 16, jumping whenever (k >> j) & 1 is true.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def getKthAncestor(self, n: int, parent: list[int], queries: list[list[int]]) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    getKthAncestor(n, parent, queries) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def getKthAncestor(self, n: int, parent: list[int], queries: list[list[int]]) -> list[int]:
        LOG = 17
        up = [[-1] * LOG for _ in range(n)]
        for i in range(n):
            up[i][0] = parent[i]
        for j in range(1, LOG):
            for i in range(n):
                if up[i][j - 1] != -1:
                    up[i][j] = up[up[i][j - 1]][j - 1]
                    
        ans = []
        for node, k in queries:
            curr = node
            for j in range(LOG):
                if (k >> j) & 1:
                    curr = up[curr][j]
                    if curr == -1:
                        break
            ans.append(curr)
        return ans`,
      javascript: `class Solution {
    getKthAncestor(n, parent, queries) {
        const LOG = 17;
        const up = Array.from({ length: n }, () => new Array(LOG).fill(-1));
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
      approach: 'Binary Lifting ancestor table precomputation.',
      algorithm: 'Decompose k into powers of 2 using up[node][j] doubling table.',
      timeComplexity: 'O(N log N) precomputation, O(Q log K) queries',
      spaceComplexity: 'O(N log N)',
      content: 'Foundational binary lifting structure on trees.',
      referenceCode: `def getKthAncestor(n: int, parent: list[int], queries: list[list[int]]) -> list[int]: ...`,
    },
    tags: ['Tree', 'Binary Lifting', 'Dynamic Programming', 'Data Structures'],
    testCases: [
      { input: '7, [-1, 0, 0, 1, 1, 2, 2], [[3, 1], [5, 2], [6, 3]]', expectedOutput: '[1, 0, -1]', isHidden: false },
      { input: '5, [-1, 0, 1, 2, 3], [[4, 4], [4, 2], [4, 5]]', expectedOutput: '[0, 2, -1]', isHidden: false },
      { input: '1, [-1], [[0, 1]]', expectedOutput: '[-1]', isHidden: true },
      { input: '4, [-1, 0, 1, 0], [[2, 1], [3, 1]]', expectedOutput: '[1, 0]', isHidden: true },
    ],
  },
  {
    title: 'Lowest Common Ancestor Binary Lifting',
    slug: 'lowest-common-ancestor-binary-lifting',
    description: 'Given a rooted tree with `n` nodes (0 to n-1) with edges and root at node 0, and a list of queries `[u, v]`, compute the Lowest Common Ancestor (LCA) of `u` and `v` for each query.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= n <= 5 * 10^4\n1 <= queries.length <= 5 * 10^4\nedges.length == n - 1',
    inputFormat: 'n, edges, queries',
    outputFormat: 'List of LCA node indices.',
    sampleInput: '5, [[0,1],[0,2],[1,3],[1,4]], [[3,4],[3,2],[4,1]]',
    sampleOutput: '[1, 0, 1]',
    points: 200,
    hints: [
      'Compute depths and binary lifting jump table up[node][j] via BFS or DFS from root.',
      'To find LCA(u, v), first lift the deeper node until depth(u) == depth(v).',
      'If u == v, return u.',
      'Then jump both u and v simultaneously for j from LOG-1 down to 0 whenever up[u][j] != up[v][j]. Return up[u][0].',
    ],
    codeTemplates: {
      python: `class Solution:\n    def findLCA(self, n: int, edges: list[list[int]], queries: list[list[int]]) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    findLCA(n, edges, queries) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `from collections import deque

class Solution:
    def findLCA(self, n: int, edges: list[list[int]], queries: list[list[int]]) -> list[int]:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            
        LOG = 17
        up = [[-1] * LOG for _ in range(n)]
        depth = [-1] * n
        
        q = deque([0])
        depth[0] = 0
        while q:
            u = q.popleft()
            for v in adj[u]:
                if depth[v] == -1:
                    depth[v] = depth[u] + 1
                    up[v][0] = u
                    q.append(v)
                    
        for j in range(1, LOG):
            for i in range(n):
                if up[i][j - 1] != -1:
                    up[i][j] = up[up[i][j - 1]][j - 1]
                    
        def lca(u, v):
            if depth[u] < depth[v]:
                u, v = v, u
            for j in range(LOG - 1, -1, -1):
                if depth[u] - (1 << j) >= depth[v]:
                    u = up[u][j]
            if u == v:
                return u
            for j in range(LOG - 1, -1, -1):
                if up[u][j] != up[v][j]:
                    u = up[u][j]
                    v = up[v][j]
            return up[u][0]
            
        return [lca(u, v) for u, v in queries]`,
      javascript: `class Solution {
    findLCA(n, edges, queries) {
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }
        
        const LOG = 17;
        const up = Array.from({ length: n }, () => new Array(LOG).fill(-1));
        const depth = new Array(n).fill(-1);
        
        const q = [0];
        depth[0] = 0;
        let head = 0;
        while (head < q.length) {
            const u = q[head++];
            for (const v of adj[u]) {
                if (depth[v] === -1) {
                    depth[v] = depth[u] + 1;
                    up[v][0] = u;
                    q.push(v);
                }
            }
        }
        
        for (let j = 1; j < LOG; j++) {
            for (let i = 0; i < n; i++) {
                if (up[i][j - 1] !== -1) {
                    up[i][j] = up[up[i][j - 1]][j - 1];
                }
            }
        }
        
        function lca(u, v) {
            if (depth[u] < depth[v]) {
                const t = u; u = v; v = t;
            }
            for (let j = LOG - 1; j >= 0; j--) {
                if (depth[u] - (1 << j) >= depth[v]) {
                    u = up[u][j];
                }
            }
            if (u === v) return u;
            for (let j = LOG - 1; j >= 0; j--) {
                if (up[u][j] !== up[v][j]) {
                    u = up[u][j];
                    v = up[v][j];
                }
            }
            return up[u][0];
        }
        
        return queries.map(([u, v]) => lca(u, v));
    }
}`,
    },
    editorial: {
      approach: 'Binary Lifting O(log N) LCA.',
      algorithm: 'Equalize depths via binary lifting jumps, then jump together to highest common ancestor.',
      timeComplexity: 'O(N log N + Q log N)',
      spaceComplexity: 'O(N log N)',
      content: 'Standard LCA query implementation using doubling table.',
      referenceCode: `def findLCA(n: int, edges: list[list[int]], queries: list[list[int]]) -> list[int]: ...`,
    },
    tags: ['Tree', 'Binary Lifting', 'LCA', 'Graph'],
    testCases: [
      { input: '5, [[0,1],[0,2],[1,3],[1,4]], [[3,4],[3,2],[4,1]]', expectedOutput: '[1, 0, 1]', isHidden: false },
      { input: '4, [[0,1],[1,2],[2,3]], [[0,3],[1,3]]', expectedOutput: '[0, 1]', isHidden: false },
      { input: '1, [], [[0,0]]', expectedOutput: '[0]', isHidden: true },
      { input: '3, [[0,1],[0,2]], [[1,2]]', expectedOutput: '[0]', isHidden: true },
    ],
  },
  {
    title: 'Sum of Distances in Tree Rerooting DP',
    slug: 'tree-rerooting-sum-of-distances',
    description: 'There is an undirected connected tree with `n` nodes labeled from 0 to n - 1 and n - 1 edges. Return an array `ans` of length `n` where `ans[i]` is the sum of the distances between the i-th node and all other nodes in the tree.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= n <= 3 * 10^4\nedges.length == n - 1',
    inputFormat: 'n, edges',
    outputFormat: 'List of sum of distances for each node.',
    sampleInput: '6, [[0,1],[0,2],[2,3],[2,4],[2,5]]',
    sampleOutput: '[8,12,6,10,10,10]',
    points: 200,
    hints: [
      'Pass 1 (post-order DFS): Compute subtree sizes count[u] and distance sum ans[root].',
      'Pass 2 (pre-order DFS): When moving root from parent u to child v: ans[v] = ans[u] - count[v] + (n - count[v]).',
    ],
    codeTemplates: {
      python: `class Solution:\n    def sumOfDistancesInTree(self, n: int, edges: list[list[int]]) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    sumOfDistancesInTree(n, edges) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `import sys
sys.setrecursionlimit(50000)

class Solution:
    def sumOfDistancesInTree(self, n: int, edges: list[list[int]]) -> list[int]:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            
        count = [1] * n
        ans = [0] * n
        
        def dfs1(node, parent):
            for child in adj[node]:
                if child != parent:
                    dfs1(child, node)
                    count[node] += count[child]
                    ans[node] += ans[child] + count[child]
                    
        def dfs2(node, parent):
            for child in adj[node]:
                if child != parent:
                    ans[child] = ans[node] - count[child] + (n - count[child])
                    dfs2(child, node)
                    
        dfs1(0, -1)
        dfs2(0, -1)
        return ans`,
      javascript: `class Solution {
    sumOfDistancesInTree(n, edges) {
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }
        
        const count = new Array(n).fill(1);
        const ans = new Array(n).fill(0);
        
        function dfs1(node, parent) {
            for (const child of adj[node]) {
                if (child !== parent) {
                    dfs1(child, node);
                    count[node] += count[child];
                    ans[node] += ans[child] + count[child];
                }
            }
        }
        
        function dfs2(node, parent) {
            for (const child of adj[node]) {
                if (child !== parent) {
                    ans[child] = ans[node] - count[child] + (n - count[child]);
                    dfs2(child, node);
                }
            }
        }
        
        dfs1(0, -1);
        dfs2(0, -1);
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Two-pass tree rerooting dynamic programming.',
      algorithm: 'Postorder calculates root metrics; preorder recalculates child values in O(1) step transitions.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Classic tree rerooting technique computing all-pairs distances in linear time.',
      referenceCode: `def sumOfDistancesInTree(n: int, edges: list[list[int]]) -> list[int]: ...`,
    },
    tags: ['Tree', 'Dynamic Programming', 'Tree Rerooting', 'DFS'],
    testCases: [
      { input: '6, [[0,1],[0,2],[2,3],[2,4],[2,5]]', expectedOutput: '[8,12,6,10,10,10]', isHidden: false },
      { input: '1, []', expectedOutput: '[0]', isHidden: false },
      { input: '2, [[1,0]]', expectedOutput: '[1,1]', isHidden: true },
      { input: '3, [[0,1],[1,2]]', expectedOutput: '[3,2,3]', isHidden: true },
    ],
  },
  {
    title: 'House Robber III Tree DP',
    slug: 'house-robber-iii-tree-dp',
    description: 'The thief has found himself a new place for his thievery. There is only one entrance to this area, called root. Beside the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night. Return the maximum amount of money the thief can rob without alerting the police.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'The number of nodes in the tree is in the range [1, 10^4].\n0 <= Node.val <= 10^4',
    inputFormat: 'Tree represented as array of [val, left_idx, right_idx] or -1 for null.',
    outputFormat: 'Max money integer.',
    sampleInput: '[[3,1,2],[2,-1,3],[3,-1,4],[3,-1,-1],[1,-1,-1]]',
    sampleOutput: '7',
    points: 150,
    hints: [
      'For each node, compute a pair (rob_this, not_rob_this).',
      'rob_this = node.val + not_rob_left + not_rob_right.',
      'not_rob_this = max(rob_left, not_rob_left) + max(rob_right, not_rob_right).',
    ],
    codeTemplates: {
      python: `class Solution:\n    def rob(self, tree: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    rob(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def rob(self, tree: list[list[int]]) -> int:
        if not tree:
            return 0
            
        def dfs(idx):
            if idx == -1:
                return 0, 0
            val, left, right = tree[idx]
            rob_l, not_l = dfs(left)
            rob_r, not_r = dfs(right)
            rob_curr = val + not_l + not_r
            not_curr = max(rob_l, not_l) + max(rob_r, not_r)
            return rob_curr, not_curr
            
        return max(dfs(0))`,
      javascript: `class Solution {
    rob(tree) {
        if (!tree || tree.length === 0) return 0;
        function dfs(idx) {
            if (idx === -1) return [0, 0];
            const [val, left, right] = tree[idx];
            const [robL, notL] = dfs(left);
            const [robR, notR] = dfs(right);
            const robCurr = val + notL + notR;
            const notCurr = Math.max(robL, notL) + Math.max(robR, notR);
            return [robCurr, notCurr];
        }
        const [r, nr] = dfs(0);
        return Math.max(r, nr);
    }
}`,
    },
    editorial: {
      approach: 'Postorder tree DP pair state propagation.',
      algorithm: 'Return (with_root, without_root) tuple bottom-up.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      content: 'Independent set on trees solved in linear time.',
      referenceCode: `def rob(tree: list[list[int]]) -> int: ...`,
    },
    tags: ['Tree', 'Dynamic Programming', 'DFS'],
    testCases: [
      { input: '[[3,1,2],[2,-1,3],[3,-1,4],[3,-1,-1],[1,-1,-1]]', expectedOutput: '7', isHidden: false },
      { input: '[[3,1,2],[4,3,4],[5,-1,5],[1,-1,-1],[3,-1,-1],[1,-1,-1]]', expectedOutput: '9', isHidden: false },
      { input: '[[10,-1,-1]]', expectedOutput: '10', isHidden: true },
      { input: '[[1,1,-1],[2,2,-1],[3,-1,-1]]', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: 'Binary Tree Maximum Path Sum Any Node',
    slug: 'binary-tree-maximum-path-sum',
    description: 'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. The path sum of a path is the sum of the node\'s values in the path. Return the maximum path sum of any non-empty path.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'The number of nodes in the tree is in the range [1, 3 * 10^4].\n-1000 <= Node.val <= 1000',
    inputFormat: 'Tree represented as array of [val, left_idx, right_idx].',
    outputFormat: 'Maximum path sum integer.',
    sampleInput: '[[-10,1,2],[9,-1,-1],[20,3,4],[15,-1,-1],[7,-1,-1]]',
    sampleOutput: '42',
    points: 200,
    hints: [
      'For each node, compute the max single path extending down into either left or right subtree: max(0, val + max(left_gain, right_gain)).',
      'Update the global maximum with val + max(0, left_gain) + max(0, right_gain) (passing through current node as root).',
    ],
    codeTemplates: {
      python: `class Solution:\n    def maxPathSum(self, tree: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    maxPathSum(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maxPathSum(self, tree: list[list[int]]) -> int:
        if not tree:
            return 0
        max_sum = float('-inf')
        
        def dfs(idx):
            nonlocal max_sum
            if idx == -1:
                return 0
            val, left, right = tree[idx]
            gain_l = max(0, dfs(left))
            gain_r = max(0, dfs(right))
            max_sum = max(max_sum, val + gain_l + gain_r)
            return val + max(gain_l, gain_r)
            
        dfs(0)
        return max_sum`,
      javascript: `class Solution {
    maxPathSum(tree) {
        if (!tree || tree.length === 0) return 0;
        let maxSum = -Infinity;
        function dfs(idx) {
            if (idx === -1) return 0;
            const [val, left, right] = tree[idx];
            const gainL = Math.max(0, dfs(left));
            const gainR = Math.max(0, dfs(right));
            maxSum = Math.max(maxSum, val + gainL + gainR);
            return val + Math.max(gainL, gainR);
        }
        dfs(0);
        return maxSum;
    }
}`,
    },
    editorial: {
      approach: 'Bottom-up DFS single branch max propagation.',
      algorithm: 'Distinguish between the return value (single-arm down) and the global turn-around path.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      content: 'Classic binary tree divide and conquer.',
      referenceCode: `def maxPathSum(tree: list[list[int]]) -> int: ...`,
    },
    tags: ['Tree', 'Dynamic Programming', 'DFS', 'Binary Tree'],
    testCases: [
      { input: '[[-10,1,2],[9,-1,-1],[20,3,4],[15,-1,-1],[7,-1,-1]]', expectedOutput: '42', isHidden: false },
      { input: '[[1,1,2],[2,-1,-1],[3,-1,-1]]', expectedOutput: '6', isHidden: false },
      { input: '[[-3,-1,-1]]', expectedOutput: '-3', isHidden: true },
      { input: '[[2,-1,1],[-1,-1,-1]]', expectedOutput: '2', isHidden: true },
    ],
  },
  {
    title: 'Sum Root to Leaf Numbers',
    slug: 'sum-root-to-leaf-numbers',
    description: 'You are given the root of a binary tree containing digits from 0 to 9 only. Each root-to-leaf path in the tree represents a number. Return the total sum of all root-to-leaf numbers.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'The number of nodes in the tree is in the range [1, 1000].\n0 <= Node.val <= 9',
    inputFormat: 'Tree represented as array of [val, left_idx, right_idx].',
    outputFormat: 'Total sum integer.',
    sampleInput: '[[1,1,2],[2,-1,-1],[3,-1,-1]]',
    sampleOutput: '25',
    points: 150,
    hints: [
      'Traverse tree passing running number: current_num = current_num * 10 + node.val.',
      'If leaf node, return current_num.',
      'Otherwise sum results from left and right children.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def sumNumbers(self, tree: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    sumNumbers(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def sumNumbers(self, tree: list[list[int]]) -> int:
        if not tree:
            return 0
        def dfs(idx, cur):
            if idx == -1:
                return 0
            val, left, right = tree[idx]
            cur = cur * 10 + val
            if left == -1 and right == -1:
                return cur
            return dfs(left, cur) + dfs(right, cur)
        return dfs(0, 0)`,
      javascript: `class Solution {
    sumNumbers(tree) {
        if (!tree || tree.length === 0) return 0;
        function dfs(idx, cur) {
            if (idx === -1) return 0;
            const [val, left, right] = tree[idx];
            cur = cur * 10 + val;
            if (left === -1 && right === -1) return cur;
            return dfs(left, cur) + dfs(right, cur);
        }
        return dfs(0, 0);
    }
}`,
    },
    editorial: {
      approach: 'DFS root-to-leaf number accumulation.',
      algorithm: 'Base-10 accumulation down paths, summing at leaves.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      content: 'Standard preorder traversal with accumulator.',
      referenceCode: `def sumNumbers(tree: list[list[int]]) -> int: ...`,
    },
    tags: ['Tree', 'DFS', 'Binary Tree'],
    testCases: [
      { input: '[[1,1,2],[2,-1,-1],[3,-1,-1]]', expectedOutput: '25', isHidden: false },
      { input: '[[4,1,2],[9,3,4],[0,-1,-1],[5,-1,-1],[1,-1,-1]]', expectedOutput: '1026', isHidden: false },
      { input: '[[5,-1,-1]]', expectedOutput: '5', isHidden: true },
      { input: '[[1,1,-1],[0,-1,-1]]', expectedOutput: '10', isHidden: true },
    ],
  },
  {
    title: 'Count Complete Tree Nodes O((log N)^2)',
    slug: 'count-complete-tree-nodes-log-squared',
    description: 'Given the root of a complete binary tree, return the number of nodes in the tree in strictly less than O(N) time complexity.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'The number of nodes in the tree is in the range [0, 5 * 10^4].',
    inputFormat: 'Tree represented as array of [val, left_idx, right_idx].',
    outputFormat: 'Total node count integer.',
    sampleInput: '[[1,1,2],[2,3,4],[3,5,-1],[4,-1,-1],[5,-1,-1],[6,-1,-1]]',
    sampleOutput: '6',
    points: 150,
    hints: [
      'Compute left depth and right depth of the tree.',
      'If left depth == right depth, it is a full binary tree with 2^depth - 1 nodes.',
      'Otherwise, count = 1 + countNodes(left) + countNodes(right).',
    ],
    codeTemplates: {
      python: `class Solution:\n    def countNodes(self, tree: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    countNodes(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def countNodes(self, tree: list[list[int]]) -> int:
        if not tree:
            return 0
        def get_left_depth(idx):
            d = 0
            while idx != -1:
                d += 1
                idx = tree[idx][1]
            return d
        def get_right_depth(idx):
            d = 0
            while idx != -1:
                d += 1
                idx = tree[idx][2]
            return d
        def solve(idx):
            if idx == -1:
                return 0
            ld = get_left_depth(idx)
            rd = get_right_depth(idx)
            if ld == rd:
                return (1 << ld) - 1
            return 1 + solve(tree[idx][1]) + solve(tree[idx][2])
        return solve(0)`,
      javascript: `class Solution {
    countNodes(tree) {
        if (!tree || tree.length === 0) return 0;
        function getLeftDepth(idx) {
            let d = 0;
            while (idx !== -1) {
                d++;
                idx = tree[idx][1];
            }
            return d;
        }
        function getRightDepth(idx) {
            let d = 0;
            while (idx !== -1) {
                d++;
                idx = tree[idx][2];
            }
            return d;
        }
        function solve(idx) {
            if (idx === -1) return 0;
            const ld = getLeftDepth(idx);
            const rd = getRightDepth(idx);
            if (ld === rd) return (1 << ld) - 1;
            return 1 + solve(tree[idx][1]) + solve(tree[idx][2]);
        }
        return solve(0);
    }
}`,
    },
    editorial: {
      approach: 'Complete tree sub-branch depth comparison.',
      algorithm: 'At each step, at least one half of the tree is guaranteed to be a perfect binary tree.',
      timeComplexity: 'O((log N)^2)',
      spaceComplexity: 'O(log N)',
      content: 'Binary search over complete tree leaf level.',
      referenceCode: `def countNodes(tree: list[list[int]]) -> int: ...`,
    },
    tags: ['Tree', 'Binary Search', 'Binary Tree'],
    testCases: [
      { input: '[[1,1,2],[2,3,4],[3,5,-1],[4,-1,-1],[5,-1,-1],[6,-1,-1]]', expectedOutput: '6', isHidden: false },
      { input: '[]', expectedOutput: '0', isHidden: false },
      { input: '[[1,-1,-1]]', expectedOutput: '1', isHidden: true },
      { input: '[[1,1,2],[2,-1,-1],[3,-1,-1]]', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Trim a Binary Search Tree',
    slug: 'trim-a-binary-search-tree',
    description: 'Given the root of a binary search tree and the lowest and highest boundaries as `low` and `high`, trim the tree so that all its elements lie in `[low, high]`. Trimming the tree should not change the relative structure of the elements that will remain in the tree. Return the root of the trimmed binary search tree.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'The number of nodes in the tree in the range [1, 10^4].\n0 <= Node.val <= 10^4\n0 <= low <= high <= 10^4',
    inputFormat: 'Tree represented as array of [val, left_idx, right_idx], low, high',
    outputFormat: 'Inorder traversal of trimmed tree values.',
    sampleInput: '[[1,1,2],[0,-1,-1],[2,-1,-1]], 1, 2',
    sampleOutput: '[1, 2]',
    points: 150,
    hints: [
      'If node.val < low, all nodes in left subtree are also < low, so return trim(node.right).',
      'If node.val > high, all nodes in right subtree are also > high, so return trim(node.left).',
      'Otherwise, trim both subtrees recursively.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def trimBST(self, tree: list[list[int]], low: int, high: int) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    trimBST(tree, low, high) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def trimBST(self, tree: list[list[int]], low: int, high: int) -> list[int]:
        if not tree:
            return []
        def trim(idx):
            if idx == -1:
                return -1
            val, left, right = tree[idx]
            if val < low:
                return trim(right)
            if val > high:
                return trim(left)
            tree[idx][1] = trim(left)
            tree[idx][2] = trim(right)
            return idx
            
        new_root = trim(0)
        res = []
        def inorder(idx):
            if idx == -1:
                return
            inorder(tree[idx][1])
            res.append(tree[idx][0])
            inorder(tree[idx][2])
        inorder(new_root)
        return res`,
      javascript: `class Solution {
    trimBST(tree, low, high) {
        if (!tree || tree.length === 0) return [];
        function trim(idx) {
            if (idx === -1) return -1;
            const [val, left, right] = tree[idx];
            if (val < low) return trim(right);
            if (val > high) return trim(left);
            tree[idx][1] = trim(left);
            tree[idx][2] = trim(right);
            return idx;
        }
        const newRoot = trim(0);
        const res = [];
        function inorder(idx) {
            if (idx === -1) return;
            inorder(tree[idx][1]);
            res.push(tree[idx][0]);
            inorder(tree[idx][2]);
        }
        inorder(newRoot);
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Recursive BST pruning.',
      algorithm: 'Prune subtrees outside [low, high] utilizing BST ordering.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      content: 'Standard BST range trimming.',
      referenceCode: `def trimBST(tree: list[list[int]], low: int, high: int) -> list[int]: ...`,
    },
    tags: ['Tree', 'Binary Search Tree', 'Recursion'],
    testCases: [
      { input: '[[1,1,2],[0,-1,-1],[2,-1,-1]], 1, 2', expectedOutput: '[1, 2]', isHidden: false },
      { input: '[[3,1,2],[0,-1,3],[4,-1,-1],[2,4,-1],[1,-1,-1]], 1, 3', expectedOutput: '[1, 2, 3]', isHidden: false },
      { input: '[[1,-1,-1]], 1, 2', expectedOutput: '[1]', isHidden: true },
      { input: '[[2,1,2],[1,-1,-1],[3,-1,-1]], 3, 4', expectedOutput: '[3]', isHidden: true },
    ],
  },
];

writePack('pack-500-part-h.ts', 'pack500PartHDefs', packH);
