"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const CONTACT_HREF = "/#contact";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/projects", label: "Projets" },
  { href: CONTACT_HREF, label: "Contact" },
];

/**
 * Tracks whether the visitor is currently looking at the #contact section.
 *
 * `enabled` should be false on pages that don't render the section. Returns
 * `markActive` so a click on the Contact link lights it up straight away,
 * instead of waiting for the smooth scroll to reach the section.
 */
function useContactSectionActive(enabled: boolean) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const section = document.getElementById("contact");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      // Shrink the viewport to a band across its middle, so the link turns on
      // when the section is what's actually being read — not the moment its
      // top edge peeks in.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      // Drop the stale reading so a later page visit starts from scratch
      // rather than flashing the link on before the observer reports.
      setActive(false);
    };
  }, [enabled]);

  return { active, markActive: () => setActive(true) };
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { active: contactActive, markActive } = useContactSectionActive(isHome);

  // Exactly one link reads as current: while the contact section is on screen,
  // it takes over from "Accueil".
  const activeHref = isHome && contactActive ? CONTACT_HREF : pathname;

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
            const isActive = href === activeHref;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                onClick={href === CONTACT_HREF ? markActive : undefined}
                style={{
                  color: isActive ? "var(--accent)" : "var(--muted)",
                  background: isActive ? "var(--accent-subtle)" : "transparent",
                }}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] active:scale-95"
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
