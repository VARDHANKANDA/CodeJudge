import { PrismaClient, Difficulty, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting idempotent database seed...');

  // 1. Create default roles & users
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const setterPasswordHash = await bcrypt.hash('setter123', 10);
  const userPasswordHash = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@codejudge.com' },
    update: {},
    create: {
      email: 'admin@codejudge.com',
      username: 'admin',
      name: 'System Admin',
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
      isEmailVerified: true,
      points: 0,
      rating: 1500,
    },
  });

  const setter = await prisma.user.upsert({
    where: { email: 'setter@codejudge.com' },
    update: {},
    create: {
      email: 'setter@codejudge.com',
      username: 'setter',
      name: 'Problem Setter',
      passwordHash: setterPasswordHash,
      role: Role.PROBLEM_SETTER,
      isEmailVerified: true,
      points: 0,
      rating: 1500,
    },
  });

  const testUser = await prisma.user.upsert({
    where: { email: 'user@codejudge.com' },
    update: {},
    create: {
      email: 'user@codejudge.com',
      username: 'coder_ram',
      name: 'Ram Kumar',
      passwordHash: userPasswordHash,
      role: Role.USER,
      isEmailVerified: true,
      points: 0,
      rating: 1500,
    },
  });

  // 2. Define the 10 Problem datasets with templates and testcases
  const problemDefs = [
    {
      title: 'Two Sum',
      slug: 'two-sum',
      description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
      difficulty: Difficulty.EASY,
      timeLimit: 2000,
      memoryLimit: 256,
      constraints: '- 2 <= nums.length <= 10^4\n- -10^9 <= nums[i] <= 10^9\n- -10^9 <= target <= 10^9\n- Only one valid answer exists.',
      codeTemplates: {
        python: `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
    target = int(lines[1].strip())
    
    lookup = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in lookup:
            print(f"[{lookup[diff]},{i}]")
            return
        lookup[num] = i
    print("[]")

solve()
`,
        javascript: `const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    if (lines.length < 2) return;
    const nums = lines[0].split(',').map(x => parseInt(x.trim(), 10));
    const target = parseInt(lines[1].trim(), 10);
    
    const lookup = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (lookup.has(diff)) {
            console.log(\`[\${lookup.get(diff)},\${i}]\`);
            return;
        }
        lookup.set(nums[i], i);
    }
    console.log("[]");
}

solve();
`,
        cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <unordered_map>
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
    
    unordered_map<int, int> lookup;
    for (int i = 0; i < nums.size(); i++) {
        int diff = target - nums[i];
        if (lookup.find(diff) != lookup.end()) {
            cout << "[" << lookup[diff] << "," << i << "]" << endl;
            return 0;
        }
        lookup[nums[i]] = i;
    }
    cout << "[]" << endl;
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
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i].trim());
        }
        int target = Integer.parseInt(line2.trim());
        
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (map.containsKey(diff)) {
                System.out.println("[" + map.get(diff) + "," + i + "]");
                return;
            }
            map.put(nums[i], i);
        }
        System.out.println("[]");
    }
}
`,
      },
      sampleInput: '2,7,11,15\n9',
      sampleOutput: '[0,1]',
      points: 100,
      testCases: [
        { input: '2,7,11,15\n9', expectedOutput: '[0,1]', isHidden: false, order: 0 },
        { input: '3,2,4\n6', expectedOutput: '[1,2]', isHidden: false, order: 1 },
        { input: '3,3\n6', expectedOutput: '[0,1]', isHidden: true, order: 2 },
      ],
    },
    {
      title: 'Reverse a String',
      slug: 'reverse-a-string',
      description: 'Write a function that reverses a string given as input.\n\nInput is provided on a single line via standard input.\nOutput the reversed string.',
      difficulty: Difficulty.EASY,
      timeLimit: 1000,
      memoryLimit: 128,
      constraints: '- 1 <= s.length <= 10^5\n- s consists of printable ASCII characters.',
      codeTemplates: {
        python: `import sys
s = sys.stdin.read().strip()
print(s[::-1])
`,
        javascript: `const fs = require('fs');
const s = fs.readFileSync(0, 'utf-8').trim();
console.log(s.split('').reverse().join(''));
`,
        cpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    if (getline(cin, s)) {
        reverse(s.begin(), s.end());
        cout << s << endl;
    }
    return 0;
}
`,
        java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String s = reader.readLine();
        if (s != null) {
            System.out.println(new StringBuilder(s).reverse().toString());
        }
    }
}
`,
      },
      sampleInput: 'hello',
      sampleOutput: 'olleh',
      points: 100,
      testCases: [
        { input: 'hello', expectedOutput: 'olleh', isHidden: false, order: 0 },
        { input: 'CodeJudge', expectedOutput: 'egduJedoC', isHidden: false, order: 1 },
        { input: 'racecar', expectedOutput: 'racecar', isHidden: true, order: 2 },
      ],
    },
    {
      title: 'Maximum Subarray',
      slug: 'maximum-subarray',
      description: 'Given an integer array `nums` separated by commas, find the subarray with the largest sum, and return its sum.\n\nSolve in O(N) using Kadane\'s algorithm.',
      difficulty: Difficulty.MEDIUM,
      timeLimit: 2000,
      memoryLimit: 256,
      constraints: '- 1 <= nums.length <= 10^5\n- -10^4 <= nums[i] <= 10^4',
      codeTemplates: {
        python: `import sys
nums = [int(x.strip()) for x in sys.stdin.read().strip().split(',') if x.strip()]
max_sum = cur_sum = nums[0]
for x in nums[1:]:
    cur_sum = max(x, cur_sum + x)
    max_sum = max(max_sum, cur_sum)
print(max_sum)
`,
        javascript: `const fs = require('fs');
const nums = fs.readFileSync(0, 'utf-8').trim().split(',').map(x => parseInt(x.trim(), 10));
let maxSum = nums[0];
let curSum = nums[0];
for (let i = 1; i < nums.length; i++) {
    curSum = Math.max(nums[i], curSum + nums[i]);
    maxSum = Math.max(maxSum, curSum);
}
console.log(maxSum);
`,
        cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (!getline(cin, line)) return 0;
    stringstream ss(line);
    string token;
    vector<int> nums;
    while (getline(ss, token, ',')) {
        if (!token.empty()) nums.push_back(stoi(token));
    }
    int maxSum = nums[0], curSum = nums[0];
    for (size_t i = 1; i < nums.size(); i++) {
        curSum = max(nums[i], curSum + nums[i]);
        maxSum = max(maxSum, curSum);
    }
    cout << maxSum << endl;
    return 0;
}
`,
        java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null) return;
        String[] parts = line.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());
        int maxSum = nums[0], curSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            curSum = Math.max(nums[i], curSum + nums[i]);
            maxSum = Math.max(maxSum, curSum);
        }
        System.out.println(maxSum);
    }
}
`,
      },
      sampleInput: '-2,1,-3,4,-1,2,1,-5,4',
      sampleOutput: '6',
      points: 200,
      testCases: [
        { input: '-2,1,-3,4,-1,2,1,-5,4', expectedOutput: '6', isHidden: false, order: 0 },
        { input: '1', expectedOutput: '1', isHidden: false, order: 1 },
        { input: '5,4,-1,7,8', expectedOutput: '23', isHidden: true, order: 2 },
      ],
    },
    {
      title: 'Valid Parentheses',
      slug: 'valid-parentheses',
      description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.\n\nPrint `true` or `false`.',
      difficulty: Difficulty.EASY,
      timeLimit: 1500,
      memoryLimit: 128,
      constraints: '- 1 <= s.length <= 10^4\n- s consists of parentheses only.',
      codeTemplates: {
        python: `import sys
s = sys.stdin.read().strip()
stack = []
mapping = {')': '(', '}': '{', ']': '['}
valid = True
for char in s:
    if char in mapping.values():
        stack.append(char)
    elif char in mapping:
        if not stack or stack.pop() != mapping[char]:
            valid = False
            break
print("true" if valid and not stack else "false")
`,
        javascript: `const fs = require('fs');
const s = fs.readFileSync(0, 'utf-8').trim();
const stack = [];
const map = { ')': '(', '}': '{', ']': '[' };
let valid = true;
for (const c of s) {
    if (c === '(' || c === '{' || c === '[') stack.push(c);
    else if (map[c]) {
        if (stack.length === 0 || stack.pop() !== map[c]) {
            valid = false;
            break;
        }
    }
}
console.log(valid && stack.length === 0 ? "true" : "false");
`,
        cpp: `#include <iostream>
#include <string>
#include <stack>
#include <unordered_map>
using namespace std;

int main() {
    string s;
    if (!getline(cin, s)) return 0;
    stack<char> st;
    unordered_map<char, char> map = {{')', '('}, {'}', '{'}, {']', '['}};
    bool valid = true;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else if (map.count(c)) {
            if (st.empty() || st.top() != map[c]) { valid = false; break; }
            st.pop();
        }
    }
    cout << (valid && st.empty() ? "true" : "false") << endl;
    return 0;
}
`,
        java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String s = reader.readLine();
        if (s == null) return;
        Deque<Character> stack = new ArrayDeque<>();
        boolean valid = true;
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else {
                if (stack.isEmpty() || stack.pop() != c) { valid = false; break; }
            }
        }
        System.out.println(valid && stack.isEmpty() ? "true" : "false");
    }
}
`,
      },
      sampleInput: '()[]{}',
      sampleOutput: 'true',
      points: 100,
      testCases: [
        { input: '()[]{}', expectedOutput: 'true', isHidden: false, order: 0 },
        { input: '(]', expectedOutput: 'false', isHidden: false, order: 1 },
        { input: '{[]}', expectedOutput: 'true', isHidden: true, order: 2 },
      ],
    },
    {
      title: 'Binary Search',
      slug: 'binary-search',
      description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.',
      difficulty: Difficulty.EASY,
      timeLimit: 1500,
      memoryLimit: 128,
      constraints: '- 1 <= nums.length <= 10^4\n- -10^4 < nums[i], target < 10^4\n- All integers in nums are unique and sorted in ascending order.',
      codeTemplates: {
        python: `import sys
lines = sys.stdin.read().strip().split('\\n')
nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
target = int(lines[1].strip())

left, right = 0, len(nums) - 1
ans = -1
while left <= right:
    mid = (left + right) // 2
    if nums[mid] == target:
        ans = mid
        break
    elif nums[mid] < target:
        left = mid + 1
    else:
        right = mid - 1
print(ans)
`,
        javascript: `const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
const nums = lines[0].split(',').map(x => parseInt(x.trim(), 10));
const target = parseInt(lines[1].trim(), 10);
let left = 0, right = nums.length - 1;
let ans = -1;
while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) { ans = mid; break; }
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
}
console.log(ans);
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
    while (getline(ss, token, ',')) if (!token.empty()) nums.push_back(stoi(token));
    int target = stoi(line2);
    int left = 0, right = (int)nums.size() - 1, ans = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) { ans = mid; break; }
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    cout << ans << endl;
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
        int left = 0, right = nums.length - 1, ans = -1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) { ans = mid; break; }
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        System.out.println(ans);
    }
}
`,
      },
      sampleInput: '-1,0,3,5,9,12\n9',
      sampleOutput: '4',
      points: 100,
      testCases: [
        { input: '-1,0,3,5,9,12\n9', expectedOutput: '4', isHidden: false, order: 0 },
        { input: '-1,0,3,5,9,12\n2', expectedOutput: '-1', isHidden: false, order: 1 },
        { input: '5\n5', expectedOutput: '0', isHidden: true, order: 2 },
      ],
    },
    {
      title: 'Longest Substring Without Repeating Characters',
      slug: 'longest-substring-without-repeating-characters',
      description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
      difficulty: Difficulty.MEDIUM,
      timeLimit: 2000,
      memoryLimit: 256,
      constraints: '- 0 <= s.length <= 5 * 10^4\n- s consists of English letters, digits, symbols and spaces.',
      codeTemplates: {
        python: `import sys
s = sys.stdin.read().strip()
char_map = {}
left = max_len = 0
for right, c in enumerate(s):
    if c in char_map and char_map[c] >= left:
        left = char_map[c] + 1
    char_map[c] = right
    max_len = max(max_len, right - left + 1)
print(max_len)
`,
        javascript: `const fs = require('fs');
const s = fs.readFileSync(0, 'utf-8').trim();
const map = new Map();
let left = 0, maxLen = 0;
for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (map.has(c) && map.get(c) >= left) {
        left = map.get(c) + 1;
    }
    map.set(c, right);
    maxLen = Math.max(maxLen, right - left + 1);
}
console.log(maxLen);
`,
        cpp: `#include <iostream>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int main() {
    string s;
    if (!getline(cin, s)) { cout << 0 << endl; return 0; }
    unordered_map<char, int> map;
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.size(); right++) {
        char c = s[right];
        if (map.count(c) && map[c] >= left) left = map[c] + 1;
        map[c] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    cout << maxLen << endl;
    return 0;
}
`,
        java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String s = reader.readLine();
        if (s == null || s.isEmpty()) { System.out.println(0); return; }
        Map<Character, Integer> map = new HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c) && map.get(c) >= left) left = map.get(c) + 1;
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        System.out.println(maxLen);
    }
}
`,
      },
      sampleInput: 'abcabcbb',
      sampleOutput: '3',
      points: 200,
      testCases: [
        { input: 'abcabcbb', expectedOutput: '3', isHidden: false, order: 0 },
        { input: 'bbbbb', expectedOutput: '1', isHidden: false, order: 1 },
        { input: 'pwwkew', expectedOutput: '3', isHidden: true, order: 2 },
      ],
    },
    {
      title: 'Merge Intervals',
      slug: 'merge-intervals',
      description: 'Given an array of intervals where each interval is `start,end` on its own line, merge all overlapping intervals, and output the merged intervals in standard format `start,end` per line.',
      difficulty: Difficulty.MEDIUM,
      timeLimit: 2000,
      memoryLimit: 256,
      constraints: '- 1 <= intervals.length <= 10^4\n- 0 <= start <= end <= 10^4',
      codeTemplates: {
        python: `import sys
lines = sys.stdin.read().strip().split('\\n')
intervals = []
for line in lines:
    if line.strip():
        parts = line.strip().split(',')
        intervals.append([int(parts[0]), int(parts[1])])

intervals.sort(key=lambda x: x[0])
merged = []
for interval in intervals:
    if not merged or merged[-1][1] < interval[0]:
        merged.append(interval)
    else:
        merged[-1][1] = max(merged[-1][1], interval[1])

for m in merged:
    print(f"{m[0]},{m[1]}")
`,
        javascript: `const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
const intervals = lines.filter(l => l.trim()).map(l => l.trim().split(',').map(Number));
intervals.sort((a, b) => a[0] - b[0]);
const merged = [];
for (const interval of intervals) {
    if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
        merged.push(interval);
    } else {
        merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);
    }
}
merged.forEach(m => console.log(\`\${m[0]},\${m[1]}\`));
`,
        cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    vector<pair<int, int>> intervals;
    while (getline(cin, line)) {
        if (line.empty()) continue;
        stringstream ss(line);
        string a, b;
        if (getline(ss, a, ',') && getline(ss, b)) {
            intervals.push_back({stoi(a), stoi(b)});
        }
    }
    sort(intervals.begin(), intervals.end());
    vector<pair<int, int>> merged;
    for (auto& iv : intervals) {
        if (merged.empty() || merged.back().second < iv.first) merged.push_back(iv);
        else merged.back().second = max(merged.back().second, iv.second);
    }
    for (auto& m : merged) cout << m.first << "," << m.second << endl;
    return 0;
}
`,
        java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        List<int[]> intervals = new ArrayList<>();
        String line;
        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            String[] parts = line.trim().split(",");
            intervals.add(new int[]{Integer.parseInt(parts[0]), Integer.parseInt(parts[1])});
        }
        intervals.sort((a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();
        for (int[] iv : intervals) {
            if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < iv[0]) merged.add(iv);
            else merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], iv[1]);
        }
        for (int[] m : merged) System.out.println(m[0] + "," + m[1]);
    }
}
`,
      },
      sampleInput: '1,3\n2,6\n8,10\n15,18',
      sampleOutput: '1,6\n8,10\n15,18',
      points: 200,
      testCases: [
        { input: '1,3\n2,6\n8,10\n15,18', expectedOutput: '1,6\n8,10\n15,18', isHidden: false, order: 0 },
        { input: '1,4\n4,5', expectedOutput: '1,5', isHidden: false, order: 1 },
      ],
    },
    {
      title: 'Number of Islands',
      slug: 'number-of-islands',
      description: 'Given an `m x n` 2D binary grid which represents a map of `1`s (land) and `0`s (water), return the number of islands.\n\nInput lines contain grid rows (e.g. `11110`, `11010`, etc).\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
      difficulty: Difficulty.MEDIUM,
      timeLimit: 2500,
      memoryLimit: 256,
      constraints: '- m == grid.length\n- n == grid[i].length\n- 1 <= m, n <= 300\n- grid[i][j] is "0" or "1".',
      codeTemplates: {
        python: `import sys
lines = sys.stdin.read().strip().split('\\n')
grid = [list(l.strip()) for l in lines if l.strip()]
if not grid:
    print(0)
    sys.exit(0)

m, n = len(grid), len(grid[0])
count = 0

def dfs(r, c):
    if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1':
        return
    grid[r][c] = '0'
    dfs(r + 1, c)
    dfs(r - 1, c)
    dfs(r, c + 1)
    dfs(r, c - 1)

for i in range(m):
    for j in range(n):
        if grid[i][j] == '1':
            count += 1
            dfs(i, j)

print(count)
`,
        javascript: `const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
const grid = lines.filter(l => l.trim()).map(l => l.trim().split(''));
if (grid.length === 0) { console.log(0); process.exit(0); }
const m = grid.length, n = grid[0].length;
let count = 0;

function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
}

for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (grid[i][j] === '1') {
            count++;
            dfs(i, j);
        }
    }
}
console.log(count);
`,
        cpp: `#include <iostream>
#include <vector>
#include <string>
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
    vector<string> grid;
    string line;
    while (getline(cin, line)) if (!line.empty()) grid.push_back(line);
    if (grid.empty()) { cout << 0 << endl; return 0; }
    int m = grid.size(), n = grid[0].size(), count = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == '1') {
                count++;
                dfs(grid, i, j, m, n);
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
        List<String> list = new ArrayList<>();
        String line;
        while ((line = reader.readLine()) != null) if (!line.trim().isEmpty()) list.add(line.trim());
        if (list.isEmpty()) { System.out.println(0); return; }
        int m = list.size(), n = list.get(0).length();
        char[][] grid = new char[m][n];
        for (int i = 0; i < m; i++) grid[i] = list.get(i).toCharArray();
        int count = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') { count++; dfs(grid, i, j, m, n); }
            }
        }
        System.out.println(count);
    }
}
`,
      },
      sampleInput: '11110\n11010\n11000\n00000',
      sampleOutput: '1',
      points: 250,
      testCases: [
        { input: '11110\n11010\n11000\n00000', expectedOutput: '1', isHidden: false, order: 0 },
        { input: '11000\n11000\n00100\n00011', expectedOutput: '3', isHidden: false, order: 1 },
      ],
    },
    {
      title: 'Kth Largest Element',
      slug: 'kth-largest-element',
      description: 'Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.\n\nNote that it is the `k`th largest element in the sorted order, not the `k`th distinct element.\nInput is provided as comma-separated integers on line 1 and integer `k` on line 2.',
      difficulty: Difficulty.MEDIUM,
      timeLimit: 2000,
      memoryLimit: 256,
      constraints: '- 1 <= k <= nums.length <= 10^5\n- -10^4 <= nums[i] <= 10^4',
      codeTemplates: {
        python: `import sys
lines = sys.stdin.read().strip().split('\\n')
nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
k = int(lines[1].strip())
nums.sort(reverse=True)
print(nums[k - 1])
`,
        javascript: `const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
const nums = lines[0].split(',').map(x => parseInt(x.trim(), 10));
const k = parseInt(lines[1].trim(), 10);
nums.sort((a, b) => b - a);
console.log(nums[k - 1]);
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
    vector<int> nums;
    while (getline(ss, token, ',')) if (!token.empty()) nums.push_back(stoi(token));
    int k = stoi(line2);
    sort(nums.rbegin(), nums.rend());
    cout << nums[k - 1] << endl;
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
        Integer[] nums = new Integer[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());
        int k = Integer.parseInt(line2.trim());
        Arrays.sort(nums, Collections.reverseOrder());
        System.out.println(nums[k - 1]);
    }
}
`,
      },
      sampleInput: '3,2,1,5,6,4\n2',
      sampleOutput: '5',
      points: 200,
      testCases: [
        { input: '3,2,1,5,6,4\n2', expectedOutput: '5', isHidden: false, order: 0 },
        { input: '3,2,3,1,2,4,5,5,6\n4', expectedOutput: '4', isHidden: false, order: 1 },
      ],
    },
    {
      title: 'Climbing Stairs',
      slug: 'climbing-stairs',
      description: 'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?\nInput is single integer `n`. Output the total ways.',
      difficulty: Difficulty.EASY,
      timeLimit: 1000,
      memoryLimit: 128,
      constraints: '- 1 <= n <= 45',
      codeTemplates: {
        python: `import sys
n = int(sys.stdin.read().strip())
if n <= 2:
    print(n)
else:
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    print(b)
`,
        javascript: `const fs = require('fs');
const n = parseInt(fs.readFileSync(0, 'utf-8').trim(), 10);
if (n <= 2) { console.log(n); process.exit(0); }
let a = 1, b = 2;
for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
}
console.log(b);
`,
        cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    if (n <= 2) { cout << n << endl; return 0; }
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
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
        String s = reader.readLine();
        if (s == null) return;
        int n = Integer.parseInt(s.trim());
        if (n <= 2) { System.out.println(n); return; }
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        System.out.println(b);
    }
}
`,
      },
      sampleInput: '3',
      sampleOutput: '3',
      points: 150,
      testCases: [
        { input: '2', expectedOutput: '2', isHidden: false, order: 0 },
        { input: '3', expectedOutput: '3', isHidden: false, order: 1 },
        { input: '5', expectedOutput: '8', isHidden: true, order: 2 },
      ],
    },
  ];

  // Map of created problem records by slug
  const createdProblems: Record<string, any> = {};

  for (const p of problemDefs) {
    const problem = await prisma.problem.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        description: p.description,
        difficulty: p.difficulty,
        timeLimit: p.timeLimit,
        memoryLimit: p.memoryLimit,
        constraints: p.constraints,
        codeTemplates: p.codeTemplates,
        sampleInput: p.sampleInput,
        sampleOutput: p.sampleOutput,
        points: p.points,
        isPublished: true,
      },
      create: {
        title: p.title,
        slug: p.slug,
        description: p.description,
        difficulty: p.difficulty,
        timeLimit: p.timeLimit,
        memoryLimit: p.memoryLimit,
        constraints: p.constraints,
        codeTemplates: p.codeTemplates,
        sampleInput: p.sampleInput,
        sampleOutput: p.sampleOutput,
        points: p.points,
        isPublished: true,
        authorId: setter.id,
      },
    });

    createdProblems[p.slug] = problem;

    // Idempotently replace test cases for this problem
    await prisma.testCase.deleteMany({
      where: { problemId: problem.id },
    });

    await prisma.testCase.createMany({
      data: p.testCases.map((tc) => ({
        problemId: problem.id,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        isHidden: tc.isHidden,
        order: tc.order,
      })),
    });
  }

  console.log(`Successfully seeded ${problemDefs.length} problems with test cases.`);

  // 3. Define the 4 Contests with realistic timings & problem associations
  const now = new Date();

  const contestDefs = [
    {
      title: 'CodeJudge Weekly Challenge #1',
      description: 'A beginner-friendly competitive programming contest covering arrays, strings, searching, and basic algorithms.',
      startTime: new Date(now.getTime() - 15 * 60 * 1000), // Started 15 mins ago (LIVE)
      endTime: new Date(now.getTime() + 75 * 60 * 1000),   // Ends in 75 mins (Total 90m)
      isPrivate: false,
      problems: [
        { slug: 'two-sum', points: 100, order: 1 },
        { slug: 'reverse-a-string', points: 100, order: 2 },
        { slug: 'valid-parentheses', points: 100, order: 3 },
      ],
    },
    {
      title: 'Algorithm Arena — Round 1',
      description: 'A competitive round focused on algorithms, data structures, and problem solving.',
      startTime: new Date(now.getTime() + 2 * 60 * 60 * 1000), // Starts in 2 hours (UPCOMING)
      endTime: new Date(now.getTime() + 4 * 60 * 60 * 1000),   // Duration: 120 mins
      isPrivate: false,
      problems: [
        { slug: 'maximum-subarray', points: 200, order: 1 },
        { slug: 'binary-search', points: 100, order: 2 },
        { slug: 'longest-substring-without-repeating-characters', points: 200, order: 3 },
        { slug: 'merge-intervals', points: 200, order: 4 },
      ],
    },
    {
      title: 'CodeJudge Sprint Challenge',
      description: 'A short challenge designed to test implementation speed and accuracy.',
      startTime: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Starts tomorrow (UPCOMING)
      endTime: new Date(now.getTime() + (24 * 60 + 45) * 60 * 1000), // Duration: 45 mins
      isPrivate: false,
      problems: [
        { slug: 'number-of-islands', points: 250, order: 1 },
        { slug: 'kth-largest-element', points: 200, order: 2 },
        { slug: 'two-sum', points: 100, order: 3 },
      ],
    },
    {
      title: 'AI & Algorithms Challenge',
      description: 'A themed programming challenge combining algorithmic thinking with practical problem solving.',
      startTime: new Date(now.getTime() - 24 * 60 * 60 * 1000), // Yesterday (PAST)
      endTime: new Date(now.getTime() - (22 * 60 + 30) * 60 * 1000), // Duration: 90 mins
      isPrivate: false,
      problems: [
        { slug: 'climbing-stairs', points: 150, order: 1 },
        { slug: 'binary-search', points: 100, order: 2 },
        { slug: 'maximum-subarray', points: 200, order: 3 },
      ],
    },
  ];

  for (const c of contestDefs) {
    let contest = await prisma.contest.findFirst({
      where: { title: c.title },
    });

    if (!contest) {
      contest = await prisma.contest.create({
        data: {
          title: c.title,
          description: c.description,
          startTime: c.startTime,
          endTime: c.endTime,
          isPrivate: c.isPrivate,
          organizerId: admin.id,
          isPublished: true,
        },
      });
    } else {
      contest = await prisma.contest.update({
        where: { id: contest.id },
        data: {
          description: c.description,
          startTime: c.startTime,
          endTime: c.endTime,
          isPublished: true,
        },
      });
    }

    // Connect problems idempotently
    for (const cp of c.problems) {
      const prob = createdProblems[cp.slug];
      if (prob) {
        await prisma.contestProblem.upsert({
          where: {
            contestId_problemId: {
              contestId: contest.id,
              problemId: prob.id,
            },
          },
          update: {
            points: cp.points,
            order: cp.order,
          },
          create: {
            contestId: contest.id,
            problemId: prob.id,
            points: cp.points,
            order: cp.order,
          },
        });
      }
    }
  }

  console.log(`Successfully seeded ${contestDefs.length} contests with problem mappings.`);

  // 4. Create Achievements & Badges
  await prisma.achievement.upsert({
    where: { name: 'First Accepted Solution' },
    update: {},
    create: {
      name: 'First Accepted Solution',
      description: 'Awarded when you solve your very first coding challenge.',
      badgeUrl: '/badges/first-ac.png',
      pointsRequired: 100,
    },
  });

  await prisma.achievement.upsert({
    where: { name: 'Algorithm Master' },
    update: {},
    create: {
      name: 'Algorithm Master',
      description: 'Awarded when you earn more than 1000 submission points.',
      badgeUrl: '/badges/algo-master.png',
      pointsRequired: 1000,
    },
  });

  console.log('Database seeding completed successfully and idempotently!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
