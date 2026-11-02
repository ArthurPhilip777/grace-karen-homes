import { Suspense } from "react";
import { Container } from "@/components/container";
import { MortgageCalculator } from "@/components/mortgage-calculator";

export const metadata = {
  title: "Mortgage sketch",
  description: "An illustrative Ghana mortgage sketch. Not an offer of credit.",
};

export default function MortgagePage() {
  return (
    <Container className="py-14 md:py-20">
      <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">Money</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-tight md:text-6xl">A sketch of the monthly figure.</h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
        Where a Ghanaian bank will lend on a home, the shape is often a large deposit, a shorter term, and a rate that does not resemble a foreign teaser. Move the sliders. Then take the real question to your bank.
      </p>
      <div className="mt-10">
        <Suspense fallback={<div className="h-64 border border-line bg-paper" />}>
          <MortgageCalculator />
        </Suspense>
      </div>
    </Container>
  );
}
