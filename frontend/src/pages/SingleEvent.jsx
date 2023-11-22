import { useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSwipeable } from 'react-swipeable';

import Error from './Error';

import { Context } from '../contexts/UserContext';
import '../styles/SingleEvent.scss';

const Loading = () => {
  return <p>Loading...</p>;
};

const Participants = ({ participants }) => {
  return (
    <div className='participants-container'>
      <h2>Deltagare</h2>
      <ul className='participant-content-container'>
        {participants.map((participant) => (
          <li key={participant.userid}>
            <img src={participant.userimgurl} alt={participant.username} />
            <Link to={`/profile/${participant.userid}`}>
              {participant.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const InviteUserModal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(Context);

  async function getFriends() {
    console.log('searchTerm', searchTerm);
    const response = await fetch(
      `/api/friends/search/${user.userid}?search=${searchTerm}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

  function handleSearch(e) {
    console.log('handle search', e.target.value);
    setSearchTerm(e.target.value);
  }

  // fetch users friends
  const query = useQuery({
    queryKey: ['friends', user.userid, searchTerm],
    queryFn: getFriends,
  });

  console.log('friends', query);

  return createPortal(
    <div className='invite-user-modal'>
      <label>Sök bland vänner</label>
      <input
        onChange={handleSearch}
        type='text'
        name='invite-user'
        id='invite-user'
      />

      {query.isLoading ? (
        <Loading />
      ) : query.isSuccess ? (
        <>
          <div className='invite-user-list'>
            <ul>
              {query.data.map((friend) => (
                <li key={friend.userid}>
                  <img
                    src={friend.userimgurl}
                    alt={friend.firstname + friend.firstname}
                  />
                  <Link to={`/profile/${friend.userid}`}>
                    {friend.firstname}
                  </Link>
                  <input type='radio' name='' id='' />
                </li>
              ))}
            </ul>
          </div>
          <button type='button'>Bjud in</button>
        </>
      ) : (
        <Error />
      )}
    </div>,
    document.body
  );
};

const SingleEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const wrapper = useRef(null);

  function animateEventLeft() {
    wrapper.current.classList.remove('animate-next');
    navigate(`/event/${query.data.event.nexteventid}`);
  }

  function animateEventRight() {
    wrapper.current.classList.remove('animate-prev');
    navigate(`/event/${query.data.event.previouseventid}`);
  }

  function nextEvent() {
    if (query?.data?.event?.nexteventid) {
      // Först animera bort nuvarande event, sen navigera till nästa event
      wrapper.current.classList.add('animate-next');
      wrapper.current.addEventListener(
        'animationend',
        () => animateEventLeft(),
        {
          once: true,
        }
      );
    }
  }

  function previousEvent() {
    if (query?.data?.event?.previouseventid) {
      wrapper.current.classList.add('animate-prev');
      wrapper.current.addEventListener(
        'animationend',
        () => animateEventRight(),
        {
          once: true,
        }
      );
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => nextEvent(),
    onSwipedRight: () => previousEvent(),
  });

  async function getEvent({ queryKey }) {
    const response = await fetch(`/api/events/participants/${queryKey[1]}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

  const query = useQuery({
    queryKey: ['event', eventId],
    queryFn: getEvent,
  });

  console.log(query);

  return (
    <div {...handlers} className='single-event'>
      {query.isLoading ? (
        <Loading />
      ) : query.isSuccess ? (
        <div className='event-wrapper' ref={wrapper}>
          <div className='event-info-container'>
            <h1>{query.data.event.eventname}</h1>
            <img
              src={query.data.event.eventimage}
              alt={query.data.event.eventname}
            />
            <time
              dateTime={new Date(query.data.event.eventdate).toLocaleDateString(
                'sv-SE'
              )}
            >
              {new Date(query.data.event.eventdate).toLocaleDateString('sv-SE')}
            </time>
            <Link
              className='event-creator'
              to={`/profile/${query.data.event.eventcreator}`}
            >
              Arrangör: {query.data.event.eventcreatorname}
            </Link>
            {query.data.event.previouseventid && (
              <button
                className='event-prev-link'
                title='Previous event'
                onClick={previousEvent}
              >
                Föregående
              </button>
            )}
            {query.data.event.nexteventid && (
              <button
                className='event-next-link'
                title='Next event'
                onClick={nextEvent}
              >
                Nästa
              </button>
            )}
          </div>
          <div className='event-participants-container'>
            <Participants participants={query.data.participants} />
          </div>
          <InviteUserModal />
        </div>
      ) : (
        <div>Error</div>
      )}
      <div></div>
    </div>
  );
};

export default SingleEvent;
