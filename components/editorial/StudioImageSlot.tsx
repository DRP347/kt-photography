import { ResilientImage } from "@/components/media/ResilientImage";
import styles from "./StudioImageSlot.module.css";

/** Replace the slot contents with a genuine studio image when supplied.
 * The frame owns the aspect ratio, so replacement does not change the layout. */
export function StudioImageSlot({ kind, className = "" }: { kind: "founder" | "team"; className?: string }) {
  const founder = kind === "founder";
  return <figure className={`${styles.slot} ${founder ? styles.portrait : styles.team} ${className}`} data-image-slot={kind}>
    <div className={styles.frame}>{founder ? <ResilientImage src="/studio/kailash-taili-seated.webp" alt="Kailash Taili seated, in a black-and-white portrait" fill sizes="(max-width: 700px) 80vw, 340px" style={{ objectFit: "cover", objectPosition: "50% 25%" }} /> : <span>Photograph pending</span>}</div>
    <figcaption>{founder ? "Kailash Taili" : "KT Team"}{!founder && <span className="sr-only"> — Photograph pending</span>}</figcaption>
  </figure>;
}
