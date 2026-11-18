import Link from "next/link";
import { FooterArchive } from "@/components/layout/FooterArchive";
export default function NotFound() { return <><main id="main" className="not-found site-rail"><p className="type-kicker">404 / Page not found</p><h1>This frame is not<br />in the archive.</h1><p>The story may have moved, or the link may be incomplete.</p><Link href="/stories" className="booking-button">Return to stories</Link></main><FooterArchive /></>; }
