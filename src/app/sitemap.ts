import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://buildorab.com";
  const now = new Date();

  // گرفتن پروژه‌ها و مقالات منتشر شده از دیتابیس
  const projects = await prisma.project.findMany({ where: { published: true } });
  const posts = await prisma.post.findMany({ where: { published: true } });

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: project.updatedAt,
    priority: 0.8,
  }));

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    priority: 0.7,
  }));

  const staticUrls = [
    { url: baseUrl, lastModified: now, priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, priority: 0.8 },
  ];

  return [...staticUrls, ...projectUrls, ...postUrls];
}