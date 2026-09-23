import { writePack, ProblemSpec } from './pack-writer-util';

// PACK J: Bit Manipulation & Masks (19 problems)
const packJ: ProblemSpec[] = [
  {
    title: 'Linear Basis XOR Maximum Subset',
    slug: 'bitwise-xor-basis-linear-independence',
    description: 'Given an array of positive integers `nums`, find the maximum possible XOR sum of any subset of `nums` using a linear basis (Gaussian elimination over GF(2)).',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= nums.length <= 10^5\n0 <= nums[i] <= 10^18',
    inputFormat: 'nums',
    outputFormat: 'Maximum XOR sum integer.',
    sampleInput: '[1, 2, 4, 8]',
    sampleOutput: '15',
    points: 200,
    hints: [
      'Construct a linear basis (array basis of size 64) for GF(2).',
      'For each x in nums, iterate from bit 63 down to 0; if x has bit i set and basis[i] is empty, basis[i] = x; else x ^= basis[i].',
      'Greedily maximize XOR total from bit 63 down to 0.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def maxXorSubset(self, nums: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    maxXorSubset(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maxXorSubset(self, nums: list[int]) -> int:
        basis = [0] * 64
        for x in nums:
            for i in range(63, -1, -1):
                if (x >> i) & 1:
                    if not basis[i]:
                        basis[i] = x
                        break
                    x ^= basis[i]
                    
        ans = 0
        for i in range(63, -1, -1):
            if (ans ^ basis[i]) > ans:
                ans ^= basis[i]
        return ans`,
      javascript: `class Solution {
    maxXorSubset(nums) {
        const basis = new Array(64).fill(0n);
        for (let num of nums) {
            let x = BigInt(num);
            for (let i = 63n; i >= 0n; i--) {
                if ((x >> i) & 1n) {
                    if (basis[Number(i)] === 0n) {
                        basis[Number(i)] = x;
                        break;
                    }
                    x ^= basis[Number(i)];
                }
            }
        }
        let ans = 0n;
        for (let i = 63n; i >= 0n; i--) {
            const candidate = ans ^ basis[Number(i)];
            if (candidate > ans) {
                ans = candidate;
            }
        }
        return Number(ans);
    }
}`,
    },
    editorial: {
      approach: 'Gaussian elimination over GF(2) (Linear Basis).',
      algorithm: 'Insert vectors into row echelon basis, then greedily activate bits from most significant to least.',
      timeComplexity: 'O(N * 64)',
      spaceComplexity: 'O(64)',
      content: 'Standard linear basis construction for bitwise XOR queries.',
      referenceCode: `def maxXorSubset(nums: list[int]) -> int: ...`,
    },
    tags: ['Bit Manipulation', 'Math', 'Linear Algebra', 'Greedy'],
    testCases: [
      { input: '[1, 2, 4, 8]', expectedOutput: '15', isHidden: false },
      { input: '[3, 7, 10]', expectedOutput: '14', isHidden: false },
      { input: '[0]', expectedOutput: '0', isHidden: true },
      { input: '[12, 15, 1, 2]', expectedOutput: '15', isHidden: true },
    ],
  },
  {
    title: 'Count Triplets with Equal XOR Subarrays',
    slug: 'count-triplets-that-can-form-two-arrays-of-equal-xor',
    description: 'Given an array of integers `arr`. We want to select three indices `i`, `j` and `k` where `(0 <= i < j <= k < arr.length)`. Such that `a = arr[i] ^ ... ^ arr[j - 1]` and `b = arr[j] ^ ... ^ arr[k]`. Return the number of triplets where `a == b`.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= arr.length <= 300\n1 <= arr[i] <= 10^8',
    inputFormat: 'arr',
    outputFormat: 'Count of triplets integer.',
    sampleInput: '[2,3,1,6,7]',
    sampleOutput: '4',
    points: 150,
    hints: [
      'a == b is equivalent to a ^ b == 0, which means arr[i] ^ ... ^ arr[k] == 0.',
      'If prefixXor[i] == prefixXor[k + 1], then any j where i < j <= k is valid (k - i valid values of j).',
      'Track prefix XOR frequencies and index sums in a hash map for O(N) evaluation.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def countTriplets(self, arr: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    countTriplets(arr) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `from collections import defaultdict

class Solution:
    def countTriplets(self, arr: list[int]) -> int:
        n = len(arr)
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] ^ arr[i]
            
        count = defaultdict(int)
        total_idx = defaultdict(int)
        ans = 0
        
        for k in range(n + 1):
            val = prefix[k]
            if val in count:
                ans += count[val] * (k - 1) - total_idx[val]
            count[val] += 1
            total_idx[val] += k
            
        return ans`,
      javascript: `class Solution {
    countTriplets(arr) {
        const n = arr.length;
        const prefix = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] ^ arr[i];
        
        const count = new Map();
        const totalIdx = new Map();
        let ans = 0;
        
        for (let k = 0; k <= n; k++) {
            const val = prefix[k];
            if (count.has(val)) {
                ans += count.get(val) * (k - 1) - totalIdx.get(val);
            }
            count.set(val, (count.get(val) || 0) + 1);
            totalIdx.set(val, (totalIdx.get(val) || 0) + k);
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Prefix XOR identity with hash map accumulation.',
      algorithm: 'a == b <=> prefixXOR[i] == prefixXOR[k+1]. Sum of (k - i - 1) over all matching pairs in O(N).',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Algebraic simplification eliminates internal index j.',
      referenceCode: `def countTriplets(arr: list[int]) -> int: ...`,
    },
    tags: ['Bit Manipulation', 'Prefix Sum', 'Hash Table', 'Array'],
    testCases: [
      { input: '[2,3,1,6,7]', expectedOutput: '4', isHidden: false },
      { input: '[1,1,1,1,1]', expectedOutput: '10', isHidden: false },
      { input: '[2,3]', expectedOutput: '0', isHidden: true },
      { input: '[1,3,5,7,9]', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Longest Substring Vowels in Even Counts',
    slug: 'find-the-longest-substring-containing-vowels-in-even-counts',
    description: 'Given the string `s`, return the size of the longest substring containing each vowel (\'a\', \'e\', \'i\', \'o\', \'u\') an even number of times.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= s.length <= 5 * 10^5\ns contains only lowercase English letters.',
    inputFormat: 's',
    outputFormat: 'Max substring length integer.',
    sampleInput: '"eleetminicoworoep"',
    sampleOutput: '13',
    points: 150,
    hints: [
      'Represent the parity of the 5 vowels as a 5-bit bitmask (0 to 31).',
      'Track the earliest occurrence index of each bitmask in a hash table or array of size 32.',
      'Whenever the same mask appears again at index i, the substring between seen[mask] and i has all even vowel parities.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def findTheLongestSubstring(self, s: str) -> int:\n        pass`,
      javascript: `class Solution {\n    findTheLongestSubstring(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findTheLongestSubstring(self, s: str) -> int:
        vowels = {'a': 0, 'e': 1, 'i': 2, 'o': 3, 'u': 4}
        first = {0: -1}
        mask = 0
        ans = 0
        for i, ch in enumerate(s):
            if ch in vowels:
                mask ^= (1 << vowels[ch])
            if mask in first:
                ans = max(ans, i - first[mask])
            else:
                first[mask] = i
        return ans`,
      javascript: `class Solution {
    findTheLongestSubstring(s) {
        const vowels = { a: 0, e: 1, i: 2, o: 3, u: 4 };
        const first = new Array(32).fill(-2);
        first[0] = -1;
        let mask = 0, ans = 0;
        for (let i = 0; i < s.length; i++) {
            const ch = s[i];
            if (vowels[ch] !== undefined) {
                mask ^= (1 << vowels[ch]);
            }
            if (first[mask] !== -2) {
                ans = Math.max(ans, i - first[mask]);
            } else {
                first[mask] = i;
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: '5-bit parity mask prefix state hashing.',
      algorithm: 'Mask represents odd/even count of each vowel. Matching prefix masks cancel out.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1) (size 32 array)',
      content: 'Classic state parity prefix technique.',
      referenceCode: `def findTheLongestSubstring(s: str) -> int: ...`,
    },
    tags: ['Bit Manipulation', 'Hash Table', 'String', 'Prefix Sum'],
    testCases: [
      { input: '"eleetminicoworoep"', expectedOutput: '13', isHidden: false },
      { input: '"leetcodeisgreat"', expectedOutput: '5', isHidden: false },
      { input: '"bcbcbc"', expectedOutput: '6', isHidden: true },
      { input: '"a"', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Minimum Flips to Make A OR B Equal to C',
    slug: 'minimum-flips-to-make-a-or-b-equal-to-c',
    description: 'Given 3 positives numbers `a`, `b` and `c`. Return the minimum flips required in some bits of `a` and `b` to make `(a OR b == c)` (bitwise OR). Flip operation consists in change any single bit 1 to 0 or change the bit 0 to 1.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= a <= 10^9\n1 <= b <= 10^9\n1 <= c <= 10^9',
    inputFormat: 'a, b, c',
    outputFormat: 'Minimum bit flips integer.',
    sampleInput: '2, 6, 5',
    sampleOutput: '3',
    points: 150,
    hints: [
      'Examine bit by bit from 0 to 30.',
      'If target bit c_i is 1, and neither a_i nor b_i is 1, 1 flip is needed.',
      'If target bit c_i is 0, every 1 in a_i or b_i must be flipped to 0 (a_i + b_i flips).',
    ],
    codeTemplates: {
      python: `class Solution:\n    def minFlips(self, a: int, b: int, c: int) -> int:\n        pass`,
      javascript: `class Solution {\n    minFlips(a, b, c) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minFlips(self, a: int, b: int, c: int) -> int:
        flips = 0
        for i in range(32):
            bit_a = (a >> i) & 1
            bit_b = (b >> i) & 1
            bit_c = (c >> i) & 1
            if bit_c == 1:
                if bit_a == 0 and bit_b == 0:
                    flips += 1
            else:
                flips += bit_a + bit_b
        return flips`,
      javascript: `class Solution {
    minFlips(a, b, c) {
        let flips = 0;
        for (let i = 0; i < 32; i++) {
            const bitA = (a >> i) & 1;
            const bitB = (b >> i) & 1;
            const bitC = (c >> i) & 1;
            if (bitC === 1) {
                if (bitA === 0 && bitB === 0) flips += 1;
            } else {
                flips += bitA + bitB;
            }
        }
        return flips;
    }
}`,
    },
    editorial: {
      approach: 'Bitwise truth table comparison.',
      algorithm: 'Iterate over 32 bits independently and count required flips per position.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      content: 'Independent per-bit logic minimization.',
      referenceCode: `def minFlips(a: int, b: int, c: int) -> int: ...`,
    },
    tags: ['Bit Manipulation', 'Greedy'],
    testCases: [
      { input: '2, 6, 5', expectedOutput: '3', isHidden: false },
      { input: '4, 2, 7', expectedOutput: '1', isHidden: false },
      { input: '1, 2, 3', expectedOutput: '0', isHidden: true },
      { input: '7, 7, 7', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Single Number II Three Occurrences',
    slug: 'single-number-ii-three-occurrences',
    description: 'Given an integer array `nums` where every element appears three times except for one, which appears exactly once. Find the single element and return it in O(N) time and O(1) extra space.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= nums.length <= 3 * 10^4\n-2^31 <= nums[i] <= 2^31 - 1',
    inputFormat: 'nums',
    outputFormat: 'Single number integer.',
    sampleInput: '[2,2,3,2]',
    sampleOutput: '3',
    points: 150,
    hints: [
      'Sum the bits at each position modulo 3.',
      'Or use two bit variables `ones` and `twos` to simulate a base-3 counter: ones = (ones ^ x) & ~twos; twos = (twos ^ x) & ~ones.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def singleNumber(self, nums: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    singleNumber(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def singleNumber(self, nums: list[int]) -> int:
        ones = twos = 0
        for x in nums:
            ones = (ones ^ x) & ~twos
            twos = (twos ^ x) & ~ones
        return ones`,
      javascript: `class Solution {
    singleNumber(nums) {
        let ones = 0, twos = 0;
        for (const x of nums) {
            ones = (ones ^ x) & ~twos;
            twos = (twos ^ x) & ~ones;
        }
        return ones;
    }
}`,
    },
    editorial: {
      approach: 'Digital logic state machine mod 3.',
      algorithm: 'Transitions between states (0,0) -> (1,0) -> (0,1) -> (0,0) using bitwise gates.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Modulo-3 bitwise adder using two state words.',
      referenceCode: `def singleNumber(nums: list[int]) -> int: ...`,
    },
    tags: ['Bit Manipulation', 'Array'],
    testCases: [
      { input: '[2,2,3,2]', expectedOutput: '3', isHidden: false },
      { input: '[0,1,0,1,0,1,99]', expectedOutput: '99', isHidden: false },
      { input: '[-2,-2,1,-2]', expectedOutput: '1', isHidden: true },
      { input: '[30000]', expectedOutput: '30000', isHidden: true },
    ],
  },
  {
    title: 'Total Hamming Distance All Pairs',
    slug: 'total-hamming-distance-all-pairs',
    description: 'The Hamming distance between two integers is the number of positions at which the corresponding bits are different. Given an integer array `nums`, return the sum of Hamming distances between all the pairs of the integers in `nums`.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= nums.length <= 10^4\n0 <= nums[i] <= 10^9',
    inputFormat: 'nums',
    outputFormat: 'Total Hamming distance sum integer.',
    sampleInput: '[4,14,2]',
    sampleOutput: '6',
    points: 150,
    hints: [
      'Compute the total Hamming distance bit by bit across all 32 bit positions.',
      'For bit i, if k numbers have bit i set and (n - k) have bit i unset, the contribution is k * (n - k).',
      'Sum over all bit positions.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def totalHammingDistance(self, nums: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    totalHammingDistance(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def totalHammingDistance(self, nums: list[int]) -> int:
        n = len(nums)
        total = 0
        for i in range(32):
            ones = sum((x >> i) & 1 for x in nums)
            total += ones * (n - ones)
        return total`,
      javascript: `class Solution {
    totalHammingDistance(nums) {
        const n = nums.length;
        let total = 0;
        for (let i = 0; i < 32; i++) {
            let ones = 0;
            for (let j = 0; j < n; j++) {
                if ((nums[j] >> i) & 1) ones++;
            }
            total += ones * (n - ones);
        }
        return total;
    }
}`,
    },
    editorial: {
      approach: 'Bit-by-bit combinatorial contribution counting.',
      algorithm: 'Each bit position contributes ones * zeros distance pairs independently.',
      timeComplexity: 'O(32 * N)',
      spaceComplexity: 'O(1)',
      content: 'Reduces O(N^2) pairwise comparisons to linear time bit counting.',
      referenceCode: `def totalHammingDistance(nums: list[int]) -> int: ...`,
    },
    tags: ['Bit Manipulation', 'Math', 'Combinatorics'],
    testCases: [
      { input: '[4,14,2]', expectedOutput: '6', isHidden: false },
      { input: '[4,14,4]', expectedOutput: '4', isHidden: false },
      { input: '[1,2,3,4,5]', expectedOutput: '18', isHidden: true },
      { input: '[0]', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Counting Bits Dynamic Programming',
    slug: 'counting-bits-dp-offset',
    description: 'Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (`0 <= i <= n`), `ans[i]` is the number of 1\'s in the binary representation of `i`. Solve it in linear time O(n) and single pass.',
    difficulty: 'EASY',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '0 <= n <= 10^5',
    inputFormat: 'n',
    outputFormat: 'List of bit counts from 0 to n.',
    sampleInput: '2',
    sampleOutput: '[0, 1, 1]',
    points: 100,
    hints: [
      'ans[i] = ans[i >> 1] + (i & 1).',
      'Or ans[i] = ans[i & (i - 1)] + 1.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def countBits(self, n: int) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    countBits(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def countBits(self, n: int) -> list[int]:
        ans = [0] * (n + 1)
        for i in range(1, n + 1):
            ans[i] = ans[i >> 1] + (i & 1)
        return ans`,
      javascript: `class Solution {
    countBits(n) {
        const ans = new Array(n + 1).fill(0);
        for (let i = 1; i <= n; i++) {
            ans[i] = ans[i >> 1] + (i & 1);
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Bottom-up DP using least significant bit recurrence.',
      algorithm: 'ans[i] = ans[i >> 1] + (i & 1) in O(1) per integer.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Optimal linear DP for popcount array computation.',
      referenceCode: `def countBits(n: int) -> list[int]: ...`,
    },
    tags: ['Bit Manipulation', 'Dynamic Programming', 'Array'],
    testCases: [
      { input: '2', expectedOutput: '[0, 1, 1]', isHidden: false },
      { input: '5', expectedOutput: '[0, 1, 1, 2, 1, 2]', isHidden: false },
      { input: '0', expectedOutput: '[0]', isHidden: true },
      { input: '8', expectedOutput: '[0, 1, 1, 2, 1, 2, 2, 3, 1]', isHidden: true },
    ],
  },
];

writePack('pack-500-part-j.ts', 'pack500PartJDefs', packJ);
