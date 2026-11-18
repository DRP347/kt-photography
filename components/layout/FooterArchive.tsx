import Image from "next/image";
import Link from "next/link";
import { siteConfig, publicNavigation } from "@/lib/site";
export function FooterArchive() {
  const isPreview = process.env.VERCEL_ENV === "preview";
  return <footer className="site-footer"><div className="site-rail site-footer__inner">
    <div className="site-footer__identity"><Link href="/" aria-label="KT Photography home"><Image src="/kt-logo-transparent.png" alt="KT Photography" width={150} height={82} /></Link><p>{siteConfig.location}</p>{isPreview ? <span>{siteConfig.phoneDisplay}</span> : <a className="text-link" href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>}</div>
    <nav aria-label="Footer navigation">{publicNavigation.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
    <nav aria-label="Connect with KT"><a href={siteConfig.instagramHref} target="_blank" rel="noreferrer">Instagram</a><a href={siteConfig.youtubeHref} target="_blank" rel="noreferrer">YouTube</a>{isPreview ? <span>WhatsApp</span> : <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>}{siteConfig.email && (isPreview ? <span>Email</span> : <a href={`mailto:${siteConfig.email}`}>Email</a>)}</nav>
    <div className="site-footer__bottom"><p>© {new Date().getFullYear()} KT Photography</p><nav aria-label="Legal"><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/cookies">Cookies</Link></nav></div>
  </div></footer>;
}
