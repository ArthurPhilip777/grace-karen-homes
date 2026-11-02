"use client";

import { useMemo, useState } from "react";
import { formatMoney, mortgagePayment } from "@/lib/format";
import { site } from "@/lib/site";
import { fieldClass, labelClass } from "./container";
import { useSite } from "./site-state";

export function MortgageCalculator({ initialPrice = 2500000 }: { initialPrice?: number }) {
  const { currency } = useSite();
  const [price, setPrice] = useState(initialPrice);
  const [deposit, setDeposit] = useState(30);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(22);

  const result = useMemo(() => {
    const loan = Math.max(price - price * (deposit / 100), 0);
    return { loan, ...mortgagePayment(loan, rate, years) };
  }, [price, deposit, years, rate]);

  const other = currency === "GHS" ? "USD" : "GHS";

  return (
    <div className="border border-line bg-paper p-5 md:p-7">
      <div className="grid gap-5 md:grid-cols-2">
        <label>
          <span className={labelClass}>Price (GH₵)</span>
          <input
            type="number"
            min={0}
            step={1000}
            value={price}
            onChange={(event) => setPrice(Number(event.target.value) || 0)}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>Deposit {deposit}%</span>
          <input type="range" min={10} max={70} value={deposit} onChange={(event) => setDeposit(Number(event.target.value))} className="mt-3 w-full accent-forest" />
        </label>
        <label>
          <span className={labelClass}>Years {years}</span>
          <input type="range" min={5} max={25} value={years} onChange={(event) => setYears(Number(event.target.value))} className="mt-3 w-full accent-forest" />
        </label>
        <label>
          <span className={labelClass}>Interest {rate}%</span>
          <input type="range" min={8} max={35} step={0.5} value={rate} onChange={(event) => setRate(Number(event.target.value))} className="mt-3 w-full accent-forest" />
        </label>
      </div>
      <div className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
        <Stat label="Each month" value={formatMoney(result.monthly, currency)} hint={formatMoney(result.monthly, other)} />
        <Stat label="Amount borrowed" value={formatMoney(result.loan, currency)} hint={formatMoney(result.loan, other)} />
        <Stat label="Interest over the term" value={formatMoney(result.interest, currency)} hint={formatMoney(result.interest, other)} />
      </div>
      <div className="mt-6 h-2 bg-line" aria-hidden>
        <div
          className="h-full bg-forest"
          style={{ width: result.total ? `${Math.min(100, (result.loan / result.total) * 100)}%` : "0%" }}
        />
      </div>
      <p className="mt-2 text-xs text-muted">The dark share is principal. The rest of the bar is interest.</p>
      <p className="mt-4 text-sm leading-6 text-muted">
        A sketch only. Ghanaian bank offers, where available, depend on the borrower, the property, and the week. {site.rateNote} This is not an offer of credit.
      </p>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div>
      <p className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">{label}</p>
      <p className="mt-2 font-display text-3xl">{value}</p>
      <p className="mt-1 text-sm text-muted">{hint}</p>
    </div>
  );
}
