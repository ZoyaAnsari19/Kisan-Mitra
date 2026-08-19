import type { MetadataRoute } from "next";

import { defaultLocale, localePath, localeTags, locales } from "@/i18n/config";
import { absoluteLocaleUrl } from "@/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[localeTags[locale]] = absoluteLocaleUrl(localePath(locale));
  }
  languages["x-default"] = absoluteLocaleUrl(localePath(defaultLocale));

  return locales.map((locale) => ({
    url: absoluteLocaleUrl(localePath(locale)),
    changeFrequency: "monthly" as const,
    priority: locale === defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }));
}
