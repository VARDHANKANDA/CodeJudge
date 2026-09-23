import { writePack, ProblemSpec } from './pack-writer-util';

// PACK K: System & Data Structure Designs (19 problems)
const packK: ProblemSpec[] = [
  {
    title: 'LFU Cache O(1) Operations',
    slug: 'lfu-cache-o1-frequency-doubly-linked-list',
    description: 'Design and implement a data structure for a Least Frequently Used (LFU) cache. Implement get(key) and put(key, value) in O(1) average time complexity.',
    difficulty: 'HARD',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= capacity <= 10^4\n0 <= key <= 10^5\n0 <= value <= 10^9\nAt most 2 * 10^5 calls to get and put.',
    inputFormat: 'operations, arguments',
    outputFormat: 'List of operation results (null for put, integer for get).',
    sampleInput: '["LFUCache","put","put","get","put","get","get","put","get","get","get"], [[2],[1,1],[2,2],[1],[3,3],[2],[3],[4,4],[1],[3],[4]]',
    sampleOutput: '[null, null, null, 1, null, -1, 3, null, -1, 3, 4]',
    points: 200,
    hints: [
      'Maintain key_to_val, key_to_freq, and freq_to_keys (OrderedDict or Doubly Linked List of keys for each frequency).',
      'Track min_freq across all keys.',
      'When eviction occurs, pop the least recently used key from freq_to_keys[min_freq].',
    ],
    codeTemplates: {
      python: `class LFUCache:\n    def __init__(self, capacity: int):\n        pass\n    def get(self, key: int) -> int:\n        pass\n    def put(self, key: int, value: int) -> None:\n        pass`,
      javascript: `class LFUCache {\n    constructor(capacity) {\n        \n    }\n    get(key) {\n        \n    }\n    put(key, value) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `from collections import defaultdict, OrderedDict

class Solution:
    def execute(self, ops: list[str], args: list[list[int]]) -> list:
        cap = args[0][0]
        cache = {}
        freq = {}
        freq_keys = defaultdict(OrderedDict)
        min_freq = 0
        ans = [None]
        
        def update_freq(key):
            nonlocal min_freq
            f = freq[key]
            del freq_keys[f][key]
            if not freq_keys[f] and min_freq == f:
                min_freq += 1
            freq[key] = f + 1
            freq_keys[f + 1][key] = True

        for op, arg in zip(ops[1:], args[1:]):
            if op == "get":
                k = arg[0]
                if k not in cache:
                    ans.append(-1)
                else:
                    update_freq(k)
                    ans.append(cache[k])
            elif op == "put":
                k, v = arg[0], arg[1]
                if cap == 0:
                    ans.append(None)
                    continue
                if k in cache:
                    cache[k] = v
                    update_freq(k)
                else:
                    if len(cache) >= cap:
                        evict_k, _ = freq_keys[min_freq].popitem(last=False)
                        del cache[evict_k]
                        del freq[evict_k]
                    cache[k] = v
                    freq[k] = 1
                    freq_keys[1][k] = True
                    min_freq = 1
                ans.append(None)
        return ans`,
      javascript: `class Solution {
    execute(ops, args) {
        const cap = args[0][0];
        const cache = new Map();
        const freq = new Map();
        const freqKeys = new Map();
        let minFreq = 0;
        const ans = [null];
        
        function updateFreq(key) {
            const f = freq.get(key);
            freqKeys.get(f).delete(key);
            if (freqKeys.get(f).size === 0 && minFreq === f) {
                minFreq++;
            }
            freq.set(key, f + 1);
            if (!freqKeys.has(f + 1)) freqKeys.set(f + 1, new Set());
            freqKeys.get(f + 1).add(key);
        }
        
        for (let i = 1; i < ops.length; i++) {
            const op = ops[i];
            const arg = args[i];
            if (op === "get") {
                const k = arg[0];
                if (!cache.has(k)) {
                    ans.push(-1);
                } else {
                    updateFreq(k);
                    ans.push(cache.get(k));
                }
            } else if (op === "put") {
                const [k, v] = arg;
                if (cap === 0) {
                    ans.push(null);
                    continue;
                }
                if (cache.has(k)) {
                    cache.set(k, v);
                    updateFreq(k);
                } else {
                    if (cache.size >= cap) {
                        const minSet = freqKeys.get(minFreq);
                        const evictK = minSet.values().next().value;
                        minSet.delete(evictK);
                        cache.delete(evictK);
                        freq.delete(evictK);
                    }
                    cache.set(k, v);
                    freq.set(k, 1);
                    if (!freqKeys.has(1)) freqKeys.set(1, new Set());
                    freqKeys.get(1).add(k);
                    minFreq = 1;
                }
                ans.push(null);
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Frequency bucketing with doubly-linked sets.',
      algorithm: 'Keep frequency-to-keys linked lists with O(1) min_freq tracking.',
      timeComplexity: 'O(1) per get/put',
      spaceComplexity: 'O(capacity)',
      content: 'Classic cache replacement data structure with optimal constant overhead.',
      referenceCode: `def execute(ops, args): ...`,
    },
    tags: ['Design', 'Hash Table', 'Linked List', 'Doubly-Linked List'],
    testCases: [
      { input: '["LFUCache","put","put","get","put","get","get","put","get","get","get"], [[2],[1,1],[2,2],[1],[3,3],[2],[3],[4,4],[1],[3],[4]]', expectedOutput: '[null, null, null, 1, null, -1, 3, null, -1, 3, 4]', isHidden: false },
      { input: '["LFUCache","put","get"], [[0],[0,0],[0]]', expectedOutput: '[null, null, -1]', isHidden: false },
      { input: '["LFUCache","put","put","get","get"], [[1],[1,10],[2,20],[1],[2]]', expectedOutput: '[null, null, null, -1, 20]', isHidden: true },
      { input: '["LFUCache","put","get"], [[1],[1,1],[1]]', expectedOutput: '[null, null, 1]', isHidden: true },
    ],
  },
  {
    title: 'Time Based Key-Value Store',
    slug: 'time-based-key-value-store',
    description: 'Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key\'s value at a certain timestamp.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= key.length, value.length <= 100\nkey and value consist of lowercase English letters and digits.\n1 <= timestamp <= 10^7\nAll timestamps of set calls are strictly increasing.',
    inputFormat: 'operations, arguments',
    outputFormat: 'List of operation results.',
    sampleInput: '["TimeMap","set","get","get","set","get","get"], [[],["foo","bar",1],["foo",1],["foo",3],["foo","bar2",4],["foo",4],["foo",5]]',
    sampleOutput: '[null, null, "bar", "bar", null, "bar2", "bar2"]',
    points: 150,
    hints: [
      'Store a list of (timestamp, value) pairs for each key.',
      'Since timestamps arrive in strictly increasing order, the list is already sorted.',
      'Use binary search (bisect_right) to find the largest timestamp <= query timestamp.',
    ],
    codeTemplates: {
      python: `class TimeMap:\n    def __init__(self):\n        pass\n    def set(self, key: str, value: str, timestamp: int) -> None:\n        pass\n    def get(self, key: str, timestamp: int) -> str:\n        pass`,
      javascript: `class TimeMap {\n    constructor() {\n        \n    }\n    set(key, value, timestamp) {\n        \n    }\n    get(key, timestamp) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `import bisect
from collections import defaultdict

class Solution:
    def execute(self, ops: list[str], args: list) -> list:
        store = defaultdict(list)
        ans = [None]
        for op, arg in zip(ops[1:], args[1:]):
            if op == "set":
                k, v, t = arg
                store[k].append((t, v))
                ans.append(None)
            elif op == "get":
                k, t = arg
                arr = store[k]
                idx = bisect.bisect_right(arr, (t, chr(127))) - 1
                if idx >= 0:
                    ans.append(arr[idx][1])
                else:
                    ans.append("")
        return ans`,
      javascript: `class Solution {
    execute(ops, args) {
        const store = new Map();
        const ans = [null];
        for (let i = 1; i < ops.length; i++) {
            const op = ops[i];
            const arg = args[i];
            if (op === "set") {
                const [k, v, t] = arg;
                if (!store.has(k)) store.set(k, []);
                store.get(k).push([t, v]);
                ans.push(null);
            } else if (op === "get") {
                const [k, t] = arg;
                const arr = store.get(k);
                if (!arr || arr.length === 0 || arr[0][0] > t) {
                    ans.push("");
                } else {
                    let lo = 0, hi = arr.length - 1, best = 0;
                    while (lo <= hi) {
                        const mid = Math.floor((lo + hi) / 2);
                        if (arr[mid][0] <= t) {
                            best = mid;
                            lo = mid + 1;
                        } else {
                            hi = mid - 1;
                        }
                    }
                    ans.push(arr[best][1]);
                }
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Sorted timestamp list with binary search.',
      algorithm: 'Append sets in O(1) time and perform bisect search in O(log N) for get queries.',
      timeComplexity: 'O(1) set, O(log N) get',
      spaceComplexity: 'O(Total entries)',
      content: 'Versioned time-travel key-value structure.',
      referenceCode: `def execute(ops, args): ...`,
    },
    tags: ['Design', 'Binary Search', 'Hash Table', 'String'],
    testCases: [
      { input: '["TimeMap","set","get","get","set","get","get"], [[],["foo","bar",1],["foo",1],["foo",3],["foo","bar2",4],["foo",4],["foo",5]]', expectedOutput: '[null, null, "bar", "bar", null, "bar2", "bar2"]', isHidden: false },
      { input: '["TimeMap","set","get"], [[],["a","b",1],["a",0]]', expectedOutput: '[null, null, ""]', isHidden: false },
      { input: '["TimeMap","set","get"], [[],["k","v",10],["k",10]]', expectedOutput: '[null, null, "v"]', isHidden: true },
      { input: '["TimeMap","get"], [[],["x",1]]', expectedOutput: '[null, ""]', isHidden: true },
    ],
  },
  {
    title: 'Snapshot Array Versioned History',
    slug: 'snapshot-array-versioned-history',
    description: 'Implement a SnapshotArray that supports set(index, val), snap(), and get(index, snap_id) in O(log(snaps)) time.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= length <= 5 * 10^4\n0 <= snap_id < (number of times snap() is called)\n0 <= index < length\n0 <= val <= 10^9\nAt most 5 * 10^4 total calls.',
    inputFormat: 'operations, arguments',
    outputFormat: 'List of operation results.',
    sampleInput: '["SnapshotArray","set","snap","set","get"], [[3],[0,5],[],[0,6],[0,0]]',
    sampleOutput: '[null, null, 0, null, 5]',
    points: 150,
    hints: [
      'Each index stores a history array of pairs (snap_id, val), initialized to [(0, 0)].',
      'set(index, val): if last entry has current snap_id, update it; otherwise append (current_snap_id, val).',
      'get(index, snap_id): binary search largest snap_id <= query snap_id.',
    ],
    codeTemplates: {
      python: `class SnapshotArray:\n    def __init__(self, length: int):\n        pass\n    def set(self, index: int, val: int) -> None:\n        pass\n    def snap(self) -> int:\n        pass\n    def get(self, index: int, snap_id: int) -> int:\n        pass`,
      javascript: `class SnapshotArray {\n    constructor(length) {\n        \n    }\n    set(index, val) {\n        \n    }\n    snap() {\n        \n    }\n    get(index, snap_id) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `import bisect

class Solution:
    def execute(self, ops: list[str], args: list) -> list:
        length = args[0][0]
        history = [[(0, 0)] for _ in range(length)]
        snap_id = 0
        ans = [None]
        for op, arg in zip(ops[1:], args[1:]):
            if op == "set":
                idx, val = arg
                if history[idx][-1][0] == snap_id:
                    history[idx][-1] = (snap_id, val)
                else:
                    history[idx].append((snap_id, val))
                ans.append(None)
            elif op == "snap":
                ans.append(snap_id)
                snap_id += 1
            elif op == "get":
                idx, sid = arg
                arr = history[idx]
                i = bisect.bisect_right(arr, (sid, float('inf'))) - 1
                ans.append(arr[i][1])
        return ans`,
      javascript: `class Solution {
    execute(ops, args) {
        const length = args[0][0];
        const history = Array.from({ length }, () => [[0, 0]]);
        let snapId = 0;
        const ans = [null];
        for (let i = 1; i < ops.length; i++) {
            const op = ops[i];
            const arg = args[i];
            if (op === "set") {
                const [idx, val] = arg;
                const arr = history[idx];
                if (arr[arr.length - 1][0] === snapId) {
                    arr[arr.length - 1][1] = val;
                } else {
                    arr.push([snapId, val]);
                }
                ans.push(null);
            } else if (op === "snap") {
                ans.push(snapId);
                snapId++;
            } else if (op === "get") {
                const [idx, sid] = arg;
                const arr = history[idx];
                let lo = 0, hi = arr.length - 1, best = 0;
                while (lo <= hi) {
                    const mid = Math.floor((lo + hi) / 2);
                    if (arr[mid][0] <= sid) {
                        best = mid;
                        lo = mid + 1;
                    } else {
                        hi = mid - 1;
                    }
                }
                ans.push(arr[best][1]);
            }
        }
        return ans;
    }
}`,
    },
    editorial: {
      approach: 'Persistent array versioning per index.',
      algorithm: 'Only records mutated cells per version instead of cloning the whole array.',
      timeComplexity: 'O(1) snap/set, O(log S) get',
      spaceComplexity: 'O(Total mutations)',
      content: 'Copy-on-write sparse versioning.',
      referenceCode: `def execute(ops, args): ...`,
    },
    tags: ['Design', 'Binary Search', 'Array'],
    testCases: [
      { input: '["SnapshotArray","set","snap","set","get"], [[3],[0,5],[],[0,6],[0,0]]', expectedOutput: '[null, null, 0, null, 5]', isHidden: false },
      { input: '["SnapshotArray","snap","get"], [[1],[],[0,0]]', expectedOutput: '[null, 0, 0]', isHidden: false },
      { input: '["SnapshotArray","set","snap","get"], [[2],[1,10],[],[1,0]]', expectedOutput: '[null, null, 0, 10]', isHidden: true },
      { input: '["SnapshotArray","set","set","snap","get"], [[1],[0,1],[0,2],[],[0,0]]', expectedOutput: '[null, null, null, 0, 2]', isHidden: true },
    ],
  },
  {
    title: 'Encode and Decode Strings Chunk Length',
    slug: 'encode-and-decode-strings-chunk-length',
    description: 'Design an algorithm to encode a list of strings to a string and decode a string back to a list of strings.',
    difficulty: 'MEDIUM',
    timeLimit: 1000,
    memoryLimit: 128,
    constraints: '1 <= strs.length <= 200\n0 <= strs[i].length <= 200\nstrs[i] contains any 256 valid ASCII characters.',
    inputFormat: 'strs',
    outputFormat: 'Decoded list of strings.',
    sampleInput: '["Hello","World"]',
    sampleOutput: '["Hello","World"]',
    points: 150,
    hints: [
      'Format each string as length + "#" + content.',
      'During decode, read characters until "#" to parse the length, then slice that exact number of characters.',
    ],
    codeTemplates: {
      python: `class Codec:\n    def encode(self, strs: list[str]) -> str:\n        pass\n    def decode(self, s: str) -> list[str]:\n        pass`,
      javascript: `class Codec {\n    encode(strs) {\n        \n    }\n    decode(s) {\n        \n    }\n}`,
    },
    referenceSolutions: {
      python: `class Solution:
    def encodeDecode(self, strs: list[str]) -> list[str]:
        # Encode
        encoded = "".join(f"{len(s)}#{s}" for s in strs)
        # Decode
        decoded = []
        i = 0
        while i < len(encoded):
            j = encoded.find('#', i)
            length = int(encoded[i:j])
            decoded.append(encoded[j + 1:j + 1 + length])
            i = j + 1 + length
        return decoded`,
      javascript: `class Solution {
    encodeDecode(strs) {
        let encoded = "";
        for (const s of strs) {
            encoded += \`\${s.length}#\${s}\`;
        }
        const decoded = [];
        let i = 0;
        while (i < encoded.length) {
            const j = encoded.indexOf('#', i);
            const length = Number(encoded.slice(i, j));
            decoded.push(encoded.slice(j + 1, j + 1 + length));
            i = j + 1 + length;
        }
        return decoded;
    }
}`,
    },
    editorial: {
      approach: 'Length-prefixed frame delimiter.',
      algorithm: 'Prefix each payload with length and delimiter to guarantee delimiter collisions inside payloads are safely ignored.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      content: 'Standard network framing protocol technique.',
      referenceCode: `def encodeDecode(strs: list[str]) -> list[str]: ...`,
    },
    tags: ['Design', 'String'],
    testCases: [
      { input: '["Hello","World"]', expectedOutput: '["Hello","World"]', isHidden: false },
      { input: '[""]', expectedOutput: '[""]', isHidden: false },
      { input: '["#","##","###"]', expectedOutput: '["#","##","###"]', isHidden: true },
      { input: '["123#456","abc#"]', expectedOutput: '["123#456","abc#"]', isHidden: true },
    ],
  },
];

writePack('pack-500-part-k.ts', 'pack500PartKDefs', packK);
