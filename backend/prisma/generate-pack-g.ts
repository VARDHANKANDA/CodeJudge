import { writePack, ProblemSpec } from './pack-writer-util';

// PACK G: Backtracking & Search (19 problems)
const packG: ProblemSpec[] = [
  {
    title: 'Closest Subsequence Sum Meet in the Middle',
    slug: 'meet-in-the-middle-subset-sum',
    description: 'You are given an integer array `nums` and an integer `goal`. You want to choose a subsequence of `nums` such that the sum of its elements is closest to `goal`. Return the minimum absolute difference `|sum - goal|`.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= nums.length <= 40\n-10^7 <= nums[i] <= 10^7\n-10^9 <= goal <= 10^9',
    inputFormat: 'nums, goal',
    outputFormat: 'Minimum absolute difference.',
    sampleInput: '[5,-7,3,5], 6',
    sampleOutput: '0',
    points: 200,
    hints: [
      'Split nums into two halves of size <= 20.',
      'Generate all 2^20 subset sums for each half.',
      'Sort the second half of sums.',
      'For each sum in the first half, binary search for the closest complement in the second half.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def minAbsDifference(self, nums: list[int], goal: int) -> int:\n        pass`,
      javascript: `class Solution {\n    minAbsDifference(nums, goal) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `import bisect

class Solution:
    def minAbsDifference(self, nums: list[int], goal: int) -> int:
        def get_subset_sums(arr):
            sums = {0}
            for x in arr:
                sums |= {s + x for s in sums}
            return sorted(sums)
            
        n = len(nums)
        left_sums = get_subset_sums(nums[:n//2])
        right_sums = get_subset_sums(nums[n//2:])
        
        ans = abs(goal)
        for s in left_sums:
            target = goal - s
            idx = bisect.bisect_left(right_sums, target)
            if idx < len(right_sums):
                ans = min(ans, abs(s + right_sums[idx] - goal))
            if idx > 0:
                ans = min(ans, abs(s + right_sums[idx - 1] - goal))
        return ans`,
      javascript: `class Solution {
    minAbsDifference(nums, goal) {
        function getSubsetSums(arr) {
            let sums = [0];
            for (const x of arr) {
                const len = sums.length;
                for (let i = 0; i < len; i++) {
                    sums.push(sums[i] + x);
                }
            }
            return Array.from(new Set(sums)).sort((a, b) => a - b);
        }
        
        const mid = Math.floor(nums.length / 2);
        const leftSums = getSubsetSums(nums.slice(0, mid));
        const rightSums = getSubsetSums(nums.slice(mid));
        
        let ans = Math.abs(goal);
        for (const s of leftSums) {
            const target = goal - s;
            let l = 0, r = rightSums.length - 1;
            while (l <= r) {
                const m = Math.floor((l + r) / 2);
                ans = Math.min(ans, Math.abs(s + rightSums[m] - goal));
                if (rightSums[m] < target) {
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Meet in the middle subset sum partitioning.',
      algorithm: 'Split array into two 20-element halves, generating 2^20 subset sums each, then match via binary search.',
      timeComplexity: 'O(2^(N/2) * (N/2))',
      spaceComplexity: 'O(2^(N/2))',
      content: 'Reduces an intractable 2^40 problem to 2 * 2^20 operations.',
      referenceCode: `def minAbsDifference(nums: list[int], goal: int) -> int: ...`,
    },
    tags: ['Meet in the Middle', 'Binary Search', 'Two Pointers', 'Array'],
    testCases: [
      { input: '[5,-7,3,5], 6', expectedOutput: '0', isHidden: false },
      { input: '[7,-9,15,-2], -5', expectedOutput: '1', isHidden: false },
      { input: '[1,2,3], -7', expectedOutput: '7', isHidden: true },
      { input: '[10000000], 0', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: '24 Game Solver Expression Evaluator',
    slug: 'twenty-four-game-evaluator',
    description: 'You are given an integer array `cards` of length 4. You have four cards, each containing a number from 1 to 9. You need to judge whether they can operate through \'* \', \'/\', \'+\', \'-\', and parentheses to get the value 24. Return true if you can get 24, false otherwise.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'cards.length == 4\n1 <= cards[i] <= 9',
    inputFormat: 'cards',
    outputFormat: 'Boolean true or false.',
    sampleInput: '[4,1,8,7]',
    sampleOutput: 'true',
    points: 200,
    hints: [
      'Pick any two numbers a and b from the current list.',
      'Generate all possible results of a + b, a - b, b - a, a * b, and a / b (if b != 0 and vice versa).',
      'Replace the two numbers with the result, giving a list of length 3, and recursively evaluate.',
      'Base case: list length is 1, check if abs(val - 24) < 1e-5.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def judgePoint24(self, cards: list[int]) -> bool:\n        pass`,
      javascript: `class Solution {\n    judgePoint24(cards) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def judgePoint24(self, cards: list[int]) -> bool:
        EPSILON = 1e-5
        
        def solve(nums):
            if len(nums) == 1:
                return abs(nums[0] - 24) < EPSILON
            for i in range(len(nums)):
                for j in range(len(nums)):
                    if i != j:
                        nxt = [nums[k] for k in range(len(nums)) if k != i and k != j]
                        a, b = nums[i], nums[j]
                        candidates = [a + b, a - b, a * b]
                        if abs(b) > EPSILON:
                            candidates.append(a / b)
                        for c in candidates:
                            if solve(nxt + [c]):
                                return True
            return False
            
        return solve([float(x) for x in cards])`,
      javascript: `class Solution {
    judgePoint24(cards) {
        const EPSILON = 1e-5;
        
        function solve(nums) {
            if (nums.length === 1) {
                return Math.abs(nums[0] - 24) < EPSILON;
            }
            for (let i = 0; i < nums.length; i++) {
                for (let j = 0; j < nums.length; j++) {
                    if (i !== j) {
                        const nxt = nums.filter((_, k) => k !== i && k !== j);
                        const a = nums[i], b = nums[j];
                        const candidates = [a + b, a - b, a * b];
                        if (Math.abs(b) > EPSILON) candidates.push(a / b);
                        for (const c of candidates) {
                            if (solve([...nxt, c])) return true;
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
      approach: 'Recursive reduction backtracking.',
      algorithm: 'Pick any pair, apply 4 arithmetic operations, and recurse on reduced set of size N-1.',
      timeComplexity: 'O(1) (~9216 operations)',
      spaceComplexity: 'O(1)',
      content: 'Small constant search tree covering all expression trees and parenthesizations.',
      referenceCode: `def judgePoint24(cards: list[int]) -> bool: ...`,
    },
    tags: ['Backtracking', 'Math', 'Recursion'],
    testCases: [
      { input: '[4,1,8,7]', expectedOutput: 'true', isHidden: false },
      { input: '[1,2,1,2]', expectedOutput: 'false', isHidden: false },
      { input: '[3,3,8,8]', expectedOutput: 'true', isHidden: true },
      { input: '[1,1,1,1]', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Expression Add Operators Target Value',
    slug: 'expression-add-operators',
    description: 'Given a string `num` that contains only digits and an integer `target`, return all possibilities to insert binary operators \'+\', \'-\', and/or \'*\' between the digits of num so that the resultant expression evaluates to the target value.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= num.length <= 10\nnum consists of only digits.\n-2^31 <= target <= 2^31 - 1',
    inputFormat: 'num, target',
    outputFormat: 'List of valid expression strings sorted lexicographically.',
    sampleInput: '"123", 6',
    sampleOutput: '["1+2+3","1*2*3"]',
    points: 200,
    hints: [
      'Track current value and previous operand to handle multiplication precedence.',
      'For multiplication: new_val = val - prev + prev * curr, new_prev = prev * curr.',
      'Prevent leading zeros for multi-digit numbers.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def addOperators(self, num: str, target: int) -> list[str]:\n        pass`,
      javascript: `class Solution {\n    addOperators(num, target) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def addOperators(self, num: str, target: int) -> list[str]:
        ans = []
        n = len(num)
        
        def backtrack(idx, expr, val, prev):
            if idx == n:
                if val == target:
                    ans.append(expr)
                return
            for i in range(idx, n):
                if i > idx and num[idx] == '0':
                    break
                part = num[idx:i + 1]
                curr = int(part)
                if idx == 0:
                    backtrack(i + 1, part, curr, curr)
                else:
                    backtrack(i + 1, expr + '+' + part, val + curr, curr)
                    backtrack(i + 1, expr + '-' + part, val - curr, -curr)
                    backtrack(i + 1, expr + '*' + part, val - prev + prev * curr, prev * curr)
                    
        backtrack(0, "", 0, 0)
        return sorted(ans)`,
      javascript: `class Solution {
    addOperators(num, target) {
        const ans = [];
        const n = num.length;
        
        function backtrack(idx, expr, val, prev) {
            if (idx === n) {
                if (val === target) ans.push(expr);
                return;
            }
            for (let i = idx; i < n; i++) {
                if (i > idx && num[idx] === '0') break;
                const part = num.slice(idx, i + 1);
                const curr = Number(part);
                if (idx === 0) {
                    backtrack(i + 1, part, curr, curr);
                } else {
                    backtrack(i + 1, expr + '+' + part, val + curr, curr);
                    backtrack(i + 1, expr + '-' + part, val - curr, -curr);
                    backtrack(i + 1, expr + '*' + part, val - prev + prev * curr, prev * curr);
                }
            }
        }
        
        backtrack(0, "", 0, 0);
        return ans.sort();
    }
}`,
    },
    editorial: {
      approach: 'Backtracking with operator precedence rollback.',
      algorithm: 'Keep previous addend for instantaneous multiplication precedence rewriting.',
      timeComplexity: 'O(4^N)',
      spaceComplexity: 'O(N)',
      content: 'Standard expression generation tree with operator backtracking.',
      referenceCode: `def addOperators(num: str, target: int) -> list[str]: ...`,
    },
    tags: ['Backtracking', 'String', 'Math', 'Recursion'],
    testCases: [
      { input: '"123", 6', expectedOutput: '["1*2*3","1+2+3"]', isHidden: false },
      { input: '"232", 8', expectedOutput: '["2*3+2","2+3*2"]', isHidden: false },
      { input: '"105", 5', expectedOutput: '["1*0+5","10-5"]', isHidden: true },
      { input: '"00", 0', expectedOutput: '["0*0","0+0","0-0"]', isHidden: true },
    ],
  },
  {
    title: 'Restore Valid IP Addresses All Combinations',
    slug: 'restore-ip-addresses-all',
    description: 'A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros. Given a string `s` containing only digits, return all possible valid IP addresses that can be formed by inserting dots in `s`.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= s.length <= 20\ns consists of digits only.',
    inputFormat: 's',
    outputFormat: 'List of valid IP address strings.',
    sampleInput: '"25525511135"',
    sampleOutput: '["255.255.11.135","255.255.111.35"]',
    points: 150,
    hints: [
      'Split the string into 4 parts.',
      'Each part must have length 1 to 3.',
      'Check if each part is between 0 and 255 with no leading zeros (except for "0" itself).',
    ],
    codeTemplates: {
      python: `class Solution:\n    def restoreIpAddresses(self, s: str) -> list[str]:\n        pass`,
      javascript: `class Solution {\n    restoreIpAddresses(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def restoreIpAddresses(self, s: str) -> list[str]:
        ans = []
        n = len(s)
        
        def is_valid(seg):
            if not seg or len(seg) > 3:
                return False
            if len(seg) > 1 and seg[0] == '0':
                return False
            return 0 <= int(seg) <= 255
            
        def backtrack(idx, parts):
            if len(parts) == 4:
                if idx == n:
                    ans.append('.'.join(parts))
                return
            for l in range(1, 4):
                if idx + l <= n:
                    seg = s[idx:idx + l]
                    if is_valid(seg):
                        backtrack(idx + l, parts + [seg])
                        
        backtrack(0, [])
        return ans`,
      javascript: `class Solution {
    restoreIpAddresses(s) {
        const ans = [];
        const n = s.length;
        
        function isValid(seg) {
            if (!seg || seg.length > 3) return false;
            if (seg.length > 1 && seg[0] === '0') return false;
            const val = Number(seg);
            return val >= 0 && val <= 255;
        }
        
        function backtrack(idx, parts) {
            if (parts.length === 4) {
                if (idx === n) ans.push(parts.join('.'));
                return;
            }
            for (let l = 1; l <= 3; l++) {
                if (idx + l <= n) {
                    const seg = s.slice(idx, idx + l);
                    if (isValid(seg)) {
                        backtrack(idx + l, [...parts, seg]);
                    }
                }
            }
        }
        
        backtrack(0, []);
        return ans;
    }
}`,
    },
    editorial: {
      approach: '4-segment backtracking.',
      algorithm: 'Try chunk lengths of 1, 2, and 3, validating IPv4 octet bounds.',
      timeComplexity: 'O(3^4) = O(1)',
      spaceComplexity: 'O(1)',
      content: 'Exhaustive small-depth search.',
      referenceCode: `def restoreIpAddresses(s: str) -> list[str]: ...`,
    },
    tags: ['Backtracking', 'String'],
    testCases: [
      { input: '"25525511135"', expectedOutput: '["255.255.11.135","255.255.111.35"]', isHidden: false },
      { input: '"0000"', expectedOutput: '["0.0.0.0"]', isHidden: false },
      { input: '"101023"', expectedOutput: '["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]', isHidden: true },
      { input: '"010010"', expectedOutput: '["0.10.0.10","0.100.1.0"]', isHidden: true },
    ],
  },
  {
    title: 'Palindrome Partitioning All Combinations',
    slug: 'palindrome-partitioning-all-cuts',
    description: 'Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return all possible palindrome partitionings of `s`.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= s.length <= 16\ns contains only lowercase English letters.',
    inputFormat: 's',
    outputFormat: 'List of all partitions.',
    sampleInput: '"aab"',
    sampleOutput: '[["a","a","b"],["aa","b"]]',
    points: 150,
    hints: [
      'Precompute or check if substring s[i..j] is a palindrome.',
      'Use backtracking: if s[start..end] is a palindrome, recurse on end + 1.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def partition(self, s: str) -> list[list[str]]:\n        pass`,
      javascript: `class Solution {\n    partition(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def partition(self, s: str) -> list[list[str]]:
        ans = []
        n = len(s)
        
        def is_pal(sub):
            return sub == sub[::-1]
            
        def backtrack(start, path):
            if start == n:
                ans.append(list(path))
                return
            for end in range(start + 1, n + 1):
                sub = s[start:end]
                if is_pal(sub):
                    path.append(sub)
                    backtrack(end, path)
                    path.pop()
                    
        backtrack(0, [])
        return ans`,
      javascript: `class Solution {
    partition(s) {
        const ans = [];
        const n = s.length;
        
        function isPal(sub) {
            let l = 0, r = sub.length - 1;
            while (l < r) {
                if (sub[l] !== sub[r]) return false;
                l++;
                r--;
            }
            return true;
        }
        
        function backtrack(start, path) {
            if (start === n) {
                ans.push([...path]);
                return;
            }
            for (let end = start + 1; end <= n; end++) {
                const sub = s.slice(start, end);
                if (isPal(sub)) {
                    path.push(sub);
                    backtrack(end, path);
                    path.pop();
                }
            }
        }
        
        backtrack(0, []);
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Backtracking with palindrome verification.',
      algorithm: 'Branch at every valid palindromic prefix and recurse on the remainder.',
      timeComplexity: 'O(N * 2^N)',
      spaceComplexity: 'O(N)',
      content: 'Classic DFS exploration of string cut subsets.',
      referenceCode: `def partition(s: str) -> list[list[str]]: ...`,
    },
    tags: ['Backtracking', 'Dynamic Programming', 'String'],
    testCases: [
      { input: '"aab"', expectedOutput: '[["a","a","b"],["aa","b"]]', isHidden: false },
      { input: '"a"', expectedOutput: '[["a"]]', isHidden: false },
      { input: '"ab"', expectedOutput: '[["a","b"]]', isHidden: true },
      { input: '"aba"', expectedOutput: '[["a","b","a"],["aba"]]', isHidden: true },
    ],
  },
  {
    title: 'Word Search II Boggle with Trie',
    slug: 'word-search-ii-trie-dfs',
    description: 'Given an `m x n` `board` of characters and a list of strings `words`, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells (horizontal or vertical).',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'm == board.length, n == board[i].length\n1 <= m, n <= 12\n1 <= words.length <= 3 * 10^4\n1 <= words[i].length <= 10\nwords[i] consists of lowercase English letters.',
    inputFormat: 'board, words',
    outputFormat: 'List of found words in alphabetical order.',
    sampleInput: '[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"]',
    sampleOutput: '["eat","oath"]',
    points: 200,
    hints: [
      'Build a Trie of all dictionary words.',
      'DFS across the grid starting from every cell.',
      'Prune search paths when the current character does not exist in the Trie node\'s children.',
      'Mark words as found and remove them from the Trie to avoid duplicate findings.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:\n        pass`,
      javascript: `class Solution {\n    findWords(board, words) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:
        trie = {}
        for w in words:
            curr = trie
            for ch in w:
                curr = curr.setdefault(ch, {})
            curr['#'] = w
            
        m, n = len(board), len(board[0])
        res = set()
        
        def dfs(r, c, parent):
            ch = board[r][c]
            curr = parent[ch]
            
            if '#' in curr:
                res.add(curr['#'])
                
            board[r][c] = '$'
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
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
            let curr = trie;
            for (const ch of w) {
                if (!curr[ch]) curr[ch] = {};
                curr = curr[ch];
            }
            curr['#'] = w;
        }
        
        const m = board.length, n = board[0].length;
        const res = new Set();
        
        function dfs(r, c, parent) {
            const ch = board[r][c];
            const curr = parent[ch];
            if (curr['#']) res.add(curr['#']);
            
            board[r][c] = '$';
            const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
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
      approach: 'Trie-accelerated 2D Backtracking DFS.',
      algorithm: 'Prefix tree simultaneously guides 2D cell navigation and prunes dead branches immediately.',
      timeComplexity: 'O(M * N * 4 * 3^(L-1))',
      spaceComplexity: 'O(Total word chars)',
      content: 'Essential grid word search pattern with Trie indexing.',
      referenceCode: `def findWords(board: list[list[str]], words: list[str]) -> list[str]: ...`,
    },
    tags: ['Trie', 'Backtracking', 'Matrix', 'DFS'],
    testCases: [
      { input: '[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"]', expectedOutput: '["eat","oath"]', isHidden: false },
      { input: '[["a","b"],["c","d"]], ["abcb"]', expectedOutput: '[]', isHidden: false },
      { input: '[["a"]], ["a"]', expectedOutput: '["a"]', isHidden: true },
      { input: '[["a","b"],["c","d"]], ["ab","cd","ac","bd"]', expectedOutput: '["ab","ac","bd","cd"]', isHidden: true },
    ],
  },
  {
    title: 'Matchsticks to Square Partition',
    slug: 'matchsticks-to-square',
    description: 'You are given an integer array `matchsticks` where `matchsticks[i]` is the length of the i-th matchstick. You want to use all the matchsticks to make one square. Return true if you can make this square and false otherwise.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= matchsticks.length <= 15\n1 <= matchsticks[i] <= 10^8',
    inputFormat: 'matchsticks',
    outputFormat: 'Boolean true or false.',
    sampleInput: '[1,1,2,2,2]',
    sampleOutput: 'true',
    points: 150,
    hints: [
      'Total sum of lengths must be divisible by 4.',
      'Side length = sum / 4.',
      'Sort matchsticks descending to fail early on large sticks.',
      'Backtrack placing each stick into one of the 4 sides.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def makesquare(self, matchsticks: list[int]) -> bool:\n        pass`,
      javascript: `class Solution {\n    makesquare(matchsticks) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def makesquare(self, matchsticks: list[int]) -> bool:
        total = sum(matchsticks)
        if total % 4 != 0:
            return False
        side = total // 4
        matchsticks.sort(reverse=True)
        if matchsticks[0] > side:
            return False
            
        sides = [0] * 4
        def backtrack(idx):
            if idx == len(matchsticks):
                return sides[0] == sides[1] == sides[2] == side
            for i in range(4):
                if sides[i] + matchsticks[idx] <= side:
                    sides[i] += matchsticks[idx]
                    if backtrack(idx + 1):
                        return True
                    sides[i] -= matchsticks[idx]
                if sides[i] == 0:
                    break
            return False
            
        return backtrack(0)`,
      javascript: `class Solution {
    makesquare(matchsticks) {
        const total = matchsticks.reduce((a, b) => a + b, 0);
        if (total % 4 !== 0) return false;
        const side = total / 4;
        matchsticks.sort((a, b) => b - a);
        if (matchsticks[0] > side) return false;
        
        const sides = [0, 0, 0, 0];
        function backtrack(idx) {
            if (idx === matchsticks.length) {
                return sides[0] === side && sides[1] === side && sides[2] === side;
            }
            for (let i = 0; i < 4; i++) {
                if (sides[i] + matchsticks[idx] <= side) {
                    sides[i] += matchsticks[idx];
                    if (backtrack(idx + 1)) return true;
                    sides[i] -= matchsticks[idx];
                }
                if (sides[i] === 0) break;
            }
            return false;
        }
        return backtrack(0);
    }
}`,
    },
    editorial: {
      approach: '4-bucket backtracking with descending sort.',
      algorithm: 'Greedy pruning by sorting descending and skipping symmetric empty buckets.',
      timeComplexity: 'O(4^N)',
      spaceComplexity: 'O(N)',
      content: 'Optimal search ordering drastically cuts branch factor.',
      referenceCode: `def makesquare(matchsticks: list[int]) -> bool: ...`,
    },
    tags: ['Backtracking', 'Bit Manipulation', 'Dynamic Programming'],
    testCases: [
      { input: '[1,1,2,2,2]', expectedOutput: 'true', isHidden: false },
      { input: '[3,3,3,3,4]', expectedOutput: 'false', isHidden: false },
      { input: '[5,5,5,5,4,4,4,4,3,3,3,3]', expectedOutput: 'true', isHidden: true },
      { input: '[1,1,1,1]', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Partition to K Equal Sum Subsets',
    slug: 'partition-to-k-equal-sum-subsets',
    description: 'Given an integer array `nums` and an integer `k`, return true if it is possible to divide this array into `k` non-empty subsets whose sums are all equal.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= k <= nums.length <= 16\n1 <= nums[i] <= 10^4\nEach element in nums can only be used once in one subset.',
    inputFormat: 'nums, k',
    outputFormat: 'Boolean true or false.',
    sampleInput: '[4,3,2,3,5,2,1], 4',
    sampleOutput: 'true',
    points: 150,
    hints: [
      'Total sum must be divisible by k. Target sum for each subset is sum(nums) / k.',
      'Sort nums in descending order.',
      'Backtrack placing each number into one of the k subsets.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def canPartitionKSubsets(self, nums: list[int], k: int) -> bool:\n        pass`,
      javascript: `class Solution {\n    canPartitionKSubsets(nums, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def canPartitionKSubsets(self, nums: list[int], k: int) -> bool:
        total = sum(nums)
        if total % k != 0:
            return False
        target = total // k
        nums.sort(reverse=True)
        if nums[0] > target:
            return False
            
        buckets = [0] * k
        def backtrack(idx):
            if idx == len(nums):
                return True
            for i in range(k):
                if buckets[i] + nums[idx] <= target:
                    buckets[i] += nums[idx]
                    if backtrack(idx + 1):
                        return True
                    buckets[i] -= nums[idx]
                if buckets[i] == 0:
                    break
            return False
            
        return backtrack(0)`,
      javascript: `class Solution {
    canPartitionKSubsets(nums, k) {
        const total = nums.reduce((a, b) => a + b, 0);
        if (total % k !== 0) return false;
        const target = total / k;
        nums.sort((a, b) => b - a);
        if (nums[0] > target) return false;
        
        const buckets = new Array(k).fill(0);
        function backtrack(idx) {
            if (idx === nums.length) return true;
            for (let i = 0; i < k; i++) {
                if (buckets[i] + nums[idx] <= target) {
                    buckets[i] += nums[idx];
                    if (backtrack(idx + 1)) return true;
                    buckets[i] -= nums[idx];
                }
                if (buckets[i] === 0) break;
            }
            return false;
        }
        return backtrack(0);
    }
}`,
    },
    editorial: {
      approach: 'K-bucket backtracking with symmetry breaking.',
      algorithm: 'Sort descending to prune deep branches and break on empty buckets.',
      timeComplexity: 'O(k * 2^N)',
      spaceComplexity: 'O(N)',
      content: 'Generalization of matchsticks problem to arbitrary K.',
      referenceCode: `def canPartitionKSubsets(nums: list[int], k: int) -> bool: ...`,
    },
    tags: ['Backtracking', 'Bitmask', 'Dynamic Programming', 'Array'],
    testCases: [
      { input: '[4,3,2,3,5,2,1], 4', expectedOutput: 'true', isHidden: false },
      { input: '[1,2,3,4], 3', expectedOutput: 'false', isHidden: false },
      { input: '[2,2,2,2,3,4,5], 4', expectedOutput: 'false', isHidden: true },
      { input: '[1,1,1,1,2,2,2,2], 4', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Unique Paths III Visit Every Empty Cell',
    slug: 'unique-paths-iii-all-empty-cells',
    description: 'You are given an `m x n` integer array `grid` where 1 represents the starting square, 2 represents the ending square, 0 represents empty squares we must walk over, and -1 represents obstacles. Return the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'm == grid.length, n == grid[i].length\n1 <= m, n <= 20\n1 <= m * n <= 20\n-1 <= grid[i][j] <= 2',
    inputFormat: 'grid',
    outputFormat: 'Number of Hamiltonian paths.',
    sampleInput: '[[1,0,0,0],[0,0,0,0],[0,0,2,-1]]',
    sampleOutput: '2',
    points: 200,
    hints: [
      'Count the number of empty squares (value 0 or 1).',
      'Start DFS from cell with value 1, marking visited cells with -1.',
      'When reaching value 2, check if remaining empty count is 0.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def uniquePathsIII(self, grid: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    uniquePathsIII(grid) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def uniquePathsIII(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        empty = 1
        start_r = start_c = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 0:
                    empty += 1
                elif grid[r][c] == 1:
                    start_r, start_c = r, c
                    
        ans = 0
        def dfs(r, c, remain):
            nonlocal ans
            if grid[r][c] == 2:
                if remain == 0:
                    ans += 1
                return
            temp = grid[r][c]
            grid[r][c] = -1
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] != -1:
                    dfs(nr, nc, remain - 1)
            grid[r][c] = temp
            
        dfs(start_r, start_c, empty)
        return ans`,
      javascript: `class Solution {
    uniquePathsIII(grid) {
        const m = grid.length, n = grid[0].length;
        let empty = 1;
        let startR = 0, startC = 0;
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                if (grid[r][c] === 0) empty++;
                else if (grid[r][c] === 1) {
                    startR = r;
                    startC = c;
                }
            }
        }
        let ans = 0;
        function dfs(r, c, remain) {
            if (grid[r][c] === 2) {
                if (remain === 0) ans++;
                return;
            }
            const temp = grid[r][c];
            grid[r][c] = -1;
            const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] !== -1) {
                    dfs(nr, nc, remain - 1);
                }
            }
            grid[r][c] = temp;
        }
        dfs(startR, startC, empty);
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Hamiltonian path DFS with cell quota tracking.',
      algorithm: 'Grid size <= 20 allows complete recursive backtracking.',
      timeComplexity: 'O(4^(M*N))',
      spaceComplexity: 'O(M * N)',
      content: 'Exhaustive search for full-grid Hamiltonian paths.',
      referenceCode: `def uniquePathsIII(grid: list[list[int]]) -> int: ...`,
    },
    tags: ['Backtracking', 'Matrix', 'DFS', 'Hamiltonian Path'],
    testCases: [
      { input: '[[1,0,0,0],[0,0,0,0],[0,0,2,-1]]', expectedOutput: '2', isHidden: false },
      { input: '[[1,0,0,0],[0,0,0,0],[0,0,0,2]]', expectedOutput: '4', isHidden: false },
      { input: '[[0,1],[2,0]]', expectedOutput: '0', isHidden: true },
      { input: '[[1,2]]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Letter Case Permutation All Combinations',
    slug: 'letter-case-permutation-all',
    description: 'Given a string `s`, you can transform every letter individually to be lowercase or uppercase to create another string. Return a list of all possible strings we could create.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= s.length <= 12\ns consists of lowercase English letters, uppercase English letters, and digits.',
    inputFormat: 's',
    outputFormat: 'List of all case permutations.',
    sampleInput: '"a1b2"',
    sampleOutput: '["a1b2","a1B2","A1b2","A1B2"]',
    points: 150,
    hints: [
      'If character is a digit, append to all current partial strings.',
      'If character is a letter, branch by appending both its lowercase and uppercase forms.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def letterCasePermutation(self, s: str) -> list[str]:\n        pass`,
      javascript: `class Solution {\n    letterCasePermutation(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def letterCasePermutation(self, s: str) -> list[str]:
        res = [""]
        for ch in s:
            if ch.isalpha():
                res = [prefix + c for prefix in res for c in (ch.lower(), ch.upper())]
            else:
                res = [prefix + ch for prefix in res]
        return sorted(res)`,
      javascript: `class Solution {
    letterCasePermutation(s) {
        let res = [""];
        for (const ch of s) {
            if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
                const next = [];
                for (const p of res) {
                    next.push(p + ch.toLowerCase());
                    next.push(p + ch.toUpperCase());
                }
                res = next;
            } else {
                res = res.map(p => p + ch);
            }
        }
        return res.sort();
    }
}`,
    },
    editorial: {
      approach: 'Iterative binary branching.',
      algorithm: 'Branch on alphabet letters, carry through digits unchanged.',
      timeComplexity: 'O(2^L * L)',
      spaceComplexity: 'O(2^L * L)',
      content: 'Direct iterative Cartesian product.',
      referenceCode: `def letterCasePermutation(s: str) -> list[str]: ...`,
    },
    tags: ['Backtracking', 'String', 'Bit Manipulation'],
    testCases: [
      { input: '"a1b2"', expectedOutput: '["A1B2","A1b2","a1B2","a1b2"]', isHidden: false },
      { input: '"3z4"', expectedOutput: '["3Z4","3z4"]', isHidden: false },
      { input: '"12345"', expectedOutput: '["12345"]', isHidden: true },
      { input: '"0"', expectedOutput: '["0"]', isHidden: true },
    ],
  },
  {
    title: 'Combination Sum III Unique Digits',
    slug: 'combination-sum-iii-unique',
    description: 'Find all valid combinations of `k` numbers that sum up to `n` such that only numbers 1 through 9 are used and each number is used at most once. Return a list of all possible valid combinations.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '2 <= k <= 9\n1 <= n <= 60',
    inputFormat: 'k, n',
    outputFormat: 'List of valid combination lists.',
    sampleInput: '3, 7',
    sampleOutput: '[[1,2,4]]',
    points: 150,
    hints: [
      'Backtrack picking numbers from 1 to 9 in increasing order.',
      'Stop when remaining sum < 0 or combination length == k.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def combinationSum3(self, k: int, n: int) -> list[list[int]]:\n        pass`,
      javascript: `class Solution {\n    combinationSum3(k, n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def combinationSum3(self, k: int, n: int) -> list[list[int]]:
        ans = []
        def backtrack(start, curr, target):
            if len(curr) == k:
                if target == 0:
                    ans.append(list(curr))
                return
            for x in range(start, 10):
                if x > target:
                    break
                curr.append(x)
                backtrack(x + 1, curr, target - x)
                curr.pop()
        backtrack(1, [], n)
        return ans`,
      javascript: `class Solution {
    combinationSum3(k, n) {
        const ans = [];
        function backtrack(start, curr, target) {
            if (curr.length === k) {
                if (target === 0) ans.push([...curr]);
                return;
            }
            for (let x = start; x <= 9; x++) {
                if (x > target) break;
                curr.push(x);
                backtrack(x + 1, curr, target - x);
                curr.pop();
            }
        }
        backtrack(1, [], n);
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Combinatorial backtracking with pruning.',
      algorithm: 'Iterate digits 1 to 9 strictly increasing to guarantee uniqueness.',
      timeComplexity: 'O(C(9, k))',
      spaceComplexity: 'O(k)',
      content: 'Canonical subset sum with cardinality bound.',
      referenceCode: `def combinationSum3(k: int, n: int) -> list[list[int]]: ...`,
    },
    tags: ['Backtracking', 'Array', 'Combinatorics'],
    testCases: [
      { input: '3, 7', expectedOutput: '[[1,2,4]]', isHidden: false },
      { input: '3, 9', expectedOutput: '[[1,2,6],[1,3,5],[2,3,4]]', isHidden: false },
      { input: '4, 1', expectedOutput: '[]', isHidden: true },
      { input: '9, 45', expectedOutput: '[[1,2,3,4,5,6,7,8,9]]', isHidden: true },
    ],
  },
  {
    title: 'Path with Maximum Gold Miner DFS',
    slug: 'path-with-maximum-gold',
    description: 'In a gold mine `grid` of size `m x n`, each cell in this mine has an integer representing the amount of gold in that cell (0 if empty). You can start at any gold-bearing cell and collect gold moving 4-directionally without visiting any cell more than once. Return the maximum amount of gold you can collect.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'm == grid.length, n == grid[i].length\n1 <= m, n <= 15\n0 <= grid[i][j] <= 100\nThere are at most 25 cells containing gold.',
    inputFormat: 'grid',
    outputFormat: 'Max gold collected integer.',
    sampleInput: '[[0,6,0],[5,8,7],[0,9,0]]',
    sampleOutput: '24',
    points: 150,
    hints: [
      'Start DFS from every cell (r, c) where grid[r][c] > 0.',
      'Temporarily set grid[r][c] = 0 while exploring neighbors, then restore it upon return.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def getMaximumGold(self, grid: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    getMaximumGold(grid) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def getMaximumGold(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        def dfs(r, c):
            gold = grid[r][c]
            grid[r][c] = 0
            best = 0
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] > 0:
                    best = max(best, dfs(nr, nc))
            grid[r][c] = gold
            return gold + best
            
        ans = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] > 0:
                    ans = max(ans, dfs(r, c))
        return ans`,
      javascript: `class Solution {
    getMaximumGold(grid) {
        const m = grid.length, n = grid[0].length;
        function dfs(r, c) {
            const gold = grid[r][c];
            grid[r][c] = 0;
            let best = 0;
            const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] > 0) {
                    best = Math.max(best, dfs(nr, nc));
                }
            }
            grid[r][c] = gold;
            return gold + best;
        }
        let ans = 0;
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                if (grid[r][c] > 0) {
                    ans = Math.max(ans, dfs(r, c));
                }
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Simple path DFS backtracking.',
      algorithm: 'At most 25 cells contain gold, keeping total branching depth small.',
      timeComplexity: 'O(G * 3^G) where G <= 25',
      spaceComplexity: 'O(G)',
      content: 'Exhaustive search over non-intersecting grid paths.',
      referenceCode: `def getMaximumGold(grid: list[list[int]]) -> int: ...`,
    },
    tags: ['Backtracking', 'Matrix', 'DFS'],
    testCases: [
      { input: '[[0,6,0],[5,8,7],[0,9,0]]', expectedOutput: '24', isHidden: false },
      { input: '[[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]', expectedOutput: '28', isHidden: false },
      { input: '[[0]]', expectedOutput: '0', isHidden: true },
      { input: '[[1,1,1],[1,1,1],[1,1,1]]', expectedOutput: '9', isHidden: true },
    ],
  },
  {
    title: 'Non-decreasing Subsequences Length Greater than 1',
    slug: 'increasing-subsequences-all',
    description: 'Given an integer array `nums`, return all the different possible non-decreasing subsequences of the given array with at least two elements. You may return the answer in any order.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= nums.length <= 15\n-100 <= nums[i] <= 100',
    inputFormat: 'nums',
    outputFormat: 'List of all valid subsequences.',
    sampleInput: '[4,6,7,7]',
    sampleOutput: '[[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]',
    points: 150,
    hints: [
      'Use a local hash set at each recursion level to prevent exploring duplicate values.',
      'Append current path to answers whenever len(path) >= 2.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def findSubsequences(self, nums: list[int]) -> list[list[int]]:\n        pass`,
      javascript: `class Solution {\n    findSubsequences(nums) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findSubsequences(self, nums: list[int]) -> list[list[int]]:
        ans = []
        def backtrack(start, path):
            if len(path) >= 2:
                ans.append(list(path))
            seen = set()
            for i in range(start, len(nums)):
                if nums[i] in seen:
                    continue
                if not path or nums[i] >= path[-1]:
                    seen.add(nums[i])
                    path.append(nums[i])
                    backtrack(i + 1, path)
                    path.pop()
        backtrack(0, [])
        return ans`,
      javascript: `class Solution {
    findSubsequences(nums) {
        const ans = [];
        function backtrack(start, path) {
            if (path.length >= 2) {
                ans.push([...path]);
            }
            const seen = new Set();
            for (let i = start; i < nums.length; i++) {
                if (seen.has(nums[i])) continue;
                if (path.length === 0 || nums[i] >= path[path.length - 1]) {
                    seen.add(nums[i]);
                    path.push(nums[i]);
                    backtrack(i + 1, path);
                    path.pop();
                }
            }
        }
        backtrack(0, []);
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Backtracking with horizontal deduplication set.',
      algorithm: 'Local set at each recursive activation prevents duplicate branches.',
      timeComplexity: 'O(2^N * N)',
      spaceComplexity: 'O(N)',
      content: 'Deduplication without sorting.',
      referenceCode: `def findSubsequences(nums: list[int]) -> list[list[int]]: ...`,
    },
    tags: ['Backtracking', 'Array', 'Hash Table'],
    testCases: [
      { input: '[4,6,7,7]', expectedOutput: '[[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]', isHidden: false },
      { input: '[4,4,3,2,1]', expectedOutput: '[[4,4]]', isHidden: false },
      { input: '[1,2,3]', expectedOutput: '[[1,2],[1,2,3],[1,3],[2,3]]', isHidden: true },
      { input: '[1]', expectedOutput: '[]', isHidden: true },
    ],
  },
];

writePack('pack-500-part-g.ts', 'pack500PartGDefs', packG);
