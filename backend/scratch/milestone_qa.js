const puppeteer = require('d:/CodeJudge/backend/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runMilestoneQA() {
  console.log('--- Starting Milestone 500+ E2E Chrome QA ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Check Homepage
  console.log('1. Checking Homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'milestone_1_home.png'), fullPage: false });

  // 2. Check Problems Listing
  console.log('2. Checking Problems List...');
  await page.goto('http://localhost:3000/problems', { waitUntil: 'networkidle2' });
  await sleep(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'milestone_2_problems.png'), fullPage: false });

  // 3. Check Roadmap View
  console.log('3. Checking Roadmap...');
  await page.goto('http://localhost:3000/roadmap', { waitUntil: 'networkidle2' });
  await sleep(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'milestone_3_roadmap.png'), fullPage: false });

  // 4. Check Practice Sheets
  console.log('4. Checking Curated Sheets...');
  await page.goto('http://localhost:3000/sheets', { waitUntil: 'networkidle2' });
  await sleep(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'milestone_4_sheets.png'), fullPage: false });

  // 5. Check Contests
  console.log('5. Checking Contests...');
  await page.goto('http://localhost:3000/contests', { waitUntil: 'networkidle2' });
  await sleep(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'milestone_5_contests.png'), fullPage: false });

  // 6. Check Problem Workspace (e.g. LRU Cache)
  console.log('6. Checking Problem Workspace (lru-cache)...');
  await page.goto('http://localhost:3000/problems/lru-cache', { waitUntil: 'networkidle2' });
  await sleep(1500);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'milestone_6_problem_stmt.png'), fullPage: false });

  // 7. Check Editorial Tab
  console.log('7. Checking Editorial Tab...');
  try {
    const tabs = await page.$$('button');
    for (const tab of tabs) {
      const text = await page.evaluate(el => el.textContent, tab);
      if (text && text.includes('Editorial')) {
        await tab.click();
        await sleep(1000);
        break;
      }
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'milestone_7_editorial.png'), fullPage: false });
  } catch (e) {
    console.log('Editorial tab click note:', e.message);
  }

  // 8. Check Admin Quality Center
  console.log('8. Checking Admin Quality Center...');
  await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle2' });
  await sleep(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'milestone_8_admin.png'), fullPage: false });

  await browser.close();
  console.log('✓ All 8 milestone platform screenshots successfully captured in screenshots directory!');
}

runMilestoneQA().catch(console.error);
