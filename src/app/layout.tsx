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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kisan Mitra | Building the future operating system for Rural India",
  description:
    "An integrated ecosystem empowering Indian villages with technology, infrastructure, and farmer services — designed with the dignity of Bharat at its heart.",
  icons: {
    icon: "/static/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Kisan Mitra · Rural OS",
    title: "Kisan Mitra | Building the future operating system for Rural India",
    description:
      "An integrated ecosystem empowering Indian villages with technology, infrastructure, and farmer services — designed with the dignity of Bharat at its heart.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1024,
        height: 547,
        alt: "Kisan Mitra — Building the future operating system for Rural India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kisan Mitra | Building the future operating system for Rural India",
    description:
      "An integrated ecosystem empowering Indian villages with technology, infrastructure, and farmer services — designed with the dignity of Bharat at its heart.",
    images: ["/og-image.jpg"],
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
