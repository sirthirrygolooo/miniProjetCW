# 📚 Mini-projet 3 : Authentification OAuth2 avec Google et Chat en temps réel

## 👥 Membres du groupe

- James GENITRINI
- Jean-Baptiste FROEHLY

---

## 📝 Description du projet

Ce projet vise à implémenter une authentification OAuth2 via Google et à intégrer un système de messagerie instantanée en temps réel entre utilisateurs connectés.

L'application est constituée de deux parties principales :

Frontend : Interface utilisateur développée avec Vue.js permettant la connexion via Google, l'affichage des utilisateurs connectés et une interface de chat.

Backend : Serveur Node.js avec Express.js, Passport.js (Google Strategy), Socket.io pour le chat en temps réel, MongoDB pour le stockage des utilisateurs et messages, et Redis pour la mise en cache des sessions.
---

## ⚙️ Instructions d'exécution

### 🔧 Prérequis

- Node.js (version recommandée : 20+)
- PostgreSQL (base de données locale)
- Un gestionnaire de paquets : `npm` ou `yarn`

---

Ouvrez un terminal et exécutez les commandes suivantes pour installer les dépendances.

```bash
cd frontend
npm install
npm run serve
```

Ouvrez un autre terminal et exécutez les commandes suivantes pour installer les dépendances.

```bash
cd backend
npm install
npm start
```

### 🔑 Configuration de la base de donnée

Créer un fichier .env dans le dossier backend avec les variables d'environnement suivantes :

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
SESSION_SECRET=
MONGO_URI=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=
REDIS_PORT=
REDIS_HOST=
# CLIENT_URL=
FRONTEND_URL=
```
