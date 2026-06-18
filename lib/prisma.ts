import { PrismaClient } from "@prisma/client";

// BUG-005: Singleton pattern to prevent connection pool exhaustion in Next.js serverless.
// In development, Next.js hot-reloads modules which would create a new PrismaClient on
// every reload. We attach it to `globalThis` so it persists across hot reloads.
// In production, each serverless function instance only runs this module once, so the
// singleton is created once per instance and reused.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  });

// Only cache the instance on globalThis in development to avoid hot-reload exhaustion.
// In production (NODE_ENV === "production"), we do NOT set this, so each serverless
// instance gets its own connection (which is the correct behaviour for serverless).
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
