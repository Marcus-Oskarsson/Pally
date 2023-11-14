import '../styles/event.scss';
import EventImage from '../assets/pallyLogo.png';

const UpcomingEvents = () => {
  const eventsArray = [
    {
      id: 1,
      name: 'AW Ölstugan Tullen 3',
      location: 'Friggagatan 27',
      email: 'info@tullen.se',
      date: '01-01-2023',
    },
    {
      id: 2,
      name: 'AW Ölstugan Tullen 4',
      location: 'Friggagatan 27 2',
      email: 'info@tullen.se',
      date: '02-02-2023',
    },
  ];

  return (
    <div className='main-container'>
      <div>
        <h2>Upcoming Events</h2>
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
