import { services } from "@/data/services";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

export function Services() {
  return (
    <section className="section-padding bg-background">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mt-2 mb-4">
            What We Build
          </h2>
          <p className="text-muted text-lg">
            Custom solutions for specific business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="flex flex-col">
              <h3 className="text-xl font-heading font-bold text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-muted mb-4 flex-1">{service.description}</p>
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
      </Container>
    </section>
  );
}