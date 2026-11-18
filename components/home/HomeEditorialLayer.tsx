"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import styles from "./HomeEditorialLayer.module.css";

export function HomeEditorialLayer({ children, order, name }: { children: ReactNode; order: number; name: string }) {
  const layer = useRef<HTMLDivElement>(null);
  const anchor = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = layer.current;
    if (!element) return;
    const measure = () => element.style.setProperty("--layer-height", `${element.offsetHeight}px`);
    const observer = new ResizeObserver(measure);
    observer.observe(element); measure();
    return () => observer.disconnect();
  }, []);
  return <>
    <span ref={anchor} className={styles.anchor} data-layer-anchor={name} aria-hidden="true" />
    <div ref={layer} className={styles.layer} style={{ "--layer-order": order } as CSSProperties} data-editorial-layer={name} onFocusCapture={event => {
      const node = layer.current;
      if (!node || !anchor.current) return;
      const target = event.target.getBoundingClientRect();
      const covering = [...(node.parentElement?.querySelectorAll<HTMLElement>('[data-editorial-layer]') ?? [])].some(other => Number(other.style.getPropertyValue('--layer-order')) > order && other.getBoundingClientRect().top < target.bottom);
      if (covering) anchor.current.scrollIntoView({ block: "start", behavior: "instant" });
    }}>{children}</div>
  </>;
}
