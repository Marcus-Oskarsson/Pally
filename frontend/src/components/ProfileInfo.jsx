import { useState } from 'react';
import '../styles/profile.scss';
import pallyLogo from '../assets/pallyLogo.png';
import profileIcon from '../assets/profileIcon.png';
import profileSettings from '../assets/profileSettings.png';
import ProfileSettings from './ProfileSettings';

const ProfileInfo = () => {
  const [settings, setSettings] = useState(false);

  const handleSettingsClick = () => {
    setSettings(true);
  };

  const handleProfileInfoClick = () => {
    setSettings(false);
  };
  return (
    <div>
      {settings ? (
        <ProfileSettings />
      ) : (
        <>
          <div className='flex-container'>
            <div className='div-flex-right'>
              <img className='icons' src={profileSettings} alt='Settings' />
              <img className='icons' src={profileIcon} alt='Profile icon' />
            </div>

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
            <div className='icon-container'>
              <button className='button-toggle' onClick={handleSettingsClick}>
                <div className='div-flex-right'>
                  <img className='icons' src={profileSettings} alt='Settings' />
                </div>
              </button>
            </div>
          </div>
        </>
      )}
      {settings && (
        <div className='icon-container'>
          <button className='button-toggle' onClick={handleProfileInfoClick}>
            <div className='div-flex-right'>
              <img className='icons' src={profileIcon} alt='Profile icon' />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
