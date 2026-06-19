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

export const metadata: Metadata = {
  title: "Kisan Mitra · The Operating System for Rural India",
  description:
    "Kisan Mitra is an integrated rural ecosystem — empowering 600+ villages with technology, infrastructure, farmer services, leadership and sustainable growth.",
  icons: {
    icon: "/static/favicon.svg",
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
