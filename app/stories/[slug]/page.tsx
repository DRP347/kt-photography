import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { BookingRoom } from "@/components/editorial/BookingRoom";
import { StoryFilmTile } from "@/components/editorial/StoryFilmTile";
import { StoryShareButton } from "@/components/editorial/StoryShareButton";
import type { OpeningTriptych, StoryFunction, StoryImage, StoryModule } from "@/data/archive";
import { coupleStoryManifests, films, getFilm, getPublicStorySlug, getStory, stories } from "@/data/archive";
import { getCuratedManifest, getCuratedStory } from "@/data/storyCuration";
import { absoluteUrl } from "@/lib/site";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return stories.map((story) => ({ slug: getPublicStorySlug(story.slug) }));
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
      canonical: absoluteUrl(`/stories/${getPublicStorySlug(curatedStory.slug)}`)
    },
    openGraph: {
      title: `${curatedStory.coupleName} Wedding Story | KT Photography`,
      description: curatedStory.intro,
      url: absoluteUrl(`/stories/${getPublicStorySlug(curatedStory.slug)}`),
      images: [
        {
          url: curatedStory.cover.src,
          alt: curatedStory.cover.alt
        }
      ]
    }
  };
}

const defaultStoryLines: Record<string, string> = {
  "aamir-binish": "The quiet stayed inside the chaos.",
  "amrith-chetali": "Held gently between laughter and light.",
  "monika-aman": "Softly held, never performed.",
  "dhavani-gaurav": "A place, a pause, and the day around them.",
  "saurav-khushboo": "Colour, family, and the quiet after.",
  "kunal-aditi": "Patient frames from ceremony and portraiture.",
  "jay-riya": "A compact moving-memory story.",
  "mayank-rajeshree": "People, rituals, and the in-between.",
  "bhavin-karishma": "A wedding story held in ceremony order.",
  "sunil-vaishnavi": "Haldi and sangeet held close."
};

function uniqueImages(images: StoryImage[]) {
  const seen = new Set<string>();
  return images.filter((image) => {
    if (seen.has(image.src)) return false;
    seen.add(image.src);
    return true;
  });
}

function buildFallbackFunctions(story: NonNullable<ReturnType<typeof getStory>>): StoryFunction[] {
  return [
    {
      id: "story",
      label: story.events.join(" / "),
      order: 1,
      layoutPattern: "F",
      images: uniqueImages([story.hero, story.cover, ...story.gallery])
    }
  ];
}

function getFrameClass(image: StoryImage, index: number, groupIndex: number) {
  const role = image.layoutRole;

  if (role === "panoramic") return "couple-story-frame couple-story-frame--panoramic";
  if (role === "wide") return "couple-story-frame couple-story-frame--wide";
  if (role === "feature") return "couple-story-frame couple-story-frame--feature";
  if (role === "detail") return "couple-story-frame couple-story-frame--detail";
  if (role === "portrait") return "couple-story-frame couple-story-frame--portrait";
  if (image.importance === "feature") return "couple-story-frame couple-story-frame--feature";
  if (image.orientation === "portrait") return "couple-story-frame couple-story-frame--portrait";
  if ((index + groupIndex) % 5 === 0) return "couple-story-frame couple-story-frame--wide";
  return "couple-story-frame couple-story-frame--standard";
}

function getSizes(image: StoryImage) {
  if (image.layoutRole === "panoramic" || image.layoutRole === "wide" || image.layoutRole === "feature") {
    return "(max-width: 700px) calc(100vw - 32px), (max-width: 1100px) calc(100vw - 64px), 72vw";
  }

  return "(max-width: 700px) calc((100vw - 36px) / 2), (max-width: 1100px) calc((100vw - 76px) / 2), 32vw";
}

function getImageStyle(image: StoryImage) {
  return {
    "--crop-desktop": image.cropDesktop ?? image.objectPosition ?? "50% 50%",
    "--crop-tablet": image.cropTablet ?? image.cropDesktop ?? image.objectPosition ?? "50% 50%",
    "--crop-mobile": image.cropMobile ?? image.cropTablet ?? image.cropDesktop ?? image.objectPosition ?? "50% 50%"
  } as CSSProperties;
}

function getOpeningEntries(opening: OpeningTriptych) {
  return [
    { slot: "left", image: opening.left },
    { slot: "center", image: opening.center },
    { slot: "right", image: opening.right }
  ] as const;
}

function getOpeningSizes(slot: "left" | "center" | "right") {
  if (slot === "center") {
    return "(max-width: 700px) calc(100vw - 28px), (max-width: 1100px) calc(100vw - 64px), 44vw";
  }

  return "(max-width: 700px) calc((100vw - 36px) / 2), (max-width: 1100px) calc((100vw - 76px) / 2), 22vw";
}

function getModuleSizes(module: StoryModule, image: StoryImage, index: number) {
  if (module.module === "G" || image.layoutRole === "wide" || image.layoutRole === "feature" || index === 1) {
    return "(max-width: 700px) calc(100vw - 28px), (max-width: 1100px) calc(100vw - 64px), 58vw";
  }

  return "(max-width: 700px) calc((100vw - 36px) / 2), (max-width: 1100px) calc((100vw - 76px) / 2), 28vw";
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const baseStory = getStory(slug);
  if (!baseStory) notFound();

  const manifest = getCuratedManifest(baseStory, coupleStoryManifests[baseStory.slug]);
  const story = getCuratedStory(baseStory, manifest);
  const manifestFilm =
    manifest?.film?.localVideoUrl && manifest.film.poster
      ? {
          title: manifest.film.title ?? "The Wedding Film",
          poster: manifest.film.poster,
          localVideoUrl: manifest.film.localVideoUrl
        }
      : null;
  const film =
    manifestFilm ??
    (story.filmSlug ? getFilm(story.filmSlug) : films.find((item) => item.coupleName === story.coupleName));
  const filmYoutubeUrl = film && "youtubeUrl" in film ? film.youtubeUrl : undefined;
  const functions = (manifest?.functions ?? buildFallbackFunctions(story)).sort((a, b) => a.order - b.order);
  const quote = manifest?.quote ?? defaultStoryLines[story.slug] ?? story.note;
  const firstPrioritySrc = functions[0]?.images[0]?.src;
  const openingTriptych = manifest?.openingTriptych;

  return (
    <main id="main" className="couple-story">
      <section className="couple-story-intro" aria-labelledby="couple-story-title">
        <h1 id="couple-story-title">{story.coupleName}</h1>
        <p>{quote}</p>
      </section>

      {openingTriptych ? (
        <section className="couple-story-opening" aria-label={`${story.coupleName} opening portraits`}>
          {getOpeningEntries(openingTriptych).map(({ slot, image }) => (
            <figure className={`couple-story-opening__frame couple-story-opening__frame--${slot}`} key={image.src}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes={getOpeningSizes(slot)}
                style={getImageStyle(image)}
              />
            </figure>
          ))}
        </section>
      ) : null}

      <section className="couple-story-gallery" aria-label={`${story.coupleName} wedding album`}>
        {functions.map((storyFunction, groupIndex) => (
          <div
            className={`couple-story-group couple-story-group--${storyFunction.layoutPattern?.toLowerCase() ?? "fallback"}`}
            data-function={storyFunction.id}
            key={storyFunction.id}
          >
            {storyFunction.modules?.length ? (
              <div className="couple-story-modules">
                {storyFunction.modules.map((module) => (
                  <div
                    className={`couple-story-module couple-story-module--${module.module.toLowerCase()}`}
                    data-module={module.module}
                    key={module.id}
                  >
                    {module.images.map((image, imageIndex) => (
                      <figure
                        className={`couple-story-frame couple-story-module__frame couple-story-module__frame--${imageIndex + 1}`}
                        data-orientation={image.orientation}
                        key={`${module.id}-${image.src}`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          priority={!openingTriptych && image.src === firstPrioritySrc}
                          sizes={getModuleSizes(module, image, imageIndex)}
                          style={getImageStyle(image)}
                        />
                      </figure>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="couple-story-mosaic">
                {storyFunction.images.map((image, imageIndex) => (
                  <figure
                    className={getFrameClass(image, imageIndex, groupIndex)}
                    data-orientation={image.orientation}
                    key={`${storyFunction.id}-${image.src}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      priority={!openingTriptych && image.src === firstPrioritySrc}
                      sizes={getSizes(image)}
                      style={getImageStyle(image)}
                    />
                  </figure>
                ))}
              </div>
            )}
          </div>
        ))}

        {film ? (
          <div className="couple-story-film">
            <StoryFilmTile title={film.title} poster={film.poster} videoSrc={film.localVideoUrl} youtubeUrl={filmYoutubeUrl} />
          </div>
        ) : null}
      </section>

      <div className="couple-story-tools" aria-label="Story controls">
        <StoryShareButton title={`${story.coupleName} wedding story by KT Photography`} />
      </div>

      <BookingRoom />
    </main>
  );
}
