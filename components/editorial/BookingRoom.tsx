import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { BookingAtmosphere } from "./BookingAtmosphere";
import { Reveal } from "@/components/motion/Reveal";
export function BookingRoom() {
  return <section className="booking-room site-rail" aria-labelledby="booking-room-title">
    <BookingAtmosphere />
    <Reveal><p className="type-kicker">Your story, next</p><h2 id="booking-room-title">Tell us where the day is happening, and what you want to remember.</h2><p className="booking-room__location">{siteConfig.location}</p><Link className="booking-button" href="/check-date">Check your date</Link></Reveal>
  </section>;
}
