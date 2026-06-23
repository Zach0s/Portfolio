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
        background: "var(--card)",
        borderBottom: "1px solid var(--card-border)",
        boxShadow: "var(--shadow)",
      }}
      className="sticky top-0 z-50 transition-colors duration-300"
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          style={{ color: "var(--accent)" }}
          className="font-semibold text-lg tracking-tight hover:opacity-80 transition-opacity"
        >
          ZR<span style={{ color: "var(--fg)" }}>.</span>
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
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-all hover:opacity-80"
              >
                {label}
              </Link>
            );
          })}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
