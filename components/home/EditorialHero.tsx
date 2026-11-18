import { SwipeCarousel } from "@/components/rebuild/SwipeCarousel";
import { homeHeroSlides } from "@/data/homeLanding";
import { getCuratedStory } from "@/data/storyCuration";
import { coupleStoryManifests, stories } from "@/data/archive";

export function EditorialHero() {
  return <div className="home-hero site-rail"><h1 className="sr-only">Wedding photography and films by KT Photography</h1><SwipeCarousel slides={homeHeroSlides.map(slide => ({
    id: slide.id, name: slide.coupleName, href: slide.storyHref ?? "/stories",
    image: slide.id === "sunil-vaishnavi-drive-hero"
      ? { src: "/drive-media/sunil-vaishnavi/haldi/sunil-vaishnavi-haldi-1050.webp", alt: "A haldi moment from Sunil and Vaishnavi’s wedding story", orientation: "landscape" }
      : { src: slide.src, alt: slide.alt, orientation: slide.orientation },
    mobileImage: slide.id === "sunil-vaishnavi-drive-hero"
      ? { src: "/drive-media/sunil-vaishnavi/haldi/sunil-vaishnavi-haldi-1048.webp", alt: "Sunil seated before the haldi ceremony", orientation: "portrait" }
      : (() => { const story = stories.find(story => story.coupleName === slide.coupleName); return story ? getCuratedStory(story, coupleStoryManifests[story.slug]).cover : undefined; })()
  }))} /></div>;
}
