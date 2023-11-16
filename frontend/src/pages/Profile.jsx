import { useState } from 'react';

import ProfileInfo from '../components/ProfileInfo';
import ProfileSettings from '../components/ProfileSettings';

const Profile = () => {
  const [toggleProfileSetting, setToggleProfileSettings] = useState(false);
  return (
    <>
      {toggleProfileSetting ? <ProfileSettings /> : <ProfileInfo />}
      <div className='button-container'>
        <button onClick={() => setToggleProfileSettings(!toggleProfileSetting)}>
          {toggleProfileSetting ? 'Profile info' : 'Profile settings'}
        </button>
      </div>
    </>
  );
};

export default Profile;
