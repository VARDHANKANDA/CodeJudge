import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack250Part2ProblemDefs: ProblemDef[] = [
  // 6. Target Sum
  {
    title: 'Target Sum',
    slug: 'target-sum',
    description: `You are given an integer array \`nums\` and an integer \`target\`.

You want to build an expression out of nums by adding one of the symbols \`'+'\` and \`'-'\` before each integer in nums and then concatenate all the integers.

Return the number of different expressions that you can build, which evaluates to \`target\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 20\n0 <= nums[i] <= 1000\n0 <= sum(nums[i]) <= 1000\n-1000 <= target <= 1000`,
    inputFormat: `Line 1: Target integer \`target\`.\nLine 2: Space-separated integers of \`nums\`.`,
    outputFormat: `Number of valid expressions.`,
    sampleInput: `3\n1 1 1 1 1`,
    sampleOutput: `5`,
    points: 150,
    hints: [
      'Let P be positive subset and N be negative subset. sum(P) - sum(N) = target and sum(P) + sum(N) = sum(nums).',
      '2 * sum(P) = target + sum(nums) => sum(P) = (target + sum(nums)) / 2.',
      'Reduce to standard subset sum counting problem.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    target = int(lines[0].strip())
    nums = list(map(int, lines[1].strip().split()))
    total = sum(nums)

    if (total + target) % 2 != 0 or abs(target) > total:
        print(0)
        return

    subset_sum = (total + target) // 2
    dp = [0] * (subset_sum + 1)
    dp[0] = 1

    for num in nums:
        for j in range(subset_sum, num - 1, -1):
            dp[j] += dp[j - num]

    print(dp[subset_sum])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const target = parseInt(lines[0].trim(), 10);
    const nums = lines[1].trim().split(/\\s+/).map(Number);
    const total = nums.reduce((a, b) => a + b, 0);

    if ((total + target) % 2 !== 0 || Math.abs(target) > total) {
        console.log(0);
        return;
    }

    const subsetSum = (total + target) / 2;
    const dp = new Array(subsetSum + 1).fill(0);
    dp[0] = 1;

    for (const num of nums) {
        for (let j = subsetSum; j >= num; j--) {
            dp[j] += dp[j - num];
        }
    }

    console.log(dp[subsetSum]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    target = int(lines[0].strip())
    nums = list(map(int, lines[1].strip().split()))
    total = sum(nums)

    if (total + target) % 2 != 0 or abs(target) > total:
        print(0)
        return

    subset_sum = (total + target) // 2
    dp = [0] * (subset_sum + 1)
    dp[0] = 1

    for num in nums:
        for j in range(subset_sum, num - 1, -1):
            dp[j] += dp[j - num]

    print(dp[subset_sum])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const target = parseInt(lines[0].trim(), 10);
    const nums = lines[1].trim().split(/\\s+/).map(Number);
    const total = nums.reduce((a, b) => a + b, 0);

    if ((total + target) % 2 !== 0 || Math.abs(target) > total) {
        console.log(0);
        return;
    }

    const subsetSum = (total + target) / 2;
    const dp = new Array(subsetSum + 1).fill(0);
    dp[0] = 1;

    for (const num of nums) {
        for (let j = subsetSum; j >= num; j--) {
            dp[j] += dp[j - num];
        }
    }

    console.log(dp[subsetSum]);
}

solve();
`,
    },
    editorial: {
      approach: '0/1 Knapsack Subset Sum Reduction',
      algorithm: 'Transform equation to finding subsets summing to (sum + target) / 2.',
      timeComplexity: 'O(n * subset_sum)',
      spaceComplexity: 'O(subset_sum)',
      content: 'Classic dynamic programming knapsack algebraic reduction.',
      referenceCode: `def find_target_sum_ways(nums, target):
    # subset sum dp
    pass`,
    },
    tags: ['Array', 'Dynamic Programming', 'Backtracking'],
    testCases: [
      { input: '3\n1 1 1 1 1', expectedOutput: '5', isHidden: false },
      { input: '1\n1', expectedOutput: '1', isHidden: false },
      { input: '0\n0 0 0 0 0 0 0 0 1', expectedOutput: '0', isHidden: true },
    ],
  },

  // 7. Coin Change II
  {
    title: 'Coin Change II',
    slug: 'coin-change-ii',
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`0\`.

You may assume that you have an infinite number of each kind of coin.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= coins.length <= 300\n1 <= coins[i] <= 5000\nAll values of coins are unique.\n0 <= amount <= 5000`,
    inputFormat: `Line 1: Target amount \`amount\`.\nLine 2: Space-separated integers of \`coins\`.`,
    outputFormat: `Number of combinations.`,
    sampleInput: `5\n1 2 5`,
    sampleOutput: `4`,
    points: 150,
    hints: [
      'Unbounded knapsack combination counting.',
      'Iterate through coins on the outer loop and amounts on the inner loop: dp[x] += dp[x - coin].',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    amount = int(lines[0].strip())
    coins = list(map(int, lines[1].strip().split()))

    dp = [0] * (amount + 1)
    dp[0] = 1

    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] += dp[x - coin]

    print(dp[amount])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const amount = parseInt(lines[0].trim(), 10);
    const coins = lines[1].trim().split(/\\s+/).map(Number);

    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;

    for (const coin of coins) {
        for (let x = coin; x <= amount; x++) {
            dp[x] += dp[x - coin];
        }
    }

    console.log(dp[amount]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    amount = int(lines[0].strip())
    coins = list(map(int, lines[1].strip().split()))

    dp = [0] * (amount + 1)
    dp[0] = 1

    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] += dp[x - coin]

    print(dp[amount])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const amount = parseInt(lines[0].trim(), 10);
    const coins = lines[1].trim().split(/\\s+/).map(Number);

    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;

    for (const coin of coins) {
        for (let x = coin; x <= amount; x++) {
            dp[x] += dp[x - coin];
        }
    }

    console.log(dp[amount]);
}

solve();
`,
    },
    editorial: {
      approach: 'Unbounded Knapsack Combination Dynamic Programming',
      algorithm: 'Outer coin iteration avoids counting permutation duplicates.',
      timeComplexity: 'O(amount * coins.length)',
      spaceComplexity: 'O(amount)',
      content: 'Standard combination coin counting.',
      referenceCode: `def change(amount, coins):
    # unbounded DP
    pass`,
    },
    tags: ['Array', 'Dynamic Programming'],
    testCases: [
      { input: '5\n1 2 5', expectedOutput: '4', isHidden: false },
      { input: '3\n2', expectedOutput: '0', isHidden: false },
      { input: '10\n10', expectedOutput: '1', isHidden: false },
      { input: '0\n1 2 5', expectedOutput: '1', isHidden: true },
    ],
  },

  // 8. Longest Palindromic Subsequence
  {
    title: 'Longest Palindromic Subsequence',
    slug: 'longest-palindromic-subsequence',
    description: `Given a string \`s\`, find the longest palindromic subsequence's length in \`s\`.

A **subsequence** is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= s.length <= 1000\ns consists only of lowercase English letters.`,
    inputFormat: `Line 1: String \`s\`.`,
    outputFormat: `Length of longest palindromic subsequence.`,
    sampleInput: `bbbab`,
    sampleOutput: `4`,
    points: 150,
    hints: [
      'This is equivalent to finding the Longest Common Subsequence (LCS) between s and reverse(s).',
      'Or use 2D DP: if s[i] == s[j], dp[i][j] = 2 + dp[i+1][j-1], else max(dp[i+1][j], dp[i][j-1]).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    s = sys.stdin.read().strip()
    if not s: return
    n = len(s)
    dp = [[0] * n for _ in range(n)]

    for i in range(n - 1, -1, -1):
        dp[i][i] = 1
        for j in range(i + 1, n):
            if s[i] == s[j]:
                dp[i][j] = 2 + dp[i + 1][j - 1]
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])

    print(dp[0][n - 1])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s) return;
    const n = s.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = n - 1; i >= 0; i--) {
        dp[i][i] = 1;
        for (let j = i + 1; j < n; j++) {
            if (s[i] === s[j]) {
                dp[i][j] = 2 + dp[i + 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }

    console.log(dp[0][n - 1]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    s = sys.stdin.read().strip()
    if not s: return
    n = len(s)
    dp = [[0] * n for _ in range(n)]

    for i in range(n - 1, -1, -1):
        dp[i][i] = 1
        for j in range(i + 1, n):
            if s[i] == s[j]:
                dp[i][j] = 2 + dp[i + 1][j - 1]
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])

    print(dp[0][n - 1])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s) return;
    const n = s.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = n - 1; i >= 0; i--) {
        dp[i][i] = 1;
        for (let j = i + 1; j < n; j++) {
            if (s[i] === s[j]) {
                dp[i][j] = 2 + dp[i + 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }

    console.log(dp[0][n - 1]);
}

solve();
`,
    },
    editorial: {
      approach: 'Interval Dynamic Programming / LCS on Reversal',
      algorithm: 'Fill 2D table by substring lengths comparing matching outer characters.',
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(n^2)',
      content: 'Classic interval dynamic programming.',
      referenceCode: `def longest_palindrome_subseq(s):
    # interval DP
    pass`,
    },
    tags: ['String', 'Dynamic Programming'],
    testCases: [
      { input: 'bbbab', expectedOutput: '4', isHidden: false },
      { input: 'cbbd', expectedOutput: '2', isHidden: false },
      { input: 'a', expectedOutput: '1', isHidden: false },
      { input: 'character', expectedOutput: '5', isHidden: true },
    ],
  },

  // 9. Minimum Spanning Tree (Kruskal)
  {
    title: 'Minimum Spanning Tree',
    slug: 'minimum-spanning-tree',
    description: `Given a weighted, undirected, and connected graph of \`v\` vertices and \`e\` edges, find the sum of weights of the edges in a **Minimum Spanning Tree (MST)**.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `2 <= v <= 10^4\n1 <= e <= 10^5\n0 <= ui, vi < v\nui != vi\n1 <= wi <= 10^4`,
    inputFormat: `Line 1: Two integers \`v e\`.\nNext \`e\` lines: Three integers \`u v w\` representing undirected edge between \`u\` and \`v\` with weight \`w\`.`,
    outputFormat: `Total weight of the Minimum Spanning Tree.`,
    sampleInput: `3 3\n0 1 5\n1 2 3\n0 2 1`,
    sampleOutput: `4`,
    points: 150,
    hints: [
      'Sort all edges in non-decreasing order of weights.',
      'Use Disjoint Set Union (Kruskal algorithm) to greedily add edges that do not form a cycle.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    v = int(tokens[0])
    e = int(tokens[1])
    edges = []
    idx = 2
    for _ in range(e):
        u = int(tokens[idx])
        v_node = int(tokens[idx+1])
        w = int(tokens[idx+2])
        edges.append((w, u, v_node))
        idx += 3

    edges.sort()
    parent = list(range(v))

    def find(i):
        if parent[i] == i: return i
        parent[i] = find(parent[i])
        return parent[i]

    mst_weight = 0
    edges_count = 0
    for w, u, node_v in edges:
        ru, rv = find(u), find(node_v)
        if ru != rv:
            parent[ru] = rv
            mst_weight += w
            edges_count += 1
            if edges_count == v - 1:
                break

    print(mst_weight)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const v = parseInt(tokens[0], 10);
    const e = parseInt(tokens[1], 10);
    const edges = [];
    let idx = 2;
    for (let i = 0; i < e; i++) {
        const u = parseInt(tokens[idx++], 10);
        const nodeV = parseInt(tokens[idx++], 10);
        const w = parseInt(tokens[idx++], 10);
        edges.push([w, u, nodeV]);
    }

    edges.sort((a, b) => a[0] - b[0]);
    const parent = Array.from({ length: v }, (_, i) => i);

    function find(i) {
        if (parent[i] === i) return i;
        return parent[i] = find(parent[i]);
    }

    let mstWeight = 0;
    let edgesCount = 0;
    for (const [w, u, nodeV] of edges) {
        const ru = find(u), rv = find(nodeV);
        if (ru !== rv) {
            parent[ru] = rv;
            mstWeight += w;
            edgesCount++;
            if (edgesCount === v - 1) break;
        }
    }

    console.log(mstWeight);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    v = int(tokens[0])
    e = int(tokens[1])
    edges = []
    idx = 2
    for _ in range(e):
        u = int(tokens[idx])
        v_node = int(tokens[idx+1])
        w = int(tokens[idx+2])
        edges.append((w, u, v_node))
        idx += 3

    edges.sort()
    parent = list(range(v))

    def find(i):
        if parent[i] == i: return i
        parent[i] = find(parent[i])
        return parent[i]

    mst_weight = 0
    edges_count = 0
    for w, u, node_v in edges:
        ru, rv = find(u), find(node_v)
        if ru != rv:
            parent[ru] = rv
            mst_weight += w
            edges_count += 1
            if edges_count == v - 1:
                break

    print(mst_weight)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const v = parseInt(tokens[0], 10);
    const e = parseInt(tokens[1], 10);
    const edges = [];
    let idx = 2;
    for (let i = 0; i < e; i++) {
        const u = parseInt(tokens[idx++], 10);
        const nodeV = parseInt(tokens[idx++], 10);
        const w = parseInt(tokens[idx++], 10);
        edges.push([w, u, nodeV]);
    }

    edges.sort((a, b) => a[0] - b[0]);
    const parent = Array.from({ length: v }, (_, i) => i);

    function find(i) {
        if (parent[i] === i) return i;
        return parent[i] = find(parent[i]);
    }

    let mstWeight = 0;
    let edgesCount = 0;
    for (const [w, u, nodeV] of edges) {
        const ru = find(u), rv = find(nodeV);
        if (ru !== rv) {
            parent[ru] = rv;
            mstWeight += w;
            edgesCount++;
            if (edgesCount === v - 1) break;
        }
    }

    console.log(mstWeight);
}

solve();
`,
    },
    editorial: {
      approach: 'Kruskal Algorithm with DSU',
      algorithm: 'Sort edges by weight ascending and greedily connect disjoint components.',
      timeComplexity: 'O(E log E)',
      spaceComplexity: 'O(V)',
      content: 'Standard Kruskal Minimum Spanning Tree algorithm.',
      referenceCode: `def spanning_tree(v, edges):
    # Kruskal DSU
    pass`,
    },
    tags: ['Graph', 'Union Find', 'Minimum Spanning Tree', 'Greedy'],
    testCases: [
      { input: '3 3\n0 1 5\n1 2 3\n0 2 1', expectedOutput: '4', isHidden: false },
      { input: '2 1\n0 1 5', expectedOutput: '5', isHidden: false },
      { input: '4 5\n0 1 10\n0 2 6\n0 3 5\n1 3 15\n2 3 4', expectedOutput: '19', isHidden: true },
    ],
  },

  // 10. Is Graph Bipartite?
  {
    title: 'Is Graph Bipartite?',
    slug: 'is-graph-bipartite',
    description: `There is an **undirected** graph with \`n\` nodes, where each node is numbered between \`0\` and \`n - 1\`.

A graph is **bipartite** if the nodes can be partitioned into two independent sets \`A\` and \`B\` such that every edge in the graph connects a node in set \`A\` and a node in set \`B\`.

Return \`true\` if and only if it is bipartite.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= n <= 100\n0 <= m <= 1000\n0 <= u, v < n`,
    inputFormat: `Line 1: Two integers \`n m\`.\nNext \`m\` lines: Two integers \`u v\` representing an edge.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `4 4\n0 1\n0 2\n0 3\n1 2`,
    sampleOutput: `false`,
    points: 150,
    hints: [
      'Use 2-coloring via BFS or DFS.',
      'If an adjacent node has the same color as the current node, the graph is not bipartite.',
    ],
    codeTemplates: {
      python: `import sys
from collections import deque

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    m = int(tokens[1])
    adj = [[] for _ in range(n)]
    idx = 2
    for _ in range(m):
        u = int(tokens[idx])
        v = int(tokens[idx+1])
        adj[u].append(v)
        adj[v].append(u)
        idx += 2

    color = [-1] * n
    for i in range(n):
        if color[i] != -1: continue
        q = deque([i])
        color[i] = 0
        while q:
            u = q.popleft()
            for v in adj[u]:
                if color[v] == -1:
                    color[v] = 1 - color[u]
                    q.append(v)
                elif color[v] == color[u]:
                    print("false")
                    return

    print("true")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const n = parseInt(tokens[0], 10);
    const m = parseInt(tokens[1], 10);
    const adj = Array.from({ length: n }, () => []);
    let idx = 2;
    for (let i = 0; i < m; i++) {
        const u = parseInt(tokens[idx++], 10);
        const v = parseInt(tokens[idx++], 10);
        adj[u].push(v);
        adj[v].push(u);
    }

    const color = new Array(n).fill(-1);
    for (let i = 0; i < n; i++) {
        if (color[i] !== -1) continue;
        const q = [i];
        color[i] = 0;
        while (q.length > 0) {
            const u = q.shift();
            for (const v of adj[u]) {
                if (color[v] === -1) {
                    color[v] = 1 - color[u];
                    q.push(v);
                } else if (color[v] === color[u]) {
                    console.log("false");
                    return;
                }
            }
        }
    }
    console.log("true");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
from collections import deque

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    m = int(tokens[1])
    adj = [[] for _ in range(n)]
    idx = 2
    for _ in range(m):
        u = int(tokens[idx])
        v = int(tokens[idx+1])
        adj[u].append(v)
        adj[v].append(u)
        idx += 2

    color = [-1] * n
    for i in range(n):
        if color[i] != -1: continue
        q = deque([i])
        color[i] = 0
        while q:
            u = q.popleft()
            for v in adj[u]:
                if color[v] == -1:
                    color[v] = 1 - color[u]
                    q.append(v)
                elif color[v] == color[u]:
                    print("false")
                    return

    print("true")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const n = parseInt(tokens[0], 10);
    const m = parseInt(tokens[1], 10);
    const adj = Array.from({ length: n }, () => []);
    let idx = 2;
    for (let i = 0; i < m; i++) {
        const u = parseInt(tokens[idx++], 10);
        const v = parseInt(tokens[idx++], 10);
        adj[u].push(v);
        adj[v].push(u);
    }

    const color = new Array(n).fill(-1);
    for (let i = 0; i < n; i++) {
        if (color[i] !== -1) continue;
        const q = [i];
        color[i] = 0;
        while (q.length > 0) {
            const u = q.shift();
            for (const v of adj[u]) {
                if (color[v] === -1) {
                    color[v] = 1 - color[u];
                    q.push(v);
                } else if (color[v] === color[u]) {
                    console.log("false");
                    return;
                }
            }
        }
    }
    console.log("true");
}

solve();
`,
    },
    editorial: {
      approach: 'BFS 2-Coloring Bipartiteness Test',
      algorithm: 'Assign alternating colors (0 and 1) to neighboring vertices. If any edge connects monochromatic endpoints, graph is not bipartite.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      content: 'Standard bipartite graph detection.',
      referenceCode: `def is_bipartite(graph):
    # 2-color BFS
    pass`,
    },
    tags: ['Depth-First Search', 'Breadth-First Search', 'Union Find', 'Graph'],
    testCases: [
      { input: '4 4\n0 1\n0 2\n0 3\n1 2', expectedOutput: 'false', isHidden: false },
      { input: '4 4\n0 1\n0 3\n1 2\n2 3', expectedOutput: 'true', isHidden: false },
      { input: '1 0', expectedOutput: 'true', isHidden: false },
      { input: '3 3\n0 1\n1 2\n2 0', expectedOutput: 'false', isHidden: true },
    ],
  },
];
