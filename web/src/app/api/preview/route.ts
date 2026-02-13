import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const slug = request.nextUrl.searchParams.get("slug");
  const path = request.nextUrl.searchParams.get("path");
  const expectedSecret = process.env.STRAPI_PREVIEW_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      { error: "Missing STRAPI_PREVIEW_SECRET in environment." },
      { status: 500 },
    );
  }

  if (!secret || secret !== expectedSecret) {
    return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  if (path) {
    return NextResponse.redirect(new URL(path, request.url));
  }

  const target = slug ? `/articles/${slug}` : "/";
  return NextResponse.redirect(new URL(target, request.url));
}
