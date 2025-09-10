# 🌿 PlantShop - E-commerce Botanique (Nuxt 4 / PostgreSQL)

Application complète de vente de plantes développée avec Nuxt 4 (Vue 3) et Prisma.
Elle propose une interface publique pour les utilisateurs et un espace d'administration sécurisé pour la gestion des plantes, des commandes et des comptes.
Le seed génère des données réalistes (admins, utilisateurs, plantes, commandes) et écrit aussi un fichier `users.txt` pour faciliter les tests.

---

## 🛠 Stack Technique

### Backend

- **Langage & Framework**
  - TypeScript / JavaScript
  - Nuxt 4 (Nitro)
- **Données & ORM**
  - PostgreSQL (pg) + Prisma
  - Migrations & seed (`prisma/seed.ts` avec @faker-js/faker, bcrypt)
- **Auth & Sessions**
  - `nuxt-auth-utils` (login/logout/session côté API)
  - Middleware global côté serveur pour protéger `/admin` et `/api/admin`

### Frontend

- **Templates**
  - Vue 3 (SFC), pages Nuxt (SSR/CSR hybride)
- **UI/UX**
  - Bootstrap 5.3.3 via CDN + styles custom (`assets/css/application.css`)
- **Cart**
  - Panier client-side (localStorage) + événement `cart-updated` pour MAJ UI

---

## ✨ Fonctionnalités

### Client

- **Parcourir & consulter**
  - Catalogue des plantes, recherche simple, fiche produit
- **Acheter**
  - Panier local + validation de commande (stock décrémenté, total calculé)
- **Compte**
  - Connexion/inscription, profil, historique des commandes

### Administrateur

- **Gestion des plantes (CRUD)**
  - Pages `/admin/plants/*` + API admin dédiée
- **Gestion des utilisateurs (CRUD, rôle admin)**
  - Pages `/admin/users/*` + endpoints associés
- **Espace protégé**
  - Accès conditionné par session & rôle via middleware serveur

### Sécurité

- **Sessions & Auth**
  - Endpoints `/api/auth/login|logout|session`
- **Rôles**
  - `USER` / `ADMIN` au niveau des modèles & de la session
- **Contrôles d'accès**
  - Middleware global serveur + hashage des mots de passe (bcrypt)

---

## 🚀 Installation et lancement

### Prérequis

- Node.js
- PostgreSQL
- npm

### Étapes

```bash
# 1) Installer les dépendances
npm install

# 2) Configurer la base & exécuter les migrations
npx prisma migrate dev

# 3) Peupler la base (génère aussi users.txt à la racine)
make seed

# 4) Lancer en développement (http://localhost:3150)
make run

# 5) Production : build puis démarrage (port 3155)
make prod
