import { createHmac } from "crypto";

const SECRET = process.env.AUTH_SECRET || "default_auth_secret_for_taskflow_dev_fallback_123456";

export function generateToken(email: string, purpose: "unsubscribe" | "confirm"): string {
  const normalizedEmail = email.trim().toLowerCase();
  const timestamp = Date.now();
  const data = `${normalizedEmail}:${purpose}:${timestamp}`;
  const hmac = createHmac("sha256", SECRET).update(data).digest("hex");
  return Buffer.from(`${normalizedEmail}:${timestamp}:${hmac}`).toString("base64url");
}

export function verifyToken(token: string, purpose: "unsubscribe" | "confirm"): string | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const parts = decoded.split(":");
    if (parts.length < 3) return null;
    
    const signature = parts[parts.length - 1];
    const timestampStr = parts[parts.length - 2];
    const email = parts.slice(0, parts.length - 2).join(":");
    
    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) return null;

    // Check expiry
    const now = Date.now();
    const expiry = purpose === "confirm" ? 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000; // 24 hours for confirm, 30 days for unsubscribe
    if (now - timestamp > expiry) {
      return null;
    }

    // Verify signature
    const data = `${email}:${purpose}:${timestampStr}`;
    const expectedSignature = createHmac("sha256", SECRET).update(data).digest("hex");
    if (signature === expectedSignature) {
      return email;
    }
  } catch {
    // Ignore
  }
  return null;
}
