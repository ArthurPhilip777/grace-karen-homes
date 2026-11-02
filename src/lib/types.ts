export type Currency = "GHS" | "USD";

export type Status = "sale" | "let" | "offplan";

export type PropertyType =
  | "Villa"
  | "House"
  | "Penthouse"
  | "Townhouse"
  | "Apartment"
  | "Beach house"
  | "Compound"
  | "Duplex";

export type Property = {
  slug: string;
  ref: string;
  title: string;
  status: Status;
  type: PropertyType;
  priceGhs: number;
  beds: number;
  baths: number;
  sqm: number;
  plotSqm?: number;
  neighborhood: string;
  neighborhoodSlug: string;
  city: string;
  region: string;
  place: string;
  lat: number;
  lng: number;
  year: number;
  yearLabel?: string;
  added: string;
  featured: boolean;
  agentId: string;
  images: string[];
  summary: string;
  description: string[];
  features: string[];
  tenure: string;
};

export type Neighborhood = {
  slug: string;
  name: string;
  city: string;
  region: string;
  standfirst: string;
  suited: string;
  tradeoff: string;
  guide: boolean;
};

export type Agent = {
  id: string;
  name: string;
  role: string;
  focus: string;
  bio: string;
  phone: "accra" | "kumasi";
};

export type Article = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
};

export type RegionFocus = {
  name: string;
  center: [number, number];
  zoom: number;
};

export type EnquiryKind = "viewing" | "contact" | "valuation";

export type Enquiry = {
  id: string;
  kind: EnquiryKind;
  at: string;
  payload: Record<string, string>;
};
