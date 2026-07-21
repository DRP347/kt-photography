import Link from "next/link";
import { contact } from "@/data/archive";
import { publicNavigation } from "@/lib/site";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="4.5" y="4.5" width="15" height="15" rx="4.2" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.8 7.4h.01" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5.4 7.8c.28-.9.96-1.34 1.92-1.46C8.65 6.16 10.3 6.1 12 6.1s3.35.06 4.68.24c.96.12 1.64.56 1.92 1.46.24.78.35 2.1.35 4.2s-.11 3.42-.35 4.2c-.28.9-.96 1.34-1.92 1.46-1.33.18-2.98.24-4.68.24s-3.35-.06-4.68-.24c-.96-.12-1.64-.56-1.92-1.46-.24-.78-.35-2.1-.35-4.2s.11-3.42.35-4.2Z" />
      <path d="m10.4 9.5 4.1 2.5-4.1 2.5V9.5Z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5.8 17.7a7.3 7.3 0 1 1 2.48 1.92L5 20.2l.8-2.5Z" />
      <path d="M9.1 10.1c.42 1.72 1.62 3.04 3.58 3.93.42.2.88.12 1.18-.22l.42-.48c.2-.22.52-.28.78-.14l1.12.6" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="4.5" y="6.5" width="15" height="11" rx="1.8" />
      <path d="m5.4 7.6 6.6 5.1 6.6-5.1" />
    </svg>
  );
}

const contactLinks = [
  { label: "Instagram", href: contact.instagramHref, external: true, icon: InstagramIcon },
  { label: "YouTube", href: contact.youtubeHref, external: true, icon: YoutubeIcon },
  { label: "WhatsApp", href: contact.whatsappHref, external: true, icon: MessageIcon },
  { label: "Email", href: contact.emailHref, icon: MailIcon }
].filter((link) => link.href);

const legalLinks = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" }
];

export function FooterArchive() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="site-footer">
      <div className="site-footer__bottom site-rail">
        <div className="site-footer__identity">
          <Link href="/" className="site-footer__brand" aria-label="KT Photography home">KT Photography</Link>
          <div className="site-footer__statement">
            <p>{contact.location}</p>
            <p>Photographs and films for wedding days that still feel alive later.</p>
          </div>
        </div>

        <div className="site-footer__groups">
          <nav className="site-footer__nav" aria-label="Footer navigation">
            <p>Explore</p>
            {publicNavigation.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="site-footer__contact" aria-label="Social and contact links">
            <p>Connect</p>
            {contactLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  href={link.href}
                  key={link.label}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                >
                  <Icon />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          <nav className="site-footer__legal" aria-label="Legal links">
            <p>Legal</p>
            {legalLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="site-footer__copyright">© {year} KT Photography. All rights reserved.</p>
      </div>
    </footer>
  );
}
