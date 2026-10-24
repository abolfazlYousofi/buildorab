import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getTranslations } from "next-intl/server";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("Portfolio");

  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project || !project.published) {
    notFound();
  }

  const title = locale === "fa" ? project.titleFa : project.titleEn;
  const industry = locale === "fa" ? project.industryFa : project.industryEn;
  const description = locale === "fa" ? project.descriptionFa : project.descriptionEn;
  const content = locale === "fa" ? project.contentFa : project.contentEn;
  
  // اگر تگ‌ها به صورت رشته ذخیره شده باشند، اینجا تبدیل به آرایه می‌کنیم
  const tags = project.tags ? project.tags.split(",").map(t => t.trim()) : [];

  return (
    <section className="section-padding">
      <Container>
        <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">
          {industry}
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-8">
          {title}
        </h1>

        <div className="aspect-video bg-linear-to-br from-primary to-primary-light rounded-xl mb-12 flex items-center justify-center overflow-hidden">
          {project.image ? (
             <img src={project.image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white/30 font-heading font-bold text-4xl">
              {title}
            </span>
          )}
        </div>

        <div className="prose max-w-3xl">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            {t("projectOverview")}
          </h2>
          <p className="text-muted text-lg mb-6">{description}</p>

          {/* نمایش محتوای طولانی (اگر توی پنل ادمین نوشتی) */}
          {content && (
            <div 
              className="text-muted leading-relaxed mb-8"
              dangerouslySetInnerHTML={{ __html: content }} 
            />
          )}

          <h2 className="text-2xl font-heading font-bold text-primary mb-4 mt-8">
            {t("technologiesUsed")}
          </h2>
          <div className="flex gap-2 flex-wrap mb-8">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.demoUrl && (
            <Button variant="primary" size="lg" href={project.demoUrl}>
              {t("viewLive")}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}