import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import UserProvider from './contexts/UserContext';

import Error from './pages/Error';
import Event from './pages/Event';
import Friends from './pages/Friends';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import PrivateRoutes from './components/PrivateRoutes';
import Profile from './pages/Profile';
import Privacy from './pages/Privacy';

import Footer from './components/Footer';
import Header from './components/Header';

import './styles/reset.scss';

function Root() {
  return (
    <UserProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </UserProvider>
  );
}

const App = () => {
  const router = createBrowserRouter([
    {
      children: [
        {
          element: <PrivateRoutes />,
          children: [
            { element: <Profile />, path: '/profile/:id?' },
            { element: <Friends />, path: '/friends/:id?' },
            { element: <Home />, path: '/' },
            { element: <Logout />, path: '/logout' },
          ],
        },
        { element: <Event />, path: '/event' },
        { element: <Login />, path: '/login' },
        { element: <Error />, path: '*' },
        { element: <Privacy />, path: '/privacy' },
      ],
      element: <Root />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
