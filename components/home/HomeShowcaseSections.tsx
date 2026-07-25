"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { films, getPublicStorySlug, stories, testimonials } from "@/data/archive";

type StoryFrame = {
  src: string;
  alt: string;
  coupleName: string;
  href: string;
  objectPosition: string;
  line: string;
};

const storyFrames: StoryFrame[] = stories.slice(0, 7).map((story, index) => {
  const image = story.gallery[index * 2] ?? story.hero;
  return {
    src: image.src,
    alt: image.alt,
    coupleName: story.coupleName,
    href: `/stories/${getPublicStorySlug(story.slug)}`,
    objectPosition: image.objectPosition ?? "50% 50%",
    line: story.events.join(" / ") || "Wedding story"
  };
});

const storyLoop = [...storyFrames, ...storyFrames];

const featuredFilm = films.find((film) => film.slug === "sunil-vaishnavi-highlight") ?? films[0];
const aamirTestimonial = testimonials.find((testimonial) => testimonial.couple === "Aamir & Binish") ?? testimonials[0];

export function HomeShowcaseSections() {
  return (
    <>
      <section className="home-stories editorial-section" aria-labelledby="story-reel-title">
        <div className="home-stories__intro home-container">
          <p className="type-kicker">Stories</p>
          <h2 id="story-reel-title" className="type-section-title">
            Enter the moments that stayed.
          </h2>
          <p className="type-body">A small archive of wedding days, chosen for the frames that still feel alive.</p>
          <Link href="/stories" className="editorial-link type-cta">
            <span>Explore stories</span>
          </Link>
        </div>

        <div className="story-marquee" aria-label="Selected KT wedding stories">
          <div className="story-marquee__track">
            {storyLoop.map((frame, index) => (
              <Link
                className="story-card media-readable"
                href={frame.href}
                key={`${frame.href}-${index}`}
              >
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes="(max-width: 768px) 78vw, 28vw"
                  style={{ objectPosition: frame.objectPosition }}
                />
                <span className="story-card__overlay media-readable-content">
                  <span className="story-card__name type-couple">{frame.coupleName}</span>
                  <span className="story-card__line">{frame.line}</span>
                  <span className="editorial-link editorial-link--light type-cta" aria-hidden="true">
                    <span>View story</span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featuredFilm ? (
        <section className="film-transition editorial-section media-readable" aria-labelledby="home-films-title">
          <div className="film-transition__media">
            <Image
              src={featuredFilm.poster.src}
              alt={featuredFilm.poster.alt}
              fill
              sizes="100vw"
              style={{ objectPosition: featuredFilm.poster.objectPosition ?? "50% 50%" }}
            />
            {featuredFilm.localVideoUrl ? (
              <video autoPlay muted loop playsInline preload="metadata" poster={featuredFilm.poster.src} aria-hidden="true">
                <source src={featuredFilm.localVideoUrl} />
              </video>
            ) : null}
          </div>

          <div className="film-transition__content home-container">
            <p className="type-kicker">Films</p>
            <h2 id="home-films-title" className="type-section-title">Films that hold the atmosphere.</h2>
            <p className="type-body">Movement, sound, and the small pauses between the rituals.</p>
            <Link href="/films" className="editorial-link editorial-link--light type-cta">
              <span>Watch films</span>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="founder-note editorial-section" aria-labelledby="founder-note-title">
        <div className="founder-note__inner home-container">
          <article className="founder-note__paper">
            <p className="type-kicker">About KT</p>
            <h2 id="founder-note-title" className="type-section-title">
              Photographs made around people, not poses.
            </h2>
            <div className="founder-note__body">
              <p>
                We are a wedding photography studio based in Daman, documenting celebrations across India.
              </p>
              <p>
                Our work is shaped by relationships, gestures and unplanned moments, so the photographs still feel
                personal when the music has ended.
              </p>
            </div>
            <div className="founder-note__footer">
              <p>
                <span>KT Photography</span>
                <span>Daman / Across India</span>
              </p>
              <Link href="/about" className="editorial-link type-cta">
                <span>About the studio</span>
              </Link>
            </div>
          </article>
          <figure className="founder-note__image image-frame" style={{ "--founder-position": "50% 50%" } as CSSProperties}>
            <Image
              src={stories[2]?.cover.src ?? stories[0]?.cover.src}
              alt={stories[2]?.cover.alt ?? stories[0]?.cover.alt}
              fill
              sizes="(max-width: 768px) 86vw, 26vw"
            />
          </figure>
        </div>
      </section>

      {aamirTestimonial ? (
        <section className="testimonial-pause editorial-section" aria-labelledby="testimonial-title">
          <div className="testimonial-pause__inner home-container">
            <div className="testimonial-pause__copy">
              <p className="type-kicker">Kind words</p>
              <blockquote id="testimonial-title">
                &ldquo;{aamirTestimonial.quote}&rdquo;
              </blockquote>
              <div className="testimonial-pause__meta">
                <span>{aamirTestimonial.couple}</span>
                <span>Wedding story, Daman</span>
              </div>
              <Link href="/testimonials" className="editorial-link type-cta">
                <span>Read more kind words</span>
              </Link>
            </div>

            <figure
              className="testimonial-pause__image image-frame"
              style={{ "--testimonial-position": aamirTestimonial.image.objectPosition ?? "50% 50%" } as CSSProperties}
            >
              <Image
                src={aamirTestimonial.image.src}
                alt={aamirTestimonial.image.alt}
                fill
                sizes="(max-width: 768px) 92vw, 34vw"
              />
            </figure>
          </div>
        </section>
      ) : null}
    </>
  );
}
