const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DIRECT_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function testLogin() {
  try {
    const email = 'techlead@orisunigbominafm.com';
    const password = 'TechLead@2026';
    console.log('Testing login for:', email);
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('User not found!');
      return;
    }
    console.log('User found in DB:', user.email, 'Role:', user.role);
    
    const isValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isValid);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}
testLogin();
