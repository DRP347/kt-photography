export type WeddingEnquiry = {
  coupleNames: string;
  phone: string;
  date: string;
  cityVenue: string;
  events: string[];
  details: string;
};

export function buildWhatsAppEnquiryUrl(number: string, enquiry: WeddingEnquiry) {
  const recipient = number.replace(/[^\d]/g, "");
  if (!recipient) return null;
  const message = [
    "Hello KT Photography,", "",
    `Couple names: ${enquiry.coupleNames}`,
    `Phone: ${enquiry.phone}`,
    `Wedding date: ${enquiry.date}`,
    `City / venue: ${enquiry.cityVenue}`,
    `Events: ${enquiry.events.join(", ")}`,
    `Anything we should know: ${enquiry.details || "Not shared"}`
  ].join("\n");
  return `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
}
