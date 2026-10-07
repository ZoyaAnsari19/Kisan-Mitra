"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  href: string;
  hasDetailPage: boolean;
  comingSoonLabel: string;
  className: string;
  children: React.ReactNode;
};

const OVERLAY_VISIBLE_MS = 2000;

/**
 * Card navigation is independent of download availability: an app can be
 * browsable (has a detail page to explore) while its APK is still "coming
 * soon" — that's handled separately by AppDownloadButton inside the detail
 * page. So this only cares whether a detail page exists. When it does, the
 * card navigates there; when it doesn't, a click just flashes the
 * coming-soon label in place of "View More". Cards with a detail page are a
 * clickable div (not an <a>) rather than a real link, because their children
 * can include a nested download <a> — an <a> can't contain another <a> per
 * the HTML spec, so the whole card can't be one. The coming-soon flash
 * auto-dismisses after a couple seconds with a fade, rather than staying up
 * until the visitor clicks again.
 */
export function AppCard({ href, hasDetailPage, comingSoonLabel, className, children }: Props) {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!clicked) return;
    const id = setTimeout(() => setClicked(false), OVERLAY_VISIBLE_MS);
    return () => clearTimeout(id);
  }, [clicked]);

  if (hasDetailPage) {
    return (
      <div
        role="link"
        tabIndex={0}
        onClick={() => router.push(href)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") router.push(href);
        }}
        className={`${className} cursor-pointer`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => setClicked(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setClicked(true);
      }}
      className={`${className} cursor-pointer`}
      aria-live="polite"
    >
      {children}
      <span
        className={`absolute inset-0 rounded-4xl bg-forest/95 text-ivory flex items-center justify-center font-serif text-xl transition-opacity duration-500 ${
          clicked ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {comingSoonLabel}
      </span>
    </div>
  );
}
