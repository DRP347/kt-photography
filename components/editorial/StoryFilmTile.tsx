"use client";

import { useState } from "react";
import Image from "next/image";
import type { ImageAsset } from "@/data/archive";

type StoryFilmTileProps = {
  title: string;
  poster: ImageAsset;
  videoSrc?: string;
  youtubeUrl?: string;
};

function getYouTubeId(url?: string) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") return parsed.pathname.replace(/^\/+/, "").split("/")[0] || null;
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

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M9 7.2 17 12l-8 4.8V7.2Z" />
    </svg>
  );
}

export function StoryFilmTile({ title, poster, videoSrc, youtubeUrl }: StoryFilmTileProps) {
  const [isActive, setIsActive] = useState(false);
  const youtubeId = getYouTubeId(youtubeUrl);
  const embedSrc = youtubeId
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`
    : "";

  if (isActive) {
    return (
      <div className="story-film-tile story-film-tile--active">
        {embedSrc ? (
          <iframe
            src={embedSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <video
            controls
            playsInline
            preload="metadata"
            poster={poster.src}
            onPlay={() => window.dispatchEvent(new CustomEvent("kt-story-film-play"))}
          >
            {videoSrc ? <source src={videoSrc} type="video/mp4" /> : null}
          </video>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      className="story-film-tile"
      aria-label={`Play ${title}`}
      onClick={() => {
        window.dispatchEvent(new CustomEvent("kt-story-film-play"));
        setIsActive(true);
      }}
    >
      <Image
        src={poster.src}
        alt={poster.alt}
        fill
        sizes="(max-width: 700px) calc(100vw - 32px), 64vw"
        style={{ objectPosition: poster.objectPosition ?? "50% 50%" }}
      />
      <span className="story-film-tile__overlay">
        <span className="story-film-tile__play"><PlayIcon /></span>
        <span className="story-film-tile__label">The wedding film</span>
        <span className="story-film-tile__title">Watch their story</span>
      </span>
    </button>
  );
}
