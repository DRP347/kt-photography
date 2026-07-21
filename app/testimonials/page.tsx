import type { Metadata } from "next";
import { BookingRoom } from "@/components/editorial/BookingRoom";
import { TestimonialCarousel } from "@/components/editorial/TestimonialCarousel";
import { FooterArchive } from "@/components/layout/FooterArchive";
import { testimonials } from "@/data/archive";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kind Words",
  description: "Kind words from couples who trusted KT Photography with their wedding days.",
  alternates: {
    canonical: absoluteUrl("/testimonials")
  }
};

export default function TestimonialsPage() {
  return (
    <>
      <main id="main" className="testimonials-page testimonials-page--focused">
        <TestimonialCarousel items={testimonials} />

        <BookingRoom />
      </main>
      <FooterArchive />
    </>
  );
}
