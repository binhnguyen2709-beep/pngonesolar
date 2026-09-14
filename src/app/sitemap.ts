import type { MetadataRoute } from "next";
import { locales, routing } from "@/i18n/routing";

const routes = ["", "/gioi-thieu", "/san-pham", "/du-an", "/tinh-chi-phi", "/kien-thuc", "/lien-he"];
const baseUrl = "https://pngonesolar.vn";

function localizedPath(route: string, locale: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${baseUrl}${prefix}${route}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: localizedPath(route, routing.defaultLocale),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
    alternates: {
      languages: Object.fromEntries(locales.map((locale) => [locale, localizedPath(route, locale)])),
    },
  }));
}
