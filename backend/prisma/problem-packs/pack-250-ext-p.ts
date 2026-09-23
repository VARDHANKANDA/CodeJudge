import { Difficulty } from '@prisma/client';

export const pack250ExtPDefs = [
  {
    title: 'Median of Two Sorted Arrays Logarithmic',
    slug: 'median-two-sorted-arrays-logarithmic',
    description: `Given two sorted arrays $nums1$ and $nums2$ of size $m$ and $n$ respectively, return the median of the two sorted arrays.

The overall run time complexity should be $O(\\log(m + n))$.

### Constraints
- $nums1.length == m$
- $nums2.length == n$
- $0 \\le m \\le 1000$
- $0 \\le n \\le 1000$
- $1 \\le m + n \\le 2000$
- $-10^6 \\le nums1[i], nums2[i] \\le 10^6$

### Input Format
- Two sorted integer arrays $nums1$ and $nums2$.

### Output Format
- Return the float median (rounded to 5 decimal places if fractional).`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['binary-search', 'divide-and-conquer', 'array'],
    roadmapLevel: 1,
    roadmapTopic: 'binary-search',
    templates: {
      python: `class Solution:\n    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:\n        pass`,
      javascript: `class Solution {\n    findMedianSortedArrays(nums1, nums2) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:
        A, B = nums1, nums2
        if len(A) > len(B):
            A, B = B, A
            
        m, n = len(A), len(B)
        total = m + n
        half = (total + 1) // 2
        
        l, r = 0, m
        while l <= r:
            i = (l + r) // 2
            j = half - i
            
            A_left = A[i - 1] if i > 0 else float('-inf')
            A_right = A[i] if i < m else float('inf')
            B_left = B[j - 1] if j > 0 else float('-inf')
            B_right = B[j] if j < n else float('inf')
            
            if A_left <= B_right and B_left <= A_right:
                if total % 2 == 1:
                    return float(max(A_left, B_left))
                return (max(A_left, B_left) + min(A_right, B_right)) / 2.0
            elif A_left > B_right:
                r = i - 1
            else:
                l = i + 1
                
        return 0.0`,
      javascript: `class Solution {\n    findMedianSortedArrays(nums1, nums2) {\n        let A = nums1, B = nums2;\n        if (A.length > B.length) {\n            A = nums2;\n            B = nums1;\n        }\n        \n        const m = A.length, n = B.length;\n        const total = m + n;\n        const half = Math.floor((total + 1) / 2);\n        \n        let l = 0, r = m;\n        while (l <= r) {\n            const i = Math.floor((l + r) / 2);\n            const j = half - i;\n            \n            const ALeft = i > 0 ? A[i - 1] : -Infinity;\n            const ARight = i < m ? A[i] : Infinity;\n            const BLeft = j > 0 ? B[j - 1] : -Infinity;\n            const BRight = j < n ? B[j] : Infinity;\n            \n            if (ALeft <= BRight && BLeft <= ARight) {\n                if (total % 2 === 1) {\n                    return Math.max(ALeft, BLeft);\n                }\n                return (Math.max(ALeft, BLeft) + Math.min(ARight, BRight)) / 2.0;\n            } else if (ALeft > BRight) {\n                r = i - 1;\n            } else {\n                l = i + 1;\n            }\n        }\n        return 0.0;\n    }\n}`,
    },
    hints: [
      'Binary search on the partition index of the smaller array.',
      'Ensure that max(leftA, leftB) <= min(rightA, rightB).',
    ],
    editorial: `### Method Explanation
Binary Search on Partition:
- Partition both arrays such that the combined left half contains $\\lfloor (m + n + 1) / 2 \\rfloor$ elements.
- We binary search the partition index $i \\in [0, m]$ in the smaller array $A$.
- Let $j = half - i$.
- The partition is valid when $A[i-1] \\le B[j]$ and $B[j-1] \\le A[i]$.

### Complexity
- **Time Complexity:** $O(\\log(\\min(m, n)))$.
- **Space Complexity:** $O(1)$.`,
    testCases: [
      { input: '[1,3], [2]', expectedOutput: '2.0', isHidden: false },
      { input: '[1,2], [3,4]', expectedOutput: '2.5', isHidden: false },
      { input: '[], [1]', expectedOutput: '1.0', isHidden: false },
      { input: '[0,0], [0,0]', expectedOutput: '0.0', isHidden: true },
      { input: '[100001], [100000]', expectedOutput: '100000.5', isHidden: true },
    ],
  },
  {
    title: 'Alien Dictionary Topological Sort',
    slug: 'alien-dictionary-topological-sort',
    description: `There is a new alien language that uses the English alphabet. However, the order among letters is unknown to you.

You are given a list of strings $words$ from the alien language's dictionary, where the strings are sorted lexicographically by the rules of this new language.

Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return \`""\`. If there are multiple solutions, return any of them.

### Constraints
- $1 \\le words.length \\le 100$
- $1 \\le words[i].length \\le 100$
- $words[i]$ consists of only lowercase English letters.

### Input Format
- An array of strings $words$.

### Output Format
- Return a string of characters in alien topological order or empty string.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['graph', 'topological-sort', 'string'],
    roadmapLevel: 5,
    roadmapTopic: 'advanced-graphs',
    templates: {
      python: `class Solution:\n    def alienOrder(self, words: list[str]) -> str:\n        pass`,
      javascript: `class Solution {\n    alienOrder(words) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def alienOrder(self, words: list[str]) -> str:
        from collections import defaultdict, deque
        
        adj = defaultdict(set)
        in_degree = {ch: 0 for w in words for ch in w}
        
        for i in range(len(words) - 1):
            w1, w2 = words[i], words[i + 1]
            min_len = min(len(w1), len(w2))
            if len(w1) > len(w2) and w1.startswith(w2):
                return "" # Invalid prefix order
            for j in range(min_len):
                if w1[j] != w2[j]:
                    if w2[j] not in adj[w1[j]]:
                        adj[w1[j]].add(w2[j])
                        in_degree[w2[j]] += 1
                    break
                    
        # Kahn's topological sort
        q = deque([ch for ch, deg in in_degree.items() if deg == 0])
        res = []
        
        while q:
            u = q.popleft()
            res.append(u)
            for v in adj[u]:
                in_degree[v] -= 1
                if in_degree[v] == 0:
                    q.append(v)
                    
        if len(res) < len(in_degree):
            return "" # Cycle detected
        return "".join(res)`,
      javascript: `class Solution {\n    alienOrder(words) {\n        const adj = new Map();\n        const inDegree = new Map();\n        \n        for (const w of words) {\n            for (const ch of w) {\n                if (!inDegree.has(ch)) inDegree.set(ch, 0);\n                if (!adj.has(ch)) adj.set(ch, new Set());\n            }\n        }\n        \n        for (let i = 0; i < words.length - 1; i++) {\n            const w1 = words[i], w2 = words[i + 1];\n            if (w1.length > w2.length && w1.startsWith(w2)) return "";\n            const minLen = Math.min(w1.length, w2.length);\n            for (let j = 0; j < minLen; j++) {\n                if (w1[j] !== w2[j]) {\n                    if (!adj.get(w1[j]).has(w2[j])) {\n                        adj.get(w1[j]).add(w2[j]);\n                        inDegree.set(w2[j], inDegree.get(w2[j]) + 1);\n                    }\n                    break;\n                }\n            }\n        }\n        \n        const q = [];\n        for (const [ch, deg] of inDegree.entries()) {\n            if (deg === 0) q.push(ch);\n        }\n        \n        let head = 0;\n        let res = "";\n        while (head < q.length) {\n            const u = q[head++];\n            res += u;\n            for (const v of adj.get(u)) {\n                inDegree.set(v, inDegree.get(v) - 1);\n                if (inDegree.get(v) === 0) {\n                    q.push(v);\n                }\n            }\n        }\n        return res.length === inDegree.size ? res : "";\n    }\n}`,
    },
    hints: [
      'Compare adjacent words in the list to find the first differing character.',
      'Construct a directed graph where edge (u, v) means u comes before v in alien alphabet.',
      'Use Kahn\'s algorithm or DFS for topological sorting; return "" if a cycle exists.',
    ],
    editorial: `### Method Explanation
Topological Sort on Character Ordering:
- For every adjacent pair of words $w_i, w_{i+1}$, find the first differing character $c_1 \\ne c_2$ and add directed edge $c_1 \\to c_2$.
- If $w_i$ has prefix $w_{i+1}$ but is longer, the dictionary is invalid $\\implies ""$.
- Run Kahn's algorithm: if the number of extracted nodes equals the total number of unique characters, a valid topological ordering exists.

### Complexity
- **Time Complexity:** $O(C)$ where $C$ is total characters in $words$.
- **Space Complexity:** $O(1)$ since alphabet size $\\le 26$.`,
    testCases: [
      { input: '["wrt","wrf","er","ett","rftt"]', expectedOutput: '"wertf"', isHidden: false },
      { input: '["z","x"]', expectedOutput: '"zx"', isHidden: false },
      { input: '["z","x","z"]', expectedOutput: '""', isHidden: false },
      { input: '["abc","ab"]', expectedOutput: '""', isHidden: true },
    ],
  },
  {
    title: 'Trapping Rain Water II 3D Min Heap',
    slug: 'trapping-rain-water-ii-3d-min-heap',
    description: `Given an $m \\times n$ integer matrix $heightMap$ representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.

### Constraints
- $m == heightMap.length$
- $n == heightMap[i].length$
- $1 \\le m, n \\le 200$
- $0 \\le heightMap[i][j] \\le 2 \\times 10^4$

### Input Format
- A 2D integer array $heightMap$.

### Output Format
- Return an integer representing trapped water volume.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['data-structures', 'heap', 'bfs', 'matrix'],
    roadmapLevel: 3,
    roadmapTopic: 'advanced-data-structures',
    templates: {
      python: `class Solution:\n    def trapRainWater(self, heightMap: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    trapRainWater(heightMap) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def trapRainWater(self, heightMap: list[list[int]]) -> int:
        if not heightMap or not heightMap[0]:
            return 0
            
        import heapq
        R, C = len(heightMap), len(heightMap[0])
        if R < 3 or C < 3:
            return 0
            
        visited = [[False] * C for _ in range(R)]
        hp = [] # min-heap storing (height, r, c)
        
        # Add perimeter cells to min-heap
        for r in range(R):
            for c in range(C):
                if r == 0 or r == R - 1 or c == 0 or c == C - 1:
                    heapq.heappush(hp, (heightMap[r][c], r, c))
                    visited[r][c] = True
                    
        water = 0
        max_height = 0
        
        while hp:
            h, r, c = heapq.heappop(hp)
            max_height = max(max_height, h)
            
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < R and 0 <= nc < C and not visited[nr][nc]:
                    visited[nr][nc] = True
                    nh = heightMap[nr][nc]
                    if nh < max_height:
                        water += max_height - nh
                    heapq.heappush(hp, (nh, nr, nc))
                    
        return water`,
      javascript: `class Solution {\n    trapRainWater(heightMap) {\n        if (!heightMap || heightMap.length < 3 || heightMap[0].length < 3) return 0;\n        const R = heightMap.length, C = heightMap[0].length;\n        const visited = Array.from({ length: R }, () => new Uint8Array(C));\n        \n        // Binary Min-Heap for [height, r, c]\n        const hp = [];\n        const pushHeap = (item) => {\n            hp.push(item);\n            let idx = hp.length - 1;\n            while (idx > 0) {\n                const pIdx = Math.floor((idx - 1) / 2);\n                if (hp[pIdx][0] <= hp[idx][0]) break;\n                [hp[pIdx], hp[idx]] = [hp[idx], hp[pIdx]];\n                idx = pIdx;\n            }\n        };\n        const popHeap = () => {\n            const top = hp[0];\n            const last = hp.pop();\n            if (hp.length > 0) {\n                hp[0] = last;\n                let idx = 0;\n                while (true) {\n                    let smallest = idx;\n                    const l = 2 * idx + 1, r = 2 * idx + 2;\n                    if (l < hp.length && hp[l][0] < hp[smallest][0]) smallest = l;\n                    if (r < hp.length && hp[r][0] < hp[smallest][0]) smallest = r;\n                    if (smallest === idx) break;\n                    [hp[idx], hp[smallest]] = [hp[smallest], hp[idx]];\n                    idx = smallest;\n                }\n            }\n            return top;\n        };\n        \n        for (let r = 0; r < R; r++) {\n            for (let c = 0; c < C; c++) {\n                if (r === 0 || r === R - 1 || c === 0 || c === C - 1) {\n                    pushHeap([heightMap[r][c], r, c]);\n                    visited[r][c] = 1;\n                }\n            }\n        }\n        \n        let water = 0, maxHeight = 0;\n        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];\n        \n        while (hp.length > 0) {\n            const [h, r, c] = popHeap();\n            maxHeight = Math.max(maxHeight, h);\n            for (const [dr, dc] of dirs) {\n                const nr = r + dr, nc = c + dc;\n                if (nr >= 0 && nr < R && nc >= 0 && nc < C && !visited[nr][nc]) {\n                    visited[nr][nc] = 1;\n                    const nh = heightMap[nr][nc];\n                    if (nh < maxHeight) {\n                        water += maxHeight - nh;\n                    }\n                    pushHeap([nh, nr, nc]);\n                }\n            }\n        }\n        return water;\n    }\n}`,
    },
    hints: [
      'Use a Min-Heap starting with all perimeter cells.',
      'Spill-fill inward from the lowest boundary cell using BFS with priority queue.',
      'Maintain running water surface level max_height.',
    ],
    editorial: `### Method Explanation
3D Trapping Rain Water via Priority Queue (Dijkstra-like boundary contraction):
- Add all perimeter boundary cells to a min-heap. Water cannot spill beyond boundary height.
- Pop the cell $(r, c)$ with lowest height $h$. Update running water level $maxHeight = \\max(maxHeight, h)$.
- For each unvisited neighbor $(nr, nc)$:
  - If $heightMap[nr][nc] < maxHeight$, trapped water at that cell is $maxHeight - heightMap[nr][nc]$.
  - Push neighbor to min-heap and mark visited.

### Complexity
- **Time Complexity:** $O(R \\cdot C \\log(R \\cdot C))$.
- **Space Complexity:** $O(R \\cdot C)$.`,
    testCases: [
      { input: '[[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]', expectedOutput: '4', isHidden: false },
      { input: '[[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]', expectedOutput: '10', isHidden: false },
      { input: '[[1,1,1],[1,0,1],[1,1,1]]', expectedOutput: '1', isHidden: true },
      { input: '[[1,2],[3,4]]', expectedOutput: '0', isHidden: true },
    ],
  },
];
