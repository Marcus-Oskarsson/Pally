import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
import SingleEvent from './pages/SingleEvent';

import Footer from './components/Footer';
import Header from './components/Header';

import './styles/reset.scss';

function Root() {
  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </QueryClientProvider>
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
            { element: <Privacy />, path: '/privacy' },
            { element: <Event />, path: '/event' },
            { element: <SingleEvent />, path: '/event/:eventId' },
          ],
        },
        { element: <Login />, path: '/login' },
        { element: <Privacy />, path: '/privacy' },
        { element: <Error />, path: '*' },
      ],
      element: <Root />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
