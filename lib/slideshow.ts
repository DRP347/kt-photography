"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const HERO_SLIDESHOW_CONFIG = {
  autoplayMs: 7200,
  manualResetMs: 7200,
  transitionMs: 1000,
  easing: "cubic-bezier(0.16, 1, 0.3, 1)"
} as const;

export function normalizeSlideIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return (index + length) % length;
}

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

export function useHeroAutoplay({
  length,
  enabled = true,
  onAdvance
}: {
  length: number;
  enabled?: boolean;
  onAdvance: () => void;
}) {
  const timerRef = useRef<number | null>(null);
  const enabledRef = useRef(enabled);
  const advanceRef = useRef(onAdvance);

  const clearAutoplay = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleAutoplay = useCallback(
    (delay = HERO_SLIDESHOW_CONFIG.autoplayMs) => {
      clearAutoplay();

      if (!enabledRef.current || length <= 1 || document.hidden) return;

      timerRef.current = window.setTimeout(() => {
        advanceRef.current();
      }, delay);
    },
    [clearAutoplay, length]
  );

  useEffect(() => {
    enabledRef.current = enabled;
    advanceRef.current = onAdvance;
  }, [enabled, onAdvance]);

  useEffect(() => {
    scheduleAutoplay();

    const handleVisibilityChange = () => {
      if (document.hidden) clearAutoplay();
      else scheduleAutoplay();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearAutoplay();
    };
  }, [clearAutoplay, scheduleAutoplay]);

  const resetAutoplay = useCallback(() => {
    scheduleAutoplay(HERO_SLIDESHOW_CONFIG.manualResetMs);
  }, [scheduleAutoplay]);

  return { clearAutoplay, resetAutoplay, scheduleAutoplay };
}
