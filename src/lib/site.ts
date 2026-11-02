export const site = {
  name: "Grace Karen Homes",
  url: "https://gracekarenhomes.com",
  phoneDisplay: "+233 30 296 4410",
  phoneTel: "+233302964410",
  phoneWa: "233302964410",
  email: "desk@gracekarenhomes.com",
  kumasiPhoneDisplay: "+233 32 202 1180",
  kumasiPhoneTel: "+233322021180",
  hours: "Monday to Friday, 8:30 to 17:30. Saturday viewings by appointment.",
  accra: "East Legon showroom, Accra",
  kumasi: "Ahodwo desk, Kumasi",
  rate: 11.65,
  rateNote:
    "Conversions use GH₵11.65 to US$1, the mid-market rate on 1 November 2026. Not a bank dealing rate.",
};

export function whatsappHref(message: string) {
  return `https://wa.me/${site.phoneWa}?text=${encodeURIComponent(message)}`;
}
