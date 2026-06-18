const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');


dotenv.config();

// Connexion à Firebase avec les identifiants du compte de service
initializeApp({
  credential: cert(JSON.parse(process.env.FIREBASE_CREDENTIALS))
});

const db = getFirestore();


//Server express
const app = express();
const PORT = process.env.PORT || 3000;




// Autoriser les requêtes du frontend
app.use(cors());

// Permettre de lire le JSON des requêtes
app.use(express.json());




//// Récupérer les alertes depuis l'API de Montréal
app.get('/avis-alertes', async (req, res) => {
    try{
  const response = await fetch('https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=fc6e5f85-7eba-451c-8243-bdf35c2ab336');
  const json = await response.json();
  res.json({ data: json.result.records });
    } catch (error) {
  res.status(500).json({ error: true, message: 'Erreur serveur' });

    }
});



// Configuration VAPID pour les notifications push
const webpush = require('web-push');
webpush.setVapidDetails(
  process.env.VAPID_EMAIL,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);


// Retourner la clé publique VAPID au frontend
app.get('/vapid-public-key', (req, res) => {
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY });
});




// Sauvegarder un abonnement dans Firebase
app.post('/subscribe', async (req, res) => {
  try {
    const subscription = req.body.subscription;

    const existing = await db.collection('subscriptions')
      .where('endpoint', '==', subscription.endpoint)
      .get();

    if (!existing.empty) {
      return res.status(200).json({ message: 'Déjà abonné' });
    }

    await db.collection('subscriptions').add({
      endpoint: subscription.endpoint,
      keys: subscription.keys,
      createdAt: new Date()
    });
    res.status(201).json({ message: 'Abonné avec succès' });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Erreur serveur' });
  }
});





// Supprimer l'abonnement correspondant à l'endpoint reçu
app.post('/unsubscribe', async (req, res) => {
  try {

   const endpoint = req.body.endpoint;
   const snapshot = await db.collection('subscriptions')
   .where('endpoint', '==', endpoint)
   .get();


  if (snapshot.empty) {
  return res.status(404).json({ error: true, message: 'Abonnement non trouvé' });}


  snapshot.forEach(doc => doc.ref.delete());
  res.json({ message: 'Désabonné avec succès' });

  } catch (error) {
    res.status(500).json({ error: true, message: 'Erreur serveur' });
  }
});





// Envoyer une notification push à tous les abonnés
app.post('/send-notification', async (req, res) => {
  try {
    const { title, body, url } = req.body;
    const snapshot = await db.collection('subscriptions').get();
    const envois = snapshot.docs.map(async (doc) => {
      const subscription = doc.data();
      try {
        await webpush.sendNotification(subscription, JSON.stringify({ title, body, url }));
      } catch (err) {
        if (err.statusCode === 410) {
          await doc.ref.delete();
        }
      }
    });
    await Promise.all(envois);
    res.json({ message: 'Notifications envoyées' });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Erreur serveur' });
  }
});


app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});