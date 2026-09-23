import { Difficulty } from '@prisma/client';

export const pack250ExtODefs = [
  {
    title: 'The Skyline Problem Sweep Line',
    slug: 'the-skyline-problem-sweep-line',
    description: `A city's skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Given the locations and heights of all the buildings, return the skyline formed by these buildings collectively.

The geometric information of each building is given in the array $buildings$ where $buildings[i] = [left_i, right_i, height_i]$:
- $left_i$ is the x coordinate of the left edge.
- $right_i$ is the x coordinate of the right edge.
- $height_i$ is the height of the $i$-th building.

Return the key points of the skyline as a list of coordinates $[x, y]$ sorted by $x$-coordinate.

### Constraints
- $1 \\le buildings.length \\le 10^4$
- $0 \\le left_i < right_i \\le 2^{31} - 1$
- $1 \\le height_i \\le 2^{31} - 1$
- $buildings$ is sorted by $left_i$ in non-decreasing order.

### Input Format
- A 2D integer array $buildings$.

### Output Format
- Return a 2D array of coordinates representing key points of the skyline.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['greedy', 'sweep-line', 'heap'],
    roadmapLevel: 2,
    roadmapTopic: 'greedy-algorithms',
    templates: {
      python: `class Solution:\n    def getSkyline(self, buildings: list[list[int]]) -> list[list[int]]:\n        pass`,
      javascript: `class Solution {\n    getSkyline(buildings) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def getSkyline(self, buildings: list[list[int]]) -> list[list[int]]:
        import heapq
        
        # Events: (x, -h, right) for start, (x, 0, 0) for end
        events = []
        for l, r, h in buildings:
            events.append((l, -h, r))
            events.append((r, 0, 0))
            
        # Sort events by x coordinate, then height
        events.sort()
        
        # Max-heap storing (-height, right_x)
        # Sentinel ground building: (0, float('inf'))
        hp = [(0, float('inf'))]
        res = [[0, 0]]
        
        for x, neg_h, r in events:
            # 1. Pop out of bounds buildings
            while hp[0][1] <= x:
                heapq.heappop(hp)
                
            # 2. If entering building, push to heap
            if neg_h < 0:
                heapq.heappush(hp, (neg_h, r))
                
            # 3. Check if max height changed
            max_h = -hp[0][0]
            if res[-1][1] != max_h:
                res.append([x, max_h])
                
        return res[1:]`,
      javascript: `class Solution {\n    getSkyline(buildings) {\n        const events = [];\n        for (const [l, r, h] of buildings) {\n            events.push([l, -h, r]);\n            events.push([r, 0, 0]);\n        }\n        \n        events.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);\n        \n        // Using active heights map with lazy deletion\n        const heights = new Map();\n        heights.set(0, 1); // ground level\n        \n        const res = [[0, 0]];\n        \n        // We can track active building intervals\n        // For JS without native PriorityQueue, maintain sorted active heights array\n        const active = [[0, Infinity]]; // [height, right]\n        \n        for (const [x, negH, r] of events) {\n            // Remove expired\n            for (let i = active.length - 1; i >= 0; i--) {\n                if (active[i][1] <= x) active.splice(i, 1);\n            }\n            \n            if (negH < 0) {\n                active.push([-negH, r]);\n            }\n            \n            let maxH = 0;\n            for (const [h, _] of active) {\n                if (h > maxH) maxH = h;\n            }\n            \n            if (res[res.length - 1][1] !== maxH) {\n                res.push([x, maxH]);\n            }\n        }\n        return res.slice(1);\n    }\n}`,
    },
    hints: [
      'Use a sweep-line algorithm with a max-heap of active building heights.',
      'Process event points at left and right boundaries.',
      'A key point is generated whenever the maximum active height changes at coordinate x.',
    ],
    editorial: `### Method Explanation
Sweep Line with Max-Heap:
- Represent building starts as $(x, -h, r)$ and ends as $(x, 0, 0)$.
- Sweep along $x$-axis:
  1. Remove expired buildings whose right boundary $\\le x$ from top of heap.
  2. Add new building heights to max-heap.
  3. If current maximum height in heap changes compared to the previous key point, emit $[x, max\\_h]$.

### Complexity
- **Time Complexity:** $O(N \\log N)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '[[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]', expectedOutput: '[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]', isHidden: false },
      { input: '[[0,2,3],[2,5,3]]', expectedOutput: '[[0,3],[5,0]]', isHidden: false },
      { input: '[[1,2,1]]', expectedOutput: '[[1,1],[2,0]]', isHidden: true },
    ],
  },
  {
    title: 'Minimum Interval to Include Each Query',
    slug: 'min-interval-include-each-query',
    description: `You are given a 2D integer array $intervals$, where $intervals[i] = [left_i, right_i]$ describes the $i$-th interval starting at $left_i$ and ending at $right_i$ (inclusive). The size of an interval is defined as $right_i - left_i + 1$.

You are also given an integer array $queries$. The answer to the $j$-th query is the size of the smallest interval $i$ such that $left_i \\le queries[j] \\le right_i$. If no such interval exists, the answer is -1.

Return an array containing the answers to the queries in the same order as in $queries$.

### Constraints
- $1 \\le intervals.length \\le 10^5$
- $1 \\le queries.length \\le 10^5$
- $intervals[i].length == 2$
- $1 \\le left_i \\le right_i \\le 10^7$
- $1 \\le queries[j] \\le 10^7$

### Input Format
- A 2D integer array $intervals$ and an integer array $queries$.

### Output Format
- Return an array of query answers.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['greedy', 'heap', 'sorting', 'sweep-line'],
    roadmapLevel: 2,
    roadmapTopic: 'greedy-algorithms',
    templates: {
      python: `class Solution:\n    def minInterval(self, intervals: list[list[int]], queries: list[int]) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    minInterval(intervals, queries) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minInterval(self, intervals: list[list[int]], queries: list[int]) -> list[int]:
        import heapq
        
        intervals.sort(key=lambda x: x[0])
        sorted_queries = sorted((q, i) for i, q in enumerate(queries))
        
        res = [-1] * len(queries)
        hp = [] # min-heap storing (size, right_bound)
        i = 0
        n = len(intervals)
        
        for q, orig_idx in sorted_queries:
            # 1. Add all intervals starting <= q
            while i < n and intervals[i][0] <= q:
                l, r = intervals[i]
                heapq.heappush(hp, (r - l + 1, r))
                i += 1
                
            # 2. Remove all intervals ending < q
            while hp and hp[0][1] < q:
                heapq.heappop(hp)
                
            # 3. Top of heap is smallest interval covering q
            if hp:
                res[orig_idx] = hp[0][0]
                
        return res`,
      javascript: `class Solution {\n    minInterval(intervals, queries) {\n        intervals.sort((a, b) => a[0] - b[0]);\n        const sortedQueries = queries.map((q, i) => [q, i]).sort((a, b) => a[0] - b[0]);\n        const res = new Array(queries.length).fill(-1);\n        \n        // Binary min-heap for [size, right]\n        const hp = [];\n        const pushHeap = (item) => {\n            hp.push(item);\n            let idx = hp.length - 1;\n            while (idx > 0) {\n                const pIdx = Math.floor((idx - 1) / 2);\n                if (hp[pIdx][0] <= hp[idx][0]) break;\n                [hp[pIdx], hp[idx]] = [hp[idx], hp[pIdx]];\n                idx = pIdx;\n            }\n        };\n        const popHeap = () => {\n            if (hp.length === 0) return null;\n            const top = hp[0];\n            const last = hp.pop();\n            if (hp.length > 0) {\n                hp[0] = last;\n                let idx = 0;\n                while (true) {\n                    let smallest = idx;\n                    const l = 2 * idx + 1, r = 2 * idx + 2;\n                    if (l < hp.length && hp[l][0] < hp[smallest][0]) smallest = l;\n                    if (r < hp.length && hp[r][0] < hp[smallest][0]) smallest = r;\n                    if (smallest === idx) break;\n                    [hp[idx], hp[smallest]] = [hp[smallest], hp[idx]];\n                    idx = smallest;\n                }\n            }\n            return top;\n        };\n        \n        let i = 0;\n        const n = intervals.length;\n        \n        for (const [q, origIdx] of sortedQueries) {\n            while (i < n && intervals[i][0] <= q) {\n                const [l, r] = intervals[i];\n                pushHeap([r - l + 1, r]);\n                i++;\n            }\n            while (hp.length > 0 && hp[0][1] < q) {\n                popHeap();\n            }\n            if (hp.length > 0) {\n                res[origIdx] = hp[0][0];\n            }\n        }\n        return res;\n    }\n}`,
    },
    hints: [
      'Sort both intervals and queries.',
      'Use a min-heap storing (interval_length, right_endpoint).',
      'For each query q, add all intervals with left <= q, pop intervals with right < q, and the minimum size is at heap top.',
    ],
    editorial: `### Method Explanation
Offline Queries with Sweep Line & Min-Heap:
- Sort queries along with their original indices.
- Sort intervals by left endpoint.
- As we iterate through sorted queries $q$:
  - Push all intervals with $left \\le q$ into a min-heap ordered by interval length $(right - left + 1, right)$.
  - Pop expired intervals where $right < q$.
  - The top of the heap is the smallest valid interval covering $q$.

### Complexity
- **Time Complexity:** $O(N \\log N + Q \\log Q + (N + Q) \\log N)$.
- **Space Complexity:** $O(N + Q)$.`,
    testCases: [
      { input: '[[1,4],[2,4],[3,6],[4,4]], [2,3,4,5]', expectedOutput: '[3,3,1,4]', isHidden: false },
      { input: '[[2,3],[2,5],[1,8],[20,25]], [2,19,5,22]', expectedOutput: '[2,-1,4,6]', isHidden: false },
      { input: '[[1,1]], [1]', expectedOutput: '[1]', isHidden: true },
      { input: '[[1,1]], [2]', expectedOutput: '[-1]', isHidden: true },
    ],
  },
  {
    title: 'Course Schedule III Greedy Deadline Scheduling',
    slug: 'course-schedule-iii-greedy-deadline',
    description: `There are $n$ different online courses numbered from $1$ to $n$. You are given an array $courses$ where $courses[i] = [duration_i, lastDay_i]$ indicate that the $i$-th course should be taken continuously for $duration_i$ days and must be finished before or on $lastDay_i$.

You start on the $1$-st day and you cannot take two or more courses simultaneously.

Return the maximum number of courses that you can take.

### Constraints
- $1 \\le courses.length \\le 10^4$
- $1 \\le duration_i, lastDay_i \\le 10^4$

### Input Format
- A 2D integer array $courses$.

### Output Format
- Return the integer maximum courses that can be taken.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['greedy', 'heap', 'sorting'],
    roadmapLevel: 2,
    roadmapTopic: 'greedy-algorithms',
    templates: {
      python: `class Solution:\n    def scheduleCourse(self, courses: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    scheduleCourse(courses) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def scheduleCourse(self, courses: list[list[int]]) -> int:
        import heapq
        # Sort courses by earliest deadline
        courses.sort(key=lambda x: x[1])
        
        hp = [] # Max-heap of durations
        total_time = 0
        
        for duration, last_day in courses:
            if total_time + duration <= last_day:
                total_time += duration
                heapq.heappush(hp, -duration)
            elif hp and -hp[0] > duration:
                # Replace the longest previously taken course with the shorter one
                total_time += duration - (-heapq.heappop(hp))
                heapq.heappush(hp, -duration)
                
        return len(hp)`,
      javascript: `class Solution {\n    scheduleCourse(courses) {\n        courses.sort((a, b) => a[1] - b[1]);\n        const hp = []; // Max heap\n        const pushMax = (val) => {\n            hp.push(val);\n            let idx = hp.length - 1;\n            while (idx > 0) {\n                const pIdx = Math.floor((idx - 1) / 2);\n                if (hp[pIdx] >= hp[idx]) break;\n                [hp[pIdx], hp[idx]] = [hp[idx], hp[pIdx]];\n                idx = pIdx;\n            }\n        };\n        const popMax = () => {\n            const top = hp[0];\n            const last = hp.pop();\n            if (hp.length > 0) {\n                hp[0] = last;\n                let idx = 0;\n                while (true) {\n                    let largest = idx;\n                    const l = 2 * idx + 1, r = 2 * idx + 2;\n                    if (l < hp.length && hp[l] > hp[largest]) largest = l;\n                    if (r < hp.length && hp[r] > hp[largest]) largest = r;\n                    if (largest === idx) break;\n                    [hp[idx], hp[largest]] = [hp[largest], hp[idx]];\n                    idx = largest;\n                }\n            }\n            return top;\n        };\n        \n        let totalTime = 0;\n        for (const [duration, lastDay] of courses) {\n            if (totalTime + duration <= lastDay) {\n                totalTime += duration;\n                pushMax(duration);\n            } else if (hp.length > 0 && hp[0] > duration) {\n                const longest = popMax();\n                totalTime += duration - longest;\n                pushMax(duration);\n            }\n        }\n        return hp.length;\n    }\n}`,
    },
    hints: [
      'Sort courses by their deadline lastDay.',
      'Greedily take courses. If total time exceeds deadline, swap out the course with the longest duration taken so far.',
      'Maintain taken course durations in a max-heap.',
    ],
    editorial: `### Method Explanation
Greedy Deadline Scheduling with Max-Heap:
- Sort courses by ascending deadline $lastDay$.
- Iterate through each course $(duration, lastDay)$:
  - If $totalTime + duration \\le lastDay$, take it and push $duration$ into max-heap.
  - Else if max-heap top has duration $> duration$, we can replace that course with the current one, reducing total time without decreasing the number of courses taken.

### Complexity
- **Time Complexity:** $O(N \\log N)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '[[100,200],[200,1300],[1000,1250],[2000,3200]]', expectedOutput: '3', isHidden: false },
      { input: '[[1,2]]', expectedOutput: '1', isHidden: false },
      { input: '[[3,2],[4,3]]', expectedOutput: '0', isHidden: false },
      { input: '[[5,5],[4,6],[2,6]]', expectedOutput: '2', isHidden: true },
    ],
  },
  {
    title: 'Reorganize String No Adjacent Same',
    slug: 'reorganize-string-no-adjacent-same',
    description: `Given a string $s$, rearrange the characters of $s$ so that any two adjacent characters are not the same.

Return any possible rearrangement of $s$ or return an empty string "" if not possible.

### Constraints
- $1 \\le s.length \\le 500$
- $s$ consists of lowercase English letters.

### Input Format
- A single string $s$.

### Output Format
- Return the reorganized string or empty string.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['greedy', 'heap', 'string'],
    roadmapLevel: 2,
    roadmapTopic: 'greedy-algorithms',
    templates: {
      python: `class Solution:\n    def reorganizeString(self, s: str) -> str:\n        pass`,
      javascript: `class Solution {\n    reorganizeString(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def reorganizeString(self, s: str) -> str:
        from collections import Counter
        import heapq
        
        counts = Counter(s)
        n = len(s)
        if max(counts.values()) > (n + 1) // 2:
            return ""
            
        hp = [(-c, ch) for ch, c in counts.items()]
        heapq.heapify(hp)
        
        res = []
        prev_c, prev_ch = 0, ""
        
        while hp:
            c, ch = heapq.heappop(hp)
            res.append(ch)
            if prev_c < 0:
                heapq.heappush(hp, (prev_c, prev_ch))
            prev_c = c + 1
            prev_ch = ch
            
        return "".join(res)`,
      javascript: `class Solution {\n    reorganizeString(s) {\n        const counts = {};\n        for (const ch of s) {\n            counts[ch] = (counts[ch] || 0) + 1;\n        }\n        const n = s.length;\n        for (const ch in counts) {\n            if (counts[ch] > Math.floor((n + 1) / 2)) return "";\n        }\n        \n        const chars = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);\n        const res = new Array(n);\n        let idx = 0;\n        \n        for (const ch of chars) {\n            let count = counts[ch];\n            while (count > 0) {\n                if (idx >= n) idx = 1;\n                res[idx] = ch;\n                idx += 2;\n                count--;\n            }\n        }\n        return res.join("");\n    }\n}`,
    },
    hints: [
      'If any character appears more than (N + 1) // 2 times, it is impossible.',
      'Place characters at even indices (0, 2, 4...) first, then odd indices (1, 3, 5...).',
    ],
    editorial: `### Method Explanation
Even-Odd Interleaving:
- Count character frequencies. If max(freq) > ceil(N / 2), by Pigeonhole Principle adjacent duplicates are inevitable, so return empty string.
- Otherwise, sort characters by descending frequency and fill alternating slots (0, 2, 4... then 1, 3, 5...).

### Complexity
- **Time Complexity:** O(N).
- **Space Complexity:** O(1) auxiliary.`,
    testCases: [
      { input: '"aab"', expectedOutput: '"aba"', isHidden: false },
      { input: '"aaab"', expectedOutput: '""', isHidden: false },
      { input: '"vvvlo"', expectedOutput: '"vlvov"', isHidden: true },
    ],
  },
  {
    title: 'Minimum Number of Taps to Water a Garden',
    slug: 'min-taps-to-water-garden',
    description: `There is a one-dimensional garden on the x-axis. The garden starts at the point $0$ and ends at the point $n$. (i.e., the length of the garden is $n$).

There are $n + 1$ taps located at points $[0, 1, \\dots, n]$ in the garden.

Given an integer $n$ and an integer array $ranges$ of length $n + 1$ where $ranges[i]$ (0-indexed) means the $i$-th tap can water the area $[i - ranges[i], i + ranges[i]]$ if it was open.

Return the minimum number of taps that should be open to water the whole garden, If the garden cannot be watered, return -1.

### Constraints
- $1 \\le n \\le 10^4$
- $ranges.length == n + 1$
- $0 \\le ranges[i] \\le 100$

### Input Format
- An integer $n$ and an integer array $ranges$.

### Output Format
- Return the minimum number of taps or -1.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['greedy', 'dynamic-programming', 'jump-game'],
    roadmapLevel: 2,
    roadmapTopic: 'greedy-algorithms',
    templates: {
      python: `class Solution:\n    def minTaps(self, n: int, ranges: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    minTaps(n, ranges) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minTaps(self, n: int, ranges: list[int]) -> int:
        # max_reach[i] = farthest right point reachable from a tap whose left bound <= i
        max_reach = [0] * (n + 1)
        for i, r in enumerate(ranges):
            l = max(0, i - r)
            right = min(n, i + r)
            max_reach[l] = max(max_reach[l], right)
            
        taps = 0
        curr_end = 0
        farthest = 0
        
        for i in range(n):
            farthest = max(farthest, max_reach[i])
            if i == curr_end:
                taps += 1
                curr_end = farthest
                if curr_end <= i:
                    return -1
                    
        return taps if curr_end >= n else -1`,
      javascript: `class Solution {\n    minTaps(n, ranges) {\n        const maxReach = new Array(n + 1).fill(0);\n        for (let i = 0; i <= n; i++) {\n            const l = Math.max(0, i - ranges[i]);\n            const r = Math.min(n, i + ranges[i]);\n            maxReach[l] = Math.max(maxReach[l], r);\n        }\n        \n        let taps = 0, currEnd = 0, farthest = 0;\n        for (let i = 0; i < n; i++) {\n            farthest = Math.max(farthest, maxReach[i]);\n            if (i === currEnd) {\n                taps++;\n                currEnd = farthest;\n                if (currEnd <= i) return -1;\n            }\n        }\n        return currEnd >= n ? taps : -1;\n    }\n}`,
    },
    hints: [
      'Transform this into Jump Game II.',
      'Record max_reach[l] = the farthest right reach starting at or before point l.',
    ],
    editorial: `### Method Explanation
Reduction to Jump Game II:
- For each tap at $i$, compute its left boundary $l = \\max(0, i - r)$ and right boundary $r = \\min(n, i + r)$. Update $max\\_reach[l] = \\max(max\\_reach[l], r)$.
- Greedily jump from current watered boundary $currEnd$ to the maximum reach achieved so far $farthest$. If $farthest \\le i$, it's impossible to advance $\\implies -1$.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(N)$.`,
    testCases: [
      { input: '5, [3,4,1,1,0,0]', expectedOutput: '1', isHidden: false },
      { input: '3, [0,0,0,0]', expectedOutput: '-1', isHidden: false },
      { input: '7, [1,2,1,0,2,1,0,1]', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Partition Labels Greedy Intervals',
    slug: 'partition-labels-greedy-intervals',
    description: `You are given a string $s$. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be $s$.

Return a list of integers representing the size of these parts.

### Constraints
- $1 \\le s.length \\le 500$
- $s$ consists of lowercase English letters.

### Input Format
- A single string $s$.

### Output Format
- Return a list of integers representing part lengths.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['greedy', 'two-pointers', 'string'],
    roadmapLevel: 2,
    roadmapTopic: 'greedy-algorithms',
    templates: {
      python: `class Solution:\n    def partitionLabels(self, s: str) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    partitionLabels(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def partitionLabels(self, s: str) -> list[int]:
        last = {ch: i for i, ch in enumerate(s)}
        res = []
        anchor = 0
        j = 0
        
        for i, ch in enumerate(s):
            j = max(j, last[ch])
            if i == j:
                res.append(i - anchor + 1)
                anchor = i + 1
                
        return res`,
      javascript: `class Solution {\n    partitionLabels(s) {\n        const last = {};\n        for (let i = 0; i < s.length; i++) {\n            last[s[i]] = i;\n        }\n        const res = [];\n        let anchor = 0, j = 0;\n        for (let i = 0; i < s.length; i++) {\n            j = Math.max(j, last[s[i]]);\n            if (i === j) {\n                res.push(i - anchor + 1);\n                anchor = i + 1;\n            }\n        }\n        return res;\n    }\n}`,
    },
    hints: [
      'Precompute the last occurrence index of each character.',
      'Maintain the maximum last occurrence of characters seen in the current partition.',
      'When the current index equals this maximum, split the partition.',
    ],
    editorial: `### Method Explanation
Two-Pointer Greedy Partitioning:
- Record $last[c]$, the final index character $c$ appears.
- Iterate with pointers $anchor$ and $j$:
  - Extend $j = \\max(j, last[s[i]])$.
  - When $i == j$, all characters in substring $s[anchor \\dots i]$ have no occurrences outside this partition, so record size $i - anchor + 1$ and set $anchor = i + 1$.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(1)$ (at most 26 letters).`,
    testCases: [
      { input: '"ababcbacadefegdehijhklij"', expectedOutput: '[9,7,8]', isHidden: false },
      { input: '"eccbbbbdec"', expectedOutput: '[10]', isHidden: false },
      { input: '"a"', expectedOutput: '[1]', isHidden: true },
    ],
  },
  {
    title: 'Gas Station Circuit Greedy',
    slug: 'gas-station-circuit-greedy',
    description: `There are $n$ gas stations along a circular route, where the amount of gas at the $i$-th station is $gas[i]$.

You have a car with an unlimited gas tank and it costs $cost[i]$ of gas to travel from the $i$-th station to its next $(i + 1)$-th station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays $gas$ and $cost$, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.

### Constraints
- $n == gas.length == cost.length$
- $1 \\le n \\le 10^5$
- $0 \\le gas[i], cost[i] \\le 10^4$

### Input Format
- Two integer arrays $gas$ and $cost$.

### Output Format
- Return the starting index or -1.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['greedy', 'array'],
    roadmapLevel: 2,
    roadmapTopic: 'greedy-algorithms',
    templates: {
      python: `class Solution:\n    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    canCompleteCircuit(gas, cost) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:
        if sum(gas) < sum(cost):
            return -1
            
        total_tank = 0
        curr_tank = 0
        start = 0
        
        for i in range(len(gas)):
            diff = gas[i] - cost[i]
            total_tank += diff
            curr_tank += diff
            if curr_tank < 0:
                start = i + 1
                curr_tank = 0
                
        return start if total_tank >= 0 else -1`,
      javascript: `class Solution {\n    canCompleteCircuit(gas, cost) {\n        let totalTank = 0, currTank = 0, start = 0;\n        for (let i = 0; i < gas.length; i++) {\n            const diff = gas[i] - cost[i];\n            totalTank += diff;\n            currTank += diff;\n            if (currTank < 0) {\n                start = i + 1;\n                currTank = 0;\n            }\n        }\n        return totalTank >= 0 ? start : -1;\n    }\n}`,
    },
    hints: [
      'If sum(gas) < sum(cost), it is impossible to complete the circuit.',
      'If you run out of gas between station i and j, no station between i and j can be a valid starting station.',
    ],
    editorial: `### Method Explanation
Greedy Single Pass:
- If total gas $<$ total cost, completing the circuit is impossible $\\implies -1$.
- If we start at $start$ and tank becomes negative at station $i$, none of the stations from $start$ to $i$ can complete the route. We reset $start = i + 1$ and $currTank = 0$.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(1)$.`,
    testCases: [
      { input: '[1,2,3,4,5], [3,4,5,1,2]', expectedOutput: '3', isHidden: false },
      { input: '[2,3,4], [3,4,3]', expectedOutput: '-1', isHidden: false },
      { input: '[5,1,2,3,4], [4,4,1,5,1]', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: 'Task Scheduler Minimum Intervals',
    slug: 'task-scheduler-minimum-intervals',
    description: `Given a characters array $tasks$, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer $n$ that represents the cooldown period between two **same** tasks (the same letter in the array), that is that there must be at least $n$ units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.

### Constraints
- $1 \\le tasks.length \\le 10^4$
- $tasks[i]$ is uppercase English letter.
- $0 \\le n \\le 100$

### Input Format
- A characters array $tasks$ and an integer $n$.

### Output Format
- Return an integer representing minimum time units.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['greedy', 'math', 'array'],
    roadmapLevel: 2,
    roadmapTopic: 'greedy-algorithms',
    templates: {
      python: `class Solution:\n    def leastInterval(self, tasks: list[str], n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    leastInterval(tasks, n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def leastInterval(self, tasks: list[str], n: int) -> int:
        from collections import Counter
        counts = Counter(tasks)
        max_freq = max(counts.values())
        max_count = sum(1 for c in counts.values() if c == max_freq)
        
        # Idle slots formula: (max_freq - 1) * (n + 1) + max_count
        part_count = max_freq - 1
        part_length = n - (max_count - 1)
        empty_slots = part_count * part_length
        available_tasks = len(tasks) - max_freq * max_count
        idles = max(0, empty_slots - available_tasks)
        
        return len(tasks) + idles`,
      javascript: `class Solution {\n    leastInterval(tasks, n) {\n        const counts = {};\n        for (const t of tasks) counts[t] = (counts[t] || 0) + 1;\n        let maxFreq = 0;\n        for (const t in counts) {\n            if (counts[t] > maxFreq) maxFreq = counts[t];\n        }\n        let maxCount = 0;\n        for (const t in counts) {\n            if (counts[t] === maxFreq) maxCount++;\n        }\n        \n        const partCount = maxFreq - 1;\n        const partLength = n - (maxCount - 1);\n        const emptySlots = partCount * partLength;\n        const availableTasks = tasks.length - maxFreq * maxCount;\n        const idles = Math.max(0, emptySlots - availableTasks);\n        \n        return tasks.length + idles;\n    }\n}`,
    },
    hints: [
      'The most frequent task determines the minimum schedule length.',
      'Let max_freq be highest task frequency, and count_max be number of tasks with this frequency.',
      'Formula is max(len(tasks), (max_freq - 1) * (n + 1) + count_max).',
    ],
    editorial: `### Method Explanation
Mathematical Idle Slot Calculation:
- The task with maximum frequency $M$ creates $M - 1$ chunks of size $(n + 1)$.
- Plus the trailing chunk of size equal to the number of tasks having frequency $M$.
- Formula: $\\max(|tasks|, (M - 1) \\times (n + 1) + \\text{countMax})$.

### Complexity
- **Time Complexity:** $O(N)$.
- **Space Complexity:** $O(1)$.`,
    testCases: [
      { input: '["A","A","A","B","B","B"], 2', expectedOutput: '8', isHidden: false },
      { input: '["A","A","A","B","B","B"], 0', expectedOutput: '6', isHidden: false },
      { input: '["A","A","A","A","A","A","B","C","D","E","F","G"], 2', expectedOutput: '16', isHidden: false },
      { input: '["A","B","C","D","E","A","B","C","D","E"], 4', expectedOutput: '10', isHidden: true },
    ],
  },
  {
    title: 'Assign Cookies Greedy',
    slug: 'assign-cookies-greedy',
    description: `Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.

Each child $i$ has a greed factor $g[i]$, which is the minimum size of a cookie that the child will be content with; and each cookie $j$ has a size $s[j]$. If $s[j] \\ge g[i]$, we can assign the cookie $j$ to the child $i$, and the child $i$ will be content. Your goal is to maximize the number of your content children and output the maximum number.

### Constraints
- $1 \\le g.length \\le 3 \\times 10^4$
- $0 \\le s.length \\le 3 \\times 10^4$
- $1 \\le g[i], s[j] \\le 2^{31} - 1$

### Input Format
- Two integer arrays $g$ and $s$.

### Output Format
- Return the number of content children.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['greedy', 'two-pointers', 'sorting'],
    roadmapLevel: 2,
    roadmapTopic: 'greedy-algorithms',
    templates: {
      python: `class Solution:\n    def findContentChildren(self, g: list[int], s: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    findContentChildren(g, s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findContentChildren(self, g: list[int], s: list[int]) -> int:
        g.sort()
        s.sort()
        child = 0
        cookie = 0
        while child < len(g) and cookie < len(s):
            if s[cookie] >= g[child]:
                child += 1
            cookie += 1
        return child`,
      javascript: `class Solution {\n    findContentChildren(g, s) {\n        g.sort((a, b) => a - b);\n        s.sort((a, b) => a - b);\n        let child = 0, cookie = 0;\n        while (child < g.length && cookie < s.length) {\n            if (s[cookie] >= g[child]) {\n                child++;\n            }\n            cookie++;\n        }\n        return child;\n    }\n}`,
    },
    hints: [
      'Sort both greed factors and cookie sizes.',
      'Greedily satisfy the least greedy child with the smallest sufficient cookie.',
    ],
    editorial: `### Method Explanation
Greedy Two Pointers:
- Sort both arrays in ascending order.
- For each cookie, if its size satisfies the current least greedy child, advance child pointer.
- Always advance cookie pointer.

### Complexity
- **Time Complexity:** $O(N \\log N + M \\log M)$.
- **Space Complexity:** $O(1)$.`,
    testCases: [
      { input: '[1,2,3], [1,1]', expectedOutput: '1', isHidden: false },
      { input: '[1,2], [1,2,3]', expectedOutput: '2', isHidden: false },
      { input: '[1,2,3], []', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Lemonade Change Greedy',
    slug: 'lemonade-change-greedy',
    description: `At a lemonade stand, each lemonade costs 5 dollars. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills). Each customer will only buy one 5-dollar lemonade and pay with either a 5, 10, or 20 dollar bill. You must provide the correct change to each customer so that the net transaction is that the customer pays 5 dollars.

Note that you do not have any change in hand at first.

Given an integer array bills where bills[i] is the bill the i-th customer pays, return true if you can provide every customer with the correct change, or false otherwise.

### Constraints
- 1 <= bills.length <= 10^5
- bills[i] is either 5, 10, or 20.

### Input Format
- An integer array bills.

### Output Format
- Return a boolean indicating whether change can be given to all customers.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ['greedy', 'array'],
    roadmapLevel: 2,
    roadmapTopic: 'greedy-algorithms',
    templates: {
      python: `class Solution:\n    def lemonadeChange(self, bills: list[int]) -> bool:\n        pass`,
      javascript: `class Solution {\n    lemonadeChange(bills) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def lemonadeChange(self, bills: list[int]) -> bool:
        five = 0
        ten = 0
        for b in bills:
            if b == 5:
                five += 1
            elif b == 10:
                if five == 0:
                    return False
                five -= 1
                ten += 1
            else: # b == 20
                if ten > 0 and five > 0:
                    ten -= 1
                    five -= 1
                elif five >= 3:
                    five -= 3
                else:
                    return False
        return True`,
      javascript: `class Solution {\n    lemonadeChange(bills) {\n        let five = 0, ten = 0;\n        for (const b of bills) {\n            if (b === 5) {\n                five++;\n            } else if (b === 10) {\n                if (five === 0) return false;\n                five--;\n                ten++;\n            } else {\n                if (ten > 0 && five > 0) {\n                    ten--;\n                    five--;\n                } else if (five >= 3) {\n                    five -= 3;\n                } else {\n                    return false;\n                }\n            }\n        }\n        return true;\n    }\n}`,
    },
    hints: [
      'Maintain counts of 5 and 10 bills.',
      'When receiving 20, prioritize giving 10 + 5 over three 5 bills, as 5 bills are more flexible.',
    ],
    editorial: `### Method Explanation
Greedy Cash Register:
- 5 dollar bills are needed for change on both 10 and 20 dollar bills.
- When given 20, greedily give one 10 and one 5 if available, preserving 5 dollar bills for subsequent customers.

### Complexity
- **Time Complexity:** O(N).
- **Space Complexity:** O(1).`,
    testCases: [
      { input: '[5,5,5,10,20]', expectedOutput: 'true', isHidden: false },
      { input: '[5,5,10,10,20]', expectedOutput: 'false', isHidden: false },
      { input: '[5,5,5,5,20,20,5,5,5,5]', expectedOutput: 'false', isHidden: true },
    ],
  },
];
