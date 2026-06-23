"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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
      "Algorithmie",
      "Tronc commun ingénieur",
    ],
  },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="py-16 px-6 max-w-5xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ color: "var(--fg)" }} className="text-3xl font-bold mb-8">
          Formation
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              style={{
                background: "var(--card)",
                border: "1px solid var(--card-border)",
                boxShadow: "var(--shadow)",
              }}
              className="rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 style={{ color: "var(--fg)" }} className="font-semibold text-base">
                    {edu.school}
                  </h3>
                  <p style={{ color: "var(--accent)" }} className="text-sm font-medium mt-0.5">
                    {edu.degree}
                  </p>
                </div>
                <span
                  style={{ color: "var(--muted)", background: "var(--bg)", border: "1px solid var(--card-border)" }}
                  className="text-xs px-2.5 py-1 rounded-full whitespace-nowrap ml-2"
                >
                  {edu.period}
                </span>
              </div>
              <ul className="flex flex-col gap-1.5 mt-2">
                {edu.details.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span style={{ color: "var(--accent)" }} className="text-xs mt-0.5">▸</span>
                    <span style={{ color: "var(--muted)" }} className="text-sm leading-relaxed">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
