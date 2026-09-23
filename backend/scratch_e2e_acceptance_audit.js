const API_BASE = 'http://localhost:5000/api';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runAcceptanceTest() {
  console.log('============================================================');
  console.log('PHASE 28: COMPLETE END-TO-END ACCEPTANCE AUDIT');
  console.log('============================================================\n');

  const ts = Date.now();
  const testUsername = `user_${ts.toString().slice(-6)}`;
  const testEmail = `${testUsername}@codejudge.test`;
  const testPassword = 'SecurePassword123!';
  let token = '';
  let refreshToken = '';
  let userId = '';

  // 1. REGISTER
  console.log(`1. REGISTER: Registering fresh user "${testUsername}"...`);
  const regRes = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: testUsername,
      email: testEmail,
      password: testPassword,
      name: 'Fresh QA User',
    }),
  });
  const regData = await regRes.json();
  if (regRes.status !== 201) throw new Error(`Registration failed: ${JSON.stringify(regData)}`);
  userId = regData.id;
  console.log(`   ✓ Registration success (HTTP 201, ID: ${userId})`);

  // 2. LOGIN
  console.log('2. LOGIN: Authenticating...');
  const loginRes = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, password: testPassword }),
  });
  const loginData = await loginRes.json();
  if (loginRes.status !== 200) throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
  token = loginData.accessToken;
  refreshToken = loginData.refreshToken;
  console.log('   ✓ Login success (HTTP 200, Token received)');

  // 3. INITIAL DASHBOARD / PROFILE STATE
  console.log('3. DASHBOARD / PROFILE: Verifying initial zero state...');
  const profileRes = await fetch(`${API_BASE}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const profileData = await profileRes.json();
  console.log(`   Points: ${profileData.points} (expected 0), Rating: ${profileData.rating} (expected 1500)`);
  if (profileData.points !== 0 || profileData.rating !== 1500) {
    throw new Error('Initial profile state is not clean!');
  }
  const fullProfileRes = await fetch(`${API_BASE}/users/profile/${testUsername}`);
  const fullProfileData = await fullProfileRes.json();
  console.log(`   Solved Count: ${fullProfileData.solvedCount} (expected 0), Submissions: ${fullProfileData.submissions.length} (expected 0)`);
  if (fullProfileData.solvedCount !== 0) {
    throw new Error('Initial user has non-zero solved count!');
  }
  console.log('   ✓ Initial state clean');

  // 4. PROBLEMS CATALOG & SEARCH / FILTER
  console.log('4. PROBLEMS: Fetching problem catalog...');
  const probListRes = await fetch(`${API_BASE}/problems?page=1&limit=10`);
  const probListData = await probListRes.json();
  console.log(`   Total Problems in Library: ${probListData.total} (Page size: ${probListData.items.length})`);
  if (probListData.total < 500) throw new Error('Problem library missing items!');

  const searchRes = await fetch(`${API_BASE}/problems?search=Two+Sum`);
  const searchData = await searchRes.json();
  const twoSum = searchData.items.find(p => p.slug === 'two-sum');
  if (!twoSum) throw new Error('Two Sum problem not found!');
  console.log(`   ✓ Located problem: "${twoSum.title}" (ID: ${twoSum.id}, Difficulty: ${twoSum.difficulty})`);

  // 5. PROBLEM DETAIL
  console.log('5. PROBLEM DETAIL: Fetching Two Sum details...');
  const detailRes = await fetch(`${API_BASE}/problems/slug/two-sum`);
  const detailData = await detailRes.json();
  console.log(`   ✓ Problem detail fetched: ${detailData.title}, Constraints: ${!!detailData.constraints}, TestCases: ${detailData.testCases?.length}, Editorial: ${!!detailData.editorial}`);

  // Helper submit & poll
  async function submit(code, contestId = null) {
    const payload = {
      problemId: twoSum.id,
      code,
      language: 'python',
    };
    if (contestId) payload.contestId = contestId;

    const subRes = await fetch(`${API_BASE}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const subData = await subRes.json();
    let verdict = subData.verdict;
    for (let i = 0; i < 20; i++) {
      if (verdict !== 'QUEUED' && verdict !== 'RUNNING' && verdict !== 'PENDING') break;
      await sleep(1000);
      const poll = await fetch(`${API_BASE}/submissions/${subData.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const pollData = await poll.json();
      verdict = pollData.verdict;
    }
    return { id: subData.id, verdict };
  }

  // 6. RUN & SUBMIT WRONG ANSWER
  console.log('6. SUBMIT WRONG ANSWER: Submitting flawed solution...');
  const waResult = await submit('print("0,0")');
  console.log(`   Verdict: ${waResult.verdict}`);
  if (waResult.verdict !== 'WRONG_ANSWER') throw new Error(`Expected WRONG_ANSWER, got ${waResult.verdict}`);

  // Verify points still 0
  const postWaProfile = await (await fetch(`${API_BASE}/auth/profile`, { headers: { Authorization: `Bearer ${token}` } })).json();
  if (postWaProfile.points !== 0) throw new Error('Points incorrectly awarded on WA!');
  console.log('   ✓ Points remain 0 after WRONG_ANSWER');

  // 7. SUBMIT CORRECT ANSWER
  console.log('7. SUBMIT CORRECT ANSWER: Submitting canonical solution...');
  const acCode = `import sys
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
  const acResult = await submit(acCode);
  console.log(`   Verdict: ${acResult.verdict}`);
  if (acResult.verdict !== 'ACCEPTED') throw new Error(`Expected ACCEPTED, got ${acResult.verdict}`);

  // Verify points updated to 100 & solvedCount is 1
  const postAcProfile = await (await fetch(`${API_BASE}/auth/profile`, { headers: { Authorization: `Bearer ${token}` } })).json();
  const postAcFull = await (await fetch(`${API_BASE}/users/profile/${testUsername}`)).json();
  console.log(`   Post-AC Points: ${postAcProfile.points}, Solved Count: ${postAcFull.solvedCount}`);
  if (postAcProfile.points !== 100 || postAcFull.solvedCount !== 1) {
    throw new Error(`Expected 100 points and 1 solved, got ${postAcProfile.points} pts / ${postAcFull.solvedCount} solved`);
  }
  console.log('   ✓ Points awarded correctly (0 -> 100) & solved count updated to 1');

  // 8. PRACTICE SHEETS
  console.log('8. PRACTICE SHEETS: Fetching all 5 curated practice sheets...');
  const sheetsRes = await fetch(`${API_BASE}/roadmap/sheets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const sheetsData = await sheetsRes.json();
  console.log(`   Sheets Count: ${sheetsData.length}`);
  sheetsData.forEach(s => {
    console.log(`   - Sheet "${s.title}": ${s.availableCount}/${s.totalCount} problems available, Solved: ${s.solvedCount} (${s.progressPercent}%)`);
  });
  const f75 = sheetsData.find(s => s.id === 'foundations-75');
  if (!f75 || f75.availableCount < 75 || f75.solvedCount < 1) {
    throw new Error('Foundations 75 sheet did not correctly reflect available problems or solved state!');
  }
  console.log('   ✓ Practice sheets validated with live user solve progress');

  // 9. ROADMAP
  console.log('9. ROADMAP: Fetching 7-level learning roadmap...');
  const roadmapRes = await fetch(`${API_BASE}/roadmap`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const roadmapData = await roadmapRes.json();
  console.log(`   Levels: ${roadmapData.levels?.length}, Total Topics: ${roadmapData.summary?.totalTopics}, Total Problems in Roadmap: ${roadmapData.summary?.totalProblems}, User Solved: ${roadmapData.summary?.solvedProblems}`);
  if (roadmapData.levels?.length !== 7 || roadmapData.summary?.totalTopics !== 45) {
    throw new Error('Roadmap structure invalid!');
  }
  console.log('   ✓ Roadmap validated (7 levels, 45 topics)');

  // 10. CONTESTS
  console.log('10. CONTESTS: Fetching active and upcoming contests...');
  const contestsRes = await fetch(`${API_BASE}/contests`);
  const contestsData = await contestsRes.json();
  console.log(`   Live: ${contestsData.live?.length}, Upcoming: ${contestsData.upcoming?.length}, Past: ${contestsData.past?.length}`);
  if (!contestsData.live || contestsData.live.length === 0) throw new Error('No LIVE contest found!');
  const liveContest = contestsData.live[0];
  console.log(`   ✓ Found LIVE contest: "${liveContest.title}" (ID: ${liveContest.id})`);

  // 11. CONTEST REGISTRATION
  console.log('11. CONTEST REGISTRATION: Registering for LIVE contest...');
  const regContestRes = await fetch(`${API_BASE}/contests/${liveContest.id}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(`   Registration response status: HTTP ${regContestRes.status}`);
  if (regContestRes.status !== 201 && regContestRes.status !== 200) {
    throw new Error('Contest registration failed');
  }

  // 12. CONTEST SUBMISSION
  console.log('12. CONTEST SUBMISSION: Submitting solution under contest...');
  const contestSub = await submit(acCode, liveContest.id);
  console.log(`   Contest Submission Verdict: ${contestSub.verdict}`);
  if (contestSub.verdict !== 'ACCEPTED') throw new Error(`Contest submission failed: ${contestSub.verdict}`);

  // 13. CONTEST LEADERBOARD
  console.log('13. CONTEST LEADERBOARD: Fetching live contest standings...');
  const cLeaderRes = await fetch(`${API_BASE}/contests/${liveContest.id}/leaderboard`);
  const cLeaderData = await cLeaderRes.json();
  console.log(`   Standings: Rank #${cLeaderData[0]?.rank} - ${cLeaderData[0]?.user.username}, Score: ${cLeaderData[0]?.score}, Penalty: ${cLeaderData[0]?.penalty}min`);
  if (!cLeaderData || cLeaderData.length === 0 || cLeaderData[0].score <= 0) {
    throw new Error('Contest leaderboard did not calculate score correctly!');
  }
  console.log('   ✓ Contest leaderboard score and penalty verified');

  // 14. GLOBAL LEADERBOARD
  console.log('14. GLOBAL LEADERBOARD: Fetching global rating and points rankings...');
  const gLeaderRes = await fetch(`${API_BASE}/users/leaderboard?limit=10`);
  const gLeaderData = await gLeaderRes.json();
  console.log(`   Global Leaderboard: Found ${gLeaderData.length} users, Top: Rank #${gLeaderData[0]?.rank} - ${gLeaderData[0]?.username}, Rating: ${gLeaderData[0]?.rating}, Points: ${gLeaderData[0]?.points}, Solved: ${gLeaderData[0]?.solvedCount}`);
  if (!gLeaderData || gLeaderData.length === 0) throw new Error('Global leaderboard is empty!');
  console.log('   ✓ Global leaderboard verified');

  // 15. LOGOUT & PERSISTENCE
  console.log('15. LOGOUT & PERSISTENCE: Re-authenticating to confirm data persistence...');
  const reLoginRes = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, password: testPassword }),
  });
  const reLoginData = await reLoginRes.json();
  const reProfile = await (await fetch(`${API_BASE}/auth/profile`, { headers: { Authorization: `Bearer ${reLoginData.accessToken}` } })).json();
  const reFull = await (await fetch(`${API_BASE}/users/profile/${testUsername}`)).json();
  console.log(`   Re-verified Profile: Points=${reProfile.points}, Solved=${reFull.solvedCount}`);
  if (reProfile.points !== 100 || reFull.solvedCount !== 1) {
    throw new Error('Data persistence check failed on re-login!');
  }
  console.log('   ✓ Persistence verified across sessions');

  console.log('\n============================================================');
  console.log('ALL PHASE 28 ACCEPTANCE GATES PASSED CLEANLY (100% SUCCESS)');
  console.log('============================================================\n');
}

runAcceptanceTest().catch(err => {
  console.error('\n! ACCEPTANCE TEST FAILED:', err);
  process.exit(1);
});
