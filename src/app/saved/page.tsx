"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { PropertyCard } from "@/components/property-card";
import { properties } from "@/lib/data";
import { useSite } from "@/components/site-state";

export default function SavedPage() {
  const { saved } = useSite();
  const homes = properties.filter((property) => saved.includes(property.slug));

  return (
    <Container className="py-14 md:py-20">
      <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">Saved</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">Houses you kept.</h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-muted">Saved on this browser, so a short list survives a refresh. It does not reserve the house.</p>
      {homes.length ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homes.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      ) : (
        <div className="mt-10 border border-line bg-paper px-6 py-16">
          <p className="font-display text-3xl">Nothing saved yet.</p>
          <Link href="/properties" className="mt-5 inline-flex bg-forest px-5 py-3 text-sm text-ivory">Browse the book</Link>
        </div>
      )}
    </Container>
  );
}
