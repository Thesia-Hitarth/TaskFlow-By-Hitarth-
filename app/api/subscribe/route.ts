import { subscribeEmailAction } from "@/lib/actions/subscribe";
import { limitSubscribe } from "@/lib/ai/rateLimit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidIP(ip: string): boolean {
  const ipv4Regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

function getAllowedOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

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

  const origin = req.headers.get("origin");
  const allowedOrigin = getAllowedOrigin();

  if (origin && origin !== allowedOrigin && allowedOrigin !== "http://localhost:3000") {
    // If not matching, fail. But allow localhost during dev.
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
