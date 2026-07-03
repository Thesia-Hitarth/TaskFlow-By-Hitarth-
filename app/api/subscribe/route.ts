import { subscribeEmailAction } from "@/lib/actions/subscribe";
import { limitSubscribe } from "@/lib/ai/rateLimit";
import { isValidIP } from "@/lib/utils/ip";
import { isValidOrigin } from "@/lib/auth/verifyOrigin";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let ip = req.headers.get("x-real-ip")
    || req.headers.get("x-forwarded-for")?.split(",")[0].trim()
    || "127.0.0.1";

  if (!isValidIP(ip)) {
    ip = "unknown";
  }

  const { success } = await limitSubscribe(ip);
  if (!success) {
    return Response.json(
      { error: "Too many subscription requests. Please try again later in 10 minutes." },
      { status: 429 }
    );
  }

  if (!isValidOrigin(req)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email } = body as { email?: string };

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  try {
    const result = await subscribeEmailAction(email);
    if (!result.success) {
      return Response.json({ error: result.error }, { status: 500 });
    }

    return Response.json(
      {
        success: true,
        message: result.message,
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
