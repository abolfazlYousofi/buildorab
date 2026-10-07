import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

export const metadata = {
  title: "Services | Buildorab",
  description:
    "Custom web design and development services for construction, roofing, and real estate companies.",
};

export default function ServicesPage() {
  return (
    <section className="section-padding">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mt-2 mb-4">
            Everything You Need to Grow Online
          </h1>
          <p className="text-muted text-lg">
            Custom solutions built for construction, roofing, and real estate
            companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {services.map((service) => (
            <Card key={service.id}>
              <h2 className="text-2xl font-heading font-bold text-primary mb-3">
                {service.title}
              </h2>
              <p className="text-muted mb-4">{service.description}</p>
              <ul className="space-y-2 text-sm text-muted">
                {service.features.map((feature, i) => (
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
            Get a Free Consultation
          </Button>
        </div>
      </Container>
    </section>
  );
}