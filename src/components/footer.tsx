import Link from "next/link";
import { site } from "@/lib/site";

const visit = [
  ["Homes", "/properties"],
  ["Ghana map", "/map"],
  ["Neighbourhoods", "/neighborhoods"],
  ["Journal", "/journal"],
  ["Saved", "/saved"],
  ["Compare", "/compare"],
];

const desk = [
  ["The desk", "/about"],
  ["Agents", "/agents"],
  ["Offer a house", "/sell"],
  ["Mortgage sketch", "/mortgage"],
  ["Contact", "/contact"],
];

export function Footer() {
  return (
    <footer className="bg-forest text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-display text-3xl">Grace Karen Homes</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-ivory/75">
            A private brokerage in Accra, working the established streets and the regions. A short list, a real viewing, and a title search before a deposit.
          </p>
        </div>
        <div className="lg:col-span-2">
          <p className="text-[0.68rem] tracking-[0.2em] text-brass uppercase">Visit</p>
          <ul className="mt-4 space-y-2 text-sm">
            {visit.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-ivory/80 hover:text-ivory">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className="text-[0.68rem] tracking-[0.2em] text-brass uppercase">The desk</p>
          <ul className="mt-4 space-y-2 text-sm">
            {desk.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-ivory/80 hover:text-ivory">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4">
          <p className="text-[0.68rem] tracking-[0.2em] text-brass uppercase">Showrooms</p>
          <p className="mt-4 text-sm leading-7 text-ivory/80">
            {site.accra}
            <br />
            <a href={`tel:${site.phoneTel}`} className="text-ivory hover:text-brass">
              {site.phoneDisplay}
            </a>
          </p>
          <p className="mt-4 text-sm leading-7 text-ivory/80">
            {site.kumasi}
            <br />
            <a href={`tel:${site.kumasiPhoneTel}`} className="text-ivory hover:text-brass">
              {site.kumasiPhoneDisplay}
            </a>
          </p>
          <p className="mt-4 text-sm leading-7 text-ivory/70">{site.hours}</p>
          <a href={`mailto:${site.email}`} className="mt-3 inline-block text-sm text-brass hover:text-ivory">
            {site.email}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl space-y-2 px-5 py-6 text-xs leading-6 text-ivory/55 md:px-8">
          <p>© 2026 Grace Karen Homes. Confirm every price and every availability with the desk before an offer.</p>
          <p>
            {site.rateNote} Mortgage sketches are not an offer of credit. The residences in this catalogue are representative launch instructions. Ask which houses can be viewed this week.
          </p>
        </div>
      </div>
    </footer>
  );
}
