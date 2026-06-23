"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const education = [
  {
    school: "Epitech Technology",
    degree: "Diplôme d'expert en ingénierie logiciel",
    period: "Sep 2022 – Juil 2027",
    details: [
      "Spécialisation sur les logiciels lourds",
      "Développement de dizaines de projets variés",
    ],
  },
  {
    school: "EPITA",
    degree: "Classes préparatoires intégrées",
    period: "Sep 2020 – Juil 2022",
    details: [
      "Développement Orienté Objet en C#",
      "Algorithmie & tronc commun ingénieur",
    ],
  },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="py-20 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold gradient-text inline-block mb-3">Formation</h2>
          <p className="text-base" style={{ color: "var(--muted)" }}>
            Parcours académique
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.45 }}
              className="card rounded-3xl p-8 sm:p-10 text-center flex flex-col items-center"
            >
              <span
                className="text-xs font-medium px-3 py-1 rounded-full inline-block mb-4"
                style={{ color: "var(--accent)", background: "var(--accent-subtle)" }}
              >
                {edu.period}
              </span>
              <h3 className="font-bold text-xl leading-tight mb-1" style={{ color: "var(--fg)" }}>
                {edu.school}
              </h3>
              <p className="text-sm font-semibold gradient-text mb-5">{edu.degree}</p>
              <ul className="flex flex-col gap-2.5">
                {edu.details.map((d) => (
                  <li key={d} className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
