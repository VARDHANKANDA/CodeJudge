const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAuthors() {
  const problems = await prisma.problem.findMany({
    select: { authorId: true },
  });
  const authorIds = new Set(problems.map(p => p.authorId));
  console.log('Unique author IDs on problems:', Array.from(authorIds));

  const authors = await prisma.user.findMany({
    where: { id: { in: Array.from(authorIds) } },
    select: { id: true, email: true, username: true, role: true },
  });
  console.log('Authors in DB:', authors);

  await prisma.$disconnect();
}

checkAuthors();
