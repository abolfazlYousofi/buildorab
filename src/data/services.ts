export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "landing",
    title: "Landing Pages",
    description: "High-converting single-page websites for campaigns and product launches.",
    features: ["Mobile-optimized", "Built-in analytics", "Fast loading"],
  },
  {
    id: "business",
    title: "Business Websites",
    description: "5-10 page websites built for credibility and lead generation.",
    features: ["SEO optimized", "Contact forms", "Admin dashboard"],
  },
  {
    id: "portfolio",
    title: "Portfolio Websites",
    description: "Showcase platforms for contractors, architects, and professionals.",
    features: ["Project gallery", "Testimonials", "Booking system"],
  },
  {
    id: "redesign",
    title: "Website Redesign",
    description: "Modernize outdated websites and improve conversion rates.",
    features: ["Speed optimization", "Mobile-first design", "SEO audit"],
  },
];