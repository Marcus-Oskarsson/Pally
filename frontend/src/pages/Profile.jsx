import { useState } from 'react';

import ProfileInfo from '../components/ProfileInfo';
import ProfileSettings from '../components/ProfileSettings';

const Profile = () => {
  const [toggleProfileSetting, setToggleProfileSettings] = useState(false);
  return (
    <>
      <div className='settings-button'>
        {toggleProfileSetting ? <ProfileSettings /> : <ProfileInfo />}
        <div className='btn-container'>
          <button
            onClick={() => setToggleProfileSettings(!toggleProfileSetting)}
          >
            {toggleProfileSetting ? 'Profile info' : 'Profile settings'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
