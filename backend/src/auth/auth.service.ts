import { Injectable, ConflictException, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private adminService: AdminService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { username: dto.username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === dto.email) {
        throw new ConflictException('Email address is already registered');
      }
      throw new ConflictException('Username is already taken');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        passwordHash,
        name: dto.name,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });

    await this.adminService.createAuditLog(user.id, 'USER_REGISTER');

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    await this.adminService.createAuditLog(user.id, 'USER_LOGIN');

    return this.generateTokens(user.id, user.email, user.role);
  }

  async refreshTokens(refreshToken: string) {
    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      if (tokenRecord) {
        await this.prisma.refreshToken.delete({ where: { id: tokenRecord.id } });
      }
      throw new UnauthorizedException('Refresh token is invalid or has expired');
    }

    // Generate new tokens
    const tokens = await this.generateTokens(tokenRecord.user.id, tokenRecord.user.email, tokenRecord.user.role);

    // Delete old refresh token record
    await this.prisma.refreshToken.delete({ where: { id: tokenRecord.id } });

    return tokens;
  }

  async logout(refreshToken: string) {
    try {
      const tokenRecord = await this.prisma.refreshToken.findUnique({
        where: { token: refreshToken },
      });
      if (tokenRecord) {
        await this.adminService.createAuditLog(tokenRecord.userId, 'USER_LOGOUT');
      }
      await this.prisma.refreshToken.delete({
        where: { token: refreshToken },
      });
      return { success: true, message: 'Logged out successfully' };
    } catch (e) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const accessTokenSecret = this.configService.get<string>('JWT_SECRET');
    const refreshTokenSecret = this.configService.get<string>('JWT_REFRESH_SECRET');

    if (!accessTokenSecret || !refreshTokenSecret) {
      throw new InternalServerErrorException('JWT secrets must be configured in environment variables');
    }

    const accessToken = this.jwtService.sign(payload, {
      secret: accessTokenSecret,
      expiresIn: '15m',
    });

    const refreshTokenString = this.jwtService.sign(payload, {
      secret: refreshTokenSecret,
      expiresIn: '7d',
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        token: refreshTokenString,
        userId,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken: refreshTokenString,
      user: {
        id: userId,
        email,
        role,
      },
    };
  }
}
