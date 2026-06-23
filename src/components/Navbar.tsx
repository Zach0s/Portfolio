"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/projects", label: "Projets" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      style={{
        background: "var(--navbar-bg)",
        borderBottom: "1px solid var(--navbar-border)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      className="sticky top-0 z-50"
    >
      <nav className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl gradient-text tracking-tight select-none">
          ZR.
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  color: isActive ? "var(--accent)" : "var(--muted)",
                  background: isActive ? "var(--accent-subtle)" : "transparent",
                }}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)]"
              >
                {label}
              </Link>
            );
          })}
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
