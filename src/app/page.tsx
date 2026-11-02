import Image from "next/image";
import Link from "next/link";
import { Container, Kicker, SectionHeading } from "@/components/container";
import { GhanaMap } from "@/components/ghana-map";
import { Money } from "@/components/price";
import { PropertyCard } from "@/components/property-card";
import { SearchPanel } from "@/components/search-panel";
import { articles, getProperty, neighborhoods, properties, regionCounts, testimonials } from "@/lib/data";
import { formatArea, statusLabel } from "@/lib/format";

export const metadata = {
  title: { absolute: "Grace Karen Homes · Private brokerage in Ghana" },
  description:
    "Homes with grace, across Ghana. A private brokerage for East Legon, Cantonments, Kumasi, the coast, and the regions.",
};

const steps = [
  ["01", "Listen", "Budget, schools, security, and how many years you mean to stay. Then a short list, not a portal dump."],
  ["02", "Search the title", "Site plan, the seller's document, and a Lands Commission search read with your lawyer before a deposit."],
  ["03", "Walk the house", "In daylight, at the hour you would actually live there. We say what the street is like."],
  ["04", "Close with care", "Negotiation, then completion. The desk still answers the phone after the keys."],
];

export default function HomePage() {
  const lead = getProperty("trasacco-valley-house");
  const selected = properties.filter((property) => property.featured && property.slug !== lead?.slug);
  const guides = neighborhoods.filter((neighborhood) => neighborhood.guide);
  const fig = getProperty("the-fig-garden");
  const counts = regionCounts().filter((region) => region.count > 0);

  return (
    <>
      <section className="pt-10 pb-6 md:pt-16">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Kicker>Private brokerage · Accra</Kicker>
              <h1 className="mt-4 font-display text-[3.15rem] leading-[0.92] font-medium tracking-tight text-ink sm:text-7xl lg:text-[5.2rem]">
                Homes with grace, <span className="text-pine italic">across Ghana.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-muted md:text-lg">
                Grace Karen Homes is a private desk for people who want the right street, a clean title, and a house that will still feel considered in twenty years.
              </p>
            </div>
            <figure className="relative aspect-[4/3] overflow-hidden bg-pine lg:col-span-6 lg:aspect-[5/4]">
              <Image
                src="/images/hero.jpg"
                alt="Aerial photograph of a leafy residential neighbourhood with detached houses, mature trees, and a wide road"
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/85 to-transparent p-5 text-sm leading-6 text-ivory">
                The standard we hold a street to: trees, room between houses, and a life that is not spent entirely in the car.
              </figcaption>
            </figure>
          </div>
          <div className="mt-8">
            <SearchPanel />
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-line py-6 md:grid-cols-4">
            <Stat value={String(properties.length)} label="Residences on the book" />
            <Stat value={String(counts.length)} label="Regions with a house listed" />
            <Stat value="16" label="Regions the map will open" />
            <Stat value="30%" label="Deposit we sketch, not a bank offer" />
          </dl>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading kicker="Selected" title="Residences we would walk first.">
              A short list from the current book. Prices are asking figures. Availability is confirmed when you book the viewing.
            </SectionHeading>
            <Link href="/properties" className="text-sm text-gold">
              All homes
            </Link>
          </div>
          {lead ? (
            <article className="mt-10 grid border border-line bg-paper lg:grid-cols-12">
              <Link href={`/properties/${lead.slug}`} className="relative min-h-[320px] lg:col-span-7">
                <Image src={lead.images[0]} alt="" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
              </Link>
              <div className="flex flex-col justify-between p-6 md:p-10 lg:col-span-5">
                <div>
                  <p className="text-[0.72rem] tracking-[0.2em] text-gold uppercase">
                    {statusLabel(lead.status)} · {lead.neighborhood}
                  </p>
                  <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
                    <Link href={`/properties/${lead.slug}`}>{lead.title}</Link>
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted">{lead.summary}</p>
                </div>
                <div className="mt-8">
                  <Money ghs={lead.priceGhs} status={lead.status} className="font-display text-4xl" />
                  <p className="mt-2 text-sm text-muted">
                    {lead.beds} beds · {lead.baths} baths · {formatArea(lead.sqm)}
                  </p>
                  <Link href={`/properties/${lead.slug}`} className="mt-6 inline-flex bg-forest px-5 py-3 text-sm text-ivory">
                    View the house
                  </Link>
                </div>
              </div>
            </article>
          ) : null}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {selected.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-forest text-ivory">
        <Container className="grid items-center gap-10 py-16 lg:grid-cols-12 md:py-20">
          <div className="lg:col-span-4">
            <SectionHeading kicker="The Ghana map" title="Sixteen regions. One desk." light>
              Pins mark the houses on the book. Move from Accra to Tamale without losing the street.
            </SectionHeading>
            <ul className="mt-6 space-y-2 text-sm text-ivory/80">
              {counts.map((region) => (
                <li key={region.name} className="flex justify-between border-b border-white/10 py-2">
                  <Link href={`/map?region=${encodeURIComponent(region.name)}`} className="hover:text-brass">
                    {region.name}
                  </Link>
                  <span>{region.count}</span>
                </li>
              ))}
            </ul>
            <Link href="/map" className="mt-6 inline-flex bg-brass px-5 py-3 text-sm text-forest">
              Open the map
            </Link>
          </div>
          <div className="border border-brass/40 lg:col-span-8">
            <GhanaMap properties={properties} className="h-[480px] md:h-[560px]" />
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading kicker="Streets" title="Neighbourhoods, said plainly.">
            Who a street is for, and the trade-off we will not hide in the brochure.
          </SectionHeading>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((neighborhood) => {
              const image = properties.find((property) => property.neighborhoodSlug === neighborhood.slug)?.images[0];
              const count = properties.filter((property) => property.neighborhoodSlug === neighborhood.slug).length;
              return (
                <Link key={neighborhood.slug} href={`/neighborhoods/${neighborhood.slug}`} className="group border border-line bg-paper">
                  <div className="relative aspect-[16/10] overflow-hidden bg-pine">
                    {image ? <Image src={image} alt="" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" /> : null}
                  </div>
                  <div className="p-5">
                    <p className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">{neighborhood.region}</p>
                    <h3 className="mt-2 font-display text-3xl">{neighborhood.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{neighborhood.standfirst}</p>
                    <p className="mt-4 text-sm text-ink">{count} on the book</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-paper py-16 md:py-24">
        <Container>
          <SectionHeading kicker="The practice" title="How a purchase moves." />
          <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([number, title, copy]) => (
              <li key={number}>
                <p className="font-display text-4xl text-gold">{number}</p>
                <h3 className="mt-3 font-display text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{copy}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {fig ? (
        <section className="py-16 md:py-24">
          <Container className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/3] bg-pine">
              <Image src={fig.images[0]} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <Kicker>Off-plan · Adjiringanor</Kicker>
              <h2 className="mt-3 font-display text-5xl leading-tight">{fig.title}</h2>
              <p className="mt-4 text-base leading-8 text-muted">{fig.summary}</p>
              <Money ghs={fig.priceGhs} status={fig.status} className="mt-6 block font-display text-4xl" />
              <Link href={`/properties/${fig.slug}`} className="mt-6 inline-flex border border-forest px-5 py-3 text-sm hover:bg-forest hover:text-ivory">
                Read the terms
              </Link>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-ivory pb-8">
        <Container>
          <div className="grid gap-10 border-t border-line pt-16 lg:grid-cols-3">
            {testimonials.map((note) => (
              <blockquote key={note.name}>
                <p className="font-display text-2xl leading-snug text-ink">“{note.quote}”</p>
                <footer className="mt-4 text-sm text-muted">
                  {note.name} · {note.place}
                </footer>
              </blockquote>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading kicker="Journal" title="Notes from the desk." />
            <Link href="/journal" className="text-sm text-gold">
              All notes
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {articles.map((article) => (
              <Link key={article.slug} href={`/journal/${article.slug}`} className="group">
                <div className="relative aspect-[16/10] overflow-hidden bg-pine">
                  <Image src={article.image} alt="" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                </div>
                <p className="mt-4 text-[0.68rem] tracking-[0.16em] text-gold uppercase">{article.date}</p>
                <h3 className="mt-2 font-display text-3xl leading-tight group-hover:text-pine">{article.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{article.dek}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="grid gap-8 bg-forest px-6 py-12 text-ivory md:grid-cols-[1.4fr_1fr] md:px-12">
            <div>
              <Kicker light>If the house is yours</Kicker>
              <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Offer it to the desk, or ask what a purchase would cost each month.</h2>
            </div>
            <div className="flex flex-col justify-end gap-3">
              <Link href="/sell" className="bg-brass px-5 py-3 text-center text-sm text-forest">
                Offer a house
              </Link>
              <Link href="/mortgage" className="border border-brass/60 px-5 py-3 text-center text-sm text-ivory">
                Sketch a mortgage
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-display text-4xl text-ink">{value}</dt>
      <dd className="mt-1 text-sm leading-5 text-muted">{label}</dd>
    </div>
  );
}
