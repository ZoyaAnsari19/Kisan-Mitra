import type { Metadata } from "next";
import Script from "next/script";
import { DM_Mono, Fraunces, Inter } from "next/font/google";
import { Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

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
  subsets: ["devanagari", "latin"],
  variable: "--font-hindi",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

const PRODUCTION_SITE = "https://kisan.kalakar.tv";
const OG_IMAGE_PATH = "/static/og/kisan-mitra-hero.png";

function getSiteUrl(): string {
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

const siteUrl = getSiteUrl();
const siteTitle = "Kisan Mitra · The Operating System for Rural India";
const siteDescription =
  "किसान मित्र भारत का ग्रामीण ऑपरेटिंग सिस्टम है — गाँवों को तकनीक, बुनियादी ढांचे, किसान सेवाओं, नेतृत्व और सतत विकास से जोड़ने वाला एकीकृत पारिस्थितिकी तंत्र।";
const ogImageUrl = `${PRODUCTION_SITE}${OG_IMAGE_PATH}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: "/static/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "hi_IN",
    alternateLocale: "en_IN",
    url: siteUrl,
    siteName: "Kisan Mitra · Rural OS",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 753,
        height: 428,
        alt: "Kisan Mitra — किसान की सेवा, दरवाज़े तक",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${hindi.variable} ${dmMono.variable}`}
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
        <Script
          id="app-js"
          src="/static/app.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
