import SearchIcon from '../assets/search.png';
import FriendImage from '../assets/pallyLogo.png';
import AddFriendIcon from '../assets/PersonPlus.png';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';

export const SearchFriends = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    fetch(`/api/friends/search/${user.userid}?search=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('failed', error);
      });
  }, [user.userid, search]);

  const addFriend = (friendId) => {
    console.log(friendId, user.userid);
    fetch('/api/friends/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.userid,
        friendId: friendId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const updatedResults = results.filter(
          (friend) => friend.userid !== friendId
        );
        setResults(updatedResults);
      })
      .catch((error) => {
        console.error('oh no it failed', error);
      });
  };

  console.log({ results });
  return (
    <>
      <div className='main-friends-container'>
        <h2>Find new friends</h2>
        <div className='search-friends-container'>
          <input
            type='text'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <img src={SearchIcon} alt='' />
        </div>
        {results.map((friends) => (
          <div key={friends.userid} className='result-friends-container'>
            <div className='result-friends'>
              <img src={FriendImage} alt='friend image' />
              <p>
                {friends.firstname} {friends.lastname}
              </p>
            </div>
            <img
              src={AddFriendIcon}
              alt='add friend image'
              onClick={() => addFriend(friends.userid)}
            />
          </div>
        ))}
      </div>
    </>
  );
};
