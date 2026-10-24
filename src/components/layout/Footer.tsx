import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");

  return (
    <footer className="bg-primary text-white py-16 mt-20">
      <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-heading text-2xl font-bold mb-4">Buildorab</h3>
          <p className="text-gray-300 leading-relaxed">{t("tagline")}</p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">
            {t("quickLinks")}
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                href="/services"
                className="text-gray-300 hover:text-accent transition-colors"
              >
                {tNav("services")}
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                className="text-gray-300 hover:text-accent transition-colors"
              >
                {tNav("portfolio")}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-300 hover:text-accent transition-colors"
              >
                {tNav("about")}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-accent transition-colors"
              >
                {tNav("contact")}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-300 hover:text-accent transition-colors">
                {tNav("blog")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">
            {t("contact")}
          </h4>
          <ul className="space-y-3 text-gray-300">
            <li>abolfazlyousufi83@gmail.com</li>
            <li>+98 913 087 8900</li>
            <li>Isfahan, Iran</li>
          </ul>
        </div>
      </div>

      <div className="container-custom mt-12 pt-6 border-t border-white/10 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Buildorab. {t("rights")}
      </div>
    </footer>
  );
}