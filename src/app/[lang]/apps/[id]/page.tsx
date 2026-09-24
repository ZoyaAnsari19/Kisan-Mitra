import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { defaultLocale, isLocale, localePath, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { absoluteLocaleUrl, getSiteUrl } from "@/site";
import {
  APPS_META,
  DETAIL_HERO_IMG,
  DETAIL_HERO_LEFT_FADE,
  DETAIL_PHONE_IMG,
  DETAIL_PHONE_OFFSET,
  DETAIL_PHONE_SIDE,
  GALLERY_IMAGES,
} from "../apps-data";
import { AppDownloadButton } from "../AppDownloadButton";
import { ImageGallery } from "../ImageGallery";
import { CategoryAccordion } from "./CategoryAccordion";

const siteUrl = getSiteUrl();

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    APPS_META.map((app) => ({ lang, id: app.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();

  const d = getDictionary(lang);
  const app = d.apps.items.find((a) => a.id === id);
  if (!app) notFound();

  const path = `${localePath(lang) === "/" ? "" : localePath(lang)}/apps/${id}`;

  return {
    metadataBase: new URL(siteUrl),
    title: `${app.name} · ${d.apps.meta.title}`,
    description: app.description,
    alternates: {
      canonical: path,
      languages: {
        "en-IN": `/apps/${id}`,
        "mr-IN": `/mr/apps/${id}`,
        "x-default": defaultLocale === "en" ? `/apps/${id}` : `/mr/apps/${id}`,
      },
    },
    openGraph: {
      type: "website",
      url: absoluteLocaleUrl(path),
      title: app.name,
      description: app.description,
    },
  };
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();

  const d = getDictionary(lang);
  const app = d.apps.items.find((a) => a.id === id);
  const meta = APPS_META.find((a) => a.id === id);
  if (!app || !meta) notFound();

  const home = localePath(lang);
  const appsHref = `${home === "/" ? "" : home}/apps`;

  return (
    <>
      {/* ============ HEADER ============ */}
      <header className='fixed top-0 inset-x-0 z-50'>
        <div className='mx-auto max-w-[1480px] px-4 sm:px-6 md:px-10 pt-4 sm:pt-5'>
          <div className='glass rounded-3xl lg:rounded-full pl-4 sm:pl-5 pr-4 sm:pr-5 py-2.5 sm:py-3 flex items-center justify-between'>
            <a href={home} className='flex items-center gap-3 group min-w-0'>
              <span className='relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-forest text-ivory shrink-0'>
                <span className='font-serif text-lg leading-none'>क</span>
                <span className='absolute -inset-1 rounded-full border border-gold/40'></span>
              </span>
              <div className='leading-tight min-w-0'>
                <div className='font-serif text-[15px] tracking-tight text-forest truncate'>
                  {d.nav.brand}
                </div>
                <div className='text-[10px] tracking-[0.28em] text-brown uppercase truncate'>
                  {d.nav.brandSub}
                </div>
              </div>
            </a>
            <a
              href={appsHref}
              className='text-[13.5px] text-forest/85 hover:text-forest flex items-center gap-2'>
              <span className='arrow'>←</span> {d.apps.backToApps}
            </a>
          </div>
        </div>
      </header>

      {/* ============ 1 · HERO — full-bleed background, copy overlaid on the left ============ */}
      {/* Height stays content-driven so text never collides with the next
          section at any zoom level or viewport; 2xl:min-h scales with
          viewport width so object-cover doesn't crop in tight on very wide
          screens (same approach as the /apps list hero). */}
      <section className='relative bg-ivory mt-[35px] sm:min-h-[560px] md:min-h-[620px] 2xl:min-h-[38vw]'>
        {/* Banner hidden on mobile — same reasoning as the /apps list hero.
            The banner carries its own headline/copy baked into the image, so
            there's no text overlay or gradient here on sm+ — just the CTA. */}
        <img
          src={DETAIL_HERO_IMG[app.id]}
          alt={app.name}
          className='hidden sm:block absolute inset-0 w-full h-full object-cover'
        />
        {DETAIL_HERO_LEFT_FADE.has(app.id) && (
          <div className='hidden sm:block absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/70 via-black/30 to-transparent' />
        )}

        <div className='relative mx-auto max-w-[1480px] px-4 sm:px-6 md:px-10 pt-24 sm:pt-40 pb-4 sm:pb-16 w-full'>
          {/* Mobile-only fallback copy — the banner (with its baked-in text)
              is hidden below sm, so small screens still need something here.
              Trimmed vertical rhythm below sm only, so this reads as one
              block with the About section right under it. */}
          <div className='sm:hidden max-w-xl'>
            <div className='stamp text-forest border-forest/30 inline-flex'>
              {meta.status === "live" ?
                d.apps.liveBadge
              : d.apps.comingSoonBadge}
            </div>
            <h1 className='font-serif text-huge text-forest leading-tight mt-3'>
              {app.name}
            </h1>
            <div className='text-forest/60 text-sm mt-2'>{app.tagline}</div>
          </div>
        </div>

        {/* Floating phone mockup — dips slightly below the hero into the
            about section, where the hero has no text to collide with.
            Positioned well inside the section width so it never triggers
            horizontal overflow. Hidden on mobile since the hero banner
            itself is hidden there too. Apps without a real mockup yet
            (DETAIL_PHONE_IMG[app.id] is null) skip this entirely rather
            than showing a placeholder. */}
        {DETAIL_PHONE_IMG[app.id] && (
          <img
            src={DETAIL_PHONE_IMG[app.id]!}
            alt={app.name}
            className={`hidden md:block absolute ${DETAIL_PHONE_OFFSET[app.id] ?? "-bottom-24"} w-[240px] lg:w-[290px] h-auto z-10 drop-shadow-2xl ${
              DETAIL_PHONE_SIDE[app.id] === "left" ?
                "left-28 lg:left-44"
              : "right-10 lg:right-20"
            }`}
          />
        )}
      </section>

      {/* ============ 2 · ABOUT — the "Built for" copy that used to overlay the hero ============ */}
      <section className='relative bg-white pt-5 pb-8 sm:py-16 md:py-20'>
        <div
          className={`mx-auto max-w-[1480px] px-4 sm:px-6 md:px-10 flex flex-col gap-5 md:gap-10 ${
            DETAIL_PHONE_SIDE[app.id] === "left" ?
              "md:items-end md:text-right"
            : "md:flex-row md:items-end"
          }`}>
          <div
            className={`min-w-0 md:max-w-2xl ${
              DETAIL_PHONE_SIDE[app.id] === "left" ? "md:ml-auto" : ""
            }`}>
            <div className='kicker'>
              <span className='dot'></span>
              {d.apps.forLabel} · {app.for}
            </div>
            <p className='mt-4 sm:mt-5 text-[15px] sm:text-[17px] text-forest/75 leading-relaxed'>
              {app.longDescription}
            </p>
          </div>

          <div className='shrink-0'>
            <AppDownloadButton
              status={meta.status}
              href={meta.downloadUrl?.android}
              label={d.apps.download}
              notAvailableLabel={d.apps.notAvailable}
              className='btn-primary'
            />
          </div>
        </div>
      </section>

      {/* ============ 2b · SCREENSHOT GALLERY ============ */}
      <section className='relative bg-forest-grad text-ivory py-20 md:py-28 overflow-hidden grain'>
        <div className='mx-auto max-w-[1480px] px-4 sm:px-6 md:px-10'>
          <div className='kicker kicker-gold'>
            <span className='dot'></span>
            {d.apps.screensLabel}
          </div>

          <div className='mt-10 sm:mt-12'>
            <ImageGallery images={GALLERY_IMAGES[app.id]} alt={app.name} />
          </div>
        </div>
      </section>

      {/* ============ 3 · KEY BENEFITS ============ */}
      {app.benefits.length > 0 && (
        <section className='relative bg-ivory py-20 md:py-28'>
          <div className='mx-auto max-w-[1480px] px-4 sm:px-6 md:px-10'>
            <div className='kicker'>
              <span className='dot'></span>
              {d.apps.benefitsLabel}
            </div>

            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
              {app.benefits.map((b) => (
                <div key={b.t} className='glass rounded-3xl p-5 sm:p-7 flex sm:block gap-4'>
                  <span className='w-11 h-11 rounded-xl bg-cream border border-forest/10 flex items-center justify-center shrink-0'>
                    <i className={`fa-solid ${b.i} text-forest text-lg`}></i>
                  </span>
                  <div className='min-w-0'>
                    <h3 className='font-serif text-lg sm:text-xl text-forest mt-0 sm:mt-5'>
                      {b.t}
                    </h3>
                    <p className='text-forest/65 text-sm mt-2 sm:mt-3 leading-relaxed'>
                      {b.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ 4 · WHAT YOU CAN DO — stacked accordion by category ============ */}
      {app.categories.length > 0 && (
        <section className='relative bg-ivory py-20 md:py-28'>
          <div className='mx-auto max-w-[1480px] px-4 sm:px-6 md:px-10'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14'>
              <div className='lg:col-span-4'>
                <div className='kicker'>
                  <span className='dot'></span>
                  {d.apps.categoriesLabel}
                </div>
                <p className='mt-5 text-forest/60 text-sm leading-relaxed max-w-sm'>
                  {app.description}
                </p>
              </div>
              <div className='lg:col-span-8'>
                <CategoryAccordion categories={app.categories} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============ 5 · APP'S OWN INTRODUCTION (journey / onboarding story) ============ */}
      {app.journey.length > 0 && (
        <section className='relative bg-sand-grad py-20 md:py-28 overflow-hidden'>
          <div className='blob bg-gold/30 w-[500px] h-[500px] -top-40 -right-40 animate-float-slower'></div>
          <div className='relative mx-auto max-w-[1480px] px-4 sm:px-6 md:px-10'>
            <div className='kicker'>
              <span className='dot'></span>
              {d.apps.journeyLabel}
            </div>

            <div className='mt-10 space-y-5'>
              {app.journey.map((j, i) => (
                <div
                  key={j.t}
                  className='glass rounded-3xl p-5 sm:p-8 flex flex-row items-start gap-4 sm:gap-8'>
                  <span className='font-serif text-2xl sm:text-4xl text-gold leading-none shrink-0'>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className='min-w-0'>
                    <div className='text-[11px] tracking-[0.22em] uppercase text-brown'>
                      {j.t}
                    </div>
                    <h3 className='font-serif text-xl sm:text-2xl text-forest mt-2'>
                      {j.s}
                    </h3>
                    <p className='text-forest/65 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl'>
                      {j.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ 6 · VLE HELPER CALLOUT ============ */}
      {app.helper && (
        <section className='relative bg-ivory py-20 md:py-28'>
          <div className='mx-auto max-w-[1480px] px-4 sm:px-6 md:px-10'>
            <div className='bg-forest text-ivory rounded-3xl p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative overflow-hidden grain'>
              <div className='order-2 lg:order-1 lg:col-span-8'>
                <div className='kicker kicker-gold'>
                  <span className='dot'></span>
                  {app.helper.kicker}
                </div>
                <h2 className='font-serif text-huge mt-4'>
                  {app.helper.title}
                </h2>
                <p className='text-ivory/70 mt-5 leading-relaxed max-w-2xl'>
                  {app.helper.body}
                </p>
              </div>
              <div className='order-1 lg:order-2 lg:col-span-4 flex lg:justify-end'>
                <span className='w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-ivory/10 border border-ivory/15 flex items-center justify-center'>
                  <i className='fa-solid fa-user-tie text-gold text-2xl sm:text-4xl'></i>
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============ 7 · SIGNUP STEPS ============ */}
      {app.signupSteps.length > 0 && (
        <section className='relative bg-ivory pb-20 md:pb-28'>
          <div className='mx-auto max-w-[1480px] px-4 sm:px-6 md:px-10'>
            <div className='kicker'>
              <span className='dot'></span>
              {d.apps.signupLabel}
            </div>

            <div className='mt-10 flex sm:grid overflow-x-auto sm:overflow-visible -mx-4 sm:mx-0 px-4 sm:px-0 gap-4 sm:grid-cols-3 lg:grid-cols-5 snap-x snap-mandatory sm:snap-none'>
              {app.signupSteps.map((s, i) => (
                <div key={s} className='glass rounded-2xl p-5 shrink-0 w-[70vw] xs:w-[60vw] sm:w-auto snap-start'>
                  <span className='font-serif text-2xl text-gold'>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className='text-forest text-sm sm:text-[15px] mt-3 leading-snug'>
                    {s}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ 8 · FAQ ============ */}
      <section className='relative bg-ivory pb-20 md:pb-28'>
        <div className='mx-auto max-w-[1480px] px-4 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10'>
          <div className='md:col-span-4'>
            <div className='kicker'>
              <span className='dot'></span>
              {d.apps.faqLabel}
            </div>
          </div>
          <div className='md:col-span-8 space-y-1 sm:space-y-2'>
            {app.faq.map((f, i) => (
              <details
                key={f.q}
                className='faq-item border-b border-forest/10 py-5 sm:py-6 group'>
                <summary className='flex items-start justify-between gap-4 sm:gap-6'>
                  <div className='flex items-baseline gap-3 sm:gap-5'>
                    <span className='font-mono text-xs text-gold w-7 sm:w-8 shrink-0'>
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <h3 className='font-serif text-lg sm:text-xl text-forest group-hover:text-forest-soft transition'>
                      {f.q}
                    </h3>
                  </div>
                  <span className='faq-plus w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-forest/15 flex items-center justify-center text-forest text-lg shrink-0'>
                    +
                  </span>
                </summary>
                <div className='faq-content mt-4 sm:mt-5 pl-[40px] sm:pl-[52px] text-forest/70 max-w-3xl leading-relaxed text-[15px] sm:text-base'>
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 9 · FINAL CTA ============ */}
      <section className='relative bg-forest text-ivory py-14 sm:py-16'>
        <div className='mx-auto max-w-[1480px] px-4 sm:px-6 md:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6'>
          <div>
            <div className='text-[11px] tracking-[0.22em] uppercase text-clay/80'>
              {d.apps.download}
            </div>
            <h2 className='font-serif text-huge mt-2'>{app.name}</h2>
          </div>
          <AppDownloadButton
            status={meta.status}
            href={meta.downloadUrl?.android}
            label={d.apps.download}
            notAvailableLabel={d.apps.notAvailable}
            className='btn-gold'
          />
        </div>
      </section>
    </>
  );
}
