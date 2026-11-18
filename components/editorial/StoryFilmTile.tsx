"use client";

import { ResilientImage } from "@/components/media/ResilientImage";
import { FilmEmbed } from "@/components/media/FilmEmbed";
import styles from "@/components/media/media-fallback.module.css";
import { useEffect, useState } from "react";
import type { ImageAsset } from "@/data/archive";

type StoryFilmTileProps = {
  cinematic?: boolean;
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

export function StoryFilmTile({ title, poster, videoSrc, youtubeUrl, cinematic = false }: StoryFilmTileProps) {
  const [isActive, setIsActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const [slow, setSlow] = useState(false);
  const [ready, setReady] = useState(false);
  const youtubeId = getYouTubeId(youtubeUrl);
  const embedSrc = youtubeId
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`
    : "";

  useEffect(() => {
    if (!isActive || embedSrc || ready || failed) return;
    const timer = setTimeout(() => setSlow(true), 12000);
    return () => clearTimeout(timer);
  }, [isActive, embedSrc, ready, failed]);

  if (isActive) {
    return (
      <div className={`film-player${cinematic ? " film-player--cinematic" : ""}`}><div className="story-film-tile story-film-tile--active">
        {embedSrc ? (
          <FilmEmbed src={embedSrc} title={title} original={youtubeUrl ?? ""} />
        ) : (
          <video
            controls
            autoPlay
            playsInline
            preload="metadata"
            poster={poster.src}
            onError={() => setFailed(true)}
            onCanPlay={() => { setReady(true); setSlow(false); }}
            onPlay={() => window.dispatchEvent(new CustomEvent("kt-story-film-play"))}
          >
            {videoSrc ? <source src={videoSrc} type="video/mp4" /> : null}
          </video>
        )}
      {(failed || slow) && <p className={styles.notice} role="status">{failed ? "The film could not load." : "The film is taking longer to load."} <button type="button" onClick={() => setIsActive(false)}>Return to photograph</button></p>}</div>{youtubeUrl && <a className="film-row__fallback" href={youtubeUrl} target="_blank" rel="noreferrer">Watch on YouTube</a>}</div>
    );
  }

  return (
    <button
      type="button"
      className={`story-film-tile${cinematic ? " story-film-tile--cinematic" : ""}${youtubeId === "6HfOz7tjMnU" ? " story-film-tile--trim-bars" : ""}`}
      aria-label={`Play ${title}`}
      onClick={() => {
        window.dispatchEvent(new CustomEvent("kt-story-film-play"));
        setFailed(false); setSlow(false); setReady(false); setIsActive(true);
      }}
    >
      <ResilientImage src={poster.src} alt={poster.alt} width={poster.width ?? 1800} height={poster.height ?? 1200} sizes="(max-width: 700px) 92vw, 85vw" />
      <span className="story-film-tile__overlay">
        <span className="story-film-tile__play"><PlayIcon /></span>
        <span className="story-film-tile__label">The wedding film</span>
        <span className="story-film-tile__title">Watch their story</span>
      </span>
    </button>
  );
}
