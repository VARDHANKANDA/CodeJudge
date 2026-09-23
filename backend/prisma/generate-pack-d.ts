import { writePack, ProblemSpec } from './pack-writer-util';

// PACK D: String & Trie Mastery (19 problems)
const packD: ProblemSpec[] = [
  {
    title: 'Z-Algorithm Pattern Matching',
    slug: 'z-algorithm-string-matching',
    description: 'Given a text `s` and a pattern `p`, find all 0-based starting indices where pattern `p` appears in `s` using the Z-algorithm in linear time.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= s.length, p.length <= 10^5\ns and p consist of lowercase English letters.',
    inputFormat: 's, p',
    outputFormat: 'List of starting indices in ascending order.',
    sampleInput: '"ababcababaad", "ababa"',
    sampleOutput: '[5]',
    points: 150,
    hints: [
      'Construct the combined string p + "$" + s.',
      'Compute the Z-array for this combined string where Z[i] is the length of the longest common prefix between the suffix starting at i and the whole string.',
      'Any index i in the s-part where Z[i] == p.length corresponds to a match at index i - p.length - 1 in s.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def searchPattern(self, s: str, p: str) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    searchPattern(s, p) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def searchPattern(self, s: str, p: str) -> list[int]:
        concat = p + "$" + s
        n = len(concat)
        z = [0] * n
        l, r = 0, 0
        for i in range(1, n):
            if i <= r:
                z[i] = min(r - i + 1, z[i - l])
            while i + z[i] < n and concat[z[i]] == concat[i + z[i]]:
                z[i] += 1
            if i + z[i] - 1 > r:
                l, r = i, i + z[i] - 1
        
        m = len(p)
        ans = []
        for i in range(m + 1, n):
            if z[i] == m:
                ans.append(i - m - 1)
        return ans`,
      javascript: `class Solution {
    searchPattern(s, p) {
        const concat = p + "$" + s;
        const n = concat.length;
        const z = new Array(n).fill(0);
        let l = 0, r = 0;
        for (let i = 1; i < n; i++) {
            if (i <= r) {
                z[i] = Math.min(r - i + 1, z[i - l]);
            }
            while (i + z[i] < n && concat[z[i]] === concat[i + z[i]]) {
                z[i]++;
            }
            if (i + z[i] - 1 > r) {
                l = i;
                r = i + z[i] - 1;
            }
        }
        const m = p.length;
        const ans = [];
        for (let i = m + 1; i < n; i++) {
            if (z[i] === m) {
                ans.push(i - m - 1);
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Z-algorithm pattern search.',
      algorithm: 'We concatenate pattern and text with a delimiter not present in either, compute the Z-array in O(N+M) time using two pointers (l, r), and check where Z[i] equals pattern length.',
      timeComplexity: 'O(|s| + |p|)',
      spaceComplexity: 'O(|s| + |p|)',
      content: 'The Z-box technique maintains the interval [l, r] with the largest r reaching furthest to the right.',
      referenceCode: `def searchPattern(s: str, p: str) -> list[int]: ...`,
    },
    tags: ['Strings', 'Algorithms', 'Z-Algorithm', 'String Matching'],
    testCases: [
      { input: '"ababcababaad", "ababa"', expectedOutput: '[5]', isHidden: false },
      { input: '"aaaaa", "aa"', expectedOutput: '[0, 1, 2, 3]', isHidden: false },
      { input: '"abcdef", "xyz"', expectedOutput: '[]', isHidden: true },
      { input: '"a", "a"', expectedOutput: '[0]', isHidden: true },
    ],
  },
  {
    title: 'KMP Longest Prefix Suffix Automaton',
    slug: 'kmp-prefix-function-automaton',
    description: 'Given a string `s`, compute the Knuth-Morris-Pratt (KMP) pi table (Longest Proper Prefix which is also Suffix array) for `s`. Specifically, pi[i] is the length of the longest proper prefix of s[0..i] that is also a suffix of s[0..i].',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= s.length <= 10^5\ns consists of lowercase English letters.',
    inputFormat: 's',
    outputFormat: 'List of integers representing the pi array.',
    sampleInput: '"aabaabaaa"',
    sampleOutput: '[0, 1, 0, 1, 2, 3, 4, 5, 2]',
    points: 150,
    hints: [
      'Maintain the length of the current matched prefix j = pi[i-1].',
      'While j > 0 and s[i] != s[j], set j = pi[j-1].',
      'If s[i] == s[j], j += 1, and set pi[i] = j.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def computePi(self, s: str) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    computePi(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def computePi(self, s: str) -> list[int]:
        n = len(s)
        pi = [0] * n
        for i in range(1, n):
            j = pi[i - 1]
            while j > 0 and s[i] != s[j]:
                j = pi[j - 1]
            if s[i] == s[j]:
                j += 1
            pi[i] = j
        return pi`,
      javascript: `class Solution {
    computePi(s) {
        const n = s.length;
        const pi = new Array(n).fill(0);
        for (let i = 1; i < n; i++) {
            let j = pi[i - 1];
            while (j > 0 && s[i] !== s[j]) {
                j = pi[j - 1];
            }
            if (s[i] === s[j]) {
                j++;
            }
            pi[i] = j;
        }
        return pi;
    }
}`,
    },
    editorial: {
      approach: 'Prefix Function calculation via inductive step.',
      algorithm: 'Use dynamic programming over prefix lengths with the state fallback transition j = pi[j-1].',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'KMP prefix table calculation runs in amortized linear time because the pointer j decreases at most as many times as it increases.',
      referenceCode: `def computePi(s: str) -> list[int]: ...`,
    },
    tags: ['Strings', 'KMP', 'Algorithms', 'Automata'],
    testCases: [
      { input: '"aabaabaaa"', expectedOutput: '[0, 1, 0, 1, 2, 3, 4, 5, 2]', isHidden: false },
      { input: '"aaaa"', expectedOutput: '[0, 1, 2, 3]', isHidden: false },
      { input: '"abcde"', expectedOutput: '[0, 0, 0, 0, 0]', isHidden: true },
      { input: '"abacaba"', expectedOutput: '[0, 0, 1, 0, 1, 2, 3]', isHidden: true },
    ],
  },
  {
    title: 'Multi-Pattern Rabin-Karp Rolling Hash',
    slug: 'rabin-karp-rolling-hash',
    description: 'Given a text `s` and a list of query words `words` all of the same length `k`, return a list of boolean values where the i-th boolean indicates whether `words[i]` exists as a contiguous substring in `s`.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= s.length <= 10^5\n1 <= words.length <= 10^4\n1 <= k <= s.length where k is the length of each word in words.\ns and words[i] contain lowercase English letters.',
    inputFormat: 's, words',
    outputFormat: 'List of booleans.',
    sampleInput: '"helloworld", ["hello", "world", "lowor", "abcde"]',
    sampleOutput: '[true, true, true, false]',
    points: 150,
    hints: [
      'Since all query words have the same length k, compute rolling hashes of all substrings of length k in s in O(|s|).',
      'Store all computed substring hashes in a hash set.',
      'For each word in words, compute its hash in O(k) and check membership in the hash set.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def matchWords(self, s: str, words: list[str]) -> list[bool]:\n        pass`,
      javascript: `class Solution {\n    matchWords(s, words) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def matchWords(self, s: str, words: list[str]) -> list[bool]:
        if not words:
            return []
        k = len(words[0])
        if len(s) < k:
            return [False] * len(words)
        
        MOD = 1_000_000_007
        BASE = 313
        
        seen = set()
        h = 0
        power = 1
        for i in range(k):
            h = (h * BASE + ord(s[i])) % MOD
            if i < k - 1:
                power = (power * BASE) % MOD
        seen.add(h)
        
        for i in range(k, len(s)):
            h = (h - ord(s[i - k]) * power) % MOD
            h = (h * BASE + ord(s[i])) % MOD
            if h < 0:
                h += MOD
            seen.add(h)
            
        res = []
        for w in words:
            wh = 0
            for ch in w:
                wh = (wh * BASE + ord(ch)) % MOD
            res.append(wh in seen)
        return res`,
      javascript: `class Solution {
    matchWords(s, words) {
        if (!words || words.length === 0) return [];
        const k = words[0].length;
        if (s.length < k) return words.map(() => false);
        
        const MOD = 1000000007n;
        const BASE = 313n;
        
        const seen = new Set();
        let h = 0n;
        let power = 1n;
        
        for (let i = 0; i < k; i++) {
            h = (h * BASE + BigInt(s.charCodeAt(i))) % MOD;
            if (i < k - 1) {
                power = (power * BASE) % MOD;
            }
        }
        seen.add(h.toString());
        
        for (let i = k; i < s.length; i++) {
            h = (h - (BigInt(s.charCodeAt(i - k)) * power) % MOD + MOD) % MOD;
            h = (h * BASE + BigInt(s.charCodeAt(i))) % MOD;
            seen.add(h.toString());
        }
        
        const res = [];
        for (const w of words) {
            let wh = 0n;
            for (let i = 0; i < w.length; i++) {
                wh = (wh * BASE + BigInt(w.charCodeAt(i))) % MOD;
            }
            res.push(seen.has(wh.toString()));
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Rabin-Karp polynomial rolling hash.',
      algorithm: 'Precompute hashes of all k-length windows using rolling formula h_next = (h - head * base^(k-1)) * base + tail. Query hashes in O(1) average lookup time.',
      timeComplexity: 'O(|s| + |words| * k)',
      spaceComplexity: 'O(|s|)',
      content: 'Using a strong base (like 313) and a large prime modulo (10^9+7 or double hash) prevents spurious collisions.',
      referenceCode: `def matchWords(s: str, words: list[str]) -> list[bool]: ...`,
    },
    tags: ['Strings', 'Hash Table', 'Rolling Hash', 'Rabin-Karp'],
    testCases: [
      { input: '"helloworld", ["hello", "world", "lowor", "abcde"]', expectedOutput: '[true, true, true, false]', isHidden: false },
      { input: '"banana", ["an", "na", "ba", "xy"]', expectedOutput: '[true, true, true, false]', isHidden: false },
      { input: '"aaaaa", ["aa", "ab"]', expectedOutput: '[true, false]', isHidden: true },
      { input: '"short", ["longerword"]', expectedOutput: '[false]', isHidden: true },
    ],
  },
  {
    title: 'Simplify Unix Canonical Path',
    slug: 'simplify-path-unix',
    description: 'Given a string `path`, which is an absolute path (starting with a slash \'/\') to a file or directory in a Unix-style file system, convert it to the simplified canonical path.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= path.length <= 3000\npath consists of English letters, digits, period \'.\', slash \'/\' or \'_\'.\npath is a valid absolute Unix path.',
    inputFormat: 'path',
    outputFormat: 'Simplified canonical path string.',
    sampleInput: '"/a/./b/../../c/"',
    sampleOutput: '"/c"',
    points: 150,
    hints: [
      'Split the path by \'/\'.',
      'Ignore empty tokens and \'.\'.',
      'For \'..\', pop from stack if stack is not empty.',
      'For any regular directory name, push onto the stack.',
      'Join stack with \'/\' and prefix with \'/\'.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def simplifyPath(self, path: str) -> str:\n        pass`,
      javascript: `class Solution {\n    simplifyPath(path) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def simplifyPath(self, path: str) -> str:
        parts = path.split('/')
        stack = []
        for part in parts:
            if part == '' or part == '.':
                continue
            elif part == '..':
                if stack:
                    stack.pop()
            else:
                stack.append(part)
        return '/' + '/'.join(stack)`,
      javascript: `class Solution {
    simplifyPath(path) {
        const parts = path.split('/');
        const stack = [];
        for (const part of parts) {
            if (part === '' || part === '.') continue;
            if (part === '..') {
                if (stack.length > 0) stack.pop();
            } else {
                stack.push(part);
            }
        }
        return '/' + stack.join('/');
    }
}`,
    },
    editorial: {
      approach: 'Stack-based token processing.',
      algorithm: 'Tokenize by slash, manage navigation using a LIFO stack for directory depth, and join remaining components with single slashes.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard canonical path simplification adhering to POSIX standards.',
      referenceCode: `def simplifyPath(path: str) -> str: ...`,
    },
    tags: ['Strings', 'Stack', 'Simulation'],
    testCases: [
      { input: '"/a/./b/../../c/"', expectedOutput: '"/c"', isHidden: false },
      { input: '"/home//foo/"', expectedOutput: '"/home/foo"', isHidden: false },
      { input: '"/../"', expectedOutput: '"/"', isHidden: true },
      { input: '"/home/user/Documents/../Pictures"', expectedOutput: '"/home/user/Pictures"', isHidden: true },
    ],
  },
  {
    title: 'Multiply Two Non-Negative Strings',
    slug: 'multiply-strings-large',
    description: 'Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2`, also represented as a string. Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= num1.length, num2.length <= 200\nnum1 and num2 consist of digits only and do not contain leading zeros except "0" itself.',
    inputFormat: 'num1, num2',
    outputFormat: 'Product string.',
    sampleInput: '"123", "456"',
    sampleOutput: '"56088"',
    points: 150,
    hints: [
      'The product of num1 with length m and num2 with length n has at most m + n digits.',
      'num1[i] * num2[j] will contribute to positions i + j and i + j + 1.',
      'Accumulate multiplication column by column and handle carries from right to left.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def multiply(self, num1: str, num2: str) -> str:\n        pass`,
      javascript: `class Solution {\n    multiply(num1, num2) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        if num1 == "0" or num2 == "0":
            return "0"
        m, n = len(num1), len(num2)
        pos = [0] * (m + n)
        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                mul = int(num1[i]) * int(num2[j])
                p1, p2 = i + j, i + j + 1
                total = mul + pos[p2]
                pos[p2] = total % 10
                pos[p1] += total // 10
        
        res = []
        for p in pos:
            if not (len(res) == 0 and p == 0):
                res.append(str(p))
        return "".join(res) if res else "0"`,
      javascript: `class Solution {
    multiply(num1, num2) {
        if (num1 === "0" || num2 === "0") return "0";
        const m = num1.length, n = num2.length;
        const pos = new Array(m + n).fill(0);
        for (let i = m - 1; i >= 0; i--) {
            for (let j = n - 1; j >= 0; j--) {
                const mul = Number(num1[i]) * Number(num2[j]);
                const p1 = i + j, p2 = i + j + 1;
                const total = mul + pos[p2];
                pos[p2] = total % 10;
                pos[p1] += Math.floor(total / 10);
            }
        }
        let i = 0;
        while (i < pos.length && pos[i] === 0) i++;
        return pos.slice(i).join("");
    }
}`,
    },
    editorial: {
      approach: 'Digit-by-digit manual multiplication array.',
      algorithm: 'Index i and j multiply to indices i+j and i+j+1. Propagate carries efficiently.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(M + N)',
      content: 'Standard grade-school multiplication algorithm implemented without arbitrary-precision primitives.',
      referenceCode: `def multiply(num1: str, num2: str) -> str: ...`,
    },
    tags: ['Strings', 'Math', 'Simulation'],
    testCases: [
      { input: '"123", "456"', expectedOutput: '"56088"', isHidden: false },
      { input: '"2", "3"', expectedOutput: '"6"', isHidden: false },
      { input: '"0", "12345"', expectedOutput: '"0"', isHidden: true },
      { input: '"999", "999"', expectedOutput: '"998001"', isHidden: true },
    ],
  },
  {
    title: 'Reorganize String No Adjacent Equal',
    slug: 'reorganize-string-no-adjacent',
    description: 'Given a string `s`, rearrange the characters of `s` so that any two adjacent characters are not the same. Return any possible rearrangement of `s` or return `""` if not possible.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= s.length <= 10^5\ns consists of lowercase English letters.',
    inputFormat: 's',
    outputFormat: 'Reorganized string or empty string if impossible.',
    sampleInput: '"aab"',
    sampleOutput: '"aba"',
    points: 150,
    hints: [
      'If the most frequent character appears more than (N + 1) // 2 times, it is impossible.',
      'Place the most frequent characters at even indices first (0, 2, 4, ...).',
      'Once even indices are filled, fill odd indices (1, 3, 5, ...).',
    ],
    codeTemplates: {
      python: `class Solution:\n    def reorganizeString(self, s: str) -> str:\n        pass`,
      javascript: `class Solution {\n    reorganizeString(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `from collections import Counter
class Solution:
    def reorganizeString(self, s: str) -> str:
        counts = Counter(s)
        max_freq = max(counts.values())
        if max_freq > (len(s) + 1) // 2:
            return ""
        
        sorted_chars = sorted(counts.keys(), key=lambda c: -counts[c])
        res = [''] * len(s)
        idx = 0
        for ch in sorted_chars:
            for _ in range(counts[ch]):
                res[idx] = ch
                idx += 2
                if idx >= len(s):
                    idx = 1
        return "".join(res)`,
      javascript: `class Solution {
    reorganizeString(s) {
        const counts = {};
        for (const ch of s) counts[ch] = (counts[ch] || 0) + 1;
        const maxFreq = Math.max(...Object.values(counts));
        if (maxFreq > Math.floor((s.length + 1) / 2)) return "";
        
        const sortedChars = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
        const res = new Array(s.length);
        let idx = 0;
        for (const ch of sortedChars) {
            for (let k = 0; k < counts[ch]; k++) {
                res[idx] = ch;
                idx += 2;
                if (idx >= s.length) idx = 1;
            }
        }
        return res.join("");
    }
}`,
    },
    editorial: {
      approach: 'Greedy interlaced placement by frequency.',
      algorithm: 'Fill even indices first with the most frequent characters, then continue onto odd indices.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Because max_freq <= ceil(N/2), the most frequent character will never collide with itself.',
      referenceCode: `def reorganizeString(s: str) -> str: ...`,
    },
    tags: ['Strings', 'Greedy', 'Heap', 'Sorting'],
    testCases: [
      { input: '"aab"', expectedOutput: '"aba"', isHidden: false },
      { input: '"aaab"', expectedOutput: '""', isHidden: false },
      { input: '"vvvlo"', expectedOutput: '"vlvov"', isHidden: true },
      { input: '"a"', expectedOutput: '"a"', isHidden: true },
    ],
  },
  {
    title: 'Compare Version Numbers Multi-Level',
    slug: 'compare-version-numbers-multi',
    description: 'Given two version strings, `version1` and `version2`, compare them. A version string consists of revisions separated by dots \'.\'. If version1 < version2 return -1, if version1 > version2 return 1, otherwise return 0.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= version1.length, version2.length <= 500\nversion1 and version2 only contain digits and \'.\'.',
    inputFormat: 'version1, version2',
    outputFormat: '-1, 0, or 1.',
    sampleInput: '"1.01", "1.001"',
    sampleOutput: '0',
    points: 150,
    hints: [
      'Split both strings by \'.\' and iterate up to the maximum number of components.',
      'Treat missing components beyond the end of a shorter version string as 0.',
      'Compare integer values of corresponding revisions.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def compareVersion(self, version1: str, version2: str) -> int:\n        pass`,
      javascript: `class Solution {\n    compareVersion(version1, version2) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def compareVersion(self, version1: str, version2: str) -> int:
        v1 = [int(x) for x in version1.split('.')]
        v2 = [int(x) for x in version2.split('.')]
        max_len = max(len(v1), len(v2))
        for i in range(max_len):
            val1 = v1[i] if i < len(v1) else 0
            val2 = v2[i] if i < len(v2) else 0
            if val1 < val2:
                return -1
            elif val1 > val2:
                return 1
        return 0`,
      javascript: `class Solution {
    compareVersion(version1, version2) {
        const v1 = version1.split('.').map(Number);
        const v2 = version2.split('.').map(Number);
        const maxLen = Math.max(v1.length, v2.length);
        for (let i = 0; i < maxLen; i++) {
            const val1 = i < v1.length ? v1[i] : 0;
            const val2 = i < v2.length ? v2[i] : 0;
            if (val1 < val2) return -1;
            if (val1 > val2) return 1;
        }
        return 0;
    }
}`,
    },
    editorial: {
      approach: 'Two-pointer revision parsing with zero-padding.',
      algorithm: 'Parse revisions left-to-right, default missing chunks to 0, compare numerical values.',
      timeComplexity: 'O(N + M)',
      spaceComplexity: 'O(N + M)',
      content: 'Simple, robust version comparator handling arbitrary depth and leading zeros.',
      referenceCode: `def compareVersion(v1: str, v2: str) -> int: ...`,
    },
    tags: ['Strings', 'Two Pointers', 'Parsing'],
    testCases: [
      { input: '"1.01", "1.001"', expectedOutput: '0', isHidden: false },
      { input: '"1.0", "1.0.0.0"', expectedOutput: '0', isHidden: false },
      { input: '"0.1", "1.1"', expectedOutput: '-1', isHidden: true },
      { input: '"7.5.2.4", "7.5.3"', expectedOutput: '-1', isHidden: true },
    ],
  },
  {
    title: 'Custom Sort String by Custom Alphabet',
    slug: 'custom-sort-string-order',
    description: 'You are given two strings `order` and `s`. All characters of `order` are unique and were sorted in some custom order. Permute the characters of `s` so that they match the order that `order` was sorted.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= order.length <= 26\n1 <= s.length <= 1000\norder and s consist of lowercase English letters.',
    inputFormat: 'order, s',
    outputFormat: 'Sorted string according to custom order.',
    sampleInput: '"cba", "abcd"',
    sampleOutput: '"cbad"',
    points: 150,
    hints: [
      'Count the occurrences of every character in s.',
      'Iterate through characters in order, appending each character count times to the result.',
      'Append any remaining characters not present in order at the end.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def customSortString(self, order: str, s: str) -> str:\n        pass`,
      javascript: `class Solution {\n    customSortString(order, s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `from collections import Counter
class Solution:
    def customSortString(self, order: str, s: str) -> str:
        count = Counter(s)
        res = []
        for ch in order:
            if ch in count:
                res.append(ch * count[ch])
                del count[ch]
        for ch, freq in count.items():
            res.append(ch * freq)
        return "".join(res)`,
      javascript: `class Solution {
    customSortString(order, s) {
        const count = {};
        for (const ch of s) count[ch] = (count[ch] || 0) + 1;
        const res = [];
        for (const ch of order) {
            if (count[ch]) {
                res.push(ch.repeat(count[ch]));
                delete count[ch];
            }
        }
        for (const [ch, freq] of Object.entries(count)) {
            res.push(ch.repeat(freq));
        }
        return res.join("");
    }
}`,
    },
    editorial: {
      approach: 'Frequency counting with ordered bucket output.',
      algorithm: 'Count frequencies in s, build string following order, then append the rest.',
      timeComplexity: 'O(N + M)',
      spaceComplexity: 'O(1)',
      content: 'Bucket sorting by character frequency achieves optimal linear runtime.',
      referenceCode: `def customSortString(order: str, s: str) -> str: ...`,
    },
    tags: ['Strings', 'Hash Table', 'Sorting'],
    testCases: [
      { input: '"cba", "abcd"', expectedOutput: '"cbad"', isHidden: false },
      { input: '"cbafg", "abcd"', expectedOutput: '"cbad"', isHidden: false },
      { input: '"kqep", "pekeq"', expectedOutput: '"kqeep"', isHidden: true },
      { input: '"z", "zzzz"', expectedOutput: '"zzzz"', isHidden: true },
    ],
  },
  {
    title: 'Break Palindrome Lexicographically',
    slug: 'break-palindrome-lexicographically',
    description: 'Given a palindromic string of lowercase English letters `palindrome`, replace exactly one character with any lowercase English letter so that the resulting string is not a palindrome and is the lexicographically smallest possible string. Return the resulting string, or `""` if impossible.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= palindrome.length <= 1000\npalindrome consists of lowercase English letters.',
    inputFormat: 'palindrome',
    outputFormat: 'Lexicographically smallest non-palindromic string or empty string.',
    sampleInput: '"abccba"',
    sampleOutput: '"aaccba"',
    points: 150,
    hints: [
      'If length of palindrome is 1, it is impossible to break, return "".',
      'Scan the first half of the string (0 to n // 2 - 1). The first character that is not "a" can be replaced by "a".',
      'If all characters in the first half are "a", change the very last character of the entire string to "b".',
    ],
    codeTemplates: {
      python: `class Solution:\n    def breakPalindrome(self, palindrome: str) -> str:\n        pass`,
      javascript: `class Solution {\n    breakPalindrome(palindrome) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def breakPalindrome(self, palindrome: str) -> str:
        n = len(palindrome)
        if n <= 1:
            return ""
        chars = list(palindrome)
        for i in range(n // 2):
            if chars[i] != 'a':
                chars[i] = 'a'
                return "".join(chars)
        chars[-1] = 'b'
        return "".join(chars)`,
      javascript: `class Solution {
    breakPalindrome(palindrome) {
        const n = palindrome.length;
        if (n <= 1) return "";
        const chars = palindrome.split("");
        for (let i = 0; i < Math.floor(n / 2); i++) {
            if (chars[i] !== 'a') {
                chars[i] = 'a';
                return chars.join("");
            }
        }
        chars[n - 1] = 'b';
        return chars.join("");
    }
}`,
    },
    editorial: {
      approach: 'Greedy left-to-right character replacement.',
      algorithm: 'To minimize lexicographically, find the first non-\'a\' in the first half and change it to \'a\'. If all are \'a\', change the last char to \'b\'.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Handles odd-length centers properly because changing the middle character leaves the string as a palindrome.',
      referenceCode: `def breakPalindrome(palindrome: str) -> str: ...`,
    },
    tags: ['Strings', 'Greedy'],
    testCases: [
      { input: '"abccba"', expectedOutput: '"aaccba"', isHidden: false },
      { input: '"a"', expectedOutput: '""', isHidden: false },
      { input: '"aa"', expectedOutput: '"ab"', isHidden: true },
      { input: '"aba"', expectedOutput: '"abb"', isHidden: true },
    ],
  },
  {
    title: 'Split a String in Balanced Substrings',
    slug: 'split-string-balanced-substrings',
    description: 'Balanced strings are those that have an equal quantity of \'L\' and \'R\' characters. Given a balanced string `s`, split it into some number of substrings such that each substring is balanced. Return the maximum number of balanced substrings you can obtain.',
    difficulty: 'EASY',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '2 <= s.length <= 1000\ns[i] is either \'L\' or \'R\'.\ns is a balanced string.',
    inputFormat: 's',
    outputFormat: 'Integer representing the maximum number of splits.',
    sampleInput: '"RLRRLLRLRL"',
    sampleOutput: '4',
    points: 100,
    hints: [
      'Keep a counter balance where \'R\' adds 1 and \'L\' subtracts 1.',
      'Whenever balance reaches 0, we have completed a balanced substring.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def balancedStringSplit(self, s: str) -> int:\n        pass`,
      javascript: `class Solution {\n    balancedStringSplit(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def balancedStringSplit(self, s: str) -> int:
        count = 0
        bal = 0
        for ch in s:
            bal += 1 if ch == 'R' else -1
            if bal == 0:
                count += 1
        return count`,
      javascript: `class Solution {
    balancedStringSplit(s) {
        let count = 0;
        let bal = 0;
        for (const ch of s) {
            bal += (ch === 'R' ? 1 : -1);
            if (bal === 0) count++;
        }
        return count;
    }
}`,
    },
    editorial: {
      approach: 'Greedy linear scan with balance counter.',
      algorithm: 'Increment balance on R, decrement on L. Cut eagerly whenever balance becomes 0.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Greedy splitting at every balance == 0 point yields the globally maximal count.',
      referenceCode: `def balancedStringSplit(s: str) -> int: ...`,
    },
    tags: ['Strings', 'Greedy', 'Counting'],
    testCases: [
      { input: '"RLRRLLRLRL"', expectedOutput: '4', isHidden: false },
      { input: '"RLRRRLLRLL"', expectedOutput: '2', isHidden: false },
      { input: '"LLLLRRRR"', expectedOutput: '1', isHidden: true },
      { input: '"RL"', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Longest Chunked Palindrome Decomposition',
    slug: 'longest-chunked-palindrome-decomposition',
    description: 'You are given a string `text`. You should split it to k substrings `(sub_1, sub_2, ..., sub_k)` such that `sub_1 + sub_2 + ... + sub_k = text` and `sub_i == sub_{k - i + 1}` for all `1 <= i <= k`. Return the largest possible `k`.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= text.length <= 1000\ntext consists only of lowercase English characters.',
    inputFormat: 'text',
    outputFormat: 'Integer representing the maximum number of chunks.',
    sampleInput: '"ghiabcdefhelloadamhelloabcdefghi"',
    sampleOutput: '7',
    points: 200,
    hints: [
      'Greedily match the shortest prefix that equals the corresponding suffix.',
      'Once a match is found, count 2 chunks and recurse / advance to the interior substring.',
      'If remaining substring is non-empty and no symmetric cut is possible, count 1 for the remaining whole.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def longestDecomposition(self, text: str) -> int:\n        pass`,
      javascript: `class Solution {\n    longestDecomposition(text) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def longestDecomposition(self, text: str) -> int:
        n = len(text)
        if not text:
            return 0
        for i in range(1, n // 2 + 1):
            if text[:i] == text[n - i:]:
                return 2 + self.longestDecomposition(text[i:n - i])
        return 1`,
      javascript: `class Solution {
    longestDecomposition(text) {
        const n = text.length;
        if (n === 0) return 0;
        for (let i = 1; i <= Math.floor(n / 2); i++) {
            if (text.slice(0, i) === text.slice(n - i)) {
                return 2 + this.longestDecomposition(text.slice(i, n - i));
            }
        }
        return 1;
    }
}`,
    },
    editorial: {
      approach: 'Greedy recursive prefix-suffix matching.',
      algorithm: 'Greedy choice property guarantees the shortest matching prefix/suffix never eliminates an optimal decomposition.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N)',
      content: 'Can be accelerated with rolling hashes to O(N), but O(N^2) is well within the N <= 1000 constraint.',
      referenceCode: `def longestDecomposition(text: str) -> int: ...`,
    },
    tags: ['Strings', 'Two Pointers', 'Greedy', 'Dynamic Programming'],
    testCases: [
      { input: '"ghiabcdefhelloadamhelloabcdefghi"', expectedOutput: '7', isHidden: false },
      { input: '"merchant"', expectedOutput: '1', isHidden: false },
      { input: '"antaprezatepzapreanta"', expectedOutput: '11', isHidden: true },
      { input: '"aaa"', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Stream of Characters Suffix Matching',
    slug: 'stream-of-characters-trie',
    description: 'Design an algorithm that accepts a stream of characters and checks if any suffix of the stream matches any word in a given list of `words`. Implement `query(letter)` which returns true if some suffix of characters seen so far equals any word in `words`.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= words.length <= 2000\n1 <= words[i].length <= 2000\nTotal sum of words[i].length <= 10^5\nStream contains up to 4 * 10^4 queries.',
    inputFormat: 'words, queries',
    outputFormat: 'List of booleans corresponding to each query answer.',
    sampleInput: '["cd", "f", "kl"], ["a", "b", "c", "d", "e", "f"]',
    sampleOutput: '[false, false, false, true, false, true]',
    points: 200,
    hints: [
      'Store all words in reverse in a Trie.',
      'Keep a rolling buffer of characters query by query.',
      'Walk backwards in the Trie from the latest character in the buffer.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def streamChecker(self, words: list[str], queries: list[str]) -> list[bool]:\n        pass`,
      javascript: `class Solution {\n    streamChecker(words, queries) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False

class Solution:
    def streamChecker(self, words: list[str], queries: list[str]) -> list[bool]:
        root = TrieNode()
        for w in words:
            curr = root
            for ch in reversed(w):
                if ch not in curr.children:
                    curr.children[ch] = TrieNode()
                curr = curr.children[ch]
            curr.is_word = True
            
        stream = []
        ans = []
        for q in queries:
            stream.append(q)
            curr = root
            matched = False
            for ch in reversed(stream):
                if ch not in curr.children:
                    break
                curr = curr.children[ch]
                if curr.is_word:
                    matched = True
                    break
            ans.append(matched)
        return ans`,
      javascript: `class Solution {
    streamChecker(words, queries) {
        const root = { children: {}, isWord: false };
        for (const w of words) {
            let curr = root;
            for (let i = w.length - 1; i >= 0; i--) {
                const ch = w[i];
                if (!curr.children[ch]) curr.children[ch] = { children: {}, isWord: false };
                curr = curr.children[ch];
            }
            curr.isWord = true;
        }
        
        const stream = [];
        const ans = [];
        for (const q of queries) {
            stream.push(q);
            let curr = root;
            let matched = false;
            for (let i = stream.length - 1; i >= 0; i--) {
                const ch = stream[i];
                if (!curr.children[ch]) break;
                curr = curr.children[ch];
                if (curr.isWord) {
                    matched = true;
                    break;
                }
            }
            ans.push(matched);
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Reverse Word Trie lookup.',
      algorithm: 'Insert reversed dictionary words into Trie. Match suffix backwards from recent stream history.',
      timeComplexity: 'O(W + Q * max_word_len)',
      spaceComplexity: 'O(W)',
      content: 'Reversed Trie avoids tracking multiple active states at each character.',
      referenceCode: `def streamChecker(words: list[str], queries: list[str]) -> list[bool]: ...`,
    },
    tags: ['Trie', 'Design', 'Data Structures', 'Strings'],
    testCases: [
      { input: '["cd", "f", "kl"], ["a", "b", "c", "d", "e", "f"]', expectedOutput: '[false, false, false, true, false, true]', isHidden: false },
      { input: '["ab", "ba"], ["a", "b", "a"]', expectedOutput: '[false, true, true]', isHidden: false },
      { input: '["xyz"], ["x", "y", "z"]', expectedOutput: '[false, false, true]', isHidden: true },
      { input: '["a"], ["a", "a", "b"]', expectedOutput: '[true, true, false]', isHidden: true },
    ],
  },
  {
    title: 'Camelcase Matching Against Pattern',
    slug: 'camelcase-matching',
    description: 'Given an array of strings `queries` and a string `pattern`, return a boolean array `answer` where `answer[i]` is true if `queries[i]` matches `pattern`, and false otherwise. A query matches if we can insert lowercase letters into the pattern to make it equal to the query.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= queries.length <= 100\n1 <= queries[i].length, pattern.length <= 100\nqueries[i] and pattern consist of English letters.',
    inputFormat: 'queries, pattern',
    outputFormat: 'List of booleans.',
    sampleInput: '["FooBar", "FooBarTest", "FootBall", "FrameBuffer"], "FB"',
    sampleOutput: '[true, false, true, false]',
    points: 150,
    hints: [
      'For each query, iterate through its characters.',
      'If query[i] == pattern[p], advance pattern pointer p.',
      'If query[i] is uppercase and does not match pattern[p], the query fails immediately.',
      'Check if p == pattern.length after consuming all characters.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def camelMatch(self, queries: list[str], pattern: str) -> list[bool]:\n        pass`,
      javascript: `class Solution {\n    camelMatch(queries, pattern) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def camelMatch(self, queries: list[str], pattern: str) -> list[bool]:
        def matches(q: str) -> bool:
            p = 0
            for ch in q:
                if p < len(pattern) and ch == pattern[p]:
                    p += 1
                elif ch.isupper():
                    return False
            return p == len(pattern)
        
        return [matches(q) for q in queries]`,
      javascript: `class Solution {
    camelMatch(queries, pattern) {
        const matches = (q) => {
            let p = 0;
            for (let i = 0; i < q.length; i++) {
                const ch = q[i];
                if (p < pattern.length && ch === pattern[p]) {
                    p++;
                } else if (ch >= 'A' && ch <= 'Z') {
                    return false;
                }
            }
            return p === pattern.length;
        };
        return queries.map(matches);
    }
}`,
    },
    editorial: {
      approach: 'Two-pointer subsequence verification with uppercase constraint.',
      algorithm: 'Advance pattern pointer on match. Any unexpected uppercase letter invalidates the match.',
      timeComplexity: 'O(Q * L)',
      spaceComplexity: 'O(1)',
      content: 'Straightforward subsequence checking with character case enforcement.',
      referenceCode: `def camelMatch(queries: list[str], pattern: str) -> list[bool]: ...`,
    },
    tags: ['Strings', 'Two Pointers', 'Trie'],
    testCases: [
      { input: '["FooBar", "FooBarTest", "FootBall", "FrameBuffer"], "FB"', expectedOutput: '[true, false, true, false]', isHidden: false },
      { input: '["FooBar", "FooBarTest", "FootBall", "FrameBuffer"], "FoBa"', expectedOutput: '[true, false, true, false]', isHidden: false },
      { input: '["FooBar", "FooBarTest", "FootBall", "FrameBuffer"], "FoBaT"', expectedOutput: '[false, true, false, false]', isHidden: true },
      { input: '["CompetitiveProgramming"], "CP"', expectedOutput: '[true]', isHidden: true },
    ],
  },
  {
    title: 'Find and Replace Pattern Word Isomorphism',
    slug: 'find-and-replace-pattern-isomorphism',
    description: 'Given a list of strings `words` and a string `pattern`, return a list of `words[i]` that match `pattern`. A word matches the pattern if there exists a bijection (one-to-one mapping) between the letters in the pattern and the letters in the word.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= words.length <= 50\n1 <= words[i].length = pattern.length <= 20\nwords[i] and pattern consist of lowercase letters.',
    inputFormat: 'words, pattern',
    outputFormat: 'List of matching words.',
    sampleInput: '["abc", "deq", "mee", "aqq", "dkd", "ccc"], "abb"',
    sampleOutput: '["mee", "aqq"]',
    points: 150,
    hints: [
      'Two strings are isomorphic if their character index signatures match.',
      'Map each word to its canonical pattern (e.g. replacing the first occurrence of each distinct char with 0, 1, 2...).',
      'Compare word signatures to the pattern signature.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def findAndReplacePattern(self, words: list[str], pattern: str) -> list[str]:\n        pass`,
      javascript: `class Solution {\n    findAndReplacePattern(words, pattern) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findAndReplacePattern(self, words: list[str], pattern: str) -> list[str]:
        def normalize(w: str) -> list[int]:
            seen = {}
            res = []
            for ch in w:
                if ch not in seen:
                    seen[ch] = len(seen)
                res.append(seen[ch])
            return res
        
        target = normalize(pattern)
        return [w for w in words if normalize(w) == target]`,
      javascript: `class Solution {
    findAndReplacePattern(words, pattern) {
        const normalize = (w) => {
            const seen = new Map();
            const res = [];
            for (let i = 0; i < w.length; i++) {
                const ch = w[i];
                if (!seen.has(ch)) seen.set(ch, seen.size);
                res.push(seen.get(ch));
            }
            return res.join(",");
        };
        const target = normalize(pattern);
        return words.filter(w => normalize(w) === target);
    }
}`,
    },
    editorial: {
      approach: 'Canonical signature normalization.',
      algorithm: 'Convert each string into a sequence of integer IDs assigned by character first appearance order.',
      timeComplexity: 'O(W * L)',
      spaceComplexity: 'O(L)',
      content: 'Normalization transforms isomorphism testing into simple equality checks.',
      referenceCode: `def findAndReplacePattern(words: list[str], pattern: str) -> list[str]: ...`,
    },
    tags: ['Strings', 'Hash Table', 'Isomorphism'],
    testCases: [
      { input: '["abc", "deq", "mee", "aqq", "dkd", "ccc"], "abb"', expectedOutput: '["mee", "aqq"]', isHidden: false },
      { input: '["a", "b", "c"], "a"', expectedOutput: '["a", "b", "c"]', isHidden: false },
      { input: '["badc", "abab", "dddd", "dede"], "baba"', expectedOutput: '["abab", "dede"]', isHidden: true },
      { input: '["xyz"], "abc"', expectedOutput: '["xyz"]', isHidden: true },
    ],
  },
  {
    title: 'Remove Sub-Folders from the Filesystem',
    slug: 'remove-subfolders-from-filesystem',
    description: 'Given a list of folders `folder`, return the folders after removing all sub-folders in those folders. If `folder[i]` is located within another `folder[j]`, it is called a sub-folder and must be removed.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= folder.length <= 4 * 10^4\n2 <= folder[i].length <= 100\nfolder[i] contains only lowercase letters and \'/\'.\nfolder[i] starts with \'/\' and does not end with \'/\'.',
    inputFormat: 'folder',
    outputFormat: 'List of remaining folders.',
    sampleInput: '["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]',
    sampleOutput: '["/a", "/c/d", "/c/f"]',
    points: 150,
    hints: [
      'Sort the folder paths lexicographically.',
      'After sorting, any sub-folder of a parent folder F will appear immediately after F.',
      'Check if folder[i].startswith(parent + "/").',
    ],
    codeTemplates: {
      python: `class Solution:\n    def removeSubfolders(self, folder: list[str]) -> list[str]:\n        pass`,
      javascript: `class Solution {\n    removeSubfolders(folder) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def removeSubfolders(self, folder: list[str]) -> list[str]:
        folder.sort()
        res = []
        for f in folder:
            if not res or not f.startswith(res[-1] + '/'):
                res.append(f)
        return res`,
      javascript: `class Solution {
    removeSubfolders(folder) {
        folder.sort();
        const res = [];
        for (const f of folder) {
            if (res.length === 0 || !f.startsWith(res[res.length - 1] + '/')) {
                res.push(f);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Lexicographical sorting & prefix comparison.',
      algorithm: 'Sort folders alphabetically. A parent folder always precedes its sub-folders.',
      timeComplexity: 'O(N * L * log N)',
      spaceComplexity: 'O(N * L)',
      content: 'Sorting groups prefixes together naturally, allowing a single linear scan.',
      referenceCode: `def removeSubfolders(folder: list[str]) -> list[str]: ...`,
    },
    tags: ['Strings', 'Sorting', 'Trie', 'File System'],
    testCases: [
      { input: '["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]', expectedOutput: '["/a", "/c/d", "/c/f"]', isHidden: false },
      { input: '["/a", "/a/b/c", "/a/b/d"]', expectedOutput: '["/a"]', isHidden: false },
      { input: '["/a/b/c", "/a/b/ca", "/a/b/d"]', expectedOutput: '["/a/b/c", "/a/b/ca", "/a/b/d"]', isHidden: true },
      { input: '["/x"]', expectedOutput: '["/x"]', isHidden: true },
    ],
  },
  {
    title: 'Longest Happy Prefix',
    slug: 'longest-happy-prefix',
    description: 'A string is called a happy prefix if is a non-empty prefix which is also a suffix (excluding the whole string itself). Given a string `s`, return the longest happy prefix of `s`. Return an empty string `""` if no such prefix exists.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= s.length <= 10^5\ns contains only lowercase English letters.',
    inputFormat: 's',
    outputFormat: 'Longest happy prefix string.',
    sampleInput: '"level"',
    sampleOutput: '"l"',
    points: 200,
    hints: [
      'This is precisely the last value in the KMP pi table: pi[len(s) - 1].',
      'Compute the KMP pi array and return s[0:pi[-1]].',
    ],
    codeTemplates: {
      python: `class Solution:\n    def longestPrefix(self, s: str) -> str:\n        pass`,
      javascript: `class Solution {\n    longestPrefix(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def longestPrefix(self, s: str) -> str:
        n = len(s)
        pi = [0] * n
        for i in range(1, n):
            j = pi[i - 1]
            while j > 0 and s[i] != s[j]:
                j = pi[j - 1]
            if s[i] == s[j]:
                j += 1
            pi[i] = j
        return s[:pi[-1]]`,
      javascript: `class Solution {
    longestPrefix(s) {
        const n = s.length;
        const pi = new Array(n).fill(0);
        for (let i = 1; i < n; i++) {
            let j = pi[i - 1];
            while (j > 0 && s[i] !== s[j]) {
                j = pi[j - 1];
            }
            if (s[i] === s[j]) j++;
            pi[i] = j;
        }
        return s.slice(0, pi[n - 1]);
    }
}`,
    },
    editorial: {
      approach: 'KMP Pi Table last element extraction.',
      algorithm: 'By definition, pi[n-1] holds the length of the longest proper prefix that is also a suffix of s.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Direct application of the Knuth-Morris-Pratt failure table.',
      referenceCode: `def longestPrefix(s: str) -> str: ...`,
    },
    tags: ['Strings', 'KMP', 'String Matching', 'Rolling Hash'],
    testCases: [
      { input: '"level"', expectedOutput: '"l"', isHidden: false },
      { input: '"ababab"', expectedOutput: '"abab"', isHidden: false },
      { input: '"leetcodeleet"', expectedOutput: '"leet"', isHidden: true },
      { input: '"a"', expectedOutput: '""', isHidden: true },
    ],
  },
  {
    title: 'Min Length After Deleting Similar Ends',
    slug: 'minimum-length-of-string-after-deleting-similar-ends',
    description: 'Given a string `s` consisting only of characters \'a\', \'b\', and \'c\', you are asked to apply the following operation on the string any number of times: Pick a non-empty prefix and non-empty suffix that only contain character c, such that prefix and suffix do not intersect. Delete both. Return the minimum length of `s` after applying the operations.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= s.length <= 10^5\ns only consists of characters \'a\', \'b\', and \'c\'.',
    inputFormat: 's',
    outputFormat: 'Minimum length integer.',
    sampleInput: '"ca"',
    sampleOutput: '2',
    points: 150,
    hints: [
      'Use two pointers l = 0 and r = len(s) - 1.',
      'While l < r and s[l] == s[r], advance l while s[l] == ch and decrease r while s[r] == ch.',
      'Return r - l + 1 if l <= r else 0.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def minimumLength(self, s: str) -> int:\n        pass`,
      javascript: `class Solution {\n    minimumLength(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minimumLength(self, s: str) -> int:
        l, r = 0, len(s) - 1
        while l < r and s[l] == s[r]:
            ch = s[l]
            while l <= r and s[l] == ch:
                l += 1
            while l <= r and s[r] == ch:
                r -= 1
        return max(0, r - l + 1)`,
      javascript: `class Solution {
    minimumLength(s) {
        let l = 0, r = s.length - 1;
        while (l < r && s[l] === s[r]) {
            const ch = s[l];
            while (l <= r && s[l] === ch) l++;
            while (l <= r && s[r] === ch) r--;
        }
        return Math.max(0, r - l + 1);
    }
}`,
    },
    editorial: {
      approach: 'Two-pointer inward contraction.',
      algorithm: 'Shrink inward from both ends as long as boundary characters match.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Greedy deletion at matched ends is optimal because the operation is strictly symmetric and deterministic.',
      referenceCode: `def minimumLength(s: str) -> int: ...`,
    },
    tags: ['Strings', 'Two Pointers', 'Greedy'],
    testCases: [
      { input: '"ca"', expectedOutput: '2', isHidden: false },
      { input: '"cabaabac"', expectedOutput: '0', isHidden: false },
      { input: '"aabccabba"', expectedOutput: '3', isHidden: true },
      { input: '"a"', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Orderly Queue String Rotation',
    slug: 'orderly-queue-string-rotation',
    description: 'You are given a string `s` and an integer `k`. You can choose one of the first `k` letters of `s` and append it at the end of the string. Return the lexicographically smallest string you could have after applying the move any number of times.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= k <= s.length <= 1000\ns consists of lowercase English letters.',
    inputFormat: 's, k',
    outputFormat: 'Lexicographically smallest string.',
    sampleInput: '"cba", 1',
    sampleOutput: '"acb"',
    points: 200,
    hints: [
      'If k == 1, we can only cyclicly rotate s. Check all N rotations and return the minimum.',
      'If k > 1, we can bubble sort any two adjacent characters, so we can generate any permutation. Thus, return the sorted string.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def orderlyQueue(self, s: str, k: int) -> str:\n        pass`,
      javascript: `class Solution {\n    orderlyQueue(s, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def orderlyQueue(self, s: str, k: int) -> str:
        if k == 1:
            return min(s[i:] + s[:i] for i in range(len(s)))
        return "".join(sorted(s))`,
      javascript: `class Solution {
    orderlyQueue(s, k) {
        if (k === 1) {
            let best = s;
            for (let i = 1; i < s.length; i++) {
                const rot = s.slice(i) + s.slice(0, i);
                if (rot < best) best = rot;
            }
            return best;
        }
        return s.split('').sort().join('');
    }
}`,
    },
    editorial: {
      approach: 'Group theory permutation analysis.',
      algorithm: 'For k=1, inspect all cyclic shifts. For k>=2, the action generates the entire symmetric group S_n.',
      timeComplexity: 'O(N^2) for k=1, O(N log N) for k>1',
      spaceComplexity: 'O(N)',
      content: 'Any permutation is reachable for k >= 2 via bubble sort simulation.',
      referenceCode: `def orderlyQueue(s: str, k: int) -> str: ...`,
    },
    tags: ['Strings', 'Math', 'Sorting', 'Brainteaser'],
    testCases: [
      { input: '"cba", 1', expectedOutput: '"acb"', isHidden: false },
      { input: '"baaca", 3', expectedOutput: '"aaabc"', isHidden: false },
      { input: '"zxy", 2', expectedOutput: '"xyz"', isHidden: true },
      { input: '"a", 1', expectedOutput: '"a"', isHidden: true },
    ],
  },
  {
    title: 'Min Deletions for Unique Frequencies',
    slug: 'minimum-deletions-to-make-character-frequencies-unique',
    description: 'A string `s` is called good if there are no two different characters in `s` that have the same frequency. Given a string `s`, return the minimum number of characters you need to delete to make `s` good.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= s.length <= 10^5\ns contains only lowercase English letters.',
    inputFormat: 's',
    outputFormat: 'Minimum deletions integer.',
    sampleInput: '"aab"',
    sampleOutput: '0',
    points: 150,
    hints: [
      'Count the frequencies of each character.',
      'Maintain a set of used frequencies.',
      'For each character frequency, decrement until it is either 0 or not present in the used frequencies set.',
    ],
    codeTemplates: {
      python: `class Solution:\n    def minDeletions(self, s: str) -> int:\n        pass`,
      javascript: `class Solution {\n    minDeletions(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `from collections import Counter
class Solution:
    def minDeletions(self, s: str) -> int:
        freq = Counter(s)
        seen = set()
        deletions = 0
        for count in freq.values():
            while count > 0 and count in seen:
                count -= 1
                deletions += 1
            if count > 0:
                seen.add(count)
        return deletions`,
      javascript: `class Solution {
    minDeletions(s) {
        const freq = {};
        for (const ch of s) freq[ch] = (freq[ch] || 0) + 1;
        const seen = new Set();
        let deletions = 0;
        for (let count of Object.values(freq)) {
            while (count > 0 && seen.has(count)) {
                count--;
                deletions++;
            }
            if (count > 0) seen.add(count);
        }
        return deletions;
    }
}`,
    },
    editorial: {
      approach: 'Greedy frequency reduction using a hash set.',
      algorithm: 'Decrement duplicate frequencies until a free slot >= 0 is found.',
      timeComplexity: 'O(N + K^2) where K <= 26',
      spaceComplexity: 'O(K)',
      content: 'Since alphabet size is 26, the collision resolution loop executes at most 26 times.',
      referenceCode: `def minDeletions(s: str) -> int: ...`,
    },
    tags: ['Strings', 'Greedy', 'Hash Table', 'Counting'],
    testCases: [
      { input: '"aab"', expectedOutput: '0', isHidden: false },
      { input: '"aaabbbcc"', expectedOutput: '2', isHidden: false },
      { input: '"ceabaacb"', expectedOutput: '2', isHidden: true },
      { input: '"abc"', expectedOutput: '2', isHidden: true },
    ],
  },
];

writePack('pack-500-part-d.ts', 'pack500PartDDefs', packD);
