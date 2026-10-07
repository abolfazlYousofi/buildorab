import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary to-primary-light text-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Ready to Build Something Great?
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Let&apos;s create a website that converts visitors into customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/contact">
              Get a Free Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/portfolio"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              See Our Work
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}