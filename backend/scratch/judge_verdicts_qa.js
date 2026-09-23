const API_BASE = 'http://localhost:5000/api';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runJudgeAudit() {
  console.log('--- STARTING REAL JUDGING PIPELINE VERDICT AUDIT ---');

  // 1. Authenticate or Login as test user
  let token;
  try {
    const loginRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'user@codejudge.com',
        password: 'user123',
      }),
    });
    const data = await loginRes.json();
    token = data.accessToken || data.token;
  } catch (err) {
    // If user doesn't exist, register
    const regRes = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `judge_audit_${Date.now()}@test.com`,
        username: `judge_auditor_${Date.now().toString().slice(-4)}`,
        password: 'Password123!',
      }),
    });
    const regData = await regRes.json();
    token = regData.accessToken || regData.token;
  }

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  // Fetch Two Sum problem ID
  const probRes = await fetch(`${API_BASE}/problems/slug/two-sum`, { headers: authHeaders });
  const probData = await probRes.json();
  const twoSumId = probData.id;
  console.log(`Auditing judging pipeline on problem: Two Sum (${twoSumId})...`);

  // Helper to submit and wait for verdict
  async function submitAndAwaitVerdict(code, language) {
    const subRes = await fetch(`${API_BASE}/submissions`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        problemId: twoSumId,
        code,
        language,
      }),
    });

    const subData = await subRes.json();
    const submissionId = subData.id;
    let verdict = subData.verdict;

    for (let attempt = 0; attempt < 25; attempt++) {
      if (verdict !== 'QUEUED' && verdict !== 'RUNNING' && verdict !== 'PENDING') {
        break;
      }
      await sleep(1000);
      const pollRes = await fetch(`${API_BASE}/submissions/${submissionId}`, { headers: authHeaders });
      const pollData = await pollRes.json();
      verdict = pollData.verdict;
    }

    return verdict;
  }

  // 1. ACCEPTED Test
  console.log('1. Submitting CORRECT solution -> expecting ACCEPTED...');
  const correctCode = `import sys
lines = sys.stdin.read().strip().split('\\n')
nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
target = int(lines[1].strip())
seen = {}
for i, num in enumerate(nums):
    diff = target - num
    if diff in seen:
        print(f"[{seen[diff]},{i}]")
        break
    seen[num] = i
`;
  const v1 = await submitAndAwaitVerdict(correctCode, 'python');
  console.log(`   Verdict: ${v1} ${v1 === 'ACCEPTED' ? '✓ PASS' : '✗ FAIL'}`);

  // 2. WRONG ANSWER Test
  console.log('2. Submitting WRONG ANSWER solution -> expecting WRONG_ANSWER...');
  const waCode = `import sys
print("0,0")
`;
  const v2 = await submitAndAwaitVerdict(waCode, 'python');
  console.log(`   Verdict: ${v2} ${v2 === 'WRONG_ANSWER' ? '✓ PASS' : '✗ FAIL'}`);

  // 3. COMPILATION ERROR Test
  console.log('3. Submitting SYNTAX / COMPILATION ERROR -> expecting COMPILATION_ERROR or RUNTIME_ERROR...');
  const ceCode = `function syntax broken {(()`;
  const v3 = await submitAndAwaitVerdict(ceCode, 'javascript');
  console.log(`   Verdict: ${v3} ${v3 === 'COMPILATION_ERROR' || v3 === 'RUNTIME_ERROR' ? '✓ PASS' : '✗ FAIL'}`);

  // 4. RUNTIME ERROR Test
  console.log('4. Submitting RUNTIME EXCEPTION -> expecting RUNTIME_ERROR...');
  const reCode = `import sys
x = 1 / 0
`;
  const v4 = await submitAndAwaitVerdict(reCode, 'python');
  console.log(`   Verdict: ${v4} ${v4 === 'RUNTIME_ERROR' ? '✓ PASS' : '✗ FAIL'}`);

  // 5. TIME LIMIT EXCEEDED Test
  console.log('5. Submitting INFINITE LOOP -> expecting TIME_LIMIT_EXCEEDED...');
  const tleCode = `import sys, time
while True:
    time.sleep(0.1)
`;
  const v5 = await submitAndAwaitVerdict(tleCode, 'python');
  console.log(`   Verdict: ${v5} ${v5 === 'TIME_LIMIT_EXCEEDED' ? '✓ PASS' : '✗ FAIL'}`);

  console.log('\n--- VERDICT MATRIX SUMMARY ---');
  console.log(`- ACCEPTED:             ${v1 === 'ACCEPTED' ? 'PASSED (200 OK)' : 'FAILED'}`);
  console.log(`- WRONG_ANSWER:         ${v2 === 'WRONG_ANSWER' ? 'PASSED (200 OK)' : 'FAILED'}`);
  console.log(`- COMPILATION/SYNTAX:   ${v3 === 'COMPILATION_ERROR' || v3 === 'RUNTIME_ERROR' ? 'PASSED (200 OK)' : 'FAILED'}`);
  console.log(`- RUNTIME_ERROR:        ${v4 === 'RUNTIME_ERROR' ? 'PASSED (200 OK)' : 'FAILED'}`);
  console.log(`- TIME_LIMIT_EXCEEDED:  ${v5 === 'TIME_LIMIT_EXCEEDED' ? 'PASSED (200 OK)' : 'FAILED'}`);
  console.log('------------------------------');
}

runJudgeAudit().catch(console.error);
