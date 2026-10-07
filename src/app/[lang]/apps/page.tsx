import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { defaultLocale, isLocale, localePath, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { absoluteLocaleUrl, getSiteUrl } from "@/site";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { APPS_META, APP_ICONS, CARD_IMG } from "./apps-data";
import { AppCard } from "./AppCard";
import { GridDownloadLink } from "./GridDownloadLink";

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

type CardItem = { id: string; name: string; for: string; description: string };

/**
 * Renders one app card. Whether the card navigates to a detail page and
 * whether its download is available are independent: an app can be fully
 * browsable (hasDetailPage) while its APK is still "coming soon" (status).
 * Used both by the partner-apps grid (apps with a real detail page) and by
 * the always-coming-soon items (SuperMart POS, doctor provider) that have no
 * detail page at all — those pass `hasDetailPage={false}`.
 */
function AppGridCard({
  app,
  href,
  hasDetailPage,
  status,
  downloadUrl,
  tint,
  isMain,
  mainAppLabel,
  comingSoonLabel,
  viewMoreLabel,
  downloadNowLabel,
}: {
  app: CardItem;
  href: string;
  hasDetailPage: boolean;
  status: "live" | "coming-soon";
  downloadUrl?: string;
  tint: string;
  isMain: boolean;
  mainAppLabel: string;
  comingSoonLabel: string;
  viewMoreLabel: string;
  downloadNowLabel: string;
}) {
  return (
    <AppCard
      href={href}
      hasDetailPage={hasDetailPage}
      comingSoonLabel={comingSoonLabel}
      className={`group relative rounded-4xl p-6 sm:p-7 h-full flex gap-5 items-start lift ${tint}`}
    >
      {/* Image — no background/border, just the cutout art. Apps without a
          detail page show the label in place of a screenshot rather than a
          real or placeholder image, since there's nothing real to show yet. */}
      <div className="relative w-28 sm:w-32 shrink-0 self-stretch min-h-55 rounded-2xl overflow-hidden">
        {!hasDetailPage ?
          <div className="w-full h-full bg-forest/90 flex items-center justify-center p-2 text-center">
            <span className="text-ivory text-[11px] font-medium tracking-[0.08em] uppercase">
              {comingSoonLabel}
            </span>
          </div>
        : <Image
            src={CARD_IMG[app.id]}
            alt={app.name}
            fill
            sizes="(min-width: 640px) 128px, 112px"
            className="object-cover object-top"
          />
        }
      </div>

      <div className="min-w-0 flex-1 flex flex-col h-full">
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex w-9 h-9 rounded-lg bg-ivory border border-forest/10 items-center justify-center shrink-0">
            <i className={`fa-solid ${APP_ICONS[app.id]} text-forest text-sm`}></i>
          </span>
          <h2 className="font-serif text-xl text-forest min-w-0 leading-tight">{app.name}</h2>
        </div>
        {isMain && (
          <span className="stamp border-forest/25 bg-ivory/90 text-forest/70 mt-2 w-fit">
            {mainAppLabel}
          </span>
        )}

        <div className="text-[13px] text-forest/55 mt-2">{app.for}</div>

        <p className="mt-3 text-[14px] text-forest/65 leading-relaxed line-clamp-3 flex-1">
          {app.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-forest text-sm font-medium">{viewMoreLabel}</span>
            <span className="w-7 h-7 rounded-full bg-ivory flex items-center justify-center text-forest shrink-0 group-hover:bg-forest group-hover:text-ivory transition-colors">
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </span>
          </div>
          {status === "live" && downloadUrl ?
            <GridDownloadLink
              href={downloadUrl}
              label={downloadNowLabel}
              title={downloadNowLabel}
              className="hidden sm:flex items-center gap-1.5 rounded-full bg-forest pl-3 pr-2.5 py-1.5 text-ivory shrink-0 hover:bg-forest-soft transition-colors"
            />
          : status === "coming-soon" && (
              <span
                className="hidden sm:flex items-center rounded-full bg-forest pl-3 pr-3 py-1.5 text-ivory shrink-0"
                title={comingSoonLabel}
              >
                <span className="text-[11px] font-medium whitespace-nowrap">{comingSoonLabel}</span>
              </span>
            )
          }
        </div>
      </div>
    </AppCard>
  );
}

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
  // leaving the underlying dictionary/data order untouched. Every app here
  // now has a real detail page; some (storage, labor-provider, supermart-pos,
  // doctor-provider) just have their download still marked coming-soon in
  // APPS_META, which only affects the download button, not the card's
  // ability to navigate to the detail page.
  const GRID_ORDER = [
    "kisan-mitra",
    "logistics",
    "machinery-rental",
    "mandi",
    "storage",
    "labor-provider",
    "supermart-pos",
    "doctor-provider",
  ];
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
      <section className="relative overflow-hidden bg-ivory-grad sm:min-h-155 md:min-h-170 2xl:min-h-[42vw]">
        {/* Banner hidden on mobile — the photo's important detail gets too
            cropped at narrow widths to read well, so small screens get a
            plain background instead. */}
        <Image
          src="/static/apps/hero-bg.jpg"
          alt={d.alt.appPreview}
          fill
          priority
          sizes="100vw"
          className="hidden sm:block object-cover object-bottom"
        />

        <div className="relative mx-auto max-w-370 px-6 md:px-10 pt-32 sm:pt-40 pb-14 sm:pb-16 w-full">
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

            <div className="reveal reveal-delay-2 mt-9 flex items-center gap-3 sm:gap-4">
              <a href="#app-grid" className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3">
                {d.apps.exploreApps} <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMPACT STATS STRIP ============ */}
      <section className="relative bg-ivory border-y border-forest/10">
        <div className="mx-auto max-w-370 px-6 md:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.l} className="text-center md:text-left">
              <div className="font-serif text-2xl sm:text-3xl text-forest">{s.v}</div>
              <div className="text-[11px] tracking-wide-lux uppercase text-brown mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ APP GRID ============ */}
      <section id="app-grid" className="relative bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-370 px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {gridItems.map((app, i) => {
              const meta = APPS_META.find((m) => m.id === app.id)!;
              return (
                <AppGridCard
                  key={app.id}
                  app={app}
                  href={`${appsBase}/${app.id}`}
                  hasDetailPage
                  status={meta.status}
                  downloadUrl={meta.downloadUrl?.android}
                  tint={CARD_TINTS[i % CARD_TINTS.length]}
                  isMain={app.id === "kisan-mitra"}
                  mainAppLabel={d.apps.badgeMainApp}
                  comingSoonLabel={d.apps.comingSoonBadge}
                  viewMoreLabel={d.apps.viewMore}
                  downloadNowLabel={d.apps.downloadNow}
                />
              );
            })}
          </div>

          {/* ---- Field Operations Apps — RKF's own internal apps. One
              unified panel (heading + app, no separate inner card) rather
              than the partner-apps grid pattern above. ---- */}
          <div className="mt-20 md:mt-28 rounded-4xl bg-sand/25 p-8 sm:p-12">
            <div className="text-center">
              <div className="kicker"><span className="dot"></span>{d.apps.fieldOpsLabel}</div>
              <h2 className="font-serif text-3xl sm:text-4xl text-forest mt-4">{d.apps.fieldOpsTitle}</h2>
              <p className="mt-4 text-forest/70 text-[15px] leading-relaxed">{d.apps.fieldOpsSubtitle}</p>
            </div>

            {(() => {
              const staffApp = d.apps.items.find((a) => a.id === "staff-app")!;
              const staffMeta = APPS_META.find((m) => m.id === "staff-app")!;
              return (
                <AppCard
                  href={`${appsBase}/staff-app`}
                  hasDetailPage
                  comingSoonLabel={d.apps.comingSoonBadge}
                  className="mt-10 mx-auto max-w-3xl rounded-4xl bg-white p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start cursor-pointer"
                >
                  <div className="relative w-full sm:w-40 md:w-32 lg:w-40 shrink-0 h-40 sm:h-auto sm:self-stretch sm:min-h-55 rounded-2xl overflow-hidden">
                    <Image
                      src={CARD_IMG["staff-app"]}
                      alt={staffApp.name}
                      fill
                      sizes="(min-width: 768px) 160px, 100vw"
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="hidden sm:flex w-9 h-9 rounded-lg bg-ivory border border-forest/10 items-center justify-center shrink-0">
                        <i className={`fa-solid ${APP_ICONS["staff-app"]} text-forest text-sm`}></i>
                      </span>
                      <h3 className="font-serif text-xl text-forest min-w-0 leading-tight">{staffApp.name}</h3>
                    </div>

                    <div className="text-[13px] text-forest/55 mt-2">{staffApp.for}</div>

                    <p className="mt-3 text-[14px] text-forest/65 leading-relaxed">{staffApp.description}</p>

                    <div className="mt-6 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-forest text-sm font-medium">{d.apps.viewMore}</span>
                        <span className="w-7 h-7 rounded-full bg-ivory flex items-center justify-center text-forest shrink-0">
                          <i className="fa-solid fa-arrow-right text-[10px]"></i>
                        </span>
                      </div>
                      {staffMeta.status === "coming-soon" && (
                        <span className="rounded-full bg-forest pl-3 pr-3 py-1.5 text-ivory text-[11px] font-medium">
                          {d.apps.comingSoonBadge}
                        </span>
                      )}
                    </div>
                  </div>
                </AppCard>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA BANNER ============ */}
      <section className="relative bg-ivory pb-20 md:pb-28">
        <div className="mx-auto max-w-370 px-6 md:px-10">
          <div className="rounded-4xl bg-sand-grad px-6 sm:px-10 py-7 sm:py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-forest">{d.apps.ctaBannerTitle}</h2>
              <p className="mt-2 text-forest/65 text-[14.5px] max-w-lg">{d.apps.ctaBannerBody}</p>
            </div>
            <a href={`${appsBase}/kisan-mitra`} className="btn-primary shrink-0 w-fit text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3">
              {d.apps.download} <span className="arrow">↓</span>
            </a>
          </div>
        </div>
      </section>

      <Footer lang={lang} d={d} />
    </>
  );
}
