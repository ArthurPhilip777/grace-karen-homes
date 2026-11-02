import { Suspense } from "react";
import { PropertyBrowser } from "@/components/property-browser";

export const metadata = {
  title: "Homes",
  description: "Houses, apartments, lettings, and one off-plan block on the Grace Karen Homes book.",
};

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="px-6 py-24 text-muted">Opening the book…</div>}>
      <PropertyBrowser />
    </Suspense>
  );
}
