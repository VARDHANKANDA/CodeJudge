import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Panel')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('metrics')
  @ApiOperation({ summary: 'Get total dashboard and submission metrics (Admin only)' })
  async getMetrics() {
    return this.adminService.getMetrics();
  }

  @Get('health')
  @ApiOperation({ summary: 'Get dynamic system physical health indicators (Admin only)' })
  async getHealth() {
    return this.adminService.getSystemHealth();
  }

  @Get('logs')
  @ApiOperation({ summary: 'Get paginated security audit log trail (Admin only)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getLogs(@Query('page') page?: string, @Query('limit') limit?: string) {
    const p = page ? parseInt(page, 10) : 1;
    const l = limit ? parseInt(limit, 10) : 50;
    return this.adminService.getAuditLogs(p, l);
  }
}
