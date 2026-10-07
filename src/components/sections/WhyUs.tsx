import { Container } from "@/components/ui/Container";

const reasons = [
  {
    title: "Fast Delivery",
    description: "Every project delivered within 10 business days.",
  },
  {
    title: "SEO Built-In",
    description: "Search-engine-optimized from the ground up.",
  },
  {
    title: "Conversion-Focused",
    description: "Designed to turn visitors into paying customers.",
  },
  {
    title: "3-Month Support",
    description: "Free support and maintenance after launch.",
  },
];

export function WhyUs() {
  return (
    <section className="section-padding bg-primary text-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Why Buildorab
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-2 mb-4">
            What Sets Us Apart
          </h2>
          <p className="text-gray-300 text-lg">
            We don&apos;t just build websites. We build sales engines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="border border-white/10 rounded-xl p-6 hover:border-accent transition"
            >
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center text-primary font-bold text-xl mb-4">
                {i + 1}
              </div>
              <h3 className="text-lg font-heading font-bold mb-2">
                {reason.title}
              </h3>
              <p className="text-gray-300 text-sm">{reason.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}