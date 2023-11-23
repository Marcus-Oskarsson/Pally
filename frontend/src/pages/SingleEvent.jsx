import { useRef, useContext, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSwipeable } from 'react-swipeable';

import Error from './Error';
import EventParticipants from '../components/EventParticipants';
import EventInviteModal from '../components/EventInviteModal';
import Loading from '../components/Loading';

import { Context } from '../contexts/UserContext';
import '../styles/SingleEvent.scss';

const SingleEvent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const wrapper = useRef(null);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

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
            <EventParticipants
              participants={query.data.participants.filter(
                (participant) => participant.userid !== user.userid
              )}
            />
          </div>
          <button className='btn' onClick={openModal}>
            Invite friends
          </button>
          {modalIsOpen && (
            <EventInviteModal
              participants={query.data.participants}
              closeModal={closeModal}
            />
          )}
        </div>
      ) : (
        <div>Error</div>
      )}
      <div></div>
    </div>
  );
};

export default SingleEvent;
