import Link from "next/link";
import { FooterArchive } from "@/components/layout/FooterArchive";

export default function NotFound() {
  return (
    <>
      <main id="main" className="section-space site-shell min-h-[80svh] pt-36">
        <p className="section-label">Page not found</p>
        <h1 className="mt-5 max-w-3xl font-display text-[clamp(3rem,8vw,7rem)] font-normal leading-[0.9]">
          This frame is not in the archive.
        </h1>
        <p className="body-copy mt-6">
          The story may have moved, or the link may have been typed in a rush.
        </p>
        <Link href="/stories" className="quiet-button mt-8">Return to stories</Link>
      </main>
      <FooterArchive />
    </>
  );
}
