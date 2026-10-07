export interface Testimonial {
  id: string;
  name: string;
  company: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Michael R.",
    company: "Roofing Contractor · TX",
    text: "The redesign completely transformed our online presence. Inquiries have doubled.",
    rating: 5,
  },
  {
    id: "2",
    name: "Sarah L.",
    company: "Custom Home Builder · TN",
    text: "Professional, fast, and easy to work with. The project gallery was exactly what we needed.",
    rating: 5,
  },
  {
    id: "3",
    name: "David K.",
    company: "Construction Company · CO",
    text: "Our new website finally reflects the quality of our work. Highly recommended.",
    rating: 5,
  },
];