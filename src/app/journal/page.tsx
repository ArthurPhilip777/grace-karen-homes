import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { articles } from "@/lib/data";

export const metadata = {
  title: "Journal",
  description: "Notes on title, Accra streets, and reading a Ghana mortgage.",
};

export default function JournalPage() {
  const [lead, ...rest] = articles;
  if (!lead) return null;
  return (
    <Container className="py-14 md:py-20">
      <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">Journal</p>
      <h1 className="mt-3 font-display text-5xl md:text-7xl">Notes from the desk.</h1>
      <Link href={`/journal/${lead.slug}`} className="mt-12 grid items-center gap-8 border border-line bg-paper lg:grid-cols-2">
        <div className="relative aspect-[16/10] bg-pine">
          <Image src={lead.image} alt={lead.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="p-6 md:p-10">
          <p className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">{lead.date}</p>
          <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{lead.title}</h2>
          <p className="mt-4 text-base leading-7 text-muted">{lead.dek}</p>
        </div>
      </Link>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {rest.map((article) => (
          <Link key={article.slug} href={`/journal/${article.slug}`} className="border border-line bg-paper">
            <div className="relative aspect-[16/9] bg-pine">
              <Image src={article.image} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="p-5">
              <p className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">{article.date}</p>
              <h2 className="mt-2 font-display text-3xl leading-tight">{article.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{article.dek}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
