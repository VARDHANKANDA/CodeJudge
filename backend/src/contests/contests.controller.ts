import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ContestsService } from './contests.service';
import { CreateContestDto } from './dto/create-contest.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Contests')
@Controller('contests')
export class ContestsController {
  constructor(private readonly contestsService: ContestsService) {}

  @Get()
  @ApiOperation({ summary: 'List all contests grouped by status' })
  async findAll() {
    return this.contestsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single contest details' })
  async findOne(@Param('id') id: string) {
    return this.contestsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CONTEST_MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new contest (Admin/Manager only)' })
  async create(@Body() createContestDto: CreateContestDto, @Request() req: any) {
    return this.contestsService.create(createContestDto, req.user.id);
  }

  @Post(':id/register')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register for a contest' })
  async register(@Param('id') id: string, @Request() req: any) {
    return this.contestsService.register(id, req.user.id);
  }

  @Post(':id/problems')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CONTEST_MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a problem to a contest (Admin/Manager only)' })
  async addProblem(
    @Param('id') id: string,
    @Body('problemId') problemId: string,
    @Body('points') points: number,
    @Body('order') order: number,
  ) {
    return this.contestsService.addProblem(id, problemId, points, order);
  }

  @Get(':id/problems')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all problems in a contest' })
  async getProblems(@Param('id') id: string) {
    return this.contestsService.getProblems(id);
  }

  @Get(':id/leaderboard')
  @ApiOperation({ summary: 'Get contest leaderboard' })
  async getLeaderboard(@Param('id') id: string) {
    return this.contestsService.getLeaderboard(id);
  }
}
