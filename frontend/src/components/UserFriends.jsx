import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';
import DeleteFriend from '../assets/deleteFriend.svg';
import { Modal } from './modal';

export const UserFriends = () => {
  const [friendsList, setFriendsList] = useState([]);
  const { user } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const [friendId, setFriendId] = useState('');
  const { id } = useParams();

  console.log(user, 'user');
  console.log(user.userid), 'userid';

  useEffect(() => {
    const userId = id || user.userid;
    fetch(`/api/friends/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setFriendsList(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('failed', error);
      });
  }, [id, user.userid]);

  const removeFriend = (friendId) => {
    console.log({ friendId });
    fetch(`/api/friends/${friendId}`, {
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
          <p>Are you sure you want to delete this friend?</p>
          <div className='button-container-modal'>
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
            <Link className='friends-link' to={`/profile/${friends.userid}`}>
              <div className='result-friends'>
                <img src={friends.userimgurl} alt='friend image' />
                <p>
                  {friends.firstname} {friends.lastname}
                </p>
              </div>
            </Link>
            {!isNaN(id) ? null : (
              <img
                className='delete-friend'
                src={DeleteFriend}
                alt='add friend image'
                onClick={() => {
                  setFriendId(friends.friendid);
                  setIsOpen(true);
                }}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};
