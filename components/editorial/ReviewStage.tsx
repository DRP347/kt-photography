"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useStationaryGestures } from "@/components/motion/useStationaryGestures";
import { ClientReview } from "./ClientReview";
import { googleReviews } from "@/data/googleReviews";
import styles from "@/app/testimonials/testimonials.module.css";

export function ReviewStage() {
  const [active, setActive] = useState(0);
  const gestures = useStationaryGestures(active, 3, setActive);
  const navigation = useRef<HTMLElement>(null);
  function goTo(index: number) { setActive(Math.max(0, Math.min(googleReviews.length - 1, index))); }
  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    const index = event.key === "ArrowRight" ? active + 1 : event.key === "ArrowLeft" ? active - 1 : event.key === "Home" ? 0 : event.key === "End" ? googleReviews.length - 1 : null;
    if (index === null) return;
    event.preventDefault();
    goTo(index);
    if (event.target instanceof HTMLElement && event.target.closest("nav")) {
      navigation.current?.querySelectorAll("button")[Math.max(0, Math.min(googleReviews.length - 1, index))]?.focus({ preventScroll: true });
    }
  }
  return <section className={styles.stage} aria-label="Client reviews" onKeyDown={onKeyDown}>
    <nav ref={navigation} className={styles.navigation} aria-label="Select a Google review">
      {googleReviews.map((review, index) => <button key={review.id} type="button" aria-pressed={active === index} aria-controls="selected-review" onClick={() => goTo(index)}><span className={styles.number}>0{index + 1}</span><span>{review.reviewer}</span></button>)}
    </nav>
    <p className="sr-only" id="selected-review-help">Swipe or drag horizontally, scroll horizontally with a trackpad, or use the selection buttons and Left/Right arrow keys. Vertical scrolling moves through the page.</p>
    <div id="selected-review" ref={gestures} aria-describedby="selected-review-help" className={styles.review} role="region" aria-label={`${googleReviews[active].reviewer}'s Google review`} tabIndex={0}>
      {googleReviews.map((review, index) => <div key={review.id} className={styles.reviewPanel} aria-hidden={active !== index} inert={active !== index}>
        <ClientReview review={review} className={styles.selected} />
      </div>)}
    </div>
  </section>;
}
