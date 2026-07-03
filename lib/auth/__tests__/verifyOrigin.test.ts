import { describe, it, expect, beforeAll } from "vitest";

describe("CSRF Origin Verification Helper", () => {
  let isValidOrigin: (req: Request) => boolean;

  beforeAll(async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://taskflow.dev";
    const mod = await import("../verifyOrigin");
    isValidOrigin = mod.isValidOrigin;
  });

  it("should permit requests without origin headers (same-origin / direct calls)", () => {
    const req = new Request("https://taskflow.dev/api/progress");
    expect(isValidOrigin(req)).toBe(true);
  });

  it("should permit requests matching canon site origin", () => {
    const req = new Request("https://taskflow.dev/api/progress", {
      headers: {
        Origin: "https://taskflow.dev",
      },
    });
    expect(isValidOrigin(req)).toBe(true);
  });

  it("should block mismatching cross-origin requests", () => {
    const req = new Request("https://taskflow.dev/api/progress", {
      headers: {
        Origin: "https://evil.site",
      },
    });
    expect(isValidOrigin(req)).toBe(false);
  });
});
