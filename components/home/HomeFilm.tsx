"use client";

import { ResilientImage as Image } from "@/components/media/ResilientImage";
import { useEffect, useRef, useState } from "react";

const video = "/films/kt-homepage-promo.mp4";
const poster = "/films/kt-homepage-promo-poster.webp";

export function HomeFilm() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [slow, setSlow] = useState(false);
  const [retried, setRetried] = useState(false);
  const section = useRef<HTMLElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const userStarted = useRef(false);

  useEffect(() => {
    const node = section.current;
    const element = player.current;
    if (!node || !element) return;
    const stories = document.getElementById("our-stories");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;
    let waitingTimer: ReturnType<typeof setTimeout> | undefined;
    const waiting = () => { clearTimeout(waitingTimer); waitingTimer = setTimeout(() => setSlow(true), 12000); };
    const ready = () => { clearTimeout(waitingTimer); setSlow(false); };
    const playback = () => {
      if (visible && !document.hidden && !userPaused.current && (!motion.matches || userStarted.current)) {
        void element.play().catch(() => { /* Poster remains if autoplay is unavailable. */ });
      } else element.pause();
    };
    const reveal = () => {
      frame = 0;
      if (!plane.current) return;
      const top = node.getBoundingClientRect().top;
      const progress = Math.max(0, Math.min(1, (innerHeight - top) / (innerHeight * .85)));
      const eased = progress * progress * (3 - 2 * progress);
      plane.current.style.transform = motion.matches ? "none" : `translateY(${(1 - eased) * 64}px) scale(${.88 + eased * .12})`;
      if (stories) stories.style.transform = motion.matches ? "none" : `scale(${1 - .035 * eased})`;
    };
    const onScroll = () => { if (visible && !frame) frame = requestAnimationFrame(reveal); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !element.getAttribute("src")) {
        element.src = video;
        element.load(); waiting();
      }
      reveal();
      playback();
    });
    observer.observe(node);
    const onPreference = () => { reveal(); playback(); };
    element.addEventListener("canplay", playback); element.addEventListener("canplay", ready);
    element.addEventListener("loadstart", waiting); element.addEventListener("waiting", waiting); element.addEventListener("playing", ready); element.addEventListener("error", ready);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", reveal);
    document.addEventListener("visibilitychange", playback);
    motion.addEventListener("change", onPreference);
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame); clearTimeout(waitingTimer); element.pause();
      element.removeEventListener("loadstart", waiting); element.removeEventListener("waiting", waiting); element.removeEventListener("playing", ready); element.removeEventListener("error", ready);
      if (stories) stories.style.removeProperty("transform");
      element.removeEventListener("canplay", playback); element.removeEventListener("canplay", ready);
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", reveal);
      document.removeEventListener("visibilitychange", playback);
      motion.removeEventListener("change", onPreference);
    };
  }, []);

  return <section ref={section} id="home-film" className="home-film" aria-labelledby="home-film-title">
    <div ref={plane} className="home-film__stage">
      <div className="home-film__poster"><Image src={poster} alt="A frame from the KT Photography promo film" fill sizes="100vw" /></div>
      <video ref={player} className={loaded && !failed ? "is-ready" : ""} muted loop playsInline preload="none" poster={poster} aria-label="KT Photography promo film" aria-describedby="home-film-help" tabIndex={0} width={1280} height={720}
        onPlaying={() => setLoaded(true)} onError={() => setFailed(true)}
        onKeyDown={event => {
          if (event.code !== "Space") return;
          event.preventDefault();
          userStarted.current = true;
          userPaused.current = !player.current?.paused;
          if (userPaused.current) player.current?.pause();
          else void player.current?.play().catch(() => {});
        }} />
      <div className="home-film__intro"><h2 id="home-film-title">KT Photography</h2></div>
      <p id="home-film-help" className="sr-only">Muted wedding film. Press Space while focused to pause or resume.</p>
      <button className="home-film__pause" onClick={() => {
        userStarted.current = true;
        userPaused.current = !player.current?.paused;
        if (userPaused.current) player.current?.pause();
        else void player.current?.play().catch(() => {});
      }}>Pause / resume film</button>
      {(failed || slow) && <div className="home-film__error" role="status">{failed ? "The film could not load." : "The film is taking longer to load. The photograph remains available."} <a href={video}>Open the film</a>{!retried && <button type="button" className="text-link" onClick={() => {
        setRetried(true); setFailed(false); setSlow(false); setLoaded(false); userStarted.current = true; userPaused.current = false;
        player.current?.load(); void player.current?.play().catch(() => setFailed(true));
      }}>Try once more</button>}</div>}
    </div>
  </section>;
}
