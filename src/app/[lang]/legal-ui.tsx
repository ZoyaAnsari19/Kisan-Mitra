import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { absoluteLocaleUrl, getSiteUrl } from "@/site";
import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * Shared building blocks for the legal pages (/privacy-policy, /delete-account).
 *
 * The copy is plain data (`Section[]`) rather than JSX so that a Hindi or
 * Marathi version can later be added as another content file with the same
 * shape, without touching the layout.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type Section = { id: string; title: string; blocks: Block[] };

/**
 * Inline markup inside any text string:
 *   [LIKE THIS]        → highlighted placeholder. A value the company has not
 *                        decided yet. It stays visibly marked on the page so it
 *                        cannot be published unnoticed.
 *   {{label|/href}}    → a link.
 */
const TOKEN = /(\[[^\]]+\]|\{\{[^}|]+\|[^}]+\}\})/g;

export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith("[")) {
          return (
            <mark key={i} className="rounded bg-gold/30 px-1 text-forest">
              {part}
            </mark>
          );
        }
        if (part.startsWith("{{")) {
          const [label, href] = part.slice(2, -2).split("|");
          return (
            <a
              key={i}
              href={href}
              className="underline underline-offset-2 text-olive-deep hover:text-forest"
            >
              {label}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-4 leading-relaxed text-forest/80">
          <Rich text={block.text} />
        </p>
      );
    case "h3":
      return (
        <h3 className="mt-8 font-serif text-xl text-forest">
          <Rich text={block.text} />
        </h3>
      );
    case "ul":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-forest/80">
          {block.items.map((item) => (
            <li key={item}>
              <Rich text={item} />
            </li>
          ))}
        </ul>
      );
    case "table":
      // Below `sm` each row becomes a stacked card with its column label, so
      // farmers on small phones never have to scroll sideways.
      return (
        <table className="mt-4 block w-full text-left text-[15px] sm:table">
          <thead className="hidden sm:table-header-group">
            <tr className="border-b border-forest/20 text-xs uppercase tracking-[0.12em] text-forest/60">
              {block.head.map((h) => (
                <th key={h} className="px-3 py-2 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="block sm:table-row-group">
            {block.rows.map((row) => (
              <tr
                key={row[0]}
                className="mb-3 block rounded-xl border border-forest/10 bg-cream p-3 sm:mb-0 sm:table-row sm:rounded-none sm:border-0 sm:border-b sm:bg-transparent sm:p-0"
              >
                {row.map((cell, i) => (
                  <td
                    key={block.head[i]}
                    className="block py-1 align-top leading-relaxed text-forest/80 sm:table-cell sm:px-3 sm:py-3"
                  >
                    <span className="block text-[11px] uppercase tracking-[0.12em] text-forest/50 sm:hidden">
                      {block.head[i]}
                    </span>
                    <Rich text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
  }
}

export function SectionView({
  section,
  number,
}: {
  section: Section;
  number: number;
}) {
  return (
    <section id={section.id} className="mt-14 scroll-mt-28">
      <h2 className="font-serif text-2xl text-forest">
        {number}. {section.title}
      </h2>
      {section.blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </section>
  );
}

/** Mirrors the Play Console "Data safety" form; shown as a box at the top of a policy. */
export type DataSafety = {
  title: string;
  rows: { label: string; value: string }[];
};

/**
 * Resolves `lang` for an English-only legal page: returns the locale, or 404s.
 * Remove the `defaultLocale` check once a translation exists.
 */
export async function requireEnglish(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!isLocale(lang) || lang !== defaultLocale) notFound();
  return lang;
}

/** Metadata for a legal page. Canonical only — there are no translations to point to. */
export async function legalMetadata(
  params: Promise<{ lang: string }>,
  path: string,
  title: string,
  description: string,
): Promise<Metadata> {
  await requireEnglish(params);
  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: absoluteLocaleUrl(path),
      title,
      description,
    },
  };
}

/** A full privacy policy: title, date, optional intro, Data safety box, contents, numbered sections. */
export function PolicyDocument({
  lang,
  title,
  updated,
  intro,
  dataSafety,
  sections,
}: {
  lang: Locale;
  title: string;
  updated: string;
  intro?: string;
  dataSafety: DataSafety;
  sections: Section[];
}) {
  return (
    <LegalShell lang={lang}>
      <h1 className="font-serif text-huge text-forest">
        <Rich text={title} />
      </h1>
      <p className="mt-3 text-sm text-forest/60">
        Last updated: <Rich text={updated} />
      </p>
      {intro && (
        <p className="mt-3 text-[15px] leading-relaxed text-forest/70">
          <Rich text={intro} />
        </p>
      )}

      <aside
        aria-labelledby="data-safety"
        className="mt-8 rounded-2xl border border-forest/15 bg-cream p-5"
      >
        <h2 id="data-safety" className="font-serif text-lg text-forest">
          {dataSafety.title}
        </h2>
        <dl className="mt-3 space-y-3 text-[15px]">
          {dataSafety.rows.map((row) => (
            <div key={row.label}>
              <dt className="text-xs uppercase tracking-[0.12em] text-forest/55">
                {row.label}
              </dt>
              <dd className="mt-0.5 leading-relaxed text-forest/85">
                <Rich text={row.value} />
              </dd>
            </div>
          ))}
        </dl>
      </aside>

      <nav aria-label="Contents" className="mt-8">
        <h2 className="font-serif text-lg text-forest">Contents</h2>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[15px] text-forest/80">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="underline-offset-2 hover:underline hover:text-forest"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {sections.map((section, i) => (
        <SectionView key={section.id} section={section} number={i + 1} />
      ))}
    </LegalShell>
  );
}

/** Page chrome shared by the legal pages: site header, narrow reading column, footer. */
export function LegalShell({
  lang,
  children,
}: {
  lang: Locale;
  children: ReactNode;
}) {
  const d = getDictionary(lang);
  return (
    <>
      <Header lang={lang} d={d} />
      <main className="bg-ivory pt-32 pb-24 sm:pt-36">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">{children}</div>
      </main>
      <Footer lang={lang} d={d} />
    </>
  );
}
