import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack100ProblemDefs: ProblemDef[] = [
  // 1. Counting Bits
  {
    title: 'Counting Bits',
    slug: 'counting-bits',
    description: `Given an integer \`n\`, return an array \`ans\` of length \`n + 1\` such that for each \`i\` (\`0 <= i <= n\`), \`ans[i]\` is the **number of 1's** in the binary representation of \`i\`. Output as comma-separated integers.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `0 <= n <= 10^5`,
    inputFormat: `Line 1: An integer \`n\`.`,
    outputFormat: `Comma-separated integers for \`ans\`.`,
    sampleInput: `2`,
    sampleOutput: `0,1,1`,
    points: 100,
    hints: [
      'ans[i] = ans[i >> 1] + (i & 1).',
      'The number of set bits in i equals the set bits in i // 2 plus the last bit.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    n = int(line)
    ans = [0] * (n + 1)
    for i in range(1, n + 1):
        ans[i] = ans[i >> 1] + (i & 1)
    print(','.join(map(str, ans)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const n = parseInt(line, 10);
    const ans = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    console.log(ans.join(','));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    n = int(line)
    ans = [0] * (n + 1)
    for i in range(1, n + 1):
        ans[i] = ans[i >> 1] + (i & 1)
    print(','.join(map(str, ans)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const n = parseInt(line, 10);
    const ans = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    console.log(ans.join(','));
}

solve();
`,
    },
    editorial: {
      approach: '1D Dynamic Programming with Bitshift Recurrence',
      algorithm: 'ans[i] = ans[i >> 1] + (i & 1). Computes population count for all values 0..n in linear time.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      content: 'Bit recurrence eliminates loop per integer.',
      referenceCode: `def count_bits(n):
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp`,
    },
    tags: ['Dynamic Programming', 'Bit Manipulation'],
    testCases: [
      { input: '2', expectedOutput: '0,1,1', isHidden: false },
      { input: '5', expectedOutput: '0,1,1,2,1,2', isHidden: false },
      { input: '0', expectedOutput: '0', isHidden: false },
      { input: '1', expectedOutput: '0,1', isHidden: true },
      { input: '8', expectedOutput: '0,1,1,2,1,2,2,3,1', isHidden: true },
    ],
  },

  // 2. Number of 1 Bits
  {
    title: 'Number of 1 Bits',
    slug: 'number-of-1-bits',
    description: `Write a function that takes the binary representation of a positive integer and returns the number of **set bits** it has (also known as the Hamming weight).`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= n <= 2^31 - 1`,
    inputFormat: `Line 1: An integer \`n\`.`,
    outputFormat: `An integer representing the count of 1 bits.`,
    sampleInput: `11`,
    sampleOutput: `3`,
    points: 100,
    hints: [
      'Brian Kernighan algorithm: n &= (n - 1) clears the lowest set bit in each step.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    n = int(line)
    cnt = 0
    while n:
        n &= (n - 1)
        cnt += 1
    print(cnt)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    let n = parseInt(line, 10);
    let cnt = 0;
    while (n !== 0) {
        n &= (n - 1);
        cnt++;
    }
    console.log(cnt);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    n = int(line)
    cnt = 0
    while n:
        n &= (n - 1)
        cnt += 1
    print(cnt)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    let n = parseInt(line, 10);
    let cnt = 0;
    while (n !== 0) {
        n &= (n - 1);
        cnt++;
    }
    console.log(cnt);
}

solve();
`,
    },
    editorial: {
      approach: "Brian Kernighan's Bit Manipulation Algorithm",
      algorithm: 'Repeatedly clear least significant bit with `n &= (n - 1)` until n becomes 0.',
      timeComplexity: 'O(k) where k is number of set bits (at most 32)',
      spaceComplexity: 'O(1)',
      content: 'Loops only as many times as there are 1-bits.',
      referenceCode: `def hamming_weight(n):
    c = 0
    while n:
        n &= n - 1
        c += 1
    return c`,
    },
    tags: ['Divide and Conquer', 'Bit Manipulation'],
    testCases: [
      { input: '11', expectedOutput: '3', isHidden: false },
      { input: '128', expectedOutput: '1', isHidden: false },
      { input: '2147483645', expectedOutput: '30', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: true },
      { input: '7', expectedOutput: '3', isHidden: true },
    ],
  },

  // 3. Reverse Bits
  {
    title: 'Reverse Bits',
    slug: 'reverse-bits',
    description: `Reverse bits of a given 32 bits unsigned integer. Output the reversed integer as an unsigned decimal integer.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `The input must be a 32-bit unsigned integer.`,
    inputFormat: `Line 1: An integer \`n\`.`,
    outputFormat: `The 32-bit reversed decimal integer.`,
    sampleInput: `43261596`,
    sampleOutput: `964176192`,
    points: 100,
    hints: [
      'Loop 32 times, shifting result left and pulling the least significant bit of n.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    n = int(line)
    res = 0
    for _ in range(32):
        res = (res << 1) | (n & 1)
        n >>= 1
    print(res)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    let n = parseInt(line, 10);
    let res = 0;
    for (let i = 0; i < 32; i++) {
        res = (res * 2) + (n & 1);
        n = Math.floor(n / 2);
    }
    console.log(res);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    n = int(line)
    res = 0
    for _ in range(32):
        res = (res << 1) | (n & 1)
        n >>= 1
    print(res)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    let n = parseInt(line, 10);
    let res = 0;
    for (let i = 0; i < 32; i++) {
        res = (res * 2) + (n & 1);
        n = Math.floor(n / 2);
    }
    console.log(res);
}

solve();
`,
    },
    editorial: {
      approach: 'Bitwise 32-Bit Reversal',
      algorithm: 'Iteratively shift result left and append lowest bit of n across 32 iterations.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      content: 'Fixed 32 iterations constant execution.',
      referenceCode: `def reverse_bits(n):
    res = 0
    for _ in range(32):
        res = (res << 1) | (n & 1)
        n >>= 1
    return res`,
    },
    tags: ['Divide and Conquer', 'Bit Manipulation'],
    testCases: [
      { input: '43261596', expectedOutput: '964176192', isHidden: false },
      { input: '1', expectedOutput: '2147483648', isHidden: false },
      { input: '0', expectedOutput: '0', isHidden: false },
      { input: '4294967295', expectedOutput: '4294967295', isHidden: true },
      { input: '2', expectedOutput: '1073741824', isHidden: true },
    ],
  },

  // 4. Merge Two Sorted Lists
  {
    title: 'Merge Two Sorted Lists',
    slug: 'merge-two-sorted-lists',
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Output the merged list as comma-separated values.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `The number of nodes in both lists is in the range [0, 50].\n-100 <= Node.val <= 100\nBoth list1 and list2 are sorted in non-decreasing order.`,
    inputFormat: `Line 1: Comma-separated integers for \`list1\`.\nLine 2: Comma-separated integers for \`list2\`.`,
    outputFormat: `Comma-separated integers of the merged list.`,
    sampleInput: `1,2,4\n1,3,4`,
    sampleOutput: `1,1,2,3,4,4`,
    points: 100,
    hints: [
      'Maintain two pointers and choose the smaller value at each step.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read()
    lines = raw.splitlines()
    l1_str = lines[0].strip() if len(lines) > 0 else ""
    l2_str = lines[1].strip() if len(lines) > 1 else ""
    l1 = [int(x.strip()) for x in l1_str.split(',') if x.strip()]
    l2 = [int(x.strip()) for x in l2_str.split(',') if x.strip()]
    
    merged = []
    i, j = 0, 0
    while i < len(l1) and j < len(l2):
        if l1[i] <= l2[j]:
            merged.append(l1[i])
            i += 1
        else:
            merged.append(l2[j])
            j += 1
    while i < len(l1):
        merged.append(l1[i])
        i += 1
    while j < len(l2):
        merged.append(l2[j])
        j += 1
    print(','.join(map(str, merged)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8');
    const lines = raw.split(/\\r?\\n/);
    const l1Str = lines.length > 0 ? lines[0].trim() : '';
    const l2Str = lines.length > 1 ? lines[1].trim() : '';
    const l1 = l1Str ? l1Str.split(',').map(x => parseInt(x.trim(), 10)) : [];
    const l2 = l2Str ? l2Str.split(',').map(x => parseInt(x.trim(), 10)) : [];

    const merged = [];
    let i = 0, j = 0;
    while (i < l1.length && j < l2.length) {
        if (l1[i] <= l2[j]) merged.push(l1[i++]);
        else merged.push(l2[j++]);
    }
    while (i < l1.length) merged.push(l1[i++]);
    while (j < l2.length) merged.push(l2[j++]);
    console.log(merged.join(','));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    raw = sys.stdin.read()
    lines = raw.splitlines()
    l1_str = lines[0].strip() if len(lines) > 0 else ""
    l2_str = lines[1].strip() if len(lines) > 1 else ""
    l1 = [int(x.strip()) for x in l1_str.split(',') if x.strip()]
    l2 = [int(x.strip()) for x in l2_str.split(',') if x.strip()]
    
    merged = []
    i, j = 0, 0
    while i < len(l1) and j < len(l2):
        if l1[i] <= l2[j]:
            merged.append(l1[i])
            i += 1
        else:
            merged.append(l2[j])
            j += 1
    while i < len(l1):
        merged.append(l1[i])
        i += 1
    while j < len(l2):
        merged.append(l2[j])
        j += 1
    print(','.join(map(str, merged)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8');
    const lines = raw.split(/\\r?\\n/);
    const l1Str = lines.length > 0 ? lines[0].trim() : '';
    const l2Str = lines.length > 1 ? lines[1].trim() : '';
    const l1 = l1Str ? l1Str.split(',').map(x => parseInt(x.trim(), 10)) : [];
    const l2 = l2Str ? l2Str.split(',').map(x => parseInt(x.trim(), 10)) : [];

    const merged = [];
    let i = 0, j = 0;
    while (i < l1.length && j < l2.length) {
        if (l1[i] <= l2[j]) merged.push(l1[i++]);
        else merged.push(l2[j++]);
    }
    while (i < l1.length) merged.push(l1[i++]);
    while (j < l2.length) merged.push(l2[j++]);
    console.log(merged.join(','));
}

solve();
`,
    },
    editorial: {
      approach: 'Two-Pointer Linear Merge',
      algorithm: 'Compare heads of both sorted sequences, appending smaller node until exhaustion.',
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(1) auxiliary',
      content: 'Standard mergesort combining step.',
      referenceCode: `def merge_two_lists(l1, l2):
    dummy = cur = ListNode(0)
    while l1 and l2:
        if l1.val <= l2.val: cur.next, l1 = l1, l1.next
        else: cur.next, l2 = l2, l2.next
        cur = cur.next
    cur.next = l1 or l2
    return dummy.next`,
    },
    tags: ['Linked List', 'Recursion'],
    testCases: [
      { input: '1,2,4\n1,3,4', expectedOutput: '1,1,2,3,4,4', isHidden: false },
      { input: '\n', expectedOutput: '', isHidden: false },
      { input: '\n0', expectedOutput: '0', isHidden: false },
      { input: '5\n1,2,3', expectedOutput: '1,2,3,5', isHidden: true },
      { input: '2,4,6\n1,3,5,7', expectedOutput: '1,2,3,4,5,6,7', isHidden: true },
    ],
  },

  // 5. Longest Common Subsequence
  {
    title: 'Longest Common Subsequence',
    slug: 'longest-common-subsequence',
    description: `Given two strings \`text1\` and \`text2\`, return the length of their longest common subsequence. If there is no common subsequence, return \`0\`.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= text1.length, text2.length <= 1000\ntext1 and text2 consist of only lowercase English characters.`,
    inputFormat: `Line 1: String \`text1\`.\nLine 2: String \`text2\`.`,
    outputFormat: `An integer representing the length of the longest common subsequence.`,
    sampleInput: `abcde\nace`,
    sampleOutput: `3`,
    points: 150,
    hints: [
      'Use 2D dynamic programming dp[i][j].',
      'If text1[i] == text2[j], dp[i][j] = 1 + dp[i-1][j-1].',
      'Else dp[i][j] = max(dp[i-1][j], dp[i][j-1]).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    t1 = lines[0].strip()
    t2 = lines[1].strip()
    m, n = len(t1), len(t2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if t1[i - 1] == t2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    print(dp[m][n])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const t1 = lines[0].trim();
    const t2 = lines[1].trim();
    const m = t1.length, n = t2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (t1[i - 1] === t2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    console.log(dp[m][n]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    t1 = lines[0].strip()
    t2 = lines[1].strip()
    m, n = len(t1), len(t2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if t1[i - 1] == t2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    print(dp[m][n])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const t1 = lines[0].trim();
    const t2 = lines[1].trim();
    const m = t1.length, n = t2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (t1[i - 1] === t2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    console.log(dp[m][n]);
}

solve();
`,
    },
    editorial: {
      approach: '2D Dynamic Programming Sequence Grid',
      algorithm: 'Tabulate match transitions: matching character adds 1 to diagonal; non-matching takes maximum of horizontal and vertical neighbors.',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n) or O(min(m, n))',
      content: 'Canonical sequence DP paradigm.',
      referenceCode: `def longest_common_subsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]: dp[i][j] = dp[i-1][j-1] + 1
            else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`,
    },
    tags: ['String', 'Dynamic Programming'],
    testCases: [
      { input: 'abcde\nace', expectedOutput: '3', isHidden: false },
      { input: 'abc\nabc', expectedOutput: '3', isHidden: false },
      { input: 'abc\ndef', expectedOutput: '0', isHidden: false },
      { input: 'bl\nyby', expectedOutput: '1', isHidden: true },
      { input: 'pmjghexybyrgzrcrmbtx\nwapqbejubmrynqymglv', expectedOutput: '5', isHidden: true },
    ],
  },

  // 6. Longest Increasing Subsequence
  {
    title: 'Longest Increasing Subsequence',
    slug: 'longest-increasing-subsequence',
    description: `Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 2500\n-10^4 <= nums[i] <= 10^4`,
    inputFormat: `Line 1: Comma-separated integers for \`nums\`.`,
    outputFormat: `An integer representing the length of the LIS.`,
    sampleInput: `10,9,2,5,3,7,101,18`,
    sampleOutput: `4`,
    points: 150,
    hints: [
      'Patience sorting with binary search achieves O(n log n).',
      'Maintain an array tails where tails[i] is the smallest tail of all increasing subsequences of length i + 1.',
    ],
    codeTemplates: {
      python: `import sys
import bisect

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    print(len(tails))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    const tails = [];
    for (const x of nums) {
        let l = 0, r = tails.length;
        while (l < r) {
            const m = Math.floor((l + r) / 2);
            if (tails[m] < x) l = m + 1;
            else r = m;
        }
        if (l === tails.length) tails.push(x);
        else tails[l] = x;
    }
    console.log(tails.length);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
import bisect

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    print(len(tails))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    const tails = [];
    for (const x of nums) {
        let l = 0, r = tails.length;
        while (l < r) {
            const m = Math.floor((l + r) / 2);
            if (tails[m] < x) l = m + 1;
            else r = m;
        }
        if (l === tails.length) tails.push(x);
        else tails[l] = x;
    }
    console.log(tails.length);
}

solve();
`,
    },
    editorial: {
      approach: 'Patience Sorting Binary Search (O(N log N))',
      algorithm: 'Maintain `tails` array where `tails[i]` stores smallest tail value of all increasing subsequences of length `i+1`. Use binary search to update or extend.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      content: 'Binary search updates patience piles in sub-quadratic time.',
      referenceCode: `import bisect
def length_of_lis(nums):
    tails = []
    for x in nums:
        i = bisect.bisect_left(tails, x)
        if i == len(tails): tails.append(x)
        else: tails[i] = x
    return len(tails)`,
    },
    tags: ['Array', 'Binary Search', 'Dynamic Programming'],
    testCases: [
      { input: '10,9,2,5,3,7,101,18', expectedOutput: '4', isHidden: false },
      { input: '0,1,0,3,2,3', expectedOutput: '4', isHidden: false },
      { input: '7,7,7,7,7,7,7', expectedOutput: '1', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: true },
      { input: '1,3,6,7,9,4,10,5,6', expectedOutput: '6', isHidden: true },
    ],
  },

  // 7. Unique Paths
  {
    title: 'Unique Paths',
    slug: 'unique-paths',
    description: `There is a robot on an \`m x n\` grid. The robot is initially located at the **top-left corner** (i.e., \`grid[0][0]\`). The robot tries to move to the **bottom-right corner** (i.e., \`grid[m - 1][n - 1]\`). The robot can only move either down or right at any point in time.

Given the two integers \`m\` and \`n\`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= m, n <= 100`,
    inputFormat: `Line 1: Comma-separated integers \`m,n\`.`,
    outputFormat: `An integer representing the number of unique paths.`,
    sampleInput: `3,7`,
    sampleOutput: `28`,
    points: 150,
    hints: [
      'dp[i][j] = dp[i - 1][j] + dp[i][j - 1].',
      'The top row and left column all have 1 unique path.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    m, n = [int(x.strip()) for x in line.split(',') if x.strip()]
    row = [1] * n
    for _ in range(m - 1):
        new_row = [1] * n
        for j in range(1, n):
            new_row[j] = new_row[j - 1] + row[j]
        row = new_row
    print(row[-1])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const [m, n] = line.split(',').map(x => parseInt(x.trim(), 10));
    let row = new Array(n).fill(1);
    for (let i = 0; i < m - 1; i++) {
        const newRow = new Array(n).fill(1);
        for (let j = 1; j < n; j++) {
            newRow[j] = newRow[j - 1] + row[j];
        }
        row = newRow;
    }
    console.log(row[n - 1]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    m, n = [int(x.strip()) for x in line.split(',') if x.strip()]
    row = [1] * n
    for _ in range(m - 1):
        new_row = [1] * n
        for j in range(1, n):
            new_row[j] = new_row[j - 1] + row[j]
        row = new_row
    print(row[-1])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const [m, n] = line.split(',').map(x => parseInt(x.trim(), 10));
    let row = new Array(n).fill(1);
    for (let i = 0; i < m - 1; i++) {
        const newRow = new Array(n).fill(1);
        for (let j = 1; j < n; j++) {
            newRow[j] = newRow[j - 1] + row[j];
        }
        row = newRow;
    }
    console.log(row[n - 1]);
}

solve();
`,
    },
    editorial: {
      approach: 'Space-Optimized 1D Rolling DP Grid Paths',
      algorithm: 'Transitions compute paths reaching (i, j) by summing paths from top and left. Rolling row array achieves O(n) space.',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(n)',
      content: 'Combinatorial DP reduces 2D table into a single 1D rolling array.',
      referenceCode: `def unique_paths(m, n):
    row = [1] * n
    for _ in range(m - 1):
        for j in range(1, n):
            row[j] += row[j - 1]
    return row[-1]`,
    },
    tags: ['Math', 'Dynamic Programming', 'Combinatorics'],
    testCases: [
      { input: '3,7', expectedOutput: '28', isHidden: false },
      { input: '3,2', expectedOutput: '3', isHidden: false },
      { input: '1,1', expectedOutput: '1', isHidden: false },
      { input: '10,10', expectedOutput: '48620', isHidden: true },
      { input: '1,10', expectedOutput: '1', isHidden: true },
    ],
  },

  // 8. Jump Game
  {
    title: 'Jump Game',
    slug: 'jump-game',
    description: `You are given an integer array \`nums\`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.

Return \`true\` if you can reach the last index, or \`false\` otherwise.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 10^4\n0 <= nums[i] <= 10^5`,
    inputFormat: `Line 1: Comma-separated integers for \`nums\`.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `2,3,1,1,4`,
    sampleOutput: `true`,
    points: 150,
    hints: [
      'Maintain the furthest reachable index so far.',
      'If current index > max_reach, you cannot move forward.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:
            print("false")
            return
        max_reach = max(max_reach, i + jump)
        if max_reach >= len(nums) - 1:
            print("true")
            return
    print("true")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) {
            console.log("false");
            return;
        }
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= nums.length - 1) {
            console.log("true");
            return;
        }
    }
    console.log("true");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:
            print("false")
            return
        max_reach = max(max_reach, i + jump)
        if max_reach >= len(nums) - 1:
            print("true")
            return
    print("true")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) {
            console.log("false");
            return;
        }
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= nums.length - 1) {
            console.log("true");
            return;
        }
    }
    console.log("true");
}

solve();
`,
    },
    editorial: {
      approach: 'Greedy Maximum Horizon Reach Tracking',
      algorithm: 'Iterate indices updating furthest reachable boundary. If index exceeds reach, termination is impossible.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'Single greedy traversal avoids recursive branching.',
      referenceCode: `def can_jump(nums):
    m = 0
    for i, x in enumerate(nums):
        if i > m: return False
        m = max(m, i + x)
    return True`,
    },
    tags: ['Array', 'Dynamic Programming', 'Greedy'],
    testCases: [
      { input: '2,3,1,1,4', expectedOutput: 'true', isHidden: false },
      { input: '3,2,1,0,4', expectedOutput: 'false', isHidden: false },
      { input: '0', expectedOutput: 'true', isHidden: false },
      { input: '1,0,1,0', expectedOutput: 'false', isHidden: true },
      { input: '2,0,0', expectedOutput: 'true', isHidden: true },
    ],
  },

  // 9. Jump Game II
  {
    title: 'Jump Game II',
    slug: 'jump-game-ii',
    description: `You are given a **0-indexed** array of integers \`nums\` of length \`n\`. You are initially positioned at \`nums[0]\`.

Each element \`nums[i]\` represents the maximum length of a forward jump from index \`i\`. In other words, if you are at \`nums[i]\`, you can jump to any \`nums[i + j]\` where:
- \`0 <= j <= nums[i]\` and
- \`i + j < n\`

Return the minimum number of jumps to reach \`nums[n - 1]\`. The test cases are generated such that you can reach \`nums[n - 1]\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 10^4\n0 <= nums[i] <= 1000\nIt is guaranteed that you can reach the last index.`,
    inputFormat: `Line 1: Comma-separated integers for \`nums\`.`,
    outputFormat: `An integer representing minimum jumps.`,
    sampleInput: `2,3,1,1,4`,
    sampleOutput: `2`,
    points: 150,
    hints: [
      'Think of this as BFS levels on intervals [cur_l, cur_r].',
      'When reaching the current jump boundary, increment jump count and set new boundary to max_reach.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    if len(nums) <= 1:
        print(0)
        return
    jumps = 0
    cur_end = 0
    farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end:
            jumps += 1
            cur_end = farthest
            if cur_end >= len(nums) - 1:
                break
    print(jumps)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    if (nums.length <= 1) { console.log(0); return; }
    let jumps = 0, curEnd = 0, farthest = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === curEnd) {
            jumps++;
            curEnd = farthest;
            if (curEnd >= nums.length - 1) break;
        }
    }
    console.log(jumps);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    if len(nums) <= 1:
        print(0)
        return
    jumps = 0
    cur_end = 0
    farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end:
            jumps += 1
            cur_end = farthest
            if cur_end >= len(nums) - 1:
                break
    print(jumps)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    if (nums.length <= 1) { console.log(0); return; }
    let jumps = 0, curEnd = 0, farthest = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === curEnd) {
            jumps++;
            curEnd = farthest;
            if (curEnd >= nums.length - 1) break;
        }
    }
    console.log(jumps);
}

solve();
`,
    },
    editorial: {
      approach: 'Greedy Implicit BFS Window Progression',
      algorithm: 'Advance search window interval. When current window boundary is traversed, trigger a jump step and expand window to farthest observed point.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'BFS level scanning without auxiliary queue data structures.',
      referenceCode: `def jump(nums):
    jumps, cur_end, farthest = 0, 0, 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end:
            jumps += 1
            cur_end = farthest
    return jumps`,
    },
    tags: ['Array', 'Dynamic Programming', 'Greedy'],
    testCases: [
      { input: '2,3,1,1,4', expectedOutput: '2', isHidden: false },
      { input: '2,3,0,1,4', expectedOutput: '2', isHidden: false },
      { input: '1', expectedOutput: '0', isHidden: false },
      { input: '1,2,3', expectedOutput: '2', isHidden: true },
      { input: '1,1,1,1', expectedOutput: '3', isHidden: true },
    ],
  },

  // 10. Maximum Product Subarray
  {
    title: 'Maximum Product Subarray',
    slug: 'maximum-product-subarray',
    description: `Given an integer array \`nums\`, find a contiguous non-empty subarray within the array that has the largest product, and return the product.

The test cases are generated so that the answer will fit in a **32-bit** integer.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 2 * 10^4\n-10 <= nums[i] <= 10\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.`,
    inputFormat: `Line 1: Comma-separated integers for \`nums\`.`,
    outputFormat: `An integer representing the maximum subarray product.`,
    sampleInput: `2,3,-2,4`,
    sampleOutput: `6`,
    points: 150,
    hints: [
      'Maintain both the running max product and running min product because multiplying by a negative number can turn a minimum into a maximum.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    res = nums[0]
    cur_min, cur_max = 1, 1
    for n in nums:
        vals = (n, n * cur_max, n * cur_min)
        cur_max = max(vals)
        cur_min = min(vals)
        res = max(res, cur_max)
    print(res)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    let res = nums[0];
    let curMin = 1, curMax = 1;
    for (const n of nums) {
        const v1 = n, v2 = n * curMax, v3 = n * curMin;
        curMax = Math.max(v1, v2, v3);
        curMin = Math.min(v1, v2, v3);
        if (curMax > res) res = curMax;
    }
    console.log(res);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    res = nums[0]
    cur_min, cur_max = 1, 1
    for n in nums:
        vals = (n, n * cur_max, n * cur_min)
        cur_max = max(vals)
        cur_min = min(vals)
        res = max(res, cur_max)
    print(res)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    let res = nums[0];
    let curMin = 1, curMax = 1;
    for (const n of nums) {
        const v1 = n, v2 = n * curMax, v3 = n * curMin;
        curMax = Math.max(v1, v2, v3);
        curMin = Math.min(v1, v2, v3);
        if (curMax > res) res = curMax;
    }
    console.log(res);
}

solve();
`,
    },
    editorial: {
      approach: 'Dual Max/Min Kadane State Tracking',
      algorithm: 'Maintain current maximum and minimum product scalars. When encountering negative elements, minimum flips to maximum.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'Dynamic dual-state scalar recurrence.',
      referenceCode: `def max_product(nums):
    res = nums[0]
    c_max, c_min = 1, 1
    for x in nums:
        c_max, c_min = max(x, x * c_max, x * c_min), min(x, x * c_max, x * c_min)
        res = max(res, c_max)
    return res`,
    },
    tags: ['Array', 'Dynamic Programming'],
    testCases: [
      { input: '2,3,-2,4', expectedOutput: '6', isHidden: false },
      { input: '-2,0,-1', expectedOutput: '0', isHidden: false },
      { input: '-2,3,-4', expectedOutput: '24', isHidden: false },
      { input: '-2', expectedOutput: '-2', isHidden: true },
      { input: '0,2', expectedOutput: '2', isHidden: true },
    ],
  },

  // 11. Word Break
  {
    title: 'Word Break',
    slug: 'word-break',
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= s.length <= 300\n1 <= wordDict.length <= 1000\n1 <= wordDict[i].length <= 20\ns and wordDict[i] consist of only lowercase English letters.\nAll the strings of wordDict are unique.`,
    inputFormat: `Line 1: String \`s\`.\nLine 2: Comma-separated words in \`wordDict\`.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `leetcode\nleet,code`,
    sampleOutput: `true`,
    points: 150,
    hints: [
      'Define dp[i] = true if substring s[0:i] can be segmented.',
      'dp[i] = any(dp[j] and s[j:i] in word_set for j in range(i)).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    s = lines[0].strip()
    word_dict = set(w.strip() for w in lines[1].split(',') if w.strip())
    
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_dict:
                dp[i] = True
                break
    print("true" if dp[n] else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const s = lines[0].trim();
    const wordDict = new Set(lines[1].split(',').map(w => w.trim()).filter(Boolean));
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordDict.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    console.log(dp[n] ? "true" : "false");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    s = lines[0].strip()
    word_dict = set(w.strip() for w in lines[1].split(',') if w.strip())
    
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_dict:
                dp[i] = True
                break
    print("true" if dp[n] else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const s = lines[0].trim();
    const wordDict = new Set(lines[1].split(',').map(w => w.trim()).filter(Boolean));
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordDict.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    console.log(dp[n] ? "true" : "false");
}

solve();
`,
    },
    editorial: {
      approach: '1D Prefix Dynamic Programming Substring Partition',
      algorithm: 'Maintain boolean prefix array where `dp[i]` indicates feasibility of prefix `s[0..i]`. Transition across valid dictionary suffix segments.',
      timeComplexity: 'O(n^2 * k) where k is max word length',
      spaceComplexity: 'O(n + total_dict_length)',
      content: 'Polynomial dynamic programming partition.',
      referenceCode: `def word_break(s, word_dict):
    words = set(word_dict)
    dp = [True] + [False] * len(s)
    for i in range(1, len(s) + 1):
        dp[i] = any(dp[j] and s[j:i] in words for j in range(i))
    return dp[len(s)]`,
    },
    tags: ['Array', 'Hash Table', 'String', 'Dynamic Programming', 'Trie'],
    testCases: [
      { input: 'leetcode\nleet,code', expectedOutput: 'true', isHidden: false },
      { input: 'applepenapple\napple,pen', expectedOutput: 'true', isHidden: false },
      { input: 'catsandog\ncats,dog,sand,and,cat', expectedOutput: 'false', isHidden: false },
      { input: 'a\na', expectedOutput: 'true', isHidden: true },
      { input: 'a\nb', expectedOutput: 'false', isHidden: true },
    ],
  },

  // 12. Non-overlapping Intervals
  {
    title: 'Non-overlapping Intervals',
    slug: 'non-overlapping-intervals',
    description: `Given an array of intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

Input is formatted as lines of comma-separated start,end pairs. Output the minimum removals count.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= intervals.length <= 10^5\nintervals[i].length == 2\n-5 * 10^4 <= start_i < end_i <= 5 * 10^4`,
    inputFormat: `Lines of comma-separated start,end pairs (e.g. 1,2\\n2,3\\n3,4\\n1,3).`,
    outputFormat: `An integer representing minimum removals.`,
    sampleInput: `1,2\n2,3\n3,4\n1,3`,
    sampleOutput: `1`,
    points: 150,
    hints: [
      'Sort intervals by their end times.',
      'Greedily keep the interval that finishes earliest to leave maximum room for subsequent intervals.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    intervals = []
    for l in lines:
        parts = l.strip().split(',')
        if len(parts) >= 2:
            intervals.append([int(parts[0].strip()), int(parts[1].strip())])
    if not intervals:
        print(0)
        return
    intervals.sort(key=lambda x: x[1])
    removals = 0
    prev_end = float('-inf')
    for start, end in intervals:
        if start >= prev_end:
            prev_end = end
        else:
            removals += 1
    print(removals)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    const intervals = [];
    for (const l of lines) {
        const parts = l.trim().split(',');
        if (parts.length >= 2) {
            intervals.push([parseInt(parts[0].trim(), 10), parseInt(parts[1].trim(), 10)]);
        }
    }
    if (intervals.length === 0) { console.log(0); return; }
    intervals.sort((a, b) => a[1] - b[1]);
    let removals = 0;
    let prevEnd = -Infinity;
    for (const [start, end] of intervals) {
        if (start >= prevEnd) {
            prevEnd = end;
        } else {
            removals++;
        }
    }
    console.log(removals);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    intervals = []
    for l in lines:
        parts = l.strip().split(',')
        if len(parts) >= 2:
            intervals.append([int(parts[0].strip()), int(parts[1].strip())])
    if not intervals:
        print(0)
        return
    intervals.sort(key=lambda x: x[1])
    removals = 0
    prev_end = float('-inf')
    for start, end in intervals:
        if start >= prev_end:
            prev_end = end
        else:
            removals += 1
    print(removals)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    const intervals = [];
    for (const l of lines) {
        const parts = l.trim().split(',');
        if (parts.length >= 2) {
            intervals.push([parseInt(parts[0].trim(), 10), parseInt(parts[1].trim(), 10)]);
        }
    }
    if (intervals.length === 0) { console.log(0); return; }
    intervals.sort((a, b) => a[1] - b[1]);
    let removals = 0;
    let prevEnd = -Infinity;
    for (const [start, end] of intervals) {
        if (start >= prevEnd) {
            prevEnd = end;
        } else {
            removals++;
        }
    }
    console.log(removals);
}

solve();
`,
    },
    editorial: {
      approach: 'Earliest Deadline First (Greedy Interval Scheduling)',
      algorithm: 'Sort by finish timestamp. Retain non-overlapping intervals with earliest end times, removing all conflicting intersections.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1) auxiliary',
      content: 'Classic interval scheduling greedily maximizes non-overlapping set cardinality.',
      referenceCode: `def erase_overlap_intervals(intervals):
    intervals.sort(key=lambda x: x[1])
    ans, last = 0, float('-inf')
    for s, e in intervals:
        if s >= last: last = e
        else: ans += 1
    return ans`,
    },
    tags: ['Array', 'Dynamic Programming', 'Greedy', 'Sorting'],
    testCases: [
      { input: '1,2\n2,3\n3,4\n1,3', expectedOutput: '1', isHidden: false },
      { input: '1,2\n1,2\n1,2', expectedOutput: '2', isHidden: false },
      { input: '1,2\n2,3', expectedOutput: '0', isHidden: false },
      { input: '1,100\n11,22\n1,11\n2,12', expectedOutput: '2', isHidden: true },
      { input: '0,2\n1,3\n2,4\n3,5\n4,6', expectedOutput: '2', isHidden: true },
    ],
  },
];

