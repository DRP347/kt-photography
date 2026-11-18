"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { ImageAsset } from "@/data/archive";
import { ArchivePhoto } from "@/components/rebuild/ArchivePhoto";
import { Reveal } from "@/components/motion/Reveal";
import { useHeaderHeight } from "./useHeaderHeight";
import { useLoopCarousel } from "./useLoopCarousel";

type Story = { slug: string; coupleName: string; cover: ImageAsset };
export function StoriesSlider({ stories }: { stories: Story[] }) {
  const { viewportRef, active, visible, onKeyDown } = useLoopCarousel();
  const header = useHeaderHeight();
  return <section id="our-stories" className="selected-stories site-rail" aria-labelledby="selected-stories-title" style={{ "--measured-header": header ? `${header}px` : undefined } as CSSProperties}>
    <Reveal><div className="stories-heading">
      <h2 id="selected-stories-title">Enter the moments <span>that stayed.</span></h2>
      <Link className="stories-explore" href="/stories">Explore stories</Link>
    </div></Reveal>
    <p id="stories-help" className="sr-only">Swipe, drag, scroll horizontally or use Shift + mousewheel to browse. Use arrow keys, Home or End. Select a photograph or name to read the story.</p>
    <Reveal className="stories-gallery-reveal"><div className="stories-viewport" ref={viewportRef} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Our wedding stories" aria-describedby="stories-help" onKeyDown={onKeyDown}>
      <div className="stories-slider">
        {stories.map((story, index) => <Link key={story.slug} aria-label={`View ${story.coupleName} story`} tabIndex={visible.includes(index) ? 0 : -1} className={`home-story home-story--${story.cover.orientation}${story.slug === "saurav-khushboo" ? " home-story--bordered-source" : ""}`} href={`/stories/${story.slug}`}>
          <span className="home-story__photo"><ArchivePhoto image={story.cover} sizes="(max-width:700px) 82vw, 35vw" /></span><div className="home-story__caption"><h3>{story.coupleName}</h3></div>
        </Link>)}
      </div>
    </div></Reveal>
    <p className="sr-only" aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2,"0")} / {String(stories.length).padStart(2,"0")}</p>
  </section>;
}
