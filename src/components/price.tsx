"use client";

import { formatListing, formatMoney } from "@/lib/format";
import type { Status } from "@/lib/types";
import { useSite } from "./site-state";

export function Money({
  ghs,
  status,
  className = "",
}: {
  ghs: number;
  status?: Status;
  className?: string;
}) {
  const { currency } = useSite();
  const text = status ? formatListing(ghs, status, currency) : formatMoney(ghs, currency);
  return <span className={className}>{text}</span>;
}

export function MoneyAlt({
  ghs,
  status,
  className = "",
}: {
  ghs: number;
  status?: Status;
  className?: string;
}) {
  const { currency } = useSite();
  const other = currency === "GHS" ? "USD" : "GHS";
  const text = status ? formatListing(ghs, status, other) : formatMoney(ghs, other);
  return <span className={className}>{text}</span>;
}

export function CurrencyToggle({ className = "" }: { className?: string }) {
  const { currency, setCurrency } = useSite();
  return (
    <div className={`flex border border-brass/50 text-[0.68rem] tracking-[0.14em] ${className}`}>
      {(["GHS", "USD"] as const).map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={currency === option}
          onClick={() => setCurrency(option)}
          className={`px-2.5 py-1.5 ${currency === option ? "bg-brass text-forest" : "text-ivory/80 hover:text-ivory"}`}
        >
          {option === "GHS" ? "GH₵" : "US$"}
        </button>
      ))}
    </div>
  );
}
