import { NextResponse } from "next/server";

type RateEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateEntry>();

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const requestOrigin = new URL(request.url).origin;
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  const allowedOrigins = new Set(
    [requestOrigin, configuredOrigin].filter(Boolean)
  );

  if (!origin || !allowedOrigins.has(origin)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  return null;
}

export function rateLimit(
  request: Request,
  key: string,
  limit = 10,
  windowMs = 60_000
) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "anonymous";
  const bucketKey = `${key}:${ip}`;
  const now = Date.now();
  const current = buckets.get(bucketKey);

  if (!current || current.resetAt <= now) {
    buckets.set(bucketKey, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (current.count >= limit) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  current.count += 1;
  return null;
}
