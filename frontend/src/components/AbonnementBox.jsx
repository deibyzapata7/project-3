import { useState } from 'react';
import ModalAbonnement from './ModalAbonnement';





function AbonnementBox() {

  const [modalOuvert, setModalOuvert] = useState(false);


  function handleClick() {
  setModalOuvert(true);
}

  return (
    <div className="abonnement-box">
      <h3>S'abonner aux alertes</h3>
      <p>
        Pour recevoir des avis et alertes par courriel ou texto, vous devez
        avoir créé un compte.   
      </p>

      <button onClick={handleClick} className="btn-abonner">
        M'abonner
      </button>

      {modalOuvert && <ModalAbonnement onClose={() => setModalOuvert(false)} />}
        
    </div>
  );
}

export default AbonnementBox;
