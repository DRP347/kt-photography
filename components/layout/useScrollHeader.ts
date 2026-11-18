"use client";

import { useEffect, type RefObject } from "react";
import { createScrollDirection } from "@/lib/scrollDirection";

export function useScrollHeader(ref: RefObject<HTMLElement | null>, pathname: string) {
  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    const y = () => Math.max(0, Math.min(window.scrollY, Math.max(0, document.documentElement.scrollHeight - innerHeight)));
    const tracker = createScrollDirection(y());
    let frame = 0, direction = 0;
    const reveal = (immediate = false) => { header.dataset.instant = String(immediate); header.dataset.hidden = "false"; };
    const locked = () => !!header.querySelector('[data-menu-open="true"], :focus-visible');
    const update = () => {
      frame = 0;
      const position = y(), state = tracker.update(position);
      direction = state.direction;
      header.dataset.scrolled = String(position > 12);
      if (position <= 16 || locked()) { reveal(); tracker.reset(position); }
      else if (state.reveal || state.immediate) reveal(state.immediate);
      else if (state.hide && position > header.offsetHeight + 24) { header.dataset.instant = "false"; header.dataset.hidden = "true"; }
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const reset = () => { tracker.reset(y()); reveal(true); };
    const focus = (event: FocusEvent) => { if (event.target instanceof Element && event.target.matches(":focus-visible")) reveal(true); };
    // A narrow strip below the navbar detects upward entry into a previous section.
    const boundaries = new IntersectionObserver(entries => {
      if (direction < 0 && entries.some(entry => entry.isIntersecting)) reveal(true);
    }, { rootMargin: `-${header.offsetHeight}px 0px -${Math.max(0, innerHeight - header.offsetHeight - 2)}px 0px` });
    const observe = requestAnimationFrame(() => {
      document.querySelectorAll('main > section, main section[id], [data-editorial-layer], [data-layer-anchor], [data-editorial-enquiry]').forEach(section => boundaries.observe(section));
    });
    reveal(true); header.dataset.scrolled = String(y() > 12);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", reset);
    window.visualViewport?.addEventListener("resize", reset);
    header.addEventListener("focusin", focus);
    return () => {
      cancelAnimationFrame(frame); cancelAnimationFrame(observe); boundaries.disconnect();
      window.removeEventListener("scroll", scroll); window.removeEventListener("resize", reset);
      window.visualViewport?.removeEventListener("resize", reset); header.removeEventListener("focusin", focus);
    };
  }, [pathname, ref]);
}
