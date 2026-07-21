import Image from "next/image";
import Link from "next/link";
import { heroStory } from "@/data/archive";

export function EditorialHero() {
  return (
    <section className="hero-section" aria-label="KT Photography featured story">
      <div className="hero-shell">
        <div className="hero-visual">
          <Link
            href={heroStory.href}
            aria-label={`View ${heroStory.coupleName}`}
            className="hero-photo-link"
          >
            <div className="hero-photo-frame">
              <Image
                src={heroStory.image.src}
                alt={heroStory.image.alt}
                fill
                priority
                sizes="(max-width: 767px) 92vw, 1080px"
                className="hero-photo"
              />
            </div>
          </Link>

          <div className="hero-meta-row">
            <p className="meta-text hero-meta-left">
              Weddings · Pre-Wedding · Films
            </p>

            <div className="hero-couple-mark">
              <p>{heroStory.coupleName}</p>
              <span aria-hidden="true" />
            </div>

            <Link href="/stories" className="text-link hero-meta-right">
              View stories <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
