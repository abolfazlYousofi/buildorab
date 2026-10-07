import Link from "next/link";

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white py-16 mt-20">
      <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <h3 className="font-heading text-2xl font-bold mb-4">Buildorab</h3>
          <p className="text-gray-300 leading-relaxed">
            Conversion-focused websites for construction, roofing, and real
            estate companies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-300 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-gray-300">
            <li>abolfazlyousofi83@gmail.com</li>
            <li>+98 913 087 8900</li>
            <li>Isfahan, Iran</li>
          </ul>
        </div>
      </div>

      <div className="container-custom mt-12 pt-6 border-t border-white/10 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Buildorab. All rights reserved.
      </div>
    </footer>
  );
}