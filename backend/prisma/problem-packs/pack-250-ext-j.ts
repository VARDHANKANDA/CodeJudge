import { Difficulty } from '@prisma/client';

export const pack250ExtJDefs = [
  {
    title: 'Eulerian Path in Directed Graph',
    slug: 'eulerian-path-directed-graph',
    description: `Given a directed multigraph with $n$ vertices labeled from $0$ to $n - 1$ and a list of directed edges $edges$ where $edges[i] = [u, v]$, find an Eulerian path that starts at vertex $0$ (or any valid starting vertex if $0$ has no edges) and visits every edge exactly once.

If multiple valid Eulerian paths exist, return the lexicographically smallest path when represented as a sequence of vertex IDs. If no Eulerian path exists, return an empty array.

### Constraints
- $1 \\le n \\le 1000$
- $1 \\le edges.length \\le 2000$
- $edges[i] = [u, v]$ where $0 \\le u, v < n$

### Input Format
- An integer $n$ and a 2D integer array $edges$.

### Output Format
- Return an array of vertex IDs representing the Eulerian path, or an empty array if none exists.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['graph', 'eulerian-circuit', 'dfs'],
    roadmapLevel: 5,
    roadmapTopic: 'advanced-graphs',
    templates: {
      python: `class Solution:\n    def findEulerianPath(self, n: int, edges: list[list[int]]) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    findEulerianPath(n, edges) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findEulerianPath(self, n: int, edges: list[list[int]]) -> list[int]:
        from collections import defaultdict
        
        in_deg = [0] * n
        out_deg = [0] * n
        adj = defaultdict(list)
        
        for u, v in edges:
            adj[u].append(v)
            out_deg[u] += 1
            in_deg[v] += 1
            
        start_nodes = 0
        end_nodes = 0
        start = -1
        
        for i in range(n):
            if out_deg[i] - in_deg[i] == 1:
                start_nodes += 1
                start = i
            elif in_deg[i] - out_deg[i] == 1:
                end_nodes += 1
            elif in_deg[i] != out_deg[i]:
                return []
                
        if not (start_nodes == 0 and end_nodes == 0) and not (start_nodes == 1 and end_nodes == 1):
            return []
            
        if start == -1:
            # find first node with outgoing edges
            for i in range(n):
                if out_deg[i] > 0:
                    start = i
                    break
            if start == -1:
                return []
                
        # Sort adjacency lists for lexicographical order (reverse sort for popping)
        for u in adj:
            adj[u].sort(reverse=True)
            
        # Hierholzer's algorithm
        stack = [start]
        path = []
        
        while stack:
            curr = stack[-1]
            if adj[curr]:
                nxt = adj[curr].pop()
                stack.append(nxt)
            else:
                path.append(stack.pop())
                
        path.reverse()
        if len(path) != len(edges) + 1:
            return []
        return path`,
      javascript: `class Solution {\n    findEulerianPath(n, edges) {\n        const inDeg = new Array(n).fill(0);\n        const outDeg = new Array(n).fill(0);\n        const adj = Array.from({ length: n }, () => []);\n        \n        for (const [u, v] of edges) {\n            adj[u].push(v);\n            outDeg[u]++;\n            inDeg[v]++;\n        }\n        \n        let startNodes = 0, endNodes = 0, start = -1;\n        for (let i = 0; i < n; i++) {\n            if (outDeg[i] - inDeg[i] === 1) {\n                startNodes++;\n                start = i;\n            } else if (inDeg[i] - outDeg[i] === 1) {\n                endNodes++;\n            } else if (inDeg[i] !== outDeg[i]) {\n                return [];\n            }\n        }\n        \n        if (!((startNodes === 0 && endNodes === 0) || (startNodes === 1 && endNodes === 1))) {\n            return [];\n        }\n        \n        if (start === -1) {\n            for (let i = 0; i < n; i++) {\n                if (outDeg[i] > 0) { start = i; break; }\n            }\n            if (start === -1) return [];\n        }\n        \n        for (let i = 0; i < n; i++) {\n            adj[i].sort((a, b) => b - a);\n        }\n        \n        const stack = [start];\n        const path = [];\n        \n        while (stack.length > 0) {\n            const curr = stack[stack.length - 1];\n            if (adj[curr].length > 0) {\n                stack.push(adj[curr].pop());\n            } else {\n                path.push(stack.pop());\n            }\n        }\n        \n        path.reverse();\n        return path.length === edges.length + 1 ? path : [];\n    }\n}`,
    },
    hints: [
      'An Eulerian path requires in_degree == out_degree for all vertices, or exactly one vertex with out_degree - in_degree = 1 (start) and one with in_degree - out_degree = 1 (end).',
      'Use Hierholzers algorithm to construct the Eulerian path in linear time.',
      'To achieve lexicographical order, sort neighbors in ascending order and pop from end in reverse.',
    ],
    editorial: `### Method Explanation
Hierholzer's algorithm:
1. Degree condition verification:
   - For an Eulerian circuit: $in\\_deg[u] == out\\_deg[u]$ for all $u$.
   - For an Eulerian path: exactly one node with $out - in = 1$ (start), exactly one with $in - out = 1$ (end), and all other nodes $in == out$.
2. Maintain a stack. At each step, follow untraversed edges greedily. When a node has no outgoing untraversed edges, add it to the path and backtrack.
3. Reverse the resulting path to obtain the correct traversal order.

### Complexity
- **Time Complexity:** $O(E \\log E + V)$ due to sorting adjacency lists.
- **Space Complexity:** $O(V + E)$.`,
    testCases: [
      { input: '4, [[0,1],[1,2],[2,3],[3,0]]', expectedOutput: '[0,1,2,3,0]', isHidden: false },
      { input: '3, [[0,1],[1,2],[2,0],[0,2],[2,1]]', expectedOutput: '[0,1,2,0,2,1]', isHidden: false },
      { input: '3, [[0,1],[1,2]]', expectedOutput: '[0,1,2]', isHidden: true },
      { input: '3, [[0,1],[0,2]]', expectedOutput: '[]', isHidden: true },
    ],
  },
  {
    title: 'Negative Cycle Detection Bellman Ford',
    slug: 'negative-cycle-detection-bellman-ford',
    description: `Given a directed weighted graph with $n$ vertices labeled $0$ to $n - 1$ and a list of directed edges $edges$ where $edges[i] = [u, v, w]$, determine whether the graph contains a negative-weight cycle reachable from any vertex.

Return $true$ if a negative weight cycle exists, otherwise return $false$.

### Constraints
- $1 \\le n \\le 500$
- $0 \\le edges.length \\le 2000$
- $-10^4 \\le w \\le 10^4$

### Input Format
- An integer $n$ and a 2D integer array $edges$.

### Output Format
- Return a boolean indicating whether a negative cycle exists.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['graph', 'shortest-path', 'bellman-ford'],
    roadmapLevel: 5,
    roadmapTopic: 'advanced-graphs',
    templates: {
      python: `class Solution:\n    def hasNegativeCycle(self, n: int, edges: list[list[int]]) -> bool:\n        pass`,
      javascript: `class Solution {\n    hasNegativeCycle(n, edges) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def hasNegativeCycle(self, n: int, edges: list[list[int]]) -> bool:
        # Distance array initialized to 0 to detect negative cycles anywhere in graph
        dist = [0] * n
        
        # Relax edges n - 1 times
        for _ in range(n - 1):
            updated = False
            for u, v, w in edges:
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    updated = True
            if not updated:
                return False
                
        # Check n-th relaxation
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                return True
        return False`,
      javascript: `class Solution {\n    hasNegativeCycle(n, edges) {\n        const dist = new Array(n).fill(0);\n        for (let iter = 0; iter < n - 1; iter++) {\n            let updated = false;\n            for (const [u, v, w] of edges) {\n                if (dist[u] + w < dist[v]) {\n                    dist[v] = dist[u] + w;\n                    updated = true;\n                }\n            }\n            if (!updated) return false;\n        }\n        for (const [u, v, w] of edges) {\n            if (dist[u] + w < dist[v]) return true;\n        }\n        return false;\n    }\n}`,
    },
    hints: [
      'Initialize all distances to 0 (equivalent to adding an auxiliary super source connected to all nodes with 0 weight).',
      'Relax all edges n - 1 times.',
      'If any edge can still be relaxed on the n-th step, a negative cycle exists.',
    ],
    editorial: `### Method Explanation
Bellman-Ford algorithm:
- Initializing $dist[v] = 0$ for all vertices handles disconnected components simultaneously.
- In a graph without negative cycles, shortest paths have at most $n - 1$ edges.
- If an edge $(u, v, w)$ can still be relaxed ($dist[u] + w < dist[v]$) on iteration $n$, there must exist a negative cycle.

### Complexity
- **Time Complexity:** $O(V \\cdot E)$.
- **Space Complexity:** $O(V)$.`,
    testCases: [
      { input: '3, [[0,1,1],[1,2,2],[2,0,-4]]', expectedOutput: 'true', isHidden: false },
      { input: '3, [[0,1,1],[1,2,2],[2,0,-2]]', expectedOutput: 'false', isHidden: false },
      { input: '4, [[0,1,1],[1,2,-1],[2,3,-1],[3,0,-1]]', expectedOutput: 'true', isHidden: true },
      { input: '2, [[0,1,5],[1,0,3]]', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Maximum Bipartite Matching',
    slug: 'maximum-bipartite-matching',
    description: `There are $m$ applicants and $n$ jobs. Each applicant is interested in a subset of jobs. You are given a 2D boolean array $grid$ of size $m \\times n$, where $grid[i][j] = true$ if applicant $i$ is qualified and interested in job $j$.

Each applicant can be assigned to at most one job, and each job can be assigned to at most one applicant.

Return the maximum number of applicants that can be assigned to jobs.

### Constraints
- $1 \\le m, n \\le 200$
- $grid[i][j]$ is boolean.

### Input Format
- A 2D boolean array $grid$.

### Output Format
- Return an integer representing the maximum cardinality matching.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['graph', 'dfs', 'maximum-flow'],
    roadmapLevel: 5,
    roadmapTopic: 'advanced-graphs',
    templates: {
      python: `class Solution:\n    def maxBipartiteMatching(self, grid: list[list[bool]]) -> int:\n        pass`,
      javascript: `class Solution {\n    maxBipartiteMatching(grid) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maxBipartiteMatching(self, grid: list[list[bool]]) -> int:
        m = len(grid)
        n = len(grid[0])
        
        # match_job[j] = applicant assigned to job j (-1 if unassigned)
        match_job = [-1] * n
        
        def bpm(u, visited):
            for v in range(n):
                if grid[u][v] and not visited[v]:
                    visited[v] = True
                    # If job v is not assigned OR previously assigned applicant can find alternative
                    if match_job[v] < 0 or bpm(match_job[v], visited):
                        match_job[v] = u
                        return True
            return False
            
        result = 0
        for u in range(m):
            visited = [False] * n
            if bpm(u, visited):
                result += 1
                
        return result`,
      javascript: `class Solution {\n    maxBipartiteMatching(grid) {\n        const m = grid.length;\n        const n = grid[0].length;\n        const matchJob = new Array(n).fill(-1);\n        \n        const bpm = (u, visited) => {\n            for (let v = 0; v < n; v++) {\n                if (grid[u][v] && !visited[v]) {\n                    visited[v] = true;\n                    if (matchJob[v] < 0 || bpm(matchJob[v], visited)) {\n                        matchJob[v] = u;\n                        return true;\n                    }\n                }\n            }\n            return false;\n        };\n        \n        let result = 0;\n        for (let u = 0; u < m; u++) {\n            const visited = new Array(n).fill(false);\n            if (bpm(u, visited)) result++;\n        }\n        return result;\n    }\n}`,
    },
    hints: [
      'This is the classical Maximum Cardinality Bipartite Matching (MCBM) problem.',
      'Use augmenting path algorithm (Kuhn\'s algorithm) via DFS.',
      'Time complexity is O(V * E).',
    ],
    editorial: `### Method Explanation
Kuhn's Algorithm for Maximum Bipartite Matching:
- Maintain an array $matchJob$ storing the current assignment for each job.
- For each applicant $u$, run a DFS trying to find an augmenting path:
  - If a job $v$ is free, assign it to $u$.
  - If job $v$ is already assigned to applicant $w$, recursively check if $w$ can be reassigned to another available job.
- If an augmenting path is found, increment the matching count.

### Complexity
- **Time Complexity:** $O(M \\cdot N^2)$.
- **Space Complexity:** $O(N)$ auxiliary stack and visited array.`,
    testCases: [
      { input: '[[true,true,false],[false,true,false],[false,false,true]]', expectedOutput: '3', isHidden: false },
      { input: '[[true,false],[true,false]]', expectedOutput: '1', isHidden: false },
      { input: '[[true,true,true],[true,true,true]]', expectedOutput: '2', isHidden: true },
      { input: '[[false,false],[false,false]]', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Strongly Connected Components Count',
    slug: 'strongly-connected-components-count',
    description: `Given a directed graph with $n$ vertices labeled $0$ to $n - 1$ and a list of directed edges $edges$, count the number of Strongly Connected Components (SCCs) in the graph.

A strongly connected component is a maximal subgraph where every vertex is reachable from any other vertex within that subgraph.

### Constraints
- $1 \\le n \\le 2000$
- $0 \\le edges.length \\le 5000$
- $edges[i] = [u, v]$ where $0 \\le u, v < n$

### Input Format
- An integer $n$ and a 2D integer array $edges$.

### Output Format
- Return the number of strongly connected components.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['graph', 'tarjan', 'scc'],
    roadmapLevel: 5,
    roadmapTopic: 'advanced-graphs',
    templates: {
      python: `class Solution:\n    def countSCC(self, n: int, edges: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    countSCC(n, edges) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `import sys
sys.setrecursionlimit(50000)

class Solution:
    def countSCC(self, n: int, edges: list[list[int]]) -> int:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            
        disc = [-1] * n
        low = [-1] * n
        in_stack = [False] * n
        stack = []
        timer = 0
        scc_count = 0
        
        def dfs(u):
            nonlocal timer, scc_count
            disc[u] = low[u] = timer
            timer += 1
            stack.append(u)
            in_stack[u] = True
            
            for v in adj[u]:
                if disc[v] == -1:
                    dfs(v)
                    low[u] = min(low[u], low[v])
                elif in_stack[v]:
                    low[u] = min(low[u], disc[v])
                    
            if low[u] == disc[u]:
                scc_count += 1
                while True:
                    top = stack.pop()
                    in_stack[top] = False
                    if top == u:
                        break
                        
        for i in range(n):
            if disc[i] == -1:
                dfs(i)
                
        return scc_count`,
      javascript: `class Solution {\n    countSCC(n, edges) {\n        const adj = Array.from({ length: n }, () => []);\n        for (const [u, v] of edges) {\n            adj[u].push(v);\n        }\n        const disc = new Array(n).fill(-1);\n        const low = new Array(n).fill(-1);\n        const inStack = new Array(n).fill(false);\n        const stack = [];\n        let timer = 0, sccCount = 0;\n        \n        const dfs = (u) => {\n            disc[u] = low[u] = timer++;\n            stack.push(u);\n            inStack[u] = true;\n            \n            for (const v of adj[u]) {\n                if (disc[v] === -1) {\n                    dfs(v);\n                    low[u] = Math.min(low[u], low[v]);\n                } else if (inStack[v]) {\n                    low[u] = Math.min(low[u], disc[v]);\n                }\n            }\n            \n            if (low[u] === disc[u]) {\n                sccCount++;\n                while (true) {\n                    const top = stack.pop();\n                    inStack[top] = false;\n                    if (top === u) break;\n                }\n            }\n        };\n        \n        for (let i = 0; i < n; i++) {\n            if (disc[i] === -1) dfs(i);\n        }\n        return sccCount;\n    }\n}`,
    },
    hints: [
      'Use Tarjan\'s or Kosaraju\'s algorithm for SCC finding.',
      'Maintain discovery times disc[u] and lowest link values low[u].',
      'When disc[u] == low[u], pop all nodes from the stack until u to form one SCC.',
    ],
    editorial: `### Method Explanation
Tarjan's algorithm computes SCCs in $O(V + E)$ using single DFS:
- Discovery time $disc[u]$ is recorded upon entry.
- $low[u]$ is the smallest discovery time reachable from $u$ via tree and back edges.
- When $low[u] == disc[u]$, node $u$ is the root of an SCC. All nodes above $u$ on the call stack belong to this SCC.

### Complexity
- **Time Complexity:** $O(V + E)$.
- **Space Complexity:** $O(V + E)$.`,
    testCases: [
      { input: '5, [[0,2],[2,1],[1,0],[0,3],[3,4]]', expectedOutput: '3', isHidden: false },
      { input: '4, [[0,1],[1,2],[2,3],[3,0]]', expectedOutput: '1', isHidden: false },
      { input: '3, []', expectedOutput: '3', isHidden: false },
      { input: '4, [[0,1],[1,0],[2,3],[3,2]]', expectedOutput: '2', isHidden: true },
    ],
  },
  {
    title: 'Minimum Cost to Connect All Points Prim',
    slug: 'min-cost-connect-points-prim',
    description: `You are given an array $points$ representing integer coordinates of some points on a 2D-plane, where $points[i] = [x_i, y_i]$.

The cost of connecting two points $[x_i, y_i]$ and $[x_j, y_j]$ is the Manhattan distance between them: $|x_i - x_j| + |y_i - y_j|$.

Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

### Constraints
- $1 \\le points.length \\le 1000$
- $-10^6 \\le x_i, y_i \\le 10^6$
- All pairs $(x_i, y_i)$ are distinct.

### Input Format
- A 2D integer array $points$.

### Output Format
- Return the minimum spanning tree total cost.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['graph', 'minimum-spanning-tree', 'greedy'],
    roadmapLevel: 5,
    roadmapTopic: 'advanced-graphs',
    templates: {
      python: `class Solution:\n    def minCostConnectPoints(self, points: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    minCostConnectPoints(points) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minCostConnectPoints(self, points: list[list[int]]) -> int:
        n = len(points)
        if n <= 1:
            return 0
            
        # Prim's algorithm with dense graph optimization O(V^2)
        min_dist = [float('inf')] * n
        min_dist[0] = 0
        visited = [False] * n
        total_cost = 0
        
        for _ in range(n):
            # Pick unvisited node with minimum distance
            u = -1
            best_d = float('inf')
            for i in range(n):
                if not visited[i] and min_dist[i] < best_d:
                    best_d = min_dist[i]
                    u = i
                    
            visited[u] = True
            total_cost += best_d
            
            # Update min_dist for all unvisited neighbors
            x1, y1 = points[u]
            for v in range(n):
                if not visited[v]:
                    x2, y2 = points[v]
                    d = abs(x1 - x2) + abs(y1 - y2)
                    if d < min_dist[v]:
                        min_dist[v] = d
                        
        return total_cost`,
      javascript: `class Solution {\n    minCostConnectPoints(points) {\n        const n = points.length;\n        if (n <= 1) return 0;\n        const minDist = new Array(n).fill(Infinity);\n        minDist[0] = 0;\n        const visited = new Array(n).fill(false);\n        let totalCost = 0;\n        \n        for (let step = 0; step < n; step++) {\n            let u = -1, bestD = Infinity;\n            for (let i = 0; i < n; i++) {\n                if (!visited[i] && minDist[i] < bestD) {\n                    bestD = minDist[i];\n                    u = i;\n                }\n            }\n            visited[u] = true;\n            totalCost += bestD;\n            const [x1, y1] = points[u];\n            for (let v = 0; v < n; v++) {\n                if (!visited[v]) {\n                    const [x2, y2] = points[v];\n                    const d = Math.abs(x1 - x2) + Math.abs(y1 - y2);\n                    if (d < minDist[v]) minDist[v] = d;\n                }\n            }\n        }\n        return totalCost;\n    }\n}`,
    },
    hints: [
      'Since this is a complete graph with V = 1000 nodes (E = 1,000,000 edges), Prim\'s algorithm in O(V^2) is faster than Kruskal\'s with heap.',
      'Maintain an array min_dist[v] tracking the minimum distance from the current MST component to vertex v.',
    ],
    editorial: `### Method Explanation
Prim's Algorithm for dense graphs:
- In a complete graph where $|E| = O(V^2)$, Prim's algorithm using an array lookup for the minimum edge takes $O(V^2)$ time and $O(V)$ auxiliary memory.
- At each step $k$, greedily select the vertex $u$ with minimum $min\\_dist[u]$, add it to the MST, and update $min\\_dist[v] = \\min(min\\_dist[v], \\text{dist}(u, v))$ for all remaining vertices.

### Complexity
- **Time Complexity:** $O(V^2)$.
- **Space Complexity:** $O(V)$.`,
    testCases: [
      { input: '[[0,0],[2,2],[3,10],[5,2],[7,0]]', expectedOutput: '20', isHidden: false },
      { input: '[[3,12],[-2,5],[-4,1]]', expectedOutput: '18', isHidden: false },
      { input: '[[0,0]]', expectedOutput: '0', isHidden: true },
      { input: '[[0,0],[1,1],[1,0],[-1,1]]', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: 'Network Delay Time Dijkstra',
    slug: 'network-delay-time-dijkstra',
    description: `You are given a network of $n$ nodes, labeled from $1$ to $n$. You are also given $times$, a list of travel times as directed edges $times[i] = (u_i, v_i, w_i)$, where $u_i$ is the source node, $v_i$ is the target node, and $w_i$ is the time it takes for a signal to travel from source to target.

We will send a signal from a given node $k$. Return the minimum time it takes for all the $n$ nodes to receive the signal. If it is impossible for all the $n$ nodes to receive the signal, return -1.

### Constraints
- $1 \\le k \\le n \\le 100$
- $1 \\le times.length \\le 6000$
- $times[i] = [u_i, v_i, w_i]$
- $1 \\le u_i, v_i \\le n$
- $0 \\le w_i \\le 100$
- All pairs $(u_i, v_i)$ are unique.

### Input Format
- A 2D integer array $times$, an integer $n$, and an integer $k$.

### Output Format
- Return the minimum time, or -1.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['graph', 'shortest-path', 'dijkstra'],
    roadmapLevel: 5,
    roadmapTopic: 'advanced-graphs',
    templates: {
      python: `class Solution:\n    def networkDelayTime(self, times: list[list[int]], n: int, k: int) -> int:\n        pass`,
      javascript: `class Solution {\n    networkDelayTime(times, n, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def networkDelayTime(self, times: list[list[int]], n: int, k: int) -> int:
        import heapq
        from collections import defaultdict
        
        adj = defaultdict(list)
        for u, v, w in times:
            adj[u].append((v, w))
            
        dist = {}
        pq = [(0, k)]
        
        while pq:
            d, u = heapq.heappop(pq)
            if u in dist:
                continue
            dist[u] = d
            for v, w in adj[u]:
                if v not in dist:
                    heapq.heappush(pq, (d + w, v))
                    
        if len(dist) < n:
            return -1
        return max(dist.values())`,
      javascript: `class Solution {\n    networkDelayTime(times, n, k) {\n        const adj = Array.from({ length: n + 1 }, () => []);\n        for (const [u, v, w] of times) {\n            adj[u].push([v, w]);\n        }\n        const dist = new Array(n + 1).fill(Infinity);\n        dist[k] = 0;\n        const visited = new Array(n + 1).fill(false);\n        \n        for (let iter = 0; iter < n; iter++) {\n            let u = -1, best = Infinity;\n            for (let i = 1; i <= n; i++) {\n                if (!visited[i] && dist[i] < best) {\n                    best = dist[i];\n                    u = i;\n                }\n            }\n            if (u === -1) break;\n            visited[u] = true;\n            for (const [v, w] of adj[u]) {\n                if (dist[u] + w < dist[v]) {\n                    dist[v] = dist[u] + w;\n                }\n            }\n        }\n        let maxTime = 0;\n        for (let i = 1; i <= n; i++) {\n            if (dist[i] === Infinity) return -1;\n            maxTime = Math.max(maxTime, dist[i]);\n        }\n        return maxTime;\n    }\n}`,
    },
    hints: [
      'This is a single-source shortest path problem on non-negative weighted directed graphs.',
      'Apply Dijkstra\'s algorithm starting from source node k.',
      'The answer is the maximum distance among all nodes from k. If any node remains unreachable, return -1.',
    ],
    editorial: `### Method Explanation
Dijkstra's Algorithm finds the shortest path from single source $k$ to all other nodes:
1. Initialize $dist[k] = 0$ and $dist[i] = \\infty$ for all other $i$.
2. Use a priority queue or linear scan to extract the minimum distance unvisited node.
3. Relax all outgoing neighbors.
4. If all nodes are reached, the signal propagation completion time is $\\max_{i=1}^n dist[i]$. Otherwise $-1$.

### Complexity
- **Time Complexity:** $O((V + E) \\log V)$ or $O(V^2 + E)$.
- **Space Complexity:** $O(V + E)$.`,
    testCases: [
      { input: '[[2,1,1],[2,3,1],[3,4,1]], 4, 2', expectedOutput: '2', isHidden: false },
      { input: '[[1,2,1]], 2, 1', expectedOutput: '1', isHidden: false },
      { input: '[[1,2,1]], 2, 2', expectedOutput: '-1', isHidden: false },
      { input: '[[1,2,1],[2,3,2],[1,3,4]], 3, 1', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Critical Connections Bridges in Graph',
    slug: 'critical-connections-bridges-graph',
    description: `There are $n$ servers numbered from $0$ to $n - 1$ connected by undirected server-to-server $connections$ forming a network where $connections[i] = [a, b]$ represents a connection between servers $a$ and $b$. Any server can reach other servers directly or indirectly through the network.

A critical connection (bridge) is a connection that, if removed, will make some servers unable to reach some other server.

Return all critical connections in the network in any order.

### Constraints
- $2 \\le n \\le 10^5$
- $n - 1 \\le connections.length \\le 10^5$
- $0 \\le a_i, b_i < n$, $a_i \\ne b_i$
- There are no repeated connections.

### Input Format
- An integer $n$ and a 2D integer array $connections$.

### Output Format
- Return a list of pairs $[a, b]$ representing critical connections.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['graph', 'tarjan', 'dfs'],
    roadmapLevel: 5,
    roadmapTopic: 'advanced-graphs',
    templates: {
      python: `class Solution:\n    def criticalConnections(self, n: int, connections: list[list[int]]) -> list[list[int]]:\n        pass`,
      javascript: `class Solution {\n    criticalConnections(n, connections) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `import sys
sys.setrecursionlimit(200000)

class Solution:
    def criticalConnections(self, n: int, connections: list[list[int]]) -> list[list[int]]:
        adj = [[] for _ in range(n)]
        for u, v in connections:
            adj[u].append(v)
            adj[v].append(u)
            
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
                        bridges.append([u, v])
                        
        for i in range(n):
            if disc[i] == -1:
                dfs(i, -1)
                
        return bridges`,
      javascript: `class Solution {\n    criticalConnections(n, connections) {\n        const adj = Array.from({ length: n }, () => []);\n        for (const [u, v] of connections) {\n            adj[u].push(v);\n            adj[v].push(u);\n        }\n        const disc = new Array(n).fill(-1);\n        const low = new Array(n).fill(-1);\n        let timer = 0;\n        const bridges = [];\n        \n        const dfs = (u, parent) => {\n            disc[u] = low[u] = timer++;\n            for (const v of adj[u]) {\n                if (v === parent) continue;\n                if (disc[v] !== -1) {\n                    low[u] = Math.min(low[u], disc[v]);\n                } else {\n                    dfs(v, u);\n                    low[u] = Math.min(low[u], low[v]);\n                    if (low[v] > disc[u]) {\n                        bridges.push([u, v]);\n                    }\n                }\n            }\n        };\n        \n        for (let i = 0; i < n; i++) {\n            if (disc[i] === -1) dfs(i, -1);\n        }\n        return bridges;\n    }\n}`,
    },
    hints: [
      'An edge (u, v) is a bridge if and only if there is no back-edge from the subtree rooted at v to u or any ancestor of u.',
      'Use Tarjan\'s bridge finding algorithm with low and disc arrays.',
      'Condition: low[v] > disc[u].',
    ],
    editorial: `### Method Explanation
Tarjan's Bridge-Finding Algorithm:
- In a DFS tree of an undirected connected graph, back edges allow subtrees to connect to higher ancestors.
- For each edge $(u, v)$ in the DFS tree:
  - If $low[v] > disc[u]$, node $v$ and its entire subtree have no back-edge reaching $u$ or any ancestor above $u$.
  - Therefore, removing $(u, v)$ disconnects $v$'s subtree from the rest of the graph, meaning $(u, v)$ is a bridge.

### Complexity
- **Time Complexity:** $O(V + E)$.
- **Space Complexity:** $O(V + E)$.`,
    testCases: [
      { input: '4, [[0,1],[1,2],[2,0],[1,3]]', expectedOutput: '[[1,3]]', isHidden: false },
      { input: '2, [[0,1]]', expectedOutput: '[[0,1]]', isHidden: false },
      { input: '5, [[0,1],[1,2],[2,3],[3,4],[4,0]]', expectedOutput: '[]', isHidden: true },
      { input: '6, [[0,1],[1,2],[2,0],[1,3],[3,4],[4,5],[5,3]]', expectedOutput: '[[1,3]]', isHidden: true },
    ],
  },
  {
    title: 'Find Eventual Safe States',
    slug: 'find-eventual-safe-states',
    description: `There is a directed graph of $n$ nodes with each node labeled from $0$ to $n - 1$. The graph is represented by a 0-indexed 2D integer array $graph$ where $graph[i]$ is an integer array of nodes adjacent to node $i$, meaning there is a directed edge from node $i$ to each node in $graph[i]$.

A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node).

Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

### Constraints
- $n == graph.length$
- $1 \\le n \\le 10^4$
- $0 \\le graph[i].length \\le n$
- $0 \\le graph[i][j] \\le n - 1$
- $graph[i]$ is sorted in a strictly increasing order.
- The graph may contain self-loops.

### Input Format
- A 2D integer array $graph$.

### Output Format
- Return a sorted array of safe node IDs.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['graph', 'dfs', 'topological-sort'],
    roadmapLevel: 5,
    roadmapTopic: 'advanced-graphs',
    templates: {
      python: `class Solution:\n    def eventualSafeNodes(self, graph: list[list[int]]) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    eventualSafeNodes(graph) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def eventualSafeNodes(self, graph: list[list[int]]) -> list[int]:
        n = len(graph)
        # 0 = unvisited, 1 = visiting (in recursion stack), 2 = safe
        color = [0] * n
        
        def is_safe(u):
            if color[u] != 0:
                return color[u] == 2
            color[u] = 1 # mark visiting
            for v in graph[u]:
                if not is_safe(v):
                    return False
            color[u] = 2 # mark safe
            return True
            
        res = []
        for i in range(n):
            if is_safe(i):
                res.append(i)
        return res`,
      javascript: `class Solution {\n    eventualSafeNodes(graph) {\n        const n = graph.length;\n        const color = new Array(n).fill(0);\n        \n        const isSafe = (u) => {\n            if (color[u] !== 0) return color[u] === 2;\n            color[u] = 1;\n            for (const v of graph[u]) {\n                if (!isSafe(v)) return false;\n            }\n            color[u] = 2;\n            return true;\n        };\n        \n        const res = [];\n        for (let i = 0; i < n; i++) {\n            if (isSafe(i)) res.push(i);\n        }\n        return res;\n    }\n}`,
    },
    hints: [
      'Nodes that can reach a cycle are unsafe; all other nodes are safe.',
      'Use 3-color DFS cycle detection: 0 = unvisited, 1 = in current path, 2 = confirmed safe.',
      'Alternatively, reverse the graph and perform Kahn\'s topological sort starting from terminal nodes.',
    ],
    editorial: `### Method Explanation
3-Color DFS state marking:
- Color 0: Node unvisited.
- Color 1: Node currently in recursion stack (visiting). Encountering another Color 1 node detects a directed cycle.
- Color 2: Node is safe (all paths from it terminate at safe nodes without loops).

If all children of $u$ lead to safe states, $u$ is marked safe ($2$).

### Complexity
- **Time Complexity:** $O(V + E)$.
- **Space Complexity:** $O(V)$.`,
    testCases: [
      { input: '[[1,2],[2,3],[5],[0],[5],[],[]]', expectedOutput: '[2,4,5,6]', isHidden: false },
      { input: '[[1,2,3,4],[1,2],[3,4],[0,4],[]]', expectedOutput: '[4]', isHidden: false },
      { input: '[[],[],[]]', expectedOutput: '[0,1,2]', isHidden: true },
      { input: '[[0]]', expectedOutput: '[]', isHidden: true },
    ],
  },
  {
    title: 'All Ancestors of a Node in a Directed Acyclic Graph',
    slug: 'ancestors-node-dag',
    description: `You are given a positive integer $n$ representing the number of nodes of a Directed Acyclic Graph (DAG) labeled from $0$ to $n - 1$ (inclusive). You are also given a 2D integer array $edges$, where $edges[i] = [u_i, v_i]$ denotes that there is a unidirectional edge from $u_i$ to $v_i$ in the graph.

Return a list $answer$, where $answer[i]$ is the list of ancestors of the $i$-th node, sorted in ascending order.

A node $u$ is an ancestor of $v$ if there exists a path from $u$ to $v$ in the graph.

### Constraints
- $1 \\le n \\le 1000$
- $0 \\le edges.length \\le \\min(2000, n \\cdot (n - 1) / 2)$
- $edges[i] = [u_i, v_i]$ where $0 \\le u_i, v_i < n$
- The graph is guaranteed to be a DAG.

### Input Format
- An integer $n$ and a 2D integer array $edges$.

### Output Format
- Return a 2D array where the $i$-th sub-array contains the sorted ancestors of node $i$.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['graph', 'dag', 'topological-sort', 'dfs'],
    roadmapLevel: 5,
    roadmapTopic: 'advanced-graphs',
    templates: {
      python: `class Solution:\n    def getAncestors(self, n: int, edges: list[list[int]]) -> list[list[int]]:\n        pass`,
      javascript: `class Solution {\n    getAncestors(n, edges) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def getAncestors(self, n: int, edges: list[list[int]]) -> list[list[int]]:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            
        res = [[] for _ in range(n)]
        
        # For each node i, do a DFS to find all nodes it can reach (i.e. i is ancestor to those nodes)
        for i in range(n):
            visited = [False] * n
            visited[i] = True
            stack = [i]
            while stack:
                curr = stack.pop()
                for nxt in adj[curr]:
                    if not visited[nxt]:
                        visited[nxt] = True
                        res[nxt].append(i)
                        stack.append(nxt)
                        
        return res`,
      javascript: `class Solution {\n    getAncestors(n, edges) {\n        const adj = Array.from({ length: n }, () => []);\n        for (const [u, v] of edges) {\n            adj[u].push(v);\n        }\n        const res = Array.from({ length: n }, () => []);\n        \n        for (let i = 0; i < n; i++) {\n            const visited = new Array(n).fill(false);\n            visited[i] = true;\n            const stack = [i];\n            while (stack.length > 0) {\n                const curr = stack.pop();\n                for (const nxt of adj[curr]) {\n                    if (!visited[nxt]) {\n                        visited[nxt] = true;\n                        res[nxt].push(i);\n                        stack.push(nxt);\n                    }\n                }\n            }\n        }\n        return res;\n    }\n}`,
    },
    hints: [
      'If you start a DFS from node i, every reachable node j has i as an ancestor.',
      'Since we iterate i from 0 to n - 1, ancestors will naturally be appended in strictly increasing order.',
    ],
    editorial: `### Method Explanation
Instead of searching backwards from each node, we do $N$ forward DFS traversals:
- For node $i = 0, 1, \\dots, n - 1$:
  - Run DFS from $i$.
  - For every node $v \\ne i$ reached by DFS, append $i$ to $res[v]$.
- Because $i$ increases monotonically, every $res[v]$ is automatically sorted with no duplicates.

### Complexity
- **Time Complexity:** $O(N \\cdot (V + E))$. For $N \\le 1000, E \\le 2000$, total ops $\\approx 3 \\times 10^6$.
- **Space Complexity:** $O(V + E)$.`,
    testCases: [
      { input: '8, [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]', expectedOutput: '[[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]]', isHidden: false },
      { input: '5, [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]', expectedOutput: '[[],[0],[0,1],[0,1,2],[0,1,2,3]]', isHidden: false },
      { input: '3, []', expectedOutput: '[[],[],[]]', isHidden: true },
    ],
  },
  {
    title: 'Is Graph Bipartite 2-Coloring',
    slug: 'is-graph-bipartite-2-coloring',
    description: `There is an undirected graph with $n$ nodes, where each node is numbered between $0$ and $n - 1$. You are given a 2D array $graph$, where $graph[u]$ is an array of nodes that node $u$ is adjacent to.

A graph is bipartite if the nodes can be partitioned into two independent sets $A$ and $B$ such that every edge in the graph connects a node in set $A$ and a node in set $B$.

Return $true$ if and only if it is bipartite.

### Constraints
- $graph.length == n$
- $1 \\le n \\le 100$
- $0 \\le graph[u].length < n$
- $0 \\le graph[u][i] \\le n - 1$
- The graph may not be connected.

### Input Format
- A 2D integer array $graph$.

### Output Format
- Return a boolean indicating whether the graph is bipartite.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['graph', 'bfs', 'dfs', 'bipartite'],
    roadmapLevel: 5,
    roadmapTopic: 'advanced-graphs',
    templates: {
      python: `class Solution:\n    def isBipartite(self, graph: list[list[int]]) -> bool:\n        pass`,
      javascript: `class Solution {\n    isBipartite(graph) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def isBipartite(self, graph: list[list[int]]) -> bool:
        n = len(graph)
        color = [-1] * n
        
        for i in range(n):
            if color[i] != -1:
                continue
            color[i] = 0
            queue = [i]
            for u in queue:
                for v in graph[u]:
                    if color[v] == -1:
                        color[v] = 1 - color[u]
                        queue.append(v)
                    elif color[v] == color[u]:
                        return False
        return True`,
      javascript: `class Solution {\n    isBipartite(graph) {\n        const n = graph.length;\n        const color = new Array(n).fill(-1);\n        \n        for (let i = 0; i < n; i++) {\n            if (color[i] !== -1) continue;\n            color[i] = 0;\n            const queue = [i];\n            let head = 0;\n            while (head < queue.length) {\n                const u = queue[head++];\n                for (const v of graph[u]) {\n                    if (color[v] === -1) {\n                        color[v] = 1 - color[u];\n                        queue.push(v);\n                    } else if (color[v] === color[u]) {\n                        return false;\n                    }\n                }\n            }\n        }\n        return true;\n    }\n}`,
    },
    hints: [
      'A graph is bipartite if and only if it contains no odd-length cycles.',
      'Perform BFS/DFS to 2-color the graph with colors 0 and 1.',
      'If two adjacent vertices have the same color, return false.',
    ],
    editorial: `### Method Explanation
2-Coloring via Breadth-First Search:
- For each connected component:
  - Assign color 0 to an unvisited root.
  - For each neighbor $v$ of $u$:
    - If $v$ is uncolored, assign color $1 - color[u]$ and push to queue.
    - If $v$ is already colored and $color[v] == color[u]$, the graph contains an odd cycle and is not bipartite.

### Complexity
- **Time Complexity:** $O(V + E)$.
- **Space Complexity:** $O(V)$.`,
    testCases: [
      { input: '[[1,2,3],[0,2],[0,1,3],[0,2]]', expectedOutput: 'false', isHidden: false },
      { input: '[[1,3],[0,2],[1,3],[0,2]]', expectedOutput: 'true', isHidden: false },
      { input: '[[]]', expectedOutput: 'true', isHidden: true },
      { input: '[[1],[0]]', expectedOutput: 'true', isHidden: true },
    ],
  },
];
