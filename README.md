# 🌿 PlantShop - E-commerce Botanique (Nuxt 4 / PostgreSQL)

Application complète de vente de plantes développée avec **Nuxt 4** (Vue 3) et **Prisma**.
Elle propose une interface publique fluide pour les utilisateurs 🌱 et un espace d'administration sécurisé 🔐 pour la gestion des plantes, des commandes et des comptes.
Un script de seed réaliste pré-remplit la base avec des plantes 🪴, des utilisateurs 👤, des commandes 📦 et génère un fichier `users.txt` pour faciliter vos tests.

---

## 🛠 Stack Technique

### 🧩 Backend

- **Langage & Framework**
  - TypeScript / JavaScript
  - Nuxt 4 (avec Nitro pour le serveur API)
- **Base de données & ORM**
  - PostgreSQL (driver `pg`)
  - Prisma (modèles, migrations, seed)
  - FakerJS + Bcrypt pour le script `prisma/seed.ts`
- **Authentification**
  - Sessions via `nuxt-auth-utils` (API REST `/api/auth/*`)
  - Cookies signés
  - Middleware serveur pour restreindre les routes `/admin` et `/api/admin`

### 🎨 Frontend

- **Templates**
  - Vue 3 (Single File Components)
  - Pages Nuxt hybrides (SSR + Client Side)
- **UI/UX**
  - Bootstrap 5.3.3 (via CDN)
  - Feuilles de styles personnalisées dans `assets/css/application.css`
- **Panier**
  - Stockage local avec `localStorage`
  - Synchronisation via l’événement personnalisé `cart-updated`
  - Panier persistant sans AJAX

---

## ✨ Fonctionnalités

### 👥 Côté client

- **🛍 Catalogue**
  - Liste des plantes, recherche simple, pagination
- **📄 Fiches produits**
  - Description, prix, stock, ajout au panier
- **🛒 Panier**
  - Panier dynamique stocké localement, mise à jour en temps réel
- **✅ Commandes**
  - Validation du panier, stockage en base, réduction du stock
- **👤 Compte utilisateur**
  - Authentification, profil modifiable, historique des commandes

### 🔧 Administration

- **🌱 Plantes**
  - Ajout, édition, suppression, consultation
- **👥 Utilisateurs**
  - CRUD complet avec rôles (`USER`, `ADMIN`)
- **🔐 Sécurisation**
  - Interface d'administration distincte, avec contrôle d'accès serveur

### 🛡 Sécurité

- Sessions avec cookies sécurisés
- Rôles et permissions côté base & application
- Mot de passe hashé via `bcrypt`
- Middleware serveur de protection des zones sensibles

---

## 🚀 Installation et lancement

### 🔧 Prérequis

- Node.js ≥ 18
- PostgreSQL ≥ 13
- npm ≥ 9

### ⚙️ Étapes

```bash
# 1) Installer les dépendances
npm install

# 2) Créer la base de données et exécuter les migrations Prisma
npx prisma migrate dev

# 3) Peupler la base avec des données factices (admins, utilisateurs, plantes, commandes)
#    => Génère aussi un fichier users.txt à la racine pour tester rapidement
make seed

# 4) Lancer l'application en développement (http://localhost:3150)
make run

# 5) Lancer en production (build + start sur le port 3155)
make prod
