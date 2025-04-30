# 📚 Mini-projet 2 : Authentification avec JWT

## 👥 Membres du groupe

- James GENITRINI
- Jean-Baptiste FROEHLY

---

## 📝 Description du projet

Ce projet a pour objectif de mettre en place une **authentification basée sur JSON Web Tokens (JWT)** pour sécuriser une application web. L'application comprend un backend en **Node.js** avec **Express.js** et un frontend en **Vue.js**. 

L'authentification JWT permet aux utilisateurs de se connecter, de recevoir un token, et d'accéder à des pages sécurisées via une gestion du token côté client (stocké dans `LocalStorage` ou `SessionStorage`).

Le projet est organisé en deux parties :

- **Frontend** : Interface utilisateur développée avec **Vue.js** pour l'inscription, la connexion et l'affichage d'une page sécurisée.
- **Backend** : Serveur **Node.js** avec **Express.js** pour la gestion des utilisateurs, la génération et la validation des JWT, et la gestion de la base de données avec **Sequelize ORM**.

---

## ⚙️ Instructions d'exécution

### 🔧 Prérequis

- Node.js (version recommandée : 20+)
- PostgreSQL (base de données locale)
- Un gestionnaire de paquets : `npm` ou `yarn`

---

Ouvrez un terminal et exécutez les commandes suivantes pour cloner le projet et installer les dépendances.

```bash
cd frontend
npm install
npm run serve
```

```bash
cd backend
npm install
npm start
```

### 🔑 Configuration de la base de donnée

Créer un fichier .env dans le dossier backend avec les variables d'environnement suivantes :

```env
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_DIALECT=
DB_LOGGING=

SECRET_KEY=
```
