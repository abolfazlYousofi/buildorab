"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("Nav");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: t("home"), href: "/" },
    { label: t("services"), href: "/services" },
    { label: t("portfolio"), href: "/portfolio" },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
    { label: t("blog"), href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="container-custom flex items-center justify-between h-20">
        <Link
          href="/"
          className="font-heading font-bold text-2xl text-primary tracking-tight"
        >
          Buildorab
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-accent transition-colors font-medium text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <Button variant="primary" size="sm" href="/contact">
            {t("cta")}
          </Button>
        </div>

        <button
          className="md:hidden text-primary text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? "×" : "☰"}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-accent font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <LanguageSwitcher />
            </div>
            <Button variant="primary" size="md" href="/contact">
              {t("cta")}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}