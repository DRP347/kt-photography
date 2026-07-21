import { stories, type ImageAsset } from "@/data/archive";

type HomeHero = {
  image: ImageAsset;
  coupleName: string;
  categories: string;
  storyHref: string;
};

export type HeroSlide = {
  id: string;
  src: string;
  alt: string;
  detailSrc?: string;
  detailAlt?: string;
  detailObjectPosition?: string;
  detailObjectPositionMobile?: string;
  coupleName: string;
  caption?: string;
  storyHref?: string;
  eventLabel?: string;
  accentTone: HeroAccentTone;
  objectPosition: string;
  objectPositionMobile?: string;
  orientation?: ImageAsset["orientation"];
};

export type HeroAccentTone = "gold" | "haldi" | "rose" | "sindoor" | "plum" | "mehendi" | "sand";

export const heroAccentMap: Record<HeroAccentTone, string> = {
  gold: "var(--accent-gold)",
  haldi: "var(--accent-haldi)",
  rose: "var(--accent-rose)",
  sindoor: "var(--accent-sindoor)",
  plum: "var(--accent-plum)",
  mehendi: "var(--accent-mehendi)",
  sand: "var(--accent-sand)"
};

export type GatewayItem = {
  id: "stories" | "films" | "experience" | "about" | "check-date";
  title: string;
  description: string;
  href: string;
  image?: ImageAsset;
  tone: "image" | "quiet" | "accent";
};

const storyBySlug = new Map(stories.map((story) => [story.slug, story]));
const getStory = (slug: string) => storyBySlug.get(slug) ?? stories[0];
const getGalleryImage = (slug: string, index: number) => {
  const story = getStory(slug);
  return story.gallery[index] ?? story.hero ?? story.cover;
};

const heroStory = getStory("aamir-binish");

export const homeHero: HomeHero = {
  coupleName: heroStory.coupleName,
  categories: "Weddings · Pre-Weddings · Films",
  storyHref: `/stories/${heroStory.slug}`,
  image: heroStory.hero
};

export const homeHeroSlides: HeroSlide[] = [
  {
    id: "aamir-binish-drive-hero",
    src: getStory("aamir-binish").hero.src,
    alt: getStory("aamir-binish").hero.alt,
    coupleName: getStory("aamir-binish").coupleName,
    caption: "A wedding story held through ceremony, family, and quiet portraits.",
    storyHref: "/stories/aamir-binish",
    eventLabel: "Wedding",
    accentTone: "sand",
    objectPosition: "50% 50%",
    orientation: getStory("aamir-binish").hero.orientation
  },
  {
    id: "amrith-chetali-drive-hero",
    src: getStory("amrith-chetali").hero.src,
    alt: getStory("amrith-chetali").hero.alt,
    coupleName: getStory("amrith-chetali").coupleName,
    caption: "Haldi, sangeet, and wedding frames from the local Drive archive.",
    storyHref: "/stories/amrith-chetali",
    eventLabel: "Haldi",
    accentTone: "haldi",
    objectPosition: "50% 50%",
    orientation: getStory("amrith-chetali").hero.orientation
  },
  {
    id: "monika-aman-drive-hero",
    src: getStory("monika-aman").hero.src,
    alt: getStory("monika-aman").hero.alt,
    coupleName: getStory("monika-aman").coupleName,
    caption: "Aman and Monika, kept in a calm wedding sequence.",
    storyHref: "/stories/monika-aman",
    eventLabel: "Wedding",
    accentTone: "rose",
    objectPosition: "50% 50%",
    orientation: getStory("monika-aman").hero.orientation
  },
  {
    id: "sunil-vaishnavi-drive-hero",
    src: getStory("sunil-vaishnavi").hero.src,
    alt: getStory("sunil-vaishnavi").hero.alt,
    coupleName: getStory("sunil-vaishnavi").coupleName,
    caption: "Haldi and wedding images from the new local source.",
    storyHref: "/stories/sunil-vaishnavi",
    eventLabel: "Wedding",
    accentTone: "gold",
    objectPosition: "50% 50%",
    orientation: getStory("sunil-vaishnavi").hero.orientation
  }
];

export const gatewayItems: GatewayItem[] = [
  {
    id: "stories",
    title: "Stories",
    description: "Real wedding stories, told with room to breathe.",
    href: "/stories",
    tone: "image",
    image: getGalleryImage("jay-riya", 0)
  },
  {
    id: "films",
    title: "Films",
    description: "Movement, sound, and atmosphere.",
    href: "/films",
    tone: "image",
    image: getGalleryImage("sunil-vaishnavi", 4)
  },
  {
    id: "about",
    title: "About",
    description: "The eye, the people, and the studio behind KT.",
    href: "/about",
    tone: "quiet",
    image: getGalleryImage("amrith-chetali", 8)
  },
  {
    id: "check-date",
    title: "Check Date",
    description: "Start with availability.",
    href: "/check-date",
    tone: "accent",
    image: getGalleryImage("aamir-binish", 10)
  }
];
