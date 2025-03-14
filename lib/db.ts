// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// ✅ Use globalThis and allow undefined
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // optional for debugging
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
