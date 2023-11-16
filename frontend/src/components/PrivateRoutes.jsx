import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Context } from '../contexts/UserContext';

export default function PrivateRoutes() {
  const { user } = useContext(Context);

  function check() {
    // TODO Denna ska egentligen kolla med backend om token är giltig
    return user?.userid; // && user?.expires (eller gör allt i backend)
  }
  return check() ? <Outlet /> : <Navigate to='/login' replace />;
}
