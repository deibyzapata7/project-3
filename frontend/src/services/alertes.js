const URL_API = 'http://localhost:3000/avis-alertes';


function extraireArrondissement(titre) {
  const match = titre.match(/[Aa]rrondissement\s+(?:de\s+|d['']|du\s+)?([^,–-]+)/);
  return match ? match[1].trim() : 'Ville de Montréal';
}

//transforme les donnes de la api 
function normaliserAlerte(raw) {
  return {
    id: raw._id,
    titre: raw.titre,
    arrondissement: extraireArrondissement(raw.titre),
    sujet: raw.type ?? 'Autre',
    dateEmission: raw.date_debut?.slice(0, 10) ?? '',
    dateFin: raw.date_fin?.slice(0, 10) ?? '',
    resume: raw.titre,
    description: raw.titre,
    lien: raw.lien ?? '',
  };
}

// function fetch
export async function getAlertes() {
  const res = await fetch(URL_API);
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  const json = await res.json();
  return json.data.map(normaliserAlerte);
}


export async function getAlerteById(id) {
  const alertes = await getAlertes();
  return alertes.find(a => String(a.id) === String(id));
}