import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Context } from '../contexts/UserContext';

import Logo from './icons/Logo';
import Hamburger from './Hamburger';
import Navbar from './Navbar';
import NavbarLoggedIn from './NavbarLoggedIn';

import '../styles/header.scss';

const ProfileImage = () => {
  const { user } = useContext(Context);

  return (
    <NavLink className='profile-image-container' to='/profile'>
      <img
        className='profile-image'
        src={
          user?.userImgUrl ??
          'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_960_720.png'
        }
        alt='Profile'
      />
    </NavLink>
  );
};

const Header = () => {
  const { isAuthenticated } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='header'>
      <NavLink className='logo' to='/'>
        <Logo width={30} height={30} />
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
