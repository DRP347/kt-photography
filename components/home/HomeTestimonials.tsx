import Link from "next/link";
import { ClientReview } from "@/components/editorial/ClientReview";
import { googleReviews } from "@/data/googleReviews";
import "@/styles/client-reviews.css";
import styles from "./HomeTestimonials.module.css";
import typeStyles from "@/styles/reading-typography.module.css";

export function HomeTestimonials() {
  return <section id="home-testimonials" className={styles.preview} aria-labelledby="home-testimonials-title">
    <div className={styles.heading}>
      <p className="type-kicker">Testimonials</p>
      <h2 id="home-testimonials-title" className={typeStyles.sectionTitle}>Kind words</h2>
    </div>
    <ClientReview review={googleReviews[1]} className={styles.review} />
    <Link className={`text-link ${styles.all}`} href="/testimonials">All testimonials</Link>
  </section>;
}
