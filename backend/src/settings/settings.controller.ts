import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Platform Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all platform key-value settings configuration' })
  async getAll() {
    return this.settingsService.getAll();
  }

  @Get(':key')
  @ApiOperation({ summary: 'Get value of a single platform configuration key' })
  async get(@Param('key') key: string) {
    return { key, value: await this.settingsService.get(key) };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update or create a platform setting (Admin only)' })
  async set(@Body() dto: UpdateSettingDto) {
    return this.settingsService.set(dto.key, dto.value);
  }
}
