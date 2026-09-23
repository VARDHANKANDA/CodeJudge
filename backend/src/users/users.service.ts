import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getLeaderboard(limit: number = 50, type: 'rating' | 'points' = 'rating') {
    const orderBy = type === 'points'
      ? [{ points: 'desc' as const }, { rating: 'desc' as const }, { createdAt: 'asc' as const }]
      : [{ rating: 'desc' as const }, { points: 'desc' as const }, { createdAt: 'asc' as const }];

    const users = await this.prisma.user.findMany({
      orderBy,
      select: {
        id: true,
        username: true,
        name: true,
        avatarUrl: true,
        points: true,
        rating: true,
        createdAt: true,
        _count: {
          select: {
            solvedProblems: true,
          },
        },
      },
      take: limit,
    });

    return users.map((u, idx) => ({
      rank: idx + 1,
      id: u.id,
      username: u.username,
      name: u.name,
      avatarUrl: u.avatarUrl,
      points: u.points,
      rating: u.rating,
      solvedCount: u._count.solvedProblems,
    }));
  }

  async getProfile(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        name: true,
        avatarUrl: true,
        points: true,
        rating: true,
        createdAt: true,
        submissions: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            problem: {
              select: { title: true, slug: true },
            },
          },
        },
        achievements: {
          include: {
            achievement: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User profile not found');
    }

    const solvedCount = await this.prisma.problemSolver.count({
      where: {
        userId: user.id,
      },
    });

    return {
      ...user,
      solvedCount,
    };
  }
}
