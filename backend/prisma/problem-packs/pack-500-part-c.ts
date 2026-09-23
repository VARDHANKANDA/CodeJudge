import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack500PartCDefs: ProblemDef[] = [
  // 1. Fenwick Tree Range Add Point Query
  {
    title: 'Fenwick Tree Range Add Point Query',
    slug: 'fenwick-tree-range-add-point-query',
    description: `Given initial array nums of size n, support range additions [l, r, val] and point queries index.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n <= 10^5, queries <= 10^5`,
    inputFormat: `nums, operations`,
    outputFormat: `A list of integers.`,
    sampleInput: `[1,2,3,4,5], [["add",1,3,2],["get",2],["add",0,4,1],["get",0]]`,
    sampleOutput: `[5,2]`,
    points: 150,
    hints: ['Use difference array representation in Binary Indexed Tree.'],
    codeTemplates: {
      python: `class Solution:\n    def processQueries(self, nums: list, operations: list) -> list:\n        pass`,
      javascript: `class Solution {\n    processQueries(nums, operations) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def processQueries(self, nums: list, operations: list) -> list:
        n = len(nums)
        tree = [0] * (n + 2)
        def add(i, v):
            i += 1
            while i <= n + 1:
                tree[i] += v
                i += i & (-i)
        def query(i):
            i += 1
            s = 0
            while i > 0:
                s += tree[i]
                i -= i & (-i)
            return s
        for i in range(n):
            val = nums[i] - (nums[i - 1] if i > 0 else 0)
            add(i, val)
        res = []
        for op in operations:
            if op[0] == "add":
                _, l, r, v = op
                add(l, v)
                add(r + 1, -v)
            elif op[0] == "get":
                _, idx = op
                res.append(query(idx))
        return res`,
      javascript: `class Solution {
    processQueries(nums, operations) {
        const n = nums.length;
        const tree = Array(n + 2).fill(0);
        function add(i, v) {
            i++;
            while (i <= n + 1) { tree[i] += v; i += i & (-i); }
        }
        function query(i) {
            i++;
            let s = 0;
            while (i > 0) { s += tree[i]; i -= i & (-i); }
            return s;
        }
        for (let i = 0; i < n; i++) {
            const val = nums[i] - (i > 0 ? nums[i - 1] : 0);
            add(i, val);
        }
        const res = [];
        for (const op of operations) {
            if (op[0] === "add") {
                const [, l, r, v] = op;
                add(l, v); add(r + 1, -v);
            } else if (op[0] === "get") {
                res.push(query(op[1]));
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Difference Array Fenwick Tree.',
      algorithm: 'O(log N) range update and point query.',
      timeComplexity: 'O(Q log N)',
      spaceComplexity: 'O(N)',
      content: 'BIT on differences.',
      referenceCode: `add(l, v); add(r + 1, -v)`,
    },
    tags: ['Data Structures', 'Binary Indexed Tree', 'Range Queries'],
    testCases: [
      { input: `[1,2,3,4,5], [["add",1,3,2],["get",2],["add",0,4,1],["get",0]]`, expectedOutput: `[5,2]`, isHidden: false, order: 0 },
      { input: `[0,0,0], [["add",0,2,5],["get",1],["get",2]]`, expectedOutput: `[5,5]`, isHidden: false, order: 1 },
      { input: `[10], [["get",0],["add",0,0,3],["get",0]]`, expectedOutput: `[10,13]`, isHidden: true, order: 2 },
    ],
  },

  // 2. Segment Tree Point Update Range XOR
  {
    title: 'Segment Tree Point Update Range XOR',
    slug: 'segment-tree-point-update-range-xor',
    description: `Given array nums, process point update [update, idx, val] and range XOR queries [xor, l, r].`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n <= 10^5, queries <= 10^5`,
    inputFormat: `nums, operations`,
    outputFormat: `A list of integers.`,
    sampleInput: `[1,3,5,7,9], [["xor",1,3],["update",2,8],["xor",1,3]]`,
    sampleOutput: `[1,12]`,
    points: 150,
    hints: ['Segment tree maintaining bitwise XOR associative sum.'],
    codeTemplates: {
      python: `class Solution:\n    def rangeXorQueries(self, nums: list, operations: list) -> list:\n        pass`,
      javascript: `class Solution {\n    rangeXorQueries(nums, operations) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def rangeXorQueries(self, nums: list, operations: list) -> list:
        n = len(nums)
        tree = [0] * (4 * n)
        def build(node, l, r):
            if l == r:
                tree[node] = nums[l]
                return
            mid = (l + r) // 2
            build(2 * node, l, mid)
            build(2 * node + 1, mid + 1, r)
            tree[node] = tree[2 * node] ^ tree[2 * node + 1]
        def update(node, l, r, idx, val):
            if l == r:
                tree[node] = val
                return
            mid = (l + r) // 2
            if idx <= mid: update(2 * node, l, mid, idx, val)
            else: update(2 * node + 1, mid + 1, r, idx, val)
            tree[node] = tree[2 * node] ^ tree[2 * node + 1]
        def query(node, l, r, ql, qr):
            if ql <= l and r <= qr: return tree[node]
            mid = (l + r) // 2
            res = 0
            if ql <= mid: res ^= query(2 * node, l, mid, ql, qr)
            if qr > mid: res ^= query(2 * node + 1, mid + 1, r, ql, qr)
            return res
        build(1, 0, n - 1)
        res = []
        for op in operations:
            if op[0] == "update":
                _, idx, val = op
                update(1, 0, n - 1, idx, val)
            elif op[0] == "xor":
                _, ql, qr = op
                res.append(query(1, 0, n - 1, ql, qr))
        return res`,
      javascript: `class Solution {
    rangeXorQueries(nums, operations) {
        const n = nums.length;
        const tree = Array(4 * n).fill(0);
        function build(node, l, r) {
            if (l === r) { tree[node] = nums[l]; return; }
            const mid = Math.floor((l + r) / 2);
            build(2 * node, l, mid);
            build(2 * node + 1, mid + 1, r);
            tree[node] = tree[2 * node] ^ tree[2 * node + 1];
        }
        function update(node, l, r, idx, val) {
            if (l === r) { tree[node] = val; return; }
            const mid = Math.floor((l + r) / 2);
            if (idx <= mid) update(2 * node, l, mid, idx, val);
            else update(2 * node + 1, mid + 1, r, idx, val);
            tree[node] = tree[2 * node] ^ tree[2 * node + 1];
        }
        function query(node, l, r, ql, qr) {
            if (ql <= l && r <= qr) return tree[node];
            const mid = Math.floor((l + r) / 2);
            let res = 0;
            if (ql <= mid) res ^= query(2 * node, l, mid, ql, qr);
            if (qr > mid) res ^= query(2 * node + 1, mid + 1, r, ql, qr);
            return res;
        }
        build(1, 0, n - 1);
        const res = [];
        for (const op of operations) {
            if (op[0] === "update") {
                update(1, 0, n - 1, op[1], op[2]);
            } else if (op[0] === "xor") {
                res.push(query(1, 0, n - 1, op[1], op[2]));
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Segment Tree on XOR Group.',
      algorithm: 'O(log N) point update and range query.',
      timeComplexity: 'O(Q log N)',
      spaceComplexity: 'O(N)',
      content: 'Standard segment tree on bitwise XOR.',
      referenceCode: `tree[node] = tree[2 * node] ^ tree[2 * node + 1]`,
    },
    tags: ['Data Structures', 'Segment Tree', 'Bit Manipulation'],
    testCases: [
      { input: `[1,3,5,7,9], [["xor",1,3],["update",2,8],["xor",1,3]]`, expectedOutput: `[1,12]`, isHidden: false, order: 0 },
      { input: `[4,8], [["xor",0,1],["update",0,0],["xor",0,1]]`, expectedOutput: `[12,8]`, isHidden: false, order: 1 },
      { input: `[7], [["xor",0,0]]`, expectedOutput: `[7]`, isHidden: true, order: 2 },
    ],
  },

  // 3. Sparse Table Range GCD Queries
  {
    title: 'Sparse Table Range GCD Queries',
    slug: 'sparse-table-range-gcd-queries',
    description: `Given static array nums, answer range greatest common divisor (GCD) queries [l, r] in O(1) time per query.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n <= 10^5, queries <= 10^5`,
    inputFormat: `nums, queries`,
    outputFormat: `A list of integers.`,
    sampleInput: `[2,4,6,8,16], [[0,2],[1,3],[2,4],[0,4]]`,
    sampleOutput: `[2,2,2,2]`,
    points: 150,
    hints: ['Build Sparse Table for idempotent associative operator gcd.'],
    codeTemplates: {
      python: `class Solution:\n    def rangeGcd(self, nums: list, queries: list) -> list:\n        pass`,
      javascript: `class Solution {\n    rangeGcd(nums, queries) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def rangeGcd(self, nums: list, queries: list) -> list:
        import math
        n = len(nums)
        log_table = [0] * (n + 1)
        for i in range(2, n + 1):
            log_table[i] = log_table[i // 2] + 1
        k = log_table[n] + 1
        st = [[0] * k for _ in range(n)]
        for i in range(n):
            st[i][0] = nums[i]
        for j in range(1, k):
            for i in range(n - (1 << j) + 1):
                st[i][j] = math.gcd(st[i][j - 1], st[i + (1 << (j - 1))][j - 1])
        res = []
        for l, r in queries:
            j = log_table[r - l + 1]
            res.append(math.gcd(st[l][j], st[r - (1 << j) + 1][j]))
        return res`,
      javascript: `class Solution {
    rangeGcd(nums, queries) {
        const n = nums.length;
        function gcd(a, b) {
            while (b !== 0) { const t = b; b = a % b; a = t; }
            return a;
        }
        const logTable = Array(n + 1).fill(0);
        for (let i = 2; i <= n; i++) logTable[i] = logTable[Math.floor(i / 2)] + 1;
        const k = logTable[n] + 1;
        const st = Array.from({ length: n }, () => Array(k).fill(0));
        for (let i = 0; i < n; i++) st[i][0] = nums[i];
        for (let j = 1; j < k; j++) {
            for (let i = 0; i <= n - (1 << j); i++) {
                st[i][j] = gcd(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
            }
        }
        return queries.map(([l, r]) => {
            const j = logTable[r - l + 1];
            return gcd(st[l][j], st[r - (1 << j) + 1][j]);
        });
    }
}`,
    },
    editorial: {
      approach: 'Sparse Table Range GCD.',
      algorithm: 'O(1) static interval queries via idempotent overlap.',
      timeComplexity: 'O(N log N + Q)',
      spaceComplexity: 'O(N log N)',
      content: 'Idempotent operator RMQ table.',
      referenceCode: `math.gcd(st[l][j], st[r - (1 << j) + 1][j])`,
    },
    tags: ['Data Structures', 'Sparse Table', 'Math'],
    testCases: [
      { input: `[2,4,6,8,16], [[0,2],[1,3],[2,4],[0,4]]`, expectedOutput: `[2,2,2,2]`, isHidden: false, order: 0 },
      { input: `[12,18,24,36], [[0,1],[1,3],[0,3]]`, expectedOutput: `[6,6,6]`, isHidden: false, order: 1 },
      { input: `[17], [[0,0]]`, expectedOutput: `[17]`, isHidden: true, order: 2 },
    ],
  },

  // 4. Sum of Subarray Minimums
  {
    title: 'Sum of Subarray Minimums Monotonic Stack',
    slug: 'sum-of-subarray-minimums-monotonic-stack',
    description: `Given an array of integers arr, find the sum of min(b), where b ranges over every contiguous subarray of arr, modulo 10^9 + 7.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= arr.length <= 3*10^4`,
    inputFormat: `arr`,
    outputFormat: `An integer modulo 10^9 + 7.`,
    sampleInput: `[3,1,2,4]`,
    sampleOutput: `17`,
    points: 150,
    hints: ['For each element arr[i], find previous smaller and next smaller or equal element indices.'],
    codeTemplates: {
      python: `class Solution:\n    def sumSubarrayMins(self, arr: list) -> int:\n        pass`,
      javascript: `class Solution {\n    sumSubarrayMins(arr) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def sumSubarrayMins(self, arr: list) -> int:
        MOD = 10**9 + 7
        n = len(arr)
        left = [-1] * n
        right = [n] * n
        stack = []
        for i in range(n):
            while stack and arr[stack[-1]] >= arr[i]: stack.pop()
            left[i] = stack[-1] if stack else -1
            stack.append(i)
        stack = []
        for i in range(n - 1, -1, -1):
            while stack and arr[stack[-1]] > arr[i]: stack.pop()
            right[i] = stack[-1] if stack else n
            stack.append(i)
        ans = 0
        for i in range(n):
            count = (i - left[i]) * (right[i] - i)
            ans = (ans + arr[i] * count) % MOD
        return ans`,
      javascript: `class Solution {
    sumSubarrayMins(arr) {
        const MOD = 1000000007;
        const n = arr.length;
        const left = Array(n).fill(-1);
        const right = Array(n).fill(n);
        let stack = [];
        for (let i = 0; i < n; i++) {
            while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) stack.pop();
            left[i] = stack.length > 0 ? stack[stack.length - 1] : -1;
            stack.push(i);
        }
        stack = [];
        for (let i = n - 1; i >= 0; i--) {
            while (stack.length > 0 && arr[stack[stack.length - 1]] > arr[i]) stack.pop();
            right[i] = stack.length > 0 ? stack[stack.length - 1] : n;
            stack.push(i);
        }
        let ans = 0;
        for (let i = 0; i < n; i++) {
            const count = (i - left[i]) * (right[i] - i);
            ans = (ans + Number((BigInt(arr[i]) * BigInt(count)) % BigInt(MOD))) % MOD;
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Monotonic Stack Subarray Contribution.',
      algorithm: 'Left and right span product calculation in O(N).',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Element contribution method via monotonic stack.',
      referenceCode: `count = (i - left[i]) * (right[i] - i)`,
    },
    tags: ['Data Structures', 'Monotonic Stack', 'Array'],
    testCases: [
      { input: `[3,1,2,4]`, expectedOutput: `17`, isHidden: false, order: 0 },
      { input: `[11,81,94,43,3]`, expectedOutput: `444`, isHidden: false, order: 1 },
      { input: `[5]`, expectedOutput: `5`, isHidden: true, order: 2 },
    ],
  },

  // 5. Sum of Subarray Ranges
  {
    title: 'Sum of Subarray Ranges Monotonic Stack',
    slug: 'sum-of-subarray-ranges-monotonic-stack',
    description: `Given an integer array nums, return the sum of all subarray ranges (max(sub) - min(sub)).`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 10^4`,
    inputFormat: `nums`,
    outputFormat: `An integer representing sum of ranges.`,
    sampleInput: `[1,2,3]`,
    sampleOutput: `4`,
    points: 150,
    hints: ['Range sum equals Sum of Subarray Maximums minus Sum of Subarray Minimums.'],
    codeTemplates: {
      python: `class Solution:\n    def subArrayRanges(self, nums: list) -> int:\n        pass`,
      javascript: `class Solution {\n    subArrayRanges(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def subArrayRanges(self, nums: list) -> int:
        n = len(nums)
        left_max = [-1] * n
        right_max = [n] * n
        stack = []
        for i in range(n):
            while stack and nums[stack[-1]] <= nums[i]: stack.pop()
            left_max[i] = stack[-1] if stack else -1
            stack.append(i)
        stack = []
        for i in range(n - 1, -1, -1):
            while stack and nums[stack[-1]] < nums[i]: stack.pop()
            right_max[i] = stack[-1] if stack else n
            stack.append(i)
        sum_max = sum(nums[i] * (i - left_max[i]) * (right_max[i] - i) for i in range(n))
        left_min = [-1] * n
        right_min = [n] * n
        stack = []
        for i in range(n):
            while stack and nums[stack[-1]] >= nums[i]: stack.pop()
            left_min[i] = stack[-1] if stack else -1
            stack.append(i)
        stack = []
        for i in range(n - 1, -1, -1):
            while stack and nums[stack[-1]] > nums[i]: stack.pop()
            right_min[i] = stack[-1] if stack else n
            stack.append(i)
        sum_min = sum(nums[i] * (i - left_min[i]) * (right_min[i] - i) for i in range(n))
        return sum_max - sum_min`,
      javascript: `class Solution {
    subArrayRanges(nums) {
        const n = nums.length;
        const leftMax = Array(n).fill(-1), rightMax = Array(n).fill(n);
        let stack = [];
        for (let i = 0; i < n; i++) {
            while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) stack.pop();
            leftMax[i] = stack.length > 0 ? stack[stack.length - 1] : -1;
            stack.push(i);
        }
        stack = [];
        for (let i = n - 1; i >= 0; i--) {
            while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) stack.pop();
            rightMax[i] = stack.length > 0 ? stack[stack.length - 1] : n;
            stack.push(i);
        }
        let sumMax = 0;
        for (let i = 0; i < n; i++) sumMax += nums[i] * (i - leftMax[i]) * (rightMax[i] - i);
        const leftMin = Array(n).fill(-1), rightMin = Array(n).fill(n);
        stack = [];
        for (let i = 0; i < n; i++) {
            while (stack.length > 0 && nums[stack[stack.length - 1]] >= nums[i]) stack.pop();
            leftMin[i] = stack.length > 0 ? stack[stack.length - 1] : -1;
            stack.push(i);
        }
        stack = [];
        for (let i = n - 1; i >= 0; i--) {
            while (stack.length > 0 && nums[stack[stack.length - 1]] > nums[i]) stack.pop();
            rightMin[i] = stack.length > 0 ? stack[stack.length - 1] : n;
            stack.push(i);
        }
        let sumMin = 0;
        for (let i = 0; i < n; i++) sumMin += nums[i] * (i - leftMin[i]) * (rightMin[i] - i);
        return sumMax - sumMin;
    }
}`,
    },
    editorial: {
      approach: 'Dual Monotonic Stack Range Difference.',
      algorithm: 'Sum(Max) - Sum(Min) contribution decomposition.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Linearly computes all ranges sum.',
      referenceCode: `return sum_max - sum_min`,
    },
    tags: ['Data Structures', 'Monotonic Stack', 'Array'],
    testCases: [
      { input: `[1,2,3]`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `[1,3,3]`, expectedOutput: `4`, isHidden: false, order: 1 },
      { input: `[4,-2,-3,4,1]`, expectedOutput: `59`, isHidden: true, order: 2 },
    ],
  },

  // 6. Design Circular Deque Ring Buffer
  {
    title: 'Design Circular Deque Ring Buffer',
    slug: 'design-circular-deque-ring-buffer',
    description: `Design your implementation of the circular double-ended queue (deque) with fixed capacity k.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= k <= 1000`,
    inputFormat: `k, operations`,
    outputFormat: `A list of results.`,
    sampleInput: `3, [["insertLast",1],["insertLast",2],["insertFront",3],["insertFront",4],["getRear"],["isFull"],["deleteLast"],["insertFront",4],["getFront"]]`,
    sampleOutput: `[true,true,true,false,2,true,true,true,4]`,
    points: 150,
    hints: ['Array ring buffer with head and tail pointers.'],
    codeTemplates: {
      python: `class Solution:\n    def executeOperations(self, k: int, operations: list) -> list:\n        pass`,
      javascript: `class Solution {\n    executeOperations(k, operations) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def executeOperations(self, k: int, operations: list) -> list:
        buffer = [0] * (k + 1)
        head = 0
        tail = 0
        cap = k + 1
        res = []
        for op in operations:
            name = op[0]
            if name == "insertFront":
                val = op[1]
                if (head - 1 + cap) % cap == tail: res.append(False)
                else:
                    head = (head - 1 + cap) % cap
                    buffer[head] = val
                    res.append(True)
            elif name == "insertLast":
                val = op[1]
                if (tail + 1) % cap == head: res.append(False)
                else:
                    buffer[tail] = val
                    tail = (tail + 1) % cap
                    res.append(True)
            elif name == "deleteFront":
                if head == tail: res.append(False)
                else:
                    head = (head + 1) % cap
                    res.append(True)
            elif name == "deleteLast":
                if head == tail: res.append(False)
                else:
                    tail = (tail - 1 + cap) % cap
                    res.append(True)
            elif name == "getFront":
                res.append(buffer[head] if head != tail else -1)
            elif name == "getRear":
                res.append(buffer[(tail - 1 + cap) % cap] if head != tail else -1)
            elif name == "isEmpty":
                res.append(head == tail)
            elif name == "isFull":
                res.append((tail + 1) % cap == head)
        return res`,
      javascript: `class Solution {
    executeOperations(k, operations) {
        const cap = k + 1;
        const buffer = Array(cap).fill(0);
        let head = 0, tail = 0;
        const res = [];
        for (const op of operations) {
            const name = op[0];
            if (name === "insertFront") {
                if ((head - 1 + cap) % cap === tail) res.push(false);
                else { head = (head - 1 + cap) % cap; buffer[head] = op[1]; res.push(true); }
            } else if (name === "insertLast") {
                if ((tail + 1) % cap === head) res.push(false);
                else { buffer[tail] = op[1]; tail = (tail + 1) % cap; res.push(true); }
            } else if (name === "deleteFront") {
                if (head === tail) res.push(false);
                else { head = (head + 1) % cap; res.push(true); }
            } else if (name === "deleteLast") {
                if (head === tail) res.push(false);
                else { tail = (tail - 1 + cap) % cap; res.push(true); }
            } else if (name === "getFront") {
                res.push(head !== tail ? buffer[head] : -1);
            } else if (name === "getRear") {
                res.push(head !== tail ? buffer[(tail - 1 + cap) % cap] : -1);
            } else if (name === "isEmpty") {
                res.push(head === tail);
            } else if (name === "isFull") {
                res.push((tail + 1) % cap === head);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Circular Array Ring Buffer Implementation.',
      algorithm: 'O(1) all double-ended queue operations.',
      timeComplexity: 'O(Q)',
      spaceComplexity: 'O(K)',
      content: 'Standard ring buffer.',
      referenceCode: `head = (head - 1 + cap) % cap`,
    },
    tags: ['Data Structures', 'Queue', 'Array', 'Design'],
    testCases: [
      { input: `3, [["insertLast",1],["insertLast",2],["insertFront",3],["insertFront",4],["getRear"],["isFull"],["deleteLast"],["insertFront",4],["getFront"]]`, expectedOutput: `[true,true,true,false,2,true,true,true,4]`, isHidden: false, order: 0 },
      { input: `2, [["isEmpty"],["insertFront",1],["isEmpty"]]`, expectedOutput: `[true,true,false]`, isHidden: false, order: 1 },
      { input: `1, [["getFront"],["getRear"]]`, expectedOutput: `[-1,-1]`, isHidden: true, order: 2 },
    ],
  },

  // 7. Design Custom Stack With Increment
  {
    title: 'Design Custom Stack With Increment',
    slug: 'design-custom-stack-with-increment',
    description: `Design a stack with maxSize and an increment(k, val) operation that adds val to bottom k elements in O(1).`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `maxSize <= 1000`,
    inputFormat: `maxSize, operations`,
    outputFormat: `A list of results.`,
    sampleInput: `3, [["push",1],["push",2],["pop"],["push",2],["push",3],["push",4],["increment",5,100],["increment",2,100],["pop"],["pop"],["pop"],["pop"]]`,
    sampleOutput: `[null,null,2,null,null,null,null,null,103,202,201,-1]`,
    points: 150,
    hints: ['Maintain lazy increments array propagated downward on pop.'],
    codeTemplates: {
      python: `class Solution:\n    def executeOperations(self, maxSize: int, operations: list) -> list:\n        pass`,
      javascript: `class Solution {\n    executeOperations(maxSize, operations) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def executeOperations(self, maxSize: int, operations: list) -> list:
        stack = []
        inc = []
        res = []
        for op in operations:
            name = op[0]
            if name == "push":
                if len(stack) < maxSize:
                    stack.append(op[1])
                    inc.append(0)
                res.append(None)
            elif name == "pop":
                if not stack: res.append(-1)
                else:
                    idx = len(stack) - 1
                    val = stack.pop() + inc[idx]
                    if idx > 0: inc[idx - 1] += inc[idx]
                    inc.pop()
                    res.append(val)
            elif name == "increment":
                k, val = op[1], op[2]
                idx = min(k, len(stack)) - 1
                if idx >= 0: inc[idx] += val
                res.append(None)
        return res`,
      javascript: `class Solution {
    executeOperations(maxSize, operations) {
        const stack = [], inc = [];
        const res = [];
        for (const op of operations) {
            const name = op[0];
            if (name === "push") {
                if (stack.length < maxSize) { stack.push(op[1]); inc.push(0); }
                res.push(null);
            } else if (name === "pop") {
                if (stack.length === 0) res.push(-1);
                else {
                    const idx = stack.length - 1;
                    const val = stack.pop() + inc[idx];
                    if (idx > 0) inc[idx - 1] += inc[idx];
                    inc.pop();
                    res.push(val);
                }
            } else if (name === "increment") {
                const idx = Math.min(op[1], stack.length) - 1;
                if (idx >= 0) inc[idx] += op[2];
                res.push(null);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Lazy Increment Stack Design.',
      algorithm: 'O(1) push, pop, and prefix increment.',
      timeComplexity: 'O(Q)',
      spaceComplexity: 'O(maxSize)',
      content: 'Lazy propagation on stack array.',
      referenceCode: `if idx > 0: inc[idx - 1] += inc[idx]`,
    },
    tags: ['Data Structures', 'Stack', 'Design'],
    testCases: [
      { input: `3, [["push",1],["push",2],["pop"],["push",2],["push",3],["push",4],["increment",5,100],["increment",2,100],["pop"],["pop"],["pop"],["pop"]]`, expectedOutput: `[null,null,2,null,null,null,null,null,103,202,201,-1]`, isHidden: false, order: 0 },
      { input: `1, [["push",5],["increment",1,10],["pop"]]`, expectedOutput: `[null,null,15]`, isHidden: false, order: 1 },
      { input: `2, [["pop"]]`, expectedOutput: `[-1]`, isHidden: true, order: 2 },
    ],
  },

  // 8. Longest Subarray with Absolute Diff Limit
  {
    title: 'Longest Subarray With Absolute Diff Limit',
    slug: 'longest-subarray-with-absolute-diff-limit',
    description: `Given nums and integer limit, return the length of the longest non-empty subarray where |a - b| <= limit for all pairs.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 10^5`,
    inputFormat: `nums, limit`,
    outputFormat: `An integer representing max length.`,
    sampleInput: `[8,2,4,7], 4`,
    sampleOutput: `2`,
    points: 150,
    hints: ['Two monotonic deques tracking min and max in current sliding window.'],
    codeTemplates: {
      python: `class Solution:\n    def longestSubarray(self, nums: list, limit: int) -> int:\n        pass`,
      javascript: `class Solution {\n    longestSubarray(nums, limit) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def longestSubarray(self, nums: list, limit: int) -> int:
        from collections import deque
        min_deque = deque()
        max_deque = deque()
        l = 0
        ans = 0
        for r, x in enumerate(nums):
            while min_deque and min_deque[-1] > x: min_deque.pop()
            min_deque.append(x)
            while max_deque and max_deque[-1] < x: max_deque.pop()
            max_deque.append(x)
            while max_deque[0] - min_deque[0] > limit:
                if min_deque[0] == nums[l]: min_deque.popleft()
                if max_deque[0] == nums[l]: max_deque.popleft()
                l += 1
            ans = max(ans, r - l + 1)
        return ans`,
      javascript: `class Solution {
    longestSubarray(nums, limit) {
        const minDeque = [], maxDeque = [];
        let l = 0, ans = 0;
        for (let r = 0; r < nums.length; r++) {
            const x = nums[r];
            while (minDeque.length > 0 && minDeque[minDeque.length - 1] > x) minDeque.pop();
            minDeque.push(x);
            while (maxDeque.length > 0 && maxDeque[maxDeque.length - 1] < x) maxDeque.pop();
            maxDeque.push(x);
            while (maxDeque[0] - minDeque[0] > limit) {
                if (minDeque[0] === nums[l]) minDeque.shift();
                if (maxDeque[0] === nums[l]) maxDeque.shift();
                l++;
            }
            ans = Math.max(ans, r - l + 1);
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Dual Monotonic Deque Sliding Window.',
      algorithm: 'Linear time min/max range constraint tracking.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Sliding window with monotonic queue boundaries.',
      referenceCode: `while max_deque[0] - min_deque[0] > limit: l += 1`,
    },
    tags: ['Data Structures', 'Sliding Window', 'Monotonic Queue'],
    testCases: [
      { input: `[8,2,4,7], 4`, expectedOutput: `2`, isHidden: false, order: 0 },
      { input: `[10,1,2,4,7,2], 5`, expectedOutput: `4`, isHidden: false, order: 1 },
      { input: `[4,2,2,2,4,4,2,2], 0`, expectedOutput: `3`, isHidden: true, order: 2 },
    ],
  },

  // 9. Range Frequency Queries Binary Search
  {
    title: 'Range Frequency Queries Binary Search',
    slug: 'range-frequency-queries-binary-search',
    description: `Given array arr, support query(left, right, value) returning frequency of value in subarray arr[left..right].`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `arr.length <= 10^5, queries <= 10^5`,
    inputFormat: `arr, queries`,
    outputFormat: `A list of frequencies.`,
    sampleInput: `[12,33,4,56,22,2,34,33,22,12,34,56], [[1,2,4],[0,11,33],[2,8,22]]`,
    sampleOutput: `[1,2,2]`,
    points: 150,
    hints: ['Store occurrence indices for each value and use bisect_left / bisect_right.'],
    codeTemplates: {
      python: `class Solution:\n    def rangeFreqQuery(self, arr: list, queries: list) -> list:\n        pass`,
      javascript: `class Solution {\n    rangeFreqQuery(arr, queries) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def rangeFreqQuery(self, arr: list, queries: list) -> list:
        from collections import defaultdict
        import bisect
        pos = defaultdict(list)
        for i, x in enumerate(arr): pos[x].append(i)
        res = []
        for l, r, v in queries:
            lst = pos[v]
            if not lst: res.append(0)
            else:
                right_idx = bisect.bisect_right(lst, r)
                left_idx = bisect.bisect_left(lst, l)
                res.append(right_idx - left_idx)
        return res`,
      javascript: `class Solution {
    rangeFreqQuery(arr, queries) {
        const pos = new Map();
        for (let i = 0; i < arr.length; i++) {
            if (!pos.has(arr[i])) pos.set(arr[i], []);
            pos.get(arr[i]).push(i);
        }
        function bisectLeft(list, val) {
            let lo = 0, hi = list.length;
            while (lo < hi) {
                const mid = Math.floor((lo + hi) / 2);
                if (list[mid] < val) lo = mid + 1; else hi = mid;
            }
            return lo;
        }
        function bisectRight(list, val) {
            let lo = 0, hi = list.length;
            while (lo < hi) {
                const mid = Math.floor((lo + hi) / 2);
                if (list[mid] <= val) lo = mid + 1; else hi = mid;
            }
            return lo;
        }
        return queries.map(([l, r, v]) => {
            const list = pos.get(v);
            if (!list) return 0;
            return bisectRight(list, r) - bisectLeft(list, l);
        });
    }
}`,
    },
    editorial: {
      approach: 'Positional Index Mapping + Binary Search.',
      algorithm: 'O(log N) frequency queries on static array.',
      timeComplexity: 'O(N + Q log N)',
      spaceComplexity: 'O(N)',
      content: 'Binary search over positional index lists.',
      referenceCode: `bisect_right(lst, r) - bisect_left(lst, l)`,
    },
    tags: ['Data Structures', 'Binary Search', 'Hash Table'],
    testCases: [
      { input: `[12,33,4,56,22,2,34,33,22,12,34,56], [[1,2,4],[0,11,33],[2,8,22]]`, expectedOutput: `[1,2,2]`, isHidden: false, order: 0 },
      { input: `[1,1,1,1], [[0,3,1],[1,2,1],[0,0,2]]`, expectedOutput: `[4,2,0]`, isHidden: false, order: 1 },
      { input: `[5], [[0,0,5],[0,0,3]]`, expectedOutput: `[1,0]`, isHidden: true, order: 2 },
    ],
  },

  // 10. Online Majority Element in Subarray
  {
    title: 'Online Majority Element in Subarray',
    slug: 'online-majority-element-in-subarray',
    description: `Given array arr, query(left, right, threshold) returns the element with >= threshold occurrences in arr[left..right], or -1.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `arr.length <= 2*10^4, queries <= 10^4`,
    inputFormat: `arr, queries`,
    outputFormat: `A list of majority element answers.`,
    sampleInput: `[1,1,2,2,1,1], [[0,5,4],[0,3,3],[2,3,2]]`,
    sampleOutput: `[1,-1,2]`,
    points: 200,
    hints: ['Random sampling with binary search verification.'],
    codeTemplates: {
      python: `class Solution:\n    def majorityQueries(self, arr: list, queries: list) -> list:\n        pass`,
      javascript: `class Solution {\n    majorityQueries(arr, queries) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def majorityQueries(self, arr: list, queries: list) -> list:
        from collections import defaultdict
        import bisect, random
        pos = defaultdict(list)
        for i, x in enumerate(arr): pos[x].append(i)
        res = []
        for l, r, threshold in queries:
            ans = -1
            length = r - l + 1
            # Try 20 random samples
            for _ in range(20):
                idx = random.randint(l, r)
                val = arr[idx]
                lst = pos[val]
                count = bisect.bisect_right(lst, r) - bisect.bisect_left(lst, l)
                if count >= threshold:
                    ans = val
                    break
            res.append(ans)
        return res`,
      javascript: `class Solution {
    majorityQueries(arr, queries) {
        const pos = new Map();
        for (let i = 0; i < arr.length; i++) {
            if (!pos.has(arr[i])) pos.set(arr[i], []);
            pos.get(arr[i]).push(i);
        }
        function countFreq(val, l, r) {
            const list = pos.get(val);
            if (!list) return 0;
            let lo = 0, hi = list.length;
            while (lo < hi) {
                const mid = Math.floor((lo + hi) / 2);
                if (list[mid] < l) lo = mid + 1; else hi = mid;
            }
            const leftIdx = lo;
            lo = 0; hi = list.length;
            while (lo < hi) {
                const mid = Math.floor((lo + hi) / 2);
                if (list[mid] <= r) lo = mid + 1; else hi = mid;
            }
            return lo - leftIdx;
        }
        return queries.map(([l, r, threshold]) => {
            let ans = -1;
            for (let t = 0; t < 20; t++) {
                const randIdx = l + Math.floor(Math.random() * (r - l + 1));
                const val = arr[randIdx];
                if (countFreq(val, l, r) >= threshold) {
                    ans = val; break;
                }
            }
            return ans;
        });
    }
}`,
    },
    editorial: {
      approach: 'Random Sampling + Binary Search Verification.',
      algorithm: 'With majority >= threshold, 20 random samples find the majority with probability >= 1 - (1/2)^20.',
      timeComplexity: 'O(Q * K log N)',
      spaceComplexity: 'O(N)',
      content: 'Monte Carlo majority discovery.',
      referenceCode: `if count >= threshold: ans = val; break`,
    },
    tags: ['Data Structures', 'Binary Search', 'Randomized'],
    testCases: [
      { input: `[1,1,2,2,1,1], [[0,5,4],[0,3,3],[2,3,2]]`, expectedOutput: `[1,-1,2]`, isHidden: false, order: 0 },
      { input: `[2,2,2,2], [[0,3,3],[1,2,2]]`, expectedOutput: `[2,2]`, isHidden: false, order: 1 },
      { input: `[1,2,3,4], [[0,3,3]]`, expectedOutput: `[-1]`, isHidden: true, order: 2 },
    ],
  },

  // 11. Count Submatrices with All Ones
  {
    title: 'Count Submatrices With All Ones',
    slug: 'count-submatrices-with-all-ones',
    description: `Given an m x n binary matrix mat, return the number of submatrices that have all ones.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= m, n <= 150\nmat[i][j] in {0, 1}`,
    inputFormat: `mat`,
    outputFormat: `An integer representing count.`,
    sampleInput: `[[1,0,1],[1,1,0],[1,1,0]]`,
    sampleOutput: `13`,
    points: 150,
    hints: ['Compute histogram height for each cell, then use monotonic stack.'],
    codeTemplates: {
      python: `class Solution:\n    def numSubmat(self, mat: list) -> int:\n        pass`,
      javascript: `class Solution {\n    numSubmat(mat) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def numSubmat(self, mat: list) -> int:
        m, n = len(mat), len(mat[0])
        h = [0] * n
        ans = 0
        for i in range(m):
            for j in range(n):
                h[j] = h[j] + 1 if mat[i][j] == 1 else 0
            stack = []
            sum_row = [0] * n
            for j in range(n):
                while stack and h[stack[-1]] >= h[j]: stack.pop()
                if stack:
                    p = stack[-1]
                    sum_row[j] = sum_row[p] + h[j] * (j - p)
                else:
                    sum_row[j] = h[j] * (j + 1)
                stack.append(j)
                ans += sum_row[j]
        return ans`,
      javascript: `class Solution {
    numSubmat(mat) {
        const m = mat.length, n = mat[0].length;
        const h = Array(n).fill(0);
        let ans = 0;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) h[j] = mat[i][j] === 1 ? h[j] + 1 : 0;
            const stack = [];
            const sumRow = Array(n).fill(0);
            for (let j = 0; j < n; j++) {
                while (stack.length > 0 && h[stack[stack.length - 1]] >= h[j]) stack.pop();
                if (stack.length > 0) {
                    const p = stack[stack.length - 1];
                    sumRow[j] = sumRow[p] + h[j] * (j - p);
                } else {
                    sumRow[j] = h[j] * (j + 1);
                }
                stack.push(j);
                ans += sumRow[j];
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Monotonic Stack Histogram Counting.',
      algorithm: '2D matrix converted to histogram height array, counted via monotonic stack.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(N)',
      content: 'Dynamic row-by-row histogram contribution accumulation.',
      referenceCode: `sum_row[j] = sum_row[p] + h[j] * (j - p)`,
    },
    tags: ['Data Structures', 'Monotonic Stack', 'Matrix'],
    testCases: [
      { input: `[[1,0,1],[1,1,0],[1,1,0]]`, expectedOutput: `13`, isHidden: false, order: 0 },
      { input: `[[0,1,1,0],[0,1,1,1],[1,1,1,0]]`, expectedOutput: `24`, isHidden: false, order: 1 },
      { input: `[[1,1],[1,1]]`, expectedOutput: `9`, isHidden: true, order: 2 },
    ],
  },

  // 12. Treap Cartesian Tree Construction
  {
    title: 'Cartesian Tree Inorder and Min-Heap Construction',
    slug: 'cartesian-tree-inorder-and-min-heap-construction',
    description: `Given array nums, return the level-order representation of its Cartesian Tree (in-order traversal equals nums, and parents are <= children min-heap).`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 1000`,
    inputFormat: `nums`,
    outputFormat: `A list representing root value.`,
    sampleInput: `[3,2,6,1,9]`,
    sampleOutput: `1`,
    points: 200,
    hints: ['Linear time construction using monotonic stack.'],
    codeTemplates: {
      python: `class Solution:\n    def buildCartesianTree(self, nums: list) -> int:\n        pass`,
      javascript: `class Solution {\n    buildCartesianTree(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def buildCartesianTree(self, nums: list) -> int:
        # Min element is root of min-heap Cartesian tree
        return min(nums)`,
      javascript: `class Solution {
    buildCartesianTree(nums) {
        return Math.min(...nums);
    }
}`,
    },
    editorial: {
      approach: 'Cartesian Tree Root Identification.',
      algorithm: 'Min element forms tree root.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Linear scan.',
      referenceCode: `return min(nums)`,
    },
    tags: ['Data Structures', 'Tree', 'Monotonic Stack'],
    testCases: [
      { input: `[3,2,6,1,9]`, expectedOutput: `1`, isHidden: false, order: 0 },
      { input: `[5,10,15]`, expectedOutput: `5`, isHidden: false, order: 1 },
      { input: `[100]`, expectedOutput: `100`, isHidden: true, order: 2 },
    ],
  },

  // 13. Disjoint Set with Size and Minimum Element
  {
    title: 'Disjoint Set With Component Size and Min Value',
    slug: 'disjoint-set-with-component-size-and-min-value',
    description: `Given n elements (1 to n), support operations: union(u, v), get_size(u), and get_min(u).`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n <= 10^5, operations <= 10^5`,
    inputFormat: `n, operations`,
    outputFormat: `A list of results.`,
    sampleInput: `5, [["union",1,2],["union",2,3],["getSize",1],["getMin",2],["getMin",4]]`,
    sampleOutput: `[3,1,4]`,
    points: 150,
    hints: ['DSU maintaining size and min arrays.'],
    codeTemplates: {
      python: `class Solution:\n    def executeOperations(self, n: int, operations: list) -> list:\n        pass`,
      javascript: `class Solution {\n    executeOperations(n, operations) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def executeOperations(self, n: int, operations: list) -> list:
        parent = list(range(n + 1))
        size = [1] * (n + 1)
        min_elem = list(range(n + 1))
        def find(x):
            if parent[x] == x: return x
            parent[x] = find(parent[x])
            return parent[x]
        def union(u, v):
            ru, rv = find(u), find(v)
            if ru != rv:
                parent[ru] = rv
                size[rv] += size[ru]
                min_elem[rv] = min(min_elem[rv], min_elem[ru])
        res = []
        for op in operations:
            if op[0] == "union":
                union(op[1], op[2])
            elif op[0] == "getSize":
                res.append(size[find(op[1])])
            elif op[0] == "getMin":
                res.append(min_elem[find(op[1])])
        return res`,
      javascript: `class Solution {
    executeOperations(n, operations) {
        const parent = Array.from({ length: n + 1 }, (_, i) => i);
        const size = Array(n + 1).fill(1);
        const minElem = Array.from({ length: n + 1 }, (_, i) => i);
        function find(x) {
            if (parent[x] === x) return x;
            parent[x] = find(parent[x]);
            return parent[x];
        }
        function union(u, v) {
            const ru = find(u), rv = find(v);
            if (ru !== rv) {
                parent[ru] = rv;
                size[rv] += size[ru];
                minElem[rv] = Math.min(minElem[rv], minElem[ru]);
            }
        }
        const res = [];
        for (const op of operations) {
            if (op[0] === "union") union(op[1], op[2]);
            else if (op[0] === "getSize") res.push(size[find(op[1])]);
            else if (op[0] === "getMin") res.push(minElem[find(op[1])]);
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Augmented Disjoint Set Union.',
      algorithm: 'Maintain size and min along with parent pointers.',
      timeComplexity: 'O(Q * alpha(N))',
      spaceComplexity: 'O(N)',
      content: 'Standard DSU augmentation.',
      referenceCode: `min_elem[rv] = min(min_elem[rv], min_elem[ru])`,
    },
    tags: ['Data Structures', 'Union Find'],
    testCases: [
      { input: `5, [["union",1,2],["union",2,3],["getSize",1],["getMin",2],["getMin",4]]`, expectedOutput: `[3,1,4]`, isHidden: false, order: 0 },
      { input: `3, [["getSize",1],["getMin",1]]`, expectedOutput: `[1,1]`, isHidden: false, order: 1 },
      { input: `4, [["union",4,2],["getMin",4]]`, expectedOutput: `[2]`, isHidden: true, order: 2 },
    ],
  },

  // 14. Next Greater Element II Circular Array
  {
    title: 'Next Greater Element Circular Array II',
    slug: 'next-greater-element-circular-array-ii',
    description: `Given a circular integer array nums, return the next greater number for every element. If no greater element exists, return -1.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 10^4`,
    inputFormat: `nums`,
    outputFormat: `A list of next greater elements.`,
    sampleInput: `[1,2,1]`,
    sampleOutput: `[2,-1,2]`,
    points: 150,
    hints: ['Loop through array twice (2*N iterations) using monotonic stack with modulo arithmetic.'],
    codeTemplates: {
      python: `class Solution:\n    def nextGreaterElements(self, nums: list) -> list:\n        pass`,
      javascript: `class Solution {\n    nextGreaterElements(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def nextGreaterElements(self, nums: list) -> list:
        n = len(nums)
        res = [-1] * n
        stack = []
        for i in range(2 * n - 1, -1, -1):
            idx = i % n
            while stack and stack[-1] <= nums[idx]: stack.pop()
            if stack and i < n: res[idx] = stack[-1]
            stack.append(nums[idx])
        return res`,
      javascript: `class Solution {
    nextGreaterElements(nums) {
        const n = nums.length;
        const res = Array(n).fill(-1);
        const stack = [];
        for (let i = 2 * n - 1; i >= 0; i--) {
            const idx = i % n;
            while (stack.length > 0 && stack[stack.length - 1] <= nums[idx]) stack.pop();
            if (stack.length > 0 && i < n) res[idx] = stack[stack.length - 1];
            stack.push(nums[idx]);
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Monotonic Stack on Circular 2*N Array.',
      algorithm: 'Two-pass right-to-left scan maintaining monotonic stack.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Circular indexing via modulo arithmetic.',
      referenceCode: `while stack and stack[-1] <= nums[idx]: stack.pop()`,
    },
    tags: ['Data Structures', 'Monotonic Stack', 'Array'],
    testCases: [
      { input: `[1,2,1]`, expectedOutput: `[2,-1,2]`, isHidden: false, order: 0 },
      { input: `[1,2,3,4,3]`, expectedOutput: `[2,3,4,-1,4]`, isHidden: false, order: 1 },
      { input: `[5]`, expectedOutput: `[-1]`, isHidden: true, order: 2 },
    ],
  },

  // 15. Range Minimum Query with Square Root Decomposition
  {
    title: 'Range Sum Query with Sqrt Decomposition',
    slug: 'range-sum-query-with-sqrt-decomposition',
    description: `Given array nums, implement Square Root Decomposition supporting point update [update, i, val] and range sum [sum, l, r].`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n <= 10^5, queries <= 10^5`,
    inputFormat: `nums, operations`,
    outputFormat: `A list of integers.`,
    sampleInput: `[1,3,5,7,9,11], [["sum",1,4],["update",2,10],["sum",1,4]]`,
    sampleOutput: `[24,29]`,
    points: 150,
    hints: ['Divide array into blocks of size B = sqrt(N).'],
    codeTemplates: {
      python: `class Solution:\n    def sqrtRangeSum(self, nums: list, operations: list) -> list:\n        pass`,
      javascript: `class Solution {\n    sqrtRangeSum(nums, operations) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def sqrtRangeSum(self, nums: list, operations: list) -> list:
        import math
        n = len(nums)
        b_size = max(1, int(math.isqrt(n)))
        num_blocks = (n + b_size - 1) // b_size
        blocks = [0] * num_blocks
        for i in range(n):
            blocks[i // b_size] += nums[i]
        res = []
        for op in operations:
            if op[0] == "update":
                _, idx, val = op
                b_idx = idx // b_size
                blocks[b_idx] += val - nums[idx]
                nums[idx] = val
            elif op[0] == "sum":
                _, l, r = op
                s = 0
                b_start = l // b_size
                b_end = r // b_size
                if b_start == b_end:
                    s = sum(nums[l:r + 1])
                else:
                    s += sum(nums[l:(b_start + 1) * b_size])
                    for b in range(b_start + 1, b_end):
                        s += blocks[b]
                    s += sum(nums[b_end * b_size:r + 1])
                res.append(s)
        return res`,
      javascript: `class Solution {
    sqrtRangeSum(nums, operations) {
        const n = nums.length;
        const bSize = Math.max(1, Math.floor(Math.sqrt(n)));
        const numBlocks = Math.ceil(n / bSize);
        const blocks = Array(numBlocks).fill(0);
        for (let i = 0; i < n; i++) blocks[Math.floor(i / bSize)] += nums[i];
        const res = [];
        for (const op of operations) {
            if (op[0] === "update") {
                const [, idx, val] = op;
                const bIdx = Math.floor(idx / bSize);
                blocks[bIdx] += val - nums[idx];
                nums[idx] = val;
            } else if (op[0] === "sum") {
                const [, l, r] = op;
                let s = 0;
                const bStart = Math.floor(l / bSize);
                const bEnd = Math.floor(r / bSize);
                if (bStart === bEnd) {
                    for (let i = l; i <= r; i++) s += nums[i];
                } else {
                    for (let i = l; i < (bStart + 1) * bSize; i++) s += nums[i];
                    for (let b = bStart + 1; b < bEnd; b++) s += blocks[b];
                    for (let i = bEnd * bSize; i <= r; i++) s += nums[i];
                }
                res.push(s);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Square Root Block Decomposition.',
      algorithm: 'O(1) update and O(sqrt(N)) range sum.',
      timeComplexity: 'O(Q sqrt(N))',
      spaceComplexity: 'O(N)',
      content: 'Classic sqrt decomposition block sum caching.',
      referenceCode: `s += blocks[b]`,
    },
    tags: ['Data Structures', 'Range Queries', 'Sqrt Decomposition'],
    testCases: [
      { input: `[1,3,5,7,9,11], [["sum",1,4],["update",2,10],["sum",1,4]]`, expectedOutput: `[24,29]`, isHidden: false, order: 0 },
      { input: `[2,4,6], [["sum",0,2],["update",1,10],["sum",0,2]]`, expectedOutput: `[12,18]`, isHidden: false, order: 1 },
      { input: `[100], [["sum",0,0]]`, expectedOutput: `[100]`, isHidden: true, order: 2 },
    ],
  },

  // 16. Maximum Frequency Stack
  {
    title: 'Maximum Frequency Stack Frequency Groups Design',
    slug: 'max-frequency-stack-frequency-groups',
    description: `Design a stack-like data structure that pushes elements and pops the most frequent element (breaking ties by most recently added).`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `operations <= 2*10^4`,
    inputFormat: `operations`,
    outputFormat: `A list of results.`,
    sampleInput: `[["push",5],["push",7],["push",5],["push",7],["push",4],["push",5],["pop"],["pop"],["pop"],["pop"]]`,
    sampleOutput: `[null,null,null,null,null,null,5,7,5,4]`,
    points: 200,
    hints: ['Map frequencies to stacks of values having that frequency.'],
    codeTemplates: {
      python: `class Solution:\n    def executeOperations(self, operations: list) -> list:\n        pass`,
      javascript: `class Solution {\n    executeOperations(operations) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def executeOperations(self, operations: list) -> list:
        from collections import defaultdict
        freq = defaultdict(int)
        group = defaultdict(list)
        max_freq = 0
        res = []
        for op in operations:
            if op[0] == "push":
                val = op[1]
                f = freq[val] + 1
                freq[val] = f
                max_freq = max(max_freq, f)
                group[f].append(val)
                res.append(None)
            elif op[0] == "pop":
                val = group[max_freq].pop()
                freq[val] -= 1
                if not group[max_freq]:
                    max_freq -= 1
                res.append(val)
        return res`,
      javascript: `class Solution {
    executeOperations(operations) {
        const freq = new Map();
        const group = new Map();
        let maxFreq = 0;
        const res = [];
        for (const op of operations) {
            if (op[0] === "push") {
                const val = op[1];
                const f = (freq.get(val) || 0) + 1;
                freq.set(val, f);
                maxFreq = Math.max(maxFreq, f);
                if (!group.has(f)) group.set(f, []);
                group.get(f).push(val);
                res.push(null);
            } else if (op[0] === "pop") {
                const list = group.get(maxFreq);
                const val = list.pop();
                freq.set(val, freq.get(val) - 1);
                if (list.length === 0) maxFreq--;
                res.push(val);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Frequency Grouped Stacks.',
      algorithm: 'O(1) push and pop by grouping elements in frequency buckets.',
      timeComplexity: 'O(Q)',
      spaceComplexity: 'O(Q)',
      content: 'Standard FreqStack implementation.',
      referenceCode: `val = group[max_freq].pop()`,
    },
    tags: ['Data Structures', 'Stack', 'Hash Table', 'Design'],
    testCases: [
      { input: `[["push",5],["push",7],["push",5],["push",7],["push",4],["push",5],["pop"],["pop"],["pop"],["pop"]]`, expectedOutput: `[null,null,null,null,null,null,5,7,5,4]`, isHidden: false, order: 0 },
      { input: `[["push",1],["pop"]]`, expectedOutput: `[null,1]`, isHidden: false, order: 1 },
      { input: `[["push",2],["push",2],["pop"],["pop"]]`, expectedOutput: `[null,null,2,2]`, isHidden: true, order: 2 },
    ],
  },

  // 17. In-Memory File System Design
  {
    title: 'Design In-Memory File System Tree',
    slug: 'design-in-memory-file-system-tree',
    description: `Design an in-memory file system with ls, mkdir, addContentToFile, and readContentFromFile commands.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `operations <= 300`,
    inputFormat: `operations`,
    outputFormat: `A list of results.`,
    sampleInput: `[["ls","/"],["mkdir","/a/b/c"],["addContentToFile","/a/b/c/d","hello"],["ls","/"],["readContentFromFile","/a/b/c/d"]]`,
    sampleOutput: `[[],null,null,["a"],"hello"]`,
    points: 200,
    hints: ['Use Trie / Tree node hierarchy where each node has children dictionary and content string.'],
    codeTemplates: {
      python: `class Solution:\n    def executeOperations(self, operations: list) -> list:\n        pass`,
      javascript: `class Solution {\n    executeOperations(operations) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def executeOperations(self, operations: list) -> list:
        class Node:
            def __init__(self):
                self.children = {}
                self.is_file = False
                self.content = ""
        root = Node()
        def get_node(path):
            parts = [p for p in path.split('/') if p]
            cur = root
            for p in parts:
                if p not in cur.children:
                    cur.children[p] = Node()
                cur = cur.children[p]
            return cur, parts
        res = []
        for op in operations:
            name = op[0]
            if name == "ls":
                path = op[1]
                node, parts = get_node(path)
                if node.is_file:
                    res.append([parts[-1]])
                else:
                    res.append(sorted(node.children.keys()))
            elif name == "mkdir":
                get_node(op[1])
                res.append(None)
            elif name == "addContentToFile":
                path, content = op[1], op[2]
                node, _ = get_node(path)
                node.is_file = True
                node.content += content
                res.append(None)
            elif name == "readContentFromFile":
                path = op[1]
                node, _ = get_node(path)
                res.append(node.content)
        return res`,
      javascript: `class Solution {
    executeOperations(operations) {
        class Node {
            constructor() {
                this.children = new Map();
                this.isFile = false;
                this.content = "";
            }
        }
        const root = new Node();
        function getNode(path) {
            const parts = path.split('/').filter(Boolean);
            let cur = root;
            for (const p of parts) {
                if (!cur.children.has(p)) cur.children.set(p, new Node());
                cur = cur.children.get(p);
            }
            return [cur, parts];
        }
        const res = [];
        for (const op of operations) {
            const name = op[0];
            if (name === "ls") {
                const [node, parts] = getNode(op[1]);
                if (node.isFile) {
                    res.push([parts[parts.length - 1]]);
                } else {
                    res.push(Array.from(node.children.keys()).sort());
                }
            } else if (name === "mkdir") {
                getNode(op[1]);
                res.push(null);
            } else if (name === "addContentToFile") {
                const [node] = getNode(op[1]);
                node.isFile = true;
                node.content += op[2];
                res.push(null);
            } else if (name === "readContentFromFile") {
                const [node] = getNode(op[1]);
                res.push(node.content);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Trie Directory Hierarchy.',
      algorithm: 'Prefix path tree with file metadata storage.',
      timeComplexity: 'O(L + K log K)',
      spaceComplexity: 'O(Total Path Length)',
      content: 'Standard directory tree structure.',
      referenceCode: `cur.children[p] = Node()`,
    },
    tags: ['Data Structures', 'Trie', 'Design'],
    testCases: [
      { input: `[["ls","/"],["mkdir","/a/b/c"],["addContentToFile","/a/b/c/d","hello"],["ls","/"],["readContentFromFile","/a/b/c/d"]]`, expectedOutput: `[[],null,null,["a"],"hello"]`, isHidden: false, order: 0 },
      { input: `[["mkdir","/home"],["ls","/"]]`, expectedOutput: `[null,["home"]]`, isHidden: false, order: 1 },
      { input: `[["addContentToFile","/test.txt","code"],["readContentFromFile","/test.txt"]]`, expectedOutput: `[null,"code"]`, isHidden: true, order: 2 },
    ],
  },

  // 18. Design Twitter Feed
  {
    title: 'Design Simplified Twitter Feed Service',
    slug: 'design-simplified-twitter-feed-service',
    description: `Design a simplified Twitter where users can post tweets, follow/unfollow, and get the 10 most recent tweets in user news feed.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `operations <= 1000`,
    inputFormat: `operations`,
    outputFormat: `A list of results.`,
    sampleInput: `[["postTweet",1,5],["getNewsFeed",1],["follow",1,2],["postTweet",2,6],["getNewsFeed",1],["unfollow",1,2],["getNewsFeed",1]]`,
    sampleOutput: `[null,[5],null,null,[6,5],null,[5]]`,
    points: 150,
    hints: ['Track global timestamp for each tweet and merge top-10 using min-heap / sorted lists.'],
    codeTemplates: {
      python: `class Solution:\n    def executeOperations(self, operations: list) -> list:\n        pass`,
      javascript: `class Solution {\n    executeOperations(operations) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def executeOperations(self, operations: list) -> list:
        from collections import defaultdict
        following = defaultdict(set)
        tweets = defaultdict(list)
        time = 0
        res = []
        for op in operations:
            name = op[0]
            if name == "postTweet":
                u, t_id = op[1], op[2]
                time += 1
                tweets[u].append((time, t_id))
                res.append(None)
            elif name == "getNewsFeed":
                u = op[1]
                feed_users = following[u] | {u}
                all_tweets = []
                for fu in feed_users:
                    all_tweets.extend(tweets[fu])
                all_tweets.sort(key=lambda x: -x[0])
                res.append([t[1] for t in all_tweets[:10]])
            elif name == "follow":
                following[op[1]].add(op[2])
                res.append(None)
            elif name == "unfollow":
                following[op[1]].discard(op[2])
                res.append(None)
        return res`,
      javascript: `class Solution {
    executeOperations(operations) {
        const following = new Map();
        const tweets = new Map();
        let time = 0;
        const res = [];
        for (const op of operations) {
            const name = op[0];
            if (name === "postTweet") {
                const u = op[1], tId = op[2];
                time++;
                if (!tweets.has(u)) tweets.set(u, []);
                tweets.get(u).push([time, tId]);
                res.push(null);
            } else if (name === "getNewsFeed") {
                const u = op[1];
                const feedUsers = new Set(following.get(u) || []);
                feedUsers.add(u);
                const allTweets = [];
                for (const fu of feedUsers) {
                    for (const t of (tweets.get(fu) || [])) allTweets.push(t);
                }
                allTweets.sort((a, b) => b[0] - a[0]);
                res.push(allTweets.slice(0, 10).map(t => t[1]));
            } else if (name === "follow") {
                if (!following.has(op[1])) following.set(op[1], new Set());
                following.get(op[1]).add(op[2]);
                res.push(null);
            } else if (name === "unfollow") {
                if (following.has(op[1])) following.get(op[1]).delete(op[2]);
                res.push(null);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Hash Table Feed Aggregation.',
      algorithm: 'User follow relationships + timestamped tweet retrieval.',
      timeComplexity: 'O(Q * F log F)',
      spaceComplexity: 'O(Tweets + Follows)',
      content: 'Standard social network fan-out on read.',
      referenceCode: `all_tweets.sort(key=lambda x: -x[0])`,
    },
    tags: ['Data Structures', 'Hash Table', 'Design'],
    testCases: [
      { input: `[["postTweet",1,5],["getNewsFeed",1],["follow",1,2],["postTweet",2,6],["getNewsFeed",1],["unfollow",1,2],["getNewsFeed",1]]`, expectedOutput: `[null,[5],null,null,[6,5],null,[5]]`, isHidden: false, order: 0 },
      { input: `[["postTweet",1,10],["getNewsFeed",1]]`, expectedOutput: `[null,[10]]`, isHidden: false, order: 1 },
      { input: `[["getNewsFeed",1]]`, expectedOutput: `[[]]`, isHidden: true, order: 2 },
    ],
  },

  // 19. Range Sum Query 2D Immutable
  {
    title: 'Range Sum Query 2D Immutable Prefix Sums',
    slug: 'range-sum-query-2d-immutable-prefix-sums',
    description: `Given a 2D matrix, calculate the sum of elements inside the rectangle defined by (row1, col1) to (row2, col2) in O(1) time.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `m, n <= 200, queries <= 10^4`,
    inputFormat: `matrix, queries`,
    outputFormat: `A list of region sums.`,
    sampleInput: `[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]], [[2,1,4,3],[1,1,2,2],[1,2,2,4]]`,
    sampleOutput: `[8,11,12]`,
    points: 150,
    hints: ['Precompute 2D prefix sums: dp[i][j] = matrix[i-1][j-1] + dp[i-1][j] + dp[i][j-1] - dp[i-1][j-1].'],
    codeTemplates: {
      python: `class Solution:\n    def sumRegionQueries(self, matrix: list, queries: list) -> list:\n        pass`,
      javascript: `class Solution {\n    sumRegionQueries(matrix, queries) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def sumRegionQueries(self, matrix: list, queries: list) -> list:
        if not matrix or not matrix[0]: return []
        m, n = len(matrix), len(matrix[0])
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m):
            for j in range(n):
                dp[i + 1][j + 1] = matrix[i][j] + dp[i][j + 1] + dp[i + 1][j] - dp[i][j]
        res = []
        for r1, c1, r2, c2 in queries:
            s = dp[r2 + 1][c2 + 1] - dp[r1][c2 + 1] - dp[r2 + 1][c1] + dp[r1][c1]
            res.append(s)
        return res`,
      javascript: `class Solution {
    sumRegionQueries(matrix, queries) {
        if (!matrix || matrix.length === 0) return [];
        const m = matrix.length, n = matrix[0].length;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                dp[i + 1][j + 1] = matrix[i][j] + dp[i][j + 1] + dp[i + 1][j] - dp[i][j];
            }
        }
        return queries.map(([r1, c1, r2, c2]) => {
            return dp[r2 + 1][c2 + 1] - dp[r1][c2 + 1] - dp[r2 + 1][c1] + dp[r1][c1];
        });
    }
}`,
    },
    editorial: {
      approach: '2D Inclusion-Exclusion Prefix Sums.',
      algorithm: 'O(1) rectangular sum retrieval.',
      timeComplexity: 'O(M * N + Q)',
      spaceComplexity: 'O(M * N)',
      content: '2D integral image / inclusion-exclusion principle.',
      referenceCode: `dp[r2 + 1][c2 + 1] - dp[r1][c2 + 1] - dp[r2 + 1][c1] + dp[r1][c1]`,
    },
    tags: ['Data Structures', 'Matrix', 'Prefix Sum'],
    testCases: [
      { input: `[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]], [[2,1,4,3],[1,1,2,2],[1,2,2,4]]`, expectedOutput: `[8,11,12]`, isHidden: false, order: 0 },
      { input: `[[1,2],[3,4]], [[0,0,1,1],[0,0,0,0],[1,1,1,1]]`, expectedOutput: `[10,1,4]`, isHidden: false, order: 1 },
      { input: `[[5]], [[0,0,0,0]]`, expectedOutput: `[5]`, isHidden: true, order: 2 },
    ],
  },
];
