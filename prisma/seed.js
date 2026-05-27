const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database with test roles...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@orisunigbominafm.com' },
    update: {},
    create: {
      email: 'admin@orisunigbominafm.com',
      name: 'System Admin',
      password: passwordHash,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Created Admin: ${admin.email} (password: password123)`);

  // 2. Presenter
  const presenter = await prisma.user.upsert({
    where: { email: 'presenter@orisunigbominafm.com' },
    update: {},
    create: {
      email: 'presenter@orisunigbominafm.com',
      name: 'OAP Presenter',
      password: passwordHash,
      role: 'PRESENTER',
    },
  });
  console.log(`✅ Created Presenter: ${presenter.email} (password: password123)`);

  // 3. Correspondent
  const correspondent = await prisma.user.upsert({
    where: { email: 'correspondent@orisunigbominafm.com' },
    update: {},
    create: {
      email: 'correspondent@orisunigbominafm.com',
      name: 'Field Correspondent',
      password: passwordHash,
      role: 'CORRESPONDENT',
    },
  });
  console.log(`✅ Created Correspondent: ${correspondent.email} (password: password123)`);

  // 4. Tech Lead (Superuser)
  const techLeadPasswordHash = await bcrypt.hash('TechLead@2026', 10);
  const techLead = await prisma.user.upsert({
    where: { email: 'techlead@orisunigbominafm.com' },
    update: {},
    create: {
      email: 'techlead@orisunigbominafm.com',
      name: 'Tech Lead',
      password: techLeadPasswordHash,
      role: 'ADMIN', // Highest privilege
    },
  });
  console.log(`✅ Created Tech Lead Superuser: ${techLead.email} (password: TechLead@2026)`);

  console.log('🎉 Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
