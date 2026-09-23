import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack500PartJDefs: ProblemDef[] = [
  {
    "title": "Linear Basis XOR Maximum Subsequence",
    "slug": "linear-basis-xor-maximum-subsequence",
    "description": "Given an array of $N$ non-negative integers, compute the maximum XOR sum attainable by choosing any subset of the array using Gaussian Elimination over GF(2) (Linear Basis).",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= N <= 10^5, 0 <= nums[i] <= 10^18",
    "inputFormat": "nums",
    "outputFormat": "Maximum possible subset XOR sum.",
    "sampleInput": "[12, 15, 7]",
    "sampleOutput": "15",
    "points": 200,
    "hints": [
      "Insert each number into a 64-bit basis. After building the basis, greedily maximize the XOR accumulator from high bit to low bit."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def maxXorSubset(self, nums: list) -> int:\n        pass",
      "javascript": "class Solution {\n    maxXorSubset(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def maxXorSubset(self, nums: list) -> int:\n        basis = [0] * 64\n        for x in nums:\n            for i in range(63, -1, -1):\n                if (x >> i) & 1:\n                    if not basis[i]:\n                        basis[i] = x\n                        break\n                    x ^= basis[i]\n        ans = 0\n        for i in range(63, -1, -1):\n            if (ans ^ basis[i]) > ans:\n                ans ^= basis[i]\n        return ans",
      "javascript": "class Solution {\n    maxXorSubset(nums) {\n        const basis = Array(64).fill(BigInt(0));\n        for (const n of nums) {\n            let x = BigInt(n);\n            for (let i = BigInt(63); i >= BigInt(0); i--) {\n                if ((x >> i) & BigInt(1)) {\n                    if (basis[Number(i)] === BigInt(0)) {\n                        basis[Number(i)] = x;\n                        break;\n                    }\n                    x ^= basis[Number(i)];\n                }\n            }\n        }\n        let ans = BigInt(0);\n        for (let i = BigInt(63); i >= BigInt(0); i--) {\n            if ((ans ^ basis[Number(i)]) > ans) {\n                ans ^= basis[Number(i)];\n            }\n        }\n        return Number(ans);\n    }\n}"
    },
    "editorial": {
      "approach": "Gaussian Elimination over GF(2) (Linear Basis).",
      "algorithm": "Represent numbers as vector space over GF(2). Maximum XOR query takes O(B) where B is bit count.",
      "timeComplexity": "O(N * 64)",
      "spaceComplexity": "O(64)",
      "content": "Standard linear basis construction for XOR maximization.",
      "referenceCode": "if (ans ^ basis[i]) > ans: ans ^= basis[i]"
    },
    "tags": [
      "Bit Manipulation",
      "Math",
      "Linear Basis",
      "Greedy"
    ],
    "testCases": [
      {
        "input": "[12, 15, 7]",
        "expectedOutput": "15",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1, 2, 4, 8]",
        "expectedOutput": "15",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[0, 0, 0]",
        "expectedOutput": "0",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Count Triplets That Can Form Two Arrays of Equal XOR",
    "slug": "count-triplets-that-can-form-two-arrays-of-equal-xor",
    "description": "Given an array of integers `arr`. We want to select three indices `i`, `j` and `k` where $0 \\le i < j \\le k < arr.length$. Such that $a = arr[i] \\oplus \\dots \\oplus arr[j - 1]$ and $b = arr[j] \\oplus \\dots \\oplus arr[k]$. Return the number of triplets where $a == b$.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= arr.length <= 300, 1 <= arr[i] <= 10^8",
    "inputFormat": "arr",
    "outputFormat": "Number of valid triplets.",
    "sampleInput": "[2,3,1,6,7]",
    "sampleOutput": "4",
    "points": 100,
    "hints": [
      "a == b is equivalent to prefix[i] == prefix[k+1]. Any j between i+1 and k is valid."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def countTriplets(self, arr: list) -> int:\n        pass",
      "javascript": "class Solution {\n    countTriplets(arr) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def countTriplets(self, arr: list) -> int:\n        n = len(arr)\n        prefix = [0] * (n + 1)\n        for i in range(n):\n            prefix[i + 1] = prefix[i] ^ arr[i]\n        ans = 0\n        for i in range(n):\n            for k in range(i + 1, n):\n                if prefix[i] == prefix[k + 1]:\n                    ans += k - i\n        return ans",
      "javascript": "class Solution {\n    countTriplets(arr) {\n        const n = arr.length;\n        const prefix = Array(n + 1).fill(0);\n        for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] ^ arr[i];\n        let ans = 0;\n        for (let i = 0; i < n; i++) {\n            for (let k = i + 1; k < n; k++) {\n                if (prefix[i] === prefix[k + 1]) {\n                    ans += k - i;\n                }\n            }\n        }\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "Prefix XOR Equality Equivalence.",
      "algorithm": "a == b iff prefix[i] ^ prefix[k+1] == 0, contributing (k - i) choices of j.",
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(N)",
      "content": "Standard XOR prefix triplet counting.",
      "referenceCode": "if prefix[i] == prefix[k + 1]: ans += k - i"
    },
    "tags": [
      "Bit Manipulation",
      "Prefix Sum",
      "Array"
    ],
    "testCases": [
      {
        "input": "[2,3,1,6,7]",
        "expectedOutput": "4",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1,1,1,1,1]",
        "expectedOutput": "10",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[2,3]",
        "expectedOutput": "0",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Find the Longest Substring Containing Vowels in Even Counts",
    "slug": "find-the-longest-substring-containing-vowels-in-even-counts",
    "description": "Given the string `s`, return the size of the longest substring containing each vowel 'a', 'e', 'i', 'o', 'u' an even number of times.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= s.length <= 5 * 10^5",
    "inputFormat": "s",
    "outputFormat": "Length integer.",
    "sampleInput": "\"eleetminicoworoep\"",
    "sampleOutput": "13",
    "points": 150,
    "hints": [
      "Represent vowel parity state with a 5-bit mask and store first seen index of each mask."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def findTheLongestSubstring(self, s: str) -> int:\n        pass",
      "javascript": "class Solution {\n    findTheLongestSubstring(s) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def findTheLongestSubstring(self, s: str) -> int:\n        vowels = {'a': 0, 'e': 1, 'i': 2, 'o': 3, 'u': 4}\n        first = {0: -1}\n        mask = 0\n        ans = 0\n        for i, ch in enumerate(s):\n            if ch in vowels:\n                mask ^= (1 << vowels[ch])\n            if mask in first:\n                ans = max(ans, i - first[mask])\n            else:\n                first[mask] = i\n        return ans",
      "javascript": "class Solution {\n    findTheLongestSubstring(s) {\n        const vowels = { a: 0, e: 1, i: 2, o: 3, u: 4 };\n        const first = new Map();\n        first.set(0, -1);\n        let mask = 0, ans = 0;\n        for (let i = 0; i < s.length; i++) {\n            const ch = s[i];\n            if (vowels[ch] !== undefined) {\n                mask ^= (1 << vowels[ch]);\n            }\n            if (first.has(mask)) {\n                ans = Math.max(ans, i - first.get(mask));\n            } else {\n                first.set(mask, i);\n            }\n        }\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "5-Bit Parity State Hash Map.",
      "algorithm": "Parity state flips on vowels; distance between identical parity states has even vowel counts.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(32) = O(1)",
      "content": "Standard bitmask parity prefix tracking.",
      "referenceCode": "ans = max(ans, i - first[mask])"
    },
    "tags": [
      "Bit Manipulation",
      "Hash Table",
      "String",
      "Prefix Sum"
    ],
    "testCases": [
      {
        "input": "\"eleetminicoworoep\"",
        "expectedOutput": "13",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"leetcodeisgreat\"",
        "expectedOutput": "5",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"bcbcbc\"",
        "expectedOutput": "6",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Minimum Flips to Make a OR b Equal to c",
    "slug": "minimum-flips-to-make-a-or-b-equal-to-c",
    "description": "Given 3 positive numbers `a`, `b` and `c`. Return the minimum flips required in some bits of `a` and `b` to make `(a OR b == c)`.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= a, b, c <= 10^9",
    "inputFormat": "a, b, c",
    "outputFormat": "Minimum flips count.",
    "sampleInput": "2, 6, 5",
    "sampleOutput": "3",
    "points": 100,
    "hints": [
      "Examine each bit position individually. If bit of c is 0, both bits in a and b must be flipped to 0."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def minFlips(self, a: int, b: int, c: int) -> int:\n        pass",
      "javascript": "class Solution {\n    minFlips(a, b, c) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def minFlips(self, a: int, b: int, c: int) -> int:\n        flips = 0\n        for i in range(32):\n            ba = (a >> i) & 1\n            bb = (b >> i) & 1\n            bc = (c >> i) & 1\n            if bc == 0:\n                flips += ba + bb\n            else:\n                if ba == 0 and bb == 0:\n                    flips += 1\n        return flips",
      "javascript": "class Solution {\n    minFlips(a, b, c) {\n        let flips = 0;\n        for (let i = 0; i < 32; i++) {\n            const ba = (a >> i) & 1;\n            const bb = (b >> i) & 1;\n            const bc = (c >> i) & 1;\n            if (bc === 0) {\n                flips += ba + bb;\n            } else {\n                if (ba === 0 && bb === 0) flips += 1;\n            }\n        }\n        return flips;\n    }\n}"
    },
    "editorial": {
      "approach": "Bitwise Column Evaluation.",
      "algorithm": "Evaluate 32 bit planes independently.",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "content": "Standard bitwise operation manipulation.",
      "referenceCode": "if bc == 0: flips += ba + bb else: flips += int(ba == 0 and bb == 0)"
    },
    "tags": [
      "Bit Manipulation"
    ],
    "testCases": [
      {
        "input": "2, 6, 5",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "4, 2, 7",
        "expectedOutput": "1",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "1, 2, 3",
        "expectedOutput": "0",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Single Number II Three Times Counting",
    "slug": "single-number-ii-three-times-counting",
    "description": "Given an integer array `nums` where every element appears three times except for one, which appears exactly once. Find the single element and return it in $O(N)$ time and $O(1)$ space.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 3 * 10^4, -2^31 <= nums[i] <= 2^31 - 1",
    "inputFormat": "nums",
    "outputFormat": "Single integer.",
    "sampleInput": "[2,2,3,2]",
    "sampleOutput": "3",
    "points": 100,
    "hints": [
      "Count the sum of bits at each position modulo 3, or use two bitmasks (ones, twos) as a modulo 3 state counter."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def singleNumber(self, nums: list) -> int:\n        pass",
      "javascript": "class Solution {\n    singleNumber(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def singleNumber(self, nums: list) -> int:\n        ones, twos = 0, 0\n        for x in nums:\n            ones = (ones ^ x) & ~twos\n            twos = (twos ^ x) & ~ones\n        return ones",
      "javascript": "class Solution {\n    singleNumber(nums) {\n        let ones = 0, twos = 0;\n        for (const x of nums) {\n            ones = (ones ^ x) & ~twos;\n            twos = (twos ^ x) & ~ones;\n        }\n        return ones;\n    }\n}"
    },
    "editorial": {
      "approach": "Modulo 3 Digital Logic Counter.",
      "algorithm": "Two bit variables track transition state modulo 3: (0,0) -> (1,0) -> (0,1) -> (0,0).",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "content": "Standard Karnaugh map bitwise counter.",
      "referenceCode": "ones = (ones ^ x) & ~twos; twos = (twos ^ x) & ~ones"
    },
    "tags": [
      "Bit Manipulation",
      "Array"
    ],
    "testCases": [
      {
        "input": "[2,2,3,2]",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[0,1,0,1,0,1,99]",
        "expectedOutput": "99",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[-2,-2,1,-2]",
        "expectedOutput": "1",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Total Hamming Distance Between All Pairs",
    "slug": "total-hamming-distance-between-all-pairs",
    "description": "The Hamming distance between two integers is the number of positions at which the corresponding bits are different. Given an integer array `nums`, return the sum of Hamming distances between all the pairs of the integers in `nums`.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 10^4, 0 <= nums[i] <= 10^9",
    "inputFormat": "nums",
    "outputFormat": "Total hamming distance sum.",
    "sampleInput": "[4,14,2]",
    "sampleOutput": "6",
    "points": 100,
    "hints": [
      "Count number of 1s (k) at bit position i; the contribution is k * (n - k)."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def totalHammingDistance(self, nums: list) -> int:\n        pass",
      "javascript": "class Solution {\n    totalHammingDistance(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def totalHammingDistance(self, nums: list) -> int:\n        n = len(nums)\n        ans = 0\n        for i in range(32):\n            ones = sum((x >> i) & 1 for x in nums)\n            ans += ones * (n - ones)\n        return ans",
      "javascript": "class Solution {\n    totalHammingDistance(nums) {\n        const n = nums.length;\n        let ans = 0;\n        for (let i = 0; i < 32; i++) {\n            let ones = 0;\n            for (const x of nums) {\n                if ((x >> i) & 1) ones++;\n            }\n            ans += ones * (n - ones);\n        }\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "Bit-by-Bit Combinatorial Contribution.",
      "algorithm": "Each bit plane contributes ones * zeros to the total distance.",
      "timeComplexity": "O(32 * N)",
      "spaceComplexity": "O(1)",
      "content": "Standard pair distance sum optimization.",
      "referenceCode": "ans += ones * (n - ones)"
    },
    "tags": [
      "Bit Manipulation",
      "Math",
      "Array"
    ],
    "testCases": [
      {
        "input": "[4,14,2]",
        "expectedOutput": "6",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[4,14,4]",
        "expectedOutput": "4",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1]",
        "expectedOutput": "0",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Repeated DNA Sequences 10-Letter Rolling Mask",
    "slug": "repeated-dna-sequences-10-letter-rolling-mask",
    "description": "The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'. Given a string `s` that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule in lexicographical order.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= s.length <= 10^5, s[i] is 'A', 'C', 'G', or 'T'",
    "inputFormat": "s",
    "outputFormat": "Sorted list of repeated 10-character DNA strings.",
    "sampleInput": "\"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"",
    "sampleOutput": "[\"AAAAACCCCC\",\"CCCCCAAAAA\"]",
    "points": 100,
    "hints": [
      "Encode each 10-mer into a 20-bit integer using 2 bits per base."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def findRepeatedDnaSequences(self, s: str) -> list:\n        pass",
      "javascript": "class Solution {\n    findRepeatedDnaSequences(s) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def findRepeatedDnaSequences(self, s: str) -> list:\n        if len(s) < 10: return []\n        to_int = {'A': 0, 'C': 1, 'G': 2, 'T': 3}\n        seen = set()\n        res = set()\n        mask = 0\n        for i in range(9):\n            mask = (mask << 2) | to_int[s[i]]\n        for i in range(9, len(s)):\n            mask = ((mask << 2) & 0xFFFFF) | to_int[s[i]]\n            if mask in seen:\n                res.add(s[i-9:i+1])\n            else:\n                seen.add(mask)\n        return sorted(list(res))",
      "javascript": "class Solution {\n    findRepeatedDnaSequences(s) {\n        if (s.length < 10) return [];\n        const toInt = { A: 0, C: 1, G: 2, T: 3 };\n        const seen = new Set();\n        const res = new Set();\n        let mask = 0;\n        for (let i = 0; i < 9; i++) mask = (mask << 2) | toInt[s[i]];\n        for (let i = 9; i < s.length; i++) {\n            mask = ((mask << 2) & 0xFFFFF) | toInt[s[i]];\n            if (seen.has(mask)) {\n                res.add(s.slice(i - 9, i + 1));\n            } else {\n                seen.add(mask);\n            }\n        }\n        return Array.from(res).sort();\n    }\n}"
    },
    "editorial": {
      "approach": "2-Bit Base 20-Bit Rolling Mask.",
      "algorithm": "Constant-time 20-bit sliding window hash computation.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Standard bitwise rolling hash on DNA characters.",
      "referenceCode": "mask = ((mask << 2) & 0xFFFFF) | to_int[s[i]]"
    },
    "tags": [
      "Bit Manipulation",
      "Hash Table",
      "String",
      "Sliding Window"
    ],
    "testCases": [
      {
        "input": "\"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"",
        "expectedOutput": "[\"AAAAACCCCC\",\"CCCCCAAAAA\"]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"AAAAAAAAAAAAA\"",
        "expectedOutput": "[\"AAAAAAAAAA\"]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"A\"",
        "expectedOutput": "[]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Bitwise AND of Numbers Range Query",
    "slug": "bitwise-and-of-numbers-range-query",
    "description": "Given two integers `left` and `right` that represent the range `[left, right]`, return the bitwise AND of all numbers in this range, inclusive.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "0 <= left <= right <= 2^31 - 1",
    "inputFormat": "left, right",
    "outputFormat": "Bitwise AND integer.",
    "sampleInput": "5, 7",
    "sampleOutput": "4",
    "points": 100,
    "hints": [
      "The bitwise AND of a range is simply the common binary prefix of left and right."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def rangeBitwiseAnd(self, left: int, right: int) -> int:\n        pass",
      "javascript": "class Solution {\n    rangeBitwiseAnd(left, right) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def rangeBitwiseAnd(self, left: int, right: int) -> int:\n        shift = 0\n        while left < right:\n            left >>= 1\n            right >>= 1\n            shift += 1\n        return left << shift",
      "javascript": "class Solution {\n    rangeBitwiseAnd(left, right) {\n        let shift = 0;\n        while (left < right) {\n            left >>= 1;\n            right >>= 1;\n            shift++;\n        }\n        return left << shift;\n    }\n}"
    },
    "editorial": {
      "approach": "Common Binary Prefix Finding.",
      "algorithm": "Right-shift both endpoints until they match to isolate common prefix.",
      "timeComplexity": "O(log(Right))",
      "spaceComplexity": "O(1)",
      "content": "Standard range bitwise AND reduction.",
      "referenceCode": "while left < right: left >>= 1; right >>= 1; shift += 1"
    },
    "tags": [
      "Bit Manipulation"
    ],
    "testCases": [
      {
        "input": "5, 7",
        "expectedOutput": "4",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "0, 0",
        "expectedOutput": "0",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "1, 2147483647",
        "expectedOutput": "0",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Single Number III Two Elements Appearing Once",
    "slug": "single-number-iii-two-elements-appearing-once",
    "description": "Given an integer array `nums`, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once in sorted order.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "2 <= nums.length <= 30000, -2^31 <= nums[i] <= 2^31 - 1",
    "inputFormat": "nums",
    "outputFormat": "Two elements in ascending sorted order.",
    "sampleInput": "[1,2,1,3,2,5]",
    "sampleOutput": "[3,5]",
    "points": 100,
    "hints": [
      "XOR all elements to get a ^ b. Find lowest set bit (diff = xor & -xor) to partition array into two groups."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def singleNumber(self, nums: list) -> list:\n        pass",
      "javascript": "class Solution {\n    singleNumber(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def singleNumber(self, nums: list) -> list:\n        xor = 0\n        for x in nums: xor ^= x\n        diff = xor & (-xor)\n        a, b = 0, 0\n        for x in nums:\n            if x & diff:\n                a ^= x\n            else:\n                b ^= x\n        return sorted([a, b])",
      "javascript": "class Solution {\n    singleNumber(nums) {\n        let xor = 0;\n        for (const x of nums) xor ^= x;\n        const diff = xor & (-xor);\n        let a = 0, b = 0;\n        for (const x of nums) {\n            if (x & diff) a ^= x;\n            else b ^= x;\n        }\n        return [a, b].sort((x, y) => x - y);\n    }\n}"
    },
    "editorial": {
      "approach": "Lowest Differing Bit Partitioning.",
      "algorithm": "Use lowest set bit of XOR product to divide elements into two disjoint single-element XOR buckets.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "content": "Standard single number III partitioning.",
      "referenceCode": "diff = xor & (-xor)"
    },
    "tags": [
      "Bit Manipulation",
      "Array"
    ],
    "testCases": [
      {
        "input": "[1,2,1,3,2,5]",
        "expectedOutput": "[3,5]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[-1,0]",
        "expectedOutput": "[-1,0]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[0,1]",
        "expectedOutput": "[0,1]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Number of Valid Words for Each Puzzle Bitmask",
    "slug": "number-of-valid-words-for-each-puzzle-bitmask",
    "description": "With respect to a given `puzzle` string, a `word` is valid if: `word` contains the first letter of `puzzle`, and every letter in `word` is in `puzzle`. Given an array of `words` and an array of `puzzles`, return an array `answer`, where `answer[i]` is the number of words in the given word list `words` that is valid with respect to the puzzle `puzzles[i]`.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "words.length <= 10^5, puzzles.length <= 10^4, puzzles[i].length == 7",
    "inputFormat": "words, puzzles",
    "outputFormat": "List of valid word counts per puzzle.",
    "sampleInput": "[\"aaaa\",\"asas\",\"able\",\"ability\",\"actt\",\"actor\",\"access\"], [\"aboveyz\",\"abrodyz\",\"abslute\",\"absoryz\",\"actresz\",\"gaswxyz\"]",
    "sampleOutput": "[1,1,3,2,2,0]",
    "points": 200,
    "hints": [
      "Count frequency of word bitmasks. For each puzzle, iterate through all submasks of its 7 letters."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def findNumOfValidWords(self, words: list, puzzles: list) -> list:\n        pass",
      "javascript": "class Solution {\n    findNumOfValidWords(words, puzzles) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def findNumOfValidWords(self, words: list, puzzles: list) -> list:\n        import collections\n        count = collections.defaultdict(int)\n        for w in words:\n            m = 0\n            for ch in w: m |= (1 << (ord(ch) - 97))\n            count[m] += 1\n        res = []\n        for p in puzzles:\n            first_bit = 1 << (ord(p[0]) - 97)\n            mask = 0\n            for ch in p: mask |= (1 << (ord(ch) - 97))\n            sub = mask\n            total = 0\n            while sub > 0:\n                if sub & first_bit:\n                    total += count[sub]\n                sub = (sub - 1) & mask\n            res.append(total)\n        return res",
      "javascript": "class Solution {\n    findNumOfValidWords(words, puzzles) {\n        const count = new Map();\n        for (const w of words) {\n            let m = 0;\n            for (let i = 0; i < w.length; i++) m |= (1 << (w.charCodeAt(i) - 97));\n            count.set(m, (count.get(m) || 0) + 1);\n        }\n        return puzzles.map(p => {\n            const firstBit = 1 << (p.charCodeAt(0) - 97);\n            let mask = 0;\n            for (let i = 0; i < p.length; i++) mask |= (1 << (p.charCodeAt(i) - 97));\n            let sub = mask;\n            let total = 0;\n            while (sub > 0) {\n                if (sub & firstBit) total += (count.get(sub) || 0);\n                sub = (sub - 1) & mask;\n            }\n            return total;\n        });\n    }\n}"
    },
    "editorial": {
      "approach": "Submask Enumeration via (sub - 1) & mask.",
      "algorithm": "Iterate all 2^7 = 128 submasks per puzzle and accumulate word mask frequencies.",
      "timeComplexity": "O(Sum(|Words|) + Puzzles * 2^7)",
      "spaceComplexity": "O(Distinct Word Masks)",
      "content": "Standard submask enumeration trick.",
      "referenceCode": "sub = (sub - 1) & mask"
    },
    "tags": [
      "Bit Manipulation",
      "Trie",
      "Hash Table",
      "String"
    ],
    "testCases": [
      {
        "input": "[\"aaaa\",\"asas\",\"able\",\"ability\",\"actt\",\"actor\",\"access\"], [\"aboveyz\",\"abrodyz\",\"abslute\",\"absoryz\",\"actresz\",\"gaswxyz\"]",
        "expectedOutput": "[1,1,3,2,2,0]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[\"apple\",\"pleas\",\"please\"], [\"aelwxyz\",\"aelpxyz\",\"aelpsxy\",\"saelpxy\",\"xaelpsy\"]",
        "expectedOutput": "[0,1,3,2,0]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[\"a\"], [\"abcdefg\"]",
        "expectedOutput": "[1]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Smallest Sufficient Team Bitmask DP",
    "slug": "smallest-sufficient-team-bitmask-dp",
    "description": "In a project, you have a list of required skills `req_skills`, and a list of `people`. The `i`-th person `people[i]` contains a list of skills that the person has. Return any sufficient team of the smallest possible size (represented by the index of each person).",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= req_skills.length <= 16, 1 <= people.length <= 60",
    "inputFormat": "req_skills, people",
    "outputFormat": "Sorted list of person indices.",
    "sampleInput": "[\"java\",\"nodejs\",\"reactjs\"], [[\"java\"],[\"nodejs\"],[\"nodejs\",\"reactjs\"]]",
    "sampleOutput": "[0, 2]",
    "points": 200,
    "hints": [
      "Use DP where dp[mask] stores the smallest team covering skill bitmask."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def smallestSufficientTeam(self, req_skills: list, people: list) -> list:\n        pass",
      "javascript": "class Solution {\n    smallestSufficientTeam(req_skills, people) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def smallestSufficientTeam(self, req_skills: list, people: list) -> list:\n        n = len(req_skills)\n        skill_idx = {s: i for i, s in enumerate(req_skills)}\n        dp = {0: []}\n        for i, p_skills in enumerate(people):\n            cur_mask = 0\n            for s in p_skills:\n                if s in skill_idx:\n                    cur_mask |= (1 << skill_idx[s])\n            if not cur_mask: continue\n            for prev_mask, team in list(dp.items()):\n                new_mask = prev_mask | cur_mask\n                if new_mask not in dp or len(team) + 1 < len(dp[new_mask]):\n                    dp[new_mask] = team + [i]\n        return sorted(dp[(1 << n) - 1])",
      "javascript": "class Solution {\n    smallestSufficientTeam(req_skills, people) {\n        const n = req_skills.length;\n        const skillIdx = new Map();\n        req_skills.forEach((s, i) => skillIdx.set(s, i));\n        const dp = new Map();\n        dp.set(0, []);\n        people.forEach((pSkills, i) => {\n            let curMask = 0;\n            for (const s of pSkills) {\n                if (skillIdx.has(s)) curMask |= (1 << skillIdx.get(s));\n            }\n            if (!curMask) return;\n            for (const [prevMask, team] of Array.from(dp.entries())) {\n                const newMask = prevMask | curMask;\n                if (!dp.has(newMask) || team.length + 1 < dp.get(newMask).length) {\n                    dp.set(newMask, [...team, i]);\n                }\n            }\n        });\n        return dp.get((1 << n) - 1).sort((a, b) => a - b);\n    }\n}"
    },
    "editorial": {
      "approach": "Exact Cover Bitmask Dynamic Programming.",
      "algorithm": "dp[mask] maintains optimal person index list achieving skill combination.",
      "timeComplexity": "O(People * 2^Skills)",
      "spaceComplexity": "O(2^Skills)",
      "content": "Standard bitmask exact cover DP.",
      "referenceCode": "if new_mask not in dp or len(team) + 1 < len(dp[new_mask]): dp[new_mask] = team + [i]"
    },
    "tags": [
      "Bit Manipulation",
      "Dynamic Programming",
      "Bitmask"
    ],
    "testCases": [
      {
        "input": "[\"java\",\"nodejs\",\"reactjs\"], [[\"java\"],[\"nodejs\"],[\"nodejs\",\"reactjs\"]]",
        "expectedOutput": "[0, 2]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[\"algorithms\",\"math\",\"java\",\"reactjs\",\"csharp\",\"aws\"], [[\"algorithms\",\"math\",\"java\"],[\"algorithms\",\"math\",\"reactjs\"],[\"java\",\"csharp\",\"aws\"],[\"reactjs\",\"csharp\"],[\"csharp\",\"math\"],[\"aws\",\"java\"]]",
        "expectedOutput": "[1, 2]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[\"a\"], [[\"a\"]]",
        "expectedOutput": "[0]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Subsets Power Set Generation via Bitmasks",
    "slug": "subsets-power-set-generation-via-bitmasks",
    "description": "Given an integer array `nums` of unique elements, return all possible subsets (the power set) generated by binary mask enumeration.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 10, -10 <= nums[i] <= 10",
    "inputFormat": "nums",
    "outputFormat": "List of subsets.",
    "sampleInput": "[1,2,3]",
    "sampleOutput": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
    "points": 100,
    "hints": [
      "Loop mask from 0 to 2^n - 1, including nums[i] if (mask >> i) & 1."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def subsets(self, nums: list) -> list:\n        pass",
      "javascript": "class Solution {\n    subsets(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def subsets(self, nums: list) -> list:\n        n = len(nums)\n        res = []\n        for mask in range(1 << n):\n            sub = [nums[i] for i in range(n) if (mask >> i) & 1]\n            res.append(sub)\n        return res",
      "javascript": "class Solution {\n    subsets(nums) {\n        const n = nums.length;\n        const res = [];\n        for (let mask = 0; mask < (1 << n); mask++) {\n            const sub = [];\n            for (let i = 0; i < n; i++) {\n                if ((mask >> i) & 1) sub.push(nums[i]);\n            }\n            res.push(sub);\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Direct Bitmask Indexing Power Set.",
      "algorithm": "Enumerate integer range 0..2^N-1 and test bit positions.",
      "timeComplexity": "O(N * 2^N)",
      "spaceComplexity": "O(N * 2^N)",
      "content": "Standard binary representation subset generator.",
      "referenceCode": "sub = [nums[i] for i in range(n) if (mask >> i) & 1]"
    },
    "tags": [
      "Bit Manipulation",
      "Array",
      "Backtracking"
    ],
    "testCases": [
      {
        "input": "[1,2,3]",
        "expectedOutput": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[0]",
        "expectedOutput": "[[],[0]]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[1,2]",
        "expectedOutput": "[[],[1],[2],[1,2]]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Counting Bits Popcount Table Generation",
    "slug": "counting-bits-popcount-table-generation",
    "description": "Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` ($0 \\le i \\le n$), `ans[i]` is the number of 1's in the binary representation of `i` computed in $O(N)$ time.",
    "difficulty": Difficulty.EASY,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "0 <= n <= 10^5",
    "inputFormat": "n",
    "outputFormat": "Array of popcounts from 0 to n.",
    "sampleInput": "5",
    "sampleOutput": "[0,1,1,2,1,2]",
    "points": 50,
    "hints": [
      "dp[i] = dp[i >> 1] + (i & 1)."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def countBits(self, n: int) -> list:\n        pass",
      "javascript": "class Solution {\n    countBits(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def countBits(self, n: int) -> list:\n        dp = [0] * (n + 1)\n        for i in range(1, n + 1):\n            dp[i] = dp[i >> 1] + (i & 1)\n        return dp",
      "javascript": "class Solution {\n    countBits(n) {\n        const dp = Array(n + 1).fill(0);\n        for (let i = 1; i <= n; i++) {\n            dp[i] = dp[i >> 1] + (i & 1);\n        }\n        return dp;\n    }\n}"
    },
    "editorial": {
      "approach": "Linear Bit Shift DP.",
      "algorithm": "Relate i to i >> 1 with least significant bit addition in O(1) per integer.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Standard popcount linear DP recurrence.",
      "referenceCode": "dp[i] = dp[i >> 1] + (i & 1)"
    },
    "tags": [
      "Bit Manipulation",
      "Dynamic Programming"
    ],
    "testCases": [
      {
        "input": "5",
        "expectedOutput": "[0,1,1,2,1,2]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "2",
        "expectedOutput": "[0,1,1]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "0",
        "expectedOutput": "[0]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Reverse Bits 32-Bit Integer Mirror",
    "slug": "reverse-bits-32-bit-integer-mirror",
    "description": "Reverse bits of a given 32 bits unsigned integer.",
    "difficulty": Difficulty.EASY,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "0 <= n <= 2^32 - 1",
    "inputFormat": "n",
    "outputFormat": "Reversed 32-bit integer.",
    "sampleInput": "43261596",
    "sampleOutput": "964176192",
    "points": 50,
    "hints": [
      "Extract least significant bit of n and shift into result for 32 iterations."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def reverseBits(self, n: int) -> int:\n        pass",
      "javascript": "class Solution {\n    reverseBits(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def reverseBits(self, n: int) -> int:\n        ans = 0\n        for _ in range(32):\n            ans = (ans << 1) | (n & 1)\n            n >>= 1\n        return ans",
      "javascript": "class Solution {\n    reverseBits(n) {\n        let ans = 0;\n        for (let i = 0; i < 32; i++) {\n            ans = (ans * 2) + (n % 2);\n            n = Math.floor(n / 2);\n        }\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "32-Step Bit Shift Accumulation.",
      "algorithm": "Directly reverse bit stream by push/pop shifts.",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "content": "Standard 32-bit integer bit reversal.",
      "referenceCode": "ans = (ans << 1) | (n & 1); n >>= 1"
    },
    "tags": [
      "Bit Manipulation"
    ],
    "testCases": [
      {
        "input": "43261596",
        "expectedOutput": "964176192",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "1",
        "expectedOutput": "2147483648",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "0",
        "expectedOutput": "0",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Power of Two Bitwise Checker",
    "slug": "power-of-two-bitwise-checker",
    "description": "Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.",
    "difficulty": Difficulty.EASY,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "-2^31 <= n <= 2^31 - 1",
    "inputFormat": "n",
    "outputFormat": "Boolean true/false.",
    "sampleInput": "16",
    "sampleOutput": "true",
    "points": 50,
    "hints": [
      "n > 0 and (n & (n - 1)) == 0."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def isPowerOfTwo(self, n: int) -> bool:\n        pass",
      "javascript": "class Solution {\n    isPowerOfTwo(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def isPowerOfTwo(self, n: int) -> bool:\n        return n > 0 and (n & (n - 1)) == 0",
      "javascript": "class Solution {\n    isPowerOfTwo(n) {\n        return n > 0 && (n & (n - 1)) === 0;\n    }\n}"
    },
    "editorial": {
      "approach": "Bitwise Low-Bit Clearing Invariant.",
      "algorithm": "Powers of two have exactly one bit set in binary representation.",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "content": "Standard power-of-two bitwise test.",
      "referenceCode": "return n > 0 and (n & (n - 1)) == 0"
    },
    "tags": [
      "Bit Manipulation",
      "Math"
    ],
    "testCases": [
      {
        "input": "16",
        "expectedOutput": "true",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "3",
        "expectedOutput": "false",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "1",
        "expectedOutput": "true",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Hamming Weight Number of 1 Bits",
    "slug": "hamming-weight-number-of-1-bits",
    "description": "Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).",
    "difficulty": Difficulty.EASY,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 2^31 - 1",
    "inputFormat": "n",
    "outputFormat": "Count of 1 bits.",
    "sampleInput": "11",
    "sampleOutput": "3",
    "points": 50,
    "hints": [
      "Brian Kernighan algorithm: while n > 0, n &= (n - 1) and increment count."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def hammingWeight(self, n: int) -> int:\n        pass",
      "javascript": "class Solution {\n    hammingWeight(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def hammingWeight(self, n: int) -> int:\n        count = 0\n        while n:\n            n &= (n - 1)\n            count += 1\n        return count",
      "javascript": "class Solution {\n    hammingWeight(n) {\n        let count = 0;\n        while (n > 0) {\n            n &= (n - 1);\n            count++;\n        }\n        return count;\n    }\n}"
    },
    "editorial": {
      "approach": "Brian Kernighan Bit Cleared Loop.",
      "algorithm": "n &= (n - 1) clears the lowest set bit in exactly O(Popcount) steps.",
      "timeComplexity": "O(Popcount)",
      "spaceComplexity": "O(1)",
      "content": "Standard popcount bit manipulation.",
      "referenceCode": "while n: n &= (n - 1); count += 1"
    },
    "tags": [
      "Bit Manipulation"
    ],
    "testCases": [
      {
        "input": "11",
        "expectedOutput": "3",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "128",
        "expectedOutput": "1",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "2147483645",
        "expectedOutput": "30",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Maximum XOR of Two Numbers in an Array Trie",
    "slug": "maximum-xor-of-two-numbers-in-an-array-trie",
    "description": "Given an integer array `nums`, return the maximum result of `nums[i] XOR nums[j]`, where $0 \\le i \\le j < n$.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 2 * 10^4, 0 <= nums[i] <= 2^31 - 1",
    "inputFormat": "nums",
    "outputFormat": "Maximum XOR integer.",
    "sampleInput": "[3,10,5,25,2,8]",
    "sampleOutput": "28",
    "points": 150,
    "hints": [
      "Insert bit representations of numbers into a Binary Trie and query maximum opposite branch at each bit."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def findMaximumXOR(self, nums: list) -> int:\n        pass",
      "javascript": "class Solution {\n    findMaximumXOR(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def findMaximumXOR(self, nums: list) -> int:\n        root = {}\n        for num in nums:\n            node = root\n            for i in range(31, -1, -1):\n                bit = (num >> i) & 1\n                node = node.setdefault(bit, {})\n        max_xor = 0\n        for num in nums:\n            node = root\n            cur = 0\n            for i in range(31, -1, -1):\n                bit = (num >> i) & 1\n                toggled = 1 - bit\n                if toggled in node:\n                    cur |= (1 << i)\n                    node = node[toggled]\n                else:\n                    node = node.get(bit, {})\n            max_xor = max(max_xor, cur)\n        return max_xor",
      "javascript": "class Solution {\n    findMaximumXOR(nums) {\n        const root = {};\n        for (const num of nums) {\n            let node = root;\n            for (let i = 31; i >= 0; i--) {\n                const bit = (num >> i) & 1;\n                if (!node[bit]) node[bit] = {};\n                node = node[bit];\n            }\n        }\n        let maxXor = 0;\n        for (const num of nums) {\n            let node = root;\n            let cur = 0;\n            for (let i = 31; i >= 0; i--) {\n                const bit = (num >> i) & 1;\n                const toggled = 1 - bit;\n                if (node[toggled]) {\n                    cur |= (1 << i);\n                    node = node[toggled];\n                } else if (node[bit]) {\n                    node = node[bit];\n                }\n            }\n            maxXor = Math.max(maxXor, cur);\n        }\n        return maxXor;\n    }\n}"
    },
    "editorial": {
      "approach": "Binary Bit Trie Greedy Opposite Traversal.",
      "algorithm": "Greedily descend opposite bit in 0-1 Trie from MSB to LSB.",
      "timeComplexity": "O(32 * N)",
      "spaceComplexity": "O(32 * N)",
      "content": "Standard 0-1 Trie maximum XOR algorithm.",
      "referenceCode": "if toggled in node: cur |= (1 << i); node = node[toggled]"
    },
    "tags": [
      "Bit Manipulation",
      "Trie",
      "Array"
    ],
    "testCases": [
      {
        "input": "[3,10,5,25,2,8]",
        "expectedOutput": "28",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[14,70,53,83,49,91,36,80,92,51,66,70]",
        "expectedOutput": "127",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[0]",
        "expectedOutput": "0",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Bitwise XOR of All Pairings Matrix Product",
    "slug": "bitwise-xor-of-all-pairings-matrix-product",
    "description": "You are given two 0-indexed arrays, `nums1` and `nums2`, consisting of non-negative integers. There exists another array, `nums3`, which contains the bitwise XOR of all pairings of integers between `nums1` and `nums2` (every integer in `nums1` is paired with every integer in `nums2` exactly once). Return the bitwise XOR of all integers in `nums3`.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums1.length, nums2.length <= 10^5, 0 <= nums1[i], nums2[i] <= 10^9",
    "inputFormat": "nums1, nums2",
    "outputFormat": "Bitwise XOR integer.",
    "sampleInput": "[2,1,3], [10,2,5,0]",
    "sampleOutput": "13",
    "points": 100,
    "hints": [
      "If len(nums2) is odd, every element in nums1 contributes once. If len(nums1) is odd, every element in nums2 contributes once."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def xorAllNums(self, nums1: list, nums2: list) -> int:\n        pass",
      "javascript": "class Solution {\n    xorAllNums(nums1, nums2) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def xorAllNums(self, nums1: list, nums2: list) -> int:\n        ans = 0\n        if len(nums2) % 2 != 0:\n            for x in nums1: ans ^= x\n        if len(nums1) % 2 != 0:\n            for x in nums2: ans ^= x\n        return ans",
      "javascript": "class Solution {\n    xorAllNums(nums1, nums2) {\n        let ans = 0;\n        if (nums2.length % 2 !== 0) {\n            for (const x of nums1) ans ^= x;\n        }\n        if (nums1.length % 2 !== 0) {\n            for (const x of nums2) ans ^= x;\n        }\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "Parity Multiplication Associativity.",
      "algorithm": "Each element in nums1 appears len(nums2) times. Elements appearing an even number of times cancel to 0.",
      "timeComplexity": "O(|nums1| + |nums2|)",
      "spaceComplexity": "O(1)",
      "content": "Standard parity-based XOR reduction.",
      "referenceCode": "if len(nums2) % 2 != 0: ans ^= xor(nums1)"
    },
    "tags": [
      "Bit Manipulation",
      "Array",
      "Brainteaser"
    ],
    "testCases": [
      {
        "input": "[2,1,3], [10,2,5,0]",
        "expectedOutput": "13",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1,2], [3,4]",
        "expectedOutput": "0",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[5], [5]",
        "expectedOutput": "0",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Complement of Base 10 Integer Inversion",
    "slug": "complement-of-base-10-integer-inversion",
    "description": "The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation. Given an integer `n`, return its complement.",
    "difficulty": Difficulty.EASY,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "0 <= n < 10^9",
    "inputFormat": "n",
    "outputFormat": "Complement integer.",
    "sampleInput": "5",
    "sampleOutput": "2",
    "points": 50,
    "hints": [
      "Create a bitmask of all 1s with the same bit-length as n, then return mask ^ n."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def bitwiseComplement(self, n: int) -> int:\n        pass",
      "javascript": "class Solution {\n    bitwiseComplement(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def bitwiseComplement(self, n: int) -> int:\n        if n == 0: return 1\n        mask = (1 << n.bit_length()) - 1\n        return mask ^ n",
      "javascript": "class Solution {\n    bitwiseComplement(n) {\n        if (n === 0) return 1;\n        const bitLen = n.toString(2).length;\n        const mask = (1 << bitLen) - 1;\n        return mask ^ n;\n    }\n}"
    },
    "editorial": {
      "approach": "Full Ones Bitmask XOR.",
      "algorithm": "Flip bits by XORing with full (1 << length) - 1 mask.",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "content": "Standard bitwise complement calculation.",
      "referenceCode": "mask = (1 << n.bit_length()) - 1; return mask ^ n"
    },
    "tags": [
      "Bit Manipulation"
    ],
    "testCases": [
      {
        "input": "5",
        "expectedOutput": "2",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "7",
        "expectedOutput": "0",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "10",
        "expectedOutput": "5",
        "isHidden": true,
        "order": 2
      }
    ]
  }
];
