import '../styles/profile.scss';
import pallyLogo from '../assets/pallyLogo.png';
import profileIcon from '../assets/profileIcon.png';
import profileSettings from '../assets/profileSettings.png';

const ProfileInfo = () => {
  return (
    <>
      <div className='main-container'>
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
          <button>
            <p>Active events</p>
          </button>
          <button>
            <p>Upcoming events</p>
          </button>
          <button>
            <p>Friends</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
