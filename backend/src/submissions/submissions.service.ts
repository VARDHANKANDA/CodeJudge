import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitCodeDto } from './submit-code.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Verdict } from '@prisma/client';

@Injectable()
export class SubmissionsService {
  private supportedLanguages = ['c', 'cpp', 'java', 'python', 'javascript', 'typescript', 'go', 'rust'];

  constructor(
    private prisma: PrismaService,
    @InjectQueue('submission-queue') private submissionQueue: Queue,
  ) {}

  async submit(dto: SubmitCodeDto, userId: string) {
    // 1. Verify language support
    const lang = dto.language.toLowerCase();
    if (!this.supportedLanguages.includes(lang)) {
      throw new BadRequestException(`Language '${dto.language}' is not supported. Supported: ${this.supportedLanguages.join(', ')}`);
    }

    // 2. Verify problem exists
    const problem = await this.prisma.problem.findUnique({
      where: { id: dto.problemId },
    });
    if (!problem) {
      throw new NotFoundException('Problem not found');
    }

    // 3. Create submission record
    const submission = await this.prisma.submission.create({
      data: {
        problemId: dto.problemId,
        userId,
        contestId: dto.contestId ?? null,
        code: dto.code,
        language: lang,
        verdict: Verdict.QUEUED,
      },
    });

    // 4. Push code job to queue
    await this.submissionQueue.add(
      'execute-submission',
      {
        submissionId: submission.id,
        problemId: problem.id,
        code: dto.code,
        language: lang,
        timeLimit: problem.timeLimit,
        memoryLimit: problem.memoryLimit,
      },
      {
        attempts: 1,
        removeOnComplete: true,
        removeOnFail: true,
      },
    );

    return submission;
  }

  async findOne(id: string) {
    const submission = await this.prisma.submission.findUnique({
      where: { id },
      include: {
        problem: {
          select: {
            id: true,
            title: true,
            slug: true,
            difficulty: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    });

    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    return submission;
  }

  async getRecentUserSubmissions(userId: string, limit: number = 20) {
    return this.prisma.submission.findMany({
      where: { userId },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        problem: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });
  }

  async getProblemSubmissions(problemId: string, userId: string, limit: number = 20) {
    return this.prisma.submission.findMany({
      where: { problemId, userId },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }
}
