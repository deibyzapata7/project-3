import { Link } from "react-router-dom";

function PageIntrouvable() {
  return (
    <div>
      <h1>404 — Page introuvable</h1>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
}

export default PageIntrouvable;
