import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack250Batch2Defs: ProblemDef[] = [
  // 1. Bellman-Ford Single Source Shortest Path
  {
    title: 'Bellman-Ford Shortest Path',
    slug: 'bellman-ford-shortest-path',
    description: `Given a directed graph with \`V\` vertices and \`E\` edges with integer weights (which can be negative), and a source vertex \`src\`, calculate the shortest distance from \`src\` to all other vertices. If the graph contains a **negative weight cycle**, output \`-1\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= V <= 500\n0 <= E <= 2000\n0 <= src < V\n-1000 <= weight <= 1000`,
    inputFormat: `Line 1: V, E, src\nFollowing E lines: u v w (directed edge from u to v with weight w)`,
    outputFormat: `Space-separated shortest distances to vertices 0 through V-1, or -1 if a negative cycle exists. Unreachable vertices have distance 1000000000.`,
    sampleInput: `4 4 0\n0 1 1\n1 2 2\n2 3 3\n0 3 10`,
    sampleOutput: `0 1 3 6`,
    points: 150,
    hints: [
      'Relax all E edges V-1 times.',
      'Check one additional relaxation pass: if any distance decreases, a negative cycle is present.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    V, E, src = int(data[0]), int(data[1]), int(data[2])
    edges = []
    idx = 3
    for _ in range(E):
        edges.append((int(data[idx]), int(data[idx+1]), int(data[idx+2])))
        idx += 3
        
    INF = 10**9
    dist = [INF] * V
    dist[src] = 0
    
    for _ in range(V - 1):
        for u, v, w in edges:
            if dist[u] != INF and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                
    # Negative cycle check
    has_neg_cycle = False
    for u, v, w in edges:
        if dist[u] != INF and dist[u] + w < dist[v]:
            has_neg_cycle = True
            break
            
    if has_neg_cycle:
        print("-1")
    else:
        print(" ".join(str(d) for d in dist))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!data || data.length < 3) return;
    const V = parseInt(data[0], 10);
    const E = parseInt(data[1], 10);
    const src = parseInt(data[2], 10);
    const edges = [];
    let idx = 3;
    for (let i = 0; i < E; i++) {
        edges.push([parseInt(data[idx], 10), parseInt(data[idx+1], 10), parseInt(data[idx+2], 10)]);
        idx += 3;
    }
    const INF = 1000000000;
    const dist = new Array(V).fill(INF);
    dist[src] = 0;
    
    for (let iter = 0; iter < V - 1; iter++) {
        for (const [u, v, w] of edges) {
            if (dist[u] !== INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    let hasNegCycle = false;
    for (const [u, v, w] of edges) {
        if (dist[u] !== INF && dist[u] + w < dist[v]) {
            hasNegCycle = true;
            break;
        }
    }
    
    if (hasNegCycle) {
        console.log("-1");
    } else {
        console.log(dist.join(" "));
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
data = sys.stdin.read().split()
if data:
    V, E, src = int(data[0]), int(data[1]), int(data[2])
    edges = []
    idx = 3
    for _ in range(E):
        edges.append((int(data[idx]), int(data[idx+1]), int(data[idx+2])))
        idx += 3
    INF = 10**9
    dist = [INF] * V
    dist[src] = 0
    for _ in range(V - 1):
        for u, v, w in edges:
            if dist[u] != INF and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    has_neg = any(dist[u] != INF and dist[u] + w < dist[v] for u, v, w in edges)
    print("-1" if has_neg else " ".join(str(d) for d in dist))
`,
      javascript: `const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data && data.length >= 3) {
    const V = parseInt(data[0], 10), E = parseInt(data[1], 10), src = parseInt(data[2], 10);
    const edges = [];
    let idx = 3;
    for (let i = 0; i < E; i++) {
        edges.push([parseInt(data[idx], 10), parseInt(data[idx+1], 10), parseInt(data[idx+2], 10)]);
        idx += 3;
    }
    const INF = 1000000000;
    const dist = new Array(V).fill(INF);
    dist[src] = 0;
    for (let iter = 0; iter < V - 1; iter++) {
        for (const [u, v, w] of edges) {
            if (dist[u] !== INF && dist[u] + w < dist[v]) dist[v] = dist[u] + w;
        }
    }
    let hasNeg = false;
    for (const [u, v, w] of edges) {
        if (dist[u] !== INF && dist[u] + w < dist[v]) { hasNeg = true; break; }
    }
    console.log(hasNeg ? "-1" : dist.join(" "));
}
`,
    },
    editorial: {
      approach: 'Classic Bellman-Ford algorithm with negative cycle detection.',
      algorithm: '1. Initialize dist array with INF and dist[src] = 0.\n2. Relax all edges V-1 times.\n3. Verify convergence by checking for further edge relaxations.\n4. Output formatted distances or -1 on negative cycle.',
      timeComplexity: 'O(V * E)',
      spaceComplexity: 'O(V)',
      content: 'Bellman-Ford computes single-source shortest paths on graphs with arbitrary edge weights and diagnoses negative-weight cycles.',
      referenceCode: `for _ in range(V-1):\n    for u, v, w in edges:\n        if dist[u] + w < dist[v]: dist[v] = dist[u] + w`,
    },
    tags: ['Graph', 'Shortest Path'],
    testCases: [
      { input: `4 4 0\n0 1 1\n1 2 2\n2 3 3\n0 3 10`, expectedOutput: `0 1 3 6`, isHidden: false, order: 0 },
      { input: `3 3 0\n0 1 1\n1 2 -2\n2 0 -1`, expectedOutput: `-1`, isHidden: false, order: 1 },
      { input: `2 1 0\n0 1 5`, expectedOutput: `0 5`, isHidden: true, order: 2 },
      { input: `3 2 0\n0 1 4\n1 2 2`, expectedOutput: `0 4 6`, isHidden: true, order: 3 },
    ],
  },

  // 2. Floyd-Warshall All-Pairs Shortest Path
  {
    title: 'Floyd-Warshall All-Pairs Shortest Path',
    slug: 'floyd-warshall-all-pairs-shortest-path',
    description: `Given an adjacency matrix of a directed graph with \`V\` vertices, compute the shortest path distance between every pair of vertices. If vertex \`j\` is unreachable from vertex \`i\`, the distance is represented by \`-1\`.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= V <= 100\n-1 <= matrix[i][j] <= 1000\nmatrix[i][i] == 0`,
    inputFormat: `Line 1: V\nNext V lines: V space-separated integers representing matrix[i][j] (-1 denotes no edge).`,
    outputFormat: `V lines: V space-separated integers representing all-pairs shortest distances.`,
    sampleInput: `2\n0 3\n-1 0`,
    sampleOutput: `0 3\n-1 0`,
    points: 150,
    hints: [
      'Use 3 nested loops with intermediate vertex k from 0 to V-1.',
      'matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j]).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    V = int(data[0])
    matrix = []
    idx = 1
    INF = 10**9
    for i in range(V):
        row = []
        for j in range(V):
            val = int(data[idx])
            row.append(INF if val == -1 and i != j else val)
            idx += 1
        matrix.append(row)
        
    for k in range(V):
        for i in range(V):
            for j in range(V):
                if matrix[i][k] != INF and matrix[k][j] != INF:
                    if matrix[i][k] + matrix[k][j] < matrix[i][j]:
                        matrix[i][j] = matrix[i][k] + matrix[k][j]
                        
    for i in range(V):
        res = [str(-1 if matrix[i][j] >= INF else matrix[i][j]) for j in range(V)]
        print(" ".join(res))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!data || data.length < 1) return;
    const V = parseInt(data[0], 10);
    const INF = 1000000000;
    const matrix = [];
    let idx = 1;
    for (let i = 0; i < V; i++) {
        const row = [];
        for (let j = 0; j < V; j++) {
            const val = parseInt(data[idx++], 10);
            row.push(val === -1 && i !== j ? INF : val);
        }
        matrix.push(row);
    }
    
    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                if (matrix[i][k] !== INF && matrix[k][j] !== INF) {
                    if (matrix[i][k] + matrix[k][j] < matrix[i][j]) {
                        matrix[i][j] = matrix[i][k] + matrix[k][j];
                    }
                }
            }
        }
    }
    
    for (let i = 0; i < V; i++) {
        console.log(matrix[i].map(v => v >= INF ? -1 : v).join(" "));
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
data = sys.stdin.read().split()
if data:
    V = int(data[0])
    INF = 10**9
    matrix = []
    idx = 1
    for i in range(V):
        row = []
        for j in range(V):
            val = int(data[idx])
            row.append(INF if val == -1 and i != j else val)
            idx += 1
        matrix.append(row)
    for k in range(V):
        for i in range(V):
            for j in range(V):
                if matrix[i][k] + matrix[k][j] < matrix[i][j]:
                    matrix[i][j] = matrix[i][k] + matrix[k][j]
    for i in range(V):
        print(" ".join(str(-1 if matrix[i][j] >= INF else matrix[i][j]) for j in range(V)))
`,
      javascript: `const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data && data.length >= 1) {
    const V = parseInt(data[0], 10);
    const INF = 1000000000;
    const matrix = [];
    let idx = 1;
    for (let i = 0; i < V; i++) {
        const row = [];
        for (let j = 0; j < V; j++) {
            const val = parseInt(data[idx++], 10);
            row.push(val === -1 && i !== j ? INF : val);
        }
        matrix.push(row);
    }
    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                if (matrix[i][k] + matrix[k][j] < matrix[i][j]) matrix[i][j] = matrix[i][k] + matrix[k][j];
            }
        }
    }
    for (let i = 0; i < V; i++) console.log(matrix[i].map(v => v >= INF ? -1 : v).join(" "));
}
`,
    },
    editorial: {
      approach: 'Dynamic Programming all-pairs shortest paths via Floyd-Warshall.',
      algorithm: '1. Initialize distance matrix from graph adjacency.\n2. Iteratively relax paths through every intermediate node k.\n3. Output formatted distance matrix with -1 for unreachable node pairs.',
      timeComplexity: 'O(V^3)',
      spaceComplexity: 'O(V^2)',
      content: 'Triple-nested loop updates shortest paths across all vertex pairs by evaluating each vertex as an intermediate hop.',
      referenceCode: `for k in range(V):\n    for i in range(V):\n        for j in range(V):\n            dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`,
    },
    tags: ['Graph', 'Dynamic Programming', 'Shortest Path'],
    testCases: [
      { input: `2\n0 3\n-1 0`, expectedOutput: `0 3\n-1 0`, isHidden: false, order: 0 },
      { input: `3\n0 1 43\n1 0 6\n-1 -1 0`, expectedOutput: `0 1 7\n1 0 6\n-1 -1 0`, isHidden: false, order: 1 },
      { input: `1\n0`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },

  // 3. Critical Connections in a Network (Bridges / Tarjan's)
  {
    title: 'Critical Connections in a Network',
    slug: 'critical-connections-in-a-network',
    description: `There are \`n\` servers numbered from \`0\` to \`n - 1\` connected by undirected server-to-server \`connections\` forming a network.
A **critical connection** (bridge) is a connection that, if removed, will make some servers unable to reach other servers.
Return all critical connections in the network. Output connections sorted by start and end node.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `2 <= n <= 10^5\nn - 1 <= connections.length <= 10^5\n0 <= u, v < n`,
    inputFormat: `Line 1: n and m (number of edges)\nFollowing m lines: u v`,
    outputFormat: `Lines of 'u v' representing critical edges with u < v, sorted lexicographically. If none, output nothing.`,
    sampleInput: `4 4\n0 1\n1 2\n2 0\n1 3`,
    sampleOutput: `1 3`,
    points: 200,
    hints: [
      'Use Tarjan\'s Bridge-Finding Algorithm with discovery times (disc) and lowest reachable times (low).',
      'An edge (u, v) is a bridge if and only if low[v] > disc[u].',
    ],
    codeTemplates: {
      python: `import sys
sys.setrecursionlimit(200000)

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    n, m = int(data[0]), int(data[1])
    adj = [[] for _ in range(n)]
    idx = 2
    for _ in range(m):
        u, v = int(data[idx]), int(data[idx+1])
        adj[u].append(v)
        adj[v].append(u)
        idx += 2
        
    disc = [-1] * n
    low = [-1] * n
    timer = 0
    bridges = []
    
    def dfs(u, parent):
        nonlocal timer
        disc[u] = low[u] = timer
        timer += 1
        for v in adj[u]:
            if v == parent:
                continue
            if disc[v] != -1:
                low[u] = min(low[u], disc[v])
            else:
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if low[v] > disc[u]:
                    bridges.append((min(u, v), max(u, v)))
                    
    for i in range(n):
        if disc[i] == -1:
            dfs(i, -1)
            
    bridges.sort()
    for u, v in bridges:
        print(f"{u} {v}")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!data || data.length < 2) return;
    const n = parseInt(data[0], 10);
    const m = parseInt(data[1], 10);
    const adj = Array.from({ length: n }, () => []);
    let idx = 2;
    for (let i = 0; i < m; i++) {
        const u = parseInt(data[idx++], 10);
        const v = parseInt(data[idx++], 10);
        adj[u].push(v);
        adj[v].push(u);
    }
    
    const disc = new Int32Array(n).fill(-1);
    const low = new Int32Array(n).fill(-1);
    let timer = 0;
    const bridges = [];
    
    function dfs(u, parent) {
        disc[u] = low[u] = timer++;
        for (const v of adj[u]) {
            if (v === parent) continue;
            if (disc[v] !== -1) {
                low[u] = Math.min(low[u], disc[v]);
            } else {
                dfs(v, u);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > disc[u]) {
                    bridges.push([Math.min(u, v), Math.max(u, v)]);
                }
            }
        }
    }
    
    for (let i = 0; i < n; i++) {
        if (disc[i] === -1) dfs(i, -1);
    }
    
    bridges.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
    for (const [u, v] of bridges) {
        console.log(\`\${u} \${v}\`);
    }
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
        return
    n, m = int(data[0]), int(data[1])
    adj = [[] for _ in range(n)]
    idx = 2
    for _ in range(m):
        u, v = int(data[idx]), int(data[idx+1])
        adj[u].append(v)
        adj[v].append(u)
        idx += 2
    disc, low = [-1]*n, [-1]*n
    timer = 0
    bridges = []
    def dfs(u, p):
        nonlocal timer
        disc[u] = low[u] = timer
        timer += 1
        for v in adj[u]:
            if v == p: continue
            if disc[v] != -1: low[u] = min(low[u], disc[v])
            else:
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if low[v] > disc[u]: bridges.append((min(u, v), max(u, v)))
    for i in range(n):
        if disc[i] == -1: dfs(i, -1)
    bridges.sort()
    for u, v in bridges: print(f"{u} {v}")

solve()
`,
      javascript: `const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data && data.length >= 2) {
    const n = parseInt(data[0], 10), m = parseInt(data[1], 10);
    const adj = Array.from({ length: n }, () => []);
    let idx = 2;
    for (let i = 0; i < m; i++) {
        const u = parseInt(data[idx++], 10), v = parseInt(data[idx++], 10);
        adj[u].push(v); adj[v].push(u);
    }
    const disc = new Int32Array(n).fill(-1), low = new Int32Array(n).fill(-1);
    let timer = 0;
    const bridges = [];
    function dfs(u, p) {
        disc[u] = low[u] = timer++;
        for (const v of adj[u]) {
            if (v === p) continue;
            if (disc[v] !== -1) low[u] = Math.min(low[u], disc[v]);
            else {
                dfs(v, u);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > disc[u]) bridges.push([Math.min(u, v), Math.max(u, v)]);
            }
        }
    }
    for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i, -1);
    bridges.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
    for (const [u, v] of bridges) console.log(\`\${u} \${v}\`);
}
`,
    },
    editorial: {
      approach: "Tarjan's DFS Bridge-Finding Algorithm.",
      algorithm: '1. Track discovery time (disc) and lowest ancestor reachable (low) for every node.\n2. When traversing back-edges, update low[u] = min(low[u], disc[v]).\n3. An edge (u, v) is a bridge if low[v] > disc[u].\n4. Return sorted bridges.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      content: 'Tarjan bridge detection operates in linear time by analyzing DFS subtree back-links.',
      referenceCode: `if low[v] > disc[u]: bridges.append((min(u, v), max(u, v)))`,
    },
    tags: ['Graph', 'DFS'],
    testCases: [
      { input: `4 4\n0 1\n1 2\n2 0\n1 3`, expectedOutput: `1 3`, isHidden: false, order: 0 },
      { input: `2 1\n0 1`, expectedOutput: `0 1`, isHidden: false, order: 1 },
      { input: `3 3\n0 1\n1 2\n2 0`, expectedOutput: ``, isHidden: true, order: 2 },
      { input: `5 5\n0 1\n1 2\n2 0\n1 3\n3 4`, expectedOutput: `1 3\n3 4`, isHidden: true, order: 3 },
    ],
  },

  // 4. All Paths From Source to Target
  {
    title: 'All Paths From Source to Target',
    slug: 'all-paths-from-source-to-target',
    description: `Given a directed acyclic graph (DAG) of \`n\` nodes labeled from \`0\` to \`n - 1\`, find all possible paths from node \`0\` to node \`n - 1\` and return them in any order.
The graph is given as an adjacency list.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `2 <= n <= 15\n0 <= graph[i][j] < n\nAll graph edges are directed acyclic.`,
    inputFormat: `Line 1: n\nNext n lines: comma or space separated neighbors of node i (or empty line if no outgoing edges).`,
    outputFormat: `One path per line formatted as comma-separated node IDs. Paths sorted lexicographically.`,
    sampleInput: `4\n1,2\n3\n3\n`,
    sampleOutput: `0,1,3\n0,2,3`,
    points: 150,
    hints: [
      'Perform DFS / backtracking starting from node 0.',
      'Append current node to path, recurse to neighbors, and record path upon reaching n - 1.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().splitlines()
    if not lines:
        return
    n = int(lines[0].strip())
    adj = []
    for i in range(1, n + 1):
        if i < len(lines) and lines[i].strip():
            adj.append([int(x.strip()) for x in lines[i].replace(',', ' ').split()])
        else:
            adj.append([])
            
    paths = []
    def dfs(u, path):
        if u == n - 1:
            paths.append(list(path))
            return
        for v in adj[u]:
            path.append(v)
            dfs(v, path)
            path.pop()
            
    dfs(0, [0])
    paths.sort()
    for p in paths:
        print(",".join(str(x) for x in p))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').split('\\n');
    if (!lines || lines.length === 0 || !lines[0].trim()) return;
    const n = parseInt(lines[0].trim(), 10);
    const adj = [];
    for (let i = 1; i <= n; i++) {
        if (i < lines.length && lines[i].trim()) {
            adj.push(lines[i].replace(/,/g, ' ').trim().split(/\\s+/).map(x => parseInt(x, 10)));
        } else {
            adj.push([]);
        }
    }
    const paths = [];
    function dfs(u, path) {
        if (u === n - 1) {
            paths.push([...path]);
            return;
        }
        for (const v of adj[u]) {
            path.push(v);
            dfs(v, path);
            path.pop();
        }
    }
    dfs(0, [0]);
    paths.sort((a, b) => {
        for (let k = 0; k < Math.min(a.length, b.length); k++) {
            if (a[k] !== b[k]) return a[k] - b[k];
        }
        return a.length - b.length;
    });
    for (const p of paths) {
        console.log(p.join(","));
    }
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
lines = sys.stdin.read().splitlines()
if lines and lines[0].strip():
    n = int(lines[0].strip())
    adj = []
    for i in range(1, n + 1):
        if i < len(lines) and lines[i].strip():
            adj.append([int(x) for x in lines[i].replace(',', ' ').split()])
        else: adj.append([])
    paths = []
    def dfs(u, p):
        if u == n - 1: paths.append(list(p)); return
        for v in adj[u]:
            p.append(v); dfs(v, p); p.pop()
    dfs(0, [0])
    paths.sort()
    for p in paths: print(",".join(str(x) for x in p))
`,
      javascript: `const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').split('\\n');
if (lines && lines.length > 0 && lines[0].trim()) {
    const n = parseInt(lines[0].trim(), 10);
    const adj = [];
    for (let i = 1; i <= n; i++) {
        if (i < lines.length && lines[i].trim()) {
            adj.push(lines[i].replace(/,/g, ' ').trim().split(/\\s+/).map(x => parseInt(x, 10)));
        } else { adj.push([]); }
    }
    const paths = [];
    function dfs(u, p) {
        if (u === n - 1) { paths.push([...p]); return; }
        for (const v of adj[u]) { p.push(v); dfs(v, p); p.pop(); }
    }
    dfs(0, [0]);
    paths.sort((a, b) => {
        for (let k = 0; k < Math.min(a.length, b.length); k++) {
            if (a[k] !== b[k]) return a[k] - b[k];
        }
        return a.length - b.length;
    });
    for (const p of paths) console.log(p.join(","));
}
`,
    },
    editorial: {
      approach: 'Backtracking DFS on DAG.',
      algorithm: '1. Start traversal at root node 0 with path [0].\n2. Explore outgoing edges in DAG.\n3. Record path upon reaching destination node n-1.\n4. Sort and output all discovered paths.',
      timeComplexity: 'O(2^N * N)',
      spaceComplexity: 'O(N)',
      content: 'Since DAGs have no cycles, basic backtracking explores all paths without infinite loops.',
      referenceCode: `def dfs(u, path):\n    if u == n-1: paths.append(list(path)); return\n    for v in adj[u]: dfs(v, path + [v])`,
    },
    tags: ['Graph', 'Backtracking', 'DFS'],
    testCases: [
      { input: `4\n1,2\n3\n3\n`, expectedOutput: `0,1,3\n0,2,3`, isHidden: false, order: 0 },
      { input: `2\n1\n`, expectedOutput: `0,1`, isHidden: false, order: 1 },
      { input: `5\n4,3,1\n3,2,4\n3\n4\n`, expectedOutput: `0,1,2,3,4\n0,1,3,4\n0,1,4\n0,3,4\n0,4`, isHidden: true, order: 2 },
    ],
  },

  // 5. Minimum Cost to Connect All Points (Prim's / Kruskal MST)
  {
    title: 'Minimum Cost to Connect All Points',
    slug: 'minimum-cost-to-connect-all-points',
    description: `You are given an array \`points\` representing integer coordinates of some points on a 2D-plane, where \`points[i] = [xi, yi]\`.
The cost of connecting two points \`[xi, yi]\` and \`[xj, yj]\` is the **Manhattan distance** between them: \`|xi - xj| + |yi - yj|\`.
Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= points.length <= 1000\n-10^6 <= xi, yi <= 10^6`,
    inputFormat: `Line 1: N (number of points)\nNext N lines: x y`,
    outputFormat: `An integer representing the minimum cost (MST sum).`,
    sampleInput: `5\n0 0\n2 2\n3 10\n5 2\n7 0`,
    sampleOutput: `20`,
    points: 150,
    hints: [
      'Construct a Minimum Spanning Tree (MST) on the complete graph of N points.',
      "Use Prim's Algorithm or Kruskal's with Disjoint Set Union (DSU).",
    ],
    codeTemplates: {
      python: `import sys
import heapq

def solve():
    data = sys.stdin.read().split()
    if not data:
        print(0)
        return
    n = int(data[0])
    pts = []
    idx = 1
    for _ in range(n):
        pts.append((int(data[idx]), int(data[idx+1])))
        idx += 2
        
    if n <= 1:
        print(0)
        return
        
    visited = [False] * n
    min_cost = 0
    pq = [(0, 0)] # (cost, node)
    count = 0
    
    while pq and count < n:
        cost, u = heapq.heappop(pq)
        if visited[u]:
            continue
        visited[u] = True
        min_cost += cost
        count += 1
        
        ux, uy = pts[u]
        for v in range(n):
            if not visited[v]:
                vx, vy = pts[v]
                dist = abs(ux - vx) + abs(uy - vy)
                heapq.heappush(pq, (dist, v))
                
    print(min_cost)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!data || data.length < 1) { console.log(0); return; }
    const n = parseInt(data[0], 10);
    const pts = [];
    let idx = 1;
    for (let i = 0; i < n; i++) {
        pts.push([parseInt(data[idx++], 10), parseInt(data[idx++], 10)]);
    }
    if (n <= 1) { console.log(0); return; }
    
    const minDist = new Array(n).fill(Infinity);
    minDist[0] = 0;
    const visited = new Uint8Array(n);
    let totalCost = 0;
    
    for (let step = 0; step < n; step++) {
        let u = -1;
        for (let i = 0; i < n; i++) {
            if (!visited[i] && (u === -1 || minDist[i] < minDist[u])) {
                u = i;
            }
        }
        visited[u] = 1;
        totalCost += minDist[u];
        
        const [ux, uy] = pts[u];
        for (let v = 0; v < n; v++) {
            if (!visited[v]) {
                const dist = Math.abs(ux - pts[v][0]) + Math.abs(uy - pts[v][1]);
                if (dist < minDist[v]) minDist[v] = dist;
            }
        }
    }
    console.log(totalCost);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
import heapq
data = sys.stdin.read().split()
if data:
    n = int(data[0])
    pts = []
    idx = 1
    for _ in range(n):
        pts.append((int(data[idx]), int(data[idx+1])))
        idx += 2
    if n <= 1:
        print(0)
    else:
        visited = [False] * n
        min_cost = 0
        pq = [(0, 0)]
        count = 0
        while pq and count < n:
            cost, u = heapq.heappop(pq)
            if visited[u]: continue
            visited[u] = True
            min_cost += cost
            count += 1
            ux, uy = pts[u]
            for v in range(n):
                if not visited[v]:
                    heapq.heappush(pq, (abs(ux - pts[v][0]) + abs(uy - pts[v][1]), v))
        print(min_cost)
else:
    print(0)
`,
      javascript: `const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data && data.length >= 1) {
    const n = parseInt(data[0], 10);
    const pts = [];
    let idx = 1;
    for (let i = 0; i < n; i++) pts.push([parseInt(data[idx++], 10), parseInt(data[idx++], 10)]);
    if (n <= 1) console.log(0);
    else {
        const minDist = new Array(n).fill(Infinity);
        minDist[0] = 0;
        const visited = new Uint8Array(n);
        let totalCost = 0;
        for (let step = 0; step < n; step++) {
            let u = -1;
            for (let i = 0; i < n; i++) {
                if (!visited[i] && (u === -1 || minDist[i] < minDist[u])) u = i;
            }
            visited[u] = 1;
            totalCost += minDist[u];
            const [ux, uy] = pts[u];
            for (let v = 0; v < n; v++) {
                if (!visited[v]) {
                    const dist = Math.abs(ux - pts[v][0]) + Math.abs(uy - pts[v][1]);
                    if (dist < minDist[v]) minDist[v] = dist;
                }
            }
        }
        console.log(totalCost);
    }
} else { console.log(0); }
`,
    },
    editorial: {
      approach: "Prim's Minimum Spanning Tree Algorithm.",
      algorithm: '1. Maintain a min-heap or minDist array tracking minimum distance from visited MST components to unvisited vertices.\n2. In each iteration, greedily incorporate the closest unvisited vertex.\n3. Update neighbor distances using Manhattan metric.\n4. Output accumulated MST weight.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N)',
      content: "Dense Prim's algorithm runs in O(N^2) time on complete graphs without explicit edge sorting overhead.",
      referenceCode: `for step in range(N):\n    u = min(unvisited, key=lambda x: minDist[x])\n    total += minDist[u]\n    for v in unvisited: minDist[v] = min(minDist[v], manhattan(u, v))`,
    },
    tags: ['Graph', 'Minimum Spanning Tree'],
    testCases: [
      { input: `5\n0 0\n2 2\n3 10\n5 2\n7 0`, expectedOutput: `20`, isHidden: false, order: 0 },
      { input: `3\n3 12\n-2 5\n-4 1`, expectedOutput: `18`, isHidden: false, order: 1 },
      { input: `1\n0 0`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
];
