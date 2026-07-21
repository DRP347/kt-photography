"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import type { ImageAsset, MemorySlide } from "@/data/archive";
import { HERO_SLIDESHOW_CONFIG, normalizeSlideIndex, usePrefersReducedMotion } from "@/lib/slideshow";

type StoriesHeroSlideshowProps = {
  slides: MemorySlide[];
};

const SWIPE_THRESHOLD = 42;

function preloadImage(src: string) {
  if (typeof window === "undefined") return Promise.resolve(false);

  return new Promise<boolean>((resolve) => {
    const image = new window.Image();
    let settled = false;
    const done = (loaded: boolean) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      resolve(loaded);
    };

    const timer = window.setTimeout(() => done(false), 6000);
    image.decoding = "async";
    image.onload = async () => {
      try {
        if (image.decode) await image.decode();
        done(true);
      } catch {
        done(true);
      }
    };
    image.onerror = () => done(false);
    image.src = src;
  });
}

function StoryImage({
  image,
  priority,
  sizes
}: {
  image: ImageAsset;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      priority={priority}
      loading={priority ? undefined : "lazy"}
      sizes={sizes}
      placeholder="empty"
      unoptimized
      style={
        {
          "--crop-desktop": image.cropDesktop ?? image.objectPosition ?? "50% 50%",
          "--crop-tablet": image.cropTablet ?? image.cropDesktop ?? image.objectPosition ?? "50% 50%",
          "--crop-mobile": image.cropMobile ?? image.cropTablet ?? image.cropDesktop ?? image.objectPosition ?? "50% 50%"
        } as CSSProperties
      }
    />
  );
}

export function StoriesHeroSlideshow({ slides }: StoriesHeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "preparing" | "active">("idle");
  const [direction, setDirection] = useState<1 | -1>(1);
  const prefersReducedMotion = usePrefersReducedMotion();

  const currentIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const autoplayRef = useRef<number | null>(null);
  const transitionRef = useRef<number | null>(null);
  const swipeStartRef = useRef<number | null>(null);
  const scheduleAutoplayRef = useRef<() => void>(() => {});

  const slideCount = slides.length;
  const displayIndex = incomingIndex ?? currentIndex;
  const previousIndex = slideCount ? normalizeSlideIndex(displayIndex - 1, slideCount) : 0;
  const nextIndex = slideCount ? normalizeSlideIndex(displayIndex + 1, slideCount) : 0;

  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current) window.clearTimeout(autoplayRef.current);
    autoplayRef.current = null;
  }, []);

  const navigate = useCallback(
    async (nextDirection: 1 | -1) => {
      if (slideCount < 2 || isTransitioningRef.current) return;

      const targetIndex = normalizeSlideIndex(currentIndexRef.current + nextDirection, slideCount);
      isTransitioningRef.current = true;
      clearAutoplay();

      const [targetReady] = await Promise.all([
        preloadImage(slides[targetIndex].src),
        preloadImage(slides[normalizeSlideIndex(targetIndex - 1, slideCount)].src),
        preloadImage(slides[normalizeSlideIndex(targetIndex + 1, slideCount)].src)
      ]);

      if (!targetReady) {
        isTransitioningRef.current = false;
        scheduleAutoplayRef.current();
        return;
      }

      setDirection(nextDirection);
      setIncomingIndex(targetIndex);
      setPhase("preparing");

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setPhase("active"));
      });

      if (transitionRef.current) window.clearTimeout(transitionRef.current);
      transitionRef.current = window.setTimeout(() => {
        currentIndexRef.current = targetIndex;
        setCurrentIndex(targetIndex);
        setIncomingIndex(null);
        setPhase("idle");
        isTransitioningRef.current = false;
        scheduleAutoplayRef.current();
      }, prefersReducedMotion ? 0 : HERO_SLIDESHOW_CONFIG.transitionMs);
    },
    [clearAutoplay, prefersReducedMotion, slideCount, slides]
  );

  const scheduleAutoplay = useCallback(() => {
    clearAutoplay();
    if (prefersReducedMotion || slideCount < 2 || document.hidden || isTransitioningRef.current) return;

    autoplayRef.current = window.setTimeout(() => {
      void navigate(1);
    }, HERO_SLIDESHOW_CONFIG.autoplayMs);
  }, [clearAutoplay, navigate, prefersReducedMotion, slideCount]);

  useEffect(() => {
    scheduleAutoplayRef.current = scheduleAutoplay;
  }, [scheduleAutoplay]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (!slideCount) return;

    void preloadImage(slides[previousIndex].src);
    void preloadImage(slides[nextIndex].src);
  }, [nextIndex, previousIndex, slideCount, slides]);

  useEffect(() => {
    if (slideCount < 2) return undefined;

    scheduleAutoplay();
    const handleVisibility = () => {
      if (document.hidden) clearAutoplay();
      else scheduleAutoplay();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      clearAutoplay();
    };
  }, [clearAutoplay, scheduleAutoplay, slideCount]);

  useEffect(() => {
    return () => {
      clearAutoplay();
      if (transitionRef.current) window.clearTimeout(transitionRef.current);
    };
  }, [clearAutoplay]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      void navigate(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      void navigate(1);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    swipeStartRef.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStartRef.current == null) return;
    const distance = event.clientX - swipeStartRef.current;
    swipeStartRef.current = null;

    if (Math.abs(distance) < SWIPE_THRESHOLD) return;
    void navigate(distance > 0 ? -1 : 1);
  };

  const currentSlide = slides[currentIndex];
  const incomingSlide = incomingIndex == null ? null : slides[incomingIndex];
  const previousSlide = slides[previousIndex];
  const nextSlide = slides[nextIndex];

  const centerImages = useMemo(
    () => [
      { key: `current-${currentSlide?.id}`, image: currentSlide, state: incomingSlide ? "exiting" : "current" },
      incomingSlide ? { key: `incoming-${incomingSlide.id}`, image: incomingSlide, state: "incoming" } : null
    ].filter(Boolean) as Array<{ key: string; image: MemorySlide; state: string }>,
    [currentSlide, incomingSlide]
  );

  if (!slideCount) return null;

  return (
    <div
      className="stories-hero__slideshow"
      aria-label="Featured wedding memories"
      data-current={slides[displayIndex]?.id}
      data-previous={previousSlide?.id}
      data-next={nextSlide?.id}
      data-direction={direction}
      data-transitioning={phase !== "idle"}
      data-phase={phase}
      onKeyDown={handleKeyDown}
    >
      <div className="stories-hero__memory" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
        <figure className="stories-hero__preview stories-hero__preview--previous" aria-hidden="true">
          <StoryImage image={previousSlide} sizes="(max-width: 700px) 1px, (max-width: 1023px) 22vw, 20vw" />
        </figure>

        <div className="stories-hero__center">
          {centerImages.map(({ key, image, state }) => (
            <figure
              className={`stories-hero__frame stories-hero__frame--${state}`}
              data-state={state}
              key={key}
              style={{ "--slide-tone": image.dominantTone ?? "#efe8dc" } as CSSProperties}
            >
              <StoryImage
                image={image}
                priority={currentIndex === 0 && state === "current"}
                sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 1023px) 84vw, 72vw"
              />
            </figure>
          ))}
        </div>

        <figure className="stories-hero__preview stories-hero__preview--next" aria-hidden="true">
          <StoryImage image={nextSlide} sizes="(max-width: 700px) 1px, (max-width: 1023px) 22vw, 20vw" />
        </figure>

        <div className="hero-caption-controls stories-hero__caption-controls" aria-label="Featured story navigation">
          <button
            type="button"
            aria-label="Previous story image"
            disabled={phase !== "idle"}
            onClick={() => void navigate(-1)}
          >
            Prev
          </button>
          <span aria-hidden="true" />
          <button
            type="button"
            aria-label="Next story image"
            disabled={phase !== "idle"}
            onClick={() => void navigate(1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
