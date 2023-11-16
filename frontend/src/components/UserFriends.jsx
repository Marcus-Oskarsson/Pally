import { useEffect, useState } from 'react';
import FriendImage from '../assets/pallyLogo.png';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';

export const UserFriends = () => {
  const [friendsList, setFriendsList] = useState([]);
  const { user } = useContext(Context);

  console.log(user, 'user');
  console.log(user.userid), 'userid';
  useEffect(() => {
    fetch(`/api/friends/${user.userid}`)
      .then((response) => response.json())
      .then((data) => {
        setFriendsList(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('failed', error);
      });
  }, [user.userid]);

  console.log({ friendsList });
  return (
    <>
      <div className='main-friends-container'>
        <h2>Your Friends</h2>
        {friendsList.map((friends) => (
          <div key={friends.id} className='friends-container'>
            <img src={FriendImage} alt='friend image' />
            <p>
              {friends.firstname} {friends.lastname}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
