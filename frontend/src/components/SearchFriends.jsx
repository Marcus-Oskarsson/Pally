import SearchIcon from '../assets/search.png';
import FriendImage from '../assets/pallyLogo.png';
import AddFriendIcon from '../assets/PersonPlus.png';
export const SearchFriends = () => {
  const friendsArray = [
    {
      id: 1,
      firstName: 'Resultat 1',
    },
    {
      id: 2,
      firstName: 'Resultat 2',
    },
    {
      id: 3,
      firstName: 'Resultat 3',
    },
    {
      id: 4,
      firstName: 'Resultat 4',
    },
  ];

  return (
    <>
      <div className='main-friends-container'>
        <h2>Find new friends</h2>
        <div className='search-friends-container'>
          <input type='text' />
          <img src={SearchIcon} alt='' />
        </div>
        {friendsArray.map((friends) => (
          <div key={friends.id} className='result-friends-container'>
            <div className='result-friends'>
              <img src={FriendImage} alt='friend image' />
              <p>{friends.firstName}</p>
            </div>
            <img src={AddFriendIcon} alt='add friend image' />
          </div>
        ))}
      </div>
    </>
  );
};
