# BYAWA — Marketplace multi-vendeurs

Plateforme e-commerce multi-vendeurs (clients, vendeurs, livreurs, administration)
avec paiement des frais d'adhésion vendeur, commissions, portefeuilles et suivi de livraison.

## Stack technique

- TanStack Start (React 19, SSR) + Vite
- TypeScript
- Tailwind CSS
- Base de données PostgreSQL, authentification et stockage managés (Supabase)

## Prérequis

- Node.js 20+ et npm

## Démarrage local

```sh
npm install
npm run dev
```

L'application est disponible sur `http://localhost:8080`.

## Scripts

- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run start` — exécution du build de production

## Variables d'environnement

Le fichier `.env` contient les variables nécessaires côté client :

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

Les clés serveur (service role) ne doivent jamais être exposées côté client.

## Structure

- `src/routes` — pages et routes API
- `src/components` — composants d'interface
- `src/hooks` — état applicatif (authentification, panier)
- `src/lib` — logique métier et accès données
- `src/integrations` — clients backend générés
