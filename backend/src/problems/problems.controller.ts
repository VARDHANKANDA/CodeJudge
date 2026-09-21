import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { CreateTestCaseDto } from './dto/create-testcase.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Difficulty, Role } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Problems')
@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get()
  @ApiOperation({ summary: 'Get paginated problems with filters' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'difficulty', required: false, enum: Difficulty })
  @ApiQuery({ name: 'tag', required: false, type: String })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('difficulty') difficulty?: Difficulty,
    @Query('tag') tag?: string,
  ) {
    const p = page ? parseInt(page, 10) : 1;
    const l = limit ? parseInt(limit, 10) : 20;
    return this.problemsService.findAll(p, l, search, difficulty, tag);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get single problem by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.problemsService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single problem by ID' })
  async findOne(@Param('id') id: string) {
    return this.problemsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.PROBLEM_SETTER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new problem (Admin/Setter only)' })
  async create(@Body() createProblemDto: CreateProblemDto, @Request() req: any) {
    return this.problemsService.create(createProblemDto, req.user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.PROBLEM_SETTER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a problem (Admin/Setter only)' })
  async update(@Param('id') id: string, @Body() updateProblemDto: CreateProblemDto) {
    return this.problemsService.update(id, updateProblemDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a problem (Admin only)' })
  async remove(@Param('id') id: string) {
    return this.problemsService.remove(id);
  }

  @Post(':id/testcases')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.PROBLEM_SETTER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a test case to a problem (Admin/Setter only)' })
  async addTestCase(@Param('id') problemId: string, @Body() createTestCaseDto: CreateTestCaseDto) {
    return this.problemsService.addTestCase(problemId, createTestCaseDto);
  }

  @Get(':id/testcases')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get test cases for a problem (Visible cases only, Admin gets all)' })
  async getTestCases(@Param('id') problemId: string, @Request() req: any) {
    const isAdmin = req.user.role === Role.ADMIN || req.user.role === Role.PROBLEM_SETTER;
    return this.problemsService.getTestCases(problemId, isAdmin);
  }

  @Delete('testcases/:tcId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.PROBLEM_SETTER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a specific test case (Admin/Setter only)' })
  async deleteTestCase(@Param('tcId') tcId: string) {
    return this.problemsService.deleteTestCase(tcId);
  }
}
