# Portfolio — Zacharie Rodde

Portfolio personnel de Zacharie Rodde, développeur logiciel et fullstack.
Site vitrine d'une seule page (parcours, expériences, compétences, contact),
accompagné d'une page projets.

## Stack

- **Next.js 16** (App Router, Turbopack) et **React 19**
- **TypeScript**
- **Tailwind CSS 4** — tokens de design et animations dans `src/app/globals.css`
- **framer-motion** — animations d'apparition des sections
- **next-themes** — bascule clair/sombre (`attribute="class"`, sans thème système)
- **Resend** — envoi des messages du formulaire de contact
- **Vercel Analytics** et **Speed Insights**

## Démarrage

```bash
npm install
npm run dev
```

Le site est servi sur [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Le formulaire de contact a besoin d'une clé Resend. Copiez `.env.example` vers
`.env.local` et renseignez-la :

```bash
cp .env.example .env.local
```

| Variable | Rôle |
| --- | --- |
| `RESEND_API_KEY` | Clé API [Resend](https://resend.com) utilisée par `POST /api/contact`. |

Sans cette clé, la route renvoie une 500 et le reste du site fonctionne
normalement.

## Scripts

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Sert le build de production |
| `npm run lint` | ESLint |

## Structure

```
src/
├── app/
│   ├── api/contact/route.ts   # Envoi du formulaire via Resend
│   ├── globals.css            # Tokens de thème, utilitaires, animations du fond
│   ├── layout.tsx             # Navbar, Footer, fond animé, providers
│   ├── page.tsx               # Page d'accueil (assemble les sections)
│   └── projects/page.tsx      # Page projets
└── components/                # Hero, Bio, Experience, Education, Skills,
                               # ContactForm, Navbar, Footer, ThemeToggle,
                               # GeometricBackground, Providers
```

Le thème pilote tout par des variables CSS définies sur `:root` et `.dark` :
couleurs de surface, accents, et la palette des formes géométriques animées du
fond, dont la version sombre reprend les complémentaires de la palette claire.

## Déploiement

Déployé sur Vercel. `RESEND_API_KEY` doit être déclarée dans les variables
d'environnement du projet.

## Visual tooling

- **Spline** — the 3D scene in the hero (`src/components/HeroVisual.tsx`) only loads on screens ≥ 768px, without reduced motion or data-saver, once the browser is idle. Point it at your own scene with `NEXT_PUBLIC_SPLINE_SCENE` (Spline → Export → Code → React → copy the `.splinecode` URL). The site relies on two naming conventions in the scene:
  - `section:<id>` — a group with a Mouse Down event; clicking it scrolls to the element with that `id` (`bio`, `projets`, `experience`, `education`, `skills`, `contact`).
  - `Directional Light`, `Fill Light`, `Lamp Light`, `Monitor Glow` — the site fades these to the night intensities in `NIGHT_INTENSITY` in dark mode (exported light states don't keep their intensity, so the scene can't do it alone). Rename a light in Spline and you need to rename it there too.
- **Haikei** — `public/haikei/*.svg` are used as CSS masks and tinted with the theme gradient. Replace any of them with a Haikei export (shapes in black on a transparent background).
- **shadcn/ui** — `components.json` is set up; components live in `src/components/ui` and use the portfolio's own color tokens (see `@theme inline` in `globals.css`). Add more with `npx shadcn@latest add <component>`.
- **Projects** — edit `src/data/projects.ts`; the home section and `/projects` both read from it.
