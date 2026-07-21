import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { FooterArchive } from "@/components/layout/FooterArchive";
import { stories } from "@/data/archive";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "About KT Photography, a Daman-based wedding photography studio documenting celebrations across India.",
  alternates: {
    canonical: absoluteUrl("/about")
  }
};

const openingImage = stories[2]?.hero;
const openingSupport = [stories[0]?.cover, stories[5]?.gallery[0]].filter(Boolean);
const workImages = [stories[4]?.gallery[0], stories[1]?.gallery[1], stories[6]?.cover].filter(Boolean);
const noticeImages = [stories[0]?.hero, stories[3]?.gallery[2], stories[5]?.hero].filter(Boolean);
const contactSheetImages = [
  stories[0]?.gallery[0],
  stories[1]?.cover,
  stories[2]?.gallery[1],
  stories[3]?.cover,
  stories[4]?.hero,
  stories[6]?.gallery[0]
].filter(Boolean);
const closingImage = stories[7]?.hero ?? stories[1]?.hero;

const observations = [
  "The glance before the ceremony begins.",
  "The hands quietly fixing a dupatta.",
  "The laughter after everyone forgets the camera."
];

export default function AboutPage() {
  return (
    <>
      <main id="main" className="about-page about-page--reframed">
        <section className="about-opening" aria-labelledby="about-title">
          <div className="about-opening__copy">
            <p className="type-kicker">About KT</p>
            <h1 id="about-title">
              <span>We stay close</span>
              <span>to the day.</span>
            </h1>
            <p>
              We are based in Daman and document weddings across India with a calm, observant approach to photographs
              and films.
            </p>
          </div>

          {openingImage ? (
            <figure className="about-opening__image about-frame">
              <Image
                src={openingImage.src}
                alt={openingImage.alt}
                fill
                priority
                sizes="(max-width: 900px) calc(100vw - 32px), 46vw"
                style={{ objectPosition: openingImage.objectPosition ?? "50% 50%" }}
              />
            </figure>
          ) : null}

          <div className="about-opening__support" aria-label="Selected quiet frames">
            {openingSupport.map((image) => (
              <figure className="about-frame" key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 700px) 42vw, 16vw"
                  style={{ objectPosition: image.objectPosition ?? "50% 50%" }}
                />
              </figure>
            ))}
          </div>
        </section>

        <section className="about-work" aria-labelledby="about-work-title">
          {workImages[0] ? (
            <figure className="about-work__portrait about-frame">
              <Image
                src={workImages[0].src}
                alt={workImages[0].alt}
                fill
                sizes="(max-width: 900px) 70vw, 32vw"
                style={{ objectPosition: workImages[0].objectPosition ?? "50% 50%" }}
              />
            </figure>
          ) : null}

          <div className="about-work__copy">
            <p className="type-kicker">How we work</p>
            <h2 id="about-work-title">Less directing. More noticing.</h2>
            <p>
              We guide when a portrait needs care and step back when a moment is better left alone. Our work is shaped
              around people, family movement and the parts of the day that still feel alive later.
            </p>
          </div>

          <div className="about-work__support">
            {workImages.slice(1).map((image) => (
              <figure className="about-frame" key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 700px) 42vw, 18vw"
                  style={{ objectPosition: image.objectPosition ?? "50% 50%" }}
                />
              </figure>
            ))}
          </div>
        </section>

        <section className="about-notice" aria-labelledby="about-notice-title">
          <div className="about-notice__heading">
            <p className="type-kicker">What we notice</p>
            <h2 id="about-notice-title">The small things that hold the day together.</h2>
          </div>
          <div className="about-notice__list">
            {observations.map((text, index) => {
              const image = noticeImages[index];
              return (
                <article className="about-notice__item" key={text}>
                  {image ? (
                    <figure className="about-frame" style={{ "--notice-index": index + 1 } as CSSProperties}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 700px) 62vw, 24vw"
                        style={{ objectPosition: image.objectPosition ?? "50% 50%" }}
                      />
                    </figure>
                  ) : null}
                  <p>{text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="about-contact-sheet" aria-labelledby="about-contact-title">
          <div>
            <p className="type-kicker">Behind the frame</p>
            <h2 id="about-contact-title">A compact archive of rooms, rituals and pauses.</h2>
          </div>
          <div className="about-contact-sheet__grid">
            {contactSheetImages.map((image, index) => (
              <figure className={`about-frame about-contact-sheet__image about-contact-sheet__image--${index + 1}`} key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 700px) 46vw, 18vw"
                  style={{ objectPosition: image.objectPosition ?? "50% 50%" }}
                />
              </figure>
            ))}
          </div>
        </section>

        <section className="about-closing" aria-labelledby="about-closing-title">
          {closingImage ? (
            <figure className="about-closing__image about-frame">
              <Image
                src={closingImage.src}
                alt={closingImage.alt}
                fill
                sizes="(max-width: 900px) calc(100vw - 32px), 52vw"
                style={{ objectPosition: closingImage.objectPosition ?? "50% 50%" }}
              />
            </figure>
          ) : null}
          <div className="about-closing__copy">
            <h2 id="about-closing-title">Every celebration has its own rhythm.</h2>
            <p>Our work begins by understanding yours.</p>
            <Link href="/check-date" className="editorial-link type-cta">
              <span>Check your date</span>
            </Link>
          </div>
        </section>
      </main>
      <FooterArchive />
    </>
  );
}
