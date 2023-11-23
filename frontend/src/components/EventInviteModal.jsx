import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useQuery } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

import Error from '../pages/Error';
import SearchIcon from '../assets/search.png';

import Loading from './Loading';
import { Context } from '../contexts/UserContext';

const EventInviteModal = ({ closeModal, participants = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(Context);

  function alreadyAttending(friend) {
    const participantsIds = participants.map(
      (participant) => participant.userid
    );
    return !participantsIds.includes(friend.userid);
  }

  async function getFriends() {
    const response = await fetch(
      `/api/friends/myfriends/search/${user.userid}?search=${searchTerm}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  // fetch users friends
  const query = useQuery({
    queryKey: ['friends', user.userid, searchTerm],
    queryFn: getFriends,
  });

  function inviteUsers() {
    toast.success('Friends invited!', {
      autoClose: 2000,
      // onClose: () => closeModal(), // does not work
      toastId: 'invite-users',
    });

    setTimeout(() => {
      closeModal();
    }, 3000);
  }

  return createPortal(
    <div className='invite-user-modal'>
      <ToastContainer />
      <div className='search-friends-container'>
        <input
          onChange={handleSearch}
          type='text'
          name='invite-user'
          id='invite-user'
          placeholder='Search for friends'
        />
        <img src={SearchIcon} alt='' />
      </div>

      {query.isLoading ? (
        <Loading />
      ) : query.isSuccess ? (
        <>
          <div className='invite-user-container'>
            <button onClick={closeModal}>Close</button>
            <ul className='invite-user-list'>
              {query.data
                .filter((friend) => alreadyAttending(friend))
                .map((friend) => (
                  <li key={friend.userid} className='invite-user'>
                    <img
                      className='invite-user-img'
                      src={friend.userimgurl}
                      alt={friend.fullname}
                    />
                    <label htmlFor={`select-friend${friend.userid}`}>
                      {friend.fullname}
                    </label>
                    <input
                      type='checkbox'
                      name={`select-friend${friend.userid}`}
                      id={`select-friend${friend.userid}`}
                    />
                  </li>
                ))}
            </ul>
          </div>
          <button onClick={inviteUsers} className='btn' type='button'>
            Bjud in
          </button>
        </>
      ) : (
        <Error />
      )}
    </div>,
    document.body
  );
};

EventInviteModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  participants: PropTypes.array,
};

export default EventInviteModal;
