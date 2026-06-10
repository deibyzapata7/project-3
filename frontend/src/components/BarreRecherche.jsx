import { useSearchParams } from 'react-router-dom';

function BarreRecherche() {
  const [searchParams, setSearchParams] = useSearchParams();
  const recherche = searchParams.get('q') ?? '';

  function handleChange(e) {
    const val = e.target.value;
    const next = new URLSearchParams(searchParams);
    if (val) {
      next.set('q', val);
    } else {
      next.delete('q');
    }
    setSearchParams(next);
  }

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={recherche}
        onChange={handleChange}
        placeholder="Que cherchez-vous?"
        className="search-input"
        aria-label="Rechercher une alerte"
      />
    </div>
  );
}

export default BarreRecherche;