"use client";

import { useCallback, useRef, useState } from "react";
import type { PointerEvent } from "react";
import type { StoryImage } from "@/data/archive";

type StoryViewerProps = {
  images: StoryImage[];
  coupleName: string;
};

const SWIPE_THRESHOLD = 42;

export function StoryViewer({ images, coupleName }: StoryViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const image = images[activeIndex];

  const move = useCallback((direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + images.length) % images.length);
  }, [images.length]);

  if (!image) return null;

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
      className="story-viewer"
      aria-label={`${coupleName} wedding photographs`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
    >
      <div className="story-viewer__stage" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
        <img src={image.src} alt={image.alt} />
      </div>
      <div className="story-viewer__controls" aria-label="Photograph controls">
        <button type="button" onClick={() => move(-1)} aria-label={`Previous photograph, currently ${activeIndex + 1} of ${images.length}`}>
          Previous
        </button>
        <span aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
        <button type="button" onClick={() => move(1)} aria-label={`Next photograph, currently ${activeIndex + 1} of ${images.length}`}>
          Next
        </button>
      </div>
    </section>
  );
}
