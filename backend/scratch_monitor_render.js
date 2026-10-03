const PROD_API = 'https://codejudge-backend-zh9l.onrender.com/api';

async function checkDeployment() {
  console.log(`Checking Render API at ${new Date().toISOString()}...`);
  try {
    const probRes = await fetch(`${PROD_API}/problems?page=1&limit=5`);
    const probText = await probRes.text();
    console.log(`[PROBLEMS] Status: ${probRes.status}, Body: ${probText.slice(0, 150)}`);

    const sheetsRes = await fetch(`${PROD_API}/roadmap/sheets`);
    const sheetsData = await sheetsRes.json();
    if (Array.isArray(sheetsData)) {
      console.log(`[SHEETS] Status: ${sheetsRes.status}, Sheets count: ${sheetsData.length}`);
      sheetsData.forEach(s => {
        console.log(`  - ${s.title}: ${s.availableCount} / ${s.totalCount} problems available (problems length: ${s.problems?.length})`);
      });
    } else {
      console.log(`[SHEETS] Status: ${sheetsRes.status}, Body: ${JSON.stringify(sheetsData)}`);
    }

    const contestsRes = await fetch(`${PROD_API}/contests`);
    const contestsData = await contestsRes.json();
    console.log(`[CONTESTS] Status: ${contestsRes.status}, Live: ${contestsData.live?.length}, Upcoming: ${contestsData.upcoming?.length}, Past: ${contestsData.past?.length}`);

    const usersRes = await fetch(`${PROD_API}/users/leaderboard`);
    const usersData = await usersRes.json();
    console.log(`[LEADERBOARD] Status: ${usersRes.status}, Users count: ${Array.isArray(usersData) ? usersData.length : 0}`);
  } catch (err) {
    console.log(`[ERROR] ${err.message}`);
  }
}

checkDeployment();
