"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ghanaRegions, neighborhoods, properties } from "@/lib/data";
import type { Property, PropertyType, Status } from "@/lib/types";
import { Container, fieldClass, labelClass } from "./container";
import { PropertyCard } from "./property-card";

const types = Array.from(new Set(properties.map((property) => property.type)));
const budgets = [
  ["", "Any price"],
  ["20000", "Up to GH₵20,000"],
  ["50000", "Up to GH₵50,000"],
  ["2000000", "Up to GH₵2 million"],
  ["5000000", "Up to GH₵5 million"],
  ["10000000", "Up to GH₵10 million"],
  ["15000000", "Up to GH₵15 million"],
];

export function PropertyBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("q") ?? "";
  const [text, setText] = useState(query);
  const [syncedQuery, setSyncedQuery] = useState(query);
  if (syncedQuery !== query) {
    setSyncedQuery(query);
    setText(query);
  }

  const filtered = useMemo(() => sortProperties(properties.filter((property) => matches(property, params)), params.get("sort") ?? "featured"), [params]);

  function update(next: Record<string, string>) {
    const url = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(next)) {
      if (!value) url.delete(key);
      else url.set(key, value);
    }
    const search = url.toString();
    router.push(search ? `/properties?${search}` : "/properties");
  }

  const active = ["q", "region", "neighborhood", "status", "type", "beds", "max"].filter((key) => params.get(key));

  return (
    <Container className="py-12 md:py-16">
      <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">The book</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-5xl leading-none md:text-6xl">Homes</h1>
        <p className="text-sm text-muted" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "residence" : "residences"}
        </p>
      </div>
      <form
        className="mt-8 grid gap-4 border border-line bg-paper p-4 md:grid-cols-6"
        onSubmit={(event) => {
          event.preventDefault();
          update({ q: text.trim() });
        }}
      >
        <label className="md:col-span-2">
          <span className={labelClass}>Search</span>
          <input value={text} onChange={(event) => setText(event.target.value)} className={fieldClass} placeholder="East Legon, Kumasi, penthouse" />
        </label>
        <Select label="Region" value={params.get("region") ?? ""} onChange={(value) => update({ region: value, neighborhood: "" })}>
          <option value="">All Ghana</option>
          {ghanaRegions.map((region) => (
            <option key={region.name}>{region.name}</option>
          ))}
        </Select>
        <Select label="Neighbourhood" value={params.get("neighborhood") ?? ""} onChange={(value) => update({ neighborhood: value })}>
          <option value="">Any</option>
          {neighborhoods.map((neighborhood) => (
            <option key={neighborhood.slug} value={neighborhood.slug}>
              {neighborhood.name}
            </option>
          ))}
        </Select>
        <Select label="Intention" value={params.get("status") ?? ""} onChange={(value) => update({ status: value })}>
          <option value="">Any</option>
          <option value="sale">For sale</option>
          <option value="let">To let</option>
          <option value="offplan">Off-plan</option>
        </Select>
        <Select label="Type" value={params.get("type") ?? ""} onChange={(value) => update({ type: value })}>
          <option value="">Any</option>
          {types.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </Select>
        <Select label="Beds" value={params.get("beds") ?? ""} onChange={(value) => update({ beds: value })}>
          <option value="">Any</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </Select>
        <Select label="Highest figure" value={params.get("max") ?? ""} onChange={(value) => update({ max: value })}>
          {budgets.map(([value, label]) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Select label="Sort" value={params.get("sort") ?? "featured"} onChange={(value) => update({ sort: value === "featured" ? "" : value })}>
          <option value="featured">Selected first</option>
          <option value="new">Newest</option>
          <option value="price-asc">Price, low</option>
          <option value="price-desc">Price, high</option>
          <option value="area">Largest</option>
        </Select>
        <div className="flex items-end">
          <button type="submit" className="w-full bg-forest px-4 py-3 text-sm text-ivory">
            Apply
          </button>
        </div>
      </form>
      <p className="mt-3 text-xs leading-5 text-muted">
        Lettings filter on the monthly rent. Purchases and off-plan filter on the asking figure.{" "}
        <Link href={`/map${params.get("region") ? `?region=${encodeURIComponent(params.get("region") ?? "")}` : ""}`} className="text-gold underline-offset-2 hover:underline">
          See these on the Ghana map
        </Link>
        {active.length ? (
          <>
            {" "}
            ·{" "}
            <button type="button" className="text-gold underline-offset-2 hover:underline" onClick={() => router.push("/properties")}>
              Clear filters
            </button>
          </>
        ) : null}
      </p>
      {filtered.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      ) : (
        <div className="mt-10 border border-line bg-paper px-6 py-16 text-center">
          <h2 className="font-display text-4xl">Nothing on the book matches.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted">
            Widen the price, or tell the desk the street you actually want. We keep houses that never appear in a filter.
          </p>
          <Link href="/contact" className="mt-6 inline-flex bg-forest px-5 py-3 text-sm text-ivory">
            Talk to the desk
          </Link>
        </div>
      )}
    </Container>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label>
      <span className={labelClass}>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className={fieldClass}>
        {children}
      </select>
    </label>
  );
}

function matches(property: Property, params: URLSearchParams) {
  const q = (params.get("q") ?? "").trim().toLowerCase();
  const region = params.get("region");
  const neighborhood = params.get("neighborhood");
  const status = params.get("status") as Status | null;
  const type = params.get("type") as PropertyType | null;
  const beds = Number(params.get("beds") ?? 0);
  const max = Number(params.get("max") ?? 0);
  if (region && property.region !== region) return false;
  if (neighborhood && property.neighborhoodSlug !== neighborhood) return false;
  if (status && property.status !== status) return false;
  if (type && property.type !== type) return false;
  if (beds && property.beds < beds) return false;
  if (max && property.priceGhs > max) return false;
  if (!q) return true;
  const haystack = `${property.title} ${property.neighborhood} ${property.city} ${property.region} ${property.type} ${property.place} ${property.summary}`.toLowerCase();
  return haystack.includes(q);
}

function sortProperties(list: Property[], sort: string) {
  const copy = [...list];
  if (sort === "price-asc") copy.sort((a, b) => a.priceGhs - b.priceGhs);
  else if (sort === "price-desc") copy.sort((a, b) => b.priceGhs - a.priceGhs);
  else if (sort === "area") copy.sort((a, b) => b.sqm - a.sqm);
  else if (sort === "new") copy.sort((a, b) => b.added.localeCompare(a.added));
  else copy.sort((a, b) => Number(b.featured) - Number(a.featured) || b.added.localeCompare(a.added));
  return copy;
}
