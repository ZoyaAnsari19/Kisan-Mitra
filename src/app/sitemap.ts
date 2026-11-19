import type { MetadataRoute } from "next";

import { defaultLocale, localePath, localeTags, locales } from "@/i18n/config";
import { absoluteLocaleUrl } from "@/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[localeTags[locale]] = absoluteLocaleUrl(localePath(locale));
  }
  languages["x-default"] = absoluteLocaleUrl(localePath(defaultLocale));

  const pages = locales.map((locale) => ({
    url: absoluteLocaleUrl(localePath(locale)),
    changeFrequency: "monthly" as const,
    priority: locale === defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }));

  // English-only legal pages: no `alternates`, there is no translation to point to.
  const legal = [
    "/apps/kisan-mitra/privacy-policy",
    "/apps/logistics/privacy-policy",
    "/apps/machinery/privacy-policy",
    "/apps/kisan-mitra/delete-account",
    "/apps/logistics/delete-account",
    "/apps/machinery/delete-account",
  ].map((path) => ({
    url: absoluteLocaleUrl(path),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...pages, ...legal];
}
