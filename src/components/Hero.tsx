"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.13, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-20">
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-5 max-w-2xl w-full"
      >
        {/* Profile picture */}
        <motion.div custom={0} variants={fadeUp}>
          <div
            className="rounded-full p-[3px] shadow-2xl"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent2))" }}
          >
            <div
              className="rounded-full overflow-hidden"
              style={{ width: 172, height: 172, position: "relative" }}
            >
              <Image
                src="/profile.jpg"
                alt="Zacharie Rodde"
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Availability badge */}
        <motion.span
          custom={1}
          variants={fadeUp}
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ color: "var(--accent)", background: "var(--accent-subtle)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          Disponible pour de nouvelles opportunités
        </motion.span>

        {/* Name */}
        <motion.h1
          custom={2}
          variants={fadeUp}
          className="text-5xl sm:text-6xl font-bold tracking-tight leading-none"
          style={{ color: "var(--fg)" }}
        >
          Zacharie Rodde
        </motion.h1>

        {/* Title */}
        <motion.p
          custom={3}
          variants={fadeUp}
          className="text-xl sm:text-2xl font-semibold gradient-text"
        >
          Développeur logiciel & Full Stack
        </motion.p>

        {/* Description */}
        <motion.p
          custom={4}
          variants={fadeUp}
          className="text-base leading-relaxed max-w-lg"
          style={{ color: "var(--muted)" }}
        >
          Étudiant en 4ème année à Epitech Technology, Paris. Rigoureux, organisé et autonome,
          avec un bon esprit d'équipe et une grande capacité d'adaptation.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          custom={5}
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-3 pt-1"
        >
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.03] shadow-lg"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent2))" }}
          >
            Me contacter
          </a>
          <a
            href="https://github.com/Zach0s"
            target="_blank"
            rel="noopener noreferrer"
            className="glass px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03] flex items-center gap-2"
            style={{ color: "var(--fg)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <Link
            href="/projects"
            className="glass px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03]"
            style={{ color: "var(--fg)" }}
          >
            Projets →
          </Link>
        </motion.div>

        {/* Location */}
        <motion.div
          custom={6}
          variants={fadeUp}
          className="flex items-center justify-center gap-1.5 text-sm"
          style={{ color: "var(--muted)" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          Ivry-sur-Seine, France
        </motion.div>
      </motion.div>
    </section>
  );
}
