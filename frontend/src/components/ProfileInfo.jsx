import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';
import '../styles/profile.scss';
import pallyLogo from '../assets/pallyLogo.png';

const ProfileInfo = () => {
  const { user } = useContext(Context);

  return (
    <>
      <div className='flex-container'>
        <div className='div-column'>
          <img className='profile-picture' src={pallyLogo} alt='Logo' />
        </div>
        <div key={user.userid}>
          <div>
            <p>{user.userfirstname}</p>
            <p>{user.userlastname}</p>
          </div>
        </div>
        <div className='button-container'>
          <Link to='/event'>
            <button className='button-choices'>
              <p>Attending events</p>
            </button>
          </Link>
          <Link to='/friends'>
            <button className='button-choices'>
              <p>Friends</p>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
