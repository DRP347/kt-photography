import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { StoriesHeroSlideshow } from "@/components/editorial/StoriesHeroSlideshow";
import { FooterArchive } from "@/components/layout/FooterArchive";
import { coupleStoryManifests, stories, storiesHeroSlides, storyDisplayOrder } from "@/data/archive";
import { getCuratedStory } from "@/data/storyCuration";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wedding Stories",
  description: "A living archive of real wedding stories photographed by KT Photography.",
  alternates: {
    canonical: absoluteUrl("/stories")
  }
};

const orderedStories = [
  ...storyDisplayOrder
    .map((slug) => stories.find((story) => story.slug === slug))
    .filter((story): story is (typeof stories)[number] => Boolean(story)),
  ...stories.filter((story) => !storyDisplayOrder.includes(story.slug))
].map((story) => getCuratedStory(story, coupleStoryManifests[story.slug]));

export default function StoriesPage() {
  return (
    <>
      <main id="main" className="stories-index">
        <section className="stories-hero" aria-label="Featured wedding story slideshow">
          <div className="story-container stories-hero__inner">
            <StoriesHeroSlideshow slides={storiesHeroSlides} />
          </div>
        </section>

        <section className="stories-archive" id="story-archive" aria-labelledby="stories-heading">
          <div className="story-container stories-archive__intro">
            <p className="type-kicker">Couple stories</p>
            <h1 id="stories-heading">
              <span>Real wedding stories,</span>
              {" "}
              <span>held close.</span>
            </h1>
          </div>
          <div className="story-container stories-archive__grid">
            {orderedStories.map((story) => (
              <article className="stories-archive-card" key={story.slug}>
                <Link
                  className="stories-archive-card__link"
                  href={`/stories/${story.slug}`}
                  aria-label={`View ${story.coupleName} story`}
                >
                  <span className="stories-archive-card__image">
                    <Image
                      src={story.cover.src}
                      alt={story.cover.alt}
                      fill
                      sizes="(max-width: 700px) calc(100vw - 50px), (max-width: 1100px) calc((100vw - 88px) / 2), 360px"
                      style={
                        {
                          "--crop-desktop": story.cover.cropDesktop ?? story.cover.objectPosition ?? "50% 50%",
                          "--crop-tablet": story.cover.cropTablet ?? story.cover.cropDesktop ?? story.cover.objectPosition ?? "50% 50%",
                          "--crop-mobile": story.cover.cropMobile ?? story.cover.cropTablet ?? story.cover.cropDesktop ?? story.cover.objectPosition ?? "50% 50%"
                        } as CSSProperties
                      }
                    />
                  </span>
                  <span className="stories-archive-card__name type-couple">{story.coupleName}</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <FooterArchive />
    </>
  );
}
