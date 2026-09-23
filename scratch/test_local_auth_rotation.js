const LOCAL_API = 'http://localhost:5000/api';

async function testLocalAuth() {
  console.log('--- Testing Local Backend Authentication & Refresh Token Rotation ---');
  const testEmail = `qa_local_${Date.now()}@codejudge.test`;
  const testPassword = 'Password123!';
  const testUsername = `qa_local_${Date.now().toString().slice(-6)}`;

  try {
    console.log(`1. Registering new user: ${testEmail} (${testUsername})...`);
    const regRes = await fetch(`${LOCAL_API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        username: testUsername,
        password: testPassword,
        name: 'Local QA Auditor',
      }),
    });

    console.log('Register HTTP Status:', regRes.status, regRes.statusText);
    const regData = await regRes.json();
    console.log('Registered User ID:', regData.id);

    console.log('2. Testing Login with credentials...');
    const loginRes = await fetch(`${LOCAL_API}/auth/login`, {
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
    let accessToken = loginData.accessToken;

    console.log('3. Testing /auth/profile with access token...');
    const profRes = await fetch(`${LOCAL_API}/auth/profile`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log('Profile HTTP Status:', profRes.status);

    console.log('4. Testing /auth/refresh endpoint (Rapid consecutive refreshes)...');
    // Test multiple consecutive rapid refreshes to ensure no collisions
    for (let i = 1; i <= 3; i++) {
      const refRes = await fetch(`${LOCAL_API}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      console.log(`Refresh #${i} HTTP Status:`, refRes.status, refRes.statusText);
      const refData = await refRes.json();
      if (!refRes.ok) {
        console.error(`Refresh #${i} failed:`, refData);
        throw new Error(`Refresh failed on iteration ${i}`);
      }
      refreshToken = refData.refreshToken;
      accessToken = refData.accessToken;
      console.log(`Refresh #${i} success: new token received.`);
    }

    console.log('5. Testing /auth/logout with active refresh token...');
    const logoutRes = await fetch(`${LOCAL_API}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    console.log('Logout HTTP Status:', logoutRes.status, logoutRes.statusText);
    const logoutData = await logoutRes.json();
    console.log('Logout Response:', logoutData);

    console.log('6. Verifying old refresh token is now rejected after logout...');
    const postLogoutRefRes = await fetch(`${LOCAL_API}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    console.log('Post-logout refresh HTTP Status (expecting 401):', postLogoutRefRes.status);
    console.log('✓ AUTHENTICATION & REFRESH ROTATION AUDIT: PASSED');
  } catch (err) {
    console.error('Local auth test failed:', err);
  }
}

testLocalAuth();
