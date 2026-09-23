const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function inspectDb() {
  try {
    const rawUrl = process.env.DATABASE_URL || '';
    let dbHost = 'unknown';
    let dbName = 'unknown';
    try {
      const parsed = new URL(rawUrl);
      dbHost = parsed.host;
      dbName = parsed.pathname.replace('/', '');
    } catch {}

    const isProduction = dbHost.includes('neon') || dbHost.includes('render') || dbHost.includes('pooler');
    const envType = isProduction ? 'PRODUCTION (Neon Serverless PostgreSQL)' : 'LOCAL / DEVELOPMENT';

    const [
      userCount,
      problemCount,
      publishedProblemCount,
      verifiedProblemCount,
      testCaseCount,
      tagCount,
      problemTagCount,
      submissionCount,
      refreshTokenCount,
      sessionCount,
      solverCount,
      contestCount,
      contestProblemCount,
      contestRegCount,
      contestLeaderboardCount,
      globalLeaderboardCount,
      discussionCount,
      commentCount,
      likeCount,
      bookmarkCount,
      auditLogCount,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.problem.count(),
      prisma.problem.count({ where: { isPublished: true } }),
      prisma.problem.count({ where: { isVerified: true } }),
      prisma.testCase.count(),
      prisma.tag.count(),
      prisma.problemTag.count(),
      prisma.submission.count(),
      prisma.refreshToken.count(),
      prisma.session.count(),
      prisma.problemSolver.count(),
      prisma.contest.count(),
      prisma.contestProblem.count(),
      prisma.contestRegistration.count(),
      prisma.contestLeaderboard.count(),
      prisma.globalLeaderboard.count(),
      prisma.discussion.count(),
      prisma.comment.count(),
      prisma.like.count(),
      prisma.bookmark.count(),
      prisma.auditLog.count(),
    ]);

    console.log('============================================================');
    console.log('PHASE 0: SAFE DATABASE CONFIGURATION & ENVIRONMENT AUDIT');
    console.log('============================================================');
    console.log(`DATABASE ENVIRONMENT: ${envType}`);
    console.log(`DATABASE HOST: ${dbHost}`);
    console.log(`DATABASE NAME: ${dbName}`);
    console.log(`CURRENT USER COUNT: ${userCount}`);
    console.log(`CURRENT PROBLEM COUNT: ${problemCount} (Published: ${publishedProblemCount}, Verified: ${verifiedProblemCount})`);
    console.log(`CURRENT TESTCASE COUNT: ${testCaseCount}`);
    console.log(`CURRENT TAG COUNT: ${tagCount} (ProblemTags: ${problemTagCount})`);
    console.log(`CURRENT SUBMISSION COUNT: ${submissionCount}`);
    console.log(`CURRENT CONTEST COUNT: ${contestCount} (ContestProblems: ${contestProblemCount}, Registrations: ${contestRegCount})`);
    console.log(`CURRENT LEADERBOARD ENTRIES: Global: ${globalLeaderboardCount}, Contest: ${contestLeaderboardCount}`);
    console.log(`CURRENT DISCUSSIONS / COMMENTS: ${discussionCount} threads, ${commentCount} comments, ${likeCount} likes`);
    console.log(`CURRENT SESSIONS / REFRESH TOKENS: ${sessionCount} sessions, ${refreshTokenCount} refresh tokens`);
    console.log(`CURRENT AUDIT LOGS: ${auditLogCount}`);
    console.log('============================================================');

  } catch (err) {
    console.error('Error inspecting DB:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

inspectDb();
