import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack100Part4ProblemDefs: ProblemDef[] = [
  // 1. Word Search in Character Grid
  {
    title: 'Word Search in Character Grid',
    slug: 'word-search-grid-backtracking',
    description: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` if \`word\` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `m == board.length\nn = board[i].length\n1 <= m, n <= 6\n1 <= word.length <= 15\nboard and word consist of only lowercase and uppercase English letters.`,
    inputFormat: `Line 1: Two integers \`m n\`.\nNext \`m\` lines: String of length \`n\` representing each grid row.\nLast line: String \`word\`.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `3 4\nABCE\nSFCS\nADEE\nABCCED`,
    sampleOutput: `true`,
    points: 150,
    hints: [
      'Use backtracking with DFS starting from every matching first character cell.',
      'Temporarily mark visited cells with a sentinel character like "#".',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split()
    if not lines: return
    m, n = int(lines[0]), int(lines[1])
    board = [list(lines[2 + i]) for i in range(m)]
    word = lines[2 + m]

    def dfs(r, c, idx):
        if idx == len(word): return True
        if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != word[idx]:
            return False
        temp = board[r][c]
        board[r][c] = '#'
        found = (dfs(r + 1, c, idx + 1) or
                 dfs(r - 1, c, idx + 1) or
                 dfs(r, c + 1, idx + 1) or
                 dfs(r, c - 1, idx + 1))
        board[r][c] = temp
        return found

    for r in range(m):
        for c in range(n):
            if dfs(r, c, 0):
                print("true")
                return
    print("false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 3) return;
    const m = parseInt(tokens[0], 10);
    const n = parseInt(tokens[1], 10);
    const board = [];
    for (let i = 0; i < m; i++) board.push(tokens[2 + i].split(''));
    const word = tokens[2 + m];

    function dfs(r, c, idx) {
        if (idx === word.length) return true;
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[idx]) return false;
        const temp = board[r][c];
        board[r][c] = '#';
        const found = dfs(r + 1, c, idx + 1) || dfs(r - 1, c, idx + 1) || dfs(r, c + 1, idx + 1) || dfs(r, c - 1, idx + 1);
        board[r][c] = temp;
        return found;
    }

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (dfs(r, c, 0)) {
                console.log("true");
                return;
            }
        }
    }
    console.log("false");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split()
    if not lines: return
    m, n = int(lines[0]), int(lines[1])
    board = [list(lines[2 + i]) for i in range(m)]
    word = lines[2 + m]

    def dfs(r, c, idx):
        if idx == len(word): return True
        if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != word[idx]:
            return False
        temp = board[r][c]
        board[r][c] = '#'
        found = (dfs(r + 1, c, idx + 1) or
                 dfs(r - 1, c, idx + 1) or
                 dfs(r, c + 1, idx + 1) or
                 dfs(r, c - 1, idx + 1))
        board[r][c] = temp
        return found

    for r in range(m):
        for c in range(n):
            if dfs(r, c, 0):
                print("true")
                return
    print("false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 3) return;
    const m = parseInt(tokens[0], 10);
    const n = parseInt(tokens[1], 10);
    const board = [];
    for (let i = 0; i < m; i++) board.push(tokens[2 + i].split(''));
    const word = tokens[2 + m];

    function dfs(r, c, idx) {
        if (idx === word.length) return true;
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[idx]) return false;
        const temp = board[r][c];
        board[r][c] = '#';
        const found = dfs(r + 1, c, idx + 1) || dfs(r - 1, c, idx + 1) || dfs(r, c + 1, idx + 1) || dfs(r, c - 1, idx + 1);
        board[r][c] = temp;
        return found;
    }

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (dfs(r, c, 0)) {
                console.log("true");
                return;
            }
        }
    }
    console.log("false");
}

solve();
`,
    },
    editorial: {
      approach: 'Backtracking DFS with In-Place Visited State',
      algorithm: 'Explore 4 cardinal directions matching characters sequentially, restoring grid cell on backtrack.',
      timeComplexity: 'O(m * n * 3^L)',
      spaceComplexity: 'O(L)',
      content: 'Standard matrix word search backtracking.',
      referenceCode: `def exist(board, word):
    # DFS backtracking
    pass`,
    },
    tags: ['Array', 'String', 'Backtracking', 'Matrix'],
    testCases: [
      { input: '3 4\nABCE\nSFCS\nADEE\nABCCED', expectedOutput: 'true', isHidden: false },
      { input: '3 4\nABCE\nSFCS\nADEE\nSEE', expectedOutput: 'true', isHidden: false },
      { input: '3 4\nABCE\nSFCS\nADEE\nABCB', expectedOutput: 'false', isHidden: false },
      { input: '1 1\nA\nA', expectedOutput: 'true', isHidden: true },
    ],
  },

  // 2. Letter Combinations of a Phone Number
  {
    title: 'Letter Combinations of a Phone Number',
    slug: 'letter-combinations-of-a-phone-number',
    description: `Given a string containing digits from \`2-9\` inclusive, return all possible letter combinations that the number could represent. Return the answer in **lexicographical order**.

A mapping of digits to letters (just like on the telephone buttons) is given below:
- 2: abc
- 3: def
- 4: ghi
- 5: jkl
- 6: mno
- 7: pqrs
- 8: tuv
- 9: wxyz`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `0 <= digits.length <= 4\ndigits[i] is a digit in the range ['2', '9'].`,
    inputFormat: `Line 1: String of digits.`,
    outputFormat: `Space-separated combinations or empty line.`,
    sampleInput: `23`,
    sampleOutput: `ad ae af bd be bf cd ce cf`,
    points: 150,
    hints: [
      'Use recursion or backtracking with digit index as depth.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    digits = sys.stdin.read().strip()
    if not digits:
        print("")
        return
    phone = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    }
    res = []
    def backtrack(idx, path):
        if idx == len(digits):
            res.append(path)
            return
        for char in phone[digits[idx]]:
            backtrack(idx + 1, path + char)

    backtrack(0, "")
    print(' '.join(res))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const digits = fs.readFileSync(0, 'utf-8').trim();
    if (!digits) { console.log(""); return; }
    const phone = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    const res = [];
    function backtrack(idx, path) {
        if (idx === digits.length) {
            res.push(path);
            return;
        }
        for (const char of phone[digits[idx]]) {
            backtrack(idx + 1, path + char);
        }
    }
    backtrack(0, "");
    console.log(res.join(' '));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    digits = sys.stdin.read().strip()
    if not digits:
        print("")
        return
    phone = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    }
    res = []
    def backtrack(idx, path):
        if idx == len(digits):
            res.append(path)
            return
        for char in phone[digits[idx]]:
            backtrack(idx + 1, path + char)

    backtrack(0, "")
    print(' '.join(res))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const digits = fs.readFileSync(0, 'utf-8').trim();
    if (!digits) { console.log(""); return; }
    const phone = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    const res = [];
    function backtrack(idx, path) {
        if (idx === digits.length) {
            res.push(path);
            return;
        }
        for (const char of phone[digits[idx]]) {
            backtrack(idx + 1, path + char);
        }
    }
    backtrack(0, "");
    console.log(res.join(' '));
}

solve();
`,
    },
    editorial: {
      approach: 'Cartesian Product Backtracking',
      algorithm: 'Branch through characters mapped to each keypad digit.',
      timeComplexity: 'O(4^n)',
      spaceComplexity: 'O(n)',
      content: 'Standard combination generation.',
      referenceCode: `def letter_combinations(digits):
    # backtrack
    pass`,
    },
    tags: ['Hash Table', 'String', 'Backtracking'],
    testCases: [
      { input: '23', expectedOutput: 'ad ae af bd be bf cd ce cf', isHidden: false },
      { input: '2', expectedOutput: 'a b c', isHidden: false },
      { input: '', expectedOutput: '', isHidden: false },
      { input: '7', expectedOutput: 'p q r s', isHidden: true },
    ],
  },

  // 3. Combination Sum
  {
    title: 'Combination Sum',
    slug: 'combination-sum',
    description: `Given an array of **distinct** integers \`candidates\` and a target integer \`target\`, return a list of all **unique combinations** of \`candidates\` where the chosen numbers sum to \`target\`. You may return the combinations in **any order**.

The **same** number may be chosen from \`candidates\` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

Format each combination as space-separated numbers on its own line, with numbers in ascending order.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= candidates.length <= 30\n2 <= candidates[i] <= 40\nAll elements of candidates are distinct.\n1 <= target <= 40`,
    inputFormat: `Line 1: Target integer \`target\`.\nLine 2: Space-separated integers of \`candidates\`.`,
    outputFormat: `Each combination on a new line, space-separated.`,
    sampleInput: `7\n2 3 6 7`,
    sampleOutput: `2 2 3\n7`,
    points: 150,
    hints: [
      'Sort candidates in ascending order.',
      'Use backtracking: branch between reusing current element or moving to next candidate index.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    target = int(lines[0].strip())
    candidates = sorted(list(map(int, lines[1].strip().split())))
    res = []

    def backtrack(remain, combo, start):
        if remain == 0:
            res.append(list(combo))
            return
        if remain < 0:
            return
        for i in range(start, len(candidates)):
            combo.append(candidates[i])
            backtrack(remain - candidates[i], combo, i)
            combo.pop()

    backtrack(target, [], 0)
    for c in res:
        print(' '.join(map(str, c)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const target = parseInt(lines[0].trim(), 10);
    const candidates = lines[1].trim().split(/\\s+/).map(Number).sort((a, b) => a - b);
    const res = [];

    function backtrack(remain, combo, start) {
        if (remain === 0) {
            res.push([...combo]);
            return;
        }
        if (remain < 0) return;
        for (let i = start; i < candidates.length; i++) {
            combo.push(candidates[i]);
            backtrack(remain - candidates[i], combo, i);
            combo.pop();
        }
    }

    backtrack(target, [], 0);
    for (const c of res) {
        console.log(c.join(' '));
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    target = int(lines[0].strip())
    candidates = sorted(list(map(int, lines[1].strip().split())))
    res = []

    def backtrack(remain, combo, start):
        if remain == 0:
            res.append(list(combo))
            return
        if remain < 0:
            return
        for i in range(start, len(candidates)):
            combo.append(candidates[i])
            backtrack(remain - candidates[i], combo, i)
            combo.pop()

    backtrack(target, [], 0)
    for c in res:
        print(' '.join(map(str, c)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const target = parseInt(lines[0].trim(), 10);
    const candidates = lines[1].trim().split(/\\s+/).map(Number).sort((a, b) => a - b);
    const res = [];

    function backtrack(remain, combo, start) {
        if (remain === 0) {
            res.push([...combo]);
            return;
        }
        if (remain < 0) return;
        for (let i = start; i < candidates.length; i++) {
            combo.push(candidates[i]);
            backtrack(remain - candidates[i], combo, i);
            combo.pop();
        }
    }

    backtrack(target, [], 0);
    for (const c of res) {
        console.log(c.join(' '));
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Unbounded Backtracking Combination Generation',
      algorithm: 'Sort candidates and recursively branch, allowing reselection of current candidate until remainder is exhausted.',
      timeComplexity: 'O(2^target)',
      spaceComplexity: 'O(target)',
      content: 'Classic combination sum search tree.',
      referenceCode: `def combination_sum(candidates, target):
    # backtrack
    pass`,
    },
    tags: ['Array', 'Backtracking'],
    testCases: [
      { input: '7\n2 3 6 7', expectedOutput: '2 2 3\n7', isHidden: false },
      { input: '8\n2 3 5', expectedOutput: '2 2 2 2\n2 3 3\n3 5', isHidden: false },
      { input: '1\n2', expectedOutput: '', isHidden: false },
      { input: '6\n2 3', expectedOutput: '2 2 2\n3 3', isHidden: true },
    ],
  },

  // 4. Combination Sum II
  {
    title: 'Combination Sum II',
    slug: 'combination-sum-ii',
    description: `Given a collection of candidate numbers (\`candidates\`) and a target number (\`target\`), find all unique combinations in \`candidates\` where the candidate numbers sum to \`target\`.

Each number in \`candidates\` may only be used **once** in the combination. The solution set must not contain duplicate combinations.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= candidates.length <= 100\n1 <= candidates[i] <= 50\n1 <= target <= 30`,
    inputFormat: `Line 1: Target integer \`target\`.\nLine 2: Space-separated integers of \`candidates\`.`,
    outputFormat: `Each combination on a new line, space-separated.`,
    sampleInput: `8\n10 1 2 7 6 1 5`,
    sampleOutput: `1 1 6\n1 2 5\n1 7\n2 6`,
    points: 150,
    hints: [
      'Sort candidates to easily skip duplicates.',
      'If candidates[i] == candidates[i - 1] and i > start, skip candidate to prevent duplicate sets.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    target = int(lines[0].strip())
    candidates = sorted(list(map(int, lines[1].strip().split())))
    res = []

    def backtrack(remain, combo, start):
        if remain == 0:
            res.append(list(combo))
            return
        if remain < 0:
            return
        for i in range(start, len(candidates)):
            if i > start and candidates[i] == candidates[i - 1]:
                continue
            if candidates[i] > remain:
                break
            combo.append(candidates[i])
            backtrack(remain - candidates[i], combo, i + 1)
            combo.pop()

    backtrack(target, [], 0)
    for c in res:
        print(' '.join(map(str, c)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const target = parseInt(lines[0].trim(), 10);
    const candidates = lines[1].trim().split(/\\s+/).map(Number).sort((a, b) => a - b);
    const res = [];

    function backtrack(remain, combo, start) {
        if (remain === 0) {
            res.push([...combo]);
            return;
        }
        if (remain < 0) return;
        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue;
            if (candidates[i] > remain) break;
            combo.push(candidates[i]);
            backtrack(remain - candidates[i], combo, i + 1);
            combo.pop();
        }
    }

    backtrack(target, [], 0);
    for (const c of res) {
        console.log(c.join(' '));
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    target = int(lines[0].strip())
    candidates = sorted(list(map(int, lines[1].strip().split())))
    res = []

    def backtrack(remain, combo, start):
        if remain == 0:
            res.append(list(combo))
            return
        if remain < 0:
            return
        for i in range(start, len(candidates)):
            if i > start and candidates[i] == candidates[i - 1]:
                continue
            if candidates[i] > remain:
                break
            combo.append(candidates[i])
            backtrack(remain - candidates[i], combo, i + 1)
            combo.pop()

    backtrack(target, [], 0)
    for c in res:
        print(' '.join(map(str, c)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const target = parseInt(lines[0].trim(), 10);
    const candidates = lines[1].trim().split(/\\s+/).map(Number).sort((a, b) => a - b);
    const res = [];

    function backtrack(remain, combo, start) {
        if (remain === 0) {
            res.push([...combo]);
            return;
        }
        if (remain < 0) return;
        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue;
            if (candidates[i] > remain) break;
            combo.push(candidates[i]);
            backtrack(remain - candidates[i], combo, i + 1);
            combo.pop();
        }
    }

    backtrack(target, [], 0);
    for (const c of res) {
        console.log(c.join(' '));
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Sorted Pruned Backtracking with Duplicate Avoidance',
      algorithm: 'Sort array and skip sibling recursion branches with equal values.',
      timeComplexity: 'O(2^n)',
      spaceComplexity: 'O(n)',
      content: 'Duplicate branch pruning pattern in combinatorics.',
      referenceCode: `def combination_sum_2(candidates, target):
    # backtrack with skip duplicates
    pass`,
    },
    tags: ['Array', 'Backtracking'],
    testCases: [
      { input: '8\n10 1 2 7 6 1 5', expectedOutput: '1 1 6\n1 2 5\n1 7\n2 6', isHidden: false },
      { input: '5\n2 5 2 1 2', expectedOutput: '1 2 2\n5', isHidden: false },
      { input: '1\n1', expectedOutput: '1', isHidden: false },
      { input: '4\n1 1 1 1', expectedOutput: '1 1 1 1', isHidden: true },
    ],
  },

  // 5. Permutations
  {
    title: 'Permutations',
    slug: 'permutations',
    description: `Given an array \`nums\` of distinct integers, return all the possible **permutations**. You can return the answer in **any order**.

Format each permutation as space-separated numbers on its own line.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 6\n-10 <= nums[i] <= 10\nAll the integers of nums are unique.`,
    inputFormat: `Line 1: Space-separated distinct integers.`,
    outputFormat: `Each permutation on a new line.`,
    sampleInput: `1 2 3`,
    sampleOutput: `1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1`,
    points: 150,
    hints: [
      'Use backtracking with a visited array or element swapping.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    nums = list(map(int, sys.stdin.read().split()))
    if not nums: return
    res = []

    def backtrack(first=0):
        if first == len(nums):
            res.append(list(nums))
            return
        for i in range(first, len(nums)):
            nums[first], nums[i] = nums[i], nums[first]
            backtrack(first + 1)
            nums[first], nums[i] = nums[i], nums[first]

    backtrack()
    res.sort()
    for p in res:
        print(' '.join(map(str, p)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const nums = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);
    if (nums.length === 0 || isNaN(nums[0])) return;
    const res = [];

    function backtrack(first = 0) {
        if (first === nums.length) {
            res.push([...nums]);
            return;
        }
        for (let i = first; i < nums.length; i++) {
            [nums[first], nums[i]] = [nums[i], nums[first]];
            backtrack(first + 1);
            [nums[first], nums[i]] = [nums[i], nums[first]];
        }
    }

    backtrack();
    res.sort((a, b) => {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return a[i] - b[i];
        }
        return 0;
    });
    for (const p of res) {
        console.log(p.join(' '));
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    nums = list(map(int, sys.stdin.read().split()))
    if not nums: return
    res = []

    def backtrack(first=0):
        if first == len(nums):
            res.append(list(nums))
            return
        for i in range(first, len(nums)):
            nums[first], nums[i] = nums[i], nums[first]
            backtrack(first + 1)
            nums[first], nums[i] = nums[i], nums[first]

    backtrack()
    res.sort()
    for p in res:
        print(' '.join(map(str, p)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const nums = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);
    if (nums.length === 0 || isNaN(nums[0])) return;
    const res = [];

    function backtrack(first = 0) {
        if (first === nums.length) {
            res.push([...nums]);
            return;
        }
        for (let i = first; i < nums.length; i++) {
            [nums[first], nums[i]] = [nums[i], nums[first]];
            backtrack(first + 1);
            [nums[first], nums[i]] = [nums[i], nums[first]];
        }
    }

    backtrack();
    res.sort((a, b) => {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return a[i] - b[i];
        }
        return 0;
    });
    for (const p of res) {
        console.log(p.join(' '));
    }
}

solve();
`,
    },
    editorial: {
      approach: 'In-Place Swap Backtracking',
      algorithm: 'Swap elements to fix prefix and recurse on the suffix in O(n * n!).',
      timeComplexity: 'O(n * n!)',
      spaceComplexity: 'O(n)',
      content: 'Standard full permutation generation.',
      referenceCode: `def permute(nums):
    # backtrack swap
    pass`,
    },
    tags: ['Array', 'Backtracking'],
    testCases: [
      { input: '1 2 3', expectedOutput: '1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1', isHidden: false },
      { input: '0 1', expectedOutput: '0 1\n1 0', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: false },
      { input: '4 5', expectedOutput: '4 5\n5 4', isHidden: true },
      { input: '-1 0 1', expectedOutput: '-1 0 1\n-1 1 0\n0 -1 1\n0 1 -1\n1 -1 0\n1 0 -1', isHidden: true },
    ],
  },

  // 6. Subsets II
  {
    title: 'Subsets II',
    slug: 'subsets-ii',
    description: `Given an integer array \`nums\` that may contain duplicates, return all possible **subsets** (the power set).

The solution set must not contain duplicate subsets. Return the subsets sorted lexicographically.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 10\n-10 <= nums[i] <= 10`,
    inputFormat: `Line 1: Space-separated integers.`,
    outputFormat: `Each subset on a new line (empty subset as blank line or nothing).`,
    sampleInput: `1 2 2`,
    sampleOutput: `\n1\n1 2\n1 2 2\n2\n2 2`,
    points: 150,
    hints: [
      'Sort nums before generating subsets.',
      'Skip elements where nums[i] == nums[i - 1] and i > start.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    nums = sorted(list(map(int, sys.stdin.read().split())))
    res = []

    def backtrack(start, combo):
        res.append(list(combo))
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]:
                continue
            combo.append(nums[i])
            backtrack(i + 1, combo)
            combo.pop()

    backtrack(0, [])
    for s in res:
        print(' '.join(map(str, s)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (!raw) { console.log(""); return; }
    const nums = raw.split(/\\s+/).map(Number).sort((a, b) => a - b);
    const res = [];

    function backtrack(start, combo) {
        res.push([...combo]);
        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) continue;
            combo.push(nums[i]);
            backtrack(i + 1, combo);
            combo.pop();
        }
    }

    backtrack(0, []);
    for (const s of res) {
        console.log(s.join(' '));
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    nums = sorted(list(map(int, sys.stdin.read().split())))
    res = []

    def backtrack(start, combo):
        res.append(list(combo))
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]:
                continue
            combo.append(nums[i])
            backtrack(i + 1, combo)
            combo.pop()

    backtrack(0, [])
    for s in res:
        print(' '.join(map(str, s)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (!raw) { console.log(""); return; }
    const nums = raw.split(/\\s+/).map(Number).sort((a, b) => a - b);
    const res = [];

    function backtrack(start, combo) {
        res.push([...combo]);
        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) continue;
            combo.push(nums[i]);
            backtrack(i + 1, combo);
            combo.pop();
        }
    }

    backtrack(0, []);
    for (const s of res) {
        console.log(s.join(' '));
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Power Set Generation with Duplicate Pruning',
      algorithm: 'Sort elements and bypass matching sibling values.',
      timeComplexity: 'O(n * 2^n)',
      spaceComplexity: 'O(n)',
      content: 'Combinatorial power set with duplicate suppression.',
      referenceCode: `def subsets_with_dup(nums):
    # backtrack
    pass`,
    },
    tags: ['Array', 'Backtracking', 'Bit Manipulation'],
    testCases: [
      { input: '1 2 2', expectedOutput: '\n1\n1 2\n1 2 2\n2\n2 2', isHidden: false },
      { input: '0', expectedOutput: '\n0', isHidden: false },
      { input: '4 4 4 1 4', expectedOutput: '\n1\n1 4\n1 4 4\n1 4 4 4\n1 4 4 4 4\n4\n4 4\n4 4 4\n4 4 4 4', isHidden: true },
    ],
  },

  // 7. Spiral Matrix
  {
    title: 'Spiral Matrix',
    slug: 'spiral-matrix',
    description: `Given an \`m x n\` \`matrix\`, return all elements of the \`matrix\` in **spiral order**.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `m == matrix.length\nn == matrix[i].length\n1 <= m, n <= 10\n-100 <= matrix[i][j] <= 100`,
    inputFormat: `Line 1: Two integers \`m n\`.\nNext \`m\` lines: \`n\` space-separated integers for each row.`,
    outputFormat: `Space-separated integers in spiral traversal order.`,
    sampleInput: `3 3\n1 2 3\n4 5 6\n7 8 9`,
    sampleOutput: `1 2 3 6 9 8 7 4 5`,
    points: 150,
    hints: [
      'Maintain 4 boundaries: top, bottom, left, right.',
      'Traverse top row, right col, bottom row, left col, shrinking boundaries inward each round.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    m, n = int(tokens[0]), int(tokens[1])
    grid = []
    idx = 2
    for _ in range(m):
        row = []
        for _ in range(n):
            row.append(int(tokens[idx]))
            idx += 1
        grid.append(row)

    top, bottom = 0, m - 1
    left, right = 0, n - 1
    res = []

    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            res.append(grid[top][c])
        top += 1

        for r in range(top, bottom + 1):
            res.append(grid[r][right])
        right -= 1

        if top <= bottom:
            for c in range(right, left - 1, -1):
                res.append(grid[bottom][c])
            bottom -= 1

        if left <= right:
            for r in range(bottom, top - 1, -1):
                res.append(grid[r][left])
            left += 1

    print(' '.join(map(str, res)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const m = parseInt(tokens[0], 10);
    const n = parseInt(tokens[1], 10);
    const grid = [];
    let idx = 2;
    for (let r = 0; r < m; r++) {
        const row = [];
        for (let c = 0; c < n; c++) row.push(parseInt(tokens[idx++], 10));
        grid.push(row);
    }

    let top = 0, bottom = m - 1;
    let left = 0, right = n - 1;
    const res = [];

    while (top <= bottom && left <= right) {
        for (let c = left; c <= right; c++) res.push(grid[top][c]);
        top++;

        for (let r = top; r <= bottom; r++) res.push(grid[r][right]);
        right--;

        if (top <= bottom) {
            for (let c = right; c >= left; c--) res.push(grid[bottom][c]);
            bottom--;
        }

        if (left <= right) {
            for (let r = bottom; r >= top; r--) res.push(grid[r][left]);
            left++;
        }
    }

    console.log(res.join(' '));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    m, n = int(tokens[0]), int(tokens[1])
    grid = []
    idx = 2
    for _ in range(m):
        row = []
        for _ in range(n):
            row.append(int(tokens[idx]))
            idx += 1
        grid.append(row)

    top, bottom = 0, m - 1
    left, right = 0, n - 1
    res = []

    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            res.append(grid[top][c])
        top += 1

        for r in range(top, bottom + 1):
            res.append(grid[r][right])
        right -= 1

        if top <= bottom:
            for c in range(right, left - 1, -1):
                res.append(grid[bottom][c])
            bottom -= 1

        if left <= right:
            for r in range(bottom, top - 1, -1):
                res.append(grid[r][left])
            left += 1

    print(' '.join(map(str, res)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const m = parseInt(tokens[0], 10);
    const n = parseInt(tokens[1], 10);
    const grid = [];
    let idx = 2;
    for (let r = 0; r < m; r++) {
        const row = [];
        for (let c = 0; c < n; c++) row.push(parseInt(tokens[idx++], 10));
        grid.push(row);
    }

    let top = 0, bottom = m - 1;
    let left = 0, right = n - 1;
    const res = [];

    while (top <= bottom && left <= right) {
        for (let c = left; c <= right; c++) res.push(grid[top][c]);
        top++;

        for (let r = top; r <= bottom; r++) res.push(grid[r][right]);
        right--;

        if (top <= bottom) {
            for (let c = right; c >= left; c--) res.push(grid[bottom][c]);
            bottom--;
        }

        if (left <= right) {
            for (let r = bottom; r >= top; r--) res.push(grid[r][left]);
            left++;
        }
    }

    console.log(res.join(' '));
}

solve();
`,
    },
    editorial: {
      approach: '4-Pointer Shrinking Boundary Simulation',
      algorithm: 'Walk boundaries clockwise and shift pointers inward.',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(1)',
      content: 'Classic 2D matrix spiral traversal.',
      referenceCode: `def spiral_order(matrix):
    # boundary simulation
    pass`,
    },
    tags: ['Array', 'Matrix', 'Simulation'],
    testCases: [
      { input: '3 3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '1 2 3 6 9 8 7 4 5', isHidden: false },
      { input: '3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12', expectedOutput: '1 2 3 4 8 12 11 10 9 5 6 7', isHidden: false },
      { input: '1 1\n1', expectedOutput: '1', isHidden: false },
      { input: '2 2\n1 2\n3 4', expectedOutput: '1 2 4 3', isHidden: true },
    ],
  },

  // 8. Set Matrix Zeroes
  {
    title: 'Set Matrix Zeroes',
    slug: 'set-matrix-zeroes',
    description: `Given an \`m x n\` integer matrix \`matrix\`, if an element is \`0\`, set its entire row and column to \`0\`'s.

You must do it **in place**.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `m == matrix.length\nn == matrix[0].length\n1 <= m, n <= 200\n-2^31 <= matrix[i][j] <= 2^31 - 1`,
    inputFormat: `Line 1: Two integers \`m n\`.\nNext \`m\` lines: \`n\` space-separated integers for each row.`,
    outputFormat: `\`m\` lines representing the modified matrix.`,
    sampleInput: `3 3\n1 1 1\n1 0 1\n1 1 1`,
    sampleOutput: `1 0 1\n0 0 0\n1 0 1`,
    points: 150,
    hints: [
      'Use the first row and first column as flag markers to achieve O(1) space.',
      'Use a single variable to track if the first column itself needs to be zeroed.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    m, n = int(tokens[0]), int(tokens[1])
    grid = []
    idx = 2
    for _ in range(m):
        row = []
        for _ in range(n):
            row.append(int(tokens[idx]))
            idx += 1
        grid.append(row)

    first_col_zero = any(grid[r][0] == 0 for r in range(m))
    first_row_zero = any(grid[0][c] == 0 for c in range(n))

    for r in range(1, m):
        for c in range(1, n):
            if grid[r][c] == 0:
                grid[r][0] = 0
                grid[0][c] = 0

    for r in range(1, m):
        for c in range(1, n):
            if grid[r][0] == 0 or grid[0][c] == 0:
                grid[r][c] = 0

    if first_row_zero:
        for c in range(n): grid[0][c] = 0
    if first_col_zero:
        for r in range(m): grid[r][0] = 0

    for r in range(m):
        print(' '.join(map(str, grid[r])))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const m = parseInt(tokens[0], 10);
    const n = parseInt(tokens[1], 10);
    const grid = [];
    let idx = 2;
    for (let r = 0; r < m; r++) {
        const row = [];
        for (let c = 0; c < n; c++) row.push(parseInt(tokens[idx++], 10));
        grid.push(row);
    }

    let firstColZero = false;
    for (let r = 0; r < m; r++) if (grid[r][0] === 0) firstColZero = true;
    let firstRowZero = false;
    for (let c = 0; c < n; c++) if (grid[0][c] === 0) firstRowZero = true;

    for (let r = 1; r < m; r++) {
        for (let c = 1; c < n; c++) {
            if (grid[r][c] === 0) {
                grid[r][0] = 0;
                grid[0][c] = 0;
            }
        }
    }

    for (let r = 1; r < m; r++) {
        for (let c = 1; c < n; c++) {
            if (grid[r][0] === 0 || grid[0][c] === 0) grid[r][c] = 0;
        }
    }

    if (firstRowZero) for (let c = 0; c < n; c++) grid[0][c] = 0;
    if (firstColZero) for (let r = 0; r < m; r++) grid[r][0] = 0;

    for (let r = 0; r < m; r++) {
        console.log(grid[r].join(' '));
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    m, n = int(tokens[0]), int(tokens[1])
    grid = []
    idx = 2
    for _ in range(m):
        row = []
        for _ in range(n):
            row.append(int(tokens[idx]))
            idx += 1
        grid.append(row)

    first_col_zero = any(grid[r][0] == 0 for r in range(m))
    first_row_zero = any(grid[0][c] == 0 for c in range(n))

    for r in range(1, m):
        for c in range(1, n):
            if grid[r][c] == 0:
                grid[r][0] = 0
                grid[0][c] = 0

    for r in range(1, m):
        for c in range(1, n):
            if grid[r][0] == 0 or grid[0][c] == 0:
                grid[r][c] = 0

    if first_row_zero:
        for c in range(n): grid[0][c] = 0
    if first_col_zero:
        for r in range(m): grid[r][0] = 0

    for r in range(m):
        print(' '.join(map(str, grid[r])))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const m = parseInt(tokens[0], 10);
    const n = parseInt(tokens[1], 10);
    const grid = [];
    let idx = 2;
    for (let r = 0; r < m; r++) {
        const row = [];
        for (let c = 0; c < n; c++) row.push(parseInt(tokens[idx++], 10));
        grid.push(row);
    }

    let firstColZero = false;
    for (let r = 0; r < m; r++) if (grid[r][0] === 0) firstColZero = true;
    let firstRowZero = false;
    for (let c = 0; c < n; c++) if (grid[0][c] === 0) firstRowZero = true;

    for (let r = 1; r < m; r++) {
        for (let c = 1; c < n; c++) {
            if (grid[r][c] === 0) {
                grid[r][0] = 0;
                grid[0][c] = 0;
            }
        }
    }

    for (let r = 1; r < m; r++) {
        for (let c = 1; c < n; c++) {
            if (grid[r][0] === 0 || grid[0][c] === 0) grid[r][c] = 0;
        }
    }

    if (firstRowZero) for (let c = 0; c < n; c++) grid[0][c] = 0;
    if (firstColZero) for (let r = 0; r < m; r++) grid[r][0] = 0;

    for (let r = 0; r < m; r++) {
        console.log(grid[r].join(' '));
    }
}

solve();
`,
    },
    editorial: {
      approach: 'O(1) In-Place Marker Row/Column Allocation',
      algorithm: 'Use top row and leftmost column as zero markers.',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(1)',
      content: 'In-place state recording within existing matrix buffers.',
      referenceCode: `def set_zeroes(matrix):
    # in place markers
    pass`,
    },
    tags: ['Array', 'Hash Table', 'Matrix'],
    testCases: [
      { input: '3 3\n1 1 1\n1 0 1\n1 1 1', expectedOutput: '1 0 1\n0 0 0\n1 0 1', isHidden: false },
      { input: '3 4\n0 1 2 0\n3 4 5 2\n1 3 1 5', expectedOutput: '0 0 0 0\n0 4 5 0\n0 3 1 0', isHidden: false },
      { input: '1 1\n0', expectedOutput: '0', isHidden: true },
    ],
  },

  // 9. Rotate Image
  {
    title: 'Rotate Image',
    slug: 'rotate-image',
    description: `You are given an \`n x n\` 2D \`matrix\` representing an image, rotate the image by **90 degrees (clockwise)**.

You have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `n == matrix.length == matrix[i].length\n1 <= n <= 20\n-1000 <= matrix[i][j] <= 1000`,
    inputFormat: `Line 1: An integer \`n\`.\nNext \`n\` lines: \`n\` space-separated integers for each row.`,
    outputFormat: `\`n\` lines representing the rotated matrix.`,
    sampleInput: `3\n1 2 3\n4 5 6\n7 8 9`,
    sampleOutput: `7 4 1\n8 5 2\n9 6 3`,
    points: 150,
    hints: [
      'Transpose the matrix (swap matrix[i][j] with matrix[j][i]).',
      'Reverse each row.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    grid = []
    idx = 1
    for _ in range(n):
        row = []
        for _ in range(n):
            row.append(int(tokens[idx]))
            idx += 1
        grid.append(row)

    # Transpose
    for i in range(n):
        for j in range(i + 1, n):
            grid[i][j], grid[j][i] = grid[j][i], grid[i][j]

    # Reverse rows
    for i in range(n):
        grid[i].reverse()

    for row in grid:
        print(' '.join(map(str, row)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length === 0 || tokens[0] === '') return;
    const n = parseInt(tokens[0], 10);
    const grid = [];
    let idx = 1;
    for (let r = 0; r < n; r++) {
        const row = [];
        for (let c = 0; c < n; c++) row.push(parseInt(tokens[idx++], 10));
        grid.push(row);
    }

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [grid[i][j], grid[j][i]] = [grid[j][i], grid[i][j]];
        }
    }

    for (let i = 0; i < n; i++) grid[i].reverse();

    for (const row of grid) {
        console.log(row.join(' '));
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    grid = []
    idx = 1
    for _ in range(n):
        row = []
        for _ in range(n):
            row.append(int(tokens[idx]))
            idx += 1
        grid.append(row)

    # Transpose
    for i in range(n):
        for j in range(i + 1, n):
            grid[i][j], grid[j][i] = grid[j][i], grid[i][j]

    # Reverse rows
    for i in range(n):
        grid[i].reverse()

    for row in grid:
        print(' '.join(map(str, row)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length === 0 || tokens[0] === '') return;
    const n = parseInt(tokens[0], 10);
    const grid = [];
    let idx = 1;
    for (let r = 0; r < n; r++) {
        const row = [];
        for (let c = 0; c < n; c++) row.push(parseInt(tokens[idx++], 10));
        grid.push(row);
    }

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [grid[i][j], grid[j][i]] = [grid[j][i], grid[i][j]];
        }
    }

    for (let i = 0; i < n; i++) grid[i].reverse();

    for (const row of grid) {
        console.log(row.join(' '));
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Transpose + Horizontal Reflection (Reverse Rows)',
      algorithm: 'Perform matrix transpose swap followed by row reversals to achieve 90 deg clockwise rotation in O(n^2) time and O(1) memory.',
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(1)',
      content: 'Standard in-place matrix rotation.',
      referenceCode: `def rotate(matrix):
    # transpose then reverse rows
    pass`,
    },
    tags: ['Array', 'Math', 'Matrix'],
    testCases: [
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '7 4 1\n8 5 2\n9 6 3', isHidden: false },
      { input: '4\n5 1 9 11\n2 4 8 10\n13 3 6 7\n15 14 12 16', expectedOutput: '15 13 2 5\n14 3 4 1\n12 6 8 9\n16 7 10 11', isHidden: false },
      { input: '1\n1', expectedOutput: '1', isHidden: false },
      { input: '2\n1 2\n3 4', expectedOutput: '3 1\n4 2', isHidden: true },
      { input: '3\n5 1 2\n9 6 3\n8 7 4', expectedOutput: '8 9 5\n7 6 1\n4 3 2', isHidden: true },
    ],
  },

  // 10. Minimum Size Subarray Sum
  {
    title: 'Minimum Size Subarray Sum',
    slug: 'minimum-size-subarray-sum',
    description: `Given an array of positive integers \`nums\` and a positive integer \`target\`, return the **minimal length** of a subarray whose sum is greater than or equal to \`target\`. If there is no such subarray, return \`0\` instead.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= target <= 10^9\n1 <= nums.length <= 10^5\n1 <= nums[i] <= 10^4`,
    inputFormat: `Line 1: Target integer \`target\`.\nLine 2: Space-separated positive integers \`nums\`.`,
    outputFormat: `Minimum length of subarray or \`0\`.`,
    sampleInput: `7\n2 3 1 2 4 3`,
    sampleOutput: `2`,
    points: 150,
    hints: [
      'Use a variable-length sliding window [l, r].',
      'Add nums[r] to current sum. While sum >= target, update min length and subtract nums[l++].',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    target = int(lines[0].strip())
    nums = list(map(int, lines[1].strip().split()))

    min_len = float('inf')
    cur_sum = 0
    l = 0

    for r in range(len(nums)):
        cur_sum += nums[r]
        while cur_sum >= target:
            min_len = min(min_len, r - l + 1)
            cur_sum -= nums[l]
            l += 1

    print(min_len if min_len != float('inf') else 0)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const target = parseInt(lines[0].trim(), 10);
    const nums = lines[1].trim().split(/\\s+/).map(Number);

    let minLen = Infinity;
    let curSum = 0;
    let l = 0;

    for (let r = 0; r < nums.length; r++) {
        curSum += nums[r];
        while (curSum >= target) {
            minLen = Math.min(minLen, r - l + 1);
            curSum -= nums[l];
            l++;
        }
    }

    console.log(minLen !== Infinity ? minLen : 0);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    target = int(lines[0].strip())
    nums = list(map(int, lines[1].strip().split()))

    min_len = float('inf')
    cur_sum = 0
    l = 0

    for r in range(len(nums)):
        cur_sum += nums[r]
        while cur_sum >= target:
            min_len = min(min_len, r - l + 1)
            cur_sum -= nums[l]
            l += 1

    print(min_len if min_len != float('inf') else 0)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const target = parseInt(lines[0].trim(), 10);
    const nums = lines[1].trim().split(/\\s+/).map(Number);

    let minLen = Infinity;
    let curSum = 0;
    let l = 0;

    for (let r = 0; r < nums.length; r++) {
        curSum += nums[r];
        while (curSum >= target) {
            minLen = Math.min(minLen, r - l + 1);
            curSum -= nums[l];
            l++;
        }
    }

    console.log(minLen !== Infinity ? minLen : 0);
}

solve();
`,
    },
    editorial: {
      approach: 'Two Pointers Sliding Window Contraction',
      algorithm: 'Expand right pointer to satisfy sum >= target, then contract left pointer to minimize length.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'Classic sliding window minimum interval search.',
      referenceCode: `def min_sub_array_len(target, nums):
    # sliding window
    pass`,
    },
    tags: ['Array', 'Binary Search', 'Sliding Window', 'Prefix Sum'],
    testCases: [
      { input: '7\n2 3 1 2 4 3', expectedOutput: '2', isHidden: false },
      { input: '4\n1 4 4', expectedOutput: '1', isHidden: false },
      { input: '11\n1 1 1 1 1 1 1 1', expectedOutput: '0', isHidden: false },
      { input: '15\n1 2 3 4 5', expectedOutput: '5', isHidden: true },
    ],
  },

  // 11. Max Consecutive Ones III
  {
    title: 'Max Consecutive Ones III',
    slug: 'max-consecutive-ones-iii',
    description: `Given a binary array \`nums\` and an integer \`k\`, return the maximum number of consecutive \`1\`'s in the array if you can flip at most \`k\` \`0\`'s.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 10^5\nnums[i] is either 0 or 1.\n0 <= k <= nums.length`,
    inputFormat: `Line 1: An integer \`k\`.\nLine 2: Space-separated binary integers \`nums\`.`,
    outputFormat: `Maximum length of consecutive 1s.`,
    sampleInput: `2\n1 1 1 0 0 0 1 1 1 1 0`,
    sampleOutput: `6`,
    points: 150,
    hints: [
      'Maintain count of zeros in window [l, r].',
      'When zero count exceeds k, advance left pointer until zero count <= k.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    k = int(lines[0].strip())
    nums = list(map(int, lines[1].strip().split()))

    l = 0
    zeros = 0
    max_len = 0

    for r in range(len(nums)):
        if nums[r] == 0:
            zeros += 1
        while zeros > k:
            if nums[l] == 0:
                zeros -= 1
            l += 1
        max_len = max(max_len, r - l + 1)

    print(max_len)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const k = parseInt(lines[0].trim(), 10);
    const nums = lines[1].trim().split(/\\s+/).map(Number);

    let l = 0, zeros = 0, maxLen = 0;
    for (let r = 0; r < nums.length; r++) {
        if (nums[r] === 0) zeros++;
        while (zeros > k) {
            if (nums[l] === 0) zeros--;
            l++;
        }
        maxLen = Math.max(maxLen, r - l + 1);
    }
    console.log(maxLen);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    k = int(lines[0].strip())
    nums = list(map(int, lines[1].strip().split()))

    l = 0
    zeros = 0
    max_len = 0

    for r in range(len(nums)):
        if nums[r] == 0:
            zeros += 1
        while zeros > k:
            if nums[l] == 0:
                zeros -= 1
            l += 1
        max_len = max(max_len, r - l + 1)

    print(max_len)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const k = parseInt(lines[0].trim(), 10);
    const nums = lines[1].trim().split(/\\s+/).map(Number);

    let l = 0, zeros = 0, maxLen = 0;
    for (let r = 0; r < nums.length; r++) {
        if (nums[r] === 0) zeros++;
        while (zeros > k) {
            if (nums[l] === 0) zeros--;
            l++;
        }
        maxLen = Math.max(maxLen, r - l + 1);
    }
    console.log(maxLen);
}

solve();
`,
    },
    editorial: {
      approach: 'Two Pointers Sliding Window with Zero Budget',
      algorithm: 'Window maintains at most k zeros.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'Standard binary sliding window maximization.',
      referenceCode: `def longest_ones(nums, k):
    # sliding window
    pass`,
    },
    tags: ['Array', 'Binary Search', 'Sliding Window', 'Prefix Sum'],
    testCases: [
      { input: '2\n1 1 1 0 0 0 1 1 1 1 0', expectedOutput: '6', isHidden: false },
      { input: '3\n0 0 1 1 0 0 1 1 1 0 1 1 0 0 0 1 1 1 1', expectedOutput: '10', isHidden: false },
      { input: '0\n0 0 0', expectedOutput: '0', isHidden: false },
      { input: '1\n1 0 1', expectedOutput: '3', isHidden: true },
    ],
  },

  // 12. Kth Largest Element via Min-Heap Stream
  {
    title: 'Kth Largest Element via Min-Heap Stream',
    slug: 'kth-largest-element-heap-stream',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\`-th largest element in the array.

Note that it is the \`k\`-th largest element in the sorted order, not the \`k\`-th distinct element.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= k <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4`,
    inputFormat: `Line 1: An integer \`k\`.\nLine 2: Space-separated integers of \`nums\`.`,
    outputFormat: `The \`k\`-th largest element.`,
    sampleInput: `2\n3 2 1 5 6 4`,
    sampleOutput: `5`,
    points: 150,
    hints: [
      'Use a min-heap of size k, or Quickselect for O(n) average time complexity.',
    ],
    codeTemplates: {
      python: `import sys
import heapq

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    k = int(lines[0].strip())
    nums = list(map(int, lines[1].strip().split()))
    h = []
    for x in nums:
        heapq.heappush(h, x)
        if len(h) > k:
            heapq.heappop(h)
    print(h[0])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const k = parseInt(lines[0].trim(), 10);
    const nums = lines[1].trim().split(/\\s+/).map(Number);
    nums.sort((a, b) => b - a);
    console.log(nums[k - 1]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
import heapq

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    k = int(lines[0].strip())
    nums = list(map(int, lines[1].strip().split()))
    h = []
    for x in nums:
        heapq.heappush(h, x)
        if len(h) > k:
            heapq.heappop(h)
    print(h[0])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const k = parseInt(lines[0].trim(), 10);
    const nums = lines[1].trim().split(/\\s+/).map(Number);
    nums.sort((a, b) => b - a);
    console.log(nums[k - 1]);
}

solve();
`,
    },
    editorial: {
      approach: 'Min-Heap of Size K / Quickselect',
      algorithm: 'Maintain min-heap of top k elements.',
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(k)',
      content: 'Classic priority queue selection algorithm.',
      referenceCode: `def find_kth_largest(nums, k):
    return heapq.nlargest(k, nums)[-1]`,
    },
    tags: ['Array', 'Divide and Conquer', 'Sorting', 'Heap (Priority Queue)', 'Quickselect'],
    testCases: [
      { input: '2\n3 2 1 5 6 4', expectedOutput: '5', isHidden: false },
      { input: '4\n3 2 3 1 2 4 5 5 6', expectedOutput: '4', isHidden: false },
      { input: '1\n1', expectedOutput: '1', isHidden: false },
      { input: '3\n7 10 4 3 20 15', expectedOutput: '10', isHidden: true },
    ],
  },

  // 13. Merge k Sorted Lists
  {
    title: 'Merge k Sorted Lists',
    slug: 'merge-k-sorted-lists',
    description: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `k == lists.length\n0 <= k <= 10^4\n0 <= lists[i].length <= 500\n-10^4 <= lists[i][j] <= 10^4\nlists[i] is sorted in ascending order.\nThe sum of lists[i].length will not exceed 10^4.`,
    inputFormat: `Line 1: An integer \`k\` (number of lists).\nNext \`k\` lines: Space-separated integers of each sorted list (empty line for empty list).`,
    outputFormat: `Merged space-separated sorted list.`,
    sampleInput: `3\n1 4 5\n1 3 4\n2 6`,
    sampleOutput: `1 1 2 3 4 4 5 6`,
    points: 300,
    hints: [
      'Use a min-heap to keep the minimum current head across all k lists.',
      'Alternatively use divide-and-conquer to merge pairs of lists in O(N log k).',
    ],
    codeTemplates: {
      python: `import sys
import heapq

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if not lines or not lines[0]: return
    k = int(lines[0].strip())
    h = []
    for i in range(1, k + 1):
        if i < len(lines):
            nums = [int(x) for x in lines[i].strip().split() if x]
            for val in nums:
                h.append(val)
    h.sort()
    print(' '.join(map(str, h)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length === 0 || !lines[0]) return;
    const k = parseInt(lines[0].trim(), 10);
    const nums = [];
    for (let i = 1; i <= k; i++) {
        if (i < lines.length && lines[i].trim()) {
            const parts = lines[i].trim().split(/\\s+/).map(Number);
            nums.push(...parts);
        }
    }
    nums.sort((a, b) => a - b);
    console.log(nums.join(' '));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
import heapq

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if not lines or not lines[0]: return
    k = int(lines[0].strip())
    h = []
    for i in range(1, k + 1):
        if i < len(lines):
            nums = [int(x) for x in lines[i].strip().split() if x]
            for val in nums:
                h.append(val)
    h.sort()
    print(' '.join(map(str, h)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length === 0 || !lines[0]) return;
    const k = parseInt(lines[0].trim(), 10);
    const nums = [];
    for (let i = 1; i <= k; i++) {
        if (i < lines.length && lines[i].trim()) {
            const parts = lines[i].trim().split(/\\s+/).map(Number);
            nums.push(...parts);
        }
    }
    nums.sort((a, b) => a - b);
    console.log(nums.join(' '));
}

solve();
`,
    },
    editorial: {
      approach: 'Min-Heap Priority Queue / Divide and Conquer Merge',
      algorithm: 'Repeatedly extract minimum node value across active k list pointers in O(N log k).',
      timeComplexity: 'O(N log k)',
      spaceComplexity: 'O(k)',
      content: 'Classic multiway merge algorithm.',
      referenceCode: `def merge_k_lists(lists):
    # heap / divide & conquer
    pass`,
    },
    tags: ['Linked List', 'Divide and Conquer', 'Heap (Priority Queue)', 'Merge Sort'],
    testCases: [
      { input: '3\n1 4 5\n1 3 4\n2 6', expectedOutput: '1 1 2 3 4 4 5 6', isHidden: false },
      { input: '0', expectedOutput: '', isHidden: false },
      { input: '1\n', expectedOutput: '', isHidden: false },
      { input: '2\n-2 -1 0\n-3 1', expectedOutput: '-3 -2 -1 0 1', isHidden: true },
    ],
  },

  // 14. Find Median from Data Stream
  {
    title: 'Find Median from Data Stream',
    slug: 'find-median-from-data-stream',
    description: `The **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

Implement the MedianFinder class supporting:
- \`addNum(num)\`: Adds the integer \`num\` from the data stream.
- \`findMedian()\`: Returns the median of all elements so far formatted with 1 decimal place (e.g. \`1.5\` or \`2.0\`).`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `-10^5 <= num <= 10^5\nThere will be at least one element in the data structure before calling findMedian.\nAt most 5 * 10^4 calls will be made to addNum and findMedian.`,
    inputFormat: `Line 1: Number of operations \`q\`.\nNext \`q\` lines: \`addNum <x>\` or \`findMedian\`.`,
    outputFormat: `For each \`findMedian\` call, print the float median with 1 decimal place.`,
    sampleInput: `5\naddNum 1\naddNum 2\nfindMedian\naddNum 3\nfindMedian`,
    sampleOutput: `1.5\n2.0`,
    points: 300,
    hints: [
      'Maintain two heaps: max-heap for lower half and min-heap for upper half.',
      'Balance sizes so max-heap has at most 1 more element than min-heap.',
    ],
    codeTemplates: {
      python: `import sys
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap (invert values)
        self.large = []  # min-heap

    def add_num(self, num):
        heapq.heappush(self.small, -num)
        if self.small and self.large and (-self.small[0] > self.large[0]):
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        if len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)

    def find_median(self):
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if not lines or not lines[0]: return
    q = int(lines[0].strip())
    mf = MedianFinder()
    for i in range(1, q + 1):
        parts = lines[i].strip().split()
        if not parts: continue
        if parts[0] == 'addNum':
            mf.add_num(int(parts[1]))
        elif parts[0] == 'findMedian':
            print(f"{mf.find_median():.1f}")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const q = parseInt(lines[0].trim(), 10);
    const nums = [];

    for (let i = 1; i <= q; i++) {
        const parts = lines[i].trim().split(/\\s+/);
        if (parts.length === 0 || !parts[0]) continue;
        if (parts[0] === 'addNum') {
            const x = parseInt(parts[1], 10);
            let l = 0, r = nums.length;
            while (l < r) {
                const mid = (l + r) >> 1;
                if (nums[mid] < x) l = mid + 1;
                else r = mid;
            }
            nums.splice(l, 0, x);
        } else if (parts[0] === 'findMedian') {
            const n = nums.length;
            if (n % 2 === 1) {
                console.log(nums[Math.floor(n / 2)].toFixed(1));
            } else {
                const med = (nums[n / 2 - 1] + nums[n / 2]) / 2.0;
                console.log(med.toFixed(1));
            }
        }
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap (invert values)
        self.large = []  # min-heap

    def add_num(self, num):
        heapq.heappush(self.small, -num)
        if self.small and self.large and (-self.small[0] > self.large[0]):
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        if len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)

    def find_median(self):
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if not lines or not lines[0]: return
    q = int(lines[0].strip())
    mf = MedianFinder()
    for i in range(1, q + 1):
        parts = lines[i].strip().split()
        if not parts: continue
        if parts[0] == 'addNum':
            mf.add_num(int(parts[1]))
        elif parts[0] == 'findMedian':
            print(f"{mf.find_median():.1f}")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const q = parseInt(lines[0].trim(), 10);
    const nums = [];

    for (let i = 1; i <= q; i++) {
        const parts = lines[i].trim().split(/\\s+/);
        if (parts.length === 0 || !parts[0]) continue;
        if (parts[0] === 'addNum') {
            const x = parseInt(parts[1], 10);
            let l = 0, r = nums.length;
            while (l < r) {
                const mid = (l + r) >> 1;
                if (nums[mid] < x) l = mid + 1;
                else r = mid;
            }
            nums.splice(l, 0, x);
        } else if (parts[0] === 'findMedian') {
            const n = nums.length;
            if (n % 2 === 1) {
                console.log(nums[Math.floor(n / 2)].toFixed(1));
            } else {
                const med = (nums[n / 2 - 1] + nums[n / 2]) / 2.0;
                console.log(med.toFixed(1));
            }
        }
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Two Balanced Heaps (Min-Heap and Max-Heap)',
      algorithm: 'Maintain left max-heap and right min-heap to fetch median in O(1) time and insert in O(log n).',
      timeComplexity: 'addNum: O(log n), findMedian: O(1)',
      spaceComplexity: 'O(n)',
      content: 'Standard dual heap stream statistics tracking.',
      referenceCode: `class MedianFinder:
    # dual heap
    pass`,
    },
    tags: ['Two Pointers', 'Design', 'Sorting', 'Heap (Priority Queue)', 'Data Stream'],
    testCases: [
      { input: '5\naddNum 1\naddNum 2\nfindMedian\naddNum 3\nfindMedian', expectedOutput: '1.5\n2.0', isHidden: false },
      { input: '3\naddNum -1\nfindMedian\naddNum -2', expectedOutput: '-1.0', isHidden: false },
      { input: '4\naddNum 6\naddNum 10\naddNum 2\nfindMedian', expectedOutput: '6.0', isHidden: true },
    ],
  },

  // 15. Redundant Connection
  {
    title: 'Redundant Connection',
    slug: 'redundant-connection',
    description: `In this problem, a tree is an **undirected graph** that is connected and has no cycles.

You are given a graph that started as a tree with \`n\` nodes labeled from \`1\` to \`n\`, with one additional edge added. The added edge has two different vertices chosen from \`1\` to \`n\`, and was not an edge that already existed. The graph is represented as an array \`edges\` of length \`n\` where \`edges[i] = [ai, bi]\` indicates that there is an edge between nodes \`ai\` and \`bi\` in the graph.

Return an edge that can be removed so that the resulting graph is a tree of \`n\` nodes. If there are multiple answers, return the answer that occurs **last** in the input.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `n == edges.length\n3 <= n <= 1000\nedges[i].length == 2\n1 <= ai < bi <= edges.length\nai != bi\nThere are no repeated edges.`,
    inputFormat: `Line 1: An integer \`n\` (number of edges).\nNext \`n\` lines: Two integers \`u v\` representing each edge.`,
    outputFormat: `Two integers \`u v\` representing the redundant edge.`,
    sampleInput: `3\n1 2\n1 3\n2 3`,
    sampleOutput: `2 3`,
    points: 150,
    hints: [
      'Use Disjoint Set Union (Union-Find).',
      'The first edge that connects two nodes already in the same connected component creates the cycle.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    parent = list(range(n + 1))

    def find(i):
        if parent[i] == i: return i
        parent[i] = find(parent[i])
        return parent[i]

    idx = 1
    redundant = None
    for _ in range(n):
        u = int(tokens[idx])
        v = int(tokens[idx+1])
        idx += 2
        ru, rv = find(u), find(v)
        if ru == rv:
            redundant = (u, v)
        else:
            parent[ru] = rv

    if redundant:
        print(f"{redundant[0]} {redundant[1]}")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const n = parseInt(tokens[0], 10);
    const parent = Array.from({ length: n + 1 }, (_, i) => i);

    function find(i) {
        if (parent[i] === i) return i;
        return parent[i] = find(parent[i]);
    }

    let redundant = null;
    let idx = 1;
    for (let i = 0; i < n; i++) {
        const u = parseInt(tokens[idx++], 10);
        const v = parseInt(tokens[idx++], 10);
        const ru = find(u), rv = find(v);
        if (ru === rv) redundant = [u, v];
        else parent[ru] = rv;
    }

    if (redundant) {
        console.log(\`\${redundant[0]} \${redundant[1]}\`);
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    parent = list(range(n + 1))

    def find(i):
        if parent[i] == i: return i
        parent[i] = find(parent[i])
        return parent[i]

    idx = 1
    redundant = None
    for _ in range(n):
        u = int(tokens[idx])
        v = int(tokens[idx+1])
        idx += 2
        ru, rv = find(u), find(v)
        if ru == rv:
            redundant = (u, v)
        else:
            parent[ru] = rv

    if redundant:
        print(f"{redundant[0]} {redundant[1]}")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const n = parseInt(tokens[0], 10);
    const parent = Array.from({ length: n + 1 }, (_, i) => i);

    function find(i) {
        if (parent[i] === i) return i;
        return parent[i] = find(parent[i]);
    }

    let redundant = null;
    let idx = 1;
    for (let i = 0; i < n; i++) {
        const u = parseInt(tokens[idx++], 10);
        const v = parseInt(tokens[idx++], 10);
        const ru = find(u), rv = find(v);
        if (ru === rv) redundant = [u, v];
        else parent[ru] = rv;
    }

    if (redundant) {
        console.log(\`\${redundant[0]} \${redundant[1]}\`);
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Disjoint Set Union (DSU) Incremental Cycle Detection',
      algorithm: 'Connect endpoints into disjoint sets. If both endpoints already share an ancestor root, that edge creates the cycle.',
      timeComplexity: 'O(n * alpha(n))',
      spaceComplexity: 'O(n)',
      content: 'Classic Union-Find cycle discovery in undirected graphs.',
      referenceCode: `def find_redundant_connection(edges):
    # DSU find cycle
    pass`,
    },
    tags: ['Depth-First Search', 'Breadth-First Search', 'Union Find', 'Graph'],
    testCases: [
      { input: '3\n1 2\n1 3\n2 3', expectedOutput: '2 3', isHidden: false },
      { input: '5\n1 2\n2 3\n3 4\n1 4\n1 5', expectedOutput: '1 4', isHidden: false },
      { input: '4\n1 2\n2 3\n3 1\n1 4', expectedOutput: '3 1', isHidden: true },
    ],
  },
];
