import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Proptypes from 'prop-types';

import '../styles/navbar.scss';

const NavbarLoggedIn = ({ setIsOpen, isOpen }) => {
  let location = useLocation();
  let pages = [
    { name: 'Home', path: '', restricted: true },
    { name: 'Event', path: 'event', restricted: true },
    { name: 'Friends', path: 'friends', restricted: true },
    { name: 'Profile', path: 'profile', restricted: true },
    { name: 'About', path: 'about', restricted: false },
    { name: 'Logout', path: 'logout', restricted: false },
  ];
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

NavbarLoggedIn.propTypes = {
  isOpen: Proptypes.bool.isRequired,
  setIsOpen: Proptypes.func.isRequired,
};

export default NavbarLoggedIn;
