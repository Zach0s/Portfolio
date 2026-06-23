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
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text inline-block mb-3">Formation</h2>
          <p className="text-base" style={{ color: "var(--muted)" }}>
            Parcours académique
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.45 }}
              className="glass rounded-2xl p-6"
            >
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full inline-block mb-3"
                style={{ color: "var(--accent)", background: "var(--accent-subtle)" }}
              >
                {edu.period}
              </span>
              <h3 className="font-bold text-lg leading-tight mb-1" style={{ color: "var(--fg)" }}>
                {edu.school}
              </h3>
              <p className="text-sm font-medium gradient-text mb-4">{edu.degree}</p>
              <ul className="flex flex-col gap-2">
                {edu.details.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="gradient-text text-xs mt-0.5 font-bold">▸</span>
                    <span className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {d}
                    </span>
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
