import { NextResponse, type NextRequest } from "next/server";

import {
  LOCALE_COOKIE,
  defaultLocale,
  isLocale,
  locales,
  type Locale,
} from "@/i18n/config";

/**
 * Locale routing.
 *
 *   /            → English, rendered from `app/[lang]` with lang="en" (rewrite,
 *                  so the canonical URL that Google already indexed is unchanged)
 *   /en          → 307 to `/`, so English is never reachable at two URLs
 *   /mr          → Marathi, served as-is
 *
 * Visiting either language also stores the choice in a cookie, which is what
 * makes the (JS-free) language switcher stick: its "English" link points at
 * `/en`, and the redirect above both clears the Marathi preference and lands
 * the reader on the canonical `/`.
 */

/** Set false to always serve English at `/` regardless of browser language. */
const AUTO_DETECT_FROM_BROWSER = true;

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const config = {
  // Skip Next internals, the static asset folder, and anything with a file
  // extension (favicon.svg, og images, style.css, app.js …).
  matcher: ["/((?!_next|static|api|.*\\..*).*)"],
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";

  // A non-default locale prefix — serve it and remember the choice.
  if (isLocale(firstSegment) && firstSegment !== defaultLocale) {
    const response = NextResponse.next();
    rememberLocale(response, firstSegment);
    return response;
  }

  // `/en...` is not canonical — strip the prefix and pin English.
  if (firstSegment === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    const response = NextResponse.redirect(url, 307);
    rememberLocale(response, defaultLocale);
    return response;
  }

  // Unprefixed path. Either send the reader to their preferred locale, or
  // render the default one in place.
  const preferred = resolvePreferredLocale(request);

  if (preferred !== defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url, 307);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

function rememberLocale(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
}

function resolvePreferredLocale(request: NextRequest): Locale {
  const stored = request.cookies.get(LOCALE_COOKIE)?.value;
  if (stored && isLocale(stored)) return stored;

  if (!AUTO_DETECT_FROM_BROWSER) return defaultLocale;

  // Only guess for a real browser navigation. Crawlers, prefetches and asset
  // requests don't send `Sec-Fetch-Mode: navigate`, so they always receive the
  // canonical English page — no redirect surprises in search results.
  if (request.headers.get("sec-fetch-mode") !== "navigate") return defaultLocale;

  return matchAcceptLanguage(request.headers.get("accept-language"));
}

/**
 * Minimal `Accept-Language` negotiation. With two locales this is all the
 * matching we need — no `negotiator` / `intl-localematcher` dependency.
 */
function matchAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((entry) => {
      const [tag, ...params] = entry.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const quality = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      return {
        tag: tag.trim().toLowerCase(),
        quality: Number.isNaN(quality) ? 0 : quality,
      };
    })
    .filter((entry) => entry.tag && entry.quality > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    const match = locales.find((locale) => locale === base);
    if (match) return match;
  }

  return defaultLocale;
}
