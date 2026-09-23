import { ProblemSpec, writePack } from './pack-writer-util';

// PACK G: Backtracking & Exhaustive Search (19 problems)
const problemsG: ProblemSpec[] = [
  {
    title: 'Meet in the Middle Partitioning Target Sum',
    slug: 'meet-in-the-middle-partitioning-target-sum',
    description: `Given an array of $N$ integers ($N \\le 36$) and a target integer $S$, determine if there exists a non-empty subsequence whose sum equals $S$.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= N <= 36, -10^9 <= nums[i], S <= 10^9`,
    inputFormat: `nums, S`,
    outputFormat: `Boolean true/false.`,
    sampleInput: `[1,3,9,27,81], 31`,
    sampleOutput: `true`,
    points: 200,
    hints: ['Split array into two halves of size N/2 and generate all subset sums for each half.'],
    codeTemplates: {
      python: `class Solution:\n    def hasTargetSum(self, nums: list, S: int) -> bool:\n        pass`,
      javascript: `class Solution {\n    hasTargetSum(nums, S) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def hasTargetSum(self, nums: list, S: int) -> bool:
        n = len(nums)
        if n == 0: return False
        mid = n // 2
        left, right = nums[:mid], nums[mid:]
        def get_sums(arr):
            sums = {0}
            for x in arr:
                sums |= {s + x for s in sums}
            return sums
        s1 = get_sums(left)
        s2 = get_sums(right)
        for val in s1:
            if S - val in s2:
                if val == 0 and S - val == 0 and S != 0:
                    continue
                return True
        return False`,
      javascript: `class Solution {
    hasTargetSum(nums, S) {
        const n = nums.length;
        if (n === 0) return false;
        const mid = Math.floor(n / 2);
        const left = nums.slice(0, mid);
        const right = nums.slice(mid);
        const getSums = (arr) => {
            let sums = new Set([0]);
            for (const x of arr) {
                const next = new Set(sums);
                for (const s of sums) next.add(s + x);
                sums = next;
            }
            return sums;
        };
        const s1 = getSums(left);
        const s2 = getSums(right);
        for (const val of s1) {
            if (s2.has(S - val)) return true;
        }
        return false;
    }
}`,
    },
    editorial: {
      approach: 'Meet in the Middle Subsequence Generation.',
      algorithm: 'Divide array into two halves of length <= 18. Generate 2^(N/2) sums for each and intersect.',
      timeComplexity: 'O(2^(N/2))',
      spaceComplexity: 'O(2^(N/2))',
      content: 'Standard meet in the middle for knapsack / subset sum.',
      referenceCode: `s1 = get_sums(left); s2 = get_sums(right); return any(S - v in s2 for v in s1)`,
    },
    tags: ['Backtracking', 'Meet in the Middle', 'Bit Manipulation'],
    testCases: [
      { input: `[1,3,9,27,81], 31`, expectedOutput: `true`, isHidden: false, order: 0 },
      { input: `[1,2,4,8], 16`, expectedOutput: `false`, isHidden: false, order: 1 },
      { input: `[-5,10,20,-30], 25`, expectedOutput: `true`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Twenty Four Game Evaluation',
    slug: 'twenty-four-game-evaluation',
    description: `You have 4 cards each containing a number from 1 to 9. You need to judge whether they can operate through *, /, +, -, (, ) to get the value of 24.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `cards.length == 4, 1 <= cards[i] <= 9`,
    inputFormat: `cards`,
    outputFormat: `Boolean true/false.`,
    sampleInput: `[4,1,8,7]`,
    sampleOutput: `true`,
    points: 200,
    hints: ['Pick any two numbers, apply one of 4 operators (+, -, *, /), replace the two numbers with the result, and recurse.'],
    codeTemplates: {
      python: `class Solution:\n    def judgePoint24(self, cards: list) -> bool:\n        pass`,
      javascript: `class Solution {\n    judgePoint24(cards) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def judgePoint24(self, cards: list) -> bool:
        EPS = 1e-6
        def solve(nums):
            if len(nums) == 1:
                return abs(nums[0] - 24) < EPS
            for i in range(len(nums)):
                for j in range(len(nums)):
                    if i != j:
                        next_nums = [nums[k] for k in range(len(nums)) if k != i and k != j]
                        a, b = nums[i], nums[j]
                        cands = [a + b, a - b, b - a, a * b]
                        if abs(b) > EPS: cands.append(a / b)
                        if abs(a) > EPS: cands.append(b / a)
                        for c in cands:
                            if solve(next_nums + [c]):
                                return True
            return False
        return solve([float(x) for x in cards])`,
      javascript: `class Solution {
    judgePoint24(cards) {
        const EPS = 1e-6;
        function solve(nums) {
            if (nums.length === 1) return Math.abs(nums[0] - 24) < EPS;
            for (let i = 0; i < nums.length; i++) {
                for (let j = 0; j < nums.length; j++) {
                    if (i !== j) {
                        const rest = nums.filter((_, idx) => idx !== i && idx !== j);
                        const a = nums[i], b = nums[j];
                        const ops = [a + b, a - b, b - a, a * b];
                        if (Math.abs(b) > EPS) ops.push(a / b);
                        if (Math.abs(a) > EPS) ops.push(b / a);
                        for (const op of ops) {
                            if (solve([...rest, op])) return true;
                        }
                    }
                }
            }
            return false;
        }
        return solve(cards.map(Number));
    }
}`,
    },
    editorial: {
      approach: 'Exhaustive Backtracking over Expression Trees.',
      algorithm: 'Recursively combine pairs of numbers with basic arithmetic operations.',
      timeComplexity: 'O(1) (fixed 4 numbers: 4! * 3! * 4^3 branches)',
      spaceComplexity: 'O(1)',
      content: 'Standard 24-game recursive search.',
      referenceCode: `solve(next_nums + [cand])`,
    },
    tags: ['Backtracking', 'Math', 'Recursion'],
    testCases: [
      { input: `[4,1,8,7]`, expectedOutput: `true`, isHidden: false, order: 0 },
      { input: `[1,2,1,2]`, expectedOutput: `false`, isHidden: false, order: 1 },
      { input: `[3,3,8,8]`, expectedOutput: `true`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Expression Add Operators All Targets',
    slug: 'expression-add-operators-all-targets',
    description: `Given a string \`num\` that contains only digits and an integer \`target\`, return all possibilities to insert binary operators \`+\`, \`-\`, and/or \`*\` between the digits of \`num\` so that the resultant expression evaluates to \`target\`.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= num.length <= 10, -2^31 <= target <= 2^31 - 1`,
    inputFormat: `num, target`,
    outputFormat: `List of valid expression strings sorted lexicographically.`,
    sampleInput: `"123", 6`,
    sampleOutput: `["1+2+3","1*2*3"]`,
    points: 200,
    hints: ['Track current value and previous multiplied operand to handle operator precedence.'],
    codeTemplates: {
      python: `class Solution:\n    def addOperators(self, num: str, target: int) -> list:\n        pass`,
      javascript: `class Solution {\n    addOperators(num, target) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def addOperators(self, num: str, target: int) -> list:
        res = []
        def dfs(idx, path, val, prev):
            if idx == len(num):
                if val == target:
                    res.append(path)
                return
            for i in range(idx + 1, len(num) + 1):
                s = num[idx:i]
                if len(s) > 1 and s[0] == '0':
                    break
                curr = int(s)
                if idx == 0:
                    dfs(i, s, curr, curr)
                else:
                    dfs(i, path + '+' + s, val + curr, curr)
                    dfs(i, path + '-' + s, val - curr, -curr)
                    dfs(i, path + '*' + s, val - prev + prev * curr, prev * curr)
        dfs(0, "", 0, 0)
        return sorted(res)`,
      javascript: `class Solution {
    addOperators(num, target) {
        const res = [];
        function dfs(idx, path, val, prev) {
            if (idx === num.length) {
                if (val === target) res.push(path);
                return;
            }
            for (let i = idx + 1; i <= num.length; i++) {
                const s = num.slice(idx, i);
                if (s.length > 1 && s[0] === '0') break;
                const curr = Number(s);
                if (idx === 0) {
                    dfs(i, s, curr, curr);
                } else {
                    dfs(i, path + '+' + s, val + curr, curr);
                    dfs(i, path + '-' + s, val - curr, -curr);
                    dfs(i, path + '*' + s, val - prev + prev * curr, prev * curr);
                }
            }
        }
        dfs(0, "", 0, 0);
        return res.sort();
    }
}`,
    },
    editorial: {
      approach: 'Backtracking with Operator Precedence Maintenance.',
      algorithm: 'Maintain prev operand to subtract and multiply when encountering multiplication operator.',
      timeComplexity: 'O(4^N)',
      spaceComplexity: 'O(N)',
      content: 'Standard expression generation with precedence evaluation.',
      referenceCode: `val - prev + prev * curr`,
    },
    tags: ['Backtracking', 'String', 'Math'],
    testCases: [
      { input: `"123", 6`, expectedOutput: `["1*2*3","1+2+3"]`, isHidden: false, order: 0 },
      { input: `"232", 8`, expectedOutput: `["2*3+2","2+3*2"]`, isHidden: false, order: 1 },
      { input: `"105", 5`, expectedOutput: `["1*0+5","10-5"]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Restore IP Addresses Parsing',
    slug: 'restore-ip-addresses-parsing',
    description: `A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros. Given a string \`s\` containing only digits, return all possible valid IP addresses that can be formed by inserting dots.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= s.length <= 20`,
    inputFormat: `s`,
    outputFormat: `List of valid IP address strings sorted lexicographically.`,
    sampleInput: `"25525511135"`,
    sampleOutput: `["255.255.11.135","255.255.111.35"]`,
    points: 150,
    hints: ['Recursively place 3 dots to split into 4 parts, checking if each part is between 0 and 255 without leading zero.'],
    codeTemplates: {
      python: `class Solution:\n    def restoreIpAddresses(self, s: str) -> list:\n        pass`,
      javascript: `class Solution {\n    restoreIpAddresses(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def restoreIpAddresses(self, s: str) -> list:
        res = []
        def dfs(idx, parts):
            if len(parts) == 4:
                if idx == len(s):
                    res.append('.'.join(parts))
                return
            for length in range(1, 4):
                if idx + length <= len(s):
                    sub = s[idx:idx+length]
                    if (len(sub) == 1 or sub[0] != '0') and int(sub) <= 255:
                        dfs(idx + length, parts + [sub])
        dfs(0, [])
        return sorted(res)`,
      javascript: `class Solution {
    restoreIpAddresses(s) {
        const res = [];
        function dfs(idx, parts) {
            if (parts.length === 4) {
                if (idx === s.length) res.push(parts.join('.'));
                return;
            }
            for (let len = 1; len <= 3; len++) {
                if (idx + len <= s.length) {
                    const sub = s.slice(idx, idx + len);
                    if ((sub.length === 1 || sub[0] !== '0') && Number(sub) <= 255) {
                        dfs(idx + len, [...parts, sub]);
                    }
                }
            }
        }
        dfs(0, []);
        return res.sort();
    }
}`,
    },
    editorial: {
      approach: '4-Way Backtracking Partitioning.',
      algorithm: 'Branch on lengths 1, 2, and 3, validating leading zero and 0-255 bound.',
      timeComplexity: 'O(3^4) = O(1)',
      spaceComplexity: 'O(1)',
      content: 'Standard string partitioning.',
      referenceCode: `dfs(idx + length, parts + [sub])`,
    },
    tags: ['Backtracking', 'String'],
    testCases: [
      { input: `"25525511135"`, expectedOutput: `["255.255.11.135","255.255.111.35"]`, isHidden: false, order: 0 },
      { input: `"0000"`, expectedOutput: `["0.0.0.0"]`, isHidden: false, order: 1 },
      { input: `"101023"`, expectedOutput: `["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Matchsticks to Square Partition',
    slug: 'matchsticks-to-square-partition',
    description: `You are given an integer array \`matchsticks\` where \`matchsticks[i]\` is the length of the \`i\`-th matchstick. You want to use all the matchsticks to make one square. Return \`true\` if you can make this square and \`false\` otherwise.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= matchsticks.length <= 15, 1 <= matchsticks[i] <= 10^8`,
    inputFormat: `matchsticks`,
    outputFormat: `Boolean true/false.`,
    sampleInput: `[1,1,2,2,2]`,
    sampleOutput: `true`,
    points: 150,
    hints: ['Total sum must be divisible by 4. Sort descending to prune failed branches early.'],
    codeTemplates: {
      python: `class Solution:\n    def makesquare(self, matchsticks: list) -> bool:\n        pass`,
      javascript: `class Solution {\n    makesquare(matchsticks) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def makesquare(self, matchsticks: list) -> bool:
        total = sum(matchsticks)
        if total % 4 != 0 or len(matchsticks) < 4: return False
        side = total // 4
        matchsticks.sort(reverse=True)
        if matchsticks[0] > side: return False
        sides = [0] * 4
        def dfs(idx):
            if idx == len(matchsticks):
                return True
            for i in range(4):
                if sides[i] + matchsticks[idx] <= side:
                    sides[i] += matchsticks[idx]
                    if dfs(idx + 1): return True
                    sides[i] -= matchsticks[idx]
                if sides[i] == 0: break
            return False
        return dfs(0)`,
      javascript: `class Solution {
    makesquare(matchsticks) {
        const total = matchsticks.reduce((a, b) => a + b, 0);
        if (total % 4 !== 0 || matchsticks.length < 4) return false;
        const side = Math.floor(total / 4);
        matchsticks.sort((a, b) => b - a);
        if (matchsticks[0] > side) return false;
        const sides = [0, 0, 0, 0];
        function dfs(idx) {
            if (idx === matchsticks.length) return true;
            for (let i = 0; i < 4; i++) {
                if (sides[i] + matchsticks[idx] <= side) {
                    sides[i] += matchsticks[idx];
                    if (dfs(idx + 1)) return true;
                    sides[i] -= matchsticks[idx];
                }
                if (sides[i] === 0) break;
            }
            return false;
        }
        return dfs(0);
    }
}`,
    },
    editorial: {
      approach: 'Pruned Backtracking with Descending Sort.',
      algorithm: 'Sort descending to place larger sticks first and break symmetric states when sides[i] == 0.',
      timeComplexity: 'O(4^N)',
      spaceComplexity: 'O(N)',
      content: 'Classic 4-subset partitioning.',
      referenceCode: `sides[i] += matchsticks[idx]; if dfs(idx + 1): return True`,
    },
    tags: ['Backtracking', 'Bit Manipulation', 'Dynamic Programming'],
    testCases: [
      { input: `[1,1,2,2,2]`, expectedOutput: `true`, isHidden: false, order: 0 },
      { input: `[3,3,3,3,4]`, expectedOutput: `false`, isHidden: false, order: 1 },
      { input: `[5,5,5,5,4,4,4,4,3,3,3,3]`, expectedOutput: `true`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Partition to K Equal Sum Subsets',
    slug: 'partition-to-k-equal-sum-subsets-backtrack',
    description: `Given an integer array \`nums\` and an integer \`k\`, return \`true\` if it is possible to divide this array into \`k\` non-empty subsets whose sums are all equal.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= k <= nums.length <= 16, 1 <= nums[i] <= 10^4`,
    inputFormat: `nums, k`,
    outputFormat: `Boolean true/false.`,
    sampleInput: `[4,3,2,3,5,2,1], 4`,
    sampleOutput: `true`,
    points: 150,
    hints: ['Target sum is sum(nums) / k. Use bitmask or sorted backtracking with pruning.'],
    codeTemplates: {
      python: `class Solution:\n    def canPartitionKSubsets(self, nums: list, k: int) -> bool:\n        pass`,
      javascript: `class Solution {\n    canPartitionKSubsets(nums, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def canPartitionKSubsets(self, nums: list, k: int) -> bool:
        total = sum(nums)
        if total % k != 0: return False
        target = total // k
        nums.sort(reverse=True)
        if nums[0] > target: return False
        buckets = [0] * k
        def dfs(idx):
            if idx == len(nums):
                return True
            for i in range(k):
                if buckets[i] + nums[idx] <= target:
                    buckets[i] += nums[idx]
                    if dfs(idx + 1): return True
                    buckets[i] -= nums[idx]
                if buckets[i] == 0: break
            return False
        return dfs(0)`,
      javascript: `class Solution {
    canPartitionKSubsets(nums, k) {
        const total = nums.reduce((a, b) => a + b, 0);
        if (total % k !== 0) return false;
        const target = Math.floor(total / k);
        nums.sort((a, b) => b - a);
        if (nums[0] > target) return false;
        const buckets = Array(k).fill(0);
        function dfs(idx) {
            if (idx === nums.length) return true;
            for (let i = 0; i < k; i++) {
                if (buckets[i] + nums[idx] <= target) {
                    buckets[i] += nums[idx];
                    if (dfs(idx + 1)) return true;
                    buckets[i] -= nums[idx];
                }
                if (buckets[i] === 0) break;
            }
            return false;
        }
        return dfs(0);
    }
}`,
    },
    editorial: {
      approach: 'Bucket Backtracking with Symmetry Breaking.',
      algorithm: 'Sort descending and prune identical empty buckets.',
      timeComplexity: 'O(k^N)',
      spaceComplexity: 'O(N)',
      content: 'Standard k-subset partition search.',
      referenceCode: `if buckets[i] == 0: break`,
    },
    tags: ['Backtracking', 'Bit Manipulation', 'Dynamic Programming'],
    testCases: [
      { input: `[4,3,2,3,5,2,1], 4`, expectedOutput: `true`, isHidden: false, order: 0 },
      { input: `[1,2,3,4], 3`, expectedOutput: `false`, isHidden: false, order: 1 },
      { input: `[2,2,2,2,3,4,5], 4`, expectedOutput: `false`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Sudoku Solver Grid Completer',
    slug: 'sudoku-solver-grid-completer',
    description: `Write a program to solve a Sudoku puzzle by filling empty cells (denoted by \`.\`). A sudoku solution must satisfy all standard 1-9 row, column, and 3x3 subgrid constraints.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `board.length == 9, board[i].length == 9`,
    inputFormat: `board`,
    outputFormat: `Solved 9x9 board array.`,
    sampleInput: `[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]`,
    sampleOutput: `[["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]`,
    points: 200,
    hints: ['Keep track of used digits per row, column, and 3x3 block, then place digits and backtrack.'],
    codeTemplates: {
      python: `class Solution:\n    def solveSudoku(self, board: list) -> list:\n        pass`,
      javascript: `class Solution {\n    solveSudoku(board) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def solveSudoku(self, board: list) -> list:
        rows = [set() for _ in range(9)]
        cols = [set() for _ in range(9)]
        boxes = [set() for _ in range(9)]
        empty = []
        for r in range(9):
            for c in range(9):
                ch = board[r][c]
                if ch != '.':
                    rows[r].add(ch)
                    cols[c].add(ch)
                    boxes[(r//3)*3 + (c//3)].add(ch)
                else:
                    empty.append((r, c))
        def backtrack(k):
            if k == len(empty):
                return True
            r, c = empty[k]
            b = (r//3)*3 + (c//3)
            for d in map(str, range(1, 10)):
                if d not in rows[r] and d not in cols[c] and d not in boxes[b]:
                    board[r][c] = d
                    rows[r].add(d); cols[c].add(d); boxes[b].add(d)
                    if backtrack(k + 1): return True
                    rows[r].remove(d); cols[c].remove(d); boxes[b].remove(d)
                    board[r][c] = '.'
            return False
        backtrack(0)
        return board`,
      javascript: `class Solution {
    solveSudoku(board) {
        const rows = Array.from({ length: 9 }, () => new Set());
        const cols = Array.from({ length: 9 }, () => new Set());
        const boxes = Array.from({ length: 9 }, () => new Set());
        const empty = [];
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const ch = board[r][c];
                if (ch !== '.') {
                    rows[r].add(ch);
                    cols[c].add(ch);
                    boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)].add(ch);
                } else {
                    empty.push([r, c]);
                }
            }
        }
        function backtrack(k) {
            if (k === empty.length) return true;
            const [r, c] = empty[k];
            const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
            for (let d = 1; d <= 9; d++) {
                const s = String(d);
                if (!rows[r].has(s) && !cols[c].has(s) && !boxes[b].has(s)) {
                    board[r][c] = s;
                    rows[r].add(s); cols[c].add(s); boxes[b].add(s);
                    if (backtrack(k + 1)) return true;
                    rows[r].delete(s); cols[c].delete(s); boxes[b].delete(s);
                    board[r][c] = '.';
                }
            }
            return false;
        }
        backtrack(0);
        return board;
    }
}`,
    },
    editorial: {
      approach: 'Row/Col/Box Bitset Constraint Backtracking.',
      algorithm: 'Fill cells in depth-first order, pruning impossible choices via constraints.',
      timeComplexity: 'O(9^81)',
      spaceComplexity: 'O(81)',
      content: 'Classic Sudoku exact cover backtracking.',
      referenceCode: `if backtrack(k + 1): return True`,
    },
    tags: ['Backtracking', 'Matrix', 'Hash Table'],
    testCases: [
      { input: `[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]`, expectedOutput: `[["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]`, isHidden: false, order: 0 },
    ],
  },
  {
    title: 'N-Queens II Total Solutions Count',
    slug: 'n-queens-ii-total-solutions-count',
    description: `The n-queens puzzle is the problem of placing \`n\` queens on an \`n x n\` chessboard such that no two queens attack each other. Given an integer \`n\`, return the number of distinct solutions.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 14`,
    inputFormat: `n`,
    outputFormat: `Count of distinct valid configurations.`,
    sampleInput: `4`,
    sampleOutput: `2`,
    points: 200,
    hints: ['Use bitmasks for columns, diagonal (r-c), and anti-diagonal (r+c).'],
    codeTemplates: {
      python: `class Solution:\n    def totalNQueens(self, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    totalNQueens(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def totalNQueens(self, n: int) -> int:
        count = 0
        def solve(row, cols, diag1, diag2):
            nonlocal count
            if row == n:
                count += 1
                return
            avail = ((1 << n) - 1) & ~(cols | diag1 | diag2)
            while avail:
                pos = avail & -avail
                avail &= avail - 1
                solve(row + 1, cols | pos, (diag1 | pos) << 1, (diag2 | pos) >> 1)
        solve(0, 0, 0, 0)
        return count`,
      javascript: `class Solution {
    totalNQueens(n) {
        let count = 0;
        function solve(row, cols, diag1, diag2) {
            if (row === n) {
                count++;
                return;
            }
            let avail = ((1 << n) - 1) & ~(cols | diag1 | diag2);
            while (avail) {
                const pos = avail & -avail;
                avail &= avail - 1;
                solve(row + 1, cols | pos, (diag1 | pos) << 1, (diag2 | pos) >> 1);
            }
        }
        solve(0, 0, 0, 0);
        return count;
    }
}`,
    },
    editorial: {
      approach: 'Bitmask Pruned N-Queens Search.',
      algorithm: 'Bitwise representation of column, left diagonal, and right diagonal attack lines.',
      timeComplexity: 'O(N!)',
      spaceComplexity: 'O(N)',
      content: 'Classic bitmask N-queens.',
      referenceCode: `avail = ((1 << n) - 1) & ~(cols | diag1 | diag2)`,
    },
    tags: ['Backtracking', 'Bit Manipulation'],
    testCases: [
      { input: `4`, expectedOutput: `2`, isHidden: false, order: 0 },
      { input: `1`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `8`, expectedOutput: `92`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Word Search II Trie Guided Search',
    slug: 'word-search-ii-trie-guided-search',
    description: `Given an \`m x n\` board of characters and a list of strings \`words\`, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells (horizontally or vertically).`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `m == board.length, n == board[i].length, 1 <= m, n <= 12, words.length <= 10^4`,
    inputFormat: `board, words`,
    outputFormat: `Sorted list of found words.`,
    sampleInput: `[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"]`,
    sampleOutput: `["eat","oath"]`,
    points: 200,
    hints: ['Build a Trie from the words list and DFS from every cell concurrently matching Trie prefixes.'],
    codeTemplates: {
      python: `class Solution:\n    def findWords(self, board: list, words: list) -> list:\n        pass`,
      javascript: `class Solution {\n    findWords(board, words) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findWords(self, board: list, words: list) -> list:
        trie = {}
        for w in words:
            node = trie
            for ch in w:
                node = node.setdefault(ch, {})
            node['#'] = w
        m, n = len(board), len(board[0])
        res = set()
        def dfs(r, c, parent):
            ch = board[r][c]
            curr = parent[ch]
            if '#' in curr:
                res.add(curr['#'])
            board[r][c] = '#'
            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and board[nr][nc] in curr:
                    dfs(nr, nc, curr)
            board[r][c] = ch
        for r in range(m):
            for c in range(n):
                if board[r][c] in trie:
                    dfs(r, c, trie)
        return sorted(list(res))`,
      javascript: `class Solution {
    findWords(board, words) {
        const trie = {};
        for (const w of words) {
            let node = trie;
            for (const ch of w) {
                if (!node[ch]) node[ch] = {};
                node = node[ch];
            }
            node['#'] = w;
        }
        const m = board.length, n = board[0].length;
        const res = new Set();
        function dfs(r, c, parent) {
            const ch = board[r][c];
            const curr = parent[ch];
            if (curr['#']) res.add(curr['#']);
            board[r][c] = '#';
            const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && curr[board[nr][nc]]) {
                    dfs(nr, nc, curr);
                }
            }
            board[r][c] = ch;
        }
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                if (trie[board[r][c]]) dfs(r, c, trie);
            }
        }
        return Array.from(res).sort();
    }
}`,
    },
    editorial: {
      approach: 'Trie-Guided Depth-First Search with Board In-Place Marking.',
      algorithm: 'Insert dictionary into Prefix Trie and simultaneously prune DFS explorations that match no prefix.',
      timeComplexity: 'O(M * N * 4^(L))',
      spaceComplexity: 'O(Sum(Length of Words))',
      content: 'Standard Trie + Backtracking grid search.',
      referenceCode: `if '#' in curr: res.add(curr['#'])`,
    },
    tags: ['Backtracking', 'Trie', 'Matrix'],
    testCases: [
      { input: `[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"]`, expectedOutput: `["eat","oath"]`, isHidden: false, order: 0 },
      { input: `[["a","b"],["c","d"]], ["abcb"]`, expectedOutput: `[]`, isHidden: false, order: 1 },
      { input: `[["a"]], ["a"]`, expectedOutput: `["a"]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Word Ladder II All Shortest Transformation Sequences',
    slug: 'word-ladder-ii-all-shortest-transformation-sequences',
    description: `Given two words, \`beginWord\` and \`endWord\`, and a dictionary \`wordList\`, return all the shortest transformation sequences from \`beginWord\` to \`endWord\`.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= beginWord.length <= 5, wordList.length <= 500`,
    inputFormat: `beginWord, endWord, wordList`,
    outputFormat: `Sorted list of shortest paths.`,
    sampleInput: `"hit", "cog", ["hot","dot","dog","lot","log","cog"]`,
    sampleOutput: `[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]`,
    points: 200,
    hints: ['Run BFS from beginWord to build parents DAG, then DFS backtrack all paths to reconstruct sequences.'],
    codeTemplates: {
      python: `class Solution:\n    def findLadders(self, beginWord: str, endWord: str, wordList: list) -> list:\n        pass`,
      javascript: `class Solution {\n    findLadders(beginWord, endWord, wordList) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findLadders(self, beginWord: str, endWord: str, wordList: list) -> list:
        words = set(wordList)
        if endWord not in words: return []
        import collections
        parents = collections.defaultdict(set)
        layer = {beginWord}
        found = False
        while layer and not found:
            words -= layer
            next_layer = set()
            for word in layer:
                for i in range(len(word)):
                    for c in 'abcdefghijklmnopqrstuvwxyz':
                        cand = word[:i] + c + word[i+1:]
                        if cand in words:
                            if cand == endWord: found = True
                            next_layer.add(cand)
                            parents[cand].add(word)
            layer = next_layer
        res = []
        def get_paths(w):
            if w == beginWord: return [[beginWord]]
            paths = []
            for p in parents[w]:
                for path in get_paths(p):
                    paths.append(path + [w])
            return paths
        return sorted(get_paths(endWord)) if found else []`,
      javascript: `class Solution {
    findLadders(beginWord, endWord, wordList) {
        const words = new Set(wordList);
        if (!words.has(endWord)) return [];
        const parents = new Map();
        let layer = new Set([beginWord]);
        let found = false;
        while (layer.size > 0 && !found) {
            for (const w of layer) words.delete(w);
            const nextLayer = new Set();
            for (const word of layer) {
                for (let i = 0; i < word.length; i++) {
                    for (let code = 97; code <= 122; code++) {
                        const c = String.fromCharCode(code);
                        const cand = word.slice(0, i) + c + word.slice(i + 1);
                        if (words.has(cand)) {
                            if (cand === endWord) found = true;
                            nextLayer.add(cand);
                            if (!parents.has(cand)) parents.set(cand, new Set());
                            parents.get(cand).add(word);
                        }
                    }
                }
            }
            layer = nextLayer;
        }
        if (!found) return [];
        function getPaths(w) {
            if (w === beginWord) return [[beginWord]];
            const paths = [];
            const pars = parents.get(w) || [];
            for (const p of pars) {
                for (const path of getPaths(p)) {
                    paths.push([...path, w]);
                }
            }
            return paths;
        }
        return getPaths(endWord).sort((a, b) => a.join().localeCompare(b.join()));
    }
}`,
    },
    editorial: {
      approach: 'BFS Level-Order Graph Construction + DFS Path Reversal.',
      algorithm: 'Layer-by-layer BFS finds shortest distance, building predecessor graph.',
      timeComplexity: 'O(N * 26 * L + Output Paths)',
      spaceComplexity: 'O(N * L)',
      content: 'Standard BFS + DFS shortest sequence generation.',
      referenceCode: `parents[cand].add(word)`,
    },
    tags: ['Backtracking', 'Breadth-First Search', 'Graph'],
    testCases: [
      { input: `"hit", "cog", ["hot","dot","dog","lot","log","cog"]`, expectedOutput: `[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]`, isHidden: false, order: 0 },
      { input: `"hit", "cog", ["hot","dot","dog","lot","log"]`, expectedOutput: `[]`, isHidden: false, order: 1 },
      { input: `"a", "c", ["a","b","c"]`, expectedOutput: `[["a","c"]]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Letter Combinations of a Phone Number',
    slug: 'letter-combinations-of-a-phone-number-full',
    description: `Given a string containing digits from \`2-9\` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order (sorted lexicographically).`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `0 <= digits.length <= 4, digits[i] is in the range ['2', '9']`,
    inputFormat: `digits`,
    outputFormat: `List of string combinations.`,
    sampleInput: `"23"`,
    sampleOutput: `["ad","ae","af","bd","be","bf","cd","ce","cf"]`,
    points: 100,
    hints: ['Map each digit to letters and recurse.'],
    codeTemplates: {
      python: `class Solution:\n    def letterCombinations(self, digits: str) -> list:\n        pass`,
      javascript: `class Solution {\n    letterCombinations(digits) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def letterCombinations(self, digits: str) -> list:
        if not digits: return []
        M = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
        res = []
        def dfs(idx, path):
            if idx == len(digits):
                res.append(path)
                return
            for ch in M[digits[idx]]:
                dfs(idx + 1, path + ch)
        dfs(0, "")
        return sorted(res)`,
      javascript: `class Solution {
    letterCombinations(digits) {
        if (!digits) return [];
        const M = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'};
        const res = [];
        function dfs(idx, path) {
            if (idx === digits.length) {
                res.push(path);
                return;
            }
            for (const ch of M[digits[idx]]) {
                dfs(idx + 1, path + ch);
            }
        }
        dfs(0, "");
        return res.sort();
    }
}`,
    },
    editorial: {
      approach: 'Direct Depth-First Search Product.',
      algorithm: 'Cartesian product of keypad digit sets.',
      timeComplexity: 'O(4^N)',
      spaceComplexity: 'O(N)',
      content: 'Standard keypad letter combinations.',
      referenceCode: `for ch in M[digits[idx]]: dfs(idx + 1, path + ch)`,
    },
    tags: ['Backtracking', 'String'],
    testCases: [
      { input: `"23"`, expectedOutput: `["ad","ae","af","bd","be","bf","cd","ce","cf"]`, isHidden: false, order: 0 },
      { input: `""`, expectedOutput: `[]`, isHidden: false, order: 1 },
      { input: `"2"`, expectedOutput: `["a","b","c"]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Combinations K from N',
    slug: 'combinations-k-from-n-lexicographical',
    description: `Given two integers \`n\` and \`k\`, return all possible combinations of \`k\` numbers chosen from the range \`[1, n]\` in sorted order.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 20, 1 <= k <= n`,
    inputFormat: `n, k`,
    outputFormat: `List of combinations.`,
    sampleInput: `4, 2`,
    sampleOutput: `[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]`,
    points: 100,
    hints: ['Choose from start to n, ensuring enough numbers remain.'],
    codeTemplates: {
      python: `class Solution:\n    def combine(self, n: int, k: int) -> list:\n        pass`,
      javascript: `class Solution {\n    combine(n, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def combine(self, n: int, k: int) -> list:
        res = []
        def dfs(start, curr):
            if len(curr) == k:
                res.append(list(curr))
                return
            for i in range(start, n + 1 - (k - len(curr)) + 1):
                curr.append(i)
                dfs(i + 1, curr)
                curr.pop()
        dfs(1, [])
        return res`,
      javascript: `class Solution {
    combine(n, k) {
        const res = [];
        function dfs(start, curr) {
            if (curr.length === k) {
                res.push([...curr]);
                return;
            }
            for (let i = start; i <= n - (k - curr.length) + 1; i++) {
                curr.push(i);
                dfs(i + 1, curr);
                curr.pop();
            }
        }
        dfs(1, []);
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Backtracking with Remaining Element Pruning.',
      algorithm: 'Only branch up to n - (k - len(curr)) + 1.',
      timeComplexity: 'O(C(N, K))',
      spaceComplexity: 'O(K)',
      content: 'Standard combination generation.',
      referenceCode: `curr.append(i); dfs(i + 1, curr); curr.pop()`,
    },
    tags: ['Backtracking'],
    testCases: [
      { input: `4, 2`, expectedOutput: `[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]`, isHidden: false, order: 0 },
      { input: `1, 1`, expectedOutput: `[[1]]`, isHidden: false, order: 1 },
      { input: `5, 3`, expectedOutput: `[[1,2,3],[1,2,4],[1,2,5],[1,3,4],[1,3,5],[1,4,5],[2,3,4],[2,3,5],[2,4,5],[3,4,5]]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Subsets II With Duplicate Elements',
    slug: 'subsets-ii-with-duplicate-elements',
    description: `Given an integer array \`nums\` that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 10, -10 <= nums[i] <= 10`,
    inputFormat: `nums`,
    outputFormat: `List of unique subsets.`,
    sampleInput: `[1,2,2]`,
    sampleOutput: `[[],[1],[1,2],[1,2,2],[2],[2,2]]`,
    points: 100,
    hints: ['Sort the array and skip duplicates: if i > start and nums[i] == nums[i-1], skip.'],
    codeTemplates: {
      python: `class Solution:\n    def subsetsWithDup(self, nums: list) -> list:\n        pass`,
      javascript: `class Solution {\n    subsetsWithDup(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def subsetsWithDup(self, nums: list) -> list:
        nums.sort()
        res = []
        def dfs(start, curr):
            res.append(list(curr))
            for i in range(start, len(nums)):
                if i > start and nums[i] == nums[i - 1]:
                    continue
                curr.append(nums[i])
                dfs(i + 1, curr)
                curr.pop()
        dfs(0, [])
        return res`,
      javascript: `class Solution {
    subsetsWithDup(nums) {
        nums.sort((a, b) => a - b);
        const res = [];
        function dfs(start, curr) {
            res.push([...curr]);
            for (let i = start; i < nums.length; i++) {
                if (i > start && nums[i] === nums[i - 1]) continue;
                curr.push(nums[i]);
                dfs(i + 1, curr);
                curr.pop();
            }
        }
        dfs(0, []);
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Sorted Subsets with Sibling Skipping.',
      algorithm: 'Sort input and skip adjacent duplicate elements at the same recursion depth.',
      timeComplexity: 'O(2^N)',
      spaceComplexity: 'O(N)',
      content: 'Power set generation with deduplication.',
      referenceCode: `if i > start and nums[i] == nums[i - 1]: continue`,
    },
    tags: ['Backtracking', 'Array'],
    testCases: [
      { input: `[1,2,2]`, expectedOutput: `[[],[1],[1,2],[1,2,2],[2],[2,2]]`, isHidden: false, order: 0 },
      { input: `[0]`, expectedOutput: `[[],[0]]`, isHidden: false, order: 1 },
      { input: `[4,4,4,1,4]`, expectedOutput: `[[],[1],[1,4],[1,4,4],[1,4,4,4],[1,4,4,4,4],[4],[4,4],[4,4,4],[4,4,4,4]]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Permutations II With Duplicates',
    slug: 'permutations-ii-with-duplicates-unique',
    description: `Given a collection of numbers, \`nums\`, that might contain duplicates, return all possible unique permutations in any order.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= nums.length <= 8, -10 <= nums[i] <= 10`,
    inputFormat: `nums`,
    outputFormat: `List of unique permutations.`,
    sampleInput: `[1,1,2]`,
    sampleOutput: `[[1,1,2],[1,2,1],[2,1,1]]`,
    points: 100,
    hints: ['Sort nums and use a visited array. Skip duplicates if previous equal element was not used in current step.'],
    codeTemplates: {
      python: `class Solution:\n    def permuteUnique(self, nums: list) -> list:\n        pass`,
      javascript: `class Solution {\n    permuteUnique(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def permuteUnique(self, nums: list) -> list:
        nums.sort()
        res = []
        used = [False] * len(nums)
        def dfs(curr):
            if len(curr) == len(nums):
                res.append(list(curr))
                return
            for i in range(len(nums)):
                if used[i]: continue
                if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]:
                    continue
                used[i] = True
                curr.append(nums[i])
                dfs(curr)
                curr.pop()
                used[i] = False
        dfs([])
        return res`,
      javascript: `class Solution {
    permuteUnique(nums) {
        nums.sort((a, b) => a - b);
        const res = [];
        const used = Array(nums.length).fill(false);
        function dfs(curr) {
            if (curr.length === nums.length) {
                res.push([...curr]);
                return;
            }
            for (let i = 0; i < nums.length; i++) {
                if (used[i]) continue;
                if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
                used[i] = true;
                curr.push(nums[i]);
                dfs(curr);
                curr.pop();
                used[i] = false;
            }
        }
        dfs([]);
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Visited Array Deduplicated Permutations.',
      algorithm: 'Sort and ensure identical elements are chosen in strict index order.',
      timeComplexity: 'O(N!)',
      spaceComplexity: 'O(N)',
      content: 'Standard duplicate-handling permutation generation.',
      referenceCode: `if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]: continue`,
    },
    tags: ['Backtracking', 'Array'],
    testCases: [
      { input: `[1,1,2]`, expectedOutput: `[[1,1,2],[1,2,1],[2,1,1]]`, isHidden: false, order: 0 },
      { input: `[1,2,3]`, expectedOutput: `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`, isHidden: false, order: 1 },
      { input: `[2,2,1,1]`, expectedOutput: `[[1,1,2,2],[1,2,1,2],[1,2,2,1],[2,1,1,2],[2,1,2,1],[2,2,1,1]]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Combinatorial Target Sum III',
    slug: 'combinatorial-target-sum-iii-digits',
    description: `Find all valid combinations of \`k\` numbers that add up to \`n\` such that only numbers from 1 to 9 are used and each number is used at most once.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `2 <= k <= 9, 1 <= n <= 60`,
    inputFormat: `k, n`,
    outputFormat: `List of combinations.`,
    sampleInput: `3, 7`,
    sampleOutput: `[[1,2,4]]`,
    points: 100,
    hints: ['Backtrack picking distinct digits 1 through 9 until k numbers sum to n.'],
    codeTemplates: {
      python: `class Solution:\n    def combinationSum3(self, k: int, n: int) -> list:\n        pass`,
      javascript: `class Solution {\n    combinationSum3(k, n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def combinationSum3(self, k: int, n: int) -> list:
        res = []
        def dfs(start, curr, rem):
            if len(curr) == k:
                if rem == 0: res.append(list(curr))
                return
            for d in range(start, 10):
                if d > rem: break
                curr.append(d)
                dfs(d + 1, curr, rem - d)
                curr.pop()
        dfs(1, [], n)
        return res`,
      javascript: `class Solution {
    combinationSum3(k, n) {
        const res = [];
        function dfs(start, curr, rem) {
            if (curr.length === k) {
                if (rem === 0) res.push([...curr]);
                return;
            }
            for (let d = start; d <= 9; d++) {
                if (d > rem) break;
                curr.push(d);
                dfs(d + 1, curr, rem - d);
                curr.pop();
            }
        }
        dfs(1, [], n);
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Digit Range Bounded Backtracking.',
      algorithm: 'Branch over digits 1..9 maintaining k-length constraint.',
      timeComplexity: 'O(C(9, K))',
      spaceComplexity: 'O(K)',
      content: 'Standard fixed-size bounded combination search.',
      referenceCode: `dfs(d + 1, curr, rem - d)`,
    },
    tags: ['Backtracking'],
    testCases: [
      { input: `3, 7`, expectedOutput: `[[1,2,4]]`, isHidden: false, order: 0 },
      { input: `3, 9`, expectedOutput: `[[1,2,6],[1,3,5],[2,3,4]]`, isHidden: false, order: 1 },
      { input: `4, 1`, expectedOutput: `[]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Optimal Account Balancing Debt Simplification',
    slug: 'optimal-account-balancing-debt-simplification',
    description: `Given a list of transactions where \`transactions[i] = [from_i, to_i, amount]\`, return the minimum number of transactions required to settle all debt.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `transactions.length <= 8, 0 <= from, to < 12`,
    inputFormat: `transactions`,
    outputFormat: `Minimum transactions count.`,
    sampleInput: `[[0,1,10],[2,0,5]]`,
    sampleOutput: `2`,
    points: 200,
    hints: ['Compute net balances for all people, discard zero balances, and use backtracking to match debts.'],
    codeTemplates: {
      python: `class Solution:\n    def minTransfers(self, transactions: list) -> int:\n        pass`,
      javascript: `class Solution {\n    minTransfers(transactions) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minTransfers(self, transactions: list) -> int:
        import collections
        bal = collections.defaultdict(int)
        for u, v, amt in transactions:
            bal[u] -= amt
            bal[v] += amt
        debt = [b for b in bal.values() if b != 0]
        def dfs(idx):
            while idx < len(debt) and debt[idx] == 0:
                idx += 1
            if idx == len(debt): return 0
            res = float('inf')
            for i in range(idx + 1, len(debt)):
                if debt[idx] * debt[i] < 0:
                    debt[i] += debt[idx]
                    res = min(res, 1 + dfs(idx + 1))
                    debt[i] -= debt[idx]
            return res
        return dfs(0)`,
      javascript: `class Solution {
    minTransfers(transactions) {
        const bal = new Map();
        for (const [u, v, amt] of transactions) {
            bal.set(u, (bal.get(u) || 0) - amt);
            bal.set(v, (bal.get(v) || 0) + amt);
        }
        const debt = Array.from(bal.values()).filter(b => b !== 0);
        function dfs(idx) {
            while (idx < debt.length && debt[idx] === 0) idx++;
            if (idx === debt.length) return 0;
            let res = Infinity;
            for (let i = idx + 1; i < debt.length; i++) {
                if (debt[idx] * debt[i] < 0) {
                    debt[i] += debt[idx];
                    res = Math.min(res, 1 + dfs(idx + 1));
                    debt[i] -= debt[idx];
                }
            }
            return res;
        }
        return dfs(0);
    }
}`,
    },
    editorial: {
      approach: 'Net Balance Cancellation Search.',
      algorithm: 'Backtrack over debt transfers, prioritizing complementary balance pairs.',
      timeComplexity: 'O(N!)',
      spaceComplexity: 'O(N)',
      content: 'Classic NP-hard debt settlement problem.',
      referenceCode: `debt[i] += debt[idx]; res = min(res, 1 + dfs(idx + 1))`,
    },
    tags: ['Backtracking', 'Dynamic Programming'],
    testCases: [
      { input: `[[0,1,10],[2,0,5]]`, expectedOutput: `2`, isHidden: false, order: 0 },
      { input: `[[0,1,10],[1,0,1],[1,2,5],[2,0,5]]`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `[[0,1,1],[1,2,1],[2,0,1]]`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Generate Parentheses Catalan Sequences',
    slug: 'generate-parentheses-catalan-sequences',
    description: `Given \`n\` pairs of parentheses, write a function to generate all combinations of well-formed parentheses in lexicographical order.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 8`,
    inputFormat: `n`,
    outputFormat: `List of valid parentheses strings.`,
    sampleInput: `3`,
    sampleOutput: `["((()))","(()())","(())()","()(())","()()()"]`,
    points: 100,
    hints: ['Add opening parenthesis if open < n, add closing parenthesis if close < open.'],
    codeTemplates: {
      python: `class Solution:\n    def generateParenthesis(self, n: int) -> list:\n        pass`,
      javascript: `class Solution {\n    generateParenthesis(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def generateParenthesis(self, n: int) -> list:
        res = []
        def dfs(curr, open_c, close_c):
            if len(curr) == 2 * n:
                res.append(curr)
                return
            if open_c < n:
                dfs(curr + '(', open_c + 1, close_c)
            if close_c < open_c:
                dfs(curr + ')', open_c, close_c + 1)
        dfs("", 0, 0)
        return res`,
      javascript: `class Solution {
    generateParenthesis(n) {
        const res = [];
        function dfs(curr, openC, closeC) {
            if (curr.length === 2 * n) {
                res.push(curr);
                return;
            }
            if (openC < n) dfs(curr + '(', openC + 1, closeC);
            if (closeC < openC) dfs(curr + ')', openC, closeC + 1);
        }
        dfs("", 0, 0);
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Catalan Backtracking Branching.',
      algorithm: 'Constrain open and close count balances.',
      timeComplexity: 'O(4^N / sqrt(N))',
      spaceComplexity: 'O(N)',
      content: 'Standard Dyck path generation.',
      referenceCode: `if close_c < open_c: dfs(curr + ')', open_c, close_c + 1)`,
    },
    tags: ['Backtracking', 'String'],
    testCases: [
      { input: `3`, expectedOutput: `["((()))","(()())","(())()","()(())","()()()"]`, isHidden: false, order: 0 },
      { input: `1`, expectedOutput: `["()"]`, isHidden: false, order: 1 },
      { input: `2`, expectedOutput: `["(())","()()"]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Word Break II All Sentence Reconstructions',
    slug: 'word-break-ii-all-sentence-reconstructions',
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, add spaces in \`s\` to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in lexicographical order.`,
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= s.length <= 20, 1 <= wordDict.length <= 100`,
    inputFormat: `s, wordDict`,
    outputFormat: `List of valid sentence strings.`,
    sampleInput: `"catsanddog", ["cat","cats","and","sand","dog"]`,
    sampleOutput: `["cat sand dog","cats and dog"]`,
    points: 200,
    hints: ['Use memoized DFS from index 0 returning list of sentences formed from substring.'],
    codeTemplates: {
      python: `class Solution:\n    def wordBreak(self, s: str, wordDict: list) -> list:\n        pass`,
      javascript: `class Solution {\n    wordBreak(s, wordDict) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def wordBreak(self, s: str, wordDict: list) -> list:
        words = set(wordDict)
        memo = {}
        def dfs(sub):
            if sub in memo: return memo[sub]
            if not sub: return [""]
            res = []
            for w in words:
                if sub.startswith(w):
                    rest = dfs(sub[len(w):])
                    for r in rest:
                        res.append((w + " " + r).strip())
            memo[sub] = res
            return res
        return sorted(dfs(s))`,
      javascript: `class Solution {
    wordBreak(s, wordDict) {
        const words = new Set(wordDict);
        const memo = new Map();
        function dfs(sub) {
            if (memo.has(sub)) return memo.get(sub);
            if (sub === "") return [""];
            const res = [];
            for (const w of words) {
                if (sub.startsWith(w)) {
                    const rest = dfs(sub.slice(w.length));
                    for (const r of rest) {
                        res.push((w + " " + r).trim());
                    }
                }
            }
            memo.set(sub, res);
            return res;
        }
        return dfs(s).sort();
    }
}`,
    },
    editorial: {
      approach: 'Memoized Top-Down Parsing.',
      algorithm: 'Suffix memoization prevents redundant combinatorial sentence building.',
      timeComplexity: 'O(N * 2^N)',
      spaceComplexity: 'O(2^N)',
      content: 'Standard word break sentence builder.',
      referenceCode: `memo[sub] = res`,
    },
    tags: ['Backtracking', 'Dynamic Programming', 'Trie'],
    testCases: [
      { input: `"catsanddog", ["cat","cats","and","sand","dog"]`, expectedOutput: `["cat sand dog","cats and dog"]`, isHidden: false, order: 0 },
      { input: `"pineapplepenapple", ["apple","pen","applepen","pine","pineapple"]`, expectedOutput: `["pine apple pen apple","pine applepen apple","pineapple pen apple"]`, isHidden: false, order: 1 },
      { input: `"catsandog", ["cats","dog","sand","and","cat"]`, expectedOutput: `[]`, isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Palindrome Partitioning All Decompositions',
    slug: 'palindrome-partitioning-all-decompositions',
    description: `Given a string \`s\`, partition \`s\` such that every substring of the partition is a palindrome. Return all possible palindrome partitionings of \`s\`.`,
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= s.length <= 16`,
    inputFormat: `s`,
    outputFormat: `List of palindrome partitions.`,
    sampleInput: `"aab"`,
    sampleOutput: `[["a","a","b"],["aa","b"]]`,
    points: 100,
    hints: ['Precompute isPalindrome table or check on the fly, then backtrack over partition split points.'],
    codeTemplates: {
      python: `class Solution:\n    def partition(self, s: str) -> list:\n        pass`,
      javascript: `class Solution {\n    partition(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def partition(self, s: str) -> list:
        res = []
        def is_pal(sub):
            return sub == sub[::-1]
        def dfs(idx, curr):
            if idx == len(s):
                res.append(list(curr))
                return
            for i in range(idx + 1, len(s) + 1):
                sub = s[idx:i]
                if is_pal(sub):
                    curr.append(sub)
                    dfs(i, curr)
                    curr.pop()
        dfs(0, [])
        return res`,
      javascript: `class Solution {
    partition(s) {
        const res = [];
        function isPal(sub) {
            let l = 0, r = sub.length - 1;
            while (l < r) {
                if (sub[l++] !== sub[r--]) return false;
            }
            return true;
        }
        function dfs(idx, curr) {
            if (idx === s.length) {
                res.push([...curr]);
                return;
            }
            for (let i = idx + 1; i <= s.length; i++) {
                const sub = s.slice(idx, i);
                if (isPal(sub)) {
                    curr.push(sub);
                    dfs(i, curr);
                    curr.pop();
                }
            }
        }
        dfs(0, []);
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Palindromic Substring Backtracking.',
      algorithm: 'Greedily test palindrome prefixes and recurse on remainder.',
      timeComplexity: 'O(N * 2^N)',
      spaceComplexity: 'O(N)',
      content: 'Standard palindrome decomposition.',
      referenceCode: `if is_pal(sub): curr.append(sub); dfs(i, curr); curr.pop()`,
    },
    tags: ['Backtracking', 'String', 'Dynamic Programming'],
    testCases: [
      { input: `"aab"`, expectedOutput: `[["a","a","b"],["aa","b"]]`, isHidden: false, order: 0 },
      { input: `"a"`, expectedOutput: `[["a"]]`, isHidden: false, order: 1 },
      { input: `"racecar"`, expectedOutput: `[["r","a","c","e","c","a","r"],["r","a","cec","a","r"],["r","aceca","r"],["racecar"]]`, isHidden: true, order: 2 },
    ],
  },
];

writePack('pack-500-part-g.ts', 'pack500PartGDefs', problemsG);
