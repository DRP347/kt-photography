import type { Metadata } from "next";
import { BookingRoom } from "@/components/editorial/BookingRoom";
import { ReviewStage } from "@/components/editorial/ReviewStage";
import { EditorialPageFrame } from "@/components/editorial/EditorialPageFrame";
import { FooterArchive } from "@/components/layout/FooterArchive";
import { absoluteUrl } from "@/lib/site";
import "@/styles/client-reviews.css";
import styles from "./testimonials.module.css";
import typeStyles from "@/styles/reading-typography.module.css";

export const metadata: Metadata = {
  title: "Kind Words",
  description: "Read original Google reviews from clients of KT Photography.",
  alternates: { canonical: absoluteUrl("/testimonials") }
};

export default function TestimonialsPage() {
  return <><EditorialPageFrame enquiry={<BookingRoom />}><div className={styles.collection}>
    <header className={styles.intro}><p className="type-kicker">Testimonials</p><h1 className={typeStyles.pageTitle}>Kind words</h1><p className={styles.context}>From our clients, on Google.</p></header>
    <ReviewStage />
  </div></EditorialPageFrame><FooterArchive /></>;
}
