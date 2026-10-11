export interface Project {
  id: string;
  title: {
    en: string;
    fa: string;
  };
  industry: {
    en: string;
    fa: string;
  };
  description: {
    en: string;
    fa: string;
  };
  tags: string[];
  demoUrl: string;
}

export const projects: Project[] = [
  {
    id: "bold-roofing",
    title: {
      en: "Bold Roofing",
      fa: "بولدر",
    },
    industry: {
      en: "Roofing · Dallas, TX",
      fa: "سقف‌سازی · دالاس",
    },
    description: {
      en: "Modern redesign with project gallery and trust signals.",
      fa: "بازطراحی مدرن با گالری پروژه و اعتمادسازی.",
    },
    tags: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://share.htmlput.com/p/9jingu5qx9",
  },
  {
    id: "blue-frog",
    title: {
      en: "Blue Frog Roofing",
      fa: "بلو فراگ",
    },
    industry: {
      en: "Roofing · Colorado",
      fa: "سقف‌سازی · کلرادو",
    },
    description: {
      en: "Complete website redesign with 30+ years of credibility.",
      fa: "بازطراحی کامل وب‌سایت با ۳۰+ سال اعتبار.",
    },
    tags: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://share.htmlput.com/p/r376je0h8d",
  },
  {
    id: "kingdom-builders",
    title: {
      en: "Kingdom Builders TN",
      fa: "کینگدام بیلدرز",
    },
    industry: {
      en: "Custom Home Builder · Nashville",
      fa: "سازنده خانه سفارشی · نشویل",
    },
    description: {
      en: "Faith-based builder website with project showcase.",
      fa: "وب‌سایت سازنده مبتنی بر ارزش‌ها با نمایش پروژه.",
    },
    tags: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://share.htmlput.com/p/4vq97zf8z5",
  },
];