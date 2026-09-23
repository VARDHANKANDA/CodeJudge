import { ProblemSpec, writePack } from './pack-writer-util';

// PACK J: Bit Manipulation & Masks (19 problems)
const problemsJ: ProblemSpec[] = [
  {
    title: 'Linear Basis XOR Maximum Subsequence',
    slug: 'linear-basis-xor-maximum-subsequence',
    description: `Given an array of $N$ non-negative integers, compute the maximum XOR sum attainable by choosing any subset of the array using Gaussian Elimination over GF(2) (Linear Basis).`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= N <= 10^5, 0 <= nums[i] <= 10^18`,
    inputFormat: `nums`,
    outputFormat: `Maximum possible subset XOR sum.`,
    sampleInput: `[12, 15, 7]`,
    sampleOutput: `15`,
    points: 200,
    hints: ['Insert each number into a 64-bit basis. After building the basis, greedily maximize the XOR accumulator from high bit to low bit.'],
    codeTemplates: {
      python: `class Solution:\n    def maxXorSubset(self, nums: list) -> int:\n        pass`,
      javascript: `class Solution {\n    maxXorSubset(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maxXorSubset(self, nums: list) -> int:
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
        const basis = Array(64).fill(BigInt(0));
        for (const n of nums) {
            let x = BigInt(n);
            for (let i = BigInt(63); i >= BigInt(0); i--) {
                if ((x >> i) & BigInt(1)) {
                    if (basis[Number(i)] === BigInt(0)) {
                        basis[Number(i)] = x;
                        break;
                    }
                    x ^= basis[Number(i)];
                }
            }
        }
        let ans = BigInt(0);
        for (let i = BigInt(63); i >= BigInt(0); i--) {
            if ((ans ^ basis[Number(i)]) > ans) {
                ans ^= basis[Number(i)];
            }
        }
        return Number(ans);
    }
}`,
    },
    editorial: {
      approach: 'Gaussian Elimination over GF(2) (Linear Basis).',
      algorithm: 'Represent numbers as vector space over GF(2). Maximum XOR query takes O(B) where B is bit count.',
      timeComplexity: 'O(N * 64)',
      spaceComplexity: 'O(64)',
      content: 'Standard linear basis construction for XOR maximization.',
      referenceCode: `if (ans ^ basis[i]) > ans: ans ^= basis[i]`,
    },
    tags: ['Bit Manipulation', 'Math', 'Linear Basis', 'Greedy'],
    testCases: [
      { input: `[12, 15, 7]`, expectedOutput: `15`, isHidden: false, order: 0 },
      { input: `[1, 2, 4, 8]`, expectedOutput: `15`, isHidden: false, order: 1 },
      { input: `[0, 0, 0]`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Count Triplets That Can Form Two Arrays of Equal XOR',
    slug: 'count-triplets-that-can-form-two-arrays-of-equal-xor',
    description: `Given an array of integers \`arr\`. We want to select three indices \`i\`, \`j\` and \`k\` where $0 \\le i < j \\le k < arr.length$. Such that $a = arr[i] \\oplus \\dots \\oplus arr[j - 1]$ and $b = arr[j] \\oplus \\dots \\oplus arr[k]$. Return the number of triplets where $a == b$.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= arr.length <= 300, 1 <= arr[i] <= 10^8`,
    inputFormat: `arr`,
    outputFormat: `Number of valid triplets.`,
    sampleInput: `[2,3,1,6,7]`,
    sampleOutput: `4`,
    points: 100,
    hints: ['a == b is equivalent to prefix[i] == prefix[k+1]. Any j between i+1 and k is valid.'],
    codeTemplates: {
      python: `class Solution:\n    def countTriplets(self, arr: list) -> int:\n        pass`,
      javascript: `class Solution {\n    countTriplets(arr) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def countTriplets(self, arr: list) -> int:
        n = len(arr)
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] ^ arr[i]
        ans = 0
        for i in range(n):
            for k in range(i + 1, n):
                if prefix[i] == prefix[k + 1]:
                    ans += k - i
        return ans`,
      javascript: `class Solution {
    countTriplets(arr) {
        const n = arr.length;
        const prefix = Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] ^ arr[i];
        let ans = 0;
        for (let i = 0; i < n; i++) {
            for (let k = i + 1; k < n; k++) {
                if (prefix[i] === prefix[k + 1]) {
                    ans += k - i;
                }
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Prefix XOR Equality Equivalence.',
      algorithm: 'a == b iff prefix[i] ^ prefix[k+1] == 0, contributing (k - i) choices of j.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N)',
      content: 'Standard XOR prefix triplet counting.',
      referenceCode: `if prefix[i] == prefix[k + 1]: ans += k - i`,
    },
    tags: ['Bit Manipulation', 'Prefix Sum', 'Array'],
    testCases: [
      { input: `[2,3,1,6,7]`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `[1,1,1,1,1]`, expectedOutput: `10`, isHidden: false, order: 1 },
      { input: `[2,3]`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Find the Longest Substring Containing Vowels in Even Counts',
    slug: 'find-the-longest-substring-containing-vowels-in-even-counts',
    description: `Given the string \`s\`, return the size of the longest substring containing each vowel 'a', 'e', 'i', 'o', 'u' an even number of times.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= s.length <= 5 * 10^5`,
    inputFormat: `s`,
    outputFormat: `Length integer.`,
    sampleInput: `"eleetminicoworoep"`,
    sampleOutput: `13`,
    points: 150,
    hints: ['Represent vowel parity state with a 5-bit mask and store first seen index of each mask.'],
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
        const first = new Map();
        first.set(0, -1);
        let mask = 0, ans = 0;
        for (let i = 0; i < s.length; i++) {
            const ch = s[i];
            if (vowels[ch] !== undefined) {
                mask ^= (1 << vowels[ch]);
            }
            if (first.has(mask)) {
                ans = Math.max(ans, i - first.get(mask));
            } else {
                first.set(mask, i);
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: '5-Bit Parity State Hash Map.',
      algorithm: 'Parity state flips on vowels; distance between identical parity states has even vowel counts.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(32) = O(1)',
      content: 'Standard bitmask parity prefix tracking.',
      referenceCode: `ans = max(ans, i - first[mask])`,
    },
    tags: ['Bit Manipulation', 'Hash Table', 'String', 'Prefix Sum'],
    testCases: [
      { input: `"eleetminicoworoep"`, expectedOutput: `13`, isHidden: false, order: 0 },
      { input: `"leetcodeisgreat"`, expectedOutput: `5`, isHidden: false, order: 1 },
      { input: `"bcbcbc"`, expectedOutput: `6`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Minimum Flips to Make a OR b Equal to c',
    slug: 'minimum-flips-to-make-a-or-b-equal-to-c',
    description: `Given 3 positive numbers \`a\`, \`b\` and \`c\`. Return the minimum flips required in some bits of \`a\` and \`b\` to make \`(a OR b == c)\`.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= a, b, c <= 10^9`,
    inputFormat: `a, b, c`,
    outputFormat: `Minimum flips count.`,
    sampleInput: `2, 6, 5`,
    sampleOutput: `3`,
    points: 100,
    hints: ['Examine each bit position individually. If bit of c is 0, both bits in a and b must be flipped to 0.'],
    codeTemplates: {
      python: `class Solution:\n    def minFlips(self, a: int, b: int, c: int) -> int:\n        pass`,
      javascript: `class Solution {\n    minFlips(a, b, c) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minFlips(self, a: int, b: int, c: int) -> int:
        flips = 0
        for i in range(32):
            ba = (a >> i) & 1
            bb = (b >> i) & 1
            bc = (c >> i) & 1
            if bc == 0:
                flips += ba + bb
            else:
                if ba == 0 and bb == 0:
                    flips += 1
        return flips`,
      javascript: `class Solution {
    minFlips(a, b, c) {
        let flips = 0;
        for (let i = 0; i < 32; i++) {
            const ba = (a >> i) & 1;
            const bb = (b >> i) & 1;
            const bc = (c >> i) & 1;
            if (bc === 0) {
                flips += ba + bb;
            } else {
                if (ba === 0 && bb === 0) flips += 1;
            }
        }
        return flips;
    }
}`,
    },
    editorial: {
      approach: 'Bitwise Column Evaluation.',
      algorithm: 'Evaluate 32 bit planes independently.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      content: 'Standard bitwise operation manipulation.',
      referenceCode: `if bc == 0: flips += ba + bb else: flips += int(ba == 0 and bb == 0)`,
    },
    tags: ['Bit Manipulation'],
    testCases: [
      { input: `2, 6, 5`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `4, 2, 7`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `1, 2, 3`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Single Number II Three Times Counting',
    slug: 'single-number-ii-three-times-counting',
    description: `Given an integer array \`nums\` where every element appears three times except for one, which appears exactly once. Find the single element and return it in $O(N)$ time and $O(1)$ space.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 3 * 10^4, -2^31 <= nums[i] <= 2^31 - 1`,
    inputFormat: `nums`,
    outputFormat: `Single integer.`,
    sampleInput: `[2,2,3,2]`,
    sampleOutput: `3`,
    points: 100,
    hints: ['Count the sum of bits at each position modulo 3, or use two bitmasks (ones, twos) as a modulo 3 state counter.'],
    codeTemplates: {
      python: `class Solution:\n    def singleNumber(self, nums: list) -> int:\n        pass`,
      javascript: `class Solution {\n    singleNumber(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def singleNumber(self, nums: list) -> int:
        ones, twos = 0, 0
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
      approach: 'Modulo 3 Digital Logic Counter.',
      algorithm: 'Two bit variables track transition state modulo 3: (0,0) -> (1,0) -> (0,1) -> (0,0).',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Standard Karnaugh map bitwise counter.',
      referenceCode: `ones = (ones ^ x) & ~twos; twos = (twos ^ x) & ~ones`,
    },
    tags: ['Bit Manipulation', 'Array'],
    testCases: [
      { input: `[2,2,3,2]`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `[0,1,0,1,0,1,99]`, expectedOutput: `99`, isHidden: false, order: 1 },
      { input: `[-2,-2,1,-2]`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Total Hamming Distance Between All Pairs',
    slug: 'total-hamming-distance-between-all-pairs',
    description: `The Hamming distance between two integers is the number of positions at which the corresponding bits are different. Given an integer array \`nums\`, return the sum of Hamming distances between all the pairs of the integers in \`nums\`.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 10^4, 0 <= nums[i] <= 10^9`,
    inputFormat: `nums`,
    outputFormat: `Total hamming distance sum.`,
    sampleInput: `[4,14,2]`,
    sampleOutput: `6`,
    points: 100,
    hints: ['Count number of 1s (k) at bit position i; the contribution is k * (n - k).'],
    codeTemplates: {
      python: `class Solution:\n    def totalHammingDistance(self, nums: list) -> int:\n        pass`,
      javascript: `class Solution {\n    totalHammingDistance(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def totalHammingDistance(self, nums: list) -> int:
        n = len(nums)
        ans = 0
        for i in range(32):
            ones = sum((x >> i) & 1 for x in nums)
            ans += ones * (n - ones)
        return ans`,
      javascript: `class Solution {
    totalHammingDistance(nums) {
        const n = nums.length;
        let ans = 0;
        for (let i = 0; i < 32; i++) {
            let ones = 0;
            for (const x of nums) {
                if ((x >> i) & 1) ones++;
            }
            ans += ones * (n - ones);
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Bit-by-Bit Combinatorial Contribution.',
      algorithm: 'Each bit plane contributes ones * zeros to the total distance.',
      timeComplexity: 'O(32 * N)',
      spaceComplexity: 'O(1)',
      content: 'Standard pair distance sum optimization.',
      referenceCode: `ans += ones * (n - ones)`,
    },
    tags: ['Bit Manipulation', 'Math', 'Array'],
    testCases: [
      { input: `[4,14,2]`, expectedOutput: `6`, isHidden: false, order: 0 },
      { input: `[4,14,4]`, expectedOutput: `4`, isHidden: false, order: 1 },
      { input: `[1]`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Repeated DNA Sequences 10-Letter Rolling Mask',
    slug: 'repeated-dna-sequences-10-letter-rolling-mask',
    description: `The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'. Given a string \`s\` that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule in lexicographical order.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= s.length <= 10^5, s[i] is 'A', 'C', 'G', or 'T'`,
    inputFormat: `s`,
    outputFormat: `Sorted list of repeated 10-character DNA strings.`,
    sampleInput: `"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"`,
    sampleOutput: `["AAAAACCCCC","CCCCCAAAAA"]`,
    points: 100,
    hints: ['Encode each 10-mer into a 20-bit integer using 2 bits per base.'],
    codeTemplates: {
      python: `class Solution:\n    def findRepeatedDnaSequences(self, s: str) -> list:\n        pass`,
      javascript: `class Solution {\n    findRepeatedDnaSequences(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findRepeatedDnaSequences(self, s: str) -> list:
        if len(s) < 10: return []
        to_int = {'A': 0, 'C': 1, 'G': 2, 'T': 3}
        seen = set()
        res = set()
        mask = 0
        for i in range(9):
            mask = (mask << 2) | to_int[s[i]]
        for i in range(9, len(s)):
            mask = ((mask << 2) & 0xFFFFF) | to_int[s[i]]
            if mask in seen:
                res.add(s[i-9:i+1])
            else:
                seen.add(mask)
        return sorted(list(res))`,
      javascript: `class Solution {
    findRepeatedDnaSequences(s) {
        if (s.length < 10) return [];
        const toInt = { A: 0, C: 1, G: 2, T: 3 };
        const seen = new Set();
        const res = new Set();
        let mask = 0;
        for (let i = 0; i < 9; i++) mask = (mask << 2) | toInt[s[i]];
        for (let i = 9; i < s.length; i++) {
            mask = ((mask << 2) & 0xFFFFF) | toInt[s[i]];
            if (seen.has(mask)) {
                res.add(s.slice(i - 9, i + 1));
            } else {
                seen.add(mask);
            }
        }
        return Array.from(res).sort();
    }
}`,
    },
    editorial: {
      approach: '2-Bit Base 20-Bit Rolling Mask.',
      algorithm: 'Constant-time 20-bit sliding window hash computation.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard bitwise rolling hash on DNA characters.',
      referenceCode: `mask = ((mask << 2) & 0xFFFFF) | to_int[s[i]]`,
    },
    tags: ['Bit Manipulation', 'Hash Table', 'String', 'Sliding Window'],
    testCases: [
      { input: `"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"`, expectedOutput: `["AAAAACCCCC","CCCCCAAAAA"]`, isHidden: false, order: 0 },
      { input: `"AAAAAAAAAAAAA"`, expectedOutput: `["AAAAAAAAAA"]`, isHidden: false, order: 1 },
      { input: `"A"`, expectedOutput: `[]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Bitwise AND of Numbers Range Query',
    slug: 'bitwise-and-of-numbers-range-query',
    description: `Given two integers \`left\` and \`right\` that represent the range \`[left, right]\`, return the bitwise AND of all numbers in this range, inclusive.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= left <= right <= 2^31 - 1`,
    inputFormat: `left, right`,
    outputFormat: `Bitwise AND integer.`,
    sampleInput: `5, 7`,
    sampleOutput: `4`,
    points: 100,
    hints: ['The bitwise AND of a range is simply the common binary prefix of left and right.'],
    codeTemplates: {
      python: `class Solution:\n    def rangeBitwiseAnd(self, left: int, right: int) -> int:\n        pass`,
      javascript: `class Solution {\n    rangeBitwiseAnd(left, right) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        shift = 0
        while left < right:
            left >>= 1
            right >>= 1
            shift += 1
        return left << shift`,
      javascript: `class Solution {
    rangeBitwiseAnd(left, right) {
        let shift = 0;
        while (left < right) {
            left >>= 1;
            right >>= 1;
            shift++;
        }
        return left << shift;
    }
}`,
    },
    editorial: {
      approach: 'Common Binary Prefix Finding.',
      algorithm: 'Right-shift both endpoints until they match to isolate common prefix.',
      timeComplexity: 'O(log(Right))',
      spaceComplexity: 'O(1)',
      content: 'Standard range bitwise AND reduction.',
      referenceCode: `while left < right: left >>= 1; right >>= 1; shift += 1`,
    },
    tags: ['Bit Manipulation'],
    testCases: [
      { input: `5, 7`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `0, 0`, expectedOutput: `0`, isHidden: false, order: 1 },
      { input: `1, 2147483647`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Single Number III Two Elements Appearing Once',
    slug: 'single-number-iii-two-elements-appearing-once',
    description: `Given an integer array \`nums\`, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once in sorted order.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `2 <= nums.length <= 30000, -2^31 <= nums[i] <= 2^31 - 1`,
    inputFormat: `nums`,
    outputFormat: `Two elements in ascending sorted order.`,
    sampleInput: `[1,2,1,3,2,5]`,
    sampleOutput: `[3,5]`,
    points: 100,
    hints: ['XOR all elements to get a ^ b. Find lowest set bit (diff = xor & -xor) to partition array into two groups.'],
    codeTemplates: {
      python: `class Solution:\n    def singleNumber(self, nums: list) -> list:\n        pass`,
      javascript: `class Solution {\n    singleNumber(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def singleNumber(self, nums: list) -> list:
        xor = 0
        for x in nums: xor ^= x
        diff = xor & (-xor)
        a, b = 0, 0
        for x in nums:
            if x & diff:
                a ^= x
            else:
                b ^= x
        return sorted([a, b])`,
      javascript: `class Solution {
    singleNumber(nums) {
        let xor = 0;
        for (const x of nums) xor ^= x;
        const diff = xor & (-xor);
        let a = 0, b = 0;
        for (const x of nums) {
            if (x & diff) a ^= x;
            else b ^= x;
        }
        return [a, b].sort((x, y) => x - y);
    }
}`,
    },
    editorial: {
      approach: 'Lowest Differing Bit Partitioning.',
      algorithm: 'Use lowest set bit of XOR product to divide elements into two disjoint single-element XOR buckets.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Standard single number III partitioning.',
      referenceCode: `diff = xor & (-xor)`,
    },
    tags: ['Bit Manipulation', 'Array'],
    testCases: [
      { input: `[1,2,1,3,2,5]`, expectedOutput: `[3,5]`, isHidden: false, order: 0 },
      { input: `[-1,0]`, expectedOutput: `[-1,0]`, isHidden: false, order: 1 },
      { input: `[0,1]`, expectedOutput: `[0,1]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Number of Valid Words for Each Puzzle Bitmask',
    slug: 'number-of-valid-words-for-each-puzzle-bitmask',
    description: `With respect to a given \`puzzle\` string, a \`word\` is valid if: \`word\` contains the first letter of \`puzzle\`, and every letter in \`word\` is in \`puzzle\`. Given an array of \`words\` and an array of \`puzzles\`, return an array \`answer\`, where \`answer[i]\` is the number of words in the given word list \`words\` that is valid with respect to the puzzle \`puzzles[i]\`.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `words.length <= 10^5, puzzles.length <= 10^4, puzzles[i].length == 7`,
    inputFormat: `words, puzzles`,
    outputFormat: `List of valid word counts per puzzle.`,
    sampleInput: `["aaaa","asas","able","ability","actt","actor","access"], ["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]`,
    sampleOutput: `[1,1,3,2,2,0]`,
    points: 200,
    hints: ['Count frequency of word bitmasks. For each puzzle, iterate through all submasks of its 7 letters.'],
    codeTemplates: {
      python: `class Solution:\n    def findNumOfValidWords(self, words: list, puzzles: list) -> list:\n        pass`,
      javascript: `class Solution {\n    findNumOfValidWords(words, puzzles) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findNumOfValidWords(self, words: list, puzzles: list) -> list:
        import collections
        count = collections.defaultdict(int)
        for w in words:
            m = 0
            for ch in w: m |= (1 << (ord(ch) - 97))
            count[m] += 1
        res = []
        for p in puzzles:
            first_bit = 1 << (ord(p[0]) - 97)
            mask = 0
            for ch in p: mask |= (1 << (ord(ch) - 97))
            sub = mask
            total = 0
            while sub > 0:
                if sub & first_bit:
                    total += count[sub]
                sub = (sub - 1) & mask
            res.append(total)
        return res`,
      javascript: `class Solution {
    findNumOfValidWords(words, puzzles) {
        const count = new Map();
        for (const w of words) {
            let m = 0;
            for (let i = 0; i < w.length; i++) m |= (1 << (w.charCodeAt(i) - 97));
            count.set(m, (count.get(m) || 0) + 1);
        }
        return puzzles.map(p => {
            const firstBit = 1 << (p.charCodeAt(0) - 97);
            let mask = 0;
            for (let i = 0; i < p.length; i++) mask |= (1 << (p.charCodeAt(i) - 97));
            let sub = mask;
            let total = 0;
            while (sub > 0) {
                if (sub & firstBit) total += (count.get(sub) || 0);
                sub = (sub - 1) & mask;
            }
            return total;
        });
    }
}`,
    },
    editorial: {
      approach: 'Submask Enumeration via (sub - 1) & mask.',
      algorithm: 'Iterate all 2^7 = 128 submasks per puzzle and accumulate word mask frequencies.',
      timeComplexity: 'O(Sum(|Words|) + Puzzles * 2^7)',
      spaceComplexity: 'O(Distinct Word Masks)',
      content: 'Standard submask enumeration trick.',
      referenceCode: `sub = (sub - 1) & mask`,
    },
    tags: ['Bit Manipulation', 'Trie', 'Hash Table', 'String'],
    testCases: [
      { input: `["aaaa","asas","able","ability","actt","actor","access"], ["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]`, expectedOutput: `[1,1,3,2,2,0]`, isHidden: false, order: 0 },
      { input: `["apple","pleas","please"], ["aelwxyz","aelpxyz","aelpsxy","saelpxy","xaelpsy"]`, expectedOutput: `[0,1,3,2,0]`, isHidden: false, order: 1 },
      { input: `["a"], ["abcdefg"]`, expectedOutput: `[1]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Smallest Sufficient Team Bitmask DP',
    slug: 'smallest-sufficient-team-bitmask-dp',
    description: `In a project, you have a list of required skills \`req_skills\`, and a list of \`people\`. The \`i\`-th person \`people[i]\` contains a list of skills that the person has. Return any sufficient team of the smallest possible size (represented by the index of each person).`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= req_skills.length <= 16, 1 <= people.length <= 60`,
    inputFormat: `req_skills, people`,
    outputFormat: `Sorted list of person indices.`,
    sampleInput: `["java","nodejs","reactjs"], [["java"],["nodejs"],["nodejs","reactjs"]]`,
    sampleOutput: `[0, 2]`,
    points: 200,
    hints: ['Use DP where dp[mask] stores the smallest team covering skill bitmask.'],
    codeTemplates: {
      python: `class Solution:\n    def smallestSufficientTeam(self, req_skills: list, people: list) -> list:\n        pass`,
      javascript: `class Solution {\n    smallestSufficientTeam(req_skills, people) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def smallestSufficientTeam(self, req_skills: list, people: list) -> list:
        n = len(req_skills)
        skill_idx = {s: i for i, s in enumerate(req_skills)}
        dp = {0: []}
        for i, p_skills in enumerate(people):
            cur_mask = 0
            for s in p_skills:
                if s in skill_idx:
                    cur_mask |= (1 << skill_idx[s])
            if not cur_mask: continue
            for prev_mask, team in list(dp.items()):
                new_mask = prev_mask | cur_mask
                if new_mask not in dp or len(team) + 1 < len(dp[new_mask]):
                    dp[new_mask] = team + [i]
        return sorted(dp[(1 << n) - 1])`,
      javascript: `class Solution {
    smallestSufficientTeam(req_skills, people) {
        const n = req_skills.length;
        const skillIdx = new Map();
        req_skills.forEach((s, i) => skillIdx.set(s, i));
        const dp = new Map();
        dp.set(0, []);
        people.forEach((pSkills, i) => {
            let curMask = 0;
            for (const s of pSkills) {
                if (skillIdx.has(s)) curMask |= (1 << skillIdx.get(s));
            }
            if (!curMask) return;
            for (const [prevMask, team] of Array.from(dp.entries())) {
                const newMask = prevMask | curMask;
                if (!dp.has(newMask) || team.length + 1 < dp.get(newMask).length) {
                    dp.set(newMask, [...team, i]);
                }
            }
        });
        return dp.get((1 << n) - 1).sort((a, b) => a - b);
    }
}`,
    },
    editorial: {
      approach: 'Exact Cover Bitmask Dynamic Programming.',
      algorithm: 'dp[mask] maintains optimal person index list achieving skill combination.',
      timeComplexity: 'O(People * 2^Skills)',
      spaceComplexity: 'O(2^Skills)',
      content: 'Standard bitmask exact cover DP.',
      referenceCode: `if new_mask not in dp or len(team) + 1 < len(dp[new_mask]): dp[new_mask] = team + [i]`,
    },
    tags: ['Bit Manipulation', 'Dynamic Programming', 'Bitmask'],
    testCases: [
      { input: `["java","nodejs","reactjs"], [["java"],["nodejs"],["nodejs","reactjs"]]`, expectedOutput: `[0, 2]`, isHidden: false, order: 0 },
      { input: `["algorithms","math","java","reactjs","csharp","aws"], [["algorithms","math","java"],["algorithms","math","reactjs"],["java","csharp","aws"],["reactjs","csharp"],["csharp","math"],["aws","java"]]`, expectedOutput: `[1, 2]`, isHidden: false, order: 1 },
      { input: `["a"], [["a"]]`, expectedOutput: `[0]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Subsets Power Set Generation via Bitmasks',
    slug: 'subsets-power-set-generation-via-bitmasks',
    description: `Given an integer array \`nums\` of unique elements, return all possible subsets (the power set) generated by binary mask enumeration.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 10, -10 <= nums[i] <= 10`,
    inputFormat: `nums`,
    outputFormat: `List of subsets.`,
    sampleInput: `[1,2,3]`,
    sampleOutput: `[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`,
    points: 100,
    hints: ['Loop mask from 0 to 2^n - 1, including nums[i] if (mask >> i) & 1.'],
    codeTemplates: {
      python: `class Solution:\n    def subsets(self, nums: list) -> list:\n        pass`,
      javascript: `class Solution {\n    subsets(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def subsets(self, nums: list) -> list:
        n = len(nums)
        res = []
        for mask in range(1 << n):
            sub = [nums[i] for i in range(n) if (mask >> i) & 1]
            res.append(sub)
        return res`,
      javascript: `class Solution {
    subsets(nums) {
        const n = nums.length;
        const res = [];
        for (let mask = 0; mask < (1 << n); mask++) {
            const sub = [];
            for (let i = 0; i < n; i++) {
                if ((mask >> i) & 1) sub.push(nums[i]);
            }
            res.push(sub);
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Direct Bitmask Indexing Power Set.',
      algorithm: 'Enumerate integer range 0..2^N-1 and test bit positions.',
      timeComplexity: 'O(N * 2^N)',
      spaceComplexity: 'O(N * 2^N)',
      content: 'Standard binary representation subset generator.',
      referenceCode: `sub = [nums[i] for i in range(n) if (mask >> i) & 1]`,
    },
    tags: ['Bit Manipulation', 'Array', 'Backtracking'],
    testCases: [
      { input: `[1,2,3]`, expectedOutput: `[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`, isHidden: false, order: 0 },
      { input: `[0]`, expectedOutput: `[[],[0]]`, isHidden: false, order: 1 },
      { input: `[1,2]`, expectedOutput: `[[],[1],[2],[1,2]]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Counting Bits Popcount Table Generation',
    slug: 'counting-bits-popcount-table-generation',
    description: `Given an integer \`n\`, return an array \`ans\` of length \`n + 1\` such that for each \`i\` ($0 \\le i \\le n$), \`ans[i]\` is the number of 1's in the binary representation of \`i\` computed in $O(N)$ time.`,
    difficulty: 'EASY',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= n <= 10^5`,
    inputFormat: `n`,
    outputFormat: `Array of popcounts from 0 to n.`,
    sampleInput: `5`,
    sampleOutput: `[0,1,1,2,1,2]`,
    points: 50,
    hints: ['dp[i] = dp[i >> 1] + (i & 1).'],
    codeTemplates: {
      python: `class Solution:\n    def countBits(self, n: int) -> list:\n        pass`,
      javascript: `class Solution {\n    countBits(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def countBits(self, n: int) -> list:
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            dp[i] = dp[i >> 1] + (i & 1)
        return dp`,
      javascript: `class Solution {
    countBits(n) {
        const dp = Array(n + 1).fill(0);
        for (let i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
}`,
    },
    editorial: {
      approach: 'Linear Bit Shift DP.',
      algorithm: 'Relate i to i >> 1 with least significant bit addition in O(1) per integer.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard popcount linear DP recurrence.',
      referenceCode: `dp[i] = dp[i >> 1] + (i & 1)`,
    },
    tags: ['Bit Manipulation', 'Dynamic Programming'],
    testCases: [
      { input: `5`, expectedOutput: `[0,1,1,2,1,2]`, isHidden: false, order: 0 },
      { input: `2`, expectedOutput: `[0,1,1]`, isHidden: false, order: 1 },
      { input: `0`, expectedOutput: `[0]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Reverse Bits 32-Bit Integer Mirror',
    slug: 'reverse-bits-32-bit-integer-mirror',
    description: `Reverse bits of a given 32 bits unsigned integer.`,
    difficulty: 'EASY',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= n <= 2^32 - 1`,
    inputFormat: `n`,
    outputFormat: `Reversed 32-bit integer.`,
    sampleInput: `43261596`,
    sampleOutput: `964176192`,
    points: 50,
    hints: ['Extract least significant bit of n and shift into result for 32 iterations.'],
    codeTemplates: {
      python: `class Solution:\n    def reverseBits(self, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    reverseBits(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def reverseBits(self, n: int) -> int:
        ans = 0
        for _ in range(32):
            ans = (ans << 1) | (n & 1)
            n >>= 1
        return ans`,
      javascript: `class Solution {
    reverseBits(n) {
        let ans = 0;
        for (let i = 0; i < 32; i++) {
            ans = (ans * 2) + (n % 2);
            n = Math.floor(n / 2);
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: '32-Step Bit Shift Accumulation.',
      algorithm: 'Directly reverse bit stream by push/pop shifts.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      content: 'Standard 32-bit integer bit reversal.',
      referenceCode: `ans = (ans << 1) | (n & 1); n >>= 1`,
    },
    tags: ['Bit Manipulation'],
    testCases: [
      { input: `43261596`, expectedOutput: `964176192`, isHidden: false, order: 0 },
      { input: `1`, expectedOutput: `2147483648`, isHidden: false, order: 1 },
      { input: `0`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Power of Two Bitwise Checker',
    slug: 'power-of-two-bitwise-checker',
    description: `Given an integer \`n\`, return \`true\` if it is a power of two. Otherwise, return \`false\`.`,
    difficulty: 'EASY',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `-2^31 <= n <= 2^31 - 1`,
    inputFormat: `n`,
    outputFormat: `Boolean true/false.`,
    sampleInput: `16`,
    sampleOutput: `true`,
    points: 50,
    hints: ['n > 0 and (n & (n - 1)) == 0.'],
    codeTemplates: {
      python: `class Solution:\n    def isPowerOfTwo(self, n: int) -> bool:\n        pass`,
      javascript: `class Solution {\n    isPowerOfTwo(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0`,
      javascript: `class Solution {
    isPowerOfTwo(n) {
        return n > 0 && (n & (n - 1)) === 0;
    }
}`,
    },
    editorial: {
      approach: 'Bitwise Low-Bit Clearing Invariant.',
      algorithm: 'Powers of two have exactly one bit set in binary representation.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      content: 'Standard power-of-two bitwise test.',
      referenceCode: `return n > 0 and (n & (n - 1)) == 0`,
    },
    tags: ['Bit Manipulation', 'Math'],
    testCases: [
      { input: `16`, expectedOutput: `true`, isHidden: false, order: 0 },
      { input: `3`, expectedOutput: `false`, isHidden: false, order: 1 },
      { input: `1`, expectedOutput: `true`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Hamming Weight Number of 1 Bits',
    slug: 'hamming-weight-number-of-1-bits',
    description: `Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).`,
    difficulty: 'EASY',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 2^31 - 1`,
    inputFormat: `n`,
    outputFormat: `Count of 1 bits.`,
    sampleInput: `11`,
    sampleOutput: `3`,
    points: 50,
    hints: ['Brian Kernighan algorithm: while n > 0, n &= (n - 1) and increment count.'],
    codeTemplates: {
      python: `class Solution:\n    def hammingWeight(self, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    hammingWeight(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def hammingWeight(self, n: int) -> int:
        count = 0
        while n:
            n &= (n - 1)
            count += 1
        return count`,
      javascript: `class Solution {
    hammingWeight(n) {
        let count = 0;
        while (n > 0) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
}`,
    },
    editorial: {
      approach: 'Brian Kernighan Bit Cleared Loop.',
      algorithm: 'n &= (n - 1) clears the lowest set bit in exactly O(Popcount) steps.',
      timeComplexity: 'O(Popcount)',
      spaceComplexity: 'O(1)',
      content: 'Standard popcount bit manipulation.',
      referenceCode: `while n: n &= (n - 1); count += 1`,
    },
    tags: ['Bit Manipulation'],
    testCases: [
      { input: `11`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `128`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `2147483645`, expectedOutput: `30`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Maximum XOR of Two Numbers in an Array Trie',
    slug: 'maximum-xor-of-two-numbers-in-an-array-trie',
    description: `Given an integer array \`nums\`, return the maximum result of \`nums[i] XOR nums[j]\`, where $0 \\le i \\le j < n$.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 2 * 10^4, 0 <= nums[i] <= 2^31 - 1`,
    inputFormat: `nums`,
    outputFormat: `Maximum XOR integer.`,
    sampleInput: `[3,10,5,25,2,8]`,
    sampleOutput: `28`,
    points: 150,
    hints: ['Insert bit representations of numbers into a Binary Trie and query maximum opposite branch at each bit.'],
    codeTemplates: {
      python: `class Solution:\n    def findMaximumXOR(self, nums: list) -> int:\n        pass`,
      javascript: `class Solution {\n    findMaximumXOR(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findMaximumXOR(self, nums: list) -> int:
        root = {}
        for num in nums:
            node = root
            for i in range(31, -1, -1):
                bit = (num >> i) & 1
                node = node.setdefault(bit, {})
        max_xor = 0
        for num in nums:
            node = root
            cur = 0
            for i in range(31, -1, -1):
                bit = (num >> i) & 1
                toggled = 1 - bit
                if toggled in node:
                    cur |= (1 << i)
                    node = node[toggled]
                else:
                    node = node.get(bit, {})
            max_xor = max(max_xor, cur)
        return max_xor`,
      javascript: `class Solution {
    findMaximumXOR(nums) {
        const root = {};
        for (const num of nums) {
            let node = root;
            for (let i = 31; i >= 0; i--) {
                const bit = (num >> i) & 1;
                if (!node[bit]) node[bit] = {};
                node = node[bit];
            }
        }
        let maxXor = 0;
        for (const num of nums) {
            let node = root;
            let cur = 0;
            for (let i = 31; i >= 0; i--) {
                const bit = (num >> i) & 1;
                const toggled = 1 - bit;
                if (node[toggled]) {
                    cur |= (1 << i);
                    node = node[toggled];
                } else if (node[bit]) {
                    node = node[bit];
                }
            }
            maxXor = Math.max(maxXor, cur);
        }
        return maxXor;
    }
}`,
    },
    editorial: {
      approach: 'Binary Bit Trie Greedy Opposite Traversal.',
      algorithm: 'Greedily descend opposite bit in 0-1 Trie from MSB to LSB.',
      timeComplexity: 'O(32 * N)',
      spaceComplexity: 'O(32 * N)',
      content: 'Standard 0-1 Trie maximum XOR algorithm.',
      referenceCode: `if toggled in node: cur |= (1 << i); node = node[toggled]`,
    },
    tags: ['Bit Manipulation', 'Trie', 'Array'],
    testCases: [
      { input: `[3,10,5,25,2,8]`, expectedOutput: `28`, isHidden: false, order: 0 },
      { input: `[14,70,53,83,49,91,36,80,92,51,66,70]`, expectedOutput: `127`, isHidden: false, order: 1 },
      { input: `[0]`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Bitwise XOR of All Pairings Matrix Product',
    slug: 'bitwise-xor-of-all-pairings-matrix-product',
    description: `You are given two 0-indexed arrays, \`nums1\` and \`nums2\`, consisting of non-negative integers. There exists another array, \`nums3\`, which contains the bitwise XOR of all pairings of integers between \`nums1\` and \`nums2\` (every integer in \`nums1\` is paired with every integer in \`nums2\` exactly once). Return the bitwise XOR of all integers in \`nums3\`.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums1.length, nums2.length <= 10^5, 0 <= nums1[i], nums2[i] <= 10^9`,
    inputFormat: `nums1, nums2`,
    outputFormat: `Bitwise XOR integer.`,
    sampleInput: `[2,1,3], [10,2,5,0]`,
    sampleOutput: `13`,
    points: 100,
    hints: ['If len(nums2) is odd, every element in nums1 contributes once. If len(nums1) is odd, every element in nums2 contributes once.'],
    codeTemplates: {
      python: `class Solution:\n    def xorAllNums(self, nums1: list, nums2: list) -> int:\n        pass`,
      javascript: `class Solution {\n    xorAllNums(nums1, nums2) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def xorAllNums(self, nums1: list, nums2: list) -> int:
        ans = 0
        if len(nums2) % 2 != 0:
            for x in nums1: ans ^= x
        if len(nums1) % 2 != 0:
            for x in nums2: ans ^= x
        return ans`,
      javascript: `class Solution {
    xorAllNums(nums1, nums2) {
        let ans = 0;
        if (nums2.length % 2 !== 0) {
            for (const x of nums1) ans ^= x;
        }
        if (nums1.length % 2 !== 0) {
            for (const x of nums2) ans ^= x;
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Parity Multiplication Associativity.',
      algorithm: 'Each element in nums1 appears len(nums2) times. Elements appearing an even number of times cancel to 0.',
      timeComplexity: 'O(|nums1| + |nums2|)',
      spaceComplexity: 'O(1)',
      content: 'Standard parity-based XOR reduction.',
      referenceCode: `if len(nums2) % 2 != 0: ans ^= xor(nums1)`,
    },
    tags: ['Bit Manipulation', 'Array', 'Brainteaser'],
    testCases: [
      { input: `[2,1,3], [10,2,5,0]`, expectedOutput: `13`, isHidden: false, order: 0 },
      { input: `[1,2], [3,4]`, expectedOutput: `0`, isHidden: false, order: 1 },
      { input: `[5], [5]`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Complement of Base 10 Integer Inversion',
    slug: 'complement-of-base-10-integer-inversion',
    description: `The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation. Given an integer \`n\`, return its complement.`,
    difficulty: 'EASY',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= n < 10^9`,
    inputFormat: `n`,
    outputFormat: `Complement integer.`,
    sampleInput: `5`,
    sampleOutput: `2`,
    points: 50,
    hints: ['Create a bitmask of all 1s with the same bit-length as n, then return mask ^ n.'],
    codeTemplates: {
      python: `class Solution:\n    def bitwiseComplement(self, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    bitwiseComplement(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def bitwiseComplement(self, n: int) -> int:
        if n == 0: return 1
        mask = (1 << n.bit_length()) - 1
        return mask ^ n`,
      javascript: `class Solution {
    bitwiseComplement(n) {
        if (n === 0) return 1;
        const bitLen = n.toString(2).length;
        const mask = (1 << bitLen) - 1;
        return mask ^ n;
    }
}`,
    },
    editorial: {
      approach: 'Full Ones Bitmask XOR.',
      algorithm: 'Flip bits by XORing with full (1 << length) - 1 mask.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      content: 'Standard bitwise complement calculation.',
      referenceCode: `mask = (1 << n.bit_length()) - 1; return mask ^ n`,
    },
    tags: ['Bit Manipulation'],
    testCases: [
      { input: `5`, expectedOutput: `2`, isHidden: false, order: 0 },
      { input: `7`, expectedOutput: `0`, isHidden: false, order: 1 },
      { input: `10`, expectedOutput: `5`, isHidden: true, order: 2 },
    ],
  },
];

writePack('pack-500-part-j.ts', 'pack500PartJDefs', problemsJ);
