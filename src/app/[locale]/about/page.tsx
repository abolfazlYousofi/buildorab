"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <section className="section-padding">
      <Container>
        <div className="max-w-3xl mx-auto">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mt-2 mb-8">
            {t("title")}
          </h1>

          <div className="space-y-6 text-lg text-muted leading-relaxed">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-4xl font-heading font-bold text-accent">20+</p>
              <p className="text-sm text-muted mt-1">{t("stats.projects")}</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-accent">
                100%
              </p>
              <p className="text-sm text-muted mt-1">
                {t("stats.satisfaction")}
              </p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-accent">10</p>
              <p className="text-sm text-muted mt-1">{t("stats.delivery")}</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-accent">3</p>
              <p className="text-sm text-muted mt-1">{t("stats.support")}</p>
            </div>
          </div>

          <div className="mt-16">
            <Button variant="primary" size="lg" href="/contact">
              {t("cta")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}