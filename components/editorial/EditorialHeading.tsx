import type { ReactNode } from "react";

export function EditorialHeading({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h2 className={`editorial-heading ${className}`}>{children}</h2>;
}
