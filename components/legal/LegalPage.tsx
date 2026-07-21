import { FooterArchive } from "@/components/layout/FooterArchive";
import type { LegalSection } from "@/data/legalPages";

type LegalPageProps = {
  title: string;
  kicker: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalPage({ title, kicker, intro, lastUpdated, sections }: LegalPageProps) {
  return (
    <>
      <main id="main" className="legal-page">
        <section className="legal-page__hero" aria-labelledby="legal-page-title">
          <p className="type-kicker">{kicker}</p>
          <h1 id="legal-page-title">{title}</h1>
          <p>{intro}</p>
          <div className="legal-page__meta" aria-label="Page metadata">
            <span>Last updated {lastUpdated}</span>
            <span>Production review draft</span>
          </div>
        </section>

        <div className="legal-page__body">
          <nav className="legal-toc" aria-label={`${title} sections`}>
            {sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>
                {section.title}
              </a>
            ))}
          </nav>

          <div className="legal-page__sections">
            {sections.map((section) => (
              <section className="legal-section" id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </main>
      <FooterArchive />
    </>
  );
}
