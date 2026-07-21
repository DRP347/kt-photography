import type { Metadata } from "next";
import Link from "next/link";
import { ImageFrame } from "@/components/editorial/ImageFrame";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { FooterArchive } from "@/components/layout/FooterArchive";
import { eventWorks } from "@/data/archive";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events & Other Work",
  description: "Pre-weddings, haldi, ceremonies, family events and other work by KT Photography.",
  alternates: {
    canonical: absoluteUrl("/events")
  }
};

export default function EventsPage() {
  return (
    <>
      <main id="main">
        <section className="site-shell pb-12 pt-36 md:pt-40">
          <SectionLabel>Events / Other Work</SectionLabel>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.4rem,8vw,8rem)] font-normal leading-[0.9]">
            Coverage for every room around the wedding.
          </h1>
        </section>

        <section className="section-space-tight bg-paper-soft">
          <div className="site-shell grid gap-10 md:grid-cols-2">
            {eventWorks.map((event) => (
              <article id={event.slug} key={event.slug} className="grid gap-5">
                <ImageFrame
                  image={event.image}
                  sizes="(max-width: 768px) 92vw, 42vw"
                  className="frame-story"
                />
                <div className="border-t border-line-soft pt-5">
                  <p className="meta-text">{event.label} · {event.coupleName}</p>
                  <h2 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] font-normal leading-none">
                    {event.title}
                  </h2>
                  <p className="body-copy mt-5">{event.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-space-tight">
          <div className="site-shell flex flex-col gap-6 border-y border-line-soft py-8 md:flex-row md:items-center md:justify-between">
            <p className="body-copy">Planning something smaller, stranger or outside the wedding day?</p>
            <Link className="quiet-button w-fit" href="/contact">Ask KT</Link>
          </div>
        </section>
      </main>
      <FooterArchive />
    </>
  );
}
