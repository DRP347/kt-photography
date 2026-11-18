"use client";

import { ResilientImage as Image } from "@/components/media/ResilientImage";
import { useRef, useState } from "react";
import type { Film } from "@/data/archive";
import { useLoopCarousel } from "@/components/home/useLoopCarousel";
import { FilmViewer } from "./FilmViewer";

export type YouTubeFilm = Pick<Film, "slug" | "coupleName" | "title" | "poster" | "youtubeUrl">;

function FilmThumbnail({ poster, priority }: { poster: YouTubeFilm["poster"]; priority: boolean }) {
  const [fallback, setFallback] = useState(false);
  // Same approved video ID, using its verified high-resolution thumbnail variant.
  const src = fallback ? poster.src : poster.src.replace("hqdefault.jpg", "maxresdefault.jpg");
  return <Image src={src} alt={poster.alt} fill priority={priority} sizes="(max-width:767px) 85vw, 80vw" draggable={false} onError={() => setFallback(true)} />;
}

export function FilmArchiveGallery({ films }: { films: YouTubeFilm[] }) {
  const { viewportRef, active, visible, onKeyDown } = useLoopCarousel();
  const [selected, setSelected] = useState<YouTubeFilm | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  return <section className="film-gallery" aria-label="KT wedding films">
    <p id="film-gallery-help" className="sr-only">Swipe, drag, scroll horizontally or use Shift and mousewheel to browse. Use Left and Right arrow keys, Home or End when the gallery has focus. Select Play film to open the YouTube viewer.</p>
    <div className="film-gallery__viewport" ref={viewportRef} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Wedding film collection" aria-describedby="film-gallery-help" onKeyDown={onKeyDown}>
      <div className="film-gallery__track">
        {films.map((film, index) => <article className="film-gallery__card" key={film.slug} aria-roledescription="slide" aria-label={`${index + 1} of ${films.length}: ${film.coupleName}, ${film.title}`}>
          <button className="film-gallery__poster" type="button" tabIndex={visible.includes(index) ? 0 : -1} aria-label={`Play ${film.coupleName} ${film.title}`} aria-haspopup="dialog" onClick={event => { opener.current = event.currentTarget; setSelected(film); }} onKeyDown={event => {
            // Keyboard activation must also work after Embla suppresses a drag's click.
            if (event.key === "Enter" || event.key === " ") { event.preventDefault(); opener.current = event.currentTarget; setSelected(film); }
          }}>
            <FilmThumbnail poster={film.poster} priority={index === 0} />
            <span className="film-gallery__play">Play film</span>
          </button>
          <div className="film-gallery__caption"><h2>{film.coupleName}</h2><p>{film.title}</p></div>
          <noscript><a className="text-link" href={film.youtubeUrl}>Watch {film.coupleName} on YouTube</a></noscript>
        </article>)}
      </div>
    </div>
    <div className="film-gallery__orientation"><span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} / {String(films.length).padStart(2, "0")}</span><progress aria-label="Position in film collection" max={films.length} value={active + 1} /></div>
    {selected && <FilmViewer film={selected} opener={opener.current} onClose={() => setSelected(null)} />}
  </section>;
}
