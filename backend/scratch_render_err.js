async function test() {
  const res = await fetch('https://codejudge-backend-zh9l.onrender.com/api/problems?page=1&limit=10');
  console.log('Status:', res.status);
  const text = await res.text();
  console.log('Body:', text);
}
test();
