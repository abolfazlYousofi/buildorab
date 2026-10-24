import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  
  if (!post) return { title: "Post Not Found" };
  
  const title = locale === "fa" ? post.titleFa : post.titleEn;
  return { title: `${title} | Buildorab` };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("Blog");

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  const title = locale === "fa" ? post.titleFa : post.titleEn;
  const content = locale === "fa" ? post.contentFa : post.contentEn;

  return (
    <article className="section-padding">
      <Container>
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-accent hover:underline mb-8 inline-block font-semibold">
            {t("backToBlog")}
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            {title}
          </h1>
          
          <p className="text-muted mb-8">
            {new Date(post.createdAt).toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US")}
          </p>

          {post.coverImage && (
            <div className="aspect-video rounded-xl overflow-hidden mb-12 bg-background">
              <img src={post.coverImage} alt={title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* محتوای HTML که با Tiptap نوشته شده */}
          <div 
            className="prose prose-lg max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </div>
      </Container>
    </article>
  );
}