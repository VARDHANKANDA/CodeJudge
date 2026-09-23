const puppeteer = require('d:/CodeJudge/backend/node_modules/puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testDeployedFrontend() {
  console.log('--- Testing Deployed Vercel Frontend: https://code-judge-three.vercel.app ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const networkLogs = [];
  page.on('request', req => {
    if (req.url().includes('/api/')) {
      networkLogs.push(`REQ: ${req.method()} ${req.url()}`);
    }
  });
  page.on('response', res => {
    if (res.url().includes('/api/')) {
      networkLogs.push(`RES: ${res.status()} ${res.url()}`);
    }
  });

  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
  });

  try {
    console.log('Navigating to https://code-judge-three.vercel.app/problems ...');
    await page.goto('https://code-judge-three.vercel.app/problems', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Check elements on page
    const title = await page.title();
    console.log('Page title:', title);

    // Get table or problem rows
    const problemTitles = await page.$$eval('a[href^="/problems/"]', els => els.map(e => e.textContent?.trim()).filter(Boolean));
    console.log(`Problems visible on deployed frontend: ${problemTitles.length}`);
    if (problemTitles.length > 0) {
      console.log('Sample visible problems:', problemTitles.slice(0, 5));
    }

    console.log('\n--- API Network Calls ---');
    console.log(networkLogs.slice(0, 15).join('\n'));

    console.log('\n--- Console Logs ---');
    console.log(consoleLogs.filter(l => l.includes('error') || l.includes('warn')).join('\n') || 'No console errors/warnings.');

  } catch (err) {
    console.error('Deployed frontend test error:', err.message);
  } finally {
    await browser.close();
  }
}

testDeployedFrontend();
