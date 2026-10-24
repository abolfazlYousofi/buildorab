import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getTranslations } from "next-intl/server";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Portfolio");

  // خواندن پروژه‌های منتشر شده از دیتابیس
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <section className="section-padding">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mt-2 mb-4">
            {t("pageTitle")}
          </h1>
          <p className="text-muted text-lg">{t("pageSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.length === 0 ? (
            <p className="text-center col-span-3 text-muted">
              No projects published yet.
            </p>
          ) : (
            projects.map((project) => {
              const title = locale === "fa" ? project.titleFa : project.titleEn;
              const industry = locale === "fa" ? project.industryFa : project.industryEn;
              const description = locale === "fa" ? project.descriptionFa : project.descriptionEn;

              return (
                <a
                  key={project.id}
                  href={project.demoUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-strong transition-shadow"
                >
                  <div className="aspect-video bg-linear-to-br from-primary to-primary-light flex items-center justify-center">
                    {project.image ? (
                       <img src={project.image} alt={title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white/30 font-heading font-bold text-2xl">
                        {title}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-accent text-sm font-semibold mb-1">
                      {industry}
                    </p>
                    <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition">
                      {title}
                    </h3>
                    <p className="text-muted text-sm">{description}</p>
                  </div>
                </a>
              );
            })
          )}
        </div>

        <div className="text-center">
          <Button variant="primary" size="lg" href="/contact">
            {t("startSimilar")}
          </Button>
        </div>
      </Container>
    </section>
  );
}