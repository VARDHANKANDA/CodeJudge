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
    // ==========================================
    // LEVEL 1: Foundations (7 Topics)
    // ==========================================
    {
      levelNumber: 1,
      id: 'l1-complexity',
      slug: 'time-space-complexity',
      name: 'Time & Space Complexity Analysis',
      description: 'Big-O notation, logarithmic curves, amortization, and recurrence trees.',
      difficulty: 'EASY' as const,
      conceptOverview: 'Asymptotic notation characterizes algorithm scalability independently of hardware constants. Big-O represents worst-case upper bounds, Big-Omega lower bounds, and Big-Theta tight bounds.',
      keyConcepts: ['Asymptotic Dominance', 'Worst, Average & Amortized Complexity', 'Master Theorem Basics'],
      problemSlugs: [],
    },
    {
      levelNumber: 1,
      id: 'l1-arrays',
      slug: 'array-fundamentals',
      name: 'Array Fundamentals & Traversal',
      description: 'Linear array traversal, in-place modifications, and index lookup.',
      difficulty: 'EASY' as const,
      conceptOverview: 'Arrays store contiguous memory elements with O(1) random access by index. Fundamental operations involve iteration, prefix accumulation, and finding elements under target conditions.',
      keyConcepts: ['Contiguous Memory & Indexing', 'Linear Scan & Frequency Count', 'Two Sum Hash Lookup Pattern'],
      problemSlugs: ['two-sum', 'contains-duplicate', 'maximum-subarray'],
    },
    {
      levelNumber: 1,
      id: 'l1-hashing',
      slug: 'basic-hashing',
      name: 'Hash Tables & Frequency Counting',
      description: 'O(1) dictionary lookups, frequency maps, and hash sets.',
      difficulty: 'EASY' as const,
      conceptOverview: 'Hash tables map keys to values using hash functions for O(1) average lookup and insertion time. Perfect for deduplication and complement lookups.',
      keyConcepts: ['Hash Bucket Distribution', 'Set Lookup & Membership Testing', 'Frequency Map Tracking'],
      problemSlugs: ['contains-duplicate', 'valid-anagram'],
    },
    {
      levelNumber: 1,
      id: 'l1-strings',
      slug: 'string-manipulation',
      name: 'String Manipulation & Reversal',
      description: 'String mutability, character iteration, and two-pointer reversal.',
      difficulty: 'EASY' as const,
      conceptOverview: 'Strings represent sequences of characters. In many languages strings are immutable, requiring character arrays or string builders for O(N) operations.',
      keyConcepts: ['Two-Pointer String Reversal', 'ASCII/Unicode Character Mapping', 'Anagram Verification'],
      problemSlugs: ['reverse-a-string', 'valid-anagram'],
    },
    {
      levelNumber: 1,
      id: 'l1-math',
      slug: 'basic-mathematics',
      name: 'Basic Mathematics & Divisibility',
      description: 'GCD Euclidean algorithm, prime checks, and digit manipulation.',
      difficulty: 'EASY' as const,
      conceptOverview: 'Mathematical primitives underpin indexing and modular arithmetic. Euclidean algorithm finds GCD in O(log(min(a,b))) steps.',
      keyConcepts: ['Euclidean GCD Algorithm', 'Prime Factorization', 'Modular Invariants'],
      problemSlugs: [],
    },
    {
      levelNumber: 1,
      id: 'l1-recursion',
      slug: 'basic-recursion',
      name: 'Recursion & Call Stack Basics',
      description: 'Base cases, recursive call stacks, and divide-and-conquer fundamentals.',
      difficulty: 'EASY' as const,
      conceptOverview: 'Recursion solves a problem by solving smaller instances of the same problem. Every recursive function must define explicit base cases to avoid call stack overflow.',
      keyConcepts: ['Call Stack Frames', 'Base Case vs Recursive Step', 'Divide and Conquer Pattern'],
      problemSlugs: ['reverse-linked-list'],
    },
    {
      levelNumber: 1,
      id: 'l1-bit-basics',
      slug: 'bitwise-basics',
      name: 'Bit Manipulation Fundamentals',
      description: 'Bitwise AND, OR, XOR, shifts, and single number patterns.',
      difficulty: 'EASY' as const,
      conceptOverview: 'Bitwise operations execute in 1 CPU cycle. XOR has identity x ^ x = 0 and x ^ 0 = x, making it ideal for pairing problems.',
      keyConcepts: ['Bitwise Operators (&, |, ^, ~)', 'Bit Shifts (<<, >>)', 'XOR Cancellation Property'],
      problemSlugs: [],
    },

    // ==========================================
    // LEVEL 2: Core Data Structures (8 Topics)
    // ==========================================
    {
      levelNumber: 2,
      id: 'l2-linked-list',
      slug: 'singly-linked-lists',
      name: 'Singly & Doubly Linked Lists',
      description: 'Node pointers, in-place list reversal, and middle deletion.',
      difficulty: 'EASY' as const,
      conceptOverview: 'Linked lists store nodes with data and next pointers, allowing O(1) insertions/deletions given node references.',
      keyConcepts: ['Pointer Redirection', 'Sentinel Dummy Heads', 'In-Place List Inversion'],
      problemSlugs: ['reverse-linked-list'],
    },
    {
      levelNumber: 2,
      id: 'l2-fast-slow',
      slug: 'fast-and-slow-pointers',
      name: 'Floyds Fast & Slow Pointers',
      description: 'Cycle detection and middle element location in linear structures.',
      difficulty: 'EASY' as const,
      conceptOverview: 'Floyds Tortoise and Hare algorithm advances two pointers at speeds 1 and 2, detecting cycles in O(N) time and O(1) space.',
      keyConcepts: ['Cycle Detection Invariant', 'Phase 1 & Phase 2 Pointer Math', 'Middle Node Discovery'],
      problemSlugs: ['linked-list-cycle'],
    },
    {
      levelNumber: 2,
      id: 'l2-stacks',
      slug: 'stack-and-parentheses',
      name: 'Stack LIFO & Valid Syntax',
      description: 'Last-In First-Out evaluation, matching brackets, and expression validation.',
      difficulty: 'EASY' as const,
      conceptOverview: 'Stacks enforce strict LIFO semantics. They are ideal for matching nested delimiters, parsing arithmetic tokens, and monotonic range searches.',
      keyConcepts: ['LIFO Push/Pop Invariants', 'Bracket Matching using Stacks', 'Monotonic Stack Introduction'],
      problemSlugs: ['valid-parentheses'],
    },
    {
      levelNumber: 2,
      id: 'l2-queues',
      slug: 'queues-and-deques',
      name: 'Queue FIFO & Double-Ended Queues',
      description: 'First-In First-Out buffers, monotonic deques, and sliding window extrema.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'Queues maintain FIFO ordering. Double-ended queues (deques) allow O(1) insertions and deletions at both ends.',
      keyConcepts: ['FIFO Buffer Model', 'Monotonic Deque Window Tracking', 'Circular Buffer Implementation'],
      problemSlugs: [],
    },
    {
      levelNumber: 2,
      id: 'l2-trees',
      slug: 'binary-tree-traversals',
      name: 'Binary Trees & Traversals',
      description: 'Recursive and iterative Inorder, Preorder, and Postorder tree traversals.',
      difficulty: 'EASY' as const,
      conceptOverview: 'A binary tree is a non-linear hierarchical data structure where each node has at most two children. Inorder traversal on a BST yields sorted order.',
      keyConcepts: ['Recursive DFS Traversal', 'Iterative Traversal with Explicit Stack', 'Level-Order BFS Tree Structure'],
      problemSlugs: ['binary-tree-inorder-traversal', 'invert-binary-tree'],
    },
    {
      levelNumber: 2,
      id: 'l2-bst',
      slug: 'binary-search-trees',
      name: 'Binary Search Tree Operations',
      description: 'BST validation, search, insertion, and lowest common ancestor.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'A Binary Search Tree enforces the ordering property: for all nodes, left.val < node.val < right.val. Lookup, insertion, and deletion run in O(h) time.',
      keyConcepts: ['BST Invariant Range Checking', 'LCA in BST', 'Inorder Successor/Predecessor'],
      problemSlugs: [],
    },
    {
      levelNumber: 2,
      id: 'l2-heaps',
      slug: 'binary-heaps-priority-queues',
      name: 'Binary Heaps & Priority Queues',
      description: 'Min-heap, max-heap, priority queues, and kth largest elements.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'A binary heap is a complete binary tree satisfying the heap property. Min-heap root contains minimum element with O(log N) insertion and deletion.',
      keyConcepts: ['Complete Binary Tree Array Representation', 'Heapify Up & Heapify Down', 'Top-K Elements Pattern'],
      problemSlugs: ['kth-largest-element-in-an-array'],
    },
    {
      levelNumber: 2,
      id: 'l2-tree-properties',
      slug: 'tree-depth-and-symmetry',
      name: 'Tree Symmetry, Depth & Inversion',
      description: 'Maximum depth, symmetric trees, identical trees, and tree inversion.',
      difficulty: 'EASY' as const,
      conceptOverview: 'Recursive tree properties operate by decomposing a tree into left and right subtrees and combining their structural invariants.',
      keyConcepts: ['Max/Min Depth DFS', 'Mirror Subtree Symmetry', 'Post-Order Subtree Inversion'],
      problemSlugs: ['invert-binary-tree'],
    },

    // ==========================================
    // LEVEL 3: Core Algorithms (7 Topics)
    // ==========================================
    {
      levelNumber: 3,
      id: 'l3-binary-search-1d',
      slug: 'binary-search-1d',
      name: 'Binary Search on 1D Sorted Arrays',
      description: 'Standard binary search, lower bound, upper bound, and insertion position.',
      difficulty: 'EASY' as const,
      conceptOverview: 'Binary search repeatedly bisects a monotonic search interval, achieving O(log N) time with O(1) space.',
      keyConcepts: ['Midpoint Calculation Without Overflow', 'Lower & Upper Bound Invariants', 'Search Space Convergence'],
      problemSlugs: ['binary-search'],
    },
    {
      levelNumber: 3,
      id: 'l3-binary-search-rotated',
      slug: 'binary-search-rotated-array',
      name: 'Binary Search on Rotated & Pivoted Arrays',
      description: 'Finding elements in shifted monotonic sequences and finding minimum in rotated sorted arrays.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'In a rotated sorted array, at least one half across the midpoint is always strictly sorted. Identifying the sorted half allows narrowing the binary search space.',
      keyConcepts: ['Pivot Point Detection', 'Half-Sorted Invariant Testing', 'Boundary Comparison Rules'],
      problemSlugs: ['search-in-rotated-sorted-array'],
    },
    {
      levelNumber: 3,
      id: 'l3-two-pointers',
      slug: 'two-pointers-technique',
      name: 'Two Pointers & Inward Sweeping',
      description: 'Two-sum sorted, container with most water, and 3Sum triangulation.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'Two pointers sweeping inward from array boundaries leverage sorted order or bottleneck geometry to eliminate entire subsets of pairs in O(1) per step.',
      keyConcepts: ['Opposite-Direction Sweeping', 'Bottleneck Elimination Proof', 'Triplets & Duplicate Pruning'],
      problemSlugs: ['container-with-most-water', '3sum'],
    },
    {
      levelNumber: 3,
      id: 'l3-sliding-window',
      slug: 'sliding-window-strings',
      name: 'Sliding Window & Substring Optimization',
      description: 'Dynamic and fixed window patterns for longest substrings and subarray sums.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'Sliding window maintains two pointers (left and right) representing a valid subarray/substring, expanding right and contracting left whenever constraints are violated.',
      keyConcepts: ['Variable Window Expansion', 'Hash Map Window State', 'O(N) Amortized Time Complexity'],
      problemSlugs: ['longest-substring-without-repeating-characters'],
    },
    {
      levelNumber: 3,
      id: 'l3-prefix-sum',
      slug: 'prefix-sum-techniques',
      name: 'Prefix Sum & Subarray Sums',
      description: 'Range sum queries, difference arrays, and subarray sum equals K.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'Prefix sums precompute cumulative sums in O(N) time, answering arbitrary subarray range queries in O(1) time: sum(i..j) = prefix[j+1] - prefix[i].',
      keyConcepts: ['Cumulative Sum Array', 'Hash Map + Prefix Sum for Subarray Target', 'Difference Array Range Updates'],
      problemSlugs: [],
    },
    {
      levelNumber: 3,
      id: 'l3-intervals',
      slug: 'intervals-and-sorting',
      name: 'Interval Merging & Sorting',
      description: 'Interval scheduling, sorting by start time, and merging overlapping ranges.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'Interval problems sort elements by starting point O(N log N) and scan linearly, checking if current start <= previous end.',
      keyConcepts: ['Start Time Sorting Invariant', 'Greedy Interval Overlap Merging', 'Active Interval Tracking'],
      problemSlugs: ['merge-intervals'],
    },
    {
      levelNumber: 3,
      id: 'l3-greedy-stock',
      slug: 'greedy-stock-trading',
      name: 'Greedy Single-Pass Optimization',
      description: 'Best time to buy/sell stock, jump game, and gas station greedy paths.',
      difficulty: 'EASY' as const,
      conceptOverview: 'Greedy algorithms make the locally optimal choice at each step with the hope of finding a global optimum.',
      keyConcepts: ['Running Minimum Price Tracking', 'Local vs Global Optima', 'Single Pass State Transitions'],
      problemSlugs: ['best-time-to-buy-and-sell-stock'],
    },

    // ==========================================
    // LEVEL 4: Advanced Structures (5 Topics)
    // ==========================================
    {
      levelNumber: 4,
      id: 'l4-two-pointer-hard',
      slug: 'two-pointer-trapping',
      name: 'Two-Pointer Elevation & Trapping',
      description: 'Bidirectional two-pointer scanning for geometric and water trapping problems.',
      difficulty: 'HARD' as const,
      conceptOverview: 'Trapping Rain Water uses two pointers moving from both extremes, maintaining leftMax and rightMax to calculate trapped volume in O(N) time and O(1) auxiliary space.',
      keyConcepts: ['Bidirectional Bounding Maxima', 'Bottleneck Principle', 'O(1) Space Optimization'],
      problemSlugs: ['trapping-rain-water'],
    },
    {
      levelNumber: 4,
      id: 'l4-dsu',
      slug: 'disjoint-set-union',
      name: 'Disjoint Set Union (DSU / Union-Find)',
      description: 'Path compression, union by rank, and dynamic graph connectivity.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'DSU maintains a collection of disjoint sets with near-O(1) amortized operations using path compression and union by rank (inverse Ackermann function).',
      keyConcepts: ['Path Compression in Find', 'Union by Rank / Size', 'Cycle Detection in Undirected Graphs'],
      problemSlugs: [],
    },
    {
      levelNumber: 4,
      id: 'l4-trie',
      slug: 'trie-prefix-tree',
      name: 'Trie Prefix Trees & Autocomplete',
      description: 'Prefix matching, dictionary storage, and word search optimizations.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'A Trie is a tree where each node represents a character of a string. Lookup and insertion run in O(L) time where L is word length.',
      keyConcepts: ['Node Children Character Map', 'End-of-Word Flag Invariant', 'Prefix Matching Traversal'],
      problemSlugs: [],
    },
    {
      levelNumber: 4,
      id: 'l4-mono-stack',
      slug: 'monotonic-stack-patterns',
      name: 'Monotonic Stack & Next Greater Element',
      description: 'Next greater element, largest rectangle in histogram, and stock span.',
      difficulty: 'HARD' as const,
      conceptOverview: 'A monotonic stack maintains elements in strictly increasing or decreasing order, solving nearest smaller/greater queries in linear O(N) time.',
      keyConcepts: ['Strict Monotonicity Invariants', 'Immediate Boundary Determination', 'Histogram Area Optimization'],
      problemSlugs: [],
    },
    {
      levelNumber: 4,
      id: 'l4-tree-lca',
      slug: 'tree-lca-and-diameter',
      name: 'Lowest Common Ancestor & Tree Diameter',
      description: 'LCA in binary trees, tree paths, and maximum path sums.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'Post-order DFS computes subtree information (heights, paths) bottom-up, enabling LCA discovery and tree diameter computation in O(N) time.',
      keyConcepts: ['Post-Order Bottom-Up Aggregation', 'LCA Boundary Propagation', 'Tree Path Splitting Point'],
      problemSlugs: [],
    },

    // ==========================================
    // LEVEL 5: Dynamic Programming (6 Topics)
    // ==========================================
    {
      levelNumber: 5,
      id: 'l5-dp-1d-fib',
      slug: 'dp-1d-fibonacci',
      name: '1D Dynamic Programming & State Optimization',
      description: 'Climbing stairs, Fibonacci sequences, and space optimization.',
      difficulty: 'EASY' as const,
      conceptOverview: '1D DP solves sequential recurrence relations. Storing only the preceding two states reduces memory from O(N) to O(1).',
      keyConcepts: ['Recurrence dp[i] = dp[i-1] + dp[i-2]', 'Base Case Initialization', 'Rolling Variable Space Optimization'],
      problemSlugs: ['climbing-stairs'],
    },
    {
      levelNumber: 5,
      id: 'l5-dp-1d-non-adj',
      slug: 'dp-house-robber',
      name: '1D DP on Non-Adjacent Elements',
      description: 'House robber, maximum non-adjacent subarray sums, and state decisions.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'State decision DP evaluates binary choices at each index (rob vs skip): dp[i] = max(dp[i-1], dp[i-2] + val).',
      keyConcepts: ['State Transition Selection', 'Two-State Rolling Variable Memory', 'Optimal Substructure Proof'],
      problemSlugs: ['house-robber'],
    },
    {
      levelNumber: 5,
      id: 'l5-dp-coin-change',
      slug: 'dp-coin-change',
      name: 'Unbounded Knapsack & Coin Change',
      description: 'Bottom-up tabulation, coin change minimization, and combination counts.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'Unbounded knapsack problems allow taking infinite copies of items: dp[amount] = min(dp[amount], dp[amount - coin] + 1).',
      keyConcepts: ['Target Amount Tabulation Table', 'Infinite Item Reuse Invariant', 'Unreachable State Initialization (inf)'],
      problemSlugs: ['coin-change'],
    },
    {
      levelNumber: 5,
      id: 'l5-dp-grid',
      slug: 'dp-2d-grid-paths',
      name: '2D Grid DP & Minimum Path Sum',
      description: 'Unique paths in matrix grids, obstacle navigation, and path sum minimization.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: '2D DP computes path costs across grid coordinates: dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1]).',
      keyConcepts: ['Boundary Row/Col Initialization', 'Top-Left to Bottom-Right Transitions', 'Single Row Memory Compression'],
      problemSlugs: [],
    },
    {
      levelNumber: 5,
      id: 'l5-dp-strings',
      slug: 'dp-lcs-edit-distance',
      name: 'Longest Common Subsequence & Edit Distance',
      description: 'LCS, shortest common supersequence, and string transformation distances.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'String DP compares prefixes of two strings: dp[i][j] evaluates character matches and minimum insertions/deletions/replacements.',
      keyConcepts: ['2D Prefix Substring Matrix', 'Match vs Mismatch Transitions', 'Reconstruction of Optimal Sequence'],
      problemSlugs: [],
    },
    {
      levelNumber: 5,
      id: 'l5-dp-subarrays',
      slug: 'dp-kadanes-algorithm',
      name: 'Kadanes Algorithm & Max Subarray',
      description: 'Maximum contiguous subarray sum in single pass O(N) time.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'Kadanes algorithm computes max contiguous subarray sum by deciding whether to extend current sum or start a new subarray at each element.',
      keyConcepts: ['Local Max vs Global Max', 'Negative Prefix Reset', 'O(1) Auxiliary Memory'],
      problemSlugs: ['maximum-subarray'],
    },

    // ==========================================
    // LEVEL 6: Advanced Graph Algorithms (6 Topics)
    // ==========================================
    {
      levelNumber: 6,
      id: 'l6-graphs-islands',
      slug: 'graph-connected-components',
      name: 'Connected Components & Flood Fill',
      description: 'Number of islands, flood fill, and grid connected component counting.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'Grid BFS/DFS treats 2D arrays as implicit graphs with 4-directional edges, discovering connected components in linear O(M*N) time.',
      keyConcepts: ['In-Place Matrix Sinking / Visited Mask', '4-Directional Cardinal Traversal', 'Recursion Call Stack Bounds'],
      problemSlugs: ['number-of-islands'],
    },
    {
      levelNumber: 6,
      id: 'l6-graphs-backtrack',
      slug: 'backtracking-word-search',
      name: 'Backtracking & Matrix DFS Exploration',
      description: 'Word search, N-Queens, Sudoku solver, and path exploration.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'Backtracking explores potential solutions recursively and unwinds (backtracks) state modifications when constraints are violated.',
      keyConcepts: ['In-Place Masking and Unmasking', 'Pruning Infeasible Subtrees', 'Depth-Bound Recursion'],
      problemSlugs: ['word-search'],
    },
    {
      levelNumber: 6,
      id: 'l6-graphs-topo',
      slug: 'topological-sorting',
      name: 'Topological Sort & Dependency Resolution',
      description: 'Kahns in-degree BFS, course schedule cycle detection, and DAG linear ordering.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'Topological sort linearizes directed acyclic graphs such that for every directed edge u -> v, u appears before v. Cycles are detected when processed vertices < total vertices.',
      keyConcepts: ['In-Degree Array Computation', 'Zero-In-Degree Queue Ingestion', 'Cycle Detection via Incomplete Topo Sort'],
      problemSlugs: [],
    },
    {
      levelNumber: 6,
      id: 'l6-graphs-dijkstra',
      slug: 'dijkstra-shortest-path',
      name: 'Dijkstra Shortest Path with Min-Heap',
      description: 'Single-source shortest paths on non-negative weighted graphs in O((V + E) log V).',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'Dijkstras greedy algorithm extracts minimum distance vertex from priority queue and relaxes outgoing edges.',
      keyConcepts: ['Distance Table Initialization (inf)', 'Priority Queue Relaxation Step', 'Non-Negative Edge Weight Invariant'],
      problemSlugs: [],
    },
    {
      levelNumber: 6,
      id: 'l6-graphs-mst',
      slug: 'minimum-spanning-tree',
      name: 'Minimum Spanning Trees (Kruskal & Prim)',
      description: 'Kruskal with DSU edge sorting and Prims cut-set algorithm.',
      difficulty: 'HARD' as const,
      conceptOverview: 'A Minimum Spanning Tree connects all V vertices with V-1 edges of minimum total weight without creating cycles.',
      keyConcepts: ['Edge Sorting by Weight', 'DSU Cycle Prevention in Kruskal', 'Cut-Property Verification'],
      problemSlugs: [],
    },
    {
      levelNumber: 6,
      id: 'l6-graphs-bridges',
      slug: 'tarjan-bridges-articulation',
      name: 'Tarjans Bridges & Articulation Points',
      description: 'Discovery time, low-link values, and critical connections in networks.',
      difficulty: 'HARD' as const,
      conceptOverview: 'Tarjans DFS assigns discovery times and lowest reachable ancestors (low-link values) to find critical edges whose removal disconnects the graph.',
      keyConcepts: ['Discovery Time & Low-Link Arrays', 'Back-Edge Traversal vs Tree Edge', 'Bridge Condition: low[v] > tin[u]'],
      problemSlugs: [],
    },

    // ==========================================
    // LEVEL 7: Competitive Programming & Math (6 Topics)
    // ==========================================
    {
      levelNumber: 7,
      id: 'l7-binary-search-hard',
      slug: 'binary-search-partition',
      name: 'Binary Search on Array Partitions',
      description: 'O(log(min(m, n))) binary search across partitioned sorted arrays.',
      difficulty: 'HARD' as const,
      conceptOverview: 'Median of Two Sorted Arrays partitions both arrays such that left half and right half contain equal elements and all left elements <= right elements.',
      keyConcepts: ['Partition Invariant Check', 'Binary Search on Index Partitions', 'Logarithmic Multi-Array Search'],
      problemSlugs: ['median-of-two-sorted-arrays'],
    },
    {
      levelNumber: 7,
      id: 'l7-prime-sieve',
      slug: 'prime-sieve-eratosthenes',
      name: 'Sieve of Eratosthenes & Prime Factorization',
      description: 'Finding all primes up to N in O(N log log N) time and linear sieve.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'The Sieve of Eratosthenes iteratively marks multiples of each prime, computing all primes up to N with minimal operations.',
      keyConcepts: ['Boolean Sieve Array', 'Starting Multiples at i*i', 'Smallest Prime Factor (SPF) for O(log N) Factorization'],
      problemSlugs: [],
    },
    {
      levelNumber: 7,
      id: 'l7-modular-arithmetic',
      slug: 'fast-modular-exponentiation',
      name: 'Binary Exponentiation & Modular Inverses',
      description: 'Calculating (a^b) % mod in O(log b) time and Fermats Little Theorem.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'Binary exponentiation squares the base when the exponent is even and multiplies when odd, computing large powers in logarithmic steps.',
      keyConcepts: ['Bitwise Exponent Halving', 'Modular Multiplication Rules', 'Fermats Little Theorem for Inverse mod Prime'],
      problemSlugs: [],
    },
    {
      levelNumber: 7,
      id: 'l7-combinatorics',
      slug: 'combinatorics-pascal',
      name: 'Combinatorics, Permutations & Pascal Triangle',
      description: 'Combinations nCr, Catalan numbers, and grid path counting.',
      difficulty: 'MEDIUM' as const,
      conceptOverview: 'Combinatorics calculates arrangements and selections: nCr = n! / (r! * (n-r)!). Precomputing factorials allows O(1) query time.',
      keyConcepts: ['Factorial & Inverse Factorial Arrays', 'Pascals Triangle Identity', 'Catalan Numbers Applications'],
      problemSlugs: [],
    },
    {
      levelNumber: 7,
      id: 'l7-game-theory',
      slug: 'game-theory-nim',
      name: 'Game Theory, Nim Sum & Sprague-Grundy',
      description: 'Impartial games, XOR Nim sums, and optimal winning strategies.',
      difficulty: 'HARD' as const,
      conceptOverview: 'Sprague-Grundy theorem maps impartial games to Nim piles. A game position is winning if and only if the XOR sum of all pile sizes is non-zero.',
      keyConcepts: ['P-positions vs N-positions', 'XOR Nim Sum Proof', 'Grundy Value (Mex) Computation'],
      problemSlugs: [],
    },
    {
      levelNumber: 7,
      id: 'l7-bitmask-dp',
      slug: 'bitmask-dynamic-programming',
      name: 'Bitmask DP & Traveling Salesperson',
      description: 'Subset states represented as bit vectors, Hamiltonian paths, and TSP.',
      difficulty: 'HARD' as const,
      conceptOverview: 'Bitmask DP represents subset membership as binary integers from 0 to (2^N - 1), reducing exponential factorial permutations to O(N^2 * 2^N).',
      keyConcepts: ['Bitmask State Encoding (1 << i)', 'Submask Iteration Pattern', 'TSP State Transition dp[mask][u]'],
      problemSlugs: [],
    },
  ];

  async getRoadmap(userId?: string) {
    // Fetch user solves if userId provided
    let solvedSlugs = new Set<string>();
    if (userId) {
      const solves = await this.prisma.problemSolver.findMany({
        where: { userId },
        include: { problem: { select: { slug: true } } },
      });
      solvedSlugs = new Set(solves.map((s) => s.problem.slug));
    }

    // Fetch all published problems from DB
    const dbProblems = await this.prisma.problem.findMany({
      where: { isPublished: true },
      select: { id: true, title: true, slug: true, difficulty: true, points: true },
    });
    const problemMap = new Map(dbProblems.map((p) => [p.slug, p]));

    const levels: RoadmapLevel[] = this.ROADMAP_LEVELS_DEF.map((lvl) => {
      const lvlTopics = this.TOPICS_CATALOG.filter((t) => t.levelNumber === lvl.levelNumber).map((t) => {
        // Only count real problems that exist in the database
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
          difficulty: t.difficulty,
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
        problemSlugs: [
          'two-sum',
          'contains-duplicate',
          'best-time-to-buy-and-sell-stock',
          'valid-anagram',
          'valid-parentheses',
          'maximum-subarray',
          'reverse-linked-list',
          'linked-list-cycle',
          'invert-binary-tree',
          'binary-search',
          'search-in-rotated-sorted-array',
          '3sum',
          'container-with-most-water',
          'climbing-stairs',
          'house-robber',
          'coin-change',
          'number-of-islands',
          'longest-substring-without-repeating-characters',
          'merge-intervals',
          'kth-largest-element-in-an-array',
          'word-search',
          'trapping-rain-water',
          'median-of-two-sorted-arrays',
          'reverse-a-string',
          'binary-tree-inorder-traversal',
        ],
      },
      {
        id: 'top-interview-150',
        title: 'Top Interview 150 Master Sheet',
        description: 'Comprehensive interview prep sheet covering arrays, strings, two pointers, stacks, dynamic programming, and binary search.',
        targetCount: 150,
        difficulty: 'MEDIUM',
        problemSlugs: [
          'two-sum',
          'contains-duplicate',
          'best-time-to-buy-and-sell-stock',
          'valid-parentheses',
          'maximum-subarray',
          'reverse-linked-list',
          'binary-search',
          'search-in-rotated-sorted-array',
          '3sum',
          'container-with-most-water',
          'climbing-stairs',
          'house-robber',
          'coin-change',
          'longest-substring-without-repeating-characters',
          'merge-intervals',
          'kth-largest-element-in-an-array',
          'number-of-islands',
          'word-search',
        ],
      },
      {
        id: 'hard-mastery-set',
        title: 'Hard Tier Algorithmic Mastery',
        description: 'Challenging problems involving binary search partitions, optimal geometry, and multi-state dynamic programming.',
        targetCount: 25,
        difficulty: 'HARD',
        problemSlugs: ['trapping-rain-water', 'median-of-two-sorted-arrays'],
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
