"use client";

import { useEffect, useRef } from "react";

/** Gestures choose an item; they never translate the content or handle vertical scrolling. */
export function useStationaryGestures(active: number, count: number, select: (index: number) => void) {
  const surface = useRef<HTMLDivElement>(null);
  const current = useRef({ active, count, select });
  current.current = { active, count, select };

  useEffect(() => {
    const node = surface.current;
    if (!node) return;
    let pointer: { id: number; x: number; y: number; horizontal: boolean } | null = null;
    let suppressClick = false;
    let wheelTime = 0, wheelDistance = 0, wheelDirection = 0, wheelUsed = false;
    const choose = (direction: number) => {
      const { active, count, select } = current.current;
      select(Math.max(0, Math.min(count - 1, active + direction)));
    };
    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || (event.target instanceof Element && event.target.closest("a,button,input,textarea,select,[contenteditable=true]"))) return;
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false };
      suppressClick = false;
    };
    const move = (event: PointerEvent) => {
      if (!pointer || event.pointerId !== pointer.id) return;
      const x = event.clientX - pointer.x, y = event.clientY - pointer.y;
      if (!pointer.horizontal && Math.abs(y) > 12 && Math.abs(y) >= Math.abs(x)) { pointer = null; return; }
      if (Math.abs(x) > 12 && Math.abs(x) > Math.abs(y) * 1.5) {
        pointer.horizontal = true;
        node.setPointerCapture(event.pointerId);
        node.dataset.dragging = "true";
        if (event.cancelable) event.preventDefault();
      }
    };
    const finish = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return;
      const x = event.clientX - pointer.x, y = event.clientY - pointer.y;
      if (event.type === "pointerup" && Math.abs(x) >= 48 && Math.abs(x) > Math.abs(y) * 1.5) {
        choose(x < 0 ? 1 : -1);
        suppressClick = true;
      }
      if (node.hasPointerCapture(event.pointerId)) node.releasePointerCapture(event.pointerId);
      pointer = null;
      delete node.dataset.dragging;
    };
    const click = (event: MouseEvent) => {
      if (!suppressClick) return;
      suppressClick = false;
      event.preventDefault(); event.stopPropagation();
    };
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      const horizontal = event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX;
      if (!horizontal || (!event.shiftKey && Math.abs(horizontal) < Math.abs(event.deltaY) * 1.3)) return;
      // Only a horizontal gesture is consumed, including at either end of the sequence.
      if (event.cancelable) event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? node.clientWidth : 1;
      const distance = horizontal * unit, direction = Math.sign(distance), now = performance.now();
      if (now - wheelTime > 180 || (direction !== wheelDirection && Math.abs(distance) > 8)) {
        wheelDistance = 0; wheelUsed = false;
      }
      wheelTime = now;
      if (Math.abs(distance) > 8 || !wheelDirection) wheelDirection = direction;
      if (wheelUsed) return;
      wheelDistance += distance;
      if (Math.abs(wheelDistance) >= 64) { choose(Math.sign(wheelDistance)); wheelUsed = true; }
    };
    node.addEventListener("pointerdown", down);
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerup", finish);
    node.addEventListener("pointercancel", finish);
    node.addEventListener("click", click, true);
    node.addEventListener("wheel", wheel, { passive: false });
    return () => {
      node.removeEventListener("pointerdown", down); node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerup", finish); node.removeEventListener("pointercancel", finish);
      node.removeEventListener("click", click, true); node.removeEventListener("wheel", wheel);
    };
  }, []);
  return surface;
}
