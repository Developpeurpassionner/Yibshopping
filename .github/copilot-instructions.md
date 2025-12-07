<!-- Copilot instructions for the Yibshopping repo (French) -->
# Instructions pour les agents AI — Yibshopping

But rapide
- Ce dépôt est une SPA Vue 3 (Vite) pour une boutique de montres. Le frontend charge les montres depuis un backend Laravel local (`http://localhost:8000/api/...`).

Commandes de développement
- **Installer dépendances**: `npm install`
- **Lancer dev server**: `npm run dev` (Vite)
- **Build**: `npm run build`
- **Preview build**: `npm run preview`

Contexte architectural essentiel
- Frameworks principaux: `vue@3`, `vue-router@4`, `pinia` pour le state, `axios` pour les appels HTTP, `tailwindcss` pour le style.
- Alias: `@` pointe vers `src` (voir `vite.config.js`). Utilisez `@/stores`, `@/components`, etc.
- Entrée app: `src/main.js` monte Pinia et le routeur. `App.vue` déclenche le chargement initial des montres via `useMontreStore().chargerMontres()`.
- Routes: `src/router/index.js` contient toutes les routes (Home, inscription, connexion, Dashboard/*, etc.).

Patterns et conventions project-specific
- State global: Pinia stores dans `src/stores/*.js`. Exemple important: `src/stores/montre.js` appelle directement `axios` vers `http://localhost:8000/api/...` et expose `hommes`, `femmes`, `isLoaded` et l'action `chargerMontres()`.
- Auth: `src/stores/Auth.js` stocke un `token` et `firstname` dans `localStorage` (clés: `token`, `firstname`). Les composants lisent `auth.isAuthenticated` et `auth.firstname`.
- Composants: liaisons props/événements simples. Exemples:
  - `src/components/ButtonNavigationMontre.vue` émet `@filtrer` (usage dans `src/views/Home.vue`).
  - `src/components/DetailMontrePlusFormulaire.vue` est utilisé avec `:montre` et émet `@confirm`.
- Assets / images: certaines URLs retournées par le backend commencent par `/storage`. Le frontend les transforme en `http://localhost:8000` + path (voir `src/views/Home.vue`).

Intégration backend
- Endpoints observés (hardcodés dans le frontend):
  - `http://localhost:8000/api/montreshommes`
  - `http://localhost:8000/api/montresfemmes`
- Si vous modifiez l'hôte/backend, mettez à jour `src/stores/montre.js` (ou externalisez la base URL dans un fichier de configuration/env).

Style de code & patterns UI
- Tailwind est utilisé massivement (classes utilitaires dans templates). Ne pas remplacer par CSS global sans raison.
- Composants utilisent `<script setup>` et composition API — respecter ce style pour les ajouts.

Conseils pratiques pour un agent IA
- Préfixez les imports avec l'alias `@` quand vous référencez `src`.
- Pour modifier les appels API: centraliser la baseURL (création d'un petit `src/services/api.js` recommandé) plutôt que modifier chaque store.
- Pour ajouter des tests ou build steps: le projet n'en contient pas — confirmer avec le propriétaire avant d'ajouter des pipelines CI.
- Ne pas modifier le comportement du `Auth` store sans vérifier les pages `src/components/NavBar.vue` et vues de connexion — ils s'appuient sur `localStorage` et `auth.checkAuth()`.

Fichiers à consulter pour exemples concrets
- `src/stores/montre.js` — appels axios, format des données montres
- `src/stores/Auth.js` — mécanique d'auth et localStorage
- `src/router/index.js` — configuration des routes
- `src/components/NavBar.vue` — utilisation du store auth et contrôle d'affichage
- `src/views/Home.vue` — pattern d'ouverture de modales, filtrage, et interaction avec stores

Quand demander clarification
- Si une modification touche l'API (nouvelles routes, paramètres), demandez l'URL exacte et les schémas JSON attendus.
- Si vous ajoutez de la SSR, tests, ou une CI, validez d'abord les attentes du propriétaire (hébergement, secrets, clés API).

Fin
- Après modification majeure, proposer à l'utilisateur d'exécuter `npm run dev` et naviguer vers `http://localhost:5173` pour vérification locale.