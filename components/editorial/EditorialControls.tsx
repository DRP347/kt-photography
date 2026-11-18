import styles from "./EditorialControls.module.css";

export function EditorialControls({ current, total, label, controls, onPrevious, onNext }: {
  current: number; total: number; label: string; controls: string;
  onPrevious: () => void; onNext: () => void;
}) {
  return <div className={styles.controls}>
    <span className={styles.progress} role="status" aria-live="polite" aria-atomic="true">
      <span className="sr-only">{label} </span>{String(current + 1).padStart(2, "0")} <span className={styles.slash}>/</span> <span className="sr-only">of </span>{String(total).padStart(2, "0")}
    </span>
    <button type="button" onClick={onPrevious} aria-disabled={current === 0} aria-label={`Previous ${label.toLowerCase()}`} aria-controls={controls}><span aria-hidden="true">←</span></button>
    <button type="button" onClick={onNext} aria-disabled={current === total - 1} aria-label={`Next ${label.toLowerCase()}`} aria-controls={controls}><span aria-hidden="true">→</span></button>
  </div>;
}
