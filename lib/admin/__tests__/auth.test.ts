process.env.ADMIN_EMAIL = "admin@taskflow.dev";
import { describe, it, expect } from "vitest";
import { isAdmin } from "../auth";

describe("Admin Authorization Helper", () => {

  it("should permit user with admin role", () => {
    const session = {
      user: {
        email: "regular@example.com",
        role: "admin",
      },
    };
    expect(isAdmin(session)).toBe(true);
  });

  it("should permit user with matching ADMIN_EMAIL fallback", () => {
    const session = {
      user: {
        email: "admin@taskflow.dev",
        role: "user",
      },
    };
    expect(isAdmin(session)).toBe(true);
  });

  it("should reject regular user", () => {
    const session = {
      user: {
        email: "regular@example.com",
        role: "user",
      },
    };
    expect(isAdmin(session)).toBe(false);
  });

  it("should reject null or undefined sessions", () => {
    expect(isAdmin(null)).toBe(false);
    expect(isAdmin(undefined)).toBe(false);
    expect(isAdmin({})).toBe(false);
  });
});
