const fs = require('fs');
const path = require('path');

function writePack(filename, exportName, problems) {
  const outPath = path.join(__dirname, '..', 'prisma', 'problem-packs', filename);
  const content = `import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const ${exportName}: ProblemDef[] = ${JSON.stringify(problems, null, 2)
    .replace(/"difficulty": "EASY"/g, '"difficulty": Difficulty.EASY')
    .replace(/"difficulty": "MEDIUM"/g, '"difficulty": Difficulty.MEDIUM')
    .replace(/"difficulty": "HARD"/g, '"difficulty": Difficulty.HARD')};
`;
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`Successfully wrote ${problems.length} problems to ${filename}`);
}

// 19 System & Data Structure Design problems for Pack K
const problemsK = [
  {
    title: 'LFU Cache O1 Eviction Policy Design',
    slug: 'lfu-cache-o1-eviction-policy-design',
    description: 'Design and implement a data structure for a Least Frequently Used (LFU) cache. Implement get and put in O(1) average time complexity. When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '0 <= capacity <= 10^4, 0 <= key <= 10^5, operations <= 2 * 10^4',
    inputFormat: 'capacity, operations',
    outputFormat: 'List of outputs for get/put operations.',
    sampleInput: '2, [["put",1,1],["put",2,2],["get",1],["put",3,3],["get",2],["get",3],["put",4,4],["get",1],["get",3],["get",4]]',
    sampleOutput: '[null,null,1,null,-1,3,null,-1,3,4]',
    points: 200,
    hints: ['Maintain two hash maps: key-to-node and freq-to-doubly-linked-list, along with min_freq tracking.'],
    codeTemplates: {
      python: 'class Solution:\n    def executeLFU(self, capacity: int, operations: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executeLFU(capacity, operations) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executeLFU(self, capacity: int, operations: list) -> list:
        if capacity == 0:
            return [None if op[0] == 'put' else -1 for op in operations]
        import collections
        key_to_val = {}
        key_to_freq = {}
        freq_to_keys = collections.defaultdict(collections.OrderedDict)
        min_freq = 0
        res = []
        for op in operations:
            if op[0] == 'get':
                k = op[1]
                if k not in key_to_val:
                    res.append(-1)
                else:
                    v = key_to_val[k]
                    f = key_to_freq[k]
                    del freq_to_keys[f][k]
                    if not freq_to_keys[f] and min_freq == f:
                        min_freq += 1
                    key_to_freq[k] = f + 1
                    freq_to_keys[f + 1][k] = None
                    res.append(v)
            elif op[0] == 'put':
                k, v = op[1], op[2]
                if k in key_to_val:
                    key_to_val[k] = v
                    f = key_to_freq[k]
                    del freq_to_keys[f][k]
                    if not freq_to_keys[f] and min_freq == f:
                        min_freq += 1
                    key_to_freq[k] = f + 1
                    freq_to_keys[f + 1][k] = None
                else:
                    if len(key_to_val) >= capacity:
                        evict_k, _ = freq_to_keys[min_freq].popitem(last=False)
                        del key_to_val[evict_k]
                        del key_to_freq[evict_k]
                    key_to_val[k] = v
                    key_to_freq[k] = 1
                    freq_to_keys[1][k] = None
                    min_freq = 1
                res.append(None)
        return res`,
      javascript: `class Solution {
    executeLFU(capacity, operations) {
        if (capacity === 0) return operations.map(op => op[0] === 'put' ? null : -1);
        const keyToVal = new Map();
        const keyToFreq = new Map();
        const freqToKeys = new Map();
        let minFreq = 0;
        const res = [];
        for (const op of operations) {
            if (op[0] === 'get') {
                const k = op[1];
                if (!keyToVal.has(k)) {
                    res.push(-1);
                } else {
                    const v = keyToVal.get(k);
                    const f = keyToFreq.get(k);
                    freqToKeys.get(f).delete(k);
                    if (freqToKeys.get(f).size === 0 && minFreq === f) minFreq++;
                    keyToFreq.set(k, f + 1);
                    if (!freqToKeys.has(f + 1)) freqToKeys.set(f + 1, new Set());
                    freqToKeys.get(f + 1).add(k);
                    res.push(v);
                }
            } else if (op[0] === 'put') {
                const [_, k, v] = op;
                if (keyToVal.has(k)) {
                    keyToVal.set(k, v);
                    const f = keyToFreq.get(k);
                    freqToKeys.get(f).delete(k);
                    if (freqToKeys.get(f).size === 0 && minFreq === f) minFreq++;
                    keyToFreq.set(k, f + 1);
                    if (!freqToKeys.has(f + 1)) freqToKeys.set(f + 1, new Set());
                    freqToKeys.get(f + 1).add(k);
                } else {
                    if (keyToVal.size >= capacity) {
                        const evictK = freqToKeys.get(minFreq).values().next().value;
                        freqToKeys.get(minFreq).delete(evictK);
                        keyToVal.delete(evictK);
                        keyToFreq.delete(evictK);
                    }
                    keyToVal.set(k, v);
                    keyToFreq.set(k, 1);
                    if (!freqToKeys.has(1)) freqToKeys.set(1, new Set());
                    freqToKeys.get(1).add(k);
                    minFreq = 1;
                }
                res.push(null);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Frequency Bucketed Doubly Linked Lists / Ordered Maps.',
      algorithm: 'O(1) updates via direct frequency bucket promotion and min_freq pointer advancement.',
      timeComplexity: 'O(1) per get/put',
      spaceComplexity: 'O(Capacity)',
      content: 'Classic optimal O(1) LFU cache design.',
      referenceCode: 'evict_k, _ = freq_to_keys[min_freq].popitem(last=False)',
    },
    tags: ['Design', 'Hash Table', 'Linked List', 'Doubly-Linked List'],
    testCases: [
      { input: '2, [["put",1,1],["put",2,2],["get",1],["put",3,3],["get",2],["get",3],["put",4,4],["get",1],["get",3],["get",4]]', expectedOutput: '[null,null,1,null,-1,3,null,-1,3,4]', isHidden: false, order: 0 },
      { input: '1, [["put",2,1],["get",2],["put",3,2],["get",2],["get",3]]', expectedOutput: '[null,1,null,-1,2]', isHidden: false, order: 1 },
      { input: '0, [["put",0,0],["get",0]]', expectedOutput: '[null,-1]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Time-Based Key-Value Store Versioning',
    slug: 'time-based-key-value-store-versioning',
    description: "Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.",
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= key.length, value.length <= 100, 1 <= timestamp <= 10^7, operations <= 2 * 10^5',
    inputFormat: 'operations',
    outputFormat: 'List of outputs for get/set.',
    sampleInput: '[["set","foo","bar",1],["get","foo",1],["get","foo",3],["set","foo","bar2",4],["get","foo",4],["get","foo",5]]',
    sampleOutput: '[null,"bar","bar",null,"bar2","bar2"]',
    points: 100,
    hints: ['Store (timestamp, value) pairs in an array per key and binary search rightmost timestamp <= query.'],
    codeTemplates: {
      python: 'class Solution:\n    def executeTimeMap(self, operations: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executeTimeMap(operations) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executeTimeMap(self, operations: list) -> list:
        import collections, bisect
        store = collections.defaultdict(list)
        res = []
        for op in operations:
            if op[0] == "set":
                _, k, v, t = op
                store[k].append((t, v))
                res.append(None)
            elif op[0] == "get":
                _, k, t = op
                if k not in store:
                    res.append("")
                else:
                    arr = store[k]
                    idx = bisect.bisect_right(arr, (t, chr(127))) - 1
                    if idx >= 0:
                        res.append(arr[idx][1])
                    else:
                        res.append("")
        return res`,
      javascript: `class Solution {
    executeTimeMap(operations) {
        const store = new Map();
        const res = [];
        for (const op of operations) {
            if (op[0] === "set") {
                const [_, k, v, t] = op;
                if (!store.has(k)) store.set(k, []);
                store.get(k).push([t, v]);
                res.push(null);
            } else if (op[0] === "get") {
                const [_, k, t] = op;
                if (!store.has(k)) {
                    res.push("");
                } else {
                    const arr = store.get(k);
                    let l = 0, r = arr.length - 1, ans = -1;
                    while (l <= r) {
                        const mid = Math.floor((l + r) / 2);
                        if (arr[mid][0] <= t) {
                            ans = mid;
                            l = mid + 1;
                        } else {
                            r = mid - 1;
                        }
                    }
                    res.push(ans >= 0 ? arr[ans][1] : "");
                }
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Hash Map with Binary Search on Monotonic Timestamps.',
      algorithm: 'Append timestamps in chronological order and query upper bound via binary search in O(log N).',
      timeComplexity: 'Set O(1), Get O(log N)',
      spaceComplexity: 'O(Total Entries)',
      content: 'Standard time-series KV store design.',
      referenceCode: 'idx = bisect.bisect_right(arr, (t, chr(127))) - 1',
    },
    tags: ['Design', 'Hash Table', 'Binary Search', 'String'],
    testCases: [
      { input: '[["set","foo","bar",1],["get","foo",1],["get","foo",3],["set","foo","bar2",4],["get","foo",4],["get","foo",5]]', expectedOutput: '[null,"bar","bar",null,"bar2","bar2"]', isHidden: false, order: 0 },
      { input: '[["set","love","high",10],["set","love","low",20],["get","love",5],["get","love",10],["get","love",15],["get","love",20],["get","love",25]]', expectedOutput: '[null,null,"","high","high","low","low"]', isHidden: false, order: 1 },
      { input: '[["get","a",1]]', expectedOutput: '[""]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Snapshot Array Sparse Delta Storage',
    slug: 'snapshot-array-sparse-delta-storage',
    description: 'Implement a SnapshotArray that supports set(index, val), snap(), and get(index, snap_id) efficiently.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= length <= 50000, snaps <= 50000, operations <= 50000',
    inputFormat: 'length, operations',
    outputFormat: 'List of outputs.',
    sampleInput: '3, [["set",0,5],["snap"],["set",0,6],["get",0,0]]',
    sampleOutput: '[null,0,null,5]',
    points: 150,
    hints: ['Store a list of (snap_id, val) per index and binary search when querying get().'],
    codeTemplates: {
      python: 'class Solution:\n    def executeSnapshotArray(self, length: int, operations: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executeSnapshotArray(length, operations) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executeSnapshotArray(self, length: int, operations: list) -> list:
        import bisect
        history = [[(0, 0)] for _ in range(length)]
        snap_id = 0
        res = []
        for op in operations:
            if op[0] == "set":
                _, idx, val = op
                if history[idx][-1][0] == snap_id:
                    history[idx][-1] = (snap_id, val)
                else:
                    history[idx].append((snap_id, val))
                res.append(None)
            elif op[0] == "snap":
                res.append(snap_id)
                snap_id += 1
            elif op[0] == "get":
                _, idx, sid = op
                arr = history[idx]
                pos = bisect.bisect_right(arr, (sid, float('inf'))) - 1
                res.append(arr[pos][1])
        return res`,
      javascript: `class Solution {
    executeSnapshotArray(length, operations) {
        const history = Array.from({ length }, () => [[0, 0]]);
        let snapId = 0;
        const res = [];
        for (const op of operations) {
            if (op[0] === "set") {
                const [_, idx, val] = op;
                const arr = history[idx];
                if (arr[arr.length - 1][0] === snapId) {
                    arr[arr.length - 1][1] = val;
                } else {
                    arr.push([snapId, val]);
                }
                res.push(null);
            } else if (op[0] === "snap") {
                res.push(snapId++);
            } else if (op[0] === "get") {
                const [_, idx, sid] = op;
                const arr = history[idx];
                let l = 0, r = arr.length - 1, ans = 0;
                while (l <= r) {
                    const mid = Math.floor((l + r) / 2);
                    if (arr[mid][0] <= sid) {
                        ans = mid;
                        l = mid + 1;
                    } else {
                        r = mid - 1;
                    }
                }
                res.push(arr[ans][1]);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Sparse Delta Versioning per Index.',
      algorithm: 'Store mutation logs only when values change, answering historical reads via binary search.',
      timeComplexity: 'Set O(1), Snap O(1), Get O(log Snaps)',
      spaceComplexity: 'O(Length + Mutations)',
      content: 'Standard immutable snapshot / persistent array structure.',
      referenceCode: 'pos = bisect.bisect_right(arr, (sid, float("inf"))) - 1',
    },
    tags: ['Design', 'Array', 'Binary Search', 'Hash Table'],
    testCases: [
      { input: '3, [["set",0,5],["snap"],["set",0,6],["get",0,0]]', expectedOutput: '[null,0,null,5]', isHidden: false, order: 0 },
      { input: '1, [["set",0,15],["snap"],["snap"],["snap"],["get",0,2]]', expectedOutput: '[null,0,1,2,15]', isHidden: false, order: 1 },
      { input: '2, [["snap"],["get",0,0]]', expectedOutput: '[0,0]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Design Hit Counter Sliding Window Aggregation',
    slug: 'design-hit-counter-sliding-window-aggregation',
    description: 'Design a hit counter which counts the number of hits received in the past 5 minutes (i.e., the past 300 seconds). Support hit(timestamp) and getHits(timestamp).',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= timestamp <= 2 * 10^9, operations <= 300',
    inputFormat: 'operations',
    outputFormat: 'List of outputs.',
    sampleInput: '[["hit",1],["hit",2],["hit",3],["getHits",4],["hit",300],["getHits",300],["getHits",301]]',
    sampleOutput: '[null,null,null,3,null,4,3]',
    points: 100,
    hints: ['Use fixed 300-bucket circular arrays for timestamps and counts.'],
    codeTemplates: {
      python: 'class Solution:\n    def executeHitCounter(self, operations: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executeHitCounter(operations) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executeHitCounter(self, operations: list) -> list:
        times = [0] * 300
        hits = [0] * 300
        res = []
        for op in operations:
            if op[0] == "hit":
                t = op[1]
                idx = t % 300
                if times[idx] != t:
                    times[idx] = t
                    hits[idx] = 1
                else:
                    hits[idx] += 1
                res.append(None)
            elif op[0] == "getHits":
                t = op[1]
                total = 0
                for i in range(300):
                    if t - times[i] < 300:
                        total += hits[i]
                res.append(total)
        return res`,
      javascript: `class Solution {
    executeHitCounter(operations) {
        const times = Array(300).fill(0);
        const hits = Array(300).fill(0);
        const res = [];
        for (const op of operations) {
            if (op[0] === "hit") {
                const t = op[1];
                const idx = t % 300;
                if (times[idx] !== t) {
                    times[idx] = t;
                    hits[idx] = 1;
                } else {
                    hits[idx]++;
                }
                res.push(null);
            } else if (op[0] === "getHits") {
                const t = op[1];
                let total = 0;
                for (let i = 0; i < 300; i++) {
                    if (t - times[i] < 300) total += hits[i];
                }
                res.push(total);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: '300-Bucket Circular Buffer Window Aggregation.',
      algorithm: 'Maintain fixed 300 buckets representing second modulo indices.',
      timeComplexity: 'Hit O(1), GetHits O(300) = O(1)',
      spaceComplexity: 'O(300) = O(1)',
      content: 'Standard rate limiter / hit counter design.',
      referenceCode: 'if times[idx] != t: times[idx] = t; hits[idx] = 1',
    },
    tags: ['Design', 'Queue', 'Array'],
    testCases: [
      { input: '[["hit",1],["hit",2],["hit",3],["getHits",4],["hit",300],["getHits",300],["getHits",301]]', expectedOutput: '[null,null,null,3,null,4,3]', isHidden: false, order: 0 },
      { input: '[["hit",10],["getHits",310]]', expectedOutput: '[null,0]', isHidden: false, order: 1 },
      { input: '[["hit",1],["hit",1],["getHits",1]]', expectedOutput: '[null,null,2]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Insert Delete GetRandom O1 Design',
    slug: 'insert-delete-getrandom-o1-design',
    description: 'Implement the RandomizedSet class that supports insert(val), remove(val), and getRandom() in average O(1) time complexity.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'operations <= 2 * 10^5',
    inputFormat: 'operations',
    outputFormat: 'List of outputs.',
    sampleInput: '[["insert",1],["remove",2],["insert",2],["getRandom"],["remove",1],["insert",2],["getRandom"]]',
    sampleOutput: '[true,false,true,1,true,false,2]',
    points: 100,
    hints: ['Maintain an array of values and a hash map from value to its index in the array. For remove(), swap target with the last element and pop.'],
    codeTemplates: {
      python: 'class Solution:\n    def executeRandomizedSet(self, operations: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executeRandomizedSet(operations) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executeRandomizedSet(self, operations: list) -> list:
        val_to_idx = {}
        nums = []
        res = []
        for op in operations:
            if op[0] == "insert":
                v = op[1]
                if v in val_to_idx:
                    res.append(False)
                else:
                    val_to_idx[v] = len(nums)
                    nums.append(v)
                    res.append(True)
            elif op[0] == "remove":
                v = op[1]
                if v not in val_to_idx:
                    res.append(False)
                else:
                    idx = val_to_idx[v]
                    last = nums[-1]
                    nums[idx] = last
                    val_to_idx[last] = idx
                    nums.pop()
                    del val_to_idx[v]
                    res.append(True)
            elif op[0] == "getRandom":
                res.append(nums[0] if nums else None)
        return res`,
      javascript: `class Solution {
    executeRandomizedSet(operations) {
        const valToIdx = new Map();
        const nums = [];
        const res = [];
        for (const op of operations) {
            if (op[0] === "insert") {
                const v = op[1];
                if (valToIdx.has(v)) {
                    res.push(false);
                } else {
                    valToIdx.set(v, nums.length);
                    nums.push(v);
                    res.push(true);
                }
            } else if (op[0] === "remove") {
                const v = op[1];
                if (!valToIdx.has(v)) {
                    res.push(false);
                } else {
                    const idx = valToIdx.get(v);
                    const last = nums[nums.length - 1];
                    nums[idx] = last;
                    valToIdx.set(last, idx);
                    nums.pop();
                    valToIdx.delete(v);
                    res.push(true);
                }
            } else if (op[0] === "getRandom") {
                res.push(nums.length > 0 ? nums[0] : null);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Array + Hash Map Swap-to-Back Deletion.',
      algorithm: 'Swap target element with the back of the array to pop in O(1) time.',
      timeComplexity: 'O(1) average per operation',
      spaceComplexity: 'O(N)',
      content: 'Standard RandomizedSet O(1) design.',
      referenceCode: 'nums[idx] = last; val_to_idx[last] = idx; nums.pop()',
    },
    tags: ['Design', 'Array', 'Hash Table', 'Randomized'],
    testCases: [
      { input: '[["insert",1],["remove",2],["insert",2],["getRandom"],["remove",1],["insert",2],["getRandom"]]', expectedOutput: '[true,false,true,1,true,false,2]', isHidden: false, order: 0 },
      { input: '[["insert",10],["insert",20],["remove",10],["getRandom"]]', expectedOutput: '[true,true,true,20]', isHidden: false, order: 1 },
      { input: '[["remove",0]]', expectedOutput: '[false]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Encode and Decode Strings Length Prefix Codec',
    slug: 'encode-and-decode-strings-length-prefix-codec',
    description: 'Design an algorithm to encode a list of strings to a single string, and decode that string back to the original list of strings.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= strs.length <= 200, 0 <= strs[i].length <= 200',
    inputFormat: 'strs',
    outputFormat: 'Round-trip decoded list of strings.',
    sampleInput: '["Hello","World"]',
    sampleOutput: '["Hello","World"]',
    points: 100,
    hints: ['Prefix each string with its length followed by a delimiter like "#" (e.g. 5#Hello5#World).'],
    codeTemplates: {
      python: 'class Solution:\n    def encodeDecode(self, strs: list) -> list:\n        pass',
      javascript: 'class Solution {\n    encodeDecode(strs) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def encodeDecode(self, strs: list) -> list:
        encoded = "".join(f"{len(s)}#{s}" for s in strs)
        res = []
        i = 0
        while i < len(encoded):
            j = encoded.find('#', i)
            length = int(encoded[i:j])
            res.append(encoded[j+1:j+1+length])
            i = j + 1 + length
        return res`,
      javascript: `class Solution {
    encodeDecode(strs) {
        const encoded = strs.map(s => \`\${s.length}#\${s}\`).join("");
        const res = [];
        let i = 0;
        while (i < encoded.length) {
            const j = encoded.indexOf('#', i);
            const len = Number(encoded.slice(i, j));
            res.push(encoded.slice(j + 1, j + 1 + len));
            i = j + 1 + len;
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Length-Prefixed Chunk Framing.',
      algorithm: 'Prefix length framing avoids delimiter collisions across arbitrary characters.',
      timeComplexity: 'O(Total String Length)',
      spaceComplexity: 'O(Total String Length)',
      content: 'Standard network protocol string framing.',
      referenceCode: 'encoded = "".join(f"{len(s)}#{s}" for s in strs)',
    },
    tags: ['Design', 'String'],
    testCases: [
      { input: '["Hello","World"]', expectedOutput: '["Hello","World"]', isHidden: false, order: 0 },
      { input: '[""]', expectedOutput: '[""]', isHidden: false, order: 1 },
      { input: '["4#abc","123#"]', expectedOutput: '["4#abc","123#"]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Design Browser History Back Forward Navigation',
    slug: 'design-browser-history-back-forward-navigation',
    description: 'You have a browser of one tab where you start on the homepage and you can visit another url, get back in the history number of steps or move forward in the history number of steps.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= homepage.length <= 20, operations <= 5000',
    inputFormat: 'homepage, operations',
    outputFormat: 'List of outputs.',
    sampleInput: '"leetcode.com", [["visit","google.com"],["visit","facebook.com"],["visit","youtube.com"],["back",1],["back",1],["forward",1],["visit","linkedin.com"],["forward",2],["back",2],["back",7]]',
    sampleOutput: '[null,null,null,"facebook.com","google.com","facebook.com",null,"linkedin.com","google.com","leetcode.com"]',
    points: 100,
    hints: ['Maintain dynamic list and current index pointer. Visiting a new URL truncates forward history.'],
    codeTemplates: {
      python: 'class Solution:\n    def executeBrowser(self, homepage: str, operations: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executeBrowser(homepage, operations) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executeBrowser(self, homepage: str, operations: list) -> list:
        history = [homepage]
        cur = 0
        res = []
        for op in operations:
            if op[0] == "visit":
                url = op[1]
                history = history[:cur + 1]
                history.append(url)
                cur += 1
                res.append(None)
            elif op[0] == "back":
                steps = op[1]
                cur = max(0, cur - steps)
                res.append(history[cur])
            elif op[0] == "forward":
                steps = op[1]
                cur = min(len(history) - 1, cur + steps)
                res.append(history[cur])
        return res`,
      javascript: `class Solution {
    executeBrowser(homepage, operations) {
        let history = [homepage];
        let cur = 0;
        const res = [];
        for (const op of operations) {
            if (op[0] === "visit") {
                history = history.slice(0, cur + 1);
                history.push(op[1]);
                cur++;
                res.push(null);
            } else if (op[0] === "back") {
                cur = Math.max(0, cur - op[1]);
                res.push(history[cur]);
            } else if (op[0] === "forward") {
                cur = Math.min(history.length - 1, cur + op[1]);
                res.push(history[cur]);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Dynamic History Array with Position Cursor.',
      algorithm: 'Slice array on new visit; clamp pointer movements on back/forward.',
      timeComplexity: 'O(1) per navigation',
      spaceComplexity: 'O(History Size)',
      content: 'Standard stack/array browser history emulation.',
      referenceCode: 'history = history[:cur + 1]; history.append(url); cur += 1',
    },
    tags: ['Design', 'Array', 'Linked List', 'Stack'],
    testCases: [
      { input: '"leetcode.com", [["visit","google.com"],["visit","facebook.com"],["visit","youtube.com"],["back",1],["back",1],["forward",1],["visit","linkedin.com"],["forward",2],["back",2],["back",7]]', expectedOutput: '[null,null,null,"facebook.com","google.com","facebook.com",null,"linkedin.com","google.com","leetcode.com"]', isHidden: false, order: 0 },
      { input: '"z.com", [["visit","a.com"],["back",10]]', expectedOutput: '[null,"z.com"]', isHidden: false, order: 1 },
      { input: '"a.com", [["forward",5]]', expectedOutput: '["a.com"]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Peeking Iterator Next Value Preview',
    slug: 'peeking-iterator-next-value-preview',
    description: 'Design an iterator that supports the peek() operation on an existing iterator in addition to the hasNext() and the next() operations.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'operations <= 1000',
    inputFormat: 'nums, operations',
    outputFormat: 'List of outputs.',
    sampleInput: '[1,2,3], ["next","peek","next","next","hasNext"]',
    sampleOutput: '[1,2,2,3,false]',
    points: 100,
    hints: ['Cache the next value in a buffer variable.'],
    codeTemplates: {
      python: 'class Solution:\n    def executePeeking(self, nums: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executePeeking(nums, operations) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executePeeking(self, nums: list, operations: list) -> list:
        idx = 0
        res = []
        for op in operations:
            if op == "next":
                res.append(nums[idx])
                idx += 1
            elif op == "peek":
                res.append(nums[idx])
            elif op == "hasNext":
                res.append(idx < len(nums))
        return res`,
      javascript: `class Solution {
    executePeeking(nums, operations) {
        let idx = 0;
        const res = [];
        for (const op of operations) {
            if (op === "next") {
                res.push(nums[idx++]);
            } else if (op === "peek") {
                res.push(nums[idx]);
            } else if (op === "hasNext") {
                res.push(idx < nums.length);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Buffered Lookahead Decorator.',
      algorithm: 'Decorate iterator with one-element cached lookahead.',
      timeComplexity: 'O(1) per operation',
      spaceComplexity: 'O(1)',
      content: 'Classic iterator wrapper pattern.',
      referenceCode: 'res.append(nums[idx])',
    },
    tags: ['Design', 'Array', 'Iterator'],
    testCases: [
      { input: '[1,2,3], ["next","peek","next","next","hasNext"]', expectedOutput: '[1,2,2,3,false]', isHidden: false, order: 0 },
      { input: '[1], ["hasNext","peek","next","hasNext"]', expectedOutput: '[true,1,1,false]', isHidden: false, order: 1 },
      { input: '[], ["hasNext"]', expectedOutput: '[false]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'RLE Iterator Run-Length Encoded Traversal',
    slug: 'rle-iterator-run-length-encoded-traversal',
    description: 'We can use run-length encoding to encode a sequence of integers. Design an iterator that iterates through a run-length encoded sequence with next(n) returning the n-th exhausted element (or -1 if exhausted).',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'encoding.length <= 1000, 1 <= n <= 10^9',
    inputFormat: 'encoding, operations',
    outputFormat: 'List of outputs.',
    sampleInput: '[3,8,0,9,2,5], [2,1,1,2]',
    sampleOutput: '[8,8,5,-1]',
    points: 100,
    hints: ['Maintain current index in encoding array. Deduct n from current count, advancing index by 2 when exhausted.'],
    codeTemplates: {
      python: 'class Solution:\n    def executeRLE(self, encoding: list, operations: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executeRLE(encoding, operations) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executeRLE(self, encoding: list, operations: list) -> list:
        enc = list(encoding)
        idx = 0
        res = []
        for n in operations:
            last = -1
            while idx < len(enc) and n > 0:
                if enc[idx] >= n:
                    enc[idx] -= n
                    last = enc[idx + 1]
                    n = 0
                else:
                    n -= enc[idx]
                    enc[idx] = 0
                    idx += 2
            res.append(last if n == 0 else -1)
        return res`,
      javascript: `class Solution {
    executeRLE(encoding, operations) {
        const enc = [...encoding];
        let idx = 0;
        const res = [];
        for (let n of operations) {
            let last = -1;
            while (idx < enc.length && n > 0) {
                if (enc[idx] >= n) {
                    enc[idx] -= n;
                    last = enc[idx + 1];
                    n = 0;
                } else {
                    n -= enc[idx];
                    enc[idx] = 0;
                    idx += 2;
                }
            }
            res.push(n === 0 ? last : -1);
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Run-Length Exhaustion Cursor.',
      algorithm: 'Consume runs in linear order across successive query demands.',
      timeComplexity: 'Amortized O(1) per consumed element',
      spaceComplexity: 'O(1)',
      content: 'Standard RLE streaming iterator.',
      referenceCode: 'if enc[idx] >= n: enc[idx] -= n; last = enc[idx + 1]; n = 0',
    },
    tags: ['Design', 'Array', 'Iterator'],
    testCases: [
      { input: '[3,8,0,9,2,5], [2,1,1,2]', expectedOutput: '[8,8,5,-1]', isHidden: false, order: 0 },
      { input: '[1,5], [1,1]', expectedOutput: '[5,-1]', isHidden: false, order: 1 },
      { input: '[2,3], [1]', expectedOutput: '[3]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Design Underground System Transit Analytics',
    slug: 'design-underground-system-transit-analytics',
    description: 'An underground railway system is keeping track of customer travel times between different stations. Implement checkIn(id, stationName, t), checkOut(id, stationName, t), and getAverageTime(startStation, endStation).',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'operations <= 2 * 10^4',
    inputFormat: 'operations',
    outputFormat: 'List of outputs.',
    sampleInput: '[["checkIn",45,"Leyton",3],["checkIn",32,"Paradise",8],["checkOut",45,"Waterloo",15],["checkOut",32,"Cambridge",22],["getAverageTime","Paradise","Cambridge"],["getAverageTime","Leyton","Waterloo"]]',
    sampleOutput: '[null,null,null,null,14.0,12.0]',
    points: 100,
    hints: ['Store active check-ins in user_map and aggregated travel times (total_time, count) in route_map.'],
    codeTemplates: {
      python: 'class Solution:\n    def executeUnderground(self, operations: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executeUnderground(operations) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executeUnderground(self, operations: list) -> list:
        check_ins = {}
        routes = {}
        res = []
        for op in operations:
            if op[0] == "checkIn":
                _, uid, st, t = op
                check_ins[uid] = (st, t)
                res.append(None)
            elif op[0] == "checkOut":
                _, uid, end_st, t = op
                start_st, start_t = check_ins.pop(uid)
                r = (start_st, end_st)
                if r not in routes: routes[r] = [0, 0]
                routes[r][0] += (t - start_t)
                routes[r][1] += 1
                res.append(None)
            elif op[0] == "getAverageTime":
                _, start_st, end_st = op
                total, count = routes[(start_st, end_st)]
                res.append(round(total / count, 5))
        return res`,
      javascript: `class Solution {
    executeUnderground(operations) {
        const checkIns = new Map();
        const routes = new Map();
        const res = [];
        for (const op of operations) {
            if (op[0] === "checkIn") {
                const [_, uid, st, t] = op;
                checkIns.set(uid, [st, t]);
                res.push(null);
            } else if (op[0] === "checkOut") {
                const [_, uid, endSt, t] = op;
                const [startSt, startT] = checkIns.get(uid);
                checkIns.delete(uid);
                const r = \`\${startSt}->\${endSt}\`;
                if (!routes.has(r)) routes.set(r, [0, 0]);
                routes.get(r)[0] += (t - startT);
                routes.get(r)[1] += 1;
                res.push(null);
            } else if (op[0] === "getAverageTime") {
                const [_, startSt, endSt] = op;
                const [total, count] = routes.get(\`\${startSt}->\${endSt}\`);
                res.push(Number((total / count).toFixed(5)));
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Route Aggregated Hash Table Tracking.',
      algorithm: 'Map user check-in state to active timestamps and maintain running sum & count per station pair.',
      timeComplexity: 'O(1) per checkIn/checkOut/getAverageTime',
      spaceComplexity: 'O(Routes + Active Users)',
      content: 'Standard transactional transit telemetry system.',
      referenceCode: 'routes[r][0] += (t - start_t); routes[r][1] += 1',
    },
    tags: ['Design', 'Hash Table', 'String'],
    testCases: [
      { input: '[["checkIn",45,"Leyton",3],["checkIn",32,"Paradise",8],["checkOut",45,"Waterloo",15],["checkOut",32,"Cambridge",22],["getAverageTime","Paradise","Cambridge"],["getAverageTime","Leyton","Waterloo"]]', expectedOutput: '[null,null,null,null,14.0,12.0]', isHidden: false, order: 0 },
      { input: '[["checkIn",10,"A",1],["checkOut",10,"B",5],["getAverageTime","A","B"]]', expectedOutput: '[null,null,4.0]', isHidden: false, order: 1 },
      { input: '[["checkIn",1,"A",1],["checkOut",1,"B",3],["checkIn",2,"A",5],["checkOut",2,"B",11],["getAverageTime","A","B"]]', expectedOutput: '[null,null,null,null,4.0]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'My Calendar I Non-Overlapping Booking',
    slug: 'my-calendar-i-non-overlapping-booking',
    description: 'Implement a MyCalendar class to store your events. A new event can be added if adding the event will not cause a double booking. Implement book(startTime, endTime) returning true if successful and false otherwise.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'operations <= 1000, 0 <= startTime < endTime <= 10^9',
    inputFormat: 'events',
    outputFormat: 'List of boolean booking results.',
    sampleInput: '[[10,20],[15,25],[20,30]]',
    sampleOutput: '[true,false,true]',
    points: 100,
    hints: ['Check overlap with existing intervals: max(s1, s2) < min(e1, e2). Use BST/treemap for O(log N).'],
    codeTemplates: {
      python: 'class Solution:\n    def executeCalendar(self, events: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executeCalendar(events) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executeCalendar(self, events: list) -> list:
        booked = []
        res = []
        for s, e in events:
            overlap = False
            for bs, be in booked:
                if max(s, bs) < min(e, be):
                    overlap = True
                    break
            if not overlap:
                booked.append((s, e))
                res.append(True)
            else:
                res.append(False)
        return res`,
      javascript: `class Solution {
    executeCalendar(events) {
        const booked = [];
        const res = [];
        for (const [s, e] of events) {
            let overlap = false;
            for (const [bs, be] of booked) {
                if (Math.max(s, bs) < Math.min(e, be)) {
                    overlap = true;
                    break;
                }
            }
            if (!overlap) {
                booked.push([s, e]);
                res.push(true);
            } else {
                res.push(false);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Interval Overlap Detection.',
      algorithm: 'Two intervals overlap iff max(start1, start2) < min(end1, end2).',
      timeComplexity: 'O(N^2) or O(N log N) with BST',
      spaceComplexity: 'O(N)',
      content: 'Standard calendar interval scheduling.',
      referenceCode: 'if max(s, bs) < min(e, be): overlap = True',
    },
    tags: ['Design', 'Segment Tree', 'Binary Search Tree', 'Ordered Set'],
    testCases: [
      { input: '[[10,20],[15,25],[20,30]]', expectedOutput: '[true,false,true]', isHidden: false, order: 0 },
      { input: '[[47,50],[33,41],[39,45],[33,42],[25,32],[26,35],[19,25],[3,8],[8,13],[18,27]]', expectedOutput: '[true,true,false,false,true,false,true,true,true,false]', isHidden: false, order: 1 },
      { input: '[[1,2]]', expectedOutput: '[true]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'My Calendar II Double Booking Allowed',
    slug: 'my-calendar-ii-double-booking-allowed',
    description: 'Implement a MyCalendarTwo class where an event can be added if it does not cause a triple booking.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'operations <= 1000, 0 <= startTime < endTime <= 10^9',
    inputFormat: 'events',
    outputFormat: 'List of booleans.',
    sampleInput: '[[10,20],[50,60],[10,40],[5,15],[5,10],[25,55]]',
    sampleOutput: '[true,true,true,false,true,true]',
    points: 150,
    hints: ['Maintain two lists: all single bookings and all overlapping regions (double bookings). Reject if overlapping with double bookings.'],
    codeTemplates: {
      python: 'class Solution:\n    def executeCalendarTwo(self, events: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executeCalendarTwo(events) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executeCalendarTwo(self, events: list) -> list:
        single = []
        double = []
        res = []
        for s, e in events:
            if any(max(s, ds) < min(e, de) for ds, de in double):
                res.append(False)
            else:
                for ss, se in single:
                    if max(s, ss) < min(e, se):
                        double.append((max(s, ss), min(e, se)))
                single.append((s, e))
                res.append(True)
        return res`,
      javascript: `class Solution {
    executeCalendarTwo(events) {
        const single = [];
        const double = [];
        const res = [];
        for (const [s, e] of events) {
            let conflict = false;
            for (const [ds, de] of double) {
                if (Math.max(s, ds) < Math.min(e, de)) {
                    conflict = true; break;
                }
            }
            if (conflict) {
                res.push(false);
            } else {
                for (const [ss, se] of single) {
                    if (Math.max(s, ss) < Math.min(e, se)) {
                        double.push([Math.max(s, ss), Math.min(e, se)]);
                    }
                }
                single.push([s, e]);
                res.push(true);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Two-Tier Overlap Tracking.',
      algorithm: 'Track pairwise intersection intervals in a secondary double-booking array.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N)',
      content: 'Standard k-booking calendar scheduling.',
      referenceCode: 'double.append((max(s, ss), min(e, se)))',
    },
    tags: ['Design', 'Segment Tree', 'Ordered Set'],
    testCases: [
      { input: '[[10,20],[50,60],[10,40],[5,15],[5,10],[25,55]]', expectedOutput: '[true,true,true,false,true,true]', isHidden: false, order: 0 },
      { input: '[[1,5],[2,6],[3,7]]', expectedOutput: '[true,true,false]', isHidden: false, order: 1 },
      { input: '[[10,20],[20,30]]', expectedOutput: '[true,true]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'My Calendar III Maximum Concurrent Overlap K-Booking',
    slug: 'my-calendar-iii-maximum-concurrent-overlap-k-booking',
    description: 'A k-booking happens when k events have some non-empty intersection. Implement book(startTime, endTime) returning the maximum k-booking after adding the event.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'operations <= 400, 0 <= startTime < endTime <= 10^9',
    inputFormat: 'events',
    outputFormat: 'List of max k values after each booking.',
    sampleInput: '[[10,20],[50,60],[10,40],[5,15],[5,10],[25,55]]',
    sampleOutput: '[1,1,2,3,3,3]',
    points: 200,
    hints: ['Use sweep-line boundary diff array: +1 at start, -1 at end, prefix sum for max active concurrent events.'],
    codeTemplates: {
      python: 'class Solution:\n    def executeCalendarThree(self, events: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executeCalendarThree(events) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executeCalendarThree(self, events: list) -> list:
        import collections
        timeline = collections.defaultdict(int)
        res = []
        for s, e in events:
            timeline[s] += 1
            timeline[e] -= 1
            cur = 0
            k = 0
            for t in sorted(timeline.keys()):
                cur += timeline[t]
                k = max(k, cur)
            res.append(k)
        return res`,
      javascript: `class Solution {
    executeCalendarThree(events) {
        const timeline = new Map();
        const res = [];
        for (const [s, e] of events) {
            timeline.set(s, (timeline.get(s) || 0) + 1);
            timeline.set(e, (timeline.get(e) || 0) - 1);
            const sortedTimes = Array.from(timeline.keys()).sort((a, b) => a - b);
            let cur = 0, k = 0;
            for (const t of sortedTimes) {
                cur += timeline.get(t);
                k = Math.max(k, cur);
            }
            res.push(k);
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Sweep-Line Point Diff Map.',
      algorithm: 'Sort endpoint delta keys and compute maximum prefix sum.',
      timeComplexity: 'O(N^2 log N) or O(N log N) with Segment Tree',
      spaceComplexity: 'O(N)',
      content: 'Standard sweep-line event concurrency counter.',
      referenceCode: 'timeline[s] += 1; timeline[e] -= 1',
    },
    tags: ['Design', 'Segment Tree', 'Ordered Set', 'Sweep Line'],
    testCases: [
      { input: '[[10,20],[50,60],[10,40],[5,15],[5,10],[25,55]]', expectedOutput: '[1,1,2,3,3,3]', isHidden: false, order: 0 },
      { input: '[[1,2],[2,3],[3,4]]', expectedOutput: '[1,1,1]', isHidden: false, order: 1 },
      { input: '[[1,5],[1,5],[1,5]]', expectedOutput: '[1,2,3]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Tic-Tac-Toe Move Judge O1 Design',
    slug: 'tic-tac-toe-move-judge-o1-design',
    description: 'Design a Tic-tac-toe game that is played on an n x n grid between two players. Support move(row, col, player) returning 0 (no winner), 1 (player 1 wins), or 2 (player 2 wins) in O(1) time.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '2 <= n <= 100, moves <= n^2',
    inputFormat: 'n, moves',
    outputFormat: 'List of results for each move.',
    sampleInput: '3, [[0,0,1],[0,2,2],[2,2,1],[1,1,2],[2,0,1],[1,0,2],[2,1,1]]',
    sampleOutput: '[0,0,0,0,0,0,1]',
    points: 100,
    hints: ['Count +1 for player 1 and -1 for player 2 in row, col, diag, and anti-diag counts.'],
    codeTemplates: {
      python: 'class Solution:\n    def executeTicTacToe(self, n: int, moves: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executeTicTacToe(n, moves) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executeTicTacToe(self, n: int, moves: list) -> list:
        rows = [0] * n
        cols = [0] * n
        diag = 0
        anti_diag = 0
        res = []
        for r, c, player in moves:
            val = 1 if player == 1 else -1
            rows[r] += val
            cols[c] += val
            if r == c: diag += val
            if r + c == n - 1: anti_diag += val
            if abs(rows[r]) == n or abs(cols[c]) == n or abs(diag) == n or abs(anti_diag) == n:
                res.append(player)
            else:
                res.append(0)
        return res`,
      javascript: `class Solution {
    executeTicTacToe(n, moves) {
        const rows = Array(n).fill(0);
        const cols = Array(n).fill(0);
        let diag = 0, antiDiag = 0;
        const res = [];
        for (const [r, c, player] of moves) {
            const val = player === 1 ? 1 : -1;
            rows[r] += val;
            cols[c] += val;
            if (r === c) diag += val;
            if (r + c === n - 1) antiDiag += val;
            if (Math.abs(rows[r]) === n || Math.abs(cols[c]) === n || Math.abs(diag) === n || Math.abs(antiDiag) === n) {
                res.push(player);
            } else {
                res.push(0);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'O(1) Vector Sum Verification.',
      algorithm: 'Track row/col/diagonal signed sums (+1 / -1). Winning condition is |sum| == n.',
      timeComplexity: 'O(1) per move',
      spaceComplexity: 'O(N)',
      content: 'Standard Tic-Tac-Toe O(1) decision matrix.',
      referenceCode: 'if abs(rows[r]) == n or abs(cols[c]) == n or abs(diag) == n or abs(anti_diag) == n: return player',
    },
    tags: ['Design', 'Array', 'Matrix', 'Simulation'],
    testCases: [
      { input: '3, [[0,0,1],[0,2,2],[2,2,1],[1,1,2],[2,0,1],[1,0,2],[2,1,1]]', expectedOutput: '[0,0,0,0,0,0,1]', isHidden: false, order: 0 },
      { input: '2, [[0,0,1],[0,1,2],[1,1,1]]', expectedOutput: '[0,0,1]', isHidden: false, order: 1 },
      { input: '3, [[0,0,1]]', expectedOutput: '[0]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Insert Delete GetRandom O1 Duplicates Allowed',
    slug: 'insert-delete-getrandom-o1-duplicates-allowed',
    description: 'Implement the RandomizedCollection class that supports insert(val), remove(val), and getRandom() in average O(1) time complexity allowing duplicate elements.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'operations <= 2 * 10^5',
    inputFormat: 'operations',
    outputFormat: 'List of outputs.',
    sampleInput: '[["insert",1],["insert",1],["insert",2],["getRandom"],["remove",1],["getRandom"]]',
    sampleOutput: '[true,false,true,1,true,1]',
    points: 200,
    hints: ['Map each value to a Set of indices in the nums array.'],
    codeTemplates: {
      python: 'class Solution:\n    def executeRandomizedCollection(self, operations: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executeRandomizedCollection(operations) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executeRandomizedCollection(self, operations: list) -> list:
        import collections
        val_to_indices = collections.defaultdict(set)
        nums = []
        res = []
        for op in operations:
            if op[0] == "insert":
                v = op[1]
                first_time = len(val_to_indices[v]) == 0
                val_to_indices[v].add(len(nums))
                nums.append(v)
                res.append(first_time)
            elif op[0] == "remove":
                v = op[1]
                if not val_to_indices[v]:
                    res.append(False)
                else:
                    idx = val_to_indices[v].pop()
                    last = nums[-1]
                    nums[idx] = last
                    val_to_indices[last].add(idx)
                    val_to_indices[last].discard(len(nums) - 1)
                    nums.pop()
                    res.append(True)
            elif op[0] == "getRandom":
                res.append(nums[0] if nums else None)
        return res`,
      javascript: `class Solution {
    executeRandomizedCollection(operations) {
        const valToIndices = new Map();
        const nums = [];
        const res = [];
        for (const op of operations) {
            if (op[0] === "insert") {
                const v = op[1];
                if (!valToIndices.has(v)) valToIndices.set(v, new Set());
                const firstTime = valToIndices.get(v).size === 0;
                valToIndices.get(v).add(nums.length);
                nums.push(v);
                res.push(firstTime);
            } else if (op[0] === "remove") {
                const v = op[1];
                if (!valToIndices.has(v) || valToIndices.get(v).size === 0) {
                    res.push(false);
                } else {
                    const idx = valToIndices.get(v).values().next().value;
                    valToIndices.get(v).delete(idx);
                    const last = nums[nums.length - 1];
                    nums[idx] = last;
                    valToIndices.get(last).add(idx);
                    valToIndices.get(last).delete(nums.length - 1);
                    nums.pop();
                    res.push(true);
                }
            } else if (op[0] === "getRandom") {
                res.push(nums.length > 0 ? nums[0] : null);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Value-to-IndexSet Map + Swap Deletion.',
      algorithm: 'Map each value to a set of indices in nums. Swap with back and update set pointers.',
      timeComplexity: 'O(1) average per operation',
      spaceComplexity: 'O(N)',
      content: 'Standard randomized collection design.',
      referenceCode: 'val_to_indices[last].add(idx); val_to_indices[last].discard(len(nums) - 1)',
    },
    tags: ['Design', 'Array', 'Hash Table', 'Randomized'],
    testCases: [
      { input: '[["insert",1],["insert",1],["insert",2],["getRandom"],["remove",1],["getRandom"]]', expectedOutput: '[true,false,true,1,true,1]', isHidden: false, order: 0 },
      { input: '[["insert",1],["remove",1],["insert",1]]', expectedOutput: '[true,true,true]', isHidden: false, order: 1 },
      { input: '[["remove",0]]', expectedOutput: '[false]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Design Compressed String Iterator',
    slug: 'design-compressed-string-iterator',
    description: 'Design and implement a data structure for a Compressed String Iterator. The given compressed string will be in the form of each letter followed by the count of that character (e.g. L1e2t1c1o1d1e1). Implement next() and hasNext().',
    difficulty: 'EASY',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'compressedString.length <= 1000, operations <= 1000',
    inputFormat: 'compressedString, operations',
    outputFormat: 'List of outputs.',
    sampleInput: '"L1e2t1c1o1d1e1", ["next","next","next","next","next","next","hasNext","next","hasNext"]',
    sampleOutput: '["L","e","e","t","c","o",true,"d",true]',
    points: 50,
    hints: ['Parse character and multi-digit count into active buffer variable.'],
    codeTemplates: {
      python: 'class Solution:\n    def executeStringIterator(self, compressedString: str, operations: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executeStringIterator(compressedString, operations) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executeStringIterator(self, compressedString: str, operations: list) -> list:
        import re
        tokens = re.findall(r'([A-Za-z])(\d+)', compressedString)
        tokens = [[ch, int(cnt)] for ch, cnt in tokens]
        idx = 0
        res = []
        for op in operations:
            if op == "next":
                if idx < len(tokens):
                    res.append(tokens[idx][0])
                    tokens[idx][1] -= 1
                    if tokens[idx][1] == 0:
                        idx += 1
                else:
                    res.append(" ")
            elif op == "hasNext":
                res.append(idx < len(tokens))
        return res`,
      javascript: `class Solution {
    executeStringIterator(compressedString, operations) {
        const tokens = [];
        let i = 0;
        while (i < compressedString.length) {
            const ch = compressedString[i++];
            let cntStr = "";
            while (i < compressedString.length && compressedString[i] >= '0' && compressedString[i] <= '9') {
                cntStr += compressedString[i++];
            }
            tokens.push([ch, Number(cntStr)]);
        }
        let idx = 0;
        const res = [];
        for (const op of operations) {
            if (op === "next") {
                if (idx < tokens.length) {
                    res.push(tokens[idx][0]);
                    tokens[idx][1]--;
                    if (tokens[idx][1] === 0) idx++;
                } else {
                    res.push(" ");
                }
            } else if (op === "hasNext") {
                res.push(idx < tokens.length);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Token-Buffered Character Count Iterator.',
      algorithm: 'Parse string into token pairs (char, count) and decrement active count per query.',
      timeComplexity: 'O(1) per next/hasNext',
      spaceComplexity: 'O(Tokens)',
      content: 'Standard string compression iterator.',
      referenceCode: 'tokens[idx][1] -= 1; if tokens[idx][1] == 0: idx += 1',
    },
    tags: ['Design', 'String', 'Iterator'],
    testCases: [
      { input: '"L1e2t1c1o1d1e1", ["next","next","next","next","next","next","hasNext","next","hasNext"]', expectedOutput: '["L","e","e","t","c","o",true,"d",true]', isHidden: false, order: 0 },
      { input: '"a1", ["next","hasNext"]', expectedOutput: '["a",false]', isHidden: false, order: 1 },
      { input: '"x3", ["next","next","next","next"]', expectedOutput: '["x","x","x"," "]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Range Sum Query 2D Mutable 2D Fenwick Tree',
    slug: 'range-sum-query-2d-mutable-2d-fenwick-tree',
    description: 'Given a 2D matrix matrix, handle multiple queries of the following types: update(row, col, val) and sumRegion(row1, col1, row2, col2).',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: 'm, n <= 200, operations <= 10^4',
    inputFormat: 'matrix, operations',
    outputFormat: 'List of outputs.',
    sampleInput: '[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]], [["sumRegion",2,1,4,3],["update",3,2,2],["sumRegion",2,1,4,3]]',
    sampleOutput: '[8,null,10]',
    points: 200,
    hints: ['Implement a 2D Binary Indexed Tree (BIT / Fenwick Tree) supporting 2D point updates and 2D prefix sums.'],
    codeTemplates: {
      python: 'class Solution:\n    def executeNumMatrix(self, matrix: list, operations: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executeNumMatrix(matrix, operations) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executeNumMatrix(self, matrix: list, operations: list) -> list:
        if not matrix or not matrix[0]: return []
        m, n = len(matrix), len(matrix[0])
        tree = [[0] * (n + 1) for _ in range(m + 1)]
        mat = [row[:] for row in matrix]
        def update_bit(r, c, delta):
            i = r + 1
            while i <= m:
                j = c + 1
                while j <= n:
                    tree[i][j] += delta
                    j += j & (-j)
                i += i & (-i)
        def query_bit(r, c):
            s = 0
            i = r + 1
            while i > 0:
                j = c + 1
                while j > 0:
                    s += tree[i][j]
                    j -= j & (-j)
                i -= i & (-i)
            return s
        for r in range(m):
            for c in range(n):
                update_bit(r, c, mat[r][c])
        res = []
        for op in operations:
            if op[0] == "update":
                _, r, c, val = op
                delta = val - mat[r][c]
                mat[r][c] = val
                update_bit(r, c, delta)
                res.append(None)
            elif op[0] == "sumRegion":
                _, r1, c1, r2, c2 = op
                s = query_bit(r2, c2) - query_bit(r1 - 1, c2) - query_bit(r2, c1 - 1) + query_bit(r1 - 1, c1 - 1)
                res.append(s)
        return res`,
      javascript: `class Solution {
    executeNumMatrix(matrix, operations) {
        if (!matrix || matrix.length === 0) return [];
        const m = matrix.length, n = matrix[0].length;
        const tree = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
        const mat = matrix.map(r => [...r]);
        function updateBit(r, c, delta) {
            for (let i = r + 1; i <= m; i += i & -i) {
                for (let j = c + 1; j <= n; j += j & -j) {
                    tree[i][j] += delta;
                }
            }
        }
        function queryBit(r, c) {
            let s = 0;
            for (let i = r + 1; i > 0; i -= i & -i) {
                for (let j = c + 1; j > 0; j -= j & -j) {
                    s += tree[i][j];
                }
            }
            return s;
        }
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) updateBit(r, c, mat[r][c]);
        }
        const res = [];
        for (const op of operations) {
            if (op[0] === "update") {
                const [_, r, c, val] = op;
                const delta = val - mat[r][c];
                mat[r][c] = val;
                updateBit(r, c, delta);
                res.push(null);
            } else if (op[0] === "sumRegion") {
                const [_, r1, c1, r2, c2] = op;
                const s = queryBit(r2, c2) - queryBit(r1 - 1, c2) - queryBit(r2, c1 - 1) + queryBit(r1 - 1, c1 - 1);
                res.push(s);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: '2D Binary Indexed Tree (Fenwick Tree).',
      algorithm: '2D Fenwick tree updates and queries rectangular prefix sums in O(log M * log N).',
      timeComplexity: 'Update O(log M * log N), Query O(log M * log N)',
      spaceComplexity: 'O(M * N)',
      content: 'Standard 2D BIT point update range query.',
      referenceCode: 'tree[i][j] += delta; j += j & (-j)',
    },
    tags: ['Design', 'Binary Indexed Tree', 'Segment Tree', 'Matrix'],
    testCases: [
      { input: '[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]], [["sumRegion",2,1,4,3],["update",3,2,2],["sumRegion",2,1,4,3]]', expectedOutput: '[8,null,10]', isHidden: false, order: 0 },
      { input: '[[1]], [["sumRegion",0,0,0,0],["update",0,0,10],["sumRegion",0,0,0,0]]', expectedOutput: '[1,null,10]', isHidden: false, order: 1 },
      { input: '[[1,2],[3,4]], [["sumRegion",0,0,1,1]]', expectedOutput: '[10]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Phone Directory Memory Pool Allocation',
    slug: 'phone-directory-memory-pool-allocation',
    description: 'Design a phone directory that manages a pool of maxNumbers phone numbers from 0 to maxNumbers - 1. Implement get(), check(number), and release(number).',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= maxNumbers <= 10^4, operations <= 2 * 10^4',
    inputFormat: 'maxNumbers, operations',
    outputFormat: 'List of outputs.',
    sampleInput: '3, [["get"],["get"],["check",2],["get"],["check",2],["release",2],["check",2]]',
    sampleOutput: '[0,1,true,2,false,null,true]',
    points: 100,
    hints: ['Maintain a queue of available numbers and a HashSet / bitset of allocated numbers.'],
    codeTemplates: {
      python: 'class Solution:\n    def executePhoneDirectory(self, maxNumbers: int, operations: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executePhoneDirectory(maxNumbers, operations) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executePhoneDirectory(self, maxNumbers: int, operations: list) -> list:
        import collections
        available = collections.deque(range(maxNumbers))
        used = set()
        res = []
        for op in operations:
            if op[0] == "get":
                if available:
                    num = available.popleft()
                    used.add(num)
                    res.append(num)
                else:
                    res.append(-1)
            elif op[0] == "check":
                num = op[1]
                res.append(num not in used)
            elif op[0] == "release":
                num = op[1]
                if num in used:
                    used.remove(num)
                    available.append(num)
                res.append(None)
        return res`,
      javascript: `class Solution {
    executePhoneDirectory(maxNumbers, operations) {
        const available = Array.from({ length: maxNumbers }, (_, i) => i);
        const used = new Set();
        const res = [];
        for (const op of operations) {
            if (op[0] === "get") {
                if (available.length > 0) {
                    const num = available.shift();
                    used.add(num);
                    res.push(num);
                } else {
                    res.push(-1);
                }
            } else if (op[0] === "check") {
                res.push(!used.has(op[1]));
            } else if (op[0] === "release") {
                const num = op[1];
                if (used.has(num)) {
                    used.delete(num);
                    available.push(num);
                }
                res.push(null);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Queue + Hash Set ID Pool Allocator.',
      algorithm: 'O(1) allocation and deallocation of unique numerical tokens.',
      timeComplexity: 'O(1) per get/check/release',
      spaceComplexity: 'O(MaxNumbers)',
      content: 'Standard resource pool memory allocator.',
      referenceCode: 'used.remove(num); available.append(num)',
    },
    tags: ['Design', 'Queue', 'Hash Table', 'Linked List'],
    testCases: [
      { input: '3, [["get"],["get"],["check",2],["get"],["check",2],["release",2],["check",2]]', expectedOutput: '[0,1,true,2,false,null,true]', isHidden: false, order: 0 },
      { input: '1, [["check",0],["get"],["check",0]]', expectedOutput: '[true,0,false]', isHidden: false, order: 1 },
      { input: '1, [["get"],["get"]]', expectedOutput: '[0,-1]', isHidden: true, order: 2 },
    ],
  },
  {
    title: 'Snapshot Array Versioned State Design',
    slug: 'snapshot-array-versioned-state-design',
    description: 'Implement a SnapshotArray that supports set(index, val), snap(), and get(index, snap_id). Snap() takes a snapshot of the array and returns the snap_id (the total number of times we called snap() minus 1). Get(index, snap_id) returns the value at the given index at the time we took the snapshot with the given snap_id.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= length <= 5 * 10^4, 0 <= index < length, 0 <= val <= 10^9, 0 <= snap_id < total snaps, total calls <= 5 * 10^4',
    inputFormat: 'length, operations',
    outputFormat: 'List of return values for snap/get/set operations.',
    sampleInput: '3, [["set",0,5],["snap"],["set",0,6],["get",0,0]]',
    sampleOutput: '[null,0,null,5]',
    points: 100,
    hints: ['Store history of (snap_id, value) per index and use binary search (bisect) for get query.'],
    codeTemplates: {
      python: 'class Solution:\n    def executeSnapshotArray(self, length: int, operations: list) -> list:\n        pass',
      javascript: 'class Solution {\n    executeSnapshotArray(length, operations) {\n        \n    }\n}',
    },
    referenceSolutions: {
      python: `class Solution:
    def executeSnapshotArray(self, length: int, operations: list) -> list:
        import bisect
        arr = [[[-1, 0]] for _ in range(length)]
        snap_id = 0
        res = []
        for op in operations:
            if op[0] == "set":
                idx, val = op[1], op[2]
                if arr[idx][-1][0] == snap_id:
                    arr[idx][-1][1] = val
                else:
                    arr[idx].append([snap_id, val])
                res.append(None)
            elif op[0] == "snap":
                res.append(snap_id)
                snap_id += 1
            elif op[0] == "get":
                idx, sid = op[1], op[2]
                history = arr[idx]
                pos = bisect.bisect_right(history, [sid, float('inf')]) - 1
                res.append(history[pos][1])
        return res`,
      javascript: `class Solution {
    executeSnapshotArray(length, operations) {
        const arr = Array.from({ length }, () => [[-1, 0]]);
        let snapId = 0;
        const res = [];
        for (const op of operations) {
            if (op[0] === "set") {
                const idx = op[1], val = op[2];
                const hist = arr[idx];
                if (hist[hist.length - 1][0] === snapId) {
                    hist[hist.length - 1][1] = val;
                } else {
                    hist.push([snapId, val]);
                }
                res.push(null);
            } else if (op[0] === "snap") {
                res.push(snapId);
                snapId++;
            } else if (op[0] === "get") {
                const idx = op[1], sid = op[2];
                const hist = arr[idx];
                let low = 0, high = hist.length - 1, ans = 0;
                while (low <= high) {
                    const mid = Math.floor((low + high) / 2);
                    if (hist[mid][0] <= sid) {
                        ans = hist[mid][1];
                        low = mid + 1;
                    } else {
                        high = mid - 1;
                    }
                }
                res.push(ans);
            }
        }
        return res;
    }
}`,
    },
    editorial: {
      approach: 'Array of Version History + Binary Search Bisect.',
      algorithm: 'Keep list of [snap_id, val] pairs per index. Query with bisect_right.',
      timeComplexity: 'O(log(snaps)) per get, O(1) set/snap',
      spaceComplexity: 'O(N + total set calls)',
      content: 'Standard persistent array implementation using history logs.',
      referenceCode: 'bisect_right(history, [sid, inf]) - 1',
    },
    tags: ['Design', 'Binary Search', 'Array', 'Hash Table'],
    testCases: [
      { input: '3, [["set",0,5],["snap"],["set",0,6],["get",0,0]]', expectedOutput: '[null,0,null,5]', isHidden: false, order: 0 },
      { input: '1, [["set",0,15],["snap"],["snap"],["get",0,0],["get",0,1]]', expectedOutput: '[null,0,1,15,15]', isHidden: false, order: 1 },
      { input: '2, [["snap"],["get",0,0],["get",1,0]]', expectedOutput: '[0,0,0]', isHidden: true, order: 2 },
    ],
  },
];

writePack('pack-500-part-k.ts', 'pack500PartKDefs', problemsK);
