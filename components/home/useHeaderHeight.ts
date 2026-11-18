"use client";
import { useEffect, useState } from "react";
export function useHeaderHeight() {
  const [height, setHeight] = useState<number>();
  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const measure = () => setHeight(header.getBoundingClientRect().height);
    const observer = new ResizeObserver(measure);
    observer.observe(header); measure();
    return () => observer.disconnect();
  }, []);
  return height;
}
