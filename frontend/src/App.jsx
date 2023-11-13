import { createHashRouter, Outlet, RouterProvider } from 'react-router-dom';

import Event from './pages/Event';
import Friends from './pages/Friends';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './styles/reset.scss';

function Root() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
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
