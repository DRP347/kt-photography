import Image from "next/image";
import Link from "next/link";
import { contact } from "@/data/archive";

export function BookingRoom() {
  return (
    <section className="booking-room" aria-labelledby="booking-room-title">
      <figure className="booking-room__botanical booking-room__botanical--left" aria-hidden="true">
        <Image
          src="/decor/botanicals/botanical-left.png"
          alt=""
          width={520}
          height={620}
          sizes="(max-width: 700px) 42vw, 24vw"
          loading="lazy"
        />
      </figure>
      <figure className="booking-room__botanical booking-room__botanical--right" aria-hidden="true">
        <Image
          src="/decor/botanicals/botanical-right.png"
          alt=""
          width={520}
          height={620}
          sizes="(max-width: 700px) 42vw, 24vw"
          loading="lazy"
        />
      </figure>
      <div className="booking-room__inner">
        <p className="type-kicker">Booking room</p>
        <h2 id="booking-room-title">
          <span>Tell us where the day is happening,</span>
          <span>and what you want to remember.</span>
        </h2>
        <p className="booking-room__location">{contact.location}</p>
        <Link href="/check-date" className="editorial-link type-cta booking-room__link">
          <span>Check your date</span>
        </Link>
      </div>
    </section>
  );
}
