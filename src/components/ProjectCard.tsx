"use client";

import type { MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/data/projects";

function trackSpotlight(event: MouseEvent<HTMLDivElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
  el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card onMouseMove={trackSpotlight} className="spotlight overflow-hidden h-full transition-transform duration-300 hover:-translate-y-1">
      {/* Haikei blob peeking from the corner */}
      <div
        aria-hidden="true"
        className="haikei haikei-blob blob-spin pointer-events-none absolute -right-16 -top-16 size-48 opacity-20"
      />
      <CardHeader>
        <Badge className="mb-2">
          <span className="size-1.5 rounded-full bg-current animate-pulse" />
          {project.status}
        </Badge>
        <CardTitle className="text-2xl">{project.name}</CardTitle>
        <p className="text-sm font-semibold gradient-text">{project.tagline}</p>
      </CardHeader>
      <CardDescription>{project.description}</CardDescription>
      <CardContent className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </CardContent>
      <CardFooter>
        <Button asChild size="sm">
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {project.linkLabel} <ArrowUpRight />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
