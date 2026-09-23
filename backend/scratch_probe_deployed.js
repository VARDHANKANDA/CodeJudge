const PROD_API = 'https://codejudge-backend-zh9l.onrender.com/api';

async function probe() {
  console.log('Probing Render API...');
  try {
    const probRes = await fetch(`${PROD_API}/problems?page=1&limit=10`);
    const probData = await probRes.json();
    console.log('Render /problems status:', probRes.status, 'Total problems in Render DB:', probData.total, 'Items returned:', probData.items?.length);

    const sheetsRes = await fetch(`${PROD_API}/roadmap/sheets`);
    const sheetsData = await sheetsRes.json();
    console.log('Render /roadmap/sheets status:', sheetsRes.status, 'Sheets count:', Array.isArray(sheetsData) ? sheetsData.length : 'not an array');
    if (Array.isArray(sheetsData)) {
      sheetsData.forEach(s => console.log(`   - Sheet: ${s.title}, Available Problems: ${s.problems?.length}, Total Count: ${s.totalCount}`));
    }

    const contestsRes = await fetch(`${PROD_API}/contests`);
    const contestsData = await contestsRes.json();
    console.log('Render /contests status:', contestsRes.status, 'Contests:', contestsData);
  } catch (err) {
    console.error('Probe failed:', err.message);
  }
}

probe();
