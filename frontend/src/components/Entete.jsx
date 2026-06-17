import { useState } from 'react';
import logoMontreal from '../assets/ville-de-montreal.svg';
import ModalAbonnement from './ModalAbonnement';


function Entete() {
  const [modalOuvert, setModalOuvert] = useState(false);

  return (
    <header className="main-header">
      <img src={logoMontreal} alt="Ville de Montréal" className="logo-img" />
      <button onClick={() => setModalOuvert(true)} className="btn-mon-compte">
        Mon Compte
      </button>
      {modalOuvert && <ModalAbonnement onClose={() => setModalOuvert(false)} />}
    </header>
  );
}

export default Entete;
