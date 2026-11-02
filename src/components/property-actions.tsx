"use client";

import { useState } from "react";
import { useSite } from "./site-state";

export function PropertyActions({ slug, title }: { slug: string; title: string }) {
  const { isSaved, toggleSaved, isCompared, toggleCompare } = useSite();
  const [copied, setCopied] = useState(false);
  const saved = isSaved(slug);
  const compared = isCompared(slug);

  async function share() {
    const url = window.location.href;
    const payload = { title, url };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" aria-pressed={saved} onClick={() => toggleSaved(slug)} className={`px-3 py-2 text-sm ${saved ? "bg-forest text-ivory" : "border border-line"}`}>
        {saved ? "Saved" : "Save"}
      </button>
      <button type="button" aria-pressed={compared} onClick={() => toggleCompare(slug)} className={`px-3 py-2 text-sm ${compared ? "bg-forest text-ivory" : "border border-line"}`}>
        {compared ? "On the list" : "Compare"}
      </button>
      <button type="button" onClick={share} className="border border-line px-3 py-2 text-sm">
        {copied ? "Link copied" : "Share"}
      </button>
    </div>
  );
}
