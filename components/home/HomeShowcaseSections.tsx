import { HomeFilm } from "./HomeFilm";
import { HomeAbout } from "./HomeAbout";
import { HomeTestimonials } from "./HomeTestimonials";
import { HomeEditorialLayer } from "./HomeEditorialLayer";
import { BookingRoom } from "@/components/editorial/BookingRoom";
import styles from "./HomeEditorialLayer.module.css";
import { stories, coupleStoryManifests } from "@/data/archive";
import { getCuratedStory } from "@/data/storyCuration";
import { StoriesSlider } from "./StoriesSlider";

export function HomeShowcaseSections() {
  const selected = stories.map(story => getCuratedStory(story, coupleStoryManifests[story.slug]));
  return <>
    <div className={`home-handoff ${styles.stack}`}>
      <StoriesSlider stories={selected} />
      <HomeFilm />
      <HomeEditorialLayer order={3} name="about"><HomeAbout /></HomeEditorialLayer>
      <HomeEditorialLayer order={4} name="testimonials"><HomeTestimonials /></HomeEditorialLayer>
      <HomeEditorialLayer order={5} name="enquiry"><BookingRoom /></HomeEditorialLayer>
    </div>
  </>;
}
