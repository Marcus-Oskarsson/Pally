import { Link } from 'react-router-dom';

import Logo from './icons/Logo';

import '../styles/footer.scss';

const Footer = () => {
  return (
    <footer className='page-footer'>
      <div className='logo-container'>
        <Link to='/'>
          <Logo width={32} height={32} />
        </Link>
        <span>© 2023 Pally</span>
      </div>
      <div className='link-container'>
        <nav className='footer-nav'>
          <ul>
            <li>
              {/* TODO Lägg till korrekta länkar */}
              <Link to='#'>Privacy</Link>
            </li>
            <li>
              {/* TODO Lägg till korrekta länkar */}
              <Link to='#'>Terms and conditions</Link>
            </li>
          </ul>
        </nav>
        <div className='footer-other-links'>
          <ul>
            <li>Annan länk</li>
            <li>Annan länk</li>
            <li>
              {/* TODO Lägg till korrekta länkar */}
              <Link to='/privacy'>Privacy policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
