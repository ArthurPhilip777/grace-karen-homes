"use client";

import dynamic from "next/dynamic";
import type { Property } from "@/lib/types";

const GhanaMapInner = dynamic(() => import("./ghana-map-inner"), {
  ssr: false,
  loading: () => <div className="h-full min-h-64 animate-pulse bg-[#e7e1d6]" />,
});

export function GhanaMap({
  properties,
  className = "h-[520px]",
  focus = null,
  highlight = "",
  onRegion,
  scrollWheelZoom = false,
}: {
  properties: Property[];
  className?: string;
  focus?: { lat: number; lng: number; zoom: number } | null;
  highlight?: string;
  onRegion?: (name: string) => void;
  scrollWheelZoom?: boolean;
}) {
  return (
    <div className={className}>
      <GhanaMapInner
        properties={properties}
        focus={focus}
        highlight={highlight}
        onRegion={onRegion}
        scrollWheelZoom={scrollWheelZoom}
      />
    </div>
  );
}
