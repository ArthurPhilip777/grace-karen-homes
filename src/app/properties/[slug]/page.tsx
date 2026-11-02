import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/container";
import { EnquiryCard } from "@/components/forms";
import { Gallery } from "@/components/gallery";
import { GhanaMap } from "@/components/ghana-map";
import { MortgageCalculator } from "@/components/mortgage-calculator";
import { Money, MoneyAlt } from "@/components/price";
import { PropertyActions } from "@/components/property-actions";
import { PropertyCard } from "@/components/property-card";
import { getAgent, getProperty, properties, similarTo } from "@/lib/data";
import { formatArea, formatMoney, formatPlot, statusLabel } from "@/lib/format";
import { site, whatsappHref } from "@/lib/site";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return { title: "Residence" };
  return { title: property.title, description: property.summary };
}

export default function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="px-6 py-24 text-muted">Opening the house…</div>}>
      <PropertyContent params={params} />
    </Suspense>
  );
}

async function PropertyContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();
  const agent = getAgent(property.agentId);
  const similar = similarTo(property.slug);
  const phone = agent?.phone === "kumasi" ? site.kumasiPhoneDisplay : site.phoneDisplay;
  const tel = agent?.phone === "kumasi" ? site.kumasiPhoneTel : site.phoneTel;
  const plot = formatPlot(property.plotSqm);

  return (
    <article>
      <Container className="pt-8 pb-16">
        <p className="text-sm text-muted">
          <Link href="/properties" className="hover:text-ink">Homes</Link>
          <span aria-hidden> / </span>
          <Link href={`/neighborhoods/${property.neighborhoodSlug}`} className="hover:text-ink">{property.neighborhood}</Link>
          <span aria-hidden> / </span>
          {property.title}
        </p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.72rem] tracking-[0.2em] text-gold uppercase">
              {property.ref} · {statusLabel(property.status)} · {property.type}
            </p>
            <h1 className="mt-2 font-display text-5xl leading-none md:text-6xl">{property.title}</h1>
            <p className="mt-3 text-muted">{property.place}</p>
          </div>
          <div className="text-right">
            <Money ghs={property.priceGhs} status={property.status} className="font-display text-4xl" />
            <p className="mt-1 text-sm text-muted">
              <MoneyAlt ghs={property.priceGhs} status={property.status} /> · confirm before an offer
            </p>
          </div>
        </div>
        <div className="mt-5">
          <PropertyActions slug={property.slug} title={property.title} />
        </div>
        <div className="mt-6">
          <Gallery images={property.images} title={property.title} />
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-3 lg:grid-cols-6">
          <Fact label="Bedrooms" value={String(property.beds)} />
          <Fact label="Baths" value={String(property.baths)} />
          <Fact label="Interior" value={formatArea(property.sqm)} />
          <Fact label="Plot" value={plot ?? "Managed block"} />
          <Fact label={property.yearLabel ?? "Built"} value={String(property.year)} />
          <Fact label="Per m²" value={formatMoney(property.priceGhs / property.sqm, "GHS")} />
        </dl>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            {property.description.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 text-base leading-8 text-ink/90 first:mt-0">
                {paragraph}
              </p>
            ))}
            <h2 className="mt-10 font-display text-3xl">In the house</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {property.features.map((feature) => (
                <li key={feature} className="border-t border-line pt-3 text-sm">
                  {feature}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-7 text-muted">{property.tenure}</p>
            <h2 className="mt-12 font-display text-3xl">On the Ghana map</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{property.place}, {property.region}.</p>
            <div className="mt-4 border border-line">
              <GhanaMap
                properties={[property]}
                focus={{ lat: property.lat, lng: property.lng, zoom: 14 }}
                highlight={property.region}
                className="h-[360px]"
              />
            </div>
            {property.status === "let" ? (
              <p className="mt-10 text-sm leading-7 text-muted">
                Lettings are paid as rent. The mortgage sketch is for purchases.{" "}
                <Link href="/mortgage" className="text-gold">Open the calculator</Link> if you are weighing a buy against this let.
              </p>
            ) : (
              <div className="mt-12">
                <h2 className="font-display text-3xl">A monthly sketch</h2>
                <p className="mt-3 mb-5 text-sm leading-7 text-muted">
                  {property.status === "offplan"
                    ? "Off-plan payments are usually staged. This sketch treats the guide price as if it were borrowed in one sum, so you can see the scale. It is not the developer's schedule."
                    : "Move the deposit and the rate. Then ask a bank for a sanction letter before you treat the figure as real."}
                </p>
                <MortgageCalculator initialPrice={property.priceGhs} />
              </div>
            )}
          </div>
          <aside className="h-fit space-y-4 lg:sticky lg:top-24">
            <EnquiryCard title={property.title} />
            {agent ? (
              <div className="border border-line bg-paper p-5">
                <p className="text-[0.72rem] tracking-[0.18em] text-gold uppercase">Your agent</p>
                <p className="mt-3 font-display text-3xl">{agent.name}</p>
                <p className="text-sm text-muted">{agent.role}</p>
                <p className="mt-3 text-sm leading-6">{agent.focus}</p>
                <a href={`tel:${tel}`} className="mt-4 block text-sm text-gold">{phone}</a>
                <a
                  href={whatsappHref(`Good day. I am enquiring about ${property.title} (${property.ref}).`)}
                  className="mt-2 block text-sm text-gold"
                >
                  WhatsApp the showroom
                </a>
              </div>
            ) : null}
          </aside>
        </div>
      </Container>
      {similar.length ? (
        <section className="border-t border-line py-16">
          <Container>
            <h2 className="font-display text-4xl">Others you might walk</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {similar.map((item) => (
                <PropertyCard key={item.slug} property={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">{label}</dt>
      <dd className="mt-2 font-display text-2xl leading-tight">{value}</dd>
    </div>
  );
}
