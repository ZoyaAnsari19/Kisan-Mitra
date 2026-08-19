import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import {
  DM_Mono,
  Fraunces,
  Inter,
  Mukta,
  Rozha_One,
  Tiro_Devanagari_Hindi,
  Tiro_Devanagari_Marathi,
} from "next/font/google";

import "../globals.css";
import {
  defaultLocale,
  intlLocales,
  isLocale,
  localePath,
  localeTags,
  locales,
  ogLocales,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { OG_IMAGE_PATH, PRODUCTION_SITE, absoluteLocaleUrl, getSiteUrl } from "@/site";

/**
 * Only Inter and Fraunces are preloaded. Both carry the Latin text that appears
 * immediately on *both* locales — brand name, officer codes, prices, digits —
 * so the preload is always spent. Every other face is fetched on demand; see
 * the note on the Devanagari block below.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const hindi = Tiro_Devanagari_Hindi({
  weight: "400",
  subsets: ["devanagari"],
  variable: "--font-hindi",
  display: "swap",
  preload: false,
});

/**
 * Devanagari faces. All three carry `preload: false` on purpose: the font
 * declarations live in this shared layout, so preloading them would push
 * ~200 KB of Devanagari onto English visitors who never render a glyph of it.
 * With preloading off the browser fetches each file only when text actually
 * uses it — which, thanks to the fallbacks below, is exactly on /mr.
 */

/**
 * Marathi writes a handful of Devanagari letters differently from Hindi, so it
 * gets its own accent face rather than reusing the Hindi cut.
 */
const marathi = Tiro_Devanagari_Marathi({
  weight: "400",
  subsets: ["devanagari"],
  variable: "--font-marathi",
  display: "swap",
  preload: false,
});

/**
 * Fraunces has no Devanagari coverage — without this, every Marathi heading
 * would silently fall back to a system serif and the editorial look collapses.
 * Rozha One is the closest high-contrast display Devanagari to Fraunces.
 */
const devanagariDisplay = Rozha_One({
  weight: "400",
  subsets: ["devanagari"],
  variable: "--font-deva-display",
  display: "swap",
  preload: false,
});

/** Body and UI text on the Marathi page — Inter has no Devanagari either. */
const devanagariSans = Mukta({
  weight: ["300", "400", "500", "600"],
  subsets: ["devanagari"],
  variable: "--font-deva-sans",
  display: "swap",
  preload: false,
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  preload: false,
});

const siteUrl = getSiteUrl();
const ogImageUrl = `${PRODUCTION_SITE}${OG_IMAGE_PATH}`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const path = localePath(lang);

  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    icons: {
      icon: "/static/favicon.svg",
    },
    alternates: {
      canonical: path,
      languages: {
        "en-IN": localePath("en"),
        "mr-IN": localePath("mr"),
        "x-default": localePath(defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocales[lang],
      alternateLocale: locales
        .filter((other) => other !== lang)
        .map((other) => ogLocales[other]),
      url: absoluteLocaleUrl(path),
      siteName: dict.meta.siteName,
      title: dict.meta.title,
      description: dict.meta.description,
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 753,
          height: 428,
          alt: dict.meta.ogImageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [ogImageUrl],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={localeTags[lang]}
      data-locale={lang}
      data-intl-locale={intlLocales[lang]}
      className={`${inter.variable} ${fraunces.variable} ${hindi.variable} ${marathi.variable} ${devanagariDisplay.variable} ${devanagariSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"
          rel="stylesheet"
        />
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body className="bg-ivory text-forest font-sans antialiased selection:bg-clay selection:text-forest">
        {children}
        <Script
          id="lenis"
          src="https://cdn.jsdelivr.net/npm/lenis@1.0.42/dist/lenis.min.js"
          strategy="afterInteractive"
        />
        <Script id="app-js" src="/static/app.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
