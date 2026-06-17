import { useState, useEffect } from "react";



// Vérifier si l'utilisateur est déjà abonné au chargement
export function useAbonnement() {
  const [estAbonne, setEstAbonne] = useState(false);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    navigator.serviceWorker.ready
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => setEstAbonne(sub !== null));
  }, []);




  // S'abonner aux notifications push
  async function sAbonner() {
    try {
      const res = await fetch("https://alertes-montreal-backend.onrender.com/vapid-public-key");
      const { publicKey } = await res.json();

      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey,
      });

      setEstAbonne(true);

      await fetch("https://alertes-montreal-backend.onrender.com/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription }),
      });
   } catch (err) {
  if (err.name === 'NotAllowedError') {
    setErreur('denied');
  } else {
    setErreur("Erreur lors de l'abonnement. Réessayez plus tard.");
  }
}


  }





  // Se désabonner des notifications push
  async function seDesabonner() {
    try {
      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.getSubscription();

      await subscription.unsubscribe();

      await fetch("https://alertes-montreal-backend.onrender.com/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      });
      setEstAbonne(false);
    } catch (err) {
      setErreur(err.message);
    }
  }


  
  return { estAbonne, erreur, sAbonner, seDesabonner };
}