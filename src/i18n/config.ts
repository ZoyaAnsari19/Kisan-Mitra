/**
 * Locale configuration.
 *
 * URL strategy: the default locale (`en`) is served UNPREFIXED at `/`, every
 * other locale lives under its own prefix (`/mr`). This keeps the already
 * indexed `https://kisan.kalakar.tv/` canonical instead of pushing it behind a
 * redirect.
 *
 * Keep this file free of server-only imports — `proxy.ts` runs on the edge and
 * imports from here.
 */

export const locales = ["en", "mr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie the proxy reads/writes to remember an explicit language choice. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Label shown in the language switcher — always in the target language. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  mr: "मराठी",
};

/** Short label for the compact (mobile) switcher. */
export const localeShortNames: Record<Locale, string> = {
  en: "EN",
  mr: "मरा",
};

/** Value for the `lang` attribute and `hreflang`. */
export const localeTags: Record<Locale, string> = {
  en: "en-IN",
  mr: "mr-IN",
};

/** Value for `og:locale`. */
export const ogLocales: Record<Locale, string> = {
  en: "en_IN",
  mr: "mr_IN",
};

/**
 * BCP-47 tag used for `Intl` number/date formatting.
 *
 * `mr` carries the `-u-nu-latn` extension on purpose: CLDR's default numbering
 * system for Marathi is Devanagari, which would render the impact counters as
 * १८४,२५० instead of 184,250. Month and weekday names still come out in
 * Marathi — only the digits stay Latin.
 */
export const intlLocales: Record<Locale, string> = {
  en: "en-IN",
  mr: "mr-IN-u-nu-latn",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Public URL path for a locale.
 * `en` → "/" (unprefixed), everything else → "/<locale>".
 */
export function localePath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}`;
}

/**
 * Href used by the language switcher. Always the prefixed form — even for the
 * default locale, whose `/en` URL the proxy turns into a redirect to `/` that
 * also pins the language cookie. Linking straight to `/` instead would bounce
 * a reader with a Marathi cookie right back to `/mr`.
 */
export function localeSwitchHref(locale: Locale): string {
  return `/${locale}`;
}
