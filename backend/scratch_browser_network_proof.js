const puppeteer = require('d:/CodeJudge/backend/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'scratch', 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runProof() {
  console.log('============================================================');
  console.log('PHASE 3: BROWSER NETWORK & DOM CONCRETE EVIDENCE AUDIT');
  console.log(`Target: ${APP_URL}`);
  console.log('============================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  const networkTraffic = [];

  page.on('request', req => {
    if (req.url().includes('/api/')) {
      networkTraffic.push({ type: 'REQ', method: req.method(), url: req.url() });
      console.log(`>>> [NET REQ] ${req.method()} ${req.url()}`);
    }
  });

  page.on('response', async res => {
    if (res.url().includes('/api/')) {
      let bodyText = '';
      try {
        bodyText = await res.text();
      } catch (e) {
        bodyText = `<error reading body: ${e.message}>`;
      }
      networkTraffic.push({ type: 'RES', status: res.status(), url: res.url(), bodyLength: bodyText.length });
      console.log(`<<< [NET RES] ${res.status()} ${res.url()}`);
      console.log(`    Body snippet: ${bodyText.slice(0, 300)}...`);
    }
  });

  try {
    // -------------------------------------------------------------
    // 1. PROBLEMS BROWSER PROOF
    // -------------------------------------------------------------
    console.log('\n--- 1. PROVING PROBLEMS DISPLAY (/problems) ---');
    await page.goto(`${APP_URL}/problems`, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'proof_1_problems.png') });

    const problemsState = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('tbody tr')).map(tr => {
        const titleEl = tr.querySelector('a');
        const diffEl = tr.querySelector('span');
        return {
          title: titleEl ? titleEl.innerText.trim() : 'N/A',
          href: titleEl ? titleEl.getAttribute('href') : 'N/A',
          difficulty: diffEl ? diffEl.innerText.trim() : 'N/A',
        };
      });
      return {
        totalRowsRendered: rows.length,
        first5Problems: rows.slice(0, 5),
        pageTextHeader: document.querySelector('h1')?.innerText || '',
      };
    });

    console.log('PROBLEMS PROOF RESULT:');
    console.log(`   Header: "${problemsState.pageTextHeader}"`);
    console.log(`   Total Rows Rendered in Browser Table: ${problemsState.totalRowsRendered}`);
    console.log('   First 5 Rendered Problems:');
    problemsState.first5Problems.forEach((p, idx) => {
      console.log(`     ${idx + 1}. ${p.title} (${p.difficulty}) -> ${p.href}`);
    });

    // -------------------------------------------------------------
    // 2. PRACTICE SHEETS PROOF
    // -------------------------------------------------------------
    console.log('\n--- 2. PROVING PRACTICE SHEETS DISPLAY (/sheets) ---');
    await page.goto(`${APP_URL}/sheets`, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'proof_2_sheets.png') });

    const sheetsState = await page.evaluate(() => {
      const tabButtons = Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim()).filter(t => t.length > 0);
      const problemLinks = Array.from(document.querySelectorAll('a[href^="/problems/"]')).map(a => {
        return {
          title: a.innerText.trim(),
          href: a.getAttribute('href'),
        };
      });
      return {
        tabButtons,
        activeSheetProblemRows: problemLinks.length,
        first5SheetProblems: problemLinks.slice(0, 5),
      };
    });

    console.log('PRACTICE SHEETS PROOF RESULT:');
    console.log(`   Found ${sheetsState.tabButtons.length} Sheet Tabs: ${sheetsState.tabButtons.join(', ')}`);
    console.log(`   Active Sheet Rendered Problems in DOM: ${sheetsState.activeSheetProblemRows}`);
    console.log('   First 5 Rendered Sheet Problems:');
    sheetsState.first5SheetProblems.forEach((p, idx) => {
      console.log(`     ${idx + 1}. ${p.title.replace(/\n+/g, ' ')} -> ${p.href}`);
    });

    // -------------------------------------------------------------
    // 3. CONTESTS PROOF
    // -------------------------------------------------------------
    console.log('\n--- 3. PROVING CONTESTS DISPLAY (/contests) ---');
    await page.goto(`${APP_URL}/contests`, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'proof_3_contests.png') });

    const contestsState = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.glass-panel, h3, h2')).map(el => el.innerText.trim()).filter(t => t.includes('Challenge') || t.includes('Arena') || t.includes('Sprint'));
      return {
        contestTitles: Array.from(new Set(cards)),
      };
    });
    console.log('CONTESTS PROOF RESULT:');
    console.log(`   Rendered Contests in DOM: ${contestsState.contestTitles.join(' | ')}`);

    // -------------------------------------------------------------
    // 4. LEADERBOARD PROOF
    // -------------------------------------------------------------
    console.log('\n--- 4. PROVING LEADERBOARD DISPLAY (/leaderboard) ---');
    await page.goto(`${APP_URL}/leaderboard`, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'proof_4_leaderboard.png') });

    const leaderState = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('tbody tr')).map(tr => tr.innerText.replace(/\n+/g, ' | '));
      return {
        tableRows: rows.length,
        topRow: rows[0] || 'Empty',
      };
    });
    console.log('LEADERBOARD PROOF RESULT:');
    console.log(`   Leaderboard Rows in DOM: ${leaderState.tableRows}`);
    console.log(`   Top Ranking Row: ${leaderState.topRow}`);

    console.log('\n============================================================');
    console.log('CONCRETE BROWSER PROOF COMPLETED SUCCESSFULLY');
    console.log('============================================================\n');

  } catch (err) {
    console.error('Proof execution failed:', err);
  } finally {
    await browser.close();
  }
}

runProof();
