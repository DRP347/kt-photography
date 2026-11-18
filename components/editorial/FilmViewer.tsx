"use client";

import { useEffect, useRef } from "react";
import { FilmEmbed } from "@/components/media/FilmEmbed";
import type { YouTubeFilm } from "./FilmArchiveGallery";

/** No local-video branch: this viewer accepts approved YouTube URLs only. */
function embedUrl(url?: string) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    const id = host === "youtu.be" ? parsed.pathname.slice(1) : ["youtube.com", "m.youtube.com"].includes(host) ? parsed.searchParams.get("v") : null;
    return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1` : null;
  } catch { return null; }
}

export function FilmViewer({ film, opener, onClose }: { film: YouTubeFilm; opener: HTMLElement | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const src = embedUrl(film.youtubeUrl);
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    const returnFocus = opener ?? document.activeElement;
    const overflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = "hidden";
    close.current?.focus({ preventScroll: true });
    return () => {
      node.close();
      document.body.style.overflow = overflow;
      if (returnFocus instanceof HTMLElement && returnFocus.isConnected) returnFocus.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={dialog} className="film-viewer" aria-labelledby="film-viewer-title" onCancel={event => { event.preventDefault(); onClose(); }}>
    <div className="film-viewer__inner">
      <header className="film-viewer__heading"><div><p className="type-kicker">{film.title}</p><h2 id="film-viewer-title">{film.coupleName}</h2></div><button ref={close} type="button" onClick={onClose}>Close film <span aria-hidden="true">×</span></button></header>
      <div className="film-viewer__screen">{src ? <FilmEmbed src={src} title={`${film.coupleName} — ${film.title}`} original={film.youtubeUrl ?? ""} /> : <p>This film is available through the original YouTube link below.</p>}</div>
      <a className="text-link film-viewer__original" href={film.youtubeUrl} target="_blank" rel="noreferrer">Watch on YouTube</a>
    </div>
  </dialog>;
}
