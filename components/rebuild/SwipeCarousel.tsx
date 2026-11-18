"use client";

import { ResilientImage as Image } from "@/components/media/ResilientImage";
import Link from "next/link";
import { useHeaderHeight } from "@/components/home/useHeaderHeight";
import { useLoopCarousel } from "@/components/home/useLoopCarousel";
import { useId, type CSSProperties } from "react";
import type { ImageAsset } from "@/data/archive";

export type CarouselSlide = { id: string; name: string; href: string; image: ImageAsset; mobileImage?: ImageAsset };

export function SwipeCarousel({ slides, label = "Featured wedding stories" }: { slides: CarouselSlide[]; label?: string }) {
  const header = useHeaderHeight();
  const { viewportRef, active, onKeyDown } = useLoopCarousel();
  const help = useId();
  if (!slides.length) return null;
  return <section style={{ "--measured-header": header ? `${header}px` : undefined } as CSSProperties} className="swipe-carousel" aria-label={label} aria-roledescription="carousel">
    <p className="sr-only" id={help}>Swipe, drag, scroll horizontally or use Shift + mousewheel to browse. Use arrow keys, Home or End. Select View story to open the wedding story.</p>
    <div ref={viewportRef} className="swipe-carousel__viewport" tabIndex={0} aria-describedby={help} onKeyDown={onKeyDown}>
      <div className="swipe-carousel__track">
        {slides.map((slide, index) => <article className="swipe-carousel__slide" key={slide.id} aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}: ${slide.name}`} aria-hidden={index !== active}>
          <div className="swipe-carousel__photograph">
            <Image src={slide.image.src} alt={slide.image.alt} fill priority={index === 0} sizes="100vw" draggable={false} className={slide.mobileImage ? "carousel-desktop" : ""} />
            {slide.mobileImage && <Image src={slide.mobileImage.src} alt={slide.mobileImage.alt} fill priority={index === 0} sizes="(max-width: 700px) 96vw, 1px" draggable={false} className="carousel-mobile" />}
          </div>
          <p className="swipe-carousel__name">{slide.name}</p>
          <Link href={slide.href} className="swipe-carousel__story" tabIndex={index === active ? 0 : -1}>View story<span className="sr-only">: {slide.name}</span></Link>
        </article>)}
      </div>
    </div>
    <p className="sr-only" aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</p>
  </section>;
}
