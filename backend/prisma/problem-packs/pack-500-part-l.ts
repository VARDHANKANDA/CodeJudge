import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack500PartLDefs: ProblemDef[] = [
  {
    "title": "Count Inversions in Array Fenwick Tree",
    "slug": "count-inversions-in-array-fenwick-tree",
    "description": "Given an integer array `nums`, return the number of inversions in the array (a pair of indices $(i, j)$ such that $i < j$ and $nums[i] > nums[j]$).",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 10^5, -10^9 <= nums[i] <= 10^9",
    "inputFormat": "nums",
    "outputFormat": "Count of inversions integer.",
    "sampleInput": "[2,4,1,3,5]",
    "sampleOutput": "3",
    "points": 200,
    "hints": [
      "Coordinate compress array elements, then insert from right to left into a Fenwick tree querying prefix sums."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def countInversions(self, nums: list) -> int:\n        pass",
      "javascript": "class Solution {\n    countInversions(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def countInversions(self, nums: list) -> int:\n        n = len(nums)\n        sorted_vals = sorted(list(set(nums)))\n        rank = {v: i + 1 for i, v in enumerate(sorted_vals)}\n        tree = [0] * (len(sorted_vals) + 1)\n        def update(i, delta):\n            while i < len(tree):\n                tree[i] += delta\n                i += i & (-i)\n        def query(i):\n            s = 0\n            while i > 0:\n                s += tree[i]\n                i -= i & (-i)\n            return s\n        inv = 0\n        for i in range(n - 1, -1, -1):\n            r = rank[nums[i]]\n            inv += query(r - 1)\n            update(r, 1)\n        return inv",
      "javascript": "class Solution {\n    countInversions(nums) {\n        const n = nums.length;\n        const sortedVals = Array.from(new Set(nums)).sort((a, b) => a - b);\n        const rank = new Map();\n        sortedVals.forEach((v, i) => rank.set(v, i + 1));\n        const tree = Array(sortedVals.length + 1).fill(0);\n        function update(i, delta) {\n            for (; i < tree.length; i += i & -i) tree[i] += delta;\n        }\n        function query(i) {\n            let s = 0;\n            for (; i > 0; i -= i & -i) s += tree[i];\n            return s;\n        }\n        let inv = 0;\n        for (let i = n - 1; i >= 0; i--) {\n            const r = rank.get(nums[i]);\n            inv += query(r - 1);\n            update(r, 1);\n        }\n        return inv;\n    }\n}"
    },
    "editorial": {
      "approach": "Coordinate Compression + Fenwick Tree Point Query.",
      "algorithm": "Process in reverse order and sum smaller elements already inserted in the BIT.",
      "timeComplexity": "O(N log N)",
      "spaceComplexity": "O(N)",
      "content": "Standard Fenwick tree inversion counting.",
      "referenceCode": "inv += query(r - 1); update(r, 1)"
    },
    "tags": [
      "Array",
      "Binary Indexed Tree",
      "Divide and Conquer",
      "Sorting"
    ],
    "testCases": [
      {
        "input": "[2,4,1,3,5]",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[5,4,3,2,1]",
        "expectedOutput": "10",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1,2,3,4,5]",
        "expectedOutput": "0",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Global and Local Inversions Equivalence Check",
    "slug": "global-and-local-inversions-equivalence-check",
    "description": "You are given an integer array `nums` of length `n` which represents a permutation of all the numbers in the range `[0, n - 1]`. Return `true` if the number of global inversions is equal to the number of local inversions.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "n == nums.length, 1 <= n <= 10^5, 0 <= nums[i] < n",
    "inputFormat": "nums",
    "outputFormat": "Boolean true/false.",
    "sampleInput": "[1,0,2]",
    "sampleOutput": "true",
    "points": 100,
    "hints": [
      "All local inversions are global inversions. A non-local global inversion occurs whenever abs(nums[i] - i) > 1."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def isIdealPermutation(self, nums: list) -> bool:\n        pass",
      "javascript": "class Solution {\n    isIdealPermutation(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def isIdealPermutation(self, nums: list) -> bool:\n        for i, x in enumerate(nums):\n            if abs(x - i) > 1:\n                return False\n        return True",
      "javascript": "class Solution {\n    isIdealPermutation(nums) {\n        for (let i = 0; i < nums.length; i++) {\n            if (Math.abs(nums[i] - i) > 1) return false;\n        }\n        return true;\n    }\n}"
    },
    "editorial": {
      "approach": "Index Displacement Invariant.",
      "algorithm": "Every local inversion is a global inversion. Any non-local inversion requires an element shifted by > 1 position.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "content": "Standard permutation inversion equivalence.",
      "referenceCode": "if abs(x - i) > 1: return False"
    },
    "tags": [
      "Array",
      "Math"
    ],
    "testCases": [
      {
        "input": "[1,0,2]",
        "expectedOutput": "true",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1,2,0]",
        "expectedOutput": "false",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[0]",
        "expectedOutput": "true",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Sort Colors Dutch National Flag Partition",
    "slug": "sort-colors-dutch-national-flag-partition",
    "description": "Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red (0), white (1), and blue (2).",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 300, nums[i] is either 0, 1, or 2",
    "inputFormat": "nums",
    "outputFormat": "In-place sorted array.",
    "sampleInput": "[2,0,2,1,1,0]",
    "sampleOutput": "[0,0,1,1,2,2]",
    "points": 100,
    "hints": [
      "Dutch National Flag algorithm: maintain 3 pointers low, mid, high."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def sortColors(self, nums: list) -> list:\n        pass",
      "javascript": "class Solution {\n    sortColors(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def sortColors(self, nums: list) -> list:\n        low, mid, high = 0, 0, len(nums) - 1\n        while mid <= high:\n            if nums[mid] == 0:\n                nums[low], nums[mid] = nums[mid], nums[low]\n                low += 1\n                mid += 1\n            elif nums[mid] == 1:\n                mid += 1\n            else:\n                nums[mid], nums[high] = nums[high], nums[mid]\n                high -= 1\n        return nums",
      "javascript": "class Solution {\n    sortColors(nums) {\n        let low = 0, mid = 0, high = nums.length - 1;\n        while (mid <= high) {\n            if (nums[mid] === 0) {\n                const t = nums[low]; nums[low] = nums[mid]; nums[mid] = t;\n                low++; mid++;\n            } else if (nums[mid] === 1) {\n                mid++;\n            } else {\n                const t = nums[mid]; nums[mid] = nums[high]; nums[high] = t;\n                high--;\n            }\n        }\n        return nums;\n    }\n}"
    },
    "editorial": {
      "approach": "Dijkstra 3-Way Partitioning (Dutch National Flag).",
      "algorithm": "Three-pointer single pass partitioning in O(N) time and O(1) space.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "content": "Classic 3-way partition.",
      "referenceCode": "nums[low], nums[mid] = nums[mid], nums[low]"
    },
    "tags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "testCases": [
      {
        "input": "[2,0,2,1,1,0]",
        "expectedOutput": "[0,0,1,1,2,2]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[2,0,1]",
        "expectedOutput": "[0,1,2]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[0]",
        "expectedOutput": "[0]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Kth Largest Element in an Array Quickselect",
    "slug": "kth-largest-element-in-an-array-quickselect",
    "description": "Given an integer array `nums` and an integer `k`, return the `k`-th largest element in the array in average $O(N)$ time.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= k <= nums.length <= 10^5, -10^4 <= nums[i] <= 10^4",
    "inputFormat": "nums, k",
    "outputFormat": "Kth largest integer.",
    "sampleInput": "[3,2,1,5,6,4], 2",
    "sampleOutput": "5",
    "points": 100,
    "hints": [
      "Use Quickselect (Hoare selection) targeting index n - k."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def findKthLargest(self, nums: list, k: int) -> int:\n        pass",
      "javascript": "class Solution {\n    findKthLargest(nums, k) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def findKthLargest(self, nums: list, k: int) -> int:\n        target = len(nums) - k\n        def quickselect(l, r):\n            pivot = nums[r]\n            p = l\n            for i in range(l, r):\n                if nums[i] <= pivot:\n                    nums[p], nums[i] = nums[i], nums[p]\n                    p += 1\n            nums[p], nums[r] = nums[r], nums[p]\n            if p == target:\n                return nums[p]\n            elif p < target:\n                return quickselect(p + 1, r)\n            else:\n                return quickselect(l, p - 1)\n        return quickselect(0, len(nums) - 1)",
      "javascript": "class Solution {\n    findKthLargest(nums, k) {\n        const target = nums.length - k;\n        function quickselect(l, r) {\n            const pivot = nums[r];\n            let p = l;\n            for (let i = l; i < r; i++) {\n                if (nums[i] <= pivot) {\n                    const t = nums[p]; nums[p] = nums[i]; nums[i] = t;\n                    p++;\n                }\n            }\n            const t = nums[p]; nums[p] = nums[r]; nums[r] = t;\n            if (p === target) return nums[p];\n            if (p < target) return quickselect(p + 1, r);\n            return quickselect(l, p - 1);\n        }\n        return quickselect(0, nums.length - 1);\n    }\n}"
    },
    "editorial": {
      "approach": "Quickselect (Hoare Order Statistic Selection).",
      "algorithm": "Partition around pivot and only recurse on the side containing target rank.",
      "timeComplexity": "Average O(N), Worst O(N^2)",
      "spaceComplexity": "O(1)",
      "content": "Standard quickselect rank retrieval.",
      "referenceCode": "if p == target: return nums[p]"
    },
    "tags": [
      "Array",
      "Divide and Conquer",
      "Quickselect",
      "Sorting"
    ],
    "testCases": [
      {
        "input": "[3,2,1,5,6,4], 2",
        "expectedOutput": "5",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[3,2,3,1,2,4,5,5,6], 4",
        "expectedOutput": "4",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1], 1",
        "expectedOutput": "1",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Next Permutation Lexicographical Successor",
    "slug": "next-permutation-lexicographical-successor",
    "description": "A permutation of an array of integers is an arrangement of its members into a sequence or linear order. Given an array of integers `nums`, find the next lexicographical permutation of its elements in-place.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 100, 0 <= nums[i] <= 100",
    "inputFormat": "nums",
    "outputFormat": "Next permutation array.",
    "sampleInput": "[1,2,3]",
    "sampleOutput": "[1,3,2]",
    "points": 100,
    "hints": [
      "Find largest index i where nums[i] < nums[i+1]. Find largest index j > i where nums[j] > nums[i]. Swap and reverse nums[i+1:]."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def nextPermutation(self, nums: list) -> list:\n        pass",
      "javascript": "class Solution {\n    nextPermutation(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def nextPermutation(self, nums: list) -> list:\n        i = len(nums) - 2\n        while i >= 0 and nums[i] >= nums[i + 1]:\n            i -= 1\n        if i >= 0:\n            j = len(nums) - 1\n            while nums[j] <= nums[i]:\n                j -= 1\n            nums[i], nums[j] = nums[j], nums[i]\n        nums[i + 1:] = reversed(nums[i + 1:])\n        return nums",
      "javascript": "class Solution {\n    nextPermutation(nums) {\n        let i = nums.length - 2;\n        while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n        if (i >= 0) {\n            let j = nums.length - 1;\n            while (nums[j] <= nums[i]) j--;\n            const t = nums[i]; nums[i] = nums[j]; nums[j] = t;\n        }\n        let l = i + 1, r = nums.length - 1;\n        while (l < r) {\n            const t = nums[l]; nums[l] = nums[r]; nums[r] = t;\n            l++; r--;\n        }\n        return nums;\n    }\n}"
    },
    "editorial": {
      "approach": "Narayana Pandita Lexicographical Permutation Successor.",
      "algorithm": "Identify decreasing suffix, pivot swap, and suffix reversal in O(N) time.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "content": "Classic next permutation generation.",
      "referenceCode": "nums[i + 1:] = reversed(nums[i + 1:])"
    },
    "tags": [
      "Array",
      "Two Pointers"
    ],
    "testCases": [
      {
        "input": "[1,2,3]",
        "expectedOutput": "[1,3,2]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[3,2,1]",
        "expectedOutput": "[1,2,3]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1,1,5]",
        "expectedOutput": "[1,5,1]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Spiral Matrix II Matrix Generation",
    "slug": "spiral-matrix-ii-matrix-generation",
    "description": "Given a positive integer `n`, generate an `n x n` matrix filled with elements from `1` to `n^2` in spiral order.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 20",
    "inputFormat": "n",
    "outputFormat": "n x n matrix filled spirally.",
    "sampleInput": "3",
    "sampleOutput": "[[1,2,3],[8,9,4],[7,6,5]]",
    "points": 100,
    "hints": [
      "Maintain four boundary pointers (top, bottom, left, right) and shrink boundaries after filling each edge."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def generateMatrix(self, n: int) -> list:\n        pass",
      "javascript": "class Solution {\n    generateMatrix(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def generateMatrix(self, n: int) -> list:\n        mat = [[0] * n for _ in range(n)]\n        top, bottom, left, right = 0, n - 1, 0, n - 1\n        num = 1\n        while top <= bottom and left <= right:\n            for c in range(left, right + 1):\n                mat[top][c] = num; num += 1\n            top += 1\n            for r in range(top, bottom + 1):\n                mat[r][right] = num; num += 1\n            right -= 1\n            if top <= bottom:\n                for c in range(right, left - 1, -1):\n                    mat[bottom][c] = num; num += 1\n                bottom -= 1\n            if left <= right:\n                for r in range(bottom, top - 1, -1):\n                    mat[r][left] = num; num += 1\n                left += 1\n        return mat",
      "javascript": "class Solution {\n    generateMatrix(n) {\n        const mat = Array.from({ length: n }, () => Array(n).fill(0));\n        let top = 0, bottom = n - 1, left = 0, right = n - 1;\n        let num = 1;\n        while (top <= bottom && left <= right) {\n            for (let c = left; c <= right; c++) mat[top][c] = num++;\n            top++;\n            for (let r = top; r <= bottom; r++) mat[r][right] = num++;\n            right--;\n            if (top <= bottom) {\n                for (let c = right; c >= left; c--) mat[bottom][c] = num++;\n                bottom--;\n            }\n            if (left <= right) {\n                for (let r = bottom; r >= top; r--) mat[r][left] = num++;\n                left++;\n            }\n        }\n        return mat;\n    }\n}"
    },
    "editorial": {
      "approach": "4-Boundary Layered Spiral Traversal.",
      "algorithm": "Fill perimeter edges (right, down, left, up) while contracting bounds.",
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(N^2)",
      "content": "Standard spiral matrix population.",
      "referenceCode": "top += 1; right -= 1; bottom -= 1; left += 1"
    },
    "tags": [
      "Array",
      "Matrix",
      "Simulation"
    ],
    "testCases": [
      {
        "input": "3",
        "expectedOutput": "[[1,2,3],[8,9,4],[7,6,5]]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "1",
        "expectedOutput": "[[1]]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "2",
        "expectedOutput": "[[1,2],[4,3]]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Rotate Image 90 Degrees In-Place",
    "slug": "rotate-image-90-degrees-in-place",
    "description": "You are given an `n x n` 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "matrix.length == n, matrix[i].length == n, 1 <= n <= 20",
    "inputFormat": "matrix",
    "outputFormat": "90-degree rotated matrix.",
    "sampleInput": "[[1,2,3],[4,5,6],[7,8,9]]",
    "sampleOutput": "[[7,4,1],[8,5,2],[9,6,3]]",
    "points": 100,
    "hints": [
      "Transpose the matrix (swap matrix[i][j] with matrix[j][i]) then reverse each row."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def rotate(self, matrix: list) -> list:\n        pass",
      "javascript": "class Solution {\n    rotate(matrix) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def rotate(self, matrix: list) -> list:\n        n = len(matrix)\n        for i in range(n):\n            for j in range(i + 1, n):\n                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n        for i in range(n):\n            matrix[i].reverse()\n        return matrix",
      "javascript": "class Solution {\n    rotate(matrix) {\n        const n = matrix.length;\n        for (let i = 0; i < n; i++) {\n            for (let j = i + 1; j < n; j++) {\n                const t = matrix[i][j];\n                matrix[i][j] = matrix[j][i];\n                matrix[j][i] = t;\n            }\n        }\n        for (let i = 0; i < n; i++) matrix[i].reverse();\n        return matrix;\n    }\n}"
    },
    "editorial": {
      "approach": "Transpose + Horizontal Row Reflection.",
      "algorithm": "Clockwise 90-degree rotation is identical to Transpose + Reverse Rows.",
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(1)",
      "content": "Standard in-place matrix rotation.",
      "referenceCode": "matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]; matrix[i].reverse()"
    },
    "tags": [
      "Array",
      "Math",
      "Matrix"
    ],
    "testCases": [
      {
        "input": "[[1,2,3],[4,5,6],[7,8,9]]",
        "expectedOutput": "[[7,4,1],[8,5,2],[9,6,3]]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
        "expectedOutput": "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1]]",
        "expectedOutput": "[[1]]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Set Matrix Zeroes Constant Space In-Place",
    "slug": "set-matrix-zeroes-constant-space-in-place",
    "description": "Given an `m x n` integer matrix `matrix`, if an element is 0, set its entire row and column to 0's in-place in $O(1)$ extra space.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "m == matrix.length, n == matrix[0].length, 1 <= m, n <= 200",
    "inputFormat": "matrix",
    "outputFormat": "Modified matrix.",
    "sampleInput": "[[1,1,1],[1,0,1],[1,1,1]]",
    "sampleOutput": "[[1,0,1],[0,0,0],[1,0,1]]",
    "points": 100,
    "hints": [
      "Use first row and first column as marker storage, with a boolean flag for column 0."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def setZeroes(self, matrix: list) -> list:\n        pass",
      "javascript": "class Solution {\n    setZeroes(matrix) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def setZeroes(self, matrix: list) -> list:\n        m, n = len(matrix), len(matrix[0])\n        first_col_zero = any(matrix[i][0] == 0 for i in range(m))\n        first_row_zero = any(matrix[0][j] == 0 for j in range(n))\n        for i in range(1, m):\n            for j in range(1, n):\n                if matrix[i][j] == 0:\n                    matrix[i][0] = 0\n                    matrix[0][j] = 0\n        for i in range(1, m):\n            for j in range(1, n):\n                if matrix[i][0] == 0 or matrix[0][j] == 0:\n                    matrix[i][j] = 0\n        if first_col_zero:\n            for i in range(m): matrix[i][0] = 0\n        if first_row_zero:\n            for j in range(n): matrix[0][j] = 0\n        return matrix",
      "javascript": "class Solution {\n    setZeroes(matrix) {\n        const m = matrix.length, n = matrix[0].length;\n        let firstColZero = false, firstRowZero = false;\n        for (let i = 0; i < m; i++) if (matrix[i][0] === 0) firstColZero = true;\n        for (let j = 0; j < n; j++) if (matrix[0][j] === 0) firstRowZero = true;\n        for (let i = 1; i < m; i++) {\n            for (let j = 1; j < n; j++) {\n                if (matrix[i][j] === 0) {\n                    matrix[i][0] = 0; matrix[0][j] = 0;\n                }\n            }\n        }\n        for (let i = 1; i < m; i++) {\n            for (let j = 1; j < n; j++) {\n                if (matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0;\n            }\n        }\n        if (firstColZero) for (let i = 0; i < m; i++) matrix[i][0] = 0;\n        if (firstRowZero) for (let j = 0; j < n; j++) matrix[0][j] = 0;\n        return matrix;\n    }\n}"
    },
    "editorial": {
      "approach": "First Row/Col In-Place Sentinel Flags.",
      "algorithm": "Embed zero marker bits into matrix header edges in O(1) auxiliary space.",
      "timeComplexity": "O(M * N)",
      "spaceComplexity": "O(1)",
      "content": "Standard matrix in-place sentinel flag encoding.",
      "referenceCode": "matrix[i][0] = 0; matrix[0][j] = 0"
    },
    "tags": [
      "Array",
      "Hash Table",
      "Matrix"
    ],
    "testCases": [
      {
        "input": "[[1,1,1],[1,0,1],[1,1,1]]",
        "expectedOutput": "[[1,0,1],[0,0,0],[1,0,1]]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
        "expectedOutput": "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1]]",
        "expectedOutput": "[[1]]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Game of Life State Transition In-Place",
    "slug": "game-of-life-state-transition-in-place",
    "description": "According to Conway's Game of Life rules, calculate the next state of the `m x n` board in-place using 2-bit state encoding.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "m == board.length, n == board[i].length, 1 <= m, n <= 25",
    "inputFormat": "board",
    "outputFormat": "Updated board matrix.",
    "sampleInput": "[[0,1,0],[0,0,1],[1,1,1],[0,0,0]]",
    "sampleOutput": "[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]",
    "points": 100,
    "hints": [
      "Use bit 1 for next state and bit 0 for current state: board[i][j] |= (next_state << 1), then right-shift."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def gameOfLife(self, board: list) -> list:\n        pass",
      "javascript": "class Solution {\n    gameOfLife(board) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def gameOfLife(self, board: list) -> list:\n        m, n = len(board), len(board[0])\n        for r in range(m):\n            for c in range(n):\n                live = 0\n                for dr in [-1,0,1]:\n                    for dc in [-1,0,1]:\n                        if dr == 0 and dc == 0: continue\n                        nr, nc = r + dr, c + dc\n                        if 0 <= nr < m and 0 <= nc < n:\n                            live += (board[nr][nc] & 1)\n                cur = board[r][c] & 1\n                if cur == 1 and live in (2, 3):\n                    board[r][c] |= 2\n                elif cur == 0 and live == 3:\n                    board[r][c] |= 2\n        for r in range(m):\n            for c in range(n):\n                board[r][c] >>= 1\n        return board",
      "javascript": "class Solution {\n    gameOfLife(board) {\n        const m = board.length, n = board[0].length;\n        for (let r = 0; r < m; r++) {\n            for (let c = 0; c < n; c++) {\n                let live = 0;\n                for (let dr = -1; dr <= 1; dr++) {\n                    for (let dc = -1; dc <= 1; dc++) {\n                        if (dr === 0 && dc === 0) continue;\n                        const nr = r + dr, nc = c + dc;\n                        if (nr >= 0 && nr < m && nc >= 0 && nc < n) {\n                            live += (board[nr][nc] & 1);\n                        }\n                    }\n                }\n                const cur = board[r][c] & 1;\n                if (cur === 1 && (live === 2 || live === 3)) board[r][c] |= 2;\n                else if (cur === 0 && live === 3) board[r][c] |= 2;\n            }\n        }\n        for (let r = 0; r < m; r++) {\n            for (let c = 0; c < n; c++) board[r][c] >>= 1;\n        }\n        return board;\n    }\n}"
    },
    "editorial": {
      "approach": "2-Bit Transition State Encoding.",
      "algorithm": "Store past and future state in binary bits (bit 0 = past, bit 1 = future) in O(1) space.",
      "timeComplexity": "O(M * N)",
      "spaceComplexity": "O(1)",
      "content": "Standard in-place cellular automaton transition.",
      "referenceCode": "board[r][c] |= 2; board[r][c] >>= 1"
    },
    "tags": [
      "Array",
      "Matrix",
      "Simulation"
    ],
    "testCases": [
      {
        "input": "[[0,1,0],[0,0,1],[1,1,1],[0,0,0]]",
        "expectedOutput": "[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[1,1],[1,0]]",
        "expectedOutput": "[[1,1],[1,1]]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[0]]",
        "expectedOutput": "[[0]]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Find the Duplicate Number Floyd Cycle Detection",
    "slug": "find-the-duplicate-number-floyd-cycle-detection",
    "description": "Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive. There is only one repeated number in `nums`, return this repeated number without modifying the array in $O(1)$ extra space.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 10^5, nums.length == n + 1, 1 <= nums[i] <= n",
    "inputFormat": "nums",
    "outputFormat": "Duplicate number integer.",
    "sampleInput": "[1,3,4,2,2]",
    "sampleOutput": "2",
    "points": 100,
    "hints": [
      "Treat the array as a linked list where next pointer from index i is nums[i]. Use Floyd Tortoise and Hare."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def findDuplicate(self, nums: list) -> int:\n        pass",
      "javascript": "class Solution {\n    findDuplicate(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def findDuplicate(self, nums: list) -> int:\n        slow = nums[0]\n        fast = nums[0]\n        while True:\n            slow = nums[slow]\n            fast = nums[nums[fast]]\n            if slow == fast: break\n        slow = nums[0]\n        while slow != fast:\n            slow = nums[slow]\n            fast = nums[fast]\n        return slow",
      "javascript": "class Solution {\n    findDuplicate(nums) {\n        let slow = nums[0], fast = nums[0];\n        while (true) {\n            slow = nums[slow];\n            fast = nums[nums[fast]];\n            if (slow === fast) break;\n        }\n        slow = nums[0];\n        while (slow !== fast) {\n            slow = nums[slow];\n            fast = nums[fast];\n        }\n        return slow;\n    }\n}"
    },
    "editorial": {
      "approach": "Floyd Tortoise and Hare Cycle Detection.",
      "algorithm": "Index-value mapping represents functional graph with cycle entry at duplicate value.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "content": "Classic functional graph cycle entry discovery.",
      "referenceCode": "slow = nums[slow]; fast = nums[nums[fast]]"
    },
    "tags": [
      "Array",
      "Two Pointers",
      "Binary Search",
      "Bit Manipulation"
    ],
    "testCases": [
      {
        "input": "[1,3,4,2,2]",
        "expectedOutput": "2",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[3,1,3,4,2]",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[3,3,3,3,3]",
        "expectedOutput": "3",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "First Missing Positive Integer In-Place Hash",
    "slug": "first-missing-positive-integer-in-place-hash",
    "description": "Given an unsorted integer array `nums`, return the smallest positive integer that is not present in `nums` in $O(N)$ time and $O(1)$ space.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 10^5, -2^31 <= nums[i] <= 2^31 - 1",
    "inputFormat": "nums",
    "outputFormat": "Smallest missing positive integer.",
    "sampleInput": "[1,2,0]",
    "sampleOutput": "3",
    "points": 200,
    "hints": [
      "Place each positive number x where 1 <= x <= n at index x - 1 using cyclic swaps."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def firstMissingPositive(self, nums: list) -> int:\n        pass",
      "javascript": "class Solution {\n    firstMissingPositive(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def firstMissingPositive(self, nums: list) -> int:\n        n = len(nums)\n        for i in range(n):\n            while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:\n                target = nums[i] - 1\n                nums[i], nums[target] = nums[target], nums[i]\n        for i in range(n):\n            if nums[i] != i + 1:\n                return i + 1\n        return n + 1",
      "javascript": "class Solution {\n    firstMissingPositive(nums) {\n        const n = nums.length;\n        for (let i = 0; i < n; i++) {\n            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {\n                const target = nums[i] - 1;\n                const t = nums[i]; nums[i] = nums[target]; nums[target] = t;\n            }\n        }\n        for (let i = 0; i < n; i++) {\n            if (nums[i] !== i + 1) return i + 1;\n        }\n        return n + 1;\n    }\n}"
    },
    "editorial": {
      "approach": "In-Place Cyclic Placement Sort.",
      "algorithm": "Cyclically swap values into index-aligned buckets in O(N) amortized steps.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "content": "Classic first missing positive constant space algorithm.",
      "referenceCode": "nums[i], nums[target] = nums[target], nums[i]"
    },
    "tags": [
      "Array",
      "Hash Table"
    ],
    "testCases": [
      {
        "input": "[1,2,0]",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[3,4,-1,1]",
        "expectedOutput": "2",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[7,8,9,11,12]",
        "expectedOutput": "1",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Product of Array Except Self Prefix Suffix Squeeze",
    "slug": "product-of-array-except-self-prefix-suffix-squeeze",
    "description": "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]` without using division in $O(N)$ time and $O(1)$ extra space.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "2 <= nums.length <= 10^5, -30 <= nums[i] <= 30",
    "inputFormat": "nums",
    "outputFormat": "Product array.",
    "sampleInput": "[1,2,3,4]",
    "sampleOutput": "[24,12,8,6]",
    "points": 100,
    "hints": [
      "Accumulate prefix products into output array, then multiply by running suffix product in reverse pass."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def productExceptSelf(self, nums: list) -> list:\n        pass",
      "javascript": "class Solution {\n    productExceptSelf(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def productExceptSelf(self, nums: list) -> list:\n        n = len(nums)\n        ans = [1] * n\n        prefix = 1\n        for i in range(n):\n            ans[i] = prefix\n            prefix *= nums[i]\n        suffix = 1\n        for i in range(n - 1, -1, -1):\n            ans[i] *= suffix\n            suffix *= nums[i]\n        return ans",
      "javascript": "class Solution {\n    productExceptSelf(nums) {\n        const n = nums.length;\n        const ans = Array(n).fill(1);\n        let prefix = 1;\n        for (let i = 0; i < n; i++) {\n            ans[i] = prefix;\n            prefix *= nums[i];\n        }\n        let suffix = 1;\n        for (let i = n - 1; i >= 0; i--) {\n            ans[i] *= suffix;\n            suffix *= nums[i];\n        }\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "Two-Pass Prefix and Suffix Running Product.",
      "algorithm": "Compute prefix products in forward pass and multiply suffix products in reverse pass.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1) extra auxiliary space",
      "content": "Standard division-free product of array algorithm.",
      "referenceCode": "ans[i] = prefix; prefix *= nums[i]"
    },
    "tags": [
      "Array",
      "Prefix Sum"
    ],
    "testCases": [
      {
        "input": "[1,2,3,4]",
        "expectedOutput": "[24,12,8,6]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[-1,1,0,-3,3]",
        "expectedOutput": "[0,0,9,0,0]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[2,3]",
        "expectedOutput": "[3,2]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Increasing Triplet Subsequence Constant Space",
    "slug": "increasing-triplet-subsequence-constant-space",
    "description": "Given an integer array `nums`, return `true` if there exists a triple of indices $(i, j, k)$ such that $i < j < k$ and $nums[i] < nums[j] < nums[k]$. If no such indices exist, return `false`.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 5 * 10^5, -2^31 <= nums[i] <= 2^31 - 1",
    "inputFormat": "nums",
    "outputFormat": "Boolean true/false.",
    "sampleInput": "[1,2,3,4,5]",
    "sampleOutput": "true",
    "points": 100,
    "hints": [
      "Track smallest (first) and second smallest (second) elements encountered so far."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def increasingTriplet(self, nums: list) -> bool:\n        pass",
      "javascript": "class Solution {\n    increasingTriplet(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def increasingTriplet(self, nums: list) -> bool:\n        first, second = float('inf'), float('inf')\n        for x in nums:\n            if x <= first:\n                first = x\n            elif x <= second:\n                second = x\n            else:\n                return True\n        return False",
      "javascript": "class Solution {\n    increasingTriplet(nums) {\n        let first = Infinity, second = Infinity;\n        for (const x of nums) {\n            if (x <= first) {\n                first = x;\n            } else if (x <= second) {\n                second = x;\n            } else {\n                return true;\n            }\n        }\n        return false;\n    }\n}"
    },
    "editorial": {
      "approach": "Two-Threshold Greedy Tracking.",
      "algorithm": "Patience sorting / LIS reduction for fixed length 3 in O(1) space.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "content": "Standard increasing triplet greedy check.",
      "referenceCode": "if x <= first: first = x elif x <= second: second = x else: return True"
    },
    "tags": [
      "Array",
      "Greedy"
    ],
    "testCases": [
      {
        "input": "[1,2,3,4,5]",
        "expectedOutput": "true",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[5,4,3,2,1]",
        "expectedOutput": "false",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[2,1,5,0,4,6]",
        "expectedOutput": "true",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Wiggle Sort II Virtual Index Mapping",
    "slug": "wiggle-sort-ii-virtual-index-mapping",
    "description": "Given an integer array `nums`, reorder it such that $nums[0] < nums[1] > nums[2] < nums[3]\\dots$ in-place.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 50000, 0 <= nums[i] <= 5000",
    "inputFormat": "nums",
    "outputFormat": "Wiggle sorted array.",
    "sampleInput": "[1,5,1,1,6,4]",
    "sampleOutput": "[1,6,1,5,1,4]",
    "points": 150,
    "hints": [
      "Sort or quickselect median, then place large elements in odd positions and small elements in even positions from back to front."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def wiggleSort(self, nums: list) -> list:\n        pass",
      "javascript": "class Solution {\n    wiggleSort(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def wiggleSort(self, nums: list) -> list:\n        s = sorted(nums)\n        n = len(nums)\n        mid = (n + 1) // 2\n        left = s[:mid]\n        right = s[mid:]\n        res = [0] * n\n        res[::2] = reversed(left)\n        res[1::2] = reversed(right)\n        for i in range(n): nums[i] = res[i]\n        return nums",
      "javascript": "class Solution {\n    wiggleSort(nums) {\n        const s = [...nums].sort((a, b) => a - b);\n        const n = nums.length;\n        const mid = Math.floor((n + 1) / 2);\n        const left = s.slice(0, mid);\n        const right = s.slice(mid);\n        let li = left.length - 1, ri = right.length - 1;\n        for (let i = 0; i < n; i++) {\n            if (i % 2 === 0) nums[i] = left[li--];\n            else nums[i] = right[ri--];\n        }\n        return nums;\n    }\n}"
    },
    "editorial": {
      "approach": "Median Partitioned Interleaved Re-indexing.",
      "algorithm": "Reverse small and large halves into even/odd indices to guarantee strict inequality.",
      "timeComplexity": "O(N log N)",
      "spaceComplexity": "O(N)",
      "content": "Standard wiggle sort interleaving.",
      "referenceCode": "res[::2] = reversed(left); res[1::2] = reversed(right)"
    },
    "tags": [
      "Array",
      "Divide and Conquer",
      "Sorting",
      "Quickselect"
    ],
    "testCases": [
      {
        "input": "[1,5,1,1,6,4]",
        "expectedOutput": "[1,6,1,5,1,4]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1,3,2,2,3,1]",
        "expectedOutput": "[2,3,1,3,1,2]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1]",
        "expectedOutput": "[1]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Maximum Gap Linear Time Pigeonhole Bucket Sort",
    "slug": "maximum-gap-linear-time-pigeonhole-bucket-sort",
    "description": "Given an integer array `nums`, return the maximum difference between two successive elements in its sorted form in $O(N)$ time and space.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 10^5, 0 <= nums[i] <= 10^9",
    "inputFormat": "nums",
    "outputFormat": "Maximum gap integer.",
    "sampleInput": "[3,6,9,1]",
    "sampleOutput": "3",
    "points": 200,
    "hints": [
      "Divide range [min_val, max_val] into n-1 buckets of size (max - min) / (n - 1). Maximum gap must occur between buckets."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def maximumGap(self, nums: list) -> int:\n        pass",
      "javascript": "class Solution {\n    maximumGap(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def maximumGap(self, nums: list) -> int:\n        n = len(nums)\n        if n < 2: return 0\n        min_v, max_v = min(nums), max(nums)\n        if min_v == max_v: return 0\n        import math\n        b_size = max(1, (max_v - min_v) // (n - 1))\n        b_count = (max_v - min_v) // b_size + 1\n        buckets = [{'min': float('inf'), 'max': float('-inf')} for _ in range(b_count)]\n        for x in nums:\n            idx = (x - min_v) // b_size\n            buckets[idx]['min'] = min(buckets[idx]['min'], x)\n            buckets[idx]['max'] = max(buckets[idx]['max'], x)\n        max_gap = 0\n        prev_max = min_v\n        for b in buckets:\n            if b['min'] == float('inf'): continue\n            max_gap = max(max_gap, b['min'] - prev_max)\n            prev_max = b['max']\n        return max_gap",
      "javascript": "class Solution {\n    maximumGap(nums) {\n        const n = nums.length;\n        if (n < 2) return 0;\n        const minV = Math.min(...nums), maxV = Math.max(...nums);\n        if (minV === maxV) return 0;\n        const bSize = Math.max(1, Math.floor((maxV - minV) / (n - 1)));\n        const bCount = Math.floor((maxV - minV) / bSize) + 1;\n        const buckets = Array.from({ length: bCount }, () => ({ min: Infinity, max: -Infinity }));\n        for (const x of nums) {\n            const idx = Math.floor((x - minV) / bSize);\n            buckets[idx].min = Math.min(buckets[idx].min, x);\n            buckets[idx].max = Math.max(buckets[idx].max, x);\n        }\n        let maxGap = 0;\n        let prevMax = minV;\n        for (const b of buckets) {\n            if (b.min === Infinity) continue;\n            maxGap = Math.max(maxGap, b.min - prevMax);\n            prevMax = b.max;\n        }\n        return maxGap;\n    }\n}"
    },
    "editorial": {
      "approach": "Pigeonhole Principle Bucket Sort.",
      "algorithm": "By pigeonhole principle, max gap cannot lie within bucket of size <= gap floor. Compute consecutive non-empty bucket gaps.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Standard linear time maximum gap algorithm.",
      "referenceCode": "max_gap = max(max_gap, b['min'] - prev_max)"
    },
    "tags": [
      "Array",
      "Bucket Sort",
      "Radix Sort",
      "Sorting"
    ],
    "testCases": [
      {
        "input": "[3,6,9,1]",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[10]",
        "expectedOutput": "0",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1,10000000]",
        "expectedOutput": "9999999",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Rearrange Array Elements by Sign Alternating",
    "slug": "rearrange-array-elements-by-sign-alternating",
    "description": "You are given a 0-indexed integer array `nums` of even length containing an equal number of positive and negative integers. Rearrange the elements of `nums` such that the modified array begins with a positive integer, alternates signs, and preserves relative order.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "2 <= nums.length <= 2 * 10^5, nums.length is even, 1 <= |nums[i]| <= 10^5",
    "inputFormat": "nums",
    "outputFormat": "Alternated sign array.",
    "sampleInput": "[3,1,-2,-5,2,-4]",
    "sampleOutput": "[3,-2,1,-5,2,-4]",
    "points": 100,
    "hints": [
      "Maintain pos_idx = 0 and neg_idx = 1, placing positive numbers at even indices and negative numbers at odd indices."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def rearrangeArray(self, nums: list) -> list:\n        pass",
      "javascript": "class Solution {\n    rearrangeArray(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def rearrangeArray(self, nums: list) -> list:\n        res = [0] * len(nums)\n        pos, neg = 0, 1\n        for x in nums:\n            if x > 0:\n                res[pos] = x\n                pos += 2\n            else:\n                res[neg] = x\n                neg += 2\n        return res",
      "javascript": "class Solution {\n    rearrangeArray(nums) {\n        const res = Array(nums.length).fill(0);\n        let pos = 0, neg = 1;\n        for (const x of nums) {\n            if (x > 0) {\n                res[pos] = x; pos += 2;\n            } else {\n                res[neg] = x; neg += 2;\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Dual Index Even/Odd Alternation.",
      "algorithm": "Single pass placing positive elements at 2k and negative elements at 2k+1.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Standard sign alternation array traversal.",
      "referenceCode": "if x > 0: res[pos] = x; pos += 2 else: res[neg] = x; neg += 2"
    },
    "tags": [
      "Array",
      "Two Pointers",
      "Simulation"
    ],
    "testCases": [
      {
        "input": "[3,1,-2,-5,2,-4]",
        "expectedOutput": "[3,-2,1,-5,2,-4]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[-1,1]",
        "expectedOutput": "[1,-1]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1,-1,2,-2]",
        "expectedOutput": "[1,-1,2,-2]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Sort Array By Parity Even First",
    "slug": "sort-array-by-parity-even-first",
    "description": "Given an integer array `nums`, move all the even integers at the beginning of the array followed by all the odd integers. Return any array that satisfies this condition (preserve relative order of even/odd).",
    "difficulty": Difficulty.EASY,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 5000, 0 <= nums[i] <= 5000",
    "inputFormat": "nums",
    "outputFormat": "Array sorted by parity.",
    "sampleInput": "[3,1,2,4]",
    "sampleOutput": "[2,4,3,1]",
    "points": 50,
    "hints": [
      "Collect evens first then odds, or use two pointers in a single pass."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def sortArrayByParity(self, nums: list) -> list:\n        pass",
      "javascript": "class Solution {\n    sortArrayByParity(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def sortArrayByParity(self, nums: list) -> list:\n        evens = [x for x in nums if x % 2 == 0]\n        odds = [x for x in nums if x % 2 != 0]\n        return evens + odds",
      "javascript": "class Solution {\n    sortArrayByParity(nums) {\n        const evens = nums.filter(x => x % 2 === 0);\n        const odds = nums.filter(x => x % 2 !== 0);\n        return [...evens, ...odds];\n    }\n}"
    },
    "editorial": {
      "approach": "Parity Partitioning.",
      "algorithm": "Filter evens and odds into segregated lists in linear time.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Standard array parity separation.",
      "referenceCode": "return evens + odds"
    },
    "tags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "testCases": [
      {
        "input": "[3,1,2,4]",
        "expectedOutput": "[2,4,3,1]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[0]",
        "expectedOutput": "[0]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1,3,5]",
        "expectedOutput": "[1,3,5]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Matrix Diagonal Traverse ZigZag",
    "slug": "matrix-diagonal-traverse-zigzag",
    "description": "Given an `m x n` matrix `mat`, return an array of all the elements of the array in a diagonal order (alternating up-right and down-left directions).",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "m == mat.length, n == mat[i].length, 1 <= m, n <= 100",
    "inputFormat": "mat",
    "outputFormat": "List of diagonal traverse elements.",
    "sampleInput": "[[1,2,3],[4,5,6],[7,8,9]]",
    "sampleOutput": "[1,2,4,7,5,3,6,8,9]",
    "points": 100,
    "hints": [
      "Diagonals share constant r + c = d. Reverse even diagonal levels."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def findDiagonalOrder(self, mat: list) -> list:\n        pass",
      "javascript": "class Solution {\n    findDiagonalOrder(mat) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def findDiagonalOrder(self, mat: list) -> list:\n        if not mat or not mat[0]: return []\n        m, n = len(mat), len(mat[0])\n        diags = [[] for _ in range(m + n - 1)]\n        for r in range(m):\n            for c in range(n):\n                diags[r + c].append(mat[r][c])\n        res = []\n        for d, diag in enumerate(diags):\n            if d % 2 == 0:\n                res.extend(reversed(diag))\n            else:\n                res.extend(diag)\n        return res",
      "javascript": "class Solution {\n    findDiagonalOrder(mat) {\n        if (!mat || mat.length === 0) return [];\n        const m = mat.length, n = mat[0].length;\n        const diags = Array.from({ length: m + n - 1 }, () => []);\n        for (let r = 0; r < m; r++) {\n            for (let c = 0; c < n; c++) {\n                diags[r + c].push(mat[r][c]);\n            }\n        }\n        const res = [];\n        diags.forEach((diag, d) => {\n            if (d % 2 === 0) res.push(...diag.reverse());\n            else res.push(...diag);\n        });\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Diagonal Bucketing by r + c Sum.",
      "algorithm": "Group matrix entries by r + c index sum, reversing alternate diagonal lists.",
      "timeComplexity": "O(M * N)",
      "spaceComplexity": "O(M * N)",
      "content": "Standard matrix diagonal zigzag traversal.",
      "referenceCode": "if d % 2 == 0: res.extend(reversed(diag)) else: res.extend(diag)"
    },
    "tags": [
      "Array",
      "Matrix",
      "Simulation"
    ],
    "testCases": [
      {
        "input": "[[1,2,3],[4,5,6],[7,8,9]]",
        "expectedOutput": "[1,2,4,7,5,3,6,8,9]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[1,2],[3,4]]",
        "expectedOutput": "[1,2,3,4]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1]]",
        "expectedOutput": "[1]",
        "isHidden": true,
        "order": 2
      }
    ]
  }
];
