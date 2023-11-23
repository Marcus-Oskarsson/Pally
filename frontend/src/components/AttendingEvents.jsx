import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/event.scss';
import TrashIcon from '../assets/trashicon.png';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';
import { lazyWithPreload } from 'react-lazy-with-preload';
import NewEvent from './NewEvent';

const UpcomingEvents = lazyWithPreload(() => import('./UpcomingEvents'));
UpcomingEvents.preload();

const AttendingEvents = () => {
  const { user } = useContext(Context);
  const [userEvents, setUserEvents] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [showUpcomingEvents, setShowUpcomingEvents] = useState(false);
  const [showNewEvent, setShowNewEvent] = useState(false);

  const removeEventUser = async (eventid) => {
    try {
      const response = await fetch(`/api/events/${eventid}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Application removed successfully');
        setUpdateList(!updateList);
      } else {
        console.error('Failed to remove application');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await fetch(`/api/events/${user.userid}`);
        const data = await response.json();
        setUserEvents(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user && user.userid) {
      fetchUserEvents();
    }
  }, [user, updateList, showUpcomingEvents]);

  const handleExploreEventsClick = () => {
    setShowUpcomingEvents(true);
  };

  const handleAttendingEventsClick = () => {
    setShowUpcomingEvents(false);
  };

  const handleNewEventClick = () => {
    setShowNewEvent((prevState) => !prevState); // Visa NewEvent-komponenten när knappen klickas
  };

  return (
    <div>
      {showUpcomingEvents ? (
        <UpcomingEvents />
      ) : (
        <>
          <div className='main-container'>
            <h2>Attending Events</h2>
            {userEvents &&
              userEvents.map((event, index) => (
                <Link
                  to={`/event/${event.eventid}`}
                  key={index}
                  className='events-container'
                >
                  <img
                    id='event-image'
                    src={event.eventimage}
                    alt='Event picture'
                  />
                  <div className='align-events'>
                    <h3>{event.eventname}</h3>
                    <p>{event.eventstreet}</p>
                    <p>{event.eventemail}</p>
                    <div>
                      <p>
                        {new Date(event.eventdate).toLocaleDateString('sv-SE')}
                      </p>
                      <div className='icons-container'>
                        <img
                          src={TrashIcon}
                          alt='Trash icon'
                          onClick={() => removeEventUser(event.eventid)}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            <div className='btn-container'>
              <button onClick={handleExploreEventsClick}>Explore Events</button>
            </div>
            <div className='btn-container'>
              <button onClick={handleNewEventClick}>
                {showNewEvent ? 'Close' : 'Submit New Event'}
              </button>
            </div>
            {}
            {showNewEvent && <NewEvent />}
          </div>
        </>
      )}
      {showUpcomingEvents && (
        <div className='btn-container'>
          <button onClick={handleAttendingEventsClick}>Attending Events</button>
        </div>
      )}
    </div>
  );
};

export default AttendingEvents;
