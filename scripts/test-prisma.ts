import { prisma } from '../lib/prisma';

async function testPrisma() {
  try {
    console.log("Testing prisma connection...");
    const user = await prisma.user.findUnique({
      where: { email: 'techlead@orisunigbominafm.com' },
    });
    console.log("User found:", user ? user.email : "No user");
  } catch (err) {
    console.error("Prisma error:", err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}
testPrisma();
