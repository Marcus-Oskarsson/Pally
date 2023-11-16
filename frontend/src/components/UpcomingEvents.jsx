import { useState, useEffect } from 'react';
import '../styles/event.scss';
import EventImage from '../assets/pallyLogo.png';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';

const UpcomingEvents = () => {
  const [eventsArray, setEventsArray] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    fetch('/api/events')
      .then((response) => response.json())
      .then((data) => {
        setEventsArray(data);
        console.log(user.userid);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, [user.userid]);

  const handleApply = async (eventId) => {
    try {
      const response = await fetch('/api/userevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.userid, eventId }),
      });

      if (response.ok) {
        console.log('Applied to event successfully');
      } else {
        console.error('Failed to apply to event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='main-container'>
      <div>
        <h2>Upcoming Events</h2>
        {eventsArray.map((event) => (
          <div key={event.eventid} className='events-container'>
            <img src={EventImage} alt='Event picture' />
            <div className='align-events'>
              <h3>{event.eventname}</h3>
              <p>{event.eventstreet}</p>
              <p>{event.eventemail}</p>
              <div>
                <p>{event.eventdate}</p>
                <div className='icons-container'>
                  <button onClick={() => handleApply(event.eventid)}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
