"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { ghanaRegions } from "@/lib/data";
import { fieldClass, labelClass } from "./container";

export function SearchPanel() {
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    for (const [key, value] of data.entries()) {
      const text = String(value).trim();
      if (text && text !== "any") params.set(key, text);
    }
    const query = params.toString();
    router.push(query ? `/properties?${query}` : "/properties");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 border border-line bg-paper p-4 shadow-[0_24px_50px_-36px_rgba(16,36,28,0.55)] md:grid-cols-12 md:p-5">
      <label className="md:col-span-4">
        <span className={labelClass}>Where</span>
        <input name="q" placeholder="Neighbourhood, city, or house" className={fieldClass} />
      </label>
      <label className="md:col-span-3">
        <span className={labelClass}>Region</span>
        <select name="region" defaultValue="any" className={fieldClass}>
          <option value="any">All Ghana</option>
          {ghanaRegions.map((region) => (
            <option key={region.name} value={region.name}>
              {region.name}
            </option>
          ))}
        </select>
      </label>
      <label className="md:col-span-2">
        <span className={labelClass}>Intention</span>
        <select name="status" defaultValue="any" className={fieldClass}>
          <option value="any">Any</option>
          <option value="sale">For sale</option>
          <option value="let">To let</option>
          <option value="offplan">Off-plan</option>
        </select>
      </label>
      <label className="md:col-span-1">
        <span className={labelClass}>Beds</span>
        <select name="beds" defaultValue="any" className={fieldClass}>
          <option value="any">Any</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </label>
      <div className="flex items-end md:col-span-2">
        <button type="submit" className="w-full bg-forest px-4 py-3 text-sm text-ivory hover:bg-pine">
          Search the book
        </button>
      </div>
    </form>
  );
}
