import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack250Batch3Defs: ProblemDef[] = [
  // 1. Largest Rectangle in Histogram
  {
    title: 'Largest Rectangle in Histogram',
    slug: 'largest-rectangle-in-histogram',
    description: `Given an array of integers \`heights\` representing the histogram's bar height where the width of each bar is \`1\`, return the area of the largest rectangle in the histogram.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= heights.length <= 10^5\n0 <= heights[i] <= 10^4`,
    inputFormat: `Comma or space separated bar heights on a single line.`,
    outputFormat: `An integer representing the maximum rectangular area.`,
    sampleInput: `2,1,5,6,2,3`,
    sampleOutput: `10`,
    points: 200,
    hints: [
      'Use a Monotonic Increasing Stack to track indices of heights.',
      'When the current height is smaller than the top of stack, pop from stack and calculate area with popped height as minimum bar.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read().strip().replace(',', ' ').split()
    if not raw:
        print(0)
        return
    heights = [int(x) for x in raw]
    heights.append(0)
    stack = [-1]
    max_area = 0
    for i, h in enumerate(heights):
        while stack[-1] != -1 and heights[stack[-1]] >= h:
            height = heights[stack.pop()]
            width = i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    print(max_area)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
    if (!raw || raw[0] === '') { console.log(0); return; }
    const heights = raw.map(x => parseInt(x, 10));
    heights.push(0);
    const stack = [-1];
    let maxArea = 0;
    for (let i = 0; i < heights.length; i++) {
        const h = heights[i];
        while (stack[stack.length - 1] !== -1 && heights[stack[stack.length - 1]] >= h) {
            const height = heights[stack.pop()];
            const width = i - stack[stack.length - 1] - 1;
            const area = height * width;
            if (area > maxArea) maxArea = area;
        }
        stack.push(i);
    }
    console.log(maxArea);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
raw = sys.stdin.read().strip().replace(',', ' ').split()
if raw:
    heights = [int(x) for x in raw]
    heights.append(0)
    stack = [-1]
    max_area = 0
    for i, h in enumerate(heights):
        while stack[-1] != -1 and heights[stack[-1]] >= h:
            height = heights[stack.pop()]
            width = i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    print(max_area)
else:
    print(0)
`,
      javascript: `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
if (raw && raw[0] !== '') {
    const heights = raw.map(x => parseInt(x, 10));
    heights.push(0);
    const stack = [-1];
    let maxArea = 0;
    for (let i = 0; i < heights.length; i++) {
        const h = heights[i];
        while (stack[stack.length - 1] !== -1 && heights[stack[stack.length - 1]] >= h) {
            const height = heights[stack.pop()];
            const width = i - stack[stack.length - 1] - 1;
            if (height * width > maxArea) maxArea = height * width;
        }
        stack.push(i);
    }
    console.log(maxArea);
} else { console.log(0); }
`,
    },
    editorial: {
      approach: 'Monotonic Increasing Stack in Linear Time.',
      algorithm: '1. Append sentinel 0 at the end of heights to flush stack.\n2. Push indices to stack while heights are non-decreasing.\n3. Upon seeing smaller height, pop top index and calculate rectangular area spanned.\n4. Return maximum area found.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Every bar is pushed and popped at most once, providing optimal linear runtime.',
      referenceCode: `stack = [-1]\nfor i, h in enumerate(heights + [0]):\n    while stack[-1] != -1 and heights[stack[-1]] >= h:\n        max_area = max(max_area, heights[stack.pop()] * (i - stack[-1] - 1))\n    stack.append(i)`,
    },
    tags: ['Stack', 'Monotonic Stack', 'Arrays'],
    testCases: [
      { input: `2,1,5,6,2,3`, expectedOutput: `10`, isHidden: false, order: 0 },
      { input: `2,4`, expectedOutput: `4`, isHidden: false, order: 1 },
      { input: `1`, expectedOutput: `1`, isHidden: true, order: 2 },
      { input: `6,7,5,2,4,5,9,3`, expectedOutput: `16`, isHidden: true, order: 3 },
    ],
  },

  // 2. Sliding Window Maximum
  {
    title: 'Sliding Window Maximum',
    slug: 'sliding-window-maximum',
    description: `You are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. You can only see the \`k\` numbers in the window. Each time the sliding window moves right by one position.
Return the max sliding window.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4\n1 <= k <= nums.length`,
    inputFormat: `Line 1: Comma or space separated integers.\nLine 2: k (window size)`,
    outputFormat: `Comma-separated maximums for each window position.`,
    sampleInput: `1,3,-1,-3,5,3,6,7\n3`,
    sampleOutput: `3,3,5,5,6,7`,
    points: 200,
    hints: [
      'Maintain a Monotonic Deque storing indices in decreasing order of element values.',
      'Remove indices outside the window from the front, and remove smaller elements from the back.',
    ],
    codeTemplates: {
      python: `import sys
from collections import deque

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    nums = [int(x.strip()) for x in lines[0].replace(',', ' ').split()]
    k = int(lines[1].strip())
    
    dq = deque()
    res = []
    
    for i, num in enumerate(nums):
        if dq and dq[0] < i - k + 1:
            dq.popleft()
        while dq and nums[dq[-1]] < num:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            res.append(nums[dq[0]])
            
    print(",".join(str(x) for x in res))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const nums = lines[0].replace(/,/g, ' ').trim().split(/\\s+/).map(x => parseInt(x, 10));
    const k = parseInt(lines[1].trim(), 10);
    
    const dq = []; // monotonic deque of indices
    const res = [];
    let head = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (head < dq.length && dq[head] < i - k + 1) {
            head++;
        }
        while (dq.length > head && nums[dq[dq.length - 1]] < nums[i]) {
            dq.pop();
        }
        dq.push(i);
        if (i >= k - 1) {
            res.push(nums[dq[head]]);
        }
    }
    console.log(res.join(","));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
from collections import deque
lines = sys.stdin.read().strip().split('\\n')
if len(lines) >= 2:
    nums = [int(x.strip()) for x in lines[0].replace(',', ' ').split()]
    k = int(lines[1].strip())
    dq = deque()
    res = []
    for i, x in enumerate(nums):
        if dq and dq[0] < i - k + 1: dq.popleft()
        while dq and nums[dq[-1]] < x: dq.pop()
        dq.append(i)
        if i >= k - 1: res.append(nums[dq[0]])
    print(",".join(str(x) for x in res))
`,
      javascript: `const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
    const nums = lines[0].replace(/,/g, ' ').trim().split(/\\s+/).map(x => parseInt(x, 10));
    const k = parseInt(lines[1].trim(), 10);
    const dq = [];
    const res = [];
    let head = 0;
    for (let i = 0; i < nums.length; i++) {
        if (head < dq.length && dq[head] < i - k + 1) head++;
        while (dq.length > head && nums[dq[dq.length - 1]] < nums[i]) dq.pop();
        dq.push(i);
        if (i >= k - 1) res.push(nums[dq[head]]);
    }
    console.log(res.join(","));
}
`,
    },
    editorial: {
      approach: 'Monotonic Deque in O(N) Time.',
      algorithm: '1. Maintain deque holding indices with strictly decreasing values.\n2. Discard stale elements falling behind sliding window boundary.\n3. Discard smaller elements at the back of deque.\n4. Deque front always stores the maximum value for the current window.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(K)',
      content: 'Using a monotonic double-ended queue achieves linear time amortized across sliding updates.',
      referenceCode: `dq = deque()\nfor i, x in enumerate(nums):\n    if dq and dq[0] <= i - k: dq.popleft()\n    while dq and nums[dq[-1]] < x: dq.pop()\n    dq.append(i)`,
    },
    tags: ['Queue', 'Sliding Window', 'Monotonic Stack'],
    testCases: [
      { input: `1,3,-1,-3,5,3,6,7\n3`, expectedOutput: `3,3,5,5,6,7`, isHidden: false, order: 0 },
      { input: `1\n1`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `9,11\n2`, expectedOutput: `11`, isHidden: true, order: 2 },
      { input: `4,-2\n2`, expectedOutput: `4`, isHidden: true, order: 3 },
    ],
  },

  // 3. Range Minimum Query (Segment Tree)
  {
    title: 'Range Minimum Query',
    slug: 'range-minimum-query',
    description: `Given an integer array \`nums\` and \`Q\` range minimum queries of form \`L R\` (0-indexed, inclusive), answer the minimum element in \`nums[L...R]\` for each query.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 10^5\n1 <= Q <= 10^5\n-10^9 <= nums[i] <= 10^9\n0 <= L <= R < nums.length`,
    inputFormat: `Line 1: N and Q\nLine 2: N space-separated integers for nums\nNext Q lines: L R`,
    outputFormat: `Q lines: Minimum element for each query.`,
    sampleInput: `5 3\n2 5 1 4 9\n0 4\n1 3\n3 4`,
    sampleOutput: `1\n1\n4`,
    points: 150,
    hints: [
      'Build a Segment Tree or Sparse Table for O(1) or O(log N) static range queries.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    n, q = int(data[0]), int(data[1])
    nums = [int(x) for x in data[2:2+n]]
    
    # Build segment tree
    tree = [0] * (4 * n)
    def build(node, l, r):
        if l == r:
            tree[node] = nums[l]
            return
        mid = (l + r) // 2
        build(2 * node, l, mid)
        build(2 * node + 1, mid + 1, r)
        tree[node] = min(tree[2 * node], tree[2 * node + 1])
        
    def query(node, l, r, ql, qr):
        if ql <= l and r <= qr:
            return tree[node]
        mid = (l + r) // 2
        res = float('inf')
        if ql <= mid:
            res = min(res, query(2 * node, l, mid, ql, qr))
        if qr > mid:
            res = min(res, query(2 * node + 1, mid + 1, r, ql, qr))
        return res
        
    build(1, 0, n - 1)
    idx = 2 + n
    for _ in range(q):
        ql, qr = int(data[idx]), int(data[idx+1])
        idx += 2
        print(query(1, 0, n - 1, ql, qr))

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
    
    const tree = new Int32Array(4 * n);
    function build(node, l, r) {
        if (l === r) {
            tree[node] = nums[l];
            return;
        }
        const mid = (l + r) >> 1;
        build(2 * node, l, mid);
        build(2 * node + 1, mid + 1, r);
        tree[node] = Math.min(tree[2 * node], tree[2 * node + 1]);
    }
    
    function query(node, l, r, ql, qr) {
        if (ql <= l && r <= qr) return tree[node];
        const mid = (l + r) >> 1;
        let res = Infinity;
        if (ql <= mid) res = Math.min(res, query(2 * node, l, mid, ql, qr));
        if (qr > mid) res = Math.min(res, query(2 * node + 1, mid + 1, r, ql, qr));
        return res;
    }
    
    build(1, 0, n - 1);
    let idx = 2 + n;
    for (let i = 0; i < q; i++) {
        const ql = parseInt(data[idx++], 10);
        const qr = parseInt(data[idx++], 10);
        console.log(query(1, 0, n - 1, ql, qr));
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
data = sys.stdin.read().split()
if data:
    n, q = int(data[0]), int(data[1])
    nums = [int(x) for x in data[2:2+n]]
    tree = [0] * (4 * n)
    def build(node, l, r):
        if l == r:
            tree[node] = nums[l]
            return
        mid = (l + r) // 2
        build(2 * node, l, mid)
        build(2 * node + 1, mid + 1, r)
        tree[node] = min(tree[2 * node], tree[2 * node + 1])
    def query(node, l, r, ql, qr):
        if ql <= l and r <= qr: return tree[node]
        mid = (l + r) // 2
        res = float('inf')
        if ql <= mid: res = min(res, query(2 * node, l, mid, ql, qr))
        if qr > mid: res = min(res, query(2 * node + 1, mid + 1, r, ql, qr))
        return res
    build(1, 0, n - 1)
    idx = 2 + n
    for _ in range(q):
        ql, qr = int(data[idx]), int(data[idx+1])
        idx += 2
        print(query(1, 0, n - 1, ql, qr))
`,
      javascript: `const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data && data.length >= 2) {
    const n = parseInt(data[0], 10), q = parseInt(data[1], 10);
    const nums = [];
    for (let i = 0; i < n; i++) nums.push(parseInt(data[2 + i], 10));
    const tree = new Int32Array(4 * n);
    function build(node, l, r) {
        if (l === r) { tree[node] = nums[l]; return; }
        const mid = (l + r) >> 1;
        build(2 * node, l, mid); build(2 * node + 1, mid + 1, r);
        tree[node] = Math.min(tree[2 * node], tree[2 * node + 1]);
    }
    function query(node, l, r, ql, qr) {
        if (ql <= l && r <= qr) return tree[node];
        const mid = (l + r) >> 1;
        let res = Infinity;
        if (ql <= mid) res = Math.min(res, query(2 * node, l, mid, ql, qr));
        if (qr > mid) res = Math.min(res, query(2 * node + 1, mid + 1, r, ql, qr));
        return res;
    }
    build(1, 0, n - 1);
    let idx = 2 + n;
    for (let i = 0; i < q; i++) {
        const ql = parseInt(data[idx++], 10), qr = parseInt(data[idx++], 10);
        console.log(query(1, 0, n - 1, ql, qr));
    }
}
`,
    },
    editorial: {
      approach: 'Segment Tree Range Minimum Query.',
      algorithm: '1. Build binary segment tree in O(N) time with internal node min values.\n2. For each query, aggregate tree intervals covering [L, R] in O(log N).\n3. Output minimum query answer.',
      timeComplexity: 'O(N) build + O(Q log N) queries',
      spaceComplexity: 'O(N)',
      content: 'Segment tree dynamically handles range minima in logarithmic time per query.',
      referenceCode: `def query(node, l, r, ql, qr):\n    if ql <= l and r <= qr: return tree[node]\n    mid = (l + r) // 2\n    return min(query(2*node, l, mid, ql, qr), query(2*node+1, mid+1, r, ql, qr))`,
    },
    tags: ['Segment Tree', 'Data Structures', 'Binary Search'],
    testCases: [
      { input: `5 3\n2 5 1 4 9\n0 4\n1 3\n3 4`, expectedOutput: `1\n1\n4`, isHidden: false, order: 0 },
      { input: `3 1\n7 7 7\n0 2`, expectedOutput: `7`, isHidden: false, order: 1 },
      { input: `4 2\n-1 -5 3 0\n0 1\n2 3`, expectedOutput: `-5\n0`, isHidden: true, order: 2 },
    ],
  },
];
