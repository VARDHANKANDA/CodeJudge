const PROD_API = 'https://codejudge-backend-zh9l.onrender.com/api';

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function monitor() {
  for (let attempt = 1; attempt <= 12; attempt++) {
    console.log(`\n--- Attempt ${attempt} at ${new Date().toLocaleTimeString()} ---`);
    try {
      const probRes = await fetch(`${PROD_API}/problems?page=1&limit=5`);
      console.log(`[PROBLEMS] Status: ${probRes.status}`);
      if (probRes.status === 200) {
        const probData = await probRes.json();
        console.log(`[PROBLEMS SUCCESS!] Total problems: ${probData.total}, Items in page: ${probData.items?.length}`);
        if (probData.items && probData.items.length > 0) {
          console.log(`First problem: ${probData.items[0].title} (${probData.items[0].slug})`);
        }

        const sheetsRes = await fetch(`${PROD_API}/roadmap/sheets`);
        const sheetsData = await sheetsRes.json();
        console.log(`[SHEETS SUCCESS!]`);
        sheetsData.forEach(s => {
          console.log(`  * ${s.title}: ${s.availableCount} / ${s.totalCount} problems available`);
        });

        const contestsRes = await fetch(`${PROD_API}/contests`);
        const contestsData = await contestsRes.json();
        console.log(`[CONTESTS SUCCESS!] Live: ${contestsData.live?.length}, Upcoming: ${contestsData.upcoming?.length}, Past: ${contestsData.past?.length}`);

        const usersRes = await fetch(`${PROD_API}/users/leaderboard`);
        const usersData = await usersRes.json();
        console.log(`[LEADERBOARD] Users count: ${usersData.length}`);

        console.log('\n>>> RENDER BACKEND IS FULLY LIVE AND VERIFIED! <<<');
        process.exit(0);
      }
    } catch (e) {
      console.log(`[ERROR / PENDING] ${e.message}`);
    }
    await sleep(15000);
  }
  console.log('Timeout waiting for deployment');
}

monitor();
