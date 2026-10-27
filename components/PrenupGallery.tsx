"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PRENUP_PHOTOS, type Photo } from "@/lib/photos";

export default function PrenupGallery({ photos = PRENUP_PHOTOS }: { photos?: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const n = photos.length;

  const close = useCallback(() => { setIndex(null); opener.current?.focus(); }, []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + n) % n)), [n]);

  useEffect(() => {
    if (index === null) return;
    closeBtn.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  }, [index, close, step]);

  return (
    <section aria-labelledby="prenup-gallery-title" className="mx-auto max-w-5xl px-6 py-16">
      <h2 id="prenup-gallery-title" className="text-center font-display text-3xl text-olive-deep sm:text-4xl">Our Prenup Moments</h2>
      <p className="mx-auto mt-3 max-w-xl text-center font-serif text-lg text-antique">
        Every photograph tells a story of love, laughter, and the beautiful journey that brought us here.
      </p>

      {n === 0 ? (
        <p className="mt-10 rounded-md border border-dashed border-champagne p-10 text-center font-serif text-antique">
          Our photographs are on their way. Please check back soon.
        </p>
      ) : (
        <ul className="mt-10 columns-2 gap-3 sm:gap-4 md:columns-3 [&>li]:mb-3 sm:[&>li]:mb-4">
          {photos.map((p, i) => (
            <li key={p.id} className="break-inside-avoid">
              <button
                type="button" aria-label={`View photo ${i + 1} of ${n}: ${p.alt}`}
                onClick={(e) => { opener.current = e.currentTarget; setIndex(i); }}
                className="group block w-full overflow-hidden rounded-sm border border-champagne/70 bg-ivory p-1.5 shadow-sm transition-shadow hover:shadow-md"
              >
                <Image src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" sizes="(max-width:768px) 50vw, 330px" className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]" />
              </button>
              {p.caption && <p className="mt-1 text-center font-serif text-sm text-antique">{p.caption}</p>}
            </li>
          ))}
        </ul>
      )}

      {index !== null && photos[index] && (
        <div
          role="dialog" aria-modal="true" aria-label="Photo viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-olive-deep/95 p-4"
          onClick={close}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current; touchX.current = null;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
        >
          <button ref={closeBtn} type="button" onClick={close} aria-label="Close viewer" className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-ivory/15 text-ivory hover:bg-ivory/25"><X /></button>
          {n > 1 && <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ivory/15 text-ivory hover:bg-ivory/25"><ChevronLeft /></button>}
          {n > 1 && <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ivory/15 text-ivory hover:bg-ivory/25"><ChevronRight /></button>}
          <figure className="flex max-h-full max-w-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <Image src={photos[index].src} alt={photos[index].alt} width={photos[index].width} height={photos[index].height} sizes="100vw" className="max-h-[82vh] w-auto rounded-sm object-contain" />
            <figcaption className="mt-3 text-center font-serif text-ivory">
              {photos[index].caption && <span className="block">{photos[index].caption}</span>}
              <span className="text-sm text-ivory/70">{index + 1} / {n}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
