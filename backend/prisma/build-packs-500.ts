import * as fs from 'fs';
import * as path from 'path';

const PACK_DIR = path.join(__dirname, 'problem-packs');

// Helper to write pack
function writePack(fileName: string, varName: string, problems: any[]) {
  const filePath = path.join(PACK_DIR, fileName);
  const jsonStr = JSON.stringify(problems, null, 2).replace(/"difficulty": "(EASY|MEDIUM|HARD)"/g, 'difficulty: Difficulty.$1');
  const fileContent = `import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const ${varName}: ProblemDef[] = ${jsonStr};
`;
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`✓ Generated ${fileName} (${problems.length} problems)`);
}

// =========================================================================
// PACK B: Advanced Graph Theory & Network Flows
// =========================================================================
const packB = [
  {
    title: 'Edmonds-Karp Maximum Network Flow',
    slug: 'edmonds-karp-maximum-network-flow',
    description: `Given a directed flow network with \`n\` vertices, source \`s\`, sink \`t\`, and capacities \`edges = [[u, v, cap], ...]\`, compute the maximum flow from \`s\` to \`t\`.`,
    difficulty: 'HARD',
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
                if u == t:
                    aug = f
                    break
                for v in adj[u]:
                    if parent[v] == -1 and capacity[u][v] > 0:
                        parent[v] = u
                        queue.append((v, min(f, capacity[u][v])))
            if aug == 0:
                break
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
            capacity[u][v] += cap;
            adj[u].push(v);
            adj[v].push(u);
        }
        let flow = 0;
        while (true) {
            const parent = Array(n).fill(-1);
            parent[s] = s;
            const queue = [[s, Infinity]];
            let aug = 0;
            while (queue.length > 0) {
                const [u, f] = queue.shift();
                if (u === t) {
                    aug = f;
                    break;
                }
                for (const v of adj[u]) {
                    if (parent[v] === -1 && capacity[u][v] > 0) {
                        parent[v] = u;
                        queue.push([v, Math.min(f, capacity[u][v])]);
                    }
                }
            }
            if (aug === 0) break;
            flow += aug;
            let cur = t;
            while (cur !== s) {
                const p = parent[cur];
                capacity[p][cur] -= aug;
                capacity[cur][p] += aug;
                cur = p;
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
  {
    title: 'Parallel Courses III DAG DP',
    slug: 'parallel-courses-iii-dag-dp',
    description: `Given \`n\` courses labeled 1 to \`n\` with \`relations\` forming a DAG and course durations \`time\`, return minimum months to finish all courses taking independent courses in parallel.`,
    difficulty: 'HARD',
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
        queue = deque()
        for i in range(1, n + 1):
            if in_degree[i] == 0:
                dist[i] = time[i - 1]
                queue.append(i)
        while queue:
            u = queue.popleft()
            for v in adj[u]:
                if dist[u] + time[v - 1] > dist[v]:
                    dist[v] = dist[u] + time[v - 1]
                in_degree[v] -= 1
                if in_degree[v] == 0:
                    queue.append(v)
        return max(dist)`,
      javascript: `class Solution {
    minimumTime(n, relations, time) {
        const adj = Array.from({ length: n + 1 }, () => []);
        const inDegree = Array(n + 1).fill(0);
        for (const [u, v] of relations) {
            adj[u].push(v);
            inDegree[v]++;
        }
        const dist = Array(n + 1).fill(0);
        const queue = [];
        for (let i = 1; i <= n; i++) {
            if (inDegree[i] === 0) {
                dist[i] = time[i - 1];
                queue.push(i);
            }
        }
        while (queue.length > 0) {
            const u = queue.shift();
            for (const v of adj[u]) {
                if (dist[u] + time[v - 1] > dist[v]) {
                    dist[v] = dist[u] + time[v - 1];
                }
                inDegree[v]--;
                if (inDegree[v] === 0) {
                    queue.push(v);
                }
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
  {
    title: 'Snakes and Ladders BFS Shortest Path',
    slug: 'snakes-and-ladders-bfs-shortest-path',
    description: `Given an \`n x n\` board matrix with snake/ladder jumps (-1 for normal cell), return the least number of dice rolls to reach cell \`n^2\`, or -1 if impossible.`,
    difficulty: 'MEDIUM',
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
            if sq == target:
                return moves
            for dice in range(1, 7):
                nxt = sq + dice
                if nxt > target:
                    break
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
                    visited.add(dest);
                    queue.push([dest, moves + 1]);
                }
            }
        }
        return -1;
    }
}`,
    },
    editorial: {
      approach: 'BFS shortest path on game graph.',
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
  {
    title: 'Shortest Cycle in an Undirected Graph Girth',
    slug: 'shortest-cycle-in-an-undirected-graph-girth',
    description: `Given \`n\` nodes and undirected \`edges\`, return the length of the shortest cycle in the graph, or -1 if no cycle exists.`,
    difficulty: 'HARD',
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
            adj[u].append(v)
            adj[v].append(u)
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
                        dist[v] = dist[u] + 1
                        parent[v] = u
                        queue.append(v)
                    elif parent[u] != v:
                        ans = min(ans, dist[u] + dist[v] + 1)
        return ans if ans != float('inf') else -1`,
      javascript: `class Solution {
    findShortestCycle(n, edges) {
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }
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
                        dist[v] = dist[u] + 1;
                        parent[v] = u;
                        queue.push(v);
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
  {
    title: 'Bus Routes Multi-Source BFS',
    slug: 'bus-routes-multi-source-bfs',
    description: `Given bus \`routes\`, \`source\`, and \`target\`, return the least number of buses you must take to travel from \`source\` to \`target\`, or -1 if impossible.`,
    difficulty: 'HARD',
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
        if source == target:
            return 0
        from collections import defaultdict, deque
        stop_to_routes = defaultdict(list)
        for r_id, route in enumerate(routes):
            for stop in route:
                stop_to_routes[stop].append(r_id)
        visited_routes = set()
        visited_stops = {source}
        queue = deque([(source, 0)])
        while queue:
            stop, buses = queue.popleft()
            if stop == target:
                return buses
            for r_id in stop_to_routes[stop]:
                if r_id in visited_routes:
                    continue
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
                        visitedStops.add(nextStop);
                        queue.push([nextStop, buses + 1]);
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
  {
    title: 'Open the Lock Minimum Turns BFS',
    slug: 'open-the-lock-minimum-turns-bfs',
    description: `Given \`deadends\` and \`target\`, return the minimum turns to reach target on a 4-dial lock starting from "0000", or -1 if impossible.`,
    difficulty: 'MEDIUM',
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
        if '0000' in dead:
            return -1
        if target == '0000':
            return 0
        visited = {'0000'}
        queue = deque([('0000', 0)])
        while queue:
            state, turns = queue.popleft()
            if state == target:
                return turns
            for i in range(4):
                digit = int(state[i])
                for d in (-1, 1):
                    new_digit = (digit + d) % 10
                    nxt = state[:i] + str(new_digit) + state[i + 1:]
                    if nxt not in dead and nxt not in visited:
                        visited.add(nxt)
                        queue.append((nxt, turns + 1))
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
                        visited.add(nxt);
                        queue.push([nxt, turns + 1]);
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
    tags: ['Graph', 'Breadth-First Search', 'Hash Table'],
    testCases: [
      { input: `["0201","0101","0102","1212","2002"], "0202"`, expectedOutput: `6`, isHidden: false, order: 0 },
      { input: `["8888"], "0009"`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `["8887","8889","8878","8898","8788","8988","7888","9888"], "8888"`, expectedOutput: `-1`, isHidden: true, order: 2 },
    ],
  },
];

writePack('pack-500-part-b.ts', 'pack500PartBDefs', packB);
