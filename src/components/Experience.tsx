"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "Développeur Full Stack",
    company: "Université Paris Dauphine-PSL",
    period: "Avr 2025 – Juil 2025",
    description: "Mise en place d'un projet d'Encyclopédie en ligne. Site web mis en production et hébergé.",
    tech: ["Svelte", "Strapi", "Shadcn-svelte", "TypeScript"],
  },
  {
    title: "Chef de projet & Intervenant",
    company: "Junior Conseil Taker",
    period: "Fév 2023 – Présent",
    description: "Gestion de projets clients et interventions techniques variées.",
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
    <section id="experience" className="py-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text inline-block mb-3">Expérience</h2>
          <p className="text-base" style={{ color: "var(--muted)" }}>
            Parcours professionnel
          </p>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          {/* Timeline line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px"
            style={{ background: "var(--glass-border)" }}
          />

          <div className="flex flex-col gap-5">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.45 }}
                className="pl-14 relative"
              >
                {/* Dot */}
                <div
                  className="absolute left-3.5 top-5 w-3 h-3 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                    boxShadow: "0 0 0 3px var(--glass-bg)",
                  }}
                />

                <div className="glass rounded-2xl p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-base" style={{ color: "var(--fg)" }}>
                        {exp.title}
                      </h3>
                      <p className="text-sm font-medium gradient-text">{exp.company}</p>
                    </div>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full whitespace-nowrap self-start font-medium"
                      style={{ color: "var(--muted)", background: "var(--accent-subtle)" }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {exp.description}
                  </p>

                  {exp.sub && (
                    <div
                      className="mt-3 pl-3 py-2.5 rounded-xl"
                      style={{
                        borderLeft: "2px solid var(--accent)",
                        background: "var(--accent-subtle)",
                      }}
                    >
                      <p className="text-xs font-semibold" style={{ color: "var(--accent)" }}>
                        {exp.sub.title} — {exp.sub.company}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                        {exp.sub.period}
                      </p>
                      <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "var(--muted)" }}>
                        {exp.sub.description}
                      </p>
                    </div>
                  )}

                  {exp.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{ color: "var(--accent)", background: "var(--accent-subtle)" }}
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
      </div>
    </section>
  );
}
