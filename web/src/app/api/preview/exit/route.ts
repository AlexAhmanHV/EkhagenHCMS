import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const draft = await draftMode();
  draft.disable();

  const redirectTo = request.nextUrl.searchParams.get("path") ?? "/";
  return NextResponse.redirect(new URL(redirectTo, request.url));
}
