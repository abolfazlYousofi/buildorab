export interface Project {
  id: string;
  title: string;
  industry: string;
  description: string;
  image: string;
  url?: string;
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  text: string;
  rating: number;
}