import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

const mockPrismaService = {
  user: {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  refreshToken: {
    create: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
};

const mockJwtService = {
  sign: jest.fn(),
};

const mockConfigService = {
  get: jest.fn((key: string) => {
    if (key === 'JWT_SECRET') return 'test-access-secret';
    if (key === 'JWT_REFRESH_SECRET') return 'test-refresh-secret';
    return null;
  }),
};

const mockAdminService = {
  createAuditLog: jest.fn().mockResolvedValue({}),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: AdminService, useValue: mockAdminService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should throw ConflictException if email or username is already taken', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue({ email: 'user@example.com', username: 'user1' });

      await expect(
        service.register({
          email: 'user@example.com',
          username: 'user1',
          password: 'password123',
          name: 'Test User',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should hash password and create user if details are unique', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      mockPrismaService.user.create.mockResolvedValue({
        id: 'user-uuid',
        email: 'user@example.com',
        username: 'user1',
        role: 'USER',
        createdAt: new Date(),
      });

      const result = await service.register({
        email: 'user@example.com',
        username: 'user1',
        password: 'password123',
        name: 'Test User',
      });

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: 'user@example.com',
          username: 'user1',
          passwordHash: 'hashed-password',
          name: 'Test User',
        },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          createdAt: true,
        },
      });
      expect(result.username).toBe('user1');
    });
  });

  describe('login', () => {
    it('should throw UnauthorizedException for invalid email or password hash missing', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({
          email: 'notfound@example.com',
          password: 'password123',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password does not match hash', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 'user-uuid',
        email: 'user@example.com',
        passwordHash: 'hashed-password',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login({
          email: 'user@example.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return tokens if credentials are correct', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 'user-uuid',
        email: 'user@example.com',
        passwordHash: 'hashed-password',
        role: 'USER',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockImplementation((payload, opts) => {
        if (opts.secret === 'test-access-secret') return 'access-token';
        return 'refresh-token';
      });

      const result = await service.login({
        email: 'user@example.com',
        password: 'password123',
      });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.accessToken).toBe('access-token');
      expect(result.refreshToken).toBe('refresh-token');
      expect(mockPrismaService.refreshToken.create).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException if JWT secrets are missing in config', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 'user-uuid',
        email: 'user@example.com',
        passwordHash: 'hashed-password',
        role: 'USER',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockConfigService.get.mockReturnValue(null);

      await expect(
        service.login({
          email: 'user@example.com',
          password: 'password123',
        }),
      ).rejects.toThrow();
    });
  });
});
