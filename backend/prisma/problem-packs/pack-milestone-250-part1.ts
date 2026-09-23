import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack250Part1ProblemDefs: ProblemDef[] = [
  // 1. LRU Cache
  {
    title: 'LRU Cache',
    slug: 'lru-cache',
    description: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) Cache**.

Implement the \`LRUCache\` class:
- \`LRUCache(int capacity)\`: Initialize the LRU cache with positive size \`capacity\`.
- \`int get(int key)\`: Return the value of the \`key\` if the key exists, otherwise return \`-1\`.
- \`void put(int key, int value)\`: Update the value of the \`key\` if the \`key\` exists. Otherwise, add the \`key-value\` pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, **evict** the least recently used key.

The functions \`get\` and \`put\` must each run in \`O(1)\` average time complexity.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= capacity <= 3000\n0 <= key <= 10^4\n0 <= value <= 10^5\nAt most 2 * 10^5 calls will be made to get and put.`,
    inputFormat: `Line 1: An integer \`capacity\`.\nLine 2: An integer \`q\` (number of operations).\nNext \`q\` lines: \`get <key>\` or \`put <key> <value>\`.`,
    outputFormat: `For each \`get\` operation, output the integer value on a new line.`,
    sampleInput: `2\n6\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nput 4 4`,
    sampleOutput: `1\n-1`,
    points: 150,
    hints: [
      'Use a doubly linked list combined with a hash table to achieve O(1) removals, insertions, and lookups.',
      'Maintain head and tail dummy nodes to avoid edge-case checks.',
    ],
    codeTemplates: {
      python: `import sys
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    capacity = int(lines[0].strip())
    q = int(lines[1].strip())
    lru = LRUCache(capacity)
    for i in range(2, 2 + q):
        if i >= len(lines): break
        parts = lines[i].strip().split()
        if not parts: continue
        if parts[0] == 'get':
            print(lru.get(int(parts[1])))
        elif parts[0] == 'put':
            lru.put(int(parts[1]), int(parts[2]))

solve()
`,
      javascript: `const fs = require('fs');

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
    }
    get(key) {
        if (!this.map.has(key)) return -1;
        const val = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, val);
        return val;
    }
    put(key, value) {
        if (this.map.has(key)) this.map.delete(key);
        this.map.set(key, value);
        if (this.map.size > this.capacity) {
            const oldest = this.map.keys().next().value;
            this.map.delete(oldest);
        }
    }
}

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const capacity = parseInt(lines[0].trim(), 10);
    const q = parseInt(lines[1].trim(), 10);
    const lru = new LRUCache(capacity);
    for (let i = 2; i < 2 + q; i++) {
        if (i >= lines.length) break;
        const parts = lines[i].trim().split(/\\s+/);
        if (parts.length === 0 || !parts[0]) continue;
        if (parts[0] === 'get') {
            console.log(lru.get(parseInt(parts[1], 10)));
        } else if (parts[0] === 'put') {
            lru.put(parseInt(parts[1], 10), parseInt(parts[2], 10));
        }
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2: return
    capacity = int(lines[0].strip())
    q = int(lines[1].strip())
    lru = LRUCache(capacity)
    for i in range(2, 2 + q):
        if i >= len(lines): break
        parts = lines[i].strip().split()
        if not parts: continue
        if parts[0] == 'get':
            print(lru.get(int(parts[1])))
        elif parts[0] == 'put':
            lru.put(int(parts[1]), int(parts[2]))

solve()
`,
      javascript: `const fs = require('fs');

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
    }
    get(key) {
        if (!this.map.has(key)) return -1;
        const val = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, val);
        return val;
    }
    put(key, value) {
        if (this.map.has(key)) this.map.delete(key);
        this.map.set(key, value);
        if (this.map.size > this.capacity) {
            const oldest = this.map.keys().next().value;
            this.map.delete(oldest);
        }
    }
}

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const capacity = parseInt(lines[0].trim(), 10);
    const q = parseInt(lines[1].trim(), 10);
    const lru = new LRUCache(capacity);
    for (let i = 2; i < 2 + q; i++) {
        if (i >= lines.length) break;
        const parts = lines[i].trim().split(/\\s+/);
        if (parts.length === 0 || !parts[0]) continue;
        if (parts[0] === 'get') {
            console.log(lru.get(parseInt(parts[1], 10)));
        } else if (parts[0] === 'put') {
            lru.put(parseInt(parts[1], 10), parseInt(parts[2], 10));
        }
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Hash Map + Doubly Linked List',
      algorithm: 'Doubly linked list maintains insertion/access order. Hash map maps key to list node for O(1) access.',
      timeComplexity: 'O(1) per get and put',
      spaceComplexity: 'O(capacity)',
      content: 'Classic LRU Cache design structure.',
      referenceCode: `class LRUCache:
    # Hash map + Doubly Linked List
    pass`,
    },
    tags: ['Hash Table', 'Linked List', 'Design', 'Doubly-Linked List'],
    testCases: [
      { input: '2\n6\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nput 4 4', expectedOutput: '1\n-1', isHidden: false },
      { input: '1\n4\nput 1 10\nget 1\nput 2 20\nget 1', expectedOutput: '10\n-1', isHidden: false },
      { input: '2\n5\nput 2 1\nput 1 1\nput 2 3\nput 4 1\nget 1', expectedOutput: '-1', isHidden: true },
    ],
  },

  // 2. Edit Distance
  {
    title: 'Edit Distance',
    slug: 'edit-distance',
    description: `Given two strings \`word1\` and \`word2\`, return the minimum number of operations required to convert \`word1\` to \`word2\`.

You have the following three operations permitted on a word:
- Insert a character
- Delete a character
- Replace a character`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `0 <= word1.length, word2.length <= 500\nword1 and word2 consist of lowercase English letters.`,
    inputFormat: `Line 1: String \`word1\`.\nLine 2: String \`word2\`.`,
    outputFormat: `Minimum edit distance integer.`,
    sampleInput: `horse\nros`,
    sampleOutput: `3`,
    points: 300,
    hints: [
      'Let dp[i][j] be the edit distance between word1[0..i] and word2[0..j].',
      'If word1[i] == word2[j], dp[i][j] = dp[i-1][j-1].',
      'Else dp[i][j] = 1 + min(dp[i-1][j] (delete), dp[i][j-1] (insert), dp[i-1][j-1] (replace)).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().split('\\n')
    w1 = lines[0].strip() if len(lines) > 0 else ""
    w2 = lines[1].strip() if len(lines) > 1 else ""

    m, n = len(w1), len(w2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1): dp[i][0] = i
    for j in range(n + 1): dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if w1[i - 1] == w2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])

    print(dp[m][n])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').split('\\n');
    const w1 = lines[0] ? lines[0].trim() : "";
    const w2 = lines[1] ? lines[1].trim() : "";
    const m = w1.length, n = w2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (w1[i - 1] === w2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
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
    lines = sys.stdin.read().split('\\n')
    w1 = lines[0].strip() if len(lines) > 0 else ""
    w2 = lines[1].strip() if len(lines) > 1 else ""

    m, n = len(w1), len(w2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1): dp[i][0] = i
    for j in range(n + 1): dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if w1[i - 1] == w2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])

    print(dp[m][n])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').split('\\n');
    const w1 = lines[0] ? lines[0].trim() : "";
    const w2 = lines[1] ? lines[1].trim() : "";
    const m = w1.length, n = w2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (w1[i - 1] === w2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }
    console.log(dp[m][n]);
}

solve();
`,
    },
    editorial: {
      approach: '2D Levenshtein Dynamic Programming',
      algorithm: 'Transition table using insertion, deletion, and substitution operations in O(m * n).',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
      content: 'Classic string alignment / edit distance algorithm.',
      referenceCode: `def min_distance(word1, word2):
    # 2D DP table
    pass`,
    },
    tags: ['String', 'Dynamic Programming'],
    testCases: [
      { input: 'horse\nros', expectedOutput: '3', isHidden: false },
      { input: 'intention\nexecution', expectedOutput: '5', isHidden: false },
      { input: '\na', expectedOutput: '1', isHidden: false },
      { input: 'sea\neat', expectedOutput: '2', isHidden: true },
    ],
  },

  // 3. Network Delay Time (Dijkstra)
  {
    title: 'Network Delay Time',
    slug: 'network-delay-time',
    description: `You are given a network of \`n\` nodes, labeled from \`1\` to \`n\`. You are also given \`times\`, a list of travel times as directed edges \`times[i] = (ui, vi, wi)\`, where \`ui\` is the source node, \`vi\` is the target node, and \`wi\` is the time it takes for a signal to travel from source to target.

We will send a signal from a given node \`k\`. Return the **minimum time** it takes for all the \`n\` nodes to receive the signal. If it is impossible for all the \`n\` nodes to receive the signal, return \`-1\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= k <= n <= 100\n1 <= times.length <= 6000\ntimes[i].length == 3\n1 <= ui, vi <= n\nui != vi\n0 <= wi <= 100\nAll pairs (ui, vi) are unique.`,
    inputFormat: `Line 1: Three integers \`n m k\` (nodes, edges, source node).\nNext \`m\` lines: Three integers \`u v w\` representing directed edge with weight.`,
    outputFormat: `Minimum time for all nodes to receive signal or \`-1\`.`,
    sampleInput: `4 3 2\n2 1 1\n2 3 1\n3 4 1`,
    sampleOutput: `2`,
    points: 150,
    hints: [
      'Use Dijkstra algorithm using a min-heap priority queue.',
      'Return the maximum distance among all nodes from source k, or -1 if any node remains unvisited.',
    ],
    codeTemplates: {
      python: `import sys
import heapq

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    m = int(tokens[1])
    k = int(tokens[2])
    adj = [[] for _ in range(n + 1)]
    idx = 3
    for _ in range(m):
        u = int(tokens[idx])
        v = int(tokens[idx+1])
        w = int(tokens[idx+2])
        adj[u].append((v, w))
        idx += 3

    dist = {}
    pq = [(0, k)]
    while pq:
        d, u = heapq.heappop(pq)
        if u in dist: continue
        dist[u] = d
        for v, w in adj[u]:
            if v not in dist:
                heapq.heappush(pq, (d + w, v))

    if len(dist) == n:
        print(max(dist.values()))
    else:
        print(-1)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 3) return;
    const n = parseInt(tokens[0], 10);
    const m = parseInt(tokens[1], 10);
    const k = parseInt(tokens[2], 10);
    const adj = Array.from({ length: n + 1 }, () => []);
    let idx = 3;
    for (let i = 0; i < m; i++) {
        const u = parseInt(tokens[idx++], 10);
        const v = parseInt(tokens[idx++], 10);
        const w = parseInt(tokens[idx++], 10);
        adj[u].push([v, w]);
    }

    const dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0;
    const vis = new Array(n + 1).fill(false);

    for (let iter = 0; iter < n; iter++) {
        let u = -1;
        for (let i = 1; i <= n; i++) {
            if (!vis[i] && (u === -1 || dist[i] < dist[u])) {
                u = i;
            }
        }
        if (dist[u] === Infinity) break;
        vis[u] = true;
        for (const [v, w] of adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    let maxD = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) {
            console.log(-1);
            return;
        }
        maxD = Math.max(maxD, dist[i]);
    }
    console.log(maxD);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
import heapq

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    m = int(tokens[1])
    k = int(tokens[2])
    adj = [[] for _ in range(n + 1)]
    idx = 3
    for _ in range(m):
        u = int(tokens[idx])
        v = int(tokens[idx+1])
        w = int(tokens[idx+2])
        adj[u].append((v, w))
        idx += 3

    dist = {}
    pq = [(0, k)]
    while pq:
        d, u = heapq.heappop(pq)
        if u in dist: continue
        dist[u] = d
        for v, w in adj[u]:
            if v not in dist:
                heapq.heappush(pq, (d + w, v))

    if len(dist) == n:
        print(max(dist.values()))
    else:
        print(-1)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 3) return;
    const n = parseInt(tokens[0], 10);
    const m = parseInt(tokens[1], 10);
    const k = parseInt(tokens[2], 10);
    const adj = Array.from({ length: n + 1 }, () => []);
    let idx = 3;
    for (let i = 0; i < m; i++) {
        const u = parseInt(tokens[idx++], 10);
        const v = parseInt(tokens[idx++], 10);
        const w = parseInt(tokens[idx++], 10);
        adj[u].push([v, w]);
    }

    const dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0;
    const vis = new Array(n + 1).fill(false);

    for (let iter = 0; iter < n; iter++) {
        let u = -1;
        for (let i = 1; i <= n; i++) {
            if (!vis[i] && (u === -1 || dist[i] < dist[u])) {
                u = i;
            }
        }
        if (dist[u] === Infinity) break;
        vis[u] = true;
        for (const [v, w] of adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    let maxD = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) {
            console.log(-1);
            return;
        }
        maxD = Math.max(maxD, dist[i]);
    }
    console.log(maxD);
}

solve();
`,
    },
    editorial: {
      approach: 'Dijkstra Single-Source Shortest Paths',
      algorithm: 'Greedy shortest path expansion with priority queue min-heap.',
      timeComplexity: 'O(E log V)',
      spaceComplexity: 'O(V + E)',
      content: 'Standard Dijkstra graph algorithm.',
      referenceCode: `def network_delay_time(times, n, k):
    # Dijkstra
    pass`,
    },
    tags: ['Depth-First Search', 'Breadth-First Search', 'Graph', 'Heap (Priority Queue)', 'Shortest Path'],
    testCases: [
      { input: '4 3 2\n2 1 1\n2 3 1\n3 4 1', expectedOutput: '2', isHidden: false },
      { input: '2 1 1\n1 2 1', expectedOutput: '1', isHidden: false },
      { input: '2 1 2\n1 2 1', expectedOutput: '-1', isHidden: false },
      { input: '3 2 1\n1 2 5\n2 3 5', expectedOutput: '10', isHidden: true },
    ],
  },

  // 4. Range Sum Query - Mutable (Fenwick Tree / Segment Tree)
  {
    title: 'Range Sum Query - Mutable',
    slug: 'range-sum-query-mutable',
    description: `Given an integer array \`nums\`, handle multiple queries of the following types:
1. **Update** the value of an element in \`nums\`: \`update index val\`
2. Calculate the **sum** of the elements of \`nums\` between indices \`left\` and \`right\` inclusive: \`sumRange left right\``,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= nums.length <= 3 * 10^4\n-100 <= nums[i] <= 100\n0 <= index < nums.length\n-100 <= val <= 100\n0 <= left <= right < nums.length\nAt most 3 * 10^4 calls will be made to update and sumRange.`,
    inputFormat: `Line 1: An integer \`n\`.\nLine 2: \`n\` space-separated integers for \`nums\`.\nLine 3: An integer \`q\` (number of queries).\nNext \`q\` lines: \`update <idx> <val>\` or \`sumRange <left> <right>\`.`,
    outputFormat: `For each \`sumRange\` call, print the range sum on a new line.`,
    sampleInput: `3\n1 3 5\n3\nsumRange 0 2\nupdate 1 2\nsumRange 0 2`,
    sampleOutput: `9\n8`,
    points: 150,
    hints: [
      'Use a Binary Indexed Tree (Fenwick Tree) or Segment Tree for O(log n) updates and range sums.',
    ],
    codeTemplates: {
      python: `import sys

class FenwickTree:
    def __init__(self, n):
        self.tree = [0] * (n + 1)

    def update(self, i, delta):
        while i < len(self.tree):
            self.tree[i] += delta
            i += i & (-i)

    def query(self, i):
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    nums = [int(tokens[1 + i]) for i in range(n)]
    q = int(tokens[1 + n])

    bit = FenwickTree(n)
    for i in range(n):
        bit.update(i + 1, nums[i])

    idx = 2 + n
    for _ in range(q):
        op = tokens[idx]
        if op == 'update':
            i = int(tokens[idx+1])
            val = int(tokens[idx+2])
            delta = val - nums[i]
            nums[i] = val
            bit.update(i + 1, delta)
            idx += 3
        elif op == 'sumRange':
            l = int(tokens[idx+1])
            r = int(tokens[idx+2])
            ans = bit.query(r + 1) - bit.query(l)
            print(ans)
            idx += 3

solve()
`,
      javascript: `const fs = require('fs');

class FenwickTree {
    constructor(n) {
        this.tree = new Array(n + 1).fill(0);
    }
    update(i, delta) {
        while (i < this.tree.length) {
            this.tree[i] += delta;
            i += i & (-i);
        }
    }
    query(i) {
        let s = 0;
        while (i > 0) {
            s += this.tree[i];
            i -= i & (-i);
        }
        return s;
    }
}

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const n = parseInt(tokens[0], 10);
    const nums = [];
    for (let i = 0; i < n; i++) nums.push(parseInt(tokens[1 + i], 10));
    const q = parseInt(tokens[1 + n], 10);

    const bit = new FenwickTree(n);
    for (let i = 0; i < n; i++) bit.update(i + 1, nums[i]);

    let idx = 2 + n;
    for (let k = 0; k < q; k++) {
        const op = tokens[idx++];
        if (op === 'update') {
            const i = parseInt(tokens[idx++], 10);
            const val = parseInt(tokens[idx++], 10);
            const delta = val - nums[i];
            nums[i] = val;
            bit.update(i + 1, delta);
        } else if (op === 'sumRange') {
            const l = parseInt(tokens[idx++], 10);
            const r = parseInt(tokens[idx++], 10);
            const ans = bit.query(r + 1) - bit.query(l);
            console.log(ans);
        }
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

class FenwickTree:
    def __init__(self, n):
        self.tree = [0] * (n + 1)

    def update(self, i, delta):
        while i < len(self.tree):
            self.tree[i] += delta
            i += i & (-i)

    def query(self, i):
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s

def solve():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    nums = [int(tokens[1 + i]) for i in range(n)]
    q = int(tokens[1 + n])

    bit = FenwickTree(n)
    for i in range(n):
        bit.update(i + 1, nums[i])

    idx = 2 + n
    for _ in range(q):
        op = tokens[idx]
        if op == 'update':
            i = int(tokens[idx+1])
            val = int(tokens[idx+2])
            delta = val - nums[i]
            nums[i] = val
            bit.update(i + 1, delta)
            idx += 3
        elif op == 'sumRange':
            l = int(tokens[idx+1])
            r = int(tokens[idx+2])
            ans = bit.query(r + 1) - bit.query(l)
            print(ans)
            idx += 3

solve()
`,
      javascript: `const fs = require('fs');

class FenwickTree {
    constructor(n) {
        this.tree = new Array(n + 1).fill(0);
    }
    update(i, delta) {
        while (i < this.tree.length) {
            this.tree[i] += delta;
            i += i & (-i);
        }
    }
    query(i) {
        let s = 0;
        while (i > 0) {
            s += this.tree[i];
            i -= i & (-i);
        }
        return s;
    }
}

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const n = parseInt(tokens[0], 10);
    const nums = [];
    for (let i = 0; i < n; i++) nums.push(parseInt(tokens[1 + i], 10));
    const q = parseInt(tokens[1 + n], 10);

    const bit = new FenwickTree(n);
    for (let i = 0; i < n; i++) bit.update(i + 1, nums[i]);

    let idx = 2 + n;
    for (let k = 0; k < q; k++) {
        const op = tokens[idx++];
        if (op === 'update') {
            const i = parseInt(tokens[idx++], 10);
            const val = parseInt(tokens[idx++], 10);
            const delta = val - nums[i];
            nums[i] = val;
            bit.update(i + 1, delta);
        } else if (op === 'sumRange') {
            const l = parseInt(tokens[idx++], 10);
            const r = parseInt(tokens[idx++], 10);
            const ans = bit.query(r + 1) - bit.query(l);
            console.log(ans);
        }
    }
}

solve();
`,
    },
    editorial: {
      approach: 'Binary Indexed Tree (Fenwick Tree)',
      algorithm: 'Maintain prefix sums in Fenwick Tree with O(log n) point update and prefix query.',
      timeComplexity: 'O(log n) per operation',
      spaceComplexity: 'O(n)',
      content: 'Classic Fenwick Tree / Segment Tree implementation.',
      referenceCode: `class NumArray:
    # Fenwick / Segment tree
    pass`,
    },
    tags: ['Array', 'Design', 'Binary Indexed Tree', 'Segment Tree'],
    testCases: [
      { input: '3\n1 3 5\n3\nsumRange 0 2\nupdate 1 2\nsumRange 0 2', expectedOutput: '9\n8', isHidden: false },
      { input: '1\n10\n2\nsumRange 0 0\nupdate 0 -5', expectedOutput: '10', isHidden: false },
      { input: '4\n1 2 3 4\n2\nsumRange 1 3\nsumRange 0 3', expectedOutput: '9\n10', isHidden: true },
    ],
  },

  // 5. Longest Common Prefix
  {
    title: 'Longest Common Prefix',
    slug: 'longest-common-prefix',
    description: `Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string \`""\`.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= strs.length <= 200\n0 <= strs[i].length <= 200\nstrs[i] consists of only lowercase English letters.`,
    inputFormat: `Line 1: Space-separated strings.`,
    outputFormat: `Longest common prefix string or empty line.`,
    sampleInput: `flower flow flight`,
    sampleOutput: `fl`,
    points: 100,
    hints: [
      'Compare characters column by column across all strings.',
      'Stop at the first mismatch or string end.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    strs = sys.stdin.read().strip().split()
    if not strs:
        print("")
        return
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                print("")
                return
    print(prefix)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const strs = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (strs.length === 0 || !strs[0]) { console.log(""); return; }
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        while (!strs[i].startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
            if (!prefix) { console.log(""); return; }
        }
    }
    console.log(prefix);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    strs = sys.stdin.read().strip().split()
    if not strs:
        print("")
        return
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                print("")
                return
    print(prefix)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const strs = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (strs.length === 0 || !strs[0]) { console.log(""); return; }
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        while (!strs[i].startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
            if (!prefix) { console.log(""); return; }
        }
    }
    console.log(prefix);
}

solve();
`,
    },
    editorial: {
      approach: 'Horizontal / Vertical Scanning',
      algorithm: 'Progressively shrink prefix string until all words share it.',
      timeComplexity: 'O(S) where S is sum of characters',
      spaceComplexity: 'O(1)',
      content: 'Standard string prefix matching.',
      referenceCode: `def longest_common_prefix(strs):
    # horizontal scan
    pass`,
    },
    tags: ['String', 'Trie'],
    testCases: [
      { input: 'flower flow flight', expectedOutput: 'fl', isHidden: false },
      { input: 'dog racecar car', expectedOutput: '', isHidden: false },
      { input: 'interspecies interstellar interstate', expectedOutput: 'inters', isHidden: false },
      { input: 'a', expectedOutput: 'a', isHidden: true },
    ],
  },
];
