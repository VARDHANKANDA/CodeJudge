import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Roadmap & Sheets')
@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: 'Get 7-level structured DSA roadmap with live user progression' })
  async getRoadmap(@Request() req: any) {
    const userId = req.user?.id;
    return this.roadmapService.getRoadmap(userId);
  }

  @Get('sheets')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: 'Get curated interview & competitive sheets with user progress' })
  async getCuratedSheets(@Request() req: any) {
    const userId = req.user?.id;
    return this.roadmapService.getCuratedSheets(userId);
  }
}
