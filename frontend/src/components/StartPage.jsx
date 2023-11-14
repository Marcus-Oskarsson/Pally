import '../styles/home.scss';

const Home = () => {
  return (
    <div className='ProfileMainContainer'>
      {/*Friends */}
      <div className='FriendsContainer'>
        <div className='FriendBox'>
          <div className='FriendRoundBorder'></div>
          <h3 className='FriendName'>vän1</h3>
        </div>
        <div className='FriendBox'>
          <div className='FriendRoundBorder'></div>
          <h3 className='FriendName'>vän2</h3>
        </div>
        <div className='FriendBox'>
          <div className='FriendRoundBorder'></div>
          <h3 className='FriendName'>vän3</h3>
        </div>
        <div className='FriendBox'>
          <div className='FriendRoundBorder'></div>
          <h3 className='FriendName'>vän4</h3>
        </div>
        <div className='FriendBox'>
          <div className='FriendRoundBorder'></div>
          <h3 className='FriendName'>vän5</h3>
        </div>
      </div>
      {/*Active Events */}
      <h2 className='Title'>Active Events</h2>

      <div className='BoxContainerActive'>
        <div className='BoxWithTitles'>
          <div className='Box'>Bar</div>
          <div className='TitleDate'>
            <h3>Event Name</h3>
            <span>EventDate</span>
          </div>
          <h3 className='EventPlace'>Event Place</h3>
        </div>

        <div className='BoxWithTitles'>
          <div className='Box'>Bar</div>
          <div className='TitleDate'>
            <h3>Event Name</h3>
            <span>EventDate</span>
          </div>
          <h4 className='EventPlace'>Event Place</h4>
        </div>

        <div className='BoxWithTitles'>
          <div className='Box'>Restaurant</div>
          <div className='TitleDate'>
            <h3>Event Name</h3>
            <span>EventDate</span>
          </div>
          <h4 className='EventPlace'>Event Place</h4>
        </div>

        <div className='BoxWithTitles'>
          <div className='Box'>Activities</div>
          <div className='TitleDate'>
            <h3>Event Name</h3>
            <span>EventDate</span>
          </div>
          <h4 className='EventPlace'>Event Place</h4>
        </div>
      </div>
      {/*Upcoming Events */}
      <h2 className='Title'>Upcoming Events</h2>

      <div className='BoxContainerUpcoming'>
        <div className='Box'>Bar</div>
        <div className='Box'>Sport</div>
        <div className='Box'>Restaurant</div>
        <div className='Box'>Activities</div>
      </div>
    </div>
  );
};

export default Home;
