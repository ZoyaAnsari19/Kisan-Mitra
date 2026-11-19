"use client";

import { useEffect, useState } from "react";

type Props = {
  /** The APK link. Omit for an app that has no download yet. */
  href?: string;
  label: string;
  /** Shown in a small popup when there is no `href` and the button is clicked. */
  unavailableLabel: string;
  className: string;
  title: string;
  /** The grid cards hide this pill below `sm`; the staff-app card keeps it. */
  showOnMobile?: boolean;
};

const POPUP_VISIBLE_MS = 2000;

/**
 * The "Download Now" pill inside an app's grid card. The card itself is a
 * clickable div that navigates to the detail page, so this stops the click
 * from bubbling up and triggering that navigation too.
 *
 * With an `href` it is a real download link. Without one (the app has no APK
 * yet) it looks the same but is a button that flashes `unavailableLabel` for a
 * couple of seconds — the same behaviour as the detail page's
 * AppDownloadButton — so there is never a dead link.
 */
export function GridDownloadLink({
  href,
  label,
  unavailableLabel,
  className,
  title,
  showOnMobile = false,
}: Props) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!clicked) return;
    const id = setTimeout(() => setClicked(false), POPUP_VISIBLE_MS);
    return () => clearTimeout(id);
  }, [clicked]);

  const display = showOnMobile ? "flex" : "hidden sm:flex";

  const content = (
    <>
      <span className="text-[11px] font-medium whitespace-nowrap">{label}</span>
      <span className="w-5 h-5 rounded-full bg-ivory/20 flex items-center justify-center shrink-0">
        <i className="fa-solid fa-arrow-down text-[9px]"></i>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        download
        onClick={(e) => e.stopPropagation()}
        className={`${display} ${className}`}
        title={title}
      >
        {content}
      </a>
    );
  }

  return (
    <span
      className={`relative shrink-0 ${showOnMobile ? "inline-flex" : "hidden sm:inline-flex"}`}
    >
      <span
        className={`absolute -top-2 right-0 -translate-y-full whitespace-nowrap rounded-full bg-forest text-ivory text-[11px] font-medium px-3 py-1.5 shadow-lg transition-opacity duration-500 ${
          clicked ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-live="polite"
      >
        {unavailableLabel}
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setClicked(true);
        }}
        // Enter/Space on the button must not also trigger the card's own
        // key handler, which would navigate to the detail page.
        onKeyDown={(e) => e.stopPropagation()}
        className={`flex ${className}`}
        title={title}
      >
        {content}
      </button>
    </span>
  );
}
