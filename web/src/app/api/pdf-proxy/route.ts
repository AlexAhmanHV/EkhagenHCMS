import { NextRequest, NextResponse } from "next/server";

function getAllowedBaseUrl() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
}

function isAllowedPdfUrl(rawUrl: string) {
  try {
    const target = new URL(rawUrl);
    const allowed = new URL(getAllowedBaseUrl());

    const sameOrigin = target.origin === allowed.origin;
    const isPdf = target.pathname.toLowerCase().endsWith(".pdf");
    const isUpload = target.pathname.includes("/uploads/");

    return sameOrigin && isPdf && isUpload;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src");

  if (!src || !isAllowedPdfUrl(src)) {
    return NextResponse.json({ error: "Invalid PDF source URL." }, { status: 400 });
  }

  const upstream = await fetch(src, { cache: "no-store" });
  if (!upstream.ok) {
    return NextResponse.json(
      { error: `Could not fetch PDF (${upstream.status}).` },
      { status: 502 },
    );
  }

  const buffer = await upstream.arrayBuffer();
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
      "Cache-Control": "no-store",
    },
  });
}
