import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack250ExtADefs: ProblemDef[] = [
  // 1. Diameter of Binary Tree
  {
    title: 'Diameter of Binary Tree',
    slug: 'diameter-of-binary-tree',
    description: `Given the root of a binary tree represented as an array in level-order traversal (\`null\` representing absent children), return the length of the **diameter** of the tree.
The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root. The length of a path between two nodes is represented by the number of edges between them.`,
    difficulty: Difficulty.EASY,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= Number of nodes <= 10^4\n-100 <= Node.val <= 100`,
    inputFormat: `An array representing level order values.`,
    outputFormat: `An integer representing the diameter.`,
    sampleInput: `[1,2,3,4,5]`,
    sampleOutput: `3`,
    points: 100,
    hints: [
      'The longest path through any node u is depth(left) + depth(right).',
      'Use post-order DFS to compute subtree heights while updating global max diameter.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def diameterOfBinaryTree(self, root: list) -> int:\n        pass`,
      javascript: `class Solution {\n    diameterOfBinaryTree(root) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def diameterOfBinaryTree(self, root: list) -> int:
        if not root or root[0] is None:
            return 0
        nodes = [x if x != 'null' and x is not None else None for x in root]
        n = len(nodes)
        diameter = 0
        def height(idx):
            nonlocal diameter
            if idx >= n or nodes[idx] is None:
                return 0
            lh = height(2 * idx + 1)
            rh = height(2 * idx + 2)
            diameter = max(diameter, lh + rh)
            return 1 + max(lh, rh)
        height(0)
        return diameter`,
      javascript: `class Solution {
    diameterOfBinaryTree(root) {
        if (!root || root.length === 0 || root[0] === null || root[0] === 'null') return 0;
        const nodes = root.map(x => x === 'null' || x === null ? null : parseInt(x, 10));
        const n = nodes.length;
        let diameter = 0;
        function height(idx) {
            if (idx >= n || nodes[idx] === null) return 0;
            const lh = height(2 * idx + 1);
            const rh = height(2 * idx + 2);
            if (lh + rh > diameter) diameter = lh + rh;
            return 1 + Math.max(lh, rh);
        }
        height(0);
        return diameter;
    }
}`,
    },
    editorial: {
      approach: 'Bottom-up DFS calculating subtree heights.',
      algorithm: '1. For every node, diameter through it equals left_height + right_height.\n2. Return 1 + max(left_height, right_height) to parent.\n3. Track global maximum diameter across all visited nodes.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      content: 'Single-pass post-order traversal checks every node as the potential peak of the tree diameter.',
      referenceCode: `def height(u):\n    lh, rh = height(u.left), height(u.right)\n    diameter = max(diameter, lh + rh)\n    return 1 + max(lh, rh)`,
    },
    tags: ['Tree', 'Binary Tree', 'Depth-First Search'],
    testCases: [
      { input: `[1,2,3,4,5]`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `[1,2]`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `[1]`, expectedOutput: `0`, isHidden: true, order: 2 },
      { input: `[1,2,3,4,null,null,5]`, expectedOutput: `4`, isHidden: true, order: 3 },
    ],
  },

  // 2. Lowest Common Ancestor of a Binary Tree
  {
    title: 'Lowest Common Ancestor of a Binary Tree',
    slug: 'lowest-common-ancestor-of-a-binary-tree',
    description: `Given a binary tree and two node values \`p\` and \`q\`, find the Lowest Common Ancestor (LCA) node value in the tree.
The lowest common ancestor between two nodes \`p\` and \`q\` is defined as the lowest node \`T\` in tree that has both \`p\` and \`q\` as descendants (where we allow a node to be a descendant of itself). All node values are unique.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `2 <= Number of nodes <= 10^5\np != q\nAll Node.val are unique.`,
    inputFormat: `A level-order array and two integer values p and q.`,
    outputFormat: `An integer representing the LCA node value.`,
    sampleInput: `[3,5,1,6,2,0,8,null,null,7,4], 5, 1`,
    sampleOutput: `3`,
    points: 150,
    hints: [
      'If the current node matches p or q, return current node.',
      'Recurse on left and right subtrees. If both return non-null, current node is the LCA.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def lowestCommonAncestor(self, root: list, p: int, q: int) -> int:\n        pass`,
      javascript: `class Solution {\n    lowestCommonAncestor(root, p, q) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def lowestCommonAncestor(self, root: list, p: int, q: int) -> int:
        nodes = [x if x != 'null' and x is not None else None for x in root]
        n = len(nodes)
        def find_lca(idx):
            if idx >= n or nodes[idx] is None:
                return None
            val = nodes[idx]
            if val == p or val == q:
                return val
            left = find_lca(2 * idx + 1)
            right = find_lca(2 * idx + 2)
            if left is not None and right is not None:
                return val
            return left if left is not None else right
        return find_lca(0)`,
      javascript: `class Solution {
    lowestCommonAncestor(root, p, q) {
        const nodes = root.map(x => x === 'null' || x === null ? null : parseInt(x, 10));
        const n = nodes.length;
        function findLca(idx) {
            if (idx >= n || nodes[idx] === null) return null;
            const val = nodes[idx];
            if (val === p || val === q) return val;
            const left = findLca(2 * idx + 1);
            const right = findLca(2 * idx + 2);
            if (left !== null && right !== null) return val;
            return left !== null ? left : right;
        }
        return findLca(0);
    }
}`,
    },
    editorial: {
      approach: 'Recursive post-order traversal.',
      algorithm: '1. If root is null, p, or q, return root.\n2. Recurse left and right subtrees.\n3. If both subtrees return non-null, root is the LCA; otherwise return the non-null child result.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      content: 'Standard LCA in arbitrary binary tree without parent pointers.',
      referenceCode: `def lca(root, p, q):\n    if not root or root.val in (p, q): return root\n    left, right = lca(root.left, p, q), lca(root.right, p, q)\n    return root if left and right else (left or right)`,
    },
    tags: ['Tree', 'Binary Tree', 'Depth-First Search'],
    testCases: [
      { input: `[3,5,1,6,2,0,8,null,null,7,4], 5, 1`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `[3,5,1,6,2,0,8,null,null,7,4], 5, 4`, expectedOutput: `5`, isHidden: false, order: 1 },
      { input: `[1,2], 1, 2`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },

  // 3. Path Sum III
  {
    title: 'Path Sum III',
    slug: 'path-sum-iii',
    description: `Given the root of a binary tree and an integer \`targetSum\`, return the number of paths where the sum of the values along the path equals \`targetSum\`.
The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1500,
    memoryLimit: 128,
    constraints: `0 <= Number of nodes <= 10^4\n-10^9 <= Node.val <= 10^9\n-1000 <= targetSum <= 1000`,
    inputFormat: `A level-order array and targetSum integer.`,
    outputFormat: `An integer representing the count of valid downward paths.`,
    sampleInput: `[10,5,-3,3,2,null,11,3,-2,null,1], 8`,
    sampleOutput: `3`,
    points: 150,
    hints: [
      'Use Prefix Sum hash map during DFS.',
      'A path ending at current node has sum target if (curr_sum - target) exists in prefix map.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def pathSum(self, root: list, targetSum: int) -> int:\n        pass`,
      javascript: `class Solution {\n    pathSum(root, targetSum) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def pathSum(self, root: list, targetSum: int) -> int:
        from collections import defaultdict
        if not root or root[0] is None:
            return 0
        nodes = [x if x != 'null' and x is not None else None for x in root]
        n = len(nodes)
        prefix = defaultdict(int)
        prefix[0] = 1
        count = 0
        def dfs(idx, curr):
            nonlocal count
            if idx >= n or nodes[idx] is None:
                return
            curr += nodes[idx]
            count += prefix[curr - targetSum]
            prefix[curr] += 1
            dfs(2 * idx + 1, curr)
            dfs(2 * idx + 2, curr)
            prefix[curr] -= 1
        dfs(0, 0)
        return count`,
      javascript: `class Solution {
    pathSum(root, targetSum) {
        if (!root || root.length === 0 || root[0] === null || root[0] === 'null') return 0;
        const nodes = root.map(x => x === 'null' || x === null ? null : parseInt(x, 10));
        const n = nodes.length;
        const prefix = new Map();
        prefix.set(0, 1);
        let count = 0;
        function dfs(idx, curr) {
            if (idx >= n || nodes[idx] === null) return;
            curr += nodes[idx];
            const need = curr - targetSum;
            if (prefix.has(need)) count += prefix.get(need);
            prefix.set(curr, (prefix.get(curr) || 0) + 1);
            dfs(2 * idx + 1, curr);
            dfs(2 * idx + 2, curr);
            prefix.set(curr, prefix.get(curr) - 1);
        }
        dfs(0, 0);
        return count;
    }
}`,
    },
    editorial: {
      approach: 'Prefix Sum Hash Map with Backtracking DFS.',
      algorithm: '1. Maintain prefix sum frequency map along the path from root.\n2. At each node, check if (current_sum - target) is in prefix map.\n3. Recurse down, then backtrack prefix sum frequency when returning to parent.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      content: 'Prefix sums translate subarray sum equals K into tree path searching in linear time.',
      referenceCode: `count += prefix[curr - target]\nprefix[curr] += 1\ndfs(left); dfs(right)\nprefix[curr] -= 1`,
    },
    tags: ['Tree', 'Binary Tree', 'Prefix Sum', 'Depth-First Search'],
    testCases: [
      { input: `[10,5,-3,3,2,null,11,3,-2,null,1], 8`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `[5,4,8,11,null,13,4,7,2,null,null,5,1], 22`, expectedOutput: `3`, isHidden: false, order: 1 },
      { input: `[1], 0`, expectedOutput: `0`, isHidden: true, order: 2 },
      { input: `[1,2], 3`, expectedOutput: `1`, isHidden: true, order: 3 },
    ],
  },

  // 4. Binary Tree Cameras (Tree DP - Hard)
  {
    title: 'Binary Tree Cameras',
    slug: 'binary-tree-cameras',
    description: `You are given the \`root\` of a binary tree. We install cameras on the tree nodes where each camera at a node can monitor its parent, itself, and its immediate children.
Return the minimum number of cameras needed to monitor all nodes of the tree.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= Number of nodes <= 1000\nNode values are integers.`,
    inputFormat: `Level-order serialized binary tree array.`,
    outputFormat: `An integer representing the minimum number of cameras.`,
    sampleInput: `[0,0,null,0,0]`,
    sampleOutput: `1`,
    points: 200,
    hints: [
      'Model 3 states for each node: 0 = unmonitored, 1 = has camera, 2 = monitored without camera.',
      'Greedily place cameras at parents of leaf nodes from bottom up.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def minCameraCover(self, root: list) -> int:\n        pass`,
      javascript: `class Solution {\n    minCameraCover(root) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minCameraCover(self, root: list) -> int:
        if not root or root[0] is None:
            return 0
        nodes = [0 if x != 'null' and x is not None else None for x in root]
        n = len(nodes)
        cameras = 0
        def dfs(idx):
            nonlocal cameras
            if idx >= n or nodes[idx] is None:
                return 2
            left = dfs(2 * idx + 1)
            right = dfs(2 * idx + 2)
            if left == 0 or right == 0:
                cameras += 1
                return 1
            if left == 1 or right == 1:
                return 2
            return 0
        root_state = dfs(0)
        if root_state == 0:
            cameras += 1
        return cameras`,
      javascript: `class Solution {
    minCameraCover(root) {
        if (!root || root.length === 0 || root[0] === null || root[0] === 'null') return 0;
        const nodes = root.map(x => x === 'null' || x === null ? null : 0);
        const n = nodes.length;
        let cameras = 0;
        function dfs(idx) {
            if (idx >= n || nodes[idx] === null) return 2;
            const left = dfs(2 * idx + 1);
            const right = dfs(2 * idx + 2);
            if (left === 0 || right === 0) { cameras++; return 1; }
            if (left === 1 || right === 1) return 2;
            return 0;
        }
        if (dfs(0) === 0) cameras++;
        return cameras;
    }
}`,
    },
    editorial: {
      approach: 'Greedy Post-order Tree DP.',
      algorithm: '1. Classify states: 0 (uncovered), 1 (has camera), 2 (covered without camera).\n2. If either child is uncovered, place camera at current node.\n3. If either child has a camera, current node is covered.\n4. If root remains uncovered after traversal, place one final camera.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      content: 'Greedily placing cameras at parents of uncovered leaves maximizes node coverage.',
      referenceCode: `if left == 0 or right == 0:\n    cameras += 1; return 1\nreturn 2 if left == 1 or right == 1 else 0`,
    },
    tags: ['Tree', 'Binary Tree', 'Dynamic Programming', 'Greedy'],
    testCases: [
      { input: `[0,0,null,0,0]`, expectedOutput: `1`, isHidden: false, order: 0 },
      { input: `[0,0,null,0,null,0,null,null,0]`, expectedOutput: `2`, isHidden: false, order: 1 },
      { input: `[0]`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },

  // 5. Serialize and Deserialize Binary Tree (Hard)
  {
    title: 'Serialize and Deserialize Binary Tree',
    slug: 'serialize-and-deserialize-binary-tree',
    description: `Design an algorithm to serialize and deserialize a binary tree. Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.
Implement string preorder serialization with \`#\` as null sentinel, and verify identity.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= Number of nodes <= 10^4\n-1000 <= Node.val <= 1000`,
    inputFormat: `Preorder comma-separated binary tree string.`,
    outputFormat: `The reconstructed and re-serialized preorder string matching canonical format.`,
    sampleInput: `"1,2,#,#,3,4,#,#,5,#,#"`,
    sampleOutput: `"1,2,#,#,3,4,#,#,5,#,#"`,
    points: 200,
    hints: [
      'Preorder traversal DFS naturally serializes root, left, right.',
      'Use an iterator/queue during deserialization to reconstruct subtrees recursively.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def serializeAndDeserialize(self, data: str) -> str:\n        pass`,
      javascript: `class Solution {\n    serializeAndDeserialize(data) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def serializeAndDeserialize(self, data: str) -> str:
        if not data or data == "#":
            return "#"
        tokens = data.replace(',', ' ').split()
        idx = 0
        def deserialize():
            nonlocal idx
            if idx >= len(tokens) or tokens[idx] == '#':
                idx += 1
                return None
            val = int(tokens[idx])
            idx += 1
            left = deserialize()
            right = deserialize()
            return (val, left, right)
        root = deserialize()
        out = []
        def serialize(node):
            if node is None:
                out.append('#')
                return
            out.append(str(node[0]))
            serialize(node[1])
            serialize(node[2])
        serialize(root)
        return ",".join(out)`,
      javascript: `class Solution {
    serializeAndDeserialize(data) {
        if (!data || data === "#") return "#";
        const tokens = data.replace(/,/g, ' ').split(/\\s+/);
        let idx = 0;
        function deserialize() {
            if (idx >= tokens.length || tokens[idx] === '#') { idx++; return null; }
            const val = parseInt(tokens[idx++], 10);
            return { val, left: deserialize(), right: deserialize() };
        }
        const root = deserialize();
        const out = [];
        function serialize(node) {
            if (node === null) { out.push('#'); return; }
            out.push(node.val.toString());
            serialize(node.left);
            serialize(node.right);
        }
        serialize(root);
        return out.join(",");
    }
}`,
    },
    editorial: {
      approach: 'Preorder DFS serialization and pointer reconstruction.',
      algorithm: '1. Serialization: Preorder DFS outputting root, left, right with "#" for null.\n2. Deserialization: Pop elements sequentially from stream to build tree nodes.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Preorder traversal uniquely preserves binary tree structure when null leaves are encoded.',
      referenceCode: `def serialize(root):\n    return f"{root.val},{serialize(root.left)},{serialize(root.right)}" if root else "#"`,
    },
    tags: ['Tree', 'Binary Tree', 'Design', 'Depth-First Search'],
    testCases: [
      { input: `"1,2,#,#,3,4,#,#,5,#,#"`, expectedOutput: `"1,2,#,#,3,4,#,#,5,#,#"`, isHidden: false, order: 0 },
      { input: `"#"` , expectedOutput: `"#"` , isHidden: false, order: 1 },
      { input: `"1,#,#"` , expectedOutput: `"1,#,#"` , isHidden: true, order: 2 },
    ],
  },
];
