"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./EditorialPageFrame.module.css";

/** Native sticky layering; only size changes are observed, never scroll frames. */
export function EditorialPageFrame({ children, enquiry }: { children: ReactNode; enquiry: ReactNode }) {
  const frame = useRef<HTMLElement>(null);
  const opening = useRef<HTMLDivElement>(null);
  const incoming = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = frame.current;
    const editorial = opening.current;
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!root || !editorial || !header) return;
    const measure = () => {
      root.style.setProperty("--page-header-height", `${header.getBoundingClientRect().height}px`);
      root.style.setProperty("--editorial-height", `${editorial.offsetHeight}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    observer.observe(editorial);
    measure();
    return () => observer.disconnect();
  }, []);

  return <main id="main" className={styles.frame} ref={frame} onFocusCapture={event => {
    // Back-tabbing must reveal a focused control that was covered by the next layer.
    if (opening.current?.contains(event.target) && incoming.current && incoming.current.getBoundingClientRect().top < event.target.getBoundingClientRect().bottom) {
      window.scrollTo({ top: (frame.current?.getBoundingClientRect().top ?? 0) + window.scrollY - parseFloat(getComputedStyle(frame.current!).getPropertyValue("--page-header-height")), behavior: "instant" });
    }
  }}>
    <div ref={opening} className={styles.opening} data-editorial-opening>{children}</div>
    <div ref={incoming} className={styles.incoming} data-editorial-enquiry>{enquiry}</div>
  </main>;
}
