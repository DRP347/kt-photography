"use client";

import { useEffect, useRef } from "react";

const interactive = "a,button,input,textarea,select,label,summary,[role=button],[role=link],[contenteditable]:not([contenteditable=false])";
const startsOnControl = (target: EventTarget | null) => target instanceof Element && Boolean(target.closest(interactive));

/** Select adjacent items while keeping the stage in place. */
export function useStationaryGestures(active: number, count: number, select: (index: number) => void) {
  const surface = useRef<HTMLDivElement>(null);
  const current = useRef({ active, count, select });
  current.current = { active, count, select };

  useEffect(() => {
    const node = surface.current;
    if (!node) return;

    let pointer: { id: number; x: number; y: number; horizontal: boolean } | null = null;
    let wheelTime = -Infinity;
    let wheelDistance = 0;
    let wheelDirection = 0;
    let wheelUsed = false;

    const canChoose = (direction: number) => {
      const { active, count } = current.current;
      return active + direction >= 0 && active + direction < count;
    };
    const choose = (direction: number) => {
      if (canChoose(direction)) current.current.select(current.current.active + direction);
    };

    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || startsOnControl(event.target)) return;
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false };
    };
    const move = (event: PointerEvent) => {
      if (!pointer || event.pointerId !== pointer.id || pointer.horizontal) return;
      const x = Math.abs(event.clientX - pointer.x);
      const y = Math.abs(event.clientY - pointer.y);
      if (y >= 8 && y >= x) {
        pointer = null;
      } else if (x >= 8 && x > y * 1.2) {
        pointer.horizontal = true;
        node.setPointerCapture(event.pointerId);
        node.dataset.dragging = "true";
        if (event.cancelable) event.preventDefault();
      }
    };
    const finish = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return;
      const x = event.clientX - pointer.x;
      const y = event.clientY - pointer.y;
      pointer = null;
      delete node.dataset.dragging;
      if (node.hasPointerCapture(event.pointerId)) node.releasePointerCapture(event.pointerId);
      if (event.type === "pointerup" && Math.abs(x) >= 24 && Math.abs(x) > Math.abs(y) * 1.2) {
        choose(x < 0 ? 1 : -1);
      }
    };
    const lostCapture = (event: PointerEvent) => {
      // Touch first captures on the child. Its event bubbles when capture moves to the stage.
      if (event.target === node) finish(event);
    };
    const leave = (event: PointerEvent) => {
      if (!pointer?.horizontal) finish(event);
    };
    const drag = (event: DragEvent) => {
      if (pointer && !startsOnControl(event.target)) event.preventDefault();
    };
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? node.clientWidth : 1;
      const shifted = event.shiftKey && event.deltaX === 0;
      const distance = (shifted ? event.deltaY : event.deltaX) * unit;
      const vertical = shifted ? 0 : event.deltaY * unit;
      if (Math.abs(distance) <= Math.abs(vertical) * 1.35) return;

      const direction = Math.sign(distance);
      const now = performance.now();
      if (now - wheelTime > 150 || (direction !== wheelDirection && Math.abs(distance) >= 6)) {
        wheelDistance = 0;
        wheelUsed = false;
        wheelDirection = direction;
      }
      wheelTime = now;
      if (!canChoose(direction) || direction !== wheelDirection) return;
      if (event.cancelable) event.preventDefault();
      if (wheelUsed) return;
      wheelDistance += Math.abs(distance);
      if (wheelDistance >= 28) {
        wheelUsed = true;
        choose(direction);
      }
    };

    node.addEventListener("pointerdown", down);
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerup", finish);
    node.addEventListener("pointercancel", finish);
    node.addEventListener("lostpointercapture", lostCapture);
    node.addEventListener("pointerleave", leave);
    node.addEventListener("dragstart", drag);
    node.addEventListener("wheel", wheel, { passive: false });
    return () => {
      node.removeEventListener("pointerdown", down);
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerup", finish);
      node.removeEventListener("pointercancel", finish);
      node.removeEventListener("lostpointercapture", lostCapture);
      node.removeEventListener("pointerleave", leave);
      node.removeEventListener("dragstart", drag);
      node.removeEventListener("wheel", wheel);
      delete node.dataset.dragging;
    };
  }, []);
  return surface;
}
