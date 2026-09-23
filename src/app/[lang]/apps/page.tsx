import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { defaultLocale, isLocale, localePath, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { absoluteLocaleUrl, getSiteUrl } from "@/site";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { APPS_META, APP_ICONS, CARD_IMG } from "./apps-data";
import { AppCard } from "./AppCard";

/**
 * Card background tints — cycled per app so the grid reads as one cohesive
 * system with subtle variation, the way the reference layout alternates soft
 * pastel cards. Kept as structural data, not dictionary content.
 */
const CARD_TINTS = [
  "bg-olive/10",
  "bg-clay/25",
  "bg-dusty/15",
  "bg-sand/25",
  "bg-gold/10",
];

const siteUrl = getSiteUrl();

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

  const d = getDictionary(lang);
  const path = `${localePath(lang) === "/" ? "" : localePath(lang)}/apps`;

  return {
    metadataBase: new URL(siteUrl),
    title: d.apps.meta.title,
    description: d.apps.meta.description,
    alternates: {
      canonical: path,
      languages: {
        "en-IN": "/apps",
        "mr-IN": "/mr/apps",
        "x-default": defaultLocale === "en" ? "/apps" : "/mr/apps",
      },
    },
    openGraph: {
      type: "website",
      url: absoluteLocaleUrl(path),
      title: d.apps.meta.title,
      description: d.apps.meta.description,
    },
  };
}

export default async function AppsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const d = getDictionary(lang);
  const home = localePath(lang);
  const appsBase = `${home === "/" ? "" : home}/apps`;

  const STATS = [
    { v: d.apps.statAppsValue, l: d.apps.statAppsLabel },
    { v: d.apps.statServicesValue, l: d.apps.statServicesLabel },
    { v: d.apps.statLanguagesValue, l: d.apps.statLanguagesLabel },
    { v: d.apps.statFoundationValue, l: d.apps.statFoundationLabel },
  ];

  // Display order for the grid — reordered for visual presentation while
  // leaving the underlying dictionary/data order untouched.
  const GRID_ORDER = ["kisan-mitra", "logistics", "storage", "mandi", "machinery-rental"];
  const gridItems = GRID_ORDER.map((id) => d.apps.items.find((a) => a.id === id)!);

  return (
    <>
      <Header lang={lang} d={d} />

      {/* ============ HERO — full-bleed background, header + copy overlaid ============ */}
      {/* Small/medium screens: fixed min-h sized for the text content, same
          as before. Very wide screens (≥1536px): the section's width can
          exceed the source photo's own ~2.4:1 ratio, which forces
          object-cover to crop in tight and "zoom" the farmer's face — so
          above that breakpoint min-h scales with viewport width instead,
          keeping the crop proportional to the photo. */}
      <section className="relative overflow-hidden bg-ivory-grad sm:min-h-[620px] md:min-h-[680px] 2xl:min-h-[42vw]">
        {/* Banner hidden on mobile — the photo's important detail gets too
            cropped at narrow widths to read well, so small screens get a
            plain background instead. */}
        <img
          src="/static/apps/hero-bg.jpg"
          alt={d.alt.appPreview}
          className="hidden sm:block absolute inset-0 w-full h-full object-cover object-bottom"
        />

        <div className="relative mx-auto max-w-[1480px] px-6 md:px-10 pt-32 sm:pt-40 pb-14 sm:pb-16 w-full">
          <div className="max-w-xl">
            <div className="kicker"><span className="dot"></span>{d.apps.kicker}</div>
            <h1 className="reveal font-serif text-mega text-forest mt-6">
              {d.apps.title}
              <span className="block italic font-light text-brown">{d.apps.titleAccent}</span>
            </h1>
            <p className="reveal reveal-delay-1 mt-6 text-[17px] text-forest/70 leading-relaxed">
              {d.apps.heroSubtitle}
              <br />
              {d.apps.body}
            </p>

            <div className="reveal reveal-delay-2 mt-9 flex flex-wrap items-center gap-4">
              <a href="#app-grid" className="btn-primary">
                {d.apps.exploreApps} <span className="arrow">→</span>
              </a>
              <a href="#app-grid" className="btn-ghost">
                {d.apps.watchVideo}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMPACT STATS STRIP ============ */}
      <section className="relative bg-ivory border-y border-forest/10">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.l} className="text-center md:text-left">
              <div className="font-serif text-2xl sm:text-3xl text-forest">{s.v}</div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-brown mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ APP GRID ============ */}
      <section id="app-grid" className="relative bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {gridItems.map((app, i) => {
              const meta = APPS_META.find((m) => m.id === app.id)!;
              const isMain = app.id === "kisan-mitra";
              return (
                <AppCard
                  key={app.id}
                  href={`${appsBase}/${app.id}`}
                  status={meta.status}
                  comingSoonLabel={d.apps.comingSoonBadge}
                  className={`group relative rounded-[2rem] p-6 sm:p-7 h-full flex gap-5 items-start lift ${CARD_TINTS[i % CARD_TINTS.length]}`}
                >
                  <span className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-ivory/70 flex items-center justify-center text-forest/60 group-hover:text-forest transition-colors shrink-0">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                  </span>

                  {/* Image — no background/border, just the cutout art */}
                  <div className="relative w-28 sm:w-32 shrink-0 self-stretch min-h-[220px] rounded-2xl overflow-hidden">
                    <img
                      src={CARD_IMG[app.id]}
                      alt={app.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1 flex flex-col h-full">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg bg-ivory border border-forest/10 flex items-center justify-center shrink-0">
                        <i className={`fa-solid ${APP_ICONS[app.id]} text-forest text-sm`}></i>
                      </span>
                      <h2 className="font-serif text-xl text-forest min-w-0 leading-tight">{app.name}</h2>
                    </div>
                    {isMain && (
                      <span className="stamp border-forest/25 bg-ivory/90 text-forest/70 mt-2 w-fit">
                        {d.apps.badgeMainApp}
                      </span>
                    )}

                    <div className="text-[13px] text-forest/55 mt-2">{app.for}</div>

                    <p className="mt-3 text-[14px] text-forest/65 leading-relaxed line-clamp-3 flex-1">
                      {app.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-forest text-sm font-medium">{d.apps.viewMore}</span>
                        <span className="w-7 h-7 rounded-full bg-ivory flex items-center justify-center text-forest shrink-0 group-hover:bg-forest group-hover:text-ivory transition-colors">
                          <i className="fa-solid fa-arrow-right text-[10px]"></i>
                        </span>
                      </div>
                      {meta.status === "coming-soon" && (
                        <span
                          className="flex items-center gap-1.5 rounded-full bg-forest pl-3 pr-2.5 py-1.5 text-ivory shrink-0"
                          title={d.apps.comingSoonBadge}
                        >
                          <span className="text-[11px] font-medium whitespace-nowrap">{d.apps.downloadNow}</span>
                          <span className="w-5 h-5 rounded-full bg-ivory/20 flex items-center justify-center shrink-0">
                            <i className="fa-solid fa-arrow-down text-[9px]"></i>
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </AppCard>
              );
            })}

            {/* Ecosystem message panel — fills the 6th grid slot alongside the app cards */}
            <div className="relative rounded-[2rem] p-7 sm:p-8 flex flex-col justify-center bg-forest text-ivory overflow-hidden grain">
              <div className="kicker kicker-gold"><span className="dot"></span>{d.apps.panelKicker}</div>
              <h2 className="font-serif text-2xl mt-3 leading-tight">
                {d.apps.panelTitle}
                <span className="block italic font-light text-clay">{d.apps.panelTitleAccent}</span>
              </h2>
              <p className="mt-4 text-ivory/70 text-[14.5px] leading-relaxed">{d.apps.panelBody}</p>
              <a href="#app-grid" className="mt-6 inline-flex items-center gap-2 text-clay text-sm hover:text-ivory transition w-fit">
                {d.apps.panelCta} <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA BANNER ============ */}
      <section className="relative bg-ivory pb-20 md:pb-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <div className="rounded-[2rem] bg-sand-grad px-7 sm:px-10 py-8 sm:py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-forest">{d.apps.ctaBannerTitle}</h2>
              <p className="mt-2 text-forest/65 text-[14.5px] max-w-lg">{d.apps.ctaBannerBody}</p>
            </div>
            <a href={`${appsBase}/kisan-mitra`} className="btn-primary shrink-0">
              {d.apps.download} <span className="arrow">↓</span>
            </a>
          </div>
        </div>
      </section>

      <Footer lang={lang} d={d} />
    </>
  );
}
