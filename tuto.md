# 📚 Mini Projet Full Stack

## 👥 Membres du groupe

- James GENITRINI
- Jean-Baptiste FROEHLY

---

## 📝 Description du projet

Ce projet a pour objectif de créer une application web complète (frontend + backend) en utilisant une architecture MVC et une base de données PostgreSQL.  
L'application permet de se connecter avec passeport local et de gérer les sessions/cookies. Vous pouvez par conséquent vous connecter et vous déconnecter.

Le projet est organisé en deux parties :
- **Frontend** : interface utilisateur développée avec [React / Vue, etc.].
- **Backend** : serveur Node.js avec Express et Sequelize pour la gestion de la base de données.

---

## ⚙️ Instructions d'exécution

### 🔧 Prérequis

- Node.js (version recommandée : 18+)
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
DB_HOST=localhost
DB_DIALECT=postgres
DB_LOGGING=false

SESSION_SECRET=eheh
PORT=3000
```