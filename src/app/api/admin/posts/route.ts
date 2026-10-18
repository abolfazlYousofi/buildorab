import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    slug,
    titleEn,
    titleFa,
    excerptEn,
    excerptFa,
    contentEn,
    contentFa,
    coverImage,
    published,
  } = body;

  if (!slug || !titleEn || !titleFa || !contentEn || !contentFa) {
    return NextResponse.json(
      { error: "Slug, title, and content are required" },
      { status: 400 }
    );
  }

  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: "A post with this slug already exists" },
      { status: 409 }
    );
  }

  const post = await prisma.post.create({
    data: {
      slug,
      titleEn,
      titleFa,
      excerptEn: excerptEn || null,
      excerptFa: excerptFa || null,
      contentEn,
      contentFa,
      coverImage: coverImage || null,
      published: published ?? false,
      authorId: (session.user as any).id,
    },
  });

  return NextResponse.json(post);
}