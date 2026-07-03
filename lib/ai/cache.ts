import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { after } from "next/server";

function buildCacheKey(parts: (string | undefined)[]): string {
  const normalized = parts
    .filter(Boolean)
    .map((p) => p!.toLowerCase().trim().replace(/\s+/g, " "))
    .join("::");
  return createHash("sha256").update(normalized).digest("hex");
}

export async function getCachedResponse(parts: (string | undefined)[]): Promise<string | null> {
  try {
    const cacheKey = buildCacheKey(parts);
    const cached = await prisma.aICache.findUnique({
      where: { cacheKey },
    });

    if (cached) {
      try {
        after(() => {
          prisma.aICache
            .update({
              where: { cacheKey },
              data: { hitCount: { increment: 1 } },
            })
            .catch(() => {});
        });
      } catch {
        prisma.aICache
          .update({
            where: { cacheKey },
            data: { hitCount: { increment: 1 } },
          })
          .catch(() => {});
      }

      return cached.response;
    }
  } catch (err) {
    console.error("[Cache Get Error]", err);
  }
  return null;
}

export async function setCachedResponse(
  parts: (string | undefined)[],
  response: string
): Promise<void> {
  try {
    const cacheKey = buildCacheKey(parts);
    await prisma.aICache.upsert({
      where: { cacheKey },
      create: { cacheKey, response },
      update: { response, hitCount: { increment: 1 } },
    });
  } catch (err) {
    console.error("[Cache Set Error]", err);
  }
}
