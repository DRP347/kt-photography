import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { cookieSections, legalLastUpdated } from "@/data/legalPages";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "The current cookie and embedded-media position for the KT Photography website.",
  alternates: {
    canonical: absoluteUrl("/cookies")
  }
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      kicker="Cookies"
      intro="A technology-specific policy based on the current site audit, without adding a banner the implementation does not need yet."
      lastUpdated={legalLastUpdated}
      sections={cookieSections}
    />
  );
}
