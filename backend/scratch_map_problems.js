const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function mapProblems() {
  const problems = await prisma.problem.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      difficulty: true,
      tags: { select: { tag: { select: { name: true, slug: true } } } },
    },
    orderBy: { createdAt: 'asc' },
  });

  console.log(`Total Problems fetched: ${problems.length}`);
  const tagCounts = {};
  const difficultyCounts = { EASY: 0, MEDIUM: 0, HARD: 0 };

  problems.forEach(p => {
    difficultyCounts[p.difficulty] = (difficultyCounts[p.difficulty] || 0) + 1;
    p.tags.forEach(t => {
      const name = t.tag.name;
      tagCounts[name] = (tagCounts[name] || 0) + 1;
    });
  });

  console.log('Difficulty Distribution:', difficultyCounts);
  console.log('Top 20 Tags:', Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 20));
  
  await prisma.$disconnect();
}

mapProblems();
