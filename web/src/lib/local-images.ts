import { readdir } from "node:fs/promises";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const PDF_EXTENSIONS = new Set([".pdf"]);
const DERIVATIVE_PREFIX = /^(small_|medium_|large_|thumbnail_)/i;

let cachedPaths: string[] = [];
let cacheExpiresAt = 0;
let cachedLogoPath = "";
let cachedPdfPaths: string[] = [];

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

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

    cachedPdfPaths = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => PDF_EXTENSIONS.has(path.extname(name).toLowerCase()))
      .map((name) => `/uploads/${name}`);
  } catch {
    cachedPaths = [];
    cachedPdfPaths = [];
  }

  cacheExpiresAt = now + 60_000;
  return cachedPaths;
}

export async function getRandomUploadImages(count: number) {
  const pool = await readUploadPool();
  if (pool.length === 0) {
    return [];
  }

  return shuffle(pool).slice(0, Math.max(0, count));
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
    "";

  cachedLogoPath = logoCandidate;
  return logoCandidate;
}

export async function getMenuPdfFallbacks() {
  await readUploadPool();
  if (cachedPdfPaths.length === 0) {
    return { lunchPdf: "", dinnerPdf: "" };
  }

  const lunchPdf =
    cachedPdfPaths.find((item) => /lunch|vecka|vecka|dagens/i.test(item)) ??
    cachedPdfPaths[0] ??
    "";
  const dinnerPdf =
    cachedPdfPaths.find((item) => /kvall|kväll|middag|dinner|evening/i.test(item)) ??
    cachedPdfPaths.find((item) => item !== lunchPdf) ??
    cachedPdfPaths[0] ??
    "";

  return { lunchPdf, dinnerPdf };
}
