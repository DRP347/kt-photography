import type { Metadata } from "next";
import Link from "next/link";
import { ImageFrame } from "@/components/editorial/ImageFrame";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { FooterArchive } from "@/components/layout/FooterArchive";
import { stories } from "@/data/archive";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Experience",
  description: "How KT Photography approaches wedding photography and films with preparation, calm and care.",
  robots: {
    index: false,
    follow: true
  },
  alternates: {
    canonical: absoluteUrl("/experience")
  }
};

const steps = [
  {
    title: "Before the wedding",
    copy: "Dates, venues, rituals and family sides are understood before the team arrives."
  },
  {
    title: "During the wedding",
    copy: "The team guides gently when it helps and steps back when the room needs space."
  },
  {
    title: "After the wedding",
    copy: "Previews, films, albums and delivery rhythm are kept clear from the start."
  }
];

export default function ExperiencePage() {
  return (
    <>
      <main id="main">
        <section className="site-shell pb-12 pt-36 md:pt-40">
          <SectionLabel>Experience</SectionLabel>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.4rem,8vw,8rem)] font-normal leading-[0.9]">
            Prepared, present, never in the way.
          </h1>
        </section>

        <section className="section-space-tight bg-paper-soft">
          <div className="site-shell grid gap-10 lg:grid-cols-[0.48fr_0.52fr] lg:items-center">
            <ImageFrame
              image={stories[1].hero}
              sizes="(max-width: 1024px) 92vw, 44vw"
              padded
              className="frame-story min-h-[320px]"
            />
            <div>
              <SectionLabel>How KT works</SectionLabel>
              <h2 className="editorial-heading mt-5">Calm is planned before it is felt.</h2>
              <p className="body-copy mt-6">
                Weddings are full, fast and emotional. The experience is designed so the team can move through rituals, portraits and films without pulling attention away from the day.
              </p>
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="site-shell grid gap-10 lg:grid-cols-[0.35fr_0.65fr]">
            <SectionLabel>Process</SectionLabel>
            <div className="border-t border-line-soft">
              {steps.map((step, index) => (
                <article key={step.title} className="grid gap-5 border-b border-line-soft py-7 md:grid-cols-[4rem_1fr]">
                  <p className="meta-text">{String(index + 1).padStart(2, "0")}</p>
                  <div>
                    <h2 className="font-display text-[clamp(2rem,4vw,4rem)] font-normal leading-none">{step.title}</h2>
                    <p className="body-copy mt-4">{step.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space-tight bg-paper-soft">
          <div className="site-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="editorial-heading max-w-3xl">Photo and film moving together.</h2>
            <Link href="/contact" className="quiet-button w-fit">Check date</Link>
          </div>
        </section>
      </main>
      <FooterArchive />
    </>
  );
}
