import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="bg-linear-to-b from-white to-background pt-20 pb-24 md:pt-32 md:pb-32">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            {t("badge")}
          </span>

          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary leading-tight mb-6">
            {t("title")}
          </h1>

          <p className="text-lg md:text-xl text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/contact">
              {t("cta")}
            </Button>
            <Button variant="outline" size="lg" href="/portfolio">
              {t("secondaryCta")}
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted">
            <span>✓ {t("features.delivery")}</span>
            <span>✓ {t("features.support")}</span>
            <span>✓ {t("features.seo")}</span>
            <span>✓ {t("features.satisfaction")}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}