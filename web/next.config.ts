import type { NextConfig } from "next";

function buildContentSecurityPolicy() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  let strapiOrigin = "http://localhost:1337";

  try {
    strapiOrigin = new URL(strapiUrl).origin;
  } catch {
    strapiOrigin = "http://localhost:1337";
  }

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    `connect-src 'self' ${strapiOrigin}`,
    `img-src 'self' data: blob: ${strapiOrigin} https:`,
    `media-src 'self' data: blob: ${strapiOrigin} https:`,
    "frame-src 'self'",
  ].join("; ");
}

function getStrapiRemotePattern() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  try {
    const parsed = new URL(strapiUrl);
    return {
      protocol: parsed.protocol.replace(":", "") as "http" | "https",
      hostname: parsed.hostname,
      port: parsed.port || undefined,
      pathname: "/**",
    };
  } catch {
    return {
      protocol: "http" as const,
      hostname: "localhost",
      port: "1337",
      pathname: "/**",
    };
  }
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [getStrapiRemotePattern()],
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
  },
  async redirects() {
    return [
      { source: "/news", destination: "/nyheter", permanent: true },
      { source: "/news/:slug", destination: "/articles/:slug", permanent: true },
      { source: "/menu", destination: "/meny", permanent: true },
      { source: "/contact", destination: "/kontakt", permanent: true },
      { source: "/about", destination: "/om-oss", permanent: true },
      { source: "/book", destination: "/boka", permanent: true },
      { source: "/booking", destination: "/boka", permanent: true },
      { source: "/lunchmeny", destination: "/lunch", permanent: true },
      { source: "/dinnermenu", destination: "/middag", permanent: true },
    ];
  },
  async headers() {
    const csp = buildContentSecurityPolicy();

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
};

export default nextConfig;
