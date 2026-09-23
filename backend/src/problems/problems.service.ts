import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { CreateTestCaseDto } from './dto/create-testcase.dto';
import { Difficulty } from '@prisma/client';

@Injectable()
export class ProblemsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProblemDto, authorId: string) {
    const existing = await this.prisma.problem.findUnique({
      where: { slug: dto.slug },
    });
    if (existing) {
      throw new ConflictException('A problem with this slug already exists');
    }

    return this.prisma.problem.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        difficulty: dto.difficulty,
        timeLimit: dto.timeLimit,
        memoryLimit: dto.memoryLimit,
        constraints: dto.constraints,
        codeTemplates: dto.codeTemplates as any,
        sampleInput: dto.sampleInput,
        sampleOutput: dto.sampleOutput,
        isPremium: dto.isPremium ?? false,
        points: dto.points ?? 100,
        authorId,
        isPublished: true,
      },
    });
  }

  async findAll(
    page: number = 1,
    limit: number = 20,
    search?: string,
    difficulty?: Difficulty,
    tag?: string,
  ) {
    const skip = (page - 1) * limit;

    const whereClause: any = {
      isPublished: true,
    };

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (difficulty) {
      whereClause.difficulty = difficulty;
    }

    if (tag) {
      whereClause.tags = {
        some: {
          tag: {
            slug: tag.toLowerCase(),
          },
        },
      };
    }

    const [items, total] = await Promise.all([
      this.prisma.problem.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          tags: {
            include: { tag: true },
          },
        },
      }),
      this.prisma.problem.count({ where: whereClause }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const problem = await this.prisma.problem.findUnique({
      where: { id },
      include: {
        tags: { include: { tag: true } },
        companies: { include: { company: true } },
        editorial: true,
        testCases: { where: { isHidden: false }, orderBy: { order: 'asc' } },
      },
    });
    if (!problem) {
      throw new NotFoundException('Problem not found');
    }
    return problem;
  }

  async findBySlug(slug: string) {
    const problem = await this.prisma.problem.findUnique({
      where: { slug },
      include: {
        tags: { include: { tag: true } },
        companies: { include: { company: true } },
        editorial: true,
        testCases: { where: { isHidden: false }, orderBy: { order: 'asc' } },
      },
    });
    if (!problem) {
      throw new NotFoundException('Problem not found');
    }
    return problem;
  }

  async togglePublish(id: string) {
    const problem = await this.findOne(id);
    return this.prisma.problem.update({
      where: { id },
      data: {
        isPublished: !problem.isPublished,
      },
    });
  }

  async update(id: string, dto: CreateProblemDto) {
    await this.findOne(id);
    return this.prisma.problem.update({
      where: { id },
      data: {
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        difficulty: dto.difficulty,
        timeLimit: dto.timeLimit,
        memoryLimit: dto.memoryLimit,
        constraints: dto.constraints,
        codeTemplates: dto.codeTemplates as any,
        sampleInput: dto.sampleInput,
        sampleOutput: dto.sampleOutput,
        isPremium: dto.isPremium ?? false,
        points: dto.points ?? 100,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.problem.delete({
      where: { id },
    });
  }

  async addTestCase(problemId: string, dto: CreateTestCaseDto) {
    await this.findOne(problemId);
    return this.prisma.testCase.create({
      data: {
        problemId,
        input: dto.input,
        expectedOutput: dto.expectedOutput,
        isHidden: dto.isHidden,
        order: dto.order ?? 0,
      },
    });
  }

  async getTestCases(problemId: string, isAdmin: boolean) {
    await this.findOne(problemId);
    return this.prisma.testCase.findMany({
      where: {
        problemId,
        ...(isAdmin ? {} : { isHidden: false }),
      },
      orderBy: { order: 'asc' },
    });
  }

  async deleteTestCase(testCaseId: string) {
    const tc = await this.prisma.testCase.findUnique({
      where: { id: testCaseId },
    });
    if (!tc) {
      throw new NotFoundException('Test case not found');
    }
    return this.prisma.testCase.delete({
      where: { id: testCaseId },
    });
  }
}
