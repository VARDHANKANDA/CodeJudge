import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack250Part3ProblemDefs: ProblemDef[] = [
  // 11. Sieve of Eratosthenes (Count Primes)
  {
    title: 'Count Primes',
    slug: 'count-primes',
    description: `Given an integer \`n\`, return the number of **prime numbers** that are strictly less than \`n\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `0 <= n <= 5 * 10^6`,
    inputFormat: `Line 1: An integer \`n\`.`,
    outputFormat: `Number of primes strictly less than \`n\`.`,
    sampleInput: `10`,
    sampleOutput: `4`,
    points: 150,
    hints: [
      'Use the Sieve of Eratosthenes algorithm with a boolean array.',
      'For each prime p starting from 2, mark multiples of p starting at p * p as composite.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    n = int(line)
    if n <= 2:
        print(0)
        return
    is_prime = bytearray([1]) * n
    is_prime[0] = is_prime[1] = 0
    p = 2
    while p * p < n:
        if is_prime[p]:
            is_prime[p * p:n:p] = bytearray([0]) * len(is_prime[p * p:n:p])
        p += 1
    print(sum(is_prime))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const n = parseInt(line, 10);
    if (n <= 2) { console.log(0); return; }
    const isPrime = new Uint8Array(n);
    isPrime.fill(1);
    isPrime[0] = isPrime[1] = 0;
    for (let p = 2; p * p < n; p++) {
        if (isPrime[p]) {
            for (let i = p * p; i < n; i += p) {
                isPrime[i] = 0;
            }
        }
    }
    let count = 0;
    for (let i = 2; i < n; i++) if (isPrime[i]) count++;
    console.log(count);
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
    if n <= 2:
        print(0)
        return
    is_prime = bytearray([1]) * n
    is_prime[0] = is_prime[1] = 0
    p = 2
    while p * p < n:
        if is_prime[p]:
            is_prime[p * p:n:p] = bytearray([0]) * len(is_prime[p * p:n:p])
        p += 1
    print(sum(is_prime))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const n = parseInt(line, 10);
    if (n <= 2) { console.log(0); return; }
    const isPrime = new Uint8Array(n);
    isPrime.fill(1);
    isPrime[0] = isPrime[1] = 0;
    for (let p = 2; p * p < n; p++) {
        if (isPrime[p]) {
            for (let i = p * p; i < n; i += p) {
                isPrime[i] = 0;
            }
        }
    }
    let count = 0;
    for (let i = 2; i < n; i++) if (isPrime[i]) count++;
    console.log(count);
}

solve();
`,
    },
    editorial: {
      approach: 'Sieve of Eratosthenes',
      algorithm: 'Iteratively mark composite multiples of each prime in O(n log log n) time.',
      timeComplexity: 'O(n log log n)',
      spaceComplexity: 'O(n)',
      content: 'Optimal prime generation sieve.',
      referenceCode: `def count_primes(n):
    # Sieve of Eratosthenes
    pass`,
    },
    tags: ['Array', 'Math', 'Number Theory'],
    testCases: [
      { input: '10', expectedOutput: '4', isHidden: false },
      { input: '0', expectedOutput: '0', isHidden: false },
      { input: '1', expectedOutput: '0', isHidden: false },
      { input: '100', expectedOutput: '25', isHidden: true },
    ],
  },

  // 12. Single Number III
  {
    title: 'Single Number III',
    slug: 'single-number-iii',
    description: `Given an integer array \`nums\`, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in **any order**.

Sort output in ascending order.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `2 <= nums.length <= 3 * 10^4\n-2^31 <= nums[i] <= 2^31 - 1\nEach integer in nums will appear twice, only two will appear once.`,
    inputFormat: `Line 1: Space-separated integers of \`nums\`.`,
    outputFormat: `Two space-separated integers in ascending order.`,
    sampleInput: `1 2 1 3 2 5`,
    sampleOutput: `3 5`,
    points: 150,
    hints: [
      'XOR all elements together to get a XOR b.',
      'Find any set bit in (a XOR b) (e.g. diff = xor_all & (-xor_all)).',
      'Partition the numbers into two groups based on whether that bit is set, and XOR each group separately.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    nums = list(map(int, sys.stdin.read().split()))
    if not nums: return
    xor_all = 0
    for x in nums:
        xor_all ^= x

    diff = xor_all & (-xor_all)
    a, b = 0, 0
    for x in nums:
        if x & diff:
            a ^= x
        else:
            b ^= x

    res = sorted([a, b])
    print(f"{res[0]} {res[1]}")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const nums = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);
    if (nums.length === 0 || isNaN(nums[0])) return;
    let xorAll = 0;
    for (const x of nums) xorAll ^= x;

    const diff = xorAll & (-xorAll);
    let a = 0, b = 0;
    for (const x of nums) {
        if ((x & diff) !== 0) a ^= x;
        else b ^= x;
    }

    const res = [a, b].sort((x, y) => x - y);
    console.log(\`\${res[0]} \${res[1]}\`);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    nums = list(map(int, sys.stdin.read().split()))
    if not nums: return
    xor_all = 0
    for x in nums:
        xor_all ^= x

    diff = xor_all & (-xor_all)
    a, b = 0, 0
    for x in nums:
        if x & diff:
            a ^= x
        else:
            b ^= x

    res = sorted([a, b])
    print(f"{res[0]} {res[1]}")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const nums = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);
    if (nums.length === 0 || isNaN(nums[0])) return;
    let xorAll = 0;
    for (const x of nums) xorAll ^= x;

    const diff = xorAll & (-xorAll);
    let a = 0, b = 0;
    for (const x of nums) {
        if ((x & diff) !== 0) a ^= x;
        else b ^= x;
    }

    const res = [a, b].sort((x, y) => x - y);
    console.log(\`\${res[0]} \${res[1]}\`);
}

solve();
`,
    },
    editorial: {
      approach: 'XOR Bit Partitioning with Lowest Set Bit',
      algorithm: 'Partition array elements based on differentiating bit from total XOR mask.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'Classic bit manipulation two-element isolation technique.',
      referenceCode: `def single_number_3(nums):
    # bit partitioning
    pass`,
    },
    tags: ['Array', 'Bit Manipulation'],
    testCases: [
      { input: '1 2 1 3 2 5', expectedOutput: '3 5', isHidden: false },
      { input: '-1 0', expectedOutput: '-1 0', isHidden: false },
      { input: '0 1', expectedOutput: '0 1', isHidden: false },
      { input: '100 200 100 300', expectedOutput: '200 300', isHidden: true },
    ],
  },

  // 13. Sum of Two Integers
  {
    title: 'Sum of Two Integers',
    slug: 'sum-of-two-integers',
    description: `Given two integers \`a\` and \`b\`, return the sum of the two integers without using the operators \`+\` and \`-\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `-1000 <= a, b <= 1000`,
    inputFormat: `Line 1: Two space-separated integers \`a b\`.`,
    outputFormat: `Sum integer.`,
    sampleInput: `1 2`,
    sampleOutput: `3`,
    points: 150,
    hints: [
      'Use XOR (a ^ b) for addition without carry.',
      'Use AND and shift ((a & b) << 1) for the carry.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    a, b = int(tokens[0]), int(tokens[1])
    mask = 0xFFFFFFFF
    while b != 0:
        carry = (a & b) & mask
        a = (a ^ b) & mask
        b = (carry << 1) & mask

    if a > 0x7FFFFFFF:
        a = ~(a ^ mask)
    print(a)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    let a = parseInt(tokens[0], 10);
    let b = parseInt(tokens[1], 10);
    while (b !== 0) {
        const carry = a & b;
        a = a ^ b;
        b = carry << 1;
    }
    console.log(a);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    a, b = int(tokens[0]), int(tokens[1])
    mask = 0xFFFFFFFF
    while b != 0:
        carry = (a & b) & mask
        a = (a ^ b) & mask
        b = (carry << 1) & mask

    if a > 0x7FFFFFFF:
        a = ~(a ^ mask)
    print(a)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    let a = parseInt(tokens[0], 10);
    let b = parseInt(tokens[1], 10);
    while (b !== 0) {
        const carry = a & b;
        a = a ^ b;
        b = carry << 1;
    }
    console.log(a);
}

solve();
`,
    },
    editorial: {
      approach: 'Half-Adder Bitwise Simulation',
      algorithm: 'Iterate sum = a ^ b and carry = (a & b) << 1 until carry is 0.',
      timeComplexity: 'O(1) (32 iterations max)',
      spaceComplexity: 'O(1)',
      content: 'Hardware-level arithmetic adder using XOR/AND bitwise operations.',
      referenceCode: `def get_sum(a, b):
    # bit adder
    pass`,
    },
    tags: ['Math', 'Bit Manipulation'],
    testCases: [
      { input: '1 2', expectedOutput: '3', isHidden: false },
      { input: '2 3', expectedOutput: '5', isHidden: false },
      { input: '-1 1', expectedOutput: '0', isHidden: false },
      { input: '-10 -20', expectedOutput: '-30', isHidden: true },
    ],
  },

  // 14. Pascal's Triangle
  {
    title: "Pascal's Triangle",
    slug: 'pascals-triangle',
    description: `Given an integer \`numRows\`, return the first \`numRows\` of **Pascal's triangle**.

In Pascal's triangle, each number is the sum of the two numbers directly above it.

Format output as space-separated integers for each row on a new line.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= numRows <= 30`,
    inputFormat: `Line 1: An integer \`numRows\`.`,
    outputFormat: `\`numRows\` lines representing rows of Pascal's triangle.`,
    sampleInput: `5`,
    sampleOutput: `1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1`,
    points: 100,
    hints: [
      'Each row starts and ends with 1.',
      'Row[i][j] = Row[i-1][j-1] + Row[i-1][j].',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line: return
    n = int(line)
    triangle = []
    for i in range(n):
        row = [1] * (i + 1)
        for j in range(1, i):
            row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]
        triangle.append(row)
        print(' '.join(map(str, row)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const n = parseInt(line, 10);
    const triangle = [];
    for (let i = 0; i < n; i++) {
        const row = new Array(i + 1).fill(1);
        for (let j = 1; j < i; j++) {
            row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
        }
        triangle.push(row);
        console.log(row.join(' '));
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
    triangle = []
    for i in range(n):
        row = [1] * (i + 1)
        for j in range(1, i):
            row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]
        triangle.append(row)
        print(' '.join(map(str, row)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const n = parseInt(line, 10);
    const triangle = [];
    for (let i = 0; i < n; i++) {
        const row = new Array(i + 1).fill(1);
        for (let j = 1; j < i; j++) {
            row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
        }
        triangle.push(row);
        console.log(row.join(' '));
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Iterative Combinatorial Construction',
      algorithm: 'Construct rows row by row using adjacent upper elements.',
      timeComplexity: 'O(numRows^2)',
      spaceComplexity: 'O(numRows^2)',
      content: 'Standard triangular array mathematical construction.',
      referenceCode: `def generate(numRows):
    # triangle generation
    pass`,
    },
    tags: ['Array', 'Dynamic Programming'],
    testCases: [
      { input: '5', expectedOutput: '1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: false },
      { input: '3', expectedOutput: '1\n1 1\n1 2 1', isHidden: true },
    ],
  },

  // 15. Pow(x, n)
  {
    title: 'Pow(x, n)',
    slug: 'powx-n',
    description: `Implement \`pow(x, n)\`, which calculates \`x\` raised to the power \`n\` (\`x^n\`). Format output to 4 decimal places.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `-100.0 < x < 100.0\n-2^31 <= n <= 2^31 - 1\nn is an integer.\n-10^4 <= x^n <= 10^4`,
    inputFormat: `Line 1: Float \`x\` and integer \`n\`.`,
    outputFormat: `Float result with 4 decimal places.`,
    sampleInput: `2.00000 10`,
    sampleOutput: `1024.0000`,
    points: 150,
    hints: [
      'Use binary exponentiation (divide and conquer): x^n = (x^(n/2))^2.',
      'If n is negative, compute 1.0 / pow(x, -n).',
    ],
    codeTemplates: {
      python: `import sys

def my_pow(x, n):
    if n == 0: return 1.0
    if n < 0:
        x = 1.0 / x
        n = -n
    res = 1.0
    cur = x
    while n > 0:
        if n % 2 == 1:
            res *= cur
        cur *= cur
        n //= 2
    return res

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    x = float(tokens[0])
    n = int(tokens[1])
    ans = my_pow(x, n)
    print(f"{ans:.4f}")

solve()
`,
      javascript: `const fs = require('fs');

function myPow(x, n) {
    if (n === 0) return 1.0;
    if (n < 0) {
        x = 1.0 / x;
        n = -n;
    }
    let res = 1.0;
    let cur = x;
    while (n > 0) {
        if (n % 2 === 1) res *= cur;
        cur *= cur;
        n = Math.floor(n / 2);
    }
    return res;
}

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const x = parseFloat(tokens[0]);
    const n = parseInt(tokens[1], 10);
    const ans = myPow(x, n);
    console.log(ans.toFixed(4));
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def my_pow(x, n):
    if n == 0: return 1.0
    if n < 0:
        x = 1.0 / x
        n = -n
    res = 1.0
    cur = x
    while n > 0:
        if n % 2 == 1:
            res *= cur
        cur *= cur
        n //= 2
    return res

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    x = float(tokens[0])
    n = int(tokens[1])
    ans = my_pow(x, n)
    print(f"{ans:.4f}")

solve()
`,
      javascript: `const fs = require('fs');

function myPow(x, n) {
    if (n === 0) return 1.0;
    if (n < 0) {
        x = 1.0 / x;
        n = -n;
    }
    let res = 1.0;
    let cur = x;
    while (n > 0) {
        if (n % 2 === 1) res *= cur;
        cur *= cur;
        n = Math.floor(n / 2);
    }
    return res;
}

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const x = parseFloat(tokens[0]);
    const n = parseInt(tokens[1], 10);
    const ans = myPow(x, n);
    console.log(ans.toFixed(4));
}

solve();
`,
    },
    editorial: {
      approach: 'Fast Binary Exponentiation',
      algorithm: 'Squaring the base in O(log n) steps.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      content: 'Binary exponentiation algorithm.',
      referenceCode: `def my_pow(x, n):
    # binary exp
    pass`,
    },
    tags: ['Math', 'Recursion'],
    testCases: [
      { input: '2.00000 10', expectedOutput: '1024.0000', isHidden: false },
      { input: '2.10000 3', expectedOutput: '9.2610', isHidden: false },
      { input: '2.00000 -2', expectedOutput: '0.2500', isHidden: false },
      { input: '1.00000 2147483647', expectedOutput: '1.0000', isHidden: true },
    ],
  },
];
