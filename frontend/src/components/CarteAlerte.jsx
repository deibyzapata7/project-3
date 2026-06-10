import { Link } from 'react-router-dom';

function CarteAlerte({ alerte }) {
  const { id, titre, arrondissement, sujet, dateEmission, resume } = alerte;

  return (
    <article className="carte-alerte">
      <h3>
        <Link to={`/alertes/${id}`}>{titre}</Link>
      </h3>
      <span className="tag-sujet">{sujet}</span>
      <div className="carte-meta">
        <span className="carte-info-secondary">{dateEmission}</span>
        {arrondissement && (
          <span className="carte-info-secondary">{arrondissement}</span>
        )}
      </div>
      {resume && <p className="carte-resume">{resume}</p>}
    </article>
  );
}

export default CarteAlerte;