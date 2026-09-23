import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack100Part3ProblemDefs: ProblemDef[] = [
  // 1. Reverse Integer
  {
    title: 'Reverse Integer',
    slug: 'reverse-integer',
    description: `Given a signed 32-bit integer \`x\`, return \`x\` with its digits reversed. If reversing \`x\` causes the value to go outside the signed 32-bit integer range \`[-2^31, 2^31 - 1]\`, then return \`0\`.

Assume the environment does not allow you to store 64-bit integers.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `-2^31 <= x <= 2^31 - 1`,
    inputFormat: `Line 1: An integer \`x\`.`,
    outputFormat: `The reversed 32-bit integer or \`0\`.`,
    sampleInput: `123`,
    sampleOutput: `321`,
    points: 150,
    hints: [
      'Extract digits from x using modulo 10.',
      'Check for 32-bit overflow before multiplying the accumulated result by 10.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    x = int(line)
    sign = -1 if x < 0 else 1
    x = abs(x)
    rev = int(str(x)[::-1]) * sign
    if rev < -2**31 or rev > 2**31 - 1:
        print(0)
    else:
        print(rev)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const x = parseInt(line, 10);
    const sign = x < 0 ? -1 : 1;
    const rev = parseInt(Math.abs(x).toString().split('').reverse().join(''), 10) * sign;
    if (rev < -Math.pow(2, 31) || rev > Math.pow(2, 31) - 1) {
        console.log(0);
    } else {
        console.log(rev);
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    x = int(line)
    sign = -1 if x < 0 else 1
    x = abs(x)
    rev = int(str(x)[::-1]) * sign
    if rev < -2**31 or rev > 2**31 - 1:
        print(0)
    else:
        print(rev)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const x = parseInt(line, 10);
    const sign = x < 0 ? -1 : 1;
    const rev = parseInt(Math.abs(x).toString().split('').reverse().join(''), 10) * sign;
    if (rev < -Math.pow(2, 31) || rev > Math.pow(2, 31) - 1) {
        console.log(0);
    } else {
        console.log(rev);
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Digit-by-Digit Modulo Extraction with 32-Bit Overflow Clamp',
      algorithm: 'Extract least significant digits with modulo 10 and verify overflow bounds against INT_MAX and INT_MIN before multiplication.',
      timeComplexity: 'O(log10(x))',
      spaceComplexity: 'O(1)',
      content: 'Numeric digit extraction without 64-bit data structures.',
      referenceCode: `def reverse(x):
    s = -1 if x < 0 else 1
    r = int(str(abs(x))[::-1]) * s
    return r if -2**31 <= r <= 2**31 - 1 else 0`,
    },
    tags: ['Math'],
    testCases: [
      { input: '123', expectedOutput: '321', isHidden: false },
      { input: '-123', expectedOutput: '-321', isHidden: false },
      { input: '120', expectedOutput: '21', isHidden: false },
      { input: '1534236469', expectedOutput: '0', isHidden: true },
      { input: '0', expectedOutput: '0', isHidden: true },
    ],
  },

  // 2. Decode Ways
  {
    title: 'Decode Ways',
    slug: 'decode-ways',
    description: `A message containing letters from \`A-Z\` can be encoded into numbers using the following mapping:
'A' -> "1", 'B' -> "2", ..., 'Z' -> "26".

To decode an encoded message, all the digits must be grouped then mapped back into letters. Given a string \`s\` containing only digits, return the number of ways to decode it.

If the entire string cannot be decoded in any valid way, return \`0\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= s.length <= 100\ns contains only digits and may contain leading zero(s).`,
    inputFormat: `Line 1: A string of digits \`s\`.`,
    outputFormat: `An integer representing the number of decodings.`,
    sampleInput: `12`,
    sampleOutput: `2`,
    points: 150,
    hints: [
      'Single digit s[i] can decode if it is between "1" and "9".',
      'Two digits s[i-1:i+1] can decode if they form an integer between 10 and 26.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    s = sys.stdin.read().strip()
    if not s or s[0] == '0':
        print(0)
        return
    n = len(s)
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1
    for i in range(2, n + 1):
        one = int(s[i - 1:i])
        two = int(s[i - 2:i])
        if 1 <= one <= 9: dp[i] += dp[i - 1]
        if 10 <= two <= 26: dp[i] += dp[i - 2]
    print(dp[n])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s || s[0] === '0') { console.log(0); return; }
    const n = s.length;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        const one = parseInt(s.substring(i - 1, i), 10);
        const two = parseInt(s.substring(i - 2, i), 10);
        if (one >= 1 && one <= 9) dp[i] += dp[i - 1];
        if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
    }
    console.log(dp[n]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    s = sys.stdin.read().strip()
    if not s or s[0] == '0':
        print(0)
        return
    n = len(s)
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1
    for i in range(2, n + 1):
        one = int(s[i - 1:i])
        two = int(s[i - 2:i])
        if 1 <= one <= 9: dp[i] += dp[i - 1]
        if 10 <= two <= 26: dp[i] += dp[i - 2]
    print(dp[n])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s || s[0] === '0') { console.log(0); return; }
    const n = s.length;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        const one = parseInt(s.substring(i - 1, i), 10);
        const two = parseInt(s.substring(i - 2, i), 10);
        if (one >= 1 && one <= 9) dp[i] += dp[i - 1];
        if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
    }
    console.log(dp[n]);
}

solve();
`,
    },
    editorial: {
      approach: '1D Dynamic Programming Substring Prefix Decomposition',
      algorithm: 'dp[i] represents valid decodings for prefix s[0..i]. Branch on valid 1-digit mapping (1..9) and 2-digit mapping (10..26).',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n) or O(1)',
      content: 'Linear dynamic programming with Fibonacci-like state transitions.',
      referenceCode: `def num_decodings(s):
    if not s or s[0] == '0': return 0
    dp = [1, 1] + [0] * (len(s) - 1)
    for i in range(2, len(s) + 1):
        if 1 <= int(s[i-1:i]) <= 9: dp[i] += dp[i-1]
        if 10 <= int(s[i-2:i]) <= 26: dp[i] += dp[i-2]
    return dp[len(s)]`,
    },
    tags: ['String', 'Dynamic Programming'],
    testCases: [
      { input: '12', expectedOutput: '2', isHidden: false },
      { input: '226', expectedOutput: '3', isHidden: false },
      { input: '06', expectedOutput: '0', isHidden: false },
      { input: '10', expectedOutput: '1', isHidden: true },
      { input: '27', expectedOutput: '1', isHidden: true },
    ],
  },

  // 3. Palindromic Substrings
  {
    title: 'Palindromic Substrings',
    slug: 'palindromic-substrings',
    description: `Given a string \`s\`, return the number of **palindromic substrings** in it.

A string is a **palindrome** when it reads the same backward as forward. A **substring** is a contiguous sequence of characters within the string.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= s.length <= 1000\ns consists of lowercase English letters.`,
    inputFormat: `Line 1: String \`s\`.`,
    outputFormat: `An integer representing the number of palindromic substrings.`,
    sampleInput: `abc`,
    sampleOutput: `3`,
    points: 150,
    hints: [
      'Expand around all 2n - 1 potential centers (odd length and even length).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    s = sys.stdin.read().strip()
    if not s: return
    count = 0
    n = len(s)
    def expand(l, r):
        c = 0
        while l >= 0 and r < n and s[l] == s[r]:
            c += 1
            l -= 1
            r += 1
        return c
    for i in range(n):
        count += expand(i, i)
        count += expand(i, i + 1)
    print(count)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s) return;
    const n = s.length;
    let count = 0;
    function expand(l, r) {
        let c = 0;
        while (l >= 0 && r < n && s[l] === s[r]) {
            c++;
            l--;
            r++;
        }
        return c;
    }
    for (let i = 0; i < n; i++) {
        count += expand(i, i);
        count += expand(i, i + 1);
    }
    console.log(count);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    s = sys.stdin.read().strip()
    if not s: return
    count = 0
    n = len(s)
    def expand(l, r):
        c = 0
        while l >= 0 and r < n and s[l] == s[r]:
            c += 1
            l -= 1
            r += 1
        return c
    for i in range(n):
        count += expand(i, i)
        count += expand(i, i + 1)
    print(count)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s) return;
    const n = s.length;
    let count = 0;
    function expand(l, r) {
        let c = 0;
        while (l >= 0 && r < n && s[l] === s[r]) {
            c++;
            l--;
            r++;
        }
        return c;
    }
    for (let i = 0; i < n; i++) {
        count += expand(i, i);
        count += expand(i, i + 1);
    }
    console.log(count);
}

solve();
`,
    },
    editorial: {
      approach: 'Center Expansion Algorithm',
      algorithm: 'Expand outwards from all 2n-1 odd and even character centers to count valid symmetrical palindromes in O(n^2) time.',
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(1)',
      content: 'Center expansion avoids allocating 2D table memory.',
      referenceCode: `def count_substrings(s):
    n = len(s)
    def expand(l, r):
        c = 0
        while l >= 0 and r < n and s[l] == s[r]:
            c += 1; l -= 1; r += 1
        return c
    return sum(expand(i, i) + expand(i, i + 1) for i in range(n))`,
    },
    tags: ['Two Pointers', 'String', 'Dynamic Programming'],
    testCases: [
      { input: 'abc', expectedOutput: '3', isHidden: false },
      { input: 'aaa', expectedOutput: '6', isHidden: false },
      { input: 'a', expectedOutput: '1', isHidden: false },
      { input: 'abccba', expectedOutput: '9', isHidden: true },
      { input: 'racecar', expectedOutput: '10', isHidden: true },
    ],
  },

  // 4. Subtree of Another Tree
  {
    title: 'Subtree of Another Tree',
    slug: 'subtree-of-another-tree',
    description: `Given the roots of two binary trees \`root\` and \`subRoot\`, return \`true\` if there is a subtree of \`root\` with the same structure and node values of \`subRoot\` and \`false\` otherwise.

A **subtree** of a binary tree \`tree\` is a tree that consists of a node in \`tree\` and all of this node's descendants. The tree \`tree\` could also be considered as a subtree of itself.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `The number of nodes in the root tree is in the range [1, 2000].\nThe number of nodes in the subRoot tree is in the range [1, 1000].\n-10^4 <= root.val, subRoot.val <= 10^4`,
    inputFormat: `Line 1: Level-order comma-separated string for \`root\`.\nLine 2: Level-order comma-separated string for \`subRoot\`.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `3,4,5,1,2\n4,1,2`,
    sampleOutput: `true`,
    points: 100,
    hints: [
      'Write a helper function isSameTree(p, q).',
      'For each node in root, check if isSameTree(node, subRoot) is true.',
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

def is_subtree(root, subRoot):
    if not root: return False
    if is_same(root, subRoot): return True
    return is_subtree(root.left, subRoot) or is_subtree(root.right, subRoot)

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    root = build_tree(lines[0].strip())
    sub = build_tree(lines[1].strip())
    print("true" if is_subtree(root, sub) else "false")

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
    return p.val === q.val && isSame(p.left, q.left) and isSame(p.right, q.right);
}
function isSubtree(root, subRoot) {
    if (!root) return false;
    if (isSame(root, subRoot)) return true;
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const root = buildTree(lines[0].trim());
    const sub = buildTree(lines[1].trim());
    console.log(isSubtree(root, sub) ? "true" : "false");
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

def is_subtree(root, subRoot):
    if not root: return False
    if is_same(root, subRoot): return True
    return is_subtree(root.left, subRoot) or is_subtree(root.right, subRoot)

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    root = build_tree(lines[0].strip())
    sub = build_tree(lines[1].strip())
    print("true" if is_subtree(root, sub) else "false")

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
function isSubtree(root, subRoot) {
    if (!root) return false;
    if (isSame(root, subRoot)) return true;
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const root = buildTree(lines[0].trim());
    const sub = buildTree(lines[1].trim());
    console.log(isSubtree(root, sub) ? "true" : "false");
}
solve();
`,
    },
    editorial: {
      approach: 'Depth-First Recursive Subtree Matching',
      algorithm: 'For each candidate node in root tree, check if subtree anchored at that node matches target subRoot identically.',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(h)',
      content: 'Standard subtree structural matching.',
      referenceCode: `def is_subtree(root, subRoot):
    if not root: return False
    def same(p, q):
        if not p and not q: return True
        if not p or not q: return False
        return p.val == q.val and same(p.left, q.left) and same(p.right, q.right)
    return same(root, subRoot) or is_subtree(root.left, subRoot) or is_subtree(root.right, subRoot)`,
    },
    tags: ['Tree', 'Depth-First Search', 'String Matching', 'Binary Tree', 'Hash Function'],
    testCases: [
      { input: '3,4,5,1,2\n4,1,2', expectedOutput: 'true', isHidden: false },
      { input: '3,4,5,1,2,null,null,null,null,0\n4,1,2', expectedOutput: 'false', isHidden: false },
      { input: '1,1\n1', expectedOutput: 'true', isHidden: false },
      { input: '1\n1', expectedOutput: 'true', isHidden: true },
      { input: '1,2,3\n2,null,3', expectedOutput: 'false', isHidden: true },
    ],
  },

  // 5. K Closest Points to Origin
  {
    title: 'K Closest Points to Origin',
    slug: 'k-closest-points-to-origin',
    description: `Given an array of \`points\` where \`points[i] = [xi, yi]\` represents a point on the X-Y plane and an integer \`k\`, return the \`k\` closest points to the origin \`(0, 0)\`.

The distance between two points on the X-Y plane is the Euclidean distance (\`√(x1 - x2)^2 + (y1 - y2)^2\`).

You may return the answer in **any order**. Output points sorted by x-coordinate, then y-coordinate.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= k <= points.length <= 10^4\n-10^4 <= xi, yi <= 10^4`,
    inputFormat: `Line 1: An integer \`k\`.\nLine 2: An integer \`n\` (number of points).\nNext \`n\` lines: Two integers \`x y\` representing a point.`,
    outputFormat: `\`k\` lines each with two space-separated integers representing the closest points sorted by \`x\`, then \`y\`.`,
    sampleInput: `1\n2\n1 3\n-2 2`,
    sampleOutput: `-2 2`,
    points: 150,
    hints: [
      'The Euclidean distance comparison is equivalent to x^2 + y^2.',
      'Use a max-heap of size k or sort by squared distance.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data: return
    k = int(input_data[0])
    n = int(input_data[1])
    pts = []
    idx = 2
    for _ in range(n):
        pts.append((int(input_data[idx]), int(input_data[idx+1])))
        idx += 2
    
    pts.sort(key=lambda p: p[0]**2 + p[1]**2)
    res = pts[:k]
    res.sort(key=lambda p: (p[0], p[1]))
    for x, y in res:
        print(f"{x} {y}")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (input.length < 2 || input[0] === '') return;
    const k = parseInt(input[0], 10);
    const n = parseInt(input[1], 10);
    const pts = [];
    let idx = 2;
    for (let i = 0; i < n; i++) {
        pts.push([parseInt(input[idx], 10), parseInt(input[idx+1], 10)]);
        idx += 2;
    }
    pts.sort((a, b) => (a[0]*a[0] + a[1]*a[1]) - (b[0]*b[0] + b[1]*b[1]));
    const res = pts.slice(0, k);
    res.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
    for (const [x, y] of res) {
        console.log(\`\${x} \${y}\`);
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data: return
    k = int(input_data[0])
    n = int(input_data[1])
    pts = []
    idx = 2
    for _ in range(n):
        pts.append((int(input_data[idx]), int(input_data[idx+1])))
        idx += 2
    
    pts.sort(key=lambda p: p[0]**2 + p[1]**2)
    res = pts[:k]
    res.sort(key=lambda p: (p[0], p[1]))
    for x, y in res:
        print(f"{x} {y}")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (input.length < 2 || input[0] === '') return;
    const k = parseInt(input[0], 10);
    const n = parseInt(input[1], 10);
    const pts = [];
    let idx = 2;
    for (let i = 0; i < n; i++) {
        pts.push([parseInt(input[idx], 10), parseInt(input[idx+1], 10)]);
        idx += 2;
    }
    pts.sort((a, b) => (a[0]*a[0] + a[1]*a[1]) - (b[0]*b[0] + b[1]*b[1]));
    const res = pts.slice(0, k);
    res.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
    for (const [x, y] of res) {
        console.log(\`\${x} \${y}\`);
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Heap / Quickselect / Squared Distance Sorting',
      algorithm: 'Sort points by Euclidean distance squared x^2 + y^2 and select the smallest k points in O(n log k) time.',
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(k)',
      content: 'Standard priority queue selection problem.',
      referenceCode: `import heapq
def k_closest(points, k):
    return heapq.nsmallest(k, points, key=lambda p: p[0]**2 + p[1]**2)`,
    },
    tags: ['Array', 'Math', 'Divide and Conquer', 'Geometry', 'Sorting', 'Heap (Priority Queue)', 'Quickselect'],
    testCases: [
      { input: '1\n2\n1 3\n-2 2', expectedOutput: '-2 2', isHidden: false },
      { input: '2\n3\n3 3\n5 -1\n-2 4', expectedOutput: '-2 4\n3 3', isHidden: false },
      { input: '1\n1\n0 0', expectedOutput: '0 0', isHidden: true },
      { input: '2\n4\n1 1\n2 2\n-1 -1\n3 3', expectedOutput: '-1 -1\n1 1', isHidden: true },
    ],
  },

  // 6. Task Scheduler
  {
    title: 'Task Scheduler',
    slug: 'task-scheduler',
    description: `Given a characters array \`tasks\` representing the tasks a CPU needs to do, where each letter represents a different task, and a cooling interval \`n\`, determine the **minimum number of units of times** that the CPU will take to finish all the given tasks.

Between two tasks of the same kind, there must be at least \`n\` intervals of cooling time where the CPU is idle or doing other tasks.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= tasks.length <= 10^4\ntasks[i] is uppercase English letter\n0 <= n <= 100`,
    inputFormat: `Line 1: String of tasks (e.g. \`AAABBB\`).\nLine 2: Cooling interval integer \`n\`.`,
    outputFormat: `Minimum time units required.`,
    sampleInput: `AAABBB\n2`,
    sampleOutput: `8`,
    points: 150,
    hints: [
      'Find the task with the maximum frequency max_freq.',
      'The frame size is (max_freq - 1) * (n + 1) + count_of_tasks_with_max_freq.',
      'The result is max(len(tasks), frame_size).',
    ],
    codeTemplates: {
      python: `import sys
from collections import Counter

def solve():
    lines = sys.stdin.read().strip().split()
    if len(lines) < 2: return
    tasks = lines[0]
    n = int(lines[1])
    counts = Counter(tasks)
    max_freq = max(counts.values())
    max_count = sum(1 for v in counts.values() if v == max_freq)
    ans = max(len(tasks), (max_freq - 1) * (n + 1) + max_count)
    print(ans)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (lines.length < 2) return;
    const tasks = lines[0];
    const n = parseInt(lines[1], 10);
    const counts = {};
    for (const c of tasks) counts[c] = (counts[c] || 0) + 1;
    const freqs = Object.values(counts);
    const maxFreq = Math.max(...freqs);
    let maxCount = 0;
    for (const f of freqs) if (f === maxFreq) maxCount++;
    const ans = Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
    console.log(ans);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
from collections import Counter

def solve():
    lines = sys.stdin.read().strip().split()
    if len(lines) < 2: return
    tasks = lines[0]
    n = int(lines[1])
    counts = Counter(tasks)
    max_freq = max(counts.values())
    max_count = sum(1 for v in counts.values() if v == max_freq)
    ans = max(len(tasks), (max_freq - 1) * (n + 1) + max_count)
    print(ans)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (lines.length < 2) return;
    const tasks = lines[0];
    const n = parseInt(lines[1], 10);
    const counts = {};
    for (const c of tasks) counts[c] = (counts[c] || 0) + 1;
    const freqs = Object.values(counts);
    const maxFreq = Math.max(...freqs);
    let maxCount = 0;
    for (const f of freqs) if (f === maxFreq) maxCount++;
    const ans = Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
    console.log(ans);
}

solve();
`,
    },
    editorial: {
      approach: 'Greedy Frame Counting / Frequency Math',
      algorithm: 'Slot most frequent tasks into intervals of length n+1. Total time is bounded below by the tasks length and the slot equation.',
      timeComplexity: 'O(tasks.length)',
      spaceComplexity: 'O(1) (26 uppercase characters)',
      content: 'Greedy scheduling with priority queue / frequency analysis.',
      referenceCode: `def least_interval(tasks, n):
    counts = Counter(tasks)
    mf = max(counts.values())
    mc = sum(1 for v in counts.values() if v == mf)
    return max(len(tasks), (mf - 1) * (n + 1) + mc)`,
    },
    tags: ['Array', 'Hash Table', 'Greedy', 'Queue', 'Counting', 'Sorting', 'Heap (Priority Queue)'],
    testCases: [
      { input: 'AAABBB\n2', expectedOutput: '8', isHidden: false },
      { input: 'AAABBB\n0', expectedOutput: '6', isHidden: false },
      { input: 'AAAAAABCDEFG\n2', expectedOutput: '16', isHidden: false },
      { input: 'A\n2', expectedOutput: '1', isHidden: true },
      { input: 'AAABBBCCCDDDEEE\n2', expectedOutput: '15', isHidden: true },
    ],
  },

  // 7. Reorder List
  {
    title: 'Reorder List',
    slug: 'reorder-list',
    description: `You are given the head of a singly linked-list:
\`L0 → L1 → … → Ln - 1 → Ln\`

Reorder the list to be on the following form:
\`L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …\`

You may not modify the values in the list's nodes. Only nodes themselves may be changed.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `The number of nodes in the list is in the range [1, 5 * 10^4].\n1 <= Node.val <= 1000`,
    inputFormat: `Line 1: Space-separated integers representing the linked list nodes.`,
    outputFormat: `Space-separated integers of the reordered linked list.`,
    sampleInput: `1 2 3 4`,
    sampleOutput: `1 4 2 3`,
    points: 150,
    hints: [
      'Split the list into two halves using slow and fast pointers.',
      'Reverse the second half of the list.',
      'Merge the two halves alternately.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    nums = list(map(int, sys.stdin.read().split()))
    if not nums: return
    n = len(nums)
    res = []
    l, r = 0, n - 1
    while l <= r:
        if l == r:
            res.append(nums[l])
            break
        res.append(nums[l])
        res.append(nums[r])
        l += 1
        r -= 1
    print(' '.join(map(str, res)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const nums = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);
    if (nums.length === 0 || isNaN(nums[0])) return;
    const n = nums.length;
    const res = [];
    let l = 0, r = n - 1;
    while (l <= r) {
        if (l === r) {
            res.push(nums[l]);
            break;
        }
        res.push(nums[l]);
        res.push(nums[r]);
        l++;
        r--;
    }
    console.log(res.join(' '));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    nums = list(map(int, sys.stdin.read().split()))
    if not nums: return
    n = len(nums)
    res = []
    l, r = 0, n - 1
    while l <= r:
        if l == r:
            res.append(nums[l])
            break
        res.append(nums[l])
        res.append(nums[r])
        l += 1
        r -= 1
    print(' '.join(map(str, res)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const nums = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);
    if (nums.length === 0 || isNaN(nums[0])) return;
    const n = nums.length;
    const res = [];
    let l = 0, r = n - 1;
    while (l <= r) {
        if (l === r) {
            res.push(nums[l]);
            break;
        }
        res.push(nums[l]);
        res.push(nums[r]);
        l++;
        r--;
    }
    console.log(res.join(' '));
}

solve();
`,
    },
    editorial: {
      approach: 'Find Middle + Reverse Second Half + Alternating Merge',
      algorithm: 'Locate middle with slow/fast pointers, reverse second half in O(n) time, and interleave nodes.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'Classic linked list three-phase manipulation technique.',
      referenceCode: `def reorder_list(head):
    # Split, reverse 2nd half, interleave
    pass`,
    },
    tags: ['Linked List', 'Two Pointers', 'Stack', 'Recursion'],
    testCases: [
      { input: '1 2 3 4', expectedOutput: '1 4 2 3', isHidden: false },
      { input: '1 2 3 4 5', expectedOutput: '1 5 2 4 3', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: false },
      { input: '1 2', expectedOutput: '1 2', isHidden: true },
      { input: '10 20 30 40 50 60', expectedOutput: '10 60 20 50 30 40', isHidden: true },
    ],
  },

  // 8. Surrounded Regions
  {
    title: 'Surrounded Regions',
    slug: 'surrounded-regions',
    description: `Given an \`m x n\` matrix \`board\` containing \`'X'\` and \`'O'\`, capture all regions that are 4-directionally surrounded by \`'X'\`.

A region is captured by flipping all \`'O'\`s into \`'X'\`s in that surrounded region. Any \`'O'\` on the border or connected to a border \`'O'\` will NOT be flipped.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `m == board.length\nn == board[i].length\n1 <= m, n <= 200\nboard[i][j] is 'X' or 'O'`,
    inputFormat: `Line 1: Two integers \`m n\`.\nNext \`m\` lines: String of length \`n\` representing each row.`,
    outputFormat: `\`m\` lines representing the modified board.`,
    sampleInput: `4 4\nXXXX\nXOOX\nXXOX\nXOXX`,
    sampleOutput: `XXXX\nXXXX\nXXXX\nXOXX`,
    points: 150,
    hints: [
      'Traverse all border cells. If a border cell is "O", flood-fill / DFS all connected "O"s and mark them as safe (e.g. "#").',
      'Iterate through the whole grid: flip remaining "O"s to "X", and unmark safe cells back to "O".',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split()
    if not lines: return
    m, n = int(lines[0]), int(lines[1])
    board = [list(lines[2 + i]) for i in range(m)]

    def dfs(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != 'O':
            return
        board[r][c] = 'S'
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            dfs(r + dr, c + dc)

    for r in range(m):
        if board[r][0] == 'O': dfs(r, 0)
        if board[r][n - 1] == 'O': dfs(r, n - 1)
    for c in range(n):
        if board[0][c] == 'O': dfs(0, c)
        if board[m - 1][c] == 'O': dfs(m - 1, c)

    for r in range(m):
        for c in range(n):
            if board[r][c] == 'O':
                board[r][c] = 'X'
            elif board[r][c] == 'S':
                board[r][c] = 'O'

    for row in board:
        print(''.join(row))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const m = parseInt(tokens[0], 10);
    const n = parseInt(tokens[1], 10);
    const board = [];
    for (let i = 0; i < m; i++) {
        board.push(tokens[2 + i].split(''));
    }

    function dfs(r, c) {
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== 'O') return;
        board[r][c] = 'S';
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    for (let r = 0; r < m; r++) {
        if (board[r][0] === 'O') dfs(r, 0);
        if (board[r][n - 1] === 'O') dfs(r, n - 1);
    }
    for (let c = 0; c < n; c++) {
        if (board[0][c] === 'O') dfs(0, c);
        if (board[m - 1][c] === 'O') dfs(m - 1, c);
    }

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (board[r][c] === 'O') board[r][c] = 'X';
            else if (board[r][c] === 'S') board[r][c] = 'O';
        }
    }

    for (const row of board) {
        console.log(row.join(''));
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split()
    if not lines: return
    m, n = int(lines[0]), int(lines[1])
    board = [list(lines[2 + i]) for i in range(m)]

    def dfs(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != 'O':
            return
        board[r][c] = 'S'
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            dfs(r + dr, c + dc)

    for r in range(m):
        if board[r][0] == 'O': dfs(r, 0)
        if board[r][n - 1] == 'O': dfs(r, n - 1)
    for c in range(n):
        if board[0][c] == 'O': dfs(0, c)
        if board[m - 1][c] == 'O': dfs(m - 1, c)

    for r in range(m):
        for c in range(n):
            if board[r][c] == 'O':
                board[r][c] = 'X'
            elif board[r][c] == 'S':
                board[r][c] = 'O'

    for row in board:
        print(''.join(row))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const m = parseInt(tokens[0], 10);
    const n = parseInt(tokens[1], 10);
    const board = [];
    for (let i = 0; i < m; i++) {
        board.push(tokens[2 + i].split(''));
    }

    function dfs(r, c) {
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== 'O') return;
        board[r][c] = 'S';
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    for (let r = 0; r < m; r++) {
        if (board[r][0] === 'O') dfs(r, 0);
        if (board[r][n - 1] === 'O') dfs(r, n - 1);
    }
    for (let c = 0; c < n; c++) {
        if (board[0][c] === 'O') dfs(0, c);
        if (board[m - 1][c] === 'O') dfs(m - 1, c);
    }

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (board[r][c] === 'O') board[r][c] = 'X';
            else if (board[r][c] === 'S') board[r][c] = 'O';
        }
    }

    for (const row of board) {
        console.log(row.join(''));
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Border Connected Flood Fill / Inverted Traversal',
      algorithm: 'Perform multi-source DFS from all border O cells to tag uncapturable regions. Flip untagged O cells to X.',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
      content: 'Boundary traversal avoids examining internal surrounded regions prematurely.',
      referenceCode: `def solve_board(board):
    # DFS from borders, replace safe O with temp mark
    pass`,
    },
    tags: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Union Find', 'Matrix'],
    testCases: [
      { input: '4 4\nXXXX\nXOOX\nXXOX\nXOXX', expectedOutput: 'XXXX\nXXXX\nXXXX\nXOXX', isHidden: false },
      { input: '1 1\nX', expectedOutput: 'X', isHidden: false },
      { input: '2 2\nOO\nOO', expectedOutput: 'OO\nOO', isHidden: false },
      { input: '3 3\nXXX\nXOX\nXXX', expectedOutput: 'XXX\nXXX\nXXX', isHidden: true },
    ],
  },

  // 9. Pacific Atlantic Water Flow
  {
    title: 'Pacific Atlantic Water Flow',
    slug: 'pacific-atlantic-water-flow',
    description: `There is an \`m x n\` rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an \`m x n\` integer matrix \`heights\` where \`heights[r][c]\` represents the height above sea level of the cell at coordinate \`(r, c)\`.

Water can flow from a cell to an adjacent cell if the neighboring cell's height is **less than or equal to** the current cell's height. Water flows into an ocean if it reaches any bordering cell.

Return a list of grid coordinates \`[r, c]\` where water can flow to **both** the Pacific and Atlantic oceans. Output coordinates sorted row by row, then by column.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `m == heights.length\nn == heights[r].length\n1 <= m, n <= 200\n0 <= heights[r][c] <= 10^5`,
    inputFormat: `Line 1: Two integers \`m n\`.\nNext \`m\` lines: \`n\` space-separated integers representing each row.`,
    outputFormat: `Coordinates of cells flowing into both oceans, one per line as \`r c\`.`,
    sampleInput: `5 5\n1 2 2 3 5\n3 2 3 4 4\n2 4 5 3 1\n6 7 1 4 5\n5 1 1 2 4`,
    sampleOutput: `0 4\n1 3\n1 4\n2 2\n3 0\n3 1\n4 0`,
    points: 150,
    hints: [
      'Instead of flowing down from every cell, flow water UP from the Pacific border and Atlantic border separately.',
      'A cell can reach both oceans if it is visited in both Pacific and Atlantic DFS/BFS runs.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    m, n = int(tokens[0]), int(tokens[1])
    h = []
    idx = 2
    for r in range(m):
        row = []
        for c in range(n):
            row.append(int(tokens[idx]))
            idx += 1
        h.append(row)

    pac = set()
    atl = set()

    def dfs(r, c, visited):
        visited.add((r, c))
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n and (nr, nc) not in visited:
                if h[nr][nc] >= h[r][c]:
                    dfs(nr, nc, visited)

    for r in range(m):
        dfs(r, 0, pac)
        dfs(r, n - 1, atl)
    for c in range(n):
        dfs(0, c, pac)
        dfs(m - 1, c, atl)

    common = sorted(list(pac & atl))
    for r, c in common:
        print(f"{r} {c}")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const m = parseInt(tokens[0], 10);
    const n = parseInt(tokens[1], 10);
    const h = [];
    let idx = 2;
    for (let r = 0; r < m; r++) {
        const row = [];
        for (let c = 0; c < n; c++) {
            row.push(parseInt(tokens[idx++], 10));
        }
        h.push(row);
    }

    const pac = Array.from({ length: m }, () => Array(n).fill(false));
    const atl = Array.from({ length: m }, () => Array(n).fill(false));

    function dfs(r, c, vis) {
        vis[r][c] = true;
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && !vis[nr][nc]) {
                if (h[nr][nc] >= h[r][c]) dfs(nr, nc, vis);
            }
        }
    }

    for (let r = 0; r < m; r++) {
        dfs(r, 0, pac);
        dfs(r, n - 1, atl);
    }
    for (let c = 0; c < n; c++) {
        dfs(0, c, pac);
        dfs(m - 1, c, atl);
    }

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (pac[r][c] && atl[r][c]) {
                console.log(\`\${r} \${c}\`);
            }
        }
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    m, n = int(tokens[0]), int(tokens[1])
    h = []
    idx = 2
    for r in range(m):
        row = []
        for c in range(n):
            row.append(int(tokens[idx]))
            idx += 1
        h.append(row)

    pac = set()
    atl = set()

    def dfs(r, c, visited):
        visited.add((r, c))
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n and (nr, nc) not in visited:
                if h[nr][nc] >= h[r][c]:
                    dfs(nr, nc, visited)

    for r in range(m):
        dfs(r, 0, pac)
        dfs(r, n - 1, atl)
    for c in range(n):
        dfs(0, c, pac)
        dfs(m - 1, c, atl)

    common = sorted(list(pac & atl))
    for r, c in common:
        print(f"{r} {c}")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const m = parseInt(tokens[0], 10);
    const n = parseInt(tokens[1], 10);
    const h = [];
    let idx = 2;
    for (let r = 0; r < m; r++) {
        const row = [];
        for (let c = 0; c < n; c++) {
            row.push(parseInt(tokens[idx++], 10));
        }
        h.push(row);
    }

    const pac = Array.from({ length: m }, () => Array(n).fill(false));
    const atl = Array.from({ length: m }, () => Array(n).fill(false));

    function dfs(r, c, vis) {
        vis[r][c] = true;
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && !vis[nr][nc]) {
                if (h[nr][nc] >= h[r][c]) dfs(nr, nc, vis);
            }
        }
    }

    for (let r = 0; r < m; r++) {
        dfs(r, 0, pac);
        dfs(r, n - 1, atl);
    }
    for (let c = 0; c < n; c++) {
        dfs(0, c, pac);
        dfs(m - 1, c, atl);
    }

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (pac[r][c] && atl[r][c]) {
                console.log(\`\${r} \${c}\`);
            }
        }
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Dual Ocean Multi-Source Upward DFS',
      algorithm: 'Reverse the flow: climb from sea boundaries inward to identify reachability sets and intersect them.',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
      content: 'Standard two-way graph reachability.',
      referenceCode: `def pacific_atlantic(heights):
    # dual DFS from ocean edges
    pass`,
    },
    tags: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Matrix'],
    testCases: [
      { input: '5 5\n1 2 2 3 5\n3 2 3 4 4\n2 4 5 3 1\n6 7 1 4 5\n5 1 1 2 4', expectedOutput: '0 4\n1 3\n1 4\n2 2\n3 0\n3 1\n4 0', isHidden: false },
      { input: '1 1\n1', expectedOutput: '0 0', isHidden: false },
      { input: '2 2\n1 2\n2 1', expectedOutput: '0 1\n1 0', isHidden: true },
    ],
  },

  // 10. Combination Sum IV
  {
    title: 'Combination Sum IV',
    slug: 'combination-sum-iv',
    description: `Given an array of **distinct** integers \`nums\` and a target integer \`target\`, return the number of possible combinations that add up to \`target\`.

The test cases are generated so that the answer can fit in a 32-bit integer. Note that different sequences are counted as different combinations.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 200\n1 <= nums[i] <= 1000\nAll elements of nums are unique.\n1 <= target <= 1000`,
    inputFormat: `Line 1: An integer \`target\`.\nLine 2: Space-separated distinct integers of \`nums\`.`,
    outputFormat: `Number of permutations adding to \`target\`.`,
    sampleInput: `4\n1 2 3`,
    sampleOutput: `7`,
    points: 150,
    hints: [
      'This is an unbounded knapsack problem where order matters (permutations).',
      'dp[t] = sum(dp[t - num] for num in nums if t >= num), with base case dp[0] = 1.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    target = int(lines[0].strip())
    nums = list(map(int, lines[1].strip().split()))
    dp = [0] * (target + 1)
    dp[0] = 1
    for t in range(1, target + 1):
        for num in nums:
            if t >= num:
                dp[t] += dp[t - num]
    print(dp[target])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const target = parseInt(lines[0].trim(), 10);
    const nums = lines[1].trim().split(/\\s+/).map(Number);
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;
    for (let t = 1; t <= target; t++) {
        for (const num of nums) {
            if (t >= num) dp[t] += dp[t - num];
        }
    }
    console.log(dp[target]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    target = int(lines[0].strip())
    nums = list(map(int, lines[1].strip().split()))
    dp = [0] * (target + 1)
    dp[0] = 1
    for t in range(1, target + 1):
        for num in nums:
            if t >= num:
                dp[t] += dp[t - num]
    print(dp[target])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const target = parseInt(lines[0].trim(), 10);
    const nums = lines[1].trim().split(/\\s+/).map(Number);
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;
    for (let t = 1; t <= target; t++) {
        for (const num of nums) {
            if (t >= num) dp[t] += dp[t - num];
        }
    }
    console.log(dp[target]);
}

solve();
`,
    },
    editorial: {
      approach: 'Target Permutation Dynamic Programming',
      algorithm: 'dp[i] represents number of sequences summing to i. Loop through each subtarget and candidate coin.',
      timeComplexity: 'O(target * nums.length)',
      spaceComplexity: 'O(target)',
      content: 'Coin change variation counting permutations.',
      referenceCode: `def combination_sum_4(nums, target):
    dp = [1] + [0] * target
    for t in range(1, target + 1):
        dp[t] = sum(dp[t - x] for x in nums if t >= x)
    return dp[target]`,
    },
    tags: ['Array', 'Dynamic Programming'],
    testCases: [
      { input: '4\n1 2 3', expectedOutput: '7', isHidden: false },
      { input: '3\n9', expectedOutput: '0', isHidden: false },
      { input: '1\n1', expectedOutput: '1', isHidden: false },
      { input: '10\n1 2 5', expectedOutput: '128', isHidden: true },
    ],
  },

  // 11. House Robber II
  {
    title: 'House Robber II',
    slug: 'house-robber-ii',
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle**. That means the first house is the neighbor of the last one.

Given an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police (cannot rob adjacent houses).`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 100\n0 <= nums[i] <= 1000`,
    inputFormat: `Line 1: Space-separated integers representing money in houses.`,
    outputFormat: `Maximum money that can be robbed.`,
    sampleInput: `2 3 2`,
    sampleOutput: `3`,
    points: 150,
    hints: [
      'Since the houses are in a circle, you cannot rob both the first house and the last house.',
      'Compute the linear House Robber for nums[0..n-2] and nums[1..n-1], and take the maximum.',
    ],
    codeTemplates: {
      python: `import sys

def rob_linear(nums):
    r1, r2 = 0, 0
    for n in nums:
        r1, r2 = r2, max(r1 + n, r2)
    return r2

def solve():
    nums = list(map(int, sys.stdin.read().split()))
    if not nums: return
    if len(nums) == 1:
        print(nums[0])
        return
    ans = max(rob_linear(nums[:-1]), rob_linear(nums[1:]))
    print(ans)

solve()
`,
      javascript: `const fs = require('fs');

function robLinear(nums) {
    let r1 = 0, r2 = 0;
    for (const n of nums) {
        const temp = Math.max(r1 + n, r2);
        r1 = r2;
        r2 = temp;
    }
    return r2;
}

function solve() {
    const nums = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);
    if (nums.length === 0 || isNaN(nums[0])) return;
    if (nums.length === 1) {
        console.log(nums[0]);
        return;
    }
    const ans = Math.max(robLinear(nums.slice(0, -1)), robLinear(nums.slice(1)));
    console.log(ans);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def rob_linear(nums):
    r1, r2 = 0, 0
    for n in nums:
        r1, r2 = r2, max(r1 + n, r2)
    return r2

def solve():
    nums = list(map(int, sys.stdin.read().split()))
    if not nums: return
    if len(nums) == 1:
        print(nums[0])
        return
    ans = max(rob_linear(nums[:-1]), rob_linear(nums[1:]))
    print(ans)

solve()
`,
      javascript: `const fs = require('fs');

function robLinear(nums) {
    let r1 = 0, r2 = 0;
    for (const n of nums) {
        const temp = Math.max(r1 + n, r2);
        r1 = r2;
        r2 = temp;
    }
    return r2;
}

function solve() {
    const nums = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);
    if (nums.length === 0 || isNaN(nums[0])) return;
    if (nums.length === 1) {
        console.log(nums[0]);
        return;
    }
    const ans = Math.max(robLinear(nums.slice(0, -1)), robLinear(nums.slice(1)));
    console.log(ans);
}

solve();
`,
    },
    editorial: {
      approach: 'Circular Dynamic Programming Split Reduction',
      algorithm: 'Break circular constraint into two linear subproblems: excluding the first house and excluding the last house.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'Standard circular array DP reduction.',
      referenceCode: `def rob2(nums):
    if len(nums) == 1: return nums[0]
    def rob_lin(arr):
        r1, r2 = 0, 0
        for x in arr: r1, r2 = r2, max(r1 + x, r2)
        return r2
    return max(rob_lin(nums[:-1]), rob_lin(nums[1:]))`,
    },
    tags: ['Array', 'Dynamic Programming'],
    testCases: [
      { input: '2 3 2', expectedOutput: '3', isHidden: false },
      { input: '1 2 3 1', expectedOutput: '4', isHidden: false },
      { input: '1 2 3', expectedOutput: '3', isHidden: false },
      { input: '5', expectedOutput: '5', isHidden: true },
      { input: '1 3 1 3 100', expectedOutput: '103', isHidden: true },
    ],
  },

  // 12. Longest Palindromic Substring
  {
    title: 'Longest Palindromic Substring',
    slug: 'longest-palindromic-substring',
    description: `Given a string \`s\`, return the longest **palindromic substring** in \`s\`.

If there are multiple answers, return the first one that occurs in the string.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= s.length <= 1000\ns consist of only digits and English letters.`,
    inputFormat: `Line 1: A string \`s\`.`,
    outputFormat: `The longest palindromic substring.`,
    sampleInput: `babad`,
    sampleOutput: `bab`,
    points: 150,
    hints: [
      'Expand around centers for both odd and even lengths.',
      'Track the start and max length of the longest palindrome found.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    s = sys.stdin.read().strip()
    if not s: return
    n = len(s)
    if n <= 1:
        print(s)
        return
    best = ""
    def expand(l, r):
        while l >= 0 and r < n and s[l] == s[r]:
            l -= 1
            r += 1
        return s[l+1:r]

    for i in range(n):
        s1 = expand(i, i)
        s2 = expand(i, i + 1)
        if len(s1) > len(best): best = s1
        if len(s2) > len(best): best = s2
    print(best)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s) return;
    const n = s.length;
    if (n <= 1) { console.log(s); return; }
    let best = "";

    function expand(l, r) {
        while (l >= 0 && r < n && s[l] === s[r]) {
            l--;
            r++;
        }
        return s.substring(l + 1, r);
    }

    for (let i = 0; i < n; i++) {
        const s1 = expand(i, i);
        const s2 = expand(i, i + 1);
        if (s1.length > best.length) best = s1;
        if (s2.length > best.length) best = s2;
    }
    console.log(best);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    s = sys.stdin.read().strip()
    if not s: return
    n = len(s)
    if n <= 1:
        print(s)
        return
    best = ""
    def expand(l, r):
        while l >= 0 and r < n and s[l] == s[r]:
            l -= 1
            r += 1
        return s[l+1:r]

    for i in range(n):
        s1 = expand(i, i)
        s2 = expand(i, i + 1)
        if len(s1) > len(best): best = s1
        if len(s2) > len(best): best = s2
    print(best)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s) return;
    const n = s.length;
    if (n <= 1) { console.log(s); return; }
    let best = "";

    function expand(l, r) {
        while (l >= 0 && r < n && s[l] === s[r]) {
            l--;
            r++;
        }
        return s.substring(l + 1, r);
    }

    for (let i = 0; i < n; i++) {
        const s1 = expand(i, i);
        const s2 = expand(i, i + 1);
        if (s1.length > best.length) best = s1;
        if (s2.length > best.length) best = s2;
    }
    console.log(best);
}

solve();
`,
    },
    editorial: {
      approach: 'Two Pointers Center Expansion',
      algorithm: 'Expand outwards from each center coordinate to find symmetrical boundaries.',
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(1)',
      content: 'Classic string manipulation and dynamic programming pattern.',
      referenceCode: `def longest_palindrome(s):
    # expand around center
    pass`,
    },
    tags: ['Two Pointers', 'String', 'Dynamic Programming'],
    testCases: [
      { input: 'babad', expectedOutput: 'bab', isHidden: false },
      { input: 'cbbd', expectedOutput: 'bb', isHidden: false },
      { input: 'a', expectedOutput: 'a', isHidden: false },
      { input: 'ac', expectedOutput: 'a', isHidden: true },
      { input: 'forgeeksskeegfor', expectedOutput: 'geeksskeeg', isHidden: true },
    ],
  },

  // 13. Insert Interval
  {
    title: 'Insert Interval',
    slug: 'insert-interval',
    description: `You are given an array of non-overlapping intervals \`intervals\` where \`intervals[i] = [starti, endi]\` sorted in ascending order by \`starti\`. You are also given an interval \`newInterval = [start, end]\` that represents the start and end of another interval.

Insert \`newInterval\` into \`intervals\` such that \`intervals\` is still sorted in ascending order by \`starti\` and \`intervals\` still does not have any overlapping intervals (merge overlapping intervals if necessary).`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `0 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= starti <= endi <= 10^5\nintervals is sorted by starti in ascending order.\nnewInterval.length == 2\n0 <= start <= end <= 10^5`,
    inputFormat: `Line 1: Two integers for \`newInterval\` (\`start end\`).\nLine 2: An integer \`n\` (number of intervals).\nNext \`n\` lines: Two integers \`start end\` representing each interval.`,
    outputFormat: `Merged intervals, each on a new line as \`start end\`.`,
    sampleInput: `2 5\n2\n1 3\n6 9`,
    sampleOutput: `1 5\n6 9`,
    points: 150,
    hints: [
      'Add all intervals ending before newInterval starts.',
      'Merge all intervals overlapping with newInterval.',
      'Add all intervals starting after newInterval ends.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    ns, ne = int(tokens[0]), int(tokens[1])
    n = int(tokens[2])
    intervals = []
    idx = 3
    for _ in range(n):
        intervals.append([int(tokens[idx]), int(tokens[idx+1])])
        idx += 2

    res = []
    i = 0
    while i < n and intervals[i][1] < ns:
        res.append(intervals[i])
        i += 1

    while i < n and intervals[i][0] <= ne:
        ns = min(ns, intervals[i][0])
        ne = max(ne, intervals[i][1])
        i += 1
    res.append([ns, ne])

    while i < n:
        res.append(intervals[i])
        i += 1

    for start, end in res:
        print(f"{start} {end}")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 3) return;
    let ns = parseInt(tokens[0], 10);
    let ne = parseInt(tokens[1], 10);
    const n = parseInt(tokens[2], 10);
    const intervals = [];
    let idx = 3;
    for (let k = 0; k < n; k++) {
        intervals.push([parseInt(tokens[idx], 10), parseInt(tokens[idx+1], 10)]);
        idx += 2;
    }

    const res = [];
    let i = 0;
    while (i < n && intervals[i][1] < ns) {
        res.push(intervals[i]);
        i++;
    }
    while (i < n && intervals[i][0] <= ne) {
        ns = Math.min(ns, intervals[i][0]);
        ne = Math.max(ne, intervals[i][1]);
        i++;
    }
    res.push([ns, ne]);
    while (i < n) {
        res.push(intervals[i]);
        i++;
    }

    for (const [start, end] of res) {
        console.log(\`\${start} \${end}\`);
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    ns, ne = int(tokens[0]), int(tokens[1])
    n = int(tokens[2])
    intervals = []
    idx = 3
    for _ in range(n):
        intervals.append([int(tokens[idx]), int(tokens[idx+1])])
        idx += 2

    res = []
    i = 0
    while i < n and intervals[i][1] < ns:
        res.append(intervals[i])
        i += 1

    while i < n and intervals[i][0] <= ne:
        ns = min(ns, intervals[i][0])
        ne = max(ne, intervals[i][1])
        i += 1
    res.append([ns, ne])

    while i < n:
        res.append(intervals[i])
        i += 1

    for start, end in res:
        print(f"{start} {end}")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 3) return;
    let ns = parseInt(tokens[0], 10);
    let ne = parseInt(tokens[1], 10);
    const n = parseInt(tokens[2], 10);
    const intervals = [];
    let idx = 3;
    for (let k = 0; k < n; k++) {
        intervals.push([parseInt(tokens[idx], 10), parseInt(tokens[idx+1], 10)]);
        idx += 2;
    }

    const res = [];
    let i = 0;
    while (i < n && intervals[i][1] < ns) {
        res.push(intervals[i]);
        i++;
    }
    while (i < n && intervals[i][0] <= ne) {
        ns = Math.min(ns, intervals[i][0]);
        ne = Math.max(ne, intervals[i][1]);
        i++;
    }
    res.push([ns, ne]);
    while (i < n) {
        res.push(intervals[i]);
        i++;
    }

    for (const [start, end] of res) {
        console.log(\`\${start} \${end}\`);
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Three-Phase Linear Scan',
      algorithm: '1. Append non-overlapping preceding intervals. 2. Merge all overlapping intervals into newInterval. 3. Append remaining succeeding intervals.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      content: 'Linear sweep interval merging.',
      referenceCode: `def insert(intervals, newInterval):
    # 3-phase scan
    pass`,
    },
    tags: ['Array'],
    testCases: [
      { input: '2 5\n2\n1 3\n6 9', expectedOutput: '1 5\n6 9', isHidden: false },
      { input: '4 8\n5\n1 2\n3 5\n6 7\n8 10\n12 16', expectedOutput: '1 2\n3 10\n12 16', isHidden: false },
      { input: '5 7\n0', expectedOutput: '5 7', isHidden: false },
      { input: '0 0\n2\n1 5\n6 8', expectedOutput: '0 0\n1 5\n6 8', isHidden: true },
    ],
  },

  // 14. Meeting Rooms
  {
    title: 'Meeting Rooms',
    slug: 'meeting-rooms',
    description: `Given an array of meeting time intervals where \`intervals[i] = [starti, endi]\`, determine if a person could attend all meetings.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `0 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= starti < endi <= 10^6`,
    inputFormat: `Line 1: An integer \`n\` (number of intervals).\nNext \`n\` lines: Two integers \`start end\` representing each interval.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `3\n0 30\n5 10\n15 20`,
    sampleOutput: `false`,
    points: 100,
    hints: [
      'Sort intervals by start time.',
      'Check if intervals[i][0] < intervals[i - 1][1].',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    intervals = []
    idx = 1
    for _ in range(n):
        intervals.append((int(tokens[idx]), int(tokens[idx+1])))
        idx += 2
    intervals.sort()
    for i in range(1, n):
        if intervals[i][0] < intervals[i-1][1]:
            print("false")
            return
    print("true")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length === 0 || tokens[0] === '') return;
    const n = parseInt(tokens[0], 10);
    const intervals = [];
    let idx = 1;
    for (let i = 0; i < n; i++) {
        intervals.push([parseInt(tokens[idx], 10), parseInt(tokens[idx+1], 10)]);
        idx += 2;
    }
    intervals.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < n; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) {
            console.log("false");
            return;
        }
    }
    console.log("true");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    intervals = []
    idx = 1
    for _ in range(n):
        intervals.append((int(tokens[idx]), int(tokens[idx+1])))
        idx += 2
    intervals.sort()
    for i in range(1, n):
        if intervals[i][0] < intervals[i-1][1]:
            print("false")
            return
    print("true")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length === 0 || tokens[0] === '') return;
    const n = parseInt(tokens[0], 10);
    const intervals = [];
    let idx = 1;
    for (let i = 0; i < n; i++) {
        intervals.push([parseInt(tokens[idx], 10), parseInt(tokens[idx+1], 10)]);
        idx += 2;
    }
    intervals.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < n; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) {
            console.log("false");
            return;
        }
    }
    console.log("true");
}

solve();
`,
    },
    editorial: {
      approach: 'Sorting by Start Time Interval Overlap Check',
      algorithm: 'Sort by start time and verify consecutive interval non-overlap condition in O(n log n).',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      content: 'Fundamental interval scheduling problem.',
      referenceCode: `def can_attend_meetings(intervals):
    intervals.sort()
    return all(intervals[i][0] >= intervals[i-1][1] for i in range(1, len(intervals)))`,
    },
    tags: ['Array', 'Sorting'],
    testCases: [
      { input: '3\n0 30\n5 10\n15 20', expectedOutput: 'false', isHidden: false },
      { input: '2\n7 10\n2 4', expectedOutput: 'true', isHidden: false },
      { input: '0', expectedOutput: 'true', isHidden: false },
      { input: '2\n1 4\n4 5', expectedOutput: 'true', isHidden: true },
    ],
  },

  // 15. Meeting Rooms II
  {
    title: 'Meeting Rooms II',
    slug: 'meeting-rooms-ii',
    description: `Given an array of meeting time intervals \`intervals\` where \`intervals[i] = [starti, endi]\`, return the minimum number of conference rooms required.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= intervals.length <= 10^4\n0 <= starti < endi <= 10^6`,
    inputFormat: `Line 1: An integer \`n\` (number of intervals).\nNext \`n\` lines: Two integers \`start end\` representing each interval.`,
    outputFormat: `Minimum conference rooms required.`,
    sampleInput: `3\n0 30\n5 10\n15 20`,
    sampleOutput: `2`,
    points: 150,
    hints: [
      'Separate start times and end times, and sort both arrays.',
      'Use two pointers to track overlapping active meetings.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    starts, ends = [], []
    idx = 1
    for _ in range(n):
        starts.append(int(tokens[idx]))
        ends.append(int(tokens[idx+1]))
        idx += 2
    starts.sort()
    ends.sort()
    
    s_ptr, e_ptr = 0, 0
    max_rooms, cur_rooms = 0, 0
    while s_ptr < n:
        if starts[s_ptr] < ends[e_ptr]:
            cur_rooms += 1
            s_ptr += 1
        else:
            cur_rooms -= 1
            e_ptr += 1
        max_rooms = max(max_rooms, cur_rooms)
    print(max_rooms)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length === 0 || tokens[0] === '') return;
    const n = parseInt(tokens[0], 10);
    const starts = [], ends = [];
    let idx = 1;
    for (let i = 0; i < n; i++) {
        starts.push(parseInt(tokens[idx], 10));
        ends.push(parseInt(tokens[idx+1], 10));
        idx += 2;
    }
    starts.sort((a, b) => a - b);
    ends.sort((a, b) => a - b);

    let s = 0, e = 0, maxRooms = 0, cur = 0;
    while (s < n) {
        if (starts[s] < ends[e]) {
            cur++;
            s++;
        } else {
            cur--;
            e++;
        }
        maxRooms = Math.max(maxRooms, cur);
    }
    console.log(maxRooms);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    starts, ends = [], []
    idx = 1
    for _ in range(n):
        starts.append(int(tokens[idx]))
        ends.append(int(tokens[idx+1]))
        idx += 2
    starts.sort()
    ends.sort()
    
    s_ptr, e_ptr = 0, 0
    max_rooms, cur_rooms = 0, 0
    while s_ptr < n:
        if starts[s_ptr] < ends[e_ptr]:
            cur_rooms += 1
            s_ptr += 1
        else:
            cur_rooms -= 1
            e_ptr += 1
        max_rooms = max(max_rooms, cur_rooms)
    print(max_rooms)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length === 0 || tokens[0] === '') return;
    const n = parseInt(tokens[0], 10);
    const starts = [], ends = [];
    let idx = 1;
    for (let i = 0; i < n; i++) {
        starts.push(parseInt(tokens[idx], 10));
        ends.push(parseInt(tokens[idx+1], 10));
        idx += 2;
    }
    starts.sort((a, b) => a - b);
    ends.sort((a, b) => a - b);

    let s = 0, e = 0, maxRooms = 0, cur = 0;
    while (s < n) {
        if (starts[s] < ends[e]) {
            cur++;
            s++;
        } else {
            cur--;
            e++;
        }
        maxRooms = Math.max(maxRooms, cur);
    }
    console.log(maxRooms);
}

solve();
`,
    },
    editorial: {
      approach: 'Two Pointers Chronological Event Sweep',
      algorithm: 'Treat starts as +1 room events and ends as -1 room events to find maximum concurrent active rooms in O(n log n).',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      content: 'Optimal meeting room allocation using sweep-line technique.',
      referenceCode: `def min_meeting_rooms(intervals):
    s = sorted([i[0] for i in intervals])
    e = sorted([i[1] for i in intervals])
    sp = ep = rooms = max_r = 0
    while sp < len(s):
        if s[sp] < e[ep]: rooms += 1; sp += 1
        else: rooms -= 1; ep += 1
        max_r = max(max_r, rooms)
    return max_r`,
    },
    tags: ['Array', 'Two Pointers', 'Greedy', 'Sorting', 'Heap (Priority Queue)', 'Prefix Sum'],
    testCases: [
      { input: '3\n0 30\n5 10\n15 20', expectedOutput: '2', isHidden: false },
      { input: '2\n7 10\n2 4', expectedOutput: '1', isHidden: false },
      { input: '3\n1 5\n2 6\n3 7', expectedOutput: '3', isHidden: true },
      { input: '1\n0 100', expectedOutput: '1', isHidden: true },
    ],
  },

  // 16. Minimum Window Substring
  {
    title: 'Minimum Window Substring',
    slug: 'minimum-window-substring',
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the **minimum window substring** of \`s\` such that every character in \`t\` (**including duplicates**) is included in the window. If there is no such substring, return the empty string \`""\`.

The testcases will be generated such that the answer is unique.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `m == s.length\nn == t.length\n1 <= m, n <= 10^5\ns and t consist of uppercase and lowercase English letters.`,
    inputFormat: `Line 1: String \`s\`.\nLine 2: String \`t\`.`,
    outputFormat: `Minimum window substring in \`s\` or empty line if none exists.`,
    sampleInput: `ADOBECODEBANC\nABC`,
    sampleOutput: `BANC`,
    points: 300,
    hints: [
      'Maintain a frequency count of target string t.',
      'Expand right pointer until all characters in t are satisfied (have == need).',
      'Contract left pointer while maintaining the have == need condition to minimize window length.',
    ],
    codeTemplates: {
      python: `import sys
from collections import Counter

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    s = lines[0].strip()
    t = lines[1].strip()
    if not t or not s:
        print("")
        return

    target_count = Counter(t)
    window = {}
    have, need = 0, len(target_count)
    res, res_len = [-1, -1], float('inf')
    l = 0

    for r in range(len(s)):
        c = s[r]
        window[c] = window.get(c, 0) + 1
        if c in target_count and window[c] == target_count[c]:
            have += 1

        while have == need:
            if (r - l + 1) < res_len:
                res = [l, r]
                res_len = r - l + 1
            window[s[l]] -= 1
            if s[l] in target_count and window[s[l]] < target_count[s[l]]:
                have -= 1
            l += 1

    l, r = res
    print(s[l:r+1] if res_len != float('inf') else "")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const s = lines[0].trim();
    const t = lines[1].trim();
    if (!s || !t) { console.log(""); return; }

    const target = {};
    for (const c of t) target[c] = (target[c] || 0) + 1;
    const need = Object.keys(target).length;
    let have = 0;
    const window = {};
    let minLen = Infinity, start = -1;
    let l = 0;

    for (let r = 0; r < s.length; r++) {
        const c = s[r];
        window[c] = (window[c] || 0) + 1;
        if (target[c] !== undefined && window[c] === target[c]) have++;

        while (have === need) {
            if (r - l + 1 < minLen) {
                minLen = r - l + 1;
                start = l;
            }
            window[s[l]]--;
            if (target[s[l]] !== undefined && window[s[l]] < target[s[l]]) {
                have--;
            }
            l++;
        }
    }

    console.log(start !== -1 ? s.substring(start, start + minLen) : "");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
from collections import Counter

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    s = lines[0].strip()
    t = lines[1].strip()
    if not t or not s:
        print("")
        return

    target_count = Counter(t)
    window = {}
    have, need = 0, len(target_count)
    res, res_len = [-1, -1], float('inf')
    l = 0

    for r in range(len(s)):
        c = s[r]
        window[c] = window.get(c, 0) + 1
        if c in target_count and window[c] == target_count[c]:
            have += 1

        while have == need:
            if (r - l + 1) < res_len:
                res = [l, r]
                res_len = r - l + 1
            window[s[l]] -= 1
            if s[l] in target_count and window[s[l]] < target_count[s[l]]:
                have -= 1
            l += 1

    l, r = res
    print(s[l:r+1] if res_len != float('inf') else "")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const s = lines[0].trim();
    const t = lines[1].trim();
    if (!s || !t) { console.log(""); return; }

    const target = {};
    for (const c of t) target[c] = (target[c] || 0) + 1;
    const need = Object.keys(target).length;
    let have = 0;
    const window = {};
    let minLen = Infinity, start = -1;
    let l = 0;

    for (let r = 0; r < s.length; r++) {
        const c = s[r];
        window[c] = (window[c] || 0) + 1;
        if (target[c] !== undefined && window[c] === target[c]) have++;

        while (have === need) {
            if (r - l + 1 < minLen) {
                minLen = r - l + 1;
                start = l;
            }
            window[s[l]]--;
            if (target[s[l]] !== undefined && window[s[l]] < target[s[l]]) {
                have--;
            }
            l++;
        }
    }

    console.log(start !== -1 ? s.substring(start, start + minLen) : "");
}

solve();
`,
    },
    editorial: {
      approach: 'Two Pointers Sliding Window with Frequency Map',
      algorithm: 'Maintain count of satisfied distinct character constraints. Expand right until valid, then shrink left to optimize minimum length.',
      timeComplexity: 'O(m + n)',
      spaceComplexity: 'O(m + n)',
      content: 'Optimal linear-time substring window search.',
      referenceCode: `def min_window(s, t):
    # sliding window have/need
    pass`,
    },
    tags: ['Hash Table', 'String', 'Sliding Window'],
    testCases: [
      { input: 'ADOBECODEBANC\nABC', expectedOutput: 'BANC', isHidden: false },
      { input: 'a\na', expectedOutput: 'a', isHidden: false },
      { input: 'a\naa', expectedOutput: '', isHidden: false },
      { input: 'ab\nb', expectedOutput: 'b', isHidden: true },
      { input: 'cabwefgewcwaefgcf\ncae', expectedOutput: 'cwae', isHidden: true },
    ],
  },

  // 17. Longest Repeating Character Replacement
  {
    title: 'Longest Repeating Character Replacement',
    slug: 'longest-repeating-character-replacement',
    description: `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most \`k\` times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= s.length <= 10^5\ns consists of only uppercase English letters.\n0 <= k <= s.length`,
    inputFormat: `Line 1: String \`s\`.\nLine 2: Integer \`k\`.`,
    outputFormat: `Length of the longest substring.`,
    sampleInput: `ABAB\n2`,
    sampleOutput: `4`,
    points: 150,
    hints: [
      'Window length is (r - l + 1).',
      'Number of replacements needed in window is (window_length - max_frequency).',
      'Shrink left pointer whenever (window_length - max_frequency) > k.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split()
    if len(lines) < 2: return
    s = lines[0]
    k = int(lines[1])
    count = {}
    max_f = 0
    l = 0
    res = 0
    for r in range(len(s)):
        count[s[r]] = count.get(s[r], 0) + 1
        max_f = max(max_f, count[s[r]])
        while (r - l + 1) - max_f > k:
            count[s[l]] -= 1
            l += 1
        res = max(res, r - l + 1)
    print(res)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (lines.length < 2) return;
    const s = lines[0];
    const k = parseInt(lines[1], 10);
    const count = {};
    let maxF = 0, l = 0, res = 0;
    for (let r = 0; r < s.length; r++) {
        count[s[r]] = (count[s[r]] || 0) + 1;
        maxF = Math.max(maxF, count[s[r]]);
        while ((r - l + 1) - maxF > k) {
            count[s[l]]--;
            l++;
        }
        res = Math.max(res, r - l + 1);
    }
    console.log(res);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split()
    if len(lines) < 2: return
    s = lines[0]
    k = int(lines[1])
    count = {}
    max_f = 0
    l = 0
    res = 0
    for r in range(len(s)):
        count[s[r]] = count.get(s[r], 0) + 1
        max_f = max(max_f, count[s[r]])
        while (r - l + 1) - max_f > k:
            count[s[l]] -= 1
            l += 1
        res = max(res, r - l + 1)
    print(res)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (lines.length < 2) return;
    const s = lines[0];
    const k = parseInt(lines[1], 10);
    const count = {};
    let maxF = 0, l = 0, res = 0;
    for (let r = 0; r < s.length; r++) {
        count[s[r]] = (count[s[r]] || 0) + 1;
        maxF = Math.max(maxF, count[s[r]]);
        while ((r - l + 1) - maxF > k) {
            count[s[l]]--;
            l++;
        }
        res = Math.max(res, r - l + 1);
    }
    console.log(res);
}

solve();
`,
    },
    editorial: {
      approach: 'Sliding Window with Max Frequency Invariant',
      algorithm: 'Slide a window [l, r] maintaining (r - l + 1) - max_f <= k.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(26) = O(1)',
      content: 'Standard sliding window invariant technique.',
      referenceCode: `def character_replacement(s, k):
    count = {}
    l = max_f = res = 0
    for r in range(len(s)):
        count[s[r]] = count.get(s[r], 0) + 1
        max_f = max(max_f, count[s[r]])
        while (r - l + 1) - max_f > k:
            count[s[l]] -= 1
            l += 1
        res = max(res, r - l + 1)
    return res`,
    },
    tags: ['Hash Table', 'String', 'Sliding Window'],
    testCases: [
      { input: 'ABAB\n2', expectedOutput: '4', isHidden: false },
      { input: 'AABABBA\n1', expectedOutput: '4', isHidden: false },
      { input: 'AAAA\n0', expectedOutput: '4', isHidden: false },
      { input: 'ABBB\n2', expectedOutput: '4', isHidden: true },
    ],
  },

  // 18. Permutation in String
  {
    title: 'Permutation in String',
    slug: 'permutation-in-string',
    description: `Given two strings \`s1\` and \`s2\`, return \`true\` if \`s2\` contains a permutation of \`s1\`, or \`false\` otherwise.

In other words, return \`true\` if one of \`s1\`'s permutations is the substring of \`s2\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= s1.length, s2.length <= 10^4\ns1 and s2 consist of lowercase English letters.`,
    inputFormat: `Line 1: String \`s1\`.\nLine 2: String \`s2\`.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `ab\neidbaooo`,
    sampleOutput: `true`,
    points: 150,
    hints: [
      'Maintain a fixed window of length len(s1) across s2.',
      'Check if character frequency match occurs between the window and s1.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    s1, s2 = lines[0].strip(), lines[1].strip()
    if len(s1) > len(s2):
        print("false")
        return

    c1 = [0] * 26
    c2 = [0] * 26
    for i in range(len(s1)):
        c1[ord(s1[i]) - ord('a')] += 1
        c2[ord(s2[i]) - ord('a')] += 1

    matches = sum(1 for i in range(26) if c1[i] == c2[i])
    for i in range(len(s1), len(s2)):
        if matches == 26:
            print("true")
            return
        # Add new char
        idx = ord(s2[i]) - ord('a')
        c2[idx] += 1
        if c2[idx] == c1[idx]: matches += 1
        elif c2[idx] == c1[idx] + 1: matches -= 1

        # Remove old char
        idx = ord(s2[i - len(s1)]) - ord('a')
        c2[idx] -= 1
        if c2[idx] == c1[idx]: matches += 1
        elif c2[idx] == c1[idx] - 1: matches -= 1

    print("true" if matches == 26 else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const s1 = lines[0].trim(), s2 = lines[1].trim();
    if (s1.length > s2.length) { console.log("false"); return; }

    const c1 = new Array(26).fill(0);
    const c2 = new Array(26).fill(0);
    const a = 'a'.charCodeAt(0);

    for (let i = 0; i < s1.length; i++) {
        c1[s1.charCodeAt(i) - a]++;
        c2[s2.charCodeAt(i) - a]++;
    }

    let matches = 0;
    for (let i = 0; i < 26; i++) if (c1[i] === c2[i]) matches++;

    for (let i = s1.length; i < s2.length; i++) {
        if (matches === 26) { console.log("true"); return; }
        const r = s2.charCodeAt(i) - a;
        c2[r]++;
        if (c2[r] === c1[r]) matches++;
        else if (c2[r] === c1[r] + 1) matches--;

        const l = s2.charCodeAt(i - s1.length) - a;
        c2[l]--;
        if (c2[l] === c1[l]) matches++;
        else if (c2[l] === c1[l] - 1) matches--;
    }

    console.log(matches === 26 ? "true" : "false");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    s1, s2 = lines[0].strip(), lines[1].strip()
    if len(s1) > len(s2):
        print("false")
        return

    c1 = [0] * 26
    c2 = [0] * 26
    for i in range(len(s1)):
        c1[ord(s1[i]) - ord('a')] += 1
        c2[ord(s2[i]) - ord('a')] += 1

    matches = sum(1 for i in range(26) if c1[i] == c2[i])
    for i in range(len(s1), len(s2)):
        if matches == 26:
            print("true")
            return
        idx = ord(s2[i]) - ord('a')
        c2[idx] += 1
        if c2[idx] == c1[idx]: matches += 1
        elif c2[idx] == c1[idx] + 1: matches -= 1

        idx = ord(s2[i - len(s1)]) - ord('a')
        c2[idx] -= 1
        if c2[idx] == c1[idx]: matches += 1
        elif c2[idx] == c1[idx] - 1: matches -= 1

    print("true" if matches == 26 else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const s1 = lines[0].trim(), s2 = lines[1].trim();
    if (s1.length > s2.length) { console.log("false"); return; }

    const c1 = new Array(26).fill(0);
    const c2 = new Array(26).fill(0);
    const a = 'a'.charCodeAt(0);

    for (let i = 0; i < s1.length; i++) {
        c1[s1.charCodeAt(i) - a]++;
        c2[s2.charCodeAt(i) - a]++;
    }

    let matches = 0;
    for (let i = 0; i < 26; i++) if (c1[i] === c2[i]) matches++;

    for (let i = s1.length; i < s2.length; i++) {
        if (matches === 26) { console.log("true"); return; }
        const r = s2.charCodeAt(i) - a;
        c2[r]++;
        if (c2[r] === c1[r]) matches++;
        else if (c2[r] === c1[r] + 1) matches--;

        const l = s2.charCodeAt(i - s1.length) - a;
        c2[l]--;
        if (c2[l] === c1[l]) matches++;
        else if (c2[l] === c1[l] - 1) matches--;
    }

    console.log(matches === 26 ? "true" : "false");
}

solve();
`,
    },
    editorial: {
      approach: 'Fixed-Window Frequency Array Matching',
      algorithm: 'Maintain count of matched 26 alphabet frequencies while sliding a window of length len(s1).',
      timeComplexity: 'O(len(s2))',
      spaceComplexity: 'O(1)',
      content: 'Fixed size sliding window permutation detection.',
      referenceCode: `def check_inclusion(s1, s2):
    # fixed window match count
    pass`,
    },
    tags: ['Two Pointers', 'String', 'Sliding Window'],
    testCases: [
      { input: 'ab\neidbaooo', expectedOutput: 'true', isHidden: false },
      { input: 'ab\neidboaoo', expectedOutput: 'false', isHidden: false },
      { input: 'a\na', expectedOutput: 'true', isHidden: false },
      { input: 'adc\ndcda', expectedOutput: 'true', isHidden: true },
    ],
  },

  // 19. Find All Anagrams in a String
  {
    title: 'Find All Anagrams in a String',
    slug: 'find-all-anagrams-in-a-string',
    description: `Given two strings \`s\` and \`p\`, return an array of all the start indices of \`p\`'s anagrams in \`s\`. You may return the answer in **any order**.

An **anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= s.length, p.length <= 3 * 10^4\ns and p consist of lowercase English letters.`,
    inputFormat: `Line 1: String \`s\`.\nLine 2: String \`p\`.`,
    outputFormat: `Space-separated starting indices of anagrams in ascending order. If none, output empty line.`,
    sampleInput: `cbaebabacd\nabc`,
    sampleOutput: `0 6`,
    points: 150,
    hints: [
      'Maintain a frequency window of size len(p).',
      'Compare frequency vectors or track match count across the 26 characters.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    s, p = lines[0].strip(), lines[1].strip()
    if len(p) > len(s):
        print("")
        return

    cp = [0] * 26
    cs = [0] * 26
    for i in range(len(p)):
        cp[ord(p[i]) - ord('a')] += 1
        cs[ord(s[i]) - ord('a')] += 1

    res = []
    if cp == cs:
        res.append(0)

    for i in range(len(p), len(s)):
        cs[ord(s[i]) - ord('a')] += 1
        cs[ord(s[i - len(p)]) - ord('a')] -= 1
        if cp == cs:
            res.append(i - len(p) + 1)

    print(' '.join(map(str, res)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const s = lines[0].trim(), p = lines[1].trim();
    if (p.length > s.length) { console.log(""); return; }

    const cp = new Array(26).fill(0);
    const cs = new Array(26).fill(0);
    const a = 'a'.charCodeAt(0);

    for (let i = 0; i < p.length; i++) {
        cp[p.charCodeAt(i) - a]++;
        cs[s.charCodeAt(i) - a]++;
    }

    const res = [];
    const equal = () => {
        for (let i = 0; i < 26; i++) if (cp[i] !== cs[i]) return false;
        return true;
    };

    if (equal()) res.push(0);

    for (let i = p.length; i < s.length; i++) {
        cs[s.charCodeAt(i) - a]++;
        cs[s.charCodeAt(i - p.length) - a]--;
        if (equal()) res.push(i - p.length + 1);
    }

    console.log(res.join(' '));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    s, p = lines[0].strip(), lines[1].strip()
    if len(p) > len(s):
        print("")
        return

    cp = [0] * 26
    cs = [0] * 26
    for i in range(len(p)):
        cp[ord(p[i]) - ord('a')] += 1
        cs[ord(s[i]) - ord('a')] += 1

    res = []
    if cp == cs:
        res.append(0)

    for i in range(len(p), len(s)):
        cs[ord(s[i]) - ord('a')] += 1
        cs[ord(s[i - len(p)]) - ord('a')] -= 1
        if cp == cs:
            res.append(i - len(p) + 1)

    print(' '.join(map(str, res)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const s = lines[0].trim(), p = lines[1].trim();
    if (p.length > s.length) { console.log(""); return; }

    const cp = new Array(26).fill(0);
    const cs = new Array(26).fill(0);
    const a = 'a'.charCodeAt(0);

    for (let i = 0; i < p.length; i++) {
        cp[p.charCodeAt(i) - a]++;
        cs[s.charCodeAt(i) - a]++;
    }

    const res = [];
    const equal = () => {
        for (let i = 0; i < 26; i++) if (cp[i] !== cs[i]) return false;
        return true;
    };

    if (equal()) res.push(0);

    for (let i = p.length; i < s.length; i++) {
        cs[s.charCodeAt(i) - a]++;
        cs[s.charCodeAt(i - p.length) - a]--;
        if (equal()) res.push(i - p.length + 1);
    }

    console.log(res.join(' '));
}

solve();
`,
    },
    editorial: {
      approach: 'Fixed-Window Frequency Array Comparison',
      algorithm: 'Slide a window of length len(p) and record matching frequency starting indices.',
      timeComplexity: 'O(len(s))',
      spaceComplexity: 'O(1)',
      content: 'Sliding window array index collection.',
      referenceCode: `def find_anagrams(s, p):
    # fixed window array comparison
    pass`,
    },
    tags: ['Hash Table', 'String', 'Sliding Window'],
    testCases: [
      { input: 'cbaebabacd\nabc', expectedOutput: '0 6', isHidden: false },
      { input: 'abab\nab', expectedOutput: '0 1 2', isHidden: false },
      { input: 'a\na', expectedOutput: '0', isHidden: false },
      { input: 'aaaa\naa', expectedOutput: '0 1 2', isHidden: true },
    ],
  },

  // 20. Implement Trie (Prefix Tree)
  {
    title: 'Implement Trie (Prefix Tree)',
    slug: 'implement-trie-prefix-tree',
    description: `A **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.

Implement the Trie data structure supporting three operations:
- \`insert(word)\`: Inserts the string \`word\` into the trie.
- \`search(word)\`: Returns \`true\` if the string \`word\` is in the trie (i.e., was inserted before), and \`false\` otherwise.
- \`startsWith(prefix)\`: Returns \`true\` if there is a previously inserted string \`word\` that has the prefix \`prefix\`, and \`false\` otherwise.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= word.length, prefix.length <= 2000\nword and prefix consist only of lowercase English letters.\nAt most 3 * 10^4 calls will be made in total.`,
    inputFormat: `Line 1: An integer \`q\` representing number of operations.\nNext \`q\` lines: \`insert <word>\` or \`search <word>\` or \`startsWith <prefix>\`.`,
    outputFormat: `Output result of each \`search\` and \`startsWith\` call (\`true\` or \`false\`), one per line.`,
    sampleInput: `5\ninsert apple\nsearch apple\nsearch app\nstartsWith app\ninsert app`,
    sampleOutput: `true\nfalse\ntrue`,
    points: 150,
    hints: [
      'Each TrieNode should have children dict or array of 26 pointers, and a boolean is_end.',
    ],
    codeTemplates: {
      python: `import sys

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True

    def search(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                return False
            node = node.children[c]
        return node.is_end

    def starts_with(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node.children:
                return False
            node = node.children[c]
        return True

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if not lines or not lines[0]: return
    q = int(lines[0].strip())
    trie = Trie()
    for i in range(1, q + 1):
        parts = lines[i].strip().split()
        if not parts: continue
        op = parts[0]
        arg = parts[1]
        if op == 'insert':
            trie.insert(arg)
        elif op == 'search':
            print("true" if trie.search(arg) else "false")
        elif op == 'startsWith':
            print("true" if trie.starts_with(arg) else "false")

solve()
`,
      javascript: `const fs = require('fs');

function TrieNode() {
    this.children = {};
    this.isEnd = false;
}

function Trie() {
    this.root = new TrieNode();
}

Trie.prototype.insert = function(word) {
    let node = this.root;
    for (const c of word) {
        if (!node.children[c]) node.children[c] = new TrieNode();
        node = node.children[c];
    }
    node.isEnd = true;
};

Trie.prototype.search = function(word) {
    let node = this.root;
    for (const c of word) {
        if (!node.children[c]) return false;
        node = node.children[c];
    }
    return node.isEnd;
};

Trie.prototype.startsWith = function(prefix) {
    let node = this.root;
    for (const c of prefix) {
        if (!node.children[c]) return false;
        node = node.children[c];
    }
    return true;
};

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const q = parseInt(lines[0].trim(), 10);
    const trie = new Trie();
    for (let i = 1; i <= q; i++) {
        const parts = lines[i].trim().split(/\\s+/);
        if (parts.length < 2) continue;
        const op = parts[0];
        const arg = parts[1];
        if (op === 'insert') trie.insert(arg);
        else if (op === 'search') console.log(trie.search(arg) ? "true" : "false");
        else if (op === 'startsWith') console.log(trie.startsWith(arg) ? "true" : "false");
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True

    def search(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                return False
            node = node.children[c]
        return node.is_end

    def starts_with(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node.children:
                return False
            node = node.children[c]
        return True

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if not lines or not lines[0]: return
    q = int(lines[0].strip())
    trie = Trie()
    for i in range(1, q + 1):
        parts = lines[i].strip().split()
        if not parts: continue
        op = parts[0]
        arg = parts[1]
        if op == 'insert':
            trie.insert(arg)
        elif op == 'search':
            print("true" if trie.search(arg) else "false")
        elif op == 'startsWith':
            print("true" if trie.starts_with(arg) else "false")

solve()
`,
      javascript: `const fs = require('fs');

function TrieNode() {
    this.children = {};
    this.isEnd = false;
}

function Trie() {
    this.root = new TrieNode();
}

Trie.prototype.insert = function(word) {
    let node = this.root;
    for (const c of word) {
        if (!node.children[c]) node.children[c] = new TrieNode();
        node = node.children[c];
    }
    node.isEnd = true;
};

Trie.prototype.search = function(word) {
    let node = this.root;
    for (const c of word) {
        if (!node.children[c]) return false;
        node = node.children[c];
    }
    return node.isEnd;
};

Trie.prototype.startsWith = function(prefix) {
    let node = this.root;
    for (const c of prefix) {
        if (!node.children[c]) return false;
        node = node.children[c];
    }
    return true;
};

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const q = parseInt(lines[0].trim(), 10);
    const trie = new Trie();
    for (let i = 1; i <= q; i++) {
        const parts = lines[i].trim().split(/\\s+/);
        if (parts.length < 2) continue;
        const op = parts[0];
        const arg = parts[1];
        if (op === 'insert') trie.insert(arg);
        else if (op === 'search') console.log(trie.search(arg) ? "true" : "false");
        else if (op === 'startsWith') console.log(trie.startsWith(arg) ? "true" : "false");
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Prefix Tree Trie Node Branching',
      algorithm: 'Represent keys as character paths from the root node. Support O(L) insertion and prefix lookups where L is key length.',
      timeComplexity: 'O(L) per operation',
      spaceComplexity: 'O(Total Chars)',
      content: 'Core prefix tree trie implementation.',
      referenceCode: `class Trie:
    # node branching
    pass`,
    },
    tags: ['Hash Table', 'String', 'Design', 'Trie'],
    testCases: [
      { input: '5\ninsert apple\nsearch apple\nsearch app\nstartsWith app\ninsert app', expectedOutput: 'true\nfalse\ntrue', isHidden: false },
      { input: '3\ninsert cat\nsearch cat\nsearch dog', expectedOutput: 'true\nfalse', isHidden: false },
      { input: '4\ninsert ban\nstartsWith ba\nstartsWith banan\nsearch ban', expectedOutput: 'true\nfalse\ntrue', isHidden: true },
    ],
  },

  // 21. Construct Binary Tree from Preorder and Inorder Traversal
  {
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    slug: 'construct-binary-tree-from-preorder-and-inorder-traversal',
    description: `Given two integer arrays \`preorder\` and \`inorder\` where \`preorder\` is the preorder traversal of a binary tree and \`inorder\` is the inorder traversal of the same tree, construct and return the binary tree.

Output the tree in level-order traversal format.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= preorder.length <= 3000\ninorder.length == preorder.length\n-3000 <= preorder[i], inorder[i] <= 3000\npreorder and inorder consist of unique values.`,
    inputFormat: `Line 1: Space-separated integers representing \`preorder\` traversal.\nLine 2: Space-separated integers representing \`inorder\` traversal.`,
    outputFormat: `Level-order traversal of the reconstructed tree (null for missing nodes if required or compact level order).`,
    sampleInput: `3 9 20 15 7\n9 3 15 20 7`,
    sampleOutput: `3,9,20,null,null,15,7`,
    points: 150,
    hints: [
      'The first element of preorder is always the root.',
      'Find the root index in inorder to divide left and right subtrees.',
    ],
    codeTemplates: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def serialize(root):
    if not root: return ""
    res = []
    q = [root]
    while q:
        node = q.pop(0)
        if node:
            res.append(str(node.val))
            q.append(node.left)
            q.append(node.right)
        else:
            res.append("null")
    while res and res[-1] == "null":
        res.pop()
    return ','.join(res)

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    preorder = list(map(int, lines[0].strip().split()))
    inorder = list(map(int, lines[1].strip().split()))
    
    in_map = {val: idx for idx, val in enumerate(inorder)}
    pre_idx = 0

    def build(in_left, in_right):
        nonlocal pre_idx
        if in_left > in_right: return None
        val = preorder[pre_idx]
        pre_idx += 1
        root = TreeNode(val)
        idx = in_map[val]
        root.left = build(in_left, idx - 1)
        root.right = build(idx + 1, in_right)
        return root

    root = build(0, len(inorder) - 1)
    print(serialize(root))

solve()
`,
      javascript: `const fs = require('fs');

function TreeNode(val) { this.val = val; this.left = this.right = null; }

function serialize(root) {
    if (!root) return "";
    const res = [];
    const q = [root];
    while (q.length > 0) {
        const node = q.shift();
        if (node) {
            res.push(node.val.toString());
            q.push(node.left);
            q.push(node.right);
        } else {
            res.push("null");
        }
    }
    while (res.length > 0 && res[res.length - 1] === "null") res.pop();
    return res.join(',');
}

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const preorder = lines[0].trim().split(/\\s+/).map(Number);
    const inorder = lines[1].trim().split(/\\s+/).map(Number);

    const inMap = {};
    inorder.forEach((val, i) => inMap[val] = i);
    let preIdx = 0;

    function build(inLeft, inRight) {
        if (inLeft > inRight) return null;
        const val = preorder[preIdx++];
        const root = new TreeNode(val);
        const idx = inMap[val];
        root.left = build(inLeft, idx - 1);
        root.right = build(idx + 1, inRight);
        return root;
    }

    const root = build(0, inorder.length - 1);
    console.log(serialize(root));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def serialize(root):
    if not root: return ""
    res = []
    q = [root]
    while q:
        node = q.pop(0)
        if node:
            res.append(str(node.val))
            q.append(node.left)
            q.append(node.right)
        else:
            res.append("null")
    while res and res[-1] == "null":
        res.pop()
    return ','.join(res)

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    preorder = list(map(int, lines[0].strip().split()))
    inorder = list(map(int, lines[1].strip().split()))
    
    in_map = {val: idx for idx, val in enumerate(inorder)}
    pre_idx = 0

    def build(in_left, in_right):
        nonlocal pre_idx
        if in_left > in_right: return None
        val = preorder[pre_idx]
        pre_idx += 1
        root = TreeNode(val)
        idx = in_map[val]
        root.left = build(in_left, idx - 1)
        root.right = build(idx + 1, in_right)
        return root

    root = build(0, len(inorder) - 1)
    print(serialize(root))

solve()
`,
      javascript: `const fs = require('fs');

function TreeNode(val) { this.val = val; this.left = this.right = null; }

function serialize(root) {
    if (!root) return "";
    const res = [];
    const q = [root];
    while (q.length > 0) {
        const node = q.shift();
        if (node) {
            res.push(node.val.toString());
            q.push(node.left);
            q.push(node.right);
        } else {
            res.push("null");
        }
    }
    while (res.length > 0 && res[res.length - 1] === "null") res.pop();
    return res.join(',');
}

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const preorder = lines[0].trim().split(/\\s+/).map(Number);
    const inorder = lines[1].trim().split(/\\s+/).map(Number);

    const inMap = {};
    inorder.forEach((val, i) => inMap[val] = i);
    let preIdx = 0;

    function build(inLeft, inRight) {
        if (inLeft > inRight) return null;
        const val = preorder[preIdx++];
        const root = new TreeNode(val);
        const idx = inMap[val];
        root.left = build(inLeft, idx - 1);
        root.right = build(idx + 1, inRight);
        return root;
    }

    const root = build(0, inorder.length - 1);
    console.log(serialize(root));
}

solve();
`,
    },
    editorial: {
      approach: 'Hash Map Divide and Conquer Tree Reconstruction',
      algorithm: 'Preorder yields current root, and index in inorder splits left and right subtrees in O(n) time with hash lookup.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      content: 'Classic binary tree construction from traversal arrays.',
      referenceCode: `def build_tree(preorder, inorder):
    # build recursively with hashmap
    pass`,
    },
    tags: ['Array', 'Hash Table', 'Divide and Conquer', 'Tree', 'Binary Tree'],
    testCases: [
      { input: '3 9 20 15 7\n9 3 15 20 7', expectedOutput: '3,9,20,null,null,15,7', isHidden: false },
      { input: '-1\n-1', expectedOutput: '-1', isHidden: false },
      { input: '1 2 3\n2 1 3', expectedOutput: '1,2,3', isHidden: false },
      { input: '1 2\n2 1', expectedOutput: '1,2', isHidden: true },
    ],
  },

  // 22. Binary Tree Maximum Path Sum
  {
    title: 'Binary Tree Maximum Path Sum',
    slug: 'binary-tree-maximum-path-sum',
    description: `A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.

The **path sum** of a path is the sum of the node's values in the path.

Given the \`root\` of a binary tree, return the maximum **path sum** of any **non-empty** path.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `The number of nodes in the tree is in the range [1, 3 * 10^4].\n-1000 <= Node.val <= 1000`,
    inputFormat: `Line 1: Level-order comma-separated string for binary tree \`root\`.`,
    outputFormat: `Maximum path sum integer.`,
    sampleInput: `1,2,3`,
    sampleOutput: `6`,
    points: 300,
    hints: [
      'For any node, the maximum path through that node as turning point is node.val + max(0, left_gain) + max(0, right_gain).',
      'The single-branch gain returned to parent is node.val + max(0, max(left_gain, right_gain)).',
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
    s = sys.stdin.read().strip()
    if not s: return
    root = build_tree(s)
    max_sum = float('-inf')

    def max_gain(node):
        nonlocal max_sum
        if not node: return 0
        left_gain = max(max_gain(node.left), 0)
        right_gain = max(max_gain(node.right), 0)
        price_newpath = node.val + left_gain + right_gain
        max_sum = max(max_sum, price_newpath)
        return node.val + max(left_gain, right_gain)

    max_gain(root)
    print(max_sum)

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
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s) return;
    const root = buildTree(s);
    let maxSum = -Infinity;

    function maxGain(node) {
        if (!node) return 0;
        const leftGain = Math.max(maxGain(node.left), 0);
        const rightGain = Math.max(maxGain(node.right), 0);
        const priceNewpath = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, priceNewpath);
        return node.val + Math.max(leftGain, rightGain);
    }

    maxGain(root);
    console.log(maxSum);
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
    s = sys.stdin.read().strip()
    if not s: return
    root = build_tree(s)
    max_sum = float('-inf')

    def max_gain(node):
        nonlocal max_sum
        if not node: return 0
        left_gain = max(max_gain(node.left), 0)
        right_gain = max(max_gain(node.right), 0)
        price_newpath = node.val + left_gain + right_gain
        max_sum = max(max_sum, price_newpath)
        return node.val + max(left_gain, right_gain)

    max_gain(root)
    print(max_sum)

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
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s) return;
    const root = buildTree(s);
    let maxSum = -Infinity;

    function maxGain(node) {
        if (!node) return 0;
        const leftGain = Math.max(maxGain(node.left), 0);
        const rightGain = Math.max(maxGain(node.right), 0);
        const priceNewpath = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, priceNewpath);
        return node.val + Math.max(leftGain, rightGain);
    }

    maxGain(root);
    console.log(maxSum);
}

solve();
`,
    },
    editorial: {
      approach: 'Post-Order Tree Dynamic Programming',
      algorithm: 'At each node, compute maximum single-branch contribution to parent and update global arch path sum max.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      content: 'Classic dynamic programming on trees with global accumulator.',
      referenceCode: `def max_path_sum(root):
    # post-order gain calculation
    pass`,
    },
    tags: ['Dynamic Programming', 'Tree', 'Depth-First Search', 'Binary Tree'],
    testCases: [
      { input: '1,2,3', expectedOutput: '6', isHidden: false },
      { input: '-10,9,20,null,null,15,7', expectedOutput: '42', isHidden: false },
      { input: '-3', expectedOutput: '-3', isHidden: false },
      { input: '2,-1', expectedOutput: '2', isHidden: true },
    ],
  },

  // 23. Course Schedule II
  {
    title: 'Course Schedule II',
    slug: 'course-schedule-ii',
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [ai, bi]\` indicates that you must take course \`bi\` first if you want to take course \`ai\`.

Return the ordering of courses you should take to finish all courses. If there are many valid answers, return **any of them**. If it is impossible to finish all courses, return an empty array.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= numCourses <= 2000\n0 <= prerequisites.length <= numCourses * (numCourses - 1)\nprerequisites[i].length == 2\n0 <= ai, bi < numCourses\nai != bi\nAll pairs [ai, bi] are distinct.`,
    inputFormat: `Line 1: Two integers \`numCourses m\` (number of prerequisite pairs).\nNext \`m\` lines: Two integers \`a b\` meaning \`b\` is prerequisite for \`a\`.`,
    outputFormat: `Space-separated topological course ordering or empty line if cycle exists.`,
    sampleInput: `2 1\n1 0`,
    sampleOutput: `0 1`,
    points: 150,
    hints: [
      'Use Kahn algorithm (BFS topological sort) tracking in-degrees.',
      'If length of result array equals numCourses, ordering is valid.',
    ],
    codeTemplates: {
      python: `import sys
from collections import deque

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    m = int(tokens[1])
    adj = [[] for _ in range(n)]
    in_deg = [0] * n
    idx = 2
    for _ in range(m):
        a = int(tokens[idx])
        b = int(tokens[idx+1])
        adj[b].append(a)
        in_deg[a] += 1
        idx += 2

    q = deque([i for i in range(n) if in_deg[i] == 0])
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:
            in_deg[v] -= 1
            if in_deg[v] == 0:
                q.append(v)

    if len(order) == n:
        print(' '.join(map(str, order)))
    else:
        print("")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const n = parseInt(tokens[0], 10);
    const m = parseInt(tokens[1], 10);
    const adj = Array.from({ length: n }, () => []);
    const inDeg = new Array(n).fill(0);
    let idx = 2;
    for (let i = 0; i < m; i++) {
        const a = parseInt(tokens[idx++], 10);
        const b = parseInt(tokens[idx++], 10);
        adj[b].push(a);
        inDeg[a]++;
    }

    const q = [];
    for (let i = 0; i < n; i++) if (inDeg[i] === 0) q.push(i);
    const order = [];
    while (q.length > 0) {
        const u = q.shift();
        order.push(u);
        for (const v of adj[u]) {
            inDeg[v]--;
            if (inDeg[v] === 0) q.push(v);
        }
    }

    console.log(order.length === n ? order.join(' ') : "");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
from collections import deque

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    m = int(tokens[1])
    adj = [[] for _ in range(n)]
    in_deg = [0] * n
    idx = 2
    for _ in range(m):
        a = int(tokens[idx])
        b = int(tokens[idx+1])
        adj[b].append(a)
        in_deg[a] += 1
        idx += 2

    q = deque([i for i in range(n) if in_deg[i] == 0])
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:
            in_deg[v] -= 1
            if in_deg[v] == 0:
                q.append(v)

    if len(order) == n:
        print(' '.join(map(str, order)))
    else:
        print("")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const n = parseInt(tokens[0], 10);
    const m = parseInt(tokens[1], 10);
    const adj = Array.from({ length: n }, () => []);
    const inDeg = new Array(n).fill(0);
    let idx = 2;
    for (let i = 0; i < m; i++) {
        const a = parseInt(tokens[idx++], 10);
        const b = parseInt(tokens[idx++], 10);
        adj[b].push(a);
        inDeg[a]++;
    }

    const q = [];
    for (let i = 0; i < n; i++) if (inDeg[i] === 0) q.push(i);
    const order = [];
    while (q.length > 0) {
        const u = q.shift();
        order.push(u);
        for (const v of adj[u]) {
            inDeg[v]--;
            if (inDeg[v] === 0) q.push(v);
        }
    }

    console.log(order.length === n ? order.join(' ') : "");
}

solve();
`,
    },
    editorial: {
      approach: 'Kahn Algorithm for Topological Sorting',
      algorithm: 'Enqueue nodes with 0 in-degree and decrement neighbor in-degrees upon removal.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      content: 'Standard DAG topological ordering.',
      referenceCode: `def find_order(numCourses, prerequisites):
    # Kahn BFS
    pass`,
    },
    tags: ['Depth-First Search', 'Breadth-First Search', 'Graph', 'Topological Sort'],
    testCases: [
      { input: '2 1\n1 0', expectedOutput: '0 1', isHidden: false },
      { input: '4 4\n1 0\n2 0\n3 1\n3 2', expectedOutput: '0 1 2 3', isHidden: false },
      { input: '1 0', expectedOutput: '0', isHidden: false },
      { input: '2 2\n1 0\n0 1', expectedOutput: '', isHidden: true },
    ],
  },

  // 24. Graph Valid Tree
  {
    title: 'Graph Valid Tree',
    slug: 'graph-valid-tree',
    description: `You have a graph of \`n\` nodes labeled from \`0\` to \`n - 1\`. You are given an integer \`n\` and a list of \`edges\` where \`edges[i] = [ai, bi]\` indicates that there is an undirected edge between nodes \`ai\` and \`bi\` in the graph.

Return \`true\` if the edges of the given graph make up a **valid tree**, and \`false\` otherwise.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= n <= 2000\n0 <= edges.length <= 5000\nedges[i].length == 2\n0 <= ai, bi < n\nai != bi\nThere are no self-loops or repeated edges.`,
    inputFormat: `Line 1: Two integers \`n m\` (number of nodes and edges).\nNext \`m\` lines: Two integers \`u v\` representing an edge.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `5 4\n0 1\n0 2\n0 3\n1 4`,
    sampleOutput: `true`,
    points: 150,
    hints: [
      'A valid tree on n nodes must have exactly n - 1 edges and be fully connected with no cycles.',
      'Check if m == n - 1 and verify connectivity with Union-Find or BFS.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    m = int(tokens[1])
    if m != n - 1:
        print("false")
        return
    parent = list(range(n))
    def find(i):
        if parent[i] == i: return i
        parent[i] = find(parent[i])
        return parent[i]

    idx = 2
    for _ in range(m):
        u = int(tokens[idx])
        v = int(tokens[idx+1])
        idx += 2
        ru, rv = find(u), find(v)
        if ru == rv:
            print("false")
            return
        parent[ru] = rv

    print("true")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const n = parseInt(tokens[0], 10);
    const m = parseInt(tokens[1], 10);
    if (m !== n - 1) { console.log("false"); return; }

    const parent = Array.from({ length: n }, (_, i) => i);
    function find(i) {
        if (parent[i] === i) return i;
        return parent[i] = find(parent[i]);
    }

    let idx = 2;
    for (let i = 0; i < m; i++) {
        const u = parseInt(tokens[idx++], 10);
        const v = parseInt(tokens[idx++], 10);
        const ru = find(u), rv = find(v);
        if (ru === rv) {
            console.log("false");
            return;
        }
        parent[ru] = rv;
    }

    console.log("true");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    m = int(tokens[1])
    if m != n - 1:
        print("false")
        return
    parent = list(range(n))
    def find(i):
        if parent[i] == i: return i
        parent[i] = find(parent[i])
        return parent[i]

    idx = 2
    for _ in range(m):
        u = int(tokens[idx])
        v = int(tokens[idx+1])
        idx += 2
        ru, rv = find(u), find(v)
        if ru == rv:
            print("false")
            return
        parent[ru] = rv

    print("true")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const n = parseInt(tokens[0], 10);
    const m = parseInt(tokens[1], 10);
    if (m !== n - 1) { console.log("false"); return; }

    const parent = Array.from({ length: n }, (_, i) => i);
    function find(i) {
        if (parent[i] === i) return i;
        return parent[i] = find(parent[i]);
    }

    let idx = 2;
    for (let i = 0; i < m; i++) {
        const u = parseInt(tokens[idx++], 10);
        const v = parseInt(tokens[idx++], 10);
        const ru = find(u), rv = find(v);
        if (ru === rv) {
            console.log("false");
            return;
        }
        parent[ru] = rv;
    }

    console.log("true");
}

solve();
`,
    },
    editorial: {
      approach: 'Disjoint Set Union (DSU) Cycle and Component Check',
      algorithm: 'A valid undirected tree of n nodes requires exactly n - 1 edges and 0 cycles.',
      timeComplexity: 'O(n * alpha(n))',
      spaceComplexity: 'O(n)',
      content: 'Fundamental graph theory theorem for tree validation.',
      referenceCode: `def valid_tree(n, edges):
    if len(edges) != n - 1: return False
    # Union-find cycle detection
    pass`,
    },
    tags: ['Depth-First Search', 'Breadth-First Search', 'Union Find', 'Graph'],
    testCases: [
      { input: '5 4\n0 1\n0 2\n0 3\n1 4', expectedOutput: 'true', isHidden: false },
      { input: '5 5\n0 1\n1 2\n2 3\n1 3\n1 4', expectedOutput: 'false', isHidden: false },
      { input: '1 0', expectedOutput: 'true', isHidden: false },
      { input: '4 2\n0 1\n2 3', expectedOutput: 'false', isHidden: true },
    ],
  },

  // 25. Number of Connected Components in an Undirected Graph
  {
    title: 'Number of Connected Components in an Undirected Graph',
    slug: 'number-of-connected-components-in-an-undirected-graph',
    description: `You have a graph of \`n\` nodes. You are given an integer \`n\` and an array \`edges\` where \`edges[i] = [ai, bi]\` indicates that there is an undirected edge between \`ai\` and \`bi\` in the graph.

Return the number of **connected components** in the graph.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= n <= 2000\n0 <= edges.length <= 5000\nedges[i].length == 2\n0 <= ai, bi < n\nai != bi\nThere are no repeated edges.`,
    inputFormat: `Line 1: Two integers \`n m\` (number of nodes and edges).\nNext \`m\` lines: Two integers \`u v\` representing an edge.`,
    outputFormat: `Number of connected components.`,
    sampleInput: `5 4\n0 1\n1 2\n3 4\n0 2`,
    sampleOutput: `2`,
    points: 150,
    hints: [
      'Initialize component count to n.',
      'For each edge, union the endpoints and decrement component count if they belonged to different sets.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    m = int(tokens[1])
    parent = list(range(n))
    components = n

    def find(i):
        if parent[i] == i: return i
        parent[i] = find(parent[i])
        return parent[i]

    idx = 2
    for _ in range(m):
        u = int(tokens[idx])
        v = int(tokens[idx+1])
        idx += 2
        ru, rv = find(u), find(v)
        if ru != rv:
            parent[ru] = rv
            components -= 1

    print(components)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const n = parseInt(tokens[0], 10);
    const m = parseInt(tokens[1], 10);
    const parent = Array.from({ length: n }, (_, i) => i);
    let components = n;

    function find(i) {
        if (parent[i] === i) return i;
        return parent[i] = find(parent[i]);
    }

    let idx = 2;
    for (let i = 0; i < m; i++) {
        const u = parseInt(tokens[idx++], 10);
        const v = parseInt(tokens[idx++], 10);
        const ru = find(u), rv = find(v);
        if (ru !== rv) {
            parent[ru] = rv;
            components--;
        }
    }

    console.log(components);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    m = int(tokens[1])
    parent = list(range(n))
    components = n

    def find(i):
        if parent[i] == i: return i
        parent[i] = find(parent[i])
        return parent[i]

    idx = 2
    for _ in range(m):
        u = int(tokens[idx])
        v = int(tokens[idx+1])
        idx += 2
        ru, rv = find(u), find(v)
        if ru != rv:
            parent[ru] = rv
            components -= 1

    print(components)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const n = parseInt(tokens[0], 10);
    const m = parseInt(tokens[1], 10);
    const parent = Array.from({ length: n }, (_, i) => i);
    let components = n;

    function find(i) {
        if (parent[i] === i) return i;
        return parent[i] = find(parent[i]);
    }

    let idx = 2;
    for (let i = 0; i < m; i++) {
        const u = parseInt(tokens[idx++], 10);
        const v = parseInt(tokens[idx++], 10);
        const ru = find(u), rv = find(v);
        if (ru !== rv) {
            parent[ru] = rv;
            components--;
        }
    }

    console.log(components);
}

solve();
`,
    },
    editorial: {
      approach: 'Disjoint Set Union (DSU) Component Merging',
      algorithm: 'Start with n independent components. Each successful union of distinct subsets reduces total components by 1.',
      timeComplexity: 'O(n + m * alpha(n))',
      spaceComplexity: 'O(n)',
      content: 'Classic union-find connected components counting.',
      referenceCode: `def count_components(n, edges):
    # DSU component decrement
    pass`,
    },
    tags: ['Depth-First Search', 'Breadth-First Search', 'Union Find', 'Graph'],
    testCases: [
      { input: '5 4\n0 1\n1 2\n3 4\n0 2', expectedOutput: '2', isHidden: false },
      { input: '5 4\n0 1\n1 2\n2 3\n3 4', expectedOutput: '1', isHidden: false },
      { input: '3 0', expectedOutput: '3', isHidden: false },
      { input: '4 2\n0 1\n2 3', expectedOutput: '2', isHidden: true },
    ],
  },
];
