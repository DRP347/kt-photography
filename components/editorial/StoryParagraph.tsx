import { aboutStory } from "@/data/aboutStory";

/** One source of approved copy for the full story and homepage excerpts. */
export function StoryParagraph({ index, className }: { index: number; className?: string }) {
  const paragraph = aboutStory[index];
  const emphasis = "emphasis" in paragraph ? paragraph.emphasis : undefined;
  const start = emphasis ? paragraph.text.indexOf(emphasis) : -1;
  return <p className={className} data-story-paragraph={paragraph.id}>
    {emphasis && start !== -1 ? <>{paragraph.text.slice(0, start)}<strong>{emphasis}</strong>{paragraph.text.slice(start + emphasis.length)}</> : paragraph.text}
  </p>;
}
