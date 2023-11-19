import { useState, useEffect } from 'react';
import '../styles/event.scss';
import EventImage from '../assets/pallyLogo.png';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';

const UpcomingEvents = () => {
  const [eventsArray, setEventsArray] = useState([]);
  const [applicationsArray, setApplicationsArray] = useState([]);
  const { user } = useContext(Context);

  //Hämtar alla events
  useEffect(() => {
    fetch('/api/events')
      .then((response) => response.json())
      .then((data) => {
        setEventsArray(data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, [user.userid]);

  //Hanterar när man signar upp för ett event som användare
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
        fetchApplicationsArray();
      } else {
        console.error('Failed to apply to event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //Hämtar mellantabellen för user och signups.
  const fetchApplicationsArray = () => {
    fetch(`/api/eventsignup`)
      .then((response) => response.json())
      .then((data) => {
        setApplicationsArray(data);
      })
      .catch((error) => {
        console.error('Error fetching user applications:', error);
      });
  };

  useEffect(() => {
    fetchApplicationsArray();
  }, [user]);

  // Denna metod för att kontrollera om användaren redan sökt till ett event.
  const applicationApplied = (eventId) => {
    return applicationsArray.some(
      (application) =>
        application.userid === user.userid && application.eventid === eventId
    );
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
                <p>{new Date(event.eventdate).toLocaleDateString('sv-SE')}</p>
                <div className='icons-container'>
                  {applicationApplied(event.eventid) ? (
                    <p>Ansökt!</p>
                  ) : (
                    <button onClick={() => handleApply(event.eventid)}>
                      Apply
                    </button>
                  )}
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
