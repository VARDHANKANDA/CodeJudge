const PROD_API = 'https://codejudge-backend-zh9l.onrender.com/api';

async function testProdAuth() {
  console.log('--- Testing Production Render Backend Authentication & Refresh/Logout ---');
  const testEmail = `qa_audit_${Date.now()}@codejudge.test`;
  const testPassword = 'Password123!';
  const testUsername = `qa_user_${Date.now().toString().slice(-6)}`;

  try {
    console.log(`1. Registering new user: ${testEmail} (${testUsername})...`);
    const regRes = await fetch(`${PROD_API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        username: testUsername,
        password: testPassword,
        name: 'QA Auditor',
      }),
    });

    console.log('Register HTTP Status:', regRes.status, regRes.statusText);

    console.log('2. Testing Login with credentials...');
    const loginRes = await fetch(`${PROD_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
      }),
    });
    console.log('Login HTTP Status:', loginRes.status, loginRes.statusText);
    const loginData = await loginRes.json();
    let refreshToken = loginData.refreshToken;

    console.log('3. Testing /auth/refresh endpoint...');
    const refRes = await fetch(`${PROD_API}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    console.log('Refresh HTTP Status:', refRes.status);
    const refData = await refRes.json();
    console.log('New refresh token received:', !!refData.refreshToken);
    // Update to the new refresh token
    if (refData.refreshToken) {
      refreshToken = refData.refreshToken;
    }

    console.log('4. Testing /auth/logout endpoint with active refresh token...');
    const logoutRes = await fetch(`${PROD_API}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    console.log('Logout HTTP Status:', logoutRes.status, logoutRes.statusText);
    const logoutData = await logoutRes.json();
    console.log('Logout Response:', logoutData);
  } catch (err) {
    console.error('Prod auth test failed:', err);
  }
}

testProdAuth();
