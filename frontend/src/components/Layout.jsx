import { Outlet } from 'react-router-dom';
import Entete from './Entete';
import BandeauHorsLigne from './BandeauHorsLigne';

function Layout() {
  return (
    <>
      <BandeauHorsLigne />
      <Entete />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
