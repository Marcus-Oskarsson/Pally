import { useEffect, useState } from 'react';
import FriendImage from '../assets/pallyLogo.png';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';
import DeleteFriend from '../assets/PersonX.png';
import { Modal } from './modal';

export const UserFriends = () => {
  const [friendsList, setFriendsList] = useState([]);
  const { user } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const [friendId, setFriendId] = useState('');

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

  const removeFriend = (friendId) => {
    console.log({ friendId });
    fetch(`/api/friends/remove/${friendId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFriendsList(
          friendsList.filter((friend) => friend.friendid !== friendId)
        );
      })
      .catch((error) => {
        console.error('failed', error);
      });
  };

  console.log({ friendsList });
  return (
    <>
      <Modal open={isOpen} closeModal={() => setIsOpen(false)}>
        <div>
          <p>You sure you want to delite this frriend?</p>
          <div className='button-container'>
            <button
              onClick={() => {
                removeFriend(friendId);
                setIsOpen(false);
              }}
            >
              Yes
            </button>
            <button onClick={() => setIsOpen(false)}>No</button>
          </div>
        </div>
      </Modal>
      <div className='main-friends-container'>
        <h2>Your Friends</h2>
        {friendsList.map((friends) => (
          <div key={friends.friendid} className='friends-container'>
            <div className='result-friends'>
              <img src={FriendImage} alt='friend image' />
              <p>
                {friends.firstname} {friends.lastname}
              </p>
            </div>
            <img
              className='delete-friend'
              src={DeleteFriend}
              alt='add friend image'
              onClick={() => {
                setFriendId(friends.friendid);
                setIsOpen(true);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};
