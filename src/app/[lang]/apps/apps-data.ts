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
  "supermart-pos": "fa-cash-register",
  "doctor-provider": "fa-user-doctor",
  "labor-provider": "fa-people-carry-box",
  "staff-app": "fa-id-badge",
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
      android: "https://api.rkf.co.in/downloads/kisan-mitra-app.apk",
    },
  },
  {
    id: "machinery-rental",
    status: "live",
    downloadUrl: {
      android: "https://api.rkf.co.in/downloads/machinery-rental-app.apk",
    },
  },
  {
    id: "logistics",
    status: "live",
    downloadUrl: {
      android: "https://api.rkf.co.in/downloads/logistic-transporter-app.apk",
    },
  },
  {
    id: "storage",
    status: "coming-soon",
    downloadUrl: {
      android: "https://api.rkf.co.in/downloads/storage-provider-app.apk",
    },
  },
  {
    id: "mandi",
    status: "live",
    downloadUrl: {
      android: "https://api.rkf.co.in/downloads/mandi-buyer-app.apk",
    },
  },
  {
    id: "labor-provider",
    status: "coming-soon",
    downloadUrl: {
      android: "https://api.rkf.co.in/downloads/man-power-app.apk",
    },
  },
];

export const PLACEHOLDER_IMG = "/static/apps/placeholder.jpg";

/** Card visual for each app on the /apps grid — cutout-style product photo, not a screenshot. */
export const CARD_IMG: Record<string, string> = {
  "kisan-mitra": "/static/apps/kisan-mitra/list-card.png",
  "machinery-rental": "/static/apps/machinery-rental/list-card.png",
  logistics: "/static/apps/logistics/list-card.png",
  storage: "/static/apps/storage/list-card.png",
  mandi: "/static/apps/mandi/list-card.png",
  "labor-provider": "/static/apps/labor-provider/list-card.png",
  "supermart-pos": PLACEHOLDER_IMG,
  "doctor-provider": PLACEHOLDER_IMG,
  "staff-app": PLACEHOLDER_IMG,
};

/**
 * Screenshot gallery per app, keyed by id. Apps without their own screenshots
 * yet fall back to the shared placeholder — add real entries here as they're
 * supplied, no other change needed.
 */
export const GALLERY_IMAGES: Record<string, string[]> = {
  "kisan-mitra": [
    "/static/apps/kisan-mitra/gallery/1.png",
    "/static/apps/kisan-mitra/gallery/2.png",
    "/static/apps/kisan-mitra/gallery/3.png",
    "/static/apps/kisan-mitra/gallery/4.png",
  ],
  "machinery-rental": [
    "/static/apps/machinery-rental/gallery/1.png",
    "/static/apps/machinery-rental/gallery/2.png",
    "/static/apps/machinery-rental/gallery/3.png",
    "/static/apps/machinery-rental/gallery/4.png",
  ],
  logistics: [
    "/static/apps/logistics/gallery/1.png",
    "/static/apps/logistics/gallery/2.png",
    "/static/apps/logistics/gallery/3.png",
  ],
  storage: [
    "/static/apps/storage/gallery/1.png",
    "/static/apps/storage/gallery/2.png",
    "/static/apps/storage/gallery/3.png",
  ],
  mandi: [
    "/static/apps/mandi/gallery/1.png",
    "/static/apps/mandi/gallery/2.png",
    "/static/apps/mandi/gallery/3.png",
    "/static/apps/mandi/gallery/4.png",
  ],
  "labor-provider": [
    "/static/apps/labor-provider/gallery/1.png",
    "/static/apps/labor-provider/gallery/2.png",
    "/static/apps/labor-provider/gallery/3.png",
  ],
};

/** Full-bleed hero banner for each app's detail page. */
export const DETAIL_HERO_IMG: Record<string, string> = {
  "kisan-mitra": "/static/apps/kisan-mitra/hero.jpg",
  "machinery-rental": "/static/apps/machinery-rental/hero.png",
  logistics: "/static/apps/logistics/hero.png",
  storage: "/static/apps/storage/hero.png",
  mandi: "/static/apps/mandi/hero.png",
  "labor-provider": "/static/apps/labor-provider/hero.png",
};

/**
 * Floating phone mockup that overlaps the hero/about boundary on the detail
 * page. `null` means the app has no mockup yet — the detail page hides the
 * floating image entirely for that app instead of falling back to a
 * placeholder.
 */
export const DETAIL_PHONE_IMG: Record<string, string | null> = {
  "kisan-mitra": "/static/apps/kisan-mitra/phone.png",
  "machinery-rental": null,
  logistics: "/static/apps/logistics/phone.png",
  storage: null,
  mandi: "/static/apps/mandi/phone.png",
  "labor-provider": null,
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
