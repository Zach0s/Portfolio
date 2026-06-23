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

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-14">
      <h2 className="text-4xl font-bold gradient-text inline-block mb-3">{title}</h2>
      <p className="text-base" style={{ color: "var(--muted)" }}>
        {subtitle}
      </p>
    </div>
  );
}

export default function Bio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="bio" className="py-20 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading title="À propos" subtitle="Développeur passionné, basé en région parisienne" />
        </motion.div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="card rounded-3xl p-8 sm:p-12 text-center"
        >
          <p className="text-lg leading-relaxed mb-5 max-w-xl mx-auto" style={{ color: "var(--fg)" }}>
            Développeur en quatrième année à{" "}
            <span className="font-semibold" style={{ color: "var(--accent)" }}>
              Epitech Technology
            </span>
            , Paris. Je souhaite poursuivre mon immersion dans le monde professionnel en
            consolidant les compétences acquises, tout en développant de nouveaux savoir-faire.
          </p>
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
            Rigoureux, organisé et autonome, j&apos;ai aussi un bon esprit d&apos;équipe et une
            grande capacité d&apos;adaptation dont je me sers pour effectuer les missions qui me
            sont confiées.
          </p>
        </motion.div>

        {/* Languages + soft skills */}
        <div className="grid sm:grid-cols-2 gap-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="card rounded-3xl p-8 text-center"
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--accent)" }}>
              Langues
            </h3>
            <div className="flex flex-wrap justify-center gap-2.5">
              {languages.map(({ name, level }) => (
                <span
                  key={name}
                  className="text-sm px-3.5 py-1.5 rounded-full font-medium"
                  style={{ color: "var(--fg)", background: "var(--accent-subtle)" }}
                >
                  {name}
                  <span style={{ color: "var(--accent)" }} className="font-semibold">
                    {" · "}
                    {level}
                  </span>
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="card rounded-3xl p-8 text-center"
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--accent)" }}>
              Soft Skills
            </h3>
            <div className="flex flex-wrap justify-center gap-2.5">
              {softSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm px-3.5 py-1.5 rounded-full font-medium"
                  style={{ color: "var(--fg)", background: "var(--accent-subtle)" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
