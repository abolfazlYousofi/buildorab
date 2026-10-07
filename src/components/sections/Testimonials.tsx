import { testimonials } from "@/data/testimonials";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

export function Testimonials() {
  return (
    <section className="section-padding bg-background">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mt-2 mb-4">
            What Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <Card key={t.id}>
              <div className="flex gap-1 text-accent mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-foreground mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="font-heading font-bold text-primary">{t.name}</p>
                <p className="text-sm text-muted">{t.company}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}