import { readdir } from "node:fs/promises";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const DERIVATIVE_PREFIX = /^(small_|medium_|large_|thumbnail_)/i;

let cachedPaths: string[] = [];
let cacheExpiresAt = 0;
let cachedLogoPath = "";

async function readUploadPool() {
  const now = Date.now();
  if (now < cacheExpiresAt && cachedPaths.length > 0) {
    return cachedPaths;
  }

  try {
    const uploadsDir = path.resolve(process.cwd(), "..", "cms", "public", "uploads");
    const entries = await readdir(uploadsDir, { withFileTypes: true });

    cachedPaths = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => !DERIVATIVE_PREFIX.test(name))
      .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
      .map((name) => `/uploads/${name}`);
  } catch {
    cachedPaths = [];
  }

  cacheExpiresAt = now + 60_000;
  return cachedPaths;
}

export async function getLogoUploadImage() {
  const pool = await readUploadPool();
  if (pool.length === 0) {
    return "";
  }

  if (cachedLogoPath && pool.includes(cachedLogoPath)) {
    return cachedLogoPath;
  }

  const logoCandidate =
    pool.find((item) => /\/logo[_-]/i.test(item)) ??
    pool.find((item) => /\/logo/i.test(item)) ??
    pool[0] ??
    "";

  cachedLogoPath = logoCandidate;
  return logoCandidate;
}
