import { Difficulty } from '@prisma/client';

export const pack250ExtKDefs = [
  {
    title: 'Kth Ancestor of a Tree Node Binary Lifting',
    slug: 'kth-ancestor-tree-node-binary-lifting',
    description: `You are given a tree with $n$ nodes numbered from $0$ to $n - 1$ in the form of a parent array $parent$ where $parent[i]$ is the parent of $i$-th node. The root of the tree is node $0$.

Given $q$ queries where each query is represented as $[node, k]$, return the $k$-th ancestor of the given node. If no such ancestor exists, return -1.

The $k$-th ancestor of a tree node is the $k$-th node in the path that goes from that node towards the root.

### Constraints
- $1 \\le n \\le 5 \\times 10^4$
- $parent[0] = -1$
- $0 \\le parent[i] < n$ for $i > 0$
- $1 \\le q \\le 5 \\times 10^4$
- $1 \\le k \\le n$

### Input Format
- An integer $n$, an integer array $parent$, and a 2D integer array $queries$.

### Output Format
- Return an array of integers representing the answers to the queries.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['tree', 'binary-lifting', 'binary-search'],
    roadmapLevel: 4,
    roadmapTopic: 'advanced-trees',
    templates: {
      python: `class Solution:\n    def getKthAncestors(self, n: int, parent: list[int], queries: list[list[int]]) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    getKthAncestors(n, parent, queries) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def getKthAncestors(self, n: int, parent: list[int], queries: list[list[int]]) -> list[int]:
        LOG = 18
        # up[node][j] = 2^j-th ancestor of node
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
      javascript: `class Solution {\n    getKthAncestors(n, parent, queries) {\n        const LOG = 18;\n        const up = Array.from({ length: n }, () => new Int32Array(LOG).fill(-1));\n        \n        for (let i = 0; i < n; i++) {\n            up[i][0] = parent[i];\n        }\n        \n        for (let j = 1; j < LOG; j++) {\n            for (let i = 0; i < n; i++) {\n                if (up[i][j - 1] !== -1) {\n                    up[i][j] = up[up[i][j - 1]][j - 1];\n                }\n            }\n        }\n        \n        const ans = [];\n        for (const [node, k] of queries) {\n            let curr = node;\n            for (let j = 0; j < LOG; j++) {\n                if ((k >> j) & 1) {\n                    curr = up[curr][j];\n                    if (curr === -1) break;\n                }\n            }\n            ans.push(curr);\n        }\n        return ans;\n    }\n}`,
    },
    hints: [
      'Use the binary lifting technique.',
      'Precompute up[u][j] = the 2^j ancestor of node u using up[u][j] = up[up[u][j-1]][j-1].',
      'For each query, decompose k into its binary bits and jump accordingly in O(log n) time.',
    ],
    editorial: `### Method Explanation
Binary Lifting:
1. Precompute a table $up[n][\\log n]$ where $up[u][j]$ stores the $2^j$-th ancestor of node $u$.
   - $up[u][0] = parent[u]$
   - $up[u][j] = up[up[u][j-1]][j-1]$
2. To find the $k$-th ancestor of $u$:
   - Iterate over each bit $j$ of $k$. If the $j$-th bit is set, jump $u = up[u][j]$.
   - If $u$ becomes $-1$ at any point, the ancestor does not exist.

### Complexity
- **Time Complexity:** $O(N \\log N + Q \\log N)$.
- **Space Complexity:** $O(N \\log N)$.`,
    testCases: [
      { input: '7, [-1,0,0,1,1,2,2], [[3,1],[5,2],[6,3]]', expectedOutput: '[1,0,-1]', isHidden: false },
      { input: '4, [-1,0,1,2], [[3,1],[3,2],[3,3],[3,4]]', expectedOutput: '[2,1,0,-1]', isHidden: false },
      { input: '1, [-1], [[0,1]]', expectedOutput: '[-1]', isHidden: true },
    ],
  },
  {
    title: 'Sum of Distances in Tree',
    slug: 'sum-of-distances-in-tree',
    description: `There is an undirected connected tree with $n$ nodes labeled from $0$ to $n - 1$ and $n - 1$ edges.

You are given the integer $n$ and the array $edges$ where $edges[i] = [a_i, b_i]$ indicates that there is an edge between nodes $a_i$ and $b_i$ in the tree.

Return an array $ans$ of length $n$ where $ans[i]$ is the sum of the distances between the $i$-th node and all other nodes in the tree.

### Constraints
- $1 \\le n \\le 3 \\times 10^4$
- $edges.length == n - 1$
- $edges[i].length == 2$
- $0 \\le a_i, b_i < n$
- The graph is guaranteed to be a tree.

### Input Format
- An integer $n$ and a 2D integer array $edges$.

### Output Format
- Return an array $ans$ of length $n$.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['tree', 'tree-dp', 'dfs'],
    roadmapLevel: 4,
    roadmapTopic: 'advanced-trees',
    templates: {
      python: `class Solution:\n    def sumOfDistancesInTree(self, n: int, edges: list[list[int]]) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    sumOfDistancesInTree(n, edges) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `import sys
sys.setrecursionlimit(50000)

class Solution:
    def sumOfDistancesInTree(self, n: int, edges: list[list[int]]) -> list[int]:
        if n == 1:
            return [0]
            
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            
        count = [1] * n
        ans = [0] * n
        
        # Post-order DFS to calculate subtree sizes and root distance sum
        def dfs1(u, parent):
            for v in adj[u]:
                if v != parent:
                    dfs1(v, u)
                    count[u] += count[v]
                    ans[u] += ans[v] + count[v]
                    
        # Pre-order DFS for re-rooting
        def dfs2(u, parent):
            for v in adj[u]:
                if v != parent:
                    # When moving root from u to v:
                    # v gets closer by 1 to all count[v] nodes in its subtree
                    # v gets farther by 1 to all (n - count[v]) other nodes
                    ans[v] = ans[u] - count[v] + (n - count[v])
                    dfs2(v, u)
                    
        dfs1(0, -1)
        dfs2(0, -1)
        return ans`,
      javascript: `class Solution {\n    sumOfDistancesInTree(n, edges) {\n        if (n === 1) return [0];\n        const adj = Array.from({ length: n }, () => []);\n        for (const [u, v] of edges) {\n            adj[u].push(v);\n            adj[v].push(u);\n        }\n        const count = new Array(n).fill(1);\n        const ans = new Array(n).fill(0);\n        \n        const dfs1 = (u, parent) => {\n            for (const v of adj[u]) {\n                if (v !== parent) {\n                    dfs1(v, u);\n                    count[u] += count[v];\n                    ans[u] += ans[v] + count[v];\n                }\n            }\n        };\n        \n        const dfs2 = (u, parent) => {\n            for (const v of adj[u]) {\n                if (v !== parent) {\n                    ans[v] = ans[u] - count[v] + (n - count[v]);\n                    dfs2(v, u);\n                }\n            }\n        };\n        \n        dfs1(0, -1);\n        dfs2(0, -1);\n        return ans;\n    }\n}`,
    },
    hints: [
      'Use the Tree Re-rooting technique (2-pass DFS).',
      'Pass 1 (bottom-up): compute the subtree sizes and the sum of distances for root node 0.',
      'Pass 2 (top-down): transition from parent u to child v using ans[v] = ans[u] - count[v] + (n - count[v]).',
    ],
    editorial: `### Method Explanation
Tree DP with Re-rooting:
1. **First DFS (Post-order):**
   - Root the tree arbitrarily at node $0$.
   - Calculate $count[u]$, the size of the subtree rooted at $u$.
   - Calculate $ans[0]$, the sum of distances from $0$ to all other nodes in $O(N)$ time.
2. **Second DFS (Pre-order):**
   - For an edge from $u$ to child $v$:
     - $v$ is $1$ step closer to the $count[v]$ nodes in its subtree.
     - $v$ is $1$ step farther from the $N - count[v]$ nodes outside its subtree.
     - Hence: $ans[v] = ans[u] - count[v] + (N - count[v])$.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '6, [[0,1],[0,2],[2,3],[2,4],[2,5]]', expectedOutput: '[8,12,6,10,10,10]', isHidden: false },
      { input: '1, []', expectedOutput: '[0]', isHidden: false },
      { input: '2, [[1,0]]', expectedOutput: '[1,1]', isHidden: false },
      { input: '3, [[0,1],[1,2]]', expectedOutput: '[3,2,3]', isHidden: true },
    ],
  },
  {
    title: 'Maximum Product of Splitted Binary Tree',
    slug: 'max-product-splitted-binary-tree',
    description: `Given the $root$ of a binary tree as an array in level-order serialization where null nodes are represented as $null$, split the binary tree into two subtrees by removing exactly one edge such that the product of the sums of the subtrees is maximized.

Return the maximum product of the sums of the two subtrees modulo $10^9 + 7$.

### Constraints
- The number of nodes in the tree is in the range $[2, 5 \\times 10^4]$.
- Each node's value is between $[1, 10^4]$.

### Input Format
- An array representing level-order binary tree serialization.

### Output Format
- Return the maximum product modulo $10^9 + 7$.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['tree', 'dfs', 'binary-tree'],
    roadmapLevel: 4,
    roadmapTopic: 'advanced-trees',
    templates: {
      python: `class Solution:\n    def maxProduct(self, tree: list) -> int:\n        pass`,
      javascript: `class Solution {\n    maxProduct(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maxProduct(self, tree: list) -> int:
        if not tree:
            return 0
            
        MOD = 10**9 + 7
        # Build tree from level order
        class TreeNode:
            def __init__(self, val=0, left=None, right=None):
                self.val = val
                self.left = left
                self.right = right
                
        nodes = [TreeNode(val) if val is not None else None for val in tree]
        kids = nodes[::-1]
        root = kids.pop()
        for node in nodes:
            if node:
                if kids: node.left = kids.pop()
                if kids: node.right = kids.pop()
                
        subtree_sums = []
        
        def compute_sums(node):
            if not node:
                return 0
            s = node.val + compute_sums(node.left) + compute_sums(node.right)
            subtree_sums.append(s)
            return s
            
        total_sum = compute_sums(root)
        best_product = 0
        for s in subtree_sums:
            best_product = max(best_product, s * (total_sum - s))
            
        return best_product % MOD`,
      javascript: `class Solution {\n    maxProduct(tree) {\n        if (!tree || tree.length === 0) return 0;\n        const MOD = 1000000007n;\n        \n        class TreeNode {\n            constructor(val) {\n                this.val = val;\n                this.left = null;\n                this.right = null;\n            }\n        }\n        \n        const nodes = tree.map(v => v !== null ? new TreeNode(v) : null);\n        const kids = [...nodes].reverse();\n        const root = kids.pop();\n        for (const node of nodes) {\n            if (node) {\n                if (kids.length > 0) node.left = kids.pop();\n                if (kids.length > 0) node.right = kids.pop();\n            }\n        }\n        \n        const subtreeSums = [];\n        const computeSums = (node) => {\n            if (!node) return 0n;\n            const s = BigInt(node.val) + computeSums(node.left) + computeSums(node.right);\n            subtreeSums.push(s);\n            return s;\n        };\n        \n        const totalSum = computeSums(root);\n        let best = 0n;\n        for (const s of subtreeSums) {\n            const prod = s * (totalSum - s);\n            if (prod > best) best = prod;\n        }\n        return Number(best % MOD);\n    }\n}`,
    },
    hints: [
      'Compute the total sum of all nodes in the tree with a first pass.',
      'For every subtree with sum S, removing its parent edge creates two subtrees of sums S and (Total - S).',
      'Maximize S * (Total - S) over all possible subtrees before taking modulo.',
    ],
    editorial: `### Method Explanation
1. Calculate the total sum of all node values $Total$.
2. For each node $u$, let $S(u)$ be the sum of values in the subtree rooted at $u$.
3. Cutting the edge above $u$ splits the tree into two parts with sums $S(u)$ and $Total - S(u)$.
4. The product is $S(u) \\times (Total - S(u))$. Find the maximum product across all nodes and return modulo $10^9 + 7$.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '[1,2,3,4,5,6]', expectedOutput: '110', isHidden: false },
      { input: '[1,null,2,3,4,null,null,5,6]', expectedOutput: '90', isHidden: false },
      { input: '[2,3,9,10,7,8,6,5,4,11,1]', expectedOutput: '1025', isHidden: true },
    ],
  },
  {
    title: 'All Nodes Distance K in Binary Tree',
    slug: 'all-nodes-distance-k-binary-tree',
    description: `Given the $root$ of a binary tree, the value of a $target$ node in the tree, and an integer $k$, return an array of the values of all nodes that have a distance $k$ from the target node.

You can return the answer in any order.

### Constraints
- The number of nodes in the tree is in the range $[1, 500]$.
- $0 \\le Node.val \\le 500$
- All the values $Node.val$ are unique.
- $target$ is the value of one of the nodes in the tree.
- $0 \\le k \\le 1000$

### Input Format
- A tree level-order array $tree$, an integer $target$, and an integer $k$.

### Output Format
- Return a sorted array of node values at distance $k$.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['tree', 'bfs', 'graph'],
    roadmapLevel: 4,
    roadmapTopic: 'advanced-trees',
    templates: {
      python: `class Solution:\n    def distanceK(self, tree: list, target: int, k: int) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    distanceK(tree, target, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def distanceK(self, tree: list, target: int, k: int) -> list[int]:
        if not tree:
            return []
            
        from collections import defaultdict, deque
        
        # Build undirected graph from tree
        adj = defaultdict(list)
        n = len(tree)
        
        # reconstruct graph from level-order
        # Queue storing (index in tree array, node value)
        # Using tree array mapping
        nodes = []
        for v in tree:
            nodes.append(v)
            
        # Build children links
        q = deque()
        if nodes[0] is not None:
            q.append(0)
        idx = 1
        while q and idx < len(nodes):
            curr_idx = q.popleft()
            u_val = nodes[curr_idx]
            # left child
            if idx < len(nodes):
                if nodes[idx] is not None:
                    v_val = nodes[idx]
                    adj[u_val].append(v_val)
                    adj[v_val].append(u_val)
                    q.append(idx)
                idx += 1
            # right child
            if idx < len(nodes):
                if nodes[idx] is not None:
                    v_val = nodes[idx]
                    adj[u_val].append(v_val)
                    adj[v_val].append(u_val)
                    q.append(idx)
                idx += 1
                
        # BFS from target
        visited = {target}
        bfs_q = deque([(target, 0)])
        res = []
        
        while bfs_q:
            curr, d = bfs_q.popleft()
            if d == k:
                res.append(curr)
            elif d < k:
                for nxt in adj[curr]:
                    if nxt not in visited:
                        visited.add(nxt)
                        bfs_q.append((nxt, d + 1))
                        
        res.sort()
        return res`,
      javascript: `class Solution {\n    distanceK(tree, target, k) {\n        if (!tree || tree.length === 0) return [];\n        const adj = new Map();\n        const addEdge = (u, v) => {\n            if (!adj.has(u)) adj.set(u, []);\n            if (!adj.has(v)) adj.set(v, []);\n            adj.get(u).push(v);\n            adj.get(v).push(u);\n        };\n        \n        const q = [0];\n        let head = 0, idx = 1;\n        while (head < q.length && idx < tree.length) {\n            const currIdx = q[head++];\n            const u = tree[currIdx];\n            if (idx < tree.length) {\n                if (tree[idx] !== null) {\n                    addEdge(u, tree[idx]);\n                    q.push(idx);\n                }\n                idx++;\n            }\n            if (idx < tree.length) {\n                if (tree[idx] !== null) {\n                    addEdge(u, tree[idx]);\n                    q.push(idx);\n                }\n                idx++;\n            }\n        }\n        \n        const visited = new Set([target]);\n        const bfsQ = [[target, 0]];\n        let bHead = 0;\n        const res = [];\n        \n        while (bHead < bfsQ.length) {\n            const [curr, d] = bfsQ[bHead++];\n            if (d === k) {\n                res.push(curr);\n            } else if (d < k) {\n                const neighbors = adj.get(curr) || [];\n                for (const nxt of neighbors) {\n                    if (!visited.has(nxt)) {\n                        visited.add(nxt);\n                        bfsQ.push([nxt, d + 1]);\n                    }\n                }\n            }\n        }\n        res.sort((a, b) => a - b);\n        return res;\n    }\n}`,
    },
    hints: [
      'Convert the tree into an undirected graph by recording parent pointers for each node.',
      'Run standard Breadth-First Search (BFS) starting from the target node up to depth k.',
    ],
    editorial: `### Method Explanation
1. Transform the binary tree into an undirected graph by adding parent edges between nodes.
2. Perform BFS originating from the $target$ node.
3. Once depth reaches $k$, collect all nodes at this layer and return them.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '[3,5,1,6,2,0,8,null,null,7,4], 5, 2', expectedOutput: '[1,4,7]', isHidden: false },
      { input: '[1], 1, 3', expectedOutput: '[]', isHidden: false },
      { input: '[1], 1, 0', expectedOutput: '[1]', isHidden: true },
      { input: '[0,1,null,null,2,null,3], 1, 2', expectedOutput: '[3]', isHidden: true },
    ],
  },
  {
    title: 'Count Good Nodes in Binary Tree',
    slug: 'count-good-nodes-binary-tree',
    description: `Given a binary tree $root$, a node $X$ in the tree is named **good** if in the path from the root to $X$ there are no nodes with a value greater than $X$.

Return the number of **good** nodes in the binary tree.

### Constraints
- The number of nodes in the binary tree is in the range $[1, 10^5]$.
- Each node's value is between $[-10^4, 10^4]$.

### Input Format
- A tree level-order array $tree$.

### Output Format
- Return an integer representing the count of good nodes.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['tree', 'dfs', 'binary-tree'],
    roadmapLevel: 4,
    roadmapTopic: 'advanced-trees',
    templates: {
      python: `class Solution:\n    def goodNodes(self, tree: list) -> int:\n        pass`,
      javascript: `class Solution {\n    goodNodes(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def goodNodes(self, tree: list) -> int:
        if not tree or tree[0] is None:
            return 0
            
        class TreeNode:
            def __init__(self, val=0, left=None, right=None):
                self.val = val
                self.left = left
                self.right = right
                
        nodes = [TreeNode(val) if val is not None else None for val in tree]
        kids = nodes[::-1]
        root = kids.pop()
        for node in nodes:
            if node:
                if kids: node.left = kids.pop()
                if kids: node.right = kids.pop()
                
        good_count = 0
        def dfs(node, max_so_far):
            nonlocal good_count
            if not node:
                return
            if node.val >= max_so_far:
                good_count += 1
                max_so_far = node.val
            dfs(node.left, max_so_far)
            dfs(node.right, max_so_far)
            
        dfs(root, root.val)
        return good_count`,
      javascript: `class Solution {\n    goodNodes(tree) {\n        if (!tree || tree.length === 0 || tree[0] === null) return 0;\n        class TreeNode {\n            constructor(val) {\n                this.val = val;\n                this.left = null;\n                this.right = null;\n            }\n        }\n        const nodes = tree.map(v => v !== null ? new TreeNode(v) : null);\n        const kids = [...nodes].reverse();\n        const root = kids.pop();\n        for (const node of nodes) {\n            if (node) {\n                if (kids.length > 0) node.left = kids.pop();\n                if (kids.length > 0) node.right = kids.pop();\n            }\n        }\n        \n        let goodCount = 0;\n        const dfs = (node, maxSoFar) => {\n            if (!node) return;\n            if (node.val >= maxSoFar) {\n                goodCount++;\n                maxSoFar = node.val;\n            }\n            dfs(node.left, maxSoFar);\n            dfs(node.right, maxSoFar);\n        };\n        \n        dfs(root, root.val);\n        return goodCount;\n    }\n}`,
    },
    hints: [
      'Pass the maximum value seen on the current root-to-node path in your DFS call.',
      'If the current node val >= maxSoFar, it is a good node; then update maxSoFar = max(maxSoFar, val).',
    ],
    editorial: `### Method Explanation
We perform a single DFS traversal from the root:
- Maintain parameter $maxSoFar$, the maximum node value seen along the path from the root.
- A node $u$ is good if $u.val \\ge maxSoFar$.
- Recursively visit left and right children with updated $\\max(maxSoFar, u.val)$.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(H)$ recursion stack depth.`,
    testCases: [
      { input: '[3,1,4,3,null,1,5]', expectedOutput: '4', isHidden: false },
      { input: '[3,3,null,4,2]', expectedOutput: '3', isHidden: false },
      { input: '[1]', expectedOutput: '1', isHidden: false },
      { input: '[-1,5,-2,4,4,2,-2]', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Path Sum III Number of Paths',
    slug: 'path-sum-iii-number-of-paths',
    description: `Given the $root$ of a binary tree and an integer $targetSum$, return the number of paths where the sum of the values along the path equals $targetSum$.

The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).

### Constraints
- The number of nodes in the tree is in the range $[0, 1000]$.
- $-10^9 \\le Node.val \\le 10^9$
- $-1000 \\le targetSum \\le 1000$

### Input Format
- A tree level-order array $tree$ and an integer $targetSum$.

### Output Format
- Return the number of valid paths.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['tree', 'prefix-sum', 'hash-table'],
    roadmapLevel: 4,
    roadmapTopic: 'advanced-trees',
    templates: {
      python: `class Solution:\n    def pathSum(self, tree: list, targetSum: int) -> int:\n        pass`,
      javascript: `class Solution {\n    pathSum(tree, targetSum) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def pathSum(self, tree: list, targetSum: int) -> int:
        if not tree or tree[0] is None:
            return 0
            
        class TreeNode:
            def __init__(self, val=0, left=None, right=None):
                self.val = val
                self.left = left
                self.right = right
                
        nodes = [TreeNode(val) if val is not None else None for val in tree]
        kids = nodes[::-1]
        root = kids.pop()
        for node in nodes:
            if node:
                if kids: node.left = kids.pop()
                if kids: node.right = kids.pop()
                
        from collections import defaultdict
        prefix_count = defaultdict(int)
        prefix_count[0] = 1
        total_paths = 0
        
        def dfs(node, curr_sum):
            nonlocal total_paths
            if not node:
                return
            curr_sum += node.val
            total_paths += prefix_count[curr_sum - targetSum]
            
            prefix_count[curr_sum] += 1
            dfs(node.left, curr_sum)
            dfs(node.right, curr_sum)
            prefix_count[curr_sum] -= 1
            
        dfs(root, 0)
        return total_paths`,
      javascript: `class Solution {\n    pathSum(tree, targetSum) {\n        if (!tree || tree.length === 0 || tree[0] === null) return 0;\n        class TreeNode {\n            constructor(val) {\n                this.val = val;\n                this.left = null;\n                this.right = null;\n            }\n        }\n        const nodes = tree.map(v => v !== null ? new TreeNode(v) : null);\n        const kids = [...nodes].reverse();\n        const root = kids.pop();\n        for (const node of nodes) {\n            if (node) {\n                if (kids.length > 0) node.left = kids.pop();\n                if (kids.length > 0) node.right = kids.pop();\n            }\n        }\n        \n        const prefixMap = new Map();\n        prefixMap.set(0, 1);\n        let totalPaths = 0;\n        \n        const dfs = (node, currSum) => {\n            if (!node) return;\n            currSum += node.val;\n            totalPaths += (prefixMap.get(currSum - targetSum) || 0);\n            prefixMap.set(currSum, (prefixMap.get(currSum) || 0) + 1);\n            dfs(node.left, currSum);\n            dfs(node.right, currSum);\n            prefixMap.set(currSum, prefixMap.get(currSum) - 1);\n        };\n        \n        dfs(root, 0);\n        return totalPaths;\n    }\n}`,
    },
    hints: [
      'Think about Subarray Sum Equals K on a tree path.',
      'Maintain running prefix sums from root down the current branch using a hash map.',
      'Remember to decrement the prefix count when backtracking out of a node.',
    ],
    editorial: `### Method Explanation
Prefix Sum on Tree:
- Maintain a hash map of prefix sum frequencies seen from the root to the current node.
- At node $u$ with running sum $currSum$, any ancestor path with prefix sum $currSum - targetSum$ forms a valid path ending at $u$.
- Backtrack by decrementing $prefixMap[currSum]$ upon leaving the subtree.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '[10,5,-3,3,2,null,11,3,-2,null,1], 8', expectedOutput: '3', isHidden: false },
      { input: '[5,4,8,11,null,13,4,7,2,null,null,5,1], 22', expectedOutput: '3', isHidden: false },
      { input: '[], 0', expectedOutput: '0', isHidden: true },
      { input: '[1,-2,-3], -1', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Validate Binary Search Tree Iterative',
    slug: 'validate-binary-search-tree-iterative',
    description: `Given the $root$ of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys strictly less than the node's key.
- The right subtree of a node contains only nodes with keys strictly greater than the node's key.
- Both the left and right subtrees must also be binary search trees.

### Constraints
- The number of nodes in the tree is in the range $[1, 10^4]$.
- $-2^{31} \\le Node.val \\le 2^{31} - 1$

### Input Format
- A tree level-order array $tree$.

### Output Format
- Return a boolean indicating if the tree is a valid BST.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['tree', 'binary-search-tree', 'dfs'],
    roadmapLevel: 4,
    roadmapTopic: 'advanced-trees',
    templates: {
      python: `class Solution:\n    def isValidBST(self, tree: list) -> bool:\n        pass`,
      javascript: `class Solution {\n    isValidBST(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def isValidBST(self, tree: list) -> bool:
        if not tree or tree[0] is None:
            return True
            
        class TreeNode:
            def __init__(self, val=0, left=None, right=None):
                self.val = val
                self.left = left
                self.right = right
                
        nodes = [TreeNode(val) if val is not None else None for val in tree]
        kids = nodes[::-1]
        root = kids.pop()
        for node in nodes:
            if node:
                if kids: node.left = kids.pop()
                if kids: node.right = kids.pop()
                
        prev = float('-inf')
        stack = []
        curr = root
        
        while stack or curr:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack.pop()
            if curr.val <= prev:
                return False
            prev = curr.val
            curr = curr.right
            
        return True`,
      javascript: `class Solution {\n    isValidBST(tree) {\n        if (!tree || tree.length === 0 || tree[0] === null) return true;\n        class TreeNode {\n            constructor(val) {\n                this.val = val;\n                this.left = null;\n                this.right = null;\n            }\n        }\n        const nodes = tree.map(v => v !== null ? new TreeNode(v) : null);\n        const kids = [...nodes].reverse();\n        const root = kids.pop();\n        for (const node of nodes) {\n            if (node) {\n                if (kids.length > 0) node.left = kids.pop();\n                if (kids.length > 0) node.right = kids.pop();\n            }\n        }\n        \n        let prev = -Infinity;\n        const stack = [];\n        let curr = root;\n        \n        while (stack.length > 0 || curr !== null) {\n            while (curr !== null) {\n                stack.push(curr);\n                curr = curr.left;\n            }\n            curr = stack.pop();\n            if (curr.val <= prev) return false;\n            prev = curr.val;\n            curr = curr.right;\n        }\n        return true;\n    }\n}`,
    },
    hints: [
      'In-order traversal of a valid Binary Search Tree produces a strictly increasing sequence.',
      'Use an iterative in-order traversal using an explicit stack and verify curr.val > prev.',
    ],
    editorial: `### Method Explanation
In-order traversal of a valid BST must visit elements in strictly ascending order:
- Traverse iteratively using a stack (go left as far as possible, visit, go right).
- Maintain $prev$, the value of the previously visited node.
- If at any point $curr.val \\le prev$, the tree is not a valid BST.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(H)$ stack height.`,
    testCases: [
      { input: '[2,1,3]', expectedOutput: 'true', isHidden: false },
      { input: '[5,1,4,null,null,3,6]', expectedOutput: 'false', isHidden: false },
      { input: '[1,1]', expectedOutput: 'false', isHidden: true },
      { input: '[10,5,15,null,null,6,20]', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Lowest Common Ancestor of Deepest Leaves',
    slug: 'lowest-common-ancestor-deepest-leaves',
    description: `Given the $root$ of a binary tree, return the lowest common ancestor of its deepest leaves.

Recall that:
- The node of a binary tree is a leaf if and only if it has no children.
- The depth of the root of the tree is $0$. if the depth of a node is $d$, the depth of each of its children is $d + 1$.
- The lowest common ancestor of a set $S$ of nodes, is the node $A$ with the largest depth such that every node in $S$ is in the subtree with root $A$.

Return the value of the lowest common ancestor node.

### Constraints
- The number of nodes in the tree will be in the range $[1, 1000]$.
- The values of the nodes in the tree are unique and in the range $[0, 1000]$.

### Input Format
- A tree level-order array $tree$.

### Output Format
- Return the integer value of the LCA node.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['tree', 'dfs', 'binary-tree'],
    roadmapLevel: 4,
    roadmapTopic: 'advanced-trees',
    templates: {
      python: `class Solution:\n    def lcaDeepestLeaves(self, tree: list) -> int:\n        pass`,
      javascript: `class Solution {\n    lcaDeepestLeaves(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def lcaDeepestLeaves(self, tree: list) -> int:
        if not tree or tree[0] is None:
            return -1
            
        class TreeNode:
            def __init__(self, val=0, left=None, right=None):
                self.val = val
                self.left = left
                self.right = right
                
        nodes = [TreeNode(val) if val is not None else None for val in tree]
        kids = nodes[::-1]
        root = kids.pop()
        for node in nodes:
            if node:
                if kids: node.left = kids.pop()
                if kids: node.right = kids.pop()
                
        def dfs(node):
            if not node:
                return (0, None)
            d_l, node_l = dfs(node.left)
            d_r, node_r = dfs(node.right)
            if d_l == d_r:
                return (d_l + 1, node.val)
            elif d_l > d_r:
                return (d_l + 1, node_l)
            else:
                return (d_r + 1, node_r)
                
        _, ans = dfs(root)
        return ans`,
      javascript: `class Solution {\n    lcaDeepestLeaves(tree) {\n        if (!tree || tree.length === 0 || tree[0] === null) return -1;\n        class TreeNode {\n            constructor(val) {\n                this.val = val;\n                this.left = null;\n                this.right = null;\n            }\n        }\n        const nodes = tree.map(v => v !== null ? new TreeNode(v) : null);\n        const kids = [...nodes].reverse();\n        const root = kids.pop();\n        for (const node of nodes) {\n            if (node) {\n                if (kids.length > 0) node.left = kids.pop();\n                if (kids.length > 0) node.right = kids.pop();\n            }\n        }\n        \n        const dfs = (node) => {\n            if (!node) return [0, null];\n            const [dL, nodeL] = dfs(node.left);\n            const [dR, nodeR] = dfs(node.right);\n            if (dL === dR) {\n                return [dL + 1, node.val];\n            } else if (dL > dR) {\n                return [dL + 1, nodeL];\n            } else {\n                return [dR + 1, nodeR];\n            }\n        };\n        \n        return dfs(root)[1];\n    }\n}`,
    },
    hints: [
      'Write a recursive helper returning (max_depth_in_subtree, lca_node).',
      'If left depth == right depth, both branches contain deepest leaves, so the current node is their LCA.',
      'If one branch is deeper, propagate that branch\'s LCA.',
    ],
    editorial: `### Method Explanation
DFS bottom-up returns a pair: $(\\text{depth}, \\text{LCA})$:
- If left subtree depth equals right subtree depth, deepest leaves are spread evenly across both sides, so current node is their LCA.
- If one subtree is strictly deeper, the deepest leaves reside entirely in that subtree, so propagate that subtree's LCA.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(H)$.`,
    testCases: [
      { input: '[3,5,1,6,2,0,8,null,null,7,4]', expectedOutput: '2', isHidden: false },
      { input: '[1]', expectedOutput: '1', isHidden: false },
      { input: '[0,1,3,null,2]', expectedOutput: '2', isHidden: false },
      { input: '[1,2,3]', expectedOutput: '1', isHidden: true },
      { input: '[1,2,null,3]', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Construct Binary Tree from Preorder and Postorder',
    slug: 'construct-binary-tree-preorder-postorder',
    description: `Given two integer arrays, $preorder$ and $postorder$ where $preorder$ is the preorder traversal of a binary tree of distinct values and $postorder$ is the postorder traversal of the same tree, reconstruct and return the binary tree in level-order serialization.

If there exist multiple answers, you can return any of them.

### Constraints
- $1 \\le preorder.length \\le 30$
- $1 \\le preorder[i] \\le preorder.length$
- All values of $preorder$ and $postorder$ are unique.
- $postorder.length == preorder.length$

### Input Format
- Two integer arrays $preorder$ and $postorder$.

### Output Format
- Return the level-order serialization array of the reconstructed tree.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['tree', 'divide-and-conquer', 'binary-tree'],
    roadmapLevel: 4,
    roadmapTopic: 'advanced-trees',
    templates: {
      python: `class Solution:\n    def constructFromPrePost(self, preorder: list[int], postorder: list[int]) -> list:\n        pass`,
      javascript: `class Solution {\n    constructFromPrePost(preorder, postorder) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def constructFromPrePost(self, preorder: list[int], postorder: list[int]) -> list:
        class TreeNode:
            def __init__(self, val=0, left=None, right=None):
                self.val = val
                self.left = left
                self.right = right
                
        def build(pre, post):
            if not pre:
                return None
            root = TreeNode(pre[0])
            if len(pre) == 1:
                return root
            # Left child is pre[1]
            left_val = pre[1]
            idx = post.index(left_val)
            left_size = idx + 1
            
            root.left = build(pre[1:1 + left_size], post[:left_size])
            root.right = build(pre[1 + left_size:], post[left_size:-1])
            return root
            
        root = build(preorder, postorder)
        
        # Serialize to level order
        from collections import deque
        if not root:
            return []
        res = []
        q = deque([root])
        while q:
            node = q.popleft()
            if node:
                res.append(node.val)
                q.append(node.left)
                q.append(node.right)
            else:
                res.append(None)
                
        while res and res[-1] is None:
            res.pop()
        return res`,
      javascript: `class Solution {\n    constructFromPrePost(preorder, postorder) {\n        class TreeNode {\n            constructor(val) {\n                this.val = val;\n                this.left = null;\n                this.right = null;\n            }\n        }\n        \n        const build = (pre, post) => {\n            if (pre.length === 0) return null;\n            const root = new TreeNode(pre[0]);\n            if (pre.length === 1) return root;\n            const leftVal = pre[1];\n            const idx = post.indexOf(leftVal);\n            const leftSize = idx + 1;\n            \n            root.left = build(pre.slice(1, 1 + leftSize), post.slice(0, leftSize));\n            root.right = build(pre.slice(1 + leftSize), post.slice(leftSize, post.length - 1));\n            return root;\n        };\n        \n        const root = build(preorder, postorder);\n        if (!root) return [];\n        \n        const res = [];\n        const q = [root];\n        let head = 0;\n        while (head < q.length) {\n            const node = q[head++];\n            if (node !== null) {\n                res.push(node.val);\n                q.push(node.left);\n                q.push(node.right);\n            } else {\n                res.push(null);\n            }\n        }\n        while (res.length > 0 && res[res.length - 1] === null) {\n            res.pop();\n        }\n        return res;\n    }\n}`,
    },
    hints: [
      'The first element of preorder is the root.',
      'The second element of preorder is the root of the left subtree.',
      'Find the index of this left root in postorder to determine the left subtree size.',
    ],
    editorial: `### Method Explanation
Divide and Conquer:
- $preorder[0]$ is the root value.
- $preorder[1]$ is the root of the left subtree.
- In $postorder$, all nodes belonging to the left subtree precede $preorder[1]$. Finding the index $L$ of $preorder[1]$ in $postorder$ gives the size of the left subtree $L + 1$.
- Recursively split and build left and right subtrees.

### Complexity
- **Time Complexity:** $O(N^2)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '[1,2,4,5,3,6,7], [4,5,2,6,7,3,1]', expectedOutput: '[1,2,3,4,5,6,7]', isHidden: false },
      { input: '[1], [1]', expectedOutput: '[1]', isHidden: false },
      { input: '[1,2,3], [3,2,1]', expectedOutput: '[1,2,null,3]', isHidden: true },
    ],
  },
  {
    title: 'Serialize and Deserialize BST Compact',
    slug: 'serialize-deserialize-bst-compact',
    description: `Design an algorithm to serialize and deserialize a Binary Search Tree (BST) using its unique preorder traversal property without storing null pointers.

The serialized string should be as compact as possible.

Implement:
- \`serialize(tree)\`: returns a comma-separated string of the preorder traversal.
- \`deserialize(data)\`: reconstructs the tree in level-order serialization.

For this problem, given the tree array, return the deserialized level-order array after round-tripping through the serializer and deserializer.

### Constraints
- The number of nodes in the tree is in the range $[0, 10^4]$.
- $0 \\le Node.val \\le 10^4$
- The input tree is guaranteed to be a valid BST.

### Input Format
- A tree level-order array $tree$.

### Output Format
- Return the round-tripped level-order array.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['tree', 'binary-search-tree', 'design'],
    roadmapLevel: 4,
    roadmapTopic: 'advanced-trees',
    templates: {
      python: `class Solution:\n    def serializeAndDeserialize(self, tree: list) -> list:\n        pass`,
      javascript: `class Solution {\n    serializeAndDeserialize(tree) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def serializeAndDeserialize(self, tree: list) -> list:
        if not tree or tree[0] is None:
            return []
            
        class TreeNode:
            def __init__(self, val=0, left=None, right=None):
                self.val = val
                self.left = left
                self.right = right
                
        # 1. Build initial tree from level order
        nodes = [TreeNode(val) if val is not None else None for val in tree]
        kids = nodes[::-1]
        root = kids.pop()
        for node in nodes:
            if node:
                if kids: node.left = kids.pop()
                if kids: node.right = kids.pop()
                
        # 2. Serialize to preorder string
        preorder = []
        def get_preorder(node):
            if not node:
                return
            preorder.append(str(node.val))
            get_preorder(node.left)
            get_preorder(node.right)
            
        get_preorder(root)
        s_data = ",".join(preorder)
        
        # 3. Deserialize preorder to BST in O(N) using bounds
        vals = [int(x) for x in s_data.split(",") if x]
        idx = 0
        def build_bst(lower, upper):
            nonlocal idx
            if idx >= len(vals):
                return None
            val = vals[idx]
            if not (lower < val < upper):
                return None
            idx += 1
            node = TreeNode(val)
            node.left = build_bst(lower, val)
            node.right = build_bst(val, upper)
            return node
            
        new_root = build_bst(float('-inf'), float('inf'))
        
        # 4. Level order serialization of new root
        from collections import deque
        if not new_root:
            return []
        res = []
        q = deque([new_root])
        while q:
            node = q.popleft()
            if node:
                res.append(node.val)
                q.append(node.left)
                q.append(node.right)
            else:
                res.append(None)
                
        while res and res[-1] is None:
            res.pop()
        return res`,
      javascript: `class Solution {\n    serializeAndDeserialize(tree) {\n        if (!tree || tree.length === 0 || tree[0] === null) return [];\n        class TreeNode {\n            constructor(val) {\n                this.val = val;\n                this.left = null;\n                this.right = null;\n            }\n        }\n        const nodes = tree.map(v => v !== null ? new TreeNode(v) : null);\n        const kids = [...nodes].reverse();\n        const root = kids.pop();\n        for (const node of nodes) {\n            if (node) {\n                if (kids.length > 0) node.left = kids.pop();\n                if (kids.length > 0) node.right = kids.pop();\n            }\n        }\n        \n        const preorder = [];\n        const getPreorder = (node) => {\n            if (!node) return;\n            preorder.push(node.val);\n            getPreorder(node.left);\n            getPreorder(node.right);\n        };\n        getPreorder(root);\n        \n        let idx = 0;\n        const buildBst = (lower, upper) => {\n            if (idx >= preorder.length) return null;\n            const val = preorder[idx];\n            if (val <= lower || val >= upper) return null;\n            idx++;\n            const node = new TreeNode(val);\n            node.left = buildBst(lower, val);\n            node.right = buildBst(val, upper);\n            return node;\n        };\n        \n        const newRoot = buildBst(-Infinity, Infinity);\n        if (!newRoot) return [];\n        \n        const res = [];\n        const q = [newRoot];\n        let head = 0;\n        while (head < q.length) {\n            const node = q[head++];\n            if (node !== null) {\n                res.push(node.val);\n                q.push(node.left);\n                q.push(node.right);\n            } else {\n                res.push(null);\n            }\n        }\n        while (res.length > 0 && res[res.length - 1] === null) {\n            res.pop();\n        }\n        return res;\n    }\n}`,
    },
    hints: [
      'In a BST, preorder traversal uniquely determines the BST structure without storing null markers.',
      'To reconstruct in O(N), use upper and lower value bounds during preorder consumption.',
    ],
    editorial: `### Method Explanation
BST Preorder Reconstruction:
- Serialization: Simply output the preorder traversal sequence.
- Deserialization: Reconstruct using valid lower/upper key bounds. A value fits into the current subtree if $lower < val < upper$.
- Because each element is processed at most once, reconstruction is $O(N)$.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '[2,1,3]', expectedOutput: '[2,1,3]', isHidden: false },
      { input: '[]', expectedOutput: '[]', isHidden: false },
      { input: '[5,3,6,2,4,null,7]', expectedOutput: '[5,3,6,2,4,null,7]', isHidden: true },
    ],
  },
];
