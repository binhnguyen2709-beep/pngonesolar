import type { MetadataRoute } from "next";

const routes = ["", "/gioi-thieu", "/san-pham", "/du-an", "/tinh-chi-phi", "/kien-thuc", "/lien-he"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pngonesolar.vn";
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
