import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';
import '../styles/profile.scss';
import pallyLogo from '../assets/pallyLogo.png';

const ProfileInfo = () => {
  const [profileUserInfo, setProfileUserInfo] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    fetch(`/api/profile/${user.userid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'here is the data');
        console.log(data.user);
        //gets first user
        setProfileUserInfo(data.user);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, [user.userid]);

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
