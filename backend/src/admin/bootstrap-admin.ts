import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function bootstrapAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@codejudge.com';
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.error('ERROR: ADMIN_PASSWORD environment variable is required to bootstrap an admin user.');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('ERROR: ADMIN_PASSWORD must be at least 8 characters long for security.');
    process.exit(1);
  }

  console.log(`Bootstrapping admin user for email: ${email.replace(/(.{2})(.*)(@.*)/, '$1***$3')} (username: ${username})...`);

  const passwordHash = await bcrypt.hash(password, 10);

  const adminUser = await prisma.user.upsert({
    where: { email },
    update: {
      role: Role.ADMIN,
      passwordHash,
      isEmailVerified: true,
    },
    create: {
      email,
      username,
      name: 'System Administrator',
      passwordHash,
      role: Role.ADMIN,
      isEmailVerified: true,
    },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      createdAt: true,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: 'ADMIN_BOOTSTRAP_PROMOTION',
      details: { role: Role.ADMIN, timestamp: new Date().toISOString() },
    },
  });

  console.log(`[SUCCESS] Admin account successfully created/updated with ID: ${adminUser.id} and Role: ${adminUser.role}`);
}

bootstrapAdmin()
  .catch((err) => {
    console.error('Bootstrap failure:', err.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
