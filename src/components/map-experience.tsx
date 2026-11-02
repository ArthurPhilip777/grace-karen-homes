"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ghanaRegions, properties, regionByName } from "@/lib/data";
import { GhanaMap } from "./ghana-map";
import { Money } from "./price";

export function MapExperience() {
  const params = useSearchParams();
  const requested = params.get("region") ?? "";
  const initial = ghanaRegions.find((region) => region.name === requested) ?? null;
  const [regionName, setRegionName] = useState(initial?.name ?? "");
  const [pin, setPin] = useState<{ lat: number; lng: number; zoom: number } | null>(
    initial ? { lat: initial.center[0], lng: initial.center[1], zoom: initial.zoom } : null,
  );

  const visible = useMemo(
    () => (regionName ? properties.filter((property) => property.region === regionName) : properties),
    [regionName],
  );

  function chooseRegion(name: string) {
    const match = regionByName(name);
    if (!match) return;
    setRegionName(match.name);
    setPin({ lat: match.center[0], lng: match.center[1], zoom: match.zoom });
  }

  function showAll() {
    setRegionName("");
    setPin(null);
  }

  return (
    <div className="grid lg:min-h-[calc(100vh-76px)] lg:grid-cols-[340px_1fr]">
      <aside className="order-2 max-h-[calc(100vh-76px)] overflow-y-auto border-line bg-paper lg:order-1 lg:border-r">
        <div className="border-b border-line p-5">
          <p className="text-[0.72rem] tracking-[0.2em] text-gold uppercase">Ghana</p>
          <h1 className="mt-2 font-display text-4xl leading-none">The map</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Sixteen regions. Pins are houses on the book. The frame stays on Ghana.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 border-b border-line p-4">
          <button
            type="button"
            onClick={showAll}
            className={`px-2 py-1 text-[0.68rem] tracking-[0.12em] uppercase ${regionName === "" ? "bg-forest text-ivory" : "border border-line"}`}
          >
            All Ghana
          </button>
          {ghanaRegions.map((region) => {
            const count = properties.filter((property) => property.region === region.name).length;
            const active = regionName === region.name;
            return (
              <button
                key={region.name}
                type="button"
                onClick={() => chooseRegion(region.name)}
                className={`px-2 py-1 text-[0.68rem] tracking-[0.12em] uppercase ${active ? "bg-forest text-ivory" : "border border-line"}`}
              >
                {region.name}
                {count ? ` ${count}` : ""}
              </button>
            );
          })}
        </div>
        <ul>
          {visible.length ? (
            visible.map((property) => (
              <li key={property.slug} className="border-b border-line px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/properties/${property.slug}`} className="font-display text-2xl leading-tight hover:text-pine">
                      {property.title}
                    </Link>
                    <p className="mt-1 text-sm text-muted">
                      {property.neighborhood}, {property.city}
                    </p>
                    <Money ghs={property.priceGhs} status={property.status} className="mt-2 block text-sm" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setPin({ lat: property.lat, lng: property.lng, zoom: 14 })}
                    className="shrink-0 border border-line px-2 py-1 text-[0.65rem] tracking-[0.14em] uppercase hover:border-forest"
                  >
                    Show
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="px-5 py-8 text-sm leading-7 text-muted">
              Nothing on the book in {regionName} this season. The desk still works the region.
              <Link href="/contact" className="mt-3 block text-gold">
                Tell us what you want there
              </Link>
            </li>
          )}
        </ul>
      </aside>
      <div className="order-1 min-h-[70vh] lg:order-2 lg:min-h-0">
        <GhanaMap
          properties={visible}
          focus={pin}
          highlight={regionName}
          onRegion={chooseRegion}
          scrollWheelZoom
          className="h-[70vh] lg:h-[calc(100vh-76px)]"
        />
      </div>
    </div>
  );
}
