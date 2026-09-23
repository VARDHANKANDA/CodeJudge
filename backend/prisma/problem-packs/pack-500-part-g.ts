import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack500PartGDefs: ProblemDef[] = [
  {
    "title": "Meet in the Middle Partitioning Target Sum",
    "slug": "meet-in-the-middle-partitioning-target-sum",
    "description": "Given an array of $N$ integers ($N \\le 36$) and a target integer $S$, determine if there exists a non-empty subsequence whose sum equals $S$.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= N <= 36, -10^9 <= nums[i], S <= 10^9",
    "inputFormat": "nums, S",
    "outputFormat": "Boolean true/false.",
    "sampleInput": "[1,3,9,27,81], 31",
    "sampleOutput": "true",
    "points": 200,
    "hints": [
      "Split array into two halves of size N/2 and generate all subset sums for each half."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def hasTargetSum(self, nums: list, S: int) -> bool:\n        pass",
      "javascript": "class Solution {\n    hasTargetSum(nums, S) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def hasTargetSum(self, nums: list, S: int) -> bool:\n        n = len(nums)\n        if n == 0: return False\n        mid = n // 2\n        left, right = nums[:mid], nums[mid:]\n        def get_sums(arr):\n            sums = {0}\n            for x in arr:\n                sums |= {s + x for s in sums}\n            return sums\n        s1 = get_sums(left)\n        s2 = get_sums(right)\n        for val in s1:\n            if S - val in s2:\n                if val == 0 and S - val == 0 and S != 0:\n                    continue\n                return True\n        return False",
      "javascript": "class Solution {\n    hasTargetSum(nums, S) {\n        const n = nums.length;\n        if (n === 0) return false;\n        const mid = Math.floor(n / 2);\n        const left = nums.slice(0, mid);\n        const right = nums.slice(mid);\n        const getSums = (arr) => {\n            let sums = new Set([0]);\n            for (const x of arr) {\n                const next = new Set(sums);\n                for (const s of sums) next.add(s + x);\n                sums = next;\n            }\n            return sums;\n        };\n        const s1 = getSums(left);\n        const s2 = getSums(right);\n        for (const val of s1) {\n            if (s2.has(S - val)) return true;\n        }\n        return false;\n    }\n}"
    },
    "editorial": {
      "approach": "Meet in the Middle Subsequence Generation.",
      "algorithm": "Divide array into two halves of length <= 18. Generate 2^(N/2) sums for each and intersect.",
      "timeComplexity": "O(2^(N/2))",
      "spaceComplexity": "O(2^(N/2))",
      "content": "Standard meet in the middle for knapsack / subset sum.",
      "referenceCode": "s1 = get_sums(left); s2 = get_sums(right); return any(S - v in s2 for v in s1)"
    },
    "tags": [
      "Backtracking",
      "Meet in the Middle",
      "Bit Manipulation"
    ],
    "testCases": [
      {
        "input": "[1,3,9,27,81], 31",
        "expectedOutput": "true",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1,2,4,8], 16",
        "expectedOutput": "false",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[-5,10,20,-30], 25",
        "expectedOutput": "true",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Twenty Four Game Evaluation",
    "slug": "twenty-four-game-evaluation",
    "description": "You have 4 cards each containing a number from 1 to 9. You need to judge whether they can operate through *, /, +, -, (, ) to get the value of 24.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "cards.length == 4, 1 <= cards[i] <= 9",
    "inputFormat": "cards",
    "outputFormat": "Boolean true/false.",
    "sampleInput": "[4,1,8,7]",
    "sampleOutput": "true",
    "points": 200,
    "hints": [
      "Pick any two numbers, apply one of 4 operators (+, -, *, /), replace the two numbers with the result, and recurse."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def judgePoint24(self, cards: list) -> bool:\n        pass",
      "javascript": "class Solution {\n    judgePoint24(cards) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def judgePoint24(self, cards: list) -> bool:\n        EPS = 1e-6\n        def solve(nums):\n            if len(nums) == 1:\n                return abs(nums[0] - 24) < EPS\n            for i in range(len(nums)):\n                for j in range(len(nums)):\n                    if i != j:\n                        next_nums = [nums[k] for k in range(len(nums)) if k != i and k != j]\n                        a, b = nums[i], nums[j]\n                        cands = [a + b, a - b, b - a, a * b]\n                        if abs(b) > EPS: cands.append(a / b)\n                        if abs(a) > EPS: cands.append(b / a)\n                        for c in cands:\n                            if solve(next_nums + [c]):\n                                return True\n            return False\n        return solve([float(x) for x in cards])",
      "javascript": "class Solution {\n    judgePoint24(cards) {\n        const EPS = 1e-6;\n        function solve(nums) {\n            if (nums.length === 1) return Math.abs(nums[0] - 24) < EPS;\n            for (let i = 0; i < nums.length; i++) {\n                for (let j = 0; j < nums.length; j++) {\n                    if (i !== j) {\n                        const rest = nums.filter((_, idx) => idx !== i && idx !== j);\n                        const a = nums[i], b = nums[j];\n                        const ops = [a + b, a - b, b - a, a * b];\n                        if (Math.abs(b) > EPS) ops.push(a / b);\n                        if (Math.abs(a) > EPS) ops.push(b / a);\n                        for (const op of ops) {\n                            if (solve([...rest, op])) return true;\n                        }\n                    }\n                }\n            }\n            return false;\n        }\n        return solve(cards.map(Number));\n    }\n}"
    },
    "editorial": {
      "approach": "Exhaustive Backtracking over Expression Trees.",
      "algorithm": "Recursively combine pairs of numbers with basic arithmetic operations.",
      "timeComplexity": "O(1) (fixed 4 numbers: 4! * 3! * 4^3 branches)",
      "spaceComplexity": "O(1)",
      "content": "Standard 24-game recursive search.",
      "referenceCode": "solve(next_nums + [cand])"
    },
    "tags": [
      "Backtracking",
      "Math",
      "Recursion"
    ],
    "testCases": [
      {
        "input": "[4,1,8,7]",
        "expectedOutput": "true",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1,2,1,2]",
        "expectedOutput": "false",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[3,3,8,8]",
        "expectedOutput": "true",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Expression Add Operators All Targets",
    "slug": "expression-add-operators-all-targets",
    "description": "Given a string `num` that contains only digits and an integer `target`, return all possibilities to insert binary operators `+`, `-`, and/or `*` between the digits of `num` so that the resultant expression evaluates to `target`.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= num.length <= 10, -2^31 <= target <= 2^31 - 1",
    "inputFormat": "num, target",
    "outputFormat": "List of valid expression strings sorted lexicographically.",
    "sampleInput": "\"123\", 6",
    "sampleOutput": "[\"1+2+3\",\"1*2*3\"]",
    "points": 200,
    "hints": [
      "Track current value and previous multiplied operand to handle operator precedence."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def addOperators(self, num: str, target: int) -> list:\n        pass",
      "javascript": "class Solution {\n    addOperators(num, target) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def addOperators(self, num: str, target: int) -> list:\n        res = []\n        def dfs(idx, path, val, prev):\n            if idx == len(num):\n                if val == target:\n                    res.append(path)\n                return\n            for i in range(idx + 1, len(num) + 1):\n                s = num[idx:i]\n                if len(s) > 1 and s[0] == '0':\n                    break\n                curr = int(s)\n                if idx == 0:\n                    dfs(i, s, curr, curr)\n                else:\n                    dfs(i, path + '+' + s, val + curr, curr)\n                    dfs(i, path + '-' + s, val - curr, -curr)\n                    dfs(i, path + '*' + s, val - prev + prev * curr, prev * curr)\n        dfs(0, \"\", 0, 0)\n        return sorted(res)",
      "javascript": "class Solution {\n    addOperators(num, target) {\n        const res = [];\n        function dfs(idx, path, val, prev) {\n            if (idx === num.length) {\n                if (val === target) res.push(path);\n                return;\n            }\n            for (let i = idx + 1; i <= num.length; i++) {\n                const s = num.slice(idx, i);\n                if (s.length > 1 && s[0] === '0') break;\n                const curr = Number(s);\n                if (idx === 0) {\n                    dfs(i, s, curr, curr);\n                } else {\n                    dfs(i, path + '+' + s, val + curr, curr);\n                    dfs(i, path + '-' + s, val - curr, -curr);\n                    dfs(i, path + '*' + s, val - prev + prev * curr, prev * curr);\n                }\n            }\n        }\n        dfs(0, \"\", 0, 0);\n        return res.sort();\n    }\n}"
    },
    "editorial": {
      "approach": "Backtracking with Operator Precedence Maintenance.",
      "algorithm": "Maintain prev operand to subtract and multiply when encountering multiplication operator.",
      "timeComplexity": "O(4^N)",
      "spaceComplexity": "O(N)",
      "content": "Standard expression generation with precedence evaluation.",
      "referenceCode": "val - prev + prev * curr"
    },
    "tags": [
      "Backtracking",
      "String",
      "Math"
    ],
    "testCases": [
      {
        "input": "\"123\", 6",
        "expectedOutput": "[\"1*2*3\",\"1+2+3\"]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"232\", 8",
        "expectedOutput": "[\"2*3+2\",\"2+3*2\"]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"105\", 5",
        "expectedOutput": "[\"1*0+5\",\"10-5\"]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Restore IP Addresses Parsing",
    "slug": "restore-ip-addresses-parsing",
    "description": "A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros. Given a string `s` containing only digits, return all possible valid IP addresses that can be formed by inserting dots.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= s.length <= 20",
    "inputFormat": "s",
    "outputFormat": "List of valid IP address strings sorted lexicographically.",
    "sampleInput": "\"25525511135\"",
    "sampleOutput": "[\"255.255.11.135\",\"255.255.111.35\"]",
    "points": 150,
    "hints": [
      "Recursively place 3 dots to split into 4 parts, checking if each part is between 0 and 255 without leading zero."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def restoreIpAddresses(self, s: str) -> list:\n        pass",
      "javascript": "class Solution {\n    restoreIpAddresses(s) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def restoreIpAddresses(self, s: str) -> list:\n        res = []\n        def dfs(idx, parts):\n            if len(parts) == 4:\n                if idx == len(s):\n                    res.append('.'.join(parts))\n                return\n            for length in range(1, 4):\n                if idx + length <= len(s):\n                    sub = s[idx:idx+length]\n                    if (len(sub) == 1 or sub[0] != '0') and int(sub) <= 255:\n                        dfs(idx + length, parts + [sub])\n        dfs(0, [])\n        return sorted(res)",
      "javascript": "class Solution {\n    restoreIpAddresses(s) {\n        const res = [];\n        function dfs(idx, parts) {\n            if (parts.length === 4) {\n                if (idx === s.length) res.push(parts.join('.'));\n                return;\n            }\n            for (let len = 1; len <= 3; len++) {\n                if (idx + len <= s.length) {\n                    const sub = s.slice(idx, idx + len);\n                    if ((sub.length === 1 || sub[0] !== '0') && Number(sub) <= 255) {\n                        dfs(idx + len, [...parts, sub]);\n                    }\n                }\n            }\n        }\n        dfs(0, []);\n        return res.sort();\n    }\n}"
    },
    "editorial": {
      "approach": "4-Way Backtracking Partitioning.",
      "algorithm": "Branch on lengths 1, 2, and 3, validating leading zero and 0-255 bound.",
      "timeComplexity": "O(3^4) = O(1)",
      "spaceComplexity": "O(1)",
      "content": "Standard string partitioning.",
      "referenceCode": "dfs(idx + length, parts + [sub])"
    },
    "tags": [
      "Backtracking",
      "String"
    ],
    "testCases": [
      {
        "input": "\"25525511135\"",
        "expectedOutput": "[\"255.255.11.135\",\"255.255.111.35\"]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"0000\"",
        "expectedOutput": "[\"0.0.0.0\"]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"101023\"",
        "expectedOutput": "[\"1.0.10.23\",\"1.0.102.3\",\"10.1.0.23\",\"10.10.2.3\",\"101.0.2.3\"]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Matchsticks to Square Partition",
    "slug": "matchsticks-to-square-partition",
    "description": "You are given an integer array `matchsticks` where `matchsticks[i]` is the length of the `i`-th matchstick. You want to use all the matchsticks to make one square. Return `true` if you can make this square and `false` otherwise.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= matchsticks.length <= 15, 1 <= matchsticks[i] <= 10^8",
    "inputFormat": "matchsticks",
    "outputFormat": "Boolean true/false.",
    "sampleInput": "[1,1,2,2,2]",
    "sampleOutput": "true",
    "points": 150,
    "hints": [
      "Total sum must be divisible by 4. Sort descending to prune failed branches early."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def makesquare(self, matchsticks: list) -> bool:\n        pass",
      "javascript": "class Solution {\n    makesquare(matchsticks) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def makesquare(self, matchsticks: list) -> bool:\n        total = sum(matchsticks)\n        if total % 4 != 0 or len(matchsticks) < 4: return False\n        side = total // 4\n        matchsticks.sort(reverse=True)\n        if matchsticks[0] > side: return False\n        sides = [0] * 4\n        def dfs(idx):\n            if idx == len(matchsticks):\n                return True\n            for i in range(4):\n                if sides[i] + matchsticks[idx] <= side:\n                    sides[i] += matchsticks[idx]\n                    if dfs(idx + 1): return True\n                    sides[i] -= matchsticks[idx]\n                if sides[i] == 0: break\n            return False\n        return dfs(0)",
      "javascript": "class Solution {\n    makesquare(matchsticks) {\n        const total = matchsticks.reduce((a, b) => a + b, 0);\n        if (total % 4 !== 0 || matchsticks.length < 4) return false;\n        const side = Math.floor(total / 4);\n        matchsticks.sort((a, b) => b - a);\n        if (matchsticks[0] > side) return false;\n        const sides = [0, 0, 0, 0];\n        function dfs(idx) {\n            if (idx === matchsticks.length) return true;\n            for (let i = 0; i < 4; i++) {\n                if (sides[i] + matchsticks[idx] <= side) {\n                    sides[i] += matchsticks[idx];\n                    if (dfs(idx + 1)) return true;\n                    sides[i] -= matchsticks[idx];\n                }\n                if (sides[i] === 0) break;\n            }\n            return false;\n        }\n        return dfs(0);\n    }\n}"
    },
    "editorial": {
      "approach": "Pruned Backtracking with Descending Sort.",
      "algorithm": "Sort descending to place larger sticks first and break symmetric states when sides[i] == 0.",
      "timeComplexity": "O(4^N)",
      "spaceComplexity": "O(N)",
      "content": "Classic 4-subset partitioning.",
      "referenceCode": "sides[i] += matchsticks[idx]; if dfs(idx + 1): return True"
    },
    "tags": [
      "Backtracking",
      "Bit Manipulation",
      "Dynamic Programming"
    ],
    "testCases": [
      {
        "input": "[1,1,2,2,2]",
        "expectedOutput": "true",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[3,3,3,3,4]",
        "expectedOutput": "false",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[5,5,5,5,4,4,4,4,3,3,3,3]",
        "expectedOutput": "true",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Partition to K Equal Sum Subsets",
    "slug": "partition-to-k-equal-sum-subsets-backtrack",
    "description": "Given an integer array `nums` and an integer `k`, return `true` if it is possible to divide this array into `k` non-empty subsets whose sums are all equal.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= k <= nums.length <= 16, 1 <= nums[i] <= 10^4",
    "inputFormat": "nums, k",
    "outputFormat": "Boolean true/false.",
    "sampleInput": "[4,3,2,3,5,2,1], 4",
    "sampleOutput": "true",
    "points": 150,
    "hints": [
      "Target sum is sum(nums) / k. Use bitmask or sorted backtracking with pruning."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def canPartitionKSubsets(self, nums: list, k: int) -> bool:\n        pass",
      "javascript": "class Solution {\n    canPartitionKSubsets(nums, k) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def canPartitionKSubsets(self, nums: list, k: int) -> bool:\n        total = sum(nums)\n        if total % k != 0: return False\n        target = total // k\n        nums.sort(reverse=True)\n        if nums[0] > target: return False\n        buckets = [0] * k\n        def dfs(idx):\n            if idx == len(nums):\n                return True\n            for i in range(k):\n                if buckets[i] + nums[idx] <= target:\n                    buckets[i] += nums[idx]\n                    if dfs(idx + 1): return True\n                    buckets[i] -= nums[idx]\n                if buckets[i] == 0: break\n            return False\n        return dfs(0)",
      "javascript": "class Solution {\n    canPartitionKSubsets(nums, k) {\n        const total = nums.reduce((a, b) => a + b, 0);\n        if (total % k !== 0) return false;\n        const target = Math.floor(total / k);\n        nums.sort((a, b) => b - a);\n        if (nums[0] > target) return false;\n        const buckets = Array(k).fill(0);\n        function dfs(idx) {\n            if (idx === nums.length) return true;\n            for (let i = 0; i < k; i++) {\n                if (buckets[i] + nums[idx] <= target) {\n                    buckets[i] += nums[idx];\n                    if (dfs(idx + 1)) return true;\n                    buckets[i] -= nums[idx];\n                }\n                if (buckets[i] === 0) break;\n            }\n            return false;\n        }\n        return dfs(0);\n    }\n}"
    },
    "editorial": {
      "approach": "Bucket Backtracking with Symmetry Breaking.",
      "algorithm": "Sort descending and prune identical empty buckets.",
      "timeComplexity": "O(k^N)",
      "spaceComplexity": "O(N)",
      "content": "Standard k-subset partition search.",
      "referenceCode": "if buckets[i] == 0: break"
    },
    "tags": [
      "Backtracking",
      "Bit Manipulation",
      "Dynamic Programming"
    ],
    "testCases": [
      {
        "input": "[4,3,2,3,5,2,1], 4",
        "expectedOutput": "true",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1,2,3,4], 3",
        "expectedOutput": "false",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[2,2,2,2,3,4,5], 4",
        "expectedOutput": "false",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Sudoku Solver Grid Completer",
    "slug": "sudoku-solver-grid-completer",
    "description": "Write a program to solve a Sudoku puzzle by filling empty cells (denoted by `.`). A sudoku solution must satisfy all standard 1-9 row, column, and 3x3 subgrid constraints.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "board.length == 9, board[i].length == 9",
    "inputFormat": "board",
    "outputFormat": "Solved 9x9 board array.",
    "sampleInput": "[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
    "sampleOutput": "[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]",
    "points": 200,
    "hints": [
      "Keep track of used digits per row, column, and 3x3 block, then place digits and backtrack."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def solveSudoku(self, board: list) -> list:\n        pass",
      "javascript": "class Solution {\n    solveSudoku(board) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def solveSudoku(self, board: list) -> list:\n        rows = [set() for _ in range(9)]\n        cols = [set() for _ in range(9)]\n        boxes = [set() for _ in range(9)]\n        empty = []\n        for r in range(9):\n            for c in range(9):\n                ch = board[r][c]\n                if ch != '.':\n                    rows[r].add(ch)\n                    cols[c].add(ch)\n                    boxes[(r//3)*3 + (c//3)].add(ch)\n                else:\n                    empty.append((r, c))\n        def backtrack(k):\n            if k == len(empty):\n                return True\n            r, c = empty[k]\n            b = (r//3)*3 + (c//3)\n            for d in map(str, range(1, 10)):\n                if d not in rows[r] and d not in cols[c] and d not in boxes[b]:\n                    board[r][c] = d\n                    rows[r].add(d); cols[c].add(d); boxes[b].add(d)\n                    if backtrack(k + 1): return True\n                    rows[r].remove(d); cols[c].remove(d); boxes[b].remove(d)\n                    board[r][c] = '.'\n            return False\n        backtrack(0)\n        return board",
      "javascript": "class Solution {\n    solveSudoku(board) {\n        const rows = Array.from({ length: 9 }, () => new Set());\n        const cols = Array.from({ length: 9 }, () => new Set());\n        const boxes = Array.from({ length: 9 }, () => new Set());\n        const empty = [];\n        for (let r = 0; r < 9; r++) {\n            for (let c = 0; c < 9; c++) {\n                const ch = board[r][c];\n                if (ch !== '.') {\n                    rows[r].add(ch);\n                    cols[c].add(ch);\n                    boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)].add(ch);\n                } else {\n                    empty.push([r, c]);\n                }\n            }\n        }\n        function backtrack(k) {\n            if (k === empty.length) return true;\n            const [r, c] = empty[k];\n            const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);\n            for (let d = 1; d <= 9; d++) {\n                const s = String(d);\n                if (!rows[r].has(s) && !cols[c].has(s) && !boxes[b].has(s)) {\n                    board[r][c] = s;\n                    rows[r].add(s); cols[c].add(s); boxes[b].add(s);\n                    if (backtrack(k + 1)) return true;\n                    rows[r].delete(s); cols[c].delete(s); boxes[b].delete(s);\n                    board[r][c] = '.';\n                }\n            }\n            return false;\n        }\n        backtrack(0);\n        return board;\n    }\n}"
    },
    "editorial": {
      "approach": "Row/Col/Box Bitset Constraint Backtracking.",
      "algorithm": "Fill cells in depth-first order, pruning impossible choices via constraints.",
      "timeComplexity": "O(9^81)",
      "spaceComplexity": "O(81)",
      "content": "Classic Sudoku exact cover backtracking.",
      "referenceCode": "if backtrack(k + 1): return True"
    },
    "tags": [
      "Backtracking",
      "Matrix",
      "Hash Table"
    ],
    "testCases": [
      {
        "input": "[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
        "expectedOutput": "[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]",
        "isHidden": false,
        "order": 0
      }
    ]
  },
  {
    "title": "N-Queens II Total Solutions Count",
    "slug": "n-queens-ii-total-solutions-count",
    "description": "The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other. Given an integer `n`, return the number of distinct solutions.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 14",
    "inputFormat": "n",
    "outputFormat": "Count of distinct valid configurations.",
    "sampleInput": "4",
    "sampleOutput": "2",
    "points": 200,
    "hints": [
      "Use bitmasks for columns, diagonal (r-c), and anti-diagonal (r+c)."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def totalNQueens(self, n: int) -> int:\n        pass",
      "javascript": "class Solution {\n    totalNQueens(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def totalNQueens(self, n: int) -> int:\n        count = 0\n        def solve(row, cols, diag1, diag2):\n            nonlocal count\n            if row == n:\n                count += 1\n                return\n            avail = ((1 << n) - 1) & ~(cols | diag1 | diag2)\n            while avail:\n                pos = avail & -avail\n                avail &= avail - 1\n                solve(row + 1, cols | pos, (diag1 | pos) << 1, (diag2 | pos) >> 1)\n        solve(0, 0, 0, 0)\n        return count",
      "javascript": "class Solution {\n    totalNQueens(n) {\n        let count = 0;\n        function solve(row, cols, diag1, diag2) {\n            if (row === n) {\n                count++;\n                return;\n            }\n            let avail = ((1 << n) - 1) & ~(cols | diag1 | diag2);\n            while (avail) {\n                const pos = avail & -avail;\n                avail &= avail - 1;\n                solve(row + 1, cols | pos, (diag1 | pos) << 1, (diag2 | pos) >> 1);\n            }\n        }\n        solve(0, 0, 0, 0);\n        return count;\n    }\n}"
    },
    "editorial": {
      "approach": "Bitmask Pruned N-Queens Search.",
      "algorithm": "Bitwise representation of column, left diagonal, and right diagonal attack lines.",
      "timeComplexity": "O(N!)",
      "spaceComplexity": "O(N)",
      "content": "Classic bitmask N-queens.",
      "referenceCode": "avail = ((1 << n) - 1) & ~(cols | diag1 | diag2)"
    },
    "tags": [
      "Backtracking",
      "Bit Manipulation"
    ],
    "testCases": [
      {
        "input": "4",
        "expectedOutput": "2",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "1",
        "expectedOutput": "1",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "8",
        "expectedOutput": "92",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Word Search II Trie Guided Search",
    "slug": "word-search-ii-trie-guided-search",
    "description": "Given an `m x n` board of characters and a list of strings `words`, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells (horizontally or vertically).",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "m == board.length, n == board[i].length, 1 <= m, n <= 12, words.length <= 10^4",
    "inputFormat": "board, words",
    "outputFormat": "Sorted list of found words.",
    "sampleInput": "[[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], [\"oath\",\"pea\",\"eat\",\"rain\"]",
    "sampleOutput": "[\"eat\",\"oath\"]",
    "points": 200,
    "hints": [
      "Build a Trie from the words list and DFS from every cell concurrently matching Trie prefixes."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def findWords(self, board: list, words: list) -> list:\n        pass",
      "javascript": "class Solution {\n    findWords(board, words) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def findWords(self, board: list, words: list) -> list:\n        trie = {}\n        for w in words:\n            node = trie\n            for ch in w:\n                node = node.setdefault(ch, {})\n            node['#'] = w\n        m, n = len(board), len(board[0])\n        res = set()\n        def dfs(r, c, parent):\n            ch = board[r][c]\n            curr = parent[ch]\n            if '#' in curr:\n                res.add(curr['#'])\n            board[r][c] = '#'\n            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < m and 0 <= nc < n and board[nr][nc] in curr:\n                    dfs(nr, nc, curr)\n            board[r][c] = ch\n        for r in range(m):\n            for c in range(n):\n                if board[r][c] in trie:\n                    dfs(r, c, trie)\n        return sorted(list(res))",
      "javascript": "class Solution {\n    findWords(board, words) {\n        const trie = {};\n        for (const w of words) {\n            let node = trie;\n            for (const ch of w) {\n                if (!node[ch]) node[ch] = {};\n                node = node[ch];\n            }\n            node['#'] = w;\n        }\n        const m = board.length, n = board[0].length;\n        const res = new Set();\n        function dfs(r, c, parent) {\n            const ch = board[r][c];\n            const curr = parent[ch];\n            if (curr['#']) res.add(curr['#']);\n            board[r][c] = '#';\n            const dirs = [[-1,0],[1,0],[0,-1],[0,1]];\n            for (const [dr, dc] of dirs) {\n                const nr = r + dr, nc = c + dc;\n                if (nr >= 0 && nr < m && nc >= 0 && nc < n && curr[board[nr][nc]]) {\n                    dfs(nr, nc, curr);\n                }\n            }\n            board[r][c] = ch;\n        }\n        for (let r = 0; r < m; r++) {\n            for (let c = 0; c < n; c++) {\n                if (trie[board[r][c]]) dfs(r, c, trie);\n            }\n        }\n        return Array.from(res).sort();\n    }\n}"
    },
    "editorial": {
      "approach": "Trie-Guided Depth-First Search with Board In-Place Marking.",
      "algorithm": "Insert dictionary into Prefix Trie and simultaneously prune DFS explorations that match no prefix.",
      "timeComplexity": "O(M * N * 4^(L))",
      "spaceComplexity": "O(Sum(Length of Words))",
      "content": "Standard Trie + Backtracking grid search.",
      "referenceCode": "if '#' in curr: res.add(curr['#'])"
    },
    "tags": [
      "Backtracking",
      "Trie",
      "Matrix"
    ],
    "testCases": [
      {
        "input": "[[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], [\"oath\",\"pea\",\"eat\",\"rain\"]",
        "expectedOutput": "[\"eat\",\"oath\"]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[\"a\",\"b\"],[\"c\",\"d\"]], [\"abcb\"]",
        "expectedOutput": "[]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[\"a\"]], [\"a\"]",
        "expectedOutput": "[\"a\"]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Word Ladder II All Shortest Transformation Sequences",
    "slug": "word-ladder-ii-all-shortest-transformation-sequences",
    "description": "Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return all the shortest transformation sequences from `beginWord` to `endWord`.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= beginWord.length <= 5, wordList.length <= 500",
    "inputFormat": "beginWord, endWord, wordList",
    "outputFormat": "Sorted list of shortest paths.",
    "sampleInput": "\"hit\", \"cog\", [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
    "sampleOutput": "[[\"hit\",\"hot\",\"dot\",\"dog\",\"cog\"],[\"hit\",\"hot\",\"lot\",\"log\",\"cog\"]]",
    "points": 200,
    "hints": [
      "Run BFS from beginWord to build parents DAG, then DFS backtrack all paths to reconstruct sequences."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def findLadders(self, beginWord: str, endWord: str, wordList: list) -> list:\n        pass",
      "javascript": "class Solution {\n    findLadders(beginWord, endWord, wordList) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def findLadders(self, beginWord: str, endWord: str, wordList: list) -> list:\n        words = set(wordList)\n        if endWord not in words: return []\n        import collections\n        parents = collections.defaultdict(set)\n        layer = {beginWord}\n        found = False\n        while layer and not found:\n            words -= layer\n            next_layer = set()\n            for word in layer:\n                for i in range(len(word)):\n                    for c in 'abcdefghijklmnopqrstuvwxyz':\n                        cand = word[:i] + c + word[i+1:]\n                        if cand in words:\n                            if cand == endWord: found = True\n                            next_layer.add(cand)\n                            parents[cand].add(word)\n            layer = next_layer\n        res = []\n        def get_paths(w):\n            if w == beginWord: return [[beginWord]]\n            paths = []\n            for p in parents[w]:\n                for path in get_paths(p):\n                    paths.append(path + [w])\n            return paths\n        return sorted(get_paths(endWord)) if found else []",
      "javascript": "class Solution {\n    findLadders(beginWord, endWord, wordList) {\n        const words = new Set(wordList);\n        if (!words.has(endWord)) return [];\n        const parents = new Map();\n        let layer = new Set([beginWord]);\n        let found = false;\n        while (layer.size > 0 && !found) {\n            for (const w of layer) words.delete(w);\n            const nextLayer = new Set();\n            for (const word of layer) {\n                for (let i = 0; i < word.length; i++) {\n                    for (let code = 97; code <= 122; code++) {\n                        const c = String.fromCharCode(code);\n                        const cand = word.slice(0, i) + c + word.slice(i + 1);\n                        if (words.has(cand)) {\n                            if (cand === endWord) found = true;\n                            nextLayer.add(cand);\n                            if (!parents.has(cand)) parents.set(cand, new Set());\n                            parents.get(cand).add(word);\n                        }\n                    }\n                }\n            }\n            layer = nextLayer;\n        }\n        if (!found) return [];\n        function getPaths(w) {\n            if (w === beginWord) return [[beginWord]];\n            const paths = [];\n            const pars = parents.get(w) || [];\n            for (const p of pars) {\n                for (const path of getPaths(p)) {\n                    paths.push([...path, w]);\n                }\n            }\n            return paths;\n        }\n        return getPaths(endWord).sort((a, b) => a.join().localeCompare(b.join()));\n    }\n}"
    },
    "editorial": {
      "approach": "BFS Level-Order Graph Construction + DFS Path Reversal.",
      "algorithm": "Layer-by-layer BFS finds shortest distance, building predecessor graph.",
      "timeComplexity": "O(N * 26 * L + Output Paths)",
      "spaceComplexity": "O(N * L)",
      "content": "Standard BFS + DFS shortest sequence generation.",
      "referenceCode": "parents[cand].add(word)"
    },
    "tags": [
      "Backtracking",
      "Breadth-First Search",
      "Graph"
    ],
    "testCases": [
      {
        "input": "\"hit\", \"cog\", [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
        "expectedOutput": "[[\"hit\",\"hot\",\"dot\",\"dog\",\"cog\"],[\"hit\",\"hot\",\"lot\",\"log\",\"cog\"]]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"hit\", \"cog\", [\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]",
        "expectedOutput": "[]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"a\", \"c\", [\"a\",\"b\",\"c\"]",
        "expectedOutput": "[[\"a\",\"c\"]]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Letter Combinations of a Phone Number Backtracking",
    "slug": "letter-combinations-of-a-phone-number-full",
    "description": "Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order (sorted lexicographically).",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "0 <= digits.length <= 4, digits[i] is in the range ['2', '9']",
    "inputFormat": "digits",
    "outputFormat": "List of string combinations.",
    "sampleInput": "\"23\"",
    "sampleOutput": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
    "points": 100,
    "hints": [
      "Map each digit to letters and recurse."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def letterCombinations(self, digits: str) -> list:\n        pass",
      "javascript": "class Solution {\n    letterCombinations(digits) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def letterCombinations(self, digits: str) -> list:\n        if not digits: return []\n        M = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}\n        res = []\n        def dfs(idx, path):\n            if idx == len(digits):\n                res.append(path)\n                return\n            for ch in M[digits[idx]]:\n                dfs(idx + 1, path + ch)\n        dfs(0, \"\")\n        return sorted(res)",
      "javascript": "class Solution {\n    letterCombinations(digits) {\n        if (!digits) return [];\n        const M = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'};\n        const res = [];\n        function dfs(idx, path) {\n            if (idx === digits.length) {\n                res.push(path);\n                return;\n            }\n            for (const ch of M[digits[idx]]) {\n                dfs(idx + 1, path + ch);\n            }\n        }\n        dfs(0, \"\");\n        return res.sort();\n    }\n}"
    },
    "editorial": {
      "approach": "Direct Depth-First Search Product.",
      "algorithm": "Cartesian product of keypad digit sets.",
      "timeComplexity": "O(4^N)",
      "spaceComplexity": "O(N)",
      "content": "Standard keypad letter combinations.",
      "referenceCode": "for ch in M[digits[idx]]: dfs(idx + 1, path + ch)"
    },
    "tags": [
      "Backtracking",
      "String"
    ],
    "testCases": [
      {
        "input": "\"23\"",
        "expectedOutput": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"\"",
        "expectedOutput": "[]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"2\"",
        "expectedOutput": "[\"a\",\"b\",\"c\"]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Combinations K from N",
    "slug": "combinations-k-from-n-lexicographical",
    "description": "Given two integers `n` and `k`, return all possible combinations of `k` numbers chosen from the range `[1, n]` in sorted order.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 20, 1 <= k <= n",
    "inputFormat": "n, k",
    "outputFormat": "List of combinations.",
    "sampleInput": "4, 2",
    "sampleOutput": "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]",
    "points": 100,
    "hints": [
      "Choose from start to n, ensuring enough numbers remain."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def combine(self, n: int, k: int) -> list:\n        pass",
      "javascript": "class Solution {\n    combine(n, k) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def combine(self, n: int, k: int) -> list:\n        res = []\n        def dfs(start, curr):\n            if len(curr) == k:\n                res.append(list(curr))\n                return\n            for i in range(start, n + 1 - (k - len(curr)) + 1):\n                curr.append(i)\n                dfs(i + 1, curr)\n                curr.pop()\n        dfs(1, [])\n        return res",
      "javascript": "class Solution {\n    combine(n, k) {\n        const res = [];\n        function dfs(start, curr) {\n            if (curr.length === k) {\n                res.push([...curr]);\n                return;\n            }\n            for (let i = start; i <= n - (k - curr.length) + 1; i++) {\n                curr.push(i);\n                dfs(i + 1, curr);\n                curr.pop();\n            }\n        }\n        dfs(1, []);\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Backtracking with Remaining Element Pruning.",
      "algorithm": "Only branch up to n - (k - len(curr)) + 1.",
      "timeComplexity": "O(C(N, K))",
      "spaceComplexity": "O(K)",
      "content": "Standard combination generation.",
      "referenceCode": "curr.append(i); dfs(i + 1, curr); curr.pop()"
    },
    "tags": [
      "Backtracking"
    ],
    "testCases": [
      {
        "input": "4, 2",
        "expectedOutput": "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "1, 1",
        "expectedOutput": "[[1]]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "5, 3",
        "expectedOutput": "[[1,2,3],[1,2,4],[1,2,5],[1,3,4],[1,3,5],[1,4,5],[2,3,4],[2,3,5],[2,4,5],[3,4,5]]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Subsets II With Duplicate Elements",
    "slug": "subsets-ii-with-duplicate-elements",
    "description": "Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 10, -10 <= nums[i] <= 10",
    "inputFormat": "nums",
    "outputFormat": "List of unique subsets.",
    "sampleInput": "[1,2,2]",
    "sampleOutput": "[[],[1],[1,2],[1,2,2],[2],[2,2]]",
    "points": 100,
    "hints": [
      "Sort the array and skip duplicates: if i > start and nums[i] == nums[i-1], skip."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def subsetsWithDup(self, nums: list) -> list:\n        pass",
      "javascript": "class Solution {\n    subsetsWithDup(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def subsetsWithDup(self, nums: list) -> list:\n        nums.sort()\n        res = []\n        def dfs(start, curr):\n            res.append(list(curr))\n            for i in range(start, len(nums)):\n                if i > start and nums[i] == nums[i - 1]:\n                    continue\n                curr.append(nums[i])\n                dfs(i + 1, curr)\n                curr.pop()\n        dfs(0, [])\n        return res",
      "javascript": "class Solution {\n    subsetsWithDup(nums) {\n        nums.sort((a, b) => a - b);\n        const res = [];\n        function dfs(start, curr) {\n            res.push([...curr]);\n            for (let i = start; i < nums.length; i++) {\n                if (i > start && nums[i] === nums[i - 1]) continue;\n                curr.push(nums[i]);\n                dfs(i + 1, curr);\n                curr.pop();\n            }\n        }\n        dfs(0, []);\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Sorted Subsets with Sibling Skipping.",
      "algorithm": "Sort input and skip adjacent duplicate elements at the same recursion depth.",
      "timeComplexity": "O(2^N)",
      "spaceComplexity": "O(N)",
      "content": "Power set generation with deduplication.",
      "referenceCode": "if i > start and nums[i] == nums[i - 1]: continue"
    },
    "tags": [
      "Backtracking",
      "Array"
    ],
    "testCases": [
      {
        "input": "[1,2,2]",
        "expectedOutput": "[[],[1],[1,2],[1,2,2],[2],[2,2]]",
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
        "input": "[4,4,4,1,4]",
        "expectedOutput": "[[],[1],[1,4],[1,4,4],[1,4,4,4],[1,4,4,4,4],[4],[4,4],[4,4,4],[4,4,4,4]]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Permutations II With Duplicates",
    "slug": "permutations-ii-with-duplicates-unique",
    "description": "Given a collection of numbers, `nums`, that might contain duplicates, return all possible unique permutations in any order.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums.length <= 8, -10 <= nums[i] <= 10",
    "inputFormat": "nums",
    "outputFormat": "List of unique permutations.",
    "sampleInput": "[1,1,2]",
    "sampleOutput": "[[1,1,2],[1,2,1],[2,1,1]]",
    "points": 100,
    "hints": [
      "Sort nums and use a visited array. Skip duplicates if previous equal element was not used in current step."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def permuteUnique(self, nums: list) -> list:\n        pass",
      "javascript": "class Solution {\n    permuteUnique(nums) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def permuteUnique(self, nums: list) -> list:\n        nums.sort()\n        res = []\n        used = [False] * len(nums)\n        def dfs(curr):\n            if len(curr) == len(nums):\n                res.append(list(curr))\n                return\n            for i in range(len(nums)):\n                if used[i]: continue\n                if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]:\n                    continue\n                used[i] = True\n                curr.append(nums[i])\n                dfs(curr)\n                curr.pop()\n                used[i] = False\n        dfs([])\n        return res",
      "javascript": "class Solution {\n    permuteUnique(nums) {\n        nums.sort((a, b) => a - b);\n        const res = [];\n        const used = Array(nums.length).fill(false);\n        function dfs(curr) {\n            if (curr.length === nums.length) {\n                res.push([...curr]);\n                return;\n            }\n            for (let i = 0; i < nums.length; i++) {\n                if (used[i]) continue;\n                if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;\n                used[i] = true;\n                curr.push(nums[i]);\n                dfs(curr);\n                curr.pop();\n                used[i] = false;\n            }\n        }\n        dfs([]);\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Visited Array Deduplicated Permutations.",
      "algorithm": "Sort and ensure identical elements are chosen in strict index order.",
      "timeComplexity": "O(N!)",
      "spaceComplexity": "O(N)",
      "content": "Standard duplicate-handling permutation generation.",
      "referenceCode": "if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]: continue"
    },
    "tags": [
      "Backtracking",
      "Array"
    ],
    "testCases": [
      {
        "input": "[1,1,2]",
        "expectedOutput": "[[1,1,2],[1,2,1],[2,1,1]]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1,2,3]",
        "expectedOutput": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[2,2,1,1]",
        "expectedOutput": "[[1,1,2,2],[1,2,1,2],[1,2,2,1],[2,1,1,2],[2,1,2,1],[2,2,1,1]]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Combinatorial Target Sum III",
    "slug": "combinatorial-target-sum-iii-digits",
    "description": "Find all valid combinations of `k` numbers that add up to `n` such that only numbers from 1 to 9 are used and each number is used at most once.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "2 <= k <= 9, 1 <= n <= 60",
    "inputFormat": "k, n",
    "outputFormat": "List of combinations.",
    "sampleInput": "3, 7",
    "sampleOutput": "[[1,2,4]]",
    "points": 100,
    "hints": [
      "Backtrack picking distinct digits 1 through 9 until k numbers sum to n."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def combinationSum3(self, k: int, n: int) -> list:\n        pass",
      "javascript": "class Solution {\n    combinationSum3(k, n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def combinationSum3(self, k: int, n: int) -> list:\n        res = []\n        def dfs(start, curr, rem):\n            if len(curr) == k:\n                if rem == 0: res.append(list(curr))\n                return\n            for d in range(start, 10):\n                if d > rem: break\n                curr.append(d)\n                dfs(d + 1, curr, rem - d)\n                curr.pop()\n        dfs(1, [], n)\n        return res",
      "javascript": "class Solution {\n    combinationSum3(k, n) {\n        const res = [];\n        function dfs(start, curr, rem) {\n            if (curr.length === k) {\n                if (rem === 0) res.push([...curr]);\n                return;\n            }\n            for (let d = start; d <= 9; d++) {\n                if (d > rem) break;\n                curr.push(d);\n                dfs(d + 1, curr, rem - d);\n                curr.pop();\n            }\n        }\n        dfs(1, [], n);\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Digit Range Bounded Backtracking.",
      "algorithm": "Branch over digits 1..9 maintaining k-length constraint.",
      "timeComplexity": "O(C(9, K))",
      "spaceComplexity": "O(K)",
      "content": "Standard fixed-size bounded combination search.",
      "referenceCode": "dfs(d + 1, curr, rem - d)"
    },
    "tags": [
      "Backtracking"
    ],
    "testCases": [
      {
        "input": "3, 7",
        "expectedOutput": "[[1,2,4]]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "3, 9",
        "expectedOutput": "[[1,2,6],[1,3,5],[2,3,4]]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "4, 1",
        "expectedOutput": "[]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Optimal Account Balancing Debt Simplification",
    "slug": "optimal-account-balancing-debt-simplification",
    "description": "Given a list of transactions where `transactions[i] = [from_i, to_i, amount]`, return the minimum number of transactions required to settle all debt.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "transactions.length <= 8, 0 <= from, to < 12",
    "inputFormat": "transactions",
    "outputFormat": "Minimum transactions count.",
    "sampleInput": "[[0,1,10],[2,0,5]]",
    "sampleOutput": "2",
    "points": 200,
    "hints": [
      "Compute net balances for all people, discard zero balances, and use backtracking to match debts."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def minTransfers(self, transactions: list) -> int:\n        pass",
      "javascript": "class Solution {\n    minTransfers(transactions) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def minTransfers(self, transactions: list) -> int:\n        import collections\n        bal = collections.defaultdict(int)\n        for u, v, amt in transactions:\n            bal[u] -= amt\n            bal[v] += amt\n        debt = [b for b in bal.values() if b != 0]\n        def dfs(idx):\n            while idx < len(debt) and debt[idx] == 0:\n                idx += 1\n            if idx == len(debt): return 0\n            res = float('inf')\n            for i in range(idx + 1, len(debt)):\n                if debt[idx] * debt[i] < 0:\n                    debt[i] += debt[idx]\n                    res = min(res, 1 + dfs(idx + 1))\n                    debt[i] -= debt[idx]\n            return res\n        return dfs(0)",
      "javascript": "class Solution {\n    minTransfers(transactions) {\n        const bal = new Map();\n        for (const [u, v, amt] of transactions) {\n            bal.set(u, (bal.get(u) || 0) - amt);\n            bal.set(v, (bal.get(v) || 0) + amt);\n        }\n        const debt = Array.from(bal.values()).filter(b => b !== 0);\n        function dfs(idx) {\n            while (idx < debt.length && debt[idx] === 0) idx++;\n            if (idx === debt.length) return 0;\n            let res = Infinity;\n            for (let i = idx + 1; i < debt.length; i++) {\n                if (debt[idx] * debt[i] < 0) {\n                    debt[i] += debt[idx];\n                    res = Math.min(res, 1 + dfs(idx + 1));\n                    debt[i] -= debt[idx];\n                }\n            }\n            return res;\n        }\n        return dfs(0);\n    }\n}"
    },
    "editorial": {
      "approach": "Net Balance Cancellation Search.",
      "algorithm": "Backtrack over debt transfers, prioritizing complementary balance pairs.",
      "timeComplexity": "O(N!)",
      "spaceComplexity": "O(N)",
      "content": "Classic NP-hard debt settlement problem.",
      "referenceCode": "debt[i] += debt[idx]; res = min(res, 1 + dfs(idx + 1))"
    },
    "tags": [
      "Backtracking",
      "Dynamic Programming"
    ],
    "testCases": [
      {
        "input": "[[0,1,10],[2,0,5]]",
        "expectedOutput": "2",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[0,1,10],[1,0,1],[1,2,5],[2,0,5]]",
        "expectedOutput": "1",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[0,1,1],[1,2,1],[2,0,1]]",
        "expectedOutput": "0",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Generate Parentheses Catalan Sequences",
    "slug": "generate-parentheses-catalan-sequences",
    "description": "Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses in lexicographical order.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 8",
    "inputFormat": "n",
    "outputFormat": "List of valid parentheses strings.",
    "sampleInput": "3",
    "sampleOutput": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
    "points": 100,
    "hints": [
      "Add opening parenthesis if open < n, add closing parenthesis if close < open."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def generateParenthesis(self, n: int) -> list:\n        pass",
      "javascript": "class Solution {\n    generateParenthesis(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def generateParenthesis(self, n: int) -> list:\n        res = []\n        def dfs(curr, open_c, close_c):\n            if len(curr) == 2 * n:\n                res.append(curr)\n                return\n            if open_c < n:\n                dfs(curr + '(', open_c + 1, close_c)\n            if close_c < open_c:\n                dfs(curr + ')', open_c, close_c + 1)\n        dfs(\"\", 0, 0)\n        return res",
      "javascript": "class Solution {\n    generateParenthesis(n) {\n        const res = [];\n        function dfs(curr, openC, closeC) {\n            if (curr.length === 2 * n) {\n                res.push(curr);\n                return;\n            }\n            if (openC < n) dfs(curr + '(', openC + 1, closeC);\n            if (closeC < openC) dfs(curr + ')', openC, closeC + 1);\n        }\n        dfs(\"\", 0, 0);\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Catalan Backtracking Branching.",
      "algorithm": "Constrain open and close count balances.",
      "timeComplexity": "O(4^N / sqrt(N))",
      "spaceComplexity": "O(N)",
      "content": "Standard Dyck path generation.",
      "referenceCode": "if close_c < open_c: dfs(curr + ')', open_c, close_c + 1)"
    },
    "tags": [
      "Backtracking",
      "String"
    ],
    "testCases": [
      {
        "input": "3",
        "expectedOutput": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "1",
        "expectedOutput": "[\"()\"]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "2",
        "expectedOutput": "[\"(())\",\"()()\"]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Word Break II All Sentence Reconstructions",
    "slug": "word-break-ii-all-sentence-reconstructions",
    "description": "Given a string `s` and a dictionary of strings `wordDict`, add spaces in `s` to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in lexicographical order.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= s.length <= 20, 1 <= wordDict.length <= 100",
    "inputFormat": "s, wordDict",
    "outputFormat": "List of valid sentence strings.",
    "sampleInput": "\"catsanddog\", [\"cat\",\"cats\",\"and\",\"sand\",\"dog\"]",
    "sampleOutput": "[\"cat sand dog\",\"cats and dog\"]",
    "points": 200,
    "hints": [
      "Use memoized DFS from index 0 returning list of sentences formed from substring."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def wordBreak(self, s: str, wordDict: list) -> list:\n        pass",
      "javascript": "class Solution {\n    wordBreak(s, wordDict) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def wordBreak(self, s: str, wordDict: list) -> list:\n        words = set(wordDict)\n        memo = {}\n        def dfs(sub):\n            if sub in memo: return memo[sub]\n            if not sub: return [\"\"]\n            res = []\n            for w in words:\n                if sub.startswith(w):\n                    rest = dfs(sub[len(w):])\n                    for r in rest:\n                        res.append((w + \" \" + r).strip())\n            memo[sub] = res\n            return res\n        return sorted(dfs(s))",
      "javascript": "class Solution {\n    wordBreak(s, wordDict) {\n        const words = new Set(wordDict);\n        const memo = new Map();\n        function dfs(sub) {\n            if (memo.has(sub)) return memo.get(sub);\n            if (sub === \"\") return [\"\"];\n            const res = [];\n            for (const w of words) {\n                if (sub.startsWith(w)) {\n                    const rest = dfs(sub.slice(w.length));\n                    for (const r of rest) {\n                        res.push((w + \" \" + r).trim());\n                    }\n                }\n            }\n            memo.set(sub, res);\n            return res;\n        }\n        return dfs(s).sort();\n    }\n}"
    },
    "editorial": {
      "approach": "Memoized Top-Down Parsing.",
      "algorithm": "Suffix memoization prevents redundant combinatorial sentence building.",
      "timeComplexity": "O(N * 2^N)",
      "spaceComplexity": "O(2^N)",
      "content": "Standard word break sentence builder.",
      "referenceCode": "memo[sub] = res"
    },
    "tags": [
      "Backtracking",
      "Dynamic Programming",
      "Trie"
    ],
    "testCases": [
      {
        "input": "\"catsanddog\", [\"cat\",\"cats\",\"and\",\"sand\",\"dog\"]",
        "expectedOutput": "[\"cat sand dog\",\"cats and dog\"]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"pineapplepenapple\", [\"apple\",\"pen\",\"applepen\",\"pine\",\"pineapple\"]",
        "expectedOutput": "[\"pine apple pen apple\",\"pine applepen apple\",\"pineapple pen apple\"]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"catsandog\", [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]",
        "expectedOutput": "[]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Palindrome Partitioning All Decompositions",
    "slug": "palindrome-partitioning-all-decompositions",
    "description": "Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return all possible palindrome partitionings of `s`.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= s.length <= 16",
    "inputFormat": "s",
    "outputFormat": "List of palindrome partitions.",
    "sampleInput": "\"aab\"",
    "sampleOutput": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]",
    "points": 100,
    "hints": [
      "Precompute isPalindrome table or check on the fly, then backtrack over partition split points."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def partition(self, s: str) -> list:\n        pass",
      "javascript": "class Solution {\n    partition(s) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def partition(self, s: str) -> list:\n        res = []\n        def is_pal(sub):\n            return sub == sub[::-1]\n        def dfs(idx, curr):\n            if idx == len(s):\n                res.append(list(curr))\n                return\n            for i in range(idx + 1, len(s) + 1):\n                sub = s[idx:i]\n                if is_pal(sub):\n                    curr.append(sub)\n                    dfs(i, curr)\n                    curr.pop()\n        dfs(0, [])\n        return res",
      "javascript": "class Solution {\n    partition(s) {\n        const res = [];\n        function isPal(sub) {\n            let l = 0, r = sub.length - 1;\n            while (l < r) {\n                if (sub[l++] !== sub[r--]) return false;\n            }\n            return true;\n        }\n        function dfs(idx, curr) {\n            if (idx === s.length) {\n                res.push([...curr]);\n                return;\n            }\n            for (let i = idx + 1; i <= s.length; i++) {\n                const sub = s.slice(idx, i);\n                if (isPal(sub)) {\n                    curr.push(sub);\n                    dfs(i, curr);\n                    curr.pop();\n                }\n            }\n        }\n        dfs(0, []);\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Palindromic Substring Backtracking.",
      "algorithm": "Greedily test palindrome prefixes and recurse on remainder.",
      "timeComplexity": "O(N * 2^N)",
      "spaceComplexity": "O(N)",
      "content": "Standard palindrome decomposition.",
      "referenceCode": "if is_pal(sub): curr.append(sub); dfs(i, curr); curr.pop()"
    },
    "tags": [
      "Backtracking",
      "String",
      "Dynamic Programming"
    ],
    "testCases": [
      {
        "input": "\"aab\"",
        "expectedOutput": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"a\"",
        "expectedOutput": "[[\"a\"]]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"racecar\"",
        "expectedOutput": "[[\"r\",\"a\",\"c\",\"e\",\"c\",\"a\",\"r\"],[\"r\",\"a\",\"cec\",\"a\",\"r\"],[\"r\",\"aceca\",\"r\"],[\"racecar\"]]",
        "isHidden": true,
        "order": 2
      }
    ]
  }
];
