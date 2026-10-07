import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://buildorab.com";
  const now = new Date();

  return [
    { url: baseUrl, lastModified: now, priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, priority: 0.8 },
  ];
}