import FriendImage from '../assets/pallyLogo.png';
export const UserFriends = () => {
  const friendsArray = [
    {
      id: 1,
      firstName: 'Vän 1',
    },
    {
      id: 2,
      firstName: 'Vän 2',
    },
    {
      id: 3,
      firstName: 'Vän 3',
    },
    {
      id: 4,
      firstName: 'Vän 4',
    },
  ];
  return (
    <>
      <div className='main-friends-container'>
        <h2>Your Friends</h2>
        {friendsArray.map((friends) => (
          <div key={friends.id} className='friends-container'>
            <img src={FriendImage} alt='friend image' />
            <p>{friends.firstName}</p>
          </div>
        ))}
      </div>
    </>
  );
};
