import { stories } from "@/data/archive";

export type SiteImageTone =
  | "beige"
  | "haldi"
  | "red"
  | "bw"
  | "sangeet"
  | "green"
  | "ceremony"
  | "romantic";

export type SiteImage = {
  id: string;
  src: string;
  alt: string;
  tone: SiteImageTone;
  mood: string;
  objectPosition: string;
  objectPositionMobile?: string;
  priority?: boolean;
};

export type WeddingRoom = SiteImage & {
  label: string;
  text: string;
  slot: "haldi" | "ceremony" | "sangeet" | "portraits" | "family";
};

const bySlug = new Map(stories.map((story) => [story.slug, story]));

function image(slug: string, index: number) {
  const story = bySlug.get(slug) ?? stories[0];
  return story.gallery[index] ?? story.hero ?? story.cover;
}

export const weddingRooms: WeddingRoom[] = [
  {
    id: "haldi-colour-room",
    slot: "haldi",
    label: "Haldi",
    text: "Haldi, when everything becomes colour.",
    tone: "haldi",
    mood: "joyful colour",
    objectPosition: "50% 50%",
    objectPositionMobile: "50% 50%",
    ...image("sunil-vaishnavi", 4)
  },
  {
    id: "ceremony-silence-room",
    slot: "ceremony",
    label: "Ceremony",
    text: "Ceremony, when the room goes quiet.",
    tone: "ceremony",
    mood: "ritual quiet",
    objectPosition: "50% 50%",
    objectPositionMobile: "50% 50%",
    ...image("amrith-chetali", 18)
  },
  {
    id: "sangeet-movement-room",
    slot: "sangeet",
    label: "Sangeet",
    text: "Sangeet, when the night starts moving.",
    tone: "sangeet",
    mood: "evening movement",
    objectPosition: "50% 50%",
    objectPositionMobile: "50% 50%",
    ...image("jay-riya", 12)
  },
  {
    id: "portrait-pause-room",
    slot: "portraits",
    label: "Portraits",
    text: "Portraits, when the chaos pauses.",
    tone: "red",
    mood: "editorial pause",
    objectPosition: "50% 50%",
    objectPositionMobile: "50% 50%",
    ...image("aamir-binish", 20)
  },
  {
    id: "family-story-room",
    slot: "family",
    label: "Family",
    text: "Family, where the real story sits.",
    tone: "romantic",
    mood: "family emotion",
    objectPosition: "50% 50%",
    objectPositionMobile: "50% 50%",
    ...image("mayank-rajeshree", 8)
  }
];
