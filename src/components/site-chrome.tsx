"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { properties } from "@/lib/data";
import { site } from "@/lib/site";
import { CurrencyToggle } from "./price";
import { useSite } from "./site-state";

const links = [
  { href: "/properties", label: "Homes" },
  { href: "/map", label: "Ghana map" },
  { href: "/neighborhoods", label: "Neighbourhoods" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "The desk" },
];

function activeLink(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteChrome() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }
  const { saved, compare, clearCompare, notice } = useSite();
  const compared = properties.filter((property) => compare.includes(property.slug));

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#content"
        className="absolute left-4 top-0 z-[70] -translate-y-full bg-paper px-3 py-2 text-sm text-ink focus:translate-y-4"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-50 bg-forest text-ivory">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-brass/70 font-display text-lg text-brass">
              GK
            </span>
            <span>
              <span className="block font-display text-[1.35rem] leading-none tracking-wide">Grace Karen</span>
              <span className="mt-1 block text-[0.62rem] tracking-[0.28em] text-brass uppercase">Homes</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm xl:flex" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={activeLink(pathname, link.href) ? "page" : undefined}
                className={activeLink(pathname, link.href) ? "text-brass" : "text-ivory/75 hover:text-ivory"}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <CurrencyToggle className="hidden sm:flex" />
            <Link
              href="/saved"
              aria-label={`Saved residences, ${saved.length}`}
              className="relative grid h-10 w-10 place-items-center border border-white/15 hover:border-brass"
            >
              <HeartIcon />
              {saved.length > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center bg-brass px-1 text-[0.65rem] text-forest">
                  {saved.length}
                </span>
              ) : null}
            </Link>
            <Link href="/contact" className="hidden bg-brass px-4 py-2.5 text-sm text-forest hover:bg-ivory md:inline-flex">
              Book a viewing
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center border border-white/15 xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="flex w-4 flex-col gap-1.5">
                <span className="block h-px bg-ivory" />
                <span className="block h-px bg-ivory" />
                <span className="block h-px bg-ivory" />
              </span>
            </button>
          </div>
        </div>
        {open ? (
          <div id="mobile-menu" className="border-t border-white/10 px-5 py-6 xl:hidden">
            <nav className="flex flex-col gap-4" aria-label="Mobile">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="font-display text-3xl text-ivory">
                  {link.label}
                </Link>
              ))}
              <Link href="/agents" className="font-display text-3xl text-ivory">
                Agents
              </Link>
              <Link href="/contact" className="mt-2 inline-flex bg-brass px-4 py-3 text-sm text-forest">
                Book a viewing
              </Link>
            </nav>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-ivory/80">
              <CurrencyToggle />
              <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
            </div>
          </div>
        ) : null}
        <div className="h-px bg-brass/40" />
      </header>
      {compared.length > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-8">
            <div>
              <p className="text-sm text-ink">
                {compared.length} of 3 on the compare list
                {notice ? <span className="text-clay"> · {notice}</span> : null}
              </p>
              <p className="hidden text-sm text-muted md:block">{compared.map((property) => property.title).join(" · ")}</p>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={clearCompare} className="px-3 py-2 text-sm text-muted hover:text-ink">
                Clear
              </button>
              <Link href="/compare" className="bg-forest px-4 py-2 text-sm text-ivory hover:bg-pine">
                Compare
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" />
    </svg>
  );
}
