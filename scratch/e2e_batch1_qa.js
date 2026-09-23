const puppeteer = require('d:/CodeJudge/backend/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3000';
const API_URL = 'http://localhost:5000/api';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const ARTIFACT_DIR = path.join(__dirname, '..');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('Starting Batch 1 E2E Chrome QA...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER CONSOLE ERROR:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('BROWSER PAGE ERROR:', err.toString());
  });

  try {
    // 1. Log in as admin via API
    console.log('Logging in as Admin (admin@codejudge.com)...');
    const adminLoginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@codejudge.com', password: 'admin123' }),
    });
    const adminData = await adminLoginRes.json();

    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
    await page.evaluate((u, a, r) => {
      localStorage.setItem('user', JSON.stringify(u));
      localStorage.setItem('accessToken', a);
      localStorage.setItem('refreshToken', r);
    }, adminData.user, adminData.accessToken, adminData.refreshToken);
    console.log('Admin session set.');

    // 2. Test Roadmap Page (/roadmap)
    console.log('Testing Roadmap (/roadmap)...');
    await page.goto(`${BASE_URL}/roadmap`, { waitUntil: 'networkidle2' });
    await sleep(2000);
    const roadmapPath = path.join(SCREENSHOT_DIR, 'batch1_roadmap.png');
    await page.screenshot({ path: roadmapPath, fullPage: true });
    fs.copyFileSync(roadmapPath, path.join(ARTIFACT_DIR, 'batch1_roadmap.png'));
    console.log('Roadmap screenshot saved.');

    // 3. Test Sheets Page (/sheets)
    console.log('Testing Curated Sheets (/sheets)...');
    await page.goto(`${BASE_URL}/sheets`, { waitUntil: 'networkidle2' });
    await sleep(2000);
    const sheetsPath = path.join(SCREENSHOT_DIR, 'batch1_sheets.png');
    await page.screenshot({ path: sheetsPath, fullPage: true });
    fs.copyFileSync(sheetsPath, path.join(ARTIFACT_DIR, 'batch1_sheets.png'));
    console.log('Sheets screenshot saved.');

    // 4. Sample Problem QA: Binary Search (/problems/binary-search)
    console.log('Testing Problem: Binary Search (/problems/binary-search)...');
    await page.goto(`${BASE_URL}/problems/binary-search`, { waitUntil: 'networkidle2' });
    await sleep(2000);

    // Screenshot statement
    const probStmtPath = path.join(SCREENSHOT_DIR, 'batch1_binary_search_stmt.png');
    await page.screenshot({ path: probStmtPath });
    fs.copyFileSync(probStmtPath, path.join(ARTIFACT_DIR, 'batch1_binary_search_stmt.png'));

    // Check hints
    console.log('Opening hints tab...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find(b => b.textContent && b.textContent.includes('Hints'));
      if (btn) btn.click();
    });
    await sleep(1000);
    const probHintsPath = path.join(SCREENSHOT_DIR, 'batch1_binary_search_hints.png');
    await page.screenshot({ path: probHintsPath });
    fs.copyFileSync(probHintsPath, path.join(ARTIFACT_DIR, 'batch1_binary_search_hints.png'));

    // Check editorial
    console.log('Opening editorial tab...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find(b => b.textContent && b.textContent.includes('Editorial'));
      if (btn) btn.click();
    });
    await sleep(1000);
    const probEditorialPath = path.join(SCREENSHOT_DIR, 'batch1_binary_search_editorial.png');
    await page.screenshot({ path: probEditorialPath });
    fs.copyFileSync(probEditorialPath, path.join(ARTIFACT_DIR, 'batch1_binary_search_editorial.png'));

    // 5. Submit Wrong Answer to Binary Search
    console.log('Submitting incorrect code to Binary Search...');
    const probDataRes = await fetch(`${API_URL}/problems/slug/binary-search`);
    const probData = await probDataRes.json();

    const wrongSubmitRes = await fetch(`${API_URL}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminData.accessToken}`
      },
      body: JSON.stringify({
        problemId: probData.id,
        language: 'python',
        code: 'print(-999)'
      })
    });
    const wrongSub = await wrongSubmitRes.json();
    console.log('Wrong submission response:', wrongSub);

    // Poll until judged
    let wrongVerdict = wrongSub.verdict;
    for (let i = 0; i < 15; i++) {
      await sleep(1000);
      const checkRes = await fetch(`${API_URL}/submissions/${wrongSub.id}`, {
        headers: { 'Authorization': `Bearer ${adminData.accessToken}` }
      });
      const checkData = await checkRes.json();
      wrongVerdict = checkData.verdict;
      if (wrongVerdict !== 'QUEUED' && wrongVerdict !== 'JUDGING' && wrongVerdict !== 'PENDING') {
        console.log(`Wrong submission final verdict: ${wrongVerdict} (Expected: WRONG_ANSWER)`);
        break;
      }
    }

    // 6. Submit Correct Answer to Binary Search
    console.log('Submitting correct code to Binary Search...');
    const correctCode = `import sys

def solve():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
    target = int(lines[1].strip())
    l, r = 0, len(nums) - 1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target:
            print(m)
            return
        elif nums[m] < target:
            l = m + 1
        else:
            r = m - 1
    print(-1)

solve()
`;
    const correctSubmitRes = await fetch(`${API_URL}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminData.accessToken}`
      },
      body: JSON.stringify({
        problemId: probData.id,
        language: 'python',
        code: correctCode
      })
    });
    const correctSub = await correctSubmitRes.json();
    console.log('Correct submission response:', correctSub);

    // Poll until judged
    let correctVerdict = correctSub.verdict;
    for (let i = 0; i < 15; i++) {
      await sleep(1000);
      const checkRes = await fetch(`${API_URL}/submissions/${correctSub.id}`, {
        headers: { 'Authorization': `Bearer ${adminData.accessToken}` }
      });
      const checkData = await checkRes.json();
      correctVerdict = checkData.verdict;
      if (correctVerdict !== 'QUEUED' && correctVerdict !== 'JUDGING' && correctVerdict !== 'PENDING') {
        console.log(`Correct submission final verdict: ${correctVerdict} (Expected: ACCEPTED)`);
        break;
      }
    }

    // Refresh problem page and check Submissions tab
    await page.goto(`${BASE_URL}/problems/binary-search`, { waitUntil: 'networkidle2' });
    await sleep(2000);
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find(b => b.textContent && b.textContent.includes('Submissions'));
      if (btn) btn.click();
    });
    await sleep(2000);
    const subHistoryPath = path.join(SCREENSHOT_DIR, 'batch1_binary_search_submissions.png');
    await page.screenshot({ path: subHistoryPath });
    fs.copyFileSync(subHistoryPath, path.join(ARTIFACT_DIR, 'batch1_binary_search_submissions.png'));

    // 7. Test Admin Quality Dashboard (/admin)
    console.log('Testing Admin Quality Dashboard (/admin)...');
    await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle2' });
    await sleep(2000);

    // Click Problem Quality tab
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const probBtn = buttons.find((b) => b.innerText.includes('Problem Quality') || b.innerText.includes('Verifier'));
      if (probBtn) probBtn.click();
    });
    await sleep(2000);

    const adminPath = path.join(SCREENSHOT_DIR, 'batch1_admin_quality.png');
    await page.screenshot({ path: adminPath, fullPage: true });
    fs.copyFileSync(adminPath, path.join(ARTIFACT_DIR, 'batch1_admin_quality.png'));
    console.log('Admin Quality screenshot saved.');

    console.log('All Batch 1 QA tests completed successfully!');
  } catch (err) {
    console.error('QA Test Failure:', err);
    throw err;
  } finally {
    await browser.close();
  }
}

run();
