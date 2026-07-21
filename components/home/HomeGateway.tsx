"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useState } from "react";
import { gatewayItems } from "@/data/homeLanding";

export function HomeGateway() {
  const [activeId, setActiveId] = useState(gatewayItems[0]?.id);
  const activeItem = gatewayItems.find((item) => item.id === activeId) ?? gatewayItems[0];
  const previewImage = activeItem.image ?? gatewayItems.find((item) => item.image)?.image;

  return (
    <section className="home-gateway" aria-labelledby="home-gateway-title">
      <div className="home-gateway__inner site-rail">
        <div className="home-gateway__copy">
          <p className="section-kicker">Index</p>
          <h2 id="home-gateway-title">Enter the work slowly.</h2>

          <div className="gateway-list">
            {gatewayItems.map((item, index) => (
              <Link
                className="gateway-row"
                data-active={item.id === activeId}
                href={item.href}
                key={item.id}
                onFocus={() => setActiveId(item.id)}
                onMouseEnter={() => setActiveId(item.id)}
              >
                <span className="gateway-row__number">{String(index + 1).padStart(2, "0")}</span>
                <span className="gateway-row__main">
                  <span className="gateway-row__title">{item.title}</span>
                  <span className="gateway-row__desc">{item.description}</span>
                </span>
                <span className="gateway-row__arrow" aria-hidden="true">-&gt;</span>
              </Link>
            ))}
          </div>
        </div>

        {previewImage ? (
          <figure
            className="gateway-preview"
            style={
              {
                "--gateway-preview-position": previewImage.objectPosition ?? "50% 50%"
              } as CSSProperties
            }
          >
            {gatewayItems.map((item) => item.image ? (
              <Image
                alt={item.image.alt}
                className={item.id === activeId ? "is-active" : ""}
                fill
                key={item.id}
                sizes="(max-width: 900px) 92vw, 44vw"
                src={item.image.src}
                style={{ objectPosition: item.image.objectPosition ?? "50% 50%" }}
              />
            ) : null)}
          </figure>
        ) : null}
      </div>
    </section>
  );
}
