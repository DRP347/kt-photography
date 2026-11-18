import type { EmblaCarouselType } from "embla-carousel";

/** Local input adapter; Embla and its wheel plugin own every position and transform. */
export function attachCarouselWheel(api: EmblaCarouselType, media: Pick<MediaQueryList, "matches">) {
  const burstState = { time: 0, direction: 0, distance: 0, advanced: false };
  const node = api.rootNode();

  // Capture only on this viewport, before the plugin's bubbling listener.
  function wheel(event: WheelEvent) {
    if (event.ctrlKey || event.metaKey) { event.stopImmediatePropagation(); return; }
    const shifted = event.shiftKey && event.deltaX === 0;
    const x = shifted ? event.deltaY : event.deltaX;
    const y = shifted ? 0 : event.deltaY;
    if (!x || Math.abs(y) >= Math.abs(x)) {
      // Leave default vertical page scrolling alone, even during a horizontal burst.
      event.stopImmediatePropagation();
      return;
    }
    if (media.matches) {
      event.preventDefault(); event.stopImmediatePropagation();
      const unit = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? node.clientWidth : 1;
      const direction = Math.sign(x);
      const now = performance.now();
      const burst = burstState;
      if (now - burst.time > 180 || direction !== burst.direction) {
        burst.distance = 0; burst.advanced = false;
      }
      burst.time = now; burst.direction = direction; burst.distance += Math.abs(x * unit);
      if (!burst.advanced && burst.distance >= 36) {
        burst.advanced = true;
        if (direction > 0) api?.scrollNext(true); else api?.scrollPrev(true);
      }
    } else if (shifted) {
      // Some browsers already map Shift-wheel to deltaX; adapt only those that do not.
      // The plugin still owns normalization, momentum and all carousel movement.
      event.preventDefault(); event.stopImmediatePropagation();
      node.dispatchEvent(new WheelEvent("wheel", {
        deltaX: x, deltaY: 0, deltaMode: event.deltaMode,
        clientX: event.clientX, clientY: event.clientY,
        bubbles: false, cancelable: true
      }));
    }
  }
  node.addEventListener("wheel", wheel, { passive: false, capture: true });
  return () => node.removeEventListener("wheel", wheel, { capture: true });
}
