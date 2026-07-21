import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/ContactPageContent";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Check Date",
  description: "Contact KT Photography to check wedding, pre-wedding, film and event availability.",
  alternates: {
    canonical: absoluteUrl("/contact")
  }
};

export default function ContactPage() {
  return <ContactPageContent />;
}
