"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { testimonials } from "@/data/archive";
import { normalizeSlideIndex } from "@/lib/slideshow";

type Testimonial = (typeof testimonials)[number];

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] ?? items[0];
  const activeNumber = String(activeIndex + 1).padStart(2, "0");
  const total = String(items.length).padStart(2, "0");

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) => normalizeSlideIndex(current - 1, items.length));
  }, [items.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => normalizeSlideIndex(current + 1, items.length));
  }, [items.length]);

  if (!activeItem) return null;

  return (
    <section className="testimonial-carousel" aria-labelledby="testimonial-carousel-title">
      <div className="testimonial-carousel__image">
        <Image
          src={activeItem.image.src}
          alt={activeItem.image.alt}
          fill
          priority
          sizes="(max-width: 700px) calc(100vw - 32px), 42vw"
          style={{ objectPosition: activeItem.image.objectPosition ?? "50% 50%" }}
        />
      </div>

      <div className="testimonial-carousel__copy">
        <p className="type-kicker">Kind words</p>
        <h1 id="testimonial-carousel-title">What couples remember.</h1>
        <div className="testimonial-carousel__quotes" aria-live="polite">
          {items.map((item, index) => (
            <article
              className={`testimonial-carousel__quote${index === activeIndex ? " is-active" : ""}`}
              key={`${item.couple}-${index}`}
            >
              <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
              <p>{item.couple}</p>
            </article>
          ))}
        </div>
        <p className="testimonial-carousel__counter">{activeNumber} / {total}</p>
        <div className="hero-caption-controls testimonial-carousel__controls" aria-label="Testimonial navigation">
          <button type="button" onClick={goToPrevious} aria-label="Previous testimonial">
            Prev
          </button>
          <span aria-hidden="true" />
          <button type="button" onClick={goToNext} aria-label="Next testimonial">
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
