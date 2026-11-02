import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">404</p>
      <h1 className="mt-3 max-w-xl font-display text-5xl leading-tight md:text-6xl">This page is not on the book.</h1>
      <p className="mt-4 max-w-lg text-base leading-7 text-muted">The house may have changed hands, or the address was never ours. The map and the catalogue are still here.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/properties" className="bg-forest px-5 py-3 text-sm text-ivory">
          Browse homes
        </Link>
        <Link href="/map" className="border border-forest px-5 py-3 text-sm">
          Open the Ghana map
        </Link>
      </div>
    </Container>
  );
}
