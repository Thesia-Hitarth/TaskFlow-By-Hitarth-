import { prisma } from "@/lib/prisma";

export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<{ success: boolean; limit: number; remaining: number; reset: Date }> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - windowSeconds * 1000);

  try {
    // Fire-and-forget delete of records older than 24 hours to keep the table clean
    prisma.aIRateLimit
      .deleteMany({
        where: {
          timestamp: {
            lt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
          },
        },
      })
      .catch(() => {});

    // Create the record first (write first to prevent race condition)
    const record = await prisma.aIRateLimit.create({
      data: {
        key,
        timestamp: now,
      },
    });

    // Count records in the current sliding window
    const count = await prisma.aIRateLimit.count({
      where: {
        key,
        timestamp: {
          gte: windowStart,
        },
      },
    });

    if (count > limit) {
      // Over limit! Delete the created record so we don't block subsequent windows artificially
      await prisma.aIRateLimit.delete({
        where: { id: record.id },
      }).catch(() => {});

      const oldestInWindow = await prisma.aIRateLimit.findFirst({
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

    return {
      success: true,
      limit,
      remaining: limit - count,
      reset: new Date(now.getTime() + windowSeconds * 1000),
    };
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
