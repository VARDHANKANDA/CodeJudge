import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AIService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('AI Code Assistant')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Throttle({ default: { limit: 15, ttl: 60000 } })
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('review')
  @ApiOperation({ summary: 'Perform an AI review on user source code' })
  async reviewCode(@Body('code') code: string, @Body('language') language: string) {
    return { feedback: await this.aiService.reviewCode(code, language) };
  }

  @Post('complexity')
  @ApiOperation({ summary: 'Estimate runtime and space complexity (Big O)' })
  async explainComplexity(@Body('code') code: string, @Body('language') language: string) {
    return { feedback: await this.aiService.explainComplexity(code, language) };
  }

  @Post('optimize')
  @ApiOperation({ summary: 'Suggest optimizations and faster algorithms for the solution' })
  async suggestOptimizations(@Body('code') code: string, @Body('language') language: string) {
    return { feedback: await this.aiService.suggestOptimizations(code, language) };
  }
}
