import { PrismaClient, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

async function inspectMatrix() {
  console.log('=== PHASE 1: DATABASE TOPIC & DIFFICULTY MATRIX ===\n');

  const problems = await prisma.problem.findMany({
    include: {
      tags: { include: { tag: true } },
      testCases: true,
      editorial: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  const total = problems.length;
  const easy = problems.filter((p) => p.difficulty === Difficulty.EASY).length;
  const medium = problems.filter((p) => p.difficulty === Difficulty.MEDIUM).length;
  const hard = problems.filter((p) => p.difficulty === Difficulty.HARD).length;

  console.log(`Current Total Problems: ${total}`);
  console.log(`Difficulty Breakdown: Easy ${easy} (${((easy/total)*100).toFixed(1)}%) | Medium ${medium} (${((medium/total)*100).toFixed(1)}%) | Hard ${hard} (${((hard/total)*100).toFixed(1)}%)\n`);

  const tagMap = new Map<string, { total: number; easy: number; medium: number; hard: number; problems: string[] }>();

  for (const p of problems) {
    const pTags = p.tags.map((t) => t.tag.name);
    if (pTags.length === 0) pTags.push('Uncategorized');

    for (const tag of pTags) {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, { total: 0, easy: 0, medium: 0, hard: 0, problems: [] });
      }
      const entry = tagMap.get(tag)!;
      entry.total++;
      if (p.difficulty === Difficulty.EASY) entry.easy++;
      else if (p.difficulty === Difficulty.MEDIUM) entry.medium++;
      else if (p.difficulty === Difficulty.HARD) entry.hard++;
      entry.problems.push(p.slug);
    }
  }

  const sortedTags = Array.from(tagMap.entries()).sort((a, b) => b[1].total - a[1].total);

  console.log('--- TOPIC COVERAGE TABLE ---');
  console.log('Topic Name'.padEnd(30) + 'Total'.padEnd(8) + 'Easy'.padEnd(8) + 'Medium'.padEnd(8) + 'Hard'.padEnd(8));
  console.log('-'.repeat(62));
  for (const [tag, stats] of sortedTags) {
    console.log(
      tag.padEnd(30) +
      stats.total.toString().padEnd(8) +
      stats.easy.toString().padEnd(8) +
      stats.medium.toString().padEnd(8) +
      stats.hard.toString().padEnd(8)
    );
  }
}

inspectMatrix()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
