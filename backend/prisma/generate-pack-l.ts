import { writePack, ProblemSpec } from './pack-writer-util';

// PACK L: Arrays & Matrix Mastery (19 problems)
const packL: ProblemSpec[] = [
  {
    title: 'Count Inversions Merge Sort & Fenwick',
    slug: 'count-inversions-fenwick-merge-sort',
    description: 'Given an array of integers `nums`, return the number of inversions in the array. An inversion is a pair of indices `(i, j)` such that `i < j` and `nums[i] > nums[j]`.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9',
    inputFormat: 'nums',
    outputFormat: 'Total inversions integer.',
    sampleInput: '[8, 4, 2, 1]',
    sampleOutput: '6',
    points: 200,
    hints: [
      'Use modified Merge Sort to count cross-inversions during the merge step in O(N log N).',
      'Or discretize coordinates and use a Fenwick (Binary Indexed) Tree.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def countInversions(self, nums: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    countInversions(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def countInversions(self, nums: list[int]) -> int:
        def merge_sort(arr):
            if len(arr) <= 1:
                return arr, 0
            mid = len(arr) // 2
            left, inv_l = merge_sort(arr[:mid])
            right, inv_r = merge_sort(arr[mid:])
            merged = []
            inv_count = inv_l + inv_r
            i = j = 0
            while i < len(left) and j < len(right):
                if left[i] <= right[j]:
                    merged.append(left[i])
                    i += 1
                else:
                    merged.append(right[j])
                    inv_count += len(left) - i
                    j += 1
            merged.extend(left[i:])
            merged.extend(right[j:])
            return merged, inv_count
            
        _, total_inv = merge_sort(nums)
        return total_inv`,
      javascript: `class Solution {
    countInversions(nums) {
        function mergeSort(arr) {
            if (arr.length <= 1) return { sorted: arr, inv: 0 };
            const mid = Math.floor(arr.length / 2);
            const left = mergeSort(arr.slice(0, mid));
            const right = mergeSort(arr.slice(mid));
            const merged = [];
            let invCount = left.inv + right.inv;
            let i = 0, j = 0;
            while (i < left.sorted.length && j < right.sorted.length) {
                if (left.sorted[i] <= right.sorted[j]) {
                    merged.push(left.sorted[i++]);
                } else {
                    merged.push(right.sorted[j++]);
                    invCount += left.sorted.length - i;
                }
            }
            while (i < left.sorted.length) merged.push(left.sorted[i++]);
            while (j < right.sorted.length) merged.push(right.sorted[j++]);
            return { sorted: merged, inv: invCount };
        }
        return mergeSort(nums).inv;
    }
}`,
    },
    editorial: {
      approach: 'Divide and conquer merge sort inversion counter.',
      algorithm: 'During merge, when right[j] is placed before left[i], it forms an inversion with all remaining elements in left.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      content: 'Classic divide and conquer inversion counting.',
      referenceCode: `def countInversions(nums: list[int]) -> int: ...`,
    },
    tags: ['Array', 'Divide and Conquer', 'Merge Sort', 'Fenwick Tree'],
    testCases: [
      { input: '[8, 4, 2, 1]', expectedOutput: '6', isHidden: false },
      { input: '[1, 2, 3, 4, 5]', expectedOutput: '0', isHidden: false },
      { input: '[5, 4, 3, 2, 1]', expectedOutput: '10', isHidden: true },
      { input: '[2, 4, 1, 3, 5]', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Sort Colors Dutch National Flag Algorithm',
    slug: 'sort-colors-dutch-national-flag',
    description: 'Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red (0), white (1), and blue (2). You must solve this problem without using the library\'s sort function and in one pass using O(1) constant extra space.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'n == nums.length\n1 <= n <= 300\nnums[i] is either 0, 1, or 2.',
    inputFormat: 'nums',
    outputFormat: 'Sorted array in-place.',
    sampleInput: '[2,0,2,1,1,0]',
    sampleOutput: '[0,0,1,1,2,2]',
    points: 150,
    hints: [
      'Maintain three pointers: lo = 0, mid = 0, hi = len(nums) - 1.',
      'If nums[mid] == 0: swap(nums[lo], nums[mid]), lo++, mid++.',
      'If nums[mid] == 1: mid++.',
      'If nums[mid] == 2: swap(nums[mid], nums[hi]), hi--.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def sortColors(self, nums: list[int]) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    sortColors(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def sortColors(self, nums: list[int]) -> list[int]:
        lo, mid, hi = 0, 0, len(nums) - 1
        while mid <= hi:
            if nums[mid] == 0:
                nums[lo], nums[mid] = nums[mid], nums[lo]
                lo += 1
                mid += 1
            elif nums[mid] == 1:
                mid += 1
            else:
                nums[mid], nums[hi] = nums[hi], nums[mid]
                hi -= 1
        return nums`,
      javascript: `class Solution {
    sortColors(nums) {
        let lo = 0, mid = 0, hi = nums.length - 1;
        while (mid <= hi) {
            if (nums[mid] === 0) {
                [nums[lo], nums[mid]] = [nums[mid], nums[lo]];
                lo++;
                mid++;
            } else if (nums[mid] === 1) {
                mid++;
            } else {
                [nums[mid], nums[hi]] = [nums[hi], nums[mid]];
                hi--;
            }
        }
        return nums;
    }
}`,
    },
    editorial: {
      approach: 'Dutch National Flag 3-way partition.',
      algorithm: 'Partition in a single pass into three sections [0..lo-1], [lo..hi], [hi+1..n-1].',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Dijkstra\'s Dutch National Flag 3-pointer partitioning algorithm.',
      referenceCode: `def sortColors(nums: list[int]) -> list[int]: ...`,
    },
    tags: ['Array', 'Two Pointers', 'Sorting'],
    testCases: [
      { input: '[2,0,2,1,1,0]', expectedOutput: '[0,0,1,1,2,2]', isHidden: false },
      { input: '[2,0,1]', expectedOutput: '[0,1,2]', isHidden: false },
      { input: '[0]', expectedOutput: '[0]', isHidden: true },
      { input: '[1,1,1]', expectedOutput: '[1,1,1]', isHidden: true },
    ],
  },
  {
    title: 'Kth Largest Element Quickselect O(N)',
    slug: 'kth-largest-element-in-an-array-quickselect',
    description: 'Given an integer array `nums` and an integer `k`, return the `k`-th largest element in the array in O(N) average time complexity.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= k <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4',
    inputFormat: 'nums, k',
    outputFormat: 'K-th largest integer.',
    sampleInput: '[3,2,1,5,6,4], 2',
    sampleOutput: '5',
    points: 150,
    hints: [
      'Finding the k-th largest is equivalent to finding the (n - k)-th smallest element (0-indexed).',
      'Use randomized Quickselect partition.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def findKthLargest(self, nums: list[int], k: int) -> int:\n        pass`,
      javascript: `class Solution {\n    findKthLargest(nums, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `import random

class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        target = len(nums) - k
        def quickselect(l, r):
            pivot_idx = random.randint(l, r)
            pivot = nums[pivot_idx]
            nums[pivot_idx], nums[r] = nums[r], nums[pivot_idx]
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
            const pivotIdx = Math.floor(Math.random() * (r - l + 1)) + l;
            const pivot = nums[pivotIdx];
            [nums[pivotIdx], nums[r]] = [nums[r], nums[pivotIdx]];
            let p = l;
            for (let i = l; i < r; i++) {
                if (nums[i] <= pivot) {
                    [nums[p], nums[i]] = [nums[i], nums[p]];
                    p++;
                }
            }
            [nums[p], nums[r]] = [nums[r], nums[p]];
            if (p === target) return nums[p];
            if (p < target) return quickselect(p + 1, r);
            return quickselect(l, p - 1);
        }
        return quickselect(0, nums.length - 1);
    }
}`,
    },
    editorial: {
      approach: 'Randomized Quickselect algorithm (Hoare\'s selection).',
      algorithm: 'Partition array around random pivot, discarding one half iteratively.',
      timeComplexity: 'O(N) average, O(N^2) worst',
      spaceComplexity: 'O(1) auxiliary space',
      content: 'Expected linear time order statistic selection.',
      referenceCode: `def findKthLargest(nums: list[int], k: int) -> int: ...`,
    },
    tags: ['Array', 'Divide and Conquer', 'Quickselect', 'Sorting'],
    testCases: [
      { input: '[3,2,1,5,6,4], 2', expectedOutput: '5', isHidden: false },
      { input: '[3,2,3,1,2,4,5,5,6], 4', expectedOutput: '4', isHidden: false },
      { input: '[1], 1', expectedOutput: '1', isHidden: true },
      { input: '[-1, 2, 0], 2', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'First Missing Positive Constant Space',
    slug: 'first-missing-positive-in-place-hashing',
    description: 'Given an unsorted integer array `nums`, return the smallest positive integer that is not present in `nums`. You must implement an algorithm that runs in O(N) time and uses O(1) auxiliary space.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= nums.length <= 10^5\n-2^31 <= nums[i] <= 2^31 - 1',
    inputFormat: 'nums',
    outputFormat: 'Smallest missing positive integer.',
    sampleInput: '[1,2,0]',
    sampleOutput: '3',
    points: 200,
    hints: [
      'The answer must be in the range [1, N + 1].',
      'Place each number x in 1..N at index x - 1 using cyclic swap.',
      'Scan from index 0 to N-1: the first index i where nums[i] != i + 1 gives answer i + 1.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def firstMissingPositive(self, nums: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    firstMissingPositive(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def firstMissingPositive(self, nums: list[int]) -> int:
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
                const temp = nums[i];
                nums[i] = nums[target];
                nums[target] = temp;
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
      approach: 'In-place cyclic index placement.',
      algorithm: 'Swap nums[i] into its canonical slot nums[nums[i]-1] until all valid positive values are properly located.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'In-place bucket placement without allocating secondary memory.',
      referenceCode: `def firstMissingPositive(nums: list[int]) -> int: ...`,
    },
    tags: ['Array', 'Hash Table'],
    testCases: [
      { input: '[1,2,0]', expectedOutput: '3', isHidden: false },
      { input: '[3,4,-1,1]', expectedOutput: '2', isHidden: false },
      { input: '[7,8,9,11,12]', expectedOutput: '1', isHidden: true },
      { input: '[1]', expectedOutput: '2', isHidden: true },
    ],
  },
];

writePack('pack-500-part-l.ts', 'pack500PartLDefs', packL);
