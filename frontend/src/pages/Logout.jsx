import { useContext, useEffect } from 'react';
import { redirect } from 'react-router-dom';

import { Context } from '../contexts/UserContext';

const Logout = () => {
  const { setUser } = useContext(Context);

  useEffect(() => {
    // TODO Ska ta bort token från backend samt visa nån form av loading
    setUser('');
    return () => redirect('/');
  }, [setUser]);

  return <div>Du loggas nu ut...</div>;
};

export default Logout;
