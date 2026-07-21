import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { legalLastUpdated, privacySections } from "@/data/legalPages";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How KT Photography handles enquiry details, contact information, media delivery and embedded services.",
  alternates: {
    canonical: absoluteUrl("/privacy")
  }
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      kicker="Privacy"
      intro="Plain-language notes on the information this website asks for, how enquiries are handled and which third-party services may be involved."
      lastUpdated={legalLastUpdated}
      sections={privacySections}
    />
  );
}
