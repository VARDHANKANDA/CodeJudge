import { allExtendedProblemDefs } from '../prisma/problem-packs';

console.log('Total problems in allExtendedProblemDefs:', allExtendedProblemDefs.length);

const slugCounts = new Map<string, number>();
for (const p of allExtendedProblemDefs) {
  slugCounts.set(p.slug, (slugCounts.get(p.slug) || 0) + 1);
}

const map = new Map<string, number>();
for (let i = 0; i < allExtendedProblemDefs.length; i++) {
  const p = allExtendedProblemDefs[i];
  if (map.has(p.slug)) {
    const prevIdx = map.get(p.slug)!;
    console.log(`Duplicate: ${p.slug}`);
    console.log(`  First: index ${prevIdx} (${allExtendedProblemDefs[prevIdx].title})`);
    console.log(`  Second: index ${i} (${p.title})`);
  } else {
    map.set(p.slug, i);
  }
}


