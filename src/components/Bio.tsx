"use client";

import { motion, useInView } from "framer-motion";
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
    <section id="bio" className="py-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text inline-block mb-3">À propos</h2>
          <p className="text-base" style={{ color: "var(--muted)" }}>
            Développeur passionné, basé en région parisienne
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-5">
          {/* Profile text — spans 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="glass rounded-2xl p-6 md:col-span-3 flex flex-col justify-center"
          >
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              Profil
            </h3>
            <p className="text-base leading-relaxed mb-3" style={{ color: "var(--fg)" }}>
              Développeur en quatrième année à{" "}
              <span style={{ color: "var(--accent)" }} className="font-semibold">
                Epitech Technology
              </span>
              , Paris. Je souhaite poursuivre mon immersion dans le monde professionnel en
              consolidant les compétences acquises, tout en développant de nouveaux savoir-faire.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Rigoureux, organisé et autonome, j'ai aussi un bon esprit d'équipe et une grande
              capacité d'adaptation dont je me sers pour effectuer les missions qui me sont
              confiées.
            </p>
          </motion.div>

          {/* Right column — spans 2 cols */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="glass rounded-2xl p-5"
            >
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--accent)" }}
              >
                Langues
              </h3>
              <div className="flex flex-col gap-2.5">
                {languages.map(({ name, level }) => (
                  <div key={name} className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                      {name}
                    </span>
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                      style={{ color: "var(--accent)", background: "var(--accent-subtle)" }}
                    >
                      {level}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Soft skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="glass rounded-2xl p-5"
            >
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--accent)" }}
              >
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-full font-medium border"
                    style={{
                      color: "var(--fg)",
                      borderColor: "var(--glass-border)",
                      background: "var(--accent-subtle)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
