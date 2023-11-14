import { useState } from 'react';

import Navbar from './Navbar';
import Hamburger from './Hamburger';

import '../styles/header.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='header'>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Header;
