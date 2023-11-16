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
        setProfileUserInfo(data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  useEffect(() => {
    fetch('/api/profile')
      .then((response) => response.json())
      .then((data) => {
        console.log('Data received:', data);
        setProfileUserInfo(data);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, []);

  return (
    <>
      <div className='flex-container'>
        <div className='div-column'>
          <h1>Profile</h1>
          <img className='profile-picture' src={pallyLogo} alt='Logo' />
        </div>
        {profileUserInfo.map((user) => (
          <div key={user.userid}>
            <div>
              <p>{user.userfirstname}</p>
              <p>{user.lastname}</p>
            </div>
          </div>
        ))}

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
