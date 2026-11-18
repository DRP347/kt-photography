"use client";

import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { attachCarouselWheel } from "./carouselWheel";
import useEmblaCarousel from "embla-carousel-react";

/** One set of slides; Embla repositions them at the boundary without clones or timers. */
export function useLoopCarousel() {
  const plugins = useMemo(() => [WheelGesturesPlugin({
    breakpoints: { "(prefers-reduced-motion: reduce)": { active: false } }
  })], []);
  const [viewportRef, api] = useEmblaCarousel({
    loop: true, align: "start", duration: 30,
    breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } }
  }, plugins);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState<number[]>([0]);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!api) return;
    const update = () => { setActive(api.selectedScrollSnap()); setVisible(api.slidesInView()); };
    update(); api.on("select", update).on("slidesInView", update).on("reInit", update);
    return () => { api.off("select", update).off("slidesInView", update).off("reInit", update); };
  }, [api]);
  useEffect(() => {
    if (!api) return;
    return attachCarouselWheel(api, matchMedia("(prefers-reduced-motion: reduce)"));
  }, [api]);
  const previous = () => api?.scrollPrev(reduced);
  const next = () => api?.scrollNext(reduced);
  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key) || !api) return;
    event.preventDefault();
    if (event.key === "ArrowLeft") previous();
    if (event.key === "ArrowRight") next();
    if (event.key === "Home") api.scrollTo(0, reduced);
    if (event.key === "End") api.scrollTo(api.scrollSnapList().length - 1, reduced);
  }
  return { viewportRef, active, visible, previous, next, onKeyDown };
}
