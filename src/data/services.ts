export interface Service {
  id: string;
  title: {
    en: string;
    fa: string;
  };
  description: {
    en: string;
    fa: string;
  };
  features: {
    en: string[];
    fa: string[];
  };
}

export const services: Service[] = [
  {
    id: "landing",
    title: {
      en: "Landing Pages",
      fa: "لندینگ پیج",
    },
    description: {
      en: "High-converting single-page websites for campaigns, product launches, and service promotions.",
      fa: "وب‌سایت‌های تک‌صفحه‌ای با نرخ تبدیل بالا برای کمپین‌ها، معرفی محصول و پروموشن خدمات.",
    },
    features: {
      en: ["Mobile-optimized", "Built-in analytics", "Fast loading"],
      fa: ["بهینه برای موبایل", "آنالیتیکس داخلی", "لود سریع"],
    },
  },
  {
    id: "business",
    title: {
      en: "Business Websites",
      fa: "وب‌سایت شرکتی",
    },
    description: {
      en: "5-10 page websites built for credibility, lead generation, and customer conversion.",
      fa: "وب‌سایت‌های ۵ تا ۱۰ صفحه‌ای برای اعتبار، جذب مشتری و افزایش فروش.",
    },
    features: {
      en: ["SEO optimized", "Contact forms", "Admin dashboard"],
      fa: ["بهینه برای سئو", "فرم تماس", "پنل مدیریت"],
    },
  },
  {
    id: "portfolio",
    title: {
      en: "Portfolio Websites",
      fa: "وب‌سایت نمونه‌کار",
    },
    description: {
      en: "Showcase platforms for freelancers, agencies, and professionals across every industry.",
      fa: "پلتفرم‌های نمایش نمونه‌کار برای فریلنسرها، آژانس‌ها و متخصصان در همه صنایع.",
    },
    features: {
      en: ["Project gallery", "Testimonials", "Booking system"],
      fa: ["گالری پروژه", "نظرات مشتریان", "سیستم رزرو"],
    },
  },
  {
    id: "redesign",
    title: {
      en: "Website Redesign",
      fa: "بازطراحی وب‌سایت",
    },
    description: {
      en: "Modernize outdated websites and improve conversion rates, speed, and user experience.",
      fa: "مدرن‌سازی وب‌سایت‌های قدیمی و بهبود نرخ تبدیل، سرعت و تجربه کاربری.",
    },
    features: {
      en: ["Speed optimization", "Mobile-first design", "SEO audit"],
      fa: ["بهینه‌سازی سرعت", "طراحی موبایل-اول", "بررسی سئو"],
    },
  },
];