import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Blog");

  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="section-padding">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mt-2 mb-4">
            {t("title")}
          </h1>
          <p className="text-muted text-lg">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length === 0 ? (
            <p className="text-center col-span-3 text-muted">{t("noPosts")}</p>
          ) : (
            posts.map((post) => {
              const title = locale === "fa" ? post.titleFa : post.titleEn;
              const excerpt = locale === "fa" ? post.excerptFa : post.excerptEn;
              
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-strong transition-shadow"
                >
                  <div className="aspect-video bg-linear-to-br from-primary to-primary-light flex items-center justify-center overflow-hidden">
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white/30 font-heading font-bold text-2xl px-4 text-center">
                        {title}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-muted text-sm mb-2">
                      {new Date(post.createdAt).toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US")}
                    </p>
                    <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition">
                      {title}
                    </h3>
                    <p className="text-muted text-sm line-clamp-3">{excerpt}</p>
                    <span className="inline-block mt-4 text-accent font-semibold text-sm">
                      {t("readMore")} →
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </Container>
    </section>
  );
}