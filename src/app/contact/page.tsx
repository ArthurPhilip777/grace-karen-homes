import { Container } from "@/components/container";
import { DeskForm } from "@/components/forms";
import { GhanaMap } from "@/components/ghana-map";
import { site, whatsappHref } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description: "Book a viewing with the Grace Karen Homes showroom in East Legon, or the Kumasi desk.",
};

export default function ContactPage() {
  return (
    <Container className="py-14 md:py-20">
      <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">Contact</p>
      <h1 className="mt-3 font-display text-5xl md:text-7xl">Book a viewing.</h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-base leading-8 text-muted">
            Tell us the house, or the life. We reply by phone on a working day. The form keeps a copy on this browser so you have it even before we speak.
          </p>
          <div className="mt-8">
            <DeskForm
              kind="contact"
              subject="A general enquiry"
              submitLabel="Send the note"
              fields={[
                { name: "name", label: "Name", required: true },
                { name: "phone", label: "Phone", type: "tel", required: true },
                { name: "email", label: "Email", type: "email" },
                { name: "interest", label: "Interest", options: ["Buying", "Letting", "Selling", "Off-plan", "Something else"] },
                { name: "message", label: "What should we know?", type: "textarea", full: true },
              ]}
            />
          </div>
        </div>
        <div>
          <div className="border border-line bg-paper p-6">
            <p className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">Accra</p>
            <p className="mt-2 font-display text-3xl">{site.accra}</p>
            <a href={`tel:${site.phoneTel}`} className="mt-2 block">{site.phoneDisplay}</a>
            <p className="mt-6 text-[0.68rem] tracking-[0.16em] text-gold uppercase">Kumasi</p>
            <p className="mt-2 font-display text-3xl">{site.kumasi}</p>
            <a href={`tel:${site.kumasiPhoneTel}`} className="mt-2 block">{site.kumasiPhoneDisplay}</a>
            <p className="mt-6 text-sm leading-6 text-muted">{site.hours}</p>
            <a href={`mailto:${site.email}`} className="mt-3 block text-sm text-gold">{site.email}</a>
            <a href={whatsappHref("Good day. I would like to book a viewing with Grace Karen Homes.")} className="mt-4 inline-flex border border-forest px-4 py-2 text-sm">
              WhatsApp the showroom
            </a>
          </div>
          <div className="mt-4 border border-line">
            <GhanaMap
              properties={[]}
              focus={{ lat: 5.636, lng: -0.158, zoom: 12 }}
              highlight="Greater Accra"
              className="h-[280px]"
            />
          </div>
          <p className="mt-2 text-xs text-muted">The East Legon showroom, placed on the Ghana map. Call before you drive.</p>
        </div>
      </div>
    </Container>
  );
}
