import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import os from "os";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role?.toLowerCase() !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  // Calculate DB latency
  const start = Date.now();
  let dbStatus = "Connected";
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (err) {
    dbStatus = "Disconnected";
  }
  const dbLatency = Date.now() - start;

  // OS memory
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memoryUsage = ((usedMem / totalMem) * 100).toFixed(1);

  // Process memory
  const processMem = process.memoryUsage();
  
  const stats = {
    os: {
      platform: os.platform(),
      release: os.release(),
      arch: os.arch(),
      uptime: os.uptime(),
    },
    memory: {
      total: Math.round(totalMem / 1024 / 1024), // MB
      used: Math.round(usedMem / 1024 / 1024), // MB
      percent: memoryUsage,
      processRss: Math.round(processMem.rss / 1024 / 1024), // MB
    },
    database: {
      status: dbStatus,
      latencyMs: dbLatency,
    },
    process: {
      uptime: process.uptime(),
      nodeVersion: process.version,
    }
  };

  return NextResponse.json(stats);
}
