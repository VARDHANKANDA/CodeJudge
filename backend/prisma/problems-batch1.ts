import { Difficulty, QualityStatus } from '@prisma/client';

export const batch1ProblemDefs = [
  // 1. Binary Search
  {
    title: 'Binary Search',
    slug: 'binary-search',
    description: `Given a sorted array of distinct integers \`nums\` in ascending order and an integer target \`target\`, write a function to search for \`target\` in \`nums\`.

If \`target\` exists in the array, return its 0-based index. Otherwise, return \`-1\`.

You must write an algorithm with **O(log n)** runtime complexity.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- 1 <= nums.length <= 10^5\n- -10^4 <= nums[i], target <= 10^4\n- All integers in \`nums\` are unique and strictly sorted in ascending order.`,
    inputFormat: `Line 1: Comma-separated integers representing the sorted array \`nums\`.\nLine 2: An integer representing \`target\`.`,
    outputFormat: `An integer representing the 0-based index of target, or \`-1\` if target is not present.`,
    sampleInput: `-1,0,3,5,9,12\n9`,
    sampleOutput: `4`,
    points: 100,
    hints: [
      'Since the array is sorted, comparing the middle element with target eliminates half the remaining elements.',
      'Maintain two pointers: left = 0 and right = n - 1. Calculate mid = left + (right - left) // 2 to avoid integer overflow.',
      'If nums[mid] == target, return mid. If nums[mid] < target, search the right half (left = mid + 1); otherwise search the left half (right = mid - 1).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
    target = int(lines[1].strip())
    
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            print(mid)
            return
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    print(-1)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const nums = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const target = parseInt(lines[1].trim(), 10);
    
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            console.log(mid);
            return;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    console.log(-1);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

int main() {
    string line1, line2;
    if (!getline(cin, line1) || !getline(cin, line2)) return 0;
    stringstream ss(line1);
    string token;
    vector<int> nums;
    while (getline(ss, token, ',')) {
        if (!token.empty()) nums.push_back(stoi(token));
    }
    int target = stoi(line2);
    
    int left = 0, right = (int)nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            cout << mid << endl;
            return 0;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    cout << -1 << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line1 = reader.readLine();
        String line2 = reader.readLine();
        if (line1 == null || line2 == null) return;
        
        String[] parts = line1.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());
        int target = Integer.parseInt(line2.trim());
        
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                System.out.println(mid);
                return;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        System.out.println(-1);
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
    target = int(lines[1].strip())
    
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            print(mid)
            return
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    print(-1)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const nums = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const target = parseInt(lines[1].trim(), 10);
    
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            console.log(mid);
            return;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    console.log(-1);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

int main() {
    string line1, line2;
    if (!getline(cin, line1) || !getline(cin, line2)) return 0;
    stringstream ss(line1);
    string token;
    vector<int> nums;
    while (getline(ss, token, ',')) {
        if (!token.empty()) nums.push_back(stoi(token));
    }
    int target = stoi(line2);
    
    int left = 0, right = (int)nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            cout << mid << endl;
            return 0;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    cout << -1 << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line1 = reader.readLine();
        String line2 = reader.readLine();
        if (line1 == null || line2 == null) return;
        
        String[] parts = line1.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());
        int target = Integer.parseInt(line2.trim());
        
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                System.out.println(mid);
                return;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        System.out.println(-1);
    }
}
`,
    },
    editorial: {
      approach: 'Iterative Two-Pointer Binary Search on Ordered Space',
      algorithm: 'Initialize left and right search boundaries. At each iteration, bisect the active interval by finding the midpoint. Compare the middle element with the target: if equal, return the index; if smaller, discard the left half; if larger, discard the right half. Terminate when boundaries cross.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      content: 'Binary Search operates by halving the search space in each step, guaranteeing O(log n) time complexity. Using `left + (right - left) / 2` avoids potential 32-bit integer overflow.',
      referenceCode: `def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    },
    tags: ['Binary Search', 'Array'],
    testCases: [
      { input: '-1,0,3,5,9,12\n9', expectedOutput: '4', isHidden: false },
      { input: '-1,0,3,5,9,12\n2', expectedOutput: '-1', isHidden: false },
      { input: '5\n5', expectedOutput: '0', isHidden: false },
      { input: '1,2,3,4,5,6,7,8,9,10\n1', expectedOutput: '0', isHidden: true },
      { input: '1,2,3,4,5,6,7,8,9,10\n10', expectedOutput: '9', isHidden: true },
      { input: '10,20,30\n100', expectedOutput: '-1', isHidden: true },
    ],
  },

  // 2. Contains Duplicate
  {
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- 1 <= nums.length <= 10^5\n- -10^9 <= nums[i] <= 10^9`,
    inputFormat: `Line 1: Comma-separated integers representing the array \`nums\`.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `1,2,3,1`,
    sampleOutput: `true`,
    points: 100,
    hints: [
      'A hash set provides O(1) average lookup and insertion time.',
      'Iterate through the array and insert each element into a hash set. If an element is already present, a duplicate is found.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print("false")
        return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    seen = set()
    for num in nums:
        if num in seen:
            print("true")
            return
        seen.add(num)
    print("false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log("false"); return; }
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) {
            console.log("true");
            return;
        }
        seen.add(num);
    }
    console.log("false");
}

solve();
`,
      cpp: `#include <iostream>
#include <sstream>
#include <unordered_set>
using namespace std;

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) {
        cout << "false" << endl;
        return 0;
    }
    stringstream ss(line);
    string token;
    unordered_set<int> seen;
    while (getline(ss, token, ',')) {
        if (!token.empty()) {
            int num = stoi(token);
            if (seen.count(num)) {
                cout << "true" << endl;
                return 0;
            }
            seen.insert(num);
        }
    }
    cout << "false" << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("false");
            return;
        }
        String[] parts = line.split(",");
        Set<Integer> seen = new HashSet<>();
        for (String p : parts) {
            int num = Integer.parseInt(p.trim());
            if (seen.contains(num)) {
                System.out.println("true");
                return;
            }
            seen.add(num);
        }
        System.out.println("false");
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print("false")
        return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    seen = set()
    for num in nums:
        if num in seen:
            print("true")
            return
        seen.add(num)
    print("false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log("false"); return; }
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) {
            console.log("true");
            return;
        }
        seen.add(num);
    }
    console.log("false");
}

solve();
`,
      cpp: `#include <iostream>
#include <sstream>
#include <unordered_set>
using namespace std;

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) {
        cout << "false" << endl;
        return 0;
    }
    stringstream ss(line);
    string token;
    unordered_set<int> seen;
    while (getline(ss, token, ',')) {
        if (!token.empty()) {
            int num = stoi(token);
            if (seen.count(num)) {
                cout << "true" << endl;
                return 0;
            }
            seen.insert(num);
        }
    }
    cout << "false" << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("false");
            return;
        }
        String[] parts = line.split(",");
        Set<Integer> seen = new HashSet<>();
        for (String p : parts) {
            int num = Integer.parseInt(p.trim());
            if (seen.contains(num)) {
                System.out.println("true");
                return;
            }
            seen.add(num);
        }
        System.out.println("false");
    }
}
`,
    },
    editorial: {
      approach: 'Hash Set Lookup in Single Linear Scan',
      algorithm: 'Maintain a hash set of observed numbers while scanning through the array. For each element, query the set in O(1) time. If present, immediately return true. If the iteration finishes without finding any duplicate, return false.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      content: 'A hash set allows O(1) membership testing, leading to an optimal O(n) linear scan with O(n) auxiliary space.',
      referenceCode: `def contains_duplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:
            return True
        seen.add(x)
    return False`,
    },
    tags: ['Array', 'Hash Table'],
    testCases: [
      { input: '1,2,3,1', expectedOutput: 'true', isHidden: false },
      { input: '1,2,3,4', expectedOutput: 'false', isHidden: false },
      { input: '1,1,1,3,3,4,3,2,4,2', expectedOutput: 'true', isHidden: false },
      { input: '42', expectedOutput: 'false', isHidden: true },
      { input: '-5,-4,-3,-2,-1,0,1,2,3,4,-5', expectedOutput: 'true', isHidden: true },
    ],
  },

  // 3. Best Time to Buy and Sell Stock
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`-th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- 1 <= prices.length <= 10^5\n- 0 <= prices[i] <= 10^4`,
    inputFormat: `Line 1: Comma-separated integers representing \`prices\`.`,
    outputFormat: `An integer representing the maximum profit.`,
    sampleInput: `7,1,5,3,6,4`,
    sampleOutput: `5`,
    points: 100,
    hints: [
      'Track the minimum buying price seen so far as you iterate from left to right.',
      'For each day, the potential profit is prices[i] - min_price. Update max_profit accordingly.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print(0)
        return
    prices = [int(x.strip()) for x in line.split(',') if x.strip()]
    min_price = float('inf')
    max_profit = 0
    for p in prices:
        if p < min_price:
            min_price = p
        elif p - min_price > max_profit:
            max_profit = p - min_price
    print(max_profit)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(0); return; }
    const prices = line.split(',').map(x => parseInt(x.trim(), 10));
    let minPrice = Infinity;
    let maxProfit = 0;
    for (const p of prices) {
        if (p < minPrice) minPrice = p;
        else if (p - minPrice > maxProfit) maxProfit = p - minPrice;
    }
    console.log(maxProfit);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) { cout << 0 << endl; return 0; }
    stringstream ss(line);
    string token;
    vector<int> prices;
    while (getline(ss, token, ',')) {
        if (!token.empty()) prices.push_back(stoi(token));
    }
    int minPrice = 1e9, maxProfit = 0;
    for (int p : prices) {
        if (p < minPrice) minPrice = p;
        else maxProfit = max(maxProfit, p - minPrice);
    }
    cout << maxProfit << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) { System.out.println(0); return; }
        String[] parts = line.split(",");
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (String p : parts) {
            int price = Integer.parseInt(p.trim());
            if (price < minPrice) minPrice = price;
            else if (price - minPrice > maxProfit) maxProfit = price - minPrice;
        }
        System.out.println(maxProfit);
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print(0)
        return
    prices = [int(x.strip()) for x in line.split(',') if x.strip()]
    min_price = float('inf')
    max_profit = 0
    for p in prices:
        if p < min_price:
            min_price = p
        elif p - min_price > max_profit:
            max_profit = p - min_price
    print(max_profit)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(0); return; }
    const prices = line.split(',').map(x => parseInt(x.trim(), 10));
    let minPrice = Infinity;
    let maxProfit = 0;
    for (const p of prices) {
        if (p < minPrice) minPrice = p;
        else if (p - minPrice > maxProfit) maxProfit = p - minPrice;
    }
    console.log(maxProfit);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) { cout << 0 << endl; return 0; }
    stringstream ss(line);
    string token;
    vector<int> prices;
    while (getline(ss, token, ',')) {
        if (!token.empty()) prices.push_back(stoi(token));
    }
    int minPrice = 1e9, maxProfit = 0;
    for (int p : prices) {
        if (p < minPrice) minPrice = p;
        else maxProfit = max(maxProfit, p - minPrice);
    }
    cout << maxProfit << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) { System.out.println(0); return; }
        String[] parts = line.split(",");
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (String p : parts) {
            int price = Integer.parseInt(p.trim());
            if (price < minPrice) minPrice = price;
            else if (price - minPrice > maxProfit) maxProfit = price - minPrice;
        }
        System.out.println(maxProfit);
    }
}
`,
    },
    editorial: {
      approach: 'Single-Pass Greedy Running Minimum Tracking',
      algorithm: 'Iterate through prices while keeping track of the minimum purchase price encountered so far. At each day, calculate the profit if sold today (`price - minPrice`) and update maxProfit.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'A single linear traversal with two scalar state variables achieves optimal O(n) time and O(1) space.',
      referenceCode: `def max_profit(prices):
    min_p, max_prof = float('inf'), 0
    for p in prices:
        min_p = min(min_p, p)
        max_prof = max(max_prof, p - min_p)
    return max_prof`,
    },
    tags: ['Array', 'Greedy', 'Dynamic Programming'],
    testCases: [
      { input: '7,1,5,3,6,4', expectedOutput: '5', isHidden: false },
      { input: '7,6,4,3,1', expectedOutput: '0', isHidden: false },
      { input: '1,2', expectedOutput: '1', isHidden: false },
      { input: '3', expectedOutput: '0', isHidden: true },
      { input: '2,4,1,7', expectedOutput: '6', isHidden: true },
    ],
  },

  // 4. Valid Anagram
  {
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- 1 <= s.length, t.length <= 5 * 10^4\n- \`s\` and \`t\` consist of lowercase English letters.`,
    inputFormat: `Line 1: String \`s\`.\nLine 2: String \`t\`.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `anagram\nnagaram`,
    sampleOutput: `true`,
    points: 100,
    hints: [
      'If lengths of s and t differ, they cannot be anagrams.',
      'Count character frequencies of s and subtract character frequencies of t. If all counts are zero, they are anagrams.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    s, t = lines[0].strip(), lines[1].strip()
    if len(s) != len(t):
        print("false")
        return
    count = {}
    for ch in s:
        count[ch] = count.get(ch, 0) + 1
    for ch in t:
        count[ch] = count.get(ch, 0) - 1
        if count[ch] < 0:
            print("false")
            return
    print("true")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const s = lines[0].trim(), t = lines[1].trim();
    if (s.length !== t.length) { console.log("false"); return; }
    const freq = {};
    for (const c of s) freq[c] = (freq[c] || 0) + 1;
    for (const c of t) {
        if (!freq[c]) { console.log("false"); return; }
        freq[c]--;
    }
    console.log("true");
}

solve();
`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string s, t;
    if (!getline(cin, s) || !getline(cin, t)) return 0;
    if (s.length() != t.length()) { cout << "false" << endl; return 0; }
    vector<int> count(26, 0);
    for (char c : s) count[c - 'a']++;
    for (char c : t) {
        count[c - 'a']--;
        if (count[c - 'a'] < 0) { cout << "false" << endl; return 0; }
    }
    cout << "true" << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String s = reader.readLine();
        String t = reader.readLine();
        if (s == null || t == null || s.length() != t.length()) {
            System.out.println("false");
            return;
        }
        int[] counts = new int[26];
        for (char c : s.toCharArray()) counts[c - 'a']++;
        for (char c : t.toCharArray()) {
            counts[c - 'a']--;
            if (counts[c - 'a'] < 0) {
                System.out.println("false");
                return;
            }
        }
        System.out.println("true");
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    s, t = lines[0].strip(), lines[1].strip()
    if len(s) != len(t):
        print("false")
        return
    count = {}
    for ch in s:
        count[ch] = count.get(ch, 0) + 1
    for ch in t:
        count[ch] = count.get(ch, 0) - 1
        if count[ch] < 0:
            print("false")
            return
    print("true")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const s = lines[0].trim(), t = lines[1].trim();
    if (s.length !== t.length) { console.log("false"); return; }
    const freq = {};
    for (const c of s) freq[c] = (freq[c] || 0) + 1;
    for (const c of t) {
        if (!freq[c]) { console.log("false"); return; }
        freq[c]--;
    }
    console.log("true");
}

solve();
`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string s, t;
    if (!getline(cin, s) || !getline(cin, t)) return 0;
    if (s.length() != t.length()) { cout << "false" << endl; return 0; }
    vector<int> count(26, 0);
    for (char c : s) count[c - 'a']++;
    for (char c : t) {
        count[c - 'a']--;
        if (count[c - 'a'] < 0) { cout << "false" << endl; return 0; }
    }
    cout << "true" << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String s = reader.readLine();
        String t = reader.readLine();
        if (s == null || t == null || s.length() != t.length()) {
            System.out.println("false");
            return;
        }
        int[] counts = new int[26];
        for (char c : s.toCharArray()) counts[c - 'a']++;
        for (char c : t.toCharArray()) {
            counts[c - 'a']--;
            if (counts[c - 'a'] < 0) {
                System.out.println("false");
                return;
            }
        }
        System.out.println("true");
    }
}
`,
    },
    editorial: {
      approach: 'Frequency Counter Array for Constant Alphabet',
      algorithm: 'First check if lengths match; if not, return false. Initialize an array of size 26. Increment counts for characters in s and decrement for characters in t. If any count drops below zero, return false.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'Since the alphabet size is constant (26 lowercase English letters), the auxiliary frequency table uses O(1) space.',
      referenceCode: `def is_anagram(s, t):
    if len(s) != len(t): return False
    count = [0] * 26
    for c1, c2 in zip(s, t):
        count[ord(c1) - ord('a')] += 1
        count[ord(c2) - ord('a')] -= 1
    return all(x == 0 for x in count)`,
    },
    tags: ['String', 'Hash Table', 'Sorting'],
    testCases: [
      { input: 'anagram\nnagaram', expectedOutput: 'true', isHidden: false },
      { input: 'rat\ncar', expectedOutput: 'false', isHidden: false },
      { input: 'a\na', expectedOutput: 'true', isHidden: false },
      { input: 'ab\na', expectedOutput: 'false', isHidden: true },
      { input: 'listen\nsilent', expectedOutput: 'true', isHidden: true },
    ],
  },

  // 5. Reverse Linked List
  {
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- The number of nodes in the list is in the range \`[0, 5000]\`.\n- \`-5000 <= Node.val <= 5000\``,
    inputFormat: `Line 1: Comma-separated integers representing the node values of the linked list. If empty, input is blank.`,
    outputFormat: `Comma-separated integers representing the reversed linked list values.`,
    sampleInput: `1,2,3,4,5`,
    sampleOutput: `5,4,3,2,1`,
    points: 100,
    hints: [
      'Maintain three pointers: prev, curr, and next.',
      'At each node, store curr.next in next, set curr.next = prev, and advance prev and curr forward.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print("")
        return
    nums = [x.strip() for x in line.split(',') if x.strip()]
    print(",".join(reversed(nums)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(""); return; }
    const nums = line.split(',').map(x => x.trim()).filter(Boolean);
    console.log(nums.reverse().join(','));
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) { cout << "" << endl; return 0; }
    stringstream ss(line);
    string token;
    vector<string> items;
    while (getline(ss, token, ',')) {
        if (!token.empty()) items.push_back(token);
    }
    reverse(items.begin(), items.end());
    for (int i = 0; i < items.size(); i++) {
        cout << items[i] << (i + 1 < items.size() ? "," : "");
    }
    cout << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) { System.out.println(""); return; }
        String[] parts = line.split(",");
        List<String> list = new ArrayList<>();
        for (String p : parts) if (!p.trim().isEmpty()) list.add(p.trim());
        Collections.reverse(list);
        System.out.println(String.join(",", list));
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print("")
        return
    nums = [x.strip() for x in line.split(',') if x.strip()]
    print(",".join(reversed(nums)))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(""); return; }
    const nums = line.split(',').map(x => x.trim()).filter(Boolean);
    console.log(nums.reverse().join(','));
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) { cout << "" << endl; return 0; }
    stringstream ss(line);
    string token;
    vector<string> items;
    while (getline(ss, token, ',')) {
        if (!token.empty()) items.push_back(token);
    }
    reverse(items.begin(), items.end());
    for (int i = 0; i < items.size(); i++) {
        cout << items[i] << (i + 1 < items.size() ? "," : "");
    }
    cout << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) { System.out.println(""); return; }
        String[] parts = line.split(",");
        List<String> list = new ArrayList<>();
        for (String p : parts) if (!p.trim().isEmpty()) list.add(p.trim());
        Collections.reverse(list);
        System.out.println(String.join(",", list));
    }
}
`,
    },
    editorial: {
      approach: 'Iterative 3-Pointer Linked List Inversion',
      algorithm: 'Initialize prev as null and curr as head. In a loop, save curr.next, re-point curr.next to prev, move prev to curr, and move curr to the saved next. Return prev when curr reaches null.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'Iterative pointer redirection requires a single linear pass and O(1) auxiliary memory.',
      referenceCode: `def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
    },
    tags: ['Linked List', 'Recursion'],
    testCases: [
      { input: '1,2,3,4,5', expectedOutput: '5,4,3,2,1', isHidden: false },
      { input: '1,2', expectedOutput: '2,1', isHidden: false },
      { input: '10', expectedOutput: '10', isHidden: false },
      { input: '100,200,300,400', expectedOutput: '400,300,200,100', isHidden: true },
    ],
  },

  // 6. Linked List Cycle
  {
    title: 'Linked List Cycle',
    slug: 'linked-list-cycle',
    description: `Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the \`next\` pointer. Internally, \`pos\` is used to denote the index of the node that tail's \`next\` pointer is connected to (**0-indexed**). It is \`-1\` if there is no cycle.

Return \`true\` if there is a cycle in the linked list. Otherwise, return \`false\`.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- The number of the nodes in the list is in the range \`[0, 10^4]\`.\n- \`-10^5 <= Node.val <= 10^5\`\n- \`pos\` is \`-1\` or a **valid index** in the linked-list.`,
    inputFormat: `Line 1: Comma-separated integers representing node values \`nums\`.\nLine 2: Integer \`pos\` indicating cycle connection (-1 for no cycle).`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `3,2,0,-4\n1`,
    sampleOutput: `true`,
    points: 100,
    hints: [
      'Floyds Tortoise and Hare algorithm uses two pointers moving at different speeds (1 step and 2 steps).',
      'If a cycle exists, the fast pointer will eventually catch up to the slow pointer.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    pos = int(lines[1].strip())
    print("true" if pos >= 0 else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const pos = parseInt(lines[1].trim(), 10);
    console.log(pos >= 0 ? "true" : "false");
}

solve();
`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line1, line2;
    if (!getline(cin, line1) || !getline(cin, line2)) return 0;
    int pos = stoi(line2);
    cout << (pos >= 0 ? "true" : "false") << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line1 = reader.readLine();
        String line2 = reader.readLine();
        if (line1 == null || line2 == null) return;
        int pos = Integer.parseInt(line2.trim());
        System.out.println(pos >= 0 ? "true" : "false");
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    pos = int(lines[1].strip())
    print("true" if pos >= 0 else "false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const pos = parseInt(lines[1].trim(), 10);
    console.log(pos >= 0 ? "true" : "false");
}

solve();
`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line1, line2;
    if (!getline(cin, line1) || !getline(cin, line2)) return 0;
    int pos = stoi(line2);
    cout << (pos >= 0 ? "true" : "false") << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line1 = reader.readLine();
        String line2 = reader.readLine();
        if (line1 == null || line2 == null) return;
        int pos = Integer.parseInt(line2.trim());
        System.out.println(pos >= 0 ? "true" : "false");
    }
}
`,
    },
    editorial: {
      approach: "Floyd's Cycle-Finding Algorithm (Tortoise & Hare)",
      algorithm: 'Advance slow pointer by 1 node and fast pointer by 2 nodes per step. If fast pointer encounters null or fast.next is null, no cycle exists. If slow and fast collide, a loop is proven.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'Floyds two-pointer technique operates in O(n) linear time with O(1) constant space without modifying node structures or allocating memory.',
      referenceCode: `def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
    },
    tags: ['Linked List', 'Two Pointers'],
    testCases: [
      { input: '3,2,0,-4\n1', expectedOutput: 'true', isHidden: false },
      { input: '1,2\n0', expectedOutput: 'true', isHidden: false },
      { input: '1\n-1', expectedOutput: 'false', isHidden: false },
      { input: '1,2,3,4,5\n-1', expectedOutput: 'false', isHidden: true },
      { input: '5,10,15,20\n3', expectedOutput: 'true', isHidden: true },
    ],
  },

  // 7. Invert Binary Tree
  {
    title: 'Invert Binary Tree',
    slug: 'invert-binary-tree',
    description: `Given the root of a binary tree, invert the tree, and return its root.

Inverting a tree means swapping every left child with its corresponding right child recursively.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- The number of nodes in the tree is in the range \`[0, 100]\`.\n- \`-100 <= Node.val <= 100\``,
    inputFormat: `Line 1: Level-order comma-separated string representation of binary tree (e.g. \`4,2,7,1,3,6,9\`).`,
    outputFormat: `Level-order comma-separated string representation of inverted tree.`,
    sampleInput: `4,2,7,1,3,6,9`,
    sampleOutput: `4,7,2,9,6,3,1`,
    points: 100,
    hints: [
      'For each node, recursively invert its left and right subtrees, then swap the two child pointers.',
      'Base case: If the root is null or empty, return null.',
    ],
    codeTemplates: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert(root):
    if not root:
        return None
    root.left, root.right = invert(root.right), invert(root.left)
    return root

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print("")
        return
    parts = [x.strip() for x in line.split(',') if x.strip()]
    if not parts or parts[0] == 'null':
        print("")
        return
    
    root = TreeNode(parts[0])
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(parts[idx])
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(parts[idx])
            q.append(node.right)
        idx += 1
    
    invert(root)
    
    out = []
    q = [root]
    while q:
        curr = q.pop(0)
        if curr:
            out.append(str(curr.val))
            q.append(curr.left)
            q.append(curr.right)
        else:
            out.append('null')
    while out and out[-1] == 'null':
        out.pop()
    print(",".join(out))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(""); return; }
    const parts = line.split(',').map(x => x.trim()).filter(Boolean);
    if (parts.length === 0) { console.log(""); return; }

    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }

    const root = new TreeNode(parts[0]);
    const q = [root];
    let idx = 1;
    while (q.length > 0 && idx < parts.length) {
        const node = q.shift();
        if (idx < parts.length && parts[idx] !== 'null') {
            node.left = new TreeNode(parts[idx]);
            q.push(node.left);
        }
        idx++;
        if (idx < parts.length && parts[idx] !== 'null') {
            node.right = new TreeNode(parts[idx]);
            q.push(node.right);
        }
        idx++;
    }

    function invert(node) {
        if (!node) return null;
        const temp = node.left;
        node.left = invert(node.right);
        node.right = invert(temp);
        return node;
    }

    invert(root);

    const out = [];
    const outQ = [root];
    while (outQ.length > 0) {
        const curr = outQ.shift();
        if (curr) {
            out.push(curr.val);
            outQ.push(curr.left);
            outQ.push(curr.right);
        } else {
            out.push('null');
        }
    }
    while (out.length > 0 && out[out.length - 1] === 'null') out.pop();
    console.log(out.join(','));
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <queue>
using namespace std;

struct TreeNode {
    string val;
    TreeNode *left, *right;
    TreeNode(string v) : val(v), left(nullptr), right(nullptr) {}
};

TreeNode* invert(TreeNode* root) {
    if (!root) return nullptr;
    TreeNode* temp = root->left;
    root->left = invert(root->right);
    root->right = invert(temp);
    return root;
}

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) { cout << "" << endl; return 0; }
    stringstream ss(line);
    string token;
    vector<string> parts;
    while (getline(ss, token, ',')) {
        if (!token.empty()) parts.push_back(token);
    }
    if (parts.empty() || parts[0] == "null") { cout << "" << endl; return 0; }

    TreeNode* root = new TreeNode(parts[0]);
    queue<TreeNode*> q;
    q.push(root);
    int idx = 1;
    while (!q.empty() && idx < parts.size()) {
        TreeNode* node = q.front(); q.pop();
        if (idx < parts.size() && parts[idx] != "null") {
            node->left = new TreeNode(parts[idx]);
            q.push(node->left);
        }
        idx++;
        if (idx < parts.size() && parts[idx] != "null") {
            node->right = new TreeNode(parts[idx]);
            q.push(node->right);
        }
        idx++;
    }

    invert(root);

    vector<string> out;
    queue<TreeNode*> outQ;
    outQ.push(root);
    while (!outQ.empty()) {
        TreeNode* curr = outQ.front(); outQ.pop();
        if (curr) {
            out.push_back(curr->val);
            outQ.push(curr->left);
            outQ.push(curr->right);
        } else {
            out.push_back("null");
        }
    }
    while (!out.empty() && out.back() == "null") out.pop_back();
    for (int i = 0; i < out.size(); i++) {
        cout << out[i] << (i + 1 < out.size() ? "," : "");
    }
    cout << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    static class TreeNode {
        String val;
        TreeNode left, right;
        TreeNode(String val) { this.val = val; }
    }

    static TreeNode invert(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = invert(root.right);
        root.right = invert(temp);
        return root;
    }

    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) { System.out.println(""); return; }
        String[] parts = line.split(",");
        if (parts.length == 0 || parts[0].trim().equals("null")) { System.out.println(""); return; }

        TreeNode root = new TreeNode(parts[0].trim());
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        int idx = 1;
        while (!q.isEmpty() && idx < parts.length) {
            TreeNode node = q.poll();
            if (idx < parts.length && !parts[idx].trim().equals("null")) {
                node.left = new TreeNode(parts[idx].trim());
                q.add(node.left);
            }
            idx++;
            if (idx < parts.length && !parts[idx].trim().equals("null")) {
                node.right = new TreeNode(parts[idx].trim());
                q.add(node.right);
            }
            idx++;
        }

        invert(root);

        List<String> out = new ArrayList<>();
        Queue<TreeNode> outQ = new LinkedList<>();
        outQ.add(root);
        while (!outQ.isEmpty()) {
            TreeNode curr = outQ.poll();
            if (curr != null) {
                out.add(curr.val);
                outQ.add(curr.left);
                outQ.add(curr.right);
            } else {
                out.add("null");
            }
        }
        while (!out.isEmpty() && out.get(out.size() - 1).equals("null")) out.remove(out.size() - 1);
        System.out.println(String.join(",", out));
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert(root):
    if not root:
        return None
    root.left, root.right = invert(root.right), invert(root.left)
    return root

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print("")
        return
    parts = [x.strip() for x in line.split(',') if x.strip()]
    if not parts or parts[0] == 'null':
        print("")
        return
    
    root = TreeNode(parts[0])
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(parts[idx])
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(parts[idx])
            q.append(node.right)
        idx += 1
    
    invert(root)
    
    out = []
    q = [root]
    while q:
        curr = q.pop(0)
        if curr:
            out.append(str(curr.val))
            q.append(curr.left)
            q.append(curr.right)
        else:
            out.append('null')
    while out and out[-1] == 'null':
        out.pop()
    print(",".join(out))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(""); return; }
    const parts = line.split(',').map(x => x.trim()).filter(Boolean);
    if (parts.length === 0) { console.log(""); return; }

    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }

    const root = new TreeNode(parts[0]);
    const q = [root];
    let idx = 1;
    while (q.length > 0 && idx < parts.length) {
        const node = q.shift();
        if (idx < parts.length && parts[idx] !== 'null') {
            node.left = new TreeNode(parts[idx]);
            q.push(node.left);
        }
        idx++;
        if (idx < parts.length && parts[idx] !== 'null') {
            node.right = new TreeNode(parts[idx]);
            q.push(node.right);
        }
        idx++;
    }

    function invert(node) {
        if (!node) return null;
        const temp = node.left;
        node.left = invert(node.right);
        node.right = invert(temp);
        return node;
    }

    invert(root);

    const out = [];
    const outQ = [root];
    while (outQ.length > 0) {
        const curr = outQ.shift();
        if (curr) {
            out.push(curr.val);
            outQ.push(curr.left);
            outQ.push(curr.right);
        } else {
            out.push('null');
        }
    }
    while (out.length > 0 && out[out.length - 1] === 'null') out.pop();
    console.log(out.join(','));
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <queue>
using namespace std;

struct TreeNode {
    string val;
    TreeNode *left, *right;
    TreeNode(string v) : val(v), left(nullptr), right(nullptr) {}
};

TreeNode* invert(TreeNode* root) {
    if (!root) return nullptr;
    TreeNode* temp = root->left;
    root->left = invert(root->right);
    root->right = invert(temp);
    return root;
}

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) { cout << "" << endl; return 0; }
    stringstream ss(line);
    string token;
    vector<string> parts;
    while (getline(ss, token, ',')) {
        if (!token.empty()) parts.push_back(token);
    }
    if (parts.empty() || parts[0] == "null") { cout << "" << endl; return 0; }

    TreeNode* root = new TreeNode(parts[0]);
    queue<TreeNode*> q;
    q.push(root);
    int idx = 1;
    while (!q.empty() && idx < parts.size()) {
        TreeNode* node = q.front(); q.pop();
        if (idx < parts.size() && parts[idx] != "null") {
            node->left = new TreeNode(parts[idx]);
            q.push(node->left);
        }
        idx++;
        if (idx < parts.size() && parts[idx] != "null") {
            node->right = new TreeNode(parts[idx]);
            q.push(node->right);
        }
        idx++;
    }

    invert(root);

    vector<string> out;
    queue<TreeNode*> outQ;
    outQ.push(root);
    while (!outQ.empty()) {
        TreeNode* curr = outQ.front(); outQ.pop();
        if (curr) {
            out.push_back(curr->val);
            outQ.push(curr->left);
            outQ.push(curr->right);
        } else {
            out.push_back("null");
        }
    }
    while (!out.empty() && out.back() == "null") out.pop_back();
    for (int i = 0; i < out.size(); i++) {
        cout << out[i] << (i + 1 < out.size() ? "," : "");
    }
    cout << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    static class TreeNode {
        String val;
        TreeNode left, right;
        TreeNode(String val) { this.val = val; }
    }

    static TreeNode invert(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = invert(root.right);
        root.right = invert(temp);
        return root;
    }

    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) { System.out.println(""); return; }
        String[] parts = line.split(",");
        if (parts.length == 0 || parts[0].trim().equals("null")) { System.out.println(""); return; }

        TreeNode root = new TreeNode(parts[0].trim());
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        int idx = 1;
        while (!q.isEmpty() && idx < parts.length) {
            TreeNode node = q.poll();
            if (idx < parts.length && !parts[idx].trim().equals("null")) {
                node.left = new TreeNode(parts[idx].trim());
                q.add(node.left);
            }
            idx++;
            if (idx < parts.length && !parts[idx].trim().equals("null")) {
                node.right = new TreeNode(parts[idx].trim());
                q.add(node.right);
            }
            idx++;
        }

        invert(root);

        List<String> out = new ArrayList<>();
        Queue<TreeNode> outQ = new LinkedList<>();
        outQ.add(root);
        while (!outQ.isEmpty()) {
            TreeNode curr = outQ.poll();
            if (curr != null) {
                out.add(curr.val);
                outQ.add(curr.left);
                outQ.add(curr.right);
            } else {
                out.add("null");
            }
        }
        while (!out.isEmpty() && out.get(out.size() - 1).equals("null")) out.remove(out.size() - 1);
        System.out.println(String.join(",", out));
    }
}
`,
    },
    editorial: {
      approach: 'Post-Order Recursive Subtree Swapping',
      algorithm: 'Perform a depth-first traversal of the tree. At each node, recursively invert both children and then swap the left and right pointers.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      content: 'Every node in the tree is visited once (O(n) time). Space complexity is proportional to the tree height h for the call stack.',
      referenceCode: `def invert_tree(root):
    if not root: return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root`,
    },
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
    testCases: [
      { input: '4,2,7,1,3,6,9', expectedOutput: '4,7,2,9,6,3,1', isHidden: false },
      { input: '2,1,3', expectedOutput: '2,3,1', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: false },
      { input: '1,2,null', expectedOutput: '1,null,2', isHidden: true },
    ],
  },

  // 8. Kth Largest Element in an Array
  {
    title: 'Kth Largest Element in an Array',
    slug: 'kth-largest-element-in-an-array',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\`-th largest element in the array.

Note that it is the \`k\`-th largest element in the sorted order, not the \`k\`-th distinct element.

Can you solve it without sorting?`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- 1 <= k <= nums.length <= 10^5\n- -10^4 <= nums[i] <= 10^4`,
    inputFormat: `Line 1: Comma-separated integers \`nums\`.\nLine 2: Integer \`k\`.`,
    outputFormat: `An integer representing the kth largest element.`,
    sampleInput: `3,2,1,5,6,4\n2`,
    sampleOutput: `5`,
    points: 150,
    hints: [
      'A min-heap of size k maintains the k largest elements seen so far.',
      'For each element, push to heap. If heap size exceeds k, pop the smallest element. The top of the min-heap at the end is the kth largest.',
    ],
    codeTemplates: {
      python: `import sys
import heapq

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
    k = int(lines[1].strip())
    
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    print(heap[0])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const nums = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const k = parseInt(lines[1].trim(), 10);
    nums.sort((a, b) => b - a);
    console.log(nums[k - 1]);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <queue>
using namespace std;

int main() {
    string line1, line2;
    if (!getline(cin, line1) || !getline(cin, line2)) return 0;
    stringstream ss(line1);
    string token;
    vector<int> nums;
    while (getline(ss, token, ',')) {
        if (!token.empty()) nums.push_back(stoi(token));
    }
    int k = stoi(line2);
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) minHeap.pop();
    }
    cout << minHeap.top() << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line1 = reader.readLine();
        String line2 = reader.readLine();
        if (line1 == null || line2 == null) return;
        String[] parts = line1.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());
        int k = Integer.parseInt(line2.trim());
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.add(num);
            if (minHeap.size() > k) minHeap.poll();
        }
        System.out.println(minHeap.peek());
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys
import heapq

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
    k = int(lines[1].strip())
    
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    print(heap[0])

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const nums = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const k = parseInt(lines[1].trim(), 10);
    nums.sort((a, b) => b - a);
    console.log(nums[k - 1]);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <queue>
using namespace std;

int main() {
    string line1, line2;
    if (!getline(cin, line1) || !getline(cin, line2)) return 0;
    stringstream ss(line1);
    string token;
    vector<int> nums;
    while (getline(ss, token, ',')) {
        if (!token.empty()) nums.push_back(stoi(token));
    }
    int k = stoi(line2);
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) minHeap.pop();
    }
    cout << minHeap.top() << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line1 = reader.readLine();
        String line2 = reader.readLine();
        if (line1 == null || line2 == null) return;
        String[] parts = line1.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());
        int k = Integer.parseInt(line2.trim());
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.add(num);
            if (minHeap.size() > k) minHeap.poll();
        }
        System.out.println(minHeap.peek());
    }
}
`,
    },
    editorial: {
      approach: 'Min-Heap Priority Queue of Fixed Size K',
      algorithm: 'Maintain a min-heap bounded to size k. Each insertion takes O(log k). When capacity exceeds k, evict the minimum element. After processing all n numbers, the root of the min-heap holds the kth largest element.',
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(k)',
      content: 'A min-heap of capacity k guarantees O(n log k) runtime and O(k) memory, significantly outperforming full O(n log n) sorting when k << n.',
      referenceCode: `import heapq
def find_kth_largest(nums, k):
    return heapq.nlargest(k, nums)[-1]`,
    },
    tags: ['Array', 'Divide and Conquer', 'Sorting', 'Heap (Priority Queue)', 'Quickselect'],
    testCases: [
      { input: '3,2,1,5,6,4\n2', expectedOutput: '5', isHidden: false },
      { input: '3,2,3,1,2,4,5,5,6\n4', expectedOutput: '4', isHidden: false },
      { input: '1\n1', expectedOutput: '1', isHidden: false },
      { input: '-1,-2,-3,-4\n1', expectedOutput: '-1', isHidden: true },
      { input: '7,10,4,3,20,15\n3', expectedOutput: '10', isHidden: true },
    ],
  },

  // 9. Climbing Stairs
  {
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- 1 <= n <= 45`,
    inputFormat: `Line 1: An integer \`n\`.`,
    outputFormat: `An integer representing the number of distinct ways.`,
    sampleInput: `3`,
    sampleOutput: `3`,
    points: 100,
    hints: [
      'To reach step i, you can either step from i - 1 or from i - 2.',
      'This follows the recurrence: dp[i] = dp[i - 1] + dp[i - 2], which is the Fibonacci sequence.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        return
    n = int(line)
    if n <= 2:
        print(n)
        return
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    print(b)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const n = parseInt(line, 10);
    if (n <= 2) { console.log(n); return; }
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) {
        const next = a + b;
        a = b;
        b = next;
    }
    console.log(b);
}

solve();
`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    if (n <= 2) { cout << n << endl; return 0; }
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int next = a + b;
        a = b;
        b = next;
    }
    cout << b << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) return;
        int n = Integer.parseInt(line.trim());
        if (n <= 2) { System.out.println(n); return; }
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int next = a + b;
            a = b;
            b = next;
        }
        System.out.println(b);
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        return
    n = int(line)
    if n <= 2:
        print(n)
        return
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    print(b)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) return;
    const n = parseInt(line, 10);
    if (n <= 2) { console.log(n); return; }
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) {
        const next = a + b;
        a = b;
        b = next;
    }
    console.log(b);
}

solve();
`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    if (n <= 2) { cout << n << endl; return 0; }
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int next = a + b;
        a = b;
        b = next;
    }
    cout << b << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) return;
        int n = Integer.parseInt(line.trim());
        if (n <= 2) { System.out.println(n); return; }
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int next = a + b;
            a = b;
            b = next;
        }
        System.out.println(b);
    }
}
`,
    },
    editorial: {
      approach: 'Space-Optimized Dynamic Programming (Fibonacci Recurrence)',
      algorithm: 'Let dp[i] be the number of ways to reach step i. Base cases are dp[1] = 1 and dp[2] = 2. For i >= 3, dp[i] = dp[i - 1] + dp[i - 2]. Since only the prior two states are required, maintain two variables.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'Transitioning in a rolling window of 2 states reduces memory from O(n) to O(1) while completing in O(n) linear time.',
      referenceCode: `def climb_stairs(n):
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b`,
    },
    tags: ['Math', 'Dynamic Programming', 'Memoization'],
    testCases: [
      { input: '2', expectedOutput: '2', isHidden: false },
      { input: '3', expectedOutput: '3', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: false },
      { input: '5', expectedOutput: '8', isHidden: true },
      { input: '10', expectedOutput: '89', isHidden: true },
    ],
  },

  // 10. House Robber
  {
    title: 'House Robber',
    slug: 'house-robber',
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police**.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- 1 <= nums.length <= 100\n- 0 <= nums[i] <= 400`,
    inputFormat: `Line 1: Comma-separated integers representing money in each house.`,
    outputFormat: `An integer representing the maximum robbable amount.`,
    sampleInput: `1,2,3,1`,
    sampleOutput: `4`,
    points: 150,
    hints: [
      'At house i, you have two choices: rob house i (which means you cannot rob house i-1, but can take dp[i-2] + nums[i]) or skip house i (take dp[i-1]).',
      'Recurrence relation: dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print(0)
        return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    prev1, prev2 = 0, 0
    for num in nums:
        curr = max(prev1, prev2 + num)
        prev2 = prev1
        prev1 = curr
    print(prev1)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(0); return; }
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    let prev1 = 0, prev2 = 0;
    for (const num of nums) {
        const curr = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }
    console.log(prev1);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) { cout << 0 << endl; return 0; }
    stringstream ss(line);
    string token;
    vector<int> nums;
    while (getline(ss, token, ',')) {
        if (!token.empty()) nums.push_back(stoi(token));
    }
    int prev1 = 0, prev2 = 0;
    for (int num : nums) {
        int curr = max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }
    cout << prev1 << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) { System.out.println(0); return; }
        String[] parts = line.split(",");
        int prev1 = 0, prev2 = 0;
        for (String p : parts) {
            int num = Integer.parseInt(p.trim());
            int curr = Math.max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = curr;
        }
        System.out.println(prev1);
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print(0)
        return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    prev1, prev2 = 0, 0
    for num in nums:
        curr = max(prev1, prev2 + num)
        prev2 = prev1
        prev1 = curr
    print(prev1)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(0); return; }
    const nums = line.split(',').map(x => parseInt(x.trim(), 10));
    let prev1 = 0, prev2 = 0;
    for (const num of nums) {
        const curr = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }
    console.log(prev1);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) { cout << 0 << endl; return 0; }
    stringstream ss(line);
    string token;
    vector<int> nums;
    while (getline(ss, token, ',')) {
        if (!token.empty()) nums.push_back(stoi(token));
    }
    int prev1 = 0, prev2 = 0;
    for (int num : nums) {
        int curr = max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }
    cout << prev1 << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) { System.out.println(0); return; }
        String[] parts = line.split(",");
        int prev1 = 0, prev2 = 0;
        for (String p : parts) {
            int num = Integer.parseInt(p.trim());
            int curr = Math.max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = curr;
        }
        System.out.println(prev1);
    }
}
`,
    },
    editorial: {
      approach: '1D Dynamic Programming with Constant Space Rolling State',
      algorithm: 'Define state `dp[i]` as the maximum profit achievable from the first `i` houses. At each house, we either skip house `i` (taking `dp[i - 1]`) or rob house `i` (taking `dp[i - 2] + nums[i]`). Maintain two scalar variables `prev1` and `prev2` to optimize memory.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'A single linear pass computing the optimal substructure in O(n) time and O(1) space.',
      referenceCode: `def rob(nums):
    prev1 = prev2 = 0
    for x in nums:
        prev1, prev2 = max(prev1, prev2 + x), prev1
    return prev1`,
    },
    tags: ['Array', 'Dynamic Programming'],
    testCases: [
      { input: '1,2,3,1', expectedOutput: '4', isHidden: false },
      { input: '2,7,9,3,1', expectedOutput: '12', isHidden: false },
      { input: '5', expectedOutput: '5', isHidden: false },
      { input: '2,1,1,2', expectedOutput: '4', isHidden: true },
      { input: '0,0,0', expectedOutput: '0', isHidden: true },
    ],
  },

  // 11. Search in Rotated Sorted Array
  {
    title: 'Search in Rotated Sorted Array',
    slug: 'search-in-rotated-sorted-array',
    description: `There is an integer array \`nums\` sorted in ascending order (with distinct values).

Prior to being passed to your function, \`nums\` is possibly rotated at an unknown pivot index \`k\` (\`1 <= k < nums.length\`) such that the resulting array is \`[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]\` (**0-indexed**).

Given the array \`nums\` after the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.

You must write an algorithm with **O(log n)** runtime complexity.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- 1 <= nums.length <= 5000\n- -10^4 <= nums[i], target <= 10^4\n- All values of \`nums\` are **unique**.\n- \`nums\` is an ascending array that is possibly rotated.`,
    inputFormat: `Line 1: Comma-separated integers \`nums\`.\nLine 2: Integer \`target\`.`,
    outputFormat: `Target index or \`-1\`.`,
    sampleInput: `4,5,6,7,0,1,2\n0`,
    sampleOutput: `4`,
    points: 150,
    hints: [
      'In a rotated sorted array, at least one half (left or right of mid) is always strictly sorted.',
      'Check if nums[left] <= nums[mid]. If true, the left half is sorted. If target lies in [nums[left], nums[mid]], search left; otherwise search right.',
      'If the left half is not sorted, the right half must be sorted. If target lies in [nums[mid], nums[right]], search right; otherwise search left.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
    target = int(lines[1].strip())
    
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            print(mid)
            return
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    print(-1)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const nums = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const target = parseInt(lines[1].trim(), 10);
    
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            console.log(mid);
            return;
        }
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    console.log(-1);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

int main() {
    string line1, line2;
    if (!getline(cin, line1) || !getline(cin, line2)) return 0;
    stringstream ss(line1);
    string token;
    vector<int> nums;
    while (getline(ss, token, ',')) {
        if (!token.empty()) nums.push_back(stoi(token));
    }
    int target = stoi(line2);
    
    int left = 0, right = (int)nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            cout << mid << endl;
            return 0;
        }
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    cout << -1 << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line1 = reader.readLine();
        String line2 = reader.readLine();
        if (line1 == null || line2 == null) return;
        String[] parts = line1.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());
        int target = Integer.parseInt(line2.trim());
        
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                System.out.println(mid);
                return;
            }
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        System.out.println(-1);
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
    target = int(lines[1].strip())
    
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            print(mid)
            return
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    print(-1)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const nums = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const target = parseInt(lines[1].trim(), 10);
    
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            console.log(mid);
            return;
        }
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    console.log(-1);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

int main() {
    string line1, line2;
    if (!getline(cin, line1) || !getline(cin, line2)) return 0;
    stringstream ss(line1);
    string token;
    vector<int> nums;
    while (getline(ss, token, ',')) {
        if (!token.empty()) nums.push_back(stoi(token));
    }
    int target = stoi(line2);
    
    int left = 0, right = (int)nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            cout << mid << endl;
            return 0;
        }
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    cout << -1 << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line1 = reader.readLine();
        String line2 = reader.readLine();
        if (line1 == null || line2 == null) return;
        String[] parts = line1.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());
        int target = Integer.parseInt(line2.trim());
        
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                System.out.println(mid);
                return;
            }
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        System.out.println(-1);
    }
}
`,
    },
    editorial: {
      approach: 'Modified Binary Search Checking Half-Sorted Subintervals',
      algorithm: 'At each step of binary search, identify which half of the array is monotonically sorted. If the target falls within the bounds of that sorted half, narrow the search space to it; otherwise search the remaining half.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      content: 'Because at least one half of the array across the pivot is strictly monotonic, binary search maintains O(log n) performance.',
      referenceCode: `def search(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target: return m
        if nums[l] <= nums[m]:
            if nums[l] <= target < nums[m]: r = m - 1
            else: l = m + 1
        else:
            if nums[m] < target <= nums[r]: l = m + 1
            else: r = m - 1
    return -1`,
    },
    tags: ['Array', 'Binary Search'],
    testCases: [
      { input: '4,5,6,7,0,1,2\n0', expectedOutput: '4', isHidden: false },
      { input: '4,5,6,7,0,1,2\n3', expectedOutput: '-1', isHidden: false },
      { input: '1\n0', expectedOutput: '-1', isHidden: false },
      { input: '1\n1', expectedOutput: '0', isHidden: true },
      { input: '6,7,1,2,3,4,5\n3', expectedOutput: '4', isHidden: true },
    ],
  },

  // 12. Container With Most Water
  {
    title: 'Container With Most Water',
    slug: 'container-with-most-water',
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`-th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

**Notice** that you may not slant the container.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- n == height.length\n- 2 <= n <= 10^5\n- 0 <= height[i] <= 10^4`,
    inputFormat: `Line 1: Comma-separated integers representing \`height\`.`,
    outputFormat: `An integer representing the maximum area.`,
    sampleInput: `1,8,6,2,5,4,8,3,7`,
    sampleOutput: `49`,
    points: 150,
    hints: [
      'The area formed between indices l and r is min(height[l], height[r]) * (r - l).',
      'Start with pointers at both extremes (l = 0, r = n - 1). The width is maximized.',
      'To potentially find a larger area, move the pointer that points to the shorter line inward.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print(0)
        return
    height = [int(x.strip()) for x in line.split(',') if x.strip()]
    left, right = 0, len(height) - 1
    max_area = 0
    while left < right:
        h = min(height[left], height[right])
        max_area = max(max_area, h * (right - left))
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    print(max_area)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(0); return; }
    const height = line.split(',').map(x => parseInt(x.trim(), 10));
    let left = 0, right = height.length - 1;
    let maxArea = 0;
    while (left < right) {
        const h = Math.min(height[left], height[right]);
        maxArea = Math.max(maxArea, h * (right - left));
        if (height[left] < height[right]) left++;
        else right--;
    }
    console.log(maxArea);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) { cout << 0 << endl; return 0; }
    stringstream ss(line);
    string token;
    vector<int> height;
    while (getline(ss, token, ',')) {
        if (!token.empty()) height.push_back(stoi(token));
    }
    int left = 0, right = (int)height.size() - 1;
    int maxArea = 0;
    while (left < right) {
        int h = min(height[left], height[right]);
        maxArea = max(maxArea, h * (right - left));
        if (height[left] < height[right]) left++;
        else right--;
    }
    cout << maxArea << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) { System.out.println(0); return; }
        String[] parts = line.split(",");
        int[] height = new int[parts.length];
        for (int i = 0; i < parts.length; i++) height[i] = Integer.parseInt(parts[i].trim());
        int left = 0, right = height.length - 1;
        int maxArea = 0;
        while (left < right) {
            int h = Math.min(height[left], height[right]);
            maxArea = Math.max(maxArea, h * (right - left));
            if (height[left] < height[right]) left++;
            else right--;
        }
        System.out.println(maxArea);
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print(0)
        return
    height = [int(x.strip()) for x in line.split(',') if x.strip()]
    left, right = 0, len(height) - 1
    max_area = 0
    while left < right:
        h = min(height[left], height[right])
        max_area = max(max_area, h * (right - left))
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    print(max_area)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(0); return; }
    const height = line.split(',').map(x => parseInt(x.trim(), 10));
    let left = 0, right = height.length - 1;
    let maxArea = 0;
    while (left < right) {
        const h = Math.min(height[left], height[right]);
        maxArea = Math.max(maxArea, h * (right - left));
        if (height[left] < height[right]) left++;
        else right--;
    }
    console.log(maxArea);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) { cout << 0 << endl; return 0; }
    stringstream ss(line);
    string token;
    vector<int> height;
    while (getline(ss, token, ',')) {
        if (!token.empty()) height.push_back(stoi(token));
    }
    int left = 0, right = (int)height.size() - 1;
    int maxArea = 0;
    while (left < right) {
        int h = min(height[left], height[right]);
        maxArea = max(maxArea, h * (right - left));
        if (height[left] < height[right]) left++;
        else right--;
    }
    cout << maxArea << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) { System.out.println(0); return; }
        String[] parts = line.split(",");
        int[] height = new int[parts.length];
        for (int i = 0; i < parts.length; i++) height[i] = Integer.parseInt(parts[i].trim());
        int left = 0, right = height.length - 1;
        int maxArea = 0;
        while (left < right) {
            int h = Math.min(height[left], height[right]);
            maxArea = Math.max(maxArea, h * (right - left));
            if (height[left] < height[right]) left++;
            else right--;
        }
        System.out.println(maxArea);
    }
}
`,
    },
    editorial: {
      approach: 'Two-Pointer Inward Greedy Sweep',
      algorithm: 'Start with pointers at the boundaries. The width decreases at each step, so the only way to achieve a larger area is to find a taller line. Shifting the taller pointer will only decrease or keep the bottleneck height constant while reducing width. Therefore, shifting the shorter pointer is provably optimal.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'A single O(n) two-pointer inward scan with O(1) memory guarantees finding the global maximum.',
      referenceCode: `def max_area(height):
    l, r, res = 0, len(height) - 1, 0
    while l < r:
        res = max(res, min(height[l], height[r]) * (r - l))
        if height[l] < height[r]: l += 1
        else: r -= 1
    return res`,
    },
    tags: ['Array', 'Two Pointers', 'Greedy'],
    testCases: [
      { input: '1,8,6,2,5,4,8,3,7', expectedOutput: '49', isHidden: false },
      { input: '1,1', expectedOutput: '1', isHidden: false },
      { input: '4,3,2,1,4', expectedOutput: '16', isHidden: false },
      { input: '1,2,1', expectedOutput: '2', isHidden: true },
      { input: '1,2,4,3', expectedOutput: '4', isHidden: true },
    ],
  },

  // 13. 3Sum
  {
    title: '3Sum',
    slug: '3sum',
    description: `Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets. Return triplets in sorted JSON format.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- 3 <= nums.length <= 3000\n- -10^5 <= nums[i] <= 10^5`,
    inputFormat: `Line 1: Comma-separated integers \`nums\`.`,
    outputFormat: `A JSON string representing the sorted list of triplets, e.g. \`[[-1,-1,2],[-1,0,1]]\` or \`[]\`.`,
    sampleInput: `-1,0,1,2,-1,-4`,
    sampleOutput: `[[-1,-1,2],[-1,0,1]]`,
    points: 150,
    hints: [
      'Sort the array first to make two-pointer searching easy and to handle duplicates.',
      'Fix the first element nums[i]. Then use two pointers (left = i + 1, right = n - 1) to find pairs summing to -nums[i].',
      'Skip duplicate values of nums[i], nums[left], and nums[right] to avoid duplicate triplets.',
    ],
    codeTemplates: {
      python: `import sys
import json

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print("[]")
        return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    nums.sort()
    res = []
    n = len(nums)
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        if nums[i] > 0:
            break
        l, r = i + 1, n - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                res.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l + 1]:
                    l += 1
                while l < r and nums[r] == nums[r - 1]:
                    r -= 1
                l += 1
                r -= 1
            elif s < 0:
                l += 1
            else:
                r -= 1
    print(json.dumps(res, separators=(',', ':')))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log("[]"); return; }
    const nums = line.split(',').map(x => parseInt(x.trim(), 10)).sort((a, b) => a - b);
    const res = [];
    const n = nums.length;
    for (let i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        if (nums[i] > 0) break;
        let l = i + 1, r = n - 1;
        while (l < r) {
            const s = nums[i] + nums[l] + nums[r];
            if (s === 0) {
                res.push([nums[i], nums[l], nums[r]]);
                while (l < r && nums[l] === nums[l + 1]) l++;
                while (l < r && nums[r] === nums[r - 1]) r--;
                l++;
                r--;
            } else if (s < 0) {
                l++;
            } else {
                r--;
            }
        }
    }
    console.log(JSON.stringify(res));
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) { cout << "[]" << endl; return 0; }
    stringstream ss(line);
    string token;
    vector<int> nums;
    while (getline(ss, token, ',')) {
        if (!token.empty()) nums.push_back(stoi(token));
    }
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    int n = nums.size();
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        if (nums[i] > 0) break;
        int l = i + 1, r = n - 1;
        while (l < r) {
            int s = nums[i] + nums[l] + nums[r];
            if (s == 0) {
                res.push_back({nums[i], nums[l], nums[r]});
                while (l < r && nums[l] == nums[l + 1]) l++;
                while (l < r && nums[r] == nums[r - 1]) r--;
                l++; r--;
            } else if (s < 0) l++;
            else r--;
        }
    }
    cout << "[";
    for (size_t i = 0; i < res.size(); i++) {
        cout << "[" << res[i][0] << "," << res[i][1] << "," << res[i][2] << "]";
        if (i + 1 < res.size()) cout << ",";
    }
    cout << "]" << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) { System.out.println("[]"); return; }
        String[] parts = line.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        int n = nums.length;
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            if (nums[i] > 0) break;
            int l = i + 1, r = n - 1;
            while (l < r) {
                int s = nums[i] + nums[l] + nums[r];
                if (s == 0) {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (s < 0) l++;
                else r--;
            }
        }
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < res.size(); i++) {
            List<Integer> t = res.get(i);
            sb.append("[").append(t.get(0)).append(",").append(t.get(1)).append(",").append(t.get(2)).append("]");
            if (i + 1 < res.size()) sb.append(",");
        }
        sb.append("]");
        System.out.println(sb.toString());
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys
import json

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print("[]")
        return
    nums = [int(x.strip()) for x in line.split(',') if x.strip()]
    nums.sort()
    res = []
    n = len(nums)
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        if nums[i] > 0:
            break
        l, r = i + 1, n - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                res.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l + 1]:
                    l += 1
                while l < r and nums[r] == nums[r - 1]:
                    r -= 1
                l += 1
                r -= 1
            elif s < 0:
                l += 1
            else:
                r -= 1
    print(json.dumps(res, separators=(',', ':')))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log("[]"); return; }
    const nums = line.split(',').map(x => parseInt(x.trim(), 10)).sort((a, b) => a - b);
    const res = [];
    const n = nums.length;
    for (let i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        if (nums[i] > 0) break;
        let l = i + 1, r = n - 1;
        while (l < r) {
            const s = nums[i] + nums[l] + nums[r];
            if (s === 0) {
                res.push([nums[i], nums[l], nums[r]]);
                while (l < r && nums[l] === nums[l + 1]) l++;
                while (l < r && nums[r] === nums[r - 1]) r--;
                l++;
                r--;
            } else if (s < 0) {
                l++;
            } else {
                r--;
            }
        }
    }
    console.log(JSON.stringify(res));
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) { cout << "[]" << endl; return 0; }
    stringstream ss(line);
    string token;
    vector<int> nums;
    while (getline(ss, token, ',')) {
        if (!token.empty()) nums.push_back(stoi(token));
    }
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    int n = nums.size();
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        if (nums[i] > 0) break;
        int l = i + 1, r = n - 1;
        while (l < r) {
            int s = nums[i] + nums[l] + nums[r];
            if (s == 0) {
                res.push_back({nums[i], nums[l], nums[r]});
                while (l < r && nums[l] == nums[l + 1]) l++;
                while (l < r && nums[r] == nums[r - 1]) r--;
                l++; r--;
            } else if (s < 0) l++;
            else r--;
        }
    }
    cout << "[";
    for (size_t i = 0; i < res.size(); i++) {
        cout << "[" << res[i][0] << "," << res[i][1] << "," << res[i][2] << "]";
        if (i + 1 < res.size()) cout << ",";
    }
    cout << "]" << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) { System.out.println("[]"); return; }
        String[] parts = line.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        int n = nums.length;
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            if (nums[i] > 0) break;
            int l = i + 1, r = n - 1;
            while (l < r) {
                int s = nums[i] + nums[l] + nums[r];
                if (s == 0) {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (s < 0) l++;
                else r--;
            }
        }
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < res.size(); i++) {
            List<Integer> t = res.get(i);
            sb.append("[").append(t.get(0)).append(",").append(t.get(1)).append(",").append(t.get(2)).append("]");
            if (i + 1 < res.size()) sb.append(",");
        }
        sb.append("]");
        System.out.println(sb.toString());
    }
}
`,
    },
    editorial: {
      approach: 'Sorting + Two-Pointer Search with Duplicate Pruning',
      algorithm: 'Sort the array. Iterate through each element as the first value of the triplet. For each index `i`, use two pointers `left = i + 1` and `right = n - 1` to search for target `-nums[i]`. Skip duplicate adjacent values at all 3 pointer positions.',
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(1) auxiliary (ignoring output)',
      content: 'Sorting takes O(n log n) and the two-pointer loop executes in O(n^2) time, which is optimal for 3Sum.',
      referenceCode: `def three_sum(nums):
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]: continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                res.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l + 1]: l += 1
                while l < r and nums[r] == nums[r - 1]: r -= 1
                l += 1; r -= 1
            elif s < 0: l += 1
            else: r -= 1
    return res`,
    },
    tags: ['Array', 'Two Pointers', 'Sorting'],
    testCases: [
      { input: '-1,0,1,2,-1,-4', expectedOutput: '[[-1,-1,2],[-1,0,1]]', isHidden: false },
      { input: '0,1,1', expectedOutput: '[]', isHidden: false },
      { input: '0,0,0', expectedOutput: '[[0,0,0]]', isHidden: false },
      { input: '-2,0,1,1,2', expectedOutput: '[[-2,0,2],[-2,1,1]]', isHidden: true },
      { input: '1,2,-2,-1', expectedOutput: '[]', isHidden: true },
    ],
  },

  // 14. Number of Islands
  {
    title: 'Number of Islands',
    slug: 'number-of-islands',
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return the number of islands.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- m == grid.length\n- n == grid[i].length\n- 1 <= m, n <= 300\n- \`grid[i][j]\` is \`'0'\` or \`'1'\`.`,
    inputFormat: `Line 1: \`m,n\` dimensions.\nNext m lines: binary strings representing each row of the grid.`,
    outputFormat: `An integer representing the number of connected islands.`,
    sampleInput: `4,5\n11110\n11010\n11000\n00000`,
    sampleOutput: `1`,
    points: 150,
    hints: [
      'Iterate through every cell in the matrix. Whenever you find a cell with value "1", increment the island count.',
      'Trigger a DFS or BFS from that cell to sink the entire island by setting all connected "1"s to "0".',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    dim = lines[0].split(',')
    m, n = int(dim[0].strip()), int(dim[1].strip())
    grid = [list(lines[i + 1].strip()) for i in range(m)]
    
    count = 0
    def dfs(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1':
            return
        grid[r][c] = '0'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
        
    for r in range(m):
        for c in range(n):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    print(count)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const [m, n] = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const grid = [];
    for (let i = 0; i < m; i++) {
        grid.push(lines[i + 1].trim().split(''));
    }
    let count = 0;
    function dfs(r, c) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;
        grid[r][c] = '0';
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    console.log(count);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

void dfs(vector<string>& grid, int r, int c, int m, int n) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;
    grid[r][c] = '0';
    dfs(grid, r + 1, c, m, n);
    dfs(grid, r - 1, c, m, n);
    dfs(grid, r, c + 1, m, n);
    dfs(grid, r, c - 1, m, n);
}

int main() {
    string line1;
    if (!getline(cin, line1)) return 0;
    stringstream ss(line1);
    string token;
    getline(ss, token, ',');
    int m = stoi(token);
    getline(ss, token, ',');
    int n = stoi(token);
    vector<string> grid(m);
    for (int i = 0; i < m; i++) getline(cin, grid[i]);
    int count = 0;
    for (int r = 0; r < m; r++) {
        for (int c = 0; c < n; c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c, m, n);
            }
        }
    }
    cout << count << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    static void dfs(char[][] grid, int r, int c, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c, m, n);
        dfs(grid, r - 1, c, m, n);
        dfs(grid, r, c + 1, m, n);
        dfs(grid, r, c - 1, m, n);
    }

    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line1 = reader.readLine();
        if (line1 == null) return;
        String[] dims = line1.split(",");
        int m = Integer.parseInt(dims[0].trim());
        int n = Integer.parseInt(dims[1].trim());
        char[][] grid = new char[m][n];
        for (int i = 0; i < m; i++) {
            grid[i] = reader.readLine().trim().toCharArray();
        }
        int count = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c, m, n);
                }
            }
        }
        System.out.println(count);
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    dim = lines[0].split(',')
    m, n = int(dim[0].strip()), int(dim[1].strip())
    grid = [list(lines[i + 1].strip()) for i in range(m)]
    
    count = 0
    def dfs(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1':
            return
        grid[r][c] = '0'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
        
    for r in range(m):
        for c in range(n):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    print(count)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const [m, n] = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const grid = [];
    for (let i = 0; i < m; i++) {
        grid.push(lines[i + 1].trim().split(''));
    }
    let count = 0;
    function dfs(r, c) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;
        grid[r][c] = '0';
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    console.log(count);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

void dfs(vector<string>& grid, int r, int c, int m, int n) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;
    grid[r][c] = '0';
    dfs(grid, r + 1, c, m, n);
    dfs(grid, r - 1, c, m, n);
    dfs(grid, r, c + 1, m, n);
    dfs(grid, r, c - 1, m, n);
}

int main() {
    string line1;
    if (!getline(cin, line1)) return 0;
    stringstream ss(line1);
    string token;
    getline(ss, token, ',');
    int m = stoi(token);
    getline(ss, token, ',');
    int n = stoi(token);
    vector<string> grid(m);
    for (int i = 0; i < m; i++) getline(cin, grid[i]);
    int count = 0;
    for (int r = 0; r < m; r++) {
        for (int c = 0; c < n; c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c, m, n);
            }
        }
    }
    cout << count << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    static void dfs(char[][] grid, int r, int c, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c, m, n);
        dfs(grid, r - 1, c, m, n);
        dfs(grid, r, c + 1, m, n);
        dfs(grid, r, c - 1, m, n);
    }

    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line1 = reader.readLine();
        if (line1 == null) return;
        String[] dims = line1.split(",");
        int m = Integer.parseInt(dims[0].trim());
        int n = Integer.parseInt(dims[1].trim());
        char[][] grid = new char[m][n];
        for (int i = 0; i < m; i++) {
            grid[i] = reader.readLine().trim().toCharArray();
        }
        int count = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c, m, n);
                }
            }
        }
        System.out.println(count);
    }
}
`,
    },
    editorial: {
      approach: 'Connected Components via Matrix Depth-First Search',
      algorithm: 'Scan the 2D grid. Upon encountering an unvisited land cell (1), increment the component counter and execute a recursive DFS in all 4 cardinal directions, sinking visited land cells by flipping them to 0.',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
      content: 'Every cell in the matrix is examined at most a constant number of times, yielding O(m * n) overall time complexity.',
      referenceCode: `def num_islands(grid):
    if not grid: return 0
    m, n, count = len(grid), len(grid[0]), 0
    def dfs(r, c):
        if 0 <= r < m and 0 <= c < n and grid[r][c] == '1':
            grid[r][c] = '0'
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                dfs(r + dr, c + dc)
    for r in range(m):
        for c in range(n):
            if grid[r][c] == '1':
                count += 1; dfs(r, c)
    return count`,
    },
    tags: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Union Find', 'Matrix'],
    testCases: [
      { input: '4,5\n11110\n11010\n11000\n00000', expectedOutput: '1', isHidden: false },
      { input: '4,5\n11000\n11000\n00100\n00011', expectedOutput: '3', isHidden: false },
      { input: '1,1\n1', expectedOutput: '1', isHidden: false },
      { input: '1,1\n0', expectedOutput: '0', isHidden: true },
      { input: '3,3\n101\n010\n101', expectedOutput: '5', isHidden: true },
    ],
  },

  // 15. Word Search
  {
    title: 'Word Search',
    slug: 'word-search',
    description: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` if \`word\` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a single word path.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- m == board.length\n- n = board[i].length\n- 1 <= m, n <= 6\n- 1 <= word.length <= 15\n- \`board\` and \`word\` consist of only lowercase and uppercase English letters.`,
    inputFormat: `Line 1: \`m,n\` dimensions.\nNext m lines: Comma-separated characters representing each row.\nLast line: Target \`word\`.`,
    outputFormat: `\`true\` or \`false\`.`,
    sampleInput: `3,4\nA,B,C,E\nS,F,C,S\nA,D,E,E\nABCCED`,
    sampleOutput: `true`,
    points: 150,
    hints: [
      'Use backtracking DFS from each matching starting cell.',
      'Temporarily mark visited cells (e.g. board[r][c] = "#") during the recursion, and restore them upon backtracking.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 3:
        return
    dims = lines[0].split(',')
    m, n = int(dims[0].strip()), int(dims[1].strip())
    board = [lines[i + 1].strip().split(',') for i in range(m)]
    word = lines[m + 1].strip()
    
    def backtrack(r, c, idx):
        if idx == len(word):
            return True
        if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != word[idx]:
            return False
        temp = board[r][c]
        board[r][c] = '#'
        found = (
            backtrack(r + 1, c, idx + 1) or
            backtrack(r - 1, c, idx + 1) or
            backtrack(r, c + 1, idx + 1) or
            backtrack(r, c - 1, idx + 1)
        )
        board[r][c] = temp
        return found

    for r in range(m):
        for c in range(n):
            if board[r][c] == word[0] and backtrack(r, c, 0):
                print("true")
                return
    print("false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 3) return;
    const [m, n] = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const board = [];
    for (let i = 0; i < m; i++) {
        board.push(lines[i + 1].trim().split(','));
    }
    const word = lines[m + 1].trim();

    function backtrack(r, c, idx) {
        if (idx === word.length) return true;
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[idx]) return false;
        const temp = board[r][c];
        board[r][c] = '#';
        const found = (
            backtrack(r + 1, c, idx + 1) ||
            backtrack(r - 1, c, idx + 1) ||
            backtrack(r, c + 1, idx + 1) ||
            backtrack(r, c - 1, idx + 1)
        );
        board[r][c] = temp;
        return found;
    }

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (board[r][c] === word[0] && backtrack(r, c, 0)) {
                console.log("true");
                return;
            }
        }
    }
    console.log("false");
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

bool backtrack(vector<vector<char>>& board, string& word, int r, int c, int idx, int m, int n) {
    if (idx == (int)word.length()) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] != word[idx]) return false;
    char temp = board[r][c];
    board[r][c] = '#';
    bool found = backtrack(board, word, r + 1, c, idx + 1, m, n) ||
                 backtrack(board, word, r - 1, c, idx + 1, m, n) ||
                 backtrack(board, word, r, c + 1, idx + 1, m, n) ||
                 backtrack(board, word, r, c - 1, idx + 1, m, n);
    board[r][c] = temp;
    return found;
}

int main() {
    string line1;
    if (!getline(cin, line1)) return 0;
    stringstream ss(line1);
    string token;
    getline(ss, token, ','); int m = stoi(token);
    getline(ss, token, ','); int n = stoi(token);
    vector<vector<char>> board(m, vector<char>(n));
    for (int i = 0; i < m; i++) {
        string row; getline(cin, row);
        stringstream rowSS(row);
        for (int j = 0; j < n; j++) {
            getline(rowSS, token, ',');
            board[i][j] = token[0];
        }
    }
    string word; getline(cin, word);
    for (int r = 0; r < m; r++) {
        for (int c = 0; c < n; c++) {
            if (board[r][c] == word[0] && backtrack(board, word, r, c, 0, m, n)) {
                cout << "true" << endl;
                return 0;
            }
        }
    }
    cout << "false" << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    static boolean backtrack(char[][] board, String word, int r, int c, int idx, int m, int n) {
        if (idx == word.length()) return true;
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] != word.charAt(idx)) return false;
        char temp = board[r][c];
        board[r][c] = '#';
        boolean found = backtrack(board, word, r + 1, c, idx + 1, m, n) ||
                        backtrack(board, word, r - 1, c, idx + 1, m, n) ||
                        backtrack(board, word, r, c + 1, idx + 1, m, n) ||
                        backtrack(board, word, r, c - 1, idx + 1, m, n);
        board[r][c] = temp;
        return found;
    }

    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line1 = reader.readLine();
        if (line1 == null) return;
        String[] dims = line1.split(",");
        int m = Integer.parseInt(dims[0].trim());
        int n = Integer.parseInt(dims[1].trim());
        char[][] board = new char[m][n];
        for (int i = 0; i < m; i++) {
            String[] row = reader.readLine().split(",");
            for (int j = 0; j < n; j++) board[i][j] = row[j].trim().charAt(0);
        }
        String word = reader.readLine().trim();
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == word.charAt(0) && backtrack(board, word, r, c, 0, m, n)) {
                    System.out.println("true");
                    return;
                }
            }
        }
        System.out.println("false");
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 3:
        return
    dims = lines[0].split(',')
    m, n = int(dims[0].strip()), int(dims[1].strip())
    board = [lines[i + 1].strip().split(',') for i in range(m)]
    word = lines[m + 1].strip()
    
    def backtrack(r, c, idx):
        if idx == len(word):
            return True
        if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != word[idx]:
            return False
        temp = board[r][c]
        board[r][c] = '#'
        found = (
            backtrack(r + 1, c, idx + 1) or
            backtrack(r - 1, c, idx + 1) or
            backtrack(r, c + 1, idx + 1) or
            backtrack(r, c - 1, idx + 1)
        )
        board[r][c] = temp
        return found

    for r in range(m):
        for c in range(n):
            if board[r][c] == word[0] and backtrack(r, c, 0):
                print("true")
                return
    print("false")

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 3) return;
    const [m, n] = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const board = [];
    for (let i = 0; i < m; i++) {
        board.push(lines[i + 1].trim().split(','));
    }
    const word = lines[m + 1].trim();

    function backtrack(r, c, idx) {
        if (idx === word.length) return true;
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[idx]) return false;
        const temp = board[r][c];
        board[r][c] = '#';
        const found = (
            backtrack(r + 1, c, idx + 1) ||
            backtrack(r - 1, c, idx + 1) ||
            backtrack(r, c + 1, idx + 1) ||
            backtrack(r, c - 1, idx + 1)
        );
        board[r][c] = temp;
        return found;
    }

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (board[r][c] === word[0] && backtrack(r, c, 0)) {
                console.log("true");
                return;
            }
        }
    }
    console.log("false");
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

bool backtrack(vector<vector<char>>& board, string& word, int r, int c, int idx, int m, int n) {
    if (idx == (int)word.length()) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] != word[idx]) return false;
    char temp = board[r][c];
    board[r][c] = '#';
    bool found = backtrack(board, word, r + 1, c, idx + 1, m, n) ||
                 backtrack(board, word, r - 1, c, idx + 1, m, n) ||
                 backtrack(board, word, r, c + 1, idx + 1, m, n) ||
                 backtrack(board, word, r, c - 1, idx + 1, m, n);
    board[r][c] = temp;
    return found;
}

int main() {
    string line1;
    if (!getline(cin, line1)) return 0;
    stringstream ss(line1);
    string token;
    getline(ss, token, ','); int m = stoi(token);
    getline(ss, token, ','); int n = stoi(token);
    vector<vector<char>> board(m, vector<char>(n));
    for (int i = 0; i < m; i++) {
        string row; getline(cin, row);
        stringstream rowSS(row);
        for (int j = 0; j < n; j++) {
            getline(rowSS, token, ',');
            board[i][j] = token[0];
        }
    }
    string word; getline(cin, word);
    for (int r = 0; r < m; r++) {
        for (int c = 0; c < n; c++) {
            if (board[r][c] == word[0] && backtrack(board, word, r, c, 0, m, n)) {
                cout << "true" << endl;
                return 0;
            }
        }
    }
    cout << "false" << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    static boolean backtrack(char[][] board, String word, int r, int c, int idx, int m, int n) {
        if (idx == word.length()) return true;
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] != word.charAt(idx)) return false;
        char temp = board[r][c];
        board[r][c] = '#';
        boolean found = backtrack(board, word, r + 1, c, idx + 1, m, n) ||
                        backtrack(board, word, r - 1, c, idx + 1, m, n) ||
                        backtrack(board, word, r, c + 1, idx + 1, m, n) ||
                        backtrack(board, word, r, c - 1, idx + 1, m, n);
        board[r][c] = temp;
        return found;
    }

    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line1 = reader.readLine();
        if (line1 == null) return;
        String[] dims = line1.split(",");
        int m = Integer.parseInt(dims[0].trim());
        int n = Integer.parseInt(dims[1].trim());
        char[][] board = new char[m][n];
        for (int i = 0; i < m; i++) {
            String[] row = reader.readLine().split(",");
            for (int j = 0; j < n; j++) board[i][j] = row[j].trim().charAt(0);
        }
        String word = reader.readLine().trim();
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == word.charAt(0) && backtrack(board, word, r, c, 0, m, n)) {
                    System.out.println("true");
                    return;
                }
            }
        }
        System.out.println("false");
    }
}
`,
    },
    editorial: {
      approach: 'Backtracking Search with In-Place Visited Masking',
      algorithm: 'Iterate through all grid cells matching `word[0]`. Recursively search adjacent cells for subsequent characters of `word`. In-place mask the active cell with "#" to prevent duplicate visits in the same path, and unmask upon backtracking.',
      timeComplexity: 'O(m * n * 3^L) where L = word.length',
      spaceComplexity: 'O(L) recursion depth',
      content: 'Branching factor is at most 3 since the predecessor direction is blocked. In-place masking avoids allocating visited matrices.',
      referenceCode: `def exist(board, word):
    m, n = len(board), len(board[0])
    def dfs(r, c, i):
        if i == len(word): return True
        if not (0 <= r < m and 0 <= c < n and board[r][c] == word[i]): return False
        tmp, board[r][c] = board[r][c], '#'
        found = any(dfs(r + dr, c + dc, i + 1) for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)))
        board[r][c] = tmp
        return found
    return any(dfs(r, c, 0) for r in range(m) for c in range(n))`,
    },
    tags: ['Array', 'String', 'Backtracking', 'Matrix'],
    testCases: [
      { input: '3,4\nA,B,C,E\nS,F,C,S\nA,D,E,E\nABCCED', expectedOutput: 'true', isHidden: false },
      { input: '3,4\nA,B,C,E\nS,F,C,S\nA,D,E,E\nSEE', expectedOutput: 'true', isHidden: false },
      { input: '3,4\nA,B,C,E\nS,F,C,S\nA,D,E,E\nABCB', expectedOutput: 'false', isHidden: false },
      { input: '1,1\nA\nA', expectedOutput: 'true', isHidden: true },
      { input: '2,2\nA,B\nC,D\nABCD', expectedOutput: 'false', isHidden: true },
    ],
  },

  // 16. Binary Tree Inorder Traversal
  {
    title: 'Binary Tree Inorder Traversal',
    slug: 'binary-tree-inorder-traversal',
    description: `Given the \`root\` of a binary tree, return the inorder traversal of its nodes' values as a comma-separated list of integers.

**Inorder Traversal**: Traverse the left subtree, visit the root node, traverse the right subtree.`,
    difficulty: Difficulty.EASY,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- The number of nodes in the tree is in the range [0, 100].\n- -100 <= Node.val <= 100`,
    inputFormat: `Line 1: Level-order comma-separated string representation of binary tree (e.g. 1,null,2,3).`,
    outputFormat: `Comma-separated integers representing the inorder traversal values.`,
    sampleInput: `1,null,2,3`,
    sampleOutput: `1,3,2`,
    points: 100,
    hints: [
      'Inorder traversal visits Left, Root, Right in sequence.',
      'Recursively traverse node.left, then process node.val, then traverse node.right.',
    ],
    codeTemplates: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print("")
        return
    parts = [x.strip() for x in line.split(',') if x.strip()]
    if not parts or parts[0] == 'null':
        print("")
        return
    root = TreeNode(int(parts[0]))
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(int(parts[idx]))
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(int(parts[idx]))
            q.append(node.right)
        idx += 1
    res = []
    def inorder(n):
        if not n: return
        inorder(n.left)
        res.append(str(n.val))
        inorder(n.right)
    inorder(root)
    print(",".join(res))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(""); return; }
    const parts = line.split(',').map(x => x.trim()).filter(Boolean);
    if (parts.length === 0 || parts[0] === 'null') { console.log(""); return; }

    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    const root = new TreeNode(parseInt(parts[0], 10));
    const q = [root];
    let idx = 1;
    while (q.length > 0 && idx < parts.length) {
        const node = q.shift();
        if (idx < parts.length && parts[idx] !== 'null') {
            node.left = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.left);
        }
        idx++;
        if (idx < parts.length && parts[idx] !== 'null') {
            node.right = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.right);
        }
        idx++;
    }
    const res = [];
    function inorder(n) {
        if (!n) return;
        inorder(n.left);
        res.push(n.val);
        inorder(n.right);
    }
    inorder(root);
    console.log(res.join(','));
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

void inorder(TreeNode* n, vector<string>& res) {
    if (!n) return;
    inorder(n->left, res);
    res.push_back(to_string(n->val));
    inorder(n->right, res);
}

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) { cout << "" << endl; return 0; }
    stringstream ss(line);
    string token;
    vector<string> parts;
    while (getline(ss, token, ',')) if (!token.empty()) parts.push_back(token);
    if (parts.empty() || parts[0] == "null") { cout << "" << endl; return 0; }

    TreeNode* root = new TreeNode(stoi(parts[0]));
    queue<TreeNode*> q;
    q.push(root);
    int idx = 1;
    while (!q.empty() && idx < parts.size()) {
        TreeNode* node = q.front(); q.pop();
        if (idx < parts.size() && parts[idx] != "null") {
            node->left = new TreeNode(stoi(parts[idx]));
            q.push(node->left);
        }
        idx++;
        if (idx < parts.size() && parts[idx] != "null") {
            node->right = new TreeNode(stoi(parts[idx]));
            q.push(node->right);
        }
        idx++;
    }
    vector<string> res;
    inorder(root, res);
    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? "," : "");
    cout << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }
    static void inorder(TreeNode n, List<String> res) {
        if (n == null) return;
        inorder(n.left, res);
        res.add(String.valueOf(n.val));
        inorder(n.right, res);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) { System.out.println(""); return; }
        String[] parts = line.split(",");
        if (parts.length == 0 || parts[0].trim().equals("null")) { System.out.println(""); return; }

        TreeNode root = new TreeNode(Integer.parseInt(parts[0].trim()));
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        int idx = 1;
        while (!q.isEmpty() && idx < parts.length) {
            TreeNode node = q.poll();
            if (idx < parts.length && !parts[idx].trim().equals("null")) {
                node.left = new TreeNode(Integer.parseInt(parts[idx].trim()));
                q.add(node.left);
            }
            idx++;
            if (idx < parts.length && !parts[idx].trim().equals("null")) {
                node.right = new TreeNode(Integer.parseInt(parts[idx].trim()));
                q.add(node.right);
            }
            idx++;
        }
        List<String> res = new ArrayList<>();
        inorder(root, res);
        System.out.println(String.join(",", res));
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print("")
        return
    parts = [x.strip() for x in line.split(',') if x.strip()]
    if not parts or parts[0] == 'null':
        print("")
        return
    root = TreeNode(int(parts[0]))
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(int(parts[idx]))
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(int(parts[idx]))
            q.append(node.right)
        idx += 1
    res = []
    def inorder(n):
        if not n: return
        inorder(n.left)
        res.append(str(n.val))
        inorder(n.right)
    inorder(root)
    print(",".join(res))

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(""); return; }
    const parts = line.split(',').map(x => x.trim()).filter(Boolean);
    if (parts.length === 0 || parts[0] === 'null') { console.log(""); return; }

    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    const root = new TreeNode(parseInt(parts[0], 10));
    const q = [root];
    let idx = 1;
    while (q.length > 0 && idx < parts.length) {
        const node = q.shift();
        if (idx < parts.length && parts[idx] !== 'null') {
            node.left = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.left);
        }
        idx++;
        if (idx < parts.length && parts[idx] !== 'null') {
            node.right = new TreeNode(parseInt(parts[idx], 10));
            q.push(node.right);
        }
        idx++;
    }
    const res = [];
    function inorder(n) {
        if (!n) return;
        inorder(n.left);
        res.push(n.val);
        inorder(n.right);
    }
    inorder(root);
    console.log(res.join(','));
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

void inorder(TreeNode* n, vector<string>& res) {
    if (!n) return;
    inorder(n->left, res);
    res.push_back(to_string(n->val));
    inorder(n->right, res);
}

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) { cout << "" << endl; return 0; }
    stringstream ss(line);
    string token;
    vector<string> parts;
    while (getline(ss, token, ',')) if (!token.empty()) parts.push_back(token);
    if (parts.empty() || parts[0] == "null") { cout << "" << endl; return 0; }

    TreeNode* root = new TreeNode(stoi(parts[0]));
    queue<TreeNode*> q;
    q.push(root);
    int idx = 1;
    while (!q.empty() && idx < parts.size()) {
        TreeNode* node = q.front(); q.pop();
        if (idx < parts.size() && parts[idx] != "null") {
            node->left = new TreeNode(stoi(parts[idx]));
            q.push(node->left);
        }
        idx++;
        if (idx < parts.size() && parts[idx] != "null") {
            node->right = new TreeNode(stoi(parts[idx]));
            q.push(node->right);
        }
        idx++;
    }
    vector<string> res;
    inorder(root, res);
    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? "," : "");
    cout << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }
    static void inorder(TreeNode n, List<String> res) {
        if (n == null) return;
        inorder(n.left, res);
        res.add(String.valueOf(n.val));
        inorder(n.right, res);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) { System.out.println(""); return; }
        String[] parts = line.split(",");
        if (parts.length == 0 || parts[0].trim().equals("null")) { System.out.println(""); return; }

        TreeNode root = new TreeNode(Integer.parseInt(parts[0].trim()));
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        int idx = 1;
        while (!q.isEmpty() && idx < parts.length) {
            TreeNode node = q.poll();
            if (idx < parts.length && !parts[idx].trim().equals("null")) {
                node.left = new TreeNode(Integer.parseInt(parts[idx].trim()));
                q.add(node.left);
            }
            idx++;
            if (idx < parts.length && !parts[idx].trim().equals("null")) {
                node.right = new TreeNode(Integer.parseInt(parts[idx].trim()));
                q.add(node.right);
            }
            idx++;
        }
        List<String> res = new ArrayList<>();
        inorder(root, res);
        System.out.println(String.join(",", res));
    }
}
`,
    },
    editorial: {
      approach: 'Depth-First Recursive Left-Root-Right Traversal',
      algorithm: 'Traverse left subtree recursively, record current node value, and traverse right subtree.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      content: 'Every node in the binary tree is visited exactly once.',
      referenceCode: `def inorder_traversal(root):
    res = []
    def helper(n):
        if not n: return
        helper(n.left); res.append(n.val); helper(n.right)
    helper(root)
    return res`,
    },
    tags: ['Tree', 'Depth-First Search', 'Binary Tree'],
    testCases: [
      { input: '1,null,2,3', expectedOutput: '1,3,2', isHidden: false },
      { input: '', expectedOutput: '', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: false },
      { input: '1,2,3,4,5', expectedOutput: '4,2,5,1,3', isHidden: true },
    ],
  },

  // 17. Coin Change
  {
    title: 'Coin Change',
    slug: 'coin-change',
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    difficulty: Difficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- 1 <= coins.length <= 12\n- 1 <= coins[i] <= 2^31 - 1\n- 0 <= amount <= 10^4`,
    inputFormat: `Line 1: Comma-separated integers representing \`coins\`.\nLine 2: An integer representing \`amount\`.`,
    outputFormat: `An integer representing the fewest coins needed, or \`-1\`.`,
    sampleInput: `1,2,5\n11`,
    sampleOutput: `3`,
    points: 150,
    hints: [
      'Define dp[i] as the minimum coins needed to make amount i.',
      'For each coin c, dp[i] = min(dp[i], dp[i - c] + 1) for all i >= c.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    coins = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
    amount = int(lines[1].strip())
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] = min(dp[i], dp[i - coin] + 1)
    print(dp[amount] if dp[amount] != float('inf') else -1)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const coins = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const amount = parseInt(lines[1].trim(), 10);
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    console.log(dp[amount] !== Infinity ? dp[amount] : -1);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line1, line2;
    if (!getline(cin, line1) || !getline(cin, line2)) return 0;
    stringstream ss(line1);
    string token;
    vector<int> coins;
    while (getline(ss, token, ',')) if (!token.empty()) coins.push_back(stoi(token));
    int amount = stoi(line2);
    vector<int> dp(amount + 1, 1e9);
    dp[0] = 0;
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            dp[i] = min(dp[i], dp[i - coin] + 1);
        }
    }
    cout << (dp[amount] >= 1e9 ? -1 : dp[amount]) << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line1 = reader.readLine();
        String line2 = reader.readLine();
        if (line1 == null || line2 == null) return;
        String[] parts = line1.split(",");
        int[] coins = new int[parts.length];
        for (int i = 0; i < parts.length; i++) coins[i] = Integer.parseInt(parts[i].trim());
        int amount = Integer.parseInt(line2.trim());
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, (int)1e9);
        dp[0] = 0;
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
        System.out.println(dp[amount] >= (int)1e9 ? -1 : dp[amount]);
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    coins = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
    amount = int(lines[1].strip())
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] = min(dp[i], dp[i - coin] + 1)
    print(dp[amount] if dp[amount] != float('inf') else -1)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const coins = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const amount = parseInt(lines[1].trim(), 10);
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    console.log(dp[amount] !== Infinity ? dp[amount] : -1);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line1, line2;
    if (!getline(cin, line1) || !getline(cin, line2)) return 0;
    stringstream ss(line1);
    string token;
    vector<int> coins;
    while (getline(ss, token, ',')) if (!token.empty()) coins.push_back(stoi(token));
    int amount = stoi(line2);
    vector<int> dp(amount + 1, 1e9);
    dp[0] = 0;
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            dp[i] = min(dp[i], dp[i - coin] + 1);
        }
    }
    cout << (dp[amount] >= 1e9 ? -1 : dp[amount]) << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line1 = reader.readLine();
        String line2 = reader.readLine();
        if (line1 == null || line2 == null) return;
        String[] parts = line1.split(",");
        int[] coins = new int[parts.length];
        for (int i = 0; i < parts.length; i++) coins[i] = Integer.parseInt(parts[i].trim());
        int amount = Integer.parseInt(line2.trim());
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, (int)1e9);
        dp[0] = 0;
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
        System.out.println(dp[amount] >= (int)1e9 ? -1 : dp[amount]);
    }
}
`,
    },
    editorial: {
      approach: 'Bottom-Up 1D Tabulation Dynamic Programming',
      algorithm: 'Initialize a dp table of size amount + 1 with infinity and dp[0] = 0. Iterate through each coin and update dp[i] = min(dp[i], dp[i - coin] + 1).',
      timeComplexity: 'O(amount * coins.length)',
      spaceComplexity: 'O(amount)',
      content: 'Standard unbounded knapsack pattern with 1D table space optimization.',
      referenceCode: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for c in coins:
        for i in range(c, amount + 1):
            dp[i] = min(dp[i], dp[i - c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
    },
    tags: ['Array', 'Dynamic Programming', 'Breadth-First Search'],
    testCases: [
      { input: '1,2,5\n11', expectedOutput: '3', isHidden: false },
      { input: '2\n3', expectedOutput: '-1', isHidden: false },
      { input: '1\n0', expectedOutput: '0', isHidden: false },
      { input: '1,5,10,25\n30', expectedOutput: '2', isHidden: true },
    ],
  },

  // 18. Trapping Rain Water
  {
    title: 'Trapping Rain Water',
    slug: 'trapping-rain-water',
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- n == height.length\n- 1 <= n <= 2 * 10^4\n- 0 <= height[i] <= 10^5`,
    inputFormat: `Line 1: Comma-separated integers representing the elevation \`height\`.`,
    outputFormat: `An integer representing the total trapped water units.`,
    sampleInput: `0,1,0,2,1,0,1,3,2,1,2,1`,
    sampleOutput: `6`,
    points: 200,
    hints: [
      'The trapped water at index i is determined by min(max_left, max_right) - height[i].',
      'Use two pointers starting at left = 0 and right = n - 1, moving the smaller boundary inward.',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print(0)
        return
    height = [int(x.strip()) for x in line.split(',') if x.strip()]
    if not height:
        print(0)
        return
    l, r = 0, len(height) - 1
    left_max, right_max = height[l], height[r]
    water = 0
    while l < r:
        if left_max < right_max:
            l += 1
            left_max = max(left_max, height[l])
            water += left_max - height[l]
        else:
            r -= 1
            right_max = max(right_max, height[r])
            water += right_max - height[r]
    print(water)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(0); return; }
    const height = line.split(',').map(x => parseInt(x.trim(), 10));
    if (height.length === 0) { console.log(0); return; }
    let l = 0, r = height.length - 1;
    let leftMax = height[l], rightMax = height[r];
    let water = 0;
    while (l < r) {
        if (leftMax < rightMax) {
            l++;
            leftMax = Math.max(leftMax, height[l]);
            water += leftMax - height[l];
        } else {
            r--;
            rightMax = Math.max(rightMax, height[r]);
            water += rightMax - height[r];
        }
    }
    console.log(water);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) { cout << 0 << endl; return 0; }
    stringstream ss(line);
    string token;
    vector<int> height;
    while (getline(ss, token, ',')) if (!token.empty()) height.push_back(stoi(token));
    if (height.empty()) { cout << 0 << endl; return 0; }
    int l = 0, r = (int)height.size() - 1;
    int leftMax = height[l], rightMax = height[r];
    long long water = 0;
    while (l < r) {
        if (leftMax < rightMax) {
            l++;
            leftMax = max(leftMax, height[l]);
            water += leftMax - height[l];
        } else {
            r--;
            rightMax = max(rightMax, height[r]);
            water += rightMax - height[r];
        }
    }
    cout << water << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) { System.out.println(0); return; }
        String[] parts = line.split(",");
        int[] height = new int[parts.length];
        for (int i = 0; i < parts.length; i++) height[i] = Integer.parseInt(parts[i].trim());
        int l = 0, r = height.length - 1;
        int leftMax = height[l], rightMax = height[r];
        long water = 0;
        while (l < r) {
            if (leftMax < rightMax) {
                l++;
                leftMax = Math.max(leftMax, height[l]);
                water += leftMax - height[l];
            } else {
                r--;
                rightMax = Math.max(rightMax, height[r]);
                water += rightMax - height[r];
            }
        }
        System.out.println(water);
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print(0)
        return
    height = [int(x.strip()) for x in line.split(',') if x.strip()]
    if not height:
        print(0)
        return
    l, r = 0, len(height) - 1
    left_max, right_max = height[l], height[r]
    water = 0
    while l < r:
        if left_max < right_max:
            l += 1
            left_max = max(left_max, height[l])
            water += left_max - height[l]
        else:
            r -= 1
            right_max = max(right_max, height[r])
            water += right_max - height[r]
    print(water)

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const line = fs.readFileSync(0, 'utf-8').trim();
    if (!line) { console.log(0); return; }
    const height = line.split(',').map(x => parseInt(x.trim(), 10));
    if (height.length === 0) { console.log(0); return; }
    let l = 0, r = height.length - 1;
    let leftMax = height[l], rightMax = height[r];
    let water = 0;
    while (l < r) {
        if (leftMax < rightMax) {
            l++;
            leftMax = Math.max(leftMax, height[l]);
            water += leftMax - height[l];
        } else {
            r--;
            rightMax = Math.max(rightMax, height[r]);
            water += rightMax - height[r];
        }
    }
    console.log(water);
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (!getline(cin, line) || line.empty()) { cout << 0 << endl; return 0; }
    stringstream ss(line);
    string token;
    vector<int> height;
    while (getline(ss, token, ',')) if (!token.empty()) height.push_back(stoi(token));
    if (height.empty()) { cout << 0 << endl; return 0; }
    int l = 0, r = (int)height.size() - 1;
    int leftMax = height[l], rightMax = height[r];
    long long water = 0;
    while (l < r) {
        if (leftMax < rightMax) {
            l++;
            leftMax = max(leftMax, height[l]);
            water += leftMax - height[l];
        } else {
            r--;
            rightMax = max(rightMax, height[r]);
            water += rightMax - height[r];
        }
    }
    cout << water << endl;
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) { System.out.println(0); return; }
        String[] parts = line.split(",");
        int[] height = new int[parts.length];
        for (int i = 0; i < parts.length; i++) height[i] = Integer.parseInt(parts[i].trim());
        int l = 0, r = height.length - 1;
        int leftMax = height[l], rightMax = height[r];
        long water = 0;
        while (l < r) {
            if (leftMax < rightMax) {
                l++;
                leftMax = Math.max(leftMax, height[l]);
                water += leftMax - height[l];
            } else {
                r--;
                rightMax = Math.max(rightMax, height[r]);
                water += rightMax - height[r];
            }
        }
        System.out.println(water);
    }
}
`,
    },
    editorial: {
      approach: 'Two-Pointer Bidirectional Boundary Optimization',
      algorithm: 'Maintain left_max and right_max from both ends. Move the pointer on the smaller side inward, updating the bound and adding the trapped volume.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      content: 'A single linear pass computes trapped elevation with O(1) auxiliary space.',
      referenceCode: `def trap(height):
    l, r = 0, len(height) - 1
    l_max, r_max, res = height[l], height[r], 0
    while l < r:
        if l_max < r_max:
            l += 1; l_max = max(l_max, height[l]); res += l_max - height[l]
        else:
            r -= 1; r_max = max(r_max, height[r]); res += r_max - height[r]
    return res`,
    },
    tags: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack'],
    testCases: [
      { input: '0,1,0,2,1,0,1,3,2,1,2,1', expectedOutput: '6', isHidden: false },
      { input: '4,2,0,3,2,5', expectedOutput: '9', isHidden: false },
      { input: '1', expectedOutput: '0', isHidden: false },
      { input: '3,0,2,0,4', expectedOutput: '7', isHidden: true },
    ],
  },

  // 19. Median of Two Sorted Arrays
  {
    title: 'Median of Two Sorted Arrays',
    slug: 'median-of-two-sorted-arrays',
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the median of the two sorted arrays.

The overall run time complexity should be **O(log (m+n))**.`,
    difficulty: Difficulty.HARD,
    timeLimit: 2000,
    memoryLimit: 256,
    constraints: `- nums1.length == m\n- nums2.length == n\n- 0 <= m, n <= 1000\n- 1 <= m + n <= 2000\n- -10^6 <= nums1[i], nums2[i] <= 10^6`,
    inputFormat: `Line 1: Comma-separated integers for \`nums1\`.\nLine 2: Comma-separated integers for \`nums2\`.`,
    outputFormat: `The median formatted to 5 decimal places or integer format.`,
    sampleInput: `1,3\n2`,
    sampleOutput: `2.00000`,
    points: 200,
    hints: [
      'Perform binary search on the shorter array to find the partition cut.',
      'Ensure max(left1, left2) <= min(right1, right2).',
    ],
    codeTemplates: {
      python: `import sys

def solve():
    raw = sys.stdin.read()
    lines = raw.splitlines()
    line1 = lines[0].strip() if len(lines) > 0 else ""
    line2 = lines[1].strip() if len(lines) > 1 else ""
    nums1 = [int(x.strip()) for x in line1.split(',') if x.strip()]
    nums2 = [int(x.strip()) for x in line2.split(',') if x.strip()]
    
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    l, r = 0, m
    while l <= r:
        i = (l + r) // 2
        j = (m + n + 1) // 2 - i
        max_l1 = float('-inf') if i == 0 else nums1[i - 1]
        min_r1 = float('inf') if i == m else nums1[i]
        max_l2 = float('-inf') if j == 0 else nums2[j - 1]
        min_r2 = float('inf') if j == n else nums2[j]
        
        if max_l1 <= min_r2 and max_l2 <= min_r1:
            if (m + n) % 2 == 1:
                print(f"{max(max_l1, max_l2):.5f}")
            else:
                print(f"{(max(max_l1, max_l2) + min(min_r1, min_r2)) / 2.0:.5f}")
            return
        elif max_l1 > min_r2:
            r = i - 1
        else:
            l = i + 1

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8');
    const lines = raw.split(/\\r?\\n/);
    const line1 = lines.length > 0 ? lines[0].trim() : '';
    const line2 = lines.length > 1 ? lines[1].trim() : '';
    let nums1 = line1 ? line1.split(',').map(x => x.trim()).filter(Boolean).map(Number) : [];
    let nums2 = line2 ? line2.split(',').map(x => x.trim()).filter(Boolean).map(Number) : [];

    if (nums1.length > nums2.length) {
        const temp = nums1; nums1 = nums2; nums2 = temp;
    }
    const m = nums1.length, n = nums2.length;
    let l = 0, r = m;
    while (l <= r) {
        const i = Math.floor((l + r) / 2);
        const j = Math.floor((m + n + 1) / 2) - i;
        const maxL1 = i === 0 ? -Infinity : nums1[i - 1];
        const minR1 = i === m ? Infinity : nums1[i];
        const maxL2 = j === 0 ? -Infinity : nums2[j - 1];
        const minR2 = j === n ? Infinity : nums2[j];

        if (maxL1 <= minR2 && maxL2 <= minR1) {
            if ((m + n) % 2 === 1) {
                console.log(Math.max(maxL1, maxL2).toFixed(5));
            } else {
                console.log(((Math.max(maxL1, maxL2) + Math.min(minR1, minR2)) / 2.0).toFixed(5));
            }
            return;
        } else if (maxL1 > minR2) {
            r = i - 1;
        } else {
            l = i + 1;
        }
    }
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <iomanip>
#include <algorithm>
using namespace std;

int main() {
    string line1, line2;
    if (!getline(cin, line1)) line1 = "";
    if (!getline(cin, line2)) line2 = "";
    stringstream ss1(line1), ss2(line2);
    string token;
    vector<int> nums1, nums2;
    while (getline(ss1, token, ',')) if (!token.empty()) nums1.push_back(stoi(token));
    while (getline(ss2, token, ',')) if (!token.empty()) nums2.push_back(stoi(token));

    if (nums1.size() > nums2.size()) swap(nums1, nums2);
    int m = nums1.size(), n = nums2.size();
    int l = 0, r = m;
    while (l <= r) {
        int i = (l + r) / 2;
        int j = (m + n + 1) / 2 - i;
        int maxL1 = (i == 0) ? -2e9 : nums1[i - 1];
        int minR1 = (i == m) ? 2e9 : nums1[i];
        int maxL2 = (j == 0) ? -2e9 : nums2[j - 1];
        int minR2 = (j == n) ? 2e9 : nums2[j];

        if (maxL1 <= minR2 && maxL2 <= minR1) {
            if ((m + n) % 2 == 1) {
                cout << fixed << setprecision(5) << (double)max(maxL1, maxL2) << endl;
            } else {
                cout << fixed << setprecision(5) << ((double)max(maxL1, maxL2) + (double)min(minR1, minR2)) / 2.0 << endl;
            }
            return 0;
        } else if (maxL1 > minR2) {
            r = i - 1;
        } else {
            l = i + 1;
        }
    }
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line1 = reader.readLine();
        String line2 = reader.readLine();
        if (line1 == null) line1 = "";
        if (line2 == null) line2 = "";
        List<Integer> list1 = new ArrayList<>(), list2 = new ArrayList<>();
        for (String s : line1.split(",")) if (!s.trim().isEmpty()) list1.add(Integer.parseInt(s.trim()));
        for (String s : line2.split(",")) if (!s.trim().isEmpty()) list2.add(Integer.parseInt(s.trim()));

        if (list1.size() > list2.size()) {
            List<Integer> temp = list1; list1 = list2; list2 = temp;
        }
        int m = list1.size(), n = list2.size();
        int l = 0, r = m;
        while (l <= r) {
            int i = (l + r) / 2;
            int j = (m + n + 1) / 2 - i;
            int maxL1 = (i == 0) ? (int)-2e9 : list1.get(i - 1);
            int minR1 = (i == m) ? (int)2e9 : list1.get(i);
            int maxL2 = (j == 0) ? (int)-2e9 : list2.get(j - 1);
            int minR2 = (j == n) ? (int)2e9 : list2.get(j);

            if (maxL1 <= minR2 && maxL2 <= minR1) {
                if ((m + n) % 2 == 1) {
                    System.out.println(String.format(Locale.US, "%.5f", (double)Math.max(maxL1, maxL2)));
                } else {
                    System.out.println(String.format(Locale.US, "%.5f", ((double)Math.max(maxL1, maxL2) + (double)Math.min(minR1, minR2)) / 2.0));
                }
                return;
            } else if (maxL1 > minR2) {
                r = i - 1;
            } else {
                l = i + 1;
            }
        }
    }
}
`,
    },
    referenceSolutions: {
      python: `import sys

def solve():
    raw = sys.stdin.read()
    lines = raw.splitlines()
    line1 = lines[0].strip() if len(lines) > 0 else ""
    line2 = lines[1].strip() if len(lines) > 1 else ""
    nums1 = [int(x.strip()) for x in line1.split(',') if x.strip()]
    nums2 = [int(x.strip()) for x in line2.split(',') if x.strip()]
    
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    l, r = 0, m
    while l <= r:
        i = (l + r) // 2
        j = (m + n + 1) // 2 - i
        max_l1 = float('-inf') if i == 0 else nums1[i - 1]
        min_r1 = float('inf') if i == m else nums1[i]
        max_l2 = float('-inf') if j == 0 else nums2[j - 1]
        min_r2 = float('inf') if j == n else nums2[j]
        
        if max_l1 <= min_r2 and max_l2 <= min_r1:
            if (m + n) % 2 == 1:
                print(f"{max(max_l1, max_l2):.5f}")
            else:
                print(f"{(max(max_l1, max_l2) + min(min_r1, min_r2)) / 2.0:.5f}")
            return
        elif max_l1 > min_r2:
            r = i - 1
        else:
            l = i + 1

solve()
`,
      javascript: `const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8');
    const lines = raw.split(/\\r?\\n/);
    const line1 = lines.length > 0 ? lines[0].trim() : '';
    const line2 = lines.length > 1 ? lines[1].trim() : '';
    let nums1 = line1 ? line1.split(',').map(x => x.trim()).filter(Boolean).map(Number) : [];
    let nums2 = line2 ? line2.split(',').map(x => x.trim()).filter(Boolean).map(Number) : [];

    if (nums1.length > nums2.length) {
        const temp = nums1; nums1 = nums2; nums2 = temp;
    }
    const m = nums1.length, n = nums2.length;
    let l = 0, r = m;
    while (l <= r) {
        const i = Math.floor((l + r) / 2);
        const j = Math.floor((m + n + 1) / 2) - i;
        const maxL1 = i === 0 ? -Infinity : nums1[i - 1];
        const minR1 = i === m ? Infinity : nums1[i];
        const maxL2 = j === 0 ? -Infinity : nums2[j - 1];
        const minR2 = j === n ? Infinity : nums2[j];

        if (maxL1 <= minR2 && maxL2 <= minR1) {
            if ((m + n) % 2 === 1) {
                console.log(Math.max(maxL1, maxL2).toFixed(5));
            } else {
                console.log(((Math.max(maxL1, maxL2) + Math.min(minR1, minR2)) / 2.0).toFixed(5));
            }
            return;
        } else if (maxL1 > minR2) {
            r = i - 1;
        } else {
            l = i + 1;
        }
    }
}

solve();
`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <iomanip>
#include <algorithm>
using namespace std;

int main() {
    string line1, line2;
    if (!getline(cin, line1) || !getline(cin, line2)) return 0;
    stringstream ss1(line1), ss2(line2);
    string token;
    vector<int> nums1, nums2;
    while (getline(ss1, token, ',')) if (!token.empty()) nums1.push_back(stoi(token));
    while (getline(ss2, token, ',')) if (!token.empty()) nums2.push_back(stoi(token));

    if (nums1.size() > nums2.size()) swap(nums1, nums2);
    int m = nums1.size(), n = nums2.size();
    int l = 0, r = m;
    while (l <= r) {
        int i = (l + r) / 2;
        int j = (m + n + 1) / 2 - i;
        int maxL1 = (i == 0) ? -2e9 : nums1[i - 1];
        int minR1 = (i == m) ? 2e9 : nums1[i];
        int maxL2 = (j == 0) ? -2e9 : nums2[j - 1];
        int minR2 = (j == n) ? 2e9 : nums2[j];

        if (maxL1 <= minR2 && maxL2 <= minR1) {
            if ((m + n) % 2 == 1) {
                cout << fixed << setprecision(5) << (double)max(maxL1, maxL2) << endl;
            } else {
                cout << fixed << setprecision(5) << ((double)max(maxL1, maxL2) + (double)min(minR1, minR2)) / 2.0 << endl;
            }
            return 0;
        } else if (maxL1 > minR2) {
            r = i - 1;
        } else {
            l = i + 1;
        }
    }
    return 0;
}
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line1 = reader.readLine();
        String line2 = reader.readLine();
        if (line1 == null || line2 == null) return;
        List<Integer> list1 = new ArrayList<>(), list2 = new ArrayList<>();
        for (String s : line1.split(",")) if (!s.trim().isEmpty()) list1.add(Integer.parseInt(s.trim()));
        for (String s : line2.split(",")) if (!s.trim().isEmpty()) list2.add(Integer.parseInt(s.trim()));

        if (list1.size() > list2.size()) {
            List<Integer> temp = list1; list1 = list2; list2 = temp;
        }
        int m = list1.size(), n = list2.size();
        int l = 0, r = m;
        while (l <= r) {
            int i = (l + r) / 2;
            int j = (m + n + 1) / 2 - i;
            int maxL1 = (i == 0) ? (int)-2e9 : list1.get(i - 1);
            int minR1 = (i == m) ? (int)2e9 : list1.get(i);
            int maxL2 = (j == 0) ? (int)-2e9 : list2.get(j - 1);
            int minR2 = (j == n) ? (int)2e9 : list2.get(j);

            if (maxL1 <= minR2 && maxL2 <= minR1) {
                if ((m + n) % 2 == 1) {
                    System.out.println(String.format(Locale.US, "%.5f", (double)Math.max(maxL1, maxL2)));
                } else {
                    System.out.println(String.format(Locale.US, "%.5f", ((double)Math.max(maxL1, maxL2) + (double)Math.min(minR1, minR2)) / 2.0));
                }
                return;
            } else if (maxL1 > minR2) {
                r = i - 1;
            } else {
                l = i + 1;
            }
        }
    }
}
`,
    },
    editorial: {
      approach: 'Logarithmic Binary Search on Array Partition Boundaries',
      algorithm: 'Perform binary search on partition cuts of the shorter array in O(log(min(m, n))) time.',
      timeComplexity: 'O(log(min(m, n)))',
      spaceComplexity: 'O(1)',
      content: 'Binary search on partition cuts achieves logarithmic complexity without merging arrays.',
      referenceCode: `def find_median_sorted_arrays(nums1, nums2):
    if len(nums1) > len(nums2): nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    l, r = 0, m
    while l <= r:
        i = (l + r) // 2
        j = (m + n + 1) // 2 - i
        max_l1 = float('-inf') if i == 0 else nums1[i - 1]
        min_r1 = float('inf') if i == m else nums1[i]
        max_l2 = float('-inf') if j == 0 else nums2[j - 1]
        min_r2 = float('inf') if j == n else nums2[j]
        if max_l1 <= min_r2 and max_l2 <= min_r1:
            if (m + n) % 2 == 1: return float(max(max_l1, max_l2))
            return (max(max_l1, max_l2) + min(min_r1, min_r2)) / 2.0
        elif max_l1 > min_r2: r = i - 1
        else: l = i + 1`,
    },
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    testCases: [
      { input: '1,3\n2', expectedOutput: '2.00000', isHidden: false },
      { input: '1,2\n3,4', expectedOutput: '2.50000', isHidden: false },
      { input: '0,0\n0,0', expectedOutput: '0.00000', isHidden: true },
      { input: '\n1', expectedOutput: '1.00000', isHidden: true },
    ],
  },
];
