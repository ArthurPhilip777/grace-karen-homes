import Image from "next/image";
import Link from "next/link";
import { Container, Kicker } from "@/components/container";

export const metadata = {
  title: "The desk",
  description: "How Grace Karen Homes works a purchase, a letting, and a title in Ghana.",
};

const steps = [
  ["A conversation", "Budget, the school run, security, and the number of years you mean to stay."],
  ["A short list", "Three houses that fit, including the one we think you should refuse."],
  ["A daylight walk", "At the hour the street is itself. Photographs are not the viewing."],
  ["A search", "Lands Commission, your lawyer, and no serious deposit while that is still a promise."],
  ["A close", "Negotiation, then completion. We remain reachable after the keys."],
];

export default function AboutPage() {
  return (
    <Container className="py-14 md:py-20">
      <Kicker>The desk</Kicker>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] md:text-7xl">A private brokerage for buying well in Ghana.</h1>
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-lg leading-8">
            Grace Karen Homes keeps a small book on purpose. Accra is full of keys. It is short of people who will tell you the aircraft noise is real, the road to Aburi is not a commute, and the indenture is not a search.
          </p>
          <p className="mt-4 text-base leading-8 text-muted">
            The showroom is in East Legon. Yaw keeps the Kumasi desk and the regions: Ashanti, the coast, Tamale. Lettings are Adwoa&apos;s, with a written inventory. Purchases on the old Accra plots are Kwesi&apos;s. Grace still walks the houses she would put her own name against.
          </p>
          <p className="mt-4 text-base leading-8 text-muted">
            We are not a substitute for your lawyer, and we will not invent a licence number to decorate a footer. If you want a house this week, call. If you want thirty options by breakfast, another firm will enjoy that brief more than we will.
          </p>
        </div>
        <figure className="relative aspect-[4/3] bg-pine lg:col-span-5">
          <Image
            src="/images/hero.jpg"
            alt="Aerial view of a tree-lined residential neighbourhood"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </figure>
      </div>
      <ol className="mt-16 grid gap-8 md:grid-cols-5">
        {steps.map(([title, copy], index) => (
          <li key={title}>
            <p className="font-display text-3xl text-gold">0{index + 1}</p>
            <h2 className="mt-2 font-display text-2xl">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
          </li>
        ))}
      </ol>
      <div className="mt-16 grid gap-6 border border-line bg-paper p-6 md:grid-cols-3 md:p-10">
        <div>
          <h2 className="font-display text-3xl">What we will not rush</h2>
        </div>
        <p className="text-sm leading-7 text-muted">A deposit before a search. A price we have not sense-checked against the street. A letting without an inventory that matches the rooms.</p>
        <p className="text-sm leading-7 text-muted">An off-plan rendering sold as a finished house. A region described as if it were a suburb of Cantonments.</p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/agents" className="bg-forest px-5 py-3 text-sm text-ivory">Meet the desk</Link>
        <Link href="/contact" className="border border-forest px-5 py-3 text-sm">Book a viewing</Link>
      </div>
    </Container>
  );
}
