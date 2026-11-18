"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import type { Story } from "@/data/archive";

type StoriesBentoSliderProps = { stories: Story[] };
const SWIPE_THRESHOLD = 42;

function storyImage(story: Story, index: number) {
  return story.gallery[(index * 2) % Math.max(story.gallery.length, 1)] ?? story.cover ?? story.hero;
}

export function StoriesBentoSlider({ stories }: StoriesBentoSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const activeStory = stories[activeIndex];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const move = useCallback((direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + stories.length) % stories.length);
  }, [stories.length]);

  if (!activeStory) return null;

  const visibleStories = [-1, 0, 1].map((offset) => {
    const index = (activeIndex + offset + stories.length) % stories.length;
    return { index, offset, story: stories[index], image: storyImage(stories[index], index) };
  });

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) >= SWIPE_THRESHOLD) move(distance > 0 ? -1 : 1);
  };

  return (
    <section
      className={`stories-slider ${reducedMotion ? "stories-slider--reduced-motion" : ""}`}
      aria-roledescription="carousel"
      aria-label="Selected KT wedding stories"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
    >
      <div className="stories-slider__stage" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
        <div className="stories-slider__rail">
          {visibleStories.map(({ index, offset, story, image }) => (
            <article className={`stories-slider__story ${offset === 0 ? "is-active" : ""}`} key={`${story.slug}-${offset}`}>
              <Link href={`/stories/${story.slug}`} className="stories-slider__story-link" aria-label={`View ${story.coupleName} story`}>
                <figure className="stories-slider__frame">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={offset === 0}
                    sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 48vw, 52vw"
                  />
                </figure>
                <div className="stories-slider__story-caption">
                  <p>{story.category}</p>
                  <h3>{story.coupleName}</h3>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="stories-slider__meta">
        <Link className="stories-slider__name type-couple" href={`/stories/${activeStory.slug}`}>
          {activeStory.coupleName}
        </Link>
        <div className="stories-slider__controls" aria-label="Story controls">
          <button type="button" onClick={() => move(-1)} aria-label={`Previous story, currently ${activeStory.coupleName}`}>
            Previous
          </button>
          <span aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}</span>
          <button type="button" onClick={() => move(1)} aria-label={`Next story, currently ${activeStory.coupleName}`}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
