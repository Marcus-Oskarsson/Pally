import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';
import '../styles/profile.scss';

const ProfileInfo = () => {
  const [profileUserInfo, setProfileUserInfo] = useState([]);
  const { user } = useContext(Context);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const userId = id || user.userid;
    fetch(`/api/profile/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'here is the data');
        setProfileUserInfo(data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [id, user.userid]);

  return (
    <>
      <div className='flex-container'>
        {profileUserInfo.map((user) => (
          <>
            <div className='div-column' key={user.userid}>
              <img
                className='profile-picture'
                src={user?.userimgurl ?? ''}
                alt='Profile'
              />
            </div>
            <div>
              <div className='flex-row'>
                <p>{user.userfirstname}</p>
                <p>{user.userlastname}</p>
              </div>
            </div>
          </>
        ))}
        <div className='events-container'>
          <div className='btn-container button-column'>
            {!isNaN(id) ? null : (
              <Link to='/event'>
                <button className='button-choices'>
                  <p>Attending events</p>
                </button>
              </Link>
            )}
            <Link to={`/friends/${id || user.userid}`}>
              <button className='button-choices'>
                <p>Friends</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
