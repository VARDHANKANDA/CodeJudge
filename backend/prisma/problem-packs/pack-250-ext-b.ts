import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack250ExtBDefs: ProblemDef[] = [
  // 1. Strongly Connected Components (Kosaraju's Algorithm)
  {
    title: 'Strongly Connected Components',
    slug: 'strongly-connected-components-kosaraju',
    description: `Given a directed graph with \`V\` vertices and \`E\` edges, find the number of **Strongly Connected Components (SCCs)** in the graph.
A Strongly Connected Component is a maximal subgraph where every vertex is reachable from any other vertex in the subgraph.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= V <= 5000\n0 <= E <= 20000\n0 <= u, v < V`,
    inputFormat: `Line 1: V and E\nNext E lines: u v (directed edge from u to v)`,
    outputFormat: `An integer representing the count of SCCs.`,
    sampleInput: `5 5\n1 0\n0 2\n2 1\n0 3\n3 4`,
    sampleOutput: `3`,
    points: 200,
    hints: [
      'Use Kosaraju\'s two-pass DFS algorithm or Tarjan\'s algorithm.',
      'Pass 1: Push vertices to stack in order of finishing times.\nPass 2: Run DFS on transposed graph in order of stack pops.',
    ],
    codeTemplates: {
      python: `import sys
sys.setrecursionlimit(200000)

def solve():
    data = sys.stdin.read().split()
    if not data:
        print(0)
        return
    V, E = int(data[0]), int(data[1])
    adj = [[] for _ in range(V)]
    rev = [[] for _ in range(V)]
    idx = 2
    for _ in range(E):
        u, v = int(data[idx]), int(data[idx+1])
        adj[u].append(v)
        rev[v].append(u)
        idx += 2
        
    visited = [False] * V
    order = []
    
    def dfs1(u):
        visited[u] = True
        for v in adj[u]:
            if not visited[v]:
                dfs1(v)
        order.append(u)
        
    for i in range(V):
        if not visited[i]:
            dfs1(i)
            
    visited = [False] * V
    scc_count = 0
    
    def dfs2(u):
        visited[u] = True
        for v in rev[u]:
            if not visited[v]:
                dfs2(v)
                
    while order:
        u = order.pop()
        if not visited[u]:
            scc_count += 1
            dfs2(u)
            
    print(scc_count)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!data || data.length < 2) { console.log(0); return; }
    const V = parseInt(data[0], 10);
    const E = parseInt(data[1], 10);
    const adj = Array.from({ length: V }, () => []);
    const rev = Array.from({ length: V }, () => []);
    let idx = 2;
    for (let i = 0; i < E; i++) {
        const u = parseInt(data[idx++], 10);
        const v = parseInt(data[idx++], 10);
        adj[u].push(v);
        rev[v].push(u);
    }
    
    let visited = new Uint8Array(V);
    const order = [];
    
    function dfs1(u) {
        visited[u] = 1;
        for (const v of adj[u]) {
            if (!visited[v]) dfs1(v);
        }
        order.push(u);
    }
    
    for (let i = 0; i < V; i++) {
        if (!visited[i]) dfs1(i);
    }
    
    visited = new Uint8Array(V);
    let sccCount = 0;
    
    function dfs2(u) {
        visited[u] = 1;
        for (const v of rev[u]) {
            if (!visited[v]) dfs2(v);
        }
    }
    
    while (order.length > 0) {
        const u = order.pop();
        if (!visited[u]) {
            sccCount++;
            dfs2(u);
        }
    }
    
    console.log(sccCount);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
sys.setrecursionlimit(200000)

def solve():
    data = sys.stdin.read().split()
    if not data:
        print(0)
        return
    V, E = int(data[0]), int(data[1])
    adj = [[] for _ in range(V)]
    rev = [[] for _ in range(V)]
    idx = 2
    for _ in range(E):
        u, v = int(data[idx]), int(data[idx+1])
        adj[u].append(v)
        rev[v].append(u)
        idx += 2
    visited = [False] * V
    order = []
    def dfs1(u):
        visited[u] = True
        for v in adj[u]:
            if not visited[v]: dfs1(v)
        order.append(u)
    for i in range(V):
        if not visited[i]: dfs1(i)
    visited = [False] * V
    scc = 0
    def dfs2(u):
        visited[u] = True
        for v in rev[u]:
            if not visited[v]: dfs2(v)
    while order:
        u = order.pop()
        if not visited[u]:
            scc += 1
            dfs2(u)
    print(scc)

solve()
`,
      javascript: `const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data && data.length >= 2) {
    const V = parseInt(data[0], 10), E = parseInt(data[1], 10);
    const adj = Array.from({ length: V }, () => []);
    const rev = Array.from({ length: V }, () => []);
    let idx = 2;
    for (let i = 0; i < E; i++) {
        const u = parseInt(data[idx++], 10), v = parseInt(data[idx++], 10);
        adj[u].push(v); rev[v].push(u);
    }
    let visited = new Uint8Array(V);
    const order = [];
    function dfs1(u) {
        visited[u] = 1;
        for (const v of adj[u]) if (!visited[v]) dfs1(v);
        order.push(u);
    }
    for (let i = 0; i < V; i++) if (!visited[i]) dfs1(i);
    visited = new Uint8Array(V);
    let scc = 0;
    function dfs2(u) {
        visited[u] = 1;
        for (const v of rev[u]) if (!visited[v]) dfs2(v);
    }
    while (order.length > 0) {
        const u = order.pop();
        if (!visited[u]) { scc++; dfs2(u); }
    }
    console.log(scc);
} else { console.log(0); }
`,
    },
    editorial: {
      approach: "Kosaraju's Two-Pass DFS Algorithm.",
      algorithm: '1. First DFS: Record nodes by finish time in stack.\n2. Transpose graph (reverse all edge directions).\n3. Second DFS: Pop from stack and traverse transposed graph to count SCC components.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      content: 'Reversing graph edges prevents traversing between different strongly connected components in the second pass.',
      referenceCode: `order = []\nfor i in range(V): dfs1(i)\nfor u in reversed(order): if not vis[u]: scc += 1; dfs2(u)`,
    },
    tags: ['Graph', 'Depth-First Search', 'Strongly Connected Components'],
    testCases: [
      { input: `5 5\n1 0\n0 2\n2 1\n0 3\n3 4`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `4 3\n0 1\n1 2\n2 3`, expectedOutput: `4`, isHidden: false, order: 1 },
      { input: `3 3\n0 1\n1 2\n2 0`, expectedOutput: `1`, isHidden: true, order: 2 },
      { input: `1 0`, expectedOutput: `1`, isHidden: true, order: 3 },
    ],
  },

  // 2. Articulation Points in a Graph (Hard)
  {
    title: 'Articulation Points in a Graph',
    slug: 'articulation-points-in-a-graph',
    description: `Given an undirected graph with \`V\` vertices and \`E\` edges, find all **Articulation Points** (cut vertices).
An articulation point is a vertex whose removal increases the number of connected components of the graph.
Output all articulation point vertices in ascending order separated by space, or \`-1\` if none exist.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= V <= 10^5\n0 <= E <= 10^5\n0 <= u, v < V`,
    inputFormat: `Line 1: V and E\nNext E lines: u v`,
    outputFormat: `Space-separated articulation point vertex IDs, or -1.`,
    sampleInput: `5 5\n0 1\n1 2\n2 0\n1 3\n3 4`,
    sampleOutput: `1 3`,
    points: 200,
    hints: [
      'Use Tarjan\'s DFS tree algorithm with discovery (disc) and lowest reachable (low) times.',
      'A non-root vertex u is an articulation point if low[v] >= disc[u] for some child v.',
      'The DFS root is an articulation point if and only if it has >= 2 children in the DFS tree.',
    ],
    codeTemplates: {
      python: `import sys
sys.setrecursionlimit(200000)

def solve():
    data = sys.stdin.read().split()
    if not data:
        print("-1")
        return
    V, E = int(data[0]), int(data[1])
    adj = [[] for _ in range(V)]
    idx = 2
    for _ in range(E):
        u, v = int(data[idx]), int(data[idx+1])
        adj[u].append(v)
        adj[v].append(u)
        idx += 2
        
    disc = [-1] * V
    low = [-1] * V
    is_ap = [False] * V
    timer = 0
    
    def dfs(u, parent):
        nonlocal timer
        disc[u] = low[u] = timer
        timer += 1
        children = 0
        for v in adj[u]:
            if v == parent:
                continue
            if disc[v] != -1:
                low[u] = min(low[u], disc[v])
            else:
                children += 1
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if parent != -1 and low[v] >= disc[u]:
                    is_ap[u] = True
        if parent == -1 and children > 1:
            is_ap[u] = True
            
    for i in range(V):
        if disc[i] == -1:
            dfs(i, -1)
            
    res = [i for i in range(V) if is_ap[i]]
    if not res:
        print("-1")
    else:
        print(" ".join(str(x) for x in res))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!data || data.length < 2) { console.log("-1"); return; }
    const V = parseInt(data[0], 10);
    const E = parseInt(data[1], 10);
    const adj = Array.from({ length: V }, () => []);
    let idx = 2;
    for (let i = 0; i < E; i++) {
        const u = parseInt(data[idx++], 10);
        const v = parseInt(data[idx++], 10);
        adj[u].push(v);
        adj[v].push(u);
    }
    
    const disc = new Int32Array(V).fill(-1);
    const low = new Int32Array(V).fill(-1);
    const isAp = new Uint8Array(V);
    let timer = 0;
    
    function dfs(u, parent) {
        disc[u] = low[u] = timer++;
        let children = 0;
        for (const v of adj[u]) {
            if (v === parent) continue;
            if (disc[v] !== -1) {
                low[u] = Math.min(low[u], disc[v]);
            } else {
                children++;
                dfs(v, u);
                low[u] = Math.min(low[u], low[v]);
                if (parent !== -1 && low[v] >= disc[u]) {
                    isAp[u] = 1;
                }
            }
        }
        if (parent === -1 && children > 1) {
            isAp[u] = 1;
        }
    }
    
    for (let i = 0; i < V; i++) {
        if (disc[i] === -1) dfs(i, -1);
    }
    
    const res = [];
    for (let i = 0; i < V; i++) {
        if (isAp[i]) res.push(i);
    }
    
    console.log(res.length ? res.join(" ") : "-1");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
sys.setrecursionlimit(200000)

def solve():
    data = sys.stdin.read().split()
    if not data:
        print("-1")
        return
    V, E = int(data[0]), int(data[1])
    adj = [[] for _ in range(V)]
    idx = 2
    for _ in range(E):
        u, v = int(data[idx]), int(data[idx+1])
        adj[u].append(v)
        adj[v].append(u)
        idx += 2
    disc, low = [-1] * V, [-1] * V
    is_ap = [False] * V
    timer = 0
    def dfs(u, p):
        nonlocal timer
        disc[u] = low[u] = timer
        timer += 1
        children = 0
        for v in adj[u]:
            if v == p: continue
            if disc[v] != -1: low[u] = min(low[u], disc[v])
            else:
                children += 1
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if p != -1 and low[v] >= disc[u]: is_ap[u] = True
        if p == -1 and children > 1: is_ap[u] = True
    for i in range(V):
        if disc[i] == -1: dfs(i, -1)
    res = [i for i in range(V) if is_ap[i]]
    print(" ".join(str(x) for x in res) if res else "-1")

solve()
`,
      javascript: `const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data && data.length >= 2) {
    const V = parseInt(data[0], 10), E = parseInt(data[1], 10);
    const adj = Array.from({ length: V }, () => []);
    let idx = 2;
    for (let i = 0; i < E; i++) {
        const u = parseInt(data[idx++], 10), v = parseInt(data[idx++], 10);
        adj[u].push(v); adj[v].push(u);
    }
    const disc = new Int32Array(V).fill(-1), low = new Int32Array(V).fill(-1), isAp = new Uint8Array(V);
    let timer = 0;
    function dfs(u, p) {
        disc[u] = low[u] = timer++;
        let children = 0;
        for (const v of adj[u]) {
            if (v === p) continue;
            if (disc[v] !== -1) low[u] = Math.min(low[u], disc[v]);
            else {
                children++;
                dfs(v, u);
                low[u] = Math.min(low[u], low[v]);
                if (p !== -1 && low[v] >= disc[u]) isAp[u] = 1;
            }
        }
        if (p === -1 && children > 1) isAp[u] = 1;
    }
    for (let i = 0; i < V; i++) if (disc[i] === -1) dfs(i, -1);
    const res = [];
    for (let i = 0; i < V; i++) if (isAp[i]) res.push(i);
    console.log(res.length ? res.join(" ") : "-1");
} else { console.log("-1"); }
`,
    },
    editorial: {
      approach: "Tarjan's Cut Vertex DFS Algorithm.",
      algorithm: '1. Track discovery time and low-link values in DFS.\n2. If child v cannot reach above u (low[v] >= disc[u]), u is a cut vertex.\n3. DFS root is a cut vertex if it has >= 2 subtrees.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      content: 'Linear-time cut vertex algorithm identifies network single-point vulnerabilities.',
      referenceCode: `if parent != -1 and low[v] >= disc[u]: is_ap[u] = True`,
    },
    tags: ['Graph', 'Depth-First Search', 'Bridges & Articulation Points'],
    testCases: [
      { input: `5 5\n0 1\n1 2\n2 0\n1 3\n3 4`, expectedOutput: `1 3`, isHidden: false, order: 0 },
      { input: `4 3\n0 1\n1 2\n2 3`, expectedOutput: `1 2`, isHidden: false, order: 1 },
      { input: `3 3\n0 1\n1 2\n2 0`, expectedOutput: `-1`, isHidden: true, order: 2 },
      { input: `1 0`, expectedOutput: `-1`, isHidden: true, order: 3 },
    ],
  },

  // 3. Satisfiability of Equality Equations (DSU / 2-SAT)
  {
    title: 'Satisfiability of Equality Equations',
    slug: 'satisfiability-of-equality-equations',
    description: `You are given an array of strings \`equations\` that represent relationships between variables where each string \`equations[i]\` has length \`4\` and takes one of two different forms: \`"xi==yi"\` or \`"xi!=yi"\`. Here, \`xi\` and \`yi\` are lowercase letters (not necessarily different) representing one-letter variable names.
Return \`true\` if it is possible to assign integers to variable names so as to satisfy all the given equations, or \`false\` otherwise.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= equations.length <= 500\nequations[i].length == 4\nequations[i][0] and equations[i][3] are lowercase letters.`,
    inputFormat: `Space or comma separated list of equations.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `a==b b!=a`,
    sampleOutput: `false`,
    points: 150,
    hints: [
      'First pass: process all "==" equations and union the two variables into connected components using Disjoint Set Union (DSU).',
      'Second pass: process all "!=" equations and verify that both variables are not in the same connected component.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read().strip().replace(',', ' ').split()
    if not raw:
        print("true")
        return
        
    parent = list(range(26))
    def find(i):
        if parent[i] == i:
            return i
        parent[i] = find(parent[i])
        return parent[i]
        
    def union(i, j):
        root_i = find(i)
        root_j = find(j)
        if root_i != root_j:
            parent[root_i] = root_j
            
    # Pass 1: ==
    for eq in raw:
        if eq[1:3] == '==':
            union(ord(eq[0]) - 97, ord(eq[3]) - 97)
            
    # Pass 2: !=
    for eq in raw:
        if eq[1:3] == '!=':
            if find(ord(eq[0]) - 97) == find(ord(eq[3]) - 97):
                print("false")
                return
                
    print("true")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
    if (!raw || raw[0] === '') { console.log("true"); return; }
    
    const parent = Array.from({ length: 26 }, (_, i) => i);
    function find(i) {
        if (parent[i] === i) return i;
        parent[i] = find(parent[i]);
        return parent[i];
    }
    function union(i, j) {
        const ri = find(i);
        const rj = find(j);
        if (ri !== rj) parent[ri] = rj;
    }
    
    for (const eq of raw) {
        if (eq.slice(1, 3) === '==') {
            union(eq.charCodeAt(0) - 97, eq.charCodeAt(3) - 97);
        }
    }
    
    for (const eq of raw) {
        if (eq.slice(1, 3) === '!=') {
            if (find(eq.charCodeAt(0) - 97) === find(eq.charCodeAt(3) - 97)) {
                console.log("false");
                return;
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
raw = sys.stdin.read().strip().replace(',', ' ').split()
if raw:
    parent = list(range(26))
    def find(i):
        if parent[i] == i: return i
        parent[i] = find(parent[i])
        return parent[i]
    def union(i, j):
        ri, rj = find(i), find(j)
        if ri != rj: parent[ri] = rj
    for eq in raw:
        if eq[1:3] == '==': union(ord(eq[0]) - 97, ord(eq[3]) - 97)
    valid = True
    for eq in raw:
        if eq[1:3] == '!=':
            if find(ord(eq[0]) - 97) == find(ord(eq[3]) - 97):
                valid = False; break
    print("true" if valid else "false")
else:
    print("true")
`,
      javascript: `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim().replace(/,/g, ' ').split(/\\s+/);
if (raw && raw[0] !== '') {
    const parent = Array.from({ length: 26 }, (_, i) => i);
    function find(i) {
        if (parent[i] === i) return i;
        parent[i] = find(parent[i]);
        return parent[i];
    }
    function union(i, j) {
        const ri = find(i), rj = find(j);
        if (ri !== rj) parent[ri] = rj;
    }
    for (const eq of raw) {
        if (eq.slice(1, 3) === '==') union(eq.charCodeAt(0) - 97, eq.charCodeAt(3) - 97);
    }
    let valid = true;
    for (const eq of raw) {
        if (eq.slice(1, 3) === '!=') {
            if (find(eq.charCodeAt(0) - 97) === find(eq.charCodeAt(3) - 97)) { valid = false; break; }
        }
    }
    console.log(valid ? "true" : "false");
} else { console.log("true"); }
`,
    },
    editorial: {
      approach: 'Disjoint Set Union (Union-Find).',
      algorithm: '1. Group equal variables into equivalent sets using Union-Find.\n2. Validate that no inequality equation links two variables belonging to the same set.',
      timeComplexity: 'O(N * alpha(26)) = O(N)',
      spaceComplexity: 'O(1)',
      content: 'Equivalence relation partitions variables into disjoint components.',
      referenceCode: `for eq in equals: union(eq[0], eq[3])\nfor eq in not_equals: if find(eq[0]) == find(eq[3]): return False`,
    },
    tags: ['Graph', 'Union Find', 'Array'],
    testCases: [
      { input: `a==b b!=a`, expectedOutput: `false`, isHidden: false, order: 0 },
      { input: `b==a a==b`, expectedOutput: `true`, isHidden: false, order: 1 },
      { input: `a==b b==c a==c`, expectedOutput: `true`, isHidden: true, order: 2 },
      { input: `a==b b!=c c==a`, expectedOutput: `false`, isHidden: true, order: 3 },
    ],
  },

  // 4. Cheapest Flights Within K Stops
  {
    title: 'Cheapest Flights Within K Stops',
    slug: 'cheapest-flights-within-k-stops',
    description: `There are \`n\` cities connected by some number of flights. You are given an array \`flights\` where \`flights[i] = [fromi, toi, pricei]\` indicates that there is a flight from city \`fromi\` to city \`toi\` with cost \`pricei\`.
You are also given three integers \`src\`, \`dst\`, and \`k\`, return the cheapest price from \`src\` to \`dst\` with at most \`k\` stops. If there is no such route, return \`-1\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= n <= 100\n0 <= flights.length <= (n * (n - 1) / 2)\n0 <= src, dst < n\n0 <= k < n`,
    inputFormat: `Line 1: n, m (flights count), src, dst, k\nNext m lines: u v w`,
    outputFormat: `An integer representing the minimum flight cost, or -1.`,
    sampleInput: `4 5 0 3 1\n0 1 100\n1 2 100\n2 3 100\n0 2 500\n1 3 600`,
    sampleOutput: `600`,
    points: 150,
    hints: [
      'Use modified Bellman-Ford algorithm with at most K+1 edge relaxations.',
      'Maintain a copy of distance array in each round to avoid relaxing multiple edges within the same step.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    n, m, src, dst, k = int(data[0]), int(data[1]), int(data[2]), int(data[3]), int(data[4])
    flights = []
    idx = 5
    for _ in range(m):
        flights.append((int(data[idx]), int(data[idx+1]), int(data[idx+2])))
        idx += 3
        
    INF = float('inf')
    dist = [INF] * n
    dist[src] = 0
    
    for _ in range(k + 1):
        temp = list(dist)
        for u, v, w in flights:
            if dist[u] != INF and dist[u] + w < temp[v]:
                temp[v] = dist[u] + w
        dist = temp
        
    print(dist[dst] if dist[dst] != INF else -1)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!data || data.length < 5) return;
    const n = parseInt(data[0], 10);
    const m = parseInt(data[1], 10);
    const src = parseInt(data[2], 10);
    const dst = parseInt(data[3], 10);
    const k = parseInt(data[4], 10);
    
    const flights = [];
    let idx = 5;
    for (let i = 0; i < m; i++) {
        flights.push([parseInt(data[idx++], 10), parseInt(data[idx++], 10), parseInt(data[idx++], 10)]);
    }
    
    let dist = new Array(n).fill(Infinity);
    dist[src] = 0;
    
    for (let iter = 0; iter <= k; iter++) {
        const temp = [...dist];
        for (const [u, v, w] of flights) {
            if (dist[u] !== Infinity && dist[u] + w < temp[v]) {
                temp[v] = dist[u] + w;
            }
        }
        dist = temp;
    }
    
    console.log(dist[dst] === Infinity ? -1 : dist[dst]);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
data = sys.stdin.read().split()
if data:
    n, m, src, dst, k = int(data[0]), int(data[1]), int(data[2]), int(data[3]), int(data[4])
    flights = []
    idx = 5
    for _ in range(m):
        flights.append((int(data[idx]), int(data[idx+1]), int(data[idx+2])))
        idx += 3
    INF = float('inf')
    dist = [INF] * n
    dist[src] = 0
    for _ in range(k + 1):
        temp = list(dist)
        for u, v, w in flights:
            if dist[u] != INF and dist[u] + w < temp[v]:
                temp[v] = dist[u] + w
        dist = temp
    print(dist[dst] if dist[dst] != INF else -1)
`,
      javascript: `const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data && data.length >= 5) {
    const n = parseInt(data[0], 10), m = parseInt(data[1], 10), src = parseInt(data[2], 10), dst = parseInt(data[3], 10), k = parseInt(data[4], 10);
    const flights = [];
    let idx = 5;
    for (let i = 0; i < m; i++) flights.push([parseInt(data[idx++], 10), parseInt(data[idx++], 10), parseInt(data[idx++], 10)]);
    let dist = new Array(n).fill(Infinity);
    dist[src] = 0;
    for (let iter = 0; iter <= k; iter++) {
        const temp = [...dist];
        for (const [u, v, w] of flights) {
            if (dist[u] !== Infinity && dist[u] + w < temp[v]) temp[v] = dist[u] + w;
        }
        dist = temp;
    }
    console.log(dist[dst] === Infinity ? -1 : dist[dst]);
}
`,
    },
    editorial: {
      approach: 'Step-Bounded Bellman-Ford Shortest Path.',
      algorithm: '1. Execute exactly k + 1 edge relaxation rounds.\n2. Store intermediate results in a snapshot array to limit step-wise expansion.\n3. Return dist[dst] or -1 if unreachable.',
      timeComplexity: 'O(K * E)',
      spaceComplexity: 'O(V)',
      content: 'Restricting relaxation passes directly enforces the maximum stop limit.',
      referenceCode: `for _ in range(k + 1):\n    temp = list(dist)\n    for u, v, w in flights: temp[v] = min(temp[v], dist[u] + w)\n    dist = temp`,
    },
    tags: ['Graph', 'Shortest Path', 'Dynamic Programming', 'Breadth-First Search'],
    testCases: [
      { input: `4 5 0 3 1\n0 1 100\n1 2 100\n2 3 100\n0 2 500\n1 3 600`, expectedOutput: `600`, isHidden: false, order: 0 },
      { input: `3 3 0 2 0\n0 1 100\n1 2 100\n0 2 500`, expectedOutput: `500`, isHidden: false, order: 1 },
      { input: `2 1 0 1 0\n0 1 200`, expectedOutput: `200`, isHidden: true, order: 2 },
    ],
  },
];
