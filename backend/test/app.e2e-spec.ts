import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthModule } from '../src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from '../src/admin/admin.module';
import { UsersModule } from '../src/users/users.module';

describe('Authentication & Security (e2e)', () => {
  let app: INestApplication;

  const mockUsers: any[] = [];
  const mockRefreshTokens: any[] = [];

  const mockPrismaService = {
    $connect: jest.fn().mockResolvedValue({}),
    $disconnect: jest.fn().mockResolvedValue({}),
    user: {
      findFirst: jest.fn(async ({ where }) => {
        if (where?.OR) {
          const email = where.OR.find((o: any) => o.email)?.email;
          const username = where.OR.find((o: any) => o.username)?.username;
          return mockUsers.find((u) => u.email === email || u.username === username) || null;
        }
        return null;
      }),
      findUnique: jest.fn(async ({ where }) => {
        if (where?.email) {
          return mockUsers.find((u) => u.email === where.email) || null;
        }
        if (where?.id) {
          return mockUsers.find((u) => u.id === where.id) || null;
        }
        return null;
      }),
      create: jest.fn(async ({ data, select }) => {
        const fullUser = {
          id: `user-${Date.now()}`,
          ...data,
          role: 'USER',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        mockUsers.push(fullUser);
        if (select) {
          const sanitized: any = {};
          Object.keys(select).forEach((k) => {
            if (select[k]) sanitized[k] = fullUser[k];
          });
          return sanitized;
        }
        return fullUser;
      }),
    },
    refreshToken: {
      create: jest.fn(async ({ data }) => {
        const rt = { id: `rt-${Date.now()}`, ...data };
        mockRefreshTokens.push(rt);
        return rt;
      }),
      findUnique: jest.fn(async ({ where }) => {
        return mockRefreshTokens.find((r) => r.token === where.token) || null;
      }),
      delete: jest.fn(async ({ where }) => {
        const idx = mockRefreshTokens.findIndex((r) => r.id === where.id || r.token === where.token);
        if (idx !== -1) mockRefreshTokens.splice(idx, 1);
        return {};
      }),
    },
    auditLog: {
      create: jest.fn().mockResolvedValue({}),
      findMany: jest.fn().mockResolvedValue([]),
      count: jest.fn().mockResolvedValue(0),
    },
  };

  beforeAll(async () => {
    process.env.JWT_SECRET = 'test-e2e-jwt-access-token-secret-1234567890';
    process.env.JWT_REFRESH_SECRET = 'test-e2e-jwt-refresh-token-secret-1234567890';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        AuthModule,
        AdminModule,
        UsersModule,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('POST /api/auth/register - rejects empty payload with 400', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({})
      .expect(400);
  });

  it('POST /api/auth/register - registers new user with hashed password and returns sanitized record', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        email: 'e2e-test@codejudge.com',
        username: 'e2euser',
        password: 'Password123!',
        name: 'E2E User',
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('e2e-test@codejudge.com');
    expect(res.body.username).toBe('e2euser');
    expect(res.body).not.toHaveProperty('passwordHash');
  });

  it('POST /api/auth/register - rejects duplicate email with 409 Conflict', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        email: 'e2e-test@codejudge.com',
        username: 'anotherusername',
        password: 'Password123!',
      })
      .expect(409);
  });

  it('POST /api/auth/login - rejects invalid credentials with 401 Unauthorized', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: 'e2e-test@codejudge.com',
        password: 'WrongPassword!',
      })
      .expect(401);
  });

  it('POST /api/auth/login - returns access & refresh tokens on valid credentials', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: 'e2e-test@codejudge.com',
        password: 'Password123!',
      })
      .expect(200);

    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
    expect(res.body.user.email).toBe('e2e-test@codejudge.com');
  });

  it('POST /api/auth/oauth-callback - NEGATIVE SECURITY TEST: endpoint is completely unregistered (404 Not Found)', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/oauth-callback')
      .send({ email: 'admin@codejudge.com', id: 'fake-admin' })
      .expect(404);
  });

  it('GET /api/admin/metrics - rejects unauthenticated access with 401', async () => {
    await request(app.getHttpServer())
      .get('/api/admin/metrics')
      .expect(401);
  });
});
