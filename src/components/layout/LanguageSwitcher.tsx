"use client";

import { useState } from "react";

export function LanguageSwitcher() {
  const [lang, setLang] = useState<"en" | "fa">("en");

  return (
    <div className="flex items-center gap-1 bg-white/60 border border-border rounded-lg p-1">
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1 text-sm font-semibold rounded-md transition ${
          lang === "en"
            ? "bg-primary text-white"
            : "text-muted hover:text-primary"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("fa")}
        className={`px-3 py-1 text-sm font-semibold rounded-md transition ${
          lang === "fa"
            ? "bg-primary text-white"
            : "text-muted hover:text-primary"
        }`}
      >
        FA
      </button>
    </div>
  );
}