"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { properties } from "@/lib/data";
import { formatArea, formatListing, formatPlot, statusLabel } from "@/lib/format";
import { useSite } from "@/components/site-state";

export default function ComparePage() {
  const { compare, toggleCompare, currency } = useSite();
  const homes = properties.filter((property) => compare.includes(property.slug));
  const rows = [
    ["Price", (property: (typeof homes)[number]) => formatListing(property.priceGhs, property.status, currency)],
    ["Status", (property: (typeof homes)[number]) => statusLabel(property.status)],
    ["Type", (property: (typeof homes)[number]) => property.type],
    ["Where", (property: (typeof homes)[number]) => `${property.neighborhood}, ${property.city}`],
    ["Region", (property: (typeof homes)[number]) => property.region],
    ["Beds", (property: (typeof homes)[number]) => String(property.beds)],
    ["Baths", (property: (typeof homes)[number]) => String(property.baths)],
    ["Interior", (property: (typeof homes)[number]) => formatArea(property.sqm)],
    ["Plot", (property: (typeof homes)[number]) => formatPlot(property.plotSqm) ?? "—"],
    ["Per m²", (property: (typeof homes)[number]) => formatListing(property.priceGhs / property.sqm, "sale", currency)],
    ["Year", (property: (typeof homes)[number]) => `${property.yearLabel ?? "Built"} ${property.year}`],
  ];

  return (
    <Container className="py-14 md:py-20">
      <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">Compare</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">Three, side by side.</h1>
      {homes.length ? (
        <div className="mt-10 overflow-x-auto border border-line">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-paper">
                <th className="p-4 font-normal text-muted"> </th>
                {homes.map((property) => (
                  <th key={property.slug} className="p-4 align-bottom font-normal">
                    <Link href={`/properties/${property.slug}`} className="font-display text-2xl leading-tight">
                      {property.title}
                    </Link>
                    <button type="button" onClick={() => toggleCompare(property.slug)} className="mt-3 block text-xs tracking-[0.14em] text-gold uppercase">
                      Remove
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, render]) => (
                <tr key={String(label)} className="border-t border-line">
                  <th className="p-4 text-left text-[0.68rem] font-medium tracking-[0.14em] text-gold uppercase">{label as string}</th>
                  {homes.map((property) => (
                    <td key={property.slug} className="p-4 align-top">
                      {(render as (property: (typeof homes)[number]) => string)(property)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-10 border border-line bg-paper px-6 py-16">
          <p className="font-display text-3xl">Add up to three houses from the book.</p>
          <Link href="/properties" className="mt-5 inline-flex bg-forest px-5 py-3 text-sm text-ivory">Browse homes</Link>
        </div>
      )}
    </Container>
  );
}
