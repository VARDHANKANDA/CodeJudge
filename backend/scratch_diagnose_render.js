const PROD_API = 'https://codejudge-backend-zh9l.onrender.com/api';

async function diagnose() {
  console.log('--- Render Admin Diagnostic ---');
  // 1. Login as admin
  const loginRes = await fetch(`${PROD_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@codejudge.com',
      password: 'admin123',
    }),
  });
  const loginData = await loginRes.json();
  console.log('Login Status:', loginRes.status, 'User Role:', loginData.user?.role);
  if (!loginData.accessToken) {
    console.error('Failed to get access token');
    return;
  }
  const token = loginData.accessToken;

  // 2. Test Admin Metrics
  const metricsRes = await fetch(`${PROD_API}/admin/metrics`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('Admin Metrics Status:', metricsRes.status, 'Body:', await metricsRes.text());

  // 3. Test Create Problem with Admin Token
  const createRes = await fetch(`${PROD_API}/problems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: 'Diagnostic Problem',
      slug: `diag-prob-${Date.now()}`,
      description: 'Testing problem creation',
      difficulty: 'EASY',
      timeLimit: 1000,
      memoryLimit: 256,
      constraints: 'N <= 100',
      sampleInput: '1',
      sampleOutput: '1',
      codeTemplates: { python: 'pass' },
    }),
  });
  console.log('Create Problem Status:', createRes.status, 'Body:', await createRes.text());

  // 4. Test GET /problems after create
  const getRes = await fetch(`${PROD_API}/problems`);
  console.log('GET /problems Status:', getRes.status, 'Body:', await getRes.text());
}

diagnose();
