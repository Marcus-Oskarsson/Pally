import { useState, useEffect } from 'react';
import '../styles/home.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';

const Home = () => {
  // const [userInfo, setUserInfo] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);
  const [friendInfo, setFriendInfo] = useState([]);
  // const [userEvent, setUserEvent] = useState([]);
  const { user } = useContext(Context);

  // useEffect(() => {
  //   console.log('user', user.userid);

  //   fetch('api/users/friend/${user.userid}')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUserInfo(data);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching users:', error);
  //     });
  // }, []);

  useEffect(() => {
    // console.log('user', user.userid);
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
  }, []);

  useEffect(() => {
    // console.log('user', user.userid);
    fetch(`api/friends/${user.userid}`)
      .then((response) => response.json())
      .then((data) => {
        setFriendInfo(data);
        console.log('friendInfo', friendInfo);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching friend:', error);
      });
  }, []);

  return (
    <div className='main-content'>
      <div className='friends-container'>
        {friendInfo.map((friends) => (
          <div key={friends.id} className='friend-box'>
            <div className='friend-round-border'></div>
            <div className='friend-name'>
              {friends.firstname} {friends.lastname}
            </div>
          </div>
        ))}
      </div>

      {/*Active Events */}
      <div className='event-main'>
        {/* <div className='BoxContainerActive'> */}
        <h2 className='active-event-title'>Active Events</h2>
        {eventInfo.length > 0 ? (
          eventInfo.map((event) => (
            <div key={event.eventId} className='titles'>
              <Link to={`/event/${event.eventId}`} className='box'>
                {event.eventname}
              </Link>
              {/* <div className='EventInfo'>
                <h3 className='EventPlace'>{event.eventstreet}</h3>
                <span>{event.eventdate}</span>
              </div> */}
            </div>
          ))
        ) : (
          <div className='no-active-events'>No active events</div>
        )}

        {/*Upcoming Events */}
        <h3 className='upcoming-event-title'>Upcoming Events</h3>
        <p className='event-description'>
          Discover exciting events and create memorable experiences.
        </p>

        {/* <div className='BoxContainerUpcoming'> */}
        <Link to='/event'>
          <div className='box'>Events</div>
          {/* <div className='Box'>Sport</div>
            <div className='Box'>Restaurant</div>
            <div className='Box'>Activities</div> */}
        </Link>
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Home;
