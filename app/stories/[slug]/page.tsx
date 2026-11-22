import { StoryOpening } from "@/components/editorial/StoryOpening";
import { Reveal } from "@/components/motion/Reveal";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingRoom } from "@/components/editorial/BookingRoom";
import { StoryFilmTile } from "@/components/editorial/StoryFilmTile";
import { StoryShareButton } from "@/components/editorial/StoryShareButton";
import { FooterArchive } from "@/components/layout/FooterArchive";
import { ArchivePhoto } from "@/components/rebuild/ArchivePhoto";
import { coupleStoryManifests, films, getFilm, getStory, stories, type StoryImage } from "@/data/archive";
import { getCuratedManifest, getCuratedStory } from "@/data/storyCuration";
import { absoluteUrl } from "@/lib/site";
type StoryPageProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) return {};
  const curatedStory = getCuratedStory(story, coupleStoryManifests[story.slug]);

  return {
    title: `${curatedStory.coupleName} Wedding Story`,
    description: curatedStory.intro,
    alternates: {
      canonical: absoluteUrl(`/stories/${curatedStory.slug}`)
    },
    openGraph: {
      title: `${curatedStory.coupleName} Wedding Story | KT Photography`,
      description: curatedStory.intro,
      url: absoluteUrl(`/stories/${curatedStory.slug}`),
      images: [
        {
          url: curatedStory.cover.src,
          alt: curatedStory.cover.alt
        }
      ]
    }
  };
}


function imageRatio(image: StoryImage) {
  return (image.width ?? (image.orientation === "portrait" ? 1200 : 1800)) / (image.height ?? (image.orientation === "portrait" ? 1800 : 1200));
}

// Choose row breaks for the whole event so the final photos can share a row
// with their neighbors without moving out of sequence.
function albumRows(images: StoryImage[]) {
  if (images.length <= 1) return images.length ? [images] : [];

  const ratios = images.map(imageRatio);
  const costs = Array<number>(images.length + 1).fill(Infinity);
  const sizes = Array<number>(images.length).fill(0);
  costs[images.length] = 0;

  for (let start = images.length - 2; start >= 0; start--) {
    let ratio = ratios[start];
    for (let end = start + 1; end < Math.min(start + 5, images.length); end++) {
      ratio += ratios[end];
      const size = end - start + 1;
      // A ratio near 2.9 keeps the row at roughly one third of the rail's width.
      // Favor smaller groups when equally balanced, with room for five portraits.
      const cost = (2.9 / ratio - 1) ** 2 + (size === 5 ? 0.035 : 0) + costs[end + 1];
      if (cost < costs[start]) {
        costs[start] = cost;
        sizes[start] = size;
      }
    }
  }

  const rows: StoryImage[][] = [];
  for (let start = 0; start < images.length; start += sizes[start]) {
    rows.push(images.slice(start, start + sizes[start]));
  }
  return rows;
}
export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const base = getStory(slug);
  if (!base) notFound();
  const manifest = getCuratedManifest(base, coupleStoryManifests[base.slug]);
  const story = getCuratedStory(base, coupleStoryManifests[base.slug]);
  const film = story.filmSlug ? getFilm(story.filmSlug) : films.find(item => item.coupleName === story.coupleName);
  const functions = manifest?.functions.length ? [...manifest.functions].sort((a,b) => a.order - b.order) : [{ id: "story", label: story.events.join(" / "), images: story.gallery }];
  const opening = manifest?.openingTriptych;
  // Prefer only already-curated opening photographs, keeping chapter order intact.
  const candidates = [opening?.center, opening?.left, opening?.right, story.hero]
    .filter((image): image is StoryImage => Boolean(image))
    .filter((image, index, images) => images.findIndex(item => item.src === image.src) === index);
  const landscape = candidates.find(image => image.orientation === "landscape");
  const openingImages = landscape ? [landscape] : candidates.slice(0, 2);
  const seen = new Set(openingImages.map(image => image.src));
  const chapters = functions.map(chapter => ({ ...chapter, images: chapter.images.filter(image => { if (seen.has(image.src)) return false; seen.add(image.src); return true; }) })).filter(chapter => chapter.images.length);
  const index = stories.findIndex(item => item.slug === base.slug);
  const next = stories[(index + 1) % stories.length];
  const previous = stories[(index + stories.length - 1) % stories.length];
  return <><main id="main" className="couple-story">
    <header className="page-intro site-rail"><Reveal><p className="type-kicker">Wedding story</p><h1>{story.coupleName}</h1></Reveal></header>
    <div className="story-photographs site-rail">
    <StoryOpening paired={openingImages.length === 2}>
      {openingImages.map(image => <figure key={image.src} tabIndex={-1}><ArchivePhoto image={image} retryOnError priority sizes={openingImages.length === 2 ? "(max-width:700px) 92vw, 44vw" : "(max-width:1700px) 88vw, 1480px"} /></figure>)}
    </StoryOpening>
    <div className="story-album">{chapters.map(chapter => <div key={chapter.id} className="story-group">

      {albumRows(chapter.images).map((row, rowIndex) => {
        const ratios = row.map(imageRatio);
        const layout = {
          "--album-columns": ratios.map(ratio => `minmax(0, ${ratio}fr)`).join(" "),
          "--album-row-ratio": ratios.reduce((sum, ratio) => sum + ratio, 0),
          "--album-horizontal-gaps": `${(row.length - 1) * 4}px`,
        } as CSSProperties;
        return <div className="album-row album-row--compact" key={rowIndex} style={layout}>
          {row.map(image => <figure key={image.src} tabIndex={-1}><ArchivePhoto image={image} retryOnError sizes="(max-width: 700px) 92vw, (max-width: 1100px) 44vw, 500px" /></figure>)}
        </div>;
      })}
    </div>)}</div>
    </div>
    {film && <section className="story-film site-rail" aria-label={`${story.coupleName} film`}><StoryFilmTile title={`${story.coupleName} ${film.title}`} poster={film.poster} videoSrc={film.localVideoUrl} youtubeUrl={film.youtubeUrl} /></section>}
    <div className="story-tools site-rail"><Link className="text-link" href="/stories">Back to stories</Link><StoryShareButton title={`${story.coupleName} wedding story by KT Photography`} /></div>
    <nav className="story-pagination site-rail" aria-label="Browse wedding stories"><Link href={`/stories/${previous.slug}`}><span className="type-kicker">Previous story</span><span>{previous.coupleName}</span></Link><Link href={`/stories/${next.slug}`}><span className="type-kicker">Next story</span><span>{next.coupleName}</span></Link></nav>
    <BookingRoom />
  </main><FooterArchive /></>;
}
