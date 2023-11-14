import '../styles/home.scss';

const Home = () => {
  return (
    <>
      <div className='ProfileMainContainer'>
        <h2 className='Title'>Active Event</h2>

        <div className='BoxContainer'>
          <div className='Box'>Bar</div>
          <div className='Box'>Sport</div>
          <div className='Box'>Restaurant</div>
          <div className='Box'>Activities</div>
        </div>
        <h2 className='Title'>Upcoming Event</h2>

        <div className='BoxContainer'>
          <div className='Box'>Bar</div>
          <div className='Box'>Sport</div>
          <div className='Box'>Restaurant</div>
          <div className='Box'>Activities</div>
        </div>
      </div>
    </>
  );
};

export default Home;
