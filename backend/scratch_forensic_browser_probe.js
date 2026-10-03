const puppeteer = require('d:/CodeJudge/backend/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PROD_URL = 'https://code-judge-three.vercel.app';

async function forensicProbe() {
  console.log('============================================================');
  console.log('RULE ZERO & PHASE 3: BROWSER NETWORK FORENSIC PROBE');
  console.log(`Target Frontend: ${PROD_URL}`);
  console.log('============================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  const networkLogs = [];

  page.on('request', req => {
    networkLogs.push({
      type: 'REQUEST',
      url: req.url(),
      method: req.method(),
    });
    if (req.url().includes('/api/')) {
      console.log(`>>> [NET REQ] ${req.method()} ${req.url()}`);
    }
  });

  page.on('response', async res => {
    const url = res.url();
    if (url.includes('/api/')) {
      let bodyText = '';
      try {
        bodyText = await res.text();
      } catch (e) {
        bodyText = `<unable to read body: ${e.message}>`;
      }
      console.log(`<<< [NET RES] ${res.status()} ${url}`);
      console.log(`    Response Body: ${bodyText.slice(0, 500)}${bodyText.length > 500 ? '...' : ''}`);
    }
  });

  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE ${msg.type().toUpperCase()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.log(`[BROWSER PAGE ERROR] ${err.toString()}`);
  });

  try {
    // 1. Probe /problems page
    console.log('\n--- 1. Probing https://code-judge-three.vercel.app/problems ---');
    await page.goto(`${PROD_URL}/problems`, { waitUntil: 'networkidle2', timeout: 30000 });
    
    const problemsDom = await page.evaluate(() => {
      const rows = document.querySelectorAll('tbody tr, [data-problem-row]');
      const noProblemsText = document.body.innerText.includes('No problems found') || document.body.innerText.includes('Loading');
      return {
        title: document.title,
        rowCount: rows.length,
        bodySnippet: document.body.innerText.slice(0, 400),
      };
    });
    console.log('Problems DOM State:', JSON.stringify(problemsDom, null, 2));

    // 2. Probe /sheets page
    console.log('\n--- 2. Probing https://code-judge-three.vercel.app/sheets ---');
    await page.goto(`${PROD_URL}/sheets`, { waitUntil: 'networkidle2', timeout: 30000 });
    
    const sheetsDom = await page.evaluate(() => {
      const problemRows = document.querySelectorAll('tbody tr, [data-sheet-problem]');
      const buttons = Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim());
      return {
        title: document.title,
        problemRowCount: problemRows.length,
        buttons: buttons.slice(0, 10),
        bodySnippet: document.body.innerText.slice(0, 400),
      };
    });
    console.log('Sheets DOM State:', JSON.stringify(sheetsDom, null, 2));

  } catch (err) {
    console.error('Forensic probe error:', err);
  } finally {
    await browser.close();
  }
}

forensicProbe();
