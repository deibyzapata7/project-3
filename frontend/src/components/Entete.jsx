import logoMontreal from '../assets/ville-de-montreal.svg';

function Entete() {
  function handleMonCompte() {
    alert("Fonctionnalité 'Mon Compte' indisponible pour le moment.");
  }

  return (
    <header className="main-header">
      <img src={logoMontreal} alt="Ville de Montréal" className="logo-img" />
      <button onClick={handleMonCompte} className="btn-mon-compte">
        Mon Compte
      </button>
    </header>
  );
}

export default Entete;