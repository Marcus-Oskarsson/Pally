import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileInfo from '../components/ProfileInfo';
import ProfileSettings from '../components/ProfileSettings';

const Profile = () => {
  const [toggleProfileSetting, setToggleProfileSettings] = useState(false);
  const { id } = useParams();
  return (
    <>
      <div className='settings-button'>
        {toggleProfileSetting ? <ProfileSettings /> : <ProfileInfo />}
        <div className='btn-container'>
          {!isNaN(id) ? null : (
            <button
              onClick={() => setToggleProfileSettings(!toggleProfileSetting)}
            >
              {toggleProfileSetting ? 'Profile info' : 'Profile settings'}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
