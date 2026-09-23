/**
 * Structural data — status/links/icons per app, keyed to the `id`s in the
 * `apps.items` dictionary entries. Kept out of the dictionary so translators
 * never touch it; flip `status` to "live" and fill `downloadUrl` once an app
 * ships, no other change needed.
 */
export const APP_ICONS: Record<string, string> = {
  "kisan-mitra": "fa-tractor",
  "machinery-rental": "fa-screwdriver-wrench",
  logistics: "fa-truck-fast",
  storage: "fa-warehouse",
  mandi: "fa-store",
};

export type AppMeta = {
  id: string;
  status: "live" | "coming-soon";
  downloadUrl?: { android?: string; ios?: string };
};

export const APPS_META: AppMeta[] = [
  {
    id: "kisan-mitra",
    status: "live",
    downloadUrl: {
      // Hosted as a GitHub Release asset — the file is ~112MB, over Vercel's
      // static-asset size limit, so it can't live in public/ like the rest
      // of this site's images do.
      android: "https://github.com/ZoyaAnsari19/Kisan-Mitra/releases/download/apk-kisan-mitra-v1/kisan-mitra.apk",
    },
  },
  { id: "machinery-rental", status: "coming-soon" },
  { id: "logistics", status: "coming-soon" },
  { id: "storage", status: "coming-soon" },
  { id: "mandi", status: "coming-soon" },
];

export const PLACEHOLDER_IMG = "/static/apps/placeholder.jpg";

/** Card visual for each app on the /apps grid — cutout-style product photo, not a screenshot. */
export const CARD_IMG: Record<string, string> = {
  "kisan-mitra": "/static/apps/card-kisan-mitra.png",
  "machinery-rental": "/static/apps/card-machinery-rental.png",
  logistics: "/static/apps/card-logistics.png",
  storage: "/static/apps/card-storage.png",
  mandi: "/static/apps/card-mandi.png",
};

/**
 * Screenshot gallery per app, keyed by id. Apps without their own screenshots
 * yet fall back to the shared placeholder — add real entries here as they're
 * supplied, no other change needed.
 */
export const GALLERY_IMAGES: Record<string, string[]> = {
  "kisan-mitra": [
    "/static/apps/gallery-kisan-mitra-1.png",
    "/static/apps/gallery-kisan-mitra-2.png",
    "/static/apps/gallery-kisan-mitra-3.png",
    "/static/apps/gallery-kisan-mitra-4.png",
  ],
  "machinery-rental": [PLACEHOLDER_IMG],
  logistics: [PLACEHOLDER_IMG],
  storage: [PLACEHOLDER_IMG],
  mandi: [PLACEHOLDER_IMG],
};

/**
 * Full-bleed hero banner for each app's detail page. All 5 apps share the
 * same placeholder for now — swap individual entries once per-app banners
 * are supplied, no other change needed.
 */
const DETAIL_HERO_PLACEHOLDER = "/static/apps/detail-hero.jpg";
export const DETAIL_HERO_IMG: Record<string, string> = {
  "kisan-mitra": DETAIL_HERO_PLACEHOLDER,
  "machinery-rental": DETAIL_HERO_PLACEHOLDER,
  logistics: DETAIL_HERO_PLACEHOLDER,
  storage: DETAIL_HERO_PLACEHOLDER,
  mandi: DETAIL_HERO_PLACEHOLDER,
};

/**
 * Floating phone mockup that overlaps the hero/about boundary on the detail
 * page. All 5 apps share the same placeholder for now — swap per app once
 * real mockups are supplied.
 */
const DETAIL_PHONE_PLACEHOLDER = "/static/apps/detail-phone-mockup.png";
export const DETAIL_PHONE_IMG: Record<string, string> = {
  "kisan-mitra": DETAIL_PHONE_PLACEHOLDER,
  "machinery-rental": DETAIL_PHONE_PLACEHOLDER,
  logistics: DETAIL_PHONE_PLACEHOLDER,
  storage: DETAIL_PHONE_PLACEHOLDER,
  mandi: DETAIL_PHONE_PLACEHOLDER,
};
