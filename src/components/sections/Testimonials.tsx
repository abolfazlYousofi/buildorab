"use client";

import { useTranslations, useLocale } from "next-intl";
import { testimonials } from "@/data/testimonials";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

export function Testimonials() {
  const t = useTranslations("Testimonials");
  const locale = useLocale() as "en" | "fa";

  return (
    <section className="section-padding bg-background">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("badge")}
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mt-2 mb-4">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <Card key={item.id}>
              <div className="flex gap-1 text-accent mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-foreground mb-6 italic">
                &ldquo;{item.text[locale]}&rdquo;
              </p>
              <div>
                <p className="font-heading font-bold text-primary">
                  {item.name}
                </p>
                <p className="text-sm text-muted">{item.company[locale]}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}