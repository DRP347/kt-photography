"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const query = "(min-width: 768px)";
function subscribe(update: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", update);
  return () => media.removeEventListener("change", update);
}

/** Hidden mobile media never mounts. Matching desktop geometry prevents a hydration jump. */
export function HomeDesktopMedia({ children }: { children: ReactNode }) {
  const visible = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  return <div className="home-desktop-media">
    {visible ? children : <div aria-hidden="true" className="home-desktop-media__reserve">
      <div className="home-film"><div className="home-film__stage" /><div className="section-bar site-rail"><span className="type-kicker">Sunil &amp; Vaishnavi</span><span className="text-link">All films</span></div></div>
    </div>}
    <noscript><style>{".home-desktop-media__reserve{display:none}"}</style><p className="site-rail"><a className="text-link" href="/films">Explore our wedding films</a></p></noscript>
  </div>;
}
