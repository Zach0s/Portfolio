"use client";

import { motion, useInView } from "framer-motion";
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
    label: "IA & Productivité",
    items: ["Claude", "ChatGPT"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-20 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold gradient-text inline-block mb-3">Compétences</h2>
          <p className="text-base" style={{ color: "var(--muted)" }}>
            Technologies et outils maîtrisés
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="card rounded-3xl p-8 text-center"
            >
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "var(--accent)" }}
              >
                {cat.label}
              </h3>
              <div className="flex flex-wrap justify-center gap-2.5">
                {cat.items.map((item, j) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.1 + j * 0.04, duration: 0.3 }}
                    className="text-sm px-3.5 py-1.5 rounded-full font-medium transition-transform hover:scale-105 cursor-default"
                    style={{ color: "var(--fg)", background: "var(--accent-subtle)" }}
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
