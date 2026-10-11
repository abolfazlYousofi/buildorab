"use client";

import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

export default function ServicesPage() {
  const t = useTranslations("Services");
  const locale = useLocale() as "en" | "fa";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {services.map((service) => (
            <Card key={service.id}>
              <h2 className="text-2xl font-heading font-bold text-primary mb-3">
                {service.title[locale]}
              </h2>
              <p className="text-muted mb-4">
                {service.description[locale]}
              </p>
              <ul className="space-y-2 text-sm text-muted">
                {service.features[locale].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="primary" size="lg" href="/contact">
            {t("cta")}
          </Button>
        </div>
      </Container>
    </section>
  );
}