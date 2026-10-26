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
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Base [Upstash Redis](https://upstash.com) des compteurs anti-spam (`KV_REST_API_URL` / `KV_REST_API_TOKEN` marchent aussi). |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Clés [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) du captcha, facultatives. |

Sans `RESEND_API_KEY`, la route renvoie une 500 et le reste du site fonctionne
normalement.

### Anti-spam du formulaire

`POST /api/contact` applique, dans l'ordre :

1. **Blocage temporaire** : une IP qui envoie plus de 5 requêtes en une minute,
   ou qui remplit le champ piège, est bloquée 24 h.
2. **Captcha Turnstile**, si les deux clés sont définies.
3. **Limites d'envoi** : 3 messages par heure par IP, 2 par heure par adresse
   email, 20 par heure au total pour protéger la boîte de réception.
4. **Doublons** : un message identique à un autre reçu dans les 24 h obtient une
   réponse de succès sans nouvel email.

Les seuils sont dans `LIMITS` (`src/app/api/contact/route.ts`). Les IP et
adresses sont hachées avant d'être stockées. Sans Redis, les compteurs vivent
dans la mémoire de chaque instance serverless : ça suffit en local, mais en
production une rafale répartie sur plusieurs instances passerait en partie.

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
│   ├── api/contact/route.ts   # Envoi du formulaire via Resend, anti-spam
│   ├── globals.css            # Tokens de thème, utilitaires, animations du fond
│   ├── layout.tsx             # Navbar, Footer, fond animé, providers
│   ├── page.tsx               # Page d'accueil (assemble les sections)
│   └── projects/page.tsx      # Page projets
└── components/                # Hero, Bio, Experience, Education, Skills,
                               # ContactForm, Navbar, Footer, ThemeToggle,
                               # GeometricBackground, Providers, Turnstile
└── lib/                       # store.ts (compteurs Redis / mémoire), turnstile.ts
```

Le thème pilote tout par des variables CSS définies sur `:root` et `.dark` :
couleurs de surface, accents, et la palette des formes géométriques animées du
fond, dont la version sombre reprend les complémentaires de la palette claire.

## Déploiement

Déployé sur Vercel. `RESEND_API_KEY` doit être déclarée dans les variables
d'environnement du projet, ainsi que les clés Upstash (via l'intégration
Upstash du Marketplace Vercel) et, si besoin, celles de Turnstile.

## Visual tooling

- **Spline** — the 3D scene in the hero (`src/components/HeroVisual.tsx`) only loads on screens ≥ 768px, without reduced motion or data-saver, once the browser is idle. Point it at your own scene with `NEXT_PUBLIC_SPLINE_SCENE` (Spline → Export → Code → React → copy the `.splinecode` URL). The site relies on two naming conventions in the scene:
  - `section:<id>` — a group with a Mouse Down event; clicking it scrolls to the element with that `id` (`bio`, `projets`, `experience`, `education`, `skills`, `contact`).
  - `Directional Light`, `Fill Light`, `Lamp Light`, `Monitor Glow` — the site fades these to the night intensities in `NIGHT_INTENSITY` in dark mode (exported light states don't keep their intensity, so the scene can't do it alone). Rename a light in Spline and you need to rename it there too.
- **Haikei** — `public/haikei/*.svg` are used as CSS masks and tinted with the theme gradient. Replace any of them with a Haikei export (shapes in black on a transparent background).
- **shadcn/ui** — `components.json` is set up; components live in `src/components/ui` and use the portfolio's own color tokens (see `@theme inline` in `globals.css`). Add more with `npx shadcn@latest add <component>`.
- **Projects** — edit `src/data/projects.ts`; the home section and `/projects` both read from it.
