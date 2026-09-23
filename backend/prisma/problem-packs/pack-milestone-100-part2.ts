import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack100Part2ProblemDefs: ProblemDef[] = [
  // 1. Maximum Depth of Binary Tree
  {
    title: 'Maximum Depth of Binary Tree',
    slug: 'maximum-depth-of-binary-tree',
    description: `Given the \`root\` of a binary tree, return its maximum depth.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `The number of nodes in the tree is in the range [0, 10^4].\n-100 <= Node.val <= 100`,
    inputFormat: `Line 1: Level-order comma-separated string representation of binary tree (e.g. 3,9,20,null,null,15,7).`,
    outputFormat: `An integer representing maximum depth.`,
    sampleInput: `3,9,20,null,null,15,7`,
    sampleOutput: `3`,
    points: 100,
    hints: [
      'The depth of a tree is 1 + max(depth(left), depth(right)).',
    ],
    codeTemplates: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print(0)
        return
    parts = [x.strip() for x in line.split(',') if x.strip()]
    if not parts or parts[0] == 'null':
        print(0)
        return
    root = TreeNode(int(parts[0]))
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(int(parts[idx]))
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(int(parts[idx]))
            q.append(node.right)
        idx += 1
    def max_depth(n):
        if not n: return 0
        return 1 + max(max_depth(n.left), max_depth(n.right))
    print(max_depth(root))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(0); return; }
    const parts = line.split(',').map(x => x.trim()).filter(Boolean);
    if (parts.length === 0 || parts[0] === 'null') { console.log(0); return; }
    function TreeNode(val) { this.val = val; this.left = this.right = null; }
    const root = new TreeNode(parseInt(parts[0], 10));
    const q = [root];
    let idx = 1;
    while (q.length > 0 && idx < parts.length) {
        const node = q.shift();
        if (idx < parts.length && parts[idx] !== 'null') {
            node.left = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.left);
        }
        idx++;
        if (idx < parts.length && parts[idx] !== 'null') {
            node.right = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.right);
        }
        idx++;
    }
    function maxDepth(n) {
        if (!n) return 0;
        return 1 + Math.max(maxDepth(n.left), maxDepth(n.right));
    }
    console.log(maxDepth(root));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print(0)
        return
    parts = [x.strip() for x in line.split(',') if x.strip()]
    if not parts or parts[0] == 'null':
        print(0)
        return
    root = TreeNode(int(parts[0]))
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(int(parts[idx]))
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(int(parts[idx]))
            q.append(node.right)
        idx += 1
    def max_depth(n):
        if not n: return 0
        return 1 + max(max_depth(n.left), max_depth(n.right))
    print(max_depth(root))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(0); return; }
    const parts = line.split(',').map(x => x.trim()).filter(Boolean);
    if (parts.length === 0 || parts[0] === 'null') { console.log(0); return; }
    function TreeNode(val) { this.val = val; this.left = this.right = null; }
    const root = new TreeNode(parseInt(parts[0], 10));
    const q = [root];
    let idx = 1;
    while (q.length > 0 && idx < parts.length) {
        const node = q.shift();
        if (idx < parts.length && parts[idx] !== 'null') {
            node.left = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.left);
        }
        idx++;
        if (idx < parts.length && parts[idx] !== 'null') {
            node.right = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.right);
        }
        idx++;
    }
    function maxDepth(n) {
        if (!n) return 0;
        return 1 + Math.max(maxDepth(n.left), maxDepth(n.right));
    }
    console.log(maxDepth(root));
}

solve();
`,
    },
    editorial: {
      approach: 'Recursive Depth-First Tree Height Traversal',
      algorithm: 'Base case returns 0 for empty nodes. Recursive step computes 1 plus the maximum child subtree height.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h) call stack',
      content: 'Every node visited exactly once.',
      referenceCode: `def max_depth(root):
    if not root: return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
    },
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
    testCases: [
      { input: '3,9,20,null,null,15,7', expectedOutput: '3', isHidden: false },
      { input: '1,null,2', expectedOutput: '2', isHidden: false },
      { input: '', expectedOutput: '0', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: true },
      { input: '1,2,3,4,5,null,null', expectedOutput: '3', isHidden: true },
    ],
  },

  // 2. Same Tree
  {
    title: 'Same Tree',
    slug: 'same-tree',
    description: `Given the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `The number of nodes in both trees is in the range [0, 100].\n-10^4 <= Node.val <= 10^4`,
    inputFormat: `Line 1: Level-order comma-separated string for tree \`p\`.\nLine 2: Level-order comma-separated string for tree \`q\`.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `1,2,3\n1,2,3`,
    sampleOutput: `true`,
    points: 100,
    hints: [
      'Two trees are identical if both roots are null, or both roots have identical values and their left and right subtrees are identical.',
    ],
    codeTemplates: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build_tree(s):
    if not s: return None
    parts = [x.strip() for x in s.split(',') if x.strip()]
    if not parts or parts[0] == 'null': return None
    root = TreeNode(int(parts[0]))
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(int(parts[idx]))
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(int(parts[idx]))
            q.append(node.right)
        idx += 1
    return root

def is_same(p, q):
    if not p and not q: return True
    if not p or not q: return False
    return p.val == q.val and is_same(p.left, q.left) and is_same(p.right, q.right)

def solve():
    raw = sys.stdin.read()
    lines = raw.splitlines()
    s1 = lines[0].strip() if len(lines) > 0 else ""
    s2 = lines[1].strip() if len(lines) > 1 else ""
    p = build_tree(s1)
    q = build_tree(s2)
    print("true" if is_same(p, q) else "false")

solve()
`,
      javascript: `const fs = require('fs');

function TreeNode(val) { this.val = val; this.left = this.right = null; }
function buildTree(s) {
    if (!s) return null;
    const parts = s.split(',').map(x => x.trim()).filter(Boolean);
    if (parts.length === 0 || parts[0] === 'null') return null;
    const root = new TreeNode(parseInt(parts[0], 10));
    const q = [root];
    let idx = 1;
    while (q.length > 0 && idx < parts.length) {
        const node = q.shift();
        if (idx < parts.length && parts[idx] !== 'null') {
            node.left = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.left);
        }
        idx++;
        if (idx < parts.length && parts[idx] !== 'null') {
            node.right = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.right);
        }
        idx++;
    }
    return root;
}
function isSame(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p.val === q.val && isSame(p.left, q.left) && isSame(p.right, q.right);
}
function solve() {
    const raw = fs.readFileSync(0, 'utf-8');
    const lines = raw.split(/\\r?\\n/);
    const s1 = lines.length > 0 ? lines[0].trim() : '';
    const s2 = lines.length > 1 ? lines[1].trim() : '';
    const p = buildTree(s1);
    const q = buildTree(s2);
    console.log(isSame(p, q) ? "true" : "false");
}
solve();
`,
    },
    referenceSolutions: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build_tree(s):
    if not s: return None
    parts = [x.strip() for x in s.split(',') if x.strip()]
    if not parts or parts[0] == 'null': return None
    root = TreeNode(int(parts[0]))
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(int(parts[idx]))
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(int(parts[idx]))
            q.append(node.right)
        idx += 1
    return root

def is_same(p, q):
    if not p and not q: return True
    if not p or not q: return False
    return p.val == q.val and is_same(p.left, q.left) and is_same(p.right, q.right)

def solve():
    raw = sys.stdin.read()
    lines = raw.splitlines()
    s1 = lines[0].strip() if len(lines) > 0 else ""
    s2 = lines[1].strip() if len(lines) > 1 else ""
    p = build_tree(s1)
    q = build_tree(s2)
    print("true" if is_same(p, q) else "false")

solve()
`,
      javascript: `const fs = require('fs');

function TreeNode(val) { this.val = val; this.left = this.right = null; }
function buildTree(s) {
    if (!s) return null;
    const parts = s.split(',').map(x => x.trim()).filter(Boolean);
    if (parts.length === 0 || parts[0] === 'null') return null;
    const root = new TreeNode(parseInt(parts[0], 10));
    const q = [root];
    let idx = 1;
    while (q.length > 0 && idx < parts.length) {
        const node = q.shift();
        if (idx < parts.length && parts[idx] !== 'null') {
            node.left = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.left);
        }
        idx++;
        if (idx < parts.length && parts[idx] !== 'null') {
            node.right = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.right);
        }
        idx++;
    }
    return root;
}
function isSame(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p.val === q.val && isSame(p.left, q.left) && isSame(p.right, q.right);
}
function solve() {
    const raw = fs.readFileSync(0, 'utf-8');
    const lines = raw.split(/\\r?\\n/);
    const s1 = lines.length > 0 ? lines[0].trim() : '';
    const s2 = lines.length > 1 ? lines[1].trim() : '';
    const p = buildTree(s1);
    const q = buildTree(s2);
    console.log(isSame(p, q) ? "true" : "false");
}
solve();
`,
    },
    editorial: {
      approach: 'Simultaneous Dual-Tree Depth-First Traversal',
      algorithm: 'Recursively verify value equality and structural symmetry across left and right child pairs.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      content: 'Early exits immediately upon encountering mismatched values or structures.',
      referenceCode: `def is_same_tree(p, q):
    if not p and not q: return True
    if not p or not q: return False
    return p.val == q.val and is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)`,
    },
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
    testCases: [
      { input: '1,2,3\n1,2,3', expectedOutput: 'true', isHidden: false },
      { input: '1,2\n1,null,2', expectedOutput: 'false', isHidden: false },
      { input: '1,2,1\n1,1,2', expectedOutput: 'false', isHidden: false },
      { input: '\n', expectedOutput: 'true', isHidden: true },
      { input: '10\n10', expectedOutput: 'true', isHidden: true },
    ],
  },

  // 3. Lowest Common Ancestor of a BST
  {
    title: 'Lowest Common Ancestor of a Binary Search Tree',
    slug: 'lowest-common-ancestor-of-a-bst',
    description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes \`p\` and \`q\` as the lowest node in \`T\` that has both \`p\` and \`q\` as descendants (where we allow **a node to be a descendant of itself**).”`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `The number of nodes in the tree is in the range [2, 10^5].\n-10^9 <= Node.val <= 10^9\nAll Node.val are unique.\np != q\np and q will exist in the BST.`,
    inputFormat: `Line 1: Level-order comma-separated BST.\nLine 2: Value of node \`p\`.\nLine 3: Value of node \`q\`.`,
    outputFormat: `An integer representing the LCA node value.`,
    sampleInput: `6,2,8,0,4,7,9,null,null,3,5\n2\n8`,
    sampleOutput: `6`,
    points: 150,
    hints: [
      'In a BST, if both p and q are smaller than root, LCA is in left subtree.',
      'If both p and q are greater than root, LCA is in right subtree.',
      'Otherwise, the current root is the split point (the LCA).',
    ],
    codeTemplates: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build_tree(s):
    if not s: return None
    parts = [x.strip() for x in s.split(',') if x.strip()]
    if not parts or parts[0] == 'null': return None
    root = TreeNode(int(parts[0]))
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(int(parts[idx]))
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(int(parts[idx]))
            q.append(node.right)
        idx += 1
    return root

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 3: return
    root = build_tree(lines[0].strip())
    p = int(lines[1].strip())
    q = int(lines[2].strip())
    curr = root
    while curr:
        if p < curr.val and q < curr.val:
            curr = curr.left
        elif p > curr.val and q > curr.val:
            curr = curr.right
        else:
            print(curr.val)
            return

solve()
`,
      javascript: `const fs = require('fs');

function TreeNode(val) { this.val = val; this.left = this.right = null; }
function buildTree(s) {
    if (!s) return null;
    const parts = s.split(',').map(x => x.trim()).filter(Boolean);
    if (parts.length === 0 || parts[0] === 'null') return null;
    const root = new TreeNode(parseInt(parts[0], 10));
    const q = [root];
    let idx = 1;
    while (q.length > 0 && idx < parts.length) {
        const node = q.shift();
        if (idx < parts.length && parts[idx] !== 'null') {
            node.left = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.left);
        }
        idx++;
        if (idx < parts.length && parts[idx] !== 'null') {
            node.right = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.right);
        }
        idx++;
    }
    return root;
}
function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 3) return;
    const root = buildTree(lines[0].trim());
    const p = parseInt(lines[1].trim(), 10);
    const q = parseInt(lines[2].trim(), 10);
    let curr = root;
    while (curr) {
        if (p < curr.val && q < curr.val) curr = curr.left;
        else if (p > curr.val && q > curr.val) curr = curr.right;
        else {
            console.log(curr.val);
            return;
        }
    }
}
solve();
`,
    },
    referenceSolutions: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build_tree(s):
    if not s: return None
    parts = [x.strip() for x in s.split(',') if x.strip()]
    if not parts or parts[0] == 'null': return None
    root = TreeNode(int(parts[0]))
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(int(parts[idx]))
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(int(parts[idx]))
            q.append(node.right)
        idx += 1
    return root

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 3: return
    root = build_tree(lines[0].strip())
    p = int(lines[1].strip())
    q = int(lines[2].strip())
    curr = root
    while curr:
        if p < curr.val and q < curr.val:
            curr = curr.left
        elif p > curr.val and q > curr.val:
            curr = curr.right
        else:
            print(curr.val)
            return

solve()
`,
      javascript: `const fs = require('fs');

function TreeNode(val) { this.val = val; this.left = this.right = null; }
function buildTree(s) {
    if (!s) return null;
    const parts = s.split(',').map(x => x.trim()).filter(Boolean);
    if (parts.length === 0 || parts[0] === 'null') return null;
    const root = new TreeNode(parseInt(parts[0], 10));
    const q = [root];
    let idx = 1;
    while (q.length > 0 && idx < parts.length) {
        const node = q.shift();
        if (idx < parts.length && parts[idx] !== 'null') {
            node.left = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.left);
        }
        idx++;
        if (idx < parts.length && parts[idx] !== 'null') {
            node.right = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.right);
        }
        idx++;
    }
    return root;
}
function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 3) return;
    const root = buildTree(lines[0].trim());
    const p = parseInt(lines[1].trim(), 10);
    const q = parseInt(lines[2].trim(), 10);
    let curr = root;
    while (curr) {
        if (p < curr.val && q < curr.val) curr = curr.left;
        else if (p > curr.val && q > curr.val) curr = curr.right;
        else {
            console.log(curr.val);
            return;
        }
    }
}
solve();
`,
    },
    editorial: {
      approach: 'BST Split Point Descent',
      algorithm: 'Traverse down root: if both targets lie strictly leftwards or rightwards, descend accordingly. First node where values diverge is the LCA.',
      timeComplexity: 'O(h) where h is tree height',
      spaceComplexity: 'O(1) iterative',
      content: 'Binary Search Tree property eliminates backtracking.',
      referenceCode: `def lowest_common_ancestor(root, p, q):
    cur = root
    while cur:
        if p.val < cur.val and q.val < cur.val: cur = cur.left
        elif p.val > cur.val and q.val > cur.val: cur = cur.right
        else: return cur`,
    },
    tags: ['Tree', 'Design', 'Binary Search Tree', 'Binary Tree'],
    testCases: [
      { input: '6,2,8,0,4,7,9,null,null,3,5\n2\n8', expectedOutput: '6', isHidden: false },
      { input: '6,2,8,0,4,7,9,null,null,3,5\n2\n4', expectedOutput: '2', isHidden: false },
      { input: '2,1\n2\n1', expectedOutput: '2', isHidden: false },
      { input: '5,3,6,2,4,null,null,1\n1\n4', expectedOutput: '3', isHidden: true },
      { input: '10,5,15\n5\n15', expectedOutput: '10', isHidden: true },
    ],
  },

  // 4. Validate Binary Search Tree
  {
    title: 'Validate Binary Search Tree',
    slug: 'validate-binary-search-tree',
    description: `Given the \`root\` of a binary tree, determine if it is a valid binary search tree (BST).

A **valid BST** is defined as follows:
- The left subtree of a node contains only nodes with keys **strictly less than** the node's key.
- The right subtree of a node contains only nodes with keys **strictly greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `The number of nodes in the tree is in the range [1, 10^4].\n-2^31 <= Node.val <= 2^31 - 1`,
    inputFormat: `Line 1: Level-order comma-separated string for the binary tree.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `2,1,3`,
    sampleOutput: `true`,
    points: 150,
    hints: [
      'Pass valid value ranges (min_val, max_val) down recursive DFS calls.',
      'Or perform an inorder traversal and verify that values are strictly ascending.',
    ],
    codeTemplates: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build_tree(s):
    if not s: return None
    parts = [x.strip() for x in s.split(',') if x.strip()]
    if not parts or parts[0] == 'null': return None
    root = TreeNode(int(parts[0]))
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(int(parts[idx]))
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(int(parts[idx]))
            q.append(node.right)
        idx += 1
    return root

def is_valid_bst(node, low=float('-inf'), high=float('inf')):
    if not node: return True
    if not (low < node.val < high): return False
    return is_valid_bst(node.left, low, node.val) and is_valid_bst(node.right, node.val, high)

def solve():
    line = sys.stdin.read().strip()
    root = build_tree(line)
    print("true" if is_valid_bst(root) else "false")

solve()
`,
      javascript: `const fs = require('fs');

function TreeNode(val) { this.val = val; this.left = this.right = null; }
function buildTree(s) {
    if (!s) return null;
    const parts = s.split(',').map(x => x.trim()).filter(Boolean);
    if (parts.length === 0 || parts[0] === 'null') return null;
    const root = new TreeNode(parseInt(parts[0], 10));
    const q = [root];
    let idx = 1;
    while (q.length > 0 && idx < parts.length) {
        const node = q.shift();
        if (idx < parts.length && parts[idx] !== 'null') {
            node.left = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.left);
        }
        idx++;
        if (idx < parts.length && parts[idx] !== 'null') {
            node.right = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.right);
        }
        idx++;
    }
    return root;
}
function isValidBST(node, low = -Infinity, high = Infinity) {
    if (!node) return true;
    if (node.val <= low || node.val >= high) return false;
    return isValidBST(node.left, low, node.val) && isValidBST(node.right, node.val, high);
}
function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    const root = buildTree(line);
    console.log(isValidBST(root) ? "true" : "false");
}
solve();
`,
    },
    referenceSolutions: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build_tree(s):
    if not s: return None
    parts = [x.strip() for x in s.split(',') if x.strip()]
    if not parts or parts[0] == 'null': return None
    root = TreeNode(int(parts[0]))
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(int(parts[idx]))
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(int(parts[idx]))
            q.append(node.right)
        idx += 1
    return root

def is_valid_bst(node, low=float('-inf'), high=float('inf')):
    if not node: return True
    if not (low < node.val < high): return False
    return is_valid_bst(node.left, low, node.val) and is_valid_bst(node.right, node.val, high)

def solve():
    line = sys.stdin.read().strip()
    root = build_tree(line)
    print("true" if is_valid_bst(root) else "false")

solve()
`,
      javascript: `const fs = require('fs');

function TreeNode(val) { this.val = val; this.left = this.right = null; }
function buildTree(s) {
    if (!s) return null;
    const parts = s.split(',').map(x => x.trim()).filter(Boolean);
    if (parts.length === 0 || parts[0] === 'null') return null;
    const root = new TreeNode(parseInt(parts[0], 10));
    const q = [root];
    let idx = 1;
    while (q.length > 0 && idx < parts.length) {
        const node = q.shift();
        if (idx < parts.length && parts[idx] !== 'null') {
            node.left = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.left);
        }
        idx++;
        if (idx < parts.length && parts[idx] !== 'null') {
            node.right = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.right);
        }
        idx++;
    }
    return root;
}
function isValidBST(node, low = -Infinity, high = Infinity) {
    if (!node) return true;
    if (node.val <= low || node.val >= high) return false;
    return isValidBST(node.left, low, node.val) && isValidBST(node.right, node.val, high);
}
function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    const root = buildTree(line);
    console.log(isValidBST(root) ? "true" : "false");
}
solve();
`,
    },
    editorial: {
      approach: 'Recursive Bounded Interval Invariant Verification',
      algorithm: 'Enforce that each node value strictly falls within range (low, high). Update upper bound on left branch and lower bound on right branch.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      content: 'Verifies entire subtree validity without false positives from local child checks.',
      referenceCode: `def is_valid_bst(root):
    def dfs(n, l, r):
        if not n: return True
        if not (l < n.val < r): return False
        return dfs(n.left, l, n.val) and dfs(n.right, n.val, r)
    return dfs(root, float('-inf'), float('inf'))`,
    },
    tags: ['Tree', 'Depth-First Search', 'Binary Search Tree', 'Binary Tree'],
    testCases: [
      { input: '2,1,3', expectedOutput: 'true', isHidden: false },
      { input: '5,1,4,null,null,3,6', expectedOutput: 'false', isHidden: false },
      { input: '1', expectedOutput: 'true', isHidden: false },
      { input: '2,2,2', expectedOutput: 'false', isHidden: true },
      { input: '10,5,15,null,null,6,20', expectedOutput: 'false', isHidden: true },
    ],
  },

  // 5. Kth Smallest Element in a BST
  {
    title: 'Kth Smallest Element in a BST',
    slug: 'kth-smallest-element-in-a-bst',
    description: `Given the \`root\` of a binary search tree, and an integer \`k\`, return the \`k\`-th smallest value (**1-indexed**) of all the values of the nodes in the tree.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `The number of nodes in the tree is n.\n1 <= k <= n <= 10^4\n0 <= Node.val <= 10^4`,
    inputFormat: `Line 1: Level-order comma-separated string for BST.\nLine 2: An integer \`k\`.`,
    outputFormat: `An integer representing the kth smallest value.`,
    sampleInput: `3,1,4,null,2\n1`,
    sampleOutput: `1`,
    points: 150,
    hints: [
      'Inorder traversal of a BST yields values in strictly ascending order.',
      'Stop when you visit the kth element.',
    ],
    codeTemplates: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build_tree(s):
    if not s: return None
    parts = [x.strip() for x in s.split(',') if x.strip()]
    if not parts or parts[0] == 'null': return None
    root = TreeNode(int(parts[0]))
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(int(parts[idx]))
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(int(parts[idx]))
            q.append(node.right)
        idx += 1
    return root

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    root = build_tree(lines[0].strip())
    k = int(lines[1].strip())
    res = []
    def inorder(n):
        if not n or len(res) >= k: return
        inorder(n.left)
        if len(res) < k: res.append(n.val)
        inorder(n.right)
    inorder(root)
    print(res[-1])

solve()
`,
      javascript: `const fs = require('fs');

function TreeNode(val) { this.val = val; this.left = this.right = null; }
function buildTree(s) {
    if (!s) return null;
    const parts = s.split(',').map(x => x.trim()).filter(Boolean);
    if (parts.length === 0 || parts[0] === 'null') return null;
    const root = new TreeNode(parseInt(parts[0], 10));
    const q = [root];
    let idx = 1;
    while (q.length > 0 && idx < parts.length) {
        const node = q.shift();
        if (idx < parts.length && parts[idx] !== 'null') {
            node.left = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.left);
        }
        idx++;
        if (idx < parts.length && parts[idx] !== 'null') {
            node.right = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.right);
        }
        idx++;
    }
    return root;
}
function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const root = buildTree(lines[0].trim());
    const k = parseInt(lines[1].trim(), 10);
    const res = [];
    function inorder(n) {
        if (!n || res.length >= k) return;
        inorder(n.left);
        if (res.length < k) res.push(n.val);
        inorder(n.right);
    }
    inorder(root);
    console.log(res[res.length - 1]);
}
solve();
`,
    },
    referenceSolutions: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build_tree(s):
    if not s: return None
    parts = [x.strip() for x in s.split(',') if x.strip()]
    if not parts or parts[0] == 'null': return None
    root = TreeNode(int(parts[0]))
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(int(parts[idx]))
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(int(parts[idx]))
            q.append(node.right)
        idx += 1
    return root

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    root = build_tree(lines[0].strip())
    k = int(lines[1].strip())
    res = []
    def inorder(n):
        if not n or len(res) >= k: return
        inorder(n.left)
        if len(res) < k: res.append(n.val)
        inorder(n.right)
    inorder(root)
    print(res[-1])

solve()
`,
      javascript: `const fs = require('fs');

function TreeNode(val) { this.val = val; this.left = this.right = null; }
function buildTree(s) {
    if (!s) return null;
    const parts = s.split(',').map(x => x.trim()).filter(Boolean);
    if (parts.length === 0 || parts[0] === 'null') return null;
    const root = new TreeNode(parseInt(parts[0], 10));
    const q = [root];
    let idx = 1;
    while (q.length > 0 && idx < parts.length) {
        const node = q.shift();
        if (idx < parts.length && parts[idx] !== 'null') {
            node.left = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.left);
        }
        idx++;
        if (idx < parts.length && parts[idx] !== 'null') {
            node.right = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.right);
        }
        idx++;
    }
    return root;
}
function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const root = buildTree(lines[0].trim());
    const k = parseInt(lines[1].trim(), 10);
    const res = [];
    function inorder(n) {
        if (!n || res.length >= k) return;
        inorder(n.left);
        if (res.length < k) res.push(n.val);
        inorder(n.right);
    }
    inorder(root);
    console.log(res[res.length - 1]);
}
solve();
`,
    },
    editorial: {
      approach: 'Inorder DFS Early-Stopping',
      algorithm: 'Left-Root-Right traversal visits BST nodes in sorted ascending order. Halt traversal at k-th step.',
      timeComplexity: 'O(h + k)',
      spaceComplexity: 'O(h)',
      content: 'Early stopping avoids full tree traversal.',
      referenceCode: `def kth_smallest(root, k):
    res = []
    def dfs(n):
        if not n or len(res) >= k: return
        dfs(n.left)
        if len(res) < k: res.append(n.val)
        dfs(n.right)
    dfs(root)
    return res[-1]`,
    },
    tags: ['Tree', 'Depth-First Search', 'Binary Search Tree', 'Binary Tree'],
    testCases: [
      { input: '3,1,4,null,2\n1', expectedOutput: '1', isHidden: false },
      { input: '5,3,6,2,4,null,null,1\n3', expectedOutput: '3', isHidden: false },
      { input: '10,5,15\n2', expectedOutput: '10', isHidden: false },
      { input: '1\n1', expectedOutput: '1', isHidden: true },
      { input: '4,2,6,1,3,5,7\n5', expectedOutput: '5', isHidden: true },
    ],
  },

  // 6. Binary Tree Level Order Traversal
  {
    title: 'Binary Tree Level Order Traversal',
    slug: 'binary-tree-level-order-traversal',
    description: `Given the \`root\` of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).

Output each level on a separate line as comma-separated integers.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `The number of nodes in the tree is in the range [0, 2000].\n-1000 <= Node.val <= 1000`,
    inputFormat: `Line 1: Level-order comma-separated string representation of binary tree.`,
    outputFormat: `Comma-separated node values for each level on separate lines.`,
    sampleInput: `3,9,20,null,null,15,7`,
    sampleOutput: `3\n9,20\n15,7`,
    points: 150,
    hints: [
      'Use a FIFO queue for Breadth-First Search (BFS).',
      'For each level, snapshot queue length and dequeue that exact number of nodes.',
    ],
    codeTemplates: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build_tree(s):
    if not s: return None
    parts = [x.strip() for x in s.split(',') if x.strip()]
    if not parts or parts[0] == 'null': return None
    root = TreeNode(int(parts[0]))
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(int(parts[idx]))
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(int(parts[idx]))
            q.append(node.right)
        idx += 1
    return root

def solve():
    line = sys.stdin.read().strip()
    root = build_tree(line)
    if not root: return
    q = [root]
    while q:
        level_len = len(q)
        level_vals = []
        for _ in range(level_len):
            node = q.pop(0)
            level_vals.append(str(node.val))
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        print(','.join(level_vals))

solve()
`,
      javascript: `const fs = require('fs');

function TreeNode(val) { this.val = val; this.left = this.right = null; }
function buildTree(s) {
    if (!s) return null;
    const parts = s.split(',').map(x => x.trim()).filter(Boolean);
    if (parts.length === 0 || parts[0] === 'null') return null;
    const root = new TreeNode(parseInt(parts[0], 10));
    const q = [root];
    let idx = 1;
    while (q.length > 0 && idx < parts.length) {
        const node = q.shift();
        if (idx < parts.length && parts[idx] !== 'null') {
            node.left = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.left);
        }
        idx++;
        if (idx < parts.length && parts[idx] !== 'null') {
            node.right = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.right);
        }
        idx++;
    }
    return root;
}
function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    const root = buildTree(line);
    if (!root) return;
    const q = [root];
    while (q.length > 0) {
        const len = q.length;
        const level = [];
        for (let i = 0; i < len; i++) {
            const node = q.shift();
            level.push(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
        console.log(level.join(','));
    }
}
solve();
`,
    },
    referenceSolutions: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build_tree(s):
    if not s: return None
    parts = [x.strip() for x in s.split(',') if x.strip()]
    if not parts or parts[0] == 'null': return None
    root = TreeNode(int(parts[0]))
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(int(parts[idx]))
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(int(parts[idx]))
            q.append(node.right)
        idx += 1
    return root

def solve():
    line = sys.stdin.read().strip()
    root = build_tree(line)
    if not root: return
    q = [root]
    while q:
        level_len = len(q)
        level_vals = []
        for _ in range(level_len):
            node = q.pop(0)
            level_vals.append(str(node.val))
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        print(','.join(level_vals))

solve()
`,
      javascript: `const fs = require('fs');

function TreeNode(val) { this.val = val; this.left = this.right = null; }
function buildTree(s) {
    if (!s) return null;
    const parts = s.split(',').map(x => x.trim()).filter(Boolean);
    if (parts.length === 0 || parts[0] === 'null') return null;
    const root = new TreeNode(parseInt(parts[0], 10));
    const q = [root];
    let idx = 1;
    while (q.length > 0 && idx < parts.length) {
        const node = q.shift();
        if (idx < parts.length && parts[idx] !== 'null') {
            node.left = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.left);
        }
        idx++;
        if (idx < parts.length && parts[idx] !== 'null') {
            node.right = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.right);
        }
        idx++;
    }
    return root;
}
function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    const root = buildTree(line);
    if (!root) return;
    const q = [root];
    while (q.length > 0) {
        const len = q.length;
        const level = [];
        for (let i = 0; i < len; i++) {
            const node = q.shift();
            level.push(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
        console.log(level.join(','));
    }
}
solve();
`,
    },
    editorial: {
      approach: 'Queue-Based Breadth-First Level-Order Chunking',
      algorithm: 'Enqueue root node. Measure queue cardinality at each level boundary and process exactly that many nodes before next line output.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n) maximum level width',
      content: 'Standard BFS level segregation.',
      referenceCode: `def level_order(root):
    if not root: return []
    q, res = [root], []
    while q:
        res.append([n.val for n in q])
        q = [c for n in q for c in (n.left, n.right) if c]
    return res`,
    },
    tags: ['Tree', 'Breadth-First Search', 'Binary Tree'],
    testCases: [
      { input: '3,9,20,null,null,15,7', expectedOutput: '3\n9,20\n15,7', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: false },
      { input: '', expectedOutput: '', isHidden: false },
      { input: '1,2,3,4,5', expectedOutput: '1\n2,3\n4,5', isHidden: true },
      { input: '1,2,null,3', expectedOutput: '1\n2\n3', isHidden: true },
    ],
  },

  // 7. Course Schedule
  {
    title: 'Course Schedule',
    slug: 'course-schedule',
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you **must** take course \`b_i\` first if you want to take course \`a_i\`.

Return \`true\` if you can finish all courses, or \`false\` if there is a cycle in the prerequisites.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= numCourses <= 2000\n0 <= prerequisites.length <= 5000\nprerequisites[i].length == 2\n0 <= a_i, b_i < numCourses\nAll pairs [a_i, b_i] are distinct.`,
    inputFormat: `Line 1: An integer \`numCourses\`.\nLines 2..: Comma-separated pairs \`a,b\` representing prerequisite directed edges.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `2\n1,0`,
    sampleOutput: `true`,
    points: 150,
    hints: [
      'Model as a directed graph where edges go from prerequisite to course.',
      'Check if the directed graph contains a cycle using Kahn topological sort (in-degrees) or DFS recursion coloring.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if not lines or not lines[0].strip(): return
    num_courses = int(lines[0].strip())
    adj = {i: [] for i in range(num_courses)}
    in_degree = [0] * num_courses
    for l in lines[1:]:
        if not l.strip(): continue
        parts = [int(x.strip()) for x in l.split(',') if x.strip()]
        if len(parts) >= 2:
            a, b = parts[0], parts[1]
            adj[b].append(a)
            in_degree[a] += 1
    q = [i for i in range(num_courses) if in_degree[i] == 0]
    visited = 0
    while q:
        u = q.pop(0)
        visited += 1
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                q.append(v)
    print("true" if visited == num_courses else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length === 0 || !lines[0].trim()) return;
    const numCourses = parseInt(lines[0].trim(), 10);
    const adj = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);
    for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].trim().split(',').map(x => parseInt(x.trim(), 10));
        if (parts.length >= 2) {
            const [a, b] = parts;
            adj[b].push(a);
            inDegree[a]++;
        }
    }
    const q = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) q.push(i);
    }
    let visited = 0;
    while (q.length > 0) {
        const u = q.shift();
        visited++;
        for (const v of adj[u]) {
            inDegree[v]--;
            if (inDegree[v] === 0) q.push(v);
        }
    }
    console.log(visited === numCourses ? "true" : "false");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if not lines or not lines[0].strip(): return
    num_courses = int(lines[0].strip())
    adj = {i: [] for i in range(num_courses)}
    in_degree = [0] * num_courses
    for l in lines[1:]:
        if not l.strip(): continue
        parts = [int(x.strip()) for x in l.split(',') if x.strip()]
        if len(parts) >= 2:
            a, b = parts[0], parts[1]
            adj[b].append(a)
            in_degree[a] += 1
    q = [i for i in range(num_courses) if in_degree[i] == 0]
    visited = 0
    while q:
        u = q.pop(0)
        visited += 1
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                q.append(v)
    print("true" if visited == num_courses else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length === 0 || !lines[0].trim()) return;
    const numCourses = parseInt(lines[0].trim(), 10);
    const adj = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);
    for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].trim().split(',').map(x => parseInt(x.trim(), 10));
        if (parts.length >= 2) {
            const [a, b] = parts;
            adj[b].push(a);
            inDegree[a]++;
        }
    }
    const q = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) q.push(i);
    }
    let visited = 0;
    while (q.length > 0) {
        const u = q.shift();
        visited++;
        for (const v of adj[u]) {
            inDegree[v]--;
            if (inDegree[v] === 0) q.push(v);
        }
    }
    console.log(visited === numCourses ? "true" : "false");
}

solve();
`,
    },
    editorial: {
      approach: "Kahn's In-Degree Topological Sort (Cycle Detection)",
      algorithm: 'Compute in-degrees for all course vertices. Enqueue 0-degree vertices and decrement downstream neighbors. If processed count matches numCourses, graph is a DAG.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      content: 'Standard cycle detection in directed graphs.',
      referenceCode: `def can_finish(numCourses, prerequisites):
    adj = {i: [] for i in range(numCourses)}
    indeg = [0] * numCourses
    for a, b in prerequisites:
        adj[b].append(a); indeg[a] += 1
    q = [i for i in range(numCourses) if indeg[i] == 0]
    visited = 0
    while q:
        u = q.pop(0); visited += 1
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0: q.append(v)
    return visited == numCourses`,
    },
    tags: ['Depth-First Search', 'Breadth-First Search', 'Graph', 'Topological Sort'],
    testCases: [
      { input: '2\n1,0', expectedOutput: 'true', isHidden: false },
      { input: '2\n1,0\n0,1', expectedOutput: 'false', isHidden: false },
      { input: '1', expectedOutput: 'true', isHidden: false },
      { input: '4\n1,0\n2,0\n3,1\n3,2', expectedOutput: 'true', isHidden: true },
      { input: '3\n0,1\n1,2\n2,0', expectedOutput: 'false', isHidden: true },
    ],
  },

  // 8. Rotting Oranges
  {
    title: 'Rotting Oranges',
    slug: 'rotting-oranges',
    description: `You are given an \`m x n\` grid where each cell can have one of three values:
- \`0\` representing an empty cell,
- \`1\` representing a fresh orange, or
- \`2\` representing a rotten orange.

Every minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return \`-1\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `m == grid.length\nn == grid[i].length\n1 <= m, n <= 10\ngrid[i][j] is 0, 1, or 2.`,
    inputFormat: `Lines 1..m: Comma-separated integers for each row of the grid.`,
    outputFormat: `An integer representing elapsed minutes or \`-1\`.`,
    sampleInput: `2,1,1\n1,1,0\n0,1,1`,
    sampleOutput: `4`,
    points: 150,
    hints: [
      'Multi-source BFS from all initially rotten oranges simultaneously.',
      'Count fresh oranges initially and decrement as they become rotten.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    grid = []
    for l in lines:
        if l.strip():
            grid.append([int(x.strip()) for x in l.split(',') if x.strip()])
    if not grid:
        print(0)
        return
    m, n = len(grid), len(grid[0])
    q = []
    fresh = 0
    for r in range(m):
        for c in range(n):
            if grid[r][c] == 2: q.append((r, c))
            elif grid[r][c] == 1: fresh += 1
    if fresh == 0:
        print(0)
        return
    minutes = 0
    while q and fresh > 0:
        minutes += 1
        for _ in range(len(q)):
            r, c = q.pop(0)
            for dr, dc in ((1,0), (-1,0), (0,1), (0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc))
    print(minutes if fresh == 0 else -1)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    const grid = [];
    for (const l of lines) {
        if (l.trim()) grid.push(l.split(',').map(x => parseInt(x.trim(), 10)));
    }
    if (grid.length === 0) { console.log(0); return; }
    const m = grid.length, n = grid[0].length;
    const q = [];
    let fresh = 0;
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 2) q.push([r, c]);
            else if (grid[r][c] === 1) fresh++;
        }
    }
    if (fresh === 0) { console.log(0); return; }
    let minutes = 0;
    while (q.length > 0 && fresh > 0) {
        minutes++;
        const len = q.length;
        for (let i = 0; i < len; i++) {
            const [r, c] = q.shift();
            for (const [dr, dc] of [[1,0], [-1,0], [0,1], [0,-1]]) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    q.push([nr, nc]);
                }
            }
        }
    }
    console.log(fresh === 0 ? minutes : -1);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    grid = []
    for l in lines:
        if l.strip():
            grid.append([int(x.strip()) for x in l.split(',') if x.strip()])
    if not grid:
        print(0)
        return
    m, n = len(grid), len(grid[0])
    q = []
    fresh = 0
    for r in range(m):
        for c in range(n):
            if grid[r][c] == 2: q.append((r, c))
            elif grid[r][c] == 1: fresh += 1
    if fresh == 0:
        print(0)
        return
    minutes = 0
    while q and fresh > 0:
        minutes += 1
        for _ in range(len(q)):
            r, c = q.pop(0)
            for dr, dc in ((1,0), (-1,0), (0,1), (0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc))
    print(minutes if fresh == 0 else -1)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    const grid = [];
    for (const l of lines) {
        if (l.trim()) grid.push(l.split(',').map(x => parseInt(x.trim(), 10)));
    }
    if (grid.length === 0) { console.log(0); return; }
    const m = grid.length, n = grid[0].length;
    const q = [];
    let fresh = 0;
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 2) q.push([r, c]);
            else if (grid[r][c] === 1) fresh++;
        }
    }
    if (fresh === 0) { console.log(0); return; }
    let minutes = 0;
    while (q.length > 0 && fresh > 0) {
        minutes++;
        const len = q.length;
        for (let i = 0; i < len; i++) {
            const [r, c] = q.shift();
            for (const [dr, dc] of [[1,0], [-1,0], [0,1], [0,-1]]) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    q.push([nr, nc]);
                }
            }
        }
    }
    console.log(fresh === 0 ? minutes : -1);
}

solve();
`,
    },
    editorial: {
      approach: 'Multi-Source Breadth-First Grid Search',
      algorithm: 'Seed queue with all rotten cells at t=0. Propagate contamination in radial wave increments until no adjacent fresh oranges remain.',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
      content: 'Multi-source BFS models concurrent contamination wave front.',
      referenceCode: `def oranges_rotting(grid):
    q, fresh = [(r, c) for r in range(len(grid)) for c in range(len(grid[0])) if grid[r][c] == 2], sum(row.count(1) for row in grid)
    t = 0
    while q and fresh:
        t += 1
        q = [(nr, nc) for r, c in q for nr, nc in ((r+1,c),(r-1,c),(r,c+1),(r,c-1)) if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]) and grid[nr][nc] == 1 and not grid.__setitem__(nr, grid[nr][:nc] + [2] + grid[nr][nc+1:])]
        fresh -= len(q)
    return t if fresh == 0 else -1`,
    },
    tags: ['Array', 'Breadth-First Search', 'Matrix'],
    testCases: [
      { input: '2,1,1\n1,1,0\n0,1,1', expectedOutput: '4', isHidden: false },
      { input: '2,1,1\n0,1,1\n1,0,1', expectedOutput: '-1', isHidden: false },
      { input: '0,2', expectedOutput: '0', isHidden: false },
      { input: '1\n2', expectedOutput: '1', isHidden: true },
      { input: '2,2\n1,1', expectedOutput: '1', isHidden: true },
    ],
  },

  // 9. Remove Nth Node From End of List
  {
    title: 'Remove Nth Node From End of List',
    slug: 'remove-nth-node-from-end-of-list',
    description: `Given the \`head\` of a linked list, remove the \`n\`-th node from the end of the list and return its head.

Output the modified linked list as comma-separated integers.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `The number of nodes in the list is sz.\n1 <= sz <= 30\n0 <= Node.val <= 100\n1 <= n <= sz`,
    inputFormat: `Line 1: Comma-separated integers for the linked list.\nLine 2: An integer \`n\`.`,
    outputFormat: `Comma-separated integers of the modified list.`,
    sampleInput: `1,2,3,4,5\n2`,
    sampleOutput: `1,2,3,5`,
    points: 150,
    hints: [
      'Advance a fast pointer by n steps first.',
      'Then move slow and fast together until fast reaches the end.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
    n = int(lines[1].strip())
    remove_idx = len(nums) - n
    res = nums[:remove_idx] + nums[remove_idx + 1:]
    print(','.join(map(str, res)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const nums = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const n = parseInt(lines[1].trim(), 10);
    const removeIdx = nums.length - n;
    nums.splice(removeIdx, 1);
    console.log(nums.join(','));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
    n = int(lines[1].strip())
    remove_idx = len(nums) - n
    res = nums[:remove_idx] + nums[remove_idx + 1:]
    print(','.join(map(str, res)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const nums = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const n = parseInt(lines[1].trim(), 10);
    const removeIdx = nums.length - n;
    nums.splice(removeIdx, 1);
    console.log(nums.join(','));
}

solve();
`,
    },
    editorial: {
      approach: 'Two-Pointer One-Pass Node Splicing',
      algorithm: 'Offset fast pointer by n steps. Advance both pointers synchronously until fast reaches tail, then splice out target node.',
      timeComplexity: 'O(L) list length',
      spaceComplexity: 'O(1)',
      content: 'Two-pointer sliding offset deletes target node in a single traversal pass.',
      referenceCode: `def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    l, r = dummy, head
    while n > 0: r = r.next; n -= 1
    while r: l = l.next; r = r.next
    l.next = l.next.next
    return dummy.next`,
    },
    tags: ['Linked List', 'Two Pointers'],
    testCases: [
      { input: '1,2,3,4,5\n2', expectedOutput: '1,2,3,5', isHidden: false },
      { input: '1\n1', expectedOutput: '', isHidden: false },
      { input: '1,2\n1', expectedOutput: '1', isHidden: false },
      { input: '1,2\n2', expectedOutput: '2', isHidden: true },
      { input: '10,20,30,40\n4', expectedOutput: '20,30,40', isHidden: true },
    ],
  },

  // 10. Palindrome Linked List
  {
    title: 'Palindrome Linked List',
    slug: 'palindrome-linked-list',
    description: `Given the \`head\` of a singly linked list, return \`true\` if it is a palindrome or \`false\` otherwise.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `The number of nodes in the list is in the range [1, 10^5].\n0 <= Node.val <= 9`,
    inputFormat: `Line 1: Comma-separated integers for the linked list.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `1,2,2,1`,
    sampleOutput: `true`,
    points: 100,
    hints: [
      'Find the middle using fast and slow pointers.',
      'Reverse the second half of the list and compare with the first half.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print("true")
        return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    print("true" if nums == nums[::-1] else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log("true"); return; }
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    const rev = [...nums].reverse();
    console.log(nums.join(',') === rev.join(',') ? "true" : "false");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print("true")
        return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    print("true" if nums == nums[::-1] else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log("true"); return; }
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    const rev = [...nums].reverse();
    console.log(nums.join(',') === rev.join(',') ? "true" : "false");
}

solve();
`,
    },
    editorial: {
      approach: 'Slow/Fast Pointer Halving & In-Place Suffix Reversal',
      algorithm: 'Find midpoint via slow/fast pointers. Reverse second half and compare node values sequentially.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1) in-place',
      content: 'In-place linked list reversal achieves constant space verification.',
      referenceCode: `def is_palindrome_list(head):
    s, f = head, head
    while f and f.next: s = s.next; f = f.next.next
    prev = None
    while s: s.next, prev, s = prev, s, s.next
    while prev:
        if prev.val != head.val: return False
        prev, head = prev.next, head.next
    return True`,
    },
    tags: ['Linked List', 'Two Pointers', 'Stack', 'Recursion'],
    testCases: [
      { input: '1,2,2,1', expectedOutput: 'true', isHidden: false },
      { input: '1,2', expectedOutput: 'false', isHidden: false },
      { input: '1', expectedOutput: 'true', isHidden: false },
      { input: '1,2,3,2,1', expectedOutput: 'true', isHidden: true },
      { input: '1,2,3,4,5', expectedOutput: 'false', isHidden: true },
    ],
  },
];


