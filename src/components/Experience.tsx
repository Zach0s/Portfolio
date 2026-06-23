"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "Développeur Full Stack",
    company: "Université Paris Dauphine-PSL",
    period: "Avr 2025 – Juil 2025",
    description:
      "Mise en place d'un projet d'Encyclopédie en ligne. Site web mis en production et hébergé.",
    tech: ["Svelte", "Strapi", "Shadcn-svelte", "TypeScript"],
  },
  {
    title: "Chef de projet & Intervenant",
    company: "Junior Conseil Taker",
    period: "Fév 2023 – Présent",
    description:
      "Gestion de projets et interventions variées.",
    sub: {
      title: "Intervenant Formateur & Encadrement de Formation",
      company: "ETNA",
      period: "Mar 2024 – Avr 2024, Oct 2024",
      description:
        "Encadrement et formation de deux promotions d'adultes en reconversion professionnelle — fondamentaux de la programmation et bonnes pratiques.",
    },
    tech: [],
  },
  {
    title: "Développeur d'application Windows",
    company: "Arianespace",
    period: "Juil 2023 – Déc 2023",
    description:
      "Réalisation de projets internes destinés aux collaborateurs dans un environnement de production exigeant.",
    tech: ["C#", "TypeScript", ".NET"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-16 px-6 max-w-5xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ color: "var(--fg)" }} className="text-3xl font-bold mb-8">
          Expérience
        </h2>

        <div className="relative">
          <div
            style={{ background: "var(--card-border)" }}
            className="absolute left-4 top-0 bottom-0 w-px"
          />

          <div className="flex flex-col gap-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="pl-12 relative"
              >
                <div
                  style={{ background: "var(--accent)", border: "3px solid var(--bg)" }}
                  className="absolute left-2.5 top-5 w-3 h-3 rounded-full"
                />
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--card-border)",
                    boxShadow: "var(--shadow)",
                  }}
                  className="rounded-2xl p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                    <div>
                      <h3 style={{ color: "var(--fg)" }} className="font-semibold text-base">
                        {exp.title}
                      </h3>
                      <p style={{ color: "var(--accent)" }} className="text-sm font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <span
                      style={{ color: "var(--muted)", background: "var(--bg)", border: "1px solid var(--card-border)" }}
                      className="text-xs px-2.5 py-1 rounded-full whitespace-nowrap self-start"
                    >
                      {exp.period}
                    </span>
                  </div>

                  <p style={{ color: "var(--muted)" }} className="text-sm leading-relaxed">
                    {exp.description}
                  </p>

                  {exp.sub && (
                    <div
                      style={{ borderLeft: "2px solid var(--accent-subtle)", background: "var(--bg)" }}
                      className="mt-3 pl-3 py-2 rounded-r-lg"
                    >
                      <p style={{ color: "var(--accent)" }} className="text-xs font-semibold">
                        {exp.sub.title} — {exp.sub.company}
                      </p>
                      <p style={{ color: "var(--muted)" }} className="text-xs mt-0.5">
                        {exp.sub.period}
                      </p>
                      <p style={{ color: "var(--muted)" }} className="text-xs mt-1 leading-relaxed">
                        {exp.sub.description}
                      </p>
                    </div>
                  )}

                  {exp.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          style={{ color: "var(--accent)", background: "var(--accent-subtle)" }}
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
