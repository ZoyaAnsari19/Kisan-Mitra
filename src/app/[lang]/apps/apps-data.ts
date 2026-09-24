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
  { id: "machinery-rental", status: "live" },
  { id: "logistics", status: "live" },
  { id: "storage", status: "live" },
  { id: "mandi", status: "live" },
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
  logistics: [
    "/static/apps/gallery-logistics-1.png",
    "/static/apps/gallery-logistics-2.png",
    "/static/apps/gallery-logistics-3.png",
  ],
  storage: [
    "/static/apps/gallery-storage-1.png",
    "/static/apps/gallery-storage-2.png",
    "/static/apps/gallery-storage-3.png",
  ],
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
  "machinery-rental": "/static/apps/detail-hero-machinery-rental.png",
  logistics: "/static/apps/detail-hero-logistics.png",
  storage: "/static/apps/detail-hero-storage.png",
  mandi: "/static/apps/detail-hero-mandi.png",
};

/**
 * Floating phone mockup that overlaps the hero/about boundary on the detail
 * page. `null` means the app has no mockup yet — the detail page hides the
 * floating image entirely for that app instead of falling back to a
 * placeholder.
 */
const DETAIL_PHONE_PLACEHOLDER = "/static/apps/detail-phone-mockup.png";
export const DETAIL_PHONE_IMG: Record<string, string | null> = {
  "kisan-mitra": DETAIL_PHONE_PLACEHOLDER,
  "machinery-rental": null,
  logistics: "/static/apps/detail-phone-logistics.png",
  storage: null,
  mandi: "/static/apps/detail-phone-mandi.png",
};

/**
 * Which side the floating phone mockup docks to. Defaults to "right" (the
 * original layout); apps can override to "left" when their mockup art was
 * composed to sit on the opposite side.
 */
export const DETAIL_PHONE_SIDE: Record<string, "left" | "right"> = {
  mandi: "left",
};

/**
 * How far the floating phone mockup dips below the hero into the About
 * section. Defaults to "-bottom-24"; apps can override to sit lower (more
 * of the phone shown against the About section) when their mockup was
 * composed for that framing.
 */
export const DETAIL_PHONE_OFFSET: Record<string, string> = {};

/**
 * Apps whose hero banner needs a left-to-mid white fade so light copy stays
 * readable over the photo, fully transparent past the midpoint.
 */
export const DETAIL_HERO_LEFT_FADE = new Set(["mandi"]);
