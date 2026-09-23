import { Difficulty } from '@prisma/client';

export const pack250ExtNDefs = [
  {
    title: 'Rabin Karp Rolling Hash Pattern Matching',
    slug: 'rabin-karp-rolling-hash-pattern-matching',
    description: `Given two strings $text$ and $pattern$, return the starting index of all occurrences of $pattern$ in $text$ as a 0-indexed list sorted in ascending order.

Solve this using the Rabin-Karp rolling hash algorithm.

### Constraints
- $1 \\le text.length, pattern.length \\le 10^5$
- $text$ and $pattern$ consist of lowercase English letters.

### Input Format
- Two strings $text$ and $pattern$.

### Output Format
- Return an array of integer indices where $pattern$ occurs in $text$.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['string', 'rolling-hash', 'rabin-karp'],
    roadmapLevel: 6,
    roadmapTopic: 'string-algorithms',
    templates: {
      python: `class Solution:\n    def findOccurrences(self, text: str, pattern: str) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    findOccurrences(text, pattern) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findOccurrences(self, text: str, pattern: str) -> list[int]:
        N, M = len(text), len(pattern)
        if M > N:
            return []
            
        MOD1, MOD2 = 10**9 + 7, 10**9 + 9
        B = 31
        
        # Compute power B^(M-1)
        pow1 = pow(B, M - 1, MOD1)
        pow2 = pow(B, M - 1, MOD2)
        
        # Compute pattern hashes
        p_h1, p_h2 = 0, 0
        for ch in pattern:
            v = ord(ch) - ord('a') + 1
            p_h1 = (p_h1 * B + v) % MOD1
            p_h2 = (p_h2 * B + v) % MOD2
            
        # Compute first window hash
        w_h1, w_h2 = 0, 0
        for i in range(M):
            v = ord(text[i]) - ord('a') + 1
            w_h1 = (w_h1 * B + v) % MOD1
            w_h2 = (w_h2 * B + v) % MOD2
            
        res = []
        if (w_h1, w_h2) == (p_h1, p_h2) and text[:M] == pattern:
            res.append(0)
            
        for i in range(M, N):
            out_v = ord(text[i - M]) - ord('a') + 1
            in_v = ord(text[i]) - ord('a') + 1
            
            w_h1 = ((w_h1 - out_v * pow1) * B + in_v) % MOD1
            w_h2 = ((w_h2 - out_v * pow2) * B + in_v) % MOD2
            
            if (w_h1, w_h2) == (p_h1, p_h2):
                start = i - M + 1
                if text[start:start + M] == pattern:
                    res.append(start)
                    
        return res`,
      javascript: `class Solution {\n    findOccurrences(text, pattern) {\n        const N = text.length, M = pattern.length;\n        if (M > N) return [];\n        \n        const MOD1 = 1000000007n, MOD2 = 1000000009n;\n        const B = 31n;\n        \n        let pow1 = 1n, pow2 = 1n;\n        for (let i = 0; i < M - 1; i++) {\n            pow1 = (pow1 * B) % MOD1;\n            pow2 = (pow2 * B) % MOD2;\n        }\n        \n        let pH1 = 0n, pH2 = 0n;\n        for (let i = 0; i < M; i++) {\n            const v = BigInt(pattern.charCodeAt(i) - 96);\n            pH1 = (pH1 * B + v) % MOD1;\n            pH2 = (pH2 * B + v) % MOD2;\n        }\n        \n        let wH1 = 0n, wH2 = 0n;\n        for (let i = 0; i < M; i++) {\n            const v = BigInt(text.charCodeAt(i) - 96);\n            wH1 = (wH1 * B + v) % MOD1;\n            wH2 = (wH2 * B + v) % MOD2;\n        }\n        \n        const res = [];\n        if (wH1 === pH1 && wH2 === pH2 && text.slice(0, M) === pattern) {\n            res.push(0);\n        }\n        \n        for (let i = M; i < N; i++) {\n            const outV = BigInt(text.charCodeAt(i - M) - 96);\n            const inV = BigInt(text.charCodeAt(i) - 96);\n            \n            wH1 = ((wH1 - ((outV * pow1) % MOD1) + MOD1) * B + inV) % MOD1;\n            wH2 = ((wH2 - ((outV * pow2) % MOD2) + MOD2) * B + inV) % MOD2;\n            \n            if (wH1 === pH1 && wH2 === pH2) {\n                const start = i - M + 1;\n                if (text.slice(start, start + M) === pattern) {\n                    res.push(start);\n                }\n            }\n        }\n        return res;\n    }\n}`,
    },
    hints: [
      'Use double polynomial rolling hashing to avoid hash collisions.',
      'Slide the window of size M across text in O(1) time per step.',
    ],
    editorial: `### Method Explanation
Rabin-Karp Rolling Hash:
- We treat the string as a polynomial base $B$ modulo prime $MOD$:
  $$H(S) = \\sum_{i=0}^{M-1} S[i] \\cdot B^{M - 1 - i} \\pmod{MOD}$$
- As the window slides from index $i-1$ to $i$, remove the outgoing character $S[i-M]$ by subtracting $S[i-M] \\cdot B^{M-1}$, multiply by $B$, and add the incoming character $S[i]$.
- Using double hashing (two distinct large prime moduli) prevents collisions and eliminates false positives.

### Complexity
- **Time Complexity:** $O(N + M)$ average.
- **Space Complexity:** $O(1)$ auxiliary.`,
    testCases: [
      { input: '"abracadabra", "abra"', expectedOutput: '[0,7]', isHidden: false },
      { input: '"aaaaa", "aa"', expectedOutput: '[0,1,2,3]', isHidden: false },
      { input: '"codejudge", "judge"', expectedOutput: '[4]', isHidden: false },
      { input: '"xyz", "abc"', expectedOutput: '[]', isHidden: true },
    ],
  },
  {
    title: 'Manachers Algorithm Longest Palindromic Substring',
    slug: 'manachers-algorithm-longest-palindromic-substring',
    description: `Given a string $s$, return the longest palindromic substring in $s$.

Solve this in $O(N)$ linear time using Manacher's algorithm.

If there are multiple answers, return the one that appears earliest.

### Constraints
- $1 \\le s.length \\le 10^5$
- $s$ consist of only digits and English letters.

### Input Format
- A single string $s$.

### Output Format
- Return the longest palindromic substring.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['string', 'manacher', 'palindrome'],
    roadmapLevel: 6,
    roadmapTopic: 'string-algorithms',
    templates: {
      python: `class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        pass`,
      javascript: `class Solution {\n    longestPalindrome(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        if not s:
            return ""
            
        # Transform string: "abc" -> "^#a#b#c#$"
        T = "^#" + "#".join(s) + "#$"
        n = len(T)
        P = [0] * n # radius of palindrome at center i
        C = 0
        R = 0
        
        for i in range(1, n - 1):
            i_mirror = 2 * C - i
            if R > i:
                P[i] = min(R - i, P[i_mirror])
            else:
                P[i] = 0
                
            # Expand palindrome around center i
            while T[i + 1 + P[i]] == T[i - 1 - P[i]]:
                P[i] += 1
                
            # Update center and right boundary
            if i + P[i] > R:
                C = i
                R = i + P[i]
                
        # Find maximum palindrome radius
        max_len = 0
        center_idx = 0
        for i in range(1, n - 1):
            if P[i] > max_len:
                max_len = P[i]
                center_idx = i
                
        start = (center_idx - max_len) // 2
        return s[start:start + max_len]`,
      javascript: `class Solution {\n    longestPalindrome(s) {\n        if (!s) return "";\n        const T = "^#" + s.split("").join("#") + "#$";\n        const n = T.length;\n        const P = new Int32Array(n);\n        let C = 0, R = 0;\n        \n        for (let i = 1; i < n - 1; i++) {\n            const iMirror = 2 * C - i;\n            if (R > i) {\n                P[i] = Math.min(R - i, P[iMirror]);\n            } else {\n                P[i] = 0;\n            }\n            \n            while (T[i + 1 + P[i]] === T[i - 1 - P[i]]) {\n                P[i]++;\n            }\n            \n            if (i + P[i] > R) {\n                C = i;\n                R = i + P[i];\n            }\n        }\n        \n        let maxLen = 0, centerIdx = 0;\n        for (let i = 1; i < n - 1; i++) {\n            if (P[i] > maxLen) {\n                maxLen = P[i];\n                centerIdx = i;\n            }\n        }\n        \n        const start = Math.floor((centerIdx - maxLen) / 2);\n        return s.slice(start, start + maxLen);\n    }\n}`,
    },
    hints: [
      'Insert dummy separators # between characters to unify odd and even length palindromes.',
      'Use Manacher\'s algorithm with center C and rightmost boundary R.',
      'Mirrored position of i is 2 * C - i.',
    ],
    editorial: `### Method Explanation
Manacher's Algorithm:
1. Preprocess string with special delimiter symbols (e.g. ^#a#b#a#$) to handle odd/even palindromes symmetrically without boundary checks.
2. Maintain C (center of the rightmost expanding palindrome) and R (its right boundary).
3. For index i < R, initialize P[i] = min(R - i, P[2C - i]).
4. Expand around center i and update (C, R) whenever i + P[i] > R.
5. The length of the longest palindromic substring in the original string equals max(P).

### Complexity
- **Time Complexity:** O(N).
- **Space Complexity:** O(N).`,
    testCases: [
      { input: '"babad"', expectedOutput: '"bab"', isHidden: false },
      { input: '"cbbd"', expectedOutput: '"bb"', isHidden: false },
      { input: '"a"', expectedOutput: '"a"', isHidden: false },
      { input: '"racecar"', expectedOutput: '"racecar"', isHidden: true },
      { input: '"forgeeksskeegfor"', expectedOutput: '"geeksskeeg"', isHidden: true },
    ],
  },
  {
    title: 'Wildcard Matching Dynamic Programming',
    slug: 'wildcard-matching-dynamic-programming',
    description: `Given an input string ($s$) and a pattern ($p$), implement wildcard pattern matching with support for '?' and '*' where:
- '?' Matches any single character.
- '*' Matches any sequence of characters (including the empty sequence).

The matching should cover the **entire** input string (not partial).

### Constraints
- $0 \\le s.length, p.length \\le 2000$
- $s$ contains only lowercase English letters.
- $p$ contains only lowercase English letters, '?' or '*'.

### Input Format
- Two strings $s$ and $p$.

### Output Format
- Return a boolean indicating whether the string matches the pattern.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['string', 'dynamic-programming', 'greedy'],
    roadmapLevel: 6,
    roadmapTopic: 'string-algorithms',
    templates: {
      python: `class Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        pass`,
      javascript: `class Solution {\n    isMatch(s, p) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        # Greedy two-pointer with backtracking O(N) average
        s_ptr = 0
        p_ptr = 0
        star_idx = -1
        s_match = 0
        
        while s_ptr < len(s):
            if p_ptr < len(p) and (p[p_ptr] == '?' or p[p_ptr] == s[s_ptr]):
                s_ptr += 1
                p_ptr += 1
            elif p_ptr < len(p) and p[p_ptr] == '*':
                star_idx = p_ptr
                s_match = s_ptr
                p_ptr += 1
            elif star_idx != -1:
                p_ptr = star_idx + 1
                s_match += 1
                s_ptr = s_match
            else:
                return False
                
        while p_ptr < len(p) and p[p_ptr] == '*':
            p_ptr += 1
            
        return p_ptr == len(p)`,
      javascript: `class Solution {\n    isMatch(s, p) {\n        let sPtr = 0, pPtr = 0;\n        let starIdx = -1, sMatch = 0;\n        \n        while (sPtr < s.length) {\n            if (pPtr < p.length && (p[pPtr] === '?' || p[pPtr] === s[sPtr])) {\n                sPtr++;\n                pPtr++;\n            } else if (pPtr < p.length && p[pPtr] === '*') {\n                starIdx = pPtr;\n                sMatch = sPtr;\n                pPtr++;\n            } else if (starIdx !== -1) {\n                pPtr = starIdx + 1;\n                sMatch++;\n                sPtr = sMatch;\n            } else {\n                return false;\n            }\n        }\n        \n        while (pPtr < p.length && p[pPtr] === '*') {\n            pPtr++;\n        }\n        return pPtr === p.length;\n    }\n}`,
    },
    hints: [
      'Two pointers with star backtrack bookmarking can solve this in O(N) average time.',
      'Record the position of the last seen * and try matching increasingly long prefixes of s.',
    ],
    editorial: `### Method Explanation
Greedy Two-Pointer Pattern Matching:
- If characters match or $p[p\\_ptr] == '?'$, advance both.
- If $p[p\\_ptr] == '*'$, record $star\\_idx = p\\_ptr$ and $s\\_match = s\\_ptr$, advance pattern pointer.
- If mismatch occurs after seeing a $*$, backtrack to $(star\\_idx + 1)$, advance $s\\_match$ by 1, and resume matching from $s\\_ptr = s\\_match$.

### Complexity
- **Time Complexity:** $O(S + P)$ average, $O(S \\cdot P)$ worst case.
- **Space Complexity:** $O(1)$.`,
    testCases: [
      { input: '"aa", "a"', expectedOutput: 'false', isHidden: false },
      { input: '"aa", "*"', expectedOutput: 'true', isHidden: false },
      { input: '"cb", "?a"', expectedOutput: 'false', isHidden: false },
      { input: '"adceb", "*a*b"', expectedOutput: 'true', isHidden: true },
      { input: '"acdcb", "a*c?b"', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Regular Expression Matching DP',
    slug: 'regular-expression-matching-dp',
    description: `Given an input string $s$ and a pattern $p$, implement regular expression matching with support for '.' and '*' where:
- '.' Matches any single character.
- '*' Matches zero or more of the preceding element.

The matching should cover the **entire** input string (not partial).

### Constraints
- $1 \\le s.length \\le 20$
- $1 \\le p.length \\le 20$
- $s$ contains only lowercase English letters.
- $p$ contains only lowercase English letters, '.', and '*'.
- It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.

### Input Format
- Two strings $s$ and $p$.

### Output Format
- Return a boolean indicating whether $s$ matches $p$.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['string', 'dynamic-programming', 'recursion'],
    roadmapLevel: 6,
    roadmapTopic: 'string-algorithms',
    templates: {
      python: `class Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        pass`,
      javascript: `class Solution {\n    isMatch(s, p) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        # dp[i][j] = does s[i:] match p[j:]
        memo = {}
        
        def dp(i, j):
            if (i, j) in memo:
                return memo[(i, j)]
            if j == len(p):
                return i == len(s)
                
            first_match = i < len(s) and (p[j] == s[i] or p[j] == '.')
            
            if j + 1 < len(p) and p[j + 1] == '*':
                # Case 1: zero occurrences of p[j] -> dp(i, j + 2)
                # Case 2: 1+ occurrences -> first_match and dp(i + 1, j)
                ans = dp(i, j + 2) or (first_match and dp(i + 1, j))
            else:
                ans = first_match and dp(i + 1, j + 1)
                
            memo[(i, j)] = ans
            return ans
            
        return dp(0, 0)`,
      javascript: `class Solution {\n    isMatch(s, p) {\n        const memo = new Map();\n        \n        const dp = (i, j) => {\n            const key = i + ',' + j;\n            if (memo.has(key)) return memo.get(key);\n            if (j === p.length) return i === s.length;\n            \n            const firstMatch = i < s.length && (p[j] === s[i] || p[j] === '.');\n            let ans = false;\n            \n            if (j + 1 < p.length && p[j + 1] === '*') {\n                ans = dp(i, j + 2) || (firstMatch && dp(i + 1, j));\n            } else {\n                ans = firstMatch && dp(i + 1, j + 1);\n            }\n            \n            memo.set(key, ans);\n            return ans;\n        };\n        \n        return dp(0, 0);\n    }\n}`,
    },
    hints: [
      'Define DP state (i, j) = matching suffix s[i:] with pattern p[j:].',
      'If p[j+1] == "*", branch into 0 matches: dp(i, j+2), or >=1 matches: firstMatch and dp(i+1, j).',
    ],
    editorial: `### Method Explanation
Top-Down DP with Memoization:
- State $(i, j)$: whether $s[i \\dots]$ matches $p[j \\dots]$.
- If $j+1 < |p|$ and $p[j+1] == '*'$;
  - Zero repetitions of $p[j]$: $dp(i, j+2)$
  - One or more repetitions of $p[j]$: $firstMatch \\land dp(i+1, j)$
- Otherwise, single character match: $firstMatch \\land dp(i+1, j+1)$.

### Complexity
- **Time Complexity:** $O(|s| \\cdot |p|)$.
- **Space Complexity:** $O(|s| \\cdot |p|)$.`,
    testCases: [
      { input: '"aa", "a"', expectedOutput: 'false', isHidden: false },
      { input: '"aa", "a*"', expectedOutput: 'true', isHidden: false },
      { input: '"ab", ".*"', expectedOutput: 'true', isHidden: false },
      { input: '"aab", "c*a*b"', expectedOutput: 'true', isHidden: true },
      { input: '"mississippi", "mis*is*p*."', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Word Break II Sentence Generation',
    slug: 'word-break-ii-sentence-generation',
    description: `Given a string $s$ and a dictionary of strings $wordDict$, add spaces in $s$ to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

### Constraints
- $1 \\le s.length \\le 20$
- $1 \\le wordDict.length \\le 1000$
- $1 \\le wordDict[i].length \\le 10$
- $s$ and $wordDict[i]$ consist of lowercase English letters.
- All strings of $wordDict$ are unique.

### Input Format
- A string $s$ and a list of strings $wordDict$.

### Output Format
- Return a list of space-separated sentences, sorted alphabetically.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['string', 'dynamic-programming', 'backtracking', 'trie'],
    roadmapLevel: 6,
    roadmapTopic: 'string-algorithms',
    templates: {
      python: `class Solution:\n    def wordBreak(self, s: str, wordDict: list[str]) -> list[str]:\n        pass`,
      javascript: `class Solution {\n    wordBreak(s, wordDict) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> list[str]:
        word_set = set(wordDict)
        memo = {}
        
        def dfs(idx):
            if idx in memo:
                return memo[idx]
            if idx == len(s):
                return [""]
                
            res = []
            for end in range(idx + 1, len(s) + 1):
                prefix = s[idx:end]
                if prefix in word_set:
                    sub_sentences = dfs(end)
                    for sub in sub_sentences:
                        if sub:
                            res.append(prefix + " " + sub)
                        else:
                            res.append(prefix)
                            
            memo[idx] = res
            return res
            
        ans = dfs(0)
        ans.sort()
        return ans`,
      javascript: `class Solution {\n    wordBreak(s, wordDict) {\n        const wordSet = new Set(wordDict);\n        const memo = new Map();\n        \n        const dfs = (idx) => {\n            if (memo.has(idx)) return memo.get(idx);\n            if (idx === s.length) return [""];\n            \n            const res = [];\n            for (let end = idx + 1; end <= s.length; end++) {\n                const prefix = s.slice(idx, end);\n                if (wordSet.has(prefix)) {\n                    const subSentences = dfs(end);\n                    for (const sub of subSentences) {\n                        if (sub.length > 0) {\n                            res.push(prefix + " " + sub);\n                        } else {\n                            res.push(prefix);\n                        }\n                    }\n                }\n            }\n            memo.set(idx, res);\n            return res;\n        };\n        \n        const ans = dfs(0);\n        ans.sort();\n        return ans;\n    }\n}`,
    },
    hints: [
      'Use memoized DFS (top-down DP with memoization).',
      'For each prefix matching a dictionary word, recursively find all valid sentences for the remaining suffix.',
    ],
    editorial: `### Method Explanation
Memoized DFS:
- Define $dfs(idx)$ returning all valid sentences reconstructible from $s[idx \\dots]$.
- For each valid prefix $s[idx \\dots end-1] \\in wordSet$, recursively call $dfs(end)$ and join results.
- Memoizing on $idx$ prevents exponential re-computation on redundant subproblems.

### Complexity
- **Time Complexity:** $O(2^N)$ in worst cases with all 1-character words, but $O(N^2 + \\text{output size})$ with memoization.
- **Space Complexity:** $O(N^2 + \\text{output size})$.`,
    testCases: [
      { input: '"catsanddog", ["cat","cats","and","sand","dog"]', expectedOutput: '["cat sand dog","cats and dog"]', isHidden: false },
      { input: '"pineapplepenapple", ["apple","pen","applepen","pine","pineapple"]', expectedOutput: '["pine apple pen apple","pine applepen apple","pineapple pen apple"]', isHidden: false },
      { input: '"catsandog", ["cats","dog","sand","and","cat"]', expectedOutput: '[]', isHidden: false },
      { input: '"aaaaaaa", ["aaaa","aa","a"]', expectedOutput: '["a a a a a a a","a a a a a aa","a a a a aa a","a a a aa a a","a a a aa aa","a a a aaaa","a a aa a a a","a a aa a aa","a a aa aa a","a a aaaa a","a aa a a a a","a aa a a aa","a aa a aa a","a aa aa a a","a aa aa aa","a aa aaaa","a aaaa a a","a aaaa aa","aa a a a a a","aa a a a aa","aa a a aa a","aa a aa a a","aa a aa aa","aa a aaaa","aa aa a a a","aa aa a aa","aa aa aa a","aa aaaa a","aaaa a a a","aaaa a aa","aaaa aa a"]', isHidden: true },
    ],
  },
  {
    title: 'Decode String Nested Bracket Parser',
    slug: 'decode-string-nested-bracket-parser',
    description: `Given an encoded string, return its decoded string.

The encoding rule is: \`k[encoded_string]\`, where the \`encoded_string\` inside the square brackets is being repeated exactly $k$ times. Note that $k$ is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, $k$.

### Constraints
- $1 \\le s.length \\le 30$
- $s$ consists of lowercase English letters, digits, and square brackets '[]'.
- All the integers in $s$ are in the range $[1, 300]$.

### Input Format
- A string $s$.

### Output Format
- Return the decoded string.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['string', 'stack', 'recursion'],
    roadmapLevel: 6,
    roadmapTopic: 'string-algorithms',
    templates: {
      python: `class Solution:\n    def decodeString(self, s: str) -> str:\n        pass`,
      javascript: `class Solution {\n    decodeString(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def decodeString(self, s: str) -> str:
        stack = [] # (prev_str, repeat_count)
        curr_str = ""
        curr_num = 0
        
        for ch in s:
            if ch.isdigit():
                curr_num = curr_num * 10 + int(ch)
            elif ch == '[':
                stack.append((curr_str, curr_num))
                curr_str = ""
                curr_num = 0
            elif ch == ']':
                prev_str, count = stack.pop()
                curr_str = prev_str + curr_str * count
            else:
                curr_str += ch
                
        return curr_str`,
      javascript: `class Solution {\n    decodeString(s) {\n        const stack = [];\n        let currStr = "";\n        let currNum = 0;\n        \n        for (const ch of s) {\n            if (ch >= '0' && ch <= '9') {\n                currNum = currNum * 10 + parseInt(ch, 10);\n            } else if (ch === '[') {\n                stack.push([currStr, currNum]);\n                currStr = "";\n                currNum = 0;\n            } else if (ch === ']') {\n                const [prevStr, count] = stack.pop();\n                currStr = prevStr + currStr.repeat(count);\n            } else {\n                currStr += ch;\n            }\n        }\n        return currStr;\n    }\n}`,
    },
    hints: [
      'Maintain a stack storing pairs of (previously accumulated string, repeat count).',
      'When encountering "[", push current state onto the stack and reset accumulator.',
      'When encountering "]", pop and repeat current string count times, then prepend prev_str.',
    ],
    editorial: `### Method Explanation
Stack-based Parsing:
- As characters are read:
  - Digits accumulate into currNum.
  - When seeing '[': push (currStr, currNum) onto the stack and reset currStr = "", currNum = 0.
  - When seeing ']': pop (prevStr, count) and set currStr = prevStr + currStr * count.
  - Regular characters append to currStr.

### Complexity
- **Time Complexity:** O(N + length of output).
- **Space Complexity:** O(N + length of output).`,
    testCases: [
      { input: '"3[a]2[bc]"', expectedOutput: '"aaabcbc"', isHidden: false },
      { input: '"3[a2[c]]"', expectedOutput: '"accaccacc"', isHidden: false },
      { input: '"2[abc]3[cd]ef"', expectedOutput: '"abcabccdcdcdef"', isHidden: false },
      { input: '"10[a]"', expectedOutput: '"aaaaaaaaaa"', isHidden: true },
    ],
  },
  {
    title: 'Repeated String Match Rabin Karp',
    slug: 'repeated-string-match-rabin-karp',
    description: `Given two strings $a$ and $b$, return the minimum number of times you should repeat string $a$ so that string $b$ is a substring of it. If it is impossible for $b$ to be a substring of $a$ after any number of repetitions, return -1.

### Constraints
- $1 \\le a.length, b.length \\le 10^4$
- $a$ and $b$ consist of lowercase letters.

### Input Format
- Two strings $a$ and $b$.

### Output Format
- Return the minimum repetitions or -1.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['string', 'string-matching', 'kmp'],
    roadmapLevel: 6,
    roadmapTopic: 'string-algorithms',
    templates: {
      python: `class Solution:\n    def repeatedStringMatch(self, a: str, b: str) -> int:\n        pass`,
      javascript: `class Solution {\n    repeatedStringMatch(a, b) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def repeatedStringMatch(self, a: str, b: str) -> int:
        import math
        # Minimum repetitions required for length to exceed len(b)
        min_reps = math.ceil(len(b) / len(a))
        
        # Check min_reps and min_reps + 1
        s = a * min_reps
        if b in s:
            return min_reps
        if b in (s + a):
            return min_reps + 1
        return -1`,
      javascript: `class Solution {\n    repeatedStringMatch(a, b) {\n        const minReps = Math.ceil(b.length / a.length);\n        const s = a.repeat(minReps);\n        if (s.includes(b)) return minReps;\n        if ((s + a).includes(b)) return minReps + 1;\n        return -1;\n    }\n}`,
    },
    hints: [
      'The length of the repeated string must be at least len(b).',
      'The answer can only be ceil(len(b) / len(a)) or ceil(len(b) / len(a)) + 1.',
      'If b is not in a * (k + 1), it can never appear.',
    ],
    editorial: `### Method Explanation
Length Analysis:
- Let $k = \\lceil |b| / |a| \\rceil$.
- If $b$ is a substring of repeated $a$, it can start anywhere inside the first copy of $a$, spanning across at most $k + 1$ copies.
- Hence we only need to test repetition counts $k$ and $k + 1$.

### Complexity
- **Time Complexity:** $O(|a| + |b|)$.
- **Space Complexity:** $O(|a| + |b|)$.`,
    testCases: [
      { input: '"abcd", "cdabcdab"', expectedOutput: '3', isHidden: false },
      { input: '"a", "aa"', expectedOutput: '2', isHidden: false },
      { input: '"abc", "wxyz"', expectedOutput: '-1', isHidden: false },
      { input: '"abc", "cabcabca"', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: 'Longest Common Prefix Trie',
    slug: 'longest-common-prefix-trie',
    description: `Write a function to find the longest common prefix string amongst an array of strings using a Trie data structure.

If there is no common prefix, return an empty string \`""\`.

### Constraints
- $1 \\le strs.length \\le 200$
- $0 \\le strs[i].length \\le 200$
- $strs[i]$ consists of only lowercase English letters if it is non-empty.

### Input Format
- An array of strings $strs$.

### Output Format
- Return the longest common prefix string.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['string', 'trie', 'array'],
    roadmapLevel: 6,
    roadmapTopic: 'string-algorithms',
    templates: {
      python: `class Solution:\n    def longestCommonPrefix(self, strs: list[str]) -> str:\n        pass`,
      javascript: `class Solution {\n    longestCommonPrefix(strs) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        if not strs:
            return ""
        if "" in strs:
            return ""
            
        # Build Trie
        trie = {}
        for s in strs:
            curr = trie
            for ch in s:
                if ch not in curr:
                    curr[ch] = {}
                curr = curr[ch]
            curr["#"] = True
            
        # Traverse Trie while branch count is 1 and not end of word
        prefix = []
        curr = trie
        while len(curr) == 1 and "#" not in curr:
            ch = next(iter(curr.keys()))
            prefix.append(ch)
            curr = curr[ch]
            
        return "".join(prefix)`,
      javascript: `class Solution {\n    longestCommonPrefix(strs) {\n        if (!strs || strs.length === 0) return "";\n        if (strs.includes("")) return "";\n        \n        const trie = {};\n        for (const s of strs) {\n            let curr = trie;\n            for (const ch of s) {\n                if (!curr[ch]) curr[ch] = {};\n                curr = curr[ch];\n            }\n            curr["#"] = true;\n        }\n        \n        let prefix = "";\n        let curr = trie;\n        while (curr && Object.keys(curr).length === 1 && !curr["#"]) {\n            const ch = Object.keys(curr)[0];\n            prefix += ch;\n            curr = curr[ch];\n        }\n        return prefix;\n    }\n}`,
    },
    hints: [
      'Insert all strings into a Trie.',
      'Follow down the Trie from the root as long as each node has exactly one child and is not the end of any string.',
    ],
    editorial: `### Method Explanation
Trie Traversal for LCP:
- Insert all strings into a prefix tree (Trie).
- Start from root: as long as a Trie node has degree 1 and does not mark the end of any word, the corresponding character is shared by all words in $strs$.

### Complexity
- **Time Complexity:** $O(S)$ where $S$ is total sum of characters across all words.
- **Space Complexity:** $O(S)$.`,
    testCases: [
      { input: '["flower","flow","flight"]', expectedOutput: '"fl"', isHidden: false },
      { input: '["dog","racecar","car"]', expectedOutput: '""', isHidden: false },
      { input: '["a"]', expectedOutput: '"a"', isHidden: false },
      { input: '["interstellar","internet","interval"]', expectedOutput: '"inter"', isHidden: true },
    ],
  },
];
