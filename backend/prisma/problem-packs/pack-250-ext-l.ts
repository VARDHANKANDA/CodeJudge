import { Difficulty } from '@prisma/client';

export const pack250ExtLDefs = [
  {
    title: 'Range Sum Query Mutable Fenwick',
    slug: 'range-sum-query-mutable-fenwick',
    description: `Given an integer array $nums$, handle multiple queries of the following two types:
1. **Update** the value of an element in $nums$ at index $i$ to $val$.
2. **SumRange**: calculate the sum of the elements of $nums$ between indices $left$ and $right$ inclusive (i.e. $nums[left] + nums[left + 1] + \\dots + nums[right]$).

Implement a class/solution that takes $nums$ and a sequence of operations $operations$ formatted as \`["update", index, val]\` or \`["sumRange", left, right]\` and returns an array of results for each \`sumRange\` operation.

### Constraints
- $1 \\le nums.length \\le 3 \\times 10^4$
- $-100 \\le nums[i] \\le 100$
- $0 \\le index < nums.length$
- $-100 \\le val \\le 100$
- $0 \\le left \\le right < nums.length$
- At most $3 \\times 10^4$ calls will be made to $operations$.

### Input Format
- An integer array $nums$ and a list of operation queries.

### Output Format
- Return an array containing the results of all \`sumRange\` queries.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['data-structures', 'fenwick-tree', 'binary-indexed-tree'],
    roadmapLevel: 3,
    roadmapTopic: 'advanced-data-structures',
    templates: {
      python: `class Solution:\n    def processQueries(self, nums: list[int], queries: list) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    processQueries(nums, queries) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def processQueries(self, nums: list[int], queries: list) -> list[int]:
        n = len(nums)
        tree = [0] * (n + 1)
        
        def add(i, delta):
            i += 1
            while i <= n:
                tree[i] += delta
                i += i & (-i)
                
        def query(i):
            i += 1
            s = 0
            while i > 0:
                s += tree[i]
                i -= i & (-i)
            return s
            
        for i, v in enumerate(nums):
            add(i, v)
            
        cur_nums = list(nums)
        ans = []
        for op in queries:
            if op[0] == "update":
                idx, val = op[1], op[2]
                delta = val - cur_nums[idx]
                cur_nums[idx] = val
                add(idx, delta)
            elif op[0] == "sumRange":
                left, right = op[1], op[2]
                ans.append(query(right) - query(left - 1))
                
        return ans`,
      javascript: `class Solution {\n    processQueries(nums, queries) {\n        const n = nums.length;\n        const tree = new Array(n + 1).fill(0);\n        \n        const add = (i, delta) => {\n            for (let idx = i + 1; idx <= n; idx += idx & -idx) {\n                tree[idx] += delta;\n            }\n        };\n        \n        const query = (i) => {\n            let s = 0;\n            for (let idx = i + 1; idx > 0; idx -= idx & -idx) {\n                s += tree[idx];\n            }\n            return s;\n        };\n        \n        for (let i = 0; i < n; i++) {\n            add(i, nums[i]);\n        }\n        \n        const curNums = [...nums];\n        const ans = [];\n        for (const op of queries) {\n            if (op[0] === 'update') {\n                const [_, idx, val] = op;\n                const delta = val - curNums[idx];\n                curNums[idx] = val;\n                add(idx, delta);\n            } else if (op[0] === 'sumRange') {\n                const [_, left, right] = op;\n                ans.push(query(right) - query(left - 1));\n            }\n        }\n        return ans;\n    }\n}`,
    },
    hints: [
      'A Binary Indexed Tree (Fenwick Tree) allows both point update and prefix sum query in O(log N) time.',
      'Range sum query for [L, R] is query(R) - query(L - 1).',
    ],
    editorial: `### Method Explanation
Binary Indexed Tree (Fenwick Tree):
- Stores prefix sums compactly using bit manipulation $i \\ \\& \\ (-i)$ for lowest set bit.
- Point Update: Add $\\Delta$ to node $i+1$ and all its ancestors via $idx += idx \\ \\& \\ (-idx)$ in $O(\\log N)$.
- Prefix Sum: Accumulate values via $idx -= idx \\ \\& \\ (-idx)$ in $O(\\log N)$.
- Range query $[L, R] = \\text{prefix}(R) - \\text{prefix}(L-1)$.

### Complexity
- **Time Complexity:** $O((N + Q) \\log N)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '[1,3,5], [["sumRange",0,2],["update",1,2],["sumRange",0,2]]', expectedOutput: '[9,8]', isHidden: false },
      { input: '[7,2,7,2,0], [["sumRange",0,4],["update",4,6],["sumRange",0,4]]', expectedOutput: '[18,24]', isHidden: false },
      { input: '[5], [["sumRange",0,0],["update",0,10],["sumRange",0,0]]', expectedOutput: '[5,10]', isHidden: true },
    ],
  },
  {
    title: 'Sliding Window Maximum Monotonic Deque',
    slug: 'sliding-window-maximum-monotonic-deque',
    description: `You are given an array of integers $nums$, there is a sliding window of size $k$ which is moving from the very left of the array to the very right. You can only see the $k$ numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

### Constraints
- $1 \\le nums.length \\le 10^5$
- $-10^4 \\le nums[i] \\le 10^4$
- $1 \\le k \\le nums.length$

### Input Format
- An integer array $nums$ and an integer $k$.

### Output Format
- Return an array of maximums for each window.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['data-structures', 'monotonic-queue', 'sliding-window'],
    roadmapLevel: 3,
    roadmapTopic: 'advanced-data-structures',
    templates: {
      python: `class Solution:\n    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    maxSlidingWindow(nums, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        from collections import deque
        dq = deque() # stores indices
        res = []
        
        for i in range(len(nums)):
            # Remove indices outside window [i - k + 1, i]
            if dq and dq[0] < i - k + 1:
                dq.popleft()
            # Maintain monotonic decreasing order
            while dq and nums[dq[-1]] <= nums[i]:
                dq.pop()
            dq.append(i)
            if i >= k - 1:
                res.append(nums[dq[0]])
                
        return res`,
      javascript: `class Solution {\n    maxSlidingWindow(nums, k) {\n        const dq = [];\n        let head = 0;\n        const res = [];\n        \n        for (let i = 0; i < nums.length; i++) {\n            if (head < dq.length && dq[head] < i - k + 1) {\n                head++;\n            }\n            while (dq.length > head && nums[dq[dq.length - 1]] <= nums[i]) {\n                dq.pop();\n            }\n            dq.push(i);\n            if (i >= k - 1) {\n                res.push(nums[dq[head]]);\n            }\n        }\n        return res;\n    }\n}`,
    },
    hints: [
      'Maintain a monotonic deque of indices in decreasing order of element value.',
      'The front of the deque dq[0] will always store the maximum of the current window.',
      'Pop elements from the back if they are smaller than the incoming element.',
    ],
    editorial: `### Method Explanation
Monotonic Deque:
- Maintain a double-ended queue storing array indices such that $nums[dq[0]] > nums[dq[1]] > \\dots$.
- For each index $i$:
  1. Remove expired indices from front ($dq[0] < i - k + 1$).
  2. Pop from back all indices whose values are $\\le nums[i]$.
  3. Push $i$ to back.
  4. Once $i \\ge k - 1$, append $nums[dq[0]]$ to the answer.

### Complexity
- **Time Complexity:** $O(N)$ because every element is pushed and popped at most once.
- **Space Complexity:** $O(K)$.`,
    testCases: [
      { input: '[1,3,-1,-3,5,3,6,7], 3', expectedOutput: '[3,3,5,5,6,7]', isHidden: false },
      { input: '[1], 1', expectedOutput: '[1]', isHidden: false },
      { input: '[9,11], 2', expectedOutput: '[11]', isHidden: true },
      { input: '[4,-2], 2', expectedOutput: '[4]', isHidden: true },
    ],
  },
  {
    title: 'Largest Rectangle in Histogram Monotonic Stack',
    slug: 'largest-rectangle-in-histogram-monotonic-stack',
    description: `Given an array of integers $heights$ representing the histogram's bar height where the width of each bar is $1$, return the area of the largest rectangle in the histogram.

### Constraints
- $1 \\le heights.length \\le 10^5$
- $0 \\le heights[i] \\le 10^4$

### Input Format
- An integer array $heights$.

### Output Format
- Return an integer representing the largest rectangle area.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['data-structures', 'monotonic-stack', 'array'],
    roadmapLevel: 3,
    roadmapTopic: 'advanced-data-structures',
    templates: {
      python: `class Solution:\n    def largestRectangleArea(self, heights: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    largestRectangleArea(heights) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def largestRectangleArea(self, heights: list[int]) -> int:
        stack = [] # stores indices
        max_area = 0
        h = heights + [0] # sentinel to flush stack
        
        for i, val in enumerate(h):
            while stack and h[stack[-1]] >= val:
                height = h[stack.pop()]
                width = i if not stack else (i - stack[-1] - 1)
                max_area = max(max_area, height * width)
            stack.append(i)
            
        return max_area`,
      javascript: `class Solution {\n    largestRectangleArea(heights) {\n        const h = [...heights, 0];\n        const stack = [];\n        let maxArea = 0;\n        \n        for (let i = 0; i < h.length; i++) {\n            while (stack.length > 0 && h[stack[stack.length - 1]] >= h[i]) {\n                const height = h[stack.pop()];\n                const width = stack.length === 0 ? i : (i - stack[stack.length - 1] - 1);\n                maxArea = Math.max(maxArea, height * width);\n            }\n            stack.push(i);\n        }\n        return maxArea;\n    }\n}`,
    },
    hints: [
      'For each bar, find how far left and right it can extend as the shortest bar in the rectangle.',
      'Use a monotonic increasing stack of indices.',
      'Append a 0-height bar at the end to pop all remaining elements from the stack.',
    ],
    editorial: `### Method Explanation
Monotonic Stack:
- For each histogram bar $i$, the maximum rectangle with height $heights[i]$ extends leftwards until the first bar strictly shorter than $heights[i]$, and rightwards until the first bar strictly shorter than $heights[i]$.
- Using a monotonically increasing stack:
  - When we encounter a shorter bar at index $i$, we pop the top index $mid$ from stack.
  - Its height is $heights[mid]$, right boundary is $i$, left boundary is the new stack top (or $-1$ if empty).
  - Width is $i - \\text{stack.top()} - 1$.
  - Area is $height \\times width$.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '[2,1,5,6,2,3]', expectedOutput: '10', isHidden: false },
      { input: '[2,4]', expectedOutput: '4', isHidden: false },
      { input: '[1,1,1,1]', expectedOutput: '4', isHidden: true },
      { input: '[6,2,5,4,5,1,6]', expectedOutput: '12', isHidden: true },
    ],
  },
  {
    title: 'Maximal Rectangle in Binary Matrix',
    slug: 'maximal-rectangle-binary-matrix',
    description: `Given a $rows \\times cols$ binary $matrix$ filled with $0$'s and $1$'s, find the largest rectangle containing only $1$'s and return its area.

### Constraints
- $rows == matrix.length$
- $cols == matrix[i].length$
- $1 \\le rows, cols \\le 200$
- $matrix[i][j]$ is '0' or '1' (or 0 or 1).

### Input Format
- A 2D array $matrix$.

### Output Format
- Return an integer representing the maximum rectangle area.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['data-structures', 'monotonic-stack', 'dynamic-programming'],
    roadmapLevel: 3,
    roadmapTopic: 'advanced-data-structures',
    templates: {
      python: `class Solution:\n    def maximalRectangle(self, matrix: list[list]) -> int:\n        pass`,
      javascript: `class Solution {\n    maximalRectangle(matrix) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maximalRectangle(self, matrix: list[list]) -> int:
        if not matrix or not matrix[0]:
            return 0
        R, C = len(matrix), len(matrix[0])
        heights = [0] * C
        max_area = 0
        
        for r in range(R):
            for c in range(C):
                val = matrix[r][c]
                if val == '1' or val == 1:
                    heights[c] += 1
                else:
                    heights[c] = 0
                    
            # Histogram largest rectangle
            stack = []
            h = heights + [0]
            for i, val in enumerate(h):
                while stack and h[stack[-1]] >= val:
                    height = h[stack.pop()]
                    width = i if not stack else (i - stack[-1] - 1)
                    max_area = max(max_area, height * width)
                stack.append(i)
                
        return max_area`,
      javascript: `class Solution {\n    maximalRectangle(matrix) {\n        if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0;\n        const R = matrix.length, C = matrix[0].length;\n        const heights = new Array(C).fill(0);\n        let maxArea = 0;\n        \n        for (let r = 0; r < R; r++) {\n            for (let c = 0; c < C; c++) {\n                const val = matrix[r][c];\n                if (val === '1' || val === 1) {\n                    heights[c]++;\n                } else {\n                    heights[c] = 0;\n                }\n            }\n            \n            const h = [...heights, 0];\n            const stack = [];\n            for (let i = 0; i < h.length; i++) {\n                while (stack.length > 0 && h[stack[stack.length - 1]] >= h[i]) {\n                    const height = h[stack.pop()];\n                    const width = stack.length === 0 ? i : (i - stack[stack.length - 1] - 1);\n                    maxArea = Math.max(maxArea, height * width);\n                }\n                stack.push(i);\n            }\n        }\n        return maxArea;\n    }\n}`,
    },
    hints: [
      'Maintain running heights of consecutive 1s for each column across rows.',
      'For each row, treat the accumulated heights as a histogram and apply the Largest Rectangle in Histogram algorithm.',
    ],
    editorial: `### Method Explanation
Row-wise reduction to Largest Rectangle in Histogram:
- For each row $r$, compute $heights[c]$: if $matrix[r][c] == 1$, $heights[c] += 1$; otherwise $heights[c] = 0$.
- Each row forms a histogram of width $C$. Run the monotonic stack $O(C)$ histogram algorithm.
- Over all $R$ rows, total time is $O(R \\cdot C)$.

### Complexity
- **Time Complexity:** $O(R \\cdot C)$.
- **Space Complexity:** $O(C)$.`,
    testCases: [
      { input: '[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]', expectedOutput: '6', isHidden: false },
      { input: '[["0"]]', expectedOutput: '0', isHidden: false },
      { input: '[["1"]]', expectedOutput: '1', isHidden: false },
      { input: '[[1,1],[1,1]]', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: 'Maximum Frequency Stack Design',
    slug: 'maximum-frequency-stack-design',
    description: `Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.

Implement the \`FreqStack\` class:
- \`push(val)\`: pushes an integer $val$ onto the top of the stack.
- \`pop()\`: removes and returns the most frequent element in the stack. If there is a tie for the most frequent element, the element closest to the stack's top is removed and returned.

Given a sequence of operations formatted as \`["push", val]\` or \`["pop"]\`, return the array of values returned by each \`pop\` operation.

### Constraints
- $0 \\le val \\le 10^9$
- At most $2 \\times 10^4$ calls will be made to \`push\` and \`pop\`.
- It is guaranteed that there will be at least one element in the stack for each \`pop\` call.

### Input Format
- A list of operation queries.

### Output Format
- Return an array of values returned by each \`pop\` operation.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['data-structures', 'hash-table', 'stack'],
    roadmapLevel: 3,
    roadmapTopic: 'advanced-data-structures',
    templates: {
      python: `class Solution:\n    def processFreqStack(self, operations: list) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    processFreqStack(operations) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def processFreqStack(self, operations: list) -> list[int]:
        from collections import defaultdict
        
        freq = defaultdict(int) # val -> frequency
        group = defaultdict(list) # frequency -> list of values
        max_freq = 0
        ans = []
        
        for op in operations:
            if op[0] == "push":
                val = op[1]
                f = freq[val] + 1
                freq[val] = f
                if f > max_freq:
                    max_freq = f
                group[f].append(val)
            elif op[0] == "pop":
                val = group[max_freq].pop()
                freq[val] -= 1
                if not group[max_freq]:
                    max_freq -= 1
                ans.append(val)
                
        return ans`,
      javascript: `class Solution {\n    processFreqStack(operations) {\n        const freq = new Map();\n        const group = new Map();\n        let maxFreq = 0;\n        const ans = [];\n        \n        for (const op of operations) {\n            if (op[0] === 'push') {\n                const val = op[1];\n                const f = (freq.get(val) || 0) + 1;\n                freq.set(val, f);\n                if (f > maxFreq) maxFreq = f;\n                if (!group.has(f)) group.set(f, []);\n                group.get(f).push(val);\n            } else if (op[0] === 'pop') {\n                const stack = group.get(maxFreq);\n                const val = stack.pop();\n                freq.set(val, freq.get(val) - 1);\n                if (stack.length === 0) maxFreq--;\n                ans.push(val);\n            }\n        }\n        return ans;\n    }\n}`,
    },
    hints: [
      'Maintain frequency of each value in a hash map.',
      'Maintain a bucket/stack of elements for each frequency level: group[f] stores elements that reached frequency f in order of appearance.',
      'When popping, simply pop from group[max_freq]. If group[max_freq] is empty, decrement max_freq.',
    ],
    editorial: `### Method Explanation
Bucket-by-Frequency Stack:
- Map each frequency $f$ to a stack of elements $group[f]$ having reached frequency $f$.
- \`push(val)\`:
  - $f = freq[val] + 1$
  - Append $val$ to $group[f]$.
  - Update $max\\_freq = \\max(max\\_freq, f)$.
- \`pop()\`:
  - Pop $val$ from $group[max\\_freq]$.
  - Decrement $freq[val]$.
  - If $group[max\\_freq]$ becomes empty, decrement $max\\_freq$.
- Both operations run in $O(1)$ time.

### Complexity
- **Time Complexity:** $O(1)$ per operation, $O(N)$ total.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '[["push",5],["push",7],["push",5],["push",7],["push",4],["push",5],["pop"],["pop"],["pop"],["pop"]]', expectedOutput: '[5,7,5,4]', isHidden: false },
      { input: '[["push",1],["pop"]]', expectedOutput: '[1]', isHidden: false },
      { input: '[["push",1],["push",1],["push",2],["pop"],["pop"],["pop"]]', expectedOutput: '[1,2,1]', isHidden: true },
    ],
  },
  {
    title: 'Range Minimum Query Sparse Table',
    slug: 'range-minimum-query-sparse-table',
    description: `Given an integer array $nums$ of size $n$, and $q$ queries where each query is $[left, right]$, return an array where each element is the minimum value in the subarray $nums[left \\dots right]$.

Solve this using a Sparse Table data structure to achieve $O(1)$ query time after $O(n \\log n)$ precomputation.

### Constraints
- $1 \\le n \\le 10^5$
- $-10^9 \\le nums[i] \\le 10^9$
- $1 \\le q \\le 10^5$
- $0 \\le left \\le right < n$

### Input Format
- An integer array $nums$ and a 2D integer array $queries$.

### Output Format
- Return an array of minimum values for each query.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['data-structures', 'sparse-table', 'rmq'],
    roadmapLevel: 3,
    roadmapTopic: 'advanced-data-structures',
    templates: {
      python: `class Solution:\n    def staticRMQ(self, nums: list[int], queries: list[list[int]]) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    staticRMQ(nums, queries) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def staticRMQ(self, nums: list[int], queries: list[list[int]]) -> list[int]:
        n = len(nums)
        if n == 0:
            return []
            
        LOG = n.bit_length() + 1
        st = [[0] * n for _ in range(LOG)]
        
        for i in range(n):
            st[0][i] = nums[i]
            
        for j in range(1, LOG):
            step = 1 << (j - 1)
            for i in range(n - (1 << j) + 1):
                st[j][i] = min(st[j - 1][i], st[j - 1][i + step])
                
        ans = []
        for l, r in queries:
            length = r - l + 1
            k = length.bit_length() - 1
            ans.append(min(st[k][l], st[k][r - (1 << k) + 1]))
            
        return ans`,
      javascript: `class Solution {\n    staticRMQ(nums, queries) {\n        const n = nums.length;\n        if (n === 0) return [];\n        const LOG = 18;\n        const st = Array.from({ length: LOG }, () => new Int32Array(n));\n        \n        for (let i = 0; i < n; i++) {\n            st[0][i] = nums[i];\n        }\n        \n        for (let j = 1; j < LOG; j++) {\n            const step = 1 << (j - 1);\n            for (let i = 0; i + (1 << j) <= n; i++) {\n                st[j][i] = Math.min(st[j - 1][i], st[j - 1][i + step]);\n            }\n        }\n        \n        const ans = [];\n        for (const [l, r] of queries) {\n            const len = r - l + 1;\n            const k = Math.floor(Math.log2(len));\n            ans.push(Math.min(st[k][l], st[k][r - (1 << k) + 1]));\n        }\n        return ans;\n    }\n}`,
    },
    hints: [
      'Precompute st[k][i] = min in range [i, i + 2^k - 1].',
      'For query [L, R], let k = floor(log2(R - L + 1)).',
      'Return min(st[k][L], st[k][R - 2^k + 1]) in O(1) time.',
    ],
    editorial: `### Method Explanation
Sparse Table for Static RMQ:
- Precomputation:
  - $st[0][i] = nums[i]$
  - $st[k][i] = \\min(st[k-1][i], st[k-1][i + 2^{k-1}])$
- Query:
  - Any range $[L, R]$ of length $len$ can be covered by two overlapping blocks of length $2^k$ where $k = \\lfloor \\log_2 len \\rfloor$.
  - $\\text{Query}(L, R) = \\min(st[k][L], st[k][R - 2^k + 1])$.
  - Because $\\min(x, x) = x$ (idempotent), the overlap does not affect correctness.

### Complexity
- **Time Complexity:** Precomputation $O(N \\log N)$, Query $O(1)$.
- **Space Complexity:** $O(N \\log N)$.`,
    testCases: [
      { input: '[1,3,4,8,6,1,4,2], [[0,3],[1,4],[2,7],[0,7]]', expectedOutput: '[1,3,1,1]', isHidden: false },
      { input: '[5,4,3,2,1], [[0,0],[0,4],[2,3]]', expectedOutput: '[5,1,2]', isHidden: false },
      { input: '[10], [[0,0]]', expectedOutput: '[10]', isHidden: true },
    ],
  },
  {
    title: 'Disjoint Set Union by Rank and Path Compression',
    slug: 'disjoint-set-union-rank-path-compression',
    description: `Implement a Disjoint Set Union (DSU) data structure with path compression and union by rank.

Given $n$ elements (labeled $0$ to $n - 1$) and a sequence of queries of two types:
1. \`["union", u, v]\`: Merge the sets containing $u$ and $v$. Return $true$ if they were in different sets and successfully merged, or $false$ if they were already connected.
2. \`["connected", u, v]\`: Return $true$ if $u$ and $v$ are in the same set, otherwise $false$.

Return the boolean results of each query in an array.

### Constraints
- $1 \\le n \\le 10^5$
- $1 \\le queries.length \\le 10^5$
- $0 \\le u, v < n$

### Input Format
- An integer $n$ and a list of query operations.

### Output Format
- Return an array of boolean answers for each query.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['data-structures', 'union-find', 'graph'],
    roadmapLevel: 3,
    roadmapTopic: 'advanced-data-structures',
    templates: {
      python: `class Solution:\n    def processDSU(self, n: int, queries: list) -> list[bool]:\n        pass`,
      javascript: `class Solution {\n    processDSU(n, queries) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def processDSU(self, n: int, queries: list) -> list[bool]:
        parent = list(range(n))
        rank = [0] * n
        
        def find(i):
            if parent[i] != i:
                parent[i] = find(parent[i])
            return parent[i]
            
        def union(i, j):
            root_i = find(i)
            root_j = find(j)
            if root_i == root_j:
                return False
            if rank[root_i] < rank[root_j]:
                parent[root_i] = root_j
            elif rank[root_i] > rank[root_j]:
                parent[root_j] = root_i
            else:
                parent[root_j] = root_i
                rank[root_i] += 1
            return True
            
        ans = []
        for op in queries:
            if op[0] == "union":
                ans.append(union(op[1], op[2]))
            elif op[0] == "connected":
                ans.append(find(op[1]) == find(op[2]))
                
        return ans`,
      javascript: `class Solution {\n    processDSU(n, queries) {\n        const parent = Array.from({ length: n }, (_, i) => i);\n        const rank = new Array(n).fill(0);\n        \n        const find = (i) => {\n            if (parent[i] !== i) {\n                parent[i] = find(parent[i]);\n            }\n            return parent[i];\n        };\n        \n        const union = (i, j) => {\n            const rI = find(i), rJ = find(j);\n            if (rI === rJ) return false;\n            if (rank[rI] < rank[rJ]) {\n                parent[rI] = rJ;\n            } else if (rank[rI] > rank[rJ]) {\n                parent[rJ] = rI;\n            } else {\n                parent[rJ] = rI;\n                rank[rI]++;\n            }\n            return true;\n        };\n        \n        const ans = [];\n        for (const op of queries) {\n            if (op[0] === 'union') {\n                ans.push(union(op[1], op[2]));\n            } else if (op[0] === 'connected') {\n                ans.push(find(op[1]) === find(op[2]));\n            }\n        }\n        return ans;\n    }\n}`,
    },
    hints: [
      'Use find(x) with path compression: parent[x] = find(parent[x]).',
      'Use union(x, y) with rank heuristic to attach smaller trees under larger trees.',
      'Amortized time per operation is nearly O(1) (Ackermann inverse alpha(N)).',
    ],
    editorial: `### Method Explanation
Disjoint Set Union (DSU) with Path Compression and Union by Rank:
- Path compression flattens tree depth during find operations.
- Union by rank attaches the shallower root to the deeper root, keeping tree height minimal.
- With both optimizations, each operation runs in $O(\\alpha(N))$ time.

### Complexity
- **Time Complexity:** $O(Q \\cdot \\alpha(N)) \\approx O(Q)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '4, [["union",0,1],["connected",0,1],["connected",0,2],["union",1,2],["connected",0,2]]', expectedOutput: '[true,true,false,true,true]', isHidden: false },
      { input: '3, [["union",0,1],["union",0,1]]', expectedOutput: '[true,false]', isHidden: false },
      { input: '2, [["connected",0,1]]', expectedOutput: '[false]', isHidden: true },
    ],
  },
  {
    title: 'Design Underground Railway System',
    slug: 'design-underground-railway-system',
    description: `An underground railway system is keeping track of customer travel times between different stations. They are using this data to calculate the average time it takes to travel from one station to another.

Implement the \`UndergroundSystem\` class:
- \`checkIn(id, stationName, t)\`: Customer $id$ checks in at station $stationName$ at time $t$.
- \`checkOut(id, stationName, t)\`: Customer $id$ checks out from station $stationName$ at time $t$.
- \`getAverageTime(startStation, endStation)\`: Returns the average time to travel directly between $startStation$ and $endStation$.

Given a sequence of operations, return an array of floating point numbers (rounded to 5 decimal places) for each \`getAverageTime\` query.

### Constraints
- $1 \\le id, t \\le 10^6$
- $1 \\le stationName.length \\le 10$
- All strings consist of uppercase and lowercase English letters and digits.
- At most $2 \\times 10^4$ calls will be made in total.

### Input Format
- A list of underground operations.

### Output Format
- Return an array of numbers representing the average travel times.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['data-structures', 'hash-table', 'design'],
    roadmapLevel: 3,
    roadmapTopic: 'advanced-data-structures',
    templates: {
      python: `class Solution:\n    def processUnderground(self, ops: list) -> list[float]:\n        pass`,
      javascript: `class Solution {\n    processUnderground(ops) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def processUnderground(self, ops: list) -> list[float]:
        check_ins = {} # id -> (station, time)
        routes = {} # (start, end) -> [total_time, trip_count]
        ans = []
        
        for op in ops:
            if op[0] == "checkIn":
                cid, station, t = op[1], op[2], op[3]
                check_ins[cid] = (station, t)
            elif op[0] == "checkOut":
                cid, station, t = op[1], op[2], op[3]
                start_st, start_t = check_ins.pop(cid)
                key = (start_st, station)
                if key not in routes:
                    routes[key] = [0, 0]
                routes[key][0] += (t - start_t)
                routes[key][1] += 1
            elif op[0] == "getAverageTime":
                start_st, end_st = op[1], op[2]
                total_t, count = routes[(start_st, end_st)]
                ans.append(round(total_t / count, 5))
                
        return ans`,
      javascript: `class Solution {\n    processUnderground(ops) {\n        const checkIns = new Map();\n        const routes = new Map();\n        const ans = [];\n        \n        for (const op of ops) {\n            if (op[0] === 'checkIn') {\n                const [_, id, station, t] = op;\n                checkIns.set(id, { station, t });\n            } else if (op[0] === 'checkOut') {\n                const [_, id, station, t] = op;\n                const checkIn = checkIns.get(id);\n                checkIns.delete(id);\n                const key = checkIn.station + '->' + station;\n                if (!routes.has(key)) routes.set(key, { total: 0, count: 0 });\n                const r = routes.get(key);\n                r.total += (t - checkIn.t);\n                r.count += 1;\n            } else if (op[0] === 'getAverageTime') {\n                const [_, start, end] = op;\n                const key = start + '->' + end;\n                const r = routes.get(key);\n                ans.push(Number((r.total / r.count).toFixed(5)));\n            }\n        }\n        return ans;\n    }\n}`,
    },
    hints: [
      'Store active check-ins in a map keyed by passenger ID.',
      'Store completed trips in a map keyed by (startStation, endStation) storing (total_time, count).',
    ],
    editorial: `### Method Explanation
Design with two hash maps:
1. Active journeys: checkIns[id] = (startStation, startTime).
2. Historical route aggregates: routes[(start, end)] = (totalDuration, rideCount).
3. Average time for (start, end) is totalDuration / rideCount in O(1) time.

### Complexity
- **Time Complexity:** O(1) for all operations.
- **Space Complexity:** O(P + S^2) where P is passengers and S is stations.`,
    testCases: [
      { input: '[["checkIn",45,"Leyton",3],["checkIn",32,"Paradise",8],["checkIn",27,"Leyton",10],["checkOut",45,"Waterloo",15],["checkOut",27,"Waterloo",20],["checkOut",32,"Cambridge",22],["getAverageTime","Paradise","Cambridge"],["getAverageTime","Leyton","Waterloo"]]', expectedOutput: '[14.0,11.0]', isHidden: false },
      { input: '[["checkIn",10,"A",1],["checkOut",10,"B",5],["getAverageTime","A","B"]]', expectedOutput: '[4.0]', isHidden: false },
      { input: '[["checkIn",1,"S",2],["checkIn",2,"S",4],["checkOut",1,"E",10],["checkOut",2,"E",20],["getAverageTime","S","E"]]', expectedOutput: '[12.0]', isHidden: true },
    ],
  },
  {
    title: 'Design LRU Cache with Eviction',
    slug: 'design-lru-cache-eviction',
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the \`LRUCache\` class:
- \`LRUCache(capacity)\`: Initialize the LRU cache with positive size $capacity$.
- \`get(key)\`: Return the value of the $key$ if the key exists, otherwise return -1.
- \`put(key, value)\`: Update the value of the $key$ if the key exists. Otherwise, add the $key-value$ pair to the cache. If the number of keys exceeds the $capacity$ from this operation, evict the least recently used key.

The functions \`get\` and \`put\` must each run in $O(1)$ average time complexity.

Given $capacity$ and a sequence of operations, return an array of return values for each \`get\` operation.

### Constraints
- $1 \\le capacity \\le 3000$
- $0 \\le key \\le 10^4$
- $0 \\le value \\le 10^5$
- At most $2 \\times 10^5$ calls will be made to \`get\` and \`put\`.

### Input Format
- An integer $capacity$ and a list of operations \`["put", key, val]\` or \`["get", key]\`.

### Output Format
- Return an array of results for all \`get\` queries.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['data-structures', 'hash-table', 'linked-list', 'design'],
    roadmapLevel: 3,
    roadmapTopic: 'advanced-data-structures',
    templates: {
      python: `class Solution:\n    def processLRU(self, capacity: int, operations: list) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    processLRU(capacity, operations) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def processLRU(self, capacity: int, operations: list) -> list[int]:
        from collections import OrderedDict
        cache = OrderedDict()
        ans = []
        
        for op in operations:
            if op[0] == "put":
                k, v = op[1], op[2]
                if k in cache:
                    cache.move_to_end(k)
                cache[k] = v
                if len(cache) > capacity:
                    cache.popitem(last=False)
            elif op[0] == "get":
                k = op[1]
                if k in cache:
                    cache.move_to_end(k)
                    ans.append(cache[k])
                else:
                    ans.append(-1)
                    
        return ans`,
      javascript: `class Solution {\n    processLRU(capacity, operations) {\n        const cache = new Map();\n        const ans = [];\n        \n        for (const op of operations) {\n            if (op[0] === 'put') {\n                const [_, k, v] = op;\n                if (cache.has(k)) cache.delete(k);\n                cache.set(k, v);\n                if (cache.size > capacity) {\n                    const oldestKey = cache.keys().next().value;\n                    cache.delete(oldestKey);\n                }\n            } else if (op[0] === 'get') {\n                const [_, k] = op;\n                if (cache.has(k)) {\n                    const v = cache.get(k);\n                    cache.delete(k);\n                    cache.set(k, v);\n                    ans.push(v);\n                } else {\n                    ans.push(-1);\n                }\n            }\n        }\n        return ans;\n    }\n}`,
    },
    hints: [
      'Use a combination of a Doubly Linked List and a Hash Map (or language built-ins like OrderedDict / JS Map).',
      'When an element is accessed or updated, move it to the most recently used end.',
      'When capacity is exceeded, remove the element at the least recently used end.',
    ],
    editorial: `### Method Explanation
LRU Cache via Hash Map + Doubly Linked List:
- A doubly linked list maintains the temporal order of elements in $O(1)$ insertion and removal.
- A hash map maps keys to nodes in the list.
- \`get(key)\`: Retrieve from map, move node to MRU head in $O(1)$.
- \`put(key, val)\`: If key exists, update value and move to MRU head. If new, add node to MRU head. If size exceeds capacity, remove node at LRU tail and delete key from map.

### Complexity
- **Time Complexity:** $O(1)$ per operation.
- **Space Complexity:** $O(\\text{capacity})$.`,
    testCases: [
      { input: '2, [["put",1,1],["put",2,2],["get",1],["put",3,3],["get",2],["put",4,4],["get",1],["get",3],["get",4]]', expectedOutput: '[1,-1,-1,3,4]', isHidden: false },
      { input: '1, [["put",2,1],["get",2],["put",3,2],["get",2],["get",3]]', expectedOutput: '[1,-1,2]', isHidden: false },
      { input: '2, [["get",2],["put",2,6],["get",1],["put",1,5],["put",1,2],["get",1],["get",2]]', expectedOutput: '[-1,-1,2,6]', isHidden: true },
    ],
  },
  {
    title: 'Daily Temperatures Monotonic Stack',
    slug: 'daily-temperatures-monotonic-stack',
    description: `Given an array of integers $temperatures$ represents the daily temperatures, return an array $answer$ such that $answer[i]$ is the number of days you have to wait after the $i$-th day to get a warmer temperature. If there is no future day for which this is possible, keep $answer[i] == 0$ instead.

### Constraints
- $1 \\le temperatures.length \\le 10^5$
- $30 \\le temperatures[i] \\le 100$

### Input Format
- An integer array $temperatures$.

### Output Format
- Return an array of wait days.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['data-structures', 'monotonic-stack', 'array'],
    roadmapLevel: 3,
    roadmapTopic: 'advanced-data-structures',
    templates: {
      python: `class Solution:\n    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    dailyTemperatures(temperatures) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        n = len(temperatures)
        ans = [0] * n
        stack = [] # stores indices
        
        for i, t in enumerate(temperatures):
            while stack and temperatures[stack[-1]] < t:
                prev_idx = stack.pop()
                ans[prev_idx] = i - prev_idx
            stack.append(i)
            
        return ans`,
      javascript: `class Solution {\n    dailyTemperatures(temperatures) {\n        const n = temperatures.length;\n        const ans = new Array(n).fill(0);\n        const stack = [];\n        \n        for (let i = 0; i < n; i++) {\n            while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temperatures[i]) {\n                const prevIdx = stack.pop();\n                ans[prevIdx] = i - prevIdx;\n            }\n            stack.push(i);\n        }\n        return ans;\n    }\n}`,
    },
    hints: [
      'Maintain a decreasing monotonic stack of indices.',
      'When you see a temperature warmer than the stack top, pop the stack and calculate the day difference.',
    ],
    editorial: `### Method Explanation
Monotonic Stack:
- Iterate through temperatures with a decreasing monotonic stack of indices.
- For each day $i$ with temperature $T$, while stack is non-empty and $temperatures[stack.top()] < T$:
  - Pop index $prev$ from stack.
  - Set $ans[prev] = i - prev$.
- Push $i$ onto stack.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '[73,74,75,71,69,72,76,73]', expectedOutput: '[1,1,4,2,1,1,0,0]', isHidden: false },
      { input: '[30,40,50,60]', expectedOutput: '[1,1,1,0]', isHidden: false },
      { input: '[30,60,90]', expectedOutput: '[1,1,0]', isHidden: false },
      { input: '[50,40,30]', expectedOutput: '[0,0,0]', isHidden: true },
    ],
  },
];
