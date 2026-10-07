"use client";

import { useEffect, useState } from "react";

type Props = {
  status: "live" | "coming-soon";
  href?: string;
  label: string;
  notAvailableLabel: string;
  className: string;
};

const POPUP_VISIBLE_MS = 2000;

/**
 * The only real client component on the site (see LanguageSwitcher for why
 * that's notable). Kept deliberately tiny: for a live app it's a plain link,
 * for a not-yet-live app a click just flashes a small "coming soon" popup
 * above the button for a couple seconds — no route, no email capture, no
 * state beyond "was it clicked" (same auto-dismiss pattern as AppCard's
 * coming-soon overlay).
 */
export function AppDownloadButton({
  status,
  href,
  label,
  notAvailableLabel,
  className,
}: Props) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!clicked) return;
    const id = setTimeout(() => setClicked(false), POPUP_VISIBLE_MS);
    return () => clearTimeout(id);
  }, [clicked]);

  if (status === "live" && href) {
    return (
      <a href={href} download className={className}>
        {label} <span className="arrow">↓</span>
      </a>
    );
  }

  return (
    <span className="relative inline-flex">
      <span
        className={`absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full bg-forest text-ivory text-xs font-medium px-3 py-1.5 shadow-lg transition-opacity duration-500 ${
          clicked ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-live="polite"
      >
        {notAvailableLabel}
      </span>
      <button type="button" onClick={() => setClicked(true)} className={className}>
        {label} <span className="arrow">↓</span>
      </button>
    </span>
  );
}
