import { useState } from 'react';
import { SearchFriends } from '../components/searchFriends';
import { UserFriends } from '../components/UserFriends';
import '../styles/friends.scss';
const Friends = () => {
  const [toggleSearch, setToggleSearch] = useState(false);
  return (
    <>
      {toggleSearch ? <SearchFriends /> : <UserFriends />}
      <div className='button-container'>
        <button onClick={() => setToggleSearch(!toggleSearch)}>
          {toggleSearch ? 'Your friends' : 'Find new friends'}
        </button>
      </div>
    </>
  );
};

export default Friends;
