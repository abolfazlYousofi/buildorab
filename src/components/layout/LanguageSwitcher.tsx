"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "en" | "fa") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 bg-white/60 border border-border rounded-lg p-1">
      <button
        onClick={() => switchLocale("en")}
        className={`px-3 py-1 text-sm font-semibold rounded-md transition ${
          locale === "en"
            ? "bg-primary text-white"
            : "text-muted hover:text-primary"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale("fa")}
        className={`px-3 py-1 text-sm font-semibold rounded-md transition ${
          locale === "fa"
            ? "bg-primary text-white"
            : "text-muted hover:text-primary"
        }`}
      >
        FA
      </button>
    </div>
  );
}