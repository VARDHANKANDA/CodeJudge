import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack250ExtCDefs: ProblemDef[] = [
  // 1. Count of Smaller Numbers After Self (Hard)
  {
    title: 'Count of Smaller Numbers After Self',
    slug: 'count-of-smaller-numbers-after-self',
    description: `Given an integer array \`nums\`, return an integer array \`counts\` where \`counts[i]\` is the number of smaller elements to the right of \`nums[i]\`.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4`,
    inputFormat: `Comma or space separated integers on a single line.`,
    outputFormat: `Comma-separated list of counts.`,
    sampleInput: `5,2,6,1`,
    sampleOutput: `2,1,1,0`,
    points: 200,
    hints: [
      'Coordinate compress the elements or offset negative numbers by +10001.',
      'Iterate backwards from right to left while updating a Fenwick Tree (Binary Indexed Tree).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read().strip().replace(',', ' ').split()
    if not raw:
        print("")
        return
    nums = [int(x) for x in raw]
    n = len(nums)
    if n == 0:
        print("")
        return
        
    OFFSET = 10001
    MAX_VAL = 20005
    bit = [0] * (MAX_VAL + 1)
    
    def update(idx):
        while idx <= MAX_VAL:
            bit[idx] += 1
            idx += idx & (-idx)
            
    def query(idx):
        s = 0
        while idx > 0:
            s += bit[idx]
            idx -= idx & (-idx)
        return s
        
    res = [0] * n
    for i in range(n - 1, -1, -1):
        val = nums[i] + OFFSET
        res[i] = query(val - 1)
        update(val)
        
    print(",".join(str(x) for x in res))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
    if (!raw || raw[0] === '') { console.log(""); return; }
    const nums = raw.map(x => parseInt(x, 10));
    const n = nums.length;
    
    const OFFSET = 10001;
    const MAX_VAL = 20005;
    const bit = new Int32Array(MAX_VAL + 1);
    
    function update(idx) {
        for (; idx <= MAX_VAL; idx += idx & -idx) {
            bit[idx]++;
        }
    }
    
    function query(idx) {
        let s = 0;
        for (; idx > 0; idx -= idx & -idx) {
            s += bit[idx];
        }
        return s;
    }
    
    const res = new Int32Array(n);
    for (let i = n - 1; i >= 0; i--) {
        const val = nums[i] + OFFSET;
        res[i] = query(val - 1);
        update(val);
    }
    
    console.log(Array.from(res).join(","));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
raw = sys.stdin.read().strip().replace(',', ' ').split()
if raw:
    nums = [int(x) for x in raw]
    n = len(nums)
    OFFSET = 10001
    MAX_VAL = 20005
    bit = [0] * (MAX_VAL + 1)
    def update(idx):
        while idx <= MAX_VAL:
            bit[idx] += 1
            idx += idx & (-idx)
    def query(idx):
        s = 0
        while idx > 0:
            s += bit[idx]
            idx -= idx & (-idx)
        return s
    res = [0] * n
    for i in range(n - 1, -1, -1):
        val = nums[i] + OFFSET
        res[i] = query(val - 1)
        update(val)
    print(",".join(str(x) for x in res))
else:
    print("")
`,
      javascript: `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
if (raw && raw[0] !== '') {
    const nums = raw.map(x => parseInt(x, 10));
    const n = nums.length;
    const OFFSET = 10001;
    const MAX_VAL = 20005;
    const bit = new Int32Array(MAX_VAL + 1);
    function update(idx) { for (; idx <= MAX_VAL; idx += idx & -idx) bit[idx]++; }
    function query(idx) {
        let s = 0;
        for (; idx > 0; idx -= idx & -idx) s += bit[idx];
        return s;
    }
    const res = new Int32Array(n);
    for (let i = n - 1; i >= 0; i--) {
        const val = nums[i] + OFFSET;
        res[i] = query(val - 1);
        update(val);
    }
    console.log(Array.from(res).join(","));
} else { console.log(""); }
`,
    },
    editorial: {
      approach: 'Fenwick Tree (Binary Indexed Tree) with Right-to-Left Scanning.',
      algorithm: '1. Map array elements into positive range [1, 20000] using offset.\n2. Traverse backwards from right to left.\n3. Query prefix sum up to value-1 in Fenwick tree.\n4. Insert current value into Fenwick tree.',
      timeComplexity: 'O(N log(Range))',
      spaceComplexity: 'O(Range)',
      content: 'Fenwick tree enables dynamic rank frequency updates and queries in logarithmic time per element.',
      referenceCode: `for x in reversed(nums):\n    res.append(query(x - 1))\n    update(x)`,
    },
    tags: ['Binary Indexed Tree', 'Segment Tree', 'Divide and Conquer', 'Array'],
    testCases: [
      { input: `5,2,6,1`, expectedOutput: `2,1,1,0`, isHidden: false, order: 0 },
      { input: `-1`, expectedOutput: `0`, isHidden: false, order: 1 },
      { input: `-1,-1`, expectedOutput: `0,0`, isHidden: true, order: 2 },
      { input: `1,2,3,4`, expectedOutput: `0,0,0,0`, isHidden: true, order: 3 },
      { input: `4,3,2,1`, expectedOutput: `3,2,1,0`, isHidden: true, order: 4 },
    ],
  },

  // 2. Segment Tree Range Update with Lazy Propagation (Hard)
  {
    title: 'Segment Tree with Lazy Propagation',
    slug: 'segment-tree-lazy-propagation',
    description: `Implement a Segment Tree supporting range addition updates and range sum queries on an array of \`N\` integers.
Queries are of two types:
- \`1 L R V\`: Add \`V\` to all elements in range \`[L, R]\` (0-indexed inclusive).
- \`2 L R\`: Query the sum of elements in range \`[L, R]\`.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= N, Q <= 10^5\n0 <= L <= R < N\n-10^5 <= V <= 10^5`,
    inputFormat: `Line 1: N and Q\nLine 2: N space-separated initial values\nNext Q lines: queries of type 1 or 2`,
    outputFormat: `One line per type 2 query representing the range sum.`,
    sampleInput: `5 4\n1 2 3 4 5\n2 0 4\n1 1 3 10\n2 0 4\n2 1 2`,
    sampleOutput: `15\n45\n25`,
    points: 200,
    hints: [
      'Maintain a tree array for sum and a lazy array for deferred updates.',
      'Push pending lazy additions down to children before recursing into intervals.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n, q = int(input_data[0]), int(input_data[1])
    nums = [int(x) for x in input_data[2:2+n]]
    
    tree = [0] * (4 * n)
    lazy = [0] * (4 * n)
    
    def build(node, l, r):
        if l == r:
            tree[node] = nums[l]
            return
        mid = (l + r) // 2
        build(2 * node, l, mid)
        build(2 * node + 1, mid + 1, r)
        tree[node] = tree[2 * node] + tree[2 * node + 1]
        
    def push(node, l, r):
        if lazy[node] != 0:
            mid = (l + r) // 2
            val = lazy[node]
            tree[2 * node] += val * (mid - l + 1)
            lazy[2 * node] += val
            tree[2 * node + 1] += val * (r - mid)
            lazy[2 * node + 1] += val
            lazy[node] = 0
            
    def update_range(node, l, r, ql, qr, val):
        if ql <= l and r <= qr:
            tree[node] += val * (r - l + 1)
            lazy[node] += val
            return
        push(node, l, r)
        mid = (l + r) // 2
        if ql <= mid:
            update_range(2 * node, l, mid, ql, qr, val)
        if qr > mid:
            update_range(2 * node + 1, mid + 1, r, ql, qr, val)
        tree[node] = tree[2 * node] + tree[2 * node + 1]
        
    def query_sum(node, l, r, ql, qr):
        if ql <= l and r <= qr:
            return tree[node]
        push(node, l, r)
        mid = (l + r) // 2
        s = 0
        if ql <= mid:
            s += query_sum(2 * node, l, mid, ql, qr)
        if qr > mid:
            s += query_sum(2 * node + 1, mid + 1, r, ql, qr)
        return s
        
    build(1, 0, n - 1)
    idx = 2 + n
    for _ in range(q):
        type_ = int(input_data[idx])
        if type_ == 1:
            ql, qr, val = int(input_data[idx+1]), int(input_data[idx+2]), int(input_data[idx+3])
            idx += 4
            update_range(1, 0, n - 1, ql, qr, val)
        else:
            ql, qr = int(input_data[idx+1]), int(input_data[idx+2])
            idx += 3
            print(query_sum(1, 0, n - 1, ql, qr))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!data || data.length < 2) return;
    const n = parseInt(data[0], 10);
    const q = parseInt(data[1], 10);
    const nums = [];
    for (let i = 0; i < n; i++) nums.push(parseInt(data[2 + i], 10));
    
    const tree = new Float64Array(4 * n);
    const lazy = new Float64Array(4 * n);
    
    function build(node, l, r) {
        if (l === r) {
            tree[node] = nums[l];
            return;
        }
        const mid = (l + r) >> 1;
        build(2 * node, l, mid);
        build(2 * node + 1, mid + 1, r);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
    
    function push(node, l, r) {
        if (lazy[node] !== 0) {
            const mid = (l + r) >> 1;
            const val = lazy[node];
            tree[2 * node] += val * (mid - l + 1);
            lazy[2 * node] += val;
            tree[2 * node + 1] += val * (r - mid);
            lazy[2 * node + 1] += val;
            lazy[node] = 0;
        }
    }
    
    function updateRange(node, l, r, ql, qr, val) {
        if (ql <= l && r <= qr) {
            tree[node] += val * (r - l + 1);
            lazy[node] += val;
            return;
        }
        push(node, l, r);
        const mid = (l + r) >> 1;
        if (ql <= mid) updateRange(2 * node, l, mid, ql, qr, val);
        if (qr > mid) updateRange(2 * node + 1, mid + 1, r, ql, qr, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
    
    function querySum(node, l, r, ql, qr) {
        if (ql <= l && r <= qr) return tree[node];
        push(node, l, r);
        const mid = (l + r) >> 1;
        let s = 0;
        if (ql <= mid) s += querySum(2 * node, l, mid, ql, qr);
        if (qr > mid) s += querySum(2 * node + 1, mid + 1, r, ql, qr);
        return s;
    }
    
    build(1, 0, n - 1);
    let idx = 2 + n;
    for (let i = 0; i < q; i++) {
        const type = parseInt(data[idx++], 10);
        if (type === 1) {
            const ql = parseInt(data[idx++], 10);
            const qr = parseInt(data[idx++], 10);
            const val = parseInt(data[idx++], 10);
            updateRange(1, 0, n - 1, ql, qr, val);
        } else {
            const ql = parseInt(data[idx++], 10);
            const qr = parseInt(data[idx++], 10);
            console.log(querySum(1, 0, n - 1, ql, qr));
        }
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
input_data = sys.stdin.read().split()
if input_data:
    n, q = int(input_data[0]), int(input_data[1])
    nums = [int(x) for x in input_data[2:2+n]]
    tree = [0] * (4 * n)
    lazy = [0] * (4 * n)
    def build(node, l, r):
        if l == r:
            tree[node] = nums[l]; return
        mid = (l + r) // 2
        build(2 * node, l, mid)
        build(2 * node + 1, mid + 1, r)
        tree[node] = tree[2 * node] + tree[2 * node + 1]
    def push(node, l, r):
        if lazy[node] != 0:
            mid = (l + r) // 2
            val = lazy[node]
            tree[2 * node] += val * (mid - l + 1)
            lazy[2 * node] += val
            tree[2 * node + 1] += val * (r - mid)
            lazy[2 * node + 1] += val
            lazy[node] = 0
    def update_range(node, l, r, ql, qr, val):
        if ql <= l and r <= qr:
            tree[node] += val * (r - l + 1)
            lazy[node] += val
            return
        push(node, l, r)
        mid = (l + r) // 2
        if ql <= mid: update_range(2 * node, l, mid, ql, qr, val)
        if qr > mid: update_range(2 * node + 1, mid + 1, r, ql, qr, val)
        tree[node] = tree[2 * node] + tree[2 * node + 1]
    def query_sum(node, l, r, ql, qr):
        if ql <= l and r <= qr: return tree[node]
        push(node, l, r)
        mid = (l + r) // 2
        s = 0
        if ql <= mid: s += query_sum(2 * node, l, mid, ql, qr)
        if qr > mid: s += query_sum(2 * node + 1, mid + 1, r, ql, qr)
        return s
    build(1, 0, n - 1)
    idx = 2 + n
    for _ in range(q):
        t = int(input_data[idx])
        if t == 1:
            ql, qr, val = int(input_data[idx+1]), int(input_data[idx+2]), int(input_data[idx+3])
            idx += 4
            update_range(1, 0, n - 1, ql, qr, val)
        else:
            ql, qr = int(input_data[idx+1]), int(input_data[idx+2])
            idx += 3
            print(query_sum(1, 0, n - 1, ql, qr))
`,
      javascript: `const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data && data.length >= 2) {
    const n = parseInt(data[0], 10), q = parseInt(data[1], 10);
    const nums = [];
    for (let i = 0; i < n; i++) nums.push(parseInt(data[2 + i], 10));
    const tree = new Float64Array(4 * n), lazy = new Float64Array(4 * n);
    function build(node, l, r) {
        if (l === r) { tree[node] = nums[l]; return; }
        const mid = (l + r) >> 1;
        build(2 * node, l, mid); build(2 * node + 1, mid + 1, r);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
    function push(node, l, r) {
        if (lazy[node] !== 0) {
            const mid = (l + r) >> 1, val = lazy[node];
            tree[2 * node] += val * (mid - l + 1); lazy[2 * node] += val;
            tree[2 * node + 1] += val * (r - mid); lazy[2 * node + 1] += val;
            lazy[node] = 0;
        }
    }
    function updateRange(node, l, r, ql, qr, val) {
        if (ql <= l && r <= qr) {
            tree[node] += val * (r - l + 1); lazy[node] += val; return;
        }
        push(node, l, r);
        const mid = (l + r) >> 1;
        if (ql <= mid) updateRange(2 * node, l, mid, ql, qr, val);
        if (qr > mid) updateRange(2 * node + 1, mid + 1, r, ql, qr, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
    function querySum(node, l, r, ql, qr) {
        if (ql <= l && r <= qr) return tree[node];
        push(node, l, r);
        const mid = (l + r) >> 1;
        let s = 0;
        if (ql <= mid) s += querySum(2 * node, l, mid, ql, qr);
        if (qr > mid) s += querySum(2 * node + 1, mid + 1, r, ql, qr);
        return s;
    }
    build(1, 0, n - 1);
    let idx = 2 + n;
    for (let i = 0; i < q; i++) {
        const type = parseInt(data[idx++], 10);
        if (type === 1) {
            const ql = parseInt(data[idx++], 10), qr = parseInt(data[idx++], 10), val = parseInt(data[idx++], 10);
            updateRange(1, 0, n - 1, ql, qr, val);
        } else {
            const ql = parseInt(data[idx++], 10), qr = parseInt(data[idx++], 10);
            console.log(querySum(1, 0, n - 1, ql, qr));
        }
    }
}
`,
    },
    editorial: {
      approach: 'Segment Tree with Lazy Propagation.',
      algorithm: '1. Lazy propagation defers range updates by storing addend in tree nodes.\n2. Push down pending lazy values on demand during range sum queries and child traversals.\n3. Both range updates and range queries execute in O(log N).',
      timeComplexity: 'O(N) build + O(Q log N)',
      spaceComplexity: 'O(N)',
      content: 'Lazy propagation guarantees logarithmic worst-case time for range modifications.',
      referenceCode: `def push(node, l, r):\n    if lazy[node]:\n        lazy[2*node] += lazy[node]; lazy[2*node+1] += lazy[node]; lazy[node] = 0`,
    },
    tags: ['Segment Tree', 'Data Structures'],
    testCases: [
      { input: `5 4\n1 2 3 4 5\n2 0 4\n1 1 3 10\n2 0 4\n2 1 2`, expectedOutput: `15\n45\n25`, isHidden: false, order: 0 },
      { input: `3 2\n0 0 0\n1 0 2 5\n2 0 2`, expectedOutput: `15`, isHidden: false, order: 1 },
      { input: `1 1\n7\n2 0 0`, expectedOutput: `7`, isHidden: true, order: 2 },
    ],
  },

  // 3. Range Sum Query 2D - Immutable (Medium)
  {
    title: 'Range Sum Query 2D Immutable',
    slug: 'range-sum-query-2d-immutable',
    description: `Given a 2D matrix \`matrix\`, handle multiple queries to calculate the sum of the elements of \`matrix\` inside the rectangle defined by its upper left corner \`(row1, col1)\` and lower right corner \`(row2, col2)\`.
Process each query in \`O(1)\` time using 2D prefix sums.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= m, n <= 200\n1 <= Q <= 10^4\n-10^4 <= matrix[i][j] <= 10^4`,
    inputFormat: `Line 1: m, n, Q\nNext m lines: n space-separated row integers\nNext Q lines: row1 col1 row2 col2`,
    outputFormat: `Q lines: Region sum for each query.`,
    sampleInput: `3 3 2\n3 0 1\n5 6 3\n1 2 0\n0 0 1 1\n1 1 2 2`,
    sampleOutput: `14\n11`,
    points: 150,
    hints: [
      'Precompute 2D prefix sums: pref[i][j] = matrix[i-1][j-1] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1].',
      'Region sum = pref[r2+1][c2+1] - pref[r1][c2+1] - pref[r2+1][c1] + pref[r1][c1].',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    m, n, q = int(data[0]), int(data[1]), int(data[2])
    idx = 3
    pref = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            val = int(data[idx])
            pref[i][j] = val + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1]
            idx += 1
            
    for _ in range(q):
        r1, c1, r2, c2 = int(data[idx]), int(data[idx+1]), int(data[idx+2]), int(data[idx+3])
        idx += 4
        ans = pref[r2 + 1][c2 + 1] - pref[r1][c2 + 1] - pref[r2 + 1][c1] + pref[r1][c1]
        print(ans)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!data || data.length < 3) return;
    const m = parseInt(data[0], 10);
    const n = parseInt(data[1], 10);
    const q = parseInt(data[2], 10);
    
    let idx = 3;
    const pref = Array.from({ length: m + 1 }, () => new Float64Array(n + 1));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const val = parseInt(data[idx++], 10);
            pref[i][j] = val + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1];
        }
    }
    
    for (let k = 0; k < q; k++) {
        const r1 = parseInt(data[idx++], 10);
        const c1 = parseInt(data[idx++], 10);
        const r2 = parseInt(data[idx++], 10);
        const c2 = parseInt(data[idx++], 10);
        const ans = pref[r2 + 1][c2 + 1] - pref[r1][c2 + 1] - pref[r2 + 1][c1] + pref[r1][c1];
        console.log(ans);
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
data = sys.stdin.read().split()
if data:
    m, n, q = int(data[0]), int(data[1]), int(data[2])
    idx = 3
    pref = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            val = int(data[idx])
            pref[i][j] = val + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1]
            idx += 1
    for _ in range(q):
        r1, c1, r2, c2 = int(data[idx]), int(data[idx+1]), int(data[idx+2]), int(data[idx+3])
        idx += 4
        print(pref[r2 + 1][c2 + 1] - pref[r1][c2 + 1] - pref[r2 + 1][c1] + pref[r1][c1])
`,
      javascript: `const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data && data.length >= 3) {
    const m = parseInt(data[0], 10), n = parseInt(data[1], 10), q = parseInt(data[2], 10);
    let idx = 3;
    const pref = Array.from({ length: m + 1 }, () => new Float64Array(n + 1));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const val = parseInt(data[idx++], 10);
            pref[i][j] = val + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1];
        }
    }
    for (let k = 0; k < q; k++) {
        const r1 = parseInt(data[idx++], 10), c1 = parseInt(data[idx++], 10), r2 = parseInt(data[idx++], 10), c2 = parseInt(data[idx++], 10);
        console.log(pref[r2 + 1][c2 + 1] - pref[r1][c2 + 1] - pref[r2 + 1][c1] + pref[r1][c1]);
    }
}
`,
    },
    editorial: {
      approach: '2D Prefix Sum / Inclusion-Exclusion Principle.',
      algorithm: '1. Build 2D cumulative prefix sum table in O(M*N).\n2. Answer each rectangle sum in O(1) using four corner lookups with inclusion-exclusion.',
      timeComplexity: 'O(M*N) build + O(1) query',
      spaceComplexity: 'O(M*N)',
      content: 'Standard 2D range sum table with inclusion-exclusion boundary arithmetic.',
      referenceCode: `sum = P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1]`,
    },
    tags: ['Prefix Sum', 'Matrix', 'Design', 'Array'],
    testCases: [
      { input: `3 3 2\n3 0 1\n5 6 3\n1 2 0\n0 0 1 1\n1 1 2 2`, expectedOutput: `14\n11`, isHidden: false, order: 0 },
      { input: `1 1 1\n5\n0 0 0 0`, expectedOutput: `5`, isHidden: false, order: 1 },
      { input: `2 2 1\n1 2\n3 4\n0 0 1 1`, expectedOutput: `10`, isHidden: true, order: 2 },
    ],
  },
];
