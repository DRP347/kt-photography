"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type StorySoundtrackControlProps = {
  soundtrack?: {
    localSrc: string;
    title: string;
    artist?: string;
    highlightStartSeconds: number;
    defaultVolume?: number;
    loopFromHighlight?: boolean;
  };
};

function MusicIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M9 18.2a2.2 2.2 0 1 1-1.2-1.96V7.3l8.2-1.74v8.82a2.2 2.2 0 1 1-1.2-1.96V8.1L9 9.33v8.87Z" />
    </svg>
  );
}

function PlayIcon({ paused }: { paused: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {paused ? <path d="m9 7 8 5-8 5V7Z" /> : <><path d="M8 6.8v10.4" /><path d="M16 6.8v10.4" /></>}
    </svg>
  );
}

export function StorySoundtrackControl({
  soundtrack
}: StorySoundtrackControlProps) {
  const src = soundtrack?.localSrc;
  const title = soundtrack?.title;
  const artist = soundtrack?.artist;
  const highlightStartSeconds = soundtrack?.highlightStartSeconds ?? 0;
  const defaultVolume = soundtrack?.defaultVolume ?? 0.32;
  const loopFromHighlight = soundtrack?.loopFromHighlight ?? true;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const clearFade = useCallback(() => {
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    fadeRef.current = null;
  }, []);

  const fadeTo = useCallback(
    (target: number, after?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;

      clearFade();
      const start = audio.volume;
      const steps = 18;
      let step = 0;

      fadeRef.current = window.setInterval(() => {
        step += 1;
        const progress = Math.min(step / steps, 1);
        audio.volume = start + (target - start) * progress;

        if (progress >= 1) {
          clearFade();
          after?.();
        }
      }, 70);
    },
    [clearFade]
  );

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.volume = 0;
      if (highlightStartSeconds > 0 && audio.currentTime < Math.max(0, highlightStartSeconds - 0.75)) {
        audio.currentTime = highlightStartSeconds;
      }
      await audio.play();
      setIsPlaying(true);
      fadeTo(isMuted ? 0 : defaultVolume);
    } catch {
      setIsPlaying(false);
    }
  }, [defaultVolume, fadeTo, highlightStartSeconds, isMuted]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    fadeTo(0, () => {
      audio.pause();
      setIsPlaying(false);
    });
  }, [fadeTo]);

  useEffect(() => {
    if (!src) return undefined;

    const audio = new Audio(src);
    audio.loop = false;
    audio.preload = "metadata";
    audio.volume = 0;

    const handleLoadedMetadata = () => {
      if (highlightStartSeconds > 0 && Number.isFinite(audio.duration)) {
        audio.currentTime = Math.min(highlightStartSeconds, Math.max(audio.duration - 1, 0));
      }
    };

    const handleEnded = () => {
      if (!loopFromHighlight) {
        setIsPlaying(false);
        return;
      }

      audio.currentTime = highlightStartSeconds;
      void play();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audioRef.current = audio;

    return () => {
      clearFade();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [clearFade, highlightStartSeconds, loopFromHighlight, play, src]);

  useEffect(() => {
    const handleFilmStart = () => {
      if (isPlaying) pause();
    };

    window.addEventListener("kt-story-film-play", handleFilmStart);
    return () => window.removeEventListener("kt-story-film-play", handleFilmStart);
  }, [isPlaying, pause]);

  if (!src) {
    return null;
  }

  return (
    <div className="story-soundtrack" aria-label={`${title} soundtrack${artist ? ` by ${artist}` : ""}`}>
      <MusicIcon />
      <span className="story-soundtrack__copy">
        <span>{title}</span>
        {artist ? <span>{artist}</span> : null}
      </span>
      <button
        type="button"
        aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
        onClick={() => (isPlaying ? pause() : void play())}
      >
        <PlayIcon paused={!isPlaying} />
      </button>
      <button
        type="button"
        aria-label={isMuted ? "Unmute soundtrack" : "Mute soundtrack"}
        onClick={() => {
          const audio = audioRef.current;
          const nextMuted = !isMuted;
          setIsMuted(nextMuted);
          if (audio) audio.volume = nextMuted ? 0 : defaultVolume;
        }}
      >
        {isMuted ? "Muted" : "Sound"}
      </button>
    </div>
  );
}
