
import { Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import DetailAlerte from './pages/DetailAlerte';
import PageIntrouvable from './pages/PageIntrouvable';
import Layout from './components/Layout';
import './App.css'


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"            element={<Accueil />} />
        <Route path="/alertes/:id" element={<DetailAlerte />} />
      </Route>
      <Route path="*" element={<PageIntrouvable />} />
    </Routes>
  );
}

export default App;

