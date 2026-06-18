import { NextResponse } from "next/server";
import { assertSameOrigin, rateLimit } from "@/lib/api-security";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const rateLimitError = rateLimit(request, "subscribe");
  if (rateLimitError) return rateLimitError;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email =
    typeof payload === "object" && payload && "email" in payload
      ? String(payload.email).trim().toLowerCase()
      : "";

  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
