import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { legalLastUpdated, termsSections } from "@/data/legalPages";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Website terms for using the KT Photography portfolio, enquiry and contact pages.",
  alternates: {
    canonical: absoluteUrl("/terms")
  }
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      kicker="Website terms"
      intro="A clear distinction between using this website and confirming a wedding photography or filmmaking booking."
      lastUpdated={legalLastUpdated}
      sections={termsSections}
    />
  );
}
