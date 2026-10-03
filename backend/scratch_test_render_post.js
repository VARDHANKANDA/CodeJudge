const PROD_API = 'https://codejudge-backend-zh9l.onrender.com/api';

async function testPost() {
  const loginRes = await fetch(`${PROD_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@codejudge.com',
      password: 'admin123',
    }),
  });
  const loginData = await loginRes.json();
  const token = loginData.accessToken;

  // Let's create a problem without codeTemplates first
  const res1 = await fetch(`${PROD_API}/problems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: 'Test Create Problem',
      slug: `test-create-${Date.now()}`,
      description: 'Testing if Problem table insert succeeds on Render PostgreSQL',
      difficulty: 'EASY',
      timeLimit: 1000,
      memoryLimit: 256,
      constraints: 'N <= 100',
      sampleInput: '1',
      sampleOutput: '1',
    }),
  });
  console.log('Create Problem (without codeTemplates) -> Status:', res1.status, 'Body:', await res1.text());
}

testPost();
