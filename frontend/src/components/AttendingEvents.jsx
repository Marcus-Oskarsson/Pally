import { useState, useEffect } from 'react';
import '../styles/event.scss';
import UpcomingEvents from './UpcomingEvents';
import EventImage from '../assets/pallyLogo.png';
import TrashIcon from '../assets/trashicon.png';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';

const AttendingEvents = () => {
  const { user } = useContext(Context);
  const [userEvents, setUserEvents] = useState(null);

  const removeEventUser = async (eventid) => {
    try {
      const response = await fetch(`/api/events/${eventid}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Application removed successfully');
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
  }, [user, removeEventUser]);

  const [showUpcomingEvents, setShowUpcomingEvents] = useState(false);

  const handleExploreEventsClick = () => {
    setShowUpcomingEvents(true);
  };

  const handleAttendingEventsClick = () => {
    setShowUpcomingEvents(false);
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
                <div key={index} className='events-container'>
                  <img src={EventImage} alt='Event picture' />
                  <div className='align-events'>
                    <h3>{event.eventname}</h3>
                    <p>{event.eventstreet}</p>
                    <p>{event.eventemail}</p>
                    <div>
                      <p>{event.eventdate}</p>
                      <div className='icons-container'>
                        <img
                          src={TrashIcon}
                          alt='Trash icon'
                          onClick={() => removeEventUser(event.eventid)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <div className='button-container'>
              <button onClick={handleExploreEventsClick}>Explore Events</button>
            </div>
          </div>
        </>
      )}
      {showUpcomingEvents && (
        <div className='button-container'>
          <button onClick={handleAttendingEventsClick}>Attending Events</button>
        </div>
      )}
    </div>
  );
};

export default AttendingEvents;
