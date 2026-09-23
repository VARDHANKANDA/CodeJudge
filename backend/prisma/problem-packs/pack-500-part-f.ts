import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack500PartFDefs: ProblemDef[] = [
  {
    "title": "Sweep Line Rectangle Area II",
    "slug": "sweep-line-rectangle-area-ii",
    "description": "You are given a 2D array of rectangles where `rectangles[i] = [x1, y1, x2, y2]`, indicating a rectangle with bottom-left coordinate `(x1, y1)` and top-right coordinate `(x2, y2)`. Return the total area covered by all rectangles in the plane modulo `10^9 + 7`.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= rectangles.length <= 200\nrectangles[i].length == 4\n0 <= x1 < x2 <= 10^9\n0 <= y1 < y2 <= 10^9",
    "inputFormat": "rectangles",
    "outputFormat": "Total union area modulo 1000000007.",
    "sampleInput": "[[0,0,2,2],[1,0,2,3],[1,0,3,1]]",
    "sampleOutput": "6",
    "points": 200,
    "hints": [
      "Collect all unique x coordinates and sort them.",
      "For each consecutive vertical slab between x_i and x_{i+1}, collect all y-intervals from rectangles that span this slab.",
      "Merge the 1D y-intervals to compute the total covered vertical height.",
      "Add (x_{i+1} - x_i) * total_height to the answer."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def rectangleArea(self, rectangles: list[list[int]]) -> int:\n        pass",
      "javascript": "class Solution {\n    rectangleArea(rectangles) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def rectangleArea(self, rectangles: list[list[int]]) -> int:\n        MOD = 1_000_000_007\n        x_coords = sorted(list(set([r[0] for r in rectangles] + [r[2] for r in rectangles])))\n        total_area = 0\n        \n        for i in range(len(x_coords) - 1):\n            x1, x2 = x_coords[i], x_coords[i + 1]\n            width = x2 - x1\n            if width == 0:\n                continue\n                \n            intervals = []\n            for rx1, ry1, rx2, ry2 in rectangles:\n                if rx1 <= x1 and x2 <= rx2:\n                    intervals.append((ry1, ry2))\n                    \n            if not intervals:\n                continue\n                \n            intervals.sort()\n            cur_y1, cur_y2 = intervals[0]\n            height = 0\n            for y1, y2 in intervals[1:]:\n                if y1 > cur_y2:\n                    height += cur_y2 - cur_y1\n                    cur_y1, cur_y2 = y1, y2\n                else:\n                    cur_y2 = max(cur_y2, y2)\n            height += cur_y2 - cur_y1\n            \n            total_area = (total_area + width * height) % MOD\n            \n        return total_area",
      "javascript": "class Solution {\n    rectangleArea(rectangles) {\n        const MOD = 1000000007n;\n        const xSet = new Set();\n        for (const [x1, , x2, ] of rectangles) {\n            xSet.add(x1);\n            xSet.add(x2);\n        }\n        const xCoords = Array.from(xSet).sort((a, b) => a - b);\n        let totalArea = 0n;\n        \n        for (let i = 0; i < xCoords.length - 1; i++) {\n            const x1 = xCoords[i];\n            const x2 = xCoords[i + 1];\n            const width = BigInt(x2 - x1);\n            if (width === 0n) continue;\n            \n            const intervals = [];\n            for (const [rx1, ry1, rx2, ry2] of rectangles) {\n                if (rx1 <= x1 && x2 <= rx2) {\n                    intervals.push([ry1, ry2]);\n                }\n            }\n            if (intervals.length === 0) continue;\n            \n            intervals.sort((a, b) => a[0] - b[0]);\n            let [curY1, curY2] = intervals[0];\n            let height = 0;\n            for (let j = 1; j < intervals.length; j++) {\n                const [y1, y2] = intervals[j];\n                if (y1 > curY2) {\n                    height += curY2 - curY1;\n                    curY1 = y1;\n                    curY2 = y2;\n                } else {\n                    curY2 = Math.max(curY2, y2);\n                }\n            }\n            height += curY2 - curY1;\n            \n            totalArea = (totalArea + width * BigInt(height)) % MOD;\n        }\n        return Number(totalArea);\n    }\n}"
    },
    "editorial": {
      "approach": "Coordinate compression sweep-line over x-slabs.",
      "algorithm": "Discretize x-coordinates into vertical stripes. For each stripe, merge 1D intervals in O(N log N).",
      "timeComplexity": "O(N^2 log N)",
      "spaceComplexity": "O(N)",
      "content": "Classic computational geometry sweep-line algorithm.",
      "referenceCode": "def rectangleArea(rectangles: list[list[int]]) -> int: ..."
    },
    "tags": [
      "Geometry",
      "Sweep Line",
      "Array",
      "Segment Tree"
    ],
    "testCases": [
      {
        "input": "[[0,0,2,2],[1,0,2,3],[1,0,3,1]]",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "input": "[[0,0,1000000000,1000000000]]",
        "expectedOutput": "49",
        "isHidden": false
      },
      {
        "input": "[[0,0,1,1],[2,2,3,3]]",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "input": "[[0,0,3,3],[1,1,2,2]]",
        "expectedOutput": "9",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Interval List Intersections",
    "slug": "interval-list-intersections",
    "description": "You are given two lists of closed intervals, `firstList` and `secondList`, where each list is pairwise disjoint and in sorted order. Return the intersection of these two interval lists.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "0 <= firstList.length, secondList.length <= 1000\nfirstList[i].length == secondList[j].length == 2\n0 <= start_i <= end_i <= 10^9",
    "inputFormat": "firstList, secondList",
    "outputFormat": "List of intersecting intervals.",
    "sampleInput": "[[0,2],[5,10],[13,23],[24,25]], [[1,5],[8,12],[15,24],[25,26]]",
    "sampleOutput": "[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]",
    "points": 150,
    "hints": [
      "Use two pointers i and j.",
      "Intersection of [a1, a2] and [b1, b2] is [max(a1, b1), min(a2, b2)].",
      "It is valid if max(a1, b1) <= min(a2, b2).",
      "Increment pointer corresponding to the interval that finishes earlier (min(a2, b2))."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def intervalIntersection(self, firstList: list[list[int]], secondList: list[list[int]]) -> list[list[int]]:\n        pass",
      "javascript": "class Solution {\n    intervalIntersection(firstList, secondList) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def intervalIntersection(self, firstList: list[list[int]], secondList: list[list[int]]) -> list[list[int]]:\n        i = j = 0\n        ans = []\n        while i < len(firstList) and j < len(secondList):\n            lo = max(firstList[i][0], secondList[j][0])\n            hi = min(firstList[i][1], secondList[j][1])\n            if lo <= hi:\n                ans.append([lo, hi])\n            if firstList[i][1] < secondList[j][1]:\n                i += 1\n            else:\n                j += 1\n        return ans",
      "javascript": "class Solution {\n    intervalIntersection(firstList, secondList) {\n        let i = 0, j = 0;\n        const ans = [];\n        while (i < firstList.length && j < secondList.length) {\n            const lo = Math.max(firstList[i][0], secondList[j][0]);\n            const hi = Math.min(firstList[i][1], secondList[j][1]);\n            if (lo <= hi) {\n                ans.push([lo, hi]);\n            }\n            if (firstList[i][1] < secondList[j][1]) {\n                i++;\n            } else {\n                j++;\n            }\n        }\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "Two-pointer interval scan.",
      "algorithm": "Compute overlapping segment [max(start), min(end)] and advance the earlier terminating interval.",
      "timeComplexity": "O(N + M)",
      "spaceComplexity": "O(N + M)",
      "content": "Optimal linear scan over sorted disjoint intervals.",
      "referenceCode": "def intervalIntersection(firstList: list[list[int]], secondList: list[list[int]]) -> list[list[int]]: ..."
    },
    "tags": [
      "Intervals",
      "Two Pointers",
      "Array"
    ],
    "testCases": [
      {
        "input": "[[0,2],[5,10],[13,23],[24,25]], [[1,5],[8,12],[15,24],[25,26]]",
        "expectedOutput": "[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]",
        "isHidden": false
      },
      {
        "input": "[[1,3],[5,9]], []",
        "expectedOutput": "[]",
        "isHidden": false
      },
      {
        "input": "[[1,7]], [[3,10]]",
        "expectedOutput": "[[3,7]]",
        "isHidden": true
      },
      {
        "input": "[[3,5],[9,20]], [[4,5],[7,10],[11,12],[14,15],[16,20]]",
        "expectedOutput": "[[4,5],[9,10],[11,12],[14,15],[16,20]]",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Car Fleet Arrival Groups",
    "slug": "car-fleet-collision-time",
    "description": "There are `n` cars at given starting positions `position` traveling toward a target at miles per hour `speed`. A car cannot pass another car ahead of it, but can catch up and drive at the same speed. Return the number of car fleets that arrive at the destination.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "n == position.length == speed.length\n1 <= n <= 10^5\n0 < target <= 10^6\n0 <= position[i] < target\n0 < speed[i] <= 10^6\nAll position values are unique.",
    "inputFormat": "target, position, speed",
    "outputFormat": "Number of car fleets integer.",
    "sampleInput": "12, [10,8,0,5,3], [2,4,1,1,3]",
    "sampleOutput": "3",
    "points": 150,
    "hints": [
      "Calculate the time to reach target for each car: (target - position[i]) / speed[i].",
      "Sort cars in descending order of starting positions.",
      "Maintain a monotonic stack of arrival times: if a car behind arrives earlier or at the same time, it joins the fleet ahead."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def carFleet(self, target: int, position: list[int], speed: list[int]) -> int:\n        pass",
      "javascript": "class Solution {\n    carFleet(target, position, speed) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def carFleet(self, target: int, position: list[int], speed: list[int]) -> int:\n        cars = sorted(zip(position, speed), reverse=True)\n        stack = []\n        for pos, spd in cars:\n            time = (target - pos) / spd\n            if not stack or time > stack[-1]:\n                stack.append(time)\n        return len(stack)",
      "javascript": "class Solution {\n    carFleet(target, position, speed) {\n        const cars = position.map((p, i) => [p, speed[i]]).sort((a, b) => b[0] - a[0]);\n        const stack = [];\n        for (const [pos, spd] of cars) {\n            const time = (target - pos) / spd;\n            if (stack.length === 0 || time > stack[stack.length - 1]) {\n                stack.push(time);\n            }\n        }\n        return stack.length;\n    }\n}"
    },
    "editorial": {
      "approach": "Monotonic stack over descending start positions.",
      "algorithm": "A trailing car merges into the lead car's fleet if its individual arrival time <= lead car's arrival time.",
      "timeComplexity": "O(N log N)",
      "spaceComplexity": "O(N)",
      "content": "Sorting from closest to target outward creates deterministic arrival bottlenecks.",
      "referenceCode": "def carFleet(target: int, position: list[int], speed: list[int]) -> int: ..."
    },
    "tags": [
      "Monotonic Stack",
      "Sorting",
      "Greedy",
      "Array"
    ],
    "testCases": [
      {
        "input": "12, [10,8,0,5,3], [2,4,1,1,3]",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "10, [3], [3]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "100, [0,2,4], [4,2,1]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "10, [6,8], [3,2]",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Maximum Number of Events Attended",
    "slug": "maximum-number-of-events-attended",
    "description": "You are given an array of `events` where `events[i] = [startDay_i, endDay_i]`. You can attend only one event at any given day. Return the maximum number of events you can attend.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= events.length <= 10^5\nevents[i].length == 2\n1 <= startDay_i <= endDay_i <= 10^5",
    "inputFormat": "events",
    "outputFormat": "Max attended events count.",
    "sampleInput": "[[1,2],[2,3],[3,4]]",
    "sampleOutput": "3",
    "points": 150,
    "hints": [
      "Sort events by start day.",
      "For each day d from 1 to 10^5, add all events starting on day d into a min-heap (keyed by end day).",
      "Remove events from the min-heap whose end day is < d.",
      "Pop the event with the earliest end day and attend it on day d."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def maxEvents(self, events: list[list[int]]) -> int:\n        pass",
      "javascript": "class Solution {\n    maxEvents(events) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "import heapq\nclass Solution:\n    def maxEvents(self, events: list[list[int]]) -> int:\n        events.sort(key=lambda e: e[0])\n        heap = []\n        ans = 0\n        i = 0\n        n = len(events)\n        d = 1\n        \n        while i < n or heap:\n            if not heap:\n                d = events[i][0]\n            while i < n and events[i][0] <= d:\n                heapq.heappush(heap, events[i][1])\n                i += 1\n            while heap and heap[0] < d:\n                heapq.heappop(heap)\n            if heap:\n                heapq.heappop(heap)\n                ans += 1\n                d += 1\n        return ans",
      "javascript": "class Solution {\n    maxEvents(events) {\n        events.sort((a, b) => a[0] - b[0]);\n        // Min-heap simulation\n        const heap = [];\n        const push = (val) => {\n            heap.push(val);\n            let idx = heap.length - 1;\n            while (idx > 0) {\n                let p = Math.floor((idx - 1) / 2);\n                if (heap[p] > heap[idx]) {\n                    [heap[p], heap[idx]] = [heap[idx], heap[p]];\n                    idx = p;\n                } else break;\n            }\n        };\n        const pop = () => {\n            if (heap.length === 1) return heap.pop();\n            const top = heap[0];\n            heap[0] = heap.pop();\n            let idx = 0;\n            while (2 * idx + 1 < heap.length) {\n                let left = 2 * idx + 1, right = 2 * idx + 2;\n                let smallest = left;\n                if (right < heap.length && heap[right] < heap[left]) smallest = right;\n                if (heap[idx] > heap[smallest]) {\n                    [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];\n                    idx = smallest;\n                } else break;\n            }\n            return top;\n        };\n        \n        let ans = 0, i = 0, d = 1;\n        const n = events.length;\n        while (i < n || heap.length > 0) {\n            if (heap.length === 0) d = events[i][0];\n            while (i < n && events[i][0] <= d) {\n                push(events[i][1]);\n                i++;\n            }\n            while (heap.length > 0 && heap[0] < d) {\n                pop();\n            }\n            if (heap.length > 0) {\n                pop();\n                ans++;\n                d++;\n            }\n        }\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "Greedy earliest deadline first with min-heap.",
      "algorithm": "On each day, prioritize the available event that expires earliest.",
      "timeComplexity": "O(N log N + D log N)",
      "spaceComplexity": "O(N)",
      "content": "Earliest Deadline First (EDF) is provably optimal for unit-length task scheduling.",
      "referenceCode": "def maxEvents(events: list[list[int]]) -> int: ..."
    },
    "tags": [
      "Greedy",
      "Heap",
      "Intervals",
      "Sorting"
    ],
    "testCases": [
      {
        "input": "[[1,2],[2,3],[3,4]]",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[[1,2],[2,3],[3,4],[1,2]]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[[1,4],[4,4],[2,2],[3,4],[1,1]]",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "input": "[[1,100000]]",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Video Stitching Minimum Clips",
    "slug": "video-stitching-minimum-clips",
    "description": "You are given a series of video clips from a sporting event that lasted `time` seconds. These video clips can be overlapping, each represented as `clips[i] = [start_i, end_i]`. Return the minimum number of clips needed so that we can cut and join to cover the entire sporting event `[0, time]`. If impossible, return -1.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= clips.length <= 100\n0 <= start_i <= end_i <= 100\n1 <= time <= 100",
    "inputFormat": "clips, time",
    "outputFormat": "Minimum clips or -1.",
    "sampleInput": "[[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], 10",
    "sampleOutput": "3",
    "points": 150,
    "hints": [
      "Record max_reach[t] which is the furthest right end of any clip starting at <= t.",
      "Greedily extend coverage to max_reach[current_end] in each step.",
      "If max_reach cannot make progress, return -1."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def videoStitching(self, clips: list[list[int]], time: int) -> int:\n        pass",
      "javascript": "class Solution {\n    videoStitching(clips, time) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def videoStitching(self, clips: list[list[int]], time: int) -> int:\n        max_reach = [0] * (time + 1)\n        for s, e in clips:\n            if s <= time:\n                max_reach[s] = max(max_reach[s], e)\n                \n        clips_count = 0\n        curr_end = 0\n        furthest = 0\n        \n        for i in range(time):\n            furthest = max(furthest, max_reach[i])\n            if i == curr_end:\n                if furthest <= i:\n                    return -1\n                clips_count += 1\n                curr_end = furthest\n                if curr_end >= time:\n                    return clips_count\n        return clips_count if curr_end >= time else -1",
      "javascript": "class Solution {\n    videoStitching(clips, time) {\n        const maxReach = new Array(time + 1).fill(0);\n        for (const [s, e] of clips) {\n            if (s <= time) {\n                maxReach[s] = Math.max(maxReach[s], e);\n            }\n        }\n        let clipsCount = 0, currEnd = 0, furthest = 0;\n        for (let i = 0; i < time; i++) {\n            furthest = Math.max(furthest, maxReach[i]);\n            if (i === currEnd) {\n                if (furthest <= i) return -1;\n                clipsCount++;\n                currEnd = furthest;\n                if (currEnd >= time) return clipsCount;\n            }\n        }\n        return currEnd >= time ? clipsCount : -1;\n    }\n}"
    },
    "editorial": {
      "approach": "Greedy jump-game coverage.",
      "algorithm": "Identical to Jump Game II: greedily expand the coverage horizon using the furthest reaching clip available.",
      "timeComplexity": "O(N + Time)",
      "spaceComplexity": "O(Time)",
      "content": "Standard optimal interval cover algorithm.",
      "referenceCode": "def videoStitching(clips: list[list[int]], time: int) -> int: ..."
    },
    "tags": [
      "Greedy",
      "Dynamic Programming",
      "Intervals"
    ],
    "testCases": [
      {
        "input": "[[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], 10",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[[0,1],[1,2]], 5",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "input": "[[0,1],[6,8],[0,2],[5,6],[0,4],[0,3],[6,7],[1,3],[4,7],[1,4],[2,5],[2,6],[3,4],[4,5],[5,7],[6,9]], 9",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "input": "[[0,4],[2,8]], 5",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Queue Reconstruction by Height",
    "slug": "queue-reconstruction-by-height",
    "description": "You are given an array of people `people = [[h_0, k_0], [h_1, k_1], ...]` where `h_i` is height and `k_i` is the number of people in front who have a height greater than or equal to `h_i`. Reconstruct and return the queue.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= people.length <= 2000\n0 <= h_i <= 10^6\n0 <= k_i < people.length",
    "inputFormat": "people",
    "outputFormat": "Reconstructed queue array.",
    "sampleInput": "[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]",
    "sampleOutput": "[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]",
    "points": 150,
    "hints": [
      "Sort people by descending height, and in case of tie, ascending k value.",
      "Insert each person into the output list at index k.",
      "Since earlier inserted people are taller, inserting shorter people later does not disrupt their k counts."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def reconstructQueue(self, people: list[list[int]]) -> list[list[int]]:\n        pass",
      "javascript": "class Solution {\n    reconstructQueue(people) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def reconstructQueue(self, people: list[list[int]]) -> list[list[int]]:\n        people.sort(key=lambda p: (-p[0], p[1]))\n        queue = []\n        for p in people:\n            queue.insert(p[1], p)\n        return queue",
      "javascript": "class Solution {\n    reconstructQueue(people) {\n        people.sort((a, b) => b[0] !== a[0] ? b[0] - a[0] : a[1] - b[1]);\n        const queue = [];\n        for (const p of people) {\n            queue.splice(p[1], 0, p);\n        }\n        return queue;\n    }\n}"
    },
    "editorial": {
      "approach": "Greedy insertion by descending height.",
      "algorithm": "Taller people are inserted first. Inserting shorter people at index k does not change the >= height count for any existing taller element.",
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(N)",
      "content": "Can be optimized to O(N log N) using a Fenwick tree or Segment tree with k-th empty slot queries.",
      "referenceCode": "def reconstructQueue(people: list[list[int]]) -> list[list[int]]: ..."
    },
    "tags": [
      "Greedy",
      "Sorting",
      "Array",
      "Segment Tree"
    ],
    "testCases": [
      {
        "input": "[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]",
        "expectedOutput": "[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]",
        "isHidden": false
      },
      {
        "input": "[[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]",
        "expectedOutput": "[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]",
        "isHidden": false
      },
      {
        "input": "[[1,0]]",
        "expectedOutput": "[[1,0]]",
        "isHidden": true
      },
      {
        "input": "[[2,0],[1,1]]",
        "expectedOutput": "[[2,0],[1,1]]",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Candy Distribution with Ratings Two-Pass",
    "slug": "candy-distribution-ratings",
    "description": "There are `n` children standing in a line. Each child is assigned a rating value given in the integer array `ratings`. Each child must have at least one candy. Children with a higher rating get more candies than their neighbors. Return the minimum number of candies you need to have to distribute the candies to the children.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "n == ratings.length\n1 <= n <= 2 * 10^4\n0 <= ratings[i] <= 2 * 10^4",
    "inputFormat": "ratings",
    "outputFormat": "Total candies integer.",
    "sampleInput": "[1,0,2]",
    "sampleOutput": "5",
    "points": 200,
    "hints": [
      "Initialize an array candies with all 1s.",
      "Left-to-right pass: if ratings[i] > ratings[i-1], candies[i] = candies[i-1] + 1.",
      "Right-to-left pass: if ratings[i] > ratings[i+1], candies[i] = max(candies[i], candies[i+1] + 1).",
      "Sum the array."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def candy(self, ratings: list[int]) -> int:\n        pass",
      "javascript": "class Solution {\n    candy(ratings) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def candy(self, ratings: list[int]) -> int:\n        n = len(ratings)\n        candies = [1] * n\n        for i in range(1, n):\n            if ratings[i] > ratings[i - 1]:\n                candies[i] = candies[i - 1] + 1\n        for i in range(n - 2, -1, -1):\n            if ratings[i] > ratings[i + 1]:\n                candies[i] = max(candies[i], candies[i + 1] + 1)\n        return sum(candies)",
      "javascript": "class Solution {\n    candy(ratings) {\n        const n = ratings.length;\n        const candies = new Array(n).fill(1);\n        for (let i = 1; i < n; i++) {\n            if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;\n        }\n        for (let i = n - 2; i >= 0; i--) {\n            if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);\n        }\n        return candies.reduce((a, b) => a + b, 0);\n    }\n}"
    },
    "editorial": {
      "approach": "Two-pass bidirectional greedy scan.",
      "algorithm": "Enforce left constraint during forward pass and right constraint during backward pass.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "content": "Decoupling left and right neighbors satisfies both constraints minimally.",
      "referenceCode": "def candy(ratings: list[int]) -> int: ..."
    },
    "tags": [
      "Greedy",
      "Array",
      "Dynamic Programming"
    ],
    "testCases": [
      {
        "input": "[1,0,2]",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "input": "[1,2,2]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[1,3,2,2,1]",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "input": "[1]",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Smallest Subsequence / Remove Duplicate Letters",
    "slug": "remove-duplicate-letters-lexicographical",
    "description": "Given a string `s`, remove duplicate letters so that every letter appears once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= s.length <= 10^4\ns consists of lowercase English letters.",
    "inputFormat": "s",
    "outputFormat": "Lexicographically smallest string with unique characters.",
    "sampleInput": "\"bcabc\"",
    "sampleOutput": "\"abc\"",
    "points": 150,
    "hints": [
      "Record the last occurrence index of every character.",
      "Maintain a monotonic stack of characters.",
      "While the top of the stack is lexicographically greater than the current character AND the top character appears later in the string, pop it from the stack.",
      "Add current character to stack and mark it as visited."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def removeDuplicateLetters(self, s: str) -> str:\n        pass",
      "javascript": "class Solution {\n    removeDuplicateLetters(s) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def removeDuplicateLetters(self, s: str) -> str:\n        last_idx = {ch: i for i, ch in enumerate(s)}\n        stack = []\n        seen = set()\n        for i, ch in enumerate(s):\n            if ch not in seen:\n                while stack and stack[-1] > ch and last_idx[stack[-1]] > i:\n                    seen.remove(stack.pop())\n                seen.add(ch)\n                stack.append(ch)\n        return \"\".join(stack)",
      "javascript": "class Solution {\n    removeDuplicateLetters(s) {\n        const lastIdx = {};\n        for (let i = 0; i < s.length; i++) lastIdx[s[i]] = i;\n        const stack = [];\n        const seen = new Set();\n        for (let i = 0; i < s.length; i++) {\n            const ch = s[i];\n            if (!seen.has(ch)) {\n                while (stack.length > 0 && stack[stack.length - 1] > ch && lastIdx[stack[stack.length - 1]] > i) {\n                    seen.delete(stack.pop());\n                }\n                seen.add(ch);\n                stack.push(ch);\n            }\n        }\n        return stack.join(\"\");\n    }\n}"
    },
    "editorial": {
      "approach": "Monotonic stack with last-occurrence lookahead.",
      "algorithm": "Greedily pop larger characters when a future instance is guaranteed to exist.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1) (alphabet 26)",
      "content": "Classic monotonic stack pattern for lexicographical minimization under coverage constraints.",
      "referenceCode": "def removeDuplicateLetters(s: str) -> str: ..."
    },
    "tags": [
      "Strings",
      "Stack",
      "Greedy",
      "Monotonic Stack"
    ],
    "testCases": [
      {
        "input": "\"bcabc\"",
        "expectedOutput": "\"abc\"",
        "isHidden": false
      },
      {
        "input": "\"cbacdcbc\"",
        "expectedOutput": "\"acdb\"",
        "isHidden": false
      },
      {
        "input": "\"abacb\"",
        "expectedOutput": "\"abc\"",
        "isHidden": true
      },
      {
        "input": "\"z\"",
        "expectedOutput": "\"z\"",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Create Maximum Number from Two Arrays",
    "slug": "create-maximum-number-two-arrays",
    "description": "You are given two integer arrays `nums1` and `nums2` of lengths `m` and `n` and an integer `k` (k <= m + n). Create the maximum number of length `k` with digits from `nums1` and `nums2` preserving relative order of digits from each array.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "m == nums1.length, n == nums2.length\n1 <= m, n <= 500\n0 <= nums1[i], nums2[i] <= 9\n1 <= k <= m + n",
    "inputFormat": "nums1, nums2, k",
    "outputFormat": "List of digits representing maximum number.",
    "sampleInput": "[3,4,6,5], [9,1,2,5,8,3], 5",
    "sampleOutput": "[9,8,6,5,3]",
    "points": 200,
    "hints": [
      "Iterate over all possible numbers of digits i to pick from nums1, where 0 <= i <= k and k - i <= len(nums2).",
      "For a fixed i, find the maximum subsequence of length i from nums1 and length k - i from nums2 using a monotonic stack.",
      "Merge the two maximum subsequences lexicographically.",
      "Take the overall maximum across all valid i."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def maxNumber(self, nums1: list[int], nums2: list[int], k: int) -> list[int]:\n        pass",
      "javascript": "class Solution {\n    maxNumber(nums1, nums2, k) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def maxNumber(self, nums1: list[int], nums2: list[int], k: int) -> list[int]:\n        def max_single(nums, count):\n            drop = len(nums) - count\n            stack = []\n            for num in nums:\n                while drop and stack and stack[-1] < num:\n                    stack.pop()\n                    drop -= 1\n                stack.append(num)\n            return stack[:count]\n            \n        def merge(a, b):\n            return [max(a, b).pop(0) for _ in range(len(a) + len(b))]\n            \n        best = []\n        for i in range(max(0, k - len(nums2)), min(k, len(nums1)) + 1):\n            sub1 = max_single(nums1, i)\n            sub2 = max_single(nums2, k - i)\n            candidate = merge(sub1, sub2)\n            if candidate > best:\n                best = candidate\n        return best",
      "javascript": "class Solution {\n    maxNumber(nums1, nums2, k) {\n        function maxSingle(nums, count) {\n            let drop = nums.length - count;\n            const stack = [];\n            for (const num of nums) {\n                while (drop > 0 && stack.length > 0 && stack[stack.length - 1] < num) {\n                    stack.pop();\n                    drop--;\n                }\n                stack.push(num);\n            }\n            return stack.slice(0, count);\n        }\n        \n        function compare(a, i, b, j) {\n            while (i < a.length && j < b.length) {\n                if (a[i] !== b[j]) return a[i] - b[j];\n                i++;\n                j++;\n            }\n            return (a.length - i) - (b.length - j);\n        }\n        \n        function merge(a, b) {\n            const res = [];\n            let i = 0, j = 0;\n            while (i < a.length || j < b.length) {\n                if (compare(a, i, b, j) > 0) {\n                    res.push(a[i++]);\n                } else {\n                    res.push(b[j++]);\n                }\n            }\n            return res;\n        }\n        \n        let best = [];\n        for (let i = Math.max(0, k - nums2.length); i <= Math.min(k, nums1.length); i++) {\n            const sub1 = maxSingle(nums1, i);\n            const sub2 = maxSingle(nums2, k - i);\n            const candidate = merge(sub1, sub2);\n            if (best.length === 0 || compare(candidate, 0, best, 0) > 0) {\n                best = candidate;\n            }\n        }\n        return best;\n    }\n}"
    },
    "editorial": {
      "approach": "Subsequence Monotonic Stack & Lexicographical Merge.",
      "algorithm": "Deconstruct into subproblems: select optimal sub-arrays of size i and k-i, then merge.",
      "timeComplexity": "O(k * (m + n)^2)",
      "spaceComplexity": "O(k)",
      "content": "Combines greedy monotonic deletion with multi-pointer merge.",
      "referenceCode": "def maxNumber(nums1: list[int], nums2: list[int], k: int) -> list[int]: ..."
    },
    "tags": [
      "Greedy",
      "Monotonic Stack",
      "Two Pointers",
      "Array"
    ],
    "testCases": [
      {
        "input": "[3,4,6,5], [9,1,2,5,8,3], 5",
        "expectedOutput": "[9,8,6,5,3]",
        "isHidden": false
      },
      {
        "input": "[6,7], [6,0,4], 5",
        "expectedOutput": "[6,7,6,0,4]",
        "isHidden": false
      },
      {
        "input": "[3,9], [8,9], 3",
        "expectedOutput": "[9,8,9]",
        "isHidden": true
      },
      {
        "input": "[1,2], [3,4], 2",
        "expectedOutput": "[4,2]",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Advantage Shuffle Greedy Best Match",
    "slug": "advantage-shuffle-greedy",
    "description": "You are given two integer arrays `nums1` and `nums2` both of the same length. The advantage of `nums1` with respect to `nums2` is the number of indices `i` for which `nums1[i] > nums2[i]`. Return any permutation of `nums1` that maximizes its advantage.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= nums1.length == nums2.length <= 10^5\n0 <= nums1[i], nums2[i] <= 10^9",
    "inputFormat": "nums1, nums2",
    "outputFormat": "Permuted nums1 array.",
    "sampleInput": "[2,7,11,15], [1,10,4,11]",
    "sampleOutput": "[2,11,7,15]",
    "points": 150,
    "hints": [
      "Sort nums1 ascending.",
      "Sort nums2 indices descending based on their values.",
      "For each largest element in nums2, if the largest available element in nums1 can beat it, assign it. Otherwise, assign the smallest available element in nums1."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def advantageCount(self, nums1: list[int], nums2: list[int]) -> list[int]:\n        pass",
      "javascript": "class Solution {\n    advantageCount(nums1, nums2) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def advantageCount(self, nums1: list[int], nums2: list[int]) -> list[int]:\n        nums1.sort()\n        idx = sorted(range(len(nums2)), key=lambda i: nums2[i])\n        ans = [0] * len(nums1)\n        lo, hi = 0, len(nums1) - 1\n        \n        for i in reversed(idx):\n            if nums1[hi] > nums2[i]:\n                ans[i] = nums1[hi]\n                hi -= 1\n            else:\n                ans[i] = nums1[lo]\n                lo += 1\n        return ans",
      "javascript": "class Solution {\n    advantageCount(nums1, nums2) {\n        nums1.sort((a, b) => a - b);\n        const idx = nums2.map((_, i) => i).sort((a, b) => nums2[a] - nums2[b]);\n        const ans = new Array(nums1.length);\n        let lo = 0, hi = nums1.length - 1;\n        \n        for (let k = idx.length - 1; k >= 0; k--) {\n            const i = idx[k];\n            if (nums1[hi] > nums2[i]) {\n                ans[i] = nums1[hi--];\n            } else {\n                ans[i] = nums1[lo++];\n            }\n        }\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "Tian Ji Horse Racing greedy strategy.",
      "algorithm": "Match largest opponents with our highest card if we win; otherwise sacrifice our smallest card.",
      "timeComplexity": "O(N log N)",
      "spaceComplexity": "O(N)",
      "content": "Two-pointer greedy assignment achieves globally maximal score.",
      "referenceCode": "def advantageCount(nums1: list[int], nums2: list[int]) -> list[int]: ..."
    },
    "tags": [
      "Greedy",
      "Two Pointers",
      "Sorting"
    ],
    "testCases": [
      {
        "input": "[2,7,11,15], [1,10,4,11]",
        "expectedOutput": "[2,11,7,15]",
        "isHidden": false
      },
      {
        "input": "[12,24,8,32], [13,25,32,11]",
        "expectedOutput": "[24,32,8,12]",
        "isHidden": false
      },
      {
        "input": "[2,0,4,1,2], [1,3,0,0,2]",
        "expectedOutput": "[2,0,1,2,4]",
        "isHidden": true
      },
      {
        "input": "[1], [1]",
        "expectedOutput": "[1]",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Boats to Save People Two Pointers",
    "slug": "boats-to-save-people",
    "description": "You are given an array `people` where `people[i]` is the weight of the i-th person, and an infinite number of boats where each boat can carry at most `limit` weight and at most 2 people at the same time. Return the minimum number of boats to carry every given person.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= people.length <= 5 * 10^4\n1 <= people[i] <= limit <= 3 * 10^4",
    "inputFormat": "people, limit",
    "outputFormat": "Minimum boats count.",
    "sampleInput": "[1,2], 3",
    "sampleOutput": "1",
    "points": 150,
    "hints": [
      "Sort people by weight.",
      "Pair the heaviest person (at right pointer r) with the lightest person (at left pointer l) if their sum <= limit.",
      "If not, the heaviest person must take a boat alone."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def numRescueBoats(self, people: list[int], limit: int) -> int:\n        pass",
      "javascript": "class Solution {\n    numRescueBoats(people, limit) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def numRescueBoats(self, people: list[int], limit: int) -> int:\n        people.sort()\n        l, r = 0, len(people) - 1\n        boats = 0\n        while l <= r:\n            if people[l] + people[r] <= limit:\n                l += 1\n            r -= 1\n            boats += 1\n        return boats",
      "javascript": "class Solution {\n    numRescueBoats(people, limit) {\n        people.sort((a, b) => a - b);\n        let l = 0, r = people.length - 1;\n        let boats = 0;\n        while (l <= r) {\n            if (people[l] + people[r] <= limit) l++;\n            r--;\n            boats++;\n        }\n        return boats;\n    }\n}"
    },
    "editorial": {
      "approach": "Two-pointer greedy pairing.",
      "algorithm": "Sort weights and greedily pair the heaviest person with the lightest person whenever feasible.",
      "timeComplexity": "O(N log N)",
      "spaceComplexity": "O(1)",
      "content": "Provably minimal boat allocation.",
      "referenceCode": "def numRescueBoats(people: list[int], limit: int) -> int: ..."
    },
    "tags": [
      "Greedy",
      "Two Pointers",
      "Sorting",
      "Array"
    ],
    "testCases": [
      {
        "input": "[1,2], 3",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[3,2,2,1], 3",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[3,5,3,4], 5",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "input": "[5,1,4,2], 6",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Score After Flipping Matrix",
    "slug": "score-after-flipping-matrix",
    "description": "You are given an `m x n` binary matrix `grid`. A move consists of choosing any row or column and toggling each value in that row or column (0 <-> 1). Every row of the matrix is interpreted as a binary number. Return the highest possible score after making any number of moves.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "m == grid.length, n == grid[i].length\n1 <= m, n <= 20\ngrid[i][j] is either 0 or 1.",
    "inputFormat": "grid",
    "outputFormat": "Maximum score integer.",
    "sampleInput": "[[0,0,1,1],[1,0,1,0],[1,1,0,0]]",
    "sampleOutput": "39",
    "points": 150,
    "hints": [
      "The most significant bit (column 0) in each row must be 1. If row[0] is 0, toggle the entire row.",
      "For every column j >= 1, count how many rows have a 1 in that column.",
      "If count(1s) < m / 2, toggle that column to maximize 1s."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def matrixScore(self, grid: list[list[int]]) -> int:\n        pass",
      "javascript": "class Solution {\n    matrixScore(grid) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def matrixScore(self, grid: list[list[int]]) -> int:\n        m, n = len(grid), len(grid[0])\n        score = m * (1 << (n - 1))\n        \n        for j in range(1, n):\n            col_ones = sum(grid[i][j] if grid[i][0] == 1 else 1 - grid[i][j] for i in range(m))\n            col_max = max(col_ones, m - col_ones)\n            score += col_max * (1 << (n - 1 - j))\n            \n        return score",
      "javascript": "class Solution {\n    matrixScore(grid) {\n        const m = grid.length, n = grid[0].length;\n        let score = m * (1 << (n - 1));\n        for (let j = 1; j < n; j++) {\n            let ones = 0;\n            for (let i = 0; i < m; i++) {\n                const val = grid[i][0] === 1 ? grid[i][j] : 1 - grid[i][j];\n                if (val === 1) ones++;\n            }\n            const colMax = Math.max(ones, m - ones);\n            score += colMax * (1 << (n - 1 - j));\n        }\n        return score;\n    }\n}"
    },
    "editorial": {
      "approach": "Greedy bitwise optimization.",
      "algorithm": "Flip rows so that column 0 is all 1s. Then flip columns independently to maximize set bits.",
      "timeComplexity": "O(M * N)",
      "spaceComplexity": "O(1)",
      "content": "Independent column optimization enabled by binary weight domination.",
      "referenceCode": "def matrixScore(grid: list[list[int]]) -> int: ..."
    },
    "tags": [
      "Greedy",
      "Bit Manipulation",
      "Matrix"
    ],
    "testCases": [
      {
        "input": "[[0,0,1,1],[1,0,1,0],[1,1,0,0]]",
        "expectedOutput": "39",
        "isHidden": false
      },
      {
        "input": "[[0]]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[[0,1],[0,1],[0,1],[0,0]]",
        "expectedOutput": "11",
        "isHidden": true
      },
      {
        "input": "[[1,1,1],[1,0,0],[0,0,0]]",
        "expectedOutput": "21",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Two City Scheduling Min Cost",
    "slug": "two-city-scheduling-cost",
    "description": "A company is planning to interview `2n` people. Given the array `costs` where `costs[i] = [aCost_i, bCost_i]`, return the minimum cost to fly exactly `n` people to city A and `n` people to city B.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "2 * n == costs.length\n2 <= costs.length <= 100\ncosts.length is even.\n1 <= aCost_i, bCost_i <= 1000",
    "inputFormat": "costs",
    "outputFormat": "Minimum total cost integer.",
    "sampleInput": "[[10,20],[30,200],[400,50],[30,20]]",
    "sampleOutput": "110",
    "points": 150,
    "hints": [
      "Sort people by the difference (aCost - bCost).",
      "The first n people have the most benefit going to city A.",
      "Send the first n people to city A and the remaining n people to city B."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def twoCitySchedCost(self, costs: list[list[int]]) -> int:\n        pass",
      "javascript": "class Solution {\n    twoCitySchedCost(costs) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def twoCitySchedCost(self, costs: list[list[int]]) -> int:\n        costs.sort(key=lambda x: x[0] - x[1])\n        n = len(costs) // 2\n        total = sum(costs[i][0] for i in range(n)) + sum(costs[i][1] for i in range(n, 2 * n))\n        return total",
      "javascript": "class Solution {\n    twoCitySchedCost(costs) {\n        costs.sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]));\n        const n = costs.length / 2;\n        let total = 0;\n        for (let i = 0; i < n; i++) total += costs[i][0];\n        for (let i = n; i < 2 * n; i++) total += costs[i][1];\n        return total;\n    }\n}"
    },
    "editorial": {
      "approach": "Greedy opportunity cost sorting.",
      "algorithm": "Sort by (aCost - bCost) and split evenly.",
      "timeComplexity": "O(N log N)",
      "spaceComplexity": "O(1)",
      "content": "Differential cost ranking yields optimal matching.",
      "referenceCode": "def twoCitySchedCost(costs: list[list[int]]) -> int: ..."
    },
    "tags": [
      "Greedy",
      "Sorting",
      "Array"
    ],
    "testCases": [
      {
        "input": "[[10,20],[30,200],[400,50],[30,20]]",
        "expectedOutput": "110",
        "isHidden": false
      },
      {
        "input": "[[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]",
        "expectedOutput": "1859",
        "isHidden": false
      },
      {
        "input": "[[10,10],[10,10]]",
        "expectedOutput": "20",
        "isHidden": true
      },
      {
        "input": "[[1,2],[2,1]]",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Complete Circuit Gas Station",
    "slug": "gas-station-circuit",
    "description": "There are `n` gas stations along a circular route, where the amount of gas at station `i` is `gas[i]`. It costs `cost[i]` of gas to travel from station `i` to `i + 1`. Return the starting gas station index if you can travel around the circuit once clockwise, otherwise return -1.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "n == gas.length == cost.length\n1 <= n <= 10^5\n0 <= gas[i], cost[i] <= 10^4",
    "inputFormat": "gas, cost",
    "outputFormat": "Starting station index or -1.",
    "sampleInput": "[1,2,3,4,5], [3,4,5,1,2]",
    "sampleOutput": "3",
    "points": 150,
    "hints": [
      "If sum(gas) < sum(cost), it is impossible to complete the circuit.",
      "Whenever tank becomes negative at station i, no station from start to i can be the valid starting station.",
      "Reset start = i + 1 and reset current tank to 0."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:\n        pass",
      "javascript": "class Solution {\n    canCompleteCircuit(gas, cost) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:\n        if sum(gas) < sum(cost):\n            return -1\n        total = 0\n        start = 0\n        for i in range(len(gas)):\n            total += gas[i] - cost[i]\n            if total < 0:\n                start = i + 1\n                total = 0\n        return start",
      "javascript": "class Solution {\n    canCompleteCircuit(gas, cost) {\n        let totalGas = 0, totalCost = 0;\n        for (let i = 0; i < gas.length; i++) {\n            totalGas += gas[i];\n            totalCost += cost[i];\n        }\n        if (totalGas < totalCost) return -1;\n        \n        let start = 0, curr = 0;\n        for (let i = 0; i < gas.length; i++) {\n            curr += gas[i] - cost[i];\n            if (curr < 0) {\n                start = i + 1;\n                curr = 0;\n            }\n        }\n        return start;\n    }\n}"
    },
    "editorial": {
      "approach": "Single-pass greedy reset.",
      "algorithm": "If sum(gas) >= sum(cost), a solution is guaranteed. Reset starting point whenever running tank drops below zero.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "content": "Classic circular array greedy search in O(N) time and O(1) space.",
      "referenceCode": "def canCompleteCircuit(gas: list[int], cost: list[int]) -> int: ..."
    },
    "tags": [
      "Greedy",
      "Array"
    ],
    "testCases": [
      {
        "input": "[1,2,3,4,5], [3,4,5,1,2]",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[2,3,4], [3,4,3]",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "input": "[5,1,2,3,4], [4,4,1,5,1]",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "input": "[2], [2]",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Partition Labels by Last Occurrence",
    "slug": "partition-labels-greedy",
    "description": "You are given a string `s`. We want to partition the string into as many parts as possible so that each letter appears in at most one part. Return a list of integers representing the size of these parts.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= s.length <= 500\ns consists of lowercase English letters.",
    "inputFormat": "s",
    "outputFormat": "List of partition lengths.",
    "sampleInput": "\"ababcbacadefegdehijhklij\"",
    "sampleOutput": "[9,7,8]",
    "points": 150,
    "hints": [
      "Find the last occurrence of each character in s.",
      "Iterate through s, updating the maximum last occurrence index seen so far.",
      "When the current index equals this maximum index, cut the partition."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def partitionLabels(self, s: str) -> list[int]:\n        pass",
      "javascript": "class Solution {\n    partitionLabels(s) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def partitionLabels(self, s: str) -> list[int]:\n        last = {ch: i for i, ch in enumerate(s)}\n        j = anchor = 0\n        ans = []\n        for i, ch in enumerate(s):\n            j = max(j, last[ch])\n            if i == j:\n                ans.append(i - anchor + 1)\n                anchor = i + 1\n        return ans",
      "javascript": "class Solution {\n    partitionLabels(s) {\n        const last = {};\n        for (let i = 0; i < s.length; i++) last[s[i]] = i;\n        let j = 0, anchor = 0;\n        const ans = [];\n        for (let i = 0; i < s.length; i++) {\n            j = Math.max(j, last[s[i]]);\n            if (i === j) {\n                ans.push(i - anchor + 1);\n                anchor = i + 1;\n            }\n        }\n        return ans;\n    }\n}"
    },
    "editorial": {
      "approach": "Greedy interval boundary extension.",
      "algorithm": "Precompute last occurrences and split eagerly when pointer catches up with furthest necessary boundary.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "content": "Linear time partitioning with minimal memory overhead.",
      "referenceCode": "def partitionLabels(s: str) -> list[int]: ..."
    },
    "tags": [
      "Greedy",
      "Two Pointers",
      "Hash Table",
      "String"
    ],
    "testCases": [
      {
        "input": "\"ababcbacadefegdehijhklij\"",
        "expectedOutput": "[9,7,8]",
        "isHidden": false
      },
      {
        "input": "\"eccbbbbdec\"",
        "expectedOutput": "[10]",
        "isHidden": false
      },
      {
        "input": "\"abc\"",
        "expectedOutput": "[1,1,1]",
        "isHidden": true
      },
      {
        "input": "\"a\"",
        "expectedOutput": "[1]",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Task Scheduler with Cooling Interval",
    "slug": "task-scheduler-idle-slots",
    "description": "Given a characters array `tasks`, representing the tasks a CPU needs to do, where each letter represents a different task, and an integer `n` cooldown period between identical tasks. Return the least number of units of times that the CPU will take to finish all the given tasks.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= tasks.length <= 10^4\ntasks[i] is uppercase English letter.\n0 <= n <= 100",
    "inputFormat": "tasks, n",
    "outputFormat": "Minimum CPU units integer.",
    "sampleInput": "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], 2",
    "sampleOutput": "8",
    "points": 150,
    "hints": [
      "Find the maximum frequency max_freq of any task.",
      "Count how many tasks have frequency equal to max_freq (let this count be max_count).",
      "The minimum slots needed is max(len(tasks), (max_freq - 1) * (n + 1) + max_count)."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def leastInterval(self, tasks: list[str], n: int) -> int:\n        pass",
      "javascript": "class Solution {\n    leastInterval(tasks, n) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "from collections import Counter\nclass Solution:\n    def leastInterval(self, tasks: list[str], n: int) -> int:\n        freq = Counter(tasks)\n        max_freq = max(freq.values())\n        max_count = sum(1 for v in freq.values() if v == max_freq)\n        return max(len(tasks), (max_freq - 1) * (n + 1) + max_count)",
      "javascript": "class Solution {\n    leastInterval(tasks, n) {\n        const counts = {};\n        for (const t of tasks) counts[t] = (counts[t] || 0) + 1;\n        const maxFreq = Math.max(...Object.values(counts));\n        let maxCount = 0;\n        for (const v of Object.values(counts)) {\n            if (v === maxFreq) maxCount++;\n        }\n        return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);\n    }\n}"
    },
    "editorial": {
      "approach": "Idle slot bucket math formula.",
      "algorithm": "Frame the tasks into (max_freq - 1) buckets of size (n + 1), plus max_count trailing tasks.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "content": "Closed-form greedy formula computes optimal schedule without step-by-step simulation.",
      "referenceCode": "def leastInterval(tasks: list[str], n: int) -> int: ..."
    },
    "tags": [
      "Greedy",
      "Math",
      "Counting",
      "Heap"
    ],
    "testCases": [
      {
        "input": "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], 2",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "input": "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], 0",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "input": "[\"A\",\"A\",\"A\",\"A\",\"A\",\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\"], 2",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "input": "[\"A\"], 2",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Minimum Arrows to Burst Balloons Interval Sweep",
    "slug": "min-arrows-balloon-bursting",
    "description": "There are spherical balloons taped to a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array `points` where `points[i] = [xstart, xend]`. An arrow shot vertically at x bursts all balloons where `xstart <= x <= xend`. Return the minimum number of arrows that must be shot to burst all balloons.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= points.length <= 10^5\npoints[i].length == 2\n-2^31 <= xstart < xend <= 2^31 - 1",
    "inputFormat": "points",
    "outputFormat": "Minimum arrows count.",
    "sampleInput": "[[10,16],[2,8],[1,6],[7,12]]",
    "sampleOutput": "2",
    "points": 150,
    "hints": [
      "Sort balloons by their end coordinate xend.",
      "Greedily shoot an arrow at the end of the first balloon.",
      "Skip all subsequent balloons whose start <= arrow position.",
      "When a balloon starts after the arrow position, shoot a new arrow at its end."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def findMinArrowShots(self, points: list[list[int]]) -> int:\n        pass",
      "javascript": "class Solution {\n    findMinArrowShots(points) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def findMinArrowShots(self, points: list[list[int]]) -> int:\n        if not points:\n            return 0\n        points.sort(key=lambda p: p[1])\n        arrows = 1\n        curr_end = points[0][1]\n        for p in points[1:]:\n            if p[0] > curr_end:\n                arrows += 1\n                curr_end = p[1]\n        return arrows",
      "javascript": "class Solution {\n    findMinArrowShots(points) {\n        if (points.length === 0) return 0;\n        points.sort((a, b) => a[1] - b[1]);\n        let arrows = 1;\n        let currEnd = points[0][1];\n        for (let i = 1; i < points.length; i++) {\n            if (points[i][0] > currEnd) {\n                arrows++;\n                currEnd = points[i][1];\n            }\n        }\n        return arrows;\n    }\n}"
    },
    "editorial": {
      "approach": "Interval scheduling greedy selection.",
      "algorithm": "Sort by interval end points and shoot arrows at interval right boundaries.",
      "timeComplexity": "O(N log N)",
      "spaceComplexity": "O(1)",
      "content": "Equivalent to the maximum number of mutually disjoint intervals.",
      "referenceCode": "def findMinArrowShots(points: list[list[int]]) -> int: ..."
    },
    "tags": [
      "Greedy",
      "Intervals",
      "Sorting"
    ],
    "testCases": [
      {
        "input": "[[10,16],[2,8],[1,6],[7,12]]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[[1,2],[3,4],[5,6],[7,8]]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[[1,2],[2,3],[3,4],[4,5]]",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "input": "[[1,10]]",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  {
    "title": "Non-overlapping Intervals Minimum Removal",
    "slug": "non-overlapping-intervals-erase",
    "description": "Given an array of intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= intervals.length <= 10^5\nintervals[i].length == 2\n-5 * 10^4 <= start_i < end_i <= 5 * 10^4",
    "inputFormat": "intervals",
    "outputFormat": "Minimum removals integer.",
    "sampleInput": "[[1,2],[2,3],[3,4],[1,3]]",
    "sampleOutput": "1",
    "points": 150,
    "hints": [
      "This is equivalent to finding the maximum number of mutually compatible intervals and subtracting from total count.",
      "Sort intervals by their end coordinate.",
      "Iterate and count intervals that start >= previous selected end."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:\n        pass",
      "javascript": "class Solution {\n    eraseOverlapIntervals(intervals) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:\n        if not intervals:\n            return 0\n        intervals.sort(key=lambda x: x[1])\n        kept = 1\n        end = intervals[0][1]\n        for inv in intervals[1:]:\n            if inv[0] >= end:\n                kept += 1\n                end = inv[1]\n        return len(intervals) - kept",
      "javascript": "class Solution {\n    eraseOverlapIntervals(intervals) {\n        if (intervals.length === 0) return 0;\n        intervals.sort((a, b) => a[1] - b[1]);\n        let kept = 1;\n        let end = intervals[0][1];\n        for (let i = 1; i < intervals.length; i++) {\n            if (intervals[i][0] >= end) {\n                kept++;\n                end = intervals[i][1];\n            }\n        }\n        return intervals.length - kept;\n    }\n}"
    },
    "editorial": {
      "approach": "Greedy activity selection.",
      "algorithm": "Sort by end times and pick greedy non-overlapping intervals.",
      "timeComplexity": "O(N log N)",
      "spaceComplexity": "O(1)",
      "content": "Optimal activity selection problem variant.",
      "referenceCode": "def eraseOverlapIntervals(intervals: list[list[int]]) -> int: ..."
    },
    "tags": [
      "Greedy",
      "Intervals",
      "Sorting",
      "Dynamic Programming"
    ],
    "testCases": [
      {
        "input": "[[1,2],[2,3],[3,4],[1,3]]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[[1,2],[1,2],[1,2]]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[[1,2],[2,3]]",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[[1,100],[11,22],[1,11],[2,12]]",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  }
];
