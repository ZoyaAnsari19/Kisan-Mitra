"use client";

type Props = {
  href: string;
  label: string;
  className: string;
  title: string;
};

/**
 * The "Download Now" pill inside a live app's grid card. The card itself is
 * a clickable div that navigates to the detail page, so this link stops the
 * click from bubbling up and triggering that navigation too.
 */
export function GridDownloadLink({ href, label, className, title }: Props) {
  return (
    <a
      href={href}
      download
      onClick={(e) => e.stopPropagation()}
      className={className}
      title={title}
    >
      <span className="text-[11px] font-medium whitespace-nowrap">{label}</span>
      <span className="w-5 h-5 rounded-full bg-ivory/20 flex items-center justify-center shrink-0">
        <i className="fa-solid fa-arrow-down text-[9px]"></i>
      </span>
    </a>
  );
}
