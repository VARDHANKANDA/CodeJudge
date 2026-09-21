import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as os from 'os';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getMetrics() {
    const [usersCount, problemsCount, submissionsCount, contestsCount] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.problem.count(),
      this.prisma.submission.count(),
      this.prisma.contest.count(),
    ]);

    const verdictGroups = await this.prisma.submission.groupBy({
      by: ['verdict'],
      _count: {
        _all: true,
      },
    });

    const verdicts = verdictGroups.reduce((acc: Record<string, number>, curr) => {
      acc[curr.verdict] = curr._count._all;
      return acc;
    }, {});

    return {
      users: usersCount,
      problems: problemsCount,
      submissions: submissionsCount,
      contests: contestsCount,
      verdictDistribution: verdicts,
    };
  }

  async getSystemHealth() {
    const memory = process.memoryUsage();
    return {
      uptime: process.uptime(),
      platform: process.platform,
      arch: process.arch,
      cpuCores: os.cpus().length,
      freeMemoryBytes: os.freemem(),
      totalMemoryBytes: os.totalmem(),
      processMemory: {
        rss: memory.rss,
        heapTotal: memory.heapTotal,
        heapUsed: memory.heapUsed,
        external: memory.external,
      },
      loadAvg: os.loadavg(),
    };
  }

  async getAuditLogs(page: number = 1, limit: number = 50) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, username: true, email: true },
          },
        },
      }),
      this.prisma.auditLog.count(),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async createAuditLog(userId: string | null, action: string, ipAddress?: string, userAgent?: string, details?: any) {
    return this.prisma.auditLog.create({
      data: {
        userId,
        action,
        ipAddress: ipAddress ?? null,
        userAgent: userAgent ?? null,
        details: details ?? null,
      },
    });
  }
}
