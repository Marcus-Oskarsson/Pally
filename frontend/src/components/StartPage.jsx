import { useState, useEffect } from 'react';
import '../styles/home.scss';

const Home = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);

  useEffect(() => {
    fetch('api/users')
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  useEffect(() => {
    fetch('api/events')
      .then((response) => response.json())
      .then((data) => {
        setEventInfo(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching event:', error);
      });
  }, []);

  return (
    <div className='ProfileMainContainer'>
      <div className='FriendsContainer'>
        {userInfo.map((user) => (
          <div key={user.userId} className='FriendBox'>
            <div className='FriendRoundBorder'></div>
            <h3 className='FriendName'>
              {user.userfirstname} {user.userlastname}
            </h3>
          </div>
        ))}
      </div>
      {/*Active Events */}
      <h2 className='Title'>Active Events</h2>

      <div className='BoxContainerActive'>
        {eventInfo.map((event) => (
          <div key={event.eventId} className='BoxWithTitles'>
            <div className='Box'>{event.eventname}</div>
            <div className='TitleDate'>
              <h3 className='EventPlace'>{event.eventstreet}</h3>
              <span>{event.eventdate}</span>
            </div>
          </div>
        ))}
        {/* <div className='BoxWithTitles'>
          <div className='Box'>Bars</div>
          <div className='TitleDate'>
            <h3>Event Name</h3>
            <span>EventDate</span>
          </div>
          <h4 className='EventPlace'>Event Place</h4>
        </div> */}

        {/* <div className='BoxWithTitles'>
          <div className='Box'>Restaurant</div>
          <div className='TitleDate'>
            <h3>Event Name</h3>
            <span>EventDate</span>
          </div>
          <h4 className='EventPlace'>Event Place</h4>
        </div> */}

        {/* <div className='BoxWithTitles'>
          <div className='Box'>Activities</div>
          <div className='TitleDate'>
            <h3>Event Name</h3>
            <span>EventDate</span>
          </div>
          <h4 className='EventPlace'>Event Place</h4>
        </div> */}
      </div>
      {/*Upcoming Events */}
      <h2 className='Title'>Upcoming Events</h2>

      <div className='BoxContainerUpcoming'>
        <div className='Box'>Bars</div>
        <div className='Box'>Sport</div>
        <div className='Box'>Restaurant</div>
        <div className='Box'>Activities</div>
      </div>
    </div>
  );
};

export default Home;
