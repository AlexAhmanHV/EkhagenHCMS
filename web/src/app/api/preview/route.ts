import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  const limit = rateLimit(request, {
    keyPrefix: "api:preview",
    windowMs: 60_000,
    maxRequests: 10,
  });
  if (!limit.ok) {
    return limit.response;
  }

  const secret = request.nextUrl.searchParams.get("secret");
  const slug = request.nextUrl.searchParams.get("slug");
  const path = request.nextUrl.searchParams.get("path");
  const expectedSecret = process.env.STRAPI_PREVIEW_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      { error: "Missing STRAPI_PREVIEW_SECRET in environment." },
      { status: 500, headers: limit.headers },
    );
  }

  if (!secret || secret !== expectedSecret) {
    return NextResponse.json(
      { error: "Invalid secret." },
      { status: 401, headers: limit.headers },
    );
  }

  const draft = await draftMode();
  draft.enable();

  if (path) {
    const response = NextResponse.redirect(new URL(path, request.url));
    limit.headers.forEach((value, key) => response.headers.set(key, value));
    return response;
  }

  const target = slug ? `/articles/${slug}` : "/";
  const response = NextResponse.redirect(new URL(target, request.url));
  limit.headers.forEach((value, key) => response.headers.set(key, value));
  return response;
}
