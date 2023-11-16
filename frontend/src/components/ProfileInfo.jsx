// import { useState } from 'react';
import '../styles/profile.scss';
import pallyLogo from '../assets/pallyLogo.png';

const ProfileInfo = () => {
  return (
    <>
      <div className='flex-container'>
        <div className='div-column'>
          <h1>Profile</h1>
          <img className='profile-picture' src={pallyLogo} alt='Logo' />
        </div>
        <div className='div-column'>
          <p>Name</p>
          <p>Last Name</p>
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
