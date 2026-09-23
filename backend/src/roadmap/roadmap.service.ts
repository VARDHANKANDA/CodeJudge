import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface RoadmapLevel {
  levelNumber: number;
  title: string;
  subtitle: string;
  description: string;
  topics: RoadmapTopicItem[];
}

export interface RoadmapTopicItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  conceptOverview: string;
  keyConcepts: string[];
  problemSlugs: string[];
  totalProblems: number;
  solvedProblems: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
}

@Injectable()
export class RoadmapService {
  constructor(private prisma: PrismaService) {}

  private readonly ROADMAP_LEVELS_DEF: Omit<RoadmapLevel, 'topics'>[] = [
    {
      levelNumber: 1,
      title: 'Foundations',
      subtitle: 'Algorithmic Complexity & Core Syntax',
      description: 'Master time/space complexity analysis, basic mathematics, and fundamental array and string manipulation.',
    },
    {
      levelNumber: 2,
      title: 'Core Data Structures',
      subtitle: 'Pointers, Linear & Hierarchical Structures',
      description: 'Understand memory models, dynamic linked nodes, LIFO/FIFO stacks/queues, hash buckets, binary trees, and binary heaps.',
    },
    {
      levelNumber: 3,
      title: 'Core Algorithms',
      subtitle: 'Searching, Sorting, Two Pointers & Windowing',
      description: 'Implement foundational algorithmic paradigms including binary search on answer spaces, sliding window, prefix arrays, and greedy heuristics.',
    },
    {
      levelNumber: 4,
      title: 'Advanced Structures',
      subtitle: 'Disjoint Sets, Trees & Range Queries',
      description: 'Build Disjoint Set Union (DSU) with rank and path compression, segment trees, and tree traversals.',
    },
    {
      levelNumber: 5,
      title: 'Dynamic Programming',
      subtitle: 'Memoization, Tabulation & Space Optimization',
      description: 'Master optimal substructure and overlapping subproblems from 1D sequences to 2D grids, 0/1 knapsack, and sequence matching.',
    },
    {
      levelNumber: 6,
      title: 'Advanced Graph Algorithms',
      subtitle: 'Shortest Paths, Minimum Spanning Trees & Topo Sort',
      description: 'Implement Dijkstra, Bellman-Ford, Kruskal, Prim, Kahn topological sorting, and strongly connected components.',
    },
    {
      levelNumber: 7,
      title: 'Competitive Programming & Math',
      subtitle: 'Number Theory, Bitwise Tricks & Combinatorics',
      description: 'Master modular arithmetic, prime sieves, bitmask manipulations, and competitive contest problem-solving techniques.',
    },
  ];

  private readonly TOPICS_CATALOG = [
    {
        "levelNumber": 1,
        "id": "l1-complexity",
        "slug": "time-space-complexity",
        "name": "Time & Space Complexity Analysis",
        "description": "Big-O notation, logarithmic curves, amortization, and recurrence trees.",
        "difficulty": "EASY",
        "conceptOverview": "Asymptotic notation characterizes algorithm scalability independently of hardware constants. Big-O represents worst-case upper bounds, Big-Omega lower bounds, and Big-Theta tight bounds.",
        "keyConcepts": [
            "Asymptotic Dominance",
            "Worst, Average & Amortized Complexity",
            "Master Theorem Basics"
        ],
        "problemSlugs": [
            "binary-search",
            "climbing-stairs",
            "contains-duplicate",
            "best-time-to-buy-and-sell-stock",
            "palindrome-number",
            "single-number"
        ]
    },
    {
        "levelNumber": 1,
        "id": "l1-arrays",
        "slug": "array-fundamentals",
        "name": "Array Fundamentals & Traversal",
        "description": "Linear array traversal, in-place modifications, and index lookup.",
        "difficulty": "EASY",
        "conceptOverview": "Arrays store contiguous memory elements with O(1) random access by index. Fundamental operations involve iteration, prefix accumulation, and finding elements under target conditions.",
        "keyConcepts": [
            "Contiguous Memory & Indexing",
            "Linear Scan & Frequency Count",
            "Two Sum Hash Lookup Pattern"
        ],
        "problemSlugs": [
            "two-sum",
            "binary-search",
            "contains-duplicate",
            "best-time-to-buy-and-sell-stock",
            "single-number",
            "missing-number",
            "majority-element",
            "move-zeroes"
        ]
    },
    {
        "levelNumber": 1,
        "id": "l1-hashing",
        "slug": "basic-hashing",
        "name": "Hash Tables & Frequency Counting",
        "description": "O(1) dictionary lookups, frequency maps, and hash sets.",
        "difficulty": "EASY",
        "conceptOverview": "Hash tables map keys to values using hash functions for O(1) average lookup and insertion time. Perfect for deduplication and complement lookups.",
        "keyConcepts": [
            "Hash Bucket Distribution",
            "Set Lookup & Membership Testing",
            "Frequency Map Tracking"
        ],
        "problemSlugs": [
            "contains-duplicate",
            "valid-anagram",
            "first-unique-character-in-a-string",
            "intersection-of-two-arrays"
        ]
    },
    {
        "levelNumber": 1,
        "id": "l1-strings",
        "slug": "string-manipulation",
        "name": "String Traversal & ASCII Manipulation",
        "description": "String mutability, character frequency counts, and palindromes.",
        "difficulty": "EASY",
        "conceptOverview": "Strings are character sequences. Palindrome detection and anagram identification are solved via two pointers or frequency arrays of size 26/128.",
        "keyConcepts": [
            "ASCII Integer Offsets",
            "In-Place Character Reversal",
            "Two Pointer Palindrome Validation"
        ],
        "problemSlugs": [
            "reverse-a-string",
            "valid-anagram",
            "palindrome-number",
            "valid-palindrome",
            "first-unique-character-in-a-string",
            "fizz-buzz",
            "palindrome-linked-list",
            "subtree-of-another-tree"
        ]
    },
    {
        "levelNumber": 1,
        "id": "l1-math",
        "slug": "basic-math-digits",
        "name": "Integer Math & Digit Extraction",
        "description": "Modulo arithmetic, digit reversal, and overflow handling.",
        "difficulty": "EASY",
        "conceptOverview": "Modulo 10 yields the lowest significant digit and integer division by 10 shifts remaining digits, allowing O(log10 N) digit extractions.",
        "keyConcepts": [
            "Digit Extraction Loop",
            "32-Bit Signed Integer Overflow Rules",
            "Greatest Common Divisor (Euclid)"
        ],
        "problemSlugs": [
            "climbing-stairs",
            "palindrome-number",
            "power-of-two",
            "missing-number",
            "valid-palindrome",
            "fizz-buzz"
        ]
    },
    {
        "levelNumber": 1,
        "id": "l1-prefix-sum",
        "slug": "prefix-sum-arrays",
        "name": "Prefix Sum & Cumulative Aggregations",
        "description": "Range sum queries in O(1) time after O(N) precomputation.",
        "difficulty": "EASY",
        "conceptOverview": "Prefix sums store cumulative totals prefix[i] = prefix[i-1] + arr[i], turning arbitrary subsegment sum queries range(L, R) into prefix[R] - prefix[L-1] in O(1) time.",
        "keyConcepts": [
            "Cumulative Sum Array",
            "O(1) Range Queries",
            "Subarray Sum Equals K via Hash Map"
        ],
        "problemSlugs": [
            "longest-common-prefix",
            "longest-common-prefix-trie"
        ]
    },
    {
        "levelNumber": 1,
        "id": "l1-bit-basics",
        "slug": "bitwise-operations-basics",
        "name": "Bitwise Operators & XOR Properties",
        "description": "AND, OR, XOR, bit shifting, and single number detection.",
        "difficulty": "EASY",
        "conceptOverview": "Bitwise operations process hardware binary representations in O(1) time. XOR cancels out duplicate numbers (A ^ A = 0) and preserves unique elements (A ^ 0 = A).",
        "keyConcepts": [
            "Bitwise Shift (<<, >>)",
            "XOR Cancellation Property",
            "Brian Kernighans Set Bit Algorithm"
        ],
        "problemSlugs": [
            "single-number",
            "power-of-two",
            "missing-number",
            "counting-bits",
            "number-of-1-bits",
            "reverse-bits"
        ]
    },
    {
        "levelNumber": 2,
        "id": "l2-linked-lists",
        "slug": "singly-linked-lists",
        "name": "Singly & Doubly Linked Lists",
        "description": "Pointer manipulation, sentinel dummy nodes, and in-place reversal.",
        "difficulty": "MEDIUM",
        "conceptOverview": "Linked nodes maintain pointers to successors. Dummy heads simplify boundary edge cases during node insertion and deletion.",
        "keyConcepts": [
            "Dummy Head Sentinel Pattern",
            "Three-Pointer Reversal",
            "Node Splitting & Merging"
        ],
        "problemSlugs": [
            "remove-nth-node-from-end-of-list",
            "reorder-list",
            "lru-cache",
            "design-lru-cache-eviction",
            "flatten-binary-tree-to-linked-list-in-place",
            "design-browser-history-back-forward-navigation",
            "phone-directory-memory-pool-allocation"
        ]
    },
    {
        "levelNumber": 2,
        "id": "l2-fast-slow",
        "slug": "fast-and-slow-pointers",
        "name": "Fast & Slow Pointers (Floyds Cycle)",
        "description": "Cycle detection, list midpoints, and cycle entrance calculation.",
        "difficulty": "MEDIUM",
        "conceptOverview": "Floyds Tortoise and Hare advances slow by 1 step and fast by 2 steps. Meeting indicates a cycle; repositioning one pointer to head finds the entry node.",
        "keyConcepts": [
            "Cycle Existence Detection",
            "Midpoint Split via Fast/Slow",
            "Floyds Cycle Origin Proof"
        ],
        "problemSlugs": [
            "remove-nth-node-from-end-of-list",
            "reorder-list",
            "lru-cache",
            "negative-cycle-detection-bellman-ford",
            "design-lru-cache-eviction",
            "remove-duplicate-letters-lexicographical"
        ]
    },
    {
        "levelNumber": 2,
        "id": "l2-stacks",
        "slug": "stack-lifo-pattern",
        "name": "Stack LIFO & Expression Evaluation",
        "description": "Parentheses matching, reverse Polish notation, and call stacks.",
        "difficulty": "MEDIUM",
        "conceptOverview": "Last-In First-Out (LIFO) stacks resolve nested structures, balanced brackets, and evaluate postfix/infix expressions with O(1) push and pop operations.",
        "keyConcepts": [
            "LIFO Memory Ordering",
            "Bracket Balancing Invariants",
            "Expression Evaluation with Operator Precedence"
        ],
        "problemSlugs": [
            "daily-temperatures",
            "generate-parentheses",
            "evaluate-reverse-polish-notation",
            "min-stack",
            "reorder-list",
            "daily-temperatures-monotonic-stack",
            "decode-string-nested-bracket-parser",
            "sum-of-subarray-minimums-monotonic-stack"
        ]
    },
    {
        "levelNumber": 2,
        "id": "l2-queues",
        "slug": "queue-fifo-deque",
        "name": "Queue FIFO & Double-Ended Queues",
        "description": "Sliding window buffers, ring buffers, and level order traversal.",
        "difficulty": "MEDIUM",
        "conceptOverview": "Queues maintain First-In First-Out (FIFO) semantics. Double-ended queues (deques) support O(1) insertion and deletion at both front and back boundaries.",
        "keyConcepts": [
            "FIFO Flow Control",
            "Circular Ring Buffers",
            "Double-Ended Queue (Deque) Manipulation"
        ],
        "problemSlugs": [
            "kth-largest-element-in-an-array",
            "top-k-frequent-elements",
            "k-closest-points-to-origin",
            "task-scheduler",
            "meeting-rooms-ii",
            "longest-repeating-character-replacement"
        ]
    },
    {
        "levelNumber": 2,
        "id": "l2-trees",
        "slug": "binary-tree-traversals",
        "name": "Binary Tree Traversals (Pre, In, Post, Level)",
        "description": "DFS recursion, iterative stacks, and BFS queue traversals.",
        "difficulty": "MEDIUM",
        "conceptOverview": "Binary trees branch into at most two children. Inorder traversal of a BST yields strictly sorted values.",
        "keyConcepts": [
            "Recursive DFS (Pre/In/Post)",
            "Iterative Stack Traversal",
            "BFS Level-by-Level Queue Scan"
        ],
        "problemSlugs": [
            "lowest-common-ancestor-of-a-bst",
            "validate-binary-search-tree",
            "kth-smallest-element-in-a-bst",
            "binary-tree-level-order-traversal",
            "implement-trie-prefix-tree",
            "construct-binary-tree-from-preorder-and-inorder-traversal",
            "graph-valid-tree",
            "range-sum-query-mutable"
        ]
    },
    {
        "levelNumber": 2,
        "id": "l2-bst",
        "slug": "binary-search-tree-properties",
        "name": "Binary Search Tree (BST) Operations",
        "description": "Search, insertion, deletion, and validation of BST properties.",
        "difficulty": "MEDIUM",
        "conceptOverview": "BSTs guarantee all left sub-elements < node < right sub-elements, enabling O(log N) average search and insertion.",
        "keyConcepts": [
            "BST Search Property",
            "Inorder Successor/Predecessor",
            "Valid BST Range Verification [min, max]"
        ],
        "problemSlugs": [
            "longest-substring-without-repeating-characters",
            "lowest-common-ancestor-of-a-bst",
            "validate-binary-search-tree",
            "kth-smallest-element-in-a-bst",
            "palindromic-substrings",
            "longest-palindromic-substring",
            "unique-binary-search-trees",
            "validate-binary-search-tree-iterative"
        ]
    },
    {
        "levelNumber": 2,
        "id": "l2-heaps",
        "slug": "binary-heap-priority-queue",
        "name": "Min/Max Heap & Priority Queues",
        "description": "Complete binary tree arrays, heapify, and Top-K element tracking.",
        "difficulty": "MEDIUM",
        "conceptOverview": "Heaps maintain the root element as the extreme value. Insertions and extractions run in O(log N) time with O(1) peek.",
        "keyConcepts": [
            "Array Heap Representation (2i+1, 2i+2)",
            "Sift-Up & Sift-Down Heapify in O(N)",
            "Top-K Elements via Size-Bounded Heap"
        ],
        "problemSlugs": [
            "kth-largest-element",
            "kth-largest-element-in-an-array",
            "top-k-frequent-elements",
            "k-closest-points-to-origin",
            "task-scheduler",
            "meeting-rooms-ii",
            "network-delay-time",
            "kth-largest-element-heap-stream"
        ]
    },
    {
        "levelNumber": 3,
        "id": "l3-two-pointers",
        "slug": "two-pointers-technique",
        "name": "Two Pointers (Opposite & Same Direction)",
        "description": "Sorted array target sum search, 3Sum, container with water.",
        "difficulty": "MEDIUM",
        "conceptOverview": "Two pointers reduce O(N^2) nested loops to O(N) by shrinking or expanding search intervals based on monotonic properties.",
        "keyConcepts": [
            "Inward Shrink Technique",
            "3Sum and K-Sum Extensions",
            "Deduplication by Skipping Identical Elements"
        ],
        "problemSlugs": [
            "container-with-most-water",
            "3sum",
            "remove-nth-node-from-end-of-list",
            "palindromic-substrings",
            "reorder-list",
            "longest-palindromic-substring",
            "meeting-rooms-ii",
            "permutation-in-string"
        ]
    },
    {
        "levelNumber": 3,
        "id": "l3-sliding-window",
        "slug": "sliding-window-subarrays",
        "name": "Sliding Window (Fixed & Variable Length)",
        "description": "Longest substring without repeating chars, minimum size subarray sum.",
        "difficulty": "MEDIUM",
        "conceptOverview": "Sliding windows maintain valid state invariants inside a dynamic interval [L, R] by advancing R and contracting L conditionally.",
        "keyConcepts": [
            "Fixed Window Slice Invariant",
            "Variable Window Expand-Contract Paradigm",
            "Frequency Hash Map Window State"
        ],
        "problemSlugs": [
            "maximum-subarray",
            "longest-substring-without-repeating-characters",
            "subarray-sum-equals-k",
            "maximum-product-subarray",
            "longest-repeating-character-replacement",
            "permutation-in-string",
            "find-all-anagrams-in-a-string",
            "minimum-size-subarray-sum"
        ]
    },
    {
        "levelNumber": 3,
        "id": "l3-binary-search",
        "slug": "binary-search-paradigm",
        "name": "Binary Search (Exact, Lower/Upper Bound)",
        "description": "O(log N) interval halving and finding insertion indices.",
        "difficulty": "EASY",
        "conceptOverview": "Binary search repeatedly halves sorted search spaces. Lower bound finds the first index >= target, upper bound finds first index > target.",
        "keyConcepts": [
            "Search Space Invariant mid = L + (R-L)/2",
            "Boundary Shrink (L = mid + 1 vs R = mid)",
            "Rotated Sorted Array Search"
        ],
        "problemSlugs": [
            "binary-search",
            "intersection-of-two-arrays"
        ]
    },
    {
        "levelNumber": 3,
        "id": "l3-bs-answers",
        "slug": "binary-search-on-answer-space",
        "name": "Binary Search on Answer Spaces",
        "description": "Monotonic feasibility functions: Koko Bananas, Capacity to Ship Packages.",
        "difficulty": "MEDIUM",
        "conceptOverview": "When checking if an answer X is possible is easy and monotonic, binary search finds the optimal threshold X in O(log(Max-Min) * Cost).",
        "keyConcepts": [
            "Monotonic Predicate Function isValid(mid)",
            "Minimizing the Maximum (Minimax)",
            "Answer Space Bounds Estimation"
        ],
        "problemSlugs": [
            "capacity-to-ship-packages-within-d-days",
            "koko-eating-bananas-minimum-speed"
        ]
    },
    {
        "levelNumber": 3,
        "id": "l3-sorting",
        "slug": "sorting-divide-and-conquer",
        "name": "Divide & Conquer Sorting (Merge & QuickSort)",
        "description": "O(N log N) recursive sorting, quickselect O(N) median.",
        "difficulty": "MEDIUM",
        "conceptOverview": "MergeSort divides arrays into halves and merges in O(N). QuickSort partitions around pivots, enabling O(N) average selection.",
        "keyConcepts": [
            "Two-Way Merge Algorithm",
            "Lomuto/Hoare Partitioning",
            "Quickselect O(N) K-th Element"
        ],
        "problemSlugs": [
            "kth-largest-element-in-an-array",
            "search-in-rotated-sorted-array",
            "3sum",
            "group-anagrams",
            "top-k-frequent-elements",
            "find-minimum-in-rotated-sorted-array",
            "non-overlapping-intervals",
            "course-schedule"
        ]
    },
    {
        "levelNumber": 3,
        "id": "l3-greedy",
        "slug": "greedy-heuristics",
        "name": "Greedy Heuristics & Interval Scheduling",
        "description": "Locally optimal choices leading to global optima: Merge Intervals, Jump Game.",
        "difficulty": "MEDIUM",
        "conceptOverview": "Greedy algorithms construct solutions piece by piece, always choosing the next piece that offers the most immediate benefit without backtracking.",
        "keyConcepts": [
            "Greedy-Choice Property Proof",
            "Interval Sorting by Start/End Time",
            "Jump Game Reachability Array"
        ],
        "problemSlugs": [
            "merge-intervals",
            "container-with-most-water",
            "jump-game",
            "jump-game-ii",
            "non-overlapping-intervals",
            "task-scheduler",
            "insert-interval",
            "meeting-rooms-ii"
        ]
    },
    {
        "levelNumber": 3,
        "id": "l3-backtracking",
        "slug": "backtracking-state-space",
        "name": "Backtracking & State Space Tree Search",
        "description": "Subsets, permutations, combinations, N-Queens, Sudoku solver.",
        "difficulty": "MEDIUM",
        "conceptOverview": "Backtracking builds solution candidates recursively, abandoning a candidate (backtracking) as soon as it is determined not to lead to a valid solution.",
        "keyConcepts": [
            "Decision Tree State Representation",
            "Choose-Explore-Unchoose Pattern",
            "Constraint Pruning to Eliminate Subtrees"
        ],
        "problemSlugs": [
            "word-search",
            "subsets",
            "generate-parentheses",
            "letter-combinations-of-a-phone-number",
            "combination-sum",
            "combination-sum-ii",
            "permutations",
            "subsets-ii"
        ]
    },
    {
        "levelNumber": 4,
        "id": "l4-dsu",
        "slug": "disjoint-set-union",
        "name": "Disjoint Set Union (DSU / Union-Find)",
        "description": "Path compression and union by rank for dynamic connectivity in nearly O(1).",
        "difficulty": "MEDIUM",
        "conceptOverview": "DSU tracks elements partitioned into disjoint subsets. Path compression flattens tree depths, giving near O(1) amortized operations (Inverse Ackermann alpha(N)).",
        "keyConcepts": [
            "Path Compression in find()",
            "Union by Rank / Size",
            "Cycle Detection in Undirected Graphs"
        ],
        "problemSlugs": [
            "number-of-islands",
            "longest-consecutive-sequence",
            "surrounded-regions",
            "graph-valid-tree",
            "number-of-connected-components-in-an-undirected-graph",
            "redundant-connection",
            "minimum-spanning-tree",
            "is-graph-bipartite"
        ]
    },
    {
        "levelNumber": 4,
        "id": "l4-segment-tree",
        "slug": "segment-trees-range-queries",
        "name": "Segment Trees & Lazy Propagation",
        "description": "O(log N) point/range updates and range queries on associative operations.",
        "difficulty": "HARD",
        "conceptOverview": "Segment trees partition array ranges into a binary tree. Lazy propagation delays updates to child nodes until accessed, maintaining O(log N) range updates.",
        "keyConcepts": [
            "Tree Array Representation (4N Size)",
            "Merge Function (Sum, Min, Max, GCD)",
            "Lazy Propagation Tag Postponement"
        ],
        "problemSlugs": [
            "count-of-smaller-numbers-after-self",
            "segment-tree-lazy-propagation",
            "sweep-line-rectangle-area-ii",
            "my-calendar-iii-maximum-concurrent-overlap-k-booking",
            "range-sum-query-2d-mutable-2d-fenwick-tree",
            "count-of-smaller-numbers-after-self-fenwick"
        ]
    },
    {
        "levelNumber": 4,
        "id": "l4-fenwick",
        "slug": "fenwick-tree-binary-indexed",
        "name": "Fenwick Tree (Binary Indexed Tree / BIT)",
        "description": "O(log N) prefix sums and point updates with minimal space overhead.",
        "difficulty": "HARD",
        "conceptOverview": "Fenwick Trees store partial sums using lowbit (i & -i) isolation, supporting O(log N) prefix queries and point updates with exact N memory.",
        "keyConcepts": [
            "Lowest Significant Set Bit (i & -i)",
            "Prefix Sum Accumulation via BIT",
            "Inversion Counting in Permutations"
        ],
        "problemSlugs": [
            "shortest-superstring",
            "traveling-salesman-problem-bitmask",
            "n-queens-ii-distinct-solutions",
            "max-xor-element-array",
            "meet-in-the-middle-partitioning-target-sum",
            "n-queens-ii-total-solutions-count"
        ]
    },
    {
        "levelNumber": 4,
        "id": "l4-trie",
        "slug": "trie-prefix-tree",
        "name": "Trie (Prefix Tree) & Auto-Completion",
        "description": "O(L) word lookup, prefix matching, and bitwise XOR tries.",
        "difficulty": "MEDIUM",
        "conceptOverview": "Tries store strings character by character across a tree. Bitwise 0/1 tries find maximum XOR pairs in O(32) time.",
        "keyConcepts": [
            "Alphabet Node Array children[26]",
            "End-of-Word Boolean Flag",
            "Bitwise Binary Trie for Maximum XOR"
        ],
        "problemSlugs": [
            "word-search",
            "product-of-array-except-self",
            "subarray-sum-equals-k",
            "word-break",
            "meeting-rooms-ii",
            "implement-trie-prefix-tree",
            "minimum-size-subarray-sum",
            "max-consecutive-ones-iii"
        ]
    },
    {
        "levelNumber": 4,
        "id": "l4-monotonic-stack",
        "slug": "monotonic-stack-queue",
        "name": "Monotonic Stacks & Next Greater Element",
        "description": "O(N) next greater element, daily temperatures, largest rectangle in histogram.",
        "difficulty": "HARD",
        "conceptOverview": "Monotonic stacks maintain elements in strictly increasing or decreasing order. Popping elements upon violation resolves range boundaries in single-pass O(N).",
        "keyConcepts": [
            "Monotonically Decreasing Index Stack",
            "Largest Rectangle in Histogram Formula",
            "Daily Temperatures & Stock Spans"
        ],
        "problemSlugs": [
            "trapping-rain-water",
            "largest-rectangle-in-histogram",
            "sliding-window-maximum",
            "sliding-window-maximum-monotonic-deque",
            "largest-rectangle-in-histogram-monotonic-stack",
            "maximal-rectangle-binary-matrix",
            "trapping-rain-water-ii-3d-min-heap",
            "cartesian-tree-inorder-and-min-heap-construction"
        ]
    },
    {
        "levelNumber": 4,
        "id": "l4-sparse-table",
        "slug": "sparse-table-rmq",
        "name": "Sparse Table & Static Range Minimum Query",
        "description": "O(N log N) precomputation with true O(1) idempotent range queries.",
        "difficulty": "HARD",
        "conceptOverview": "Sparse tables precompute answers for intervals of length 2^k. For idempotent operations (Min, Max, GCD), two overlapping ranges give exact O(1) query time.",
        "keyConcepts": [
            "Binary Lifting Precomputation ST[k][i]",
            "Idempotent Overlap Query [L, R]",
            "O(1) Range Minimum Query"
        ],
        "problemSlugs": [
            "range-minimum-query-sparse-table"
        ]
    },
    {
        "levelNumber": 5,
        "id": "l5-1d-dp",
        "slug": "1d-dynamic-programming",
        "name": "1D Dynamic Programming (Sequences & Jumps)",
        "description": "Climbing stairs, house robber, coin change, longest increasing subsequence.",
        "difficulty": "MEDIUM",
        "conceptOverview": "1D DP solves optimal substructures where the current state dp[i] depends on a constant number of preceding states with overlapping subproblems.",
        "keyConcepts": [
            "Memoization vs Tabulation",
            "State Transition Relations",
            "O(1) Rolling Variable Space Optimization"
        ],
        "problemSlugs": [
            "house-robber",
            "coin-change",
            "evaluate-reverse-polish-notation",
            "remove-nth-node-from-end-of-list",
            "reorder-list",
            "house-robber-ii",
            "lru-cache",
            "coin-change-ii"
        ]
    },
    {
        "levelNumber": 5,
        "id": "l5-grid-dp",
        "slug": "2d-grid-dynamic-programming",
        "name": "2D Grid DP & Path Counting",
        "description": "Unique paths, minimum path sum, maximal square in binary matrix.",
        "difficulty": "MEDIUM",
        "conceptOverview": "2D Grid DP computes optimal costs to reach coordinate (r, c) based on top (r-1, c) and left (r, c-1) neighbors, compressible to O(C) space.",
        "keyConcepts": [
            "Matrix Coordinate Transitions",
            "Obstacle Grid Boundary Conditions",
            "Rolling Row Space Compression"
        ],
        "problemSlugs": [
            "unique-paths",
            "maximal-square",
            "minimum-path-sum"
        ]
    },
    {
        "levelNumber": 5,
        "id": "l5-knapsack",
        "slug": "knapsack-problems",
        "name": "0/1 & Unbounded Knapsack Variants",
        "description": "Subset sum, partition equal subset sum, target sum.",
        "difficulty": "MEDIUM",
        "conceptOverview": "0/1 Knapsack decisions iterate backward over capacity to reuse each element at most once; unbounded knapsack iterates forward to allow infinite reuse.",
        "keyConcepts": [
            "Reverse Capacity Iteration for 0/1",
            "Unbounded Forward Capacity Scan",
            "Partition Equal Subset Sum Mapping"
        ],
        "problemSlugs": [
            "0-1-knapsack-problem",
            "partition-equal-subset-sum",
            "partition-labels-greedy-intervals",
            "partition-labels-greedy",
            "matchsticks-to-square-partition",
            "partition-to-k-equal-sum-subsets-backtrack",
            "palindrome-partitioning-all-decompositions",
            "sort-colors-dutch-national-flag-partition"
        ]
    },
    {
        "levelNumber": 5,
        "id": "l5-string-dp",
        "slug": "string-sequence-dp",
        "name": "String DP (LCS & Edit Distance)",
        "description": "Longest Common Subsequence, Levenshtein Edit Distance, Wildcard matching.",
        "difficulty": "HARD",
        "conceptOverview": "String DP models two string prefixes s1[0..i] and s2[0..j], evaluating match, insert, delete, and replace costs in O(N*M) time.",
        "keyConcepts": [
            "2D String Prefix Matrix dp[i][j]",
            "LCS Character Match Invariant",
            "Edit Distance Transformation Matrix"
        ],
        "problemSlugs": [
            "edit-distance",
            "wildcard-matching-dynamic-programming"
        ]
    },
    {
        "levelNumber": 5,
        "id": "l5-interval-dp",
        "slug": "interval-range-dp",
        "name": "Interval / Range Dynamic Programming",
        "description": "Matrix chain multiplication, burst balloons, stone game.",
        "difficulty": "HARD",
        "conceptOverview": "Interval DP computes answers for subsegments of increasing length len from 1 to N, splitting at every partition index k where L <= k < R.",
        "keyConcepts": [
            "Length-Based Outer Loop Invariant",
            "Partition Split Point Iteration",
            "Burst Balloons Last-Popped Logic"
        ],
        "problemSlugs": [
            "matrix-chain-multiplication",
            "burst-balloons"
        ]
    },
    {
        "levelNumber": 5,
        "id": "l5-tree-dp",
        "slug": "tree-dynamic-programming",
        "name": "Tree DP & Subtree Aggregation",
        "description": "Binary tree maximum path sum, house robber III, tree diameter.",
        "difficulty": "HARD",
        "conceptOverview": "Tree DP aggregates values from left and right child subtrees during post-order traversal to compute optimal answers rooted at u.",
        "keyConcepts": [
            "Post-Order Subtree DFS",
            "Include/Exclude Root State Vector",
            "Tree Diameter Longest Paths"
        ],
        "problemSlugs": [
            "binary-tree-maximum-path-sum",
            "binary-tree-cameras",
            "serialize-and-deserialize-binary-tree",
            "count-of-smaller-numbers-after-self",
            "segment-tree-lazy-propagation",
            "kth-ancestor-tree-node-binary-lifting",
            "sum-of-distances-in-tree",
            "critical-and-pseudo-critical-edges-in-mst"
        ]
    },
    {
        "levelNumber": 6,
        "id": "l6-bfs-dfs",
        "slug": "graph-traversals-bfs-dfs",
        "name": "Graph Representations & BFS/DFS Traversal",
        "description": "Adjacency lists, connected components, bipartiteness, cycle check.",
        "difficulty": "MEDIUM",
        "conceptOverview": "Adjacency lists represent sparse graphs in O(V + E). BFS finds unweighted shortest paths; DFS finds connected components and detects cycles.",
        "keyConcepts": [
            "Adjacency List vs Matrix",
            "2-Color Bipartite Verification",
            "Connected Components Discovery"
        ],
        "problemSlugs": [
            "number-of-islands",
            "course-schedule",
            "course-schedule-ii",
            "graph-valid-tree",
            "number-of-connected-components-in-an-undirected-graph",
            "redundant-connection",
            "network-delay-time",
            "minimum-spanning-tree"
        ]
    },
    {
        "levelNumber": 6,
        "id": "l6-shortest-path",
        "slug": "dijkstra-shortest-paths",
        "name": "Dijkstra & Weighted Shortest Paths",
        "description": "Single-source shortest path on non-negative edge weights in O(E log V).",
        "difficulty": "MEDIUM",
        "conceptOverview": "Dijkstra greedily extracts the unvisited vertex with minimum distance using a priority queue, relaxing adjacent edges until all paths are optimal.",
        "keyConcepts": [
            "Distance Relaxation dist[v] > dist[u] + w",
            "Min-Heap Priority Queue (dist, node)",
            "Non-Negative Weight Constraint"
        ],
        "problemSlugs": [
            "network-delay-time",
            "bellman-ford-shortest-path",
            "floyd-warshall-all-pairs-shortest-path",
            "cheapest-flights-within-k-stops",
            "negative-cycle-detection-bellman-ford",
            "network-delay-time-dijkstra",
            "snakes-and-ladders-bfs-shortest-path"
        ]
    },
    {
        "levelNumber": 6,
        "id": "l6-bellman-ford",
        "slug": "bellman-ford-negative-weights",
        "name": "Bellman-Ford & Negative Cycle Detection",
        "description": "O(V * E) shortest path algorithm supporting negative edges and arbitrage cycles.",
        "difficulty": "HARD",
        "conceptOverview": "Bellman-Ford relaxes all E edges (V-1) times. A further relaxation on the V-th pass indicates the presence of an infinite negative weight cycle.",
        "keyConcepts": [
            "V-1 Passes of Edge Relaxation",
            "Negative Cycle Detection on V-th Pass",
            "SPFA Queue Optimization Heuristic"
        ],
        "problemSlugs": [
            "trapping-rain-water",
            "median-of-two-sorted-arrays",
            "minimum-window-substring",
            "binary-tree-maximum-path-sum",
            "merge-k-sorted-lists",
            "find-median-from-data-stream"
        ]
    },
    {
        "levelNumber": 6,
        "id": "l6-topo-sort",
        "slug": "topological-sorting-kahns",
        "name": "Topological Sort & DAG Dependency Resolution",
        "description": "Kahns in-degree BFS and DFS finish times: Course Schedule I & II.",
        "difficulty": "MEDIUM",
        "conceptOverview": "Topological sort linearly orders vertices of a Directed Acyclic Graph (DAG) such that every directed edge u -> v has u preceding v.",
        "keyConcepts": [
            "In-Degree Array & Zero In-Degree Queue",
            "Cycle Detection in Directed Graphs",
            "Course Schedule Pre-requisite Chains"
        ],
        "problemSlugs": [
            "course-schedule",
            "course-schedule-ii",
            "find-eventual-safe-states",
            "ancestors-node-dag"
        ]
    },
    {
        "levelNumber": 6,
        "id": "l6-mst",
        "slug": "minimum-spanning-tree-kruskal",
        "name": "Minimum Spanning Tree (Kruskal & Prim)",
        "description": "Connecting all vertices with minimal total edge weight in O(E log E).",
        "difficulty": "HARD",
        "conceptOverview": "Kruskal sorts edges and adds them to the spanning forest using DSU to avoid cycles. Prim expands from a single vertex using a priority queue.",
        "keyConcepts": [
            "Edge Sorting by Weight",
            "DSU Cycle Check in Kruskals Algorithm",
            "Cut Property for Minimum Spanning Trees"
        ],
        "problemSlugs": [
            "critical-and-pseudo-critical-edges-in-mst",
            "miller-rabin-primality-test"
        ]
    },
    {
        "levelNumber": 6,
        "id": "l6-bridges-tarjan",
        "slug": "tarjan-bridges-articulation",
        "name": "Tarjans Bridges & Articulation Points",
        "description": "Discovery time, low-link values, and critical connections in networks.",
        "difficulty": "HARD",
        "conceptOverview": "Tarjans DFS assigns discovery times and lowest reachable ancestors (low-link values) to find critical edges whose removal disconnects the graph.",
        "keyConcepts": [
            "Discovery Time & Low-Link Arrays",
            "Back-Edge Traversal vs Tree Edge",
            "Bridge Condition: low[v] > tin[u]"
        ],
        "problemSlugs": [
            "critical-connections-in-a-network",
            "articulation-points-in-a-graph",
            "critical-connections-bridges-graph",
            "count-2-edge-connected-components"
        ]
    },
    {
        "levelNumber": 7,
        "id": "l7-binary-search-hard",
        "slug": "binary-search-partition",
        "name": "Binary Search on Array Partitions",
        "description": "O(log(min(m, n))) binary search across partitioned sorted arrays.",
        "difficulty": "HARD",
        "conceptOverview": "Median of Two Sorted Arrays partitions both arrays such that left half and right half contain equal elements and all left elements <= right elements.",
        "keyConcepts": [
            "Partition Invariant Check",
            "Binary Search on Index Partitions",
            "Logarithmic Multi-Array Search"
        ],
        "problemSlugs": [
            "median-of-two-sorted-arrays",
            "palindrome-partitioning-iii",
            "median-two-sorted-arrays-logarithmic",
            "meet-in-the-middle-partitioning-target-sum",
            "median-of-two-sorted-arrays-logarithmic-time"
        ]
    },
    {
        "levelNumber": 7,
        "id": "l7-prime-sieve",
        "slug": "prime-sieve-eratosthenes",
        "name": "Sieve of Eratosthenes & Prime Factorization",
        "description": "Finding all primes up to N in O(N log log N) time and linear sieve.",
        "difficulty": "MEDIUM",
        "conceptOverview": "The Sieve of Eratosthenes iteratively marks multiples of each prime, computing all primes up to N with minimal operations.",
        "keyConcepts": [
            "Boolean Sieve Array",
            "Starting Multiples at i*i",
            "Smallest Prime Factor (SPF) for O(log N) Factorization"
        ],
        "problemSlugs": [
            "count-primes",
            "count-primes-sieve-eratosthenes",
            "catalan-number-modulo",
            "euler-totient-function-sum",
            "super-ugly-number",
            "sieve-of-eratosthenes-prime-counting"
        ]
    },
    {
        "levelNumber": 7,
        "id": "l7-modular-arithmetic",
        "slug": "fast-modular-exponentiation",
        "name": "Binary Exponentiation & Modular Inverses",
        "description": "Calculating (a^b) % mod in O(log b) time and Fermats Little Theorem.",
        "difficulty": "MEDIUM",
        "conceptOverview": "Binary exponentiation squares the base when the exponent is even and multiplies when odd, computing large powers in logarithmic steps.",
        "keyConcepts": [
            "Bitwise Exponent Halving",
            "Modular Multiplication Rules",
            "Fermats Little Theorem for Inverse mod Prime"
        ],
        "problemSlugs": [
            "nth-fibonacci-matrix-exponentiation",
            "modular-inverse-combinatorics-ncr",
            "super-pow-modular-exponentiation",
            "matrix-exponentiation-tribonacci",
            "reordered-power-of-2",
            "subsets-power-set-generation-via-bitmasks"
        ]
    },
    {
        "levelNumber": 7,
        "id": "l7-combinatorics",
        "slug": "combinatorics-pascal",
        "name": "Combinatorics, Permutations & Pascal Triangle",
        "description": "Combinations nCr, Catalan numbers, and grid path counting.",
        "difficulty": "MEDIUM",
        "conceptOverview": "Combinatorics calculates arrangements and selections: nCr = n! / (r! * (n-r)!). Precomputing factorials allows O(1) query time.",
        "keyConcepts": [
            "Factorial & Inverse Factorial Arrays",
            "Pascals Triangle Identity",
            "Catalan Numbers Applications"
        ],
        "problemSlugs": [
            "unique-paths",
            "non-decreasing-digits-count",
            "count-numbers-with-unique-digits",
            "modular-inverse-combinatorics-ncr",
            "catalan-number-modulo",
            "generate-parentheses-catalan-sequences"
        ]
    },
    {
        "levelNumber": 7,
        "id": "l7-game-theory",
        "slug": "game-theory-nim",
        "name": "Game Theory, Nim Sum & Sprague-Grundy",
        "description": "Impartial games, XOR Nim sums, and optimal winning strategies.",
        "difficulty": "HARD",
        "conceptOverview": "Sprague-Grundy theorem maps impartial games to Nim piles. A game position is winning if and only if the XOR sum of all pile sizes is non-zero.",
        "keyConcepts": [
            "P-positions vs N-positions",
            "XOR Nim Sum Proof",
            "Grundy Value (Mex) Computation"
        ],
        "problemSlugs": [
            "minimum-window-substring",
            "minimum-cost-to-merge-stones",
            "range-minimum-query-sparse-table",
            "min-interval-include-each-query",
            "min-taps-to-water-garden",
            "minimum-number-of-visited-cells-in-a-grid"
        ]
    },
    {
        "levelNumber": 7,
        "id": "l7-bitmask-dp",
        "slug": "bitmask-dynamic-programming",
        "name": "Bitmask DP & Traveling Salesperson",
        "description": "Subset states represented as bit vectors, Hamiltonian paths, and TSP.",
        "difficulty": "HARD",
        "conceptOverview": "Bitmask DP represents subset membership as binary integers from 0 to (2^N - 1), reducing exponential factorial permutations to O(N^2 * 2^N).",
        "keyConcepts": [
            "Bitmask State Encoding (1 << i)",
            "Submask Iteration Pattern",
            "TSP State Transition dp[mask][u]"
        ],
        "problemSlugs": [
            "shortest-superstring",
            "traveling-salesman-problem-bitmask",
            "n-queens-ii-distinct-solutions",
            "number-of-valid-words-for-each-puzzle-bitmask",
            "smallest-sufficient-team-bitmask-dp",
            "shortest-path-visiting-all-nodes-bitmask"
        ]
    }
];

  async getRoadmap(userId?: string) {
    let solvedSlugs = new Set<string>();
    if (userId) {
      const solves = await this.prisma.problemSolver.findMany({
        where: { userId },
        include: { problem: { select: { slug: true } } },
      });
      solvedSlugs = new Set(solves.map((s) => s.problem.slug));
    }

    const dbProblems = await this.prisma.problem.findMany({
      where: { isPublished: true },
      select: { id: true, title: true, slug: true, difficulty: true, points: true },
    });
    const problemMap = new Map(dbProblems.map((p) => [p.slug, p]));

    const levels: RoadmapLevel[] = this.ROADMAP_LEVELS_DEF.map((lvl) => {
      const lvlTopics = this.TOPICS_CATALOG.filter((t) => t.levelNumber === lvl.levelNumber).map((t) => {
        const matchingProblems = t.problemSlugs.map((slug) => problemMap.get(slug)).filter(Boolean);
        const solvedCount = t.problemSlugs.filter((slug) => solvedSlugs.has(slug) && problemMap.has(slug)).length;
        const total = matchingProblems.length;

        let status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' = 'NOT_STARTED';
        if (solvedCount === total && total > 0) {
          status = 'COMPLETED';
        } else if (solvedCount > 0) {
          status = 'IN_PROGRESS';
        }

        return {
          id: t.id,
          slug: t.slug,
          name: t.name,
          description: t.description,
          difficulty: t.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
          conceptOverview: t.conceptOverview,
          keyConcepts: t.keyConcepts,
          problemSlugs: matchingProblems.map((p: any) => p.slug),
          totalProblems: total,
          solvedProblems: solvedCount,
          status,
        };
      });

      return {
        levelNumber: lvl.levelNumber,
        title: lvl.title,
        subtitle: lvl.subtitle,
        description: lvl.description,
        topics: lvlTopics,
      };
    });

    const totalProblemsInRoadmap = levels.reduce(
      (sum, l) => sum + l.topics.reduce((tSum, t) => tSum + t.totalProblems, 0),
      0,
    );
    const totalSolvedInRoadmap = levels.reduce(
      (sum, l) => sum + l.topics.reduce((tSum, t) => tSum + t.solvedProblems, 0),
      0,
    );

    return {
      levels,
      summary: {
        totalLevels: levels.length,
        totalTopics: this.TOPICS_CATALOG.length,
        totalProblems: totalProblemsInRoadmap,
        solvedProblems: totalSolvedInRoadmap,
        completionPercentage:
          totalProblemsInRoadmap > 0
            ? Math.round((totalSolvedInRoadmap / totalProblemsInRoadmap) * 100)
            : 0,
      },
    };
  }

  async getCuratedSheets(userId?: string) {
    let solvedSlugs = new Set<string>();
    if (userId) {
      const solves = await this.prisma.problemSolver.findMany({
        where: { userId },
        include: { problem: { select: { slug: true } } },
      });
      solvedSlugs = new Set(solves.map((s) => s.problem.slug));
    }

    const allProblems = await this.prisma.problem.findMany({
      where: { isPublished: true },
      select: { id: true, title: true, slug: true, difficulty: true, points: true },
    });
    const problemMap = new Map(allProblems.map((p) => [p.slug, p]));

    const sheets = [
      {
        id: 'foundations-75',
        title: 'Foundations Essential 75',
        description: 'The core 75 foundational algorithmic questions essential for FAANG and high-tier engineering interviews.',
        targetCount: 75,
        difficulty: 'MIXED',
        problemSlugs: ["two-sum","reverse-a-string","valid-parentheses","binary-search","climbing-stairs","contains-duplicate","best-time-to-buy-and-sell-stock","valid-anagram","reverse-linked-list","linked-list-cycle","invert-binary-tree","binary-tree-inorder-traversal","palindrome-number","single-number","power-of-two","missing-number","majority-element","move-zeroes","valid-palindrome","first-unique-character-in-a-string","intersection-of-two-arrays","implement-queue-using-stacks","implement-stack-using-queues","fizz-buzz","counting-bits","number-of-1-bits","reverse-bits","merge-two-sorted-lists","maximum-depth-of-binary-tree","same-tree","maximum-subarray","longest-substring-without-repeating-characters","merge-intervals","number-of-islands","kth-largest-element","kth-largest-element-in-an-array","house-robber","search-in-rotated-sorted-array","container-with-most-water","3sum","word-search","coin-change","daily-temperatures","product-of-array-except-self","subarray-sum-equals-k","longest-consecutive-sequence","group-anagrams","top-k-frequent-elements","find-minimum-in-rotated-sorted-array","subsets","generate-parentheses","evaluate-reverse-polish-notation","find-peak-element","min-stack","longest-common-subsequence","longest-increasing-subsequence","unique-paths","jump-game","jump-game-ii","maximum-product-subarray","word-break","non-overlapping-intervals","lowest-common-ancestor-of-a-bst","validate-binary-search-tree","kth-smallest-element-in-a-bst","trapping-rain-water","median-of-two-sorted-arrays","minimum-window-substring","binary-tree-maximum-path-sum","merge-k-sorted-lists","find-median-from-data-stream","edit-distance","distinct-subsequences","matrix-chain-multiplication","critical-connections-in-a-network"],
      },
      {
        id: 'top-interview-150',
        title: 'Top Interview 150 Master Sheet',
        description: 'Comprehensive interview prep sheet covering arrays, strings, two pointers, stacks, dynamic programming, and binary search.',
        targetCount: 150,
        difficulty: 'MEDIUM',
        problemSlugs: ["two-sum","reverse-a-string","valid-parentheses","binary-search","climbing-stairs","contains-duplicate","best-time-to-buy-and-sell-stock","valid-anagram","reverse-linked-list","linked-list-cycle","invert-binary-tree","binary-tree-inorder-traversal","palindrome-number","single-number","power-of-two","missing-number","majority-element","move-zeroes","valid-palindrome","first-unique-character-in-a-string","intersection-of-two-arrays","implement-queue-using-stacks","implement-stack-using-queues","fizz-buzz","counting-bits","number-of-1-bits","reverse-bits","merge-two-sorted-lists","maximum-depth-of-binary-tree","same-tree","palindrome-linked-list","subtree-of-another-tree","meeting-rooms","longest-common-prefix","pascals-triangle","nim-game","diameter-of-binary-tree","fast-modular-exponentiation-binary","longest-common-prefix-trie","assign-cookies-greedy","maximum-subarray","longest-substring-without-repeating-characters","merge-intervals","number-of-islands","kth-largest-element","kth-largest-element-in-an-array","house-robber","search-in-rotated-sorted-array","container-with-most-water","3sum","word-search","coin-change","daily-temperatures","product-of-array-except-self","subarray-sum-equals-k","longest-consecutive-sequence","group-anagrams","top-k-frequent-elements","find-minimum-in-rotated-sorted-array","subsets","generate-parentheses","evaluate-reverse-polish-notation","find-peak-element","min-stack","longest-common-subsequence","longest-increasing-subsequence","unique-paths","jump-game","jump-game-ii","maximum-product-subarray","word-break","non-overlapping-intervals","lowest-common-ancestor-of-a-bst","validate-binary-search-tree","kth-smallest-element-in-a-bst","binary-tree-level-order-traversal","course-schedule","rotting-oranges","remove-nth-node-from-end-of-list","reverse-integer","decode-ways","palindromic-substrings","k-closest-points-to-origin","task-scheduler","reorder-list","surrounded-regions","pacific-atlantic-water-flow","combination-sum-iv","house-robber-ii","longest-palindromic-substring","insert-interval","meeting-rooms-ii","longest-repeating-character-replacement","permutation-in-string","find-all-anagrams-in-a-string","implement-trie-prefix-tree","construct-binary-tree-from-preorder-and-inorder-traversal","course-schedule-ii","graph-valid-tree","number-of-connected-components-in-an-undirected-graph","letter-combinations-of-a-phone-number","combination-sum","combination-sum-ii","permutations","subsets-ii","spiral-matrix","set-matrix-zeroes","rotate-image","minimum-size-subarray-sum","max-consecutive-ones-iii","redundant-connection","lru-cache","network-delay-time","range-sum-query-mutable","target-sum","coin-change-ii","longest-palindromic-subsequence","minimum-spanning-tree","is-graph-bipartite","count-primes","trapping-rain-water","median-of-two-sorted-arrays","minimum-window-substring","binary-tree-maximum-path-sum","merge-k-sorted-lists","find-median-from-data-stream","edit-distance","distinct-subsequences","matrix-chain-multiplication","critical-connections-in-a-network","largest-rectangle-in-histogram","sliding-window-maximum","word-ladder","binary-tree-cameras","serialize-and-deserialize-binary-tree","strongly-connected-components-kosaraju","articulation-points-in-a-graph","count-of-smaller-numbers-after-self","segment-tree-lazy-propagation","burst-balloons","russian-doll-envelopes","maximum-profit-in-job-scheduling","shortest-palindrome","convex-hull-graham-scan","meeting-rooms-iii","shortest-path-with-obstacles-elimination","shortest-superstring","traveling-salesman-problem-bitmask","palindrome-partitioning-iii","distinct-subsequences-ii"],
      },
      {
        id: 'graph-mastery',
        title: 'Graph Mastery Sheet',
        description: 'Comprehensive traversal, shortest paths, topological sort, MST, and network flows practice.',
        targetCount: 40,
        difficulty: 'HARD',
        problemSlugs: ["number-of-islands","invert-binary-tree","binary-tree-inorder-traversal","coin-change","maximum-depth-of-binary-tree","same-tree","lowest-common-ancestor-of-a-bst","validate-binary-search-tree","kth-smallest-element-in-a-bst","binary-tree-level-order-traversal","course-schedule","rotting-oranges","subtree-of-another-tree","surrounded-regions","pacific-atlantic-water-flow","construct-binary-tree-from-preorder-and-inorder-traversal","binary-tree-maximum-path-sum","course-schedule-ii","graph-valid-tree","number-of-connected-components-in-an-undirected-graph","redundant-connection","network-delay-time","minimum-spanning-tree","is-graph-bipartite","bellman-ford-shortest-path","floyd-warshall-all-pairs-shortest-path","critical-connections-in-a-network","all-paths-from-source-to-target","minimum-cost-to-connect-all-points","word-ladder","diameter-of-binary-tree","lowest-common-ancestor-of-a-binary-tree","path-sum-iii","binary-tree-cameras","serialize-and-deserialize-binary-tree","strongly-connected-components-kosaraju","articulation-points-in-a-graph","satisfiability-of-equality-equations","cheapest-flights-within-k-stops","house-robber-iii"],
      },
      {
        id: 'dp-mastery',
        title: 'Dynamic Programming Mastery',
        description: 'Master optimal substructure across 1D sequences, 2D grids, knapsack, and interval ranges.',
        targetCount: 45,
        difficulty: 'HARD',
        problemSlugs: ["climbing-stairs","best-time-to-buy-and-sell-stock","house-robber","coin-change","trapping-rain-water","generate-parentheses","counting-bits","longest-common-subsequence","longest-increasing-subsequence","unique-paths","jump-game","jump-game-ii","maximum-product-subarray","word-break","non-overlapping-intervals","decode-ways","palindromic-substrings","combination-sum-iv","house-robber-ii","longest-palindromic-substring","binary-tree-maximum-path-sum","edit-distance","target-sum","coin-change-ii","longest-palindromic-subsequence","pascals-triangle","0-1-knapsack-problem","longest-string-chain","distinct-subsequences","best-time-to-buy-and-sell-stock-with-cooldown","best-time-to-buy-and-sell-stock-with-transaction-fee","partition-equal-subset-sum","matrix-chain-multiplication","maximal-square","minimum-path-sum","minimum-cost-for-tickets","floyd-warshall-all-pairs-shortest-path","predict-the-winner","binary-tree-cameras","cheapest-flights-within-k-stops","burst-balloons","russian-doll-envelopes","maximum-profit-in-job-scheduling","house-robber-iii","unique-binary-search-trees"],
      },
      {
        id: 'hard-mastery-set',
        title: 'Hard Tier Algorithmic Mastery',
        description: 'Challenging problems involving binary search partitions, optimal geometry, and multi-state dynamic programming.',
        targetCount: 35,
        difficulty: 'HARD',
        problemSlugs: ["trapping-rain-water","median-of-two-sorted-arrays","minimum-window-substring","binary-tree-maximum-path-sum","merge-k-sorted-lists","find-median-from-data-stream","edit-distance","distinct-subsequences","matrix-chain-multiplication","critical-connections-in-a-network","largest-rectangle-in-histogram","sliding-window-maximum","word-ladder","binary-tree-cameras","serialize-and-deserialize-binary-tree","strongly-connected-components-kosaraju","articulation-points-in-a-graph","count-of-smaller-numbers-after-self","segment-tree-lazy-propagation","burst-balloons","russian-doll-envelopes","maximum-profit-in-job-scheduling","shortest-palindrome","convex-hull-graham-scan","meeting-rooms-iii","shortest-path-with-obstacles-elimination","shortest-superstring","traveling-salesman-problem-bitmask","palindrome-partitioning-iii","distinct-subsequences-ii","minimum-cost-to-merge-stones","allocate-mailboxes","student-attendance-record-ii","cherry-pickup-ii","eulerian-path-directed-graph"],
      },
    ];

    return sheets.map((sheet) => {
      const problems = sheet.problemSlugs
        .map((slug) => problemMap.get(slug))
        .filter(Boolean)
        .map((p: any) => ({
          ...p,
          isSolved: solvedSlugs.has(p.slug),
        }));
      const solvedCount = problems.filter((p) => p.isSolved).length;

      return {
        ...sheet,
        problems,
        availableCount: problems.length,
        totalCount: sheet.targetCount,
        solvedCount,
        progressPercent: problems.length > 0 ? Math.round((solvedCount / problems.length) * 100) : 0,
        availabilityPercent: Math.round((problems.length / sheet.targetCount) * 100),
      };
    });
  }
}
