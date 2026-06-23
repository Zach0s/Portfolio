"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const languages = [
  { name: "Français", level: "Natif" },
  { name: "Anglais", level: "C2" },
  { name: "Espagnol", level: "Notions" },
  { name: "Italien", level: "Notions" },
];

const softSkills = [
  "Management de Projet",
  "Adaptabilité",
  "Travail d'équipe",
  "Partage de connaissances",
];

export default function Bio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="bio" className="py-16 px-6 max-w-5xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ color: "var(--fg)" }} className="text-3xl font-bold mb-8">
          À propos
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--card-border)",
              boxShadow: "var(--shadow)",
            }}
            className="rounded-2xl p-6"
          >
            <h3 style={{ color: "var(--accent)" }} className="text-sm font-semibold uppercase tracking-widest mb-3">
              Profil
            </h3>
            <p style={{ color: "var(--fg)" }} className="text-base leading-relaxed">
              Développeur en quatrième année à Epitech Technology, Paris. Je souhaite poursuivre
              mon immersion dans le monde professionnel en consolidant les compétences acquises,
              tout en développant de nouveaux savoir-faire.
            </p>
            <p style={{ color: "var(--muted)" }} className="text-sm leading-relaxed mt-3">
              Rigoureux, organisé et autonome, j'ai aussi un bon esprit d'équipe et une grande
              capacité d'adaptation dont je me sers pour effectuer les missions qui me sont
              confiées.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--card-border)",
                boxShadow: "var(--shadow)",
              }}
              className="rounded-2xl p-6"
            >
              <h3 style={{ color: "var(--accent)" }} className="text-sm font-semibold uppercase tracking-widest mb-3">
                Langues
              </h3>
              <div className="flex flex-col gap-2">
                {languages.map(({ name, level }) => (
                  <div key={name} className="flex items-center justify-between">
                    <span style={{ color: "var(--fg)" }} className="text-sm font-medium">
                      {name}
                    </span>
                    <span
                      style={{ color: "var(--accent)", background: "var(--accent-subtle)" }}
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                    >
                      {level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--card-border)",
                boxShadow: "var(--shadow)",
              }}
              className="rounded-2xl p-6"
            >
              <h3 style={{ color: "var(--accent)" }} className="text-sm font-semibold uppercase tracking-widest mb-3">
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <span
                    key={skill}
                    style={{ color: "var(--fg)", border: "1px solid var(--card-border)", background: "var(--bg)" }}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
