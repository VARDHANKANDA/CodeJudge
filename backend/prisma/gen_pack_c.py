# PACK C: Advanced Data Structures & Range Queries (19 problems)

def register_c(add_p):
    # 1. Fenwick Tree Range Add Point Query
    add_p('pack-500-part-c', 'Fenwick Tree Range Add Point Query', 'fenwick-tree-range-add-point-query',
          'Given initial array nums of size n, support range additions [l, r, val] and point queries index.',
          'MEDIUM', 1000, 128, 'n <= 10^5, queries <= 10^5', 'nums, operations', 'List',
          '[1,2,3,4,5], [["add",1,3,2],["get",2],["add",0,4,1],["get",0]]', '[5,2]', 150,
          ['Use difference array representation in Binary Indexed Tree.'],
          '''class Solution:
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
        return res''',
          '''class Solution {
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
}''',
          'Difference Array Fenwick Tree', 'O(log N) range update and point query', 'O(Q log N)', 'O(N)',
          ['Data Structures', 'Binary Indexed Tree', 'Range Queries'],
          [('[1,2,3,4,5], [["add",1,3,2],["get",2],["add",0,4,1],["get",0]]', '[5,2]', False),
           ('[0,0,0], [["add",0,2,5],["get",1],["get",2]]', '[5,5]', False),
           ('[10], [["get",0],["add",0,0,3],["get",0]]', '[10,13]', True)]
    )

    # 2. Segment Tree Range XOR Query with Point Updates
    add_p('pack-500-part-c', 'Segment Tree Point Update Range XOR', 'segment-tree-point-update-range-xor',
          'Given array nums, process point update [update, idx, val] and range XOR queries [xor, l, r].',
          'MEDIUM', 1000, 128, 'n <= 10^5, queries <= 10^5', 'nums, operations', 'List',
          '[1,3,5,7,9], [["xor",1,3],["update",2,8],["xor",1,3]]', '[1,12]', 150,
          ['Segment tree maintaining bitwise XOR associative sum.'],
          '''class Solution:
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
        return res''',
          '''class Solution {
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
}''',
          'Segment Tree on XOR Group', 'O(log N) point update and range query', 'O(Q log N)', 'O(N)',
          ['Data Structures', 'Segment Tree', 'Bit Manipulation'],
          [('[1,3,5,7,9], [["xor",1,3],["update",2,8],["xor",1,3]]', '[1,12]', False),
           ('[4,8], [["xor",0,1],["update",0,0],["xor",0,1]]', '[12,8]', False),
           ('[7], [["xor",0,0]]', '[7]', True)]
    )

    # 3. Sparse Table Range GCD Queries
    add_p('pack-500-part-c', 'Sparse Table Range GCD Queries', 'sparse-table-range-gcd-queries',
          'Given static array nums, answer range greatest common divisor (GCD) queries [l, r] in O(1) time per query.',
          'MEDIUM', 1000, 128, 'n <= 10^5, queries <= 10^5', 'nums, queries', 'List',
          '[2,4,6,8,16], [[0,2],[1,3],[2,4],[0,4]]', '[2,2,2,2]', 150,
          ['Build Sparse Table for idempotent associative operator gcd.'],
          '''class Solution:
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
        return res''',
          '''class Solution {
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
}''',
          'Sparse Table Range GCD', 'O(1) static interval queries via idempotent overlap', 'O(N log N + Q)', 'O(N log N)',
          ['Data Structures', 'Sparse Table', 'Math'],
          [('[2,4,6,8,16], [[0,2],[1,3],[2,4],[0,4]]', '[2,2,2,2]', False),
           ('[12,18,24,36], [[0,1],[1,3],[0,3]]', '[6,6,6]', False),
           ('[17], [[0,0]]', '[17]', True)]
    )

    # 4. Monotonic Stack Sum of Subarray Minimums
    add_p('pack-500-part-c', 'Sum of Subarray Minimums Monotonic Stack', 'sum-of-subarray-minimums-monotonic-stack',
          'Given an array of integers arr, find the sum of min(b), where b ranges over every contiguous subarray of arr, modulo 10^9 + 7.',
          'MEDIUM', 1000, 128, '1 <= arr.length <= 3*10^4', 'arr', 'Integer',
          '[3,1,2,4]', '17', 150,
          ['For each element arr[i], find previous smaller and next smaller or equal element indices.'],
          '''class Solution:
    def sumSubarrayMins(self, arr: list) -> int:
        MOD = 10**9 + 7
        n = len(arr)
        left = [-1] * n
        right = [n] * n
        stack = []
        for i in range(n):
            while stack and arr[stack[-1]] >= arr[i]:
                stack.pop()
            left[i] = stack[-1] if stack else -1
            stack.append(i)
        stack = []
        for i in range(n - 1, -1, -1):
            while stack and arr[stack[-1]] > arr[i]:
                stack.pop()
            right[i] = stack[-1] if stack else n
            stack.append(i)
        ans = 0
        for i in range(n):
            count = (i - left[i]) * (right[i] - i)
            ans = (ans + arr[i] * count) % MOD
        return ans''',
          '''class Solution {
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
}''',
          'Monotonic Stack Subarray Contribution', 'Left and right span product calculation in O(N)', 'O(N)', 'O(N)',
          ['Data Structures', 'Monotonic Stack', 'Array'],
          [('[3,1,2,4]', '17', False), ('[11,81,94,43,3]', '444', False), ('[5]', '5', True)]
    )

    # 5. Monotonic Stack Sum of Subarray Ranges
    add_p('pack-500-part-c', 'Sum of Subarray Ranges Monotonic Stack', 'sum-of-subarray-ranges-monotonic-stack',
          'Given an integer array nums, return the sum of all subarray ranges (max(sub) - min(sub)).',
          'MEDIUM', 1000, 128, '1 <= nums.length <= 10^4', 'nums', 'Integer',
          '[1,2,3]', '4', 150,
          ['Range sum equals Sum of Subarray Maximums minus Sum of Subarray Minimums.'],
          '''class Solution:
    def subArrayRanges(self, nums: list) -> int:
        n = len(nums)
        # Sum of maximums
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
        # Sum of minimums
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
        return sum_max - sum_min''',
          '''class Solution {
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
}''',
          'Dual Monotonic Stack Range Difference', 'Sum(Max) - Sum(Min) contribution decomposition', 'O(N)', 'O(N)',
          ['Data Structures', 'Monotonic Stack', 'Array'],
          [('[1,2,3]', '4', False), ('[1,3,3]', '4', False), ('[4,-2,-3,4,1]', '59', True)]
    )

    # 6. Design Circular Deque
    add_p('pack-500-part-c', 'Design Circular Deque Ring Buffer', 'design-circular-deque-ring-buffer',
          'Design your implementation of the circular double-ended queue (deque) with fixed capacity k.',
          'MEDIUM', 1000, 128, '1 <= k <= 1000', 'k, operations', 'List',
          '3, [["insertLast",1],["insertLast",2],["insertFront",3],["insertFront",4],["getRear"],["isFull"],["deleteLast"],["insertFront",4],["getFront"]]', '[true,true,true,false,2,true,true,true,4]', 150,
          ['Array ring buffer with head and tail pointers.'],
          '''class Solution:
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
                if (head - 1 + cap) % cap == tail:
                    res.append(False)
                else:
                    head = (head - 1 + cap) % cap
                    buffer[head] = val
                    res.append(True)
            elif name == "insertLast":
                val = op[1]
                if (tail + 1) % cap == head:
                    res.append(False)
                else:
                    buffer[tail] = val
                    tail = (tail + 1) % cap
                    res.append(True)
            elif name == "deleteFront":
                if head == tail:
                    res.append(False)
                else:
                    head = (head + 1) % cap
                    res.append(True)
            elif name == "deleteLast":
                if head == tail:
                    res.append(False)
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
        return res''',
          '''class Solution {
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
}''',
          'Circular Array Ring Buffer Implementation', 'O(1) all double-ended queue operations', 'O(Q)', 'O(K)',
          ['Data Structures', 'Queue', 'Array', 'Design'],
          [('3, [["insertLast",1],["insertLast",2],["insertFront",3],["insertFront",4],["getRear"],["isFull"],["deleteLast"],["insertFront",4],["getFront"]]', '[true,true,true,false,2,true,true,true,4]', False),
           ('2, [["isEmpty"],["insertFront",1],["isEmpty"]]', '[true,true,false]', False),
           ('1, [["getFront"],["getRear"]]', '[-1,-1]', True)]
    )

    # 7. Design Custom Stack With Increment Operation
    add_p('pack-500-part-c', 'Design Custom Stack With Increment', 'design-custom-stack-with-increment',
          'Design a stack with maxSize and an increment(k, val) operation that adds val to bottom k elements in O(1).',
          'MEDIUM', 1000, 128, 'maxSize <= 1000', 'maxSize, operations', 'List',
          '3, [["push",1],["push",2],["pop"],["push",2],["push",3],["push",4],["increment",5,100],["increment",2,100],["pop"],["pop"],["pop"],["pop"]]', '[null,null,2,null,null,null,null,null,103,202,201,-1]', 150,
          ['Maintain lazy increments array propagated downward on pop.'],
          '''class Solution:
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
                if not stack:
                    res.append(-1)
                else:
                    idx = len(stack) - 1
                    val = stack.pop() + inc[idx]
                    if idx > 0:
                        inc[idx - 1] += inc[idx]
                    inc.pop()
                    res.append(val)
            elif name == "increment":
                k, val = op[1], op[2]
                idx = min(k, len(stack)) - 1
                if idx >= 0:
                    inc[idx] += val
                res.append(None)
        return res''',
          '''class Solution {
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
}''',
          'Lazy Increment Stack Design', 'O(1) push, pop, and prefix increment', 'O(Q)', 'O(maxSize)',
          ['Data Structures', 'Stack', 'Design'],
          [('3, [["push",1],["push",2],["pop"],["push",2],["push",3],["push",4],["increment",5,100],["increment",2,100],["pop"],["pop"],["pop"],["pop"]]', '[null,null,2,null,null,null,null,null,103,202,201,-1]', False),
           ('1, [["push",5],["increment",1,10],["pop"]]', '[null,null,15]', False),
           ('2, [["pop"]]', '[-1]', True)]
    )

    # 8. Longest Continuous Subarray With Absolute Diff Limit
    add_p('pack-500-part-c', 'Longest Subarray With Absolute Diff Limit', 'longest-subarray-with-absolute-diff-limit',
          'Given nums and integer limit, return the length of the longest non-empty subarray where |a - b| <= limit for all pairs.',
          'MEDIUM', 1000, 128, '1 <= nums.length <= 10^5', 'nums, limit', 'Integer',
          '[8,2,4,7], 4', '2', 150,
          ['Two monotonic deques tracking min and max in current sliding window.'],
          '''class Solution:
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
        return ans''',
          '''class Solution {
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
}''',
          'Dual Monotonic Deque Sliding Window', 'Linear time min/max range constraint tracking', 'O(N)', 'O(N)',
          ['Data Structures', 'Sliding Window', 'Monotonic Queue'],
          [('[8,2,4,7], 4', '2', False), ('[10,1,2,4,7,2], 5', '4', False), ('[4,2,2,2,4,4,2,2], 0', '3', True)]
    )

    # 9. Range Frequency Queries Binary Search Data Structure
    add_p('pack-500-part-c', 'Range Frequency Queries Binary Search', 'range-frequency-queries-binary-search',
          'Given array arr, support query(left, right, value) returning frequency of value in subarray arr[left..right].',
          'MEDIUM', 1000, 128, 'arr.length <= 10^5, queries <= 10^5', 'arr, queries', 'List',
          '[12,33,4,56,22,2,34,33,22,12,34,56], [[1,2,4],[0,11,33],[2,8,22]]', '[1,2,2]', 150,
          ['Store occurrence indices for each value and use bisect_left / bisect_right.'],
          '''class Solution:
    def rangeFreqQuery(self, arr: list, queries: list) -> list:
        from collections import defaultdict
        import bisect
        pos = defaultdict(list)
        for i, x in enumerate(arr): pos[x].append(i)
        res = []
        for l, r, v in queries:
            lst = pos[v]
            if not lst:
                res.append(0)
            else:
                right_idx = bisect.bisect_right(lst, r)
                left_idx = bisect.bisect_left(lst, l)
                res.append(right_idx - left_idx)
        return res''',
          '''class Solution {
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
}''',
          'Positional Index Mapping + Binary Search', 'O(log N) frequency queries on static array', 'O(N + Q log N)', 'O(N)',
          ['Data Structures', 'Binary Search', 'Hash Table'],
          [('[12,33,4,56,22,2,34,33,22,12,34,56], [[1,2,4],[0,11,33],[2,8,22]]', '[1,2,2]', False),
           ('[1,1,1,1], [[0,3,1],[1,2,1],[0,0,2]]', '[4,2,0]', False),
           ('[5], [[0,0,5],[0,0,3]]', '[1,0]', True)]
    )

print("Registered Pack C (9/19 problems).")
