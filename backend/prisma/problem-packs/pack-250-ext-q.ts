import { Difficulty } from '@prisma/client';

export const pack250ExtQDefs = [
  {
    title: 'N-Queens II Distinct Solutions Count',
    slug: 'n-queens-ii-distinct-solutions',
    description: `The $n$-queens puzzle is the problem of placing $n$ queens on an $n \\times n$ chessboard such that no two queens attack each other.

Given an integer $n$, return the number of distinct solutions to the $n$-queens puzzle.

### Constraints
- $1 \\le n \\le 9$

### Input Format
- A single integer $n$.

### Output Format
- Return an integer representing the total number of distinct solutions.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['backtracking', 'bitmask'],
    roadmapLevel: 6,
    roadmapTopic: 'advanced-dp',
    templates: {
      python: `class Solution:\n    def totalNQueens(self, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    totalNQueens(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def totalNQueens(self, n: int) -> int:
        count = 0
        
        def backtrack(row, cols, diag1, diag2):
            nonlocal count
            if row == n:
                count += 1
                return
            # Available positions: ~(cols | diag1 | diag2) & full_mask
            available = ((1 << n) - 1) & ~(cols | diag1 | diag2)
            while available:
                pos = available & (-available) # lowest set bit
                available -= pos
                backtrack(row + 1, cols | pos, (diag1 | pos) << 1, (diag2 | pos) >> 1)
                
        backtrack(0, 0, 0, 0)
        return count`,
      javascript: `class Solution {\n    totalNQueens(n) {\n        let count = 0;\n        const fullMask = (1 << n) - 1;\n        \n        const backtrack = (row, cols, diag1, diag2) => {\n            if (row === n) {\n                count++;\n                return;\n            }\n            let available = fullMask & ~(cols | diag1 | diag2);\n            while (available > 0) {\n                const pos = available & (-available);\n                available -= pos;\n                backtrack(row + 1, cols | pos, (diag1 | pos) << 1, (diag2 | pos) >> 1);\n            }\n        };\n        \n        backtrack(0, 0, 0, 0);\n        return count;\n    }\n}`,
    },
    hints: [
      'Use bitmasks to track occupied columns, main diagonals, and anti-diagonals in O(1) per queen placement.',
      'Diag1 shifts left << 1 each row; Diag2 shifts right >> 1 each row.',
    ],
    editorial: `### Method Explanation
Bitmask Backtracking:
- Maintain 3 bitmasks: $cols$, $diag1$ (shifted left), and $diag2$ (shifted right).
- In each row, available column positions are given by $\\sim(cols \\mid diag1 \\mid diag2) \\ \\& \\ ((1 \\ll n) - 1)$.
- Iterate using lowest set bit isolation $pos = available \\ \\& \\ (-available)$ until exhausted.

### Complexity
- **Time Complexity:** $O(N!)$.
- **Space Complexity:** $O(N)$ recursion depth.`,
    testCases: [
      { input: '4', expectedOutput: '2', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: false },
      { input: '8', expectedOutput: '92', isHidden: false },
      { input: '9', expectedOutput: '352', isHidden: true },
    ],
  },
  {
    title: 'Sudoku Solver Exact Cover',
    slug: 'sudoku-solver-exact-cover',
    description: `Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:
1. Each of the digits \`1-9\` must occur exactly once in each row.
2. Each of the digits \`1-9\` must occur exactly once in each column.
3. Each of the digits \`1-9\` must occur exactly once in each of the 9 \`3x3\` sub-boxes of the grid.

The '.' character indicates empty cells.

Return the completed $9 \\times 9$ board.

### Constraints
- $board.length == 9$
- $board[i].length == 9$
- $board[i][j]$ is a digit \`1-9\` or \`'.'\`.
- It is guaranteed that the input board has a unique solution.

### Input Format
- A 2D string array $board$ of size $9 \\times 9$.

### Output Format
- Return the solved 2D string array.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['backtracking', 'array', 'matrix'],
    roadmapLevel: 6,
    roadmapTopic: 'advanced-dp',
    templates: {
      python: `class Solution:\n    def solveSudoku(self, board: list[list[str]]) -> list[list[str]]:\n        pass`,
      javascript: `class Solution {\n    solveSudoku(board) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def solveSudoku(self, board: list[list[str]]) -> list[list[str]]:
        rows = [set() for _ in range(9)]
        cols = [set() for _ in range(9)]
        boxes = [set() for _ in range(9)]
        empty_cells = []
        
        for r in range(9):
            for c in range(9):
                val = board[r][c]
                if val != '.':
                    rows[r].add(val)
                    cols[c].add(val)
                    boxes[(r // 3) * 3 + (c // 3)].add(val)
                else:
                    empty_cells.append((r, c))
                    
        def solve(idx):
            if idx == len(empty_cells):
                return True
            r, c = empty_cells[idx]
            b_idx = (r // 3) * 3 + (c // 3)
            for d in map(str, range(1, 10)):
                if d not in rows[r] and d not in cols[c] and d not in boxes[b_idx]:
                    board[r][c] = d
                    rows[r].add(d)
                    cols[c].add(d)
                    boxes[b_idx].add(d)
                    if solve(idx + 1):
                        return True
                    board[r][c] = '.'
                    rows[r].remove(d)
                    cols[c].remove(d)
                    boxes[b_idx].remove(d)
            return False
            
        solve(0)
        return board`,
      javascript: `class Solution {\n    solveSudoku(board) {\n        const rows = Array.from({ length: 9 }, () => new Set());\n        const cols = Array.from({ length: 9 }, () => new Set());\n        const boxes = Array.from({ length: 9 }, () => new Set());\n        const empty = [];\n        \n        for (let r = 0; r < 9; r++) {\n            for (let c = 0; c < 9; c++) {\n                const val = board[r][c];\n                if (val !== '.') {\n                    rows[r].add(val);\n                    cols[c].add(val);\n                    boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)].add(val);\n                } else {\n                    empty.push([r, c]);\n                }\n            }\n        }\n        \n        const solve = (idx) => {\n            if (idx === empty.length) return true;\n            const [r, c] = empty[idx];\n            const bIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);\n            for (let d = 1; d <= 9; d++) {\n                const s = String(d);\n                if (!rows[r].has(s) && !cols[c].has(s) && !boxes[bIdx].has(s)) {\n                    board[r][c] = s;\n                    rows[r].add(s);\n                    cols[c].add(s);\n                    boxes[bIdx].add(s);\n                    if (solve(idx + 1)) return true;\n                    board[r][c] = '.';\n                    rows[r].delete(s);\n                    cols[c].delete(s);\n                    boxes[bIdx].delete(s);\n                }\n            }\n            return false;\n        };\n        \n        solve(0);\n        return board;\n    }\n}`,
    },
    hints: [
      'Maintain sets of existing numbers for each of the 9 rows, 9 columns, and 9 boxes.',
      'Recursively backtrack through all empty cells.',
    ],
    editorial: `### Method Explanation
Backtracking with Constraint Propagation:
- Track used digits in sets for each row, column, and $3 \\times 3$ box in $O(1)$ lookup time.
- Iterate through empty cells; try placing digits $1 \\dots 9$ that satisfy all three constraints.
- Backtrack upon hitting dead ends.

### Complexity
- **Time Complexity:** $O(9^m)$ where $m \\le 81$ is empty cells (fast in practice with pruning).
- **Space Complexity:** $O(81) = O(1)$.`,
    testCases: [
      {
        input: '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        expectedOutput: '[["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]',
        isHidden: false,
      },
      {
        input: '[["8",".",".",".",".",".",".",".","."],[".",".","3","6",".",".",".",".","."],[".","7",".",".","9",".","2",".","."],[".","5",".",".",".","7",".",".","."],[".",".",".",".","4","5","7",".","."],[".",".",".","1",".",".",".","3","."],[".",".","1",".",".",".",".","6","8"],[".",".","8","5",".",".",".","1","."],[".","9",".",".",".",".","4",".","."]]',
        expectedOutput: '[["8","1","2","7","5","3","6","4","9"],["9","4","3","6","8","2","1","7","5"],["6","7","5","4","9","1","2","8","3"],["1","5","4","2","3","7","8","9","6"],["3","6","9","8","4","5","7","2","1"],["2","8","7","1","6","9","5","3","4"],["5","2","1","9","7","4","3","6","8"],["4","3","8","5","2","6","9","1","7"],["7","9","6","3","1","8","4","5","2"]]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Word Ladder II Shortest Transformation Paths',
    slug: 'word-ladder-ii-shortest-paths',
    description: `A transformation sequence from word $beginWord$ to word $endWord$ using a dictionary $wordList$ is a sequence of words $beginWord \\to s_1 \\to s_2 \\to \\dots \\to s_k$ such that:
- Every adjacent pair of words differs by a single letter.
- Every $s_i$ for $1 \\le i \\le k$ is in $wordList$.
- $s_k == endWord$.

Given two words, $beginWord$ and $endWord$, and a dictionary $wordList$, return all the shortest transformation sequences from $beginWord$ to $endWord$, or an empty list if no such sequence exists. Each sequence should be returned as a list of the words $[beginWord, s_1, s_2, \\dots, s_k]$.

### Constraints
- $1 \\le beginWord.length \\le 5$
- $endWord.length == beginWord.length$
- $1 \\le wordList.length \\le 500$
- $wordList[i].length == beginWord.length$
- $beginWord, endWord$, and $wordList[i]$ consist of lowercase English letters.
- $beginWord \\ne endWord$
- All the words in $wordList$ are unique.

### Input Format
- Two strings $beginWord, endWord$, and a list of strings $wordList$.

### Output Format
- Return a 2D array of all shortest transformation paths sorted lexicographically.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['graph', 'bfs', 'backtracking', 'shortest-path'],
    roadmapLevel: 5,
    roadmapTopic: 'advanced-graphs',
    templates: {
      python: `class Solution:\n    def findLadders(self, beginWord: str, endWord: str, wordList: list[str]) -> list[list[str]]:\n        pass`,
      javascript: `class Solution {\n    findLadders(beginWord, endWord, wordList) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findLadders(self, beginWord: str, endWord: str, wordList: list[str]) -> list[list[str]]:
        word_set = set(wordList)
        if endWord not in word_set:
            return []
            
        from collections import defaultdict
        
        # 1. BFS to build DAG of shortest paths
        layer = {beginWord: [[beginWord]]}
        word_set.discard(beginWord)
        
        while layer:
            next_layer = defaultdict(list)
            for word in layer:
                if word == endWord:
                    ans = layer[word]
                    ans.sort()
                    return ans
                for i in range(len(word)):
                    for c in 'abcdefghijklmnopqrstuvwxyz':
                        nxt = word[:i] + c + word[i+1:]
                        if nxt in word_set:
                            for path in layer[word]:
                                next_layer[nxt].append(path + [nxt])
            word_set -= set(next_layer.keys())
            layer = next_layer
            
        return []`,
      javascript: `class Solution {\n    findLadders(beginWord, endWord, wordList) {\n        const wordSet = new Set(wordList);\n        if (!wordSet.has(endWord)) return [];\n        \n        let layer = new Map();\n        layer.set(beginWord, [[beginWord]]);\n        wordSet.delete(beginWord);\n        \n        while (layer.size > 0) {\n            const nextLayer = new Map();\n            for (const [word, paths] of layer.entries()) {\n                if (word === endWord) {\n                    paths.sort((a, b) => a.join(",").localeCompare(b.join(",")));\n                    return paths;\n                }\n                for (let i = 0; i < word.length; i++) {\n                    for (let code = 97; code <= 122; code++) {\n                        const ch = String.fromCharCode(code);\n                        const nxt = word.slice(0, i) + ch + word.slice(i + 1);\n                        if (wordSet.has(nxt)) {\n                            if (!nextLayer.has(nxt)) nextLayer.set(nxt, []);\n                            for (const path of paths) {\n                                nextLayer.get(nxt).push([...path, nxt]);\n                            }\n                        }\n                    }\n                }\n            }\n            for (const k of nextLayer.keys()) {\n                wordSet.delete(k);\n            }\n            layer = nextLayer;\n        }\n        return [];\n    }\n}`,
    },
    hints: [
      'Use level-by-level BFS to find the shortest path length and build the predecessor DAG.',
      'Remove visited words layer by layer (not individually) to allow multiple shortest paths to merge.',
    ],
    editorial: `### Method Explanation
Layer-by-layer Breadth-First Search:
- Maintain active paths per word in the current layer.
- Generate valid 1-edit mutated words that exist in $wordSet$.
- Delete words from $wordSet$ only after completing the entire layer, enabling multiple simultaneous shortest paths.
- Stop immediately when $endWord$ is discovered.

### Complexity
- **Time Complexity:** $O(N \\cdot 26 \\cdot L + \\text{paths})$.
- **Space Complexity:** $O(N \\cdot L)$.`,
    testCases: [
      { input: '"hit", "cog", ["hot","dot","dog","lot","log","cog"]', expectedOutput: '[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]', isHidden: false },
      { input: '"hit", "cog", ["hot","dot","dog","lot","log"]', expectedOutput: '[]', isHidden: false },
      { input: '"a", "c", ["a","b","c"]', expectedOutput: '[["a","c"]]', isHidden: true },
    ],
  },
  {
    title: 'Count of Inversions Merge Sort',
    slug: 'count-of-inversions-merge-sort',
    description: `Given an integer array $nums$, return the number of inversions in the array.

An inversion is a pair of indices $(i, j)$ such that $0 \\le i < j < nums.length$ and $nums[i] > nums[j]$.

### Constraints
- $1 \\le nums.length \\le 10^5$
- $-10^9 \\le nums[i] \\le 10^9$

### Input Format
- An integer array $nums$.

### Output Format
- Return an integer representing the total count of inversions.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['divide-and-conquer', 'merge-sort', 'array'],
    roadmapLevel: 1,
    roadmapTopic: 'sorting-techniques',
    templates: {
      python: `class Solution:\n    def countInversions(self, nums: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    countInversions(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def countInversions(self, nums: list[int]) -> int:
        def merge_sort(arr):
            if len(arr) <= 1:
                return arr, 0
            mid = len(arr) // 2
            left, count_l = merge_sort(arr[:mid])
            right, count_r = merge_sort(arr[mid:])
            
            merged = []
            i = j = 0
            inversions = count_l + count_r
            
            while i < len(left) and j < len(right):
                if left[i] <= right[j]:
                    merged.append(left[i])
                    i += 1
                else:
                    merged.append(right[j])
                    inversions += len(left) - i
                    j += 1
            merged.extend(left[i:])
            merged.extend(right[j:])
            return merged, inversions
            
        _, ans = merge_sort(nums)
        return ans`,
      javascript: `class Solution {\n    countInversions(nums) {\n        const mergeSort = (arr) => {\n            if (arr.length <= 1) return { sorted: arr, count: 0 };\n            const mid = Math.floor(arr.length / 2);\n            const left = mergeSort(arr.slice(0, mid));\n            const right = mergeSort(arr.slice(mid));\n            \n            const merged = [];\n            let i = 0, j = 0;\n            let count = left.count + right.count;\n            \n            while (i < left.sorted.length && j < right.sorted.length) {\n                if (left.sorted[i] <= right.sorted[j]) {\n                    merged.push(left.sorted[i++]);\n                } else {\n                    merged.push(right.sorted[j++]);\n                    count += left.sorted.length - i;\n                }\n            }\n            while (i < left.sorted.length) merged.push(left.sorted[i++]);\n            while (j < right.sorted.length) merged.push(right.sorted[j++]);\n            return { sorted: merged, count };\n        };\n        return mergeSort(nums).count;\n    }\n}`,
    },
    hints: [
      'Modify Merge Sort.',
      'When an element from the right subarray is smaller than left[i], all remaining elements in left (length - i) form inversions with it.',
    ],
    editorial: `### Method Explanation
Divide and Conquer (Modified Merge Sort):
- Split array in halves, recursively counting inversions in left and right halves.
- During merge step: if $left[i] > right[j]$, then $right[j]$ is smaller than every remaining element from index $i$ to $|left|-1$.
- Add $|left| - i$ to the inversion count.

### Complexity
- **Time Complexity:** $O(N \\log N)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '[8,4,2,1]', expectedOutput: '6', isHidden: false },
      { input: '[3,1,2]', expectedOutput: '2', isHidden: false },
      { input: '[1,2,3,4,5]', expectedOutput: '0', isHidden: false },
      { input: '[5,4,3,2,1]', expectedOutput: '10', isHidden: true },
    ],
  },
  {
    title: 'Single Number III Two Unique Numbers',
    slug: 'single-number-iii-two-unique',
    description: `Given an integer array $nums$, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in any order.

You must write an algorithm that runs in linear runtime complexity and uses only constant extra space.

### Constraints
- $2 \\le nums.length \\le 3 \\times 10^4$
- $-2^{31} \\le nums[i] \\le 2^{31} - 1$
- Each integer in $nums$ will appear twice, only two integers will appear once.

### Input Format
- An integer array $nums$.

### Output Format
- Return an array containing the two unique numbers in sorted ascending order.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['bit-manipulation', 'array'],
    roadmapLevel: 1,
    roadmapTopic: 'bit-manipulation',
    templates: {
      python: `class Solution:\n    def singleNumber(self, nums: list[int]) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    singleNumber(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def singleNumber(self, nums: list[int]) -> list[int]:
        xor_sum = 0
        for x in nums:
            xor_sum ^= x
            
        # Find lowest set bit
        diff_bit = xor_sum & (-xor_sum)
        
        num1 = 0
        num2 = 0
        for x in nums:
            if x & diff_bit:
                num1 ^= x
            else:
                num2 ^= x
                
        ans = [num1, num2]
        ans.sort()
        return ans`,
      javascript: `class Solution {\n    singleNumber(nums) {\n        let xorSum = 0;\n        for (const x of nums) xorSum ^= x;\n        \n        const diffBit = xorSum & -xorSum;\n        let num1 = 0, num2 = 0;\n        \n        for (const x of nums) {\n            if (x & diffBit) {\n                num1 ^= x;\n            } else {\n                num2 ^= x;\n            }\n        }\n        const ans = [num1, num2];\n        ans.sort((a, b) => a - b);\n        return ans;\n    }\n}`,
    },
    hints: [
      'XOR of all elements gives A ^ B where A and B are the unique elements.',
      'Any set bit in (A ^ B) indicates a bit position where A and B differ.',
      'Partition array elements into two groups based on this differing bit and XOR each group separately.',
    ],
    editorial: `### Method Explanation
Bit Partitioning via XOR:
1. XOR sum of all elements yields $X = A \\oplus B$.
2. Because $A \\ne B$, $X \\ne 0$. Find the lowest set bit $L = X \\ \\& \\ (-X)$.
3. Partition the array into two subsets: those with bit $L$ set, and those with bit $L$ unset.
4. XORing each subset isolates $A$ and $B$ respectively in $O(N)$ time with $O(1)$ memory.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(1)$.`,
    testCases: [
      { input: '[1,2,1,3,2,5]', expectedOutput: '[3,5]', isHidden: false },
      { input: '[-1,0]', expectedOutput: '[-1,0]', isHidden: false },
      { input: '[0,1]', expectedOutput: '[0,1]', isHidden: false },
      { input: '[4,5,6,7,4,6]', expectedOutput: '[5,7]', isHidden: true },
    ],
  },
  {
    title: 'Maximum XOR With an Element From Array',
    slug: 'max-xor-element-array',
    description: `You are given an array $nums$ consisting of non-negative integers. You are also given a $queries$ array, where $queries[i] = [x_i, m_i]$.

The answer to the $i$-th query is the maximum bitwise \`XOR\` value of $x_i$ with any element of $nums$ that does not exceed $m_i$. In other words, the answer is $\\max(nums[j] \\oplus x_i)$ for all $j$ such that $nums[j] \\le m_i$. If all elements in $nums$ are larger than $m_i$, then the answer is -1.

Return an integer array $answer$ where $answer[i]$ is the answer to the $i$-th query.

### Constraints
- $1 \\le nums.length, queries.length \\le 10^5$
- $queries[i].length == 2$
- $0 \\le nums[j], x_i, m_i \\le 10^9$

### Input Format
- An integer array $nums$ and a 2D integer array $queries$.

### Output Format
- Return an array of maximum XOR results.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['bit-manipulation', 'trie', 'offline-queries'],
    roadmapLevel: 3,
    roadmapTopic: 'advanced-data-structures',
    templates: {
      python: `class Solution:\n    def maximizeXor(self, nums: list[int], queries: list[list[int]]) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    maximizeXor(nums, queries) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maximizeXor(self, nums: list[int], queries: list[list[int]]) -> list[int]:
        nums.sort()
        # Sort queries by m_i: (m_i, x_i, original_index)
        sorted_q = sorted((m, x, i) for i, (x, m) in enumerate(queries))
        
        trie = {}
        def insert(val):
            curr = trie
            for b in range(31, -1, -1):
                bit = (val >> b) & 1
                if bit not in curr:
                    curr[bit] = {}
                curr = curr[bit]
                
        def query(val):
            if not trie:
                return -1
            curr = trie
            ans = 0
            for b in range(31, -1, -1):
                bit = (val >> b) & 1
                targ = 1 - bit
                if targ in curr:
                    ans |= (1 << b)
                    curr = curr[targ]
                else:
                    curr = curr[bit]
            return ans
            
        res = [-1] * len(queries)
        idx = 0
        n = len(nums)
        
        for m, x, orig_idx in sorted_q:
            while idx < n and nums[idx] <= m:
                insert(nums[idx])
                idx += 1
            res[orig_idx] = query(x)
            
        return res`,
      javascript: `class Solution {\n    maximizeXor(nums, queries) {\n        nums.sort((a, b) => a - b);\n        const sortedQ = queries.map(([x, m], i) => [m, x, i]).sort((a, b) => a[0] - b[0]);\n        \n        const trie = {};\n        const insert = (val) => {\n            let curr = trie;\n            for (let b = 31; b >= 0; b--) {\n                const bit = (val >> b) & 1;\n                if (!curr[bit]) curr[bit] = {};\n                curr = curr[bit];\n            }\n        };\n        \n        const query = (val) => {\n            if (Object.keys(trie).length === 0) return -1;\n            let curr = trie;\n            let ans = 0;\n            for (let b = 31; b >= 0; b--) {\n                const bit = (val >> b) & 1;\n                const targ = 1 - bit;\n                if (curr[targ]) {\n                    ans |= (1 << b);\n                    curr = curr[targ];\n                } else {\n                    curr = curr[bit];\n                }\n            }\n            return ans;\n        };\n        \n        const res = new Array(queries.length).fill(-1);\n        let idx = 0;\n        const n = nums.length;\n        \n        for (const [m, x, origIdx] of sortedQ) {\n            while (idx < n && nums[idx] <= m) {\n                insert(nums[idx]);\n                idx++;\n            }\n            res[origIdx] = query(x);\n        }\n        return res;\n    }\n}`,
    },
    hints: [
      'Sort both nums and queries by m_i to process offline queries.',
      'Maintain a 32-bit binary prefix Trie, progressively inserting numbers <= m_i.',
      'For query x_i, greedily take opposite bits in the Trie to maximize XOR.',
    ],
    editorial: `### Method Explanation
Offline Queries with Binary Trie:
- Sort $nums$ and queries by $m_i$.
- Incrementally insert elements into a 32-bit binary prefix Trie as long as $nums[idx] \\le m_i$.
- For each query $(x_i, m_i)$, greedily navigate the Trie taking the opposite bit $(1 - bit)$ when present to set the most significant bit in the XOR result.

### Complexity
- **Time Complexity:** $O((N + Q) \\cdot 32 + N \\log N + Q \\log Q)$.
- **Space Complexity:** $O(32 N + Q)$.`,
    testCases: [
      { input: '[0,1,2,3,4], [[3,1],[1,3],[5,6]]', expectedOutput: '[3,3,7]', isHidden: false },
      { input: '[5,2,4,6,6,3], [[12,4],[8,1],[6,3]]', expectedOutput: '[15,-1,5]', isHidden: false },
      { input: '[1], [[1,0]]', expectedOutput: '[-1]', isHidden: true },
    ],
  },
  {
    title: 'Maximum Gap Linear Time',
    slug: 'maximum-gap-linear-time',
    description: `Given an integer array $nums$, return the maximum difference between two successive elements in its sorted form. If the array contains less than two elements, return 0.

You must write an algorithm that runs in linear time and uses linear extra space.

### Constraints
- $1 \\le nums.length \\le 10^5$
- $0 \\le nums[i] \\le 10^9$

### Input Format
- An integer array $nums$.

### Output Format
- Return the integer maximum gap.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['sorting-techniques', 'bucket-sort', 'array'],
    roadmapLevel: 1,
    roadmapTopic: 'sorting-techniques',
    templates: {
      python: `class Solution:\n    def maximumGap(self, nums: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    maximumGap(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maximumGap(self, nums: list[int]) -> int:
        n = len(nums)
        if n < 2:
            return 0
            
        min_v, max_v = min(nums), max(nums)
        if min_v == max_v:
            return 0
            
        import math
        # Bucket size based on Pigeonhole Principle
        bucket_size = max(1, (max_v - min_v) // (n - 1))
        bucket_count = (max_v - min_v) // bucket_size + 1
        
        buckets_min = [float('inf')] * bucket_count
        buckets_max = [float('-inf')] * bucket_count
        
        for x in nums:
            b_idx = (x - min_v) // bucket_size
            buckets_min[b_idx] = min(buckets_min[b_idx], x)
            buckets_max[b_idx] = max(buckets_max[b_idx], x)
            
        max_gap = 0
        prev_max = min_v
        
        for i in range(bucket_count):
            if buckets_min[i] == float('inf'):
                continue
            max_gap = max(max_gap, buckets_min[i] - prev_max)
            prev_max = buckets_max[i]
            
        return max_gap`,
      javascript: `class Solution {\n    maximumGap(nums) {\n        const n = nums.length;\n        if (n < 2) return 0;\n        \n        let minV = nums[0], maxV = nums[0];\n        for (const x of nums) {\n            if (x < minV) minV = x;\n            if (x > maxV) maxV = x;\n        }\n        if (minV === maxV) return 0;\n        \n        const bucketSize = Math.max(1, Math.floor((maxV - minV) / (n - 1)));\n        const bucketCount = Math.floor((maxV - minV) / bucketSize) + 1;\n        \n        const bMin = new Array(bucketCount).fill(Infinity);\n        const bMax = new Array(bucketCount).fill(-Infinity);\n        \n        for (const x of nums) {\n            const bIdx = Math.floor((x - minV) / bucketSize);\n            if (x < bMin[bIdx]) bMin[bIdx] = x;\n            if (x > bMax[bIdx]) bMax[bIdx] = x;\n        }\n        \n        let maxGap = 0;\n        let prevMax = minV;\n        \n        for (let i = 0; i < bucketCount; i++) {\n            if (bMin[i] === Infinity) continue;\n            maxGap = Math.max(maxGap, bMin[i] - prevMax);\n            prevMax = bMax[i];\n        }\n        return maxGap;\n    }\n}`,
    },
    hints: [
      'By Pigeonhole Principle, the maximum gap between elements cannot occur within the same bucket if bucket size is <= ceil((max - min) / (n - 1)).',
      'Track only min and max values within each bucket.',
      'The maximum gap is the difference between min of current bucket and max of previous non-empty bucket.',
    ],
    editorial: `### Method Explanation
Bucket Sort & Pigeonhole Principle:
- Given $N$ elements across range $[minV, maxV]$, the average gap is $(maxV - minV) / (N - 1)$.
- If we create buckets of size $B = \\max(1, \\lfloor (maxV - minV)/(N-1) \\rfloor)$, the maximum gap will strictly occur between consecutive non-empty buckets, never inside a single bucket.
- Compute the gap as $bucketMin[i] - prevBucketMax$.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '[3,6,9,1]', expectedOutput: '3', isHidden: false },
      { input: '[10]', expectedOutput: '0', isHidden: false },
      { input: '[1,10000000]', expectedOutput: '9999999', isHidden: true },
      { input: '[1,1,1,1]', expectedOutput: '0', isHidden: true },
    ],
  },
];
