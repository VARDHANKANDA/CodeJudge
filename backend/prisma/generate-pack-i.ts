import { writePack, ProblemSpec } from './pack-writer-util';

// PACK I: Sliding Window & Binary Search on Answer (19 problems)
const packI: ProblemSpec[] = [
  {
    title: 'Split Array Largest Sum Binary Search',
    slug: 'split-array-largest-sum-binary-search',
    description: 'Given an integer array `nums` and an integer `k`, split `nums` into `k` non-empty subarrays such that the largest sum of any subarray is minimized. Return the minimized largest sum of the split.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= nums.length <= 1000\n0 <= nums[i] <= 10^6\n1 <= k <= min(50, nums.length)',
    inputFormat: 'nums, k',
    outputFormat: 'Minimized largest sum integer.',
    sampleInput: '[7,2,5,10,8], 2',
    sampleOutput: '18',
    points: 200,
    hints: [
      'Binary search the answer between max(nums) and sum(nums).',
      'For a candidate max sum M, greedily pack contiguous elements into subarrays without exceeding M.',
      'If required pieces <= k, we can try smaller M; otherwise increase M.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def splitArray(self, nums: list[int], k: int) -> int:\n        pass`,
      javascript: `class Solution {\n    splitArray(nums, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def splitArray(self, nums: list[int], k: int) -> int:
        def feasible(limit):
            count = 1
            cur = 0
            for x in nums:
                if cur + x > limit:
                    count += 1
                    cur = x
                else:
                    cur += x
            return count <= k
            
        lo = max(nums)
        hi = sum(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if feasible(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo`,
      javascript: `class Solution {
    splitArray(nums, k) {
        function feasible(limit) {
            let count = 1, cur = 0;
            for (const x of nums) {
                if (cur + x > limit) {
                    count++;
                    cur = x;
                } else {
                    cur += x;
                }
            }
            return count <= k;
        }
        
        let lo = Math.max(...nums);
        let hi = nums.reduce((a, b) => a + b, 0);
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (feasible(mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }
}`,
    },
    editorial: {
      approach: 'Binary Search on Answer (Monotonic Predicate).',
      algorithm: 'Binary search the subarray sum ceiling and greedily verify feasibility in O(N).',
      timeComplexity: 'O(N * log(sum(nums)))',
      spaceComplexity: 'O(1)',
      content: 'Classic binary search on monotonic capacity predicate.',
      referenceCode: `def splitArray(nums: list[int], k: int) -> int: ...`,
    },
    tags: ['Binary Search', 'Greedy', 'Array', 'Dynamic Programming'],
    testCases: [
      { input: '[7,2,5,10,8], 2', expectedOutput: '18', isHidden: false },
      { input: '[1,2,3,4,5], 2', expectedOutput: '9', isHidden: false },
      { input: '[1,4,4], 3', expectedOutput: '4', isHidden: true },
      { input: '[100], 1', expectedOutput: '100', isHidden: true },
    ],
  },
  {
    title: 'Capacity To Ship Packages Within D Days',
    slug: 'capacity-to-ship-packages-within-d-days',
    description: 'A conveyor belt has packages that must be shipped from one port to another within `days` days. The i-th package on the conveyor belt has a weight of `weights[i]`. Each day, we load the ship with packages on the conveyor belt (in the order given by weights). We may not load more weight than the maximum weight capacity of the ship. Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within `days` days.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= days <= weights.length <= 5 * 10^4\n1 <= weights[i] <= 500',
    inputFormat: 'weights, days',
    outputFormat: 'Minimum ship capacity integer.',
    sampleInput: '[1,2,3,4,5,6,7,8,9,10], 5',
    sampleOutput: '15',
    points: 150,
    hints: [
      'Lower bound is max(weights), upper bound is sum(weights).',
      'Binary search capacity and test if packages can be shipped in <= days.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def shipWithinDays(self, weights: list[int], days: int) -> int:\n        pass`,
      javascript: `class Solution {\n    shipWithinDays(weights, days) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def shipWithinDays(self, weights: list[int], days: int) -> int:
        def check(cap):
            d = 1
            cur = 0
            for w in weights:
                if cur + w > cap:
                    d += 1
                    cur = w
                else:
                    cur += w
            return d <= days
            
        lo, hi = max(weights), sum(weights)
        while lo < hi:
            mid = (lo + hi) // 2
            if check(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo`,
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
        let lo = Math.max(...weights);
        let hi = weights.reduce((a, b) => a + b, 0);
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (check(mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }
}`,
    },
    editorial: {
      approach: 'Binary Search on Capacity with Greedy Verifier.',
      algorithm: 'Binary search capacity bounds [max, sum].',
      timeComplexity: 'O(N log(sum - max))',
      spaceComplexity: 'O(1)',
      content: 'Standard monotonic load capacity search.',
      referenceCode: `def shipWithinDays(weights: list[int], days: int) -> int: ...`,
    },
    tags: ['Binary Search', 'Array', 'Greedy'],
    testCases: [
      { input: '[1,2,3,4,5,6,7,8,9,10], 5', expectedOutput: '15', isHidden: false },
      { input: '[3,2,2,4,1,4], 3', expectedOutput: '6', isHidden: false },
      { input: '[1,2,3,1,1], 4', expectedOutput: '3', isHidden: true },
      { input: '[10], 1', expectedOutput: '10', isHidden: true },
    ],
  },
  {
    title: 'Koko Eating Bananas Minimum Speed',
    slug: 'koko-eating-bananas-speed',
    description: 'Koko loves to eat bananas. There are `n` piles of bananas, the i-th pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours. Koko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them instead and will not eat any more bananas during this hour. Return the minimum integer `k` such that she can eat all the bananas within `h` hours.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= piles.length <= 10^4\npiles.length <= h <= 10^9\n1 <= piles[i] <= 10^9',
    inputFormat: 'piles, h',
    outputFormat: 'Minimum integer speed k.',
    sampleInput: '[3,6,7,11], 8',
    sampleOutput: '4',
    points: 150,
    hints: [
      'Search space for speed k is [1, max(piles)].',
      'Hours required for speed k is sum(ceil(p / k) for p in piles).',
      'Binary search for the smallest k where total hours <= h.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def minEatingSpeed(self, piles: list[int], h: int) -> int:\n        pass`,
      javascript: `class Solution {\n    minEatingSpeed(piles, h) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `import math

class Solution:
    def minEatingSpeed(self, piles: list[int], h: int) -> int:
        def time_needed(k):
            return sum((p + k - 1) // k for p in piles)
            
        lo, hi = 1, max(piles)
        while lo < hi:
            mid = (lo + hi) // 2
            if time_needed(mid) <= h:
                hi = mid
            else:
                lo = mid + 1
        return lo`,
      javascript: `class Solution {
    minEatingSpeed(piles, h) {
        function timeNeeded(k) {
            let total = 0;
            for (const p of piles) {
                total += Math.ceil(p / k);
            }
            return total;
        }
        let lo = 1;
        let hi = Math.max(...piles);
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (timeNeeded(mid) <= h) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }
}`,
    },
    editorial: {
      approach: 'Binary Search on monotonic time requirement.',
      algorithm: 'Binary search k in [1, max(piles)] verifying sum(ceil(p / k)) <= h.',
      timeComplexity: 'O(N log(max(piles)))',
      spaceComplexity: 'O(1)',
      content: 'Classic rate optimization using binary search.',
      referenceCode: `def minEatingSpeed(piles: list[int], h: int) -> int: ...`,
    },
    tags: ['Binary Search', 'Array'],
    testCases: [
      { input: '[3,6,7,11], 8', expectedOutput: '4', isHidden: false },
      { input: '[30,11,23,4,20], 5', expectedOutput: '30', isHidden: false },
      { input: '[30,11,23,4,20], 6', expectedOutput: '23', isHidden: true },
      { input: '[312884470], 968709470', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Subarrays with K Different Integers',
    slug: 'subarrays-with-k-different-integers',
    description: 'Given an integer array `nums` and an integer `k`, return the number of good subarrays of `nums`. A good array is an array where the number of different integers in that array is exactly `k`.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= nums.length <= 2 * 10^4\n1 <= nums[i], k <= nums.length',
    inputFormat: 'nums, k',
    outputFormat: 'Count of good subarrays integer.',
    sampleInput: '[1,2,1,2,3], 2',
    sampleOutput: '7',
    points: 200,
    hints: [
      'Count of subarrays with exactly k distinct integers = atMost(k) - atMost(k - 1).',
      'atMost(k) can be computed in O(N) using a sliding window.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def subarraysWithKDistinct(self, nums: list[int], k: int) -> int:\n        pass`,
      javascript: `class Solution {\n    subarraysWithKDistinct(nums, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `from collections import defaultdict

class Solution:
    def subarraysWithKDistinct(self, nums: list[int], k: int) -> int:
        def at_most(distinct):
            if distinct == 0:
                return 0
            count = defaultdict(int)
            l = 0
            res = 0
            for r in range(len(nums)):
                count[nums[r]] += 1
                while len(count) > distinct:
                    count[nums[l]] -= 1
                    if count[nums[l]] == 0:
                        del count[nums[l]]
                    l += 1
                res += (r - l + 1)
            return res
            
        return at_most(k) - at_most(k - 1)`,
      javascript: `class Solution {
    subarraysWithKDistinct(nums, k) {
        function atMost(distinct) {
            if (distinct === 0) return 0;
            const count = new Map();
            let l = 0, res = 0;
            for (let r = 0; r < nums.length; r++) {
                count.set(nums[r], (count.get(nums[r]) || 0) + 1);
                while (count.size > distinct) {
                    count.set(nums[l], count.get(nums[l]) - 1);
                    if (count.get(nums[l]) === 0) count.delete(nums[l]);
                    l++;
                }
                res += (r - l + 1);
            }
            return res;
        }
        return atMost(k) - atMost(k - 1);
    }
}`,
    },
    editorial: {
      approach: 'Prefix-difference sliding window reduction: exactly(K) = atMost(K) - atMost(K-1).',
      algorithm: 'Sliding window computes atMost(K) in O(N) by adding (r - l + 1) valid subarrays at each right step.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard reduction technique for exact distinct element queries.',
      referenceCode: `def subarraysWithKDistinct(nums: list[int], k: int) -> int: ...`,
    },
    tags: ['Sliding Window', 'Hash Table', 'Two Pointers', 'Array'],
    testCases: [
      { input: '[1,2,1,2,3], 2', expectedOutput: '7', isHidden: false },
      { input: '[1,2,1,3,4], 3', expectedOutput: '3', isHidden: false },
      { input: '[1,1,1,1], 1', expectedOutput: '10', isHidden: true },
      { input: '[1,2,3,4,5], 5', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Count Number of Nice Subarrays with K Odds',
    slug: 'count-number-of-nice-subarrays-k-odds',
    description: 'Given an array of integers `nums` and an integer `k`. A continuous subarray is called nice if there are `k` odd numbers on it. Return the number of nice sub-arrays.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= nums.length <= 50000\n1 <= nums[i] <= 10^5\n1 <= k <= nums.length',
    inputFormat: 'nums, k',
    outputFormat: 'Count of nice subarrays integer.',
    sampleInput: '[1,1,2,1,1], 3',
    sampleOutput: '2',
    points: 150,
    hints: [
      'Convert nums to 0/1 array where 1 represents odd numbers and 0 represents even numbers.',
      'This reduces to subarray sum equals k.',
      'Track prefix sums in a hash map or array.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def numberOfSubarrays(self, nums: list[int], k: int) -> int:\n        pass`,
      javascript: `class Solution {\n    numberOfSubarrays(nums, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def numberOfSubarrays(self, nums: list[int], k: int) -> int:
        prefix = [0] * (len(nums) + 1)
        prefix[0] = 1
        cur_odds = 0
        ans = 0
        for x in nums:
            cur_odds += (x & 1)
            if cur_odds >= k:
                ans += prefix[cur_odds - k]
            prefix[cur_odds] += 1
        return ans`,
      javascript: `class Solution {
    numberOfSubarrays(nums, k) {
        const prefix = new Array(nums.length + 1).fill(0);
        prefix[0] = 1;
        let curOdds = 0;
        let ans = 0;
        for (const x of nums) {
            curOdds += (x & 1);
            if (curOdds >= k) {
                ans += prefix[curOdds - k];
            }
            prefix[curOdds]++;
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Prefix sum frequency table.',
      algorithm: 'Compute prefix count of odd elements and lookup previous counts in O(1).',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Linear time subarray sum pattern.',
      referenceCode: `def numberOfSubarrays(nums: list[int], k: int) -> int: ...`,
    },
    tags: ['Array', 'Hash Table', 'Sliding Window', 'Prefix Sum'],
    testCases: [
      { input: '[1,1,2,1,1], 3', expectedOutput: '2', isHidden: false },
      { input: '[2,4,6], 1', expectedOutput: '0', isHidden: false },
      { input: '[2,2,2,1,2,2,1,2,2,2], 2', expectedOutput: '16', isHidden: true },
      { input: '[1], 1', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Replace the Substring for Balanced String',
    slug: 'replace-the-substring-for-balanced-string',
    description: 'You are given a string s of length `n` containing only \'Q\', \'W\', \'E\', and \'R\'. A string is balanced if each of its 4 characters appears `n / 4` times. Return the minimum length of the substring that can be replaced with any other string of the same length to make s balanced.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'n == s.length\n4 <= n <= 10^5\nn is a multiple of 4.\ns contains only \'Q\', \'W\', \'E\', and \'R\'.',
    inputFormat: 's',
    outputFormat: 'Minimum substring length integer.',
    sampleInput: '"QWER"',
    sampleOutput: '0',
    points: 150,
    hints: [
      'Target frequency for each character is k = len(s) / 4.',
      'Count frequencies of all characters outside the window [l, r].',
      'If all 4 character counts outside the window are <= k, the window [l, r] is valid to be replaced.',
      'Use a sliding window to minimize (r - l + 1).',
    ],
    codeTemplates: {
      python: `class Solution:\n    def balancedString(self, s: str) -> int:\n        pass`,
      javascript: `class Solution {\n    balancedString(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `from collections import Counter

class Solution:
    def balancedString(self, s: str) -> int:
        count = Counter(s)
        n = len(s)
        k = n // 4
        if all(count[ch] <= k for ch in 'QWER'):
            return 0
            
        ans = n
        l = 0
        for r, ch in enumerate(s):
            count[ch] -= 1
            while l < n and all(count[c] <= k for c in 'QWER'):
                ans = min(ans, r - l + 1)
                count[s[l]] += 1
                l += 1
        return ans`,
      javascript: `class Solution {
    balancedString(s) {
        const count = { Q: 0, W: 0, E: 0, R: 0 };
        for (const ch of s) count[ch]++;
        const n = s.length;
        const k = n / 4;
        if (count.Q <= k && count.W <= k && count.E <= k && count.R <= k) return 0;
        
        let ans = n;
        let l = 0;
        for (let r = 0; r < n; r++) {
            count[s[r]]--;
            while (l < n && count.Q <= k && count.W <= k && count.E <= k && count.R <= k) {
                ans = Math.min(ans, r - l + 1);
                count[s[l]]++;
                l++;
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Sliding window on outside-of-window invariant.',
      algorithm: 'Window [l, r] is replaceable if external frequencies <= n/4 for all characters.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Inverts sliding window predicate to check the complementary outer substring.',
      referenceCode: `def balancedString(s: str) -> int: ...`,
    },
    tags: ['Sliding Window', 'String', 'Two Pointers'],
    testCases: [
      { input: '"QWER"', expectedOutput: '0', isHidden: false },
      { input: '"QQWE"', expectedOutput: '1', isHidden: false },
      { input: '"QQQW"', expectedOutput: '2', isHidden: true },
      { input: '"QQQQ"', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Max Consecutive Ones III with K Flips',
    slug: 'max-consecutive-ones-iii-k-flips',
    description: 'Given a binary array `nums` and an integer `k`, return the maximum number of consecutive 1\'s in the array if you can flip at most `k` 0\'s.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= nums.length <= 10^5\nnums[i] is either 0 or 1.\n0 <= k <= nums.length',
    inputFormat: 'nums, k',
    outputFormat: 'Max consecutive length integer.',
    sampleInput: '[1,1,1,0,0,0,1,1,1,1,0], 2',
    sampleOutput: '6',
    points: 150,
    hints: [
      'Maintain a sliding window [l, r] that contains at most k zeros.',
      'Advance r, and if nums[r] == 0, decrement k.',
      'If k < 0, advance l and restore k if nums[l] == 0.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def longestOnes(self, nums: list[int], k: int) -> int:\n        pass`,
      javascript: `class Solution {\n    longestOnes(nums, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def longestOnes(self, nums: list[int], k: int) -> int:
        l = 0
        for r in range(len(nums)):
            if nums[r] == 0:
                k -= 1
            if k < 0:
                if nums[l] == 0:
                    k += 1
                l += 1
        return len(nums) - l`,
      javascript: `class Solution {
    longestOnes(nums, k) {
        let l = 0;
        for (let r = 0; r < nums.length; r++) {
            if (nums[r] === 0) k--;
            if (k < 0) {
                if (nums[l] === 0) k++;
                l++;
            }
        }
        return nums.length - l;
    }
}`,
    },
    editorial: {
      approach: 'Non-shrinking sliding window.',
      algorithm: 'Window size expands when valid and shifts without shrinking when invalid, preserving maximal width.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Optimal O(N) sliding window without inner while-loop.',
      referenceCode: `def longestOnes(nums: list[int], k: int) -> int: ...`,
    },
    tags: ['Sliding Window', 'Two Pointers', 'Array'],
    testCases: [
      { input: '[1,1,1,0,0,0,1,1,1,1,0], 2', expectedOutput: '6', isHidden: false },
      { input: '[0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3', expectedOutput: '10', isHidden: false },
      { input: '[0,0,0,0], 0', expectedOutput: '0', isHidden: true },
      { input: '[1,1,1,1], 2', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: '4Sum Quadruplets Target Sum',
    slug: 'four-sum-quadruplets-target',
    description: 'Given an array `nums` of `n` integers, return an array of all the unique quadruplets `[nums[a], nums[b], nums[c], nums[d]]` such that `0 <= a, b, c, d < n`, `a, b, c, and d` are distinct, and `nums[a] + nums[b] + nums[c] + nums[d] == target`.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= nums.length <= 200\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9',
    inputFormat: 'nums, target',
    outputFormat: 'List of unique sorted quadruplets.',
    sampleInput: '[1,0,-1,0,-2,2], 0',
    sampleOutput: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]',
    points: 150,
    hints: [
      'Sort nums.',
      'Fix first two numbers i and j, avoiding duplicate values.',
      'Use two pointers l and r for the remaining two numbers.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def fourSum(self, nums: list[int], target: int) -> list[list[int]]:\n        pass`,
      javascript: `class Solution {\n    fourSum(nums, target) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def fourSum(self, nums: list[int], target: int) -> list[list[int]]:
        nums.sort()
        n = len(nums)
        ans = []
        for i in range(n - 3):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            for j in range(i + 1, n - 2):
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue
                l, r = j + 1, n - 1
                while l < r:
                    total = nums[i] + nums[j] + nums[l] + nums[r]
                    if total == target:
                        ans.append([nums[i], nums[j], nums[l], nums[r]])
                        while l < r and nums[l] == nums[l + 1]: l += 1
                        while l < r and nums[r] == nums[r - 1]: r -= 1
                        l += 1
                        r -= 1
                    elif total < target:
                        l += 1
                    else:
                        r -= 1
        return ans`,
      javascript: `class Solution {
    fourSum(nums, target) {
        nums.sort((a, b) => a - b);
        const n = nums.length;
        const ans = [];
        for (let i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] === nums[i - 1]) continue;
            for (let j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] === nums[j - 1]) continue;
                let l = j + 1, r = n - 1;
                while (l < r) {
                    const total = nums[i] + nums[j] + nums[l] + nums[r];
                    if (total === target) {
                        ans.push([nums[i], nums[j], nums[l], nums[r]]);
                        while (l < r && nums[l] === nums[l + 1]) l++;
                        while (l < r && nums[r] === nums[r - 1]) r--;
                        l++;
                        r--;
                    } else if (total < target) {
                        l++;
                    } else {
                        r--;
                    }
                }
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Sorting with nested loops and two pointers.',
      algorithm: 'Sort array and prune duplicates at every layer.',
      timeComplexity: 'O(N^3)',
      spaceComplexity: 'O(1) extra space',
      content: 'Generalization of 3Sum using two-pointer search.',
      referenceCode: `def fourSum(nums: list[int], target: int) -> list[list[int]]: ...`,
    },
    tags: ['Two Pointers', 'Array', 'Sorting'],
    testCases: [
      { input: '[1,0,-1,0,-2,2], 0', expectedOutput: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]', isHidden: false },
      { input: '[2,2,2,2,2], 8', expectedOutput: '[[2,2,2,2]]', isHidden: false },
      { input: '[0,0,0,0], 0', expectedOutput: '[[0,0,0,0]]', isHidden: true },
      { input: '[1,-2,-5,-4,-3,3,3,5], -11', expectedOutput: '[[-5,-4,-3,1]]', isHidden: true },
    ],
  },
  {
    title: 'Trapping Rain Water Two Pointers O(1) Space',
    slug: 'trapping-rain-water-two-pointers-optimal',
    description: 'Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'n == height.length\n1 <= n <= 2 * 10^4\n0 <= height[i] <= 10^5',
    inputFormat: 'height',
    outputFormat: 'Total trapped water integer.',
    sampleInput: '[0,1,0,2,1,0,1,3,2,1,2,1]',
    sampleOutput: '6',
    points: 200,
    hints: [
      'Maintain two pointers l = 0 and r = len(height) - 1.',
      'Track left_max and right_max.',
      'If left_max < right_max, water trapped at l is max(0, left_max - height[l]), advance l.',
      'Otherwise water trapped at r is max(0, right_max - height[r]), advance r.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def trap(self, height: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    trap(height) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def trap(self, height: list[int]) -> int:
        l, r = 0, len(height) - 1
        left_max = right_max = 0
        water = 0
        while l < r:
            if height[l] < height[r]:
                if height[l] >= left_max:
                    left_max = height[l]
                else:
                    water += left_max - height[l]
                l += 1
            else:
                if height[r] >= right_max:
                    right_max = height[r]
                else:
                    water += right_max - height[r]
                r -= 1
        return water`,
      javascript: `class Solution {
    trap(height) {
        let l = 0, r = height.length - 1;
        let leftMax = 0, rightMax = 0;
        let water = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                if (height[l] >= leftMax) {
                    leftMax = height[l];
                } else {
                    water += leftMax - height[l];
                }
                l++;
            } else {
                if (height[r] >= rightMax) {
                    rightMax = height[r];
                } else {
                    water += rightMax - height[r];
                }
                r--;
            }
        }
        return water;
    }
}`,
    },
    editorial: {
      approach: 'Two-pointer inward contraction with boundary max tracking.',
      algorithm: 'Water trapped is bounded by the lower of the two boundaries.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Optimal constant-space implementation of trapping rain water.',
      referenceCode: `def trap(height: list[int]) -> int: ...`,
    },
    tags: ['Two Pointers', 'Dynamic Programming', 'Monotonic Stack', 'Array'],
    testCases: [
      { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6', isHidden: false },
      { input: '[4,2,0,3,2,5]', expectedOutput: '9', isHidden: false },
      { input: '[1,2,3,4,5]', expectedOutput: '0', isHidden: true },
      { input: '[5,4,1,2]', expectedOutput: '1', isHidden: true },
    ],
  },
];

writePack('pack-500-part-i.ts', 'pack500PartIDefs', packI);
