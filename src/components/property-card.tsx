"use client";

import Image from "next/image";
import Link from "next/link";
import { formatArea, statusLabel } from "@/lib/format";
import type { Property } from "@/lib/types";
import { Money } from "./price";
import { useSite } from "./site-state";

export function PropertyCard({ property }: { property: Property }) {
  const { isSaved, toggleSaved, isCompared, toggleCompare } = useSite();
  const saved = isSaved(property.slug);
  const compared = isCompared(property.slug);

  return (
    <article className="group flex h-full flex-col border border-line bg-paper">
      <Link href={`/properties/${property.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-pine">
        <Image
          src={property.images[0]}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 bg-paper/95 px-2 py-1 text-[0.65rem] tracking-[0.16em] text-ink uppercase">
          {statusLabel(property.status)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">
          {property.neighborhood} · {property.city}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight">
          <Link href={`/properties/${property.slug}`} className="hover:text-pine">
            {property.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm text-muted">
          {property.beds} beds · {property.baths} baths · {formatArea(property.sqm)}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <Money ghs={property.priceGhs} status={property.status} className="font-display text-2xl" />
          <div className="flex gap-2">
            <button
              type="button"
              aria-pressed={saved}
              aria-label={saved ? `Remove ${property.title} from saved` : `Save ${property.title}`}
              onClick={() => toggleSaved(property.slug)}
              className={`grid h-9 w-9 place-items-center border ${saved ? "border-forest bg-forest text-ivory" : "border-line text-ink hover:border-forest"}`}
            >
              <Heart filled={saved} />
            </button>
            <button
              type="button"
              aria-pressed={compared}
              onClick={() => toggleCompare(property.slug)}
              className={`px-2 text-[0.65rem] tracking-[0.14em] uppercase ${compared ? "bg-forest text-ivory" : "border border-line hover:border-forest"}`}
            >
              {compared ? "Added" : "Compare"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
      <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" />
    </svg>
  );
}
