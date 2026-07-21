"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { checkDateNavigation, primaryLeftNavigation, primaryRightNavigation } from "@/lib/site";

export function SiteHeader() {
  const [hideForGallery, setHideForGallery] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    if (pathname !== "/") {
      setHideForGallery(false);
      return undefined;
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-hide-header='true']"));

    if (sections.length === 0) {
      setHideForGallery(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY <= 8) {
          setHideForGallery(false);
          return;
        }

        setHideForGallery(entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > 0.42));
      },
      {
        root: null,
        threshold: [0, 0.42, 0.7]
      }
    );

    sections.forEach((section) => observer.observe(section));

    const revealAtTop = () => {
      if (window.scrollY <= 8) setHideForGallery(false);
    };

    window.addEventListener("scroll", revealAtTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealAtTop);
    };
  }, [pathname]);

  return (
    <header className={`site-header${hideForGallery ? " is-hidden-for-gallery" : ""}`}>
      <div className="site-header__frame site-rail">
        <nav className="site-header__nav site-header__nav--left" aria-label="Primary left navigation">
          {primaryLeftNavigation.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="nav-link"
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="site-header__logo" aria-label="KT Photography home">
          <Image
            src="/kt-logo-transparent.png"
            alt="KT Photography"
            width={150}
            height={82}
            priority
          />
        </Link>

        <nav className="site-header__nav site-header__nav--right" aria-label="Primary right navigation">
          {primaryRightNavigation.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="nav-link"
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          {checkDateNavigation ? (
            <Link
              href={checkDateNavigation.href}
              className="site-header__check"
              aria-current={isActive(checkDateNavigation.href) ? "page" : undefined}
            >
              {checkDateNavigation.label}
            </Link>
          ) : null}
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
