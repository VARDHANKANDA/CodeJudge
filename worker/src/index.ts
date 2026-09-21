import { Worker, Job } from 'bullmq';
import { PrismaClient, Verdict } from '@prisma/client';
import { runSandbox } from './sandbox';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10);

console.log(`Worker starting. Listening to Redis queue on ${redisHost}:${redisPort}`);

const worker = new Worker(
  'submission-queue',
  async (job: Job) => {
    const { submissionId, problemId, code, language, timeLimit, memoryLimit } = job.data;
    console.log(`Processing submission ${submissionId} for problem ${problemId} [${language}]`);

    try {
      // 1. Update status to Running
      await prisma.submission.update({
        where: { id: submissionId },
        data: { verdict: Verdict.RUNNING },
      });

      // 2. Fetch test cases
      const testCases = await prisma.testCase.findMany({
        where: { problemId },
        orderBy: { order: 'asc' },
      });

      if (testCases.length === 0) {
        throw new Error('No testcases found for this problem');
      }

      // 3. Execute in Sandbox
      const result = await runSandbox(
        submissionId,
        code,
        language,
        testCases.map((tc) => ({
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          isHidden: tc.isHidden,
        })),
        timeLimit,
        memoryLimit,
      );

      console.log(`Execution completed. Verdict: ${result.verdict}`);

      // 4. Update submission database record
      await prisma.submission.update({
        where: { id: submissionId },
        data: {
          verdict: result.verdict as Verdict,
          executionTime: result.executionTime ?? null,
          memoryUsage: result.memoryUsage ?? null,
          errorMessage: result.errorLog ?? null,
        },
      });

      // 5. If accepted, award points to user ONLY on first accepted solve (Atomic database-enforced idempotency)
      if (result.verdict === 'ACCEPTED') {
        const sub = await prisma.submission.findUnique({
          where: { id: submissionId },
          include: { problem: true },
        });

        if (sub) {
          try {
            await prisma.$transaction(async (tx) => {
              // Create the unique solver record. Throws P2002 if (userId, problemId) already exists.
              await tx.problemSolver.create({
                data: {
                  userId: sub.userId,
                  problemId: sub.problemId,
                  submissionId: sub.id,
                  pointsAwarded: sub.problem.points,
                },
              });

              // Increment user points atomically
              await tx.user.update({
                where: { id: sub.userId },
                data: {
                  points: {
                    increment: sub.problem.points,
                  },
                },
              });
            });
            console.log(`Awarded ${sub.problem.points} points to user ${sub.userId} for first solve on ${sub.problem.title}`);
          } catch (solveErr: any) {
            if (solveErr?.code === 'P2002') {
              // Unique constraint violation: problem already solved by this user concurrently or previously
              console.log(`User ${sub.userId} already solved problem ${sub.problemId}. ProblemSolver unique constraint prevented duplicate points.`);
            } else {
              console.error(`Error recording ProblemSolver for submission ${sub.id}:`, solveErr);
            }
          }
        }
      }
    } catch (err: any) {
      console.error(`Error processing job ${job.id}:`, err);
      // Fallback update to compilation or runtime error
      await prisma.submission.update({
        where: { id: submissionId },
        data: {
          verdict: Verdict.RUNTIME_ERROR,
          errorMessage: err.message || 'Worker internal runner failure',
        },
      });
    }
  },
  {
    connection: {
      host: redisHost,
      port: redisPort,
    },
    concurrency: 2, // Process up to 2 submissions in parallel
  },
);

worker.on('active', (job) => {
  console.log(`Job ${job.id} active`);
});

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});
