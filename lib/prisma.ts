import { PrismaClient } from "@prisma/client";

// In development, Next.js hot-reloads modules which would create a new PrismaClient on
// every reload. We attach the raw instance to `globalThis` so it persists across hot reloads.
const globalForPrisma = globalThis as unknown as { prismaInstance: PrismaClient };

const client =
  globalForPrisma.prismaInstance ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaInstance = client;

// Extend Prisma Client with automatic retry logic for connection drops (common with serverless Postgres scaling/wakeups)
export const prisma = client.$extends({
  query: {
    $allOperations({ model, operation, args, query }) {
      const maxRetries = 3;
      let delay = 500;

      async function execute(attempt: number): Promise<unknown> {
        try {
          return await query(args);
        } catch (error: unknown) {
          const err = error as { message?: string; code?: string };
          // Check for connection termination signatures
          const isConnectionError =
            err.message?.includes("closed the connection") ||
            err.message?.includes("connection") ||
            err.message?.includes("socket") ||
            err.code === "P1017" || // Server closed connection
            err.code === "P1001" || // Cannot reach DB
            err.code === "P2024";   // Connection timeout

          if (isConnectionError && attempt < maxRetries) {
            console.warn(
              `[Prisma] Connection lost on ${model || "system"}.${operation}. Retrying in ${delay}ms... (Attempt ${attempt + 1}/${maxRetries})`
            );
            await new Promise((resolve) => setTimeout(resolve, delay));
            delay *= 2; // Exponential backoff
            return execute(attempt + 1);
          }
          throw error;
        }
      }

      return execute(0);
    },
  },
});
