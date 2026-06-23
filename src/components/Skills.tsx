"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const techCategories = [
  {
    label: "Langages",
    items: ["C", "C++", "C#", "TypeScript", "JavaScript", "Python", "Haskell", "OCaml"],
  },
  {
    label: "Frameworks & Outils",
    items: ["Next.js", "SvelteKit", ".NET", "Strapi", "Shadcn"],
  },
  {
    label: "DevOps & Versionning",
    items: ["Git", "GitHub", "GitLab"],
  },
  {
    label: "IA",
    items: ["Claude", "ChatGPT"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-16 px-6 max-w-5xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ color: "var(--fg)" }} className="text-3xl font-bold mb-8">
          Compétences techniques
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              style={{
                background: "var(--card)",
                border: "1px solid var(--card-border)",
                boxShadow: "var(--shadow)",
              }}
              className="rounded-2xl p-5"
            >
              <h3
                style={{ color: "var(--accent)" }}
                className="text-xs font-semibold uppercase tracking-widest mb-3"
              >
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, j) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.08 + j * 0.04, duration: 0.3 }}
                    style={{
                      color: "var(--fg)",
                      background: "var(--bg)",
                      border: "1px solid var(--card-border)",
                    }}
                    className="text-sm px-3 py-1 rounded-full font-medium"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
