import Link from "next/link";
import { ImageFrame } from "@/components/editorial/ImageFrame";
import { getPublicStorySlug, type Story } from "@/data/archive";

export function StoryCard({
  story,
  variant = "standard"
}: {
  story: Story;
  variant?: "standard" | "wide" | "tall";
}) {
  const aspect =
    variant === "wide"
      ? "frame-wide"
      : variant === "tall"
        ? "frame-portrait"
        : "frame-story";

  return (
    <article className="group grid gap-4">
      <Link href={`/stories/${getPublicStorySlug(story.slug)}`} aria-label={`Open ${story.coupleName}`}>
        <ImageFrame
          image={story.cover}
          sizes="(max-width: 768px) 92vw, (max-width: 1200px) 45vw, 32vw"
          className={`${aspect} transition duration-500 group-hover:opacity-90`}
        />
      </Link>
      <div className="grid gap-3 border-t border-line-soft pt-4">
        <div className="flex items-center justify-between gap-4">
          <p className="meta-text">{story.category}</p>
          <p className="meta-text">{story.location}</p>
        </div>
        <h3 className="font-display text-[clamp(1.75rem,3vw,2.8rem)] font-normal italic leading-none">
          {story.coupleName}
        </h3>
        <p className="max-w-md text-sm leading-7 text-muted">{story.intro}</p>
        <Link className="text-link mt-1 w-fit" href={`/stories/${getPublicStorySlug(story.slug)}`}>
          View story
        </Link>
      </div>
    </article>
  );
}
