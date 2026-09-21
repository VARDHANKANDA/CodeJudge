import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContestDto } from './dto/create-contest.dto';

@Injectable()
export class ContestsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContestDto, organizerId: string) {
    const start = new Date(dto.startTime);
    const end = new Date(dto.endTime);

    if (start >= end) {
      throw new BadRequestException('Start time must be before end time');
    }

    return this.prisma.contest.create({
      data: {
        title: dto.title,
        description: dto.description,
        startTime: start,
        endTime: end,
        isPrivate: dto.isPrivate ?? false,
        password: dto.password ?? null,
        organizerId,
        isPublished: true,
      },
    });
  }

  async findAll() {
    const now = new Date();
    const contests = await this.prisma.contest.findMany({
      where: { isPublished: true },
      orderBy: { startTime: 'asc' },
    });

    const live = contests.filter((c) => c.startTime <= now && c.endTime >= now);
    const upcoming = contests.filter((c) => c.startTime > now);
    const past = contests.filter((c) => c.endTime < now);

    return { live, upcoming, past };
  }

  async findOne(id: string) {
    const contest = await this.prisma.contest.findUnique({
      where: { id },
      include: {
        organizer: {
          select: { id: true, username: true, name: true },
        },
      },
    });
    if (!contest) {
      throw new NotFoundException('Contest not found');
    }
    return contest;
  }

  async register(contestId: string, userId: string) {
    const contest = await this.findOne(contestId);
    if (contest.endTime < new Date()) {
      throw new BadRequestException('Cannot register for a past contest');
    }

    const existing = await this.prisma.contestRegistration.findUnique({
      where: {
        contestId_userId: { contestId, userId },
      },
    });
    if (existing) {
      throw new ConflictException('You are already registered for this contest');
    }

    return this.prisma.contestRegistration.create({
      data: { contestId, userId },
    });
  }

  async addProblem(contestId: string, problemId: string, points: number, order: number) {
    await this.findOne(contestId);
    const problem = await this.prisma.problem.findUnique({ where: { id: problemId } });
    if (!problem) {
      throw new NotFoundException('Problem not found');
    }

    const existing = await this.prisma.contestProblem.findUnique({
      where: {
        contestId_problemId: { contestId, problemId },
      },
    });
    if (existing) {
      throw new ConflictException('Problem is already added to this contest');
    }

    return this.prisma.contestProblem.create({
      data: { contestId, problemId, points, order },
    });
  }

  async getProblems(contestId: string) {
    await this.findOne(contestId);
    const contestProblems = await this.prisma.contestProblem.findMany({
      where: { contestId },
      orderBy: { order: 'asc' },
      include: {
        problem: {
          select: {
            id: true,
            title: true,
            slug: true,
            difficulty: true,
          },
        },
      },
    });

    return contestProblems.map((cp) => ({
      ...cp.problem,
      points: cp.points,
      order: cp.order,
    }));
  }

  async getLeaderboard(contestId: string) {
    const contest = await this.findOne(contestId);
    const registrations = await this.prisma.contestRegistration.findMany({
      where: { contestId },
      include: {
        user: {
          select: { id: true, username: true, name: true, avatarUrl: true },
        },
      },
    });

    const contestProblems = await this.prisma.contestProblem.findMany({
      where: { contestId },
    });

    const submissions = await this.prisma.submission.findMany({
      where: {
        contestId,
        createdAt: {
          gte: contest.startTime,
          lte: contest.endTime,
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    // Compute ranks using standard competitive rules (ACM-ICPC):
    // - Score is sum of points for solved problems.
    // - Penalty is time elapsed in minutes from start of contest for each accepted problem,
    //   plus 20 minutes for each wrong submission before the accepted submission.
    const board = registrations.map(({ user }) => {
      const userSubmissions = submissions.filter((s) => s.userId === user.id);
      let score = 0;
      let penalty = 0;
      let lastAcceptedTime: Date | null = null;

      contestProblems.forEach((cp) => {
        const problemSubs = userSubmissions.filter((s) => s.problemId === cp.problemId);
        const firstAccepted = problemSubs.find((s) => s.verdict === 'ACCEPTED');

        if (firstAccepted) {
          score += cp.points;
          const timeElapsedMs = firstAccepted.createdAt.getTime() - contest.startTime.getTime();
          const timeElapsedMin = Math.floor(timeElapsedMs / 60000);
          
          const wrongAttemptsBeforeAccept = problemSubs
            .filter((s) => s.createdAt < firstAccepted.createdAt && s.verdict !== 'ACCEPTED')
            .length;

          penalty += timeElapsedMin + wrongAttemptsBeforeAccept * 20;

          if (!lastAcceptedTime || firstAccepted.createdAt > lastAcceptedTime) {
            lastAcceptedTime = firstAccepted.createdAt;
          }
        }
      });

      return {
        user,
        score,
        penalty,
        lastAcceptedTime,
      };
    });

    // Sort by score (desc), penalty (asc), lastAcceptedTime (asc)
    return board.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.penalty !== b.penalty) return a.penalty - b.penalty;
      const timeA = a.lastAcceptedTime ? new Date(a.lastAcceptedTime).getTime() : Infinity;
      const timeB = b.lastAcceptedTime ? new Date(b.lastAcceptedTime).getTime() : Infinity;
      return timeA - timeB;
    }).map((item, index) => ({
      rank: index + 1,
      ...item,
    }));
  }
}
