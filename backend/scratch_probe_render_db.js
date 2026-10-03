const PROD_API = 'https://codejudge-backend-zh9l.onrender.com/api';

async function probeRender() {
  console.log('Testing specific Render endpoints...\n');

  // Test 1: Problem by slug
  const slugRes = await fetch(`${PROD_API}/problems/slug/two-sum`);
  console.log('1. /problems/slug/two-sum -> Status:', slugRes.status, 'Body:', await slugRes.text());

  // Test 2: Roadmap
  const roadmapRes = await fetch(`${PROD_API}/roadmap`);
  console.log('2. /roadmap -> Status:', roadmapRes.status, 'Body:', await roadmapRes.text());

  // Test 3: Problem by non-existent UUID
  const idRes = await fetch(`${PROD_API}/problems/00000000-0000-0000-0000-000000000000`);
  console.log('3. /problems/fake-uuid -> Status:', idRes.status, 'Body:', await idRes.text());

  // Test 4: Create Problem on Render with admin/setter
  console.log('\nTesting Auth on Render...');
  const regRes = await fetch(`${PROD_API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: `render_probe_${Date.now()}@codejudge.test`,
      username: `rprobe_${Date.now().toString().slice(-6)}`,
      password: 'Password123!',
      name: 'Render Probe User',
    }),
  });
  const regData = await regRes.json();
  console.log('4. /auth/register -> Status:', regRes.status, 'User ID:', regData.id);

  // Test 5: Login
  const loginRes = await fetch(`${PROD_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: regData.email,
      password: 'Password123!',
    }),
  });
  const loginData = await loginRes.json();
  console.log('5. /auth/login -> Status:', loginRes.status, 'Access Token received:', !!loginData.accessToken);

  // Test 6: Create problem with this user token
  const createProbRes = await fetch(`${PROD_API}/problems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginData.accessToken}`,
    },
    body: JSON.stringify({
      title: 'Render Probe Problem',
      slug: `render-probe-${Date.now()}`,
      description: 'Testing if Problem creation succeeds on Render DB',
      difficulty: 'EASY',
      timeLimit: 1000,
      memoryLimit: 256,
      constraints: 'N <= 100',
      sampleInput: '1',
      sampleOutput: '1',
      codeTemplates: { python: 'def solve(): pass' },
    }),
  });
  console.log('6. POST /problems -> Status:', createProbRes.status, 'Body:', await createProbRes.text());
}

probeRender().catch(console.error);
