import type { ReactNode } from "react";
import styles from "@/styles/route-transition.module.css";

/** Next remounts templates on navigation; no interception, delays or scroll resets. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className={styles.page} data-route-transition>{children}</div>;
}
