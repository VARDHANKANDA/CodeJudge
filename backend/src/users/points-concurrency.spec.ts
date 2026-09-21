import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';

describe('Points Concurrency and Idempotency', () => {
  let mockPrisma: any;
  let solvedProblems: Map<string, any>;
  let userPoints: number;

  beforeEach(() => {
    solvedProblems = new Map();
    userPoints = 0;

    mockPrisma = {
      $transaction: jest.fn(async (cb) => {
        // Mock interactive transaction callback
        const tx = {
          problemSolver: {
            create: jest.fn(async ({ data }) => {
              const key = `${data.userId}_${data.problemId}`;
              if (solvedProblems.has(key)) {
                const err: any = new Error('Unique constraint failed on the fields: (`userId`,`problemId`)');
                err.code = 'P2002';
                throw err;
              }
              const record = { id: `solver-${Date.now()}`, ...data, solvedAt: new Date() };
              solvedProblems.set(key, record);
              return record;
            }),
          },
          user: {
            update: jest.fn(async ({ where, data }) => {
              if (data.points?.increment) {
                userPoints += data.points.increment;
              }
              return { id: where.id, points: userPoints };
            }),
          },
        };
        return cb(tx);
      }),
    };
  });

  const awardPointsAtomically = async (userId: string, problemId: string, submissionId: string, points: number) => {
    try {
      await mockPrisma.$transaction(async (tx: any) => {
        await tx.problemSolver.create({
          data: {
            userId,
            problemId,
            submissionId,
            pointsAwarded: points,
          },
        });

        await tx.user.update({
          where: { id: userId },
          data: {
            points: {
              increment: points,
            },
          },
        });
      });
      return { success: true };
    } catch (err: any) {
      if (err.code === 'P2002') {
        return { success: false, reason: 'ALREADY_SOLVED' };
      }
      throw err;
    }
  };

  it('should award points on first accepted solve', async () => {
    const result = await awardPointsAtomically('user-1', 'prob-100', 'sub-1', 100);
    expect(result.success).toBe(true);
    expect(userPoints).toBe(100);
    expect(solvedProblems.size).toBe(1);
  });

  it('should prevent duplicate points when sequentially submitted again for same problem', async () => {
    const res1 = await awardPointsAtomically('user-1', 'prob-100', 'sub-1', 100);
    const res2 = await awardPointsAtomically('user-1', 'prob-100', 'sub-2', 100);

    expect(res1.success).toBe(true);
    expect(res2.success).toBe(false);
    expect(res2.reason).toBe('ALREADY_SOLVED');
    expect(userPoints).toBe(100);
    expect(solvedProblems.size).toBe(1);
  });

  it('should award points exactly once when two accepted submissions race concurrently', async () => {
    // Simulate two simultaneous worker executions attempting to record solve & increment points
    const [resA, resB] = await Promise.all([
      awardPointsAtomically('user-1', 'prob-100', 'sub-A', 100),
      awardPointsAtomically('user-1', 'prob-100', 'sub-B', 100),
    ]);

    const successes = [resA, resB].filter((r) => r.success);
    const failures = [resA, resB].filter((r) => !r.success);

    expect(successes.length).toBe(1);
    expect(failures.length).toBe(1);
    expect(failures[0].reason).toBe('ALREADY_SOLVED');
    expect(userPoints).toBe(100);
    expect(solvedProblems.size).toBe(1);
  });

  it('should award points for different problems independently', async () => {
    const [res1, res2] = await Promise.all([
      awardPointsAtomically('user-1', 'prob-1', 'sub-1', 50),
      awardPointsAtomically('user-1', 'prob-2', 'sub-2', 75),
    ]);

    expect(res1.success).toBe(true);
    expect(res2.success).toBe(true);
    expect(userPoints).toBe(125);
    expect(solvedProblems.size).toBe(2);
  });
});
