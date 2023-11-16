import { useState, useEffect } from 'react';
import '../styles/event.scss';
import EventImage from '../assets/pallyLogo.png';

const UpcomingEvents = () => {
  const [eventsArray, setEventsArray] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then((response) => response.json())
      .then((data) => {
        setEventsArray(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

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
                  <button>Apply</button>
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
