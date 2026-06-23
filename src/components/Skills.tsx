"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techCategories = [
  {
    label: "Langages",
    icon: "{ }",
    items: ["C", "C++", "C#", "TypeScript", "JavaScript", "Python", "Haskell", "OCaml"],
  },
  {
    label: "Frameworks & Outils",
    icon: "⚡",
    items: ["Next.js", "SvelteKit", ".NET", "Strapi", "Shadcn"],
  },
  {
    label: "DevOps & Versionning",
    icon: "⌥",
    items: ["Git", "GitHub", "GitLab"],
  },
  {
    label: "IA & Productivité",
    icon: "✦",
    items: ["Claude", "ChatGPT"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text inline-block mb-3">
            Compétences
          </h2>
          <p className="text-base" style={{ color: "var(--muted)" }}>
            Technologies et outils maîtrisés
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="gradient-text font-bold text-base">{cat.icon}</span>
                <h3
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--accent)" }}
                >
                  {cat.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, j) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.1 + j * 0.04, duration: 0.3 }}
                    className="text-sm px-3 py-1 rounded-full font-medium border transition-all hover:scale-105 cursor-default"
                    style={{
                      color: "var(--fg)",
                      borderColor: "var(--glass-border)",
                      background: "var(--accent-subtle)",
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
