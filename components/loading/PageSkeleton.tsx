"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./loading.module.css";

export type SkeletonKind = "home" | "stories" | "couple" | "films" | "about" | "testimonials" | "enquiry" | "page";
const labels: Record<SkeletonKind, string> = { home: "homepage", stories: "wedding stories", couple: "wedding story", films: "wedding films", about: "our story", testimonials: "client reviews", enquiry: "date enquiry", page: "page" };
function Lines({ count = 4 }: { count?: number }) { return <div className={styles.lines}>{Array.from({ length: count }, (_, i) => <span key={i} />)}</div>; }

export function PageSkeleton({ kind }: { kind: SkeletonKind }) {
  const [delayed, setDelayed] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setDelayed(true), 10000); return () => clearTimeout(timer); }, []);
  return <main id="main" className={[styles.skeleton, styles[kind]].filter(Boolean).join(" ")} aria-busy="true" aria-label={`Loading ${labels[kind]}`} data-page-skeleton={kind} data-delayed={delayed}>
    <p className="sr-only" role="status">Loading {labels[kind]}.</p>
    <div className={styles.structure} aria-hidden="true">
      {kind !== "home" && <div className={styles.heading}><span /><span /></div>}
      {kind === "home" && <><div className={styles.hero} /><div className={styles.mosaic}>{Array.from({ length: 5 }, (_, i) => <div key={i} />)}</div></>}
      {kind === "stories" && <div className={styles.storiesGrid}>{Array.from({ length: 3 }, (_, i) => <div key={i}><div className={styles.portrait} /><Lines count={1} /></div>)}</div>}
      {kind === "couple" && <><div className={styles.landscape} /><div className={styles.gallery}><div className={styles.portrait} /><div className={styles.portrait} /></div></>}
      {kind === "films" && <><div className={styles.film} /><Lines count={1} /></>}
      {kind === "about" && <div className={styles.editorial}><div className={styles.portrait} /><div><Lines count={2} /><Lines count={6} /></div></div>}
      {kind === "testimonials" && <div className={styles.quotation}><div className={styles.choices}><span /><span /><span /></div><Lines count={8} /><Lines count={1} /></div>}
      {kind === "enquiry" && <div className={styles.form}><Lines count={3} /><div>{Array.from({ length: 5 }, (_, i) => <div className={styles.field} key={i} />)}</div></div>}
      {kind === "page" && <div className={styles.prose}><Lines count={5} /><Lines count={4} /></div>}
    </div>
    {delayed && <div className={styles.recovery} role="status"><p>This page is taking a little longer.</p><p>You can keep waiting, reload, or return home.</p><button type="button" className="text-link" onClick={() => window.location.reload()}>Reload page</button><Link className="text-link" href="/">Return home</Link></div>}
  </main>;
}
