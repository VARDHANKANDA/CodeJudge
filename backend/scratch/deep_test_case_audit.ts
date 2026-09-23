import { allExtendedProblemDefs } from '../prisma/problem-packs';

console.log(`Total Problems: ${allExtendedProblemDefs.length}`);

let totalTestCases = 0;
let problemsWithUnder4 = 0;

for (const p of allExtendedProblemDefs) {
  const count = (p.testCases || []).length;
  totalTestCases += count;
  if (count < 4) {
    problemsWithUnder4++;
  }
}

console.log(`Total Test Cases: ${totalTestCases}`);
console.log(`Problems with under 4 test cases: ${problemsWithUnder4}`);
