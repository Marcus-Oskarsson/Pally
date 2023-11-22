import { useState, useEffect } from 'react';
import '../styles/home.scss';
import { useContext } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Context } from '../contexts/UserContext';
import { Carousel } from 'react-responsive-carousel';

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
        {friendInfo.slice(0, 6).map((friends) => (
          <div key={friends.friendid} className='friend-box'>
            <div className='friend-round-border'>
              <img
                className='picture'
                src={friends.userimgurl}
                alt={friends.firstname}
              />
            </div>
            <div className='friend-name'>{friends.firstname}</div>
          </div>
        ))}
      </div>

      {/*Active Events */}
      <div className='event-main'>
        <div className='active-events-container'>
          <h2 className='active-event-title'>Active Events</h2>
          {eventInfo.length > 0 ? (
            <Carousel
              showArrows={true}
              infiniteLoop={true}
              autoPlay={true}
              interval={3000}
            >
              {eventInfo.map((event) => (
                <div key={'eventInfo-' + event.eventid} className='box'>
                  <img
                    className='picture-one'
                    src={event.eventimage}
                    alt='Event'
                  />
                  <div className='event-name'>
                    <div>{event.eventname}</div>
                  </div>
                </div>
              ))}
            </Carousel>
          ) : (
            <div className='no-active-events'>No active events</div>
          )}
        </div>

        {/*Upcoming Events */}
        <div className='active-events-container'>
          <h3 className='upcoming-event-title'>Upcoming Events</h3>
          <p className='event-description'>
            Discover exciting events and create memorable experiences.
          </p>
          {eventUpcoming.length > 0 ? (
            <Carousel
              showArrows={true}
              infiniteLoop={true}
              autoPlay={true}
              interval={3000}
            >
              {eventUpcoming.map((event) => (
                <div key={'eventUpcoming-' + event.eventid} className='box'>
                  <img
                    className='picture-one'
                    src={event.eventimage}
                    alt='Event'
                  />
                  <div className='event-name'>{event.eventname}</div>
                </div>
              ))}
            </Carousel>
          ) : (
            <div className='no-upcoming-events'>No upcoming events</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
