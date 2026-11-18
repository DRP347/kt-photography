"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./media-fallback.module.css";

// One observer serves the archive, including large couple galleries.
const awaitingVisibility = new Map<Element, () => void>();
let visibilityObserver: IntersectionObserver | undefined;
function whenNear(element: Element, start: () => void) {
  visibilityObserver ??= new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { awaitingVisibility.get(entry.target)?.(); awaitingVisibility.delete(entry.target); visibilityObserver?.unobserve(entry.target); }
  }), { rootMargin: "200px" });
  awaitingVisibility.set(element, start); visibilityObserver.observe(element);
  return () => { awaitingVisibility.delete(element); visibilityObserver?.unobserve(element); };
}

function ImageResource({ alt, style, className = "", onLoad, onError, ...props }: ImageProps) {
  const [state, setState] = useState<"pending" | "ready" | "slow" | "failed">("pending");
  const image = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (state !== "pending" || !image.current) return;
    const element = image.current;
    if (element.complete && element.naturalWidth > 0) { setState("ready"); return; }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const stop = whenNear(element, () => { timer = setTimeout(() => setState("slow"), 12000); });
    return () => { stop(); clearTimeout(timer); };
  }, [state]);

  if (state === "failed" || state === "slow") {
    const ratio = style?.aspectRatio ?? (props.width && props.height ? `${props.width} / ${props.height}` : "3 / 2");
    const dimensions: CSSProperties = props.fill
      ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
      : { width: "100%", aspectRatio: ratio };
    return <div className={`${className} ${styles.fallback}`} style={{ ...style, ...dimensions }} role={alt ? "img" : undefined} aria-label={alt ? `${alt}. ${state === "slow" ? "Photograph is taking longer to load." : "Photograph unavailable."}` : undefined} aria-hidden={!alt || undefined} data-media-state={state}>
      <span>{state === "slow" ? "Photograph is taking longer to load" : "Photograph unavailable"}</span>
    </div>;
  }
  return <Image {...props} ref={image} alt={alt} className={className} style={{ backgroundColor: state === "pending" ? "var(--paper-deep)" : undefined, ...style }} data-media-state={state}
    onLoad={event => { setState("ready"); onLoad?.(event); }}
    onError={event => { setState("failed"); onError?.(event); }} />;
}

/** A source change gets a fresh load state. No automatic retries or substitute photos. */
export function ResilientImage(props: ImageProps) {
  const key = typeof props.src === "string" ? props.src : "src" in props.src ? props.src.src : props.src.default.src;
  return <ImageResource key={key} {...props} />;
}
