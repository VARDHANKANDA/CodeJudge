import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const pack500PartKDefs: ProblemDef[] = [
  {
    "title": "LFU Cache O1 Eviction Policy Design",
    "slug": "lfu-cache-o1-eviction-policy-design",
    "description": "Design and implement a data structure for a Least Frequently Used (LFU) cache. Implement get and put in O(1) average time complexity. When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "0 <= capacity <= 10^4, 0 <= key <= 10^5, operations <= 2 * 10^4",
    "inputFormat": "capacity, operations",
    "outputFormat": "List of outputs for get/put operations.",
    "sampleInput": "2, [[\"put\",1,1],[\"put\",2,2],[\"get\",1],[\"put\",3,3],[\"get\",2],[\"get\",3],[\"put\",4,4],[\"get\",1],[\"get\",3],[\"get\",4]]",
    "sampleOutput": "[null,null,1,null,-1,3,null,-1,3,4]",
    "points": 200,
    "hints": [
      "Maintain two hash maps: key-to-node and freq-to-doubly-linked-list, along with min_freq tracking."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeLFU(self, capacity: int, operations: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeLFU(capacity, operations) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeLFU(self, capacity: int, operations: list) -> list:\n        if capacity == 0:\n            return [None if op[0] == 'put' else -1 for op in operations]\n        import collections\n        key_to_val = {}\n        key_to_freq = {}\n        freq_to_keys = collections.defaultdict(collections.OrderedDict)\n        min_freq = 0\n        res = []\n        for op in operations:\n            if op[0] == 'get':\n                k = op[1]\n                if k not in key_to_val:\n                    res.append(-1)\n                else:\n                    v = key_to_val[k]\n                    f = key_to_freq[k]\n                    del freq_to_keys[f][k]\n                    if not freq_to_keys[f] and min_freq == f:\n                        min_freq += 1\n                    key_to_freq[k] = f + 1\n                    freq_to_keys[f + 1][k] = None\n                    res.append(v)\n            elif op[0] == 'put':\n                k, v = op[1], op[2]\n                if k in key_to_val:\n                    key_to_val[k] = v\n                    f = key_to_freq[k]\n                    del freq_to_keys[f][k]\n                    if not freq_to_keys[f] and min_freq == f:\n                        min_freq += 1\n                    key_to_freq[k] = f + 1\n                    freq_to_keys[f + 1][k] = None\n                else:\n                    if len(key_to_val) >= capacity:\n                        evict_k, _ = freq_to_keys[min_freq].popitem(last=False)\n                        del key_to_val[evict_k]\n                        del key_to_freq[evict_k]\n                    key_to_val[k] = v\n                    key_to_freq[k] = 1\n                    freq_to_keys[1][k] = None\n                    min_freq = 1\n                res.append(None)\n        return res",
      "javascript": "class Solution {\n    executeLFU(capacity, operations) {\n        if (capacity === 0) return operations.map(op => op[0] === 'put' ? null : -1);\n        const keyToVal = new Map();\n        const keyToFreq = new Map();\n        const freqToKeys = new Map();\n        let minFreq = 0;\n        const res = [];\n        for (const op of operations) {\n            if (op[0] === 'get') {\n                const k = op[1];\n                if (!keyToVal.has(k)) {\n                    res.push(-1);\n                } else {\n                    const v = keyToVal.get(k);\n                    const f = keyToFreq.get(k);\n                    freqToKeys.get(f).delete(k);\n                    if (freqToKeys.get(f).size === 0 && minFreq === f) minFreq++;\n                    keyToFreq.set(k, f + 1);\n                    if (!freqToKeys.has(f + 1)) freqToKeys.set(f + 1, new Set());\n                    freqToKeys.get(f + 1).add(k);\n                    res.push(v);\n                }\n            } else if (op[0] === 'put') {\n                const [_, k, v] = op;\n                if (keyToVal.has(k)) {\n                    keyToVal.set(k, v);\n                    const f = keyToFreq.get(k);\n                    freqToKeys.get(f).delete(k);\n                    if (freqToKeys.get(f).size === 0 && minFreq === f) minFreq++;\n                    keyToFreq.set(k, f + 1);\n                    if (!freqToKeys.has(f + 1)) freqToKeys.set(f + 1, new Set());\n                    freqToKeys.get(f + 1).add(k);\n                } else {\n                    if (keyToVal.size >= capacity) {\n                        const evictK = freqToKeys.get(minFreq).values().next().value;\n                        freqToKeys.get(minFreq).delete(evictK);\n                        keyToVal.delete(evictK);\n                        keyToFreq.delete(evictK);\n                    }\n                    keyToVal.set(k, v);\n                    keyToFreq.set(k, 1);\n                    if (!freqToKeys.has(1)) freqToKeys.set(1, new Set());\n                    freqToKeys.get(1).add(k);\n                    minFreq = 1;\n                }\n                res.push(null);\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Frequency Bucketed Doubly Linked Lists / Ordered Maps.",
      "algorithm": "O(1) updates via direct frequency bucket promotion and min_freq pointer advancement.",
      "timeComplexity": "O(1) per get/put",
      "spaceComplexity": "O(Capacity)",
      "content": "Classic optimal O(1) LFU cache design.",
      "referenceCode": "evict_k, _ = freq_to_keys[min_freq].popitem(last=False)"
    },
    "tags": [
      "Design",
      "Hash Table",
      "Linked List",
      "Doubly-Linked List"
    ],
    "testCases": [
      {
        "input": "2, [[\"put\",1,1],[\"put\",2,2],[\"get\",1],[\"put\",3,3],[\"get\",2],[\"get\",3],[\"put\",4,4],[\"get\",1],[\"get\",3],[\"get\",4]]",
        "expectedOutput": "[null,null,1,null,-1,3,null,-1,3,4]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "1, [[\"put\",2,1],[\"get\",2],[\"put\",3,2],[\"get\",2],[\"get\",3]]",
        "expectedOutput": "[null,1,null,-1,2]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "0, [[\"put\",0,0],[\"get\",0]]",
        "expectedOutput": "[null,-1]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Time-Based Key-Value Store Versioning",
    "slug": "time-based-key-value-store-versioning",
    "description": "Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= key.length, value.length <= 100, 1 <= timestamp <= 10^7, operations <= 2 * 10^5",
    "inputFormat": "operations",
    "outputFormat": "List of outputs for get/set.",
    "sampleInput": "[[\"set\",\"foo\",\"bar\",1],[\"get\",\"foo\",1],[\"get\",\"foo\",3],[\"set\",\"foo\",\"bar2\",4],[\"get\",\"foo\",4],[\"get\",\"foo\",5]]",
    "sampleOutput": "[null,\"bar\",\"bar\",null,\"bar2\",\"bar2\"]",
    "points": 100,
    "hints": [
      "Store (timestamp, value) pairs in an array per key and binary search rightmost timestamp <= query."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeTimeMap(self, operations: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeTimeMap(operations) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeTimeMap(self, operations: list) -> list:\n        import collections, bisect\n        store = collections.defaultdict(list)\n        res = []\n        for op in operations:\n            if op[0] == \"set\":\n                _, k, v, t = op\n                store[k].append((t, v))\n                res.append(None)\n            elif op[0] == \"get\":\n                _, k, t = op\n                if k not in store:\n                    res.append(\"\")\n                else:\n                    arr = store[k]\n                    idx = bisect.bisect_right(arr, (t, chr(127))) - 1\n                    if idx >= 0:\n                        res.append(arr[idx][1])\n                    else:\n                        res.append(\"\")\n        return res",
      "javascript": "class Solution {\n    executeTimeMap(operations) {\n        const store = new Map();\n        const res = [];\n        for (const op of operations) {\n            if (op[0] === \"set\") {\n                const [_, k, v, t] = op;\n                if (!store.has(k)) store.set(k, []);\n                store.get(k).push([t, v]);\n                res.push(null);\n            } else if (op[0] === \"get\") {\n                const [_, k, t] = op;\n                if (!store.has(k)) {\n                    res.push(\"\");\n                } else {\n                    const arr = store.get(k);\n                    let l = 0, r = arr.length - 1, ans = -1;\n                    while (l <= r) {\n                        const mid = Math.floor((l + r) / 2);\n                        if (arr[mid][0] <= t) {\n                            ans = mid;\n                            l = mid + 1;\n                        } else {\n                            r = mid - 1;\n                        }\n                    }\n                    res.push(ans >= 0 ? arr[ans][1] : \"\");\n                }\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Hash Map with Binary Search on Monotonic Timestamps.",
      "algorithm": "Append timestamps in chronological order and query upper bound via binary search in O(log N).",
      "timeComplexity": "Set O(1), Get O(log N)",
      "spaceComplexity": "O(Total Entries)",
      "content": "Standard time-series KV store design.",
      "referenceCode": "idx = bisect.bisect_right(arr, (t, chr(127))) - 1"
    },
    "tags": [
      "Design",
      "Hash Table",
      "Binary Search",
      "String"
    ],
    "testCases": [
      {
        "input": "[[\"set\",\"foo\",\"bar\",1],[\"get\",\"foo\",1],[\"get\",\"foo\",3],[\"set\",\"foo\",\"bar2\",4],[\"get\",\"foo\",4],[\"get\",\"foo\",5]]",
        "expectedOutput": "[null,\"bar\",\"bar\",null,\"bar2\",\"bar2\"]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[\"set\",\"love\",\"high\",10],[\"set\",\"love\",\"low\",20],[\"get\",\"love\",5],[\"get\",\"love\",10],[\"get\",\"love\",15],[\"get\",\"love\",20],[\"get\",\"love\",25]]",
        "expectedOutput": "[null,null,\"\",\"high\",\"high\",\"low\",\"low\"]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[\"get\",\"a\",1]]",
        "expectedOutput": "[\"\"]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Snapshot Array Sparse Delta Storage",
    "slug": "snapshot-array-sparse-delta-storage",
    "description": "Implement a SnapshotArray that supports set(index, val), snap(), and get(index, snap_id) efficiently.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= length <= 50000, snaps <= 50000, operations <= 50000",
    "inputFormat": "length, operations",
    "outputFormat": "List of outputs.",
    "sampleInput": "3, [[\"set\",0,5],[\"snap\"],[\"set\",0,6],[\"get\",0,0]]",
    "sampleOutput": "[null,0,null,5]",
    "points": 150,
    "hints": [
      "Store a list of (snap_id, val) per index and binary search when querying get()."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeSnapshotArray(self, length: int, operations: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeSnapshotArray(length, operations) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeSnapshotArray(self, length: int, operations: list) -> list:\n        import bisect\n        history = [[(0, 0)] for _ in range(length)]\n        snap_id = 0\n        res = []\n        for op in operations:\n            if op[0] == \"set\":\n                _, idx, val = op\n                if history[idx][-1][0] == snap_id:\n                    history[idx][-1] = (snap_id, val)\n                else:\n                    history[idx].append((snap_id, val))\n                res.append(None)\n            elif op[0] == \"snap\":\n                res.append(snap_id)\n                snap_id += 1\n            elif op[0] == \"get\":\n                _, idx, sid = op\n                arr = history[idx]\n                pos = bisect.bisect_right(arr, (sid, float('inf'))) - 1\n                res.append(arr[pos][1])\n        return res",
      "javascript": "class Solution {\n    executeSnapshotArray(length, operations) {\n        const history = Array.from({ length }, () => [[0, 0]]);\n        let snapId = 0;\n        const res = [];\n        for (const op of operations) {\n            if (op[0] === \"set\") {\n                const [_, idx, val] = op;\n                const arr = history[idx];\n                if (arr[arr.length - 1][0] === snapId) {\n                    arr[arr.length - 1][1] = val;\n                } else {\n                    arr.push([snapId, val]);\n                }\n                res.push(null);\n            } else if (op[0] === \"snap\") {\n                res.push(snapId++);\n            } else if (op[0] === \"get\") {\n                const [_, idx, sid] = op;\n                const arr = history[idx];\n                let l = 0, r = arr.length - 1, ans = 0;\n                while (l <= r) {\n                    const mid = Math.floor((l + r) / 2);\n                    if (arr[mid][0] <= sid) {\n                        ans = mid;\n                        l = mid + 1;\n                    } else {\n                        r = mid - 1;\n                    }\n                }\n                res.push(arr[ans][1]);\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Sparse Delta Versioning per Index.",
      "algorithm": "Store mutation logs only when values change, answering historical reads via binary search.",
      "timeComplexity": "Set O(1), Snap O(1), Get O(log Snaps)",
      "spaceComplexity": "O(Length + Mutations)",
      "content": "Standard immutable snapshot / persistent array structure.",
      "referenceCode": "pos = bisect.bisect_right(arr, (sid, float(\"inf\"))) - 1"
    },
    "tags": [
      "Design",
      "Array",
      "Binary Search",
      "Hash Table"
    ],
    "testCases": [
      {
        "input": "3, [[\"set\",0,5],[\"snap\"],[\"set\",0,6],[\"get\",0,0]]",
        "expectedOutput": "[null,0,null,5]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "1, [[\"set\",0,15],[\"snap\"],[\"snap\"],[\"snap\"],[\"get\",0,2]]",
        "expectedOutput": "[null,0,1,2,15]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "2, [[\"snap\"],[\"get\",0,0]]",
        "expectedOutput": "[0,0]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Design Hit Counter Sliding Window Aggregation",
    "slug": "design-hit-counter-sliding-window-aggregation",
    "description": "Design a hit counter which counts the number of hits received in the past 5 minutes (i.e., the past 300 seconds). Support hit(timestamp) and getHits(timestamp).",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= timestamp <= 2 * 10^9, operations <= 300",
    "inputFormat": "operations",
    "outputFormat": "List of outputs.",
    "sampleInput": "[[\"hit\",1],[\"hit\",2],[\"hit\",3],[\"getHits\",4],[\"hit\",300],[\"getHits\",300],[\"getHits\",301]]",
    "sampleOutput": "[null,null,null,3,null,4,3]",
    "points": 100,
    "hints": [
      "Use fixed 300-bucket circular arrays for timestamps and counts."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeHitCounter(self, operations: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeHitCounter(operations) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeHitCounter(self, operations: list) -> list:\n        times = [0] * 300\n        hits = [0] * 300\n        res = []\n        for op in operations:\n            if op[0] == \"hit\":\n                t = op[1]\n                idx = t % 300\n                if times[idx] != t:\n                    times[idx] = t\n                    hits[idx] = 1\n                else:\n                    hits[idx] += 1\n                res.append(None)\n            elif op[0] == \"getHits\":\n                t = op[1]\n                total = 0\n                for i in range(300):\n                    if t - times[i] < 300:\n                        total += hits[i]\n                res.append(total)\n        return res",
      "javascript": "class Solution {\n    executeHitCounter(operations) {\n        const times = Array(300).fill(0);\n        const hits = Array(300).fill(0);\n        const res = [];\n        for (const op of operations) {\n            if (op[0] === \"hit\") {\n                const t = op[1];\n                const idx = t % 300;\n                if (times[idx] !== t) {\n                    times[idx] = t;\n                    hits[idx] = 1;\n                } else {\n                    hits[idx]++;\n                }\n                res.push(null);\n            } else if (op[0] === \"getHits\") {\n                const t = op[1];\n                let total = 0;\n                for (let i = 0; i < 300; i++) {\n                    if (t - times[i] < 300) total += hits[i];\n                }\n                res.push(total);\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "300-Bucket Circular Buffer Window Aggregation.",
      "algorithm": "Maintain fixed 300 buckets representing second modulo indices.",
      "timeComplexity": "Hit O(1), GetHits O(300) = O(1)",
      "spaceComplexity": "O(300) = O(1)",
      "content": "Standard rate limiter / hit counter design.",
      "referenceCode": "if times[idx] != t: times[idx] = t; hits[idx] = 1"
    },
    "tags": [
      "Design",
      "Queue",
      "Array"
    ],
    "testCases": [
      {
        "input": "[[\"hit\",1],[\"hit\",2],[\"hit\",3],[\"getHits\",4],[\"hit\",300],[\"getHits\",300],[\"getHits\",301]]",
        "expectedOutput": "[null,null,null,3,null,4,3]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[\"hit\",10],[\"getHits\",310]]",
        "expectedOutput": "[null,0]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[\"hit\",1],[\"hit\",1],[\"getHits\",1]]",
        "expectedOutput": "[null,null,2]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Insert Delete GetRandom O1 Design",
    "slug": "insert-delete-getrandom-o1-design",
    "description": "Implement the RandomizedSet class that supports insert(val), remove(val), and getRandom() in average O(1) time complexity.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "operations <= 2 * 10^5",
    "inputFormat": "operations",
    "outputFormat": "List of outputs.",
    "sampleInput": "[[\"insert\",1],[\"remove\",2],[\"insert\",2],[\"getRandom\"],[\"remove\",1],[\"insert\",2],[\"getRandom\"]]",
    "sampleOutput": "[true,false,true,1,true,false,2]",
    "points": 100,
    "hints": [
      "Maintain an array of values and a hash map from value to its index in the array. For remove(), swap target with the last element and pop."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeRandomizedSet(self, operations: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeRandomizedSet(operations) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeRandomizedSet(self, operations: list) -> list:\n        val_to_idx = {}\n        nums = []\n        res = []\n        for op in operations:\n            if op[0] == \"insert\":\n                v = op[1]\n                if v in val_to_idx:\n                    res.append(False)\n                else:\n                    val_to_idx[v] = len(nums)\n                    nums.append(v)\n                    res.append(True)\n            elif op[0] == \"remove\":\n                v = op[1]\n                if v not in val_to_idx:\n                    res.append(False)\n                else:\n                    idx = val_to_idx[v]\n                    last = nums[-1]\n                    nums[idx] = last\n                    val_to_idx[last] = idx\n                    nums.pop()\n                    del val_to_idx[v]\n                    res.append(True)\n            elif op[0] == \"getRandom\":\n                res.append(nums[0] if nums else None)\n        return res",
      "javascript": "class Solution {\n    executeRandomizedSet(operations) {\n        const valToIdx = new Map();\n        const nums = [];\n        const res = [];\n        for (const op of operations) {\n            if (op[0] === \"insert\") {\n                const v = op[1];\n                if (valToIdx.has(v)) {\n                    res.push(false);\n                } else {\n                    valToIdx.set(v, nums.length);\n                    nums.push(v);\n                    res.push(true);\n                }\n            } else if (op[0] === \"remove\") {\n                const v = op[1];\n                if (!valToIdx.has(v)) {\n                    res.push(false);\n                } else {\n                    const idx = valToIdx.get(v);\n                    const last = nums[nums.length - 1];\n                    nums[idx] = last;\n                    valToIdx.set(last, idx);\n                    nums.pop();\n                    valToIdx.delete(v);\n                    res.push(true);\n                }\n            } else if (op[0] === \"getRandom\") {\n                res.push(nums.length > 0 ? nums[0] : null);\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Array + Hash Map Swap-to-Back Deletion.",
      "algorithm": "Swap target element with the back of the array to pop in O(1) time.",
      "timeComplexity": "O(1) average per operation",
      "spaceComplexity": "O(N)",
      "content": "Standard RandomizedSet O(1) design.",
      "referenceCode": "nums[idx] = last; val_to_idx[last] = idx; nums.pop()"
    },
    "tags": [
      "Design",
      "Array",
      "Hash Table",
      "Randomized"
    ],
    "testCases": [
      {
        "input": "[[\"insert\",1],[\"remove\",2],[\"insert\",2],[\"getRandom\"],[\"remove\",1],[\"insert\",2],[\"getRandom\"]]",
        "expectedOutput": "[true,false,true,1,true,false,2]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[\"insert\",10],[\"insert\",20],[\"remove\",10],[\"getRandom\"]]",
        "expectedOutput": "[true,true,true,20]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[\"remove\",0]]",
        "expectedOutput": "[false]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Encode and Decode Strings Length Prefix Codec",
    "slug": "encode-and-decode-strings-length-prefix-codec",
    "description": "Design an algorithm to encode a list of strings to a single string, and decode that string back to the original list of strings.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= strs.length <= 200, 0 <= strs[i].length <= 200",
    "inputFormat": "strs",
    "outputFormat": "Round-trip decoded list of strings.",
    "sampleInput": "[\"Hello\",\"World\"]",
    "sampleOutput": "[\"Hello\",\"World\"]",
    "points": 100,
    "hints": [
      "Prefix each string with its length followed by a delimiter like \"#\" (e.g. 5#Hello5#World)."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def encodeDecode(self, strs: list) -> list:\n        pass",
      "javascript": "class Solution {\n    encodeDecode(strs) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def encodeDecode(self, strs: list) -> list:\n        encoded = \"\".join(f\"{len(s)}#{s}\" for s in strs)\n        res = []\n        i = 0\n        while i < len(encoded):\n            j = encoded.find('#', i)\n            length = int(encoded[i:j])\n            res.append(encoded[j+1:j+1+length])\n            i = j + 1 + length\n        return res",
      "javascript": "class Solution {\n    encodeDecode(strs) {\n        const encoded = strs.map(s => `${s.length}#${s}`).join(\"\");\n        const res = [];\n        let i = 0;\n        while (i < encoded.length) {\n            const j = encoded.indexOf('#', i);\n            const len = Number(encoded.slice(i, j));\n            res.push(encoded.slice(j + 1, j + 1 + len));\n            i = j + 1 + len;\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Length-Prefixed Chunk Framing.",
      "algorithm": "Prefix length framing avoids delimiter collisions across arbitrary characters.",
      "timeComplexity": "O(Total String Length)",
      "spaceComplexity": "O(Total String Length)",
      "content": "Standard network protocol string framing.",
      "referenceCode": "encoded = \"\".join(f\"{len(s)}#{s}\" for s in strs)"
    },
    "tags": [
      "Design",
      "String"
    ],
    "testCases": [
      {
        "input": "[\"Hello\",\"World\"]",
        "expectedOutput": "[\"Hello\",\"World\"]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[\"\"]",
        "expectedOutput": "[\"\"]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[\"4#abc\",\"123#\"]",
        "expectedOutput": "[\"4#abc\",\"123#\"]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Design Browser History Back Forward Navigation",
    "slug": "design-browser-history-back-forward-navigation",
    "description": "You have a browser of one tab where you start on the homepage and you can visit another url, get back in the history number of steps or move forward in the history number of steps.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= homepage.length <= 20, operations <= 5000",
    "inputFormat": "homepage, operations",
    "outputFormat": "List of outputs.",
    "sampleInput": "\"leetcode.com\", [[\"visit\",\"google.com\"],[\"visit\",\"facebook.com\"],[\"visit\",\"youtube.com\"],[\"back\",1],[\"back\",1],[\"forward\",1],[\"visit\",\"linkedin.com\"],[\"forward\",2],[\"back\",2],[\"back\",7]]",
    "sampleOutput": "[null,null,null,\"facebook.com\",\"google.com\",\"facebook.com\",null,\"linkedin.com\",\"google.com\",\"leetcode.com\"]",
    "points": 100,
    "hints": [
      "Maintain dynamic list and current index pointer. Visiting a new URL truncates forward history."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeBrowser(self, homepage: str, operations: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeBrowser(homepage, operations) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeBrowser(self, homepage: str, operations: list) -> list:\n        history = [homepage]\n        cur = 0\n        res = []\n        for op in operations:\n            if op[0] == \"visit\":\n                url = op[1]\n                history = history[:cur + 1]\n                history.append(url)\n                cur += 1\n                res.append(None)\n            elif op[0] == \"back\":\n                steps = op[1]\n                cur = max(0, cur - steps)\n                res.append(history[cur])\n            elif op[0] == \"forward\":\n                steps = op[1]\n                cur = min(len(history) - 1, cur + steps)\n                res.append(history[cur])\n        return res",
      "javascript": "class Solution {\n    executeBrowser(homepage, operations) {\n        let history = [homepage];\n        let cur = 0;\n        const res = [];\n        for (const op of operations) {\n            if (op[0] === \"visit\") {\n                history = history.slice(0, cur + 1);\n                history.push(op[1]);\n                cur++;\n                res.push(null);\n            } else if (op[0] === \"back\") {\n                cur = Math.max(0, cur - op[1]);\n                res.push(history[cur]);\n            } else if (op[0] === \"forward\") {\n                cur = Math.min(history.length - 1, cur + op[1]);\n                res.push(history[cur]);\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Dynamic History Array with Position Cursor.",
      "algorithm": "Slice array on new visit; clamp pointer movements on back/forward.",
      "timeComplexity": "O(1) per navigation",
      "spaceComplexity": "O(History Size)",
      "content": "Standard stack/array browser history emulation.",
      "referenceCode": "history = history[:cur + 1]; history.append(url); cur += 1"
    },
    "tags": [
      "Design",
      "Array",
      "Linked List",
      "Stack"
    ],
    "testCases": [
      {
        "input": "\"leetcode.com\", [[\"visit\",\"google.com\"],[\"visit\",\"facebook.com\"],[\"visit\",\"youtube.com\"],[\"back\",1],[\"back\",1],[\"forward\",1],[\"visit\",\"linkedin.com\"],[\"forward\",2],[\"back\",2],[\"back\",7]]",
        "expectedOutput": "[null,null,null,\"facebook.com\",\"google.com\",\"facebook.com\",null,\"linkedin.com\",\"google.com\",\"leetcode.com\"]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"z.com\", [[\"visit\",\"a.com\"],[\"back\",10]]",
        "expectedOutput": "[null,\"z.com\"]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"a.com\", [[\"forward\",5]]",
        "expectedOutput": "[\"a.com\"]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Peeking Iterator Next Value Preview",
    "slug": "peeking-iterator-next-value-preview",
    "description": "Design an iterator that supports the peek() operation on an existing iterator in addition to the hasNext() and the next() operations.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "operations <= 1000",
    "inputFormat": "nums, operations",
    "outputFormat": "List of outputs.",
    "sampleInput": "[1,2,3], [\"next\",\"peek\",\"next\",\"next\",\"hasNext\"]",
    "sampleOutput": "[1,2,2,3,false]",
    "points": 100,
    "hints": [
      "Cache the next value in a buffer variable."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executePeeking(self, nums: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executePeeking(nums, operations) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executePeeking(self, nums: list, operations: list) -> list:\n        idx = 0\n        res = []\n        for op in operations:\n            if op == \"next\":\n                res.append(nums[idx])\n                idx += 1\n            elif op == \"peek\":\n                res.append(nums[idx])\n            elif op == \"hasNext\":\n                res.append(idx < len(nums))\n        return res",
      "javascript": "class Solution {\n    executePeeking(nums, operations) {\n        let idx = 0;\n        const res = [];\n        for (const op of operations) {\n            if (op === \"next\") {\n                res.push(nums[idx++]);\n            } else if (op === \"peek\") {\n                res.push(nums[idx]);\n            } else if (op === \"hasNext\") {\n                res.push(idx < nums.length);\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Buffered Lookahead Decorator.",
      "algorithm": "Decorate iterator with one-element cached lookahead.",
      "timeComplexity": "O(1) per operation",
      "spaceComplexity": "O(1)",
      "content": "Classic iterator wrapper pattern.",
      "referenceCode": "res.append(nums[idx])"
    },
    "tags": [
      "Design",
      "Array",
      "Iterator"
    ],
    "testCases": [
      {
        "input": "[1,2,3], [\"next\",\"peek\",\"next\",\"next\",\"hasNext\"]",
        "expectedOutput": "[1,2,2,3,false]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1], [\"hasNext\",\"peek\",\"next\",\"hasNext\"]",
        "expectedOutput": "[true,1,1,false]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[], [\"hasNext\"]",
        "expectedOutput": "[false]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "RLE Iterator Run-Length Encoded Traversal",
    "slug": "rle-iterator-run-length-encoded-traversal",
    "description": "We can use run-length encoding to encode a sequence of integers. Design an iterator that iterates through a run-length encoded sequence with next(n) returning the n-th exhausted element (or -1 if exhausted).",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "encoding.length <= 1000, 1 <= n <= 10^9",
    "inputFormat": "encoding, operations",
    "outputFormat": "List of outputs.",
    "sampleInput": "[3,8,0,9,2,5], [2,1,1,2]",
    "sampleOutput": "[8,8,5,-1]",
    "points": 100,
    "hints": [
      "Maintain current index in encoding array. Deduct n from current count, advancing index by 2 when exhausted."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeRLE(self, encoding: list, operations: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeRLE(encoding, operations) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeRLE(self, encoding: list, operations: list) -> list:\n        enc = list(encoding)\n        idx = 0\n        res = []\n        for n in operations:\n            last = -1\n            while idx < len(enc) and n > 0:\n                if enc[idx] >= n:\n                    enc[idx] -= n\n                    last = enc[idx + 1]\n                    n = 0\n                else:\n                    n -= enc[idx]\n                    enc[idx] = 0\n                    idx += 2\n            res.append(last if n == 0 else -1)\n        return res",
      "javascript": "class Solution {\n    executeRLE(encoding, operations) {\n        const enc = [...encoding];\n        let idx = 0;\n        const res = [];\n        for (let n of operations) {\n            let last = -1;\n            while (idx < enc.length && n > 0) {\n                if (enc[idx] >= n) {\n                    enc[idx] -= n;\n                    last = enc[idx + 1];\n                    n = 0;\n                } else {\n                    n -= enc[idx];\n                    enc[idx] = 0;\n                    idx += 2;\n                }\n            }\n            res.push(n === 0 ? last : -1);\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Run-Length Exhaustion Cursor.",
      "algorithm": "Consume runs in linear order across successive query demands.",
      "timeComplexity": "Amortized O(1) per consumed element",
      "spaceComplexity": "O(1)",
      "content": "Standard RLE streaming iterator.",
      "referenceCode": "if enc[idx] >= n: enc[idx] -= n; last = enc[idx + 1]; n = 0"
    },
    "tags": [
      "Design",
      "Array",
      "Iterator"
    ],
    "testCases": [
      {
        "input": "[3,8,0,9,2,5], [2,1,1,2]",
        "expectedOutput": "[8,8,5,-1]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[1,5], [1,1]",
        "expectedOutput": "[5,-1]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[2,3], [1]",
        "expectedOutput": "[3]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Design Underground System Transit Analytics",
    "slug": "design-underground-system-transit-analytics",
    "description": "An underground railway system is keeping track of customer travel times between different stations. Implement checkIn(id, stationName, t), checkOut(id, stationName, t), and getAverageTime(startStation, endStation).",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "operations <= 2 * 10^4",
    "inputFormat": "operations",
    "outputFormat": "List of outputs.",
    "sampleInput": "[[\"checkIn\",45,\"Leyton\",3],[\"checkIn\",32,\"Paradise\",8],[\"checkOut\",45,\"Waterloo\",15],[\"checkOut\",32,\"Cambridge\",22],[\"getAverageTime\",\"Paradise\",\"Cambridge\"],[\"getAverageTime\",\"Leyton\",\"Waterloo\"]]",
    "sampleOutput": "[null,null,null,null,14.0,12.0]",
    "points": 100,
    "hints": [
      "Store active check-ins in user_map and aggregated travel times (total_time, count) in route_map."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeUnderground(self, operations: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeUnderground(operations) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeUnderground(self, operations: list) -> list:\n        check_ins = {}\n        routes = {}\n        res = []\n        for op in operations:\n            if op[0] == \"checkIn\":\n                _, uid, st, t = op\n                check_ins[uid] = (st, t)\n                res.append(None)\n            elif op[0] == \"checkOut\":\n                _, uid, end_st, t = op\n                start_st, start_t = check_ins.pop(uid)\n                r = (start_st, end_st)\n                if r not in routes: routes[r] = [0, 0]\n                routes[r][0] += (t - start_t)\n                routes[r][1] += 1\n                res.append(None)\n            elif op[0] == \"getAverageTime\":\n                _, start_st, end_st = op\n                total, count = routes[(start_st, end_st)]\n                res.append(round(total / count, 5))\n        return res",
      "javascript": "class Solution {\n    executeUnderground(operations) {\n        const checkIns = new Map();\n        const routes = new Map();\n        const res = [];\n        for (const op of operations) {\n            if (op[0] === \"checkIn\") {\n                const [_, uid, st, t] = op;\n                checkIns.set(uid, [st, t]);\n                res.push(null);\n            } else if (op[0] === \"checkOut\") {\n                const [_, uid, endSt, t] = op;\n                const [startSt, startT] = checkIns.get(uid);\n                checkIns.delete(uid);\n                const r = `${startSt}->${endSt}`;\n                if (!routes.has(r)) routes.set(r, [0, 0]);\n                routes.get(r)[0] += (t - startT);\n                routes.get(r)[1] += 1;\n                res.push(null);\n            } else if (op[0] === \"getAverageTime\") {\n                const [_, startSt, endSt] = op;\n                const [total, count] = routes.get(`${startSt}->${endSt}`);\n                res.push(Number((total / count).toFixed(5)));\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Route Aggregated Hash Table Tracking.",
      "algorithm": "Map user check-in state to active timestamps and maintain running sum & count per station pair.",
      "timeComplexity": "O(1) per checkIn/checkOut/getAverageTime",
      "spaceComplexity": "O(Routes + Active Users)",
      "content": "Standard transactional transit telemetry system.",
      "referenceCode": "routes[r][0] += (t - start_t); routes[r][1] += 1"
    },
    "tags": [
      "Design",
      "Hash Table",
      "String"
    ],
    "testCases": [
      {
        "input": "[[\"checkIn\",45,\"Leyton\",3],[\"checkIn\",32,\"Paradise\",8],[\"checkOut\",45,\"Waterloo\",15],[\"checkOut\",32,\"Cambridge\",22],[\"getAverageTime\",\"Paradise\",\"Cambridge\"],[\"getAverageTime\",\"Leyton\",\"Waterloo\"]]",
        "expectedOutput": "[null,null,null,null,14.0,12.0]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[\"checkIn\",10,\"A\",1],[\"checkOut\",10,\"B\",5],[\"getAverageTime\",\"A\",\"B\"]]",
        "expectedOutput": "[null,null,4.0]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[\"checkIn\",1,\"A\",1],[\"checkOut\",1,\"B\",3],[\"checkIn\",2,\"A\",5],[\"checkOut\",2,\"B\",11],[\"getAverageTime\",\"A\",\"B\"]]",
        "expectedOutput": "[null,null,null,null,4.0]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "My Calendar I Non-Overlapping Booking",
    "slug": "my-calendar-i-non-overlapping-booking",
    "description": "Implement a MyCalendar class to store your events. A new event can be added if adding the event will not cause a double booking. Implement book(startTime, endTime) returning true if successful and false otherwise.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "operations <= 1000, 0 <= startTime < endTime <= 10^9",
    "inputFormat": "events",
    "outputFormat": "List of boolean booking results.",
    "sampleInput": "[[10,20],[15,25],[20,30]]",
    "sampleOutput": "[true,false,true]",
    "points": 100,
    "hints": [
      "Check overlap with existing intervals: max(s1, s2) < min(e1, e2). Use BST/treemap for O(log N)."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeCalendar(self, events: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeCalendar(events) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeCalendar(self, events: list) -> list:\n        booked = []\n        res = []\n        for s, e in events:\n            overlap = False\n            for bs, be in booked:\n                if max(s, bs) < min(e, be):\n                    overlap = True\n                    break\n            if not overlap:\n                booked.append((s, e))\n                res.append(True)\n            else:\n                res.append(False)\n        return res",
      "javascript": "class Solution {\n    executeCalendar(events) {\n        const booked = [];\n        const res = [];\n        for (const [s, e] of events) {\n            let overlap = false;\n            for (const [bs, be] of booked) {\n                if (Math.max(s, bs) < Math.min(e, be)) {\n                    overlap = true;\n                    break;\n                }\n            }\n            if (!overlap) {\n                booked.push([s, e]);\n                res.push(true);\n            } else {\n                res.push(false);\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Interval Overlap Detection.",
      "algorithm": "Two intervals overlap iff max(start1, start2) < min(end1, end2).",
      "timeComplexity": "O(N^2) or O(N log N) with BST",
      "spaceComplexity": "O(N)",
      "content": "Standard calendar interval scheduling.",
      "referenceCode": "if max(s, bs) < min(e, be): overlap = True"
    },
    "tags": [
      "Design",
      "Segment Tree",
      "Binary Search Tree",
      "Ordered Set"
    ],
    "testCases": [
      {
        "input": "[[10,20],[15,25],[20,30]]",
        "expectedOutput": "[true,false,true]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[47,50],[33,41],[39,45],[33,42],[25,32],[26,35],[19,25],[3,8],[8,13],[18,27]]",
        "expectedOutput": "[true,true,false,false,true,false,true,true,true,false]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1,2]]",
        "expectedOutput": "[true]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "My Calendar II Double Booking Allowed",
    "slug": "my-calendar-ii-double-booking-allowed",
    "description": "Implement a MyCalendarTwo class where an event can be added if it does not cause a triple booking.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "operations <= 1000, 0 <= startTime < endTime <= 10^9",
    "inputFormat": "events",
    "outputFormat": "List of booleans.",
    "sampleInput": "[[10,20],[50,60],[10,40],[5,15],[5,10],[25,55]]",
    "sampleOutput": "[true,true,true,false,true,true]",
    "points": 150,
    "hints": [
      "Maintain two lists: all single bookings and all overlapping regions (double bookings). Reject if overlapping with double bookings."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeCalendarTwo(self, events: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeCalendarTwo(events) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeCalendarTwo(self, events: list) -> list:\n        single = []\n        double = []\n        res = []\n        for s, e in events:\n            if any(max(s, ds) < min(e, de) for ds, de in double):\n                res.append(False)\n            else:\n                for ss, se in single:\n                    if max(s, ss) < min(e, se):\n                        double.append((max(s, ss), min(e, se)))\n                single.append((s, e))\n                res.append(True)\n        return res",
      "javascript": "class Solution {\n    executeCalendarTwo(events) {\n        const single = [];\n        const double = [];\n        const res = [];\n        for (const [s, e] of events) {\n            let conflict = false;\n            for (const [ds, de] of double) {\n                if (Math.max(s, ds) < Math.min(e, de)) {\n                    conflict = true; break;\n                }\n            }\n            if (conflict) {\n                res.push(false);\n            } else {\n                for (const [ss, se] of single) {\n                    if (Math.max(s, ss) < Math.min(e, se)) {\n                        double.push([Math.max(s, ss), Math.min(e, se)]);\n                    }\n                }\n                single.push([s, e]);\n                res.push(true);\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Two-Tier Overlap Tracking.",
      "algorithm": "Track pairwise intersection intervals in a secondary double-booking array.",
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(N)",
      "content": "Standard k-booking calendar scheduling.",
      "referenceCode": "double.append((max(s, ss), min(e, se)))"
    },
    "tags": [
      "Design",
      "Segment Tree",
      "Ordered Set"
    ],
    "testCases": [
      {
        "input": "[[10,20],[50,60],[10,40],[5,15],[5,10],[25,55]]",
        "expectedOutput": "[true,true,true,false,true,true]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[1,5],[2,6],[3,7]]",
        "expectedOutput": "[true,true,false]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[10,20],[20,30]]",
        "expectedOutput": "[true,true]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "My Calendar III Maximum Concurrent Overlap K-Booking",
    "slug": "my-calendar-iii-maximum-concurrent-overlap-k-booking",
    "description": "A k-booking happens when k events have some non-empty intersection. Implement book(startTime, endTime) returning the maximum k-booking after adding the event.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "operations <= 400, 0 <= startTime < endTime <= 10^9",
    "inputFormat": "events",
    "outputFormat": "List of max k values after each booking.",
    "sampleInput": "[[10,20],[50,60],[10,40],[5,15],[5,10],[25,55]]",
    "sampleOutput": "[1,1,2,3,3,3]",
    "points": 200,
    "hints": [
      "Use sweep-line boundary diff array: +1 at start, -1 at end, prefix sum for max active concurrent events."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeCalendarThree(self, events: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeCalendarThree(events) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeCalendarThree(self, events: list) -> list:\n        import collections\n        timeline = collections.defaultdict(int)\n        res = []\n        for s, e in events:\n            timeline[s] += 1\n            timeline[e] -= 1\n            cur = 0\n            k = 0\n            for t in sorted(timeline.keys()):\n                cur += timeline[t]\n                k = max(k, cur)\n            res.append(k)\n        return res",
      "javascript": "class Solution {\n    executeCalendarThree(events) {\n        const timeline = new Map();\n        const res = [];\n        for (const [s, e] of events) {\n            timeline.set(s, (timeline.get(s) || 0) + 1);\n            timeline.set(e, (timeline.get(e) || 0) - 1);\n            const sortedTimes = Array.from(timeline.keys()).sort((a, b) => a - b);\n            let cur = 0, k = 0;\n            for (const t of sortedTimes) {\n                cur += timeline.get(t);\n                k = Math.max(k, cur);\n            }\n            res.push(k);\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Sweep-Line Point Diff Map.",
      "algorithm": "Sort endpoint delta keys and compute maximum prefix sum.",
      "timeComplexity": "O(N^2 log N) or O(N log N) with Segment Tree",
      "spaceComplexity": "O(N)",
      "content": "Standard sweep-line event concurrency counter.",
      "referenceCode": "timeline[s] += 1; timeline[e] -= 1"
    },
    "tags": [
      "Design",
      "Segment Tree",
      "Ordered Set",
      "Sweep Line"
    ],
    "testCases": [
      {
        "input": "[[10,20],[50,60],[10,40],[5,15],[5,10],[25,55]]",
        "expectedOutput": "[1,1,2,3,3,3]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[1,2],[2,3],[3,4]]",
        "expectedOutput": "[1,1,1]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1,5],[1,5],[1,5]]",
        "expectedOutput": "[1,2,3]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Tic-Tac-Toe Move Judge O1 Design",
    "slug": "tic-tac-toe-move-judge-o1-design",
    "description": "Design a Tic-tac-toe game that is played on an n x n grid between two players. Support move(row, col, player) returning 0 (no winner), 1 (player 1 wins), or 2 (player 2 wins) in O(1) time.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "2 <= n <= 100, moves <= n^2",
    "inputFormat": "n, moves",
    "outputFormat": "List of results for each move.",
    "sampleInput": "3, [[0,0,1],[0,2,2],[2,2,1],[1,1,2],[2,0,1],[1,0,2],[2,1,1]]",
    "sampleOutput": "[0,0,0,0,0,0,1]",
    "points": 100,
    "hints": [
      "Count +1 for player 1 and -1 for player 2 in row, col, diag, and anti-diag counts."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeTicTacToe(self, n: int, moves: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeTicTacToe(n, moves) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeTicTacToe(self, n: int, moves: list) -> list:\n        rows = [0] * n\n        cols = [0] * n\n        diag = 0\n        anti_diag = 0\n        res = []\n        for r, c, player in moves:\n            val = 1 if player == 1 else -1\n            rows[r] += val\n            cols[c] += val\n            if r == c: diag += val\n            if r + c == n - 1: anti_diag += val\n            if abs(rows[r]) == n or abs(cols[c]) == n or abs(diag) == n or abs(anti_diag) == n:\n                res.append(player)\n            else:\n                res.append(0)\n        return res",
      "javascript": "class Solution {\n    executeTicTacToe(n, moves) {\n        const rows = Array(n).fill(0);\n        const cols = Array(n).fill(0);\n        let diag = 0, antiDiag = 0;\n        const res = [];\n        for (const [r, c, player] of moves) {\n            const val = player === 1 ? 1 : -1;\n            rows[r] += val;\n            cols[c] += val;\n            if (r === c) diag += val;\n            if (r + c === n - 1) antiDiag += val;\n            if (Math.abs(rows[r]) === n || Math.abs(cols[c]) === n || Math.abs(diag) === n || Math.abs(antiDiag) === n) {\n                res.push(player);\n            } else {\n                res.push(0);\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "O(1) Vector Sum Verification.",
      "algorithm": "Track row/col/diagonal signed sums (+1 / -1). Winning condition is |sum| == n.",
      "timeComplexity": "O(1) per move",
      "spaceComplexity": "O(N)",
      "content": "Standard Tic-Tac-Toe O(1) decision matrix.",
      "referenceCode": "if abs(rows[r]) == n or abs(cols[c]) == n or abs(diag) == n or abs(anti_diag) == n: return player"
    },
    "tags": [
      "Design",
      "Array",
      "Matrix",
      "Simulation"
    ],
    "testCases": [
      {
        "input": "3, [[0,0,1],[0,2,2],[2,2,1],[1,1,2],[2,0,1],[1,0,2],[2,1,1]]",
        "expectedOutput": "[0,0,0,0,0,0,1]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "2, [[0,0,1],[0,1,2],[1,1,1]]",
        "expectedOutput": "[0,0,1]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "3, [[0,0,1]]",
        "expectedOutput": "[0]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Insert Delete GetRandom O1 Duplicates Allowed",
    "slug": "insert-delete-getrandom-o1-duplicates-allowed",
    "description": "Implement the RandomizedCollection class that supports insert(val), remove(val), and getRandom() in average O(1) time complexity allowing duplicate elements.",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "operations <= 2 * 10^5",
    "inputFormat": "operations",
    "outputFormat": "List of outputs.",
    "sampleInput": "[[\"insert\",1],[\"insert\",1],[\"insert\",2],[\"getRandom\"],[\"remove\",1],[\"getRandom\"]]",
    "sampleOutput": "[true,false,true,1,true,1]",
    "points": 200,
    "hints": [
      "Map each value to a Set of indices in the nums array."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeRandomizedCollection(self, operations: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeRandomizedCollection(operations) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeRandomizedCollection(self, operations: list) -> list:\n        import collections\n        val_to_indices = collections.defaultdict(set)\n        nums = []\n        res = []\n        for op in operations:\n            if op[0] == \"insert\":\n                v = op[1]\n                first_time = len(val_to_indices[v]) == 0\n                val_to_indices[v].add(len(nums))\n                nums.append(v)\n                res.append(first_time)\n            elif op[0] == \"remove\":\n                v = op[1]\n                if not val_to_indices[v]:\n                    res.append(False)\n                else:\n                    idx = val_to_indices[v].pop()\n                    last = nums[-1]\n                    nums[idx] = last\n                    val_to_indices[last].add(idx)\n                    val_to_indices[last].discard(len(nums) - 1)\n                    nums.pop()\n                    res.append(True)\n            elif op[0] == \"getRandom\":\n                res.append(nums[0] if nums else None)\n        return res",
      "javascript": "class Solution {\n    executeRandomizedCollection(operations) {\n        const valToIndices = new Map();\n        const nums = [];\n        const res = [];\n        for (const op of operations) {\n            if (op[0] === \"insert\") {\n                const v = op[1];\n                if (!valToIndices.has(v)) valToIndices.set(v, new Set());\n                const firstTime = valToIndices.get(v).size === 0;\n                valToIndices.get(v).add(nums.length);\n                nums.push(v);\n                res.push(firstTime);\n            } else if (op[0] === \"remove\") {\n                const v = op[1];\n                if (!valToIndices.has(v) || valToIndices.get(v).size === 0) {\n                    res.push(false);\n                } else {\n                    const idx = valToIndices.get(v).values().next().value;\n                    valToIndices.get(v).delete(idx);\n                    const last = nums[nums.length - 1];\n                    nums[idx] = last;\n                    valToIndices.get(last).add(idx);\n                    valToIndices.get(last).delete(nums.length - 1);\n                    nums.pop();\n                    res.push(true);\n                }\n            } else if (op[0] === \"getRandom\") {\n                res.push(nums.length > 0 ? nums[0] : null);\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Value-to-IndexSet Map + Swap Deletion.",
      "algorithm": "Map each value to a set of indices in nums. Swap with back and update set pointers.",
      "timeComplexity": "O(1) average per operation",
      "spaceComplexity": "O(N)",
      "content": "Standard randomized collection design.",
      "referenceCode": "val_to_indices[last].add(idx); val_to_indices[last].discard(len(nums) - 1)"
    },
    "tags": [
      "Design",
      "Array",
      "Hash Table",
      "Randomized"
    ],
    "testCases": [
      {
        "input": "[[\"insert\",1],[\"insert\",1],[\"insert\",2],[\"getRandom\"],[\"remove\",1],[\"getRandom\"]]",
        "expectedOutput": "[true,false,true,1,true,1]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[\"insert\",1],[\"remove\",1],[\"insert\",1]]",
        "expectedOutput": "[true,true,true]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[\"remove\",0]]",
        "expectedOutput": "[false]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Design Compressed String Iterator",
    "slug": "design-compressed-string-iterator",
    "description": "Design and implement a data structure for a Compressed String Iterator. The given compressed string will be in the form of each letter followed by the count of that character (e.g. L1e2t1c1o1d1e1). Implement next() and hasNext().",
    "difficulty": Difficulty.EASY,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "compressedString.length <= 1000, operations <= 1000",
    "inputFormat": "compressedString, operations",
    "outputFormat": "List of outputs.",
    "sampleInput": "\"L1e2t1c1o1d1e1\", [\"next\",\"next\",\"next\",\"next\",\"next\",\"next\",\"hasNext\",\"next\",\"hasNext\"]",
    "sampleOutput": "[\"L\",\"e\",\"e\",\"t\",\"c\",\"o\",true,\"d\",true]",
    "points": 50,
    "hints": [
      "Parse character and multi-digit count into active buffer variable."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeStringIterator(self, compressedString: str, operations: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeStringIterator(compressedString, operations) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeStringIterator(self, compressedString: str, operations: list) -> list:\n        import re\n        tokens = re.findall(r'([A-Za-z])(d+)', compressedString)\n        tokens = [[ch, int(cnt)] for ch, cnt in tokens]\n        idx = 0\n        res = []\n        for op in operations:\n            if op == \"next\":\n                if idx < len(tokens):\n                    res.append(tokens[idx][0])\n                    tokens[idx][1] -= 1\n                    if tokens[idx][1] == 0:\n                        idx += 1\n                else:\n                    res.append(\" \")\n            elif op == \"hasNext\":\n                res.append(idx < len(tokens))\n        return res",
      "javascript": "class Solution {\n    executeStringIterator(compressedString, operations) {\n        const tokens = [];\n        let i = 0;\n        while (i < compressedString.length) {\n            const ch = compressedString[i++];\n            let cntStr = \"\";\n            while (i < compressedString.length && compressedString[i] >= '0' && compressedString[i] <= '9') {\n                cntStr += compressedString[i++];\n            }\n            tokens.push([ch, Number(cntStr)]);\n        }\n        let idx = 0;\n        const res = [];\n        for (const op of operations) {\n            if (op === \"next\") {\n                if (idx < tokens.length) {\n                    res.push(tokens[idx][0]);\n                    tokens[idx][1]--;\n                    if (tokens[idx][1] === 0) idx++;\n                } else {\n                    res.push(\" \");\n                }\n            } else if (op === \"hasNext\") {\n                res.push(idx < tokens.length);\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Token-Buffered Character Count Iterator.",
      "algorithm": "Parse string into token pairs (char, count) and decrement active count per query.",
      "timeComplexity": "O(1) per next/hasNext",
      "spaceComplexity": "O(Tokens)",
      "content": "Standard string compression iterator.",
      "referenceCode": "tokens[idx][1] -= 1; if tokens[idx][1] == 0: idx += 1"
    },
    "tags": [
      "Design",
      "String",
      "Iterator"
    ],
    "testCases": [
      {
        "input": "\"L1e2t1c1o1d1e1\", [\"next\",\"next\",\"next\",\"next\",\"next\",\"next\",\"hasNext\",\"next\",\"hasNext\"]",
        "expectedOutput": "[\"L\",\"e\",\"e\",\"t\",\"c\",\"o\",true,\"d\",true]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "\"a1\", [\"next\",\"hasNext\"]",
        "expectedOutput": "[\"a\",false]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "\"x3\", [\"next\",\"next\",\"next\",\"next\"]",
        "expectedOutput": "[\"x\",\"x\",\"x\",\" \"]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Range Sum Query 2D Mutable 2D Fenwick Tree",
    "slug": "range-sum-query-2d-mutable-2d-fenwick-tree",
    "description": "Given a 2D matrix matrix, handle multiple queries of the following types: update(row, col, val) and sumRegion(row1, col1, row2, col2).",
    "difficulty": Difficulty.HARD,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "m, n <= 200, operations <= 10^4",
    "inputFormat": "matrix, operations",
    "outputFormat": "List of outputs.",
    "sampleInput": "[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]], [[\"sumRegion\",2,1,4,3],[\"update\",3,2,2],[\"sumRegion\",2,1,4,3]]",
    "sampleOutput": "[8,null,10]",
    "points": 200,
    "hints": [
      "Implement a 2D Binary Indexed Tree (BIT / Fenwick Tree) supporting 2D point updates and 2D prefix sums."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeNumMatrix(self, matrix: list, operations: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeNumMatrix(matrix, operations) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeNumMatrix(self, matrix: list, operations: list) -> list:\n        if not matrix or not matrix[0]: return []\n        m, n = len(matrix), len(matrix[0])\n        tree = [[0] * (n + 1) for _ in range(m + 1)]\n        mat = [row[:] for row in matrix]\n        def update_bit(r, c, delta):\n            i = r + 1\n            while i <= m:\n                j = c + 1\n                while j <= n:\n                    tree[i][j] += delta\n                    j += j & (-j)\n                i += i & (-i)\n        def query_bit(r, c):\n            s = 0\n            i = r + 1\n            while i > 0:\n                j = c + 1\n                while j > 0:\n                    s += tree[i][j]\n                    j -= j & (-j)\n                i -= i & (-i)\n            return s\n        for r in range(m):\n            for c in range(n):\n                update_bit(r, c, mat[r][c])\n        res = []\n        for op in operations:\n            if op[0] == \"update\":\n                _, r, c, val = op\n                delta = val - mat[r][c]\n                mat[r][c] = val\n                update_bit(r, c, delta)\n                res.append(None)\n            elif op[0] == \"sumRegion\":\n                _, r1, c1, r2, c2 = op\n                s = query_bit(r2, c2) - query_bit(r1 - 1, c2) - query_bit(r2, c1 - 1) + query_bit(r1 - 1, c1 - 1)\n                res.append(s)\n        return res",
      "javascript": "class Solution {\n    executeNumMatrix(matrix, operations) {\n        if (!matrix || matrix.length === 0) return [];\n        const m = matrix.length, n = matrix[0].length;\n        const tree = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));\n        const mat = matrix.map(r => [...r]);\n        function updateBit(r, c, delta) {\n            for (let i = r + 1; i <= m; i += i & -i) {\n                for (let j = c + 1; j <= n; j += j & -j) {\n                    tree[i][j] += delta;\n                }\n            }\n        }\n        function queryBit(r, c) {\n            let s = 0;\n            for (let i = r + 1; i > 0; i -= i & -i) {\n                for (let j = c + 1; j > 0; j -= j & -j) {\n                    s += tree[i][j];\n                }\n            }\n            return s;\n        }\n        for (let r = 0; r < m; r++) {\n            for (let c = 0; c < n; c++) updateBit(r, c, mat[r][c]);\n        }\n        const res = [];\n        for (const op of operations) {\n            if (op[0] === \"update\") {\n                const [_, r, c, val] = op;\n                const delta = val - mat[r][c];\n                mat[r][c] = val;\n                updateBit(r, c, delta);\n                res.push(null);\n            } else if (op[0] === \"sumRegion\") {\n                const [_, r1, c1, r2, c2] = op;\n                const s = queryBit(r2, c2) - queryBit(r1 - 1, c2) - queryBit(r2, c1 - 1) + queryBit(r1 - 1, c1 - 1);\n                res.push(s);\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "2D Binary Indexed Tree (Fenwick Tree).",
      "algorithm": "2D Fenwick tree updates and queries rectangular prefix sums in O(log M * log N).",
      "timeComplexity": "Update O(log M * log N), Query O(log M * log N)",
      "spaceComplexity": "O(M * N)",
      "content": "Standard 2D BIT point update range query.",
      "referenceCode": "tree[i][j] += delta; j += j & (-j)"
    },
    "tags": [
      "Design",
      "Binary Indexed Tree",
      "Segment Tree",
      "Matrix"
    ],
    "testCases": [
      {
        "input": "[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]], [[\"sumRegion\",2,1,4,3],[\"update\",3,2,2],[\"sumRegion\",2,1,4,3]]",
        "expectedOutput": "[8,null,10]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "[[1]], [[\"sumRegion\",0,0,0,0],[\"update\",0,0,10],[\"sumRegion\",0,0,0,0]]",
        "expectedOutput": "[1,null,10]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "[[1,2],[3,4]], [[\"sumRegion\",0,0,1,1]]",
        "expectedOutput": "[10]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Phone Directory Memory Pool Allocation",
    "slug": "phone-directory-memory-pool-allocation",
    "description": "Design a phone directory that manages a pool of maxNumbers phone numbers from 0 to maxNumbers - 1. Implement get(), check(number), and release(number).",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= maxNumbers <= 10^4, operations <= 2 * 10^4",
    "inputFormat": "maxNumbers, operations",
    "outputFormat": "List of outputs.",
    "sampleInput": "3, [[\"get\"],[\"get\"],[\"check\",2],[\"get\"],[\"check\",2],[\"release\",2],[\"check\",2]]",
    "sampleOutput": "[0,1,true,2,false,null,true]",
    "points": 100,
    "hints": [
      "Maintain a queue of available numbers and a HashSet / bitset of allocated numbers."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executePhoneDirectory(self, maxNumbers: int, operations: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executePhoneDirectory(maxNumbers, operations) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executePhoneDirectory(self, maxNumbers: int, operations: list) -> list:\n        import collections\n        available = collections.deque(range(maxNumbers))\n        used = set()\n        res = []\n        for op in operations:\n            if op[0] == \"get\":\n                if available:\n                    num = available.popleft()\n                    used.add(num)\n                    res.append(num)\n                else:\n                    res.append(-1)\n            elif op[0] == \"check\":\n                num = op[1]\n                res.append(num not in used)\n            elif op[0] == \"release\":\n                num = op[1]\n                if num in used:\n                    used.remove(num)\n                    available.append(num)\n                res.append(None)\n        return res",
      "javascript": "class Solution {\n    executePhoneDirectory(maxNumbers, operations) {\n        const available = Array.from({ length: maxNumbers }, (_, i) => i);\n        const used = new Set();\n        const res = [];\n        for (const op of operations) {\n            if (op[0] === \"get\") {\n                if (available.length > 0) {\n                    const num = available.shift();\n                    used.add(num);\n                    res.push(num);\n                } else {\n                    res.push(-1);\n                }\n            } else if (op[0] === \"check\") {\n                res.push(!used.has(op[1]));\n            } else if (op[0] === \"release\") {\n                const num = op[1];\n                if (used.has(num)) {\n                    used.delete(num);\n                    available.push(num);\n                }\n                res.push(null);\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Queue + Hash Set ID Pool Allocator.",
      "algorithm": "O(1) allocation and deallocation of unique numerical tokens.",
      "timeComplexity": "O(1) per get/check/release",
      "spaceComplexity": "O(MaxNumbers)",
      "content": "Standard resource pool memory allocator.",
      "referenceCode": "used.remove(num); available.append(num)"
    },
    "tags": [
      "Design",
      "Queue",
      "Hash Table",
      "Linked List"
    ],
    "testCases": [
      {
        "input": "3, [[\"get\"],[\"get\"],[\"check\",2],[\"get\"],[\"check\",2],[\"release\",2],[\"check\",2]]",
        "expectedOutput": "[0,1,true,2,false,null,true]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "1, [[\"check\",0],[\"get\"],[\"check\",0]]",
        "expectedOutput": "[true,0,false]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "1, [[\"get\"],[\"get\"]]",
        "expectedOutput": "[0,-1]",
        "isHidden": true,
        "order": 2
      }
    ]
  },
  {
    "title": "Snapshot Array Versioned State Design",
    "slug": "snapshot-array-versioned-state-design",
    "description": "Implement a SnapshotArray that supports set(index, val), snap(), and get(index, snap_id). Snap() takes a snapshot of the array and returns the snap_id (the total number of times we called snap() minus 1). Get(index, snap_id) returns the value at the given index at the time we took the snapshot with the given snap_id.",
    "difficulty": Difficulty.MEDIUM,
    "timeLimit": 1000,
    "memoryLimit": 128,
    "constraints": "1 <= length <= 5 * 10^4, 0 <= index < length, 0 <= val <= 10^9, 0 <= snap_id < total snaps, total calls <= 5 * 10^4",
    "inputFormat": "length, operations",
    "outputFormat": "List of return values for snap/get/set operations.",
    "sampleInput": "3, [[\"set\",0,5],[\"snap\"],[\"set\",0,6],[\"get\",0,0]]",
    "sampleOutput": "[null,0,null,5]",
    "points": 100,
    "hints": [
      "Store history of (snap_id, value) per index and use binary search (bisect) for get query."
    ],
    "codeTemplates": {
      "python": "class Solution:\n    def executeSnapshotArray(self, length: int, operations: list) -> list:\n        pass",
      "javascript": "class Solution {\n    executeSnapshotArray(length, operations) {\n        \n    }\n}"
    },
    "referenceSolutions": {
      "python": "class Solution:\n    def executeSnapshotArray(self, length: int, operations: list) -> list:\n        import bisect\n        arr = [[[-1, 0]] for _ in range(length)]\n        snap_id = 0\n        res = []\n        for op in operations:\n            if op[0] == \"set\":\n                idx, val = op[1], op[2]\n                if arr[idx][-1][0] == snap_id:\n                    arr[idx][-1][1] = val\n                else:\n                    arr[idx].append([snap_id, val])\n                res.append(None)\n            elif op[0] == \"snap\":\n                res.append(snap_id)\n                snap_id += 1\n            elif op[0] == \"get\":\n                idx, sid = op[1], op[2]\n                history = arr[idx]\n                pos = bisect.bisect_right(history, [sid, float('inf')]) - 1\n                res.append(history[pos][1])\n        return res",
      "javascript": "class Solution {\n    executeSnapshotArray(length, operations) {\n        const arr = Array.from({ length }, () => [[-1, 0]]);\n        let snapId = 0;\n        const res = [];\n        for (const op of operations) {\n            if (op[0] === \"set\") {\n                const idx = op[1], val = op[2];\n                const hist = arr[idx];\n                if (hist[hist.length - 1][0] === snapId) {\n                    hist[hist.length - 1][1] = val;\n                } else {\n                    hist.push([snapId, val]);\n                }\n                res.push(null);\n            } else if (op[0] === \"snap\") {\n                res.push(snapId);\n                snapId++;\n            } else if (op[0] === \"get\") {\n                const idx = op[1], sid = op[2];\n                const hist = arr[idx];\n                let low = 0, high = hist.length - 1, ans = 0;\n                while (low <= high) {\n                    const mid = Math.floor((low + high) / 2);\n                    if (hist[mid][0] <= sid) {\n                        ans = hist[mid][1];\n                        low = mid + 1;\n                    } else {\n                        high = mid - 1;\n                    }\n                }\n                res.push(ans);\n            }\n        }\n        return res;\n    }\n}"
    },
    "editorial": {
      "approach": "Array of Version History + Binary Search Bisect.",
      "algorithm": "Keep list of [snap_id, val] pairs per index. Query with bisect_right.",
      "timeComplexity": "O(log(snaps)) per get, O(1) set/snap",
      "spaceComplexity": "O(N + total set calls)",
      "content": "Standard persistent array implementation using history logs.",
      "referenceCode": "bisect_right(history, [sid, inf]) - 1"
    },
    "tags": [
      "Design",
      "Binary Search",
      "Array",
      "Hash Table"
    ],
    "testCases": [
      {
        "input": "3, [[\"set\",0,5],[\"snap\"],[\"set\",0,6],[\"get\",0,0]]",
        "expectedOutput": "[null,0,null,5]",
        "isHidden": false,
        "order": 0
      },
      {
        "input": "1, [[\"set\",0,15],[\"snap\"],[\"snap\"],[\"get\",0,0],[\"get\",0,1]]",
        "expectedOutput": "[null,0,1,15,15]",
        "isHidden": false,
        "order": 1
      },
      {
        "input": "2, [[\"snap\"],[\"get\",0,0],[\"get\",1,0]]",
        "expectedOutput": "[0,0,0]",
        "isHidden": true,
        "order": 2
      }
    ]
  }
];
