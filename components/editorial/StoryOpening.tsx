"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

/** Measure the actual masthead/title flow, including font-driven line wraps. */
export function StoryOpening({ paired, children }: { paired: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => {
      const top = node.getBoundingClientRect().top + window.scrollY;
      node.style.setProperty("--opening-available-height", `${Math.max(1, window.innerHeight - top - 16)}px`);
    };
    const observer = new ResizeObserver(measure);
    for (const element of document.querySelectorAll(".site-header, .couple-story > .page-intro")) observer.observe(element);
    window.addEventListener("resize", measure);
    let active = true;
    document.fonts.ready.then(() => { if (active) measure(); });
    measure();
    return () => { active = false; observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);
  return <div ref={ref} className={`story-opening${paired ? " story-opening--pair" : ""}`}>{children}</div>;
}
