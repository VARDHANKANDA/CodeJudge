import { Test, TestingModule } from '@nestjs/testing';
import { ContestsService } from './contests.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  contest: {
    findUnique: jest.fn(),
  },
  contestRegistration: {
    findMany: jest.fn(),
  },
  contestProblem: {
    findMany: jest.fn(),
  },
  submission: {
    findMany: jest.fn(),
  },
};

describe('ContestsService - Leaderboard Scoring Logic', () => {
  let service: ContestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContestsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ContestsService>(ContestsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should accurately calculate ACM-ICPC scores and penalty points', async () => {
    const startTime = new Date('2026-01-01T10:00:00Z');
    const endTime = new Date('2026-01-01T12:00:00Z');

    mockPrismaService.contest.findUnique.mockResolvedValue({
      id: 'contest-1',
      title: 'Weekly Round #1',
      startTime,
      endTime,
    });

    mockPrismaService.contestRegistration.findMany.mockResolvedValue([
      { user: { id: 'user-1', username: 'coder_alice', name: 'Alice' } },
      { user: { id: 'user-2', username: 'coder_bob', name: 'Bob' } },
    ]);

    mockPrismaService.contestProblem.findMany.mockResolvedValue([
      { contestId: 'contest-1', problemId: 'prob-1', points: 100 },
      { contestId: 'contest-1', problemId: 'prob-2', points: 200 },
    ]);

    // Submissions:
    // Alice:
    //  - prob-1: 1 wrong attempt at 10:10 (10 mins), 1 ACCEPTED at 10:15 (15 mins) -> Score: 100, Penalty: 15 + 1*20 = 35 mins
    //  - prob-2: 1 ACCEPTED at 10:45 (45 mins) -> Score: 200, Penalty: 45 mins. Total Score: 300, Total Penalty: 80 mins
    // Bob:
    //  - prob-1: 1 ACCEPTED at 10:05 (5 mins) -> Score: 100, Total Penalty: 5 mins
    mockPrismaService.submission.findMany.mockResolvedValue([
      {
        id: 'sub-1',
        contestId: 'contest-1',
        problemId: 'prob-1',
        userId: 'user-1',
        verdict: 'WRONG_ANSWER',
        createdAt: new Date('2026-01-01T10:10:00Z'),
      },
      {
        id: 'sub-2',
        contestId: 'contest-1',
        problemId: 'prob-1',
        userId: 'user-1',
        verdict: 'ACCEPTED',
        createdAt: new Date('2026-01-01T10:15:00Z'),
      },
      {
        id: 'sub-3',
        contestId: 'contest-1',
        problemId: 'prob-2',
        userId: 'user-1',
        verdict: 'ACCEPTED',
        createdAt: new Date('2026-01-01T10:45:00Z'),
      },
      {
        id: 'sub-4',
        contestId: 'contest-1',
        problemId: 'prob-1',
        userId: 'user-2',
        verdict: 'ACCEPTED',
        createdAt: new Date('2026-01-01T10:05:00Z'),
      },
    ]);

    const leaderboard = await service.getLeaderboard('contest-1');

    expect(leaderboard).toHaveLength(2);
    // Alice has 300 points -> Rank 1
    expect(leaderboard[0].rank).toBe(1);
    expect(leaderboard[0].user.username).toBe('coder_alice');
    expect(leaderboard[0].score).toBe(300);
    expect(leaderboard[0].penalty).toBe(80);

    // Bob has 100 points -> Rank 2
    expect(leaderboard[1].rank).toBe(2);
    expect(leaderboard[1].user.username).toBe('coder_bob');
    expect(leaderboard[1].score).toBe(100);
    expect(leaderboard[1].penalty).toBe(5);
  });
});
