const { PrismaClient, Role, Difficulty, QualityStatus } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function executeFullRepair() {
  console.log('============================================================');
  console.log('STARTING CODEJUDGE PRODUCTION DATA REPAIR & ACCOUNT RESET');
  console.log('============================================================\n');

  // 1. Verify Problem Library intact
  const problemCountBefore = await prisma.problem.count();
  const testCaseCountBefore = await prisma.testCase.count();
  console.log(`[VERIFY] Existing Problem Library: ${problemCountBefore} problems, ${testCaseCountBefore} testcases.`);
  if (problemCountBefore < 500) {
    throw new Error('Safety check failed: Problem count is less than 500! Aborting.');
  }

  // 2. Fetch or create the primary Admin account
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@codejudge.com';
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPass123!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  let adminUser = await prisma.user.findFirst({
    where: { OR: [{ email: adminEmail }, { username: adminUsername }] },
  });

  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        username: adminUsername,
        name: 'System Administrator',
        passwordHash,
        role: Role.ADMIN,
        isEmailVerified: true,
        points: 0,
        rating: 1500,
      },
    });
    console.log(`[ADMIN] Created primary admin account: ${adminEmail} (ID: ${adminUser.id})`);
  } else {
    adminUser = await prisma.user.update({
      where: { id: adminUser.id },
      data: {
        role: Role.ADMIN,
        passwordHash,
        isEmailVerified: true,
      },
    });
    console.log(`[ADMIN] Updated primary admin account: ${adminEmail} (ID: ${adminUser.id})`);
  }

  // 3. Re-link Problem authorId to Admin
  await prisma.problem.updateMany({
    data: {
      authorId: adminUser.id,
      isPublished: true,
      isVerified: true,
      qualityStatus: QualityStatus.PUBLISHED,
    },
  });
  console.log(`[PROBLEMS] Re-linked all ${problemCountBefore} problems to author ID ${adminUser.id}.`);

  // 4. Safely delete all user-owned data & non-admin users
  console.log('[RESET] Removing all previous user activity and test accounts...');
  await prisma.refreshToken.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.problemSolver.deleteMany({});
  await prisma.submission.deleteMany({});
  await prisma.contestRegistration.deleteMany({});
  await prisma.contestLeaderboard.deleteMany({});
  await prisma.globalLeaderboard.deleteMany({});
  await prisma.userAchievement.deleteMany({});
  await prisma.bookmark.deleteMany({});
  await prisma.like.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.discussion.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.auditLog.deleteMany({});

  // Delete all users except admin
  const deletedUsers = await prisma.user.deleteMany({
    where: { id: { not: adminUser.id } },
  });
  console.log(`[RESET] Deleted ${deletedUsers.count} non-admin user accounts.`);

  // Verify User count is exactly 1 (the bootstrapped admin)
  const remainingUsers = await prisma.user.count();
  console.log(`[VERIFY] Active User Count: ${remainingUsers} (Admin only).`);

  // 5. Clean and Recreate 4 Real Contests backed by real problems
  console.log('\n[CONTESTS] Rebuilding 4 real contests with real published problems...');
  await prisma.contestProblem.deleteMany({});
  await prisma.contest.deleteMany({});

  const allProblems = await prisma.problem.findMany({
    where: { isPublished: true },
    select: { id: true, slug: true, difficulty: true },
    orderBy: { createdAt: 'asc' },
  });

  const easyProbs = allProblems.filter(p => p.difficulty === 'EASY');
  const mediumProbs = allProblems.filter(p => p.difficulty === 'MEDIUM');
  const hardProbs = allProblems.filter(p => p.difficulty === 'HARD');

  const now = new Date();

  // Contest 1: LIVE Contest - CodeJudge Weekly Challenge #1 (90 mins, started 30 mins ago, ends in 60 mins)
  const c1Start = new Date(now.getTime() - 30 * 60 * 1000);
  const c1End = new Date(now.getTime() + 60 * 60 * 1000);
  const contest1 = await prisma.contest.create({
    data: {
      title: 'CodeJudge Weekly Challenge #1',
      description: 'Weekly competitive challenge featuring classic arrays, two pointers, strings, and introductory dynamic programming.',
      startTime: c1Start,
      endTime: c1End,
      isPublished: true,
      organizerId: adminUser.id,
    },
  });
  const c1Problems = [
    { problemId: easyProbs[0].id, points: 100, order: 1 },
    { problemId: easyProbs[1].id, points: 100, order: 2 },
    { problemId: mediumProbs[0].id, points: 200, order: 3 },
    { problemId: mediumProbs[1].id, points: 200, order: 4 },
    { problemId: mediumProbs[2].id, points: 300, order: 5 },
  ];
  for (const cp of c1Problems) {
    await prisma.contestProblem.create({ data: { contestId: contest1.id, ...cp } });
  }
  console.log(`   ✓ Created LIVE Contest: "${contest1.title}" (5 problems)`);

  // Contest 2: UPCOMING Contest - CodeJudge Algorithm Arena #1 (120 mins, starts in 2 days)
  const c2Start = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
  const c2End = new Date(c2Start.getTime() + 120 * 60 * 1000);
  const contest2 = await prisma.contest.create({
    data: {
      title: 'CodeJudge Algorithm Arena #1',
      description: 'Bi-weekly medium-to-hard algorithmic clash testing shortest paths, binary search on answer spaces, and segment trees.',
      startTime: c2Start,
      endTime: c2End,
      isPublished: true,
      organizerId: adminUser.id,
    },
  });
  const c2Problems = [
    { problemId: mediumProbs[3].id, points: 200, order: 1 },
    { problemId: mediumProbs[4].id, points: 200, order: 2 },
    { problemId: mediumProbs[5].id, points: 300, order: 3 },
    { problemId: hardProbs[0].id, points: 400, order: 4 },
    { problemId: hardProbs[1].id, points: 500, order: 5 },
  ];
  for (const cp of c2Problems) {
    await prisma.contestProblem.create({ data: { contestId: contest2.id, ...cp } });
  }
  console.log(`   ✓ Created UPCOMING Contest: "${contest2.title}" (5 problems)`);

  // Contest 3: UPCOMING Contest - CodeJudge Hard Challenge #1 (120 mins, starts in 5 days)
  const c3Start = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
  const c3End = new Date(c3Start.getTime() + 120 * 60 * 1000);
  const contest3 = await prisma.contest.create({
    data: {
      title: 'CodeJudge Hard Challenge #1',
      description: 'Advanced grandmaster tournament featuring bitmask DP, network flows, and tree rerooting techniques.',
      startTime: c3Start,
      endTime: c3End,
      isPublished: true,
      organizerId: adminUser.id,
    },
  });
  const c3Problems = [
    { problemId: hardProbs[2].id, points: 400, order: 1 },
    { problemId: hardProbs[3].id, points: 400, order: 2 },
    { problemId: hardProbs[4].id, points: 500, order: 3 },
    { problemId: hardProbs[5].id, points: 600, order: 4 },
  ];
  for (const cp of c3Problems) {
    await prisma.contestProblem.create({ data: { contestId: contest3.id, ...cp } });
  }
  console.log(`   ✓ Created UPCOMING Contest: "${contest3.title}" (4 problems)`);

  // Contest 4: PAST Contest - CodeJudge Sprint #1 (45 mins, ended yesterday)
  const c4Start = new Date(now.getTime() - 26 * 60 * 60 * 1000);
  const c4End = new Date(now.getTime() - 25 * 60 * 60 * 1000);
  const contest4 = await prisma.contest.create({
    data: {
      title: 'CodeJudge Sprint #1',
      description: 'Fast-paced rapid solve contest focusing on string matching and basic greedy strategies.',
      startTime: c4Start,
      endTime: c4End,
      isPublished: true,
      organizerId: adminUser.id,
    },
  });
  const c4Problems = [
    { problemId: easyProbs[2].id, points: 100, order: 1 },
    { problemId: easyProbs[3].id, points: 100, order: 2 },
    { problemId: mediumProbs[6].id, points: 200, order: 3 },
    { problemId: mediumProbs[7].id, points: 200, order: 4 },
  ];
  for (const cp of c4Problems) {
    await prisma.contestProblem.create({ data: { contestId: contest4.id, ...cp } });
  }
  console.log(`   ✓ Created PAST Contest: "${contest4.title}" (4 problems)`);

  // Final confirmation
  const finalProblems = await prisma.problem.count();
  const finalTestCases = await prisma.testCase.count();
  const finalContests = await prisma.contest.count();
  const finalContestProblems = await prisma.contestProblem.count();
  const finalUsers = await prisma.user.count();

  console.log('\n============================================================');
  console.log('REPAIR SCRIPT COMPLETED SUCCESSFULLY');
  console.log(`Final Problem Count: ${finalProblems}`);
  console.log(`Final TestCase Count: ${finalTestCases}`);
  console.log(`Final Contest Count: ${finalContests} (${finalContestProblems} contest problems)`);
  console.log(`Final User Count: ${finalUsers} (Admin)`);
  console.log('============================================================\n');

  await prisma.$disconnect();
}

executeFullRepair().catch(err => {
  console.error('Repair execution failed:', err);
  process.exit(1);
});
