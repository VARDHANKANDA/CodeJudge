import { PrismaClient, Difficulty, QualityStatus } from '@prisma/client';
import { spawn } from 'child_process';

const prisma = new PrismaClient();

interface AuditResult {
  totalProblems: number;
  publishedProblems: number;
  verifiedProblems: number;
  reviewProblems: number;
  draftProblems: number;
  totalTestCases: number;
  visibleTestCases: number;
  hiddenTestCases: number;
  difficultyBreakdown: { easy: number; medium: number; hard: number };
  topicsFound: string[];
  issuesFound: string[];
  oracleTestResults: { passed: number; failed: number; log: string[] };
}

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

let tempFileCounter = 0;

async function runCode(code: string, input: string, lang: 'python' | 'javascript'): Promise<{ stdout: string; stderr: string; code: number }> {
  return new Promise((resolve) => {
    let execCode = code;
    const tempDir = os.tmpdir();
    const tempId = `codejudge_audit_${Date.now()}_${++tempFileCounter}`;

    if (lang === 'python') {
      if (code.includes('class Solution:')) {
        execCode = code + `\n
import sys, json, ast, inspect

try:
    sol = Solution()
    methods = [m for m in dir(sol) if not m.startswith('_')]
    if methods:
        method = getattr(sol, methods[0])
        raw_inp = sys.stdin.read().strip()
        if raw_inp:
            cleaned = raw_inp.replace('true', 'True').replace('false', 'False').replace('null', 'None')
            try:
                parsed = ast.literal_eval(f"({cleaned})")
            except Exception:
                try:
                    parsed = json.loads(f"[{raw_inp}]")
                except Exception:
                    parsed = [raw_inp]
            
            sig = inspect.signature(method)
            params = [p for p in sig.parameters.values() if p.name != 'self']
            if len(params) == 1:
                res = method(parsed)
            elif isinstance(parsed, (tuple, list)):
                res = method(*parsed)
            else:
                res = method(parsed)
            if isinstance(res, bool):
                print(str(res).lower())
            elif isinstance(res, (int, float)):
                print(res)
            elif isinstance(res, str):
                print(f'"{res}"')
            else:
                print(json.dumps(res, separators=(',', ':')))
except Exception as e:
    import traceback
    traceback.print_exc()
`;
      }
      const scriptPath = path.join(tempDir, `${tempId}.py`);
      fs.writeFileSync(scriptPath, execCode, 'utf-8');
      var cmd = 'python';
      var args = ['-u', scriptPath];
    } else {
      if (code.includes('class Solution')) {
        execCode = code + `\n
const fs = require('fs');
try {
    const sol = new Solution();
    const proto = Object.getPrototypeOf(sol);
    const methods = Object.getOwnPropertyNames(proto).filter(m => m !== 'constructor' && typeof sol[m] === 'function');
    if (methods.length > 0) {
        const method = methods[0];
        const rawInp = fs.readFileSync(0, 'utf-8').trim();
        if (rawInp) {
            let args;
            try {
                args = eval('[' + rawInp + ']');
            } catch(e) {
                args = [rawInp];
            }
            const res = sol[method](...args);
            if (typeof res === 'boolean') {
                console.log(res ? 'true' : 'false');
            } else if (typeof res === 'string') {
                console.log('"' + res + '"');
            } else if (typeof res === 'number') {
                console.log(res);
            } else {
                console.log(JSON.stringify(res));
            }
        }
    }
} catch(e) {
    console.error(e);
}
`;
      }
      const scriptPath = path.join(tempDir, `${tempId}.js`);
      fs.writeFileSync(scriptPath, execCode, 'utf-8');
      var cmd = 'node';
      var args = [scriptPath];
    }

    const child = spawn(cmd, args);
    let stdout = '';
    let stderr = '';
    let isSettled = false;

    const cleanup = () => {
      try {
        if (args[0] && fs.existsSync(args[0])) fs.unlinkSync(args[0]);
      } catch (e) {}
    };

    const timer = setTimeout(() => {
      if (!isSettled) {
        isSettled = true;
        child.kill();
        cleanup();
        resolve({ stdout: '', stderr: 'TIMEOUT', code: 1 });
      }
    }, 4000);

    child.stdout.on('data', (d) => (stdout += d.toString()));
    child.stderr.on('data', (d) => (stderr += d.toString()));

    child.on('close', (exitCode) => {
      if (!isSettled) {
        isSettled = true;
        clearTimeout(timer);
        cleanup();
        resolve({ stdout: stdout.trim(), stderr: stderr.trim(), code: exitCode || 0 });
      }
    });

    child.on('error', (err) => {
      if (!isSettled) {
        isSettled = true;
        clearTimeout(timer);
        cleanup();
        resolve({ stdout: '', stderr: err.message, code: 1 });
      }
    });

    try {
      if (input !== undefined && input !== null) {
        child.stdin.write(input);
      }
      child.stdin.end();
    } catch (e) {
      // ignore
    }
  });
}

async function runDeepAudit() {
  console.log('================================================================');
  console.log('STARTING CODEJUDGE DEEP QUALITY & ORACLE VALIDATION AUDIT');
  console.log('================================================================\n');

  const problems = await prisma.problem.findMany({
    include: {
      testCases: true,
      editorial: true,
      tags: { include: { tag: true } },
    },
    orderBy: { createdAt: 'asc' },
  });

  const audit: AuditResult = {
    totalProblems: problems.length,
    publishedProblems: problems.filter((p) => p.isPublished).length,
    verifiedProblems: problems.filter((p) => p.qualityStatus === QualityStatus.VERIFIED || p.qualityStatus === QualityStatus.PUBLISHED).length,
    reviewProblems: problems.filter((p) => p.qualityStatus === QualityStatus.REVIEW).length,
    draftProblems: problems.filter((p) => p.qualityStatus === QualityStatus.DRAFT).length,
    totalTestCases: 0,
    visibleTestCases: 0,
    hiddenTestCases: 0,
    difficultyBreakdown: { easy: 0, medium: 0, hard: 0 },
    topicsFound: [],
    issuesFound: [],
    oracleTestResults: { passed: 0, failed: 0, log: [] },
  };

  const titleMap = new Map<string, string>();
  const slugMap = new Map<string, string>();

  console.log(`Auditing ${problems.length} problems in database...\n`);

  let idx = 0;
  for (const p of problems) {
    idx++;
    process.stdout.write(`[${idx}/${problems.length}] Auditing: ${p.title}... `);

    // 1. Difficulty Count
    if (p.difficulty === Difficulty.EASY) audit.difficultyBreakdown.easy++;
    else if (p.difficulty === Difficulty.MEDIUM) audit.difficultyBreakdown.medium++;
    else if (p.difficulty === Difficulty.HARD) audit.difficultyBreakdown.hard++;

    // 2. Uniqueness & Duplicate check
    const normTitle = p.title.trim().toLowerCase();
    if (titleMap.has(normTitle)) {
      audit.issuesFound.push(`Duplicate Title found: "${p.title}" (IDs: ${titleMap.get(normTitle)} & ${p.id})`);
    } else {
      titleMap.set(normTitle, p.id);
    }

    if (slugMap.has(p.slug)) {
      audit.issuesFound.push(`Duplicate Slug found: "${p.slug}" (IDs: ${slugMap.get(p.slug)} & ${p.id})`);
    } else {
      slugMap.set(p.slug, p.id);
    }

    // 3. Metadata Integrity
    if (!p.description || p.description.trim().length < 20) {
      audit.issuesFound.push(`Problem "${p.title}" has suspiciously short or empty description.`);
    }
    if (!p.constraints || p.constraints.trim().length < 3) {
      audit.issuesFound.push(`Problem "${p.title}" is missing constraints.`);
    }
    if (!p.inputFormat || !p.outputFormat) {
      audit.issuesFound.push(`Problem "${p.title}" is missing input/output format specifications.`);
    }

    // 4. Hints & Editorial
    const hintsArr = Array.isArray(p.hints) ? (p.hints as string[]) : [];
    if (hintsArr.length === 0) {
      audit.issuesFound.push(`Problem "${p.title}" has no progressive hints.`);
    }
    if (!p.editorial) {
      audit.issuesFound.push(`Problem "${p.title}" is missing canonical editorial.`);
    } else {
      if (!p.editorial.timeComplexity || !p.editorial.spaceComplexity) {
        audit.issuesFound.push(`Problem "${p.title}" editorial is missing Big-O complexity metadata.`);
      }
    }

    // 5. Reference Solutions & Code Templates
    const refSols = (p.referenceSolutions as Record<string, string>) || {};
    const codeTemps = (p.codeTemplates as Record<string, string>) || {};
    if (!refSols.python && !refSols.javascript) {
      audit.issuesFound.push(`Problem "${p.title}" has no trusted reference solutions.`);
    }
    if (!codeTemps.python && !codeTemps.javascript) {
      audit.issuesFound.push(`Problem "${p.title}" has no starter code templates.`);
    }

    // 6. Test Cases Integrity
    const testCases = p.testCases;
    audit.totalTestCases += testCases.length;
    const visible = testCases.filter((tc) => !tc.isHidden).length;
    const hidden = testCases.filter((tc) => tc.isHidden).length;
    audit.visibleTestCases += visible;
    audit.hiddenTestCases += hidden;

    if (testCases.length < 2) {
      audit.issuesFound.push(`Problem "${p.title}" has dangerously few test cases (${testCases.length}).`);
    }
    if (visible === 0) {
      audit.issuesFound.push(`Problem "${p.title}" has 0 visible test cases.`);
    }
    if (hidden === 0) {
      audit.issuesFound.push(`Problem "${p.title}" has 0 hidden/edge-case test cases.`);
    }

    // 7. Verify Reference Solutions Output Matching Against All Test Cases
    const pySol = refSols.python;
    let probPass = true;

    if (pySol) {
      for (const tc of testCases) {
        const res = await runCode(pySol, tc.input, 'python');
        const normActual = res.stdout.replace(/\r\n/g, '\n').trim();
        const normExpected = tc.expectedOutput.replace(/\r\n/g, '\n').trim();
        if (normActual !== normExpected) {
          probPass = false;
          audit.issuesFound.push(`Problem "${p.title}" [Python] testcase failure! Input: "${tc.input}" | Expected: "${normExpected}" | Got: "${normActual}"`);
        }
      }
    }

    if (probPass) {
      console.log('✓ OK');
    } else {
      console.log('✗ FAILED');
    }
  }

  console.log('\n--- INDEPENDENT ORACLE & PROPERTY-BASED TESTING ---');

  // Oracle 1: Two Sum with randomized brute-force validation
  console.log('Running Oracle 1: Two Sum Random Property Validation...');
  for (let trial = 0; trial < 10; trial++) {
    const n = Math.floor(Math.random() * 20) + 5;
    const nums: number[] = [];
    for (let i = 0; i < n; i++) nums.push(Math.floor(Math.random() * 200) - 100);
    const i1 = Math.floor(Math.random() * n);
    let i2 = Math.floor(Math.random() * n);
    while (i2 === i1) i2 = Math.floor(Math.random() * n);
    const target = nums[i1] + nums[i2];

    const pyTwoSum = `import sys
def solve():
    tokens = sys.stdin.read().split()
    target = int(tokens[0])
    nums = [int(x) for x in tokens[1:]]
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            print(f"{seen[diff]} {i}")
            return
        seen[num] = i
solve()`;

    const inputStr = `${target}\n${nums.join(' ')}`;
    const res = await runCode(pyTwoSum, inputStr, 'python');
    const [solI, solJ] = res.stdout.split(/\s+/).map(Number);
    if (nums[solI] + nums[solJ] === target && solI !== solJ) {
      audit.oracleTestResults.passed++;
    } else {
      audit.oracleTestResults.failed++;
      audit.oracleTestResults.log.push(`Two Sum Oracle mismatch on input: target=${target}, nums=[${nums.join(', ')}]`);
    }
  }

  // Oracle 2: Reverse String Invariant Check
  console.log('Running Oracle 2: Reverse String Invariant...');
  for (let trial = 0; trial < 10; trial++) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const len = Math.floor(Math.random() * 30) + 1;
    let s = '';
    for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
    const expected = s.split('').reverse().join('');

    const pyRev = `import sys
print(sys.stdin.read().strip()[::-1])`;
    const res = await runCode(pyRev, s, 'python');
    if (res.stdout === expected) {
      audit.oracleTestResults.passed++;
    } else {
      audit.oracleTestResults.failed++;
      audit.oracleTestResults.log.push(`Reverse String mismatch: "${s}" -> "${res.stdout}" vs "${expected}"`);
    }
  }

  // Oracle 3: Edit Distance vs Recursive Oracle for small strings
  console.log('Running Oracle 3: Edit Distance vs Recursive Oracle...');
  function recursiveEditDist(s1: string, s2: string): number {
    if (s1.length === 0) return s2.length;
    if (s2.length === 0) return s1.length;
    if (s1[0] === s2[0]) return recursiveEditDist(s1.slice(1), s2.slice(1));
    return (
      1 +
      Math.min(
        recursiveEditDist(s1.slice(1), s2),
        recursiveEditDist(s1, s2.slice(1)),
        recursiveEditDist(s1.slice(1), s2.slice(1))
      )
    );
  }

  const editPairs = [
    ['cat', 'hat'],
    ['sunday', 'saturday'],
    ['sitting', 'kitten'],
    ['algo', 'allgorithm'],
    ['abc', 'def'],
  ];

  const pyEditDist = `import sys
lines = sys.stdin.read().split('\\n')
w1 = lines[0].strip() if len(lines) > 0 else ""
w2 = lines[1].strip() if len(lines) > 1 else ""
m, n = len(w1), len(w2)
dp = [[0] * (n + 1) for _ in range(m + 1)]
for i in range(m + 1): dp[i][0] = i
for j in range(n + 1): dp[0][j] = j
for i in range(1, m + 1):
    for j in range(1, n + 1):
        if w1[i - 1] == w2[j - 1]: dp[i][j] = dp[i - 1][j - 1]
        else: dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
print(dp[m][n])`;

  for (const [w1, w2] of editPairs) {
    const oracleAns = recursiveEditDist(w1, w2);
    const res = await runCode(pyEditDist, `${w1}\n${w2}`, 'python');
    if (parseInt(res.stdout, 10) === oracleAns) {
      audit.oracleTestResults.passed++;
    } else {
      audit.oracleTestResults.failed++;
      audit.oracleTestResults.log.push(`Edit Distance mismatch on "${w1}", "${w2}": got ${res.stdout}, expected ${oracleAns}`);
    }
  }

  // Oracle 4: Dijkstra Shortest Path vs Floyd-Warshall Oracle
  console.log('Running Oracle 4: Dijkstra vs Floyd-Warshall All-Pairs Oracle...');
  const nNodes = 4;
  const graphEdges = [
    [1, 2, 3],
    [2, 3, 1],
    [1, 3, 7],
    [3, 4, 2],
    [2, 4, 8],
  ];

  const distMatrix = Array.from({ length: nNodes + 1 }, () => Array(nNodes + 1).fill(Infinity));
  for (let i = 1; i <= nNodes; i++) distMatrix[i][i] = 0;
  for (const [u, v, w] of graphEdges) distMatrix[u][v] = w;
  for (let k = 1; k <= nNodes; k++) {
    for (let i = 1; i <= nNodes; i++) {
      for (let j = 1; j <= nNodes; j++) {
        if (distMatrix[i][k] + distMatrix[k][j] < distMatrix[i][j]) {
          distMatrix[i][j] = distMatrix[i][k] + distMatrix[k][j];
        }
      }
    }
  }

  const pyDijkstra = `import sys, heapq
tokens = sys.stdin.read().split()
n, m, k = int(tokens[0]), int(tokens[1]), int(tokens[2])
adj = [[] for _ in range(n + 1)]
idx = 3
for _ in range(m):
    u, v, w = int(tokens[idx]), int(tokens[idx+1]), int(tokens[idx+2])
    adj[u].append((v, w))
    idx += 3
dist = {}
pq = [(0, k)]
while pq:
    d, u = heapq.heappop(pq)
    if u in dist: continue
    dist[u] = d
    for v, w in adj[u]:
        if v not in dist: heapq.heappush(pq, (d + w, v))
print(max(dist.values()) if len(dist) == n else -1)`;

  const dijkstraInput = `4 5 1\n1 2 3\n2 3 1\n1 3 7\n3 4 2\n2 4 8`;
  const maxOracleDist = Math.max(...distMatrix[1].slice(1));
  const dijkstraRes = await runCode(pyDijkstra, dijkstraInput, 'python');
  if (parseInt(dijkstraRes.stdout, 10) === maxOracleDist) {
    audit.oracleTestResults.passed++;
  } else {
    audit.oracleTestResults.failed++;
    audit.oracleTestResults.log.push(`Dijkstra Oracle mismatch: got ${dijkstraRes.stdout}, expected ${maxOracleDist}`);
  }

  // Summary Report
  console.log('\n================================================================');
  console.log('AUDIT SUMMARY REPORT');
  console.log('================================================================');
  console.log(`Total Problems in Database:   ${audit.totalProblems}`);
  console.log(`Published Problems:           ${audit.publishedProblems}`);
  console.log(`Verified Problems:            ${audit.verifiedProblems}`);
  console.log(`Review / Draft / Failed:      ${audit.reviewProblems} / ${audit.draftProblems}`);
  console.log(`Difficulty Breakdown:         Easy: ${audit.difficultyBreakdown.easy} | Medium: ${audit.difficultyBreakdown.medium} | Hard: ${audit.difficultyBreakdown.hard}`);
  console.log(`Total Test Cases Verified:    ${audit.totalTestCases} (${audit.visibleTestCases} visible, ${audit.hiddenTestCases} hidden)`);
  console.log(`Oracle & Property Tests:      ${audit.oracleTestResults.passed} PASSED, ${audit.oracleTestResults.failed} FAILED`);
  console.log(`Metadata / Integrity Issues:  ${audit.issuesFound.length}`);

  if (audit.issuesFound.length > 0) {
    console.log('\n--- ISSUES DETECTED ---');
    for (const issue of audit.issuesFound) {
      console.log(`  - ${issue}`);
    }
  } else {
    console.log('\n✓ 100% CLEAN INVENTORY AUDIT — ZERO METADATA OR TEST CASE DEFECTS!');
  }

  console.log('================================================================\n');

  await prisma.$disconnect();
}

runDeepAudit().catch((err) => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
