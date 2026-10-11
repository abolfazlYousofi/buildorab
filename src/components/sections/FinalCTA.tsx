"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  const t = useTranslations("FinalCTA");

  return (
    <section className="section-padding bg-linear-to-br from-primary to-primary-light text-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            {t("title")}
          </h2>
          <p className="text-gray-300 text-lg mb-10">{t("subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/contact">
              {t("cta")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/portfolio"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              {t("secondaryCta")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}