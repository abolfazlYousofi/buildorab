import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

// لیست همه پروژه‌ها
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// ساخت پروژه جدید
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const {
      slug,
      titleEn,
      titleFa,
      industryEn,
      industryFa,
      descriptionEn,
      descriptionFa,
      contentEn,
      contentFa,
      image,
      demoUrl,
      tags,
      clientName,
      result,
      published,
      featured,
      order,
    } = body;

    if (!slug || !titleEn || !titleFa) {
      return NextResponse.json(
        { error: "Slug, title EN, and title FA are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.project.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A project with this slug already exists" },
        { status: 409 }
      );
    }

    const project = await prisma.project.create({
      data: {
        slug,
        titleEn,
        titleFa,
        industryEn,
        industryFa,
        descriptionEn,
        descriptionFa,
        contentEn: contentEn || null,
        contentFa: contentFa || null,
        image: image || null,
        demoUrl: demoUrl || null,
        tags: tags || null,
        clientName: clientName || null,
        result: result || null,
        published: published ?? false,
        featured: featured ?? false,
        order: order ?? 0,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}