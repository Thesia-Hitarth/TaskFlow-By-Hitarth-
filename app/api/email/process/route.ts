import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "deprecated",
    message: "This endpoint is deprecated. Email queueing is no longer used, and emails are sent directly in the background using next/server after().",
  });
}
