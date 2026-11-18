import { ResilientImage as Image } from "@/components/media/ResilientImage";
import Link from "next/link";
import type { ImageAsset } from "@/data/archive";
import { Reveal } from "@/components/motion/Reveal";

const coverPositions: Record<string, string> = { "aamir-binish": "50% 10%", "amrith-chetali": "50% 65%", "jay-riya": "50% 10%", "mayank-rajeshree": "50% 25%" };

type StoryPreview = { slug: string; coupleName: string; cover: ImageAsset };

export function StoriesCollection({ stories }: { stories: StoryPreview[] }) {
  return <div className="stories-index__grid" aria-label="Wedding stories">
    {stories.map((story, index) => <article className="stories-index__entry" key={story.slug}>
      <Reveal><Link href={`/stories/${story.slug}`} className="stories-index__entry-link" aria-label={`View ${story.coupleName} story`}>
        <figure className={`stories-index__image${story.cover.orientation === "landscape" ? " stories-index__image--landscape" : ""}${story.slug === "saurav-khushboo" ? " stories-index__image--matte" : ""}`}>
          <Image src={story.cover.src} alt={story.cover.alt} fill priority={index < 2}
            sizes="(max-width: 600px) 92vw, (max-width: 1350px) 43vw, 574px" style={{ objectPosition: coverPositions[story.slug] ?? story.cover.objectPosition ?? "50% 20%" }} />
          <figcaption className="story-hover-name">{story.coupleName}</figcaption>
        </figure>
      </Link></Reveal>
    </article>)}
  </div>;
}
