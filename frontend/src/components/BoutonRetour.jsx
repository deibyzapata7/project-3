import { useNavigate } from 'react-router-dom';

function BoutonRetour() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)}>
      ← Retour
    </button>
  );
}

export default BoutonRetour;