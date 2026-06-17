import { useState, useEffect } from 'react';

export function useEstEnLigne() {
  const [estEnLigne, setEstEnLigne] = useState(navigator.onLine);

  // Abonne et désabonne les écouteurs d'événements réseau au montage et démontage du composant
  useEffect(() => {
    function handleOnline()  { setEstEnLigne(true); }
    function handleOffline() { setEstEnLigne(false); }

    window.addEventListener('online',  handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online',  handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return estEnLigne;
}
