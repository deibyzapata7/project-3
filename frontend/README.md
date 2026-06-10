# Projet 3 — Avis et alertes de Montréal (PWA + Notifications Push)

**Étudiant :** Deiby Zapata

Application web progressive (PWA) qui affiche les avis et alertes de la Ville de Montréal en temps réel, avec un système de notifications push pour informer les abonnés.

---

## Fonctionnalités

### De base
- Affichage des alertes depuis l'API de Montréal
- Filtres par arrondissement, sujet et date
- Application installable (PWA)
- Fonctionne hors ligne grâce au service worker
- Cache des données API avec la stratégie Stale While Revalidate

### Notifications push
- Abonnement et désabonnement via une modale React
- Authentification du serveur avec clés VAPID
- Stockage des abonnements dans Firebase Firestore
- Envoi de notifications à tous les abonnés
- Nettoyage automatique des abonnements expirés (code HTTP 410)
- Clic sur la notification ouvre l'application

---

## Organisation du dépôt

```
projet-3/
├── frontend/        → Application React + Vite (PWA)
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── sw.js    → Service worker personnalisé
│   └── vite.config.js
├── backend/         → Serveur Node.js + Express
│   ├── index.js
│   └── .env.example
└── docs/            → Rapport technique
```

---

## Installation et démarrage

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Accessible sur `http://localhost:5173`

### Backend

```bash
cd backend
npm install
node index.js
```

Accessible sur `http://localhost:3000`

### Base de données (Firebase Firestore)

1. Créer un projet Firebase sur https://console.firebase.google.com
2. Activer Firestore Database
3. Générer une clé de service compte : Paramètres → Comptes de service → Générer une nouvelle clé privée
4. Copier le contenu JSON dans la variable d'environnement `FIREBASE_CREDENTIALS`

---

## Variables d'environnement (backend)

Créer un fichier `.env` dans `backend/` (ne jamais committer) :

```
PORT=
VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_EMAIL=
FIREBASE_CREDENTIALS=
```

> Générer les clés VAPID avec : `npx web-push generate-vapid-keys`

---

## Endpoints API

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/vapid-public-key` | Retourne la clé publique VAPID |
| POST | `/subscribe` | Enregistre un abonnement dans Firestore |
| POST | `/unsubscribe` | Supprime un abonnement de Firestore |
| GET | `/avis-alertes` | Proxy vers l'API de Montréal |
| POST | `/send-notification` | Envoie une notification à tous les abonnés |

---

## Tester l'envoi d'une notification

### Via curl

```bash
curl -X POST https://alertes-montreal-backend.onrender.com/send-notification \
  -H "Content-Type: application/json" \
  -d '{"title":"Alerte Montréal","body":"Ceci est un test","url":"/"}'
```

### Via Postman

- Méthode : `POST`
- URL : `https://alertes-montreal-backend.onrender.com/send-notification`
- Body (JSON) :
```json
{
  "title": "Alerte Montréal",
  "body": "Ceci est un test",
  "url": "/"
}
```

> Le navigateur doit avoir accordé la permission de notifications et l'utilisateur doit être abonné.

---

## URLs de déploiement

- **Frontend (Netlify) :** https://fanciful-mandazi-be93ab.netlify.app
- **Backend (Render) :** https://alertes-montreal-backend.onrender.com