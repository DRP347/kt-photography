import { BookingAtmosphere } from "@/components/editorial/BookingAtmosphere";
import { CheckDateWorkspace } from "@/components/pages/CheckDateWorkspace";
import { FooterArchive } from "@/components/layout/FooterArchive";

export function ContactPageContent() {
  return (
    <>
      <main id="main" className="contact-page">
        <BookingAtmosphere />
        <CheckDateWorkspace isPreview={process.env.VERCEL_ENV === "preview"} />
      </main>
      <FooterArchive />
    </>
  );
}
