import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack500PartBDefs: ProblemDef[] = [
  // 1. Edmonds-Karp Maximum Network Flow
  {
    title: 'Edmonds-Karp Maximum Network Flow',
    slug: 'edmonds-karp-maximum-network-flow',
    description: `Given a directed flow network with \`n\` vertices, source \`s\`, sink \`t\`, and capacities \`edges = [[u, v, cap], ...]\`, compute the maximum flow from \`s\` to \`t\`.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `2 <= n <= 100\n0 <= edges.length <= 500\n0 <= s, t < n\ns != t\n1 <= cap <= 10^5`,
    inputFormat: `n, s, t, edges`,
    outputFormat: `An integer representing maximum flow.`,
    sampleInput: `4, 0, 3, [[0,1,10],[0,2,10],[1,2,2],[1,3,4],[2,3,9]]`,
    sampleOutput: `13`,
    points: 200,
    hints: ['Run BFS augmenting paths on residual graph.', 'Update residual capacities after each augmenting path.'],
    codeTemplates: {
      python: `class Solution:\n    def maxFlow(self, n: int, s: int, t: int, edges: list) -> int:\n        pass`,
      javascript: `class Solution {\n    maxFlow(n, s, t, edges) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return flow`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'Edmonds-Karp BFS Augmenting Paths.',
      algorithm: 'Repeatedly find shortest residual path using BFS and augment flow.',
      timeComplexity: 'O(V * E^2)',
      spaceComplexity: 'O(V^2)',
      content: 'Classic max-flow min-cut theorem implementation.',
      referenceCode: `while bfs_augment(): flow += aug`,
    },
    tags: ['Graph', 'Network Flow', 'Breadth-First Search'],
    testCases: [
      { input: `4, 0, 3, [[0,1,10],[0,2,10],[1,2,2],[1,3,4],[2,3,9]]`, expectedOutput: `13`, isHidden: false, order: 0 },
      { input: `2, 0, 1, [[0,1,5]]`, expectedOutput: `5`, isHidden: false, order: 1 },
      { input: `3, 0, 2, [[0,1,10],[1,2,0]]`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },

  // 2. Parallel Courses III
  {
    title: 'Parallel Courses III DAG DP',
    slug: 'parallel-courses-iii-dag-dp',
    description: `Given \`n\` courses labeled 1 to \`n\` with \`relations\` forming a DAG and course durations \`time\`, return minimum months to finish all courses taking independent courses in parallel.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 5 * 10^4\n0 <= relations.length <= 5 * 10^4\ntime.length == n\n1 <= time[i] <= 10^4`,
    inputFormat: `n, relations, time`,
    outputFormat: `An integer representing minimum months.`,
    sampleInput: `3, [[1,3],[2,3]], [3,2,5]`,
    sampleOutput: `8`,
    points: 200,
    hints: ['Compute in-degrees and maintain max finish time in topological sort order.'],
    codeTemplates: {
      python: `class Solution:\n    def minimumTime(self, n: int, relations: list, time: list) -> int:\n        pass`,
      javascript: `class Solution {\n    minimumTime(n, relations, time) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return max(dist)`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'Topological Sort with Longest Path DP on DAG.',
      algorithm: 'dist[v] = max(dist[v], dist[u] + time[v]) for all u -> v.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      content: 'Critical path method applied via Kahn\'s algorithm.',
      referenceCode: `dist[v] = max(dist[v], dist[u] + time[v])`,
    },
    tags: ['Graph', 'Dynamic Programming', 'Topological Sort'],
    testCases: [
      { input: `3, [[1,3],[2,3]], [3,2,5]`, expectedOutput: `8`, isHidden: false, order: 0 },
      { input: `5, [[1,5],[2,5],[3,5],[3,4],[4,5]], [1,2,3,4,5]`, expectedOutput: `12`, isHidden: false, order: 1 },
      { input: `1, [], [10]`, expectedOutput: `10`, isHidden: true, order: 2 },
    ],
  },

  // 3. Snakes and Ladders
  {
    title: 'Snakes and Ladders BFS Shortest Path',
    slug: 'snakes-and-ladders-bfs-shortest-path',
    description: `Given an \`n x n\` board matrix with snake/ladder jumps (-1 for normal cell), return the least number of dice rolls to reach cell \`n^2\`, or -1 if impossible.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `2 <= n <= 20\nboard[i][j] in {-1, 1..n^2}\nboard[n-1][0] == -1`,
    inputFormat: `board`,
    outputFormat: `An integer representing minimum rolls.`,
    sampleInput: `[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]`,
    sampleOutput: `4`,
    points: 150,
    hints: ['Map linear square index 1..n^2 to 2D matrix row/col.'],
    codeTemplates: {
      python: `class Solution:\n    def snakesAndLadders(self, board: list) -> int:\n        pass`,
      javascript: `class Solution {\n    snakesAndLadders(board) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return -1`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'BFS shortest path on game board.',
      algorithm: 'Map linear numbers to grid coords and run BFS.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N^2)',
      content: 'Single BFS from square 1 to N^2.',
      referenceCode: `queue.append((dest, moves + 1))`,
    },
    tags: ['Graph', 'Breadth-First Search', 'Matrix'],
    testCases: [
      { input: `[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `[[-1,-1],[-1,3]]`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]`, expectedOutput: `2`, isHidden: true, order: 2 },
    ],
  },

  // 4. Shortest Cycle in Undirected Graph
  {
    title: 'Shortest Cycle in an Undirected Graph Girth',
    slug: 'shortest-cycle-in-an-undirected-graph-girth',
    description: `Given \`n\` nodes and undirected \`edges\`, return the length of the shortest cycle in the graph, or -1 if no cycle exists.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `2 <= n <= 1000\n1 <= edges.length <= 1000`,
    inputFormat: `n, edges`,
    outputFormat: `An integer representing shortest cycle length.`,
    sampleInput: `7, [[0,1],[1,2],[2,0],[3,4],[4,5],[5,6],[6,3]]`,
    sampleOutput: `3`,
    points: 200,
    hints: ['Run BFS from each node to find shortest non-tree cycle.'],
    codeTemplates: {
      python: `class Solution:\n    def findShortestCycle(self, n: int, edges: list) -> int:\n        pass`,
      javascript: `class Solution {\n    findShortestCycle(n, edges) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return ans if ans != float('inf') else -1`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'Multi-source BFS for graph girth calculation.',
      algorithm: 'From each starting node, run BFS to identify shortest non-tree edge cycle.',
      timeComplexity: 'O(V * (V + E))',
      spaceComplexity: 'O(V + E)',
      content: 'Standard girth determination algorithm.',
      referenceCode: `ans = min(ans, dist[u] + dist[v] + 1)`,
    },
    tags: ['Graph', 'Breadth-First Search'],
    testCases: [
      { input: `7, [[0,1],[1,2],[2,0],[3,4],[4,5],[5,6],[6,3]]`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `4, [[0,1],[0,2]]`, expectedOutput: `-1`, isHidden: false, order: 1 },
      { input: `4, [[0,1],[1,2],[2,3],[3,0]]`, expectedOutput: `4`, isHidden: true, order: 2 },
    ],
  },

  // 5. Bus Routes Multi-Source BFS
  {
    title: 'Bus Routes Multi-Source BFS',
    slug: 'bus-routes-multi-source-bfs',
    description: `Given bus \`routes\`, \`source\`, and \`target\`, return the least number of buses you must take to travel from \`source\` to \`target\`, or -1 if impossible.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= routes.length <= 500\n1 <= routes[i].length <= 10^5\n0 <= source, target < 10^6`,
    inputFormat: `routes, source, target`,
    outputFormat: `An integer representing minimum buses.`,
    sampleInput: `[[1,2,7],[3,6,7]], 1, 6`,
    sampleOutput: `2`,
    points: 200,
    hints: ['Connect routes if they share a common stop and BFS across routes.'],
    codeTemplates: {
      python: `class Solution:\n    def numBusesToDestination(self, routes: list, source: int, target: int) -> int:\n        pass`,
      javascript: `class Solution {\n    numBusesToDestination(routes, source, target) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return -1`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'Bipartite BFS connecting bus stops and bus routes.',
      algorithm: 'Treat routes as vertices to optimize state search.',
      timeComplexity: 'O(sum(routes[i].length))',
      spaceComplexity: 'O(sum(routes[i].length))',
      content: 'Standard transit route optimization algorithm.',
      referenceCode: `visited_routes.add(r_id); queue.append((next_stop, buses + 1))`,
    },
    tags: ['Graph', 'Breadth-First Search', 'Hash Table'],
    testCases: [
      { input: `[[1,2,7],[3,6,7]], 1, 6`, expectedOutput: `2`, isHidden: false, order: 0 },
      { input: `[[7,12],[4,5,15],[6],[15,19],[9,12,13]], 15, 12`, expectedOutput: `-1`, isHidden: false, order: 1 },
      { input: `[[1,2,3]], 1, 1`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },

  // 6. Open the Lock
  {
    title: 'Open the Lock Minimum Turns BFS',
    slug: 'open-the-lock-minimum-turns-bfs',
    description: `Given \`deadends\` and \`target\`, return the minimum turns to reach target on a 4-dial lock starting from "0000", or -1 if impossible.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= deadends.length <= 500\ntarget.length == 4`,
    inputFormat: `deadends, target`,
    outputFormat: `An integer representing minimum turns.`,
    sampleInput: `["0201","0101","0102","1212","2002"], "0202"`,
    sampleOutput: `6`,
    points: 150,
    hints: ['Each lock position has 8 adjacent dial states.'],
    codeTemplates: {
      python: `class Solution:\n    def openLock(self, deadends: list, target: str) -> int:\n        pass`,
      javascript: `class Solution {\n    openLock(deadends, target) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return -1`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'State-space BFS on 10,000 combinations.',
      algorithm: '8-neighbor transition graph explored using BFS.',
      timeComplexity: 'O(10^4 * 8)',
      spaceComplexity: 'O(10^4)',
      content: 'Constant upper bound on states ensures fast execution.',
      referenceCode: `for d in (-1, 1): nxt = state[:i] + str((digit+d)%10) + state[i+1:]`,
    },
    tags: ['Graph', 'Breadth-First Search'],
    testCases: [
      { input: `["0201","0101","0102","1212","2002"], "0202"`, expectedOutput: `6`, isHidden: false, order: 0 },
      { input: `["8888"], "0009"`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `["8887","8889","8878","8898","8788","8988","7888","9888"], "8888"`, expectedOutput: `-1`, isHidden: true, order: 2 },
    ],
  },

  // 7. Kosaraju SCC Count
  {
    title: 'Kosaraju Strongly Connected Components Count',
    slug: 'kosaraju-strongly-connected-components-count',
    description: `Given a directed graph with n nodes (0 to n-1) and directed edges, return the number of strongly connected components.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= n <= 10^4\n0 <= edges.length <= 5*10^4`,
    inputFormat: `n, edges`,
    outputFormat: `An integer representing SCC count.`,
    sampleInput: `5, [[1,0],[0,2],[2,1],[0,3],[3,4]]`,
    sampleOutput: `3`,
    points: 150,
    hints: ['Pass 1: DFS recording order by exit time. Pass 2: DFS on reversed graph in decreasing exit order.'],
    codeTemplates: {
      python: `class Solution:\n    def countSCC(self, n: int, edges: list) -> int:\n        pass`,
      javascript: `class Solution {\n    countSCC(n, edges) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return scc_count`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'Kosaraju Two-Pass DFS Algorithm.',
      algorithm: 'Reversed graph SCC condensation.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      content: 'Standard Kosaraju algorithm.',
      referenceCode: `for u in reversed(order): if not vis[u]: dfs2(u); scc_count += 1`,
    },
    tags: ['Graph', 'Depth-First Search', 'Strongly Connected Components'],
    testCases: [
      { input: `5, [[1,0],[0,2],[2,1],[0,3],[3,4]]`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `4, [[0,1],[1,2],[2,3],[3,0]]`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `3, []`, expectedOutput: `3`, isHidden: true, order: 2 },
    ],
  },

  // 8. Path with Maximum Minimum Value
  {
    title: 'Path With Maximum Minimum Value',
    slug: 'path-with-maximum-minimum-value',
    description: `Given an m x n matrix of integers, find a path from (0,0) to (m-1,n-1) that maximizes the minimum value along the path.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= m, n <= 100`,
    inputFormat: `grid`,
    outputFormat: `An integer representing maximum bottleneck value.`,
    sampleInput: `[[5,4,5],[1,2,6],[7,4,6]]`,
    sampleOutput: `4`,
    points: 150,
    hints: ['Use a max-heap priority queue (Dijkstra variant).'],
    codeTemplates: {
      python: `class Solution:\n    def maximumMinimumPath(self, grid: list) -> int:\n        pass`,
      javascript: `class Solution {\n    maximumMinimumPath(grid) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return ans`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'Max-Heap Greedy Best-First Search.',
      algorithm: 'Priority traversal on bottle-neck values.',
      timeComplexity: 'O(M * N log(M * N))',
      spaceComplexity: 'O(M * N)',
      content: 'Modified Dijkstra for maximum bottleneck.',
      referenceCode: `ans = min(ans, val)`,
    },
    tags: ['Graph', 'Heap', 'Breadth-First Search'],
    testCases: [
      { input: `[[5,4,5],[1,2,6],[7,4,6]]`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `[[2,2,1,2,2,2],[1,2,2,2,1,2]]`, expectedOutput: `2`, isHidden: false, order: 1 },
      { input: `[[3,4,6,3,4],[0,2,1,1,7],[8,8,3,2,7],[3,2,4,9,8],[4,1,2,0,0],[4,6,5,4,3]]`, expectedOutput: `3`, isHidden: true, order: 2 },
    ],
  },

  // 9. Minimum Cost Walk With Bitwise AND
  {
    title: 'Minimum Cost Walk With Bitwise AND',
    slug: 'minimum-cost-walk-with-bitwise-and',
    description: `Given n nodes, weighted undirected edges, and query pairs [src, dst], return the min bitwise AND sum of walk for each query, or -1 if unreachable.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n <= 10^5, edges <= 10^5`,
    inputFormat: `n, edges, query`,
    outputFormat: `A list of integers.`,
    sampleInput: `5, [[0,1,7],[1,3,7],[1,2,1]], [[0,3],[3,4]]`,
    sampleOutput: `[7,-1]`,
    points: 150,
    hints: ['Every reachable edge in connected component can be traversed; cost is component-wide bitwise AND.'],
    codeTemplates: {
      python: `class Solution:\n    def minimumCost(self, n: int, edges: list, query: list) -> list:\n        pass`,
      javascript: `class Solution {\n    minimumCost(n, edges, query) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return res`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'Disjoint Set Union with Bitwise AND Monoid.',
      algorithm: 'Component-wide bitwise AND reduction.',
      timeComplexity: 'O(N + E + Q)',
      spaceComplexity: 'O(N)',
      content: 'DSU component aggregation.',
      referenceCode: `comp_and[root_j] &= comp_and[root_i] & w`,
    },
    tags: ['Graph', 'Union Find', 'Bit Manipulation'],
    testCases: [
      { input: `5, [[0,1,7],[1,3,7],[1,2,1]], [[0,3],[3,4]]`, expectedOutput: `[7,-1]`, isHidden: false, order: 0 },
      { input: `3, [[0,2,7],[0,1,15],[1,2,6],[1,2,1]], [[1,2]]`, expectedOutput: `[0]`, isHidden: false, order: 1 },
      { input: `1, [], [[0,0]]`, expectedOutput: `[0]`, isHidden: true, order: 2 },
    ],
  },

  // 10. Reconstruct Itinerary
  {
    title: 'Reconstruct Itinerary Eulerian Path',
    slug: 'reconstruct-itinerary-eulerian-path',
    description: `Given airline tickets from JFK, reconstruct itinerary in lexicographically smallest order using all tickets.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `tickets <= 300`,
    inputFormat: `tickets`,
    outputFormat: `A list of strings.`,
    sampleInput: `[["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]`,
    sampleOutput: `["JFK","MUC","LHR","SFO","SJC"]`,
    points: 200,
    hints: ['Hierholzer algorithm for Eulerian path.'],
    codeTemplates: {
      python: `class Solution:\n    def findItinerary(self, tickets: list) -> list:\n        pass`,
      javascript: `class Solution {\n    findItinerary(tickets) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return itinerary[::-1]`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'Hierholzer Algorithm for Eulerian Path.',
      algorithm: 'Post-order DFS on multigraph.',
      timeComplexity: 'O(E log E)',
      spaceComplexity: 'O(V + E)',
      content: 'Eulerian path construction.',
      referenceCode: `while adj[u]: dfs(adj[u].pop()); itinerary.append(u)`,
    },
    tags: ['Graph', 'Eulerian Circuit', 'Depth-First Search'],
    testCases: [
      { input: `[["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]`, expectedOutput: `["JFK","MUC","LHR","SFO","SJC"]`, isHidden: false, order: 0 },
      { input: `[["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]`, expectedOutput: `["JFK","ATL","JFK","SFO","ATL","SFO"]`, isHidden: false, order: 1 },
      { input: `[["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]]`, expectedOutput: `["JFK","NRT","JFK","KUL"]`, isHidden: true, order: 2 },
    ],
  },

  // 11. Reachable Nodes in Subdivided Graph
  {
    title: 'Reachable Nodes in Subdivided Graph',
    slug: 'reachable-nodes-in-subdivided-graph',
    description: `Given graph where edge [u, v, cnt] has cnt subdivision nodes inserted, return total reachable nodes from 0 within maxMoves.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n <= 3000, maxMoves <= 10^9`,
    inputFormat: `edges, maxMoves, n`,
    outputFormat: `An integer representing total reachable nodes.`,
    sampleInput: `[[0,1,10],[0,2,1],[1,2,2]], 6, 3`,
    sampleOutput: `13`,
    points: 200,
    hints: ['Dijkstra to find shortest distance to original nodes, then count intermediate nodes.'],
    codeTemplates: {
      python: `class Solution:\n    def reachableNodes(self, edges: list, maxMoves: int, n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    reachableNodes(edges, maxMoves, n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return ans`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'Dijkstra on Subdivided Edge Graph.',
      algorithm: 'Shortest paths + interval overlap counting.',
      timeComplexity: 'O(E log V)',
      spaceComplexity: 'O(V + E)',
      content: 'Shortest path boundary mapping.',
      referenceCode: `ans += min(cnt, moves_u + moves_v)`,
    },
    tags: ['Graph', 'Shortest Path', 'Heap'],
    testCases: [
      { input: `[[0,1,10],[0,2,1],[1,2,2]], 6, 3`, expectedOutput: `13`, isHidden: false, order: 0 },
      { input: `[[0,1,4],[1,2,6],[0,2,8],[1,3,1]], 10, 4`, expectedOutput: `23`, isHidden: false, order: 1 },
      { input: `[[1,2,5]], 100, 3`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },

  // 12. Minimum Number of Visited Cells in Grid
  {
    title: 'Minimum Number of Visited Cells in a Grid',
    slug: 'minimum-number-of-visited-cells-in-a-grid',
    description: `Given m x n grid where grid[i][j] is max forward jump in row/col, return min cells visited from (0,0) to (m-1,n-1), or -1.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `m*n <= 10^5`,
    inputFormat: `grid`,
    outputFormat: `An integer representing min visited cells.`,
    sampleInput: `[[3,4,2,1],[4,2,3,1],[2,1,0,0],[2,4,0,0]]`,
    sampleOutput: `4`,
    points: 200,
    hints: ['BFS with row/col unvisited index skips.'],
    codeTemplates: {
      python: `class Solution:\n    def minimumVisitedCells(self, grid: list) -> int:\n        pass`,
      javascript: `class Solution {\n    minimumVisitedCells(grid) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return dist[m - 1][n - 1]`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'Fast DSU-jump BFS on Grid intervals.',
      algorithm: 'Skipping visited segments in O(alpha(N)) amortized.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(M * N)',
      content: 'Efficient cell skipping.',
      referenceCode: `row_next[r][nc] = get_next(row_next[r], max_c + 1)`,
    },
    tags: ['Graph', 'Breadth-First Search', 'Union Find'],
    testCases: [
      { input: `[[3,4,2,1],[4,2,3,1],[2,1,0,0],[2,4,0,0]]`, expectedOutput: `4`, isHidden: false, order: 0 },
      { input: `[[3,4,2,1],[4,2,1,1],[2,1,1,0],[2,4,1,0]]`, expectedOutput: `3`, isHidden: false, order: 1 },
      { input: `[[0]]`, expectedOutput: `1`, isHidden: true, order: 2 },
    ],
  },

  // 13. Critical and Pseudo-Critical Edges
  {
    title: 'Critical and Pseudo-Critical Edges in MST',
    slug: 'critical-and-pseudo-critical-edges-in-mst',
    description: `Given n nodes and weighted edges, return two lists: indices of critical edges and pseudo-critical edges in MST.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n <= 100, edges <= 200`,
    inputFormat: `n, edges`,
    outputFormat: `A list of two lists of integers.`,
    sampleInput: `5, [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]`,
    sampleOutput: `[[0,1],[2,3,4,5]]`,
    points: 200,
    hints: ['Run Kruskal excluding edge for critical, and forcing edge for pseudo-critical.'],
    codeTemplates: {
      python: `class Solution:\n    def findCriticalAndPseudoCriticalEdges(self, n: int, edges: list) -> list:\n        pass`,
      javascript: `class Solution {\n    findCriticalAndPseudoCriticalEdges(n, edges) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return [critical, pseudo]`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'Kruskal MST Edge Classification.',
      algorithm: 'Excluded vs Forced MST comparisons.',
      timeComplexity: 'O(E^2 log E)',
      spaceComplexity: 'O(V + E)',
      content: 'Critical and pseudo-critical classification.',
      referenceCode: `if mst_weight(exclude=i) > base_mst: critical.append(i)`,
    },
    tags: ['Graph', 'Minimum Spanning Tree', 'Union Find'],
    testCases: [
      { input: `5, [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]`, expectedOutput: `[[0,1],[2,3,4,5]]`, isHidden: false, order: 0 },
      { input: `4, [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]`, expectedOutput: `[[],[0,1,2,3]]`, isHidden: false, order: 1 },
      { input: `2, [[0,1,1]]`, expectedOutput: `[[0],[]]`, isHidden: true, order: 2 },
    ],
  },

  // 14. Second Minimum Time to Reach Destination
  {
    title: 'Second Minimum Time to Reach Destination',
    slug: 'second-minimum-time-to-reach-destination',
    description: `Given undirected graph, edge time, and traffic signal change interval change, return the second strictly minimum time from 1 to n.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n <= 10^4, edges <= 2*10^4`,
    inputFormat: `n, edges, time, change`,
    outputFormat: `An integer representing second minimum time.`,
    sampleInput: `5, [[1,2],[1,3],[1,4],[3,4],[4,5]], 3, 5`,
    sampleOutput: `13`,
    points: 200,
    hints: ['BFS tracking two shortest visit times for each vertex.'],
    codeTemplates: {
      python: `class Solution:\n    def secondMinimum(self, n: int, edges: list, time: int, change: int) -> int:\n        pass`,
      javascript: `class Solution {\n    secondMinimum(n, edges, time, change) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return dist2[n]`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'Two-Distance BFS with Traffic Signal Periods.',
      algorithm: 'Tracking first and strictly second shortest paths.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      content: 'Multi-state BFS.',
      referenceCode: `dist2[v] = nxt_time; queue.append((v, nxt_time))`,
    },
    tags: ['Graph', 'Breadth-First Search', 'Shortest Path'],
    testCases: [
      { input: `5, [[1,2],[1,3],[1,4],[3,4],[4,5]], 3, 5`, expectedOutput: `13`, isHidden: false, order: 0 },
      { input: `2, [[1,2]], 3, 2`, expectedOutput: `11`, isHidden: false, order: 1 },
      { input: `3, [[1,2],[2,3],[1,3]], 2, 3`, expectedOutput: `8`, isHidden: true, order: 2 },
    ],
  },

  // 15. Frog Position After T Seconds
  {
    title: 'Frog Position After T Seconds',
    slug: 'frog-position-after-t-seconds',
    description: `Given tree with n vertices rooted at 1, return probability that frog is at target after exactly t seconds.`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n <= 100, t <= 50`,
    inputFormat: `n, edges, t, target`,
    outputFormat: `A float representing probability.`,
    sampleInput: `7, [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], 2, 4`,
    sampleOutput: `0.16666666666666666`,
    points: 200,
    hints: ['BFS/DFS tracking probability of current vertex state.'],
    codeTemplates: {
      python: `class Solution:\n    def frogPosition(self, n: int, edges: list, t: int, target: int) -> float:\n        pass`,
      javascript: `class Solution {\n    frogPosition(n, edges, t, target) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return 0.0`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'Probabilistic Tree BFS Traversal.',
      algorithm: 'Step-by-step state probability division.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Probability propagation across branching vertices.',
      referenceCode: `p_branch = prob / len(unvis_neighbors)`,
    },
    tags: ['Graph', 'Tree', 'Breadth-First Search', 'Probability'],
    testCases: [
      { input: `7, [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], 2, 4`, expectedOutput: `0.16666666666666666`, isHidden: false, order: 0 },
      { input: `7, [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], 1, 7`, expectedOutput: `0.3333333333333333`, isHidden: false, order: 1 },
      { input: `1, [], 1, 1`, expectedOutput: `1.0`, isHidden: true, order: 2 },
    ],
  },

  // 16. Two-Satisfiability
  {
    title: 'Two-Satisfiability Boolean Formula 2-SAT',
    slug: 'two-satisfiability-boolean-formula-2-sat',
    description: `Given n variables and 2-CNF clauses [[u, v], ...], return true if satisfiable (where negative integer means negation).`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n <= 10^4, clauses <= 5*10^4`,
    inputFormat: `n, clauses`,
    outputFormat: `Boolean true or false.`,
    sampleInput: `3, [[1,2],[-1,3],[-2,-3]]`,
    sampleOutput: `true`,
    points: 200,
    hints: ['Build implication graph (A or B => not A -> B, not B -> A) and check if x and not x share an SCC.'],
    codeTemplates: {
      python: `class Solution:\n    def solve2SAT(self, n: int, clauses: list) -> bool:\n        pass`,
      javascript: `class Solution {\n    solve2SAT(n, clauses) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def solve2SAT(self, n: int, clauses: list) -> bool:
        def node_id(lit):
            if lit > 0: return 2 * (lit - 1)
            return 2 * (-lit - 1) + 1
        def neg_id(lit):
            return node_id(-lit)
        size = 2 * n
        adj = [[] for _ in range(size)]
        radj = [[] for _ in range(size)]
        for u, v in clauses:
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
        return True`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: '2-SAT via Strongly Connected Components.',
      algorithm: 'Implication graph 2-coloring satisfiability.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      content: 'Kosaraju/Tarjan on implication graph.',
      referenceCode: `if comp[node_id(i)] == comp[node_id(-i)]: return False`,
    },
    tags: ['Graph', 'Strongly Connected Components', '2-SAT'],
    testCases: [
      { input: `3, [[1,2],[-1,3],[-2,-3]]`, expectedOutput: `true`, isHidden: false, order: 0 },
      { input: `1, [[1,1],[-1,-1]]`, expectedOutput: `false`, isHidden: false, order: 1 },
      { input: `2, [[1,2],[-1,2],[1,-2],[-1,-2]]`, expectedOutput: `false`, isHidden: true, order: 2 },
    ],
  },

  // 17. Count 2-Edge-Connected Components
  {
    title: 'Count 2-Edge-Connected Components',
    slug: 'count-2-edge-connected-components',
    description: `Given n vertices and undirected edges, return count of 2-edge-connected components (connected after removing all bridges).`,
    difficulty: Difficulty.HARD,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n <= 10^4, edges <= 5*10^4`,
    inputFormat: `n, edges`,
    outputFormat: `An integer representing component count.`,
    sampleInput: `5, [[0,1],[1,2],[2,0],[1,3],[3,4]]`,
    sampleOutput: `3`,
    points: 200,
    hints: ['Tarjan bridge detection, then run DSU/BFS on non-bridge edges.'],
    codeTemplates: {
      python: `class Solution:\n    def count2EdgeConnected(self, n: int, edges: list) -> int:\n        pass`,
      javascript: `class Solution {\n    count2EdgeConnected(n, edges) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return comp_count`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'Tarjan Bridges + DSU Component Condensation.',
      algorithm: '2-edge-connected components grouping.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      content: 'Bridge extraction and DSU contraction.',
      referenceCode: `if low[v] > tin[u]: bridges.add(e_idx)`,
    },
    tags: ['Graph', 'Depth-First Search', 'Bridges', 'Union Find'],
    testCases: [
      { input: `5, [[0,1],[1,2],[2,0],[1,3],[3,4]]`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `3, [[0,1],[1,2],[2,0]]`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `4, [[0,1],[2,3]]`, expectedOutput: `4`, isHidden: true, order: 2 },
    ],
  },

  // 18. Konig Bipartite Minimum Vertex Cover
  {
    title: 'Konig Bipartite Minimum Vertex Cover Size',
    slug: 'konig-bipartite-minimum-vertex-cover-size',
    description: `Given bipartite graph with L left nodes (0..L-1), R right nodes (0..R-1), and edges, return minimum vertex cover size.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `L, R <= 500, edges <= 2000`,
    inputFormat: `L, R, edges`,
    outputFormat: `An integer representing min vertex cover.`,
    sampleInput: `3, 3, [[0,0],[0,1],[1,1],[1,2],[2,2]]`,
    sampleOutput: `3`,
    points: 150,
    hints: ['By König\'s theorem, minimum vertex cover size equals maximum bipartite matching size.'],
    codeTemplates: {
      python: `class Solution:\n    def minVertexCover(self, L: int, R: int, edges: list) -> int:\n        pass`,
      javascript: `class Solution {\n    minVertexCover(L, R, edges) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return max_matching`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'Konig Theorem Maximum Matching.',
      algorithm: 'Bipartite vertex cover duality.',
      timeComplexity: 'O(V * E)',
      spaceComplexity: 'O(V + E)',
      content: 'König\'s theorem implementation via augmenting paths.',
      referenceCode: `if match[v] == -1 or dfs(match[v], visited): match[v] = u; return True`,
    },
    tags: ['Graph', 'Bipartite Matching', 'Konig Theorem'],
    testCases: [
      { input: `3, 3, [[0,0],[0,1],[1,1],[1,2],[2,2]]`, expectedOutput: `3`, isHidden: false, order: 0 },
      { input: `2, 2, [[0,0],[0,1],[1,0],[1,1]]`, expectedOutput: `2`, isHidden: false, order: 1 },
      { input: `1, 1, []`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },

  // 19. Disjoint Set Minimum Spanning Forest
  {
    title: 'Disjoint Set Minimum Spanning Forest Cost',
    slug: 'disjoint-set-minimum-spanning-forest-cost',
    description: `Given n vertices and weighted edges, return total weight of minimum spanning forest.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `n <= 10^4, edges <= 5*10^4`,
    inputFormat: `n, edges`,
    outputFormat: `An integer representing forest weight.`,
    sampleInput: `5, [[0,1,1],[1,2,2],[3,4,4]]`,
    sampleOutput: `7`,
    points: 150,
    hints: ['Kruskal algorithm on disconnected components.'],
    codeTemplates: {
      python: `class Solution:\n    def minSpanningForest(self, n: int, edges: list) -> int:\n        pass`,
      javascript: `class Solution {\n    minSpanningForest(n, edges) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
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
        return total_weight`,
      javascript: `class Solution {
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
}`,
    },
    editorial: {
      approach: 'Kruskal Minimum Spanning Forest.',
      algorithm: 'Greedy DSU edge collection.',
      timeComplexity: 'O(E log E)',
      spaceComplexity: 'O(V)',
      content: 'Kruskal\'s algorithm applied across multiple components.',
      referenceCode: `if ru != rv: parent[ru] = rv; total_weight += w`,
    },
    tags: ['Graph', 'Minimum Spanning Tree', 'Union Find'],
    testCases: [
      { input: `5, [[0,1,1],[1,2,2],[3,4,4]]`, expectedOutput: `7`, isHidden: false, order: 0 },
      { input: `4, [[0,1,10],[1,2,5],[2,0,7],[2,3,1]]`, expectedOutput: `7`, isHidden: false, order: 1 },
      { input: `3, []`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
];
