"use client";

import { motion, useInView } from "framer-motion";
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
    description: "Gestion de projets clients et interventions techniques variées.",
    sub: {
      title: "Intervenant Formateur & Encadrement de Formation — ETNA",
      period: "Mar 2024 – Avr 2024, Oct 2024",
      description:
        "Encadrement et formation de deux promotions d'adultes en reconversion professionnelle : fondamentaux de la programmation et bonnes pratiques.",
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
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold gradient-text inline-block mb-3">Expérience</h2>
          <p className="text-base" style={{ color: "var(--muted)" }}>
            Parcours professionnel
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.45 }}
              className="card rounded-3xl p-8 sm:p-10 text-center"
            >
              <span
                className="text-xs px-3 py-1 rounded-full font-medium inline-block mb-4"
                style={{ color: "var(--accent)", background: "var(--accent-subtle)" }}
              >
                {exp.period}
              </span>
              <h3 className="font-bold text-xl leading-tight mb-1" style={{ color: "var(--fg)" }}>
                {exp.title}
              </h3>
              <p className="text-sm font-semibold gradient-text mb-4">{exp.company}</p>

              <p className="text-base leading-relaxed max-w-md mx-auto" style={{ color: "var(--muted)" }}>
                {exp.description}
              </p>

              {exp.sub && (
                <div
                  className="mt-6 pt-5 max-w-md mx-auto"
                  style={{ borderTop: "1px solid var(--surface-border)" }}
                >
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent)" }}>
                    {exp.sub.title}
                  </p>
                  <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>
                    {exp.sub.period}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {exp.sub.description}
                  </p>
                </div>
              )}

              {exp.tech.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full font-semibold"
                      style={{ color: "var(--accent)", background: "var(--accent-subtle)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
