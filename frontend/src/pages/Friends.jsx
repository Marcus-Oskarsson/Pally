import { useState } from 'react';
import { SearchFriends } from '../components/SearchFriends';
import { UserFriends } from '../components/UserFriends';
import { useParams } from 'react-router-dom';
import '../styles/friends.scss';
import '../styles/modal.scss';
const Friends = () => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const { id } = useParams();
  return (
    <>
      {toggleSearch ? <SearchFriends /> : <UserFriends />}
      {!isNaN(id) ? null : (
        <div className='button-container'>
          <button onClick={() => setToggleSearch(!toggleSearch)}>
            {toggleSearch ? 'Your friends' : 'Find new friends'}
          </button>
        </div>
      )}
    </>
  );
};

export default Friends;
