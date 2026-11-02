"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") setActive((index) => (index + 1) % images.length);
      if (event.key === "ArrowLeft") setActive((index) => (index - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  return (
    <div>
      <button type="button" onClick={() => setOpen(true)} className="relative block aspect-[16/10] w-full overflow-hidden bg-pine">
        <Image src={images[active]} alt={`${title}, photograph ${active + 1}`} fill priority sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" />
        <span className="absolute right-3 bottom-3 bg-paper/95 px-2 py-1 text-[0.65rem] tracking-[0.16em] uppercase">
          Photo walk · {active + 1}/{images.length}
        </span>
      </button>
      {images.length > 1 ? (
        <div className="mt-3 flex gap-3 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Show photograph ${index + 1}`}
              onClick={() => setActive(index)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden border ${index === active ? "border-forest" : "border-transparent"}`}
            >
              <Image src={image} alt="" fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
      {open ? (
        <div className="fixed inset-0 z-[80] flex flex-col bg-forest/95 p-4 text-ivory" role="dialog" aria-modal="true" aria-label={`${title} photographs`}>
          <div className="flex items-center justify-between">
            <p className="text-sm tracking-[0.16em] uppercase">
              {active + 1} / {images.length}
            </p>
            <button type="button" onClick={() => setOpen(false)} className="border border-white/20 px-3 py-2 text-sm">
              Close
            </button>
          </div>
          <div className="relative mt-4 min-h-0 flex-1">
            <Image src={images[active]} alt={`${title}, photograph ${active + 1}`} fill className="object-contain" sizes="100vw" />
          </div>
          {images.length > 1 ? (
            <div className="mt-4 flex justify-between">
              <button type="button" className="border border-white/20 px-4 py-2 text-sm" onClick={() => setActive((index) => (index - 1 + images.length) % images.length)}>
                Previous
              </button>
              <button type="button" className="border border-white/20 px-4 py-2 text-sm" onClick={() => setActive((index) => (index + 1) % images.length)}>
                Next
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
