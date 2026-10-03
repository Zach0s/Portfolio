"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "accueil", label: "Accueil" },
  { id: "bio", label: "À propos" },
  { id: "experience", label: "Expérience" },
  { id: "education", label: "Formation" },
  { id: "projets", label: "Projets" },
  { id: "skills", label: "Compétences" },
  { id: "contact", label: "Contact" },
];

/**
 * Dot rail on the right edge of wide screens: shows where you are in the
 * page and jumps to any section, so exploring never means getting lost.
 */
export default function SectionNav() {
  const [current, setCurrent] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setCurrent(entry.target.id);
      },
      // Same reading band as the navbar's contact tracking.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections de la page"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
    >
      {sections.map(({ id, label }) => {
        const active = id === current;
        return (
          <a key={id} href={`#${id}`} className="group flex items-center justify-end gap-3" aria-current={active ? "true" : undefined}>
            <span
              className={cn(
                "card rounded-full px-2.5 py-1 text-xs font-medium text-foreground opacity-0 translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100",
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                "block rounded-full transition-all duration-300",
                active
                  ? "h-6 w-2 bg-[linear-gradient(180deg,var(--accent),var(--accent2))]"
                  : "size-2 bg-muted-foreground/40 group-hover:bg-primary",
              )}
            />
          </a>
        );
      })}
    </nav>
  );
}
