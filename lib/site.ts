export const siteConfig = {
  name: "KT Photography",
  businessName: "KT Photography",
  defaultTitle: "KT Photography - Wedding Photography & Films in Daman",
  defaultDescription:
    "KT Photography is a Daman-based wedding photography and filmmaking studio documenting celebrations across India.",
  url: "https://www.ktphotographydaman.com",
  domain: "www.ktphotographydaman.com",
  apexDomain: "ktphotographydaman.com",
  locale: "en_IN",
  language: "en",
  location: "Daman / Across India",
  email: "",
  phoneDisplay: "+91 99742 66577",
  phoneHref: "tel:+919974266577",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919974266577",
  whatsappHref: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919974266577"}`,
  instagramHref: "https://www.instagram.com/kt_photography_daman/",
  youtubeHref: "https://www.youtube.com/@ktweddingphotography",
  defaultOgImage: "/drive-media/aamir-binish/wedding/aamir-binish-wedding-051.webp",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.ktphotographydaman.com",
  calcomLink: process.env.NEXT_PUBLIC_CALCOM_LINK || "",
  googleVerification: process.env.GOOGLE_SITE_VERIFICATION || "",
  bingVerification: process.env.BING_SITE_VERIFICATION || ""
} as const;

export type NavigationItem = {
  label: string;
  href: string;
  note?: string;
  visible: boolean;
  primaryGroup?: "left" | "right";
};

export const navigationItems: NavigationItem[] = [
  { label: "Stories", href: "/stories", note: "Wedding archives", visible: true, primaryGroup: "left" },
  { label: "Films", href: "/films", note: "Moving memories", visible: true, primaryGroup: "left" },
  { label: "About", href: "/about", note: "Behind KT", visible: true, primaryGroup: "left" },
  { label: "Experience", href: "/experience", note: "How we work", visible: false, primaryGroup: "right" },
  { label: "Testimonials", href: "/testimonials", note: "Kind words", visible: true, primaryGroup: "right" },
  { label: "Check Date", href: "/check-date", note: "Start an enquiry", visible: true, primaryGroup: "right" }
];

export const publicNavigation = navigationItems.filter((item) => item.visible);
export const primaryLeftNavigation = navigationItems.filter(
  (item) => item.visible && item.primaryGroup === "left"
);
export const primaryRightNavigation = navigationItems.filter(
  (item) => item.visible && item.primaryGroup === "right" && item.href !== "/check-date"
);
export const checkDateNavigation = navigationItems.find((item) => item.href === "/check-date" && item.visible);

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.siteUrl).toString();
}
