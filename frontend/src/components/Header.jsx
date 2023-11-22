import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Context } from '../contexts/UserContext';

// import Logo from './icons/Logo';
import { Confetti } from './icons/Confetti';
import Hamburger from './Hamburger';
import Navbar from './Navbar';
import NavbarLoggedIn from './NavbarLoggedIn';

import '../styles/header.scss';

const ProfileImage = () => {
  const { user } = useContext(Context);
  console.log('user', user);

  return (
    <NavLink className='profile-image-container' to='/profile'>
      <img
        className='profile-image'
        src={user?.userimgurl ?? ''}
        alt='Profile'
      />
    </NavLink>
  );
};

const Header = () => {
  const { isAuthenticated } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  console.log('isAuthenticated', isAuthenticated);

  return (
    <header className='header'>
      <NavLink className='logo' to='/'>
        <Confetti />
      </NavLink>
      {isAuthenticated && <ProfileImage />}
      {isAuthenticated ? (
        <NavbarLoggedIn isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Header;
