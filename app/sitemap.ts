import type { MetadataRoute } from "next";
import { getPublicStorySlug, stories } from "@/data/archive";
import { absoluteUrl, publicNavigation } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    ...publicNavigation.map((item) => item.href),
    "/contact",
    "/terms",
    "/privacy",
    "/cookies"
  ];

  const uniqueStaticRoutes = Array.from(new Set(staticRoutes.filter((route) => route !== "/experience")));
  const storyRoutes = stories.map((story) => `/stories/${getPublicStorySlug(story.slug)}`);

  return [...uniqueStaticRoutes, ...storyRoutes].map((route) => ({
    url: absoluteUrl(route)
  }));
}
