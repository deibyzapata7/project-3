import { useEstEnLigne } from '../hooks/useEstEnLigne';

// Affiche un bandeau d'avertissement quand la connexion réseau est perdue
function BandeauHorsLigne() {
  const estEnLigne = useEstEnLigne();

  if (estEnLigne) return null;

  return (
    <div className="bandeau-hors-ligne">
      Vous êtes hors ligne — les données affichées peuvent ne pas être à jour.
    </div>
  );
}

export default BandeauHorsLigne;
