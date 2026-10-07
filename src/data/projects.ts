export interface Project {
  id: string;
  title: string;
  industry: string;
  description: string;
  tags: string[];
  demoUrl: string;
}

export const projects: Project[] = [
  {
    id: "bold-roofing",
    title: "Bold Roofing",
    industry: "Roofing · Dallas, TX",
    description: "Modern redesign with project gallery and trust signals.",
    tags: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://share.htmlput.com/p/9jingu5qx9",
  },
  {
    id: "blue-frog",
    title: "Blue Frog Roofing",
    industry: "Roofing · Colorado",
    description: "Complete website redesign with 30+ years of credibility.",
    tags: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://share.htmlput.com/p/r376je0h8d",
  },
  {
    id: "kingdom-builders",
    title: "Kingdom Builders TN",
    industry: "Custom Home Builder · Nashville",
    description: "Faith-based builder website with project showcase.",
    tags: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://share.htmlput.com/p/4vq97zf8z5",
  },
];