import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Contact | Buildorab",
  description: "Get in touch with Buildorab for a free consultation.",
};

export default function ContactPage() {
  return (
    <section className="section-padding">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Contact
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mt-2 mb-4">
              Let&apos;s Talk
            </h1>
            <p className="text-muted text-lg">
              Tell us about your project. We&apos;ll get back to you within 24
              hours.
            </p>
          </div>

          <form className="space-y-6 bg-white p-8 rounded-xl shadow-soft">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="website"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Website (optional)
              </label>
              <input
                id="website"
                type="url"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Tell us about your project..."
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              className="w-full"
            >
              Send Message
            </Button>
          </form>

          <div className="mt-12 text-center text-muted">
            <p>Or reach out directly:</p>
            <p className="mt-2">📧 abolfazlyousifi83@gmail.com</p>
          </div>
        </div>
      </Container>
    </section>
  );
}