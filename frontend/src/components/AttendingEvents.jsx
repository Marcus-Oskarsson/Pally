import { useState, useEffect } from 'react';
import '../styles/event.scss';
import UpcomingEvents from './UpcomingEvents';
import EventImage from '../assets/pallyLogo.png';
import TrashIcon from '../assets/trashicon.png';

const AttendingEvents = () => {
  const [applyFetch, setFetch] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        const data = await response.json();
        setFetch(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [showUpcomingEvents, setShowUpcomingEvents] = useState(false);

  const handleExploreEventsClick = () => {
    setShowUpcomingEvents(true);
  };

  const handleAttendingEventsClick = () => {
    setShowUpcomingEvents(false);
  };

  //Exempel istället för databas som vi hämtar senare via api
  const eventsArray = [
    {
      id: 1,
      name: 'AW Ölstugan Tullen',
      location: 'Friggagatan 27',
      email: 'info@tullen.se',
      date: '01-01-2023',
    },
    {
      id: 2,
      name: 'AW Ölstugan Tullen 2',
      location: 'Friggagatan 27 2',
      email: 'info@tullen.se',
      date: '02-02-2023',
    },
  ];

  return (
    <div>
      {showUpcomingEvents ? (
        <UpcomingEvents />
      ) : (
        <>
          <div className='main-container'>
            <h2>Attending Events</h2>
            {eventsArray.map((event) => (
              <div key={event.id} className='events-container'>
                <img src={EventImage} alt='Event picutre' />
                <div className='align-events'>
                  <h3>{event.name}</h3>
                  <p>{event.location}</p>
                  <p>{event.email}</p>
                  <div>
                    <p>{event.date}</p>
                    <div className='icons-container'>
                      <img src={TrashIcon} alt='Trash icon' />
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
      <div>
        <pre>{JSON.stringify(applyFetch, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AttendingEvents;
