import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAlerteById } from '../services/alertes';
import BoutonRetour from '../components/BoutonRetour';

function DetailAlerte() {
  const { id } = useParams();
  const [alerte, setAlerte] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    getAlerteById(id).then((data) => {
      setAlerte(data ?? null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="detail-container loading-container">
        <div className="spinner" />
        <p>Chargement…</p>
      </div>
    );
  }

  if (!alerte) {
    return (
      <div className="detail-container">
        <BoutonRetour />
        <p>Alerte introuvable.</p>
      </div>
    );
  }

  return (
    <article className="detail-container">
      <BoutonRetour />
      <span className="tag-sujet">{alerte.sujet}</span>
      <h1>{alerte.titre}</h1>
      <div className="detail-meta">
        <span className="carte-info-secondary">{alerte.dateEmission}</span>
        {alerte.arrondissement && (
          <span className="carte-info-secondary">{alerte.arrondissement}</span>
        )}
      </div>
      <p className="detail-description">{alerte.description}</p>
    </article>
  );
}

export default DetailAlerte;