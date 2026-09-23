"use client";

import { useState } from "react";

type Props = {
  status: "live" | "coming-soon";
  href?: string;
  label: string;
  notAvailableLabel: string;
  className: string;
};

/**
 * The only real client component on the site (see LanguageSwitcher for why
 * that's notable). Kept deliberately tiny: for a live app it's a plain link,
 * for a not-yet-live app a click just reveals an inline message — no route,
 * no email capture, no state beyond "was it clicked".
 */
export function AppDownloadButton({
  status,
  href,
  label,
  notAvailableLabel,
  className,
}: Props) {
  const [clicked, setClicked] = useState(false);

  if (status === "live" && href) {
    return (
      <a href={href} download className={className}>
        {label} <span className="arrow">↓</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setClicked(true)}
      className={className}
      aria-live="polite"
    >
      {clicked ? notAvailableLabel : label}
    </button>
  );
}
