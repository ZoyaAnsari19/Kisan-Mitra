import { intlLocales, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher, LanguageSwitcherBlock } from "./LanguageSwitcher";

function liveClockText(locale: Locale, prefix: string): string {
  const opts: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return `${prefix} · ${new Date().toLocaleDateString(intlLocales[locale], opts).toUpperCase()}`;
}

/**
 * Site-wide header — shared by the homepage and every other page (e.g. /apps).
 * Nav links point at homepage in-page anchors on purpose: a visitor on a
 * sub-page clicking "Services" should land on the homepage's Services
 * section, not a dead anchor on the current page.
 */
export function Header({ lang, d }: { lang: Locale; d: Dictionary }) {
  const home = localePath(lang);
  const appsHref = `${home === "/" ? "" : home}/apps`;

  const NAV = [
    { href: `${home}#ecosystem`, label: d.nav.links.ecosystem },
    { href: `${home}#services`, label: d.nav.links.services },
    { href: appsHref, label: d.nav.appsLink },
    { href: `${home}#infrastructure`, label: d.nav.links.infrastructure },
    { href: `${home}#membership`, label: d.nav.links.membership },
    { href: `${home}#leadership`, label: d.nav.links.leadership },
    { href: `${home}#mall`, label: d.nav.links.mall },
    { href: `${home}#impact`, label: d.nav.links.impact },
  ];

  return (
    <header id="site-header" className="fixed top-0 inset-x-0 z-50 transition-all duration-500">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 md:px-10 pt-4 sm:pt-5">
        <div className="glass rounded-3xl lg:rounded-full pl-4 sm:pl-5 pr-2 sm:pr-3 py-2.5 sm:py-3 flex items-center justify-between">
          <a href={home} className="flex items-center gap-3 group min-w-0">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-forest text-ivory shrink-0">
              <span className="font-serif text-lg leading-none">क</span>
              <span className="absolute -inset-1 rounded-full border border-gold/40"></span>
            </span>
            <div className="leading-tight min-w-0">
              <div className="font-serif text-[15px] tracking-tight text-forest truncate">{d.nav.brand}</div>
              <div className="text-[10px] tracking-[0.28em] text-brown uppercase truncate">{d.nav.brandSub}</div>
            </div>
          </a>

          <nav className="hidden xl:flex items-center gap-5 text-[13.5px] text-forest/85 whitespace-nowrap">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-forest">{n.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span
              id="liveclock"
              suppressHydrationWarning
              data-prefix={d.nav.clockPrefix}
              className="hidden 2xl:inline-block text-[10.5px] tracking-[0.28em] text-brown font-mono"
            >
              {liveClockText(lang, d.nav.clockPrefix)}
            </span>
            <LanguageSwitcher current={lang} label={d.nav.languageLabel} />
            <a href={`${home}#onboard`} className="btn-primary py-2.5 px-4 sm:px-5 text-[12px] sm:text-[13px] whitespace-nowrap">
              <span className="hidden sm:inline">{d.nav.cta}</span>
              <span className="sm:hidden">{d.nav.ctaShort}</span>
              <span className="arrow">↗</span>
            </a>
            {/* Mobile hamburger — visible only below xl */}
            <button
              id="mobile-menu-btn"
              aria-label={d.nav.toggleMenu}
              aria-controls="mobile-menu"
              aria-expanded="false"
              className="xl:hidden ml-1 inline-flex flex-col items-center justify-center gap-[5px] w-11 h-11 rounded-full hover:bg-forest/5 transition"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile menu panel (below xl only) */}
        <div id="mobile-menu" className="xl:hidden mt-0">
          <div className="glass rounded-3xl p-5 sm:p-6">
            <div className="kicker mb-4"><span className="dot"></span>{d.nav.navigate}</div>
            <nav className="grid grid-cols-1 divide-y divide-forest/10">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className="font-serif text-xl text-forest py-3 flex items-center justify-between hover:text-forest-soft transition">
                  <span>{n.label}</span>
                  <span className="text-gold text-base">→</span>
                </a>
              ))}
            </nav>
            <a href={`${home}#onboard`} className="btn-primary w-full justify-center mt-5">
              {d.nav.cta} <span className="arrow">→</span>
            </a>
            <LanguageSwitcherBlock current={lang} label={d.nav.languageLabel} />
          </div>
        </div>
      </div>
    </header>
  );
}
