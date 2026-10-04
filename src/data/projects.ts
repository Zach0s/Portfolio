export type Project = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  /** Shown on the link button, e.g. the bare domain. */
  linkLabel: string;
  status: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    name: "Youpi Devoirs",
    tagline: "L'aide aux devoirs en famille, du CP au CM2",
    description:
      "Application d'aide aux devoirs : on photographie l'exercice, l'app le corrige instantanément et propose des exercices personnalisés. Suivi de progression par enfant, gamification et options d'accessibilité (police adaptée à la dyslexie, contraste).",
    url: "https://youpidevoirs.com",
    linkLabel: "youpidevoirs.com",
    status: "En ligne",
    tags: ["Application mobile", "Correction par photo", "Gamification", "Accessibilité"],
  },
];
