import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  const limit = rateLimit(request, {
    keyPrefix: "api:preview-exit",
    windowMs: 60_000,
    maxRequests: 20,
  });
  if (!limit.ok) {
    return limit.response;
  }

  const draft = await draftMode();
  draft.disable();

  const redirectTo = request.nextUrl.searchParams.get("path") ?? "/";
  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  limit.headers.forEach((value, key) => response.headers.set(key, value));
  return response;
}
