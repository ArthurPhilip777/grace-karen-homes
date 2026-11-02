import { Container } from "@/components/container";
import { DeskForm } from "@/components/forms";
import { ghanaRegions } from "@/lib/data";

export const metadata = {
  title: "Offer a house",
  description: "Ask Grace Karen Homes to consider a house, apartment, or plot in Ghana.",
};

export default function SellPage() {
  return (
    <Container className="py-14 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">Instructions</p>
          <h1 className="mt-3 font-display text-5xl leading-tight md:text-6xl">Offer a house to the desk.</h1>
          <p className="mt-5 text-base leading-8 text-muted">
            We take a small number of instructions. Bring the truth of the street, a price you can explain, and whatever papers you already have. We would rather decline than dress a house up.
          </p>
          <ul className="mt-6 space-y-3 text-sm leading-6">
            <li className="border-t border-line pt-3">Site plan, if you have one</li>
            <li className="border-t border-line pt-3">The document you hold the interest under</li>
            <li className="border-t border-line pt-3">Photographs in daylight</li>
            <li className="border-t border-line pt-3">The figure you hope for, and why</li>
          </ul>
        </div>
        <div className="border border-line bg-paper p-5 md:p-8">
          <DeskForm
            kind="valuation"
            subject="A house offered to the desk"
            submitLabel="Send the instruction"
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "phone", label: "Phone", type: "tel", required: true },
              { name: "email", label: "Email", type: "email" },
              { name: "region", label: "Region", options: ghanaRegions.map((region) => region.name) },
              { name: "place", label: "Neighbourhood or town" },
              { name: "kind", label: "What is it?", options: ["House", "Apartment", "Land", "Letting"] },
              { name: "beds", label: "Bedrooms", options: ["1", "2", "3", "4", "5", "6+"] },
              { name: "price", label: "Hopeful price (GH₵)" },
              { name: "message", label: "Anything the photographs will miss", type: "textarea", full: true },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
