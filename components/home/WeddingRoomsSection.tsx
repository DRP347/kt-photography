import Image from "next/image";
import type { CSSProperties } from "react";
import { weddingRooms } from "@/data/weddingRooms";

const sizesBySlot = {
  haldi: "(max-width: 767px) 92vw, (max-width: 1023px) 44vw, 32vw",
  ceremony: "(max-width: 767px) 92vw, (max-width: 1023px) 44vw, 31vw",
  sangeet: "(max-width: 767px) 92vw, (max-width: 1023px) 44vw, 31vw",
  portraits: "(max-width: 767px) 92vw, (max-width: 1023px) 44vw, 39vw",
  family: "(max-width: 767px) 92vw, (max-width: 1023px) 44vw, 39vw"
};

export function WeddingRoomsSection() {
  return (
    <section id="landing" className="section wedding-rooms" aria-labelledby="wedding-rooms-title">
      <div className="site-rail wedding-rooms__inner">
        <div className="wedding-rooms-header">
          <p className="section-kicker">Wedding moods</p>
          <h1 id="wedding-rooms-title" className="section-heading">
            A day made of many rooms.
          </h1>
          <div className="reading-shell">
            <p className="section-copy wedding-rooms-copy">
              Some rooms are loud. Some go completely silent. Some hold rituals, some hold nervous hands, some hold people trying not to cry. We photograph the full atmosphere of a wedding — not just the frame everyone expected.
            </p>
          </div>
        </div>

        <div className="wedding-rooms-layout" aria-label="Wedding moods image composition">
          {weddingRooms.map((room) => {
            const roomStyle = {
              "--room-position": room.objectPosition,
              "--room-position-mobile": room.objectPositionMobile ?? room.objectPosition
            } as CSSProperties;

            return (
              <figure
                className={`wedding-room-frame wedding-room-frame--${room.slot}`}
                data-tone={room.tone}
                key={room.id}
                style={roomStyle}
              >
                <Image
                  src={room.src}
                  alt={room.alt}
                  fill
                  sizes={sizesBySlot[room.slot]}
                  priority={room.priority}
                />
                <figcaption>
                  <span>{room.label}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <div className="wedding-rooms-list" aria-label="Wedding mood notes">
          {weddingRooms.map((room) => (
            <p key={room.id}>{room.text}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
