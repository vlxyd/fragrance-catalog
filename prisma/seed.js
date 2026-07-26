const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'Admin123!';
  const name = process.env.ADMIN_NAME || 'Administrator';

  const hashed = await bcrypt.hash(password, 10);

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required for Prisma seed.');
  }

  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('Admin user already exists:', email);
    await prisma.$disconnect();
    return;
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name,
      role: 'ADMIN',
    },
  });

  console.log('Created admin user:', user.email);
  console.log('Password (keep safe):', password);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
