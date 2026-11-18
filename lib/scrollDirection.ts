/** Distance hysteresis filters touchpad noise without depending on input velocity. */
export function createScrollDirection(initialY: number) {
  let previous = initialY, direction = 0, distance = 0;
  return {
    reset(y: number) { previous = y; direction = 0; distance = 0; },
    update(y: number) {
      const delta = y - previous;
      previous = y;
      if (Math.abs(delta) < 1) return { reveal: false, hide: false, immediate: false, direction };
      const next = Math.sign(delta);
      if (next !== direction) distance = 0;
      direction = next; distance += Math.abs(delta);
      return { reveal: next < 0 && distance >= 10, hide: next > 0 && distance >= 36, immediate: delta <= -28, direction };
    }
  };
}
