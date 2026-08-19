export const PRODUCTION_SITE = "https://kisan.kalakar.tv";
export const OG_IMAGE_PATH = "/static/og/kisan-mitra-hero.png";

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_SITE;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

/** Absolute URL for a locale's home page, without a trailing slash. */
export function absoluteLocaleUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  return path === "/" ? base : `${base}${path}`;
}
