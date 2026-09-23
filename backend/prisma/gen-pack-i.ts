import { ProblemSpec, writePack } from './pack-writer-util';

// PACK I: Sliding Window & Binary Search (19 problems)
const problemsI: ProblemSpec[] = [
  {
    title: 'Split Array Largest Sum Minimization',
    slug: 'split-array-largest-sum-minimization',
    description: `Given an integer array \`nums\` and an integer \`k\`, split the array into \`k\` non-empty continuous subarrays such that the largest sum of any subarray is minimized. Return the minimized largest sum.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 1000, 1 <= k <= min(50, nums.length), 0 <= nums[i] <= 10^6`,
    inputFormat: `nums, k`,
    outputFormat: `Minimized largest subarray sum.`,
    sampleInput: `[7,2,5,10,8], 2`,
    sampleOutput: `18`,
    points: 200,
    hints: ['Binary search on the answer in range [max(nums), sum(nums)]. Verify if greedy grouping uses <= k subarrays.'],
    codeTemplates: {
      python: `class Solution:\n    def splitArray(self, nums: list, k: int) -> int:\n        pass`,
      javascript: `class Solution {\n    splitArray(nums, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def splitArray(self, nums: list, k: int) -> int:
        def check(mid):
            count, cur = 1, 0
            for x in nums:
                if cur + x > mid:
                    count += 1
                    cur = x
                else:
                    cur += x
            return count <= k
        l, r = max(nums), sum(nums)
        ans = r
        while l <= r:
            mid = (l + r) // 2
            if check(mid):
                ans = mid
                r = mid - 1
            else:
                l = mid + 1
        return ans`,
      javascript: `class Solution {
    splitArray(nums, k) {
        function check(mid) {
            let count = 1, cur = 0;
            for (const x of nums) {
                if (cur + x > mid) {
                    count++;
                    cur = x;
                } else {
                    cur += x;
                }
            }
            return count <= k;
        }
        let l = Math.max(...nums), r = nums.reduce((a, b) => a + b, 0);
        let ans = r;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (check(mid)) {
                ans = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Binary Search on Value Range + Greedy Verifier.',
      algorithm: 'Binary search the capacity upper bound in O(log(Sum)) iterations.',
      timeComplexity: 'O(N log(Sum))',
      spaceComplexity: 'O(1)',
      content: 'Standard monotonic predicate binary search.',
      referenceCode: `if check(mid): ans = mid; r = mid - 1`,
    },
    tags: ['Binary Search', 'Sliding Window', 'Greedy', 'Array'],
    testCases: [
      { input: `[7,2,5,10,8], 2`, expectedOutput: `18`, isHidden: false, order: 0 },
      { input: `[1,2,3,4,5], 2`, expectedOutput: `9`, isHidden: false, order: 1 },
      { input: `[1,4,4], 3`, expectedOutput: `4`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Capacity to Ship Packages Within D Days',
    slug: 'capacity-to-ship-packages-within-d-days',
    description: `A conveyor belt has packages that must be shipped from one port to another within \`days\` days. The \`i\`-th package on the conveyor belt has a weight of \`weights[i]\`. Each day, we load the ship with packages on the conveyor belt (in the order given by \`weights\`). We may not load more weight than the maximum weight capacity of the ship. Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within \`days\` days.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= days <= weights.length <= 5 * 10^4, 1 <= weights[i] <= 500`,
    inputFormat: `weights, days`,
    outputFormat: `Minimum capacity integer.`,
    sampleInput: `[1,2,3,4,5,6,7,8,9,10], 5`,
    sampleOutput: `15`,
    points: 100,
    hints: ['Binary search capacity between max(weights) and sum(weights).'],
    codeTemplates: {
      python: `class Solution:\n    def shipWithinDays(self, weights: list, days: int) -> int:\n        pass`,
      javascript: `class Solution {\n    shipWithinDays(weights, days) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def shipWithinDays(self, weights: list, days: int) -> int:
        def check(cap):
            d, cur = 1, 0
            for w in weights:
                if cur + w > cap:
                    d += 1
                    cur = w
                else:
                    cur += w
            return d <= days
        l, r = max(weights), sum(weights)
        ans = r
        while l <= r:
            mid = (l + r) // 2
            if check(mid):
                ans = mid
                r = mid - 1
            else:
                l = mid + 1
        return ans`,
      javascript: `class Solution {
    shipWithinDays(weights, days) {
        function check(cap) {
            let d = 1, cur = 0;
            for (const w of weights) {
                if (cur + w > cap) {
                    d++;
                    cur = w;
                } else {
                    cur += w;
                }
            }
            return d <= days;
        }
        let l = Math.max(...weights), r = weights.reduce((a, b) => a + b, 0);
        let ans = r;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (check(mid)) {
                ans = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Monotonic Binary Search on Capacity.',
      algorithm: 'Test minimum day requirement against target capacity.',
      timeComplexity: 'O(N log(Sum - Max))',
      spaceComplexity: 'O(1)',
      content: 'Standard binary search feasibility problem.',
      referenceCode: `if check(mid): ans = mid; r = mid - 1`,
    },
    tags: ['Binary Search', 'Greedy', 'Array'],
    testCases: [
      { input: `[1,2,3,4,5,6,7,8,9,10], 5`, expectedOutput: `15`, isHidden: false, order: 0 },
      { input: `[3,2,2,4,1,4], 3`, expectedOutput: `6`, isHidden: false, order: 1 },
      { input: `[1,2,3,1,1], 4`, expectedOutput: `3`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Koko Eating Bananas Minimum Speed',
    slug: 'koko-eating-bananas-minimum-speed',
    description: `Koko loves to eat bananas. There are \`n\` piles of bananas, the \`i\`-th pile has \`piles[i]\` bananas. The guards have gone and will come back in \`h\` hours. Koko can decide her bananas-per-hour eating speed of \`k\`. Each hour, she chooses some pile of bananas and eats \`k\` bananas from that pile. Return the minimum integer \`k\` such that she can eat all the bananas within \`h\` hours.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= piles.length <= 10^4, piles.length <= h <= 10^9, 1 <= piles[i] <= 10^9`,
    inputFormat: `piles, h`,
    outputFormat: `Minimum speed integer.`,
    sampleInput: `[3,6,7,11], 8`,
    sampleOutput: `4`,
    points: 100,
    hints: ['Binary search speed between 1 and max(piles). Total hours needed is sum(ceil(p / k)).'],
    codeTemplates: {
      python: `class Solution:\n    def minEatingSpeed(self, piles: list, h: int) -> int:\n        pass`,
      javascript: `class Solution {\n    minEatingSpeed(piles, h) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minEatingSpeed(self, piles: list, h: int) -> int:
        l, r = 1, max(piles)
        ans = r
        while l <= r:
            mid = (l + r) // 2
            hours = sum((p + mid - 1) // mid for p in piles)
            if hours <= h:
                ans = mid
                r = mid - 1
            else:
                l = mid + 1
        return ans`,
      javascript: `class Solution {
    minEatingSpeed(piles, h) {
        let l = 1, r = Math.max(...piles);
        let ans = r;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            let hours = 0;
            for (const p of piles) hours += Math.ceil(p / mid);
            if (hours <= h) {
                ans = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Binary Search on Speed.',
      algorithm: 'Evaluate monotonic eating time sum(ceil(pile / speed)).',
      timeComplexity: 'O(N log(Max))',
      spaceComplexity: 'O(1)',
      content: 'Standard rate binary search.',
      referenceCode: `hours = sum((p + mid - 1) // mid for p in piles)`,
    },
    tags: ['Binary Search', 'Array'],
    testCases: [
      { input: `[3,6,7,11], 8`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `[30,11,23,4,20], 5`, expectedOutput: `30`, isHidden: false, order: 1 },
      { input: `[30,11,23,4,20], 6`, expectedOutput: `23`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Subarrays with K Different Integers Exact Count',
    slug: 'subarrays-with-k-different-integers-exact-count',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the number of good subarrays of \`nums\`. A good array is an array where the number of different integers in that array is exactly \`k\`.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 20000, 1 <= nums[i], k <= nums.length`,
    inputFormat: `nums, k`,
    outputFormat: `Count of good subarrays.`,
    sampleInput: `[1,2,1,2,3], 2`,
    sampleOutput: `7`,
    points: 200,
    hints: ['Count subarrays with at most k distinct elements minus count of subarrays with at most k-1 distinct elements.'],
    codeTemplates: {
      python: `class Solution:\n    def subarraysWithKDistinct(self, nums: list, k: int) -> int:\n        pass`,
      javascript: `class Solution {\n    subarraysWithKDistinct(nums, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def subarraysWithKDistinct(self, nums: list, k: int) -> int:
        def at_most(K):
            import collections
            count = collections.defaultdict(int)
            l = 0
            ans = 0
            for r, x in enumerate(nums):
                if count[x] == 0: K -= 1
                count[x] += 1
                while K < 0:
                    count[nums[l]] -= 1
                    if count[nums[l]] == 0: K += 1
                    l += 1
                ans += r - l + 1
            return ans
        return at_most(k) - at_most(k - 1)`,
      javascript: `class Solution {
    subarraysWithKDistinct(nums, k) {
        function atMost(K) {
            const count = new Map();
            let l = 0, ans = 0;
            for (let r = 0; r < nums.length; r++) {
                const x = nums[r];
                if (!count.get(x)) K--;
                count.set(x, (count.get(x) || 0) + 1);
                while (K < 0) {
                    count.set(nums[l], count.get(nums[l]) - 1);
                    if (count.get(nums[l]) === 0) K++;
                    l++;
                }
                ans += r - l + 1;
            }
            return ans;
        }
        return atMost(k) - atMost(k - 1);
    }
}`,
    },
    editorial: {
      approach: 'Exact(K) = AtMost(K) - AtMost(K - 1) Sliding Window Reduction.',
      algorithm: 'Two-pointer sliding window easily counts subarrays with at most K distinct elements.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(K)',
      content: 'Classic exact distinct element counting reduction.',
      referenceCode: `return at_most(k) - at_most(k - 1)`,
    },
    tags: ['Sliding Window', 'Two Pointers', 'Hash Table', 'Array'],
    testCases: [
      { input: `[1,2,1,2,3], 2`, expectedOutput: `7`, isHidden: false, order: 0 },
      { input: `[1,2,1,3,4], 3`, expectedOutput: `3`, isHidden: false, order: 1 },
      { input: `[1,2,3], 1`, expectedOutput: `3`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Find K Closest Elements Dual Two Pointers',
    slug: 'find-k-closest-elements-dual-two-pointers',
    description: `Given a sorted integer array \`arr\`, two integers \`k\` and \`x\`, return the \`k\` closest integers to \`x\` in the array. The result should also be sorted in ascending order.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= k <= arr.length <= 10^4, -10^4 <= arr[i], x <= 10^4`,
    inputFormat: `arr, k, x`,
    outputFormat: `Sorted list of k closest elements.`,
    sampleInput: `[1,2,3,4,5], 4, 3`,
    sampleOutput: `[1,2,3,4]`,
    points: 100,
    hints: ['Binary search the left boundary of the window of size k by comparing distances: x - arr[mid] > arr[mid + k] - x.'],
    codeTemplates: {
      python: `class Solution:\n    def findClosestElements(self, arr: list, k: int, x: int) -> list:\n        pass`,
      javascript: `class Solution {\n    findClosestElements(arr, k, x) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findClosestElements(self, arr: list, k: int, x: int) -> list:
        l, r = 0, len(arr) - k
        while l < r:
            mid = (l + r) // 2
            if x - arr[mid] > arr[mid + k] - x:
                l = mid + 1
            else:
                r = mid
        return arr[l:l+k]`,
      javascript: `class Solution {
    findClosestElements(arr, k, x) {
        let l = 0, r = arr.length - k;
        while (l < r) {
            const mid = Math.floor((l + r) / 2);
            if (x - arr[mid] > arr[mid + k] - x) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return arr.slice(l, l + k);
    }
}`,
    },
    editorial: {
      approach: 'Binary Search on Window Start.',
      algorithm: 'Directly binary search optimal window start in O(log(N - K)) time.',
      timeComplexity: 'O(log(N - K) + K)',
      spaceComplexity: 'O(1)',
      content: 'Standard window boundary binary search.',
      referenceCode: `if x - arr[mid] > arr[mid + k] - x: l = mid + 1`,
    },
    tags: ['Binary Search', 'Two Pointers', 'Array', 'Sliding Window'],
    testCases: [
      { input: `[1,2,3,4,5], 4, 3`, expectedOutput: `[1,2,3,4]`, isHidden: false, order: 0 },
      { input: `[1,1,2,3,4,5], 4, -1`, expectedOutput: `[1,1,2,3]`, isHidden: false, order: 1 },
      { input: `[1,2,3], 2, 2`, expectedOutput: `[1,2]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Four Sum Quadruplets Hash Search',
    slug: 'four-sum-quadruplets-hash-search',
    description: `Given an array \`nums\` of \`n\` integers, return an array of all the unique quadruplets \`[nums[a], nums[b], nums[c], nums[d]]\` such that $a < b < c < d$ and their sum equals \`target\`.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 200, -10^9 <= nums[i], target <= 10^9`,
    inputFormat: `nums, target`,
    outputFormat: `Sorted list of unique quadruplets.`,
    sampleInput: `[1,0,-1,0,-2,2], 0`,
    sampleOutput: `[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]`,
    points: 150,
    hints: ['Sort array, fix two outer pointers, and use two pointers for inner two numbers.'],
    codeTemplates: {
      python: `class Solution:\n    def fourSum(self, nums: list, target: int) -> list:\n        pass`,
      javascript: `class Solution {\n    fourSum(nums, target) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def fourSum(self, nums: list, target: int) -> list:
        nums.sort()
        n = len(nums)
        res = []
        for i in range(n - 3):
            if i > 0 and nums[i] == nums[i - 1]: continue
            for j in range(i + 1, n - 2):
                if j > i + 1 and nums[j] == nums[j - 1]: continue
                l, r = j + 1, n - 1
                while l < r:
                    s = nums[i] + nums[j] + nums[l] + nums[r]
                    if s == target:
                        res.append([nums[i], nums[j], nums[l], nums[r]])
                        while l < r and nums[l] == nums[l + 1]: l += 1
                        while l < r and nums[r] == nums[r - 1]: r -= 1
                        l += 1; r -= 1
                    elif s < target:
                        l += 1
                    else:
                        r -= 1
        return res`,
      javascript: `class Solution {
    fourSum(nums, target) {
        nums.sort((a, b) => a - b);
        const n = nums.length;
        const res = [];
        for (let i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] === nums[i - 1]) continue;
            for (let j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] === nums[j - 1]) continue;
                let l = j + 1, r = n - 1;
                while (l < r) {
                    const s = nums[i] + nums[j] + nums[l] + nums[r];
                    if (s === target) {
                        res.push([nums[i], nums[j], nums[l], nums[r]]);
                        while (l < r && nums[l] === nums[l + 1]) l++;
                        while (l < r && nums[r] === nums[r - 1]) r--;
                        l++; r--;
                    } else if (s < target) {
                        l++;
                    } else {
                        r--;
                    }
                }
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Sorted Two-Pointer 4-Sum Reduction.',
      algorithm: 'Two nested loops + inner two-pointer search with adjacent skip deduplication.',
      timeComplexity: 'O(N^3)',
      spaceComplexity: 'O(1)',
      content: 'Standard k-sum two-pointer algorithm.',
      referenceCode: `while l < r and nums[l] == nums[l + 1]: l += 1`,
    },
    tags: ['Two Pointers', 'Array', 'Sorting'],
    testCases: [
      { input: `[1,0,-1,0,-2,2], 0`, expectedOutput: `[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]`, isHidden: false, order: 0 },
      { input: `[2,2,2,2,2], 8`, expectedOutput: `[[2,2,2,2]]`, isHidden: false, order: 1 },
      { input: `[1,2,3], 6`, expectedOutput: `[]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Longest Repeating Character Replacement K Changes',
    slug: 'longest-repeating-character-replacement-k-changes',
    description: `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character at most \`k\` times. Return the length of the longest substring containing the same letter you can get after performing the operations.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= s.length <= 10^5, 0 <= k <= s.length`,
    inputFormat: `s, k`,
    outputFormat: `Length of longest repeating substring.`,
    sampleInput: `"ABAB", 2`,
    sampleOutput: `4`,
    points: 100,
    hints: ['Maintain max frequency in sliding window. Window is valid if window_length - max_freq <= k.'],
    codeTemplates: {
      python: `class Solution:\n    def characterReplacement(self, s: str, k: int) -> int:\n        pass`,
      javascript: `class Solution {\n    characterReplacement(s, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        import collections
        count = collections.defaultdict(int)
        l = 0
        max_freq = 0
        ans = 0
        for r in range(len(s)):
            count[s[r]] += 1
            max_freq = max(max_freq, count[s[r]])
            while (r - l + 1) - max_freq > k:
                count[s[l]] -= 1
                l += 1
            ans = max(ans, r - l + 1)
        return ans`,
      javascript: `class Solution {
    characterReplacement(s, k) {
        const count = new Map();
        let l = 0, maxFreq = 0, ans = 0;
        for (let r = 0; r < s.length; r++) {
            const ch = s[r];
            count.set(ch, (count.get(ch) || 0) + 1);
            maxFreq = Math.max(maxFreq, count.get(ch));
            while ((r - l + 1) - maxFreq > k) {
                count.set(s[l], count.get(s[l]) - 1);
                l++;
            }
            ans = Math.max(ans, r - l + 1);
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Frequency-Tracked Sliding Window.',
      algorithm: 'Window size invariant: window length - max character frequency <= k.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(26)',
      content: 'Standard frequency window optimization.',
      referenceCode: `while (r - l + 1) - max_freq > k: l += 1`,
    },
    tags: ['Sliding Window', 'String', 'Hash Table'],
    testCases: [
      { input: `"ABAB", 2`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `"AABABBA", 1`, expectedOutput: `4`, isHidden: false, order: 1 },
      { input: `"A", 0`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Fruit Into Baskets Two Types Window',
    slug: 'fruit-into-baskets-two-types-window',
    description: `You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array \`fruits\` where \`fruits[i]\` is the type of fruit the \`i\`-th tree produces. You have two baskets, and each basket can only hold a single type of fruit. Return the maximum number of fruits you can pick.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= fruits.length <= 10^5, 0 <= fruits[i] < fruits.length`,
    inputFormat: `fruits`,
    outputFormat: `Maximum picked fruits count.`,
    sampleInput: `[1,2,1]`,
    sampleOutput: `3`,
    points: 100,
    hints: ['Find the longest subarray with at most 2 distinct integers using sliding window.'],
    codeTemplates: {
      python: `class Solution:\n    def totalFruit(self, fruits: list) -> int:\n        pass`,
      javascript: `class Solution {\n    totalFruit(fruits) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def totalFruit(self, fruits: list) -> int:
        import collections
        count = collections.defaultdict(int)
        l = 0
        ans = 0
        for r, f in enumerate(fruits):
            count[f] += 1
            while len(count) > 2:
                count[fruits[l]] -= 1
                if count[fruits[l]] == 0:
                    del count[fruits[l]]
                l += 1
            ans = max(ans, r - l + 1)
        return ans`,
      javascript: `class Solution {
    totalFruit(fruits) {
        const count = new Map();
        let l = 0, ans = 0;
        for (let r = 0; r < fruits.length; r++) {
            const f = fruits[r];
            count.set(f, (count.get(f) || 0) + 1);
            while (count.size > 2) {
                count.set(fruits[l], count.get(fruits[l]) - 1);
                if (count.get(fruits[l]) === 0) count.delete(fruits[l]);
                l++;
            }
            ans = Math.max(ans, r - l + 1);
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'At-Most-2 Distinct Sliding Window.',
      algorithm: 'Expand right pointer and contract left when map size exceeds 2.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Standard two-distinct integer sliding window.',
      referenceCode: `while len(count) > 2: count[fruits[l]] -= 1; l += 1`,
    },
    tags: ['Sliding Window', 'Array', 'Hash Table'],
    testCases: [
      { input: `[1,2,1]`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `[0,1,2,2]`, expectedOutput: `3`, isHidden: false, order: 1 },
      { input: `[1,2,3,2,2]`, expectedOutput: `4`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Minimum Size Subarray Sum Exceeding Target',
    slug: 'minimum-size-subarray-sum-exceeding-target',
    description: `Given an array of positive integers \`nums\` and a positive integer \`target\`, return the minimal length of a contiguous subarray of which the sum is greater than or equal to \`target\`. If there is no such subarray, return 0 instead.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= target <= 10^9, 1 <= nums.length <= 10^5, 1 <= nums[i] <= 10^4`,
    inputFormat: `target, nums`,
    outputFormat: `Minimal length integer.`,
    sampleInput: `7, [2,3,1,2,4,3]`,
    sampleOutput: `2`,
    points: 100,
    hints: ['Expand right pointer until sum >= target, then contract left pointer while keeping sum >= target.'],
    codeTemplates: {
      python: `class Solution:\n    def minSubArrayLen(self, target: int, nums: list) -> int:\n        pass`,
      javascript: `class Solution {\n    minSubArrayLen(target, nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minSubArrayLen(self, target: int, nums: list) -> int:
        l = 0
        cur = 0
        min_len = float('inf')
        for r, x in enumerate(nums):
            cur += x
            while cur >= target:
                min_len = min(min_len, r - l + 1)
                cur -= nums[l]
                l += 1
        return min_len if min_len != float('inf') else 0`,
      javascript: `class Solution {
    minSubArrayLen(target, nums) {
        let l = 0, cur = 0, minLen = Infinity;
        for (let r = 0; r < nums.length; r++) {
            cur += nums[r];
            while (cur >= target) {
                minLen = Math.min(minLen, r - l + 1);
                cur -= nums[l++];
            }
        }
        return minLen !== Infinity ? minLen : 0;
    }
}`,
    },
    editorial: {
      approach: 'Two-Pointer Variable-Length Sliding Window.',
      algorithm: 'Contract window from left whenever sum exceeds target to record minimum span.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Standard positive array sliding window.',
      referenceCode: `while cur >= target: min_len = min(min_len, r - l + 1); cur -= nums[l]; l += 1`,
    },
    tags: ['Sliding Window', 'Two Pointers', 'Binary Search', 'Array'],
    testCases: [
      { input: `7, [2,3,1,2,4,3]`, expectedOutput: `2`, isHidden: false, order: 0 },
      { input: `4, [1,4,4]`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `11, [1,1,1,1,1,1,1,1]`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Search in Rotated Sorted Array II with Duplicates',
    slug: 'search-in-rotated-sorted-array-ii-with-duplicates',
    description: `There is an integer array \`nums\` sorted in non-decreasing order (not necessarily with distinct values). Given the array \`nums\` after an unknown rotation and an integer \`target\`, return \`true\` if \`target\` is in \`nums\`, or \`false\` if it is not.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 5000, -10^4 <= nums[i], target <= 10^4`,
    inputFormat: `nums, target`,
    outputFormat: `Boolean true/false.`,
    sampleInput: `[2,5,6,0,0,1,2], 0`,
    sampleOutput: `true`,
    points: 100,
    hints: ['When nums[l] == nums[mid] == nums[r], increment l and decrement r to shrink ambiguous boundary.'],
    codeTemplates: {
      python: `class Solution:\n    def search(self, nums: list, target: int) -> bool:\n        pass`,
      javascript: `class Solution {\n    search(nums, target) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def search(self, nums: list, target: int) -> bool:
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target: return True
            if nums[l] == nums[mid] == nums[r]:
                l += 1; r -= 1
            elif nums[l] <= nums[mid]:
                if nums[l] <= target < nums[mid]:
                    r = mid - 1
                else:
                    l = mid + 1
            else:
                if nums[mid] < target <= nums[r]:
                    l = mid + 1
                else:
                    r = mid - 1
        return False`,
      javascript: `class Solution {
    search(nums, target) {
        let l = 0, r = nums.length - 1;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (nums[mid] === target) return true;
            if (nums[l] === nums[mid] && nums[mid] === nums[r]) {
                l++; r--;
            } else if (nums[l] <= nums[mid]) {
                if (nums[l] <= target && target < nums[mid]) {
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[r]) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
        }
        return false;
    }
}`,
    },
    editorial: {
      approach: 'Rotated Binary Search with Duplicate Shrinking.',
      algorithm: 'Disambiguate flat endpoints by advancing pointers.',
      timeComplexity: 'Average O(log N), Worst O(N)',
      spaceComplexity: 'O(1)',
      content: 'Standard rotated binary search with duplicate elements.',
      referenceCode: `if nums[l] == nums[mid] == nums[r]: l += 1; r -= 1`,
    },
    tags: ['Binary Search', 'Array'],
    testCases: [
      { input: `[2,5,6,0,0,1,2], 0`, expectedOutput: `true`, isHidden: false, order: 0 },
      { input: `[2,5,6,0,0,1,2], 3`, expectedOutput: `false`, isHidden: false, order: 1 },
      { input: `[1,0,1,1,1], 0`, expectedOutput: `true`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Find Minimum in Rotated Sorted Array II Duplicates',
    slug: 'find-minimum-in-rotated-sorted-array-ii-duplicates',
    description: `Given the sorted rotated array \`nums\` of integers that may contain duplicates, return the minimum element of this array.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 5000, -5000 <= nums[i] <= 5000`,
    inputFormat: `nums`,
    outputFormat: `Minimum integer.`,
    sampleInput: `[1,3,5]`,
    sampleOutput: `1`,
    points: 200,
    hints: ['If nums[mid] == nums[r], decrement r.'],
    codeTemplates: {
      python: `class Solution:\n    def findMin(self, nums: list) -> int:\n        pass`,
      javascript: `class Solution {\n    findMin(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findMin(self, nums: list) -> int:
        l, r = 0, len(nums) - 1
        while l < r:
            mid = (l + r) // 2
            if nums[mid] > nums[r]:
                l = mid + 1
            elif nums[mid] < nums[r]:
                r = mid
            else:
                r -= 1
        return nums[l]`,
      javascript: `class Solution {
    findMin(nums) {
        let l = 0, r = nums.length - 1;
        while (l < r) {
            const mid = Math.floor((l + r) / 2);
            if (nums[mid] > nums[r]) {
                l = mid + 1;
            } else if (nums[mid] < nums[r]) {
                r = mid;
            } else {
                r--;
            }
        }
        return nums[l];
    }
}`,
    },
    editorial: {
      approach: 'Rotated Array Binary Search with Equal Pivot Reduction.',
      algorithm: 'Compare mid against right boundary, decrementing r on equality.',
      timeComplexity: 'Average O(log N), Worst O(N)',
      spaceComplexity: 'O(1)',
      content: 'Standard minimum search in duplicate rotated array.',
      referenceCode: `if nums[mid] > nums[r]: l = mid + 1`,
    },
    tags: ['Binary Search', 'Array'],
    testCases: [
      { input: `[1,3,5]`, expectedOutput: `1`, isHidden: false, order: 0 },
      { input: `[2,2,2,0,1]`, expectedOutput: `0`, isHidden: false, order: 1 },
      { input: `[3,1,3]`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Longest Substring Without Repeating Characters Window',
    slug: 'longest-substring-without-repeating-characters-window',
    description: `Given a string \`s\`, find the length of the longest substring without duplicate characters.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= s.length <= 5 * 10^4`,
    inputFormat: `s`,
    outputFormat: `Length integer.`,
    sampleInput: `"abcabcbb"`,
    sampleOutput: `3`,
    points: 100,
    hints: ['Store last seen index of each character and update left pointer to max(left, last_seen[c] + 1).'],
    codeTemplates: {
      python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        pass`,
      javascript: `class Solution {\n    lengthOfLongestSubstring(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last = {}
        l = 0
        ans = 0
        for r, ch in enumerate(s):
            if ch in last and last[ch] >= l:
                l = last[ch] + 1
            last[ch] = r
            ans = max(ans, r - l + 1)
        return ans`,
      javascript: `class Solution {
    lengthOfLongestSubstring(s) {
        const last = new Map();
        let l = 0, ans = 0;
        for (let r = 0; r < s.length; r++) {
            const ch = s[r];
            if (last.has(ch) && last.get(ch) >= l) {
                l = last.get(ch) + 1;
            }
            last.set(ch, r);
            ans = Math.max(ans, r - l + 1);
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Direct Hash Map Jump Sliding Window.',
      algorithm: 'Jump left boundary past previous occurrence of incoming character.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(min(N, Sigma))',
      content: 'Classic longest unique substring sliding window.',
      referenceCode: `if ch in last and last[ch] >= l: l = last[ch] + 1`,
    },
    tags: ['Sliding Window', 'Hash Table', 'String'],
    testCases: [
      { input: `"abcabcbb"`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `"bbbbb"`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `"pwwkew"`, expectedOutput: `3`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Find Peak Element In Log N Time',
    slug: 'find-peak-element-in-log-n-time',
    description: `A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array \`nums\`, find a peak element, and return its index. You may imagine that \`nums[-1] = nums[n] = -inf\`. You must write an algorithm that runs in $O(\\log n)$ time.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 1000, -2^31 <= nums[i] <= 2^31 - 1`,
    inputFormat: `nums`,
    outputFormat: `Index of any peak element.`,
    sampleInput: `[1,2,3,1]`,
    sampleOutput: `2`,
    points: 100,
    hints: ['If nums[mid] < nums[mid + 1], a peak must exist to the right. Otherwise it exists to the left.'],
    codeTemplates: {
      python: `class Solution:\n    def findPeakElement(self, nums: list) -> int:\n        pass`,
      javascript: `class Solution {\n    findPeakElement(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findPeakElement(self, nums: list) -> int:
        l, r = 0, len(nums) - 1
        while l < r:
            mid = (l + r) // 2
            if nums[mid] < nums[mid + 1]:
                l = mid + 1
            else:
                r = mid
        return l`,
      javascript: `class Solution {
    findPeakElement(nums) {
        let l = 0, r = nums.length - 1;
        while (l < r) {
            const mid = Math.floor((l + r) / 2);
            if (nums[mid] < nums[mid + 1]) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return l;
    }
}`,
    },
    editorial: {
      approach: 'Ascending Gradient Binary Search.',
      algorithm: 'Follow upward gradient: if nums[mid] < nums[mid+1], right side is guaranteed to contain a local maximum.',
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1)',
      content: 'Standard peak element discovery.',
      referenceCode: `if nums[mid] < nums[mid + 1]: l = mid + 1`,
    },
    tags: ['Binary Search', 'Array'],
    testCases: [
      { input: `[1,2,3,1]`, expectedOutput: `2`, isHidden: false, order: 0 },
      { input: `[1,2,1,3,5,6,4]`, expectedOutput: `5`, isHidden: false, order: 1 },
      { input: `[1]`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Heaters Minimum Radius to Warm All Houses',
    slug: 'heaters-minimum-radius-to-warm-all-houses',
    description: `Winter is coming! During the contest, your first job is to design a standard heater with a fixed warm radius to warm all the houses. Every house can be warmed as long as the house is within the heater's warm radius range. Given the positions of houses and heaters, return the minimum radius standard of heaters so that all houses could be covered.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= houses.length, heaters.length <= 3 * 10^4, 1 <= houses[i], heaters[i] <= 10^9`,
    inputFormat: `houses, heaters`,
    outputFormat: `Minimum radius integer.`,
    sampleInput: `[1,2,3], [2]`,
    sampleOutput: `1`,
    points: 100,
    hints: ['Sort heaters and for each house binary search the closest heater on left and right.'],
    codeTemplates: {
      python: `class Solution:\n    def findRadius(self, houses: list, heaters: list) -> int:\n        pass`,
      javascript: `class Solution {\n    findRadius(houses, heaters) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findRadius(self, houses: list, heaters: list) -> int:
        heaters.sort()
        import bisect
        res = 0
        for h in houses:
            idx = bisect.bisect_left(heaters, h)
            d1 = heaters[idx] - h if idx < len(heaters) else float('inf')
            d2 = h - heaters[idx - 1] if idx > 0 else float('inf')
            res = max(res, min(d1, d2))
        return res`,
      javascript: `class Solution {
    findRadius(houses, heaters) {
        heaters.sort((a, b) => a - b);
        let res = 0;
        function bisectLeft(arr, val) {
            let l = 0, r = arr.length;
            while (l < r) {
                const mid = Math.floor((l + r) / 2);
                if (arr[mid] < val) l = mid + 1;
                else r = mid;
            }
            return l;
        }
        for (const h of houses) {
            const idx = bisectLeft(heaters, h);
            const d1 = idx < heaters.length ? heaters[idx] - h : Infinity;
            const d2 = idx > 0 ? h - heaters[idx - 1] : Infinity;
            res = Math.max(res, Math.min(d1, d2));
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Binary Search Nearest Neighbor Distance.',
      algorithm: 'Sort heaters and locate adjacent bounding heaters for each house.',
      timeComplexity: 'O((M + N) log M)',
      spaceComplexity: 'O(1)',
      content: 'Standard geometric nearest neighbor radius evaluation.',
      referenceCode: `res = max(res, min(d1, d2))`,
    },
    tags: ['Binary Search', 'Two Pointers', 'Sorting', 'Array'],
    testCases: [
      { input: `[1,2,3], [2]`, expectedOutput: `1`, isHidden: false, order: 0 },
      { input: `[1,2,3,4], [1,4]`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `[1,5], [2]`, expectedOutput: `3`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Median of Two Sorted Arrays Logarithmic Time',
    slug: 'median-of-two-sorted-arrays-logarithmic-time',
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the median of the two sorted arrays in $O(\\log(m + n))$ time.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `nums1.length <= 1000, nums2.length <= 1000, -10^6 <= nums1[i], nums2[i] <= 10^6`,
    inputFormat: `nums1, nums2`,
    outputFormat: `Median floating point / integer number.`,
    sampleInput: `[1,3], [2]`,
    sampleOutput: `2.0`,
    points: 200,
    hints: ['Binary search the partition cut in the shorter array.'],
    codeTemplates: {
      python: `class Solution:\n    def findMedianSortedArrays(self, nums1: list, nums2: list) -> float:\n        pass`,
      javascript: `class Solution {\n    findMedianSortedArrays(nums1, nums2) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findMedianSortedArrays(self, nums1: list, nums2: list) -> float:
        if len(nums1) > len(nums2): nums1, nums2 = nums2, nums1
        m, n = len(nums1), len(nums2)
        total = m + n
        half = (total + 1) // 2
        l, r = 0, m
        while l <= r:
            i = (l + r) // 2
            j = half - i
            l1 = nums1[i - 1] if i > 0 else float('-inf')
            r1 = nums1[i] if i < m else float('inf')
            l2 = nums2[j - 1] if j > 0 else float('-inf')
            r2 = nums2[j] if j < n else float('inf')
            if l1 <= r2 and l2 <= r1:
                if total % 2 != 0:
                    return float(max(l1, l2))
                return (max(l1, l2) + min(r1, r2)) / 2.0
            elif l1 > r2:
                r = i - 1
            else:
                l = i + 1
        return 0.0`,
      javascript: `class Solution {
    findMedianSortedArrays(nums1, nums2) {
        if (nums1.length > nums2.length) {
            const t = nums1; nums1 = nums2; nums2 = t;
        }
        const m = nums1.length, n = nums2.length;
        const total = m + n;
        const half = Math.floor((total + 1) / 2);
        let l = 0, r = m;
        while (l <= r) {
            const i = Math.floor((l + r) / 2);
            const j = half - i;
            const l1 = i > 0 ? nums1[i - 1] : -Infinity;
            const r1 = i < m ? nums1[i] : Infinity;
            const l2 = j > 0 ? nums2[j - 1] : -Infinity;
            const r2 = j < n ? nums2[j] : Infinity;
            if (l1 <= r2 && l2 <= r1) {
                if (total % 2 !== 0) return Math.max(l1, l2);
                return (Math.max(l1, l2) + Math.min(r1, r2)) / 2.0;
            } else if (l1 > r2) {
                r = i - 1;
            } else {
                l = i + 1;
            }
        }
        return 0.0;
    }
}`,
    },
    editorial: {
      approach: 'Dual Partition Binary Search.',
      algorithm: 'Partition shorter array such that left combined half elements are <= right combined half elements.',
      timeComplexity: 'O(log(min(M, N)))',
      spaceComplexity: 'O(1)',
      content: 'Classic median of two sorted arrays algorithm.',
      referenceCode: `if l1 <= r2 and l2 <= r1: return (max(l1, l2) + min(r1, r2)) / 2.0`,
    },
    tags: ['Binary Search', 'Divide and Conquer', 'Array'],
    testCases: [
      { input: `[1,3], [2]`, expectedOutput: `2.0`, isHidden: false, order: 0 },
      { input: `[1,2], [3,4]`, expectedOutput: `2.5`, isHidden: false, order: 1 },
      { input: `[0,0], [0,0]`, expectedOutput: `0.0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Sliding Window Maximum Monotonic Deque',
    slug: 'sliding-window-maximum-monotonic-deque',
    description: `You are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. You can only see the \`k\` numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 10^5, 1 <= k <= nums.length, -10^4 <= nums[i] <= 10^4`,
    inputFormat: `nums, k`,
    outputFormat: `List of maximums in each window.`,
    sampleInput: `[1,3,-1,-3,5,3,6,7], 3`,
    sampleOutput: `[3,3,5,5,6,7]`,
    points: 200,
    hints: ['Maintain indices in a monotonic decreasing deque. Pop back elements smaller than incoming element.'],
    codeTemplates: {
      python: `class Solution:\n    def maxSlidingWindow(self, nums: list, k: int) -> list:\n        pass`,
      javascript: `class Solution {\n    maxSlidingWindow(nums, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maxSlidingWindow(self, nums: list, k: int) -> list:
        import collections
        q = collections.deque()
        res = []
        for i, x in enumerate(nums):
            while q and nums[q[-1]] <= x:
                q.pop()
            q.append(i)
            if q[0] <= i - k:
                q.popleft()
            if i >= k - 1:
                res.append(nums[q[0]])
        return res`,
      javascript: `class Solution {
    maxSlidingWindow(nums, k) {
        const q = [];
        const res = [];
        for (let i = 0; i < nums.length; i++) {
            const x = nums[i];
            while (q.length > 0 && nums[q[q.length - 1]] <= x) {
                q.pop();
            }
            q.push(i);
            if (q[0] <= i - k) q.shift();
            if (i >= k - 1) res.push(nums[q[0]]);
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Monotonic Decreasing Deque Window Maintenance.',
      algorithm: 'Amortized O(1) sliding window extreme element retrieval.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(K)',
      content: 'Classic monotonic deque sliding window.',
      referenceCode: `while q and nums[q[-1]] <= x: q.pop()`,
    },
    tags: ['Sliding Window', 'Queue', 'Monotonic Queue', 'Array'],
    testCases: [
      { input: `[1,3,-1,-3,5,3,6,7], 3`, expectedOutput: `[3,3,5,5,6,7]`, isHidden: false, order: 0 },
      { input: `[1], 1`, expectedOutput: `[1]`, isHidden: false, order: 1 },
      { input: `[1,-1], 1`, expectedOutput: `[1,-1]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Minimum Window Substring All Characters Covered',
    slug: 'minimum-window-substring-all-characters-covered',
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the minimum window substring of \`s\` such that every character in \`t\` (including duplicates) is included in the window. If there is no such substring, return the empty string \`""\`.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= s.length, t.length <= 10^5`,
    inputFormat: `s, t`,
    outputFormat: `Minimum window substring.`,
    sampleInput: `"ADOBECODEBANC", "ABC"`,
    sampleOutput: `"BANC"`,
    points: 200,
    hints: ['Count target character frequencies, maintain matched count as right expands, then shrink left pointer.'],
    codeTemplates: {
      python: `class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        pass`,
      javascript: `class Solution {\n    minWindow(s, t) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minWindow(self, s: str, t: str) -> str:
        import collections
        need = collections.Counter(t)
        missing = len(t)
        l = 0
        min_start, min_len = 0, float('inf')
        for r, ch in enumerate(s):
            if need[ch] > 0:
                missing -= 1
            need[ch] -= 1
            if missing == 0:
                while l <= r and need[s[l]] < 0:
                    need[s[l]] += 1
                    l += 1
                if r - l + 1 < min_len:
                    min_len = r - l + 1
                    min_start = l
                need[s[l]] += 1
                missing += 1
                l += 1
        return s[min_start:min_start+min_len] if min_len != float('inf') else ""`,
      javascript: `class Solution {
    minWindow(s, t) {
        const need = new Map();
        for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);
        let missing = t.length;
        let l = 0;
        let minStart = 0, minLen = Infinity;
        for (let r = 0; r < s.length; r++) {
            const ch = s[r];
            if ((need.get(ch) || 0) > 0) missing--;
            need.set(ch, (need.get(ch) || 0) - 1);
            if (missing === 0) {
                while (l <= r && need.get(s[l]) < 0) {
                    need.set(s[l], need.get(s[l]) + 1);
                    l++;
                }
                if (r - l + 1 < minLen) {
                    minLen = r - l + 1;
                    minStart = l;
                }
                need.set(s[l], need.get(s[l]) + 1);
                missing++;
                l++;
            }
        }
        return minLen !== Infinity ? s.slice(minStart, minStart + minLen) : "";
    }
}`,
    },
    editorial: {
      approach: 'Frequency Deficit Sliding Window.',
      algorithm: 'Track total missing characters and prune superfluous prefix characters on fulfillment.',
      timeComplexity: 'O(|S| + |T|)',
      spaceComplexity: 'O(Sigma)',
      content: 'Classic minimum substring cover problem.',
      referenceCode: `if r - l + 1 < min_len: min_len = r - l + 1`,
    },
    tags: ['Sliding Window', 'Hash Table', 'String'],
    testCases: [
      { input: `"ADOBECODEBANC", "ABC"`, expectedOutput: `"BANC"`, isHidden: false, order: 0 },
      { input: `"a", "a"`, expectedOutput: `"a"`, isHidden: false, order: 1 },
      { input: `"a", "aa"`, expectedOutput: `""`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Shortest Subarray with Sum at Least K Monotonic Deque',
    slug: 'shortest-subarray-with-sum-at-least-k-monotonic-deque',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the length of the shortest non-empty subarray of \`nums\` with a sum of at least \`k\`. If there is no such subarray, return -1.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 50000, -10^5 <= nums[i] <= 10^5, 1 <= k <= 10^9`,
    inputFormat: `nums, k`,
    outputFormat: `Shortest length integer.`,
    sampleInput: `[2,-1,2], 3`,
    sampleOutput: `3`,
    points: 200,
    hints: ['Compute prefix sums P and maintain a monotonic increasing deque of indices of P.'],
    codeTemplates: {
      python: `class Solution:\n    def shortestSubarray(self, nums: list, k: int) -> int:\n        pass`,
      javascript: `class Solution {\n    shortestSubarray(nums, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def shortestSubarray(self, nums: list, k: int) -> int:
        import collections
        P = [0]
        for x in nums: P.append(P[-1] + x)
        q = collections.deque()
        ans = float('inf')
        for i, p in enumerate(P):
            while q and p - P[q[0]] >= k:
                ans = min(ans, i - q.popleft())
            while q and P[q[-1]] >= p:
                q.pop()
            q.append(i)
        return ans if ans != float('inf') else -1`,
      javascript: `class Solution {
    shortestSubarray(nums, k) {
        const P = [0];
        for (const x of nums) P.push(P[P.length - 1] + x);
        const q = [];
        let ans = Infinity;
        for (let i = 0; i < P.length; i++) {
            const p = P[i];
            while (q.length > 0 && p - P[q[0]] >= k) {
                ans = Math.min(ans, i - q.shift());
            }
            while (q.length > 0 && P[q[q.length - 1]] >= p) {
                q.pop();
            }
            q.push(i);
        }
        return ans !== Infinity ? ans : -1;
    }
}`,
    },
    editorial: {
      approach: 'Prefix Sum Monotonic Increasing Deque.',
      algorithm: 'Prefix sums with negative numbers require monotonic increasing deque optimization.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard prefix sum monotonic queue.',
      referenceCode: `while q and p - P[q[0]] >= k: ans = min(ans, i - q.popleft())`,
    },
    tags: ['Sliding Window', 'Queue', 'Monotonic Queue', 'Array', 'Prefix Sum'],
    testCases: [
      { input: `[2,-1,2], 3`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `[1], 1`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `[1,2], 4`, expectedOutput: `-1`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Count Subarrays with Fixed Bounds Sliding Min Max',
    slug: 'count-subarrays-with-fixed-bounds-sliding-min-max',
    description: `You are given an integer array \`nums\` and two integers \`minK\` and \`maxK\`. A fixed-bound subarray of \`nums\` is a subarray that satisfies the following conditions: The minimum value in the subarray is equal to \`minK\`, and the maximum value in the subarray is equal to \`maxK\`. Return the number of fixed-bound subarrays.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `2 <= nums.length <= 10^5, 1 <= nums[i], minK, maxK <= 10^6`,
    inputFormat: `nums, minK, maxK`,
    outputFormat: `Count of fixed-bound subarrays.`,
    sampleInput: `[1,3,5,2,7,5], 1, 5`,
    sampleOutput: `2`,
    points: 200,
    hints: ['Track latest index of invalid element (< minK or > maxK), latest minK index, and latest maxK index.'],
    codeTemplates: {
      python: `class Solution:\n    def countSubarrays(self, nums: list, minK: int, maxK: int) -> int:\n        pass`,
      javascript: `class Solution {\n    countSubarrays(nums, minK, maxK) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def countSubarrays(self, nums: list, minK: int, maxK: int) -> int:
        ans = 0
        bad_idx = -1
        min_idx = -1
        max_idx = -1
        for i, x in enumerate(nums):
            if not (minK <= x <= maxK):
                bad_idx = i
            if x == minK: min_idx = i
            if x == maxK: max_idx = i
            ans += max(0, min(min_idx, max_idx) - bad_idx)
        return ans`,
      javascript: `class Solution {
    countSubarrays(nums, minK, maxK) {
        let ans = 0;
        let badIdx = -1, minIdx = -1, maxIdx = -1;
        for (let i = 0; i < nums.length; i++) {
            const x = nums[i];
            if (x < minK || x > maxK) badIdx = i;
            if (x === minK) minIdx = i;
            if (x === maxK) maxIdx = i;
            ans += Math.max(0, Math.min(minIdx, maxIdx) - badIdx);
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Triple Index Boundary Window Contribution.',
      algorithm: 'Each position i contributes max(0, min(min_idx, max_idx) - bad_idx) valid starting points.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Standard fixed bound subarray single pass.',
      referenceCode: `ans += max(0, min(min_idx, max_idx) - bad_idx)`,
    },
    tags: ['Sliding Window', 'Two Pointers', 'Array'],
    testCases: [
      { input: `[1,3,5,2,7,5], 1, 5`, expectedOutput: `2`, isHidden: false, order: 0 },
      { input: `[1,1,1,1], 1, 1`, expectedOutput: `10`, isHidden: false, order: 1 },
      { input: `[1,2,3], 2, 3`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },
];

writePack('pack-500-part-i.ts', 'pack500PartIDefs', problemsI);
