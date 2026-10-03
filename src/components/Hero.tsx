"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HeroVisual from "./HeroVisual";
import WaveDivider from "./WaveDivider";
import { GitHubIcon } from "./icons";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-[1.1fr_1fr] items-center gap-10 md:gap-6">
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center md:items-start text-center md:text-left gap-6 order-2 md:order-1"
        >
          {/* Small portrait next to the badge on desktop, where the 3D scene
              takes the space the big photo used to. */}
          <motion.div custom={0} variants={fadeUp} className="flex items-center gap-3">
            <div className="hidden md:block rounded-full p-[2px] bg-[linear-gradient(135deg,var(--accent),var(--accent2))]">
              <div className="relative size-11 overflow-hidden rounded-full">
                <Image
                  src="/profile.jpg"
                  alt=""
                  fill
                  sizes="44px"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
            </div>
            <Badge>
              <span className="size-1.5 rounded-full bg-current animate-pulse" />
              Disponible pour de nouvelles opportunités
            </Badge>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.95] text-foreground"
          >
            Zacharie
            <br />
            <span className="gradient-text">Rodde</span>
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} className="text-xl sm:text-2xl font-semibold text-foreground">
            Développeur logiciel &amp; Full Stack
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            className="text-base sm:text-lg leading-relaxed max-w-lg text-muted-foreground"
          >
            Étudiant en 5ème année à Epitech Technology, Paris. Rigoureux, organisé et autonome, avec
            un bon esprit d&apos;équipe et une grande capacité d&apos;adaptation.
          </motion.p>

          <motion.div custom={4} variants={fadeUp} className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
            <Button asChild>
              <a href="#contact">Me contacter</a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/projects">
                Voir mes projets <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="size-11">
              <a href="https://github.com/Zach0s" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon />
              </a>
            </Button>
          </motion.div>

          <motion.div custom={5} variants={fadeUp} className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" />
            Ivry-sur-Seine, France
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-1 md:order-2"
        >
          <HeroVisual />
        </motion.div>
      </div>

      <WaveDivider />
    </section>
  );
}
