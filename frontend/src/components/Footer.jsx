import { Link } from 'react-router-dom';
import '../styles/footer.scss';
import { House } from '../components/icons/House';
import { Friends } from '../components/icons/Friends';
import { Calender } from './icons/Calender';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';

const Footer = () => {
  const { isAuthenticated } = useContext(Context);

  return (
    <>
      {isAuthenticated && (
        <div className='footerContainer'>
          <ul>
            <li>
              <Link to='/'>
                <House />
              </Link>
            </li>
            <li>
              <Link to='/event'>
                <Calender />
              </Link>
            </li>
            <li>
              <Link to='/friends'>
                <Friends />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Footer;
