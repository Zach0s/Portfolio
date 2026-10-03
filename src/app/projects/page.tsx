"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectCard from "@/components/ProjectCard";
import { GitHubIcon } from "@/components/icons";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <h1 className="text-5xl font-bold gradient-text inline-block mb-3">Projets</h1>
          <p className="text-base text-muted-foreground max-w-md mx-auto">
            Une sélection de ce que j&apos;ai construit. D&apos;autres arrivent bientôt.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.45 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}

          {/* Placeholder slot until more projects are written up. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + projects.length * 0.1, duration: 0.45 }}
          >
            <Card className="h-full justify-center items-center text-center">
              <CardHeader className="items-center">
                <CardTitle>Plus de projets en préparation</CardTitle>
                <CardDescription>En attendant, retrouvez mon travail sur GitHub.</CardDescription>
              </CardHeader>
              <CardFooter className="mt-0">
                <Button asChild size="sm">
                  <a href="https://github.com/Zach0s" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon /> Voir mon GitHub
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft /> Retour à l&apos;accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
