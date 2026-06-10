import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';



const SUJETS = [
  'Déchets et recyclage',
  'Eau et aqueduc',
  'Travaux et voirie',
];

function BarreFiltre({ arrondissements }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateOpen, setDateOpen] = useState(false);

  const arrondissementsActifs = searchParams.getAll('arrondissement');
  const sujets          = searchParams.getAll('sujet');
  const dateDebut      = searchParams.get('dateDebut') ?? '';
  const dateFin        = searchParams.get('dateFin') ?? '';


  function toggleValeur(cle, valeur) {
  const next = new URLSearchParams(searchParams);
  const actuels = next.getAll(cle);
  next.delete(cle);

  if (actuels.includes(valeur)) {
    actuels.filter(v => v !== valeur).forEach(v => next.append(cle, v));
  } else {
    [...actuels, valeur].forEach(v => next.append(cle, v));
  }
  setSearchParams(next);
}
  function handleReset() {
    setSearchParams({});
    setDateOpen(false);
  }

  function handleDate(e) {
  const next = new URLSearchParams(searchParams);
  if (e.target.value) {
    next.set(e.target.name, e.target.value);
  } else {
    next.delete(e.target.name);
  }
  setSearchParams(next);
}

  const hasFilters = arrondissementsActifs.length > 0 || sujets.length > 0 || dateDebut || dateFin;

  return (
    <>
    <div className="filter-bar">
      <select
  value=""
  onChange={(e) => {
    if (e.target.value) toggleValeur('arrondissement', e.target.value);
    e.target.value = '';
  }}
         >
      <option value="">Arrondissement</option>
        {arrondissements.map(a => (
      <option key={a} value={a}>{a}</option>
         ))}
      </select>

      <div className="date-dropdown">
        <button
          type="button"
          className="date-dropdown-btn"
          onClick={() => setDateOpen(prev => !prev)}
        >
          Date
        </button>

        {dateOpen && (
  <div className="date-dropdown-panel">
    <label>
      Du
      <input type="date" name="dateDebut" value={dateDebut} onChange={handleDate} />
    </label>
    <label>
      Au
      <input type="date" name="dateFin" value={dateFin} onChange={handleDate} />
    </label>
  </div>
)}
</div>

      <select
  value=""
  onChange={(e) => {
    if (e.target.value) toggleValeur('sujet', e.target.value);
    e.target.value = '';
  }}
>
  <option value="">Sujet</option>
  {SUJETS.map(s => (
    <option key={s} value={s}>{s}</option>
  ))}
</select>

      {hasFilters && (
        <button className="btn-reset" onClick={handleReset} type="button">
          Réinitialiser
        </button>
      )}
    </div>

    
  {hasFilters && (
      <div className="chips-container">
        {arrondissementsActifs.map(a => (
          <span key={a} className="chip">
            {a}
            <button type="button" onClick={() => toggleValeur('arrondissement', a)}>✕</button>
          </span>
        ))}
        {sujets.map(s => (
          <span key={s} className="chip">
            {s}
            <button type="button" onClick={() => toggleValeur('sujet', s)}>✕</button>
          </span>
        ))}
        {dateDebut && (
          <span className="chip">
            Du {dateDebut}
            <button type="button" onClick={() => handleDate({target: {name: 'dateDebut', value: ''}})}>✕</button>
          </span>
        )}
        {dateFin && (
          <span className="chip">
            Au {dateFin}
            <button type="button" onClick={() => handleDate({target: {name: 'dateFin', value: ''}})}>✕</button>
          </span>
        )}
      </div>
    )}
  </>
  );
}

export default BarreFiltre;