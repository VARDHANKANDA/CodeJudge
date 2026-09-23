import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack500PartEDefs: ProblemDef[] = [
  {
    "title": "Chinese Remainder Theorem System Solver",
    "slug": "chinese-remainder-theorem",
    "description": "Given two arrays `num` and `rem` where `num` contains pairwise coprime positive integers, find the smallest positive integer `x` such that `x % num[i] == rem[i]` for all `i`. Return `x % prod(num)`.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= num.length <= 10\n1 <= num[i] <= 100\n0 <= rem[i] < num[i]\nAll elements in num are pairwise coprime.",
    "inputFormat": "num, rem",
    "outputFormat": "Integer x.",
    "sampleInput": "[3, 5, 7], [2, 3, 2]",
    "sampleOutput": "23",
    "points": 200,
    "hints": [
      "Compute the total product M = prod(num).",
      "For each index i, compute M_i = M // num[i].",
      "Find the modular inverse of M_i modulo num[i] using the Extended Euclidean Algorithm.",
      "Sum rem[i] * M_i * inv_i and take modulo M."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def solveCRT(self, num: list[int], rem: list[int]) -> int:\n        pass",
      "javascript": "class Solution {\n    solveCRT(num, rem) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def solveCRT(self, num: list[int], rem: list[int]) -> int:\n        def ext_gcd(a, b):\n            if b == 0:\n                return a, 1, 0\n            g, x1, y1 = ext_gcd(b, a % b)\n            x = y1\n            y = x1 - (a // b) * y1\n            return g, x, y\n        \n        M = 1\n        for x in num:\n            M *= x\n            \n        ans = 0\n        for n_i, r_i in zip(num, rem):\n            M_i = M // n_i\n            _, inv, _ = ext_gcd(M_i, n_i)\n            inv = (inv % n_i + n_i) % n_i\n            ans = (ans + r_i * M_i * inv) % M\n            \n        return ans % M",
      "javascript": "class Solution {\n    solveCRT(num, rem) {\n        function extGcd(a, b) {\n            if (b === 0) return [a, 1, 0];\n            const [g, x1, y1] = extGcd(b, a % b);\n            return [g, y1, x1 - Math.floor(a / b) * y1];\n        }\n        \n        let M = 1;\n        for (const x of num) M *= x;\n        \n        let ans = 0;\n        for (let i = 0; i < num.length; i++) {\n            const n_i = num[i];\n            const r_i = rem[i];\n            const M_i = Math.floor(M / n_i);\n            let [, inv] = extGcd(M_i, n_i);\n            inv = ((inv % n_i) + n_i) % n_i;\n            ans = (ans + r_i * M_i * inv) % M;\n        }\n        return ((ans % M) + M) % M;\n    }\n}"
    },
    "editorial": {
      "approach": "Chinese Remainder Theorem via modular inverses.",
      "algorithm": "Construct explicit solution using x = sum(rem_i * M_i * inv_i) mod M.",
      "timeComplexity": "O(K * log(max_N))",
      "spaceComplexity": "O(1)",
      "content": "Standard number theoretic theorem for solving systems of simultaneous linear congruences.",
      "referenceCode": "def solveCRT(num: list[int], rem: list[int]) -> int: ..."
    },
    "tags": [
      "Math",
      "Number Theory",
      "Chinese Remainder Theorem"
    ],
    "testCases": [
      {
        "input": "[3, 5, 7], [2, 3, 2]",
        "expectedOutput": "23",
        "isHidden": false
      },
      {
        "input": "[5, 7], [1, 3]",
        "expectedOutput": "31",
        "isHidden": false
      },
      {
        "input": "[2, 3], [1, 2]",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "input": "[11, 13], [3, 5]",
        "expectedOutput": "70",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Miller-Rabin Deterministic Primality Test",
    "slug": "miller-rabin-primality-test",
    "description": "Given an integer `n`, determine whether `n` is prime using a deterministic Miller-Rabin test for numbers up to 2^63 - 1.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 10^14",
    "inputFormat": "n",
    "outputFormat": "Boolean true if prime, false otherwise.",
    "sampleInput": "1000000007",
    "sampleOutput": "true",
    "points": 200,
    "hints": [
      "For n < 2, return false. For n = 2 or 3, return true. If n % 2 == 0, return false.",
      "Write n - 1 as 2^s * d with d odd.",
      "Test small prime bases [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37] using binary exponentiation."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def isPrime(self, n: int) -> bool:\n        pass",
      "javascript": "class Solution {\n    isPrime(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def isPrime(self, n: int) -> bool:\n        if n < 2:\n            return False\n        if n in (2, 3):\n            return True\n        if n % 2 == 0:\n            return False\n            \n        d = n - 1\n        s = 0\n        while d % 2 == 0:\n            d //= 2\n            s += 1\n            \n        bases = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]\n        for a in bases:\n            if n <= a:\n                break\n            x = pow(a, d, n)\n            if x == 1 or x == n - 1:\n                continue\n            composite = True\n            for _ in range(s - 1):\n                x = pow(x, 2, n)\n                if x == n - 1:\n                    composite = False\n                    break\n            if composite:\n                return False\n        return True",
      "javascript": "class Solution {\n    isPrime(n) {\n        const num = BigInt(n);\n        if (num < 2n) return false;\n        if (num === 2n || num === 3n) return true;\n        if (num % 2n === 0n) return false;\n        \n        let d = num - 1n;\n        let s = 0n;\n        while (d % 2n === 0n) {\n            d /= 2n;\n            s += 1n;\n        }\n        \n        function modPow(base, exp, mod) {\n            let res = 1n;\n            base = base % mod;\n            while (exp > 0n) {\n                if (exp % 2n === 1n) res = (res * base) % mod;\n                base = (base * base) % mod;\n                exp /= 2n;\n            }\n            return res;\n        }\n        \n        const bases = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];\n        for (const a of bases) {\n            if (num <= a) break;\n            let x = modPow(a, d, num);\n            if (x === 1n || x === num - 1n) continue;\n            let composite = true;\n            for (let r = 1n; r < s; r++) {\n                x = (x * x) % num;\n                if (x === num - 1n) {\n                    composite = false;\n                    break;\n                }\n            }\n            if (composite) return false;\n        }\n        return true;\n    }\n}"
    },
    "editorial": {
      "approach": "Deterministic Miller-Rabin probabilistic test across prime witnesses.",
      "algorithm": "Decompose n-1 = d * 2^s. Check quadratic residues for known deterministic base sets.",
      "timeComplexity": "O(k * log^3 n)",
      "spaceComplexity": "O(1)",
      "content": "The first 12 primes form a deterministic witness set for all integers up to 2^64.",
      "referenceCode": "def isPrime(n: int) -> bool: ..."
    },
    "tags": [
      "Math",
      "Number Theory",
      "Primality Test",
      "Miller-Rabin"
    ],
    "testCases": [
      {
        "input": "1000000007",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "4",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "false",
        "isHidden": true
      },
      {
        "input": "27644437",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Extended GCD & Linear Diophantine Equation",
    "slug": "extended-gcd-linear-diophantine",
    "description": "Given integers `a`, `b`, and `c`, find integers `x` and `y` such that `a * x + b * y = c`. If no integer solution exists, return `[]`. If multiple solutions exist, return the solution `[x, y]` where `|x| + |y|` is minimal, breaking ties with smallest `x`.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "-10^9 <= a, b, c <= 10^9\n(a, b) != (0, 0)",
    "inputFormat": "a, b, c",
    "outputFormat": "List [x, y] or empty list.",
    "sampleInput": "3, 5, 11",
    "sampleOutput": "[2, 1]",
    "points": 200,
    "hints": [
      "A solution exists if and only if c % gcd(a, b) == 0.",
      "Use Extended Euclidean algorithm to find a base solution x0, y0 for a * x + b * y = gcd(a, b).",
      "Scale by c // gcd(a, b). General solutions are given by x = x0 + k * (b / g), y = y0 - k * (a / g)."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def findSolution(self, a: int, b: int, c: int) -> list[int]:\n        pass",
      "javascript": "class Solution {\n    findSolution(a, b, c) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "import math\n\nclass Solution:\n    def findSolution(self, a: int, b: int, c: int) -> list[int]:\n        def extgcd(a, b):\n            if b == 0:\n                return a, 1, 0\n            g, x1, y1 = extgcd(b, a % b)\n            return g, y1, x1 - (a // b) * y1\n            \n        g, x0, y0 = extgcd(abs(a), abs(b))\n        if c % g != 0:\n            return []\n            \n        scale = c // g\n        x0 *= scale * (1 if a >= 0 else -1)\n        y0 *= scale * (1 if b >= 0 else -1)\n        \n        step_x = b // g\n        step_y = - (a // g)\n        \n        # Check nearby k values around 0\n        best = None\n        # Approximate k to minimize |x0 + k*step_x| + |y0 + k*step_y|\n        k_est = -x0 // step_x if step_x != 0 else 0\n        for k in range(k_est - 5, k_est + 6):\n            cur_x = x0 + k * step_x\n            cur_y = y0 + k * step_y\n            cost = abs(cur_x) + abs(cur_y)\n            if best is None or cost < best[0] or (cost == best[0] and cur_x < best[1]):\n                best = (cost, cur_x, cur_y)\n        return [best[1], best[2]]",
      "javascript": "class Solution {\n    findSolution(a, b, c) {\n        function extgcd(a, b) {\n            if (b === 0) return [a, 1, 0];\n            const [g, x1, y1] = extgcd(b, a % b);\n            return [g, y1, x1 - Math.floor(a / b) * y1];\n        }\n        \n        const [g, x_base, y_base] = extgcd(Math.abs(a), Math.abs(b));\n        if (c % g !== 0) return [];\n        \n        const scale = c / g;\n        let x0 = x_base * scale * (a >= 0 ? 1 : -1);\n        let y0 = y_base * scale * (b >= 0 ? 1 : -1);\n        \n        const step_x = Math.floor(b / g);\n        const step_y = -Math.floor(a / g);\n        \n        let best = null;\n        const k_est = step_x !== 0 ? Math.floor(-x0 / step_x) : 0;\n        for (let k = k_est - 5; k <= k_est + 5; k++) {\n            const cur_x = x0 + k * step_x;\n            const cur_y = y0 + k * step_y;\n            const cost = Math.abs(cur_x) + Math.abs(cur_y);\n            if (!best || cost < best.cost || (cost === best.cost && cur_x < best.x)) {\n                best = { cost, x: cur_x, y: cur_y };\n            }\n        }\n        return [best.x, best.y];\n    }\n}"
    },
    "editorial": {
      "approach": "Bézout's identity via Extended Euclidean Algorithm.",
      "algorithm": "Find gcd(a,b). Check divisibility of c. Shift base solution using shift parameter k to minimize L1 norm.",
      "timeComplexity": "O(log(min(|a|, |b|)))",
      "spaceComplexity": "O(1)",
      "content": "Classic Diophantine equation solver with norm minimization.",
      "referenceCode": "def findSolution(a: int, b: int, c: int) -> list[int]: ..."
    },
    "tags": [
      "Math",
      "Number Theory",
      "Extended GCD"
    ],
    "testCases": [
      {
        "input": "3, 5, 11",
        "expectedOutput": "[2, 1]",
        "isHidden": false
      },
      {
        "input": "2, 4, 5",
        "expectedOutput": "[]",
        "isHidden": false
      },
      {
        "input": "1, 1, 10",
        "expectedOutput": "[0, 10]",
        "isHidden": true
      },
      {
        "input": "6, 9, 15",
        "expectedOutput": "[1, 1]",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Matrix Exponentiation for N-th Tribonacci",
    "slug": "matrix-exponentiation-tribonacci",
    "description": "The Tribonacci sequence Tn is defined as: T0 = 0, T1 = 1, T2 = 1, and Tn = Tn-1 + Tn-2 + Tn-3 for n >= 3. Given `n`, return Tn modulo 10^9 + 7 using matrix fast exponentiation.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "0 <= n <= 10^9",
    "inputFormat": "n",
    "outputFormat": "Tn % 1000000007.",
    "sampleInput": "4",
    "sampleOutput": "4",
    "points": 150,
    "hints": [
      "Express the transition vector [T(n+1), T(n), T(n-1)]^T = M * [T(n), T(n-1), T(n-2)]^T.",
      "The transformation matrix M is [[1, 1, 1], [1, 0, 0], [0, 1, 0]].",
      "Compute M^(n-2) using binary matrix exponentiation in O(log n) time."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def tribonacci(self, n: int) -> int:\n        pass",
      "javascript": "class Solution {\n    tribonacci(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def tribonacci(self, n: int) -> int:\n        if n == 0: return 0\n        if n in (1, 2): return 1\n        \n        MOD = 1_000_000_007\n        \n        def mat_mul(A, B):\n            C = [[0]*3 for _ in range(3)]\n            for i in range(3):\n                for k in range(3):\n                    for j in range(3):\n                        C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD\n            return C\n            \n        def mat_pow(A, p):\n            res = [[int(i == j) for j in range(3)] for i in range(3)]\n            while p > 0:\n                if p % 2 == 1:\n                    res = mat_mul(res, A)\n                A = mat_mul(A, A)\n                p //= 2\n            return res\n            \n        T = [[1, 1, 1], [1, 0, 0], [0, 1, 0]]\n        Tn = mat_pow(T, n - 2)\n        # Vector [T2, T1, T0] = [1, 1, 0]\n        ans = (Tn[0][0] * 1 + Tn[0][1] * 1 + Tn[0][2] * 0) % MOD\n        return ans",
      "javascript": "class Solution {\n    tribonacci(n) {\n        if (n === 0) return 0;\n        if (n === 1 || n === 2) return 1;\n        const MOD = 1000000007n;\n        \n        function matMul(A, B) {\n            const C = [[0n, 0n, 0n], [0n, 0n, 0n], [0n, 0n, 0n]];\n            for (let i = 0; i < 3; i++) {\n                for (let k = 0; k < 3; k++) {\n                    for (let j = 0; j < 3; j++) {\n                        C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;\n                    }\n                }\n            }\n            return C;\n        }\n        \n        function matPow(A, p) {\n            let res = [[1n, 0n, 0n], [0n, 1n, 0n], [0n, 0n, 1n]];\n            while (p > 0n) {\n                if (p % 2n === 1n) res = matMul(res, A);\n                A = matMul(A, A);\n                p /= 2n;\n            }\n            return res;\n        }\n        \n        const T = [[1n, 1n, 1n], [1n, 0n, 0n], [0n, 1n, 0n]];\n        const Tn = matPow(T, BigInt(n - 2));\n        const ans = (Tn[0][0] * 1n + Tn[0][1] * 1n + Tn[0][2] * 0n) % MOD;\n        return Number(ans);\n    }\n}"
    },
    "editorial": {
      "approach": "3x3 Matrix Fast Exponentiation.",
      "algorithm": "Matrix power takes O(3^3 log N) = O(log N) arithmetic operations.",
      "timeComplexity": "O(log N)",
      "spaceComplexity": "O(1)",
      "content": "Standard state transition matrix for linear recurrence relations.",
      "referenceCode": "def tribonacci(n: int) -> int: ..."
    },
    "tags": [
      "Math",
      "Matrix Exponentiation",
      "Dynamic Programming"
    ],
    "testCases": [
      {
        "input": "4",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "25",
        "expectedOutput": "1389537",
        "isHidden": false
      },
      {
        "input": "0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "35",
        "expectedOutput": "333285496",
        "isHidden": true
      }
    ]
  },
  {
    "title": "N-th Catalan Number Modulo Prime",
    "slug": "catalan-number-modulo",
    "description": "Given an integer `n`, compute the `n`-th Catalan number `C_n = (2n)! / ((n+1)! * n!)` modulo `10^9 + 7`.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "0 <= n <= 10^5",
    "inputFormat": "n",
    "outputFormat": "C_n % 1000000007.",
    "sampleInput": "3",
    "sampleOutput": "5",
    "points": 150,
    "hints": [
      "Precompute factorials up to 2 * n.",
      "Use Fermat's Little Theorem to compute modular inverses of (n+1)! and n!.",
      "C_n = fact[2n] * inv(fact[n+1]) * inv(fact[n]) % MOD."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def findCatalan(self, n: int) -> int:\n        pass",
      "javascript": "class Solution {\n    findCatalan(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def findCatalan(self, n: int) -> int:\n        if n <= 1:\n            return 1\n        MOD = 1_000_000_007\n        fact = [1] * (2 * n + 1)\n        for i in range(1, 2 * n + 1):\n            fact[i] = (fact[i - 1] * i) % MOD\n            \n        def modinv(x):\n            return pow(x, MOD - 2, MOD)\n            \n        num = fact[2 * n]\n        den = (fact[n + 1] * fact[n]) % MOD\n        return (num * modinv(den)) % MOD",
      "javascript": "class Solution {\n    findCatalan(n) {\n        if (n <= 1) return 1;\n        const MOD = 1000000007n;\n        const fact = new Array(2 * n + 1);\n        fact[0] = 1n;\n        for (let i = 1; i <= 2 * n; i++) {\n            fact[i] = (fact[i - 1] * BigInt(i)) % MOD;\n        }\n        \n        function modpow(base, exp) {\n            let res = 1n;\n            base %= MOD;\n            while (exp > 0n) {\n                if (exp % 2n === 1n) res = (res * base) % MOD;\n                base = (base * base) % MOD;\n                exp /= 2n;\n            }\n            return res;\n        }\n        \n        const num = fact[2 * n];\n        const den = (fact[n + 1] * fact[n]) % MOD;\n        const ans = (num * modpow(den, MOD - 2n)) % MOD;\n        return Number(ans);\n    }\n}"
    },
    "editorial": {
      "approach": "Combinatorial formula with modular inverse.",
      "algorithm": "Precompute factorials and multiply by modular inverse using Fermat's Little Theorem.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Catalan numbers count binary trees, Dyck paths, and valid parentheses expressions.",
      "referenceCode": "def findCatalan(n: int) -> int: ..."
    },
    "tags": [
      "Math",
      "Combinatorics",
      "Number Theory"
    ],
    "testCases": [
      {
        "input": "3",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "input": "5",
        "expectedOutput": "42",
        "isHidden": false
      },
      {
        "input": "0",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "10",
        "expectedOutput": "16796",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Sum of Euler Totient Values up to N",
    "slug": "euler-totient-function-sum",
    "description": "Given an integer `n`, compute the sum of Euler's Totient function values `phi(i)` for all `1 <= i <= n`.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 10^6",
    "inputFormat": "n",
    "outputFormat": "Sum of phi(i) from 1 to n.",
    "sampleInput": "5",
    "sampleOutput": "10",
    "points": 150,
    "hints": [
      "Use a linear sieve (or sieve of Eratosthenes variant) to compute phi[i] for all 1 <= i <= n in O(N).",
      "phi[i] is initialized to i. For each prime p, reduce phi[k*p] *= (1 - 1/p).",
      "Sum all phi values."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def sumOfTotient(self, n: int) -> int:\n        pass",
      "javascript": "class Solution {\n    sumOfTotient(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def sumOfTotient(self, n: int) -> int:\n        phi = list(range(n + 1))\n        for i in range(2, n + 1):\n            if phi[i] == i:\n                for j in range(i, n + 1, i):\n                    phi[j] -= phi[j] // i\n        return sum(phi[1:n+1])",
      "javascript": "class Solution {\n    sumOfTotient(n) {\n        const phi = new Array(n + 1);\n        for (let i = 0; i <= n; i++) phi[i] = i;\n        for (let i = 2; i <= n; i++) {\n            if (phi[i] === i) {\n                for (let j = i; j <= n; j += i) {\n                    phi[j] -= Math.floor(phi[j] / i);\n                }\n            }\n        }\n        let total = 0;\n        for (let i = 1; i <= n; i++) total += phi[i];\n        return total;\n    }\n}"
    },
    "editorial": {
      "approach": "Sieve-based Euler Totient calculation.",
      "algorithm": "Initialize array and apply multiplicative factor (1 - 1/p) during prime sieving.",
      "timeComplexity": "O(N log log N)",
      "spaceComplexity": "O(N)",
      "content": "Totient function phi(n) counts integers k <= n that are coprime to n.",
      "referenceCode": "def sumOfTotient(n: int) -> int: ..."
    },
    "tags": [
      "Math",
      "Number Theory",
      "Sieve"
    ],
    "testCases": [
      {
        "input": "5",
        "expectedOutput": "10",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "10",
        "expectedOutput": "32",
        "isHidden": true
      },
      {
        "input": "100",
        "expectedOutput": "3044",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Fraction to Recurring Decimal String",
    "slug": "fraction-to-recurring-decimal",
    "description": "Given two integers representing the `numerator` and `denominator` of a fraction, return the fraction in string format. If the fractional part is repeating, enclose the repeating part in parentheses.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "-2^31 <= numerator, denominator <= 2^31 - 1\ndenominator != 0",
    "inputFormat": "numerator, denominator",
    "outputFormat": "Decimal string representation.",
    "sampleInput": "1, 2",
    "sampleOutput": "\"0.5\"",
    "points": 150,
    "hints": [
      "Handle negative sign and integer part quotient first.",
      "Track remainder values and their index in the decimal string in a hash map.",
      "If a remainder repeats, insert parentheses and return."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def fractionToDecimal(self, numerator: int, denominator: int) -> str:\n        pass",
      "javascript": "class Solution {\n    fractionToDecimal(numerator, denominator) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def fractionToDecimal(self, numerator: int, denominator: int) -> str:\n        if numerator == 0:\n            return \"0\"\n        res = []\n        if (numerator < 0) ^ (denominator < 0):\n            res.append(\"-\")\n        num = abs(numerator)\n        den = abs(denominator)\n        \n        res.append(str(num // den))\n        rem = num % den\n        if rem == 0:\n            return \"\".join(res)\n            \n        res.append(\".\")\n        seen = {}\n        while rem != 0:\n            if rem in seen:\n                res.insert(seen[rem], \"(\")\n                res.append(\")\")\n                break\n            seen[rem] = len(res)\n            rem *= 10\n            res.append(str(rem // den))\n            rem %= den\n            \n        return \"\".join(res)",
      "javascript": "class Solution {\n    fractionToDecimal(numerator, denominator) {\n        if (numerator === 0) return \"0\";\n        const res = [];\n        if ((numerator < 0) ^ (denominator < 0)) res.push(\"-\");\n        let num = Math.abs(numerator);\n        let den = Math.abs(denominator);\n        \n        res.push(Math.floor(num / den).toString());\n        let rem = num % den;\n        if (rem === 0) return res.join(\"\");\n        \n        res.push(\".\");\n        const seen = new Map();\n        while (rem !== 0) {\n            if (seen.has(rem)) {\n                res.splice(seen.get(rem), 0, \"(\");\n                res.push(\")\");\n                break;\n            }\n            seen.set(rem, res.length);\n            rem *= 10;\n            res.push(Math.floor(rem / den).toString());\n            rem %= den;\n        }\n        return res.join(\"\");\n    }\n}"
    },
    "editorial": {
      "approach": "Long division remainder cycle detection.",
      "algorithm": "Map previously observed remainders to their string positions to detect period cycle.",
      "timeComplexity": "O(denominator)",
      "spaceComplexity": "O(denominator)",
      "content": "Standard decimal expansion cycle detector.",
      "referenceCode": "def fractionToDecimal(num: int, den: int) -> str: ..."
    },
    "tags": [
      "Math",
      "Hash Table",
      "String"
    ],
    "testCases": [
      {
        "input": "1, 2",
        "expectedOutput": "\"0.5\"",
        "isHidden": false
      },
      {
        "input": "2, 1",
        "expectedOutput": "\"2\"",
        "isHidden": false
      },
      {
        "input": "4, 333",
        "expectedOutput": "\"0.(012)\"",
        "isHidden": true
      },
      {
        "input": "-50, 8",
        "expectedOutput": "\"-6.25\"",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Integer to English Words Converter",
    "slug": "integer-to-english-words-converter",
    "description": "Convert a non-negative integer `num` to its English words representation.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "0 <= num <= 2^31 - 1",
    "inputFormat": "num",
    "outputFormat": "English words string.",
    "sampleInput": "123",
    "sampleOutput": "\"One Hundred Twenty Three\"",
    "points": 200,
    "hints": [
      "Divide the number into groups of three digits: Billions, Millions, Thousands, and Ones.",
      "Write a helper function to convert numbers < 1000 into words.",
      "Combine parts with proper scale words."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def numberToWords(self, num: int) -> str:\n        pass",
      "javascript": "class Solution {\n    numberToWords(num) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def numberToWords(self, num: int) -> str:\n        if num == 0:\n            return \"Zero\"\n            \n        LESS_THAN_20 = [\"\", \"One\", \"Two\", \"Three\", \"Four\", \"Five\", \"Six\", \"Seven\", \"Eight\", \"Nine\", \"Ten\", \"Eleven\", \"Twelve\", \"Thirteen\", \"Fourteen\", \"Fifteen\", \"Sixteen\", \"Seventeen\", \"Eighteen\", \"Nineteen\"]\n        TENS = [\"\", \"Ten\", \"Twenty\", \"Thirty\", \"Forty\", \"Fifty\", \"Sixty\", \"Seventy\", \"Eighty\", \"Ninety\"]\n        THOUSANDS = [\"\", \"Thousand\", \"Million\", \"Billion\"]\n        \n        def helper(n):\n            if n == 0:\n                return \"\"\n            elif n < 20:\n                return LESS_THAN_20[n] + \" \"\n            elif n < 100:\n                return TENS[n // 10] + \" \" + helper(n % 10)\n            else:\n                return LESS_THAN_20[n // 100] + \" Hundred \" + helper(n % 100)\n                \n        res = \"\"\n        for i, scale in enumerate(THOUSANDS):\n            if num % 1000 != 0:\n                res = helper(num % 1000) + scale + \" \" + res\n            num //= 1000\n            \n        return res.strip()",
      "javascript": "class Solution {\n    numberToWords(num) {\n        if (num === 0) return \"Zero\";\n        const LESS_THAN_20 = [\"\", \"One\", \"Two\", \"Three\", \"Four\", \"Five\", \"Six\", \"Seven\", \"Eight\", \"Nine\", \"Ten\", \"Eleven\", \"Twelve\", \"Thirteen\", \"Fourteen\", \"Fifteen\", \"Sixteen\", \"Seventeen\", \"Eighteen\", \"Nineteen\"];\n        const TENS = [\"\", \"Ten\", \"Twenty\", \"Thirty\", \"Forty\", \"Fifty\", \"Sixty\", \"Seventy\", \"Eighty\", \"Ninety\"];\n        const THOUSANDS = [\"\", \"Thousand\", \"Million\", \"Billion\"];\n        \n        function helper(n) {\n            if (n === 0) return \"\";\n            if (n < 20) return LESS_THAN_20[n] + \" \";\n            if (n < 100) return TENS[Math.floor(n / 10)] + \" \" + helper(n % 10);\n            return LESS_THAN_20[Math.floor(n / 100)] + \" Hundred \" + helper(n % 100);\n        }\n        \n        let res = \"\";\n        let i = 0;\n        while (num > 0) {\n            if (num % 1000 !== 0) {\n                const chunk = helper(num % 1000) + (THOUSANDS[i] ? THOUSANDS[i] + \" \" : \"\");\n                res = chunk + res;\n            }\n            num = Math.floor(num / 1000);\n            i++;\n        }\n        return res.trim().replace(/\\s+/g, \" \");\n    }\n}"
    },
    "editorial": {
      "approach": "Chunked three-digit recursive conversion.",
      "algorithm": "Deconstruct into thousands powers and format each sub-1000 triad.",
      "timeComplexity": "O(log10 N)",
      "spaceComplexity": "O(1)",
      "content": "Clean recursive modular arithmetic with string concatenation.",
      "referenceCode": "def numberToWords(num: int) -> str: ..."
    },
    "tags": [
      "Math",
      "String",
      "Recursion"
    ],
    "testCases": [
      {
        "input": "123",
        "expectedOutput": "\"One Hundred Twenty Three\"",
        "isHidden": false
      },
      {
        "input": "12345",
        "expectedOutput": "\"Twelve Thousand Three Hundred Forty Five\"",
        "isHidden": false
      },
      {
        "input": "1234567",
        "expectedOutput": "\"One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven\"",
        "isHidden": true
      },
      {
        "input": "0",
        "expectedOutput": "\"Zero\"",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Excel Sheet Column Title and Number",
    "slug": "excel-sheet-column-title-and-number",
    "description": "Given a positive integer `columnNumber`, return its corresponding column title as it appears in an Excel sheet (1 -> \"A\", 28 -> \"AB\", etc.).",
    "difficulty": Difficulty.EASY,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= columnNumber <= 2^31 - 1",
    "inputFormat": "columnNumber",
    "outputFormat": "Excel column title string.",
    "sampleInput": "28",
    "sampleOutput": "\"AB\"",
    "points": 100,
    "hints": [
      "This is base-26 with a 1-based offset.",
      "Subtract 1 from columnNumber before taking modulo 26 and dividing by 26."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def convertToTitle(self, columnNumber: int) -> str:\n        pass",
      "javascript": "class Solution {\n    convertToTitle(columnNumber) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def convertToTitle(self, columnNumber: int) -> str:\n        res = []\n        while columnNumber > 0:\n            columnNumber -= 1\n            res.append(chr(ord('A') + columnNumber % 26))\n            columnNumber //= 26\n        return \"\".join(reversed(res))",
      "javascript": "class Solution {\n    convertToTitle(columnNumber) {\n        const res = [];\n        while (columnNumber > 0) {\n            columnNumber--;\n            res.push(String.fromCharCode(65 + (columnNumber % 26)));\n            columnNumber = Math.floor(columnNumber / 26);\n        }\n        return res.reverse().join(\"\");\n    }\n}"
    },
    "editorial": {
      "approach": "1-based Base-26 conversion.",
      "algorithm": "Decrement n before each step to handle 1-indexing correctly.",
      "timeComplexity": "O(log26 N)",
      "spaceComplexity": "O(1)",
      "content": "Direct base conversion with 1-offset adjustment.",
      "referenceCode": "def convertToTitle(columnNumber: int) -> str: ..."
    },
    "tags": [
      "Math",
      "String"
    ],
    "testCases": [
      {
        "input": "28",
        "expectedOutput": "\"AB\"",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "\"A\"",
        "isHidden": false
      },
      {
        "input": "701",
        "expectedOutput": "\"ZY\"",
        "isHidden": true
      },
      {
        "input": "2147483647",
        "expectedOutput": "\"FXSHRXW\"",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Bulb Switcher Toggle Count",
    "slug": "bulb-switcher-toggle",
    "description": "There are `n` bulbs that are initially off. In round 1 you turn on all bulbs. In round 2 you toggle every second bulb. In round i you toggle every i-th bulb. Return the number of bulbs that are on after `n` rounds.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "0 <= n <= 10^9",
    "inputFormat": "n",
    "outputFormat": "Number of turned on bulbs.",
    "sampleInput": "3",
    "sampleOutput": "1",
    "points": 150,
    "hints": [
      "A bulb at index k is toggled for every divisor of k.",
      "A bulb ends up ON if and only if it has an odd number of divisors.",
      "Only perfect square numbers have an odd number of divisors.",
      "Hence, the answer is isqrt(n)."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def bulbSwitch(self, n: int) -> int:\n        pass",
      "javascript": "class Solution {\n    bulbSwitch(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "import math\nclass Solution:\n    def bulbSwitch(self, n: int) -> int:\n        return math.isqrt(n)",
      "javascript": "class Solution {\n    bulbSwitch(n) {\n        return Math.floor(Math.sqrt(n));\n    }\n}"
    },
    "editorial": {
      "approach": "Divisor parity and perfect squares.",
      "algorithm": "Every factor pair (a, b) produces 2 divisors unless a = b (perfect square).",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "content": "Counting perfect squares <= n gives the exact number of bulbs left on.",
      "referenceCode": "def bulbSwitch(n: int) -> int: ..."
    },
    "tags": [
      "Math",
      "Brainteaser",
      "Number Theory"
    ],
    "testCases": [
      {
        "input": "3",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "0",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "999999999",
        "expectedOutput": "31622",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Water and Jug Problem GCD Decision",
    "slug": "water-and-jug-gcd-decision",
    "description": "You are given two jugs with capacities `x` and `y` liters. There is an infinite amount of water supply available. Determine whether it is possible to measure exactly `target` liters using these two jugs.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= x, y, target <= 10^6",
    "inputFormat": "x, y, target",
    "outputFormat": "Boolean true or false.",
    "sampleInput": "3, 5, 4",
    "sampleOutput": "true",
    "points": 150,
    "hints": [
      "If target > x + y, it is impossible.",
      "By Bézout's identity, any reachable volume is an integer linear combination a * x + b * y.",
      "Therefore, target must be divisible by gcd(x, y)."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def canMeasureWater(self, x: int, y: int, target: int) -> bool:\n        pass",
      "javascript": "class Solution {\n    canMeasureWater(x, y, target) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "import math\nclass Solution:\n    def canMeasureWater(self, x: int, y: int, target: int) -> bool:\n        if target > x + y:\n            return False\n        if target == 0:\n            return True\n        return target % math.gcd(x, y) == 0",
      "javascript": "class Solution {\n    canMeasureWater(x, y, target) {\n        if (target > x + y) return false;\n        if (target === 0) return true;\n        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);\n        return target % gcd(x, y) === 0;\n    }\n}"
    },
    "editorial": {
      "approach": "Bézout's identity and Greatest Common Divisor.",
      "algorithm": "target <= x + y and target % gcd(x, y) == 0 are necessary and sufficient.",
      "timeComplexity": "O(log(min(x, y)))",
      "spaceComplexity": "O(1)",
      "content": "Classic puzzle reducible to number theoretic linear combinations.",
      "referenceCode": "def canMeasureWater(x: int, y: int, target: int) -> bool: ..."
    },
    "tags": [
      "Math",
      "Number Theory",
      "GCD"
    ],
    "testCases": [
      {
        "input": "3, 5, 4",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "2, 6, 5",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "1, 2, 3",
        "expectedOutput": "true",
        "isHidden": true
      },
      {
        "input": "0, 0, 0",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Perfect Squares Lagrange Four-Square Theorem",
    "slug": "perfect-squares-lagrange-four",
    "description": "Given an integer `n`, return the least number of perfect square numbers that sum to `n`.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 10^5",
    "inputFormat": "n",
    "outputFormat": "Minimum count of perfect squares.",
    "sampleInput": "12",
    "sampleOutput": "3",
    "points": 150,
    "hints": [
      "By Lagrange's four-square theorem, every natural number is a sum of at most 4 integer squares.",
      "By Legendre's three-square theorem, n is a sum of 4 squares iff n = 4^k * (8m + 7).",
      "Check if n is a perfect square (ans=1) or sum of 2 squares (ans=2). Otherwise return 3."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def numSquares(self, n: int) -> int:\n        pass",
      "javascript": "class Solution {\n    numSquares(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "import math\nclass Solution:\n    def numSquares(self, n: int) -> int:\n        def is_square(x):\n            s = math.isqrt(x)\n            return s * s == x\n            \n        if is_square(n):\n            return 1\n            \n        # 4-square check: n = 4^k * (8m + 7)\n        temp = n\n        while temp % 4 == 0:\n            temp //= 4\n        if temp % 8 == 7:\n            return 4\n            \n        # 2-square check\n        for i in range(1, math.isqrt(n) + 1):\n            if is_square(n - i * i):\n                return 2\n                \n        return 3",
      "javascript": "class Solution {\n    numSquares(n) {\n        const isSquare = (x) => {\n            const s = Math.floor(Math.sqrt(x));\n            return s * s === x;\n        };\n        \n        if (isSquare(n)) return 1;\n        \n        let temp = n;\n        while (temp % 4 === 0) temp /= 4;\n        if (temp % 8 === 7) return 4;\n        \n        for (let i = 1; i * i <= n; i++) {\n            if (isSquare(n - i * i)) return 2;\n        }\n        return 3;\n    }\n}"
    },
    "editorial": {
      "approach": "Legendre and Lagrange number theory theorems.",
      "algorithm": "Answer is strictly in {1, 2, 3, 4}. Check 1, 4, and 2 in O(sqrt(n)) time.",
      "timeComplexity": "O(sqrt(N))",
      "spaceComplexity": "O(1)",
      "content": "Achieves O(sqrt(N)) runtime beating O(N * sqrt(N)) dynamic programming.",
      "referenceCode": "def numSquares(n: int) -> int: ..."
    },
    "tags": [
      "Math",
      "Number Theory",
      "Dynamic Programming"
    ],
    "testCases": [
      {
        "input": "12",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "13",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "7",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Super Ugly Number with Given Primes",
    "slug": "super-ugly-number",
    "description": "A super ugly number is a positive integer whose prime factors are in the array `primes`. Given an integer `n` and an array of integers `primes`, return the `n`-th super ugly number.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 10^5\n1 <= primes.length <= 100\n2 <= primes[i] <= 1000\nAll primes[i] are unique and sorted.",
    "inputFormat": "n, primes",
    "outputFormat": "N-th super ugly number.",
    "sampleInput": "12, [2, 7, 13, 19]",
    "sampleOutput": "32",
    "points": 150,
    "hints": [
      "Maintain an index pointer for each prime in primes indicating the position in the dp array.",
      "The next ugly number is the minimum of primes[j] * dp[idx[j]].",
      "Advance all pointers that match the minimum value to avoid duplicates."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def nthSuperUglyNumber(self, n: int, primes: list[int]) -> int:\n        pass",
      "javascript": "class Solution {\n    nthSuperUglyNumber(n, primes) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "import heapq\nclass Solution:\n    def nthSuperUglyNumber(self, n: int, primes: list[int]) -> int:\n        dp = [1] * n\n        idx = [0] * len(primes)\n        val = list(primes)\n        \n        for i in range(1, n):\n            nxt = min(val)\n            dp[i] = nxt\n            for j in range(len(primes)):\n                if val[j] == nxt:\n                    idx[j] += 1\n                    val[j] = primes[j] * dp[idx[j]]\n        return dp[-1]",
      "javascript": "class Solution {\n    nthSuperUglyNumber(n, primes) {\n        const dp = new Array(n).fill(1);\n        const idx = new Array(primes.length).fill(0);\n        const val = [...primes];\n        \n        for (let i = 1; i < n; i++) {\n            const nxt = Math.min(...val);\n            dp[i] = nxt;\n            for (let j = 0; j < primes.length; j++) {\n                if (val[j] === nxt) {\n                    idx[j]++;\n                    val[j] = primes[j] * dp[idx[j]];\n                }\n            }\n        }\n        return dp[n - 1];\n    }\n}"
    },
    "editorial": {
      "approach": "Multi-pointer DP.",
      "algorithm": "Track current candidate multipliers for each prime and advance matching indices.",
      "timeComplexity": "O(N * K)",
      "spaceComplexity": "O(N + K)",
      "content": "Linear scan over prime candidate pointers generates sorted sequence without heap overhead.",
      "referenceCode": "def nthSuperUglyNumber(n: int, primes: list[int]) -> int: ..."
    },
    "tags": [
      "Math",
      "Dynamic Programming",
      "Heap"
    ],
    "testCases": [
      {
        "input": "12, [2, 7, 13, 19]",
        "expectedOutput": "32",
        "isHidden": false
      },
      {
        "input": "1, [2, 3, 5]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "6, [2, 3]",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "input": "15, [3, 5, 7, 11, 19, 23, 29, 41, 43, 47]",
        "expectedOutput": "35",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Consecutive Numbers Sum Count",
    "slug": "consecutive-numbers-sum-count",
    "description": "Given an integer `n`, return the number of ways you can write `n` as the sum of consecutive positive integers.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 10^9",
    "inputFormat": "n",
    "outputFormat": "Count of consecutive decompositions.",
    "sampleInput": "5",
    "sampleOutput": "2",
    "points": 200,
    "hints": [
      "Suppose n = a + (a+1) + ... + (a+k-1) = k*a + k*(k-1)/2.",
      "Then n - k*(k-1)/2 must be divisible by k, where k >= 1 and a >= 1.",
      "Iterate k while k*(k-1)/2 < n."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def consecutiveNumbersSum(self, n: int) -> int:\n        pass",
      "javascript": "class Solution {\n    consecutiveNumbersSum(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def consecutiveNumbersSum(self, n: int) -> int:\n        count = 0\n        k = 1\n        while k * (k - 1) // 2 < n:\n            if (n - k * (k - 1) // 2) % k == 0:\n                count += 1\n            k += 1\n        return count",
      "javascript": "class Solution {\n    consecutiveNumbersSum(n) {\n        let count = 0;\n        let k = 1;\n        while (Math.floor(k * (k - 1) / 2) < n) {\n            if ((n - Math.floor(k * (k - 1) / 2)) % k === 0) {\n                count++;\n            }\n            k++;\n        }\n        return count;\n    }\n}"
    },
    "editorial": {
      "approach": "Arithmetic progression factorization.",
      "algorithm": "Express sum as k*a + k*(k-1)/2 and iterate k up to sqrt(2n).",
      "timeComplexity": "O(sqrt(N))",
      "spaceComplexity": "O(1)",
      "content": "Converts consecutive partition problem into quadratic bound verification.",
      "referenceCode": "def consecutiveNumbersSum(n: int) -> int: ..."
    },
    "tags": [
      "Math",
      "Number Theory",
      "Algebra"
    ],
    "testCases": [
      {
        "input": "5",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "9",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "15",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "input": "1",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Reordered Power of 2 Verification",
    "slug": "reordered-power-of-2",
    "description": "You are given an integer `n`. We reorder the digits in any order (including the original order) such that the leading digit is not zero. Return true if and only if we can do this so that the resulting number is a power of two.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 10^9",
    "inputFormat": "n",
    "outputFormat": "Boolean true or false.",
    "sampleInput": "1",
    "sampleOutput": "true",
    "points": 150,
    "hints": [
      "Powers of 2 up to 10^9 are limited: 2^0 to 2^29 (only 30 powers).",
      "Sort the digit characters of n.",
      "Compare sorted digits against the sorted digits of 2^k for k in 0..29."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def reorderedPowerOf2(self, n: int) -> bool:\n        pass",
      "javascript": "class Solution {\n    reorderedPowerOf2(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def reorderedPowerOf2(self, n: int) -> bool:\n        s = \"\".join(sorted(str(n)))\n        for i in range(30):\n            if \"\".join(sorted(str(1 << i))) == s:\n                return True\n        return False",
      "javascript": "class Solution {\n    reorderedPowerOf2(n) {\n        const s = n.toString().split('').sort().join('');\n        for (let i = 0; i < 30; i++) {\n            if ((1 << i).toString().split('').sort().join('') === s) {\n                return true;\n            }\n        }\n        return false;\n    }\n}"
    },
    "editorial": {
      "approach": "Digit frequency signature matching against powers of two.",
      "algorithm": "Only 30 candidate powers exist within the 32-bit integer range.",
      "timeComplexity": "O(log10 N)",
      "spaceComplexity": "O(log10 N)",
      "content": "Canonical sorted digit string matching.",
      "referenceCode": "def reorderedPowerOf2(n: int) -> bool: ..."
    },
    "tags": [
      "Math",
      "Sorting",
      "Hash Table"
    ],
    "testCases": [
      {
        "input": "1",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "10",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "16",
        "expectedOutput": "true",
        "isHidden": true
      },
      {
        "input": "46",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Sieve of Eratosthenes Count Primes",
    "slug": "sieve-of-eratosthenes-prime-counting",
    "description": "Given an integer `n`, return the number of prime numbers strictly less than `n`.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "0 <= n <= 5 * 10^6",
    "inputFormat": "n",
    "outputFormat": "Number of primes less than n.",
    "sampleInput": "10",
    "sampleOutput": "4",
    "points": 150,
    "hints": [
      "Use a boolean array is_prime of size n.",
      "Start from 2, mark multiples of each prime starting from p*p up to n as composite.",
      "Count remaining true entries."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def countPrimes(self, n: int) -> int:\n        pass",
      "javascript": "class Solution {\n    countPrimes(n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def countPrimes(self, n: int) -> int:\n        if n < 3:\n            return 0\n        is_prime = bytearray([1]) * n\n        is_prime[0] = is_prime[1] = 0\n        for i in range(2, int(n**0.5) + 1):\n            if is_prime[i]:\n                is_prime[i*i:n:i] = bytearray([0]) * len(is_prime[i*i:n:i])\n        return sum(is_prime)",
      "javascript": "class Solution {\n    countPrimes(n) {\n        if (n < 3) return 0;\n        const isPrime = new Uint8Array(n);\n        isPrime.fill(1);\n        isPrime[0] = 0;\n        isPrime[1] = 0;\n        for (let i = 2; i * i < n; i++) {\n            if (isPrime[i]) {\n                for (let j = i * i; j < n; j += i) {\n                    isPrime[j] = 0;\n                }\n            }\n        }\n        let count = 0;\n        for (let i = 2; i < n; i++) {\n            if (isPrime[i]) count++;\n        }\n        return count;\n    }\n}"
    },
    "editorial": {
      "approach": "Sieve of Eratosthenes with bytearray slice assignment.",
      "algorithm": "Standard sieve eliminating multiples from p^2.",
      "timeComplexity": "O(N log log N)",
      "spaceComplexity": "O(N)",
      "content": "Optimal prime counting method for N up to 10^7.",
      "referenceCode": "def countPrimes(n: int) -> int: ..."
    },
    "tags": [
      "Math",
      "Number Theory",
      "Sieve",
      "Arrays"
    ],
    "testCases": [
      {
        "input": "10",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "0",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "100",
        "expectedOutput": "25",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Mirror Reflection Laser Ray",
    "slug": "mirror-reflection-laser-ray",
    "description": "There is a special square room with mirrors on each of the four walls. Corner receptors numbered 0, 1, and 2 are located at (p, 0), (p, p), and (0, p). A laser beam is emitted from (0, 0) and meets the east wall at (p, q). Return the number of the receptor that the ray meets first.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= q <= p <= 1000",
    "inputFormat": "p, q",
    "outputFormat": "Receptor index (0, 1, or 2).",
    "sampleInput": "2, 1",
    "sampleOutput": "2",
    "points": 150,
    "hints": [
      "Unfold the reflections into a grid of p x q squares.",
      "Divide p and q by their gcd until at least one of them is odd.",
      "Check parity of p and q to determine the corner reached."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def mirrorReflection(self, p: int, q: int) -> int:\n        pass",
      "javascript": "class Solution {\n    mirrorReflection(p, q) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "import math\nclass Solution:\n    def mirrorReflection(self, p: int, q: int) -> int:\n        g = math.gcd(p, q)\n        p //= g\n        q //= g\n        if p % 2 == 0:\n            return 2\n        elif q % 2 == 0:\n            return 0\n        else:\n            return 1",
      "javascript": "class Solution {\n    mirrorReflection(p, q) {\n        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);\n        const g = gcd(p, q);\n        p = Math.floor(p / g);\n        q = Math.floor(q / g);\n        if (p % 2 === 0) return 2;\n        if (q % 2 === 0) return 0;\n        return 1;\n    }\n}"
    },
    "editorial": {
      "approach": "Room unfolding geometry and parity reduction.",
      "algorithm": "Reduce p and q by gcd(p, q) and classify by odd/even coordinate parity.",
      "timeComplexity": "O(log(min(p, q)))",
      "spaceComplexity": "O(1)",
      "content": "Mirrors unfold into an infinite periodic plane.",
      "referenceCode": "def mirrorReflection(p: int, q: int) -> int: ..."
    },
    "tags": [
      "Math",
      "Geometry",
      "Number Theory"
    ],
    "testCases": [
      {
        "input": "2, 1",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "3, 1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "4, 3",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "input": "1, 1",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  {
    "title": "K-th Symbol in Grammar Thue-Morse",
    "slug": "k-th-symbol-in-grammar",
    "description": "We build a table of n rows (1-indexed). Row 1 has \"0\". Each subsequent row replaces \"0\" with \"01\" and \"1\" with \"10\". Given `n` and `k`, return the `k`-th (1-indexed) symbol in row `n`.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= n <= 30\n1 <= k <= 2^(n - 1)",
    "inputFormat": "n, k",
    "outputFormat": "0 or 1.",
    "sampleInput": "2, 1",
    "sampleOutput": "0",
    "points": 150,
    "hints": [
      "The sequence is the Thue-Morse sequence.",
      "The k-th symbol (0-indexed k-1) is the parity of the number of 1-bits in k - 1.",
      "Return (k - 1).bit_count() % 2."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def kthGrammar(self, n: int, k: int) -> int:\n        pass",
      "javascript": "class Solution {\n    kthGrammar(n, k) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def kthGrammar(self, n: int, k: int) -> int:\n        return (k - 1).bit_count() % 2",
      "javascript": "class Solution {\n    kthGrammar(n, k) {\n        let x = k - 1;\n        let count = 0;\n        while (x > 0) {\n            count += (x & 1);\n            x >>= 1;\n        }\n        return count % 2;\n    }\n}"
    },
    "editorial": {
      "approach": "Popcount of (k-1) parity.",
      "algorithm": "Thue-Morse sequence character equals the parity of set bits in the zero-indexed position.",
      "timeComplexity": "O(log K)",
      "spaceComplexity": "O(1)",
      "content": "Direct O(1) bitwise parity solution.",
      "referenceCode": "def kthGrammar(n: int, k: int) -> int: ..."
    },
    "tags": [
      "Math",
      "Bit Manipulation",
      "Recursion"
    ],
    "testCases": [
      {
        "input": "2, 1",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "2, 2",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "1, 1",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "30, 434991989",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  }
];
