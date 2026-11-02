import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/container";
import { articles } from "@/lib/data";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return { title: "Journal" };
  return { title: article.title, description: article.dek };
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="px-6 py-24 text-muted">Opening the note…</div>}>
      <ArticleContent params={params} />
    </Suspense>
  );
}

async function ArticleContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <Container className="py-14 md:py-20">
      <Link href="/journal" className="text-sm text-muted hover:text-ink">Journal</Link>
      <p className="mt-6 text-[0.72rem] tracking-[0.2em] text-gold uppercase">{article.date}</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.98] md:text-6xl">{article.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{article.dek}</p>
      <figure className="relative mt-8 aspect-[16/8] max-w-4xl bg-pine">
        <Image src={article.image} alt={article.imageAlt} fill priority sizes="(min-width: 768px) 896px, 100vw" className="object-cover" />
      </figure>
      <div className="mt-10 max-w-2xl">
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="mt-5 text-lg leading-8 first:mt-0">
            {paragraph}
          </p>
        ))}
        <p className="mt-10 text-sm leading-7 text-muted">
          This is a desk note, not legal advice and not a loan offer. For a house, start with the book. For a question, call the showroom.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/properties" className="bg-forest px-5 py-3 text-sm text-ivory">See the homes</Link>
          <Link href="/contact" className="border border-forest px-5 py-3 text-sm">Contact</Link>
        </div>
      </div>
    </Container>
  );
}
