import { writePack, ProblemSpec } from './pack-writer-util';

const packF: ProblemSpec[] = [
  // 1. Rectangle Area II
  {
    title: 'Sweep Line Rectangle Area II',
    slug: 'sweep-line-rectangle-area-ii',
    description: 'You are given a 2D array of rectangles where `rectangles[i] = [x1, y1, x2, y2]`. Return the total area covered by all rectangles in the plane modulo `10^9 + 7`.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= rectangles.length <= 200\n0 <= x1 < x2 <= 10^9\n0 <= y1 < y2 <= 10^9',
    inputFormat: 'rectangles',
    outputFormat: 'Total union area modulo 1000000007.',
    sampleInput: '[[0,0,2,2],[1,0,2,3],[1,0,3,1]]',
    sampleOutput: '6',
    points: 200,
    hints: ['Discretize x coordinates, merge 1D y-intervals per vertical slab.'],
    codeTemplates: {
      python: `class Solution:\n    def rectangleArea(self, rectangles: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    rectangleArea(rectangles) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def rectangleArea(self, rectangles: list[list[int]]) -> int:
        MOD = 1_000_000_007
        x_coords = sorted(list(set([r[0] for r in rectangles] + [r[2] for r in rectangles])))
        total_area = 0
        for i in range(len(x_coords) - 1):
            x1, x2 = x_coords[i], x_coords[i + 1]
            width = x2 - x1
            if width == 0: continue
            intervals = []
            for rx1, ry1, rx2, ry2 in rectangles:
                if rx1 <= x1 and x2 <= rx2: intervals.append((ry1, ry2))
            if not intervals: continue
            intervals.sort()
            cur_y1, cur_y2 = intervals[0]
            height = 0
            for y1, y2 in intervals[1:]:
                if y1 > cur_y2:
                    height += cur_y2 - cur_y1
                    cur_y1, cur_y2 = y1, y2
                else:
                    cur_y2 = max(cur_y2, y2)
            height += cur_y2 - cur_y1
            total_area = (total_area + width * height) % MOD
        return total_area`,
      javascript: `class Solution {
    rectangleArea(rectangles) {
        const MOD = 1000000007n;
        const xSet = new Set();
        for (const [x1, , x2, ] of rectangles) { xSet.add(x1); xSet.add(x2); }
        const xCoords = Array.from(xSet).sort((a, b) => a - b);
        let totalArea = 0n;
        for (let i = 0; i < xCoords.length - 1; i++) {
            const x1 = xCoords[i], x2 = xCoords[i + 1];
            const width = BigInt(x2 - x1);
            if (width === 0n) continue;
            const intervals = [];
            for (const [rx1, ry1, rx2, ry2] of rectangles) {
                if (rx1 <= x1 && x2 <= rx2) intervals.push([ry1, ry2]);
            }
            if (intervals.length === 0) continue;
            intervals.sort((a, b) => a[0] - b[0]);
            let [curY1, curY2] = intervals[0], height = 0;
            for (let j = 1; j < intervals.length; j++) {
                const [y1, y2] = intervals[j];
                if (y1 > curY2) {
                    height += curY2 - curY1;
                    curY1 = y1; curY2 = y2;
                } else curY2 = Math.max(curY2, y2);
            }
            height += curY2 - curY1;
            totalArea = (totalArea + width * BigInt(height)) % MOD;
        }
        return Number(totalArea);
    }
}`,
    },
    editorial: {
      approach: 'Sweep line with coordinate compression.',
      algorithm: 'Discretize x-coordinates into vertical stripes and merge y-intervals.',
      timeComplexity: 'O(N^2 log N)',
      spaceComplexity: 'O(N)',
      content: 'Classic computational geometry sweep-line.',
      referenceCode: `def rectangleArea(rectangles): ...`,
    },
    tags: ['Geometry', 'Sweep Line', 'Array'],
    testCases: [
      { input: '[[0,0,2,2],[1,0,2,3],[1,0,3,1]]', expectedOutput: '6', isHidden: false },
      { input: '[[0,0,1000000000,1000000000]]', expectedOutput: '49', isHidden: false },
      { input: '[[0,0,1,1],[2,2,3,3]]', expectedOutput: '2', isHidden: true },
      { input: '[[0,0,3,3],[1,1,2,2]]', expectedOutput: '9', isHidden: true },
    ],
  },
  // 2. Interval List Intersections
  {
    title: 'Interval List Intersections',
    slug: 'interval-list-intersections',
    description: 'Given two lists of closed intervals, `firstList` and `secondList`, return the intersection of these two interval lists.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '0 <= firstList.length, secondList.length <= 1000\n0 <= start_i <= end_i <= 10^9',
    inputFormat: 'firstList, secondList',
    outputFormat: 'List of intersecting intervals.',
    sampleInput: '[[0,2],[5,10],[13,23],[24,25]], [[1,5],[8,12],[15,24],[25,26]]',
    sampleOutput: '[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]',
    points: 150,
    hints: ['Overlapping segment is [max(a1, b1), min(a2, b2)]. Advance the one that ends earlier.'],
    codeTemplates: {
      python: `class Solution:\n    def intervalIntersection(self, firstList: list[list[int]], secondList: list[list[int]]) -> list[list[int]]:\n        pass`,
      javascript: `class Solution {\n    intervalIntersection(firstList, secondList) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def intervalIntersection(self, firstList: list[list[int]], secondList: list[list[int]]) -> list[list[int]]:
        i = j = 0
        ans = []
        while i < len(firstList) and j < len(secondList):
            lo = max(firstList[i][0], secondList[j][0])
            hi = min(firstList[i][1], secondList[j][1])
            if lo <= hi: ans.append([lo, hi])
            if firstList[i][1] < secondList[j][1]: i += 1
            else: j += 1
        return ans`,
      javascript: `class Solution {
    intervalIntersection(firstList, secondList) {
        let i = 0, j = 0;
        const ans = [];
        while (i < firstList.length && j < secondList.length) {
            const lo = Math.max(firstList[i][0], secondList[j][0]);
            const hi = Math.min(firstList[i][1], secondList[j][1]);
            if (lo <= hi) ans.push([lo, hi]);
            if (firstList[i][1] < secondList[j][1]) i++;
            else j++;
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Two-pointer interval intersection scan.',
      algorithm: 'Greedily pair interval heads.',
      timeComplexity: 'O(N + M)',
      spaceComplexity: 'O(N + M)',
      content: 'Disjoint interval list intersections.',
      referenceCode: `def intervalIntersection(firstList, secondList): ...`,
    },
    tags: ['Intervals', 'Two Pointers', 'Array'],
    testCases: [
      { input: '[[0,2],[5,10],[13,23],[24,25]], [[1,5],[8,12],[15,24],[25,26]]', expectedOutput: '[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]', isHidden: false },
      { input: '[[1,3],[5,9]], []', expectedOutput: '[]', isHidden: false },
      { input: '[[1,7]], [[3,10]]', expectedOutput: '[[3,7]]', isHidden: true },
      { input: '[[3,5],[9,20]], [[4,5],[7,10],[11,12],[14,15],[16,20]]', expectedOutput: '[[4,5],[9,10],[11,12],[14,15],[16,20]]', isHidden: true },
    ],
  },
  // 3. Car Fleet
  {
    title: 'Car Fleet Arrival Groups',
    slug: 'car-fleet-collision-time',
    description: 'There are `n` cars at given starting positions `position` traveling toward a target at miles per hour `speed`. Return the number of car fleets that arrive at the destination.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= n <= 10^5\n0 < target <= 10^6\n0 <= position[i] < target\n0 < speed[i] <= 10^6',
    inputFormat: 'target, position, speed',
    outputFormat: 'Number of car fleets integer.',
    sampleInput: '12, [10,8,0,5,3], [2,4,1,1,3]',
    sampleOutput: '3',
    points: 150,
    hints: ['Sort descending by position, push arrival times to monotonic stack.'],
    codeTemplates: {
      python: `class Solution:\n    def carFleet(self, target: int, position: list[int], speed: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    carFleet(target, position, speed) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def carFleet(self, target: int, position: list[int], speed: list[int]) -> int:
        cars = sorted(zip(position, speed), reverse=True)
        stack = []
        for pos, spd in cars:
            time = (target - pos) / spd
            if not stack or time > stack[-1]: stack.append(time)
        return len(stack)`,
      javascript: `class Solution {
    carFleet(target, position, speed) {
        const cars = position.map((p, i) => [p, speed[i]]).sort((a, b) => b[0] - a[0]);
        const stack = [];
        for (const [pos, spd] of cars) {
            const time = (target - pos) / spd;
            if (stack.length === 0 || time > stack[stack.length - 1]) stack.push(time);
        }
        return stack.length;
    }
}`,
    },
    editorial: {
      approach: 'Monotonic stack over descending start positions.',
      algorithm: 'Fleet count equals the count of monotonically strictly increasing arrival times from right to left.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      content: 'Monotonic stack vehicle grouping.',
      referenceCode: `def carFleet(target, position, speed): ...`,
    },
    tags: ['Monotonic Stack', 'Sorting', 'Greedy'],
    testCases: [
      { input: '12, [10,8,0,5,3], [2,4,1,1,3]', expectedOutput: '3', isHidden: false },
      { input: '10, [3], [3]', expectedOutput: '1', isHidden: false },
      { input: '100, [0,2,4], [4,2,1]', expectedOutput: '1', isHidden: true },
      { input: '10, [6,8], [3,2]', expectedOutput: '2', isHidden: true },
    ],
  },
  // 4. Max Events Attended
  {
    title: 'Maximum Number of Events Attended',
    slug: 'maximum-number-of-events-attended',
    description: 'You are given an array of `events` where `events[i] = [startDay_i, endDay_i]`. You can attend only one event at any given day. Return the maximum number of events you can attend.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= events.length <= 10^5\n1 <= startDay_i <= endDay_i <= 10^5',
    inputFormat: 'events',
    outputFormat: 'Max attended events count.',
    sampleInput: '[[1,2],[2,3],[3,4]]',
    sampleOutput: '3',
    points: 150,
    hints: ['Min-heap of end days for active events, pick earliest deadline.'],
    codeTemplates: {
      python: `class Solution:\n    def maxEvents(self, events: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    maxEvents(events) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `import heapq
class Solution:
    def maxEvents(self, events: list[list[int]]) -> int:
        events.sort(key=lambda e: e[0])
        heap = []
        ans = i = 0
        n = len(events)
        d = 1
        while i < n or heap:
            if not heap: d = events[i][0]
            while i < n and events[i][0] <= d:
                heapq.heappush(heap, events[i][1])
                i += 1
            while heap and heap[0] < d: heapq.heappop(heap)
            if heap:
                heapq.heappop(heap)
                ans += 1
                d += 1
        return ans`,
      javascript: `class Solution {
    maxEvents(events) {
        events.sort((a, b) => a[0] - b[0]);
        const heap = [];
        const push = (val) => {
            heap.push(val);
            let idx = heap.length - 1;
            while (idx > 0) {
                let p = Math.floor((idx - 1) / 2);
                if (heap[p] > heap[idx]) { [heap[p], heap[idx]] = [heap[idx], heap[p]]; idx = p; }
                else break;
            }
        };
        const pop = () => {
            if (heap.length === 1) return heap.pop();
            const top = heap[0];
            heap[0] = heap.pop();
            let idx = 0;
            while (2 * idx + 1 < heap.length) {
                let left = 2 * idx + 1, right = 2 * idx + 2, smallest = left;
                if (right < heap.length && heap[right] < heap[left]) smallest = right;
                if (heap[idx] > heap[smallest]) { [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]]; idx = smallest; }
                else break;
            }
            return top;
        };
        let ans = 0, i = 0, d = 1;
        const n = events.length;
        while (i < n || heap.length > 0) {
            if (heap.length === 0) d = events[i][0];
            while (i < n && events[i][0] <= d) { push(events[i][1]); i++; }
            while (heap.length > 0 && heap[0] < d) pop();
            if (heap.length > 0) { pop(); ans++; d++; }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Earliest Deadline First with min-heap.',
      algorithm: 'Sort by start day, push active events into min-heap of end dates, pop earliest end day.',
      timeComplexity: 'O(N log N + D log N)',
      spaceComplexity: 'O(N)',
      content: 'EDF scheduling algorithm.',
      referenceCode: `def maxEvents(events): ...`,
    },
    tags: ['Greedy', 'Heap', 'Intervals', 'Sorting'],
    testCases: [
      { input: '[[1,2],[2,3],[3,4]]', expectedOutput: '3', isHidden: false },
      { input: '[[1,2],[2,3],[3,4],[1,2]]', expectedOutput: '4', isHidden: false },
      { input: '[[1,4],[4,4],[2,2],[3,4],[1,1]]', expectedOutput: '4', isHidden: true },
      { input: '[[1,100000]]', expectedOutput: '1', isHidden: true },
    ],
  },
  // 5. Video Stitching
  {
    title: 'Video Stitching Minimum Clips',
    slug: 'video-stitching-minimum-clips',
    description: 'You are given a series of video clips `clips[i] = [start_i, end_i]`. Return the minimum number of clips needed to cover `[0, time]`. If impossible, return -1.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= clips.length <= 100\n0 <= start_i <= end_i <= 100\n1 <= time <= 100',
    inputFormat: 'clips, time',
    outputFormat: 'Minimum clips or -1.',
    sampleInput: '[[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], 10',
    sampleOutput: '3',
    points: 150,
    hints: ['Track furthest reachable position starting at <= current time.'],
    codeTemplates: {
      python: `class Solution:\n    def videoStitching(self, clips: list[list[int]], time: int) -> int:\n        pass`,
      javascript: `class Solution {\n    videoStitching(clips, time) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def videoStitching(self, clips: list[list[int]], time: int) -> int:
        max_reach = [0] * (time + 1)
        for s, e in clips:
            if s <= time: max_reach[s] = max(max_reach[s], e)
        clips_count = curr_end = furthest = 0
        for i in range(time):
            furthest = max(furthest, max_reach[i])
            if i == curr_end:
                if furthest <= i: return -1
                clips_count += 1
                curr_end = furthest
                if curr_end >= time: return clips_count
        return clips_count if curr_end >= time else -1`,
      javascript: `class Solution {
    videoStitching(clips, time) {
        const maxReach = new Array(time + 1).fill(0);
        for (const [s, e] of clips) {
            if (s <= time) maxReach[s] = Math.max(maxReach[s], e);
        }
        let clipsCount = 0, currEnd = 0, furthest = 0;
        for (let i = 0; i < time; i++) {
            furthest = Math.max(furthest, maxReach[i]);
            if (i === currEnd) {
                if (furthest <= i) return -1;
                clipsCount++;
                currEnd = furthest;
                if (currEnd >= time) return clipsCount;
            }
        }
        return currEnd >= time ? clipsCount : -1;
    }
}`,
    },
    editorial: {
      approach: 'Jump Game II interval cover.',
      algorithm: 'Greedily extend to maximum reachable endpoint.',
      timeComplexity: 'O(N + Time)',
      spaceComplexity: 'O(Time)',
      content: 'Minimal interval cover.',
      referenceCode: `def videoStitching(clips, time): ...`,
    },
    tags: ['Greedy', 'Dynamic Programming', 'Intervals'],
    testCases: [
      { input: '[[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], 10', expectedOutput: '3', isHidden: false },
      { input: '[[0,1],[1,2]], 5', expectedOutput: '-1', isHidden: false },
      { input: '[[0,1],[6,8],[0,2],[5,6],[0,4],[0,3],[6,7],[1,3],[4,7],[1,4],[2,5],[2,6],[3,4],[4,5],[5,7],[6,9]], 9', expectedOutput: '3', isHidden: true },
      { input: '[[0,4],[2,8]], 5', expectedOutput: '2', isHidden: true },
    ],
  },
  // 6. Queue Reconstruction by Height
  {
    title: 'Queue Reconstruction by Height',
    slug: 'queue-reconstruction-by-height',
    description: 'You are given an array of people `people = [[h_0, k_0], [h_1, k_1], ...]`. Reconstruct and return the queue.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= people.length <= 2000\n0 <= h_i <= 10^6\n0 <= k_i < people.length',
    inputFormat: 'people',
    outputFormat: 'Reconstructed queue array.',
    sampleInput: '[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]',
    sampleOutput: '[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]',
    points: 150,
    hints: ['Sort by descending height, then ascending k. Insert at index k.'],
    codeTemplates: {
      python: `class Solution:\n    def reconstructQueue(self, people: list[list[int]]) -> list[list[int]]:\n        pass`,
      javascript: `class Solution {\n    reconstructQueue(people) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def reconstructQueue(self, people: list[list[int]]) -> list[list[int]]:
        people.sort(key=lambda p: (-p[0], p[1]))
        queue = []
        for p in people: queue.insert(p[1], p)
        return queue`,
      javascript: `class Solution {
    reconstructQueue(people) {
        people.sort((a, b) => b[0] !== a[0] ? b[0] - a[0] : a[1] - b[1]);
        const queue = [];
        for (const p of people) queue.splice(p[1], 0, p);
        return queue;
    }
}`,
    },
    editorial: {
      approach: 'Greedy insertion by descending height.',
      algorithm: 'Insert into index k of the output list.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N)',
      content: 'Queue reconstruction.',
      referenceCode: `def reconstructQueue(people): ...`,
    },
    tags: ['Greedy', 'Sorting', 'Array'],
    testCases: [
      { input: '[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]', expectedOutput: '[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]', isHidden: false },
      { input: '[[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]', expectedOutput: '[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]', isHidden: false },
      { input: '[[1,0]]', expectedOutput: '[[1,0]]', isHidden: true },
      { input: '[[2,0],[1,1]]', expectedOutput: '[[2,0],[1,1]]', isHidden: true },
    ],
  },
  // 7. Candy Distribution
  {
    title: 'Candy Distribution with Ratings Two-Pass',
    slug: 'candy-distribution-ratings',
    description: 'There are `n` children standing in a line with given ratings. Return the minimum number of candies to distribute such that every child has >= 1 candy and higher rated children get more candies than neighbors.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= ratings.length <= 2 * 10^4\n0 <= ratings[i] <= 2 * 10^4',
    inputFormat: 'ratings',
    outputFormat: 'Total candies integer.',
    sampleInput: '[1,0,2]',
    sampleOutput: '5',
    points: 200,
    hints: ['Left-to-right pass then right-to-left pass.'],
    codeTemplates: {
      python: `class Solution:\n    def candy(self, ratings: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    candy(ratings) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def candy(self, ratings: list[int]) -> int:
        n = len(ratings)
        candies = [1] * n
        for i in range(1, n):
            if ratings[i] > ratings[i - 1]: candies[i] = candies[i - 1] + 1
        for i in range(n - 2, -1, -1):
            if ratings[i] > ratings[i + 1]: candies[i] = max(candies[i], candies[i + 1] + 1)
        return sum(candies)`,
      javascript: `class Solution {
    candy(ratings) {
        const n = ratings.length;
        const candies = new Array(n).fill(1);
        for (let i = 1; i < n; i++) if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
        for (let i = n - 2; i >= 0; i--) if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        return candies.reduce((a, b) => a + b, 0);
    }
}`,
    },
    editorial: {
      approach: 'Two-pass greedy scan.',
      algorithm: 'Enforce left condition forward, right condition backward.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Two-pass linear candy assignment.',
      referenceCode: `def candy(ratings): ...`,
    },
    tags: ['Greedy', 'Array', 'Dynamic Programming'],
    testCases: [
      { input: '[1,0,2]', expectedOutput: '5', isHidden: false },
      { input: '[1,2,2]', expectedOutput: '4', isHidden: false },
      { input: '[1,3,2,2,1]', expectedOutput: '7', isHidden: true },
      { input: '[1]', expectedOutput: '1', isHidden: true },
    ],
  },
  // 8. Remove Duplicate Letters
  {
    title: 'Smallest Subsequence / Remove Duplicate Letters',
    slug: 'remove-duplicate-letters-lexicographical',
    description: 'Given a string `s`, remove duplicate letters so that every letter appears once and only once in smallest lexicographical order.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= s.length <= 10^4\ns consists of lowercase English letters.',
    inputFormat: 's',
    outputFormat: 'Lexicographically smallest string.',
    sampleInput: '"bcabc"',
    sampleOutput: '"abc"',
    points: 150,
    hints: ['Monotonic stack with last-occurrence tracking.'],
    codeTemplates: {
      python: `class Solution:\n    def removeDuplicateLetters(self, s: str) -> str:\n        pass`,
      javascript: `class Solution {\n    removeDuplicateLetters(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def removeDuplicateLetters(self, s: str) -> str:
        last_idx = {ch: i for i, ch in enumerate(s)}
        stack = []
        seen = set()
        for i, ch in enumerate(s):
            if ch not in seen:
                while stack and stack[-1] > ch and last_idx[stack[-1]] > i:
                    seen.remove(stack.pop())
                seen.add(ch)
                stack.append(ch)
        return "".join(stack)`,
      javascript: `class Solution {
    removeDuplicateLetters(s) {
        const lastIdx = {};
        for (let i = 0; i < s.length; i++) lastIdx[s[i]] = i;
        const stack = [], seen = new Set();
        for (let i = 0; i < s.length; i++) {
            const ch = s[i];
            if (!seen.has(ch)) {
                while (stack.length > 0 && stack[stack.length - 1] > ch && lastIdx[stack[stack.length - 1]] > i) {
                    seen.delete(stack.pop());
                }
                seen.add(ch);
                stack.push(ch);
            }
        }
        return stack.join("");
    }
}`,
    },
    editorial: {
      approach: 'Monotonic stack with last-occurrence lookahead.',
      algorithm: 'Greedily pop larger characters when a future instance is guaranteed.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Optimal character deduplication.',
      referenceCode: `def removeDuplicateLetters(s): ...`,
    },
    tags: ['Strings', 'Stack', 'Greedy', 'Monotonic Stack'],
    testCases: [
      { input: '"bcabc"', expectedOutput: '"abc"', isHidden: false },
      { input: '"cbacdcbc"', expectedOutput: '"acdb"', isHidden: false },
      { input: '"abacb"', expectedOutput: '"abc"', isHidden: true },
      { input: '"z"', expectedOutput: '"z"', isHidden: true },
    ],
  },
  // 9. Create Maximum Number
  {
    title: 'Create Maximum Number from Two Arrays',
    slug: 'create-maximum-number-two-arrays',
    description: 'You are given two integer arrays `nums1` and `nums2` and an integer `k`. Create the maximum number of length `k` preserving relative order of digits from each array.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= nums1.length, nums2.length <= 500\n1 <= k <= nums1.length + nums2.length',
    inputFormat: 'nums1, nums2, k',
    outputFormat: 'List of digits.',
    sampleInput: '[3,4,6,5], [9,1,2,5,8,3], 5',
    sampleOutput: '[9,8,6,5,3]',
    points: 200,
    hints: ['Pick i elements from nums1 and k-i from nums2 using monotonic stack, then merge.'],
    codeTemplates: {
      python: `class Solution:\n    def maxNumber(self, nums1: list[int], nums2: list[int], k: int) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    maxNumber(nums1, nums2, k) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def maxNumber(self, nums1: list[int], nums2: list[int], k: int) -> list[int]:
        def max_single(nums, count):
            drop = len(nums) - count
            stack = []
            for num in nums:
                while drop and stack and stack[-1] < num:
                    stack.pop()
                    drop -= 1
                stack.append(num)
            return stack[:count]
        def merge(a, b):
            return [max(a, b).pop(0) for _ in range(len(a) + len(b))]
        best = []
        for i in range(max(0, k - len(nums2)), min(k, len(nums1)) + 1):
            sub1 = max_single(nums1, i)
            sub2 = max_single(nums2, k - i)
            candidate = merge(sub1, sub2)
            if candidate > best: best = candidate
        return best`,
      javascript: `class Solution {
    maxNumber(nums1, nums2, k) {
        function maxSingle(nums, count) {
            let drop = nums.length - count;
            const stack = [];
            for (const num of nums) {
                while (drop > 0 && stack.length > 0 && stack[stack.length - 1] < num) {
                    stack.pop(); drop--;
                }
                stack.push(num);
            }
            return stack.slice(0, count);
        }
        function compare(a, i, b, j) {
            while (i < a.length && j < b.length) {
                if (a[i] !== b[j]) return a[i] - b[j];
                i++; j++;
            }
            return (a.length - i) - (b.length - j);
        }
        function merge(a, b) {
            const res = [];
            let i = 0, j = 0;
            while (i < a.length || j < b.length) {
                if (compare(a, i, b, j) > 0) res.push(a[i++]);
                else res.push(b[j++]);
            }
            return res;
        }
        let best = [];
        for (let i = Math.max(0, k - nums2.length); i <= Math.min(k, nums1.length); i++) {
            const sub1 = maxSingle(nums1, i);
            const sub2 = maxSingle(nums2, k - i);
            const candidate = merge(sub1, sub2);
            if (best.length === 0 || compare(candidate, 0, best, 0) > 0) best = candidate;
        }
        return best;
    }
}`,
    },
    editorial: {
      approach: 'Subsequence Monotonic Stack & Merge.',
      algorithm: 'Enumerate partition sizes i and k-i, extract maximal subsequences, merge lexicographically.',
      timeComplexity: 'O(k * (m + n)^2)',
      spaceComplexity: 'O(k)',
      content: 'Optimal digits extraction.',
      referenceCode: `def maxNumber(nums1, nums2, k): ...`,
    },
    tags: ['Greedy', 'Monotonic Stack', 'Two Pointers'],
    testCases: [
      { input: '[3,4,6,5], [9,1,2,5,8,3], 5', expectedOutput: '[9,8,6,5,3]', isHidden: false },
      { input: '[6,7], [6,0,4], 5', expectedOutput: '[6,7,6,0,4]', isHidden: false },
      { input: '[3,9], [8,9], 3', expectedOutput: '[9,8,9]', isHidden: true },
      { input: '[1,2], [3,4], 2', expectedOutput: '[4,2]', isHidden: true },
    ],
  },
  // 10. Advantage Shuffle
  {
    title: 'Advantage Shuffle Greedy Best Match',
    slug: 'advantage-shuffle-greedy',
    description: 'Given two integer arrays `nums1` and `nums2`, return any permutation of `nums1` that maximizes the count of indices where `nums1[i] > nums2[i]`.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= nums1.length == nums2.length <= 10^5\n0 <= nums1[i], nums2[i] <= 10^9',
    inputFormat: 'nums1, nums2',
    outputFormat: 'Permuted nums1 array.',
    sampleInput: '[2,7,11,15], [1,10,4,11]',
    sampleOutput: '[2,11,7,15]',
    points: 150,
    hints: ['Sort nums1. Match largest opponent with our highest card if we win; otherwise sacrifice smallest.'],
    codeTemplates: {
      python: `class Solution:\n    def advantageCount(self, nums1: list[int], nums2: list[int]) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    advantageCount(nums1, nums2) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def advantageCount(self, nums1: list[int], nums2: list[int]) -> list[int]:
        nums1.sort()
        idx = sorted(range(len(nums2)), key=lambda i: nums2[i])
        ans = [0] * len(nums1)
        lo, hi = 0, len(nums1) - 1
        for i in reversed(idx):
            if nums1[hi] > nums2[i]:
                ans[i] = nums1[hi]
                hi -= 1
            else:
                ans[i] = nums1[lo]
                lo += 1
        return ans`,
      javascript: `class Solution {
    advantageCount(nums1, nums2) {
        nums1.sort((a, b) => a - b);
        const idx = nums2.map((_, i) => i).sort((a, b) => nums2[a] - nums2[b]);
        const ans = new Array(nums1.length);
        let lo = 0, hi = nums1.length - 1;
        for (let k = idx.length - 1; k >= 0; k--) {
            const i = idx[k];
            if (nums1[hi] > nums2[i]) ans[i] = nums1[hi--];
            else ans[i] = nums1[lo++];
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Tian Ji horse race greedy pairing.',
      algorithm: 'Assign largest possible winner, else dump smallest element.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      content: 'Greedy advantage maximization.',
      referenceCode: `def advantageCount(nums1, nums2): ...`,
    },
    tags: ['Greedy', 'Two Pointers', 'Sorting'],
    testCases: [
      { input: '[2,7,11,15], [1,10,4,11]', expectedOutput: '[2,11,7,15]', isHidden: false },
      { input: '[12,24,8,32], [13,25,32,11]', expectedOutput: '[24,32,8,12]', isHidden: false },
      { input: '[2,0,4,1,2], [1,3,0,0,2]', expectedOutput: '[2,0,1,2,4]', isHidden: true },
      { input: '[1], [1]', expectedOutput: '[1]', isHidden: true },
    ],
  },
  // 11. Boats to Save People
  {
    title: 'Boats to Save People Two Pointers',
    slug: 'boats-to-save-people',
    description: 'Given `people` weights array and boat weight `limit`, return minimum boats to carry everyone where each boat carries at most 2 people.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= people.length <= 5 * 10^4\n1 <= people[i] <= limit <= 3 * 10^4',
    inputFormat: 'people, limit',
    outputFormat: 'Minimum boats count.',
    sampleInput: '[1,2], 3',
    sampleOutput: '1',
    points: 150,
    hints: ['Pair heaviest with lightest if within limit.'],
    codeTemplates: {
      python: `class Solution:\n    def numRescueBoats(self, people: list[int], limit: int) -> int:\n        pass`,
      javascript: `class Solution {\n    numRescueBoats(people, limit) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def numRescueBoats(self, people: list[int], limit: int) -> int:
        people.sort()
        l, r = 0, len(people) - 1
        boats = 0
        while l <= r:
            if people[l] + people[r] <= limit: l += 1
            r -= 1
            boats += 1
        return boats`,
      javascript: `class Solution {
    numRescueBoats(people, limit) {
        people.sort((a, b) => a - b);
        let l = 0, r = people.length - 1, boats = 0;
        while (l <= r) {
            if (people[l] + people[r] <= limit) l++;
            r--;
            boats++;
        }
        return boats;
    }
}`,
    },
    editorial: {
      approach: 'Two-pointer greedy pairing.',
      algorithm: 'Sort weights, greedily pair heaviest and lightest.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(1)',
      content: 'Minimal boat assignment.',
      referenceCode: `def numRescueBoats(people, limit): ...`,
    },
    tags: ['Greedy', 'Two Pointers', 'Sorting'],
    testCases: [
      { input: '[1,2], 3', expectedOutput: '1', isHidden: false },
      { input: '[3,2,2,1], 3', expectedOutput: '3', isHidden: false },
      { input: '[3,5,3,4], 5', expectedOutput: '4', isHidden: true },
      { input: '[5,1,4,2], 6', expectedOutput: '2', isHidden: true },
    ],
  },
  // 12. Score After Flipping Matrix
  {
    title: 'Score After Flipping Matrix',
    slug: 'score-after-flipping-matrix',
    description: 'You are given an `m x n` binary matrix `grid`. You can flip any row or column. Return the highest possible score interpreting each row as a binary number.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= m, n <= 20',
    inputFormat: 'grid',
    outputFormat: 'Maximum score integer.',
    sampleInput: '[[0,0,1,1],[1,0,1,0],[1,1,0,0]]',
    sampleOutput: '39',
    points: 150,
    hints: ['Make column 0 all 1s by flipping rows, then flip columns to maximize 1s.'],
    codeTemplates: {
      python: `class Solution:\n    def matrixScore(self, grid: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    matrixScore(grid) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def matrixScore(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        score = m * (1 << (n - 1))
        for j in range(1, n):
            col_ones = sum(grid[i][j] if grid[i][0] == 1 else 1 - grid[i][j] for i in range(m))
            col_max = max(col_ones, m - col_ones)
            score += col_max * (1 << (n - 1 - j))
        return score`,
      javascript: `class Solution {
    matrixScore(grid) {
        const m = grid.length, n = grid[0].length;
        let score = m * (1 << (n - 1));
        for (let j = 1; j < n; j++) {
            let ones = 0;
            for (let i = 0; i < m; i++) {
                const val = grid[i][0] === 1 ? grid[i][j] : 1 - grid[i][j];
                if (val === 1) ones++;
            }
            const colMax = Math.max(ones, m - ones);
            score += colMax * (1 << (n - 1 - j));
        }
        return score;
    }
}`,
    },
    editorial: {
      approach: 'Greedy bitwise row/column optimization.',
      algorithm: 'Fix column 0 to 1s, then maximize ones per column.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(1)',
      content: 'Independent column optimization.',
      referenceCode: `def matrixScore(grid): ...`,
    },
    tags: ['Greedy', 'Bit Manipulation', 'Matrix'],
    testCases: [
      { input: '[[0,0,1,1],[1,0,1,0],[1,1,0,0]]', expectedOutput: '39', isHidden: false },
      { input: '[[0]]', expectedOutput: '1', isHidden: false },
      { input: '[[0,1],[0,1],[0,1],[0,0]]', expectedOutput: '11', isHidden: true },
      { input: '[[1,1,1],[1,0,0],[0,0,0]]', expectedOutput: '21', isHidden: true },
    ],
  },
  // 13. Two City Scheduling
  {
    title: 'Two City Scheduling Min Cost',
    slug: 'two-city-scheduling-cost',
    description: 'Given `costs[i] = [aCost_i, bCost_i]`, return minimum cost to fly exactly n people to city A and n people to city B.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'costs.length is even, 2 <= costs.length <= 100',
    inputFormat: 'costs',
    outputFormat: 'Minimum total cost integer.',
    sampleInput: '[[10,20],[30,200],[400,50],[30,20]]',
    sampleOutput: '110',
    points: 150,
    hints: ['Sort by (aCost - bCost). Send first n to A, rest to B.'],
    codeTemplates: {
      python: `class Solution:\n    def twoCitySchedCost(self, costs: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    twoCitySchedCost(costs) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def twoCitySchedCost(self, costs: list[list[int]]) -> int:
        costs.sort(key=lambda x: x[0] - x[1])
        n = len(costs) // 2
        return sum(costs[i][0] for i in range(n)) + sum(costs[i][1] for i in range(n, 2 * n))`,
      javascript: `class Solution {
    twoCitySchedCost(costs) {
        costs.sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]));
        const n = costs.length / 2;
        let total = 0;
        for (let i = 0; i < n; i++) total += costs[i][0];
        for (let i = n; i < 2 * n; i++) total += costs[i][1];
        return total;
    }
}`,
    },
    editorial: {
      approach: 'Opportunity cost sorting.',
      algorithm: 'Sort by (aCost - bCost) delta.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(1)',
      content: 'Greedy differential assignment.',
      referenceCode: `def twoCitySchedCost(costs): ...`,
    },
    tags: ['Greedy', 'Sorting', 'Array'],
    testCases: [
      { input: '[[10,20],[30,200],[400,50],[30,20]]', expectedOutput: '110', isHidden: false },
      { input: '[[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]', expectedOutput: '1859', isHidden: false },
      { input: '[[10,10],[10,10]]', expectedOutput: '20', isHidden: true },
      { input: '[[1,2],[2,1]]', expectedOutput: '2', isHidden: true },
    ],
  },
  // 14. Gas Station Circuit
  {
    title: 'Complete Circuit Gas Station',
    slug: 'gas-station-circuit',
    description: 'There are `n` gas stations along a circular route. Return starting gas station index to complete the circuit once, or -1.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= gas.length == cost.length <= 10^5',
    inputFormat: 'gas, cost',
    outputFormat: 'Starting station index or -1.',
    sampleInput: '[1,2,3,4,5], [3,4,5,1,2]',
    sampleOutput: '3',
    points: 150,
    hints: ['If sum(gas) >= sum(cost), a solution exists. Reset start when running tank < 0.'],
    codeTemplates: {
      python: `class Solution:\n    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    canCompleteCircuit(gas, cost) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:
        if sum(gas) < sum(cost): return -1
        total = start = 0
        for i in range(len(gas)):
            total += gas[i] - cost[i]
            if total < 0:
                start = i + 1
                total = 0
        return start`,
      javascript: `class Solution {
    canCompleteCircuit(gas, cost) {
        let totalGas = 0, totalCost = 0;
        for (let i = 0; i < gas.length; i++) { totalGas += gas[i]; totalCost += cost[i]; }
        if (totalGas < totalCost) return -1;
        let start = 0, curr = 0;
        for (let i = 0; i < gas.length; i++) {
            curr += gas[i] - cost[i];
            if (curr < 0) { start = i + 1; curr = 0; }
        }
        return start;
    }
}`,
    },
    editorial: {
      approach: 'Single-pass greedy reset.',
      algorithm: 'Reset start pointer whenever prefix sum dips negative.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Circular route greedy traversal.',
      referenceCode: `def canCompleteCircuit(gas, cost): ...`,
    },
    tags: ['Greedy', 'Array'],
    testCases: [
      { input: '[1,2,3,4,5], [3,4,5,1,2]', expectedOutput: '3', isHidden: false },
      { input: '[2,3,4], [3,4,3]', expectedOutput: '-1', isHidden: false },
      { input: '[5,1,2,3,4], [4,4,1,5,1]', expectedOutput: '4', isHidden: true },
      { input: '[2], [2]', expectedOutput: '0', isHidden: true },
    ],
  },
  // 15. Partition Labels
  {
    title: 'Partition Labels by Last Occurrence',
    slug: 'partition-labels-greedy',
    description: 'Partition string `s` into as many parts as possible so that each letter appears in at most one part. Return list of part sizes.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= s.length <= 500',
    inputFormat: 's',
    outputFormat: 'List of partition lengths.',
    sampleInput: '"ababcbacadefegdehijhklij"',
    sampleOutput: '[9,7,8]',
    points: 150,
    hints: ['Record last index of each char, expand right boundary greedily.'],
    codeTemplates: {
      python: `class Solution:\n    def partitionLabels(self, s: str) -> list[int]:\n        pass`,
      javascript: `class Solution {\n    partitionLabels(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def partitionLabels(self, s: str) -> list[int]:
        last = {ch: i for i, ch in enumerate(s)}
        j = anchor = 0
        ans = []
        for i, ch in enumerate(s):
            j = max(j, last[ch])
            if i == j:
                ans.append(i - anchor + 1)
                anchor = i + 1
        return ans`,
      javascript: `class Solution {
    partitionLabels(s) {
        const last = {};
        for (let i = 0; i < s.length; i++) last[s[i]] = i;
        let j = 0, anchor = 0;
        const ans = [];
        for (let i = 0; i < s.length; i++) {
            j = Math.max(j, last[s[i]]);
            if (i === j) {
                ans.push(i - anchor + 1);
                anchor = i + 1;
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Greedy interval boundary extension.',
      algorithm: 'Expand interval boundary until all contained characters have concluded.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Linear partition by last index.',
      referenceCode: `def partitionLabels(s): ...`,
    },
    tags: ['Greedy', 'Two Pointers', 'Hash Table', 'String'],
    testCases: [
      { input: '"ababcbacadefegdehijhklij"', expectedOutput: '[9,7,8]', isHidden: false },
      { input: '"eccbbbbdec"', expectedOutput: '[10]', isHidden: false },
      { input: '"abc"', expectedOutput: '[1,1,1]', isHidden: true },
      { input: '"a"', expectedOutput: '[1]', isHidden: true },
    ],
  },
  // 16. Task Scheduler
  {
    title: 'Task Scheduler with Cooling Interval',
    slug: 'task-scheduler-idle-slots',
    description: 'Given `tasks` characters and cooldown `n`, return least CPU units to finish all tasks.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= tasks.length <= 10^4\n0 <= n <= 100',
    inputFormat: 'tasks, n',
    outputFormat: 'Minimum CPU units integer.',
    sampleInput: '["A","A","A","B","B","B"], 2',
    sampleOutput: '8',
    points: 150,
    hints: ['Formula: max(len(tasks), (max_freq - 1) * (n + 1) + max_count).'],
    codeTemplates: {
      python: `class Solution:\n    def leastInterval(self, tasks: list[str], n: int) -> int:\n        pass`,
      javascript: `class Solution {\n    leastInterval(tasks, n) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `from collections import Counter
class Solution:
    def leastInterval(self, tasks: list[str], n: int) -> int:
        freq = Counter(tasks)
        max_freq = max(freq.values())
        max_count = sum(1 for v in freq.values() if v == max_freq)
        return max(len(tasks), (max_freq - 1) * (n + 1) + max_count)`,
      javascript: `class Solution {
    leastInterval(tasks, n) {
        const counts = {};
        for (const t of tasks) counts[t] = (counts[t] || 0) + 1;
        const maxFreq = Math.max(...Object.values(counts));
        let maxCount = 0;
        for (const v of Object.values(counts)) if (v === maxFreq) maxCount++;
        return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
    }
}`,
    },
    editorial: {
      approach: 'Idle slot bucket math formula.',
      algorithm: 'Fill frame of size (max_freq - 1) * (n + 1).',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'CPU scheduling slot formula.',
      referenceCode: `def leastInterval(tasks, n): ...`,
    },
    tags: ['Greedy', 'Math', 'Counting', 'Heap'],
    testCases: [
      { input: '["A","A","A","B","B","B"], 2', expectedOutput: '8', isHidden: false },
      { input: '["A","A","A","B","B","B"], 0', expectedOutput: '6', isHidden: false },
      { input: '["A","A","A","A","A","A","B","C","D","E","F","G"], 2', expectedOutput: '16', isHidden: true },
      { input: '["A"], 2', expectedOutput: '1', isHidden: true },
    ],
  },
  // 17. Minimum Arrows
  {
    title: 'Minimum Arrows to Burst Balloons',
    slug: 'minimum-arrows-to-burst-balloons',
    description: 'Given 2D array `points` where `points[i] = [xstart, xend]`, return minimum arrows to burst all balloons.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= points.length <= 10^5',
    inputFormat: 'points',
    outputFormat: 'Minimum arrows count.',
    sampleInput: '[[10,16],[2,8],[1,6],[7,12]]',
    sampleOutput: '2',
    points: 150,
    hints: ['Sort by xend, shoot arrow at current end.'],
    codeTemplates: {
      python: `class Solution:\n    def findMinArrowShots(self, points: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    findMinArrowShots(points) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def findMinArrowShots(self, points: list[list[int]]) -> int:
        if not points: return 0
        points.sort(key=lambda p: p[1])
        arrows = 1
        curr_end = points[0][1]
        for p in points[1:]:
            if p[0] > curr_end:
                arrows += 1
                curr_end = p[1]
        return arrows`,
      javascript: `class Solution {
    findMinArrowShots(points) {
        if (points.length === 0) return 0;
        points.sort((a, b) => a[1] - b[1]);
        let arrows = 1, currEnd = points[0][1];
        for (let i = 1; i < points.length; i++) {
            if (points[i][0] > currEnd) {
                arrows++;
                currEnd = points[i][1];
            }
        }
        return arrows;
    }
}`,
    },
    editorial: {
      approach: 'Interval scheduling greedy selection.',
      algorithm: 'Sort by interval end and place arrow greedily at right boundary.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(1)',
      content: 'Minimal point stabbing for intervals.',
      referenceCode: `def findMinArrowShots(points): ...`,
    },
    tags: ['Greedy', 'Intervals', 'Sorting'],
    testCases: [
      { input: '[[10,16],[2,8],[1,6],[7,12]]', expectedOutput: '2', isHidden: false },
      { input: '[[1,2],[3,4],[5,6],[7,8]]', expectedOutput: '4', isHidden: false },
      { input: '[[1,2],[2,3],[3,4],[4,5]]', expectedOutput: '2', isHidden: true },
      { input: '[[1,10]]', expectedOutput: '1', isHidden: true },
    ],
  },
  // 18. Non-overlapping Intervals
  {
    title: 'Non-overlapping Intervals Minimum Removal',
    slug: 'non-overlapping-intervals-erase',
    description: 'Given an array of intervals `intervals`, return the minimum number of intervals to remove to make the rest non-overlapping.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= intervals.length <= 10^5',
    inputFormat: 'intervals',
    outputFormat: 'Minimum removals integer.',
    sampleInput: '[[1,2],[2,3],[3,4],[1,3]]',
    sampleOutput: '1',
    points: 150,
    hints: ['Equivalent to total intervals minus max compatible intervals sorted by end.'],
    codeTemplates: {
      python: `class Solution:\n    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:\n        pass`,
      javascript: `class Solution {\n    eraseOverlapIntervals(intervals) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:
        if not intervals: return 0
        intervals.sort(key=lambda x: x[1])
        kept = 1
        end = intervals[0][1]
        for inv in intervals[1:]:
            if inv[0] >= end:
                kept += 1
                end = inv[1]
        return len(intervals) - kept`,
      javascript: `class Solution {
    eraseOverlapIntervals(intervals) {
        if (intervals.length === 0) return 0;
        intervals.sort((a, b) => a[1] - b[1]);
        let kept = 1, end = intervals[0][1];
        for (let i = 1; i < intervals.length; i++) {
            if (intervals[i][0] >= end) {
                kept++;
                end = intervals[i][1];
            }
        }
        return intervals.length - kept;
    }
}`,
    },
    editorial: {
      approach: 'Greedy activity selection.',
      algorithm: 'Sort by end time and pick max non-overlapping set.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(1)',
      content: 'Activity selection interval removal.',
      referenceCode: `def eraseOverlapIntervals(intervals): ...`,
    },
    tags: ['Greedy', 'Intervals', 'Sorting', 'Dynamic Programming'],
    testCases: [
      { input: '[[1,2],[2,3],[3,4],[1,3]]', expectedOutput: '1', isHidden: false },
      { input: '[[1,2],[1,2],[1,2]]', expectedOutput: '2', isHidden: false },
      { input: '[[1,2],[2,3]]', expectedOutput: '0', isHidden: true },
      { input: '[[1,100],[11,22],[1,11],[2,12]]', expectedOutput: '2', isHidden: true },
    ],
  },
  // 19. Minimum Cost to Move Chips
  {
    title: 'Min Cost to Move Chips to Same Position',
    slug: 'minimum-cost-to-move-chips-to-the-same-position',
    description: 'We have `n` chips. The position of the i-th chip is `position[i]`. Moving a chip 2 steps costs 0, moving 1 step costs 1. Return the minimum cost to move all chips to the same position.',
    difficulty: 'EASY',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= position.length <= 100\n1 <= position[i] <= 10^9',
    inputFormat: 'position',
    outputFormat: 'Minimum cost integer.',
    sampleInput: '[1,2,3]',
    sampleOutput: '1',
    points: 100,
    hints: ['All chips at even positions can move to 0 for free. All odd to 1 for free. Cost is min(even_count, odd_count).'],
    codeTemplates: {
      python: `class Solution:\n    def minCostToMoveChips(self, position: list[int]) -> int:\n        pass`,
      javascript: `class Solution {\n    minCostToMoveChips(position) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def minCostToMoveChips(self, position: list[int]) -> int:
        even = sum(1 for p in position if p % 2 == 0)
        odd = len(position) - even
        return min(even, odd)`,
      javascript: `class Solution {
    minCostToMoveChips(position) {
        let even = 0;
        for (const p of position) if (p % 2 === 0) even++;
        return Math.min(even, position.length - even);
    }
}`,
    },
    editorial: {
      approach: 'Parity grouping math.',
      algorithm: 'Move even to position 0 (cost 0) and odd to position 1 (cost 0). Move the smaller group by 1 step.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      content: 'Parity invariant cost minimization.',
      referenceCode: `def minCostToMoveChips(position): ...`,
    },
    tags: ['Greedy', 'Math', 'Array'],
    testCases: [
      { input: '[1,2,3]', expectedOutput: '1', isHidden: false },
      { input: '[2,2,2,3,3]', expectedOutput: '2', isHidden: false },
      { input: '[1,1000000000]', expectedOutput: '1', isHidden: true },
      { input: '[2,2,2]', expectedOutput: '0', isHidden: true },
    ],
  },
];

writePack('pack-500-part-f.ts', 'pack500PartFDefs', packF);
