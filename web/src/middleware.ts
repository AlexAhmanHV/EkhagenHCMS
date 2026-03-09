import { NextRequest, NextResponse } from "next/server";

function getCanonicalUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) {
    return null;
  }

  try {
    return new URL(raw);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const canonical = getCanonicalUrl();
  if (!canonical) {
    return NextResponse.next();
  }

  const currentHost = request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const currentProtocol = forwardedProto || request.nextUrl.protocol.replace(":", "");
  const canonicalProtocol = canonical.protocol.replace(":", "");
  const hostMatches = !!currentHost && currentHost === canonical.host;
  const protocolMatches = currentProtocol === canonicalProtocol;

  if (hostMatches && protocolMatches) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.protocol = canonical.protocol;
  redirectUrl.hostname = canonical.hostname;
  redirectUrl.port = canonical.port;

  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: "/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)",
};
