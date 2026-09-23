import { Difficulty } from '@prisma/client';

export const pack250ExtMDefs = [
  {
    title: 'Count Primes Sieve of Eratosthenes',
    slug: 'count-primes-sieve-eratosthenes',
    description: `Given an integer $n$, return the number of prime numbers that are strictly less than $n$.

### Constraints
- $0 \\le n \\le 5 \\times 10^6$

### Input Format
- A single integer $n$.

### Output Format
- Return the count of primes strictly less than $n$.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['math', 'sieve', 'number-theory'],
    roadmapLevel: 1,
    roadmapTopic: 'math-for-cp',
    templates: {
      python: `class Solution:\n    def countPrimes(self, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    countPrimes(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def countPrimes(self, n: int) -> int:
        if n <= 2:
            return 0
        is_prime = bytearray([1]) * n
        is_prime[0] = is_prime[1] = 0
        
        limit = int(n**0.5) + 1
        for i in range(2, limit):
            if is_prime[i]:
                is_prime[i*i:n:i] = bytearray([0]) * len(is_prime[i*i:n:i])
                
        return sum(is_prime)`,
      javascript: `class Solution {\n    countPrimes(n) {\n        if (n <= 2) return 0;\n        const isPrime = new Uint8Array(n);\n        isPrime.fill(1);\n        isPrime[0] = 0;\n        isPrime[1] = 0;\n        \n        const limit = Math.floor(Math.sqrt(n));\n        for (let i = 2; i <= limit; i++) {\n            if (isPrime[i]) {\n                for (let j = i * i; j < n; j += i) {\n                    isPrime[j] = 0;\n                }\n            }\n        }\n        \n        let count = 0;\n        for (let i = 2; i < n; i++) {\n            if (isPrime[i]) count++;\n        }\n        return count;\n    }\n}`,
    },
    hints: [
      'Use the classical Sieve of Eratosthenes.',
      'Start marking multiples from i * i onwards.',
      'Time complexity is O(N log log N).',
    ],
    editorial: `### Method Explanation
Sieve of Eratosthenes:
- Initialize boolean array of size $n$ with true.
- Set $0$ and $1$ to false.
- For each prime $p \\le \\sqrt{n}$, mark all composites $p^2, p^2 + p, p^2 + 2p, \\dots < n$ as false.
- Count remaining true entries.

### Complexity
- **Time Complexity:** $O(N \\log \\log N)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '10', expectedOutput: '4', isHidden: false },
      { input: '0', expectedOutput: '0', isHidden: false },
      { input: '1', expectedOutput: '0', isHidden: false },
      { input: '100', expectedOutput: '25', isHidden: true },
      { input: '10000', expectedOutput: '1229', isHidden: true },
    ],
  },
  {
    title: 'Modular Inverse and Combinatorics nCr',
    slug: 'modular-inverse-combinatorics-ncr',
    description: `Given two non-negative integers $n$ and $r$, compute the binomial coefficient $\\binom{n}{r}$ modulo $10^9 + 7$.

### Constraints
- $0 \\le r \\le n \\le 10^5$

### Input Format
- Two integers $n$ and $r$.

### Output Format
- Return the value of $\\binom{n}{r} \\pmod{10^9 + 7}$.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['math', 'combinatorics', 'modular-arithmetic'],
    roadmapLevel: 1,
    roadmapTopic: 'math-for-cp',
    templates: {
      python: `class Solution:\n    def nCrMod(self, n: int, r: int) -> int:\n        pass`,
      javascript: `class Solution {\n    nCrMod(n, r) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def nCrMod(self, n: int, r: int) -> int:
        if r < 0 or r > n:
            return 0
        if r == 0 or r == n:
            return 1
            
        MOD = 10**9 + 7
        
        # Compute fact[n] and fact[r], fact[n-r]
        fact = [1] * (n + 1)
        for i in range(1, n + 1):
            fact[i] = (fact[i - 1] * i) % MOD
            
        num = fact[n]
        den = (fact[r] * fact[n - r]) % MOD
        inv_den = pow(den, MOD - 2, MOD)
        return (num * inv_den) % MOD`,
      javascript: `class Solution {\n    nCrMod(n, r) {\n        if (r < 0 || r > n) return 0;\n        if (r === 0 || r === n) return 1;\n        const MOD = 1000000007n;\n        \n        const fact = new Array(n + 1);\n        fact[0] = 1n;\n        for (let i = 1; i <= n; i++) {\n            fact[i] = (fact[i - 1] * BigInt(i)) % MOD;\n        }\n        \n        const power = (base, exp) => {\n            let res = 1n;\n            base = base % MOD;\n            while (exp > 0n) {\n                if (exp % 2n === 1n) res = (res * base) % MOD;\n                base = (base * base) % MOD;\n                exp /= 2n;\n            }\n            return res;\n        };\n        \n        const num = fact[n];\n        const den = (fact[r] * fact[n - r]) % MOD;\n        const invDen = power(den, MOD - 2n);\n        return Number((num * invDen) % MOD);\n    }\n}`,
    },
    hints: [
      'Use Fermat\'s Little Theorem for modular inverse: a^(p-2) = a^(-1) mod p for prime p.',
      'Compute factorials fact[n], fact[r], and fact[n-r] modulo 10^9 + 7.',
    ],
    editorial: `### Method Explanation
Using Fermat's Little Theorem:
- Since $MOD = 10^9 + 7$ is prime, the modular multiplicative inverse of $x$ is $x^{MOD - 2} \\pmod{MOD}$.
- $\\binom{n}{r} = \\frac{n!}{r!(n-r)!} \\equiv n! \\cdot (r!(n-r)!)^{MOD-2} \\pmod{MOD}$.

### Complexity
- **Time Complexity:** $O(N + \\log MOD)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '5, 2', expectedOutput: '10', isHidden: false },
      { input: '10, 3', expectedOutput: '120', isHidden: false },
      { input: '100, 50', expectedOutput: '538992043', isHidden: false },
      { input: '1000, 0', expectedOutput: '1', isHidden: true },
      { input: '10000, 5000', expectedOutput: '2413012', isHidden: true },
    ],
  },
  {
    title: 'Euler Totient Function Phi',
    slug: 'euler-totient-function-phi',
    description: `Given a positive integer $n$, compute Euler's Totient function $\\phi(n)$, which counts the number of positive integers up to $n$ that are relatively prime to $n$ (i.e. $\\gcd(k, n) = 1$ for $1 \\le k \\le n$).

### Constraints
- $1 \\le n \\le 10^9$

### Input Format
- A single integer $n$.

### Output Format
- Return the integer value $\\phi(n)$.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['math', 'number-theory'],
    roadmapLevel: 1,
    roadmapTopic: 'math-for-cp',
    templates: {
      python: `class Solution:\n    def phi(self, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    phi(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def phi(self, n: int) -> int:
        result = n
        p = 2
        while p * p <= n:
            if n % p == 0:
                while n % p == 0:
                    n //= p
                result -= result // p
            p += 1
        if n > 1:
            result -= result // n
        return result`,
      javascript: `class Solution {\n    phi(n) {\n        let result = n;\n        let p = 2;\n        while (p * p <= n) {\n            if (n % p === 0) {\n                while (n % p === 0) {\n                    n = Math.floor(n / p);\n                }\n                result -= Math.floor(result / p);\n            }\n            p++;\n        }\n        if (n > 1) {\n            result -= Math.floor(result / n);\n        }\n        return result;\n    }\n}`,
    },
    hints: [
      'Euler product formula: phi(n) = n * prod_{p | n} (1 - 1/p).',
      'Factorize n in O(sqrt(n)) time.',
    ],
    editorial: `### Method Explanation
Euler's Totient Product Formula:
$$\\phi(n) = n \\prod_{p \\mid n} \\left(1 - \\frac{1}{p}\\right)$$
We iterate through all prime factors $p \\le \\sqrt{n}$. For each prime factor, we divide it out completely and multiply the result by $(1 - 1/p) \\iff result -= result / p$.

### Complexity
- **Time Complexity:** $O(\\sqrt{N})$.
- **Space Complexity:** $O(1)$.`,
    testCases: [
      { input: '9', expectedOutput: '6', isHidden: false },
      { input: '36', expectedOutput: '12', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: false },
      { input: '1000000007', expectedOutput: '1000000006', isHidden: true },
    ],
  },
  {
    title: 'Sum of Divisors for All Numbers up to N',
    slug: 'sum-of-divisors-all-numbers',
    description: `Given a positive integer $n$, compute the sum of the sum of divisors for all numbers from $1$ to $n$:
$$F(n) = \\sum_{i=1}^n \\sigma(i)$$
where $\\sigma(i)$ is the sum of all positive divisors of $i$.

Since the answer can be large, return it modulo $10^9 + 7$.

### Constraints
- $1 \\le n \\le 10^9$

### Input Format
- A single integer $n$.

### Output Format
- Return the total sum of divisors modulo $10^9 + 7$.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['math', 'number-theory', 'square-root-decomposition'],
    roadmapLevel: 1,
    roadmapTopic: 'math-for-cp',
    templates: {
      python: `class Solution:\n    def sumOfDivisors(self, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    sumOfDivisors(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def sumOfDivisors(self, n: int) -> int:
        MOD = 10**9 + 7
        ans = 0
        l = 1
        
        while l <= n:
            q = n // l
            r = n // q # maximum right bound where floor(n / i) == q
            
            # Sum of numbers from l to r: (r - l + 1) * (l + r) / 2
            count = r - l + 1
            sum_lr = (count * (l + r) // 2) % MOD
            ans = (ans + sum_lr * q) % MOD
            l = r + 1
            
        return ans`,
      javascript: `class Solution {\n    sumOfDivisors(n) {\n        const MOD = 1000000007n;\n        const bigN = BigInt(n);\n        let ans = 0n;\n        let l = 1n;\n        \n        while (l <= bigN) {\n            const q = bigN / l;\n            const r = bigN / q;\n            const count = r - l + 1n;\n            const sumLR = (count * (l + r) / 2n) % MOD;\n            ans = (ans + sumLR * q) % MOD;\n            l = r + 1n;\n        }\n        return Number(ans);\n    }\n}`,
    },
    hints: [
      'Each integer d appears as a divisor in exactly floor(n / d) multiples <= n.',
      'Sum is sum_{d=1}^n d * floor(n / d).',
      'Use square root chunking (hyperbola method) since floor(n / d) takes at most 2*sqrt(n) distinct values.',
    ],
    editorial: `### Method Explanation
Square Root Chunking (Divisor Analysis):
- Number of times $d$ appears as a divisor is $\\lfloor n / d \\rfloor$.
- Total sum $= \\sum_{d=1}^n d \\cdot \\lfloor n / d \\rfloor$.
- The value $q = \\lfloor n / d \\rfloor$ changes only $2\\sqrt{n}$ times. For a range $[l, r]$ where $\\lfloor n / d \\rfloor = q$, we have $r = \\lfloor n / q \\rfloor$.
- Sum of $d$ in $[l, r]$ is an arithmetic progression: $\\frac{(l + r)(r - l + 1)}{2}$.

### Complexity
- **Time Complexity:** $O(\\sqrt{N})$.
- **Space Complexity:** $O(1)$.`,
    testCases: [
      { input: '4', expectedOutput: '15', isHidden: false },
      { input: '5', expectedOutput: '21', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: false },
      { input: '100', expectedOutput: '8299', isHidden: true },
      { input: '1000000000', expectedOutput: '355091432', isHidden: true },
    ],
  },
  {
    title: 'Super Pow Modular Exponentiation',
    slug: 'super-pow-modular-exponentiation',
    description: `Your task is to calculate $a^b \\pmod{1337}$ where $a$ is a positive integer and $b$ is an extremely large positive integer given in the form of an array of digits.

### Constraints
- $1 \\le a \\le 2^{31} - 1$
- $1 \\le b.length \\le 2000$
- $0 \\le b[i] \\le 9$
- $b$ does not contain leading zeros.

### Input Format
- An integer $a$ and an integer array $b$.

### Output Format
- Return $a^b \\pmod{1337}$.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['math', 'modular-arithmetic', 'recursion'],
    roadmapLevel: 1,
    roadmapTopic: 'math-for-cp',
    templates: {
      python: `class Solution:\n    def superPow(self, a: int, b: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    superPow(a, b) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def superPow(self, a: int, b: list[int]) -> int:
        MOD = 1337
        a %= MOD
        
        # a^[b0, b1, ... bk] = (a^[b0, ... bk-1])^10 * a^bk
        ans = 1
        for digit in b:
            ans = (pow(ans, 10, MOD) * pow(a, digit, MOD)) % MOD
            
        return ans`,
      javascript: `class Solution {\n    superPow(a, b) {\n        const MOD = 1337;\n        a %= MOD;\n        \n        const powMod = (base, exp) => {\n            let res = 1;\n            base %= MOD;\n            while (exp > 0) {\n                if (exp % 2 === 1) res = (res * base) % MOD;\n                base = (base * base) % MOD;\n                exp = Math.floor(exp / 2);\n            }\n            return res;\n        };\n        \n        let ans = 1;\n        for (const digit of b) {\n            ans = (powMod(ans, 10) * powMod(a, digit)) % MOD;\n        }\n        return ans;\n    }\n}`,
    },
    hints: [
      'Use Horner\'s rule for exponents: a^[d1, d2, d3] = ((a^d1)^10 * a^d2)^10 * a^d3.',
      'At each digit, raise previous accumulated power to 10 and multiply by a^digit mod 1337.',
    ],
    editorial: `### Method Explanation
Horner's method for big-endian digit processing:
- Given digits $b = [d_1, d_2, \\dots, d_m]$:
- $b = 10 \\cdot (\\dots (10 \\cdot d_1 + d_2) \\dots) + d_m$.
- Therefore, $a^b = (((a^{d_1})^{10} \\cdot a^{d_2})^{10} \\dots ) \\cdot a^{d_m} \\pmod{1337}$.

### Complexity
- **Time Complexity:** $O(|b| \\log(10)) = O(|b|)$.
- **Space Complexity:** $O(1)$.`,
    testCases: [
      { input: '2, [3]', expectedOutput: '8', isHidden: false },
      { input: '2, [1,0]', expectedOutput: '1024', isHidden: false },
      { input: '1, [4,3,3,8,5,2]', expectedOutput: '1', isHidden: false },
      { input: '2147483647, [2,0,0]', expectedOutput: '1198', isHidden: true },
    ],
  },
  {
    title: 'Consecutive Numbers Sum',
    slug: 'consecutive-numbers-sum',
    description: `Given an integer $n$, return the number of ways you can write $n$ as the sum of consecutive positive integers.

### Constraints
- $1 \\le n \\le 10^9$

### Input Format
- A single integer $n$.

### Output Format
- Return the number of ways.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['math', 'number-theory'],
    roadmapLevel: 1,
    roadmapTopic: 'math-for-cp',
    templates: {
      python: `class Solution:\n    def consecutiveNumbersSum(self, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    consecutiveNumbersSum(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def consecutiveNumbersSum(self, n: int) -> int:
        # Sum of k consecutive integers starting at x:
        # k*x + k*(k-1)/2 = n  =>  k*x = n - k*(k-1)/2
        # So (n - k*(k-1)/2) must be divisible by k and > 0
        ans = 0
        k = 1
        while True:
            sub = k * (k - 1) // 2
            if sub >= n:
                break
            if (n - sub) % k == 0:
                ans += 1
            k += 1
        return ans`,
      javascript: `class Solution {\n    consecutiveNumbersSum(n) {\n        let ans = 0;\n        let k = 1;\n        while (true) {\n            const sub = Math.floor((k * (k - 1)) / 2);\n            if (sub >= n) break;\n            if ((n - sub) % k === 0) ans++;\n            k++;\n        }\n        return ans;\n    }\n}`,
    },
    hints: [
      'A sum of k consecutive integers starting at x is k * x + k * (k - 1) / 2 = n.',
      'Hence k * x = n - k * (k - 1) / 2. For x to be a positive integer, (n - k * (k - 1) / 2) must be divisible by k and > 0.',
      'Check k up to sqrt(2n).',
    ],
    editorial: `### Method Explanation
Algebraic formulation:
$$n = x + (x + 1) + \\dots + (x + k - 1) = kx + \\frac{k(k - 1)}{2}$$
$$kx = n - \\frac{k(k - 1)}{2}$$
For a valid start $x \\ge 1$, we must have:
1. $n - \\frac{k(k-1)}{2} > 0 \\implies k < \\sqrt{2n}$.
2. $(n - \\frac{k(k-1)}{2}) \\pmod{k} == 0$.

### Complexity
- **Time Complexity:** $O(\\sqrt{N})$.
- **Space Complexity:** $O(1)$.`,
    testCases: [
      { input: '5', expectedOutput: '2', isHidden: false },
      { input: '9', expectedOutput: '3', isHidden: false },
      { input: '15', expectedOutput: '4', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: true },
      { input: '1000000000', expectedOutput: '10', isHidden: true },
    ],
  },
  {
    title: 'Extended Euclidean Algorithm and Bezout',
    slug: 'extended-euclidean-algorithm-bezout',
    description: `Given two positive integers $a$ and $b$, compute the greatest common divisor $g = \\gcd(a, b)$ and Bézout coefficients $(x, y)$ such that:
$$a \\cdot x + b \\cdot y = g$$

Return an array $[g, x, y]$. If there are multiple solutions, return the one where $|x| + |y|$ is minimized.

### Constraints
- $1 \\le a, b \\le 10^9$

### Input Format
- Two integers $a$ and $b$.

### Output Format
- Return an array of three integers $[g, x, y]$.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['math', 'number-theory', 'gcd'],
    roadmapLevel: 1,
    roadmapTopic: 'math-for-cp',
    templates: {
      python: `class Solution:\n    def extGCD(self, a: int, b: int) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    extGCD(a, b) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def extGCD(self, a: int, b: int) -> list[int]:
        def extended_gcd(a, b):
            if b == 0:
                return a, 1, 0
            g, x1, y1 = extended_gcd(b, a % b)
            x = y1
            y = x1 - (a // b) * y1
            return g, x, y
            
        g, x, y = extended_gcd(a, b)
        return [g, x, y]`,
      javascript: `class Solution {\n    extGCD(a, b) {\n        const extendedGcd = (a, b) => {\n            if (b === 0) return [a, 1, 0];\n            const [g, x1, y1] = extendedGcd(b, a % b);\n            const x = y1;\n            const y = x1 - Math.floor(a / b) * y1;\n            return [g, x, y];\n        };\n        return extendedGcd(a, b);\n    }\n}`,
    },
    hints: [
      'Use the recursive Extended Euclidean Algorithm.',
      'Base case: when b = 0, gcd is a and x = 1, y = 0.',
      'Transition: x = y1, y = x1 - (a // b) * y1.',
    ],
    editorial: `### Method Explanation
Extended Euclidean Algorithm:
- At each recursive step:
  $$a \\cdot x + b \\cdot y = \\gcd(a, b)$$
  Since $a = \\lfloor a / b \\rfloor b + (a \\pmod b)$, substituting gives the recurrence:
  $$x = y_1, \\quad y = x_1 - \\lfloor a / b \\rfloor y_1$$
- Base case $b = 0 \\implies g = a, x = 1, y = 0$.

### Complexity
- **Time Complexity:** $O(\\log(\\min(a, b)))$.
- **Space Complexity:** $O(\\log(\\min(a, b)))$ recursion stack.`,
    testCases: [
      { input: '35, 15', expectedOutput: '[5,1,-2]', isHidden: false },
      { input: '10, 6', expectedOutput: '[2,-1,2]', isHidden: false },
      { input: '1, 1', expectedOutput: '[1,0,1]', isHidden: true },
      { input: '252, 105', expectedOutput: '[21,-2,5]', isHidden: true },
    ],
  },
  {
    title: 'Fibonacci Matrix Exponentiation Modulo M',
    slug: 'fibonacci-matrix-exponentiation-modulo-m',
    description: `Compute the $n$-th Fibonacci number $F_n$ modulo $10^9 + 7$, where:
- $F_0 = 0$
- $F_1 = 1$
- $F_n = F_{n-1} + F_{n-2}$ for $n \\ge 2$

Solve this in $O(\\log n)$ time using $2 \\times 2$ matrix exponentiation.

### Constraints
- $0 \\le n \\le 10^{18}$

### Input Format
- A single integer $n$.

### Output Format
- Return $F_n \\pmod{10^9 + 7}$.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['math', 'matrix-exponentiation', 'divide-and-conquer'],
    roadmapLevel: 1,
    roadmapTopic: 'math-for-cp',
    templates: {
      python: `class Solution:\n    def fibonacci(self, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    fibonacci(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def fibonacci(self, n: int) -> int:
        if n == 0:
            return 0
        if n == 1:
            return 1
            
        MOD = 10**9 + 7
        
        def mat_mul(A, B):
            return [
                [(A[0][0]*B[0][0] + A[0][1]*B[1][0]) % MOD, (A[0][0]*B[0][1] + A[0][1]*B[1][1]) % MOD],
                [(A[1][0]*B[0][0] + A[1][1]*B[1][0]) % MOD, (A[1][0]*B[0][1] + A[1][1]*B[1][1]) % MOD]
            ]
            
        def mat_pow(M, p):
            res = [[1, 0], [0, 1]] # Identity
            base = M
            while p > 0:
                if p % 2 == 1:
                    res = mat_mul(res, base)
                base = mat_mul(base, base)
                p //= 2
            return res
            
        # [[F(n+1), F(n)], [F(n), F(n-1)]] = [[1, 1], [1, 0]]^n
        T = [[1, 1], [1, 0]]
        res_mat = mat_pow(T, n)
        return res_mat[0][1]`,
      javascript: `class Solution {\n    fibonacci(n) {\n        if (n === 0) return 0;\n        if (n === 1) return 1;\n        const MOD = 1000000007n;\n        \n        const matMul = (A, B) => [\n            [\n                (A[0][0]*B[0][0] + A[0][1]*B[1][0]) % MOD,\n                (A[0][0]*B[0][1] + A[0][1]*B[1][1]) % MOD\n            ],\n            [\n                (A[1][0]*B[0][0] + A[1][1]*B[1][0]) % MOD,\n                (A[1][0]*B[0][1] + A[1][1]*B[1][1]) % MOD\n            ]\n        ];\n        \n        let res = [[1n, 0n], [0n, 1n]];\n        let base = [[1n, 1n], [1n, 0n]];\n        let p = BigInt(n);\n        \n        while (p > 0n) {\n            if (p % 2n === 1n) res = matMul(res, base);\n            base = matMul(base, base);\n            p /= 2n;\n        }\n        return Number(res[0][1]);\n    }\n}`,
    },
    hints: [
      'The Fibonacci transition matrix is M = [[1, 1], [1, 0]].',
      'M^n gives [[F(n+1), F(n)], [F(n), F(n-1)]].',
      'Compute M^n using binary exponentiation in O(log n) matrix multiplications.',
    ],
    editorial: `### Method Explanation
Matrix Exponentiation for Linear Recurrence:
$$\\begin{pmatrix} F_{n+1} \\\\ F_n \\end{pmatrix} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 0 \\end{pmatrix} \\begin{pmatrix} F_n \\\\ F_{n-1} \\end{pmatrix} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 0 \\end{pmatrix}^n \\begin{pmatrix} F_1 \\\\ F_0 \\end{pmatrix}$$
Using binary exponentiation on the $2 \\times 2$ matrix, $M^n$ is computed in $O(\\log n)$ matrix multiplications.

### Complexity
- **Time Complexity:** $O(\\log N)$.
- **Space Complexity:** $O(1)$.`,
    testCases: [
      { input: '2', expectedOutput: '1', isHidden: false },
      { input: '3', expectedOutput: '2', isHidden: false },
      { input: '4', expectedOutput: '3', isHidden: false },
      { input: '10', expectedOutput: '55', isHidden: true },
      { input: '100', expectedOutput: '687995182', isHidden: true },
      { input: '1000000000', expectedOutput: '21', isHidden: true },
    ],
  },
  {
    title: 'Smallest Good Base',
    slug: 'smallest-good-base',
    description: `Given an integer $n$ represented as a string, return the smallest good base of $n$.

We call $k \\ge 2$ a good base of $n$, if all digits of $n$ base $k$ are $1$ (i.e. $n = k^0 + k^1 + \\dots + k^{m-1} = \\frac{k^m - 1}{k - 1}$).

### Constraints
- $n$ is an integer in the range $[3, 10^{18}]$.
- $n$ does not contain any leading zeros.

### Input Format
- A string $n$.

### Output Format
- Return the smallest good base as a string.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['math', 'binary-search'],
    roadmapLevel: 1,
    roadmapTopic: 'math-for-cp',
    templates: {
      python: `class Solution:\n    def smallestGoodBase(self, n: str) -> str:\n        pass`,
      javascript: `class Solution {\n    smallestGoodBase(n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def smallestGoodBase(self, n: str) -> str:
        num = int(n)
        # Length of 1-string m: 2 <= m <= 62
        for m in range(62, 1, -1):
            # n ~ k^(m - 1) => estimate k = int(num ** (1 / (m - 1)))
            k = int(num ** (1.0 / (m - 1)))
            if k >= 2:
                # evaluate 1 + k + k^2 + ... + k^(m - 1)
                val = 0
                for _ in range(m):
                    val = val * k + 1
                if val == num:
                    return str(k)
        return str(num - 1)`,
      javascript: `class Solution {\n    smallestGoodBase(n) {\n        const num = BigInt(n);\n        for (let m = 62; m >= 2; m--) {\n            const k = BigInt(Math.floor(Math.pow(Number(num), 1.0 / (m - 1))));\n            if (k >= 2n) {\n                let val = 0n;\n                for (let i = 0; i < m; i++) {\n                    val = val * k + 1n;\n                }\n                if (val === num) return k.toString();\n            }\n        }\n        return (num - 1n).toString();\n    }\n}`,
    },
    hints: [
      'The number of 1s in base k representation m satisfies 2 <= m <= 63.',
      'Iterate m downwards from 62 to 2 to find the smallest good base k.',
      'For each m, compute k = floor(n^(1/(m-1))) and check if the geometric series matches n.',
    ],
    editorial: `### Method Explanation
Geometric series representation:
$$n = 1 + k + k^2 + \\dots + k^{m-1}$$
Since $k \\ge 2$, the maximum number of terms $m \\le \\log_2(10^{18}) \\approx 62$.
- Iterate $m$ from $62$ down to $2$.
- Estimate candidate base $k = \\lfloor n^{1/(m-1)} \\rfloor$.
- Verify if $\\sum_{i=0}^{m-1} k^i == n$.
- The first match found with largest $m$ corresponds to the smallest base $k$.

### Complexity
- **Time Complexity:** $O(\\log^2 N)$.
- **Space Complexity:** $O(1)$.`,
    testCases: [
      { input: '"13"', expectedOutput: '"3"', isHidden: false },
      { input: '"4681"', expectedOutput: '"8"', isHidden: false },
      { input: '"1000000000000000000"', expectedOutput: '"999999999999999999"', isHidden: false },
      { input: '"3"', expectedOutput: '"2"', isHidden: true },
    ],
  },
  {
    title: 'Fast Modular Exponentiation Binary Exponentiation',
    slug: 'fast-modular-exponentiation-binary',
    description: `Given three positive integers $a$, $b$, and $mod$, compute:
$$(a^b) \\pmod{mod}$$
using the binary exponentiation algorithm in $O(\\log b)$ time.

### Constraints
- $1 \\le a, mod \\le 10^9$
- $0 \\le b \\le 10^{18}$

### Input Format
- Three integers $a$, $b$, and $mod$.

### Output Format
- Return $(a^b) \\pmod{mod}$.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['math', 'binary-exponentiation', 'modular-arithmetic'],
    roadmapLevel: 1,
    roadmapTopic: 'math-for-cp',
    templates: {
      python: `class Solution:\n    def modPow(self, a: int, b: int, mod: int) -> int:\n        pass`,
      javascript: `class Solution {\n    modPow(a, b, mod) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def modPow(self, a: int, b: int, mod: int) -> int:
        res = 1
        a %= mod
        while b > 0:
            if b % 2 == 1:
                res = (res * a) % mod
            a = (a * a) % mod
            b //= 2
        return res`,
      javascript: `class Solution {\n    modPow(a, b, mod) {\n        const bigMod = BigInt(mod);\n        let res = 1n;\n        let base = BigInt(a) % bigMod;\n        let exp = BigInt(b);\n        \n        while (exp > 0n) {\n            if (exp % 2n === 1n) res = (res * base) % bigMod;\n            base = (base * base) % bigMod;\n            exp /= 2n;\n        }\n        return Number(res);\n    }\n}`,
    },
    hints: [
      'Square the base and halve the exponent at each step.',
      'If exponent is odd, multiply result by current base mod.',
    ],
    editorial: `### Method Explanation
Binary Exponentiation (Exponentiation by Squaring):
- Decompose exponent $b$ into binary bits.
- Repeatedly square $a = (a \\times a) \\pmod{mod}$.
- When $b$ is odd, accumulate $res = (res \\times a) \\pmod{mod}$.

### Complexity
- **Time Complexity:** $O(\\log b)$.
- **Space Complexity:** $O(1)$.`,
    testCases: [
      { input: '2, 10, 1000', expectedOutput: '24', isHidden: false },
      { input: '3, 0, 7', expectedOutput: '1', isHidden: false },
      { input: '7, 1000000000000000000, 1000000007', expectedOutput: '259616729', isHidden: true },
    ],
  },
];
