"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
  alt: string;
};

const AUTO_ADVANCE_MS = 4000;

/** Small client-side slider — no external deps, just index state. */
export function ImageGallery({ images, alt }: Props) {
  const [index, setIndex] = useState(0);

  const go = (next: number) => {
    setIndex((next + images.length) % images.length);
  };

  // Auto-advance while there's more than one slide; any manual nav (via `go`)
  // resets this effect since `index` is a dependency, so the next auto-step
  // is always a full interval away from whatever the visitor just did.
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setTimeout(() => go(index + 1), AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, images.length]);

  const secondIndex = (index + 1) % images.length;
  const showTwo = images.length > 1;

  return (
    <div>
      {/* object-contain so the full screenshot is always visible — height
          just caps how tall the slide can grow, it never crops the image.
          Two slides side by side on sm+ screens when there's more than one
          image; mobile stays single since there's no room for a pair. */}
      <div className="relative w-full flex items-center justify-center gap-1.5 sm:gap-2 min-h-[220px] max-h-[46vh]">
        <Image
          src={images[index]}
          alt={`${alt} ${index + 1}`}
          width={390}
          height={844}
          sizes="(min-width: 640px) 45vw, 90vw"
          className="max-w-full max-h-[46vh] w-auto h-auto object-contain"
        />
        {showTwo && (
          <Image
            src={images[secondIndex]}
            alt={`${alt} ${secondIndex + 1}`}
            width={390}
            height={844}
            sizes="45vw"
            className="hidden sm:block max-w-full max-h-[46vh] w-auto h-auto object-contain"
          />
        )}

        <button
          type="button"
          aria-label="Previous"
          onClick={() => go(index - 1)}
          disabled={images.length <= 1}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gold text-forest flex items-center justify-center hover:bg-gold-deep transition disabled:opacity-30 disabled:pointer-events-none"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => go(index + 1)}
          disabled={images.length <= 1}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gold text-forest flex items-center justify-center hover:bg-gold-deep transition disabled:opacity-30 disabled:pointer-events-none"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-gold" : "w-2 bg-ivory/25"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
