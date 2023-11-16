import { useState, useEffect } from 'react';
import '../styles/profile.scss';
import pallyLogo from '../assets/pallyLogo.png';

const ProfileInfo = () => {
  const [profileUserInfo, setProfileUserInfo] = useState([]);

  useEffect(() => {
    fetch('/api/profile')
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'here is the data');
        console.log(data[0].user);
        //gets first user
        setProfileUserInfo(data[0]);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <>
      <div className='flex-container'>
        <div className='div-column'>
          <img className='profile-picture' src={pallyLogo} alt='Logo' />
        </div>
        <div key={profileUserInfo.userid}>
          <div>
            <p>{profileUserInfo.userfirstname}</p>
            <p>{profileUserInfo.userlastname}</p>
          </div>
        </div>
        <div className='button-container'>
          <button className='button-choices'>
            <p>Active events</p>
          </button>
          <button className='button-choices'>
            <p>Upcoming events</p>
          </button>
          <button className='button-choices'>
            <p>Friends</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
