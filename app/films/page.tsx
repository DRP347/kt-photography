import type { Metadata } from "next";
import { FilmArchiveGallery } from "@/components/editorial/FilmArchiveGallery";
import { FooterArchive } from "@/components/layout/FooterArchive";
import { films } from "@/data/archive";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wedding Films",
  description: "Wedding films by KT Photography, held as movement, sound and atmosphere.",
  alternates: {
    canonical: absoluteUrl("/films")
  }
};

export default function FilmsPage() {
  return (
    <>
      <main id="main">
        <section className="films-page" aria-labelledby="films-title">
          <div className="films-page__intro">
            <p className="type-kicker">Films</p>
            <h1 id="films-title">
              <span>Wedding films,</span>
              {" "}
              <span>held simply.</span>
            </h1>
          </div>

          <FilmArchiveGallery films={films.map(({ slug, coupleName, title, poster, youtubeUrl }) => ({ slug, coupleName, title, poster, youtubeUrl }))} />
        </section>
      </main>
      <FooterArchive />
    </>
  );
}
