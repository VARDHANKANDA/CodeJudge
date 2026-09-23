const PROD_API = 'https://codejudge-backend-zh9l.onrender.com/api';
const LOCAL_API = 'http://localhost:5000/api';

async function testHealth(baseUrl, label) {
  console.log(`\n--- Testing ${label}: ${baseUrl} ---`);
  try {
    const start = Date.now();
    const res = await fetch(`${baseUrl}/problems?page=1&limit=5`);
    const elapsed = Date.now() - start;
    console.log(`Status: ${res.status} ${res.statusText} (${elapsed}ms)`);
    if (res.ok) {
      const data = await res.json();
      console.log(`Response meta:`, {
        total: data.total,
        page: data.page,
        limit: data.limit,
        problemsCount: data.problems?.length || data.data?.length || (Array.isArray(data) ? data.length : 0),
      });
      if (data.problems && data.problems.length > 0) {
        console.log(`First problem: [${data.problems[0].slug}] ${data.problems[0].title}`);
      }
    } else {
      const text = await res.text();
      console.log(`Error body:`, text.slice(0, 300));
    }
  } catch (err) {
    console.error(`Fetch failed for ${label}:`, err.message);
  }
}

async function run() {
  await testHealth(LOCAL_API, 'LOCAL BACKEND');
  await testHealth(PROD_API, 'PRODUCTION RENDER BACKEND');
}

run();
