import type { Metadata } from "next";
import { FooterArchive } from "@/components/layout/FooterArchive";
import { BookingRoom } from "@/components/editorial/BookingRoom";
import { StoriesCollection } from "@/components/editorial/StoriesCollection";
import { Reveal } from "@/components/motion/Reveal";
import { coupleStoryManifests, stories, storyDisplayOrder } from "@/data/archive";
import { getCuratedStory } from "@/data/storyCuration";
import { absoluteUrl } from "@/lib/site";
import "@/styles/stories-index.css";

export const metadata: Metadata = {
  title: "Wedding Stories",
  description: "Fleeting moments, honest emotions, and wedding stories that stay with us. Explore the photography archive of KT Photography.",
  alternates: { canonical: absoluteUrl("/stories") }
};
const ordered = [...storyDisplayOrder.map(slug => stories.find(story => story.slug === slug)).filter((story): story is (typeof stories)[number] => Boolean(story)), ...stories.filter(story => !storyDisplayOrder.includes(story.slug))];

export default function StoriesPage() {
  const previews = ordered.map(base => {
    const story = getCuratedStory(base, coupleStoryManifests[base.slug]);
    return { slug: story.slug, coupleName: story.coupleName, cover: story.cover };
  });
  return <><main id="main" className="stories-index">
    <header className="stories-index__lead site-rail"><Reveal>
      <p className="type-kicker">The stories we keep</p>
      <h1>Every love story deserves<br className="stories-index__break" /> to be remembered.</h1>
      <p className="stories-index__description">A collection of fleeting moments, honest emotions,<br /> and stories that stay with us.</p>
    </Reveal></header>
    <section className="stories-index__collection site-rail" aria-label="Wedding photography archive"><StoriesCollection stories={previews} /></section>
    <BookingRoom />
  </main><FooterArchive /></>;
}
