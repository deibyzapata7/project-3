import CarteAlerte from './CarteAlerte';

function ListeAlertes({ alertes }) {
  return (
    <div className="liste-alertes">
      <p className="resultats-count">
        {alertes.length} résultat{alertes.length !== 1 ? 's' : ''}
      </p>
      {alertes.map((alerte) => (
        <CarteAlerte key={alerte.id} alerte={alerte} />
      ))}
    </div>
  );
}

export default ListeAlertes;