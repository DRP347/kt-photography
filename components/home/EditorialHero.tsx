"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useCallback, useState } from "react";
import { heroAccentMap, homeHeroSlides } from "@/data/homeLanding";
import { normalizeSlideIndex, useHeroAutoplay, usePrefersReducedMotion } from "@/lib/slideshow";

export function EditorialHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = homeHeroSlides;
  const activeSlide = slides[activeIndex] ?? slides[0];
  const activeHref = activeSlide.storyHref ?? "/stories";
  const activeAccent = heroAccentMap[activeSlide.accentTone];
  const activeNumber = String(activeIndex + 1).padStart(2, "0");
  const totalSlides = String(slides.length).padStart(2, "0");

  const prefersReducedMotion = usePrefersReducedMotion();

  const advance = useCallback(() => {
    setActiveIndex((current) => normalizeSlideIndex(current + 1, slides.length));
  }, [slides.length]);

  const { resetAutoplay } = useHeroAutoplay({
    length: slides.length,
    enabled: !prefersReducedMotion,
    onAdvance: advance
  });

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) => normalizeSlideIndex(current - 1, slides.length));
    resetAutoplay();
  }, [resetAutoplay, slides.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => normalizeSlideIndex(current + 1, slides.length));
    resetAutoplay();
  }, [resetAutoplay, slides.length]);

  return (
    <section
      className="editorial-hero hero-section"
      aria-label="Featured KT Photography wedding stories"
      style={{ "--active-slide-accent": activeAccent } as CSSProperties}
    >
      <div className="hero-shell">
        <div className="hero-visual">
          <div className="hero-photo-frame hero-media media-readable">
            {slides.map((slide, index) => (
              <div
                className={`hero-slide${index === activeIndex ? " is-active" : ""}`}
                key={slide.id}
                style={{
                  "--slide-position": slide.objectPosition,
                  "--slide-position-mobile": slide.objectPositionMobile ?? slide.objectPosition
                } as CSSProperties}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) calc(100vw - 1.4rem), 1360px"
                  className="hero-photo"
                />
              </div>
            ))}

            <div className="hero-overlay media-readable-content">
              <div className="hero-caption-controls" aria-label="Featured story navigation">
                <button type="button" onClick={goToPrevious} aria-label="Previous featured wedding">
                  Prev
                </button>
                <span aria-hidden="true" />
                <button type="button" onClick={goToNext} aria-label="Next featured wedding">
                  Next
                </button>
              </div>

              <Link className="hero-caption-copy" href={activeHref}>
                <p className="hero-caption-name type-couple">{activeSlide.coupleName}</p>
                <span className="hero-caption-ornament" aria-hidden="true">
                  <em>{activeNumber} / {totalSlides}</em>
                </span>
              </Link>

              <Link className="hero-story-link hero-caption-action editorial-link editorial-link--light" href={activeHref}>
                <span>{activeSlide.storyHref ? "View story" : "View stories"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
