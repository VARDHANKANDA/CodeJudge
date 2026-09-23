import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack250ExtEDefs: ProblemDef[] = [
  // 1. House Robber III (Tree DP)
  {
    title: 'House Robber III',
    slug: 'house-robber-iii',
    description: `The thief has found himself a new place for his thievery again. There is only one entrance to this area, called \`root\`.
Besides the \`root\`, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if **two directly-linked houses were broken into on the same night**.
Given the \`root\` of the binary tree, return the maximum amount of money the thief can rob without alerting the police.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= Number of nodes <= 10^4\n0 <= Node.val <= 10^4`,
    inputFormat: `Level-order serialized binary tree values.`,
    outputFormat: `An integer representing maximum money robbed.`,
    sampleInput: `3,2,3,null,3,null,1`,
    sampleOutput: `7`,
    points: 150,
    hints: [
      'Each tree node returns a pair: (rob_this_node, not_rob_this_node).',
      'rob_u = u.val + not_rob_left + not_rob_right.',
      'not_rob_u = max(rob_left, not_rob_left) + max(rob_right, not_rob_right).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read().strip().replace(',', ' ').split()
    if not raw or raw[0] == 'null':
        print(0)
        return
    nodes = [int(x) if x != 'null' else None for x in raw]
    n = len(nodes)
    
    def dfs(idx):
        if idx >= n or nodes[idx] is None:
            return (0, 0)
        rob_l, not_l = dfs(2 * idx + 1)
        rob_r, not_r = dfs(2 * idx + 2)
        
        rob_curr = nodes[idx] + not_l + not_r
        not_curr = max(rob_l, not_l) + max(rob_r, not_r)
        return (rob_curr, not_curr)
        
    rob_root, not_root = dfs(0)
    print(max(rob_root, not_root))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
    if (!raw || raw[0] === '' || raw[0] === 'null') { console.log(0); return; }
    const nodes = raw.map(x => x === 'null' ? null : parseInt(x, 10));
    const n = nodes.length;
    
    function dfs(idx) {
        if (idx >= n || nodes[idx] === null) return [0, 0];
        const [robL, notL] = dfs(2 * idx + 1);
        const [robR, notR] = dfs(2 * idx + 2);
        
        const robCurr = nodes[idx] + notL + notR;
        const notCurr = Math.max(robL, notL) + Math.max(robR, notR);
        return [robCurr, notCurr];
    }
    
    const [r, nr] = dfs(0);
    console.log(Math.max(r, nr));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
raw = sys.stdin.read().strip().replace(',', ' ').split()
if not raw or raw[0] == 'null':
    print(0)
else:
    nodes = [int(x) if x != 'null' else None for x in raw]
    n = len(nodes)
    def dfs(idx):
        if idx >= n or nodes[idx] is None: return (0, 0)
        rl, nl = dfs(2 * idx + 1)
        rr, nr = dfs(2 * idx + 2)
        return (nodes[idx] + nl + nr, max(rl, nl) + max(rr, nr))
    r, nr = dfs(0)
    print(max(r, nr))
`,
      javascript: `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
if (!raw || raw[0] === '' || raw[0] === 'null') console.log(0);
else {
    const nodes = raw.map(x => x === 'null' ? null : parseInt(x, 10));
    const n = nodes.length;
    function dfs(idx) {
        if (idx >= n || nodes[idx] === null) return [0, 0];
        const [rl, nl] = dfs(2 * idx + 1);
        const [rr, nr] = dfs(2 * idx + 2);
        return [nodes[idx] + nl + nr, Math.max(rl, nl) + Math.max(rr, nr)];
    }
    const [r, nr] = dfs(0);
    console.log(Math.max(r, nr));
}
`,
    },
    editorial: {
      approach: 'Tree Dynamic Programming returning State Tuple.',
      algorithm: '1. Recurse post-order on tree.\n2. Return (rob_u, not_rob_u) pair at each node.\n3. Compute root maximum.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      content: 'Independent set weighting on tree structures solved in linear time.',
      referenceCode: `def dfs(u):\n    rl, nl = dfs(u.left); rr, nr = dfs(u.right)\n    return (u.val + nl + nr, max(rl, nl) + max(rr, nr))`,
    },
    tags: ['Tree', 'Dynamic Programming', 'Depth-First Search', 'Binary Tree'],
    testCases: [
      { input: `3,2,3,null,3,null,1`, expectedOutput: `7`, isHidden: false, order: 0 },
      { input: `3,4,5,1,3,null,1`, expectedOutput: `9`, isHidden: false, order: 1 },
      { input: `1`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },

  // 2. Shortest Palindrome (Hard - KMP)
  {
    title: 'Shortest Palindrome',
    slug: 'shortest-palindrome',
    description: `You are given a string \`s\`. You can convert \`s\` to a palindrome by adding characters in front of it.
Return the **shortest palindrome** you can find by performing this transformation.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= s.length <= 5 * 10^4\ns consists of lowercase English letters only.`,
    inputFormat: `A single string s on line 1 (or empty).`,
    outputFormat: `The shortest palindrome string.`,
    sampleInput: `aacecaaa`,
    sampleOutput: `aaacecaaa`,
    points: 200,
    hints: [
      'Find the longest palindromic prefix of s.',
      'Construct pattern: s + "#" + rev(s) and compute KMP LPS array.',
      'The last value in LPS gives the length of the longest palindromic prefix.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    s = sys.stdin.read().strip()
    if not s:
        print("")
        return
        
    rev_s = s[::-1]
    combined = s + '#' + rev_s
    n = len(combined)
    lps = [0] * n
    length = 0
    i = 1
    while i < n:
        if combined[i] == combined[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
                
    pal_len = lps[-1]
    add_part = rev_s[:len(s) - pal_len]
    print(add_part + s)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s) { console.log(""); return; }
    
    const revS = s.split('').reverse().join('');
    const combined = s + '#' + revS;
    const n = combined.length;
    const lps = new Int32Array(n);
    let len = 0;
    let i = 1;
    while (i < n) {
        if (combined[i] === combined[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) len = lps[len - 1];
            else { lps[i] = 0; i++; }
        }
    }
    
    const palLen = lps[n - 1];
    const addPart = revS.slice(0, s.length - palLen);
    console.log(addPart + s);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
s = sys.stdin.read().strip()
if not s:
    print("")
else:
    rev_s = s[::-1]
    comb = s + '#' + rev_s
    n = len(comb)
    lps = [0] * n
    length = 0
    i = 1
    while i < n:
        if comb[i] == comb[length]:
            length += 1; lps[i] = length; i += 1
        else:
            if length != 0: length = lps[length - 1]
            else: lps[i] = 0; i += 1
    pal_len = lps[-1]
    print(rev_s[:len(s) - pal_len] + s)
`,
      javascript: `const fs = require('fs');
const s = fs.readFileSync(0, 'utf-8').trim();
if (!s) console.log("");
else {
    const revS = s.split('').reverse().join('');
    const comb = s + '#' + revS;
    const n = comb.length;
    const lps = new Int32Array(n);
    let len = 0, i = 1;
    while (i < n) {
        if (comb[i] === comb[len]) { len++; lps[i] = len; i++; }
        else { if (len !== 0) len = lps[len - 1]; else { lps[i] = 0; i++; } }
    }
    const palLen = lps[n - 1];
    console.log(revS.slice(0, s.length - palLen) + s);
}
`,
    },
    editorial: {
      approach: 'KMP Longest Prefix Suffix (LPS) on Concatenated String.',
      algorithm: '1. Build string s + "#" + reverse(s).\n2. Compute LPS array using standard KMP pre-processing.\n3. The last entry lps[-1] gives length of longest palindromic prefix of s.\n4. Prepend reverse(s[pal_len:]) to s.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'KMP LPS calculation identifies the longest palindromic prefix in linear time.',
      referenceCode: `lps = compute_lps(s + '#' + s[::-1])\npal_len = lps[-1]\nreturn s[pal_len:][::-1] + s`,
    },
    tags: ['String', 'KMP', 'String Matching'],
    testCases: [
      { input: `aacecaaa`, expectedOutput: `aaacecaaa`, isHidden: false, order: 0 },
      { input: `abcd`, expectedOutput: `dcbabcd`, isHidden: false, order: 1 },
      { input: `a`, expectedOutput: `a`, isHidden: true, order: 2 },
      { input: `racecar`, expectedOutput: `racecar`, isHidden: true, order: 3 },
    ],
  },

  // 3. Unique Binary Search Trees (Catalan Numbers)
  {
    title: 'Unique Binary Search Trees',
    slug: 'unique-binary-search-trees',
    description: `Given an integer \`n\`, return the number of structurally unique **Binary Search Trees (BST)** which have exactly \`n\` nodes of unique values from \`1\` to \`n\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 19`,
    inputFormat: `An integer n.`,
    outputFormat: `An integer representing the count of unique BSTs (Catalan number C_n).`,
    sampleInput: `3`,
    sampleOutput: `5`,
    points: 150,
    hints: [
      'For root node i (1 <= i <= n), left subtree has i-1 nodes and right subtree has n-i nodes.',
      'G(n) = sum_{i=1}^n G(i-1) * G(n-i), which is the n-th Catalan number.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read().strip()
    if not raw:
        return
    n = int(raw)
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1
    for i in range(2, n + 1):
        for j in range(1, i + 1):
            dp[i] += dp[j - 1] * dp[i - j]
    print(dp[n])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (!raw) return;
    const n = parseInt(raw, 10);
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            dp[i] += dp[j - 1] * dp[i - j];
        }
    }
    console.log(dp[n]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
raw = sys.stdin.read().strip()
if raw:
    n = int(raw)
    dp = [0] * (n + 1)
    dp[0] = dp[1] = 1
    for i in range(2, n + 1):
        for j in range(1, i + 1):
            dp[i] += dp[j - 1] * dp[i - j]
    print(dp[n])
`,
      javascript: `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim();
if (raw) {
    const n = parseInt(raw, 10);
    const dp = new Array(n + 1).fill(0);
    dp[0] = dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) dp[i] += dp[j - 1] * dp[i - j];
    }
    console.log(dp[n]);
}
`,
    },
    editorial: {
      approach: 'Catalan Number Dynamic Programming Recurrence.',
      algorithm: '1. Set base cases dp[0] = 1, dp[1] = 1.\n2. For each length i from 2 to n, sum over all root choices j from 1 to i: dp[j-1] * dp[i-j].\n3. Output dp[n].',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N)',
      content: 'Counts structurally distinct BST topologies according to the Catalan sequence.',
      referenceCode: `for i in range(2, n + 1):\n    dp[i] = sum(dp[j-1] * dp[i-j] for j in range(1, i + 1))`,
    },
    tags: ['Dynamic Programming', 'Math', 'Tree', 'Binary Search Tree'],
    testCases: [
      { input: `3`, expectedOutput: `5`, isHidden: false, order: 0 },
      { input: `1`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `4`, expectedOutput: `14`, isHidden: true, order: 2 },
      { input: `5`, expectedOutput: `42`, isHidden: true, order: 3 },
    ],
  },

  // 4. Convex Hull (Graham Scan - Hard)
  {
    title: 'Convex Hull',
    slug: 'convex-hull-graham-scan',
    description: `Given a set of \`n\` 2D points, find all the points that define the perimeter of the **Convex Hull** in clockwise or counter-clockwise order using the Graham Scan algorithm.
Output the perimeter vertices in counter-clockwise order sorted by x-coordinate then y-coordinate. All collinear perimeter points should be included.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= n <= 1000\n-100 <= x, y <= 100`,
    inputFormat: `Line 1: n\nNext n lines: x y`,
    outputFormat: `Sorted counter-clockwise boundary points, one per line: x y`,
    sampleInput: `6\n1 1\n2 2\n2 0\n2 4\n3 3\n4 2`,
    sampleOutput: `1 1\n2 0\n2 4\n3 3\n4 2`,
    points: 200,
    hints: [
      'Use 2D cross product: cross(o, a, b) = (a.x - o.x)*(b.y - o.y) - (a.y - o.y)*(b.x - o.x).',
      'Construct lower hull and upper hull by popping points that make right turns.',
    ],
    codeTemplates: {
      python: `import sys

def cross(o, a, b):
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    pts = []
    idx = 1
    for _ in range(n):
        pts.append((int(data[idx]), int(data[idx+1])))
        idx += 2
        
    pts = sorted(set(pts))
    if len(pts) <= 2:
        for x, y in pts:
            print(f"{x} {y}")
        return
        
    # Build lower hull
    lower = []
    for p in pts:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) < 0:
            lower.pop()
        lower.append(p)
        
    # Build upper hull
    upper = []
    for p in reversed(pts):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) < 0:
            upper.pop()
        upper.append(p)
        
    hull = sorted(set(lower[:-1] + upper[:-1]))
    for x, y in hull:
        print(f"{x} {y}")

solve()
`,
      javascript: `const fs = require('fs');

function cross(o, a, b) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!data || data.length < 1) return;
    const n = parseInt(data[0], 10);
    const ptsMap = new Map();
    let idx = 1;
    for (let i = 0; i < n; i++) {
        const x = parseInt(data[idx++], 10);
        const y = parseInt(data[idx++], 10);
        ptsMap.set(\`\${x},\${y}\`, [x, y]);
    }
    
    const pts = Array.from(ptsMap.values()).sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
    if (pts.length <= 2) {
        for (const [x, y] of pts) console.log(\`\${x} \${y}\`);
        return;
    }
    
    const lower = [];
    for (const p of pts) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) < 0) {
            lower.pop();
        }
        lower.push(p);
    }
    
    const upper = [];
    for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) < 0) {
            upper.pop();
        }
        upper.push(p);
    }
    
    const hullMap = new Map();
    for (const p of lower.slice(0, -1).concat(upper.slice(0, -1))) {
        hullMap.set(\`\${p[0]},\${p[1]}\`, p);
    }
    const hull = Array.from(hullMap.values()).sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
    for (const [x, y] of hull) {
        console.log(\`\${x} \${y}\`);
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
def cross(o, a, b):
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

def solve():
    data = sys.stdin.read().split()
    if data:
        n = int(data[0])
        pts = []
        idx = 1
        for _ in range(n):
            pts.append((int(data[idx]), int(data[idx+1])))
            idx += 2
        pts = sorted(set(pts))
        if len(pts) <= 2:
            for x, y in pts: print(f"{x} {y}")
            return
        lower = []
        for p in pts:
            while len(lower) >= 2 and cross(lower[-2], lower[-1], p) < 0: lower.pop()
            lower.append(p)
        upper = []
        for p in reversed(pts):
            while len(upper) >= 2 and cross(upper[-2], upper[-1], p) < 0: upper.pop()
            upper.append(p)
        hull = sorted(set(lower[:-1] + upper[:-1]))
        for x, y in hull: print(f"{x} {y}")

solve()
`,
      javascript: `const fs = require('fs');
function cross(o, a, b) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}
function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (data && data.length >= 1) {
        const n = parseInt(data[0], 10);
        const ptsMap = new Map();
        let idx = 1;
        for (let i = 0; i < n; i++) {
            const x = parseInt(data[idx++], 10), y = parseInt(data[idx++], 10);
            ptsMap.set(\`\${x},\${y}\`, [x, y]);
        }
        const pts = Array.from(ptsMap.values()).sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
        if (pts.length <= 2) {
            for (const [x, y] of pts) console.log(\`\${x} \${y}\`);
            return;
        }
        const lower = [];
        for (const p of pts) {
            while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) < 0) lower.pop();
            lower.push(p);
        }
        const upper = [];
        for (let i = pts.length - 1; i >= 0; i--) {
            const p = pts[i];
            while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) < 0) upper.pop();
            upper.push(p);
        }
        const hullMap = new Map();
        for (const p of lower.slice(0, -1).concat(upper.slice(0, -1))) hullMap.set(\`\${p[0]},\${p[1]}\`, p);
        const hull = Array.from(hullMap.values()).sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
        for (const [x, y] of hull) console.log(\`\${x} \${y}\`);
    }
}
solve();
`,
    },
    editorial: {
      approach: "Monotone Chain / Graham Scan Algorithm.",
      algorithm: '1. Sort points lexicographically by (x, y).\n2. Construct lower hull by strictly maintaining counter-clockwise turns using 2D cross product.\n3. Construct upper hull in reverse order.\n4. Output sorted perimeter vertices.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      content: 'Standard Andrew Monotone Chain convex hull algorithm in computational geometry.',
      referenceCode: `while len(lower) >= 2 and cross(lower[-2], lower[-1], p) < 0: lower.pop()`,
    },
    tags: ['Geometry', 'Math', 'Array'],
    testCases: [
      { input: `6\n1 1\n2 2\n2 0\n2 4\n3 3\n4 2`, expectedOutput: `1 1\n2 0\n2 4\n3 3\n4 2`, isHidden: false, order: 0 },
      { input: `3\n1 2\n2 2\n4 2`, expectedOutput: `1 2\n2 2\n4 2`, isHidden: false, order: 1 },
      { input: `1\n0 0`, expectedOutput: `0 0`, isHidden: true, order: 2 },
    ],
  },
];
