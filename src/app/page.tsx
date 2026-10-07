import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

export default function Home() {
  return (
    <Container className="section-padding">
      <h1 className="text-5xl font-heading text-primary mb-6">Buildorab</h1>
      <p className="text-lg text-muted mb-8">
        Conversion-focused websites for construction, roofing, and real estate companies.
      </p>

      <div className="flex gap-4 mb-12">
        <Button variant="primary" size="md">
          Get a Free Consultation
        </Button>
        <Button variant="outline" size="md">
          See Our Work
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-xl font-heading font-bold mb-2">Fast Delivery</h3>
          <p className="text-muted">10-day delivery for every project.</p>
        </Card>
        <Card>
          <h3 className="text-xl font-heading font-bold mb-2">SEO Ready</h3>
          <p className="text-muted">Built for search engines from day one.</p>
        </Card>
        <Card>
          <h3 className="text-xl font-heading font-bold mb-2">3-Month Support</h3>
          <p className="text-muted">Free support after launch.</p>
        </Card>
      </div>
    </Container>
  );
}