import type { Currency, Status } from "./types";
import { site } from "./site";

const statusWord: Record<Status, string> = {
  sale: "For sale",
  let: "To let",
  offplan: "Off-plan",
};

export function statusLabel(status: Status) {
  return statusWord[status];
}

export function formatMoney(ghs: number, currency: Currency) {
  const value = currency === "USD" ? ghs / site.rate : ghs;
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
  return currency === "USD" ? `US$${formatted}` : `GH₵${formatted}`;
}

export function formatListing(ghs: number, status: Status, currency: Currency) {
  const base = formatMoney(ghs, currency);
  if (status === "let") return `${base} / month`;
  if (status === "offplan") return `From ${base}`;
  return base;
}

export function formatArea(sqm: number) {
  return `${new Intl.NumberFormat("en-US").format(sqm)} m²`;
}

export function formatPlot(sqm?: number) {
  if (!sqm) return null;
  const acres = sqm / 4046.8564224;
  return `${formatArea(sqm)} · ${acres.toFixed(2)} acres`;
}

export function mortgagePayment(principal: number, annualRate: number, years: number) {
  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;
  if (principal <= 0 || months <= 0) {
    return { monthly: 0, interest: 0, total: 0 };
  }
  if (monthlyRate === 0) {
    const monthly = principal / months;
    return { monthly, interest: 0, total: principal };
  }
  const monthly =
    (principal * monthlyRate * (1 + monthlyRate) ** months) /
    ((1 + monthlyRate) ** months - 1);
  const total = monthly * months;
  return { monthly, interest: total - principal, total };
}
