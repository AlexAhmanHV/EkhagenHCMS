import { NextRequest, NextResponse } from "next/server";

type RateLimitOptions = {
  keyPrefix: string;
  windowMs: number;
  maxRequests: number;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const globalStore = globalThis as typeof globalThis & {
  __rateLimitBuckets?: Map<string, RateLimitBucket>;
};

function getBuckets() {
  if (!globalStore.__rateLimitBuckets) {
    globalStore.__rateLimitBuckets = new Map<string, RateLimitBucket>();
  }
  return globalStore.__rateLimitBuckets;
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

export function rateLimit(request: NextRequest, options: RateLimitOptions) {
  const now = Date.now();
  const ip = getClientIp(request);
  const bucketKey = `${options.keyPrefix}:${ip}`;
  const buckets = getBuckets();

  const existing = buckets.get(bucketKey);
  const freshBucket =
    !existing || existing.resetAt <= now
      ? { count: 0, resetAt: now + options.windowMs }
      : existing;

  freshBucket.count += 1;
  buckets.set(bucketKey, freshBucket);

  const remaining = Math.max(0, options.maxRequests - freshBucket.count);
  const retryAfterSeconds = Math.max(
    1,
    Math.ceil((freshBucket.resetAt - now) / 1000),
  );

  const headers = new Headers({
    "X-RateLimit-Limit": String(options.maxRequests),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(Math.floor(freshBucket.resetAt / 1000)),
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  });

  if (freshBucket.count > options.maxRequests) {
    headers.set("Retry-After", String(retryAfterSeconds));
    return {
      ok: false as const,
      response: NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers },
      ),
    };
  }

  return {
    ok: true as const,
    headers,
  };
}
