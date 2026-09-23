import { Difficulty } from '@prisma/client';

export interface TestCaseDef {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  order?: number;
}

export interface EditorialDef {
  approach: string;
  algorithm: string;
  timeComplexity: string;
  spaceComplexity: string;
  content: string;
  referenceCode: string;
}

export interface ProblemDef {
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  timeLimit: number;
  memoryLimit: number;
  constraints: string;
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  points: number;
  hints: string[];
  codeTemplates: Record<string, string>;
  referenceSolutions: Record<string, string>;
  editorial: EditorialDef;
  tags: string[];
  testCases: TestCaseDef[];
}

export const pack50ProblemDefs: ProblemDef[] = [
  // 1. Palindrome Number
  {
    title: 'Palindrome Number',
    slug: 'palindrome-number',
    description: `Given an integer \`x\`, return \`true\` if \`x\` is a palindrome, and \`false\` otherwise.

An integer is a **palindrome** when it reads the same backward as forward. For example, \`121\` is a palindrome while \`123\` is not. Negative numbers are not palindromes.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `-2^31 <= x <= 2^31 - 1`,
    inputFormat: `Line 1: An integer \`x\`.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `121`,
    sampleOutput: `true`,
    points: 100,
    hints: [
      'Negative numbers are never palindromes because the negative sign is on the left.',
      'You can reverse the second half of the number and compare it to the first half.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    x = int(line)
    if x < 0:
        print("false")
        return
    s = str(x)
    print("true" if s == s[::-1] else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const x = parseInt(line, 10);
    if (x < 0) { console.log("false"); return; }
    const s = x.toString();
    console.log(s === s.split('').reverse().join('') ? "true" : "false");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    x = int(line)
    if x < 0:
        print("false")
        return
    s = str(x)
    print("true" if s == s[::-1] else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const x = parseInt(line, 10);
    if (x < 0) { console.log("false"); return; }
    const s = x.toString();
    console.log(s === s.split('').reverse().join('') ? "true" : "false");
}

solve();
`,
    },
    editorial: {
      approach: 'String Conversion / Reversal or Mathematical Half-Reversal',
      algorithm: 'Negative numbers are not palindromes. For non-negative integers, verify if the string representation is equal to its reverse.',
      timeComplexity: 'O(log10(x))',
      spaceComplexity: 'O(1)',
      content: 'Number of digits is log10(x). Traversal takes linear time with respect to the number of digits.',
      referenceCode: `def is_palindrome(x):
    if x < 0: return False
    s = str(x)
    return s == s[::-1]`,
    },
    tags: ['Math', 'String'],
    testCases: [
      { input: '121', expectedOutput: 'true', isHidden: false },
      { input: '-121', expectedOutput: 'false', isHidden: false },
      { input: '10', expectedOutput: 'false', isHidden: false },
      { input: '0', expectedOutput: 'true', isHidden: true },
      { input: '123321', expectedOutput: 'true', isHidden: true },
    ],
  },

  // 2. Single Number
  {
    title: 'Single Number',
    slug: 'single-number',
    description: `Given a non-empty array of integers \`nums\`, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 3 * 10^4\n-3 * 10^4 <= nums[i] <= 3 * 10^4\nEvery element in nums appears twice except for one element.`,
    inputFormat: `Line 1: Comma-separated integers for \`nums\`.`,
    outputFormat: `The single integer.`,
    sampleInput: `4,1,2,1,2`,
    sampleOutput: `4`,
    points: 100,
    hints: [
      'Think about the XOR (^) bitwise operation.',
      'a ^ a = 0 and a ^ 0 = a. XOR is commutative and associative.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    res = 0
    for n in nums:
        res ^= n
    print(res)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    let res = 0;
    for (const n of nums) res ^= n;
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
    res = 0
    for n in nums:
        res ^= n
    print(res)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    let res = 0;
    for (const n of nums) res ^= n;
    console.log(res);
}

solve();
`,
    },
    editorial: {
      approach: 'Bitwise XOR Accumulation',
      algorithm: 'XORing a number with itself yields 0. XORing all elements cancels out duplicate pairs, leaving only the unique single number.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'A single pass XOR reduces space complexity to O(1) without requiring hash table memory.',
      referenceCode: `def single_number(nums):
    res = 0
    for x in nums:
        res ^= x
    return res`,
    },
    tags: ['Array', 'Bit Manipulation'],
    testCases: [
      { input: '2,2,1', expectedOutput: '1', isHidden: false },
      { input: '4,1,2,1,2', expectedOutput: '4', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: false },
      { input: '-1,-1,-2', expectedOutput: '-2', isHidden: true },
      { input: '100,200,300,100,300', expectedOutput: '200', isHidden: true },
    ],
  },

  // 3. Power of Two
  {
    title: 'Power of Two',
    slug: 'power-of-two',
    description: `Given an integer \`n\`, return \`true\` if it is a power of two. Otherwise, return \`false\`.

An integer \`n\` is a power of two if there exists an integer \`x\` such that \`n == 2^x\`.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `-2^31 <= n <= 2^31 - 1`,
    inputFormat: `Line 1: An integer \`n\`.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `16`,
    sampleOutput: `true`,
    points: 100,
    hints: [
      'A power of two in binary has exactly one bit set.',
      'Check if n > 0 and (n & (n - 1)) == 0.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    n = int(line)
    if n > 0 and (n & (n - 1)) == 0:
        print("true")
    else:
        print("false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const n = parseInt(line, 10);
    if (n > 0 && (n & (n - 1)) === 0) {
        console.log("true");
    } else {
        console.log("false");
    }
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
    if n > 0 and (n & (n - 1)) == 0:
        print("true")
    else:
        print("false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const n = parseInt(line, 10);
    if (n > 0 && (n & (n - 1)) === 0) {
        console.log("true");
    } else {
        console.log("false");
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Bitwise Clear Lowest Set Bit',
      algorithm: 'Positive powers of two possess exactly one binary 1. Subtracting 1 flips the bit and all subsequent zeroes. Hence n & (n - 1) == 0.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      content: 'Bitwise check runs in constant time without iteration or floating-point logarithms.',
      referenceCode: `def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0`,
    },
    tags: ['Math', 'Bit Manipulation'],
    testCases: [
      { input: '1', expectedOutput: 'true', isHidden: false },
      { input: '16', expectedOutput: 'true', isHidden: false },
      { input: '3', expectedOutput: 'false', isHidden: false },
      { input: '0', expectedOutput: 'false', isHidden: true },
      { input: '-16', expectedOutput: 'false', isHidden: true },
      { input: '1073741824', expectedOutput: 'true', isHidden: true },
    ],
  },

  // 4. Missing Number
  {
    title: 'Missing Number',
    slug: 'missing-number',
    description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return the only number in the range that is missing from the array.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `n == nums.length\n1 <= n <= 10^4\n0 <= nums[i] <= n\nAll numbers of nums are unique.`,
    inputFormat: `Line 1: Comma-separated integers for \`nums\`.`,
    outputFormat: `An integer representing the missing number.`,
    sampleInput: `3,0,1`,
    sampleOutput: `2`,
    points: 100,
    hints: [
      'The sum of numbers from 0 to n is n * (n + 1) // 2.',
      'Subtract the sum of the array from the expected arithmetic sum.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    n = len(nums)
    expected = n * (n + 1) // 2
    actual = sum(nums)
    print(expected - actual)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    const n = nums.length;
    const expected = (n * (n + 1)) / 2;
    const actual = nums.reduce((a, b) => a + b, 0);
    console.log(expected - actual);
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
    n = len(nums)
    expected = n * (n + 1) // 2
    actual = sum(nums)
    print(expected - actual)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    const n = nums.length;
    const expected = (n * (n + 1)) / 2;
    const actual = nums.reduce((a, b) => a + b, 0);
    console.log(expected - actual);
}

solve();
`,
    },
    editorial: {
      approach: 'Gaussian Arithmetic Series Summation',
      algorithm: 'Calculate expected sum n * (n + 1) / 2 and subtract the array sum to obtain the missing value in O(n) time and O(1) space.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'Gaussian summation avoids allocating a hash set or sorting the array.',
      referenceCode: `def missing_number(nums):
    n = len(nums)
    return n * (n + 1) // 2 - sum(nums)`,
    },
    tags: ['Array', 'Math', 'Bit Manipulation'],
    testCases: [
      { input: '3,0,1', expectedOutput: '2', isHidden: false },
      { input: '0,1', expectedOutput: '2', isHidden: false },
      { input: '9,6,4,2,3,5,7,0,1', expectedOutput: '8', isHidden: false },
      { input: '0', expectedOutput: '1', isHidden: true },
      { input: '1', expectedOutput: '0', isHidden: true },
    ],
  },

  // 5. Majority Element
  {
    title: 'Majority Element',
    slug: 'majority-element',
    description: `Given an array \`nums\` of size \`n\`, return the majority element.

The **majority element** is the element that appears more than \`floor(n / 2)\` times. You may assume that the majority element always exists in the array.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `n == nums.length\n1 <= n <= 5 * 10^4\n-10^9 <= nums[i] <= 10^9`,
    inputFormat: `Line 1: Comma-separated integers for \`nums\`.`,
    outputFormat: `An integer representing the majority element.`,
    sampleInput: `3,2,3`,
    sampleOutput: `3`,
    points: 100,
    hints: [
      'Boyer-Moore Voting Algorithm solves this in O(n) time and O(1) space.',
      'Maintain a candidate and a count counter.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    candidate = None
    count = 0
    for num in nums:
        if count == 0:
            candidate = num
        count += (1 if num == candidate else -1)
    print(candidate)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    let candidate = null;
    let count = 0;
    for (const num of nums) {
        if (count === 0) candidate = num;
        count += (num === candidate ? 1 : -1);
    }
    console.log(candidate);
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
    candidate = None
    count = 0
    for num in nums:
        if count == 0:
            candidate = num
        count += (1 if num == candidate else -1)
    print(candidate)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    let candidate = null;
    let count = 0;
    for (const num of nums) {
        if (count === 0) candidate = num;
        count += (num === candidate ? 1 : -1);
    }
    console.log(candidate);
}

solve();
`,
    },
    editorial: {
      approach: "Boyer-Moore Voting Algorithm",
      algorithm: 'Iterate through the array maintaining a majority candidate and balance counter. When the counter reaches 0, the current element becomes the new candidate.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'Because the majority element occurs > n/2 times, its cumulative count will remain positive at the end of the pass.',
      referenceCode: `def majority_element(nums):
    cand, cnt = None, 0
    for x in nums:
        if cnt == 0: cand = x
        cnt += 1 if x == cand else -1
    return cand`,
    },
    tags: ['Array', 'Divide and Conquer', 'Counting'],
    testCases: [
      { input: '3,2,3', expectedOutput: '3', isHidden: false },
      { input: '2,2,1,1,1,2,2', expectedOutput: '2', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: false },
      { input: '5,5,5,1,2', expectedOutput: '5', isHidden: true },
      { input: '-1,-1,-1,2,3', expectedOutput: '-1', isHidden: true },
    ],
  },

  // 6. Move Zeroes
  {
    title: 'Move Zeroes',
    slug: 'move-zeroes',
    description: `Given an integer array \`nums\`, move all \`0\`'s to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 10^4\n-2^31 <= nums[i] <= 2^31 - 1`,
    inputFormat: `Line 1: Comma-separated integers for \`nums\`.`,
    outputFormat: `Comma-separated integers representing the modified array.`,
    sampleInput: `0,1,0,3,12`,
    sampleOutput: `1,3,12,0,0`,
    points: 100,
    hints: [
      'Use two pointers: one slow pointer tracking the next non-zero write position and a fast pointer scanning through.',
      'Swap non-zero elements with the position at the slow pointer.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    insert_pos = 0
    for num in nums:
        if num != 0:
            nums[insert_pos] = num
            insert_pos += 1
    while insert_pos < len(nums):
        nums[insert_pos] = 0
        insert_pos += 1
    print(','.join(map(str, nums)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    let insertPos = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[insertPos++] = nums[i];
        }
    }
    while (insertPos < nums.length) {
        nums[insertPos++] = 0;
    }
    console.log(nums.join(','));
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
    insert_pos = 0
    for num in nums:
        if num != 0:
            nums[insert_pos] = num
            insert_pos += 1
    while insert_pos < len(nums):
        nums[insert_pos] = 0
        insert_pos += 1
    print(','.join(map(str, nums)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    let insertPos = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[insertPos++] = nums[i];
        }
    }
    while (insertPos < nums.length) {
        nums[insertPos++] = 0;
    }
    console.log(nums.join(','));
}

solve();
`,
    },
    editorial: {
      approach: 'Two-Pointer In-Place Compaction',
      algorithm: 'Shift all non-zero elements forward into `insert_pos`, then fill remaining positions with 0.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'In-place write maintains stable ordering while completing in a single pass.',
      referenceCode: `def move_zeroes(nums):
    idx = 0
    for x in nums:
        if x != 0:
            nums[idx] = x
            idx += 1
    for i in range(idx, len(nums)):
        nums[i] = 0`,
    },
    tags: ['Array', 'Two Pointers'],
    testCases: [
      { input: '0,1,0,3,12', expectedOutput: '1,3,12,0,0', isHidden: false },
      { input: '0', expectedOutput: '0', isHidden: false },
      { input: '1,2,3', expectedOutput: '1,2,3', isHidden: false },
      { input: '0,0,0', expectedOutput: '0,0,0', isHidden: true },
      { input: '4,0,5,0,6', expectedOutput: '4,5,6,0,0', isHidden: true },
    ],
  },

  // 7. Valid Palindrome
  {
    title: 'Valid Palindrome',
    slug: 'valid-palindrome',
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.`,
    inputFormat: `Line 1: A string \`s\`.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `A man, a plan, a canal: Panama`,
    sampleOutput: `true`,
    points: 100,
    hints: [
      'Filter the string to keep only alphanumeric characters and lowercase them.',
      'Use two pointers from left and right inward.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    s = sys.stdin.read().rstrip('\\r\\n')
    filtered = [ch.lower() for ch in s if ch.isalnum()]
    print("true" if filtered == filtered[::-1] else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const s = fs.readFileSync(0, 'utf-8').replace(/[\\r\\n]+$/, '');
    const filtered = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const rev = filtered.split('').reverse().join('');
    console.log(filtered === rev ? "true" : "false");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    s = sys.stdin.read().rstrip('\\r\\n')
    filtered = [ch.lower() for ch in s if ch.isalnum()]
    print("true" if filtered == filtered[::-1] else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const s = fs.readFileSync(0, 'utf-8').replace(/[\\r\\n]+$/, '');
    const filtered = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const rev = filtered.split('').reverse().join('');
    console.log(filtered === rev ? "true" : "false");
}

solve();
`,
    },
    editorial: {
      approach: 'Two Pointers with Alphanumeric Filtering',
      algorithm: 'Filter non-alphanumeric characters, convert to lowercase, and verify if filtered string equals its reverse.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      content: 'Linear two-pointer validation handles punctuation and whitespace seamlessly.',
      referenceCode: `def is_palindrome(s):
    filt = [c.lower() for c in s if c.isalnum()]
    return filt == filt[::-1]`,
    },
    tags: ['Two Pointers', 'String'],
    testCases: [
      { input: 'A man, a plan, a canal: Panama', expectedOutput: 'true', isHidden: false },
      { input: 'race a car', expectedOutput: 'false', isHidden: false },
      { input: ' ', expectedOutput: 'true', isHidden: false },
      { input: '0P', expectedOutput: 'false', isHidden: true },
      { input: 'a.', expectedOutput: 'true', isHidden: true },
    ],
  },

  // 8. Daily Temperatures
  {
    title: 'Daily Temperatures',
    slug: 'daily-temperatures',
    description: `Given an array of integers \`temperatures\` representing daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the \`i\`-th day to get a warmer temperature. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= temperatures.length <= 10^5\n30 <= temperatures[i] <= 100`,
    inputFormat: `Line 1: Comma-separated integers for \`temperatures\`.`,
    outputFormat: `Comma-separated integers representing the wait days.`,
    sampleInput: `73,74,75,71,69,72,76,73`,
    sampleOutput: `1,1,4,2,1,1,0,0`,
    points: 150,
    hints: [
      'Use a monotonic decreasing stack storing indices.',
      'When current temp > temp at stack top, pop and record the difference in indices.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    temps = [int(x.strip()) for x in line.split(',') if x.strip()]
    n = len(temps)
    ans = [0] * n
    stack = []
    for i, t in enumerate(temps):
        while stack and temps[stack[-1]] < t:
            prev_idx = stack.pop()
            ans[prev_idx] = i - prev_idx
        stack.append(i)
    print(','.join(map(str, ans)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const temps = line.split(',').map(x => parseInt(x.trim(), 10));
    const n = temps.length;
    const ans = new Array(n).fill(0);
    const stack = [];
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && temps[stack[stack.length - 1]] < temps[i]) {
            const prevIdx = stack.pop();
            ans[prevIdx] = i - prevIdx;
        }
        stack.push(i);
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
    temps = [int(x.strip()) for x in line.split(',') if x.strip()]
    n = len(temps)
    ans = [0] * n
    stack = []
    for i, t in enumerate(temps):
        while stack and temps[stack[-1]] < t:
            prev_idx = stack.pop()
            ans[prev_idx] = i - prev_idx
        stack.append(i)
    print(','.join(map(str, ans)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const temps = line.split(',').map(x => parseInt(x.trim(), 10));
    const n = temps.length;
    const ans = new Array(n).fill(0);
    const stack = [];
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && temps[stack[stack.length - 1]] < temps[i]) {
            const prevIdx = stack.pop();
            ans[prevIdx] = i - prevIdx;
        }
        stack.push(i);
    }
    console.log(ans.join(','));
}

solve();
`,
    },
    editorial: {
      approach: 'Monotonic Decreasing Stack',
      algorithm: 'Iterate through temperatures maintaining a stack of unresolved day indices in decreasing temperature order. For each day, resolve all cooler previous days.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      content: 'Every index is pushed and popped at most once, yielding amortized O(n) runtime.',
      referenceCode: `def daily_temperatures(temps):
    n = len(temps)
    res = [0] * n
    stack = []
    for i, t in enumerate(temps):
        while stack and temps[stack[-1]] < t:
            prev = stack.pop()
            res[prev] = i - prev
        stack.append(i)
    return res`,
    },
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    testCases: [
      { input: '73,74,75,71,69,72,76,73', expectedOutput: '1,1,4,2,1,1,0,0', isHidden: false },
      { input: '30,40,50,60', expectedOutput: '1,1,1,0', isHidden: false },
      { input: '30,60,90', expectedOutput: '1,1,0', isHidden: false },
      { input: '90,80,70', expectedOutput: '0,0,0', isHidden: true },
      { input: '50', expectedOutput: '0', isHidden: true },
    ],
  },

  // 9. Product of Array Except Self
  {
    title: 'Product of Array Except Self',
    slug: 'product-of-array-except-self',
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in \`O(n)\` time and without using the division operation.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `2 <= nums.length <= 10^5\n-30 <= nums[i] <= 30\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.`,
    inputFormat: `Line 1: Comma-separated integers for \`nums\`.`,
    outputFormat: `Comma-separated integers representing the products.`,
    sampleInput: `1,2,3,4`,
    sampleOutput: `24,12,8,6`,
    points: 150,
    hints: [
      'Construct a prefix product array and a suffix product array.',
      'The answer for index i is prefix[i - 1] * suffix[i + 1].',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    n = len(nums)
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    postfix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= postfix
        postfix *= nums[i]
    print(','.join(map(str, res)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    const n = nums.length;
    const res = new Array(n).fill(1);
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    let postfix = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= postfix;
        postfix *= nums[i];
    }
    console.log(res.join(','));
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
    n = len(nums)
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    postfix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= postfix
        postfix *= nums[i]
    print(','.join(map(str, res)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    const n = nums.length;
    const res = new Array(n).fill(1);
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    let postfix = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= postfix;
        postfix *= nums[i];
    }
    console.log(res.join(','));
}

solve();
`,
    },
    editorial: {
      approach: 'Prefix and Suffix Accumulation in O(1) Extra Space',
      algorithm: 'First pass computes prefix products directly into output array. Second backward pass multiplies running suffix product.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1) excluding output array',
      content: 'Eliminates division requirement and gracefully handles zeroes in input array.',
      referenceCode: `def product_except_self(nums):
    n = len(nums)
    res = [1] * n
    p = 1
    for i in range(n):
        res[i] = p
        p *= nums[i]
    s = 1
    for i in range(n-1, -1, -1):
        res[i] *= s
        s *= nums[i]
    return res`,
    },
    tags: ['Array', 'Prefix Sum'],
    testCases: [
      { input: '1,2,3,4', expectedOutput: '24,12,8,6', isHidden: false },
      { input: '-1,1,0,-3,3', expectedOutput: '0,0,9,0,0', isHidden: false },
      { input: '2,3', expectedOutput: '3,2', isHidden: false },
      { input: '0,0', expectedOutput: '0,0', isHidden: true },
      { input: '1,-1', expectedOutput: '-1,1', isHidden: true },
    ],
  },

  // 10. Subarray Sum Equals K
  {
    title: 'Subarray Sum Equals K',
    slug: 'subarray-sum-equals-k',
    description: `Given an array of integers \`nums\` and an integer \`k\`, return the total number of continuous subarrays whose sum equals to \`k\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 2 * 10^4\n-1000 <= nums[i] <= 1000\n-10^7 <= k <= 10^7`,
    inputFormat: `Line 1: Comma-separated integers for \`nums\`.\nLine 2: An integer \`k\`.`,
    outputFormat: `An integer representing the count of subarrays.`,
    sampleInput: `1,1,1\n2`,
    sampleOutput: `2`,
    points: 150,
    hints: [
      'Let prefix_sum[i] be the sum of elements from 0 to i.',
      'A subarray from j to i has sum k if prefix_sum[i] - prefix_sum[j - 1] == k.',
      'Use a hash map to store frequencies of prefix sums seen so far.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
    k = int(lines[1].strip())
    
    count = 0
    curr_sum = 0
    prefix_map = {0: 1}
    for n in nums:
        curr_sum += n
        if (curr_sum - k) in prefix_map:
            count += prefix_map[curr_sum - k]
        prefix_map[curr_sum] = prefix_map.get(curr_sum, 0) + 1
    print(count)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const nums = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const k = parseInt(lines[1].trim(), 10);

    let count = 0;
    let currSum = 0;
    const prefixMap = new Map();
    prefixMap.set(0, 1);
    for (const n of nums) {
        currSum += n;
        if (prefixMap.has(currSum - k)) {
            count += prefixMap.get(currSum - k);
        }
        prefixMap.set(currSum, (prefixMap.get(currSum) || 0) + 1);
    }
    console.log(count);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
    k = int(lines[1].strip())
    
    count = 0
    curr_sum = 0
    prefix_map = {0: 1}
    for n in nums:
        curr_sum += n
        if (curr_sum - k) in prefix_map:
            count += prefix_map[curr_sum - k]
        prefix_map[curr_sum] = prefix_map.get(curr_sum, 0) + 1
    print(count)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const nums = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const k = parseInt(lines[1].trim(), 10);

    let count = 0;
    let currSum = 0;
    const prefixMap = new Map();
    prefixMap.set(0, 1);
    for (const n of nums) {
        currSum += n;
        if (prefixMap.has(currSum - k)) {
            count += prefixMap.get(currSum - k);
        }
        prefixMap.set(currSum, (prefixMap.get(currSum) || 0) + 1);
    }
    console.log(count);
}

solve();
`,
    },
    editorial: {
      approach: 'Prefix Sum Accumulation with Frequency Hash Map',
      algorithm: 'Maintain running prefix sum. Query map for `curr_sum - k` to count all valid starting prefix points in O(1) time per element.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      content: 'Using a hash map reduces what would be an O(n^2) nested loop approach to O(n) linear time.',
      referenceCode: `def subarray_sum(nums, k):
    count, curr = 0, 0
    freq = {0: 1}
    for x in nums:
        curr += x
        count += freq.get(curr - k, 0)
        freq[curr] = freq.get(curr, 0) + 1
    return count`,
    },
    tags: ['Array', 'Hash Table', 'Prefix Sum'],
    testCases: [
      { input: '1,1,1\n2', expectedOutput: '2', isHidden: false },
      { input: '1,2,3\n3', expectedOutput: '2', isHidden: false },
      { input: '1,-1,0\n0', expectedOutput: '3', isHidden: false },
      { input: '3\n3', expectedOutput: '1', isHidden: true },
      { input: '1,2,1,2,1\n3', expectedOutput: '4', isHidden: true },
    ],
  },

  // 11. Longest Consecutive Sequence
  {
    title: 'Longest Consecutive Sequence',
    slug: 'longest-consecutive-sequence',
    description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in \`O(n)\` time.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `0 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9`,
    inputFormat: `Line 1: Comma-separated integers for \`nums\`.`,
    outputFormat: `An integer representing the length of the longest consecutive sequence.`,
    sampleInput: `100,4,200,1,3,2`,
    sampleOutput: `4`,
    points: 150,
    hints: [
      'Insert all numbers into a hash set for O(1) membership lookup.',
      'Only start counting streaks from numbers where num - 1 is not in the set.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print(0)
        return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    if not nums:
        print(0)
        return
    num_set = set(nums)
    longest = 0
    for n in num_set:
        if n - 1 not in num_set:
            curr = n
            streak = 1
            while curr + 1 in num_set:
                curr += 1
                streak += 1
            longest = max(longest, streak)
    print(longest)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(0); return; }
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    if (nums.length === 0) { console.log(0); return; }
    const numSet = new Set(nums);
    let longest = 0;
    for (const n of numSet) {
        if (!numSet.has(n - 1)) {
            let curr = n;
            let streak = 1;
            while (numSet.has(curr + 1)) {
                curr++;
                streak++;
            }
            if (streak > longest) longest = streak;
        }
    }
    console.log(longest);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print(0)
        return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    if not nums:
        print(0)
        return
    num_set = set(nums)
    longest = 0
    for n in num_set:
        if n - 1 not in num_set:
            curr = n
            streak = 1
            while curr + 1 in num_set:
                curr += 1
                streak += 1
            longest = max(longest, streak)
    print(longest)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(0); return; }
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    if (nums.length === 0) { console.log(0); return; }
    const numSet = new Set(nums);
    let longest = 0;
    for (const n of numSet) {
        if (!numSet.has(n - 1)) {
            let curr = n;
            let streak = 1;
            while (numSet.has(curr + 1)) {
                curr++;
                streak++;
            }
            if (streak > longest) longest = streak;
        }
    }
    console.log(longest);
}

solve();
`,
    },
    editorial: {
      approach: 'Hash Set Streak Initiation',
      algorithm: 'Insert elements into set. For each element, if `n - 1` is not in set, it is the sequence start. Incrementally check `n + 1, n + 2, ...` in O(1) time.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      content: 'Each element is visited at most twice across all sequence expansions, ensuring strict linear runtime.',
      referenceCode: `def longest_consecutive(nums):
    s = set(nums)
    ans = 0
    for x in s:
        if x - 1 not in s:
            y = x + 1
            while y in s: y += 1
            ans = max(ans, y - x)
    return ans`,
    },
    tags: ['Array', 'Hash Table', 'Union Find'],
    testCases: [
      { input: '100,4,200,1,3,2', expectedOutput: '4', isHidden: false },
      { input: '0,3,7,2,5,8,4,6,0,1', expectedOutput: '9', isHidden: false },
      { input: '', expectedOutput: '0', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: true },
      { input: '10,20,30,40', expectedOutput: '1', isHidden: true },
    ],
  },

  // 12. Group Anagrams
  {
    title: 'Group Anagrams',
    slug: 'group-anagrams',
    description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.

Output each group as a comma-separated string on its own line, with lines sorted lexicographically by their first element, and each line's elements sorted lexicographically.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= strs.length <= 10^4\n0 <= strs[i].length <= 100\nstrs[i] consists of lowercase English letters.`,
    inputFormat: `Line 1: Comma-separated strings for \`strs\`.`,
    outputFormat: `Sorted lines of comma-separated grouped anagrams.`,
    sampleInput: `eat,tea,tan,ate,nat,bat`,
    sampleOutput: `bat\nate,eat,tea\nnat,tan`,
    points: 150,
    hints: [
      'Two strings are anagrams if and only if their sorted character sequences are equal.',
      'Use the sorted string as the hash map key.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    words = [w.strip() for w in line.split(',') if w.strip()]
    groups = {}
    for w in words:
        key = ''.join(sorted(w))
        groups.setdefault(key, []).append(w)
    res = []
    for g in groups.values():
        res.append(sorted(g))
    res.sort(key=lambda x: (len(x), x[0]))
    for r in res:
        print(','.join(r))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const words = line.split(',').map(x => x.trim()).filter(Boolean);
    const groups = new Map();
    for (const w of words) {
        const key = w.split('').sort().join('');
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(w);
    }
    const res = Array.from(groups.values()).map(g => g.sort());
    res.sort((a, b) => a.length - b.length || a[0].localeCompare(b[0]));
    for (const r of res) console.log(r.join(','));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    words = [w.strip() for w in line.split(',') if w.strip()]
    groups = {}
    for w in words:
        key = ''.join(sorted(w))
        groups.setdefault(key, []).append(w)
    res = []
    for g in groups.values():
        res.append(sorted(g))
    res.sort(key=lambda x: (len(x), x[0]))
    for r in res:
        print(','.join(r))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const words = line.split(',').map(x => x.trim()).filter(Boolean);
    const groups = new Map();
    for (const w of words) {
        const key = w.split('').sort().join('');
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(w);
    }
    const res = Array.from(groups.values()).map(g => g.sort());
    res.sort((a, b) => a.length - b.length || a[0].localeCompare(b[0]));
    for (const r of res) console.log(r.join(','));
}

solve();
`,
    },
    editorial: {
      approach: 'Canonical Key Sorting with Hash Map Bucket',
      algorithm: 'Sort characters of each word to form a canonical signature key. Group words matching signature into list buckets.',
      timeComplexity: 'O(n * k log k) where k is max string length',
      spaceComplexity: 'O(n * k)',
      content: 'Canonical string key provides immediate O(1) group mapping.',
      referenceCode: `def group_anagrams(strs):
    d = {}
    for s in strs:
        k = ''.join(sorted(s))
        d.setdefault(k, []).append(s)
    return list(d.values())`,
    },
    tags: ['Array', 'Hash Table', 'String', 'Sorting'],
    testCases: [
      { input: 'eat,tea,tan,ate,nat,bat', expectedOutput: 'bat\nnat,tan\nate,eat,tea', isHidden: false },
      { input: 'a', expectedOutput: 'a', isHidden: false },
      { input: 'ab,ba', expectedOutput: 'ab,ba', isHidden: false },
      { input: 'cat,dog,tac,god,act', expectedOutput: 'dog,god\nact,cat,tac', isHidden: true },
      { input: 'hello', expectedOutput: 'hello', isHidden: true },
    ],
  },

  // 13. Top K Frequent Elements
  {
    title: 'Top K Frequent Elements',
    slug: 'top-k-frequent-elements',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You may return the answer in any order (output formatted in descending frequency order, comma-separated).

It is **guaranteed** that the answer is unique.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4\nk is in the range [1, the number of unique elements in the array].\nIt is guaranteed that the answer is unique.`,
    inputFormat: `Line 1: Comma-separated integers for \`nums\`.\nLine 2: An integer \`k\`.`,
    outputFormat: `Comma-separated integers representing top k frequent elements in descending frequency order.`,
    sampleInput: `1,1,1,2,2,3\n2`,
    sampleOutput: `1,2`,
    points: 150,
    hints: [
      'Count frequencies using a hash map.',
      'Use bucket sort where index represents frequency, or a min-heap of size k.',
    ],
    codeTemplates: {
      python: `import sys
from collections import Counter

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
    k = int(lines[1].strip())
    counts = Counter(nums)
    most_common = counts.most_common(k)
    print(','.join(str(x[0]) for x in most_common))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const nums = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const k = parseInt(lines[1].trim(), 10);
    const freq = {};
    for (const n of nums) freq[n] = (freq[n] || 0) + 1;
    const entries = Object.entries(freq).map(([num, count]) => [parseInt(num, 10), count]);
    entries.sort((a, b) => b[1] - a[1]);
    const topK = entries.slice(0, k).map(x => x[0]);
    console.log(topK.join(','));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
from collections import Counter

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
    k = int(lines[1].strip())
    counts = Counter(nums)
    most_common = counts.most_common(k)
    print(','.join(str(x[0]) for x in most_common))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const nums = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const k = parseInt(lines[1].trim(), 10);
    const freq = {};
    for (const n of nums) freq[n] = (freq[n] || 0) + 1;
    const entries = Object.entries(freq).map(([num, count]) => [parseInt(num, 10), count]);
    entries.sort((a, b) => b[1] - a[1]);
    const topK = entries.slice(0, k).map(x => x[0]);
    console.log(topK.join(','));
}

solve();
`,
    },
    editorial: {
      approach: 'Frequency Map with Bucket Sort or Heap Extraction',
      algorithm: 'Count frequencies into map. Sort by frequency or populate array buckets indexed by frequency to retrieve top K elements in O(N) or O(N log K) time.',
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(n)',
      content: 'Heap size bounded by k delivers fast and reliable extraction for large streams.',
      referenceCode: `from collections import Counter
def top_k_frequent(nums, k):
    return [x[0] for x in Counter(nums).most_common(k)]`,
    },
    tags: ['Array', 'Hash Table', 'Divide and Conquer', 'Sorting', 'Heap (Priority Queue)', 'Bucket Sort'],
    testCases: [
      { input: '1,1,1,2,2,3\n2', expectedOutput: '1,2', isHidden: false },
      { input: '1\n1', expectedOutput: '1', isHidden: false },
      { input: '4,4,4,4,5,5,6\n1', expectedOutput: '4', isHidden: false },
      { input: '1,2,3,4,5\n3', expectedOutput: '1,2,3', isHidden: true },
      { input: '10,10,20,20,30,30,40,40,50,50,50\n1', expectedOutput: '50', isHidden: true },
    ],
  },

  // 14. Find Minimum in Rotated Sorted Array
  {
    title: 'Find Minimum in Rotated Sorted Array',
    slug: 'find-minimum-in-rotated-sorted-array',
    description: `Suppose an array of length \`n\` sorted in ascending order is rotated between \`1\` and \`n\` times.

Given the sorted rotated array \`nums\` of **unique** elements, return the minimum element of this array.

You must write an algorithm that runs in \`O(log n)\` time.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `n == nums.length\n1 <= n <= 5000\n-5000 <= nums[i] <= 5000\nAll elements are unique.`,
    inputFormat: `Line 1: Comma-separated integers for \`nums\`.`,
    outputFormat: `An integer representing the minimum element.`,
    sampleInput: `3,4,5,1,2`,
    sampleOutput: `1`,
    points: 150,
    hints: [
      'Compare nums[mid] with nums[right].',
      'If nums[mid] > nums[right], the minimum is in the right half (left = mid + 1).',
      'Otherwise, the minimum is in the left half including mid (right = mid).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    l, r = 0, len(nums) - 1
    while l < r:
        m = (l + r) // 2
        if nums[m] > nums[r]:
            l = m + 1
        else:
            r = m
    print(nums[l])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    let l = 0, r = nums.length - 1;
    while (l < r) {
        const m = Math.floor((l + r) / 2);
        if (nums[m] > nums[r]) l = m + 1;
        else r = m;
    }
    console.log(nums[l]);
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
    l, r = 0, len(nums) - 1
    while l < r:
        m = (l + r) // 2
        if nums[m] > nums[r]:
            l = m + 1
        else:
            r = m
    print(nums[l])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    let l = 0, r = nums.length - 1;
    while (l < r) {
        const m = Math.floor((l + r) / 2);
        if (nums[m] > nums[r]) l = m + 1;
        else r = m;
    }
    console.log(nums[l]);
}

solve();
`,
    },
    editorial: {
      approach: 'Binary Search on Inflection Point',
      algorithm: 'Compare midpoint element to right boundary. If `nums[m] > nums[r]`, minimum lies strictly rightwards. Otherwise search leftwards.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      content: 'Standard logarithmic convergence across rotated monotonic segments.',
      referenceCode: `def find_min(nums):
    l, r = 0, len(nums) - 1
    while l < r:
        m = (l + r) // 2
        if nums[m] > nums[r]: l = m + 1
        else: r = m
    return nums[l]`,
    },
    tags: ['Array', 'Binary Search'],
    testCases: [
      { input: '3,4,5,1,2', expectedOutput: '1', isHidden: false },
      { input: '4,5,6,7,0,1,2', expectedOutput: '0', isHidden: false },
      { input: '11,13,15,17', expectedOutput: '11', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: true },
      { input: '2,1', expectedOutput: '1', isHidden: true },
    ],
  },

  // 15. Subsets
  {
    title: 'Subsets',
    slug: 'subsets',
    description: `Given an integer array \`nums\` of **unique** elements, return all possible subsets (the power set).

The solution set **must not** contain duplicate subsets. Output each subset on a separate line as comma-separated integers, sorted by length then elements.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 10\n-10 <= nums[i] <= 10\nAll the numbers of nums are unique.`,
    inputFormat: `Line 1: Comma-separated integers for \`nums\`.`,
    outputFormat: `Sorted subsets printed on separate lines.`,
    sampleInput: `1,2,3`,
    sampleOutput: `\n1\n2\n3\n1,2\n1,3\n2,3\n1,2,3`,
    points: 150,
    hints: [
      'Each element can either be included or excluded from a subset.',
      'Use backtracking DFS or bitmask manipulation from 0 to (1 << n) - 1.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print("")
        return
    nums = sorted([int(x.strip()) for x in line.split(',') if x.strip()])
    res = []
    def backtrack(idx, current):
        res.append(list(current))
        for i in range(idx, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()
    backtrack(0, [])
    res.sort(key=lambda s: (len(s), s))
    for s in res:
        print(','.join(map(str, s)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(""); return; }
    const nums = line.split(',').map(x => parseInt(x.trim(), 10)).sort((a, b) => a - b);
    const res = [];
    function backtrack(idx, current) {
        res.push([...current]);
        for (let i = idx; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }
    backtrack(0, []);
    res.sort((a, b) => a.length - b.length || a.join(',').localeCompare(b.join(',')));
    for (const s of res) console.log(s.join(','));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print("")
        return
    nums = sorted([int(x.strip()) for x in line.split(',') if x.strip()])
    res = []
    def backtrack(idx, current):
        res.append(list(current))
        for i in range(idx, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()
    backtrack(0, [])
    res.sort(key=lambda s: (len(s), s))
    for s in res:
        print(','.join(map(str, s)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(""); return; }
    const nums = line.split(',').map(x => parseInt(x.trim(), 10)).sort((a, b) => a - b);
    const res = [];
    function backtrack(idx, current) {
        res.push([...current]);
        for (let i = idx; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }
    backtrack(0, []);
    res.sort((a, b) => a.length - b.length || a.join(',').localeCompare(b.join(',')));
    for (const s of res) console.log(s.join(','));
}

solve();
`,
    },
    editorial: {
      approach: 'Recursive Backtracking Power Set Generation',
      algorithm: 'Branch on including each element starting from current index, constructing 2^n distinct subsets.',
      timeComplexity: 'O(n * 2^n)',
      spaceComplexity: 'O(n * 2^n)',
      content: 'Generates all 2^N possible sub-combinations systematically.',
      referenceCode: `def subsets(nums):
    res = []
    def dfs(i, cur):
        if i == len(nums):
            res.append(cur[:])
            return
        dfs(i + 1, cur)
        cur.append(nums[i])
        dfs(i + 1, cur)
        cur.pop()
    dfs(0, [])
    return res`,
    },
    tags: ['Array', 'Backtracking', 'Bit Manipulation'],
    testCases: [
      { input: '1,2,3', expectedOutput: '\n1\n2\n3\n1,2\n1,3\n2,3\n1,2,3', isHidden: false },
      { input: '0', expectedOutput: '\n0', isHidden: false },
      { input: '1,2', expectedOutput: '\n1\n2\n1,2', isHidden: false },
      { input: '5', expectedOutput: '\n5', isHidden: true },
      { input: '1,4,7', expectedOutput: '\n1\n4\n7\n1,4\n1,7\n4,7\n1,4,7', isHidden: true },
    ],
  },

  // 16. Generate Parentheses
  {
    title: 'Generate Parentheses',
    slug: 'generate-parentheses',
    description: `Given \`n\` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Output each valid string on a new line, sorted lexicographically.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= n <= 8`,
    inputFormat: `Line 1: An integer \`n\`.`,
    outputFormat: `Sorted valid parentheses combinations on separate lines.`,
    sampleInput: `3`,
    sampleOutput: `((()))\n(()())\n(())()\n()(())\n()()()`,
    points: 150,
    hints: [
      'Maintain counts of open and closed parentheses used so far.',
      'Only add a closed parenthesis if closed_count < open_count.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    n = int(line)
    res = []
    def backtrack(current, open_cnt, close_cnt):
        if len(current) == 2 * n:
            res.append(current)
            return
        if open_cnt < n:
            backtrack(current + '(', open_cnt + 1, close_cnt)
        if close_cnt < open_cnt:
            backtrack(current + ')', open_cnt, close_cnt + 1)
    backtrack("", 0, 0)
    res.sort()
    for s in res:
        print(s)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const n = parseInt(line, 10);
    const res = [];
    function backtrack(current, openCnt, closeCnt) {
        if (current.length === 2 * n) {
            res.push(current);
            return;
        }
        if (openCnt < n) backtrack(current + '(', openCnt + 1, closeCnt);
        if (closeCnt < openCnt) backtrack(current + ')', openCnt, closeCnt + 1);
    }
    backtrack("", 0, 0);
    res.sort();
    for (const s of res) console.log(s);
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
    res = []
    def backtrack(current, open_cnt, close_cnt):
        if len(current) == 2 * n:
            res.append(current)
            return
        if open_cnt < n:
            backtrack(current + '(', open_cnt + 1, close_cnt)
        if close_cnt < open_cnt:
            backtrack(current + ')', open_cnt, close_cnt + 1)
    backtrack("", 0, 0)
    res.sort()
    for s in res:
        print(s)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const n = parseInt(line, 10);
    const res = [];
    function backtrack(current, openCnt, closeCnt) {
        if (current.length === 2 * n) {
            res.push(current);
            return;
        }
        if (openCnt < n) backtrack(current + '(', openCnt + 1, closeCnt);
        if (closeCnt < openCnt) backtrack(current + ')', openCnt, closeCnt + 1);
    }
    backtrack("", 0, 0);
    res.sort();
    for (const s of res) console.log(s);
}

solve();
`,
    },
    editorial: {
      approach: 'Constrained Recursive Backtracking (Catalan Sequence)',
      algorithm: 'Branch with open parenthesis if open < n, and close parenthesis if close < open. When length is 2n, record combination.',
      timeComplexity: 'O(4^n / sqrt(n)) Catalan number',
      spaceComplexity: 'O(n)',
      content: 'Constrained recursion ensures invalid prefixes are pruned immediately.',
      referenceCode: `def generate_parenthesis(n):
    res = []
    def dfs(s, o, c):
        if len(s) == 2 * n:
            res.append(s); return
        if o < n: dfs(s + '(', o + 1, c)
        if c < o: dfs(s + ')', o, c + 1)
    dfs("", 0, 0)
    return res`,
    },
    tags: ['String', 'Dynamic Programming', 'Backtracking'],
    testCases: [
      { input: '3', expectedOutput: '((()))\n(()())\n(())()\n()(())\n()()()', isHidden: false },
      { input: '1', expectedOutput: '()', isHidden: false },
      { input: '2', expectedOutput: '(())\n()()', isHidden: false },
      { input: '4', expectedOutput: '(((())))\n((()()))\n((())())\n((()))()\n(()(()))\n(()()())\n(()())()\n(())(())\n(())()()\n()((()))\n()(()())\n()(())()\n()()(())\n()()()()', isHidden: true },
    ],
  },

  // 17. Evaluate Reverse Polish Notation
  {
    title: 'Evaluate Reverse Polish Notation',
    slug: 'evaluate-reverse-polish-notation',
    description: `You are given an array of strings \`tokens\` that represents an arithmetic expression in a **Reverse Polish Notation** (Postfix Notation).

Evaluate the expression. Return an integer that represents the value of the expression.

Note that:
- The valid operators are \`+\`, \`-\`, \`*\`, and \`/\`.
- Each operand may be an integer or another expression.
- The division between two integers always **truncates toward zero**.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= tokens.length <= 10^4\ntokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].`,
    inputFormat: `Line 1: Comma-separated tokens.`,
    outputFormat: `An integer representing the evaluated expression.`,
    sampleInput: `2,1,+,3,*`,
    sampleOutput: `9`,
    points: 150,
    hints: [
      'Use a stack to store operands.',
      'When an operator is encountered, pop the top two values, apply the operator, and push the result back.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    tokens = [t.strip() for t in line.split(',') if t.strip()]
    stack = []
    for t in tokens:
        if t in ("+", "-", "*", "/"):
            b = stack.pop()
            a = stack.pop()
            if t == '+': stack.append(a + b)
            elif t == '-': stack.append(a - b)
            elif t == '*': stack.append(a * b)
            elif t == '/': stack.append(int(a / b))
        else:
            stack.append(int(t))
    print(stack[0])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const tokens = line.split(',').map(t => t.trim()).filter(Boolean);
    const stack = [];
    for (const t of tokens) {
        if (t === '+' || t === '-' || t === '*' || t === '/') {
            const b = stack.pop();
            const a = stack.pop();
            if (t === '+') stack.push(a + b);
            else if (t === '-') stack.push(a - b);
            else if (t === '*') stack.push(a * b);
            else if (t === '/') stack.push(Math.trunc(a / b));
        } else {
            stack.push(parseInt(t, 10));
        }
    }
    console.log(stack[0]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    tokens = [t.strip() for t in line.split(',') if t.strip()]
    stack = []
    for t in tokens:
        if t in ("+", "-", "*", "/"):
            b = stack.pop()
            a = stack.pop()
            if t == '+': stack.append(a + b)
            elif t == '-': stack.append(a - b)
            elif t == '*': stack.append(a * b)
            elif t == '/': stack.append(int(a / b))
        else:
            stack.append(int(t))
    print(stack[0])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const tokens = line.split(',').map(t => t.trim()).filter(Boolean);
    const stack = [];
    for (const t of tokens) {
        if (t === '+' || t === '-' || t === '*' || t === '/') {
            const b = stack.pop();
            const a = stack.pop();
            if (t === '+') stack.push(a + b);
            else if (t === '-') stack.push(a - b);
            else if (t === '*') stack.push(a * b);
            else if (t === '/') stack.push(Math.trunc(a / b));
        } else {
            stack.push(parseInt(t, 10));
        }
    }
    console.log(stack[0]);
}

solve();
`,
    },
    editorial: {
      approach: 'LIFO Operand Stack Evaluation',
      algorithm: 'Push numeric operands. For operators, pop right operand followed by left operand, compute result with truncate-to-zero semantics, and push result.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      content: 'Standard stack-based post-fix arithmetic parsing.',
      referenceCode: `def eval_rpn(tokens):
    st = []
    for t in tokens:
        if t in "+-*/":
            b, a = st.pop(), st.pop()
            if t == '+': st.append(a + b)
            elif t == '-': st.append(a - b)
            elif t == '*': st.append(a * b)
            else: st.append(int(a / b))
        else: st.append(int(t))
    return st[0]`,
    },
    tags: ['Array', 'Math', 'Stack'],
    testCases: [
      { input: '2,1,+,3,*', expectedOutput: '9', isHidden: false },
      { input: '4,13,5,/,+', expectedOutput: '6', isHidden: false },
      { input: '10,6,9,3,+,-11,*,/,*,17,+,5,+', expectedOutput: '22', isHidden: false },
      { input: '3', expectedOutput: '3', isHidden: true },
      { input: '5,1,-', expectedOutput: '4', isHidden: true },
    ],
  },

  // 18. Find Peak Element
  {
    title: 'Find Peak Element',
    slug: 'find-peak-element',
    description: `A peak element is an element that is strictly greater than its neighbors.

Given a **0-indexed** integer array \`nums\`, find a peak element, and return its index. If the array contains multiple peaks, return the index to **any of the peaks**.

You may imagine that \`nums[-1] = nums[n] = -inf\`. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

You must write an algorithm that runs in \`O(log n)\` time.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 1000\n-2^31 <= nums[i] <= 2^31 - 1\nnums[i] != nums[i + 1] for all valid i.`,
    inputFormat: `Line 1: Comma-separated integers for \`nums\`.`,
    outputFormat: `An integer representing the 0-based index of any peak element.`,
    sampleInput: `1,2,3,1`,
    sampleOutput: `2`,
    points: 150,
    hints: [
      'Compare nums[m] with nums[m + 1].',
      'If nums[m] < nums[m + 1], a peak must exist on the right slope (left = m + 1).',
      'Otherwise a peak must exist at or left of m (right = m).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    l, r = 0, len(nums) - 1
    while l < r:
        m = (l + r) // 2
        if nums[m] < nums[m + 1]:
            l = m + 1
        else:
            r = m
    print(l)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    let l = 0, r = nums.length - 1;
    while (l < r) {
        const m = Math.floor((l + r) / 2);
        if (nums[m] < nums[m + 1]) l = m + 1;
        else r = m;
    }
    console.log(l);
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
    l, r = 0, len(nums) - 1
    while l < r:
        m = (l + r) // 2
        if nums[m] < nums[m + 1]:
            l = m + 1
        else:
            r = m
    print(l)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    let l = 0, r = nums.length - 1;
    while (l < r) {
        const m = Math.floor((l + r) / 2);
        if (nums[m] < nums[m + 1]) l = m + 1;
        else r = m;
    }
    console.log(l);
}

solve();
`,
    },
    editorial: {
      approach: 'Binary Search Gradient Ascent',
      algorithm: 'Compare `nums[m]` with `nums[m + 1]`. Step in direction of upward slope, which guarantees reaching a local peak.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      content: 'Binary gradient ascent guarantees convergence in logarithmic comparisons.',
      referenceCode: `def find_peak(nums):
    l, r = 0, len(nums) - 1
    while l < r:
        m = (l + r) // 2
        if nums[m] < nums[m + 1]: l = m + 1
        else: r = m
    return l`,
    },
    tags: ['Array', 'Binary Search'],
    testCases: [
      { input: '1,2,3,1', expectedOutput: '2', isHidden: false },
      { input: '1,2,1,3,5,6,4', expectedOutput: '5', isHidden: false },
      { input: '1', expectedOutput: '0', isHidden: false },
      { input: '1,2', expectedOutput: '1', isHidden: true },
      { input: '2,1', expectedOutput: '0', isHidden: true },
    ],
  },

  // 19. First Unique Character in a String
  {
    title: 'First Unique Character in a String',
    slug: 'first-unique-character-in-a-string',
    description: `Given a string \`s\`, find the first non-repeating character in it and return its index. If it does not exist, return \`-1\`.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= s.length <= 10^5\ns consists of only lowercase English letters.`,
    inputFormat: `Line 1: A string \`s\`.`,
    outputFormat: `An integer representing the 0-based index or \`-1\`.`,
    sampleInput: `leetcode`,
    sampleOutput: `0`,
    points: 100,
    hints: [
      'Count frequency of each character across the entire string.',
      'In a second pass, return the index of the first character with frequency == 1.',
    ],
    codeTemplates: {
      python: `import sys
from collections import Counter

def solve():
    s = sys.stdin.read().strip()
    if not s:
        print(-1)
        return
    cnt = Counter(s)
    for i, ch in enumerate(s):
        if cnt[ch] == 1:
            print(i)
            return
    print(-1)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s) { console.log(-1); return; }
    const freq = {};
    for (const c of s) freq[c] = (freq[c] || 0) + 1;
    for (let i = 0; i < s.length; i++) {
        if (freq[s[i]] === 1) {
            console.log(i);
            return;
        }
    }
    console.log(-1);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
from collections import Counter

def solve():
    s = sys.stdin.read().strip()
    if not s:
        print(-1)
        return
    cnt = Counter(s)
    for i, ch in enumerate(s):
        if cnt[ch] == 1:
            print(i)
            return
    print(-1)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s) { console.log(-1); return; }
    const freq = {};
    for (const c of s) freq[c] = (freq[c] || 0) + 1;
    for (let i = 0; i < s.length; i++) {
        if (freq[s[i]] === 1) {
            console.log(i);
            return;
        }
    }
    console.log(-1);
}

solve();
`,
    },
    editorial: {
      approach: 'Two-Pass Frequency Map Tracking',
      algorithm: 'First pass counts character frequency in a 26-element array or hash table. Second pass finds the first character with count == 1.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1) alphabet size',
      content: 'Constant memory bound (26 characters) guarantees optimal space usage.',
      referenceCode: `def first_uniq_char(s):
    from collections import Counter
    cnt = Counter(s)
    for i, c in enumerate(s):
        if cnt[c] == 1: return i
    return -1`,
    },
    tags: ['Hash Table', 'String', 'Queue', 'Counting'],
    testCases: [
      { input: 'leetcode', expectedOutput: '0', isHidden: false },
      { input: 'loveleetcode', expectedOutput: '2', isHidden: false },
      { input: 'aabb', expectedOutput: '-1', isHidden: false },
      { input: 'z', expectedOutput: '0', isHidden: true },
      { input: 'dddccdbba', expectedOutput: '8', isHidden: true },
    ],
  },

  // 20. Intersection of Two Arrays
  {
    title: 'Intersection of Two Arrays',
    slug: 'intersection-of-two-arrays',
    description: `Given two integer arrays \`nums1\` and \`nums2\`, return an array of their intersection. Each element in the result must be **unique** and you may return the result in **any order** (output sorted ascending, comma-separated).`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums1.length, nums2.length <= 1000\n0 <= nums1[i], nums2[i] <= 1000`,
    inputFormat: `Line 1: Comma-separated integers for \`nums1\`.\nLine 2: Comma-separated integers for \`nums2\`.`,
    outputFormat: `Sorted comma-separated integers of the intersection.`,
    sampleInput: `1,2,2,1\n2,2`,
    sampleOutput: `2`,
    points: 100,
    hints: [
      'Convert nums1 into a set.',
      'Filter elements in nums2 that exist in the set and deduplicate.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    nums1 = set([int(x.strip()) for x in lines[0].split(',') if x.strip()])
    nums2 = set([int(x.strip()) for x in lines[1].split(',') if x.strip()])
    res = sorted(list(nums1.intersection(nums2)))
    print(','.join(map(str, res)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const nums1 = new Set(lines[0].split(',').map(x => parseInt(x.trim(), 10)));
    const nums2 = new Set(lines[1].split(',').map(x => parseInt(x.trim(), 10)));
    const res = [];
    for (const n of nums1) {
        if (nums2.has(n)) res.push(n);
    }
    res.sort((a, b) => a - b);
    console.log(res.join(','));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    nums1 = set([int(x.strip()) for x in lines[0].split(',') if x.strip()])
    nums2 = set([int(x.strip()) for x in lines[1].split(',') if x.strip()])
    res = sorted(list(nums1.intersection(nums2)))
    print(','.join(map(str, res)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const nums1 = new Set(lines[0].split(',').map(x => parseInt(x.trim(), 10)));
    const nums2 = new Set(lines[1].split(',').map(x => parseInt(x.trim(), 10)));
    const res = [];
    for (const n of nums1) {
        if (nums2.has(n)) res.push(n);
    }
    res.sort((a, b) => a - b);
    console.log(res.join(','));
}

solve();
`,
    },
    editorial: {
      approach: 'Hash Set Set-Intersection',
      algorithm: 'Convert both lists to hash sets and compute intersection in O(n + m) time.',
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(n + m)',
      content: 'Set membership testing enables deduplication in linear time.',
      referenceCode: `def intersection(nums1, nums2):
    return list(set(nums1) & set(nums2))`,
    },
    tags: ['Array', 'Hash Table', 'Two Pointers', 'Binary Search', 'Sorting'],
    testCases: [
      { input: '1,2,2,1\n2,2', expectedOutput: '2', isHidden: false },
      { input: '4,9,5\n9,4,9,8,4', expectedOutput: '4,9', isHidden: false },
      { input: '1,2,3\n4,5,6', expectedOutput: '', isHidden: false },
      { input: '100\n100', expectedOutput: '100', isHidden: true },
      { input: '1,2,3,4,5\n3,5,7', expectedOutput: '3,5', isHidden: true },
    ],
  },

  // 21. Min Stack
  {
    title: 'Min Stack',
    slug: 'min-stack',
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

You will be given a sequence of operations: \`push x\`, \`pop\`, \`top\`, \`getMin\`. Output the result of each query that produces a value on a new line.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `Methods pop, top and getMin operations will always be called on non-empty stacks.\nAt most 3 * 10^4 calls total.`,
    inputFormat: `Sequence of operations, one per line (e.g. push -2, push 0, push -3, getMin, pop, top, getMin).`,
    outputFormat: `Values output by top and getMin queries on separate lines.`,
    sampleInput: `push -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin`,
    sampleOutput: `-3\n0\n-2`,
    points: 150,
    hints: [
      'Maintain an auxiliary stack where each entry is the minimum value up to that stack depth.',
      'When popping from the main stack, pop from the min stack simultaneously.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    stack = []
    min_stack = []
    for line in lines:
        parts = line.strip().split()
        if not parts: continue
        op = parts[0]
        if op == 'push':
            val = int(parts[1])
            stack.append(val)
            min_val = min(val, min_stack[-1] if min_stack else val)
            min_stack.append(min_val)
        elif op == 'pop':
            stack.pop()
            min_stack.pop()
        elif op == 'top':
            print(stack[-1])
        elif op == 'getMin':
            print(min_stack[-1])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    const stack = [];
    const minStack = [];
    for (const line of lines) {
        const parts = line.trim().split(/\\s+/);
        if (parts.length === 0 || !parts[0]) continue;
        const op = parts[0];
        if (op === 'push') {
            const val = parseInt(parts[1], 10);
            stack.push(val);
            const curMin = minStack.length > 0 ? Math.min(val, minStack[minStack.length - 1]) : val;
            minStack.push(curMin);
        } else if (op === 'pop') {
            stack.pop();
            minStack.pop();
        } else if (op === 'top') {
            console.log(stack[stack.length - 1]);
        } else if (op === 'getMin') {
            console.log(minStack[minStack.length - 1]);
        }
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    stack = []
    min_stack = []
    for line in lines:
        parts = line.strip().split()
        if not parts: continue
        op = parts[0]
        if op == 'push':
            val = int(parts[1])
            stack.append(val)
            min_val = min(val, min_stack[-1] if min_stack else val)
            min_stack.append(min_val)
        elif op == 'pop':
            stack.pop()
            min_stack.pop()
        elif op == 'top':
            print(stack[-1])
        elif op == 'getMin':
            print(min_stack[-1])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    const stack = [];
    const minStack = [];
    for (const line of lines) {
        const parts = line.trim().split(/\\s+/);
        if (parts.length === 0 || !parts[0]) continue;
        const op = parts[0];
        if (op === 'push') {
            const val = parseInt(parts[1], 10);
            stack.push(val);
            const curMin = minStack.length > 0 ? Math.min(val, minStack[minStack.length - 1]) : val;
            minStack.push(curMin);
        } else if (op === 'pop') {
            stack.pop();
            minStack.pop();
        } else if (op === 'top') {
            console.log(stack[stack.length - 1]);
        } else if (op === 'getMin') {
            console.log(minStack[minStack.length - 1]);
        }
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Dual Monotonic Minimum Tracking Stack',
      algorithm: 'Pair each value push with current prefix minimum in a parallel min-stack, enabling O(1) time retrieval for all operations.',
      timeComplexity: 'O(1) for push, pop, top, getMin',
      spaceComplexity: 'O(n)',
      content: 'Parallel min-stack guarantees instant access to minimum at any depth.',
      referenceCode: `class MinStack:
    def __init__(self):
        self.s = []
        self.mins = []
    def push(self, val):
        self.s.append(val)
        self.mins.append(min(val, self.mins[-1] if self.mins else val))
    def pop(self):
        self.s.pop()
        self.mins.pop()
    def top(self): return self.s[-1]
    def getMin(self): return self.mins[-1]`,
    },
    tags: ['Stack', 'Design'],
    testCases: [
      { input: 'push -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin', expectedOutput: '-3\n0\n-2', isHidden: false },
      { input: 'push 1\npush 2\ntop\ngetMin', expectedOutput: '2\n1', isHidden: false },
      { input: 'push 5\ngetMin\npush 3\ngetMin\npop\ngetMin', expectedOutput: '5\n3\n5', isHidden: false },
      { input: 'push -10\npush -20\ngetMin', expectedOutput: '-20', isHidden: true },
      { input: 'push 100\ntop', expectedOutput: '100', isHidden: true },
    ],
  },

  // 22. Implement Queue using Stacks
  {
    title: 'Implement Queue using Stacks',
    slug: 'implement-queue-using-stacks',
    description: `Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all standard queue operations (\`push\`, \`pop\`, \`peek\`, \`empty\`).

Input is a series of operations on separate lines: \`push x\`, \`pop\`, \`peek\`, \`empty\`. Output result of \`pop\`, \`peek\`, and \`empty\` queries.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= x <= 9\nAt most 100 calls will be made to push, pop, peek, and empty.`,
    inputFormat: `Operations on separate lines (e.g. push 1, push 2, peek, pop, empty).`,
    outputFormat: `Values output by peek, pop, and empty on separate lines.`,
    sampleInput: `push 1\npush 2\npeek\npop\nempty`,
    sampleOutput: `1\n1\nfalse`,
    points: 100,
    hints: [
      'Use an input stack and an output stack.',
      'When pop or peek is called and output stack is empty, transfer all elements from input stack to output stack.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    in_stack = []
    out_stack = []
    for line in lines:
        parts = line.strip().split()
        if not parts: continue
        op = parts[0]
        if op == 'push':
            in_stack.append(int(parts[1]))
        elif op == 'pop':
            if not out_stack:
                while in_stack: out_stack.append(in_stack.pop())
            print(out_stack.pop())
        elif op == 'peek':
            if not out_stack:
                while in_stack: out_stack.append(in_stack.pop())
            print(out_stack[-1])
        elif op == 'empty':
            print("true" if not in_stack and not out_stack else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    const inStack = [];
    const outStack = [];
    for (const line of lines) {
        const parts = line.trim().split(/\\s+/);
        if (!parts[0]) continue;
        const op = parts[0];
        if (op === 'push') {
            inStack.push(parseInt(parts[1], 10));
        } else if (op === 'pop') {
            if (outStack.length === 0) {
                while (inStack.length > 0) outStack.push(inStack.pop());
            }
            console.log(outStack.pop());
        } else if (op === 'peek') {
            if (outStack.length === 0) {
                while (inStack.length > 0) outStack.push(inStack.pop());
            }
            console.log(outStack[outStack.length - 1]);
        } else if (op === 'empty') {
            console.log(inStack.length === 0 && outStack.length === 0 ? "true" : "false");
        }
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    in_stack = []
    out_stack = []
    for line in lines:
        parts = line.strip().split()
        if not parts: continue
        op = parts[0]
        if op == 'push':
            in_stack.append(int(parts[1]))
        elif op == 'pop':
            if not out_stack:
                while in_stack: out_stack.append(in_stack.pop())
            print(out_stack.pop())
        elif op == 'peek':
            if not out_stack:
                while in_stack: out_stack.append(in_stack.pop())
            print(out_stack[-1])
        elif op == 'empty':
            print("true" if not in_stack and not out_stack else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    const inStack = [];
    const outStack = [];
    for (const line of lines) {
        const parts = line.trim().split(/\\s+/);
        if (!parts[0]) continue;
        const op = parts[0];
        if (op === 'push') {
            inStack.push(parseInt(parts[1], 10));
        } else if (op === 'pop') {
            if (outStack.length === 0) {
                while (inStack.length > 0) outStack.push(inStack.pop());
            }
            console.log(outStack.pop());
        } else if (op === 'peek') {
            if (outStack.length === 0) {
                while (inStack.length > 0) outStack.push(inStack.pop());
            }
            console.log(outStack[outStack.length - 1]);
        } else if (op === 'empty') {
            console.log(inStack.length === 0 && outStack.length === 0 ? "true" : "false");
        }
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Two-Stack In/Out Amortized FIFO Queue',
      algorithm: 'Push to in-stack. When popping/peeking and out-stack is empty, spill all items from in-stack into out-stack in inverted (FIFO) order.',
      timeComplexity: 'Amortized O(1) per operation',
      spaceComplexity: 'O(n)',
      content: 'Each element moves between stacks at most twice across its lifecycle, giving amortized constant runtime.',
      referenceCode: `class MyQueue:
    def __init__(self): self.i, self.o = [], []
    def push(self, x): self.i.append(x)
    def pop(self):
        self.peek()
        return self.o.pop()
    def peek(self):
        if not self.o:
            while self.i: self.o.append(self.i.pop())
        return self.o[-1]
    def empty(self): return not self.i and not self.o`,
    },
    tags: ['Stack', 'Design', 'Queue'],
    testCases: [
      { input: 'push 1\npush 2\npeek\npop\nempty', expectedOutput: '1\n1\nfalse', isHidden: false },
      { input: 'push 1\nempty', expectedOutput: 'false', isHidden: false },
      { input: 'push 1\npush 2\npop\npop\nempty', expectedOutput: '1\n2\ntrue', isHidden: false },
      { input: 'push 10\npush 20\npush 30\npeek\npop\npeek', expectedOutput: '10\n10\n20', isHidden: true },
      { input: 'empty', expectedOutput: 'true', isHidden: true },
    ],
  },

  // 23. Implement Stack using Queues
  {
    title: 'Implement Stack using Queues',
    slug: 'implement-stack-using-queues',
    description: `Implement a last-in-first-out (LIFO) stack using only queues. The implemented stack should support all functions of a normal stack (\`push\`, \`top\`, \`pop\`, and \`empty\`).

Input is a series of operations on separate lines: \`push x\`, \`pop\`, \`top\`, \`empty\`. Output result of \`pop\`, \`top\`, and \`empty\` queries.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= x <= 9\nAt most 100 calls total.`,
    inputFormat: `Operations on separate lines (e.g. push 1, push 2, top, pop, empty).`,
    outputFormat: `Values output by top, pop, and empty on separate lines.`,
    sampleInput: `push 1\npush 2\ntop\npop\nempty`,
    sampleOutput: `2\n2\nfalse`,
    points: 100,
    hints: [
      'A single queue can be used by rotating elements after each push.',
      'When pushing x, append to queue and rotate the previous size elements to the back.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    q = []
    for line in lines:
        parts = line.strip().split()
        if not parts: continue
        op = parts[0]
        if op == 'push':
            val = int(parts[1])
            q.append(val)
            for _ in range(len(q) - 1):
                q.append(q.pop(0))
        elif op == 'pop':
            print(q.pop(0))
        elif op == 'top':
            print(q[0])
        elif op == 'empty':
            print("true" if not q else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    const q = [];
    for (const line of lines) {
        const parts = line.trim().split(/\\s+/);
        if (!parts[0]) continue;
        const op = parts[0];
        if (op === 'push') {
            const val = parseInt(parts[1], 10);
            q.push(val);
            for (let i = 0; i < q.length - 1; i++) {
                q.push(q.shift());
            }
        } else if (op === 'pop') {
            console.log(q.shift());
        } else if (op === 'top') {
            console.log(q[0]);
        } else if (op === 'empty') {
            console.log(q.length === 0 ? "true" : "false");
        }
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    q = []
    for line in lines:
        parts = line.strip().split()
        if not parts: continue
        op = parts[0]
        if op == 'push':
            val = int(parts[1])
            q.append(val)
            for _ in range(len(q) - 1):
                q.append(q.pop(0))
        elif op == 'pop':
            print(q.pop(0))
        elif op == 'top':
            print(q[0])
        elif op == 'empty':
            print("true" if not q else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    const q = [];
    for (const line of lines) {
        const parts = line.trim().split(/\\s+/);
        if (!parts[0]) continue;
        const op = parts[0];
        if (op === 'push') {
            const val = parseInt(parts[1], 10);
            q.push(val);
            for (let i = 0; i < q.length - 1; i++) {
                q.push(q.shift());
            }
        } else if (op === 'pop') {
            console.log(q.shift());
        } else if (op === 'top') {
            console.log(q[0]);
        } else if (op === 'empty') {
            console.log(q.length === 0 ? "true" : "false");
        }
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Single Queue Rotation Push Implementation',
      algorithm: 'On push(x), enqueue x and rotate preceding n-1 elements to the rear so x remains at queue head.',
      timeComplexity: 'O(n) push, O(1) pop/top/empty',
      spaceComplexity: 'O(n)',
      content: 'Rotation on insertion transforms FIFO queue into immediate LIFO stack.',
      referenceCode: `class MyStack:
    def __init__(self): self.q = []
    def push(self, x):
        self.q.append(x)
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.pop(0))
    def pop(self): return self.q.pop(0)
    def top(self): return self.q[0]
    def empty(self): return not self.q`,
    },
    tags: ['Stack', 'Design', 'Queue'],
    testCases: [
      { input: 'push 1\npush 2\ntop\npop\nempty', expectedOutput: '2\n2\nfalse', isHidden: false },
      { input: 'push 1\npop\nempty', expectedOutput: '1\ntrue', isHidden: false },
      { input: 'push 5\npush 6\npush 7\ntop\npop\ntop', expectedOutput: '7\n7\n6', isHidden: false },
      { input: 'push 9\ntop', expectedOutput: '9', isHidden: true },
      { input: 'empty', expectedOutput: 'true', isHidden: true },
    ],
  },

  // 24. Fizz Buzz
  {
    title: 'Fizz Buzz',
    slug: 'fizz-buzz',
    description: `Given an integer \`n\`, return a string array \`answer\` (**1-indexed**) where:
- \`answer[i] == "FizzBuzz"\` if \`i\` is divisible by \`3\` and \`5\`.
- \`answer[i] == "Fizz"\` if \`i\` is divisible by \`3\`.
- \`answer[i] == "Buzz"\` if \`i\` is divisible by \`5\`.
- \`answer[i] == i\` (as a string) if none of the above conditions are true.

Output the values on a single line, comma-separated.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= n <= 10^4`,
    inputFormat: `Line 1: An integer \`n\`.`,
    outputFormat: `Comma-separated strings representing the FizzBuzz sequence.`,
    sampleInput: `5`,
    sampleOutput: `1,2,Fizz,4,Buzz`,
    points: 100,
    hints: [
      'Check divisibility by 15 (or both 3 and 5) first.',
      'Then check divisibility by 3, then 5, then fallback to string(i).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    n = int(line)
    res = []
    for i in range(1, n + 1):
        if i % 15 == 0: res.append("FizzBuzz")
        elif i % 3 == 0: res.append("Fizz")
        elif i % 5 == 0: res.append("Buzz")
        else: res.append(str(i))
    print(','.join(res))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const n = parseInt(line, 10);
    const res = [];
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) res.push("FizzBuzz");
        else if (i % 3 === 0) res.push("Fizz");
        else if (i % 5 === 0) res.push("Buzz");
        else res.push(i.toString());
    }
    console.log(res.join(','));
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
    res = []
    for i in range(1, n + 1):
        if i % 15 == 0: res.append("FizzBuzz")
        elif i % 3 == 0: res.append("Fizz")
        elif i % 5 == 0: res.append("Buzz")
        else: res.append(str(i))
    print(','.join(res))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const n = parseInt(line, 10);
    const res = [];
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) res.push("FizzBuzz");
        else if (i % 3 === 0) res.push("Fizz");
        else if (i % 5 === 0) res.push("Buzz");
        else res.push(i.toString());
    }
    console.log(res.join(','));
}

solve();
`,
    },
    editorial: {
      approach: 'Conditional Modulo Evaluation',
      algorithm: 'Check modulo 15, then 3, then 5, else output integer string.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1) auxiliary',
      content: 'Sequential modulo logic evaluates each number in constant time.',
      referenceCode: `def fizz_buzz(n):
    return ["FizzBuzz" if i % 15 == 0 else "Fizz" if i % 3 == 0 else "Buzz" if i % 5 == 0 else str(i) for i in range(1, n + 1)]`,
    },
    tags: ['Math', 'String', 'Simulation'],
    testCases: [
      { input: '3', expectedOutput: '1,2,Fizz', isHidden: false },
      { input: '5', expectedOutput: '1,2,Fizz,4,Buzz', isHidden: false },
      { input: '15', expectedOutput: '1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: true },
      { input: '6', expectedOutput: '1,2,Fizz,4,Buzz,Fizz', isHidden: true },
    ],
  },
];
