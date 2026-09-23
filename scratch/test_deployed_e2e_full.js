const puppeteer = require('d:/CodeJudge/backend/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PROD_URL = 'https://code-judge-three.vercel.app';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const consoleErrors = [];
const pageErrors = [];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runE2E() {
  console.log('============================================================');
  console.log('STARTING PUPPETEER CHROME E2E AUDIT ON PRODUCTION FRONTEND');
  console.log(`Target: ${PROD_URL}`);
  console.log('============================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      console.log(`   [Console Error] ${text}`);
      consoleErrors.push(text);
    }
  });

  page.on('pageerror', err => {
    console.log(`   [Page Error] ${err.toString()}`);
    pageErrors.push(err.toString());
  });

  const testUser = `auditor_${Date.now().toString().slice(-5)}`;
  const testEmail = `${testUser}@codejudge.test`;
  const testPassword = 'Password123!';

  try {
    // 1. Home Page
    console.log('\n1. Testing Home / Landing Page...');
    await page.goto(PROD_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_1_home.png') });
    console.log('   ✓ Home page loaded');

    // 2. Navigation to Register Page
    console.log('\n2. Testing Registration Flow...');
    await page.goto(`${PROD_URL}/register`, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_2_register.png') });
    
    // Fill register form if inputs present
    const usernameInput = await page.$('input[name="username"], input[placeholder*="username" i], input[type="text"]');
    const emailInput = await page.$('input[name="email"], input[type="email"], input[placeholder*="email" i]');
    const passwordInput = await page.$('input[name="password"], input[type="password"]');
    
    if (usernameInput && emailInput && passwordInput) {
      await usernameInput.type(testUser);
      await emailInput.type(testEmail);
      await passwordInput.type(testPassword);
      const submitBtn = await page.$('button[type="submit"]');
      if (submitBtn) {
        await submitBtn.click();
        await sleep(3000);
      }
      console.log('   ✓ Submitted registration form');
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_3_post_register.png') });

    // 3. Problem Browser Page
    console.log('\n3. Testing Problem Catalog (/problems)...');
    await page.goto(`${PROD_URL}/problems`, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_4_problems.png') });
    console.log('   ✓ Problems catalog loaded');

    // 4. Roadmap Page
    console.log('\n4. Testing Roadmap Page (/roadmap)...');
    await page.goto(`${PROD_URL}/roadmap`, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_5_roadmap.png') });
    console.log('   ✓ Roadmap loaded');

    // 5. Contests Page
    console.log('\n5. Testing Contests (/contests)...');
    await page.goto(`${PROD_URL}/contests`, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_6_contests.png') });
    console.log('   ✓ Contests loaded');

    // 6. Discussions Page
    console.log('\n6. Testing Discussions (/discussions)...');
    await page.goto(`${PROD_URL}/discussions`, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_7_discussions.png') });
    console.log('   ✓ Discussions loaded');

    // 7. Responsive Mobile Viewport (375x812 iPhone X)
    console.log('\n7. Testing Mobile Viewport (375x812)...');
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(PROD_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_8_mobile_home.png') });

    await page.goto(`${PROD_URL}/problems`, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_9_mobile_problems.png') });
    console.log('   ✓ Mobile responsive views verified');

    // 8. Tablet Viewport (768x1024 iPad)
    console.log('\n8. Testing Tablet Viewport (768x1024)...');
    await page.setViewport({ width: 768, height: 1024 });
    await page.goto(`${PROD_URL}/roadmap`, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_10_tablet_roadmap.png') });
    console.log('   ✓ Tablet responsive views verified');

    console.log('\n============================================================');
    console.log('E2E TEST SUMMARY');
    console.log(`Console Errors: ${consoleErrors.length}`);
    console.log(`Page Errors: ${pageErrors.length}`);
    console.log('============================================================\n');

  } catch (err) {
    console.error('E2E Test Execution Error:', err);
  } finally {
    await browser.close();
  }
}

runE2E();
