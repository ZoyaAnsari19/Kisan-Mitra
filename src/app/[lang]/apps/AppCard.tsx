"use client";

import { useState } from "react";

type Props = {
  href: string;
  status: "live" | "coming-soon";
  comingSoonLabel: string;
  className: string;
  children: React.ReactNode;
};

/**
 * Same "reveal on click" pattern as AppDownloadButton: a live app is a plain
 * link, a not-yet-live app's card doesn't navigate at all — a click just
 * flashes the coming-soon label in place of "View More" (handled by the
 * caller via the `isComingSoonClicked` render-prop-free approach below).
 */
export function AppCard({ href, status, comingSoonLabel, className, children }: Props) {
  const [clicked, setClicked] = useState(false);

  if (status === "live") {
    return (
      <a href={href} className={className}>
        {children}
      </a>
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
      {clicked && (
        <span className="absolute inset-0 rounded-[2rem] bg-forest/95 text-ivory flex items-center justify-center font-serif text-xl">
          {comingSoonLabel}
        </span>
      )}
    </div>
  );
}
