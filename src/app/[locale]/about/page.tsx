import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "About | Buildorab",
  description:
    "Learn about Buildorab – a web design studio for construction, roofing, and real estate companies.",
};

export default function AboutPage() {
  return (
    <section className="section-padding">
      <Container>
        <div className="max-w-3xl mx-auto">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mt-2 mb-8">
            We Build Websites That Sell
          </h1>

          <div className="space-y-6 text-lg text-muted leading-relaxed">
            <p>
              Buildorab is a web design studio specializing in websites for
              construction, roofing, and real estate companies. We help
              businesses turn their online presence into a sales engine.
            </p>
            <p>
              Our approach is simple: we combine modern design, conversion
              psychology, and technical excellence to create websites that not
              only look great but also generate real leads.
            </p>
            <p>
              From landing pages to full corporate websites, every project is
              built with speed, SEO, and user experience in mind.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-4xl font-heading font-bold text-accent">20+</p>
              <p className="text-sm text-muted mt-1">Projects</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-accent">
                100%
              </p>
              <p className="text-sm text-muted mt-1">Satisfaction</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-accent">10</p>
              <p className="text-sm text-muted mt-1">Day Delivery</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-accent">3</p>
              <p className="text-sm text-muted mt-1">Months Support</p>
            </div>
          </div>

          <div className="mt-16">
            <Button variant="primary" size="lg" href="/contact">
              Work With Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}