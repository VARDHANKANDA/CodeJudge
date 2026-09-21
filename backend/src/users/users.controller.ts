import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('User Profiles & Leaderboard')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('leaderboard')
  @ApiOperation({ summary: 'Get global users leaderboard rankings ordered by score points' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getLeaderboard(@Query('limit') limit?: string) {
    const l = limit ? parseInt(limit, 10) : 50;
    return this.usersService.getLeaderboard(l);
  }

  @Get('profile/:username')
  @ApiOperation({ summary: 'Get public user profile information by username' })
  async getProfile(@Param('username') username: string) {
    return this.usersService.getProfile(username);
  }
}
