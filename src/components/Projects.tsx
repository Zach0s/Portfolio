"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projets" className="py-20 px-6 scroll-mt-16" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold gradient-text inline-block mb-3">Projets</h2>
          <p className="text-base text-muted-foreground">Ce que j&apos;ai mis en ligne</p>
        </motion.div>

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.45 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button asChild variant="outline">
            <Link href="/projects">
              Tous les projets <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
