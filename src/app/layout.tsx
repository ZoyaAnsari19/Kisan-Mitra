import type { Metadata } from "next";
import Script from "next/script";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&family=Tiro+Devanagari+Hindi:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"
          rel="stylesheet"
        />
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body className="bg-ivory text-forest font-sans antialiased selection:bg-clay selection:text-forest">
        <Script
          id="tailwind-cdn"
          src="https://cdn.tailwindcss.com"
          strategy="beforeInteractive"
        />
        <Script
          id="tailwind-config"
          src="/static/tailwind.config.js"
          strategy="beforeInteractive"
        />
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
