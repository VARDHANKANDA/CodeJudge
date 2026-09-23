const { PrismaClient } = require('d:/CodeJudge/backend/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const totalProblems = await prisma.problem.count();
  const verifiedProblems = await prisma.problem.count({ where: { isVerified: true } });
  const publishedProblems = await prisma.problem.count({ where: { isPublished: true } });
  const reviewProblems = await prisma.problem.count({ where: { qualityStatus: 'REVIEW' } });
  const draftProblems = await prisma.problem.count({ where: { qualityStatus: 'DRAFT' } });
  const totalTestCases = await prisma.testCase.count();
  const hiddenTestCases = await prisma.testCase.count({ where: { isHidden: true } });
  const visibleTestCases = await prisma.testCase.count({ where: { isHidden: false } });
  const totalSubmissions = await prisma.submission.count();
  const acceptedSubmissions = await prisma.submission.count({ where: { verdict: 'ACCEPTED' } });

  console.log(JSON.stringify({
    totalProblems,
    verifiedProblems,
    publishedProblems,
    reviewProblems,
    draftProblems,
    totalTestCases,
    hiddenTestCases,
    visibleTestCases,
    totalSubmissions,
    acceptedSubmissions
  }, null, 2));

  await prisma.$disconnect();
}

check();
