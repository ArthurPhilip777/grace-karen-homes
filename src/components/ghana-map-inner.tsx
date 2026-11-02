"use client";

import { useEffect, useMemo, useState } from "react";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import type { GeoJsonObject, Feature } from "geojson";
import Link from "next/link";
import { compactPlace } from "@/lib/data";
import { statusLabel } from "@/lib/format";
import type { Property } from "@/lib/types";
import { Money } from "./price";
import "leaflet/dist/leaflet.css";

type Focus = { lat: number; lng: number; zoom: number };

function featureName(feature: Feature) {
  const properties = feature.properties as Record<string, unknown> | null;
  const raw = properties?.name ?? properties?.NAME_1 ?? properties?.region ?? properties?.NAME;
  return typeof raw === "string" ? raw : "Ghana";
}

function View({ focus }: { focus: Focus | null }) {
  const map = useMap();
  useEffect(() => {
    if (focus) {
      map.flyTo([focus.lat, focus.lng], focus.zoom, { duration: 0.8 });
      return;
    }
    map.fitBounds(
      [
        [4.6, -3.26],
        [11.18, 1.2],
      ],
      { padding: [18, 18], animate: false },
    );
  }, [focus, map]);
  return null;
}

export default function GhanaMapInner({
  properties,
  focus = null,
  highlight = "",
  onRegion,
  scrollWheelZoom = false,
}: {
  properties: Property[];
  focus?: Focus | null;
  highlight?: string;
  onRegion?: (name: string) => void;
  scrollWheelZoom?: boolean;
}) {
  const [geo, setGeo] = useState<GeoJsonObject | null>(null);
  const icon = useMemo(
    () =>
      L.divIcon({
        className: "gkh-pin",
        html: "<span></span>",
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -10],
      }),
    [],
  );

  useEffect(() => {
    let cancelled = false;
    fetch("/ghana.json")
      .then((response) => (response.ok ? response.json() : null))
      .then((json: GeoJsonObject | null) => {
        if (!cancelled && json) setGeo(json);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <MapContainer
      center={[7.95, -1.02]}
      zoom={6}
      minZoom={5}
      maxZoom={17}
      scrollWheelZoom={scrollWheelZoom}
      maxBounds={[
        [3.8, -4.4],
        [12.3, 2.3],
      ]}
      maxBoundsViscosity={0.85}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <View focus={focus} />
      {geo ? (
        <GeoJSON
          key={`${highlight}-${geo.type}`}
          data={geo}
          style={(feature) => {
            const name = feature ? featureName(feature) : "";
            const active = Boolean(highlight) && compactPlace(name) === compactPlace(highlight);
            return {
              color: active ? "#10241c" : "#7a5a32",
              weight: active ? 2 : 1.2,
              fillColor: active ? "#c6a56a" : "#1c3a2d",
              fillOpacity: active ? 0.28 : 0.08,
            };
          }}
          onEachFeature={(feature, layer) => {
            const name = featureName(feature);
            layer.bindTooltip(name, { sticky: true });
            layer.on("click", () => onRegion?.(name));
          }}
        />
      ) : null}
      {properties.map((property) => (
        <Marker key={property.slug} position={[property.lat, property.lng]} icon={icon}>
          <Popup minWidth={220}>
            <Link href={`/properties/${property.slug}`} className="block text-ink">
              <span className="relative block h-28 overflow-hidden bg-pine">
                {/* Leaflet popups size ordinary images more reliably than the Next image wrapper. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={property.images[0]} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="block px-3 py-3">
                <span className="block text-[0.62rem] tracking-[0.16em] text-gold uppercase">
                  {statusLabel(property.status)} · {property.neighborhood}
                </span>
                <span className="mt-1 block font-display text-xl leading-tight">{property.title}</span>
                <Money ghs={property.priceGhs} status={property.status} className="mt-2 block text-sm" />
              </span>
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
