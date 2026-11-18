"use client";
import { useRef } from "react";
import { useScrollHeader } from "./useScrollHeader";
import styles from "./header-motion.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { primaryLeftNavigation, primaryRightNavigation } from "@/lib/site";
export function SiteHeader() {
  const path = usePathname();
  const header = useRef<HTMLElement>(null);
  useScrollHeader(header, path);
  const active = (href: string) => path === href || path.startsWith(`${href}/`);
  return <header ref={header} className={`site-header ${styles.header}`} data-hidden="false"><div className="site-header__frame site-rail">
    <nav className="site-header__nav" aria-label="Primary navigation">{primaryLeftNavigation.map(link => <Link href={link.href} key={link.href} aria-current={active(link.href) ? "page" : undefined}>{link.label}</Link>)}</nav>
    <Link href="/" className="site-header__logo" aria-label="KT Photography home"><Image src="/kt-logo-transparent.png" alt="KT Photography" width={150} height={82} priority /></Link>
    <nav className="site-header__nav site-header__nav--right" aria-label="Enquiries and kind words">{primaryRightNavigation.map(link => <Link href={link.href} key={link.href} aria-current={active(link.href) ? "page" : undefined}>{link.label}</Link>)}<Link className="booking-button" href="/check-date">Check date</Link></nav>
    <Link href="/check-date" className="mobile-booking text-link">Check date</Link><MobileMenu />
  </div></header>;
}
