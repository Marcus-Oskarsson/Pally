import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSwipeable } from 'react-swipeable';

import Error from './Error';

import '../styles/SingleEvent.scss';

const Loading = () => {
  return <p>Loading...</p>;
};

const Participants = ({ participants }) => {
  return (
    <div className='participants-container'>
      <h2>Deltagare</h2>
      <ul>
        {participants.map((participant) => (
          <li key={participant.userid}>
            <a href={`/profile/${participant.userid}`}>
              {participant.username}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SingleEvent = () => {
  // const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handlers = useSwipeable({
    // Next event
    onSwipedLeft: () => {
      if (query?.data?.event?.nexteventid) {
        navigate(`/event/${query.data.event.nexteventid}`);
      }
    },
    // Previous event
    onSwipedRight: () => {
      if (query?.data?.event?.previouseventid) {
        navigate(`/event/${query.data.event.previouseventid}`);
      }
    },
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
        <div className='event-wrapper'>
          <div className='event-info-container'>
            <h1>{query.data.event.eventname}</h1>
            <img
              src={query.data.event.eventimage}
              alt={query.data.event.eventname}
            />
            <p>
              Arrangör{' '}
              <a href={`/profile/${query.data.event.eventcreator}`}>
                {query.data.event.eventcreatorname}
              </a>
            </p>
            {query.data.event.previouseventid && (
              <a href={query.data.event.previouseventid}>Föregående</a>
            )}
            {query.data.event.nexteventid && (
              <a href={query.data.event.nexteventid}>Nästa</a>
            )}
          </div>
          <div className='event-participants-container'>
            <Participants participants={query.data.participants} />
          </div>
        </div>
      ) : (
        <div>Error</div>
      )}
      <div></div>
    </div>
  );
};

export default SingleEvent;
