import { createHashRouter, Outlet, RouterProvider } from 'react-router-dom';

import UserProvider from './contexts/UserContext';

import Event from './pages/Event';
import Friends from './pages/Friends';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

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
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: '/' },
        { element: <Login />, path: '/login' },
        { element: <Event />, path: '/event' },
        { element: <Profile />, path: '/profile' },
        { element: <Friends />, path: '/friends' },
      ],
      element: <Root />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
