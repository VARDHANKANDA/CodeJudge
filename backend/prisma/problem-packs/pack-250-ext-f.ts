import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack250ExtFDefs: ProblemDef[] = [
  // 1. Z-Algorithm Pattern Matching (Medium)
  {
    title: 'Z Algorithm Pattern Matching',
    slug: 'z-algorithm-pattern-matching',
    description: `Given a text string \`text\` and a pattern string \`pattern\`, find all starting indices (0-based) where \`pattern\` appears in \`text\` using the linear-time **Z Algorithm**.
Output the space-separated 0-based indices, or \`-1\` if \`pattern\` is not found.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: `1 <= pattern.length <= text.length <= 10^5\nBoth strings consist of lowercase English letters.`,
    inputFormat: `Line 1: text\nLine 2: pattern`,
    outputFormat: `Space-separated indices or -1.`,
    sampleInput: `aabxaabxcaabxaabxay\naabx`,
    sampleOutput: `0 4 9 13`,
    points: 150,
    hints: [
      'Construct string S = pattern + "$" + text where "$" is a unique separator.',
      'Compute the Z-array for S: Z[i] is the length of the longest substring starting from S[i] that matches a prefix of S.',
      'Whenever Z[i] == length(pattern), record i - length(pattern) - 1.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().split()
    if len(lines) < 2:
        print("-1")
        return
    text, pattern = lines[0], lines[1]
    m, n = len(text), len(pattern)
    if n > m:
        print("-1")
        return
        
    s = pattern + '$' + text
    total_len = len(s)
    z = [0] * total_len
    l, r = 0, 0
    
    for i in range(1, total_len):
        if i <= r:
            z[i] = min(r - i + 1, z[i - l])
        while i + z[i] < total_len and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] - 1 > r:
            l = i
            r = i + z[i] - 1
            
    matches = []
    for i in range(n + 1, total_len):
        if z[i] == n:
            matches.append(i - n - 1)
            
    print(" ".join(str(x) for x in matches) if matches else "-1")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (lines.length < 2) { console.log("-1"); return; }
    const text = lines[0];
    const pattern = lines[1];
    const m = text.length, n = pattern.length;
    if (n > m) { console.log("-1"); return; }
    
    const s = pattern + '$' + text;
    const totalLen = s.length;
    const z = new Int32Array(totalLen);
    let l = 0, r = 0;
    
    for (let i = 1; i < totalLen; i++) {
        if (i <= r) {
            z[i] = Math.min(r - i + 1, z[i - l]);
        }
        while (i + z[i] < totalLen && s[z[i]] === s[i + z[i]]) {
            z[i]++;
        }
        if (i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1;
        }
    }
    
    const matches = [];
    for (let i = n + 1; i < totalLen; i++) {
        if (z[i] === n) {
            matches.push(i - n - 1);
        }
    }
    
    console.log(matches.length ? matches.join(" ") : "-1");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().split()
    if len(lines) < 2:
        print("-1")
        return
    text, pattern = lines[0], lines[1]
    m, n = len(text), len(pattern)
    if n > m:
        print("-1")
        return
    s = pattern + '$' + text
    total_len = len(s)
    z = [0] * total_len
    l, r = 0, 0
    for i in range(1, total_len):
        if i <= r:
            z[i] = min(r - i + 1, z[i - l])
        while i + z[i] < total_len and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] - 1 > r:
            l = i
            r = i + z[i] - 1
    matches = [i - n - 1 for i in range(n + 1, total_len) if z[i] == n]
    print(" ".join(str(x) for x in matches) if matches else "-1")

solve()
`,
      javascript: `const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (lines.length >= 2) {
    const text = lines[0], pattern = lines[1];
    const m = text.length, n = pattern.length;
    if (n > m) console.log("-1");
    else {
        const s = pattern + '$' + text;
        const totalLen = s.length;
        const z = new Int32Array(totalLen);
        let l = 0, r = 0;
        for (let i = 1; i < totalLen; i++) {
            if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
            while (i + z[i] < totalLen && s[z[i]] === s[i + z[i]]) z[i]++;
            if (i + z[i] - 1 > r) { l = i; r = i + z[i] - 1; }
        }
        const matches = [];
        for (let i = n + 1; i < totalLen; i++) if (z[i] === n) matches.push(i - n - 1);
        console.log(matches.length ? matches.join(" ") : "-1");
    }
} else { console.log("-1"); }
`,
    },
    editorial: {
      approach: 'Linear-Time Z Algorithm.',
      algorithm: '1. Build combined string pattern + "$" + text.\n2. Compute Z-box values maintaining interval [l, r].\n3. Identify matching indices where Z[i] equals pattern length.',
      timeComplexity: 'O(|text| + |pattern|)',
      spaceComplexity: 'O(|text| + |pattern|)',
      content: 'Z algorithm matches exact substrings in linear time via dynamic window memoization.',
      referenceCode: `while i + z[i] < N and s[z[i]] == s[i + z[i]]: z[i] += 1`,
    },
    tags: ['String', 'String Matching'],
    testCases: [
      { input: `aabxaabxcaabxaabxay\naabx`, expectedOutput: `0 4 9 13`, isHidden: false, order: 0 },
      { input: `abcdef\nghk`, expectedOutput: `-1`, isHidden: false, order: 1 },
      { input: `aaaaa\naa`, expectedOutput: `0 1 2 3`, isHidden: true, order: 2 },
    ],
  },

  // 2. Can I Win (Bitmask DP / Minimax)
  {
    title: 'Can I Win',
    slug: 'can-i-win-bitmask-dp',
    description: `In the "100 game", two players take turns adding, to a running total, any integer from \`1\` to \`maxChoosableInteger\`. The player who first causes the running total to reach or exceed \`desiredTotal\` wins.
Given two integers \`maxChoosableInteger\` and \`desiredTotal\`, return \`true\` if the first player can force a win, otherwise return \`false\`. Assume both players play optimally and each integer can only be chosen once.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= maxChoosableInteger <= 20\n0 <= desiredTotal <= 300`,
    inputFormat: `Two integers maxChoosableInteger and desiredTotal.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `10 11`,
    sampleOutput: `false`,
    points: 150,
    hints: [
      'If sum of all numbers 1..M is less than desiredTotal, neither player can reach it (return false).',
      'Use a bitmask of length maxChoosableInteger to represent remaining available integers with memoization.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if len(raw) < 2:
        return
    max_c, total = int(raw[0]), int(raw[1])
    
    if total <= 0:
        print("true")
        return
    if (max_c * (max_c + 1)) // 2 < total:
        print("false")
        return
    if (max_c * (max_c + 1)) // 2 == total:
        print("true" if max_c % 2 != 0 else "false")
        return
        
    memo = {}
    def can_win(mask, rem):
        if mask in memo:
            return memo[mask]
        for i in range(max_c):
            if not (mask & (1 << i)):
                val = i + 1
                if val >= rem or not can_win(mask | (1 << i), rem - val):
                    memo[mask] = True
                    return True
        memo[mask] = False
        return False
        
    print("true" if can_win(0, total) else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (raw.length < 2) return;
    const maxC = parseInt(raw[0], 10);
    const total = parseInt(raw[1], 10);
    
    if (total <= 0) { console.log("true"); return; }
    if ((maxC * (maxC + 1)) / 2 < total) { console.log("false"); return; }
    if ((maxC * (maxC + 1)) / 2 === total) { console.log(maxC % 2 !== 0 ? "true" : "false"); return; }
    
    const memo = new Map();
    function canWin(mask, rem) {
        if (memo.has(mask)) return memo.get(mask);
        for (let i = 0; i < maxC; i++) {
            if (!(mask & (1 << i))) {
                const val = i + 1;
                if (val >= rem || !canWin(mask | (1 << i), rem - val)) {
                    memo.set(mask, true);
                    return true;
                }
            }
        }
        memo.set(mask, false);
        return false;
    }
    
    console.log(canWin(0, total) ? "true" : "false");
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if len(raw) >= 2:
        max_c, total = int(raw[0]), int(raw[1])
        if total <= 0: print("true"); return
        if (max_c * (max_c + 1)) // 2 < total: print("false"); return
        if (max_c * (max_c + 1)) // 2 == total: print("true" if max_c % 2 != 0 else "false"); return
        memo = {}
        def can_win(mask, rem):
            if mask in memo: return memo[mask]
            for i in range(max_c):
                if not (mask & (1 << i)):
                    val = i + 1
                    if val >= rem or not can_win(mask | (1 << i), rem - val):
                        memo[mask] = True
                        return True
            memo[mask] = False
            return False
        print("true" if can_win(0, total) else "false")

solve()
`,
      javascript: `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (raw.length >= 2) {
    const maxC = parseInt(raw[0], 10), total = parseInt(raw[1], 10);
    if (total <= 0) console.log("true");
    else if ((maxC * (maxC + 1)) / 2 < total) console.log("false");
    else if ((maxC * (maxC + 1)) / 2 === total) console.log(maxC % 2 !== 0 ? "true" : "false");
    else {
        const memo = new Map();
        function canWin(mask, rem) {
            if (memo.has(mask)) return memo.get(mask);
            for (let i = 0; i < maxC; i++) {
                if (!(mask & (1 << i))) {
                    const val = i + 1;
                    if (val >= rem || !canWin(mask | (1 << i), rem - val)) {
                        memo.set(mask, true); return true;
                    }
                }
            }
            memo.set(mask, false); return false;
        }
        console.log(canWin(0, total) ? "true" : "false");
    }
}
`,
    },
    editorial: {
      approach: 'Bitmask Dynamic Programming with Minimax Memoization.',
      algorithm: '1. Check base feasibility: if sum(1..M) < desiredTotal, return false.\n2. Encode chosen integers into 20-bit mask.\n3. A state is winning if there exists any available move that forces a losing state for the opponent.',
      timeComplexity: 'O(2^M * M)',
      spaceComplexity: 'O(2^M)',
      content: 'Minimax state evaluation with bitmask compression over subset choices.',
      referenceCode: `if not can_win(mask | (1 << i), rem - val): return True`,
    },
    tags: ['Dynamic Programming', 'Bit Manipulation', 'Game Theory', 'Memoization'],
    testCases: [
      { input: `10 11`, expectedOutput: `false`, isHidden: false, order: 0 },
      { input: `10 0`, expectedOutput: `true`, isHidden: false, order: 1 },
      { input: `10 1`, expectedOutput: `true`, isHidden: false, order: 2 },
      { input: `10 40`, expectedOutput: `false`, isHidden: true, order: 3 },
    ],
  },

  // 3. Meeting Rooms III (Hard)
  {
    title: 'Meeting Rooms III',
    slug: 'meeting-rooms-iii',
    description: `You are given an integer \`n\`. There are \`n\` rooms numbered from \`0\` to \`n - 1\`.
You are given a 2D integer array \`meetings\` where \`meetings[i] = [starti, endi]\` means that a meeting will be held during the half-closed time interval \`[starti, endi)\`. All start times are unique.
Meetings are allocated to rooms according to the following rules:
- Each meeting will take place in the unused room with the lowest number.
- If no room is available, the meeting will be delayed until a room becomes free.
- When multiple rooms become free at the same time, the room with the smallest room number is assigned.
Return the number of the room that held the **most meetings**. If there are multiple rooms, return the room with the lowest number.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `1 <= n <= 100\n1 <= meetings.length <= 10^5\n0 <= starti < endi <= 5 * 10^5`,
    inputFormat: `Line 1: n, m\nNext m lines: start end`,
    outputFormat: `An integer representing the room index holding the most meetings.`,
    sampleInput: `2 4\n0 10\n1 5\n2 7\n3 4`,
    sampleOutput: `0`,
    points: 200,
    hints: [
      'Maintain two heaps: one for available rooms (min-heap by room index), and one for busy rooms (min-heap by end time, room index).',
      'For each meeting (start, end), first free up all busy rooms whose end time <= start.',
    ],
    codeTemplates: {
      python: `import sys
import heapq

def solve():
    data = sys.stdin.read().split()
    if not data:
        print(0)
        return
    n, m = int(data[0]), int(data[1])
    meetings = []
    idx = 2
    for _ in range(m):
        meetings.append((int(data[idx]), int(data[idx+1])))
        idx += 2
        
    meetings.sort()
    
    free_rooms = list(range(n))
    heapq.heapify(free_rooms)
    busy_rooms = [] # (free_time, room_idx)
    room_counts = [0] * n
    
    for s, e in meetings:
        dur = e - s
        while busy_rooms and busy_rooms[0][0] <= s:
            t, r = heapq.heappop(busy_rooms)
            heapq.heappush(free_rooms, r)
            
        if free_rooms:
            r = heapq.heappop(free_rooms)
            room_counts[r] += 1
            heapq.heappush(busy_rooms, (e, r))
        else:
            t, r = heapq.heappop(busy_rooms)
            room_counts[r] += 1
            heapq.heappush(busy_rooms, (t + dur, r))
            
    best_room = 0
    max_c = -1
    for r in range(n):
        if room_counts[r] > max_c:
            max_c = room_counts[r]
            best_room = r
            
    print(best_room)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!data || data.length < 2) { console.log(0); return; }
    const n = parseInt(data[0], 10);
    const m = parseInt(data[1], 10);
    const meetings = [];
    let idx = 2;
    for (let i = 0; i < m; i++) {
        meetings.push([parseInt(data[idx++], 10), parseInt(data[idx++], 10)]);
    }
    meetings.sort((a, b) => a[0] - b[0]);
    
    const roomCounts = new Int32Array(n);
    const freeUntil = new Float64Array(n);
    
    for (const [s, e] of meetings) {
        const dur = e - s;
        let earliestRoom = -1;
        let earliestTime = Infinity;
        let foundFree = false;
        
        for (let r = 0; r < n; r++) {
            if (freeUntil[r] <= s) {
                earliestRoom = r;
                foundFree = true;
                break;
            }
            if (freeUntil[r] < earliestTime) {
                earliestTime = freeUntil[r];
                earliestRoom = r;
            }
        }
        
        if (foundFree) {
            freeUntil[earliestRoom] = e;
        } else {
            freeUntil[earliestRoom] += dur;
        }
        roomCounts[earliestRoom]++;
    }
    
    let maxCount = -1;
    let bestRoom = 0;
    for (let r = 0; r < n; r++) {
        if (roomCounts[r] > maxCount) {
            maxCount = roomCounts[r];
            bestRoom = r;
        }
    }
    console.log(bestRoom);
}

solve();
`,
    },
    referenceSolutions: {
      python: `import sys
import heapq

def solve():
    data = sys.stdin.read().split()
    if data:
        n, m = int(data[0]), int(data[1])
        meetings = []
        idx = 2
        for _ in range(m):
            meetings.append((int(data[idx]), int(data[idx+1])))
            idx += 2
        meetings.sort()
        free_rooms = list(range(n))
        heapq.heapify(free_rooms)
        busy_rooms = []
        counts = [0] * n
        for s, e in meetings:
            dur = e - s
            while busy_rooms and busy_rooms[0][0] <= s:
                t, r = heapq.heappop(busy_rooms)
                heapq.heappush(free_rooms, r)
            if free_rooms:
                r = heapq.heappop(free_rooms)
                counts[r] += 1
                heapq.heappush(busy_rooms, (e, r))
            else:
                t, r = heapq.heappop(busy_rooms)
                counts[r] += 1
                heapq.heappush(busy_rooms, (t + dur, r))
        max_c = max(counts)
        print(counts.index(max_c))
    else:
        print(0)

solve()
`,
      javascript: `const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data && data.length >= 2) {
    const n = parseInt(data[0], 10), m = parseInt(data[1], 10);
    const meetings = [];
    let idx = 2;
    for (let i = 0; i < m; i++) meetings.push([parseInt(data[idx++], 10), parseInt(data[idx++], 10)]);
    meetings.sort((a, b) => a[0] - b[0]);
    const counts = new Int32Array(n), freeUntil = new Float64Array(n);
    for (const [s, e] of meetings) {
        const dur = e - s;
        let picked = -1, minTime = Infinity, free = false;
        for (let r = 0; r < n; r++) {
            if (freeUntil[r] <= s) { picked = r; free = true; break; }
            if (freeUntil[r] < minTime) { minTime = freeUntil[r]; picked = r; }
        }
        if (free) freeUntil[picked] = e;
        else freeUntil[picked] += dur;
        counts[picked]++;
    }
    let maxC = -1, best = 0;
    for (let r = 0; r < n; r++) {
        if (counts[r] > maxC) { maxC = counts[r]; best = r; }
    }
    console.log(best);
} else { console.log(0); }
`,
    },
    editorial: {
      approach: 'Dual Priority Queue Simulation.',
      algorithm: '1. Sort meetings ascending by start time.\n2. Maintain free rooms heap and busy rooms heap.\n3. Release rooms before assigning new meetings.\n4. Output room index with highest meeting frequency.',
      timeComplexity: 'O(M log M + M log N)',
      spaceComplexity: 'O(N)',
      content: 'Heap-based event scheduling models priority tie-breaking accurately.',
      referenceCode: `while busy and busy[0][0] <= start: heappush(free, heappop(busy)[1])`,
    },
    tags: ['Heap (Priority Queue)', 'Greedy', 'Simulation', 'Sorting'],
    testCases: [
      { input: `2 4\n0 10\n1 5\n2 7\n3 4`, expectedOutput: `0`, isHidden: false, order: 0 },
      { input: `3 5\n1 20\n2 10\n3 5\n4 9\n6 8`, expectedOutput: `1`, isHidden: false, order: 1 },
      { input: `1 2\n0 5\n5 10`, expectedOutput: `0`, isHidden: true, order: 2 },
    ],
  },
];
