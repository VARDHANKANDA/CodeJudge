const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function buildSheets() {
  const problems = await prisma.problem.findMany({
    where: { isPublished: true },
    select: { id: true, slug: true, title: true, difficulty: true, tags: { select: { tag: { select: { name: true } } } } },
    orderBy: { createdAt: 'asc' },
  });

  const slugMap = new Map(problems.map(p => [p.slug, p]));
  console.log(`Total published problems in DB: ${problems.length}`);

  // Categorize
  const easy = problems.filter(p => p.difficulty === 'EASY');
  const medium = problems.filter(p => p.difficulty === 'MEDIUM');
  const hard = problems.filter(p => p.difficulty === 'HARD');

  const graphProblems = problems.filter(p => p.tags.some(t => ['Graph', 'Tree', 'binary-tree', 'Depth-First Search', 'Breadth-First Search'].includes(t.tag.name)));
  const dpProblems = problems.filter(p => p.tags.some(t => ['Dynamic Programming'].includes(t.tag.name)));

  console.log(`Easy: ${easy.length}, Medium: ${medium.length}, Hard: ${hard.length}`);
  console.log(`Graph/Tree problems: ${graphProblems.length}, DP problems: ${dpProblems.length}`);

  // Build Foundations 75 (25 Easy, 40 Medium, 10 Hard)
  const foundations75 = [
    ...easy.slice(0, 30),
    ...medium.slice(0, 35),
    ...hard.slice(0, 10),
  ].slice(0, 75).map(p => p.slug);

  // Build Top Interview 150 (35 Easy, 85 Medium, 30 Hard)
  const topInterview150 = [
    ...easy.slice(0, 40),
    ...medium.slice(0, 80),
    ...hard.slice(0, 30),
  ].slice(0, 150).map(p => p.slug);

  // Build Graph Mastery (35 Graph problems)
  const graphMastery = graphProblems.slice(0, 40).map(p => p.slug);

  // Build DP Mastery (45 DP problems)
  const dpMastery = dpProblems.slice(0, 45).map(p => p.slug);

  // Build Hard Mastery (35 Hard problems)
  const hardMastery = hard.slice(0, 35).map(p => p.slug);

  console.log('Foundations 75 valid slugs:', foundations75.filter(s => slugMap.has(s)).length);
  console.log('Top Interview 150 valid slugs:', topInterview150.filter(s => slugMap.has(s)).length);
  console.log('Graph Mastery valid slugs:', graphMastery.filter(s => slugMap.has(s)).length);
  console.log('DP Mastery valid slugs:', dpMastery.filter(s => slugMap.has(s)).length);
  console.log('Hard Mastery valid slugs:', hardMastery.filter(s => slugMap.has(s)).length);

  await prisma.$disconnect();
}

buildSheets();
