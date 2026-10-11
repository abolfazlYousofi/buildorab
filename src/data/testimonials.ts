export interface Testimonial {
  id: string;
  name: string;
  company: {
    en: string;
    fa: string;
  };
  text: {
    en: string;
    fa: string;
  };
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Michael R.",
    company: {
      en: "Business Owner · USA",
      fa: "صاحب کسب‌وکار · آمریکا",
    },
    text: {
      en: "The redesign completely transformed our online presence. Inquiries have doubled.",
      fa: "بازطراحی کاملاً حضور آنلاین ما را متحول کرد. تعداد درخواست‌ها دو برابر شد.",
    },
    rating: 5,
  },
  {
    id: "2",
    name: "Sarah L.",
    company: {
      en: "Startup Founder · Canada",
      fa: "بنیان‌گذار استارتاپ · کانادا",
    },
    text: {
      en: "Professional, fast, and easy to work with. The project gallery was exactly what we needed.",
      fa: "حرفه‌ای، سریع و آسان. گالری پروژه دقیقاً همان چیزی بود که نیاز داشتیم.",
    },
    rating: 5,
  },
  {
    id: "3",
    name: "David K.",
    company: {
      en: "Service Provider · Australia",
      fa: "ارائه‌دهنده خدمات · استرالیا",
    },
    text: {
      en: "Our new website finally reflects the quality of our work. Highly recommended.",
      fa: "وب‌سایت جدید ما بالاخره کیفیت کارمان را نشان می‌دهد. حتماً پیشنهاد می‌کنم.",
    },
    rating: 5,
  },
];