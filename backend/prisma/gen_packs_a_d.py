# Packs A, B, C, D Definitions

def register_a_d(add_p):
    # ==========================================
    # PACK A: Advanced DP & State Transitions (19 problems)
    # ==========================================
    add_p('pack-500-part-a', 'Edit Distance with Variable Costs', 'edit-distance-with-variable-costs',
          'Given word1, word2, and costs for insert, delete, and replace, return minimum total cost to convert word1 to word2.',
          'MEDIUM', 1000, 128, '0 <= len <= 500', 'word1, word2, costIns, costDel, costRep', 'Integer',
          '"horse", "ros", 1, 1, 1', '3', 150,
          ['dp[i][j] tracks min cost for prefixes.'],
          '''class Solution:
    def minDistanceWithCosts(self, word1: str, word2: str, costIns: int, costDel: int, costRep: int) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1): dp[i][0] = i * costDel
        for j in range(n + 1): dp[0][j] = j * costIns
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = min(dp[i - 1][j] + costDel, dp[i][j - 1] + costIns, dp[i - 1][j - 1] + costRep)
        return dp[m][n]''',
          '''class Solution {
    minDistanceWithCosts(word1, word2, costIns, costDel, costRep) {
        const m = word1.length, n = word2.length;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) dp[i][0] = i * costDel;
        for (let j = 0; j <= n; j++) dp[0][j] = j * costIns;
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = Math.min(dp[i - 1][j] + costDel, dp[i][j - 1] + costIns, dp[i - 1][j - 1] + costRep);
            }
        }
        return dp[m][n];
    }
}''',
          'Weighted 2D Dynamic Programming', 'Wagner-Fischer generalized', 'O(M*N)', 'O(M*N)',
          ['Dynamic Programming', 'String'],
          [('"horse", "ros", 1, 1, 1', '3', False),
           ('"intention", "execution", 2, 3, 4', '19', False),
           ('"", "abc", 5, 2, 10', '15', True),
           ('"same", "same", 10, 10, 10', '0', True)]
    )

    add_p('pack-500-part-a', 'Interleaving String Verification', 'interleaving-string-verification',
          'Given strings s1, s2, and s3, return true if s3 is formed by an interleaving of s1 and s2.',
          'MEDIUM', 1000, 128, '0 <= len <= 100', 's1, s2, s3', 'Boolean',
          '"aabcc", "dbbca", "aadbbcbcac"', 'true', 150,
          ['Check total lengths first.', 'Use 1D space-optimized DP table.'],
          '''class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        if len(s1) + len(s2) != len(s3): return False
        m, n = len(s1), len(s2)
        dp = [False] * (n + 1)
        dp[0] = True
        for j in range(1, n + 1): dp[j] = dp[j - 1] and s2[j - 1] == s3[j - 1]
        for i in range(1, m + 1):
            dp[0] = dp[0] and s1[i - 1] == s3[i - 1]
            for j in range(1, n + 1):
                dp[j] = (dp[j] and s1[i - 1] == s3[i + j - 1]) or (dp[j - 1] and s2[j - 1] == s3[i + j - 1])
        return dp[n]''',
          '''class Solution {
    isInterleave(s1, s2, s3) {
        if (s1.length + s2.length !== s3.length) return false;
        const m = s1.length, n = s2.length;
        const dp = Array(n + 1).fill(false);
        dp[0] = true;
        for (let j = 1; j <= n; j++) dp[j] = dp[j - 1] && s2[j - 1] === s3[j - 1];
        for (let i = 1; i <= m; i++) {
            dp[0] = dp[0] && s1[i - 1] === s3[i - 1];
            for (let j = 1; j <= n; j++) {
                dp[j] = (dp[j] && s1[i - 1] === s3[i + j - 1]) || (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);
            }
        }
        return dp[n];
    }
}''',
          '1D Rolling Dynamic Programming', 'Prefix interleaving matching', 'O(M*N)', 'O(N)',
          ['Dynamic Programming', 'String'],
          [('"aabcc", "dbbca", "aadbbcbcac"', 'true', False),
           ('"aabcc", "dbbca", "aadbbbaccc"', 'false', False),
           ('"", "", ""', 'true', True)]
    )

    add_p('pack-500-part-a', 'Count Vowels Permutation', 'count-vowels-permutation',
          'Count strings of length n formed with vowels following transition rules modulo 10^9 + 7.',
          'HARD', 1000, 128, '1 <= n <= 20000', 'n', 'Integer',
          '1', '5', 200,
          ['Maintain state counts for 5 vowels.'],
          '''class Solution:
    def countVowelPermutation(self, n: int) -> int:
        MOD = 10**9 + 7
        a, e, i, o, u = 1, 1, 1, 1, 1
        for _ in range(n - 1):
            na = (e + i + u) % MOD
            ne = (a + i) % MOD
            ni = (e + o) % MOD
            no = i % MOD
            nu = (i + o) % MOD
            a, e, i, o, u = na, ne, ni, no, nu
        return (a + e + i + o + u) % MOD''',
          '''class Solution {
    countVowelPermutation(n) {
        const MOD = 1000000007n;
        let a = 1n, e = 1n, i = 1n, o = 1n, u = 1n;
        for (let step = 1; step < n; step++) {
            const na = (e + i + u) % MOD;
            const ne = (a + i) % MOD;
            const ni = (e + o) % MOD;
            const no = i % MOD;
            const nu = (i + o) % MOD;
            a = na; e = ne; i = ni; o = no; u = nu;
        }
        return Number((a + e + i + o + u) % MOD);
    }
}''',
          'Linear state transition recurrence', 'Simultaneous 5-state DP', 'O(N)', 'O(1)',
          ['Dynamic Programming', 'Math'],
          [('1', '5', False), ('2', '10', False), ('144', '18208803', True)]
    )

    add_p('pack-500-part-a', 'Knight Dialer on Phone Keypad', 'knight-dialer-on-phone-keypad',
          'Given integer n, return how many distinct phone numbers of length n you can dial on a phone dialpad modulo 10^9 + 7 using knight moves.',
          'MEDIUM', 1000, 128, '1 <= n <= 5000', 'n', 'Integer',
          '1', '10', 150,
          ['Map legal moves for 0-9.'],
          '''class Solution:
    def knightDialer(self, n: int) -> int:
        if n == 1: return 10
        MOD = 10**9 + 7
        moves = [[4,6],[6,8],[7,9],[4,8],[0,3,9],[],[0,1,7],[2,6],[1,3],[2,4]]
        dp = [1] * 10
        for _ in range(n - 1):
            next_dp = [0] * 10
            for u in range(10):
                for v in moves[u]:
                    next_dp[v] = (next_dp[v] + dp[u]) % MOD
            dp = next_dp
        return sum(dp) % MOD''',
          '''class Solution {
    knightDialer(n) {
        if (n === 1) return 10;
        const MOD = 1000000007;
        const moves = [[4,6],[6,8],[7,9],[4,8],[0,3,9],[],[0,1,7],[2,6],[1,3],[2,4]];
        let dp = Array(10).fill(1);
        for (let step = 1; step < n; step++) {
            const nextDp = Array(10).fill(0);
            for (let u = 0; u < 10; u++) {
                for (const v of moves[u]) nextDp[v] = (nextDp[v] + dp[u]) % MOD;
            }
            dp = nextDp;
        }
        return dp.reduce((acc, x) => (acc + x) % MOD, 0);
    }
}''',
          'Graph state DP', '10-state linear simulation', 'O(N)', 'O(1)',
          ['Dynamic Programming', 'Graph'],
          [('1', '10', False), ('2', '20', False), ('3131', '136006598', True)]
    )

    add_p('pack-500-part-a', 'Maximum Score from Performing Multiplication Operations', 'maximum-score-from-performing-multiplication-operations',
          'Given nums and multipliers, return max score after m operations picking from ends.',
          'HARD', 1000, 128, 'm <= 300, n <= 10^4', 'nums, multipliers', 'Integer',
          '[1,2,3], [3,2,1]', '14', 200,
          ['Right pointer = n - 1 - (op - left).'],
          '''class Solution:
    def maximumScore(self, nums: list, multipliers: list) -> int:
        n, m = len(nums), len(multipliers)
        dp = [0] * (m + 1)
        for op in range(m - 1, -1, -1):
            next_dp = [0] * (op + 1)
            for left in range(op + 1):
                mult = multipliers[op]
                right = n - 1 - (op - left)
                next_dp[left] = max(nums[left] * mult + dp[left + 1], nums[right] * mult + dp[left])
            dp = next_dp
        return dp[0]''',
          '''class Solution {
    maximumScore(nums, multipliers) {
        const n = nums.length, m = multipliers.length;
        let dp = Array(m + 1).fill(0);
        for (let op = m - 1; op >= 0; op--) {
            const nextDp = Array(op + 1).fill(0);
            for (let left = 0; left <= op; left++) {
                const mult = multipliers[op];
                const right = n - 1 - (op - left);
                nextDp[left] = Math.max(nums[left] * mult + dp[left + 1], nums[right] * mult + dp[left]);
            }
            dp = nextDp;
        }
        return dp[0];
    }
}''',
          'Bottom-up 2D DP', 'O(M^2) state reduction', 'O(M^2)', 'O(M)',
          ['Dynamic Programming', 'Array'],
          [('[1,2,3], [3,2,1]', '14', False), ('[-5,-3,-3,-2,7,1], [-10,-5,3,4,6]', '102', False), ('[10], [5]', '50', True)]
    )

    add_p('pack-500-part-a', 'Tallest Billboard Equal Support Legs', 'tallest-billboard-equal-support-legs',
          'Given rod lengths, return the largest possible equal height of two billboard supports.',
          'HARD', 1000, 128, 'sum(rods) <= 5000', 'rods', 'Integer',
          '[1,2,3,6]', '6', 200,
          ['Map difference of two support legs to max shorter height.'],
          '''class Solution:
    def tallestBillboard(self, rods: list) -> int:
        dp = {0: 0}
        for r in rods:
            cur = dp.copy()
            for diff, shorter in cur.items():
                dp[diff + r] = max(dp.get(diff + r, 0), shorter)
                if diff >= r:
                    dp[diff - r] = max(dp.get(diff - r, 0), shorter + r)
                else:
                    dp[r - diff] = max(dp.get(r - diff, 0), shorter + diff)
        return dp.get(0, 0)''',
          '''class Solution {
    tallestBillboard(rods) {
        let dp = new Map();
        dp.set(0, 0);
        for (const r of rods) {
            const cur = new Map(dp);
            for (const [diff, shorter] of cur.entries()) {
                dp.set(diff + r, Math.max(dp.get(diff + r) || 0, shorter));
                if (diff >= r) dp.set(diff - r, Math.max(dp.get(diff - r) || 0, shorter + r));
                else dp.set(r - diff, Math.max(dp.get(r - diff) || 0, shorter + diff));
            }
        }
        return dp.get(0) || 0;
    }
}''',
          'Difference knapsack DP', 'State tracking on support leg delta', 'O(N*sum)', 'O(sum)',
          ['Dynamic Programming', 'Knapsack'],
          [('[1,2,3,6]', '6', False), ('[1,2,3,4,5,6]', '10', False), ('[1,2]', '0', True)]
    )

    add_p('pack-500-part-a', 'Scramble String Verification', 'scramble-string-verification',
          'Given two strings s1 and s2 of equal length, return true if s2 is a scramble of s1.',
          'HARD', 1000, 128, '1 <= len <= 30', 's1, s2', 'Boolean',
          '"great", "rgeat"', 'true', 200,
          ['Fast anagram pruning before recursive partitions.'],
          '''class Solution:
    def isScramble(self, s1: str, s2: str) -> bool:
        memo = {}
        def check(a, b):
            if a == b: return True
            if sorted(a) != sorted(b): return False
            key = (a, b)
            if key in memo: return memo[key]
            n = len(a)
            for i in range(1, n):
                if check(a[:i], b[:i]) and check(a[i:], b[i:]):
                    memo[key] = True
                    return True
                if check(a[:i], b[n - i:]) and check(a[i:], b[:n - i]):
                    memo[key] = True
                    return True
            memo[key] = False
            return False
        return check(s1, s2)''',
          '''class Solution {
    isScramble(s1, s2) {
        const memo = new Map();
        function check(a, b) {
            if (a === b) return true;
            if (a.length !== b.length) return false;
            const count = Array(26).fill(0);
            for (let i = 0; i < a.length; i++) {
                count[a.charCodeAt(i) - 97]++;
                count[b.charCodeAt(i) - 97]--;
            }
            if (count.some(x => x !== 0)) return false;
            const key = a + '#' + b;
            if (memo.has(key)) return memo.get(key);
            for (let i = 1; i < a.length; i++) {
                if (check(a.slice(0, i), b.slice(0, i)) && check(a.slice(i), b.slice(i))) {
                    memo.set(key, true); return true;
                }
                if (check(a.slice(0, i), b.slice(a.length - i)) && check(a.slice(i), b.slice(0, a.length - i))) {
                    memo.set(key, true); return true;
                }
            }
            memo.set(key, false); return false;
        }
        return check(s1, s2);
    }
}''',
          'Memoized partition DP', 'Recursive sub-string scrambling', 'O(N^4)', 'O(N^3)',
          ['Dynamic Programming', 'String'],
          [('"great", "rgeat"', 'true', False), ('"abcde", "caebd"', 'false', False), ('"a", "a"', 'true', True)]
    )

    add_p('pack-500-part-a', 'Number of Ways to Stay in the Same Place After Some Steps', 'number-of-ways-to-stay-in-the-same-place-after-some-steps',
          'Return ways to be at index 0 after steps steps on array of size arrLen modulo 10^9 + 7.',
          'HARD', 1000, 128, 'steps <= 500', 'steps, arrLen', 'Integer',
          '3, 2', '4', 200,
          ['Max position is bounded by steps // 2.'],
          '''class Solution:
    def numWays(self, steps: int, arrLen: int) -> int:
        MOD = 10**9 + 7
        max_pos = min(arrLen - 1, steps // 2)
        dp = [0] * (max_pos + 1)
        dp[0] = 1
        for _ in range(steps):
            next_dp = [0] * (max_pos + 1)
            for j in range(max_pos + 1):
                next_dp[j] = dp[j]
                if j > 0: next_dp[j] = (next_dp[j] + dp[j - 1]) % MOD
                if j < max_pos: next_dp[j] = (next_dp[j] + dp[j + 1]) % MOD
            dp = next_dp
        return dp[0]''',
          '''class Solution {
    numWays(steps, arrLen) {
        const MOD = 1000000007;
        const maxPos = Math.min(arrLen - 1, Math.floor(steps / 2));
        let dp = Array(maxPos + 1).fill(0);
        dp[0] = 1;
        for (let s = 0; s < steps; s++) {
            const nextDp = Array(maxPos + 1).fill(0);
            for (let j = 0; j <= maxPos; j++) {
                nextDp[j] = dp[j];
                if (j > 0) nextDp[j] = (nextDp[j] + dp[j - 1]) % MOD;
                if (j < maxPos) nextDp[j] = (nextDp[j] + dp[j + 1]) % MOD;
            }
            dp = nextDp;
        }
        return dp[0];
    }
}''',
          '1D DP with radius pruning', 'Linear array walk counting', 'O(steps^2)', 'O(steps)',
          ['Dynamic Programming'],
          [('3, 2', '4', False), ('2, 4', '2', False), ('4, 2', '8', True)]
    )

    add_p('pack-500-part-a', 'Cherry Pickup Simultaneous Dual Paths', 'cherry-pickup-simultaneous-dual-paths',
          'Return max cherries from (0,0) to (n-1,n-1) and back.',
          'HARD', 1000, 128, 'n <= 50', 'grid', 'Integer',
          '[[0,1,-1],[1,0,-1],[1,1,1]]', '5', 200,
          ['Two people walk from (0,0) with step k = r1+c1.'],
          '''class Solution:
    def cherryPickup(self, grid: list) -> int:
        n = len(grid)
        dp = [[-1] * n for _ in range(n)]
        dp[0][0] = grid[0][0]
        for step in range(1, 2 * n - 1):
            next_dp = [[-1] * n for _ in range(n)]
            for r1 in range(max(0, step - (n - 1)), min(n, step + 1)):
                c1 = step - r1
                if grid[r1][c1] == -1: continue
                for r2 in range(r1, min(n, step + 1)):
                    c2 = step - r2
                    if grid[r2][c2] == -1: continue
                    cherries = grid[r1][c1] + (grid[r2][c2] if r1 != r2 else 0)
                    best_prev = -1
                    for pr1 in (r1 - 1, r1):
                        for pr2 in (r2 - 1, r2):
                            if 0 <= pr1 < n and 0 <= pr2 < n:
                                best_prev = max(best_prev, dp[pr1][pr2])
                    if best_prev != -1:
                        next_dp[r1][r2] = best_prev + cherries
            dp = next_dp
        return max(0, dp[n - 1][n - 1])''',
          '''class Solution {
    cherryPickup(grid) {
        const n = grid.length;
        let dp = Array.from({ length: n }, () => Array(n).fill(-1));
        dp[0][0] = grid[0][0];
        for (let step = 1; step < 2 * n - 1; step++) {
            const nextDp = Array.from({ length: n }, () => Array(n).fill(-1));
            for (let r1 = Math.max(0, step - (n - 1)); r1 < Math.min(n, step + 1); r1++) {
                const c1 = step - r1;
                if (grid[r1][c1] === -1) continue;
                for (let r2 = r1; r2 < Math.min(n, step + 1); r2++) {
                    const c2 = step - r2;
                    if (grid[r2][c2] === -1) continue;
                    const cherries = grid[r1][c1] + (r1 !== r2 ? grid[r2][c2] : 0);
                    let bestPrev = -1;
                    for (const pr1 of [r1 - 1, r1]) {
                        for (const pr2 of [r2 - 1, r2]) {
                            if (pr1 >= 0 && pr1 < n && pr2 >= 0 && pr2 < n) {
                                bestPrev = Math.max(bestPrev, dp[pr1][pr2]);
                            }
                        }
                    }
                    if (bestPrev !== -1) nextDp[r1][r2] = bestPrev + cherries;
                }
            }
            dp = nextDp;
        }
        return Math.max(0, dp[n - 1][n - 1]);
    }
}''',
          'Synchronized dual-path 3D/2D DP', 'Step-based diagonal grid traversal', 'O(N^3)', 'O(N^2)',
          ['Dynamic Programming', 'Matrix'],
          [('[[0,1,-1],[1,0,-1],[1,1,1]]', '5', False), ('[[1,1,-1],[1,-1,1],[-1,1,1]]', '0', False), ('[[1]]', '1', True)]
    )

    add_p('pack-500-part-a', 'Stone Game VII Difference in Scores', 'stone-game-vii-difference-in-scores',
          'Return max score difference Alice can achieve in Stone Game VII.',
          'MEDIUM', 1000, 128, 'n <= 1000', 'stones', 'Integer',
          '[5,3,1,4,2]', '6', 150,
          ['Interval DP with prefix sums.'],
          '''class Solution:
    def stoneGameVII(self, stones: list) -> int:
        n = len(stones)
        prefix = [0] * (n + 1)
        for i in range(n): prefix[i + 1] = prefix[i] + stones[i]
        def get_sum(i, j): return prefix[j + 1] - prefix[i]
        dp = [0] * n
        for length in range(2, n + 1):
            next_dp = [0] * (n - length + 1)
            for i in range(n - length + 1):
                j = i + length - 1
                next_dp[i] = max(get_sum(i + 1, j) - dp[i + 1], get_sum(i, j - 1) - dp[i])
            dp = next_dp
        return dp[0]''',
          '''class Solution {
    stoneGameVII(stones) {
        const n = stones.length;
        const prefix = [0];
        for (let i = 0; i < n; i++) prefix.push(prefix[i] + stones[i]);
        const getSum = (i, j) => prefix[j + 1] - prefix[i];
        let dp = Array(n).fill(0);
        for (let len = 2; len <= n; len++) {
            const nextDp = Array(n - len + 1).fill(0);
            for (let i = 0; i <= n - len; i++) {
                const j = i + len - 1;
                nextDp[i] = Math.max(getSum(i + 1, j) - dp[i + 1], getSum(i, j - 1) - dp[i]);
            }
            dp = nextDp;
        }
        return dp[0];
    }
}''',
          'Interval minimax DP', 'Rolling array on sub-interval lengths', 'O(N^2)', 'O(N)',
          ['Dynamic Programming', 'Game Theory'],
          [('[5,3,1,4,2]', '6', False), ('[7,90,5,1,100,10,10,2]', '122', False), ('[1,2]', '2', True)]
    )

    add_p('pack-500-part-a', 'Longest Valid Parentheses Substring DP', 'longest-valid-parentheses-substring-dp',
          'Return the length of the longest valid parentheses substring.',
          'HARD', 1000, 128, 'n <= 30000', 's', 'Integer',
          '")()())"', '4', 200,
          ['Look back matching open parenthesis position.'],
          '''class Solution:
    def longestValidParentheses(self, s: str) -> int:
        n = len(s)
        dp = [0] * n
        max_len = 0
        for i in range(1, n):
            if s[i] == ')':
                if s[i - 1] == '(':
                    dp[i] = (dp[i - 2] if i >= 2 else 0) + 2
                elif i - dp[i - 1] > 0 and s[i - dp[i - 1] - 1] == '(':
                    prev = dp[i - dp[i - 1] - 2] if i - dp[i - 1] >= 2 else 0
                    dp[i] = dp[i - 1] + 2 + prev
                max_len = max(max_len, dp[i])
        return max_len''',
          '''class Solution {
    longestValidParentheses(s) {
        const n = s.length;
        const dp = Array(n).fill(0);
        let maxLen = 0;
        for (let i = 1; i < n; i++) {
            if (s[i] === ')') {
                if (s[i - 1] === '(') dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
                else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
                    const prev = (i - dp[i - 1] >= 2) ? dp[i - dp[i - 1] - 2] : 0;
                    dp[i] = dp[i - 1] + 2 + prev;
                }
                maxLen = Math.max(maxLen, dp[i]);
            }
        }
        return maxLen;
    }
}''',
          '1D DP on parenthesis suffixes', 'Linear lookup table', 'O(N)', 'O(N)',
          ['Dynamic Programming', 'String'],
          [('")()())"', '4', False), ('"(()"', '2', False), ('""', '0', True)]
    )

    add_p('pack-500-part-a', 'Best Team With No Conflicts LIS Variant', 'best-team-with-no-conflicts-lis-variant',
          'Return max score for a team with no age-score conflicts.',
          'MEDIUM', 1000, 128, 'n <= 1000', 'scores, ages', 'Integer',
          '[4,5,6,5], [2,1,2,1]', '16', 150,
          ['Sort by age and score, find max weighted non-decreasing subsequence.'],
          '''class Solution:
    def bestTeamScore(self, scores: list, ages: list) -> int:
        players = sorted(zip(ages, scores))
        n = len(players)
        dp = [p[1] for p in players]
        for i in range(n):
            for j in range(i):
                if players[j][1] <= players[i][1]:
                    dp[i] = max(dp[i], dp[j] + players[i][1])
        return max(dp)''',
          '''class Solution {
    bestTeamScore(scores, ages) {
        const players = scores.map((s, i) => [ages[i], s]).sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
        const n = players.length;
        const dp = players.map(p => p[1]);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < i; j++) {
                if (players[j][1] <= players[i][1]) dp[i] = Math.max(dp[i], dp[j] + players[i][1]);
            }
        }
        return Math.max(...dp);
    }
}''',
          'Weighted LIS on sorted tuples', 'Quadratic dynamic programming', 'O(N^2)', 'O(N)',
          ['Dynamic Programming', 'Sorting'],
          [('[4,5,6,5], [2,1,2,1]', '16', False), ('[1,2,3,5], [8,9,10,1]', '6', False), ('[1,3,5,10,15], [1,2,3,4,5]', '34', True)]
    )

    # 13. Paint House II Minimum Cost
    add_p('pack-500-part-a', 'Paint House II Multi-Color Optimization', 'paint-house-ii-multi-color-optimization',
          'Given an n x k matrix of painting costs, return minimum cost to paint all houses such that no adjacent houses have same color.',
          'HARD', 1000, 128, '1 <= n <= 100\n1 <= k <= 20', 'costs', 'Integer',
          '[[1,5,3],[2,9,4]]', '5', 200,
          ['Track minimum and second minimum cost of previous house in O(1) space.'],
          '''class Solution:
    def minCostII(self, costs: list) -> int:
        if not costs: return 0
        n, k = len(costs), len(costs[0])
        min1, min2, idx1 = 0, 0, -1
        for i in range(n):
            n_min1, n_min2, n_idx1 = float('inf'), float('inf'), -1
            for j in range(k):
                cost = costs[i][j] + (min2 if j == idx1 else min1)
                if cost < n_min1:
                    n_min2, n_min1, n_idx1 = n_min1, cost, j
                elif cost < n_min2:
                    n_min2 = cost
            min1, min2, idx1 = n_min1, n_min2, n_idx1
        return min1''',
          '''class Solution {
    minCostII(costs) {
        if (!costs || costs.length === 0) return 0;
        const n = costs.length, k = costs[0].length;
        let min1 = 0, min2 = 0, idx1 = -1;
        for (let i = 0; i < n; i++) {
            let nMin1 = Infinity, nMin2 = Infinity, nIdx1 = -1;
            for (let j = 0; j < k; j++) {
                const cost = costs[i][j] + (j === idx1 ? min2 : min1);
                if (cost < nMin1) {
                    nMin2 = nMin1; nMin1 = cost; nIdx1 = j;
                } else if (cost < nMin2) {
                    nMin2 = cost;
                }
            }
            min1 = nMin1; min2 = nMin2; idx1 = nIdx1;
        }
        return min1;
    }
}''',
          'O(N*K) space-optimized DP', 'Min1 and Min2 color tracking', 'O(N*K)', 'O(1)',
          ['Dynamic Programming', 'Array'],
          [('[[1,5,3],[2,9,4]]', '5', False), ('[[1,3],[2,4]]', '5', False), ('[[7]]', '7', True)]
    )

    # 14. Maximum Vacation Days
    add_p('pack-500-part-a', 'Maximum Vacation Days Flights Graph', 'maximum-vacation-days-flights-graph',
          'Given flights between n cities and days[i][j] vacation days in city i on week j, return max vacation days.',
          'HARD', 1000, 128, 'n <= 100, k <= 100', 'flights, days', 'Integer',
          '[[0,1,1],[1,0,1],[1,1,0]], [[1,3,1],[6,0,3],[3,3,3]]', '12', 200,
          ['dp[city] tracks max days for current week.'],
          '''class Solution:
    def maxVacationDays(self, flights: list, days: list) -> int:
        n = len(flights)
        k = len(days[0])
        dp = [-1] * n
        dp[0] = 0
        for w in range(k):
            next_dp = [-1] * n
            for cur in range(n):
                if dp[cur] < 0: continue
                for nxt in range(n):
                    if cur == nxt or flights[cur][nxt]:
                        next_dp[nxt] = max(next_dp[nxt], dp[cur] + days[nxt][w])
            dp = next_dp
        return max(dp)''',
          '''class Solution {
    maxVacationDays(flights, days) {
        const n = flights.length, k = days[0].length;
        let dp = Array(n).fill(-1);
        dp[0] = 0;
        for (let w = 0; w < k; w++) {
            const nextDp = Array(n).fill(-1);
            for (let cur = 0; cur < n; cur++) {
                if (dp[cur] < 0) continue;
                for (let nxt = 0; nxt < n; nxt++) {
                    if (cur === nxt || flights[cur][nxt]) {
                        nextDp[nxt] = Math.max(nextDp[nxt], dp[cur] + days[nxt][w]);
                    }
                }
            }
            dp = nextDp;
        }
        return Math.max(...dp);
    }
}''',
          'Weekly State Space DP on Flight Graph', 'Dynamic graph transitions', 'O(K * N^2)', 'O(N)',
          ['Dynamic Programming', 'Graph'],
          [('[[0,1,1],[1,0,1],[1,1,0]], [[1,3,1],[6,0,3],[3,3,3]]', '12', False),
           ('[[0,0,0],[0,0,0],[0,0,0]], [[1,1,1],[2,2,2],[3,3,3]]', '3', False),
           ('[[0,1,1],[1,0,1],[1,1,0]], [[7,0,0],[0,7,0],[0,0,7]]', '21', True)]
    )

    # 15. Form Largest Integer With Digits That Add Up to Target
    add_p('pack-500-part-a', 'Form Largest Integer With Digits Adding to Target', 'form-largest-integer-with-digits-adding-to-target',
          'Given cost array for digits 1-9 and integer target, return largest integer string whose digits cost exactly target.',
          'HARD', 1000, 128, 'target <= 5000', 'cost, target', 'String',
          '[4,3,2,5,6,7,2,5,5], 9', '"7772"', 200,
          ['First maximize digit length, then greedily pick largest digits.'],
          '''class Solution:
    def largestNumber(self, cost: list, target: int) -> str:
        dp = [-1] * (target + 1)
        dp[0] = 0
        for c in cost:
            for t in range(c, target + 1):
                if dp[t - c] >= 0:
                    dp[t] = max(dp[t], dp[t - c] + 1)
        if dp[target] < 0: return "0"
        res = []
        cur = target
        for d in range(9, 0, -1):
            c = cost[d - 1]
            while cur >= c and dp[cur] == dp[cur - c] + 1:
                res.append(str(d))
                cur -= c
        return "".join(res)''',
          '''class Solution {
    largestNumber(cost, target) {
        const dp = Array(target + 1).fill(-1);
        dp[0] = 0;
        for (const c of cost) {
            for (let t = c; t <= target; t++) {
                if (dp[t - c] >= 0) dp[t] = Math.max(dp[t], dp[t - c] + 1);
            }
        }
        if (dp[target] < 0) return "0";
        const res = [];
        let cur = target;
        for (let d = 9; d >= 1; d--) {
            const c = cost[d - 1];
            while (cur >= c && dp[cur] === dp[cur - c] + 1) {
                res.push(d);
                cur -= c;
            }
        }
        return res.join("");
    }
}''',
          'Unbounded knapsack with greedy reconstruction', 'Max length + largest digits', 'O(target)', 'O(target)',
          ['Dynamic Programming', 'Knapsack', 'Greedy'],
          [('[4,3,2,5,6,7,2,5,5], 9', '"7772"', False), ('[7,6,5,5,5,6,8,7,8], 12', '"85"', False), ('[2,4,6,2,4,6,4,4,4], 5', '"0"', True)]
    )

    # 16. Count All Possible Routes City Fuel
    add_p('pack-500-part-a', 'Count All Possible Routes City Fuel', 'count-all-possible-routes-city-fuel',
          'Given locations array, start, finish, and fuel, return number of possible routes modulo 10^9 + 7.',
          'HARD', 1000, 128, 'locations <= 100, fuel <= 200', 'locations, start, finish, fuel', 'Integer',
          '[2,3,6,8,4], 1, 3, 5', '4', 200,
          ['dp(city, rem_fuel) is memoized state.'],
          '''class Solution:
    def countRoutes(self, locations: list, start: int, finish: int, fuel: int) -> int:
        MOD = 10**9 + 7
        n = len(locations)
        memo = {}
        def solve(city, f):
            if f < 0: return 0
            if (city, f) in memo: return memo[(city, f)]
            ans = 1 if city == finish else 0
            for nxt in range(n):
                if nxt != city:
                    cost = abs(locations[city] - locations[nxt])
                    if f >= cost:
                        ans = (ans + solve(nxt, f - cost)) % MOD
            memo[(city, f)] = ans
            return ans
        return solve(start, fuel)''',
          '''class Solution {
    countRoutes(locations, start, finish, fuel) {
        const MOD = 1000000007;
        const n = locations.length;
        const memo = new Map();
        function solve(city, f) {
            if (f < 0) return 0;
            const key = city * 201 + f;
            if (memo.has(key)) return memo.get(key);
            let ans = city === finish ? 1 : 0;
            for (let nxt = 0; nxt < n; nxt++) {
                if (nxt !== city) {
                    const cost = Math.abs(locations[city] - locations[nxt]);
                    if (f >= cost) ans = (ans + solve(nxt, f - cost)) % MOD;
                }
            }
            memo.set(key, ans);
            return ans;
        }
        return solve(start, fuel);
    }
}''',
          'Memoized State DP on City and Remaining Fuel', '2D fuel-state transitions', 'O(N^2 * fuel)', 'O(N * fuel)',
          ['Dynamic Programming', 'Memoization'],
          [('[2,3,6,8,4], 1, 3, 5', '4', False), ('[4,3,1], 1, 0, 6', '5', False), ('[5,2,1], 0, 2, 3', '0', True)]
    )

    # 17. Numbers at Most N Given Digit Set
    add_p('pack-500-part-a', 'Numbers at Most N Given Digit Set', 'numbers-at-most-n-given-digit-set',
          'Given an array of digits (sorted strings) and an integer n, return count of positive integers <= n formed by digits.',
          'HARD', 1000, 128, 'n <= 10^9', 'digits, n', 'Integer',
          '["1","3","5","7"], 100', '20', 200,
          ['Count shorter numbers with pow(len(digits), k), then match prefix with digits.'],
          '''class Solution:
    def atMostNGivenDigitSet(self, digits: list, n: int) -> int:
        s = str(n)
        k = len(s)
        num_digits = len(digits)
        ans = sum(num_digits ** i for i in range(1, k))
        for i, ch in enumerate(s):
            smaller = sum(1 for d in digits if d < ch)
            ans += smaller * (num_digits ** (k - 1 - i))
            if ch not in digits: break
            if i == k - 1: ans += 1
        return ans''',
          '''class Solution {
    atMostNGivenDigitSet(digits, n) {
        const s = String(n);
        const k = s.length;
        const numDigits = digits.length;
        let ans = 0;
        for (let i = 1; i < k; i++) ans += Math.pow(numDigits, i);
        for (let i = 0; i < k; i++) {
            const ch = s[i];
            let smaller = 0;
            for (const d of digits) if (d < ch) smaller++;
            ans += smaller * Math.pow(numDigits, k - 1 - i);
            if (!digits.includes(ch)) break;
            if (i === k - 1) ans++;
        }
        return ans;
    }
}''',
          'Digit DP with base counting', 'Count shorter lengths + prefix matching', 'O(log10(N))', 'O(log10(N))',
          ['Dynamic Programming', 'Math', 'String'],
          [('["1","3","5","7"], 100', '20', False), ('["1","4","9"], 1000000000', '29523', False), ('["7"], 8', '1', True)]
    )

    # 18. Distinct Echo Substrings Rolling Hash DP
    add_p('pack-500-part-a', 'Distinct Echo Substrings Count', 'distinct-echo-substrings-count',
          'Return number of distinct non-empty substrings that can be written as concatenation of a string with itself (e.g. "abcabc").',
          'HARD', 1000, 128, 'text.length <= 2000', 'text', 'Integer',
          '"abcabcabc"', '3', 200,
          ['For each even length 2L, check if text[i..i+L] == text[i+L..i+2L].'],
          '''class Solution:
    def distinctEchoSubstrings(self, text: str) -> int:
        n = len(text)
        MOD = 10**9 + 7
        BASE = 31
        hashes = [0] * (n + 1)
        powers = [1] * (n + 1)
        for i in range(n):
            hashes[i + 1] = (hashes[i] * BASE + ord(text[i])) % MOD
            powers[i + 1] = (powers[i] * BASE) % MOD
        def get_hash(l, r):
            return (hashes[r] - hashes[l] * powers[r - l]) % MOD
        seen = set()
        for L in range(1, n // 2 + 1):
            for i in range(n - 2 * L + 1):
                if get_hash(i, i + L) == get_hash(i + L, i + 2 * L):
                    seen.add(get_hash(i, i + 2 * L))
        return len(seen)''',
          '''class Solution {
    distinctEchoSubstrings(text) {
        const n = text.length;
        const MOD = 1000000007n;
        const BASE = 31n;
        const hashes = Array(n + 1).fill(0n);
        const powers = Array(n + 1).fill(1n);
        for (let i = 0; i < n; i++) {
            hashes[i + 1] = (hashes[i] * BASE + BigInt(text.charCodeAt(i))) % MOD;
            powers[i + 1] = (powers[i] * BASE) % MOD;
        }
        function getHash(l, r) {
            let h = (hashes[r] - hashes[l] * powers[r - l]) % MOD;
            if (h < 0n) h += MOD;
            return h;
        }
        const seen = new Set();
        for (let L = 1; L <= Math.floor(n / 2); L++) {
            for (let i = 0; i <= n - 2 * L; i++) {
                if (getHash(i, i + L) === getHash(i + L, i + 2 * L)) {
                    seen.add(getHash(i, i + 2 * L).toString());
                }
            }
        }
        return seen.size;
    }
}''',
          'Rolling Hash Substring Equivalence', 'Length-based segment matching with O(1) hash queries', 'O(N^2)', 'O(N)',
          ['String', 'Rolling Hash', 'Dynamic Programming'],
          [('"abcabcabc"', '3', False), ('"leetcodeleetcode"', '2', False), ('"a"', '0', True)]
    )

    # 19. Paint House III Target Neighborhoods 3D DP
    add_p('pack-500-part-a', 'Paint House III Target Neighborhoods', 'paint-house-iii-target-neighborhoods',
          'Given houses (some painted), cost matrix, m houses, n colors, and target neighborhoods, return min cost or -1.',
          'HARD', 1000, 128, 'm, n, target <= 100', 'houses, cost, m, n, target', 'Integer',
          '[0,0,0,0,0], [[1,10],[10,1],[10,1],[1,10],[5,1]], 5, 2, 3', '9', 200,
          ['State dp(i, target_rem, prev_color).'],
          '''class Solution:
    def minCost(self, houses: list, cost: list, m: int, n: int, target: int) -> int:
        memo = {}
        def solve(i, t, prev_c):
            if t < 0: return float('inf')
            if i == m: return 0 if t == 0 else float('inf')
            key = (i, t, prev_c)
            if key in memo: return memo[key]
            ans = float('inf')
            if houses[i] != 0:
                c = houses[i]
                new_t = t - (1 if c != prev_c else 0)
                ans = solve(i + 1, new_t, c)
            else:
                for c in range(1, n + 1):
                    new_t = t - (1 if c != prev_c else 0)
                    ans = min(ans, cost[i][c - 1] + solve(i + 1, new_t, c))
            memo[key] = ans
            return ans
        res = solve(0, target, 0)
        return res if res != float('inf') else -1''',
          '''class Solution {
    minCost(houses, cost, m, n, target) {
        const memo = new Map();
        function solve(i, t, prevC) {
            if (t < 0) return Infinity;
            if (i === m) return t === 0 ? 0 : Infinity;
            const key = (i * 105 + t) * 105 + prevC;
            if (memo.has(key)) return memo.get(key);
            let ans = Infinity;
            if (houses[i] !== 0) {
                const c = houses[i];
                const newT = t - (c !== prevC ? 1 : 0);
                ans = solve(i + 1, newT, c);
            } else {
                for (let c = 1; c <= n; c++) {
                    const newT = t - (c !== prevC ? 1 : 0);
                    ans = Math.min(ans, cost[i][c - 1] + solve(i + 1, newT, c));
                }
            }
            memo.set(key, ans);
            return ans;
        }
        const res = solve(0, target, 0);
        return res !== Infinity ? res : -1;
    }
}''',
          '3D Dynamic Programming with Neighborhoods', 'Memoized color and target partitioning', 'O(M * target * N^2)', 'O(M * target * N)',
          ['Dynamic Programming', 'Memoization'],
          [('[0,0,0,0,0], [[1,10],[10,1],[10,1],[1,10],[5,1]], 5, 2, 3', '9', False),
           ('[0,2,1,2,0], [[1,10],[10,1],[10,1],[1,10],[5,1]], 5, 2, 3', '11', False),
           ('[3,1,2,3], [[1,1,1],[1,1,1],[1,1,1],[1,1,1]], 4, 3, 3', '-1', True)]
    )

    # ==========================================
    # PACK B: Advanced Graphs & Flows (19 problems)
    # ==========================================
    add_p('pack-500-part-b', 'Edmonds-Karp Maximum Network Flow', 'edmonds-karp-maximum-network-flow',
          'Given a directed flow network, source s, sink t, and edge capacities, compute maximum flow.',
          'HARD', 1000, 128, 'n <= 100', 'n, s, t, edges', 'Integer',
          '4, 0, 3, [[0,1,10],[0,2,10],[1,2,2],[1,3,4],[2,3,9]]', '13', 200,
          ['Find shortest augmenting paths on residual graph with BFS.'],
          '''class Solution:
    def maxFlow(self, n: int, s: int, t: int, edges: list) -> int:
        from collections import deque
        capacity = [[0] * n for _ in range(n)]
        adj = [[] for _ in range(n)]
        for u, v, cap in edges:
            capacity[u][v] += cap
            adj[u].append(v)
            adj[v].append(u)
        flow = 0
        while True:
            parent = [-1] * n
            parent[s] = s
            queue = deque([(s, float('inf'))])
            aug = 0
            while queue:
                u, f = queue.popleft()
                if u == t: aug = f; break
                for v in adj[u]:
                    if parent[v] == -1 and capacity[u][v] > 0:
                        parent[v] = u
                        queue.append((v, min(f, capacity[u][v])))
            if aug == 0: break
            flow += aug
            cur = t
            while cur != s:
                p = parent[cur]
                capacity[p][cur] -= aug
                capacity[cur][p] += aug
                cur = p
        return flow''',
          '''class Solution {
    maxFlow(n, s, t, edges) {
        const capacity = Array.from({ length: n }, () => Array(n).fill(0));
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v, cap] of edges) {
            capacity[u][v] += cap; adj[u].push(v); adj[v].push(u);
        }
        let flow = 0;
        while (true) {
            const parent = Array(n).fill(-1);
            parent[s] = s;
            const queue = [[s, Infinity]];
            let aug = 0;
            while (queue.length > 0) {
                const [u, f] = queue.shift();
                if (u === t) { aug = f; break; }
                for (const v of adj[u]) {
                    if (parent[v] === -1 && capacity[u][v] > 0) {
                        parent[v] = u; queue.push([v, Math.min(f, capacity[u][v])]);
                    }
                }
            }
            if (aug === 0) break;
            flow += aug;
            let cur = t;
            while (cur !== s) {
                const p = parent[cur];
                capacity[p][cur] -= aug; capacity[cur][p] += aug; cur = p;
            }
        }
        return flow;
    }
}''',
          'Edmonds-Karp BFS Augmenting Paths', 'Max-flow min-cut network augmentation', 'O(V * E^2)', 'O(V^2)',
          ['Graph', 'Network Flow', 'Breadth-First Search'],
          [('4, 0, 3, [[0,1,10],[0,2,10],[1,2,2],[1,3,4],[2,3,9]]', '13', False), ('2, 0, 1, [[0,1,5]]', '5', False), ('3, 0, 2, [[0,1,10],[1,2,0]]', '0', True)]
    )

    add_p('pack-500-part-b', 'Parallel Courses III DAG DP', 'parallel-courses-iii-dag-dp',
          'Given n courses and prerequisite relations forming a DAG, return min months to complete all courses in parallel.',
          'HARD', 1000, 128, 'n <= 50000', 'n, relations, time', 'Integer',
          '3, [[1,3],[2,3]], [3,2,5]', '8', 200,
          ['Track longest path in DAG using topological sort.'],
          '''class Solution:
    def minimumTime(self, n: int, relations: list, time: list) -> int:
        from collections import deque
        adj = [[] for _ in range(n + 1)]
        in_degree = [0] * (n + 1)
        for u, v in relations:
            adj[u].append(v)
            in_degree[v] += 1
        dist = [0] * (n + 1)
        queue = deque([i for i in range(1, n + 1) if in_degree[i] == 0])
        for i in queue: dist[i] = time[i - 1]
        while queue:
            u = queue.popleft()
            for v in adj[u]:
                if dist[u] + time[v - 1] > dist[v]: dist[v] = dist[u] + time[v - 1]
                in_degree[v] -= 1
                if in_degree[v] == 0: queue.append(v)
        return max(dist)''',
          '''class Solution {
    minimumTime(n, relations, time) {
        const adj = Array.from({ length: n + 1 }, () => []);
        const inDegree = Array(n + 1).fill(0);
        for (const [u, v] of relations) { adj[u].push(v); inDegree[v]++; }
        const dist = Array(n + 1).fill(0);
        const queue = [];
        for (let i = 1; i <= n; i++) {
            if (inDegree[i] === 0) { dist[i] = time[i - 1]; queue.push(i); }
        }
        while (queue.length > 0) {
            const u = queue.shift();
            for (const v of adj[u]) {
                if (dist[u] + time[v - 1] > dist[v]) dist[v] = dist[u] + time[v - 1];
                inDegree[v]--;
                if (inDegree[v] === 0) queue.push(v);
            }
        }
        return Math.max(...dist);
    }
}''',
          'Topological Sort DAG DP', 'Longest path propagation', 'O(V + E)', 'O(V + E)',
          ['Graph', 'Dynamic Programming', 'Topological Sort'],
          [('3, [[1,3],[2,3]], [3,2,5]', '8', False), ('5, [[1,5],[2,5],[3,5],[3,4],[4,5]], [1,2,3,4,5]', '12', False), ('1, [], [10]', '10', True)]
    )

    add_p('pack-500-part-b', 'Snakes and Ladders BFS Shortest Path', 'snakes-and-ladders-bfs-shortest-path',
          'Return min dice throws to reach n^2 on snake & ladders board, or -1.',
          'MEDIUM', 1000, 128, 'n <= 20', 'board', 'Integer',
          '[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]', '4', 150,
          ['Map 1D to 2D alternating grid coords.'],
          '''class Solution:
    def snakesAndLadders(self, board: list) -> int:
        from collections import deque
        n = len(board)
        def get_rc(sq):
            r = (sq - 1) // n
            c = (sq - 1) % n
            row = n - 1 - r
            col = c if r % 2 == 0 else n - 1 - c
            return row, col
        visited = {1}
        queue = deque([(1, 0)])
        target = n * n
        while queue:
            sq, moves = queue.popleft()
            if sq == target: return moves
            for dice in range(1, 7):
                nxt = sq + dice
                if nxt > target: break
                r, c = get_rc(nxt)
                dest = board[r][c] if board[r][c] != -1 else nxt
                if dest not in visited:
                    visited.add(dest)
                    queue.append((dest, moves + 1))
        return -1''',
          '''class Solution {
    snakesAndLadders(board) {
        const n = board.length;
        const target = n * n;
        function getRC(sq) {
            const r = Math.floor((sq - 1) / n);
            const c = (sq - 1) % n;
            const row = n - 1 - r;
            const col = (r % 2 === 0) ? c : n - 1 - c;
            return [row, col];
        }
        const visited = new Set([1]);
        const queue = [[1, 0]];
        while (queue.length > 0) {
            const [sq, moves] = queue.shift();
            if (sq === target) return moves;
            for (let dice = 1; dice <= 6; dice++) {
                const nxt = sq + dice;
                if (nxt > target) break;
                const [r, c] = getRC(nxt);
                const dest = board[r][c] !== -1 ? board[r][c] : nxt;
                if (!visited.has(dest)) {
                    visited.add(dest); queue.push([dest, moves + 1]);
                }
            }
        }
        return -1;
    }
}''',
          'Breadth-First Search on Unweighted Board', 'Shortest distance search', 'O(N^2)', 'O(N^2)',
          ['Graph', 'Breadth-First Search'],
          [('[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]', '4', False), ('[[-1,-1],[-1,3]]', '1', False), ('[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]', '2', True)]
    )

    add_p('pack-500-part-b', 'Shortest Cycle in an Undirected Graph Girth', 'shortest-cycle-in-an-undirected-graph-girth',
          'Return the length of the shortest cycle in an undirected graph, or -1.',
          'HARD', 1000, 128, 'n <= 1000', 'n, edges', 'Integer',
          '7, [[0,1],[1,2],[2,0],[3,4],[4,5],[5,6],[6,3]]', '3', 200,
          ['Run BFS from each node to find shortest cross-edge cycle.'],
          '''class Solution:
    def findShortestCycle(self, n: int, edges: list) -> int:
        from collections import deque
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v); adj[v].append(u)
        ans = float('inf')
        for start in range(n):
            dist = [-1] * n
            dist[start] = 0
            parent = [-1] * n
            queue = deque([start])
            while queue:
                u = queue.popleft()
                for v in adj[u]:
                    if dist[v] == -1:
                        dist[v] = dist[u] + 1; parent[v] = u; queue.append(v)
                    elif parent[u] != v:
                        ans = min(ans, dist[u] + dist[v] + 1)
        return ans if ans != float('inf') else -1''',
          '''class Solution {
    findShortestCycle(n, edges) {
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }
        let ans = Infinity;
        for (let start = 0; start < n; start++) {
            const dist = Array(n).fill(-1);
            dist[start] = 0;
            const parent = Array(n).fill(-1);
            const queue = [start];
            while (queue.length > 0) {
                const u = queue.shift();
                for (const v of adj[u]) {
                    if (dist[v] === -1) {
                        dist[v] = dist[u] + 1; parent[v] = u; queue.push(v);
                    } else if (parent[u] !== v) {
                        ans = Math.min(ans, dist[u] + dist[v] + 1);
                    }
                }
            }
        }
        return ans !== Infinity ? ans : -1;
    }
}''',
          'Multi-source BFS Graph Girth', 'Shortest cycle search', 'O(V*(V+E))', 'O(V+E)',
          ['Graph', 'Breadth-First Search'],
          [('7, [[0,1],[1,2],[2,0],[3,4],[4,5],[5,6],[6,3]]', '3', False), ('4, [[0,1],[0,2]]', '-1', False), ('4, [[0,1],[1,2],[2,3],[3,0]]', '4', True)]
    )

    add_p('pack-500-part-b', 'Bus Routes Multi-Source BFS', 'bus-routes-multi-source-bfs',
          'Return least buses taken to reach target from source, or -1.',
          'HARD', 1000, 128, 'routes.length <= 500', 'routes, source, target', 'Integer',
          '[[1,2,7],[3,6,7]], 1, 6', '2', 200,
          ['BFS over bus route IDs.'],
          '''class Solution:
    def numBusesToDestination(self, routes: list, source: int, target: int) -> int:
        if source == target: return 0
        from collections import defaultdict, deque
        stop_to_routes = defaultdict(list)
        for r_id, route in enumerate(routes):
            for stop in route: stop_to_routes[stop].append(r_id)
        visited_routes = set()
        visited_stops = {source}
        queue = deque([(source, 0)])
        while queue:
            stop, buses = queue.popleft()
            if stop == target: return buses
            for r_id in stop_to_routes[stop]:
                if r_id in visited_routes: continue
                visited_routes.add(r_id)
                for next_stop in routes[r_id]:
                    if next_stop not in visited_stops:
                        visited_stops.add(next_stop)
                        queue.append((next_stop, buses + 1))
        return -1''',
          '''class Solution {
    numBusesToDestination(routes, source, target) {
        if (source === target) return 0;
        const stopToRoutes = new Map();
        for (let rId = 0; rId < routes.length; rId++) {
            for (const stop of routes[rId]) {
                if (!stopToRoutes.has(stop)) stopToRoutes.set(stop, []);
                stopToRoutes.get(stop).push(rId);
            }
        }
        const visitedRoutes = new Set();
        const visitedStops = new Set([source]);
        const queue = [[source, 0]];
        while (queue.length > 0) {
            const [stop, buses] = queue.shift();
            if (stop === target) return buses;
            for (const rId of (stopToRoutes.get(stop) || [])) {
                if (visitedRoutes.has(rId)) continue;
                visitedRoutes.add(rId);
                for (const nextStop of routes[rId]) {
                    if (!visitedStops.has(nextStop)) {
                        visitedStops.add(nextStop); queue.push([nextStop, buses + 1]);
                    }
                }
            }
        }
        return -1;
    }
}''',
          'Route-Level Multi-Source BFS', 'Optimized transit navigation', 'O(sum(routes))', 'O(sum(routes))',
          ['Graph', 'Breadth-First Search'],
          [('[[1,2,7],[3,6,7]], 1, 6', '2', False), ('[[7,12],[4,5,15],[6],[15,19],[9,12,13]], 15, 12', '-1', False), ('[[1,2,3]], 1, 1', '0', True)]
    )

    add_p('pack-500-part-b', 'Open the Lock Minimum Turns BFS', 'open-the-lock-minimum-turns-bfs',
          'Return min turns to reach target from "0000" avoiding deadends.',
          'MEDIUM', 1000, 128, 'deadends <= 500', 'deadends, target', 'Integer',
          '["0201","0101","0102","1212","2002"], "0202"', '6', 150,
          ['8 transitions per lock state.'],
          '''class Solution:
    def openLock(self, deadends: list, target: str) -> int:
        from collections import deque
        dead = set(deadends)
        if '0000' in dead: return -1
        if target == '0000': return 0
        visited = {'0000'}
        queue = deque([('0000', 0)])
        while queue:
            state, turns = queue.popleft()
            if state == target: return turns
            for i in range(4):
                digit = int(state[i])
                for d in (-1, 1):
                    new_digit = (digit + d) % 10
                    nxt = state[:i] + str(new_digit) + state[i + 1:]
                    if nxt not in dead and nxt not in visited:
                        visited.add(nxt); queue.append((nxt, turns + 1))
        return -1''',
          '''class Solution {
    openLock(deadends, target) {
        const dead = new Set(deadends);
        if (dead.has('0000')) return -1;
        if (target === '0000') return 0;
        const visited = new Set(['0000']);
        const queue = [['0000', 0]];
        while (queue.length > 0) {
            const [state, turns] = queue.shift();
            if (state === target) return turns;
            for (let i = 0; i < 4; i++) {
                const digit = parseInt(state[i], 10);
                for (const d of [-1, 1]) {
                    const newDigit = (digit + d + 10) % 10;
                    const nxt = state.slice(0, i) + newDigit + state.slice(i + 1);
                    if (!dead.has(nxt) && !visited.has(nxt)) {
                        visited.add(nxt); queue.push([nxt, turns + 1]);
                    }
                }
            }
        }
        return -1;
    }
}''',
          '8-Neighbor State-Space BFS', 'Search on 10,000 combinations', 'O(1)', 'O(1)',
          ['Graph', 'Breadth-First Search'],
          [('["0201","0101","0102","1212","2002"], "0202"', '6', False), ('["8888"], "0009"', '1', False), ('["8887","8889","8878","8898","8788","8988","7888","9888"], "8888"', '-1', True)]
    )

    # 7. Kosaraju Strongly Connected Components Count
    add_p('pack-500-part-b', 'Kosaraju Strongly Connected Components Count', 'kosaraju-strongly-connected-components-count',
          'Given a directed graph with n nodes (0 to n-1) and directed edges, return the number of strongly connected components.',
          'MEDIUM', 1000, 128, '1 <= n <= 10^4\n0 <= edges.length <= 5*10^4', 'n, edges', 'Integer',
          '5, [[1,0],[0,2],[2,1],[0,3],[3,4]]', '3', 150,
          ['Pass 1: DFS recording order by exit time. Pass 2: DFS on reversed graph in decreasing exit order.'],
          '''class Solution:
    def countSCC(self, n: int, edges: list) -> int:
        adj = [[] for _ in range(n)]
        radj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            radj[v].append(u)
        order = []
        vis = [False] * n
        def dfs1(u):
            vis[u] = True
            for v in adj[u]:
                if not vis[v]: dfs1(v)
            order.append(u)
        for i in range(n):
            if not vis[i]: dfs1(i)
        vis = [False] * n
        def dfs2(u):
            vis[u] = True
            for v in radj[u]:
                if not vis[v]: dfs2(v)
        scc_count = 0
        for u in reversed(order):
            if not vis[u]:
                dfs2(u)
                scc_count += 1
        return scc_count''',
          '''class Solution {
    countSCC(n, edges) {
        const adj = Array.from({ length: n }, () => []);
        const radj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v); radj[v].push(u);
        }
        const order = [];
        const vis = Array(n).fill(false);
        function dfs1(u) {
            vis[u] = true;
            for (const v of adj[u]) if (!vis[v]) dfs1(v);
            order.push(u);
        }
        for (let i = 0; i < n; i++) if (!vis[i]) dfs1(i);
        vis.fill(false);
        function dfs2(u) {
            vis[u] = true;
            for (const v of radj[u]) if (!vis[v]) dfs2(v);
        }
        let sccCount = 0;
        for (let i = order.length - 1; i >= 0; i--) {
            const u = order[i];
            if (!vis[u]) {
                dfs2(u);
                sccCount++;
            }
        }
        return sccCount;
    }
}''',
          'Kosaraju Two-Pass DFS Algorithm', 'Reversed graph SCC condensation', 'O(V + E)', 'O(V + E)',
          ['Graph', 'Depth-First Search', 'Strongly Connected Components'],
          [('5, [[1,0],[0,2],[2,1],[0,3],[3,4]]', '3', False), ('4, [[0,1],[1,2],[2,3],[3,0]]', '1', False), ('3, []', '3', True)]
    )

    # 8. Path With Maximum Minimum Value
    add_p('pack-500-part-b', 'Path With Maximum Minimum Value', 'path-with-maximum-minimum-value',
          'Given an m x n matrix of integers, find a path from (0,0) to (m-1,n-1) that maximizes the minimum value along the path.',
          'MEDIUM', 1000, 128, '1 <= m, n <= 100', 'grid', 'Integer',
          '[[5,4,5],[1,2,6],[7,4,6]]', '4', 150,
          ['Use a max-heap priority queue (Dijkstra variant).'],
          '''class Solution:
    def maximumMinimumPath(self, grid: list) -> int:
        import heapq
        m, n = len(grid), len(grid[0])
        heap = [(-grid[0][0], 0, 0)]
        visited = [[False] * n for _ in range(m)]
        visited[0][0] = True
        ans = grid[0][0]
        while heap:
            val, r, c = heapq.heappop(heap)
            val = -val
            ans = min(ans, val)
            if r == m - 1 and c == n - 1:
                return ans
            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc]:
                    visited[nr][nc] = True
                    heapq.heappush(heap, (-grid[nr][nc], nr, nc))
        return ans''',
          '''class Solution {
    maximumMinimumPath(grid) {
        const m = grid.length, n = grid[0].length;
        const visited = Array.from({ length: m }, () => Array(n).fill(false));
        const pq = [[grid[0][0], 0, 0]];
        visited[0][0] = true;
        let ans = grid[0][0];
        while (pq.length > 0) {
            pq.sort((a, b) => b[0] - a[0]);
            const [val, r, c] = pq.shift();
            ans = Math.min(ans, val);
            if (r === m - 1 && c === n - 1) return ans;
            for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    pq.push([grid[nr][nc], nr, nc]);
                }
            }
        }
        return ans;
    }
}''',
          'Max-Heap Greedy Best-First Search', 'Priority traversal on bottle-neck values', 'O(M*N log(M*N))', 'O(M*N)',
          ['Graph', 'Heap', 'Breadth-First Search'],
          [('[[5,4,5],[1,2,6],[7,4,6]]', '4', False), ('[[2,2,1,2,2,2],[1,2,2,2,1,2]]', '2', False), ('[[3,4,6,3,4],[0,2,1,1,7],[8,8,3,2,7],[3,2,4,9,8],[4,1,2,0,0],[4,6,5,4,3]]', '3', True)]
    )

    # 9. Minimum Cost Walk in Weighted Graph Bitwise AND
    add_p('pack-500-part-b', 'Minimum Cost Walk With Bitwise AND', 'minimum-cost-walk-with-bitwise-and',
          'Given n nodes, weighted undirected edges, and query pairs [src, dst], return the min bitwise AND sum of walk for each query, or -1 if unreachable.',
          'MEDIUM', 1000, 128, 'n <= 10^5, edges <= 10^5', 'n, edges, query', 'List',
          '5, [[0,1,7],[1,3,7],[1,2,1]], [[0,3],[3,4]]', '[7,-1]', 150,
          ['Every reachable edge in connected component can be traversed multiple times; cost is component-wide bitwise AND.'],
          '''class Solution:
    def minimumCost(self, n: int, edges: list, query: list) -> list:
        parent = list(range(n))
        comp_and = [(1 << 30) - 1] * n
        def find(i):
            if parent[i] == i: return i
            parent[i] = find(parent[i])
            return parent[i]
        def union(i, j, w):
            root_i, root_j = find(i), find(j)
            if root_i != root_j:
                parent[root_i] = root_j
                comp_and[root_j] &= comp_and[root_i] & w
            else:
                comp_and[root_j] &= w
        for u, v, w in edges:
            union(u, v, w)
        res = []
        for s, t in query:
            if s == t:
                res.append(0)
            elif find(s) != find(t):
                res.append(-1)
            else:
                res.append(comp_and[find(s)])
        return res''',
          '''class Solution {
    minimumCost(n, edges, query) {
        const parent = Array.from({ length: n }, (_, i) => i);
        const compAnd = Array(n).fill((1 << 30) - 1);
        function find(i) {
            if (parent[i] === i) return i;
            parent[i] = find(parent[i]);
            return parent[i];
        }
        function union(i, j, w) {
            const rootI = find(i), rootJ = find(j);
            if (rootI !== rootJ) {
                parent[rootI] = rootJ;
                compAnd[rootJ] &= compAnd[rootI] & w;
            } else {
                compAnd[rootJ] &= w;
            }
        }
        for (const [u, v, w] of edges) union(u, v, w);
        return query.map(([s, t]) => {
            if (s === t) return 0;
            if (find(s) !== find(t)) return -1;
            return compAnd[find(s)];
        });
    }
}''',
          'Disjoint Set Union with Bitwise AND Monoid', 'Component-wide bitwise AND reduction', 'O(N + E + Q)', 'O(N)',
          ['Graph', 'Union Find', 'Bit Manipulation'],
          [('5, [[0,1,7],[1,3,7],[1,2,1]], [[0,3],[3,4]]', '[7,-1]', False), ('3, [[0,2,7],[0,1,15],[1,2,6],[1,2,1]], [[1,2]]', '[0]', False), ('1, [], [[0,0]]', '[0]', True)]
    )

    # 10. Reconstruct Itinerary Hierholzer's Algorithm
    add_p('pack-500-part-b', 'Reconstruct Itinerary Eulerian Path', 'reconstruct-itinerary-eulerian-path',
          'Given airline tickets from JFK, reconstruct itinerary in lexicographically smallest order using all tickets.',
          'HARD', 1000, 128, 'tickets <= 300', 'tickets', 'List',
          '[["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]', '["JFK","MUC","LHR","SFO","SJC"]', 200,
          ['Hierholzer algorithm for Eulerian path.'],
          '''class Solution:
    def findItinerary(self, tickets: list) -> list:
        from collections import defaultdict
        adj = defaultdict(list)
        for u, v in sorted(tickets, reverse=True):
            adj[u].append(v)
        itinerary = []
        def dfs(u):
            while adj[u]:
                dfs(adj[u].pop())
            itinerary.append(u)
        dfs("JFK")
        return itinerary[::-1]''',
          '''class Solution {
    findItinerary(tickets) {
        const adj = new Map();
        for (const [u, v] of tickets.sort((a, b) => b[1].localeCompare(a[1]))) {
            if (!adj.has(u)) adj.set(u, []);
            adj.get(u).push(v);
        }
        const itinerary = [];
        function dfs(u) {
            const list = adj.get(u) || [];
            while (list.length > 0) dfs(list.pop());
            itinerary.push(u);
        }
        dfs("JFK");
        return itinerary.reverse();
    }
}''',
          'Hierholzer Algorithm for Eulerian Path', 'Post-order DFS on multigraph', 'O(E log E)', 'O(V + E)',
          ['Graph', 'Eulerian Circuit', 'Depth-First Search'],
          [('[["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]', '["JFK","MUC","LHR","SFO","SJC"]', False),
           ('[["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]', '["JFK","ATL","JFK","SFO","ATL","SFO"]', False),
           ('[["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]]', '["JFK","NRT","JFK","KUL"]', True)]
    )

    # 11. Reachable Nodes in Subdivided Graph
    add_p('pack-500-part-b', 'Reachable Nodes in Subdivided Graph', 'reachable-nodes-in-subdivided-graph',
          'Given graph where edge [u, v, cnt] has cnt subdivision nodes inserted, return total reachable nodes from 0 within maxMoves.',
          'HARD', 1000, 128, 'n <= 3000, maxMoves <= 10^9', 'edges, maxMoves, n', 'Integer',
          '[[0,1,10],[0,2,1],[1,2,2]], 6, 3', '13', 200,
          ['Dijkstra to find shortest distance to original nodes, then count intermediate nodes.'],
          '''class Solution:
    def reachableNodes(self, edges: list, maxMoves: int, n: int) -> int:
        import heapq
        from collections import defaultdict
        adj = defaultdict(list)
        for u, v, cnt in edges:
            adj[u].append((v, cnt))
            adj[v].append((u, cnt))
        dist = {}
        heap = [(0, 0)]
        while heap:
            d, u = heapq.heappop(heap)
            if u in dist: continue
            dist[u] = d
            for v, cnt in adj[u]:
                if v not in dist and d + cnt + 1 <= maxMoves:
                    heapq.heappush(heap, (d + cnt + 1, v))
        ans = len(dist)
        for u, v, cnt in edges:
            moves_u = max(0, maxMoves - dist[u]) if u in dist else 0
            moves_v = max(0, maxMoves - dist[v]) if v in dist else 0
            ans += min(cnt, moves_u + moves_v)
        return ans''',
          '''class Solution {
    reachableNodes(edges, maxMoves, n) {
        const adj = new Map();
        for (const [u, v, cnt] of edges) {
            if (!adj.has(u)) adj.set(u, []);
            if (!adj.has(v)) adj.set(v, []);
            adj.get(u).push([v, cnt]); adj.get(v).push([u, cnt]);
        }
        const dist = new Map();
        const pq = [[0, 0]];
        while (pq.length > 0) {
            pq.sort((a, b) => a[0] - b[0]);
            const [d, u] = pq.shift();
            if (dist.has(u)) continue;
            dist.set(u, d);
            for (const [v, cnt] of (adj.get(u) || [])) {
                if (!dist.has(v) && d + cnt + 1 <= maxMoves) {
                    pq.push([d + cnt + 1, v]);
                }
            }
        }
        let ans = dist.size;
        for (const [u, v, cnt] of edges) {
            const movesU = dist.has(u) ? Math.max(0, maxMoves - dist.get(u)) : 0;
            const movesV = dist.has(v) ? Math.max(0, maxMoves - dist.get(v)) : 0;
            ans += Math.min(cnt, movesU + movesV);
        }
        return ans;
    }
}''',
          'Dijkstra on Subdivided Edge Graph', 'Shortest paths + interval overlap counting', 'O(E log V)', 'O(V + E)',
          ['Graph', 'Shortest Path', 'Heap'],
          [('[[0,1,10],[0,2,1],[1,2,2]], 6, 3', '13', False), ('[[0,1,4],[1,2,6],[0,2,8],[1,3,1]], 10, 4', '23', False), ('[[1,2,5]], 100, 3', '1', True)]
    )

    # 12. Minimum Number of Visited Cells in a Grid
    add_p('pack-500-part-b', 'Minimum Number of Visited Cells in a Grid', 'minimum-number-of-visited-cells-in-a-grid',
          'Given m x n grid where grid[i][j] is max forward jump in row/col, return min cells visited from (0,0) to (m-1,n-1), or -1.',
          'HARD', 1000, 128, 'm*n <= 10^5', 'grid', 'Integer',
          '[[3,4,2,1],[4,2,3,1],[2,1,0,0],[2,4,0,0]]', '4', 200,
          ['BFS with row/col unvisited index skips.'],
          '''class Solution:
    def minimumVisitedCells(self, grid: list) -> int:
        from collections import deque
        m, n = len(grid), len(grid[0])
        if m == 1 and n == 1: return 1
        dist = [[-1] * n for _ in range(m)]
        dist[0][0] = 1
        queue = deque([(0, 0)])
        row_next = [list(range(1, n + 1)) for _ in range(m)]
        col_next = [list(range(1, m + 1)) for _ in range(n)]
        def get_next(p, i):
            if i >= len(p) or p[i] == i: return i
            p[i] = get_next(p, p[i])
            return p[i]
        while queue:
            r, c = queue.popleft()
            d = dist[r][c]
            max_r = min(m - 1, r + grid[r][c])
            max_c = min(n - 1, c + grid[r][c])
            nc = get_next(row_next[r], c + 1)
            while nc <= max_c:
                if dist[r][nc] == -1:
                    dist[r][nc] = d + 1
                    if r == m - 1 and nc == n - 1: return d + 1
                    queue.append((r, nc))
                row_next[r][nc] = get_next(row_next[r], max_c + 1)
                nc = get_next(row_next[r], nc + 1)
            nr = get_next(col_next[c], r + 1)
            while nr <= max_r:
                if dist[nr][c] == -1:
                    dist[nr][c] = d + 1
                    if nr == m - 1 and c == n - 1: return d + 1
                    queue.append((nr, c))
                col_next[c][nr] = get_next(col_next[c], max_r + 1)
                nr = get_next(col_next[c], nr + 1)
        return dist[m - 1][n - 1]''',
          '''class Solution {
    minimumVisitedCells(grid) {
        const m = grid.length, n = grid[0].length;
        if (m === 1 && n === 1) return 1;
        const dist = Array.from({ length: m }, () => Array(n).fill(-1));
        dist[0][0] = 1;
        const queue = [[0, 0]];
        const rowNext = Array.from({ length: m }, () => Array.from({ length: n + 1 }, (_, i) => i));
        const colNext = Array.from({ length: n }, () => Array.from({ length: m + 1 }, (_, i) => i));
        function getNext(p, i) {
            if (i >= p.length || p[i] === i) return i;
            p[i] = getNext(p, p[i]);
            return p[i];
        }
        while (queue.length > 0) {
            const [r, c] = queue.shift();
            const d = dist[r][c];
            const maxR = Math.min(m - 1, r + grid[r][c]);
            const maxC = Math.min(n - 1, c + grid[r][c]);
            let nc = getNext(rowNext[r], c + 1);
            while (nc <= maxC) {
                if (dist[r][nc] === -1) {
                    dist[r][nc] = d + 1;
                    if (r === m - 1 && nc === n - 1) return d + 1;
                    queue.push([r, nc]);
                }
                rowNext[r][nc] = getNext(rowNext[r], maxC + 1);
                nc = getNext(rowNext[r], nc + 1);
            }
            let nr = getNext(colNext[c], r + 1);
            while (nr <= maxR) {
                if (dist[nr][c] === -1) {
                    dist[nr][c] = d + 1;
                    if (nr === m - 1 && c === n - 1) return d + 1;
                    queue.push([nr, c]);
                }
                colNext[c][nr] = getNext(colNext[c], maxR + 1);
                nr = getNext(colNext[c], nr + 1);
            }
        }
        return dist[m - 1][n - 1];
    }
}''',
          'Fast DSU-jump BFS on Grid intervals', 'Skipping visited segments in O(alpha(N)) amortized', 'O(M*N)', 'O(M*N)',
          ['Graph', 'Breadth-First Search', 'Union Find'],
          [('[[3,4,2,1],[4,2,3,1],[2,1,0,0],[2,4,0,0]]', '4', False), ('[[3,4,2,1],[4,2,1,1],[2,1,1,0],[2,4,1,0]]', '3', False), ('[[0]]', '1', True)]
    )

    # 13. Critical and Pseudo-Critical Edges in MST
    add_p('pack-500-part-b', 'Critical and Pseudo-Critical Edges in MST', 'critical-and-pseudo-critical-edges-in-mst',
          'Given n nodes and weighted edges, return two lists: indices of critical edges and pseudo-critical edges in MST.',
          'HARD', 1000, 128, 'n <= 100, edges <= 200', 'n, edges', 'List',
          '5, [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]', '[[0,1],[2,3,4,5]]', 200,
          ['Run Kruskal excluding edge for critical, and forcing edge for pseudo-critical.'],
          '''class Solution:
    def findCriticalAndPseudoCriticalEdges(self, n: int, edges: list) -> list:
        edges_with_id = sorted([[u, v, w, i] for i, (u, v, w) in enumerate(edges)], key=lambda x: x[2])
        def mst_weight(exclude=-1, force=-1):
            parent = list(range(n))
            def find(x):
                if parent[x] == x: return x
                parent[x] = find(parent[x])
                return parent[x]
            weight = 0
            count = 0
            if force != -1:
                u, v, w = edges[force]
                parent[u] = v
                weight += w
                count += 1
            for u, v, w, i in edges_with_id:
                if i == exclude or i == force: continue
                ru, rv = find(u), find(v)
                if ru != rv:
                    parent[ru] = rv
                    weight += w
                    count += 1
            return weight if count == n - 1 else float('inf')
        base_mst = mst_weight()
        critical, pseudo = [], []
        for i in range(len(edges)):
            if mst_weight(exclude=i) > base_mst:
                critical.append(i)
            elif mst_weight(force=i) == base_mst:
                pseudo.append(i)
        return [critical, pseudo]''',
          '''class Solution {
    findCriticalAndPseudoCriticalEdges(n, edges) {
        const sortedEdges = edges.map(([u, v, w], i) => [u, v, w, i]).sort((a, b) => a[2] - b[2]);
        function mstWeight(exclude = -1, force = -1) {
            const parent = Array.from({ length: n }, (_, i) => i);
            function find(x) {
                if (parent[x] === x) return x;
                parent[x] = find(parent[x]);
                return parent[x];
            }
            let weight = 0, count = 0;
            if (force !== -1) {
                const [u, v, w] = edges[force];
                parent[u] = v;
                weight += w;
                count++;
            }
            for (const [u, v, w, i] of sortedEdges) {
                if (i === exclude || i === force) continue;
                const ru = find(u), rv = find(v);
                if (ru !== rv) {
                    parent[ru] = rv;
                    weight += w;
                    count++;
                }
            }
            return count === n - 1 ? weight : Infinity;
        }
        const baseMst = mstWeight();
        const critical = [], pseudo = [];
        for (let i = 0; i < edges.length; i++) {
            if (mstWeight(i, -1) > baseMst) critical.push(i);
            else if (mstWeight(-1, i) === baseMst) pseudo.push(i);
        }
        return [critical, pseudo];
    }
}''',
          'Kruskal MST Edge Classification', 'Excluded vs Forced MST comparisons', 'O(E^2 log E)', 'O(V + E)',
          ['Graph', 'Minimum Spanning Tree', 'Union Find'],
          [('5, [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]', '[[0,1],[2,3,4,5]]', False),
           ('4, [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]', '[[],[0,1,2,3]]', False),
           ('2, [[0,1,1]]', '[[0],[]]', True)]
    )

    # 14. Second Minimum Time to Reach Destination
    add_p('pack-500-part-b', 'Second Minimum Time to Reach Destination', 'second-minimum-time-to-reach-destination',
          'Given undirected graph, edge time, and traffic signal change interval change, return the second strictly minimum time from 1 to n.',
          'HARD', 1000, 128, 'n <= 10^4, edges <= 2*10^4', 'n, edges, time, change', 'Integer',
          '5, [[1,2],[1,3],[1,4],[3,4],[4,5]], 3, 5', '13', 200,
          ['BFS tracking two shortest visit times for each vertex.'],
          '''class Solution:
    def secondMinimum(self, n: int, edges: list, time: int, change: int) -> int:
        from collections import deque
        adj = [[] for _ in range(n + 1)]
        for u, v in edges:
            adj[u].append(v); adj[v].append(u)
        dist1 = [-1] * (n + 1)
        dist2 = [-1] * (n + 1)
        queue = deque([(1, 0)])
        dist1[1] = 0
        while queue:
            u, d = queue.popleft()
            if u == n and dist2[n] != -1:
                return dist2[n]
            # Calculate wait time for red light
            cur_time = d
            if (cur_time // change) % 2 == 1:
                cur_time = (cur_time // change + 1) * change
            nxt_time = cur_time + time
            for v in adj[u]:
                if dist1[v] == -1:
                    dist1[v] = nxt_time
                    queue.append((v, nxt_time))
                elif dist2[v] == -1 and dist1[v] != nxt_time:
                    dist2[v] = nxt_time
                    queue.append((v, nxt_time))
        return dist2[n]''',
          '''class Solution {
    secondMinimum(n, edges, time, change) {
        const adj = Array.from({ length: n + 1 }, () => []);
        for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }
        const dist1 = Array(n + 1).fill(-1);
        const dist2 = Array(n + 1).fill(-1);
        const queue = [[1, 0]];
        dist1[1] = 0;
        while (queue.length > 0) {
            const [u, d] = queue.shift();
            if (u === n && dist2[n] !== -1) return dist2[n];
            let curTime = d;
            if (Math.floor(curTime / change) % 2 === 1) {
                curTime = (Math.floor(curTime / change) + 1) * change;
            }
            const nxtTime = curTime + time;
            for (const v of adj[u]) {
                if (dist1[v] === -1) {
                    dist1[v] = nxtTime;
                    queue.push([v, nxtTime]);
                } else if (dist2[v] === -1 && dist1[v] !== nxtTime) {
                    dist2[v] = nxtTime;
                    queue.push([v, nxtTime]);
                }
            }
        }
        return dist2[n];
    }
}''',
          'Two-Distance BFS with Traffic Signal Periods', 'Tracking first and strictly second shortest paths', 'O(V + E)', 'O(V + E)',
          ['Graph', 'Breadth-First Search', 'Shortest Path'],
          [('5, [[1,2],[1,3],[1,4],[3,4],[4,5]], 3, 5', '13', False), ('2, [[1,2]], 3, 2', '11', False), ('3, [[1,2],[2,3],[1,3]], 2, 3', '8', True)]
    )

    # 15. Frog Position After T Seconds
    add_p('pack-500-part-b', 'Frog Position After T Seconds', 'frog-position-after-t-seconds',
          'Given tree with n vertices rooted at 1, return probability that frog is at target after exactly t seconds.',
          'HARD', 1000, 128, 'n <= 100, t <= 50', 'n, edges, t, target', 'Float',
          '7, [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], 2, 4', '0.16666666666666666', 200,
          ['BFS/DFS tracking probability of current vertex state.'],
          '''class Solution:
    def frogPosition(self, n: int, edges: list, t: int, target: int) -> float:
        if n == 1: return 1.0
        from collections import deque
        adj = [[] for _ in range(n + 1)]
        for u, v in edges:
            adj[u].append(v); adj[v].append(u)
        visited = [False] * (n + 1)
        visited[1] = True
        queue = deque([(1, 1.0, 0)])
        while queue:
            u, prob, time_spent = queue.popleft()
            unvis_neighbors = [v for v in adj[u] if not visited[v]]
            if u == target:
                if time_spent == t or (time_spent < t and len(unvis_neighbors) == 0):
                    return prob
                return 0.0
            if time_spent < t and unvis_neighbors:
                p_branch = prob / len(unvis_neighbors)
                for v in unvis_neighbors:
                    visited[v] = True
                    queue.append((v, p_branch, time_spent + 1))
        return 0.0''',
          '''class Solution {
    frogPosition(n, edges, t, target) {
        if (n === 1) return 1.0;
        const adj = Array.from({ length: n + 1 }, () => []);
        for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }
        const visited = Array(n + 1).fill(false);
        visited[1] = true;
        const queue = [[1, 1.0, 0]];
        while (queue.length > 0) {
            const [u, prob, timeSpent] = queue.shift();
            const unvis = (adj[u] || []).filter(v => !visited[v]);
            if (u === target) {
                if (timeSpent === t || (timeSpent < t && unvis.length === 0)) return prob;
                return 0.0;
            }
            if (timeSpent < t && unvis.length > 0) {
                const pBranch = prob / unvis.length;
                for (const v of unvis) {
                    visited[v] = true;
                    queue.push([v, pBranch, timeSpent + 1]);
                }
            }
        }
        return 0.0;
    }
}''',
          'Probabilistic Tree BFS Traversal', 'Step-by-step state probability division', 'O(N)', 'O(N)',
          ['Graph', 'Tree', 'Breadth-First Search', 'Probability'],
          [('7, [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], 2, 4', '0.16666666666666666', False),
           ('7, [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], 1, 7', '0.3333333333333333', False),
           ('1, [], 1, 1', '1.0', True)]
    )

    # 16. Two-Satisfiability Boolean Formula Solver
    add_p('pack-500-part-b', 'Two-Satisfiability Boolean Formula 2-SAT', 'two-satisfiability-boolean-formula-2-sat',
          'Given n variables and 2-CNF clauses [[u, v], ...], return true if satisfiable (where negative integer means negation).',
          'HARD', 1000, 128, 'n <= 10^4, clauses <= 5*10^4', 'n, clauses', 'Boolean',
          '3, [[1,2],[-1,3],[-2,-3]]', 'true', 200,
          ['Build implication graph (A or B => not A -> B, not B -> A) and check if x and not x share an SCC.'],
          '''class Solution:
    def solve2SAT(self, n: int, clauses: list) -> bool:
        # Map var x (-n..n excluding 0) to 0..2n-1
        # positive x -> 2*(x-1), negative x -> 2*(-x-1) + 1
        def node_id(lit):
            if lit > 0: return 2 * (lit - 1)
            return 2 * (-lit - 1) + 1
        def neg_id(lit):
            return node_id(-lit)
        size = 2 * n
        adj = [[] for _ in range(size)]
        radj = [[] for _ in range(size)]
        for u, v in clauses:
            # (u or v) => ~u -> v, ~v -> u
            nu, nv = neg_id(u), neg_id(v)
            iu, iv = node_id(u), node_id(v)
            adj[nu].append(iv)
            radj[iv].append(nu)
            adj[nv].append(iu)
            radj[iu].append(nv)
        order = []
        vis = [False] * size
        def dfs1(u):
            vis[u] = True
            for v in adj[u]:
                if not vis[v]: dfs1(v)
            order.append(u)
        for i in range(size):
            if not vis[i]: dfs1(i)
        vis = [False] * size
        comp = [-1] * size
        c_id = 0
        def dfs2(u):
            comp[u] = c_id
            vis[u] = True
            for v in radj[u]:
                if not vis[v]: dfs2(v)
        for u in reversed(order):
            if not vis[u]:
                dfs2(u)
                c_id += 1
        for i in range(1, n + 1):
            if comp[node_id(i)] == comp[node_id(-i)]:
                return False
        return True''',
          '''class Solution {
    solve2SAT(n, clauses) {
        function nodeId(lit) { return lit > 0 ? 2 * (lit - 1) : 2 * (-lit - 1) + 1; }
        function negId(lit) { return nodeId(-lit); }
        const size = 2 * n;
        const adj = Array.from({ length: size }, () => []);
        const radj = Array.from({ length: size }, () => []);
        for (const [u, v] of clauses) {
            const nu = negId(u), nv = negId(v);
            const iu = nodeId(u), iv = nodeId(v);
            adj[nu].push(iv); radj[iv].push(nu);
            adj[nv].push(iu); radj[iu].push(nv);
        }
        const order = [];
        const vis = Array(size).fill(false);
        function dfs1(u) {
            vis[u] = true;
            for (const v of adj[u]) if (!vis[v]) dfs1(v);
            order.push(u);
        }
        for (let i = 0; i < size; i++) if (!vis[i]) dfs1(i);
        vis.fill(false);
        const comp = Array(size).fill(-1);
        let cId = 0;
        function dfs2(u) {
            comp[u] = cId;
            vis[u] = true;
            for (const v of radj[u]) if (!vis[v]) dfs2(v);
        }
        for (let i = order.length - 1; i >= 0; i--) {
            const u = order[i];
            if (!vis[u]) { dfs2(u); cId++; }
        }
        for (let i = 1; i <= n; i++) {
            if (comp[nodeId(i)] === comp[nodeId(-i)]) return false;
        }
        return true;
    }
}''',
          '2-SAT via Strongly Connected Components', 'Implication graph 2-coloring satisfiability', 'O(V + E)', 'O(V + E)',
          ['Graph', 'Strongly Connected Components', '2-SAT'],
          [('3, [[1,2],[-1,3],[-2,-3]]', 'true', False), ('1, [[1,1],[-1,-1]]', 'false', False), ('2, [[1,2],[-1,2],[1,-2],[-1,-2]]', 'false', True)]
    )

    # 17. Graph Bridge Connectivity 2-Edge-Connected Components
    add_p('pack-500-part-b', 'Count 2-Edge-Connected Components', 'count-2-edge-connected-components',
          'Given n vertices and undirected edges, return count of 2-edge-connected components (connected after removing all bridges).',
          'HARD', 1000, 128, 'n <= 10^4, edges <= 5*10^4', 'n, edges', 'Integer',
          '5, [[0,1],[1,2],[2,0],[1,3],[3,4]]', '3', 200,
          ['Tarjan bridge detection, then run DSU/BFS on non-bridge edges.'],
          '''class Solution:
    def count2EdgeConnected(self, n: int, edges: list) -> int:
        adj = [[] for _ in range(n)]
        for i, (u, v) in enumerate(edges):
            adj[u].append((v, i)); adj[v].append((u, i))
        tin = [-1] * n
        low = [-1] * n
        timer = 0
        bridges = set()
        def dfs(u, p_edge):
            nonlocal timer
            tin[u] = low[u] = timer
            timer += 1
            for v, e_idx in adj[u]:
                if e_idx == p_edge: continue
                if tin[v] != -1:
                    low[u] = min(low[u], tin[v])
                else:
                    dfs(v, e_idx)
                    low[u] = min(low[u], low[v])
                    if low[v] > tin[u]:
                        bridges.add(e_idx)
        for i in range(n):
            if tin[i] == -1: dfs(i, -1)
        # DSU on non-bridge edges
        parent = list(range(n))
        def find(x):
            if parent[x] == x: return x
            parent[x] = find(parent[x])
            return parent[x]
        comp_count = n
        for i, (u, v) in enumerate(edges):
            if i not in bridges:
                ru, rv = find(u), find(v)
                if ru != rv:
                    parent[ru] = rv
                    comp_count -= 1
        return comp_count''',
          '''class Solution {
    count2EdgeConnected(n, edges) {
        const adj = Array.from({ length: n }, () => []);
        for (let i = 0; i < edges.length; i++) {
            const [u, v] = edges[i];
            adj[u].push([v, i]); adj[v].push([u, i]);
        }
        const tin = Array(n).fill(-1), low = Array(n).fill(-1);
        let timer = 0;
        const bridges = new Set();
        function dfs(u, pEdge) {
            tin[u] = low[u] = timer++;
            for (const [v, eIdx] of adj[u]) {
                if (eIdx === pEdge) continue;
                if (tin[v] !== -1) {
                    low[u] = Math.min(low[u], tin[v]);
                } else {
                    dfs(v, eIdx);
                    low[u] = Math.min(low[u], low[v]);
                    if (low[v] > tin[u]) bridges.add(eIdx);
                }
            }
        }
        for (let i = 0; i < n; i++) if (tin[i] === -1) dfs(i, -1);
        const parent = Array.from({ length: n }, (_, i) => i);
        function find(x) {
            if (parent[x] === x) return x;
            parent[x] = find(parent[x]);
            return parent[x];
        }
        let compCount = n;
        for (let i = 0; i < edges.length; i++) {
            if (!bridges.has(i)) {
                const [u, v] = edges[i];
                const ru = find(u), rv = find(v);
                if (ru !== rv) { parent[ru] = rv; compCount--; }
            }
        }
        return compCount;
    }
}''',
          'Tarjan Bridges + DSU Component Condensation', '2-edge-connected components grouping', 'O(V + E)', 'O(V + E)',
          ['Graph', 'Depth-First Search', 'Bridges', 'Union Find'],
          [('5, [[0,1],[1,2],[2,0],[1,3],[3,4]]', '3', False), ('3, [[0,1],[1,2],[2,0]]', '1', False), ('4, [[0,1],[2,3]]', '4', True)]
    )

    # 18. Konig Bipartite Minimum Vertex Cover
    add_p('pack-500-part-b', 'Konig Bipartite Minimum Vertex Cover Size', 'konig-bipartite-minimum-vertex-cover-size',
          'Given bipartite graph with L left nodes (0..L-1), R right nodes (0..R-1), and edges, return minimum vertex cover size.',
          'MEDIUM', 1000, 128, 'L, R <= 500, edges <= 2000', 'L, R, edges', 'Integer',
          '3, 3, [[0,0],[0,1],[1,1],[1,2],[2,2]]', '3', 150,
          ['By König\'s theorem, minimum vertex cover size equals maximum bipartite matching size.'],
          '''class Solution:
    def minVertexCover(self, L: int, R: int, edges: list) -> int:
        adj = [[] for _ in range(L)]
        for u, v in edges:
            adj[u].append(v)
        match = [-1] * R
        def dfs(u, visited):
            for v in adj[u]:
                if not visited[v]:
                    visited[v] = True
                    if match[v] == -1 or dfs(match[v], visited):
                        match[v] = u
                        return True
            return False
        max_matching = 0
        for u in range(L):
            visited = [False] * R
            if dfs(u, visited):
                max_matching += 1
        return max_matching''',
          '''class Solution {
    minVertexCover(L, R, edges) {
        const adj = Array.from({ length: L }, () => []);
        for (const [u, v] of edges) adj[u].push(v);
        const match = Array(R).fill(-1);
        function dfs(u, visited) {
            for (const v of adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    if (match[v] === -1 || dfs(match[v], visited)) {
                        match[v] = u;
                        return true;
                    }
                }
            }
            return false;
        }
        let maxMatching = 0;
        for (let u = 0; u < L; u++) {
            const visited = Array(R).fill(false);
            if (dfs(u, visited)) maxMatching++;
        }
        return maxMatching;
    }
}''',
          'Konig Theorem Maximum Matching', 'Bipartite vertex cover duality', 'O(V * E)', 'O(V + E)',
          ['Graph', 'Bipartite Matching', 'Konig Theorem'],
          [('3, 3, [[0,0],[0,1],[1,1],[1,2],[2,2]]', '3', False), ('2, 2, [[0,0],[0,1],[1,0],[1,1]]', '2', False), ('1, 1, []', '0', True)]
    )

    # 19. Disjoint Set Minimum Spanning Forest
    add_p('pack-500-part-b', 'Disjoint Set Minimum Spanning Forest Cost', 'disjoint-set-minimum-spanning-forest-cost',
          'Given n vertices and weighted edges, return total weight of minimum spanning forest.',
          'MEDIUM', 1000, 128, 'n <= 10^4, edges <= 5*10^4', 'n, edges', 'Integer',
          '5, [[0,1,1],[1,2,2],[3,4,4]]', '7', 150,
          ['Kruskal algorithm on disconnected components.'],
          '''class Solution:
    def minSpanningForest(self, n: int, edges: list) -> int:
        edges.sort(key=lambda x: x[2])
        parent = list(range(n))
        def find(x):
            if parent[x] == x: return x
            parent[x] = find(parent[x])
            return parent[x]
        total_weight = 0
        for u, v, w in edges:
            ru, rv = find(u), find(v)
            if ru != rv:
                parent[ru] = rv
                total_weight += w
        return total_weight''',
          '''class Solution {
    minSpanningForest(n, edges) {
        edges.sort((a, b) => a[2] - b[2]);
        const parent = Array.from({ length: n }, (_, i) => i);
        function find(x) {
            if (parent[x] === x) return x;
            parent[x] = find(parent[x]);
            return parent[x];
        }
        let totalWeight = 0;
        for (const [u, v, w] of edges) {
            const ru = find(u), rv = find(v);
            if (ru !== rv) {
                parent[ru] = rv;
                totalWeight += w;
            }
        }
        return totalWeight;
    }
}''',
          'Kruskal Minimum Spanning Forest', 'Greedy DSU edge collection', 'O(E log E)', 'O(V)',
          ['Graph', 'Minimum Spanning Tree', 'Union Find'],
          [('5, [[0,1,1],[1,2,2],[3,4,4]]', '7', False), ('4, [[0,1,10],[1,2,5],[2,0,7],[2,3,1]]', '7', False), ('3, []', '0', True)]
    )

print("Registered Pack A & Pack B.")

