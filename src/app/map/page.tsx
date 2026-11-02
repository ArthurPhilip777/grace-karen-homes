import { Suspense } from "react";
import { MapExperience } from "@/components/map-experience";

export const metadata = {
  title: "Ghana map",
  description: "Every Grace Karen Homes residence, placed on a map of Ghana.",
};

export default function MapPage() {
  return (
    <Suspense fallback={<div className="h-[70vh] animate-pulse bg-[#e7e1d6]" />}>
      <MapExperience />
    </Suspense>
  );
}
