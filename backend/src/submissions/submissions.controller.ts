import { Controller, Post, Get, Param, Body, UseGuards, Request, Query } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmitCodeDto } from './submit-code.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Submissions')
@Controller('submissions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Post()
  @ApiOperation({ summary: 'Submit solution for code evaluation' })
  async submit(@Body() submitCodeDto: SubmitCodeDto, @Request() req: any) {
    return this.submissionsService.submit(submitCodeDto, req.user.id);
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get current user recent submissions' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getRecent(@Request() req: any, @Query('limit') limit?: string) {
    const l = limit ? parseInt(limit, 10) : 20;
    return this.submissionsService.getRecentUserSubmissions(req.user.id, l);
  }

  @Get('problem/:problemId')
  @ApiOperation({ summary: 'Get current user submissions for a specific problem' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getByProblem(
    @Param('problemId') problemId: string,
    @Request() req: any,
    @Query('limit') limit?: string,
  ) {
    const l = limit ? parseInt(limit, 10) : 20;
    return this.submissionsService.getProblemSubmissions(problemId, req.user.id, l);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get execution details for a submission' })
  async findOne(@Param('id') id: string) {
    return this.submissionsService.findOne(id);
  }
}
