"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** Content stays visible without JS, with reduced motion, or without observer support. */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    if (!node || media.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.dataset.reveal = "visible";
        observer.disconnect();
      }
    }, { threshold: [0, .06] });
    node.dataset.reveal = "pending";
    observer.observe(node);
    const show = () => { if (media.matches) { node.dataset.reveal = "visible"; observer.disconnect(); } };
    media.addEventListener("change", show);
    return () => { observer.disconnect(); media.removeEventListener("change", show); };
  }, []);
  return <div ref={ref} className={`editorial-reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}
