import { Difficulty } from '@prisma/client';

export const pack250ExtIDefs = [
  {
    title: 'Non-Decreasing Digits Count',
    slug: 'non-decreasing-digits-count',
    description: `Given a non-negative integer $n$, count how many integers $x$ in the range $[0, 10^n - 1]$ have digits in non-decreasing order (from most significant to least significant).

For example, $123$, $444$, and $789$ have non-decreasing digits, while $321$ and $132$ do not.

Return the count of such numbers modulo $10^9 + 7$.

### Input Format
- A single integer $n$ ($1 \\le n \\le 1000$).

### Output Format
- Return a single integer representing the number of non-decreasing digit numbers modulo $10^9 + 7$.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['dynamic-programming', 'combinatorics', 'digit-dp'],
    roadmapLevel: 6,
    roadmapTopic: 'advanced-dp',
    templates: {
      python: `class Solution:\n    def countNumbers(self, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    countNumbers(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def countNumbers(self, n: int) -> int:
        MOD = 10**9 + 7
        # dp[i][d] = count of i-length numbers starting with digit d (or ending with d)
        # For length i, ending with digit d (0..9):
        # dp[i][d] = sum(dp[i-1][k] for k in 0..d)
        dp = [1] * 10
        total = sum(dp) # length 1 (digits 0..9)
        ans = 10 # length 1 contributes 10 numbers (0..9)
        if n == 1:
            return 10
        for _ in range(2, n + 1):
            next_dp = [0] * 10
            curr_sum = 0
            for d in range(10):
                curr_sum = (curr_sum + dp[d]) % MOD
                next_dp[d] = curr_sum
            dp = next_dp
            # all except 0 as leading digit for exact length, but 00..0 is just representing shorter lengths
        # Actually total non-decreasing numbers of length <= n is equivalent to combinations with replacement:
        # Choosing n digits from 10 options with replacement = C(n + 10 - 1, n) = C(n+9, 9)
        # Using modular arithmetic:
        num = 1
        den = 1
        for i in range(1, 10):
            num = (num * (n + i)) % MOD
            den = (den * i) % MOD
        inv_den = pow(den, MOD - 2, MOD)
        return (num * inv_den) % MOD`,
      javascript: `class Solution {
    countNumbers(n) {
        const MOD = 1000000007n;
        let num = 1n;
        let den = 1n;
        for (let i = 1n; i <= 9n; i++) {
            num = (num * (BigInt(n) + i)) % MOD;
            den = (den * i) % MOD;
        }
        const power = (base, exp) => {
            let res = 1n;
            base = base % MOD;
            while (exp > 0n) {
                if (exp % 2n === 1n) res = (res * base) % MOD;
                base = (base * base) % MOD;
                exp /= 2n;
            }
            return res;
        };
        const inv = power(den, MOD - 2n);
        return Number((num * inv) % MOD);
    }
}`,
    },
    hints: [
      'Think about stars and bars or combinations with repetition.',
      'A non-decreasing sequence of length n using digits 0..9 is completely determined by how many of each digit 0..9 are chosen.',
      'The formula is C(n + 9, 9) mod (10^9 + 7).',
    ],
    editorial: `### Method Explanation
Any non-decreasing number of length $n$ (allowing leading zeros to represent shorter lengths) corresponds uniquely to choosing the counts of each digit $0, 1, \\dots, 9$ such that their counts sum to $n$.
By the Stars and Bars theorem (combinations with repetition), the number of ways to distribute $n$ identical items into $10$ distinct bins is:
$$\\binom{n + 10 - 1}{10 - 1} = \\binom{n + 9}{9}$$

Since $9$ is very small, we compute $\\prod_{i=1}^9 (n + i) / 9! \\pmod{10^9+7}$ in $O(1)$ time using modular inverse.

### Complexity
- **Time Complexity:** $O(1)$ or $O(k)$ where $k=9$.
- **Space Complexity:** $O(1)$.`,
    testCases: [
      { input: '1', expectedOutput: '10', isHidden: false },
      { input: '2', expectedOutput: '55', isHidden: false },
      { input: '3', expectedOutput: '220', isHidden: false },
      { input: '4', expectedOutput: '715', isHidden: true },
      { input: '10', expectedOutput: '92378', isHidden: true },
      { input: '100', expectedOutput: '421481430', isHidden: true },
      { input: '1000', expectedOutput: '145144880', isHidden: true },
    ],
  },
  {
    title: 'Shortest Superstring',
    slug: 'shortest-superstring',
    description: `Given an array of strings $words$, find the shortest string that contains each string in $words$ as a substring. If there are multiple valid strings of minimum length, return any of them.

You may assume that no string in $words$ is a substring of another string in $words$.

### Constraints
- $1 \\le words.length \\le 12$
- $1 \\le words[i].length \\le 20$
- $words[i]$ consists of lowercase English letters.
- All strings in $words$ are distinct.

### Input Format
- An array of strings $words$.

### Output Format
- Return the shortest superstring.`,
    difficulty: Difficulty.HARD,
    timeLimit: 3000,
    memoryLimit: 256,
    tags: ['dynamic-programming', 'bitmask', 'graph'],
    roadmapLevel: 6,
    roadmapTopic: 'advanced-dp',
    templates: {
      python: `class Solution:\n    def shortestSuperstring(self, words: list[str]) -> str:\n        pass`,
      javascript: `class Solution {\n    shortestSuperstring(words) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def shortestSuperstring(self, words: list[str]) -> str:
        n = len(words)
        overlap = [[0] * n for _ in range(n)]
        for i in range(n):
            for j in range(n):
                if i != j:
                    w1, w2 = words[i], words[j]
                    for k in range(min(len(w1), len(w2)), 0, -1):
                        if w1.endswith(w2[:k]):
                            overlap[i][j] = k
                            break
        
        dp = [[-1] * n for _ in range(1 << n)]
        parent = [[-1] * n for _ in range(1 << n)]
        for i in range(n):
            dp[1 << i][i] = 0
        
        for mask in range(1, 1 << n):
            for i in range(n):
                if not (mask & (1 << i)) or dp[mask][i] == -1:
                    continue
                for j in range(n):
                    if not (mask & (1 << j)):
                        next_mask = mask | (1 << j)
                        val = dp[mask][i] + overlap[i][j]
                        if val > dp[next_mask][j]:
                            dp[next_mask][j] = val
                            parent[next_mask][j] = i
                            
        full_mask = (1 << n) - 1
        best_last = 0
        best_val = -1
        for i in range(n):
            if dp[full_mask][i] > best_val:
                best_val = dp[full_mask][i]
                best_last = i
                
        path = []
        curr_mask = full_mask
        curr_node = best_last
        while curr_node != -1:
            path.append(curr_node)
            next_node = parent[curr_mask][curr_node]
            curr_mask ^= (1 << curr_node)
            curr_node = next_node
        path.reverse()
        
        res = [words[path[0]]]
        for idx in range(1, len(path)):
            prev, curr = path[idx - 1], path[idx]
            k = overlap[prev][curr]
            res.append(words[curr][k:])
        return "".join(res)`,
      javascript: `class Solution {
    shortestSuperstring(words) {
        const n = words.length;
        const overlap = Array.from({ length: n }, () => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    const w1 = words[i], w2 = words[j];
                    for (let k = Math.min(w1.length, w2.length); k > 0; k--) {
                        if (w1.endsWith(w2.slice(0, k))) {
                            overlap[i][j] = k;
                            break;
                        }
                    }
                }
            }
        }
        const numStates = 1 << n;
        const dp = Array.from({ length: numStates }, () => Array(n).fill(-1));
        const parent = Array.from({ length: numStates }, () => Array(n).fill(-1));
        for (let i = 0; i < n; i++) dp[1 << i][i] = 0;
        
        for (let mask = 1; mask < numStates; mask++) {
            for (let i = 0; i < n; i++) {
                if (!(mask & (1 << i)) || dp[mask][i] === -1) continue;
                for (let j = 0; j < n; j++) {
                    if (!(mask & (1 << j))) {
                        const nextMask = mask | (1 << j);
                        const val = dp[mask][i] + overlap[i][j];
                        if (val > dp[nextMask][j]) {
                            dp[nextMask][j] = val;
                            parent[nextMask][j] = i;
                        }
                    }
                }
            }
        }
        
        const fullMask = (1 << n) - 1;
        let bestLast = 0, bestVal = -1;
        for (let i = 0; i < n; i++) {
            if (dp[fullMask][i] > bestVal) {
                bestVal = dp[fullMask][i];
                bestLast = i;
            }
        }
        
        const path = [];
        let currMask = fullMask, currNode = bestLast;
        while (currNode !== -1) {
            path.push(currNode);
            const nextNode = parent[currMask][currNode];
            currMask ^= (1 << currNode);
            currNode = nextNode;
        }
        path.reverse();
        
        let res = words[path[0]];
        for (let idx = 1; idx < path.length; idx++) {
            const prev = path[idx - 1], curr = path[idx];
            const k = overlap[prev][curr];
            res += words[curr].slice(k);
        }
        return res;
    }
}`,
    },
    hints: [
      'This problem is equivalent to the Travelling Salesperson Problem (TSP) on an asymmetric directed graph.',
      'Compute the pairwise overlap between each pair of strings.',
      'Use DP with bitmask: dp[mask][i] represents the maximum overlap achievable visiting the subset `mask` ending at node `i`.',
    ],
    editorial: `### Method Explanation
This problem can be reduced to the Traveling Salesperson Problem (TSP) on a directed graph:
1. Each word is a node.
2. The directed edge from word $i$ to word $j$ has weight equal to the length of the longest proper suffix of word $i$ that matches a prefix of word $j$.
3. We want to find a Hamiltonian path visiting all nodes that maximizes the total overlap weight.
4. Using Bitmask DP:
   $dp[mask][i]$ = max overlap visiting subset of words $mask$ with last visited word $i$.
   $dp[mask][i] = \\max_{j \\in mask \\setminus \\{i\\}} (dp[mask \\setminus \\{i\\}][j] + overlap[j][i])$.

### Complexity
- **Time Complexity:** $O(N^2 \\cdot L + N^2 \\cdot 2^N)$ where $N \\le 12$ and $L \\le 20$.
- **Space Complexity:** $O(N \\cdot 2^N)$.`,
    testCases: [
      { input: '["catg","ctaagt","gcta","ttca","atgcatc"]', expectedOutput: '"gctaagttcatgcatc"', isHidden: false },
      { input: '["abc","bcd","cde"]', expectedOutput: '"abcde"', isHidden: false },
      { input: '["ab","ba"]', expectedOutput: '"bab"', isHidden: true },
      { input: '["neff","ffff"]', expectedOutput: '"neffff"', isHidden: true },
    ],
  },
  {
    title: 'Traveling Salesman Problem Bitmask',
    slug: 'traveling-salesman-problem-bitmask',
    description: `Given an $n \\times n$ cost matrix $cost$ where $cost[i][j]$ is the travel cost from city $i$ to city $j$, find the minimum cost to start at city $0$, visit all other cities exactly once, and return to city $0$.

### Constraints
- $2 \\le n \\le 15$
- $0 \\le cost[i][j] \\le 10^5$
- $cost[i][i] = 0$

### Input Format
- A 2D integer array $cost$ of size $n \\times n$.

### Output Format
- Return the minimum tour cost.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['dynamic-programming', 'bitmask', 'graph'],
    roadmapLevel: 6,
    roadmapTopic: 'advanced-dp',
    templates: {
      python: `class Solution:\n    def minTourCost(self, cost: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    minTourCost(cost) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minTourCost(self, cost: list[list[int]]) -> int:
        n = len(cost)
        INF = float('inf')
        # dp[mask][u] = min cost to visit cities in mask ending at u
        dp = [[INF] * n for _ in range(1 << n)]
        dp[1][0] = 0
        
        for mask in range(1, 1 << n):
            for u in range(n):
                if dp[mask][u] == INF:
                    continue
                for v in range(n):
                    if not (mask & (1 << v)):
                        next_mask = mask | (1 << v)
                        new_cost = dp[mask][u] + cost[u][v]
                        if new_cost < dp[next_mask][v]:
                            dp[next_mask][v] = new_cost
                            
        full_mask = (1 << n) - 1
        ans = INF
        for u in range(1, n):
            ans = min(ans, dp[full_mask][u] + cost[u][0])
        return ans if n > 1 else 0`,
      javascript: `class Solution {\n    minTourCost(cost) {\n        const n = cost.length;\n        if (n <= 1) return 0;\n        const INF = 1e9;\n        const dp = Array.from({ length: 1 << n }, () => Array(n).fill(INF));\n        dp[1][0] = 0;\n        \n        for (let mask = 1; mask < (1 << n); mask++) {\n            for (let u = 0; u < n; u++) {\n                if (dp[mask][u] === INF) continue;\n                for (let v = 0; v < n; v++) {\n                    if (!(mask & (1 << v))) {\n                        const nextMask = mask | (1 << v);\n                        const newCost = dp[mask][u] + cost[u][v];\n                        if (newCost < dp[nextMask][v]) {\n                            dp[nextMask][v] = newCost;\n                        }\n                    }\n                }\n            }\n        }\n        const fullMask = (1 << n) - 1;\n        let ans = INF;\n        for (let u = 1; u < n; u++) {\n            ans = Math.min(ans, dp[fullMask][u] + cost[u][0]);\n        }\n        return ans;\n    }\n}`,
    },
    hints: [
      'Use dynamic programming with bitmask.',
      'State: dp(mask, u) = minimum cost to visit set of cities in `mask` ending at city `u`.',
      'Transition: loop over unvisited cities `v`, update dp(mask | (1 << v), v).',
    ],
    editorial: `### Method Explanation
The Held-Karp algorithm solves TSP in $O(n^2 2^n)$ time using DP with Bitmask:
- Let $dp[mask][u]$ be the minimum distance covering cities in bitmask $mask$ starting at $0$ and ending at $u$.
- Base case: $dp[1][0] = 0$.
- Transitions: for every city $v \\notin mask$:
  $dp[mask \\mid 2^v][v] = \\min(dp[mask \\mid 2^v][v], dp[mask][u] + cost[u][v])$.
- Finally, find $\\min_{u \\ge 1} (dp[2^n - 1][u] + cost[u][0])$.

### Complexity
- **Time Complexity:** $O(n^2 2^n)$ where $n \\le 15$ ($15^2 \\cdot 32768 \\approx 7.3 \\times 10^6$ ops).
- **Space Complexity:** $O(n 2^n)$.`,
    testCases: [
      { input: '[[0,10,15,20],[10,0,35,25],[15,35,0,30],[20,25,30,0]]', expectedOutput: '80', isHidden: false },
      { input: '[[0,1,2],[1,0,3],[2,3,0]]', expectedOutput: '6', isHidden: false },
      { input: '[[0,5],[5,0]]', expectedOutput: '10', isHidden: true },
      { input: '[[0,20,42,25],[20,0,30,34],[42,30,0,10],[25,34,10,0]]', expectedOutput: '85', isHidden: true },
    ],
  },
  {
    title: 'Palindrome Partitioning III',
    slug: 'palindrome-partitioning-iii',
    description: `You are given a string $s$ containing lowercase letters and an integer $k$. You need to:
1. Divide the string $s$ into $k$ non-empty disjoint substrings.
2. Change the minimum number of characters in each substring so that each substring becomes a palindrome.

Return the minimum number of characters you need to change.

### Constraints
- $1 \\le k \\le s.length \\le 100$
- $s$ consists of lowercase English letters.

### Input Format
- A string $s$ and an integer $k$.

### Output Format
- Return an integer representing the minimum character changes.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['dynamic-programming', 'string'],
    roadmapLevel: 6,
    roadmapTopic: 'advanced-dp',
    templates: {
      python: `class Solution:\n    def palindromePartition(self, s: str, k: int) -> int:\n        pass`,
      javascript: `class Solution {\n    palindromePartition(s, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def palindromePartition(self, s: str, k: int) -> int:
        n = len(s)
        # cost[i][j] = min changes to make s[i..j] palindrome
        cost = [[0] * n for _ in range(n)]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                cost[i][j] = cost[i + 1][j - 1] + (1 if s[i] != s[j] else 0)
                
        # dp[i][count] = min changes to partition s[0..i-1] into 'count' palindromes
        INF = float('inf')
        dp = [[INF] * (k + 1) for _ in range(n + 1)]
        dp[0][0] = 0
        
        for i in range(1, n + 1):
            for count in range(1, min(i, k) + 1):
                for j in range(count - 1, i):
                    dp[i][count] = min(dp[i][count], dp[j][count - 1] + cost[j][i - 1])
                    
        return dp[n][k]`,
      javascript: `class Solution {\n    palindromePartition(s, k) {\n        const n = s.length;\n        const cost = Array.from({ length: n }, () => Array(n).fill(0));\n        for (let len = 2; len <= n; len++) {\n            for (let i = 0; i <= n - len; i++) {\n                const j = i + len - 1;\n                cost[i][j] = cost[i + 1][j - 1] + (s[i] !== s[j] ? 1 : 0);\n            }\n        }\n        const INF = 1e9;\n        const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(INF));\n        dp[0][0] = 0;\n        \n        for (let i = 1; i <= n; i++) {\n            for (let count = 1; count <= Math.min(i, k); count++) {\n                for (let j = count - 1; j < i; j++) {\n                    dp[i][count] = Math.min(dp[i][count], dp[j][count - 1] + cost[j][i - 1]);\n                }\n            }\n        }\n        return dp[n][k];\n    }\n}`,
    },
    hints: [
      'Precompute cost[i][j] = changes to make substring s[i..j] a palindrome.',
      'Use 2D DP: dp[i][c] = minimum cost to partition s[0..i-1] into c palindromes.',
      'dp[i][c] = min_{j} (dp[j][c - 1] + cost[j][i - 1]).',
    ],
    editorial: `### Method Explanation
1. **Precomputation:** For each substring $s[i \\dots j]$, $cost[i][j]$ is the number of mismatches between symmetric characters.
2. **DP Formulation:**
   - $dp[i][c]$ = minimum changes needed to partition prefix $s[0 \\dots i-1]$ into $c$ palindromic substrings.
   - Transition:
     $$dp[i][c] = \\min_{c-1 \\le j < i} (dp[j][c-1] + cost[j][i-1])$$
3. **Base Cases:** $dp[0][0] = 0$, all other $dp$ values initialized to $\\infty$.

### Complexity
- **Time Complexity:** $O(n^2 + n^2 k) = O(n^2 k)$. With $n \\le 100, k \\le 100$, operations $\\approx 10^6$.
- **Space Complexity:** $O(n^2 + n k)$.`,
    testCases: [
      { input: '"abc", 2', expectedOutput: '1', isHidden: false },
      { input: '"aabbc", 3', expectedOutput: '0', isHidden: false },
      { input: '"leetcode", 8', expectedOutput: '0', isHidden: false },
      { input: '"abcdef", 2', expectedOutput: '2', isHidden: true },
      { input: '"racecar", 1', expectedOutput: '0', isHidden: true },
      { input: '"abccba", 2', expectedOutput: '2', isHidden: true },
    ],
  },
  {
    title: 'Distinct Subsequences II',
    slug: 'distinct-subsequences-ii',
    description: `Given a string $s$, return the number of distinct non-empty subsequences of $s$. Since the answer may be very large, return it modulo $10^9 + 7$.

### Constraints
- $1 \\le s.length \\le 2000$
- $s$ consists of lowercase English letters.

### Input Format
- A string $s$.

### Output Format
- Return the count of distinct non-empty subsequences modulo $10^9 + 7$.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['dynamic-programming', 'string'],
    roadmapLevel: 6,
    roadmapTopic: 'advanced-dp',
    templates: {
      python: `class Solution:\n    def distinctSubseqII(self, s: str) -> int:\n        pass`,
      javascript: `class Solution {\n    distinctSubseqII(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def distinctSubseqII(self, s: str) -> int:
        MOD = 10**9 + 7
        # end[c] = total distinct subsequences ending with character c
        end = [0] * 26
        for ch in s:
            c = ord(ch) - ord('a')
            # new subsequences formed by appending ch to any existing subsequence + the single char subsequence 'ch'
            new_count = (sum(end) + 1) % MOD
            end[c] = new_count
        return sum(end) % MOD`,
      javascript: `class Solution {\n    distinctSubseqII(s) {\n        const MOD = 1000000007;\n        const end = new Array(26).fill(0);\n        for (let i = 0; i < s.length; i++) {\n            const c = s.charCodeAt(i) - 97;\n            let total = 1;\n            for (let j = 0; j < 26; j++) {\n                total = (total + end[j]) % MOD;\n            }\n            end[c] = total;\n        }\n        let ans = 0;\n        for (let j = 0; j < 26; j++) {\n            ans = (ans + end[j]) % MOD;\n        }\n        return ans;\n    }\n}`,
    },
    hints: [
      'Maintain the count of subsequences ending in each of the 26 characters.',
      'When character c is encountered, the new number of subsequences ending in c equals 1 + sum of all previous subsequences.',
      'Remember to take results modulo 10^9 + 7.',
    ],
    editorial: `### Method Explanation
Let $end[c]$ be the number of distinct subsequences ending with character $c$.
When reading character $c$:
- We can append $c$ to every currently known distinct subsequence (total sum of $end$).
- We can also form the single-character subsequence "$c$".
- Thus, the new value of $end[c] = 1 + \\sum_{x} end[x]$.
- Summing $end[0 \\dots 25]$ gives the total distinct non-empty subsequences.

### Complexity
- **Time Complexity:** $O(26 \\cdot N) = O(N)$.
- **Space Complexity:** $O(26) = O(1)$.`,
    testCases: [
      { input: '"abc"', expectedOutput: '7', isHidden: false },
      { input: '"aba"', expectedOutput: '6', isHidden: false },
      { input: '"aaa"', expectedOutput: '3', isHidden: false },
      { input: '"z"', expectedOutput: '1', isHidden: true },
      { input: '"abcdefghijklmnopqrstuvwxyz"', expectedOutput: '67108863', isHidden: true },
    ],
  },
  {
    title: 'Minimum Cost to Merge Stones',
    slug: 'minimum-cost-to-merge-stones',
    description: `There are $n$ piles of stones arranged in a row. The $i$-th pile has $stones[i]$ stones.

A move consists of merging exactly $k$ consecutive piles into one pile, and the cost of this move is equal to the total number of stones in these $k$ piles.

Find the minimum cost to merge all piles of stones into one pile. If it is impossible, return -1.

### Constraints
- $1 \\le stones.length \\le 30$
- $2 \\le k \\le 30$
- $1 \\le stones[i] \\le 100$

### Input Format
- An integer array $stones$ and an integer $k$.

### Output Format
- Return the minimum cost, or -1 if impossible.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['dynamic-programming', 'interval-dp'],
    roadmapLevel: 6,
    roadmapTopic: 'advanced-dp',
    templates: {
      python: `class Solution:\n    def mergeStones(self, stones: list[int], k: int) -> int:\n        pass`,
      javascript: `class Solution {\n    mergeStones(stones, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def mergeStones(self, stones: list[int], k: int) -> int:
        n = len(stones)
        if (n - 1) % (k - 1) != 0:
            return -1
        
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + stones[i]
            
        INF = float('inf')
        # dp[i][j] = min cost to merge stones[i..j] into as few piles as possible
        dp = [[0] * n for _ in range(n)]
        
        for length in range(k, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                dp[i][j] = INF
                for m in range(i, j, k - 1):
                    dp[i][j] = min(dp[i][j], dp[i][m] + dp[m + 1][j])
                if (length - 1) % (k - 1) == 0:
                    dp[i][j] += prefix[j + 1] - prefix[i]
                    
        return dp[0][n - 1]`,
      javascript: `class Solution {\n    mergeStones(stones, k) {\n        const n = stones.length;\n        if ((n - 1) % (k - 1) !== 0) return -1;\n        const prefix = new Array(n + 1).fill(0);\n        for (let i = 0; i < n; i++) {\n            prefix[i + 1] = prefix[i] + stones[i];\n        }\n        const INF = 1e9;\n        const dp = Array.from({ length: n }, () => Array(n).fill(0));\n        \n        for (let len = k; len <= n; len++) {\n            for (let i = 0; i <= n - len; i++) {\n                const j = i + len - 1;\n                dp[i][j] = INF;\n                for (let m = i; m < j; m += k - 1) {\n                    dp[i][j] = Math.min(dp[i][j], dp[i][m] + dp[m + 1][j]);\n                }\n                if ((len - 1) % (k - 1) === 0) {\n                    dp[i][j] += prefix[j + 1] - prefix[i];\n                }\n            }\n        }\n        return dp[0][n - 1];\n    }\n}`,
    },
    hints: [
      'A valid merge reduces the pile count by (k - 1) each step. So (n - 1) must be divisible by (k - 1).',
      'Use Interval DP: dp[i][j] represents the minimum cost to merge subarray stones[i..j] as much as possible.',
      'Iterate step size of (k - 1) for sub-problem transitions.',
    ],
    editorial: `### Method Explanation
Each operation takes $k$ piles and merges them into $1$, effectively reducing the total pile count by $k - 1$.
Thus, we can reach 1 pile if and only if $(n - 1) \\pmod{k - 1} == 0$.

Using Interval DP:
- $dp[i][j]$ is the minimum cost to reduce $stones[i \\dots j]$ to the minimum possible number of piles.
- Transition: $dp[i][j] = \\min_{m = i, i + (k - 1), \\dots} (dp[i][m] + dp[m+1][j])$.
- If subarray $stones[i \\dots j]$ can be merged into a single pile (i.e. $(j - i) \\pmod{k - 1} == 0$), we add the sum of all stones in that range $\\sum_{x=i}^j stones[x]$.

### Complexity
- **Time Complexity:** $O(N^3 / K)$ where $N \\le 30$.
- **Space Complexity:** $O(N^2)$.`,
    testCases: [
      { input: '[3,2,4,1], 2', expectedOutput: '20', isHidden: false },
      { input: '[3,2,4,1], 3', expectedOutput: '-1', isHidden: false },
      { input: '[3,5,1,2,6], 3', expectedOutput: '25', isHidden: false },
      { input: '[1], 2', expectedOutput: '0', isHidden: true },
      { input: '[1,2,3,4,5], 2', expectedOutput: '33', isHidden: true },
    ],
  },
  {
    title: 'Allocate Mailboxes',
    slug: 'allocate-mailboxes',
    description: `Given the array $houses$ where $houses[i]$ is the location of the $i$-th house along a street, and an integer $k$, allocate $k$ mailboxes in the street such that the sum of the distance between each house and its nearest mailbox is minimized.

Return the minimum total distance.

### Constraints
- $1 \\le k \\le houses.length \\le 100$
- $1 \\le houses[i] \\le 10^4$
- All integers in $houses$ are distinct.

### Input Format
- An array of integers $houses$ and an integer $k$.

### Output Format
- Return the minimum total distance.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['dynamic-programming', 'sorting'],
    roadmapLevel: 6,
    roadmapTopic: 'advanced-dp',
    templates: {
      python: `class Solution:\n    def minDistance(self, houses: list[int], k: int) -> int:\n        pass`,
      javascript: `class Solution {\n    minDistance(houses, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minDistance(self, houses: list[int], k: int) -> int:
        houses.sort()
        n = len(houses)
        
        # cost[i][j] = cost to serve houses[i..j] with 1 mailbox (placed at median)
        cost = [[0] * n for _ in range(n)]
        for i in range(n):
            for j in range(i, n):
                median = houses[(i + j) // 2]
                for x in range(i, j + 1):
                    cost[i][j] += abs(houses[x] - median)
                    
        # dp[i][m] = min distance for houses[0..i-1] using m mailboxes
        INF = float('inf')
        dp = [[INF] * (k + 1) for _ in range(n + 1)]
        dp[0][0] = 0
        
        for i in range(1, n + 1):
            for m in range(1, min(i, k) + 1):
                for j in range(m - 1, i):
                    dp[i][m] = min(dp[i][m], dp[j][m - 1] + cost[j][i - 1])
                    
        return dp[n][k]`,
      javascript: `class Solution {\n    minDistance(houses, k) {\n        houses.sort((a, b) => a - b);\n        const n = houses.length;\n        const cost = Array.from({ length: n }, () => Array(n).fill(0));\n        for (let i = 0; i < n; i++) {\n            for (let j = i; j < n; j++) {\n                const median = houses[Math.floor((i + j) / 2)];\n                for (let x = i; x <= j; x++) {\n                    cost[i][j] += Math.abs(houses[x] - median);\n                }\n            }\n        }\n        const INF = 1e9;\n        const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(INF));\n        dp[0][0] = 0;\n        \n        for (let i = 1; i <= n; i++) {\n            for (let m = 1; m <= Math.min(i, k); m++) {\n                for (let j = m - 1; j < i; j++) {\n                    dp[i][m] = Math.min(dp[i][m], dp[j][m - 1] + cost[j][i - 1]);\n                }\n            }\n        }\n        return dp[n][k];\n    }\n}`,
    },
    hints: [
      'Sort the houses first.',
      'For any range of houses houses[i..j], placing 1 mailbox at their median minimizes the total distance.',
      'Use 2D dynamic programming dp[i][m] = minimum total distance for first i houses using m mailboxes.',
    ],
    editorial: `### Method Explanation
1. Sort the house coordinates.
2. The optimal position for 1 mailbox serving a sorted range of houses $houses[i \\dots j]$ is the median $houses[(i+j)/2]$. Precompute $cost[i][j]$ for all pairs $i \\le j$.
3. Define $dp[i][m]$ as the minimum distance to cover the first $i$ houses with $m$ mailboxes.
   $$dp[i][m] = \\min_{m-1 \\le j < i} (dp[j][m-1] + cost[j][i-1])$$
4. The answer is $dp[n][k]$.

### Complexity
- **Time Complexity:** $O(n^3 + n^2 k)$. For $n, k \\le 100$, takes $< 20$ ms.
- **Space Complexity:** $O(n^2 + n k)$.`,
    testCases: [
      { input: '[1,4,8,10,20], 3', expectedOutput: '5', isHidden: false },
      { input: '[2,3,5,12,18], 1', expectedOutput: '25', isHidden: false },
      { input: '[7,4,6,1], 1', expectedOutput: '8', isHidden: true },
      { input: '[3,6,14,10], 4', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Student Attendance Record II',
    slug: 'student-attendance-record-ii',
    description: `An attendance record for a student can be represented as a string where each character is one of:
- 'A': Absent.
- 'L': Late.
- 'P': Present.

Any student is eligible for an attendance award if they meet both criteria:
1. The student was absent ('A') strictly fewer than $2$ days total.
2. The student was never late ('L') for $3$ or more consecutive days.

Given an integer $n$, return the number of possible attendance records of length $n$ that make a student eligible for an attendance award. Since the answer may be very large, return it modulo $10^9 + 7$.

### Constraints
- $1 \\le n \\le 10^5$

### Input Format
- A single integer $n$.

### Output Format
- Return the count of eligible attendance records modulo $10^9 + 7$.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['dynamic-programming', 'matrix-exponentiation'],
    roadmapLevel: 6,
    roadmapTopic: 'advanced-dp',
    templates: {
      python: `class Solution:\n    def checkRecord(self, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    checkRecord(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def checkRecord(self, n: int) -> int:
        MOD = 10**9 + 7
        # state: (absent_count [0..1], consecutive_late [0..2]) => 6 states
        # dp[a][l]
        dp = [[0] * 3 for _ in range(2)]
        dp[0][0] = 1
        
        for _ in range(n):
            next_dp = [[0] * 3 for _ in range(2)]
            for a in range(2):
                for l in range(3):
                    val = dp[a][l]
                    if val == 0:
                        continue
                    # 1. Add 'P'
                    next_dp[a][0] = (next_dp[a][0] + val) % MOD
                    # 2. Add 'A'
                    if a == 0:
                        next_dp[1][0] = (next_dp[1][0] + val) % MOD
                    # 3. Add 'L'
                    if l < 2:
                        next_dp[a][l + 1] = (next_dp[a][l + 1] + val) % MOD
            dp = next_dp
            
        ans = 0
        for a in range(2):
            for l in range(3):
                ans = (ans + dp[a][l]) % MOD
        return ans`,
      javascript: `class Solution {\n    checkRecord(n) {\n        const MOD = 1000000007;\n        let dp = [[1, 0, 0], [0, 0, 0]];\n        \n        for (let day = 0; day < n; day++) {\n            const nextDp = [[0, 0, 0], [0, 0, 0]];\n            for (let a = 0; a < 2; a++) {\n                for (let l = 0; l < 3; l++) {\n                    const val = dp[a][l];\n                    if (val === 0) continue;\n                    nextDp[a][0] = (nextDp[a][0] + val) % MOD;\n                    if (a === 0) nextDp[1][0] = (nextDp[1][0] + val) % MOD;\n                    if (l < 2) nextDp[a][l + 1] = (nextDp[a][l + 1] + val) % MOD;\n                }\n            }\n            dp = nextDp;\n        }\n        let ans = 0;\n        for (let a = 0; a < 2; a++) {\n            for (let l = 0; l < 3; l++) {\n                ans = (ans + dp[a][l]) % MOD;\n            }\n        }\n        return ans;\n    }\n}`,
    },
    hints: [
      'Maintain state as (count of A, consecutive trailing L).',
      'There are only 6 possible states: a in {0, 1}, l in {0, 1, 2}.',
      'Compute transitions for day 1 to n in O(n) or using 6x6 matrix exponentiation.',
    ],
    editorial: `### Method Explanation
The state on day $i$ is captured by two dimensions:
- $a \\in \\{0, 1\\}$: total number of 'A's seen so far.
- $l \\in \\{0, 1, 2\\}$: consecutive 'L's at the current end of the string.

From state $(a, l)$ with $dp[a][l]$ ways:
1. Append 'P': resets $l$ to $0 \\implies (a, 0)$.
2. Append 'A' (if $a == 0$): sets $a=1, l=0 \\implies (1, 0)$.
3. Append 'L' (if $l < 2$): increments $l \\implies (a, l + 1)$.

Iterating $N$ times gives $O(N)$ time with $O(1)$ space.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(1)$.`,
    testCases: [
      { input: '2', expectedOutput: '8', isHidden: false },
      { input: '1', expectedOutput: '3', isHidden: false },
      { input: '10101', expectedOutput: '183236316', isHidden: false },
      { input: '3', expectedOutput: '19', isHidden: true },
      { input: '4', expectedOutput: '43', isHidden: true },
      { input: '100', expectedOutput: '985598218', isHidden: true },
    ],
  },
  {
    title: 'Cherry Pickup II',
    slug: 'cherry-pickup-ii',
    description: `You are given a rows x cols matrix $grid$ representing a field of cherries where $grid[i][j]$ represents the number of cherries that you can collect from the $(i, j)$ cell.

You have two robots that can collect cherries for you:
- Robot #1 is located at the top-left corner $(0, 0)$.
- Robot #2 is located at the top-right corner $(0, cols - 1)$.

Return the maximum number of cherries collection using both robots by following the rules below:
- From a cell $(i, j)$, robots can move to $(i + 1, j - 1)$, $(i + 1, j)$, or $(i + 1, j + 1)$.
- When any robot passes through a cell, it picks up all cherries, and the cell becomes an empty cell $0$.
- When both robots stay on the same cell, only one of them takes the cherries.
- Both robots must reach the bottom row in $grid$.

### Constraints
- $rows == grid.length$
- $cols == grid[i].length$
- $2 \\le rows, cols \\le 70$
- $0 \\le grid[i][j] \\le 100$

### Input Format
- A 2D integer matrix $grid$.

### Output Format
- Return the maximum cherries collected.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['dynamic-programming', 'matrix'],
    roadmapLevel: 6,
    roadmapTopic: 'advanced-dp',
    templates: {
      python: `class Solution:\n    def cherryPickup(self, grid: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    cherryPickup(grid) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def cherryPickup(self, grid: list[list[int]]) -> int:
        R = len(grid)
        C = len(grid[0])
        
        # dp[c1][c2] = max cherries at current row with robot 1 at c1 and robot 2 at c2
        dp = [[-1] * C for _ in range(C)]
        dp[0][C - 1] = grid[0][0] + (grid[0][C - 1] if C > 1 else 0)
        
        for r in range(1, R):
            next_dp = [[-1] * C for _ in range(C)]
            for c1 in range(C):
                for c2 in range(C):
                    if dp[c1][c2] < 0:
                        continue
                    for d1 in (-1, 0, 1):
                        nc1 = c1 + d1
                        if not (0 <= nc1 < C):
                            continue
                        for d2 in (-1, 0, 1):
                            nc2 = c2 + d2
                            if not (0 <= nc2 < C):
                                continue
                            gain = grid[r][nc1] if nc1 == nc2 else (grid[r][nc1] + grid[r][nc2])
                            if dp[c1][c2] + gain > next_dp[nc1][nc2]:
                                next_dp[nc1][nc2] = dp[c1][c2] + gain
            dp = next_dp
            
        ans = 0
        for c1 in range(C):
            for c2 in range(C):
                ans = max(ans, dp[c1][c2])
        return ans`,
      javascript: `class Solution {\n    cherryPickup(grid) {\n        const R = grid.length;\n        const C = grid[0].length;\n        let dp = Array.from({ length: C }, () => Array(C).fill(-1));\n        dp[0][C - 1] = grid[0][0] + (C > 1 ? grid[0][C - 1] : 0);\n        \n        for (let r = 1; r < R; r++) {\n            const nextDp = Array.from({ length: C }, () => Array(C).fill(-1));\n            for (let c1 = 0; c1 < C; c1++) {\n                for (let c2 = 0; c2 < C; c2++) {\n                    if (dp[c1][c2] < 0) continue;\n                    for (let d1 = -1; d1 <= 1; d1++) {\n                        const nc1 = c1 + d1;\n                        if (nc1 < 0 || nc1 >= C) continue;\n                        for (let d2 = -1; d2 <= 1; d2++) {\n                            const nc2 = c2 + d2;\n                            if (nc2 < 0 || nc2 >= C) continue;\n                            const gain = nc1 === nc2 ? grid[r][nc1] : grid[r][nc1] + grid[r][nc2];\n                            if (dp[c1][c2] + gain > nextDp[nc1][nc2]) {\n                                nextDp[nc1][nc2] = dp[c1][c2] + gain;\n                            }\n                        }\n                    }\n                }\n            }\n            dp = nextDp;\n        }\n        let ans = 0;\n        for (let c1 = 0; c1 < C; c1++) {\n            for (let c2 = 0; c2 < C; c2++) {\n                ans = Math.max(ans, dp[c1][c2]);\n            }\n        }\n        return ans;\n    }\n}`,
    },
    hints: [
      'Both robots move downwards one row simultaneously each turn.',
      'State at row r is (c1, c2), representing robot 1 at col c1 and robot 2 at col c2.',
      'From (c1, c2), try all 3 x 3 = 9 direction combinations for the next row.',
    ],
    editorial: `### Method Explanation
Both robots move down one row at the exact same pace.
We define $dp[c_1][c_2]$ as the maximum cherries collected when Robot 1 is at column $c_1$ and Robot 2 is at column $c_2$ on the current row.

For each transition to row $r$:
- $c_1' \\in \\{c_1 - 1, c_1, c_1 + 1\\}$
- $c_2' \\in \\{c_2 - 1, c_2, c_2 + 1\\}$
- If $c_1' == c_2'$, gain $= grid[r][c_1']$.
- Otherwise gain $= grid[r][c_1'] + grid[r][c_2']$.

### Complexity
- **Time Complexity:** $O(R \\cdot C^2 \\cdot 3^2) = O(9 R C^2) \\approx 70 \\times 4900 \\times 9 \\approx 3 \\times 10^6$ ops.
- **Space Complexity:** $O(C^2)$.`,
    testCases: [
      { input: '[[3,1,1],[2,5,1],[1,5,5],[2,1,1]]', expectedOutput: '24', isHidden: false },
      { input: '[[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]', expectedOutput: '28', isHidden: false },
      { input: '[[1,1],[1,1]]', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: 'Count Numbers with Unique Digits',
    slug: 'count-numbers-with-unique-digits',
    description: `Given an integer $n$, return the count of all numbers with unique digits, $x$, where $0 \\le x < 10^n$.

### Constraints
- $0 \\le n \\le 8$

### Input Format
- A single integer $n$.

### Output Format
- Return the count of numbers with unique digits.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['dynamic-programming', 'combinatorics', 'math'],
    roadmapLevel: 6,
    roadmapTopic: 'advanced-dp',
    templates: {
      python: `class Solution:\n    def countNumbersWithUniqueDigits(self, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    countNumbersWithUniqueDigits(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def countNumbersWithUniqueDigits(self, n: int) -> int:
        if n == 0:
            return 1
        ans = 10
        unique_digits = 9
        available = 9
        for i in range(2, n + 1):
            unique_digits *= available
            ans += unique_digits
            available -= 1
        return ans`,
      javascript: `class Solution {\n    countNumbersWithUniqueDigits(n) {\n        if (n === 0) return 1;\n        let ans = 10;\n        let uniqueDigits = 9;\n        let available = 9;\n        for (let i = 2; i <= n; i++) {\n            uniqueDigits *= available;\n            ans += uniqueDigits;\n            available -= 1;\n        }\n        return ans;\n    }\n}`,
    },
    hints: [
      'For length 1: 10 numbers (0 to 9).',
      'For length 2: 9 choices for first digit (1-9) and 9 choices for second digit (0-9 excluding first) = 9 * 9.',
      'For length k: 9 * 9 * 8 * ... * (11 - k).',
    ],
    editorial: `### Method Explanation
Combinatorial counting:
- $n = 0$: $1$ ($0$).
- $n = 1$: $10$ ($0..9$).
- $n = 2$: $10 + 9 \\times 9 = 91$.
- $n = k$: Add $9 \\times 9 \\times 8 \\times \\dots \\times (11 - k)$.

### Complexity
- **Time Complexity:** $O(n) = O(1)$.
- **Space Complexity:** $O(1)$.`,
    testCases: [
      { input: '2', expectedOutput: '91', isHidden: false },
      { input: '0', expectedOutput: '1', isHidden: false },
      { input: '1', expectedOutput: '10', isHidden: false },
      { input: '3', expectedOutput: '739', isHidden: true },
      { input: '4', expectedOutput: '5275', isHidden: true },
      { input: '8', expectedOutput: '2345851', isHidden: true },
    ],
  },
];
