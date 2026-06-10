import { useEffect } from 'react';
import { useAbonnement } from '../hooks/useAbonnement';



function ModalAbonnement({ onClose }) {
  const { estAbonne, erreur, sAbonner, seDesabonner } = useAbonnement();

useEffect(() => {
  function handleKeyDown(e) {
    if (e.key === 'Escape') onClose();
  }
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);




return (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>✕</button>
      <h2>Recevoir des notifications</h2>
      <p>Abonnez-vous pour recevoir les alertes de Montréal en temps réel.</p>

      {erreur && <p className="modal-erreur">{erreur}</p>}

      {estAbonne ? (
        <button onClick={seDesabonner}>Se désabonner</button>
      ) : (
        <button onClick={sAbonner}>S'abonner</button>
      )}
    </div>
  </div>
);

}



export default ModalAbonnement;