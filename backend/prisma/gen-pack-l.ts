import { ProblemSpec, writePack } from './pack-writer-util';

// PACK L: Arrays & Matrix Manipulations (19 problems)
const problemsL: ProblemSpec[] = [
  {
    title: 'Count Inversions in Array Fenwick Tree',
    slug: 'count-inversions-in-array-fenwick-tree',
    description: `Given an integer array \`nums\`, return the number of inversions in the array (a pair of indices $(i, j)$ such that $i < j$ and $nums[i] > nums[j]$).`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 10^5, -10^9 <= nums[i] <= 10^9`,
    inputFormat: `nums`,
    outputFormat: `Count of inversions integer.`,
    sampleInput: `[2,4,1,3,5]`,
    sampleOutput: `3`,
    points: 200,
    hints: ['Coordinate compress array elements, then insert from right to left into a Fenwick tree querying prefix sums.'],
    codeTemplates: {
      python: `class Solution:\n    def countInversions(self, nums: list) -> int:\n        pass`,
      javascript: `class Solution {\n    countInversions(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def countInversions(self, nums: list) -> int:
        n = len(nums)
        sorted_vals = sorted(list(set(nums)))
        rank = {v: i + 1 for i, v in enumerate(sorted_vals)}
        tree = [0] * (len(sorted_vals) + 1)
        def update(i, delta):
            while i < len(tree):
                tree[i] += delta
                i += i & (-i)
        def query(i):
            s = 0
            while i > 0:
                s += tree[i]
                i -= i & (-i)
            return s
        inv = 0
        for i in range(n - 1, -1, -1):
            r = rank[nums[i]]
            inv += query(r - 1)
            update(r, 1)
        return inv`,
      javascript: `class Solution {
    countInversions(nums) {
        const n = nums.length;
        const sortedVals = Array.from(new Set(nums)).sort((a, b) => a - b);
        const rank = new Map();
        sortedVals.forEach((v, i) => rank.set(v, i + 1));
        const tree = Array(sortedVals.length + 1).fill(0);
        function update(i, delta) {
            for (; i < tree.length; i += i & -i) tree[i] += delta;
        }
        function query(i) {
            let s = 0;
            for (; i > 0; i -= i & -i) s += tree[i];
            return s;
        }
        let inv = 0;
        for (let i = n - 1; i >= 0; i--) {
            const r = rank.get(nums[i]);
            inv += query(r - 1);
            update(r, 1);
        }
        return inv;
    }
}`,
    },
    editorial: {
      approach: 'Coordinate Compression + Fenwick Tree Point Query.',
      algorithm: 'Process in reverse order and sum smaller elements already inserted in the BIT.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      content: 'Standard Fenwick tree inversion counting.',
      referenceCode: `inv += query(r - 1); update(r, 1)`,
    },
    tags: ['Array', 'Binary Indexed Tree', 'Divide and Conquer', 'Sorting'],
    testCases: [
      { input: `[2,4,1,3,5]`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `[5,4,3,2,1]`, expectedOutput: `10`, isHidden: false, order: 1 },
      { input: `[1,2,3,4,5]`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Global and Local Inversions Equivalence Check',
    slug: 'global-and-local-inversions-equivalence-check',
    description: `You are given an integer array \`nums\` of length \`n\` which represents a permutation of all the numbers in the range \`[0, n - 1]\`. Return \`true\` if the number of global inversions is equal to the number of local inversions.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n == nums.length, 1 <= n <= 10^5, 0 <= nums[i] < n`,
    inputFormat: `nums`,
    outputFormat: `Boolean true/false.`,
    sampleInput: `[1,0,2]`,
    sampleOutput: `true`,
    points: 100,
    hints: ['All local inversions are global inversions. A non-local global inversion occurs whenever abs(nums[i] - i) > 1.'],
    codeTemplates: {
      python: `class Solution:\n    def isIdealPermutation(self, nums: list) -> bool:\n        pass`,
      javascript: `class Solution {\n    isIdealPermutation(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def isIdealPermutation(self, nums: list) -> bool:
        for i, x in enumerate(nums):
            if abs(x - i) > 1:
                return False
        return True`,
      javascript: `class Solution {
    isIdealPermutation(nums) {
        for (let i = 0; i < nums.length; i++) {
            if (Math.abs(nums[i] - i) > 1) return false;
        }
        return true;
    }
}`,
    },
    editorial: {
      approach: 'Index Displacement Invariant.',
      algorithm: 'Every local inversion is a global inversion. Any non-local inversion requires an element shifted by > 1 position.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Standard permutation inversion equivalence.',
      referenceCode: `if abs(x - i) > 1: return False`,
    },
    tags: ['Array', 'Math'],
    testCases: [
      { input: `[1,0,2]`, expectedOutput: `true`, isHidden: false, order: 0 },
      { input: `[1,2,0]`, expectedOutput: `false`, isHidden: false, order: 1 },
      { input: `[0]`, expectedOutput: `true`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Sort Colors Dutch National Flag Partition',
    slug: 'sort-colors-dutch-national-flag-partition',
    description: `Given an array \`nums\` with \`n\` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red (0), white (1), and blue (2).`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 300, nums[i] is either 0, 1, or 2`,
    inputFormat: `nums`,
    outputFormat: `In-place sorted array.`,
    sampleInput: `[2,0,2,1,1,0]`,
    sampleOutput: `[0,0,1,1,2,2]`,
    points: 100,
    hints: ['Dutch National Flag algorithm: maintain 3 pointers low, mid, high.'],
    codeTemplates: {
      python: `class Solution:\n    def sortColors(self, nums: list) -> list:\n        pass`,
      javascript: `class Solution {\n    sortColors(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def sortColors(self, nums: list) -> list:
        low, mid, high = 0, 0, len(nums) - 1
        while mid <= high:
            if nums[mid] == 0:
                nums[low], nums[mid] = nums[mid], nums[low]
                low += 1
                mid += 1
            elif nums[mid] == 1:
                mid += 1
            else:
                nums[mid], nums[high] = nums[high], nums[mid]
                high -= 1
        return nums`,
      javascript: `class Solution {
    sortColors(nums) {
        let low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] === 0) {
                const t = nums[low]; nums[low] = nums[mid]; nums[mid] = t;
                low++; mid++;
            } else if (nums[mid] === 1) {
                mid++;
            } else {
                const t = nums[mid]; nums[mid] = nums[high]; nums[high] = t;
                high--;
            }
        }
        return nums;
    }
}`,
    },
    editorial: {
      approach: 'Dijkstra 3-Way Partitioning (Dutch National Flag).',
      algorithm: 'Three-pointer single pass partitioning in O(N) time and O(1) space.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Classic 3-way partition.',
      referenceCode: `nums[low], nums[mid] = nums[mid], nums[low]`,
    },
    tags: ['Array', 'Two Pointers', 'Sorting'],
    testCases: [
      { input: `[2,0,2,1,1,0]`, expectedOutput: `[0,0,1,1,2,2]`, isHidden: false, order: 0 },
      { input: `[2,0,1]`, expectedOutput: `[0,1,2]`, isHidden: false, order: 1 },
      { input: `[0]`, expectedOutput: `[0]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Kth Largest Element in an Array Quickselect',
    slug: 'kth-largest-element-in-an-array-quickselect',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\`-th largest element in the array in average $O(N)$ time.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= k <= nums.length <= 10^5, -10^4 <= nums[i] <= 10^4`,
    inputFormat: `nums, k`,
    outputFormat: `Kth largest integer.`,
    sampleInput: `[3,2,1,5,6,4], 2`,
    sampleOutput: `5`,
    points: 100,
    hints: ['Use Quickselect (Hoare selection) targeting index n - k.'],
    codeTemplates: {
      python: `class Solution:\n    def findKthLargest(self, nums: list, k: int) -> int:\n        pass`,
      javascript: `class Solution {\n    findKthLargest(nums, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findKthLargest(self, nums: list, k: int) -> int:
        target = len(nums) - k
        def quickselect(l, r):
            pivot = nums[r]
            p = l
            for i in range(l, r):
                if nums[i] <= pivot:
                    nums[p], nums[i] = nums[i], nums[p]
                    p += 1
            nums[p], nums[r] = nums[r], nums[p]
            if p == target:
                return nums[p]
            elif p < target:
                return quickselect(p + 1, r)
            else:
                return quickselect(l, p - 1)
        return quickselect(0, len(nums) - 1)`,
      javascript: `class Solution {
    findKthLargest(nums, k) {
        const target = nums.length - k;
        function quickselect(l, r) {
            const pivot = nums[r];
            let p = l;
            for (let i = l; i < r; i++) {
                if (nums[i] <= pivot) {
                    const t = nums[p]; nums[p] = nums[i]; nums[i] = t;
                    p++;
                }
            }
            const t = nums[p]; nums[p] = nums[r]; nums[r] = t;
            if (p === target) return nums[p];
            if (p < target) return quickselect(p + 1, r);
            return quickselect(l, p - 1);
        }
        return quickselect(0, nums.length - 1);
    }
}`,
    },
    editorial: {
      approach: 'Quickselect (Hoare Order Statistic Selection).',
      algorithm: 'Partition around pivot and only recurse on the side containing target rank.',
      timeComplexity: 'Average O(N), Worst O(N^2)',
      spaceComplexity: 'O(1)',
      content: 'Standard quickselect rank retrieval.',
      referenceCode: `if p == target: return nums[p]`,
    },
    tags: ['Array', 'Divide and Conquer', 'Quickselect', 'Sorting'],
    testCases: [
      { input: `[3,2,1,5,6,4], 2`, expectedOutput: `5`, isHidden: false, order: 0 },
      { input: `[3,2,3,1,2,4,5,5,6], 4`, expectedOutput: `4`, isHidden: false, order: 1 },
      { input: `[1], 1`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Next Permutation Lexicographical Successor',
    slug: 'next-permutation-lexicographical-successor',
    description: `A permutation of an array of integers is an arrangement of its members into a sequence or linear order. Given an array of integers \`nums\`, find the next lexicographical permutation of its elements in-place.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 100, 0 <= nums[i] <= 100`,
    inputFormat: `nums`,
    outputFormat: `Next permutation array.`,
    sampleInput: `[1,2,3]`,
    sampleOutput: `[1,3,2]`,
    points: 100,
    hints: ['Find largest index i where nums[i] < nums[i+1]. Find largest index j > i where nums[j] > nums[i]. Swap and reverse nums[i+1:].'],
    codeTemplates: {
      python: `class Solution:\n    def nextPermutation(self, nums: list) -> list:\n        pass`,
      javascript: `class Solution {\n    nextPermutation(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def nextPermutation(self, nums: list) -> list:
        i = len(nums) - 2
        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1
        if i >= 0:
            j = len(nums) - 1
            while nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]
        nums[i + 1:] = reversed(nums[i + 1:])
        return nums`,
      javascript: `class Solution {
    nextPermutation(nums) {
        let i = nums.length - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) i--;
        if (i >= 0) {
            let j = nums.length - 1;
            while (nums[j] <= nums[i]) j--;
            const t = nums[i]; nums[i] = nums[j]; nums[j] = t;
        }
        let l = i + 1, r = nums.length - 1;
        while (l < r) {
            const t = nums[l]; nums[l] = nums[r]; nums[r] = t;
            l++; r--;
        }
        return nums;
    }
}`,
    },
    editorial: {
      approach: 'Narayana Pandita Lexicographical Permutation Successor.',
      algorithm: 'Identify decreasing suffix, pivot swap, and suffix reversal in O(N) time.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Classic next permutation generation.',
      referenceCode: `nums[i + 1:] = reversed(nums[i + 1:])`,
    },
    tags: ['Array', 'Two Pointers'],
    testCases: [
      { input: `[1,2,3]`, expectedOutput: `[1,3,2]`, isHidden: false, order: 0 },
      { input: `[3,2,1]`, expectedOutput: `[1,2,3]`, isHidden: false, order: 1 },
      { input: `[1,1,5]`, expectedOutput: `[1,5,1]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Spiral Matrix II Matrix Generation',
    slug: 'spiral-matrix-ii-matrix-generation',
    description: `Given a positive integer \`n\`, generate an \`n x n\` matrix filled with elements from \`1\` to \`n^2\` in spiral order.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 20`,
    inputFormat: `n`,
    outputFormat: `n x n matrix filled spirally.`,
    sampleInput: `3`,
    sampleOutput: `[[1,2,3],[8,9,4],[7,6,5]]`,
    points: 100,
    hints: ['Maintain four boundary pointers (top, bottom, left, right) and shrink boundaries after filling each edge.'],
    codeTemplates: {
      python: `class Solution:\n    def generateMatrix(self, n: int) -> list:\n        pass`,
      javascript: `class Solution {\n    generateMatrix(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def generateMatrix(self, n: int) -> list:
        mat = [[0] * n for _ in range(n)]
        top, bottom, left, right = 0, n - 1, 0, n - 1
        num = 1
        while top <= bottom and left <= right:
            for c in range(left, right + 1):
                mat[top][c] = num; num += 1
            top += 1
            for r in range(top, bottom + 1):
                mat[r][right] = num; num += 1
            right -= 1
            if top <= bottom:
                for c in range(right, left - 1, -1):
                    mat[bottom][c] = num; num += 1
                bottom -= 1
            if left <= right:
                for r in range(bottom, top - 1, -1):
                    mat[r][left] = num; num += 1
                left += 1
        return mat`,
      javascript: `class Solution {
    generateMatrix(n) {
        const mat = Array.from({ length: n }, () => Array(n).fill(0));
        let top = 0, bottom = n - 1, left = 0, right = n - 1;
        let num = 1;
        while (top <= bottom && left <= right) {
            for (let c = left; c <= right; c++) mat[top][c] = num++;
            top++;
            for (let r = top; r <= bottom; r++) mat[r][right] = num++;
            right--;
            if (top <= bottom) {
                for (let c = right; c >= left; c--) mat[bottom][c] = num++;
                bottom--;
            }
            if (left <= right) {
                for (let r = bottom; r >= top; r--) mat[r][left] = num++;
                left++;
            }
        }
        return mat;
    }
}`,
    },
    editorial: {
      approach: '4-Boundary Layered Spiral Traversal.',
      algorithm: 'Fill perimeter edges (right, down, left, up) while contracting bounds.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N^2)',
      content: 'Standard spiral matrix population.',
      referenceCode: `top += 1; right -= 1; bottom -= 1; left += 1`,
    },
    tags: ['Array', 'Matrix', 'Simulation'],
    testCases: [
      { input: `3`, expectedOutput: `[[1,2,3],[8,9,4],[7,6,5]]`, isHidden: false, order: 0 },
      { input: `1`, expectedOutput: `[[1]]`, isHidden: false, order: 1 },
      { input: `2`, expectedOutput: `[[1,2],[4,3]]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Rotate Image 90 Degrees In-Place',
    slug: 'rotate-image-90-degrees-in-place',
    description: `You are given an \`n x n\` 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `matrix.length == n, matrix[i].length == n, 1 <= n <= 20`,
    inputFormat: `matrix`,
    outputFormat: `90-degree rotated matrix.`,
    sampleInput: `[[1,2,3],[4,5,6],[7,8,9]]`,
    sampleOutput: `[[7,4,1],[8,5,2],[9,6,3]]`,
    points: 100,
    hints: ['Transpose the matrix (swap matrix[i][j] with matrix[j][i]) then reverse each row.'],
    codeTemplates: {
      python: `class Solution:\n    def rotate(self, matrix: list) -> list:\n        pass`,
      javascript: `class Solution {\n    rotate(matrix) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def rotate(self, matrix: list) -> list:
        n = len(matrix)
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        for i in range(n):
            matrix[i].reverse()
        return matrix`,
      javascript: `class Solution {
    rotate(matrix) {
        const n = matrix.length;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const t = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = t;
            }
        }
        for (let i = 0; i < n; i++) matrix[i].reverse();
        return matrix;
    }
}`,
    },
    editorial: {
      approach: 'Transpose + Horizontal Row Reflection.',
      algorithm: 'Clockwise 90-degree rotation is identical to Transpose + Reverse Rows.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(1)',
      content: 'Standard in-place matrix rotation.',
      referenceCode: `matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]; matrix[i].reverse()`,
    },
    tags: ['Array', 'Math', 'Matrix'],
    testCases: [
      { input: `[[1,2,3],[4,5,6],[7,8,9]]`, expectedOutput: `[[7,4,1],[8,5,2],[9,6,3]]`, isHidden: false, order: 0 },
      { input: `[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]`, expectedOutput: `[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]`, isHidden: false, order: 1 },
      { input: `[[1]]`, expectedOutput: `[[1]]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Set Matrix Zeroes Constant Space In-Place',
    slug: 'set-matrix-zeroes-constant-space-in-place',
    description: `Given an \`m x n\` integer matrix \`matrix\`, if an element is 0, set its entire row and column to 0's in-place in $O(1)$ extra space.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `m == matrix.length, n == matrix[0].length, 1 <= m, n <= 200`,
    inputFormat: `matrix`,
    outputFormat: `Modified matrix.`,
    sampleInput: `[[1,1,1],[1,0,1],[1,1,1]]`,
    sampleOutput: `[[1,0,1],[0,0,0],[1,0,1]]`,
    points: 100,
    hints: ['Use first row and first column as marker storage, with a boolean flag for column 0.'],
    codeTemplates: {
      python: `class Solution:\n    def setZeroes(self, matrix: list) -> list:\n        pass`,
      javascript: `class Solution {\n    setZeroes(matrix) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def setZeroes(self, matrix: list) -> list:
        m, n = len(matrix), len(matrix[0])
        first_col_zero = any(matrix[i][0] == 0 for i in range(m))
        first_row_zero = any(matrix[0][j] == 0 for j in range(n))
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][j] == 0:
                    matrix[i][0] = 0
                    matrix[0][j] = 0
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][0] == 0 or matrix[0][j] == 0:
                    matrix[i][j] = 0
        if first_col_zero:
            for i in range(m): matrix[i][0] = 0
        if first_row_zero:
            for j in range(n): matrix[0][j] = 0
        return matrix`,
      javascript: `class Solution {
    setZeroes(matrix) {
        const m = matrix.length, n = matrix[0].length;
        let firstColZero = false, firstRowZero = false;
        for (let i = 0; i < m; i++) if (matrix[i][0] === 0) firstColZero = true;
        for (let j = 0; j < n; j++) if (matrix[0][j] === 0) firstRowZero = true;
        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                if (matrix[i][j] === 0) {
                    matrix[i][0] = 0; matrix[0][j] = 0;
                }
            }
        }
        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                if (matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0;
            }
        }
        if (firstColZero) for (let i = 0; i < m; i++) matrix[i][0] = 0;
        if (firstRowZero) for (let j = 0; j < n; j++) matrix[0][j] = 0;
        return matrix;
    }
}`,
    },
    editorial: {
      approach: 'First Row/Col In-Place Sentinel Flags.',
      algorithm: 'Embed zero marker bits into matrix header edges in O(1) auxiliary space.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(1)',
      content: 'Standard matrix in-place sentinel flag encoding.',
      referenceCode: `matrix[i][0] = 0; matrix[0][j] = 0`,
    },
    tags: ['Array', 'Hash Table', 'Matrix'],
    testCases: [
      { input: `[[1,1,1],[1,0,1],[1,1,1]]`, expectedOutput: `[[1,0,1],[0,0,0],[1,0,1]]`, isHidden: false, order: 0 },
      { input: `[[0,1,2,0],[3,4,5,2],[1,3,1,5]]`, expectedOutput: `[[0,0,0,0],[0,4,5,0],[0,3,1,0]]`, isHidden: false, order: 1 },
      { input: `[[1]]`, expectedOutput: `[[1]]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Game of Life State Transition In-Place',
    slug: 'game-of-life-state-transition-in-place',
    description: `According to Conway's Game of Life rules, calculate the next state of the \`m x n\` board in-place using 2-bit state encoding.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `m == board.length, n == board[i].length, 1 <= m, n <= 25`,
    inputFormat: `board`,
    outputFormat: `Updated board matrix.`,
    sampleInput: `[[0,1,0],[0,0,1],[1,1,1],[0,0,0]]`,
    sampleOutput: `[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]`,
    points: 100,
    hints: ['Use bit 1 for next state and bit 0 for current state: board[i][j] |= (next_state << 1), then right-shift.'],
    codeTemplates: {
      python: `class Solution:\n    def gameOfLife(self, board: list) -> list:\n        pass`,
      javascript: `class Solution {\n    gameOfLife(board) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def gameOfLife(self, board: list) -> list:
        m, n = len(board), len(board[0])
        for r in range(m):
            for c in range(n):
                live = 0
                for dr in [-1,0,1]:
                    for dc in [-1,0,1]:
                        if dr == 0 and dc == 0: continue
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < m and 0 <= nc < n:
                            live += (board[nr][nc] & 1)
                cur = board[r][c] & 1
                if cur == 1 and live in (2, 3):
                    board[r][c] |= 2
                elif cur == 0 and live == 3:
                    board[r][c] |= 2
        for r in range(m):
            for c in range(n):
                board[r][c] >>= 1
        return board`,
      javascript: `class Solution {
    gameOfLife(board) {
        const m = board.length, n = board[0].length;
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                let live = 0;
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        if (dr === 0 && dc === 0) continue;
                        const nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                            live += (board[nr][nc] & 1);
                        }
                    }
                }
                const cur = board[r][c] & 1;
                if (cur === 1 && (live === 2 || live === 3)) board[r][c] |= 2;
                else if (cur === 0 && live === 3) board[r][c] |= 2;
            }
        }
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) board[r][c] >>= 1;
        }
        return board;
    }
}`,
    },
    editorial: {
      approach: '2-Bit Transition State Encoding.',
      algorithm: 'Store past and future state in binary bits (bit 0 = past, bit 1 = future) in O(1) space.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(1)',
      content: 'Standard in-place cellular automaton transition.',
      referenceCode: `board[r][c] |= 2; board[r][c] >>= 1`,
    },
    tags: ['Array', 'Matrix', 'Simulation'],
    testCases: [
      { input: `[[0,1,0],[0,0,1],[1,1,1],[0,0,0]]`, expectedOutput: `[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]`, isHidden: false, order: 0 },
      { input: `[[1,1],[1,0]]`, expectedOutput: `[[1,1],[1,1]]`, isHidden: false, order: 1 },
      { input: `[[0]]`, expectedOutput: `[[0]]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Find the Duplicate Number Floyd Cycle Detection',
    slug: 'find-the-duplicate-number-floyd-cycle-detection',
    description: `Given an array of integers \`nums\` containing \`n + 1\` integers where each integer is in the range \`[1, n]\` inclusive. There is only one repeated number in \`nums\`, return this repeated number without modifying the array in $O(1)$ extra space.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 10^5, nums.length == n + 1, 1 <= nums[i] <= n`,
    inputFormat: `nums`,
    outputFormat: `Duplicate number integer.`,
    sampleInput: `[1,3,4,2,2]`,
    sampleOutput: `2`,
    points: 100,
    hints: ['Treat the array as a linked list where next pointer from index i is nums[i]. Use Floyd Tortoise and Hare.'],
    codeTemplates: {
      python: `class Solution:\n    def findDuplicate(self, nums: list) -> int:\n        pass`,
      javascript: `class Solution {\n    findDuplicate(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findDuplicate(self, nums: list) -> int:
        slow = nums[0]
        fast = nums[0]
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast: break
        slow = nums[0]
        while slow != fast:
            slow = nums[slow]
            fast = nums[fast]
        return slow`,
      javascript: `class Solution {
    findDuplicate(nums) {
        let slow = nums[0], fast = nums[0];
        while (true) {
            slow = nums[slow];
            fast = nums[nums[fast]];
            if (slow === fast) break;
        }
        slow = nums[0];
        while (slow !== fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
}`,
    },
    editorial: {
      approach: 'Floyd Tortoise and Hare Cycle Detection.',
      algorithm: 'Index-value mapping represents functional graph with cycle entry at duplicate value.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Classic functional graph cycle entry discovery.',
      referenceCode: `slow = nums[slow]; fast = nums[nums[fast]]`,
    },
    tags: ['Array', 'Two Pointers', 'Binary Search', 'Bit Manipulation'],
    testCases: [
      { input: `[1,3,4,2,2]`, expectedOutput: `2`, isHidden: false, order: 0 },
      { input: `[3,1,3,4,2]`, expectedOutput: `3`, isHidden: false, order: 1 },
      { input: `[3,3,3,3,3]`, expectedOutput: `3`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'First Missing Positive Integer In-Place Hash',
    slug: 'first-missing-positive-integer-in-place-hash',
    description: `Given an unsorted integer array \`nums\`, return the smallest positive integer that is not present in \`nums\` in $O(N)$ time and $O(1)$ space.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 10^5, -2^31 <= nums[i] <= 2^31 - 1`,
    inputFormat: `nums`,
    outputFormat: `Smallest missing positive integer.`,
    sampleInput: `[1,2,0]`,
    sampleOutput: `3`,
    points: 200,
    hints: ['Place each positive number x where 1 <= x <= n at index x - 1 using cyclic swaps.'],
    codeTemplates: {
      python: `class Solution:\n    def firstMissingPositive(self, nums: list) -> int:\n        pass`,
      javascript: `class Solution {\n    firstMissingPositive(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def firstMissingPositive(self, nums: list) -> int:
        n = len(nums)
        for i in range(n):
            while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
                target = nums[i] - 1
                nums[i], nums[target] = nums[target], nums[i]
        for i in range(n):
            if nums[i] != i + 1:
                return i + 1
        return n + 1`,
      javascript: `class Solution {
    firstMissingPositive(nums) {
        const n = nums.length;
        for (let i = 0; i < n; i++) {
            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
                const target = nums[i] - 1;
                const t = nums[i]; nums[i] = nums[target]; nums[target] = t;
            }
        }
        for (let i = 0; i < n; i++) {
            if (nums[i] !== i + 1) return i + 1;
        }
        return n + 1;
    }
}`,
    },
    editorial: {
      approach: 'In-Place Cyclic Placement Sort.',
      algorithm: 'Cyclically swap values into index-aligned buckets in O(N) amortized steps.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Classic first missing positive constant space algorithm.',
      referenceCode: `nums[i], nums[target] = nums[target], nums[i]`,
    },
    tags: ['Array', 'Hash Table'],
    testCases: [
      { input: `[1,2,0]`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `[3,4,-1,1]`, expectedOutput: `2`, isHidden: false, order: 1 },
      { input: `[7,8,9,11,12]`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Product of Array Except Self Prefix Suffix Squeeze',
    slug: 'product-of-array-except-self-prefix-suffix-squeeze',
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\` without using division in $O(N)$ time and $O(1)$ extra space.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `2 <= nums.length <= 10^5, -30 <= nums[i] <= 30`,
    inputFormat: `nums`,
    outputFormat: `Product array.`,
    sampleInput: `[1,2,3,4]`,
    sampleOutput: `[24,12,8,6]`,
    points: 100,
    hints: ['Accumulate prefix products into output array, then multiply by running suffix product in reverse pass.'],
    codeTemplates: {
      python: `class Solution:\n    def productExceptSelf(self, nums: list) -> list:\n        pass`,
      javascript: `class Solution {\n    productExceptSelf(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def productExceptSelf(self, nums: list) -> list:
        n = len(nums)
        ans = [1] * n
        prefix = 1
        for i in range(n):
            ans[i] = prefix
            prefix *= nums[i]
        suffix = 1
        for i in range(n - 1, -1, -1):
            ans[i] *= suffix
            suffix *= nums[i]
        return ans`,
      javascript: `class Solution {
    productExceptSelf(nums) {
        const n = nums.length;
        const ans = Array(n).fill(1);
        let prefix = 1;
        for (let i = 0; i < n; i++) {
            ans[i] = prefix;
            prefix *= nums[i];
        }
        let suffix = 1;
        for (let i = n - 1; i >= 0; i--) {
            ans[i] *= suffix;
            suffix *= nums[i];
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Two-Pass Prefix and Suffix Running Product.',
      algorithm: 'Compute prefix products in forward pass and multiply suffix products in reverse pass.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1) extra auxiliary space',
      content: 'Standard division-free product of array algorithm.',
      referenceCode: `ans[i] = prefix; prefix *= nums[i]`,
    },
    tags: ['Array', 'Prefix Sum'],
    testCases: [
      { input: `[1,2,3,4]`, expectedOutput: `[24,12,8,6]`, isHidden: false, order: 0 },
      { input: `[-1,1,0,-3,3]`, expectedOutput: `[0,0,9,0,0]`, isHidden: false, order: 1 },
      { input: `[2,3]`, expectedOutput: `[3,2]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Increasing Triplet Subsequence Constant Space',
    slug: 'increasing-triplet-subsequence-constant-space',
    description: `Given an integer array \`nums\`, return \`true\` if there exists a triple of indices $(i, j, k)$ such that $i < j < k$ and $nums[i] < nums[j] < nums[k]$. If no such indices exist, return \`false\`.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 5 * 10^5, -2^31 <= nums[i] <= 2^31 - 1`,
    inputFormat: `nums`,
    outputFormat: `Boolean true/false.`,
    sampleInput: `[1,2,3,4,5]`,
    sampleOutput: `true`,
    points: 100,
    hints: ['Track smallest (first) and second smallest (second) elements encountered so far.'],
    codeTemplates: {
      python: `class Solution:\n    def increasingTriplet(self, nums: list) -> bool:\n        pass`,
      javascript: `class Solution {\n    increasingTriplet(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def increasingTriplet(self, nums: list) -> bool:
        first, second = float('inf'), float('inf')
        for x in nums:
            if x <= first:
                first = x
            elif x <= second:
                second = x
            else:
                return True
        return False`,
      javascript: `class Solution {
    increasingTriplet(nums) {
        let first = Infinity, second = Infinity;
        for (const x of nums) {
            if (x <= first) {
                first = x;
            } else if (x <= second) {
                second = x;
            } else {
                return true;
            }
        }
        return false;
    }
}`,
    },
    editorial: {
      approach: 'Two-Threshold Greedy Tracking.',
      algorithm: 'Patience sorting / LIS reduction for fixed length 3 in O(1) space.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Standard increasing triplet greedy check.',
      referenceCode: `if x <= first: first = x elif x <= second: second = x else: return True`,
    },
    tags: ['Array', 'Greedy'],
    testCases: [
      { input: `[1,2,3,4,5]`, expectedOutput: `true`, isHidden: false, order: 0 },
      { input: `[5,4,3,2,1]`, expectedOutput: `false`, isHidden: false, order: 1 },
      { input: `[2,1,5,0,4,6]`, expectedOutput: `true`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Wiggle Sort II Virtual Index Mapping',
    slug: 'wiggle-sort-ii-virtual-index-mapping',
    description: `Given an integer array \`nums\`, reorder it such that $nums[0] < nums[1] > nums[2] < nums[3]\\dots$ in-place.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 50000, 0 <= nums[i] <= 5000`,
    inputFormat: `nums`,
    outputFormat: `Wiggle sorted array.`,
    sampleInput: `[1,5,1,1,6,4]`,
    sampleOutput: `[1,6,1,5,1,4]`,
    points: 150,
    hints: ['Sort or quickselect median, then place large elements in odd positions and small elements in even positions from back to front.'],
    codeTemplates: {
      python: `class Solution:\n    def wiggleSort(self, nums: list) -> list:\n        pass`,
      javascript: `class Solution {\n    wiggleSort(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def wiggleSort(self, nums: list) -> list:
        s = sorted(nums)
        n = len(nums)
        mid = (n + 1) // 2
        left = s[:mid]
        right = s[mid:]
        res = [0] * n
        res[::2] = reversed(left)
        res[1::2] = reversed(right)
        for i in range(n): nums[i] = res[i]
        return nums`,
      javascript: `class Solution {
    wiggleSort(nums) {
        const s = [...nums].sort((a, b) => a - b);
        const n = nums.length;
        const mid = Math.floor((n + 1) / 2);
        const left = s.slice(0, mid);
        const right = s.slice(mid);
        let li = left.length - 1, ri = right.length - 1;
        for (let i = 0; i < n; i++) {
            if (i % 2 === 0) nums[i] = left[li--];
            else nums[i] = right[ri--];
        }
        return nums;
    }
}`,
    },
    editorial: {
      approach: 'Median Partitioned Interleaved Re-indexing.',
      algorithm: 'Reverse small and large halves into even/odd indices to guarantee strict inequality.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      content: 'Standard wiggle sort interleaving.',
      referenceCode: `res[::2] = reversed(left); res[1::2] = reversed(right)`,
    },
    tags: ['Array', 'Divide and Conquer', 'Sorting', 'Quickselect'],
    testCases: [
      { input: `[1,5,1,1,6,4]`, expectedOutput: `[1,6,1,5,1,4]`, isHidden: false, order: 0 },
      { input: `[1,3,2,2,3,1]`, expectedOutput: `[2,3,1,3,1,2]`, isHidden: false, order: 1 },
      { input: `[1]`, expectedOutput: `[1]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Maximum Gap Linear Time Pigeonhole Bucket Sort',
    slug: 'maximum-gap-linear-time-pigeonhole-bucket-sort',
    description: `Given an integer array \`nums\`, return the maximum difference between two successive elements in its sorted form in $O(N)$ time and space.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 10^5, 0 <= nums[i] <= 10^9`,
    inputFormat: `nums`,
    outputFormat: `Maximum gap integer.`,
    sampleInput: `[3,6,9,1]`,
    sampleOutput: `3`,
    points: 200,
    hints: ['Divide range [min_val, max_val] into n-1 buckets of size (max - min) / (n - 1). Maximum gap must occur between buckets.'],
    codeTemplates: {
      python: `class Solution:\n    def maximumGap(self, nums: list) -> int:\n        pass`,
      javascript: `class Solution {\n    maximumGap(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maximumGap(self, nums: list) -> int:
        n = len(nums)
        if n < 2: return 0
        min_v, max_v = min(nums), max(nums)
        if min_v == max_v: return 0
        import math
        b_size = max(1, (max_v - min_v) // (n - 1))
        b_count = (max_v - min_v) // b_size + 1
        buckets = [{'min': float('inf'), 'max': float('-inf')} for _ in range(b_count)]
        for x in nums:
            idx = (x - min_v) // b_size
            buckets[idx]['min'] = min(buckets[idx]['min'], x)
            buckets[idx]['max'] = max(buckets[idx]['max'], x)
        max_gap = 0
        prev_max = min_v
        for b in buckets:
            if b['min'] == float('inf'): continue
            max_gap = max(max_gap, b['min'] - prev_max)
            prev_max = b['max']
        return max_gap`,
      javascript: `class Solution {
    maximumGap(nums) {
        const n = nums.length;
        if (n < 2) return 0;
        const minV = Math.min(...nums), maxV = Math.max(...nums);
        if (minV === maxV) return 0;
        const bSize = Math.max(1, Math.floor((maxV - minV) / (n - 1)));
        const bCount = Math.floor((maxV - minV) / bSize) + 1;
        const buckets = Array.from({ length: bCount }, () => ({ min: Infinity, max: -Infinity }));
        for (const x of nums) {
            const idx = Math.floor((x - minV) / bSize);
            buckets[idx].min = Math.min(buckets[idx].min, x);
            buckets[idx].max = Math.max(buckets[idx].max, x);
        }
        let maxGap = 0;
        let prevMax = minV;
        for (const b of buckets) {
            if (b.min === Infinity) continue;
            maxGap = Math.max(maxGap, b.min - prevMax);
            prevMax = b.max;
        }
        return maxGap;
    }
}`,
    },
    editorial: {
      approach: 'Pigeonhole Principle Bucket Sort.',
      algorithm: 'By pigeonhole principle, max gap cannot lie within bucket of size <= gap floor. Compute consecutive non-empty bucket gaps.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard linear time maximum gap algorithm.',
      referenceCode: `max_gap = max(max_gap, b['min'] - prev_max)`,
    },
    tags: ['Array', 'Bucket Sort', 'Radix Sort', 'Sorting'],
    testCases: [
      { input: `[3,6,9,1]`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `[10]`, expectedOutput: `0`, isHidden: false, order: 1 },
      { input: `[1,10000000]`, expectedOutput: `9999999`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Rearrange Array Elements by Sign Alternating',
    slug: 'rearrange-array-elements-by-sign-alternating',
    description: `You are given a 0-indexed integer array \`nums\` of even length containing an equal number of positive and negative integers. Rearrange the elements of \`nums\` such that the modified array begins with a positive integer, alternates signs, and preserves relative order.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `2 <= nums.length <= 2 * 10^5, nums.length is even, 1 <= |nums[i]| <= 10^5`,
    inputFormat: `nums`,
    outputFormat: `Alternated sign array.`,
    sampleInput: `[3,1,-2,-5,2,-4]`,
    sampleOutput: `[3,-2,1,-5,2,-4]`,
    points: 100,
    hints: ['Maintain pos_idx = 0 and neg_idx = 1, placing positive numbers at even indices and negative numbers at odd indices.'],
    codeTemplates: {
      python: `class Solution:\n    def rearrangeArray(self, nums: list) -> list:\n        pass`,
      javascript: `class Solution {\n    rearrangeArray(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def rearrangeArray(self, nums: list) -> list:
        res = [0] * len(nums)
        pos, neg = 0, 1
        for x in nums:
            if x > 0:
                res[pos] = x
                pos += 2
            else:
                res[neg] = x
                neg += 2
        return res`,
      javascript: `class Solution {
    rearrangeArray(nums) {
        const res = Array(nums.length).fill(0);
        let pos = 0, neg = 1;
        for (const x of nums) {
            if (x > 0) {
                res[pos] = x; pos += 2;
            } else {
                res[neg] = x; neg += 2;
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Dual Index Even/Odd Alternation.',
      algorithm: 'Single pass placing positive elements at 2k and negative elements at 2k+1.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard sign alternation array traversal.',
      referenceCode: `if x > 0: res[pos] = x; pos += 2 else: res[neg] = x; neg += 2`,
    },
    tags: ['Array', 'Two Pointers', 'Simulation'],
    testCases: [
      { input: `[3,1,-2,-5,2,-4]`, expectedOutput: `[3,-2,1,-5,2,-4]`, isHidden: false, order: 0 },
      { input: `[-1,1]`, expectedOutput: `[1,-1]`, isHidden: false, order: 1 },
      { input: `[1,-1,2,-2]`, expectedOutput: `[1,-1,2,-2]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Sort Array By Parity Even First',
    slug: 'sort-array-by-parity-even-first',
    description: `Given an integer array \`nums\`, move all the even integers at the beginning of the array followed by all the odd integers. Return any array that satisfies this condition (preserve relative order of even/odd).`,
    difficulty: 'EASY',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 5000, 0 <= nums[i] <= 5000`,
    inputFormat: `nums`,
    outputFormat: `Array sorted by parity.`,
    sampleInput: `[3,1,2,4]`,
    sampleOutput: `[2,4,3,1]`,
    points: 50,
    hints: ['Collect evens first then odds, or use two pointers in a single pass.'],
    codeTemplates: {
      python: `class Solution:\n    def sortArrayByParity(self, nums: list) -> list:\n        pass`,
      javascript: `class Solution {\n    sortArrayByParity(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def sortArrayByParity(self, nums: list) -> list:
        evens = [x for x in nums if x % 2 == 0]
        odds = [x for x in nums if x % 2 != 0]
        return evens + odds`,
      javascript: `class Solution {
    sortArrayByParity(nums) {
        const evens = nums.filter(x => x % 2 === 0);
        const odds = nums.filter(x => x % 2 !== 0);
        return [...evens, ...odds];
    }
}`,
    },
    editorial: {
      approach: 'Parity Partitioning.',
      algorithm: 'Filter evens and odds into segregated lists in linear time.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard array parity separation.',
      referenceCode: `return evens + odds`,
    },
    tags: ['Array', 'Two Pointers', 'Sorting'],
    testCases: [
      { input: `[3,1,2,4]`, expectedOutput: `[2,4,3,1]`, isHidden: false, order: 0 },
      { input: `[0]`, expectedOutput: `[0]`, isHidden: false, order: 1 },
      { input: `[1,3,5]`, expectedOutput: `[1,3,5]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Matrix Diagonal Traverse ZigZag',
    slug: 'matrix-diagonal-traverse-zigzag',
    description: `Given an \`m x n\` matrix \`mat\`, return an array of all the elements of the array in a diagonal order (alternating up-right and down-left directions).`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `m == mat.length, n == mat[i].length, 1 <= m, n <= 100`,
    inputFormat: `mat`,
    outputFormat: `List of diagonal traverse elements.`,
    sampleInput: `[[1,2,3],[4,5,6],[7,8,9]]`,
    sampleOutput: `[1,2,4,7,5,3,6,8,9]`,
    points: 100,
    hints: ['Diagonals share constant r + c = d. Reverse even diagonal levels.'],
    codeTemplates: {
      python: `class Solution:\n    def findDiagonalOrder(self, mat: list) -> list:\n        pass`,
      javascript: `class Solution {\n    findDiagonalOrder(mat) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findDiagonalOrder(self, mat: list) -> list:
        if not mat or not mat[0]: return []
        m, n = len(mat), len(mat[0])
        diags = [[] for _ in range(m + n - 1)]
        for r in range(m):
            for c in range(n):
                diags[r + c].append(mat[r][c])
        res = []
        for d, diag in enumerate(diags):
            if d % 2 == 0:
                res.extend(reversed(diag))
            else:
                res.extend(diag)
        return res`,
      javascript: `class Solution {
    findDiagonalOrder(mat) {
        if (!mat || mat.length === 0) return [];
        const m = mat.length, n = mat[0].length;
        const diags = Array.from({ length: m + n - 1 }, () => []);
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                diags[r + c].push(mat[r][c]);
            }
        }
        const res = [];
        diags.forEach((diag, d) => {
            if (d % 2 === 0) res.push(...diag.reverse());
            else res.push(...diag);
        });
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Diagonal Bucketing by r + c Sum.',
      algorithm: 'Group matrix entries by r + c index sum, reversing alternate diagonal lists.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(M * N)',
      content: 'Standard matrix diagonal zigzag traversal.',
      referenceCode: `if d % 2 == 0: res.extend(reversed(diag)) else: res.extend(diag)`,
    },
    tags: ['Array', 'Matrix', 'Simulation'],
    testCases: [
      { input: `[[1,2,3],[4,5,6],[7,8,9]]`, expectedOutput: `[1,2,4,7,5,3,6,8,9]`, isHidden: false, order: 0 },
      { input: `[[1,2],[3,4]]`, expectedOutput: `[1,2,3,4]`, isHidden: false, order: 1 },
      { input: `[[1]]`, expectedOutput: `[1]`, isHidden: true, order: 2 },
    ],
  },
];

writePack('pack-500-part-l.ts', 'pack500PartLDefs', problemsL);
