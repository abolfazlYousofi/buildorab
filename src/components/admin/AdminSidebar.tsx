"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/leads", label: "Leads", icon: "📬" },
  { href: "/admin/projects", label: "Projects", icon: "🏗️" },
  { href: "/admin/posts", label: "Posts", icon: "📝" },
  { href: "/admin/users", label: "Users", icon: "👥" },   // ← جدید
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-primary text-white flex flex-col min-h-screen">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-heading font-bold">Buildorab</h2>
        <p className="text-sm text-gray-400">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-accent text-primary font-semibold"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 transition"
        >
          🚪 Sign Out
        </button>
      </div>
    </aside>
  );
}