"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Film } from "@/data/archive";

function getYouTubeId(url?: string) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return parsed.pathname.replace(/^\/+/, "").split("/")[0] || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      if (parsed.pathname === "/watch") return parsed.searchParams.get("v");
      if (parsed.pathname.startsWith("/embed/")) return parsed.pathname.split("/")[2] || null;
      if (parsed.pathname.startsWith("/shorts/")) return parsed.pathname.split("/")[2] || null;
    }
  } catch {
    return null;
  }

  return null;
}

export function FilmCard({ film }: { film: Film; featured?: boolean }) {
  const [active, setActive] = useState(false);
  const youtubeId = useMemo(() => getYouTubeId(film.youtubeUrl), [film.youtubeUrl]);
  const embedSrc = youtubeId
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`
    : "";

  return (
    <article className="film-row">
      <div className="film-row__poster">
        {active && embedSrc ? (
          <iframe
            src={embedSrc}
            title={`${film.coupleName} ${film.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src={film.poster.src}
              alt={film.poster.alt}
              fill
              sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 1200px) 78vw, 960px"
              style={{ objectPosition: film.poster.objectPosition ?? "50% 50%" }}
            />
            {embedSrc ? (
              <button
                type="button"
                onClick={() => setActive(true)}
                className="film-row__play"
                aria-label={`Play ${film.coupleName} ${film.title} on YouTube`}
              >
                <svg viewBox="0 0 28 28" className="size-6" aria-hidden="true">
                  <path d="M10 7.2v13.6L21 14z" fill="currentColor" />
                </svg>
              </button>
            ) : (
              <span className="film-row__unavailable">YouTube link not configured</span>
            )}
          </>
        )}
      </div>
      <h2>{film.coupleName}</h2>
      {film.youtubeUrl && youtubeId ? (
        <a className="film-row__fallback" href={film.youtubeUrl} target="_blank" rel="noreferrer">
          Open on YouTube
        </a>
      ) : null}
    </article>
  );
}
