"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState, type CSSProperties } from "react";
import styles from "./media-fallback.module.css";

type ResilientImageProps = ImageProps & {
  /** Enable only in a positioned gallery figure, outside links and buttons. */
  retryOnError?: boolean;
};

function ImageResource({ alt, style, className = "", onLoad, onError, retryOnError, ...props }: ResilientImageProps) {
  const [state, setState] = useState<"pending" | "ready" | "failed">("pending");
  const [retried, setRetried] = useState(false);
  // Next reassigns img.src when its error-handler ref changes.
  const handleError = useCallback<NonNullable<ImageProps["onError"]>>(event => {
    setState("failed");
    onError?.(event);
  }, [onError]);
  const source = typeof props.src === "string" ? props.src : "";
  // Archive WebPs are prepared offline. Keep Next optimization for other assets.
  const isArchiveWebP = /^\/drive-media\/[^?#]+\.webp$/.test(source);
  // YouTube already serves the approved poster in web-ready variants.
  const isYouTubePoster = /^https:\/\/i\.ytimg\.com\/vi\/[\w-]{11}\/(?:hq|maxres)default\.jpg$/.test(source);
  const hasRecovery = retryOnError && isArchiveWebP;
  const failed = state === "failed";

  if (failed && !hasRecovery) {
    const ratio = style?.aspectRatio ?? (props.width && props.height ? `${props.width} / ${props.height}` : "3 / 2");
    const dimensions: CSSProperties = props.fill
      ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
      : { width: "100%", aspectRatio: ratio };
    return <div className={`${className} ${styles.fallback}`} style={{ ...style, ...dimensions }}
      role={alt ? "img" : undefined} aria-label={alt ? `${alt}. Photograph unavailable.` : undefined}
      aria-hidden={!alt || undefined} data-media-state="failed">
      <span>Photograph unavailable</span>
    </div>;
  }

  return <>
    <Image {...props}
      src={retried ? `${source}?retry=1` : props.src}
      priority={!retried && props.priority}
      loading={retried ? "eager" : props.loading}
      unoptimized={isArchiveWebP || isYouTubePoster || props.unoptimized}
      alt={alt} className={className}
      style={{
        backgroundColor: state === "pending" ? "var(--paper-deep)" : undefined,
        ...style,
        visibility: failed ? "hidden" : style?.visibility,
      }}
      data-media-state={failed ? undefined : state}
      onLoad={event => { setState("ready"); onLoad?.(event); }}
      onError={handleError} />
    {failed && <div className={styles.galleryFallback} data-media-state="failed">
      <p role="status"><span className="sr-only">{alt}. </span>Photograph unavailable</p>
      {!retried && <button type="button" aria-label={alt ? `Retry loading ${alt}` : "Retry photograph"}
        onClick={event => {
          event.currentTarget.closest("figure")?.focus({ preventScroll: true });
          setRetried(true);
          setState("pending");
        }}>Try again</button>}
    </div>}
  </>;
}

export function ResilientImage(props: ResilientImageProps) {
  const key = typeof props.src === "string" ? props.src : "src" in props.src ? props.src.src : props.src.default.src;
  return <ImageResource key={key} {...props} />;
}
