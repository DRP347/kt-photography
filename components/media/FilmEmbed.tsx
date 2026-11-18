"use client";

import { useEffect, useState } from "react";
import styles from "./media-fallback.module.css";

export function FilmEmbed({ src, title, original }: { src: string; title: string; original: string }) {
  const [state, setState] = useState<"pending" | "ready" | "slow" | "failed">("pending");
  useEffect(() => {
    if (state !== "pending") return;
    const timer = setTimeout(() => setState("slow"), 12000);
    return () => clearTimeout(timer);
  }, [state]);
  return <div className={styles.embed} data-media-state={state}>
    <iframe aria-hidden={state !== "ready"} tabIndex={state === "ready" ? 0 : -1} src={src} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" onLoad={() => setState("ready")} onError={() => setState("failed")} />
    {(state === "slow" || state === "failed") && <p className={styles.notice} role="status">The player is taking longer to open. <a href={original} target="_blank" rel="noreferrer">Watch on YouTube</a></p>}
  </div>;
}
