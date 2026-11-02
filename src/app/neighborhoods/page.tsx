import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/container";
import { neighborhoods, properties } from "@/lib/data";

export const metadata = {
  title: "Neighbourhoods",
  description: "Plain-spoken guides to the streets Grace Karen Homes works in Ghana.",
};

export default function NeighborhoodsPage() {
  return (
    <Container className="py-14 md:py-20">
      <SectionHeading kicker="Streets" title="Neighbourhoods, said plainly.">
        A street is a life, not a pin. Read who it suits, then see the houses on the book.
      </SectionHeading>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {neighborhoods.map((neighborhood) => {
          const homes = properties.filter((property) => property.neighborhoodSlug === neighborhood.slug);
          const image = homes[0]?.images[0];
          return (
            <Link key={neighborhood.slug} href={`/neighborhoods/${neighborhood.slug}`} className="group grid border border-line bg-paper sm:grid-cols-[180px_1fr]">
              <div className="relative min-h-40 overflow-hidden bg-pine">
                {image ? <Image src={image} alt="" fill sizes="180px" className="object-cover transition duration-700 group-hover:scale-105" /> : null}
              </div>
              <div className="p-5">
                <p className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">
                  {neighborhood.city} · {neighborhood.region}
                </p>
                <h2 className="mt-2 font-display text-3xl">{neighborhood.name}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{neighborhood.standfirst}</p>
                <p className="mt-4 text-sm">{homes.length} on the book</p>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
