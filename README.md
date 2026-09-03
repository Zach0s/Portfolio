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
