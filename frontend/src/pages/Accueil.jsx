import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAlertes } from '../services/alertes';
import BarreRecherche from '../components/BarreRecherche';
import BarreFiltre from '../components/BarreFiltre';
import ListeAlertes from '../components/ListeAlertes';
import AbonnementBox from '../components/AbonnementBox';

function normaliser(texte) {
  return texte
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function Accueil() {
  const [alertesOriginales, setAlertesOriginales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);   
  const [searchParams] = useSearchParams();

  useEffect(() => {
   getAlertes()
  .then((donnees) => {
    setAlertesOriginales(donnees);   
  })
  .catch((err) => {
    setError(err);   
  })
  .finally(() => {
    setLoading(false);  
  });
  }, []); 
  

  const q            = searchParams.get('q') ?? '';
  const arrondissements = searchParams.getAll('arrondissement');
  const sujets          = searchParams.getAll('sujet');
  const dateDebut    = searchParams.get('dateDebut') ?? '';
  const dateFin      = searchParams.get('dateFin') ?? '';

const alertesFiltrees = alertesOriginales.filter((alerte) => {
  if (q && !normaliser(alerte.titre).includes(normaliser(q))) return false;

  
  if (arrondissements.length > 0 && !arrondissements.includes(alerte.arrondissement)) return false;

  if (sujets.length > 0 && !sujets.includes(alerte.sujet)) return false;

  if (dateDebut && alerte.dateEmission < dateDebut) return false;
  if (dateFin && alerte.dateEmission > dateFin) return false;
  return true;
});


//calcul pour arrondissement
const arrondissementsUniques = [...new Set(alertesOriginales.map(alerte => alerte.arrondissement))]

  return (
    <>
      <section className="hero-banner">
        <div className="hero-inner">
          <h1>Avis et alertes</h1>
          <p className="hero-label">Trouver un avis</p>
          <BarreRecherche />
        </div>
      </section>

      <div className="accueil-container">
        <section className="main-content">
          <BarreFiltre arrondissements={arrondissementsUniques}/>

          {loading ? (
            <div className="loading-container">
              <div className="spinner" />
              <p>Chargement des données…</p>
            </div>
            
          ) : error !== null ? (
            
               
              <p>Impossible de charger les alertes.</p>
          

        

        ) : alertesFiltrees.length === 0 ? (
            <p className="no-results">Aucune alerte ne correspond à vos critères.</p>
        ) : (
            <ListeAlertes alertes={alertesFiltrees} />

          
        )}
  

            
        </section>

        <aside className="sidebar">
          <AbonnementBox />
        </aside>
      </div>
    </>
  );
}

export default Accueil;