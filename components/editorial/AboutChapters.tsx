"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useStationaryGestures } from "@/components/motion/useStationaryGestures";
import { StoryParagraph } from "./StoryParagraph";
import { StudioImageSlot } from "./StudioImageSlot";
import styles from "@/app/about/story.module.css";
import typeStyles from "@/styles/reading-typography.module.css";

const chapters = ["The Beginning", "The Studio", "Today"];

export function AboutChapters() {
  const [active, setActive] = useState(0);
  const gestures = useStationaryGestures(active, 3, setActive);
  const navigation = useRef<HTMLElement>(null);

  function goTo(index: number) {
    setActive(Math.max(0, Math.min(chapters.length - 1, index)));
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    const index = event.key === "ArrowRight" ? active + 1 : event.key === "ArrowLeft" ? active - 1 : event.key === "Home" ? 0 : event.key === "End" ? 2 : null;
    if (index === null) return;
    event.preventDefault();
    goTo(index);
    if (event.target instanceof HTMLElement && event.target.closest("nav")) {
      navigation.current?.querySelectorAll("button")[Math.max(0, Math.min(chapters.length - 1, index))]?.focus({ preventScroll: true });
    }
  }

  return <article className={styles.story} aria-labelledby="our-story-title" onKeyDown={onKeyDown}>
    <header className={styles.header}>
      <div><p className="type-kicker">About KT</p><h1 id="our-story-title" className={typeStyles.pageTitle}>Our Story</h1></div>
      <nav ref={navigation} className={styles.chapterNav} aria-label="Our story chapters">
        {chapters.map((title, index) => <button key={title} type="button" aria-current={active === index ? "step" : undefined} aria-controls={`story-chapter-${index}`} onClick={() => goTo(index)}><span>0{index + 1}</span>{title}</button>)}
      </nav>
    </header>
    <p className="sr-only" id="story-chapters-help">Swipe or drag horizontally, scroll horizontally with a trackpad, or use the selection buttons and Left/Right arrow keys. Vertical scrolling moves through the page.</p>
    <div className={styles.stage} id="story-chapters" ref={gestures} aria-describedby="story-chapters-help" tabIndex={0} role="region" aria-label="Our story chapters. Use left and right arrow keys to select a chapter.">
      <section className={`${styles.chapter} ${styles.beginning}`} id="story-chapter-0" aria-hidden={active !== 0} inert={active !== 0} aria-labelledby="beginning-label">
        <h2 id="beginning-label" className={styles.mobileLabel}><span>01</span> The Beginning</h2>
        <StudioImageSlot kind="founder" className={styles.founder} />
        <div className={styles.prose}><StoryParagraph index={0} /><StoryParagraph index={1} /></div>
      </section>
      <section className={`${styles.chapter} ${styles.studio}`} id="story-chapter-1" aria-hidden={active !== 1} inert={active !== 1} aria-labelledby="studio-label">
        <h2 id="studio-label" className={styles.mobileLabel}><span>02</span> The Studio</h2>
        <div className={styles.prose}><StoryParagraph index={2} /><StoryParagraph index={3} /></div>
      </section>
      <section className={`${styles.chapter} ${styles.today}`} id="story-chapter-2" aria-hidden={active !== 2} inert={active !== 2} aria-labelledby="today-label">
        <h2 id="today-label" className={styles.mobileLabel}><span>03</span> Today</h2>
        <div className={styles.prose}><StoryParagraph index={4} /></div>
        <div className={styles.prose}><StoryParagraph index={5} /><StoryParagraph index={6} className={styles.thanks} /></div>
      </section>
    </div>
  </article>;
}
