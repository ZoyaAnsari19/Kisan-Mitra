import {
  localeNames,
  localeSwitchHref,
  localeTags,
  locales,
  type Locale,
} from "@/i18n/config";

/**
 * Server Component — plain anchors, no client JavaScript. The language cookie
 * is written by `proxy.ts` when the target URL is visited.
 *
 * `data-locale-link` lets `public/static/app.js` carry the current `#section`
 * hash across the switch, as a progressive enhancement.
 */

type Props = {
  current: Locale;
  label: string;
};

export function LanguageSwitcher({ current, label }: Props) {
  return (
    <div
      role="group"
      aria-label={label}
      className="hidden md:inline-flex items-center gap-0.5 rounded-full border border-forest/15 p-0.5"
    >
      {locales.map((locale) =>
        locale === current ? (
          <span
            key={locale}
            aria-current="true"
            className="rounded-full bg-forest text-ivory px-3 py-1.5 text-[11.5px] leading-none"
          >
            {localeNames[locale]}
          </span>
        ) : (
          <a
            key={locale}
            href={localeSwitchHref(locale)}
            hrefLang={localeTags[locale]}
            data-locale-link
            className="rounded-full px-3 py-1.5 text-[11.5px] leading-none text-forest/65 hover:text-forest hover:bg-forest/5 transition"
          >
            {localeNames[locale]}
          </a>
        ),
      )}
    </div>
  );
}

export function LanguageSwitcherBlock({ current, label }: Props) {
  return (
    <div className="mt-5 pt-5 border-t border-forest/10">
      <div className="kicker mb-3">
        <span className="dot"></span>
        {label}
      </div>
      <div role="group" aria-label={label} className="grid grid-cols-2 gap-2">
        {locales.map((locale) =>
          locale === current ? (
            <span
              key={locale}
              aria-current="true"
              className="rounded-xl bg-forest text-ivory px-4 py-3 text-center text-sm"
            >
              {localeNames[locale]}
            </span>
          ) : (
            <a
              key={locale}
              href={localeSwitchHref(locale)}
              hrefLang={localeTags[locale]}
              data-locale-link
              className="rounded-xl border border-forest/15 px-4 py-3 text-center text-sm text-forest/75 hover:bg-forest/5 transition"
            >
              {localeNames[locale]}
            </a>
          ),
        )}
      </div>
    </div>
  );
}
