"use client";

import Link from "next/link";
import styles from "@/components/loading/loading.module.css";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main id="main" className={styles.error} role="alert">
    <p className="type-kicker">KT Photography</p><h1>This page couldn’t open.</h1>
    <p>Please try again. You can also return home and continue exploring.</p>
    <button className="booking-button" type="button" onClick={reset}>Try again</button><Link className="text-link" href="/">Return home</Link>
  </main>;
}
