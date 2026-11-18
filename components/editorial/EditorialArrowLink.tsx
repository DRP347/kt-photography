import Link from "next/link";
import type { ReactNode } from "react";

export function EditorialArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="editorial-arrow-link" href={href}><span>{children}</span></Link>;
}
