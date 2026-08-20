export const PRODUCTION_SITE = "https://kisan.kalakar.tv";

/**
 * Open Graph / Twitter card image.
 *
 * 1200x630 JPEG at ~145 KB. Both numbers matter:
 *  - 1200x630 is the 1.91:1 size Facebook, LinkedIn and X render as a large
 *    card; smaller images get demoted to a thumbnail.
 *  - WhatsApp silently drops link-preview images over roughly 300 KB, which is
 *    why this is a JPEG and not the 575 KB PNG it was generated from.
 *
 * The filename is versioned rather than overwritten: `vercel.json` serves
 * everything under /static/og/ as `immutable`, so a replaced file would keep
 * serving the old bytes to CDNs and social scrapers indefinitely.
 */
export const OG_IMAGE = {
  path: "/static/og/kisan-mitra-og.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "A Kisan Mitra field officer showing crop data to a farming family in their village",
} as const;

/**
 * Copy for link previews — WhatsApp, LinkedIn, X, Slack.
 *
 * Deliberately English for EVERY locale, including /mr. A shared link travels
 * to a mixed audience, so the card stays in one language no matter which URL
 * was copied. The on-page `<meta name="description">` is still localised, so
 * Marathi search results keep their Marathi snippet.
 */
export const SHARE = {
  title: "Kisan Mitra · The Operating System for Rural India",
  description:
    "India's rural operating system — connecting villages with technology, infrastructure, farmer services and leadership.",
} as const;

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

/**
 * Always absolute and always production: scrapers fetch this URL from their own
 * servers, so a localhost or preview host would give them nothing to render.
 */
export const ogImageUrl = `${PRODUCTION_SITE}${OG_IMAGE.path}`;
