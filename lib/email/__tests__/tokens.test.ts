import { describe, it, expect, beforeAll } from "vitest";

describe("Email Tokens", () => {
  let generateToken: (email: string, purpose: "unsubscribe" | "confirm") => string;
  let verifyToken: (token: string, purpose: "unsubscribe" | "confirm") => string | null;

  beforeAll(async () => {
    process.env.AUTH_SECRET = "test-secret-value-longer-than-32-chars-for-hmac";
    const mod = await import("../tokens");
    generateToken = mod.generateToken;
    verifyToken = mod.verifyToken;
  });

  it("should generate and verify unsubscribe tokens successfully", () => {
    const email = "test@example.com";
    const token = generateToken(email, "unsubscribe");
    expect(token).toBeDefined();
    
    const verifiedEmail = verifyToken(token, "unsubscribe");
    expect(verifiedEmail).toBe(email);
  });

  it("should generate and verify confirm tokens successfully", () => {
    const email = "confirm@example.com";
    const token = generateToken(email, "confirm");
    expect(token).toBeDefined();
    
    const verifiedEmail = verifyToken(token, "confirm");
    expect(verifiedEmail).toBe(email);
  });

  it("should reject token with incorrect purpose", () => {
    const email = "test@example.com";
    const token = generateToken(email, "unsubscribe");
    
    const verifiedEmail = verifyToken(token, "confirm");
    expect(verifiedEmail).toBeNull();
  });

  it("should reject invalid token signature", () => {
    const email = "test@example.com";
    const token = generateToken(email, "unsubscribe");
    // Tamper with the token
    const tamperedToken = token.slice(0, -5) + "abcde";
    
    const verifiedEmail = verifyToken(tamperedToken, "unsubscribe");
    expect(verifiedEmail).toBeNull();
  });
});
