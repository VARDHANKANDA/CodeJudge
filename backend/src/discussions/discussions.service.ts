import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';

@Injectable()
export class DiscussionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDiscussionDto, authorId: string) {
    return this.prisma.discussion.create({
      data: {
        title: dto.title,
        content: dto.content,
        category: dto.category ?? 'General',
        problemId: dto.problemId ?? null,
        authorId,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 20, problemId?: string, category?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (problemId) where.problemId = problemId;
    if (category) where.category = category;

    const [items, total] = await Promise.all([
      this.prisma.discussion.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { id: true, username: true, name: true, avatarUrl: true },
          },
          _count: {
            select: { comments: true, likes: true },
          },
        },
      }),
      this.prisma.discussion.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const discussion = await this.prisma.discussion.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, username: true, name: true, avatarUrl: true },
        },
        comments: {
          where: { parentId: null }, // Fetch root comments first
          include: {
            author: {
              select: { id: true, username: true, name: true, avatarUrl: true },
            },
            replies: {
              include: {
                author: {
                  select: { id: true, username: true, name: true, avatarUrl: true },
                },
                _count: { select: { likes: true } },
              },
            },
            _count: { select: { likes: true } },
          },
        },
        _count: {
          select: { likes: true },
        },
      },
    });

    if (!discussion) {
      throw new NotFoundException('Discussion thread not found');
    }

    return discussion;
  }

  async addComment(discussionId: string, content: string, authorId: string, parentId?: string) {
    const thread = await this.prisma.discussion.findUnique({ where: { id: discussionId } });
    if (!thread) {
      throw new NotFoundException('Discussion thread not found');
    }

    if (parentId) {
      const parent = await this.prisma.comment.findUnique({ where: { id: parentId } });
      if (!parent) {
        throw new NotFoundException('Parent comment not found');
      }
    }

    return this.prisma.comment.create({
      data: {
        discussionId,
        content,
        authorId,
        parentId: parentId ?? null,
      },
      include: {
        author: {
          select: { id: true, username: true, name: true, avatarUrl: true },
        },
      },
    });
  }

  async toggleLike(userId: string, discussionId?: string, commentId?: string) {
    if (!discussionId && !commentId) {
      throw new BadRequestException('Provide either discussionId or commentId to like');
    }

    const where: any = {
      userId,
      discussionId: discussionId ?? null,
      commentId: commentId ?? null,
    };

    const existingLike = await this.prisma.like.findFirst({ where });

    if (existingLike) {
      await this.prisma.like.delete({ where: { id: existingLike.id } });
      return { liked: false };
    } else {
      await this.prisma.like.create({
        data: {
          userId,
          discussionId: discussionId ?? null,
          commentId: commentId ?? null,
        },
      });
      return { liked: true };
    }
  }

  async toggleBookmark(userId: string, problemId: string) {
    const problem = await this.prisma.problem.findUnique({ where: { id: problemId } });
    if (!problem) {
      throw new NotFoundException('Problem not found');
    }

    const existing = await this.prisma.bookmark.findUnique({
      where: {
        userId_problemId: { userId, problemId },
      },
    });

    if (existing) {
      await this.prisma.bookmark.delete({ where: { id: existing.id } });
      return { bookmarked: false };
    } else {
      await this.prisma.bookmark.create({
        data: { userId, problemId },
      });
      return { bookmarked: true };
    }
  }
}
