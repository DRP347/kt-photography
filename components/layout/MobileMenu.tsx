"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { publicNavigation } from "@/lib/site";

type MobileMenuProps = {
  active?: boolean;
};

export function MobileMenu({ active = true }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const scrollYRef = useRef(0);

  const closeMenu = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
    }
  }, []);

  useEffect(() => {
    if (!open || !active) return;
    const savedScrollY = window.scrollY;
    scrollYRef.current = savedScrollY;
    const body = document.body;
    const previousStyle = body.getAttribute("style");
    body.classList.add("menu-open");
    Object.assign(body.style, { position: "fixed", top: `-${savedScrollY}px`, left: "0", right: "0", width: "100%", overflow: "hidden" });
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus({ preventScroll: true }));
    return () => {
      window.cancelAnimationFrame(focusFrame);
      body.classList.remove("menu-open");
      if (previousStyle === null) body.removeAttribute("style");
      else body.setAttribute("style", previousStyle);
      window.scrollTo({ top: savedScrollY, behavior: "instant" });
    };
  }, [active, open]);

  useEffect(() => {
    if (!open || !active) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu(true);
      }

      if (event.key === "Tab") {
        const panel = closeButtonRef.current?.closest<HTMLElement>(".menu-panel");
        if (!panel) return;

        const focusable = Array.from(
          panel.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"
          )
        ).filter((element) => !element.hasAttribute("disabled") && element.offsetParent !== null);

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setOpen(false);
      }
    };

    const handlePopState = () => {
      setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [active, closeMenu, open]);

  useEffect(() => {
    if (!active) {
      setOpen(false);
    }
  }, [active]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="mobile-menu-root" data-menu-open={open && active} data-menu-active={active}>
      <button
        ref={triggerRef}
        type="button"
        className="floating-menu-button"
        onClick={() => active && setOpen((value) => !value)}
        aria-expanded={open && active}
        aria-controls="site-menu"
        tabIndex={active ? 0 : -1}
      >
        {open && active ? "Close" : "Menu"}
      </button>

      <button
        type="button"
        aria-label="Close menu"
        className="menu-scrim"
        onClick={() => closeMenu(true)}
      />

      <div id="site-menu" className="menu-panel" role="dialog" aria-label="Site navigation" aria-modal="true">
        <div className="menu-panel-top">
          <p className="menu-kicker">KT Photography</p>
          <button ref={closeButtonRef} type="button" className="menu-close" onClick={() => closeMenu(true)}>
            Close
          </button>
        </div>

        <nav className="menu-links" aria-label="Menu navigation">
          {publicNavigation.map((link, index) => (
            <Link
              href={link.href}
              className="menu-link"
              key={link.href}
              onClick={() => closeMenu(false)}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              <span className="menu-link-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="menu-link-label">{link.label}</span>
              <span className="menu-link-note">{link.note}</span>
            </Link>
          ))}
        </nav>

        <div className="menu-panel-bottom">
          <p>Daman / Across India</p>
          <p>Photographs and films that let the feeling linger.</p>
        </div>
      </div>
    </div>
  );
}
