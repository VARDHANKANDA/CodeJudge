import { allExtendedProblemDefs } from '../prisma/problem-packs';

console.log('Total problems in allExtendedProblemDefs:', allExtendedProblemDefs.length);

const slugs = new Set<string>();
const duplicates: string[] = [];

for (const p of allExtendedProblemDefs) {
  if (slugs.has(p.slug)) {
    duplicates.push(p.slug);
  }
  slugs.add(p.slug);
}

console.log('Unique slugs count:', slugs.size);
if (duplicates.length > 0) {
  console.error('DUPLICATES FOUND:', duplicates);
  process.exit(1);
} else {
  console.log('SUCCESS: Zero duplicate slugs found!');
}

let totalTestCases = 0;
for (const p of allExtendedProblemDefs) {
  totalTestCases += (p.testCases || []).length;
}
console.log('Total test cases across all problems:', totalTestCases);
