const PROD_API = 'https://codejudge-backend-zh9l.onrender.com/api';

async function testEndpoints() {
  const endpoints = [
    '/auth/health',
    '/problems',
    '/problems?page=1&limit=5',
    '/problems/slug/two-sum',
    '/roadmap',
    '/roadmap/sheets',
    '/roadmap/sheets/top-interview-150',
    '/contests',
    '/leaderboard',
    '/users/leaderboard',
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(`${PROD_API}${ep}`);
      const text = await res.text();
      console.log(`Endpoint ${ep} -> Status ${res.status}:`, text.slice(0, 200));
    } catch (e) {
      console.log(`Endpoint ${ep} -> Error:`, e.message);
    }
  }
}

testEndpoints();
