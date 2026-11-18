import Link from "next/link";
import { StudioImageSlot } from "@/components/editorial/StudioImageSlot";
import { StoryParagraph } from "@/components/editorial/StoryParagraph";
import styles from "./HomeAbout.module.css";
import typeStyles from "@/styles/reading-typography.module.css";

export function HomeAbout() {
  return <section id="home-about" className={styles.about} aria-labelledby="home-about-title">
    <div className={styles.heading}><p className="type-kicker">About KT</p><h2 id="home-about-title" className={typeStyles.sectionTitle}>Our Story</h2></div>
    <StudioImageSlot kind="founder" className={styles.portrait} />
    <div className={styles.body}><StoryParagraph index={0} /><StoryParagraph index={1} /><Link className={styles.storyLink} href="/about">Read our story</Link></div>
  </section>;
}
