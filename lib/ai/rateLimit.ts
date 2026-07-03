import { prisma } from "@/lib/prisma";
import { after } from "next/server";

export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<{ success: boolean; limit: number; remaining: number; reset: Date }> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - windowSeconds * 1000);

  try {
    // Delete of records older than 24 hours to keep the table clean.
    // Errors are logged so table-bloat failures are visible in monitoring.
    try {
      after(() => {
        prisma.aIRateLimit
          .deleteMany({
            where: {
              timestamp: {
                lt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
              },
            },
          })
          .catch((err) => {
            console.error("[RateLimit] Failed to clean up old AIRateLimit records in after:", err);
          });
      });
    } catch {
      prisma.aIRateLimit
        .deleteMany({
          where: {
            timestamp: {
              lt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
            },
          },
        })
        .catch((err) => {
          console.error("[RateLimit] Failed to clean up old AIRateLimit records directly:", err);
        });
    }

    const result = await prisma.$transaction(async (tx) => {
      // Use transaction-level advisory locks for PostgreSQL if available.
      // This prevents race conditions on sliding window counts across serverless instances.
      const isPostgres = process.env.DATABASE_URL?.startsWith("postgres:") || process.env.DATABASE_URL?.startsWith("postgresql:");
      if (isPostgres) {
        await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${key}))`;
      }

      // Count records in the current sliding window
      const count = await tx.aIRateLimit.count({
        where: {
          key,
          timestamp: {
            gte: windowStart,
          },
        },
      });

      if (count >= limit) {
        const oldestInWindow = await tx.aIRateLimit.findFirst({
          where: {
            key,
            timestamp: {
              gte: windowStart,
            },
          },
          orderBy: {
            timestamp: "asc",
          },
        });

        const resetTime = oldestInWindow
          ? new Date(oldestInWindow.timestamp.getTime() + windowSeconds * 1000)
          : new Date(now.getTime() + windowSeconds * 1000);

        return {
          success: false,
          limit,
          remaining: 0,
          reset: resetTime,
        };
      }

      // Record this request
      await tx.aIRateLimit.create({
        data: {
          key,
          timestamp: now,
        },
      });

      return {
        success: true,
        limit,
        remaining: limit - (count + 1),
        reset: new Date(now.getTime() + windowSeconds * 1000),
      };
    });

    return result;
  } catch (err) {
    console.error("[Rate Limit Error]", err);
    // Fail closed in case of database issues
    return {
      success: false,
      limit,
      remaining: 0,
      reset: new Date(now.getTime() + windowSeconds * 1000),
    };
  }
}


export async function limitExplain(userId: string) {
  return checkRateLimit(`user:explain:${userId}`, 20, 3600); // 20 per hour
}

export async function limitCodeReview(userId: string) {
  return checkRateLimit(`user:codereview:${userId}`, 10, 3600); // 10 per hour
}

export async function limitQuizGen(userId: string) {
  return checkRateLimit(`user:quizgen:${userId}`, 15, 3600); // 15 per hour
}

export async function limitSubscribe(ip: string) {
  return checkRateLimit(`ip:subscribe:${ip}`, 5, 600); // 5 per 10 minutes
}

export async function limitSearch(ip: string) {
  return checkRateLimit(`ip:search:${ip}`, 30, 60); // 30 per minute
}
