import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack250Batch4Defs: ProblemDef[] = [
  // 1. KMP String Matching (Find the Index of the First Occurrence)
  {
    title: 'Knuth-Morris-Pratt Pattern Matching',
    slug: 'kmp-pattern-matching',
    description: `Given two strings \`needle\` and \`haystack\`, return the index of the first occurrence of \`needle\` in \`haystack\`, or \`-1\` if \`needle\` is not part of \`haystack\`. Implement the Knuth-Morris-Pratt (KMP) linear-time algorithm.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= haystack.length, needle.length <= 10^5\nhaystack and needle consist of only lowercase English characters.`,
    inputFormat: `Line 1: haystack\nLine 2: needle`,
    outputFormat: `An integer representing the 0-based first occurrence index, or -1.`,
    sampleInput: `sadbutsad\nsad`,
    sampleOutput: `0`,
    points: 150,
    hints: [
      'Precompute the Longest Prefix Suffix (LPS / pi) array for the needle pattern.',
      'When characters mismatch, shift the pattern index according to lps[j - 1] rather than resetting to 0.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().split()
    if len(lines) < 2:
        return
    haystack, needle = lines[0], lines[1]
    m, n = len(haystack), len(needle)
    if n == 0:
        print(0)
        return
    if n > m:
        print(-1)
        return
        
    # Compute LPS
    lps = [0] * n
    length = 0
    i = 1
    while i < n:
        if needle[i] == needle[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
                
    # Search
    i = 0 # index for haystack
    j = 0 # index for needle
    res = -1
    while i < m:
        if needle[j] == haystack[i]:
            i += 1
            j += 1
        if j == n:
            res = i - j
            break
        elif i < m and needle[j] != haystack[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
    print(res)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (lines.length < 2) return;
    const haystack = lines[0];
    const needle = lines[1];
    const m = haystack.length, n = needle.length;
    if (n === 0) { console.log(0); return; }
    if (n > m) { console.log(-1); return; }
    
    const lps = new Int32Array(n);
    let len = 0;
    let i = 1;
    while (i < n) {
        if (needle[i] === needle[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) len = lps[len - 1];
            else { lps[i] = 0; i++; }
        }
    }
    
    let hi = 0, ni = 0;
    let res = -1;
    while (hi < m) {
        if (needle[ni] === haystack[hi]) {
            hi++;
            ni++;
        }
        if (ni === n) {
            res = hi - ni;
            break;
        } else if (hi < m && needle[ni] !== haystack[hi]) {
            if (ni !== 0) ni = lps[ni - 1];
            else hi++;
        }
    }
    console.log(res);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
lines = sys.stdin.read().split()
if len(lines) >= 2:
    haystack, needle = lines[0], lines[1]
    m, n = len(haystack), len(needle)
    if n == 0: print(0)
    elif n > m: print(-1)
    else:
        lps = [0] * n
        length = 0
        i = 1
        while i < n:
            if needle[i] == needle[length]:
                length += 1; lps[i] = length; i += 1
            else:
                if length != 0: length = lps[length - 1]
                else: lps[i] = 0; i += 1
        i = j = 0
        res = -1
        while i < m:
            if needle[j] == haystack[i]:
                i += 1; j += 1
            if j == n:
                res = i - j; break
            elif i < m and needle[j] != haystack[i]:
                if j != 0: j = lps[j - 1]
                else: i += 1
        print(res)
`,
      javascript: `const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (lines.length >= 2) {
    const haystack = lines[0], needle = lines[1];
    const m = haystack.length, n = needle.length;
    if (n === 0) console.log(0);
    else if (n > m) console.log(-1);
    else {
        const lps = new Int32Array(n);
        let len = 0, i = 1;
        while (i < n) {
            if (needle[i] === needle[len]) { len++; lps[i] = len; i++; }
            else { if (len !== 0) len = lps[len - 1]; else { lps[i] = 0; i++; } }
        }
        let hi = 0, ni = 0, res = -1;
        while (hi < m) {
            if (needle[ni] === haystack[hi]) { hi++; ni++; }
            if (ni === n) { res = hi - ni; break; }
            else if (hi < m && needle[ni] !== haystack[hi]) {
                if (ni !== 0) ni = lps[ni - 1]; else hi++;
            }
        }
        console.log(res);
    }
}
`,
    },
    editorial: {
      approach: 'Knuth-Morris-Pratt (KMP) Algorithm.',
      algorithm: '1. Construct LPS table of needle in O(|needle|).\n2. Scan haystack character by character with fallback skipping via LPS on mismatch.\n3. Return first occurrence index or -1.',
      timeComplexity: 'O(|haystack| + |needle|)',
      spaceComplexity: 'O(|needle|)',
      content: 'LPS array prevents redundant backtracking in text comparisons, achieving optimal linear runtime.',
      referenceCode: `while i < m:\n    if needle[j] == haystack[i]: i += 1; j += 1\n    if j == n: return i - j\n    elif i < m and needle[j] != haystack[i]: j = lps[j-1] if j else 0; i += (j == 0)`,
    },
    tags: ['String', 'KMP', 'Two Pointers'],
    testCases: [
      { input: `sadbutsad\nsad`, expectedOutput: `0`, isHidden: false, order: 0 },
      { input: `leetcode\nleeto`, expectedOutput: `-1`, isHidden: false, order: 1 },
      { input: `mississippi\nissip`, expectedOutput: `4`, isHidden: true, order: 2 },
      { input: `a\na`, expectedOutput: `0`, isHidden: true, order: 3 },
    ],
  },

  // 2. Word Ladder
  {
    title: 'Word Ladder',
    slug: 'word-ladder',
    description: `A **transformation sequence** from word \`beginWord\` to word \`endWord\` using a dictionary \`wordList\` is a sequence of words \`beginWord -> s1 -> s2 -> ... -> sk\` such that:
- Every adjacent pair of words differs by a single letter.
- Every \`si\` for \`1 <= i <= k\` is in \`wordList\`.
- \`sk == endWord\`.
Given two words, \`beginWord\` and \`endWord\`, and a dictionary \`wordList\`, return the **number of words in the shortest transformation sequence**, or \`0\` if no such sequence exists.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= beginWord.length <= 10\n1 <= wordList.length <= 5000\nAll words have the same length.`,
    inputFormat: `Line 1: beginWord\nLine 2: endWord\nLine 3: Space or comma separated list of words in wordList.`,
    outputFormat: `An integer representing the shortest sequence length, or 0.`,
    sampleInput: `hit\ncog\nhot dot dog lot log cog`,
    sampleOutput: `5`,
    points: 200,
    hints: [
      'Model words as graph nodes where an edge exists between words differing by exactly one character.',
      'Run Breadth-First Search (BFS) starting from beginWord to find shortest path length to endWord.',
    ],
    codeTemplates: {
      python: `import sys
from collections import deque

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 3:
        return
    begin = lines[0].strip()
    end = lines[1].strip()
    words = set(lines[2].replace(',', ' ').split())
    
    if end not in words:
        print(0)
        return
        
    queue = deque([(begin, 1)])
    visited = {begin}
    
    while queue:
        word, dist = queue.popleft()
        if word == end:
            print(dist)
            return
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                nxt = word[:i] + c + word[i+1:]
                if nxt in words and nxt not in visited:
                    visited.add(nxt)
                    queue.append((nxt, dist + 1))
                    
    print(0)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 3) return;
    const begin = lines[0].trim();
    const end = lines[1].trim();
    const words = new Set(lines[2].replace(/,/g, ' ').trim().split(/\\s+/));
    
    if (!words.has(end)) { console.log(0); return; }
    
    const queue = [[begin, 1]];
    const visited = new Set([begin]);
    let head = 0;
    
    while (head < queue.length) {
        const [word, dist] = queue[head++];
        if (word === end) {
            console.log(dist);
            return;
        }
        for (let i = 0; i < word.length; i++) {
            for (let code = 97; code <= 122; code++) {
                const c = String.fromCharCode(code);
                const nxt = word.slice(0, i) + c + word.slice(i + 1);
                if (words.has(nxt) && !visited.has(nxt)) {
                    visited.add(nxt);
                    queue.push([nxt, dist + 1]);
                }
            }
        }
    }
    console.log(0);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
from collections import deque
lines = sys.stdin.read().strip().split('\\n')
if len(lines) >= 3:
    begin = lines[0].strip()
    end = lines[1].strip()
    words = set(lines[2].replace(',', ' ').split())
    if end not in words:
        print(0)
    else:
        queue = deque([(begin, 1)])
        visited = {begin}
        ans = 0
        while queue:
            w, d = queue.popleft()
            if w == end: ans = d; break
            for i in range(len(w)):
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    nxt = w[:i] + c + w[i+1:]
                    if nxt in words and nxt not in visited:
                        visited.add(nxt)
                        queue.append((nxt, d + 1))
        print(ans)
`,
      javascript: `const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 3) {
    const begin = lines[0].trim(), end = lines[1].trim();
    const words = new Set(lines[2].replace(/,/g, ' ').trim().split(/\\s+/));
    if (!words.has(end)) console.log(0);
    else {
        const queue = [[begin, 1]];
        const visited = new Set([begin]);
        let head = 0, ans = 0;
        while (head < queue.length) {
            const [w, d] = queue[head++];
            if (w === end) { ans = d; break; }
            for (let i = 0; i < w.length; i++) {
                for (let code = 97; code <= 122; code++) {
                    const nxt = w.slice(0, i) + String.fromCharCode(code) + w.slice(i + 1);
                    if (words.has(nxt) && !visited.has(nxt)) {
                        visited.add(nxt);
                        queue.push([nxt, d + 1]);
                    }
                }
            }
        }
        console.log(ans);
    }
}
`,
    },
    editorial: {
      approach: 'Breadth-First Search (BFS) on Unweighted Word Graph.',
      algorithm: '1. Insert dictionary words into a hash set for O(1) membership check.\n2. Initialize BFS queue with (beginWord, 1).\n3. Generate 26 * L single-character variants per word.\n4. First time endWord is popped, return its step count.',
      timeComplexity: 'O(N * L * 26)',
      spaceComplexity: 'O(N * L)',
      content: 'BFS guarantees discovering the shortest path length in unweighted state graphs.',
      referenceCode: `queue = deque([(begin, 1)])\nwhile queue:\n    w, d = queue.popleft()\n    if w == end: return d`,
    },
    tags: ['Graph', 'BFS', 'String'],
    testCases: [
      { input: `hit\ncog\nhot dot dog lot log cog`, expectedOutput: `5`, isHidden: false, order: 0 },
      { input: `hit\ncog\nhot dot dog lot log`, expectedOutput: `0`, isHidden: false, order: 1 },
      { input: `a\nc\na b c`, expectedOutput: `2`, isHidden: true, order: 2 },
    ],
  },
];
