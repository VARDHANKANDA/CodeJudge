const fs = require('fs');
const path = require('path');
const PACK_DIR = path.join(__dirname, 'problem-packs');

function exportPack(fileName, varName, problems) {
  const filePath = path.join(PACK_DIR, fileName);
  const jsonStr = JSON.stringify(problems, null, 2).replace(/"difficulty": "(EASY|MEDIUM|HARD)"/g, 'difficulty: Difficulty.$1');
  const fileContent = `import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const ${varName}: ProblemDef[] = ${jsonStr};
`;
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`✓ Exported ${fileName} with ${problems.length} problems`);
}

// PACK A: Advanced DP & State Transitions
const packA = [
  {
    title: 'Edit Distance with Variable Costs',
    slug: 'edit-distance-with-variable-costs',
    description: `Given two strings \`word1\` and \`word2\`, and costs for three operations: \`costIns\` (insertion), \`costDel\` (deletion), and \`costRep\` (replacement), return the minimum total cost to convert \`word1\` into \`word2\`.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= word1.length, word2.length <= 500\n1 <= costIns, costDel, costRep <= 100`,
    inputFormat: `word1, word2, costIns, costDel, costRep`,
    outputFormat: `An integer representing the minimum total conversion cost.`,
    sampleInput: `"horse", "ros", 1, 1, 1`,
    sampleOutput: `3`,
    points: 150,
    hints: ['Define dp[i][j] as the min cost to convert word1[0..i) to word2[0..j).', 'If word1[i-1] == word2[j-1], no cost needed. Otherwise pick min of delete, insert, or replace.'],
    codeTemplates: {
      python: `class Solution:\n    def minDistanceWithCosts(self, word1: str, word2: str, costIns: int, costDel: int, costRep: int) -> int:\n        pass`,
      javascript: `class Solution {\n    minDistanceWithCosts(word1, word2, costIns, costDel, costRep) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minDistanceWithCosts(self, word1: str, word2: str, costIns: int, costDel: int, costRep: int) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            dp[i][0] = i * costDel
        for j in range(n + 1):
            dp[0][j] = j * costIns
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
                if (word1[i - 1] === word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.min(dp[i - 1][j] + costDel, dp[i][j - 1] + costIns, dp[i - 1][j - 1] + costRep);
                }
            }
        }
        return dp[m][n];
    }
}`,
    },
    editorial: {
      approach: '2D DP with weighted costs.',
      algorithm: 'Transitions standard Levenshtein weighted by costs.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(M * N)',
      content: 'Standard DP table filled in row-major order.',
      referenceCode: `dp[i][j] = min(dp[i-1][j]+del, dp[i][j-1]+ins, dp[i-1][j-1]+rep)`,
    },
    tags: ['Dynamic Programming', 'String'],
    testCases: [
      { input: `"horse", "ros", 1, 1, 1`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `"intention", "execution", 2, 3, 4`, expectedOutput: `19`, isHidden: false, order: 1 },
      { input: `"", "abc", 5, 2, 10`, expectedOutput: `15`, isHidden: true, order: 2 },
      { input: `"same", "same", 10, 10, 10`, expectedOutput: `0`, isHidden: true, order: 3 },
    ],
  },
  {
    title: 'Interleaving String Verification',
    slug: 'interleaving-string-verification',
    description: `Given strings \`s1\`, \`s2\`, and \`s3\`, return \`true\` if \`s3\` is formed by an interleaving of \`s1\` and \`s2\`, and \`false\` otherwise.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= s1.length, s2.length <= 100\n0 <= s3.length <= 200`,
    inputFormat: `s1, s2, s3`,
    outputFormat: `Boolean true or false.`,
    sampleInput: `"aabcc", "dbbca", "aadbbcbcac"`,
    sampleOutput: `true`,
    points: 150,
    hints: ['If len(s1) + len(s2) != len(s3), return false.', 'Use rolling 1D DP array.'],
    codeTemplates: {
      python: `class Solution:\n    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:\n        pass`,
      javascript: `class Solution {\n    isInterleave(s1, s2, s3) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        if len(s1) + len(s2) != len(s3):
            return False
        m, n = len(s1), len(s2)
        dp = [False] * (n + 1)
        dp[0] = True
        for j in range(1, n + 1):
            dp[j] = dp[j - 1] and s2[j - 1] == s3[j - 1]
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
      approach: 'Space-optimized DP.',
      algorithm: 'dp[j] maintains prefix interleaving matching.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(N)',
      content: '1D space optimization.',
      referenceCode: `dp[j] = (dp[j] and s1[i-1]==s3[i+j-1]) or (dp[j-1] and s2[j-1]==s3[i+j-1])`,
    },
    tags: ['Dynamic Programming', 'String'],
    testCases: [
      { input: `"aabcc", "dbbca", "aadbbcbcac"`, expectedOutput: `true`, isHidden: false, order: 0 },
      { input: `"aabcc", "dbbca", "aadbbbaccc"`, expectedOutput: `false`, isHidden: false, order: 1 },
      { input: `"", "", ""`, expectedOutput: `true`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Count Vowels Permutation',
    slug: 'count-vowels-permutation',
    description: `Given integer \`n\`, count strings of length \`n\` formed with vowels under transition rules modulo 10^9 + 7.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 2 * 10^4`,
    inputFormat: `n`,
    outputFormat: `An integer modulo 10^9 + 7.`,
    sampleInput: `1`,
    sampleOutput: `5`,
    points: 200,
    hints: ['Maintain state counts for 5 vowels.'],
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
      approach: 'State transition recurrence.',
      algorithm: 'Linear recurrence over 5 states.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Constant memory DP.',
      referenceCode: `a,e,i,o,u = (e+i+u)%MOD, (a+i)%MOD, (e+o)%MOD, i%MOD, (i+o)%MOD`,
    },
    tags: ['Dynamic Programming', 'Math'],
    testCases: [
      { input: `1`, expectedOutput: `5`, isHidden: false, order: 0 },
      { input: `2`, expectedOutput: `10`, isHidden: false, order: 1 },
      { input: `144`, expectedOutput: `18208803`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Knight Dialer on Phone Keypad',
    slug: 'knight-dialer-on-phone-keypad',
    description: `Given integer \`n\`, return how many distinct phone numbers of length \`n\` you can dial on a phone dialpad modulo 10^9 + 7 using knight moves.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 5000`,
    inputFormat: `n`,
    outputFormat: `An integer modulo 10^9 + 7.`,
    sampleInput: `1`,
    sampleOutput: `10`,
    points: 150,
    hints: ['Map knight transitions from 0-9.'],
    codeTemplates: {
      python: `class Solution:\n    def knightDialer(self, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    knightDialer(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def knightDialer(self, n: int) -> int:
        if n == 1:
            return 10
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
                for (const v of moves[u]) {
                    nextDp[v] = (nextDp[v] + dp[u]) % MOD;
                }
            }
            dp = nextDp;
        }
        return dp.reduce((acc, x) => (acc + x) % MOD, 0);
    }
}`,
    },
    editorial: {
      approach: 'State transition on keypad graph.',
      algorithm: 'Transitions over 10 digits.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: '10-state DP.',
      referenceCode: `next_dp[v] = (next_dp[v] + dp[u]) % MOD`,
    },
    tags: ['Dynamic Programming', 'Graph'],
    testCases: [
      { input: `1`, expectedOutput: `10`, isHidden: false, order: 0 },
      { input: `2`, expectedOutput: `20`, isHidden: false, order: 1 },
      { input: `3131`, expectedOutput: `136006598`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Maximum Score from Performing Multiplication Operations',
    slug: 'maximum-score-from-performing-multiplication-operations',
    description: `Given \`nums\` of size \`n\` and \`multipliers\` of size \`m\` (\`n >= m\`), return the maximum score picking from either end in each operation.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `m <= 300\nm <= n <= 10^4`,
    inputFormat: `nums, multipliers`,
    outputFormat: `An integer representing maximum score.`,
    sampleInput: `[1,2,3], [3,2,1]`,
    sampleOutput: `14`,
    points: 200,
    hints: ['Right pointer is determined by op - left.'],
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
                pick_left = nums[left] * mult + dp[left + 1]
                pick_right = nums[right] * mult + dp[left]
                next_dp[left] = max(pick_left, pick_right)
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
                const pickLeft = nums[left] * mult + dp[left + 1];
                const pickRight = nums[right] * mult + dp[left];
                nextDp[left] = Math.max(pickLeft, pickRight);
            }
            dp = nextDp;
        }
        return dp[0];
    }
}`,
    },
    editorial: {
      approach: 'Bottom-up DP bounded by m.',
      algorithm: 'O(M^2) state space.',
      timeComplexity: 'O(M^2)',
      spaceComplexity: 'O(M)',
      content: 'Independent of N size, memory is bounded by M.',
      referenceCode: `max(nums[left]*mult + dp[left+1], nums[right]*mult + dp[left])`,
    },
    tags: ['Dynamic Programming', 'Array'],
    testCases: [
      { input: `[1,2,3], [3,2,1]`, expectedOutput: `14`, isHidden: false, order: 0 },
      { input: `[-5,-3,-3,-2,7,1], [-10,-5,3,4,6]`, expectedOutput: `102`, isHidden: false, order: 1 },
      { input: `[10], [5]`, expectedOutput: `50`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Tallest Billboard Equal Support Legs',
    slug: 'tallest-billboard-equal-support-legs',
    description: `Given rod lengths \`rods\`, return the largest possible equal height of two billboard supports, or 0 if impossible.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= rods.length <= 20\nsum(rods[i]) <= 5000`,
    inputFormat: `rods`,
    outputFormat: `An integer representing largest height.`,
    sampleInput: `[1,2,3,6]`,
    sampleOutput: `6`,
    points: 200,
    hints: ['dp[diff] is the max height of the shorter support.'],
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
      approach: 'Knapsack tracking support difference.',
      algorithm: 'Map state diff -> max shorter leg height.',
      timeComplexity: 'O(N * sum(rods))',
      spaceComplexity: 'O(sum(rods))',
      content: 'At diff 0, shorter height is answer.',
      referenceCode: `dp[diff+r] = max(dp[diff+r], shorter)`,
    },
    tags: ['Dynamic Programming', 'Knapsack'],
    testCases: [
      { input: `[1,2,3,6]`, expectedOutput: `6`, isHidden: false, order: 0 },
      { input: `[1,2,3,4,5,6]`, expectedOutput: `10`, isHidden: false, order: 1 },
      { input: `[1,2]`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Scramble String Verification',
    slug: 'scramble-string-verification',
    description: `Given two strings \`s1\` and \`s2\` of the same length, return \`true\` if \`s2\` is a scrambled string of \`s1\`.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `s1.length == s2.length\n1 <= s1.length <= 30`,
    inputFormat: `s1, s2`,
    outputFormat: `Boolean true or false.`,
    sampleInput: `"great", "rgeat"`,
    sampleOutput: `true`,
    points: 200,
    hints: ['Check anagram match before recursion.', 'Try all pivot splits.'],
    codeTemplates: {
      python: `class Solution:\n    def isScramble(self, s1: str, s2: str) -> bool:\n        pass`,
      javascript: `class Solution {\n    isScramble(s1, s2) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def isScramble(self, s1: str, s2: str) -> bool:
        memo = {}
        def check(a, b):
            if a == b:
                return True
            if sorted(a) != sorted(b):
                return False
            key = (a, b)
            if key in memo:
                return memo[key]
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
                    memo.set(key, true);
                    return true;
                }
                if (check(a.slice(0, i), b.slice(n - i)) && check(a.slice(i), b.slice(0, n - i))) {
                    memo.set(key, true);
                    return true;
                }
            }
            memo.set(key, false);
            return false;
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
  {
    title: 'Number of Ways to Stay in the Same Place After Some Steps',
    slug: 'number-of-ways-to-stay-in-the-same-place-after-some-steps',
    description: `Given integers \`steps\` and \`arrLen\`, return number of ways to start at index 0 and end at index 0 after \`steps\` steps moving left, right, or staying put modulo 10^9 + 7.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= steps <= 500\n1 <= arrLen <= 10^6`,
    inputFormat: `steps, arrLen`,
    outputFormat: `An integer modulo 10^9 + 7.`,
    sampleInput: `3, 2`,
    sampleOutput: `4`,
    points: 200,
    hints: ['Max reach is min(arrLen, steps // 2 + 1).'],
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
                if j > 0:
                    next_dp[j] = (next_dp[j] + dp[j - 1]) % MOD
                if j < max_pos:
                    next_dp[j] = (next_dp[j] + dp[j + 1]) % MOD
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
      content: 'Effective length bounded by steps/2.',
      referenceCode: `next_dp[j] = (dp[j] + (dp[j-1] if j>0 else 0) + (dp[j+1] if j<max_pos else 0)) % MOD`,
    },
    tags: ['Dynamic Programming'],
    testCases: [
      { input: `3, 2`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `2, 4`, expectedOutput: `2`, isHidden: false, order: 1 },
      { input: `4, 2`, expectedOutput: `8`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Cherry Pickup Simultaneous Dual Paths',
    slug: 'cherry-pickup-simultaneous-dual-paths',
    description: `Given \`n x n\` grid, return max cherries collected by going (0,0)->(n-1,n-1) and returning, or 0 if unreachable.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 50`,
    inputFormat: `grid`,
    outputFormat: `An integer representing max cherries.`,
    sampleInput: `[[0,1,-1],[1,0,-1],[1,1,1]]`,
    sampleOutput: `5`,
    points: 200,
    hints: ['Simulate two people walking simultaneously with step k = r1+c1.'],
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
                if grid[r1][c1] == -1:
                    continue
                for r2 in range(r1, min(n, step + 1)):
                    c2 = step - r2
                    if grid[r2][c2] == -1:
                        continue
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
                    if (bestPrev !== -1) {
                        nextDp[r1][r2] = bestPrev + cherries;
                    }
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
      algorithm: 'Synchronized step progression.',
      timeComplexity: 'O(N^3)',
      spaceComplexity: 'O(N^2)',
      content: 'Standard dual-path DP.',
      referenceCode: `cherries = grid[r1][c1] + (grid[r2][c2] if r1!=r2 else 0)`,
    },
    tags: ['Dynamic Programming', 'Matrix'],
    testCases: [
      { input: `[[0,1,-1],[1,0,-1],[1,1,1]]`, expectedOutput: `5`, isHidden: false, order: 0 },
      { input: `[[1,1,-1],[1,-1,1],[-1,1,1]]`, expectedOutput: `0`, isHidden: false, order: 1 },
      { input: `[[1]]`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Stone Game VII Difference in Scores',
    slug: 'stone-game-vii-difference-in-scores',
    description: `Given \`stones\`, Alice and Bob take turns removing from either end and getting remaining sum. Return max score difference Alice can achieve.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `2 <= stones.length <= 1000`,
    inputFormat: `stones`,
    outputFormat: `An integer representing score difference.`,
    sampleInput: `[5,3,1,4,2]`,
    sampleOutput: `6`,
    points: 150,
    hints: ['Interval DP with prefix sums.'],
    codeTemplates: {
      python: `class Solution:\n    def stoneGameVII(self, stones: list) -> int:\n        pass`,
      javascript: `class Solution {\n    stoneGameVII(stones) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def stoneGameVII(self, stones: list) -> int:
        n = len(stones)
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + stones[i]
        def get_sum(i, j):
            return prefix[j + 1] - prefix[i]
        dp = [0] * n
        for length in range(2, n + 1):
            next_dp = [0] * (n - length + 1)
            for i in range(n - length + 1):
                j = i + length - 1
                pick_left = get_sum(i + 1, j) - dp[i + 1]
                pick_right = get_sum(i, j - 1) - dp[i]
                next_dp[i] = max(pick_left, pick_right)
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
                const pickLeft = getSum(i + 1, j) - dp[i + 1];
                const pickRight = getSum(i, j - 1) - dp[i];
                nextDp[i] = Math.max(pickLeft, pickRight);
            }
            dp = nextDp;
        }
        return dp[0];
    }
}`,
    },
    editorial: {
      approach: 'Interval DP with prefix sums.',
      algorithm: 'Minimax state difference tracking on intervals.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N)',
      content: '1D rolling array reduces memory to O(N).',
      referenceCode: `max(sum(i+1, j) - dp[i+1], sum(i, j-1) - dp[i])`,
    },
    tags: ['Dynamic Programming', 'Game Theory'],
    testCases: [
      { input: `[5,3,1,4,2]`, expectedOutput: `6`, isHidden: false, order: 0 },
      { input: `[7,90,5,1,100,10,10,2]`, expectedOutput: `122`, isHidden: false, order: 1 },
      { input: `[1,2]`, expectedOutput: `2`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Longest Valid Parentheses Substring DP',
    slug: 'longest-valid-parentheses-substring-dp',
    description: `Given a string \`s\` with '(' and ')', return the length of the longest valid parentheses substring.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= s.length <= 3 * 10^4`,
    inputFormat: `s`,
    outputFormat: `An integer representing max valid length.`,
    sampleInput: `")()())"`,
    sampleOutput: `4`,
    points: 200,
    hints: ['If s[i] == \')\', check matching open parenthesis index.'],
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
                if (s[i - 1] === '(') {
                    dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
                } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
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
      approach: '1D DP on ending parens.',
      algorithm: 'Look back dp[i-1] length to match opening parenthesis.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Linear DP.',
      referenceCode: `dp[i] = dp[i-1] + 2 + dp[i - dp[i-1] - 2]`,
    },
    tags: ['Dynamic Programming', 'String'],
    testCases: [
      { input: `")()())"`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `"(()"`, expectedOutput: `2`, isHidden: false, order: 1 },
      { input: `""`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Best Team With No Conflicts LIS Variant',
    slug: 'best-team-with-no-conflicts-lis-variant',
    description: `Given \`scores\` and \`ages\`, return the maximum team score with no age-score conflicts.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= scores.length <= 1000`,
    inputFormat: `scores, ages`,
    outputFormat: `An integer representing maximum score.`,
    sampleInput: `[4,5,6,5], [2,1,2,1]`,
    sampleOutput: `16`,
    points: 150,
    hints: ['Sort by age then score, find weighted LIS.'],
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
      approach: 'Weighted LIS on sorted tuples.',
      algorithm: 'Sort by age and score, compute maximum weighted non-decreasing subsequence.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N)',
      content: 'Standard weighted LIS.',
      referenceCode: `if players[j][1] <= players[i][1]: dp[i] = max(dp[i], dp[j] + players[i][1])`,
    },
    tags: ['Dynamic Programming', 'Sorting'],
    testCases: [
      { input: `[4,5,6,5], [2,1,2,1]`, expectedOutput: `16`, isHidden: false, order: 0 },
      { input: `[1,2,3,5], [8,9,10,1]`, expectedOutput: `6`, isHidden: false, order: 1 },
      { input: `[1,3,5,10,15], [1,2,3,4,5]`, expectedOutput: `34`, isHidden: true, order: 2 },
    ],
  },
];

exportPack('pack-500-part-a.ts', 'pack500PartADefs', packA);
console.log('Done Pack A.');
