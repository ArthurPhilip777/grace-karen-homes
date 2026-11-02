import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/container";
import { GhanaMap } from "@/components/ghana-map";
import { PropertyCard } from "@/components/property-card";
import { homesIn, neighborhoods } from "@/lib/data";

export function generateStaticParams() {
  return neighborhoods.map((neighborhood) => ({ slug: neighborhood.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = neighborhoods.find((item) => item.slug === slug);
  if (!neighborhood) return { title: "Neighbourhood" };
  return { title: neighborhood.name, description: neighborhood.standfirst };
}

export default function NeighborhoodPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="px-6 py-24 text-muted">Opening the neighbourhood…</div>}>
      <NeighborhoodContent params={params} />
    </Suspense>
  );
}

async function NeighborhoodContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const neighborhood = neighborhoods.find((item) => item.slug === slug);
  if (!neighborhood) notFound();
  const homes = homesIn(neighborhood.slug);
  const focus = homes[0] ? { lat: homes[0].lat, lng: homes[0].lng, zoom: homes.length > 1 ? 12 : 14 } : null;

  return (
    <Container className="py-14 md:py-20">
      <p className="text-sm text-muted">
        <Link href="/neighborhoods" className="hover:text-ink">Neighbourhoods</Link>
        <span aria-hidden> / </span>
        {neighborhood.name}
      </p>
      <p className="mt-6 text-[0.72rem] tracking-[0.2em] text-gold uppercase">
        {neighborhood.city} · {neighborhood.region}
      </p>
      <h1 className="mt-3 font-display text-5xl leading-none md:text-7xl">{neighborhood.name}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{neighborhood.standfirst}</p>
      <dl className="mt-8 grid gap-6 border-y border-line py-6 md:grid-cols-2">
        <div>
          <dt className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">Who it suits</dt>
          <dd className="mt-2 text-base leading-7">{neighborhood.suited}</dd>
        </div>
        <div>
          <dt className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">The trade-off</dt>
          <dd className="mt-2 text-base leading-7">{neighborhood.tradeoff}</dd>
        </div>
      </dl>
      {focus ? (
        <div className="mt-8 border border-line">
          <GhanaMap properties={homes} focus={focus} highlight={neighborhood.region} className="h-[380px]" />
        </div>
      ) : null}
      <h2 className="mt-12 font-display text-4xl">On the book</h2>
      {homes.length ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {homes.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-muted">No residence in this guide just now.</p>
      )}
    </Container>
  );
}
