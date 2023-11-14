import { useState } from 'react';
import { SearchFriends } from '../components/SearchFriends';
import { UserFriends } from '../components/UserFriends';
const Friends = () => {
  const [toggleSearch, setToggleSearch] = useState(false);
  return (
    <>
      <div>Friends</div>
      {toggleSearch ? <SearchFriends /> : <UserFriends />}

      <button onClick={() => setToggleSearch(!toggleSearch)}>
        {toggleSearch ? 'Your friends' : 'Find new friends'}
      </button>
    </>
  );
};

export default Friends;
