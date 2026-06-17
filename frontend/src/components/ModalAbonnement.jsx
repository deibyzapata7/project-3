import { useEffect } from 'react';
import { useAbonnement } from '../hooks/useAbonnement';

function ModalAbonnement({ onClose }) {
  const { estAbonne, erreur, sAbonner, seDesabonner } = useAbonnement();
  const permissionBloquee = Notification.permission === 'denied';

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

        {erreur && erreur !== 'denied' && <p className="modal-erreur">{erreur}</p>}

        {permissionBloquee ? (
          <p className="modal-erreur">
            Vous avez bloqué les notifications. Modifiez les paramètres de votre navigateur pour les activer.
          </p>
        ) : estAbonne ? (
          <button onClick={seDesabonner}>Se désabonner</button>
        ) : (
          <button onClick={sAbonner}>S'abonner</button>
        )}
      </div>
    </div>
  );
}

export default ModalAbonnement;
