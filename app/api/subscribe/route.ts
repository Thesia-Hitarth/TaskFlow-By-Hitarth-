// BUG-009: Subscribe API route — previously the homepage form had no backend handler.
// BUG-024: CSRF protection via Origin header validation.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Allowed origins for CSRF protection. In production this should be your real domain.
function getAllowedOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function POST(req: Request) {
  // BUG-024: Validate Origin header to prevent CSRF attacks.
  // Browsers always send the Origin header for cross-origin POST requests.
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
    // TODO: Integrate with an email service (Resend, Mailchimp, ConvertKit, etc.)
    // For now, we log the subscription for demonstration.
    // In production, replace this with your email provider SDK call:
    //   await resend.contacts.create({ email: normalizedEmail, audienceId: '...' });
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
