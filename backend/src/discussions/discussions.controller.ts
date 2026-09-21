import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Discussions & Forum')
@Controller('discussions')
export class DiscussionsController {
  constructor(private readonly discussionsService: DiscussionsService) {}

  @Get()
  @ApiOperation({ summary: 'List forum discussion threads with filters' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'problemId', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('problemId') problemId?: string,
    @Query('category') category?: string,
  ) {
    const p = page ? parseInt(page, 10) : 1;
    const l = limit ? parseInt(limit, 10) : 20;
    return this.discussionsService.findAll(p, l, problemId, category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single thread details with nested comments' })
  async findOne(@Param('id') id: string) {
    return this.discussionsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new discussion thread' })
  async create(@Body() createDiscussionDto: CreateDiscussionDto, @Request() req: any) {
    return this.discussionsService.create(createDiscussionDto, req.user.id);
  }

  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Post comment or nested reply inside thread' })
  async addComment(
    @Param('id') discussionId: string,
    @Body('content') content: string,
    @Body('parentId') parentId: string,
    @Request() req: any,
  ) {
    return this.discussionsService.addComment(discussionId, content, req.user.id, parentId);
  }

  @Post('like')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Like or unlike a discussion thread or comment' })
  async toggleLike(
    @Request() req: any,
    @Body('discussionId') discussionId?: string,
    @Body('commentId') commentId?: string,
  ) {
    return this.discussionsService.toggleLike(req.user.id, discussionId, commentId);
  }

  @Post('bookmark/:problemId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bookmark or unbookmark a coding problem' })
  async toggleBookmark(@Param('problemId') problemId: string, @Request() req: any) {
    return this.discussionsService.toggleBookmark(req.user.id, problemId);
  }
}
