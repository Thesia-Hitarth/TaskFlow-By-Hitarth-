// lib/env.ts
if (typeof window === "undefined") {
  const isBuild = process.env.NEXT_PHASE === "phase-production-build";
  // NOTE: These names follow NextAuth v5's auto-env-detection convention
  // (AUTH_<PROVIDER>_ID / AUTH_<PROVIDER>_SECRET), NOT the v4-style
  // GITHUB_ID/GITHUB_SECRET. Do not rename without updating auth.ts providers config.
  const isProd = process.env.NODE_ENV === "production";
  const required = [
    "AUTH_SECRET",
    "DATABASE_URL",
    "NEXT_PUBLIC_SITE_URL",
    "AUTH_GITHUB_ID",
    "AUTH_GITHUB_SECRET",
    "AUTH_GOOGLE_ID",
    "AUTH_GOOGLE_SECRET",
    "GEMINI_API_KEY",
    // INFO-001: Email sender must be set so emails don't bounce from a placeholder domain
    "EMAIL_FROM",
    ...(isProd ? ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CRON_SECRET"] : []),
  ];

  if (isProd && process.env.VERCEL === "1" && process.env.NEXT_PUBLIC_SITE_URL?.includes("localhost")) {
    throw new Error("NEXT_PUBLIC_SITE_URL must not point to localhost in production");
  }

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    const errorMsg = `Missing required environment variables: ${missing.join(", ")}`;
    if (isBuild) {
      console.warn(`[Warning] ${errorMsg} (Skipping error during build phase)`);
    } else {
      throw new Error(errorMsg);
    }
  }
}
