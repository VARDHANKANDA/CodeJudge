import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack500PartADefs: ProblemDef[] = [
  // 1. Edit Distance with Variable Costs
  {
    title: 'Edit Distance with Variable Costs',
    slug: 'edit-distance-with-variable-costs',
    description: `Given two strings \`word1\` and \`word2\`, and costs for three operations: \`costIns\` (insertion), \`costDel\` (deletion), and \`costRep\` (replacement), return the minimum total cost to convert \`word1\` into \`word2\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= word1.length, word2.length <= 500\n1 <= costIns, costDel, costRep <= 100`,
    inputFormat: `word1, word2, costIns, costDel, costRep`,
    outputFormat: `An integer representing the minimum total conversion cost.`,
    sampleInput: `"horse", "ros", 1, 1, 1`,
    sampleOutput: `3`,
    points: 150,
    hints: [
      'Define dp[i][j] as the min cost to convert word1[0..i) to word2[0..j).',
      'If word1[i-1] == word2[j-1], no cost needed. Otherwise pick min(dp[i-1][j] + costDel, dp[i][j-1] + costIns, dp[i-1][j-1] + costRep).',
    ],
    codeTemplates: {
      python: `class Solution:\n    def minDistanceWithCosts(self, word1: str, word2: str, costIns: int, costDel: int, costRep: int) -> int:\n        pass`,
      javascript: `class Solution {\n    minDistanceWithCosts(word1, word2, costIns, costDel, costRep) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minDistanceWithCosts(self, word1: str, word2: str, costIns: int, costDel: int, costRep: int) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1): dp[i][0] = i * costDel
        for j in range(n + 1): dp[0][j] = j * costIns
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = min(dp[i - 1][j] + costDel, dp[i][j - 1] + costIns, dp[i - 1][j - 1] + costRep)
        return dp[m][n]`,
      javascript: `class Solution {
    minDistanceWithCosts(word1, word2, costIns, costDel, costRep) {
        const m = word1.length, n = word2.length;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) dp[i][0] = i * costDel;
        for (let j = 0; j <= n; j++) dp[0][j] = j * costIns;
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = Math.min(dp[i - 1][j] + costDel, dp[i][j - 1] + costIns, dp[i - 1][j - 1] + costRep);
            }
        }
        return dp[m][n];
    }
}`,
    },
    editorial: {
      approach: '2D Dynamic Programming with operation weighting.',
      algorithm: 'Transitions: if matching, dp[i][j] = dp[i-1][j-1]. Otherwise minimum of delete (i-1,j), insert (i,j-1), or replace (i-1,j-1) weighted by respective costs.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(M * N)',
      content: 'Standard Wagner-Fischer algorithm generalized to arbitrary integer operational weights.',
      referenceCode: `dp[i][j] = min(dp[i-1][j]+del, dp[i][j-1]+ins, dp[i-1][j-1]+rep)`,
    },
    tags: ['Dynamic Programming', 'String'],
    testCases: [
      { input: `"horse", "ros", 1, 1, 1`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `"intention", "execution", 2, 3, 4`, expectedOutput: `19`, isHidden: false, order: 1 },
      { input: `"", "abc", 5, 2, 10`, expectedOutput: `15`, isHidden: true, order: 2 },
      { input: `"abc", "", 5, 2, 10`, expectedOutput: `6`, isHidden: true, order: 3 },
      { input: `"same", "same", 10, 10, 10`, expectedOutput: `0`, isHidden: true, order: 4 },
    ],
  },

  // 2. Interleaving String Verification
  {
    title: 'Interleaving String Verification',
    slug: 'interleaving-string-verification',
    description: `Given strings \`s1\`, \`s2\`, and \`s3\`, return \`true\` if \`s3\` is formed by an interleaving of \`s1\` and \`s2\`, and \`false\` otherwise. An interleaving of two strings preserves the relative order of characters from both original strings.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= s1.length, s2.length <= 100\n0 <= s3.length <= 200`,
    inputFormat: `s1, s2, s3`,
    outputFormat: `Boolean true or false.`,
    sampleInput: `"aabcc", "dbbca", "aadbbcbcac"`,
    sampleOutput: `true`,
    points: 150,
    hints: [
      'If len(s1) + len(s2) != len(s3), return false immediately.',
      'Use dp[i][j] representing if s1[0..i) and s2[0..j) can interleave to form s3[0..i+j).',
    ],
    codeTemplates: {
      python: `class Solution:\n    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:\n        pass`,
      javascript: `class Solution {\n    isInterleave(s1, s2, s3) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        if len(s1) + len(s2) != len(s3): return False
        m, n = len(s1), len(s2)
        dp = [False] * (n + 1)
        dp[0] = True
        for j in range(1, n + 1): dp[j] = dp[j - 1] and s2[j - 1] == s3[j - 1]
        for i in range(1, m + 1):
            dp[0] = dp[0] and s1[i - 1] == s3[i - 1]
            for j in range(1, n + 1):
                dp[j] = (dp[j] and s1[i - 1] == s3[i + j - 1]) or (dp[j - 1] and s2[j - 1] == s3[i + j - 1])
        return dp[n]`,
      javascript: `class Solution {
    isInterleave(s1, s2, s3) {
        if (s1.length + s2.length !== s3.length) return false;
        const m = s1.length, n = s2.length;
        const dp = Array(n + 1).fill(false);
        dp[0] = true;
        for (let j = 1; j <= n; j++) dp[j] = dp[j - 1] && s2[j - 1] === s3[j - 1];
        for (let i = 1; i <= m; i++) {
            dp[0] = dp[0] && s1[i - 1] === s3[i - 1];
            for (let j = 1; j <= n; j++) {
                dp[j] = (dp[j] && s1[i - 1] === s3[i + j - 1]) || (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);
            }
        }
        return dp[n];
    }
}`,
    },
    editorial: {
      approach: 'Space-optimized 1D/2D Dynamic Programming.',
      algorithm: 'dp[i][j] is true if s1[i-1] matches s3[i+j-1] with dp[i-1][j] true, or s2[j-1] matches s3[i+j-1] with dp[i][j-1] true.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(N)',
      content: 'Using space rolling array reduces memory to O(min(M, N)).',
      referenceCode: `dp[j] = (dp[j] && s1[i-1]==s3[i+j-1]) || (dp[j-1] && s2[j-1]==s3[i+j-1])`,
    },
    tags: ['Dynamic Programming', 'String'],
    testCases: [
      { input: `"aabcc", "dbbca", "aadbbcbcac"`, expectedOutput: `true`, isHidden: false, order: 0 },
      { input: `"aabcc", "dbbca", "aadbbbaccc"`, expectedOutput: `false`, isHidden: false, order: 1 },
      { input: `"", "", ""`, expectedOutput: `true`, isHidden: true, order: 2 },
      { input: `"a", "b", "ab"`, expectedOutput: `true`, isHidden: true, order: 3 },
      { input: `"a", "b", "ba"`, expectedOutput: `true`, isHidden: true, order: 4 },
    ],
  },

  // 3. Count Vowels Permutation
  {
    title: 'Count Vowels Permutation',
    slug: 'count-vowels-permutation',
    description: `Given an integer \`n\`, your task is to count how many strings of length \`n\` can be formed under the following rules:
- Each character is a lower case vowel ('a', 'e', 'i', 'o', 'u').
- Each vowel 'a' may only be followed by an 'e'.
- Each vowel 'e' may only be followed by an 'a' or an 'i'.
- Each vowel 'i' may not be followed by another 'i'.
- Each vowel 'o' may only be followed by an 'i' or a 'u'.
- Each vowel 'u' may only be followed by an 'a'.
Return the answer modulo \`10^9 + 7\`.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 2 * 10^4`,
    inputFormat: `An integer n.`,
    outputFormat: `An integer representing the count of valid strings modulo 10^9 + 7.`,
    sampleInput: `1`,
    sampleOutput: `5`,
    points: 200,
    hints: [
      'Maintain count of strings ending in each of the 5 vowels.',
      'For length n+1, new_a = e + i + u, new_e = a + i, new_i = e + o, new_o = i, new_u = i + o.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def countVowelPermutation(self, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    countVowelPermutation(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def countVowelPermutation(self, n: int) -> int:
        MOD = 10**9 + 7
        a, e, i, o, u = 1, 1, 1, 1, 1
        for _ in range(n - 1):
            na = (e + i + u) % MOD
            ne = (a + i) % MOD
            ni = (e + o) % MOD
            no = i % MOD
            nu = (i + o) % MOD
            a, e, i, o, u = na, ne, ni, no, nu
        return (a + e + i + o + u) % MOD`,
      javascript: `class Solution {
    countVowelPermutation(n) {
        const MOD = 1000000007n;
        let a = 1n, e = 1n, i = 1n, o = 1n, u = 1n;
        for (let step = 1; step < n; step++) {
            const na = (e + i + u) % MOD;
            const ne = (a + i) % MOD;
            const ni = (e + o) % MOD;
            const no = i % MOD;
            const nu = (i + o) % MOD;
            a = na; e = ne; i = ni; o = no; u = nu;
        }
        return Number((a + e + i + o + u) % MOD);
    }
}`,
    },
    editorial: {
      approach: 'Linear State Transition Dynamic Programming.',
      algorithm: 'Each vowel transition forms a system of linear recurrences solved in O(N) time and O(1) space.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Can also be computed in O(log N) using 5x5 matrix exponentiation.',
      referenceCode: `a,e,i,o,u = (e+i+u)%MOD, (a+i)%MOD, (e+o)%MOD, i%MOD, (i+o)%MOD`,
    },
    tags: ['Dynamic Programming', 'Math'],
    testCases: [
      { input: `1`, expectedOutput: `5`, isHidden: false, order: 0 },
      { input: `2`, expectedOutput: `10`, isHidden: false, order: 1 },
      { input: `5`, expectedOutput: `68`, isHidden: false, order: 2 },
      { input: `144`, expectedOutput: `18208803`, isHidden: true, order: 3 },
      { input: `20000`, expectedOutput: `759959057`, isHidden: true, order: 4 },
    ],
  },

  // 4. Knight Dialer
  {
    title: 'Knight Dialer on Phone Keypad',
    slug: 'knight-dialer-on-phone-keypad',
    description: `The chess knight has a unique movement: two steps in one direction, then one step perpendicular. We place a knight on any numeric cell of a standard phone dialpad (0-9, excluding * and #). Given an integer \`n\`, return how many distinct phone numbers of length \`n\` you can dial, modulo \`10^9 + 7\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 5000`,
    inputFormat: `An integer n.`,
    outputFormat: `An integer representing distinct phone numbers modulo 10^9 + 7.`,
    sampleInput: `1`,
    sampleOutput: `10`,
    points: 150,
    hints: [
      'Map legal knight moves for each digit 0..9.',
      'Count paths of length n ending at each digit.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def knightDialer(self, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    knightDialer(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def knightDialer(self, n: int) -> int:
        if n == 1: return 10
        MOD = 10**9 + 7
        moves = [[4,6],[6,8],[7,9],[4,8],[0,3,9],[],[0,1,7],[2,6],[1,3],[2,4]]
        dp = [1] * 10
        for _ in range(n - 1):
            next_dp = [0] * 10
            for u in range(10):
                for v in moves[u]:
                    next_dp[v] = (next_dp[v] + dp[u]) % MOD
            dp = next_dp
        return sum(dp) % MOD`,
      javascript: `class Solution {
    knightDialer(n) {
        if (n === 1) return 10;
        const MOD = 1000000007;
        const moves = [[4,6],[6,8],[7,9],[4,8],[0,3,9],[],[0,1,7],[2,6],[1,3],[2,4]];
        let dp = Array(10).fill(1);
        for (let step = 1; step < n; step++) {
            const nextDp = Array(10).fill(0);
            for (let u = 0; u < 10; u++) {
                for (const v of moves[u]) nextDp[v] = (nextDp[v] + dp[u]) % MOD;
            }
            dp = nextDp;
        }
        return dp.reduce((acc, x) => (acc + x) % MOD, 0);
    }
}`,
    },
    editorial: {
      approach: 'State transition on discrete keypad graph.',
      algorithm: 'Maintain array dp[10] indicating ways to reach each digit at current step.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Because moves graph is static, 10 states are updated in O(1) time per step.',
      referenceCode: `for v in moves[u]: next_dp[v] = (next_dp[v] + dp[u]) % MOD`,
    },
    tags: ['Dynamic Programming', 'Graph'],
    testCases: [
      { input: `1`, expectedOutput: `10`, isHidden: false, order: 0 },
      { input: `2`, expectedOutput: `20`, isHidden: false, order: 1 },
      { input: `3131`, expectedOutput: `136006598`, isHidden: false, order: 2 },
      { input: `5000`, expectedOutput: `406880451`, isHidden: true, order: 3 },
    ],
  },

  // 5. Maximum Score from Performing Multiplication Operations
  {
    title: 'Maximum Score from Performing Multiplication Operations',
    slug: 'maximum-score-from-performing-multiplication-operations',
    description: `You are given two 0-indexed integer arrays \`nums\` and \`multipliers\` of size \`n\` and \`m\` respectively, where \`n >= m\`. You begin with a score of 0. You want to perform exactly \`m\` operations. On the \`i-th\` operation (0-indexed) you will:
- Choose an integer \`x\` from either the start or the end of the array \`nums\`.
- Add \`x * multipliers[i]\` to your score.
- Remove \`x\` from \`nums\`.
Return the **maximum score** after performing \`m\` operations.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `m <= 300\nm <= n <= 10^4\n-1000 <= nums[i], multipliers[i] <= 1000`,
    inputFormat: `nums, multipliers`,
    outputFormat: `An integer representing maximum score.`,
    sampleInput: `[1,2,3], [3,2,1]`,
    sampleOutput: `14`,
    points: 200,
    hints: [
      'If you have picked left elements from the left and right elements from the right, right = op - left.',
      'State dp[op][left] depends only on picking left or right.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def maximumScore(self, nums: list, multipliers: list) -> int:\n        pass`,
      javascript: `class Solution {\n    maximumScore(nums, multipliers) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maximumScore(self, nums: list, multipliers: list) -> int:
        n, m = len(nums), len(multipliers)
        dp = [0] * (m + 1)
        for op in range(m - 1, -1, -1):
            next_dp = [0] * (op + 1)
            for left in range(op + 1):
                mult = multipliers[op]
                right = n - 1 - (op - left)
                next_dp[left] = max(nums[left] * mult + dp[left + 1], nums[right] * mult + dp[left])
            dp = next_dp
        return dp[0]`,
      javascript: `class Solution {
    maximumScore(nums, multipliers) {
        const n = nums.length, m = multipliers.length;
        let dp = Array(m + 1).fill(0);
        for (let op = m - 1; op >= 0; op--) {
            const nextDp = Array(op + 1).fill(0);
            for (let left = 0; left <= op; left++) {
                const mult = multipliers[op];
                const right = n - 1 - (op - left);
                nextDp[left] = Math.max(nums[left] * mult + dp[left + 1], nums[right] * mult + dp[left]);
            }
            dp = nextDp;
        }
        return dp[0];
    }
}`,
    },
    editorial: {
      approach: 'Bottom-up DP bounded by m operations.',
      algorithm: 'Index right is uniquely determined by op - left, yielding O(M^2) state space.',
      timeComplexity: 'O(M^2)',
      spaceComplexity: 'O(M)',
      content: 'Independent of N size, memory is bounded strictly by M^2.',
      referenceCode: `max(nums[left]*mult + dp[left+1], nums[right]*mult + dp[left])`,
    },
    tags: ['Dynamic Programming', 'Array'],
    testCases: [
      { input: `[1,2,3], [3,2,1]`, expectedOutput: `14`, isHidden: false, order: 0 },
      { input: `[-5,-3,-3,-2,7,1], [-10,-5,3,4,6]`, expectedOutput: `102`, isHidden: false, order: 1 },
      { input: `[10], [5]`, expectedOutput: `50`, isHidden: true, order: 2 },
      { input: `[-10, 10], [2, 3]`, expectedOutput: `10`, isHidden: true, order: 3 },
    ],
  },

  // 6. Tallest Billboard
  {
    title: 'Tallest Billboard Equal Support Legs',
    slug: 'tallest-billboard-equal-support-legs',
    description: `You are installing a billboard and want it to have the largest height. The billboard will have two steel supports, one on each side. Each steel support must be an equal height. Given an array of rod lengths \`rods\`, return the largest possible height of your billboard installation. If you cannot support the billboard, return 0.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= rods.length <= 20\n1 <= rods[i] <= 1000\nsum(rods[i]) <= 5000`,
    inputFormat: `rods`,
    outputFormat: `An integer representing largest height.`,
    sampleInput: `[1,2,3,6]`,
    sampleOutput: `6`,
    points: 200,
    hints: ['Track dp[diff] as the max height of the shorter support for difference diff.'],
    codeTemplates: {
      python: `class Solution:\n    def tallestBillboard(self, rods: list) -> int:\n        pass`,
      javascript: `class Solution {\n    tallestBillboard(rods) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def tallestBillboard(self, rods: list) -> int:
        dp = {0: 0}
        for r in rods:
            cur = dp.copy()
            for diff, shorter in cur.items():
                dp[diff + r] = max(dp.get(diff + r, 0), shorter)
                if diff >= r:
                    dp[diff - r] = max(dp.get(diff - r, 0), shorter + r)
                else:
                    dp[r - diff] = max(dp.get(r - diff, 0), shorter + diff)
        return dp.get(0, 0)`,
      javascript: `class Solution {
    tallestBillboard(rods) {
        let dp = new Map();
        dp.set(0, 0);
        for (const r of rods) {
            const cur = new Map(dp);
            for (const [diff, shorter] of cur.entries()) {
                dp.set(diff + r, Math.max(dp.get(diff + r) || 0, shorter));
                if (diff >= r) {
                    dp.set(diff - r, Math.max(dp.get(diff - r) || 0, shorter + r));
                } else {
                    dp.set(r - diff, Math.max(dp.get(r - diff) || 0, shorter + diff));
                }
            }
        }
        return dp.get(0) || 0;
    }
}`,
    },
    editorial: {
      approach: 'Knapsack variation tracking difference between two piles.',
      algorithm: 'Map state diff -> max shorter leg height.',
      timeComplexity: 'O(N * sum(rods))',
      spaceComplexity: 'O(sum(rods))',
      content: 'At difference 0, the shorter height is the answer.',
      referenceCode: `dp[diff+r] = max(dp[diff+r], shorter)`,
    },
    tags: ['Dynamic Programming', 'Knapsack'],
    testCases: [
      { input: `[1,2,3,6]`, expectedOutput: `6`, isHidden: false, order: 0 },
      { input: `[1,2,3,4,5,6]`, expectedOutput: `10`, isHidden: false, order: 1 },
      { input: `[1,2]`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },

  // 7. Scramble String
  {
    title: 'Scramble String Verification',
    slug: 'scramble-string-verification',
    description: `We can scramble a string s to get a string t using recursive partition and swapping. Given two strings \`s1\` and \`s2\` of the same length, return \`true\` if \`s2\` is a scrambled string of \`s1\`.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `s1.length == s2.length\n1 <= s1.length <= 30`,
    inputFormat: `s1, s2`,
    outputFormat: `Boolean true or false.`,
    sampleInput: `"great", "rgeat"`,
    sampleOutput: `true`,
    points: 200,
    hints: ['Check if character frequencies match before recursing.', 'Split at every pivot k and check with or without swap.'],
    codeTemplates: {
      python: `class Solution:\n    def isScramble(self, s1: str, s2: str) -> bool:\n        pass`,
      javascript: `class Solution {\n    isScramble(s1, s2) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def isScramble(self, s1: str, s2: str) -> bool:
        memo = {}
        def check(a, b):
            if a == b: return True
            if sorted(a) != sorted(b): return False
            key = (a, b)
            if key in memo: return memo[key]
            n = len(a)
            for i in range(1, n):
                if check(a[:i], b[:i]) and check(a[i:], b[i:]):
                    memo[key] = True
                    return True
                if check(a[:i], b[n - i:]) and check(a[i:], b[:n - i]):
                    memo[key] = True
                    return True
            memo[key] = False
            return False
        return check(s1, s2)`,
      javascript: `class Solution {
    isScramble(s1, s2) {
        const memo = new Map();
        function check(a, b) {
            if (a === b) return true;
            if (a.length !== b.length) return false;
            const count = Array(26).fill(0);
            for (let i = 0; i < a.length; i++) {
                count[a.charCodeAt(i) - 97]++;
                count[b.charCodeAt(i) - 97]--;
            }
            if (count.some(x => x !== 0)) return false;
            const key = a + '#' + b;
            if (memo.has(key)) return memo.get(key);
            const n = a.length;
            for (let i = 1; i < n; i++) {
                if (check(a.slice(0, i), b.slice(0, i)) && check(a.slice(i), b.slice(i))) {
                    memo.set(key, true); return true;
                }
                if (check(a.slice(0, i), b.slice(n - i)) && check(a.slice(i), b.slice(0, n - i))) {
                    memo.set(key, true); return true;
                }
            }
            memo.set(key, false); return false;
        }
        return check(s1, s2);
    }
}`,
    },
    editorial: {
      approach: 'Memoized divide-and-conquer partition search.',
      algorithm: 'Prune mismatched character counts, memoize subproblems.',
      timeComplexity: 'O(N^4)',
      spaceComplexity: 'O(N^3)',
      content: 'Fast anagram pruning speeds up recursive sub-interval branches.',
      referenceCode: `check(a[:i], b[:i]) and check(a[i:], b[i:])`,
    },
    tags: ['Dynamic Programming', 'String'],
    testCases: [
      { input: `"great", "rgeat"`, expectedOutput: `true`, isHidden: false, order: 0 },
      { input: `"abcde", "caebd"`, expectedOutput: `false`, isHidden: false, order: 1 },
      { input: `"a", "a"`, expectedOutput: `true`, isHidden: true, order: 2 },
    ],
  },

  // 8. Number of Ways to Stay in the Same Place
  {
    title: 'Number of Ways to Stay in the Same Place After Some Steps',
    slug: 'number-of-ways-to-stay-in-the-same-place-after-some-steps',
    description: `You have a pointer at index 0 in an array of size \`arrLen\`. At each step, you can move 1 position to the left, 1 position to the right, or stay in the same place. Given integers \`steps\` and \`arrLen\`, return the number of ways to be at index 0 after exactly \`steps\` steps modulo 10^9 + 7.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= steps <= 500\n1 <= arrLen <= 10^6`,
    inputFormat: `steps, arrLen`,
    outputFormat: `An integer modulo 10^9 + 7.`,
    sampleInput: `3, 2`,
    sampleOutput: `4`,
    points: 200,
    hints: ['The pointer cannot travel farther than steps // 2 and still return to 0.', 'Max reach is min(arrLen, steps // 2 + 1).'],
    codeTemplates: {
      python: `class Solution:\n    def numWays(self, steps: int, arrLen: int) -> int:\n        pass`,
      javascript: `class Solution {\n    numWays(steps, arrLen) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def numWays(self, steps: int, arrLen: int) -> int:
        MOD = 10**9 + 7
        max_pos = min(arrLen - 1, steps // 2)
        dp = [0] * (max_pos + 1)
        dp[0] = 1
        for _ in range(steps):
            next_dp = [0] * (max_pos + 1)
            for j in range(max_pos + 1):
                next_dp[j] = dp[j]
                if j > 0: next_dp[j] = (next_dp[j] + dp[j - 1]) % MOD
                if j < max_pos: next_dp[j] = (next_dp[j] + dp[j + 1]) % MOD
            dp = next_dp
        return dp[0]`,
      javascript: `class Solution {
    numWays(steps, arrLen) {
        const MOD = 1000000007;
        const maxPos = Math.min(arrLen - 1, Math.floor(steps / 2));
        let dp = Array(maxPos + 1).fill(0);
        dp[0] = 1;
        for (let step = 0; step < steps; step++) {
            const nextDp = Array(maxPos + 1).fill(0);
            for (let j = 0; j <= maxPos; j++) {
                nextDp[j] = dp[j];
                if (j > 0) nextDp[j] = (nextDp[j] + dp[j - 1]) % MOD;
                if (j < maxPos) nextDp[j] = (nextDp[j] + dp[j + 1]) % MOD;
            }
            dp = nextDp;
        }
        return dp[0];
    }
}`,
    },
    editorial: {
      approach: '1D DP with position boundary pruning.',
      algorithm: 'Max index is bounded by steps // 2.',
      timeComplexity: 'O(steps^2)',
      spaceComplexity: 'O(steps)',
      content: 'Effective length is bounded by steps/2 regardless of large arrLen.',
      referenceCode: `next_dp[j] = (dp[j] + (dp[j-1] if j>0 else 0) + (dp[j+1] if j<max_pos else 0)) % MOD`,
    },
    tags: ['Dynamic Programming'],
    testCases: [
      { input: `3, 2`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `2, 4`, expectedOutput: `2`, isHidden: false, order: 1 },
      { input: `4, 2`, expectedOutput: `8`, isHidden: true, order: 2 },
    ],
  },

  // 9. Cherry Pickup
  {
    title: 'Cherry Pickup Simultaneous Dual Paths',
    slug: 'cherry-pickup-simultaneous-dual-paths',
    description: `You are given an \`n x n\` grid representing a field of cherries, each cell is 0 (empty), 1 (cherry), or -1 (obstacle). Find the maximum number of cherries you can collect by going from (0,0) to (n-1,n-1) and returning to (0,0).`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n == grid.length == grid[i].length\n1 <= n <= 50\ngrid[i][j] in {-1, 0, 1}`,
    inputFormat: `grid`,
    outputFormat: `An integer representing max cherries.`,
    sampleInput: `[[0,1,-1],[1,0,-1],[1,1,1]]`,
    sampleOutput: `5`,
    points: 200,
    hints: ['Simulate two people walking from (0,0) to (n-1,n-1) simultaneously with step k = r1+c1 = r2+c2.'],
    codeTemplates: {
      python: `class Solution:\n    def cherryPickup(self, grid: list) -> int:\n        pass`,
      javascript: `class Solution {\n    cherryPickup(grid) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def cherryPickup(self, grid: list) -> int:
        n = len(grid)
        dp = [[-1] * n for _ in range(n)]
        dp[0][0] = grid[0][0]
        for step in range(1, 2 * n - 1):
            next_dp = [[-1] * n for _ in range(n)]
            for r1 in range(max(0, step - (n - 1)), min(n, step + 1)):
                c1 = step - r1
                if grid[r1][c1] == -1: continue
                for r2 in range(r1, min(n, step + 1)):
                    c2 = step - r2
                    if grid[r2][c2] == -1: continue
                    cherries = grid[r1][c1] + (grid[r2][c2] if r1 != r2 else 0)
                    best_prev = -1
                    for pr1 in (r1 - 1, r1):
                        for pr2 in (r2 - 1, r2):
                            if 0 <= pr1 < n and 0 <= pr2 < n:
                                best_prev = max(best_prev, dp[pr1][pr2])
                    if best_prev != -1:
                        next_dp[r1][r2] = best_prev + cherries
            dp = next_dp
        return max(0, dp[n - 1][n - 1])`,
      javascript: `class Solution {
    cherryPickup(grid) {
        const n = grid.length;
        let dp = Array.from({ length: n }, () => Array(n).fill(-1));
        dp[0][0] = grid[0][0];
        for (let step = 1; step < 2 * n - 1; step++) {
            const nextDp = Array.from({ length: n }, () => Array(n).fill(-1));
            for (let r1 = Math.max(0, step - (n - 1)); r1 < Math.min(n, step + 1); r1++) {
                const c1 = step - r1;
                if (grid[r1][c1] === -1) continue;
                for (let r2 = r1; r2 < Math.min(n, step + 1); r2++) {
                    const c2 = step - r2;
                    if (grid[r2][c2] === -1) continue;
                    const cherries = grid[r1][c1] + (r1 !== r2 ? grid[r2][c2] : 0);
                    let bestPrev = -1;
                    for (const pr1 of [r1 - 1, r1]) {
                        for (const pr2 of [r2 - 1, r2]) {
                            if (pr1 >= 0 && pr1 < n && pr2 >= 0 && pr2 < n) {
                                bestPrev = Math.max(bestPrev, dp[pr1][pr2]);
                            }
                        }
                    }
                    if (bestPrev !== -1) nextDp[r1][r2] = bestPrev + cherries;
                }
            }
            dp = nextDp;
        }
        return Math.max(0, dp[n - 1][n - 1]);
    }
}`,
    },
    editorial: {
      approach: 'Dual synchronized path 3D/2D DP.',
      algorithm: 'Two people step from (0,0) to (N-1,N-1) with distance k = r1+c1 = r2+c2.',
      timeComplexity: 'O(N^3)',
      spaceComplexity: 'O(N^2)',
      content: 'Walking back and forth is equivalent to two simultaneous forward paths.',
      referenceCode: `cherries = grid[r1][c1] + (grid[r2][c2] if r1!=r2 else 0)`,
    },
    tags: ['Dynamic Programming', 'Matrix'],
    testCases: [
      { input: `[[0,1,-1],[1,0,-1],[1,1,1]]`, expectedOutput: `5`, isHidden: false, order: 0 },
      { input: `[[1,1,-1],[1,-1,1],[-1,1,1]]`, expectedOutput: `0`, isHidden: false, order: 1 },
      { input: `[[1]]`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },

  // 10. Stone Game VII
  {
    title: 'Stone Game VII Difference in Scores',
    slug: 'stone-game-vii-difference-in-scores',
    description: `Alice and Bob take turns removing a stone from either end of \`stones\`. The player gets points equal to the sum of remaining stones. Both players maximize their score difference. Return the maximum score difference Alice can achieve.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `2 <= stones.length <= 1000\n1 <= stones[i] <= 1000`,
    inputFormat: `stones`,
    outputFormat: `An integer representing score difference.`,
    sampleInput: `[5,3,1,4,2]`,
    sampleOutput: `6`,
    points: 150,
    hints: ['Interval DP dp[i][j] = max(sum(i+1..j) - dp[i+1][j], sum(i..j-1) - dp[i][j-1]).'],
    codeTemplates: {
      python: `class Solution:\n    def stoneGameVII(self, stones: list) -> int:\n        pass`,
      javascript: `class Solution {\n    stoneGameVII(stones) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def stoneGameVII(self, stones: list) -> int:
        n = len(stones)
        prefix = [0] * (n + 1)
        for i in range(n): prefix[i + 1] = prefix[i] + stones[i]
        def get_sum(i, j): return prefix[j + 1] - prefix[i]
        dp = [0] * n
        for length in range(2, n + 1):
            next_dp = [0] * (n - length + 1)
            for i in range(n - length + 1):
                j = i + length - 1
                next_dp[i] = max(get_sum(i + 1, j) - dp[i + 1], get_sum(i, j - 1) - dp[i])
            dp = next_dp
        return dp[0]`,
      javascript: `class Solution {
    stoneGameVII(stones) {
        const n = stones.length;
        const prefix = [0];
        for (let i = 0; i < n; i++) prefix.push(prefix[i] + stones[i]);
        const getSum = (i, j) => prefix[j + 1] - prefix[i];
        let dp = Array(n).fill(0);
        for (let len = 2; len <= n; len++) {
            const nextDp = Array(n - len + 1).fill(0);
            for (let i = 0; i <= n - len; i++) {
                const j = i + len - 1;
                nextDp[i] = Math.max(getSum(i + 1, j) - dp[i + 1], getSum(i, j - 1) - dp[i]);
            }
            dp = nextDp;
        }
        return dp[0];
    }
}`,
    },
    editorial: {
      approach: 'Interval Dynamic Programming with prefix sums.',
      algorithm: 'Minimax state difference tracking on intervals.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N)',
      content: 'Using 1D rolling array reduces memory to O(N).',
      referenceCode: `max(sum(i+1, j) - dp[i+1], sum(i, j-1) - dp[i])`,
    },
    tags: ['Dynamic Programming', 'Game Theory'],
    testCases: [
      { input: `[5,3,1,4,2]`, expectedOutput: `6`, isHidden: false, order: 0 },
      { input: `[7,90,5,1,100,10,10,2]`, expectedOutput: `122`, isHidden: false, order: 1 },
      { input: `[1,2]`, expectedOutput: `2`, isHidden: true, order: 2 },
    ],
  },

  // 11. Longest Valid Parentheses
  {
    title: 'Longest Valid Parentheses Substring DP',
    slug: 'longest-valid-parentheses-substring-dp',
    description: `Given a string \`s\` containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= s.length <= 3 * 10^4`,
    inputFormat: `s`,
    outputFormat: `An integer representing max valid length.`,
    sampleInput: `")()())"`,
    sampleOutput: `4`,
    points: 200,
    hints: ['If s[i] == \')\', check s[i-1] == \'(\' or check index i - dp[i-1] - 1.'],
    codeTemplates: {
      python: `class Solution:\n    def longestValidParentheses(self, s: str) -> int:\n        pass`,
      javascript: `class Solution {\n    longestValidParentheses(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def longestValidParentheses(self, s: str) -> int:
        n = len(s)
        dp = [0] * n
        max_len = 0
        for i in range(1, n):
            if s[i] == ')':
                if s[i - 1] == '(':
                    dp[i] = (dp[i - 2] if i >= 2 else 0) + 2
                elif i - dp[i - 1] > 0 and s[i - dp[i - 1] - 1] == '(':
                    prev = dp[i - dp[i - 1] - 2] if i - dp[i - 1] >= 2 else 0
                    dp[i] = dp[i - 1] + 2 + prev
                max_len = max(max_len, dp[i])
        return max_len`,
      javascript: `class Solution {
    longestValidParentheses(s) {
        const n = s.length;
        const dp = Array(n).fill(0);
        let maxLen = 0;
        for (let i = 1; i < n; i++) {
            if (s[i] === ')') {
                if (s[i - 1] === '(') dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
                else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
                    const prev = (i - dp[i - 1] >= 2) ? dp[i - dp[i - 1] - 2] : 0;
                    dp[i] = dp[i - 1] + 2 + prev;
                }
                maxLen = Math.max(maxLen, dp[i]);
            }
        }
        return maxLen;
    }
}`,
    },
    editorial: {
      approach: '1D Dynamic Programming on ending parentheses.',
      algorithm: 'dp[i] is the length of longest valid substring ending at index i.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Linear single-pass DP checks previous matching opening paren position.',
      referenceCode: `dp[i] = dp[i-1] + 2 + dp[i - dp[i-1] - 2]`,
    },
    tags: ['Dynamic Programming', 'String'],
    testCases: [
      { input: `")()())"`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `"(()"`, expectedOutput: `2`, isHidden: false, order: 1 },
      { input: `""`, expectedOutput: `0`, isHidden: true, order: 2 },
      { input: `"()(())"`, expectedOutput: `6`, isHidden: true, order: 3 },
    ],
  },

  // 12. Best Team With No Conflicts
  {
    title: 'Best Team With No Conflicts LIS Variant',
    slug: 'best-team-with-no-conflicts-lis-variant',
    description: `You are the manager of a basketball team. You want to choose the team with highest overall score. The team score is the sum of scores of all players. A conflict occurs if a younger player has a strictly higher score than an older player. Return the maximum possible score of all possible basketball teams.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= scores.length <= 1000\nscores.length == ages.length\n1 <= scores[i] <= 10^6\n1 <= ages[i] <= 1000`,
    inputFormat: `scores, ages`,
    outputFormat: `An integer representing maximum team score.`,
    sampleInput: `[4,5,6,5], [2,1,2,1]`,
    sampleOutput: `16`,
    points: 150,
    hints: ['Sort players primarily by age, then by score.', 'Find the maximum weight non-decreasing subsequence on scores.'],
    codeTemplates: {
      python: `class Solution:\n    def bestTeamScore(self, scores: list, ages: list) -> int:\n        pass`,
      javascript: `class Solution {\n    bestTeamScore(scores, ages) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def bestTeamScore(self, scores: list, ages: list) -> int:
        players = sorted(zip(ages, scores))
        n = len(players)
        dp = [p[1] for p in players]
        for i in range(n):
            for j in range(i):
                if players[j][1] <= players[i][1]:
                    dp[i] = max(dp[i], dp[j] + players[i][1])
        return max(dp)`,
      javascript: `class Solution {
    bestTeamScore(scores, ages) {
        const players = scores.map((s, i) => [ages[i], s]).sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
        const n = players.length;
        const dp = players.map(p => p[1]);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < i; j++) {
                if (players[j][1] <= players[i][1]) {
                    dp[i] = Math.max(dp[i], dp[j] + players[i][1]);
                }
            }
        }
        return Math.max(...dp);
    }
}`,
    },
    editorial: {
      approach: 'Weighted Longest Non-Decreasing Subsequence.',
      algorithm: 'Sort by age then score, reduce to max weight non-decreasing subsequence.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N)',
      content: 'Standard LIS adapted for maximum weighted score sum.',
      referenceCode: `if players[j][1] <= players[i][1]: dp[i] = max(dp[i], dp[j] + players[i][1])`,
    },
    tags: ['Dynamic Programming', 'Sorting'],
    testCases: [
      { input: `[4,5,6,5], [2,1,2,1]`, expectedOutput: `16`, isHidden: false, order: 0 },
      { input: `[1,2,3,5], [8,9,10,1]`, expectedOutput: `6`, isHidden: false, order: 1 },
      { input: `[1,3,5,10,15], [1,2,3,4,5]`, expectedOutput: `34`, isHidden: true, order: 2 },
    ],
  },

  // 13. Paint House II
  {
    title: 'Paint House II Multi-Color Optimization',
    slug: 'paint-house-ii-multi-color-optimization',
    description: `Given an n x k matrix of painting costs, return minimum cost to paint all houses such that no adjacent houses have same color.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 100\n1 <= k <= 20`,
    inputFormat: `costs`,
    outputFormat: `An integer representing minimum cost.`,
    sampleInput: `[[1,5,3],[2,9,4]]`,
    sampleOutput: `5`,
    points: 200,
    hints: ['Track minimum and second minimum cost of previous house.'],
    codeTemplates: {
      python: `class Solution:\n    def minCostII(self, costs: list) -> int:\n        pass`,
      javascript: `class Solution {\n    minCostII(costs) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minCostII(self, costs: list) -> int:
        if not costs: return 0
        n, k = len(costs), len(costs[0])
        min1, min2, idx1 = 0, 0, -1
        for i in range(n):
            n_min1, n_min2, n_idx1 = float('inf'), float('inf'), -1
            for j in range(k):
                cost = costs[i][j] + (min2 if j == idx1 else min1)
                if cost < n_min1:
                    n_min2, n_min1, n_idx1 = n_min1, cost, j
                elif cost < n_min2:
                    n_min2 = cost
            min1, min2, idx1 = n_min1, n_min2, n_idx1
        return min1`,
      javascript: `class Solution {
    minCostII(costs) {
        if (!costs || costs.length === 0) return 0;
        const n = costs.length, k = costs[0].length;
        let min1 = 0, min2 = 0, idx1 = -1;
        for (let i = 0; i < n; i++) {
            let nMin1 = Infinity, nMin2 = Infinity, nIdx1 = -1;
            for (let j = 0; j < k; j++) {
                const cost = costs[i][j] + (j === idx1 ? min2 : min1);
                if (cost < nMin1) {
                    nMin2 = nMin1; nMin1 = cost; nIdx1 = j;
                } else if (cost < nMin2) {
                    nMin2 = cost;
                }
            }
            min1 = nMin1; min2 = nMin2; idx1 = nIdx1;
        }
        return min1;
    }
}`,
    },
    editorial: {
      approach: 'O(N*K) space-optimized DP with min1/min2 tracking.',
      algorithm: 'Min1 and Min2 color tracking allows O(1) transition per color.',
      timeComplexity: 'O(N * K)',
      spaceComplexity: 'O(1)',
      content: 'Standard optimal house painting.',
      referenceCode: `cost = costs[i][j] + (min2 if j == idx1 else min1)`,
    },
    tags: ['Dynamic Programming', 'Array'],
    testCases: [
      { input: `[[1,5,3],[2,9,4]]`, expectedOutput: `5`, isHidden: false, order: 0 },
      { input: `[[1,3],[2,4]]`, expectedOutput: `5`, isHidden: false, order: 1 },
      { input: `[[7]]`, expectedOutput: `7`, isHidden: true, order: 2 },
    ],
  },

  // 14. Maximum Vacation Days
  {
    title: 'Maximum Vacation Days Flights Graph',
    slug: 'maximum-vacation-days-flights-graph',
    description: `Given flights between n cities and days[i][j] vacation days in city i on week j, return max vacation days.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n <= 100, k <= 100`,
    inputFormat: `flights, days`,
    outputFormat: `An integer representing max vacation days.`,
    sampleInput: `[[0,1,1],[1,0,1],[1,1,0]], [[1,3,1],[6,0,3],[3,3,3]]`,
    sampleOutput: `12`,
    points: 200,
    hints: ['dp[city] tracks max days for current week.'],
    codeTemplates: {
      python: `class Solution:\n    def maxVacationDays(self, flights: list, days: list) -> int:\n        pass`,
      javascript: `class Solution {\n    maxVacationDays(flights, days) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maxVacationDays(self, flights: list, days: list) -> int:
        n = len(flights)
        k = len(days[0])
        dp = [-1] * n
        dp[0] = 0
        for w in range(k):
            next_dp = [-1] * n
            for cur in range(n):
                if dp[cur] < 0: continue
                for nxt in range(n):
                    if cur == nxt or flights[cur][nxt]:
                        next_dp[nxt] = max(next_dp[nxt], dp[cur] + days[nxt][w])
            dp = next_dp
        return max(dp)`,
      javascript: `class Solution {
    maxVacationDays(flights, days) {
        const n = flights.length, k = days[0].length;
        let dp = Array(n).fill(-1);
        dp[0] = 0;
        for (let w = 0; w < k; w++) {
            const nextDp = Array(n).fill(-1);
            for (let cur = 0; cur < n; cur++) {
                if (dp[cur] < 0) continue;
                for (let nxt = 0; nxt < n; nxt++) {
                    if (cur === nxt || flights[cur][nxt]) {
                        nextDp[nxt] = Math.max(nextDp[nxt], dp[cur] + days[nxt][w]);
                    }
                }
            }
            dp = nextDp;
        }
        return Math.max(...dp);
    }
}`,
    },
    editorial: {
      approach: 'Weekly State Space DP on Flight Graph.',
      algorithm: 'Dynamic graph transitions.',
      timeComplexity: 'O(K * N^2)',
      spaceComplexity: 'O(N)',
      content: 'O(N) rolling array per week.',
      referenceCode: `next_dp[nxt] = max(next_dp[nxt], dp[cur] + days[nxt][w])`,
    },
    tags: ['Dynamic Programming', 'Graph'],
    testCases: [
      { input: `[[0,1,1],[1,0,1],[1,1,0]], [[1,3,1],[6,0,3],[3,3,3]]`, expectedOutput: `12`, isHidden: false, order: 0 },
      { input: `[[0,0,0],[0,0,0],[0,0,0]], [[1,1,1],[2,2,2],[3,3,3]]`, expectedOutput: `3`, isHidden: false, order: 1 },
      { input: `[[0,1,1],[1,0,1],[1,1,0]], [[7,0,0],[0,7,0],[0,0,7]]`, expectedOutput: `21`, isHidden: true, order: 2 },
    ],
  },

  // 15. Form Largest Integer With Digits That Add Up to Target
  {
    title: 'Form Largest Integer With Digits Adding to Target',
    slug: 'form-largest-integer-with-digits-adding-to-target',
    description: `Given cost array for digits 1-9 and integer target, return largest integer string whose digits cost exactly target.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `target <= 5000`,
    inputFormat: `cost, target`,
    outputFormat: `A string representing largest integer.`,
    sampleInput: `[4,3,2,5,6,7,2,5,5], 9`,
    sampleOutput: `"7772"`,
    points: 200,
    hints: ['First maximize digit length, then greedily pick largest digits.'],
    codeTemplates: {
      python: `class Solution:\n    def largestNumber(self, cost: list, target: int) -> str:\n        pass`,
      javascript: `class Solution {\n    largestNumber(cost, target) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def largestNumber(self, cost: list, target: int) -> str:
        dp = [-1] * (target + 1)
        dp[0] = 0
        for c in cost:
            for t in range(c, target + 1):
                if dp[t - c] >= 0:
                    dp[t] = max(dp[t], dp[t - c] + 1)
        if dp[target] < 0: return "0"
        res = []
        cur = target
        for d in range(9, 0, -1):
            c = cost[d - 1]
            while cur >= c and dp[cur] == dp[cur - c] + 1:
                res.append(str(d))
                cur -= c
        return "".join(res)`,
      javascript: `class Solution {
    largestNumber(cost, target) {
        const dp = Array(target + 1).fill(-1);
        dp[0] = 0;
        for (const c of cost) {
            for (let t = c; t <= target; t++) {
                if (dp[t - c] >= 0) dp[t] = Math.max(dp[t], dp[t - c] + 1);
            }
        }
        if (dp[target] < 0) return "0";
        const res = [];
        let cur = target;
        for (let d = 9; d >= 1; d--) {
            const c = cost[d - 1];
            while (cur >= c && dp[cur] === dp[cur - c] + 1) {
                res.push(d);
                cur -= c;
            }
        }
        return res.join("");
    }
}`,
    },
    editorial: {
      approach: 'Unbounded knapsack with greedy reconstruction.',
      algorithm: 'Max length + largest digits.',
      timeComplexity: 'O(target)',
      spaceComplexity: 'O(target)',
      content: 'Knapsack length optimization.',
      referenceCode: `while cur >= c and dp[cur] == dp[cur - c] + 1: res.append(str(d))`,
    },
    tags: ['Dynamic Programming', 'Knapsack', 'Greedy'],
    testCases: [
      { input: `[4,3,2,5,6,7,2,5,5], 9`, expectedOutput: `"7772"`, isHidden: false, order: 0 },
      { input: `[7,6,5,5,5,6,8,7,8], 12`, expectedOutput: `"85"`, isHidden: false, order: 1 },
      { input: `[2,4,6,2,4,6,4,4,4], 5`, expectedOutput: `"0"`, isHidden: true, order: 2 },
    ],
  },

  // 16. Count All Possible Routes
  {
    title: 'Count All Possible Routes City Fuel',
    slug: 'count-all-possible-routes-city-fuel',
    description: `Given locations array, start, finish, and fuel, return number of possible routes modulo 10^9 + 7.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `locations <= 100, fuel <= 200`,
    inputFormat: `locations, start, finish, fuel`,
    outputFormat: `An integer modulo 10^9 + 7.`,
    sampleInput: `[2,3,6,8,4], 1, 3, 5`,
    sampleOutput: `4`,
    points: 200,
    hints: ['dp(city, rem_fuel) is memoized state.'],
    codeTemplates: {
      python: `class Solution:\n    def countRoutes(self, locations: list, start: int, finish: int, fuel: int) -> int:\n        pass`,
      javascript: `class Solution {\n    countRoutes(locations, start, finish, fuel) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def countRoutes(self, locations: list, start: int, finish: int, fuel: int) -> int:
        MOD = 10**9 + 7
        n = len(locations)
        memo = {}
        def solve(city, f):
            if f < 0: return 0
            if (city, f) in memo: return memo[(city, f)]
            ans = 1 if city == finish else 0
            for nxt in range(n):
                if nxt != city:
                    cost = abs(locations[city] - locations[nxt])
                    if f >= cost:
                        ans = (ans + solve(nxt, f - cost)) % MOD
            memo[(city, f)] = ans
            return ans
        return solve(start, fuel)`,
      javascript: `class Solution {
    countRoutes(locations, start, finish, fuel) {
        const MOD = 1000000007;
        const n = locations.length;
        const memo = new Map();
        function solve(city, f) {
            if (f < 0) return 0;
            const key = city * 201 + f;
            if (memo.has(key)) return memo.get(key);
            let ans = city === finish ? 1 : 0;
            for (let nxt = 0; nxt < n; nxt++) {
                if (nxt !== city) {
                    const cost = Math.abs(locations[city] - locations[nxt]);
                    if (f >= cost) ans = (ans + solve(nxt, f - cost)) % MOD;
                }
            }
            memo.set(key, ans);
            return ans;
        }
        return solve(start, fuel);
    }
}`,
    },
    editorial: {
      approach: 'Memoized State DP on City and Remaining Fuel.',
      algorithm: '2D fuel-state transitions.',
      timeComplexity: 'O(N^2 * fuel)',
      spaceComplexity: 'O(N * fuel)',
      content: 'Top-down fuel memoization.',
      referenceCode: `ans = (ans + solve(nxt, f - cost)) % MOD`,
    },
    tags: ['Dynamic Programming', 'Memoization'],
    testCases: [
      { input: `[2,3,6,8,4], 1, 3, 5`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `[4,3,1], 1, 0, 6`, expectedOutput: `5`, isHidden: false, order: 1 },
      { input: `[5,2,1], 0, 2, 3`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },

  // 17. Numbers at Most N Given Digit Set
  {
    title: 'Numbers at Most N Given Digit Set',
    slug: 'numbers-at-most-n-given-digit-set',
    description: `Given an array of digits (sorted strings) and an integer n, return count of positive integers <= n formed by digits.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n <= 10^9`,
    inputFormat: `digits, n`,
    outputFormat: `An integer representing count.`,
    sampleInput: `["1","3","5","7"], 100`,
    sampleOutput: `20`,
    points: 200,
    hints: ['Count shorter numbers with pow(len(digits), k), then match prefix with digits.'],
    codeTemplates: {
      python: `class Solution:\n    def atMostNGivenDigitSet(self, digits: list, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    atMostNGivenDigitSet(digits, n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def atMostNGivenDigitSet(self, digits: list, n: int) -> int:
        s = str(n)
        k = len(s)
        num_digits = len(digits)
        ans = sum(num_digits ** i for i in range(1, k))
        for i, ch in enumerate(s):
            smaller = sum(1 for d in digits if d < ch)
            ans += smaller * (num_digits ** (k - 1 - i))
            if ch not in digits: break
            if i == k - 1: ans += 1
        return ans`,
      javascript: `class Solution {
    atMostNGivenDigitSet(digits, n) {
        const s = String(n);
        const k = s.length;
        const numDigits = digits.length;
        let ans = 0;
        for (let i = 1; i < k; i++) ans += Math.pow(numDigits, i);
        for (let i = 0; i < k; i++) {
            const ch = s[i];
            let smaller = 0;
            for (const d of digits) if (d < ch) smaller++;
            ans += smaller * Math.pow(numDigits, k - 1 - i);
            if (!digits.includes(ch)) break;
            if (i === k - 1) ans++;
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Digit DP with base counting.',
      algorithm: 'Count shorter lengths + prefix matching.',
      timeComplexity: 'O(log10(N))',
      spaceComplexity: 'O(log10(N))',
      content: 'Linear in number of digits.',
      referenceCode: `ans += smaller * (num_digits ** (k - 1 - i))`,
    },
    tags: ['Dynamic Programming', 'Math', 'String'],
    testCases: [
      { input: `["1","3","5","7"], 100`, expectedOutput: `20`, isHidden: false, order: 0 },
      { input: `["1","4","9"], 1000000000`, expectedOutput: `29523`, isHidden: false, order: 1 },
      { input: `["7"], 8`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },

  // 18. Distinct Echo Substrings
  {
    title: 'Distinct Echo Substrings Count',
    slug: 'distinct-echo-substrings-count',
    description: `Return number of distinct non-empty substrings that can be written as concatenation of a string with itself (e.g. "abcabc").`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `text.length <= 2000`,
    inputFormat: `text`,
    outputFormat: `An integer representing count.`,
    sampleInput: `"abcabcabc"`,
    sampleOutput: `3`,
    points: 200,
    hints: ['For each even length 2L, check if text[i..i+L] == text[i+L..i+2L].'],
    codeTemplates: {
      python: `class Solution:\n    def distinctEchoSubstrings(self, text: str) -> int:\n        pass`,
      javascript: `class Solution {\n    distinctEchoSubstrings(text) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def distinctEchoSubstrings(self, text: str) -> int:
        n = len(text)
        MOD = 10**9 + 7
        BASE = 31
        hashes = [0] * (n + 1)
        powers = [1] * (n + 1)
        for i in range(n):
            hashes[i + 1] = (hashes[i] * BASE + ord(text[i])) % MOD
            powers[i + 1] = (powers[i] * BASE) % MOD
        def get_hash(l, r):
            return (hashes[r] - hashes[l] * powers[r - l]) % MOD
        seen = set()
        for L in range(1, n // 2 + 1):
            for i in range(n - 2 * L + 1):
                if get_hash(i, i + L) == get_hash(i + L, i + 2 * L):
                    seen.add(get_hash(i, i + 2 * L))
        return len(seen)`,
      javascript: `class Solution {
    distinctEchoSubstrings(text) {
        const n = text.length;
        const MOD = 1000000007n;
        const BASE = 31n;
        const hashes = Array(n + 1).fill(0n);
        const powers = Array(n + 1).fill(1n);
        for (let i = 0; i < n; i++) {
            hashes[i + 1] = (hashes[i] * BASE + BigInt(text.charCodeAt(i))) % MOD;
            powers[i + 1] = (powers[i] * BASE) % MOD;
        }
        function getHash(l, r) {
            let h = (hashes[r] - hashes[l] * powers[r - l]) % MOD;
            if (h < 0n) h += MOD;
            return h;
        }
        const seen = new Set();
        for (let L = 1; L <= Math.floor(n / 2); L++) {
            for (let i = 0; i <= n - 2 * L; i++) {
                if (getHash(i, i + L) === getHash(i + L, i + 2 * L)) {
                    seen.add(getHash(i, i + 2 * L).toString());
                }
            }
        }
        return seen.size;
    }
}`,
    },
    editorial: {
      approach: 'Rolling Hash Substring Equivalence.',
      algorithm: 'Length-based segment matching with O(1) hash queries.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N)',
      content: 'Rabin-Karp prefix hashing for fast equality.',
      referenceCode: `get_hash(i, i + L) == get_hash(i + L, i + 2 * L)`,
    },
    tags: ['String', 'Rolling Hash', 'Dynamic Programming'],
    testCases: [
      { input: `"abcabcabc"`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `"leetcodeleetcode"`, expectedOutput: `2`, isHidden: false, order: 1 },
      { input: `"a"`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },

  // 19. Paint House III
  {
    title: 'Paint House III Target Neighborhoods',
    slug: 'paint-house-iii-target-neighborhoods',
    description: `Given houses (some painted), cost matrix, m houses, n colors, and target neighborhoods, return min cost or -1.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `m, n, target <= 100`,
    inputFormat: `houses, cost, m, n, target`,
    outputFormat: `An integer representing min cost.`,
    sampleInput: `[0,0,0,0,0], [[1,10],[10,1],[10,1],[1,10],[5,1]], 5, 2, 3`,
    sampleOutput: `9`,
    points: 200,
    hints: ['State dp(i, target_rem, prev_color).'],
    codeTemplates: {
      python: `class Solution:\n    def minCost(self, houses: list, cost: list, m: int, n: int, target: int) -> int:\n        pass`,
      javascript: `class Solution {\n    minCost(houses, cost, m, n, target) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minCost(self, houses: list, cost: list, m: int, n: int, target: int) -> int:
        memo = {}
        def solve(i, t, prev_c):
            if t < 0: return float('inf')
            if i == m: return 0 if t == 0 else float('inf')
            key = (i, t, prev_c)
            if key in memo: return memo[key]
            ans = float('inf')
            if houses[i] != 0:
                c = houses[i]
                new_t = t - (1 if c != prev_c else 0)
                ans = solve(i + 1, new_t, c)
            else:
                for c in range(1, n + 1):
                    new_t = t - (1 if c != prev_c else 0)
                    ans = min(ans, cost[i][c - 1] + solve(i + 1, new_t, c))
            memo[key] = ans
            return ans
        res = solve(0, target, 0)
        return res if res != float('inf') else -1`,
      javascript: `class Solution {
    minCost(houses, cost, m, n, target) {
        const memo = new Map();
        function solve(i, t, prevC) {
            if (t < 0) return Infinity;
            if (i === m) return t === 0 ? 0 : Infinity;
            const key = (i * 105 + t) * 105 + prevC;
            if (memo.has(key)) return memo.get(key);
            let ans = Infinity;
            if (houses[i] !== 0) {
                const c = houses[i];
                const newT = t - (c !== prevC ? 1 : 0);
                ans = solve(i + 1, newT, c);
            } else {
                for (let c = 1; c <= n; c++) {
                    const newT = t - (c !== prevC ? 1 : 0);
                    ans = Math.min(ans, cost[i][c - 1] + solve(i + 1, newT, c));
                }
            }
            memo.set(key, ans);
            return ans;
        }
        const res = solve(0, target, 0);
        return res !== Infinity ? res : -1;
    }
}`,
    },
    editorial: {
      approach: '3D Dynamic Programming with Neighborhoods.',
      algorithm: 'Memoized color and target partitioning.',
      timeComplexity: 'O(M * target * N^2)',
      spaceComplexity: 'O(M * target * N)',
      content: 'Top-down state space memoization.',
      referenceCode: `ans = min(ans, cost[i][c - 1] + solve(i + 1, new_t, c))`,
    },
    tags: ['Dynamic Programming', 'Memoization'],
    testCases: [
      { input: `[0,0,0,0,0], [[1,10],[10,1],[10,1],[1,10],[5,1]], 5, 2, 3`, expectedOutput: `9`, isHidden: false, order: 0 },
      { input: `[0,2,1,2,0], [[1,10],[10,1],[10,1],[1,10],[5,1]], 5, 2, 3`, expectedOutput: `11`, isHidden: false, order: 1 },
      { input: `[3,1,2,3], [[1,1,1],[1,1,1],[1,1,1],[1,1,1]], 4, 3, 3`, expectedOutput: `-1`, isHidden: true, order: 2 },
    ],
  },
];
