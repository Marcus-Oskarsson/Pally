import { useContext, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Proptypes from 'prop-types';

import { Context } from '../contexts/UserContext';

import '../styles/navbar.scss';

// En fantastiskt orimlig lösning på ett icke-problem men vill ha aktiva sidan först!
const Navbar = ({ setIsOpen, isOpen }) => {
  const { isAuthenticated } = useContext(Context);
  let location = useLocation();
  const pages = [
    { name: 'Home', path: '' },
    { name: 'Event', path: 'event' },
    { name: 'Friends', path: 'friends' },
    { name: 'Login', path: 'login' },
    { name: 'Profile', path: 'profile' },
  ].map((page) => {
    if (page.name === 'Login' && isAuthenticated) {
      return { name: 'Logout', path: 'logout' };
    } else if (!isAuthenticated && page.name !== 'Login') {
      return { name: page.name + '🔒', path: 'login' };
    }
    return page;
  });

  useEffect(
    function hiddenOverflowWhenOpen() {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    },
    [isOpen]
  );

  useEffect(
    function closeMenuWhenRouteChanges() {
      setIsOpen(false);
    },
    [location, setIsOpen]
  );

  if (!isOpen) return null;

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <ul>
        {pages.map((page) => (
          <li key={page.name}>
            <NavLink to={`/${page.path.toLowerCase()}`}>{page.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  isOpen: Proptypes.bool.isRequired,
  setIsOpen: Proptypes.func.isRequired,
};

export default Navbar;
