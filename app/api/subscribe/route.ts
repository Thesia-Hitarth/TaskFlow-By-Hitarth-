// app/api/subscribe/route.ts

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple in-memory rate limiting map (BUG-09)
const ipCache = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipCache.get(ip);

  if (!record) {
    ipCache.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (now > record.resetTime) {
    ipCache.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  record.count += 1;
  return record.count > MAX_REQUESTS;
}

function getAllowedOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function POST(req: Request) {
  // Rate limiting check
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many subscription requests. Please try again later in 10 minutes." },
      { status: 429 }
    );
  }

  // Validate Origin header to prevent CSRF attacks.
  const origin = req.headers.get("origin");
  const allowedOrigin = getAllowedOrigin();

  if (!origin || !origin.startsWith(allowedOrigin)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email } = body as { email?: string };

  // Validate email format
  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    // TODO: Store subscribers in your database or link to email service (Resend, Mailchimp, ConvertKit, etc.)
    console.log(`[subscribe] New subscriber: ${normalizedEmail}`);

    return Response.json(
      {
        success: true,
        message: "You'll be notified when new content is added.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[subscribe] Failed to process subscription:", error);
    return Response.json(
      { error: "Failed to process subscription. Please try again." },
      { status: 500 }
    );
  }
}

// Reject all other HTTP methods
export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
