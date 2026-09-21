import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async get(key: string): Promise<string> {
    const setting = await this.prisma.setting.findUnique({
      where: { key },
    });
    if (!setting) {
      throw new NotFoundException(`Setting with key '${key}' not found`);
    }
    return setting.value;
  }

  async set(key: string, value: string) {
    return this.prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  async getAll() {
    return this.prisma.setting.findMany();
  }
}
