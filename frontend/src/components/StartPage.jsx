import { useState, useEffect } from 'react';
import '../styles/home.scss';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';

const Home = () => {
  const [eventInfo, setEventInfo] = useState([]);
  const [eventUpcoming, setEventUpcoming] = useState([]);
  const [friendInfo, setFriendInfo] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    fetch(`api/events/${user.userid}`)
      .then((response) => response.json())
      .then((data) => {
        setEventInfo(data);
        console.log('eventInfo', eventInfo);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching event:', error);
      });
  }, [user]);

  useEffect(() => {
    fetch('api/events/')
      .then((response) => response.json())
      .then((data) => {
        setEventUpcoming(data);
        console.log('eventUpcoming', data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching event:', error);
      });
  }, []);

  useEffect(() => {
    fetch(`api/friends/${user.userid}`)
      .then((response) => response.json())
      .then((data) => {
        setFriendInfo(data);
        console.log('friendInfo', data);
      })
      .catch((error) => {
        console.error('Error fetching friend:', error);
      });
  }, []);

  return (
    <div className='main-content'>
      <div className='friends-container'>
        {friendInfo.map((friends) => (
          <div key={friends.friendid} className='friend-box'>
            <div className='friend-round-border'>
              <img className='picture' src={friends.userimgurl} />
            </div>
            <div className='friend-name'>{friends.firstname}</div>
          </div>
        ))}
      </div>

      {/*Active Events */}
      <div className='event-main'>
        <div className='active-events-container'>
          <h2 className='active-event-title'>Active Events</h2>
          <div className='double-box-container'>
            {eventInfo.length > 0 ? (
              eventInfo.map((event) => (
                <div key={'eventInfo-' + event.eventid} className='box'>
                  <img
                    className='picture-one'
                    src={event.eventimage}
                    alt='Event'
                  />

                  <div className='event-name'>
                    <p>{event.eventname}</p>
                    <p>
                      {new Date(event.eventdate).toLocaleDateString('sv-SE')}
                    </p>
                    {/* <span>{event.eventstreet}</span> */}
                  </div>
                </div>
              ))
            ) : (
              <div className='no-active-events'>No active events</div>
            )}
          </div>
        </div>

        {/*Upcoming Events */}
        <h3 className='upcoming-event-title'>Upcoming Events</h3>
        <p className='event-description'>
          Discover exciting events and create memorable experiences.
        </p>
        <div className='double-box-container'>
          {eventUpcoming.map((event) => (
            <div key={'eventUpcoming-' + event.eventid} className='box'>
              <img className='picture-one' src={event.eventimage} alt='Event' />
              <div className='event-name'>
                <p>{event.eventname}</p>
                <p>{new Date(event.eventdate).toLocaleDateString('sv-SE')}</p>
                {/* <span>{event.eventstreet}</span> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
