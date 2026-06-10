import { Outlet } from 'react-router-dom';
import Entete from './Entete'; 
import { useState, useEffect } from 'react';

function Layout() {
const [estEnLigne, setEstEnLigne] = useState(navigator.onLine)

  useEffect(() => {
  window.addEventListener('online', () => setEstEnLigne(true))
  window.addEventListener('offline', () => setEstEnLigne(false))
}, [])



  return (
  <>
    {!estEnLigne && (
      <div className="offline-banner">
        Vous êtes hors ligne
      </div>
    )}
    <Entete />
    <main>
      <Outlet />
    </main>
  </>
);
}

export default Layout;